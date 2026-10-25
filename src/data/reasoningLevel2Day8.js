// ==========================================
// SPOKO LOGICAL REASONING - LEVEL 2 (INTERMEDIATE)
// DAY 8: DATA INTERPRETATION
// Tables, Charts, Percentages, Comparisons & Trends
// REAL-TIME MEDICAL INDUSTRY & PRODUCT SALES DATASET
// ==========================================

export const day8Overview = {
  courseName: "Logical Reasoning",
  level: "Level 2 – Intermediate",
  dayNumber: 8,
  title: "Data Interpretation",
  subtitle: "Tables, Charts, Percentages, Comparisons & Trends",
  targetAudience: "Students, college learners, job seekers, and professionals preparing for aptitude tests and interviews.",
  difficulty: "Intermediate",
  estimatedMinutes: 50,
  description: "Master the art of reading, extracting, analyzing, and synthesizing numerical data from tables, bar charts, pie charts, and line graphs using real-time medical industry, hospital procurement, and clinical product sales datasets.",
  learningObjectives: [
    "Read and interpret numerical data accurately across tables, bar charts, pie charts, and line graphs.",
    "Calculate percentages, percentage increases, percentage decreases, ratios, and category averages.",
    "Compare multi-variable product categories to identify highest/lowest values, gaps, and relative proportions.",
    "Recognize time-series trends, inflection points, and growth/decline trajectories in commercial datasets.",
    "Draw accurate, airtight conclusions based solely on provided data without falling for unsupported assumptions.",
    "Avoid the top 8 common mathematical and logical pitfalls in aptitude examinations.",
    "Solve timed multi-step data interpretation questions confidently under test constraints."
  ]
};

// ==========================================
// 1. CORE CONCEPTS & THEORY CONTENT
// ==========================================

export const coreConcepts = {
  intro: {
    title: "What is Data Interpretation (DI)?",
    summary: "Data Interpretation is the cognitive process of examining structured numerical and qualitative facts (presented in tables, charts, or graphs), discerning meaningful patterns, and drawing logically sound, mathematically proven conclusions.",
    importance: [
      "Competitive Exams: DI forms 20% to 35% of quantitative aptitude sections in bank exams (IBPS/SBI), placement drives, CAT, GRE, and SSC.",
      "Placement Tests: Tech companies and consulting firms use DI tests to evaluate quantitative agility and analytical problem-solving speed.",
      "Business & Healthcare Operations: Modern managers use dashboards to track monthly medical product sales, clinical equipment shipments, hospital procurement conversions, and diagnostic revenue trajectories."
    ],
    goldenRule: "Golden Rule of DI: Never assume anything beyond what the chart or table explicitly states. Plausible-sounding external assumptions are the #1 source of wrong answers."
  },

  concept1_tables: {
    title: "Concept 1: Reading and Analyzing Tables",
    description: "Tables organize data into horizontal rows and vertical columns. They represent exact numerical values rather than visual approximations.",
    readingProtocol: [
      { step: "1. Read Table Title & Units", detail: "Check whether numbers are in units, thousands, lakhs, crores, or percentages." },
      { step: "2. Scan Row & Column Labels", detail: "Understand what each row represents (e.g., Medical Equipment Models) and what each column represents (e.g., Months)." },
      { step: "3. Locate Marginal Totals", detail: "Identify row totals (sum across models) and column totals (sum across time)." },
      { step: "4. Cross-Reference Coordinates", detail: "To find Digital Ultrasound sales in March, trace the Ultrasound row and March column intersection." }
    ],
    sampleDataset: {
      title: "Medical Equipment & Device Product Sales (Units Shipped: Jan – Apr 2026)",
      columns: ["Medical Equipment Model", "January", "February", "March", "April", "Total by Model"],
      rows: [
        ["Patient Multi-Parameter Monitors", 40, 50, 60, 70, 220],
        ["Digital Ultrasound Systems", 60, 75, 90, 105, 330],
        ["Surgical Infusion Pumps", 30, 45, 60, 75, 210],
        ["Diagnostic ECG Recorders", 20, 30, 40, 50, 140]
      ],
      totals: ["Monthly Total Shipments", 150, 200, 250, 300, 900]
    },
    keyInsights: [
      "Total medical device shipments grew consistently from 150 units in Jan to 300 units in Apr (exactly doubled).",
      "Digital Ultrasound Systems recorded the largest total sales volume (330 units, 36.7% of all medical device shipments).",
      "Every medical equipment category experienced positive sales growth in every single month."
    ]
  },

  concept2_barcharts: {
    title: "Concept 2: Bar Charts and Category Comparisons",
    description: "Bar charts present discrete categories along one axis and quantitative values along the other. The length or height of the bar is directly proportional to the magnitude.",
    keyTechniques: [
      "Highest & Lowest: Quickly spot the tallest and shortest bars to establish category extremes.",
      "Differences: Subtract bar heights between two categories or timeframes (e.g., Ultrasound vs. ECG in March).",
      "Combined Totals: Sum heights across stacked or grouped bars.",
      "Period-over-Period Shifts: Compare bars for the same category across adjacent time windows."
    ],
    dataset: [
      { model: "Patient Monitors", jan: 40, apr: 70 },
      { model: "Ultrasound Systems", jan: 60, apr: 105 },
      { model: "Infusion Pumps", jan: 30, apr: 75 },
      { model: "ECG Recorders", jan: 20, apr: 50 }
    ],
    workedNote: "Absolute unit sales growth is largest for Ultrasound Systems (+45 units), but relative percentage growth is highest for Infusion Pumps (+150%) and ECG Recorders (+150%)."
  },

  concept3_piecharts: {
    title: "Concept 3: Pie Charts and Sector Proportions",
    description: "A pie chart represents 100% of a dataset divided into circular sectors. Each sector's angle and area correspond to its percentage share of the whole.",
    formula: "Value = (Percentage ÷ 100) × Total  |  Angle (degrees) = (Percentage ÷ 100) × 360°",
    dataset: {
      totalFleet: 600,
      distribution: [
        { category: "Digital Ultrasound Systems", percentage: 30, count: 180, angle: 108 },
        { category: "Patient Multi-Parameter Monitors", percentage: 25, count: 150, angle: 90 },
        { category: "Surgical Infusion Pumps", percentage: 20, count: 120, angle: 72 },
        { category: "Diagnostic ECG Recorders", percentage: 15, count: 90, angle: 54 },
        { category: "Portable ICU Ventilators", percentage: 10, count: 60, angle: 36 }
      ]
    },
    examples: [
      {
        question: "How many units of Digital Ultrasound Systems are deployed across the hospital network?",
        steps: "Value = (30 ÷ 100) × 600 = 0.30 × 600 = 180 units."
      },
      {
        question: "What is the sector angle for Patient Multi-Parameter Monitors?",
        steps: "Angle = (25 ÷ 100) × 360° = 0.25 × 360° = 90° (a quarter of the circle)."
      }
    ]
  },

  concept4_percentages: {
    title: "Concept 4: Percentages and Percentage Change",
    description: "Percentages form the mathematical backbone of data interpretation. Understanding which value is the base (denominator) is critical.",
    formulas: [
      { name: "Share / Proportion", formula: "Percentage = (Part ÷ Whole) × 100" },
      { name: "Percentage Increase", formula: "% Increase = ((New Value − Old Value) ÷ Old Value) × 100" },
      { name: "Percentage Decrease", formula: "% Decrease = ((Old Value − New Value) ÷ Old Value) × 100" },
      { name: "A is what % of B", formula: "% = (A ÷ B) × 100" },
      { name: "A is what % MORE than B", formula: "% More = ((A − B) ÷ B) × 100" }
    ],
    criticalWarning: "Always divide by the ORIGINAL (Old) value when calculating percentage change, NEVER by the new value!"
  },

  concept5_ratios_averages: {
    title: "Concept 5: Ratios and Averages",
    description: "Ratios compare the relative size of two or more values, while averages summarize multi-item datasets into a single representative benchmark.",
    ratiosGuide: "To find the ratio of A to B, write A/B and simplify by dividing both numbers by their Greatest Common Divisor (GCD). E.g., 60 : 90 = 2 : 3.",
    averagesGuide: "Average = (Sum of all values) ÷ (Number of items). E.g., monthly medical unit sales average = (150 + 200 + 250 + 300) ÷ 4 = 900 ÷ 4 = 225 units."
  },

  concept6_linecharts: {
    title: "Concept 6: Line Charts and Trend Analysis",
    description: "Line charts connect consecutive data points across continuous intervals (such as days, months, or years) to highlight trajectories and volatility.",
    trendTypes: [
      { type: "Upward Trend", desc: "Data values steadily rise over time (positive growth)." },
      { type: "Downward Trend", desc: "Data values steadily decrease over time (negative growth)." },
      { type: "Inflection Point", desc: "A point where the direction suddenly reverses (e.g., peak or trough)." },
      { type: "Plateau / Stagnation", desc: "A period where values remain virtually flat with near-zero change." }
    ],
    sampleRevenue: [
      { month: "Jan", revenue: 120000 },
      { month: "Feb", revenue: 150000 },
      { month: "Mar", revenue: 140000 },
      { month: "Apr", revenue: 180000 },
      { month: "May", revenue: 210000 },
      { month: "Jun", revenue: 200000 }
    ],
    observation: "Overall growth is positive (from ₹1.2L to ₹2.0L), but minor pullbacks occurred in March (-₹10k) and June (-₹10k)."
  },

  concept7_conclusions: {
    title: "Concept 7: Comparing Datasets & Drawing Valid Conclusions",
    description: "Aptitude tests intentionally insert 'plausible traps' — statements that sound true in everyday life but have zero mathematical support in the data.",
    rules: [
      { rule: "Valid Conclusion", explanation: "Must be directly proven by numerical calculation or explicit chart facts." },
      { rule: "Unsupported Assumption", explanation: "Explains 'why' something occurred when the chart only records 'what' occurred." }
    ],
    caseExample: {
      statement: "Data shows Digital Ultrasound unit sales increased by 50% after a medical trade expo in February.",
      valid: "Ultrasound sales rose from 60 units in Jan to 90 units in March (+50%).",
      invalid: "The trade expo was the primary cause of the increase (the table does not record marketing attribution or causality)."
    }
  }
};

