/**
 * SPOKO Logical Reasoning & Analytical Thinking
 * Level 1: Beginner
 * Day 2: Number Series and Pattern Recognition
 * 
 * Interactive written masterclass covering:
 * 1. Introduction to Number Series
 * 2. Addition and Subtraction Patterns
 * 3. Multiplication and Division Patterns
 * 4. Increasing and Decreasing Differences
 * 5. Alternating Number Patterns
 * 6. Square and Cube Patterns
 * 7. Missing Number Strategy
 * Practice Quiz: Exactly 20 questions with verified math and step-by-step logic.
 */

export const day2Overview = {
  courseName: "Logical Reasoning & Analytical Thinking",
  level: "Level 1 – Beginner",
  day: "Day 2",
  topic: "Number Series and Pattern Recognition",
  targetAudience: "Students, college freshers, job seekers, and beginners preparing for aptitude tests and interviews",
  objectives: [
    "Understand what a number series is and how to identify its core underlying pattern.",
    "Quickly recognize constant addition and subtraction patterns using consecutive differences.",
    "Identify multiplication and division patterns by examining growth and reduction factors.",
    "Spot increasing and decreasing difference patterns using a two-level difference ladder.",
    "Break down alternating series by separating odd and even positioned terms.",
    "Recognize perfect square (1, 4, 9, 16...) and perfect cube (1, 8, 27, 64...) sequences.",
    "Master the 6-step Missing Number Strategy checklist to systematically solve any sequence.",
    "Confidently explain the exact mathematical logic behind answers instead of guessing."
  ]
};

// ==========================================
// SECTION 1: INTRODUCTION TO NUMBER SERIES
// ==========================================
export const section1Content = {
  title: "Introduction to Number Series",
  definition: {
    core: "A number series is an ordered sequence of numbers that follow a specific, logical mathematical rule or pattern from one term to the next.",
    patternConcept: "A pattern is the repeating or predictable relationship that connects each number to the numbers around it. Once you discover that relationship, finding the missing number becomes simple and reliable.",
    whyAptitudeTestsUseIt: [
      {
        reason: "Tests Observational Agility",
        desc: "Measures how quickly your mind spots relationships between numbers without getting intimidated."
      },
      {
        reason: "Evaluates Systematic Problem Solving",
        desc: "Demonstrates whether you guess blindly or test hypotheses step-by-step using logic."
      },
      {
        reason: "Predicts Workplace Analytic Ability",
        desc: "In real jobs (coding, accounting, analytics, management), finding trends in data is a daily requirement."
      },
      {
        reason: "Universal & Language-Independent",
        desc: "Numbers follow identical mathematical rules regardless of your native language or background."
      }
    ]
  },
  stepByStepMethod: [
    {
      step: 1,
      title: "Look at the Speed of Change",
      detail: "Are the numbers growing slowly (addition), jumping rapidly (multiplication/cubes), falling gradually (subtraction), or falling steeply (division)?"
    },
    {
      step: 2,
      title: "Calculate Consecutive Differences",
      detail: "Write down the difference between the 1st & 2nd, 2nd & 3rd, and 3rd & 4th numbers. In 70% of beginner problems, this step alone reveals the rule."
    },
    {
      step: 3,
      title: "Formulate Your Rule",
      detail: "State the rule clearly in one sentence: 'Each number is 3 greater than the previous number' or 'Each term is doubled'."
    },
    {
      step: 4,
      title: "Test Against Every Given Term",
      detail: "Never assume a rule after testing just one pair. Make sure your rule works from term 1 all the way to the last given number."
    },
    {
      step: 5,
      title: "Compute the Missing Number",
      detail: "Apply your validated rule to the last term to find the missing value."
    }
  ],
  introductoryExample: {
    sequence: [2, 4, 6, 8, "__"],
    operation: "+2",
    stepByStep: [
      "Compare 2 and 4: 4 − 2 = +2",
      "Compare 4 and 6: 6 − 4 = +2",
      "Compare 6 and 8: 8 − 6 = +2",
      "The rule is consistent: add 2 to each consecutive term.",
      "Apply the rule to 8: 8 + 2 = 10."
    ],
    answer: "10",
    keyTakeaway: "Because the difference is identical between every pair, this is an arithmetic series with a constant common difference of +2."
  }
};

