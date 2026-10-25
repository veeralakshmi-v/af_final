// ==========================================
// ALPHA FLY LOGICAL REASONING - LEVEL 2 (INTERMEDIATE)
// DAY 11: STRUCTURED PROBLEM SOLVING (PART 2)
// Evaluate, Decide, Implement, and Measure
// ==========================================

export const day11Overview = {
  courseName: "Logical Reasoning",
  level: "Level 2 – Intermediate",
  dayNumber: 11,
  title: "Structured Problem Solving (Part 2)",
  subtitle: "Decision Criteria, Risk Analysis, and Action Planning",
  targetAudience: "School and college students, job seekers, placement candidates, and working professionals.",
  language: "Simple English",
  difficulty: "Intermediate",
  estimatedMinutes: 55,
  description: "Master the second half of structured problem solving: learn how to build mathematical decision matrices, evaluate trade-offs and hidden risks, justify solution choices with evidence, create milestone-driven action plans, and track post-implementation metrics.",
  learningObjectives: [
    "Compare competing alternatives objectively using weighted decision matrices and standardized scoring.",
    "Identify trade-offs, opportunity costs, secondary risks, and unintended consequences.",
    "Select and justify the most defensible solution to stakeholders using data and rational trade-offs.",
    "Formulate a complete 5W1H implementation action plan with milestones, owners, and contingencies.",
    "Establish clear quantitative Key Performance Indicators (KPIs) to measure success pre- and post-launch.",
    "Avoid common cognitive traps including the sunk-cost fallacy, equal-weighting bias, and vanity metrics."
  ]
};

// ==========================================
// 2. LESSON INTRODUCTION & DIAGNOSTIC SCENARIO
// ==========================================

export const lessonIntro = {
  title: "From Analysis to Action: Why Rigorous Evaluation Matters",
  importancePoints: [
    "Preventing Costly Missteps: Brainstorming good ideas is only half the battle; choosing the wrong solution wastes capital, time, and team morale.",
    "Defensible Stakeholder Justification: Senior managers, clients, and interviewers expect decisions backed by quantifiable criteria rather than 'gut feel'.",
    "Managing Risk & Unintended Side Effects: Every change creates ripple effects; proactive risk assessment ensures fixes don't introduce bigger problems.",
    "Execution Accountability: A great strategy without owners, deadlines, and fallback plans almost always fails during implementation."
  ],
  starterScenario: {
    title: "Starter Dilemma: The Cloud Migration Choice",
    context: "A software training institute needs to choose an online lab hosting platform. The team has identified three viable alternatives: Provider A (Cheap but has frequent downtime), Provider B (High performance and 99.9% uptime but 3x more expensive), and Provider C (Moderate cost, good uptime, but requires 3 weeks of custom configuration).",
    initialUrge: "The junior developer suggests: 'Let's pick Provider B because it is the most popular and has the highest rating online.'",
    whyUrgeIsDangerous: "Choosing based on popularity without comparing budget constraints, actual feature requirements, and implementation capacity leads to budget overruns and unused features.",
    diagnosticQuestions: [
      {
        question: "How should the institute evaluate these three providers objectively?",
        answer: "By creating a decision matrix with defined criteria (Cost, Reliability, Setup Time, Support) and assigning weights based on institute priorities."
      },
      {
        question: "What hidden risks or trade-offs exist for each option?",
        answer: "Provider A risks student dissatisfaction; Provider B risks budget deficits; Provider C risks delaying course launches by 3 weeks."
      },
      {
        question: "What is an opportunity cost in this context?",
        answer: "Spending ₹30,000 extra on Provider B means that money cannot be invested in upgrading classroom computers or instructor salaries."
      },
      {
        question: "How will the institute verify that the chosen platform was successful?",
        answer: "By monitoring lab uptime (>99%), student support ticket volume, and student lab satisfaction scores over the first 60 days."
      }
    ]
  },
  cycleSteps: [
    { step: 1, title: "Establish Decision Criteria", desc: "Define explicit, measurable benchmarks (cost, feasibility, impact, risk) to judge options." },
    { step: 2, title: "Assign Weights to Criteria", desc: "Rank criteria importance mathematically (e.g. 1 to 3) so core priorities outweigh minor perks." },
    { step: 3, title: "Score Alternatives in a Matrix", desc: "Grade each option objectively on a 1-5 scale and calculate weighted totals." },
    { step: 4, title: "Assess Risks & Side Effects", desc: "Identify secondary risks, failure modes, and mitigation fallbacks before committing." },
    { step: 5, title: "Select & Justify the Choice", desc: "Synthesize the data to present an evidence-based recommendation to stakeholders." },
    { step: 6, title: "Create 5W1H Action Plan", desc: "Define Who does What, When, Where, Why, and How with milestones and deadlines." },
    { step: 7, title: "Measure KPIs & Iterate", desc: "Track quantitative metrics against pre-intervention baselines; adjust if targets are missed." }
  ]
};

// ==========================================
// 3. CORE CONCEPTS (4 IN-DEPTH MODULES)
// ==========================================

