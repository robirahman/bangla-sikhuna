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
