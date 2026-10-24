/**
 * SPOKO Logical Reasoning - Level 1, Day 3: Alphabet & Symbol Patterns
 * Comprehensive course content, worked examples, interactive models, and 20 practice questions.
 */

// ==========================================
// DAY 3 OVERVIEW & LEARNING OBJECTIVES
// ==========================================
export const day3Overview = {
  dayNumber: 3,
  level: "Level 1: Beginner",
  course: "Logical Reasoning & Analytical Thinking",
  title: "Alphabet and Symbol Patterns",
  duration: "45–60 mins",
  difficulty: "Beginner",
  description: "Master alphabetical order (A=1 to Z=26), forward & backward letter shifts, alternating sequences, missing letter gaps, visual symbol patterns, and fundamental letter coding used in top aptitude tests.",
  objectives: [
    "Master the A–Z alphabetical positions (A=1 to Z=26) and reverse positions.",
    "Recognize forward patterns where letters advance by fixed increments (+1, +2, +3).",
    "Decode backward letter patterns moving in reverse order (−1, −2, −3).",
    "Deconstruct alternating sequences containing two separate interwoven letter tracks.",
    "Calculate gaps to pinpoint missing letters anywhere in a sequence.",
    "Identify repeating, alternating, and count-based visual symbol patterns.",
    "Apply systematic position rules to solve basic 1-to-1 letter coding questions.",
    "Articulate the exact step-by-step reasoning behind every solution."
  ],
  stats: {
    totalSections: 7,
    practiceQuestions: 20,
    passingScore: "70% (14 / 20)",
    estimatedReadTime: "25 mins"
  }
};

// ==========================================
// SECTION 1: UNDERSTANDING ALPHABET POSITIONS
// ==========================================
export const alphabetPositionTable = [
  { letter: "A", pos: 1, revPos: 26 },
  { letter: "B", pos: 2, revPos: 25 },
  { letter: "C", pos: 3, revPos: 24 },
  { letter: "D", pos: 4, revPos: 23 },
  { letter: "E", pos: 5, revPos: 22 },
  { letter: "F", pos: 6, revPos: 21 },
  { letter: "G", pos: 7, revPos: 20 },
  { letter: "H", pos: 8, revPos: 19 },
  { letter: "I", pos: 9, revPos: 18 },
  { letter: "J", pos: 10, revPos: 17 },
  { letter: "K", pos: 11, revPos: 16 },
  { letter: "L", pos: 12, revPos: 15 },
  { letter: "M", pos: 13, revPos: 14 },
  { letter: "N", pos: 14, revPos: 13 },
  { letter: "O", pos: 15, revPos: 12 },
  { letter: "P", pos: 16, revPos: 11 },
  { letter: "Q", pos: 17, revPos: 10 },
  { letter: "R", pos: 18, revPos: 9 },
  { letter: "S", pos: 19, revPos: 8 },
  { letter: "T", pos: 20, revPos: 7 },
  { letter: "U", pos: 21, revPos: 6 },
  { letter: "V", pos: 22, revPos: 5 },
  { letter: "W", pos: 23, revPos: 4 },
  { letter: "X", pos: 24, revPos: 3 },
  { letter: "Y", pos: 25, revPos: 2 },
  { letter: "Z", pos: 26, revPos: 1 }
];

