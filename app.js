import { VOWELS, CONSONANTS_VELAR, CONSONANTS_PALATAL, CONSONANTS_RETROFLEX, CONSONANTS_DENTAL, CONSONANTS_LABIAL, CONSONANTS_OTHER, CONSONANTS_SPECIAL, ALL_CONSONANTS, ALL_LETTERS, BENGALI_NUMERALS, BENGALI_NUMBER_NAMES, MATRA_COMBOS, CONJUNCTS, STROKE_HINTS, MODULES, NUMBER_MODULES, READING_PASSAGES, MIXED_CURRICULUM, MIXED_WAVE_SIZE, MIXED_INTRO_BATCH, UNLOCK_THRESHOLD, MIXED_QUIZ_SIZE, PHONEME_PAIRS } from './alphabet.js';
import { generateStringPair, generateDistractors, shuffle } from './quiz-engine.js';
import { REVIEW_INTERVALS_MS, MAX_REVIEW_LETTERS, MAX_REVIEW_VOCAB, MAX_REVIEW_GRAMMAR, MAX_REVIEW_PHRASES, FSRS_AGAIN, FSRS_HARD, FSRS_GOOD, FSRS_EASY, fsrsInitS, fsrsInitD, fsrsR, fsrsSAfterRecall, fsrsSAfterForgetting, fsrsNextD, masteryFromFsrs } from './fsrs.js';
import { getLessonOfDay, passageWordCount } from './today.js';
import { escapeStr, escapeHTML, escHtml } from './ui-utils.js';
import { PHRASES_SITUATIONS, PHRASES_WAVE_ORDER, PHRASES_DATA } from './phrases.js';
import { GRAMMAR_LESSONS } from './grammar.js';
import { VOCAB_DATA, VOCAB_CATEGORIES, VOCAB_TOTAL_WORDS } from './vocab.js';
import { TRIVIA_CATEGORIES, TRIVIA_QUESTIONS } from './trivia.js';
import { RECIPES } from './recipes.js';
import { MUSIC } from './music.js';
import { MOVIES } from './movies.js';
import { POETRY } from './poetry.js';
import { SPORTS } from './sports.js';
import { PROVERBS } from './proverbs.js';
import { FOLKTALES } from './folktales.js';
import { FESTIVALS } from './festivals.js';
import { HISTORY } from './history.js';
import { TRAVEL } from './travel.js';
import { CONVERSATIONS } from './conversations.js';

// ════════════════════════════════════════
//  DISPLAY MODE — Standard / Romanized / Immersion
// ════════════════════════════════════════

const UI_STRINGS_BN = {
  // ── Navigation tabs ──
  'Today': 'আজকে',
  'Alphabet': 'বর্ণমালা',
  'Vocabulary': 'শব্দভাণ্ডার',
  'Grammar': 'ব্যাকরণ',
  'Numbers': 'সংখ্যা',
  'Phrases': 'বাক্যাংশ',
  'Trivia': 'তথ্য',
  'Recipes': 'রান্নাঘর',
  'Music': 'সঙ্গীত',
  'Movies': 'চলচ্চিত্র',
  'Poetry': 'কবিতা',
  'Sports': 'খেলাধুলা',
  'Proverbs': 'প্রবাদ',
  'Folk Tales': 'লোককথা',
  'Festivals': 'উৎসব',
  'History': 'ইতিহাস',
  'Travel': 'ভ্রমণ',
  'Conversations': 'কথোপকথন',
  // ── Tab group labels ──
  'Basics': 'মৌলিক',
  'Culture': 'সংস্কৃতি',
  'Explore': 'অন্বেষণ',
  // ── Buttons ──
  'Start Quiz →': 'কুইজ শুরু →',
  'Practice Quiz →': 'অনুশীলন কুইজ →',
  '← Back': '← পেছনে',
  '← Quit': '← বন্ধ',
  'Next →': 'পরবর্তী →',
  '← Prev': '← আগের',
  'Continue →': 'চালিয়ে যান →',
  'Check': 'যাচাই',
  'Check Order': 'ক্রম যাচাই',
  'Try Again': 'আবার চেষ্টা',
  'Retry Missed': 'ভুলগুলো আবার',
  'Home': 'হোম',
  "I don't know": 'জানি না',
  'Create Profile': 'প্রোফাইল তৈরি',
  'Start': 'শুরু',
  // ── Hero subtitles ──
  "Today's study plan": 'আজকের পড়াশোনার পরিকল্পনা',
  'Master the Bengali alphabet step by step': 'ধাপে ধাপে বাংলা বর্ণমালা শিখুন',
  'Learn 5,000+ common Bengali words': '৫,০০০+ সাধারণ বাংলা শব্দ শিখুন',
  'Master Bengali grammar in 36 lessons — including sound changes, reading passages, and Mixed Review': '৩৬টি পাঠে বাংলা ব্যাকরণ শিখুন',
  'Bengali numerals and number words': 'বাংলা সংখ্যা ও সংখ্যাবাচক শব্দ',
  'Learn conversational phrases for real-life situations': 'দৈনন্দিন পরিস্থিতির জন্য কথোপকথনের বাক্যাংশ শিখুন',
  'Test your knowledge of Bengali culture, history, and more': 'বাংলা সংস্কৃতি, ইতিহাস ইত্যাদি সম্পর্কে জ্ঞান যাচাই করুন',
  'Learn Bengali through classic recipes — read, cook, and quiz yourself': 'ঐতিহ্যবাহী রেসিপি দিয়ে বাংলা শিখুন — পড়ুন, রান্না করুন, কুইজ দিন',
  'Learn Bengali through classic songs — read lyrics, explore culture, and quiz yourself': 'ক্লাসিক গানের মাধ্যমে বাংলা শিখুন — গানের কথা পড়ুন, সংস্কৃতি জানুন, কুইজ দিন',
  'Learn Bengali through classic films — explore stories, dialogue, and quiz yourself': 'ক্লাসিক চলচ্চিত্রের মাধ্যমে বাংলা শিখুন — গল্প জানুন, সংলাপ পড়ুন, কুইজ দিন',
  'Learn Bengali through classic poems — read verses, explore poets, and quiz yourself': 'ক্লাসিক কবিতার মাধ্যমে বাংলা শিখুন — পদ্য পড়ুন, কবি জানুন, কুইজ দিন',
  'Learn Bengali through sports and athletes — explore culture, learn vocabulary, and quiz yourself': 'খেলাধুলা ও খেলোয়াড়দের মাধ্যমে বাংলা শিখুন — সংস্কৃতি জানুন, শব্দ শিখুন, কুইজ দিন',
  'Learn Bengali through proverbs and idioms — explore wisdom, learn vocabulary, and quiz yourself': 'প্রবাদ ও বাগধারার মাধ্যমে বাংলা শিখুন — জ্ঞান জানুন, শব্দ শিখুন, কুইজ দিন',
  'Learn Bengali through folk tales — explore stories, learn vocabulary, and quiz yourself': 'লোককথার মাধ্যমে বাংলা শিখুন — গল্প জানুন, শব্দ শিখুন, কুইজ দিন',
  'Learn Bengali through festivals — explore traditions, learn vocabulary, and quiz yourself': 'উৎসবের মাধ্যমে বাংলা শিখুন — ঐতিহ্য জানুন, শব্দ শিখুন, কুইজ দিন',
  'Learn Bengali through history — explore events and figures, learn vocabulary, and quiz yourself': 'ইতিহাসের মাধ্যমে বাংলা শিখুন — ঘটনা ও ব্যক্তিত্ব জানুন, শব্দ শিখুন, কুইজ দিন',
  'Learn Bengali through travel — explore destinations, learn vocabulary, and quiz yourself': 'ভ্রমণের মাধ্যমে বাংলা শিখুন — গন্তব্য জানুন, শব্দ শিখুন, কুইজ দিন',
  'Practice Bengali conversations — read dialogues, role-play, and quiz yourself': 'বাংলা কথোপকথন অনুশীলন — সংলাপ পড়ুন, ভূমিকা অভিনয় করুন, কুইজ দিন',
  'Story': 'গল্প',
  'Traditions': 'ঐতিহ্য',
  'Highlights': 'বিশেষত্ব',
  'Role-play': 'ভূমিকা অভিনয়',
  'Continue to Quiz': 'কুইজে যান',
  'See Results': 'ফলাফল দেখুন',
  'Choose your response:': 'আপনার উত্তর বেছে নিন:',
  'Take Quiz': 'কুইজ দিন',
  'Lyrics': 'গানের কথা',
  'Dialogue': 'সংলাপ',
  'Verses': 'পদ্য',
  'Key Facts': 'মূল তথ্য',
  'Ingredients': 'উপকরণ',
  'Instructions': 'প্রণালি',
  'Quiz': 'কুইজ',
  // ── Quiz prompts ──
  'What is the name of this letter?': 'এই অক্ষরের নাম কী?',
  'What sound does this letter make?': 'এই অক্ষরের উচ্চারণ কী?',
  'Type the name of this letter:': 'এই অক্ষরের নাম লিখুন:',
  'Type the romanized form of this letter:': 'এই অক্ষরের রোমানাইজড রূপ লিখুন:',
  'How do you pronounce this?': 'এটি কীভাবে উচ্চারণ করবেন?',
  'Spell this in Bengali:': 'বাংলায় বানান করুন:',
  'What does this word mean?': 'এই শব্দের অর্থ কী?',
  'Type the English meaning:': 'ইংরেজি অর্থ লিখুন:',
  'Type the Bengali word:': 'বাংলা শব্দটি লিখুন:',
  'Type the Bengali word or romanization:': 'বাংলা শব্দ বা রোমানাইজেশন লিখুন:',
  'Type the romanized Bengali:': 'রোমানাইজড বাংলা লিখুন:',
  'What does this phrase mean?': 'এই বাক্যাংশের অর্থ কী?',
  'How do you say this in Bengali?': 'বাংলায় এটি কীভাবে বলবেন?',
  'Listen and choose the correct meaning:': 'শুনুন এবং সঠিক অর্থ বেছে নিন:',
  'Type the romanization for:': 'রোমানাইজেশন লিখুন:',
  'What sound does this combination make?': 'এই সংমিশ্রণের উচ্চারণ কী?',
  'Type the romanized sound for this combination:': 'এই সংমিশ্রণের রোমানাইজড উচ্চারণ লিখুন:',
  'What is the Bengali name of this numeral?': 'এই সংখ্যার বাংলা নাম কী?',
  'What value does this numeral represent?': 'এই সংখ্যার মান কত?',
  'Type the Bengali name of this numeral:': 'এই সংখ্যার বাংলা নাম লিখুন:',
  'Type the romanized pronunciation of this numeral:': 'এই সংখ্যার রোমানাইজড উচ্চারণ লিখুন:',
  'Type the romanized pronunciation:': 'রোমানাইজড উচ্চারণ লিখুন:',
  'What does this mean in English?': 'ইংরেজিতে এর অর্থ কী?',
  'Choose the natural reply:': 'স্বাভাবিক উত্তর বেছে নিন:',
  'Type the Bengali word you hear:': 'যে বাংলা শব্দটি শুনেছেন তা লিখুন:',
  'Type the romanized form of what you hear:': 'যা শুনেছেন তার রোমানাইজড রূপ লিখুন:',
  // ── Results ──
  'Perfect! 🌟': 'নিখুঁত! 🌟',
  'Great job!': 'চমৎকার!',
  'Good effort!': 'ভালো চেষ্টা!',
  'Keep practicing!': 'অনুশীলন চালিয়ে যান!',
  // ── Rating ──
  'How difficult was this?': 'এটি কতটা কঠিন ছিল?',
  'Hard': 'কঠিন',
  'Good': 'ভালো',
  'Easy': 'সহজ',
  // ── Today screen ──
  'Due for Review': 'পুনরালোচনার জন্য প্রস্তুত',
  'New Vocabulary': 'নতুন শব্দভাণ্ডার',
  'Phrases': 'বাক্যাংশ',
  'Reading': 'পড়া',
  'Mistake Review': 'ভুল পুনরালোচনা',
  // ── Card hints ──
  'Tap card to flip': 'কার্ড উল্টাতে ট্যাপ করুন',
  'Tap card to reveal': 'প্রকাশ করতে ট্যাপ করুন',
  // ── Misc ──
  'Full Alphabet Chart': 'সম্পূর্ণ বর্ণমালা তালিকা',
  'Quiz': 'কুইজ',
  'Vocab Quiz': 'শব্দ কুইজ',
  'Grammar Quiz': 'ব্যাকরণ কুইজ',
  'Phrases Quiz': 'বাক্যাংশ কুইজ',
  'Mixed Practice': 'মিশ্র অনুশীলন',
  'New Letters': 'নতুন অক্ষর',
  'Retry Missed': 'ভুলগুলো আবার',
  'Create a profile to save your progress': 'আপনার অগ্রগতি সংরক্ষণ করতে প্রোফাইল তৈরি করুন',
  'Choose your profile': 'আপনার প্রোফাইল বেছে নিন',
  'Retake Placement': 'প্লেসমেন্ট আবার দিন',
  'Choose your profile': 'আপনার প্রোফাইল বেছে নিন',
  'Search words…': 'শব্দ খুঁজুন…',
  'Type your answer…': 'আপনার উত্তর লিখুন…',
  'Correct!': 'সঠিক!',
  'Romanized:': 'রোমানাইজড:',
  'Sound:': 'উচ্চারণ:',
  'Example:': 'উদাহরণ:',
  // ── Listening ──
  'Tap to replay': 'আবার শুনতে ট্যাপ করুন',
  // ── Nav / Stats ──
  'XP': 'এক্সপি',
  'Total XP': 'মোট এক্সপি',
  'Day Streak': 'ধারাবাহিক দিন',
  "Today's XP": 'আজকের এক্সপি',
  'day streak': 'দিনের ধারা',
  'token': 'টোকেন',
  'tokens': 'টোকেন',
  'Letters': 'অক্ষর',
  'Words': 'শব্দ',
  'Lessons': 'পাঠ',
  'Badges': 'ব্যাজ',
  'Review Due': 'পুনরালোচনা বাকি',
  'due': 'বাকি',
  'items ready for review': 'আইটেম পুনরালোচনার জন্য প্রস্তুত',
  'item ready for review': 'আইটেম পুনরালোচনার জন্য প্রস্তুত',
  'All caught up! Nothing due right now.': 'সব হয়ে গেছে! এখন কিছু বাকি নেই।',
  'Start Review →': 'পুনরালোচনা শুরু →',
  'Study These →': 'এগুলো পড়ুন →',
  'Open Lesson →': 'পাঠ খুলুন →',
  'Go to Phrases →': 'বাক্যাংশে যান →',
  'Continue Reading': 'পড়া চালিয়ে যান',
  'Review Reading': 'পড়া পুনরালোচনা',
  'Lesson of the Day': 'আজকের পাঠ',
  'Lesson': 'পাঠ',
  'new words in your queue': 'নতুন শব্দ আপনার তালিকায়',
  'new word in your queue': 'নতুন শব্দ আপনার তালিকায়',
  'No new words queued — keep practicing!': 'কোনো নতুন শব্দ নেই — অনুশীলন চালিয়ে যান!',
  'All unlocked words seen': 'সব আনলক করা শব্দ দেখা হয়েছে',
  'All lessons complete!': 'সব পাঠ সম্পন্ন!',
  'new phrases to learn': 'নতুন বাক্যাংশ শিখতে হবে',
  'new phrase to learn': 'নতুন বাক্যাংশ শিখতে হবে',
  'Keep practicing!': 'অনুশীলন চালিয়ে যান!',
  'passages completed': 'প্যাসেজ সম্পন্ন',
  'unlocked': 'আনলক',
  'Recommended': 'সুপারিশকৃত',
  'Reading Progress': 'পড়ার অগ্রগতি',
  'Short passages with vocabulary-aware filtering and quick lookup.': 'শব্দভাণ্ডার-সচেতন ফিল্টারিং এবং দ্রুত অনুসন্ধান সহ ছোট অনুচ্ছেদ।',
  'Done': 'সম্পন্ন',
  'Retake Placement': 'প্লেসমেন্ট আবার দিন',
  'Activity — Past 13 Weeks': 'কার্যকলাপ — গত ১৩ সপ্তাহ',
  'You scored': 'আপনার স্কোর',
  'New best!': 'নতুন সেরা!',
  'Best:': 'সেরা:',
  'Today': 'আজকে',
  'Tomorrow': 'আগামীকাল',
  'Next 7 days': 'পরবর্তী ৭ দিন',
  'Submit & Earn XP →': 'জমা দিন ও এক্সপি অর্জন করুন →',
  'Review →': 'পুনরালোচনা →',
  'Start Lesson →': 'পাঠ শুরু →',
};

/**
 * Display Bengali text according to current display mode.
 * In Romanized mode, returns the romanized form; otherwise returns Bengali script.
 */
function displayBengali(bengali, roman) {
  if (getDisplayMode() === 'romanized' && roman) return roman;
  return bengali;
}

/**
 * Translate an English UI string to Bengali when in Immersion mode.
 * Falls back to the original string if no translation exists.
 * Settings panel is excluded (always English).
 */
function t(str) {
  if (getDisplayMode() === 'immersion' && UI_STRINGS_BN[str]) return UI_STRINGS_BN[str];
  return str;
}

/**
 * Convert Arabic digits (0-9) to Bengali digits (০-৯) when in Immersion mode.
 * Returns a string. Passes through non-digit characters unchanged.
 */
function toBnDigits(val) {
  const s = String(val);
  if (getDisplayMode() !== 'immersion') return s;
  return s.replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d]);
}

/**
 * Apply display mode to the document: set data attributes on body,
 * process [data-t] elements for immersion, refresh active screen content.
 */
function applyDisplayMode() {
  const mode = getDisplayMode();
  document.body.dataset.displayMode = mode;
  document.body.dataset.hideEnglish = (mode === 'immersion' && getHideEnglish()) ? 'true' : 'false';

  // Process all [data-t] elements (static HTML translations)
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (mode === 'immersion' && UI_STRINGS_BN[key]) {
      el.textContent = UI_STRINGS_BN[key];
    } else {
      el.textContent = key;
    }
  });

  // Refresh whichever screen is currently active
  _refreshActiveContent();
}

function _refreshActiveContent() {
  // Re-render content in the currently visible screen
  const activeScreen = document.querySelector('.screen.active');
  if (!activeScreen) return;
  const id = activeScreen.id;
  if (id === 'home') renderHome();
  else if (id === 'vocab-home') renderVocabHome();
  else if (id === 'grammar-home') renderGrammarHome();
  else if (id === 'numbers-home') renderNumbersHome();
  else if (id === 'phrases-home') renderPhrasesHome();
  else if (id === 'trivia-home') renderTriviaHome();
  else if (id === 'recipes-home') renderRecipesHome();
  else if (id === 'today-screen') renderTodayScreen();
  else if (id === 'chart') renderChart();
  else if (id === 'learn') showCard();
  else if (id === 'vocab-learn') showVocabCardAt();
  else if (id === 'vocab-browse') renderVocabList();
  else if (id === 'grammar-lesson') renderGlCard();
  else if (id === 'phrases-situation') renderPsCard();
  else if (id === 'reading-screen') renderReadingScreen();
}

function getMixedUnlockedCount() {
  let unlocked = MIXED_WAVE_SIZE; // first wave is always available
  while (unlocked < MIXED_CURRICULUM.length) {
    // Check the most recently unlocked wave
    const waveStart = unlocked - MIXED_WAVE_SIZE;
    const wave = MIXED_CURRICULUM.slice(waveStart, unlocked);
    const familiar = wave.filter(l => getMastery(l.letter) >= UNLOCK_THRESHOLD).length;
    if (familiar >= Math.ceil(wave.length * 0.6)) {
      unlocked = Math.min(unlocked + MIXED_WAVE_SIZE, MIXED_CURRICULUM.length);
    } else {
      break;
    }
  }
  return unlocked;
}

/**
 * Build a mixed session.  Returns { teach: [...], quiz: [...] }.
 *  - teach: new (unseen) letters to introduce via flashcards first.
 *  - quiz:  a set to drill, weighted toward lower-mastery letters,
 *           mixing old and new.
 */
function buildMixedSession() {
  const unlocked = getMixedUnlockedCount();
  const pool = MIXED_CURRICULUM.slice(0, unlocked);

  // Find letters not yet seen (mastery 0)
  const unseen = pool.filter(l => getMastery(l.letter) === 0);
  // Pick a small batch to teach
  const teach = unseen.slice(0, MIXED_INTRO_BATCH);

  // For the quiz, rank all unlocked letters by priority:
  //   mastery 1 (just seen)  → highest priority
  //   mastery 2 (learning)   → medium
  //   mastery 0 (about-to-be-taught) → medium-high (they'll see flashcards first)
  //   mastery 3 (mastered)   → lowest, but still include some for maintenance
  const prioritized = [...pool].sort((a, b) => {
    const ma = getMastery(a.letter), mb = getMastery(b.letter);
    // Score: lower = quiz sooner.  Mastered letters get a random
    // bump so they still appear occasionally.
    const sa = ma === 3 ? 3 + Math.random() * 2 : ma === 0 ? 0.5 : ma === 1 ? 0 : 1;
    const sb = mb === 3 ? 3 + Math.random() * 2 : mb === 0 ? 0.5 : mb === 1 ? 0 : 1;
    return sa - sb;
  });

  const quiz = prioritized.slice(0, Math.min(MIXED_QUIZ_SIZE, pool.length));
  return { teach, quiz, unlocked, total: MIXED_CURRICULUM.length };
}

let mixedSession = null;

function startMixedPractice() {
  mixedSession = buildMixedSession();

  if (mixedSession.teach.length > 0) {
    // Show flashcards for new letters first, then auto-start quiz
    currentModule = {
      id: 'mixed',
      title: t('New Letters'),
      letters: mixedSession.teach,
      isMixed: true,
    };
    currentCardIndex = 0;
    document.getElementById('learn-title').textContent = t('New Letters');
    document.getElementById('quiz-start-btn').textContent = t('Practice Quiz →');
    document.getElementById('quiz-start-btn').onclick = () => launchMixedQuiz();
    showCard();
    showScreen('learn');
  } else {
    // Nothing new to teach — go straight to quiz
    launchMixedQuiz();
  }
}

function launchMixedQuiz() {
  if (!mixedSession) mixedSession = buildMixedSession();
  currentModule = {
    id: 'mixed',
    title: 'Mixed Practice',
    letters: mixedSession.quiz,
    isMixed: true,
  };
  quizModuleRef = currentModule;
  generateQuiz(currentModule.letters);
  quizIndex = 0;
  quizCorrect = 0;
  _quizStartTime = Date.now();
  document.getElementById('quiz-title').textContent = t('Mixed Practice');
  showScreen('quiz');
  renderQuestion();
  updateStreak();
}

function var_vowel(){ return 'var(--vowel)'; }
function var_consonant(){ return 'var(--consonant)'; }
function var_special(){ return 'var(--special)'; }

// ════════════════════════════════════════
//  PROGRESS / STATE
// ════════════════════════════════════════
const DEFAULT_PROGRESS_SETTINGS = Object.freeze({ fibMode: 'latin', listeningMode: 'text', palette: 'sundarbans', displayMode: 'standard', hideEnglish: false });

function _defaultProgressSettings() {
  return { ...DEFAULT_PROGRESS_SETTINGS };
}

function _newProgressState() {
  return {
    mastery: {},
    xp: 0,
    streak: 0,
    lastDate: null,
    freezeTokens: 0,
    lastFreezeUsedDate: null,
    quizHistory: {},
    reading: { completed: {}, best: {}, unlocked: 1 },
    writing: { mastery: {}, completed: {} },
    settings: _defaultProgressSettings(),
  };
}

function _normalizeProgressState(data) {
  if (!data || typeof data !== 'object') return _newProgressState();
  if (!data.mastery || typeof data.mastery !== 'object') data.mastery = {};
  if (!data.quizHistory || typeof data.quizHistory !== 'object') data.quizHistory = {};
  if (typeof data.xp !== 'number') data.xp = 0;
  if (typeof data.streak !== 'number') data.streak = 0;
  if (typeof data.freezeTokens !== 'number') data.freezeTokens = 0;
  if (typeof data.lastFreezeUsedDate !== 'string') data.lastFreezeUsedDate = null;
  if (typeof data.lastDate !== 'string') data.lastDate = null;
  if (!data.reading || typeof data.reading !== 'object') data.reading = { completed: {}, best: {}, unlocked: 1 };
  if (!data.reading.completed || typeof data.reading.completed !== 'object') data.reading.completed = {};
  if (!data.reading.best || typeof data.reading.best !== 'object') data.reading.best = {};
  if (typeof data.reading.unlocked !== 'number') data.reading.unlocked = 1;
  if (!data.writing || typeof data.writing !== 'object') data.writing = { mastery: {}, completed: {} };
  if (!data.writing.mastery || typeof data.writing.mastery !== 'object') data.writing.mastery = {};
  if (!data.writing.completed || typeof data.writing.completed !== 'object') data.writing.completed = {};
  if (!data.settings || typeof data.settings !== 'object') data.settings = _defaultProgressSettings();
  return data;
}

let progress = _newProgressState();
let _saveTimer = null;
let currentUser = null;
let _persistenceWarningState = { quota: false, security: false, generic: false };

// ── localStorage helpers ──
const LS_PREFIX = 'bengali_progress_';

function _lsKey(name) {
  return LS_PREFIX + name;
}

function _loadProgressLS(name) {
  let data = null;
  let hadStoredData = false;
  try {
    const raw = localStorage.getItem(_lsKey(name));
    if (raw) {
      data = JSON.parse(raw);
      hadStoredData = true;
    }
  } catch(e) {}

  data = _normalizeProgressState(data);

  const defaults = _defaultProgressSettings();
  let mutated = false;
  if (!data.settings || typeof data.settings !== 'object') {
    data.settings = {};
    mutated = true;
  }

  // Per-profile one-time migration from legacy global keys.
  if (!data.settings.fibMode) {
    data.settings.fibMode = localStorage.getItem('bengali_fib_mode') || defaults.fibMode;
    mutated = true;
  }
  if (!data.settings.listeningMode) {
    data.settings.listeningMode = localStorage.getItem('bengali_listening_mode') || defaults.listeningMode;
    mutated = true;
  }
  if (!data.settings.palette) {
    data.settings.palette = localStorage.getItem('bengali_palette') || defaults.palette;
    mutated = true;
  }
  if (!data.settings.displayMode) {
    data.settings.displayMode = defaults.displayMode;
    mutated = true;
  }
  if (typeof data.settings.hideEnglish !== 'boolean') {
    data.settings.hideEnglish = defaults.hideEnglish;
    mutated = true;
  }

  if (mutated && hadStoredData) _saveProgressLS(name, data);
  return data;
}


function _saveProgressLS(name, data) {
  try {
    localStorage.setItem(_lsKey(name), JSON.stringify(data));
    _persistenceWarningState = { quota: false, security: false, generic: false };
    if (document.body) delete document.body.dataset.persistenceUnavailable;
    return true;
  } catch (e) {
    const isDomErr = e instanceof DOMException;
    const isQuotaError = isDomErr && (
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      e.code === 22 ||
      e.code === 1014
    );
    const isSecurityError = isDomErr && e.name === 'SecurityError';

    if (document.body) document.body.dataset.persistenceUnavailable = 'true';

    if (isQuotaError) {
      console.warn('Progress could not be saved: storage quota exceeded.', e);
      if (!_persistenceWarningState.quota) {
        _persistenceWarningState.quota = true;
        showAlert('Progress could not be saved because browser storage is full. You can clear site storage or export your progress data to avoid losing updates.');
      }
    } else if (isSecurityError) {
      console.warn('Progress could not be saved: storage is unavailable in this context.', e);
      if (!_persistenceWarningState.security) {
        _persistenceWarningState.security = true;
        showAlert('Progress persistence is unavailable in this browsing mode (for example private mode or restricted storage settings). You can keep practicing, but progress may not be saved after you close this session.');
      }
    } else {
      console.warn('Progress could not be saved due to an unexpected storage error.', e);
      if (!_persistenceWarningState.generic) {
        _persistenceWarningState.generic = true;
        showAlert('Progress could not be saved due to a storage error. You can continue practicing in this session, but persistence may be unavailable.');
      }
    }

    return false;
  }
}

function _deleteProgressLS(name) {
  localStorage.removeItem(_lsKey(name));
}

function _listUsers() {
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(LS_PREFIX)) {
      const name = key.slice(LS_PREFIX.length);
      try {
        const data = JSON.parse(localStorage.getItem(key));
        users.push({ name, xp: data.xp || 0, streak: data.streak || 0 });
      } catch(e) {
        users.push({ name, xp: 0, streak: 0 });
      }
    }
  }
  return users.sort((a, b) => a.name.localeCompare(b.name));
}

function loadProgress() {
  return _loadProgressLS(currentUser);
}

function saveProgress() {
  // Debounce writes — flush at most every 500ms
  if (_saveTimer) clearTimeout(_saveTimer);
  _saveTimer = setTimeout(_flushSave, 500);
}

function _flushSave() {
  _saveTimer = null;
  if (currentUser) _saveProgressLS(currentUser, progress);
}

function getMastery(letter) {
  return progress.mastery[letter] || 0; // 0=unseen, 1=seen, 2=learning, 3=mastered
}

function getModuleProgress(mod) {
  if (mod.isChart) return null;
  let total = mod.letters.length;
  let mastered = mod.letters.filter(l => getMastery(l.letter) >= 3).length;
  let seen = mod.letters.filter(l => getMastery(l.letter) >= 1).length;
  return { total, mastered, seen, pct: Math.round((mastered / total) * 100) };
}

function getWritingMastery(letter) {
  return (progress.writing && progress.writing.mastery && progress.writing.mastery[letter]) || 0;
}

function getWritingModuleProgress(mod) {
  const total = mod.letters.length;
  const completed = mod.letters.filter(l => !!(progress.writing && progress.writing.completed && progress.writing.completed[l.letter])).length;
  const mastered = mod.letters.filter(l => getWritingMastery(l.letter) >= 3).length;
  return { total, completed, mastered, pct: Math.round((completed / total) * 100) };
}

function markWritingComplete(letter) {
  if (!progress.writing) progress.writing = { mastery: {}, completed: {} };
  if (!progress.writing.mastery) progress.writing.mastery = {};
  if (!progress.writing.completed) progress.writing.completed = {};
  const prev = progress.writing.mastery[letter] || 0;
  const next = Math.min(3, prev + 1);
  progress.writing.mastery[letter] = next;
  if (next >= 2) progress.writing.completed[letter] = true;
  if (prev === 0) addXP(3); // optional XP bonus for first trace
  saveProgress();
  return next;
}

function _localToday() { return new Date().toLocaleDateString('en-CA'); }

function updateStreak() {
  const today = _localToday();
  if (progress.lastDate === today) return;

  const prevStreak = progress.streak || 0;

  if (progress.lastDate) {
    const last = new Date(progress.lastDate);
    const now = new Date(today);
    const diff = Math.round((now - last) / (1000 * 60 * 60 * 24));

    if (diff <= 1) {
      progress.streak = prevStreak + 1;
    } else if (diff === 2 && (progress.freezeTokens || 0) > 0) {
      progress.freezeTokens -= 1;
      progress.lastFreezeUsedDate = today;
      showToast('🧊 Streak freeze used — streak preserved!');
      progress.streak = prevStreak;
    } else {
      progress.streak = 1;
    }
  } else {
    progress.streak = 1;
  }

  if (progress.streak > 0 && progress.streak % 7 === 0 && progress.streak > prevStreak) {
    progress.freezeTokens = (progress.freezeTokens || 0) + 1;
    showToast('🧊 +1 streak freeze token for reaching ' + progress.streak + ' days!');
  }

  progress.lastDate = today;
  saveProgress();
}

function addXP(amount) {
  progress.xp += amount;
  // Track daily XP for activity heatmap
  const today = _localToday();
  if (!progress.practiceLog) progress.practiceLog = {};
  progress.practiceLog[today] = (progress.practiceLog[today] || 0) + amount;
  saveProgress();
  updateNav();
}

function updateNav() {
  document.getElementById('streak-count').textContent = toBnDigits(progress.streak);
  document.getElementById('xp-count').textContent = toBnDigits(progress.xp);
  // streak bar: fills based on days toward 7-day streak
  const pct = Math.min(100, (progress.streak / 7) * 100);
  document.getElementById('streak-bar-fill').style.width = pct + '%';
  updateProfileMenuHeader();
  updateReviewDueBadge();
}

// ════════════════════════════════════════
//  MODAL DIALOG (replaces native alert/confirm)
// ════════════════════════════════════════
function _showModal(msg, buttons) {
  return new Promise(resolve => {
    const overlay = document.getElementById('app-modal');
    const msgEl = document.getElementById('app-modal-msg');
    const btnsEl = document.getElementById('app-modal-btns');
    if (!overlay) { resolve(buttons[0].value); return; }
    msgEl.textContent = msg;
    btnsEl.innerHTML = '';
    const close = (val) => {
      overlay.style.display = 'none';
      document.removeEventListener('keydown', escHandler);
      resolve(val);
    };
    const escHandler = (e) => { if (e.key === 'Escape') close(false); };
    buttons.forEach(b => {
      const btn = document.createElement('button');
      btn.className = 'app-modal-btn ' + b.cls;
      btn.textContent = b.label;
      btn.onclick = () => close(b.value);
      btnsEl.appendChild(btn);
    });
    document.addEventListener('keydown', escHandler);
    overlay.style.display = 'flex';
    btnsEl.lastChild.focus();
  });
}
function showAlert(msg) {
  return _showModal(msg, [{ label: 'OK', cls: 'app-modal-btn-ok', value: true }]);
}
function showConfirm(msg) {
  return _showModal(msg, [
    { label: 'Cancel', cls: 'app-modal-btn-cancel', value: false },
    { label: 'OK', cls: 'app-modal-btn-ok', value: true }
  ]);
}
function showPrompt(msg, placeholder) {
  return new Promise(resolve => {
    const overlay = document.getElementById('app-modal');
    const msgEl = document.getElementById('app-modal-msg');
    const btnsEl = document.getElementById('app-modal-btns');
    if (!overlay) { resolve(null); return; }
    msgEl.textContent = msg;
    btnsEl.innerHTML = '';
    const inp = document.createElement('input');
    inp.type = 'password';
    inp.placeholder = placeholder || '';
    inp.className = 'profile-input';
    inp.style.cssText = 'display:block;width:100%;margin-bottom:10px;box-sizing:border-box';
    msgEl.after(inp);
    const close = (val) => {
      overlay.style.display = 'none';
      inp.remove();
      document.removeEventListener('keydown', escHandler);
      resolve(val);
    };
    const escHandler = (e) => { if (e.key === 'Escape') close(null); };
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'app-modal-btn app-modal-btn-cancel';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => close(null);
    const okBtn = document.createElement('button');
    okBtn.className = 'app-modal-btn app-modal-btn-ok';
    okBtn.textContent = 'OK';
    okBtn.onclick = () => close(inp.value);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') close(inp.value); });
    btnsEl.appendChild(cancelBtn);
    btnsEl.appendChild(okBtn);
    document.addEventListener('keydown', escHandler);
    overlay.style.display = 'flex';
    setTimeout(() => inp.focus(), 50);
  });
}

// ════════════════════════════════════════
//  PROFILE PASSWORDS (casual lock)
// ════════════════════════════════════════
function _pwKey(name) { return 'bengali_pw_' + name; }
function _profileHasPw(name) { return !!localStorage.getItem(_pwKey(name)); }
function _checkPw(name, input) { return localStorage.getItem(_pwKey(name)) === btoa(input); }
function _setPw(name, pw) { localStorage.setItem(_pwKey(name), btoa(pw)); }
function _removePw(name) { localStorage.removeItem(_pwKey(name)); }

// ════════════════════════════════════════
//  SCREEN MANAGEMENT
// ════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  if (id === 'home') renderHome();
  if (id === 'chart') renderChart();
  if (id === 'numbers-home') renderNumbersHome();
  if (id === 'vocab-home') renderVocabHome();
  if (id === 'listening-home') renderListeningHome();
  if (id === 'grammar-home') renderGrammarHome();
  if (id === 'phrases-home') renderPhrasesHome();
  if (id === 'reading-screen') renderReadingScreen();
  if (id === 'today-screen') renderTodayScreen();
  if (id === 'trivia-home') renderTriviaHome();
  if (id === 'recipes-home') renderRecipesHome();
  if (id === 'music-home') renderMusicHome();
  if (id === 'movies-home') renderMoviesHome();
  if (id === 'poetry-home') renderPoetryHome();
  if (id === 'sports-home') renderSportsHome();
  if (id === 'proverbs-home') renderProverbsHome();
  if (id === 'folktales-home') renderFolktalesHome();
  if (id === 'festivals-home') renderFestivalsHome();
  if (id === 'history-home') renderHistoryHome();
  if (id === 'travel-home') renderTravelHome();
  if (id === 'conv-home') renderConvHome();
  if (id === 'placement-results') renderPlacementResultsUI();
}

function renderListeningHome() {
  const host = document.getElementById('listening-vocab-categories');
  if (!host) return;

  const cats = Object.keys(VOCAB_CATEGORIES)
    .map(catId => ({ catId, count: VOCAB_DATA.filter(w => w.category === catId).length }))
    .filter(({ count }) => count > 0);

  host.innerHTML = cats.map(({ catId, count }) => {
    const cat = VOCAB_CATEGORIES[catId];
    return `<button class="chip" data-action="start-vocab-listening" data-catid="${catId}">${cat.icon} ${cat.title} (${count})</button>`;
  }).join('');
}

function _isTypingTarget(el) {
  if (!el) return false;
  const tag = (el.tagName || '').toLowerCase();
  if (['input', 'textarea', 'select'].includes(tag)) return true;
  return !!el.isContentEditable;
}

// ════════════════════════════════════════
//  HOME
// ════════════════════════════════════════
function renderHome() {
  const grid = document.getElementById('module-grid');
  grid.innerHTML = '';
  // Placement test card
  // Remove stale PT card first, then re-add if needed
  const oldPt = grid.parentElement.querySelector('.pt-cta-card');
  if (oldPt) oldPt.remove();
  if (shouldShowPlacementCard()) {
    const ptCard = document.createElement('div');
    ptCard.className = 'pt-cta-card';
    ptCard.innerHTML = '<h3>🎯 Take the Placement Test</h3><p>Already know some Bengali? Skip ahead based on your level.</p>';
    ptCard.onclick = () => startPlacementTest();
    grid.parentElement.insertBefore(ptCard, grid);
  }
  MODULES.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card';

    let progressHTML;
    if (mod.isMixed) {
      const unlocked = getMixedUnlockedCount();
      const total = MIXED_CURRICULUM.length;
      const mastered = MIXED_CURRICULUM.filter(l => getMastery(l.letter) >= 3).length;
      const pct = Math.round((mastered / total) * 100);
      const wave = Math.ceil(unlocked / MIXED_WAVE_SIZE);
      const totalWaves = Math.ceil(total / MIXED_WAVE_SIZE);
      progressHTML = `<div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:${mod.color()}"></div></div>
        <div class="progress-label">${mastered}/${total} mastered · Wave ${wave}/${totalWaves} unlocked</div>`;
    } else if (mod.isWriting) {
      const prog = getWritingModuleProgress(mod);
      progressHTML = `<div class="module-progress"><div class="module-progress-fill" style="width:${prog.pct}%;background:${mod.color()}"></div></div>
        <div class="progress-label">${prog.completed}/${prog.total} completed · ${prog.mastered} mastered</div>`;
    } else {
      const prog = getModuleProgress(mod);
      progressHTML = prog ?
        `<div class="module-progress"><div class="module-progress-fill" style="width:${prog.pct}%;background:${mod.color()}"></div></div>
         <div class="progress-label">${prog.mastered}/${prog.total} mastered</div>` :
        `<div class="progress-label">Reference</div>`;
    }

    card.innerHTML = `
      <div class="module-icon">${mod.icon}</div>
      <h3>${mod.title}</h3>
      <p>${mod.desc}</p>
      ${progressHTML}
    `;
    card.onclick = () => {
      if (mod.isChart) {
        showScreen('chart');
      } else if (mod.isMixed) {
        startMixedPractice();
      } else if (mod.isWriting) {
        startWritingPractice(mod);
      } else {
        startLearn(mod);
      }
    };
    grid.appendChild(card);
  });

  // Listening Practice card (appended after module cards)
  const listenCard = document.createElement('div');
  listenCard.className = 'module-card';
  listenCard.innerHTML = `
    <div class="module-icon">🎧</div>
    <h3>Listening Practice</h3>
    <p>Train your ear — identify letters and words by sound alone.</p>
    <div class="progress-label">Audio-only mode</div>
  `;
  listenCard.onclick = () => showScreen('listening-home');
  grid.appendChild(listenCard);
}

// ════════════════════════════════════════
//  NUMBERS HOME
// ════════════════════════════════════════
function renderNumbersHome() {
  const grid = document.getElementById('numbers-module-grid');
  if (!grid) return;
  grid.innerHTML = '';
  NUMBER_MODULES.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card';
    let progressHTML = '';
    if (!mod.isArithmetic) {
      const prog = getModuleProgress(mod);
      progressHTML = `
        <div class="module-progress"><div class="module-progress-fill" style="width:${prog.pct}%;background:${mod.color()}"></div></div>
        <div class="progress-label">${prog.mastered}/${prog.total} mastered</div>`;
    }
    card.innerHTML = `
      <div class="module-icon">${mod.icon}</div>
      <h3>${mod.title}</h3>
      <p>${mod.desc}</p>
      ${progressHTML}
    `;
    card.onclick = () => mod.isArithmetic ? startArithmeticQuiz(mod.quizMode) : startLearn(mod);
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════
//  ARITHMETIC QUIZ (Numbers tab)
// ════════════════════════════════════════
let _arithmeticQuestions = [];
let _arithmeticIndex = 0;
let _arithmeticCorrect = 0;
let _arithmeticAnswered = false;

function _bn2ar(s) {
  return parseInt(String(s).replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d)), 10);
}

function _arTobn(n) {
  return String(n).split('').map(d => '০১২৩৪৫৬৭৮৯'[parseInt(d)] || d).join('');
}

function _normalizeToArabicDigits(s) {
  return String(s || '').trim().replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d));
}

function _numberNameByValue(v) {
  return BENGALI_NUMBER_NAMES.find(n => parseInt(String(n.ipa).replace(/,/g, ''), 10) === v)?.letter || _arTobn(v);
}

function _sampleNumberValues(limit = 20) {
  const vals = [];
  for (let i = 0; i <= limit; i++) vals.push(i);
  return vals;
}

function _randomDistractors(correctVal, count, values) {
  return values
    .filter(v => v !== correctVal)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function startArithmeticQuiz(mode = 'arithmetic') {
  _arithmeticQuestions = _buildArithmeticQuestions(15, mode);
  _arithmeticIndex = 0;
  _arithmeticCorrect = 0;
  _arithmeticAnswered = false;
  _moduleHomeScreen = 'numbers-home';
  showScreen('quiz');
  const titles = {
    arithmetic: 'Number Recognition',
    'audio-counting': 'Counting by Ear',
    'calendar-dates': 'Dates & Calendar',
  };
  document.getElementById('quiz-title').textContent = titles[mode] || 'Number Recognition';
  renderArithmeticQuestion();
}

function _buildArithmeticQuestions(n, mode = 'arithmetic') {
  if (mode === 'audio-counting') return _buildAudioCountingQuestions(n);
  if (mode === 'calendar-dates') return _buildCalendarDateQuestions(n);

  const values = _sampleNumberValues(20);
  const qs = [];
  for (let i = 0; i < n; i++) {
    const val = values[Math.floor(Math.random() * values.length)];
    const distractors = _randomDistractors(val, 3, values);
    const type = Math.random() < 0.55 ? 'glyph-to-name' : 'name-to-glyph';

    if (type === 'glyph-to-name') {
      const options = [val, ...distractors]
        .map(v => _numberNameByValue(v))
        .sort(() => Math.random() - 0.5);
      qs.push({
        prompt: 'এই বাংলা সংখ্যাটির নাম কোনটি?',
        display: _arTobn(val),
        correct: _numberNameByValue(val),
        options,
        type: 'arith-mc',
        _val: val,
      });
    } else {
      const options = [val, ...distractors]
        .map(v => _arTobn(v))
        .sort(() => Math.random() - 0.5);
      qs.push({
        prompt: 'শব্দটি দেখে বাংলা অঙ্ক বেছে নাও',
        display: _numberNameByValue(val),
        correct: _arTobn(val),
        options,
        type: 'arith-mc',
        _val: val,
      });
    }

    if (Math.random() < 0.2) {
      qs.push({
        prompt: 'বাংলা অঙ্কে লিখো:',
        display: _numberNameByValue(val),
        correct: _arTobn(val),
        answer: _arTobn(val),
        type: 'arith-fib',
        _val: val,
      });
    }
  }
  return qs.slice(0, n);
}

function _buildAudioCountingQuestions(n) {
  const values = _sampleNumberValues(20);
  const qs = [];
  for (let i = 0; i < n; i++) {
    const val = values[Math.floor(Math.random() * values.length)];
    const distractors = _randomDistractors(val, 3, values);
    const pickNumeral = Math.random() < 0.5;
    const options = [val, ...distractors]
      .map(v => pickNumeral ? _arTobn(v) : _numberNameByValue(v))
      .sort(() => Math.random() - 0.5);

    qs.push({
      prompt: pickNumeral ? 'শুনে সঠিক বাংলা অঙ্ক বেছে নাও' : 'শুনে সঠিক বাংলা সংখ্যার নাম বেছে নাও',
      display: '🔊',
      audio: _numberNameByValue(val),
      correct: pickNumeral ? _arTobn(val) : _numberNameByValue(val),
      options,
      type: 'arith-mc',
      _val: val,
    });
  }
  return qs;
}

function _buildCalendarDateQuestions(n) {
  const months = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const qs = [];
  for (let i = 0; i < n; i++) {
    const day = 1 + Math.floor(Math.random() * 30);
    const month = Math.floor(Math.random() * 12);
    const year = 1952 + Math.floor(Math.random() * 75);
    const dateBn = `${_arTobn(day)} ${months[month]} ${_arTobn(year)}`;
    const typePick = Math.random();

    if (typePick < 0.34) {
      const dayVals = [day, ..._randomDistractors(day, 3, _sampleNumberValues(31))].sort(() => Math.random() - 0.5);
      qs.push({ prompt: `তারিখটি পড়ো: ${dateBn} — দিন কত?`, display: dateBn, correct: _arTobn(day), options: dayVals.map(v => _arTobn(v)), type: 'arith-mc', _val: day });
    } else if (typePick < 0.67) {
      const monthOptions = [months[month], ...months.filter((_, idx) => idx !== month).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
      qs.push({ prompt: `তারিখটি পড়ো: ${dateBn} — মাস কোনটি?`, display: dateBn, correct: months[month], options: monthOptions, type: 'arith-mc', _val: month + 1 });
    } else {
      qs.push({ prompt: `তারিখটি পড়ো: ${dateBn} — বছরটি বাংলা অঙ্কে লিখো`, display: dateBn, correct: _arTobn(year), answer: _arTobn(year), type: 'arith-fib', _val: year });
    }
  }
  return qs;
}

function renderArithmeticQuestion() {
  if (_arithmeticIndex >= _arithmeticQuestions.length) {
    showArithmeticResults(); return;
  }
  _arithmeticAnswered = false;
  const q = _arithmeticQuestions[_arithmeticIndex];
  document.getElementById('quiz-score').textContent = _arithmeticCorrect + ' / ' + _arithmeticIndex;
  const fill = (_arithmeticIndex / _arithmeticQuestions.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = fill + '%';
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn';
  document.getElementById('quiz-rating-area').classList.remove('show');
  _pendingRating = null;

  const qa = document.getElementById('quiz-question-area');
  const audioHtml = q.audio
    ? `<div class="listening-play-wrap" style="margin-top:8px"><button class="listening-play-btn" data-action="speak" data-text="${escapeStr(q.audio)}" aria-label="Play number">▶</button><div style="font-size:0.8rem;color:var(--muted);margin-top:4px">শুনতে ট্যাপ করো</div></div>`
    : '';
  qa.innerHTML = `<div class="quiz-prompt">${escHtml(q.prompt)}</div><div class="quiz-letter">${escHtml(q.display)}</div>${audioHtml}`;
  if (q.audio) setTimeout(() => speakBengali(q.audio, 0.75), 250);
  const aa = document.getElementById('quiz-answer-area');
  if (q.type === 'arith-fib') {
    aa.innerHTML = `<div class="fib-area"><input type="text" class="fib-input" id="arith-input" placeholder="বাংলা অঙ্কে লিখো…" style="width:180px;text-align:center"><button class="btn-primary fib-submit" data-action="answer-arith-fib">Check</button></div>`;
    setTimeout(() => document.getElementById('arith-input')?.focus(), 100);
  } else {
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) => `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-arith-mc">${escHtml(opt)}<span class="mc-key-hint">[${i+1}]</span></button>`).join('') + '</div>';
    attachQuizKeyHandler('quiz');
  }
}

function answerArithMC(btn, chosen) {
  if (_arithmeticAnswered) return;
  _arithmeticAnswered = true;
  const q = _arithmeticQuestions[_arithmeticIndex];
  const correct = chosen === q.correct;
  document.querySelectorAll('#quiz-answer-area .mc-btn').forEach(b => { b.classList.add('disabled'); if (b.dataset.answer === q.correct) b.classList.add('reveal-correct'); });
  btn.classList.add(correct ? 'correct' : 'wrong');
  const fb = document.getElementById('quiz-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.textContent = correct ? '✓ Correct!' : '✗ Correct: ' + q.correct;
  if (correct) { _arithmeticCorrect++; addXP(10); setTimeout(() => { const nb = document.getElementById('quiz-next-btn'); if (nb && nb.classList.contains('show')) nb.click(); }, 700); }
  document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn show';
}

function answerArithFIB() {
  if (_arithmeticAnswered) return;
  const input = document.getElementById('arith-input');
  if (!input || !input.value.trim()) return;
  _arithmeticAnswered = true;
  const q = _arithmeticQuestions[_arithmeticIndex];
  const userVal = _normalizeToArabicDigits(input.value);
  const answerVal = _normalizeToArabicDigits(q.answer || q.correct);
  const correct = userVal === answerVal;
  input.classList.add(correct ? 'correct' : 'wrong');
  const fb = document.getElementById('quiz-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.textContent = correct ? '✓ Correct!' : '✗ Correct: ' + q.correct;
  if (correct) { _arithmeticCorrect++; addXP(15); }
  document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn show';
}

function nextArithmeticQuestion() {
  _arithmeticIndex++;
  renderArithmeticQuestion();
}

function showArithmeticResults() {
  const total = _arithmeticQuestions.length;
  const pct = total ? Math.round((_arithmeticCorrect / total) * 100) : 0;
  showScreen('results');
  document.getElementById('results-title').textContent = pct >= 80 ? 'Great job!' : pct >= 50 ? 'Good effort!' : 'Keep practicing!';
  document.getElementById('results-sub').textContent = 'You scored ' + _arithmeticCorrect + '/' + total;
  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    document.getElementById('results-ring').style.strokeDashoffset = offset;
    document.getElementById('results-pct').textContent = pct + '%';
  }, 100);
}

// ════════════════════════════════════════
//  LEARN (FLASHCARDS)
// ════════════════════════════════════════
let currentModule = null;
let currentCardIndex = 0;
let _moduleHomeScreen = 'home'; // tracks which home to return to from learn/quiz/results
function goModuleHome() { showScreen(_moduleHomeScreen); }

function startWritingPractice(mod) {
  startLearn(mod);
  const qbtn = document.getElementById('quiz-start-btn');
  qbtn.textContent = 'Open Tracing Canvas ✏️';
  qbtn.onclick = () => openCanvas();
}

function startLearn(mod) {
  currentModule = mod;
  currentCardIndex = 0;
  document.getElementById('learn-title').textContent = mod.title;
  // Reset quiz button to default behaviour (may have been overridden by mixed mode)
  const qbtn = document.getElementById('quiz-start-btn');
  qbtn.textContent = 'Start Quiz →';
  qbtn.onclick = () => startQuiz();
  showCard();
  showScreen('learn');
}

// ── Audio ──────────────────────────────────────────────────────────────────
let _audioSlowMode = false;

let _preferredVoiceName = localStorage.getItem('preferredVoice') || '';

function speakBengali(text, rate) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'bn-BD';
  utt.rate = rate !== undefined ? rate : (_audioSlowMode ? 0.5 : 0.85);
  if (_preferredVoiceName) {
    const voice = speechSynthesis.getVoices().find(v => v.name === _preferredVoiceName);
    if (voice) utt.voice = voice;
  }
  speechSynthesis.speak(utt);
}

function setPreferredVoice(name) {
  _preferredVoiceName = name;
  localStorage.setItem('preferredVoice', name);
}

function renderVoiceSelector() {
  const sel = document.getElementById('voice-select');
  if (!sel || !window.speechSynthesis) return;
  const populate = () => {
    const voices = speechSynthesis.getVoices();
    const bn = voices.filter(v => v.lang.startsWith('bn'));
    const list = bn.length ? bn : voices; // fall back to all voices
    sel.innerHTML = '<option value="">System default (Bengali)</option>' +
      list.map(v => `<option value="${v.name.replace(/"/g, '&quot;')}"${v.name === _preferredVoiceName ? ' selected' : ''}>${v.name} (${v.lang})</option>`).join('');
  };
  populate();
  // Chrome loads voices asynchronously
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populate;
  }
}

function toggleSlowAudio(btn) {
  _audioSlowMode = !_audioSlowMode;
  document.querySelectorAll('.slow-audio-btn').forEach(b => {
    b.classList.toggle('active', _audioSlowMode);
    b.title = _audioSlowMode ? 'Slow mode on — click to restore normal speed' : 'Play at half speed';
  });
  const statusEl = document.getElementById('slow-audio-status');
  if (statusEl) statusEl.textContent = _audioSlowMode ? 'On' : 'Off';
  const settingsBtn = document.getElementById('settings-slow-audio-btn');
  if (settingsBtn) settingsBtn.classList.toggle('active', _audioSlowMode);
}

function speakCurrentLetter() {
  const card = currentModule && currentModule.letters && currentModule.letters[currentCardIndex];
  if (card) speakBengali(card.letter);
}

// ════════════════════════════════════════
//  CANVAS WRITING PRACTICE
// ════════════════════════════════════════
let _canvasDrawing = false, _canvasLastX = 0, _canvasLastY = 0;
let _canvasKeyHandler = null;
let _canvasUserStrokes = [];
let _canvasCurrentStroke = null;

function _drawCanvasBg(ctx, canvas, letter) {
  ctx.save();
  ctx.font = '280px "Noto Sans Bengali", serif';
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
  ctx.restore();
}


function _redrawCanvas() {
  const canvas = document.getElementById('tracing-canvas');
  const ctx = canvas.getContext('2d');
  const letter = document.getElementById('canvas-char-label').textContent;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  _drawCanvasBg(ctx, canvas, letter);


  // Draw user captured strokes.
  ctx.strokeStyle = 'var(--accent)';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  _canvasUserStrokes.forEach(path => {
    if (!path.length) return;
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1]);
    ctx.stroke();
  });
}


function openCanvas() {
  const card = currentModule && currentModule.letters && currentModule.letters[currentCardIndex];
  if (!card) return;
  const letter = card.letter;
  document.getElementById('canvas-char-label').textContent = letter;
  const overlay = document.getElementById('canvas-overlay');
  overlay.style.display = 'flex';
  const canvas = document.getElementById('tracing-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  _canvasUserStrokes = [];
  _canvasCurrentStroke = null;
  _redrawCanvas();
  _setupCanvasListeners(canvas);


  const status = document.getElementById('canvas-writing-status');
  if (status) {
    status.textContent = `Writing mastery: ${getWritingMastery(letter)}/3`;
  }
}

function closeCanvas() {
  document.getElementById('canvas-overlay').style.display = 'none';
  if (_canvasKeyHandler) {
    document.removeEventListener('keydown', _canvasKeyHandler);
    _canvasKeyHandler = null;
  }
}

function clearCanvas() {
  const canvas = document.getElementById('tracing-canvas');
  _canvasUserStrokes = [];
  _canvasCurrentStroke = null;
  _redrawCanvas();
}

function completeCanvasLetter() {
  const letter = document.getElementById('canvas-char-label').textContent;
  if (!letter) return;
  const level = markWritingComplete(letter);
  const status = document.getElementById('canvas-writing-status');
  if (status) status.textContent = `Writing mastery: ${level}/3`;
  showToast(level >= 3 ? '🌟 Writing mastery reached!' : '✅ Letter marked as traced');
}

function _setupCanvasListeners(canvas) {
  // Replace canvas node to drop any previous listeners; preserve ID
  const fresh = canvas.cloneNode(true);
  fresh.id = 'tracing-canvas';
  canvas.parentNode.replaceChild(fresh, canvas);
  const c = fresh;
  const ctx = c.getContext('2d');

  // Re-draw canvas state after clone (clone doesn't copy canvas pixels)
  _redrawCanvas();

  const getPos = (e) => {
    const r = c.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return [(t.clientX - r.left) * (c.width / r.width),
            (t.clientY - r.top) * (c.height / r.height)];
  };
  const start = (e) => {
    e.preventDefault();
    _canvasDrawing = true;
    [_canvasLastX, _canvasLastY] = getPos(e);
    _canvasCurrentStroke = [[_canvasLastX, _canvasLastY]];
    _canvasUserStrokes.push(_canvasCurrentStroke);
  };
  const draw = (e) => {
    if (!_canvasDrawing) return;
    e.preventDefault();
    const [x, y] = getPos(e);
    ctx.beginPath();
    ctx.moveTo(_canvasLastX, _canvasLastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'var(--accent)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    if (_canvasCurrentStroke) _canvasCurrentStroke.push([x, y]);
    [_canvasLastX, _canvasLastY] = [x, y];
  };
  const stop = () => {
    _canvasDrawing = false;
    _canvasCurrentStroke = null;
  };

  c.addEventListener('mousedown', start);
  c.addEventListener('mousemove', draw);
  c.addEventListener('mouseup', stop);
  c.addEventListener('mouseleave', stop);
  c.addEventListener('touchstart', start, { passive: false });
  c.addEventListener('touchmove', draw, { passive: false });
  c.addEventListener('touchend', stop);

  // Keyboard shortcuts
  if (_canvasKeyHandler) document.removeEventListener('keydown', _canvasKeyHandler);
  _canvasKeyHandler = (e) => {
    if (e.key === 'c' || e.key === 'C' || e.key === 'Delete' || e.key === 'Backspace') {
      clearCanvas();
    } else if (e.key === 'Escape') {
      closeCanvas();
    }
  };
  document.addEventListener('keydown', _canvasKeyHandler);
}

function speakCurrentVocab() {
  const entry = typeof vlWords !== 'undefined' && vlWords[vlIndex];
  if (entry) speakBengali(entry[0]);
}

// Extract the Bengali-script portion of a vocab example string.
// Examples are formatted as "Bengali text। (roman — english)"
// Returns everything before the first " (" delimiter, or the full string.
function _exampleBengali(exampleStr) {
  if (!exampleStr) return '';
  const cut = exampleStr.indexOf(' (');
  return cut > 0 ? exampleStr.slice(0, cut).trim() : exampleStr.trim();
}

// Speak the example sentence for the currently open word modal.
function speakVocabExample() {
  const exEl = document.getElementById('wm-example');
  if (exEl && exEl.textContent) speakBengali(_exampleBengali(exEl.textContent));
}

// Speak the example sentence for the currently shown vocab flashcard.
function speakCurrentVocabExample() {
  const entry = typeof vlWords !== 'undefined' && vlWords[vlIndex];
  if (entry && entry[5]) speakBengali(_exampleBengali(entry[5]));
}

function showCard() {
  const card = currentModule.letters[currentCardIndex];
  const fc = document.getElementById('flashcard');
  fc.classList.remove('flipped');

  document.getElementById('card-letter').textContent = displayBengali(card.letter, card.romanized);
  const badge = document.getElementById('card-badge');
  badge.textContent = card.type.toUpperCase();
  badge.className = 'letter-type-badge badge-' + card.type;

  document.getElementById('card-name').textContent = card.name;
  document.getElementById('card-translit').textContent = t('Romanized:') + ' ' + card.romanized;
  document.getElementById('card-sound').textContent = t('Sound:') + ' ' + card.ipa + ' — ' + card.sound;
  document.getElementById('card-example').textContent = t('Example:') + ' ' + card.example;

  document.getElementById('card-counter').textContent =
    (currentCardIndex + 1) + ' / ' + currentModule.letters.length;

  document.getElementById('prev-btn').style.visibility = currentCardIndex === 0 ? 'hidden' : 'visible';

  // Mark as seen
  if (getMastery(card.letter) === 0) {
    progress.mastery[card.letter] = 1;
    saveProgress();
  }
}

function flipCard() {
  document.getElementById('flashcard').classList.toggle('flipped');
}

let _learnKeyHandlerAttached = false;
function attachLearnKeyHandler() {
  if (_learnKeyHandlerAttached) return;
  document.addEventListener('keydown', function(e) {
    if (_isTypingTarget(document.activeElement)) return;
    const learnScreen = document.getElementById('learn');
    if (!learnScreen || !learnScreen.classList.contains('active')) return;
    if (e.key === ' ') {
      e.preventDefault();
      flipCard();
    }
  });
  _learnKeyHandlerAttached = true;
}

function nextCard() {
  if (currentCardIndex < currentModule.letters.length - 1) {
    currentCardIndex++;
    showCard();
  }
}

function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    showCard();
  }
}

// ════════════════════════════════════════
//  QUIZ
// ════════════════════════════════════════
let quizQuestions = [];
let quizIndex = 0;
let quizCorrect = 0;
let quizAnswered = false;
let quizModuleRef = null;
let quizMissed = [];
let _quizStartTime = 0;

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

// Format elapsed milliseconds as "Xm Ys" or "Xs"
function _formatElapsed(ms) {
  const s = Math.round(ms / 1000);
  if (s < 60) return s + 's';
  return Math.floor(s / 60) + 'm ' + (s % 60) + 's';
}

function startQuiz() {
  quizModuleRef = currentModule;
  generateQuiz(currentModule.letters);
  quizIndex = 0;
  quizCorrect = 0;
  quizMissed = [];
  _quizStartTime = Date.now();
  document.getElementById('quiz-title').textContent = currentModule.title + ' ' + t('Quiz');
  showScreen('quiz');
  renderQuestion();
  updateStreak();
}

function renderQuestion() {
  if (quizIndex >= quizQuestions.length) {
    showResults();
    return;
  }
  quizAnswered = false;
  const q = quizQuestions[quizIndex];

  // Update progress bar & score
  document.getElementById('quiz-progress-fill').style.width =
    ((quizIndex / quizQuestions.length) * 100) + '%';
  document.getElementById('quiz-score').textContent =
    quizCorrect + ' / ' + quizIndex;

  // Render question area
  const qa = document.getElementById('quiz-question-area');
  if (q.type === 'listening-mc' || q.type === 'listening-fib') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="listening-controls">
        <button class="listening-play-btn" data-action="speak" data-text="${escapeStr(q.audio)}" aria-label="Play sound">▶</button>
        <button class="slow-audio-btn${_audioSlowMode ? ' active' : ''}" data-action="toggle-slow-audio" title="${_audioSlowMode ? 'Slow mode on — click to restore normal speed' : 'Play at half speed'}" aria-label="Toggle slow audio">🐢</button>
      </div>
      <div style="font-size:0.8rem;color:var(--muted);margin-top:4px">${t('Tap to replay')}</div>
    `;
    setTimeout(() => speakBengali(q.audio), 300);
  } else if (q.type === 'spell') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="quiz-letter-roman">${q.display}</div>
    `;
  } else {
    const showLetter = q.displayLetter !== undefined && q.displayLetter !== null ? q.displayLetter : q.letter;
    const speakLetter = q.letterObj ? q.letterObj.letter : q.letter;
    const displayLetter = q.letterObj ? displayBengali(showLetter, q.letterObj.romanized) : showLetter;
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="quiz-letter">${displayLetter}</div>
      <button class="card-sound-btn" data-action="speak" data-text="${escapeStr(speakLetter)}" aria-label="Play pronunciation">🔊</button>
    `;
  }

  // Render answer area
  const aa = document.getElementById('quiz-answer-area');
  const fb = document.getElementById('quiz-feedback');
  fb.className = 'quiz-feedback';
  fb.textContent = '';
  document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn';
  document.getElementById('quiz-rating-area').classList.remove('show');
  _pendingRating = null;

  if (q.type === 'mc' || q.type === 'listening-mc') {
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-idx="${i}" data-answer="${escapeStr(opt)}" data-action="answer-mc">${opt}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-quiz">${t("I don't know")}</button>`;
    attachQuizKeyHandler('quiz');
  } else if (q.type === 'spell') {
    spellTileOrder = [];
    aa.innerHTML = `<div class="word-order-area">
      <div class="answer-area-wo" id="spell-answer-area"></div>
      <div class="word-tiles" id="spell-tile-bank">
        ${q.tiles.map((tile, i) => `<div class="word-tile" data-idx="${i}" data-word="${tile}" data-action="select-spell">${tile}</div>`).join('')}
      </div>
      <button class="btn-primary wo-check-btn" data-action="answer-spell">${t('Check')}</button>
    </div>
    <button class="idk-btn" data-action="dont-know-quiz">${t("I don't know")}</button>`;
  } else {
    const hintHtml = q.hint
      ? `<button class="hint-btn" data-action="show-hint">💡 Hint</button><div class="fib-hint" style="display:none">${q.hint}</div>`
      : '';
    const kbdHtml = getFibMode() !== 'latin'
      ? `<button class="bng-kbd-toggle" data-action="show-kbd" data-input="fib-input">বাং ▲</button>` : '';
    aa.innerHTML = `<div class="fib-area">
      <input type="text" class="fib-input" id="fib-input" placeholder="${t('Type your answer…')}"
        autocomplete="off" autocapitalize="off">
      <button class="btn-primary fib-submit" data-action="answer-fib">${t('Check')}</button>
      ${hintHtml}${kbdHtml}
    </div>
    <button class="idk-btn" data-action="dont-know-quiz">${t("I don't know")}</button>`;
    setTimeout(() => document.getElementById('fib-input')?.focus(), 100);
  }
}

function answerMC(btn, chosen) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  const correct = chosen === q.correct;
  document.querySelectorAll('#quiz-answer-area .mc-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
  });
  if (correct) {
    btn.classList.add('correct');
    quizCorrect++;
    addXP(10);
    showFeedback(true, q.fullAnswer || q.correct);
    showRatingButtons(q.letter, 'quiz-rating-area', 'quiz-next-btn');
  } else {
    btn.classList.add('wrong');
    showFeedback(false, q.fullAnswer || q.correct);
    _recordMiss(quizMissed, q);
    _trackMistake(q.letter, 'alphabet');
    applyFsrsRating(q.letter, FSRS_AGAIN);
    _trackLastSeen(q.letter);
    saveProgress();
    checkAchievements();
    document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

let spellTileOrder = [];

function selectSpellTile(tile) {
  if (quizAnswered) return;
  tile.classList.add('used');
  spellTileOrder.push(tile.dataset.word);
  const ansArea = document.getElementById('spell-answer-area');
  const placed = document.createElement('div');
  placed.className = 'word-tile';
  placed.textContent = tile.dataset.word;
  placed.dataset.srcIdx = tile.dataset.idx;
  placed.onclick = function() { removeSpellTile(this); };
  ansArea.appendChild(placed);
}

function removeSpellTile(placed) {
  if (quizAnswered) return;
  const srcIdx = placed.dataset.srcIdx;
  const tiles = document.querySelectorAll('#spell-tile-bank .word-tile');
  tiles.forEach(t => { if (t.dataset.idx === srcIdx) t.classList.remove('used'); });
  placed.remove();
  spellTileOrder = [];
  document.querySelectorAll('#spell-answer-area .word-tile').forEach(t => {
    spellTileOrder.push(t.textContent);
  });
}

function answerSpell() {
  if (quizAnswered) return;
  if (spellTileOrder.length === 0) return;
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  const userAnswer = spellTileOrder.join('');
  const correct = userAnswer === q.correct;
  const ansArea = document.getElementById('spell-answer-area');
  ansArea.classList.add(correct ? 'correct-wo' : 'wrong-wo');
  document.querySelectorAll('#spell-tile-bank .word-tile').forEach(t => t.style.pointerEvents = 'none');
  document.querySelectorAll('#spell-answer-area .word-tile').forEach(t => t.style.pointerEvents = 'none');
  if (correct) {
    quizCorrect++;
    addXP(15);
    showFeedback(true, q.correct);
    showRatingButtons(q.letters.map(l => l.letter), 'quiz-rating-area', 'quiz-next-btn');
  } else {
    showFeedback(false, q.correct);
    _showInlineAnswer('quiz-answer-area', q.correct);
    _recordMiss(quizMissed, q);
    _trackMistake(q.letter || (q.letters && q.letters[0] && q.letters[0].letter) || '', 'alphabet');
    q.letters.forEach(l => { applyFsrsRating(l.letter, FSRS_AGAIN); _trackLastSeen(l.letter); });
    saveProgress();
    checkAchievements();
    document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function answerFIB() {
  if (quizAnswered) return;
  const input = document.getElementById('fib-input');
  if (!input) return;
  const val = input.value.trim().toLowerCase();
  if (!val) return;
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  const normVal = _normRoman(val);
  const correct = q.acceptable.some(a => a === val || _normRoman(a) === normVal);
  if (correct) {
    input.classList.add('correct');
    quizCorrect++;
    addXP(15); // FIB worth more XP
    showFeedback(true, q.answer);
    const fibKeys = q.letters ? q.letters.map(l => l.letter) : [q.letter];
    showRatingButtons(fibKeys, 'quiz-rating-area', 'quiz-next-btn');
  } else {
    input.classList.add('wrong');
    showFeedback(false, q.answer);
    _showInlineAnswer('quiz-answer-area', q.answer);
    _recordMiss(quizMissed, q);
    _trackMistake(q.letter || (q.letters && q.letters[0] && q.letters[0].letter) || '', 'alphabet');
    if (q.letters) {
      q.letters.forEach(l => { applyFsrsRating(l.letter, FSRS_AGAIN); _trackLastSeen(l.letter); });
    } else {
      applyFsrsRating(q.letter, FSRS_AGAIN);
      _trackLastSeen(q.letter);
    }
    saveProgress();
    checkAchievements();
    document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function reportProblem(quizType) {
  let q, userAnswer;
  if (quizType === 'alphabet') {
    q = quizQuestions[quizIndex];
    const inp = document.getElementById('fib-input');
    userAnswer = inp ? inp.value : '';
  } else if (quizType === 'vocab') {
    q = vqQuestions[vqIndex];
    const inp = document.getElementById('vq-fib-input');
    userAnswer = inp ? inp.value : '';
  } else if (quizType === 'phrases') {
    q = phqQuestions[phqIndex];
    const inp = document.getElementById('phq-fib-input');
    userAnswer = inp ? inp.value : '';
  } else {
    q = gqQuestions[gqIndex];
    const inp = document.getElementById('gq-fib-input');
    userAnswer = inp ? inp.value : '';
  }
  if (!q) return;
  const report = {
    quizType,
    prompt: q.prompt || '',
    bengali: q.letter || q.bengali || '',
    correctAnswer: q.fullAnswer || q.answer || q.correct || '',
    userAnswer,
    timestamp: new Date().toISOString()
  };
  const feedbackIds = { alphabet: 'quiz-feedback', vocab: 'vq-feedback', grammar: 'gq-feedback', phrases: 'phq-feedback' };
  const fbId = feedbackIds[quizType];
  navigator.clipboard.writeText(JSON.stringify(report, null, 2)).then(() => {
    const btn = fbId && document.querySelector('#' + fbId + ' .report-problem-btn');
    if (btn) { btn.textContent = '✓ Copied'; setTimeout(() => { btn.textContent = '⚑ Report'; }, 2000); }
  }).catch(() => showAlert('Could not copy to clipboard.'));
}

function showFeedback(correct, answer) {
  const fb = document.getElementById('quiz-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.innerHTML = (correct ? '✓ Correct! ' + escHtml(answer) : '✗ The answer is: ' + escHtml(answer)) +
    ' <button class="report-problem-btn active-quiz-alphabet" data-action="report-problem" data-kind="alphabet" title="Report a problem with this card">⚑ Report</button>';
}

function _recordMiss(arr, q) {
  const bengali = q.letter || q.bengali || null;
  const ans = q.fullAnswer || q.answer || (Array.isArray(q.correct) ? q.correct.join(' ') : q.correct);
  arr.push({ bengali, answer: ans, _q: q });
}

const MAX_RECENT_MISTAKES = 100;
const MISTAKE_REVIEW_WINDOW = 100;

function _trackMistake(key, type) {
  if (!progress.recentMistakes) progress.recentMistakes = [];
  progress.recentMistakes.push({ key, type, ts: Date.now() });
  if (progress.recentMistakes.length > MAX_RECENT_MISTAKES)
    progress.recentMistakes.splice(0, progress.recentMistakes.length - MAX_RECENT_MISTAKES);
}

// Normalize Bengali romanization diacritics so US keyboard users can omit them.
// Applied to BOTH sides of the comparison, so only the correct plain-ASCII
// equivalent of the expected answer is accepted — not arbitrary wrong letters.
function _normRoman(s) {
  return s.toLowerCase()
    // Diacritic normalizations (long vowels, retroflex consonants, etc.)
    .replace(/[āĀ]/g, 'a')
    .replace(/[ēĒ]/g, 'e')
    .replace(/[īĪ]/g, 'i')
    .replace(/[ōŌ]/g, 'o')
    .replace(/[ūŪ]/g, 'u')
    .replace(/[ṭṬ]/g, 't')
    .replace(/[ḍḌ]/g, 'd')
    .replace(/[ṇṆ]/g, 'n')
    .replace(/[śŚ]/g, 'sh')
    .replace(/[ṣṢ]/g, 'sh')
    .replace(/[ṛṚ]/g, 'r')
    .replace(/ñ/g, 'ny')
    .replace(/ô/g, 'o');
}

function showHint(btn) {
  btn.style.display = 'none';
  const hint = btn.nextElementSibling;
  if (hint && hint.classList.contains('fib-hint')) hint.style.display = '';
}

function _showInlineAnswer(areaId, answer) {
  const aa = document.getElementById(areaId);
  if (!aa || !answer) return;
  const div = document.createElement('div');
  div.className = 'correct-reveal';
  div.textContent = answer;
  aa.appendChild(div);
}

// ────────────────────────────────────────
//  FSRS rating UI helpers
// ────────────────────────────────────────
let _pendingRating = null;
// { keys: string[], ratingAreaId, nextBtnId, extraKeys: [] }
// keys: one or more FSRS keys to apply the rating to (multi-letter for spell questions)
// extraKeys: additional _trackLastSeen keys (e.g. lesson-level key for grammar)

function showRatingButtons(keys, ratingAreaId, nextBtnId, extraKeys) {
  const keyArr = Array.isArray(keys) ? keys : [keys];
  _pendingRating = { keys: keyArr, ratingAreaId, nextBtnId, extraKeys: extraKeys || [] };
  // Preview intervals using the first (or only) key's FSRS state
  const previewKey = keyArr[0];
  const area = document.getElementById(ratingAreaId);
  if (!area) return;
  [FSRS_HARD, FSRS_GOOD, FSRS_EASY].forEach((rating, i) => {
    const days = fsrsPreviewInterval(previewKey, rating);
    const spans = area.querySelectorAll('.rating-interval');
    if (spans[i]) spans[i].textContent = days === 1 ? '1d' : days + 'd';
  });
  area.classList.add('show');
  // Next button stays hidden until rated
  document.getElementById(nextBtnId).className = 'btn-primary quiz-next-btn';
}

function hideRatingButtons() {
  if (!_pendingRating) return;
  const area = document.getElementById(_pendingRating.ratingAreaId);
  if (area) area.classList.remove('show');
}

function onRatingSelected(rating) {
  if (!_pendingRating) return;
  const { keys, nextBtnId, extraKeys } = _pendingRating;
  keys.forEach(key => {
    applyFsrsRating(key, rating);
    _trackLastSeen(key);
  });
  extraKeys.forEach(k => _trackLastSeen(k));
  hideRatingButtons();
  _pendingRating = null;
  saveProgress();
  checkAchievements();
  document.getElementById(nextBtnId).className = 'btn-primary quiz-next-btn show';
}

function dontKnowQuiz() {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  if (q.type === 'mc' || q.type === 'listening-mc') {
    document.querySelectorAll('#quiz-answer-area .mc-btn').forEach(b => {
      b.classList.add('disabled');
      if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
    });
    showFeedback(false, q.fullAnswer || q.correct);
  } else if (q.type === 'spell') {
    document.querySelectorAll('#spell-tile-bank .word-tile').forEach(t => t.style.pointerEvents = 'none');
    document.querySelectorAll('#spell-answer-area .word-tile').forEach(t => t.style.pointerEvents = 'none');
    showFeedback(false, q.correct);
    _showInlineAnswer('quiz-answer-area', q.correct);
  } else {
    const input = document.getElementById('fib-input');
    if (input) { input.disabled = true; input.classList.add('wrong'); }
    showFeedback(false, q.answer);
    _showInlineAnswer('quiz-answer-area', q.answer);
  }
  _recordMiss(quizMissed, q);
  _trackMistake(q.letter || (q.letters && q.letters[0] && q.letters[0].letter) || '', 'alphabet');
  if (q.letters) {
    q.letters.forEach(l => { applyFsrsRating(l.letter, FSRS_AGAIN); _trackLastSeen(l.letter); });
  } else {
    applyFsrsRating(q.letter, FSRS_AGAIN);
    _trackLastSeen(q.letter);
  }
  saveProgress();
  checkAchievements();
  document.getElementById('quiz-next-btn').className = 'btn-primary quiz-next-btn show';
}

function nextQuestion() {
  quizIndex++;
  renderQuestion();
}

// ════════════════════════════════════════
//  RESULTS
// ════════════════════════════════════════
function showResults() {
  showScreen('results');
  const total = quizQuestions.length;
  const pct = Math.round((quizCorrect / total) * 100);

  // Animate circle
  setTimeout(() => {
    const circumference = 2 * Math.PI * 72;
    const offset = circumference * (1 - pct / 100);
    document.getElementById('results-ring').style.strokeDashoffset = offset;
  }, 100);
  document.getElementById('results-pct').textContent = pct + '%';

  const titles = pct === 100 ? t('Perfect! 🌟') : pct >= 80 ? t('Great job!') : pct >= 50 ? t('Good effort!') : t('Keep practicing!');
  document.getElementById('results-title').textContent = titles;
  const qid = quizModuleRef ? quizModuleRef.id : 'quiz';
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[qid] || { best: -1 };
  if (pct > prev.best) { hist[qid] = { best: pct }; saveProgress(); }
  const subParts = [`${t('You scored')} ${toBnDigits(quizCorrect)}/${toBnDigits(total)}`];
  if (_quizStartTime) subParts.push('⏱ ' + _formatElapsed(Date.now() - _quizStartTime));
  if (pct > prev.best && prev.best >= 0) subParts.push(`🌟 ${t('New best!')}`);
  else if (prev.best >= 0 && prev.best > pct) subParts.push(`${t('Best:')} ${toBnDigits(prev.best)}%`);
  if (progress.streak > 1) subParts.push(`🔥 ${toBnDigits(progress.streak)} ${t('day streak')}`);
  document.getElementById('results-sub').textContent = subParts.join(' · ');

  addXP(5);
  detachQuizKeyHandler();
  updateNav();
  checkAchievements();
  _renderMissedSection(quizMissed, 'results-missed', 'results-retry-missed');
  const contBtn = document.getElementById('results-continue-review');
  if (contBtn) contBtn.style.display = _reviewQueue.length > 0 ? 'inline-block' : 'none';
}

function retryQuiz() {
  if (quizModuleRef && quizModuleRef.isMixed) {
    // Rebuild mixed session with updated mastery data
    startMixedPractice();
  } else if (quizModuleRef) {
    currentModule = quizModuleRef;
    startQuiz();
  }
}

function retryMissedQuiz() {
  if (!quizMissed || quizMissed.length === 0) return;
  const seen = new Set();
  const letterObjs = [];
  quizMissed.forEach(m => {
    const obj = m._q && m._q.letterObj;
    if (obj && !seen.has(obj.letter)) {
      seen.add(obj.letter);
      letterObjs.push(obj);
    }
  });
  if (letterObjs.length === 0) return;
  const mod = { id: 'retry-missed', title: 'Retry Missed', letters: letterObjs, isMixed: false };
  currentModule = mod;
  quizModuleRef = mod;
  generateQuiz(letterObjs);
  quizIndex = 0; quizCorrect = 0; quizMissed = [];
  document.getElementById('quiz-title').textContent = t('Retry Missed');
  showScreen('quiz');
  renderQuestion();
}

// ════════════════════════════════════════
//  ALPHABET CHART
// ════════════════════════════════════════
function renderChart() {
  const content = document.getElementById('chart-content');
  const sections = [
    { title: 'স্বরবর্ণ — Vowels', letters: VOWELS, type: 'vowel' },
    { title: 'ক-বর্গ — Velar', letters: CONSONANTS_VELAR, type: 'consonant' },
    { title: 'চ-বর্গ — Palatal', letters: CONSONANTS_PALATAL, type: 'consonant' },
    { title: 'ট-বর্গ — Retroflex', letters: CONSONANTS_RETROFLEX, type: 'consonant' },
    { title: 'ত-বর্গ — Dental', letters: CONSONANTS_DENTAL, type: 'consonant' },
    { title: 'প-বর্গ — Labial', letters: CONSONANTS_LABIAL, type: 'consonant' },
    { title: 'অন্যান্য — Other', letters: CONSONANTS_OTHER, type: 'consonant' },
    { title: 'বিশেষ — Special', letters: CONSONANTS_SPECIAL, type: 'consonant' },
  ];

  content.innerHTML = sections.map(sec => `
    <div class="chart-section">
      <h3>${sec.title}</h3>
      <div class="chart-grid">
        ${sec.letters.map(l => {
          const m = getMastery(l.letter);
          return `<div class="chart-cell" data-action="show-chart-detail" data-letter="${l.letter}"
            data-name="${l.name}" data-romanized="${l.romanized}" data-ipa="${l.ipa}"
            data-sound="${l.sound}" data-example="${l.example}">
            <div class="mastery-dot mastery-${m}"></div>
            <div class="chart-letter">${displayBengali(l.letter, l.romanized)}</div>
            <div class="chart-romanized">${l.romanized.split('/')[0].trim()}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function showChartDetail(el) {
  const d = el.dataset;
  // Toggle detail popup
  const existing = el.querySelector('.chart-detail');
  if (existing) { existing.remove(); return; }
  // Remove any other open details
  document.querySelectorAll('.chart-detail').forEach(e => e.remove());
  const detail = document.createElement('div');
  detail.className = 'chart-detail';
  detail.style.cssText = `position:absolute;left:50%;top:100%;transform:translateX(-50%);
    background:var(--card);border-radius:10px;padding:12px;z-index:10;min-width:200px;
    box-shadow:0 8px 32px rgba(0,0,0,0.5);margin-top:8px;font-size:0.8rem;text-align:left;`;
  const safeL = (d.letter || '').replace(/'/g, "\\'");
  detail.innerHTML = `
    <div style="font-size:1rem;font-weight:600;margin-bottom:4px;">${d.name}</div>
    <div style="color:var(--text-dim)">Romanized: ${d.romanized}</div>
    <div style="color:var(--gold)">Sound: ${d.ipa} — ${d.sound}</div>
    <div style="color:var(--text-dim);margin-top:4px">${d.example}</div>
    <button class="chart-practice-btn" data-action="navigate-letter" data-letter="${safeL}">Practice →</button>
  `;
  el.style.position = 'relative';
  el.appendChild(detail);
  // Close on outside click
  setTimeout(() => {
    const handler = (e) => {
      if (!el.contains(e.target)) { detail.remove(); document.removeEventListener('click', handler); }
    };
    document.addEventListener('click', handler);
  }, 10);
}

// ════════════════════════════════════════
//  TAB SWITCHING
// ════════════════════════════════════════
let currentTab = 'alphabet';
const alphabetScreens = ['home','learn','quiz','results','chart'];
const vocabScreens = ['vocab-home','vocab-browse','vocab-learn','vocab-quiz','vocab-results'];
const grammarScreens = ['grammar-home','grammar-lesson','grammar-quiz','grammar-results'];
const phrasesScreens = ['phrases-home','phrases-situation','phrases-quiz','phrases-results'];
const readingScreens = ['reading-screen'];
const recipesScreens = ['recipes-home','recipe-detail','recipe-quiz','recipe-results'];
const musicScreens = ['music-home','music-detail','music-quiz','music-results'];
const moviesScreens = ['movies-home','movie-detail','movie-quiz','movie-results'];
const poetryScreens = ['poetry-home','poetry-detail','poetry-quiz','poetry-results'];
const sportsScreens = ['sports-home','sport-detail','sport-quiz','sport-results'];
const proverbsScreens = ['proverbs-home','proverb-detail','proverb-quiz','proverb-results'];
const folktalesScreens = ['folktales-home','folktale-detail','folktale-quiz','folktale-results'];
const festivalsScreens = ['festivals-home','festival-detail','festival-quiz','festival-results'];
const historyScreens = ['history-home','history-detail','history-quiz','history-results'];
const travelScreens = ['travel-home','travel-detail','travel-quiz','travel-results'];
const conversationsScreens = ['conv-home','conv-dialogue','conv-roleplay','conv-quiz','conv-results'];

function closeAllTabDropdowns() {
  document.querySelectorAll('.tab-dropdown.open').forEach(dd => dd.classList.remove('open'));
}

function toggleTabDropdown(group) {
  const menu = document.getElementById('tab-group-' + group);
  if (!menu) return;
  const dd = menu.closest('.tab-dropdown');
  const wasOpen = dd.classList.contains('open');
  closeAllTabDropdowns();
  if (!wasOpen) dd.classList.add('open');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.tab-dropdown')) closeAllTabDropdowns();
});

function switchTab(tab) {
  if (tab !== 'reading') readingSession = null;
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const isActive = btn.dataset.tab === tab;
    btn.classList.toggle('active', isActive);
  });
  // Highlight the dropdown toggle whose group contains the active tab
  document.querySelectorAll('.tab-dropdown-toggle').forEach(toggle => {
    const menu = toggle.nextElementSibling;
    const hasActive = menu && menu.querySelector('.tab-btn.active');
    toggle.classList.toggle('has-active', !!hasActive);
  });
  if (tab === 'today') {
    showScreen('today-screen');
  } else if (tab === 'alphabet') {
    _moduleHomeScreen = 'home';
    showScreen('home');
  } else if (tab === 'vocabulary') {
    showScreen('vocab-home');
  } else if (tab === 'numbers') {
    _moduleHomeScreen = 'numbers-home';
    showScreen('numbers-home');
  } else if (tab === 'phrases') {
    showScreen('phrases-home');
  } else if (tab === 'reading') {
    showScreen('reading-screen');
  } else if (tab === 'trivia') {
    showScreen('trivia-home');
  } else if (tab === 'recipes') {
    showScreen('recipes-home');
  } else if (tab === 'music') {
    showScreen('music-home');
  } else if (tab === 'movies') {
    showScreen('movies-home');
  } else if (tab === 'poetry') {
    showScreen('poetry-home');
  } else if (tab === 'sports') {
    showScreen('sports-home');
  } else if (tab === 'proverbs') {
    showScreen('proverbs-home');
  } else if (tab === 'folktales') {
    showScreen('folktales-home');
  } else if (tab === 'festivals') {
    showScreen('festivals-home');
  } else if (tab === 'history') {
    showScreen('history-home');
  } else if (tab === 'travel') {
    showScreen('travel-home');
  } else if (tab === 'conversations') {
    showScreen('conv-home');
  } else {
    showScreen('grammar-home');
  }
}

// ════════════════════════════════════════
//  VOCAB PROGRESS
// ════════════════════════════════════════

// Compute the mastery storage key for a word object or plain lemma string.
// Words with a senseId (e.g. তারা/star vs তারা/they) get distinct keys.
function _vocabKey(w) {
  if (typeof w === 'string') return 'v:' + w;
  return 'v:' + w.lemma + (w.senseId ? ':' + w.senseId : '');
}

function getVocabMastery(w) {
  return progress.mastery[_vocabKey(w)] || 0;
}
// ════════════════════════════════════════
//  VOCAB HOME
// ════════════════════════════════════════
function renderVocabHome() {
  // Eagerly load all packs so counts are accurate; re-render once they arrive.
  if (!VOCAB_PACK_LOADED[1] || !VOCAB_PACK_LOADED[2] || !VOCAB_PACK_LOADED[3]) {
    Promise.all([1, 2, 3].map(n => loadVocabPack(n))).then(() => renderVocabHome());
  }
  const grid = document.getElementById('vocab-module-grid');
  grid.innerHTML = '';
  // Remove stale PT card first, then re-add if needed
  const oldPt = grid.parentElement.querySelector('.pt-cta-card');
  if (oldPt) oldPt.remove();
  if (shouldShowPlacementCard()) {
    const ptCard = document.createElement('div');
    ptCard.className = 'pt-cta-card';
    ptCard.innerHTML = '<h3>🎯 Take the Placement Test</h3><p>Already know some Bengali? Skip ahead based on your level.</p>';
    ptCard.onclick = () => startPlacementTest();
    grid.parentElement.insertBefore(ptCard, grid);
  }

  // Mixed Practice card
  const mixCard = document.createElement('div');
  mixCard.className = 'module-card';
  const vmUnlocked = getVocabMixedUnlockedCount();
  const vmTotal = VMIX_CURRICULUM.length;
  const vmMastered = VMIX_CURRICULUM.filter(w => getVocabMastery(w) >= 3).length;
  const vmPct = Math.round((vmMastered / vmTotal) * 100);
  const vmWave = Math.ceil(vmUnlocked / VMIX_WAVE_SIZE);
  const vmTotalWaves = Math.ceil(vmTotal / VMIX_WAVE_SIZE);
  mixCard.innerHTML = `
    <div class="module-icon">🧠</div>
    <h3>Mixed Practice</h3>
    <p>Adaptive lessons — new words introduced as you master earlier ones</p>
    <div class="module-progress"><div class="module-progress-fill" style="width:${vmPct}%;background:var(--accent)"></div></div>
    <div class="progress-label">${vmMastered}/${vmTotal} mastered · Wave ${vmWave}/${vmTotalWaves} unlocked</div>
  `;
  mixCard.onclick = () => startMixedVocabPractice();
  grid.appendChild(mixCard);

  // "All Words" browser card
  const allCard = document.createElement('div');
  allCard.className = 'module-card';
  const totalWords = VOCAB_TOTAL_WORDS;
  const masteredWords = Object.entries(progress.mastery)
    .filter(([k, v]) => k.startsWith('v:') && v >= 3).length;
  const allPct = Math.round((masteredWords / totalWords) * 100);
  allCard.innerHTML = `
    <div class="module-icon">📖</div>
    <h3>Browse All Words</h3>
    <p>Search and browse all ${totalWords} words</p>
    <div class="module-progress"><div class="module-progress-fill" style="width:${allPct}%;background:var(--accent)"></div></div>
    <div class="progress-label">${masteredWords}/${totalWords} mastered</div>
  `;
  allCard.onclick = () => openVocabBrowse(null);
  grid.appendChild(allCard);

  // Category cards
  const cats = Object.keys(VOCAB_CATEGORIES);
  cats.forEach(catId => {
    const cat = VOCAB_CATEGORIES[catId];
    const words = VOCAB_DATA.filter(w => w.category === catId);
    if (words.length === 0) return;
    const mastered = words.filter(w => getVocabMastery(w) >= 3).length;
    const pct = Math.round((mastered / words.length) * 100);

    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
      <div class="module-icon">${cat.icon}</div>
      <h3>${cat.title}</h3>
      <p>${words.length} words</p>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:${cat.color}"></div></div>
      <div class="progress-label">${mastered}/${words.length} mastered</div>
      <div class="module-card-actions">
        <button class="mc-action-btn" data-action="start-vocab-learn" data-catid="${catId}">📖 Review</button>
        <button class="mc-action-btn" data-action="start-vocab-listening" data-catid="${catId}">🎧 Listen</button>
        <button class="mc-action-btn mc-action-quiz" data-action="start-vocab-cat-quiz" data-catid="${catId}">▶ Quiz</button>
      </div>
    `;
    card.onclick = () => startVocabLearn(catId);
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════
//  VOCAB MIXED PRACTICE — ADAPTIVE ALGORITHM
// ════════════════════════════════════════
// Words are introduced in waves of VMIX_WAVE_SIZE.  The curriculum
// interleaves categories so the learner sees variety early: pronouns,
// greetings, common verbs, food, numbers, etc.  New waves unlock when
// ≥50 % of the current wave reaches mastery ≥ 2.

const VMIX_WAVE_SIZE  = 10;   // words per wave
const VMIX_INTRO      = 5;    // new words shown as flashcards per session
const VMIX_QUIZ_SIZE  = 10;   // questions per quiz round
const VMIX_UNLOCK_THR = 2;    // mastery needed to count as "familiar"
const VMIX_FREQ_BANDS = [
  { maxRank: 20,   label: '1-20' },
  { maxRank: 70,   label: '21-70' },
  { maxRank: 250,  label: '71-250' },
  { maxRank: 800,  label: '251-800' },
  { maxRank: 2500, label: '801-2500' },
  { maxRank: 9000, label: '2501-9000' },
];

// Build a deliberate curriculum order in two stages:
//  1) partition by frequency band;
//  2) within each band, interleave categories with weighted round-robin.
//
// Extracted as a named function so it can be called again when lazy packs load,
// though in practice packs are pre-sorted so we just append them directly.
function buildCurriculum(words) {
  // Priority order: highest-utility categories first.
  const catOrder = [
    'expressions','pronouns','numbers','verbs','food','family',
    'adjectives','phrases','time','home','body','places',
    'adverbs','nature','emotions','education','animals','professions',
    'grammar','clothing','transport','health','colors','technology',
    'society','abstract'
  ];

  const categoryWeight = {};
  catOrder.forEach((cat, idx) => {
    // Higher-priority categories get a slightly higher turn frequency.
    categoryWeight[cat] = catOrder.length - idx;
  });

  const normalizeWord = (w) => ({
    ...w,
    category: catOrder.includes(w.category) ? w.category : 'abstract',
    freqRank: Number.isFinite(w.freqRank) ? w.freqRank : Number.MAX_SAFE_INTEGER,
  });

  const stableWordSort = (a, b) =>
    (a.freqRank - b.freqRank) ||
    a.lemma.localeCompare(b.lemma, 'bn') ||
    a.english.localeCompare(b.english);

  const weightedRoundRobinBand = (wordsInBand) => {
    const queues = {};
    catOrder.forEach(c => { queues[c] = []; });

    wordsInBand.forEach(w => {
      queues[w.category].push(w);
    });

    // Deterministic ordering within each category queue.
    catOrder.forEach(c => queues[c].sort(stableWordSort));

    const emitted = [];
    const seen = new Set();

    while (true) {
      let emittedThisPass = false;
      for (const c of catOrder) {
        let turns = categoryWeight[c] || 1;
        while (turns > 0 && queues[c].length > 0) {
          const w = queues[c].shift();
          const key = w.lemma + '|' + w.english;
          if (!seen.has(key)) {
            seen.add(key);
            emitted.push(w);
          }
          emittedThisPass = true;
          turns--;
        }
      }
      if (!emittedThisPass) break;
    }

    return emitted;
  };

  const getBandIdxByRank = (rank) => {
    for (let i = 0; i < VMIX_FREQ_BANDS.length; i++) {
      if (rank <= VMIX_FREQ_BANDS[i].maxRank) return i;
    }
    return VMIX_FREQ_BANDS.length - 1;
  };

  const bands = new Map();
  words.map(normalizeWord)
    .sort(stableWordSort)
    .forEach(w => {
      const bandIdx = getBandIdxByRank(w.freqRank);
      if (!bands.has(bandIdx)) bands.set(bandIdx, []);
      bands.get(bandIdx).push(w);
    });

  const curriculum = [];
  for (let i = 0; i < VMIX_FREQ_BANDS.length; i++) {
    if (bands.has(i)) curriculum.push(...weightedRoundRobinBand(bands.get(i)));
  }

  return curriculum;
}

// Pack 0 is always loaded (inlined in vocab.js). Packs 1-3 are fetched lazily.
// VMIX_CURRICULUM is mutable so packs can be appended without resorting.
let VMIX_CURRICULUM = buildCurriculum(VOCAB_DATA);

// ── Lazy pack loading ──────────────────────────────────────────────────────
// Packs are pre-sorted in curriculum order by build_vocab_packs.py, so we
// simply append them to both VOCAB_DATA and VMIX_CURRICULUM as they load.
const VOCAB_PACK_LOADED = [true, false, false, false]; // pack 0 always loaded

async function loadVocabPack(packNum) {
  if (VOCAB_PACK_LOADED[packNum]) return;
  VOCAB_PACK_LOADED[packNum] = true; // mark immediately to prevent concurrent loads
  try {
    const resp = await fetch(`vocab-pack-${packNum}.json`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const words = (await resp.json()).map(w => ({ ...w, related: Array.isArray(w.related) ? w.related : [] }));
    VOCAB_DATA.push(...words);
    VMIX_CURRICULUM.push(...words); // packs are pre-sorted in curriculum order
  } catch (err) {
    VOCAB_PACK_LOADED[packNum] = false; // allow retry on error
    console.warn(`Failed to load vocab-pack-${packNum}.json:`, err);
  }
}

function getVocabMixedUnlockedCount() {
  let unlocked = VMIX_WAVE_SIZE;
  while (unlocked < VMIX_CURRICULUM.length) {
    const waveStart = unlocked - VMIX_WAVE_SIZE;
    const wave = VMIX_CURRICULUM.slice(waveStart, unlocked);
    const familiar = wave.filter(w => getVocabMastery(w) >= VMIX_UNLOCK_THR).length;
    if (familiar >= Math.ceil(wave.length * 0.5)) {
      unlocked = Math.min(unlocked + VMIX_WAVE_SIZE, VMIX_CURRICULUM.length);
    } else {
      break;
    }
  }

  // Prefetch next pack when the user has unlocked >75% of what's currently loaded.
  const loadedSize = VMIX_CURRICULUM.length;
  if (unlocked > loadedSize * 0.75) {
    const nextPack = VOCAB_PACK_LOADED.findIndex(loaded => !loaded);
    if (nextPack !== -1) loadVocabPack(nextPack); // fire-and-forget
  }

  return unlocked;
}

function buildMixedVocabSession() {
  const unlocked = getVocabMixedUnlockedCount();
  const pool = VMIX_CURRICULUM.slice(0, unlocked);

  // Priority queue: words user flagged via "Study this"
  const priorityLemmas = progress.vmixPriority || [];
  const priorityWords = priorityLemmas
    .map(lemma => VOCAB_DATA.find(w => w.lemma === lemma))
    .filter(Boolean);

  // Words the user hasn't seen yet
  const unseen = pool.filter(w => getVocabMastery(w) === 0);
  // Priority words that need teaching come first
  const priorityUnseen = priorityWords.filter(w => getVocabMastery(w) === 0);
  const regularUnseen = unseen.filter(w => !priorityLemmas.includes(w.lemma));
  const teach = [...priorityUnseen, ...regularUnseen].slice(0, VMIX_INTRO);

  // Prioritise low-mastery words for the quiz; priority queue goes first
  const poolWithPriority = [...priorityWords, ...pool.filter(w => !priorityLemmas.includes(w.lemma))];
  const prioritized = [...poolWithPriority].sort((a, b) => {
    const aIsPriority = priorityLemmas.includes(a.lemma);
    const bIsPriority = priorityLemmas.includes(b.lemma);
    if (aIsPriority !== bIsPriority) return aIsPriority ? -1 : 1;
    const ma = getVocabMastery(a), mb = getVocabMastery(b);
    const sa = ma === 3 ? 4 : ma === 2 ? 1 : ma === 0 ? 0.5 : 0;
    const sb = mb === 3 ? 4 : mb === 2 ? 1 : mb === 0 ? 0.5 : 0;
    return (sa - sb)
      || ((a.freqRank || Number.MAX_SAFE_INTEGER) - (b.freqRank || Number.MAX_SAFE_INTEGER))
      || a.lemma.localeCompare(b.lemma, 'bn')
      || a.english.localeCompare(b.english);
  });

  const quiz = prioritized.slice(0, Math.min(VMIX_QUIZ_SIZE, poolWithPriority.length));
  // Remove from priority queue words that have been quizzed (mastery > 0)
  if (priorityLemmas.length > 0) {
    const masteredLemmas = new Set(priorityWords.filter(w => getVocabMastery(w) > 0).map(w => w.lemma));
    progress.vmixPriority = priorityLemmas.filter(l => !masteredLemmas.has(l));
    saveProgress();
  }
  return { teach, quiz, unlocked, total: VMIX_CURRICULUM.length };
}

let vmixSession = null;
let vmixIsActive = false;   // track whether we're in mixed-vocab mode

function startMixedVocabPractice() {
  vmixSession = buildMixedVocabSession();
  vmixIsActive = true;

  if (vmixSession.teach.length > 0) {
    // Show flashcards for new words, then quiz
    vlWords = vmixSession.teach;
    vlIndex = 0;
    vlCatId = '__mixed__';
    document.getElementById('vl-title').textContent = 'New Words';
    document.getElementById('vl-counter').textContent = '1 / ' + vlWords.length;
    const qbtn = document.getElementById('vl-quiz-btn');
    qbtn.textContent = 'Practice Quiz →';
    qbtn.onclick = () => launchMixedVocabQuiz();
    showVocabCardAt();
    showScreen('vocab-learn');
  } else {
    launchMixedVocabQuiz();
  }
}

function launchMixedVocabQuiz() {
  if (!vmixSession) vmixSession = buildMixedVocabSession();
  vmixIsActive = true;
  vlWords = vmixSession.quiz;
  vlCatId = '__mixed__';
  vqCatRef = '__mixed__';
  generateVocabQuiz(vmixSession.quiz);
  vqIndex = 0;
  vqCorrect = 0;
  vqMissed = [];
  _quizStartTime = Date.now();
  document.getElementById('vq-title').textContent = 'Mixed Vocab Practice';
  showScreen('vocab-quiz');
  renderVocabQuestion();
  updateStreak();
}

// ════════════════════════════════════════
//  VOCAB BROWSE
// ════════════════════════════════════════
let vbFilter = null;
let vbLevelFilter = null;
let vbPage = 0;
const VB_PAGE_SIZE = 30;
const CEFR_LEVELS = [
  { id: 'A1', label: 'A1', desc: 'Beginner' },
  { id: 'A2', label: 'A2', desc: 'Elementary' },
  { id: 'B1', label: 'B1', desc: 'Intermediate' },
  { id: 'B2', label: 'B2', desc: 'Advanced' },
];

function openVocabBrowse(cat) {
  vbFilter = cat;
  vbLevelFilter = null;
  vbPage = 0;
  showScreen('vocab-browse');
  document.getElementById('vb-search').value = '';
  renderLevelChips();
  renderCatChips();
  renderVocabList();
}

function renderCatChips() {
  const container = document.getElementById('cat-chips');
  const cats = Object.keys(VOCAB_CATEGORIES);
  container.innerHTML = `<div class="cat-chip ${vbFilter === null ? 'active' : ''}" data-action="set-vocab-filter">All</div>` +
    cats.map(catId => {
      const cat = VOCAB_CATEGORIES[catId];
      const count = VOCAB_DATA.filter(w => w.category === catId).length;
      if (count === 0) return '';
      return `<div class="cat-chip ${vbFilter === catId ? 'active' : ''}" data-action="set-vocab-filter" data-catid="${catId}">${cat.icon} ${cat.title} (${count})</div>`;
    }).join('');
}

function renderLevelChips() {
  const container = document.getElementById('level-chips');
  if (!container) return;
  container.innerHTML = `<div class="level-chip ${vbLevelFilter === null ? 'active' : ''}" data-action="set-vocab-level">All Levels</div>` +
    CEFR_LEVELS.map(lv => {
      const count = VOCAB_DATA.filter(w => w.level === lv.id).length;
      return `<div class="level-chip level-${lv.id} ${vbLevelFilter === lv.id ? 'active' : ''}" data-action="set-vocab-level" data-level="${lv.id}">${lv.label} · ${lv.desc} (${count})</div>`;
    }).join('');
}

function setVocabLevel(level) {
  vbLevelFilter = level || null;
  vbPage = 0;
  renderLevelChips();
  renderVocabList();
}

function setVocabFilter(cat) {
  vbFilter = cat;
  vbPage = 0;
  renderCatChips();
  renderVocabList();
}

function filterVocabList() {
  vbPage = 0;
  renderVocabList();
}

function getFilteredVocab() {
  const search = (document.getElementById('vb-search')?.value || '').toLowerCase().trim();
  return VOCAB_DATA.filter(w => {
    if (vbFilter && w.category !== vbFilter) return false;
    if (vbLevelFilter && w.level !== vbLevelFilter) return false;
    if (search) {
      return w.lemma.includes(search) || w.roman.toLowerCase().includes(search) || w.english.toLowerCase().includes(search);
    }
    return true;
  });
}

function hasActiveVocabCategoryFilter() {
  return !!vbFilter;
}

function getFilteredVocabSubset() {
  if (!hasActiveVocabCategoryFilter()) return [];
  return getFilteredVocab();
}

function startFilteredVocabQuiz() {
  const words = getFilteredVocabSubset();
  if (!words.length) return;

  vmixIsActive = false;
  vlWords = words;
  vlCatId = vbFilter;
  vqCatRef = vbFilter;
  generateVocabQuiz(words);
  vqIndex = 0;
  vqCorrect = 0;
  vqMissed = [];
  _quizStartTime = Date.now();

  const cat = VOCAB_CATEGORIES[vbFilter];
  const label = cat ? cat.title : 'Filtered Vocab';
  document.getElementById('vq-title').textContent = label + ' Quiz';
  showScreen('vocab-quiz');
  renderVocabQuestion();
  updateStreak();
}

function renderVocabList() {
  const filtered = getFilteredVocab();
  const start = vbPage * VB_PAGE_SIZE;
  const page = filtered.slice(start, start + VB_PAGE_SIZE);

  const container = document.getElementById('vocab-list');
  const filteredSubset = getFilteredVocabSubset();
  const ctaHtml = hasActiveVocabCategoryFilter() ? `<div style="margin:4px 0 10px;display:flex;justify-content:center;">
      <button class="btn-primary" data-action="start-vocab-filter-quiz">▶ Quiz filtered list (${filteredSubset.length})</button>
    </div>` : '';

  container.innerHTML = ctaHtml + page.map(w => {
    const m = getVocabMastery(w);
    return `<div class="vocab-row" data-action="show-vocab-detail" data-lemma="${w.lemma.replace(/'/g,'&apos;')}">
      <div class="vr-bengali">${displayBengali(w.lemma, w.roman)}</div>
      <div class="vr-roman">${w.roman}</div>
      <div class="vr-english">${w.english}</div>
      <div class="vr-level level-${w.level}">${w.level}</div>
      <div class="vr-mastery mastery-${m}"></div>
    </div>`;
  }).join('');

  if (page.length === 0) {
    container.innerHTML = ctaHtml + '<div style="text-align:center;color:var(--text-dim);padding:40px;">No words found</div>';
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / VB_PAGE_SIZE);
  const pag = document.getElementById('vocab-pagination');
  if (totalPages <= 1) { pag.innerHTML = ''; return; }
  pag.innerHTML = `
    <button class="nav-btn" ${vbPage === 0 ? 'disabled' : ''} data-action="vocab-page-prev">← Prev</button>
    <span style="color:var(--text-dim)">${vbPage + 1} / ${totalPages}</span>
    <button class="nav-btn" ${vbPage >= totalPages - 1 ? 'disabled' : ''} data-action="vocab-page-next">Next →</button>
  `;
}

let _wordModalLemma = null;

function getRelatedWordRef(entry) {
  if (entry && typeof entry === "object") return entry.ref ?? entry.id ?? entry.lemma ?? '';
  return entry;
}

function getRelatedWordType(entry) {
  if (entry && typeof entry === "object" && typeof entry.type === "string" && entry.type.trim()) {
    return entry.type.trim().toLowerCase();
  }
  return 'related';
}

function resolveRelatedWord(entry, lookupByLemma, lookupByRank, lookupBySenseId) {
  const ref = getRelatedWordRef(entry);
  if (typeof ref === 'number') return lookupByRank.get(ref) || null;
  if (typeof ref !== 'string') return null;
  const key = ref.trim();
  if (!key) return null;
  if (/^\d+$/.test(key)) return lookupByRank.get(Number(key)) || null;
  return lookupByLemma.get(key) || lookupBySenseId.get(key) || null;
}

function renderWordModalRelated(currentWord) {
  const section = document.getElementById('wm-related');
  const listEl = document.getElementById('wm-related-list');
  if (!section || !listEl) return;

  const related = Array.isArray(currentWord.related) ? currentWord.related : [];
  if (!related.length) {
    section.style.display = 'none';
    listEl.innerHTML = '';
    return;
  }

  const lookupByLemma = new Map(VOCAB_DATA.map(w => [w.lemma, w]));
  const lookupByRank = new Map(VOCAB_DATA.map(w => [w.freqRank, w]));
  const lookupBySenseId = new Map(VOCAB_DATA.filter(w => w.senseId).map(w => [w.senseId, w]));

  const rendered = [];
  const seen = new Set([currentWord.lemma]);
  related.forEach(item => {
    const word = resolveRelatedWord(item, lookupByLemma, lookupByRank, lookupBySenseId);
    if (!word || seen.has(word.lemma)) return;
    seen.add(word.lemma);
    rendered.push({ word, type: getRelatedWordType(item) });
  });

  const sample = rendered.slice(0, 3);
  if (!sample.length) {
    section.style.display = 'none';
    listEl.innerHTML = '';
    return;
  }

  listEl.innerHTML = sample.map(({ word, type }) =>
    `<button class="wm-related-item" data-action="open-related-word" data-lemma="${escapeStr(word.lemma)}">
      <span class="wm-related-lemma">${escapeStr(displayBengali(word.lemma, word.roman))}</span>
      <span class="wm-related-type">${escapeStr(type)}</span>
    </button>`
  ).join('');
  section.style.display = '';
}

function showVocabDetail(bengali) {
  const w = VOCAB_DATA.find(w => w.lemma === bengali);
  if (!w) return;
  _wordModalLemma = w.lemma;
  const cat = VOCAB_CATEGORIES[w.category];
  document.getElementById('wm-bengali').textContent = displayBengali(w.lemma, w.roman);
  document.getElementById('wm-roman').textContent = w.roman;
  document.getElementById('wm-pos').textContent = w.pos;
  document.getElementById('wm-english').textContent = w.english;
  document.getElementById('wm-cat').textContent = cat ? cat.title : w.category;
  const wmEx = document.getElementById('wm-example');
  if (wmEx) wmEx.textContent = w.example || '';
  const wmExBtn = document.getElementById('wm-example-btn');
  if (wmExBtn) wmExBtn.style.display = w.example ? '' : 'none';
  renderWordModalRelated(w);
  // Update study button
  const studyBtn = document.getElementById('wm-study-btn');
  if (studyBtn) {
    const inQueue = (progress.vmixPriority || []).includes(w.lemma);
    studyBtn.textContent = inQueue ? '✓ In study queue' : '+ Study this word';
    studyBtn.dataset.lemma = w.lemma;
  }
  const conjBtn = document.getElementById('wm-conj-btn');
  if (conjBtn) {
    const hasConjugation = w.pos === 'verb' && !!getConjugationVerbFromLemma(w.lemma);
    conjBtn.style.display = hasConjugation ? '' : 'none';
    conjBtn.dataset.lemma = hasConjugation ? w.lemma : '';
  }
  document.getElementById('word-modal-card').classList.remove('flipped');
  document.getElementById('word-modal').classList.add('open');
  document.addEventListener('keydown', _wordModalEsc);
}

function studyWordNext(lemma) {
  if (!progress.vmixPriority) progress.vmixPriority = [];
  if (!progress.vmixPriority.includes(lemma)) {
    progress.vmixPriority.unshift(lemma);
    saveProgress();
  }
  const btn = document.getElementById('wm-study-btn');
  if (btn) btn.textContent = '✓ In study queue';
}

// Add-to-study from search overlay without leaving the panel
function searchAddToStudy(lemma, btn) {
  if (!progress.vmixPriority) progress.vmixPriority = [];
  if (!progress.vmixPriority.includes(lemma)) {
    progress.vmixPriority.unshift(lemma);
    saveProgress();
  }
  btn.textContent = '✓ Queued';
  btn.classList.add('added');
  btn.title = 'Already in study queue';
}

function closeWordModal() {
  document.getElementById('word-modal').classList.remove('open');
  document.removeEventListener('keydown', _wordModalEsc);
}

function _wordModalEsc(e) { if (e.key === 'Escape') closeWordModal(); }

function flipWordModal() {
  document.getElementById('word-modal-card').classList.toggle('flipped');
}

// ════════════════════════════════════════
//  VOCAB LEARN (FLASHCARDS)
// ════════════════════════════════════════
let vlWords = [];
let vlIndex = 0;
let vlCatId = null;

function startVocabLearn(catId) {
  vmixIsActive = false;
  vlCatId = catId;
  const cat = VOCAB_CATEGORIES[catId];
  vlWords = VOCAB_DATA.filter(w => w.category === catId);
  vlIndex = 0;
  document.getElementById('vl-title').textContent = cat.title;
  // Reset quiz button to default (may have been overridden by mixed mode)
  const qbtn = document.getElementById('vl-quiz-btn');
  qbtn.textContent = 'Start Quiz →';
  qbtn.onclick = () => startVocabQuiz();
  showVocabCardAt();
  showScreen('vocab-learn');
}

function _startVocabCatQuiz(catId) {
  vmixIsActive = false;
  vlCatId = catId;
  vqCatRef = catId;
  const words = VOCAB_DATA.filter(w => w.category === catId);
  generateVocabQuiz(words);
  vqIndex = 0; vqCorrect = 0; vqMissed = [];
  const cat = VOCAB_CATEGORIES[catId];
  document.getElementById('vq-title').textContent = (cat ? cat.title : catId) + ' Quiz';
  showScreen('vocab-quiz');
  renderVocabQuestion();
  updateStreak();
}

function showVocabCardAt() {
  const w = vlWords[vlIndex];
  document.getElementById('vocab-flashcard').classList.remove('flipped');
  document.getElementById('vc-bengali').textContent = displayBengali(w.lemma, w.roman);
  document.getElementById('vc-roman').textContent = w.roman;
  document.getElementById('vc-pos').textContent = w.pos;
  document.getElementById('vc-english').textContent = w.english;
  const cat = VOCAB_CATEGORIES[w.category];
  document.getElementById('vc-cat').textContent = cat ? cat.title : w.category;
  const exEl = document.getElementById('vc-example');
  if (exEl) exEl.textContent = w.example || '';
  const exBtn = document.getElementById('vc-example-btn');
  if (exBtn) exBtn.style.display = w.example ? '' : 'none';
  document.getElementById('vl-counter').textContent = (vlIndex + 1) + ' / ' + vlWords.length;
  document.getElementById('vl-prev').style.visibility = vlIndex === 0 ? 'hidden' : 'visible';

  // Mark as seen
  if (getVocabMastery(w) === 0) {
    progress.mastery[_vocabKey(w)] = 1;
    saveProgress();
  }
}

function flipVocabCard() {
  document.getElementById('vocab-flashcard').classList.toggle('flipped');
}
function nextVocabCard() {
  if (vlIndex < vlWords.length - 1) { vlIndex++; showVocabCardAt(); }
}
function prevVocabCard() {
  if (vlIndex > 0) { vlIndex--; showVocabCardAt(); }
}

// ════════════════════════════════════════
//  VOCAB QUIZ
// ════════════════════════════════════════
let vqQuestions = [];
let vqIndex = 0;
let vqCorrect = 0;
let vqAnswered = false;
let vqCatRef = null;
let vqMissed = [];

function startVocabQuiz() {
  vqCatRef = vlCatId;
  const words = vlWords && vlWords.length > 0 ? vlWords : VOCAB_DATA.filter(w => w.category === vlCatId);
  generateVocabQuiz(words);
  vqIndex = 0;
  vqCorrect = 0;
  vqMissed = [];
  _quizStartTime = Date.now();
  const cat = VOCAB_CATEGORIES[vlCatId];
  document.getElementById('vq-title').textContent = (cat ? cat.title : 'Vocab') + ' Quiz';
  showScreen('vocab-quiz');
  renderVocabQuestion();
  updateStreak();
}

function generateVocabQuiz(words, forceMode) {
  vqQuestions = [];
  // Weight by urgency: overdue ratio = elapsed_days / stability (FSRS), or legacy interval ratio
  const urgency = w => {
    const m = getVocabMastery(w);
    if (m === 0) return 500;
    const vk = _vocabKey(w);
    const card = progress.fsrs && progress.fsrs[vk];
    if (card && card.s > 0) {
      return _elapsedDays(vk) / card.s;
    }
    const seenAgo = (progress.lastSeen && progress.lastSeen[vk])
      ? Date.now() - new Date(progress.lastSeen[vk]).getTime() : Infinity;
    return seenAgo / REVIEW_INTERVALS_MS[m];
  };
  const sorted = [...words].sort((a, b) => urgency(b) - urgency(a));
  const count = Math.min(10, sorted.length);
  const selected = sorted.slice(0, count);

  const listenMode = forceMode || getListeningMode();

  selected.forEach((w, i) => {
    let qTypes;
    if (listenMode === 'listening') {
      qTypes = ['listening-mc', 'listening-fib'];
    } else if (listenMode === 'mixed') {
      qTypes = ['mc-en', 'mc-bn', 'fib-en', 'fib-bn', 'listening-mc', 'listening-fib'];
    } else {
      qTypes = ['mc-en', 'mc-bn', 'fib-en', 'fib-bn'];
    }
    const qtype = qTypes[i % qTypes.length];

    if (qtype === 'mc-en') {
      // Show Bengali, pick English meaning
      const correct = w.english;
      const distractors = words.filter(x => x.lemma !== w.lemma).map(x => x.english);
      const allPool = VOCAB_DATA.filter(x => x.lemma !== w.lemma).map(x => x.english);
      const pool = distractors.length >= 3 ? distractors : [...distractors, ...allPool];
      const picks = shuffle([...new Set(pool)].filter(x => x !== correct)).slice(0, 3);
      vqQuestions.push({
        type: 'mc', bengali: w.lemma, roman: w.roman,
        prompt: 'What does this word mean?',
        correct, options: shuffle([correct, ...picks]), word: w,
      });
    } else if (qtype === 'mc-bn') {
      // Show English, pick Bengali — exclude synonyms (same English gloss) from distractors
      const correct = w.lemma;
      const notSynonym = x => x.lemma !== w.lemma && !_englishOverlaps(x.english, w.english);
      const distractors = words.filter(notSynonym).map(x => x.lemma);
      const allPool = VOCAB_DATA.filter(notSynonym).map(x => x.lemma);
      const pool = distractors.length >= 3 ? distractors : [...distractors, ...allPool];
      const picks = shuffle([...new Set(pool)].filter(x => x !== correct)).slice(0, 3);
      vqQuestions.push({
        type: 'mc-reverse', english: w.english,
        prompt: getDisplayMode() === 'immersion'
          ? 'কোন বাংলা শব্দের অর্থ "' + w.english + '"?'
          : 'Which Bengali word means "' + w.english + '"?',
        correct, options: shuffle([correct, ...picks]), word: w,
      });
    } else if (qtype === 'fib-en') {
      // Show Bengali, type English
      const acceptable = w.english.toLowerCase().split('/').map(s => s.trim());
      // Also accept individual words for multi-word translations
      w.english.toLowerCase().split('/').forEach(s => {
        s.trim().split(' ').forEach(word => { if (word.length > 2) acceptable.push(word); });
      });
      vqQuestions.push({
        type: 'fib', bengali: w.lemma, roman: w.roman,
        prompt: 'Type the English meaning:',
        acceptable: [...new Set(acceptable)],
        answer: w.english, hint: 'Romanized: ' + w.roman, word: w,
      });
    } else if (qtype === 'fib-bn') {
      // Show English, type Bengali (script or romanized depending on fibMode)
      const _fibMode = getFibMode();
      const acceptable = [w.roman.toLowerCase()];
      const prompt = _fibMode === 'bengali' ? 'Type the Bengali word:' :
                     _fibMode === 'mixed'   ? 'Type the Bengali word or romanization:' :
                                             'Type the romanized Bengali:';
      const answer = _fibMode === 'bengali' ? w.lemma :
                     _fibMode === 'mixed'   ? `${w.lemma} (${w.roman})` :
                                             w.roman;
      vqQuestions.push({
        type: 'fib-reverse', english: w.english,
        prompt, acceptable, answer,
        hint: 'Category: ' + (VOCAB_CATEGORIES[w.category]?.title || w.category), word: w,
      });
    } else if (qtype === 'listening-mc') {
      // Play word; pick English meaning
      const correct = w.english;
      const pool = shuffle(words.filter(x => x.lemma !== w.lemma).map(x => x.english)
        .filter(v => v !== correct));
      const picks = pool.slice(0, 3);
      vqQuestions.push({
        type: 'listening-mc', audio: w.lemma,
        bengali: w.lemma, roman: w.roman,
        prompt: 'What does this word mean?',
        correct, options: shuffle([correct, ...picks]), word: w,
      });
    } else {
      // listening-fib: play word; type Bengali (script or romanized depending on fibMode)
      const _fibMode = getFibMode();
      const acceptable = [w.roman.toLowerCase()];
      const lfPrompt = _fibMode === 'bengali' ? 'Type the Bengali word you hear:' :
                       _fibMode === 'mixed'   ? 'Type the Bengali word or romanization:' :
                                               'Type the romanized form of what you hear:';
      const lfAnswer = _fibMode === 'bengali' ? w.lemma :
                       _fibMode === 'mixed'   ? `${w.lemma} (${w.roman})` :
                                               w.roman;
      vqQuestions.push({
        type: 'listening-fib', audio: w.lemma,
        bengali: w.lemma, roman: w.roman,
        prompt: lfPrompt, acceptable, answer: lfAnswer,
        hint: 'Hint: ' + w.english, word: w,
      });
    }
  });
}

// Returns true if two English glosses share a primary meaning token (e.g. "water" and "water (formal)").
// Used to filter synonyms from MC distractor pools so a valid synonym never appears as a wrong option.
function _englishOverlaps(a, b) {
  const tok = s => s.toLowerCase().split('/').map(t => t.trim()).filter(Boolean);
  return tok(a).some(t => tok(b).includes(t));
}

function renderVocabQuestion() {
  if (vqIndex >= vqQuestions.length) { showVocabResults(); return; }
  vqAnswered = false;
  const q = vqQuestions[vqIndex];

  document.getElementById('vq-progress-fill').style.width =
    ((vqIndex / vqQuestions.length) * 100) + '%';
  document.getElementById('vq-score').textContent = vqCorrect + ' / ' + vqIndex;

  const qa = document.getElementById('vq-question-area');
  if (q.type === 'listening-mc' || q.type === 'listening-fib') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="listening-controls">
        <button class="listening-play-btn" data-action="speak" data-text="${escapeStr(q.audio)}" aria-label="Play sound">▶</button>
        <button class="slow-audio-btn${_audioSlowMode ? ' active' : ''}" data-action="toggle-slow-audio" title="${_audioSlowMode ? 'Slow mode on — click to restore normal speed' : 'Play at half speed'}" aria-label="Toggle slow audio">🐢</button>
      </div>
      <div style="font-size:0.8rem;color:var(--muted);margin-top:4px">${t('Tap to replay')}</div>
    `;
    setTimeout(() => speakBengali(q.audio), 300);
  } else if (q.type === 'mc' || q.type === 'fib') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="vq-bengali">${displayBengali(q.bengali, q.roman)}</div>
      <div class="vq-hint">${q.roman}</div>
      <button class="card-sound-btn" data-action="speak" data-text="${escapeStr(q.bengali)}" aria-label="Play pronunciation">🔊</button>
    `;
  } else {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div style="font-size:2.2rem;font-weight:700;margin:16px 0">${q.english}</div>
    `;
  }

  const aa = document.getElementById('vq-answer-area');
  const fb = document.getElementById('vq-feedback');
  fb.className = 'quiz-feedback';
  document.getElementById('vq-next-btn').className = 'btn-primary quiz-next-btn';
  document.getElementById('vq-rating-area').classList.remove('show');
  _pendingRating = null;

  if (q.type === 'mc' || q.type === 'mc-reverse' || q.type === 'listening-mc') {
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-mc-vocab">${opt}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-vocab">${t("I don't know")}</button>`;
    attachQuizKeyHandler('vq');
  } else {
    const vqHintHtml = q.hint
      ? `<button class="hint-btn" data-action="show-hint">💡 Hint</button><div class="fib-hint" style="display:none">${q.hint}</div>`
      : '';
    const vqKbdHtml = getFibMode() !== 'latin'
      ? `<button class="bng-kbd-toggle" data-action="show-kbd" data-input="vq-fib-input">বাং ▲</button>` : '';
    aa.innerHTML = `<div class="fib-area">
      <input type="text" class="fib-input" id="vq-fib-input" placeholder="${t('Type your answer…')}"
        autocomplete="off" autocapitalize="off">
      <button class="btn-primary fib-submit" data-action="answer-vocab-fib">${t('Check')}</button>
      ${vqHintHtml}${vqKbdHtml}
    </div>
    <button class="idk-btn" data-action="dont-know-vocab">${t("I don't know")}</button>`;
    setTimeout(() => document.getElementById('vq-fib-input')?.focus(), 100);
  }
}

function answerVocabMC(btn, chosen) {
  if (vqAnswered) return;
  vqAnswered = true;
  const q = vqQuestions[vqIndex];
  const correct = chosen === q.correct;
  document.querySelectorAll('#vq-answer-area .mc-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
  });
  btn.classList.add(correct ? 'correct' : 'wrong');
  if (correct) {
    vqCorrect++; addXP(10);
    showVocabFeedback(true, q.correct, false);
    showRatingButtons(_vocabKey(q.word), 'vq-rating-area', 'vq-next-btn');
  } else {
    _recordMiss(vqMissed, q);
    _trackMistake(_vocabKey(q.word), 'vocab');
    applyFsrsRating(_vocabKey(q.word), FSRS_AGAIN);
    _trackLastSeen(_vocabKey(q.word));
    saveProgress();
    checkAchievements();
    showVocabFeedback(false, q.correct, q.word && q.word.example);
    document.getElementById('vq-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function answerVocabFIB() {
  if (vqAnswered) return;
  const input = document.getElementById('vq-fib-input');
  if (!input) return;
  const rawInput = input.value.trim();
  const val = rawInput.toLowerCase();
  if (!val) return;
  vqAnswered = true;
  const q = vqQuestions[vqIndex];
  const normVal = _normRoman(val);
  const fibMode = getFibMode();
  let correct;
  if (fibMode === 'bengali') {
    correct = (q.word && rawInput === q.word.lemma) ||
              q.acceptable.some(a => _isBengali(a) && a === rawInput);
  } else {
    correct = q.acceptable.some(a => a === val || _normRoman(a) === normVal);
    if (fibMode === 'mixed') {
      correct = correct || (q.word && rawInput === q.word.lemma) ||
                q.acceptable.some(a => _isBengali(a) && a === rawInput);
    }
  }
  input.classList.add(correct ? 'correct' : 'wrong');
  if (correct) {
    vqCorrect++; addXP(15);
    showVocabFeedback(true, q.answer, false);
    showRatingButtons(_vocabKey(q.word), 'vq-rating-area', 'vq-next-btn');
  } else {
    _showInlineAnswer('vq-answer-area', q.answer);
    _recordMiss(vqMissed, q);
    _trackMistake(_vocabKey(q.word), 'vocab');
    applyFsrsRating(_vocabKey(q.word), FSRS_AGAIN);
    _trackLastSeen(_vocabKey(q.word));
    saveProgress();
    checkAchievements();
    showVocabFeedback(false, q.answer, q.word && q.word.example);
    document.getElementById('vq-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function showVocabFeedback(correct, answer, example) {
  const fb = document.getElementById('vq-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  let html = correct ? '✓ Correct! ' + escHtml(answer) : '✗ The answer is: ' + escHtml(answer);
  if (!correct && example) html += '<div class="fb-example">' + escHtml(example) + '</div>';
  html += ' <button class="report-problem-btn active-quiz-vocab" data-action="report-problem" data-kind="vocab" title="Report a problem with this card">⚑ Report</button>';
  fb.innerHTML = html;
}

function dontKnowVocab() {
  if (vqAnswered) return;
  vqAnswered = true;
  const q = vqQuestions[vqIndex];
  if (q.type === 'mc' || q.type === 'mc-reverse' || q.type === 'listening-mc') {
    document.querySelectorAll('#vq-answer-area .mc-btn').forEach(b => {
      b.classList.add('disabled');
      if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
    });
  } else {
    const input = document.getElementById('vq-fib-input');
    if (input) { input.disabled = true; input.classList.add('wrong'); }
    _showInlineAnswer('vq-answer-area', q.answer || q.correct);
  }
  _recordMiss(vqMissed, q);
  _trackMistake(_vocabKey(q.word), 'vocab');
  applyFsrsRating(_vocabKey(q.word), FSRS_AGAIN);
  _trackLastSeen(_vocabKey(q.word));
  saveProgress();
  checkAchievements();
  showVocabFeedback(false, q.answer || q.correct, q.word && q.word.example);
  document.getElementById('vq-next-btn').className = 'btn-primary quiz-next-btn show';
}

function nextVocabQuestion() {
  vqIndex++;
  renderVocabQuestion();
}

function showVocabResults() {
  showScreen('vocab-results');
  const total = vqQuestions.length;
  const pct = Math.round((vqCorrect / total) * 100);
  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    document.getElementById('vr-ring').style.strokeDashoffset = offset;
  }, 100);
  document.getElementById('vr-pct').textContent = pct + '%';
  const titles = pct === 100 ? t('Perfect! 🌟') : pct >= 80 ? t('Great job!') : pct >= 50 ? t('Good effort!') : t('Keep practicing!');
  document.getElementById('vr-title').textContent = titles;
  const vqid = vqCatRef || 'vocab';
  const vhist = progress.quizHistory || (progress.quizHistory = {});
  const vprev = vhist[vqid] || { best: -1 };
  if (pct > vprev.best) { vhist[vqid] = { best: pct }; saveProgress(); }
  const vSubParts = [`${t('You scored')} ${toBnDigits(vqCorrect)}/${toBnDigits(total)}`];
  if (_quizStartTime) vSubParts.push('⏱ ' + _formatElapsed(Date.now() - _quizStartTime));
  if (pct > vprev.best && vprev.best >= 0) vSubParts.push(`🌟 ${t('New best!')}`);
  else if (vprev.best >= 0 && vprev.best > pct) vSubParts.push(`${t('Best:')} ${toBnDigits(vprev.best)}%`);
  if (progress.streak > 1) vSubParts.push(`🔥 ${toBnDigits(progress.streak)} ${t('day streak')}`);
  document.getElementById('vr-sub').textContent = vSubParts.join(' · ');
  addXP(5);
  detachQuizKeyHandler();
  updateNav();
  checkAchievements();
  _renderMissedSection(vqMissed, 'vr-missed', 'vr-retry-missed');
  const vContBtn = document.getElementById('vr-continue-review');
  if (vContBtn) vContBtn.style.display = _reviewQueue.length > 0 ? 'inline-block' : 'none';
}

function retryVocabQuiz() {
  if (vmixIsActive || vqCatRef === '__mixed__') {
    startMixedVocabPractice();
  } else if (vqCatRef) {
    vlCatId = vqCatRef;
    vlWords = VOCAB_DATA.filter(w => w.category === vlCatId);
    startVocabQuiz();
  }
}

function retryMissedVocab() {
  if (!vqMissed || vqMissed.length === 0) return;
  const seen = new Set();
  const words = [];
  vqMissed.forEach(m => {
    const w = m._q && m._q.word;
    if (w && !seen.has(w.lemma)) {
      seen.add(w.lemma);
      words.push(w);
    }
  });
  if (words.length === 0) return;
  generateVocabQuiz(words);
  vqIndex = 0; vqCorrect = 0; vqMissed = [];
  document.getElementById('vq-title').textContent = 'Retry Missed';
  showScreen('vocab-quiz');
  renderVocabQuestion();
}

// ════════════════════════════════════════
//  GRAMMAR PROGRESS
// ════════════════════════════════════════
function getGrammarMastery(lessonId, questionIdx) {
  return progress.mastery['g:' + lessonId + ':' + questionIdx] || 0;
}
function getLessonProgress(lesson) {
  const total = lesson.quiz.length;
  let mastered = 0, seen = 0;
  for (let i = 0; i < total; i++) {
    const m = getGrammarMastery(lesson.id, i);
    if (m >= 3) mastered++;
    if (m >= 1) seen++;
  }
  return { total, mastered, seen, pct: Math.round((mastered / total) * 100) };
}

const VERB_CONJUGATION_DATA = {
  'করা': {
    verb: 'করা', roman: 'kora', english: 'to do / make',
    tenses: {
      present: { label: 'Present (habitual)', forms: { tui: ['করিস', 'koris'], tumi: ['করো', 'koro'], apni: ['করেন', 'koren'] } },
      past: { label: 'Past (simple)', forms: { tui: ['করলি', 'korli'], tumi: ['করলে', 'korle'], apni: ['করলেন', 'korlen'] } },
      future: { label: 'Future (simple)', forms: { tui: ['করবি', 'korbi'], tumi: ['করবে', 'korbe'], apni: ['করবেন', 'korben'] } },
      continuous: { label: 'Present continuous', forms: { tui: ['করছিস', 'korchis'], tumi: ['করছ', 'korcho'], apni: ['করছেন', 'korchen'] } },
      perfect: { label: 'Present perfect', forms: { tui: ['করেছিস', 'korechis'], tumi: ['করেছ', 'korecho'], apni: ['করেছেন', 'korechen'] } }
    }
  },
  'হওয়া': {
    verb: 'হওয়া', roman: 'howa', english: 'to be / become',
    tenses: {
      present: { label: 'Present (habitual)', forms: { tui: ['হস', 'hos'], tumi: ['হও', 'hao'], apni: ['হন', 'hon'] } },
      past: { label: 'Past (simple)', forms: { tui: ['হলি', 'holi'], tumi: ['হলে', 'hole'], apni: ['হলেন', 'holen'] } },
      future: { label: 'Future (simple)', forms: { tui: ['হবি', 'hobi'], tumi: ['হবে', 'hobe'], apni: ['হবেন', 'hoben'] } },
      continuous: { label: 'Present continuous', forms: { tui: ['হচ্ছিস', 'hochchis'], tumi: ['হচ্ছ', 'hochcho'], apni: ['হচ্ছেন', 'hochchen'] } },
      perfect: { label: 'Present perfect', forms: { tui: ['হয়েছিস', 'hoyechhis'], tumi: ['হয়েছ', 'hoyechho'], apni: ['হয়েছেন', 'hoyechhen'] } }
    }
  },
  'যাওয়া': {
    verb: 'যাওয়া', roman: 'jaoa', english: 'to go',
    tenses: {
      present: { label: 'Present (habitual)', forms: { tui: ['যাস', 'jas'], tumi: ['যাও', 'jao'], apni: ['যান', 'jan'] } },
      past: { label: 'Past (simple)', forms: { tui: ['গেলি', 'geli'], tumi: ['গেলে', 'gele'], apni: ['গেলেন', 'gelen'] } },
      future: { label: 'Future (simple)', forms: { tui: ['যাবি', 'jabi'], tumi: ['যাবে', 'jabe'], apni: ['যাবেন', 'jaben'] } },
      continuous: { label: 'Present continuous', forms: { tui: ['যাচ্ছিস', 'jachchis'], tumi: ['যাচ্ছ', 'jachcho'], apni: ['যাচ্ছেন', 'jachchen'] } },
      perfect: { label: 'Present perfect', forms: { tui: ['গেছিস', 'gechhis'], tumi: ['গেছ', 'gechho'], apni: ['গেছেন', 'gechhen'] } }
    }
  },
  'দেখা': {
    verb: 'দেখা', roman: 'dekha', english: 'to see',
    tenses: {
      present: { label: 'Present (habitual)', forms: { tui: ['দেখিস', 'dekhis'], tumi: ['দেখো', 'dekho'], apni: ['দেখেন', 'dekhen'] } },
      past: { label: 'Past (simple)', forms: { tui: ['দেখলি', 'dekhli'], tumi: ['দেখলে', 'dekhle'], apni: ['দেখলেন', 'dekhlen'] } },
      future: { label: 'Future (simple)', forms: { tui: ['দেখবি', 'dekhbi'], tumi: ['দেখবে', 'dekhbe'], apni: ['দেখবেন', 'dekhben'] } },
      continuous: { label: 'Present continuous', forms: { tui: ['দেখছিস', 'dekhchis'], tumi: ['দেখছ', 'dekhcho'], apni: ['দেখছেন', 'dekhchen'] } },
      perfect: { label: 'Present perfect', forms: { tui: ['দেখেছিস', 'dekhechis'], tumi: ['দেখেছ', 'dekhecho'], apni: ['দেখেছেন', 'dekhechen'] } }
    }
  },
  'থাকা': {
    verb: 'থাকা', roman: 'thaka', english: 'to stay / remain',
    tenses: {
      present: { label: 'Present (habitual)', forms: { tui: ['থাকিস', 'thakis'], tumi: ['থাকো', 'thako'], apni: ['থাকেন', 'thaken'] } },
      past: { label: 'Past (simple)', forms: { tui: ['থাকলি', 'thakli'], tumi: ['থাকলে', 'thakle'], apni: ['থাকলেন', 'thaklen'] } },
      future: { label: 'Future (simple)', forms: { tui: ['থাকবি', 'thakbi'], tumi: ['থাকবে', 'thakbe'], apni: ['থাকবেন', 'thakben'] } },
      continuous: { label: 'Present continuous', forms: { tui: ['থাকছিস', 'thakchis'], tumi: ['থাকছ', 'thakcho'], apni: ['থাকছেন', 'thakchen'] } },
      perfect: { label: 'Present perfect', forms: { tui: ['থেকেছিস', 'thekechis'], tumi: ['থেকেছ', 'thekecho'], apni: ['থেকেছেন', 'thekechen'] } }
    }
  },
  'দেওয়া': {
    verb: 'দেওয়া', roman: 'deoa', english: 'to give',
    tenses: {
      present: { label: 'Present (habitual)', forms: { tui: ['দিস', 'dis'], tumi: ['দাও', 'dao'], apni: ['দেন', 'den'] } },
      past: { label: 'Past (simple)', forms: { tui: ['দিলি', 'dili'], tumi: ['দিলে', 'dile'], apni: ['দিলেন', 'dilen'] } },
      future: { label: 'Future (simple)', forms: { tui: ['দিবি', 'dibi'], tumi: ['দিবে', 'dibe'], apni: ['দিবেন', 'diben'] } },
      continuous: { label: 'Present continuous', forms: { tui: ['দিচ্ছিস', 'dichchis'], tumi: ['দিচ্ছ', 'dichcho'], apni: ['দিচ্ছেন', 'dichchen'] } },
      perfect: { label: 'Present perfect', forms: { tui: ['দিয়েছিস', 'diyechis'], tumi: ['দিয়েছ', 'diyecho'], apni: ['দিয়েছেন', 'diyechen'] } }
    }
  }
};

const VERB_CONJUGATION_LOOKUP = {
  'করা': 'করা', 'করে': 'করা', 'করি': 'করা', 'করেন': 'করা', 'করতে': 'করা', 'করার': 'করা', 'করছে': 'করা', 'করবে': 'করা', 'করেছে': 'করা', 'করেছেন': 'করা',
  'হওয়া': 'হওয়া', 'হবে': 'হওয়া', 'হচ্ছে': 'হওয়া', 'হয়েছে': 'হওয়া', 'হয়ে': 'হওয়া', 'হতে': 'হওয়া', 'আছে': 'হওয়া', 'নেই': 'হওয়া', 'ছিল': 'হওয়া', 'রয়েছে': 'হওয়া',
  'যাওয়া': 'যাওয়া', 'যায়': 'যাওয়া', 'গেছে': 'যাওয়া',
  'দেখা': 'দেখা', 'দেখি': 'দেখা', 'দেখে': 'দেখা',
  'থাকা': 'থাকা', 'থাকে': 'থাকা',
  'দেওয়া': 'দেওয়া', 'দিতে': 'দেওয়া',
};

let selectedConjVerb = 'করা';

function getConjugationVerbFromLemma(lemma) {
  return VERB_CONJUGATION_LOOKUP[lemma] || null;
}

function renderConjugationTableUI() {
  const mount = document.getElementById('conj-table-ui');
  if (!mount) return;
  const verbKeys = Object.keys(VERB_CONJUGATION_DATA);
  if (!verbKeys.includes(selectedConjVerb)) selectedConjVerb = verbKeys[0];
  const current = VERB_CONJUGATION_DATA[selectedConjVerb];
  const tenseOrder = Object.keys(current.tenses);
  mount.innerHTML = `
    <div class="conj-controls">
      <label class="conj-label" for="conj-verb-select">Verb</label>
      <select id="conj-verb-select" class="conj-select" data-action="select-conj-verb">
        ${verbKeys.map(v => `<option value="${escapeStr(v)}" ${v === selectedConjVerb ? 'selected' : ''}>${v} (${VERB_CONJUGATION_DATA[v].roman})</option>`).join('')}
      </select>
    </div>
    <p class="conj-table-note"><strong>${current.verb}</strong> (${current.roman}) — ${current.english}. Columns are formality levels (তুই/তুমি/আপনি).</p>
    <div class="conj-table-scroll">
      <table class="conj-table">
        <thead>
          <tr>
            <th>Tense</th>
            <th>তুই<br><span class="conj-th-sub">very informal</span></th>
            <th>তুমি<br><span class="conj-th-sub">casual</span></th>
            <th>আপনি<br><span class="conj-th-sub">formal</span></th>
          </tr>
        </thead>
        <tbody>
          ${tenseOrder.map(tk => {
            const t = current.tenses[tk];
            return `<tr>
              <td>${t.label}</td>
              <td><span class="conj-bn">${t.forms.tui[0]}</span><span class="conj-rom">${t.forms.tui[1]}</span></td>
              <td><span class="conj-bn">${t.forms.tumi[0]}</span><span class="conj-rom">${t.forms.tumi[1]}</span></td>
              <td><span class="conj-bn">${t.forms.apni[0]}</span><span class="conj-rom">${t.forms.apni[1]}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <div style="text-align:center;margin-top:16px;">
      <button class="btn-primary" data-action="start-conj-quiz">▶ Conjugation Quiz</button>
    </div>`;
  const sel = document.getElementById('conj-verb-select');
  if (sel) sel.onchange = () => setConjugationVerb(sel.value);
}

function setConjugationVerb(verb) {
  if (!VERB_CONJUGATION_DATA[verb]) return;
  selectedConjVerb = verb;
  renderConjugationTableUI();
}

function openVerbConjugationFromVocab(lemma) {
  const verb = getConjugationVerbFromLemma(lemma);
  if (!verb) return;
  setConjugationVerb(verb);
  switchTab('grammar');
  const wrap = document.getElementById('conj-table-wrap');
  const btn = document.getElementById('conj-toggle-btn');
  if (wrap && btn && wrap.hidden) {
    wrap.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
  }
  const section = document.querySelector('.conj-table-section');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ════════════════════════════════════════
//  VERB CONJUGATION QUIZ
// ════════════════════════════════════════
const CONJ_PRONOUN_LABELS = { tui: 'তুই (very informal)', tumi: 'তুমি (casual)', apni: 'আপনি (formal)' };
const CONJ_PRONOUN_KEYS = ['tui', 'tumi', 'apni'];

function _allConjForms() {
  const forms = [];
  for (const [verbKey, verb] of Object.entries(VERB_CONJUGATION_DATA)) {
    for (const [tenseKey, tense] of Object.entries(verb.tenses)) {
      for (const pKey of CONJ_PRONOUN_KEYS) {
        forms.push({
          verb: verb.verb, verbRoman: verb.roman, verbEnglish: verb.english,
          tenseKey, tenseLabel: tense.label,
          pronoun: pKey, pronounLabel: CONJ_PRONOUN_LABELS[pKey],
          bengali: tense.forms[pKey][0], roman: tense.forms[pKey][1],
        });
      }
    }
  }
  return forms;
}

function generateConjugationQuiz() {
  const allForms = _allConjForms();
  const selected = shuffle([...allForms]).slice(0, 10);
  const questions = [];

  selected.forEach((f, i) => {
    const qTypeRoll = i % 5; // 0,1,2 = MC-form; 3 = MC-identify; 4 = FIB

    if (qTypeRoll <= 2) {
      // MC: given verb+tense+pronoun → pick correct Bengali form
      const correct = f.bengali;
      const distractors = shuffle(allForms
        .filter(x => x.bengali !== correct)
        .map(x => x.bengali))
        .slice(0, 3);
      questions.push({
        type: 'mc',
        prompt: `${f.verb} (${f.verbEnglish}) — ${f.tenseLabel}, ${f.pronounLabel}?`,
        correct,
        options: shuffle([correct, ...distractors]),
        _conjForm: f,
      });
    } else if (qTypeRoll === 3) {
      // MC: given a conjugated form → identify tense + pronoun
      const correct = `${f.tenseLabel} — ${f.pronounLabel}`;
      const distractors = shuffle(allForms
        .filter(x => !(x.tenseKey === f.tenseKey && x.pronoun === f.pronoun))
        .map(x => `${x.tenseLabel} — ${x.pronounLabel}`))
        .filter(x => x !== correct);
      const picks = [...new Set(distractors)].slice(0, 3);
      questions.push({
        type: 'mc',
        prompt: `"${f.bengali}" (${f.verb}) is which form?`,
        bengali: f.bengali,
        correct,
        options: shuffle([correct, ...picks]),
        _conjForm: f,
      });
    } else {
      // FIB: type the conjugated form
      const _fibMode = getFibMode();
      const acceptable = [f.roman.toLowerCase()];
      const prompt = _fibMode === 'bengali'
        ? `Type the ${f.pronounLabel} ${f.tenseLabel.toLowerCase()} form of ${f.verb}:`
        : `Type the romanization for ${f.verb} — ${f.tenseLabel}, ${f.pronounLabel}:`;
      const answer = _fibMode === 'bengali' ? f.bengali : f.roman;
      questions.push({
        type: 'fib',
        prompt,
        acceptable,
        answer,
        hint: `${f.verbEnglish}`,
        _conjForm: f,
      });
    }
  });

  return questions;
}

let conjQuizQuestions = [], conjQuizIndex = 0, conjQuizCorrect = 0, conjQuizMissed = [];

function startConjugationQuiz() {
  conjQuizQuestions = generateConjugationQuiz();
  conjQuizIndex = 0;
  conjQuizCorrect = 0;
  conjQuizMissed = [];
  _quizStartTime = Date.now();
  document.getElementById('vq-title').textContent = 'Conjugation Quiz';
  showScreen('vocab-quiz');
  renderConjQuizQuestion();
  updateStreak();
}

function renderConjQuizQuestion() {
  if (conjQuizIndex >= conjQuizQuestions.length) { showConjQuizResults(); return; }
  vqAnswered = false;
  const q = conjQuizQuestions[conjQuizIndex];

  document.getElementById('vq-progress-fill').style.width =
    ((conjQuizIndex / conjQuizQuestions.length) * 100) + '%';
  document.getElementById('vq-score').textContent = conjQuizCorrect + ' / ' + conjQuizIndex;

  const qa = document.getElementById('vq-question-area');
  if (q.type === 'mc') {
    qa.innerHTML = `
      <div class="quiz-prompt">${escHtml(q.prompt)}</div>
      ${q.bengali ? `<div class="vq-bengali">${escHtml(q.bengali)}</div>` : ''}
      <div class="mc-options">
        ${q.options.map(opt => `<button class="mc-btn" data-action="conj-quiz-mc" data-answer="${escapeStr(opt)}">${escHtml(opt)}</button>`).join('')}
      </div>`;
  } else {
    qa.innerHTML = `
      <div class="quiz-prompt">${escHtml(q.prompt)}</div>
      <div class="vq-hint">${escHtml(q.hint)}</div>
      <input class="fib-input" type="text" id="conj-fib-input" autocomplete="off" placeholder="Type your answer…">
      <button class="btn-primary" data-action="conj-quiz-fib-submit">Check</button>`;
    const fibInput = document.getElementById('conj-fib-input');
    if (fibInput) {
      fibInput.focus();
      showBengaliKbd('conj-fib-input');
      fibInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') document.querySelector('[data-action="conj-quiz-fib-submit"]')?.click();
      });
    }
  }
}

function handleConjQuizMC(answer) {
  if (vqAnswered) return;
  vqAnswered = true;
  const q = conjQuizQuestions[conjQuizIndex];
  const correct = answer === q.correct;
  if (correct) conjQuizCorrect++;
  else conjQuizMissed.push(q);

  document.getElementById('vq-question-area').querySelectorAll('.mc-btn').forEach(btn => {
    const val = btn.getAttribute('data-answer');
    if (val === q.correct) btn.classList.add('correct');
    else if (val === answer && !correct) btn.classList.add('wrong');
    btn.disabled = true;
  });

  const f = q._conjForm;
  const feedbackHtml = `<div class="vq-feedback ${correct ? 'correct' : 'wrong'}">${correct ? 'Correct!' : `Answer: ${escHtml(q.correct)}`}</div>
    <div class="vq-hint" style="margin-top:8px">${escHtml(f.verb)} (${escHtml(f.verbRoman)}) — ${escHtml(f.tenseLabel)}, ${escHtml(f.pronounLabel)}: <strong>${escHtml(f.bengali)}</strong> (${escHtml(f.roman)})</div>`;
  document.getElementById('vq-question-area').insertAdjacentHTML('beforeend', feedbackHtml);

  setTimeout(() => { conjQuizIndex++; renderConjQuizQuestion(); }, correct ? 1000 : 2000);
}

function handleConjQuizFIB() {
  if (vqAnswered) return;
  const q = conjQuizQuestions[conjQuizIndex];
  const input = document.getElementById('conj-fib-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  vqAnswered = true;
  hideBengaliKbd();

  const correct = val === q._conjForm.bengali || q.acceptable.includes(val.toLowerCase());
  if (correct) conjQuizCorrect++;
  else conjQuizMissed.push(q);

  const f = q._conjForm;
  input.disabled = true;
  input.classList.add(correct ? 'correct' : 'wrong');
  const feedbackHtml = `<div class="vq-feedback ${correct ? 'correct' : 'wrong'}">${correct ? 'Correct!' : `Answer: ${escHtml(q.answer)}`}</div>
    <div class="vq-hint" style="margin-top:8px">${escHtml(f.verb)} (${escHtml(f.verbRoman)}) — ${escHtml(f.tenseLabel)}, ${escHtml(f.pronounLabel)}: <strong>${escHtml(f.bengali)}</strong> (${escHtml(f.roman)})</div>`;
  document.getElementById('vq-question-area').insertAdjacentHTML('beforeend', feedbackHtml);

  setTimeout(() => { conjQuizIndex++; renderConjQuizQuestion(); }, correct ? 1000 : 2500);
}

function showConjQuizResults() {
  const elapsed = Math.round((Date.now() - _quizStartTime) / 1000);
  const pct = Math.round((conjQuizCorrect / conjQuizQuestions.length) * 100);
  addXP(conjQuizCorrect * 10, 'grammar');

  const qa = document.getElementById('vq-question-area');
  qa.innerHTML = `
    <div class="quiz-results">
      <h2>Conjugation Quiz Complete!</h2>
      <div class="quiz-results-score">${conjQuizCorrect} / ${conjQuizQuestions.length} correct (${pct}%)</div>
      <div class="quiz-results-time">Time: ${elapsed}s</div>
      ${conjQuizMissed.length ? `<div class="quiz-results-missed"><strong>Review these:</strong><ul>${conjQuizMissed.map(q => {
        const f = q._conjForm;
        return `<li>${escHtml(f.verb)} — ${escHtml(f.tenseLabel)}, ${escHtml(f.pronounLabel)}: <strong>${escHtml(f.bengali)}</strong> (${escHtml(f.roman)})</li>`;
      }).join('')}</ul></div>` : ''}
      <div style="margin-top:16px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button class="btn-primary" data-action="start-conj-quiz">Try Again</button>
        <button class="nav-btn" data-action="show-screen" data-screen="grammar-home">Back to Grammar</button>
      </div>
    </div>`;
  document.getElementById('vq-progress-fill').style.width = '100%';
  document.getElementById('vq-score').textContent = conjQuizCorrect + ' / ' + conjQuizQuestions.length;
}

// ════════════════════════════════════════
//  GRAMMAR HOME
// ════════════════════════════════════════
function renderGrammarHome() {
  renderConjugationTableUI();
  const grid = document.getElementById('grammar-module-grid');
  grid.innerHTML = '';
  // Remove stale PT card first, then re-add if needed
  const oldPt = grid.parentElement.querySelector('.pt-cta-card');
  if (oldPt) oldPt.remove();
  if (shouldShowPlacementCard()) {
    const ptCard = document.createElement('div');
    ptCard.className = 'pt-cta-card';
    ptCard.innerHTML = '<h3>🎯 Take the Placement Test</h3><p>Already know some Bengali? Skip ahead based on your level.</p>';
    ptCard.onclick = () => startPlacementTest();
    grid.parentElement.insertBefore(ptCard, grid);
  }

  // Mixed practice card
  const mixCard = document.createElement('div');
  mixCard.className = 'module-card';
  const unlocked = getGrammarMixedUnlockedCount();
  const totalLessons = GRAMMAR_LESSONS.length;
  const totalQ = GRAMMAR_LESSONS.reduce((s, l) => s + l.quiz.length, 0);
  let masteredQ = 0;
  GRAMMAR_LESSONS.forEach(l => {
    for (let i = 0; i < l.quiz.length; i++) {
      if (getGrammarMastery(l.id, i) >= 3) masteredQ++;
    }
  });
  const mixPct = Math.round((masteredQ / totalQ) * 100);
  mixCard.innerHTML = `
    <div class="module-icon">🧠</div>
    <h3>Mixed Practice</h3>
    <p>Adaptive review across all unlocked grammar lessons</p>
    <div class="module-progress"><div class="module-progress-fill" style="width:${mixPct}%;background:var(--accent)"></div></div>
    <div class="progress-label">${masteredQ}/${totalQ} mastered · ${unlocked}/${totalLessons} lessons unlocked</div>
  `;
  mixCard.onclick = () => startGrammarMixedPractice();
  grid.appendChild(mixCard);

  // Lesson cards
  GRAMMAR_LESSONS.forEach((lesson, idx) => {
    const card = document.createElement('div');
    card.className = 'module-card';
    const prog = getLessonProgress(lesson);
    // Cosmetic lock: show if this is not the first lesson and the previous lesson has 0 mastered
    const prevLesson = idx > 0 ? GRAMMAR_LESSONS[idx - 1] : null;
    const locked = prevLesson && getLessonProgress(prevLesson).mastered === 0;
    card.innerHTML = `
      ${locked ? '<span class="lock-badge">🔒</span>' : ''}
      <div class="module-icon">📖</div>
      <h3>${lesson.number}. ${lesson.title}</h3>
      <p>${lesson.shortDesc}</p>
      <div class="module-progress"><div class="module-progress-fill" style="width:${prog.pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${prog.mastered}/${prog.total} mastered</div>
    `;
    if (!locked) {
      card.onclick = () => openGrammarLesson(lesson.id);
    } else {
      card.style.cursor = 'not-allowed';
      card.style.opacity = '0.6';
    }
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════
//  GRAMMAR LESSON VIEW
// ════════════════════════════════════════
let currentGrammarLesson = null;

function openGrammarLesson(lessonId) {
  const lesson = GRAMMAR_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  currentGrammarLesson = lesson;

  document.getElementById('gl-title').textContent = lesson.number + '. ' + lesson.title;
  _glCardIdx = 0;
  const content = document.getElementById('gl-content');
  content.innerHTML = `
    <h2>${lesson.title}</h2>
    <div class="grammar-desc">${lesson.shortDesc}</div>
    <div class="grammar-explanation">${lesson.explanation}</div>
    <h3 style="margin-bottom:12px;">Example Cards</h3>
    <div class="gl-card-area">
      <div class="gl-flashcard" id="gl-card" data-action="flip-gl-card">
        <div class="gl-card-face gl-card-front" id="gl-card-front"></div>
        <div class="gl-card-face gl-card-back" id="gl-card-back"></div>
      </div>
      <div class="gl-card-hint" id="gl-card-hint">Tap card to reveal</div>
      <div class="learn-nav" style="margin-top:12px">
        <button class="nav-btn" id="gl-prev-btn" data-action="prev-gl-card">← Prev</button>
        <span id="gl-card-counter" style="font-size:0.85rem;color:var(--text-dim)"></span>
        <button class="nav-btn" id="gl-next-btn" data-action="next-gl-card">Next →</button>
      </div>
    </div>
    <div class="grammar-lesson-actions">
      <button class="btn-primary" data-action="start-grammar-quiz">Start Quiz →</button>
    </div>
  `;
  renderGlCard();
  showScreen('grammar-lesson');
}

// ── Grammar lesson example cards ───────────────────────────────────
let _glCardIdx = 0;

function renderGlCard() {
  if (!currentGrammarLesson) return;
  const examples = currentGrammarLesson.examples;
  const ex = examples[_glCardIdx];
  const card = document.getElementById('gl-card');
  if (!card) return;
  card.classList.remove('flipped');
  document.getElementById('gl-card-front').innerHTML =
    `<div class="ge-bengali">${displayBengali(ex.bengali, ex.roman)}</div>`;
  document.getElementById('gl-card-back').innerHTML =
    `<div class="ge-roman">${ex.roman}</div><div class="ge-english">${ex.english}</div>`;
  document.getElementById('gl-card-counter').textContent =
    ((_glCardIdx + 1) + ' / ' + examples.length);
  document.getElementById('gl-card-hint').textContent = 'Tap card to reveal';
  document.getElementById('gl-prev-btn').style.visibility = _glCardIdx === 0 ? 'hidden' : 'visible';
  document.getElementById('gl-next-btn').style.visibility =
    _glCardIdx >= examples.length - 1 ? 'hidden' : 'visible';
}

function flipGlCard() {
  const card = document.getElementById('gl-card');
  if (!card) return;
  card.classList.toggle('flipped');
  const hint = document.getElementById('gl-card-hint');
  if (hint) hint.textContent = card.classList.contains('flipped') ? '' : 'Tap card to reveal';
}

function prevGlCard() {
  if (_glCardIdx > 0) { _glCardIdx--; renderGlCard(); }
}

function nextGlCard() {
  if (!currentGrammarLesson) return;
  if (_glCardIdx < currentGrammarLesson.examples.length - 1) { _glCardIdx++; renderGlCard(); }
}

// ════════════════════════════════════════
//  GRAMMAR QUIZ
// ════════════════════════════════════════
let gqQuestions = [];
let gqIndex = 0;
let gqCorrect = 0;
let gqAnswered = false;
let gqIsMixed = false;
let gqWordOrder = [];  // current word-order answer
let gqMissed = [];

function startGrammarQuiz(options = {}) {
  const hasScopedQuestions = Array.isArray(options.questions) && options.questions.length > 0;
  if (!hasScopedQuestions && !currentGrammarLesson) return;
  gqIsMixed = false;
  gqQuestions = hasScopedQuestions ? [...options.questions] : [...currentGrammarLesson.quiz];
  gqIndex = 0;
  gqCorrect = 0;
  gqMissed = [];
  _quizStartTime = Date.now();
  const defaultTitle = currentGrammarLesson ? currentGrammarLesson.title + ' Quiz' : 'Grammar Quiz';
  document.getElementById('gq-title').textContent = options.title || defaultTitle;
  showScreen('grammar-quiz');
  renderGrammarQuestion();
  updateStreak();
}

function renderGrammarQuestion() {
  if (gqIndex >= gqQuestions.length) {
    showGrammarResults();
    return;
  }
  gqAnswered = false;
  gqWordOrder = [];
  const q = gqQuestions[gqIndex];

  document.getElementById('gq-progress-fill').style.width =
    ((gqIndex / gqQuestions.length) * 100) + '%';
  document.getElementById('gq-score').textContent = gqCorrect + ' / ' + gqIndex;

  const qa = document.getElementById('gq-question-area');
  const aa = document.getElementById('gq-answer-area');
  const fb = document.getElementById('gq-feedback');
  fb.className = 'quiz-feedback';
  fb.textContent = '';
  document.getElementById('gq-next-btn').className = 'btn-primary quiz-next-btn';
  document.getElementById('gq-rating-area').classList.remove('show');
  _pendingRating = null;

  // Build question area based on type
  if (q.type === 'translate-mc') {
    if (q.bengali) {
      qa.innerHTML = `
        <div class="quiz-prompt">${t(q.prompt)}</div>
        <div class="vq-bengali">${displayBengali(q.bengali, q.roman)}</div>
        ${q.roman ? '<div class="vq-hint">' + q.roman + '</div>' : ''}
      `;
    } else {
      qa.innerHTML = `<div class="quiz-prompt">${t(q.prompt)}</div>`;
    }
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-mc-grammar">${opt}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-grammar">${t("I don't know")}</button>`;
    attachQuizKeyHandler('gq');

  } else if (q.type === 'fib') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div style="font-family:'Noto Sans Bengali',sans-serif;font-size:1.5rem;margin:12px 0">${escHtml(q.sentence)}</div>
      ${q.roman ? '<div class="vq-hint">' + escHtml(q.roman) + '</div>' : ''}
      ${q.english ? '<div class="vq-hint">' + escHtml(q.english) + '</div>' : ''}
    `;
    const gqKbdHtml = getFibMode() !== 'latin'
      ? `<button class="bng-kbd-toggle" data-action="show-kbd" data-input="gq-fib-input">বাং ▲</button>` : '';
    aa.innerHTML = `<div class="fib-area">
      <input type="text" class="fib-input" id="gq-fib-input" placeholder="${t('Type your answer…')}"
        autocomplete="off" autocapitalize="off">
      <button class="btn-primary fib-submit" data-action="answer-grammar-fib">${t('Check')}</button>
      ${gqKbdHtml}
    </div>
    <button class="idk-btn" data-action="dont-know-grammar">${t("I don't know")}</button>`;
    setTimeout(() => document.getElementById('gq-fib-input')?.focus(), 100);

  } else if (q.type === 'word-order') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      ${q.english ? '<div class="vq-hint">' + escHtml(q.english) + '</div>' : ''}
    `;
    const shuffled = shuffle([...q.words]);
    aa.innerHTML = `<div class="word-order-area">
      <div class="answer-area-wo" id="gq-answer-wo"></div>
      <div class="word-tiles" id="gq-word-tiles">
        ${shuffled.map((w, i) => `<div class="word-tile" data-idx="${i}" data-word="${escapeStr(w)}" data-action="select-word-tile">${escHtml(w)}</div>`).join('')}
      </div>
      <button class="btn-primary wo-check-btn" data-action="check-word-order">${t('Check Order')}</button>
    </div>
    <button class="idk-btn" data-action="dont-know-grammar">${t("I don't know")}</button>`;

  } else if (q.type === 'error-spot') {
    qa.innerHTML = `<div class="quiz-prompt">${t(q.prompt)}</div>`;
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-mc-grammar">${escHtml(opt)}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-grammar">${t("I don't know")}</button>`;
    attachQuizKeyHandler('gq');
  }
}

function answerGrammarMC(btn, chosen) {
  if (gqAnswered) return;
  gqAnswered = true;
  const q = gqQuestions[gqIndex];
  const correct = chosen === q.correct;
  document.querySelectorAll('#gq-answer-area .mc-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
  });
  btn.classList.add(correct ? 'correct' : 'wrong');
  const lessonId = q._lessonId || currentGrammarLesson.id;
  const qIdx = q._qIdx != null ? q._qIdx : gqIndex;
  const gKey = 'g:' + lessonId + ':' + qIdx;
  if (correct) {
    gqCorrect++; addXP(10);
    showGrammarFeedback(true, q.explanation || q.correct);
    showRatingButtons(gKey, 'gq-rating-area', 'gq-next-btn', ['g:' + lessonId]);
  } else {
    _recordMiss(gqMissed, q);
    _trackMistake(gKey, 'grammar');
    applyFsrsRating(gKey, FSRS_AGAIN);
    _trackLastSeen(gKey);
    _trackLastSeen('g:' + lessonId);
    saveProgress();
    checkAchievements();
    showGrammarFeedback(false, q.explanation || q.correct);
    document.getElementById('gq-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function answerGrammarFIB() {
  if (gqAnswered) return;
  const input = document.getElementById('gq-fib-input');
  if (!input) return;
  const rawInput = input.value.trim();
  const val = rawInput.toLowerCase();
  if (!val) return;
  gqAnswered = true;
  const q = gqQuestions[gqIndex];
  const normVal = _normRoman(val);
  const fibMode = getFibMode();
  // Bengali-only mode: only accept Bengali script matches
  const correct = fibMode === 'bengali'
    ? q.acceptable.some(a => _isBengali(a) && a === rawInput)
    : (q.acceptable.some(a => a.toLowerCase() === val || _normRoman(a) === normVal) ||
       q.acceptable.some(a => a === rawInput));
  input.classList.add(correct ? 'correct' : 'wrong');
  const lessonId = q._lessonId || currentGrammarLesson.id;
  const qIdx = q._qIdx != null ? q._qIdx : gqIndex;
  const gFibKey = 'g:' + lessonId + ':' + qIdx;
  if (correct) {
    gqCorrect++; addXP(15);
    showGrammarFeedback(true, q.answer, false);
    showRatingButtons(gFibKey, 'gq-rating-area', 'gq-next-btn', ['g:' + lessonId]);
  } else {
    _showInlineAnswer('gq-answer-area', q.answer);
    _recordMiss(gqMissed, q);
    _trackMistake(gFibKey, 'grammar');
    applyFsrsRating(gFibKey, FSRS_AGAIN);
    _trackLastSeen(gFibKey);
    _trackLastSeen('g:' + lessonId);
    saveProgress();
    checkAchievements();
    showGrammarFeedback(false, q.answer, q.explanation);
    document.getElementById('gq-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function selectWordTile(tile) {
  if (gqAnswered) return;
  const word = tile.dataset.word;
  tile.classList.add('used');
  gqWordOrder.push(word);
  const ansArea = document.getElementById('gq-answer-wo');
  const placed = document.createElement('div');
  placed.className = 'word-tile';
  placed.textContent = word;
  placed.dataset.srcIdx = tile.dataset.idx;
  placed.onclick = function() { removeWordTile(this); };
  ansArea.appendChild(placed);
}

function removeWordTile(placed) {
  if (gqAnswered) return;
  const srcIdx = placed.dataset.srcIdx;
  const word = placed.textContent;
  // Re-enable source tile
  const tiles = document.querySelectorAll('#gq-word-tiles .word-tile');
  tiles.forEach(t => { if (t.dataset.idx === srcIdx) t.classList.remove('used'); });
  gqWordOrder = gqWordOrder.filter((_, i) => {
    // Remove the first occurrence of this word
    return true;
  });
  // Rebuild gqWordOrder from current answer area
  placed.remove();
  gqWordOrder = [];
  document.querySelectorAll('#gq-answer-wo .word-tile').forEach(t => {
    gqWordOrder.push(t.textContent);
  });
}

function checkWordOrder() {
  if (gqAnswered) return;
  if (gqWordOrder.length === 0) return;
  gqAnswered = true;
  const q = gqQuestions[gqIndex];
  const correct = gqWordOrder.length === q.correct.length &&
    gqWordOrder.every((w, i) => w === q.correct[i]);
  const ansArea = document.getElementById('gq-answer-wo');
  ansArea.classList.add(correct ? 'correct-wo' : 'wrong-wo');
  // Disable remaining tiles
  document.querySelectorAll('#gq-word-tiles .word-tile').forEach(t => t.style.pointerEvents = 'none');
  document.querySelectorAll('#gq-answer-wo .word-tile').forEach(t => t.style.pointerEvents = 'none');
  const lessonId = q._lessonId || currentGrammarLesson.id;
  const qIdx = q._qIdx != null ? q._qIdx : gqIndex;
  const gWoKey = 'g:' + lessonId + ':' + qIdx;
  const woAnswer = q.correct.join(' ') + (q.roman ? ' (' + q.roman + ')' : '');
  if (correct) {
    gqCorrect++; addXP(15);
    showGrammarFeedback(true, woAnswer, false);
    showRatingButtons(gWoKey, 'gq-rating-area', 'gq-next-btn', ['g:' + lessonId]);
  } else {
    _showInlineAnswer('gq-answer-area', woAnswer);
    _recordMiss(gqMissed, q);
    _trackMistake(gWoKey, 'grammar');
    applyFsrsRating(gWoKey, FSRS_AGAIN);
    _trackLastSeen(gWoKey);
    _trackLastSeen('g:' + lessonId);
    saveProgress();
    checkAchievements();
    showGrammarFeedback(false, woAnswer, q.explanation);
    document.getElementById('gq-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function showGrammarFeedback(correct, answer, explanation) {
  const fb = document.getElementById('gq-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  let html = correct ? '✓ Correct! ' + escHtml(answer) : '✗ Correct answer: ' + escHtml(answer);
  if (!correct && explanation && explanation !== answer) html += '<div class="fb-example">' + escHtml(explanation) + '</div>';
  html += ' <button class="report-problem-btn active-quiz-grammar" data-action="report-problem" data-kind="grammar" title="Report a problem with this card">⚑ Report</button>';
  fb.innerHTML = html;
}

function dontKnowGrammar() {
  if (gqAnswered) return;
  gqAnswered = true;
  const q = gqQuestions[gqIndex];
  if (q.type === 'translate-mc' || q.type === 'error-spot') {
    document.querySelectorAll('#gq-answer-area .mc-btn').forEach(b => {
      b.classList.add('disabled');
      if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
    });
    showGrammarFeedback(false, q.explanation || q.correct);
  } else if (q.type === 'fib') {
    const input = document.getElementById('gq-fib-input');
    if (input) { input.disabled = true; input.classList.add('wrong'); }
    showGrammarFeedback(false, q.answer, q.explanation);
    _showInlineAnswer('gq-answer-area', q.answer);
  } else if (q.type === 'word-order') {
    document.querySelectorAll('#gq-word-tiles .word-tile').forEach(t => t.style.pointerEvents = 'none');
    document.querySelectorAll('#gq-answer-wo .word-tile').forEach(t => t.style.pointerEvents = 'none');
    const woAnswer = q.correct.join(' ') + (q.roman ? ' (' + q.roman + ')' : '');
    showGrammarFeedback(false, woAnswer, q.explanation);
    _showInlineAnswer('gq-answer-area', woAnswer);
  }
  _recordMiss(gqMissed, q);
  const lessonId = q._lessonId || currentGrammarLesson.id;
  const qIdx = q._qIdx != null ? q._qIdx : gqIndex;
  const gDkKey = 'g:' + lessonId + ':' + qIdx;
  _trackMistake(gDkKey, 'grammar');
  applyFsrsRating(gDkKey, FSRS_AGAIN);
  _trackLastSeen(gDkKey);
  _trackLastSeen('g:' + lessonId);
  saveProgress();
  checkAchievements();
  document.getElementById('gq-next-btn').className = 'btn-primary quiz-next-btn show';
}

function nextGrammarQuestion() {
  gqIndex++;
  renderGrammarQuestion();
}

// ════════════════════════════════════════
//  GRAMMAR RESULTS
// ════════════════════════════════════════
function showGrammarResults() {
  showScreen('grammar-results');
  const total = gqQuestions.length;
  const pct = Math.round((gqCorrect / total) * 100);
  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    document.getElementById('gr-ring').style.strokeDashoffset = offset;
  }, 100);
  document.getElementById('gr-pct').textContent = pct + '%';
  const grTitles = pct === 100 ? t('Perfect! 🌟') : pct >= 80 ? t('Great job!') : pct >= 50 ? t('Good effort!') : t('Keep practicing!');
  document.getElementById('gr-title').textContent = grTitles;
  const gqid = gqIsMixed ? 'grammar-mixed' : (currentGrammarLesson ? currentGrammarLesson.id : 'grammar');
  const ghist = progress.quizHistory || (progress.quizHistory = {});
  const gprev = ghist[gqid] || { best: -1 };
  if (pct > gprev.best) { ghist[gqid] = { best: pct }; saveProgress(); }
  const gSubParts = [`${t('You scored')} ${toBnDigits(gqCorrect)}/${toBnDigits(total)}`];
  if (_quizStartTime) gSubParts.push('⏱ ' + _formatElapsed(Date.now() - _quizStartTime));
  if (pct > gprev.best && gprev.best >= 0) gSubParts.push(`🌟 ${t('New best!')}`);
  else if (gprev.best >= 0 && gprev.best > pct) gSubParts.push(`${t('Best:')} ${toBnDigits(gprev.best)}%`);
  if (progress.streak > 1) gSubParts.push(`🔥 ${toBnDigits(progress.streak)} ${t('day streak')}`);
  document.getElementById('gr-sub').textContent = gSubParts.join(' · ');
  addXP(5);
  detachQuizKeyHandler();
  updateNav();
  checkAchievements();
  _renderMissedSection(gqMissed, 'gr-missed', 'gr-retry-missed');
  const gContBtn = document.getElementById('gr-continue-review');
  if (gContBtn) gContBtn.style.display = _reviewQueue.length > 0 ? 'inline-block' : 'none';
}

function retryGrammarQuiz() {
  if (gqIsMixed) {
    startGrammarMixedPractice();
  } else if (currentGrammarLesson) {
    startGrammarQuiz();
  }
}

function retryMissedGrammar() {
  if (!gqMissed || gqMissed.length === 0) return;
  const seen = new Set();
  const questions = [];
  gqMissed.forEach(m => {
    if (!m._q) return;
    const key = `${m._q._lessonId}:${m._q._qIdx}`;
    if (!seen.has(key)) {
      seen.add(key);
      questions.push(m._q);
    }
  });
  if (questions.length === 0) return;
  gqQuestions = questions;
  gqIndex = 0; gqCorrect = 0; gqMissed = [];
  document.getElementById('gq-title').textContent = 'Retry Missed';
  showScreen('grammar-quiz');
  renderGrammarQuestion();
}

// ════════════════════════════════════════
//  GRAMMAR MIXED PRACTICE
// ════════════════════════════════════════
function getGrammarMixedUnlockedCount() {
  // Unlock in waves of 3 lessons. A wave unlocks when 60% of questions
  // in the previous wave have mastery >= 2.
  const WAVE = 3;
  let unlocked = WAVE;
  while (unlocked < GRAMMAR_LESSONS.length) {
    const waveStart = unlocked - WAVE;
    const waveLessons = GRAMMAR_LESSONS.slice(waveStart, unlocked);
    let totalQ = 0, familiarQ = 0;
    waveLessons.forEach(l => {
      for (let i = 0; i < l.quiz.length; i++) {
        totalQ++;
        if (getGrammarMastery(l.id, i) >= 2) familiarQ++;
      }
    });
    if (familiarQ >= Math.ceil(totalQ * 0.6)) {
      unlocked = Math.min(unlocked + WAVE, GRAMMAR_LESSONS.length);
    } else {
      break;
    }
  }
  return unlocked;
}

function startGrammarMixedPractice() {
  const unlocked = getGrammarMixedUnlockedCount();
  const pool = GRAMMAR_LESSONS.slice(0, unlocked);

  // Collect all questions with lesson metadata, weighted by mastery
  let allQs = [];
  pool.forEach(lesson => {
    lesson.quiz.forEach((q, i) => {
      const m = getGrammarMastery(lesson.id, i);
      allQs.push({ ...q, _lessonId: lesson.id, _qIdx: i, _mastery: m });
    });
  });

  // Sort by mastery ascending (lowest first) with some randomness for mastered ones
  allQs.sort((a, b) => {
    const sa = a._mastery === 3 ? 3 + Math.random() * 2 : a._mastery === 0 ? 0.5 : a._mastery;
    const sb = b._mastery === 3 ? 3 + Math.random() * 2 : b._mastery === 0 ? 0.5 : b._mastery;
    return sa - sb;
  });

  gqQuestions = allQs.slice(0, 12);
  gqIndex = 0;
  gqCorrect = 0;
  gqMissed = [];
  gqIsMixed = true;
  _quizStartTime = Date.now();
  currentGrammarLesson = currentGrammarLesson || GRAMMAR_LESSONS[0]; // fallback
  document.getElementById('gq-title').textContent = 'Mixed Grammar Practice';
  showScreen('grammar-quiz');
  renderGrammarQuestion();
  updateStreak();
}

// ════════════════════════════════════════
//  PLACEMENT TEST
// ════════════════════════════════════════
let ptQuestions = [];
let ptIndex = 0;
let ptCorrect = 0;
let ptAnswered = false;
let ptWordOrder = [];
let ptDifficulty = 'beginner'; // 'beginner' | 'intermediate' | 'advanced'
let ptLength = 'medium';       // 'short' | 'medium' | 'long'
let ptStageResults = {
  alphabet:   { correct: 0, total: 0, waves: {} },
  vocabulary: { correct: 0, total: 0, waves: {} },
  grammar:    { correct: 0, total: 0, waves: {} },
  phrases:    { correct: 0, total: 0, waves: {} },
};
let ptPendingMastery = {};
let ptTotalExpected = 35; // may be less with early termination

function shouldShowPlacementCard() {
  if (progress.placementTaken) return false;
  const masteryKeys = Object.keys(progress.mastery);
  return masteryKeys.length < 10;
}

function buildPlacementQuestions() {
  const questions = [];

  // ── Config: wave pools and difficulty/length parameters ──
  // Each pool has 10 evenly-spaced sample points across the curriculum.
  const alphaPool   = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const vocabPool   = [0, 5, 10, 20, 30, 50, 80, 120, 160, 200];
  const grammarPool = [0, 2, 5, 8, 11, 14, 17, 21, 25, 30];

  // Number of sample waves per stage by test length
  const waveCounts  = { short: 2, medium: 5, long: 6 };
  // Number of phrase situations sampled by test length
  const phraseCounts = { short: 2, medium: 5, long: 12 };
  // Starting offset into the pool by difficulty (skips easy content for advanced learners)
  const diffOffsets = { beginner: 0, intermediate: 2, advanced: 4 };

  const waveN   = waveCounts[ptLength]   || 5;
  const phraseN = phraseCounts[ptLength] || 5;
  const off     = diffOffsets[ptDifficulty] || 0;

  const alphaWaveIndices    = alphaPool.slice(off, off + waveN);
  const vocabWaveIndices    = vocabPool.slice(off, off + waveN);
  const grammarLessonIndices = grammarPool.slice(off, off + waveN);
  const phraseSituations    = PHRASES_WAVE_ORDER.slice(0, phraseN);

  // ── ALPHABET: 2 questions per wave (MC + FIB) ──
  alphaWaveIndices.forEach((waveIdx) => {
    const start = waveIdx * MIXED_WAVE_SIZE;
    const waveLetters = MIXED_CURRICULUM.slice(start, start + MIXED_WAVE_SIZE).filter(Boolean);
    if (waveLetters.length === 0) return;

    // Question 1: MC — name identification
    const l1 = waveLetters[Math.floor(Math.random() * waveLetters.length)];
    const correctName = l1.name.split(' ')[0];
    const distractors = generateDistractors(l1, ALL_LETTERS, 'name', ALL_LETTERS);
    questions.push({
      stage: 'alphabet', wave: waveIdx, type: 'mc',
      letter: l1.letter, letterType: l1.type,
      prompt: 'What is the name of this letter?',
      correct: correctName,
      options: shuffle([correctName, ...distractors]),
      fullAnswer: l1.name, letterObj: l1,
    });

    // Question 2: FIB — romanized form
    const l2 = waveLetters[(Math.floor(Math.random() * (waveLetters.length - 1)) + 1) % waveLetters.length];
    const acceptable = l2.romanized.split('/').map(s => s.trim().toLowerCase());
    acceptable.forEach(a => {
      acceptable.push(a.replace(/[ṭḍṇṣṛñ]/g, c =>
        ({ṭ:'t',ḍ:'d',ṇ:'n',ṣ:'sh',ṛ:'r',ñ:'ny'}[c]||c)));
    });
    questions.push({
      stage: 'alphabet', wave: waveIdx, type: 'fib',
      letter: l2.letter, letterType: l2.type,
      prompt: 'Type the romanized form of this letter:',
      acceptable: [...new Set(acceptable)],
      answer: l2.romanized,
      hint: 'Hint: ' + l2.name, letterObj: l2,
    });
  });

  // ── VOCABULARY: 2 questions per wave (MC + FIB) ──
  vocabWaveIndices.forEach((waveIdx) => {
    const start = waveIdx * VMIX_WAVE_SIZE;
    const waveWords = VMIX_CURRICULUM.slice(start, start + VMIX_WAVE_SIZE);
    if (waveWords.length === 0) return;

    // Question 1: MC — Bengali to English
    const w1 = waveWords[Math.floor(Math.random() * waveWords.length)];
    const correctEn = w1.english;
    const vocabDistractors = VOCAB_DATA.filter(x => x.lemma !== w1.lemma).map(x => x.english);
    const picks1 = shuffle([...new Set(vocabDistractors)].filter(x => x !== correctEn)).slice(0, 3);
    questions.push({
      stage: 'vocabulary', wave: waveIdx, type: 'mc',
      bengali: w1.lemma, roman: w1.roman,
      prompt: 'What does this word mean?',
      correct: correctEn,
      options: shuffle([correctEn, ...picks1]),
      word: w1,
    });

    // Question 2: FIB — type English meaning
    const w2 = waveWords[(Math.floor(Math.random() * (waveWords.length - 1)) + 1) % waveWords.length];
    const fibAcceptable = w2.english.toLowerCase().split('/').map(s => s.trim());
    w2.english.toLowerCase().split('/').forEach(s => {
      s.trim().split(' ').forEach(word => { if (word.length > 2) fibAcceptable.push(word); });
    });
    questions.push({
      stage: 'vocabulary', wave: waveIdx, type: 'fib',
      bengali: w2.lemma, roman: w2.roman,
      prompt: 'Type the English meaning:',
      acceptable: [...new Set(fibAcceptable)],
      answer: w2.english, hint: 'Romanized: ' + w2.roman,
      word: w2,
    });
  });

  // ── GRAMMAR: 2 questions per sampled lesson ──
  grammarLessonIndices.forEach((lessonIdx) => {
    const lesson = GRAMMAR_LESSONS[lessonIdx];
    if (!lesson) return;
    const quizPool = [...lesson.quiz];
    const shuffledQ = shuffle(quizPool);

    for (let i = 0; i < 2 && i < shuffledQ.length; i++) {
      const q = { ...shuffledQ[i] };
      q.stage = 'grammar';
      q.wave = lessonIdx;
      q._lessonId = lesson.id;
      q._qIdx = lesson.quiz.indexOf(shuffledQ[i]);
      questions.push(q);
    }
  });

  // ── PHRASES: 1 MC question per sampled situation ──
  phraseSituations.forEach((slug) => {
    const situationPhrases = PHRASES_DATA.filter(p => p.situation === slug);
    if (situationPhrases.length === 0) return;
    const phrase = situationPhrases[Math.floor(Math.random() * situationPhrases.length)];
    const distractorEnglish = PHRASES_DATA
      .filter(p => p.situation !== slug)
      .map(p => p.english)
      .filter((v, i, arr) => arr.indexOf(v) === i && v !== phrase.english);
    const picks = shuffle(distractorEnglish).slice(0, 3);
    questions.push({
      stage: 'phrases',
      wave: PHRASES_WAVE_ORDER.indexOf(slug),
      type: 'translate-mc',
      bengali: phrase.bengali,
      roman: phrase.roman,
      prompt: 'What does this phrase mean?',
      correct: phrase.english,
      options: shuffle([phrase.english, ...picks]),
      _phraseId: phrase.id,
      _situationSlug: slug,
    });
  });

  return questions;
}

function setPtDifficulty(d) {
  ptDifficulty = d;
  ['beginner', 'intermediate', 'advanced'].forEach(x => {
    document.getElementById('pt-diff-' + x)?.classList.toggle('active', x === d);
  });
}

function setPtLength(l) {
  ptLength = l;
  ['short', 'medium', 'long'].forEach(x => {
    document.getElementById('pt-len-' + x)?.classList.toggle('active', x === l);
  });
}

function startPlacementTest() {
  showScreen('placement-intro');
}

async function beginPlacementQuiz() {
  // Load all vocabulary packs before building questions so that the test can
  // sample from the full curriculum (wave indices up to 200 require pack 3).
  const beginBtn = document.getElementById('pt-begin-btn');
  const loadingMsg = document.getElementById('pt-loading-msg');
  if (beginBtn) beginBtn.disabled = true;
  if (loadingMsg) loadingMsg.style.display = '';

  try {
    await Promise.all([loadVocabPack(1), loadVocabPack(2), loadVocabPack(3)]);
  } catch (e) {
    console.warn('Some vocab packs failed to load for placement test:', e);
  }

  if (beginBtn) beginBtn.disabled = false;
  if (loadingMsg) loadingMsg.style.display = 'none';

  ptQuestions = buildPlacementQuestions();
  ptIndex = 0;
  ptCorrect = 0;
  ptAnswered = false;
  ptWordOrder = [];
  ptStageResults = {
    alphabet:   { correct: 0, total: 0, waves: {} },
    vocabulary: { correct: 0, total: 0, waves: {} },
    grammar:    { correct: 0, total: 0, waves: {} },
    phrases:    { correct: 0, total: 0, waves: {} },
  };
  ptPendingMastery = {};
  ptTotalExpected = ptQuestions.length;

  document.getElementById('tab-bar').style.display = 'none';
  showScreen('placement-quiz');
  renderPlacementQuestion();
}

async function confirmQuitPlacement() {
  if (await showConfirm('Quit the placement test? Your progress will be lost.')) {
    document.getElementById('tab-bar').style.display = '';
    switchTab(currentTab);
  }
}

function renderPlacementQuestion() {
  if (ptIndex >= ptQuestions.length) {
    showPlacementResults();
    return;
  }

  // Check early termination before rendering
  const q = ptQuestions[ptIndex];
  if (shouldSkipRemainingStage(q.stage, q.wave)) {
    skipToNextStage();
    return;
  }

  ptAnswered = false;
  ptWordOrder = [];

  // Update UI
  const stageNames = { alphabet: 'Alphabet', vocabulary: 'Vocabulary', grammar: 'Grammar', phrases: 'Phrases' };
  document.getElementById('pt-stage-label').textContent = stageNames[q.stage] || q.stage;
  document.getElementById('pt-progress-fill').style.width =
    ((ptIndex / ptTotalExpected) * 100) + '%';
  document.getElementById('pt-score').textContent = ptCorrect + ' / ' + ptIndex;

  const qa = document.getElementById('pt-question-area');
  const aa = document.getElementById('pt-answer-area');
  const fb = document.getElementById('pt-feedback');
  fb.className = 'quiz-feedback';
  fb.textContent = '';
  document.getElementById('pt-next-btn').className = 'btn-primary quiz-next-btn';

  renderPlacementQuestionByType(q, qa, aa);
}

function renderPlacementQuestionByType(q, qa, aa) {
  // ── Alphabet questions ──
  if (q.stage === 'alphabet') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="quiz-letter">${q.letter}</div>
      <button class="card-sound-btn" data-action="speak" data-text="${escapeStr(q.letter)}" aria-label="Play pronunciation">🔊</button>
    `;
    if (q.type === 'mc') {
      aa.innerHTML = '<div class="mc-options">' +
        q.options.map(opt =>
          `<button class="mc-btn" data-action="answer-mc-pt" data-answer="${escapeStr(opt)}">${opt}</button>`
        ).join('') + '</div>';
    } else {
      const ptAlphaHint = q.hint
        ? `<button class="hint-btn" data-action="show-hint">💡 Hint</button><div class="fib-hint" style="display:none">${q.hint}</div>`
        : '';
      aa.innerHTML = `<div class="fib-area">
        <input type="text" class="fib-input" id="pt-fib-input" placeholder="Type your answer…"
          autocomplete="off" autocapitalize="off">
        <button class="btn-primary fib-submit" data-action="answer-pt-fib">Check</button>
        ${ptAlphaHint}
      </div>`;
      setTimeout(() => document.getElementById('pt-fib-input')?.focus(), 100);
    }
    return;
  }

  // ── Vocabulary questions ──
  if (q.stage === 'vocabulary') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="vq-bengali">${displayBengali(q.bengali, q.roman)}</div>
      <div class="vq-hint">${escHtml(q.roman)}</div>
      <button class="card-sound-btn" data-action="speak" data-text="${escapeStr(q.bengali)}" aria-label="Play pronunciation">🔊</button>
    `;
    if (q.type === 'mc') {
      aa.innerHTML = '<div class="mc-options">' +
        q.options.map(opt =>
          `<button class="mc-btn" data-action="answer-mc-pt" data-answer="${escapeStr(opt)}">${escHtml(opt)}</button>`
        ).join('') + '</div>';
    } else {
      const ptVocabHint = q.hint
        ? `<button class="hint-btn" data-action="show-hint">💡 Hint</button><div class="fib-hint" style="display:none">${escHtml(q.hint)}</div>`
        : '';
      aa.innerHTML = `<div class="fib-area">
        <input type="text" class="fib-input" id="pt-fib-input" placeholder="Type your answer…"
          autocomplete="off" autocapitalize="off">
        <button class="btn-primary fib-submit" data-action="answer-pt-fib">Check</button>
        ${ptVocabHint}
      </div>`;
      setTimeout(() => document.getElementById('pt-fib-input')?.focus(), 100);
    }
    return;
  }

  // ── Phrases questions ──
  if (q.stage === 'phrases') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="vq-bengali">${displayBengali(q.bengali, q.roman)}</div>
      <div class="vq-hint">${escHtml(q.roman)}</div>
      <button class="card-sound-btn" data-action="speak" data-text="${escapeStr(q.bengali)}" aria-label="Play pronunciation">🔊</button>
    `;
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map(opt =>
        `<button class="mc-btn" data-action="answer-mc-pt" data-answer="${escapeStr(opt)}">${escHtml(opt)}</button>`
      ).join('') + '</div>';
    return;
  }

  // ── Grammar questions ──
  if (q.type === 'translate-mc' || q.type === 'error-spot') {
    if (q.bengali) {
      qa.innerHTML = `
        <div class="quiz-prompt">${t(q.prompt)}</div>
        <div class="vq-bengali">${displayBengali(q.bengali, q.roman)}</div>
        ${q.roman ? '<div class="vq-hint">' + escHtml(q.roman) + '</div>' : ''}
        <button class="card-sound-btn" data-action="speak" data-text="${escapeStr(q.bengali)}" aria-label="Play pronunciation">🔊</button>
      `;
    } else {
      qa.innerHTML = `<div class="quiz-prompt">${t(q.prompt)}</div>`;
    }
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map(opt =>
        `<button class="mc-btn" data-action="answer-mc-pt" data-answer="${escapeStr(opt)}">${escHtml(opt)}</button>`
      ).join('') + '</div>';

  } else if (q.type === 'fib') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div style="font-family:'Noto Sans Bengali',sans-serif;font-size:1.5rem;margin:12px 0">${escHtml(q.sentence)}</div>
      ${q.roman ? '<div class="vq-hint">' + escHtml(q.roman) + '</div>' : ''}
      ${q.english ? '<div class="vq-hint">' + escHtml(q.english) + '</div>' : ''}
    `;
    aa.innerHTML = `<div class="fib-area">
      <input type="text" class="fib-input" id="pt-fib-input" placeholder="Type your answer…"
        autocomplete="off" autocapitalize="off">
      <button class="btn-primary fib-submit" data-action="answer-pt-fib">Check</button>
    </div>`;
    setTimeout(() => document.getElementById('pt-fib-input')?.focus(), 100);

  } else if (q.type === 'word-order') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      ${q.english ? '<div class="vq-hint">' + escHtml(q.english) + '</div>' : ''}
    `;
    const shuffled = shuffle([...q.words]);
    aa.innerHTML = `<div class="word-order-area">
      <div class="answer-area-wo" id="pt-answer-wo"></div>
      <div class="word-tiles" id="pt-word-tiles">
        ${shuffled.map((w, i) => `<div class="word-tile" data-idx="${i}" data-word="${escapeStr(w)}" data-action="pt-select-word-tile">${escHtml(w)}</div>`).join('')}
      </div>
      <button class="btn-primary wo-check-btn" data-action="check-pt-word-order">Check Order</button>
    </div>`;
  }
}

function answerPlacementMC(btn, chosen) {
  if (ptAnswered) return;
  ptAnswered = true;
  const q = ptQuestions[ptIndex];
  const correct = chosen === q.correct;
  document.querySelectorAll('#pt-answer-area .mc-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.textContent === q.correct) b.classList.add('reveal-correct');
  });
  btn.classList.add(correct ? 'correct' : 'wrong');
  if (correct) ptCorrect++;
  const fb = document.getElementById('pt-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.textContent = correct
    ? '✓ Correct! ' + (q.fullAnswer || q.explanation || q.correct)
    : '✗ The answer is: ' + (q.fullAnswer || q.explanation || q.correct);
  document.getElementById('pt-next-btn').className = 'btn-primary quiz-next-btn show';
  recordPlacementAnswer(q, correct);
}

function answerPlacementFIB() {
  if (ptAnswered) return;
  const input = document.getElementById('pt-fib-input');
  if (!input) return;
  const val = input.value.trim().toLowerCase();
  if (!val) return;
  ptAnswered = true;
  const q = ptQuestions[ptIndex];
  const normVal = _normRoman(val);
  const correct = q.acceptable.some(a => a.toLowerCase() === val || _normRoman(a) === normVal) ||
                  q.acceptable.some(a => a === input.value.trim());
  input.classList.add(correct ? 'correct' : 'wrong');
  if (correct) ptCorrect++;
  const fb = document.getElementById('pt-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.textContent = correct
    ? '✓ Correct! ' + (q.answer || q.correct)
    : '✗ The answer is: ' + (q.answer || q.correct);
  document.getElementById('pt-next-btn').className = 'btn-primary quiz-next-btn show';
  recordPlacementAnswer(q, correct);
}

function ptSelectWordTile(tile) {
  if (ptAnswered) return;
  tile.classList.add('used');
  ptWordOrder.push(tile.dataset.word);
  const ansArea = document.getElementById('pt-answer-wo');
  const placed = document.createElement('div');
  placed.className = 'word-tile';
  placed.textContent = tile.dataset.word;
  placed.dataset.srcIdx = tile.dataset.idx;
  placed.onclick = function() { ptRemoveWordTile(this); };
  ansArea.appendChild(placed);
}

function ptRemoveWordTile(placed) {
  if (ptAnswered) return;
  const srcIdx = placed.dataset.srcIdx;
  document.querySelectorAll('#pt-word-tiles .word-tile').forEach(t => {
    if (t.dataset.idx === srcIdx) t.classList.remove('used');
  });
  placed.remove();
  ptWordOrder = [];
  document.querySelectorAll('#pt-answer-wo .word-tile').forEach(t => {
    ptWordOrder.push(t.textContent);
  });
}

function checkPlacementWordOrder() {
  if (ptAnswered) return;
  if (ptWordOrder.length === 0) return;
  ptAnswered = true;
  const q = ptQuestions[ptIndex];
  const correct = ptWordOrder.length === q.correct.length &&
    ptWordOrder.every((w, i) => w === q.correct[i]);
  const ansArea = document.getElementById('pt-answer-wo');
  ansArea.classList.add(correct ? 'correct-wo' : 'wrong-wo');
  document.querySelectorAll('#pt-word-tiles .word-tile').forEach(t => t.style.pointerEvents = 'none');
  document.querySelectorAll('#pt-answer-wo .word-tile').forEach(t => t.style.pointerEvents = 'none');
  if (correct) ptCorrect++;
  const fb = document.getElementById('pt-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.textContent = correct
    ? '✓ Correct! ' + q.correct.join(' ')
    : '✗ Correct order: ' + q.correct.join(' ');
  document.getElementById('pt-next-btn').className = 'btn-primary quiz-next-btn show';
  recordPlacementAnswer(q, correct);
}

function recordPlacementAnswer(q, correct) {
  const sr = ptStageResults[q.stage];
  sr.total++;
  if (correct) sr.correct++;
  if (!sr.waves[q.wave]) sr.waves[q.wave] = { correct: 0, total: 0 };
  sr.waves[q.wave].total++;
  if (correct) sr.waves[q.wave].correct++;
}

function shouldSkipRemainingStage(stage, currentWave) {
  const sr = ptStageResults[stage];
  // Find the wave just before this one in our question set
  const stageQuestions = ptQuestions.filter(q => q.stage === stage);
  const waves = [...new Set(stageQuestions.map(q => q.wave))].sort((a, b) => a - b);
  const currentWavePos = waves.indexOf(currentWave);
  if (currentWavePos <= 0) return false; // first wave, can't skip

  const prevWave = waves[currentWavePos - 1];
  const prevResult = sr.waves[prevWave];
  if (prevResult && prevResult.total >= 2 && prevResult.correct === 0) {
    return true; // 0/2 on previous wave => skip remaining
  }
  return false;
}

function skipToNextStage() {
  const currentStage = ptQuestions[ptIndex].stage;
  // Skip all remaining questions in this stage
  while (ptIndex < ptQuestions.length && ptQuestions[ptIndex].stage === currentStage) {
    ptIndex++;
  }
  renderPlacementQuestion();
}

function nextPlacementQuestion() {
  ptIndex++;
  renderPlacementQuestion();
}

function showPlacementResults() {
  document.getElementById('tab-bar').style.display = '';
  computePlacementMastery();
  showScreen('placement-results');
  renderPlacementResultsUI();
}

function computePlacementMastery() {
  ptPendingMastery = {};

  // ── Alphabet ──
  const alphaWaves = Object.keys(ptStageResults.alphabet.waves).map(Number).sort((a, b) => a - b);
  let alphaHighWater = -1;
  for (const w of alphaWaves) {
    if (ptStageResults.alphabet.waves[w].correct >= 1) {
      alphaHighWater = w;
    }
  }
  if (alphaHighWater >= 0) {
    // Set mastery for all letters in waves up to and including high water mark
    const endIdx = (alphaHighWater + 1) * MIXED_WAVE_SIZE;
    for (let i = 0; i < endIdx && i < MIXED_CURRICULUM.length; i++) {
      const l = MIXED_CURRICULUM[i];
      if (!l) continue;
      const waveIdx = Math.floor(i / MIXED_WAVE_SIZE);
      const waveResult = ptStageResults.alphabet.waves[waveIdx];
      // Mastered (3) if their wave was tested and got 2/2, learning (2) otherwise
      const level = (waveResult && waveResult.correct === 2) ? 3 : 2;
      ptPendingMastery[l.letter] = Math.max(level, getMastery(l.letter));
    }
  }

  // ── Vocabulary ──
  const vocabWaves = Object.keys(ptStageResults.vocabulary.waves).map(Number).sort((a, b) => a - b);
  let vocabHighWater = -1;
  for (const w of vocabWaves) {
    if (ptStageResults.vocabulary.waves[w].correct >= 1) {
      vocabHighWater = w;
    }
  }
  if (vocabHighWater >= 0) {
    const endIdx = (vocabHighWater + 1) * VMIX_WAVE_SIZE;
    for (let i = 0; i < endIdx && i < VMIX_CURRICULUM.length; i++) {
      const w = VMIX_CURRICULUM[i];
      if (!w) continue;
      const waveIdx = Math.floor(i / VMIX_WAVE_SIZE);
      const waveResult = ptStageResults.vocabulary.waves[waveIdx];
      const level = (waveResult && waveResult.correct === 2) ? 3 : 2;
      ptPendingMastery[_vocabKey(w)] = Math.max(level, getVocabMastery(w));
    }
  }

  // ── Grammar ──
  const grammarWaves = Object.keys(ptStageResults.grammar.waves).map(Number).sort((a, b) => a - b);
  let grammarHighWater = -1;
  for (const w of grammarWaves) {
    if (ptStageResults.grammar.waves[w].correct >= 1) {
      grammarHighWater = w;
    }
  }
  if (grammarHighWater >= 0) {
    // Set mastery for all questions in lessons up to high water mark
    for (let li = 0; li <= grammarHighWater && li < GRAMMAR_LESSONS.length; li++) {
      const lesson = GRAMMAR_LESSONS[li];
      const waveResult = ptStageResults.grammar.waves[li];
      const level = (waveResult && waveResult.correct === 2) ? 3 : 2;
      for (let qi = 0; qi < lesson.quiz.length; qi++) {
        const key = 'g:' + lesson.id + ':' + qi;
        ptPendingMastery[key] = Math.max(level, getGrammarMastery(lesson.id, qi));
      }
    }
  }

  // ── Phrases ──
  // Each situation is tested with 1 question. For each situation answered correctly,
  // set all phrases in that situation to mastery 2 (seen/learning).
  Object.entries(ptStageResults.phrases.waves).forEach(([waveIdxStr, result]) => {
    if (result.correct >= 1) {
      const slug = PHRASES_WAVE_ORDER[parseInt(waveIdxStr)];
      if (!slug) return;
      PHRASES_DATA.filter(p => p.situation === slug).forEach(p => {
        const key = 'ph:' + p.id;
        ptPendingMastery[key] = Math.max(2, getPhraseMastery(p.id));
      });
    }
  });
}

function renderPlacementResultsUI() {
  const grid = document.getElementById('pt-results-grid');
  const circumference = 2 * Math.PI * 40;

  const stages = [
    { key: 'alphabet', label: 'Alphabet', icon: '🔤' },
    { key: 'vocabulary', label: 'Vocabulary', icon: '📖' },
    { key: 'grammar', label: 'Grammar', icon: '📝' },
    { key: 'phrases', label: 'Phrases', icon: '💬' },
  ];

  grid.innerHTML = stages.map(s => {
    const sr = ptStageResults[s.key];
    const pct = sr.total > 0 ? Math.round((sr.correct / sr.total) * 100) : 0;
    const offset = circumference * (1 - pct / 100);
    const waveCount = Object.keys(sr.waves).length;
    const passedWaves = Object.values(sr.waves).filter(w => w.correct >= 1).length;
    return `<div class="placement-module-result">
      <h4>${s.icon} ${s.label}</h4>
      <div class="pm-ring">
        <svg viewBox="0 0 100 100" width="100" height="100">
          <circle class="bg-ring" cx="50" cy="50" r="40"/>
          <circle class="fg-ring" cx="50" cy="50" r="40"
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
            style="transition-delay:0.3s"/>
        </svg>
        <div class="pm-pct">${pct}%</div>
      </div>
      <div class="pm-detail">${sr.correct}/${sr.total} correct</div>
      <div class="pm-detail">${passedWaves}/${waveCount} levels passed</div>
    </div>`;
  }).join('');

  // Summary text
  const totalCorrect = Object.values(ptStageResults).reduce((sum, sr) => sum + sr.correct, 0);
  const totalAnswered = Object.values(ptStageResults).reduce((sum, sr) => sum + sr.total, 0);
  const pendingCount = Object.keys(ptPendingMastery).length;
  document.getElementById('pt-results-summary').textContent =
    `You answered ${totalCorrect}/${totalAnswered} correctly. ${pendingCount} items will be updated.`;
}

function applyPlacementResults() {
  if (!progress.fsrs) progress.fsrs = {};
  const sMap = { 1: 1, 2: 3, 3: 7, 4: 21 };
  // Bulk-write pending mastery and seed FSRS stability from placed level
  for (const [key, level] of Object.entries(ptPendingMastery)) {
    progress.mastery[key] = level;
    if (!progress.fsrs[key]) {
      progress.fsrs[key] = { s: sMap[level] || 1, d: 5, reps: level, lapses: 0 };
    }
  }
  progress.placementTaken = true;
  saveProgress();
  updateNav();

  // Show retake button
  document.getElementById('pt-retake-btn').style.display = '';

  switchTab('today');
}

function discardPlacementResults() {
  progress.placementTaken = true;
  saveProgress();
  document.getElementById('tab-bar').style.display = '';
  switchTab('today');
}

function updatePlacementRetakeButton() {
  const btn = document.getElementById('pt-retake-btn');
  if (progress.placementTaken) {
    btn.style.display = '';
  } else {
    btn.style.display = 'none';
  }
}

// ════════════════════════════════════════
//  PROFILE MANAGEMENT
// ════════════════════════════════════════
function showProfileScreen(forceShowPicker) {
  // Hide main app
  document.getElementById('main-nav').style.display = 'none';
  document.getElementById('tab-bar').style.display = 'none';
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  // Show profile screen
  document.getElementById('profile-screen').classList.add('active');
  renderProfileList(forceShowPicker);
}

function renderProfileList(forceShowPicker) {
  const users = _listUsers();

  const list = document.getElementById('profile-list');
  const inputWrap = document.getElementById('profile-input-wrap');

  // If no profiles at all, show create-first input (cancel only if guest)
  if (users.length === 0 && !forceShowPicker) {
    list.innerHTML = '';
    inputWrap.classList.add('active');
    document.getElementById('profile-cancel-btn').style.display = currentUser === null ? '' : 'none';
    document.getElementById('profile-name-input').focus();
    document.querySelector('.profile-subtitle').textContent = 'Create your first profile';
    return;
  }

  // On first launch with exactly 1 profile, auto-select (skip picker)
  if (users.length === 1 && !forceShowPicker) {
    selectProfile(users[0].name);
    return;
  }

  // Show profile cards
  document.querySelector('.profile-subtitle').textContent = users.length > 0
    ? 'Choose your profile' : 'Create your first profile';
  inputWrap.classList.remove('active');
  list.innerHTML = '';

  for (const u of users) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    const safeName = escapeHTML(u.name);
    const safeNameJs = u.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const locked = _profileHasPw(u.name);
    const lockIcon = locked ? ' 🔒' : '';
    const selectAction = locked ? 'unlock-profile' : 'select-profile';
    card.innerHTML = `
      <div class="pc-select" data-action="${selectAction}" data-name="${safeNameJs}">
        <div class="pc-name">${safeName}${lockIcon}</div>
        <div class="pc-stats">⭐ ${toBnDigits(u.xp)} ${t('XP')} &nbsp; 🔥 ${toBnDigits(u.streak)}</div>
      </div>
      <div class="pc-actions">
        <button class="pc-action-btn" data-action="rename-profile" data-name="${safeNameJs}" title="Rename profile">✏️</button>
        <button class="pc-action-btn" data-action="export-profile" data-name="${safeNameJs}" title="Download progress as JSON">⬇</button>
        <button class="pc-action-btn" data-action="copy-profile" data-name="${safeNameJs}" title="Copy progress to clipboard">📋</button>
        <button class="pc-action-btn pc-action-delete" data-action="delete-profile" data-name="${safeNameJs}" title="Delete profile">🗑</button>
      </div>
    `;
    list.appendChild(card);
  }

  // Add "New Profile" card
  const add = document.createElement('div');
  add.className = 'profile-add';
  add.onclick = showNewProfileInput;
  add.innerHTML = '<div class="pa-icon">+</div><div class="pa-label">New Profile</div>';
  list.appendChild(add);
}

function showNewProfileInput() {
  document.getElementById('profile-input-wrap').classList.add('active');
  document.getElementById('profile-cancel-btn').style.display = '';
  document.getElementById('profile-name-input').value = '';
  const pwInput = document.getElementById('profile-pw-input');
  if (pwInput) pwInput.value = '';
  document.getElementById('profile-name-input').focus();
}

function cancelNewProfile() {
  document.getElementById('profile-input-wrap').classList.remove('active');
  const pwInput = document.getElementById('profile-pw-input');
  if (pwInput) pwInput.value = '';
  if (!currentUser) {
    document.getElementById('profile-screen').classList.remove('active');
    document.getElementById('main-nav').style.display = '';
    document.getElementById('tab-bar').style.display = '';
  }
}

async function renameProfile(oldName) {
  const newName = prompt('Rename profile "' + oldName + '" to:');
  if (!newName || !newName.trim()) return;
  const clean = newName.trim();
  if (!/^[\p{L}\p{N}\s\-]+$/u.test(clean)) { showAlert('Invalid name.'); return; }
  if (clean === oldName) return;
  if (_listUsers().some(u => u.name === clean)) { showAlert('A profile with that name already exists.'); return; }
  const oldKey = _lsKey(oldName);
  const data = localStorage.getItem(oldKey);
  if (!data) return;
  localStorage.setItem(_lsKey(clean), data);
  localStorage.removeItem(oldKey);
  if (currentUser === oldName) currentUser = clean;
  renderProfileList(true);
}

function createProfile() {
  const input = document.getElementById('profile-name-input');
  const name = input.value.trim();
  if (!name) { input.focus(); return; }
  if (!/^[\p{L}\p{N}\s\-]+$/u.test(name)) {
    showAlert('Name can only contain letters, numbers, spaces, and hyphens.');
    return;
  }
  const pwInput = document.getElementById('profile-pw-input');
  const pw = pwInput ? pwInput.value : '';
  currentUser = name;
  progress = _newProgressState();
  saveProgress();
  if (pw) _setPw(name, pw);
  enterApp();
}

function selectProfile(name) {
  currentUser = name;
  progress = loadProgress();
  enterApp();
}

function showProfileUnlock(name) {
  // Find the pc-select div for this profile and replace with inline unlock form
  const list = document.getElementById('profile-list');
  const cards = list ? list.querySelectorAll('.profile-card') : [];
  for (const card of cards) {
    const sel = card.querySelector('.pc-select');
    if (!sel) continue;
    if (sel.dataset.name !== name) continue;
    const safeName = escapeHTML(name);
    const safeId = 'inline-pw-' + name.replace(/[^a-zA-Z0-9]/g, '_');
    sel.innerHTML = `
      <input type="password" id="${safeId}" class="profile-input profile-pw-inline"
             placeholder="Enter password…" autocomplete="current-password">
      <div class="profile-input-actions" style="margin-top:8px">
        <button class="btn-primary" data-action="submit-profile-pw" data-name="${safeName}">Unlock</button>
        <span class="profile-pw-err" style="display:none;color:var(--wrong);font-size:0.85rem">Wrong password</span>
      </div>
    `;
    const inp = document.getElementById(safeId);
    if (inp) {
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitProfilePw(name); });
      setTimeout(() => inp.focus(), 50);
    }
    break;
  }
}

function submitProfilePw(name) {
  const safeId = 'inline-pw-' + name.replace(/[^a-zA-Z0-9]/g, '_');
  const inp = document.getElementById(safeId);
  if (!inp) return;
  if (_checkPw(name, inp.value)) {
    selectProfile(name);
  } else {
    const errEl = inp.closest('.pc-select')
      ? inp.closest('.pc-select').querySelector('.profile-pw-err')
      : null;
    if (errEl) errEl.style.display = '';
    inp.value = '';
    inp.focus();
  }
}

function enterAppAsGuest() {
  currentUser = null;
  progress = _newProgressState();
  document.getElementById('profile-screen').classList.remove('active');
  document.getElementById('main-nav').style.display = '';
  document.getElementById('tab-bar').style.display = '';
  applyThemePalette(getThemePalette());
  applyDisplayMode();
  updateNav();
  updatePlacementRetakeButton();
  switchTab('today');
  document.getElementById('guest-banner').style.display = '';
}

function enterApp() {
  // Hide profile screen, show app
  document.getElementById('guest-banner').style.display = 'none';
  document.getElementById('profile-screen').classList.remove('active');
  document.getElementById('main-nav').style.display = '';
  document.getElementById('tab-bar').style.display = '';
  migrateProgress();
  applyThemePalette(getThemePalette());
  applyDisplayMode();
  updateNav();
  updatePlacementRetakeButton();
  switchTab('today');
  // Show onboarding for first-time users
  if (!progress.seenOnboarding) {
    document.getElementById('onboarding-modal').style.display = 'flex';
  }
}

function dismissOnboarding() {
  document.getElementById('onboarding-modal').style.display = 'none';
  progress.seenOnboarding = true;
  saveProgress();
}

function toggleConjTable() {
  const wrap = document.getElementById('conj-table-wrap');
  const btn  = document.getElementById('conj-toggle-btn');
  if (!wrap || !btn) return;
  const open = !wrap.hidden;
  wrap.hidden = open;
  btn.setAttribute('aria-expanded', String(!open));
}

function toggleReadingSection(btn, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const open = el.classList.toggle('open');
  btn.textContent = open
    ? btn.textContent.replace('▼', '▲').replace('Show', 'Hide')
    : btn.textContent.replace('▲', '▼').replace('Hide', 'Show');
}

function _updatePwBtnLabel() {
  const el = document.getElementById('pw-btn-label');
  if (el && currentUser) el.textContent = _profileHasPw(currentUser) ? 'Change / Remove Password' : 'Set Password';
}
async function manageProfilePassword() {
  if (!currentUser) return;
  if (!_profileHasPw(currentUser)) {
    const pw = await showPrompt('Set a password for this profile:', 'New password');
    if (pw === null) return;
    if (!pw) { await showAlert('Password cannot be empty.'); return; }
    _setPw(currentUser, pw);
    _updatePwBtnLabel();
    await showAlert('Password set.');
  } else {
    const choice = await _showModal('Profile password options:', [
      { label: 'Cancel',          cls: 'app-modal-btn-cancel', value: 'cancel' },
      { label: 'Remove Password', cls: 'app-modal-btn-cancel', value: 'remove' },
      { label: 'Change Password', cls: 'app-modal-btn-ok',     value: 'change' },
    ]);
    if (choice === 'change') {
      const pw = await showPrompt('Enter a new password:', 'New password');
      if (pw === null) return;
      if (!pw) { await showAlert('Password cannot be empty.'); return; }
      _setPw(currentUser, pw);
      _updatePwBtnLabel();
      await showAlert('Password updated.');
    } else if (choice === 'remove') {
      if (!await showConfirm('Remove password from this profile?')) return;
      _removePw(currentUser);
      _updatePwBtnLabel();
      await showAlert('Password removed.');
    }
  }
}
function openSettingsPanel() {
  updateProfileMenuHeader();
  _updateFibModeChips();
  _updateListenModeChips();
  _updateDisplayModeChips();
  _updateThemeSwatches();
  renderVoiceSelector();
  const statusEl = document.getElementById('slow-audio-status');
  if (statusEl) statusEl.textContent = _audioSlowMode ? 'On' : 'Off';
  const settingsBtn = document.getElementById('settings-slow-audio-btn');
  if (settingsBtn) settingsBtn.classList.toggle('active', _audioSlowMode);
  _updatePwBtnLabel();
  document.getElementById('settings-overlay').classList.add('open');
  document.addEventListener('keydown', _settingsEsc);
}
function closeSettingsPanel() {
  document.getElementById('settings-overlay').classList.remove('open');
  document.removeEventListener('keydown', _settingsEsc);
}
function _settingsEsc(e) { if (e.key === 'Escape') closeSettingsPanel(); }

function openHelpPanel() {
  document.getElementById('help-overlay').classList.add('open');
  document.addEventListener('keydown', _helpEsc);
}
function closeHelpPanel() {
  document.getElementById('help-overlay').classList.remove('open');
  document.removeEventListener('keydown', _helpEsc);
}
function _helpEsc(e) { if (e.key === 'Escape') closeHelpPanel(); }

// ── Debug: Unlock All & Mark Mastered ───────────────────────────────
async function unlockAllContent(btn) {
  if (!await showConfirm('This will mark all 50 letters and all 4,399+ words as fully mastered. This cannot be undone.\n\nContinue?')) return;
  btn.disabled = true;
  btn.textContent = 'Loading packs…';
  await Promise.all([1, 2, 3].map(n => loadVocabPack(n)));
  for (const w of VMIX_CURRICULUM) progress.mastery[_vocabKey(w)] = 3;
  for (const item of MIXED_CURRICULUM) progress.mastery[item.letter] = 3;
  saveProgress();
  closeSettingsPanel();
  renderHome();
  renderVocabHome();
}

// ── FIB Input Mode ──────────────────────────────────────────────────
function getFibMode() {
  return progress.settings?.fibMode || DEFAULT_PROGRESS_SETTINGS.fibMode;
}
function setFibMode(mode) {
  if (!progress.settings) progress.settings = _defaultProgressSettings();
  progress.settings.fibMode = mode;
  saveProgress();
  _updateFibModeChips();
  if (mode === 'latin') { document.getElementById('bng-kbd').classList.remove('open'); }
}
function _updateFibModeChips() {
  const mode = getFibMode();
  ['latin','mixed','bengali'].forEach(m => {
    const el = document.getElementById('fibmode-' + m);
    if (el) el.classList.toggle('active', m === mode);
  });
}

// ── Listening Mode ─────────────────────────────────────────────────
function getListeningMode() {
  return progress.settings?.listeningMode || DEFAULT_PROGRESS_SETTINGS.listeningMode;
}
function setListeningMode(mode) {
  if (!progress.settings) progress.settings = _defaultProgressSettings();
  progress.settings.listeningMode = mode;
  saveProgress();
  _updateListenModeChips();
}
function _updateListenModeChips() {
  const mode = getListeningMode();
  ['text','mixed','listening'].forEach(m => {
    const el = document.getElementById('listenmode-' + m);
    if (el) el.classList.toggle('active', m === mode);
  });
}

// ── Display Mode ─────────────────────────────────────────────────────────────
function getDisplayMode() {
  return progress.settings?.displayMode || DEFAULT_PROGRESS_SETTINGS.displayMode;
}
function setDisplayMode(mode) {
  if (!progress.settings) progress.settings = _defaultProgressSettings();
  progress.settings.displayMode = mode;
  saveProgress();
  _updateDisplayModeChips();
  applyDisplayMode();
}
function _updateDisplayModeChips() {
  const mode = getDisplayMode();
  ['standard','romanized','immersion'].forEach(m => {
    const el = document.getElementById('dispmode-' + m);
    if (el) el.classList.toggle('active', m === mode);
  });
  const hideEnglishRow = document.getElementById('hide-english-row');
  if (hideEnglishRow) hideEnglishRow.style.display = mode === 'immersion' ? '' : 'none';
  const hideBtn = document.getElementById('settings-hide-english-btn');
  if (hideBtn) {
    const on = getHideEnglish();
    hideBtn.classList.toggle('active', on);
    const statusEl = document.getElementById('hide-english-status');
    if (statusEl) statusEl.textContent = on ? 'On' : 'Off';
  }
}
function getHideEnglish() {
  return !!(progress.settings?.hideEnglish);
}
function setHideEnglish(val) {
  if (!progress.settings) progress.settings = _defaultProgressSettings();
  progress.settings.hideEnglish = !!val;
  saveProgress();
  applyDisplayMode();
}
function toggleHideEnglish() {
  setHideEnglish(!getHideEnglish());
  _updateDisplayModeChips();
}

// ── Cultural theme palette ───────────────────────────────────────────────────
function getThemePalette() {
  return progress.settings?.palette || DEFAULT_PROGRESS_SETTINGS.palette;
}
function applyThemePalette(name) {
  document.documentElement.dataset.palette = (name === 'sundarbans') ? '' : name;
}
function setThemePalette(name) {
  if (!progress.settings) progress.settings = _defaultProgressSettings();
  progress.settings.palette = name;
  applyThemePalette(name);
  saveProgress();
  _updateThemeSwatches();
}
function _updateThemeSwatches() {
  const current = getThemePalette();
  document.querySelectorAll('.theme-swatch').forEach(el => {
    el.classList.toggle('active', el.dataset.palette === current);
  });
}

function startLetterListening() {
  const seen = ALL_LETTERS.filter(l => getMastery(l.letter) > 0);
  const letters = seen.length >= 4 ? seen : ALL_LETTERS.slice(0, 11);
  const mod = { id: 'listening-letters', title: '🎧 Letter Sounds', letters, isMixed: false };
  currentModule = mod; quizModuleRef = mod;
  generateQuiz(letters, 'listening');
  quizIndex = 0; quizCorrect = 0; quizMissed = [];
  document.getElementById('quiz-title').textContent = '🎧 Letter Sounds';
  showScreen('quiz'); renderQuestion();
}
// ════════════════════════════════════════
//  PHONEME PAIR DRILLS
// ════════════════════════════════════════
let ppQuestions = [], ppIndex = 0, ppCorrect = 0, ppMissed = [];

function _letterLookup(char) {
  return ALL_LETTERS.find(l => l.letter === char) || { letter: char, name: char, romanized: char, ipa: '', sound: '' };
}

function generatePhonemePairQuiz() {
  const pairs = shuffle([...PHONEME_PAIRS]).slice(0, 10);
  const questions = [];

  pairs.forEach((pair, i) => {
    const la = _letterLookup(pair.a);
    const lb = _letterLookup(pair.b);
    const isListening = i % 5 < 3; // 60% listening, 40% description-match

    if (isListening) {
      // Listen & identify: play one letter, user picks which of the pair
      const target = Math.random() < 0.5 ? pair.a : pair.b;
      questions.push({
        type: 'phoneme-listen',
        audio: target,
        prompt: 'Which letter did you hear?',
        correct: target,
        options: shuffle([pair.a, pair.b]),
        pair, la, lb,
      });
    } else {
      // Description match: show the sound description, pick the letter
      const target = Math.random() < 0.5 ? la : lb;
      const desc = target.sound || target.ipa;
      // Get 2 extra distractors from the other pair member + a random letter
      const other = target === la ? lb : la;
      const extras = shuffle(ALL_LETTERS.filter(l => l.letter !== target.letter && l.letter !== other.letter))
        .slice(0, 2).map(l => l.letter);
      questions.push({
        type: 'phoneme-desc',
        prompt: `Which letter makes this sound: "${desc}"?`,
        correct: target.letter,
        options: shuffle([target.letter, other.letter, ...extras]),
        pair, la, lb,
      });
    }
  });

  return questions;
}

function startPhonemePairQuiz() {
  ppQuestions = generatePhonemePairQuiz();
  ppIndex = 0;
  ppCorrect = 0;
  ppMissed = [];
  _quizStartTime = Date.now();
  document.getElementById('vq-title').textContent = 'Phoneme Pair Drill';
  showScreen('vocab-quiz');
  renderPhonemePairQuestion();
  updateStreak();
}

function renderPhonemePairQuestion() {
  if (ppIndex >= ppQuestions.length) { showPhonemePairResults(); return; }
  vqAnswered = false;
  const q = ppQuestions[ppIndex];

  document.getElementById('vq-progress-fill').style.width =
    ((ppIndex / ppQuestions.length) * 100) + '%';
  document.getElementById('vq-score').textContent = ppCorrect + ' / ' + ppIndex;

  const qa = document.getElementById('vq-question-area');

  if (q.type === 'phoneme-listen') {
    qa.innerHTML = `
      <div class="quiz-prompt">${escHtml(q.prompt)}</div>
      <div class="listening-controls">
        <button class="listening-play-btn" data-action="speak" data-text="${escapeStr(q.audio)}">&#9654; Play Sound</button>
        <button class="slow-audio-btn${_audioSlowMode ? ' active' : ''}" data-action="toggle-slow-audio" title="Play at half speed">&#128034; Slow</button>
      </div>
      <div class="mc-options">
        ${q.options.map(opt => {
          const lo = _letterLookup(opt);
          return `<button class="mc-btn phoneme-option" data-action="phoneme-quiz-mc" data-answer="${escapeStr(opt)}">
            <span class="phoneme-letter">${escHtml(opt)}</span>
            <span class="phoneme-name">${escHtml(lo.name.split(' ')[0])}</span>
          </button>`;
        }).join('')}
      </div>`;
    // Auto-play the sound
    setTimeout(() => speakBengali(q.audio), 300);
  } else {
    qa.innerHTML = `
      <div class="quiz-prompt">${escHtml(q.prompt)}</div>
      <div class="mc-options">
        ${q.options.map(opt => {
          const lo = _letterLookup(opt);
          return `<button class="mc-btn phoneme-option" data-action="phoneme-quiz-mc" data-answer="${escapeStr(opt)}">
            <span class="phoneme-letter">${escHtml(opt)}</span>
            <span class="phoneme-name">${escHtml(lo.name.split(' ')[0])}</span>
          </button>`;
        }).join('')}
      </div>`;
  }
}

function handlePhonemePairMC(answer) {
  if (vqAnswered) return;
  vqAnswered = true;
  const q = ppQuestions[ppIndex];
  const correct = answer === q.correct;
  if (correct) ppCorrect++;
  else ppMissed.push(q);

  document.getElementById('vq-question-area').querySelectorAll('.mc-btn').forEach(btn => {
    const val = btn.getAttribute('data-answer');
    if (val === q.correct) btn.classList.add('correct');
    else if (val === answer && !correct) btn.classList.add('wrong');
    btn.disabled = true;
  });

  const feedbackHtml = `<div class="vq-feedback ${correct ? 'correct' : 'wrong'}">${correct ? 'Correct!' : `Answer: ${escHtml(q.correct)}`}</div>
    <div class="vq-hint" style="margin-top:8px"><strong>${escHtml(q.pair.label)}</strong><br>${escHtml(q.pair.hint)}</div>`;
  document.getElementById('vq-question-area').insertAdjacentHTML('beforeend', feedbackHtml);

  setTimeout(() => { ppIndex++; renderPhonemePairQuestion(); }, correct ? 1200 : 2500);
}

function showPhonemePairResults() {
  const elapsed = Math.round((Date.now() - _quizStartTime) / 1000);
  const pct = Math.round((ppCorrect / ppQuestions.length) * 100);
  addXP(ppCorrect * 10, 'alphabet');

  const qa = document.getElementById('vq-question-area');
  qa.innerHTML = `
    <div class="quiz-results">
      <h2>Phoneme Drill Complete!</h2>
      <div class="quiz-results-score">${ppCorrect} / ${ppQuestions.length} correct (${pct}%)</div>
      <div class="quiz-results-time">Time: ${elapsed}s</div>
      ${ppMissed.length ? `<div class="quiz-results-missed"><strong>Review these pairs:</strong><ul>${ppMissed.map(q =>
        `<li><strong>${escHtml(q.pair.label)}</strong> — ${escHtml(q.pair.hint)}</li>`
      ).join('')}</ul></div>` : ''}
      <div style="margin-top:16px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button class="btn-primary" data-action="start-phoneme-quiz">Try Again</button>
        <button class="nav-btn" data-action="show-screen" data-screen="alphabet-home">Back to Alphabet</button>
      </div>
    </div>`;
  document.getElementById('vq-progress-fill').style.width = '100%';
  document.getElementById('vq-score').textContent = ppCorrect + ' / ' + ppQuestions.length;
}

function startVocabListening() {
  startVocabListeningForCategory(null);
}

function startVocabListeningForCategory(catId = null) {
  const scoped = catId
    ? VOCAB_DATA.filter(w => w.category === catId)
    : VOCAB_DATA;
  const seen = scoped.filter(w => getVocabMastery(w) > 0);
  const words = seen.length >= 4 ? seen : scoped.slice(0, 20);
  if (words.length === 0) return;

  generateVocabQuiz(words, 'listening');
  vqIndex = 0; vqCorrect = 0; vqMissed = [];
  const catTitle = catId ? VOCAB_CATEGORIES[catId]?.title || catId : null;
  document.getElementById('vq-title').textContent = catTitle
    ? `🎧 Vocabulary · ${catTitle}`
    : '🎧 Vocabulary';
  showScreen('vocab-quiz'); renderVocabQuestion();
}

// ── Bengali Soft Keyboard ───────────────────────────────────────────
let _activeFibInputId = null;
function _isBengali(s) { return /[\u0980-\u09FF]/.test(s); }

function toggleBengaliKbd() {
  document.getElementById('bng-kbd').classList.toggle('open');
}
function showBengaliKbd(inputId) {
  _activeFibInputId = inputId;
  if (getFibMode() !== 'latin') document.getElementById('bng-kbd').classList.add('open');
}
function hideBengaliKbd() {
  document.getElementById('bng-kbd').classList.remove('open');
}
function appendBengaliChar(char) {
  const input = document.getElementById(_activeFibInputId);
  if (!input) return;
  if (char === '⌫') {
    input.value = input.value.slice(0, -1);
  } else if (char === '⎵') {
    input.value += ' ';
  } else if (char === '✕') {
    input.value = '';
  } else {
    input.value += char;
  }
  input.focus();
}

function switchProfile() {
  // Flush pending save, then show profile picker
  if (_saveTimer) { clearTimeout(_saveTimer); _flushSave(); }
  currentUser = null;
  progress = _newProgressState();
  closeSettingsPanel();
  showProfileScreen(true);
}

async function deleteCurrentProfile() {
  closeSettingsPanel();
  if (!await showConfirm('Delete profile "' + currentUser + '"? All progress will be lost.')) return;
  if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
  _deleteProgressLS(currentUser);
  currentUser = null;
  progress = _newProgressState();
  showProfileScreen(true);
}

// Per-profile export/delete from the profile picker screen
function exportProfileData(name) {
  const data = _loadProgressLS(name) || {};
  const envelope = { exportedBy: name, exportedAt: new Date().toISOString(), version: 1, progress: data };
  const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bengali-progress-' + name.replace(/\s+/g, '-') + '-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyProfileDataToClipboard(name) {
  const data = _loadProgressLS(name) || {};
  const envelope = { exportedBy: name, exportedAt: new Date().toISOString(), version: 1, progress: data };
  const json = JSON.stringify(envelope, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    showAlert('Progress for "' + name + '" copied to clipboard.');
  }).catch(() => showAlert('Could not copy to clipboard.'));
}

async function deleteProfile(name) {
  if (!await showConfirm('Delete profile "' + name + '"? All progress will be lost.')) return;
  _deleteProgressLS(name);
  _removePw(name);
  if (name === currentUser) {
    if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
    currentUser = null;
    progress = _newProgressState();
  }
  renderProfileList(true);
}

// ════════════════════════════════════════
//  EXPORT / IMPORT
// ════════════════════════════════════════
async function exportProgress() {
  closeSettingsPanel();
  if (_saveTimer) { clearTimeout(_saveTimer); _flushSave(); }
  const filter = await _showModal('Export Progress — select which data to include:', [
    { label: 'All Data',       cls: 'app-modal-btn-ok',     value: 'all' },
    { label: 'Alphabet',       cls: 'app-modal-btn-cancel', value: 'alphabet' },
    { label: 'Vocabulary',     cls: 'app-modal-btn-cancel', value: 'vocab' },
    { label: 'Grammar',        cls: 'app-modal-btn-cancel', value: 'grammar' },
    { label: 'Phrases',        cls: 'app-modal-btn-cancel', value: 'phrases' },
  ]);
  if (!filter) return;
  _doExportProgress(filter);
}

function _doExportProgress(filter) {
  const allLetterKeys = new Set(ALL_LETTERS.map(l => l.letter));
  let mastery = progress.mastery;
  if (filter === 'alphabet') {
    mastery = Object.fromEntries(Object.entries(progress.mastery).filter(([k]) => allLetterKeys.has(k)));
  } else if (filter === 'vocab') {
    mastery = Object.fromEntries(Object.entries(progress.mastery).filter(([k]) => k.startsWith('v:')));
  } else if (filter === 'grammar') {
    mastery = Object.fromEntries(Object.entries(progress.mastery).filter(([k]) => k.startsWith('g:')));
  } else if (filter === 'phrases') {
    mastery = Object.fromEntries(Object.entries(progress.mastery).filter(([k]) => k.startsWith('ph:')));
  }
  const filteredProgress = filter === 'all' ? progress : { ...progress, mastery };
  const data = {
    exportedBy: currentUser,
    exportedAt: new Date().toISOString(),
    version: 1,
    filter,
    progress: filteredProgress,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateSuffix = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = 'bengali-progress-' + currentUser.replace(/\s+/g, '-') + '-' + filter + '-' + dateSuffix + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importProgress() {
  closeSettingsPanel();
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        // Accept either a raw progress object or an exported envelope
        const data = parsed.version === 1 && parsed.progress ? parsed.progress : parsed;
        if (!data || typeof data.mastery !== 'object') {
          showAlert('Invalid progress file.');
          return;
        }
        if (!await showConfirm('Import this progress data? It will overwrite your current progress for "' + currentUser + '".')) return;
        progress = _normalizeProgressState(data);
        _flushSave();
        updateNav();
        renderHome();
        showAlert('Progress imported successfully!');
      } catch(err) {
        showAlert('Could not read file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

// Handle Enter key in profile name input
document.getElementById('profile-name-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') createProfile();
});

// ════════════════════════════════════════
//  PROFILE MENU HELPERS
// ════════════════════════════════════════
function updateProfileMenuHeader() {
  const el = document.getElementById('pmh-name');
  const st = document.getElementById('pmh-stats');
  if (el) el.textContent = currentUser || '';
  if (st) st.innerHTML = `<span>⭐ ${toBnDigits(progress.xp)} ${t('XP')}</span><span>🔥 ${toBnDigits(progress.streak)}</span><span>🧊 ${toBnDigits(progress.freezeTokens || 0)}</span><span>🏅 ${toBnDigits((progress.achievements||[]).length)}</span>`;
}

// ════════════════════════════════════════
//  PROGRESS ADJUSTMENT PANEL
// ════════════════════════════════════════
let _progOpenSections = new Set(['alphabet']); // alphabet expanded by default
let _progOpenGroups   = new Set();

function openProgressPanel() {
  renderProgressPanel();
  closeSettingsPanel();
  document.getElementById('progress-overlay').classList.add('open');
  document.addEventListener('keydown', _progressEsc);
}
function closeProgressPanel() {
  document.getElementById('progress-overlay').classList.remove('open');
  document.removeEventListener('keydown', _progressEsc);
}
function _progressEsc(e) { if (e.key === 'Escape') closeProgressPanel(); }

function toggleProgSection(id) {
  _progOpenSections.has(id) ? _progOpenSections.delete(id) : _progOpenSections.add(id);
  renderProgressPanel();
}
function toggleProgGroup(id) {
  _progOpenGroups.has(id) ? _progOpenGroups.delete(id) : _progOpenGroups.add(id);
  renderProgressPanel();
}

function cycleLetterMastery(letter) {
  const cur = getMastery(letter);
  progress.mastery[letter] = (cur + 1) % 5;
  saveProgress();
  renderProgressPanel();
}
function cycleVocabChipMastery(bengali) {
  const cur = getVocabMastery(bengali);
  progress.mastery[_vocabKey(bengali)] = (cur + 1) % 5;
  saveProgress();
  renderProgressPanel();
}
function setGrammarLessonLevel(lessonId, level) {
  const lesson = GRAMMAR_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  lesson.quiz.forEach((_, i) => { progress.mastery['g:' + lessonId + ':' + i] = level; });
  saveProgress();
  renderProgressPanel();
}
function resetPhrasesSituation(slug) {
  PHRASES_DATA.filter(p => p.situation === slug).forEach(p => {
    delete progress.mastery['ph:' + p.id];
  });
  saveProgress();
  renderProgressPanel();
}

function renderProgressPanel() {
  document.getElementById('progress-body').innerHTML =
    _buildAlphabetSection() + _buildVocabSection() + _buildGrammarSection() + _buildPhrasesSection();
}

function _buildAlphabetSection() {
  const allLetters = ALL_LETTERS;
  const totalAll = allLetters.length;
  const masteredAll = allLetters.filter(l => getMastery(l.letter) >= 3).length;
  const isOpen = _progOpenSections.has('alphabet');
  const arrowCls = isOpen ? 'open' : '';

  let html = `<div class="prog-section">
    <div class="prog-section-hdr" data-action="toggle-prog-section" data-section="alphabet">
      <span class="prog-section-icon">🔤</span>
      <span class="prog-section-label">Alphabet</span>
      <span class="prog-section-summary">${masteredAll}/${totalAll} mastered</span>
      <span class="prog-section-arrow ${arrowCls}">▼</span>
    </div>`;

  if (isOpen) {
    MODULES.forEach(mod => {
      if (mod.isChart || mod.isMixed || !mod.letters) return;
      const letters = mod.letters;
      const masteredCount = letters.filter(l => getMastery(l.letter) >= 3).length;
      const total = letters.length;
      const pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
      const grpOpen = _progOpenGroups.has(mod.id);
      const grpArrowCls = grpOpen ? 'open' : '';

      html += `<div class="prog-group">
        <div class="prog-group-hdr" data-action="toggle-prog-group" data-group="${mod.id}">
          <span class="prog-group-label">${mod.title}</span>
          <div class="prog-group-bar"><div class="prog-group-bar-fill" style="width:${pct}%"></div></div>
          <span class="prog-group-count">${masteredCount}/${total}</span>
          <span class="prog-group-arrow ${grpArrowCls}">▼</span>
        </div>`;

      if (grpOpen) {
        html += `<div class="prog-chips">`;
        letters.forEach(l => {
          const lvl = getMastery(l.letter);
          const safeL = l.letter.replace(/'/g, "\\'");
          html += `<div class="prog-chip" data-level="${lvl}" data-action="cycle-letter-mastery" data-letter="${safeL}" title="${l.roman || ''}">${l.letter}</div>`;
        });
        html += `</div>`;
      }
      html += `</div>`;
    });
  }
  html += `</div>`;
  return html;
}

function _buildVocabSection() {
  const cats = [...new Set(VOCAB_DATA.map(w => w.category))];
  const totalVocab = VOCAB_TOTAL_WORDS;
  const masteredVocab = Object.entries(progress.mastery).filter(([k, v]) => k.startsWith('v:') && v >= 3).length;
  const isOpen = _progOpenSections.has('vocab');
  const arrowCls = isOpen ? 'open' : '';

  let html = `<div class="prog-section">
    <div class="prog-section-hdr" data-action="toggle-prog-section" data-section="vocab">
      <span class="prog-section-icon">📖</span>
      <span class="prog-section-label">Vocabulary</span>
      <span class="prog-section-summary">${masteredVocab}/${totalVocab} mastered</span>
      <span class="prog-section-arrow ${arrowCls}">▼</span>
    </div>`;

  if (isOpen) {
    cats.forEach(cat => {
      const words = VOCAB_DATA.filter(w => w.category === cat);
      const masteredCount = words.filter(w => getVocabMastery(w) >= 3).length;
      const total = words.length;
      const pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
      const grpId = 'vocab:' + cat;
      const grpOpen = _progOpenGroups.has(grpId);
      const grpArrowCls = grpOpen ? 'open' : '';

      html += `<div class="prog-group">
        <div class="prog-group-hdr" data-action="toggle-prog-group" data-group="${grpId}">
          <span class="prog-group-label">${cat}</span>
          <div class="prog-group-bar"><div class="prog-group-bar-fill" style="width:${pct}%"></div></div>
          <span class="prog-group-count">${masteredCount}/${total}</span>
          <span class="prog-group-arrow ${grpArrowCls}">▼</span>
        </div>`;

      if (grpOpen) {
        html += `<div class="prog-chips">`;
        words.forEach(w => {
          const lvl = getVocabMastery(w);
          const safeB = w.lemma.replace(/'/g, "\\'");
          const eng = (w.english || '').replace(/"/g, '&quot;');
          html += `<div class="prog-chip" data-level="${lvl}" data-action="cycle-vocab-mastery" data-lemma="${safeB}" title="${eng}">${w.lemma}</div>`;
        });
        html += `</div>`;
      }
      html += `</div>`;
    });
  }
  html += `</div>`;
  return html;
}

function _buildGrammarSection() {
  const totalLessons = GRAMMAR_LESSONS.length;
  const masteredLessons = GRAMMAR_LESSONS.filter(l => getLessonProgress(l).pct === 100).length;
  const isOpen = _progOpenSections.has('grammar');
  const arrowCls = isOpen ? 'open' : '';

  let html = `<div class="prog-section">
    <div class="prog-section-hdr" data-action="toggle-prog-section" data-section="grammar">
      <span class="prog-section-icon">📝</span>
      <span class="prog-section-label">Grammar</span>
      <span class="prog-section-summary">${masteredLessons}/${totalLessons} complete</span>
      <span class="prog-section-arrow ${arrowCls}">▼</span>
    </div>`;

  if (isOpen) {
    GRAMMAR_LESSONS.forEach(lesson => {
      const lp = getLessonProgress(lesson);
      const safeId = lesson.id.replace(/'/g, "\\'");
      html += `<div class="prog-grammar-row">
        <span class="prog-grammar-num">${lesson.number}</span>
        <div class="prog-grammar-info">
          <div class="prog-grammar-title">${lesson.title}</div>
          <div class="prog-grammar-desc">${lesson.shortDesc || ''}</div>
        </div>
        <div class="prog-grammar-bar"><div class="prog-grammar-bar-fill" style="width:${lp.pct}%"></div></div>
        <div class="prog-grammar-btns">
          <button class="prog-grammar-btn" data-action="set-lesson-level" data-id="${safeId}" data-level="0">Reset</button>
          <button class="prog-grammar-btn done" data-action="set-lesson-level" data-id="${safeId}" data-level="3">Done ✓</button>
        </div>
      </div>`;
    });
  }
  html += `</div>`;
  return html;
}

function _buildPhrasesSection() {
  const totalPhrases = PHRASES_DATA.length;
  const masteredPhrases = PHRASES_DATA.filter(p => getPhraseMastery(p.id) >= 3).length;
  const isOpen = _progOpenSections.has('phrases');
  const arrowCls = isOpen ? 'open' : '';

  let html = `<div class="prog-section">
    <div class="prog-section-hdr" data-action="toggle-prog-section" data-section="phrases">
      <span class="prog-section-icon">💬</span>
      <span class="prog-section-label">Phrases</span>
      <span class="prog-section-summary">${masteredPhrases}/${totalPhrases} mastered</span>
      <span class="prog-section-arrow ${arrowCls}">▼</span>
    </div>`;

  if (isOpen) {
    PHRASES_WAVE_ORDER.forEach(slug => {
      const sit = PHRASES_SITUATIONS.find(s => s.slug === slug);
      if (!sit) return;
      const phrases = PHRASES_DATA.filter(p => p.situation === slug);
      const mastered = phrases.filter(p => getPhraseMastery(p.id) >= 3).length;
      const pct = phrases.length ? Math.round((mastered / phrases.length) * 100) : 0;
      html += `<div class="prog-grammar-row">
        <div class="prog-grammar-info">
          <div class="prog-grammar-title">${sit.title}</div>
          <div class="prog-grammar-desc">${mastered}/${phrases.length} mastered</div>
        </div>
        <div class="prog-grammar-bar"><div class="prog-grammar-bar-fill" style="width:${pct}%"></div></div>
        <div class="prog-grammar-btns">
          <button class="prog-grammar-btn" data-action="reset-phrases-situation" data-slug="${slug}">Reset</button>
        </div>
      </div>`;
    });
  }
  html += `</div>`;
  return html;
}

// ════════════════════════════════════════
//  LIGHT MODE TOGGLE
// ════════════════════════════════════════
function toggleTheme() {
  const isLight = document.documentElement.dataset.theme === 'light';
  document.documentElement.dataset.theme = isLight ? '' : 'light';
  document.getElementById('nav-theme-btn').textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('bengali_theme', isLight ? 'dark' : 'light');
}
(function initTheme() {
  const saved = localStorage.getItem('bengali_theme');
  if (saved === 'light') {
    document.documentElement.dataset.theme = 'light';
    const btn = document.getElementById('nav-theme-btn');
    if (btn) btn.textContent = '🌙';
  }
})();

// ════════════════════════════════════════
//  MASTERY LEGEND TOGGLE
// ════════════════════════════════════════
function toggleMasteryLegend() {
  const leg = document.getElementById('mastery-legend');
  if (leg) leg.style.display = leg.style.display === 'none' ? '' : 'none';
}

// ════════════════════════════════════════
//  PROGRESS OBJECT MIGRATION
// (called after loading progress from localStorage)
// ════════════════════════════════════════
function migrateProgress() {
  if (!progress.achievements) progress.achievements = [];
  if (!progress.practiceLog) progress.practiceLog = {};
  if (!progress.lastSeen) progress.lastSeen = {};
  if (!progress.fsrs) {
    progress.fsrs = {};
    // Seed FSRS data from existing integer mastery so scheduling is continuous
    const sMap = { 1: 1, 2: 3, 3: 7, 4: 21 };
    Object.entries(progress.mastery || {}).forEach(([key, level]) => {
      if (level >= 1) {
        progress.fsrs[key] = { s: sMap[level] || 1, d: 5, reps: level, lapses: 0 };
      }
    });
  }
}

// ════════════════════════════════════════
//  ACHIEVEMENTS
// ════════════════════════════════════════
const ACHIEVEMENTS = [
  { id: 'first-quiz',       icon: '🎯', label: 'First Quiz',         test: () => true },
  { id: 'vowel-master',     icon: '🔤', label: 'Vowel Master',       test: () => VOWELS.every(v => getMastery(v.letter) >= 3) },
  { id: 'alphabet-complete',icon: '📚', label: 'Full Alphabet',      test: () => ALL_LETTERS.every(l => getMastery(l.letter) >= 3) },
  { id: 'century',          icon: '⭐', label: 'Century',            test: () => progress.xp >= 100 },
  { id: 'word-collector',   icon: '📖', label: 'Word Collector',     test: () => VOCAB_DATA.filter(w => getVocabMastery(w) >= 3).length >= 50 },
  { id: 'vocab-champion',   icon: '🏆', label: 'Vocab Champion',     test: () => VOCAB_DATA.filter(w => getVocabMastery(w) >= 3).length >= 500 },
  { id: 'grammar-start',    icon: '📝', label: 'Grammar Beginner',   test: () => GRAMMAR_LESSONS.some(l => getLessonProgress(l).pct === 100) },
  { id: 'grammar-graduate', icon: '🎓', label: 'Grammar Graduate',   test: () => GRAMMAR_LESSONS.every(l => getLessonProgress(l).pct === 100) },
  { id: 'streak-3',         icon: '🔥', label: 'On a Roll',          test: () => progress.streak >= 3 },
  { id: 'streak-7',         icon: '💪', label: 'Week Warrior',       test: () => progress.streak >= 7 },
  { id: 'xp-500',           icon: '💎', label: 'XP Hunter',          test: () => progress.xp >= 500 },
  { id: 'xp-1000',          icon: '👑', label: 'XP Legend',           test: () => progress.xp >= 1000 },
  { id: 'streak-14',        icon: '🔥', label: 'Two-Week Streak',    test: () => progress.streak >= 14 },
  { id: 'streak-30',        icon: '🏅', label: 'Monthly Dedication', test: () => progress.streak >= 30 },
  { id: 'word-100',         icon: '📖', label: 'Word Explorer',      test: () => VOCAB_DATA.filter(w => getVocabMastery(w) >= 3).length >= 100 },
  { id: 'word-200',         icon: '📚', label: 'Word Scholar',       test: () => VOCAB_DATA.filter(w => getVocabMastery(w) >= 3).length >= 200 },
  { id: 'culture-5',        icon: '🌏', label: 'Culture Explorer',   test: () => {
    const mods = ['movies:', 'music:', 'recipes:', 'poetry:', 'sports:', 'proverbs:', 'folktales:', 'festivals:', 'history:', 'travel:'];
    return mods.filter(prefix => Object.keys(progress.quizHistory || {}).some(k => k.startsWith(prefix))).length >= 5;
  }},
  { id: 'culture-all',      icon: '🎭', label: 'Culture Master',     test: () => {
    const mods = ['movies:', 'music:', 'recipes:', 'poetry:', 'sports:', 'proverbs:', 'folktales:', 'festivals:', 'history:', 'travel:'];
    return mods.every(prefix => Object.keys(progress.quizHistory || {}).some(k => k.startsWith(prefix)));
  }},
  { id: 'conv-first',       icon: '💬', label: 'First Conversation', test: () => Object.keys(progress.mastery || {}).some(k => k.startsWith('cvrp:') && progress.mastery[k] >= 1) },
  { id: 'conv-5',           icon: '🗣️', label: 'Chatterbox',         test: () => {
    const done = new Set();
    Object.keys(progress.mastery || {}).forEach(k => { if (k.startsWith('cvrp:') && progress.mastery[k] >= 1) done.add(k); });
    return done.size >= 5;
  }},
  { id: 'grammar-5',        icon: '✏️', label: 'Grammar Student',    test: () => GRAMMAR_LESSONS.filter(l => getLessonProgress(l).pct === 100).length >= 5 },
  { id: 'writing-10',       icon: '✍️', label: 'Script Writer',      test: () => Object.keys(progress.mastery || {}).filter(k => k.startsWith('canvas:') && progress.mastery[k] >= 1).length >= 10 },
  { id: 'phrase-3',         icon: '💡', label: 'Phrase Learner',     test: () => {
    const sits = PHRASES_SITUATIONS || [];
    return sits.filter(s => {
      const phrases = (PHRASES_DATA || []).filter(p => p.situation === s.id);
      return phrases.length > 0 && phrases.every(p => getPhraseMastery(p.id) >= 3);
    }).length >= 3;
  }},
  { id: 'all-tabs',         icon: '⭐', label: 'Explorer',            test: () => {
    const tabs = ['folktales:', 'festivals:', 'history:', 'travel:', 'conversations:'];
    const hist = progress.quizHistory || {};
    return tabs.every(prefix => Object.keys(hist).some(k => k.startsWith(prefix)));
  }},
  { id: 'perfect-quiz',     icon: '💯', label: 'Perfect Score',      test: () => {
    const hist = progress.quizHistory || {};
    return Object.values(hist).some(v => v.best === 100);
  }},
];

let _achToastTimer = null;
function checkAchievements() {
  const earned = progress.achievements || [];
  ACHIEVEMENTS.forEach(ach => {
    if (earned.includes(ach.id)) return;
    if (ach.test()) {
      earned.push(ach.id);
      progress.achievements = earned;
      _flushSave();
      showAchievementToast(ach);
    }
  });
}

function showAchievementToast(ach) {
  const toast = document.getElementById('achievement-toast');
  if (!toast) return;
  document.getElementById('ach-toast-icon').textContent = ach.icon;
  document.getElementById('ach-toast-name').textContent = ach.label;
  toast.classList.add('show');
  if (_achToastTimer) clearTimeout(_achToastTimer);
  _achToastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ════════════════════════════════════════
//  STATISTICS PANEL
// ════════════════════════════════════════
function openStatsPanel() {
  closeSettingsPanel();
  renderStatsPanel();
  document.getElementById('stats-overlay').classList.add('open');
  document.addEventListener('keydown', _statsEsc);
}
function closeStatsPanel() {
  document.getElementById('stats-overlay').classList.remove('open');
  document.removeEventListener('keydown', _statsEsc);
}
function _statsEsc(e) { if (e.key === 'Escape') closeStatsPanel(); }

function renderStatsPanel() {
  const totalLetters = ALL_LETTERS.length;
  const masteredLetters = ALL_LETTERS.filter(l => getMastery(l.letter) >= 3).length;
  const totalVocab = VOCAB_TOTAL_WORDS;
  const masteredVocab = Object.entries(progress.mastery).filter(([k, v]) => k.startsWith('v:') && v >= 3).length;
  const totalLessons = GRAMMAR_LESSONS.length;
  const masteredLessons = GRAMMAR_LESSONS.filter(l => getLessonProgress(l).pct === 100).length;

  // Summary
  let html = `<div class="stats-summary">
    <div class="stat-card"><div class="stat-card-val">${toBnDigits(progress.xp)}</div><div class="stat-card-lbl">${t('Total XP')}</div></div>
    <div class="stat-card"><div class="stat-card-val">${toBnDigits(progress.streak)}</div><div class="stat-card-lbl">${t('Day Streak')}</div></div>
    <div class="stat-card"><div class="stat-card-val">${toBnDigits(masteredLetters)}/${toBnDigits(totalLetters)}</div><div class="stat-card-lbl">${t('Letters')}</div></div>
    <div class="stat-card"><div class="stat-card-val">${toBnDigits(masteredVocab)}/${toBnDigits(totalVocab)}</div><div class="stat-card-lbl">${t('Words')}</div></div>
    <div class="stat-card"><div class="stat-card-val">${toBnDigits(masteredLessons)}/${toBnDigits(totalLessons)}</div><div class="stat-card-lbl">${t('Lessons')}</div></div>
    <div class="stat-card"><div class="stat-card-val">${toBnDigits((progress.achievements||[]).length)}</div><div class="stat-card-lbl">${t('Badges')}</div></div>
  </div>`;

  // Activity heatmap
  html += `<div class="stats-section-title">${t('Activity — Past 13 Weeks')}</div>`;
  html += _buildHeatmap();

  // Mastery breakdown bars
  const letterPct = Math.round((masteredLetters / totalLetters) * 100);
  const vocabPct = Math.round((masteredVocab / totalVocab) * 100);
  const grammarPct = Math.round((masteredLessons / totalLessons) * 100);
  const totalPhrases = PHRASES_DATA.length;
  const masteredPhrases = PHRASES_DATA.filter(p => getPhraseMastery(p.id) >= 3).length;
  const phrasesPct = totalPhrases ? Math.round((masteredPhrases / totalPhrases) * 100) : 0;
  const totalConjuncts = CONJUNCTS.length;
  const masteredConjuncts = CONJUNCTS.filter(c => getMastery(c.letter) >= 3).length;
  const conjunctsPct = totalConjuncts ? Math.round((masteredConjuncts / totalConjuncts) * 100) : 0;
  html += `<div class="stats-section-title" style="margin-top:20px">Mastery Breakdown</div>
  <div class="mastery-bar-row"><span class="mastery-bar-lbl">🔤 Alphabet</span><div class="mastery-bar-track"><div class="mastery-bar-fill" style="width:${letterPct}%"></div></div><span class="mastery-bar-pct">${letterPct}%</span></div>
  <div class="mastery-bar-row"><span class="mastery-bar-lbl">🔗 Conjuncts</span><div class="mastery-bar-track"><div class="mastery-bar-fill" style="width:${conjunctsPct}%"></div></div><span class="mastery-bar-pct">${conjunctsPct}%</span></div>
  <div class="mastery-bar-row"><span class="mastery-bar-lbl">📖 Vocabulary</span><div class="mastery-bar-track"><div class="mastery-bar-fill" style="width:${vocabPct}%"></div></div><span class="mastery-bar-pct">${vocabPct}%</span></div>
  <div class="mastery-bar-row"><span class="mastery-bar-lbl">📝 Grammar</span><div class="mastery-bar-track"><div class="mastery-bar-fill" style="width:${grammarPct}%"></div></div><span class="mastery-bar-pct">${grammarPct}%</span></div>
  <div class="mastery-bar-row"><span class="mastery-bar-lbl">💬 Phrases</span><div class="mastery-bar-track"><div class="mastery-bar-fill" style="width:${phrasesPct}%"></div></div><span class="mastery-bar-pct">${phrasesPct}%</span></div>`;

  // Strongest/weakest vocab category
  const cats = [...new Set(VOCAB_DATA.map(w => w.category))];
  let bestCat = null, worstCat = null, bestPct = -1, worstPct = 101;
  cats.forEach(cat => {
    const words = VOCAB_DATA.filter(w => w.category === cat);
    if (words.length < 3) return;
    const pct = Math.round((words.filter(w => getVocabMastery(w) >= 3).length / words.length) * 100);
    if (pct > bestPct) { bestPct = pct; bestCat = cat; }
    if (pct < worstPct) { worstPct = pct; worstCat = cat; }
  });
  if (bestCat && worstCat) {
    html += `<div class="stats-section-title" style="margin-top:20px">Vocabulary Insights</div>
    <div class="cat-insight">
      <div class="cat-insight-card"><div class="cat-insight-tag">💪 Strongest</div><div class="cat-insight-name">${bestCat}</div><div class="cat-insight-pct">${bestPct}% mastered</div></div>
      <div class="cat-insight-card"><div class="cat-insight-tag">📚 Needs Work</div><div class="cat-insight-name">${worstCat}</div><div class="cat-insight-pct">${worstPct}% mastered</div></div>
    </div>`;
  }

  // Per-letter alphabet grid
  html += `<div class="stats-section-title" style="margin-top:20px">Letters Detail</div>
  <div class="stats-letter-grid">`;
  ALL_LETTERS.forEach(l => {
    const lvl = getMastery(l.letter);
    html += `<div class="ml-chip lvl${lvl}" title="${l.name} — level ${lvl}">${l.letter}</div>`;
  });
  html += `</div>`;

  // Per-category vocab rows
  html += `<div class="stats-section-title" style="margin-top:20px">Vocabulary by Category</div>
  <div class="stats-cat-list">`;
  Object.entries(VOCAB_CATEGORIES).forEach(([key, cat]) => {
    const words = VOCAB_DATA.filter(w => w.category === key);
    if (!words.length) return;
    const mastered = words.filter(w => getVocabMastery(w) >= 3).length;
    const pct = Math.round((mastered / words.length) * 100);
    html += `<div class="stats-cat-row">
      <span class="stats-cat-icon">${cat.icon}</span>
      <span class="stats-cat-name">${cat.title}</span>
      <div class="mastery-bar-track" style="flex:1"><div class="mastery-bar-fill" style="width:${pct}%"></div></div>
      <span class="stats-cat-frac">${mastered}/${words.length}</span>
    </div>`;
  });
  html += `</div>`;

  // Per-lesson grammar rows
  html += `<div class="stats-section-title" style="margin-top:20px">Grammar Lessons</div>
  <div class="stats-cat-list">`;
  GRAMMAR_LESSONS.forEach(lesson => {
    const total = lesson.quiz.length;
    const mastered = lesson.quiz.filter((_, i) => getGrammarMastery(lesson.id, i) >= 2).length;
    const pct = total ? Math.round((mastered / total) * 100) : 0;
    html += `<div class="stats-cat-row">
      <span class="stats-cat-icon">📝</span>
      <span class="stats-cat-name">${lesson.number}. ${lesson.title}</span>
      <div class="mastery-bar-track" style="flex:1"><div class="mastery-bar-fill" style="width:${pct}%"></div></div>
      <span class="stats-cat-frac">${mastered}/${total}</span>
    </div>`;
  });
  html += `</div>`;

  // Achievements grid
  html += `<div class="stats-section-title" style="margin-top:20px">Achievements</div>
  <div class="ach-grid">`;
  ACHIEVEMENTS.forEach(ach => {
    const earned = (progress.achievements||[]).includes(ach.id);
    html += `<div class="ach-card${earned ? ' earned' : ''}">
      <div class="ach-card-icon">${ach.icon}</div>
      <div class="ach-card-name">${ach.label}</div>
    </div>`;
  });
  html += `</div>`;

  document.getElementById('stats-body').innerHTML = html;
}

function _buildHeatmap() {
  const log = progress.practiceLog || {};
  const today = new Date();
  // Build 91 days (13 weeks) ending today
  const days = [];
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  // Find max XP for scaling
  const maxXP = Math.max(1, ...days.map(d => log[d] || 0));

  // Month labels: determine which columns start a new month
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let monthHtml = '<div class="heatmap-months" style="gap:0;margin-bottom:4px;">';
  let lastMonth = -1;
  for (let col = 0; col < 13; col++) {
    const dayIdx = col * 7;
    if (dayIdx < days.length) {
      const m = new Date(days[dayIdx]).getMonth();
      if (m !== lastMonth) {
        monthHtml += `<span style="width:${(13-col)*15}px;flex-shrink:0">${monthNames[m]}</span>`;
        lastMonth = m;
      }
    }
  }
  monthHtml += '</div>';

  let gridHtml = '<div class="heatmap-grid">';
  days.forEach(date => {
    const xp = log[date] || 0;
    let level = 0;
    if (xp > 0) level = xp >= 25 ? 3 : xp >= 10 ? 2 : 1;
    const today10 = today.toISOString().slice(0,10);
    const outline = date === today10 ? ' style="outline:1.5px solid var(--accent);outline-offset:1px"' : '';
    gridHtml += `<div class="heatmap-cell" data-level="${level}" title="${date}: ${toBnDigits(xp)} ${t('XP')}"${outline}></div>`;
  });
  gridHtml += '</div>';

  return `<div class="heatmap-wrap">${monthHtml}${gridHtml}</div>`;
}

// ════════════════════════════════════════
//  TODAY SCREEN
// ════════════════════════════════════════
const READING_PASSAGE_BANK = READING_PASSAGES.map(p => ({
  ...p,
  length: passageWordCount(p.text),
  vocabIds: Array.from(new Set(p.vocabIds || [])),
}));

let readingSession = null;

function ensureReadingUI() {
  const tabBar = document.getElementById('tab-bar');
  let readingBtn;
  if (tabBar && !tabBar.querySelector('[data-tab="reading"]')) {
    readingBtn = document.createElement('button');
    readingBtn.className = 'tab-btn';
    readingBtn.dataset.action = 'switch-tab';
    readingBtn.dataset.tab = 'reading';
    readingBtn.setAttribute('data-t', 'Reading');
    readingBtn.textContent = t('Reading');
    const phrasesBtn = tabBar.querySelector('[data-tab="phrases"]');
    const insertParent = phrasesBtn ? phrasesBtn.parentNode : tabBar;
    if (phrasesBtn && phrasesBtn.nextSibling) insertParent.insertBefore(readingBtn, phrasesBtn.nextSibling);
    else insertParent.appendChild(readingBtn);
  } else if (tabBar) {
    readingBtn = tabBar.querySelector('[data-tab="reading"]');
    if (readingBtn) readingBtn.textContent = t('Reading');
  }

  if (!document.getElementById('reading-screen')) {
    const home = document.getElementById('home');
    if (!home || !home.parentElement) return;
    const screen = document.createElement('div');
    screen.className = 'screen';
    screen.id = 'reading-screen';
    screen.innerHTML = `
      <div class="hero">
        <h2>পাঠ</h2>
        <p data-t="Short passages with vocabulary-aware filtering and quick lookup.">${t('Short passages with vocabulary-aware filtering and quick lookup.')}</p>
      </div>
      <div id="reading-body" style="padding:0 1rem 2rem"></div>`;
    home.parentElement.insertBefore(screen, home.nextSibling);
  } else {
    const subtitle = document.querySelector('#reading-screen .hero p');
    if (subtitle) subtitle.textContent = t('Short passages with vocabulary-aware filtering and quick lookup.');
  }
}

function getReadingUnlockedCount() {
  const completed = Object.keys(progress.reading?.completed || {}).length;
  const unlocked = Math.max(1, Math.min(READING_PASSAGE_BANK.length, 1 + Math.floor(completed / 1)));
  progress.reading.unlocked = unlocked;
  return unlocked;
}

function _readingMasteryRatio(passage) {
  if (!passage.vocabIds.length) return 1;
  let known = 0;
  passage.vocabIds.forEach(id => {
    if (getVocabMastery(id) >= 2) known++;
  });
  return known / passage.vocabIds.length;
}

function getRecommendedReadingPassages() {
  const unlocked = getReadingUnlockedCount();
  return READING_PASSAGE_BANK
    .slice(0, unlocked)
    .filter(p => _readingMasteryRatio(p) >= 0.65)
    .sort((a, b) => _readingMasteryRatio(b) - _readingMasteryRatio(a));
}

function renderReadingScreen() {
  ensureReadingUI();
  const body = document.getElementById('reading-body');
  if (!body) return;

  const unlockedCount = getReadingUnlockedCount();
  const recommended = getRecommendedReadingPassages();
  const completedCount = Object.keys(progress.reading?.completed || {}).length;

  let html = `<div class="today-section"><div class="today-section-hdr"><span class="today-section-icon">📘</span><div><div class="today-section-title">${t('Reading Progress')}</div><div class="today-section-sub">${toBnDigits(completedCount)}/${toBnDigits(READING_PASSAGE_BANK.length)} ${t('passages completed')} · ${toBnDigits(unlockedCount)}/${toBnDigits(READING_PASSAGE_BANK.length)} ${t('unlocked')}</div></div></div></div>`;

  html += '<div class="today-section"><div class="today-section-hdr"><span class="today-section-icon">🧭</span><div><div class="today-section-title">Recommended</div><div class="today-section-sub">Passages where most required vocabulary is already familiar</div></div></div>';
  if (recommended.length) {
    html += recommended.slice(0, 2).map(p => `<button class="btn-secondary today-action-btn" data-action="start-reading-passage" data-id="${p.id}">Start: ${escHtml(p.title)} (${p.level})</button>`).join('');
  } else {
    html += '<div class="today-done-badge">Review more vocabulary to unlock easier reading first.</div>';
  }
  html += '</div>';

  html += '<div class="today-section"><div class="today-section-hdr"><span class="today-section-icon">📚</span><div><div class="today-section-title">Passage Bank</div><div class="today-section-sub">CEFR-like level, tokenized vocabulary IDs, and 50–150 word passages</div></div></div>';
  READING_PASSAGE_BANK.forEach((p, idx) => {
    const unlocked = idx < unlockedCount;
    const mastery = Math.round(_readingMasteryRatio(p) * 100);
    const best = progress.reading?.best?.[p.id];
    html += `<div class="module-card" style="margin-top:10px;cursor:${unlocked ? 'pointer' : 'not-allowed'};opacity:${unlocked ? '1' : '0.55'}" ${unlocked ? `data-action="start-reading-passage" data-id="${p.id}"` : ''}>
      <div class="module-icon">📄</div>
      <h3>${escHtml(p.title)}</h3>
      <p>Level ${p.level} · ${p.length} words · vocab IDs: ${p.vocabIds.length}</p>
      <div class="progress-label">Known required vocab: ${mastery}%${typeof best === 'number' ? ` · Best check score: ${best}%` : ''}</div>
    </div>`;
  });
  html += '</div>';

  if (readingSession) {
    html += renderReadingSessionHTML();
  }

  body.innerHTML = html;
}

function startReadingPassage(id) {
  const passage = READING_PASSAGE_BANK.find(p => p.id === id);
  if (!passage) return;
  readingSession = { id, answers: {}, submitted: false };
  switchTab('reading');
  renderReadingScreen();
}

function renderReadingSessionHTML() {
  const passage = READING_PASSAGE_BANK.find(p => p.id === readingSession.id);
  if (!passage) return '';

  const tokens = passage.text.split(/(\s+)/).map(tok => {
    const lemma = tok.replace(/[^ঀ-৿A-Za-z]/g, '');
    if (!lemma) return escHtml(tok);
    const isTracked = passage.vocabIds.includes(lemma);
    const unknown = isTracked && getVocabMastery(lemma) < 3;
    if (!unknown) return escHtml(tok);
    const safeLemma = escapeStr(lemma);
    return `<span class="today-word-bn" style="cursor:pointer;border-bottom:1px dashed var(--accent)" data-action="reading-lookup" data-lemma="${safeLemma}">${escHtml(tok)}</span>`;
  }).join('');

  let html = `<div class="today-section"><div class="today-section-hdr"><span class="today-section-icon">📝</span><div><div class="today-section-title">${escHtml(passage.title)}</div><div class="today-section-sub">Tap underlined words for lookup.</div></div></div><div style="line-height:1.9;font-size:1.02rem">${tokens}</div></div>`;

  html += '<div class="today-section"><div class="today-section-hdr"><span class="today-section-icon">✅</span><div><div class="today-section-title">Comprehension Check</div></div></div>';
  passage.checks.forEach((q, qi) => {
    html += `<div style="margin:10px 0"><div style="margin-bottom:6px">${qi + 1}. ${escHtml(q.prompt)}</div><div class="mc-options">`;
    q.options.forEach((opt, oi) => {
      const selected = readingSession.answers[qi] === oi;
      html += `<button class="mc-btn ${selected ? 'selected' : ''}" data-action="answer-reading-check" data-qi="${qi}" data-oi="${oi}">${escHtml(opt)}</button>`;
    });
    html += '</div></div>';
  });

  html += `<button class="btn-primary today-action-btn" data-action="submit-reading-check">${t('Submit & Earn XP →')}</button></div>`;
  return html;
}

function answerReadingCheck(qi, oi) {
  if (!readingSession) return;
  readingSession.answers[qi] = oi;
  renderReadingScreen();
}

function submitReadingCheck() {
  if (!readingSession || readingSession.submitted) return;
  const passage = READING_PASSAGE_BANK.find(p => p.id === readingSession.id);
  if (!passage) return;

  const total = passage.checks.length;
  let correct = 0;
  passage.checks.forEach((q, i) => {
    if (readingSession.answers[i] === q.correct) correct++;
  });
  const pct = Math.round((correct / total) * 100);
  progress.reading.completed[passage.id] = true;
  const prev = progress.reading.best[passage.id] || 0;
  if (pct > prev) progress.reading.best[passage.id] = pct;
  progress.reading.unlocked = getReadingUnlockedCount();
  const xp = 20 + Math.max(0, pct - 50);
  addXP(xp);
  saveProgress();
  checkAchievements();
  readingSession.submitted = true;
  showAlert(`Reading check: ${correct}/${total} (${pct}%). +${xp} XP earned!`);
  renderReadingScreen();
}

function openReadingLookup(lemma) {
  if (!lemma) return;
  showVocabDetail(lemma);
}


// ════════════════════════════════════════
function renderTodayScreen() {
  const body = document.getElementById('today-body');
  if (!body) return;

  const due = getDueItems();
  const dueCount = due.letters.length + due.vocab.length + due.grammar.length + due.phrases.length;
  const dueForecast = getDueForecastByOffset(7);
  const dueNext7Count = dueForecast.slice(1).reduce((sum, n) => sum + n, 0);
  const forecastLabels = ['Today', 'Tomorrow', 'Next 7 days'];
  const forecastCounts = [dueForecast[0] || 0, dueForecast[1] || 0, dueNext7Count];

  // Next unseen vocab words
  const unlocked = getVocabMixedUnlockedCount();
  const pool = VMIX_CURRICULUM.slice(0, unlocked);
  const newWords = pool.filter(w => getVocabMastery(w) === 0).slice(0, 5);

  // Next grammar lesson user hasn't mastered
  const nextGrammar = GRAMMAR_LESSONS.find(l => {
    const prog = getLessonProgress(l);
    return prog.seen < prog.total || prog.mastered < prog.total;
  });

  const todayLocale = getDisplayMode() === 'immersion' ? 'bn-BD' : 'en-US';
  const today = new Date().toLocaleDateString(todayLocale, { weekday: 'long', month: 'long', day: 'numeric' });

  let html = `<div class="today-date">${today}</div>`;

  // ── Lesson of the Day ──
  const lessonOfDay = getLessonOfDay(getLessonProgress);
  if (lessonOfDay) {
    const firstExample = lessonOfDay.examples && lessonOfDay.examples[0];
    html += `<div class="today-lesson-card">
      <div class="tlc-badge">📚 ${t('Lesson of the Day')}</div>
      <div class="tlc-title">${t('Lesson')} ${toBnDigits(lessonOfDay.number)}: ${escHtml(lessonOfDay.title)}</div>
      ${firstExample ? `<div class="tlc-example"><span class="tlc-bn">${escHtml(displayBengali(firstExample.bengali, firstExample.roman))}</span><span class="tlc-en">${escHtml(firstExample.english)}</span></div>` : ''}
      <button class="btn-primary today-action-btn" data-action="open-grammar-lesson" data-id="${lessonOfDay.id}">${t('Start Lesson →')}</button>
    </div>`;
  }

  // ── Reviews ──
  if (dueCount > 0) {
    html += `<div class="today-review-alert">
      <div class="tra-left">
        <div class="tra-icon">🔔</div>
        <div>
          <div class="tra-count">${toBnDigits(dueCount)} <span style="font-size:1rem;font-weight:600">${t('due')}</span></div>
          <div class="tra-label">${t(dueCount !== 1 ? 'items ready for review' : 'item ready for review')}</div>
        </div>
      </div>
      <button class="btn-primary" data-action="review-and-alphabet" style="white-space:nowrap">${t('Start Review →')}</button>
    </div>`;
  }
  html += `<div class="today-section">
    <div class="today-section-hdr">
      <span class="today-section-icon">🔔</span>
      <div>
        <div class="today-section-title">${t('Due for Review')}</div>
        <div class="today-section-sub">${dueCount > 0 ? toBnDigits(dueCount) + ' ' + t(dueCount !== 1 ? 'items ready for review' : 'item ready for review') : t('All caught up! Nothing due right now.')}</div>
      </div>
    </div>
    <div class="today-forecast" aria-label="Due forecast">
      <div class="today-forecast-list">
        ${forecastLabels.map((label, idx) => `<div class="today-forecast-row"><span>${t(label)}</span><strong>${toBnDigits(forecastCounts[idx])}</strong></div>`).join('')}
      </div>
      <div class="today-forecast-calendar">
        ${dueForecast.map((count, offset) => {
          const day = new Date(Date.now() + offset * 86400000);
          const dow = day.toLocaleDateString(getDisplayMode() === 'immersion' ? 'bn-BD' : 'en-US', { weekday: 'short' }).slice(0, 1);
          return `<div class="today-forecast-day${offset === 0 ? ' is-today' : ''}"><span>${dow}</span><strong>${toBnDigits(count)}</strong></div>`;
        }).join('')}
      </div>
    </div>
    ${dueCount > 0 ? `<button class="btn-primary today-action-btn" data-action="review-and-alphabet">${t('Start Review →')}</button>` : `<div class="today-done-badge">✓ ${t('Done')}</div>`}
  </div>`;

  // ── New vocab ──
  html += `<div class="today-section">
    <div class="today-section-hdr">
      <span class="today-section-icon">📖</span>
      <div>
        <div class="today-section-title">${t('New Vocabulary')}</div>
        <div class="today-section-sub">${newWords.length > 0 ? toBnDigits(newWords.length) + ' ' + t(newWords.length !== 1 ? 'new words in your queue' : 'new word in your queue') : t('No new words queued — keep practicing!')}</div>
      </div>
    </div>`;
  if (newWords.length > 0) {
    html += '<div class="today-word-list">' + newWords.map(w =>
      `<div class="today-word-chip"><span class="today-word-bn">${escHtml(displayBengali(w.lemma, w.roman))}</span><span class="today-word-en">${escHtml(w.english)}</span></div>`
    ).join('') + '</div>';
    html += `<button class="btn-secondary today-action-btn" data-action="vocab-practice">${t('Study These →')}</button>`;
  } else {
    html += `<div class="today-done-badge">✓ ${t('All unlocked words seen')}</div>`;
  }
  html += '</div>';

  // ── Grammar ──
  html += `<div class="today-section">
    <div class="today-section-hdr">
      <span class="today-section-icon">📚</span>
      <div>
        <div class="today-section-title">${t('Grammar')}</div>
        <div class="today-section-sub">${nextGrammar ? t('Lesson') + ' ' + toBnDigits(nextGrammar.number) + ': ' + escHtml(nextGrammar.title) : t('All lessons complete!')}</div>
      </div>
    </div>
    ${nextGrammar ? `<button class="btn-secondary today-action-btn" data-action="open-grammar-lesson" data-id="${nextGrammar.id}">${t('Open Lesson →')}</button>` : `<div class="today-done-badge">✓ ${t('Done')}</div>`}
  </div>`;

  // ── Phrases ──
  const unlockedSituations = PHRASES_WAVE_ORDER.slice(0, getPhrasesUnlockedSituationCount());
  const phrasesPool = PHRASES_DATA.filter(p => unlockedSituations.includes(p.situation));
  const phrasesToReview = phrasesPool.filter(p => getPhraseMastery(p.id) === 0).slice(0, 5);
  html += `<div class="today-section">
    <div class="today-section-hdr">
      <span class="today-section-icon">💬</span>
      <div>
        <div class="today-section-title">${t('Phrases')}</div>
        <div class="today-section-sub">${phrasesToReview.length > 0 ? toBnDigits(phrasesToReview.length) + ' ' + t(phrasesToReview.length !== 1 ? 'new phrases to learn' : 'new phrase to learn') : t('Keep practicing!')}</div>
      </div>
    </div>
    <button class="btn-secondary today-action-btn" data-action="switch-tab" data-tab="phrases">${t('Go to Phrases →')}</button>
  </div>`;

  // ── Reading ──
  const readingUnlocked = getReadingUnlockedCount();
  const readingNext = READING_PASSAGE_BANK.slice(0, readingUnlocked).find(p => !progress.reading?.completed?.[p.id]);
  const readingRecommended = getRecommendedReadingPassages()[0];
  const readingCompleted = Object.keys(progress.reading?.completed || {}).length;
  html += `<div class="today-section">
    <div class="today-section-hdr">
      <span class="today-section-icon">📘</span>
      <div>
        <div class="today-section-title">${t('Reading')}</div>
        <div class="today-section-sub">${toBnDigits(readingCompleted)}/${toBnDigits(READING_PASSAGE_BANK.length)} ${t('passages completed')} · ${toBnDigits(readingUnlocked)}/${toBnDigits(READING_PASSAGE_BANK.length)} ${t('unlocked')}</div>
      </div>
    </div>
    ${readingRecommended ? `<div class="progress-label">${t('Recommended')}: ${escHtml(readingRecommended.title)} (${readingRecommended.level})</div>` : ''}
    <button class="btn-secondary today-action-btn" data-action="start-reading-passage" data-id="${readingNext ? readingNext.id : READING_PASSAGE_BANK[0].id}">${readingNext ? t('Continue Reading') : t('Review Reading')} →</button>
  </div>`;

  // ── Mistake Review ──
  const mistakeCount = getResolvableUnresolvedMistakes().length;
  if (mistakeCount > 0) {
    html += `<div class="today-section">
      <div class="today-section-hdr">
        <span class="today-section-icon">🔁</span>
        <div>
          <div class="today-section-title">${t('Mistake Review')}</div>
          <div class="today-section-sub">${toBnDigits(mistakeCount)} recent mistake${mistakeCount !== 1 ? 's' : ''} to revisit</div>
        </div>
      </div>
      <button class="btn-secondary today-action-btn" data-action="start-mistake-review">${t('Review →')}</button>
    </div>`;
  }

  // ── Streak / XP summary ──
  const xpToday = (progress.practiceLog || {})[_localToday()] || 0;
  const freezeUsedToday = progress.lastFreezeUsedDate === _localToday();
  html += `<div class="today-xp-bar">
    <span class="today-xp-label">${t("Today's XP")}</span>
    <span class="today-xp-val">${toBnDigits(xpToday)} ${t('XP')}</span>
    <span class="today-streak">🔥 ${toBnDigits(progress.streak || 0)} ${t('day streak')} · 🧊 ${toBnDigits(progress.freezeTokens || 0)} ${t((progress.freezeTokens || 0) === 1 ? 'token' : 'tokens')}</span>
  </div>`;

  if (freezeUsedToday) {
    html += `<div class="today-freeze-feedback">🧊 A freeze token protected your streak today.</div>`;
  }

  body.innerHTML = html;
}

function getResolvableUnresolvedMistakes(limit = MISTAKE_REVIEW_WINDOW) {
  const mistakes = (progress.recentMistakes || []).slice(-limit);

  // Deduplicate by {type,key}, keeping most recent (matches review flow)
  const seen = new Set();
  const unique = [];
  for (let i = mistakes.length - 1; i >= 0; i--) {
    const m = mistakes[i];
    const type = m.type || 'alphabet';
    const dedupeKey = type + '|' + m.key;
    if (!seen.has(dedupeKey)) {
      seen.add(dedupeKey);
      unique.push({ key: m.key, type });
    }
  }

  return unique.filter(({ key, type }) => {
    if (type === 'alphabet') return getMastery(key) <= 2;

    if (type === 'vocab') {
      const word = VMIX_CURRICULUM.find(w => _vocabKey(w) === key);
      return !!word && getVocabMastery(word) <= 2;
    }

    if (type === 'grammar') {
      const m = /^g:([^:]+):(\d+)$/.exec(key);
      if (!m) return false;
      const lessonId = m[1], qIdx = +m[2];
      const lesson = GRAMMAR_LESSONS.find(l => l.id === lessonId);
      if (!lesson || !lesson.quiz[qIdx]) return false;
      return getGrammarMastery(lessonId, qIdx) <= 2;
    }

    if (type === 'phrases') {
      const phraseId = key.replace(/^ph:/, '');
      const phrase = PHRASES_DATA.find(p => p.id === phraseId);
      if (!phrase) return false;
      return getPhraseMastery(phraseId) <= 2;
    }

    return false;
  });
}

function startMistakeReview() {
  const mistakes = getResolvableUnresolvedMistakes(MISTAKE_REVIEW_WINDOW);
  if (mistakes.length === 0) { showAlert('No mistakes to review yet!'); return; }

  // Group by type and enqueue each resolvable group
  const byType = mistakes.reduce((acc, m) => {
    if (!acc[m.type]) acc[m.type] = [];
    acc[m.type].push(m.key);
    return acc;
  }, {});

  const queue = [];

  const alphaLetters = (byType.alphabet || [])
    .map(k => ALL_LETTERS.find(l => l.letter === k))
    .filter(Boolean);
  if (alphaLetters.length > 0) queue.push({ type: 'letters', data: alphaLetters, fromMistakes: true });

  const vocabKeys = new Set(byType.vocab || []);
  const vocabWords = VMIX_CURRICULUM.filter(w => vocabKeys.has(_vocabKey(w)));
  if (vocabWords.length > 0) queue.push({ type: 'vocab', data: vocabWords, fromMistakes: true });

  const grammarQuestions = [];
  (byType.grammar || []).forEach(key => {
    const m = /^g:([^:]+):(\d+)$/.exec(key);
    if (!m) return;
    const lessonId = m[1], qIdx = +m[2];
    const lesson = GRAMMAR_LESSONS.find(l => l.id === lessonId);
    if (!lesson || !lesson.quiz[qIdx]) return;
    grammarQuestions.push({ ...lesson.quiz[qIdx], _lessonId: lesson.id, _qIdx: qIdx });
  });
  if (grammarQuestions.length > 0) {
    queue.push({ type: 'grammar', questions: grammarQuestions, title: '🔁 Mistake Review — Grammar', fromMistakes: true });
  }

  const phraseIds = new Set((byType.phrases || []).map(k => k.replace(/^ph:/, '')));
  const phrases = PHRASES_DATA.filter(p => phraseIds.has(p.id));
  if (phrases.length > 0) {
    queue.push({ type: 'phrases', phrases, title: '🔁 Mistake Review — Phrases', fromMistakes: true });
  }

  if (queue.length === 0) {
    showAlert('No resolvable recent mistakes to review right now.');
    return;
  }

  _reviewQueue = queue;
  _runNextReviewItem();
}

// ════════════════════════════════════════
//  SPACED REPETITION REVIEW
// ════════════════════════════════════════
function fsrsPreviewInterval(key, rating) {
  const card = progress.fsrs && progress.fsrs[key];
  let previewS;
  if (!card || card.reps === 0) {
    previewS = fsrsInitS(rating);
  } else {
    const ls = progress.lastSeen && progress.lastSeen[key]
      ? new Date(progress.lastSeen[key]).getTime() : Date.now();
    const elapsedDays = Math.max(0, (Date.now() - ls) / 86400000);
    const r = fsrsR(card.s, elapsedDays);
    previewS = fsrsSAfterRecall(card.d, card.s, r, rating);
  }
  return Math.max(1, Math.round(Math.max(0.1, previewS)));
}

// Apply a rating to a card's FSRS state and update progress.mastery
function applyFsrsRating(key, rating) {
  if (!progress.fsrs) progress.fsrs = {};
  const card = progress.fsrs[key] || { s: 0, d: 5, reps: 0, lapses: 0 };
  const lastMs = progress.lastSeen && progress.lastSeen[key]
    ? new Date(progress.lastSeen[key]).getTime() : Date.now();
  const elapsedDays = Math.max(0, (Date.now() - lastMs) / 86400000);
  let newS, newD;
  if (card.reps === 0) {
    newS = fsrsInitS(rating);
    newD = fsrsInitD(rating);
  } else if (rating === FSRS_AGAIN) {
    const r = fsrsR(card.s, elapsedDays);
    newS = Math.max(0.1, fsrsSAfterForgetting(card.d, card.s, r));
    newD = fsrsNextD(card.d, rating);
    card.lapses = (card.lapses || 0) + 1;
  } else {
    const r = fsrsR(card.s, elapsedDays);
    newS = Math.max(0.1, fsrsSAfterRecall(card.d, card.s, r, rating));
    newD = fsrsNextD(card.d, rating);
  }
  card.s = newS;
  card.d = newD;
  card.reps = (card.reps || 0) + 1;
  progress.fsrs[key] = card;
  // Keep integer mastery in sync for curriculum/achievement code
  if (rating === FSRS_AGAIN) {
    progress.mastery[key] = Math.max(1, (progress.mastery[key] || 1) - 1);
  } else {
    progress.mastery[key] = masteryFromFsrs(newS);
  }
}

// Returns elapsed days since key was last seen, or Infinity if never
function _elapsedDays(key) {
  const ls = progress.lastSeen && progress.lastSeen[key];
  if (!ls) return Infinity;
  return (Date.now() - new Date(ls).getTime()) / 86400000;
}

// True if the card identified by key is due for review using FSRS,
// falling back to the old interval map when no FSRS data exists yet.
function _fsrsIsDue(key, fallbackMastery) {
  return _fsrsIsDueAtOffset(key, fallbackMastery, 0);
}

function _fsrsIsDueAtOffset(key, fallbackMastery, dayOffset = 0) {
  const offsetMs = Math.max(0, dayOffset) * 86400000;
  const nowMs = Date.now() + offsetMs;
  const card = progress.fsrs && progress.fsrs[key];
  if (!card) {
    if (!fallbackMastery || fallbackMastery === 0) return false;
    const ls = progress.lastSeen && progress.lastSeen[key]
      ? new Date(progress.lastSeen[key]).getTime() : 0;
    return nowMs - ls >= REVIEW_INTERVALS_MS[fallbackMastery];
  }
  return _elapsedDays(key) + Math.max(0, dayOffset) >= card.s; // both in days
}

function _getScriptReviewItems() {
  const reviewPools = [
    { items: ALL_LETTERS, category: 'letter' },
    { items: CONJUNCTS, category: 'conjunct' },
    { items: MATRA_COMBOS, category: 'matra' },
    { items: BENGALI_NUMERALS, category: 'numeral' },
    { items: BENGALI_NUMBER_NAMES, category: 'number-name' },
  ];
  const scriptItems = [];
  reviewPools.forEach(({ items, category }) => {
    items.forEach(item => {
      if (!item || !item.letter) return;
      scriptItems.push({
        ...item,
        letter: item.letter,
        type: item.type || category,
        reviewCategory: category,
      });
    });
  });
  return Array.from(
    scriptItems.reduce((map, item) => {
      if (!map.has(item.letter)) map.set(item.letter, item);
      return map;
    }, new Map()).values()
  );
}

function _getDueItemsAtOffset(dayOffset = 0) {
  const due = { letters: [], vocab: [], grammar: [], phrases: [] };
  const offsetMs = Math.max(0, dayOffset) * 86400000;
  const nowMs = Date.now() + offsetMs;

  // Script items (letters, conjuncts, matra drills, numerals, number names)
  const dedupedScriptItems = _getScriptReviewItems();
  dedupedScriptItems.forEach(item => {
    const key = item.letter;
    if (getMastery(key) === 0) return; // never seen
    if (_fsrsIsDueAtOffset(key, getMastery(key), dayOffset)) due.letters.push(item);
  });
  // Vocab
  VOCAB_DATA.forEach(w => {
    const key = _vocabKey(w);
    if (getVocabMastery(w) === 0) return;
    if (_fsrsIsDueAtOffset(key, getVocabMastery(w), dayOffset)) due.vocab.push(w);
  });
  // Grammar — lesson is due when average FSRS stability across its questions is overdue
  GRAMMAR_LESSONS.forEach(lesson => {
    const prog = getLessonProgress(lesson);
    if (prog.seen === 0) return;
    // Compute average stability across all questions in the lesson
    let totalS = 0, n = 0;
    lesson.quiz.forEach((_, i) => {
      const qKey = 'g:' + lesson.id + ':' + i;
      const card = progress.fsrs && progress.fsrs[qKey];
      if (card) { totalS += card.s; n++; }
    });
    const lessonKey = 'g:' + lesson.id;
    if (n === 0) {
      // No FSRS data yet — fall back to old mastery-based check
      const rawSum = lesson.quiz.reduce((s, _, i) => s + getGrammarMastery(lesson.id, i), 0);
      const avgMastery = Math.min(4, Math.max(1, Math.round(rawSum / lesson.quiz.length)));
      const ls = progress.lastSeen && progress.lastSeen[lessonKey]
        ? new Date(progress.lastSeen[lessonKey]).getTime() : 0;
      if (nowMs - ls >= REVIEW_INTERVALS_MS[avgMastery]) due.grammar.push(lesson);
    } else {
      if (_elapsedDays(lessonKey) + Math.max(0, dayOffset) >= totalS / n) due.grammar.push(lesson);
    }
  });
  // Phrases — situation is due when average FSRS stability across its phrases is overdue
  PHRASES_WAVE_ORDER.forEach(slug => {
    const phrases = PHRASES_DATA.filter(p => p.situation === slug);
    const seenPhrases = phrases.filter(p => getPhraseMastery(p.id) > 0);
    if (seenPhrases.length === 0) return;
    const sitKey = 'ph-sit:' + slug;
    let totalS = 0, n = 0;
    seenPhrases.forEach(p => {
      const card = progress.fsrs && progress.fsrs['ph:' + p.id];
      if (card) { totalS += card.s; n++; }
    });
    if (n === 0) {
      // Fall back to old mastery-based check
      const avgMastery = Math.round(seenPhrases.reduce((s, p) => s + getPhraseMastery(p.id), 0) / seenPhrases.length);
      const ls = progress.lastSeen && progress.lastSeen[sitKey]
        ? new Date(progress.lastSeen[sitKey]).getTime() : 0;
      if (nowMs - ls >= REVIEW_INTERVALS_MS[Math.max(1, Math.min(4, avgMastery))]) {
        const sit = PHRASES_SITUATIONS.find(s => s.slug === slug);
        if (sit) due.phrases.push(sit);
      }
    } else {
      if (_elapsedDays(sitKey) + Math.max(0, dayOffset) >= totalS / n) {
        const sit = PHRASES_SITUATIONS.find(s => s.slug === slug);
        if (sit) due.phrases.push(sit);
      }
    }
  });
  return due;
}

function getDueItems() {
  return _getDueItemsAtOffset(0);
}

function getDueForecastByOffset(maxOffset = 7) {
  const cappedOffset = Math.max(0, Math.min(30, Math.floor(maxOffset)));
  const counts = [];
  for (let dayOffset = 0; dayOffset <= cappedOffset; dayOffset++) {
    const due = _getDueItemsAtOffset(dayOffset);
    counts.push(due.letters.length + due.vocab.length + due.grammar.length + due.phrases.length);
  }
  return counts;
}

function updateReviewDueBadge() {
  if (!currentUser) return; // not logged in yet
  const due = getDueItems();
  const count = due.letters.length + due.vocab.length + due.grammar.length + due.phrases.length;
  const btn = document.getElementById('review-due-btn');
  const cntEl = document.getElementById('review-due-count');
  if (!btn) return;
  if (count > 0) {
    btn.style.display = '';
    if (cntEl) cntEl.textContent = toBnDigits(count);
  } else {
    btn.style.display = 'none';
  }
  // Update tab badge on Today button
  const tabBadge = document.getElementById('today-tab-badge');
  if (tabBadge) {
    tabBadge.style.display = count > 0 ? 'flex' : 'none';
    tabBadge.textContent = toBnDigits(count > 9 ? '9+' : count);
  }
}

let _reviewQueue = [];

function _grammarOverdueDays(lesson) {
  const lessonKey = 'g:' + lesson.id;
  let totalS = 0;
  let n = 0;
  lesson.quiz.forEach((_, i) => {
    const qKey = 'g:' + lesson.id + ':' + i;
    const card = progress.fsrs && progress.fsrs[qKey];
    if (card) {
      totalS += card.s;
      n++;
    }
  });

  let targetDays;
  if (n === 0) {
    const rawSum = lesson.quiz.reduce((sum, _, i) => sum + getGrammarMastery(lesson.id, i), 0);
    const avgMastery = Math.min(4, Math.max(1, Math.round(rawSum / lesson.quiz.length)));
    targetDays = REVIEW_INTERVALS_MS[avgMastery] / 86400000;
  } else {
    targetDays = totalS / n;
  }

  return _elapsedDays(lessonKey) - targetDays;
}

function _phraseSituationOverdueDays(slug) {
  const phrases = PHRASES_DATA.filter(p => p.situation === slug);
  const seenPhrases = phrases.filter(p => getPhraseMastery(p.id) > 0);
  const sitKey = 'ph-sit:' + slug;
  let totalS = 0;
  let n = 0;
  seenPhrases.forEach(p => {
    const card = progress.fsrs && progress.fsrs['ph:' + p.id];
    if (card) {
      totalS += card.s;
      n++;
    }
  });

  let targetDays;
  if (n === 0) {
    const avgMastery = Math.round(seenPhrases.reduce((sum, p) => sum + getPhraseMastery(p.id), 0) / seenPhrases.length);
    const clampedMastery = Math.max(1, Math.min(4, avgMastery));
    targetDays = REVIEW_INTERVALS_MS[clampedMastery] / 86400000;
  } else {
    targetDays = totalS / n;
  }

  return _elapsedDays(sitKey) - targetDays;
}

function startReviewSession() {
  const due = getDueItems();
  _reviewQueue = [];
  if (due.letters.length > 0) _reviewQueue.push({ type: 'letters', data: due.letters.slice(0, MAX_REVIEW_LETTERS) });
  if (due.vocab.length > 0) _reviewQueue.push({ type: 'vocab', data: due.vocab.slice(0, MAX_REVIEW_VOCAB) });

  const grammarToReview = due.grammar
    .slice()
    .sort((a, b) => _grammarOverdueDays(b) - _grammarOverdueDays(a))
    .slice(0, MAX_REVIEW_GRAMMAR);
  grammarToReview.forEach(lesson => _reviewQueue.push({ type: 'grammar', lesson }));

  const phrasesToReview = due.phrases
    .slice()
    .sort((a, b) => _phraseSituationOverdueDays(b.slug) - _phraseSituationOverdueDays(a.slug))
    .slice(0, MAX_REVIEW_PHRASES);
  phrasesToReview.forEach(situation => _reviewQueue.push({ type: 'phrases', situation }));

  _runNextReviewItem();
}

function _runNextReviewItem() {
  if (_reviewQueue.length === 0) {
    showScreen('home');
    return;
  }
  const item = _reviewQueue.shift();
  if (item.type === 'letters') {
    const isMistake = !!item.fromMistakes;
    const sessionTitle = isMistake ? 'Mistake Review' : 'Review Session';
    const mod = { id: isMistake ? 'mistake-review' : 'review', title: sessionTitle, letters: item.data, isMixed: true };
    currentModule = mod;
    quizModuleRef = mod;
    generateQuiz(item.data);
    quizIndex = 0; quizCorrect = 0; quizMissed = [];
    document.getElementById('quiz-title').textContent = isMistake ? '🔁 Mistake Review' : '🔔 Review Session';
    showScreen('quiz');
    renderQuestion();
  } else if (item.type === 'vocab') {
    generateVocabQuiz(item.data);
    vqIndex = 0; vqCorrect = 0; vqMissed = [];
    document.getElementById('vq-title').textContent = item.fromMistakes ? '🔁 Mistake Review — Vocab' : '🔔 Review Session';
    showScreen('vocab-quiz');
    renderVocabQuestion();
  } else if (item.type === 'grammar') {
    if (item.lesson) currentGrammarLesson = item.lesson;
    startGrammarQuiz({ questions: item.questions, title: item.title });
  } else if (item.type === 'phrases') {
    if (item.situation) currentPhrasesSituation = item.situation.slug;
    startPhrasesQuiz({ phrases: item.phrases, title: item.title });
  }
}

// Track lastSeen for review system
function _trackLastSeen(key) {
  if (!progress.lastSeen) progress.lastSeen = {};
  progress.lastSeen[key] = new Date().toISOString();
}

// ════════════════════════════════════════
//  MISSED QUESTIONS RENDER
// ════════════════════════════════════════
function _renderMissedSection(missedArr, containerId, retryBtnId) {
  const retryBtn = document.getElementById(retryBtnId);
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!missedArr || missedArr.length === 0) {
    el.innerHTML = '';
    if (retryBtn) retryBtn.style.display = 'none';
    return;
  }
  if (retryBtn) retryBtn.style.display = 'inline-block';
  el.innerHTML = '<div class="missed-section"><div class="missed-title">Review these</div>' +
    missedArr.map(m => `
      <div class="missed-item">
        ${m.bengali ? `<span class="missed-bengali">${m.bengali}</span>
        <button class="missed-sound-btn" data-action="speak" data-text="${escapeStr(m.bengali)}" aria-label="Play pronunciation">🔊</button>` : ''}
        <span class="missed-answer">${m.answer}</span>
      </div>
    `).join('') + '</div>';
}

// ════════════════════════════════════════
//  QUIZ KEYBOARD SHORTCUTS
// ════════════════════════════════════════
let _quizKeyHandler = null;

function attachQuizKeyHandler(screenPrefix) {
  detachQuizKeyHandler();
  _quizKeyHandler = function(e) {
    if (_isTypingTarget(document.activeElement)) return;

    // FSRS rating shortcuts (active only while rating buttons are shown)
    if (_pendingRating) {
      const key = e.key.toLowerCase();
      if (key === '1' || key === 'n') { onRatingSelected(FSRS_HARD); return; }
      if (key === '2' || key === 'y') { onRatingSelected(FSRS_GOOD); return; }
      if (key === '3') { onRatingSelected(FSRS_EASY); return; }
    }

    // Number keys 1-4: select MC option
    if (['1','2','3','4'].includes(e.key)) {
      const idx = parseInt(e.key) - 1;
      const btns = document.querySelectorAll(`#${screenPrefix}-answer-area .mc-btn:not(.disabled)`);
      if (btns[idx]) btns[idx].click();
      return;
    }
    // 0: I don't know
    if (e.key === '0') {
      const idkBtn = document.querySelector(`#${screenPrefix}-answer-area .idk-btn`);
      if (idkBtn) idkBtn.click();
      return;
    }
    // Enter: advance after answered, or check word order
    if (e.key === 'Enter') {
      // If next button is visible, click it
      const nextBtn = document.getElementById(`${screenPrefix}-next-btn`);
      if (nextBtn && nextBtn.classList.contains('show')) { nextBtn.click(); return; }
      // If a check button is visible (word order / spell), click it
      const checkBtn = document.querySelector(`#${screenPrefix}-answer-area .wo-check-btn`);
      if (checkBtn) { checkBtn.click(); return; }
    }
  };
  document.addEventListener('keydown', _quizKeyHandler);
}

function detachQuizKeyHandler() {
  if (_quizKeyHandler) {
    document.removeEventListener('keydown', _quizKeyHandler);
    _quizKeyHandler = null;
  }
}

// Add key hints to MC buttons after rendering
function addMCKeyHints(containerSelector) {
  const btns = document.querySelectorAll(containerSelector + ' .mc-btn');
  btns.forEach((btn, i) => {
    if (i >= 4) return;
    if (!btn.querySelector('.mc-key-hint')) {
      const hint = document.createElement('span');
      hint.className = 'mc-key-hint';
      hint.textContent = `[${i+1}]`;
      btn.appendChild(hint);
    }
  });
}

// ════════════════════════════════════════
//  CHART → FLASHCARD
// ════════════════════════════════════════
function navigateToLetter(letterChar) {
  // Close any open chart detail popup
  document.querySelectorAll('.chart-detail').forEach(e => e.remove());
  const mod = MODULES.find(m => !m.isMixed && !m.isChart && m.letters &&
    m.letters.some(l => l.letter === letterChar));
  if (!mod) return;
  switchTab('alphabet');
  startLearn(mod);
  const idx = mod.letters.findIndex(l => l.letter === letterChar);
  if (idx >= 0) { currentCardIndex = idx; showCard(); }
}

// ════════════════════════════════════════
//  INIT
// ════════════════════════════════════════
ensureReadingUI();
if (_listUsers().length === 0) {
  enterAppAsGuest();
} else {
  showProfileScreen();
}
attachLearnKeyHandler();

// ── Global Search ──────────────────────────────────────────
let _searchTimer = null;
function scheduleSearch() {
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(() => {
    runSearch(document.getElementById('search-input').value.trim());
  }, 180);
}

function openSearch() {
  document.getElementById('search-overlay').classList.add('open');
  setTimeout(() => document.getElementById('search-input').focus(), 50);
  document.addEventListener('keydown', _searchEsc);
}
function closeSearch() {
  document.getElementById('search-overlay').classList.remove('open');
  document.removeEventListener('keydown', _searchEsc);
}
function _searchEsc(e) { if (e.key === 'Escape') closeSearch(); }

const MAX_LETTERS = 6, MAX_VOCAB = 8, MAX_GRAMMAR = 5;

function runSearch(q) {
  const box = document.getElementById('search-results');
  if (!q) {
    box.innerHTML = '<p class="search-prompt">Search across letters, vocabulary, and grammar lessons.</p>';
    return;
  }
  const ql = q.toLowerCase();

  // 1. Letters — match Bengali character, name, or romanized
  const letterHits = ALL_LETTERS.filter(l =>
    l.letter.includes(q) ||
    l.name.toLowerCase().includes(ql) ||
    l.romanized.toLowerCase().includes(ql)
  );

  // 2. Vocabulary — match Bengali, romanized, or English
  const vocabHits = VOCAB_DATA.filter(w =>
    w.lemma.includes(q) ||
    w.roman.toLowerCase().includes(ql) ||
    w.english.toLowerCase().includes(ql)
  );

  // 3. Grammar lessons — match title or shortDesc
  const grammarHits = GRAMMAR_LESSONS.filter(l =>
    l.title.toLowerCase().includes(ql) ||
    l.shortDesc.toLowerCase().includes(ql)
  );

  if (!letterHits.length && !vocabHits.length && !grammarHits.length) {
    box.innerHTML = `<p class="search-empty">No results for "<strong>${escHtml(q)}</strong>".</p>`;
    return;
  }

  let html = '';

  if (letterHits.length) {
    html += `<div class="search-group">
      <div class="search-group-title">Letters</div>`;
    letterHits.slice(0, MAX_LETTERS).forEach(l => {
      html += `<div class="search-result-item" data-action="open-letter-result" data-letter="${escapeStr(l.letter)}">
        <span class="sri-bengali">${escHtml(l.letter)}</span>
        <span class="sri-detail">${escHtml(l.name)} · ${escHtml(l.romanized)}</span>
        <span class="sri-tag">${l.type}</span>
      </div>`;
    });
    html += '</div><div class="search-divider"></div>';
  }

  if (vocabHits.length) {
    html += `<div class="search-group">
      <div class="search-group-title">Vocabulary</div>`;
    vocabHits.slice(0, MAX_VOCAB).forEach(w => {
      const inQueue = (progress.vmixPriority || []).includes(w.lemma);
      const safeLemma = escHtml(JSON.stringify(w.lemma));
      html += `<div class="search-result-item" data-action="show-vocab-detail-search" data-lemma="${safeLemma}">
        <span class="sri-bengali">${escHtml(w.lemma)}</span>
        <span class="sri-detail">${escHtml(w.roman)} · ${escHtml(w.english)}</span>
        <span class="sri-tag">${escHtml(w.pos)}</span>
        <button class="sri-add-btn${inQueue ? ' added' : ''}" data-action="search-add-to-study" data-lemma="${safeLemma}" title="${inQueue ? 'Already in study queue' : 'Add to study queue'}">${inQueue ? '✓ Queued' : '+ Study'}</button>
      </div>`;
    });
    if (vocabHits.length > MAX_VOCAB) {
      html += `<div class="search-more" data-action="open-vocab-browse-search" data-query="${escapeStr(q)}">See all ${vocabHits.length} vocabulary results →</div>`;
    }
    html += '</div><div class="search-divider"></div>';
  }

  if (grammarHits.length) {
    html += `<div class="search-group">
      <div class="search-group-title">Grammar</div>`;
    grammarHits.slice(0, MAX_GRAMMAR).forEach(l => {
      html += `<div class="search-result-item" data-action="open-grammar-result" data-id="${escapeStr(l.id)}">
        <span class="sri-detail"><strong>${l.number}. ${escHtml(l.title)}</strong> — ${escHtml(l.shortDesc)}</span>
      </div>`;
    });
    html += '</div>';
  }

  box.innerHTML = html;
}

function openLetterResult(letterChar) {
  const mod = MODULES.find(m => !m.isMixed && !m.isChart && m.letters &&
    m.letters.some(l => l.letter === letterChar));
  if (!mod) return;
  switchTab('alphabet');
  startLearn(mod);
  const idx = mod.letters.findIndex(l => l.letter === letterChar);
  if (idx >= 0) { currentCardIndex = idx; showCard(); }
}

function openGrammarResult(lessonId) {
  closeSearch();
  switchTab('grammar');
  openGrammarLesson(lessonId);
}

function openVocabBrowseSearch(query) {
  closeSearch();
  switchTab('vocabulary');
  openVocabBrowse(null);
  const inp = document.getElementById('vb-search');
  if (inp) { inp.value = query; renderVocabList(); }
}

// ════════════════════════════════════════
//  PHRASES — MASTERY & PROGRESS
// ════════════════════════════════════════

function getPhraseMastery(phraseId) {
  return progress.mastery['ph:' + phraseId] || 0;
}

function getSituationProgress(slug) {
  const phrases = PHRASES_DATA.filter(p => p.situation === slug);
  const total = phrases.length;
  let mastered = 0, seen = 0;
  phrases.forEach(p => {
    const m = getPhraseMastery(p.id);
    if (m >= 3) mastered++;
    if (m >= 1) seen++;
  });
  return { total, mastered, seen, pct: Math.round((mastered / total) * 100) };
}

function getPhrasesUnlockedSituationCount() {
  // A situation unlocks when 60% of the previous situation's phrases reach mastery >= 2.
  let unlocked = 1;
  while (unlocked < PHRASES_WAVE_ORDER.length) {
    const prevSlug = PHRASES_WAVE_ORDER[unlocked - 1];
    const prevPhrases = PHRASES_DATA.filter(p => p.situation === prevSlug);
    const familiarCount = prevPhrases.filter(p => getPhraseMastery(p.id) >= 2).length;
    if (familiarCount >= Math.ceil(prevPhrases.length * 0.6)) {
      unlocked++;
    } else {
      break;
    }
  }
  return unlocked;
}

// ════════════════════════════════════════
//  PHRASES HOME
// ════════════════════════════════════════

function renderPhrasesHome() {
  const grid = document.getElementById('phrases-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const unlockedCount = getPhrasesUnlockedSituationCount();
  const totalPhrases = PHRASES_DATA.length;
  let masteredPhrases = 0;
  PHRASES_DATA.forEach(p => { if (getPhraseMastery(p.id) >= 3) masteredPhrases++; });
  const mixPct = Math.round((masteredPhrases / totalPhrases) * 100);

  // Mixed practice card
  const mixCard = document.createElement('div');
  mixCard.className = 'module-card';
  mixCard.innerHTML = `
    <div class="module-icon">🗣️</div>
    <h3>Mixed Practice</h3>
    <p>Adaptive review across all unlocked situations</p>
    <div class="module-progress"><div class="module-progress-fill" style="width:${mixPct}%;background:var(--accent)"></div></div>
    <div class="progress-label">${masteredPhrases}/${totalPhrases} mastered · ${unlockedCount}/${PHRASES_WAVE_ORDER.length} situations unlocked</div>
  `;
  mixCard.onclick = () => startPhrasesMixedPractice();
  grid.appendChild(mixCard);

  // Situation cards
  PHRASES_WAVE_ORDER.forEach((slug, idx) => {
    const sit = PHRASES_SITUATIONS.find(s => s.slug === slug);
    if (!sit) return;
    const card = document.createElement('div');
    card.className = 'module-card';
    const prog = getSituationProgress(slug);
    const locked = idx >= unlockedCount;
    card.innerHTML = `
      ${locked ? '<span class="lock-badge">🔒</span>' : ''}
      <div class="module-icon">${sit.icon}</div>
      <h3>${sit.title}</h3>
      <p>${sit.desc}</p>
      <div class="module-progress"><div class="module-progress-fill" style="width:${prog.pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${prog.mastered}/${prog.total} mastered</div>
    `;
    if (!locked) card.onclick = () => openPhrasesSituation(slug);
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════
//  PHRASES SITUATION VIEW (flashcards)
// ════════════════════════════════════════

let currentPhrasesSituation = null;
let _psCardIdx = 0;

function openPhrasesSituation(slug) {
  const sit = PHRASES_SITUATIONS.find(s => s.slug === slug);
  if (!sit) return;
  currentPhrasesSituation = slug;
  _psCardIdx = 0;

  document.getElementById('ps-title').textContent = sit.title;
  const phrases = PHRASES_DATA.filter(p => p.situation === slug);
  const content = document.getElementById('ps-content');
  content.innerHTML = `
    <h2>${sit.title}</h2>
    <div class="grammar-desc">${sit.desc}</div>
    <h3 style="margin-bottom:12px;">Phrase Cards</h3>
    <div class="gl-card-area">
      <div class="gl-flashcard" id="ps-card" data-action="flip-ps-card">
        <div class="gl-card-face gl-card-front" id="ps-card-front"></div>
        <div class="gl-card-face gl-card-back" id="ps-card-back"></div>
      </div>
      <div class="gl-card-hint" id="ps-card-hint">Tap card to reveal</div>
      <div class="learn-nav" style="margin-top:12px">
        <button class="nav-btn" id="ps-prev-btn" data-action="prev-ps-card">← Prev</button>
        <span id="ps-card-counter" style="font-size:0.85rem;color:var(--text-dim)"></span>
        <button class="nav-btn" id="ps-next-btn" data-action="next-ps-card">Next →</button>
      </div>
    </div>
    <div class="grammar-lesson-actions">
      <button class="btn-primary" data-action="start-phrases-quiz">Start Quiz →</button>
    </div>
  `;
  renderPsCard();
  showScreen('phrases-situation');
}

function renderPsCard() {
  const slug = currentPhrasesSituation;
  if (!slug) return;
  const phrases = PHRASES_DATA.filter(p => p.situation === slug);
  const phrase = phrases[_psCardIdx];
  if (!phrase) return;
  const card = document.getElementById('ps-card');
  if (!card) return;
  card.classList.remove('flipped');
  document.getElementById('ps-card-front').innerHTML =
    `<div class="ge-bengali">${displayBengali(phrase.bengali, phrase.roman)}</div>`;
  let backHtml = `<div class="ge-roman">${phrase.roman}</div><div class="ge-english">${phrase.english}</div>`;
  if (phrase.notes) backHtml += `<div class="ge-notes">${phrase.notes}</div>`;
  if (phrase.reply) backHtml += `<div class="ge-notes" style="margin-top:10px;border-top:1px solid rgba(255,255,255,0.1);padding-top:8px"><em>Natural reply:</em> ${phrase.reply.bengali} — ${phrase.reply.english}</div>`;
  document.getElementById('ps-card-back').innerHTML = backHtml;
  document.getElementById('ps-card-counter').textContent =
    (_psCardIdx + 1) + ' / ' + phrases.length;
  document.getElementById('ps-card-hint').textContent = 'Tap card to reveal';
  document.getElementById('ps-prev-btn').style.visibility = _psCardIdx === 0 ? 'hidden' : 'visible';
  document.getElementById('ps-next-btn').style.visibility =
    _psCardIdx >= phrases.length - 1 ? 'hidden' : 'visible';
}

function flipPsCard() {
  const card = document.getElementById('ps-card');
  if (!card) return;
  card.classList.toggle('flipped');
  const hint = document.getElementById('ps-card-hint');
  if (hint) hint.textContent = card.classList.contains('flipped') ? '' : 'Tap card to reveal';
}

function prevPsCard() {
  if (_psCardIdx > 0) { _psCardIdx--; renderPsCard(); }
}

function nextPsCard() {
  const phrases = PHRASES_DATA.filter(p => p.situation === currentPhrasesSituation);
  if (_psCardIdx < phrases.length - 1) { _psCardIdx++; renderPsCard(); }
}

// ════════════════════════════════════════
//  PHRASES QUIZ
// ════════════════════════════════════════

let phqQuestions = [];
let phqIndex = 0;
let phqCorrect = 0;
let phqAnswered = false;
let phqIsMixed = false;
let phqMissed = [];
let phqCurrentSituationSlug = null;

function buildPhrasesQuizQuestions(phrases) {
  const questions = [];

  phrases.forEach(p => {
    const m = getPhraseMastery(p.id);
    // Build a pool of distractor phrases (anything except this phrase)
    const distractorPool = shuffle(PHRASES_DATA.filter(x => x.id !== p.id));

    // Determine which question types are appropriate for this phrase's mastery level
    const types = ['phrases-mc'];
    if (m >= 1) types.push('phrases-mc-reverse');
    if (m >= 1) types.push('phrases-listening');
    // FIB only for short phrases (≤4 roman words) — avoids asking users to type full sentences
    if (m >= 2 && p.roman.split(' ').length <= 4) types.push('phrases-fib');
    if (p.reply) types.push('phrases-dialogue');

    // Pick 1–2 question types per phrase, weighted toward unseen/low-mastery
    const shuffledTypes = shuffle([...types]);
    const numQ = m >= 2 ? 2 : 1;

    shuffledTypes.slice(0, numQ).forEach(type => {
      if (type === 'phrases-mc') {
        const picks = distractorPool.slice(0, 3).map(x => x.english);
        questions.push({
          type: 'phrases-mc',
          prompt: 'What does this phrase mean?',
          bengali: p.bengali,
          roman: p.roman,
          correct: p.english,
          options: shuffle([p.english, ...picks]),
          _phraseId: p.id,
        });

      } else if (type === 'phrases-mc-reverse') {
        const picks = distractorPool.slice(0, 3).map(x => x.bengali);
        questions.push({
          type: 'phrases-mc-reverse',
          prompt: 'How do you say this in Bengali?',
          english: p.english,
          correct: p.bengali,
          options: shuffle([p.bengali, ...picks]),
          _phraseId: p.id,
        });

      } else if (type === 'phrases-listening') {
        const picks = distractorPool.slice(0, 3).map(x => x.english);
        questions.push({
          type: 'phrases-listening',
          prompt: 'Listen and choose the correct meaning:',
          audio: p.bengali,
          correct: p.english,
          options: shuffle([p.english, ...picks]),
          _phraseId: p.id,
        });

      } else if (type === 'phrases-fib') {
        questions.push({
          type: 'phrases-fib',
          prompt: 'Type the romanization for:',
          english: p.english,
          acceptable: [p.roman],
          answer: p.roman,
          bengali: p.bengali,
          _phraseId: p.id,
        });

      } else if (type === 'phrases-dialogue') {
        const picks = distractorPool.slice(0, 3).map(x => x.bengali);
        questions.push({
          type: 'phrases-dialogue',
          prompt: 'Choose the natural reply:',
          speaker: p.bengali,
          speakerEnglish: p.english,
          correct: p.reply.bengali,
          correctEnglish: p.reply.english,
          options: shuffle([p.reply.bengali, ...picks]),
          _phraseId: p.id,
        });
      }
    });
  });

  return shuffle(questions);
}

function startPhrasesQuiz(options = {}) {
  const hasScopedPhrases = Array.isArray(options.phrases) && options.phrases.length > 0;
  const slug = options.slug || currentPhrasesSituation;
  if (!hasScopedPhrases && !slug) return;
  phqIsMixed = false;
  phqCurrentSituationSlug = hasScopedPhrases ? null : slug;
  const sit = PHRASES_SITUATIONS.find(s => s.slug === slug);
  const phrases = hasScopedPhrases ? options.phrases : PHRASES_DATA.filter(p => p.situation === slug);
  phqQuestions = buildPhrasesQuizQuestions(phrases).slice(0, 12);
  phqIndex = 0;
  phqCorrect = 0;
  phqMissed = [];
  _quizStartTime = Date.now();
  const defaultTitle = (sit ? sit.title : 'Phrases') + ' Quiz';
  document.getElementById('phq-title').textContent = options.title || defaultTitle;
  showScreen('phrases-quiz');
  renderPhrasesQuestion();
  updateStreak();
}

function startPhrasesMixedPractice() {
  const unlockedCount = getPhrasesUnlockedSituationCount();
  const unlockedSlugs = PHRASES_WAVE_ORDER.slice(0, unlockedCount);
  const pool = PHRASES_DATA.filter(p => unlockedSlugs.includes(p.situation));

  // Sort by mastery ascending so unseen/weak phrases appear first, with randomness for mastered
  const withMastery = pool.map(p => ({ ...p, _mastery: getPhraseMastery(p.id) }));
  withMastery.sort((a, b) => {
    const sa = a._mastery === 3 ? 3 + Math.random() * 2 : a._mastery === 0 ? 0.5 : a._mastery;
    const sb = b._mastery === 3 ? 3 + Math.random() * 2 : b._mastery === 0 ? 0.5 : b._mastery;
    return sa - sb;
  });

  const selected = withMastery.slice(0, 15);
  phqQuestions = buildPhrasesQuizQuestions(selected).slice(0, 15);
  phqIndex = 0;
  phqCorrect = 0;
  phqMissed = [];
  phqIsMixed = true;
  phqCurrentSituationSlug = null;
  _quizStartTime = Date.now();
  document.getElementById('phq-title').textContent = 'Mixed Phrases Practice';
  showScreen('phrases-quiz');
  renderPhrasesQuestion();
  updateStreak();
}

function renderPhrasesQuestion() {
  if (phqIndex >= phqQuestions.length) {
    showPhrasesResults();
    return;
  }
  phqAnswered = false;
  const q = phqQuestions[phqIndex];

  document.getElementById('phq-progress-fill').style.width =
    ((phqIndex / phqQuestions.length) * 100) + '%';
  document.getElementById('phq-score').textContent = phqCorrect + ' / ' + phqIndex;

  const qa = document.getElementById('phq-question-area');
  const aa = document.getElementById('phq-answer-area');
  const fb = document.getElementById('phq-feedback');
  fb.className = 'quiz-feedback';
  fb.textContent = '';
  document.getElementById('phq-next-btn').className = 'btn-primary quiz-next-btn';
  document.getElementById('phq-rating-area').classList.remove('show');
  _pendingRating = null;

  if (q.type === 'phrases-mc') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="vq-bengali">${displayBengali(q.bengali, q.roman)}</div>
      <div class="vq-hint">${escHtml(q.roman)}</div>
    `;
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-mc-phrases">${escHtml(opt)}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-phrases">${t("I don't know")}</button>`;
    attachQuizKeyHandler('phq');

  } else if (q.type === 'phrases-mc-reverse') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="vq-hint">${escHtml(q.english)}</div>
    `;
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-mc-phrases">${opt}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-phrases">${t("I don't know")}</button>`;
    attachQuizKeyHandler('phq');

  } else if (q.type === 'phrases-listening') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <button class="listening-play-btn" data-action="speak" data-text="${escapeStr(q.audio)}" aria-label="Play phrase">▶ Play</button>
    `;
    setTimeout(() => speakBengali(q.audio, 0.85), 300);
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-mc-phrases">${escHtml(opt)}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-phrases">${t("I don't know")}</button>`;
    attachQuizKeyHandler('phq');

  } else if (q.type === 'phrases-fib') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="vq-hint">${escHtml(q.english)}</div>
    `;
    aa.innerHTML = `<div class="fib-area">
      <input type="text" class="fib-input" id="phq-fib-input" placeholder="${t('Type your answer…')}"
        autocomplete="off" autocapitalize="off">
      <button class="btn-primary fib-submit" data-action="answer-phrases-fib">${t('Check')}</button>
    </div>
    <button class="idk-btn" data-action="dont-know-phrases">${t("I don't know")}</button>`;
    setTimeout(() => document.getElementById('phq-fib-input')?.focus(), 100);

  } else if (q.type === 'phrases-dialogue') {
    qa.innerHTML = `
      <div class="quiz-prompt">${t(q.prompt)}</div>
      <div class="vq-bengali">${displayBengali(q.speaker, '')}</div>
      <div class="vq-hint">"${escHtml(q.speakerEnglish)}"</div>
    `;
    aa.innerHTML = '<div class="mc-options">' +
      q.options.map((opt, i) =>
        `<button class="mc-btn" data-answer="${escapeStr(opt)}" data-action="answer-mc-phrases">${opt}<span class="mc-key-hint">[${i+1}]</span></button>`
      ).join('') + '</div>' +
      `<button class="idk-btn" data-action="dont-know-phrases">${t("I don't know")}</button>`;
    attachQuizKeyHandler('phq');
  }
}

function answerPhrasesMC(btn, chosen) {
  if (phqAnswered) return;
  phqAnswered = true;
  const q = phqQuestions[phqIndex];
  const correct = chosen === q.correct;
  document.querySelectorAll('#phq-answer-area .mc-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
  });
  btn.classList.add(correct ? 'correct' : 'wrong');
  let fbAnswer = q.correct;
  if (q.type === 'phrases-dialogue') fbAnswer = q.correct + ' — ' + q.correctEnglish;
  if (correct) {
    phqCorrect++;
    addXP(10);
    showPhrasesFeedback(true, fbAnswer);
    showRatingButtons('ph:' + q._phraseId, 'phq-rating-area', 'phq-next-btn');
  } else {
    _recordMiss(phqMissed, q);
    _trackMistake('ph:' + q._phraseId, 'phrases');
    applyFsrsRating('ph:' + q._phraseId, FSRS_AGAIN);
    _trackLastSeen('ph:' + q._phraseId);
    saveProgress();
    checkAchievements();
    showPhrasesFeedback(false, fbAnswer);
    document.getElementById('phq-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function answerPhrasesFIB() {
  if (phqAnswered) return;
  const input = document.getElementById('phq-fib-input');
  if (!input) return;
  const rawInput = input.value.trim();
  const val = rawInput.toLowerCase();
  if (!val) return;
  phqAnswered = true;
  const q = phqQuestions[phqIndex];
  const normVal = _normRoman(val);
  const correct = q.acceptable.some(a => a.toLowerCase() === val || _normRoman(a) === normVal);
  input.classList.add(correct ? 'correct' : 'wrong');
  if (correct) {
    phqCorrect++;
    addXP(15);
    showPhrasesFeedback(true, q.bengali + ' (' + q.answer + ')');
    showRatingButtons('ph:' + q._phraseId, 'phq-rating-area', 'phq-next-btn');
  } else {
    _showInlineAnswer('phq-answer-area', q.answer);
    _recordMiss(phqMissed, q);
    _trackMistake('ph:' + q._phraseId, 'phrases');
    applyFsrsRating('ph:' + q._phraseId, FSRS_AGAIN);
    _trackLastSeen('ph:' + q._phraseId);
    saveProgress();
    checkAchievements();
    showPhrasesFeedback(false, q.bengali + ' (' + q.answer + ')');
    document.getElementById('phq-next-btn').className = 'btn-primary quiz-next-btn show';
  }
}

function dontKnowPhrases() {
  if (phqAnswered) return;
  phqAnswered = true;
  const q = phqQuestions[phqIndex];
  if (q.type === 'phrases-fib') {
    const input = document.getElementById('phq-fib-input');
    if (input) { input.disabled = true; input.classList.add('wrong'); }
    _showInlineAnswer('phq-answer-area', q.answer);
    showPhrasesFeedback(false, q.bengali + ' (' + q.answer + ')');
  } else {
    document.querySelectorAll('#phq-answer-area .mc-btn').forEach(b => {
      b.classList.add('disabled');
      if (b.dataset.answer === q.correct) b.classList.add('reveal-correct');
    });
    let fbAnswer = q.correct;
    if (q.type === 'phrases-dialogue') fbAnswer = q.correct + ' — ' + q.correctEnglish;
    showPhrasesFeedback(false, fbAnswer);
  }
  _recordMiss(phqMissed, q);
  _trackMistake('ph:' + q._phraseId, 'phrases');
  applyFsrsRating('ph:' + q._phraseId, FSRS_AGAIN);
  _trackLastSeen('ph:' + q._phraseId);
  saveProgress();
  checkAchievements();
  document.getElementById('phq-next-btn').className = 'btn-primary quiz-next-btn show';
}

function showPhrasesFeedback(correct, answer, notes) {
  const fb = document.getElementById('phq-feedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  let html = correct ? '✓ Correct! ' + escHtml(answer) : '✗ Correct answer: ' + escHtml(answer);
  if (!correct && notes) html += '<div class="fb-example">' + escHtml(notes) + '</div>';
  html += ' <button class="report-problem-btn active-quiz-phrases" data-action="report-problem" data-kind="phrases" title="Report a problem with this card">⚑ Report</button>';
  fb.innerHTML = html;
}

function nextPhrasesQuestion() {
  phqIndex++;
  renderPhrasesQuestion();
}

// ════════════════════════════════════════
//  PHRASES RESULTS
// ════════════════════════════════════════

function showPhrasesResults() {
  showScreen('phrases-results');
  const total = phqQuestions.length;
  const pct = Math.round((phqCorrect / total) * 100);
  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    document.getElementById('phr-ring').style.strokeDashoffset = offset;
  }, 100);
  document.getElementById('phr-pct').textContent = pct + '%';
  const phrTitle = pct === 100 ? t('Perfect! 🌟') : pct >= 80 ? t('Great job!') : pct >= 50 ? t('Good effort!') : t('Keep practicing!');
  document.getElementById('phr-title').textContent = phrTitle;
  const phid = phqIsMixed ? 'phrases-mixed' : (phqCurrentSituationSlug || 'phrases');
  const phist = progress.quizHistory || (progress.quizHistory = {});
  const phprev = phist[phid] || { best: -1 };
  if (pct > phprev.best) { phist[phid] = { best: pct }; saveProgress(); }
  const subParts = [`${t('You scored')} ${toBnDigits(phqCorrect)}/${toBnDigits(total)}`];
  if (_quizStartTime) subParts.push('⏱ ' + _formatElapsed(Date.now() - _quizStartTime));
  if (pct > phprev.best && phprev.best >= 0) subParts.push(`🌟 ${t('New best!')}`);
  else if (phprev.best >= 0 && phprev.best > pct) subParts.push(`${t('Best:')} ${toBnDigits(phprev.best)}%`);
  if (progress.streak > 1) subParts.push(`🔥 ${toBnDigits(progress.streak)} ${t('day streak')}`);
  document.getElementById('phr-sub').textContent = subParts.join(' · ');
  addXP(5);
  detachQuizKeyHandler();
  updateNav();
  checkAchievements();
  _renderMissedSection(phqMissed, 'phr-missed', 'phr-retry-missed');
  const contBtn = document.getElementById('phr-continue-review');
  if (contBtn) contBtn.style.display = _reviewQueue.length > 0 ? 'inline-block' : 'none';
}

function retryPhrasesQuiz() {
  if (phqIsMixed) {
    startPhrasesMixedPractice();
  } else if (phqCurrentSituationSlug) {
    currentPhrasesSituation = phqCurrentSituationSlug;
    startPhrasesQuiz();
  }
}

function retryMissedPhrases() {
  if (!phqMissed || phqMissed.length === 0) return;
  const seen = new Set();
  const phraseIds = [];
  phqMissed.forEach(m => {
    if (m._q && m._q._phraseId && !seen.has(m._q._phraseId)) {
      seen.add(m._q._phraseId);
      phraseIds.push(m._q._phraseId);
    }
  });
  if (phraseIds.length === 0) return;
  const phrases = PHRASES_DATA.filter(p => phraseIds.includes(p.id));
  phqQuestions = buildPhrasesQuizQuestions(phrases);
  phqIndex = 0; phqCorrect = 0; phqMissed = [];
  document.getElementById('phq-title').textContent = 'Retry Missed';
  showScreen('phrases-quiz');
  renderPhrasesQuestion();
}

// ════════════════════════════════════════
//  TRIVIA
// ════════════════════════════════════════
// ════════════════════════════════════════
//  RECIPES
// ════════════════════════════════════════
let _recipeCurrentId = null;
let _recipeQuestions = [];
let _recipeQIndex = 0;
let _recipeCorrect = 0;
let _recipeAnswered = false;
let _recipeMissed = [];
let _recipeStartTime = null;

function renderRecipesHome() {
  const grid = document.getElementById('recipes-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  RECIPES.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'module-card';

    // Quiz progress: count how many of 3 questions answered correctly
    const total = recipe.quiz.length;
    let answered = 0;
    recipe.quiz.forEach(q => {
      if ((progress.mastery['rq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'recipes:' + recipe.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = recipe.tags.map(tag =>
      `<span class="recipe-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${recipe.icon}</div>
      <h3>${escHtml(recipe.bengaliName)}</h3>
      <p style="margin:4px 0 8px;font-size:0.88rem;color:var(--text-dim)">${escHtml(recipe.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'recipe-view';
    card.dataset.id = recipe.id;
    grid.appendChild(card);
  });
}

function showRecipeDetail(recipeId) {
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (!recipe) return;
  _recipeCurrentId = recipeId;

  document.getElementById('rd-title').textContent = recipe.bengaliName + ' — ' + recipe.englishName;
  const content = document.getElementById('rd-content');

  const tagHtml = recipe.tags.map(tag =>
    `<span class="recipe-tag">${escHtml(tag)}</span>`
  ).join(' ');

  // Build ingredients list
  const ingBn = recipe.ingredientsBn.map(i => `<li>${escHtml(i)}</li>`).join('');
  const ingEn = recipe.ingredientsEn.map(i => `<li>${escHtml(i)}</li>`).join('');

  // Build steps
  const stepsBn = recipe.stepsBn.map((s, i) => `<li>${escHtml(s)}</li>`).join('');
  const stepsEn = recipe.stepsEn.map((s, i) => `<li>${escHtml(s)}</li>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:12px">${tagHtml}</div>
    <div class="recipe-section">
      <p class="recipe-desc-bn">${escHtml(recipe.descBn)}</p>
      <p class="recipe-desc-en">${escHtml(recipe.descEn)}</p>
    </div>
    <div class="recipe-section">
      <h3 class="recipe-section-title">🥘 ${t('Ingredients')}</h3>
      <div class="recipe-bilingual">
        <div class="recipe-col">
          <ul class="recipe-list recipe-list-bn">${ingBn}</ul>
        </div>
        <div class="recipe-col">
          <ul class="recipe-list recipe-list-en">${ingEn}</ul>
        </div>
      </div>
    </div>
    <div class="recipe-section">
      <h3 class="recipe-section-title">👩‍🍳 ${t('Instructions')}</h3>
      <div class="recipe-bilingual">
        <div class="recipe-col">
          <ol class="recipe-list recipe-list-bn">${stepsBn}</ol>
        </div>
        <div class="recipe-col">
          <ol class="recipe-list recipe-list-en">${stepsEn}</ol>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="recipe-start-quiz" data-id="${escHtml(recipeId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('recipe-detail');
}

function startRecipeQuiz(recipeId) {
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (!recipe) return;
  _recipeCurrentId = recipeId;
  _recipeQuestions = shuffle(recipe.quiz.slice());
  _recipeQIndex = 0;
  _recipeCorrect = 0;
  _recipeAnswered = false;
  _recipeMissed = [];
  _recipeStartTime = Date.now();
  document.getElementById('rq-title').textContent = recipe.bengaliName + ' ' + t('Quiz');
  showScreen('recipe-quiz');
  renderRecipeQuestion();
}

function renderRecipeQuestion() {
  const q = _recipeQuestions[_recipeQIndex];
  if (!q) return;
  _recipeAnswered = false;

  const total = _recipeQuestions.length;
  const pct = Math.round((_recipeQIndex / total) * 100);
  document.getElementById('rq-progress-fill').style.width = pct + '%';
  document.getElementById('rq-score').textContent = toBnDigits(_recipeQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('rq-feedback').innerHTML = '';
  document.getElementById('rq-explanation').style.display = 'none';
  document.getElementById('rq-explanation').textContent = '';
  document.getElementById('rq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  // Shuffle options so correct answer isn't always in the same position
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled; // store for answer checking
  const area = document.getElementById('rq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="recipe-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerRecipeMC(btn, chosen) {
  if (_recipeAnswered) return;
  _recipeAnswered = true;
  const q = _recipeQuestions[_recipeQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#rq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  // Map shuffled display index back to original index
  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  // Find which display index shows the correct answer
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('rq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _recipeCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('rq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _recipeMissed.push({ answer: q.options[q.correct] });
  }

  // Track mastery (not FSRS, simple 0/1/2 like trivia)
  const masteryKey = 'rq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('rq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('rq-next-btn').style.display = 'inline-block';
}

function recipeNext() {
  _recipeQIndex++;
  if (_recipeQIndex >= _recipeQuestions.length) {
    showRecipeResults();
  } else {
    _recipeAnswered = false;
    renderRecipeQuestion();
  }
}

function showRecipeResults() {
  showScreen('recipe-results');
  const total = _recipeQuestions.length;
  const pct = total > 0 ? Math.round((_recipeCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('rr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('rr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('rr-title').textContent = title;

  const bestKey = 'recipes:' + _recipeCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_recipeCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('rr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();

  const missedEl = document.getElementById('rr-missed');
  if (missedEl) {
    if (_recipeMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _recipeMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  MUSIC
// ════════════════════════════════════════
let _musicCurrentId = null;
let _musicQuestions = [];
let _musicQIndex = 0;
let _musicCorrect = 0;
let _musicAnswered = false;
let _musicMissed = [];
let _musicStartTime = null;

function renderMusicHome() {
  const grid = document.getElementById('music-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  MUSIC.forEach(song => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = song.quiz.length;
    let answered = 0;
    song.quiz.forEach(q => {
      if ((progress.mastery['mq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'music:' + song.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = song.tags.map(tag =>
      `<span class="music-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${song.icon}</div>
      <h3>${escHtml(song.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(song.englishName)}</p>
      <div class="music-meta">${escHtml(song.artist)} · ${escHtml(song.year)}</div>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'music-view';
    card.dataset.id = song.id;
    grid.appendChild(card);
  });
}

function showMusicDetail(songId) {
  const song = MUSIC.find(s => s.id === songId);
  if (!song) return;
  _musicCurrentId = songId;

  document.getElementById('md-title').textContent = song.bengaliName + ' — ' + song.englishName;
  const content = document.getElementById('md-content');

  const tagHtml = song.tags.map(tag =>
    `<span class="music-tag">${escHtml(tag)}</span>`
  ).join(' ');

  // Build lyrics lines
  const lyricsBn = song.lyricsBn.map(l => `<div class="music-lyrics-line">${escHtml(l)}</div>`).join('');
  const lyricsEn = song.lyricsEn.map(l => `<div class="music-lyrics-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="music-meta">🎤 ${escHtml(song.artist)} · ${escHtml(song.year)}</div>
    <div class="music-section">
      <p class="music-desc-bn">${escHtml(song.descBn)}</p>
      <p class="music-desc-en">${escHtml(song.descEn)}</p>
    </div>
    <div class="music-section">
      <h3 class="music-section-title">🎶 ${t('Lyrics')}</h3>
      <div class="music-lyrics">
        <div class="music-lyrics-col music-lyrics-bn">${lyricsBn}</div>
        <div class="music-lyrics-col music-lyrics-en">${lyricsEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="music-start-quiz" data-id="${escHtml(songId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('music-detail');
}

function startMusicQuiz(songId) {
  const song = MUSIC.find(s => s.id === songId);
  if (!song) return;
  _musicCurrentId = songId;
  _musicQuestions = shuffle(song.quiz.slice());
  _musicQIndex = 0;
  _musicCorrect = 0;
  _musicAnswered = false;
  _musicMissed = [];
  _musicStartTime = Date.now();
  document.getElementById('mq-title').textContent = song.bengaliName + ' ' + t('Quiz');
  showScreen('music-quiz');
  renderMusicQuestion();
}

function renderMusicQuestion() {
  const q = _musicQuestions[_musicQIndex];
  if (!q) return;
  _musicAnswered = false;

  const total = _musicQuestions.length;
  const pct = Math.round((_musicQIndex / total) * 100);
  document.getElementById('mq-progress-fill').style.width = pct + '%';
  document.getElementById('mq-score').textContent = toBnDigits(_musicQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('mq-feedback').innerHTML = '';
  document.getElementById('mq-explanation').style.display = 'none';
  document.getElementById('mq-explanation').textContent = '';
  document.getElementById('mq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('mq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="music-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerMusicMC(btn, chosen) {
  if (_musicAnswered) return;
  _musicAnswered = true;
  const q = _musicQuestions[_musicQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#mq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('mq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _musicCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('mq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _musicMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'mq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('mq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('mq-next-btn').style.display = 'inline-block';
}

function musicNext() {
  _musicQIndex++;
  if (_musicQIndex >= _musicQuestions.length) {
    showMusicResults();
  } else {
    _musicAnswered = false;
    renderMusicQuestion();
  }
}

function showMusicResults() {
  showScreen('music-results');
  const total = _musicQuestions.length;
  const pct = total > 0 ? Math.round((_musicCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('mr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('mr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('mr-title').textContent = title;

  const bestKey = 'music:' + _musicCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_musicCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('mr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();

  const missedEl = document.getElementById('mr-missed');
  if (missedEl) {
    if (_musicMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _musicMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  MOVIES
// ════════════════════════════════════════
let _movieCurrentId = null;
let _movieQuestions = [];
let _movieQIndex = 0;
let _movieCorrect = 0;
let _movieAnswered = false;
let _movieMissed = [];
let _movieStartTime = null;

function renderMoviesHome() {
  const grid = document.getElementById('movies-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  MOVIES.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = movie.quiz.length;
    let answered = 0;
    movie.quiz.forEach(q => {
      if ((progress.mastery['mvq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'movies:' + movie.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = movie.tags.map(tag =>
      `<span class="movie-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${movie.icon}</div>
      <h3>${escHtml(movie.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(movie.englishName)}</p>
      <div class="movie-meta">🎬 ${escHtml(movie.director)} · ${escHtml(movie.year)}</div>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'movie-view';
    card.dataset.id = movie.id;
    grid.appendChild(card);
  });
}

function showMovieDetail(movieId) {
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;
  _movieCurrentId = movieId;

  document.getElementById('mv-title').textContent = movie.bengaliName + ' — ' + movie.englishName;
  const content = document.getElementById('mv-content');

  const tagHtml = movie.tags.map(tag =>
    `<span class="movie-tag">${escHtml(tag)}</span>`
  ).join(' ');

  // Build dialogue lines
  const dialogueBn = movie.dialogueBn.map(l => `<div class="movie-dialogue-line">${escHtml(l)}</div>`).join('');
  const dialogueEn = movie.dialogueEn.map(l => `<div class="movie-dialogue-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="movie-meta">🎬 ${escHtml(movie.directorBn)} (${escHtml(movie.director)}) · ${escHtml(movie.year)}</div>
    <div class="movie-section">
      <p class="movie-desc-bn">${escHtml(movie.descBn)}</p>
      <p class="movie-desc-en">${escHtml(movie.descEn)}</p>
    </div>
    <div class="movie-section">
      <h3 class="movie-section-title">🎭 ${t('Dialogue')}</h3>
      <div class="movie-dialogue">
        <div class="movie-dialogue-col movie-dialogue-bn">${dialogueBn}</div>
        <div class="movie-dialogue-col movie-dialogue-en">${dialogueEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="movie-start-quiz" data-id="${escHtml(movieId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('movie-detail');
}

function startMovieQuiz(movieId) {
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;
  _movieCurrentId = movieId;
  _movieQuestions = shuffle(movie.quiz.slice());
  _movieQIndex = 0;
  _movieCorrect = 0;
  _movieAnswered = false;
  _movieMissed = [];
  _movieStartTime = Date.now();
  document.getElementById('mvq-title').textContent = movie.bengaliName + ' ' + t('Quiz');
  showScreen('movie-quiz');
  renderMovieQuestion();
}

function renderMovieQuestion() {
  const q = _movieQuestions[_movieQIndex];
  if (!q) return;
  _movieAnswered = false;

  const total = _movieQuestions.length;
  const pct = Math.round((_movieQIndex / total) * 100);
  document.getElementById('mvq-progress-fill').style.width = pct + '%';
  document.getElementById('mvq-score').textContent = toBnDigits(_movieQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('mvq-feedback').innerHTML = '';
  document.getElementById('mvq-explanation').style.display = 'none';
  document.getElementById('mvq-explanation').textContent = '';
  document.getElementById('mvq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('mvq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="movie-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerMovieMC(btn, chosen) {
  if (_movieAnswered) return;
  _movieAnswered = true;
  const q = _movieQuestions[_movieQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#mvq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('mvq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _movieCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('mvq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _movieMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'mvq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('mvq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('mvq-next-btn').style.display = 'inline-block';
}

function movieNext() {
  _movieQIndex++;
  if (_movieQIndex >= _movieQuestions.length) {
    showMovieResults();
  } else {
    _movieAnswered = false;
    renderMovieQuestion();
  }
}

function showMovieResults() {
  showScreen('movie-results');
  const total = _movieQuestions.length;
  const pct = total > 0 ? Math.round((_movieCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('mvr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('mvr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('mvr-title').textContent = title;

  const bestKey = 'movies:' + _movieCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_movieCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('mvr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();

  const missedEl = document.getElementById('mvr-missed');
  if (missedEl) {
    if (_movieMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _movieMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  POETRY
// ════════════════════════════════════════
let _poetryCurrentId = null;
let _poetryQuestions = [];
let _poetryQIndex = 0;
let _poetryCorrect = 0;
let _poetryAnswered = false;
let _poetryMissed = [];
let _poetryStartTime = null;

function renderPoetryHome() {
  const grid = document.getElementById('poetry-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  POETRY.forEach(poem => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = poem.quiz.length;
    let answered = 0;
    poem.quiz.forEach(q => {
      if ((progress.mastery['poq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'poetry:' + poem.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = poem.tags.map(tag =>
      `<span class="poetry-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${poem.icon}</div>
      <h3>${escHtml(poem.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(poem.englishName)}</p>
      <div class="poetry-meta">✍️ ${escHtml(poem.poet)} · ${escHtml(poem.year)}</div>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'poetry-view';
    card.dataset.id = poem.id;
    grid.appendChild(card);
  });
}

function showPoetryDetail(poemId) {
  const poem = POETRY.find(m => m.id === poemId);
  if (!poem) return;
  _poetryCurrentId = poemId;

  document.getElementById('po-title').textContent = poem.bengaliName + ' — ' + poem.englishName;
  const content = document.getElementById('po-content');

  const tagHtml = poem.tags.map(tag =>
    `<span class="poetry-tag">${escHtml(tag)}</span>`
  ).join(' ');

  const versesBn = poem.versesBn.map(l => `<div class="poetry-verse-line">${escHtml(l)}</div>`).join('');
  const versesEn = poem.versesEn.map(l => `<div class="poetry-verse-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="poetry-meta">✍️ ${escHtml(poem.poetBn)} (${escHtml(poem.poet)}) · ${escHtml(poem.year)}</div>
    <div class="poetry-section">
      <p class="poetry-desc-bn">${escHtml(poem.descBn)}</p>
      <p class="poetry-desc-en">${escHtml(poem.descEn)}</p>
    </div>
    <div class="poetry-section">
      <h3 class="poetry-section-title">📜 ${t('Verses')}</h3>
      <div class="poetry-verses">
        <div class="poetry-verses-col poetry-verses-bn">${versesBn}</div>
        <div class="poetry-verses-col poetry-verses-en">${versesEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="poetry-start-quiz" data-id="${escHtml(poemId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('poetry-detail');
}

function startPoetryQuiz(poemId) {
  const poem = POETRY.find(m => m.id === poemId);
  if (!poem) return;
  _poetryCurrentId = poemId;
  _poetryQuestions = shuffle(poem.quiz.slice());
  _poetryQIndex = 0;
  _poetryCorrect = 0;
  _poetryAnswered = false;
  _poetryMissed = [];
  _poetryStartTime = Date.now();
  document.getElementById('poq-title').textContent = poem.bengaliName + ' ' + t('Quiz');
  showScreen('poetry-quiz');
  renderPoetryQuestion();
}

function renderPoetryQuestion() {
  const q = _poetryQuestions[_poetryQIndex];
  if (!q) return;
  _poetryAnswered = false;

  const total = _poetryQuestions.length;
  const pct = Math.round((_poetryQIndex / total) * 100);
  document.getElementById('poq-progress-fill').style.width = pct + '%';
  document.getElementById('poq-score').textContent = toBnDigits(_poetryQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('poq-feedback').innerHTML = '';
  document.getElementById('poq-explanation').style.display = 'none';
  document.getElementById('poq-explanation').textContent = '';
  document.getElementById('poq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('poq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="poetry-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerPoetryMC(btn, chosen) {
  if (_poetryAnswered) return;
  _poetryAnswered = true;
  const q = _poetryQuestions[_poetryQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#poq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('poq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _poetryCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('poq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _poetryMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'poq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('poq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('poq-next-btn').style.display = 'inline-block';
}

function poetryNext() {
  _poetryQIndex++;
  if (_poetryQIndex >= _poetryQuestions.length) {
    showPoetryResults();
  } else {
    _poetryAnswered = false;
    renderPoetryQuestion();
  }
}

function showPoetryResults() {
  showScreen('poetry-results');
  const total = _poetryQuestions.length;
  const pct = total > 0 ? Math.round((_poetryCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('por-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('por-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('por-title').textContent = title;

  const bestKey = 'poetry:' + _poetryCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_poetryCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('por-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();

  const missedEl = document.getElementById('por-missed');
  if (missedEl) {
    if (_poetryMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _poetryMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  SPORTS
// ════════════════════════════════════════
let _sportCurrentId = null;
let _sportQuestions = [];
let _sportQIndex = 0;
let _sportCorrect = 0;
let _sportAnswered = false;
let _sportMissed = [];
let _sportStartTime = null;

function renderSportsHome() {
  const grid = document.getElementById('sports-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  SPORTS.forEach(sport => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = sport.quiz.length;
    let answered = 0;
    sport.quiz.forEach(q => {
      if ((progress.mastery['spq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'sports:' + sport.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = sport.tags.map(tag =>
      `<span class="sport-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${sport.icon}</div>
      <h3>${escHtml(sport.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(sport.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'sport-view';
    card.dataset.id = sport.id;
    grid.appendChild(card);
  });
}

function showSportDetail(sportId) {
  const sport = SPORTS.find(m => m.id === sportId);
  if (!sport) return;
  _sportCurrentId = sportId;

  document.getElementById('sp-title').textContent = sport.bengaliName + ' — ' + sport.englishName;
  const content = document.getElementById('sp-content');

  const tagHtml = sport.tags.map(tag =>
    `<span class="sport-tag">${escHtml(tag)}</span>`
  ).join(' ');

  const factsBn = sport.factsBn.map(l => `<div class="sport-fact-line">${escHtml(l)}</div>`).join('');
  const factsEn = sport.factsEn.map(l => `<div class="sport-fact-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="sport-section">
      <p class="sport-desc-bn">${escHtml(sport.descBn)}</p>
      <p class="sport-desc-en">${escHtml(sport.descEn)}</p>
    </div>
    <div class="sport-section">
      <h3 class="sport-section-title">📋 ${t('Key Facts')}</h3>
      <div class="sport-facts">
        <div class="sport-facts-col sport-facts-bn">${factsBn}</div>
        <div class="sport-facts-col sport-facts-en">${factsEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="sport-start-quiz" data-id="${escHtml(sportId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('sport-detail');
}

function startSportQuiz(sportId) {
  const sport = SPORTS.find(m => m.id === sportId);
  if (!sport) return;
  _sportCurrentId = sportId;
  _sportQuestions = shuffle(sport.quiz.slice());
  _sportQIndex = 0;
  _sportCorrect = 0;
  _sportAnswered = false;
  _sportMissed = [];
  _sportStartTime = Date.now();
  document.getElementById('spq-title').textContent = sport.bengaliName + ' ' + t('Quiz');
  showScreen('sport-quiz');
  renderSportQuestion();
}

function renderSportQuestion() {
  const q = _sportQuestions[_sportQIndex];
  if (!q) return;
  _sportAnswered = false;

  const total = _sportQuestions.length;
  const pct = Math.round((_sportQIndex / total) * 100);
  document.getElementById('spq-progress-fill').style.width = pct + '%';
  document.getElementById('spq-score').textContent = toBnDigits(_sportQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('spq-feedback').innerHTML = '';
  document.getElementById('spq-explanation').style.display = 'none';
  document.getElementById('spq-explanation').textContent = '';
  document.getElementById('spq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('spq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="sport-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerSportMC(btn, chosen) {
  if (_sportAnswered) return;
  _sportAnswered = true;
  const q = _sportQuestions[_sportQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#spq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('spq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _sportCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('spq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _sportMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'spq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('spq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('spq-next-btn').style.display = 'inline-block';
}

function sportNext() {
  _sportQIndex++;
  if (_sportQIndex >= _sportQuestions.length) {
    showSportResults();
  } else {
    _sportAnswered = false;
    renderSportQuestion();
  }
}

function showSportResults() {
  showScreen('sport-results');
  const total = _sportQuestions.length;
  const pct = total > 0 ? Math.round((_sportCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('spr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('spr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('spr-title').textContent = title;

  const bestKey = 'sports:' + _sportCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_sportCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('spr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();

  const missedEl = document.getElementById('spr-missed');
  if (missedEl) {
    if (_sportMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _sportMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  PROVERBS
// ════════════════════════════════════════
let _proverbCurrentId = null;
let _proverbQuestions = [];
let _proverbQIndex = 0;
let _proverbCorrect = 0;
let _proverbAnswered = false;
let _proverbMissed = [];
let _proverbStartTime = null;

function renderProverbsHome() {
  const grid = document.getElementById('proverbs-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  PROVERBS.forEach(proverb => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = proverb.quiz.length;
    let answered = 0;
    proverb.quiz.forEach(q => {
      if ((progress.mastery['pvq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'proverbs:' + proverb.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = proverb.tags.map(tag =>
      `<span class="proverb-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${proverb.icon}</div>
      <h3>${escHtml(proverb.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(proverb.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'proverb-view';
    card.dataset.id = proverb.id;
    grid.appendChild(card);
  });
}

function showProverbDetail(proverbId) {
  const proverb = PROVERBS.find(m => m.id === proverbId);
  if (!proverb) return;
  _proverbCurrentId = proverbId;

  document.getElementById('pv-title').textContent = proverb.bengaliName + ' — ' + proverb.englishName;
  const content = document.getElementById('pv-content');

  const tagHtml = proverb.tags.map(tag =>
    `<span class="proverb-tag">${escHtml(tag)}</span>`
  ).join(' ');

  const proverbsBn = proverb.proverbsBn.map(l => `<div class="proverb-item">${escHtml(l)}</div>`).join('');
  const proverbsEn = proverb.proverbsEn.map(l => `<div class="proverb-item">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="proverb-section">
      <p class="proverb-desc-bn">${escHtml(proverb.descBn)}</p>
      <p class="proverb-desc-en">${escHtml(proverb.descEn)}</p>
    </div>
    <div class="proverb-section">
      <h3 class="proverb-section-title">📝 ${t('Proverbs')}</h3>
      <div class="proverb-list">
        <div class="proverb-list-col proverb-list-bn">${proverbsBn}</div>
        <div class="proverb-list-col proverb-list-en">${proverbsEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="proverb-start-quiz" data-id="${escHtml(proverbId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('proverb-detail');
}

function startProverbQuiz(proverbId) {
  const proverb = PROVERBS.find(m => m.id === proverbId);
  if (!proverb) return;
  _proverbCurrentId = proverbId;
  _proverbQuestions = shuffle(proverb.quiz.slice());
  _proverbQIndex = 0;
  _proverbCorrect = 0;
  _proverbAnswered = false;
  _proverbMissed = [];
  _proverbStartTime = Date.now();
  document.getElementById('pvq-title').textContent = proverb.bengaliName + ' ' + t('Quiz');
  showScreen('proverb-quiz');
  renderProverbQuestion();
}

function renderProverbQuestion() {
  const q = _proverbQuestions[_proverbQIndex];
  if (!q) return;
  _proverbAnswered = false;

  const total = _proverbQuestions.length;
  const pct = Math.round((_proverbQIndex / total) * 100);
  document.getElementById('pvq-progress-fill').style.width = pct + '%';
  document.getElementById('pvq-score').textContent = toBnDigits(_proverbQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('pvq-feedback').innerHTML = '';
  document.getElementById('pvq-explanation').style.display = 'none';
  document.getElementById('pvq-explanation').textContent = '';
  document.getElementById('pvq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('pvq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="proverb-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerProverbMC(btn, chosen) {
  if (_proverbAnswered) return;
  _proverbAnswered = true;
  const q = _proverbQuestions[_proverbQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#pvq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('pvq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _proverbCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('pvq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _proverbMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'pvq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('pvq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('pvq-next-btn').style.display = 'inline-block';
}

function proverbNext() {
  _proverbQIndex++;
  if (_proverbQIndex >= _proverbQuestions.length) {
    showProverbResults();
  } else {
    _proverbAnswered = false;
    renderProverbQuestion();
  }
}

function showProverbResults() {
  showScreen('proverb-results');
  const total = _proverbQuestions.length;
  const pct = total > 0 ? Math.round((_proverbCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('pvr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('pvr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('pvr-title').textContent = title;

  const bestKey = 'proverbs:' + _proverbCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_proverbCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('pvr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();

  const missedEl = document.getElementById('pvr-missed');
  if (missedEl) {
    if (_proverbMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _proverbMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  FOLK TALES MODULE
// ════════════════════════════════════════
let _folktaleCurrentId = null;
let _folktaleQuestions = [];
let _folktaleQIndex = 0;
let _folktaleCorrect = 0;
let _folktaleAnswered = false;
let _folktaleMissed = [];
let _folktaleStartTime = null;

function renderFolktalesHome() {
  const grid = document.getElementById('folktales-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  FOLKTALES.forEach(tale => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = tale.quiz.length;
    let answered = 0;
    tale.quiz.forEach(q => {
      if ((progress.mastery['ftq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'folktales:' + tale.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = tale.tags.map(tag =>
      `<span class="folktale-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${tale.icon}</div>
      <h3>${escHtml(tale.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(tale.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'folktale-view';
    card.dataset.id = tale.id;
    grid.appendChild(card);
  });
}

function showFolktaleDetail(taleId) {
  const tale = FOLKTALES.find(m => m.id === taleId);
  if (!tale) return;
  _folktaleCurrentId = taleId;

  document.getElementById('ft-title').textContent = tale.bengaliName + ' — ' + tale.englishName;
  const content = document.getElementById('ft-content');

  const tagHtml = tale.tags.map(tag =>
    `<span class="folktale-tag">${escHtml(tag)}</span>`
  ).join(' ');

  const storyBn = tale.storyBn.map(l => `<div class="folktale-story-line">${escHtml(l)}</div>`).join('');
  const storyEn = tale.storyEn.map(l => `<div class="folktale-story-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="folktale-section">
      <p class="folktale-desc-bn">${escHtml(tale.descBn)}</p>
      <p class="folktale-desc-en">${escHtml(tale.descEn)}</p>
    </div>
    <div class="folktale-section">
      <h3 class="folktale-section-title">📖 ${t('Story')}</h3>
      <div class="folktale-story">
        <div class="folktale-story-col folktale-story-bn">${storyBn}</div>
        <div class="folktale-story-col folktale-story-en">${storyEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="folktale-start-quiz" data-id="${escHtml(taleId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('folktale-detail');
}

function startFolktaleQuiz(taleId) {
  const tale = FOLKTALES.find(m => m.id === taleId);
  if (!tale) return;
  _folktaleCurrentId = taleId;
  _folktaleQuestions = shuffle(tale.quiz.slice());
  _folktaleQIndex = 0;
  _folktaleCorrect = 0;
  _folktaleAnswered = false;
  _folktaleMissed = [];
  _folktaleStartTime = Date.now();
  document.getElementById('ftq-title').textContent = tale.bengaliName + ' ' + t('Quiz');
  showScreen('folktale-quiz');
  renderFolktaleQuestion();
}

function renderFolktaleQuestion() {
  const q = _folktaleQuestions[_folktaleQIndex];
  if (!q) return;
  _folktaleAnswered = false;

  const total = _folktaleQuestions.length;
  const pct = Math.round((_folktaleQIndex / total) * 100);
  document.getElementById('ftq-progress-fill').style.width = pct + '%';
  document.getElementById('ftq-score').textContent = toBnDigits(_folktaleQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('ftq-feedback').innerHTML = '';
  document.getElementById('ftq-explanation').style.display = 'none';
  document.getElementById('ftq-explanation').textContent = '';
  document.getElementById('ftq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('ftq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="folktale-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerFolktaleMC(btn, chosen) {
  if (_folktaleAnswered) return;
  _folktaleAnswered = true;
  const q = _folktaleQuestions[_folktaleQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#ftq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('ftq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _folktaleCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('ftq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _folktaleMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'ftq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('ftq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('ftq-next-btn').style.display = 'inline-block';
}

function folktaleNext() {
  _folktaleQIndex++;
  if (_folktaleQIndex >= _folktaleQuestions.length) {
    showFolktaleResults();
  } else {
    _folktaleAnswered = false;
    renderFolktaleQuestion();
  }
}

function showFolktaleResults() {
  showScreen('folktale-results');
  const total = _folktaleQuestions.length;
  const pct = total > 0 ? Math.round((_folktaleCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('ftr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('ftr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('ftr-title').textContent = title;

  const bestKey = 'folktales:' + _folktaleCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_folktaleCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('ftr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();
  checkAchievements();

  const missedEl = document.getElementById('ftr-missed');
  if (missedEl) {
    if (_folktaleMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _folktaleMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  FESTIVALS MODULE
// ════════════════════════════════════════
let _festivalCurrentId = null;
let _festivalQuestions = [];
let _festivalQIndex = 0;
let _festivalCorrect = 0;
let _festivalAnswered = false;
let _festivalMissed = [];
let _festivalStartTime = null;

function renderFestivalsHome() {
  const grid = document.getElementById('festivals-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  FESTIVALS.forEach(fest => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = fest.quiz.length;
    let answered = 0;
    fest.quiz.forEach(q => {
      if ((progress.mastery['feq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'festivals:' + fest.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = fest.tags.map(tag =>
      `<span class="festival-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${fest.icon}</div>
      <h3>${escHtml(fest.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(fest.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'festival-view';
    card.dataset.id = fest.id;
    grid.appendChild(card);
  });
}

function showFestivalDetail(festId) {
  const fest = FESTIVALS.find(m => m.id === festId);
  if (!fest) return;
  _festivalCurrentId = festId;

  document.getElementById('fe-title').textContent = fest.bengaliName + ' — ' + fest.englishName;
  const content = document.getElementById('fe-content');

  const tagHtml = fest.tags.map(tag =>
    `<span class="festival-tag">${escHtml(tag)}</span>`
  ).join(' ');

  const tradBn = fest.traditionsBn.map(l => `<div class="festival-tradition-line">${escHtml(l)}</div>`).join('');
  const tradEn = fest.traditionsEn.map(l => `<div class="festival-tradition-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="festival-section">
      <p class="festival-desc-bn">${escHtml(fest.descBn)}</p>
      <p class="festival-desc-en">${escHtml(fest.descEn)}</p>
    </div>
    <div class="festival-section">
      <h3 class="festival-section-title">🎊 ${t('Traditions')}</h3>
      <div class="festival-traditions">
        <div class="festival-traditions-col festival-traditions-bn">${tradBn}</div>
        <div class="festival-traditions-col festival-traditions-en">${tradEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="festival-start-quiz" data-id="${escHtml(festId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('festival-detail');
}

function startFestivalQuiz(festId) {
  const fest = FESTIVALS.find(m => m.id === festId);
  if (!fest) return;
  _festivalCurrentId = festId;
  _festivalQuestions = shuffle(fest.quiz.slice());
  _festivalQIndex = 0;
  _festivalCorrect = 0;
  _festivalAnswered = false;
  _festivalMissed = [];
  _festivalStartTime = Date.now();
  document.getElementById('feq-title').textContent = fest.bengaliName + ' ' + t('Quiz');
  showScreen('festival-quiz');
  renderFestivalQuestion();
}

function renderFestivalQuestion() {
  const q = _festivalQuestions[_festivalQIndex];
  if (!q) return;
  _festivalAnswered = false;

  const total = _festivalQuestions.length;
  const pct = Math.round((_festivalQIndex / total) * 100);
  document.getElementById('feq-progress-fill').style.width = pct + '%';
  document.getElementById('feq-score').textContent = toBnDigits(_festivalQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('feq-feedback').innerHTML = '';
  document.getElementById('feq-explanation').style.display = 'none';
  document.getElementById('feq-explanation').textContent = '';
  document.getElementById('feq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('feq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="festival-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerFestivalMC(btn, chosen) {
  if (_festivalAnswered) return;
  _festivalAnswered = true;
  const q = _festivalQuestions[_festivalQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#feq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('feq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _festivalCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('feq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _festivalMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'feq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('feq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('feq-next-btn').style.display = 'inline-block';
}

function festivalNext() {
  _festivalQIndex++;
  if (_festivalQIndex >= _festivalQuestions.length) {
    showFestivalResults();
  } else {
    _festivalAnswered = false;
    renderFestivalQuestion();
  }
}

function showFestivalResults() {
  showScreen('festival-results');
  const total = _festivalQuestions.length;
  const pct = total > 0 ? Math.round((_festivalCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('fer-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('fer-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('fer-title').textContent = title;

  const bestKey = 'festivals:' + _festivalCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_festivalCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('fer-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();
  checkAchievements();

  const missedEl = document.getElementById('fer-missed');
  if (missedEl) {
    if (_festivalMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _festivalMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  HISTORY MODULE
// ════════════════════════════════════════
let _historyCurrentId = null;
let _historyQuestions = [];
let _historyQIndex = 0;
let _historyCorrect = 0;
let _historyAnswered = false;
let _historyMissed = [];
let _historyStartTime = null;

function renderHistoryHome() {
  const grid = document.getElementById('history-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  HISTORY.forEach(item => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = item.quiz.length;
    let answered = 0;
    item.quiz.forEach(q => {
      if ((progress.mastery['hiq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'history:' + item.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = item.tags.map(tag =>
      `<span class="history-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${item.icon}</div>
      <h3>${escHtml(item.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(item.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'history-view';
    card.dataset.id = item.id;
    grid.appendChild(card);
  });
}

function showHistoryDetail(itemId) {
  const item = HISTORY.find(m => m.id === itemId);
  if (!item) return;
  _historyCurrentId = itemId;

  document.getElementById('hi-title').textContent = item.bengaliName + ' — ' + item.englishName;
  const content = document.getElementById('hi-content');

  const tagHtml = item.tags.map(tag =>
    `<span class="history-tag">${escHtml(tag)}</span>`
  ).join(' ');

  const factsBn = item.factsBn.map(l => `<div class="history-fact-line">${escHtml(l)}</div>`).join('');
  const factsEn = item.factsEn.map(l => `<div class="history-fact-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="history-section">
      <p class="history-desc-bn">${escHtml(item.descBn)}</p>
      <p class="history-desc-en">${escHtml(item.descEn)}</p>
    </div>
    <div class="history-section">
      <h3 class="history-section-title">📜 ${t('Key Facts')}</h3>
      <div class="history-facts">
        <div class="history-facts-col history-facts-bn">${factsBn}</div>
        <div class="history-facts-col history-facts-en">${factsEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="history-start-quiz" data-id="${escHtml(itemId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('history-detail');
}

function startHistoryQuiz(itemId) {
  const item = HISTORY.find(m => m.id === itemId);
  if (!item) return;
  _historyCurrentId = itemId;
  _historyQuestions = shuffle(item.quiz.slice());
  _historyQIndex = 0;
  _historyCorrect = 0;
  _historyAnswered = false;
  _historyMissed = [];
  _historyStartTime = Date.now();
  document.getElementById('hiq-title').textContent = item.bengaliName + ' ' + t('Quiz');
  showScreen('history-quiz');
  renderHistoryQuestion();
}

function renderHistoryQuestion() {
  const q = _historyQuestions[_historyQIndex];
  if (!q) return;
  _historyAnswered = false;

  const total = _historyQuestions.length;
  const pct = Math.round((_historyQIndex / total) * 100);
  document.getElementById('hiq-progress-fill').style.width = pct + '%';
  document.getElementById('hiq-score').textContent = toBnDigits(_historyQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('hiq-feedback').innerHTML = '';
  document.getElementById('hiq-explanation').style.display = 'none';
  document.getElementById('hiq-explanation').textContent = '';
  document.getElementById('hiq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('hiq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="history-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerHistoryMC(btn, chosen) {
  if (_historyAnswered) return;
  _historyAnswered = true;
  const q = _historyQuestions[_historyQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#hiq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('hiq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _historyCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('hiq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _historyMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'hiq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('hiq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('hiq-next-btn').style.display = 'inline-block';
}

function historyNext() {
  _historyQIndex++;
  if (_historyQIndex >= _historyQuestions.length) {
    showHistoryResults();
  } else {
    _historyAnswered = false;
    renderHistoryQuestion();
  }
}

function showHistoryResults() {
  showScreen('history-results');
  const total = _historyQuestions.length;
  const pct = total > 0 ? Math.round((_historyCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('hir-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('hir-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('hir-title').textContent = title;

  const bestKey = 'history:' + _historyCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_historyCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('hir-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();
  checkAchievements();

  const missedEl = document.getElementById('hir-missed');
  if (missedEl) {
    if (_historyMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _historyMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  TRAVEL MODULE
// ════════════════════════════════════════
let _travelCurrentId = null;
let _travelQuestions = [];
let _travelQIndex = 0;
let _travelCorrect = 0;
let _travelAnswered = false;
let _travelMissed = [];
let _travelStartTime = null;

function renderTravelHome() {
  const grid = document.getElementById('travel-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  TRAVEL.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const total = dest.quiz.length;
    let answered = 0;
    dest.quiz.forEach(q => {
      if ((progress.mastery['trq:' + q.id] || 0) >= 1) answered++;
    });
    const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

    const bestKey = 'travel:' + dest.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = dest.tags.map(tag =>
      `<span class="travel-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${dest.icon}</div>
      <h3>${escHtml(dest.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(dest.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answered)}/${toBnDigits(total)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'travel-view';
    card.dataset.id = dest.id;
    grid.appendChild(card);
  });
}

function showTravelDetail(destId) {
  const dest = TRAVEL.find(m => m.id === destId);
  if (!dest) return;
  _travelCurrentId = destId;

  document.getElementById('tr-detail-title').textContent = dest.bengaliName + ' — ' + dest.englishName;
  const content = document.getElementById('tr-detail-content');

  const tagHtml = dest.tags.map(tag =>
    `<span class="travel-tag">${escHtml(tag)}</span>`
  ).join(' ');

  const highBn = dest.highlightsBn.map(l => `<div class="travel-highlight-line">${escHtml(l)}</div>`).join('');
  const highEn = dest.highlightsEn.map(l => `<div class="travel-highlight-line">${escHtml(l)}</div>`).join('');

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="travel-section">
      <p class="travel-desc-bn">${escHtml(dest.descBn)}</p>
      <p class="travel-desc-en">${escHtml(dest.descEn)}</p>
    </div>
    <div class="travel-section">
      <h3 class="travel-section-title">🌟 ${t('Highlights')}</h3>
      <div class="travel-highlights">
        <div class="travel-highlights-col travel-highlights-bn">${highBn}</div>
        <div class="travel-highlights-col travel-highlights-en">${highEn}</div>
      </div>
    </div>
    <div style="text-align:center;margin:24px 0">
      <button class="btn-primary" data-action="travel-start-quiz" data-id="${escHtml(destId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('travel-detail');
}

function startTravelQuiz(destId) {
  const dest = TRAVEL.find(m => m.id === destId);
  if (!dest) return;
  _travelCurrentId = destId;
  _travelQuestions = shuffle(dest.quiz.slice());
  _travelQIndex = 0;
  _travelCorrect = 0;
  _travelAnswered = false;
  _travelMissed = [];
  _travelStartTime = Date.now();
  document.getElementById('trq-title').textContent = dest.bengaliName + ' ' + t('Quiz');
  showScreen('travel-quiz');
  renderTravelQuestion();
}

function renderTravelQuestion() {
  const q = _travelQuestions[_travelQIndex];
  if (!q) return;
  _travelAnswered = false;

  const total = _travelQuestions.length;
  const pct = Math.round((_travelQIndex / total) * 100);
  document.getElementById('trq-progress-fill').style.width = pct + '%';
  document.getElementById('trq-score').textContent = toBnDigits(_travelQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('trq-feedback').innerHTML = '';
  document.getElementById('trq-explanation').style.display = 'none';
  document.getElementById('trq-explanation').textContent = '';
  document.getElementById('trq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('trq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="travel-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerTravelMC(btn, chosen) {
  if (_travelAnswered) return;
  _travelAnswered = true;
  const q = _travelQuestions[_travelQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#trq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('trq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _travelCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('trq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _travelMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'trq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('trq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('trq-next-btn').style.display = 'inline-block';
}

function travelNext() {
  _travelQIndex++;
  if (_travelQIndex >= _travelQuestions.length) {
    showTravelResults();
  } else {
    _travelAnswered = false;
    renderTravelQuestion();
  }
}

function showTravelResults() {
  showScreen('travel-results');
  const total = _travelQuestions.length;
  const pct = total > 0 ? Math.round((_travelCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('trr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('trr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('trr-title').textContent = title;

  const bestKey = 'travel:' + _travelCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_travelCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('trr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();
  checkAchievements();

  const missedEl = document.getElementById('trr-missed');
  if (missedEl) {
    if (_travelMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _travelMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// ════════════════════════════════════════
//  CONVERSATIONS MODULE
// ════════════════════════════════════════
let _convCurrentId = null;
let _convQuestions = [];
let _convQIndex = 0;
let _convCorrect = 0;
let _convAnswered = false;
let _convMissed = [];
let _convStartTime = null;
let _convRpExchanges = [];
let _convRpIndex = 0;
let _convRpCorrect = 0;
let _convRpAnswered = false;
let _convRpTotal = 0;
let _convRpStartTime = null;
let _convMode = 'quiz'; // 'quiz' or 'roleplay'

function renderConvHome() {
  const grid = document.getElementById('conv-module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  CONVERSATIONS.forEach(conv => {
    const card = document.createElement('div');
    card.className = 'module-card';

    const quizTotal = conv.quiz.length;
    let quizAnswered = 0;
    conv.quiz.forEach(q => {
      if ((progress.mastery['cvq:' + q.id] || 0) >= 1) quizAnswered++;
    });
    const rpTotal = conv.roleplay.length;
    let rpAnswered = 0;
    conv.roleplay.forEach(rp => {
      if ((progress.mastery['cvrp:' + rp.id] || 0) >= 1) rpAnswered++;
    });
    const totalAll = quizTotal + rpTotal;
    const answeredAll = quizAnswered + rpAnswered;
    const pct = totalAll > 0 ? Math.round((answeredAll / totalAll) * 100) : 0;

    const bestKey = 'conversations:' + conv.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · ${t('Best:')} ${toBnDigits(best)}%` : '';

    const tagHtml = conv.tags.map(tag =>
      `<span class="conv-tag">${escHtml(tag)}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="module-icon">${conv.icon}</div>
      <h3>${escHtml(conv.bengaliName)}</h3>
      <p style="margin:4px 0 2px;font-size:0.88rem;color:var(--text-dim)">${escHtml(conv.englishName)}</p>
      <div style="margin-bottom:8px">${tagHtml}</div>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${toBnDigits(answeredAll)}/${toBnDigits(totalAll)} ${t('Quiz')}${bestLabel}</div>
    `;
    card.dataset.action = 'conv-view';
    card.dataset.id = conv.id;
    grid.appendChild(card);
  });
}

function showConvDetail(convId) {
  const conv = CONVERSATIONS.find(c => c.id === convId);
  if (!conv) return;
  _convCurrentId = convId;

  document.getElementById('cv-title').textContent = conv.bengaliName + ' — ' + conv.englishName;
  const content = document.getElementById('cv-content');

  const tagHtml = conv.tags.map(tag =>
    `<span class="conv-tag">${escHtml(tag)}</span>`
  ).join(' ');

  let dialogueHtml = '<div class="conv-dialogue-area">';
  conv.dialogue.forEach((line, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    dialogueHtml += `
      <div class="conv-bubble-row ${side}">
        <div class="conv-bubble">
          <div class="conv-speaker">${escHtml(line.speakerBn)} (${escHtml(line.speaker)})</div>
          <div class="conv-line-bn">${escHtml(line.lineBn)}</div>
          <div class="conv-line-en">${escHtml(line.lineEn)}</div>
          <div class="conv-line-roman">${escHtml(line.romanized)}</div>
        </div>
      </div>
    `;
  });
  dialogueHtml += '</div>';

  content.innerHTML = `
    <div style="margin-bottom:8px">${tagHtml}</div>
    <div class="conv-section">
      <p class="conv-desc-bn">${escHtml(conv.descBn)}</p>
      <p class="conv-desc-en">${escHtml(conv.descEn)}</p>
    </div>
    <div class="conv-section">
      <h3 class="conv-section-title">💬 ${t('Dialogue')}</h3>
      ${dialogueHtml}
    </div>
    <div style="text-align:center;margin:24px 0;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="btn-primary" data-action="conv-start-roleplay" data-id="${escHtml(convId)}" style="font-size:1.05rem;padding:14px 32px">
        🎭 ${t('Role-play')}
      </button>
      <button class="btn-primary" data-action="conv-start-quiz" data-id="${escHtml(convId)}" style="font-size:1.05rem;padding:14px 32px">
        📝 ${t('Take Quiz')}
      </button>
    </div>
  `;

  showScreen('conv-dialogue');
}

function startConvRoleplay(convId) {
  const conv = CONVERSATIONS.find(c => c.id === convId);
  if (!conv) return;
  _convCurrentId = convId;
  _convRpExchanges = conv.roleplay.slice(); // don't shuffle — maintain conversation order
  _convRpIndex = 0;
  _convRpCorrect = 0;
  _convRpAnswered = false;
  _convRpTotal = _convRpExchanges.length;
  _convRpStartTime = Date.now();
  _convMode = 'roleplay';
  document.getElementById('cvrp-title').textContent = conv.bengaliName + ' — ' + t('Role-play');
  showScreen('conv-roleplay');
  renderConvRpExchange();
}

function renderConvRpExchange() {
  const ex = _convRpExchanges[_convRpIndex];
  if (!ex) return;
  _convRpAnswered = false;

  document.getElementById('cvrp-progress').textContent = toBnDigits(_convRpIndex + 1) + ' / ' + toBnDigits(_convRpTotal);

  const area = document.getElementById('cvrp-content');
  let html = `
    <div class="conv-rp-context">
      <div class="conv-speaker">🗣️</div>
      <div class="conv-line-bn">${escHtml(ex.contextBn)}</div>
      <div class="conv-line-en">${escHtml(ex.contextEn)}</div>
    </div>
    <div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:10px">${t('Choose your response:')}</div>
    <div class="conv-rp-options">
  `;
  ex.options.forEach((opt, i) => {
    html += `<button class="conv-rp-option" data-action="conv-rp-choice" data-idx="${i}">
      <div class="rp-text-bn">${escHtml(opt.textBn)}</div>
      <div class="rp-text-en">${escHtml(opt.textEn)}</div>
    </button>`;
  });
  html += '</div><div id="conv-rp-feedback-area"></div>';
  area.innerHTML = html;
}

function answerConvRpChoice(btn, idx) {
  if (_convRpAnswered) return;
  _convRpAnswered = true;
  const ex = _convRpExchanges[_convRpIndex];
  if (!ex) return;

  const opt = ex.options[idx];
  const btns = document.querySelectorAll('.conv-rp-option');
  btns.forEach(b => { b.disabled = true; });

  if (opt.correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    _convRpCorrect++;
    addXP(2);
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    // Highlight correct options
    btns.forEach((b, i) => {
      if (ex.options[i].correct) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
      }
    });
  }

  const feedbackBn = opt.feedbackBn || '';
  const feedbackEn = opt.feedbackEn || '';
  const fbArea = document.getElementById('conv-rp-feedback-area');
  const color = opt.correct ? 'var(--accent)' : 'var(--wrong)';
  fbArea.innerHTML = `
    <div class="conv-rp-feedback" style="background:${opt.correct ? 'rgba(62,201,122,0.1)' : 'rgba(232,80,80,0.1)'}; border:1px solid ${color}">
      <div style="font-weight:600;color:${color};margin-bottom:4px">${opt.correct ? '✓ ' + t('Correct!') : '✗ ' + t('Incorrect')}</div>
      <div style="color:var(--text);font-size:0.88rem">${escHtml(feedbackBn)}</div>
      <div style="color:var(--text-dim);font-size:0.82rem">${escHtml(feedbackEn)}</div>
    </div>
    <div style="text-align:center;margin-top:14px">
      <button class="btn-primary" data-action="conv-rp-next" style="padding:10px 28px">${t('Continue →')}</button>
    </div>
  `;

  const masteryKey = 'cvrp:' + ex.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (opt.correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }
  saveProgress();
}

function convRpNext() {
  _convRpIndex++;
  if (_convRpIndex >= _convRpExchanges.length) {
    // Show interstitial
    const pct = _convRpTotal > 0 ? Math.round((_convRpCorrect / _convRpTotal) * 100) : 0;
    const area = document.getElementById('cvrp-content');
    area.innerHTML = `
      <div class="conv-rp-interstitial">
        <div style="font-size:2.5rem;margin-bottom:12px">🎭</div>
        <div class="score-text">${t('Role-play')}: ${toBnDigits(_convRpCorrect)}/${toBnDigits(_convRpTotal)} (${toBnDigits(pct)}%)</div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px">
          <button class="btn-primary" data-action="conv-start-quiz" data-id="${escHtml(_convCurrentId)}" style="padding:12px 28px">📝 ${t('Continue to Quiz')}</button>
          <button class="nav-btn" data-action="show-screen" data-screen="conv-home" style="padding:12px 28px">${t('Home')}</button>
        </div>
      </div>
    `;

    const bestKey = 'conv-rp:' + _convCurrentId;
    const hist = progress.quizHistory || (progress.quizHistory = {});
    const prev = hist[bestKey] || { best: -1 };
    if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

    addXP(1);
    updateNav();
    checkAchievements();
  } else {
    _convRpAnswered = false;
    renderConvRpExchange();
  }
}

function startConvQuiz(convId) {
  const conv = CONVERSATIONS.find(c => c.id === convId);
  if (!conv) return;
  _convCurrentId = convId;
  _convQuestions = shuffle(conv.quiz.slice());
  _convQIndex = 0;
  _convCorrect = 0;
  _convAnswered = false;
  _convMissed = [];
  _convStartTime = Date.now();
  _convMode = 'quiz';
  document.getElementById('cvq-title').textContent = conv.bengaliName + ' ' + t('Quiz');
  showScreen('conv-quiz');
  renderConvQuestion();
}

function renderConvQuestion() {
  const q = _convQuestions[_convQIndex];
  if (!q) return;
  _convAnswered = false;

  const total = _convQuestions.length;
  const pct = Math.round((_convQIndex / total) * 100);
  document.getElementById('cvq-progress-fill').style.width = pct + '%';
  document.getElementById('cvq-score').textContent = toBnDigits(_convQIndex + 1) + ' / ' + toBnDigits(total);
  document.getElementById('cvq-feedback').innerHTML = '';
  document.getElementById('cvq-explanation').style.display = 'none';
  document.getElementById('cvq-explanation').textContent = '';
  document.getElementById('cvq-next-btn').style.display = 'none';

  const prompt = getDisplayMode() === 'immersion' && q.promptBn ? q.promptBn : q.prompt;
  const indices = q.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  q._shuffledIndices = shuffled;
  const area = document.getElementById('cvq-question-area');
  let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(prompt) + '</div>';
  html += '<div class="quiz-options">';
  shuffled.forEach((origIdx, displayIdx) => {
    html += `<button class="option-btn" data-action="conv-mc" data-idx="${displayIdx}">${escHtml(q.options[origIdx])}</button>`;
  });
  html += '</div>';
  area.innerHTML = html;
}

function answerConvMC(btn, chosen) {
  if (_convAnswered) return;
  _convAnswered = true;
  const q = _convQuestions[_convQIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#cvq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const shuffledIndices = q._shuffledIndices || q.options.map((_, i) => i);
  const chosenOrigIdx = shuffledIndices[chosen];
  const correct = (chosenOrigIdx === q.correct);
  const correctDisplayIdx = shuffledIndices.indexOf(q.correct);

  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('cvq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ ' + t('Correct!') + ' +2 XP</span>';
    addXP(2);
    _convCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    btns.forEach((b, i) => {
      if (i === correctDisplayIdx) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('cvq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ ' + t('Incorrect') + '</span>';
    _convMissed.push({ answer: q.options[q.correct] });
  }

  const masteryKey = 'cvq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  if (q.explanation) {
    const expEl = document.getElementById('cvq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  document.getElementById('cvq-next-btn').style.display = 'inline-block';
}

function convNext() {
  _convQIndex++;
  if (_convQIndex >= _convQuestions.length) {
    showConvResults();
  } else {
    _convAnswered = false;
    renderConvQuestion();
  }
}

function showConvResults() {
  showScreen('conv-results');
  const total = _convQuestions.length;
  const pct = total > 0 ? Math.round((_convCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('cvr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('cvr-pct').textContent = toBnDigits(pct) + '%';

  const title = pct === 100 ? t('Perfect!') + ' 🌟' : pct >= 67 ? t('Great job!') : t('Keep practicing!');
  document.getElementById('cvr-title').textContent = title;

  const bestKey = 'conversations:' + _convCurrentId;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = [t('You scored') + ' ' + toBnDigits(_convCorrect) + '/' + toBnDigits(total)];
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 ' + t('New best!'));
  else if (prev.best >= 0 && prev.best > pct) subParts.push(t('Best:') + ' ' + toBnDigits(prev.best) + '%');
  document.getElementById('cvr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();
  checkAchievements();

  const missedEl = document.getElementById('cvr-missed');
  if (missedEl) {
    if (_convMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">' + t('Review these') + '</div>' +
        _convMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

let triviaCurrentCategory = null;
let triviaQuestions = [];
let triviaIndex = 0;
let triviaCorrect = 0;
let triviaAnswered = false;
let triviaMissed = [];
let _triviaStartTime = null;

function renderTriviaHome() {
  const grid = document.getElementById('trivia-category-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Count total non-FIB questions for progress denominator
  const totalMc = TRIVIA_QUESTIONS.filter(q => q.type === 'mc').length;
  let masteredMc = 0;
  TRIVIA_QUESTIONS.forEach(q => {
    if (q.type === 'mc' && (progress.mastery['tq:' + q.id] || 0) >= 1) masteredMc++;
  });

  TRIVIA_CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'module-card';

    let pct, masteredCount, total;
    if (cat.id === 'mixed') {
      total = totalMc;
      masteredCount = masteredMc;
    } else {
      const catMc = TRIVIA_QUESTIONS.filter(q => q.category === cat.id && q.type === 'mc');
      total = catMc.length;
      masteredCount = catMc.filter(q => (progress.mastery['tq:' + q.id] || 0) >= 1).length;
    }
    pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

    const bestKey = 'trivia:' + cat.id;
    const best = progress.quizHistory && progress.quizHistory[bestKey] ? progress.quizHistory[bestKey].best : -1;
    const bestLabel = best >= 0 ? ` · Best: ${best}%` : '';

    card.innerHTML = `
      <div class="module-icon">${cat.icon}</div>
      <h3>${cat.title}</h3>
      <p>${cat.desc}</p>
      <div class="module-progress"><div class="module-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>
      <div class="progress-label">${masteredCount}/${total} answered${bestLabel}</div>
    `;
    card.onclick = () => startTriviaQuiz(cat.id);
    grid.appendChild(card);
  });
}

function buildTriviaPool(catId) {
  let pool;
  if (catId === 'mixed') {
    pool = TRIVIA_QUESTIONS.slice();
  } else {
    pool = TRIVIA_QUESTIONS.filter(q => q.category === catId);
  }
  // Apply FIB gate: only include FIB questions if the corresponding MC question was answered
  // at least once. FIB IDs follow the pattern "<mc-id>-fib", so strip the suffix to find the MC key.
  pool = pool.filter(q => {
    if (q.type !== 'fib') return true;
    const mcId = q.id.replace(/-fib$/, '');
    return (progress.mastery['tq:' + mcId] || 0) >= 1;
  });
  return pool;
}

function startTriviaQuiz(catId) {
  triviaCurrentCategory = catId;
  const pool = buildTriviaPool(catId);
  const maxQ = catId === 'mixed' ? 10 : Math.min(pool.length, 8);
  triviaQuestions = shuffle(pool.slice()).slice(0, maxQ);
  triviaIndex = 0;
  triviaCorrect = 0;
  triviaAnswered = false;
  triviaMissed = [];
  _triviaStartTime = Date.now();
  const cat = TRIVIA_CATEGORIES.find(c => c.id === catId);
  document.getElementById('tq-title').textContent = (cat ? cat.title : 'Trivia') + ' Quiz';
  showScreen('trivia-quiz');
  renderTriviaQuestion();
}

function renderTriviaQuestion() {
  const q = triviaQuestions[triviaIndex];
  if (!q) return;
  triviaAnswered = false;

  const total = triviaQuestions.length;
  const pct = Math.round((triviaIndex / total) * 100);
  document.getElementById('tq-progress-bar').style.width = pct + '%';
  document.getElementById('tq-progress-label').textContent = (triviaIndex + 1) + ' / ' + total;
  document.getElementById('tq-feedback').innerHTML = '';
  document.getElementById('tq-explanation').style.display = 'none';
  document.getElementById('tq-explanation').textContent = '';
  document.getElementById('tq-next-btn').style.display = 'none';

  const area = document.getElementById('tq-question-area');
  if (q.type === 'mc') {
    let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' + escHtml(q.prompt) + '</div>';
    html += '<div class="quiz-options">';
    q.options.forEach((opt, i) => {
      html += `<button class="option-btn" data-action="trivia-mc" data-idx="${i}">${escHtml(opt)}</button>`;
    });
    html += '</div>';
    area.innerHTML = html;
  } else {
    // FIB
    const parts = q.prompt.split('_____');
    let html = '<div class="quiz-question-text" style="font-size:1.05rem;margin-bottom:1rem;line-height:1.5">' +
      parts.map(p => escHtml(p)).join('<span style="color:var(--accent)">_____</span>') + '</div>';
    html += '<div style="display:flex;gap:8px;align-items:center;margin-bottom:0.5rem">' +
      '<input id="tq-fib-input" class="fib-input" type="text" autocomplete="off" placeholder="Type your answer…" style="flex:1">' +
      '<button class="btn-primary" data-action="trivia-submit-fib" style="padding:8px 16px">Submit</button>' +
      '</div>';
    area.innerHTML = html;
    const inp = document.getElementById('tq-fib-input');
    if (inp) setTimeout(() => inp.focus(), 50);
  }
}

function answerTriviaMC(btn, chosen) {
  if (triviaAnswered) return;
  triviaAnswered = true;
  const q = triviaQuestions[triviaIndex];
  if (!q) return;

  const btns = document.querySelectorAll('#tq-question-area .option-btn');
  btns.forEach(b => { b.disabled = true; });

  const correct = (chosen === q.correct);
  if (correct) {
    btn.style.background = 'rgba(62,201,122,0.25)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
    document.getElementById('tq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ Correct! +2 XP</span>';
    addXP(2);
    triviaCorrect++;
  } else {
    btn.style.background = 'rgba(232,80,80,0.2)';
    btn.style.borderColor = 'var(--wrong)';
    btn.style.color = 'var(--wrong)';
    // Highlight correct answer
    btns.forEach((b, i) => {
      if (i === q.correct) {
        b.style.background = 'rgba(62,201,122,0.25)';
        b.style.borderColor = 'var(--accent)';
        b.style.color = 'var(--accent)';
      }
    });
    document.getElementById('tq-feedback').innerHTML = '<span style="color:var(--wrong);font-weight:600">✗ Incorrect</span>';
    triviaMissed.push({ answer: q.options[q.correct], bengali: null });
  }

  // Update mastery
  const masteryKey = 'tq:' + q.id;
  if (!progress.mastery[masteryKey]) progress.mastery[masteryKey] = 0;
  if (correct) {
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  }

  // Show explanation
  if (q.explanation) {
    const expEl = document.getElementById('tq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  checkAchievements();
  document.getElementById('tq-next-btn').style.display = 'inline-block';
}

function answerTriviaFIB() {
  if (triviaAnswered) return;
  const q = triviaQuestions[triviaIndex];
  if (!q || q.type !== 'fib') return;
  const inp = document.getElementById('tq-fib-input');
  if (!inp) return;
  triviaAnswered = true;

  const raw = inp.value.trim();
  const norm = raw.toLowerCase();
  const correct = q.answer.some(a => a.toLowerCase() === norm);

  inp.disabled = true;
  if (correct) {
    inp.style.borderColor = 'var(--accent)';
    document.getElementById('tq-feedback').innerHTML = '<span style="color:var(--accent);font-weight:600">✓ Correct! +3 XP</span>';
    addXP(3);
    triviaCorrect++;
    const masteryKey = 'tq:' + q.id;
    progress.mastery[masteryKey] = Math.min(2, (progress.mastery[masteryKey] || 0) + 1);
  } else {
    inp.style.borderColor = 'var(--wrong)';
    document.getElementById('tq-feedback').innerHTML =
      '<span style="color:var(--wrong);font-weight:600">✗ Incorrect — answer: ' + escHtml(q.answer[0]) + '</span>';
    triviaMissed.push({ answer: q.answer[0], bengali: null });
  }

  if (q.explanation) {
    const expEl = document.getElementById('tq-explanation');
    expEl.textContent = q.explanation;
    expEl.style.display = 'block';
  }

  saveProgress();
  checkAchievements();
  document.getElementById('tq-next-btn').style.display = 'inline-block';
}

function triviaNext() {
  triviaIndex++;
  if (triviaIndex >= triviaQuestions.length) {
    showTriviaResults();
  } else {
    triviaAnswered = false;
    renderTriviaQuestion();
  }
}

function showTriviaResults() {
  showScreen('trivia-results');
  const total = triviaQuestions.length;
  const pct = total > 0 ? Math.round((triviaCorrect / total) * 100) : 0;

  setTimeout(() => {
    const offset = 452.4 * (1 - pct / 100);
    const ring = document.getElementById('tr-ring');
    if (ring) ring.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById('tr-pct').textContent = pct + '%';

  const title = pct === 100 ? 'Perfect! 🌟' : pct >= 80 ? 'Great job!' : pct >= 50 ? 'Good effort!' : 'Keep practicing!';
  document.getElementById('tr-title').textContent = title;

  const bestKey = 'trivia:' + triviaCurrentCategory;
  const hist = progress.quizHistory || (progress.quizHistory = {});
  const prev = hist[bestKey] || { best: -1 };
  if (pct > prev.best) { hist[bestKey] = { best: pct }; saveProgress(); }

  const subParts = ['You scored ' + triviaCorrect + '/' + total];
  if (_triviaStartTime) subParts.push('⏱ ' + _formatElapsed(Date.now() - _triviaStartTime));
  if (pct > prev.best && prev.best >= 0) subParts.push('🌟 New best!');
  else if (prev.best >= 0 && prev.best > pct) subParts.push('Best: ' + prev.best + '%');
  document.getElementById('tr-sub').textContent = subParts.join(' · ');

  addXP(1);
  updateNav();
  checkAchievements();

  // Render missed items
  const missedEl = document.getElementById('tr-missed');
  if (missedEl) {
    if (triviaMissed.length === 0) {
      missedEl.innerHTML = '';
    } else {
      missedEl.innerHTML = '<div class="missed-section"><div class="missed-title">Review these</div>' +
        triviaMissed.map(m => `<div class="missed-item"><span class="missed-answer">${escHtml(m.answer)}</span></div>`).join('') +
        '</div>';
    }
  }
}

// Register service worker for offline/PWA support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}


// ============================================================
// Delegated click listener — handles all data-action elements
// ============================================================
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.closest('[data-action]')) e.preventDefault();
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const a = el.dataset;
  switch (a.action) {
    // Navigation
    case 'switch-tab': closeAllTabDropdowns(); switchTab(a.tab); break;
    case 'toggle-tab-group': toggleTabDropdown(a.group); break;
    case 'show-screen': showScreen(a.screen); break;
    case 'go-module-home': goModuleHome(); break;
    case 'dismiss-error': switchTab(currentTab); break;
    // Alphabet quiz
    case 'answer-mc': answerMC(el, a.answer); break;
    case 'dont-know-quiz': dontKnowQuiz(); break;
    case 'rate-answer': onRatingSelected(+a.rating); break;
    case 'select-spell': selectSpellTile(el); break;
    case 'answer-spell': answerSpell(); break;
    case 'answer-fib': answerFIB(); break;
    case 'answer-arith-mc': answerArithMC(el, a.answer); break;
    case 'answer-arith-fib': answerArithFIB(); break;
    case 'next-question': if (_arithmeticQuestions.length > 0 && _arithmeticAnswered) { nextArithmeticQuestion(); } else { nextQuestion(); } break;
    case 'retry-quiz': retryQuiz(); break;
    case 'retry-missed-quiz': retryMissedQuiz(); break;
    case 'start-quiz': startQuiz(); break;
    // Card navigation
    case 'flip-card': flipCard(); break;
    case 'prev-card': prevCard(); break;
    case 'next-card': nextCard(); break;
    case 'speak-current-letter': speakCurrentLetter(); break;
    case 'open-canvas': openCanvas(); break;
    case 'close-canvas': closeCanvas(); break;
    case 'clear-canvas': clearCanvas(); break;
    case 'complete-canvas-letter': completeCanvasLetter(); break;
    case 'navigate-letter': navigateToLetter(a.letter); break;
    case 'show-chart-detail': showChartDetail(el); break;
    // Vocab
    case 'flip-vocab-card': flipVocabCard(); break;
    case 'prev-vocab-card': prevVocabCard(); break;
    case 'next-vocab-card': nextVocabCard(); break;
    case 'speak-current-vocab': speakCurrentVocab(); break;
    case 'speak-current-vocab-example': speakCurrentVocabExample(); break;
    case 'start-vocab-quiz': startVocabQuiz(); break;
    case 'answer-mc-vocab': answerVocabMC(el, a.answer); break;
    case 'dont-know-vocab': dontKnowVocab(); break;
    case 'answer-vocab-fib': answerVocabFIB(); break;
    case 'next-vocab-question': nextVocabQuestion(); break;
    case 'retry-vocab-quiz': retryVocabQuiz(); break;
    case 'retry-missed-vocab': retryMissedVocab(); break;
    case 'set-vocab-filter': setVocabFilter(a.catid || null); break;
    case 'set-vocab-level': setVocabLevel(a.level || null); break;
    case 'start-vocab-filter-quiz': startFilteredVocabQuiz(); break;
    case 'show-vocab-detail': showVocabDetail(a.lemma); break;
    case 'show-vocab-detail-search': closeSearch(); showVocabDetail(JSON.parse(a.lemma)); break;
    case 'vocab-page-prev': vbPage--; renderVocabList(); break;
    case 'vocab-page-next': vbPage++; renderVocabList(); break;
    case 'start-vocab-learn': e.stopPropagation(); startVocabLearn(a.catid); break;
    case 'start-vocab-cat-quiz': e.stopPropagation(); _startVocabCatQuiz(a.catid); break;
    case 'start-vocab-listening': e.stopPropagation(); startVocabListeningForCategory(a.catid || null); break;
    // Grammar
    case 'flip-gl-card': flipGlCard(); break;
    case 'prev-gl-card': prevGlCard(); break;
    case 'next-gl-card': nextGlCard(); break;
    case 'start-grammar-quiz': startGrammarQuiz(); break;
    case 'answer-mc-grammar': answerGrammarMC(el, a.answer); break;
    case 'dont-know-grammar': dontKnowGrammar(); break;
    case 'answer-grammar-fib': answerGrammarFIB(); break;
    case 'select-word-tile': selectWordTile(el); break;
    case 'check-word-order': checkWordOrder(); break;
    case 'next-grammar-question': nextGrammarQuestion(); break;
    case 'retry-grammar-quiz': retryGrammarQuiz(); break;
    case 'retry-missed-grammar': retryMissedGrammar(); break;
    case 'toggle-conj-table': toggleConjTable(); break;
    case 'select-conj-verb': setConjugationVerb(el.value); break;
    case 'start-conj-quiz': startConjugationQuiz(); break;
    case 'conj-quiz-mc': handleConjQuizMC(a.answer); break;
    case 'conj-quiz-fib-submit': handleConjQuizFIB(); break;
    // Phrases
    case 'flip-ps-card': flipPsCard(); break;
    case 'prev-ps-card': prevPsCard(); break;
    case 'next-ps-card': nextPsCard(); break;
    case 'start-phrases-quiz': startPhrasesQuiz(); break;
    case 'answer-mc-phrases': answerPhrasesMC(el, a.answer); break;
    case 'dont-know-phrases': dontKnowPhrases(); break;
    case 'answer-phrases-fib': answerPhrasesFIB(); break;
    case 'next-phrases-question': nextPhrasesQuestion(); break;
    case 'retry-phrases-quiz': retryPhrasesQuiz(); break;
    case 'retry-missed-phrases': retryMissedPhrases(); break;
    // Placement test
    case 'answer-mc-pt': answerPlacementMC(el, a.answer); break;
    case 'answer-pt-fib': answerPlacementFIB(); break;
    case 'pt-select-word-tile': ptSelectWordTile(el); break;
    case 'check-pt-word-order': checkPlacementWordOrder(); break;
    case 'begin-placement-quiz': beginPlacementQuiz(); break;
    case 'apply-placement': applyPlacementResults(); break;
    case 'discard-placement': discardPlacementResults(); break;
    case 'quit-placement': confirmQuitPlacement(); break;
    case 'next-pt-question': nextPlacementQuestion(); break;
    case 'start-placement-test': startPlacementTest(); break;
    case 'settings-start-placement': closeSettingsPanel(); startPlacementTest(); break;
    case 'progress-start-placement': closeProgressPanel(); startPlacementTest(); break;
    case 'set-pt-difficulty': setPtDifficulty(a.diff); break;
    case 'set-pt-len': setPtLength(a.len); break;
    // Today tab
    case 'review-and-alphabet': startReviewSession(); switchTab('alphabet'); break;
    case 'vocab-practice': switchTab('vocabulary'); startMixedVocabPractice(); break;
    case 'open-grammar-lesson': switchTab('grammar'); openGrammarLesson(a.id); break;
    case 'start-mistake-review': startMistakeReview(); break;
    case 'start-reading-passage': startReadingPassage(a.id); break;
    case 'answer-reading-check': answerReadingCheck(+a.qi, +a.oi); break;
    case 'submit-reading-check': submitReadingCheck(); break;
    case 'reading-lookup': openReadingLookup(a.lemma); break;
    case 'run-next-review': _runNextReviewItem(); break;
    // Settings / UI
    case 'open-settings': openSettingsPanel(); break;
    case 'close-settings': closeSettingsPanel(); break;
    case 'open-progress': openProgressPanel(); break;
    case 'open-stats': openStatsPanel(); break;
    case 'open-help': openHelpPanel(); break;
    case 'close-help': closeHelpPanel(); break;
    case 'toggle-theme': toggleTheme(); break;
    case 'open-search': openSearch(); break;
    case 'set-fib-mode': setFibMode(a.mode); break;
    case 'set-listening-mode': setListeningMode(a.mode); break;
    case 'set-display-mode': setDisplayMode(a.mode); break;
    case 'toggle-hide-english': toggleHideEnglish(); break;
    case 'set-theme': setThemePalette(a.palette || a.theme); break;
    case 'switch-profile': switchProfile(); break;
    case 'import-progress': importProgress(); break;
    case 'export-progress': exportProgress(); break;
    case 'delete-current-profile': deleteCurrentProfile(); break;
    case 'unlock-all': unlockAllContent(el); break;
    case 'toggle-mastery-legend': toggleMasteryLegend(); break;
    case 'close-progress': closeProgressPanel(); break;
    case 'close-stats': closeStatsPanel(); break;
    case 'start-review-session': startReviewSession(); break;
    case 'show-profile-screen': showProfileScreen(false); break;
    case 'create-profile': createProfile(); break;
    case 'cancel-new-profile': cancelNewProfile(); break;
    // Audio
    case 'speak': speakBengali(a.text, a.rate ? +a.rate : undefined); break;
    case 'toggle-slow-audio': toggleSlowAudio(el); break;
    case 'show-hint': showHint(el); break;
    case 'show-kbd': showBengaliKbd(a.input); break;
    case 'report-problem': reportProblem(a.kind); break;
    // Progress panel
    case 'toggle-prog-section': toggleProgSection(a.section); break;
    case 'toggle-prog-group': toggleProgGroup(a.group); break;
    case 'cycle-letter-mastery': cycleLetterMastery(a.letter); break;
    case 'cycle-vocab-mastery': cycleVocabChipMastery(a.lemma); break;
    case 'set-lesson-level': setGrammarLessonLevel(a.id, +a.level); break;
    case 'reset-phrases-situation': resetPhrasesSituation(a.slug); break;
    // Profiles
    case 'select-profile':    selectProfile(a.name); break;
    case 'unlock-profile':    showProfileUnlock(a.name); break;
    case 'submit-profile-pw': submitProfilePw(a.name); break;
    case 'rename-profile':    renameProfile(a.name); break;
    case 'export-profile':    exportProfileData(a.name); break;
    case 'copy-profile':      copyProfileDataToClipboard(a.name); break;
    case 'delete-profile':    deleteProfile(a.name); break;
    case 'manage-profile-pw': manageProfilePassword(); break;
    // Search
    case 'open-letter-result': openLetterResult(a.letter); closeSearch(); break;
    case 'search-add-to-study': e.stopPropagation(); searchAddToStudy(JSON.parse(a.lemma), el); break;
    case 'open-vocab-browse-search': openVocabBrowseSearch(a.query); break;
    case 'open-grammar-result': openGrammarResult(a.id); break;
    case 'close-search': closeSearch(); break;
    // Word modal
    case 'close-word-modal': closeWordModal(); break;
    case 'flip-word-modal': flipWordModal(); break;
    case 'speak-wm-bengali': speakBengali(document.getElementById('wm-bengali').textContent); break;
    case 'speak-vocab-example': speakVocabExample(); break;
    case 'open-related-word': showVocabDetail(a.lemma); break;
    case 'study-word-next': studyWordNext(el.dataset.lemma); break;
    case 'open-verb-conjugation': closeWordModal(); openVerbConjugationFromVocab(el.dataset.lemma); break;
    // Listening
    case 'start-letter-listening': startLetterListening(); break;
    case 'start-phoneme-quiz': startPhonemePairQuiz(); break;
    case 'phoneme-quiz-mc': handlePhonemePairMC(a.answer); break;
    // Onboarding
    case 'dismiss-onboarding': dismissOnboarding(); break;
    // Bengali keyboard
    case 'toggle-bng-kbd': toggleBengaliKbd(); break;
    case 'append-char': appendBengaliChar(a.char); break;
    // Recipes
    case 'recipe-view':        showRecipeDetail(a.id); break;
    case 'recipe-start-quiz':  startRecipeQuiz(a.id); break;
    case 'recipe-mc':          answerRecipeMC(el, +a.idx); break;
    case 'recipe-next':        recipeNext(); break;
    case 'recipe-retry':       startRecipeQuiz(_recipeCurrentId); break;
    // Music
    case 'music-view':        showMusicDetail(a.id); break;
    case 'music-start-quiz':  startMusicQuiz(a.id); break;
    case 'music-mc':          answerMusicMC(el, +a.idx); break;
    case 'music-next':        musicNext(); break;
    case 'music-retry':       startMusicQuiz(_musicCurrentId); break;
    // Movies
    case 'movie-view':        showMovieDetail(a.id); break;
    case 'movie-start-quiz':  startMovieQuiz(a.id); break;
    case 'movie-mc':          answerMovieMC(el, +a.idx); break;
    case 'movie-next':        movieNext(); break;
    case 'movie-retry':       startMovieQuiz(_movieCurrentId); break;
    // Poetry
    case 'poetry-view':        showPoetryDetail(a.id); break;
    case 'poetry-start-quiz':  startPoetryQuiz(a.id); break;
    case 'poetry-mc':          answerPoetryMC(el, +a.idx); break;
    case 'poetry-next':        poetryNext(); break;
    case 'poetry-retry':       startPoetryQuiz(_poetryCurrentId); break;
    // Sports
    case 'sport-view':         showSportDetail(a.id); break;
    case 'sport-start-quiz':   startSportQuiz(a.id); break;
    case 'sport-mc':           answerSportMC(el, +a.idx); break;
    case 'sport-next':         sportNext(); break;
    case 'sport-retry':        startSportQuiz(_sportCurrentId); break;
    // Proverbs
    case 'proverb-view':       showProverbDetail(a.id); break;
    case 'proverb-start-quiz': startProverbQuiz(a.id); break;
    case 'proverb-mc':         answerProverbMC(el, +a.idx); break;
    case 'proverb-next':       proverbNext(); break;
    case 'proverb-retry':      startProverbQuiz(_proverbCurrentId); break;
    // Folk Tales
    case 'folktale-view':       showFolktaleDetail(a.id); break;
    case 'folktale-start-quiz': startFolktaleQuiz(a.id); break;
    case 'folktale-mc':         answerFolktaleMC(el, +a.idx); break;
    case 'folktale-next':       folktaleNext(); break;
    case 'folktale-retry':      startFolktaleQuiz(_folktaleCurrentId); break;
    // Festivals
    case 'festival-view':       showFestivalDetail(a.id); break;
    case 'festival-start-quiz': startFestivalQuiz(a.id); break;
    case 'festival-mc':         answerFestivalMC(el, +a.idx); break;
    case 'festival-next':       festivalNext(); break;
    case 'festival-retry':      startFestivalQuiz(_festivalCurrentId); break;
    // History
    case 'history-view':        showHistoryDetail(a.id); break;
    case 'history-start-quiz':  startHistoryQuiz(a.id); break;
    case 'history-mc':          answerHistoryMC(el, +a.idx); break;
    case 'history-next':        historyNext(); break;
    case 'history-retry':       startHistoryQuiz(_historyCurrentId); break;
    // Travel
    case 'travel-view':         showTravelDetail(a.id); break;
    case 'travel-start-quiz':   startTravelQuiz(a.id); break;
    case 'travel-mc':           answerTravelMC(el, +a.idx); break;
    case 'travel-next':         travelNext(); break;
    case 'travel-retry':        startTravelQuiz(_travelCurrentId); break;
    // Conversations
    case 'conv-view':           showConvDetail(a.id); break;
    case 'conv-start-roleplay': startConvRoleplay(a.id); break;
    case 'conv-rp-choice':      answerConvRpChoice(el, +a.idx); break;
    case 'conv-rp-next':        convRpNext(); break;
    case 'conv-start-quiz':     startConvQuiz(a.id); break;
    case 'conv-mc':             answerConvMC(el, +a.idx); break;
    case 'conv-next':           convNext(); break;
    case 'conv-retry':          startConvQuiz(_convCurrentId); break;
    // Trivia
    case 'trivia-mc':         answerTriviaMC(el, +a.idx); break;
    case 'trivia-submit-fib': answerTriviaFIB(); break;
    case 'trivia-next':       triviaNext(); break;
    case 'trivia-quiz-back':  showScreen('trivia-home'); break;
    case 'trivia-play-again': startTriviaQuiz(triviaCurrentCategory); break;
  }
});

// Delegated Enter-key handler for all fill-in-blank quiz inputs
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  const id = document.activeElement && document.activeElement.id;
  if (!id) return;
  if (id === 'fib-input') answerFIB();
  else if (id === 'vq-fib-input') answerVocabFIB();
  else if (id === 'gq-fib-input') answerGrammarFIB();
  else if (id === 'pt-fib-input') answerPlacementFIB();
  else if (id === 'phq-fib-input') answerPhrasesFIB();
  else if (id === 'tq-fib-input') answerTriviaFIB();
});

// Overlay backdrop close (fires only when clicking the backdrop itself, not children)
document.addEventListener('DOMContentLoaded', function() {
  var overlayMap = {
    'settings-overlay': function() { closeSettingsPanel(); },
    'help-overlay': function() { closeHelpPanel(); },
    'canvas-overlay': function() { closeCanvas(); },
    'onboarding-modal': function() { dismissOnboarding(); },
    'word-modal': function() { closeWordModal(); },
    'search-overlay': function() { closeSearch(); },
    'stats-overlay': function() { closeStatsPanel(); },
    'progress-overlay': function() { closeProgressPanel(); }
  };
  Object.keys(overlayMap).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function(e) { if (e.target === el) overlayMap[id](); });
  });
});
