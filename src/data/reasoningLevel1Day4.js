/**
 * SPOKO Logical Reasoning - Level 1, Day 4: Classification and Odd One Out
 * Comprehensive lesson data, worked examples, interactive classification models, and 20 practice questions.
 */

// ==========================================
// DAY 4 OVERVIEW & LEARNING OBJECTIVES
// ==========================================
export const day4Overview = {
  dayNumber: 4,
  level: "Level 1: Beginner",
  course: "Logical Reasoning & Analytical Thinking",
  title: "Classification and Odd One Out",
  duration: "45–60 mins",
  difficulty: "Beginner",
  description: "Master the art of grouping items by shared properties and identifying the one element that breaks the rule across words, numbers, letters, shapes, symbols, and practical workplace scenarios.",
  objectives: [
    "Understand the core principle of classification in logical reasoning.",
    "Identify common properties and relationships uniting a group of items.",
    "Systematically pinpoint the odd item out with defensible rationale.",
    "Classify words by meaning, category, function, and living vs non-living.",
    "Classify numbers using even/odd, prime, square, cube, and divisibility rules.",
    "Analyze letter groups using alphabetical positions, vowels, and interval gaps.",
    "Categorize visual shapes and symbols by sides, vertices, and patterns.",
    "Apply the 7-step Odd-One-Out strategy to solve aptitude questions with speed."
  ],
  stats: {
    totalSections: 7,
    practiceQuestions: 20,
    passingScore: "70% (14 / 20)",
    estimatedReadTime: "25 mins"
  }
};

// ==========================================
// SECTION 1: INTRODUCTION TO CLASSIFICATION
// ==========================================
export const section1Content = {
  title: "Introduction to Classification",
  concept: "Classification is the mental process of grouping items that share a common property, feature, or relationship. Once you identify what unites three of the items, the fourth item that does not share that property is automatically the 'Odd One Out'!",
  goldenRule: "Always define the COMMON PROPERTY of the majority first. Never pick an answer just because it 'feels different' without naming the exact rule that connects the other three!",
  examples: [
    {
      id: "sec1_ex1",
      items: ["Apple", "Mango", "Banana", "Carrot"],
      oddItem: "Carrot",
      commonFeature: "Fruits that grow on trees/plants",
      explanation: "Apple, Mango, and Banana are sweet fruits. Carrot is a root vegetable. Therefore, Carrot is the odd one out."
    },
    {
      id: "sec1_ex2",
      items: ["Dog", "Cat", "Cow", "Rose"],
      oddItem: "Rose",
      commonFeature: "Domestic animals (living mammals)",
      explanation: "Dog, Cat, and Cow are four-legged animals. Rose is a flowering plant. Therefore, Rose is the odd one out."
    },
    {
      id: "sec1_ex3",
      items: ["Bus", "Car", "Train", "Table"],
      oddItem: "Table",
      commonFeature: "Vehicles used for passenger transportation",
      explanation: "Bus, Car, and Train are passenger transport vehicles. Table is a piece of wooden furniture. Therefore, Table is the odd one out."
    }
  ]
};