export const section1Content = {
  title: "Understanding Alphabet Positions",
  concept: "Just as numbers have values (1, 2, 3...), every letter in the English alphabet has a fixed numerical position from A (1) to Z (26). The secret to cracking letter series is converting letters into numbers!",
  goldenRule: "When you see letters in a series, convert them to their numerical positions immediately. Then solve it just like a number series!",
  memoryTips: [
    { acronym: "EJOTY", positions: "5, 10, 15, 20, 25", note: "Remember this 5-letter word! E=5, J=10, O=15, T=20, Y=25. It acts as an instant benchmark for any letter." },
    { acronym: "C-F-I-L-O-R-U-X", positions: "3, 6, 9, 12, 15, 18, 21, 24", note: "Multiples of 3: gives you anchor letters every 3 steps." }
  ],
  examples: [
    {
      id: "sec1_ex1",
      series: ["C", "D", "E", "F", "__"],
      letterPositions: [3, 4, 5, 6, "?"],
      rule: "Consecutive natural numbers (+1 forward each step)",
      calculation: "6 + 1 = 7, and position 7 is G",
      answer: "G",
      explanation: "Each letter moves forward by 1 position: C(3) → D(4) → E(5) → F(6) → G(7)."
    },
    {
      id: "sec1_ex2",
      series: ["B", "D", "F", "H", "__"],
      letterPositions: [2, 4, 6, 8, "?"],
      rule: "Even numbers (+2 forward each step)",
      calculation: "8 + 2 = 10, and position 10 is J",
      answer: "J",
      explanation: "Letters occupy even positions: B(2), D(4), F(6), H(8). Next is 10, which corresponds to J."
    },
    {
      id: "sec1_ex3",
      series: ["Z", "Y", "X", "W", "__"],
      letterPositions: [26, 25, 24, 23, "?"],
      rule: "Countdown from Z (−1 backward each step)",
      calculation: "23 − 1 = 22, and position 22 is V",
      answer: "V",
      explanation: "The alphabet runs backwards from the end: Z(26) → Y(25) → X(24) → W(23) → V(22)."
    }
  ]
};

// ==========================================
// SECTION 2: FORWARD ALPHABET PATTERNS
// ==========================================
export const section2Content = {
  title: "Forward Alphabet Patterns",
  concept: "In forward patterns, letters skip forward by a steady step (+2, +3, +4...). Think of it like walking forward along the alphabet line.",
  goldenRule: "Calculate (Position of Next Letter − Position of Current Letter). If the difference is a positive constant, it is a forward jump series.",
  examples: [
    {
      id: "sec2_ex1",
      series: ["A", "C", "E", "G", "__"],
      letterPositions: [1, 3, 5, 7, "?"],
      step: "+2",
      calculation: "7 + 2 = 9 (Letter I)",
      answer: "I",
      note: "Odd number positions: A(1), C(3), E(5), G(7). Next is 9 = I."
    },
    {
      id: "sec2_ex2",
      series: ["B", "E", "H", "K", "__"],
      letterPositions: [2, 5, 8, 11, "?"],
      step: "+3",
      calculation: "11 + 3 = 14 (Letter N)",
      answer: "N",
      note: "Constant +3 step: B(2) + 3 = E(5), E(5) + 3 = H(8), H(8) + 3 = K(11), K(11) + 3 = N(14)."
    },
    {
      id: "sec2_ex3",
      series: ["D", "F", "H", "J", "__"],
      letterPositions: [4, 6, 8, 10, "?"],
      step: "+2",
      calculation: "10 + 2 = 12 (Letter L)",
      answer: "L",
      note: "Even positions starting from D(4): D(4) → F(6) → H(8) → J(10) → L(12)."
    }
  ]
};

// ==========================================
// SECTION 3: BACKWARD ALPHABET PATTERNS
// ==========================================
export const section3Content = {
  title: "Backward Alphabet Patterns",
  concept: "In backward patterns, letters move in reverse towards A. The letter positions decrease by a fixed amount (−1, −2, −3...).",
  goldenRule: "Convert letters to numbers and notice if the values are declining. Subtract the step from the last known position.",
  examples: [
    {
      id: "sec3_ex1",
      series: ["M", "L", "K", "J", "__"],
      letterPositions: [13, 12, 11, 10, "?"],
      step: "−1",
      calculation: "10 − 1 = 9 (Letter I)",
      answer: "I",
      note: "Consecutive reverse letters: M(13) → L(12) → K(11) → J(10) → I(9)."
    },
    {
      id: "sec3_ex2",
      series: ["Z", "W", "T", "Q", "__"],
      letterPositions: [26, 23, 20, 17, "?"],
      step: "−3",
      calculation: "17 − 3 = 14 (Letter N)",
      answer: "N",
      note: "Countdown by 3 positions: Z(26) → W(23) → T(20) → Q(17) → N(14)."
    },
    {
      id: "sec3_ex3",
      series: ["P", "N", "L", "J", "__"],
      letterPositions: [16, 14, 12, 10, "?"],
      step: "−2",
      calculation: "10 − 2 = 8 (Letter H)",
      answer: "H",
      note: "Even numbers counting down: P(16) → N(14) → L(12) → J(10) → H(8)."
    }
  ]
};

