#!/usr/bin/env python3
"""
build_vocab_packs.py — Build curriculum-ordered vocabulary packs for the Bengali app.

Reads the curated vocab.js words and enriched_new_words.json, merges them,
applies the same curriculum algorithm used in index.html (frequency-band
partitioning + weighted round-robin by category), then splits the result into
packs and writes them to disk.

Inputs:
  --vocab     Path to vocab.js. Default: ../vocab.js
  --enriched  Path to enriched_new_words.json. Default: ../Vocabulary corpus/enriched_new_words.json
  --csv       Path to frequency CSV (rank,word) used to look up freqRank for vocab.js words.
              Default: ../Vocabulary corpus/bn_top_6000_wordfreq.csv
  --out       Output directory for packs. Default: ../ (repo bengali/ dir)
  --pack-sizes  Comma-separated cumulative word counts for pack boundaries (default: 300,1000,3000)
               Pack 0 = words 0..pack_sizes[0]-1  (written into vocab.js as VOCAB_DATA_RAW)
               Pack 1 = words pack_sizes[0]..pack_sizes[1]-1 → vocab-pack-1.json
               Pack 2 = words pack_sizes[1]..pack_sizes[2]-1 → vocab-pack-2.json
               Pack 3 = words pack_sizes[2]..end             → vocab-pack-3.json

Outputs:
  vocab-pack-1.json, vocab-pack-2.json, vocab-pack-3.json in --out directory.
  vocab.js VOCAB_DATA_RAW is updated in-place (pack 0 words only).

Re-run instructions:
  After running enrich_vocab.py with a larger corpus, re-run this script to
  regenerate all packs:
    python build_vocab_packs.py --vocab ../vocab.js \\
        --enriched "../Vocabulary corpus/enriched_new_words.json" --out ../

  Pack boundaries can be adjusted:
    python build_vocab_packs.py --pack-sizes 300,1000,3000

  The script is idempotent: identical inputs produce identical outputs.

Note:
  vocab.js must be edited to set VOCAB_DATA_RAW to only the pack-0 words
  (this script does that edit automatically). The file's VOCAB_CATEGORIES block
  and other constants are preserved unchanged.
"""

import argparse
import csv
import json
import re
import sys
from pathlib import Path

# ── Category / curriculum constants (mirror index.html) ─────────────────────

VALID_CATEGORIES = [
    'pronouns', 'numbers', 'family', 'body', 'food', 'animals', 'colors',
    'time', 'nature', 'home', 'places', 'verbs', 'adjectives', 'adverbs',
    'expressions', 'professions', 'transport', 'clothing', 'emotions',
    'education', 'society', 'abstract', 'grammar', 'health', 'technology', 'phrases',
]

# Priority order mirrors catOrder in index.html VMIX_CURRICULUM IIFE
CAT_ORDER = [
    'expressions', 'pronouns', 'numbers', 'verbs', 'food', 'family',
    'adjectives', 'phrases', 'time', 'home', 'body', 'places',
    'adverbs', 'nature', 'emotions', 'education', 'animals', 'professions',
    'grammar', 'clothing', 'transport', 'health', 'colors', 'technology',
    'society', 'abstract',
]

FREQ_BANDS = [
    {'maxRank': 20,   'label': '1-20'},
    {'maxRank': 70,   'label': '21-70'},
    {'maxRank': 250,  'label': '71-250'},
    {'maxRank': 800,  'label': '251-800'},
    {'maxRank': 2500, 'label': '801-2500'},
    {'maxRank': 9000, 'label': '2501-9000'},
]

FALLBACK_FREQ_RANK = 9999  # for curated words not found in the CSV


# ── CSV helpers ──────────────────────────────────────────────────────────────