// ==========================================
// 2. EIGHT WORKED MASTER EXAMPLES
// ==========================================

export const workedExamples = [
  {
    id: "ex1",
    title: "Example 1: Cross-Table Reading & Summation",
    datasetDesc: "Refer to the Medical Equipment Product Sales Table (Jan–Apr 2026).",
    question: "What was the total number of clinical equipment units delivered (Patient Monitors + Digital Ultrasound Systems) during February and March combined?",
    requiredInfo: "Patient Monitors and Ultrasound Systems sales for February and March.",
    method: "Sum values: (Monitors Feb + Monitors Mar) + (Ultrasound Feb + Ultrasound Mar).",
    steps: [
      "Patient Monitors in February = 50, in March = 60 → Monitors Total = 50 + 60 = 110 units.",
      "Digital Ultrasound Systems in February = 75, in March = 90 → Ultrasound Total = 75 + 90 = 165 units.",
      "Combined Total = 110 + 165 = 275 medical units delivered."
    ],
    finalAnswer: "275 units",
    explanation: "Locating the exact cell values at row/column intersections and adding them gives 275."
  },
  {
    id: "ex2",
    title: "Example 2: Percentage Increase Calculation",
    datasetDesc: "Refer to total medical device shipments: Jan = 150 units, Apr = 300 units.",
    question: "By what percentage did total medical device shipments increase from January to April?",
    requiredInfo: "Old Value (Jan = 150), New Value (Apr = 300).",
    method: "Percentage Increase = ((New − Old) ÷ Old) × 100",
    steps: [
      "Absolute Increase = 300 − 150 = 150 units.",
      "Divide by base (Old Value): 150 ÷ 150 = 1.0.",
      "Multiply by 100: 1.0 × 100 = 100%."
    ],
    finalAnswer: "100%",
    explanation: "Shipments doubled from 150 to 300 units, which represents a 100% net increase."
  },
  {
    id: "ex3",
    title: "Example 3: Ratio Between Two Categories",
    datasetDesc: "In April, the manufacturer shipped 70 Patient Monitors and 75 Surgical Infusion Pumps.",
    question: "What is the simplified ratio of Surgical Infusion Pumps to Patient Monitors sold in April?",
    requiredInfo: "Surgical Infusion Pumps (75), Patient Monitors (70).",
    method: "Ratio = Infusion Pumps : Patient Monitors = 75 : 70. Simplify by dividing by common factor 5.",
    steps: [
      "75 ÷ 5 = 15.",
      "70 ÷ 5 = 14.",
      "Ratio = 15 : 14."
    ],
    finalAnswer: "15 : 14",
    explanation: "The ratio must respect the stated order (Surgical Infusion Pumps first, Patient Monitors second)."
  },
  {
    id: "ex4",
    title: "Example 4: Pie Chart Value Extraction",
    datasetDesc: "A hospital network has an allocated fleet of 800 diagnostic devices. Portable ICU Ventilators represent 15% of the pie chart.",
    question: "How many Portable ICU Ventilators are in the hospital fleet?",
    requiredInfo: "Total = 800, Sector Percentage = 15%.",
    method: "Value = (Percentage ÷ 100) × Total",
    steps: [
      "15 ÷ 100 = 0.15.",
      "0.15 × 800 = 120 units."
    ],
    finalAnswer: "120 units",
    explanation: "10% of 800 is 80; 5% is 40. 80 + 40 = 120."
  },
  {
    id: "ex5",
    title: "Example 5: Four-Month Average Calculation",
    datasetDesc: "Surgical Infusion Pumps monthly shipments: Jan (30), Feb (45), Mar (60), Apr (75).",
    question: "What is the average monthly sales volume for Surgical Infusion Pumps?",
    requiredInfo: "Sum of 4 months, divided by 4.",
    method: "Average = (Sum of Values) ÷ (Number of Months)",
    steps: [
      "Sum = 30 + 45 + 60 + 75 = 210 units.",
      "Average = 210 ÷ 4 = 52.5 units per month."
    ],
    finalAnswer: "52.5 units",
    explanation: "The sum of 210 units distributed over 4 months yields exactly 52.5."
  },
  {
    id: "ex6",
    title: "Example 6: Comparing Relative Growth Rates",
    datasetDesc: "From Jan to Apr: Patient Monitors grew from 40 to 70 units (+30); Diagnostic ECG Recorders grew from 20 to 50 units (+30).",
    question: "Both medical devices grew by 30 units. Which device had the higher percentage growth rate?",
    requiredInfo: "Percentage growth = (Increase ÷ Initial Value) × 100.",
    method: "Compare (30/40)*100 vs (30/20)*100.",
    steps: [
      "Patient Monitors: (30 ÷ 40) × 100 = 75%.",
      "Diagnostic ECG Recorders: (30 ÷ 20) × 100 = 150%.",
      "Diagnostic ECG Recorders grew at double the rate of Patient Monitors."
    ],
    finalAnswer: "Diagnostic ECG Recorders (150% vs 75%)",
    explanation: "A smaller base value results in a substantially higher percentage growth for the same absolute unit gain."
  },
  {
    id: "ex7",
    title: "Example 7: Line Graph Trend Inflection Identification",
    datasetDesc: "Monthly medical product sales revenues: Jan (₹1.2L), Feb (₹1.5L), Mar (₹1.4L), Apr (₹1.8L), May (₹2.1L), Jun (₹2.0L).",
    question: "In which month did the medical distributor experience its first month-over-month revenue decline?",
    requiredInfo: "Compare each month's revenue with the preceding month.",
    method: "Identify the first month where Revenue(M) < Revenue(M-1).",
    steps: [
      "Feb vs Jan: 1.5L vs 1.2L → +0.3L (Increase).",
      "Mar vs Feb: 1.4L vs 1.5L → -0.1L (Decline).",
      "March experienced the first revenue drop."
    ],
    finalAnswer: "March",
    explanation: "March revenue dropped by ₹10,000 compared to February, making it the first downward inflection point."
  },
  {
    id: "ex8",
    title: "Example 8: Distinguishing Supported Conclusions from Assumptions",
    datasetDesc: "Diagnostic ECG Recorder unit sales increased by 150% from January to April.",
    question: "Which of the following is a VALID conclusion supported by this data?\nA) ECG Recorders became easier to operate in April.\nB) ECG Recorder sales volume expanded at a faster percentage rate than Patient Monitors.\nC) Cardiovascular diseases doubled across hospitals in April.\nD) Hospital cardiologists preferred this model over competitor brands.",
    requiredInfo: "Mathematical comparison with other product growth rates.",
    method: "Check which option is proven strictly by the numbers.",
    steps: [
      "Option A, C, D are unverified assumptions attempting to explain causation with zero clinical evidence.",
      "Option B is mathematically true: ECG Recorders grew by 150%, while Patient Monitors grew by 75%."
    ],
    finalAnswer: "Option B",
    explanation: "Only comparative percentage growth is mathematically verified by the data."
  }
];

