// ════════════════════════════════════════
//  BENGALI ALPHABET DATA
// ════════════════════════════════════════
const VOWELS = [
  { letter: "অ", name: "Ô (Shôro Ô)", romanized: "ô / o", ipa: "/ɔ/", sound: 'Like "o" in "hot"', example: "অনেক (ônek) — many/much" },
  { letter: "আ", name: "A (Shôro A)", romanized: "a / aa", ipa: "/a/", sound: 'Like "a" in "father"', example: "আম (am) — mango" },
  { letter: "ই", name: "I (Hrôshsho I)", romanized: "i", ipa: "/i/", sound: 'Like "ee" in "see" (short)', example: "ইট (iṭ) — brick" },
  { letter: "ঈ", name: "II (Dirgho II)", romanized: "ii / ī", ipa: "/iː/", sound: 'Like "ee" in "see" (long)', example: "ঈদ (īd) — Eid" },
  { letter: "উ", name: "U (Hrôshsho U)", romanized: "u", ipa: "/u/", sound: 'Like "oo" in "food" (short)', example: "উট (uṭ) — camel" },
  { letter: "ঊ", name: "UU (Dirgho UU)", romanized: "uu / ū", ipa: "/uː/", sound: 'Like "oo" in "food" (long)', example: "ঊন (ūn) — minus" },
  { letter: "ঋ", name: "Ri (Ri)", romanized: "ri / ṛ", ipa: "/ri/", sound: 'Like "ri" in "rip"', example: "ঋতু (ritu) — season" },
  { letter: "এ", name: "E (E)", romanized: "e / ē", ipa: "/e/", sound: 'Like "ay" in "say"', example: "একটা (ekṭa) — one" },
  { letter: "ঐ", name: "OI (OI)", romanized: "oi", ipa: "/oi/", sound: 'Like "oy" in "boy"', example: "ঐক্য (oikko) — unity" },
  { letter: "ও", name: "O (O)", romanized: "o / ō", ipa: "/o/", sound: 'Like "o" in "go"', example: "ওজন (ojon) — weight" },
  { letter: "ঔ", name: "OU (OU)", romanized: "ou", ipa: "/ou/", sound: 'Like "ow" in "cow"', example: "ঔষধ (oushôdh) — medicine" },
];

const CONSONANTS_VELAR = [
  { letter: "ক", name: "Kô", romanized: "k / kô", ipa: "/k/", sound: 'Like "k" in "kite"', example: "কলম (kôlôm) — pen" },
  { letter: "খ", name: "Khô", romanized: "kh / khô", ipa: "/kʰ/", sound: 'Aspirated "k", like "k" in "kin"', example: "খবর (khôbôr) — news" },
  { letter: "গ", name: "Gô", romanized: "g / gô", ipa: "/ɡ/", sound: 'Like "g" in "go"', example: "গরু (goru) — cow" },
  { letter: "ঘ", name: "Ghô", romanized: "gh / ghô", ipa: "/ɡʱ/", sound: 'Aspirated "g"', example: "ঘর (ghôr) — house" },
  { letter: "ঙ", name: "Ngô (Umô)", romanized: "ng / ṅ", ipa: "/ŋ/", sound: 'Like "ng" in "sing"', example: "বাঙালি (bangali) — Bengali" },
];

const CONSONANTS_PALATAL = [
  { letter: "চ", name: "Chô", romanized: "ch / chô", ipa: "/tʃ/", sound: 'Like "ch" in "chat"', example: "চা (cha) — tea" },
  { letter: "ছ", name: "Chhô", romanized: "chh / chhô", ipa: "/tʃʰ/", sound: 'Aspirated "ch"', example: "ছবি (chhobi) — picture" },
  { letter: "জ", name: "Jô (Borgiyo Jô)", romanized: "j / jô", ipa: "/dʒ/", sound: 'Like "j" in "jam"', example: "জল (jôl) — water" },
  { letter: "ঝ", name: "Jhô", romanized: "jh / jhô", ipa: "/dʒʱ/", sound: 'Aspirated "j"', example: "ঝড় (jhôṛ) — storm" },
  { letter: "ঞ", name: "Niyô (Ñô)", romanized: "ny / ñ", ipa: "/ɲ/", sound: 'Like "ny" in "canyon"', example: "মিঞা (minya) — mister" },
];

const CONSONANTS_RETROFLEX = [
  {
    letter: "ট",
    name: "Ṭô (Murdhonyo Ṭô)",
    romanized: "ṭ / ṭô",
    ipa: "/ʈ/",
    sound: 'Retroflex "t" (tongue curled back)',
    example: "টাকা (ṭaka) — money",
  },
  { letter: "ঠ", name: "Ṭhô", romanized: "ṭh / ṭhô", ipa: "/ʈʰ/", sound: 'Aspirated retroflex "t"', example: "ঠান্ডা (ṭhanḍa) — cold" },
  { letter: "ড", name: "Ḍô", romanized: "ḍ / ḍô", ipa: "/ɖ/", sound: 'Retroflex "d" (tongue curled back)', example: "ডাক (ḍak) — mail" },
  { letter: "ঢ", name: "Ḍhô", romanized: "ḍh / ḍhô", ipa: "/ɖʱ/", sound: 'Aspirated retroflex "d"', example: "ঢাকা (ḍhaka) — Dhaka" },
  {
    letter: "ণ",
    name: "Nô (Murdhonyo Nô)",
    romanized: "ṇ / ṇô",
    ipa: "/ɳ/",
    sound: 'Retroflex "n" (tongue curled back)',
    example: "বাণ (baṇ) — arrow",
  },
];

const CONSONANTS_DENTAL = [
  {
    letter: "ত",
    name: "Tô (Dontyo Tô)",
    romanized: "t / tô",
    ipa: "/t̪/",
    sound: 'Dental "t" (tongue touches teeth)',
    example: "তারা (tara) — they/star",
  },
  { letter: "থ", name: "Thô", romanized: "th / thô", ipa: "/t̪ʰ/", sound: 'Aspirated dental "t"', example: "থালা (thala) — plate" },
  { letter: "দ", name: "Dô (Dontyo Dô)", romanized: "d / dô", ipa: "/d̪/", sound: 'Dental "d" (tongue touches teeth)', example: "দিন (din) — day" },
  { letter: "ধ", name: "Dhô", romanized: "dh / dhô", ipa: "/d̪ʱ/", sound: 'Aspirated dental "d"', example: "ধান (dhan) — paddy" },
  { letter: "ন", name: "Nô (Dontyo Nô)", romanized: "n / nô", ipa: "/n/", sound: 'Like "n" in "no"', example: "নদী (nôdi) — river" },
];

const CONSONANTS_LABIAL = [
  { letter: "প", name: "Pô", romanized: "p / pô", ipa: "/p/", sound: 'Like "p" in "spin"', example: "পানি (pani) — water" },
  { letter: "ফ", name: "Phô", romanized: "ph / phô", ipa: "/pʰ/", sound: 'Aspirated "p" or "f" sound', example: "ফুল (phul) — flower" },
  { letter: "ব", name: "Bô", romanized: "b / bô", ipa: "/b/", sound: 'Like "b" in "bat"', example: "বই (boi) — book" },
  { letter: "ভ", name: "Bhô", romanized: "bh / bhô", ipa: "/bʱ/", sound: 'Aspirated "b"', example: "ভাত (bhat) — rice" },
  { letter: "ম", name: "Mô", romanized: "m / mô", ipa: "/m/", sound: 'Like "m" in "man"', example: "মা (ma) — mother" },
];

const CONSONANTS_OTHER = [
  {
    letter: "য",
    name: "Jô (Antahsthô Jô)",
    romanized: "j / z",
    ipa: "/dʒ/ or /z/",
    sound: 'Like "j" or "z" depending on position',
    example: "যা (ja) — go",
  },
  { letter: "র", name: "Rô", romanized: "r / rô", ipa: "/r/", sound: 'Flapped "r" like Spanish "r"', example: "রং (rông) — color" },
  { letter: "ল", name: "Lô", romanized: "l / lô", ipa: "/l/", sound: 'Like "l" in "lamp"', example: "লাল (lal) — red" },
  {
    letter: "শ",
    name: "Shô (Talobbo Shô)",
    romanized: "sh / shô",
    ipa: "/ʃ/",
    sound: 'Like "sh" in "ship"',
    example: "শিক্ষা (shikkha) — education",
  },
  {
    letter: "ষ",
    name: "Shô (Murdhonyo Shô)",
    romanized: "ṣh / ṣhô",
    ipa: "/ʃ/",
    sound: 'Like "sh" (retroflex, same as শ in modern)',
    example: "ষাঁড় (shaṛ) — bull",
  },
  { letter: "স", name: "Sô (Dontyo Sô)", romanized: "s / sô", ipa: "/s/", sound: 'Like "s" in "sun"', example: "সাথে (sathe) — with" },
  { letter: "হ", name: "Hô", romanized: "h / hô", ipa: "/h/", sound: 'Like "h" in "hat"', example: "হাত (hat) — hand" },
];

const CONSONANTS_SPECIAL = [
  { letter: "ড়", name: "Ṛô (Ḍô-e Shunno)", romanized: "ṛ / ṛô", ipa: "/ɽ/", sound: 'Flapped retroflex "r"', example: "পড়া (pôṛa) — to read" },
  {
    letter: "ঢ়",
    name: "Ṛhô (Ḍhô-e Shunno)",
    romanized: "ṛh / ṛhô",
    ipa: "/ɽʱ/",
    sound: "Aspirated flapped retroflex",
    example: "আষাঢ় (ashaṛh) — month name",
  },
  { letter: "য়", name: "Yô (Ôntohsthô Yô)", romanized: "y / yô", ipa: "/j/", sound: 'Like "y" in "yes"', example: "যায় (jay) — goes" },
  { letter: "ৎ", name: "Khônḍô Tô", romanized: "t", ipa: "/t/", sound: 'Abrupt "t" (unreleased stop)', example: "হঠাৎ (hothat) — suddenly" },
  { letter: "ং", name: "Anushshar", romanized: "ng / ṃ", ipa: "/ŋ/", sound: 'Nasal "ng" at end of syllable', example: "বাংলা (bangla) — Bengali" },
  { letter: "ঃ", name: "Bishôrgô", romanized: "h / ḥ", ipa: "/h/", sound: "Light aspiration / breath", example: "দুঃখ (dukhkhô) — sorrow" },
  { letter: "ঁ", name: "Chôndrobindu", romanized: "~n / n̐", ipa: "/◌̃/", sound: "Nasalizes the preceding vowel", example: "চাঁদ (chãd) — moon" },
];

