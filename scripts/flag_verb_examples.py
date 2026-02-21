#!/usr/bin/env python3
"""
flag_verb_examples.py
---------------------
Scans vocab.js (VOCAB_DATA_RAW) for verb entries whose example sentence looks
grammatically suspect: a sentence that contains a Bengali subject pronoun AND
whose Bengali text ends with the dictionary-form headword (lemma).

Output: verb_audit.csv  — one row per flagged entry, ready for native-speaker review.

Usage:
    python3 flag_verb_examples.py
    python3 flag_verb_examples.py --vocab ../../vocab.js --out verb_audit.csv
"""

import re
import csv
import argparse
from pathlib import Path

# Subject pronouns commonly found at the start of Bengali sentences
SUBJECT_PRONOUNS = {
    "আমি", "তুমি", "সে", "তিনি", "তারা", "তোমরা", "আমরা",
    "ওরা", "ওই", "আপনি", "আপনারা", "তুই",
}

# Characters that end a Bengali sentence / are stripped from the end before comparison
STRIP_CHARS = "।?! \u200c\u200d\t\n"


def parse_vocab_raw(vocab_js: Path) -> list[dict]:
    """Extract all rows from VOCAB_DATA_RAW in vocab.js."""
    text = vocab_js.read_text(encoding="utf-8")

    # Grab the VOCAB_DATA_RAW block (everything between the first [ after the declaration
    # and the matching closing ];)
    m = re.search(r'const VOCAB_DATA_RAW\s*=\s*\[', text)
    if not m:
        raise ValueError("Could not find VOCAB_DATA_RAW in vocab.js")

    start = m.end() - 1  # include the opening [
    # Find matching ] by counting brackets
    depth = 0
    end = start
    for i, ch in enumerate(text[start:], start):
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    raw_block = text[start:end]

    # Parse each row: ["lemma","roman","english","category","pos","example"]
    # Use a line-by-line JSON-ish approach — each row is on its own line.
    rows = []
    row_pat = re.compile(
        r'\["([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]*)"\]'
    )
    for match in row_pat.finditer(raw_block):
        lemma, roman, english, category, pos, example = match.groups()
        rows.append({
            "lemma": lemma,
            "roman": roman,
            "english": english,
            "category": category,
            "pos": pos,
            "example": example,
        })
    return rows


def has_subject_pronoun(bengali_sentence: str) -> bool:
    tokens = set(bengali_sentence.split())
    return bool(tokens & SUBJECT_PRONOUNS)


def ends_with_lemma(bengali_sentence: str, lemma: str) -> bool:
    """Return True if the Bengali portion of the example ends with the lemma."""
    stripped = bengali_sentence.rstrip(STRIP_CHARS)
    return stripped == lemma or stripped.endswith(" " + lemma)


def extract_bengali(example: str) -> str:
    """Return only the Bengali text portion (before the romanized parenthetical)."""
    paren_idx = example.find("(")
    if paren_idx > 0:
        return example[:paren_idx].strip()
    return example.strip()


def flag_reason(bengali: str, lemma: str) -> str:
    reasons = []
    if has_subject_pronoun(bengali):
        reasons.append("has_subject_pronoun")
    if ends_with_lemma(bengali, lemma):
        reasons.append("ends_with_lemma")
    return "+".join(reasons)


def main():
    parser = argparse.ArgumentParser(description="Flag suspect verb examples in vocab.js")
    parser.add_argument("--vocab", default=Path(__file__).parent.parent / "vocab.js",
                        type=Path, help="Path to vocab.js")
    parser.add_argument("--out", default=Path(__file__).parent / "verb_audit.csv",
                        type=Path, help="Output CSV path")
    parser.add_argument("--all-verbs", action="store_true",
                        help="Include all verb entries, not just flagged ones")
    args = parser.parse_args()

    rows = parse_vocab_raw(args.vocab)
    verb_rows = [r for r in rows if r["pos"] == "verb"]
    print(f"Total entries: {len(rows)}  |  Verb entries: {len(verb_rows)}")

    flagged = []
    for r in verb_rows:
        bengali = extract_bengali(r["example"])
        reasons = []
        if has_subject_pronoun(bengali):
            reasons.append("has_subject_pronoun")
        if ends_with_lemma(bengali, r["lemma"]):
            reasons.append("ends_with_lemma")

        if args.all_verbs or reasons:
            flagged.append({
                "lemma": r["lemma"],
                "roman": r["roman"],
                "english": r["english"],
                "example_bengali": bengali,
                "example_full": r["example"],
                "flag_reasons": "+".join(reasons) if reasons else "ok",
                "corrected_example": "",   # to be filled in by reviewer
                "notes": "",               # free-form reviewer notes
            })

    flagged_only = [f for f in flagged if f["flag_reasons"] != "ok"]
    print(f"Flagged entries: {len(flagged_only)} / {len(verb_rows)} verbs")

    fieldnames = [
        "lemma", "roman", "english",
        "example_bengali", "example_full", "flag_reasons",
        "corrected_example", "notes",
    ]

    with open(args.out, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(flagged if args.all_verbs else flagged_only)

    print(f"Written to: {args.out}")


if __name__ == "__main__":
    main()
