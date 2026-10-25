// src/data/reasoningLevel3Day18.js
// Alpha Fly Computer Education - Logical Reasoning Level 3 (Advanced) Day 7
// Title: Advanced Data Interpretation, Analytical Reasoning and Decision-Making

export const day18Overview = {
  course: 'Logical Reasoning',
  level: 'Level 3 – Advanced',
  day: 'Day 7 (Cumulative Day 18)',
  title: 'Advanced Data Interpretation, Analytical Reasoning and Decision-Making',
  duration: '60–75 minutes',
  difficulty: 'Advanced',
  prerequisite: 'Day 6 – Advanced Syllogisms, Assumptions and Logical Conclusions',
  learningObjectives: [
    'Interpret complex multi-category tables, grouped bar charts, dual-axis line graphs, and proportional pie charts.',
    'Execute accurate calculations of percentage changes, simplified ratios, weighted averages, and compounded growth rates.',
    'Differentiate percentage points from relative percentage change to eliminate common cognitive and reporting errors.',
    'Perform multi-step data pipelines combining disparate tables, unequal cohort sizes, and normalized conversion funnels.',
    'Detect deceptive visual representations, truncated axes, selection biases, and confounding variables in statistical claims.',
    'Differentiate empirical correlation from causal mechanisms in operational, business, and educational datasets.',
    'Construct formal Weighted Decision Matrices to evaluate multi-criteria alternatives objectively under constraints.',
    'Synthesize quantitative metrics and qualitative indicators into evidence-backed strategic recommendations.',
    'Perform sensitivity analyses to identify the threshold conditions and missing data that could reverse a decision.',
    'Explain the quantitative proof behind a data-driven conclusion instead of relying on intuition or raw totals.'
  ]
};

export const section1Fundamentals = {
  title: 'Section 1 – Advanced Data Interpretation Fundamentals',
  introduction: `Data Interpretation (DI) evaluates your capacity to extract actionable intelligence from structured numerical and categorical data. In modern competitive exams and high-stakes technical roles, data is rarely presented in simple isolated tables. Instead, you encounter multi-dimensional tables, grouped bar charts, dual-axis trend graphs, and proportional pie charts with heterogeneous measurement units.`,
  coreChartTypes: [
    {
      type: 'Multi-Dimensional Tables',
      purpose: 'Presents precise granular numbers partitioned across multiple categories (e.g., Batches × Quarters × Metrics).',
      analysisFocus: 'Identify row/column totals, calculate row-wise and column-wise ratios, and check for normalization.'
    },
    {
      type: 'Grouped & Stacked Bar Charts',
      purpose: 'Visualizes comparative discrete magnitudes across categories and sub-components.',
      analysisFocus: 'Compare relative heights, observe component distributions, and check whether baseline starts at zero.'
    },
    {
      type: 'Dual-Axis Line Graphs',
      purpose: 'Displays continuous temporal trends across two different measurement scales (e.g., Revenue in ₹ Lakhs vs Student Count).',
      analysisFocus: 'Identify inflection points, slopes (rates of change), intersections, and verify which line maps to which vertical axis.'
    },
    {
      type: 'Proportional Pie Charts (Degrees & Percentages)',
      purpose: 'Represents relative fractional contributions to an exhaustive total (100% or 360°).',
      analysisFocus: 'Formula: Value = (Angle / 360°) × Total = (Percentage / 100) × Total. Never compare slice sizes across two different pie charts without knowing total sizes!'
    }
  ],
  keyAuditChecklist: [
    { item: '1. Title & Measurement Units', desc: 'Verify whether values are in units, thousands, lakhs, percentages, or ratios, and check the reporting interval (monthly, quarterly, annual).' },
    { item: '2. Absolute vs Relative Differences', desc: 'An increase from 2 to 4 is a +100% increase, while an increase from 1,000 to 1,050 is only +5%, despite having 25 times the absolute gain!' },
    { item: '3. Group Size Normalization', desc: 'Raw totals distort performance. A batch of 500 students with 50 failures (10% failure rate) outperforms a batch of 50 students with 10 failures (20% failure rate).' },
    { item: '4. Evidence-Backed vs Extrapolated', desc: 'Only conclude what the figures explicitly prove. Never extrapolate external causal stories (e.g., "Students did better because the weather was nice").' }
  ],
  warmupQuestions: [
    {
      id: 'wu1',
      question: 'A technical batch had 80 students in January. In March, the batch size increased to 120 students. What was the percentage increase in batch size?',
      options: ['33.33%', '40.0%', '50.0%', '66.67%'],
      correct: 'C',
      explanation: 'Percentage Change = [(New - Old) / Old] × 100 = [(120 - 80) / 80] × 100 = (40 / 80) × 100 = 50.0% (Option C).',
      distractors: [
        'Option A (33.33%): Calculated [(120 - 80) / 120] × 100 (divided by the new value instead of the original base).',
        'Option B (40.0%): Confused the absolute difference of 40 students with a percentage.',
        'Option D (66.67%): Inverted ratio calculation.'
      ]
    },
    {
      id: 'wu2',
      question: 'In a pie chart representing Alpha Fly’s course enrolments, the sector for Data Science has a central angle of 108°. If total student enrolment is 1,200, how many students are enrolled in Data Science?',
      options: ['300', '360', '400', '450'],
      correct: 'B',
      explanation: 'Fraction of total circle = 108° / 360° = 0.30 (or 30%). Total students = 1,200. Enrolled in Data Science = 0.30 × 1,200 = 360 students (Option B).',
      distractors: [
        'Option A (300): Computed 25% (90°) instead of 108° (30%).',
        'Option C (400): Computed 33.33% (120°).',
        'Option D (450): Arithmetic error.'
      ]
    },
    {
      id: 'wu3',
      question: 'The pass rate of a Python programming module rose from 60% in Batch 1 to 75% in Batch 2. Which statement accurately describes this change?',
      options: [
        'The pass rate increased by 15 percentage points and by 25% relatively.',
        'The pass rate increased by 25 percentage points and by 15% relatively.',
        'The pass rate increased by 15% in absolute and relative terms.',
        'The pass rate increased by 75% overall.'
      ],
      correct: 'A',
      explanation: '1) Percentage points difference = 75% - 60% = +15 percentage points. 2) Relative percentage change = [(75 - 60) / 60] × 100 = (15 / 60) × 100 = 25.0%. Thus, it increased by 15 percentage points and 25% relatively (Option A).',
      distractors: [
        'Option B: Inverts percentage points with relative percentage change.',
        'Option C: Confuses percentage points with relative change.',
        'Option D: Cites the final endpoint value.'
      ]
    }
  ]
};

