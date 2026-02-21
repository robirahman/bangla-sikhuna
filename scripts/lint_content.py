#!/usr/bin/env python3
"""
lint_content.py — Content QA script for the Bengali learning app.

Checks:
  1. Known typos in enriched_new_words.json and vocab.js
  2. Romanization characters in the allowed set (no stray diacritics that
     _normRoman doesn't handle)
  3. No duplicate lemmas within the same pos/category in enriched_new_words.json
  4. Example sentence formatting consistency

Usage:
  python3 lint_content.py
  python3 lint_content.py --fix   # auto-fix known typos (dry-run by default)

Exit code 0 = clean, 1 = issues found.
"""

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).parent.parent
ENRICHED = REPO / "Vocabulary corpus" / "enriched_new_words.json"
VOCAB_JS = REPO / "vocab.js"

# ── 1. Known typo substitutions ──────────────────────────────────────────────
KNOWN_TYPOS = {
    "agamical": "agamikal",
}

# ── 2. Romanization allowed characters ───────────────────────────────────────
# Characters that _normRoman handles (diacritics) plus plain ASCII.
# Any character NOT in this set in a roman field is suspect.
ALLOWED_ROMAN_CHARS = set(
    "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789 /-().',\"!?āĀēĒīĪōŌūŪṭṬḍḌṇṆśŚṣṢṛṚñô"
)

issues: list[str] = []


def check_typos_in_text(text: str, source: str) -> list[str]:
    found = []
    for bad, good in KNOWN_TYPOS.items():
        if bad in text:
            found.append(f"  [{source}] Typo '{bad}' (should be '{bad.replace(bad, good)}')")
    return found


def check_roman_chars(roman: str, lemma: str, source: str) -> list[str]:
    bad = [c for c in roman if c not in ALLOWED_ROMAN_CHARS]
    if bad:
        chars = ", ".join(repr(c) for c in sorted(set(bad)))
        return [f"  [{source}] Unexpected char(s) {chars} in roman='{roman}' (lemma={lemma})"]
    return []


def check_example_format(example: str, lemma: str, source: str) -> list[str]:
    """
    Expected format (soft check): non-empty, and if it contains parentheses,
    the Bengali and romanization parts are present.
    """
    problems = []
    if not example:
        return []
    if example.count("(") != example.count(")"):
        problems.append(f"  [{source}] Mismatched parentheses in example for lemma={lemma}: {example!r}")
    if len(example) < 10:
        problems.append(f"  [{source}] Suspiciously short example for lemma={lemma}: {example!r}")
    return problems


def lint_enriched():
    if not ENRICHED.exists():
        issues.append(f"  [enriched_new_words.json] File not found: {ENRICHED}")
        return

    with open(ENRICHED, encoding="utf-8") as f:
        words = json.load(f)

    # Track (pos, category) → lemmas for duplicate detection
    seen: dict[tuple, list] = defaultdict(list)

    for w in words:
        lemma = w.get("lemma", "")
        roman = w.get("roman", "")
        pos = w.get("pos", "")
        category = w.get("category", "")
        example = w.get("example", "")
        source = f"enriched/{lemma}"

        # Typos
        for field in [roman, example]:
            issues.extend(check_typos_in_text(field, source))

        # Roman chars
        issues.extend(check_roman_chars(roman, lemma, source))

        # Example format
        issues.extend(check_example_format(example, lemma, source))

        # Duplicate detection
        key = (pos, category)
        seen[key].append(lemma)

    # Report duplicates
    for (pos, cat), lemmas in seen.items():
        dups = [l for l in set(lemmas) if lemmas.count(l) > 1]
        for dup in dups:
            issues.append(f"  [enriched] Duplicate lemma '{dup}' in pos={pos}, category={cat}")


def lint_vocab_js():
    if not VOCAB_JS.exists():
        issues.append(f"  [vocab.js] File not found: {VOCAB_JS}")
        return

    text = VOCAB_JS.read_text(encoding="utf-8")

    # Check known typos in the full file text
    for bad, good in KNOWN_TYPOS.items():
        count = text.count(bad)
        if count:
            issues.append(f"  [vocab.js] Found {count} occurrence(s) of typo '{bad}' (should be '{good}')")

    # Extract fields from vocab.js arrays: ["lemma","roman","english","cat","pos","example"(,"senseId")]
    # The optional 7th element (senseId) marks intentional same-lemma different-sense entries.
    pattern = re.compile(
        r'\["([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]*)"(?:,"([^"]*)")?\]'
    )
    # Key = (lemma, senseId) — entries with distinct senseIds are not duplicates
    seen_keys: dict[tuple[str, str], int] = defaultdict(int)
    for m in pattern.finditer(text):
        lemma, roman = m.group(1), m.group(2)
        sense_id = m.group(7) or ''
        seen_keys[(lemma, sense_id)] += 1
        issues.extend(check_roman_chars(roman, lemma, f"vocab.js/{lemma}"))

    # Group by lemma to detect true duplicates (same lemma AND same senseId)
    from collections import defaultdict as _dd
    lemma_counts: dict[str, int] = _dd(int)
    for (lemma, sense_id), count in seen_keys.items():
        if count > 1:
            issues.append(f"  [vocab.js] Duplicate lemma '{lemma}' (senseId={sense_id!r}, {count} times)")


def main():
    parser = argparse.ArgumentParser(description="Content QA for Bengali app")
    parser.add_argument("--fix", action="store_true", help="Auto-fix known typos (modifies files)")
    args = parser.parse_args()

    if args.fix:
        for path in [ENRICHED, VOCAB_JS]:
            if not path.exists():
                continue
            text = path.read_text(encoding="utf-8")
            changed = False
            for bad, good in KNOWN_TYPOS.items():
                if bad in text:
                    text = text.replace(bad, good)
                    changed = True
                    print(f"Fixed '{bad}' → '{good}' in {path.name}")
            if changed:
                path.write_text(text, encoding="utf-8")
        print("Fix pass complete.")

    lint_enriched()
    lint_vocab_js()

    if issues:
        print(f"\n❌ Found {len(issues)} issue(s):\n")
        for issue in issues:
            print(issue)
        sys.exit(1)
    else:
        print("✓ No content issues found.")
        sys.exit(0)


if __name__ == "__main__":
    main()
