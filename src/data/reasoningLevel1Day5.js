/**
 * SPOKO Logical Reasoning - Level 1, Day 5: Analogies and Relationships
 * Comprehensive lesson data, worked examples, interactive practice modules,
 * quick revision summary, and exactly 20 unique multiple-choice practice questions.
 */

// ==========================================
// DAY 5 OVERVIEW & LEARNING OBJECTIVES
// ==========================================
export const day5Overview = {
  dayNumber: 5,
  level: "Level 1: Beginner",
  course: "Logical Reasoning & Analytical Thinking",
  title: "Analogies and Relationships",
  duration: "45–60 mins",
  difficulty: "Beginner",
  description: "Master identifying relationships between words, numbers, letters, objects, functions, and causes, and learn to apply those relationships consistently to solve aptitude analogy problems.",
  objectives: [
    "Understand the fundamental meaning and mathematical structure of an analogy (A : B :: C : D).",
    "Identify relationships between words including synonyms, antonyms, categories, and workplaces.",
    "Solve word analogy questions with single, clear, intended answers.",
    "Recognize number relationships including addition, subtraction, multiplication, division, doubling, halving, and squares.",
    "Understand object-function, tool-user, and part-whole relationships.",
    "Identify cause-effect, action-result, and problem-solution relationships.",
    "Solve simple letter and alphabet analogies using forward and backward positional shifts.",
    "Apply the same relationship consistently from the first pair to the second pair without deviation."
  ],
  stats: {
    totalSections: 7,
    practiceQuestions: 20,
    passingScore: "70% (14 / 20)",
    estimatedReadTime: "25–30 mins"
  }
};

// ==========================================
// SECTION 1: INTRODUCTION TO ANALOGIES
// ==========================================
export const section1Content = {
  title: "Introduction to Analogies",
  concept: "An analogy identifies a specific relationship between two items and challenges you to find another pair that shares that exact same relationship. It is the art of recognizing that two completely different situations or ideas are connected by an identical structural logic.",
  formula: "A : B :: C : D",
  formulaMeaning: "Item A is related to Item B in the exact same way that Item C is related to Item D.",
  corePrinciples: [
    { title: "Single Colon (:)", desc: "Means 'is related to'. It separates the two members of a pair." },
    { title: "Double Colon (::)", desc: "Means 'as' or 'in the same way that'. It connects the first pair to the second pair." },
    { title: "Symmetry of Direction", desc: "If A creates B, then C must create D (not vice versa). The direction of relation must match!" }
  ],
  examples: [
    {
      id: "sec1_ex1",
      pair1: "Bird : Nest",
      pair2: "Bee : Hive",
      relationType: "Living Creature and its Dwelling Place",
      explanation: "A bird builds and lives in a nest. In the exact same way, a bee builds and lives in a hive."
    },
    {
      id: "sec1_ex2",
      pair1: "Hand : Glove",
      pair2: "Foot : Sock",
      relationType: "Body Part and its Protective Garment",
      explanation: "A glove is a protective piece of clothing worn on the hand. In the exact same way, a sock is worn on the foot."
    },
    {
      id: "sec1_ex3",
      pair1: "Day : Night",
      pair2: "Hot : Cold",
      relationType: "Direct Antonyms (Opposites)",
      explanation: "Day is the direct opposite of night. In the exact same way, hot is the direct opposite of cold."
    }
  ],
  fourStepMethod: [
    { step: 1, name: "Identify the Relationship", desc: "Look at the first pair (A : B) and determine how A connects to B." },
    { step: 2, name: "Express in Simple Words", desc: "Formulate a simple sentence: 'A is used for B' or 'A lives in B'." },
    { step: 3, name: "Apply to the Third Item", desc: "Insert item C into your sentence: 'C is used for ___' or 'C lives in ___'." },
    { step: 4, name: "Select the Matching Option", desc: "Pick the option that truthfully and accurately completes that sentence." }
  ]
};