// ==========================================
// SECTION 2: ADDITION AND SUBTRACTION PATTERNS
// ==========================================
export const section2Content = {
  title: "Addition and Subtraction Patterns",
  concept: "When the numbers in a series increase or decrease by the exact same amount at every step, the pattern is governed by a constant difference.",
  formulaNote: "Consecutive Difference = Next Term − Current Term. If positive, it is an addition pattern (+d). If negative, it is a subtraction pattern (−d).",
  examples: [
    {
      id: "add_1",
      series: [5, 10, 15, 20, "__"],
      rule: "Constant Addition of +5",
      differences: ["10 − 5 = +5", "15 − 10 = +5", "20 − 15 = +5"],
      calculation: "20 + 5 = 25",
      answer: "25",
      tip: "Numbers that end in 5 and 0 are classic multiples of 5."
    },
    {
      id: "sub_1",
      series: [30, 27, 24, 21, "__"],
      rule: "Constant Subtraction of −3",
      differences: ["27 − 30 = −3", "24 − 27 = −3", "21 − 24 = −3"],
      calculation: "21 − 3 = 18",
      answer: "18",
      tip: "The numbers are shrinking steadily by 3. Always subtract from left to right."
    },
    {
      id: "add_2",
      series: [3, 7, 11, 15, "__"],
      rule: "Constant Addition of +4",
      differences: ["7 − 3 = +4", "11 − 7 = +4", "15 − 11 = +4"],
      calculation: "15 + 4 = 19",
      answer: "19",
      tip: "Notice that all numbers in this series are odd numbers separated by 4."
    }
  ],
  interactiveExercises: [
    {
      id: "diff_ex_1",
      series: [8, 14, 20, 26, "__"],
      type: "Addition",
      difference: "+6",
      options: ["30", "32", "34", "36"],
      correct: "32",
      explanation: "26 + 6 = 32. Each step adds 6."
    },
    {
      id: "diff_ex_2",
      series: [50, 43, 36, 29, "__"],
      type: "Subtraction",
      difference: "−7",
      options: ["21", "22", "23", "24"],
      correct: "22",
      explanation: "29 − 7 = 22. Each step subtracts 7."
    },
    {
      id: "diff_ex_3",
      series: [12, 23, 34, 45, "__"],
      type: "Addition",
      difference: "+11",
      options: ["54", "55", "56", "57"],
      correct: "56",
      explanation: "45 + 11 = 56. The common difference is +11."
    }
  ]
};