// ==========================================
// SECTION 2: WORD CLASSIFICATION
// ==========================================
export const section2Content = {
  title: "Word Classification",
  concept: "Word classification tests your vocabulary and conceptual grouping. Words can be classified based on meaning, category, function, profession, food, tools, or biological traits.",
  categoriesList: [
    { name: "Professions vs Places", rule: "Roles (Doctor, Nurse, Chef) vs Facilities (Hospital, Kitchen)" },
    { name: "Clothing vs Utensils", rule: "Wearable garments (Shirt, Jacket) vs Tools (Fork, Spoon)" },
    { name: "Living vs Non-Living", rule: "Biological organisms vs inanimate manufactured goods" },
    { name: "Anatomy & Organs", rule: "External body parts (Eye, Nose) vs Internal organs (Liver, Heart)" }
  ],
  examples: [
    {
      id: "sec2_ex1",
      items: ["Doctor", "Nurse", "Teacher", "Hospital"],
      oddItem: "Hospital",
      commonGroup: "Human professions and occupational roles",
      explanation: "Doctor, Nurse, and Teacher are professionals who provide services. Hospital is a physical building/institution. Hospital is the odd one out."
    },
    {
      id: "sec2_ex2",
      items: ["Shirt", "Trousers", "Jacket", "Spoon"],
      oddItem: "Spoon",
      commonGroup: "Articles of clothing / wearable apparel",
      explanation: "Shirt, Trousers, and Jacket are garments worn on the human body. Spoon is an eating utensil. Spoon is the odd one out."
    },
    {
      id: "sec2_ex3",
      items: ["Tiger", "Lion", "Leopard", "Elephant"],
      oddItem: "Elephant",
      commonGroup: "Carnivorous big cats (feline predators)",
      explanation: "Tiger, Lion, and Leopard belong to the big cat family (Felidae) and are carnivores. Elephant is an herbivore with a trunk. Elephant is the odd one out."
    }
  ]
};

// ==========================================
// SECTION 3: NUMBER CLASSIFICATION
// ==========================================
export const section3Content = {
  title: "Number Classification",
  concept: "Number classification tests mathematical relationships. In competitive exams, numbers are grouped by properties like even/odd, prime vs composite, perfect squares, perfect cubes, or common divisibility.",
  numberRules: [
    { rule: "Even vs. Odd", clue: "Even numbers end in 0, 2, 4, 6, 8. Odd numbers end in 1, 3, 5, 7, 9." },
    { rule: "Prime vs. Composite", clue: "Primes have exactly two factors (1 and itself). Composites can be divided by other numbers." },
    { rule: "Squares & Cubes", clue: "Squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Cubes: 1, 8, 27, 64, 125, 216." },
    { rule: "Multiples & Divisibility", clue: "Check if all numbers share a common divisor (e.g. all divisible by 5 or 7)." }
  ],
  examples: [
    {
      id: "sec3_ex1",
      items: ["2", "4", "6", "9"],
      oddItem: "9",
      property: "Even numbers divisible by 2",
      explanation: "2, 4, and 6 are even numbers. 9 is an odd number. Therefore, 9 is the odd one out."
    },
    {
      id: "sec3_ex2",
      items: ["3", "5", "7", "9"],
      oddItem: "9",
      property: "Prime numbers (only factors are 1 and themselves)",
      explanation: "3, 5, and 7 are prime numbers. 9 is a composite number because 3 × 3 = 9. Therefore, 9 is the odd one out."
    },
    {
      id: "sec3_ex3",
      items: ["4", "9", "16", "20"],
      oddItem: "20",
      property: "Perfect squares of integers (2², 3², 4²)",
      explanation: "4 (2²), 9 (3²), and 16 (4²) are perfect squares. 20 is not a perfect square. Therefore, 20 is the odd one out."
    }
  ]
};

// ==========================================
// SECTION 4: ALPHABET CLASSIFICATION
// ==========================================
export const section4Content = {
  title: "Alphabet Classification",
  concept: "In alphabet classification, letter groups are evaluated by vowel/consonant status, alphabetical positions (A=1 to Z=26), even/odd positions, or fixed distance intervals between letters.",
  goldenRule: "Convert letters into their numerical positions immediately. Once converted, test for even/odd positions, consecutive pairs, or fixed gap steps!",
  examples: [
    {
      id: "sec4_ex1",
      items: ["A", "E", "I", "B"],
      oddItem: "B",
      ruleApplied: "Vowels (A, E, I, O, U) vs Consonants",
      explanation: "A, E, and I are English vowels. B is a consonant. Therefore, B is the odd one out."
    },
    {
      id: "sec4_ex2",
      items: ["AB", "CD", "EF", "GI"],
      oddItem: "GI",
      ruleApplied: "Consecutive letter pairs (step difference of +1)",
      explanation: "A→B (+1), C→D (+1), E→F (+1) are adjacent consecutive letters. G(7) to I(9) skips letter H (+2 step). Therefore, GI is the odd one out."
    },
    {
      id: "sec4_ex3",
      items: ["B", "D", "F", "G"],
      oddItem: "G",
      ruleApplied: "Even numerical positions in the alphabet",
      explanation: "B is position 2, D is position 4, and F is position 6 (all even). G is position 7 (odd number). Therefore, G is the odd one out."
    }
  ]
};

