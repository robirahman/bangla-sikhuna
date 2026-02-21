// Bengali Grammar — 36 structured lessons
// Format matches vocab.js pattern for consistency
const GRAMMAR_LESSONS = [
  // ═══════════════════════════════════════
  //  LESSON 1: Sentence Structure (SOV)
  // ═══════════════════════════════════════
  {
    id: 'sov-structure',
    number: 1,
    title: 'Sentence Structure (SOV)',
    shortDesc: 'Bengali is Subject-Object-Verb',
    explanation: `Bengali follows a Subject-Object-Verb (SOV) word order, unlike English which uses Subject-Verb-Object (SVO). This means the verb always comes at the end of the sentence.

For example, where English says "I eat rice," Bengali says "আমি ভাত খাই" (ami bhat khai) — literally "I rice eat."

This SOV pattern is consistent across statements, questions, and commands. Getting comfortable with this order is the single most important step in forming Bengali sentences. Even when sentences get longer with adjectives or adverbs, the verb stays at the end.`,
    examples: [
      { bengali: 'আমি ভাত খাই', roman: 'ami bhat khai', english: 'I eat rice (I + rice + eat)' },
      { bengali: 'সে বই পড়ে', roman: 'she boi pore', english: 'He/she reads a book (he + book + reads)' },
      { bengali: 'আমরা চা পান করি', roman: 'amra cha pan kori', english: 'We drink tea (we + tea + drink)' },
      { bengali: 'তুমি স্কুলে যাও', roman: 'tumi skule jao', english: 'You go to school (you + school-to + go)' },
      { bengali: 'মা খাবার রান্না করেন', roman: 'ma khabar ranna koren', english: 'Mother cooks food (mother + food + cook-does)' },
      { bengali: 'বাবা কাজ করেন', roman: 'baba kaj koren', english: 'Father works (father + work + does)' },
    ],
    quiz: [
      { type: 'word-order', prompt: 'Arrange the words to say "I eat rice"', words: ['খাই', 'আমি', 'ভাত'], correct: ['আমি', 'ভাত', 'খাই'], english: 'I eat rice', roman: 'ami bhat khai' },
      { type: 'word-order', prompt: 'Arrange: "She reads a book"', words: ['পড়ে', 'বই', 'সে'], correct: ['সে', 'বই', 'পড়ে'], english: 'She reads a book', roman: 'she boi pore' },
      { type: 'translate-mc', prompt: 'What does this mean?', bengali: 'আমরা চা পান করি', roman: 'amra cha pan kori', correct: 'We drink tea', options: ['We drink tea', 'Tea drinks us', 'We make tea', 'They drink tea'] },
      { type: 'translate-mc', prompt: 'What does this mean?', bengali: 'তুমি স্কুলে যাও', roman: 'tumi skule jao', correct: 'You go to school', options: ['You go to school', 'School goes to you', 'I go to school', 'You come from school'] },
      { type: 'error-spot', prompt: 'Which sentence correctly says "Father works"?', options: ['বাবা করেন কাজ', 'কাজ বাবা করেন', 'বাবা কাজ করেন', 'করেন বাবা কাজ'], correct: 'বাবা কাজ করেন', explanation: 'SOV order: Subject (বাবা) + Object (কাজ) + Verb (করেন)' },
      { type: 'translate-mc', prompt: 'How do you say "I read a book" in Bengali word order?', bengali: '', roman: '', correct: 'Subject + Object + Verb', options: ['Subject + Object + Verb', 'Subject + Verb + Object', 'Verb + Subject + Object', 'Object + Subject + Verb'] },
      { type: 'word-order', prompt: 'Arrange: "Mother cooks food"', words: ['করেন', 'মা', 'রান্না', 'খাবার'], correct: ['মা', 'খাবার', 'রান্না', 'করেন'], english: 'Mother cooks food', roman: 'ma khabar ranna koren' },
      { type: 'fib', prompt: 'Fill in the blank', sentence: 'আমি ভাত ___', roman: 'ami bhat ___', english: 'I ___ rice (eat)', acceptable: ['খাই', 'khai'], answer: 'খাই' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 2: Pronouns & Formality
  // ═══════════════════════════════════════
  {
    id: 'pronouns-formality',
    number: 2,
    title: 'Pronouns & Formality',
    shortDesc: 'তুই / তুমি / আপনি — three levels of "you"',
    explanation: `Bengali has three levels of formality for the second person ("you"), and this affects verb conjugation throughout the language.

তুই (tui) is very informal — used with close friends, younger siblings, or children. তুমি (tumi) is the standard informal — used with friends, peers, and people you're comfortable with. আপনি (apni) is formal/respectful — used with elders, strangers, teachers, and in professional settings.

Third person also has two levels: সে (she) is informal for "he/she," while তিনি (tini) is the respectful form. Using the wrong level can be seen as rude or overly distant, so choosing correctly is important in Bengali culture.`,
    examples: [
      { bengali: 'তুই কোথায় যাস?', roman: 'tui kothay jas?', english: 'Where are you going? (very informal)' },
      { bengali: 'তুমি কোথায় যাও?', roman: 'tumi kothay jao?', english: 'Where are you going? (informal)' },
      { bengali: 'আপনি কোথায় যান?', roman: 'apni kothay jan?', english: 'Where are you going? (formal)' },
      { bengali: 'সে ঘরে আছে', roman: 'she ghore achhe', english: 'He/she is at home (informal)' },
      { bengali: 'তিনি ঘরে আছেন', roman: 'tini ghore achhen', english: 'He/she is at home (formal)' },
      { bengali: 'তোরা কী করিস?', roman: 'tora ki koris?', english: 'What are you all doing? (very informal)' },
      { bengali: 'আপনারা কী করেন?', roman: 'apnara ki koren?', english: 'What are you all doing? (formal)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'Which pronoun would you use with your teacher?', bengali: 'আপনি', roman: 'apni', correct: 'আপনি (formal you)', options: ['আপনি (formal you)', 'তুমি (informal you)', 'তুই (very informal you)', 'সে (he/she)'] },
      { type: 'translate-mc', prompt: 'What does তুই mean?', bengali: 'তুই', roman: 'tui', correct: 'You (very informal)', options: ['You (very informal)', 'You (formal)', 'He/she', 'They'] },
      { type: 'error-spot', prompt: 'Which is correct for speaking to a stranger?', options: ['তুই কেমন আছিস?', 'তুমি কেমন আছ?', 'আপনি কেমন আছেন?', 'তোরা কেমন আছিস?'], correct: 'আপনি কেমন আছেন?', explanation: 'আপনি is the formal form, appropriate for strangers.' },
      { type: 'fib', prompt: 'Complete with the formal "he/she"', sentence: '___ ঘরে আছেন', roman: '___ ghore achhen', english: 'He/she is at home (formal)', acceptable: ['তিনি', 'tini'], answer: 'তিনি' },
      { type: 'translate-mc', prompt: 'সে is used for:', bengali: 'সে', roman: 'she', correct: 'He/she (informal)', options: ['He/she (informal)', 'He/she (formal)', 'You (informal)', 'They'] },
      { type: 'translate-mc', prompt: 'What does "আপনারা কী করেন?" mean?', bengali: 'আপনারা কী করেন?', roman: 'apnara ki koren?', correct: 'What are you all doing? (formal)', options: ['What are you all doing? (formal)', 'What are they doing?', 'What is he doing?', 'What are you doing? (informal)'] },
      { type: 'error-spot', prompt: 'Which sentence uses তুমি level correctly?', options: ['তুমি কোথায় যান?', 'তুমি কোথায় যাও?', 'তুমি কোথায় যাস?', 'তুমি কোথায় যায়?'], correct: 'তুমি কোথায় যাও?', explanation: 'তুমি takes যাও — যান is for আপনি, যাস is for তুই.' },
      { type: 'fib', prompt: 'Fill in: "___ কোথায় যাও?" (you, informal)', sentence: '___ কোথায় যাও?', roman: '___ kothay jao?', english: 'Where are you going? (informal)', acceptable: ['তুমি', 'tumi'], answer: 'তুমি' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 3: Present Simple Tense
  // ═══════════════════════════════════════
  {
    id: 'present-simple',
    number: 3,
    title: 'Present Simple Tense',
    shortDesc: 'Everyday actions and habits',
    explanation: `The present simple tense in Bengali describes habitual actions, general truths, and regular activities. The verb ending changes based on the subject's formality level.

Common patterns: আমি verb-ই (ami verb-i), তুমি verb-ও (tumi verb-o), আপনি/তিনি verb-এন (apni/tini verb-en), সে verb-এ (she verb-e).

For example, the root "করা" (kora — to do): আমি করি (ami kori), তুমি করো (tumi koro), সে করে (she kore), আপনি করেন (apni koren). This conjugation pattern applies to most regular verbs.

Note: সে (he/she/they singular) and তারা (they plural) share the same verb ending in the present simple — both take -এ (-e). So "সে করে" and "তারা করে" look identical; context tells you whether the subject is singular or plural.`,
    examples: [
      { bengali: 'আমি কাজ করি', roman: 'ami kaj kori', english: 'I work / I do work' },
      { bengali: 'তুমি গান গাও', roman: 'tumi gan gao', english: 'You sing songs' },
      { bengali: 'সে স্কুলে যায়', roman: 'she skule jay', english: 'He/she goes to school' },
      { bengali: 'আপনি কী করেন?', roman: 'apni ki koren?', english: 'What do you do? (formal)' },
      { bengali: 'আমরা বাংলা শিখি', roman: 'amra bangla shikhi', english: 'We learn Bengali' },
      { bengali: 'তারা খেলে', roman: 'tara khele', english: 'They play' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "আমি কাজ করি" mean?', bengali: 'আমি কাজ করি', roman: 'ami kaj kori', correct: 'I work', options: ['I work', 'I worked', 'I will work', 'You work'] },
      { type: 'fib', prompt: 'Complete: "তুমি গান ___" (you sing)', sentence: 'তুমি গান ___', roman: 'tumi gan ___', english: 'You sing songs', acceptable: ['গাও', 'gao'], answer: 'গাও' },
      { type: 'translate-mc', prompt: 'What does "সে স্কুলে যায়" mean?', bengali: 'সে স্কুলে যায়', roman: 'she skule jay', correct: 'He/she goes to school', options: ['He/she goes to school', 'He/she went to school', 'I go to school', 'They go to school'] },
      { type: 'error-spot', prompt: 'Which is correct for "We learn Bengali"?', options: ['আমরা বাংলা শিখি', 'আমরা বাংলা শিখো', 'আমরা বাংলা শিখেন', 'আমরা বাংলা শিখে'], correct: 'আমরা বাংলা শিখি', explanation: 'আমরা takes the -ই (-i) ending like আমি.' },
      { type: 'word-order', prompt: 'Arrange: "You (formal) do what?"', words: ['করেন?', 'আপনি', 'কী'], correct: ['আপনি', 'কী', 'করেন?'], english: 'What do you do?', roman: 'apni ki koren?' },
      { type: 'fib', prompt: 'Complete: "আপনি কী ___?" (do, formal)', sentence: 'আপনি কী ___?', roman: 'apni ki ___?', english: 'What do you do? (formal)', acceptable: ['করেন', 'koren'], answer: 'করেন' },
      { type: 'translate-mc', prompt: '"তারা খেলে" means:', bengali: 'তারা খেলে', roman: 'tara khele', correct: 'They play', options: ['They play', 'They played', 'We play', 'He plays'] },
      { type: 'word-order', prompt: 'Arrange: "I do work"', words: ['করি', 'কাজ', 'আমি'], correct: ['আমি', 'কাজ', 'করি'], english: 'I work', roman: 'ami kaj kori' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 4: Possessives
  // ═══════════════════════════════════════
  {
    id: 'possessives',
    number: 4,
    title: 'Possessives',
    shortDesc: 'আমার, তোমার — my, your, etc.',
    explanation: `Possessives in Bengali are formed by adding -র (-r) or -এর (-er) to pronouns. They come before the noun they modify, just like in English.

আমি → আমার (amar — my), তুমি → তোমার (tomar — your), সে → তার (tar — his/her), আপনি → আপনার (apnar — your, formal), আমরা → আমাদের (amader — our), তারা → তাদের (tader — their).

Possessives always come before the thing being possessed: আমার বই (amar boi — my book), তোমার নাম (tomar nam — your name).`,
    examples: [
      { bengali: 'আমার নাম রহিম', roman: 'amar nam Rahim', english: 'My name is Rahim' },
      { bengali: 'তোমার বই কোথায়?', roman: 'tomar boi kothay?', english: 'Where is your book?' },
      { bengali: 'তার বাড়ি ঢাকায়', roman: 'tar bari Dhakay', english: 'His/her house is in Dhaka' },
      { bengali: 'আপনার কী দরকার?', roman: 'apnar ki dorkar?', english: 'What do you need? (formal)' },
      { bengali: 'আমাদের দেশ সুন্দর', roman: 'amader desh sundor', english: 'Our country is beautiful' },
      { bengali: 'তাদের ছেলে পড়ে', roman: 'tader chhele pore', english: 'Their son studies' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "আমার" mean?', bengali: 'আমার', roman: 'amar', correct: 'My', options: ['My', 'Your', 'His', 'Our'] },
      { type: 'fib', prompt: 'Complete: "___ নাম কী?" (your, informal)', sentence: '___ নাম কী?', roman: '___ nam ki?', english: 'What is your name?', acceptable: ['তোমার', 'tomar'], answer: 'তোমার' },
      { type: 'translate-mc', prompt: 'What does "তাদের ছেলে পড়ে" mean?', bengali: 'তাদের ছেলে পড়ে', roman: 'tader chhele pore', correct: 'Their son studies', options: ['Their son studies', 'Our son studies', 'His son studies', 'Your son studies'] },
      { type: 'error-spot', prompt: 'Which correctly says "Our country is beautiful"?', options: ['আমার দেশ সুন্দর', 'আমাদের দেশ সুন্দর', 'তাদের দেশ সুন্দর', 'আমরা দেশ সুন্দর'], correct: 'আমাদের দেশ সুন্দর', explanation: 'আমাদের means "our" — আমার means "my".' },
      { type: 'word-order', prompt: 'Arrange: "My name is Rahim"', words: ['রহিম', 'নাম', 'আমার'], correct: ['আমার', 'নাম', 'রহিম'], english: 'My name is Rahim', roman: 'amar nam Rahim' },
      { type: 'fib', prompt: 'Complete: "___ বাড়ি ঢাকায়" (his/her)', sentence: '___ বাড়ি ঢাকায়', roman: '___ bari Dhakay', english: 'His/her house is in Dhaka', acceptable: ['তার', 'tar'], answer: 'তার' },
      { type: 'translate-mc', prompt: '"আপনার" is the possessive form of:', bengali: 'আপনার', roman: 'apnar', correct: 'আপনি (formal you)', options: ['আপনি (formal you)', 'তুমি (informal you)', 'আমি (I)', 'তিনি (he/she formal)'] },
      { type: 'word-order', prompt: 'Arrange: "Where is your book?"', words: ['কোথায়?', 'তোমার', 'বই'], correct: ['তোমার', 'বই', 'কোথায়?'], english: 'Where is your book?', roman: 'tomar boi kothay?' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 5: Nouns & Plurals
  // ═══════════════════════════════════════
  {
    id: 'nouns-plurals',
    number: 5,
    title: 'Nouns & Plurals',
    shortDesc: 'Plural markers -রা and -গুলো',
    explanation: `Bengali has two main plural suffixes. -রা (-ra) is used for people and animate beings: ছেলেরা (chhelera — boys), মেয়েরা (meyera — girls), তারা (tara — they).

-গুলো (-gulo) or -গুলি (-guli) is used for things and inanimate objects: বইগুলো (boigulo — the books), গাছগুলো (gachhgulo — the trees). -গুলো is more colloquial, -গুলি is more literary.

Note that Bengali nouns don't always need a plural marker — context often makes the meaning clear. "বই" can mean "book" or "books" depending on context.`,
    examples: [
      { bengali: 'ছেলেরা খেলে', roman: 'chhelera khele', english: 'The boys play' },
      { bengali: 'মেয়েরা পড়ে', roman: 'meyera pore', english: 'The girls study' },
      { bengali: 'বইগুলো ভালো', roman: 'boigulo bhalo', english: 'The books are good' },
      { bengali: 'গাছগুলো বড়', roman: 'gachhgulo boro', english: 'The trees are big' },
      { bengali: 'লোকেরা আসছে', roman: 'lokera aschhe', english: 'The people are coming' },
      { bengali: 'ফুলগুলো সুন্দর', roman: 'phulgulo sundor', english: 'The flowers are beautiful' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'Which suffix makes people plural?', bengali: '-রা', roman: '-ra', correct: '-রা (-ra)', options: ['-রা (-ra)', '-গুলো (-gulo)', '-টা (-ta)', '-এর (-er)'] },
      { type: 'fib', prompt: 'Make "ছেলে" (boy) plural', sentence: 'ছেলে___ খেলে', roman: 'chhele___ khele', english: 'The boys play', acceptable: ['রা', 'ra'], answer: 'রা' },
      { type: 'translate-mc', prompt: 'What does "বইগুলো ভালো" mean?', bengali: 'বইগুলো ভালো', roman: 'boigulo bhalo', correct: 'The books are good', options: ['The books are good', 'The book is good', 'A good book', 'Books are bad'] },
      { type: 'error-spot', prompt: 'Which correctly says "The flowers are beautiful"?', options: ['ফুলরা সুন্দর', 'ফুলগুলো সুন্দর', 'ফুলেরা সুন্দর', 'ফুলটা সুন্দর'], correct: 'ফুলগুলো সুন্দর', explanation: 'Flowers are inanimate, so use -গুলো, not -রা.' },
      { type: 'fib', prompt: 'Make "গাছ" (tree) plural', sentence: 'গাছ___ বড়', roman: 'gachh___ boro', english: 'The trees are big', acceptable: ['গুলো', 'gulo'], answer: 'গুলো' },
      { type: 'translate-mc', prompt: '"লোকেরা আসছে" means:', bengali: 'লোকেরা আসছে', roman: 'lokera aschhe', correct: 'The people are coming', options: ['The people are coming', 'The person is coming', 'People left', 'A person came'] },
      { type: 'word-order', prompt: 'Arrange: "The girls study"', words: ['পড়ে', 'মেয়েরা'], correct: ['মেয়েরা', 'পড়ে'], english: 'The girls study', roman: 'meyera pore' },
      { type: 'error-spot', prompt: 'Which is grammatically correct?', options: ['বইরা ভালো', 'বইগুলো ভালো', 'বইদের ভালো', 'বইটি ভালো'], correct: 'বইগুলো ভালো', explanation: 'Books are inanimate — use -গুলো for plural. (বইটি means "the book" singular.)' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 6: Adjectives
  // ═══════════════════════════════════════
  {
    id: 'adjectives',
    number: 6,
    title: 'Adjectives',
    shortDesc: 'Describing people and things',
    explanation: `In Bengali, adjectives come before the noun they describe — the same order as English. Unlike many European languages, Bengali adjectives don't change form based on gender or number.

ভালো (bhalo — good), খারাপ (kharap — bad), বড় (boro — big), ছোটো (chhoto — small), সুন্দর (sundor — beautiful), লম্বা (lomba — tall/long), নতুন (notun — new), পুরোনো (purono — old).

Adjectives can also be used as predicates: "বইটা ভালো" (boita bhalo — The book is good). There is no separate "to be" verb needed in simple present-tense descriptions.`,
    examples: [
      { bengali: 'ভালো ছেলে', roman: 'bhalo chhele', english: 'good boy' },
      { bengali: 'বড় বাড়ি', roman: 'boro bari', english: 'big house' },
      { bengali: 'সুন্দর ফুল', roman: 'sundor phul', english: 'beautiful flower' },
      { bengali: 'নতুন বই', roman: 'notun boi', english: 'new book' },
      { bengali: 'বইটা ভালো', roman: 'boita bhalo', english: 'The book is good' },
      { bengali: 'ঘরটা ছোটো', roman: 'ghôrta chhoto', english: 'The room is small' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "সুন্দর ফুল" mean?', bengali: 'সুন্দর ফুল', roman: 'sundor phul', correct: 'Beautiful flower', options: ['Beautiful flower', 'Big flower', 'Red flower', 'Small flower'] },
      { type: 'word-order', prompt: 'Arrange: "big house"', words: ['বাড়ি', 'বড়'], correct: ['বড়', 'বাড়ি'], english: 'big house', roman: 'boro bari' },
      { type: 'fib', prompt: 'Complete: "___ ছেলে" (good)', sentence: '___ ছেলে', roman: '___ chhele', english: 'good boy', acceptable: ['ভালো', 'bhalo'], answer: 'ভালো' },
      { type: 'translate-mc', prompt: '"বইটা ভালো" means:', bengali: 'বইটা ভালো', roman: 'boita bhalo', correct: 'The book is good', options: ['The book is good', 'A good book', 'Good books', 'The book was good'] },
      { type: 'error-spot', prompt: 'Which correctly says "new book"?', options: ['বই নতুন', 'নতুন বই', 'নতুনটা বই', 'বইটা নতুনের'], correct: 'নতুন বই', explanation: 'Adjectives come before nouns: নতুন বই.' },
      { type: 'word-order', prompt: 'Arrange: "The room is small"', words: ['ছোটো', 'ঘরটা'], correct: ['ঘরটা', 'ছোটো'], english: 'The room is small', roman: 'ghôrta chhoto' },
      { type: 'translate-mc', prompt: 'What is "লম্বা" in English?', bengali: 'লম্বা', roman: 'lomba', correct: 'Tall / long', options: ['Tall / long', 'Short', 'Wide', 'Heavy'] },
      { type: 'fib', prompt: 'Complete: "ঘরটা ___" (small)', sentence: 'ঘরটা ___', roman: 'ghôrta ___', english: 'The room is small', acceptable: ['ছোটো', 'chhoto', 'ছোট'], answer: 'ছোটো' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 7: Negation
  // ═══════════════════════════════════════
  {
    id: 'negation',
    number: 7,
    title: 'Negation',
    shortDesc: 'না, নি, নেই, নয় — saying "no" and "not"',
    explanation: `Bengali has several negation words, each used in different contexts:

না (na) — general "no" or negates present/future verbs: আমি যাই না (ami jai na — I don't go). It comes after the verb.

নি (ni) — negates past tense: আমি যাইনি (ami jaini — I didn't go). It attaches to the verb.

নেই (nei) — means "there is not" or "don't have": আমার টাকা নেই (amar taka nei — I don't have money).

নয় (noy) — negates nouns/adjectives ("is not"): এটা ভালো নয় (eta bhalo noy — This is not good).`,
    examples: [
      { bengali: 'আমি যাই না', roman: 'ami jai na', english: "I don't go" },
      { bengali: 'সে আসেনি', roman: 'she asheni', english: "He/she didn't come" },
      { bengali: 'আমার টাকা নেই', roman: 'amar taka nei', english: "I don't have money" },
      { bengali: 'এটা ভালো নয়', roman: 'eta bhalo noy', english: 'This is not good' },
      { bengali: 'সে বাড়িতে নেই', roman: 'she barite nei', english: 'He/she is not at home' },
      { bengali: 'আমি জানি না', roman: 'ami jani na', english: "I don't know" },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "আমি যাই না" mean?', bengali: 'আমি যাই না', roman: 'ami jai na', correct: "I don't go", options: ["I don't go", "I didn't go", 'I will go', "I can't go"] },
      { type: 'translate-mc', prompt: 'Which word means "there is not"?', bengali: 'নেই', roman: 'nei', correct: 'নেই (nei)', options: ['নেই (nei)', 'না (na)', 'নি (ni)', 'নয় (noy)'] },
      { type: 'fib', prompt: 'Complete: "আমি জানি ___" (don\'t)', sentence: 'আমি জানি ___', roman: 'ami jani ___', english: "I don't know", acceptable: ['না', 'na'], answer: 'না' },
      { type: 'error-spot', prompt: 'Which correctly says "He didn\'t come"?', options: ['সে আসে না', 'সে আসেনি', 'সে আসে নেই', 'সে আসে নয়'], correct: 'সে আসেনি', explanation: 'Past negation uses নি attached to the verb.' },
      { type: 'translate-mc', prompt: '"আমার টাকা নেই" means:', bengali: 'আমার টাকা নেই', roman: 'amar taka nei', correct: "I don't have money", options: ["I don't have money", 'I had money', 'I have money', 'I need money'] },
      { type: 'fib', prompt: 'Complete: "এটা ভালো ___" (is not)', sentence: 'এটা ভালো ___', roman: 'eta bhalo ___', english: 'This is not good', acceptable: ['নয়', 'noy'], answer: 'নয়' },
      { type: 'word-order', prompt: 'Arrange: "I don\'t go"', words: ['না', 'আমি', 'যাই'], correct: ['আমি', 'যাই', 'না'], english: "I don't go", roman: 'ami jai na' },
      { type: 'translate-mc', prompt: 'নি is used to negate:', bengali: 'নি', roman: 'ni', correct: 'Past tense', options: ['Past tense', 'Present tense', 'Future tense', 'Nouns'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 8: Asking Questions
  // ═══════════════════════════════════════
  {
    id: 'questions',
    number: 8,
    title: 'Asking Questions',
    shortDesc: 'কী, কে, কোথায়, কেন, কখন, কিভাবে',
    explanation: `Bengali question words typically come right before the verb. Yes/no questions use কি (ki) as a question particle or just rising intonation.

Key question words: কী (ki — what), কে (ke — who), কোথায় (kothay — where), কেন (keno — why), কখন (kokhon — when), কিভাবে (kibhabe — how), কোনটা (konta — which one), কত (koto — how much/many).

Yes/no questions: "তুমি যাবে?" (tumi jabe? — Will you go?) or "তুমি কি যাবে?" (tumi ki jabe? — Will you go?). Note: কী (with ী) means "what," while কি (with ি) is the yes/no question particle.`,
    examples: [
      { bengali: 'তুমি কী খাও?', roman: 'tumi ki khao?', english: 'What do you eat?' },
      { bengali: 'কে আসছে?', roman: 'ke aschhe?', english: 'Who is coming?' },
      { bengali: 'তুমি কোথায় যাও?', roman: 'tumi kothay jao?', english: 'Where do you go?' },
      { bengali: 'সে কেন যায়?', roman: 'she keno jay?', english: 'Why does he/she go?' },
      { bengali: 'তুমি কি বাঙালি?', roman: 'tumi ki bangali?', english: 'Are you Bengali?' },
      { bengali: 'এটার দাম কত?', roman: 'etar dam koto?', english: 'How much does this cost?' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does কোথায় mean?', bengali: 'কোথায়', roman: 'kothay', correct: 'Where', options: ['Where', 'When', 'Why', 'How'] },
      { type: 'fib', prompt: 'Complete: "___ আসছে?" (who)', sentence: '___ আসছে?', roman: '___ aschhe?', english: 'Who is coming?', acceptable: ['কে', 'ke'], answer: 'কে' },
      { type: 'translate-mc', prompt: '"তুমি কী খাও?" means:', bengali: 'তুমি কী খাও?', roman: 'tumi ki khao?', correct: 'What do you eat?', options: ['What do you eat?', 'Do you eat?', 'Why do you eat?', 'When do you eat?'] },
      { type: 'word-order', prompt: 'Arrange: "Where do you go?"', words: ['যাও?', 'কোথায়', 'তুমি'], correct: ['তুমি', 'কোথায়', 'যাও?'], english: 'Where do you go?', roman: 'tumi kothay jao?' },
      { type: 'error-spot', prompt: 'Which correctly asks "Why does he go?"?', options: ['সে কী যায়?', 'সে কেন যায়?', 'সে কোথায় যায়?', 'সে কে যায়?'], correct: 'সে কেন যায়?', explanation: 'কেন means "why."' },
      { type: 'translate-mc', prompt: 'কত means:', bengali: 'কত', roman: 'koto', correct: 'How much / how many', options: ['How much / how many', 'What', 'Which', 'Where'] },
      { type: 'fib', prompt: 'Complete: "সে ___ যায়?" (why)', sentence: 'সে ___ যায়?', roman: 'she ___ jay?', english: 'Why does he/she go?', acceptable: ['কেন', 'keno'], answer: 'কেন' },
      { type: 'translate-mc', prompt: '"তুমি কি বাঙালি?" means:', bengali: 'তুমি কি বাঙালি?', roman: 'tumi ki bangali?', correct: 'Are you Bengali?', options: ['Are you Bengali?', 'What is Bengali?', 'Who is Bengali?', 'You are Bengali'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 9: Past Simple Tense
  // ═══════════════════════════════════════
  {
    id: 'past-simple',
    number: 9,
    title: 'Past Simple Tense',
    shortDesc: 'Completed actions in the past',
    explanation: `The past simple tense in Bengali describes completed actions. The verb endings change by person and formality.

Key endings: আমি verb-লাম (ami verb-lam), তুমি verb-লে (tumi verb-le), সে verb-লো (she verb-lo), আপনি/তিনি verb-লেন (apni/tini verb-len).

For "করা" (to do): আমি করলাম (ami korlam — I did), তুমি করলে (tumi korle — you did), সে করলো (she korlo — he/she did), আপনি করলেন (apni korlen — you did, formal).

Some verbs have irregular past forms: যাওয়া → গেলাম (gelam — I went), খাওয়া → খেলাম (khelam — I ate), আসা → এলাম (elam — I came).`,
    examples: [
      { bengali: 'আমি গেলাম', roman: 'ami gelam', english: 'I went' },
      { bengali: 'তুমি খেলে', roman: 'tumi khele', english: 'You ate' },
      { bengali: 'সে এলো', roman: 'she elo', english: 'He/she came' },
      { bengali: 'আপনি কী করলেন?', roman: 'apni ki korlen?', english: 'What did you do? (formal)' },
      { bengali: 'আমরা দেখলাম', roman: 'amra dekhlam', english: 'We saw' },
      { bengali: 'তারা বললো', roman: 'tara bollo', english: 'They said' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "আমি গেলাম" mean?', bengali: 'আমি গেলাম', roman: 'ami gelam', correct: 'I went', options: ['I went', 'I go', 'I will go', 'I am going'] },
      { type: 'fib', prompt: 'Complete: "সে ___" (came)', sentence: 'সে ___', roman: 'she ___', english: 'He/she came', acceptable: ['এলো', 'elo'], answer: 'এলো' },
      { type: 'error-spot', prompt: 'Which correctly says "We saw"?', options: ['আমরা দেখি', 'আমরা দেখলাম', 'আমরা দেখলে', 'আমরা দেখলো'], correct: 'আমরা দেখলাম', explanation: 'আমরা takes -লাম (-lam) in past tense.' },
      { type: 'translate-mc', prompt: '"তারা বললো" means:', bengali: 'তারা বললো', roman: 'tara bollo', correct: 'They said', options: ['They said', 'They say', 'They will say', 'He said'] },
      { type: 'word-order', prompt: 'Arrange: "What did you do? (formal)"', words: ['করলেন?', 'কী', 'আপনি'], correct: ['আপনি', 'কী', 'করলেন?'], english: 'What did you do?', roman: 'apni ki korlen?' },
      { type: 'fib', prompt: 'Complete: "আমি ___" (went)', sentence: 'আমি ___', roman: 'ami ___', english: 'I went', acceptable: ['গেলাম', 'gelam'], answer: 'গেলাম' },
      { type: 'translate-mc', prompt: 'The past tense ending for আমি is:', bengali: '-লাম', roman: '-lam', correct: '-লাম (-lam)', options: ['-লাম (-lam)', '-লে (-le)', '-লো (-lo)', '-লেন (-len)'] },
      { type: 'word-order', prompt: 'Arrange: "You ate"', words: ['খেলে', 'তুমি'], correct: ['তুমি', 'খেলে'], english: 'You ate', roman: 'tumi khele' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 10: Future Tense
  // ═══════════════════════════════════════
  {
    id: 'future-tense',
    number: 10,
    title: 'Future Tense',
    shortDesc: 'Talking about what will happen',
    explanation: `The future tense in Bengali uses the suffix -ব (-bo) as its base, changing by person:

আমি verb-বো (ami verb-bo), তুমি verb-বে (tumi verb-be), সে verb-বে (she verb-be), আপনি/তিনি verb-বেন (apni/tini verb-ben).

For "করা" (to do): আমি করবো (ami korbo — I will do), তুমি করবে (tumi korbe — you will do), সে করবে (she korbe — he/she will do), আপনি করবেন (apni korben — you will do, formal).

The future tense is also commonly used for polite requests and intentions.`,
    examples: [
      { bengali: 'আমি যাবো', roman: 'ami jabo', english: 'I will go' },
      { bengali: 'তুমি কী করবে?', roman: 'tumi ki korbe?', english: 'What will you do?' },
      { bengali: 'সে আসবে', roman: 'she ashbe', english: 'He/she will come' },
      { bengali: 'আপনি কখন আসবেন?', roman: 'apni kokhon ashben?', english: 'When will you come? (formal)' },
      { bengali: 'আমরা খাবো', roman: 'amra khabo', english: 'We will eat' },
      { bengali: 'তারা পড়বে', roman: 'tara porbe', english: 'They will study' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "আমি যাবো" mean?', bengali: 'আমি যাবো', roman: 'ami jabo', correct: 'I will go', options: ['I will go', 'I went', 'I go', 'I am going'] },
      { type: 'fib', prompt: 'Complete: "সে ___" (will come)', sentence: 'সে ___', roman: 'she ___', english: 'He/she will come', acceptable: ['আসবে', 'ashbe'], answer: 'আসবে' },
      { type: 'word-order', prompt: 'Arrange: "When will you come? (formal)"', words: ['আসবেন?', 'কখন', 'আপনি'], correct: ['আপনি', 'কখন', 'আসবেন?'], english: 'When will you come?', roman: 'apni kokhon ashben?' },
      { type: 'error-spot', prompt: 'Which correctly says "We will eat"?', options: ['আমরা খাবে', 'আমরা খাবো', 'আমরা খাবেন', 'আমরা খাবেস'], correct: 'আমরা খাবো', explanation: 'আমরা takes -বো (-bo) like আমি in future tense.' },
      { type: 'translate-mc', prompt: '"তারা পড়বে" means:', bengali: 'তারা পড়বে', roman: 'tara porbe', correct: 'They will study', options: ['They will study', 'They studied', 'They study', 'We will study'] },
      { type: 'fib', prompt: 'Complete: "তুমি কী ___?" (will do)', sentence: 'তুমি কী ___?', roman: 'tumi ki ___?', english: 'What will you do?', acceptable: ['করবে', 'korbe'], answer: 'করবে' },
      { type: 'translate-mc', prompt: 'The future ending for আপনি is:', bengali: '-বেন', roman: '-ben', correct: '-বেন (-ben)', options: ['-বেন (-ben)', '-বে (-be)', '-বো (-bo)', '-বেস (-bes)'] },
      { type: 'word-order', prompt: 'Arrange: "I will go"', words: ['যাবো', 'আমি'], correct: ['আমি', 'যাবো'], english: 'I will go', roman: 'ami jabo' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 11: Continuous Tenses
  // ═══════════════════════════════════════
  {
    id: 'continuous-tenses',
    number: 11,
    title: 'Continuous Tenses',
    shortDesc: 'Actions happening right now',
    explanation: `The present continuous tense describes actions happening right now. It is formed with the verb stem + ছ (-chh-) + person ending.

আমি করছি (ami korchhi — I am doing), তুমি করছো (tumi korchho — you are doing), সে করছে (she korchhe — he/she is doing), আপনি করছেন (apni korchhen — you are doing, formal).

The past continuous uses ছিল (chhilo): আমি করছিলাম (ami korchhilam — I was doing). This describes an ongoing action in the past.

The continuous tenses are very common in everyday Bengali conversation.`,
    examples: [
      { bengali: 'আমি খাচ্ছি', roman: 'ami khachhi', english: 'I am eating' },
      { bengali: 'তুমি কী করছো?', roman: 'tumi ki korchho?', english: 'What are you doing?' },
      { bengali: 'সে ঘুমাচ্ছে', roman: 'she ghumachhe', english: 'He/she is sleeping' },
      { bengali: 'বৃষ্টি হচ্ছে', roman: 'brishti hochhe', english: 'It is raining' },
      { bengali: 'আমি পড়ছিলাম', roman: 'ami porchhilam', english: 'I was reading' },
      { bengali: 'তারা আসছে', roman: 'tara aschhe', english: 'They are coming' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "আমি খাচ্ছি" mean?', bengali: 'আমি খাচ্ছি', roman: 'ami khachhi', correct: 'I am eating', options: ['I am eating', 'I ate', 'I will eat', 'I eat'] },
      { type: 'fib', prompt: 'Complete: "তুমি কী ___?" (are doing)', sentence: 'তুমি কী ___?', roman: 'tumi ki ___?', english: 'What are you doing?', acceptable: ['করছো', 'korchho'], answer: 'করছো' },
      { type: 'translate-mc', prompt: '"বৃষ্টি হচ্ছে" means:', bengali: 'বৃষ্টি হচ্ছে', roman: 'brishti hochhe', correct: 'It is raining', options: ['It is raining', 'It rained', 'It will rain', 'Rain stopped'] },
      { type: 'error-spot', prompt: 'Which correctly says "He is sleeping"?', options: ['সে ঘুমায়', 'সে ঘুমাচ্ছে', 'সে ঘুমাচ্ছি', 'সে ঘুমাছে'], correct: 'সে ঘুমাচ্ছে', explanation: 'সে takes -চ্ছে (-chhe) in present continuous.' },
      { type: 'translate-mc', prompt: '"আমি পড়ছিলাম" means:', bengali: 'আমি পড়ছিলাম', roman: 'ami porchhilam', correct: 'I was reading', options: ['I was reading', 'I am reading', 'I will read', 'I read'] },
      { type: 'word-order', prompt: 'Arrange: "They are coming"', words: ['আসছে', 'তারা'], correct: ['তারা', 'আসছে'], english: 'They are coming', roman: 'tara aschhe' },
      { type: 'fib', prompt: 'Complete: "সে ___" (is sleeping)', sentence: 'সে ___', roman: 'she ___', english: 'He/she is sleeping', acceptable: ['ঘুমাচ্ছে', 'ghumachhe'], answer: 'ঘুমাচ্ছে' },
      { type: 'translate-mc', prompt: 'The continuous marker in Bengali is:', bengali: '-ছ-', roman: '-chh-', correct: '-ছ- (-chh-)', options: ['-ছ- (-chh-)', '-ল- (-l-)', '-ব- (-b-)', '-ত- (-t-)'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 12: Imperative Mood
  // ═══════════════════════════════════════
  {
    id: 'imperative',
    number: 12,
    title: 'Imperative Mood',
    shortDesc: 'Commands, requests, and instructions',
    explanation: `The imperative mood is used for commands, requests, and instructions. Bengali has three levels matching the pronoun formality:

তুই level (very informal): verb stem alone — যা (ja — go!), কর (kor — do!).
তুমি level (standard): verb stem + ও (-o) — যাও (jao — go), করো (koro — do).
আপনি level (polite): verb stem + উন (-un) or এন (-en) — যান (jan — please go), করুন (korun — please do).

The আপনি form doubles as a polite request. Adding "দয়া করে" (doya kore — please) before any imperative makes it more polite.`,
    examples: [
      { bengali: 'এখানে আসো', roman: 'ekhane esho', english: 'Come here (informal)' },
      { bengali: 'দয়া করে বসুন', roman: 'doya kore boshun', english: 'Please sit down (formal)' },
      { bengali: 'চুপ কর!', roman: 'chup kor!', english: 'Be quiet! (very informal)' },
      { bengali: 'দরজা বন্ধ করো', roman: 'dorja bondho koro', english: 'Close the door (informal)' },
      { bengali: 'একটু অপেক্ষা করুন', roman: 'ektu opekkha korun', english: 'Please wait a moment (formal)' },
      { bengali: 'এটা দেখো', roman: 'eta dekho', english: 'Look at this (informal)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: '"দয়া করে বসুন" means:', bengali: 'দয়া করে বসুন', roman: 'doya kore boshun', correct: 'Please sit down', options: ['Please sit down', 'Sit down!', 'Are you sitting?', 'I am sitting'] },
      { type: 'error-spot', prompt: 'Which is the polite (আপনি) way to say "Please wait"?', options: ['অপেক্ষা কর', 'অপেক্ষা করো', 'অপেক্ষা করুন', 'অপেক্ষা করবে'], correct: 'অপেক্ষা করুন', explanation: 'করুন is the আপনি-level imperative.' },
      { type: 'fib', prompt: 'Complete: "দরজা বন্ধ ___" (close, informal)', sentence: 'দরজা বন্ধ ___', roman: 'dorja bondho ___', english: 'Close the door', acceptable: ['করো', 'koro'], answer: 'করো' },
      { type: 'translate-mc', prompt: '"চুপ কর!" is at which formality level?', bengali: 'চুপ কর!', roman: 'chup kor!', correct: 'তুই (very informal)', options: ['তুই (very informal)', 'তুমি (informal)', 'আপনি (formal)', 'তিনি (formal 3rd person)'] },
      { type: 'word-order', prompt: 'Arrange: "Please sit down (formal)"', words: ['বসুন', 'করে', 'দয়া'], correct: ['দয়া', 'করে', 'বসুন'], english: 'Please sit down', roman: 'doya kore boshun' },
      { type: 'translate-mc', prompt: '"এটা দেখো" means:', bengali: 'এটা দেখো', roman: 'eta dekho', correct: 'Look at this', options: ['Look at this', 'I see this', 'This is visible', 'Can you see?'] },
      { type: 'fib', prompt: 'Complete the polite request: "Please wait" (formal)', sentence: 'দয়া করে ___', roman: 'doya kore ___', english: 'Please wait (formal)', acceptable: ['অপেক্ষা করুন', 'opekkha korun'], answer: 'অপেক্ষা করুন' },
      { type: 'error-spot', prompt: 'Which correctly says "Come here" at তুমি level?', options: ['এখানে আয়', 'এখানে আসো', 'এখানে আসুন', 'এখানে আসছে'], correct: 'এখানে আসো', explanation: 'আসো is the তুমি imperative. আয় is তুই, আসুন is আপনি.' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 13: Postpositions
  // ═══════════════════════════════════════
  {
    id: 'postpositions',
    number: 13,
    title: 'Postpositions',
    shortDesc: 'Bengali equivalents of prepositions',
    explanation: `Where English uses prepositions (in, on, to, from) before the noun, Bengali uses postpositions that come after the noun.

Common postpositions: -তে/-এ (-te/-e — in/at/to): বাড়িতে (barite — at home), -র উপরে (-r upore — on top of), -র নিচে (-r niche — under/below), -র সামনে (-r shamne — in front of), -র পাশে (-r pashe — beside), -থেকে (-theke — from), -র জন্য (-r jonno — for), -র সাথে (-r shathe — with).

These postpositions often attach to the noun or follow the possessive form of the noun.`,
    examples: [
      { bengali: 'আমি বাড়িতে আছি', roman: 'ami barite achhi', english: 'I am at home' },
      { bengali: 'বইটা টেবিলের উপরে', roman: 'boita tebiler upore', english: 'The book is on the table' },
      { bengali: 'সে স্কুল থেকে এলো', roman: 'she skul theke elo', english: 'He/she came from school' },
      { bengali: 'আমার জন্য', roman: 'amar jonno', english: 'For me' },
      { bengali: 'তোমার সাথে যাবো', roman: 'tomar shathe jabo', english: 'I will go with you' },
      { bengali: 'গাছের নিচে বসো', roman: 'gachher niche bosho', english: 'Sit under the tree' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "বাড়িতে" mean?', bengali: 'বাড়িতে', roman: 'barite', correct: 'At home', options: ['At home', 'From home', 'To the home', 'Near home'] },
      { type: 'fib', prompt: 'Complete: "বইটা টেবিলের ___" (on top of)', sentence: 'বইটা টেবিলের ___', roman: 'boita tebiler ___', english: 'The book is on the table', acceptable: ['উপরে', 'upore'], answer: 'উপরে' },
      { type: 'translate-mc', prompt: '"থেকে" means:', bengali: 'থেকে', roman: 'theke', correct: 'From', options: ['From', 'To', 'In', 'With'] },
      { type: 'word-order', prompt: 'Arrange: "I am at home"', words: ['আছি', 'আমি', 'বাড়িতে'], correct: ['আমি', 'বাড়িতে', 'আছি'], english: 'I am at home', roman: 'ami barite achhi' },
      { type: 'error-spot', prompt: 'Which correctly says "Sit under the tree"?', options: ['নিচে গাছের বসো', 'গাছের নিচে বসো', 'নিচে বসো গাছের', 'বসো গাছের নিচে'], correct: 'গাছের নিচে বসো', explanation: 'The postposition নিচে follows the possessive গাছের.' },
      { type: 'translate-mc', prompt: '"তোমার সাথে" means:', bengali: 'তোমার সাথে', roman: 'tomar shathe', correct: 'With you', options: ['With you', 'For you', 'To you', 'From you'] },
      { type: 'fib', prompt: 'Complete: "সে স্কুল ___ এলো" (from)', sentence: 'সে স্কুল ___ এলো', roman: 'she skul ___ elo', english: 'He came from school', acceptable: ['থেকে', 'theke'], answer: 'থেকে' },
      { type: 'translate-mc', prompt: '"আমার জন্য" means:', bengali: 'আমার জন্য', roman: 'amar jonno', correct: 'For me', options: ['For me', 'With me', 'About me', 'By me'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 14: Classifiers & Counters
  // ═══════════════════════════════════════
  {
    id: 'classifiers',
    number: 14,
    title: 'Classifiers & Counters',
    shortDesc: 'টা/টি, জন, খানা — counting words',
    explanation: `Bengali requires classifiers (counter words) between numbers and nouns, similar to Chinese or Japanese. You cannot say "two books" directly — you need "দুইটা বই" (duita boi — two-CL book).

Common classifiers: টা/টি (ta/ti — general objects, টি is more formal), জন (jon — people), খানা (khana — flat objects, pieces), গাছা (gachha — stick-like things).

টা and টি also function as definite articles: বইটা (boita — the book), মেয়েটি (meyeti — the girl). একটা (ekta) means "one" or "a/an": একটা বই (ekta boi — a book).`,
    examples: [
      { bengali: 'একটা বই', roman: 'ekta boi', english: 'A book / one book' },
      { bengali: 'দুইজন ছেলে', roman: 'duijon chhele', english: 'Two boys' },
      { bengali: 'তিনটা আম', roman: 'tinta am', english: 'Three mangoes' },
      { bengali: 'বইটা দাও', roman: 'boita dao', english: 'Give (me) the book' },
      { bengali: 'মেয়েটি সুন্দর', roman: 'meyeti sundor', english: 'The girl is beautiful' },
      { bengali: 'চারজন লোক এলো', roman: 'charjon lok elo', english: 'Four people came' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'Which classifier is used for people?', bengali: 'জন', roman: 'jon', correct: 'জন (jon)', options: ['জন (jon)', 'টা (ta)', 'খানা (khana)', 'গাছা (gachha)'] },
      { type: 'fib', prompt: 'Complete: "দুই___ ছেলে" (two boys)', sentence: 'দুই___ ছেলে', roman: 'dui___ chhele', english: 'Two boys', acceptable: ['জন', 'jon'], answer: 'জন' },
      { type: 'translate-mc', prompt: '"একটা বই" means:', bengali: 'একটা বই', roman: 'ekta boi', correct: 'A book / one book', options: ['A book / one book', 'The books', 'Many books', 'Some books'] },
      { type: 'error-spot', prompt: 'Which correctly says "three mangoes"?', options: ['তিন আম', 'তিনটা আম', 'তিনজন আম', 'আমটা তিন'], correct: 'তিনটা আম', explanation: 'Mangoes are objects — use টা, not জন (which is for people).' },
      { type: 'translate-mc', prompt: '"বইটা" means:', bengali: 'বইটা', roman: 'boita', correct: 'The book (specific)', options: ['The book (specific)', 'A book', 'Books', 'Some book'] },
      { type: 'word-order', prompt: 'Arrange: "Four people came"', words: ['এলো', 'লোক', 'চারজন'], correct: ['চারজন', 'লোক', 'এলো'], english: 'Four people came', roman: 'charjon lok elo' },
      { type: 'fib', prompt: 'Complete: "তিন___ আম" (three mangoes)', sentence: 'তিন___ আম', roman: 'tin___ am', english: 'Three mangoes', acceptable: ['টা', 'ta'], answer: 'টা' },
      { type: 'translate-mc', prompt: 'টি is:', bengali: 'টি', roman: 'ti', correct: 'A more formal version of টা', options: ['A more formal version of টা', 'Used only for people', 'A plural marker', 'A verb ending'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 15: Vowel Marks (কার)
  // ═══════════════════════════════════════
  {
    id: 'vowel-marks',
    number: 15,
    title: 'Vowel Marks (কার)',
    shortDesc: 'How vowels attach to consonants',
    explanation: `When a vowel follows a consonant in Bengali, it is written as a vowel mark (কার — kar) attached to the consonant, not as a separate letter.

Each vowel has a corresponding mark: আ-কার (া), ই-কার (ি), ঈ-কার (ী), উ-কার (ু), ঊ-কার (ূ), ঋ-কার (ৃ), এ-কার (ে), ঐ-কার (ৈ), ও-কার (ো), ঔ-কার (ৌ).

For example: ক + আ-কার = কা (ka), ক + ই-কার = কি (ki), ক + উ-কার = কু (ku). The inherent vowel অ (ô) has no mark — a consonant alone carries it: ক = kô.`,
    examples: [
      { bengali: 'কা = ক + া', roman: 'ka = k + aa-kar', english: 'ka (k + আ-কার)' },
      { bengali: 'কি = ক + ি', roman: 'ki = k + i-kar', english: 'ki (k + ই-কার)' },
      { bengali: 'কু = ক + ু', roman: 'ku = k + u-kar', english: 'ku (k + উ-কার)' },
      { bengali: 'কে = ক + ে', roman: 'ke = k + e-kar', english: 'ke (k + এ-কার)' },
      { bengali: 'কো = ক + ো', roman: 'ko = k + o-kar', english: 'ko (k + ও-কার)' },
      { bengali: 'কৌ = ক + ৌ', roman: 'kou = k + ou-kar', english: 'kou (k + ঔ-কার)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What is া called?', bengali: 'া', roman: 'aa-kar', correct: 'আ-কার (aa-kar)', options: ['আ-কার (aa-kar)', 'ই-কার (i-kar)', 'উ-কার (u-kar)', 'এ-কার (e-kar)'] },
      { type: 'fib', prompt: 'ক + ি = ?', sentence: 'ক + ি = ___', roman: 'k + i-kar = ___', english: 'ki', acceptable: ['কি', 'ki'], answer: 'কি' },
      { type: 'translate-mc', prompt: 'Which vowel mark is ু?', bengali: 'ু', roman: 'u-kar', correct: 'উ-কার (u-kar)', options: ['উ-কার (u-kar)', 'ঊ-কার (uu-kar)', 'ঋ-কার (ri-kar)', 'ই-কার (i-kar)'] },
      { type: 'error-spot', prompt: 'Which correctly represents "ko"?', options: ['কু', 'কো', 'কৌ', 'কা'], correct: 'কো', explanation: 'কো = ক + ো (ও-কার). কু is "ku", কৌ is "kou", কা is "ka".' },
      { type: 'translate-mc', prompt: 'A consonant with no vowel mark carries which sound?', bengali: 'ক', roman: 'kô', correct: 'The inherent vowel অ (ô)', options: ['The inherent vowel অ (ô)', 'No vowel sound', 'The vowel আ (a)', 'The vowel এ (e)'] },
      { type: 'fib', prompt: 'ক + া = ?', sentence: 'ক + া = ___', roman: 'k + aa-kar = ___', english: 'ka', acceptable: ['কা', 'ka'], answer: 'কা' },
      { type: 'translate-mc', prompt: 'Which is ে (e-kar) applied to ক?', bengali: 'কে', roman: 'ke', correct: 'কে', options: ['কে', 'কি', 'কা', 'কো'] },
      { type: 'fib', prompt: 'ক + ু = ?', sentence: 'ক + ু = ___', roman: 'k + u-kar = ___', english: 'ku', acceptable: ['কু', 'ku'], answer: 'কু' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 16: Conjunct Consonants
  // ═══════════════════════════════════════
  {
    id: 'conjunct-consonants',
    number: 16,
    title: 'Conjunct Consonants (যুক্তবর্ণ)',
    shortDesc: 'When consonants combine together',
    explanation: `When two or more consonants appear together without a vowel between them, they form conjunct consonants (যুক্তবর্ণ — juktoborno). Bengali has hundreds of these combinations.

The হসন্ত (hosonto — ্) is the mark that removes the inherent vowel, allowing consonants to combine: ক + ্ + ত = ক্ত (kto).

Common conjuncts: ক্ত (kto) as in শক্ত (shokto — hard), ন্ত (nto) as in অন্ত (onto — end), ক্ষ (kkho) as in রক্ষা (rokkha — protection), জ্ঞ (ggo) as in জ্ঞান (ggan — knowledge).

Learning to recognize common conjuncts is essential for reading Bengali fluently.`,
    examples: [
      { bengali: 'ক্ত — শক্ত', roman: 'kto — shokto', english: 'hard / strong' },
      { bengali: 'ন্ত — অন্ত', roman: 'nto — onto', english: 'end' },
      { bengali: 'ক্ষ — রক্ষা', roman: 'kkho — rokkha', english: 'protection' },
      { bengali: 'স্ত — মস্ত', roman: 'sto — mosto', english: 'great / huge' },
      { bengali: 'ন্দ — আনন্দ', roman: 'ndo — anondo', english: 'joy / happiness' },
      { bengali: 'ঙ্গ — বাঙালি', roman: 'ngo — bangali', english: 'Bengali person / people' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does যুক্তবর্ণ mean?', bengali: 'যুক্তবর্ণ', roman: 'juktoborno', correct: 'Conjunct consonants', options: ['Conjunct consonants', 'Vowel marks', 'Plural markers', 'Verb endings'] },
      { type: 'translate-mc', prompt: '"শক্ত" means:', bengali: 'শক্ত', roman: 'shokto', correct: 'Hard / strong', options: ['Hard / strong', 'Soft / weak', 'Big / large', 'Small / little'] },
      { type: 'fib', prompt: 'ক + ্ + ত = ?', sentence: 'ক + ্ + ত = ___', roman: 'k + hosonto + t = ___', english: 'conjunct kto', acceptable: ['ক্ত', 'kto'], answer: 'ক্ত' },
      { type: 'error-spot', prompt: 'Which word contains the conjunct ন্দ?', options: ['আনন্দ', 'শক্ত', 'রক্ষা', 'মস্ত'], correct: 'আনন্দ', explanation: 'আনন্দ (anondo — joy) contains ন্দ.' },
      { type: 'translate-mc', prompt: '"আনন্দ" means:', bengali: 'আনন্দ', roman: 'anondo', correct: 'Joy / happiness', options: ['Joy / happiness', 'Sadness', 'Anger', 'Fear'] },
      { type: 'translate-mc', prompt: 'The হসন্ত (্) mark does what?', bengali: '্', roman: 'hosonto', correct: 'Removes the inherent vowel', options: ['Removes the inherent vowel', 'Adds a vowel', 'Makes a consonant nasal', 'Doubles a consonant'] },
      { type: 'fib', prompt: '"রক্ষা" contains which conjunct?', sentence: 'রক্ষা contains ___', roman: 'rokkha contains ___', english: 'kkho conjunct', acceptable: ['ক্ষ', 'kkho'], answer: 'ক্ষ' },
      { type: 'translate-mc', prompt: '"মস্ত" means:', bengali: 'মস্ত', roman: 'mosto', correct: 'Great / huge', options: ['Great / huge', 'Small / tiny', 'Equal / same', 'Gentle / soft'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 17: Compound Verbs
  // ═══════════════════════════════════════
  {
    id: 'compound-verbs',
    number: 17,
    title: 'Compound Verbs',
    shortDesc: 'Two verbs working together',
    explanation: `Compound verbs are extremely common in Bengali. They consist of a main verb (in its stem form) + a helper verb that adds nuance like completion, benefit, direction, or intensity.

Common helper verbs: ফেলা (phela — completeness/finality): খেয়ে ফেলো (kheye phelo — eat it up), নেওয়া (neowa — for self-benefit): শিখে নাও (shikhe nao — learn it for yourself), দেওয়া (deowa — for others): করে দাও (kore dao — do it for someone), যাওয়া (jaowa — away/gradual change): চলে যাও (chole jao — go away).

The main verb takes the -এ/-ে (-e) form (conjunctive participle) before the helper verb.`,
    examples: [
      { bengali: 'খেয়ে ফেলো', roman: 'kheye phelo', english: 'Eat it up (completely)' },
      { bengali: 'শিখে নাও', roman: 'shikhe nao', english: 'Learn it (for yourself)' },
      { bengali: 'করে দাও', roman: 'kore dao', english: 'Do it (for someone)' },
      { bengali: 'চলে যাও', roman: 'chole jao', english: 'Go away' },
      { bengali: 'পড়ে ফেলেছি', roman: 'pore phelechhi', english: 'I have read it (completely)' },
      { bengali: 'বলে দাও', roman: 'bole dao', english: 'Tell (someone, as a favor)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: '"খেয়ে ফেলো" means:', bengali: 'খেয়ে ফেলো', roman: 'kheye phelo', correct: 'Eat it up (completely)', options: ['Eat it up (completely)', 'Start eating', 'Stop eating', 'Keep eating'] },
      { type: 'translate-mc', prompt: 'ফেলা as a helper verb adds the sense of:', bengali: 'ফেলা', roman: 'phela', correct: 'Completeness / finality', options: ['Completeness / finality', 'Self-benefit', 'Helping others', 'Gradual change'] },
      { type: 'fib', prompt: 'Complete: "শিখে ___" (learn for yourself)', sentence: 'শিখে ___', roman: 'shikhe ___', english: 'Learn it (for yourself)', acceptable: ['নাও', 'nao'], answer: 'নাও' },
      { type: 'error-spot', prompt: 'Which means "do it for someone"?', options: ['করে নাও', 'করে দাও', 'করে ফেলো', 'করে যাও'], correct: 'করে দাও', explanation: 'দেওয়া (দাও) as helper means doing something for someone else.' },
      { type: 'translate-mc', prompt: '"চলে যাও" means:', bengali: 'চলে যাও', roman: 'chole jao', correct: 'Go away', options: ['Go away', 'Come here', 'Stay here', 'Sit down'] },
      { type: 'word-order', prompt: 'Arrange: "Tell someone (as a favor)"', words: ['দাও', 'বলে'], correct: ['বলে', 'দাও'], english: 'Tell (someone)', roman: 'bole dao' },
      { type: 'translate-mc', prompt: 'নেওয়া as a helper verb means:', bengali: 'নেওয়া', roman: 'neowa', correct: 'For self-benefit', options: ['For self-benefit', 'For others', 'Completion', 'Movement away'] },
      { type: 'fib', prompt: 'Complete: "করে ___" (do for someone)', sentence: 'করে ___', roman: 'kore ___', english: 'Do it (for someone)', acceptable: ['দাও', 'dao'], answer: 'দাও' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 18: Conditional Sentences
  // ═══════════════════════════════════════
  {
    id: 'conditionals',
    number: 18,
    title: 'Conditional Sentences',
    shortDesc: 'যদি...তাহলে — if...then',
    explanation: `Conditional sentences in Bengali use যদি (jodi — if) and তাহলে (tahole — then). The verb in the "if" clause usually takes a special conditional form.

Basic pattern: যদি + condition, তাহলে + result.

যদি তুমি যাও, তাহলে আমিও যাবো (jodi tumi jao, tahole amio jabo — If you go, then I will go too).

The conditional verb form often uses the present tense in the "if" clause even for future conditions. তাহলে can be omitted when the meaning is clear. যদি can also come mid-sentence.`,
    examples: [
      { bengali: 'যদি বৃষ্টি হয়, তাহলে আমি যাবো না', roman: 'jodi brishti hoy, tahole ami jabo na', english: "If it rains, I won't go" },
      { bengali: 'যদি তুমি চাও, আমি আসবো', roman: 'jodi tumi chao, ami ashbo', english: 'If you want, I will come' },
      { bengali: 'যদি পারো, একটু সাহায্য করো', roman: 'jodi paro, ektu shahajjo koro', english: 'If you can, help a little' },
      { bengali: 'যদি সে আসে, আমি খুশি হবো', roman: 'jodi she ashe, ami khushi hobo', english: 'If he/she comes, I will be happy' },
      { bengali: 'পড়লে পাশ করবে', roman: 'porle pash korbe', english: 'If you study, you will pass' },
      { bengali: 'যদি দেরি হয়, ফোন করো', roman: 'jodi deri hoy, phone koro', english: 'If it gets late, call me' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does যদি mean?', bengali: 'যদি', roman: 'jodi', correct: 'If', options: ['If', 'Then', 'But', 'Because'] },
      { type: 'fib', prompt: 'Complete: "___ বৃষ্টি হয়, তাহলে আমি যাবো না"', sentence: '___ বৃষ্টি হয়, তাহলে আমি যাবো না', roman: '___ brishti hoy, tahole ami jabo na', english: "If it rains, I won't go", acceptable: ['যদি', 'jodi'], answer: 'যদি' },
      { type: 'translate-mc', prompt: 'তাহলে means:', bengali: 'তাহলে', roman: 'tahole', correct: 'Then (in that case)', options: ['Then (in that case)', 'If', 'But', 'Or'] },
      { type: 'word-order', prompt: 'Arrange: "If you want, I will come"', words: ['আমি', 'আসবো', 'চাও,', 'তুমি', 'যদি'], correct: ['যদি', 'তুমি', 'চাও,', 'আমি', 'আসবো'], english: 'If you want, I will come', roman: 'jodi tumi chao, ami ashbo' },
      { type: 'error-spot', prompt: 'Which correctly says "If you study, you will pass"?', options: ['যদি পড়ে, পাশ করবে', 'যদি পড়ো, পাশ করবে', 'যদি পড়বে, পাশ করবে', 'যদি পড়লাম, পাশ করবে'], correct: 'যদি পড়ো, পাশ করবে', explanation: 'The "if" clause uses present tense (পড়ো) for future conditions.' },
      { type: 'translate-mc', prompt: '"যদি সে আসে, আমি খুশি হবো" means:', bengali: 'যদি সে আসে, আমি খুশি হবো', roman: 'jodi she ashe, ami khushi hobo', correct: 'If he comes, I will be happy', options: ['If he comes, I will be happy', 'When he came, I was happy', 'He came and I am happy', 'He will come and be happy'] },
      { type: 'fib', prompt: 'Complete: "যদি দেরি হয়, ফোন ___" (call me)', sentence: 'যদি দেরি হয়, ফোন ___', roman: 'jodi deri hoy, phone ___', english: 'If it gets late, call', acceptable: ['করো', 'koro'], answer: 'করো' },
      { type: 'translate-mc', prompt: 'Can তাহলে be omitted?', bengali: '', roman: '', correct: 'Yes, when meaning is clear', options: ['Yes, when meaning is clear', 'No, never', 'Only in formal speech', 'Only in questions'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 19: Relative Clauses
  // ═══════════════════════════════════════
  {
    id: 'relative-clauses',
    number: 19,
    title: 'Relative Clauses',
    shortDesc: 'যে...সে — the one who...',
    explanation: `Bengali relative clauses use correlative pairs — a relative word in the first clause and a matching demonstrative in the second clause.

Key pairs: যে...সে (je...she — the one who...that one), যা...তা (ja...ta — what...that), যেখানে...সেখানে (jekhane...sekhane — where...there), যখন...তখন (jokhon...tokhon — when...then).

যে ছেলে পড়ে, সে পাশ করে (je chhele pore, she pash kore — The boy who studies, he passes). The relative clause comes first, unlike in English where it follows the noun.`,
    examples: [
      { bengali: 'যে পড়ে, সে পাশ করে', roman: 'je pore, she pash kore', english: 'He who studies, passes' },
      { bengali: 'যা চাও, তা নাও', roman: 'ja chao, ta nao', english: 'Take what you want' },
      { bengali: 'যেখানে যাবে, সেখানে যাবো', roman: 'jekhane jabe, sekhane jabo', english: 'Where you go, I will go' },
      { bengali: 'যখন আসবে, তখন বলো', roman: 'jokhon ashbe, tokhon bolo', english: 'When you come, tell me then' },
      { bengali: 'যে মেয়েটি গান গায়, সে আমার বোন', roman: 'je meyeti gan gay, she amar bon', english: 'The girl who sings is my sister' },
      { bengali: 'যত চাও, তত নাও', roman: 'joto chao, toto nao', english: 'Take as much as you want' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What is the correlative pair for "who...that one"?', bengali: 'যে...সে', roman: 'je...she', correct: 'যে...সে', options: ['যে...সে', 'যা...তা', 'যখন...তখন', 'যেখানে...সেখানে'] },
      { type: 'fib', prompt: 'Complete: "যে পড়ে, ___ পাশ করে"', sentence: 'যে পড়ে, ___ পাশ করে', roman: 'je pore, ___ pash kore', english: 'He who studies, passes', acceptable: ['সে', 'she'], answer: 'সে' },
      { type: 'translate-mc', prompt: '"যা চাও, তা নাও" means:', bengali: 'যা চাও, তা নাও', roman: 'ja chao, ta nao', correct: 'Take what you want', options: ['Take what you want', 'Give what you have', 'What do you want?', 'I want that'] },
      { type: 'error-spot', prompt: 'Which correctly uses যেখানে...সেখানে?', options: ['যেখানে যাবে, তখন যাবো', 'যেখানে যাবে, সেখানে যাবো', 'যখন যাবে, সেখানে যাবো', 'যেখানে যাবে, তা যাবো'], correct: 'যেখানে যাবে, সেখানে যাবো', explanation: 'যেখানে (where) pairs with সেখানে (there).' },
      { type: 'word-order', prompt: 'Arrange: "When you come, tell me then"', words: ['বলো', 'তখন', 'আসবে,', 'যখন'], correct: ['যখন', 'আসবে,', 'তখন', 'বলো'], english: 'When you come, tell me then', roman: 'jokhon ashbe, tokhon bolo' },
      { type: 'translate-mc', prompt: 'যত...তত means:', bengali: 'যত...তত', roman: 'joto...toto', correct: 'As much...that much', options: ['As much...that much', 'Who...that one', 'Where...there', 'When...then'] },
      { type: 'fib', prompt: 'Complete: "___চাও, তা নাও" (what)', sentence: '___ চাও, তা নাও', roman: '___ chao, ta nao', english: 'Take what you want', acceptable: ['যা', 'ja'], answer: 'যা' },
      { type: 'translate-mc', prompt: '"যে মেয়েটি গান গায়, সে আমার বোন" means:', bengali: 'যে মেয়েটি গান গায়, সে আমার বোন', roman: 'je meyeti gan gay, she amar bon', correct: 'The girl who sings is my sister', options: ['The girl who sings is my sister', 'My sister sings songs', 'That girl is singing', 'I want the girl to sing'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 20: Honorific System & Politeness
  // ═══════════════════════════════════════
  {
    id: 'honorifics',
    number: 20,
    title: 'Honorific System & Politeness',
    shortDesc: 'Navigating respect in Bengali culture',
    explanation: `Bengali has a rich honorific system that goes beyond just তুই/তুমি/আপনি. Proper use of honorifics is crucial in Bengali social interactions.

Kinship terms are used as honorifics even for non-relatives: দাদা/দিদি (dada/didi — elder brother/sister) for slightly older strangers, কাকা/কাকি (kaka/kaki — uncle/aunt) for much older people.

Adding -বাবু (-babu) or -সাহেব (-shaheb) after a name shows respect. Using তিনি instead of সে elevates the person's status in conversation.

Polite expressions: দয়া করে (doya kore — please), মাফ করবেন (maph korben — forgive me/excuse me), ধন্যবাদ (dhonnobad — thank you), আসসালামু আলাইকুম (assalamu alaikum — peace greeting).`,
    examples: [
      { bengali: 'দাদা, একটু সাহায্য করবেন?', roman: 'dada, ektu shahajjo korben?', english: 'Brother, could you help a little?' },
      { bengali: 'মাফ করবেন, একটু বলবেন?', roman: 'maph korben, ektu bolben?', english: 'Excuse me, could you tell me?' },
      { bengali: 'তিনি অনেক ভালো মানুষ', roman: 'tini onek bhalo manush', english: 'He/she is a very good person (respectful)' },
      { bengali: 'জ্বি, আমি বুঝেছি', roman: 'jee, ami bujhechhi', english: 'Yes (respectful), I understood' },
      { bengali: 'আসসালামু আলাইকুম', roman: 'assalamu alaikum', english: 'Peace be upon you (Muslim greeting)' },
      { bengali: 'নমস্কার', roman: 'nomoshkar', english: 'Hello (Hindu/formal greeting)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'When speaking to an older stranger, you might call them:', bengali: 'দাদা / দিদি', roman: 'dada / didi', correct: 'দাদা (brother) or দিদি (sister)', options: ['দাদা (brother) or দিদি (sister)', 'তুই (informal you)', 'ভাই (younger brother)', 'বন্ধু (friend)'] },
      { type: 'translate-mc', prompt: '"মাফ করবেন" means:', bengali: 'মাফ করবেন', roman: 'maph korben', correct: 'Excuse me / forgive me', options: ['Excuse me / forgive me', 'Thank you', 'Hello', 'Goodbye'] },
      { type: 'fib', prompt: 'Complete: "দাদা, একটু সাহায্য ___?" (could you help, formal)', sentence: 'দাদা, একটু সাহায্য ___?', roman: 'dada, ektu shahajjo ___?', english: 'Brother, could you help?', acceptable: ['করবেন', 'korben'], answer: 'করবেন' },
      { type: 'error-spot', prompt: 'Which is the most polite way to ask for directions?', options: ['এই, কোথায় যেতে হবে বলো', 'মাফ করবেন, একটু বলবেন রাস্তাটা কোথায়?', 'তুই বল, রাস্তা কোনটা?', 'শোন, রাস্তা দেখা'], correct: 'মাফ করবেন, একটু বলবেন রাস্তাটা কোথায়?', explanation: 'Using মাফ করবেন and আপনি-level verb (বলবেন) is the most polite.' },
      { type: 'translate-mc', prompt: '"জ্বি" is:', bengali: 'জ্বি', roman: 'jee', correct: 'A respectful way to say "yes"', options: ['A respectful way to say "yes"', 'A way to say "no"', 'A greeting', 'A farewell'] },
      { type: 'translate-mc', prompt: '"নমস্কার" is used as:', bengali: 'নমস্কার', roman: 'nomoshkar', correct: 'A formal/Hindu greeting', options: ['A formal/Hindu greeting', 'A farewell only', 'A Muslim greeting', 'An informal greeting'] },
      { type: 'fib', prompt: 'The respectful third person pronoun is:', sentence: '___ অনেক ভালো মানুষ', roman: '___ onek bhalo manush', english: 'He/she is a very good person', acceptable: ['তিনি', 'tini'], answer: 'তিনি' },
      { type: 'word-order', prompt: 'Arrange: "Excuse me, could you tell me?"', words: ['বলবেন?', 'একটু', 'করবেন,', 'মাফ'], correct: ['মাফ', 'করবেন,', 'একটু', 'বলবেন?'], english: 'Excuse me, could you tell me?', roman: 'maph korben, ektu bolben?' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 21: Comparatives & Superlatives
  // ═══════════════════════════════════════
  {
    id: 'comparatives',
    number: 21,
    title: 'Comparatives & Superlatives',
    shortDesc: 'আরো, বেশি, সবচেয়ে, থেকে — comparing things',
    explanation: `To compare two things in Bengali, use the pattern: A + থেকে (than) + B + আরো/বেশি (more) + adjective. The word থেকে literally means "from," so you are saying "from A, B is more [adjective]."

For example: "আম কলার থেকে মিষ্টি" means "Mango is sweeter than banana" — literally "from banana, mango is sweet." The comparison marker থেকে follows the thing being compared against.

For superlatives (the most), use সবচেয়ে before the adjective: "সে সবচেয়ে লম্বা" = "He/she is the tallest." সবচেয়ে means "among all" or "most of all."

আরো means "more/further" (আরো বড় = bigger), while বেশি emphasizes quantity or degree (বেশি ভালো = better, আরো বেশি = even more).

Note for English speakers: Bengali does NOT add a comparative suffix to adjectives. Where English says "sweet-er," Bengali uses the base adjective মিষ্টি unchanged — the comparison is expressed by the structure A থেকে B adjective, not by modifying the adjective itself.`,
    examples: [
      { bengali: 'আম কলার থেকে মিষ্টি', roman: 'am kolar theke mishti', english: 'Mango is sweeter than banana' },
      { bengali: 'সে আমার থেকে লম্বা', roman: 'she amar theke lomba', english: 'He/she is taller than me' },
      { bengali: 'এই বইটা ওটার থেকে আরো ভালো', roman: 'ei boita otar theke aro bhalo', english: 'This book is better than that one' },
      { bengali: 'ঢাকা বাংলাদেশের সবচেয়ে বড় শহর', roman: 'dhaka bangladesher shobcheye boro shohor', english: 'Dhaka is the biggest city in Bangladesh' },
      { bengali: 'সে সবচেয়ে ভালো ছাত্র', roman: 'she shobcheye bhalo chhatro', english: 'He/she is the best student' },
      { bengali: 'গরমকাল শীতকালের থেকে বেশি গরম', roman: 'gormokal shitokaler theke beshi gorom', english: 'Summer is hotter than winter' },
      { bengali: 'আরো একটু দাও', roman: 'aro ektu dao', english: 'Give a little more' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does this sentence mean?', bengali: 'সে আমার থেকে লম্বা', roman: 'she amar theke lomba', correct: 'He/she is taller than me', options: ['He/she is taller than me', 'I am taller than him/her', 'He/she is as tall as me', 'He/she was taller than me'] },
      { type: 'translate-mc', prompt: 'How do you say "the biggest"?', bengali: 'সবচেয়ে বড়', roman: 'shobcheye boro', correct: 'সবচেয়ে বড়', options: ['সবচেয়ে বড়', 'আরো বড়', 'বেশি বড়', 'থেকে বড়'] },
      { type: 'fib', prompt: 'Fill in: "Mango is sweeter than banana"', sentence: 'আম কলার ___ মিষ্টি', roman: 'am kolar ___ mishti', english: 'Mango is sweeter than banana', acceptable: ['থেকে', 'theke'], answer: 'থেকে' },
      { type: 'word-order', prompt: 'Arrange: "She is the best student"', words: ['ছাত্র', 'সবচেয়ে', 'সে', 'ভালো'], correct: ['সে', 'সবচেয়ে', 'ভালো', 'ছাত্র'], english: 'She is the best student', roman: 'she shobcheye bhalo chhatro' },
      { type: 'error-spot', prompt: 'Which sentence correctly says "This is better than that"?', options: ['এটা ওটার থেকে ভালো', 'এটা থেকে ওটা ভালো', 'এটা ভালো থেকে ওটা', 'থেকে এটা ওটা ভালো'], correct: 'এটা ওটার থেকে ভালো', explanation: 'Pattern: subject + comparison + থেকে + adjective' },
      { type: 'translate-mc', prompt: '"আরো বেশি" means:', bengali: 'আরো বেশি', roman: 'aro beshi', correct: 'Even more', options: ['Even more', 'A little less', 'The most', 'Much less'] },
      { type: 'fib', prompt: 'Complete: "___ সুন্দর শহর" (the most beautiful city)', sentence: '___ সুন্দর শহর', roman: '___ shundor shohor', english: 'The most beautiful city', acceptable: ['সবচেয়ে', 'shobcheye'], answer: 'সবচেয়ে' },
      { type: 'translate-mc', prompt: 'What is the comparison word meaning "than"?', bengali: 'থেকে', roman: 'theke', correct: 'Than / from', options: ['Than / from', 'More', 'Most', 'Less'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 22: Topic & Focus Particles
  // ═══════════════════════════════════════
  {
    id: 'particles',
    number: 22,
    title: 'Topic & Focus Particles',
    shortDesc: 'তো, ই, ও — adding emphasis and contrast',
    explanation: `Bengali uses small particles that attach to words to add nuance, emphasis, or contrast. These particles do not translate directly into English but change the feel and meaning of a sentence significantly.

তো (to) signals a topic or mild assertion — often like "well," "you know," or "after all" in English. "তুমি তো জানো" = "You know (don't you)." It can also soften a request: "একটু দাওতো" = "Give some, will you."

ই (i) is an emphatic particle meaning "exactly," "only," or "right." Attaching ই to a word highlights it as the specific one: "আমিই করব" = "I (myself) will do it," implying no one else. "এটাই ঠিক" = "This is exactly right."

ও (o) means "also" or "even." "সেও আসবে" = "He/she will also come." "আমিও জানি না" = "I don't know either." When used with negatives it emphasizes impossibility: "কেউও আসেনি" = "Nobody came at all."`,
    examples: [
      { bengali: 'তুমি তো জানো', roman: 'tumi to jano', english: 'You know (don\'t you) / You do know' },
      { bengali: 'আমিই করব', roman: 'amii korbo', english: 'I myself will do it (not anyone else)' },
      { bengali: 'এটাই ঠিক', roman: 'etai thik', english: 'This is exactly right' },
      { bengali: 'সেও আসবে', roman: 'sheo ashbe', english: 'He/she will also come' },
      { bengali: 'আমিও জানি না', roman: 'amio jani na', english: 'I don\'t know either' },
      { bengali: 'একটু দাওতো', roman: 'ektu daoto', english: 'Give a little, will you (softened request)' },
      { bengali: 'এখনই যাব', roman: 'ekhonoi jabo', english: 'I will go right now (emphatic)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does ই add to a word?', bengali: 'আমিই', roman: 'amii', correct: 'Emphasis: exactly this one, no one else', options: ['Emphasis: exactly this one, no one else', 'A question marker', '"Also" or "too"', 'A topic marker'] },
      { type: 'translate-mc', prompt: 'What does "সেও আসবে" mean?', bengali: 'সেও আসবে', roman: 'sheo ashbe', correct: 'He/she will also come', options: ['He/she will also come', 'He/she will not come', 'He/she came too', 'He/she always comes'] },
      { type: 'fib', prompt: 'Add the "also" particle to আমি', sentence: 'আমি___ জানি না', roman: 'ami___ jani na', english: 'I don\'t know either', acceptable: ['ও', 'o'], answer: 'ও' },
      { type: 'error-spot', prompt: 'Which uses the emphatic ই correctly?', options: ['এটাই ঠিক', 'এটাও ঠিক', 'এটাতো ঠিক', 'এটা ঠিক'], correct: 'এটাই ঠিক', explanation: 'ই attaches to mark "this exact one is right."' },
      { type: 'translate-mc', prompt: '"তুমি তো জানো" conveys:', bengali: 'তুমি তো জানো', roman: 'tumi to jano', correct: 'You know (mild assertion or reminder)', options: ['You know (mild assertion or reminder)', 'Do you know?', 'You don\'t know', 'You knew'] },
      { type: 'word-order', prompt: 'Arrange: "I myself will do it"', words: ['আমিই', 'করব'], correct: ['আমিই', 'করব'], english: 'I myself will do it', roman: 'amii korbo' },
      { type: 'fib', prompt: 'Complete the softened request: "একটু দাও___"', sentence: 'একটু দাও___', roman: 'ektu dao___', english: 'Give a little, will you', acceptable: ['তো', 'to'], answer: 'তো' },
      { type: 'translate-mc', prompt: 'Which particle means "right now" when added to এখন?', bengali: 'এখনই', roman: 'ekhonoi', correct: 'ই (right/exactly now)', options: ['ই (right/exactly now)', 'ও (also now)', 'তো (well, now)', 'না (not now)'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 23: Verbal Nouns & Infinitives
  // ═══════════════════════════════════════
  {
    id: 'verbal-nouns',
    number: 23,
    title: 'Verbal Nouns & Infinitives',
    shortDesc: 'করা / করতে / করে — three essential verb forms',
    explanation: `Bengali verb roots can be extended with three key suffixes that turn them into nouns or infinitive-like forms used in many constructions.

The -আ suffix (করা, খাওয়া, যাওয়া) creates a verbal noun — the activity itself. "গান গাওয়া ভালো" = "Singing is good." These forms act like English gerunds (-ing words used as nouns).

The -তে suffix (করতে, খেতে, যেতে) creates an infinitive used to express purpose or direction. "খেতে যাচ্ছি" = "I'm going to eat." "পড়তে ভালো লাগে" = "I like to read (reading feels good)."

The -এ/-য়ে suffix (করে, খেয়ে, গিয়ে) creates a conjunctive participle — "by doing" or "having done." "খেয়ে যাও" = "Go after eating." "হেঁটে যাব" = "I'll go by walking."`,
    examples: [
      { bengali: 'গান গাওয়া ভালো', roman: 'gan gaowa bhalo', english: 'Singing is good (verbal noun)' },
      { bengali: 'খেতে যাচ্ছি', roman: 'khete jacchhi', english: 'I\'m going to eat (infinitive of purpose)' },
      { bengali: 'পড়তে ভালো লাগে', roman: 'porte bhalo lage', english: 'I like to read (reading feels good)' },
      { bengali: 'খেয়ে যাও', roman: 'kheye jao', english: 'Go after eating (conjunctive participle)' },
      { bengali: 'হেঁটে যাব', roman: 'hẽte jabo', english: 'I\'ll go by walking' },
      { bengali: 'কাজ করা কঠিন', roman: 'kaj kora kothin', english: 'Working is difficult (verbal noun as subject)' },
      { bengali: 'ঘুমাতে যাচ্ছি', roman: 'ghumate jacchhi', english: 'I\'m going to sleep' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What form is "করা"?', bengali: 'করা', roman: 'kora', correct: 'Verbal noun (the act of doing)', options: ['Verbal noun (the act of doing)', 'Infinitive of purpose', 'Conjunctive participle', 'Past tense'] },
      { type: 'translate-mc', prompt: 'What does "খেতে যাচ্ছি" mean?', bengali: 'খেতে যাচ্ছি', roman: 'khete jacchhi', correct: 'I\'m going to eat', options: ['I\'m going to eat', 'I ate and went', 'I like eating', 'I went eating'] },
      { type: 'fib', prompt: 'Complete: "গান ___ ভালো" (Singing is good)', sentence: 'গান ___ ভালো', roman: 'gan ___ bhalo', english: 'Singing is good', acceptable: ['গাওয়া', 'gaowa'], answer: 'গাওয়া' },
      { type: 'translate-mc', prompt: '"খেয়ে যাও" means:', bengali: 'খেয়ে যাও', roman: 'kheye jao', correct: 'Go after eating', options: ['Go after eating', 'Come eat', 'I will eat and go', 'Go and eat (then come back)'] },
      { type: 'error-spot', prompt: 'Which form shows purpose ("in order to do")?', options: ['করা', 'করতে', 'করে', 'করেছি'], correct: 'করতে', explanation: '-তে suffix creates the infinitive of purpose.' },
      { type: 'word-order', prompt: 'Arrange: "Working is difficult"', words: ['কঠিন', 'করা', 'কাজ'], correct: ['কাজ', 'করা', 'কঠিন'], english: 'Working is difficult', roman: 'kaj kora kothin' },
      { type: 'fib', prompt: 'Complete: "পড়তে ___ লাগে" (I like to read)', sentence: 'পড়তে ___ লাগে', roman: 'porte ___ lage', english: 'I like to read', acceptable: ['ভালো', 'bhalo'], answer: 'ভালো' },
      { type: 'translate-mc', prompt: 'The conjunctive participle (-এ/-য়ে) expresses:', bengali: 'হেঁটে', roman: 'hẽte', correct: '"by doing" or "having done"', options: ['"by doing" or "having done"', '"in order to do"', '"the act of doing"', '"doing it again"'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 24: Causative Verbs
  // ═══════════════════════════════════════
  {
    id: 'causatives',
    number: 24,
    title: 'Causative Verbs',
    shortDesc: 'করানো, খাওয়ানো, দেখানো — making someone do something',
    explanation: `Causative verbs in Bengali express the idea of causing or allowing someone to do something — like English "make someone do" or "have someone do." They are formed by adding -ানো (-ano) to the verb root.

খাওয়া (to eat) → খাওয়ানো (to feed / cause to eat): "মা বাচ্চাকে খাওয়াল" = "Mother fed the child."

দেখা (to see) → দেখানো (to show / cause to see): "সে আমাকে ছবি দেখাল" = "He/she showed me the picture."

করা (to do) → করানো (to have done / cause to do): "আমি কাজ করালাম" = "I had the work done."

শেখা (to learn) → শেখানো (to teach / cause to learn): "সে আমাকে বাংলা শেখাল" = "He/she taught me Bengali."

The causative often takes a dative object (the person being caused): "তাকে" (to him/her) or "বাচ্চাকে" (to the child).`,
    examples: [
      { bengali: 'মা বাচ্চাকে খাওয়াল', roman: 'ma bachhhake khawal', english: 'Mother fed the child' },
      { bengali: 'সে আমাকে ছবি দেখাল', roman: 'she amake chhabi dekhal', english: 'He/she showed me the picture' },
      { bengali: 'সে আমাকে বাংলা শেখাল', roman: 'she amake bangla shekhal', english: 'He/she taught me Bengali' },
      { bengali: 'আমি কাজ করালাম', roman: 'ami kaj korlam', english: 'I had the work done' },
      { bengali: 'ডাক্তার তাকে ওষুধ খাওয়াল', roman: 'daktar take oshudh khawal', english: 'The doctor made him/her take medicine' },
      { bengali: 'বাবা আমাকে গাড়ি চালাতে শেখাল', roman: 'baba amake gari chalate shekhal', english: 'Father taught me to drive a car' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "খাওয়ানো" mean?', bengali: 'খাওয়ানো', roman: 'khaowano', correct: 'To feed / cause to eat', options: ['To feed / cause to eat', 'To eat', 'To be eaten', 'To want to eat'] },
      { type: 'translate-mc', prompt: 'What does "সে আমাকে বাংলা শেখাল" mean?', bengali: 'সে আমাকে বাংলা শেখাল', roman: 'she amake bangla shekhal', correct: 'He/she taught me Bengali', options: ['He/she taught me Bengali', 'I taught him/her Bengali', 'He/she learned Bengali from me', 'He/she and I learned Bengali'] },
      { type: 'fib', prompt: 'What is the causative of দেখা (to see)?', sentence: '___', roman: 'to show', english: 'Causative of দেখা', acceptable: ['দেখানো', 'dekhano'], answer: 'দেখানো' },
      { type: 'word-order', prompt: 'Arrange: "Mother fed the child"', words: ['বাচ্চাকে', 'খাওয়াল', 'মা'], correct: ['মা', 'বাচ্চাকে', 'খাওয়াল'], english: 'Mother fed the child', roman: 'ma bachhhake khawal' },
      { type: 'error-spot', prompt: 'Which is the causative form of শেখা (to learn)?', options: ['শেখা', 'শেখানো', 'শিখছে', 'শিখেছে'], correct: 'শেখানো', explanation: 'Adding -ানো to the root forms the causative.' },
      { type: 'translate-mc', prompt: '"দেখানো" means:', bengali: 'দেখানো', roman: 'dekhano', correct: 'To show / cause to see', options: ['To show / cause to see', 'To look', 'To be seen', 'To watch'] },
      { type: 'fib', prompt: 'Complete: "সে আমাকে ছবি ___" (showed me the picture)', sentence: 'সে আমাকে ছবি ___', roman: 'she amake chhabi ___', english: 'He/she showed me the picture', acceptable: ['দেখাল', 'dekhal'], answer: 'দেখাল' },
      { type: 'translate-mc', prompt: 'Causative verbs are formed by adding:', bengali: '-ানো', roman: '-ano', correct: '-ানো to the verb root', options: ['-ানো to the verb root', '-তে to the root', '-এ to the root', '-ছি to the root'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 25: Reported Speech
  // ═══════════════════════════════════════
  {
    id: 'reported-speech',
    number: 25,
    title: 'Reported Speech',
    shortDesc: 'বলল যে, জিজ্ঞেস করল — saying what others said',
    explanation: `Reported speech in Bengali uses যে (that) to introduce what was said or thought. The verb for reporting (বলল, বলেছে, জানাল) comes before যে, and the reported clause follows.

Direct: সে বলল, "আমি আসব।" (He said, "I will come.")
Reported: সে বলল যে সে আসবে। (He said that he would come.)

Notice that in reported speech, pronouns often shift: the speaker's "আমি" (I) becomes "সে" (he/she) in the reported clause, just as in English.

For reported questions, use জিজ্ঞেস করল (asked) + কীভাবে/কখন/কোথায় etc.: "সে জিজ্ঞেস করল কখন আসব।" = "He/she asked when I would come."

Reported commands use বলল + infinitive: "মা বলল যেতে।" = "Mother said to go."`,
    examples: [
      { bengali: 'সে বলল যে সে আসবে', roman: 'she bollo je she ashbe', english: 'He/she said that he/she would come' },
      { bengali: 'আমি বললাম যে আমি ক্লান্ত', roman: 'ami bollam je ami klanto', english: 'I said that I was tired' },
      { bengali: 'সে জিজ্ঞেস করল কখন আসব', roman: 'she jiggesh korlo kokhon ashbo', english: 'He/she asked when I would come' },
      { bengali: 'মা বলল যেতে', roman: 'ma bollo jete', english: 'Mother said to go' },
      { bengali: 'সে জানাল যে বাজার বন্ধ', roman: 'she janal je bajar bondho', english: 'He/she let (me) know that the market is closed' },
      { bengali: 'সে বলেছে যে খাবার আছে', roman: 'she boleche je khabar achhe', english: 'He/she has said that there is food' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "সে বলল যে সে আসবে" mean?', bengali: 'সে বলল যে সে আসবে', roman: 'she bollo je she ashbe', correct: 'He/she said that he/she would come', options: ['He/she said that he/she would come', 'He/she is saying he/she is coming', 'He/she asked if he/she should come', 'He/she said he/she came'] },
      { type: 'fib', prompt: 'Complete: "আমি বললাম ___ আমি ক্লান্ত" (I said that I was tired)', sentence: 'আমি বললাম ___ আমি ক্লান্ত', roman: 'ami bollam ___ ami klanto', english: 'I said that I was tired', acceptable: ['যে', 'je'], answer: 'যে' },
      { type: 'translate-mc', prompt: 'For reported questions, you use:', bengali: 'জিজ্ঞেস করল', roman: 'jiggesh korlo', correct: 'জিজ্ঞেস করল (asked)', options: ['জিজ্ঞেস করল (asked)', 'বলল (said)', 'জানাল (informed)', 'দেখল (saw)'] },
      { type: 'word-order', prompt: 'Arrange: "He/she said that there is food"', words: ['যে', 'বলেছে', 'আছে', 'সে', 'খাবার'], correct: ['সে', 'বলেছে', 'যে', 'খাবার', 'আছে'], english: 'He/she has said that there is food', roman: 'she boleche je khabar achhe' },
      { type: 'error-spot', prompt: 'Which correctly reports "He said he is coming"?', options: ['সে বলল যে আসছে সে', 'সে বলল যে সে আসছে', 'যে সে বলল আসছে', 'সে যে বলল আসছে'], correct: 'সে বলল যে সে আসছে', explanation: 'Reporting verb + যে + reported clause (subject-verb order maintained).' },
      { type: 'translate-mc', prompt: '"মা বলল যেতে" means:', bengali: 'মা বলল যেতে', roman: 'ma bollo jete', correct: 'Mother said to go', options: ['Mother said to go', 'Mother went away', 'Mother said she is going', 'Mother asked where to go'] },
      { type: 'fib', prompt: 'Complete: "সে ___ করল কখন আসব"', sentence: 'সে ___ করল কখন আসব', roman: 'she ___ korlo kokhon ashbo', english: 'He/she asked when I would come', acceptable: ['জিজ্ঞেস', 'jiggesh'], answer: 'জিজ্ঞেস' },
      { type: 'translate-mc', prompt: 'যে in reported speech means:', bengali: 'যে', roman: 'je', correct: 'That (introducing reported clause)', options: ['That (introducing reported clause)', 'Who / which', 'When', 'Because'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 26: Passive Constructions
  // ═══════════════════════════════════════
  {
    id: 'passive',
    number: 26,
    title: 'Passive Constructions',
    shortDesc: 'হওয়া-based passives — focus on the action, not the doer',
    explanation: `Bengali forms passives primarily with হওয়া (to become/happen) combined with the past participle of the verb. The pattern is: object (subject of passive) + verb participle + হওয়া conjugated.

"কাজ হয়েছে" literally means "The work has become done" = "The work has been done." The agent (doer) is optional and can be added with দ্বারা (by): "রবীন্দ্রনাথ দ্বারা এই গান লেখা হয়েছে" = "This song was written by Rabindranath."

Another common passive uses the bare verbal noun + হওয়া: "দরজা খোলা হলো" = "The door was opened." For ongoing or habitual passive: "দোকান বন্ধ করা হয়" = "The shop is (regularly) closed."

Passives are more common in writing and formal speech. In everyday conversation, Bengali speakers often prefer active constructions.`,
    examples: [
      { bengali: 'কাজ হয়েছে', roman: 'kaj hoyechhe', english: 'The work has been done' },
      { bengali: 'দরজা খোলা হলো', roman: 'dorja khola holo', english: 'The door was opened' },
      { bengali: 'চিঠি পাঠানো হয়েছে', roman: 'chiti pathano hoyechhe', english: 'The letter has been sent' },
      { bengali: 'দোকান বন্ধ করা হয়', roman: 'dokan bondho kora hoy', english: 'The shop is (regularly) closed' },
      { bengali: 'এই বইটি রবীন্দ্রনাথ লিখেছেন', roman: 'ei boiti Rabindranath likhechen', english: 'This book was written by Rabindranath (active preferred)' },
      { bengali: 'খাবার রান্না হয়েছে', roman: 'khabar ranna hoyechhe', english: 'The food has been cooked' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "কাজ হয়েছে" mean?', bengali: 'কাজ হয়েছে', roman: 'kaj hoyechhe', correct: 'The work has been done', options: ['The work has been done', 'The work is happening', 'I did the work', 'The work will be done'] },
      { type: 'translate-mc', prompt: 'Passives in Bengali are formed with:', bengali: 'হওয়া', roman: 'howa', correct: 'Verbal noun/participle + হওয়া conjugated', options: ['Verbal noun/participle + হওয়া conjugated', 'করা + subject', 'থেকে + verb', 'ই + verb'] },
      { type: 'fib', prompt: 'Complete: "চিঠি পাঠানো ___" (The letter has been sent)', sentence: 'চিঠি পাঠানো ___', roman: 'chiti pathano ___', english: 'The letter has been sent', acceptable: ['হয়েছে', 'hoyechhe'], answer: 'হয়েছে' },
      { type: 'word-order', prompt: 'Arrange: "The door was opened"', words: ['হলো', 'দরজা', 'খোলা'], correct: ['দরজা', 'খোলা', 'হলো'], english: 'The door was opened', roman: 'dorja khola holo' },
      { type: 'error-spot', prompt: 'Which is a correct passive construction?', options: ['খাবার হয়েছে রান্না', 'রান্না খাবার হয়েছে', 'খাবার রান্না হয়েছে', 'হয়েছে খাবার রান্না'], correct: 'খাবার রান্না হয়েছে', explanation: 'Pattern: subject + verbal noun + হয়েছে' },
      { type: 'translate-mc', prompt: '"দোকান বন্ধ করা হয়" means:', bengali: 'দোকান বন্ধ করা হয়', roman: 'dokan bondho kora hoy', correct: 'The shop is (regularly) closed', options: ['The shop is (regularly) closed', 'The shop was closed once', 'Close the shop', 'The shop has been closed forever'] },
      { type: 'fib', prompt: 'Complete: "দরজা খোলা ___" (The door was opened)', sentence: 'দরজা খোলা ___', roman: 'dorja khola ___', english: 'The door was opened', acceptable: ['হলো', 'holo'], answer: 'হলো' },
      { type: 'translate-mc', prompt: 'The word হওয়া means:', bengali: 'হওয়া', roman: 'howa', correct: 'To become / to happen', options: ['To become / to happen', 'To do', 'To say', 'To go'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 27: Reduplication & Intensifiers
  // ═══════════════════════════════════════
  {
    id: 'reduplication',
    number: 27,
    title: 'Reduplication & Intensifiers',
    shortDesc: 'আস্তে আস্তে, বড়-বড় — repeating for effect',
    explanation: `Reduplication — repeating a word — is a productive and common feature of Bengali. It intensifies meaning, suggests plurality, continuity, or gradual progression depending on the word type.

Adverb reduplication indicates gradual or continuous action: "আস্তে আস্তে" (slowly slowly) = very slowly, gradually. "ধীরে ধীরে" = slowly and steadily. "একটু একটু করে" = bit by bit.

Adjective reduplication suggests many things of that type or a strong degree: "বড়-বড় গাছ" = big trees (many big ones), "ছোট-ছোট বাচ্চা" = small children (many little ones).

Verb reduplication (often with করতে করতে) suggests doing something repeatedly or while doing: "হাঁটতে হাঁটতে" = while walking. "বলতে বলতে" = while saying / saying repeatedly.

Noun reduplication emphasizes variety or abundance: "দেশে-বিদেশে" (in the country and abroad), "ঘরে-বাইরে" (inside and outside).`,
    examples: [
      { bengali: 'আস্তে আস্তে হাঁটো', roman: 'aste aste hãto', english: 'Walk slowly (very slowly, gradually)' },
      { bengali: 'ধীরে ধীরে বলো', roman: 'dhire dhire bolo', english: 'Speak slowly and steadily' },
      { bengali: 'বড়-বড় গাছ', roman: 'boro-boro gachh', english: 'Big trees (many big ones)' },
      { bengali: 'একটু একটু করে শেখো', roman: 'ektu ektu kore shekho', english: 'Learn bit by bit' },
      { bengali: 'হাঁটতে হাঁটতে কথা বলছিল', roman: 'hãte hãte kotha bolchhilo', english: 'Was talking while walking' },
      { bengali: 'ছোট-ছোট বাচ্চারা খেলছে', roman: 'chhoto-chhoto bachchhara khel-chhe', english: 'Little children are playing' },
      { bengali: 'একটু একটু ভালো হচ্ছে', roman: 'ektu ektu bhalo hochhe', english: 'Getting better little by little' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "আস্তে আস্তে" mean?', bengali: 'আস্তে আস্তে', roman: 'aste aste', correct: 'Very slowly / gradually', options: ['Very slowly / gradually', 'Very quickly', 'Again and again', 'More and more'] },
      { type: 'translate-mc', prompt: '"বড়-বড় গাছ" means:', bengali: 'বড়-বড় গাছ', roman: 'boro-boro gachh', correct: 'Big trees (many big ones)', options: ['Big trees (many big ones)', 'The biggest tree', 'A very big tree', 'Bigger and bigger trees'] },
      { type: 'fib', prompt: 'Complete: "___ করে শেখো" (learn bit by bit)', sentence: '___ করে শেখো', roman: '___ kore shekho', english: 'Learn bit by bit', acceptable: ['একটু একটু', 'ektu ektu'], answer: 'একটু একটু' },
      { type: 'translate-mc', prompt: '"হাঁটতে হাঁটতে কথা বলছিল" means:', bengali: 'হাঁটতে হাঁটতে কথা বলছিল', roman: 'hãte hãte kotha bolchhilo', correct: 'Was talking while walking', options: ['Was talking while walking', 'Walked and then talked', 'Walked quickly talking', 'Was walking to talk'] },
      { type: 'error-spot', prompt: 'Which correctly expresses "speak slowly and steadily"?', options: ['ধীরে বলো', 'ধীরে ধীরে বলো', 'বলো ধীরে ধীরে', 'ধীর বলো'], correct: 'ধীরে ধীরে বলো', explanation: 'Reduplication of adverbs intensifies the gradual quality.' },
      { type: 'word-order', prompt: 'Arrange: "Little children are playing"', words: ['খেলছে', 'ছোট-ছোট', 'বাচ্চারা'], correct: ['ছোট-ছোট', 'বাচ্চারা', 'খেলছে'], english: 'Little children are playing', roman: 'chhoto-chhoto bachchhara khelchhe' },
      { type: 'translate-mc', prompt: 'Verb reduplication with -তে -তে (like হাঁটতে হাঁটতে) indicates:', bengali: 'হাঁটতে হাঁটতে', roman: 'hãte hãte', correct: 'While doing / doing continuously', options: ['While doing / doing continuously', 'Having done already', 'In order to do', 'Doing it twice'] },
      { type: 'fib', prompt: 'Complete: "___ হচ্ছে" (getting better little by little)', sentence: 'একটু একটু ___ হচ্ছে', roman: 'ektu ektu ___ hochhe', english: 'Getting better little by little', acceptable: ['ভালো', 'bhalo'], answer: 'ভালো' },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 28: Compound & Complex Sentences
  // ═══════════════════════════════════════
  {
    id: 'complex-sentences',
    number: 28,
    title: 'Compound & Complex Sentences',
    shortDesc: 'যদি…তাহলে, কারণ, তাই, যখন — linking ideas',
    explanation: `Bengali uses a set of conjunctions to build complex sentences with conditions, causes, results, and time relationships.

যদি…তাহলে (if…then): "যদি বৃষ্টি হয় তাহলে যাব না।" = "If it rains, then I won't go." Note that in Bengali both clauses can appear in either order, but the if-clause usually comes first.

কারণ (because): placed mid-sentence after the main clause: "আমি যাইনি কারণ অসুস্থ ছিলাম।" = "I didn't go because I was sick."

তাই (therefore/so): connects cause to result: "বৃষ্টি হচ্ছে, তাই যাব না।" = "It's raining, so I won't go."

যখন…তখন (when…then): "যখন বৃষ্টি থামবে তখন বেরোব।" = "When the rain stops, then I'll go out."

কিন্তু (but) and আর/এবং (and) work like their English counterparts.`,
    examples: [
      { bengali: 'যদি বৃষ্টি হয় তাহলে যাব না', roman: 'jodi brishti hoy tahole jabo na', english: 'If it rains, then I won\'t go' },
      { bengali: 'আমি যাইনি কারণ অসুস্থ ছিলাম', roman: 'ami jaini karon oshustho chhilam', english: 'I didn\'t go because I was sick' },
      { bengali: 'বৃষ্টি হচ্ছে, তাই যাব না', roman: 'brishti hochhe, tai jabo na', english: 'It\'s raining, so I won\'t go' },
      { bengali: 'যখন বৃষ্টি থামবে তখন বেরোব', roman: 'jokhon brishti thambe tokhon berob', english: 'When the rain stops, then I\'ll go out' },
      { bengali: 'আমি ক্লান্ত কিন্তু কাজ করব', roman: 'ami klanto kintu kaj korbo', english: 'I am tired but I will work' },
      { bengali: 'সে পড়াশোনা করে তাই ভালো ফলাফল পায়', roman: 'she porashona kore tai bhalo phalapal pay', english: 'He/she studies, therefore gets good results' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "যদি...তাহলে" mean?', bengali: 'যদি...তাহলে', roman: 'jodi...tahole', correct: 'If...then', options: ['If...then', 'When...then', 'Because...therefore', 'But...so'] },
      { type: 'translate-mc', prompt: '"আমি যাইনি কারণ অসুস্থ ছিলাম" means:', bengali: 'আমি যাইনি কারণ অসুস্থ ছিলাম', roman: 'ami jaini karon oshustho chhilam', correct: 'I didn\'t go because I was sick', options: ['I didn\'t go because I was sick', 'Because I was sick, I will not go', 'I went although I was sick', 'I was sick when I went'] },
      { type: 'fib', prompt: 'Complete: "বৃষ্টি হচ্ছে ___ যাব না" (so I won\'t go)', sentence: 'বৃষ্টি হচ্ছে ___ যাব না', roman: 'brishti hochhe ___ jabo na', english: 'It\'s raining so I won\'t go', acceptable: ['তাই', 'tai'], answer: 'তাই' },
      { type: 'word-order', prompt: 'Arrange: "If it rains then I won\'t go"', words: ['তাহলে', 'হয়', 'যদি', 'যাব', 'বৃষ্টি', 'না'], correct: ['যদি', 'বৃষ্টি', 'হয়', 'তাহলে', 'যাব', 'না'], english: 'If it rains then I won\'t go', roman: 'jodi brishti hoy tahole jabo na' },
      { type: 'error-spot', prompt: 'Which correctly says "When rain stops, I\'ll go out"?', options: ['যখন বৃষ্টি তখন থামবে বেরোব', 'যখন বৃষ্টি থামবে তখন বেরোব', 'বেরোব যখন বৃষ্টি থামবে', 'তখন বৃষ্টি যখন থামবে বেরোব'], correct: 'যখন বৃষ্টি থামবে তখন বেরোব', explanation: 'যখন clause comes first, then তখন introduces the result.' },
      { type: 'translate-mc', prompt: '"তাই" means:', bengali: 'তাই', roman: 'tai', correct: 'Therefore / so (result)', options: ['Therefore / so (result)', 'If / when (condition)', 'Because (cause)', 'But (contrast)'] },
      { type: 'fib', prompt: 'Complete: "আমি ক্লান্ত ___ কাজ করব" (but I will work)', sentence: 'আমি ক্লান্ত ___ কাজ করব', roman: 'ami klanto ___ kaj korbo', english: 'I am tired but I will work', acceptable: ['কিন্তু', 'kintu'], answer: 'কিন্তু' },
      { type: 'translate-mc', prompt: 'কারণ is placed:', bengali: 'কারণ', roman: 'karon', correct: 'After the main clause to introduce reason', options: ['After the main clause to introduce reason', 'At the start of the sentence', 'Before the subject', 'After the verb always'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 29: Honorific & Register
  // ═══════════════════════════════════════
  {
    id: 'register',
    number: 29,
    title: 'Honorific & Register',
    shortDesc: 'তুই/তুমি/আপনি verb conjugation across all tenses',
    explanation: `You have learned the three levels of address (তুই, তুমি, আপনি) and the third person pair (সে, তিনি). This lesson consolidates verb conjugation across all three registers for the most common tenses.

Present: তুই করিস / তুমি করো / আপনি করেন / সে করে / তিনি করেন
Past simple: তুই করলি / তুমি করলে / আপনি করলেন / সে করল / তিনি করলেন
Future: তুই করবি / তুমি করবে / আপনি করবেন / সে করবে / তিনি করবেন
Present continuous: তুই করছিস / তুমি করছ / আপনি করছেন / সে করছে / তিনি করছেন

A key observation: আপনি and তিনি always share the same verb form (ending in -েন), even though আপনি is second person and তিনি is third person. সে and তুমি often share forms in future and continuous tenses (করবে, করছে).

Choosing the wrong register is a social error — using তুই with a stranger is rude, while using তুমি or আপনি with a close childhood friend can feel cold.`,
    examples: [
      { bengali: 'তুই কী করিস?', roman: 'tui ki koris?', english: 'What do you do? (very informal)' },
      { bengali: 'তুমি কী করো?', roman: 'tumi ki koro?', english: 'What do you do? (informal)' },
      { bengali: 'আপনি কী করেন?', roman: 'apni ki koren?', english: 'What do you do? (formal)' },
      { bengali: 'তুই কাল আসবি?', roman: 'tui kal ashbi?', english: 'Will you come tomorrow? (very informal)' },
      { bengali: 'আপনি কাল আসবেন?', roman: 'apni kal ashben?', english: 'Will you come tomorrow? (formal)' },
      { bengali: 'তিনি কী বলেছেন?', roman: 'tini ki bolechen?', english: 'What has he/she said? (respectful)' },
      { bengali: 'তুমি কী খাচ্ছ?', roman: 'tumi ki khachho?', english: 'What are you eating? (informal)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What is the present tense of করা for আপনি?', bengali: 'আপনি ___', roman: 'apni ___', correct: 'করেন (koren)', options: ['করেন (koren)', 'করো (koro)', 'করিস (koris)', 'করে (kore)'] },
      { type: 'translate-mc', prompt: 'What is the future form for তুই?', bengali: 'তুই করবি', roman: 'tui korbi', correct: 'করবি (korbi)', options: ['করবি (korbi)', 'করবে (korbe)', 'করবেন (korben)', 'করলি (korli)'] },
      { type: 'fib', prompt: 'Complete: "তুমি কাল ___?" (Will you come tomorrow? informal)', sentence: 'তুমি কাল ___?', roman: 'tumi kal ___?', english: 'Will you come tomorrow? (informal)', acceptable: ['আসবে', 'ashbe'], answer: 'আসবে' },
      { type: 'error-spot', prompt: 'Which sentence uses the correct verb for আপনি?', options: ['আপনি কী করো?', 'আপনি কী করিস?', 'আপনি কী করেন?', 'আপনি কী করে?'], correct: 'আপনি কী করেন?', explanation: 'আপনি always takes the -েন ending.' },
      { type: 'translate-mc', prompt: '"তিনি কী বলেছেন?" uses the same ending as:', bengali: 'তিনি বলেছেন', roman: 'tini bolechen', correct: 'আপনি বলেছেন (both take -েন)', options: ['আপনি বলেছেন (both take -েন)', 'তুমি বলেছ', 'সে বলেছে', 'তুই বলেছিস'] },
      { type: 'word-order', prompt: 'Arrange (formal): "What are you doing?"', words: ['করছেন?', 'কী', 'আপনি'], correct: ['আপনি', 'কী', 'করছেন?'], english: 'What are you doing? (formal)', roman: 'apni ki korchhen?' },
      { type: 'fib', prompt: 'Complete for তুই past: "তুই কাল ___" (you came yesterday, v. informal)', sentence: 'তুই কাল ___', roman: 'tui kal ___', english: 'You came yesterday (v. informal)', acceptable: ['এলি', 'eli', 'আসলি', 'ashli'], answer: 'এলি' },
      { type: 'translate-mc', prompt: 'Present continuous for তুমি (doing) is:', bengali: 'তুমি করছ', roman: 'tumi korchho', correct: 'করছ (korchho)', options: ['করছ (korchho)', 'করছে (korchhe)', 'করছিস (korchis)', 'করছেন (korchhen)'] },
    ]
  },

  // ═══════════════════════════════════════
  //  LESSON 30: Advanced Mixed Review
  // ═══════════════════════════════════════
  {
    id: 'advanced-review',
    number: 30,
    title: 'Advanced Mixed Review',
    shortDesc: 'Mixed practice from lessons 21–29',
    explanation: `This lesson brings together concepts from all the advanced lessons (21–29). Use it to test how well you can combine comparatives, particles, verbal nouns, causatives, reported speech, passives, reduplication, complex sentences, and register shifts.

A few patterns to keep in mind:

Combining comparatives with complex sentences: "যদি তুমি আরো বেশি পড়ো তাহলে সবচেয়ে ভালো ফলাফল পাবে।" = "If you study more, you will get the best results."

Combining causatives with register: "আপনি কি আমাকে একটু দেখাবেন?" = "Could you show me (formal)?"

Passive + reported speech: "সে বলল যে কাজ হয়ে গেছে।" = "He said that the work has been done."

The quiz questions below test your ability to recognize and produce these patterns in combination.`,
    examples: [
      { bengali: 'যদি আরো পড়ো তাহলে ভালো করবে', roman: 'jodi aro poro tahole bhalo korbe', english: 'If you study more, you will do well' },
      { bengali: 'সে বলল যে কাজ হয়ে গেছে', roman: 'she bollo je kaj hoye geche', english: 'He/she said that the work was done' },
      { bengali: 'আস্তে আস্তে সে ভালো হলো', roman: 'aste aste she bhalo holo', english: 'He/she got better gradually' },
      { bengali: 'আপনি কি আমাকে দেখাবেন?', roman: 'apni ki amake dekhaben?', english: 'Will you show me? (formal)' },
      { bengali: 'কাজটা করানো হয়েছে', roman: 'kajta korano hoyechhe', english: 'The task has been made to be done (causative passive)' },
      { bengali: 'পড়তে পড়তে ঘুমিয়ে পড়ল', roman: 'porte porte ghumiye porlo', english: 'Fell asleep while reading' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What does "যদি আরো পড়ো তাহলে ভালো করবে" mean?', bengali: 'যদি আরো পড়ো তাহলে ভালো করবে', roman: 'jodi aro poro tahole bhalo korbe', correct: 'If you study more, you will do well', options: ['If you study more, you will do well', 'You studied more so you did well', 'Because you study more, you do well', 'When you study more, you did well'] },
      { type: 'translate-mc', prompt: '"সে বলল যে কাজ হয়ে গেছে" — what grammar features does it use?', bengali: 'সে বলল যে কাজ হয়ে গেছে', roman: 'she bollo je kaj hoye geche', correct: 'Reported speech (যে) + passive (হয়ে)', options: ['Reported speech (যে) + passive (হয়ে)', 'Causative + comparative', 'Reduplication + conditional', 'Register shift + verbal noun'] },
      { type: 'fib', prompt: 'Complete (formal): "আপনি কি আমাকে ___?" (will you show me?)', sentence: 'আপনি কি আমাকে ___?', roman: 'apni ki amake ___?', english: 'Will you show me? (formal)', acceptable: ['দেখাবেন', 'dekhaben'], answer: 'দেখাবেন' },
      { type: 'word-order', prompt: 'Arrange: "He/she got better gradually"', words: ['ভালো', 'আস্তে', 'সে', 'আস্তে', 'হলো'], correct: ['আস্তে', 'আস্তে', 'সে', 'ভালো', 'হলো'], english: 'He/she got better gradually', roman: 'aste aste she bhalo holo' },
      { type: 'error-spot', prompt: 'Which correctly says "The task has been made to be done"?', options: ['কাজটা করানো হয়েছে', 'কাজটা হয়েছে করানো', 'করানো কাজটা হয়েছে', 'হয়েছে কাজটা করানো'], correct: 'কাজটা করানো হয়েছে', explanation: 'Causative verbal noun (করানো) + passive (হয়েছে), subject first.' },
      { type: 'translate-mc', prompt: '"পড়তে পড়তে ঘুমিয়ে পড়ল" means:', bengali: 'পড়তে পড়তে ঘুমিয়ে পড়ল', roman: 'porte porte ghumiye porlo', correct: 'Fell asleep while reading', options: ['Fell asleep while reading', 'Read and then slept', 'Read in order to sleep', 'Slept and then read'] },
      { type: 'fib', prompt: 'Complete: "যদি আরো পড়ো তাহলে ___ করবে" (you will do well)', sentence: 'যদি আরো পড়ো তাহলে ___ করবে', roman: 'jodi aro poro tahole ___ korbe', english: 'If you study more, you will do well', acceptable: ['ভালো', 'bhalo'], answer: 'ভালো' },
      { type: 'translate-mc', prompt: 'Which combination is used in "আপনি কি আমাকে দেখাবেন?"', bengali: 'আপনি কি আমাকে দেখাবেন?', roman: 'apni ki amake dekhaben?', correct: 'Causative verb (দেখানো) + formal register (আপনি)', options: ['Causative verb (দেখানো) + formal register (আপনি)', 'Passive + conditional', 'Reduplication + superlative', 'Reported speech + particle'] },
    ]
  },
  // ═══════════════════════════════════════
  {
    id: 'sandhi',
    number: 31,
    title: 'Sound Changes & Pronunciation Rules',
    shortDesc: 'How spoken Bengali differs from its written form',
    explanation: `Bengali writing and speech don't always match perfectly. Understanding these common phonological patterns will help you read naturally and understand native speakers.

**1. The inherent vowel ô (অ)**
Every Bengali consonant carries an inherent /ɔ/ vowel — so ক is "kô" and ম is "mô". However, this vowel is often reduced or silent:
• Before a conjunct consonant: শব্দ (shôbdô) → spoken "shobdo"
• At the end of a word: কাল (kāl, not "kālô"), মানুষ (manush, not "mānushô")
• Between consonants in a cluster: প্রতিদিন → "protidin" (the ô after প্র is silent)

**2. Spoken shortening of case endings (-কে → -য়)**
In informal speech, the -কে accusative/dative ending often shortens to -য়:
• আমাকে → আমায় (amake → amay — "to me / me")
• তোমাকে → তোমায় (tomake → tomay — "to you / you")
• Written forms are always correct; spoken short forms are natural but informal.

**3. Vowel blending between words**
When one word ends in a vowel and the next begins with a vowel, Bengali speakers often link or slightly reduce the boundary:
• ভালো আছেন → "bhalo achhen" — both vowels stay, but the transition is smooth
• এসো আমার সাথে → "esho amar shathe" — no elision, but rhythm is even

**4. Assimilation in conjunct consonants**
When consonants combine in a conjunct, the first consonant often adapts to match the manner of articulation of the second:
• ন before a retroflex (ট ড) → written ণ: কর্ণ (kôrNô — ear), বর্ণ (bôrNô — letter/colour)
• ম before ব/প → can nasalise: সম্পর্ক (shômpôrkô → "shomporko" — relationship)
• This is why শব্দ is "shobdo" not "shôbdô" — the ব softens the preceding vowel`,
    examples: [
      { bengali: 'কাল বৃষ্টি ছিল', roman: 'kal brishti chhilo', english: 'Yesterday it was raining (final ô on কাল is silent)' },
      { bengali: 'আমাকে / আমায়', roman: 'amake / amay', english: 'to me / for me (formal vs. informal speech)' },
      { bengali: 'প্রতিদিন সকালে উঠি', roman: 'protidin shokale uthi', english: 'I wake up every morning (প্র cluster: ô after র is silent)' },
      { bengali: 'সম্পর্ক', roman: 'shomporko', english: 'relationship (ম assimilates before প → "shom-")' },
      { bengali: 'বর্ণমালা', roman: 'bôrNômala', english: 'alphabet (ণ by assimilation from ন + ন→ণ rule)' },
      { bengali: 'তোমাকে ভালোবাসি / তোমায় ভালোবাসি', roman: 'tomake bhalobashi / tomay bhalobashi', english: 'I love you — formal / informal spoken' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'Which statement about the inherent vowel ô is correct?', bengali: 'অ (ô)', roman: 'ô', correct: 'It is often silent at word endings and before conjunct consonants', options: ['It is often silent at word endings and before conjunct consonants', 'It is always pronounced as in আ (aa)', 'It only appears in vowel letters, not consonants', 'It is the same sound as এ (e)'] },
      { type: 'translate-mc', prompt: 'What is the informal spoken equivalent of "তোমাকে"?', bengali: 'তোমাকে', roman: 'tomake', correct: 'তোমায় (tomay)', options: ['তোমায় (tomay)', 'তোমার (tomar)', 'তোমাদের (tomader)', 'তুমি (tumi)'] },
      { type: 'translate-mc', prompt: 'Why is প্রতিদিন pronounced "protidin" rather than "prôtidin"?', bengali: 'প্রতিদিন', roman: 'protidin', correct: 'The inherent ô after র in the conjunct প্র is silent', options: ['The inherent ô after র in the conjunct প্র is silent', 'প্র is a vowel, not a consonant', 'দিন causes the vowel before it to change', 'Bengali always uses "o" instead of "ô"'] },
      { type: 'translate-mc', prompt: '"সম্পর্ক" is romanized as "shomporko." Why does ম sound like "shom-" not "shôm-"?', bengali: 'সম্পর্ক', roman: 'shomporko', correct: 'Assimilation: ম before প makes the vowel round to /o/', options: ['Assimilation: ম before প makes the vowel round to /o/', 'ম is always pronounced with /o/ in Bengali', 'প changes all preceding vowels to /o/', 'It is a dialect-specific pronunciation only'] },
      { type: 'fib', prompt: 'Write the informal spoken form of আমাকে (accusative "me"):', sentence: 'আমাকে → ___', roman: 'amake → ___', english: 'Informal spoken: amay', acceptable: ['আমায়', 'amay'], answer: 'আমায়' },
      { type: 'translate-mc', prompt: 'The inherent vowel ô in বর্ণ (letter/colour) is affected by which rule?', bengali: 'বর্ণ', roman: 'bôrNô', correct: 'Assimilation: ন becomes ণ (retroflex) after র in the cluster', options: ['Assimilation: ন becomes ণ (retroflex) after র in the cluster', 'Vowel elision removes the ô completely', 'The final ô is pronounced as আ', 'র before ন always drops the ন'] },
      { type: 'translate-mc', prompt: 'Which pair correctly shows the formal (written/careful) vs. informal (spoken) contrast?', bengali: 'formal vs. informal', roman: 'formal vs. spoken', correct: 'তোমাকে (formal) / তোমায় (informal)', options: ['তোমাকে (formal) / তোমায় (informal)', 'আমার (formal) / আমায় (informal)', 'তুমি (formal) / তুই (informal)', 'বলেছেন (formal) / বলল (informal)'] },
    ]
  },

  // ═══════════════════════════════════════
  //  READING PASSAGES (Lessons 32–36)
  // ═══════════════════════════════════════
  {
    id: 'reading-1',
    number: 32,
    title: 'আমার পরিবার — My Family',
    shortDesc: '📖 Reading passage — Beginner',
    explanation: `<span class="reading-level">📖 Beginner Reading</span>
<div class="reading-bengali">আমার নাম রিয়া। আমার একটি ছোট পরিবার আছে। আমার বাবার নাম করিম এবং মায়ের নাম শিরিন। আমার একটি ভাই আছে। তার নাম রাহুল। আমরা ঢাকায় থাকি। বাবা প্রতিদিন কাজে যান। মা বাড়িতে থাকেন। রাহুল স্কুলে পড়ে।</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp1-roman')">▼ Show romanization</button>
<div class="reading-sub" id="rp1-roman">Amar nam Riya. Amar ekti choto paribār achhe. Amar babar nam Karim ebong mayer nam Shirin. Amar ekti bhai achhe. Tar nam Rahul. Amra Dhakay thaki. Baba protidin kaje jan. Ma barite thaken. Rahul shukule pore.</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp1-english')">▼ Show English translation</button>
<div class="reading-sub" id="rp1-english">My name is Riya. I have a small family. My father's name is Karim and my mother's name is Shirin. I have one brother. His name is Rahul. We live in Dhaka. Father goes to work every day. Mother stays at home. Rahul studies at school.</div>`,
    examples: [
      { bengali: 'আমার পরিবার আছে', roman: 'amar paribār achhe', english: 'I have a family (lit. my family exists)' },
      { bengali: 'বাবা কাজে যান', roman: 'baba kaje jan', english: 'Father goes to work (formal verb যান for elders)' },
      { bengali: 'মা বাড়িতে থাকেন', roman: 'ma barite thaken', english: 'Mother stays at home (থাকেন — formal/honorific)' },
      { bengali: 'রাহুল স্কুলে পড়ে', roman: 'Rahul shukule pore', english: 'Rahul studies at school (পড়ে — informal, as for peers)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'What is the name of the narrator?', bengali: 'আমার নাম ___', roman: 'amar nam ___', correct: 'রিয়া (Riya)', options: ['রিয়া (Riya)', 'করিম (Karim)', 'শিরিন (Shirin)', 'রাহুল (Rahul)'] },
      { type: 'translate-mc', prompt: 'কোথায় এই পরিবার থাকে? (Where does this family live?)', bengali: 'আমরা ___ থাকি', roman: 'amra ___ thaki', correct: 'ঢাকায় (in Dhaka)', options: ['ঢাকায় (in Dhaka)', 'চট্টগ্রামে (in Chittagong)', 'স্কুলে (at school)', 'কাজে (at work)'] },
      { type: 'translate-mc', prompt: 'Who stays at home?', bengali: '___ বাড়িতে থাকেন', roman: '___ barite thaken', correct: 'মা (Mother)', options: ['মা (Mother)', 'বাবা (Father)', 'রাহুল (Rahul)', 'রিয়া (Riya)'] },
      { type: 'translate-mc', prompt: 'Why is যান used for বাবা but পড়ে for রাহুল?', bengali: 'বাবা যান / রাহুল পড়ে', roman: 'baba jan / Rahul pore', correct: 'যান is the formal/honorific form; পড়ে is informal (for peers/juniors)', options: ['যান is the formal/honorific form; পড়ে is informal (for peers/juniors)', 'যান is future tense; পড়ে is present', 'বাবা is plural; রাহুল is singular', 'যান is passive; পড়ে is active'] },
      { type: 'fib', prompt: 'Complete: "আমার ___ নাম রাহুল।" (My brother\'s name is Rahul.)', sentence: 'আমার ___ নাম রাহুল।', roman: 'amar ___ nam Rahul.', english: 'brother\'s', acceptable: ['ভাইয়ের', 'bhai er', 'bhaier'], answer: 'ভাইয়ের' },
    ]
  },

  {
    id: 'reading-2',
    number: 33,
    title: 'আমার দিন — My Day',
    shortDesc: '📖 Reading passage — Beginner',
    explanation: `<span class="reading-level">📖 Beginner Reading</span>
<div class="reading-bengali">আমি প্রতিদিন সকাল সাতটায় উঠি। উঠে দাঁত মাজি এবং মুখ ধুই। তারপর সকালের চা খাই। আমি রুটি এবং ডিম খাই। আটটায় অফিসে যাই। অফিস বাসা থেকে দূরে। বাসে করে যাই। সন্ধ্যায় বাড়ি ফিরি। রাতে বই পড়ি এবং ঘুমাই।</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp2-roman')">▼ Show romanization</button>
<div class="reading-sub" id="rp2-roman">Ami protidin shokal shattr ay uthi. Uthe dant maji ebong mukh dhui. Tarpar shokaler cha khai. Ami ruti ebong dim khai. Attar ay office-e jai. Office basha theke dure. Bashe kore jai. Shandhyay bari phiri. Rate boi pori ebong ghumai.</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp2-english')">▼ Show English translation</button>
<div class="reading-sub" id="rp2-english">I wake up every day at 7 o'clock. After waking, I brush my teeth and wash my face. Then I drink morning tea. I eat bread and egg. At 8 o'clock I go to the office. The office is far from home. I go by bus. In the evening I return home. At night I read books and sleep.</div>`,
    examples: [
      { bengali: 'সাতটায় উঠি', roman: 'shattr ay uthi', english: 'I wake up at seven' },
      { bengali: 'বাসে করে যাই', roman: 'bashe kore jai', english: 'I go by bus (করে = instrumental particle)' },
      { bengali: 'বাসা থেকে দূরে', roman: 'basha theke dure', english: 'far from home (থেকে = from; দূরে = far/at a distance)' },
      { bengali: 'সন্ধ্যায় বাড়ি ফিরি', roman: 'shandhyay bari phiri', english: 'I return home in the evening' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'কখন লেখক উঠে? (When does the writer wake up?)', bengali: 'আমি ___ উঠি', roman: 'ami ___ uthi', correct: 'সাতটায় (at seven)', options: ['সাতটায় (at seven)', 'আটটায় (at eight)', 'সন্ধ্যায় (in the evening)', 'রাতে (at night)'] },
      { type: 'translate-mc', prompt: 'সকালে কী খান লেখক? (What does the writer eat in the morning?)', bengali: 'আমি ___ খাই', roman: 'ami ___ khai', correct: 'রুটি এবং ডিম (bread and egg)', options: ['রুটি এবং ডিম (bread and egg)', 'চা এবং বিস্কুট (tea and biscuits)', 'ভাত এবং মাছ (rice and fish)', 'ফল এবং দুধ (fruit and milk)'] },
      { type: 'translate-mc', prompt: '"বাসে করে যাই" — what does করে indicate here?', bengali: 'বাসে করে যাই', roman: 'bashe kore jai', correct: 'The means/instrument of travel (by bus)', options: ['The means/instrument of travel (by bus)', 'A causal relationship (because of the bus)', 'A causative verb (make the bus go)', 'A repeated action (go and go by bus)'] },
      { type: 'translate-mc', prompt: 'রাতে লেখক কী করে? (What does the writer do at night?)', bengali: 'রাতে আমি ___', roman: 'rate ami ___', correct: 'বই পড়ি এবং ঘুমাই (reads books and sleeps)', options: ['বই পড়ি এবং ঘুমাই (reads books and sleeps)', 'অফিসে যাই (goes to the office)', 'চা খাই (drinks tea)', 'বাসে করে যাই (goes by bus)'] },
    ]
  },

  {
    id: 'reading-3',
    number: 34,
    title: 'বাজারে — At the Market',
    shortDesc: '📖 Reading passage — Intermediate',
    explanation: `<span class="reading-level">📖 Intermediate Reading</span>
<div class="reading-bengali">গতকাল আমি বাজারে গিয়েছিলাম। বাজারে অনেক রকমের জিনিস পাওয়া যায়। আমি সবজি, মাছ এবং ফল কিনেছি। আলু এবং পেঁয়াজের দাম কম ছিল কিন্তু আমের দাম বেশি ছিল। এক কেজি আম কিনতে একশো টাকা লেগেছে। দোকানদার বললেন যে এখন আমের মৌসুম তাই দাম বেশি। আমি দর কষাকষি করে আশি টাকায় কিনলাম।</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp3-roman')">▼ Show romanization</button>
<div class="reading-sub" id="rp3-roman">Gotokal ami bajare giyechhilam. Bajare onek rokom-er jinish pawa jay. Ami shobji, mach ebong phol kinechhi. Alu ebong peyajer dam kom chhilo kintu amer dam beshi chhilo. Ek keji am kinte ekshho taka legeche. Dokāndar bollem je ekhon amer mousum tai dam beshi. Ami dor koshakoshi kore ashi takar kinlam.</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp3-english')">▼ Show English translation</button>
<div class="reading-sub" id="rp3-english">Yesterday I went to the market. Many kinds of things are found at the market. I bought vegetables, fish, and fruit. The price of potatoes and onions was low but the price of mangoes was high. It cost one hundred taka to buy one kilogram of mangoes. The shopkeeper said that it is mango season now so the price is high. I bargained and bought (them) for eighty taka.</div>`,
    examples: [
      { bengali: 'গতকাল বাজারে গিয়েছিলাম', roman: 'gotokal bajare giyechhilam', english: 'Yesterday I went to the market (past perfect tense)' },
      { bengali: 'দাম বেশি / দাম কম', roman: 'dam beshi / dam kom', english: 'price is high / price is low' },
      { bengali: 'দর কষাকষি করা', roman: 'dor koshakoshi kora', english: 'to bargain (lit. to push and pull the price)' },
      { bengali: 'দোকানদার বললেন যে…', roman: 'dokāndar bollem je…', english: 'The shopkeeper said that… (reported speech with যে)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'কোন জিনিসের দাম বেশি ছিল? (Which item had a high price?)', bengali: '___ দাম বেশি ছিল', roman: '___ dam beshi chhilo', correct: 'আম (mango)', options: ['আম (mango)', 'আলু (potato)', 'পেঁয়াজ (onion)', 'মাছ (fish)'] },
      { type: 'translate-mc', prompt: 'শেষে কত টাকায় আম কিনলাম? (At what price was the mango finally bought?)', bengali: '___ টাকায় কিনলাম', roman: '___ taka-y kinlam', correct: 'আশি টাকায় — ৮০ taka', options: ['আশি টাকায় — ৮০ taka', 'একশো টাকায় — ১০০ taka', 'পঞ্চাশ টাকায় — ৫০ taka', 'দুইশো টাকায় — ২০০ taka'] },
      { type: 'translate-mc', prompt: 'দোকানদার কেন বললেন দাম বেশি? (Why did the shopkeeper say the price is high?)', bengali: 'দোকানদার বললেন যে ___', roman: 'dokāndar bollem je ___', correct: 'এখন আমের মৌসুম (it is mango season now)', options: ['এখন আমের মৌসুম (it is mango season now)', 'আম অনেক দূর থেকে এসেছে (mangoes came from far away)', 'আজ বাজারে লোক কম (few people at market today)', 'আমের গুণ অনেক ভালো (mango quality is very good)'] },
      { type: 'translate-mc', prompt: '"গতকাল গিয়েছিলাম" uses which tense?', bengali: 'গতকাল গিয়েছিলাম', roman: 'gotokal giyechhilam', correct: 'Past perfect — action completed before the present moment', options: ['Past perfect — action completed before the present moment', 'Simple past — action that just happened', 'Continuous past — ongoing past action', 'Future perfect — action to be completed'] },
    ]
  },

  {
    id: 'reading-4',
    number: 35,
    title: 'বাংলাদেশের প্রকৃতি — Nature of Bangladesh',
    shortDesc: '📖 Reading passage — Intermediate',
    explanation: `<span class="reading-level">📖 Intermediate Reading</span>
<div class="reading-bengali">বাংলাদেশ একটি সবুজ ও সুন্দর দেশ। এই দেশে অনেক নদী আছে। পদ্মা, মেঘনা এবং যমুনা বাংলাদেশের তিনটি বড় নদী। বর্ষাকালে অনেক বৃষ্টি হয় এবং নদীতে পানি বাড়ে। শীতকালে আবহাওয়া ঠান্ডা এবং শুষ্ক থাকে। সুন্দরবন পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন। সেখানে রয়েল বেঙ্গল টাইগার এবং অনেক প্রজাতির পাখি পাওয়া যায়। বাংলাদেশের জাতীয় ফুল শাপলা এবং জাতীয় পাখি দোয়েল।</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp4-roman')">▼ Show romanization</button>
<div class="reading-sub" id="rp4-roman">Bangladesh ekti shobuj o shundor desh. Ei deshe onek nodi achhe. Padma, Meghna ebong Jamuna Bangladesh-er tinti boro nodi. Borshakale onek brishti hoy ebong nodite pani bare. Shitokale abohawa thanda ebong shushko thake. Shundarbon prithibir brihottom Mangrove bon. Shekhane Royal Bengal Tiger ebong onek projatir pakhi pawa jay. Bangladesh-er jatīyo phul shapla ebong jatīyo pakhi doyel.</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp4-english')">▼ Show English translation</button>
<div class="reading-sub" id="rp4-english">Bangladesh is a green and beautiful country. This country has many rivers. The Padma, Meghna, and Jamuna are three big rivers of Bangladesh. In the rainy season it rains a lot and the water in the rivers rises. In winter the weather stays cold and dry. The Sundarbans is the world's largest mangrove forest. There the Royal Bengal Tiger and many species of birds are found. The national flower of Bangladesh is the shapla (water lily) and the national bird is the doyel (magpie robin).</div>`,
    examples: [
      { bengali: 'বর্ষাকালে বৃষ্টি হয়', roman: 'borshakale brishti hoy', english: 'It rains in the rainy season (বর্ষাকাল = rainy season)' },
      { bengali: 'পানি বাড়ে', roman: 'pani bare', english: 'The water rises (বাড়া = to increase/rise)' },
      { bengali: 'পাওয়া যায়', roman: 'pawa jay', english: 'Are found / can be found (passive construction)' },
      { bengali: 'জাতীয় ফুল শাপলা', roman: 'jatīyo phul shapla', english: 'National flower is the shapla (জাতীয় = national)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'বাংলাদেশের তিনটি বড় নদী কোনগুলো? (What are three big rivers of Bangladesh?)', bengali: 'পদ্মা, ___ এবং যমুনা', roman: 'Padma, ___ ebong Jamuna', correct: 'মেঘনা (Meghna)', options: ['মেঘনা (Meghna)', 'তিস্তা (Teesta)', 'কর্ণফুলী (Karnaphuli)', 'সুরমা (Surma)'] },
      { type: 'translate-mc', prompt: 'সুন্দরবন কীসের জন্য বিখ্যাত? (What is the Sundarbans famous for?)', bengali: 'সুন্দরবনে ___ পাওয়া যায়', roman: 'Shundarbone ___ pawa jay', correct: 'রয়েল বেঙ্গল টাইগার (Royal Bengal Tiger)', options: ['রয়েল বেঙ্গল টাইগার (Royal Bengal Tiger)', 'শাপলা ফুল (shapla flower)', 'পদ্মা নদী (Padma River)', 'দোয়েল পাখি (doyel bird)'] },
      { type: 'translate-mc', prompt: 'What is Bangladesh\'s national bird?', bengali: 'জাতীয় পাখি ___', roman: 'jatīyo pakhi ___', correct: 'দোয়েল (doyel — magpie robin)', options: ['দোয়েল (doyel — magpie robin)', 'শাপলা (shapla — water lily)', 'বাঘ (bagh — tiger)', 'ময়ূর (moyur — peacock)'] },
      { type: 'translate-mc', prompt: '"পাওয়া যায়" is a Bengali passive construction. What does it mean literally?', bengali: 'পাওয়া যায়', roman: 'pawa jay', correct: 'Goes to be found / can be found (passive with যাওয়া)', options: ['Goes to be found / can be found (passive with যাওয়া)', 'I found it (first person past)', 'They are searching (continuous)', 'It will be found (future)'] },
    ]
  },

  {
    id: 'reading-5',
    number: 36,
    title: 'একটি চিঠি — A Letter',
    shortDesc: '📖 Reading passage — Advanced',
    explanation: `<span class="reading-level">📖 Advanced Reading</span>
<div class="reading-bengali">প্রিয় সাবিনা,

অনেকদিন তোমার সাথে কথা হয়নি। আশা করি তুমি এবং তোমার পরিবার ভালো আছ। আমি এখন ঢাকায় একটি বিশ্ববিদ্যালয়ে পড়াশোনা করছি। পড়াশোনার চাপ অনেক বেশি, তবে আমি উপভোগ করছি। এখানকার বন্ধুরা খুব ভালো এবং সহায়ক। গত সপ্তাহে আমরা সবাই মিলে বাংলাদেশের জাতীয় জাদুঘরে গিয়েছিলাম। সেটি সত্যিই অসাধারণ ছিল। তুমি কি এই মাসে ঢাকায় আসতে পারবে? আমরা একসাথে ঘুরতে যেতে পারব।

তোমার বন্ধু,
নিলুফার</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp5-roman')">▼ Show romanization</button>
<div class="reading-sub" id="rp5-roman">Priyo Sabina,

Onek din tomar shathe kotha hoyni. Asha kori tumi ebong tomar paribār bhalo achho. Ami ekhon Dhakay ekti bishwobidyalay-e porashona korchhi. Porashona-r chap onek beshi, tobe ami upovog korchhi. Ekhankār bōndhurarā khub bhalo ebong shahayok. Got shoptahe amra shobai mile Bangladesh-er jatīyo jadughor-e giyechhilam. Sheti shatyoi oshādharon chhilo. Tumi ki ei mashe Dhakay ashte parbe? Amra ekshāthe ghurte jete parbo.

Tomar bōndhu,
Nilufar</div>
<button class="reading-toggle" onclick="toggleReadingSection(this,'rp5-english')">▼ Show English translation</button>
<div class="reading-sub" id="rp5-english">Dear Sabina,

It has been a long time since we spoke. I hope you and your family are well. I am currently studying at a university in Dhaka. The study pressure is a lot, but I am enjoying it. The friends here are very good and helpful. Last week we all went together to Bangladesh's national museum. It was truly remarkable. Can you come to Dhaka this month? We can go sightseeing together.

Your friend,
Nilufar</div>`,
    examples: [
      { bengali: 'অনেকদিন কথা হয়নি', roman: 'onek din kotha hoyni', english: 'We haven\'t spoken in a long time (হওয়া + -নি = hasn\'t happened)' },
      { bengali: 'পড়াশোনার চাপ', roman: 'porashona-r chap', english: 'academic pressure (চাপ = pressure; পড়াশোনা = studying)' },
      { bengali: 'আসতে পারবে?', roman: 'ashte parbe?', english: 'Can you come? (potential form: verb root + তে + পারা)' },
      { bengali: 'একসাথে ঘুরতে যেতে পারব', roman: 'ekshāthe ghurte jete parbo', english: 'We can go sightseeing together (double infinitive + potential)' },
    ],
    quiz: [
      { type: 'translate-mc', prompt: 'Who wrote the letter?', bengali: 'তোমার বন্ধু, ___', roman: 'tomar bondhu, ___', correct: 'নিলুফার (Nilufar)', options: ['নিলুফার (Nilufar)', 'সাবিনা (Sabina)', 'রিয়া (Riya)', 'করিম (Karim)'] },
      { type: 'translate-mc', prompt: 'নিলুফার গত সপ্তাহে কোথায় গিয়েছিল? (Where did Nilufar go last week?)', bengali: 'আমরা ___ গিয়েছিলাম', roman: 'amra ___ giyechhilam', correct: 'জাতীয় জাদুঘরে (national museum)', options: ['জাতীয় জাদুঘরে (national museum)', 'সুন্দরবনে (Sundarbans)', 'বাজারে (market)', 'স্কুলে (school)'] },
      { type: 'translate-mc', prompt: '"আসতে পারবে?" — what grammar structure is this?', bengali: 'আসতে পারবে?', roman: 'ashte parbe?', correct: 'Potential future: verb infinitive (আসতে) + পারা (to be able)', options: ['Potential future: verb infinitive (আসতে) + পারা (to be able)', 'Passive construction with হওয়া', 'Causative verb form with করা', 'Conditional with যদি...তাহলে'] },
      { type: 'translate-mc', prompt: '"কথা হয়নি" — what does this construction mean?', bengali: 'কথা হয়নি', roman: 'kotha hoyni', correct: '(We) haven\'t spoken — impersonal construction using হওয়া + -নি', options: ['(We) haven\'t spoken — impersonal construction using হওয়া + -নি', 'There is no language — simple negative', 'I didn\'t say anything — first person negative', 'The words have not arrived — literal'] },
      { type: 'fib', prompt: 'Complete Nilufar\'s invitation: "আমরা একসাথে ঘুরতে ___ পারব।"', sentence: 'আমরা একসাথে ঘুরতে ___ পারব।', roman: 'amra ekshāthe ghurte ___ parbo.', english: 'We can go sightseeing together.', acceptable: ['যেতে', 'jete'], answer: 'যেতে' },
    ]
  },
];


export { GRAMMAR_LESSONS };