// ==========================================
// SECTION 3: MULTIPLICATION AND DIVISION PATTERNS
// ==========================================
export const section3Content = {
  title: "Multiplication and Division Patterns",
  concept: "In some number series, numbers don't just grow by small steps — they explode upwards by multiplying (×), or drop sharply by dividing (÷)!",
  identificationClue: "💡 3-Second Quick Clue: If numbers shoot up into big numbers very fast (like 2 → 4 → 8 → 16...), stop testing addition (+). Check if each number is doubling (×2) or tripling (×3)!",
  examples: [
    {
      id: "mult_1",
      series: [2, 4, 8, 16, "__"],
      operation: "Multiplication by 2 (Doubling)",
      ratios: ["2 × 2 = 4", "4 × 2 = 8", "8 × 2 = 16"],
      calculation: "16 × 2 = 32",
      answer: "32",
      note: "Doubling is the most frequent multiplication pattern in beginner aptitude tests."
    },
    {
      id: "div_1",
      series: [81, 27, 9, 3, "__"],
      operation: "Division by 3 (One-third)",
      ratios: ["81 ÷ 3 = 27", "27 ÷ 3 = 9", "9 ÷ 3 = 3"],
      calculation: "3 ÷ 3 = 1",
      answer: "1",
      note: "Each number is divided by 3 to reach the next term."
    },
    {
      id: "mult_2",
      series: [3, 9, 27, 81, "__"],
      operation: "Multiplication by 3 (Tripling)",
      ratios: ["3 × 3 = 9", "9 × 3 = 27", "27 × 3 = 81"],
      calculation: "81 × 3 = 243",
      answer: "243",
      note: "Each step triples (×3): 3, 9, 27, 81, and next is 81 × 3 = 243."
    }
  ],
  beginnerComparison: {
    title: "How to Tell Addition from Multiplication in 3 Seconds",
    subtitle: "The #1 trap for beginners is getting confused between (+ / −) and (× / ÷). Here is the golden rule to spot them instantly:",
    addition: {
      title: "Addition / Subtraction",
      analogy: "🚶 Walking Steps (Slow & Steady)",
      badge: "Plus (+) or Minus (−)",
      color: "#059669",
      bgColor: "#ecfdf5",
      borderColor: "#a7f3d0",
      howItWorks: "Numbers take small, even baby steps. The gap between them is always a small, constant number.",
      exampleGrowing: {
        series: ["5", "+5", "10", "+5", "15", "+5", "20"],
        note: "Grows gently: just adding +5 each step."
      },
      exampleShrinking: {
        series: ["30", "−4", "26", "−4", "22", "−4", "18"],
        note: "Drops gently: just subtracting 4 each step."
      },
      ruleOfThumb: "✅ If numbers are growing slowly and the gap is always identical, it's Addition (+)."
    },
    multiplication: {
      title: "Multiplication / Division",
      analogy: "🚀 Rocket Leaps (Fast & Big)",
      badge: "Multiply (×) or Divide (÷)",
      color: "#6366f1",
      bgColor: "#eef2ff",
      borderColor: "#c7d2fe",
      howItWorks: "Numbers explode into big numbers or shrink down sharply. The gap gets wider and wider with every single step!",
      exampleGrowing: {
        series: ["2", "×2", "4", "×2", "8", "×2", "16", "×2", "32"],
        note: "Explodes: 2 rockets all the way to 32 in just 4 steps!"
      },
      exampleShrinking: {
        series: ["81", "÷3", "27", "÷3", "9", "÷3", "3"],
        note: "Slices down: cut into 3 parts at every step."
      },
      ruleOfThumb: "🚀 If numbers grow huge in just 3-4 steps, don't check plus! Check if they are doubling (×2) or tripling (×3)."
    },
    spotterChallenges: [
      {
        id: "spot_1",
        series: [3, 6, 9, 12, 15],
        correctType: "walking",
        options: [
          { type: "walking", label: "🚶 Walking Pattern (+3)", isCorrect: true },
          { type: "rocket", label: "🚀 Rocket Pattern (×2)", isCorrect: false }
        ],
        explanation: "🎉 Spot on! 3 → 6 → 9 → 12 → 15 increases by only +3 each step. Slow and steady addition!"
      },
      {
        id: "spot_2",
        series: [3, 6, 12, 24, 48],
        correctType: "rocket",
        options: [
          { type: "walking", label: "🚶 Walking Pattern (+3)", isCorrect: false },
          { type: "rocket", label: "🚀 Rocket Pattern (×2)", isCorrect: true }
        ],
        explanation: "🚀 Boom! Look how fast 3 leaped to 48 in 4 steps! Each number is doubled (×2). That's a multiplication rocket!"
      },
      {
        id: "spot_3",
        series: [100, 50, 25, 12.5],
        correctType: "rocket",
        options: [
          { type: "walking", label: "🚶 Walking Drop (−50)", isCorrect: false },
          { type: "rocket", label: "🚀 Rocket Drop (÷2)", isCorrect: true }
        ],
        explanation: "🎯 Excellent! 100 drops to 50, then to 25. The gap isn't constant (−50, then −25). It is being cut exactly in half (÷2) each time!"
      },
      {
        id: "spot_4",
        series: [40, 34, 28, 22],
        correctType: "walking",
        options: [
          { type: "walking", label: "🚶 Walking Drop (−6)", isCorrect: true },
          { type: "rocket", label: "🚀 Rocket Drop (÷2)", isCorrect: false }
        ],
        explanation: "🎉 Exactly! 40 − 6 = 34, 34 − 6 = 28, 28 − 6 = 22. The gap is a steady −6 every time. Simple subtraction!"
      }
    ]
  }
};

// ==========================================
// SECTION 4: INCREASING AND DECREASING DIFFERENCES
// ==========================================
export const section4Content = {
  title: "Increasing and Decreasing Differences",
  concept: "Sometimes the difference between consecutive numbers is not constant, but the differences themselves form their own regular sequence! This is called a two-level difference pattern.",
  keyRule: "Always write down the 'Level 1 differences'. If they are not equal, check the 'Level 2 differences' between those differences.",
  examples: [
    {
      id: "inc_diff_1",
      series: [2, 5, 9, 14, 20, "__"],
      level1Differences: ["5 − 2 = +3", "9 − 5 = +4", "14 − 9 = +5", "20 − 14 = +6"],
      patternOfDifferences: "+3, +4, +5, +6 → next difference is +7",
      calculation: "20 + 7 = 27",
      answer: "27",
      explanation: "The numbers don't add the same amount. Instead, the gap increases by 1 each time (+3, +4, +5, +6, +7). Therefore, 20 + 7 = 27."
    },
    {
      id: "dec_diff_1",
      series: [20, 18, 15, 11, 6, "__"],
      level1Differences: ["18 − 20 = −2", "15 − 18 = −3", "11 − 15 = −4", "6 − 11 = −5"],
      patternOfDifferences: "−2, −3, −4, −5 → next difference is −6",
      calculation: "6 − 6 = 0",
      answer: "0",
      explanation: "The amount subtracted increases by 1 at each stage (−2, −3, −4, −5, −6). Therefore, 6 − 6 = 0."
    }
  ],
  visualLadder: {
    title: "How the Difference Ladder Works",
    steps: [
      { level: "Given Terms", values: [2, 5, 9, 14, 20, "?"] },
      { level: "1st Differences (Gaps)", values: ["+3", "+4", "+5", "+6", "+7"] },
      { level: "2nd Differences (Rate of change)", values: ["+1", "+1", "+1", "+1"] }
    ]
  }
};