// ==========================================
// SECTION 5: SHAPE AND SYMBOL CLASSIFICATION
// ==========================================
export const section5Content = {
  title: "Shape and Symbol Classification",
  concept: "Shape and symbol classification evaluates visual geometric features such as straight sides, sharp corners (vertices), curved outlines, filled vs unfilled bodies, or symbol quantity.",
  examples: [
    {
      id: "sec5_ex1",
      items: ["Triangle (3 sides)", "Square (4 sides)", "Pentagon (5 sides)", "Circle (0 straight sides)"],
      oddItem: "Circle",
      feature: "Straight-sided polygons with sharp corners",
      explanation: "Triangle, Square, and Pentagon are rectilinear polygons with straight edges and corners. A circle is a smooth continuous curve with no straight sides or vertices. Circle is the odd one out."
    },
    {
      id: "sec5_ex2",
      items: ["★ (Star)", "★ (Star)", "● (Circle)", "★ (Star)"],
      oddItem: "● (Circle)",
      feature: "Star-shaped five-pointed symbols (★)",
      explanation: "Three of the symbols are stars (★), while one symbol is a filled circle (●). Therefore, the circle is the odd one out."
    },
    {
      id: "sec5_ex3",
      items: ["Square (4 sides)", "Rectangle (4 sides)", "Rhombus (4 sides)", "Triangle (3 sides)"],
      oddItem: "Triangle",
      feature: "Four-sided quadrilaterals",
      explanation: "Square, Rectangle, and Rhombus all have exactly 4 sides. A triangle has only 3 sides. Therefore, Triangle is the odd one out."
    }
  ]
};

// ==========================================
// SECTION 6: EVERYDAY AND PRACTICAL CLASSIFICATION
// ==========================================
export const section6Content = {
  title: "Everyday and Practical Classification",
  concept: "Aptitude tests love practical classification problems based on familiar student, office, and business environments. These test your common sense and practical categorization skills.",
  examples: [
    {
      id: "sec6_ex1",
      items: ["Laptop", "Keyboard", "Mouse", "Notebook"],
      oddItem: "Notebook",
      intendedCategory: "Electronic computer hardware and peripherals",
      explanation: "Laptop, Keyboard, and Mouse are electronic computing devices. A notebook is paper stationery. Therefore, Notebook is the odd one out."
    },
    {
      id: "sec6_ex2",
      items: ["Invoice", "Receipt", "Bill", "Mango"],
      oddItem: "Mango",
      intendedCategory: "Financial and commercial transaction records",
      explanation: "An Invoice, Receipt, and Bill are financial accounting documents. Mango is an edible tropical fruit. Therefore, Mango is the odd one out."
    },
    {
      id: "sec6_ex3",
      items: ["Python", "Java", "HTML", "Bicycle"],
      oddItem: "Bicycle",
      intendedCategory: "Software programming and web technologies",
      explanation: "Python, Java, and HTML are computer software and web technologies. A bicycle is a two-wheeled physical vehicle. Therefore, Bicycle is the odd one out."
    }
  ]
};

