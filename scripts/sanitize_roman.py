#!/usr/bin/env python3
"""
sanitize_roman.py — Fix non-ASCII lookalike characters in roman fields.

Handles:
  • Cyrillic lookalikes substituted for Latin letters (е→e, о→o, т→t, etc.)
  • IPA / modifier letters (ʰ→h, ː→'', ɔ→o, ⁿ→n)
  • Stray Latin diacritics not in the allowed set (é→e, ũ→u, ẏ→y, etc.)
  • Non-Latin scripts (Devanagari, Arabic, Bengali, Greek, Katakana) → remove
  • Stray combining marks stripped after primary substitution

Usage:
  python3 sanitize_roman.py              # in-place fix
  python3 sanitize_roman.py --dry-run   # preview only, no writes
"""

import argparse
import json
import sys
import unicodedata
from pathlib import Path

REPO = Path(__file__).parent.parent
ENRICHED = REPO / "Vocabulary corpus" / "enriched_new_words.json"

# ── Character substitution table ─────────────────────────────────────────────
# Map every known bad codepoint to its clean replacement ('' = delete).
CHAR_MAP: dict[str, str] = {
    # Cyrillic lookalikes
    "\u0430": "a",   # а → a
    "\u0435": "e",   # е → e
    "\u043E": "o",   # о → o
    "\u0442": "t",   # т → t
    "\u043A": "k",   # к → k
    "\u0440": "r",   # р → r
    "\u0438": "i",   # и → i
    "\u043B": "l",   # л → l
    "\u0433": "g",   # г → g
    "\u0458": "j",   # ј (Serbian/Macedonian je) → j
    "\u0456": "i",   # і (Ukrainian/Cyrillic I) → i

    # IPA / phonetic modifiers
    "\u02B0": "h",   # ʰ (modifier letter small h) → h
    "\u02D0": "",    # ː (IPA length mark) → remove
    "\u0254": "o",   # ɔ (open o) → o
    "\u207F": "n",   # ⁿ (superscript n) → n
    "\u03B2": "bh",  # β (Greek beta) → bh

    # Latin diacritics not in the allowed set
    "\u00E9": "e",   # é → e
    "\u00E8": "e",   # è → e
    "\u00EA": "e",   # ê → e
    "\u0115": "e",   # ĕ → e
    "\u1EBD": "e",   # ẽ → e
    "\u1E8F": "y",   # ẏ → y
    "\u00E2": "a",   # â → a
    "\u00E3": "a",   # ã → a
    "\u1EB5": "a",   # ẵ → a
    "\u00FA": "u",   # ú → u
    "\u0169": "u",   # ũ → u
    "\u00FB": "u",   # û → u
    "\u0107": "c",   # ć → c
    "\u1E45": "n",   # ṅ → n
    "\u1E43": "m",   # ṃ → m
    "\u1E41": "m",   # ṁ → m
    "\u1E25": "h",   # ḥ → h
    "\u0163": "t",   # ţ → t
    "\u0155": "r",   # ŕ → r
    "\u0142": "l",   # ł → l
    "\u00EE": "i",   # î → i
    "\u00ED": "i",   # í → i
    "\u1E33": "k",   # ḱ → k (actually U+1E31 but close enough)
    "\u1E31": "k",   # ḱ → k
    "\u00E6": "ae",  # æ → ae
    # ô (U+00F4) is in ALLOWED — do NOT map it here

    # Arabic / non-Latin scripts — remove
    "\u0648": "o",   # و (Arabic waw) → o (visually represents 'o' sound)

    # Japanese
    "\u30FC": "",    # ー (Katakana long vowel mark) → remove

    # Devanagari (appear as garbled entries — remove)
    "\u0926": "d",   # द → d
    "\u0936": "sh",  # श → sh
    "\u0947": "e",   # े (Devanagari vowel sign E) → e

    # Bengali characters in roman field — map to Latin equivalents
    "\u09C1": "",    # ু (Bengali vowel sign U) → remove
    "\u09B2": "l",   # ল (Bengali LA) → l

    # Tilde (combining, not decomposed)
    "~": "",         # literal tilde used for nasalization — remove
}

# Characters that are explicitly allowed in roman fields (from lint_content.py).
# Anything outside ASCII + this set gets sanitized.
ALLOWED_ROMAN_CHARS: set[str] = set(
    "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789 /-().',\"!?āĀēĒīĪōŌūŪṭṬḍḌṇṆśŚṣṢṛṚñô"
)


def _fallback(ch: str) -> str:
    """For a non-allowed character not in CHAR_MAP, return its ASCII base or ''."""
    # Try NFKD decomposition: take only ASCII base letters, discard combining marks
    decomposed = unicodedata.normalize("NFKD", ch)
    base = ""
    for c in decomposed:
        cat = unicodedata.category(c)
        if cat.startswith("M"):   # combining mark — skip
            continue
        if ord(c) < 128:
            base += c
        # else: non-ASCII non-combining — skip (non-Latin scripts)
    return base


def sanitize_roman(roman: str) -> str:
    """Return a clean romanization string with only allowed characters."""
    # Step 1: apply explicit substitution table character by character
    result = []
    for ch in roman:
        if ch in CHAR_MAP:
            result.append(CHAR_MAP[ch])
        else:
            result.append(ch)
    roman = "".join(result)

    # Step 2: for any remaining non-allowed character, use NFKD fallback
    cleaned = []
    for ch in roman:
        if ch in ALLOWED_ROMAN_CHARS:
            cleaned.append(ch)
        else:
            cleaned.append(_fallback(ch))
    roman = "".join(cleaned)

    return roman


def process(dry_run: bool) -> int:
    data = json.loads(ENRICHED.read_text(encoding="utf-8"))

    changed = 0
    for entry in data:
        old = entry.get("roman", "")
        new = sanitize_roman(old)
        if old != new:
            changed += 1
            if dry_run:
                print(f"  [{entry['lemma']}] {repr(old)} → {repr(new)}")
            else:
                entry["roman"] = new

    if dry_run:
        print(f"\nDry run: {changed} entries would be changed.")
    else:
        ENRICHED.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Fixed {changed} entries in {ENRICHED.name}.")

    return 0 if changed == 0 else 1


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Preview changes without writing files."
    )
    args = parser.parse_args()
    sys.exit(process(dry_run=args.dry_run))


if __name__ == "__main__":
    main()
