#!/usr/bin/env python3
"""
apply_verb_corrections.py
-------------------------
Reads the corrected verb audit CSV and patches vocab.js in-place,
replacing each flagged example with the reviewer's corrected version.

Rows whose corrected_example is blank or "OK" are skipped.

Usage:
    python3 apply_verb_corrections.py
    python3 apply_verb_corrections.py --csv "../App audit/verb_audit_corrected.csv" \
                                      --vocab ../vocab.js
"""

import csv
import argparse
from pathlib import Path


def main():
    here = Path(__file__).parent

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--csv",
        default=here.parent / "App audit" / "verb_audit_corrected.csv",
        type=Path,
    )
    parser.add_argument(
        "--vocab",
        default=here.parent / "vocab.js",
        type=Path,
    )
    args = parser.parse_args()

    text = args.vocab.read_text(encoding="utf-8")
    applied = []
    skipped = []

    with open(args.csv, newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            corrected = row["corrected_example"].strip()
            if not corrected or corrected.upper() == "OK":
                skipped.append(row["lemma"])
                continue

            old_example = row["example_full"].strip()
            new_example = corrected

            if old_example not in text:
                print(f"  WARNING: could not find example for {row['lemma']!r} — skipping")
                print(f"    looked for: {old_example!r}")
                skipped.append(row["lemma"])
                continue

            count = text.count(old_example)
            if count > 1:
                print(f"  WARNING: {row['lemma']!r} example appears {count}x — replacing all")

            text = text.replace(old_example, new_example)
            applied.append(row["lemma"])
            print(f"  ✓ {row['lemma']:12s}  {old_example[:50]}…")
            print(f"    →          {new_example[:50]}…")

    args.vocab.write_text(text, encoding="utf-8")
    print(f"\nDone. Applied {len(applied)} corrections, skipped {len(skipped)}.")
    print(f"Applied: {applied}")


if __name__ == "__main__":
    main()
