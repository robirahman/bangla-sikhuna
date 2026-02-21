# Bengali App — Todo

## Bugs

| # | Bug | Location | Severity |
|---|-----|----------|:--------:|
| B1 | **Cross-module mistake review is broken** — `startMistakeReview()` only handles `type === 'alphabet'` mistakes; for vocab/grammar/phrases it shows an unhelpful alert telling the user to go navigate manually. Should dispatch missed vocab to `generateVocabQuiz`, grammar mistakes to `startGrammarQuiz`, and phrase mistakes to `startPhrasesQuiz` with the specific missed items. | `app.js:5231` | High |
| B2 | **Conjuncts, matras, numerals, and number names excluded from FSRS review** — `getDueItems()` iterates `ALL_LETTERS`, which only contains vowels and consonants. `CONJUNCTS` (32 items), `MATRA_COMBOS` (45 items), `BENGALI_NUMERALS` (10 items), and `BENGALI_NUMBER_NAMES` (32 items) are never added to the Today review queue. Progress is tracked for them but spaced repetition is never scheduled. | `app.js:5373` | High |
| B3 | **Wrong example word for conjunct ত্থ** — example given is `সত্থ (shottha — truth)` but সত্থ is not a standard Bengali word. "Truth" is `সত্য (shotyo)`. A real ত্থ example: `স্বাস্থ্য (shasthyo — health)` or `উপস্থিত (upôsthit — present)`. | `app.js:226` | Medium |
| B4 | **Triple-d romanization typo in দ্ধ example** — `শুদ্ধ (shudddho — pure)` has three d's; should be `shuddho`. | `app.js:227` | Low |
| B5 | **Romanization inconsistency for স** — IPA is listed as `/s/` and the letter is named "Dental Sa", but its example `সূর্য (shurjo)` uses `sh` romanization. A learner who reads the IPA then sees `sh` in the example will be confused. Either pick an example where স is unambiguously /s/ (e.g., `সাথে — with`) or update the IPA to `/s~ʃ/` with a note. | `app.js:64` | Low |
| B6 | **Review session caps letters/vocab at 10 but not grammar/phrases** — if many lessons and phrase situations are overdue, the review session chains all of them back-to-back with no cap. Grammar and phrases should be capped similarly (e.g., 3 of each per session), prioritising the most overdue. | `app.js:5466` | Medium |
| B7 | **Mistake count badge includes already-mastered items** — the Today screen shows `recentMistakes.length` which includes past mistakes on cards the user subsequently mastered. The count should filter to items whose current mastery is still ≤ 2. | `app.js:5191` | Low |
| B8 | **Theme, FIB mode, and listening mode stored globally, not per profile** — `bengali_palette`, `bengali_fib_mode`, and `bengali_listening_mode` use global localStorage keys. On a shared device, changing settings for one user affects all users. These should be stored inside the per-user progress object. | `app.js:4343` | Low |
| B9 | **No localStorage error handling** — `_saveProgressLS` calls `localStorage.setItem()` without try/catch. In strict privacy browsers it throws `SecurityError`; at the ~5 MB quota it throws `QuotaExceededError`. Both would silently break progress saving. | `app.js:497` | Medium |
| B10 | **`practiceLog` grows unbounded** — one entry is appended per calendar day and never pruned. After 2–3 years of use this becomes a 1000+ key object. Should trim to the last 365 days on load or save. | `app.js:572` | Low |
| B11 | **FSRS weight array has 2 unused entries** — `FSRS_W` has 19 elements but the formulas only use indices 0–16; `w[17]` and `w[18]` are never accessed. The comment says "FSRS-4.5" (17 params) but the count matches FSRS-5 (19 params). Clarify which version is implemented and remove or document the extra weights. | `app.js:5257` | Low |
| B12 | **`recentMistakes` cap and `startMistakeReview` slice are inconsistent** — the array is capped at 100 entries but the review function uses only `slice(-50)`. Use the same number throughout. | `app.js:1672` | Low |