export const section2MathReasoning = {
  title: 'Section 2 – Advanced Mathematical Reasoning with Data',
  theory: `Quantitative interpretation requires mastering six foundational mathematical operations frequently tested under strict time constraints. A single misidentified base or unweighted average can propagate errors across a multi-tier problem.`,
  formulas: [
    {
      name: 'A. Percentage Change',
      formula: 'Percentage Change = [(V_new - V_old) / V_old] × 100',
      description: 'Always divide by the original baseline value V_old. If positive, it represents percentage growth; if negative, percentage decline.'
    },
    {
      name: 'B. Ratio & Proportion',
      formula: 'Ratio = A : B = A / B | Simplified to coprime integers',
      description: 'Used to compare proportions across categories. Proportions equate two ratios: A / B = C / D.'
    },
    {
      name: 'C. Weighted Average (Simpson’s Fallacy Defense)',
      formula: 'Weighted Average (x̄_w) = [Σ (w_i × x_i)] / [Σ w_i]',
      description: 'When combining groups of unequal sizes, multiplying each group mean by its respective sample size is mandatory. Never calculate the simple average of averages!'
    },
    {
      name: 'D. Compound Annual Growth Rate (CAGR)',
      formula: 'CAGR = [(V_final / V_initial)^(1/n) - 1] × 100',
      description: 'Measures the smoothed annualized growth rate over n periods.'
    },
    {
      name: 'E. Percentage Points vs Relative Change',
      formula: 'Δ_pp = Rate_2 - Rate_1 | % Change = [(Rate_2 - Rate_1) / Rate_1] × 100',
      description: 'Percentage points reflect arithmetic difference; relative change reflects proportional scaling.'
    }
  ],
  workedExamples: [
    {
      id: 'ex2_1',
      topic: 'Percentage Change with Inverted Base',
      question: 'In 2024, Alpha Fly enrolled 450 students in Web Development. In 2025, enrolment decreased to 360 students. In 2026, enrolment increased back to 450 students. Calculate: 1) The percentage decrease from 2024 to 2025, and 2) The percentage increase from 2025 to 2026.',
      stepByStep: [
        'Step 1: Decrease from 2024 to 2025: Base = 450, New = 360. Change = 360 - 450 = -90. Percentage Decrease = (-90 / 450) × 100 = -20.0%.',
        'Step 2: Increase from 2025 to 2026: Base = 360, New = 450. Change = 450 - 360 = +90. Percentage Increase = (+90 / 360) × 100 = +25.0%.',
        'Step 3: Key Insight: Notice that while the absolute change is 90 students in both directions, the percentage decrease is 20%, whereas the percentage increase to return to the original level is 25%!'
      ],
      finalAnswer: '2024–2025: 20% Decrease; 2025–2026: 25% Increase.',
      whyCorrect: 'The denominator changes from 450 to 360, proving that returning from a loss requires a larger percentage gain than the percentage lost.'
    },
    {
      id: 'ex2_2',
      topic: 'Weighted Average vs Simple Average Trap',
      question: 'Batch A has 60 students with an average assessment score of 85. Batch B has 40 students with an average score of 75. Batch C has 100 students with an average score of 65. What is the true average score across all 200 students?',
      stepByStep: [
        'Step 1: Trap method (Incorrect simple average of averages): (85 + 75 + 65) / 3 = 225 / 3 = 75.0. (Wrong because it ignores batch sizes!)',
        'Step 2: Total score Batch A = 60 × 85 = 5,100.',
        'Step 3: Total score Batch B = 40 × 75 = 3,000.',
        'Step 4: Total score Batch C = 100 × 65 = 6,500.',
        'Step 5: Combined total score = 5,100 + 3,000 + 6,500 = 14,600.',
        'Step 6: Total students = 60 + 40 + 100 = 200.',
        'Step 7: Weighted Average = 14,600 / 200 = 73.0.'
      ],
      finalAnswer: '73.0 (Not 75.0!)',
      whyCorrect: 'Batch C is the largest cohort (100 students) and pulls the overall mean significantly closer to 65.'
    },
    {
      id: 'ex2_3',
      topic: 'Ratios and Multi-Tier Distributions',
      question: 'The ratio of male to female students enrolled in Cloud Computing is 5 : 3. If there are 120 female students enrolled, how many total students are in the course?',
      stepByStep: [
        'Step 1: Let the common multiplier be k. Male = 5k, Female = 3k.',
        'Step 2: We are given Female = 3k = 120. Thus k = 120 / 3 = 40.',
        'Step 3: Total students = Male + Female = 5k + 3k = 8k.',
        'Step 4: Total students = 8 × 40 = 320 students.'
      ],
      finalAnswer: '320 total students (200 Male, 120 Female).',
      whyCorrect: '3 parts = 120 implies each part is 40. Total 8 parts = 320.'
    },
    {
      id: 'ex2_4',
      topic: 'Percentage Points vs Relative Change',
      question: 'A software security audit noted that the percentage of unpatched vulnerabilities dropped from 40% in Q1 to 10% in Q2. Describe this reduction in terms of: 1) Percentage points, and 2) Relative percentage reduction.',
      stepByStep: [
        'Step 1: Percentage Points Drop = 40% - 10% = 30 percentage points.',
        'Step 2: Relative Percentage Reduction = [(10 - 40) / 40] × 100 = (-30 / 40) × 100 = -75.0%.',
        'Step 3: Conclusion: The vulnerability rate dropped by 30 percentage points, which corresponds to a 75% relative reduction.'
      ],
      finalAnswer: 'Drop of 30 percentage points; 75% relative reduction.',
      whyCorrect: '30 is the arithmetic gap; 75% is the proportional shrinkage relative to the 40% starting point.'
    },
    {
      id: 'ex2_5',
      topic: 'Missing Values & Reverse Deductions',
      question: 'In a class of 50 students, the average marks of the entire class is 72. The marks of 48 students are known and sum to 3,440. If the remaining 2 students have marks in the ratio 3 : 5, find the marks of both students.',
      stepByStep: [
        'Step 1: Total marks required for 50 students = 50 × 72 = 3,600.',
        'Step 2: Sum of known 48 students = 3,440.',
        'Step 3: Sum of remaining 2 students = 3,600 - 3,440 = 160 marks.',
        'Step 4: Their marks are in ratio 3 : 5. Total parts = 3 + 5 = 8 parts.',
        'Step 5: Value of 1 part = 160 / 8 = 20.',
        'Step 6: Student 1 = 3 × 20 = 60 marks; Student 2 = 5 × 20 = 100 marks.'
      ],
      finalAnswer: 'Student 1: 60 marks; Student 2: 100 marks.',
      whyCorrect: '60 + 100 = 160, and 3,440 + 160 = 3,600, giving an exact average of 72.'
    },
    {
      id: 'ex2_6',
      topic: 'Compounded Multi-Period Growth',
      question: 'Alpha Fly’s online portal traffic grew by 20% in Year 1 and by 30% in Year 2. What was the net overall percentage growth across the two-year period?',
      stepByStep: [
        'Step 1: Trap method: 20% + 30% = 50% (Incorrect! Growth compounds on the new base).',
        'Step 2: Successive percentage formula: Net % = a + b + (ab / 100).',
        'Step 3: Net % = 20 + 30 + [(20 × 30) / 100] = 50 + (600 / 100) = 50 + 6 = 56.0%.',
        'Step 4: Verification with baseline 100: Initial = 100. Year 1 = 100 × 1.20 = 120. Year 2 = 120 × 1.30 = 156. Total increase = 156 - 100 = 56%.'
      ],
      finalAnswer: '56.0% overall growth.',
      whyCorrect: 'Compounding generates an additional 6% on the Year 1 increment.'
    },
    {
      id: 'ex2_7',
      topic: 'Conversion Funnel Efficiency Ratios',
      question: 'For a new AI Masterclass: 2,400 prospective students made enquiries. Of these, 600 attended a live demo. Of those who attended the demo, 150 enrolled. 1) What is the overall enquiry-to-enrolment conversion rate? 2) What is the demo-to-enrolment conversion rate?',
      stepByStep: [
        'Step 1: Overall Enquiry-to-Enrolment = (150 / 2,400) × 100 = (1 / 16) × 100 = 6.25%.',
        'Step 2: Demo-to-Enrolment = (150 / 600) × 100 = (1 / 4) × 100 = 25.0%.',
        'Step 3: Observation: 1 out of every 16 initial enquiries converted, but 1 out of every 4 demo attendees converted.'
      ],
      finalAnswer: 'Overall: 6.25%; Demo-to-Enrolment: 25.0%.',
      whyCorrect: 'Correct choice of respective denominators (2,400 vs 600) produces true stage-wise funnel conversion rates.'
    },
    {
      id: 'ex2_8',
      topic: 'Proportional Sector Re-Allocation',
      question: 'Alpha Fly’s annual training infrastructure budget of ₹50 Lakhs is allocated across: Hardware (30%), Software Licences (25%), Lab Cloud Credits (25%), and Faculty Training (20%). If Cloud Credits expenditure increases by 40% next year while total budget remains fixed at ₹50 Lakhs, by how much must Hardware expenditure be reduced?',
      stepByStep: [
        'Step 1: Current Cloud Credits = 25% of ₹50 Lakhs = ₹12.5 Lakhs.',
        'Step 2: 40% increase in Cloud Credits = ₹12.5 × 0.40 = ₹5.0 Lakhs additional.',
        'Step 3: New Cloud Credits expenditure = ₹12.5 + ₹5.0 = ₹17.5 Lakhs (35% of total budget).',
        'Step 4: To keep the total budget fixed, Hardware must absorb the ₹5.0 Lakhs reduction.',
        'Step 5: Current Hardware budget = 30% of ₹50 Lakhs = ₹15.0 Lakhs.',
        'Step 6: Percentage reduction in Hardware budget = (₹5.0 / ₹15.0) × 100 = 33.33%.'
      ],
      finalAnswer: 'Hardware expenditure must be reduced by ₹5.0 Lakhs (a 33.33% cut).',
      whyCorrect: 'An increase of ₹5 Lakhs must be deducted from Hardware’s initial ₹15 Lakhs, representing a 1/3rd cut.'
    }
  ]
};