// ==========================================
// SECTION 2: WORD ANALOGIES
// ==========================================
export const section2Content = {
  title: "Word Analogies",
  concept: "Word analogies test your vocabulary, comprehension, and real-world relationship mapping. In competitive exams and placement tests, word analogies fall into standard, recurring relationship categories.",
  relationshipCategories: [
    {
      type: "Synonyms",
      pair: "Happy : Joyful",
      clue: "Words with identical or nearly identical meanings.",
      sampleQuestion: "Huge : Gigantic :: Silent : Quiet"
    },
    {
      type: "Antonyms",
      pair: "Hot : Cold",
      clue: "Words with diametrically opposite meanings.",
      sampleQuestion: "Arrive : Depart :: Victory : Defeat"
    },
    {
      type: "Category and Member",
      pair: "Fruit : Apple",
      clue: "The first is the general category; the second is a specific member.",
      sampleQuestion: "Mammal : Whale :: Furniture : Chair"
    },
    {
      type: "Object and Function",
      pair: "Pen : Writing",
      clue: "The primary purpose or utilitarian use of an object.",
      sampleQuestion: "Scissors : Cutting :: Camera : Photography"
    },
    {
      type: "Tool and User",
      pair: "Stethoscope : Doctor",
      clue: "The characteristic instrument used by a professional.",
      sampleQuestion: "Brush : Painter :: Chisel : Sculptor"
    },
    {
      type: "Object and Location",
      pair: "Fish : Water",
      clue: "The natural habitat or standard environment of an object/animal.",
      sampleQuestion: "Star : Sky :: Ship : Ocean"
    },
    {
      type: "Part and Whole",
      pair: "Wheel : Car",
      clue: "A constituent sub-part of a larger integrated entity.",
      sampleQuestion: "Page : Book :: Room : House"
    },
    {
      type: "Worker and Workplace",
      pair: "Teacher : School",
      clue: "The typical occupational setting where a professional works.",
      sampleQuestion: "Doctor : Hospital :: Chef : Kitchen"
    }
  ],
  workedExamples: [
    {
      id: "sec2_w1",
      question: "Doctor : Hospital :: Teacher : ?",
      options: ["Library", "School", "Office", "Laboratory"],
      correct: "School",
      explanation: "A doctor's primary institutional workplace is a hospital. In the same way, a teacher's primary institutional workplace is a school."
    },
    {
      id: "sec2_w2",
      question: "Courage : Bravery :: Honest : ?",
      options: ["Truthful", "Proud", "Strict", "Clever"],
      correct: "Truthful",
      explanation: "Courage and Bravery are synonyms. Honest and Truthful are also synonyms sharing the same virtue."
    },
    {
      id: "sec2_w3",
      question: "Pencil : Graphite :: Candle : ?",
      options: ["Light", "Wax", "Flame", "Wick"],
      correct: "Wax",
      explanation: "Graphite is the core substance that forms a pencil. Wax is the core substance that forms a candle."
    }
  ],
  contextNote: "Important Aptitude Tip: Some words have multiple meanings depending on context. In aptitude tests, always check all four options to determine which single intended relationship creates an airtight logical bridge between both pairs!"
};

// ==========================================
// SECTION 3: OBJECT, FUNCTION, AND PART-WHOLE
// ==========================================
export const section3Content = {
  title: "Object, Function, and Part-Whole Relationships",
  concept: "Two of the most heavily tested relationship types in logical reasoning are Object-Function (what an item is used for) and Part-Whole (what an item is constructed of). Understanding the difference prevents confusion.",
  distinction: {
    objectFunction: "An active relationship: X is an instrument that performs the action Y. (e.g., A Knife cuts).",
    partWhole: "A structural relationship: X is a physical piece or component of the larger body Y. (e.g., A Page is part of a Book)."
  },
  pairs: [
    {
      type: "Object and Function (Tool / Action)",
      items: [
        { pair: "Knife : Cutting", desc: "A knife is specifically crafted to cut things." },
        { pair: "Key : Lock", desc: "A key is a tool designed to unlock a physical lock." },
        { pair: "Password : Account", desc: "A digital password unlocks access to a user account." },
        { pair: "Shield : Protection", desc: "A shield is a defensive tool used to provide protection." }
      ]
    },
    {
      type: "Part and Whole (Sub-unit / System)",
      items: [
        { pair: "Page : Book", desc: "A single page is a physical sub-part bound into a complete book." },
        { pair: "Brick : Wall", desc: "A brick is one individual building block of a whole wall." },
        { pair: "Engine : Car", desc: "An engine is the essential powerhouse component inside a car." },
        { pair: "Heart : Body", desc: "The heart is the vital blood-pumping organ inside the human body." }
      ]
    }
  ],
  practiceActivity: [
    {
      id: "act1",
      pair: "Oar : Boat",
      classification: "Object and Function (Propulsion tool)",
      parallelPair: "Pedal : Bicycle",
      reason: "An oar propels a boat forward, just as a pedal propels a bicycle forward."
    },
    {
      id: "act2",
      pair: "Petal : Flower",
      classification: "Part and Whole (Component of blossom)",
      parallelPair: "Leaf : Tree",
      reason: "A petal is a constituent part of a flower, just as a leaf is a constituent part of a tree."
    },
    {
      id: "act3",
      pair: "Thermometer : Temperature",
      classification: "Object and Function (Measurement instrument)",
      parallelPair: "Barometer : Pressure",
      reason: "A thermometer measures temperature, just as a barometer measures atmospheric pressure."
    }
  ]
};