---

## Features

| # | Task | Category | User Value | Difficulty |
|---|------|----------|:----------:|:----------:|
| 6 | **Writing / character tracing** — stroke-order animations or guided drawing canvas for the 50-character alphabet; the existing `STROKE_HINTS` map provides a verbal description for every letter that could seed the animations | Feature | Medium | Hard |
| 15 | **Counting and arithmetic practice** — within the Numbers tab, add simple arithmetic shown in Bengali numerals (`৫ + ৩ = ?` with Bengali digit answer buttons), counting-with-audio exercises, and calendar/date reading (`২৫ মার্চ ১৯৭১`) | Feature | Medium | Medium |
| 16 | **Reading practice module** — graded short texts (50–150 words) composed only of vocabulary the learner has already mastered; tap unknown words to open the vocab modal; bridges isolated word learning and real reading fluency | Feature | High | Hard |
| 17 | **SRS forecast view** — a list or mini-calendar on the Today screen showing how many reviews are due today, tomorrow, and the next 7 days; helps learners plan study time and makes the scheduling system visible | Feature | Medium | Easy |
| 18 | **Conjugation reference** — an interactive conjugation table for the 20 most frequent verbs (করা, যাওয়া, আসা, বলা, দেওয়া…) showing all tenses and formality levels (তুই/তুমি/আপনি) side by side; linked from vocabulary cards for the relevant verbs | Feature | High | Medium |
| 19 | **Category vocabulary drills** — a "Start Category Quiz" button when a category filter is active, so learners can say "quiz me only on food words" without having to browse the full flashcard list | Feature | Medium | Easy |
| 21 | **Streak freeze** — one "freeze" token earned at each 7-day streak milestone, usable to protect a streak when the user misses a day; reduces streak-anxiety for travelling or sick days | Feature | Medium | Easy |
| 22 | **Vocabulary word relationships** — in the vocab modal, show 2–3 related words: a synonym, a derived form, or a compound (e.g., বই → বইপড়া, পাঠ্যবই); helps learners build lexical networks rather than isolated translations | Feature | Medium | Hard |
| 23 | **Keyboard shortcuts for Learn mode rating** — in flashcard Learn mode, pressing Space flips the card; add Y/N (or 1/2/3) after flipping to rate confidence before advancing; speeds up the learn phase for users who already know many letters | Feature | Low | Easy |
| 24 | **Focused listening mode per category** — extend the existing listening quiz modality to vocabulary categories, so a learner can do audio-only drills on, say, family words or colour words specifically | Feature | Medium | Medium |

---

## Code quality

| # | Task | Category | User Value | Difficulty |
|---|------|----------|:----------:|:----------:|
| 10 | **Split monolithic `app.js`** — CSS was extracted to `styles.css` and markup slimmed, but the JS engine is still a single 6,500-line file; extract logical modules (FSRS engine, quiz engine, alphabet module, vocab module, grammar module, phrases module, UI utilities) into separate files | Code | Low | Hard |
| 25 | **Fix sw.js double-clone in stale-while-revalidate path** — `cacheAndReturn` is called with `response.clone()` and then clones again internally (`sw.js:62`); pass the original response and restructure to clone once for cache and return once to the caller | Code | Low | Easy |

---

## Done

| # | Task |
|---|------|
| 11 | **Replace inline `onclick=` handlers with `addEventListener`** — zero `onclick=` attributes remain in `index.html` or `app.js`; all events are handled via `addEventListener` / `data-action` delegation |
| 14 | **Numbers tab** — Bengali numeral glyphs (০–৯), number words (ones/teens/tens/large), and arithmetic recognition mode are all implemented in `NUMBER_MODULES` with a dedicated tab |
| 20 | **Progress export / import** — export the current user's progress object as a JSON file and re-import it; protects against accidental profile deletion or browser storage clearing; the data is already JSON so this is mostly a UI task |
