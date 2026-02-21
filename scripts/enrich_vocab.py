#!/usr/bin/env python3
"""
enrich_vocab.py — Enrich new Bengali words with romanization, English translation,
category, POS, and example sentences via the Claude API (Batches API for cost efficiency).

Inputs:
  --csv         Path to frequency CSV (rank,word). Default: ../Vocabulary corpus/bn_top_6000_wordfreq.csv
  --existing    Path to vocab.js (to skip already-curated words). Default: ../vocab.js
  --existing-enriched  Path to a previous enriched_new_words.json (skip already-enriched words).
  --output      Output JSON path. Default: same directory as --csv / enriched_new_words.json
  --batch-size  Words per Claude Batch request. Default: 100
  --dry-run     Print what would be sent without calling the API.

Outputs:
  enriched_new_words.json — Array of word objects:
    { lemma, roman, english, category, pos, example, freqRank }
  Words where Claude returns null (proper nouns, non-lexical) are omitted.

Re-run instructions:
  To expand the corpus with a larger CSV (e.g., 9,000-word list), run:
    python enrich_vocab.py --csv path/to/new.csv --existing ../vocab.js \
        --existing-enriched ../Vocabulary\\ corpus/enriched_new_words.json
  The script skips any lemma already present in either source.

Prerequisites:
  pip install anthropic
  export ANTHROPIC_API_KEY=sk-ant-...
"""

import argparse
import csv
import json
import os
import re
import sys
import time
from pathlib import Path

try:
    import anthropic
except ImportError:
    sys.exit("Missing dependency: pip install anthropic")

# ── Bengali vowel detection ──────────────────────────────────────────────────
# Unicode ranges for Bengali vowels (independent) and vowel signs (matras)
BENGALI_VOWEL_PATTERN = re.compile(
    r'[\u0985-\u0994'   # অ আ ই ঈ উ ঊ ঋ ঌ এ ঐ ও ঔ (independent)
    r'\u09BE-\u09C4'    # া ি ী ু ূ ৃ ৄ (vowel signs)
    r'\u09E0-\u09E3'    # ৠ ৡ ৢ ৣ (rare independent vowels)
    r'\u09C7\u09C8'     # ে ৈ
    r'\u09CB\u09CC]'    # ো ৌ
)

# ── Proper-noun / place-name blocklist ──────────────────────────────────────
# Well-known Bangladeshi/Indian cities, regions, rivers, and common proper nouns.
PLACE_BLOCKLIST = {
    'ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'ময়মনসিংহ',
    'কুমিল্লা', 'নারায়ণগঞ্জ', 'গাজীপুর', 'রংপুর', 'দিনাজপুর', 'যশোর',
    'কলকাতা', 'মুম্বাই', 'দিল্লি', 'চেন্নাই', 'বেঙ্গালুরু', 'হায়দ্রাবাদ',
    'পদ্মা', 'মেঘনা', 'যমুনা', 'ব্রহ্মপুত্র', 'গঙ্গা', 'সুরমা',
    'বাংলাদেশ', 'ভারত', 'পাকিস্তান', 'নেপাল', 'ভুটান', 'মিয়ানমার',
    'আমেরিকা', 'ইংল্যান্ড', 'ফ্রান্স', 'জার্মানি', 'চীন', 'জাপান',
    'ইসলাম', 'আল্লাহ', 'মুহাম্মদ', 'হিন্দু', 'বুদ্ধ', 'খ্রিস্ট',
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
    'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার', 'রবিবার',
}

# ── Valid category IDs ───────────────────────────────────────────────────────
VALID_CATEGORIES = [
    'pronouns', 'numbers', 'family', 'body', 'food', 'animals', 'colors',
    'time', 'nature', 'home', 'places', 'verbs', 'adjectives', 'adverbs',
    'expressions', 'professions', 'transport', 'clothing', 'emotions',
    'education', 'society', 'abstract', 'grammar', 'health', 'technology', 'phrases',
]