// ==========================================
// SECTION 4: ALTERNATING ALPHABET PATTERNS
// ==========================================
export const section4Content = {
  title: "Alternating Alphabet Patterns",
  concept: "When letters bounce up and down without a single continuous step, you are looking at TWO separate sequences braided together! One rule governs odd positions (1st, 3rd, 5th...), and another governs even positions (2nd, 4th, 6th...).",
  goldenRule: "Split the series into two tracks: Track 1 = positions 1, 3, 5, 7... and Track 2 = positions 2, 4, 6, 8... Inspect each independently!",
  examples: [
    {
      id: "sec4_ex1",
      series: ["A", "Z", "C", "X", "E", "V", "__"],
      oddTrack: { positions: "1st, 3rd, 5th, 7th", terms: ["A(1)", "C(3)", "E(5)", "G(7)"], rule: "+2 forward" },
      evenTrack: { positions: "2nd, 4th, 6th", terms: ["Z(26)", "X(24)", "V(22)"], rule: "−2 backward" },
      targetSlot: "7th term (Odd Track)",
      calculation: "E(5) + 2 = G(7)",
      answer: "G",
      explanation: "Odd terms move forward (+2): A → C → E → G. Even terms move backward (−2): Z → X → V."
    },
    {
      id: "sec4_ex2",
      series: ["B", "D", "C", "E", "D", "F", "__"],
      oddTrack: { positions: "1st, 3rd, 5th, 7th", terms: ["B(2)", "C(3)", "D(4)", "E(5)"], rule: "+1 forward" },
      evenTrack: { positions: "2nd, 4th, 6th", terms: ["D(4)", "E(5)", "F(6)"], rule: "+1 forward" },
      targetSlot: "7th term (Odd Track)",
      calculation: "D(4) + 1 = E(5)",
      answer: "E",
      explanation: "Odd track is B, C, D, E (+1 each step). Even track is D, E, F (+1 each step). Next is E."
    }
  ]
};

// ==========================================
// SECTION 5: MISSING LETTERS AND LETTER GAPS
// ==========================================
export const section5Content = {
  title: "Missing Letters and Letter Gaps",
  concept: "Often in exams, the blank isn't at the end — it sits right in the middle! We find missing letters by calculating the constant gap between the surrounding known terms.",
  goldenRule: "Find the position gap between known letters. Check if dividing the total span across the blank gives an identical step on both sides.",
  examples: [
    {
      id: "sec5_ex1",
      series: ["A", "C", "__", "G", "I"],
      positions: ["1", "3", "?", "7", "9"],
      gapRule: "+2 step throughout",
      calculation: "3 + 2 = 5 (Letter E), and 5 + 2 = 7 (G holds true!)",
      answer: "E",
      note: "Positions are 1, 3, 5, 7, 9. The missing letter is E."
    },
    {
      id: "sec5_ex2",
      series: ["B", "__", "F", "H", "J"],
      positions: ["2", "?", "6", "8", "10"],
      gapRule: "+2 step throughout",
      calculation: "2 + 2 = 4 (Letter D), and 4 + 2 = 6 (F holds true!)",
      answer: "D",
      note: "Even numbers: 2, 4, 6, 8, 10. The missing letter is D."
    },
    {
      id: "sec5_ex3",
      series: ["Z", "X", "V", "__", "R"],
      positions: ["26", "24", "22", "?", "18"],
      gapRule: "−2 step throughout",
      calculation: "22 − 2 = 20 (Letter T), and 20 − 2 = 18 (R holds true!)",
      answer: "T",
      note: "Descending by 2: 26, 24, 22, 20, 18. The missing letter is T."
    }
  ]
};