// ==========================================
// 3. THREE PROGRESSIVE PRACTICE SETS
// ==========================================

export const practiceSetA = {
  title: "Practice Set A: Beginner",
  timeLimitSeconds: 300, // 5 minutes
  description: "Focus on table reading, bar chart comparisons, and percentage basics.",
  dataset: {
    columns: ["Region", "Q1 Sales (Units)", "Q2 Sales (Units)", "Target (Units)"],
    rows: [
      ["North Region", 120, 150, 140],
      ["South Region", 200, 240, 220],
      ["East Region", 90, 110, 100],
      ["West Region", 150, 180, 160]
    ]
  },
  questions: [
    {
      id: "pa_q1",
      question: "Which region achieved the highest sales volume in Q2?",
      options: ["North Region", "South Region", "East Region", "West Region"],
      correctAnswer: 1, // South Region
      explanation: "South Region recorded 240 units in Q2, which is higher than North (150), East (110), and West (180).",
      distractorNotes: "West is second highest (180)."
    },
    {
      id: "pa_q2",
      question: "What was the combined Q1 sales across all four regions?",
      options: ["520 units", "540 units", "560 units", "580 units"],
      correctAnswer: 2, // 560 units
      explanation: "Sum Q1 = 120 + 200 + 90 + 150 = 560 units.",
      distractorNotes: "540 misses 20 units; 580 is an addition error."
    },
    {
      id: "pa_q3",
      question: "By what percentage did sales in the North Region increase from Q1 to Q2?",
      options: ["20%", "25%", "30%", "33.3%"],
      correctAnswer: 1, // 25%
      explanation: "% Increase = ((150 − 120) ÷ 120) × 100 = (30 ÷ 120) × 100 = 0.25 × 100 = 25%.",
      distractorNotes: "20% mistakenly divides by the new value 150."
    },
    {
      id: "pa_q4",
      question: "Which region exceeded its sales target by the greatest absolute number of units in Q2?",
      options: ["North Region (+10)", "South Region (+20)", "East Region (+10)", "West Region (+20)"],
      correctAnswer: 1, // South Region (+20) and West (+20)
      explanation: "South = 240 − 220 = +20; West = 180 − 160 = +20. Both tied for the highest margin (+20). South is option B.",
      distractorNotes: "North is +10; East is +10."
    },
    {
      id: "pa_q5",
      question: "What is the ratio of Q2 sales in the East Region to Q2 sales in the West Region?",
      options: ["11 : 18", "9 : 15", "1 : 2", "3 : 5"],
      correctAnswer: 0, // 11 : 18
      explanation: "East Q2 = 110; West Q2 = 180. Ratio = 110 : 180. Divide both by 10 → 11 : 18.",
      distractorNotes: "9:15 is the Q1 ratio (90:150 = 3:5)."
    }
  ]
};

