/* ── conversations.js — Bengali conversation scenarios + roleplay + quiz ──── */

const CONVERSATIONS = [
  /* ─── 1. দোকানে — At the Shop ─────────────────────────────────────────── */
  {
    id: 'dokane',
    bengaliName: 'দোকানে',
    englishName: 'At the Shop',
    icon: '🛒',
    tags: ['কেনাকাটা', 'Shopping'],
    descBn: 'একটি মুদি দোকানে জিনিসপত্র কেনার কথোপকথন। দাম জিজ্ঞাসা করা ও জিনিস বাছাই করা শিখুন।',
    descEn: 'A conversation about buying groceries at a shop. Learn how to ask prices and choose items.',
    dialogue: [
      { speaker: 'Customer', speakerBn: 'ক্রেতা', lineBn: 'ভাই, এক কেজি চাল কত দাম?', lineEn: 'Brother, how much is one kg of rice?', romanized: 'Bhai, ek keji chal koto dam?' },
      { speaker: 'Shopkeeper', speakerBn: 'দোকানদার', lineBn: 'এক কেজি চাল ষাট টাকা।', lineEn: 'One kg of rice is sixty taka.', romanized: 'Ek keji chal shaat taka.' },
      { speaker: 'Customer', speakerBn: 'ক্রেতা', lineBn: 'আচ্ছা, দুই কেজি দিন। আর ডাল আছে?', lineEn: 'Okay, give me two kg. And do you have lentils?', romanized: 'Accha, dui keji din. Ar dal achhe?' },
      { speaker: 'Shopkeeper', speakerBn: 'দোকানদার', lineBn: 'হ্যাঁ, মসুর ডাল আর মুগ ডাল দুটোই আছে।', lineEn: 'Yes, I have both masoor dal and mung dal.', romanized: 'Hae, mosur dal ar mug dal dutoii achhe.' },
      { speaker: 'Customer', speakerBn: 'ক্রেতা', lineBn: 'এক কেজি মসুর ডাল দিন। সব মিলিয়ে কত হলো?', lineEn: 'Give me one kg of masoor dal. How much is the total?', romanized: 'Ek keji mosur dal din. Sob miliye koto holo?' },
      { speaker: 'Shopkeeper', speakerBn: 'দোকানদার', lineBn: 'মোট দুইশো দশ টাকা। ব্যাগ লাগবে?', lineEn: 'Total is two hundred and ten taka. Do you need a bag?', romanized: 'Mot duisho dosh taka. Bag lagbe?' },
    ],
    roleplay: [
      {
        id: 'dokane-rp1',
        contextBn: 'দোকানদার বলছে: "কী লাগবে ভাই?"',
        contextEn: 'The shopkeeper says: "What do you need, brother?"',
        options: [
          { textBn: 'এক কেজি আলু আর আধা কেজি পেঁয়াজ দিন।', textEn: 'Give me one kg of potatoes and half a kg of onions.', correct: true, feedbackBn: 'দারুণ! আপনি সঠিকভাবে জিনিস চাইতে পারছেন।', feedbackEn: 'Great! You correctly asked for items.' },
          { textBn: 'আমি ডাক্তার দেখতে এসেছি।', textEn: 'I came to see a doctor.', correct: false, feedbackBn: 'এটা দোকানে বলা ঠিক নয়। আপনি কিছু কিনতে চাইছেন।', feedbackEn: 'This is not appropriate at a shop. You want to buy something.' },
          { textBn: 'আমাকে স্কুলে নিয়ে যান।', textEn: 'Take me to school.', correct: false, feedbackBn: 'এটা দোকানে বলার কথা নয়। দোকানে জিনিসপত্র কিনুন।', feedbackEn: 'This is not what you say at a shop. You should buy items here.' },
        ]
      },
      {
        id: 'dokane-rp2',
        contextBn: 'দোকানদার বলছে: "আর কিছু লাগবে?"',
        contextEn: 'The shopkeeper says: "Do you need anything else?"',
        options: [
          { textBn: 'না, এটুকুই। মোট কত হলো?', textEn: 'No, that\'s all. How much is the total?', correct: true, feedbackBn: 'চমৎকার! আপনি দাম জিজ্ঞাসা করতে পারছেন।', feedbackEn: 'Excellent! You can ask for the price correctly.' },
          { textBn: 'হ্যাঁ, এক প্যাকেট লবণ দিন।', textEn: 'Yes, give me one packet of salt.', correct: true, feedbackBn: 'ভালো! আপনি আরও জিনিস চাইতে পারছেন।', feedbackEn: 'Good! You can ask for more items correctly.' },
          { textBn: 'আমি গান শুনতে চাই।', textEn: 'I want to listen to music.', correct: false, feedbackBn: 'এটা কেনাকাটার সাথে সম্পর্কিত নয়।', feedbackEn: 'This is not related to shopping.' },
        ]
      },
      {
        id: 'dokane-rp3',
        contextBn: 'দোকানদার বলছে: "পাঁচশো টাকার ভাংতি আছে?"',
        contextEn: 'The shopkeeper says: "Do you have change for five hundred taka?"',
        options: [
          { textBn: 'হ্যাঁ, এই নিন ভাংতি।', textEn: 'Yes, here is the change.', correct: true, feedbackBn: 'সঠিক! আপনি ভাংতি দিতে পারছেন।', feedbackEn: 'Correct! You can provide change appropriately.' },
          { textBn: 'না ভাই, ছোট নোট নেই। বিকাশে দিব?', textEn: 'No brother, I don\'t have small notes. Shall I pay via bKash?', correct: true, feedbackBn: 'চমৎকার! বিকল্প পেমেন্টের কথা বলা ভালো।', feedbackEn: 'Excellent! Suggesting an alternative payment method is great.' },
          { textBn: 'আমি বাংলা জানি না।', textEn: 'I don\'t know Bengali.', correct: false, feedbackBn: 'এটা প্রশ্নের উত্তর নয়। ভাংতি সম্পর্কে বলুন।', feedbackEn: 'This does not answer the question. Respond about change.' },
        ]
      },
    ],
    quiz: [
      { id: 'dokane-1', prompt: 'What does "দাম" mean?', promptBn: '"দাম" শব্দের অর্থ কী?', options: ['Price', 'Weight', 'Bag', 'Shop'], correct: 0, explanation: '"দাম" (dam) = Price. "কত দাম?" means "How much is the price?"' },
      { id: 'dokane-2', prompt: 'How do you say "one kilogram" in Bengali?', promptBn: 'বাংলায় "one kilogram" কীভাবে বলবেন?', options: ['এক কেজি', 'এক লিটার', 'এক প্যাকেট', 'এক ডজন'], correct: 0, explanation: '"এক কেজি" (ek keji) = one kilogram. "কেজি" is the Bengali form of "kg".' },
      { id: 'dokane-3', prompt: 'What does "ভাংতি" mean?', promptBn: '"ভাংতি" শব্দের অর্থ কী?', options: ['Change (money)', 'Discount', 'Receipt', 'Credit'], correct: 0, explanation: '"ভাংতি" (bhangti) = change (money). Used when you need smaller bills or coins.' },
    ]
  },

  /* ─── 2. রেস্তোরাঁয় — At a Restaurant ────────────────────────────────── */
  {
    id: 'restoranye',
    bengaliName: 'রেস্তোরাঁয়',
    englishName: 'At a Restaurant',
    icon: '🍽️',
    tags: ['খাবার', 'Food'],
    descBn: 'রেস্তোরাঁয় খাবার অর্ডার করার কথোপকথন। মেনু পড়া ও পছন্দের খাবার অর্ডার করা শিখুন।',
    descEn: 'A conversation about ordering food at a restaurant. Learn to read the menu and order your favorite dishes.',
    dialogue: [
      { speaker: 'Waiter', speakerBn: 'ওয়েটার', lineBn: 'স্বাগতম! কয়জন, ভাই?', lineEn: 'Welcome! How many people, brother?', romanized: 'Shagatom! Koyjon, bhai?' },
      { speaker: 'Customer', speakerBn: 'ক্রেতা', lineBn: 'দুইজন। একটা ভালো টেবিল দিন।', lineEn: 'Two people. Give us a nice table.', romanized: 'Duijon. Ekta bhalo table din.' },
      { speaker: 'Waiter', speakerBn: 'ওয়েটার', lineBn: 'এই নিন মেনু। আজকের স্পেশাল হলো কাচ্চি বিরিয়ানি।', lineEn: 'Here is the menu. Today\'s special is kacchi biryani.', romanized: 'Ei nin menu. Ajker special holo kacchi biriyani.' },
      { speaker: 'Customer', speakerBn: 'ক্রেতা', lineBn: 'দুই প্লেট কাচ্চি বিরিয়ানি আর এক গ্লাস বোরহানি দিন।', lineEn: 'Give us two plates of kacchi biryani and one glass of borhani.', romanized: 'Dui plate kacchi biriyani ar ek glass borhani din.' },
      { speaker: 'Waiter', speakerBn: 'ওয়েটার', lineBn: 'ঝাল কম রাখবো নাকি বেশি?', lineEn: 'Should I keep the spice mild or hot?', romanized: 'Jhal kom rakhbo naki beshi?' },
      { speaker: 'Customer', speakerBn: 'ক্রেতা', lineBn: 'মাঝামাঝি রাখেন। আর বিল আলাদা করে দিবেন।', lineEn: 'Keep it medium. And please give us separate bills.', romanized: 'Majhamajhi rakhen. Ar bill alada kore diben.' },
    ],
    roleplay: [
      {
        id: 'restoranye-rp1',
        contextBn: 'ওয়েটার বলছে: "কী খাবেন, ভাই?"',
        contextEn: 'The waiter says: "What will you eat, brother?"',
        options: [
          { textBn: 'একটা চিকেন ফ্রাই আর এক প্লেট ভাত দিন।', textEn: 'Give me one chicken fry and one plate of rice.', correct: true, feedbackBn: 'দারুণ! আপনি সুন্দরভাবে অর্ডার দিতে পারছেন।', feedbackEn: 'Great! You can order nicely.' },
          { textBn: 'আমাকে একটু ঘুমাতে দিন।', textEn: 'Let me sleep for a bit.', correct: false, feedbackBn: 'রেস্তোরাঁয় ঘুমানোর কথা বলা ঠিক নয়। খাবার অর্ডার করুন।', feedbackEn: 'It\'s not appropriate to talk about sleeping at a restaurant. Order food.' },
          { textBn: 'মেনুটা আরেকবার দেখি।', textEn: 'Let me see the menu once more.', correct: true, feedbackBn: 'ভালো! মেনু আবার দেখতে চাওয়া স্বাভাবিক।', feedbackEn: 'Good! It\'s natural to want to see the menu again.' },
        ]
      },
      {
        id: 'restoranye-rp2',
        contextBn: 'ওয়েটার বলছে: "পানীয় কিছু নেবেন?"',
        contextEn: 'The waiter says: "Would you like any drinks?"',
        options: [
          { textBn: 'একটা লেবুর শরবত দিন।', textEn: 'Give me a lemon juice.', correct: true, feedbackBn: 'চমৎকার! আপনি পানীয় অর্ডার করতে পারছেন।', feedbackEn: 'Excellent! You can order a drink properly.' },
          { textBn: 'না, পানি দিলেই হবে।', textEn: 'No, just water will do.', correct: true, feedbackBn: 'ভালো! পানি চাওয়া একটা সঠিক উত্তর।', feedbackEn: 'Good! Asking for water is a valid response.' },
          { textBn: 'আমি বাসে যাবো।', textEn: 'I will go by bus.', correct: false, feedbackBn: 'এটা পানীয়ের সাথে সম্পর্কিত নয়।', feedbackEn: 'This is not related to drinks.' },
        ]
      },
      {
        id: 'restoranye-rp3',
        contextBn: 'ওয়েটার বলছে: "খাবার কেমন হয়েছে?"',
        contextEn: 'The waiter says: "How was the food?"',
        options: [
          { textBn: 'খুবই ভালো হয়েছে। বিল দিন।', textEn: 'It was very good. Give me the bill.', correct: true, feedbackBn: 'দারুণ! আপনি প্রশংসা করে বিল চাইতে পারছেন।', feedbackEn: 'Great! You can compliment the food and ask for the bill.' },
          { textBn: 'ঝাল একটু বেশি ছিল, তবে স্বাদ ভালো।', textEn: 'The spice was a bit much, but the taste was good.', correct: true, feedbackBn: 'ভালো! গঠনমূলক মতামত দিতে পারছেন।', feedbackEn: 'Good! You can give constructive feedback.' },
          { textBn: 'আমি গতকাল ঢাকা গিয়েছিলাম।', textEn: 'I went to Dhaka yesterday.', correct: false, feedbackBn: 'এটা খাবার সম্পর্কে কোনো মতামত নয়।', feedbackEn: 'This is not feedback about the food.' },
        ]
      },
    ],
    quiz: [
      { id: 'restoranye-1', prompt: 'What does "ঝাল" mean?', promptBn: '"ঝাল" শব্দের অর্থ কী?', options: ['Spicy', 'Sweet', 'Sour', 'Bitter'], correct: 0, explanation: '"ঝাল" (jhal) = Spicy. "ঝাল কম" means "less spicy".' },
      { id: 'restoranye-2', prompt: 'What is "বিল" in a restaurant context?', promptBn: 'রেস্তোরাঁয় "বিল" বলতে কী বোঝায়?', options: ['Bill/Check', 'Menu', 'Table', 'Plate'], correct: 0, explanation: '"বিল" (bil) = Bill or check. "বিল দিন" means "give me the bill".' },
      { id: 'restoranye-3', prompt: 'What does "বোরহানি" refer to?', promptBn: '"বোরহানি" কী?', options: ['A yogurt-based spicy drink', 'A type of curry', 'A dessert', 'A type of bread'], correct: 0, explanation: '"বোরহানি" (borhani) = a traditional yogurt-based spicy drink, popular in Bangladesh with biryani.' },
    ]
  },

  /* ─── 3. পরিচয় — Meeting Someone ──────────────────────────────────────── */
  {
    id: 'porichoy',
    bengaliName: 'পরিচয়',
    englishName: 'Meeting Someone',
    icon: '🤝',
    tags: ['পরিচয়', 'Introduction'],
    descBn: 'নতুন কারো সাথে পরিচয় হওয়ার কথোপকথন। নিজের সম্পর্কে বলা ও প্রশ্ন করা শিখুন।',
    descEn: 'A conversation about meeting someone new. Learn to introduce yourself and ask questions.',
    dialogue: [
      { speaker: 'Rahim', speakerBn: 'রহিম', lineBn: 'আসসালামু আলাইকুম। আমার নাম রহিম। আপনার নাম কী?', lineEn: 'Peace be upon you. My name is Rahim. What is your name?', romanized: 'Assalamu alaikum. Amar nam Rahim. Apnar nam ki?' },
      { speaker: 'Karim', speakerBn: 'করিম', lineBn: 'ওয়ালাইকুম আসসালাম। আমি করিম। আপনি কোথা থেকে এসেছেন?', lineEn: 'Peace be upon you too. I am Karim. Where are you from?', romanized: 'Walaikum assalam. Ami Karim. Apni kotha theke eshechhen?' },
      { speaker: 'Rahim', speakerBn: 'রহিম', lineBn: 'আমি ঢাকা থেকে এসেছি। আপনি কী করেন?', lineEn: 'I am from Dhaka. What do you do?', romanized: 'Ami Dhaka theke eshechi. Apni ki koren?' },
      { speaker: 'Karim', speakerBn: 'করিম', lineBn: 'আমি শিক্ষক। একটা স্কুলে পড়াই। আপনি?', lineEn: 'I am a teacher. I teach at a school. And you?', romanized: 'Ami shikkhok. Ekta schoole porai. Apni?' },
      { speaker: 'Rahim', speakerBn: 'রহিম', lineBn: 'আমি ইঞ্জিনিয়ার। আপনার সাথে পরিচয় হয়ে ভালো লাগলো।', lineEn: 'I am an engineer. Nice to meet you.', romanized: 'Ami engineer. Apnar shathe porichoy hoye bhalo laglo.' },
      { speaker: 'Karim', speakerBn: 'করিম', lineBn: 'আমারও খুব ভালো লাগলো। আবার দেখা হবে, ইনশাআল্লাহ।', lineEn: 'I am also very pleased. See you again, God willing.', romanized: 'Amaro khub bhalo laglo. Abar dekha hobe, Insha\'Allah.' },
    ],
    roleplay: [
      {
        id: 'porichoy-rp1',
        contextBn: 'নতুন মানুষ বলছে: "আপনার নাম কী?"',
        contextEn: 'A new person says: "What is your name?"',
        options: [
          { textBn: 'আমার নাম সুমন। আপনার সাথে পরিচয় হয়ে খুশি হলাম।', textEn: 'My name is Sumon. Pleased to meet you.', correct: true, feedbackBn: 'দারুণ! আপনি সুন্দরভাবে নিজের পরিচয় দিতে পারছেন।', feedbackEn: 'Great! You can introduce yourself nicely.' },
          { textBn: 'দুটো চা দিন।', textEn: 'Give me two cups of tea.', correct: false, feedbackBn: 'এটা পরিচয়ের উত্তর নয়। নিজের নাম বলুন।', feedbackEn: 'This is not a response to an introduction. Tell your name.' },
          { textBn: 'বাসটা কখন ছাড়বে?', textEn: 'When will the bus leave?', correct: false, feedbackBn: 'এটা পরিচয়ের প্রসঙ্গে ঠিক নয়।', feedbackEn: 'This is not relevant to an introduction.' },
        ]
      },
      {
        id: 'porichoy-rp2',
        contextBn: 'নতুন মানুষ বলছে: "আপনি কী করেন?"',
        contextEn: 'The new person says: "What do you do?"',
        options: [
          { textBn: 'আমি ছাত্র। বিশ্ববিদ্যালয়ে পড়ি।', textEn: 'I am a student. I study at a university.', correct: true, feedbackBn: 'চমৎকার! আপনি পেশা সম্পর্কে বলতে পারছেন।', feedbackEn: 'Excellent! You can talk about your occupation.' },
          { textBn: 'আমি একটা কোম্পানিতে চাকরি করি।', textEn: 'I work at a company.', correct: true, feedbackBn: 'ভালো! এটা একটা সঠিক উত্তর।', feedbackEn: 'Good! This is a correct response.' },
          { textBn: 'আজকের আবহাওয়া খুব গরম।', textEn: 'Today\'s weather is very hot.', correct: false, feedbackBn: 'এটা পেশা সম্পর্কে উত্তর নয়।', feedbackEn: 'This is not an answer about your occupation.' },
        ]
      },
      {
        id: 'porichoy-rp3',
        contextBn: 'নতুন মানুষ বলছে: "আপনি কোথায় থাকেন?"',
        contextEn: 'The new person says: "Where do you live?"',
        options: [
          { textBn: 'আমি মিরপুরে থাকি।', textEn: 'I live in Mirpur.', correct: true, feedbackBn: 'দারুণ! আপনি ঠিকানা বলতে পারছেন।', feedbackEn: 'Great! You can state your address.' },
          { textBn: 'আমি বাংলাদেশি।', textEn: 'I am Bangladeshi.', correct: false, feedbackBn: 'এটা দেশ বলছে, কিন্তু প্রশ্ন ছিল কোথায় থাকেন।', feedbackEn: 'This states nationality, but the question asked where you live.' },
          { textBn: 'আমি ভাত খেতে ভালোবাসি।', textEn: 'I love to eat rice.', correct: false, feedbackBn: 'এটা ঠিকানা সম্পর্কে উত্তর নয়।', feedbackEn: 'This is not an answer about where you live.' },
        ]
      },
    ],
    quiz: [
      { id: 'porichoy-1', prompt: 'What does "পরিচয়" mean?', promptBn: '"পরিচয়" শব্দের অর্থ কী?', options: ['Introduction', 'Goodbye', 'Thank you', 'Sorry'], correct: 0, explanation: '"পরিচয়" (porichoy) = Introduction. "পরিচয় হওয়া" means "to get acquainted".' },
      { id: 'porichoy-2', prompt: 'How do you ask "What is your name?" in Bengali?', promptBn: '"What is your name?" বাংলায় কীভাবে জিজ্ঞেস করবেন?', options: ['আপনার নাম কী?', 'আপনি কোথায় যাবেন?', 'আপনি কী খাবেন?', 'আপনি কেমন আছেন?'], correct: 0, explanation: '"আপনার নাম কী?" (Apnar nam ki?) = What is your name? "নাম" means "name".' },
      { id: 'porichoy-3', prompt: 'What does "ভালো লাগলো" express?', promptBn: '"ভালো লাগলো" কী প্রকাশ করে?', options: ['It felt good / I liked it', 'I am hungry', 'I am sorry', 'I am angry'], correct: 0, explanation: '"ভালো লাগলো" (bhalo laglo) = It felt good / I liked it. Used to express pleasure.' },
    ]
  },

  /* ─── 4. রাস্তা জিজ্ঞাসা — Asking Directions ─────────────────────────── */
  {
    id: 'rasta-jiggasa',
    bengaliName: 'রাস্তা জিজ্ঞাসা',
    englishName: 'Asking Directions',
    icon: '🗺️',
    tags: ['দিকনির্দেশনা', 'Directions'],
    descBn: 'রাস্তায় কাউকে দিক জিজ্ঞেস করার কথোপকথন। পথ চেনা ও দিকনির্দেশনা বোঝা শিখুন।',
    descEn: 'A conversation about asking someone for directions on the street. Learn to find your way and understand directions.',
    dialogue: [
      { speaker: 'Traveler', speakerBn: 'পথিক', lineBn: 'ভাই, একটু বলবেন শাহবাগ কোন দিকে?', lineEn: 'Brother, could you tell me which way is Shahbag?', romanized: 'Bhai, ektu bolben Shahbag kon dike?' },
      { speaker: 'Local', speakerBn: 'স্থানীয়', lineBn: 'এই রাস্তা ধরে সোজা যান, তারপর ডানে ঘুরুন।', lineEn: 'Go straight along this road, then turn right.', romanized: 'Ei rasta dhore soja jan, tarpor dane ghurun.' },
      { speaker: 'Traveler', speakerBn: 'পথিক', lineBn: 'কতদূর হবে এখান থেকে? হেঁটে যাওয়া যাবে?', lineEn: 'How far is it from here? Can I walk there?', romanized: 'Kotodur hobe ekhan theke? Hete jaowa jabe?' },
      { speaker: 'Local', speakerBn: 'স্থানীয়', lineBn: 'প্রায় দশ মিনিট লাগবে হাঁটলে। রিকশাতেও যেতে পারেন।', lineEn: 'It will take about ten minutes walking. You can also go by rickshaw.', romanized: 'Pray dosh minute lagbe hatle. Rikshateo jete paren.' },
      { speaker: 'Traveler', speakerBn: 'পথিক', lineBn: 'সিগন্যালের কাছে কি একটা মসজিদ আছে?', lineEn: 'Is there a mosque near the signal?', romanized: 'Signaler kachhe ki ekta mosjid achhe?' },
      { speaker: 'Local', speakerBn: 'স্থানীয়', lineBn: 'হ্যাঁ, মসজিদের পরেই শাহবাগ মোড়। মিস হবে না।', lineEn: 'Yes, Shahbag intersection is right after the mosque. You won\'t miss it.', romanized: 'Hae, moshjider porei Shahbag mor. Miss hobe na.' },
    ],
    roleplay: [
      {
        id: 'rasta-jiggasa-rp1',
        contextBn: 'আপনি হারিয়ে গেছেন। একজনকে জিজ্ঞেস করতে চান।',
        contextEn: 'You are lost. You want to ask someone for directions.',
        options: [
          { textBn: 'ভাই, একটু সাহায্য করবেন? ঢাকা মেডিকেল কোন দিকে?', textEn: 'Brother, can you help? Which way is Dhaka Medical?', correct: true, feedbackBn: 'দারুণ! আপনি ভদ্রভাবে দিক জিজ্ঞাসা করতে পারছেন।', feedbackEn: 'Great! You can politely ask for directions.' },
          { textBn: 'এখান থেকে চলে যান!', textEn: 'Go away from here!', correct: false, feedbackBn: 'এটা অভদ্র এবং দিক জিজ্ঞাসা নয়।', feedbackEn: 'This is rude and not asking for directions.' },
          { textBn: 'আমি খুব ক্লান্ত।', textEn: 'I am very tired.', correct: false, feedbackBn: 'এটা দিক জিজ্ঞাসা নয়। আপনাকে পথ জিজ্ঞেস করতে হবে।', feedbackEn: 'This is not asking for directions. You need to ask for the way.' },
        ]
      },
      {
        id: 'rasta-jiggasa-rp2',
        contextBn: 'স্থানীয় বলছে: "বামে ঘুরুন, তারপর সোজা যান।"',
        contextEn: 'The local says: "Turn left, then go straight."',
        options: [
          { textBn: 'বামে ঘুরে কতদূর সোজা যেতে হবে?', textEn: 'After turning left, how far straight do I go?', correct: true, feedbackBn: 'ভালো! আপনি আরও বিস্তারিত জানতে চাইছেন।', feedbackEn: 'Good! You are asking for more detail.' },
          { textBn: 'ধন্যবাদ, ভাই।', textEn: 'Thank you, brother.', correct: true, feedbackBn: 'ভালো! ধন্যবাদ দেওয়া সবসময় ভালো।', feedbackEn: 'Good! Saying thank you is always nice.' },
          { textBn: 'আমি সাঁতার কাটতে পারি।', textEn: 'I can swim.', correct: false, feedbackBn: 'এটা দিকনির্দেশনার সাথে সম্পর্কিত নয়।', feedbackEn: 'This is not related to directions.' },
        ]
      },
      {
        id: 'rasta-jiggasa-rp3',
        contextBn: 'আপনি গন্তব্যে পৌঁছে গেছেন। যিনি সাহায্য করেছেন তাঁকে কী বলবেন?',
        contextEn: 'You have reached your destination. What do you say to the person who helped?',
        options: [
          { textBn: 'অনেক ধন্যবাদ, ভাই। আপনার সাহায্য ছাড়া পারতাম না।', textEn: 'Thank you so much, brother. I could not have done it without your help.', correct: true, feedbackBn: 'চমৎকার! কৃতজ্ঞতা প্রকাশ করা খুব ভালো।', feedbackEn: 'Excellent! Expressing gratitude is very good.' },
          { textBn: 'এই জায়গাটা আমার পছন্দ না।', textEn: 'I don\'t like this place.', correct: false, feedbackBn: 'এটা ধন্যবাদ জানানো নয়।', feedbackEn: 'This is not expressing gratitude.' },
          { textBn: 'আমি ক্ষুধার্ত।', textEn: 'I am hungry.', correct: false, feedbackBn: 'এটা কৃতজ্ঞতার উত্তর নয়।', feedbackEn: 'This is not a grateful response.' },
        ]
      },
    ],
    quiz: [
      { id: 'rasta-jiggasa-1', prompt: 'What does "ডানে" mean?', promptBn: '"ডানে" শব্দের অর্থ কী?', options: ['Right (direction)', 'Left', 'Straight', 'Behind'], correct: 0, explanation: '"ডানে" (dane) = Right. "ডানে ঘুরুন" means "turn right".' },
      { id: 'rasta-jiggasa-2', prompt: 'What does "সোজা" mean in the context of directions?', promptBn: 'দিকনির্দেশনায় "সোজা" মানে কী?', options: ['Straight', 'Curved', 'Narrow', 'Wide'], correct: 0, explanation: '"সোজা" (soja) = Straight. "সোজা যান" means "go straight".' },
      { id: 'rasta-jiggasa-3', prompt: 'What does "মোড়" mean?', promptBn: '"মোড়" শব্দের অর্থ কী?', options: ['Intersection/Turn', 'Bridge', 'Market', 'Park'], correct: 0, explanation: '"মোড়" (mor) = Intersection or turn. A common landmark reference in Bangladesh.' },
    ]
  },

  /* ─── 5. ডাক্তারের কাছে — At the Doctor ───────────────────────────────── */
  {
    id: 'daktarer-kachhe',
    bengaliName: 'ডাক্তারের কাছে',
    englishName: 'At the Doctor',
    icon: '🏥',
    tags: ['স্বাস্থ্য', 'Health'],
    descBn: 'ডাক্তারের চেম্বারে রোগের লক্ষণ বলা ও পরামর্শ নেওয়ার কথোপকথন। শারীরিক সমস্যা বর্ণনা করা শিখুন।',
    descEn: 'A conversation about describing symptoms and getting advice at the doctor\'s office. Learn to describe health issues.',
    dialogue: [
      { speaker: 'Doctor', speakerBn: 'ডাক্তার', lineBn: 'আসুন, বসুন। কী সমস্যা বলুন।', lineEn: 'Come in, sit down. Tell me what the problem is.', romanized: 'Ashun, boshun. Ki shomossa bolun.' },
      { speaker: 'Patient', speakerBn: 'রোগী', lineBn: 'ডাক্তার সাহেব, তিনদিন ধরে জ্বর আর মাথা ব্যথা।', lineEn: 'Doctor, I\'ve had a fever and headache for three days.', romanized: 'Daktar shaheb, tindin dhore jor ar matha byatha.' },
      { speaker: 'Doctor', speakerBn: 'ডাক্তার', lineBn: 'সর্দি-কাশি আছে? গলা ব্যথা করে?', lineEn: 'Do you have a cold or cough? Does your throat hurt?', romanized: 'Shordi-kashi achhe? Gola byatha kore?' },
      { speaker: 'Patient', speakerBn: 'রোগী', lineBn: 'হ্যাঁ, সর্দি আছে। আর শরীরটা খুব ম্যাজম্যাজ করছে।', lineEn: 'Yes, I have a cold. And my body feels very achy.', romanized: 'Hae, shordi achhe. Ar shorirta khub myajmyaj korchhe.' },
      { speaker: 'Doctor', speakerBn: 'ডাক্তার', lineBn: 'ঠিক আছে। ওষুধ লিখে দিচ্ছি। দিনে তিনবার খাবেন, খাওয়ার পরে।', lineEn: 'Okay. I am prescribing medicine. Take it three times a day, after meals.', romanized: 'Thik achhe. Oshudh likhe dichhi. Dine tinbar khaben, khawar pore.' },
      { speaker: 'Patient', speakerBn: 'রোগী', lineBn: 'ধন্যবাদ, ডাক্তার সাহেব। কতদিন ওষুধ খেতে হবে?', lineEn: 'Thank you, Doctor. How many days do I need to take the medicine?', romanized: 'Dhonnobad, Daktar shaheb. Kotodin oshudh khete hobe?' },
    ],
    roleplay: [
      {
        id: 'daktarer-kachhe-rp1',
        contextBn: 'ডাক্তার বলছে: "কী সমস্যা?"',
        contextEn: 'The doctor says: "What is the problem?"',
        options: [
          { textBn: 'আমার পেটে খুব ব্যথা করছে কাল রাত থেকে।', textEn: 'I have had a bad stomachache since last night.', correct: true, feedbackBn: 'দারুণ! আপনি সমস্যা বর্ণনা করতে পারছেন।', feedbackEn: 'Great! You can describe your problem well.' },
          { textBn: 'আমি চিনি কিনতে এসেছি।', textEn: 'I came to buy sugar.', correct: false, feedbackBn: 'এটা ডাক্তারের কাছে বলার কথা নয়।', feedbackEn: 'This is not something you say at the doctor\'s.' },
          { textBn: 'আজকের আবহাওয়া কেমন?', textEn: 'How is today\'s weather?', correct: false, feedbackBn: 'ডাক্তারকে শারীরিক সমস্যার কথা বলুন।', feedbackEn: 'Tell the doctor about your health issue.' },
        ]
      },
      {
        id: 'daktarer-kachhe-rp2',
        contextBn: 'ডাক্তার বলছে: "কবে থেকে এই সমস্যা?"',
        contextEn: 'The doctor says: "Since when have you had this problem?"',
        options: [
          { textBn: 'গতকাল সকাল থেকে শুরু হয়েছে।', textEn: 'It started since yesterday morning.', correct: true, feedbackBn: 'ভালো! আপনি সময়কাল বলতে পারছেন।', feedbackEn: 'Good! You can state the duration properly.' },
          { textBn: 'প্রায় এক সপ্তাহ ধরে।', textEn: 'For about a week.', correct: true, feedbackBn: 'চমৎকার! সময়কাল জানানো সঠিক।', feedbackEn: 'Excellent! Stating the duration is correct.' },
          { textBn: 'আমি গতকাল সিনেমা দেখেছি।', textEn: 'I watched a movie yesterday.', correct: false, feedbackBn: 'এটা সমস্যার সময়কাল নয়।', feedbackEn: 'This is not about the duration of the problem.' },
        ]
      },
      {
        id: 'daktarer-kachhe-rp3',
        contextBn: 'ডাক্তার বলছে: "এই ওষুধ সকালে ও রাতে খাবেন।"',
        contextEn: 'The doctor says: "Take this medicine in the morning and at night."',
        options: [
          { textBn: 'জ্বী, বুঝেছি। খাওয়ার আগে না পরে খাবো?', textEn: 'Yes, understood. Should I take it before or after eating?', correct: true, feedbackBn: 'দারুণ! আপনি সঠিক প্রশ্ন করছেন।', feedbackEn: 'Great! You are asking the right question.' },
          { textBn: 'ধন্যবাদ, ডাক্তার সাহেব।', textEn: 'Thank you, Doctor.', correct: true, feedbackBn: 'ভালো! ডাক্তারকে ধন্যবাদ দেওয়া উচিত।', feedbackEn: 'Good! It is proper to thank the doctor.' },
          { textBn: 'আমি ওষুধ খেতে চাই না।', textEn: 'I don\'t want to take medicine.', correct: false, feedbackBn: 'ডাক্তারের পরামর্শ মানা উচিত।', feedbackEn: 'You should follow the doctor\'s advice.' },
        ]
      },
    ],
    quiz: [
      { id: 'daktarer-kachhe-1', prompt: 'What does "জ্বর" mean?', promptBn: '"জ্বর" শব্দের অর্থ কী?', options: ['Fever', 'Cough', 'Pain', 'Cold'], correct: 0, explanation: '"জ্বর" (jor) = Fever. "জ্বর আছে" means "I have a fever".' },
      { id: 'daktarer-kachhe-2', prompt: 'What does "ওষুধ" mean?', promptBn: '"ওষুধ" শব্দের অর্থ কী?', options: ['Medicine', 'Food', 'Water', 'Exercise'], correct: 0, explanation: '"ওষুধ" (oshudh) = Medicine. "ওষুধ খান" means "take medicine".' },
      { id: 'daktarer-kachhe-3', prompt: 'How do you say "headache" in Bengali?', promptBn: 'বাংলায় "headache" কীভাবে বলবেন?', options: ['মাথা ব্যথা', 'পেট ব্যথা', 'গলা ব্যথা', 'বুক ব্যথা'], correct: 0, explanation: '"মাথা ব্যথা" (matha byatha) = Headache. "মাথা" means "head" and "ব্যথা" means "pain".' },
    ]
  },

  /* ─── 6. ফোনে কথা — Phone Call ─────────────────────────────────────────── */
  {
    id: 'phone-kotha',
    bengaliName: 'ফোনে কথা',
    englishName: 'Phone Call',
    icon: '📱',
    tags: ['যোগাযোগ', 'Communication'],
    descBn: 'ফোনে কথা বলার কথোপকথন। ফোনে কীভাবে কথা শুরু করা ও শেষ করা যায় তা শিখুন।',
    descEn: 'A conversation on the phone. Learn how to start and end a phone conversation.',
    dialogue: [
      { speaker: 'Caller', speakerBn: 'কলকারী', lineBn: 'হ্যালো, আসসালামু আলাইকুম। রফিক ভাই আছেন?', lineEn: 'Hello, peace be upon you. Is Rafiq brother there?', romanized: 'Hello, assalamu alaikum. Rofiq bhai achhen?' },
      { speaker: 'Receiver', speakerBn: 'রিসিভার', lineBn: 'ওয়ালাইকুম আসসালাম। জ্বী, আমিই রফিক বলছি।', lineEn: 'Peace be upon you too. Yes, this is Rafiq speaking.', romanized: 'Walaikum assalam. Ji, amii Rofiq bolchi.' },
      { speaker: 'Caller', speakerBn: 'কলকারী', lineBn: 'ভাই, কাল কি আপনার সময় হবে? একটু দেখা করতে চাই।', lineEn: 'Brother, will you be free tomorrow? I want to meet you.', romanized: 'Bhai, kal ki apnar shomoy hobe? Ektu dekha korte chai.' },
      { speaker: 'Receiver', speakerBn: 'রিসিভার', lineBn: 'কাল বিকেলে পারবো। কটার দিকে আসবেন?', lineEn: 'I can do tomorrow afternoon. What time will you come?', romanized: 'Kal bikele parbo. Kotar dike ashben?' },
      { speaker: 'Caller', speakerBn: 'কলকারী', lineBn: 'চারটার দিকে আসবো। আপনার অফিসে?', lineEn: 'I\'ll come around four. At your office?', romanized: 'Chartar dike ashbo. Apnar office-e?' },
      { speaker: 'Receiver', speakerBn: 'রিসিভার', lineBn: 'হ্যাঁ, অফিসে আসুন। তাহলে কাল দেখা হবে। আল্লাহ হাফেজ।', lineEn: 'Yes, come to the office. See you tomorrow then. Goodbye.', romanized: 'Hae, office-e ashun. Tahole kal dekha hobe. Allah hafez.' },
    ],
    roleplay: [
      {
        id: 'phone-kotha-rp1',
        contextBn: 'ফোন রিসিভ করে কেউ বলছে: "হ্যালো, কে বলছেন?"',
        contextEn: 'Someone answers the phone: "Hello, who is speaking?"',
        options: [
          { textBn: 'আমি সাকিব বলছি। তানিয়া আপা কি আছেন?', textEn: 'This is Sakib speaking. Is Tania apa there?', correct: true, feedbackBn: 'দারুণ! আপনি সুন্দরভাবে নিজের পরিচয় দিতে পারছেন।', feedbackEn: 'Great! You can introduce yourself on the phone properly.' },
          { textBn: 'আমি কিছু বলবো না।', textEn: 'I won\'t say anything.', correct: false, feedbackBn: 'ফোনে কথা বলতে হলে নিজের পরিচয় দিতে হবে।', feedbackEn: 'You need to introduce yourself when speaking on the phone.' },
          { textBn: 'পিজ্জা অর্ডার করতে চাই।', textEn: 'I want to order pizza.', correct: false, feedbackBn: 'এটা ব্যক্তিগত ফোন কলে প্রাসঙ্গিক নয়।', feedbackEn: 'This is not relevant to a personal phone call.' },
        ]
      },
      {
        id: 'phone-kotha-rp2',
        contextBn: 'অপর প্রান্ত থেকে বলছে: "উনি এখন বাসায় নেই।"',
        contextEn: 'The other end says: "They are not home right now."',
        options: [
          { textBn: 'আচ্ছা, উনি ফিরলে বলবেন আমি ফোন করেছিলাম?', textEn: 'Okay, could you tell them I called when they return?', correct: true, feedbackBn: 'চমৎকার! আপনি ভদ্রভাবে মেসেজ রাখতে পারছেন।', feedbackEn: 'Excellent! You can politely leave a message.' },
          { textBn: 'ঠিক আছে, আমি পরে আবার ফোন করবো।', textEn: 'Okay, I will call again later.', correct: true, feedbackBn: 'ভালো! পরে ফোন করার কথা বলা সঠিক।', feedbackEn: 'Good! Saying you will call back is appropriate.' },
          { textBn: 'তাহলে আমি এখন ঘুমাবো।', textEn: 'Then I will sleep now.', correct: false, feedbackBn: 'এটা ফোনে বলা প্রাসঙ্গিক নয়।', feedbackEn: 'This is not relevant to say on the phone.' },
        ]
      },
      {
        id: 'phone-kotha-rp3',
        contextBn: 'ফোনে কথা শেষ। আপনি কীভাবে বিদায় নেবেন?',
        contextEn: 'The phone conversation is ending. How do you say goodbye?',
        options: [
          { textBn: 'আচ্ছা ভাই, রাখি তাহলে। আল্লাহ হাফেজ।', textEn: 'Okay brother, I\'ll hang up then. Goodbye.', correct: true, feedbackBn: 'দারুণ! আপনি ভদ্রভাবে ফোন রাখতে পারছেন।', feedbackEn: 'Great! You can hang up the phone politely.' },
          { textBn: 'খোদা হাফেজ, ভালো থাকবেন।', textEn: 'Goodbye, take care.', correct: true, feedbackBn: 'চমৎকার! শুভেচ্ছা জানিয়ে বিদায় নেওয়া ভালো।', feedbackEn: 'Excellent! Saying goodbye with good wishes is nice.' },
          { textBn: 'আমি ফোন ভেঙে দিচ্ছি।', textEn: 'I am breaking the phone.', correct: false, feedbackBn: '"ফোন ভাঙা" মানে ফোন নষ্ট করা। "ফোন রাখা" বলুন।', feedbackEn: '"ফোন ভাঙা" means breaking the phone. Say "ফোন রাখা" (hang up) instead.' },
        ]
      },
    ],
    quiz: [
      { id: 'phone-kotha-1', prompt: 'How do you say "Who is speaking?" on the phone in Bengali?', promptBn: 'ফোনে "Who is speaking?" বাংলায় কীভাবে বলবেন?', options: ['কে বলছেন?', 'কোথায় যাচ্ছেন?', 'কী খাচ্ছেন?', 'কে আসছে?'], correct: 0, explanation: '"কে বলছেন?" (ke bolchhen?) = Who is speaking? Standard phone greeting in Bengali.' },
      { id: 'phone-kotha-2', prompt: 'What does "সময় হবে" mean?', promptBn: '"সময় হবে" মানে কী?', options: ['Will have time / Will be free', 'Time is over', 'It is late', 'Time to eat'], correct: 0, explanation: '"সময় হবে" (shomoy hobe) = Will have time / Will be free. Used when asking about availability.' },
      { id: 'phone-kotha-3', prompt: 'What is "আল্লাহ হাফেজ" used for?', promptBn: '"আল্লাহ হাফেজ" কখন ব্যবহার করা হয়?', options: ['Saying goodbye', 'Saying hello', 'Saying sorry', 'Saying thanks'], correct: 0, explanation: '"আল্লাহ হাফেজ" (Allah hafez) = Goodbye (May God protect you). Common farewell in Bangladesh.' },
    ]
  },

  /* ─── 7. স্কুলে — At School ────────────────────────────────────────────── */
  {
    id: 'schoole',
    bengaliName: 'স্কুলে',
    englishName: 'At School',
    icon: '🏫',
    tags: ['শিক্ষা', 'Education'],
    descBn: 'স্কুলে শিক্ষক ও ছাত্রের মধ্যে কথোপকথন। ক্লাসে প্রশ্ন করা ও পড়ালেখা সম্পর্কে কথা বলা শিখুন।',
    descEn: 'A conversation between a teacher and student at school. Learn to ask questions in class and talk about studies.',
    dialogue: [
      { speaker: 'Teacher', speakerBn: 'শিক্ষক', lineBn: 'সবাই বই খোলো। আজকে আমরা ইতিহাস পড়বো।', lineEn: 'Everyone open your books. Today we will study history.', romanized: 'Shobai boi kholo. Ajke amra itihas porbo.' },
      { speaker: 'Student', speakerBn: 'ছাত্র', lineBn: 'স্যার, কত পৃষ্ঠায় খুলবো?', lineEn: 'Sir, which page should we open to?', romanized: 'Sir, koto prishtay khulbo?' },
      { speaker: 'Teacher', speakerBn: 'শিক্ষক', lineBn: 'পঁচিশ পৃষ্ঠা খোলো। মুক্তিযুদ্ধের অধ্যায়।', lineEn: 'Open page twenty-five. The chapter on the Liberation War.', romanized: 'Pochish prishtha kholo. Muktijuddher odhyay.' },
      { speaker: 'Student', speakerBn: 'ছাত্র', lineBn: 'স্যার, মুক্তিযুদ্ধ কত সালে হয়েছিল?', lineEn: 'Sir, in which year did the Liberation War happen?', romanized: 'Sir, Muktijuddho koto shale hoyechhilo?' },
      { speaker: 'Teacher', speakerBn: 'শিক্ষক', lineBn: 'উনিশশো একাত্তর সালে। এটা আমাদের ইতিহাসের সবচেয়ে গুরুত্বপূর্ণ ঘটনা।', lineEn: 'In nineteen seventy-one. This is the most important event in our history.', romanized: 'Unishsho ekattor shale. Eta amader itihaser shobcheye gurutpurno ghotona.' },
      { speaker: 'Student', speakerBn: 'ছাত্র', lineBn: 'স্যার, এটা কি পরীক্ষায় আসবে?', lineEn: 'Sir, will this come in the exam?', romanized: 'Sir, eta ki porikkhay ashbe?' },
    ],
    roleplay: [
      {
        id: 'schoole-rp1',
        contextBn: 'শিক্ষক বলছে: "তোমার হোমওয়ার্ক কোথায়?"',
        contextEn: 'The teacher says: "Where is your homework?"',
        options: [
          { textBn: 'স্যার, দুঃখিত। আজ আনতে ভুলে গেছি। কাল অবশ্যই দেবো।', textEn: 'Sir, I am sorry. I forgot to bring it today. I will definitely give it tomorrow.', correct: true, feedbackBn: 'ভালো! আপনি ভদ্রভাবে ভুল স্বীকার করতে পারছেন।', feedbackEn: 'Good! You can politely admit your mistake.' },
          { textBn: 'এই নিন, স্যার। গতকালই করেছি।', textEn: 'Here you go, sir. I did it yesterday.', correct: true, feedbackBn: 'চমৎকার! হোমওয়ার্ক জমা দেওয়া সঠিক।', feedbackEn: 'Excellent! Submitting homework is correct.' },
          { textBn: 'আমি হোমওয়ার্ক করবো না।', textEn: 'I will not do homework.', correct: false, feedbackBn: 'এটা শিক্ষককে বলা অভদ্র। হোমওয়ার্ক করা উচিত।', feedbackEn: 'This is rude to say to a teacher. You should do homework.' },
        ]
      },
      {
        id: 'schoole-rp2',
        contextBn: 'শিক্ষক বলছে: "কারো কি কোনো প্রশ্ন আছে?"',
        contextEn: 'The teacher says: "Does anyone have any questions?"',
        options: [
          { textBn: 'স্যার, এই অংশটা আরেকবার বুঝিয়ে দিন।', textEn: 'Sir, please explain this part once more.', correct: true, feedbackBn: 'দারুণ! ক্লাসে প্রশ্ন করা ভালো অভ্যাস।', feedbackEn: 'Great! Asking questions in class is a good habit.' },
          { textBn: 'আমি বাড়ি যেতে চাই।', textEn: 'I want to go home.', correct: false, feedbackBn: 'এটা ক্লাসে বলা ঠিক নয়।', feedbackEn: 'This is not appropriate to say in class.' },
          { textBn: 'স্যার, পরীক্ষার তারিখ কবে?', textEn: 'Sir, when is the exam date?', correct: true, feedbackBn: 'ভালো! পরীক্ষার তারিখ জানতে চাওয়া সঠিক।', feedbackEn: 'Good! Asking about exam dates is appropriate.' },
        ]
      },
      {
        id: 'schoole-rp3',
        contextBn: 'শিক্ষক বলছে: "এই বিষয়ে একটা রচনা লেখো।"',
        contextEn: 'The teacher says: "Write an essay on this topic."',
        options: [
          { textBn: 'স্যার, কত শব্দের মধ্যে লিখতে হবে?', textEn: 'Sir, how many words should it be within?', correct: true, feedbackBn: 'চমৎকার! আপনি সঠিক প্রশ্ন করছেন।', feedbackEn: 'Excellent! You are asking the right question.' },
          { textBn: 'স্যার, কবে জমা দিতে হবে?', textEn: 'Sir, when do I need to submit it?', correct: true, feedbackBn: 'ভালো! জমা দেওয়ার তারিখ জানা জরুরি।', feedbackEn: 'Good! Knowing the submission date is important.' },
          { textBn: 'আমি লিখতে পারি না।', textEn: 'I cannot write.', correct: false, feedbackBn: 'চেষ্টা করুন। শিক্ষকের কাছে সাহায্য চাইতে পারেন।', feedbackEn: 'Try your best. You can ask the teacher for help.' },
        ]
      },
    ],
    quiz: [
      { id: 'schoole-1', prompt: 'What does "পরীক্ষা" mean?', promptBn: '"পরীক্ষা" শব্দের অর্থ কী?', options: ['Exam', 'Homework', 'Lesson', 'Book'], correct: 0, explanation: '"পরীক্ষা" (porikkha) = Exam. "পরীক্ষা দেওয়া" means "to take an exam".' },
      { id: 'schoole-2', prompt: 'What does "পৃষ্ঠা" mean?', promptBn: '"পৃষ্ঠা" শব্দের অর্থ কী?', options: ['Page', 'Chapter', 'Line', 'Paragraph'], correct: 0, explanation: '"পৃষ্ঠা" (prishtha) = Page. "কত পৃষ্ঠা?" means "which page?"' },
      { id: 'schoole-3', prompt: 'How do you say "open the book" in Bengali?', promptBn: 'বাংলায় "open the book" কীভাবে বলবেন?', options: ['বই খোলো', 'বই পড়ো', 'বই কেনো', 'বই দাও'], correct: 0, explanation: '"বই খোলো" (boi kholo) = Open the book. "খোলো" means "open" in informal/tumi form.' },
    ]
  },

  /* ─── 8. দরদাম — Bargaining ────────────────────────────────────────────── */
  {
    id: 'dordaam',
    bengaliName: 'দরদাম',
    englishName: 'Bargaining',
    icon: '💰',
    tags: ['কেনাকাটা', 'Shopping'],
    descBn: 'বাজারে দরদাম করার কথোপকথন। বাংলাদেশে দাম কমানোর শিল্প শিখুন।',
    descEn: 'A conversation about bargaining at the market. Learn the art of negotiating prices in Bangladesh.',
    dialogue: [
      { speaker: 'Buyer', speakerBn: 'ক্রেতা', lineBn: 'ভাই, এই শার্টটার দাম কত?', lineEn: 'Brother, how much is this shirt?', romanized: 'Bhai, ei shirt-tar dam koto?' },
      { speaker: 'Seller', speakerBn: 'বিক্রেতা', lineBn: 'এটার দাম আটশো টাকা। খুব ভালো কাপড়।', lineEn: 'This one is eight hundred taka. Very good fabric.', romanized: 'Etar dam aatsho taka. Khub bhalo kapor.' },
      { speaker: 'Buyer', speakerBn: 'ক্রেতা', lineBn: 'আটশো অনেক বেশি! পাঁচশো নেবেন?', lineEn: 'Eight hundred is too much! Will you take five hundred?', romanized: 'Aatsho onek beshi! Pachsho neben?' },
      { speaker: 'Seller', speakerBn: 'বিক্রেতা', lineBn: 'না ভাই, পাঁচশোতে হবে না। সাতশো দিন, লাস্ট প্রাইস।', lineEn: 'No brother, five hundred won\'t work. Give seven hundred, last price.', romanized: 'Na bhai, pachshote hobe na. Shaatsho din, last price.' },
      { speaker: 'Buyer', speakerBn: 'ক্রেতা', lineBn: 'ছয়শো হলে এখনই নিয়ে যাই। আরেকটাও কিনবো।', lineEn: 'If it\'s six hundred, I\'ll take it right now. I\'ll buy another one too.', romanized: 'Choysho hole ekhoni niye jai. Arektao kinbo.' },
      { speaker: 'Seller', speakerBn: 'বিক্রেতা', lineBn: 'আচ্ছা ভাই, দুইটা নিলে ছয়শো করে দেবো। নিয়ে যান।', lineEn: 'Okay brother, if you take two, I\'ll give it at six hundred each. Take them.', romanized: 'Accha bhai, duita nile choysho kore debo. Niye jan.' },
    ],
    roleplay: [
      {
        id: 'dordaam-rp1',
        contextBn: 'বিক্রেতা বলছে: "এটার দাম হাজার টাকা।"',
        contextEn: 'The seller says: "This costs one thousand taka."',
        options: [
          { textBn: 'হাজার টাকা? একটু কম করুন না। সাতশো দিই।', textEn: 'A thousand taka? Lower it a bit. I\'ll give seven hundred.', correct: true, feedbackBn: 'দারুণ! আপনি দরদাম করতে পারছেন।', feedbackEn: 'Great! You can bargain effectively.' },
          { textBn: 'ঠিক আছে, নিন হাজার টাকা।', textEn: 'Okay, take one thousand taka.', correct: false, feedbackBn: 'বাংলাদেশে দরদাম করা স্বাভাবিক। দাম কমাতে চেষ্টা করুন।', feedbackEn: 'Bargaining is normal in Bangladesh. Try to negotiate the price.' },
          { textBn: 'আমি যাচ্ছি, ভালো থাকবেন।', textEn: 'I\'m leaving, take care.', correct: false, feedbackBn: 'চলে না গিয়ে দরদাম করুন।', feedbackEn: 'Instead of leaving, try to bargain.' },
        ]
      },
      {
        id: 'dordaam-rp2',
        contextBn: 'বিক্রেতা বলছে: "ভাই, এর চেয়ে কম দিলে লস হয়ে যায়।"',
        contextEn: 'The seller says: "Brother, if I go lower than this, I\'ll make a loss."',
        options: [
          { textBn: 'আচ্ছা, তাহলে পাশের দোকানে দেখি।', textEn: 'Okay, then let me check the shop next door.', correct: true, feedbackBn: 'ভালো কৌশল! পাশের দোকানের কথা বলা দরদামে কাজে লাগে।', feedbackEn: 'Good tactic! Mentioning another shop helps in bargaining.' },
          { textBn: 'ভাই, আরেকটু কম করুন, আমি নিয়মিত আসবো।', textEn: 'Brother, lower it a bit more, I\'ll come regularly.', correct: true, feedbackBn: 'চমৎকার! নিয়মিত কাস্টমার হওয়ার কথা বলা ভালো কৌশল।', feedbackEn: 'Excellent! Offering to be a regular customer is a good tactic.' },
          { textBn: 'আমি দাম জানি না।', textEn: 'I don\'t know the price.', correct: false, feedbackBn: 'দরদামের সময় নিজের দাম জানানো উচিত।', feedbackEn: 'You should state your price while bargaining.' },
        ]
      },
      {
        id: 'dordaam-rp3',
        contextBn: 'বিক্রেতা বলছে: "আচ্ছা, আপনার শেষ দাম বলুন।"',
        contextEn: 'The seller says: "Okay, tell me your final price."',
        options: [
          { textBn: 'আমার শেষ দাম ছয়শো। এর বেশি দিতে পারবো না।', textEn: 'My final price is six hundred. I can\'t give more than this.', correct: true, feedbackBn: 'দারুণ! আপনি শেষ দাম ঠিক করতে পারছেন।', feedbackEn: 'Great! You can set your final price well.' },
          { textBn: 'যা ইচ্ছা নিন।', textEn: 'Take whatever you want.', correct: false, feedbackBn: 'দরদামে নিজের দাম নির্ধারণ করা উচিত।', feedbackEn: 'You should determine your own price while bargaining.' },
          { textBn: 'আমি জানি না।', textEn: 'I don\'t know.', correct: false, feedbackBn: 'দরদামে আপনাকে একটা দাম বলতে হবে।', feedbackEn: 'You need to name a price while bargaining.' },
        ]
      },
    ],
    quiz: [
      { id: 'dordaam-1', prompt: 'What does "দরদাম" mean?', promptBn: '"দরদাম" শব্দের অর্থ কী?', options: ['Bargaining', 'Buying', 'Selling', 'Counting'], correct: 0, explanation: '"দরদাম" (dordaam) = Bargaining. The art of negotiating prices, very common in Bangladeshi markets.' },
      { id: 'dordaam-2', prompt: 'What does "লাস্ট প্রাইস" mean in bargaining?', promptBn: 'দরদামে "লাস্ট প্রাইস" মানে কী?', options: ['Final price', 'First price', 'Discounted price', 'Original price'], correct: 0, explanation: '"লাস্ট প্রাইস" (last price) = Final price. Commonly used in Bangladeshi markets to indicate the lowest offer.' },
      { id: 'dordaam-3', prompt: 'How do you say "too expensive" in Bengali?', promptBn: 'বাংলায় "too expensive" কীভাবে বলবেন?', options: ['অনেক বেশি', 'অনেক কম', 'খুব সুন্দর', 'খুব ভালো'], correct: 0, explanation: '"অনেক বেশি" (onek beshi) = too much / too expensive. Used when the price is higher than expected.' },
    ]
  },

  /* ─── 9. আত্মীয়ের বাড়িতে — Visiting Family ───────────────────────────── */
  {
    id: 'attiyer-barite',
    bengaliName: 'আত্মীয়ের বাড়িতে',
    englishName: 'Visiting Family',
    icon: '🏠',
    tags: ['পরিবার', 'Family'],
    descBn: 'আত্মীয়ের বাড়িতে বেড়াতে গিয়ে কথোপকথন। অতিথি আপ্যায়ন ও পারিবারিক কথা শিখুন।',
    descEn: 'A conversation while visiting a relative\'s house. Learn about hospitality and family talk.',
    dialogue: [
      { speaker: 'Host', speakerBn: 'গৃহকর্তা', lineBn: 'আরে, আসো আসো! অনেকদিন পর এলে তো! বসো।', lineEn: 'Oh, come in, come in! It\'s been so long since you visited! Sit down.', romanized: 'Are, asho asho! Onekdin por ele to! Bosho.' },
      { speaker: 'Guest', speakerBn: 'অতিথি', lineBn: 'খালামণি, কেমন আছেন? সবাই ভালো?', lineEn: 'Aunty, how are you? Is everyone well?', romanized: 'Khalamoni, kemon achhen? Shobai bhalo?' },
      { speaker: 'Host', speakerBn: 'গৃহকর্তা', lineBn: 'আলহামদুলিল্লাহ, সবাই ভালো। তোমার আম্মু কেমন আছেন?', lineEn: 'Praise be to God, everyone is fine. How is your mother?', romanized: 'Alhamdulillah, shobai bhalo. Tomar ammu kemon achhen?' },
      { speaker: 'Guest', speakerBn: 'অতিথি', lineBn: 'আম্মু ভালো আছেন। উনি আপনাকে সালাম দিয়েছেন।', lineEn: 'Mother is well. She sends her regards to you.', romanized: 'Ammu bhalo achhen. Uni apnake salam diyechhen.' },
      { speaker: 'Host', speakerBn: 'গৃহকর্তা', lineBn: 'চা খাবে? নাস্তা করেছো? আমি মিষ্টি এনেছি।', lineEn: 'Will you have tea? Have you had a snack? I brought sweets.', romanized: 'Cha khabe? Nashta korechho? Ami mishti enechhi.' },
      { speaker: 'Guest', speakerBn: 'অতিথি', lineBn: 'জ্বী, চা খাবো। খালামণি, আপনার হাতের রান্না খুব মিস করি।', lineEn: 'Yes, I\'ll have tea. Aunty, I really miss your cooking.', romanized: 'Ji, cha khabo. Khalamoni, apnar hater ranna khub miss kori.' },
    ],
    roleplay: [
      {
        id: 'attiyer-barite-rp1',
        contextBn: 'আত্মীয় বলছে: "অনেকদিন দেখা নেই, কোথায় ছিলে?"',
        contextEn: 'The relative says: "Haven\'t seen you in ages, where have you been?"',
        options: [
          { textBn: 'কাজের চাপে আসতে পারিনি। আজ সময় করে এলাম।', textEn: 'I couldn\'t come due to work pressure. I made time today.', correct: true, feedbackBn: 'দারুণ! আপনি সুন্দরভাবে কারণ বলতে পারছেন।', feedbackEn: 'Great! You can explain the reason nicely.' },
          { textBn: 'আমি পড়াশোনা নিয়ে ব্যস্ত ছিলাম।', textEn: 'I was busy with studies.', correct: true, feedbackBn: 'ভালো! পড়াশোনায় ব্যস্ত থাকা একটা ভালো কারণ।', feedbackEn: 'Good! Being busy with studies is a good reason.' },
          { textBn: 'আমি আসতে চাইনি।', textEn: 'I didn\'t want to come.', correct: false, feedbackBn: 'এটা আত্মীয়কে বলা অভদ্র।', feedbackEn: 'This is rude to say to a relative.' },
        ]
      },
      {
        id: 'attiyer-barite-rp2',
        contextBn: 'খালামণি বলছে: "আর একটু খাও, তোমার প্লেটে কিছু নেই।"',
        contextEn: 'Aunty says: "Eat some more, there\'s nothing on your plate."',
        options: [
          { textBn: 'খালামণি, অনেক খেয়েছি। পেট ভরে গেছে।', textEn: 'Aunty, I have eaten a lot. I am full.', correct: true, feedbackBn: 'ভালো! ভদ্রভাবে না বলতে পারছেন।', feedbackEn: 'Good! You can politely decline.' },
          { textBn: 'আচ্ছা, আরেকটু দিন। খুব মজা হয়েছে রান্না।', textEn: 'Okay, give me a little more. The cooking is very delicious.', correct: true, feedbackBn: 'চমৎকার! রান্নার প্রশংসা করা আত্মীয়দের খুশি করে।', feedbackEn: 'Excellent! Complimenting the cooking makes relatives happy.' },
          { textBn: 'আমি এই খাবার পছন্দ করি না।', textEn: 'I don\'t like this food.', correct: false, feedbackBn: 'এটা আত্মীয়ের বাড়িতে বলা অভদ্র।', feedbackEn: 'This is rude to say at a relative\'s house.' },
        ]
      },
      {
        id: 'attiyer-barite-rp3',
        contextBn: 'বিদায়ের সময়। আপনি কীভাবে বিদায় নেবেন?',
        contextEn: 'Time to leave. How will you say goodbye?',
        options: [
          { textBn: 'খালামণি, আসি তাহলে। সবাইকে সালাম দিয়েন।', textEn: 'Aunty, I\'ll take my leave then. Please convey my regards to everyone.', correct: true, feedbackBn: 'দারুণ! আপনি সুন্দরভাবে বিদায় নিতে পারছেন।', feedbackEn: 'Great! You can say goodbye beautifully.' },
          { textBn: 'আবার আসবো, ইনশাআল্লাহ। খালামণি, দোয়া করবেন।', textEn: 'I\'ll come again, God willing. Aunty, please pray for me.', correct: true, feedbackBn: 'চমৎকার! আবার আসার কথা বলা ভালো।', feedbackEn: 'Excellent! Promising to visit again is nice.' },
          { textBn: 'চলে যাচ্ছি।', textEn: 'I\'m leaving.', correct: false, feedbackBn: 'এটা খুব সংক্ষিপ্ত। বিদায়ে একটু উষ্ণতা দেখান।', feedbackEn: 'This is too curt. Show some warmth in your goodbye.' },
        ]
      },
    ],
    quiz: [
      { id: 'attiyer-barite-1', prompt: 'What does "আত্মীয়" mean?', promptBn: '"আত্মীয়" শব্দের অর্থ কী?', options: ['Relative', 'Friend', 'Neighbor', 'Stranger'], correct: 0, explanation: '"আত্মীয়" (attiyo) = Relative. "আত্মীয়ের বাড়ি" means "relative\'s house".' },
      { id: 'attiyer-barite-2', prompt: 'What does "খালামণি" mean?', promptBn: '"খালামণি" শব্দের অর্থ কী?', options: ['Aunty (mother\'s sister)', 'Uncle', 'Grandmother', 'Cousin'], correct: 0, explanation: '"খালামণি" (khalamoni) = Aunty (mother\'s sister, respectful form). "খালা" is the base word for maternal aunt.' },
      { id: 'attiyer-barite-3', prompt: 'What does "সালাম দেওয়া" mean?', promptBn: '"সালাম দেওয়া" মানে কী?', options: ['To send regards/greetings', 'To give money', 'To cook food', 'To open the door'], correct: 0, explanation: '"সালাম দেওয়া" (salam deowa) = To send regards or greetings. A common way to convey respect in Bengali culture.' },
    ]
  },

  /* ─── 10. যানবাহনে — Taking Transport ──────────────────────────────────── */
  {
    id: 'janbahone',
    bengaliName: 'যানবাহনে',
    englishName: 'Taking Transport',
    icon: '🚌',
    tags: ['যাতায়াত', 'Transport'],
    descBn: 'বাস, রিকশা বা সিএনজিতে যাতায়াতের কথোপকথন। গন্তব্য বলা ও ভাড়া ঠিক করা শিখুন।',
    descEn: 'A conversation about traveling by bus, rickshaw, or CNG. Learn to state your destination and negotiate fares.',
    dialogue: [
      { speaker: 'Passenger', speakerBn: 'যাত্রী', lineBn: 'ভাই, এই সিএনজি কি গুলশান যাবে?', lineEn: 'Brother, does this CNG go to Gulshan?', romanized: 'Bhai, ei CNG ki Gulshan jabe?' },
      { speaker: 'Driver', speakerBn: 'চালক', lineBn: 'হ্যাঁ, যাবো। মিটারে যাবেন নাকি ভাড়া ঠিক করবেন?', lineEn: 'Yes, I\'ll go. Do you want to go by meter or set a fare?', romanized: 'Hae, jabo. Meter-e jaben naki bhara thik korben?' },
      { speaker: 'Passenger', speakerBn: 'যাত্রী', lineBn: 'ভাড়া কত নেবেন গুলশান দুই নম্বর পর্যন্ত?', lineEn: 'How much will you charge up to Gulshan Two?', romanized: 'Bhara koto neben Gulshan dui nombor porjonto?' },
      { speaker: 'Driver', speakerBn: 'চালক', lineBn: 'দেড়শো টাকা লাগবে। জ্যামের সময় তো।', lineEn: 'It will be one hundred fifty taka. It\'s rush hour, you know.', romanized: 'Dersho taka lagbe. Jyamer shomoy to.' },
      { speaker: 'Passenger', speakerBn: 'যাত্রী', lineBn: 'একশো বিশ দিবো। বেশি দূর তো না।', lineEn: 'I\'ll give one hundred twenty. It\'s not that far.', romanized: 'Eksho bish dibo. Beshi dur to na.' },
      { speaker: 'Driver', speakerBn: 'চালক', lineBn: 'আচ্ছা, উঠেন। তাড়াতাড়ি যাওয়ার চেষ্টা করবো।', lineEn: 'Okay, get in. I\'ll try to get there quickly.', romanized: 'Accha, uthen. Taratari jaowar cheshta korbo.' },
    ],
    roleplay: [
      {
        id: 'janbahone-rp1',
        contextBn: 'আপনি রাস্তায় দাঁড়িয়ে আছেন। একটা রিকশা ডাকতে চান।',
        contextEn: 'You are standing on the road. You want to call a rickshaw.',
        options: [
          { textBn: 'রিকশা! ভাই, ধানমন্ডি যাবেন?', textEn: 'Rickshaw! Brother, will you go to Dhanmondi?', correct: true, feedbackBn: 'দারুণ! আপনি সুন্দরভাবে রিকশা ডাকতে পারছেন।', feedbackEn: 'Great! You can hail a rickshaw properly.' },
          { textBn: 'আমি এখানে দাঁড়িয়ে থাকবো।', textEn: 'I will keep standing here.', correct: false, feedbackBn: 'আপনাকে রিকশা ডাকতে হবে, দাঁড়িয়ে থাকলে কিছু হবে না।', feedbackEn: 'You need to hail the rickshaw, just standing won\'t help.' },
          { textBn: 'আমি হাঁটতে পছন্দ করি।', textEn: 'I prefer walking.', correct: false, feedbackBn: 'আপনি তো রিকশায় যেতে চান, হাঁটার কথা বলছেন কেন?', feedbackEn: 'You want to take a rickshaw, so why talk about walking?' },
        ]
      },
      {
        id: 'janbahone-rp2',
        contextBn: 'বাসের হেল্পার বলছে: "কোথায় যাবেন?"',
        contextEn: 'The bus helper says: "Where are you going?"',
        options: [
          { textBn: 'মতিঝিল যাবো। ভাড়া কত?', textEn: 'I\'m going to Motijheel. How much is the fare?', correct: true, feedbackBn: 'দারুণ! গন্তব্য ও ভাড়া দুটোই জিজ্ঞেস করতে পারছেন।', feedbackEn: 'Great! You can ask about both destination and fare.' },
          { textBn: 'আমি ভুলে গেছি কোথায় যেতে চাই।', textEn: 'I forgot where I want to go.', correct: false, feedbackBn: 'গন্তব্য নির্ধারণ করে বাসে উঠুন।', feedbackEn: 'Decide your destination before getting on the bus.' },
          { textBn: 'আমি খুশি আছি।', textEn: 'I am happy.', correct: false, feedbackBn: 'এটা গন্তব্য সম্পর্কে উত্তর নয়।', feedbackEn: 'This is not an answer about your destination.' },
        ]
      },
      {
        id: 'janbahone-rp3',
        contextBn: 'আপনি গন্তব্যে পৌঁছে গেছেন। চালককে কী বলবেন?',
        contextEn: 'You have reached your destination. What do you say to the driver?',
        options: [
          { textBn: 'ভাই, এখানে নামিয়ে দিন। এই নিন ভাড়া।', textEn: 'Brother, drop me here. Here is the fare.', correct: true, feedbackBn: 'দারুণ! আপনি সঠিকভাবে নামার কথা বলতে পারছেন।', feedbackEn: 'Great! You can ask to stop and pay correctly.' },
          { textBn: 'ধন্যবাদ, ভাই। আল্লাহ হাফেজ।', textEn: 'Thank you, brother. Goodbye.', correct: true, feedbackBn: 'ভালো! চালককে ধন্যবাদ দেওয়া ভদ্রতা।', feedbackEn: 'Good! Thanking the driver is polite.' },
          { textBn: 'আমি আরও ঘুরতে চাই।', textEn: 'I want to roam more.', correct: false, feedbackBn: 'আপনি তো গন্তব্যে পৌঁছে গেছেন, নামুন।', feedbackEn: 'You have reached your destination, get off.' },
        ]
      },
    ],
    quiz: [
      { id: 'janbahone-1', prompt: 'What does "ভাড়া" mean?', promptBn: '"ভাড়া" শব্দের অর্থ কী?', options: ['Fare/Rent', 'Speed', 'Distance', 'Route'], correct: 0, explanation: '"ভাড়া" (bhara) = Fare or rent. "ভাড়া কত?" means "How much is the fare?"' },
      { id: 'janbahone-2', prompt: 'What does "জ্যাম" mean in the context of transport?', promptBn: 'যাতায়াতে "জ্যাম" মানে কী?', options: ['Traffic jam', 'Jam (food)', 'Lock', 'Stop'], correct: 0, explanation: '"জ্যাম" (jyam) = Traffic jam. "জ্যামের সময়" means "during rush hour / traffic time".' },
      { id: 'janbahone-3', prompt: 'What is a "সিএনজি" in Bangladesh?', promptBn: 'বাংলাদেশে "সিএনজি" কী?', options: ['A three-wheeled auto-rickshaw running on CNG', 'A type of bus', 'A bicycle', 'A train'], correct: 0, explanation: '"সিএনজি" (CNG) = a three-wheeled auto-rickshaw that runs on compressed natural gas, very common in Dhaka.' },
    ]
  },
  /* ─── 7. চায়ের দোকানে — At the Tea Stall (Branching) ──────────────────── */
  {
    id: 'chayer-dokane',
    bengaliName: 'চায়ের দোকানে',
    englishName: 'At the Tea Stall (Branching)',
    icon: '☕',
    tags: ['কথোপকথন', 'শাখা', 'Branching'],
    descBn: 'চায়ের দোকানে আড্ডা — আপনার উত্তর অনুযায়ী কথোপকথন বদলে যাবে!',
    descEn: 'Chatting at a tea stall — the conversation changes based on your choices!',
    dialogue: [
      { speaker: 'You', speakerBn: 'আপনি', lineBn: 'ভাই, এক কাপ চা দিন।', lineEn: 'Brother, give me a cup of tea.', romanized: 'Bhai, ek kap cha din.' },
      { speaker: 'Stallkeeper', speakerBn: 'দোকানদার', lineBn: 'লাল চা না দুধ চা?', lineEn: 'Red tea or milk tea?', romanized: 'Lal cha na dudh cha?' },
      { speaker: 'You', speakerBn: 'আপনি', lineBn: 'দুধ চা দিন, চিনি কম।', lineEn: 'Milk tea, less sugar.', romanized: 'Dudh cha din, chini kom.' },
      { speaker: 'Stallkeeper', speakerBn: 'দোকানদার', lineBn: 'সিঙ্গারা বা পিঠা খাবেন?', lineEn: 'Would you like samosa or pitha?', romanized: 'Singara ba pitha khaben?' },
    ],
    roleplay: [
      {
        id: 'chayer-rp0',
        contextBn: 'দোকানদার বলছে: "কী দেব ভাই?"',
        contextEn: 'The stallkeeper says: "What can I get you?"',
        options: [
          { textBn: 'এক কাপ চা দিন।', textEn: 'Give me a cup of tea.', correct: true, feedbackBn: 'দারুণ! চা অর্ডার করতে পারছেন।', feedbackEn: 'Great! You can order tea.', next: 1 },
          { textBn: 'একটু বসতে পারি?', textEn: 'Can I sit for a bit?', correct: true, feedbackBn: 'ঠিক আছে! কিন্তু কিছু অর্ডার করতে হবে।', feedbackEn: 'Okay! But you should order something.', next: 2 },
          { textBn: 'ট্রেনের টিকিট দিন।', textEn: 'Give me a train ticket.', correct: false, feedbackBn: 'এটা চায়ের দোকান, ট্রেন স্টেশন নয়!', feedbackEn: 'This is a tea stall, not a train station!' },
        ]
      },
      {
        id: 'chayer-rp1',
        contextBn: 'দোকানদার বলছে: "লাল চা না দুধ চা?"',
        contextEn: 'The stallkeeper says: "Red tea or milk tea?"',
        options: [
          { textBn: 'দুধ চা দিন, চিনি কম।', textEn: 'Milk tea, less sugar.', correct: true, feedbackBn: 'চমৎকার! পছন্দ মতো চা চাইতে পারছেন।', feedbackEn: 'Excellent! You can customize your tea order.', next: 3 },
          { textBn: 'লাল চা, আদা দিয়ে।', textEn: 'Red tea, with ginger.', correct: true, feedbackBn: 'ভালো! আদা চা খুব জনপ্রিয়।', feedbackEn: 'Good! Ginger tea is very popular.', next: 3 },
          { textBn: 'কফি দিন।', textEn: 'Give me coffee.', correct: false, feedbackBn: 'এটা চায়ের দোকান, কফি সাধারণত থাকে না।', feedbackEn: 'This is a tea stall, they usually don\'t have coffee.' },
        ]
      },
      {
        id: 'chayer-rp2',
        contextBn: 'দোকানদার বলছে: "হ্যাঁ বসুন। কিছু খাবেন?"',
        contextEn: 'The stallkeeper says: "Yes, sit down. Will you have something?"',
        options: [
          { textBn: 'হ্যাঁ, এক কাপ চা আর একটা সিঙ্গারা।', textEn: 'Yes, a cup of tea and a samosa.', correct: true, feedbackBn: 'দারুণ! চা আর নাস্তা দুটোই অর্ডার করেছেন।', feedbackEn: 'Great! You ordered both tea and a snack.', next: 4 },
          { textBn: 'না, শুধু পানি দিন।', textEn: 'No, just give me water.', correct: true, feedbackBn: 'ঠিক আছে, পানি চাওয়া স্বাভাবিক।', feedbackEn: 'Okay, asking for water is natural.', next: 4 },
          { textBn: 'আমি কিছু খাব না।', textEn: 'I won\'t eat anything.', correct: false, feedbackBn: 'দোকানে বসলে কিছু না কিছু অর্ডার করা ভদ্রতা।', feedbackEn: 'It\'s polite to order something when sitting at a stall.' },
        ]
      },
      {
        id: 'chayer-rp3',
        contextBn: 'দোকানদার বলছে: "সিঙ্গারা বা পিঠা খাবেন?"',
        contextEn: 'The stallkeeper says: "Would you like samosa or pitha?"',
        options: [
          { textBn: 'একটা সিঙ্গারা দিন।', textEn: 'Give me a samosa.', correct: true, feedbackBn: 'ভালো পছন্দ! সিঙ্গারা চায়ের সাথে জমে।', feedbackEn: 'Good choice! Samosa goes well with tea.' },
          { textBn: 'না, শুধু চা যথেষ্ট।', textEn: 'No, just tea is enough.', correct: true, feedbackBn: 'ঠিক আছে, প্রত্যাখ্যান করতেও জানতে হয়।', feedbackEn: 'Okay, it\'s good to know how to decline politely.' },
          { textBn: 'পিঠা কী? বুঝিনি।', textEn: 'What is pitha? I didn\'t understand.', correct: true, feedbackBn: 'ভালো প্রশ্ন! পিঠা হলো বাংলার ঐতিহ্যবাহী মিষ্টি।', feedbackEn: 'Good question! Pitha is a traditional Bengali sweet/cake.' },
        ]
      },
      {
        id: 'chayer-rp4',
        contextBn: 'চায়ের দোকানে আপনার পাশের লোক বলছে: "কোথায় থাকেন?"',
        contextEn: 'The person next to you says: "Where do you live?"',
        options: [
          { textBn: 'আমি মিরপুরে থাকি।', textEn: 'I live in Mirpur.', correct: true, feedbackBn: 'দারুণ! নিজের এলাকা বলতে পারছেন।', feedbackEn: 'Great! You can tell where you live.' },
          { textBn: 'আমি বিদেশ থেকে এসেছি, বাংলা শিখছি।', textEn: 'I came from abroad, I\'m learning Bengali.', correct: true, feedbackBn: 'চমৎকার! খোলামেলা পরিচয় দেওয়া ভালো।', feedbackEn: 'Excellent! Being open about yourself is great.' },
          { textBn: 'সেটা বলব না।', textEn: 'I won\'t tell you.', correct: false, feedbackBn: 'চায়ের দোকানে আড্ডায় এমন বলা ভদ্রতা নয়।', feedbackEn: 'That\'s not polite when chatting at a tea stall.' },
        ]
      },
    ],
    quiz: [
      { id: 'chayer-1', prompt: 'What is "লাল চা"?', promptBn: '"লাল চা" মানে কী?', options: ['Red / black tea (without milk)', 'Green tea', 'Iced tea', 'Herbal tea'], correct: 0, explanation: '"লাল চা" (lal cha) = red tea, which is black tea served without milk. Very common in Bangladesh.' },
      { id: 'chayer-2', prompt: 'What does "চিনি কম" mean?', promptBn: '"চিনি কম" অর্থ কী?', options: ['Less sugar', 'More sugar', 'No sugar', 'Sweet'], correct: 0, explanation: '"চিনি কম" (chini kom) = less sugar. Use this when ordering tea.' },
      { id: 'chayer-3', prompt: 'What is a "সিঙ্গারা"?', promptBn: '"সিঙ্গারা" কী?', options: ['A fried pastry similar to samosa', 'A sweet dessert', 'A type of rice dish', 'A drink'], correct: 0, explanation: '"সিঙ্গারা" (singara) is a triangular fried pastry filled with spiced potatoes or meat, similar to a samosa.' },
    ]
  },

  /* ─── 8. হারিয়ে গেছি — Lost in the City (Branching) ──────────────────── */
  {
    id: 'hariye-gechi',
    bengaliName: 'হারিয়ে গেছি',
    englishName: 'Lost in the City (Branching)',
    icon: '🗺️',
    tags: ['দিকনির্দেশনা', 'শাখা', 'Branching'],
    descBn: 'শহরে পথ হারিয়ে যাওয়ার কথোপকথন — আপনার উত্তর অনুযায়ী সাহায্য পাবেন!',
    descEn: 'Getting lost in the city — the help you receive depends on your choices!',
    dialogue: [
      { speaker: 'You', speakerBn: 'আপনি', lineBn: 'এক্সকিউজ মি, আমি পথ হারিয়ে ফেলেছি।', lineEn: 'Excuse me, I\'m lost.', romanized: 'Excuse me, ami poth hariye felechhi.' },
      { speaker: 'Passerby', speakerBn: 'পথচারী', lineBn: 'কোথায় যেতে চান?', lineEn: 'Where do you want to go?', romanized: 'Kothay jete chan?' },
      { speaker: 'You', speakerBn: 'আপনি', lineBn: 'শাহবাগ মোড় কোন দিকে?', lineEn: 'Which way is Shahbag intersection?', romanized: 'Shahbag mor kon dike?' },
      { speaker: 'Passerby', speakerBn: 'পথচারী', lineBn: 'সোজা যান, তারপর ডানে ঘুরুন।', lineEn: 'Go straight, then turn right.', romanized: 'Shoja jan, tarpor dane ghurun.' },
    ],
    roleplay: [
      {
        id: 'hariye-rp0',
        contextBn: 'আপনি একটি ব্যস্ত রাস্তায় দাঁড়িয়ে আছেন। পথ চিনতে পারছেন না। কী করবেন?',
        contextEn: 'You are standing on a busy road. You can\'t find your way. What do you do?',
        options: [
          { textBn: 'পাশের একজনকে বলি — ভাই, একটু সাহায্য করবেন?', textEn: 'I ask someone — Brother, can you help me?', correct: true, feedbackBn: 'দারুণ! বাংলায় সাহায্য চাইতে পারছেন।', feedbackEn: 'Great! You can ask for help in Bengali.', next: 1 },
          { textBn: 'রিকশাওয়ালাকে বলি — শাহবাগ যাবেন?', textEn: 'I ask a rickshaw driver — Will you go to Shahbag?', correct: true, feedbackBn: 'ভালো! রিকশায় গন্তব্যে যেতে পারবেন।', feedbackEn: 'Good! You can take a rickshaw to your destination.', next: 3 },
          { textBn: 'চুপচাপ একাই হাঁটতে থাকি।', textEn: 'I keep walking silently on my own.', correct: false, feedbackBn: 'পথ না জানলে কাউকে জিজ্ঞেস করা ভালো।', feedbackEn: 'It\'s better to ask someone if you don\'t know the way.' },
        ]
      },
      {
        id: 'hariye-rp1',
        contextBn: 'পথচারী বলছে: "কোথায় যেতে চান?"',
        contextEn: 'The passerby says: "Where do you want to go?"',
        options: [
          { textBn: 'শাহবাগ মোড় কোন দিকে?', textEn: 'Which way is Shahbag intersection?', correct: true, feedbackBn: 'চমৎকার! গন্তব্য নির্দিষ্ট করে দিক জিজ্ঞেস করতে পারছেন।', feedbackEn: 'Excellent! You can ask for a specific direction.', next: 2 },
          { textBn: 'কাছে কোনো হোটেল আছে?', textEn: 'Is there a hotel nearby?', correct: true, feedbackBn: 'ভালো! বিকল্প জায়গা খুঁজছেন।', feedbackEn: 'Good! You\'re looking for an alternative place.', next: 4 },
          { textBn: 'জানি না কোথায় যাচ্ছি।', textEn: 'I don\'t know where I\'m going.', correct: false, feedbackBn: 'একটা গন্তব্য ঠিক করুন, তাহলে সাহায্য পাবেন।', feedbackEn: 'Decide on a destination so people can help you.' },
        ]
      },
      {
        id: 'hariye-rp2',
        contextBn: 'পথচারী বলছে: "সোজা যান, তারপর ডানে ঘুরুন। মিনিট দশেক লাগবে।"',
        contextEn: 'The passerby says: "Go straight, then turn right. It will take about ten minutes."',
        options: [
          { textBn: 'ধন্যবাদ, ভাই! অনেক উপকার হলো।', textEn: 'Thank you, brother! That was very helpful.', correct: true, feedbackBn: 'দারুণ! কৃতজ্ঞতা প্রকাশ করতে পারছেন।', feedbackEn: 'Great! You can express gratitude.' },
          { textBn: 'বামে না ডানে? আবার বলুন?', textEn: 'Left or right? Can you repeat?', correct: true, feedbackBn: 'ভালো! না বুঝলে আবার জিজ্ঞেস করা দোষের নয়।', feedbackEn: 'Good! There\'s no shame in asking again if you didn\'t understand.' },
          { textBn: 'আমি হেঁটে যেতে চাই না।', textEn: 'I don\'t want to walk.', correct: false, feedbackBn: 'তাহলে রিকশা বা বাস নিন।', feedbackEn: 'Then take a rickshaw or bus.' },
        ]
      },
      {
        id: 'hariye-rp3',
        contextBn: 'রিকশাওয়ালা বলছে: "শাহবাগ? পঞ্চাশ টাকা লাগবে।"',
        contextEn: 'The rickshaw driver says: "Shahbag? It will cost fifty taka."',
        options: [
          { textBn: 'ঠিক আছে, চলুন।', textEn: 'Okay, let\'s go.', correct: true, feedbackBn: 'ভালো! রিকশায় যাত্রা শুরু।', feedbackEn: 'Good! The rickshaw ride begins.' },
          { textBn: 'ত্রিশ টাকায় যাবেন?', textEn: 'Will you go for thirty taka?', correct: true, feedbackBn: 'চমৎকার! দরদাম করতে পারছেন।', feedbackEn: 'Excellent! You can bargain.' },
          { textBn: 'আমি জানি না রিকশা কী।', textEn: 'I don\'t know what a rickshaw is.', correct: false, feedbackBn: 'রিকশা বাংলাদেশের জনপ্রিয় যানবাহন!', feedbackEn: 'Rickshaws are a very common vehicle in Bangladesh!' },
        ]
      },
      {
        id: 'hariye-rp4',
        contextBn: 'পথচারী বলছে: "হ্যাঁ, এখান থেকে পাঁচ মিনিটের পথে একটা হোটেল আছে।"',
        contextEn: 'The passerby says: "Yes, there\'s a hotel five minutes from here."',
        options: [
          { textBn: 'কোন দিকে যেতে হবে?', textEn: 'Which direction should I go?', correct: true, feedbackBn: 'ভালো! দিকনির্দেশনা চাইতে পারছেন।', feedbackEn: 'Good! You can ask for directions.' },
          { textBn: 'ধন্যবাদ! আমি খুঁজে নেব।', textEn: 'Thanks! I\'ll find it.', correct: true, feedbackBn: 'ঠিক আছে, তবে ঠিকানা জেনে নিন।', feedbackEn: 'Okay, but make sure to get the address.' },
          { textBn: 'হোটেলে আমি থাকতে চাই না।', textEn: 'I don\'t want to stay at a hotel.', correct: false, feedbackBn: 'তাহলে বলুন আপনি আসলে কোথায় যেতে চান।', feedbackEn: 'Then tell them where you actually want to go.' },
        ]
      },
    ],
    quiz: [
      { id: 'hariye-1', prompt: 'What does "পথ হারিয়ে ফেলেছি" mean?', promptBn: '"পথ হারিয়ে ফেলেছি" মানে কী?', options: ['I am lost', 'I am tired', 'I am late', 'I am hungry'], correct: 0, explanation: '"পথ হারিয়ে ফেলেছি" (poth hariye felechhi) = I have lost my way / I am lost.' },
      { id: 'hariye-2', prompt: 'What does "সোজা যান" mean?', promptBn: '"সোজা যান" মানে কী?', options: ['Go straight', 'Turn left', 'Turn right', 'Go back'], correct: 0, explanation: '"সোজা যান" (shoja jan) = Go straight. Very useful for giving/taking directions.' },
      { id: 'hariye-3', prompt: 'How do you say "turn right" in Bengali?', promptBn: 'বাংলায় "turn right" কীভাবে বলবেন?', options: ['ডানে ঘুরুন', 'বামে ঘুরুন', 'সোজা যান', 'পেছনে যান'], correct: 0, explanation: '"ডানে ঘুরুন" (dane ghurun) = turn right. "বামে ঘুরুন" = turn left.' },
    ]
  },
];

export { CONVERSATIONS };