// ==========================================
// SECTION 6: SIMPLE SYMBOL PATTERNS
// ==========================================
export const section6Content = {
  title: "Simple Symbol Patterns",
  concept: "Reasoning tests frequently use shapes and symbols (★, ●, ▲, ■, ◆) to test pattern recognition. Symbol patterns follow the exact same logic as numbers and letters: repeating, alternating, or increasing/decreasing counts!",
  goldenRule: "Give every shape a name in your head (e.g. Star, Circle, Star, Circle). Say it aloud to spot the rhythmic loop immediately!",
  symbolLibrary: [
    { symbol: "★", name: "Star", label: "Black Star" },
    { symbol: "●", name: "Circle", label: "Filled Circle" },
    { symbol: "▲", name: "Triangle", label: "Upward Triangle" },
    { symbol: "■", name: "Square", label: "Filled Square" },
    { symbol: "◆", name: "Diamond", label: "Diamond Rhombus" }
  ],
  examples: [
    {
      id: "sec6_ex1",
      series: ["★", "●", "★", "●", "★", "__"],
      type: "Repeating 2-Item Cycle (AB AB A...)",
      rule: "Alternates strictly between Star (★) and Circle (●)",
      answer: "●",
      answerLabel: "Circle (●)",
      explanation: "Positions 1, 3, 5 are Star (★). Positions 2, 4, 6 are Circle (●). Position 6 is ●."
    },
    {
      id: "sec6_ex2",
      series: ["▲", "■", "▲", "■", "__"],
      type: "Repeating 2-Item Cycle (AB AB...)",
      rule: "Alternates strictly between Triangle (▲) and Square (■)",
      answer: "▲",
      answerLabel: "Triangle (▲)",
      explanation: "Positions 1, 3, 5 are Triangle (▲). Position 5 must be Triangle (▲)."
    },
    {
      id: "sec6_ex3",
      series: ["●", "●", "▲", "●", "●", "▲", "__"],
      type: "Repeating Group Cycle (AAB AAB A...)",
      rule: "A group of two Circles followed by one Triangle (● ● ▲)",
      answer: "●",
      answerLabel: "Circle (●)",
      explanation: "Group 1: [● ● ▲], Group 2: [● ● ▲], Group 3 starts with [●]."
    },
    {
      id: "sec6_ex4",
      series: ["◆", "◆◆", "◆◆◆", "◆◆◆◆", "__"],
      type: "Increasing Count Progression",
      rule: "The number of diamonds increases by 1 each step (1, 2, 3, 4, 5)",
      answer: "◆◆◆◆◆",
      answerLabel: "Five Diamonds (◆◆◆◆◆)",
      explanation: "Count increases: 1 diamond, 2 diamonds, 3 diamonds, 4 diamonds. Next is 5 diamonds."
    }
  ]
};