export const coreConcepts = {
  concept1: {
    id: "concept1",
    title: "Concept 1: Decision Criteria & Weighted Decision Matrices",
    subtitle: "Eliminating Emotional Bias with Mathematical Comparison",
    theory: "When multiple solutions are viable, human beings tend to pick whatever feels easiest or most familiar. A weighted decision matrix forces objective evaluation by grading every option against transparent, agreed-upon criteria.",
    matrixGuide: [
      { step: "Step 1: List Alternatives", detail: "Place competing options in rows (e.g., Option A, Option B, Option C)." },
      { step: "Step 2: Define Criteria", detail: "Select 4-6 key parameters such as Effectiveness, Cost, Time to Implement, and Risk." },
      { step: "Step 3: Assign Importance Weights", detail: "Assign each criterion a multiplier weight (e.g. Weight 3 = Essential, Weight 2 = Important, Weight 1 = Nice to have)." },
      { step: "Step 4: Score Each Cell (1-5)", detail: "Grade each option from 1 (Poor) to 5 (Excellent) on how well it satisfies that criterion." },
      { step: "Step 5: Calculate Weighted Total", detail: "Multiply Score × Weight for each criterion and sum them: Total = Σ(Score × Weight)." }
    ],
    workedMatrix: {
      title: "Sample Matrix: Solving Delayed Student Assignment Submissions",
      weights: [
        { name: "Effectiveness (Weight 3)", weight: 3 },
        { name: "Low Cost (Weight 2)", weight: 2 },
        { name: "Quick Setup (Weight 2)", weight: 2 },
        { name: "Low Student Friction (Weight 1)", weight: 1 }
      ],
      rows: [
        {
          option: "Alt 1: Automated WhatsApp Reminders",
          scores: { eff: 3, cost: 5, speed: 5, friction: 4 },
          weightedScore: "(3×3) + (5×2) + (5×2) + (4×1) = 9 + 10 + 10 + 4 = 33",
          total: 33,
          verdict: "Very fast and inexpensive to launch, but only provides moderate effectiveness because reminders do not help stuck students."
        },
        {
          option: "Alt 2: Weekly Milestone Chunking & Code Clinics",
          scores: { eff: 5, cost: 4, speed: 3, friction: 4 },
          weightedScore: "(5×3) + (4×2) + (3×2) + (4×1) = 15 + 8 + 6 + 4 = 33",
          total: 33,
          verdict: "High effectiveness; directly resolves the root cause of being technically stuck. Requires instructor time."
        },
        {
          option: "Alt 3: Strict Grade Deductions (10% per day late)",
          scores: { eff: 3, cost: 5, speed: 5, friction: 1 },
          weightedScore: "(3×3) + (5×2) + (5×2) + (1×1) = 9 + 10 + 10 + 1 = 30",
          total: 30,
          verdict: "Low cost and fast, but creates massive student dissatisfaction and does not improve learning outcomes."
        }
      ],
      synthesis: "While Alt 1 and Alt 2 tie at 33 points, Alt 2 has a higher score on Effectiveness (15 vs 9). The best strategic move is a hybrid: launch Alt 1 immediately as a quick-win containment, followed by Alt 2 for permanent systemic improvement."
    }
  },

  concept2: {
    id: "concept2",
    title: "Concept 2: Evaluating Risks, Trade-offs & Unintended Consequences",
    subtitle: "Anticipating Side Effects Before Launching",
    theory: "Every decision carries trade-offs. A solution that looks superior on paper can fail in practice if secondary risks, implementation friction, or opportunity costs are ignored.",
    riskFramework: [
      {
        type: "Secondary / Spillover Risk",
        definition: "A new problem created directly by implementing the proposed solution.",
        example: "Automating customer support with an AI chatbot reduces waiting time (success), but frustrates users with complex technical issues (new risk)."
      },
      {
        type: "Opportunity Cost",
        definition: "The value of the next best alternative that is forgone when a choice is made.",
        example: "Allocating 2 senior instructors to create online video modules means they cannot conduct in-person doubt-clearing sessions."
      },
      {
        type: "Implementation Resistance",
        definition: "Opposition or pushback from users or employees accustomed to the old way.",
        example: "Staff refusing to use a new CRM system because data entry takes 3 additional clicks per record."
      },
      {
        type: "Unintended Perverse Incentive",
        definition: "An incentive system that encourages people to game the metric rather than achieve the actual goal.",
        example: "Rewarding counselors purely for number of outbound calls leads to 5-second hung-up calls rather than meaningful student advice."
      }
    ],
    mitigationGrid: [
      { risk: "Staff resistance to new process", mitigation: "Involve team in designing the tool; provide 1-hour interactive training; celebrate early adopters." },
      { risk: "Budget overrun during software setup", mitigation: "Enforce a fixed-price contract with defined milestones; test with free trial tier first." },
      { risk: "New system goes offline during enrollment rush", mitigation: "Maintain manual paper forms as a standby backup; schedule migrations during off-peak hours." }
    ]
  },

  concept3: {
    id: "concept3",
    title: "Concept 3: Selecting and Justifying the Solution",
    subtitle: "Presenting Defensible Recommendations to Stakeholders",
    theory: "Selecting a solution is not just an internal calculation; you must defend your recommendation to managers, team members, or clients who may hold different perspectives.",
    justificationStructure: [
      {
        element: "1. Problem & Baseline",
        explanation: "State the problem in measurable terms: 'Our enquiry conversion rate is 15%, causing 85 lost leads/month.'"
      },
      {
        element: "2. Alternatives Considered",
        explanation: "Prove that you didn't rush to one idea: 'We evaluated a fee reduction, an automated callback SLA, and weekend batches.'"
      },
      {
        element: "3. Trade-off Justification",
        explanation: "Explain why the chosen option outperforms competitors: 'A 30% fee cut reduces revenue by ₹1.2L without fixing callback delays. An automated 2-hour callback system costs only ₹2,500/month and targets our 54-hour response bottleneck.'"
      },
      {
        element: "4. Risk Mitigation Plan",
        explanation: "Acknowledge risks and show prepared solutions: 'If staff are overwhelmed by rapid callbacks, counselors will use standardized WhatsApp templates.'"
      },
      {
        element: "5. Expected ROI / Outcome",
        explanation: "Forecast the tangible benefit: 'We anticipate conversion rising to 25% within 60 days, yielding 12 additional admissions (+₹1.8L revenue).'"
      }
    ]
  },

  concept4: {
    id: "concept4",
    title: "Concept 4: Implementation Planning, Tracking & Review",
    subtitle: "Turning Decisions into Structured Action and Measurable Results",
    theory: "A brilliant decision without disciplined execution produces zero results. Implementation requires a 5W1H action plan, clear milestones, designated owners, and continuous KPI tracking.",
    fiveWOneH: [
      { component: "Who", detail: "Who is the single directly responsible individual (DRI) for this task?" },
      { component: "What", detail: "What exact deliverable or milestone must be completed?" },
      { component: "When", detail: "What is the non-negotiable deadline or checkpoint date?" },
      { component: "Where", detail: "Where does this occur (portal, classroom, server, office)?" },
      { component: "Why", detail: "Why is this specific task required for the overall project goal?" },
      { component: "How", detail: "How will the task be executed and what resources or tools are required?" }
    ],
    postLaunchMonitoring: [
      {
        concept: "Pre vs Post Measurement",
        detail: "Record baseline metrics before launch and compare them at 15, 30, and 60 days under controlled conditions."
      },
      {
        concept: "Leading vs Lagging Indicators",
        detail: "Leading indicator: Average callback time (<2 hrs). Lagging indicator: Total monthly student admissions (18 to 30)."
      },
      {
        concept: "Post-Implementation Review (Post-Mortem)",
        detail: "Hold a 30-day review to answer: Did the solution work? What unexpected friction occurred? What adjustments are needed?"
      }
    ]
  }
};

// ==========================================
// 4. SOLVED MASTER EXAMPLES (4 WORKED EXAMPLES)
// ==========================================