// ==========================================
// SECTION 7: HOW TO SOLVE ODD-ONE-OUT QUESTIONS
// ==========================================
export const section7Content = {
  title: "The 7-Step Strategy for Odd-One-Out Questions",
  concept: "Follow this proven 7-step checklist to solve any classification question with 100% certainty and avoid falling into trap answers.",
  steps: [
    { num: 1, title: "Read All 4 Options First", desc: "Never rush into picking the first option that looks strange. Read all four options completely." },
    { num: 2, title: "Find the Common Feature", desc: "Ask: 'What do at least three of these items share?' (e.g. all fruits, all primes, all even positions)." },
    { num: 3, title: "Compare Across That Exact Feature", desc: "Check if three items strictly satisfy the rule while the fourth item clearly violates it." },
    { num: 4, title: "Eliminate Vague / Weak Rules", desc: "Avoid subjective reasons like 'I don't like it' or 'it is longer'. The rule must be an objective factual truth." },
    { num: 5, title: "Test Alternative Interpretations", desc: "If two items could both be odd under different rules, look for the most standard, intended categorization." },
    { num: 6, title: "Confirm the Remaining Trio", desc: "Ensure that the three remaining items form a cohesive, tight group without exceptions." },
    { num: 7, title: "State the Reason in One Clear Sentence", desc: "If you can clearly state: 'X is odd because A, B, and C are all [Property], but X is [Different]', you have found the correct answer!" }
  ],
  workedStrategyExamples: [
    {
      question: "Which number does not belong: 14, 21, 28, 32?",
      step1: "Observe numbers: 14, 21, 28, 32.",
      step2: "Notice factors: 14 = 7×2, 21 = 7×3, 28 = 7×4.",
      step3: "Check 32: 32 is not divisible by 7 (7×4=28, 7×5=35).",
      answer: "32",
      explanation: "14, 21, and 28 are multiples of 7. 32 is not a multiple of 7."
    },
    {
      question: "Which word does not belong: Copper, Silver, Gold, Plastic?",
      step1: "Observe materials: Copper, Silver, Gold, Plastic.",
      step2: "Common property: Copper, Silver, and Gold are metallic chemical elements that conduct electricity.",
      step3: "Check Plastic: Plastic is a synthetic polymer and an electrical insulator.",
      answer: "Plastic",
      explanation: "Copper, Silver, and Gold are natural metals; Plastic is a synthetic non-metal."
    },
    {
      question: "Which letter pair does not belong: PR, MO, TV, XZ?",
      step1: "Convert to numbers: PR (16, 18), MO (13, 15), TV (20, 22), XZ (24, 26).",
      step2: "Check difference: PR is +2, TV is +2, XZ is +2. Wait, MO is 13 to 15 which is also +2!",
      step3: "Check positions: P(16), R(18), T(20), V(22), X(24), Z(26) are all EVEN alphabet positions. MO has M(13) and O(15) which are ODD positions!",
      answer: "MO",
      explanation: "In PR, TV, and XZ, both letters occupy even alphabetical positions. In MO, both letters occupy odd positions."
    }
  ]
};

// ==========================================
// SECTION 8: QUICK REVISION & CHECKLIST
// ==========================================
export const day4Revision = {
  title: "Day 4 Quick Revision & Mental Checklists",
  subtitle: "Keep these 6 classification rules sharp before tackling the 20-question practice assessment:",
  checklist: [
    { id: "rev1", category: "Word Categories", rule: "Classify by biological nature, physical function, profession vs facility, or tools vs clothing." },
    { id: "rev2", category: "Number Properties", rule: "Check Even/Odd, Prime vs Composite, Perfect Squares/Cubes, and Common Multiples." },
    { id: "rev3", category: "Alphabet Relations", rule: "Check Vowels vs Consonants, Even/Odd positions, consecutive steps, or interval gaps." },
    { id: "rev4", category: "Shape Characteristics", rule: "Count straight edges, sharp vertices, curved lines, or dimensional planes." },
    { id: "rev5", category: "Everyday Workplaces", rule: "Separate digital vs physical, software vs hardware, and official documents vs casual items." },
    { id: "rev6", category: "Single Defensible Rule", rule: "Always ensure the 3 remaining items fit a clean, indisputable shared definition." }
  ],
  revisionQuestions: [
    {
      q: "Revision 1: Which is odd: Zinc, Iron, Lead, Wood?",
      ans: "Wood",
      exp: "Zinc, Iron, and Lead are chemical metals; Wood is an organic non-metal plant material."
    },
    {
      q: "Revision 2: Which is odd: 13, 17, 19, 27?",
      ans: "27",
      exp: "13, 17, and 19 are prime numbers; 27 is composite (3 × 9 = 27)."
    },
    {
      q: "Revision 3: Which is odd: E, I, O, T?",
      ans: "T",
      exp: "E, I, and O are vowels; T is a consonant."
    },
    {
      q: "Revision 4: Which is odd: Cube, Sphere, Cylinder, Square?",
      ans: "Square",
      exp: "Cube, Sphere, and Cylinder are 3-dimensional solid shapes; Square is a 2-dimensional flat shape."
    },
    {
      q: "Revision 5: Which is odd: Email, Slack, Teams, Stapler?",
      ans: "Stapler",
      exp: "Email, Slack, and Teams are digital communication tools; Stapler is a physical office stationery tool."
    }
  ]
};