SYSTEM_PROMPT = """\
You are a Bengali language expert. For each Bengali word provided (with its frequency rank),
return a JSON object with these fields:
  - "roman": romanized pronunciation using standard Bengali romanization
  - "english": concise English translation (use "/" for multiple meanings, e.g. "big / large")
  - "category": exactly one category ID from the allowed list
  - "pos": part of speech (noun, verb, adjective, adverb, pronoun, conjunction, preposition, interjection, number, particle)
  - "example": one short Bengali sentence using the word, followed by " (roman — English translation.)"
    Example format: "সে বাড়ি যাচ্ছে। (she bari jacchhe — She is going home.)"

Return null for:
  - Proper nouns, place names, person names, brand names
  - Non-lexical tokens (punctuation-only, pure numbers like "00", "০০")
  - Abbreviations, foreign words not integrated into Bengali

Allowed category IDs (use ONLY these):
""" + ", ".join(VALID_CATEGORIES) + """

Return a JSON array where each element corresponds to the input word (in order).
Each element is either a complete object or null.
"""


def parse_csv(csv_path: Path) -> list[tuple[int, str]]:
    """Return list of (rank, lemma) from the frequency CSV."""
    words = []
    with open(csv_path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rank_str = row.get('rank', '').strip()
            word = row.get('word', '').strip()
            if not rank_str or not word:
                continue
            try:
                rank = int(rank_str)
            except ValueError:
                continue
            words.append((rank, word))
    return words


def parse_vocab_js_lemmas(vocab_js_path: Path) -> set[str]:
    """Extract all lemma strings from VOCAB_DATA_RAW in vocab.js."""
    lemmas = set()
    text = vocab_js_path.read_text(encoding='utf-8')
    # Match array entries: ["lemma","roman",...]
    for match in re.finditer(r'\["([^"]+)","[^"]*","[^"]*"', text):
        lemmas.add(match.group(1))
    return lemmas


def parse_enriched_json_lemmas(enriched_path: Path) -> set[str]:
    """Extract lemmas from a previously produced enriched_new_words.json."""
    if not enriched_path.exists():
        return set()
    with open(enriched_path, encoding='utf-8') as f:
        data = json.load(f)
    return {entry['lemma'] for entry in data if isinstance(entry, dict) and 'lemma' in entry}


def is_non_lexical(word: str) -> bool:
    """Return True if the word should be filtered out before API call."""
    # Pure ASCII digits or Bengali digits
    if re.fullmatch(r'[\d০-৯]+', word):
        return True
    # Contains no Bengali vowel (likely a consonant cluster, abbreviation, or noise)
    if not BENGALI_VOWEL_PATTERN.search(word):
        return True
    # Known place / proper noun
    if word in PLACE_BLOCKLIST:
        return True
    # Very short tokens that are likely particles already covered or noise
    # (single character entries that are not vowels)
    if len(word) == 1 and not BENGALI_VOWEL_PATTERN.match(word):
        return True
    return False


def chunk(lst: list, size: int) -> list[list]:
    """Split lst into sublists of at most `size` elements."""
    return [lst[i:i+size] for i in range(0, len(lst), size)]


def build_user_message(words: list[tuple[int, str]]) -> str:
    lines = []
    for rank, lemma in words:
        lines.append(f"Rank {rank}: {lemma}")
    return "Enrich these Bengali words:\n" + "\n".join(lines)


def call_batches_api(client: anthropic.Anthropic, batches: list[list[tuple[int, str]]], dry_run: bool) -> list[dict | None]:
    """Send all word batches via the Anthropic Batches API and collect results."""
    if dry_run:
        total = sum(len(b) for b in batches)
        print(f"[DRY RUN] Would send {len(batches)} batch request(s) covering {total} words.")
        return []

    from anthropic.types.messages.batch_create_params import Request as BatchRequest
    from anthropic.types.message_create_params import MessageCreateParamsNonStreaming

    # Build batch requests
    requests = []
    for batch_idx, batch in enumerate(batches):
        requests.append(BatchRequest(
            custom_id=f"batch-{batch_idx}",
            params=MessageCreateParamsNonStreaming(
                model="claude-haiku-4-5-20251001",
                max_tokens=16384,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": build_user_message(batch)}],
            )
        ))

    print(f"Creating batch job with {len(requests)} request(s)…")
    batch_job = client.messages.batches.create(requests=requests)
    print(f"Batch ID: {batch_job.id}  |  Status: {batch_job.processing_status}")

    # Poll until complete
    while batch_job.processing_status == "in_progress":
        time.sleep(15)
        batch_job = client.messages.batches.retrieve(batch_job.id)
        counts = batch_job.request_counts
        print(f"  Status: {batch_job.processing_status} | "
              f"succeeded={counts.succeeded} errored={counts.errored} processing={counts.processing}")

    if batch_job.processing_status != "ended":
        sys.exit(f"Batch ended with unexpected status: {batch_job.processing_status}")

    # Collect results keyed by custom_id
    results_by_id: dict[str, list | None] = {}
    for result in client.messages.batches.results(batch_job.id):
        if result.result.type == "succeeded":
            content = result.result.message.content[0].text
            # Strip markdown code fences if present (e.g. ```json\n...\n```)
            stripped = content.strip()
            if stripped.startswith("```"):
                stripped = re.sub(r'^```[^\n]*\n', '', stripped)
                stripped = re.sub(r'\n```$', '', stripped.rstrip())
            try:
                parsed = json.loads(stripped)
                results_by_id[result.custom_id] = parsed
            except json.JSONDecodeError:
                print(f"WARNING: Could not parse JSON for {result.custom_id}", file=sys.stderr)
                results_by_id[result.custom_id] = None
        else:
            print(f"WARNING: Request {result.custom_id} failed: {result.result.type}", file=sys.stderr)
            results_by_id[result.custom_id] = None

    # Reconstruct flat list in original order
    all_results: list[dict | None] = []
    for batch_idx in range(len(batches)):
        batch_result = results_by_id.get(f"batch-{batch_idx}")
        if batch_result is None:
            all_results.extend([None] * len(batches[batch_idx]))
        elif isinstance(batch_result, list):
            # Pad/trim to match batch length
            for i, item in enumerate(batches[batch_idx]):
                all_results.append(batch_result[i] if i < len(batch_result) else None)
        else:
            all_results.extend([None] * len(batches[batch_idx]))

    return all_results


def main():
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent

    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--csv', type=Path,
                        default=repo_root / 'Vocabulary corpus' / 'bn_top_6000_wordfreq.csv',
                        help='Path to frequency CSV (rank,word)')
    parser.add_argument('--existing', type=Path,
                        default=repo_root / 'vocab.js',
                        help='Path to vocab.js (words to skip)')
    parser.add_argument('--existing-enriched', type=Path,
                        default=repo_root / 'Vocabulary corpus' / 'enriched_new_words.json',
                        help='Path to previous enriched_new_words.json (words to skip)')
    parser.add_argument('--output', type=Path,
                        help='Output JSON path (default: same dir as --csv / enriched_new_words.json)')
    parser.add_argument('--batch-size', type=int, default=50,
                        help='Words per Claude batch request (default: 50)')
    parser.add_argument('--dry-run', action='store_true',
                        help='Print plan without calling the API')
    args = parser.parse_args()

    output_path = args.output or (args.csv.parent / 'enriched_new_words.json')

    # ── Load existing lemmas to skip ──────────────────────────────────────────
    print(f"Loading existing vocab from {args.existing}…")
    existing_lemmas = parse_vocab_js_lemmas(args.existing)
    print(f"  Found {len(existing_lemmas)} existing lemmas in vocab.js.")

    print(f"Loading previously enriched lemmas from {args.existing_enriched}…")
    enriched_lemmas = parse_enriched_json_lemmas(args.existing_enriched)
    print(f"  Found {len(enriched_lemmas)} already-enriched lemmas.")

    skip_lemmas = existing_lemmas | enriched_lemmas

    # ── Parse CSV ─────────────────────────────────────────────────────────────
    print(f"Reading CSV from {args.csv}…")
    csv_words = parse_csv(args.csv)
    print(f"  CSV contains {len(csv_words)} rows.")

    # ── Filter ────────────────────────────────────────────────────────────────
    new_words: list[tuple[int, str]] = []
    skipped_existing = 0
    skipped_nonlex = 0

    for rank, lemma in csv_words:
        if lemma in skip_lemmas:
            skipped_existing += 1
            continue
        if is_non_lexical(lemma):
            skipped_nonlex += 1
            continue
        new_words.append((rank, lemma))

    total_vocab_count = len(existing_lemmas) + len(enriched_lemmas) + len(new_words)
    print(f"\nFiltering results:")
    print(f"  Skipped (already in vocab): {skipped_existing}")
    print(f"  Skipped (non-lexical):      {skipped_nonlex}")
    print(f"  New words to enrich:        {len(new_words)}")
    print(f"  Projected total vocabulary: {total_vocab_count}")

    if total_vocab_count < 5000:
        print(f"WARNING: Total vocabulary count ({total_vocab_count}) is below 5,000!", file=sys.stderr)

    if not new_words:
        print("No new words to enrich. Exiting.")
        return

    # ── Build batch chunks ────────────────────────────────────────────────────
    batches = chunk(new_words, args.batch_size)
    print(f"\nWill send {len(batches)} batch request(s) of up to {args.batch_size} words each.")

    # ── Call API (or dry run) ─────────────────────────────────────────────────
    if not args.dry_run:
        api_key = os.environ.get('ANTHROPIC_API_KEY')
        if not api_key:
            sys.exit("ERROR: Set the ANTHROPIC_API_KEY environment variable before running.")
        client = anthropic.Anthropic(api_key=api_key)
    else:
        client = None

    api_results = call_batches_api(client, batches, args.dry_run)

    if args.dry_run:
        return

    # ── Assemble output ───────────────────────────────────────────────────────
    enriched_entries = []
    flat_words = [w for batch in batches for w in batch]

    null_count = 0
    invalid_count = 0

    for (rank, lemma), result in zip(flat_words, api_results):
        if result is None:
            null_count += 1
            continue

        # Validate required fields
        if not isinstance(result, dict):
            invalid_count += 1
            continue

        roman = (result.get('roman') or '').strip()
        english = (result.get('english') or '').strip()
        category = (result.get('category') or '').strip()
        pos = (result.get('pos') or '').strip()
        example = (result.get('example') or '').strip()

        if not roman or not english:
            null_count += 1
            continue

        # Clamp category to valid list
        if category not in VALID_CATEGORIES:
            category = 'abstract'

        enriched_entries.append({
            'lemma': lemma,
            'roman': roman,
            'english': english,
            'category': category,
            'pos': pos,
            'example': example,
            'freqRank': rank,
        })

    print(f"\nEnrichment complete:")
    print(f"  Successfully enriched: {len(enriched_entries)}")
    print(f"  Skipped by Claude (null/proper noun): {null_count}")
    print(f"  Invalid responses: {invalid_count}")

    # ── Merge with existing enriched data (for re-runs) ───────────────────────
    existing_enriched = []
    if args.existing_enriched.exists():
        with open(args.existing_enriched, encoding='utf-8') as f:
            existing_enriched = json.load(f)
        print(f"  Merging with {len(existing_enriched)} previously enriched entries.")

    existing_enriched_lemmas = {e['lemma'] for e in existing_enriched}
    merged = existing_enriched + [e for e in enriched_entries if e['lemma'] not in existing_enriched_lemmas]

    # ── Write output ──────────────────────────────────────────────────────────
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f"\nWrote {len(merged)} enriched entries to {output_path}")


if __name__ == '__main__':
    main()