export const workedExamples = [
  {
    id: "we1",
    title: "Example 1: Improving Student Enquiry-to-Admission Conversion",
    domain: "Business Operations & Admissions",
    scenario: "Alpha Fly Computer Education receives 100 student enquiries monthly but converts only 15% (target is 25%). Counselors take 46 hours on average to return calls. Budget is ₹3,000/month.",
    options: [
      "Alt A: Cut course fees by 25% across all programming courses.",
      "Alt B: Implement automated WhatsApp enquiry acknowledgement & 2-hour callback SLA.",
      "Alt C: Hire two additional full-time admission counselors."
    ],
    analysisSteps: [
      "Step 1 (Check Constraints): Alt C costs ₹30,000/month, far exceeding the ₹3,000 budget constraint (Eliminate Alt C).",
      "Step 2 (Root Cause Match): The root cause is a 46-hour callback delay. Cutting course fees (Alt A) does not fix callback delays and reduces revenue by 25%.",
      "Step 3 (Feasibility & Cost): Alt B uses a standard WhatsApp Business API (costs ₹1,800/month) to send instant syllabus previews and assign callbacks within a 2-hour SLA.",
      "Step 4 (Risk & Mitigation): Risk that counselors are in meetings. Mitigation: Backup counselor assigned for overflow hours."
    ],
    recommendedChoice: "Option B: Automated WhatsApp instant acknowledgement and 2-hour callback SLA.",
    whyCorrect: "It directly targets the 46-hour response delay root cause, respects the ₹3,000 monthly budget, and can be operationalized within 48 hours.",
    distractorAnalysis: "Alt A wastes revenue on a symptom. Alt C violates the budget constraint."
  },
  {
    id: "we2",
    title: "Example 2: Reducing Repeated Errors in a Student Billing Application",
    domain: "Software Systems & Quality Assurance",
    scenario: "Students report incorrect fee balances on their portal after making online installment payments. The accounting team manually recalculates 40 balances weekly, causing delays.",
    options: [
      "Alt A: Hire a temporary data entry clerk to manually verify all balances every Friday.",
      "Alt B: Rewrite the entire accounting software platform from scratch.",
      "Alt C: Implement an automated webhook synchronization script with an automated audit log."
    ],
    analysisSteps: [
      "Step 1 (Scope & Risk): Alt B takes 6 months and carries massive regression risk.",
      "Step 2 (Root Cause): Alt A treats the symptom manually and fails to stop new bad records from forming.",
      "Step 3 (Targeted Fix): Alt C fixes the data desynchronization at payment gateway confirmation, logs discrepancies instantly, and alerts the developer if an API call fails."
    ],
    recommendedChoice: "Option C: Automated webhook synchronization with real-time audit logging.",
    whyCorrect: "It permanently cures the automated desynchronization fault without the huge cost and risk of rebuilding the entire platform.",
    distractorAnalysis: "Alt A introduces permanent manual labor costs. Alt B introduces extreme implementation risk."
  },
  {
    id: "we3",
    title: "Example 3: Prioritizing Multiple Urgent Tasks under Tight Deadlines",
    domain: "Workplace & Academic Productivity",
    scenario: "A project lead has 6 hours left in the workday and 4 competing tasks: Task 1: Fix critical production server crash affecting 200 users; Task 2: Format slide deck for an internal meeting next week; Task 3: Review security vulnerability patch for portal login; Task 4: Reply to non-urgent vendor newsletters.",
    options: [
      "Alt A: Do tasks in alphabetical order.",
      "Alt B: Complete Task 1 first, Task 3 second, defer Task 2, delegate/archive Task 4.",
      "Alt C: Start all 4 tasks simultaneously and switch every 15 minutes."
    ],
    analysisSteps: [
      "Step 1 (Urgency & Impact): Task 1 (server down) has immediate high business impact. Must be resolved immediately.",
      "Step 2 (Security Risk): Task 3 (login security patch) prevents data breaches and must follow immediately.",
      "Step 3 (Low Urgency): Task 2 is for next week and can be deferred. Task 4 has near-zero impact."
    ],
    recommendedChoice: "Option B: Prioritize Task 1 (Server crash), then Task 3 (Security patch), defer Task 2, discard Task 4.",
    whyCorrect: "Applies the Eisenhower Matrix: High Impact & High Urgency takes absolute precedence. Multitasking (Alt C) causes context switching and guarantees mistakes.",
    distractorAnalysis: "Alt A is arbitrary. Alt C divides focus during a critical server emergency."
  },
  {
    id: "we4",
    title: "Example 4: Choosing & Defending a Solution to Stakeholders",
    domain: "Management & Stakeholder Alignment",
    scenario: "The institute's lab computers take 8 minutes to boot because of aging magnetic hard drives. Management wants to buy 30 brand-new computers for ₹12,00,000. The IT instructor proposes upgrading the existing machines with 512GB SSDs for ₹60,000.",
    options: [
      "Alt A: Agree with management to avoid conflict, spending ₹12,00,000.",
      "Alt B: Present a structured cost-benefit analysis showing SSDs achieve 25-second boot times at 5% of the replacement cost.",
      "Alt C: Do nothing and ask students to arrive 10 minutes early to turn on PCs."
    ],
    analysisSteps: [
      "Step 1 (Analyze Root Cause): The CPUs and RAM are sufficient; the bottleneck is disk I/O read speeds during Windows boot.",
      "Step 2 (Cost-Benefit Comparison): ₹60,000 (SSD upgrade) vs. ₹12,00,000 (new PCs). SSDs resolve 95% of boot lag.",
      "Step 3 (Stakeholder Presentation): Show benchmark test video on 1 upgraded PC to prove results before full rollout."
    ],
    recommendedChoice: "Option B: Present an evidence-based pilot proposal for SSD upgrades.",
    whyCorrect: "Delivers the required speed outcome, saves the institute ₹11,40,000, and uses an empirical pilot to win management trust.",
    distractorAnalysis: "Alt A wastes capital. Alt C punishes students for institutional technical debt."
  }
];

// ==========================================
// 5. PRACTICE SETS (A, B, C)
// ==========================================

export const practiceSetA = {
  id: "set_a",
  title: "Practice Set A: Decision Criteria & Weighted Matrix Math",
  subtitle: "Calculating Weighted Scores and Evaluating Trade-offs",
  timeLimitSeconds: 360, // 6 minutes
  questions: [
    {
      id: "ps_a1",
      question: "In a decision matrix, 'Cost' has an assigned weight of 2, and 'Effectiveness' has a weight of 3. Option X scores 4 on Cost and 2 on Effectiveness. What is Option X's weighted total score?",
      options: [
        "A) 12",
        "B) 14",
        "C) 16",
        "D) 20"
      ],
      correctAnswer: "B",
      explanation: "Weighted Total = (Cost Score × Weight) + (Effectiveness Score × Weight) = (4 × 2) + (2 × 3) = 8 + 6 = 14.",
      distractorNotes: "A is (4×3); C is (4+2)×something; D is arbitrary."
    },
    {
      id: "ps_a2",
      question: "Why do master problem solvers assign unequal weights to decision criteria instead of treating all criteria as equally important?",
      options: [
        "A) To ensure that mathematical calculations become more complicated",
        "B) Because core operational necessities (like safety and legality) are vastly more critical than cosmetic preferences",
        "C) To guarantee that the cheapest option always wins",
        "D) Because international standards require weights to always equal 100"
      ],
      correctAnswer: "B",
      explanation: "In the real world, criteria are not equal. Core criteria like legal compliance, user safety, and root cause resolution outweigh minor criteria like color or brand reputation.",
      distractorNotes: "A is cynical. C is false (cheapest option might be unsafe). D is a convention, not the logical reason."
    },
    {
      id: "ps_a3",
      question: "Option A and Option B have identical total scores in a decision matrix. Which tie-breaking rule is most logically sound?",
      options: [
        "A) Flip a coin to maintain impartiality",
        "B) Choose the option with the higher score in the highest-weighted criterion (e.g., Effectiveness)",
        "C) Choose the option proposed by the most senior manager",
        "D) Abandon both options and start over"
      ],
      correctAnswer: "B",
      explanation: "When overall weighted totals tie, compare scores on the highest-weighted priority criterion (such as Effectiveness or Safety) to break the tie logically.",
      distractorNotes: "A ignores data. C relies on authority bias. D wastes analytical work."
    },
    {
      id: "ps_a4",
      question: "What scale is standard and most effective for cell scoring in a decision matrix?",
      options: [
        "A) 1 to 5 (or 1 to 10) with clearly defined qualitative rubrics for each score",
        "B) Yes or No binary checkmarks only",
        "C) Arbitrary numbers between 1 and 1,000",
        "D) Letters from A to Z"
      ],
      correctAnswer: "A",
      explanation: "A standard 1-5 or 1-10 scale with clear descriptors (1 = Poor, 3 = Average, 5 = Excellent) enables nuanced, objective mathematical comparisons.",
      distractorNotes: "B cannot capture degrees of quality. C creates arbitrary noise. D cannot be multiplied mathematically."
    },
    {
      id: "ps_a5",
      question: "If an option scores 5 on Cost because it is completely free, but scores 1 on Effectiveness because it does not fix the problem, what should happen?",
      options: [
        "A) It should be selected immediately because saving money is the primary goal of any business",
        "B) It should be rejected because a solution that fails to solve the problem has zero true value",
        "C) Its effectiveness score should be manually adjusted to 5 to balance the matrix",
        "D) It should be combined with another free option"
      ],
      correctAnswer: "B",
      explanation: "A solution that does not solve the problem is worthless, no matter how inexpensive it is. Zero effectiveness means the problem remains.",
      distractorNotes: "A ignores the problem. C is academic dishonesty. D does not guarantee results."
    }
  ]
};

