# Bangla Sikhuna — Project Plan

## High Priority

### 1. Fix XSS vulnerability in quiz rendering
- **File**: app.js:1068
- `q.prompt` and `q.display` are interpolated into `innerHTML` without escaping
- The rest of the quiz pipeline uses `escapeStr()` properly, but these two fields don't
- Audit all `innerHTML` assignments and consolidate on a single escaping function

### 2. Fix streak timezone bug
- **File**: app.js:603-635
- Streaks use UTC dates (`toISOString().slice(0,10)`), so users in positive UTC offsets can hit the wrong day boundary
- Example: user in UTC+8 practicing at 8 AM local time hits UTC midnight — streak may fail to increment or reset incorrectly
- Fix: use local midnight (`new Date().toLocaleDateString('en-CA')` or equivalent) instead of UTC

### 3. Remove learn screen key handler when leaving screen
- **File**: app.js:1421-1434
- The spacebar card-flip handler is attached once via `_learnKeyHandlerAttached` flag and never removed
- Pressing Space on unrelated screens (Today, quiz, etc.) tries to flip a non-existent card
- Fix: detach the keydown listener when navigating away from the learn screen

## Medium Priority

### 4. Clear reading session state on screen exit
- **File**: app.js:6012
- `readingSession` global is never reset when the user leaves the reading screen
- Old answers could bleed into a new session if the user starts a different passage
- Fix: set `readingSession = null` in `switchTab()` or `showScreen()` when leaving reading

### 5. Complete light theme CSS
- **File**: styles.css
- Dark mode is thorough but `[data-theme="light"]` overrides only cover ~85% of components
- Missing light-mode styles for some buttons, badges, and interactive elements
- Audit all components and add missing light theme variables/overrides

### 6. Complete immersion mode translations
- Several quiz prompts (e.g. "Type the English meaning:") still appear in English in immersion mode
- Not all modules define `promptBn` on their question objects
- Audit all quiz prompt strings and add Bengali translations to `UI_STRINGS_BN` and/or `promptBn` fields

## Low Priority (Feature Ideas)

### 7. Vocabulary frequency bands
- The 4,399-word vocab set is monolithic
- Subdivide into proficiency levels (A1/A2/B1/B2) so learners can focus on "top 500 words" first
- Could add a `freqBand` field to vocab entries and filter by band in the UI

### 8. Listening/pronunciation drills beyond alphabet
- The quiz engine supports listening mode, but there are no dedicated listening modules for vocabulary or phrases
- Add listening-mode quiz options to vocab and phrases modules

### 9. Verb conjugation quiz
- The conjugation explorer exists as a reference table in Grammar but has no interactive drill
- Add a quiz mode where users practice conjugating verbs across tenses and persons

### 10. Add HTML meta tags
- **File**: index.html
- Missing `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`), and `<link rel="icon">`
- Matters for SEO and social media sharing

### 11. Phoneme pair drills
- No minimal-pair exercises for distinguishing similar sounds (e.g. ক vs খ, ট vs ঠ, দ vs ধ)
- Could be an advanced alphabet drill mode that plays two similar sounds and asks the user to identify which is which