export const section3ComplexTables = {
  title: 'Section 3 – Complex Tables and Charts',
  theory: `Real-world analytical reasoning requires evaluating multi-category matrices where rows and columns interact dynamically. To solve these efficiently, first establish the row totals, column totals, and baseline metrics before computing secondary derived variables.`,
  datasets: [
    {
      id: 'table1',
      title: 'Table 1.1: Alpha Fly Course Enrolments & Completions Across Four Quarters (2025)',
      headers: ['Course Stream', 'Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Oct-Dec)', 'Total Enrolled', 'Total Certified'],
      rows: [
        ['Full Stack Web', '120', '150', '180', '150', '600', '510'],
        ['Python Data Science', '90', '110', '130', '150', '480', '384'],
        ['Cloud & DevOps', '70', '80', '100', '110', '360', '306'],
        ['Cybersecurity', '40', '50', '60', '70', '220', '154'],
        ['Total Quarter Enrolments', '320', '390', '470', '480', '1,660', '1,354']
      ]
    }
  ],
  workedExamples: [
    {
      id: 'ex3_1',
      datasetRef: 'table1',
      question: 'Which course stream achieved the HIGHEST completion-to-enrolment certification rate across the entire year 2025?',
      calculationSteps: [
        'Step 1: Calculate certification rate for Full Stack Web = (510 / 600) × 100 = 85.0%.',
        'Step 2: Calculate certification rate for Python Data Science = (384 / 480) × 100 = 80.0%.',
        'Step 3: Calculate certification rate for Cloud & DevOps = (306 / 360) × 100 = 85.0%.',
        'Step 4: Calculate certification rate for Cybersecurity = (154 / 220) × 100 = 70.0%.',
        'Step 5: Compare: Full Stack Web and Cloud & DevOps are tied at exactly 85.0%!'
      ],
      finalAnswer: 'Full Stack Web and Cloud & DevOps (both tied at 85.0%).',
      whyCorrect: 'Both 510/600 and 306/360 simplify exactly to 17/20 = 85%.'
    },
    {
      id: 'ex3_2',
      datasetRef: 'table1',
      question: 'What was the percentage increase in total quarterly enrolments from Q1 to Q3?',
      calculationSteps: [
        'Step 1: Total enrolments in Q1 = 320 students.',
        'Step 2: Total enrolments in Q3 = 470 students.',
        'Step 3: Absolute increase = 470 - 320 = 150 students.',
        'Step 4: Percentage increase = (150 / 320) × 100 = (15 / 32) × 100 = 46.875% ≈ 46.88%.'
      ],
      finalAnswer: '46.88% increase.',
      whyCorrect: '(150 / 320) × 100 = 46.875%.'
    },
    {
      id: 'ex3_3',
      datasetRef: 'table1',
      question: 'Which individual course stream registered the LARGEST percentage growth in enrolments between Q1 and Q4?',
      calculationSteps: [
        'Step 1: Full Stack Web: Q1 = 120, Q4 = 150. Growth = [(150 - 120) / 120] × 100 = 30 / 120 = 25.0%.',
        'Step 2: Python Data Science: Q1 = 90, Q4 = 150. Growth = [(150 - 90) / 90] × 100 = 60 / 90 = 66.67%.',
        'Step 3: Cloud & DevOps: Q1 = 70, Q4 = 110. Growth = [(110 - 70) / 70] × 100 = 40 / 70 = 57.14%.',
        'Step 4: Cybersecurity: Q1 = 40, Q4 = 70. Growth = [(70 - 40) / 40] × 100 = 30 / 40 = 75.0%.',
        'Step 5: Compare: Cybersecurity had the largest percentage growth (+75.0%), even though its absolute enrolment was the lowest!'
      ],
      finalAnswer: 'Cybersecurity (+75.0% growth).',
      whyCorrect: 'Cybersecurity grew from 40 to 70 (+30 on base 40 = 75%), surpassing Python Data Science (+66.7%).'
    },
    {
      id: 'ex3_4',
      datasetRef: 'table1',
      question: 'In Q2, what proportion of total enrolments was represented by Python Data Science and Cloud & DevOps combined?',
      calculationSteps: [
        'Step 1: Total enrolments in Q2 = 390 students.',
        'Step 2: Python Data Science in Q2 = 110 students.',
        'Step 3: Cloud & DevOps in Q2 = 80 students.',
        'Step 4: Combined enrolment = 110 + 80 = 190 students.',
        'Step 5: Proportion = (190 / 390) × 100 = (19 / 39) × 100 ≈ 48.72%.'
      ],
      finalAnswer: '48.72% (or simplified ratio 19 : 39).',
      whyCorrect: '190 out of 390 is 48.7179%.'
    },
    {
      id: 'ex3_5',
      datasetRef: 'table1',
      question: 'If the average tuition fee collected per student was ₹25,000 for Full Stack Web and ₹30,000 for Cloud & DevOps, what was the total revenue generated by these two streams combined across all four quarters?',
      calculationSteps: [
        'Step 1: Total Full Stack Web students = 600. Revenue = 600 × ₹25,000 = ₹1,50,00,000 (₹1.50 Crore).',
        'Step 2: Total Cloud & DevOps students = 360. Revenue = 360 × ₹30,000 = ₹1,08,00,000 (₹1.08 Crore).',
        'Step 3: Total combined revenue = ₹1,50,00,000 + ₹1,08,00,000 = ₹2,58,00,000 (₹2.58 Crore).'
      ],
      finalAnswer: '₹2.58 Crore (₹2,58,00,000).',
      whyCorrect: '600 × 25k + 360 × 30k = 15,000,000 + 10,800,000 = 25,800,000.'
    },
    {
      id: 'ex3_6',
      datasetRef: 'table1',
      question: 'What is the ratio of certified students in Full Stack Web to certified students in Cybersecurity across the year?',
      calculationSteps: [
        'Step 1: Certified students Full Stack Web = 510.',
        'Step 2: Certified students Cybersecurity = 154.',
        'Step 3: Ratio = 510 : 154.',
        'Step 4: Divide both by 2: 510 / 2 = 255; 154 / 2 = 77.',
        'Step 5: Check common factors of 77 (7, 11): 255 is not divisible by 7 (255/7 = 36.42) nor 11 (255/11 = 23.18).',
        'Step 6: Simplified coprime ratio = 255 : 77.'
      ],
      finalAnswer: '255 : 77 (or approximately 3.31 : 1).',
      whyCorrect: '510 / 154 simplifies by factor 2 to 255/77.'
    }
  ]
};

export const section4MultiStepAnalysis = {
  title: 'Section 4 – Multi-Step Data Analysis',
  theory: `Multi-step analysis requires chaining 2 to 4 dependent calculations. A typical workflow involves: 1) Normalizing raw figures into rates, 2) Applying condition filters, 3) Combining multi-table metrics, and 4) Ranking relative variations.`,
  workedExamples: [
    {
      id: 'ex4_1',
      scenario: 'Table 2.1: Marketing Funnel Performance for Alpha Fly Technical Bootcamps',
      givenData: `
Course A: 1,500 Enquiries, 300 Registrations, ₹1,20,000 Marketing Spend
Course B: 2,500 Enquiries, 400 Registrations, ₹2,00,000 Marketing Spend
Course C: 800 Enquiries, 200 Registrations, ₹60,000 Marketing Spend
      `,
      question: 'Which course achieved: 1) The highest enquiry-to-registration conversion rate, and 2) The lowest cost per registered student?',
      calculationSteps: [
        'Step 1: Conversion Rates: Course A = (300 / 1,500) × 100 = 20.0%. Course B = (400 / 2,500) × 100 = 16.0%. Course C = (200 / 800) × 100 = 25.0%. (Highest conversion = Course C at 25%).',
        'Step 2: Cost Per Registration: Course A = ₹1,20,000 / 300 = ₹400 per student. Course B = ₹2,00,000 / 400 = ₹500 per student. Course C = ₹60,000 / 200 = ₹300 per student. (Lowest cost = Course C at ₹300).',
        'Step 3: Synthesize result: Course C outperformed on both conversion efficiency and cost efficiency.'
      ],
      finalAnswer: 'Course C had the highest conversion rate (25%) AND the lowest cost per registration (₹300).',
      whyCorrect: 'Course C converted 1 in 4 enquiries and cost only ₹300 per registered acquisition.'
    },
    {
      id: 'ex4_2',
      scenario: 'Assessment Normalization Across Unequal Cohorts',
      givenData: `
Morning Shift: 150 students took Exam Alpha (Mean Score = 78, Standard Dev = 6)
Evening Shift: 50 students took Exam Beta (Mean Score = 70, Standard Dev = 8)
Combined Passing Benchmark: Student must score in top 20% of their respective shift cohort.
      `,
      question: 'How many total students from both shifts qualified under the top 20% benchmark?',
      calculationSteps: [
        'Step 1: Top 20% of Morning Shift = 20% of 150 = 0.20 × 150 = 30 students.',
        'Step 2: Top 20% of Evening Shift = 20% of 50 = 0.20 × 50 = 10 students.',
        'Step 3: Total qualifying students = 30 + 10 = 40 students.'
      ],
      finalAnswer: '40 qualifying students (30 Morning, 10 Evening).',
      whyCorrect: 'Evaluating shifts independently prevents cohort size distortion.'
    },
    {
      id: 'ex4_3',
      scenario: 'Two-Table Synthesis (Enrolment + Fee Structure)',
      givenData: `
Table A: Students in 2025: Java (200), Python (300), DevOps (100).
Table B: Fee and Discount Matrix: Java (₹20,000 with 10% scholarship to all), Python (₹25,000 with 20% scholarship to all), DevOps (₹30,000 with zero scholarship).
      `,
      question: 'What was the net total revenue collected after scholarships across all three courses?',
      calculationSteps: [
        'Step 1: Java Net Fee = ₹20,000 - 10% = ₹18,000 per student. Revenue = 200 × ₹18,000 = ₹36,00,000.',
        'Step 2: Python Net Fee = ₹25,000 - 20% = ₹20,000 per student. Revenue = 300 × ₹20,000 = ₹60,00,000.',
        'Step 3: DevOps Net Fee = ₹30,000 (no discount). Revenue = 100 × ₹30,000 = ₹30,00,000.',
        'Step 4: Total Net Revenue = ₹36,00,000 + ₹60,00,000 + ₹30,00,000 = ₹1,26,00,000 (₹1.26 Crore).'
      ],
      finalAnswer: '₹1.26 Crore (₹1,26,00,000).',
      whyCorrect: '3.6M (Java) + 6.0M (Python) + 3.0M (DevOps) = 12.6M.'
    },
    {
      id: 'ex4_4',
      scenario: 'Finding Missing Threshold Variables',
      givenData: `
A technical trainer conducted 5 assessment tests. Scores on first 4 tests are: 76, 82, 85, and 79.
To achieve an overall distinction grade, the average across all 5 tests must be at least 82.0.
      `,
      question: 'What is the MINIMUM score the student must achieve on Test 5 to secure distinction?',
      calculationSteps: [
        'Step 1: Total marks required for 5 tests with mean 82 = 5 × 82 = 410 marks.',
        'Step 2: Sum of first 4 test scores = 76 + 82 + 85 + 79 = 322 marks.',
        'Step 3: Required score on Test 5 = 410 - 322 = 88 marks.'
      ],
      finalAnswer: 'Minimum score of 88 marks.',
      whyCorrect: '322 + 88 = 410. 410 / 5 = 82.0.'
    },
    {
      id: 'ex4_5',
      scenario: 'Productivity Rate Normalization Across Unequal Time Spans',
      givenData: `
Engineer X resolved 180 Jira tickets in 30 working days.
Engineer Y resolved 140 Jira tickets in 20 working days.
Engineer Z resolved 210 Jira tickets in 42 working days.
      `,
      question: 'Rank the engineers in descending order of daily ticket resolution rate.',
      calculationSteps: [
        'Step 1: Daily rate Engineer X = 180 / 30 = 6.0 tickets/day.',
        'Step 2: Daily rate Engineer Y = 140 / 20 = 7.0 tickets/day.',
        'Step 3: Daily rate Engineer Z = 210 / 42 = 5.0 tickets/day.',
        'Step 4: Ranking in descending order: Y (7.0) > X (6.0) > Z (5.0).'
      ],
      finalAnswer: 'Engineer Y > Engineer X > Engineer Z.',
      whyCorrect: 'Engineer Y worked fewer days but achieved the highest daily velocity (7 tickets/day).'
    },
    {
      id: 'ex4_6',
      scenario: 'Multi-Product Revenue Margin Optimization',
      givenData: `
Service Alpha: Revenue ₹40 Lakhs, Profit Margin = 25%
Service Beta: Revenue ₹60 Lakhs, Profit Margin = 15%
Service Gamma: Revenue ₹20 Lakhs, Profit Margin = 40%
      `,
      question: 'Calculate: 1) Total net profit generated across all three services, and 2) The blended profit margin percentage of the business.',
      calculationSteps: [
        'Step 1: Profit Alpha = 25% of ₹40L = ₹10.0 Lakhs.',
        'Step 2: Profit Beta = 15% of ₹60L = ₹9.0 Lakhs.',
        'Step 3: Profit Gamma = 40% of ₹20L = ₹8.0 Lakhs.',
        'Step 4: Total Net Profit = ₹10.0L + ₹9.0L + ₹8.0L = ₹27.0 Lakhs.',
        'Step 5: Total Revenue = ₹40L + ₹60L + ₹20L = ₹120.0 Lakhs.',
        'Step 6: Blended Profit Margin = (₹27.0 / ₹120.0) × 100 = 22.5%.'
      ],
      finalAnswer: 'Total Profit: ₹27.0 Lakhs; Blended Margin: 22.5%.',
      whyCorrect: 'Weighted combination (27 / 120) × 100 = 22.5%.'
    }
  ]
};