export const practiceSetB = {
  title: "Practice Set B: Intermediate",
  timeLimitSeconds: 420, // 7 minutes
  description: "Focus on percentages, percentage change, category ratios, and healthcare budget pie chart calculations.",
  dataset: {
    title: "Annual Healthcare Clinic Operating Budget Allocation (Total = ₹10,00,000)",
    sectors: [
      { category: "Medical Staff & Physician Salaries", percentage: 40, amount: 400000 },
      { category: "Diagnostic Equipment & Lab Tech", percentage: 25, amount: 250000 },
      { category: "Clinical Consumables & Pharmaceuticals", percentage: 15, amount: 150000 },
      { category: "Hospital Outreach & Patient Services", percentage: 12, amount: 120000 },
      { category: "Sanitization & Bio-waste Facility", percentage: 8, amount: 80000 }
    ]
  },
  questions: [
    {
      id: "pb_q1",
      question: "How much money in rupees is allocated to Diagnostic Equipment & Lab Tech?",
      options: ["₹1,50,000", "₹2,00,000", "₹2,50,000", "₹3,00,000"],
      correctAnswer: 2, // ₹2,50,000
      explanation: "Diagnostic Equipment = 25% of ₹10,00,000 = 0.25 × 10,00,000 = ₹2,50,000.",
      distractorNotes: "₹1,50,000 is for Clinical Consumables (15%)."
    },
    {
      id: "pb_q2",
      question: "What is the simplified ratio of the budget for Medical Staff Salaries to Clinical Consumables?",
      options: ["8 : 3", "5 : 2", "4 : 1", "7 : 3"],
      correctAnswer: 0, // 8 : 3
      explanation: "Medical Staff = 40%; Clinical Consumables = 15%. Ratio = 40 : 15. Divide both by 5 → 8 : 3.",
      distractorNotes: "5 : 2 is 25:10; 4:1 is 40:10."
    },
    {
      id: "pb_q3",
      question: "What is the sector angle in degrees for Hospital Outreach & Patient Services (12%) in a circular pie chart?",
      options: ["36.0°", "43.2°", "48.0°", "52.4°"],
      correctAnswer: 1, // 43.2°
      explanation: "Angle = (Percentage ÷ 100) × 360° = (12 ÷ 100) × 360° = 0.12 × 360 = 43.2°.",
      distractorNotes: "36° is 10%; 48° is 13.3%."
    },
    {
      id: "pb_q4",
      question: "If the total clinic budget increases by 20% next year, what will be the new total budget?",
      options: ["₹11,00,000", "₹12,00,000", "₹12,50,000", "₹14,00,000"],
      correctAnswer: 1, // ₹12,00,000
      explanation: "20% of ₹10,00,000 = ₹2,00,000. New budget = 10,00,000 + 2,00,000 = ₹12,00,000.",
      distractorNotes: "₹11,00,000 is only a 10% increase."
    },
    {
      id: "pb_q5",
      question: "By what percentage is the budget for Medical Staff Salaries (40%) greater than Diagnostic Equipment (25%)?",
      options: ["15%", "37.5%", "60%", "75%"],
      correctAnswer: 2, // 60%
      explanation: "% More = ((40 − 25) ÷ 25) × 100 = (15 ÷ 25) × 100 = 0.60 × 100 = 60%. (Note: The difference is 15 percentage points, but 60 percent relative to Diagnostic Equipment).",
      distractorNotes: "15% confuses percentage points with percentage increase."
    }
  ]
};