export const practiceSetB = {
  id: "set_b",
  title: "Practice Set B: Risk Evaluation, Trade-offs & Side Effects",
  subtitle: "Identifying Hidden Traps, Perverse Incentives, and Mitigation Strategies",
  timeLimitSeconds: 420, // 7 minutes
  questions: [
    {
      id: "ps_b1",
      question: "To reduce customer support wait times, a company sets a strict rule: 'Support reps must conclude every call within 3 minutes.' What unintended consequence is most likely to occur?",
      options: [
        "A) Customer satisfaction will reach 100% immediately",
        "B) Representatives will hang up on complex callers or give hasty, unhelpful answers to meet the timer quota",
        "C) Representatives will demand higher pay",
        "D) Phone lines will automatically disconnect due to electrical overload"
      ],
      correctAnswer: "B",
      explanation: "This is a classic 'perverse incentive' (Goodhart's Law). When a measure becomes a target, reps game the speed metric at the expense of solving the customer's actual issue.",
      distractorNotes: "A is unrealistic. C is unrelated to the operational flaw. D is a technical absurdity."
    },
    {
      id: "ps_b2",
      question: "What is an 'Opportunity Cost' in structured decision making?",
      options: [
        "A) The invoice fee paid to an external consultant",
        "B) The benefit or value given up from the next best alternative when you choose a specific course of action",
        "C) The penalty fee charged when a project misses its deadline",
        "D) The cost of purchasing software licenses on discount"
      ],
      correctAnswer: "B",
      explanation: "Opportunity cost is the lost benefit of alternative choices that cannot be pursued due to resource or time constraints.",
      distractorNotes: "A is direct expense. C is a late penalty. D is a procurement discount."
    },
    {
      id: "ps_b3",
      question: "A company decides to replace its existing database with a new high-speed system. What is a critical 'Secondary Risk' they must plan for?",
      options: [
        "A) The company might receive an unexpected tax refund",
        "B) Existing software modules and historical data might be incompatible with the new system, causing service outages",
        "C) Competitors will immediately lower their prices",
        "D) Employees will suddenly forget their office passwords"
      ],
      correctAnswer: "B",
      explanation: "A secondary risk is a new problem created by the solution itself—in this case, data migration failures and software integration bugs.",
      distractorNotes: "A is unrelated. C is an external market move. D is a trivial exaggeration."
    },
    {
      id: "ps_b4",
      question: "What is the primary purpose of defining a 'Fallback / Rollback Plan' before rolling out a major software or process change?",
      options: [
        "A) To encourage employees to give up at the first sign of difficulty",
        "B) To ensure the organization can quickly revert to the previous stable state if the new solution encounters a critical failure",
        "C) To satisfy bureaucratic regulatory paperwork without ever using it",
        "D) To double the project budget automatically"
      ],
      correctAnswer: "B",
      explanation: "A rollback plan ensures business continuity: if the new system experiences catastrophic errors upon launch, the team can revert safely without prolonged downtime.",
      distractorNotes: "A mischaracterizes caution as defeatism. C is cynical. D is false."
    },
    {
      id: "ps_b5",
      question: "An institute wants to increase student attendance by locking the classroom doors 5 minutes after class starts. Why is this a weak solution?",
      options: [
        "A) It fails to address why students are late (e.g. bus schedules) and denies late students access to education they paid for",
        "B) Door locks wear out quickly with frequent use",
        "C) Classroom doors should always be kept open for air ventilation",
        "D) It increases instructor workload by requiring keys"
      ],
      correctAnswer: "A",
      explanation: "Punitive locks treat a symptom while ignoring root causes (transit delays) and create a severe secondary risk (students missing lessons entirely).",
      distractorNotes: "B and C are minor physical concerns. D is trivial."
    }
  ]
};