export const section5CriticalDataAnalysis = {
  title: 'Section 5 – Critical Analysis of Data',
  theory: `Data can be technically accurate while simultaneously being profoundly misleading. Analysts must audit datasets for chart distortions, survival bias, confounding variables, sample size insufficiencies, and the ubiquitous post hoc ergo propter hoc (correlation vs causation) fallacy.`,
  fallacyAudits: [
    {
      fallacy: '1. Truncated Y-Axis Distortion',
      description: 'Starting a bar chart’s vertical axis at 80 instead of 0 visually exaggerates a tiny 2% difference (e.g. 82 vs 84) to appear four times larger than it actually is.'
    },
    {
      fallacy: '2. Survivorship Bias',
      description: 'Surveying only course graduates who secured jobs while ignoring dropouts creates an artificially inflated success metric.'
    },
    {
      fallacy: '3. Correlation Confused with Causation',
      description: 'Observing that students who drink more coffee have higher coding scores does not prove coffee boosts programming ability (a confounding variable like study hours may drive both).'
    },
    {
      fallacy: '4. Simpson’s Paradox (Aggregation Distortion)',
      description: 'A trend that appears in several distinct groups can reverse when those groups are combined, caused by unequal group weights and confounding factor distribution.'
    },
    {
      fallacy: '5. Small Sample Extrapolation',
      description: 'Promoting that "100% of participants recommend the course" when only 3 people were surveyed represents statistical malpractice.'
    }
  ],
  workedExamples: [
    {
      id: 'crit_1',
      scenario: 'A coding academy publishes a bar chart showing its placement rate is 92%, while rival Academy X is at 88%. The bar for the academy is drawn four times taller than the bar for Academy X.',
      question: 'Identify the graphical flaw and state the true relative comparison.',
      analysis: 'The graph truncates the vertical axis, starting it at 85% instead of 0%. The absolute difference is only 4 percentage points (92% vs 88%), representing a relative difference of just 4.5%. Visually magnifying it by 400% is a deceptive truncated axis manipulation.',
      responsibleInterpretation: 'The chart must start at baseline 0% or prominently flag the broken axis.'
    },
    {
      id: 'crit_2',
      scenario: 'A company reports that after installing ergonomic chairs in Lab 4, students completed coding assignments 20% faster. Management concludes that ergonomic chairs directly accelerate algorithmic cognition.',
      question: 'What is the logical vulnerability in this conclusion?',
      analysis: 'Correlation vs Causation fallacy. The assignment speed increase could be caused by easier assignments, better tutoring, pre-exam adrenaline, or the Hawthorne Effect (individuals modifying behavior in response to being observed). No control group was maintained.',
      responsibleInterpretation: 'Run an A/B test with an identical control group before claiming causal impact.'
    },
    {
      id: 'crit_3',
      scenario: 'A survey of 1,000 successful startup founders revealed that 75% read tech blogs daily. The author concludes: "Reading tech blogs daily is the primary driver of startup success."',
      question: 'What statistical bias is present in this study?',
      analysis: 'Survivorship bias. The study only sampled SUCCESSFUL founders. Millions of failed founders who also read tech blogs daily were completely excluded from the sample.',
      responsibleInterpretation: 'A valid study must sample both successful and failed founders to evaluate whether tech blog reading differentiates outcomes.'
    },
    {
      id: 'crit_4',
      scenario: 'City A reported 500 road accidents in 2024, whereas City B reported only 100 road accidents. The analyst claims City A has 5 times more dangerous drivers than City B.',
      question: 'What critical normalization is missing?',
      analysis: 'Raw totals vs Rate normalization. If City A has 5,000,000 residents (accident rate = 1 per 10,000) and City B has 50,000 residents (accident rate = 20 per 10,000), City B is actually twice as dangerous per capita!',
      responsibleInterpretation: 'Compare accident rates per capita or per vehicle-mile traveled, never raw counts alone.'
    },
    {
      id: 'crit_5',
      scenario: 'A hospital study shows that patients in Department Alpha have a higher mortality rate than Department Beta. A commentator claims Department Alpha has inferior doctors.',
      question: 'What confounding variable explains this disparity?',
      analysis: 'Patient severity confounding. Department Alpha is the Intensive Care Unit (treating critical emergencies), while Department Beta is General Outpatient (treating minor colds). The baseline health of incoming patients explains the outcome, not doctor competence.',
      responsibleInterpretation: 'Risk-adjust patient outcomes by severity index before comparing departmental performance.'
    }
  ]
};