// ==========================================
// SECTION 7: BASIC LETTER CODING
// ==========================================
export const section7Content = {
  title: "Basic Letter Coding",
  concept: "Letter coding transforms a given word into a code word using a consistent positional shift rule. To crack the code: find the rule connecting the sample word to its coded version, then apply that exact same rule to the question word!",
  goldenRule: "Align letters vertically: 1st to 1st, 2nd to 2nd, 3rd to 3rd. Find the shift (+1, +2, −1) and repeat it on the target word.",
  examples: [
    {
      id: "sec7_ex1",
      givenPair: { word: "CAT", code: "DBU" },
      targetWord: "DOG",
      analysis: [
        { orig: "C (3)", shift: "+1", coded: "D (4)" },
        { orig: "A (1)", shift: "+1", coded: "B (2)" },
        { orig: "T (20)", shift: "+1", coded: "U (21)" }
      ],
      ruleText: "Each letter moves forward by +1 position.",
      solution: [
        { orig: "D (4)", calculation: "4 + 1 = 5", res: "E" },
        { orig: "O (15)", calculation: "15 + 1 = 16", res: "P" },
        { orig: "G (7)", calculation: "7 + 1 = 8", res: "H" }
      ],
      answer: "EPH",
      explanation: "D(+1)=E, O(+1)=P, G(+1)=H. Thus, DOG is coded as EPH."
    },
    {
      id: "sec7_ex2",
      givenPair: { word: "BAD", code: "CBE" },
      targetWord: "FAN",
      analysis: [
        { orig: "B (2)", shift: "+1", coded: "C (3)" },
        { orig: "A (1)", shift: "+1", coded: "B (2)" },
        { orig: "D (4)", shift: "+1", coded: "E (5)" }
      ],
      ruleText: "Each letter moves forward by +1 position.",
      solution: [
        { orig: "F (6)", calculation: "6 + 1 = 7", res: "G" },
        { orig: "A (1)", calculation: "1 + 1 = 2", res: "B" },
        { orig: "N (14)", calculation: "14 + 1 = 15", res: "O" }
      ],
      answer: "GBO",
      explanation: "F(+1)=G, A(+1)=B, N(+1)=O. Thus, FAN is coded as GBO."
    },
    {
      id: "sec7_ex3",
      givenPair: { word: "MAN", code: "OCP" },
      targetWord: "PEN",
      analysis: [
        { orig: "M (13)", shift: "+2", coded: "O (15)" },
        { orig: "A (1)", shift: "+2", coded: "C (3)" },
        { orig: "N (14)", shift: "+2", coded: "P (16)" }
      ],
      ruleText: "Each letter moves forward by +2 positions.",
      solution: [
        { orig: "P (16)", calculation: "16 + 2 = 18", res: "R" },
        { orig: "E (5)", calculation: "5 + 2 = 7", res: "G" },
        { orig: "N (14)", calculation: "14 + 2 = 16", res: "P" }
      ],
      answer: "RGP",
      explanation: "P(+2)=R, E(+2)=G, N(+2)=P. Thus, PEN is coded as RGP."
    }
  ]
};

