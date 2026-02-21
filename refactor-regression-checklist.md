# Bengali app modularization regression checklist

Run these checks after each module extraction step:

## 1) Alphabet extraction (`alphabet.js`)

- Open app and verify profile picker renders.
- Start Alphabet Learn, flip next/prev cards, and play letter audio.
- Start Alphabet Quiz and verify MC + FIB continue flow.

## 2) Quiz helpers extraction (`quiz-engine.js`)

- Start Alphabet Quiz and verify distractors look valid.
- Complete a quiz and verify score, elapsed time, and retry actions.

## 3) FSRS extraction (`fsrs.js`)

- Finish a quiz, rate answers (Again/Hard/Good/Easy), and ensure no errors.
- Check Today tab review due badge increments/decrements.

## 4) Today helpers extraction (`today.js`)

- Open Today tab and verify lesson-of-day card renders.
- Open reading passage and submit comprehension check.

## 5) Shared data modules (`vocab.js`, `grammar.js`, `phrases.js`)

- Open Vocabulary/Grammar/Phrases tabs and verify lists load.
- Start one quiz in each tab and verify progression and results.

## 6) Bootstrap wiring (`app.js` + `index.html`)

- Refresh app, switch tabs, open settings/help/search overlays.
- Verify delegated click handlers and Enter-to-submit still work.