export const section6DecisionMaking = {
  title: 'Section 6 – Analytical Reasoning and Decision-Making',
  theory: `Decision-making is the disciplined process of converting quantitative evidence into an actionable choice under constraints. The industry-standard tool for rational multi-criteria comparison is the Weighted Decision Matrix.`,
  tenStepProcess: [
    '1. Define the Problem & Strategic Objective clearly.',
    '2. Enumerate mutually exclusive, collectively exhaustive Alternatives.',
    '3. Establish non-overlapping Decision Criteria (e.g., Cost, Quality, Scalability).',
    '4. Assign Normalized Weights to criteria summing to 1.0 (or 100%).',
    '5. Define a uniform Scoring Scale (e.g., 1 to 10, where 10 = Best).',
    '6. Invert Cost/Time metrics (Lower cost must receive a HIGHER score).',
    '7. Compute Weighted Scores: Weighted Total = Σ (Weight_i × Score_i).',
    '8. Compare net trade-offs, constraints, and minimum acceptable thresholds.',
    '9. Formulate an evidence-backed recommendation.',
    '10. Conduct Sensitivity Analysis: Test if minor weight shifts alter the winner.'
  ],
  weightedMatrixFormula: 'Weighted Score = Σ (Criterion Weight × Alternative Score)',
  workedExamples: [
    {
      id: 'dm_1',
      decisionScenario: 'Alpha Fly LMS Database Migration: Choosing Between Three Cloud Providers',
      weights: 'Reliability (Weight: 0.40), Scalability (Weight: 0.30), Implementation Cost (Weight: 0.30)',
      scoringScale: 'Scores rated from 1 to 10 (10 = Best; For Cost, 10 = Most Economical).',
      alternatives: [
        { name: 'Provider A (AWS Aurora)', scores: { rel: 9, scale: 9, cost: 5 } },
        { name: 'Provider B (Google Cloud Spanner)', scores: { rel: 10, scale: 10, cost: 3 } },
        { name: 'Provider C (Managed Open-Source)', scores: { rel: 7, scale: 6, cost: 9 } }
      ],
      calculations: [
        'Provider A Weighted Score = (0.40 × 9) + (0.30 × 9) + (0.30 × 5) = 3.6 + 2.7 + 1.5 = 7.80.',
        'Provider B Weighted Score = (0.40 × 10) + (0.30 × 10) + (0.30 × 3) = 4.0 + 3.0 + 0.9 = 7.90.',
        'Provider C Weighted Score = (0.40 × 7) + (0.30 × 6) + (0.30 × 9) = 2.8 + 1.8 + 2.7 = 7.30.'
      ],
      recommendation: 'Provider B wins by a slim margin (7.90 vs 7.80 for Provider A).',
      sensitivityNote: 'If the budget is tightened so Cost weight rises to 0.40 (reducing Reliability to 0.30), Provider A becomes the winner (7.70 vs 7.20)!'
    },
    {
      id: 'dm_2',
      decisionScenario: 'Selecting a New Campus Location for Alpha Fly',
      weights: 'Student Accessibility (0.35), Rental Cost (0.25), Infrastructure Quality (0.25), Parking (0.15)',
      alternatives: [
        { name: 'Location Alpha (Downtown Hub)', scores: { acc: 10, rent: 4, infra: 9, park: 5 } },
        { name: 'Location Beta (Suburban Tech Park)', scores: { acc: 6, rent: 8, infra: 8, park: 9 } }
      ],
      calculations: [
        'Location Alpha = (0.35 × 10) + (0.25 × 4) + (0.25 × 9) + (0.15 × 5) = 3.5 + 1.0 + 2.25 + 0.75 = 7.50.',
        'Location Beta = (0.35 × 6) + (0.25 × 8) + (0.25 × 8) + (0.15 × 9) = 2.1 + 2.0 + 2.0 + 1.35 = 7.45.'
      ],
      recommendation: 'Location Alpha is recommended (7.50 vs 7.45) primarily driven by superior student transit accessibility.',
      sensitivityNote: 'A minor shift in rent sensitivity would flip the outcome.'
    },
    {
      id: 'dm_3',
      decisionScenario: 'Vendor Selection for Automated Video Transcription Software',
      weights: 'Accuracy (0.50), Latency (0.25), API Pricing (0.25)',
      alternatives: [
        { name: 'Vendor 1', scores: { acc: 9, lat: 8, cost: 6 } },
        { name: 'Vendor 2', scores: { acc: 8, lat: 9, cost: 8 } }
      ],
      calculations: [
        'Vendor 1 = (0.50 × 9) + (0.25 × 8) + (0.25 × 6) = 4.5 + 2.0 + 1.5 = 8.00.',
        'Vendor 2 = (0.50 × 8) + (0.25 × 9) + (0.25 × 8) = 4.0 + 2.25 + 2.0 = 8.25.'
      ],
      recommendation: 'Vendor 2 is recommended (8.25 vs 8.00) due to balanced low latency and competitive API pricing.',
      sensitivityNote: 'If accuracy weight is elevated to 0.70, Vendor 1 takes the lead.'
    },
    {
      id: 'dm_4',
      decisionScenario: 'Evaluating Training Delivery Format: Live In-Person vs Hybrid vs Fully Asynchronous',
      weights: 'Student Engagement (0.40), Operational Scalability (0.30), Delivery Cost (0.30)',
      alternatives: [
        { name: 'Option 1: In-Person', scores: { eng: 9, scale: 4, cost: 4 } },
        { name: 'Option 2: Hybrid (Flipped Classroom)', scores: { eng: 8, scale: 8, cost: 7 } },
        { name: 'Option 3: Fully Asynchronous', scores: { eng: 4, scale: 10, cost: 9 } }
      ],
      calculations: [
        'In-Person = (0.40 × 9) + (0.30 × 4) + (0.30 × 4) = 3.6 + 1.2 + 1.2 = 6.00.',
        'Hybrid = (0.40 × 8) + (0.30 × 8) + (0.30 × 7) = 3.2 + 2.4 + 2.1 = 7.70.',
        'Fully Asynchronous = (0.40 × 4) + (0.30 × 10) + (0.30 × 9) = 1.6 + 3.0 + 2.7 = 7.30.'
      ],
      recommendation: 'Hybrid delivery format wins decisively (7.70) by combining high engagement with strong scalability and moderate costs.',
      sensitivityNote: 'Hybrid dominates across almost all realistic weight configurations.'
    },
    {
      id: 'dm_5',
      decisionScenario: 'Software Framework Selection for Alpha Fly Enterprise Mobile App',
      weights: 'Development Speed (0.30), Native UI Performance (0.35), Cross-Platform Support (0.35)',
      alternatives: [
        { name: 'React Native', scores: { speed: 8, perf: 8, cross: 9 } },
        { name: 'Flutter', scores: { speed: 8, perf: 9, cross: 8 } },
        { name: 'Pure Native (Swift + Kotlin)', scores: { speed: 4, perf: 10, cross: 2 } }
      ],
      calculations: [
        'React Native = (0.30 × 8) + (0.35 × 8) + (0.35 × 9) = 2.4 + 2.8 + 3.15 = 8.35.',
        'Flutter = (0.30 × 8) + (0.35 × 9) + (0.35 × 8) = 2.4 + 3.15 + 2.8 = 8.35.',
        'Pure Native = (0.30 × 4) + (0.35 × 10) + (0.35 × 2) = 1.2 + 3.5 + 0.7 = 5.40.'
      ],
      recommendation: 'React Native and Flutter are exactly tied at 8.35! Secondary tie-breaker (developer ecosystem synergy with existing React web codebase) awards the final choice to React Native.',
      sensitivityNote: 'Tie-breakers must be grounded in secondary architectural synergies.'
    }
  ]
};

export const practiceSetA = [
  {
    id: 'pa1',
    question: 'A tech training institute had 160 students in 2024 and 200 students in 2025. What was the percentage growth in student population?',
    options: ['20.0%', '25.0%', '40.0%', '80.0%'],
    correct: 'B',
    explanation: 'Percentage Growth = [(200 - 160) / 160] × 100 = (40 / 160) × 100 = 25.0% (Option B).',
    distractors: [
      'Option A (20.0%): Divided by 200 (the new value) instead of 160.',
      'Option C (40.0%): Confused the absolute difference of 40 with a percentage.',
      'Option D (80.0%): Inverted calculation.'
    ]
  },
  {
    id: 'pa2',
    question: 'In an expenditure pie chart of ₹80 Lakhs, the sector for Lab Cloud Infrastructure has an angle of 72°. How much money is allocated to Lab Cloud Infrastructure?',
    options: ['₹12 Lakhs', '₹16 Lakhs', '₹18 Lakhs', '₹20 Lakhs'],
    correct: 'B',
    explanation: 'Fraction = 72° / 360° = 1 / 5 = 20.0%. Allocation = 20% of ₹80 Lakhs = 0.20 × 80 = ₹16.0 Lakhs (Option B).',
    distractors: [
      'Option A (₹12 Lakhs): Computed 15% (54°).',
      'Option C (₹18 Lakhs): Computed 22.5%.',
      'Option D (₹20 Lakhs): Computed 25% (90°).'
    ]
  },
  {
    id: 'pa3',
    question: 'Batch Alpha has 40 students with an average score of 80. Batch Beta has 60 students with an average score of 90. What is the combined weighted average score of all 100 students?',
    options: ['84.0', '85.0', '86.0', '87.0'],
    correct: 'C',
    explanation: 'Total score = (40 × 80) + (60 × 90) = 3,200 + 5,400 = 8,600. Total students = 100. Weighted Average = 8,600 / 100 = 86.0 (Option C). Note that simple average (80+90)/2 = 85 is wrong because Batch Beta is larger!',
    distractors: [
      'Option A (84.0): Weighted towards the smaller batch.',
      'Option B (85.0): Simple unweighted average trap (80+90)/2.',
      'Option D (87.0): Calculation error.'
    ]
  },
  {
    id: 'pa4',
    question: 'A website’s server latency improved from 250 milliseconds to 150 milliseconds. What was the percentage reduction in latency?',
    options: ['40.0%', '60.0%', '66.7%', '100.0%'],
    correct: 'A',
    explanation: 'Percentage Reduction = [(250 - 150) / 250] × 100 = (100 / 250) × 100 = 40.0% (Option A).',
    distractors: [
      'Option B (60.0%): Calculated final value as a percentage of initial value (150/250 = 60%).',
      'Option C (66.7%): Divided by 150 instead of 250 (100/150).',
      'Option D (100.0%): Arithmetic error.'
    ]
  },
  {
    id: 'pa5',
    question: 'If the ratio of passing to failing students in an assessment is 7 : 2, and 28 students passed, how many students took the assessment in total?',
    options: ['32', '36', '40', '42'],
    correct: 'B',
    explanation: 'Passing = 7 units = 28 students. 1 unit = 28 / 7 = 4 students. Total students = 7 + 2 = 9 units. Total students = 9 × 4 = 36 students (Option B).',
    distractors: [
      'Option A (32): 28 + 4.',
      'Option C (40): 10 units.',
      'Option D (42): Multiplied incorrectly.'
    ]
  }
];