export const practiceSetC = {
  id: "set_c",
  title: "Practice Set C: Solution Justification, Action Planning & KPIs",
  subtitle: "5W1H Execution Framework, Metric Baselines, and Post-Mortems",
  timeLimitSeconds: 480, // 8 minutes
  questions: [
    {
      id: "ps_c1",
      question: "Which of the following describes an actionable, complete milestone in an implementation plan?",
      options: [
        "A) 'Staff should work on the website when they find free time.'",
        "B) 'Web Developer Rajesh will deploy the mobile-responsive inquiry form on the live website by Friday, Nov 14 at 5:00 PM, and test with 5 sample submissions.'",
        "C) 'Make the portal better as soon as possible.'",
        "D) 'Hold a meeting to talk about website issues.'"
      ],
      correctAnswer: "B",
      explanation: "Option B specifies the owner (Rajesh), exact deliverable (mobile form), deadline (Nov 14, 5 PM), and acceptance test criteria (5 sample submissions).",
      distractorNotes: "A and C are vague with no deadlines. D is an activity, not a milestone."
    },
    {
      id: "ps_c2",
      question: "What is the difference between a 'Leading Indicator' and a 'Lagging Indicator' in performance tracking?",
      options: [
        "A) Leading indicators measure inputs or intermediate activities during execution; lagging indicators measure the final business outcome after time has elapsed",
        "B) Leading indicators are always financial; lagging indicators are always technical",
        "C) Leading indicators are measured once a year; lagging indicators are measured hourly",
        "D) There is no difference; they are interchangeable terms"
      ],
      correctAnswer: "A",
      explanation: "Leading indicators (e.g. callback response time within 2 hours) predict future success. Lagging indicators (e.g. monthly student admissions) confirm whether success was achieved.",
      distractorNotes: "B, C, and D are factually inaccurate definitions."
    },
    {
      id: "ps_c3",
      question: "What is the primary objective of conducting a 'Post-Implementation Review' (Post-Mortem) 30 days after rolling out a solution?",
      options: [
        "A) To assign personal blame and punish employees for mistakes",
        "B) To compare actual post-launch metrics against the original baseline, assess unexpected friction, and institutionalize lessons learned",
        "C) To cancel the project regardless of whether it succeeded",
        "D) To write a press release praising management"
      ],
      correctAnswer: "B",
      explanation: "Post-mortems objectively evaluate whether the intervention achieved its target KPIs, identify operational friction, and document lessons for future projects.",
      distractorNotes: "A creates toxic culture. C is irrational. D is marketing propaganda."
    },
    {
      id: "ps_c4",
      question: "When presenting a chosen solution to senior stakeholders who favor an alternative option, what is the best strategy?",
      options: [
        "A) Tell the stakeholders that their preferred idea is foolish",
        "B) Present the decision matrix showing transparent criteria, compare both options side-by-side on evidence, and explain the trade-offs",
        "C) Concede immediately without showing your data",
        "D) Threaten to resign if your choice is not approved"
      ],
      correctAnswer: "B",
      explanation: "Objective data, side-by-side matrix comparisons, and transparent trade-off analysis provide the most persuasive, professional defense.",
      distractorNotes: "A and D are confrontational and unprofessional. C abandons disciplined reasoning."
    },
    {
      id: "ps_c5",
      question: "What is a 'Vanity Metric' and why should it be avoided when evaluating problem-solving success?",
      options: [
        "A) A metric that looks impressive on the surface (e.g. total website page clicks) but does not correlate with true business or educational results (e.g. enrolled students)",
        "B) A metric that measures employee physical appearance",
        "C) A financial metric verified by chartered accountants",
        "D) A metric calculated exclusively in percentages"
      ],
      correctAnswer: "A",
      explanation: "Vanity metrics create an illusion of success without reflecting meaningful progress toward the core problem statement.",
      distractorNotes: "B is humorous. C and D misunderstand the concept."
    }
  ]
};

// ==========================================
// 6. REAL-WORLD CASE STUDY (PART 2)
// ==========================================

export const caseStudyData = {
  title: "Case Study: Modernizing the Institute's Enquiry Conversion Pipeline",
  subtitle: "Part 2: Multi-Criteria Decision, Risk Assessment & Execution Roadmap",
  context: "In Part 1, Alpha Fly Computer Education identified that out of 120 monthly inquiries, only 18 students enrolled (15% conversion rate). The root cause analysis revealed that counselors take an average of 46 hours to return inquiries, causing 54% of prospective students to enroll at competing institutes. The institute now faces 3 competing solution proposals.",
  alternativesEvaluated: [
    {
      id: "Sol1",
      name: "Proposal 1: 30% Fee Slash & Promotional Campaign",
      desc: "Reduce course fees from ₹15,000 to ₹10,500 and print 10,000 flyers.",
      cost: "₹18,000 upfront + ₹4,500 revenue loss per admitted student.",
      time: "5 days to launch.",
      expectedImpact: "May attract budget-conscious leads, but does not fix the 46-hour callback delay."
    },
    {
      id: "Sol2",
      name: "Proposal 2: Automated WhatsApp CRM & 2-Hour Response SLA",
      desc: "Set up automated WhatsApp greeting with course brochure PDF instantly upon inquiry, and implement a 2-hour counselor callback SLA with shared inbox tracking.",
      cost: "₹2,500/month software subscription.",
      time: "3 days to configure and train 2 counselors.",
      expectedImpact: "Directly cures the 46-hour lag; provides instant gratification to 100% of prospects."
    },
    {
      id: "Sol3",
      name: "Proposal 3: Hire 2 New Dedicated Admission Staff",
      desc: "Recruit two full-time counselors dedicated exclusively to phone calls.",
      cost: "₹35,000/month recurring salary.",
      time: "4 weeks to recruit and onboard.",
      expectedImpact: "Increases phone capacity, but severely violates the ₹3,000 monthly budget limit."
    }
  ],
  decisionMatrixTable: [
    { criterion: "Effectiveness at Curing Delay (Weight 3)", sol1: "2 (Score: 6)", sol2: "5 (Score: 15)", sol3: "4 (Score: 12)" },
    { criterion: "Budget Compliance (Weight 3)", sol1: "2 (Score: 6)", sol2: "5 (Score: 15)", sol3: "1 (Score: 3)" },
    { criterion: "Speed of Implementation (Weight 2)", sol1: "4 (Score: 8)", sol2: "5 (Score: 10)", sol3: "2 (Score: 4)" },
    { criterion: "Low Operational Risk (Weight 2)", sol1: "2 (Score: 4)", sol2: "4 (Score: 8)", sol3: "3 (Score: 6)" },
    { criterion: "WEIGHTED TOTAL SCORE", sol1: "24 / 50", sol2: "48 / 50", sol3: "25 / 50" }
  ],
  tasks: [
    {
      id: 1,
      prompt: "1. Based on the weighted decision matrix, which proposal is objectively superior, and by what margin?",
      hint: "Compare the weighted totals: Proposal 1 = 24, Proposal 2 = 48, Proposal 3 = 25."
    },
    {
      id: 2,
      prompt: "2. Why does Proposal 1 (Fee Slash) score poorly on Effectiveness even though discounts are popular?",
      hint: "Remember the root cause: 54% of lost leads joined competitors because of the 46-hour response delay, not fee resistance."
    },
    {
      id: 3,
      prompt: "3. Identify two secondary risks associated with Proposal 2 (WhatsApp CRM) and outline mitigations.",
      hint: "What if inquiries arrive outside working hours (e.g. 10 PM)? What if counselors ignore the dashboard?"
    },
    {
      id: 4,
      prompt: "4. Formulate a 5W1H milestone table for rolling out Proposal 2 over the next 14 days.",
      hint: "Define Who, What, When, and How for configuration, staff training, and go-live."
    },
    {
      id: 5,
      prompt: "5. Define two leading indicators and one lagging indicator to track over the next 60 days.",
      hint: "Leading: % inquiries messaged within 60 seconds; average callback hours. Lagging: Final monthly conversion %."
    }
  ],
  modelAnswer: {
    winningSolution: "Proposal 2: Automated WhatsApp CRM & 2-Hour Response SLA (Score: 48/50)",
    rationale: "Proposal 2 directly resolves the root cause (46-hour delay) by delivering instant brochures within 60 seconds and structuring callback accountability, all within the ₹3,000 monthly budget.",
    riskManagement: "Risk 1: Late-night inquiries. Mitigation: Configure an automated overnight reply setting expectations for 9:30 AM callback. Risk 2: Staff oversight. Mitigation: Daily 10-minute morning standup reviewing open inquiry tickets.",
    kpiScorecard: "Leading Indicator 1: 100% of inquiries receive automated brochure within 2 minutes. Leading Indicator 2: Average time to human phone call drops from 46 hours to <2 hours. Lagging Indicator: Inquiry conversion increases from 15% to 25%+ within 60 days."
  }
};