const ALL_CONSONANTS = [
  ...CONSONANTS_VELAR,
  ...CONSONANTS_PALATAL,
  ...CONSONANTS_RETROFLEX,
  ...CONSONANTS_DENTAL,
  ...CONSONANTS_LABIAL,
  ...CONSONANTS_OTHER,
  ...CONSONANTS_SPECIAL,
];

const ALL_LETTERS = [...VOWELS.map((v) => ({ ...v, type: "vowel" })), ...ALL_CONSONANTS.map((c) => ({ ...c, type: "consonant" }))];

// ════════════════════════════════════════
//  BENGALI NUMERALS (০–৯)
// ════════════════════════════════════════
const BENGALI_NUMERALS = [
  {
    letter: "০",
    name: "শূন্য (Shunno)",
    romanized: "shunno",
    ipa: "0",
    sound: "zero",
    example: "০ থেকে শুরু করো। (shunno theke shuru koro — Start from zero.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "১",
    name: "এক (Ek)",
    romanized: "ek",
    ipa: "1",
    sound: "one",
    example: "১ টাকা। (ek taka — One taka.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "২",
    name: "দুই (Dui)",
    romanized: "dui",
    ipa: "2",
    sound: "two",
    example: "২ জন আছে। (dui jon ache — There are two people.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "৩",
    name: "তিন (Tin)",
    romanized: "tin",
    ipa: "3",
    sound: "three",
    example: "৩ দিন পরে। (tin dine pore — After three days.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "৪",
    name: "চার (Char)",
    romanized: "char",
    ipa: "4",
    sound: "four",
    example: "৪ টি বই। (char-ti boi — Four books.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "৫",
    name: "পাঁচ (Panch)",
    romanized: "panch",
    ipa: "5",
    sound: "five",
    example: "৫ টাকা দাও। (panch taka dao — Give five taka.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "৬",
    name: "ছয় (Chhoy)",
    romanized: "chhoy",
    ipa: "6",
    sound: "six",
    example: "৬ মাস পরে। (chhoy mash pore — After six months.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "৭",
    name: "সাত (Shat)",
    romanized: "shat",
    ipa: "7",
    sound: "seven",
    example: "৭ দিনে সপ্তাহ। (shat dine shoptaho — Seven days in a week.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "৮",
    name: "আট (Aat)",
    romanized: "aat",
    ipa: "8",
    sound: "eight",
    example: "৮ ঘণ্টা ঘুম। (aat ghonta ghum — Eight hours of sleep.)",
    type: "numeral",
    _isNumeral: true,
  },
  {
    letter: "৯",
    name: "নয় (Noy)",
    romanized: "noy",
    ipa: "9",
    sound: "nine",
    example: "৯ নম্বর বাড়ি। (noy nombor bari — House number nine.)",
    type: "numeral",
    _isNumeral: true,
  },
];

// ════════════════════════════════════════
//  BENGALI NUMBER NAMES  (named number words)
// ════════════════════════════════════════
// Ones & Teens (0–19), Tens (20–90), Large Numbers
// letter = Bengali word shown on flashcard
// ipa    = numeric value used for quiz prompts & distractors
// sound  = English meaning
const BENGALI_NUMBER_NAMES = [
  // ── Ones & Teens (0–19) ──
  {
    letter: "শূন্য",
    name: "শূন্য (shunno) — zero",
    romanized: "shunno",
    ipa: "0",
    sound: "zero",
    example: "শূন্য থেকে শুরু করো। — Start from zero.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "এক",
    name: "এক (ek) — one",
    romanized: "ek",
    ipa: "1",
    sound: "one",
    example: "একটি বই আছে। — There is one book.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "দুই",
    name: "দুই (dui) — two",
    romanized: "dui",
    ipa: "2",
    sound: "two",
    example: "দুটো আম। — Two mangoes.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "তিন",
    name: "তিন (tin) — three",
    romanized: "tin",
    ipa: "3",
    sound: "three",
    example: "তিনটি ফুল। — Three flowers.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "চার",
    name: "চার (char) — four",
    romanized: "char",
    ipa: "4",
    sound: "four",
    example: "চারটি চেয়ার। — Four chairs.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "পাঁচ",
    name: "পাঁচ (panch) — five",
    romanized: "panch",
    ipa: "5",
    sound: "five",
    example: "পাঁচটি টাকা দাও। — Give five taka.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "ছয়",
    name: "ছয় (chhoy) — six",
    romanized: "chhoy",
    ipa: "6",
    sound: "six",
    example: "ছয় মাস পরে। — After six months.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "সাত",
    name: "সাত (shat) — seven",
    romanized: "shat",
    ipa: "7",
    sound: "seven",
    example: "সাত দিনে এক সপ্তাহ। — Seven days in a week.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "আট",
    name: "আট (aat) — eight",
    romanized: "aat",
    ipa: "8",
    sound: "eight",
    example: "আট ঘণ্টা ঘুমাও। — Sleep eight hours.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "নয়",
    name: "নয় (noy) — nine",
    romanized: "noy",
    ipa: "9",
    sound: "nine",
    example: "নয় নম্বর বাড়ি। — House number nine.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "দশ",
    name: "দশ (dosh) — ten",
    romanized: "dosh",
    ipa: "10",
    sound: "ten",
    example: "দশটি বই আছে। — There are ten books.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "এগারো",
    name: "এগারো (egaro) — eleven",
    romanized: "egaro",
    ipa: "11",
    sound: "eleven",
    example: "এগারোটি ছেলে। — Eleven boys.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "বারো",
    name: "বারো (baro) — twelve",
    romanized: "baro",
    ipa: "12",
    sound: "twelve",
    example: "বারো মাসে এক বছর। — Twelve months in a year.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "তেরো",
    name: "তেরো (tero) — thirteen",
    romanized: "tero",
    ipa: "13",
    sound: "thirteen",
    example: "তেরোটি পাখি। — Thirteen birds.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "চৌদ্দ",
    name: "চৌদ্দ (chouddo) — fourteen",
    romanized: "chouddo",
    ipa: "14",
    sound: "fourteen",
    example: "চৌদ্দটি দিন। — Fourteen days.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "পনেরো",
    name: "পনেরো (ponero) — fifteen",
    romanized: "ponero",
    ipa: "15",
    sound: "fifteen",
    example: "পনেরো মিনিট। — Fifteen minutes.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "ষোলো",
    name: "ষোলো (sholo) — sixteen",
    romanized: "sholo",
    ipa: "16",
    sound: "sixteen",
    example: "ষোলো বছর বয়স। — Sixteen years old.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "সতেরো",
    name: "সতেরো (shotero) — seventeen",
    romanized: "shotero",
    ipa: "17",
    sound: "seventeen",
    example: "সতেরো জন আছে। — There are seventeen people.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "আঠারো",
    name: "আঠারো (atharo) — eighteen",
    romanized: "atharo",
    ipa: "18",
    sound: "eighteen",
    example: "আঠারো বছর। — Eighteen years.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "উনিশ",
    name: "উনিশ (unish) — nineteen",
    romanized: "unish",
    ipa: "19",
    sound: "nineteen",
    example: "উনিশটি গাছ। — Nineteen trees.",
    type: "number-name",
    _isNumberName: true,
  },
  // ── Tens (20–90) ──
  {
    letter: "বিশ",
    name: "বিশ (bish) — twenty",
    romanized: "bish",
    ipa: "20",
    sound: "twenty",
    example: "বিশটি প্রশ্ন। — Twenty questions.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "ত্রিশ",
    name: "ত্রিশ (trish) — thirty",
    romanized: "trish",
    ipa: "30",
    sound: "thirty",
    example: "ত্রিশ মিনিট। — Thirty minutes.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "চল্লিশ",
    name: "চল্লিশ (chollish) — forty",
    romanized: "chollish",
    ipa: "40",
    sound: "forty",
    example: "চল্লিশ কিলোমিটার। — Forty kilometres.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "পঞ্চাশ",
    name: "পঞ্চাশ (ponchas) — fifty",
    romanized: "ponchas",
    ipa: "50",
    sound: "fifty",
    example: "পঞ্চাশ টাকা। — Fifty taka.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "ষাট",
    name: "ষাট (shaṭ) — sixty",
    romanized: "shaṭ",
    ipa: "60",
    sound: "sixty",
    example: "ষাট সেকেন্ড। — Sixty seconds.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "সত্তর",
    name: "সত্তর (shottor) — seventy",
    romanized: "shottor",
    ipa: "70",
    sound: "seventy",
    example: "সত্তর বছর বয়স। — Seventy years old.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "আশি",
    name: "আশি (ashi) — eighty",
    romanized: "ashi",
    ipa: "80",
    sound: "eighty",
    example: "আশি কিলো। — Eighty kilos.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "নব্বই",
    name: "নব্বই (nobboi) — ninety",
    romanized: "nobboi",
    ipa: "90",
    sound: "ninety",
    example: "নব্বই পার্সেন্ট। — Ninety percent.",
    type: "number-name",
    _isNumberName: true,
  },
  // ── Large Numbers ──
  {
    letter: "একশো",
    name: "একশো (ekshо) — one hundred",
    romanized: "eksho",
    ipa: "100",
    sound: "one hundred",
    example: "একশো টাকা। — One hundred taka.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "এক হাজার",
    name: "এক হাজার (ek hajar) — one thousand",
    romanized: "ek hajar",
    ipa: "1,000",
    sound: "one thousand",
    example: "এক হাজার মানুষ। — One thousand people.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "দশ হাজার",
    name: "দশ হাজার (dosh hajar) — ten thousand",
    romanized: "dosh hajar",
    ipa: "10,000",
    sound: "ten thousand",
    example: "দশ হাজার বর্গ মিটার। — Ten thousand square metres.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "এক লাখ",
    name: "এক লাখ (ek lakh) — one lakh",
    romanized: "ek lakh",
    ipa: "1,00,000",
    sound: "one lakh",
    example: "এক লাখ টাকা। — One lakh taka.",
    type: "number-name",
    _isNumberName: true,
  },
  {
    letter: "দশ লাখ",
    name: "দশ লাখ (dosh lakh) — ten lakh",
    romanized: "dosh lakh",
    ipa: "10,00,000",
    sound: "ten lakh",
    example: "দশ লাখ মানুষ। — Ten lakh people.",
    type: "number-name",
    _isNumberName: true,
  },
];