// ==========================================
// SECTION 5: ALTERNATING NUMBER PATTERNS
// ==========================================
export const section5Content = {
  title: "Alternating Number Patterns",
  concept: "An alternating sequence (or interleaved sequence) weaves two completely independent series into one single line of numbers. When a single arithmetic or geometric rule fails to fit, always inspect every second number!",
  howToSpotIt: "Look for numbers that go up, then down, then up, then down, or numbers with two very different magnitudes side by side.",
  technique: "Mark the numbers at Odd Positions (1st, 3rd, 5th, 7th...) and Even Positions (2nd, 4th, 6th, 8th...) with different colors or underlines.",
  examples: [
    {
      id: "alt_1",
      series: [2, 10, 4, 20, 6, 30, "__"],
      oddPositions: { terms: [2, 4, 6, "__"], rule: "Add 2 each time (2, 4, 6, 8)" },
      evenPositions: { terms: [10, 20, 30], rule: "Add 10 each time (10, 20, 30)" },
      missingPosition: "7th position (Odd position)",
      calculation: "6 + 2 = 8",
      answer: "8",
      explanation: "The series alternates between two rules: Series A at odd positions adds 2 (2, 4, 6, 8), while Series B at even positions adds 10 (10, 20, 30). The 7th term is part of Series A, so 6 + 2 = 8."
    },
    {
      id: "alt_2",
      series: [1, 4, 2, 8, 3, 12, "__"],
      oddPositions: { terms: [1, 2, 3, "__"], rule: "Natural counting numbers +1 (1, 2, 3, 4)" },
      evenPositions: { terms: [4, 8, 12], rule: "Multiples of 4 (4, 8, 12, 16)" },
      missingPosition: "7th position (Odd position)",
      calculation: "3 + 1 = 4",
      answer: "4",
      explanation: "Odd terms are 1, 2, 3, 4 (+1). Even terms are 4, 8, 12 (multiples of 4). The missing term is the 7th term, which gives 4."
    }
  ]
};

// ==========================================
// SECTION 6: SQUARE AND CUBE PATTERNS
// ==========================================
export const section6Content = {
  title: "Square and Cube Patterns",
  concept: "Square numbers and cube numbers appear frequently in aptitude tests. Recognizing their sequence at a glance gives you an immediate advantage.",
  squares: {
    definition: "A square number (n²) is formed by multiplying an integer by itself: n × n.",
    table: [
      { n: 1, val: 1, calc: "1 × 1" },
      { n: 2, val: 4, calc: "2 × 2" },
      { n: 3, val: 9, calc: "3 × 3" },
      { n: 4, val: 16, calc: "4 × 4" },
      { n: 5, val: 25, calc: "5 × 5" },
      { n: 6, val: 36, calc: "6 × 6" },
      { n: 7, val: 49, calc: "7 × 7" },
      { n: 8, val: 64, calc: "8 × 8" }
    ],
    example: {
      series: [1, 4, 9, 16, "__"],
      logic: "Consecutive squares: 1², 2², 3², 4²",
      next: "5² = 25",
      answer: "25"
    }
  },
  cubes: {
    definition: "A cube number (n³) is formed by multiplying an integer by itself twice: n × n × n.",
    table: [
      { n: 1, val: 1, calc: "1 × 1 × 1" },
      { n: 2, val: 8, calc: "2 × 2 × 2" },
      { n: 3, val: 27, calc: "3 × 3 × 3" },
      { n: 4, val: 64, calc: "4 × 4 × 4" },
      { n: 5, val: 125, calc: "5 × 5 × 5" },
      { n: 6, val: 216, calc: "6 × 6 × 6" }
    ],
    example: {
      series: [1, 8, 27, 64, "__"],
      logic: "Consecutive cubes: 1³, 2³, 3³, 4³",
      next: "5³ = 125",
      answer: "125"
    }
  },
  proTip: "Also watch out for offset squares and cubes! For example, (n² + 1) produces: 2, 5, 10, 17, 26, 37. Recognizing the base squares makes the +1 or −1 instantly obvious."
};