// ==========================================
// 7. COMMON MISTAKES AND STRATEGIES
// ==========================================

export const commonMistakes = [
  {
    mistake: "The Equal-Weighting Fallacy",
    whyItHappens: "Treating all evaluation criteria as equally important, giving cosmetic preferences the same mathematical power as safety, legality, or cost.",
    correction: "Always assign hierarchical weights (e.g. 3 = Critical, 2 = Important, 1 = Minor) before scoring options."
  },
  {
    mistake: "Overlooking Secondary Risks and Side Effects",
    whyItHappens: "Focusing solely on the immediate desired outcome while ignoring the friction, bugs, or resentment the change creates elsewhere.",
    correction: "Conduct a pre-mortem: Ask 'If this solution fails spectacularly in 6 months, what will have caused it?' and build safeguards in advance."
  },
  {
    mistake: "The Sunk Cost Fallacy",
    whyItHappens: "Continuing to pour money and effort into a failing solution simply because significant resources have already been spent on it.",
    correction: "Evaluate decisions based exclusively on future costs and future benefits; past unrecoverable investments cannot be retrieved."
  },
  {
    mistake: "Execution Without a Rollback Plan",
    whyItHappens: "Assuming that implementation will be 100% seamless and failing to create an emergency reversion plan if critical systems break.",
    correction: "Never deploy a permanent change without a tested rollback protocol and emergency standby processes."
  },
  {
    mistake: "Relying Exclusively on Vanity Metrics",
    whyItHappens: "Celebrating activity metrics (e.g. number of emails sent, app downloads) that give a false sense of accomplishment without moving the needle on the core problem.",
    correction: "Anchor all evaluations to the primary problem statement's quantitative KPI (e.g. net student enrollment, system uptime)."
  }
];

export const practicalChecklist = [
  "Have I evaluated alternatives against at least 4 distinct, weighted criteria in a matrix?",
  "Does the highest-scoring solution directly cure the verified root cause?",
  "Are all identified solutions strictly compliant with budget, time, and legal constraints?",
  "Have I identified potential secondary risks and created concrete mitigation steps?",
  "Is there a clear 5W1H action plan with explicit owners, non-negotiable dates, and milestones?",
  "Are both leading and lagging KPIs defined with a baseline and scheduled 30-day review?"
];

// ==========================================
// 8. FINAL ASSESSMENT (20 ADVANCED QUESTIONS)
// ==========================================