export const practiceSetC = {
  title: "Practice Set C: Advanced",
  timeLimitSeconds: 600, // 10 minutes
  description: "Focus on multi-step reasoning, clinical audit comparisons, and distinguishing facts from assumptions.",
  dataset: {
    columns: ["Clinical Quality Metric", "Hospital Ward Alpha", "Hospital Ward Beta"],
    rows: [
      ["Patient Safety Protocols", 75, 82],
      ["Medication Dispensing Accuracy", 85, 64],
      ["Hygiene & Sterilization", 62, 75],
      ["Diagnostic Turnaround Time", 78, 86],
      ["Medical Record Compliance", 70, 78]
    ]
  },
  questions: [
    {
      id: "pc_q1",
      question: "In which quality metric did Hospital Ward Alpha outperform Hospital Ward Beta by the widest margin?",
      options: [
        "Patient Safety Protocols",
        "Medication Dispensing Accuracy",
        "Diagnostic Turnaround Time",
        "Medical Record Compliance"
      ],
      correctAnswer: 1, // Medication Dispensing Accuracy
      explanation: "In Medication Dispensing, Alpha (85) exceeded Beta (64) by 85 − 64 = 21 points. In all other metrics where Alpha led, the gap was smaller.",
      distractorNotes: "In Patient Safety, Beta led Alpha (82 vs 75)."
    },
    {
      id: "pc_q2",
      question: "What is the average clinical quality audit score for Hospital Ward Alpha across all 5 metrics?",
      options: ["72.0", "74.0", "76.0", "78.0"],
      correctAnswer: 1, // 74.0
      explanation: "Sum Alpha = 75 + 85 + 62 + 78 + 70 = 370. Average = 370 ÷ 5 = 74.0.",
      distractorNotes: "360 ÷ 5 = 72; 380 ÷ 5 = 76."
    },
    {
      id: "pc_q3",
      question: "By what percentage is Ward Beta's Diagnostic Turnaround score (86) higher than Ward Alpha's score (78)?",
      options: ["8.0%", "10.3%", "12.5%", "14.2%"],
      correctAnswer: 1, // 10.3%
      explanation: "Percentage difference = ((86 − 78) ÷ 78) × 100 = (8 ÷ 78) × 100 ≈ 10.256% ≈ 10.3%.",
      distractorNotes: "8.0% is just the absolute difference in points (86 - 78)."
    },
    {
      id: "pc_q4",
      question: "What is the ratio of total audit score achieved by Ward Beta (385) to Ward Alpha (370)?",
      options: ["77 : 74", "75 : 72", "38 : 37", "80 : 75"],
      correctAnswer: 0, // 77 : 74
      explanation: "Beta total = 82 + 64 + 75 + 86 + 78 = 385. Alpha total = 370. Ratio = 385 : 370. Divide both by 5 → 77 : 74.",
      distractorNotes: "385 ÷ 5 = 77; 370 ÷ 5 = 74."
    },
    {
      id: "pc_q5",
      question: "Which conclusion is STRICTLY supported by the clinical audit dataset?",
      options: [
        "Ward Beta clinical staff are naturally more attentive to patients.",
        "Ward Beta achieved a higher aggregate quality audit score across the five metrics than Ward Alpha.",
        "Ward Alpha physicians received better residency training.",
        "Medical Record Compliance was the hardest benchmark for all hospital staff."
      ],
      correctAnswer: 1, // Option B
      explanation: "Ward Beta total (385) is strictly greater than Ward Alpha total (370). Options A, C, and D are external assumptions not supported by audit points alone.",
      distractorNotes: "Never conclude 'natural attentiveness' or 'better training' from raw benchmark scores."
    }
  ]
};

// ==========================================
// 4. REAL-WORLD CASE STUDY: MEDICAL PRODUCT SALES
// ==========================================

export const instituteCaseStudy = {
  title: "Analyze MedTech Global's Medical Product Sales & Hospital Procurement",
  description: "Examine this 4-month commercial equipment distribution report for MedTech Global Systems and answer the diagnostic questions below.",
  benchmarkNote: "December Benchmark (Previous Period): 200 Hospital Inquiries, 40 Equipment Orders, ₹3,20,000 Sales Revenue.",
  tableData: [
    { month: "January", enquiries: 250, admissions: 50, python: 20, web: 15, data: 10, tally: 5, revenue: 400000 },
    { month: "February", enquiries: 300, admissions: 75, python: 30, web: 22, data: 15, tally: 8, revenue: 600000 },
    { month: "March", enquiries: 400, admissions: 120, python: 48, web: 36, data: 24, tally: 12, revenue: 960000 },
    { month: "April", enquiries: 350, admissions: 105, python: 42, web: 31, data: 21, tally: 11, revenue: 840000 }
  ],
  totals: {
    enquiries: 1300,
    admissions: 350,
    python: 140,
    web: 104,
    data: 70,
    tally: 36,
    revenue: 2800000
  },
  questions: [
    {
      id: "cs_q1",
      task: "1. Month with Highest Equipment Orders",
      prompt: "Which month recorded the highest total confirmed hospital equipment orders (units sold)?",
      options: ["January", "February", "March", "April"],
      correctAnswer: 2, // March
      analysis: "March recorded 120 equipment orders, surpassing January (50), February (75), and April (105)."
    },
    {
      id: "cs_q2",
      task: "2. Inquiry-to-Order Conversion Percentage",
      prompt: "What was the hospital inquiry-to-order conversion rate in March?",
      options: ["25.0%", "28.5%", "30.0%", "33.3%"],
      correctAnswer: 2, // 30.0%
      analysis: "Conversion Rate = (Orders ÷ Inquiries) × 100 = (120 ÷ 400) × 100 = 0.30 × 100 = 30.0%."
    },
    {
      id: "cs_q3",
      task: "3. Sales Revenue Comparison",
      prompt: "By how much did medical equipment sales revenue increase in March compared to February?",
      options: ["₹2,40,000", "₹3,20,000", "₹3,60,000", "₹4,00,000"],
      correctAnswer: 2, // ₹3,60,000
      analysis: "March Revenue = ₹9,60,000; February Revenue = ₹6,00,000. Difference = 9,60,000 − 6,00,000 = ₹3,60,000."
    },
    {
      id: "cs_q4",
      task: "4. Percentage Revenue Growth",
      prompt: "What was the percentage increase in sales revenue from January to February?",
      options: ["33.3%", "40.0%", "50.0%", "66.7%"],
      correctAnswer: 2, // 50.0%
      analysis: "% Increase = ((6,00,000 − 4,00,000) ÷ 4,00,000) × 100 = (2,00,000 ÷ 4,00,000) × 100 = 50.0%."
    },
    {
      id: "cs_q5",
      task: "5. Best Performing Medical Device Model",
      prompt: "Which medical equipment model registered the highest cumulative units sold across the four months?",
      options: ["Patient Monitors (104)", "Digital Ultrasound Systems (140)", "Surgical Infusion Pumps (70)", "Diagnostic ECG Recorders (36)"],
      correctAnswer: 1, // Digital Ultrasound Systems (140)
      analysis: "Digital Ultrasound Systems sales totaled 20 + 30 + 48 + 42 = 140 units, leading Patient Monitors (104), Surgical Infusion Pumps (70), and Diagnostic ECG Recorders (36)."
    },
    {
      id: "cs_q6",
      task: "6. Supported Conclusion",
      prompt: "Which conclusion is directly supported by the 4-month commercial distribution dataset?",
      options: [
        "Sales revenue per confirmed medical equipment unit remained constant at ₹8,000 in every single month.",
        "Hospitals prefer Ultrasound Systems because private ultrasound clinics generate higher insurance reimbursement.",
        "April revenue declined because hospital procurement officers were on vacation.",
        "Hospital RFP inquiries will definitely exceed 600 next May."
      ],
      correctAnswer: 0, // Constant revenue per unit
      analysis: "Jan: 4L/50 = ₹8,000; Feb: 6L/75 = ₹8,000; Mar: 9.6L/120 = ₹8,000; Apr: 8.4L/105 = ₹8,000. The average sales revenue per equipment unit was identically ₹8,000 every month!"
    },
    {
      id: "cs_q7",
      task: "7. Identifying an Unsupported Assumption",
      prompt: "Which statement is an UNPROVEN ASSUMPTION that cannot be determined from this table?",
      options: [
        "March had more hospital inquiries than February.",
        "Total 4-month medical product sales revenue reached ₹28,00,000.",
        "April equipment orders dropped due to aggressive competitor discounts.",
        "January had an inquiry-to-order conversion rate of 20%."
      ],
      correctAnswer: 2, // Competitor discount assumption
      analysis: "The table contains no information regarding competitor pricing or market promotions. Attributing April's drop to competitor discounts is pure unverified conjecture."
    }
  ]
};