// ════════════════════════════════════════
//  MATRA COMBOS  (consonant + vowel sign)
// ════════════════════════════════════════
// 5 representative consonants × 9 matras = 45 combinations.
// _isMatraDrill:true causes generateQuiz() to use mc-sound + fib-romanized only.
// `ipa` stores the romanized syllable so mc-sound distractors are other syllables.
const MATRA_COMBOS = [
  // ক (k) + each matra
  { letter: "কা", name: "কা (ka)", romanized: "ka", ipa: "ka", sound: "ক + া", example: "কাজ (kaj — work)", type: "matra", _isMatraDrill: true },
  {
    letter: "কি",
    name: "কি (ki)",
    romanized: "ki",
    ipa: "ki",
    sound: "ক + ি",
    example: "কিছু (kichhu — something)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "কী",
    name: "কী (kii)",
    romanized: "kii",
    ipa: "kii",
    sound: "ক + ী",
    example: "কীভাবে (kibhabe — how)",
    type: "matra",
    _isMatraDrill: true,
  },
  { letter: "কু", name: "কু (ku)", romanized: "ku", ipa: "ku", sound: "ক + ু", example: "কুকুর (kukur — dog)", type: "matra", _isMatraDrill: true },
  { letter: "কূ", name: "কূ (kuu)", romanized: "kuu", ipa: "kuu", sound: "ক + ূ", example: "কূপ (kup — well)", type: "matra", _isMatraDrill: true },
  { letter: "কে", name: "কে (ke)", romanized: "ke", ipa: "ke", sound: "ক + ে", example: "কে (ke — who)", type: "matra", _isMatraDrill: true },
  {
    letter: "কৈ",
    name: "কৈ (koi)",
    romanized: "koi",
    ipa: "koi",
    sound: "ক + ৈ",
    example: "কৈশোর (koishore — youth)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "কো",
    name: "কো (ko)",
    romanized: "ko",
    ipa: "ko",
    sound: "ক + ো",
    example: "কোথায় (kothay — where)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "কৌ",
    name: "কৌ (kou)",
    romanized: "kou",
    ipa: "kou",
    sound: "ক + ৌ",
    example: "কৌতূহল (koutuhal — curiosity)",
    type: "matra",
    _isMatraDrill: true,
  },
  // গ (g) + each matra
  { letter: "গা", name: "গা (ga)", romanized: "ga", ipa: "ga", sound: "গ + া", example: "গান (gan — song)", type: "matra", _isMatraDrill: true },
  {
    letter: "গি",
    name: "গি (gi)",
    romanized: "gi",
    ipa: "gi",
    sound: "গ + ি",
    example: "গিটার (gitar — guitar)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "গী",
    name: "গী (gii)",
    romanized: "gii",
    ipa: "gii",
    sound: "গ + ী",
    example: "গীত (git — song/hymn)",
    type: "matra",
    _isMatraDrill: true,
  },
  { letter: "গু", name: "গু (gu)", romanized: "gu", ipa: "gu", sound: "গ + ু", example: "গুরু (guru — teacher)", type: "matra", _isMatraDrill: true },
  {
    letter: "গূ",
    name: "গূ (guu)",
    romanized: "guu",
    ipa: "guu",
    sound: "গ + ূ",
    example: "গূঢ় (gurho — mysterious)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "গে",
    name: "গে (ge)",
    romanized: "ge",
    ipa: "ge",
    sound: "গ + ে",
    example: "গেছি (gechi — I have gone)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "গৈ",
    name: "গৈ (goi)",
    romanized: "goi",
    ipa: "goi",
    sound: "গ + ৈ",
    example: "গৈরিক (goirik — saffron-hued)",
    type: "matra",
    _isMatraDrill: true,
  },
  { letter: "গো", name: "গো (go)", romanized: "go", ipa: "go", sound: "গ + ো", example: "গোলাপ (golap — rose)", type: "matra", _isMatraDrill: true },
  {
    letter: "গৌ",
    name: "গৌ (gou)",
    romanized: "gou",
    ipa: "gou",
    sound: "গ + ৌ",
    example: "গৌরব (gourab — glory)",
    type: "matra",
    _isMatraDrill: true,
  },
  // চ (ch) + each matra
  { letter: "চা", name: "চা (cha)", romanized: "cha", ipa: "cha", sound: "চ + া", example: "চা (cha — tea)", type: "matra", _isMatraDrill: true },
  {
    letter: "চি",
    name: "চি (chi)",
    romanized: "chi",
    ipa: "chi",
    sound: "চ + ি",
    example: "চিঠি (chithi — letter/mail)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "চী",
    name: "চী (chii)",
    romanized: "chii",
    ipa: "chii",
    sound: "চ + ী",
    example: "চীন (chin — China)",
    type: "matra",
    _isMatraDrill: true,
  },
  { letter: "চু", name: "চু (chu)", romanized: "chu", ipa: "chu", sound: "চ + ু", example: "চুল (chul — hair)", type: "matra", _isMatraDrill: true },
  {
    letter: "চূ",
    name: "চূ (chuu)",
    romanized: "chuu",
    ipa: "chuu",
    sound: "চ + ূ",
    example: "চূড়া (chura — peak/summit)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "চে",
    name: "চে (che)",
    romanized: "che",
    ipa: "che",
    sound: "চ + ে",
    example: "চেষ্টা (cheshta — effort)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "চৈ",
    name: "চৈ (choi)",
    romanized: "choi",
    ipa: "choi",
    sound: "চ + ৈ",
    example: "চৈত্র (choitro — spring month)",
    type: "matra",
    _isMatraDrill: true,
  },
  { letter: "চো", name: "চো (cho)", romanized: "cho", ipa: "cho", sound: "চ + ো", example: "চোখ (chokh — eye)", type: "matra", _isMatraDrill: true },
  {
    letter: "চৌ",
    name: "চৌ (chou)",
    romanized: "chou",
    ipa: "chou",
    sound: "চ + ৌ",
    example: "চৌদ্দ (chouddo — fourteen)",
    type: "matra",
    _isMatraDrill: true,
  },
  // ত (t) + each matra
  {
    letter: "তা",
    name: "তা (ta)",
    romanized: "ta",
    ipa: "ta",
    sound: "ত + া",
    example: "তাই (tai — so/therefore)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "তি",
    name: "তি (ti)",
    romanized: "ti",
    ipa: "ti",
    sound: "ত + ি",
    example: "তিনি (tini — he/she, formal)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "তী",
    name: "তী (tii)",
    romanized: "tii",
    ipa: "tii",
    sound: "ত + ী",
    example: "তীর (tir — shore/arrow)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "তু",
    name: "তু (tu)",
    romanized: "tu",
    ipa: "tu",
    sound: "ত + ু",
    example: "তুমি (tumi — you, informal)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "তূ",
    name: "তূ (tuu)",
    romanized: "tuu",
    ipa: "tuu",
    sound: "ত + ূ",
    example: "তূলা (tula — scales/Libra)",
    type: "matra",
    _isMatraDrill: true,
  },
  { letter: "তে", name: "তে (te)", romanized: "te", ipa: "te", sound: "ত + ে", example: "তেল (tel — oil)", type: "matra", _isMatraDrill: true },
  {
    letter: "তৈ",
    name: "তৈ (toi)",
    romanized: "toi",
    ipa: "toi",
    sound: "ত + ৈ",
    example: "তৈরি (toiri — ready/made)",
    type: "matra",
    _isMatraDrill: true,
  },
  { letter: "তো", name: "তো (to)", romanized: "to", ipa: "to", sound: "ত + ো", example: "তোমার (tomar — your)", type: "matra", _isMatraDrill: true },
  {
    letter: "তৌ",
    name: "তৌ (tou)",
    romanized: "tou",
    ipa: "tou",
    sound: "ত + ৌ",
    example: "তৌলিয়া (toulia — towel)",
    type: "matra",
    _isMatraDrill: true,
  },
  // ম (m) + each matra
  { letter: "মা", name: "মা (ma)", romanized: "ma", ipa: "ma", sound: "ম + া", example: "মা (ma — mother)", type: "matra", _isMatraDrill: true },
  {
    letter: "মি",
    name: "মি (mi)",
    romanized: "mi",
    ipa: "mi",
    sound: "ম + ি",
    example: "মিষ্টি (mishti — sweet)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "মী",
    name: "মী (mii)",
    romanized: "mii",
    ipa: "mii",
    sound: "ম + ী",
    example: "মীন (min — fish/Pisces)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "মু",
    name: "মু (mu)",
    romanized: "mu",
    ipa: "mu",
    sound: "ম + ু",
    example: "মুখ (mukh — face/mouth)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "মূ",
    name: "মূ (muu)",
    romanized: "muu",
    ipa: "muu",
    sound: "ম + ূ",
    example: "মূল (mul — root/main)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "মে",
    name: "মে (me)",
    romanized: "me",
    ipa: "me",
    sound: "ম + ে",
    example: "মেয়ে (meye — girl/daughter)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "মৈ",
    name: "মৈ (moi)",
    romanized: "moi",
    ipa: "moi",
    sound: "ম + ৈ",
    example: "মৈত্রী (moitri — friendship)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "মো",
    name: "মো (mo)",
    romanized: "mo",
    ipa: "mo",
    sound: "ম + ো",
    example: "মোমবাতি (mombati — candle)",
    type: "matra",
    _isMatraDrill: true,
  },
  {
    letter: "মৌ",
    name: "মৌ (mou)",
    romanized: "mou",
    ipa: "mou",
    sound: "ম + ৌ",
    example: "মৌসুম (mousum — season)",
    type: "matra",
    _isMatraDrill: true,
  },
];