export const practiceSetB = [
  {
    id: 'pb1',
    question: 'A technical recruitment drive screened 800 applicants. 200 were shortlisted for coding tests. 50 cleared the coding tests and were offered jobs. What is: 1) The coding test pass rate among shortlisted candidates, and 2) The overall selection rate of all applicants?',
    options: [
      '25% and 6.25%',
      '25% and 12.5%',
      '50% and 6.25%',
      '20% and 5.0%'
    ],
    correct: 'A',
    explanation: '1) Coding test pass rate = (50 / 200) × 100 = 25.0%. 2) Overall selection rate = (50 / 800) × 100 = 6.25% (Option A).',
    distractors: [
      'Option B: Confused overall rate with 100/800.',
      'Option C: Computed 50/100.',
      'Option D: Arithmetic error.'
    ]
  },
  {
    id: 'pb2',
    question: 'In Batch 1 (100 students), the pass rate was 80%. In Batch 2 (50 students), the pass rate was 50%. What was the overall pass rate when both batches are combined?',
    options: ['65.0%', '70.0%', '72.5%', '75.0%'],
    correct: 'B',
    explanation: 'Passing in Batch 1 = 80% of 100 = 80 students. Passing in Batch 2 = 50% of 50 = 25 students. Total passing = 80 + 25 = 105 students. Total students = 150. Overall pass rate = (105 / 150) × 100 = 70.0% (Option B). Note: Simple average (80+50)/2 = 65% is WRONG!',
    distractors: [
      'Option A (65.0%): Unweighted simple average trap (80+50)/2.',
      'Option C (72.5%): Arithmetic error.',
      'Option D (75.0%): Overestimation.'
    ]
  },
  {
    id: 'pb3',
    question: 'Company revenue grew by 10% in Year 1 and dropped by 10% in Year 2. What was the net two-year change in revenue?',
    options: ['0% (No change)', '1% Decrease', '1% Increase', '2% Decrease'],
    correct: 'B',
    explanation: 'Let initial revenue = 100. Year 1 = 100 × 1.10 = 110. Year 2 = 110 × 0.90 = 99. Net change = 99 - 100 = -1% (1% Decrease, Option B). Formula: a + b + ab/100 = 10 - 10 - (100/100) = -1%.',
    distractors: [
      'Option A (0%): The naive addition fallacy (+10% - 10% = 0%).',
      'Option C (1% Increase): Wrong sign.',
      'Option D (2% Decrease): Arithmetic error.'
    ]
  },
  {
    id: 'pb4',
    question: 'A software company had ₹100 Lakhs revenue and ₹80 Lakhs expenses in 2024. In 2025, revenue increased by 20% while expenses increased by 10%. What was the percentage increase in net profit?',
    options: ['20.0%', '30.0%', '50.0%', '60.0%'],
    correct: 'D',
    explanation: '2024 Profit = 100 - 80 = ₹20 Lakhs. 2025 Revenue = 100 × 1.20 = ₹120 Lakhs. 2025 Expenses = 80 × 1.10 = ₹88 Lakhs. 2025 Profit = 120 - 88 = ₹32 Lakhs. Percentage increase in profit = [(32 - 20) / 20] × 100 = (12 / 20) × 100 = 60.0% (Option D).',
    distractors: [
      'Option A (20.0%): Equated profit growth with revenue growth.',
      'Option B (30.0%): Arithmetic error.',
      'Option C (50.0%): Underestimated profit expansion.'
    ]
  },
  {
    id: 'pb5',
    question: 'A trainer graded 180 assignments in 6 hours. Another trainer graded 240 assignments in 10 hours. Working together, how many assignments can they grade in 5 hours?',
    options: ['240', '250', '270', '300'],
    correct: 'C',
    explanation: 'Trainer 1 rate = 180 / 6 = 30 assignments/hour. Trainer 2 rate = 240 / 10 = 24 assignments/hour. Combined rate = 30 + 24 = 54 assignments/hour. In 5 hours = 54 × 5 = 270 assignments (Option C).',
    distractors: [
      'Option A (240): Computed single trainer output.',
      'Option B (250): Arithmetic error.',
      'Option D (300): Computed 60 × 5.'
    ]
  }
];

export const practiceSetC = [
  {
    id: 'pc1',
    question: 'An edtech startup reports: "95% of our surveyed graduates doubled their salary within 6 months." However, the fine print reveals only 40 out of 800 graduates responded to the survey. What statistical flaw invalidates this marketing claim?',
    options: [
      'Truncated axis distortion',
      'Non-response & survivorship bias (unrepresentative sample)',
      'Simpson’s Paradox',
      'Confusing percentage points with percentage change'
    ],
    correct: 'B',
    explanation: 'A 5% response rate (40 out of 800) creates severe non-response and voluntary response bias. Disgruntled or unemployed graduates rarely respond to salary surveys, making the 40 respondents completely unrepresentative of the 800 cohort (Option B).',
    distractors: [
      'Option A: No graphical axis is cited.',
      'Option C: Simpson’s paradox relates to sub-group aggregation.',
      'Option D: The issue is sample validity, not rate nomenclature.'
    ]
  },
  {
    id: 'pc2',
    question: 'In a Weighted Decision Matrix evaluating two cloud architectures: Scalability has weight 0.60 and Cost has weight 0.40. Solution Alpha scores 9 in Scalability and 4 in Cost. Solution Beta scores 6 in Scalability and 8 in Cost. Which solution wins and by what score?',
    options: [
      'Solution Alpha wins with 7.00 vs 6.80',
      'Solution Beta wins with 7.20 vs 7.00',
      'Both solutions tie at 7.00',
      'Solution Alpha wins with 7.50 vs 6.50'
    ],
    correct: 'A',
    explanation: 'Alpha = (0.60 × 9) + (0.40 × 4) = 5.4 + 1.6 = 7.00. Beta = (0.60 × 6) + (0.40 × 8) = 3.6 + 3.2 = 6.80. Solution Alpha wins with 7.00 vs 6.80 (Option A).',
    distractors: [
      'Option B: Swapped weights.',
      'Option C: Assumed simple average (13/2 vs 14/2).',
      'Option D: Arithmetic error.'
    ]
  },
  {
    id: 'pc3',
    question: 'A researcher observes that cities with more ice cream sales also report more drowning incidents. The researcher concludes that eating ice cream causes drowning. What explains this error?',
    options: [
      'Ice cream impairs swimming reflexes.',
      'A third confounding variable (hot summer weather) causes both higher ice cream consumption and more people swimming.',
      'The sample size of ice cream buyers was too small.',
      'Drowning incidents were recorded on a truncated axis.'
    ],
    correct: 'B',
    explanation: 'Classic correlation vs causation fallacy. High summer temperatures (the confounding variable) drive both ice cream sales and beach swimming activity, creating a spurious correlation without causation (Option B).',
    distractors: [
      'Option A: Unscientific rationalization.',
      'Option C: Sample size does not resolve spurious correlation.',
      'Option D: Graphical flaw is not the root issue.'
    ]
  },
  {
    id: 'pc4',
    question: 'A bar chart shows that Website A had 10,000 visitors and 100 sales, while Website B had 2,000 visitors and 60 sales. If the manager declares Website A more effective at converting traffic, what error was committed?',
    options: [
      'Failing to calculate conversion rates: Website B has a 3.0% conversion rate versus Website A’s 1.0%.',
      'Website A’s sales are smaller than Website B’s.',
      'Website B had more total visitors.',
      'Conversion rates cannot be calculated from visitor counts.'
    ],
    correct: 'A',
    explanation: 'Website A conversion rate = 100 / 10,000 = 1.0%. Website B conversion rate = 60 / 2,000 = 3.0%. Website B is three times more effective at converting visitors into sales! The manager committed the raw totals fallacy (Option A).',
    distractors: [
      'Option B: False; 100 > 60.',
      'Option C: False; 2,000 < 10,000.',
      'Option D: Conversion rates are routinely calculated as sales/visitors.'
    ]
  },
  {
    id: 'pc5',
    question: 'When using a Weighted Decision Matrix, why must criteria such as "Delivery Time" or "Implementation Cost" have their raw values inverted into a normalized scale?',
    options: [
      'Because higher numbers in a decision matrix must consistently represent more desirable outcomes.',
      'Because costs are always negative numbers in accounting.',
      'Because weights must always equal zero.',
      'Inverting values is forbidden in decision analysis.'
    ],
    correct: 'A',
    explanation: 'In decision matrices, higher scores represent better choices. For metrics where less is better (e.g. lower cost, less downtime, faster latency), lower raw numbers must be mapped to higher desirability scores (e.g., 10 = Cheapest, 1 = Most Expensive) so that multiplying by weights produces a valid sum (Option A).',
    distractors: [
      'Option B: Costs are positive expenditure amounts.',
      'Option C: Weights must sum to 1.0, not zero.',
      'Option D: Normalizing scales is standard industry practice.'
    ]
  }
];

export const challengeCaseStudy = {
  title: 'Alpha Fly Computer Education – Course Performance Analysis',
  context: `Alpha Fly Computer Education’s Academic Steering Committee is reviewing operational and pedagogical metrics across three sequential technical batches (Batch Alpha, Batch Beta, and Batch Gamma). As Lead Analytics Consultant, you must evaluate the conversion funnel, certification efficiency, unit costs, and formulate an evidence-backed strategic recommendation.`,
  dataset: {
    headers: ['Performance Metric', 'Batch Alpha', 'Batch Beta', 'Batch Gamma'],
    rows: [
      ['Student Enquiries', '1,200', '1,600', '2,000'],
      ['Student Admissions', '240', '360', '400'],
      ['Completed Course & Certified', '192', '270', '320'],
      ['Average Assessment Score', '82.5', '79.0', '84.0'],
      ['Assessment Pass Rate', '85.0%', '82.0%', '88.0%'],
      ['Total Course Delivery Cost', '₹7,20,000', '₹9,00,000', '₹11,20,000'],
      ['Student Satisfaction Rating (1 to 5)', '4.4', '4.1', '4.7']
    ]
  },
  questions: [
    {
      qId: 'ch1',
      question: 'Calculate the Enquiry-to-Admission conversion rates for all three batches. Which batch achieved the highest enquiry conversion rate?',
      options: [
        'Batch Alpha (20.0%)',
        'Batch Beta (22.5%)',
        'Batch Gamma (20.0%)',
        'Batch Alpha and Gamma tied at 25.0%'
      ],
      correct: 'B',
      explanation: 'Alpha = (240 / 1,200) × 100 = 20.0%. Beta = (360 / 1,600) × 100 = 22.5%. Gamma = (400 / 2,000) × 100 = 20.0%. Batch Beta achieved the highest conversion rate at 22.5%.'
    },
    {
      qId: 'ch2',
      question: 'What was the Completion-to-Admission rate for Batch Alpha, Batch Beta, and Batch Gamma respectively?',
      options: [
        'Alpha: 80.0%, Beta: 75.0%, Gamma: 80.0%',
        'Alpha: 85.0%, Beta: 80.0%, Gamma: 85.0%',
        'Alpha: 75.0%, Beta: 70.0%, Gamma: 80.0%',
        'Alpha: 90.0%, Beta: 85.0%, Gamma: 88.0%'
      ],
      correct: 'A',
      explanation: 'Alpha Completion Rate = (192 / 240) × 100 = 80.0%. Beta Completion Rate = (270 / 360) × 100 = 75.0%. Gamma Completion Rate = (320 / 400) × 100 = 80.0%.'
    },
    {
      qId: 'ch3',
      question: 'Calculate the Delivery Cost per Admitted Student for each batch. Which batch operated with the most economical cost per admitted student?',
      options: [
        'Batch Alpha (₹3,000/student)',
        'Batch Beta (₹2,500/student)',
        'Batch Gamma (₹2,800/student)',
        'All three batches had identical unit costs'
      ],
      correct: 'B',
      explanation: 'Alpha Unit Cost = ₹7,20,000 / 240 = ₹3,000. Beta Unit Cost = ₹9,00,000 / 360 = ₹2,500. Gamma Unit Cost = ₹11,20,000 / 400 = ₹2,800. Batch Beta had the lowest cost per student (₹2,500).'
    },
    {
      qId: 'ch4',
      question: 'A manager asserts: "Batch Gamma had the highest delivery cost (₹11.20 Lakhs), therefore it was the least financially efficient batch." Why is this assertion flawed?',
      options: [
        'Because Batch Gamma admitted the most students (400), bringing its cost per admitted student to ₹2,800, which is lower than Batch Alpha’s ₹3,000.',
        'Because delivery cost does not matter in education.',
        'Because Batch Gamma had the lowest satisfaction rating.',
        'Because Batch Alpha had higher total costs.'
      ],
      correct: 'A',
      explanation: 'Evaluating raw total cost without dividing by cohort size commits the raw totals fallacy. Batch Gamma trained 400 students at ₹2,800/student, making it more cost-effective per unit than Batch Alpha (₹3,000/student).'
    },
    {
      qId: 'ch5',
      question: 'Based on the complete data matrix, which strategic recommendation is best supported by evidence?',
      options: [
        'Adopt Batch Gamma’s pedagogical and mentoring practices (highest satisfaction 4.7, highest score 84.0, highest pass rate 88%), while adopting Batch Beta’s marketing enquiry workflow (highest conversion 22.5%).',
        'Shut down Batch Gamma because its total expenditure was ₹11.20 Lakhs.',
        'Eliminate admissions screening so 100% of enquiries enroll.',
        'Discontinue Batch Beta because its average score was 79.0.'
      ],
      correct: 'A',
      explanation: 'Synthesizing metrics across the funnel: Batch Beta excels in initial conversion (22.5%) and unit cost (₹2,500), while Batch Gamma excels in academic excellence (88% pass rate, 4.7 rating). Combining these practices maximizes overall institutional performance.'
    }
  ]
};

