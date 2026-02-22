# Bangla Sikhuna — Project Plan

## High Priority (Done)

### 1. ~~Fix XSS vulnerability in quiz rendering~~ [DONE]
### 2. ~~Fix streak timezone bug~~ [DONE]
### 3. ~~Remove learn screen key handler when leaving screen~~ [DONE — no change needed, already guarded]

## Medium Priority (Done)

### 4. ~~Clear reading session state on screen exit~~ [DONE]
### 5. ~~Complete light theme CSS~~ [DONE]
### 6. ~~Complete immersion mode translations~~ [DONE]

## Low Priority (Done)

### 7. ~~Vocabulary frequency bands~~ [DONE]
- Added `level` field (A1/A2/B1/B2) to VOCAB_DATA based on freqRank
- Added level filter chips to vocab browse screen
- Added level badge on each word row in browse list

### 8. ~~Listening/pronunciation drills beyond alphabet~~ [DONE]
- Fixed vocab 🎧 Listen button to force listening mode (`generateVocabQuiz(words, 'listening')`)
- Phrases already include listening questions natively

### 9. ~~Verb conjugation quiz~~ [DONE]
- Added generateConjugationQuiz() with 3 question types: MC (identify form), MC (identify tense/pronoun), FIB (type conjugation)
- Added "Conjugation Quiz" button to conjugation explorer table
- Quiz covers all 6 verbs, 5 tenses, 3 formality levels

### 10. ~~Add HTML meta tags~~ [DONE]
- Added meta description, Open Graph, Twitter Card, favicon, apple-touch-icon to index.html

### 11. ~~Phoneme pair drills~~ [DONE]
- Added PHONEME_PAIRS data (19 pairs) to alphabet.js: retroflex vs dental, aspirated vs unaspirated, sibilants, vowel length
- Added phoneme pair quiz with listen-and-identify + description-match question types
- Added "Phoneme Pairs" card to Listening Practice section