// ==========================================
// SECTION 7: MISSING NUMBER STRATEGY
// ==========================================
export const section7Content = {
  title: "Missing Number Strategy",
  concept: "Whenever you face any number series in an exam or interview, don't guess! Work through this reliable 6-step checklist in order.",
  checklist: [
    {
      stepNumber: 1,
      name: "Check Consecutive Difference",
      action: "Subtract adjacent terms (Term 2 − Term 1, Term 3 − Term 2). Is the difference constant?"
    },
    {
      stepNumber: 2,
      name: "Check Multiplication or Division",
      action: "If numbers grow rapidly or shrink sharply, test ratios (Term 2 ÷ Term 1). Is there a common multiplier or divisor?"
    },
    {
      stepNumber: 3,
      name: "Check Differences of Differences",
      action: "Are the differences increasing (+2, +4, +6...) or decreasing (−5, −4, −3...)? Build the 2nd-level difference ladder."
    },
    {
      stepNumber: 4,
      name: "Check for Alternating Patterns",
      action: "Does the series bounce up and down? Split into odd and even positions to see two separate sequences."
    },
    {
      stepNumber: 5,
      name: "Check for Squares or Cubes",
      action: "Do the numbers resemble perfect squares (1, 4, 9, 16...) or cubes (1, 8, 27, 64...) or their offsets (n² ± 1, n³ ± 1)?"
    },
    {
      stepNumber: 6,
      name: "Verify the Rule Across ALL Terms",
      action: "Confirm that your chosen rule holds true for every single pair before calculating the final answer."
    }
  ],
  workedExample: {
    problem: "Find the missing number: 4, 8, 16, 32, __",
    walkthrough: [
      { step: "Step 1: Check difference", observation: "8 − 4 = 4, 16 − 8 = 8, 32 − 16 = 16. Differences are 4, 8, 16 (not constant)." },
      { step: "Step 2: Check multiplication", observation: "8 ÷ 4 = 2, 16 ÷ 8 = 2, 32 ÷ 16 = 2. Each term is multiplied by 2!" },
      { step: "Step 3: Verify across all terms", observation: "4 × 2 = 8, 8 × 2 = 16, 16 × 2 = 32. Rule fits perfectly across the entire series." },
      { step: "Step 4: Compute final answer", observation: "32 × 2 = 64." }
    ],
    answer: "64"
  }
};

// ==========================================
// PRACTICE QUIZ: EXACTLY 20 QUESTIONS
// ==========================================
/**
 * Difficulty Distribution:
 * Q1–5:   Easy
 * Q6–12:  Easy to Moderate
 * Q13–17: Moderate
 * Q18–20: Applied Reasoning & Mixed Patterns
 */