// ==========================================
// SECTION 4: NUMBER ANALOGIES
// ==========================================
export const section4Content = {
  title: "Number Analogies",
  concept: "In number analogies, pairs of numbers are connected by standard arithmetic or algebraic rules. Your objective is to discover the mathematical rule that transforms the first number into the second, and apply that exact operation to the third number.",
  rulesCatalog: [
    { name: "Multiplication / Division", formula: "n : (n × k) or n : (n ÷ k)", example: "4 : 12 :: 5 : 15 (Multiply by 3)" },
    { name: "Doubling and Halving", formula: "n : 2n or n : n/2", example: "6 : 12 :: 9 : 18 (Multiply by 2)" },
    { name: "Squares and Square Roots", formula: "n : n² or n² : n", example: "4 : 16 :: 7 : 49 (Square: 4²=16, 7²=49)" },
    { name: "Addition and Subtraction", formula: "n : (n + k) or n : (n - k)", example: "14 : 20 :: 25 : 31 (Add 6)" },
    { name: "Cubes", formula: "n : n³", example: "2 : 8 :: 3 : 27 (Cube: 2³=8, 3³=27)" },
    { name: "Square plus Constant", formula: "n : (n² + 1)", example: "3 : 10 :: 4 : 17 (3²+1=10, 4²+1=17)" }
  ],
  detailedExamples: [
    {
      id: "num_ex1",
      analogy: "3 : 9 :: 4 : ?",
      stepByStep: "Step 1: Check relation between 3 and 9. 3 × 3 = 9 (multiply by itself / square). Step 2: Apply square to 4. 4 × 4 = 16.",
      answer: "16",
      distractorNote: "Could someone think '3 + 6 = 9'? If so, 4 + 6 = 10. But in standard aptitude tests, exponential and multiplicative relations take priority over flat addition unless options clearly dictate otherwise."
    },
    {
      id: "num_ex2",
      analogy: "5 : 10 :: 8 : ?",
      stepByStep: "Step 1: 5 × 2 = 10 (doubling). Step 2: Apply the same doubling rule to 8. 8 × 2 = 16.",
      answer: "16",
      distractorNote: "Doubling is one of the most common foundational patterns in beginner numerical reasoning."
    },
    {
      id: "num_ex3",
      analogy: "12 : 6 :: 18 : ?",
      stepByStep: "Step 1: Check relation between 12 and 6. 12 ÷ 2 = 6 (halving). Step 2: Apply halving to 18. 18 ÷ 2 = 9.",
      answer: "9",
      distractorNote: "A clean, unambiguous division by 2 that leaves no remainder."
    }
  ],
  goldenTip: "Verification Check: Always double-check your arithmetic. A valid numerical analogy never leaves room for competing, equally simple rules. The correct option will cleanly mirror the first pair's operation."
};