def load_csv_rank_map(csv_path: Path) -> dict[str, int]:
    """Return {lemma: rank} from the frequency CSV."""
    rank_map: dict[str, int] = {}
    with open(csv_path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            word = row.get('word', '').strip()
            rank_str = row.get('rank', '').strip()
            if word and rank_str:
                try:
                    rank_map[word] = int(rank_str)
                except ValueError:
                    pass
    return rank_map


# ── vocab.js parser ──────────────────────────────────────────────────────────

def parse_vocab_js(vocab_js_path: Path) -> list[dict]:
    """
    Extract all entries from VOCAB_DATA_RAW in vocab.js.
    Each entry is stored as [lemma, roman, english, category, pos, example].
    Returns list of dicts with those fields.
    """
    text = vocab_js_path.read_text(encoding='utf-8')

    # Extract content inside VOCAB_DATA_RAW = [ ... ]
    m = re.search(r'const VOCAB_DATA_RAW\s*=\s*\[(.+?)\];', text, re.DOTALL)
    if not m:
        sys.exit(f"ERROR: Could not find VOCAB_DATA_RAW in {vocab_js_path}")

    raw_block = m.group(1)
    # Find all array entries: ["...", "...", "...", "...", "...", "..."]
    entry_pattern = re.compile(
        r'\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
        r'"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
        r'"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\]',
        re.DOTALL
    )
    entries = []
    for match in entry_pattern.finditer(raw_block):
        lemma, roman, english, category, pos, example = [
            m.replace('\\"', '"').replace('\\\\', '\\') for m in match.groups()
        ]
        entries.append({
            'lemma': lemma,
            'roman': roman,
            'english': english,
            'category': category,
            'pos': pos,
            'example': example,
        })

    return entries


def load_enriched_json(enriched_path: Path) -> list[dict]:
    """Load enriched_new_words.json. Returns [] if file doesn't exist."""
    if not enriched_path.exists():
        print(f"WARNING: {enriched_path} not found. Using vocab.js words only.", file=sys.stderr)
        return []
    with open(enriched_path, encoding='utf-8') as f:
        return json.load(f)


# ── Curriculum algorithm (mirrors index.html VMIX_CURRICULUM logic) ──────────

def get_band_idx(rank: int) -> int:
    for i, band in enumerate(FREQ_BANDS):
        if rank <= band['maxRank']:
            return i
    return len(FREQ_BANDS) - 1


def normalize_word(w: dict) -> dict:
    """Clamp category and ensure numeric freqRank."""
    return {
        **w,
        'category': w['category'] if w['category'] in CAT_ORDER else 'abstract',
        'freqRank': int(w['freqRank']) if isinstance(w.get('freqRank'), (int, float)) else 9999,
    }


def stable_sort_key(w: dict) -> tuple:
    return (w['freqRank'], w['lemma'], w['english'])


def category_weight(cat: str) -> int:
    try:
        return len(CAT_ORDER) - CAT_ORDER.index(cat)
    except ValueError:
        return 1


def weighted_round_robin_band(words_in_band: list[dict]) -> list[dict]:
    """Interleave words by category using weighted round-robin (mirrors JS logic)."""
    queues: dict[str, list[dict]] = {c: [] for c in CAT_ORDER}
    for w in words_in_band:
        cat = w['category'] if w['category'] in queues else 'abstract'
        queues[cat].append(w)

    # Deterministic ordering within each category queue
    for cat in CAT_ORDER:
        queues[cat].sort(key=stable_sort_key)

    emitted = []
    seen: set[str] = set()

    while True:
        emitted_this_pass = False
        for cat in CAT_ORDER:
            turns = category_weight(cat)
            while turns > 0 and queues[cat]:
                w = queues[cat].pop(0)
                key = w['lemma'] + '|' + w['english']
                if key not in seen:
                    seen.add(key)
                    emitted.append(w)
                emitted_this_pass = True
                turns -= 1
        if not emitted_this_pass:
            break

    return emitted


def build_curriculum(words: list[dict]) -> list[dict]:
    """Return words in curriculum order: frequency band → weighted round-robin."""
    normalized = [normalize_word(w) for w in words]
    normalized.sort(key=stable_sort_key)

    bands: dict[int, list[dict]] = {}
    for w in normalized:
        band_idx = get_band_idx(w['freqRank'])
        bands.setdefault(band_idx, []).append(w)

    curriculum = []
    for i in range(len(FREQ_BANDS)):
        if i in bands:
            curriculum.extend(weighted_round_robin_band(bands[i]))

    return curriculum


# ── vocab.js writer ──────────────────────────────────────────────────────────

def escape_js_string(s: str) -> str:
    """Escape a string for embedding in a JS double-quoted string."""
    return s.replace('\\', '\\\\').replace('"', '\\"')


def format_vocab_entry(w: dict) -> str:
    """Format one word object as a vocab.js array entry."""
    lemma   = escape_js_string(w['lemma'])
    roman   = escape_js_string(w['roman'])
    english = escape_js_string(w['english'])
    cat     = escape_js_string(w['category'])
    pos     = escape_js_string(w['pos'])
    example = escape_js_string(w['example'])
    return f'["{lemma}","{roman}","{english}","{cat}","{pos}","{example}"]'


def rewrite_vocab_js(vocab_js_path: Path, pack0_words: list[dict], total_words: int) -> None:
    """
    Rewrite VOCAB_DATA_RAW in vocab.js to contain only pack-0 words.
    Also updates VOCAB_TOTAL_WORDS to reflect the full corpus size.
    All other content (VOCAB_CATEGORIES, etc.) is preserved.
    """
    text = vocab_js_path.read_text(encoding='utf-8')

    # Build the new VOCAB_DATA_RAW block
    lines = ['const VOCAB_DATA_RAW = [']
    lines.append('// Pack 0 — top curriculum words (lazy packs 1-3 loaded at runtime)')

    # Group by category for readability
    current_cat = None
    for w in pack0_words:
        if w['category'] != current_cat:
            current_cat = w['category']
            lines.append(f'// ─── {current_cat.upper()} ───')
        lines.append(format_vocab_entry(w) + ',')

    lines.append('];')
    new_block = '\n'.join(lines)

    # Verify the pattern exists before replacing
    if not re.search(r'const VOCAB_DATA_RAW\s*=\s*\[.+?\];', text, re.DOTALL):
        sys.exit("ERROR: Failed to locate VOCAB_DATA_RAW in vocab.js")

    # Replace old VOCAB_DATA_RAW block
    new_text = re.sub(
        r'const VOCAB_DATA_RAW\s*=\s*\[.+?\];',
        new_block,
        text,
        flags=re.DOTALL,
    )

    new_text = re.sub(
        r'const VOCAB_TOTAL_WORDS\s*=\s*\d+;(?:\s*//[^\n]*)?',
        f'const VOCAB_TOTAL_WORDS = {total_words}; // updated by build_vocab_packs.py',
        new_text,
    )

    vocab_js_path.write_text(new_text, encoding='utf-8')
    print(f"Updated vocab.js VOCAB_DATA_RAW with {len(pack0_words)} pack-0 words.")
    print(f"Updated vocab.js VOCAB_TOTAL_WORDS to {total_words}.")


# ── Pack JSON writer ─────────────────────────────────────────────────────────

def write_pack_json(out_dir: Path, pack_num: int, words: list[dict]) -> None:
    """Write vocab-pack-N.json as a plain array of word objects."""
    # Include only the fields needed at runtime
    runtime_fields = ['lemma', 'roman', 'english', 'category', 'pos', 'example', 'freqRank']
    pack_data = [{k: w[k] for k in runtime_fields if k in w} for w in words]

    out_path = out_dir / f'vocab-pack-{pack_num}.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(pack_data, f, ensure_ascii=False, separators=(',', ':'))

    size_kb = out_path.stat().st_size / 1024
    print(f"Wrote {len(pack_data)} words to {out_path} ({size_kb:.1f} KB)")


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent

    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--vocab', type=Path, default=repo_root / 'vocab.js',
                        help='Path to vocab.js')
    parser.add_argument('--enriched', type=Path,
                        default=repo_root / 'Vocabulary corpus' / 'enriched_new_words.json',
                        help='Path to enriched_new_words.json')
    parser.add_argument('--csv', type=Path,
                        default=repo_root / 'Vocabulary corpus' / 'bn_top_6000_wordfreq.csv',
                        help='Path to frequency CSV (rank,word)')
    parser.add_argument('--out', type=Path, default=repo_root,
                        help='Output directory for pack JSON files')
    parser.add_argument('--pack-sizes', default='300,1000,3000',
                        help='Cumulative pack boundary word counts (default: 300,1000,3000)')
    args = parser.parse_args()

    pack_sizes = [int(x.strip()) for x in args.pack_sizes.split(',')]
    if len(pack_sizes) != 3:
        sys.exit("--pack-sizes must be exactly 3 comma-separated integers (e.g., 300,1000,3000)")

    p0_end, p1_end, p2_end = pack_sizes

    # ── Load inputs ───────────────────────────────────────────────────────────
    print(f"Loading vocab.js from {args.vocab}…")
    vocab_entries = parse_vocab_js(args.vocab)
    print(f"  Found {len(vocab_entries)} words in vocab.js.")

    print(f"Loading frequency CSV from {args.csv}…")
    csv_rank_map = load_csv_rank_map(args.csv)
    print(f"  CSV has {len(csv_rank_map)} entries.")

    print(f"Loading enriched words from {args.enriched}…")
    enriched_entries = load_enriched_json(args.enriched)
    print(f"  Found {len(enriched_entries)} enriched words.")

    # ── Assign freqRank to vocab.js words ─────────────────────────────────────
    for w in vocab_entries:
        if w['lemma'] in csv_rank_map:
            w['freqRank'] = csv_rank_map[w['lemma']]
        else:
            w['freqRank'] = FALLBACK_FREQ_RANK

    # ── Merge: vocab.js wins on duplicate lemma ───────────────────────────────
    vocab_lemmas = {w['lemma'] for w in vocab_entries}
    new_entries = [w for w in enriched_entries if w['lemma'] not in vocab_lemmas]
    all_words = vocab_entries + new_entries

    print(f"\nMerge: {len(vocab_entries)} curated + {len(new_entries)} enriched = {len(all_words)} total")

    # Deduplication check
    seen_lemmas: dict[str, int] = {}
    for i, w in enumerate(all_words):
        if w['lemma'] in seen_lemmas:
            print(f"WARNING: Duplicate lemma '{w['lemma']}' at positions {seen_lemmas[w['lemma']]} and {i}",
                  file=sys.stderr)
        else:
            seen_lemmas[w['lemma']] = i

    # ── Build curriculum ──────────────────────────────────────────────────────
    print("Building curriculum order…")
    curriculum = build_curriculum(all_words)
    print(f"  Curriculum has {len(curriculum)} words.")

    # ── Split into packs ──────────────────────────────────────────────────────
    pack0 = curriculum[:p0_end]
    pack1 = curriculum[p0_end:p1_end]
    pack2 = curriculum[p1_end:p2_end]
    pack3 = curriculum[p2_end:]

    print(f"\nPack sizes:")
    print(f"  Pack 0 (vocab.js): {len(pack0)} words")
    print(f"  Pack 1:            {len(pack1)} words")
    print(f"  Pack 2:            {len(pack2)} words")
    print(f"  Pack 3:            {len(pack3)} words")

    # ── Write outputs ─────────────────────────────────────────────────────────
    print()
    rewrite_vocab_js(args.vocab, pack0, total_words=len(curriculum))

    for pack_num, pack_words in [(1, pack1), (2, pack2), (3, pack3)]:
        if pack_words:
            write_pack_json(args.out, pack_num, pack_words)
        else:
            print(f"Pack {pack_num} is empty — skipped.")

    # ── Verification stats ───────────────────────────────────────────────────
    print(f"\nVerification:")
    all_output_lemmas = [w['lemma'] for w in pack0 + pack1 + pack2 + pack3]
    unique_output = set(all_output_lemmas)
    print(f"  Total words output: {len(all_output_lemmas)}")
    print(f"  Unique lemmas:      {len(unique_output)}")
    if len(all_output_lemmas) != len(unique_output):
        print(f"  WARNING: {len(all_output_lemmas) - len(unique_output)} duplicate lemmas in output!")

    # Check all original vocab.js lemmas are present
    missing = vocab_lemmas - unique_output
    if missing:
        print(f"  WARNING: {len(missing)} vocab.js lemmas missing from output: {list(missing)[:5]}")
    else:
        print(f"  All {len(vocab_lemmas)} original vocab.js lemmas preserved. ✓")

    print("\nDone.")


if __name__ == '__main__':
    main()