// ════════════════════════════════════════
//  CONJUNCT CONSONANTS  (যুক্তবর্ণ)
// ════════════════════════════════════════
const CONJUNCTS = [
  { letter: "ক্ত", name: "Kto (kto)", romanized: "kto", ipa: "kt", sound: "ক + ত combined", example: "রক্ত (rokto — blood)", type: "conjunct" },
  {
    letter: "ক্ষ",
    name: "Ksha (ksha)",
    romanized: "ksha",
    ipa: "kʃ",
    sound: "ক + ষ combined",
    example: "ক্ষমা (kshoma — forgiveness)",
    type: "conjunct",
  },
  { letter: "ক্স", name: "Ks (ks)", romanized: "ks", ipa: "ks", sound: "ক + স combined", example: "বক্স (boks — box)", type: "conjunct" },
  {
    letter: "গ্ধ",
    name: "Gdh (gdh)",
    romanized: "gdh",
    ipa: "gdʱ",
    sound: "গ + ধ combined",
    example: "মুগ্ধ (mugdho — enchanted)",
    type: "conjunct",
  },
  { letter: "গ্ন", name: "Gno (gno)", romanized: "gno", ipa: "gn", sound: "গ + ন combined", example: "মগ্ন (mogno — engrossed)", type: "conjunct" },
  {
    letter: "ঙ্ক",
    name: "Ngko (ngko)",
    romanized: "ngko",
    ipa: "ŋk",
    sound: "ঙ + ক combined",
    example: "অঙ্ক (ongko — mathematics)",
    type: "conjunct",
  },
  { letter: "চ্ছ", name: "Cchho", romanized: "cchho", ipa: "tʃʰ", sound: "চ + ছ combined", example: "ইচ্ছা (icchha — desire)", type: "conjunct" },
  { letter: "জ্ঞ", name: "Gyo (gyo)", romanized: "gyo", ipa: "dʒɲ", sound: "জ + ঞ combined", example: "জ্ঞান (gyan — knowledge)", type: "conjunct" },
  { letter: "জ্ব", name: "Jbo (jbo)", romanized: "jbo", ipa: "dʒb", sound: "জ + ব combined", example: "জ্বর (jbor — fever)", type: "conjunct" },
  { letter: "ট্ট", name: "Ṭṭo (ṭṭo)", romanized: "ṭṭo", ipa: "ʈʈ", sound: "ট + ট combined", example: "চট্ট (choṭṭo — quick)", type: "conjunct" },
  { letter: "ণ্ড", name: "Ṇḍo (ṇḍo)", romanized: "ṇḍo", ipa: "ɳɖ", sound: "ণ + ড combined", example: "পণ্ড (poṇḍo — waste)", type: "conjunct" },
  { letter: "ত্ত", name: "Tto (tto)", romanized: "tto", ipa: "tt̪", sound: "ত + ত combined", example: "উত্তর (uttor — answer)", type: "conjunct" },
  {
    letter: "ত্থ",
    name: "Ttho (ttho)",
    romanized: "ttho",
    ipa: "t̪t̪ʰ",
    sound: "ত + থ combined",
    example: "স্বাস্থ্য (shasthyo — health)",
    type: "conjunct",
  },
  { letter: "দ্ধ", name: "Ddho (ddho)", romanized: "ddho", ipa: "d̪d̪ʱ", sound: "দ + ধ combined", example: "শুদ্ধ (shuddho — pure)", type: "conjunct" },
  { letter: "দ্ব", name: "Dbo (dbo)", romanized: "dbo", ipa: "d̪b", sound: "দ + ব combined", example: "দ্বার (dbar — door)", type: "conjunct" },
  { letter: "ন্ত", name: "Nto (nto)", romanized: "nto", ipa: "nt̪", sound: "ন + ত combined", example: "অন্ত (onto — end)", type: "conjunct" },
  { letter: "ন্দ", name: "Ndo (ndo)", romanized: "ndo", ipa: "nd̪", sound: "ন + দ combined", example: "আনন্দ (anondo — joy)", type: "conjunct" },
  { letter: "ন্ধ", name: "Ndho (ndho)", romanized: "ndho", ipa: "nd̪ʱ", sound: "ন + ধ combined", example: "অন্ধ (ondho — blind)", type: "conjunct" },
  { letter: "ন্ন", name: "Nno (nno)", romanized: "nno", ipa: "nn", sound: "ন + ন combined", example: "অন্ন (onno — food/rice)", type: "conjunct" },
  { letter: "ন্ম", name: "Nmo (nmo)", romanized: "nmo", ipa: "nm", sound: "ন + ম combined", example: "জন্ম (jonmo — birth)", type: "conjunct" },
  { letter: "ব্র", name: "Bro (bro)", romanized: "bro", ipa: "br", sound: "ব + র combined", example: "ব্রত (broto — vow)", type: "conjunct" },
  { letter: "ভ্র", name: "Bhro (bhro)", romanized: "bhro", ipa: "bʱr", sound: "ভ + র combined", example: "ভ্রম (bhrom — mistake)", type: "conjunct" },
  { letter: "ম্ব", name: "Mbo (mbo)", romanized: "mbo", ipa: "mb", sound: "ম + ব combined", example: "লম্বা (lomba — tall)", type: "conjunct" },
  { letter: "শ্ব", name: "Shbo (shbo)", romanized: "shbo", ipa: "ʃb", sound: "শ + ব combined", example: "বিশ্ব (bishbo — world)", type: "conjunct" },
  { letter: "শ্র", name: "Shro (shro)", romanized: "shro", ipa: "ʃr", sound: "শ + র combined", example: "শ্রম (shrom — labour)", type: "conjunct" },
  {
    letter: "ষ্ট",
    name: "Shṭo (shṭo)",
    romanized: "shṭo",
    ipa: "ʃʈ",
    sound: "ষ + ট combined",
    example: "কষ্ট (koshṭo — hardship)",
    type: "conjunct",
  },
  {
    letter: "ষ্ণ",
    name: "Shṇo (shṇo)",
    romanized: "shṇo",
    ipa: "ʃɳ",
    sound: "ষ + ণ combined",
    example: "কৃষ্ণ (krishno — Krishna)",
    type: "conjunct",
  },
  { letter: "স্ত", name: "Sto (sto)", romanized: "sto", ipa: "st̪", sound: "স + ত combined", example: "স্থান (sthan — place)", type: "conjunct" },
  {
    letter: "স্থ",
    name: "Stho (stho)",
    romanized: "stho",
    ipa: "st̪ʰ",
    sound: "স + থ combined",
    example: "স্থাপন (sthapona — establish)",
    type: "conjunct",
  },
  { letter: "স্প", name: "Spo (spo)", romanized: "spo", ipa: "sp", sound: "স + প combined", example: "স্পষ্ট (sposhṭo — clear)", type: "conjunct" },
  { letter: "হ্ন", name: "Hno (hno)", romanized: "hno", ipa: "hn", sound: "হ + ন combined", example: "চিহ্ন (chihno — sign/mark)", type: "conjunct" },
  {
    letter: "ল্ল",
    name: "Llo (llo)",
    romanized: "llo",
    ipa: "ll",
    sound: "ল + ল combined",
    example: "উল্লাস (ullas — jubilation)",
    type: "conjunct",
  },
];

// ════════════════════════════════════════
//  STROKE ORDER HINTS
// ════════════════════════════════════════
const STROKE_HINTS = {
  অ: ["Draw the curved hook from upper-right downward", "Add the lower horizontal tail curving right"],
  আ: ["Draw অ first", "Add a vertical bar extending down on the right"],
  ই: ["Draw a short vertical stroke", "Curve the top to the left", "Add the lower curved tail"],
  ঈ: ["Draw ই first", "Add the long extending tail looping right"],
  উ: ["Draw the top curved hook leftward", "Continue down with the body curve"],
  ঊ: ["Draw উ first", "Add the extra loop at the bottom"],
  ঋ: ["Draw the upper curve", "Add the descending stroke with a hook at bottom"],
  এ: ["Draw the top horizontal bar", "Curve down and left to form the body"],
  ঐ: ["Draw এ first", "Add the upper loop extending right"],
  ও: ["Draw the upper closed loop", "Add the lower descending curve"],
  ঔ: ["Draw ও first", "Add the rightward extending ear"],
  ক: ["Vertical stroke downward", "Arc from top curving right", "Small hook at bottom-right"],
  খ: ["Vertical stroke down", "Add horizontal bar at mid-height", "Curve upper-right portion"],
  গ: ["Draw the top curved hook", "Continue down into the body", "Add the lower right extension"],
  ঘ: ["Draw গ shape", "Add the additional upper-left loop"],
  ঙ: ["Small circle on top-right", "Descending stroke with left foot"],
  চ: ["Draw the upper curve arcing right", "Connect down into the lower body"],
  ছ: ["Draw চ first", "Add the upper loop or hook at top"],
  জ: ["Vertical bar down", "Horizontal top bar left", "Curved lower body rightward"],
  ঝ: ["Draw জ first", "Add the extra loop on the right"],
  ঞ: ["Draw the upper loop", "Add descending curves and the lower hook"],
  ট: ["Draw a short curve top-right", "Connect downward with a right-facing foot"],
  ঠ: ["Draw ট shape", "Add the top horizontal bar extending left"],
  ড: ["Vertical stroke with upper right-facing curve", "Lower hook extending left"],
  ঢ: ["Draw ড shape", "Add the extra upper extension"],
  ণ: ["Draw the upper loop", "Vertical stroke down", "Lower right-facing foot"],
  ত: ["Horizontal bar at top", "Two downward strokes forming the base"],
  থ: ["Draw ত first", "Add the upper looping extension"],
  দ: ["Upper arc top-right", "Downward stroke with left foot curve"],
  ধ: ["Draw দ shape", "Add the upper vertical bar on left"],
  ন: ["Curved body stroke", "Left descending foot", "Right upper hook"],
  প: ["Vertical stroke down", "Left arch at top", "Right small foot"],
  ফ: ["Draw প shape", "Add the upper loop or cross"],
  ব: ["Left vertical curve", "Close the right side", "Lower arc"],
  ভ: ["Draw ব shape", "Add the upper diagonal arm extending right"],
  ম: ["Left downstroke", "Right downstroke", "Connecting arch at top", "Lower connecting foot"],
  য: ["Upper loop arc", "Vertical descent", "Lower right foot curve"],
  র: ["Short upper hook right", "Descending curve to foot"],
  ল: ["Vertical stroke down", "Left foot extending", "Upper right hook"],
  শ: ["Three vertical strokes", "Connected by top bar", "Bottom curve connecting all"],
  ষ: ["Similar to শ with minor retroflex form differences"],
  স: ["Top bar left", "Right curve", "Bottom left foot"],
  হ: ["Left descending stroke", "Right arm curving up", "Lower connecting base"],
  ড়: ["Draw ড first", "Add the nukta dot below"],
  ঢ়: ["Draw ঢ first", "Add the nukta dot below"],
  য়: ["Draw য first", "Add the nukta dot below"],
  ৎ: ["Short sharp downstroke", "Curved base flick to right"],
  "ং": ["Small circle or loop on top", "Bindu dot"],
  "ঃ": ["Two small dots stacked vertically"],
  "ঁ": ["Small crescent shape with a dot above"],
};