// ==========================================
// 5. COMMON MISTAKES AND STRATEGY TIPS
// ==========================================

export const commonMistakes = [
  {
    mistake: "1. Confusing Percentage Points with Percentage Change",
    explanation: "If conversion rises from 20% to 25%, the increase is 5 percentage points, but the percentage growth is ((25 - 20)/20) × 100 = 25%."
  },
  {
    mistake: "2. Using the Wrong Denominator",
    explanation: "When calculating '% more than B', divide by B. When calculating '% less than A', divide by A. The value after 'than' is always the base."
  },
  {
    mistake: "3. Confusing Value with Share",
    explanation: "A sector with a smaller percentage share can still have a larger absolute value if the total pie is significantly bigger."
  },
  {
    mistake: "4. Misreading Units and Multipliers",
    explanation: "Always check whether the axis or column label is in units, thousands, lakhs, or millions before doing mental calculations."
  },
  {
    mistake: "5. Assuming Unproven Causation",
    explanation: "If product sales jump in July, do not assume an ad campaign caused it unless the chart explicitly states marketing attribution."
  },
  {
    mistake: "6. Misinterpreting Pie Angles as Percentages",
    explanation: "A sector of 90° is NOT 90%. It is (90 / 360) × 100 = 25% of the total pie."
  },
  {
    mistake: "7. Eye-balling Bar Charts Instead of Checking Axis Grids",
    explanation: "Do not guess bar heights. Trace the top edge horizontally to the vertical axis to find the exact numerical coordinate."
  },
  {
    mistake: "8. Spending Too Long on Exact Division",
    explanation: "In multiple-choice questions with distinct options, round numbers to the nearest ten or hundred to eliminate options in under 15 seconds."
  }
];

export const examStrategies = [
  {
    title: "The 30-Second DI Strategy Checklist",
    rules: [
      "Step 1: Read the title, subtitle, and legend first (5 seconds).",
      "Step 2: Check axis units — are numbers in thousands, lakhs, or percentages? (5 seconds).",
      "Step 3: Read the question carefully to identify the exact rows, columns, or sectors required (10 seconds).",
      "Step 4: Scan the answer options before calculating — if options are widely spaced, approximate! (10 seconds)."
    ]
  }
];

// ==========================================
// 6. TIMED FINAL ASSESSMENT (20 QUESTIONS: EASY, MEDIUM & HARD)
// ==========================================