export const day2PracticeQuestions = [
  // --- Questions 1 to 5: Easy ---
  {
    id: 1,
    difficulty: "Easy",
    category: "Addition Pattern",
    question: "Find the missing number in the series:\n6, 12, 18, 24, __",
    options: ["28", "30", "32", "36"],
    correctAnswer: 1, // index 1: "30"
    explanation: "Calculate the difference between consecutive terms: 12 − 6 = +6, 18 − 12 = +6, 24 − 18 = +6. The constant difference is +6. Therefore, 24 + 6 = 30.",
    whyIncorrect: {
      0: "28 would mean adding only 4 instead of 6.",
      2: "32 would mean adding 8 instead of the constant 6.",
      3: "36 skips a step (adding 12 instead of 6)."
    }
  },
  {
    id: 2,
    difficulty: "Easy",
    category: "Subtraction Pattern",
    question: "Find the missing number in the series:\n45, 40, 35, 30, __",
    options: ["20", "24", "25", "26"],
    correctAnswer: 2, // index 2: "25"
    explanation: "Subtract each term from the previous one: 45 − 5 = 40, 40 − 5 = 35, 35 − 5 = 30. Each consecutive number decreases by 5. Therefore, 30 − 5 = 25.",
    whyIncorrect: {
      0: "20 would mean subtracting 10 instead of 5.",
      1: "24 would mean subtracting 6.",
      3: "26 would mean subtracting 4."
    }
  },
  {
    id: 3,
    difficulty: "Easy",
    category: "Multiplication Pattern",
    question: "Find the missing number in the series:\n5, 10, 20, 40, __",
    options: ["60", "70", "80", "100"],
    correctAnswer: 2, // index 2: "80"
    explanation: "Each number is multiplied by 2 (doubled): 5 × 2 = 10, 10 × 2 = 20, 20 × 2 = 40. Therefore, 40 × 2 = 80.",
    whyIncorrect: {
      0: "60 assumes an addition of +20, but the differences are not constant (5, 10, 20).",
      1: "70 is not a multiple of 40 × 2.",
      3: "100 would mean multiplying by 2.5."
    }
  },
  {
    id: 4,
    difficulty: "Easy",
    category: "Division Pattern",
    question: "Find the missing number in the series:\n64, 32, 16, 8, __",
    options: ["2", "4", "6", "0"],
    correctAnswer: 1, // index 1: "4"
    explanation: "Each term is divided by 2 (halved): 64 ÷ 2 = 32, 32 ÷ 2 = 16, 16 ÷ 2 = 8. Therefore, 8 ÷ 2 = 4.",
    whyIncorrect: {
      0: "2 would mean dividing 8 by 4 instead of 2.",
      2: "6 is obtained by subtracting 2, but the rule is division by 2.",
      3: "0 is not reached by dividing by 2."
    }
  },
  {
    id: 5,
    difficulty: "Easy",
    category: "Square Pattern",
    question: "Find the missing number in the series of square numbers:\n1, 4, 9, 16, 25, __",
    options: ["30", "34", "35", "36"],
    correctAnswer: 3, // index 3: "36"
    explanation: "The series shows consecutive squares: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25. The next term is 6² = 6 × 6 = 36.",
    whyIncorrect: {
      0: "30 is not a perfect square.",
      1: "34 is not a perfect square.",
      2: "35 is one less than 36."
    }
  },

  // --- Questions 6 to 12: Easy to Moderate ---
  {
    id: 6,
    difficulty: "Easy to Moderate",
    category: "Addition Pattern",
    question: "Find the missing number in the series:\n7, 16, 25, 34, __",
    options: ["41", "43", "45", "47"],
    correctAnswer: 1, // index 1: "43"
    explanation: "Find the difference: 16 − 7 = 9, 25 − 16 = 9, 34 − 25 = 9. The constant addition is +9. Adding 9 to 34 gives 43.",
    whyIncorrect: {
      0: "41 adds 7 instead of 9.",
      2: "45 adds 11 instead of 9.",
      3: "47 adds 13 instead of 9."
    }
  },
  {
    id: 7,
    difficulty: "Easy to Moderate",
    category: "Increasing Differences",
    question: "Find the missing number in the series:\n3, 7, 12, 18, 25, __",
    options: ["31", "32", "33", "35"],
    correctAnswer: 2, // index 2: "33"
    explanation: "Calculate consecutive differences: 7 − 3 = +4, 12 − 7 = +5, 18 − 12 = +6, 25 − 18 = +7. The differences increase by 1 each time (+4, +5, +6, +7, +8). Therefore, 25 + 8 = 33.",
    whyIncorrect: {
      0: "31 adds only 6, repeating an earlier difference.",
      1: "32 adds 7, forgetting that the difference increases to +8.",
      3: "35 adds 10."
    }
  },
  {
    id: 8,
    difficulty: "Easy to Moderate",
    category: "Decreasing Differences",
    question: "Find the missing number in the series:\n50, 48, 44, 38, 30, __",
    options: ["18", "20", "22", "24"],
    correctAnswer: 1, // index 1: "20"
    explanation: "Inspect the differences: 48 − 50 = −2, 44 − 48 = −4, 38 − 44 = −6, 30 − 38 = −8. The amount subtracted increases by 2 each time (−2, −4, −6, −8, −10). Therefore, 30 − 10 = 20.",
    whyIncorrect: {
      0: "18 subtracts 12.",
      2: "22 subtracts 8 again instead of increasing the subtraction to 10.",
      3: "24 subtracts only 6."
    }
  },
  {
    id: 9,
    difficulty: "Easy to Moderate",
    category: "Cube Pattern",
    question: "Find the missing number in the series:\n1, 8, 27, 64, __",
    options: ["100", "120", "125", "216"],
    correctAnswer: 2, // index 2: "125"
    explanation: "The series consists of cubes of consecutive integers: 1³ = 1, 2³ = 8, 3³ = 27, 4³ = 64. The next term is 5³ = 5 × 5 × 5 = 125.",
    whyIncorrect: {
      0: "100 is 10², not a cube of 5.",
      1: "120 is not a perfect cube.",
      3: "216 is 6³ (skips 5³)."
    }
  },
  {
    id: 10,
    difficulty: "Easy to Moderate",
    category: "Multiplication Pattern",
    question: "Find the missing number in the series:\n4, 12, 36, 108, __",
    options: ["216", "312", "324", "432"],
    correctAnswer: 2, // index 2: "324"
    explanation: "Each number is multiplied by 3: 4 × 3 = 12, 12 × 3 = 36, 36 × 3 = 108. Therefore, 108 × 3 = 324.",
    whyIncorrect: {
      0: "216 is 108 × 2.",
      1: "312 is a calculation mistake.",
      3: "432 is 108 × 4."
    }
  },
  {
    id: 11,
    difficulty: "Easy to Moderate",
    category: "Alternating Pattern",
    question: "Find the missing number in the alternating series:\n5, 20, 7, 25, 9, 30, __",
    options: ["10", "11", "12", "35"],
    correctAnswer: 1, // index 1: "11"
    explanation: "Separate into two alternating series:\nOdd positions (1st, 3rd, 5th, 7th): 5, 7, 9, __ (increases by +2)\nEven positions (2nd, 4th, 6th): 20, 25, 30 (increases by +5)\nThe missing number is at the 7th position (odd), so 9 + 2 = 11.",
    whyIncorrect: {
      0: "10 only adds 1 to 9.",
      2: "12 adds 3 to 9.",
      3: "35 belongs to the even-position sub-series (30 + 5), but the 7th position is an odd position."
    }
  },
  {
    id: 12,
    difficulty: "Easy to Moderate",
    category: "Subtraction Pattern",
    question: "Find the missing number in the series:\n100, 91, 82, 73, __",
    options: ["62", "64", "65", "67"],
    correctAnswer: 1, // index 1: "64"
    explanation: "Calculate the consecutive differences: 91 − 100 = −9, 82 − 91 = −9, 73 − 82 = −9. The constant subtraction is 9. Therefore, 73 − 9 = 64.",
    whyIncorrect: {
      0: "62 subtracts 11.",
      2: "65 subtracts 8.",
      3: "67 subtracts 6."
    }
  },

  // --- Questions 13 to 17: Moderate ---
  {
    id: 13,
    difficulty: "Moderate",
    category: "Increasing Differences (2-Level)",
    question: "Find the missing number in the series:\n2, 4, 10, 22, 42, __",
    options: ["64", "68", "72", "76"],
    correctAnswer: 2, // index 2: "72"
    explanation: "Calculate Level 1 differences: 4 − 2 = +2, 10 − 4 = +6, 22 − 10 = +12, 42 − 22 = +20.\nNow check Level 2 differences: 6 − 2 = +4, 12 − 6 = +6, 20 − 12 = +8. The 2nd differences are increasing by 2 (+4, +6, +8, +10).\nThe next Level 1 difference is 20 + 10 = 30. Adding 30 to 42 gives 72.",
    whyIncorrect: {
      0: "64 assumes the difference is +22.",
      1: "68 assumes the difference is +26.",
      3: "76 adds 34."
    }
  },
  {
    id: 14,
    difficulty: "Moderate",
    category: "Alternating Operations",
    question: "Find the missing number in the series:\n3, 6, 9, 18, 21, 42, __",
    options: ["44", "45", "84", "88"],
    correctAnswer: 1, // index 1: "45"
    explanation: "Observe the alternating mathematical operations:\n3 × 2 = 6\n6 + 3 = 9\n9 × 2 = 18\n18 + 3 = 21\n21 × 2 = 42\nThe pattern alternates between (×2) and (+3). Following (×2), the next operation is (+3): 42 + 3 = 45.",
    whyIncorrect: {
      0: "44 adds only 2.",
      2: "84 mistakenly performs (×2) again instead of the alternating (+3).",
      3: "88 performs (×2) and adds 4."
    }
  },
  {
    id: 15,
    difficulty: "Moderate",
    category: "Square Pattern with Offset",
    question: "Find the missing number in the series:\n2, 5, 10, 17, 26, __",
    options: ["35", "36", "37", "39"],
    correctAnswer: 2, // index 2: "37"
    explanation: "Method 1: Each term is of the form (n² + 1):\n1² + 1 = 2, 2² + 1 = 5, 3² + 1 = 10, 4² + 1 = 17, 5² + 1 = 26.\nNext is 6² + 1 = 36 + 1 = 37.\nMethod 2: Consecutive differences are odd numbers: +3, +5, +7, +9, next is +11 (26 + 11 = 37).",
    whyIncorrect: {
      0: "35 is 6² − 1.",
      1: "36 is simply 6², forgetting the +1 offset.",
      3: "39 adds 13 instead of 11."
    }
  },
  {
    id: 16,
    difficulty: "Moderate",
    category: "Alternating Series",
    question: "Find the missing number in the alternating series:\n12, 3, 15, 6, 18, 9, __",
    options: ["12", "20", "21", "24"],
    correctAnswer: 2, // index 2: "21"
    explanation: "Separate into two independent interleaved sequences:\nOdd positions: 12, 15, 18, __ (adds 3 each time)\nEven positions: 3, 6, 9 (adds 3 each time)\nThe missing number is at the 7th (odd) position: 18 + 3 = 21.",
    whyIncorrect: {
      0: "12 is from the even sequence (9 + 3), but this position belongs to the odd sequence.",
      1: "20 adds only 2 to 18.",
      3: "24 adds 6 to 18."
    }
  },
  {
    id: 17,
    difficulty: "Moderate",
    category: "Decreasing Multiplier / Division",
    question: "Find the missing number in the series:\n240, 120, 40, 10, __",
    options: ["2", "3", "4", "5"],
    correctAnswer: 0, // index 0: "2"
    explanation: "Inspect the division factor between consecutive terms:\n240 ÷ 2 = 120\n120 ÷ 3 = 40\n40 ÷ 4 = 10\nThe divisor increases by 1 each time (÷2, ÷3, ÷4, ÷5). Therefore, 10 ÷ 5 = 2.",
    whyIncorrect: {
      1: "3 divides by 3.33 instead of 5.",
      2: "4 assumes division by 2.5.",
      3: "5 repeats division by 2 instead of dividing by 5."
    }
  },

  // --- Questions 18 to 20: Applied Reasoning & Mixed Patterns ---
  {
    id: 18,
    difficulty: "Applied Reasoning",
    category: "Cube Pattern with Offset",
    question: "Find the missing number in the series:\n0, 7, 26, 63, 124, __",
    options: ["195", "215", "216", "225"],
    correctAnswer: 1, // index 1: "215"
    explanation: "Compare each term to perfect cubes (n³ − 1):\n1³ − 1 = 1 − 1 = 0\n2³ − 1 = 8 − 1 = 7\n3³ − 1 = 27 − 1 = 26\n4³ − 1 = 64 − 1 = 63\n5³ − 1 = 125 − 1 = 124\nThe next term is 6³ − 1 = 216 − 1 = 215.",
    whyIncorrect: {
      0: "195 is not related to 6³.",
      2: "216 is exact 6³, forgetting to subtract 1.",
      3: "225 is 15²."
    }
  },
  {
    id: 19,
    difficulty: "Applied Reasoning",
    category: "Fibonacci / Sum of Previous Two",
    question: "Find the missing number in the series:\n2, 3, 5, 8, 13, 21, __",
    options: ["28", "32", "34", "35"],
    correctAnswer: 2, // index 2: "34"
    explanation: "This is a Fibonacci-type sequence where each number is the sum of the two preceding numbers:\n2 + 3 = 5\n3 + 5 = 8\n5 + 8 = 13\n8 + 13 = 21\nTherefore, the missing number is 13 + 21 = 34.",
    whyIncorrect: {
      0: "28 assumes adding 7.",
      1: "32 is an addition error.",
      3: "35 adds 14 instead of 13."
    }
  },
  {
    id: 20,
    difficulty: "Applied Reasoning",
    category: "Mixed Operations (×2 − 1)",
    question: "Find the missing number in the series:\n4, 7, 13, 25, 49, __",
    options: ["95", "97", "98", "99"],
    correctAnswer: 1, // index 1: "97"
    explanation: "This series can be solved by two consistent rules:\nMethod 1: Each term is multiplied by 2, then subtracted by 1: (4×2−1=7, 7×2−1=13, 13×2−1=25, 25×2−1=49). Next is 49×2 − 1 = 98 − 1 = 97.\nMethod 2: The differences double at each step: +3, +6, +12, +24. The next difference is +48 (49 + 48 = 97).",
    whyIncorrect: {
      0: "95 subtracts 3 instead of 1.",
      2: "98 is 49 × 2, forgetting to subtract 1.",
      3: "99 adds 1 instead of subtracting 1."
    }
  }
];