// ==========================================
// SECTION 8: QUICK REVISION & CHECKLIST
// ==========================================
export const day3Revision = {
  title: "Day 3 Quick Revision Checklist",
  subtitle: "Keep these 7 fundamental rules at your fingertips during any aptitude test:",
  checklist: [
    { id: "rev1", rule: "Convert Letters to Numbers", detail: "Always write down the 1–26 positions first using EJOTY (5, 10, 15, 20, 25)." },
    { id: "rev2", rule: "Determine Forward or Backward", detail: "Are values going up (+1, +2, +3) or counting down (−1, −2, −3)?" },
    { id: "rev3", rule: "Calculate the Exact Gap", detail: "Subtract adjacent positions to discover the constant increment or decrement." },
    { id: "rev4", rule: "Inspect Alternate Positions", detail: "If the sequence jumps up and down, split into Odd (1, 3, 5) and Even (2, 4, 6) tracks." },
    { id: "rev5", rule: "Look for Symbol Repeating Groups", detail: "Name shapes aloud to spot repeating blocks like (★ ● ★ ●) or (● ● ▲)." },
    { id: "rev6", rule: "Apply Coding Shifts Consistently", detail: "Align sample letters vertically. Find the shift (+1, +2, −1) and apply it to every letter." },
    { id: "rev7", rule: "Verify the Full Chain", detail: "Ensure your discovered rule holds true for every single term in the sequence." }
  ],
  revisionExamples: [
    {
      q: "Revision 1: Find the next letter: B, E, H, K, __",
      ans: "N",
      exp: "Positions are 2, 5, 8, 11 (+3 each step). 11 + 3 = 14, which corresponds to N."
    },
    {
      q: "Revision 2: Find the next symbol: ▲, ●, ▲, ●, ▲, __",
      ans: "● (Circle)",
      exp: "Alternating sequence between Triangle and Circle. After Triangle comes Circle (●)."
    },
    {
      q: "Revision 3: If PIN is coded as QJO, how is CUP coded?",
      ans: "DVQ",
      exp: "P(+1)=Q, I(+1)=J, N(+1)=O (+1 to all letters). Applying to CUP: C(+1)=D, U(+1)=V, P(+1)=Q → DVQ."
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
export const day3PracticeQuestions = [
  {
    id: "d3_q1",
    question: "What is the alphabetical position of the letter 'H' from the beginning of the alphabet (A = 1)?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1, // '8'
    difficulty: "Easy",
    topic: "Alphabet Positions",
    explanation: "Counting from A=1: A(1), B(2), C(3), D(4), E(5), F(6), G(7), H(8). The position of H is 8.",
    distractorNotes: "A is G(7), C is I(9), D is J(10)."
  },
  {
    id: "d3_q2",
    question: "Find the next letter in the sequence: D, E, F, G, __",
    options: ["H", "I", "J", "K"],
    correctAnswer: 0, // 'H'
    difficulty: "Easy",
    topic: "Forward Patterns",
    explanation: "These are consecutive letters moving forward by +1: D(4) → E(5) → F(6) → G(7) → H(8).",
    distractorNotes: "I is +2, J is +3, K is +4."
  },
  {
    id: "d3_q3",
    question: "Find the next letter in the backward sequence: Z, Y, X, W, __",
    options: ["U", "V", "T", "S"],
    correctAnswer: 1, // 'V'
    difficulty: "Easy",
    topic: "Backward Patterns",
    explanation: "The letters count down in reverse by −1: Z(26) → Y(25) → X(24) → W(23) → V(22).",
    distractorNotes: "U is 21 (−2), T is 20 (−3), S is 19 (−4)."
  },
  {
    id: "d3_q4",
    question: "Identify the next symbol in the repeating sequence: ★, ●, ★, ●, ★, __",
    options: ["★", "▲", "●", "■"],
    correctAnswer: 2, // '●'
    difficulty: "Easy",
    topic: "Symbol Patterns",
    explanation: "The sequence alternates strictly between Star (★) and Circle (●). Following ★ at position 5, position 6 must be ● (Circle).",
    distractorNotes: "★ would break the alternation; ▲ and ■ do not appear in this pattern."
  },
  {
    id: "d3_q5",
    question: "If SUN is coded as TVO (+1 to each letter), how is CAP coded using the same rule?",
    options: ["DBQ", "BBQ", "DAQ", "EBQ"],
    correctAnswer: 0, // 'DBQ'
    difficulty: "Easy",
    topic: "Basic Letter Coding",
    explanation: "Each letter advances by +1: C(+1)=D, A(+1)=B, P(+1)=Q. Coded word is DBQ.",
    distractorNotes: "BBQ subtracted from C, DAQ failed to advance A, EBQ advanced C by +2."
  },
  {
    id: "d3_q6",
    question: "Find the next letter in the series: B, D, F, H, __",
    options: ["I", "J", "K", "L"],
    correctAnswer: 1, // 'J'
    difficulty: "Easy-to-Moderate",
    topic: "Forward Patterns",
    explanation: "Positions are even numbers: B(2), D(4), F(6), H(8). The next even position is 10, which corresponds to J.",
    distractorNotes: "I is position 9 (+1), K is 11, L is 12 (+4)."
  },
  {
    id: "d3_q7",
    question: "Find the next letter in the backward series: S, Q, O, M, __",
    options: ["L", "K", "J", "I"],
    correctAnswer: 1, // 'K'
    difficulty: "Easy-to-Moderate",
    topic: "Backward Patterns",
    explanation: "Positions are S(19), Q(17), O(15), M(13). Subtracting 2 positions each step: 13 − 2 = 11, which is letter K.",
    distractorNotes: "L is 12 (−1), J is 10 (−3), I is 9 (−4)."
  },
  {
    id: "d3_q8",
    question: "Find the missing letter: A, C, __, G, I",
    options: ["D", "E", "F", "H"],
    correctAnswer: 1, // 'E'
    difficulty: "Easy-to-Moderate",
    topic: "Missing Letters",
    explanation: "Positions are odd numbers: A(1), C(3), __, G(7), I(9). The missing odd number is 5, which corresponds to letter E.",
    distractorNotes: "D is 4 (even), F is 6 (even), H is 8 (even)."
  },
  {
    id: "d3_q9",
    question: "Find the next symbol in this sequence: ▲, ■, ▲, ■, ▲, __",
    options: ["●", "◆", "■", "▲"],
    correctAnswer: 2, // '■'
    difficulty: "Easy-to-Moderate",
    topic: "Symbol Patterns",
    explanation: "The pattern alternates between Triangle (▲) and Square (■). Following ▲ at position 5, position 6 must be Square (■).",
    distractorNotes: "▲ repeats position 5; ● and ◆ are not part of the sequence."
  },
  {
    id: "d3_q10",
    question: "Find the next letter in the sequence: C, F, I, L, __",
    options: ["M", "N", "O", "P"],
    correctAnswer: 2, // 'O'
    difficulty: "Easy-to-Moderate",
    topic: "Forward Patterns",
    explanation: "Positions are multiples of 3: C(3), F(6), I(9), L(12). The next position is 12 + 3 = 15, which corresponds to O.",
    distractorNotes: "M is 13 (+1), N is 14 (+2), P is 16 (+4)."
  },
  {
    id: "d3_q11",
    question: "Find the next letter in the backward sequence: Y, V, S, P, __",
    options: ["M", "N", "O", "L"],
    correctAnswer: 0, // 'M'
    difficulty: "Easy-to-Moderate",
    topic: "Backward Patterns",
    explanation: "Positions decrease by 3: Y(25) → V(22) → S(19) → P(16). 16 − 3 = 13, which is M.",
    distractorNotes: "N is 14 (−2), O is 15 (−1), L is 12 (−4)."
  },
  {
    id: "d3_q12",
    question: "If TOP is coded as UPQ, how is RED coded?",
    options: ["SFE", "QDC", "SEE", "TFE"],
    correctAnswer: 0, // 'SFE'
    difficulty: "Easy-to-Moderate",
    topic: "Basic Letter Coding",
    explanation: "T(+1)=U, O(+1)=P, P(+1)=Q. Applying +1 to RED: R(+1)=S, E(+1)=F, D(+1)=E. The code is SFE.",
    distractorNotes: "QDC subtracted 1 instead of adding; SEE failed to advance E."
  },
  {
    id: "d3_q13",
    question: "Find the next letter in the alternating series: A, Z, B, Y, C, X, __",
    options: ["D", "W", "E", "V"],
    correctAnswer: 0, // 'D'
    difficulty: "Moderate",
    topic: "Alternating Sequences",
    explanation: "Odd positions: A(1), B(2), C(3) → next is D(4). Even positions: Z(26), Y(25), X(24) → next would be W(23). Since we need the 7th term (odd), the answer is D.",
    distractorNotes: "W is the 8th term (even track); E is the 9th term."
  },
  {
    id: "d3_q14",
    question: "Find the missing letter in the middle: Z, W, T, __, N, K",
    options: ["R", "Q", "P", "S"],
    correctAnswer: 1, // 'Q'
    difficulty: "Moderate",
    topic: "Missing Letters",
    explanation: "Positions: Z(26), W(23), T(20), __, N(14), K(11). The common difference is −3. 20 − 3 = 17, which is letter Q. Verification: 17 − 3 = 14 (N) confirms the answer.",
    distractorNotes: "R is 18 (−2), P is 16 (−4), S is 19 (−1)."
  },
  {
    id: "d3_q15",
    question: "Find the next letter in the alternating sequence: B, E, D, G, F, I, __",
    options: ["G", "H", "J", "K"],
    correctAnswer: 1, // 'H'
    difficulty: "Moderate",
    topic: "Alternating Sequences",
    explanation: "Separate into two tracks: Odd track: B(2), D(4), F(6) → next odd term is H(8) (+2 each step). Even track: E(5), G(7), I(9) (+2 each step). The 7th term is odd, so it is H.",
    distractorNotes: "G is 7 (already used); J is 10 (+4); K is 11."
  },
  {
    id: "d3_q16",
    question: "Look at the symbol progression: ◆, ◆◆, ◆◆◆, ◆◆◆◆, __. What is the next term?",
    options: ["◆◆◆", "◆◆◆◆◆", "●●●●●", "★★★★★"],
    correctAnswer: 1, // '◆◆◆◆◆'
    difficulty: "Moderate",
    topic: "Symbol Patterns",
    explanation: "The count of diamond symbols increases by +1 each step: 1 diamond, 2 diamonds, 3 diamonds, 4 diamonds. The next term has 5 diamonds (◆◆◆◆◆).",
    distractorNotes: "◆◆◆ decreases count; ●●●●● and ★★★★★ change the shape."
  },
  {
    id: "d3_q17",
    question: "If CAT is coded as ECV (+2 to each letter), how is DOG coded using the same rule?",
    options: ["FQI", "EQH", "EPI", "FPH"],
    correctAnswer: 0, // 'FQI'
    difficulty: "Moderate",
    topic: "Basic Letter Coding",
    explanation: "C(3)+2=E(5), A(1)+2=C(3), T(20)+2=V(22). Applying +2 to DOG: D(4)+2=F(6), O(15)+2=Q(17), G(7)+2=I(9). Result is FQI.",
    distractorNotes: "EQH only added +1 to D; EPI only added +1 to D and O; FPH added +1 to G."
  },
  {
    id: "d3_q18",
    question: "Find the 7th letter in the series: A, Z, C, X, E, V, __",
    options: ["F", "G", "U", "T"],
    correctAnswer: 1, // 'G'
    difficulty: "Applied Reasoning",
    topic: "Alternating Sequences",
    explanation: "Odd terms: A(1) → C(3) → E(5) → G(7) (forward by +2). Even terms: Z(26) → X(24) → V(22) (backward by −2). The 7th term belongs to the odd track: E(5) + 2 = G(7).",
    distractorNotes: "U is 21 (odd reverse); T is 20 (even reverse 8th term); F is +1."
  },
  {
    id: "d3_q19",
    question: "Find the missing letter that completes the sequence: D, G, __, M, P",
    options: ["I", "J", "K", "L"],
    correctAnswer: 1, // 'J'
    difficulty: "Applied Reasoning",
    topic: "Missing Letters",
    explanation: "Positions: D(4), G(7), __, M(13), P(16). Gaps between known terms: 7 − 4 = 3, and 16 − 13 = 3. Therefore, missing term is 7 + 3 = 10, which corresponds to J. Verification: 10 + 3 = 13 (M) confirms J.",
    distractorNotes: "I is 9 (+2), K is 11 (+4), L is 12 (+5)."
  },
  {
    id: "d3_q20",
    question: "If BIRD is coded as CJSE and COLD is coded as DPOE (+1 to each letter), how is FROG coded in the same system?",
    options: ["GSPH", "GQOH", "ERNF", "GSQH"],
    correctAnswer: 0, // 'GSPH'
    difficulty: "Applied Reasoning",
    topic: "Basic Letter Coding",
    explanation: "Rule is +1 to all letters: F(6)+1=G(7), R(18)+1=S(19), O(15)+1=P(16), G(7)+1=H(8). Thus, FROG is coded as GSPH.",
    distractorNotes: "GQOH subtracted from R; ERNF subtracted 1 from all letters; GSQH added 2 to O."
  }
];