// ==========================================
// SECTION 5: ALPHABET AND LETTER ANALOGIES
// ==========================================
export const section5Content = {
  title: "Alphabet and Letter Analogies",
  concept: "Alphabet analogies map positional movements along the 26 letters of the English alphabet (A=1, B=2, C=3, ..., Z=26). By identifying the number of steps forward or backward between the first pair, you can solve for the missing letter or letter group.",
  alphabetMap: [
    { letter: "A", pos: 1 }, { letter: "B", pos: 2 }, { letter: "C", pos: 3 }, { letter: "D", pos: 4 },
    { letter: "E", pos: 5 }, { letter: "F", pos: 6 }, { letter: "G", pos: 7 }, { letter: "H", pos: 8 },
    { letter: "I", pos: 9 }, { letter: "J", pos: 10 }, { letter: "K", pos: 11 }, { letter: "L", pos: 12 },
    { letter: "M", pos: 13 }, { letter: "N", pos: 14 }, { letter: "O", pos: 15 }, { letter: "P", pos: 16 },
    { letter: "Q", pos: 17 }, { letter: "R", pos: 18 }, { letter: "S", pos: 19 }, { letter: "T", pos: 20 },
    { letter: "U", pos: 21 }, { letter: "V", pos: 22 }, { letter: "W", pos: 23 }, { letter: "X", pos: 24 },
    { letter: "Y", pos: 25 }, { letter: "Z", pos: 26 }
  ],
  movementTypes: [
    {
      type: "Forward Movement (+Steps)",
      example: "A : C :: B : D",
      shift: "+2 steps",
      explanation: "A(pos 1) + 2 = C(pos 3). Similarly, B(pos 2) + 2 = D(pos 4)."
    },
    {
      type: "Extended Forward Movement (+Steps)",
      example: "C : F :: D : G",
      shift: "+3 steps",
      explanation: "C(pos 3) + 3 = F(pos 6). Similarly, D(pos 4) + 3 = G(pos 7)."
    },
    {
      type: "Backward Movement (-Steps)",
      example: "Z : X :: Y : W",
      shift: "-2 steps",
      explanation: "Z(pos 26) - 2 = X(pos 24). Similarly, Y(pos 25) - 2 = W(pos 23)."
    },
    {
      type: "Consecutive Adjacent Letters (+1)",
      example: "M : N :: P : Q",
      shift: "+1 step",
      explanation: "N immediately follows M in the alphabet. Similarly, Q immediately follows P."
    }
  ],
  stepByStepGuide: "Whenever you encounter a letter analogy, write down the position numbers immediately. Translating letters to numbers (e.g. C=3, F=6) turns an abstract alphabet question into simple math!"
};

// ==========================================
// SECTION 6: CAUSE-EFFECT AND RELATIONSHIP ANALOGIES
// ==========================================
export const section6Content = {
  title: "Cause-Effect and Relationship Analogies",
  concept: "Cause-and-effect analogies explore sequential conditions where one event, action, or state directly produces, leads to, or resolves another. These test practical understanding of real-world causality.",
  categories: [
    {
      category: "Cause and Direct Physical Effect",
      pair: "Rain : Wet Ground",
      explanation: "Rainfall directly causes the outdoor ground to become wet.",
      analogousPair: "Snow : Cold Ground"
    },
    {
      category: "Action and Desired Result",
      pair: "Exercise : Fitness",
      explanation: "Regular physical exercise results in improved body fitness.",
      analogousPair: "Studying : Learning / Knowledge"
    },
    {
      category: "Natural Condition and Emitted Property",
      pair: "Fire : Heat",
      explanation: "Combustion of fire naturally generates and radiates thermal heat.",
      analogousPair: "Sun : Light"
    },
    {
      category: "Problem and Solution / Remedy",
      pair: "Illness : Medicine",
      explanation: "Medicine is the targeted remedy designed to cure or manage an illness.",
      analogousPair: "Hunger : Food"
    },
    {
      category: "Physiological Need and Satisfying Response",
      pair: "Thirst : Water",
      explanation: "Drinking water directly satisfies the biological urge of thirst.",
      analogousPair: "Fatigue : Sleep"
    }
  ],
  criticalClarification: "Note on Causality: These represent common, direct, real-world relationships rather than absolute scientific universals in every possible condition. Always seek the most direct, standard causal link."
};

