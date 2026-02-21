function generateStringPair(pool) {
  const special = new Set(["ৎ", "ং", "ঃ", "ঁ"]);
  const usable = pool.filter((l) => !special.has(l.letter));
  if (usable.length < 2) return null;
  const len = Math.min(2 + Math.floor(Math.random() * 3), usable.length); // 2–4
  const picked = shuffle(usable).slice(0, len);
  const bengali = picked.map((l) => l.letter).join("");
  const roman = picked.map((l) => l.romanized.split("/")[0].trim()).join("");
  return { bengali, roman, letters: picked };
}

function generateQuiz(letters, forceMode) {
  _arithmeticQuestions = []; // exit arithmetic mode
  quizQuestions = [];
  const shuffled = [...letters].sort(() => Math.random() - 0.5);

  // Weight by urgency: overdue ratio = elapsed_days / stability (FSRS), or legacy interval ratio
  const urgency = (l) => {
    const m = getMastery(l.letter);
    if (m === 0) return 500; // never practised — highest priority
    const card = progress.fsrs && progress.fsrs[l.letter];
    if (card && card.s > 0) {
      return _elapsedDays(l.letter) / card.s; // > 1 = overdue
    }
    const seenAgo = progress.lastSeen && progress.lastSeen[l.letter] ? Date.now() - new Date(progress.lastSeen[l.letter]).getTime() : Infinity;
    return seenAgo / REVIEW_INTERVALS_MS[m];
  };
  const weighted = [...shuffled].sort((a, b) => urgency(b) - urgency(a));

  // Take up to 10 questions, mixing question types
  const count = Math.min(10, weighted.length);
  const selected = weighted.slice(0, count);

  const listenMode = forceMode || getListeningMode();

  selected.forEach((item, i) => {
    // Alternate between MC-name, MC-sound, fill-in-blank, and string types
    let types;
    if (item._isMatraDrill) {
      // Matra drills: show the glyph combination, identify or type its romanized sound
      types = ["mc-sound", "fib-romanized"];
    } else if (item._isNumeral) {
      // Numerals don't form meaningful strings; use only name/value/romanization types
      types = ["mc-name", "mc-sound", "fib-name", "fib-romanized"];
    } else if (item._isNumberName) {
      // Number words: show Bengali word or numeric value; answer in English, Bengali, or romanized
      types = ["mc-name", "mc-sound", "fib-name", "fib-romanized"];
    } else if (listenMode === "listening") {
      types = ["listening-mc", "listening-fib"];
    } else if (listenMode === "mixed") {
      types = ["mc-name", "mc-sound", "fib-name", "fib-romanized", "listening-mc", "listening-fib"];
    } else {
      types = ["mc-name", "mc-sound", "fib-name", "fib-romanized", "read-string", "spell-string"];
    }
    const qtype = types[i % types.length];

    if (qtype === "mc-name") {
      // MC: What is the name of this letter/numeral?
      let correct, distractors;
      if (item._isNumberName) {
        // Show Bengali word; ask for English meaning
        correct = item.sound;
        distractors = generateDistractors(item, letters, "sound");
      } else {
        correct = item.name.split(" ")[0]; // short name (Bengali text)
        distractors = generateDistractors(item, letters, "name");
      }
      quizQuestions.push({
        type: "mc",
        letter: item.letter,
        letterType: item.type,
        prompt: item._isNumberName
          ? "What does this mean in English?"
          : item._isNumeral
            ? "What is the Bengali name of this numeral?"
            : "What is the name of this letter?",
        correct: correct,
        options: shuffle([correct, ...distractors]),
        fullAnswer: item.name,
        letterObj: item,
      });
    } else if (qtype === "mc-sound") {
      // MC: What sound / value does this letter make?
      let correct, distractors, displayLetter;
      if (item._isNumberName) {
        // Show numeric value; ask for the Bengali word
        correct = item.letter;
        distractors = generateDistractors(item, letters, "letter");
        displayLetter = item.ipa;
      } else {
        correct = item.ipa;
        distractors = generateDistractors(item, letters, "ipa");
        displayLetter = null;
      }
      quizQuestions.push({
        type: "mc",
        letter: item.letter,
        displayLetter: displayLetter,
        letterType: item.type,
        prompt: item._isNumberName
          ? `How do you say '${item.ipa}' in Bengali?`
          : item._isMatraDrill
            ? "What sound does this combination make?"
            : item._isNumeral
              ? "What value does this numeral represent?"
              : "What sound does this letter make?",
        correct: correct,
        options: shuffle([correct, ...distractors]),
        fullAnswer: item._isNumberName
          ? item.letter + " (" + item.romanized + ")"
          : item._isNumeral
            ? item.ipa + " (" + item.sound + ")"
            : item.ipa + " — " + item.sound,
        letterObj: item,
      });
    } else if (qtype === "fib-name") {
      // FIB: Type the name / Bengali word
      let acceptable, prompt, hint, displayLetter;
      if (item._isNumberName) {
        // Show numeric value; user types Bengali word or romanized form
        displayLetter = item.ipa;
        acceptable = [item.letter, item.romanized].filter(Boolean);
        prompt = `Type the Bengali word for ${item.ipa}:`;
        hint = "Hint: " + item.sound;
      } else {
        displayLetter = item.letter;
        acceptable = [
          item.name.split(" ")[0].toLowerCase(),
          item.name.split("(").pop().replace(")", "").trim().toLowerCase(),
          item.romanized.split("/")[0].trim().toLowerCase(),
        ].filter(Boolean);
        prompt = item._isNumeral ? "Type the Bengali name of this numeral:" : "Type the name of this letter:";
        hint = item._isNumeral ? "Hint: value " + item.ipa : "Hint: " + item.sound;
      }
      quizQuestions.push({
        type: "fib",
        letter: item.letter,
        displayLetter: item._isNumberName ? item.ipa : null,
        letterType: item.type,
        prompt,
        acceptable: [...new Set(acceptable)],
        answer: item._isNumberName ? item.letter : item.name,
        hint,
        letterObj: item,
      });
    } else if (qtype === "fib-romanized") {
      // FIB: Type the romanized form
      const acceptable = item.romanized.split("/").map((s) => s.trim().toLowerCase());
      // Also accept without diacritics
      acceptable.forEach((a) => {
        acceptable.push(a.replace(/[ṭḍṇṣṛñ]/g, (c) => ({ ṭ: "t", ḍ: "d", ṇ: "n", ṣ: "sh", ṛ: "r", ñ: "ny" })[c] || c));
      });
      quizQuestions.push({
        type: "fib",
        letter: item.letter,
        letterType: item.type,
        prompt: item._isNumberName
          ? "Type the romanized pronunciation:"
          : item._isMatraDrill
            ? "Type the romanized sound for this combination:"
            : item._isNumeral
              ? "Type the romanized pronunciation of this numeral:"
              : "Type the romanized form of this letter:",
        acceptable: [...new Set(acceptable)],
        answer: item.romanized,
        hint: item._isNumberName ? "Hint: " + item.sound : item._isMatraDrill ? "Hint: " + item.sound : "Hint: " + item.name,
        letterObj: item,
      });
    } else if (qtype === "read-string") {
      const str = generateStringPair(letters);
      if (str) {
        const roman = str.roman.toLowerCase();
        const romanNoDiacritics = roman.replace(/[ṭḍṇṣṛñ]/g, (c) => ({ ṭ: "t", ḍ: "d", ṇ: "n", ṣ: "sh", ṛ: "r", ñ: "ny" })[c] || c);
        const acceptable = [...new Set([roman, romanNoDiacritics])];
        quizQuestions.push({
          type: "fib",
          letter: str.bengali,
          prompt: "How do you pronounce this?",
          acceptable,
          answer: str.roman,
          hint: "",
          letterObj: null,
          letters: str.letters,
        });
      }
    } else if (qtype === "spell-string") {
      const str = generateStringPair(letters);
      if (str) {
        const special = new Set(["ৎ", "ং", "ঃ", "ঁ"]);
        const distractorPool = letters.filter((l) => !special.has(l.letter) && !str.letters.includes(l));
        const distractors = shuffle(distractorPool).slice(0, Math.min(4, distractorPool.length));
        const tiles = shuffle([...str.letters.map((l) => l.letter), ...distractors.map((l) => l.letter)]);
        quizQuestions.push({
          type: "spell",
          display: str.roman,
          correct: str.bengali,
          tiles,
          letters: str.letters,
          prompt: "Spell this in Bengali:",
        });
      }
    } else if (qtype === "listening-mc") {
      // Play the letter; pick correct romanized form from options
      const correct = item.romanized.split("/")[0].trim();
      const distPool = ALL_LETTERS.filter((l) => l.letter !== item.letter)
        .map((l) => l.romanized.split("/")[0].trim())
        .filter((v) => v !== correct);
      const distractors = shuffle([...new Set(distPool)]).slice(0, 3);
      quizQuestions.push({
        type: "listening-mc",
        letter: item.letter,
        letterType: item.type,
        audio: item.letter,
        prompt: "Which romanization matches what you hear?",
        correct,
        options: shuffle([correct, ...distractors]),
        fullAnswer: item.name,
        letterObj: item,
      });
    } else if (qtype === "listening-fib") {
      // Play the letter; type its romanized form
      const acceptable = item.romanized.split("/").map((s) => s.trim().toLowerCase());
      acceptable.forEach((a) => {
        acceptable.push(a.replace(/[ṭḍṇṣṛñ]/g, (c) => ({ ṭ: "t", ḍ: "d", ṇ: "n", ṣ: "sh", ṛ: "r", ñ: "ny" })[c] || c));
      });
      quizQuestions.push({
        type: "listening-fib",
        letter: item.letter,
        letterType: item.type,
        audio: item.letter,
        prompt: "Type the romanized form of what you hear:",
        acceptable: [...new Set(acceptable)],
        answer: item.romanized,
        hint: "Hint: " + item.name,
        letterObj: item,
      });
    }
  });
}

function generateDistractors(item, pool, field, allLetters = []) {
  const val = field === "name" ? item.name.split(" ")[0] : item[field];
  const others = pool
    .filter((l) => l.letter !== item.letter)
    .map((l) => (field === "name" ? l.name.split(" ")[0] : l[field]))
    .filter((v) => v !== val);
  // If not enough from module, pull from all letters
  if (others.length < 3) {
    const extras = allLetters
      .filter((l) => l.letter !== item.letter)
      .map((l) => (field === "name" ? l.name.split(" ")[0] : l[field]))
      .filter((v) => v !== val && !others.includes(v));
    others.push(...extras);
  }
  return shuffle(others).slice(0, 3);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export { generateStringPair, generateDistractors, shuffle };