export const finalAssessmentQuestions = [
  // 1-4: Advanced Charts & Tables
  {
    id: 'fa1',
    category: 'Advanced Charts & Tables',
    question: 'A line graph shows Alpha Fly’s active online users growing from 12,000 in Q1 to 18,000 in Q3. What was the percentage increase in active users?',
    options: ['33.3%', '50.0%', '60.0%', '66.7%'],
    correct: 'B',
    explanation: 'Percentage Increase = [(18,000 - 12,000) / 12,000] × 100 = (6,000 / 12,000) × 100 = 50.0%.',
    distractorReason: 'Dividing by 18,000 gives 33.3%; correct base is 12,000.'
  },
  {
    id: 'fa2',
    category: 'Advanced Charts & Tables',
    question: 'In a pie chart of 2,400 technical graduates, the Cloud Computing sector has an angle of 54°. How many students graduated in Cloud Computing?',
    options: ['320', '360', '400', '450'],
    correct: 'B',
    explanation: 'Fraction = 54° / 360° = 3 / 20 = 15.0%. Students = 0.15 × 2,400 = 360 students.',
    distractorReason: '54 / 360 is 0.15. 0.15 * 2400 = 360.'
  },
  {
    id: 'fa3',
    category: 'Advanced Charts & Tables',
    question: 'Table data shows monthly bug reports: Jan (40), Feb (50), Mar (65), Apr (80). What was the percentage increase in bug reports from February to April?',
    options: ['30.0%', '40.0%', '60.0%', '80.0%'],
    correct: 'C',
    explanation: 'Increase = [(80 - 50) / 50] × 100 = (30 / 50) × 100 = 60.0%.',
    distractorReason: 'Baseline is February (50). 30/50 = 60%.'
  },
  {
    id: 'fa4',
    category: 'Advanced Charts & Tables',
    question: 'A bar chart shows Course 1 (80 enrolled, 60 certified), Course 2 (120 enrolled, 96 certified), and Course 3 (150 enrolled, 105 certified). Which course achieved the HIGHEST certification rate?',
    options: [
      'Course 1 (75%)',
      'Course 2 (80%)',
      'Course 3 (70%)',
      'Course 1 and Course 2 tied'
    ],
    correct: 'B',
    explanation: 'Course 1 = 60/80 = 75.0%. Course 2 = 96/120 = 80.0%. Course 3 = 105/150 = 70.0%. Course 2 achieved the highest rate at 80.0%.',
    distractorReason: 'Course 2 has 96/120 = 80%, exceeding Course 1 (75%) and Course 3 (70%).'
  },

  // 5-8: Percentage, Ratio, Average, and Growth Calculations
  {
    id: 'fa5',
    category: 'Calculations: Percentage, Ratio & Averages',
    question: 'A student scored 68, 74, 82, and 86 in four sequential coding assignments. What must they score on the fifth assignment to attain an overall average of 80.0?',
    options: ['80', '84', '88', '90'],
    correct: 'D',
    explanation: 'Total marks needed = 5 × 80 = 400. Sum of 4 assignments = 68 + 74 + 82 + 86 = 310. Fifth assignment = 400 - 310 = 90.',
    distractorReason: '310 + 90 = 400. 400 / 5 = 80.0.'
  },
  {
    id: 'fa6',
    category: 'Calculations: Percentage, Ratio & Averages',
    question: 'The ratio of frontend developers to backend developers in a tech cohort is 4 : 5. If there are 36 frontend developers, how many backend developers are there?',
    options: ['40', '45', '50', '55'],
    correct: 'B',
    explanation: '4 parts = 36. 1 part = 36 / 4 = 9. Backend developers = 5 parts = 5 × 9 = 45.',
    distractorReason: '5 * 9 = 45 backend developers.'
  },
  {
    id: 'fa7',
    category: 'Calculations: Percentage, Ratio & Averages',
    question: 'A technical blog had 50,000 monthly readers in 2024. In 2025, traffic rose by 30%. In 2026, traffic grew by an additional 20% over 2025. What was total readership in 2026?',
    options: ['75,000', '76,000', '78,000', '80,000'],
    correct: 'C',
    explanation: '2025 = 50,000 × 1.30 = 65,000. 2026 = 65,000 × 1.20 = 78,000. (Or 50,000 × 1.56 = 78,000).',
    distractorReason: 'Simple sum 50% gives 75,000, missing the compounding 3,000.'
  },
  {
    id: 'fa8',
    category: 'Calculations: Percentage, Ratio & Averages',
    question: 'An operational error rate decreased from 25% to 5%. Express this decrease in percentage points and relative percentage terms.',
    options: [
      '20 percentage points decrease; 80% relative decrease',
      '20 percentage points decrease; 20% relative decrease',
      '80 percentage points decrease; 20% relative decrease',
      '5 percentage points decrease; 75% relative decrease'
    ],
    correct: 'A',
    explanation: 'Percentage points = 25% - 5% = 20 pp. Relative decrease = [(25 - 5) / 25] × 100 = (20 / 25) × 100 = 80%.',
    distractorReason: 'Option A matches the arithmetic difference and proportional base.'
  },

  // 9-12: Multi-Step Data Analysis
  {
    id: 'fa9',
    category: 'Multi-Step Data Analysis',
    question: 'Course Alpha charges ₹30,000 per student with delivery costs of ₹18,000 per student. If 50 students enroll, what is total net profit, and what is the profit margin percentage?',
    options: [
      'Profit: ₹6 Lakhs; Margin: 40.0%',
      'Profit: ₹6 Lakhs; Margin: 33.3%',
      'Profit: ₹9 Lakhs; Margin: 40.0%',
      'Profit: ₹12 Lakhs; Margin: 50.0%'
    ],
    correct: 'A',
    explanation: 'Total Revenue = 50 × ₹30k = ₹15,00,000 (15L). Total Cost = 50 × ₹18k = ₹9,00,000 (9L). Profit = 15L - 9L = ₹6,00,000 (6L). Margin = (6 / 15) × 100 = 40.0%.',
    distractorReason: '6 Lakhs / 15 Lakhs = 40.0%.'
  },
  {
    id: 'fa10',
    category: 'Multi-Step Data Analysis',
    question: 'Cohort A (80 students) has average test score 70. Cohort B (120 students) has average test score 85. What is the weighted average score of the combined 200 students?',
    options: ['77.5', '78.0', '79.0', '80.0'],
    correct: 'C',
    explanation: 'Total marks = (80 × 70) + (120 × 85) = 5,600 + 10,200 = 15,800. Weighted average = 15,800 / 200 = 79.0.',
    distractorReason: 'Simple average is 77.5, which is invalid because Cohort B has 120 students.'
  },
  {
    id: 'fa11',
    category: 'Multi-Step Data Analysis',
    question: 'A technical support desk logged 1,200 tickets. 60% were Level 1, 30% were Level 2, and the rest were Level 3. Level 3 tickets take 4 hours to resolve each. How many total hours were spent on Level 3 tickets?',
    options: ['360 hours', '480 hours', '520 hours', '600 hours'],
    correct: 'B',
    explanation: 'Level 3 tickets percentage = 100% - (60% + 30%) = 10%. Number of Level 3 tickets = 10% of 1,200 = 120 tickets. Total hours = 120 × 4 hours = 480 hours.',
    distractorReason: '120 * 4 = 480 hours.'
  },
  {
    id: 'fa12',
    category: 'Multi-Step Data Analysis',
    question: 'In a software beta test: Version 1 had 50 bugs in 1,000 lines of code (KLOC). Version 2 had 30 bugs in 1,200 lines of code. By what percentage did the bug density (bugs per KLOC) decrease from Version 1 to Version 2?',
    options: ['40.0%', '45.0%', '50.0%', '55.0%'],
    correct: 'C',
    explanation: 'Density V1 = 50 / 1,000 = 0.050 bugs/line. Density V2 = 30 / 1,200 = 0.025 bugs/line. Percentage reduction = [(0.050 - 0.025) / 0.050] × 100 = (0.025 / 0.050) × 100 = 50.0%.',
    distractorReason: 'Density dropped exactly by half (0.05 to 0.025), a 50% decrease.'
  },

  // 13-16: Critical Evaluation of Data & Evidence
  {
    id: 'fa13',
    category: 'Critical Evaluation of Data & Evidence',
    question: 'A coding boot camp claims: "Graduates who complete our optional Sunday coding club earn 35% higher salaries than graduates who skip it. Therefore, joining the Sunday club causes higher salaries." What is the primary analytical flaw in this claim?',
    options: [
      'Self-selection bias: Highly motivated, skilled students choose to join Sunday club voluntarily, creating a confounding ability variable.',
      'The sample size of Sundays was not large enough.',
      'Sunday salaries are taxed at higher rates.',
      'The boot camp did not use a pie chart.'
    ],
    correct: 'A',
    explanation: 'Students who voluntarily spend Sundays coding possess higher baseline dedication, aptitude, and persistence. Attributing their salary premium purely to the club commits the self-selection / confounding causality fallacy.',
    distractorReason: 'Option A correctly identifies self-selection bias.'
  },
  {
    id: 'fa14',
    category: 'Critical Evaluation of Data & Evidence',
    question: 'A bar chart compares customer satisfaction: Company A has 91% and Company B has 89%. The bar for Company A is three times taller than Company B. What graphical manipulation is present?',
    options: [
      'Truncated vertical axis (non-zero baseline) visually exaggerating a minor 2 percentage point difference.',
      'Simpson’s Paradox.',
      'Inverted percentage base.',
      'Survivorship bias.'
    ],
    correct: 'A',
    explanation: 'Truncating the y-axis (e.g. Starting from 88% instead of 0%) creates the false visual impression that Company A is 300% better than Company B when the actual gap is only 2 percentage points.',
    distractorReason: 'Truncated axis exaggerates minor discrepancies.'
  },
  {
    id: 'fa15',
    category: 'Critical Evaluation of Data & Evidence',
    question: 'An HR report states: "Employees in Department X take 4 times as many sick leave days as employees in Department Y. Therefore, Department X has a toxic work environment." What confounding factor must be investigated first?',
    options: [
      'Demographic and physical occupational hazards (e.g., Department X handles chemical lab equipment or has an older workforce).',
      'The font size used in Department X’s timesheets.',
      'Whether Department Y employees drink green tea.',
      'Department X’s building color.'
    ],
    correct: 'A',
    explanation: 'Sick leave frequency is heavily driven by physical job hazard risks, ergonomics, and demographic age brackets. Claiming managerial toxicity without controlling for workplace hazards is an unsupported leap.',
    distractorReason: 'Job hazards and demographic variables must be controlled.'
  },
  {
    id: 'fa16',
    category: 'Critical Evaluation of Data & Evidence',
    question: 'A tech magazine tested battery life on 2 laptops of Model Alpha and declared: "Model Alpha is guaranteed to run 18 hours for all enterprise users." What is the primary vulnerability?',
    options: [
      'Extremely small sample size (n = 2) subject to random variation and unrepresentative usage conditions.',
      'Batteries cannot be measured in hours.',
      'Laptops do not use electricity.',
      'Model Alpha was released in autumn.'
    ],
    correct: 'A',
    explanation: 'Testing only 2 units (n=2) cannot establish statistical significance or guarantee performance across diverse enterprise workloads.',
    distractorReason: 'Small sample size lacks statistical power.'
  },

  // 17-20: Decision-Making and Weighted Scoring
  {
    id: 'fa17',
    category: 'Decision-Making & Weighted Scoring',
    question: 'An engineering team evaluates two database solutions. Weights: Reliability = 0.50, Performance = 0.30, Cost = 0.20. Solution 1 scores (Rel: 8, Perf: 9, Cost: 5). Solution 2 scores (Rel: 9, Perf: 7, Cost: 8). What are their respective weighted scores?',
    options: [
      'Solution 1: 7.70; Solution 2: 8.20',
      'Solution 1: 8.00; Solution 2: 8.00',
      'Solution 1: 7.50; Solution 2: 7.80',
      'Solution 1: 8.20; Solution 2: 7.70'
    ],
    correct: 'A',
    explanation: 'Solution 1 = (0.50 × 8) + (0.30 × 9) + (0.20 × 5) = 4.0 + 2.7 + 1.0 = 7.70. Solution 2 = (0.50 × 9) + (0.30 × 7) + (0.20 × 8) = 4.5 + 2.1 + 1.6 = 8.20.',
    distractorReason: 'Solution 2 wins with 8.20 vs 7.70.'
  },
  {
    id: 'fa18',
    category: 'Decision-Making & Weighted Scoring',
    question: 'In a weighted matrix with 3 criteria (A, B, C), Criterion A has weight 0.50, B has 0.30, and C has 0.20. Alternative X scores 10 in A, 6 in B, and 4 in C. What is Alternative X’s total weighted score?',
    options: ['7.20', '7.40', '7.60', '8.00'],
    correct: 'C',
    explanation: 'Score = (0.50 × 10) + (0.30 × 6) + (0.20 × 4) = 5.0 + 1.8 + 0.8 = 7.60.',
    distractorReason: '5.0 + 1.8 + 0.8 = 7.60.'
  },
  {
    id: 'fa19',
    category: 'Decision-Making & Weighted Scoring',
    question: 'What is the purpose of conducting a Sensitivity Analysis following a Weighted Decision Matrix evaluation?',
    options: [
      'To test how sensitive the final recommendation is to minor adjustments in criteria weights or scores.',
      'To make the calculation take longer.',
      'To eliminate all criteria that have low weights.',
      'To ensure all alternatives receive identical scores.'
    ],
    correct: 'A',
    explanation: 'Sensitivity analysis tests the robustness of a decision by varying weights to see if minor fluctuations reverse the winning alternative.',
    distractorReason: 'Option A defines sensitivity analysis accurately.'
  },
  {
    id: 'fa20',
    category: 'Decision-Making & Weighted Scoring',
    question: 'A manager selects Vendor Alpha because its total weighted score was 8.1 vs Vendor Beta’s 8.0. However, Vendor Alpha has a critical risk of bankruptcy in 6 months. What decision principle was neglected?',
    options: [
      'A weighted score is a decision-support guide, not an absolute guarantee; critical non-compensatory knockout constraints (such as financial solvency) must override numerical scores.',
      'Vendor Beta should have been awarded 10 points automatically.',
      'Bankruptcy is completely irrelevant to vendor software reliability.',
      'The manager should have averaged the two scores together.'
    ],
    correct: 'A',
    explanation: 'A decision matrix cannot compensate for catastrophic fatal flaws. Severe risks represent knockout constraints that disqualify an alternative regardless of its score.',
    distractorReason: 'Knockout constraints supersede marginal numerical leads.'
  }
];