// ==========================================
// SECTION 7: HOW TO SOLVE ANALOGIES STEP BY STEP
// ==========================================
export const section7Content = {
  title: "How to Solve Analogies Step by Step",
  concept: "Mastering analogies is all about following a strict, disciplined mental protocol. Never guess by intuition alone. Use this tested 7-step checklist on every question.",
  checklistSteps: [
    { num: 1, title: "Read the Entire Analogy", desc: "Read all four elements (A, B, C, and the missing D) and all four options before deciding." },
    { num: 2, title: "Define the Primary Relationship", desc: "Look only at A and B. What connects them? Is it function, antonym, part-whole, or arithmetic?" },
    { num: 3, title: "Formulate a Bridge Sentence", desc: "Construct a clear sentence connecting A to B: 'A is an instrument used to perform B'." },
    { num: 4, title: "Substitute Item C into the Sentence", desc: "Replace A with C: 'C is an instrument used to perform ___'." },
    { num: 5, title: "Evaluate All 4 Options", desc: "Test each choice against your sentence. Does it create an accurate, truthful statement?" },
    { num: 6, title: "Check Direction & Order", desc: "Ensure you did not reverse the order (e.g. tool:user vs user:tool). The relationship order must match!" },
    { num: 7, title: "Confirm the Exact Logical Fit", desc: "Verify that the chosen answer has no ambiguity and fits the exact level of specificity." }
  ],
  fiveWorkedExamples: [
    {
      type: "1. Word Analogy (Parent & Offspring)",
      question: "Cow : Calf :: Dog : ?",
      options: ["Puppy", "Kitten", "Lamb", "Cub"],
      answer: "Puppy",
      step1: "Identify relation: A calf is the young offspring of a cow.",
      step2: "Bridge sentence: 'A [B] is the baby or young offspring of a [A]'.",
      step3: "Apply to Dog: 'A ___ is the baby or young offspring of a Dog'.",
      step4: "Check options: A puppy is a young dog; a kitten is a cat; a lamb is a sheep; a cub is a lion/bear.",
      conclusion: "Therefore, Puppy is the only logically correct match."
    },
    {
      type: "2. Number Analogy (Squares)",
      question: "6 : 36 :: 8 : ?",
      options: ["48", "56", "64", "72"],
      answer: "64",
      step1: "Identify relation: 6 × 6 = 36 (the second number is the square of the first number).",
      step2: "Bridge sentence: 'The second number equals the first number multiplied by itself'.",
      step3: "Apply to 8: 8 × 8 = 64.",
      step4: "Check options: 48 (8×6), 56 (8×7), 64 (8²), 72 (8×9).",
      conclusion: "64 is the exact square of 8."
    },
    {
      type: "3. Letter Analogy (Positional Gap +2)",
      question: "K : M :: P : ?",
      options: ["Q", "R", "S", "T"],
      answer: "R",
      step1: "Convert letters to numbers: K = 11, M = 13.",
      step2: "Calculate shift: 13 - 11 = +2 positions (skipping letter L).",
      step3: "Apply shift to P: P = position 16. 16 + 2 = 18.",
      step4: "Convert 18 back to alphabet: Position 18 corresponds to R (skipping letter Q).",
      conclusion: "R completes the +2 positional movement."
    },
    {
      type: "4. Object-Function Analogy (Tool & Cut Material)",
      question: "Scissors : Cloth :: Axe : ?",
      options: ["Tree / Wood", "Metal", "Plastic", "Stone"],
      answer: "Tree / Wood",
      step1: "Identify relation: Scissors are a hand cutting tool specifically used to cut cloth/fabric.",
      step2: "Bridge sentence: 'Scissors are used by craftsmen to cut cloth'.",
      step3: "Apply to Axe: 'An axe is a heavy cutting tool used to chop wood/trees'.",
      step4: "Check options: Axes are not designed to cut stone or metal; they chop wood.",
      conclusion: "Tree / Wood is the specific target material."
    },
    {
      type: "5. Part-Whole Analogy (Rotating Component)",
      question: "Wheel : Bicycle :: Blade : ?",
      options: ["Ceiling Fan", "Table", "Door", "Window"],
      answer: "Ceiling Fan",
      step1: "Identify relation: A wheel is the essential rotating constituent part of a bicycle.",
      step2: "Bridge sentence: 'A wheel is an indispensable rotating part of a bicycle'.",
      step3: "Apply to Blade: 'A blade is an indispensable rotating part of a ceiling fan'.",
      step4: "Check options: Tables, doors, and windows do not have rotating blades.",
      conclusion: "Ceiling Fan is the exact matching whole system."
    }
  ]
};