export const finalAssessmentQuestions = [
  // ------------------------------------------
  // EASY LEVEL (QUESTIONS 1 - 7)
  // ------------------------------------------
  {
    id: "fa_q1",
    level: "Easy",
    domain: "Decision Matrix Fundamentals",
    question: "What is the primary function of a weighted decision matrix in structured problem solving?",
    options: [
      "A) To ensure that everyone agrees with the boss's personal opinion",
      "B) To objectively compare multiple competing solutions against weighted criteria using standardized mathematical scoring",
      "C) To calculate employee monthly bonuses",
      "D) To eliminate the need for an implementation action plan"
    ],
    correctAnswer: "B",
    explanation: "A weighted decision matrix eliminates emotional bias and personal favoritism by scoring options mathematically against agreed-upon criteria.",
    distractorNotes: "A is sycophancy. C is payroll. D is false (implementation is still required)."
  },
  {
    id: "fa_q2",
    level: "Easy",
    domain: "Decision Criteria Weighting",
    question: "If a criterion has an assigned weight of 3 and an option scores 4 out of 5 on that criterion, what is its contribution to the weighted score?",
    options: [
      "A) 7",
      "B) 1",
      "C) 12",
      "D) 0.75"
    ],
    correctAnswer: "C",
    explanation: "Contribution = Score × Weight = 4 × 3 = 12.",
    distractorNotes: "A is 4+3; B is 4-3; D is 3/4."
  },
  {
    id: "fa_q3",
    level: "Easy",
    domain: "Risk Identification",
    question: "What is a 'Secondary Risk' in problem solving?",
    options: [
      "A) The risk that occurred prior to the problem starting",
      "B) A new risk or problem created as an unintended consequence of implementing the chosen solution",
      "C) A minor risk that can always be ignored",
      "D) A risk that only occurs on weekends"
    ],
    correctAnswer: "B",
    explanation: "Secondary risks are unintended side effects directly introduced by the intervention itself.",
    distractorNotes: "A is background context. C is dangerous neglect. D is nonsensical."
  },
  {
    id: "fa_q4",
    level: "Easy",
    domain: "Action Planning Basics",
    question: "In the 5W1H implementation framework, which question establishes personal accountability for a milestone?",
    options: [
      "A) When",
      "B) Where",
      "C) Who",
      "D) Why"
    ],
    correctAnswer: "C",
    explanation: "'Who' designates the single directly responsible individual (DRI) accountable for the milestone's completion.",
    distractorNotes: "When is deadline; Where is location; Why is business rationale."
  },
  {
    id: "fa_q5",
    level: "Easy",
    domain: "Performance Indicators",
    question: "Which of the following is an example of a 'Leading Indicator' when trying to improve student exam scores?",
    options: [
      "A) The final semester grade published 4 months later",
      "B) The weekly completion rate of practice coding exercises",
      "C) The number of years the institute has been open",
      "D) The temperature inside the examination hall"
    ],
    correctAnswer: "B",
    explanation: "Weekly practice completion is an ongoing input metric (leading indicator) that directly predicts future exam success.",
    distractorNotes: "A is a lagging indicator. C is institutional history. D is an environmental factor."
  },
  {
    id: "fa_q6",
    level: "Easy",
    domain: "Opportunity Cost",
    question: "What does 'Opportunity Cost' represent when choosing Solution A over Solution B?",
    options: [
      "A) The total cost of printing paper receipts",
      "B) The benefits, savings, or advantages you forfeit by not choosing Solution B",
      "C) A mandatory tax paid to the government",
      "D) The cost of advertising job openings"
    ],
    correctAnswer: "B",
    explanation: "Opportunity cost is the foregone benefit of the next best alternative that had to be abandoned.",
    distractorNotes: "A, C, and D describe direct operational expenses, not opportunity costs."
  },
  {
    id: "fa_q7",
    level: "Easy",
    domain: "Cognitive Traps",
    question: "What is the 'Sunk Cost Fallacy'?",
    options: [
      "A) Refusing to spend any money on necessary computer hardware",
      "B) Continuing an ineffective strategy solely because a substantial amount of time or money has already been spent on it",
      "C) Forgetting to record business expenses in an accounting ledger",
      "D) Buying equipment from an offshore supplier that ships by boat"
    ],
    correctAnswer: "B",
    explanation: "The sunk cost fallacy occurs when decision-makers justify ongoing bad investments using past, unrecoverable expenditures.",
    distractorNotes: "A is extreme frugality. C is bookkeeping failure. D is a literal pun on 'sunk'."
  },

  // ------------------------------------------
  // MEDIUM LEVEL (QUESTIONS 8 - 14)
  // ------------------------------------------
  {
    id: "fa_q8",
    level: "Medium",
    domain: "Decision Matrix Analysis",
    question: "A company evaluates two software tools. Tool A costs ₹5,000 and scores 3 on Effectiveness. Tool B costs ₹15,000 and scores 5 on Effectiveness. If 'Cost' has a weight of 1 and 'Effectiveness' has a weight of 3, how should the team decide?",
    options: [
      "A) Tool A must be chosen because saving ₹10,000 is always the top priority",
      "B) Calculate the weighted scores: Tool B's superior effectiveness multiplied by weight 3 may easily offset its cost penalty",
      "C) Tool B must be rejected immediately without math",
      "D) Buy both tools and let employees choose"
    ],
    correctAnswer: "B",
    explanation: "When effectiveness is weighted 3x higher than cost, higher-performing options frequently yield higher net weighted values that justify the price premium.",
    distractorNotes: "A and C make emotional snap judgments. D doubles expenses unnecessarily."
  },
  {
    id: "fa_q9",
    level: "Medium",
    domain: "Risk Mitigation Design",
    question: "An institute decides to switch from paper-based examinations to an online testing portal. What is the most effective risk mitigation strategy for potential server or Internet outages on exam day?",
    options: [
      "A) Warn students that if the Internet fails, they will all receive zero marks",
      "B) Pre-cache encrypted question papers on local lab servers and maintain a small batch of paper backup tests",
      "C) Cancel all exams permanently and evaluate students by verbal interview only",
      "D) Pray that the Internet provider does not experience downtime"
    ],
    correctAnswer: "B",
    explanation: "Local server caching and physical paper backups provide a concrete, tested rollback plan against connectivity failures.",
    distractorNotes: "A punishes victims. C abandons standard assessment. D relies on wishful thinking."
  },
  {
    id: "fa_q10",
    level: "Medium",
    domain: "Stakeholder Justification",
    question: "When presenting a project proposal to skeptical financial executives, which justification method is most persuasive?",
    options: [
      "A) Asserting that competitors are doing it, so we must follow them blindly",
      "B) Demonstrating how the proposed ₹5,000 monthly investment resolves a ₹40,000 monthly revenue leak with an empirical decision matrix and 60-day ROI model",
      "C) Complaining that the current work environment is intolerable without the tool",
      "D) Giving emotional guarantees that the solution cannot possibly fail"
    ],
    correctAnswer: "B",
    explanation: "Financial executives respond to quantitative trade-offs, documented revenue impact, and verifiable ROI calculations.",
    distractorNotes: "A is bandwagon fallacy. C is emotional whining. D is naive overpromising."
  },
  {
    id: "fa_q11",
    level: "Medium",
    domain: "Action Plan Milestones",
    question: "Why should an implementation plan include intermediate weekly milestones rather than just a single final completion deadline?",
    options: [
      "A) To create more paperwork for the management team",
      "B) To enable early detection of slippage, allowing corrective adjustments before the final deadline is irretrievably missed",
      "C) Because projects cannot legally launch without at least five meetings",
      "D) To prevent employees from completing their work too early"
    ],
    correctAnswer: "B",
    explanation: "Intermediate milestones act as early warning radars: if Milestone 1 slips by 3 days, managers can intervene immediately rather than discovering failure on the final deadline.",
    distractorNotes: "A, C, and D misunderstand the operational value of milestone checkpoints."
  },
  {
    id: "fa_q12",
    level: "Medium",
    domain: "Metric Selection",
    question: "A coding academy wants to evaluate whether its new Python mentoring program is working. Which pair of metrics provides the best balance of leading and lagging data?",
    options: [
      "A) Leading: Weekly code commits on GitHub; Lagging: Graduate placement percentage at 90 days",
      "B) Leading: Number of flyers distributed; Lagging: Color of the classroom chairs",
      "C) Leading: Total electricity consumed; Lagging: Average student age",
      "D) Leading: Number of coffee cups consumed; Lagging: Total lines of comments written"
    ],
    correctAnswer: "A",
    explanation: "Weekly code commits track active learning engagement (leading), while 90-day job placement proves career capability (lagging).",
    distractorNotes: "B, C, and D pair irrelevant, superficial, or unrelated metrics."
  },
  {
    id: "fa_q13",
    level: "Medium",
    domain: "Unintended Consequences",
    question: "A software firm mandates that developers are evaluated by the 'Total Lines of Code Written per Day.' What perverse incentive does this create?",
    options: [
      "A) Developers will write concise, highly optimized algorithms",
      "B) Developers will artificially bloat code with redundant loops and copy-paste syntax to inflate their metrics",
      "C) Developers will resign to become hardware engineers",
      "D) Bug reports will instantly drop to zero"
    ],
    correctAnswer: "B",
    explanation: "Measuring productivity by raw code volume incentivizes bloated, unmaintainable code rather than clean, efficient engineering.",
    distractorNotes: "A is the opposite of what occurs. C and D are inaccurate."
  },
  {
    id: "fa_q14",
    level: "Medium",
    domain: "Constraint Adherence",
    question: "An analyst builds a decision matrix where Option C receives the highest score. However, Option C requires ₹50,000 upfront, while the organization's hard budget limit is ₹15,000. What must happen?",
    options: [
      "A) Option C must still be selected because the math declared it the winner",
      "B) Option C must be disqualified or restructured because hard constraints are non-negotiable boundaries",
      "C) The analyst should forge the financial report to show ₹15,000",
      "D) The project should be canceled completely"
    ],
    correctAnswer: "B",
    explanation: "Constraints are non-negotiable filters. An option that violates a hard boundary (legal, budget, time) is disqualified regardless of matrix points.",
    distractorNotes: "A ignores reality. C is fraud. D is an overreaction when other viable options exist."
  },

  // ------------------------------------------
  // HARD LEVEL (QUESTIONS 15 - 20)
  // ------------------------------------------
  {
    id: "fa_q15",
    level: "Hard",
    domain: "Complex Decision Matrix Optimization",
    question: "A hospital needs to choose an electronic medical record system. Matrix scores are:\n• Vendor A: Cost=5, Reliability=2, Security=2 (Total=9)\n• Vendor B: Cost=2, Reliability=5, Security=5 (Total=12)\nWeights: Cost=1, Reliability=3, Security=4.\nWhat are the weighted totals and which vendor is the defensible choice?",
    options: [
      "A) Vendor A = 19; Vendor B = 37. Vendor B is the clear defensible choice.",
      "B) Vendor A = 35; Vendor B = 22. Vendor A is the clear choice.",
      "C) Both vendors tie at 25 points.",
      "D) Vendor A is better because healthcare facilities must conserve budget above all else."
    ],
    correctAnswer: "A",
    explanation: "Vendor A = (5×1) + (2×3) + (2×4) = 5 + 6 + 8 = 19. Vendor B = (2×1) + (5×3) + (5×4) = 2 + 15 + 20 = 37. In hospital systems, patient security and reliability vastly outweigh software savings.",
    distractorNotes: "B is bad arithmetic. C is incorrect. D violates clinical safety ethics."
  },
  {
    id: "fa_q16",
    level: "Hard",
    domain: "Perverse Incentive Analysis",
    question: "A tech institute notices instructors are passing 100% of students in internal exams to boost their 'Student Satisfaction Rating.' What systemic countermeasure best cures this perverse incentive?",
    options: [
      "A) Fire all instructors immediately",
      "B) Decouple satisfaction ratings from grades by introducing blind external grading and evaluating instructors on student project mastery and attendance retention",
      "C) Lower the passing mark to 20%",
      "D) Ban students from giving feedback on instructors"
    ],
    correctAnswer: "B",
    explanation: "Blind grading separates grade distribution from personal popularity, eliminating the temptation to inflate marks while preserving authentic evaluation.",
    distractorNotes: "A causes mass disruption. C worsens academic degradation. D destroys student voice."
  },
  {
    id: "fa_q17",
    level: "Hard",
    domain: "Trade-off & Opportunity Cost Synthesis",
    question: "An engineering department has a fixed budget of ₹1,00,000. Option 1: Buy 10 mid-range workstations (serves 30 students/day). Option 2: Buy 1 high-end AI GPU server (serves 5 advanced researchers/day). If the institute's strategic goal for the semester is 'Maximizing foundational employment skills for 150 undergraduate job seekers,' which decision is logically justifiable?",
    options: [
      "A) Option 2, because AI is more trendy in news headlines",
      "B) Option 1, because it directly serves the core strategic goal of mass undergraduate employability for 150 students, whereas Option 2 has high opportunity cost with low reach",
      "C) Split the money into ₹50,000 and buy half of a GPU",
      "D) Reject both options and leave the money in a savings account"
    ],
    correctAnswer: "B",
    explanation: "Decisions must align with stated strategic goals. Serving 150 job seekers requires mass computer terminal throughput (Option 1). Option 2 serves only 5 researchers, representing an unacceptable opportunity cost.",
    distractorNotes: "A succumbs to hype. C is physically impossible. D fails the institutional mission."
  },
  {
    id: "fa_q18",
    level: "Hard",
    domain: "Implementation Risk Mitigation",
    question: "During a major cloud server migration, the database sync process fails at 2:00 AM, 4 hours before business opening. What should the project lead do according to disciplined problem-solving protocol?",
    options: [
      "A) Keep trying random terminal commands until 8:00 AM hoping it works",
      "B) Trigger the pre-approved Rollback Protocol to restore the verified 1:00 AM snapshot, ensure operational continuity for morning users, and reschedule migration for root-cause diagnosis",
      "C) Send an emergency email blaming the cloud vendor and go to sleep",
      "D) Delete the database and start fresh"
    ],
    correctAnswer: "B",
    explanation: "A disciplined team respects the 'Drop-Dead Time': when troubleshooting exceeds the safety window, trigger the rollback to protect users and diagnose offline.",
    distractorNotes: "A risks opening-time disaster. C abandons responsibility. D causes catastrophic permanent data loss."
  },
  {
    id: "fa_q19",
    level: "Hard",
    domain: "Evaluating Competing Explanations",
    question: "A company launches a new UI design and sales drop by 15% in Week 1. The designer argues: 'Users just need time to get used to the new aesthetic.' The analytics lead argues: 'The checkout button was moved below the mobile screen fold, reducing mobile click-through by 60%.' How should leadership decide?",
    options: [
      "A) Side with the designer because aesthetic vision is subjective and cannot be questioned",
      "B) Rely on the analytics lead's empirical data: test moving the checkout button back above the fold immediately to verify the causal link",
      "C) Wait 6 months to see if users adapt to the lower checkout button",
      "D) Revert the entire website to its 2015 design"
    ],
    correctAnswer: "B",
    explanation: "Empirical event-tracking data (60% drop in mobile checkout button clicks) pinpointing a mechanical obstacle always overrides speculative assertions of 'user adaptation.'",
    distractorNotes: "A relies on vanity opinion. C tolerates ongoing 15% revenue bleed. D is an extreme overreaction."
  },
  {
    id: "fa_q20",
    level: "Hard",
    domain: "Holistic Problem Solving Synthesis",
    question: "Which sequence correctly captures the complete, disciplined lifecycle of Structured Problem Solving?",
    options: [
      "A) Brainstorm Ideas → Choose the Cheapest → Implement Immediately → Blame Staff if it Fails",
      "B) Define Measurable Problem → Decompose & Isolate Root Bottleneck → Generate Alternatives → Evaluate in Weighted Matrix with Risk Analysis → Execute with 5W1H Plan → Monitor Pre/Post KPIs & Review",
      "C) Formulate Problem → Ask Manager's Opinion → Follow Manager's Direction → Archive Project",
      "D) Score in Decision Matrix → Define the Problem Afterwards → Launch without KPIs"
    ],
    correctAnswer: "B",
    explanation: "Option B reflects the comprehensive, end-to-end disciplined lifecycle: Define → Decompose → Generate → Evaluate & Mitigate → Plan & Execute → Measure & Iterate.",
    distractorNotes: "A and C represent undisciplined shortcuts. D is backwards."
  }
];