export const finalAssessmentQuestions = [
  // ------------------------------------------
  // EASY LEVEL (QUESTIONS 1 - 7)
  // ------------------------------------------
  {
    id: "fa_q1",
    difficulty: "Easy",
    category: "Table Reading",
    question: "A medical distributor's quarterly shipments show: Q1 (120 units), Q2 (180 units), Q3 (150 units), Q4 (210 units). What was the total annual shipment volume?",
    options: ["620 units", "640 units", "660 units", "680 units"],
    correctAnswer: 2, // 660 units
    explanation: "Total = 120 + 180 + 150 + 210 = 660 units.",
    distractorNotes: "640 is an arithmetic omission of 20 units."
  },
  {
    id: "fa_q2",
    difficulty: "Easy",
    category: "Direct Difference",
    question: "In a medical supply depot, Product X has 450 units in stock and Product Y has 300 units. How many more units of Product X are in stock compared to Product Y?",
    options: ["100 units", "125 units", "150 units", "175 units"],
    correctAnswer: 2, // 150 units
    explanation: "Difference = 450 − 300 = 150 units.",
    distractorNotes: "Simple subtraction of row coordinates."
  },
  {
    id: "fa_q3",
    difficulty: "Easy",
    category: "Extremes Identification",
    question: "A diagnostic clinic operates 4 branches. Branch A performed 500 tests, Branch B performed 750, Branch C performed 600, and Branch D performed 900. Which branch performed the lowest number of tests?",
    options: ["Branch A", "Branch B", "Branch C", "Branch D"],
    correctAnswer: 0, // Branch A
    explanation: "Branch A (500) has the smallest value among the four branches.",
    distractorNotes: "Branch D is the highest (900)."
  },
  {
    id: "fa_q4",
    difficulty: "Easy",
    category: "Ratio Computation",
    question: "In a medical research center of 120 scientists, 72 are women and 48 are men. What is the simplified ratio of men to women?",
    options: ["2 : 3", "3 : 2", "3 : 4", "4 : 5"],
    correctAnswer: 0, // 2 : 3
    explanation: "Men to Women = 48 : 72. Divide both by 24 → 2 : 3.",
    distractorNotes: "3 : 2 is women to men."
  },
  {
    id: "fa_q5",
    difficulty: "Easy",
    category: "Basic Percentage",
    question: "A clinic receives 250 walk-in patients on Monday. 20% of them are referred to the cardiology wing. How many patients were referred?",
    options: ["40 patients", "45 patients", "50 patients", "60 patients"],
    correctAnswer: 2, // 50 patients
    explanation: "Referred = 20% of 250 = (20 ÷ 100) × 250 = 0.20 × 250 = 50 patients.",
    distractorNotes: "40 is 16%; 60 is 24%."
  },
  {
    id: "fa_q6",
    difficulty: "Easy",
    category: "Pie Chart Share",
    question: "A hospital pharmacy reports that Antibiotics represent 25% of all dispensed medications. If 800 prescriptions were filled today, how many were Antibiotics?",
    options: ["150 prescriptions", "180 prescriptions", "200 prescriptions", "240 prescriptions"],
    correctAnswer: 2, // 200 prescriptions
    explanation: "Antibiotics = 25% of 800 = 800 ÷ 4 = 200 prescriptions.",
    distractorNotes: "150 is 18.75%; 240 is 30%."
  },
  {
    id: "fa_q7",
    difficulty: "Easy",
    category: "Shift Summation",
    question: "An intensive care unit orders sterile surgical gloves across three shifts: Morning (140 boxes), Afternoon (110 boxes), and Night (90 boxes). What was the total number of boxes ordered?",
    options: ["320 boxes", "330 boxes", "340 boxes", "360 boxes"],
    correctAnswer: 2, // 340 boxes
    explanation: "Total = 140 + 110 + 90 = 340 boxes.",
    distractorNotes: "330 is an arithmetic error of 10."
  },

  // ------------------------------------------
  // MEDIUM LEVEL (QUESTIONS 8 - 14)
  // ------------------------------------------
  {
    id: "fa_q8",
    difficulty: "Medium",
    category: "Sector Angle",
    question: "In a hospital operating expense pie chart, Emergency Care accounts for 30% of total expenditure. What is the angle of this sector in degrees?",
    options: ["90°", "108°", "120°", "135°"],
    correctAnswer: 1, // 108°
    explanation: "Angle = (30 ÷ 100) × 360° = 0.30 × 360 = 108°.",
    distractorNotes: "90° is 25%; 120° is 33.3%."
  },
  {
    id: "fa_q9",
    difficulty: "Medium",
    category: "Percentage Increase",
    question: "A medical clinic's patient registrations rose from 400 in May to 600 in June. What was the percentage increase?",
    options: ["33.3%", "40.0%", "50.0%", "66.7%"],
    correctAnswer: 2, // 50.0%
    explanation: "% Increase = ((600 − 400) ÷ 400) × 100 = (200 ÷ 400) × 100 = 50.0%.",
    distractorNotes: "33.3% mistakenly divides by the new value 600 (200/600)."
  },
  {
    id: "fa_q10",
    difficulty: "Medium",
    category: "Category Average",
    question: "A hospital laboratory technician processed 75, 85, 90, and 70 diagnostic blood panels across four shifts. What is the average number of samples processed per shift?",
    options: ["78 samples", "80 samples", "82 samples", "84 samples"],
    correctAnswer: 1, // 80 samples
    explanation: "Sum = 75 + 85 + 90 + 70 = 320. Average = 320 ÷ 4 = 80 samples per shift.",
    distractorNotes: "78 is 312/4; 82 is 328/4."
  },
  {
    id: "fa_q11",
    difficulty: "Medium",
    category: "Trend Analysis",
    question: "A digital health platform's active doctor consultations over 5 months were: Jan (1,000), Feb (1,250), Mar (1,600), Apr (2,100), May (2,750). What type of trend does this exhibit?",
    options: [
      "Steady downward trend",
      "Accelerating upward trend",
      "Stagnant horizontal trend",
      "Fluctuating cyclic trend"
    ],
    correctAnswer: 1, // Accelerating upward trend
    explanation: "Increases are +250, +350, +500, +650. Each monthly gain is larger than the previous one, showing accelerating growth.",
    distractorNotes: "The trend never declines or stagnates."
  },
  {
    id: "fa_q12",
    difficulty: "Medium",
    category: "Inflection Point Detection",
    question: "Weekly hospital emergency admissions: W1 (400), W2 (450), W3 (520), W4 (490), W5 (460). At which week did the admissions trend reverse from rising to falling?",
    options: ["Week 2", "Week 3", "Week 4", "Week 5"],
    correctAnswer: 1, // Week 3
    explanation: "Admissions rose up to Week 3 (520), then dropped in Week 4 (490) and Week 5 (460). Week 3 is the peak inflection point.",
    distractorNotes: "Week 4 is already declining; Week 3 is where the reversal occurred."
  },
  {
    id: "fa_q13",
    difficulty: "Medium",
    category: "Relative Proportion",
    question: "In a specialized hospital ward, there are 45 standard recovery beds and 15 intensive care (ICU) beds. The number of ICU beds is what percentage of standard recovery beds?",
    options: ["25.0%", "30.0%", "33.3%", "37.5%"],
    correctAnswer: 2, // 33.3%
    explanation: "Percentage = (15 ÷ 45) × 100 = (1 ÷ 3) × 100 = 33.33% ≈ 33.3%.",
    distractorNotes: "25.0% mistakenly calculates 15 ÷ 60 (total beds)."
  },
  {
    id: "fa_q14",
    difficulty: "Medium",
    category: "Trend Comparison",
    question: "Medical Device Model A sales: 100, 110, 120, 130. Medical Device Model B sales: 100, 120, 150, 190. Which statement is true regarding their growth over the 4 periods?",
    options: [
      "Model A grew faster than Model B.",
      "Both models grew at identical constant rates.",
      "Model B grew at an accelerating rate, while Model A grew at a constant linear rate.",
      "Model B had lower total sales volume than Model A."
    ],
    correctAnswer: 2, // Model B accelerating, A constant
    explanation: "Model A grows by a constant +10 each period (linear). Model B grows by +20, +30, +40 (accelerating).",
    distractorNotes: "Model B total (560) is higher than Model A total (460)."
  },

  // ------------------------------------------
  // HARD LEVEL (QUESTIONS 15 - 20)
  // ------------------------------------------
  {
    id: "fa_q15",
    difficulty: "Hard",
    category: "Multi-Step Remainder",
    question: "A regional pharmacy warehouse stores 1,500 medicine cartons. 40% are Cardiovascular drugs, 30% are Antibiotics, and the rest are Pediatric formulas. If 50% of the Pediatric formulas are dispatched to rural clinics, how many Pediatric cartons remain in the warehouse?",
    options: ["150 cartons", "225 cartons", "300 cartons", "450 cartons"],
    correctAnswer: 1, // 225 cartons
    explanation: "Pediatric percentage = 100% − (40% + 30%) = 30%. Total Pediatric cartons = 0.30 × 1,500 = 450. Dispatched = 50% of 450 = 225. Remaining = 450 − 225 = 225 cartons.",
    distractorNotes: "450 is the total before dispatch; 300 is an arithmetic error."
  },
  {
    id: "fa_q16",
    difficulty: "Hard",
    category: "Revenue & Discount Optimization",
    question: "Medical Supplier X sells 200 surgical diagnostic kits at ₹50 each with 10% discount. Supplier Y sells 150 kits at ₹70 each with no discount. Which supplier generated more revenue and by how much?",
    options: [
      "Supplier X generated ₹500 more than Supplier Y.",
      "Supplier Y generated ₹1,500 more than Supplier X.",
      "Supplier Y generated ₹2,000 more than Supplier X.",
      "Both suppliers generated identical revenue."
    ],
    correctAnswer: 1, // Supplier Y generated ₹1,500 more
    explanation: "Supplier X: 200 × (₹50 − ₹5) = 200 × ₹45 = ₹9,000. Supplier Y: 150 × ₹70 = ₹10,500. Difference = ₹10,500 − ₹9,000 = ₹1,500 more by Supplier Y.",
    distractorNotes: "Without discount, Supplier X would be ₹10,000."
  },
  {
    id: "fa_q17",
    difficulty: "Hard",
    category: "Evidence Evaluation",
    question: "A multicenter clinical trial reveals: 80% of patients who recovered within 48 hours received the targeted therapeutic protocol. Which conclusion is LOGICALLY SOUND based purely on this fact?",
    options: [
      "The therapeutic protocol guarantees 100% clinical recovery for every patient.",
      "A substantial majority of rapidly recovered patients received the therapeutic protocol.",
      "Patients who did not recover never received any medical care at all.",
      "The therapeutic protocol is the only medication administered in the hospital."
    ],
    correctAnswer: 1, // Option B
    explanation: "80% is indeed a substantial majority. The statement does NOT claim the protocol guarantees recovery, nor does it provide data on patients who did not recover.",
    distractorNotes: "Options A, C, and D are extreme, unprovable assumptions."
  },
  {
    id: "fa_q18",
    difficulty: "Hard",
    category: "Weighted Conversion Rate",
    question: "A digital telemedicine provider logs inquiries across two clinical tiers: General Medicine (300 inquiries, 60% confirmed bookings) and Specialist Surgery (200 inquiries, 40% confirmed bookings). What was the overall weighted booking rate across all 500 inquiries combined?",
    options: ["48.0%", "50.0%", "52.0%", "54.0%"],
    correctAnswer: 2, // 52.0%
    explanation: "Bookings: Gen Med = 0.60 × 300 = 180. Specialist = 0.40 × 200 = 80. Total confirmed bookings = 180 + 80 = 260. Overall conversion rate = (260 ÷ 500) × 100 = 52.0%.",
    distractorNotes: "50.0% is a naive unweighted average of (60 + 40)/2."
  },
  {
    id: "fa_q19",
    difficulty: "Hard",
    category: "Successive Percentage Changes",
    question: "A medical equipment factory produced 500 hemodialysis machines in Year 1. Production expanded by 20% in Year 2, but declined by 10% in Year 3 due to global semiconductor shortages. How many dialysis units were produced in Year 3?",
    options: ["510 units", "530 units", "540 units", "550 units"],
    correctAnswer: 2, // 540 units
    explanation: "Year 2 = 500 × 1.20 = 600 units. Year 3 = 600 × (1 − 0.10) = 600 × 0.90 = 540 units.",
    distractorNotes: "550 mistakenly adds net +10% directly to 500 (500 × 1.10 = 550)."
  },
  {
    id: "fa_q20",
    difficulty: "Hard",
    category: "Unit Economics & Margin Comparison",
    question: "Diagnostic Lab Alpha conducts 1,000 blood tests/month at ₹200 fee with ₹120 cost per test. Lab Beta conducts 600 tests/month at ₹350 fee with ₹200 cost per test. Which laboratory generates higher monthly gross profit, and by how much?",
    options: [
      "Lab Alpha generates ₹10,000 more profit than Lab Beta.",
      "Lab Beta generates ₹10,000 more profit than Lab Alpha.",
      "Lab Beta generates ₹15,000 more profit than Lab Alpha.",
      "Both laboratories generate identical monthly gross profit."
    ],
    correctAnswer: 1, // Lab Beta ₹10,000 more
    explanation: "Lab Alpha Profit: 1,000 × (₹200 − ₹120) = 1,000 × ₹80 = ₹80,000. Lab Beta Profit: 600 × (₹350 − ₹200) = 600 × ₹150 = ₹90,000. Difference = ₹90,000 − ₹80,000 = ₹10,000 higher profit by Lab Beta.",
    distractorNotes: "Alpha has higher revenue (₹2,00,000 vs ₹2,10,000), but Beta has higher unit margin (₹150 vs ₹80)."
  }
];