// ==========================================
// SECTION 8: QUICK REVISION & CHECKLIST
// ==========================================
export const day5Revision = {
  title: "Day 5 Quick Revision & Key Relationship Takeaways",
  subtitle: "Review these 10 core concepts and complete the 5 self-check questions before launching the practice quiz:",
  tenTakeaways: [
    { title: "1. Core Definition", text: "An analogy pairs two relationships that share an identical logical structure: A : B :: C : D." },
    { title: "2. Synonyms & Antonyms", text: "Look out for words that have identical meanings (Huge : Gigantic) or direct opposites (Hot : Cold)." },
    { title: "3. Category & Member", text: "General category to specific specimen (Fruit : Apple, Mammal : Whale, Furniture : Chair)." },
    { title: "4. Object & Function", text: "What an object is built to do (Pen : Write, Knife : Cut, Shield : Protect)." },
    { title: "5. Tool & User", text: "The primary tool associated with a professional (Stethoscope : Doctor, Brush : Painter)." },
    { title: "6. Part & Whole", text: "A component piece of a larger integrated unit (Page : Book, Wheel : Car, Brick : Wall)." },
    { title: "7. Number Patterns", text: "Check basic operations first: doubling, halving, multiplication, squares (3²=9, 4²=16)." },
    { title: "8. Alphabet Positions", text: "Convert letters to 1–26 numbers to easily calculate forward and backward step shifts (+2, +3, -2)." },
    { title: "9. Cause and Effect", text: "Real-world causality where an event or action directly produces a consequence (Rain : Wet Ground, Exercise : Fitness)." },
    { title: "10. Consistency is King", text: "The direction, part of speech, and relationship depth must mirror the first pair without exception." }
  ],
  revisionQuestions: [
    {
      q: "Revision 1: Thermometer : Temperature :: Speedometer : ?",
      ans: "Speed",
      exp: "A thermometer measures temperature. A speedometer measures vehicular speed."
    },
    {
      q: "Revision 2: 4 : 16 :: 5 : ?",
      ans: "25",
      exp: "The second number is the square of the first: 4² = 16, so 5² = 25."
    },
    {
      q: "Revision 3: Light : Dark :: Peace : ?",
      ans: "War",
      exp: "Light and Dark are direct antonyms. Peace and War are direct antonyms."
    },
    {
      q: "Revision 4: Chapter : Book :: Room : ?",
      ans: "House",
      exp: "A chapter is a constituent structural part of a book. A room is a constituent structural part of a house."
    },
    {
      q: "Revision 5: Drought : Famine :: Heavy Rain : ?",
      ans: "Flood",
      exp: "Drought causes severe shortage of food (famine). Excessive heavy rainfall directly causes a flood."
    }
  ]
};

