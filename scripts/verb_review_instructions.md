# Verb Example Review — Instructions for Native Speaker

## Background

The Bengali learning app teaches vocabulary with example sentences. Many verb entries use the dictionary (infinitive) form as if it were a conjugated verb, which teaches learners incorrect sentence structure. For example:

| Current (wrong)     | Correct                                     |
| ------------------- | ------------------------------------------- |
| তুমি কী **করা**?    | তুমি কী **করছ**? _(What are you doing?)_    |
| আমি ভাত **খাওয়া**। | আমি ভাত **খাচ্ছি**। _(I am eating rice.)_   |
| সে বই **পড়া**।     | সে বই **পড়ছে**। _(She is reading a book.)_ |

The script `flag_verb_examples.py` scanned all verb entries and produced `verb_audit.csv` — a list of every entry where the example sentence contains a subject pronoun (আমি, তুমি, সে…) **and** the sentence ends with the dictionary headword.

---

## Your Task

Open `verb_audit.csv` in Excel or Google Sheets. For each row:

1. **Read the `example_bengali` column** — the Bengali text of the current example.
2. **Decide which case applies:**

   ### Case A — Sentence needs conjugation (most common)

   The example reads like a sentence (has a subject pronoun) but uses the dictionary form as the main verb.

   **What to write in `corrected_example`:**
   Provide a complete, natural example sentence with:

   - The verb **conjugated** appropriately for the English gloss given
   - The same romanized transliteration style: `বাংলা বাক্য। (roman — English translation)`
   - Informal register (তুমি, সে, আমি) unless the headword is a formal/honorific form

   Example:

   ```
   তুমি কী করছ? (tumi ki korcho — What are you doing?)
   ```

   ### Case B — Gerund/infinitive use is intentional

   Sometimes the dictionary form is used correctly as a noun/gerund:

   - ✅ "খাওয়া ভালো।" — _"Eating is good."_ (gerund as subject) → OK
   - ✅ "সাঁতার কাটা শিখতে হবে।" — _"You need to learn to swim."_ → OK

   If the example is actually fine, write **"OK"** in `corrected_example` and briefly explain in `notes`.

   ### Case C — Replace the example entirely

   If neither the current sentence nor a simple conjugation fix works well, write a completely new example sentence that better illustrates the word's meaning. Mark `notes` with "new example".

---

## Conjugation quick reference

The app targets **A1–B2 learners** using informal spoken Bengali. Prefer these tenses:

| Tense                     | আমি   | তুমি | সে/তিনি |
| ------------------------- | ----- | ---- | ------- |
| Simple present / habitual | করি   | করো  | করে     |
| Present continuous        | করছি  | করছ  | করছে    |
| Simple past               | করলাম | করলে | করল     |
| Future                    | করব   | করবে | করবে    |

For common irregular verbs: যাওয়া (to go) → যাই / যাচ্ছি / যাব; আসা (to come) → আসি / আসছি / আসব; খাওয়া (to eat) → খাই / খাচ্ছি / খাব; বলা (to say) → বলি / বলছি / বলব.

---

## Format for the corrected example

Always use this format (matching the app's existing style):

```
বাংলা বাক্য। (romanized-sentence — English translation.)
```

- End Bengali sentence with ।
- Romanization: use the same romanization scheme as the existing entries (sh for শ/ষ, chh for ছ, etc.)
- English translation should be a complete natural English sentence matching the tense you chose

---

## Columns in the CSV

| Column              | Meaning                                                   |
| ------------------- | --------------------------------------------------------- |
| `lemma`             | The Bengali headword (dictionary form)                    |
| `roman`             | Its romanized form                                        |
| `english`           | English gloss shown to learners                           |
| `example_bengali`   | Current Bengali example text                              |
| `example_full`      | Full current example including romanization               |
| `flag_reasons`      | Why it was flagged (has_subject_pronoun, ends_with_lemma) |
| `corrected_example` | **Fill this in** with your corrected example              |
| `notes`             | **Optional** — any notes or questions                     |

---

## After review

Once all rows have a value in `corrected_example`, send the CSV back and the corrections will be applied to the app's vocabulary database.

Thank you!