// ==========================================
// 9. REVISION & EXECUTION CHEAT SHEET
// ==========================================

export const revisionCheatSheet = {
  title: "Day 11 Revision: Evaluation, Decision & Execution Cheat Sheet",
  corePrinciples: [
    { title: "Weighted Decision Matrix", desc: "Total = Σ(Score × Weight). Standardize scores 1-5. Weight core priorities higher than cosmetic perks." },
    { title: "Secondary Risk Identification", desc: "Always ask: 'What new problem does this solution create?' Build mitigations before launch." },
    { title: "Opportunity Cost Awareness", desc: "Every rupee or hour committed to Option A is a rupee or hour stolen from Option B." },
    { title: "5W1H Execution Framework", desc: "Every task must have an explicit Who, What, When, Where, Why, and How. No shared ownership." },
    { title: "Leading vs Lagging Metrics", desc: "Track leading indicators daily to catch slips; evaluate lagging indicators at 30/60 days to verify true ROI." },
    { title: "Rollback Readiness", desc: "Never deploy a permanent systemic change without a tested fallback protocol." }
  ],
  decisionChecklist: [
    "1. Did we evaluate options using transparent mathematical criteria rather than gut feel?",
    "2. Have we checked all hard budget, time, and skill constraints?",
    "3. Are secondary risks and potential unintended consequences documented with mitigations?",
    "4. Is there an actionable implementation plan with designated individual owners and deadlines?",
    "5. Are quantitative leading and lagging KPIs established against baseline data?",
    "6. Is a 30-day post-mortem review scheduled to audit results?"
  ]
};