// ==========================================
// PRACTICE QUIZ: EXACTLY 20 UNIQUE QUESTIONS
// Q1-Q5: Easy
// Q6-Q12: Easy-to-Moderate
// Q13-Q17: Moderate
// Q18-Q20: Applied Reasoning
// ==========================================
export const day4PracticeQuestions = [
  {
    id: "d4_q1",
    question: "Which item does NOT belong with the others in the group?",
    options: ["Apple", "Carrot", "Banana", "Orange"],
    correctAnswer: 1, // Carrot
    difficulty: "Easy",
    topic: "Word Classification",
    explanation: "Carrot is a root vegetable; Apple, Banana, and Orange are all edible fruits.",
    distractorNotes: "Apple, Banana, and Orange share the common property of being fruits."
  },
  {
    id: "d4_q2",
    question: "Which number is the odd one out?",
    options: ["15", "4", "8", "12"],
    correctAnswer: 0, // 15
    difficulty: "Easy",
    topic: "Number Classification",
    explanation: "4, 8, and 12 are even numbers (multiples of 2). 15 is an odd number.",
    distractorNotes: "4, 8, and 12 are all divisible by 2 and 4."
  },
  {
    id: "d4_q3",
    question: "Which letter does NOT belong to the group?",
    options: ["A", "E", "K", "I"],
    correctAnswer: 2, // K
    difficulty: "Easy",
    topic: "Alphabet Classification",
    explanation: "A, E, and I are English vowels. K is a consonant.",
    distractorNotes: "A, E, and I belong to the standard 5-vowel set (A, E, I, O, U)."
  },
  {
    id: "d4_q4",
    question: "Which shape is different from the others?",
    options: ["Triangle", "Circle", "Rectangle", "Pentagon"],
    correctAnswer: 1, // Circle
    difficulty: "Easy",
    topic: "Shape Classification",
    explanation: "Triangle (3 sides), Rectangle (4 sides), and Pentagon (5 sides) are polygons with straight edges and corners. A circle has 0 straight sides and 0 corners.",
    distractorNotes: "All other choices are rectilinear polygons."
  },
  {
    id: "d4_q5",
    question: "Which item does NOT belong in a computer workstation setup?",
    options: ["Monitor", "Keyboard", "Pillow", "Mouse"],
    correctAnswer: 2, // Pillow
    difficulty: "Easy",
    topic: "Everyday Classification",
    explanation: "Monitor, Keyboard, and Mouse are computer workstation hardware peripherals. A pillow is bedroom bedding.",
    distractorNotes: "Monitor, keyboard, and mouse are standard desktop computing components."
  },
  {
    id: "d4_q6",
    question: "Which number is the odd one out?",
    options: ["21", "11", "13", "17"],
    correctAnswer: 0, // 21
    difficulty: "Easy-to-Moderate",
    topic: "Number Classification",
    explanation: "11, 13, and 17 are prime numbers (divisible only by 1 and themselves). 21 is a composite number divisible by 3 and 7 (3 × 7 = 21).",
    distractorNotes: "11, 13, and 17 have no factors other than 1 and themselves."
  },
  {
    id: "d4_q7",
    question: "Which word does NOT belong to the group?",
    options: ["Doctor", "Clinic", "Nurse", "Pharmacist"],
    correctAnswer: 1, // Clinic
    difficulty: "Easy-to-Moderate",
    topic: "Word Classification",
    explanation: "Doctor, Nurse, and Pharmacist are human medical professionals. A clinic is a physical healthcare facility/place.",
    distractorNotes: "The first three are occupations; Clinic is a location."
  },
  {
    id: "d4_q8",
    question: "Which pair of letters is different from the others?",
    options: ["MN", "PQ", "WZ", "ST"],
    correctAnswer: 2, // WZ
    difficulty: "Easy-to-Moderate",
    topic: "Alphabet Classification",
    explanation: "MN, PQ, and ST are consecutive letter pairs (difference of +1). W to Z skips letters X and Y (+3 difference).",
    distractorNotes: "M→N, P→Q, S→T are immediate neighbours in the alphabet."
  },
  {
    id: "d4_q9",
    question: "Which shape is the odd one out based on the number of sides?",
    options: ["Hexagon", "Square", "Rectangle", "Rhombus"],
    correctAnswer: 0, // Hexagon
    difficulty: "Easy-to-Moderate",
    topic: "Shape Classification",
    explanation: "Square, Rectangle, and Rhombus are 4-sided quadrilaterals. A hexagon has 6 sides.",
    distractorNotes: "Square, rectangle, and rhombus all share the exact property of having 4 sides."
  },
  {
    id: "d4_q10",
    question: "Which item is the odd one out?",
    options: ["Invoice", "Receipt", "Badminton Racket", "Purchase Order"],
    correctAnswer: 2, // Badminton Racket
    difficulty: "Easy-to-Moderate",
    topic: "Everyday Classification",
    explanation: "Invoice, Receipt, and Purchase Order are commercial accounting/transaction documents. A badminton racket is sports equipment.",
    distractorNotes: "The first three are official business financial records."
  },
  {
    id: "d4_q11",
    question: "Which number is the odd one out?",
    options: ["16", "42", "25", "36"],
    correctAnswer: 1, // 42
    difficulty: "Easy-to-Moderate",
    topic: "Number Classification",
    explanation: "16 (4²), 25 (5²), and 36 (6²) are perfect squares of integers. 42 is not a perfect square.",
    distractorNotes: "4×4=16, 5×5=25, 6×6=36 are clean integer squares."
  },
  {
    id: "d4_q12",
    question: "Which animal does NOT belong with the others based on biological classification?",
    options: ["Shark", "Dolphin", "Whale", "Seal"],
    correctAnswer: 0, // Shark
    difficulty: "Easy-to-Moderate",
    topic: "Word Classification",
    explanation: "Dolphin, Whale, and Seal are marine mammals that breathe air with lungs and nurse their young. A shark is a cartilaginous fish that breathes through gills.",
    distractorNotes: "Dolphins, whales, and seals are warm-blooded mammals."
  },
  {
    id: "d4_q13",
    question: "Which number is different from the rest?",
    options: ["27", "64", "81", "125"],
    correctAnswer: 2, // 81
    difficulty: "Moderate",
    topic: "Number Classification",
    explanation: "27 (3³), 64 (4³), and 125 (5³) are perfect cubes of integers. 81 is a perfect square (9²) and fourth power (3⁴), but not a cube of an integer.",
    distractorNotes: "3×3×3=27, 4×4×4=64, 5×5×5=125 are perfect cubes."
  },
  {
    id: "d4_q14",
    question: "Which group of three letters does NOT follow the same rule?",
    options: ["UWZ", "ACE", "GIK", "PRT"],
    correctAnswer: 0, // UWZ
    difficulty: "Moderate",
    topic: "Alphabet Classification",
    explanation: "ACE (1, 3, 5), GIK (7, 9, 11), and PRT (16, 18, 20) all move forward by a steady step of +2. In UWZ, U(21) to W(23) is +2, but W(23) to Z(26) jumps by +3.",
    distractorNotes: "A(+2)C(+2)E, G(+2)I(+2)K, P(+2)R(+2)T all have identical +2 gaps."
  },
  {
    id: "d4_q15",
    question: "Which technology item does NOT belong with the others?",
    options: ["Python", "Google Chrome", "JavaScript", "C++"],
    correctAnswer: 1, // Google Chrome
    difficulty: "Moderate",
    topic: "Everyday Classification",
    explanation: "Python, JavaScript, and C++ are programming languages used to write software. Google Chrome is a web browser application used to browse the internet.",
    distractorNotes: "Python, JavaScript, and C++ are code languages."
  },
  {
    id: "d4_q16",
    question: "Look at these symbol groupings. Which group is the odd one out?",
    options: ["★★★ (3 Stars)", "●●● (3 Circles)", "▲▲▲ (3 Triangles)", "■■■■ (4 Squares)"],
    correctAnswer: 3, // 4 Squares
    difficulty: "Moderate",
    topic: "Shape & Symbol Classification",
    explanation: "The first three groups each contain exactly 3 symbols. The fourth group contains 4 squares.",
    distractorNotes: "Groups A, B, and C strictly share a quantity count of 3."
  },
  {
    id: "d4_q17",
    question: "Which number does NOT belong to the group based on divisibility?",
    options: ["35", "49", "63", "75"],
    correctAnswer: 3, // 75
    difficulty: "Moderate",
    topic: "Number Classification",
    explanation: "35 (7×5), 49 (7×7), and 63 (7×9) are multiples of 7. 75 is not divisible by 7 (75 ÷ 7 = 10 with remainder 5).",
    distractorNotes: "35, 49, and 63 are all in the 7 times table."
  },
  {
    id: "d4_q18",
    question: "Which item does NOT belong to the group based on physical and linguistic classification?",
    options: ["Thermometer", "Barometer", "Speedometer", "Diameter"],
    correctAnswer: 3, // Diameter
    difficulty: "Applied Reasoning",
    topic: "Word Classification",
    explanation: "Thermometer (measures heat), Barometer (measures air pressure), and Speedometer (measures velocity) are physical scientific instruments. Diameter is a geometric line/dimension property of a circle, not a physical instrument.",
    distractorNotes: "The first three are physical measuring gauges/devices ending in -meter."
  },
  {
    id: "d4_q19",
    question: "Which letter triplet has a different relationship from the others?",
    options: ["BDF", "HJL", "NPR", "TVY"],
    correctAnswer: 3, // TVY
    difficulty: "Applied Reasoning",
    topic: "Alphabet Classification",
    explanation: "BDF (2, 4, 6), HJL (8, 10, 12), and NPR (14, 16, 18) all progress with equal steps of +2 between consecutive letters. In TVY, T(20) to V(22) is +2, but V(22) to Y(25) jumps by +3.",
    distractorNotes: "In BDF, HJL, and NPR, the step difference between all adjacent letters is exactly +2."
  },
  {
    id: "d4_q20",
    question: "In a company audit, four assets are recorded. Which one is the odd one out based on asset classification?",
    options: ["Cloud Database Subscription", "Company Web Domain", "Mobile App Source Code", "Office Coffee Machine"],
    correctAnswer: 3, // Office Coffee Machine
    difficulty: "Applied Reasoning",
    topic: "Everyday Classification",
    explanation: "Cloud Database, Web Domain, and Mobile App Source Code are intangible digital software assets. The Office Coffee Machine is a tangible physical electrical appliance.",
    distractorNotes: "Options A, B, and C are digital/software assets."
  }
];