// ════════════════════════════════════════
//  STROKE ORDER PATHS  (normalized 0–1)
// ════════════════════════════════════════
// Each letter maps to an array of strokes.
// Each stroke is an array of [x, y] points (0,0 = top-left, 1,1 = bottom-right).
// Strokes are ordered in conventional Bengali handwriting sequence.
// Coordinates approximate the letter shapes at the canvas center.
const STROKE_PATHS = {
  // ── Vowels ──────────────────────────
  "অ": [
    // Stroke 1: left curved body — top hook curves down and left, then sweeps right
    [[0.50,0.18],[0.42,0.22],[0.32,0.32],[0.28,0.45],[0.32,0.58],[0.40,0.65],[0.52,0.68],[0.60,0.62],[0.60,0.52]],
    // Stroke 2: right vertical stem
    [[0.60,0.18],[0.60,0.68]],
    // Stroke 3: matra (headline)
    [[0.22,0.18],[0.72,0.18]]
  ],
  "আ": [
    // Stroke 1: left curved body (same as অ)
    [[0.45,0.18],[0.37,0.22],[0.28,0.32],[0.24,0.45],[0.28,0.58],[0.36,0.65],[0.48,0.68],[0.55,0.62],[0.55,0.52]],
    // Stroke 2: middle vertical stem
    [[0.55,0.18],[0.55,0.68]],
    // Stroke 3: right vertical bar
    [[0.72,0.18],[0.72,0.68]],
    // Stroke 4: matra (headline)
    [[0.18,0.18],[0.80,0.18]]
  ],
  "ই": [
    // Stroke 1: upper loop curving left
    [[0.55,0.18],[0.45,0.22],[0.35,0.30],[0.32,0.40],[0.38,0.48],[0.50,0.50]],
    // Stroke 2: lower descending curve
    [[0.50,0.50],[0.42,0.58],[0.35,0.68],[0.40,0.76],[0.50,0.78]],
    // Stroke 3: matra
    [[0.25,0.18],[0.70,0.18]]
  ],
  "ঈ": [
    // Stroke 1: upper loop (same as ই)
    [[0.50,0.18],[0.40,0.22],[0.32,0.30],[0.28,0.40],[0.34,0.48],[0.46,0.50]],
    // Stroke 2: lower body
    [[0.46,0.50],[0.38,0.58],[0.32,0.68],[0.36,0.76],[0.46,0.78]],
    // Stroke 3: extending tail looping right
    [[0.46,0.78],[0.56,0.80],[0.66,0.76],[0.68,0.68],[0.62,0.62]],
    // Stroke 4: matra
    [[0.22,0.18],[0.72,0.18]]
  ],
  "উ": [
    // Stroke 1: top hook curving leftward then down into body
    [[0.58,0.18],[0.48,0.22],[0.38,0.28],[0.32,0.38],[0.30,0.50],[0.34,0.62],[0.42,0.70],[0.52,0.72]],
    // Stroke 2: matra
    [[0.28,0.18],[0.68,0.18]]
  ],
  "ঊ": [
    // Stroke 1: top hook curving leftward into body
    [[0.55,0.18],[0.45,0.22],[0.35,0.28],[0.30,0.38],[0.28,0.50],[0.32,0.60],[0.40,0.66]],
    // Stroke 2: extra loop at bottom
    [[0.40,0.66],[0.48,0.72],[0.56,0.76],[0.62,0.72],[0.60,0.64],[0.52,0.60]],
    // Stroke 3: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "ঋ": [
    // Stroke 1: upper curved body
    [[0.35,0.18],[0.35,0.35],[0.40,0.45],[0.50,0.48],[0.60,0.45],[0.62,0.35]],
    // Stroke 2: descending hook at bottom
    [[0.50,0.48],[0.48,0.58],[0.42,0.68],[0.38,0.78],[0.42,0.82],[0.52,0.80]],
    // Stroke 3: matra
    [[0.25,0.18],[0.72,0.18]]
  ],
  "এ": [
    // Stroke 1: top horizontal bar curving down into left body
    [[0.65,0.18],[0.50,0.18],[0.38,0.22],[0.30,0.32],[0.28,0.45],[0.32,0.58],[0.42,0.68],[0.55,0.72],[0.62,0.68]],
    // Stroke 2: matra
    [[0.25,0.18],[0.72,0.18]]
  ],
  "ঐ": [
    // Stroke 1: main body same as এ
    [[0.60,0.18],[0.46,0.18],[0.34,0.22],[0.26,0.32],[0.24,0.45],[0.28,0.58],[0.38,0.68],[0.50,0.72],[0.58,0.68]],
    // Stroke 2: upper diagonal ear extending right
    [[0.52,0.08],[0.58,0.12],[0.64,0.18]],
    // Stroke 3: matra
    [[0.20,0.18],[0.72,0.18]]
  ],
  "ও": [
    // Stroke 1: upper closed loop
    [[0.50,0.18],[0.38,0.24],[0.32,0.35],[0.36,0.45],[0.48,0.48],[0.58,0.44],[0.60,0.34],[0.55,0.24],[0.50,0.18]],
    // Stroke 2: lower descending curve
    [[0.48,0.48],[0.44,0.58],[0.40,0.68],[0.44,0.76],[0.52,0.78]],
    // Stroke 3: matra
    [[0.25,0.18],[0.70,0.18]]
  ],
  "ঔ": [
    // Stroke 1: upper loop (same as ও)
    [[0.45,0.18],[0.34,0.24],[0.28,0.35],[0.32,0.45],[0.44,0.48],[0.54,0.44],[0.56,0.34],[0.50,0.24],[0.45,0.18]],
    // Stroke 2: lower descending curve
    [[0.44,0.48],[0.40,0.58],[0.36,0.68],[0.40,0.76],[0.48,0.78]],
    // Stroke 3: rightward extending ear
    [[0.56,0.08],[0.62,0.12],[0.68,0.18]],
    // Stroke 4: matra
    [[0.20,0.18],[0.75,0.18]]
  ],

  // ── Velar Consonants (ক–ঙ) ─────────
  "ক": [
    // Stroke 1: left curved body
    [[0.50,0.18],[0.40,0.25],[0.32,0.35],[0.30,0.48],[0.35,0.58],[0.45,0.62]],
    // Stroke 2: right vertical stem
    [[0.58,0.18],[0.58,0.50],[0.55,0.60],[0.48,0.68],[0.42,0.72]],
    // Stroke 3: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "খ": [
    // Stroke 1: upper-right curved portion
    [[0.55,0.18],[0.48,0.25],[0.42,0.35],[0.42,0.45],[0.48,0.50]],
    // Stroke 2: lower left foot
    [[0.48,0.50],[0.38,0.58],[0.32,0.68],[0.35,0.75]],
    // Stroke 3: horizontal crossbar
    [[0.30,0.42],[0.62,0.42]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "গ": [
    // Stroke 1: top curved hook going down
    [[0.55,0.18],[0.45,0.24],[0.35,0.34],[0.32,0.46],[0.36,0.56],[0.44,0.60]],
    // Stroke 2: lower right extension
    [[0.44,0.60],[0.52,0.64],[0.60,0.68],[0.64,0.72]],
    // Stroke 3: matra
    [[0.25,0.18],[0.70,0.18]]
  ],
  "ঘ": [
    // Stroke 1: left loop
    [[0.45,0.18],[0.35,0.24],[0.28,0.34],[0.28,0.46],[0.35,0.55],[0.45,0.58]],
    // Stroke 2: right portion with upper loop
    [[0.45,0.58],[0.55,0.55],[0.62,0.46],[0.62,0.34],[0.58,0.24],[0.52,0.18]],
    // Stroke 3: lower foot
    [[0.45,0.58],[0.42,0.68],[0.45,0.76]],
    // Stroke 4: matra
    [[0.22,0.18],[0.72,0.18]]
  ],
  "ঙ": [
    // Stroke 1: small circle on top-right
    [[0.55,0.22],[0.50,0.26],[0.48,0.32],[0.50,0.38],[0.56,0.40],[0.60,0.36],[0.60,0.28],[0.55,0.22]],
    // Stroke 2: descending stroke with left foot
    [[0.54,0.40],[0.50,0.50],[0.44,0.60],[0.38,0.68],[0.34,0.74]],
    // Stroke 3: matra
    [[0.25,0.18],[0.70,0.18]]
  ],

  // ── Palatal Consonants (চ–ঞ) ───────
  "চ": [
    // Stroke 1: upper curve arcing right
    [[0.32,0.18],[0.32,0.30],[0.36,0.42],[0.44,0.50],[0.54,0.52]],
    // Stroke 2: lower body
    [[0.54,0.52],[0.58,0.60],[0.56,0.70],[0.48,0.76],[0.38,0.74]],
    // Stroke 3: matra
    [[0.24,0.18],[0.68,0.18]]
  ],
  "ছ": [
    // Stroke 1: main body (similar to চ)
    [[0.30,0.18],[0.30,0.30],[0.34,0.42],[0.42,0.50],[0.52,0.52]],
    // Stroke 2: lower body
    [[0.52,0.52],[0.56,0.60],[0.54,0.70],[0.46,0.76],[0.36,0.74]],
    // Stroke 3: upper hook/loop at top
    [[0.52,0.10],[0.58,0.14],[0.60,0.18]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "জ": [
    // Stroke 1: vertical bar down left side
    [[0.35,0.18],[0.35,0.55]],
    // Stroke 2: curved right body
    [[0.35,0.35],[0.45,0.38],[0.55,0.45],[0.58,0.55],[0.55,0.65],[0.48,0.72],[0.38,0.74]],
    // Stroke 3: matra
    [[0.25,0.18],[0.68,0.18]]
  ],
  "ঝ": [
    // Stroke 1: vertical bar
    [[0.32,0.18],[0.32,0.55]],
    // Stroke 2: curved right body
    [[0.32,0.35],[0.42,0.38],[0.52,0.45],[0.55,0.55],[0.52,0.65],[0.44,0.72],[0.34,0.74]],
    // Stroke 3: extra loop on right
    [[0.55,0.45],[0.62,0.40],[0.68,0.45],[0.65,0.52]],
    // Stroke 4: matra
    [[0.22,0.18],[0.72,0.18]]
  ],
  "ঞ": [
    // Stroke 1: upper loop
    [[0.40,0.18],[0.32,0.25],[0.28,0.35],[0.32,0.45],[0.42,0.48]],
    // Stroke 2: descending curves with lower hook
    [[0.42,0.48],[0.50,0.52],[0.58,0.58],[0.60,0.68],[0.55,0.76],[0.45,0.78],[0.38,0.74]],
    // Stroke 3: matra
    [[0.22,0.18],[0.70,0.18]]
  ],

  // ── Retroflex Consonants (ট–ণ) ─────
  "ট": [
    // Stroke 1: curved top-right
    [[0.35,0.18],[0.35,0.28],[0.40,0.38],[0.50,0.42],[0.58,0.38]],
    // Stroke 2: downward with right foot
    [[0.50,0.42],[0.50,0.55],[0.52,0.65],[0.58,0.72],[0.64,0.74]],
    // Stroke 3: matra
    [[0.25,0.18],[0.70,0.18]]
  ],
  "ঠ": [
    // Stroke 1: curved body
    [[0.32,0.18],[0.32,0.28],[0.36,0.38],[0.46,0.42],[0.54,0.38]],
    // Stroke 2: down with foot
    [[0.46,0.42],[0.46,0.55],[0.48,0.65],[0.54,0.72],[0.60,0.74]],
    // Stroke 3: horizontal bar extending left
    [[0.25,0.28],[0.45,0.28]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "ড": [
    // Stroke 1: vertical stroke with upper right curve
    [[0.55,0.18],[0.55,0.35],[0.58,0.28],[0.62,0.24]],
    // Stroke 2: main body descending with left hook
    [[0.55,0.35],[0.52,0.48],[0.46,0.58],[0.38,0.65],[0.32,0.68]],
    // Stroke 3: matra
    [[0.25,0.18],[0.70,0.18]]
  ],
  "ঢ": [
    // Stroke 1: upper curve with right extension
    [[0.50,0.18],[0.50,0.35],[0.54,0.28],[0.60,0.22],[0.65,0.20]],
    // Stroke 2: main body descending
    [[0.50,0.35],[0.48,0.48],[0.42,0.58],[0.35,0.65],[0.30,0.68]],
    // Stroke 3: lower extension
    [[0.35,0.65],[0.42,0.72],[0.50,0.76]],
    // Stroke 4: matra
    [[0.22,0.18],[0.72,0.18]]
  ],
  "ণ": [
    // Stroke 1: upper loop
    [[0.40,0.18],[0.34,0.25],[0.30,0.35],[0.34,0.42],[0.42,0.45],[0.50,0.42],[0.52,0.35]],
    // Stroke 2: vertical stem down
    [[0.45,0.45],[0.45,0.60]],
    // Stroke 3: right foot
    [[0.45,0.60],[0.50,0.68],[0.58,0.72],[0.64,0.74]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],

  // ── Dental Consonants (ত–ন) ─────────
  "ত": [
    // Stroke 1: horizontal bar at top portion
    [[0.30,0.30],[0.60,0.30]],
    // Stroke 2: left downward stroke
    [[0.38,0.30],[0.35,0.45],[0.32,0.58],[0.30,0.68]],
    // Stroke 3: right downward stroke
    [[0.52,0.30],[0.55,0.45],[0.58,0.58],[0.60,0.68]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "থ": [
    // Stroke 1: horizontal bar
    [[0.30,0.30],[0.60,0.30]],
    // Stroke 2: left leg
    [[0.38,0.30],[0.35,0.45],[0.32,0.58],[0.30,0.68]],
    // Stroke 3: right leg
    [[0.52,0.30],[0.55,0.45],[0.58,0.58],[0.60,0.68]],
    // Stroke 4: upper looping extension
    [[0.48,0.18],[0.42,0.22],[0.40,0.28],[0.44,0.30]],
    // Stroke 5: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "দ": [
    // Stroke 1: upper arc top-right
    [[0.55,0.18],[0.48,0.24],[0.42,0.34],[0.42,0.46],[0.48,0.55]],
    // Stroke 2: downward stroke with left foot
    [[0.48,0.55],[0.42,0.62],[0.35,0.68],[0.30,0.72]],
    // Stroke 3: matra
    [[0.25,0.18],[0.68,0.18]]
  ],
  "ধ": [
    // Stroke 1: main body (similar to দ)
    [[0.50,0.18],[0.44,0.24],[0.38,0.34],[0.38,0.46],[0.44,0.55]],
    // Stroke 2: left foot
    [[0.44,0.55],[0.38,0.62],[0.32,0.68],[0.28,0.72]],
    // Stroke 3: upper vertical bar on left
    [[0.30,0.18],[0.30,0.40]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "ন": [
    // Stroke 1: curved body stroke from right
    [[0.58,0.18],[0.52,0.26],[0.45,0.36],[0.40,0.48],[0.42,0.58],[0.48,0.64]],
    // Stroke 2: left descending foot
    [[0.42,0.58],[0.35,0.64],[0.28,0.72]],
    // Stroke 3: matra
    [[0.25,0.18],[0.68,0.18]]
  ],

  // ── Labial Consonants (প–ম) ─────────
  "প": [
    // Stroke 1: vertical stroke down
    [[0.50,0.18],[0.50,0.68]],
    // Stroke 2: left arch at top
    [[0.50,0.30],[0.42,0.34],[0.35,0.42],[0.35,0.52],[0.42,0.58],[0.50,0.58]],
    // Stroke 3: matra
    [[0.25,0.18],[0.68,0.18]]
  ],
  "ফ": [
    // Stroke 1: vertical stroke down
    [[0.48,0.18],[0.48,0.68]],
    // Stroke 2: left arch
    [[0.48,0.30],[0.40,0.34],[0.33,0.42],[0.33,0.52],[0.40,0.58],[0.48,0.58]],
    // Stroke 3: upper loop/cross on right
    [[0.48,0.25],[0.56,0.22],[0.62,0.28],[0.58,0.35],[0.50,0.35]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "ব": [
    // Stroke 1: left vertical curve
    [[0.35,0.18],[0.32,0.30],[0.30,0.45],[0.32,0.58],[0.38,0.66]],
    // Stroke 2: close right side
    [[0.38,0.66],[0.48,0.70],[0.58,0.66],[0.62,0.55],[0.60,0.42],[0.55,0.32],[0.48,0.26],[0.38,0.24]],
    // Stroke 3: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "ভ": [
    // Stroke 1: left vertical curve (similar to ব)
    [[0.32,0.18],[0.30,0.30],[0.28,0.45],[0.30,0.58],[0.36,0.66]],
    // Stroke 2: close right side
    [[0.36,0.66],[0.46,0.70],[0.56,0.66],[0.60,0.55],[0.58,0.42],[0.52,0.32],[0.45,0.26],[0.36,0.24]],
    // Stroke 3: upper diagonal arm extending right
    [[0.56,0.30],[0.62,0.24],[0.68,0.20]],
    // Stroke 4: matra
    [[0.20,0.18],[0.72,0.18]]
  ],
  "ম": [
    // Stroke 1: left downstroke
    [[0.30,0.18],[0.30,0.50],[0.34,0.60],[0.40,0.66]],
    // Stroke 2: connecting arch and right downstroke
    [[0.30,0.35],[0.40,0.30],[0.52,0.30],[0.60,0.35],[0.60,0.50],[0.56,0.60],[0.48,0.66]],
    // Stroke 3: lower connecting foot
    [[0.40,0.66],[0.48,0.70],[0.55,0.72]],
    // Stroke 4: matra
    [[0.22,0.18],[0.72,0.18]]
  ],

  // ── Other Consonants (য–হ) ──────────
  "য": [
    // Stroke 1: upper loop arc
    [[0.50,0.18],[0.40,0.24],[0.34,0.34],[0.36,0.44],[0.44,0.48]],
    // Stroke 2: vertical descent
    [[0.44,0.48],[0.46,0.58],[0.48,0.65]],
    // Stroke 3: lower right foot curve
    [[0.48,0.65],[0.54,0.70],[0.62,0.72],[0.66,0.68]],
    // Stroke 4: matra
    [[0.22,0.18],[0.72,0.18]]
  ],
  "র": [
    // Stroke 1: short upper hook right
    [[0.40,0.18],[0.40,0.28],[0.44,0.36],[0.52,0.40]],
    // Stroke 2: descending curve to foot
    [[0.52,0.40],[0.50,0.52],[0.46,0.62],[0.40,0.70],[0.36,0.74]],
    // Stroke 3: matra
    [[0.25,0.18],[0.65,0.18]]
  ],
  "ল": [
    // Stroke 1: vertical stroke down
    [[0.50,0.18],[0.50,0.65]],
    // Stroke 2: left foot extending
    [[0.50,0.65],[0.42,0.70],[0.34,0.72],[0.28,0.70]],
    // Stroke 3: upper right hook
    [[0.50,0.30],[0.56,0.26],[0.62,0.28]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "শ": [
    // Stroke 1: first vertical stroke
    [[0.28,0.18],[0.28,0.55]],
    // Stroke 2: second vertical stroke
    [[0.44,0.18],[0.44,0.55]],
    // Stroke 3: third vertical stroke
    [[0.60,0.18],[0.60,0.55]],
    // Stroke 4: bottom curve connecting all
    [[0.28,0.55],[0.36,0.65],[0.44,0.70],[0.52,0.65],[0.60,0.55]],
    // Stroke 5: matra
    [[0.20,0.18],[0.72,0.18]]
  ],
  "ষ": [
    // Stroke 1: first vertical stroke
    [[0.28,0.18],[0.28,0.55]],
    // Stroke 2: second vertical stroke
    [[0.44,0.18],[0.44,0.55]],
    // Stroke 3: third vertical stroke
    [[0.60,0.18],[0.60,0.55]],
    // Stroke 4: bottom curve connecting
    [[0.28,0.55],[0.36,0.66],[0.44,0.72],[0.52,0.66],[0.60,0.55]],
    // Stroke 5: matra
    [[0.20,0.18],[0.72,0.18]]
  ],
  "স": [
    // Stroke 1: top bar going left
    [[0.58,0.18],[0.42,0.18],[0.34,0.24],[0.32,0.34]],
    // Stroke 2: right curve down
    [[0.32,0.34],[0.38,0.42],[0.48,0.48],[0.56,0.52],[0.60,0.60]],
    // Stroke 3: bottom left foot
    [[0.60,0.60],[0.54,0.68],[0.44,0.72],[0.34,0.70]],
    // Stroke 4: matra
    [[0.22,0.18],[0.70,0.18]]
  ],
  "হ": [
    // Stroke 1: left descending stroke
    [[0.35,0.18],[0.32,0.30],[0.30,0.45],[0.32,0.58],[0.38,0.66]],
    // Stroke 2: right arm curving up and down
    [[0.38,0.40],[0.48,0.36],[0.58,0.38],[0.62,0.48],[0.58,0.58],[0.50,0.62]],
    // Stroke 3: lower connecting base
    [[0.38,0.66],[0.46,0.70],[0.54,0.72]],
    // Stroke 4: matra
    [[0.22,0.18],[0.72,0.18]]
  ],

  // ── Special Characters ─────────────
  "ড়": [
    // Stroke 1: same as ড upper curve
    [[0.55,0.18],[0.55,0.35],[0.58,0.28],[0.62,0.24]],
    // Stroke 2: main body descending
    [[0.55,0.35],[0.52,0.48],[0.46,0.58],[0.38,0.65],[0.32,0.68]],
    // Stroke 3: nukta dot below
    [[0.46,0.78],[0.47,0.80],[0.46,0.82]],
    // Stroke 4: matra
    [[0.25,0.18],[0.70,0.18]]
  ],
  "ঢ়": [
    // Stroke 1: upper curve
    [[0.50,0.18],[0.50,0.35],[0.54,0.28],[0.60,0.22],[0.65,0.20]],
    // Stroke 2: body descending
    [[0.50,0.35],[0.48,0.48],[0.42,0.58],[0.35,0.65],[0.30,0.68]],
    // Stroke 3: lower extension
    [[0.35,0.65],[0.42,0.72],[0.50,0.76]],
    // Stroke 4: nukta dot
    [[0.42,0.82],[0.43,0.84],[0.42,0.86]],
    // Stroke 5: matra
    [[0.22,0.18],[0.72,0.18]]
  ],
  "য়": [
    // Stroke 1: upper loop arc
    [[0.50,0.18],[0.40,0.24],[0.34,0.34],[0.36,0.44],[0.44,0.48]],
    // Stroke 2: vertical descent
    [[0.44,0.48],[0.46,0.58],[0.48,0.65]],
    // Stroke 3: lower right foot
    [[0.48,0.65],[0.54,0.70],[0.62,0.72],[0.66,0.68]],
    // Stroke 4: nukta dot
    [[0.48,0.78],[0.49,0.80],[0.48,0.82]],
    // Stroke 5: matra
    [[0.22,0.18],[0.72,0.18]]
  ],
  "ৎ": [
    // Stroke 1: short sharp downstroke
    [[0.45,0.25],[0.42,0.40],[0.40,0.55]],
    // Stroke 2: curved base flick to right
    [[0.40,0.55],[0.45,0.62],[0.55,0.66],[0.62,0.64]]
  ],
  "ং": [
    // Stroke 1: small circle/loop on top
    [[0.50,0.30],[0.44,0.35],[0.42,0.42],[0.46,0.48],[0.54,0.48],[0.58,0.42],[0.56,0.35],[0.50,0.30]],
    // Stroke 2: bindu dot below
    [[0.50,0.56],[0.50,0.60]]
  ],
  "ঃ": [
    // Stroke 1: upper dot
    [[0.50,0.30],[0.50,0.35]],
    // Stroke 2: lower dot
    [[0.50,0.55],[0.50,0.60]]
  ],
  "ঁ": [
    // Stroke 1: crescent shape
    [[0.40,0.35],[0.44,0.30],[0.50,0.28],[0.56,0.30],[0.60,0.35]],
    // Stroke 2: dot above
    [[0.50,0.22],[0.50,0.24]]
  ],

  // ── Bengali Digits (০–৯) ───────────
  "০": [
    // Stroke 1: oval shape (similar to English 0)
    [[0.50,0.22],[0.38,0.30],[0.32,0.42],[0.32,0.55],[0.38,0.68],[0.50,0.75],[0.62,0.68],[0.68,0.55],[0.68,0.42],[0.62,0.30],[0.50,0.22]]
  ],
  "১": [
    // Stroke 1: curved stroke going down
    [[0.42,0.22],[0.48,0.28],[0.52,0.40],[0.52,0.55],[0.48,0.68],[0.42,0.75]]
  ],
  "২": [
    // Stroke 1: top hook
    [[0.35,0.30],[0.42,0.22],[0.52,0.22],[0.58,0.28],[0.58,0.38]],
    // Stroke 2: lower curve
    [[0.58,0.38],[0.52,0.48],[0.42,0.58],[0.35,0.68],[0.35,0.75],[0.42,0.78]]
  ],
  "৩": [
    // Stroke 1: upper curve
    [[0.35,0.28],[0.42,0.22],[0.52,0.22],[0.58,0.28],[0.58,0.38],[0.52,0.44],[0.46,0.48]],
    // Stroke 2: lower curve
    [[0.46,0.48],[0.54,0.52],[0.60,0.60],[0.58,0.70],[0.50,0.76],[0.40,0.76]]
  ],
  "৪": [
    // Stroke 1: top loop
    [[0.50,0.22],[0.40,0.28],[0.36,0.38],[0.40,0.48],[0.50,0.50]],
    // Stroke 2: descending tail
    [[0.50,0.50],[0.52,0.60],[0.48,0.70],[0.42,0.76]]
  ],
  "৫": [
    // Stroke 1: curved body
    [[0.55,0.22],[0.45,0.25],[0.38,0.32],[0.35,0.42],[0.38,0.55],[0.45,0.64],[0.55,0.68],[0.62,0.64],[0.62,0.55]],
    // Stroke 2: lower tail
    [[0.55,0.68],[0.50,0.74],[0.45,0.78]]
  ],
  "৬": [
    // Stroke 1: top curve then descending loop
    [[0.58,0.25],[0.50,0.22],[0.42,0.25],[0.36,0.34],[0.34,0.46],[0.36,0.58],[0.42,0.68],[0.50,0.72],[0.58,0.68],[0.60,0.58],[0.56,0.50],[0.48,0.48]]
  ],
  "৭": [
    // Stroke 1: top horizontal then descending curve
    [[0.35,0.22],[0.50,0.22],[0.60,0.25],[0.62,0.35],[0.58,0.48],[0.50,0.60],[0.44,0.70],[0.40,0.78]]
  ],
  "৮": [
    // Stroke 1: upper loop
    [[0.50,0.48],[0.42,0.40],[0.38,0.32],[0.42,0.24],[0.50,0.22],[0.58,0.24],[0.62,0.32],[0.58,0.40],[0.50,0.48]],
    // Stroke 2: lower loop
    [[0.50,0.48],[0.42,0.56],[0.38,0.64],[0.42,0.72],[0.50,0.76],[0.58,0.72],[0.62,0.64],[0.58,0.56],[0.50,0.48]]
  ],
  "৯": [
    // Stroke 1: upper circle then descending tail
    [[0.48,0.48],[0.40,0.42],[0.36,0.34],[0.40,0.26],[0.50,0.22],[0.58,0.26],[0.62,0.34],[0.60,0.44],[0.52,0.48]],
    // Stroke 2: descending tail
    [[0.52,0.48],[0.50,0.58],[0.46,0.68],[0.42,0.76]]
  ],
};

// ════════════════════════════════════════
//  MODULES
// ════════════════════════════════════════
function var_vowel() {
  return "var(--vowel)";
}
function var_consonant() {
  return "var(--consonant)";
}
function var_special() {
  return "var(--special)";
}

const MODULES = [
  {
    id: "mixed",
    title: "Mixed Practice",
    desc: "Adaptive lessons — new letters introduced as you master earlier ones",
    icon: "🧠",
    isMixed: true,
    color: () => "var(--accent)",
  },
  {
    id: "writing-core",
    title: "Writing Practice",
    desc: "Trace core alphabet letters with scaffolded stroke hints",
    icon: "✍️",
    isWriting: true,
    letters: ALL_LETTERS.map((l) => ({ ...l })),
    color: () => "#f6b83f",
  },
  {
    id: "vowels",
    title: "Vowels (স্বরবর্ণ)",
    desc: "11 vowel letters — the foundation",
    icon: "🔤",
    letters: VOWELS.map((v) => ({ ...v, type: "vowel" })),
    color: var_vowel,
  },
  {
    id: "consonants-1",
    title: "Consonants I (ক–ঙ)",
    desc: "Velar stops — k/kh/g/gh/ng",
    icon: "🅰️",
    letters: CONSONANTS_VELAR.map((c) => ({ ...c, type: "consonant" })),
    color: var_consonant,
  },
  {
    id: "consonants-2",
    title: "Consonants II (চ–ঞ)",
    desc: "Palatal stops — ch/chh/j/jh/ny",
    icon: "🅱️",
    letters: CONSONANTS_PALATAL.map((c) => ({ ...c, type: "consonant" })),
    color: var_consonant,
  },
  {
    id: "consonants-3",
    title: "Consonants III (ট–ণ)",
    desc: "Retroflex stops — tongue curled back",
    icon: "🔡",
    letters: CONSONANTS_RETROFLEX.map((c) => ({ ...c, type: "consonant" })),
    color: var_consonant,
  },
  {
    id: "consonants-4",
    title: "Consonants IV (ত–ন)",
    desc: "Dental stops — tongue touches teeth",
    icon: "📝",
    letters: CONSONANTS_DENTAL.map((c) => ({ ...c, type: "consonant" })),
    color: var_consonant,
  },
  {
    id: "consonants-5",
    title: "Consonants V (প–ম)",
    desc: "Labial stops — lips together",
    icon: "💬",
    letters: CONSONANTS_LABIAL.map((c) => ({ ...c, type: "consonant" })),
    color: var_consonant,
  },
  {
    id: "consonants-6",
    title: "Consonants VI (য–হ)",
    desc: "Semivowels, liquids & sibilants",
    icon: "🔊",
    letters: CONSONANTS_OTHER.map((c) => ({ ...c, type: "consonant" })),
    color: var_consonant,
  },
  {
    id: "special",
    title: "Special Characters",
    desc: "Modifiers & extra letters (ড়, ং, ঃ…)",
    icon: "✨",
    letters: CONSONANTS_SPECIAL.map((c) => ({ ...c, type: "consonant" })),
    color: var_special,
  },
  {
    id: "matra",
    title: "Matra Drills (া–ৌ)",
    desc: "45 consonant+vowel-sign combos — see the glyph, type its sound",
    icon: "🔡",
    letters: MATRA_COMBOS,
    color: () => "#4caf6e",
  },
  {
    id: "conjuncts",
    title: "Conjunct Consonants",
    desc: "যুক্তবর্ণ — 32 compound letter combinations",
    icon: "🔗",
    letters: CONJUNCTS,
    color: () => "var(--special)",
  },
  { id: "chart", title: "Full Alphabet Chart", desc: "Review all 50 letters at a glance", icon: "📊", isChart: true },
];

// ════════════════════════════════════════
//  NUMBER MODULES (Numbers tab)
// ════════════════════════════════════════
const NUMBER_MODULES = [
  {
    id: "numeral-glyphs",
    title: "Numeral Glyphs (০–৯)",
    desc: "The 10 Bengali script digits — ০ through ৯",
    icon: "🔢",
    letters: BENGALI_NUMERALS,
    color: () => "var(--accent)",
  },
  {
    id: "ones-teens",
    title: "Ones & Teens (০–১৯)",
    desc: "Bengali words for zero through nineteen",
    icon: "1️⃣",
    letters: BENGALI_NUMBER_NAMES.slice(0, 20),
    color: () => "var(--accent)",
  },
  {
    id: "tens",
    title: "Tens (২০–৯০)",
    desc: "Bengali words for twenty through ninety",
    icon: "🔟",
    letters: BENGALI_NUMBER_NAMES.slice(20, 28),
    color: () => "var(--accent)",
  },
  {
    id: "large-numbers",
    title: "Large Numbers",
    desc: "Hundreds, thousands, and lakhs",
    icon: "💯",
    letters: BENGALI_NUMBER_NAMES.slice(28),
    color: () => "var(--accent)",
  },
  {
    id: "numbers-arithmetic",
    title: "Number Recognition",
    desc: "Bengali numeral-first arithmetic recognition",
    icon: "➕",
    isArithmetic: true,
    quizMode: "arithmetic",
    color: () => "var(--accent)",
  },
  {
    id: "numbers-audio",
    title: "Counting by Ear",
    desc: "Listen to a number and pick numeral/word",
    icon: "🎧",
    isArithmetic: true,
    quizMode: "audio-counting",
    color: () => "var(--accent)",
  },
  {
    id: "numbers-calendar",
    title: "Dates & Calendar",
    desc: "Read Bengali date strings in MCQ/FIB",
    icon: "📅",
    isArithmetic: true,
    quizMode: "calendar-dates",
    color: () => "var(--accent)",
  },
];

const READING_PASSAGES = [
  {
    id: "morning-routine",
    title: "সকালের ছোট রুটিন",
    level: "A1",
    text: "আমি প্রতিদিন সকালে তাড়াতাড়ি উঠি। জানালা খুলে একটু বাতাস নেই এবং এক গ্লাস পানি খাই। তারপর রান্নাঘরে যাই। মা চা বানান আর আমি টেবিল সাজাই। আমরা একসাথে নাস্তা করি। আজ নাস্তায় রুটি, ডিম, আর কলা ছিল। নাস্তার পরে আমি ব্যাগ গুছাই, বই দেখি, এবং স্কুলে যাওয়ার আগে দশ মিনিট বাংলা পড়ি। ছোট এই অভ্যাস আমাকে শান্ত ও প্রস্তুত রাখে।",
    vocabIds: ["আমি", "সকালে", "পানি", "মা", "চা", "আমরা", "নাস্তা", "রুটি", "ডিম", "কলা", "বই", "স্কুলে", "বাংলা"],
    checks: [
      { prompt: "নাস্তায় কী ছিল?", options: ["রুটি, ডিম, আর কলা", "ভাত আর মাছ", "শুধু চা"], correct: 0 },
      { prompt: "স্কুলে যাওয়ার আগে লেখক কী করে?", options: ["ঘুমায়", "দশ মিনিট বাংলা পড়ে", "দৌড়ায়"], correct: 1 },
    ],
  },
  {
    id: "market-day",
    title: "বাজারের দিন",
    level: "A2",
    text: "শুক্রবার বিকেলে আমি আর আমার ভাই বাজারে যাই। আমাদের তালিকায় ছিল শাকসবজি, মাছ, আর কিছু ফল। প্রথমে আমরা টমেটো, আলু, পেঁয়াজ, আর ধনেপাতা কিনি। তারপর মাছের দোকানে গিয়ে ছোট একটি রুই মাছ নিই। বিক্রেতা দাম একটু বেশি বলেছিল, তাই ভাই হাসিমুখে দরদাম করে। ফেরার পথে আমরা একটি দোকান থেকে দই কিনি। বাড়িতে এসে মা বলেন, আজকের কেনাকাটা খুব ভালো হয়েছে।",
    vocabIds: ["আমি", "ভাই", "বাজারে", "আমাদের", "ফল", "আমরা", "টমেটো", "আলু", "পেঁয়াজ", "মাছ", "দাম", "বাড়িতে", "মা"],
    checks: [
      { prompt: "বাজারে কারা গিয়েছিল?", options: ["আমি আর আমার ভাই", "আমি একা", "মা আর বাবা"], correct: 0 },
      { prompt: "দোকানদারের দাম বেশি হলে কী করা হয়?", options: ["কিছু কেনা হয়নি", "দরদাম করা হয়", "বাড়ি ফেরা হয়"], correct: 1 },
    ],
  },
  {
    id: "rainy-evening",
    title: "বর্ষার সন্ধ্যা",
    level: "B1",
    text: "আজ বিকেলে হঠাৎ বৃষ্টি শুরু হলে শহরের রাস্তা দ্রুত ভিজে যায়। অফিস থেকে ফেরার সময় বাস দেরি করছিল, তাই আমি একটি বইয়ের দোকানে ঢুকে দাঁড়াই। ভেতরে কয়েকজন ছাত্র গল্পের বই দেখছিল। দোকানদার খুব শান্তভাবে সবাইকে সাহায্য করছিলেন। বৃষ্টি কিছুটা কমলে আমি ছাতা খুলে বাসস্ট্যান্ডে যাই। বাড়ি পৌঁছে গরম চা খেতে খেতে মনে হলো, অপেক্ষার সেই সময়টা মোটেও নষ্ট হয়নি। নতুন একটি ভালো গল্পের বইও পেয়ে গেছি।",
    vocabIds: ["আজ", "বৃষ্টি", "শহর", "রাস্তা", "অফিস", "সময়", "আমি", "বই", "দোকানে", "ছাত্র", "সবাই", "বাড়ি", "চা"],
    checks: [
      { prompt: "বাস দেরি করায় লেখক কোথায় দাঁড়ায়?", options: ["রেস্টুরেন্টে", "বইয়ের দোকানে", "পার্কে"], correct: 1 },
      { prompt: "শেষে লেখকের অনুভূতি কী?", options: ["সময় নষ্ট হয়েছে", "ক্লান্ত লেগেছে", "অপেক্ষার সময়টা কাজে লেগেছে"], correct: 2 },
    ],
  },
  {
    id: "city-village",
    title: "শহর ও গ্রামের মাঝে",
    level: "B2",
    text: "রাজধানীতে প্রায় দশ বছর কাটানোর পর শহরের ব্যস্ততা আর অদ্ভুত লাগে না। উঁচু ভবন, যানজট, আর সন্ধ্যার মিটমিটে আলো—এসব এখন পরিচিত মনে হয়। কিন্তু বৃষ্টির গন্ধ পেলেই মনে পড়ে যায় ছোটবেলার গ্রামের কথা। সেই গ্রামে নদীর পাড়ে বসে ঘণ্টার পর ঘণ্টা কাটিয়ে দেওয়া যেত। মাঠে ধান কাটা হলে সারা গ্রাম আনন্দে মেতে উঠত। যদি সেই দিনগুলো আর ফিরে আসত, তাহলে আমি হয়তো সময়কে আরও বেশি মূল্য দিতাম। শহরে এসে অনেক কিছু পেয়েছি—ভালো কাজ, নতুন বন্ধু, আর নিজেকে চেনার সুযোগ। তবু প্রতিটি মুহূর্ত এত দ্রুত ছুটে যায় যে থামার সময় মেলে না। মানুষ পাশাপাশি থাকে, কিন্তু কেউ কাউকে সত্যিকারভাবে চেনে না। প্রতি ঈদে গ্রামে ফিরে পুরোনো মানুষদের দেখি। সেই পরিচিত মাঠ, পুকুর, আর বাড়ির উঠোন—সব কিছু আছে, তবু কিছু একটা বদলে গেছে। হয়তো আমিই বদলেছি। দুই জীবনের মাঝে আমি এখনো পথ খুঁজছি।",
    vocabIds: ["আমি", "শহর", "গ্রাম", "নদী", "বৃষ্টি", "মাঠ", "কাজ", "বন্ধু", "মানুষ", "বাড়ি", "সময়", "জীবন", "ঈদ"],
    checks: [
      { prompt: "লেখক কোন পরিস্থিতিতে গ্রামের স্মৃতি অনুভব করেন?", options: ["যানজটে পড়লে", "বৃষ্টির গন্ধ পেলে", "শুক্রবার সন্ধ্যায়"], correct: 1 },
      {
        prompt: '"যদি সেই দিনগুলো আর ফিরে আসত" — এই বাক্যের অর্থ কী?',
        options: ["লেখক শীঘ্রই গ্রামে ফিরবেন", "সেই দিনগুলো চলে গেছে এবং আর ফিরবে না", "গ্রামের মানুষরা শহরে আসবেন"],
        correct: 1,
      },
      {
        prompt: "শেষ কয়েকটি বাক্যে লেখক কী বলতে চান?",
        options: ["গ্রামে সব আগের মতো আছে", "গ্রাম ও নিজের মাঝে পরিবর্তন দেখে লেখক এখনো নিজের পথ খুঁজছেন", "ঈদের পরে গ্রামে থাকার সিদ্ধান্ত নেবেন"],
        correct: 1,
      },
    ],
  },
];

// ════════════════════════════════════════
//  MIXED PRACTICE — ADAPTIVE ALGORITHM
// ════════════════════════════════════════
// Letters are introduced in a deliberate curriculum order: common vowels
// first, then the most frequent consonants, spreading across groups so
// the learner sees variety early.  New letters unlock only once the
// current working set is sufficiently familiar.

const MIXED_CURRICULUM = [
  // Wave 1 — first 5: core vowels
  ...["অ", "আ", "ই", "উ", "এ"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 2 — first consonants (common, across groups)
  ...["ক", "গ", "ত", "প", "ম"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 3 — more vowels + high-frequency consonants
  ...["ও", "ঈ", "ঊ", "ন", "র"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 4
  ...["ল", "স", "হ", "ব", "দ"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 5
  ...["চ", "জ", "শ", "খ", "ট"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 6
  ...["ঐ", "ঔ", "ঋ", "ফ", "ভ"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 7
  ...["ঘ", "ঙ", "ছ", "ঝ", "ঞ"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 8
  ...["ঠ", "ড", "ঢ", "ণ", "থ"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 9
  ...["ধ", "য", "ষ", "ং", "ৎ"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
  // Wave 10 — remaining special characters
  ...["ড়", "ঢ়", "য়", "ঃ", "ঁ"].map((l) => ALL_LETTERS.find((x) => x.letter === l)),
].filter(Boolean);

const MIXED_WAVE_SIZE = 5; // letters per wave
const MIXED_INTRO_BATCH = 3; // new letters shown as flashcards before a quiz
const UNLOCK_THRESHOLD = 2; // mastery level to count a letter as "familiar"
// (0=unseen, 1=seen, 2=learning, 3=mastered)
const MIXED_QUIZ_SIZE = 8; // questions per quiz round

/**
 * Determine how many letters the user has unlocked so far.
 * A new wave unlocks when ≥60% of the previous wave's letters are at
 * or above UNLOCK_THRESHOLD.
 */

export {
  VOWELS,
  CONSONANTS_VELAR,
  CONSONANTS_PALATAL,
  CONSONANTS_RETROFLEX,
  CONSONANTS_DENTAL,
  CONSONANTS_LABIAL,
  CONSONANTS_OTHER,
  CONSONANTS_SPECIAL,
  ALL_CONSONANTS,
  ALL_LETTERS,
  BENGALI_NUMERALS,
  BENGALI_NUMBER_NAMES,
  MATRA_COMBOS,
  CONJUNCTS,
  STROKE_HINTS,
  STROKE_PATHS,
  MODULES,
  NUMBER_MODULES,
  READING_PASSAGES,
  MIXED_CURRICULUM,
  MIXED_WAVE_SIZE,
  MIXED_INTRO_BATCH,
  UNLOCK_THRESHOLD,
  MIXED_QUIZ_SIZE,
};