// ==========================================
// 7. REVISION SHEET & FORMULA CHEATSHEET
// ==========================================

export const revisionCheatSheet = {
  formulas: [
    { title: "Percentage Share", formula: "(Part ÷ Whole) × 100", example: "(50 ÷ 200) × 100 = 25%" },
    { title: "Percentage Increase", formula: "((New − Old) ÷ Old) × 100", example: "((150 − 100) ÷ 100) × 100 = +50%" },
    { title: "Percentage Decrease", formula: "((Old − New) ÷ Old) × 100", example: "((200 − 150) ÷ 200) × 100 = 25% drop" },
    { title: "Average", formula: "(Sum of all items) ÷ (Count of items)", example: "(30 + 40 + 50) ÷ 3 = 40" },
    { title: "Ratio Simplification", formula: "Divide both terms by GCD", example: "45 : 60 = 3 : 4 (divided by 15)" },
    { title: "Pie Chart Sector Value", formula: "(Percentage ÷ 100) × Total", example: "25% of 800 = 200" },
    { title: "Pie Chart Sector Angle", formula: "(Percentage ÷ 100) × 360°", example: "25% of 360° = 90°" }
  ],
  rules: [
    "Always check the base (denominator) when computing percentage change.",
    "Verify chart titles, axis labels, and numerical units (thousands vs lakhs) before doing math.",
    "Do not confuse percentage points (absolute difference in %) with percentage change (relative growth).",
    "Never assume external causes for data shifts unless the chart explicitly supplies that information."
  ]
};