export const revisionData = {
  summaryPoints: [
    {
      title: 'Percentage Change Master Formula',
      content: '% Change = [(New - Old) / Old] × 100. Always divide by the initial base. To recover from a 20% loss, you need a 25% gain!'
    },
    {
      title: 'Percentage Points vs Relative % Change',
      content: 'A change from 20% to 25% is +5 percentage points (arithmetic gap), but a 25% relative increase (5 / 20 = 25%). Never conflate them!'
    },
    {
      title: 'Weighted Average vs Simple Average',
      content: 'When combining groups of unequal sizes, Weighted Mean = Σ (w_i × x_i) / Σ w_i. A simple average of averages produces statistical distortion.'
    },
    {
      title: 'The Raw Totals Fallacy',
      content: 'Never compare performance across unequal cohorts using raw totals alone. Always normalize into per-capita or percentage rates.'
    },
    {
      title: 'Weighted Decision Matrix Formula',
      content: 'Weighted Total = Σ (Weight_i × Score_i). Ensure weights sum to 1.0, scale direction is consistent (higher = better), and knockout risks are audited.'
    }
  ],
  rapidFireQuestions: [
    {
      q: '1. What is the percentage change when a metric rises from 50 to 75?',
      a: '50.0% increase ([(75 - 50) / 50] × 100 = 25/50 = 50%).'
    },
    {
      q: '2. In a pie chart, what angle represents a 25% budget allocation?',
      a: '90° (0.25 × 360° = 90°).'
    },
    {
      q: '3. If an interest rate drops from 8% to 6%, what is the drop in percentage points?',
      a: '2 percentage points (8% - 6% = 2 pp).'
    },
    {
      q: '4. Why is correlation not proof of causation?',
      a: 'Because a third confounding variable or reverse causality may explain the observed statistical relationship.'
    },
    {
      q: '5. In a decision matrix, if Cost is rated from 1 to 10, should lower cost get a score of 10 or 1?',
      a: 'Score of 10 (higher scores must consistently represent the more desirable outcome).'
    }
  ]
};