// ==========================================
// PRACTICE QUIZ: EXACTLY 20 UNIQUE QUESTIONS
// Q1-Q5: Easy
// Q6-Q12: Easy-to-Moderate
// Q13-Q17: Moderate
// Q18-Q20: Applied Reasoning & Mixed
// ==========================================
export const day5PracticeQuestions = [
  {
    id: "d5_q1",
    question: "Fruit : Apple :: Vegetable : ?",
    options: ["Carrot", "Milk", "Bread", "Grape"],
    correctAnswer: 0, // Carrot
    difficulty: "Easy",
    topic: "Category and Member",
    explanation: "An apple is a specific member of the fruit category. In the same way, a carrot is a specific member of the vegetable category.",
    distractorNotes: "Milk is dairy, bread is bakery, and grape is another fruit."
  },
  {
    id: "d5_q2",
    question: "Fast : Quick :: Big : ?",
    options: ["Tiny", "Large", "Slow", "Heavy"],
    correctAnswer: 1, // Large
    difficulty: "Easy",
    topic: "Synonyms",
    explanation: "Fast and Quick are synonyms with identical meanings. Big and Large are also synonyms denoting large physical size.",
    distractorNotes: "Tiny and Slow are antonyms; Heavy refers to weight rather than overall size."
  },
  {
    id: "d5_q3",
    question: "Pen : Write :: Knife : ?",
    options: ["Read", "Cut", "Paint", "Stitch"],
    correctAnswer: 1, // Cut
    difficulty: "Easy",
    topic: "Object and Function",
    explanation: "A pen is an instrument designed for writing. A knife is an instrument designed for cutting.",
    distractorNotes: "Reading, painting, and stitching use eyes, brushes, and needles, respectively."
  },
  {
    id: "d5_q4",
    question: "4 : 8 :: 7 : ?",
    options: ["12", "14", "21", "28"],
    correctAnswer: 1, // 14
    difficulty: "Easy",
    topic: "Number Analogy (Doubling)",
    explanation: "The second number is double the first number (4 × 2 = 8). Applying the same doubling operation to 7 gives 7 × 2 = 14.",
    distractorNotes: "12 is 4×3, 21 is 7×3, and 28 is 7×4."
  },
  {
    id: "d5_q5",
    question: "Teacher : School :: Chef : ?",
    options: ["Library", "Kitchen", "Courtroom", "Hospital"],
    correctAnswer: 1, // Kitchen
    difficulty: "Easy",
    topic: "Worker and Workplace",
    explanation: "A teacher's primary occupational workplace is a school. In the same way, a chef's primary workplace is a commercial kitchen or restaurant.",
    distractorNotes: "Librarians work in libraries, lawyers in courtrooms, and doctors in hospitals."
  },
  {
    id: "d5_q6",
    question: "Wheel : Bicycle :: Blade : ?",
    options: ["Engine", "Ceiling Fan", "Brake", "Handle"],
    correctAnswer: 1, // Ceiling Fan
    difficulty: "Easy-to-Moderate",
    topic: "Part and Whole",
    explanation: "A wheel is an essential rotating constituent part of a bicycle. In the same way, a blade is an essential rotating constituent part of a ceiling fan.",
    distractorNotes: "Engine, brake, and handle are other mechanical parts, but Ceiling Fan is the whole apparatus."
  },
  {
    id: "d5_q7",
    question: "Ancient : Modern :: Permanent : ?",
    options: ["Durable", "Temporary", "Solid", "Eternal"],
    correctAnswer: 1, // Temporary
    difficulty: "Easy-to-Moderate",
    topic: "Antonyms",
    explanation: "Ancient (very old) and Modern (contemporary) are direct antonyms. Permanent (lasting forever) and Temporary (lasting for a limited time) are direct antonyms.",
    distractorNotes: "Durable, Solid, and Eternal are synonyms or related to permanence, not opposites."
  },
  {
    id: "d5_q8",
    question: "A : C :: E : ?",
    options: ["F", "G", "H", "I"],
    correctAnswer: 1, // G
    difficulty: "Easy-to-Moderate",
    topic: "Alphabet Analogy (+2 Steps)",
    explanation: "A is position 1 and C is position 3 (a forward shift of +2 positions, skipping B). E is position 5, so shifting +2 positions gives position 7, which is letter G (skipping F).",
    distractorNotes: "F is +1, H is +3, and I is +4."
  },
  {
    id: "d5_q9",
    question: "Rain : Mud :: Sun : ?",
    options: ["Darkness", "Heat", "Cold", "Snow"],
    correctAnswer: 1, // Heat
    difficulty: "Easy-to-Moderate",
    topic: "Cause and Effect",
    explanation: "Rain falling onto the ground directly causes mud. In the same way, sunlight shining directly causes heat and warmth.",
    distractorNotes: "Darkness, cold, and snow are opposite to sunlight's natural effects."
  },
  {
    id: "d5_q10",
    question: "Telescope : Astronomer :: Microscope : ?",
    options: ["Novelist", "Biologist", "Pilot", "Mechanic"],
    correctAnswer: 1, // Biologist
    difficulty: "Easy-to-Moderate",
    topic: "Tool and User",
    explanation: "An astronomer uses a telescope to study celestial bodies. A biologist uses a microscope to study tiny microorganisms and cells.",
    distractorNotes: "Novelists write books, pilots fly planes, and mechanics repair machinery."
  },
  {
    id: "d5_q11",
    question: "5 : 25 :: 8 : ?",
    options: ["40", "56", "64", "72"],
    correctAnswer: 2, // 64
    difficulty: "Easy-to-Moderate",
    topic: "Number Analogy (Squares)",
    explanation: "The second number is the square of the first number (5² = 5 × 5 = 25). Applying the same square rule to 8 gives 8² = 8 × 8 = 64.",
    distractorNotes: "40 is 8×5, 56 is 8×7, and 72 is 8×9."
  },
  {
    id: "d5_q12",
    question: "Dog : Puppy :: Cat : ?",
    options: ["Foal", "Kitten", "Cub", "Calf"],
    correctAnswer: 1, // Kitten
    difficulty: "Easy-to-Moderate",
    topic: "Animal and Offspring",
    explanation: "A puppy is the young offspring of a dog. In the same way, a kitten is the young offspring of a cat.",
    distractorNotes: "A foal is a young horse, a cub is a young bear/lion, and a calf is a young cow."
  },
  {
    id: "d5_q13",
    question: "B : E :: K : ?",
    options: ["M", "N", "O", "P"],
    correctAnswer: 1, // N
    difficulty: "Moderate",
    topic: "Alphabet Analogy (+3 Steps)",
    explanation: "B is position 2 and E is position 5 (an increment of +3 positions: 2 + 3 = 5). K is position 11. Adding +3 positions gives 11 + 3 = 14, which corresponds to letter N.",
    distractorNotes: "M is position 13 (+2), O is position 15 (+4), and P is position 16 (+5)."
  },
  {
    id: "d5_q14",
    question: "24 : 8 :: 36 : ?",
    options: ["12", "18", "9", "16"],
    correctAnswer: 0, // 12
    difficulty: "Moderate",
    topic: "Number Analogy (Division by 3)",
    explanation: "The first number is divided by 3 to produce the second number (24 ÷ 3 = 8). Applying the exact same division rule to 36 yields 36 ÷ 3 = 12.",
    distractorNotes: "18 is 36÷2 (halving), 9 is 36÷4, and 16 is incorrect subtraction."
  },
  {
    id: "d5_q15",
    question: "Paper : Wood Pulp :: Bread : ?",
    options: ["Wheat Flour", "Sugar", "Butter", "Oven"],
    correctAnswer: 0, // Wheat Flour
    difficulty: "Moderate",
    topic: "Product and Primary Raw Material",
    explanation: "Paper is manufactured primarily from wood pulp as its foundational raw material. In the same way, bread is baked primarily from wheat flour as its main ingredient.",
    distractorNotes: "Sugar and butter are minor optional additives; an oven is an appliance, not a raw ingredient."
  },
  {
    id: "d5_q16",
    question: "Z : X :: T : ?",
    options: ["R", "S", "U", "V"],
    correctAnswer: 0, // R
    difficulty: "Moderate",
    topic: "Alphabet Analogy (-2 Steps Backward)",
    explanation: "Z is position 26 and X is position 24 (a backward step of -2 positions: 26 - 2 = 24). T is position 20. Stepping backward by -2 gives 20 - 2 = 18, which is letter R.",
    distractorNotes: "S is -1, U is +1, and V is +2."
  },
  {
    id: "d5_q17",
    question: "Clock : Time :: Thermometer : ?",
    options: ["Pressure", "Temperature", "Humidity", "Speed"],
    correctAnswer: 1, // Temperature
    difficulty: "Moderate",
    topic: "Instrument and Measurement",
    explanation: "A clock is a scientific device specifically designed to measure time. A thermometer is a device specifically designed to measure temperature.",
    distractorNotes: "Pressure is measured by a barometer, humidity by a hygrometer, and speed by a speedometer."
  },
  {
    id: "d5_q18",
    question: "Darkness : Lamp :: Illness : ?",
    options: ["Hospital", "Medicine", "Doctor", "Symptom"],
    correctAnswer: 1, // Medicine
    difficulty: "Applied Reasoning",
    topic: "Problem and Remedial Solution",
    explanation: "A lamp is the direct physical remedy that counteracts and dispels darkness. In the same way, medicine is the direct remedial substance administered to treat and cure an illness.",
    distractorNotes: "A doctor is the practitioner and hospital is the facility; neither is the direct curative remedy itself."
  },
  {
    id: "d5_q19",
    question: "3 : 10 :: 5 : ?",
    options: ["24", "25", "26", "27"],
    correctAnswer: 2, // 26
    difficulty: "Applied Reasoning",
    topic: "Number Analogy (n : n² + 1)",
    explanation: "The relationship formula connecting the first pair is n : (n² + 1). For 3: 3² + 1 = 9 + 1 = 10. Applying the exact same formula to 5: 5² + 1 = 25 + 1 = 26.",
    distractorNotes: "25 is simply 5² without adding 1; 24 is 5² - 1; 27 is 3³."
  },
  {
    id: "d5_q20",
    question: "Key : Lock :: Password : ?",
    options: ["Computer", "User Account", "Monitor", "Keyboard"],
    correctAnswer: 1, // User Account
    difficulty: "Applied Reasoning",
    topic: "Access Mechanism and Secured Entity",
    explanation: "A physical key provides authorized unlock access into a physical lock. In modern digital systems, a password provides authorized authentication access into a protected user account.",
    distractorNotes: "A computer, monitor, and keyboard are physical hardware devices; the password protects the digital user account specifically."
  }
];
