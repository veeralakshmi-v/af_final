// ==========================================
// ALPHA FLY LOGICAL REASONING - LEVEL 2 (INTERMEDIATE)
// DAY 10: STRUCTURED PROBLEM SOLVING (PART 1)
// Define, Decompose, and Generate Alternatives
// ==========================================

export const day10Overview = {
  courseName: "Logical Reasoning",
  level: "Level 2 – Intermediate",
  dayNumber: 10,
  title: "Structured Problem Solving (Part 1)",
  subtitle: "Problem Definition, Decomposition, and Generating Solutions",
  targetAudience: "School and college students, job seekers, placement candidates, and working professionals.",
  language: "Simple English",
  difficulty: "Intermediate",
  estimatedMinutes: 55,
  description: "Master the foundation of structured problem solving: learn how to formulate airtight problem statements, separate symptoms from root issues, decompose complex roadblocks with MECE issue trees, identify hidden constraints, and generate diverse creative alternatives.",
  learningObjectives: [
    "Formulate precise, measurable problem statements and distinguish them from surface symptoms.",
    "Break monolithic, complex problems into manageable branches using MECE problem decomposition trees.",
    "Identify known facts, missing information, assumptions, and non-negotiable boundaries.",
    "Apply divergent thinking techniques to generate multiple distinct alternatives instead of anchoring to the first idea.",
    "Differentiate short-term emergency containment fixes from long-term systemic structural solutions.",
    "Apply structured problem-framing methods to academic, technical, and business scenarios."
  ]
};

// ==========================================
// 2. LESSON INTRODUCTION & DIAGNOSTIC SCENARIO
// ==========================================

export const lessonIntro = {
  title: "Why Structured Problem Framing Matters",
  importancePoints: [
    "Aptitude & Technical Interviews: Top employers test how candidates frame open-ended problems, dissect ambiguity, and isolate root causes rather than just jumping to hasty conclusions.",
    "Software & Technical Troubleshooting: Prevents rushing into random code patches that cause regressions; enforces disciplined root bottleneck isolation.",
    "Academic Excellence & Projects: Helps students manage complex engineering dissertations, balance tight deadlines, and troubleshoot lab failures methodically.",
    "Workplace & Business Decision-Making: Prevents expensive capital loss caused by treating symptoms with cosmetic 'band-aids' while operational bottlenecks persist."
  ],
  starterScenario: {
    title: "Starter Scenario: The Computer Training Institute Dilemma",
    context: "Alpha Fly Computer Education, an established technical training institute, launched a specialized programming curriculum. Over the last month, the institute received 100 prospective student enquiries, but converted only 15 into confirmed admissions (a 15% conversion rate).",
    initialUrge: "The marketing executive immediately proposed: 'Our course fees must be too high! Let us immediately cut fees by 30% and offer a seasonal promotional discount.'",
    whyUrgeIsDangerous: "Immediately choosing a solution without defining the exact problem, gathering facts, and analyzing root causes wastes money, erodes margins, and fails if the real bottleneck is slow enquiry callback times or unclear syllabus documentation.",
    diagnosticQuestions: [
      {
        question: "What exactly is the problem?",
        answer: "The institute converts only 15% of inbound enquiries (15 out of 100), leaving 85 interested prospects un-enrolled without clear documented causes."
      },
      {
        question: "What additional information is required?",
        answer: "Enquiry channel breakdown (walk-in vs website vs phone), counselor callback response times, student exit feedback, batch schedule availability, and syllabus clarity."
      },
      {
        question: "What are possible underlying reasons?",
        answer: "Delayed staff callbacks (>48 hrs), inconvenient weekend batch timings, lack of hands-on project details in brochures, or unverified fee resistance."
      },
      {
        question: "What alternative solutions could be considered?",
        answer: "1) Institute a 2-hour callback SLA; 2) Introduce flexible weekend evening batches; 3) Provide transparent syllabus preview videos; 4) Offer split installment payment options."
      }
    ]
  },
  cycleSteps: [
    { step: 1, title: "Define the Problem", desc: "Express the issue with specific, measurable data. Distinguish symptoms from root issues." },
    { step: 2, title: "Gather Information", desc: "Collect hard evidence, logs, and stakeholder feedback; separate verified facts from guesswork." },
    { step: 3, title: "Identify Causes & Constraints", desc: "Decompose the problem, uncover bottlenecks, and document budget, time, and skill limits." },
    { step: 4, title: "Generate Alternatives", desc: "Brainstorm multiple viable solutions; create short-term containment and long-term systemic fixes." }
  ]
};

// ==========================================
// 3. CORE CONCEPTS (4 IN-DEPTH MODULES)
// ==========================================

export const coreConcepts = {
  concept1: {
    id: "concept1",
    title: "Concept 1: Define the Problem Clearly",
    subtitle: "Separating Vague Complaints from Actionable Problem Statements",
    theory: "A problem cannot be solved effectively until it is articulated in precise, observable, and measurable terms. Vague definitions lead to unfocused discussions, misallocated budgets, and ineffective remedies.",
    comparisonTable: [
      {
        element: "Vague Statement",
        characteristics: "Emotional, subjective, lacks metrics, blames people, offers no baseline.",
        example: "'Our admissions are poor and the marketing team isn't doing their job.'"
      },
      {
        element: "Symptom",
        characteristics: "The observable outward effect of an underlying defect.",
        example: "'Only 15 out of 100 student enquiries enrolled this month.'"
      },
      {
        element: "Underlying Cause",
        characteristics: "The root procedural, technical, or systemic flaw causing the symptom.",
        example: "'Counselors take an average of 54 hours to return enquiry calls, by which time students have enrolled elsewhere.'"
      },
      {
        element: "Clear Problem Statement",
        characteristics: "Quantifiable, time-bounded, objective, specifies who/what/where, establishes target.",
        example: "'Alpha Fly received 100 enquiries in October but converted only 15 (15%), versus our target of 30%. We must diagnose conversion drop-off points across the enquiry pipeline and increase conversion to 25%+ within 60 days without exceeding the ₹3,000 monthly follow-up budget.'"
      },
      {
        element: "Desired Outcome",
        characteristics: "Specific measurable end state that defines success.",
        example: "'Achieve an enquiry-to-admission conversion rate of ≥ 25% with response times under 2 hours.'"
      }
    ],
    fiveWsFramework: [
      { question: "What is happening?", answer: "Enquiries are dropping out before enrollment (85% abandonment rate)." },
      { question: "Where is it happening?", answer: "At the initial enquiry callback and course counseling stage." },
      { question: "When does it occur?", answer: "Observed during October admissions across weekday daytime calls." },
      { question: "Who or what is affected?", answer: "Prospective students, admission counselors, and batch seat utilization." },
      { question: "What outcome is expected?", answer: "Conversion increases from 15% to 25%+ within two enrollment cycles." },
      { question: "What constraints must be respected?", answer: "Maximum monthly budget of ₹3,000 and 2 available counseling staff." }
    ],
    threeDomainsExamples: [
      {
        domain: "Education / Training Institute",
        vague: "Students don't pay attention in computer lab sessions.",
        clear: "In Batch A (Python Programming), 14 out of 30 students fail to complete the weekly lab exercises within the allotted 90-minute period because instructions lack step-by-step terminal examples."
      },
      {
        domain: "Academics / College Coursework",
        vague: "Our final year team is terrible at project management.",
        clear: "The 4-member final-year team has completed only 1 of 5 milestones with 3 weeks remaining until final evaluation because tasks were not divided with explicit ownership or delivery dates."
      },
      {
        domain: "Software / Technical Systems",
        vague: "The website is too slow and buggy.",
        clear: "The student result lookup API endpoint has an average latency of 4.8 seconds during peak hours (10:00–12:00 AM) due to unindexed database queries, causing 18% of requests to time out."
      }
    ]
  },

  concept2: {
    id: "concept2",
    title: "Concept 2: Break a Complex Problem into Smaller Parts",
    subtitle: "Problem Decomposition and Hierarchical Issue Trees",
    theory: "Large problems often feel overwhelming because multiple issues interlock. Problem decomposition breaks a monolithic problem into mutually exclusive, collectively exhaustive (MECE) sub-components, allowing problem-solvers to isolate the exact bottleneck.",
    decompositionTypes: [
      {
        name: "Component-Based (Functional) Decomposition",
        description: "Breaks a physical product or software system into its architectural modules (e.g. Frontend UI, Backend API, Database, Network).",
        useCase: "Debugging technical crashes, hardware troubleshooting, industrial machine maintenance."
      },
      {
        name: "Process-Based (Sequential) Decomposition",
        description: "Breaks an end-to-end user journey into sequential chronologic stages (e.g. Awareness → Enquiry → Callback → Counseling → Admission).",
        useCase: "Operational bottlenecks, customer churn, service delivery delays."
      },
      {
        name: "Hypothesis-Driven (Deductive) Decomposition",
        description: "Branches potential root causes into testable logical trees (e.g. Is low revenue caused by Price Too High OR Volume Too Low?).",
        useCase: "Strategic business decisions, management consulting, root cause analysis."
      }
    ],
    workedTree: {
      title: "Hierarchical Issue Tree: Diagnosing Low Student Admission Conversion (15%)",
      root: "Low Enquiry-to-Admission Conversion (15%)",
      branches: [
        {
          name: "1. Lead Quality & Relevance (Are the wrong prospects reaching us?)",
          subBranches: [
            "Are enquiries looking for courses we don't teach (e.g. CAD instead of Python)?",
            "Are prospects outside our geographic travel radius?"
          ]
        },
        {
          name: "2. Responsiveness & Communication (Are we reaching them too late?)",
          subBranches: [
            "Average callback response time exceeds 48 hours (industry benchmark < 2 hours).",
            "Lack of instant automated WhatsApp confirmation upon enquiry."
          ]
        },
        {
          name: "3. Value Proposition & Offering (Is the offer unattractive?)",
          subBranches: [
            "Batch schedules conflict with student college hours (e.g. no evening batches).",
            "Course fees require full lump-sum payment rather than split installments.",
            "Syllabus lacks transparent hands-on project details compared to competitors."
          ]
        }
      ]
    }
  },

  concept3: {
    id: "concept3",
    title: "Concept 3: Gather Information and Identify Constraints",
    subtitle: "Separating Empirical Facts from Speculative Assumptions",
    theory: "Making decisions on assumptions is the primary reason problem-solving fails. Master analysts systematically list what is known, what is missing, and what constraints box in the viable solution space.",
    informationCategories: [
      {
        category: "Known Facts",
        desc: "Empirically verified data backed by logs, receipts, records, or direct measurements.",
        example: "'The institute received exactly 100 online enquiries and enrolled 15 students in October.'"
      },
      {
        category: "Missing Information",
        desc: "Critical questions that must be investigated before committing resources.",
        example: "'Why did the other 85 enquiries decline? Did they join competitors, or was the timing inconvenient?'"
      },
      {
        category: "Unverified Assumptions",
        desc: "Beliefs accepted as true without sufficient verification (the most dangerous pitfall).",
        example: "'Students didn't enroll because our fees are too expensive.'"
      },
      {
        category: "Hard Constraints",
        desc: "Non-negotiable boundaries that eliminate non-viable solutions immediately.",
        example: "'The monthly marketing budget cannot exceed ₹3,000, and only 2 staff members are available.'"
      }
    ]
  },

  concept4: {
    id: "concept4",
    title: "Concept 4: Generate Multiple Alternatives",
    subtitle: "Divergent Thinking Before Convergent Selection",
    theory: "The human mind naturally anchors to the first plausible solution it conceives. Structured problem-solving forces divergent thinking: generating at least 3 to 5 distinct approaches across short-term containment and long-term systemic improvement.",
    generationTechniques: [
      { name: "Brainstorming without Premature Evaluation", desc: "List all potential ideas without immediately criticizing or discarding them." },
      { name: "Problem Slicing", desc: "Design specific targeted interventions for each sub-branch of the problem tree." },
      { name: "Benchmarking & Past Analogies", desc: "Examine how similar organizations, departments, or software teams resolved identical bottlenecks." },
      { name: "Short-Term vs. Long-Term Pairing", desc: "Pair an immediate quick-fix (to contain losses) with a durable systemic overhaul (to prevent recurrence)." },
      { name: "Constraint Inversion", desc: "Ask: 'What if we could not spend any money at all?' or 'What if we had to fix this in 48 hours?' to spark creative efficiency." }
    ],
    workedExampleAlternatives: {
      problem: "Students frequently miss project submission deadlines in a coding bootcamp.",
      alternatives: [
        { id: "A1", name: "Automated SMS / WhatsApp Deadline Reminders", type: "Short-Term Containment", desc: "Send automated alerts 48h, 24h, and 2h before the submission portal closes." },
        { id: "A2", name: "Milestone-Based Chunking", type: "Process Restructuring", desc: "Break the 4-week project into 4 mandatory weekly sub-milestones with micro-deadlines." },
        { id: "A3", name: "Peer Accountability Pods", type: "Behavioral / Social", desc: "Pair students into 3-person review pods that review code every Wednesday." },
        { id: "A4", name: "Time-Management & Scoping Workshop", type: "Skill Building", desc: "Conduct a 2-hour mandatory session on project scope estimation and GitHub project boards." }
      ]
    }
  }
};

// ==========================================
// 4. SOLVED MASTER EXAMPLES (4 WORKED EXAMPLES)
// ==========================================

export const workedExamples = [
  {
    id: "ex1",
    title: "Example 1: Improving Student Examination Results",
    domain: "Academic Performance",
    problemStatement: "In a college Data Structures class of 60 students, 24 students (40%) failed the midterm exam, threatening their semester graduation.",
    factsAndConstraints: "Known facts: 40% failure rate; classes are held 8 AM Mondays; lab exercises were theoretical. Constraints: Semester ends in 6 weeks; no additional tuition fees can be charged.",
    missingInfo: "Which specific topics had the highest error rate (Recursion vs Pointers vs Trees)? Was attendance correlated with exam failure?",
    possibleCauses: "1) 8 AM Monday timing leads to 35% absenteeism; 2) Lack of interactive visual debugging in labs; 3) Students memorized syntax without writing code.",
    alternatives: [
      "Alt A: Conduct 2-hour Saturday visual coding bootcamps on Pointers & Trees.",
      "Alt B: Replace paper homework with automated autograded code submissions.",
      "Alt C: Provide peer study groups with senior teaching assistants."
    ],
    decisionCriteria: "Addresses root cause of theoretical gap; respects 6-week constraint.",
    recommendedSolution: "Combine Alt A (Saturday visual coding clinics) and Alt B (autograded code assignments).",
    whyCorrect: "Addresses the verified root cause (lack of hands-on code execution) within the 6-week timeframe without additional budget.",
    distractorAnalysis: "Lowering pass marks compromises academic integrity; lecturing faster covers syllabus but does not improve understanding."
  },
  {
    id: "ex2",
    title: "Example 2: Completing a College Project Before its Deadline",
    domain: "Project Management",
    problemStatement: "A 4-person student team must submit a working Web Application in 14 days, but has only completed the basic login page (estimated 20% progress).",
    factsAndConstraints: "14 days remaining; 4 developers; frontend and backend unlinked; team members study full-time.",
    missingInfo: "Which team member has the strongest skills in API integration? What is the minimum viable product (MVP) scope required to pass?",
    possibleCauses: "Scope creep; lack of clear task ownership; team members waiting for each other.",
    alternatives: [
      "Alt A: Request a 2-week extension from the university professor.",
      "Alt B: Decompose the remaining 80% into an MVP feature list and assign dedicated modules with daily 15-minute syncs.",
      "Alt C: Pay an external freelancer to complete the code."
    ],
    decisionCriteria: "Feasibility within 14 days, academic integrity, team learning.",
    recommendedSolution: "Option B: Cut non-essential features, establish an MVP backlog, and assign explicit daily tasks.",
    whyCorrect: "Respects academic honesty, operates within existing team capacity, and eliminates bottleneck dependencies.",
    distractorAnalysis: "Alt A is risky (professors frequently reject extensions); Alt C constitutes academic misconduct."
  },
  {
    id: "ex3",
    title: "Example 3: Troubleshooting a Computer that Runs Slowly",
    domain: "Technical & IT Support",
    problemStatement: "A lab computer running Windows 11 takes 7 minutes to boot and freezes when opening Chrome and VS Code simultaneously.",
    factsAndConstraints: "8GB RAM; 5400 RPM mechanical HDD; CPU utilization at 15%; disk usage at 100% continuously.",
    missingInfo: "Which specific processes are consuming disk read/write bandwidth? How much free disk space remains?",
    possibleCauses: "Mechanical HDD read bottleneck; Windows Search indexing corrupt loop; background malware.",
    alternatives: [
      "Alt A: Reinstall the entire operating system from scratch.",
      "Alt B: Replace the 5400 RPM mechanical HDD with an inexpensive 256GB SSD (₹1,200).",
      "Alt C: Add 16GB more RAM."
    ],
    decisionCriteria: "Cost, effectiveness at curing 100% disk bottleneck, time to fix.",
    recommendedSolution: "Option B: Clone the system onto a 256GB SSD.",
    whyCorrect: "The CPU is idle (15%) and RAM is not full; the 100% active disk time proves the mechanical hard drive is the physical bottleneck.",
    distractorAnalysis: "Adding RAM (Alt C) wastes money because RAM is not exhausted. Reinstalling OS (Alt A) only provides temporary relief until disk fragmentation returns."
  },
  {
    id: "ex4",
    title: "Example 4: Selecting Software for a Small Business",
    domain: "Business Technology",
    problemStatement: "A training center with 5 instructors tracks student attendance and fee receipts using disparate paper notebooks, causing lost receipts and delayed billing.",
    factsAndConstraints: "Budget: ₹1,500/month maximum; instructors have basic smartphone skills; needs offline capability.",
    missingInfo: "Do all 5 instructors possess Android smartphones? How many active students are enrolled across batches?",
    possibleCauses: "Lack of centralized database; manual duplicate entry; fear of complicated enterprise software.",
    alternatives: [
      "Alt A: Hire an agency to build a custom enterprise ERP platform for ₹2,50,000.",
      "Alt B: Implement a cloud-based mobile attendance & billing app designed for small coaching institutes (₹999/month).",
      "Alt C: Create a shared Google Sheet and train staff on mobile entry (Free)."
    ],
    decisionCriteria: "Cost, ease of use for instructors, automated receipt generation.",
    recommendedSolution: "Option B: A specialized coaching management mobile app.",
    whyCorrect: "Respects the ₹1,500/month budget, provides instant WhatsApp receipts, and requires minimal staff training.",
    distractorAnalysis: "Alt A violates budget by 160x. Alt C is free but lacks automated receipt generation and SMS notifications."
  }
];

// ==========================================
// 5. PRACTICE SETS (A, B, C)
// ==========================================

export const practiceSetA = {
  id: "set_a",
  title: "Practice Set A: Problem Definition & Symptoms vs Causes",
  subtitle: "Formulating Objective Problem Statements and Separating Root Causes",
  timeLimitSeconds: 300, // 5 minutes
  questions: [
    {
      id: "ps_a1",
      question: "Which of the following represents an objective, actionable PROBLEM STATEMENT rather than a vague complaint?",
      options: [
        "A) 'Our customer service is awful and customers are angry.'",
        "B) 'Customer call hold times averaged 14 minutes in October (vs target of 3 mins), resulting in a 28% call abandonment rate.'",
        "C) 'The support team needs to work much harder every day.'",
        "D) 'We need to buy new call center headphones immediately.'"
      ],
      correctAnswer: "B",
      explanation: "Option B is quantifiable (14 min hold, 28% abandonment), time-bounded (October), compares baseline to target (3 mins), and is completely objective.",
      distractorNotes: "A is emotional. C blames staff without evidence. D is a premature solution."
    },
    {
      id: "ps_a2",
      question: "A computer institute manager observes: 'Student attendance in the 6:00 PM Python batch dropped by 40%.' What is this observation?",
      options: [
        "A) A verified root cause",
        "B) An observable surface symptom of an underlying defect",
        "C) An unverified assumption",
        "D) A permanent constraint"
      ],
      correctAnswer: "B",
      explanation: "A 40% drop in attendance is the measurable outward symptom. The root cause could be traffic, instructor clarity, or syllabus difficulty.",
      distractorNotes: "A is incorrect because attendance drop does not explain WHY. C is false because it is measured data. D is false."
    },
    {
      id: "ps_a3",
      question: "Why is it dangerous to immediately propose a solution as soon as a problem is reported?",
      options: [
        "A) Because solving problems quickly is illegal in business",
        "B) Because rushing to a solution usually treats surface symptoms while leaving root causes untouched, causing the problem to recur",
        "C) Because solutions should only ever be proposed by external consultants",
        "D) Because computers cannot process solutions proposed in the first week"
      ],
      correctAnswer: "B",
      explanation: "Premature problem solving treats outward symptoms (like taking an aspirin for chronic dehydration) rather than addressing the root flaw.",
      distractorNotes: "A is absurd. C and D are completely incorrect."
    },
    {
      id: "ps_a4",
      question: "Which question in the 5Ws framework establishes the geographical or operational location of a defect?",
      options: [
        "A) What",
        "B) Where",
        "C) Who",
        "D) When"
      ],
      correctAnswer: "B",
      explanation: "'Where' pinpoints the physical or digital location (e.g. at the payment gateway API, in the second-floor laboratory).",
      distractorNotes: "What defines the defect; Who identifies stakeholders; When specifies timing."
    },
    {
      id: "ps_a5",
      question: "What is the primary difference between a 'Problem Statement' and a 'Desired Outcome'?",
      options: [
        "A) A problem statement describes the current defective gap; a desired outcome defines the specific measurable target state upon resolution",
        "B) A problem statement is written by students; a desired outcome is written by teachers",
        "C) There is no difference; they are exact synonyms",
        "D) A problem statement must always include financial figures, while a desired outcome never does"
      ],
      correctAnswer: "A",
      explanation: "The problem statement defines the current reality and baseline (where we are); the desired outcome defines success (where we need to be).",
      distractorNotes: "B, C, and D are factually untrue."
    }
  ]
};

export const practiceSetB = {
  id: "set_b",
  title: "Practice Set B: Problem Decomposition & Logic Trees",
  subtitle: "Applying MECE Principles and Isolating Systemic Bottlenecks",
  timeLimitSeconds: 360, // 6 minutes
  questions: [
    {
      id: "ps_b1",
      question: "What does the consulting acronym 'MECE' stand for in problem decomposition?",
      options: [
        "A) Most Effective Cost Estimation",
        "B) Mutually Exclusive, Collectively Exhaustive",
        "C) Multiple Entities Creating Errors",
        "D) Mandatory Evaluation of Customer Experience"
      ],
      correctAnswer: "B",
      explanation: "MECE ensures that sub-branches do not overlap with one another (Mutually Exclusive) and cover every possible dimension of the problem (Collectively Exhaustive).",
      distractorNotes: "A, C, and D are fabricated acronyms."
    },
    {
      id: "ps_b2",
      question: "When decomposing the problem 'Low E-commerce Sales' into two MECE branches, which pair is logically sound?",
      options: [
        "A) 'Low Website Traffic' OR 'Low Conversion Rate of Existing Traffic'",
        "B) 'Bad Website Colors' OR 'Poor Marketing Staff'",
        "C) 'Expensive Products' OR 'Customer Complaints on Twitter'",
        "D) 'Monday Sales' OR 'Rainy Day Sales'"
      ],
      correctAnswer: "A",
      explanation: "Total Sales = Traffic × Conversion Rate. These two categories do not overlap and together explain 100% of e-commerce revenue.",
      distractorNotes: "B and C are arbitrary sub-factors. D is non-exhaustive."
    },
    {
      id: "ps_b3",
      question: "Which type of problem decomposition breaks an issue down according to the chronological steps a user experiences?",
      options: [
        "A) Component-based decomposition",
        "B) Process-based (sequential) decomposition",
        "C) Cost-based decomposition",
        "D) Geographic decomposition"
      ],
      correctAnswer: "B",
      explanation: "Process-based decomposition tracks stages sequentially (e.g. Inquiry → Booking → Attendance → Feedback) to locate where users drop off.",
      distractorNotes: "Component-based analyzes architecture; Cost analyzes financial ledgers; Geographic analyzes map zones."
    },
    {
      id: "ps_b4",
      question: "In an issue tree, what is the advantage of disproving a major branch early with empirical data?",
      options: [
        "A) It allows the team to terminate the project immediately",
        "B) It instantly eliminates 50% of the possible search space, focusing analytical resources on the remaining suspect branches",
        "C) It proves that the manager was wrong",
        "D) It increases the project budget"
      ],
      correctAnswer: "B",
      explanation: "Eliminating an entire branch (e.g. proving that server hardware is 100% healthy) eliminates hardware troubleshooting and focuses effort on software or network logic.",
      distractorNotes: "A, C, and D are incorrect interpretations."
    },
    {
      id: "ps_b5",
      question: "If a software bug only occurs when users click 'Submit' on iOS devices running Safari, how does decomposition help?",
      options: [
        "A) It isolates the fault to the Safari WebKit JavaScript event handler rather than the backend database",
        "B) It proves that all Apple devices are defective",
        "C) It allows developers to ignore Safari users completely",
        "D) It requires rewriting the database from scratch"
      ],
      correctAnswer: "A",
      explanation: "Decomposing by client platform isolates the issue to Safari-specific browser rendering or touch event handling, saving the backend team from wasted audits.",
      distractorNotes: "B is unreasonable. C loses customers. D is an extreme, unneeded overreaction."
    }
  ]
};

export const practiceSetC = {
  id: "set_c",
  title: "Practice Set C: Constraints & Alternative Generation",
  subtitle: "Identifying Hidden Boundaries and Sparking Divergent Thinking",
  timeLimitSeconds: 420, // 7 minutes
  questions: [
    {
      id: "ps_c1",
      question: "What is the primary difference between a 'Short-Term Containment Action' and a 'Long-Term Systemic Solution'?",
      options: [
        "A) Containment stops the bleeding immediately while buying time; systemic solution cures the root mechanism so it never recurs",
        "B) Containment is always free, while systemic solutions always cost millions",
        "C) Containment is performed by junior staff; systemic solutions are done by executives",
        "D) There is no difference; both solve the problem permanently"
      ],
      correctAnswer: "A",
      explanation: "Containment is like putting a bucket under a leaking pipe; the systemic solution replaces the rusted pipe.",
      distractorNotes: "B, C, and D misrepresent the operational definitions."
    },
    {
      id: "ps_c2",
      question: "Which of the following is a 'Hard Constraint' when planning a 3-week student workshop?",
      options: [
        "A) The workshop must end before semester final exams begin on Dec 1st",
        "B) The instructor prefers blue whiteboard markers over black",
        "C) Some students might want free snacks",
        "D) The classroom could look more modern"
      ],
      correctAnswer: "A",
      explanation: "A hard constraint is an unyielding, non-negotiable boundary (such as fixed university exam dates).",
      distractorNotes: "B, C, and D are soft preferences or optional desires."
    },
    {
      id: "ps_c3",
      question: "What is the cognitive danger of 'Anchoring Bias' during alternative generation?",
      options: [
        "A) Forgetting to save files on a computer",
        "B) Becoming mentally fixated on the very first idea mentioned and judging all subsequent ideas against it rather than exploring diverse options",
        "C) Refusing to use software tools",
        "D) Drawing diagrams on paper"
      ],
      correctAnswer: "B",
      explanation: "Anchoring bias traps decision makers into evaluating variations of idea #1 rather than brainstorming fundamentally different approaches.",
      distractorNotes: "A, C, and D have nothing to do with anchoring bias."
    },
    {
      id: "ps_c4",
      question: "Which brainstorming technique forces creative efficiency by asking: 'What if we had zero budget to solve this?'",
      options: [
        "A) Constraint Inversion",
        "B) Sunk Cost Analysis",
        "C) Punitive Enforcement",
        "D) Ad Hominem Reasoning"
      ],
      correctAnswer: "A",
      explanation: "Constraint Inversion artificially tightens or flips a constraint (zero money, 24 hours) to strip away expensive complexity and expose clever, lean solutions.",
      distractorNotes: "B is an evaluation trap. C is punishment. D is a fallacy."
    },
    {
      id: "ps_c5",
      question: "A training institute has 30 students struggling with a coding topic. Which approach demonstrates strong divergent thinking?",
      options: [
        "A) Generating at least 4 distinct options across tutoring, visual tools, peer study, and asynchronous video walk-throughs",
        "B) Immediately assuming students are lazy and threatening them with failure",
        "C) Repeating the exact same lecture with a louder voice",
        "D) Canceling the course"
      ],
      correctAnswer: "A",
      explanation: "Divergent thinking explores distinct multidimensional avenues (pedagogy, peer support, tooling, media) before selecting the best fit.",
      distractorNotes: "B is hostile. C repeats failure. D surrenders."
    }
  ]
};

// ==========================================
// 6. REAL-WORLD CASE STUDY (PART 1)
// ==========================================

export const caseStudyData = {
  title: "Case Study: Modernizing the Institute's Enquiry Conversion Pipeline",
  subtitle: "Part 1: Problem Definition, Root Causes, Decomposition & Alternatives",
  context: "Alpha Fly Computer Education operates a flagship technical training center offering Full-Stack Development and Python Data Science courses. Over the past 30 days, the center recorded the following performance metrics:",
  metricsTable: [
    { metric: "Total Enquiries Received", value: "120 prospects" },
    { metric: "Confirmed Students Admitted", value: "18 enrollments" },
    { metric: "Admission Conversion Rate", value: "15.0%" },
    { metric: "Monthly Enquiry Follow-Up Budget", value: "₹3,000 max" },
    { metric: "Available Staff for Follow-Up", value: "2 counselors (shared with front desk)" },
    { metric: "Average Time to First Callback", value: "46 hours (industry benchmark < 2 hours)" },
    { metric: "Drop-off Reason cited in survey", value: "54% 'Already joined another institute', 28% 'Timing clash', 18% 'Fees'" }
  ],
  tasks: [
    {
      id: 1,
      prompt: "1. Formulate a precise, quantifiable Problem Statement using the baseline data provided.",
      hint: "Include current conversion (15%), baseline prospects (18/120), target, and budget constraint."
    },
    {
      id: 2,
      prompt: "2. Is the 15% conversion rate a root cause or a symptom? Explain the distinction.",
      hint: "What measurable operational lag causes 54% of prospects to say they joined another institute?"
    },
    {
      id: 3,
      prompt: "3. Construct a 3-branch MECE issue tree to categorize the drop-off reasons.",
      hint: "Think: Lead Responsiveness vs Course Timing vs Financial/Fees."
    },
    {
      id: 4,
      prompt: "4. Identify two hard constraints that any viable solution must respect.",
      hint: "Check budget limits and staffing headcount."
    },
    {
      id: 5,
      prompt: "5. Brainstorm three diverse alternative solutions (one quick containment, one process change, one technical tool).",
      hint: "Consider automated WhatsApp messaging, weekend evening batches, and flexible installment payments."
    }
  ],
  modelAnswer: {
    problemStatement: "Alpha Fly Computer Education converted only 18 out of 120 enquiries (15.0%) over the past 30 days against an industry benchmark of 25–30%, primarily driven by a 46-hour average callback delay that caused 54% of lost prospects to enroll at competing institutes. The institute must increase conversion to ≥25% within 60 days without exceeding the ₹3,000 monthly budget.",
    symptomVsCause: "The 15% conversion rate is a symptom. The true root operational defect is the 46-hour callback response time. Because counselors take nearly two full days to respond, interested students seek alternative institutes that reply within minutes.",
    issueTree: "Branch 1: Response Speed (46-hour delay, no instant brochure); Branch 2: Batch Scheduling (28% report timing conflicts with college); Branch 3: Pricing Structure (18% desire split installments).",
    constraints: "Constraint 1: Maximum monthly budget of ₹3,000. Constraint 2: Only 2 counselors available (who also manage the physical front desk).",
    alternatives: "Alt 1 (Quick Containment): Automated WhatsApp message sending syllabus PDF within 60 seconds of enquiry. Alt 2 (Process): Implement a 2-hour callback SLA during business hours. Alt 3 (Curriculum/Timing): Introduce 7:00 PM weekend hybrid batches for college students."
  }
};

// ==========================================
// 7. COMMON MISTAKES AND STRATEGIES
// ==========================================

export const commonMistakes = [
  {
    mistake: "Confusing Symptoms with Root Causes",
    whyItHappens: "Observing an outward metric drop (e.g. low sales, poor attendance) and trying to treat it directly rather than digging into the operational mechanism creating it.",
    correction: "Ask 'Why?' systematically until you uncover the procedural, behavioral, or technical failure behind the symptom."
  },
  {
    mistake: "Premature Solutioning (The JUMP Trap)",
    whyItHappens: "Our brains crave quick closure. When a problem appears, people immediately debate favorite solutions without defining the problem or gathering empirical evidence.",
    correction: "Enforce a mandatory Problem Framing pause: complete the 5Ws and establish baseline metrics before discussing remedies."
  },
  {
    mistake: "Anchoring on the First Idea",
    whyItHappens: "Teams anchor to the first plausible solution and spend the rest of the meeting defending it rather than exploring alternatives.",
    correction: "Mandate the generation of at least 3 distinct alternatives across different categories (process, tech, training) before evaluating."
  },
  {
    mistake: "Ignoring Hard Constraints",
    whyItHappens: "Designing complex, expensive dream solutions that violate budget, time limits, or team skill capacity, leading to immediate rejection.",
    correction: "List all non-negotiable boundaries (budget, deadlines, headcount) at the start of the analysis."
  },
  {
    mistake: "Vague, Unmeasurable Problem Statements",
    whyItHappens: "Writing complaints like 'The portal is bad' which gives developers zero measurable criteria to aim for.",
    correction: "Always specify Who, What, Where, When, Current Baseline, and Target Desired Outcome."
  }
];

export const practicalChecklist = [
  "Does the problem statement include measurable baseline data and a target outcome?",
  "Have surface symptoms been distinguished from verified root causes?",
  "Has the issue been decomposed into MECE sub-branches?",
  "Are all known facts, missing information, and hard constraints explicitly documented?",
  "Have at least 3 to 5 diverse alternatives been generated across different categories?",
  "Are both short-term containment and long-term systemic fixes considered?"
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
    domain: "Problem Framing",
    question: "Which of the following is the BEST example of an actionable, objective problem statement?",
    options: [
      "A) 'Students don't care about their programming assignments.'",
      "B) 'In the Web Development batch, 18 of 40 students failed to submit Assignment 2 on time, causing a 45% non-completion rate versus our target of <10%.'",
      "C) 'Our programming course syllabus is completely broken.'",
      "D) 'We need to hire stricter teachers immediately.'"
    ],
    correctAnswer: "B",
    explanation: "Option B provides specific quantifiable data (18/40, 45%), identifies the exact batch and assignment, and compares against a measurable target (<10%).",
    distractorNotes: "A and C are emotional, subjective complaints. D is a premature solution."
  },
  {
    id: "fa_q2",
    level: "Easy",
    domain: "Symptoms vs Root Causes",
    question: "A car driver notices that the engine temperature gauge is in the red zone. What is the high temperature reading?",
    options: [
      "A) The root cause of the breakdown",
      "B) An observable symptom indicating an underlying mechanical or coolant failure",
      "C) An unverified personal opinion",
      "D) A non-negotiable constraint"
    ],
    correctAnswer: "B",
    explanation: "The high temperature reading is a warning symptom. The root cause could be a broken water pump, leaking radiator hose, or snapped belt.",
    distractorNotes: "A confuses the symptom with the mechanical cause. C and D misunderstand the terms."
  },
  {
    id: "fa_q3",
    level: "Easy",
    domain: "Problem Decomposition",
    question: "What is the primary benefit of breaking a large, overwhelming problem into smaller sub-components?",
    options: [
      "A) It makes the problem impossible to solve",
      "B) It isolates the exact bottleneck and allows team members to tackle manageable components in parallel",
      "C) It guarantees that project costs will double",
      "D) It eliminates the need for software testing"
    ],
    correctAnswer: "B",
    explanation: "Decomposition reduces cognitive overload, isolates specific defective components, and enables parallel problem-solving.",
    distractorNotes: "A, C, and D are negative or absurd falsehoods."
  },
  {
    id: "fa_q4",
    level: "Easy",
    domain: "Information Gathering",
    question: "Which of the following is a VERIFIED FACT rather than an assumption?",
    options: [
      "A) 'Students find Python much easier than Java.'",
      "B) 'The server error log recorded 142 HTTP 500 errors between 2:00 PM and 3:00 PM on Tuesday.'",
      "C) 'The marketing campaign failed because competitors were unfair.'",
      "D) 'Older computers always crash on Mondays.'"
    ],
    correctAnswer: "B",
    explanation: "Server log timestamp records provide hard, empirical, measurable data that can be audited and verified.",
    distractorNotes: "A, C, and D are opinions, assumptions, or folklore."
  },
  {
    id: "fa_q5",
    level: "Easy",
    domain: "Constraints",
    question: "What is a 'Hard Constraint' in a project?",
    options: [
      "A) A flexible recommendation that can be ignored if convenient",
      "B) A non-negotiable boundary (such as a fixed budget or legal deadline) that any viable solution must strictly obey",
      "C) A difficult question asked during an interview",
      "D) The physical stiffness of a computer keyboard"
    ],
    correctAnswer: "B",
    explanation: "Constraints define the boundaries of the solution space. Any proposed solution that violates a hard constraint is invalid.",
    distractorNotes: "A describes a soft guideline. C and D are literal puns."
  },
  {
    id: "fa_q6",
    level: "Easy",
    domain: "Alternative Generation",
    question: "Why should problem solvers generate multiple alternative solutions rather than picking the first idea that comes to mind?",
    options: [
      "A) Because first ideas often anchor on obvious surface symptoms, whereas exploring alternatives uncovers more cost-effective, durable solutions",
      "B) Because government regulations require at least 10 ideas for every problem",
      "C) To delay doing any actual work as long as possible",
      "D) Because computers cannot execute first ideas"
    ],
    correctAnswer: "A",
    explanation: "First ideas frequently suffer from cognitive anchoring. Generating multiple options enables objective trade-off analysis.",
    distractorNotes: "B is fictional. C is cynical procrastination. D is nonsense."
  },
  {
    id: "fa_q7",
    level: "Easy",
    domain: "Containment vs Prevention",
    question: "When a pipe bursts in an office, what is the 'Short-Term Containment' action?",
    options: [
      "A) Replacing the plumbing across the entire city",
      "B) Shutting off the main water valve and placing buckets to contain the immediate flood",
      "C) Redrafting the architectural blueprint",
      "D) Suing the building contractor"
    ],
    correctAnswer: "B",
    explanation: "Shutting the valve immediately stops the ongoing loss and damage, buying time for permanent repairs.",
    distractorNotes: "A, C, and D do not stop the immediate flood."
  },

  // ------------------------------------------
  // MEDIUM LEVEL (QUESTIONS 8 - 14)
  // ------------------------------------------
  {
    id: "fa_q8",
    level: "Medium",
    domain: "Problem Framing",
    question: "An institute director states: 'Our enrollment is low because our instructors are not enthusiastic.' What critical thinking error is being made?",
    options: [
      "A) Stating an unverified assumption as the established root cause without empirical evidence",
      "B) Using too many numbers in the explanation",
      "C) Defining a problem too specifically",
      "D) Violating a legal constraint"
    ],
    correctAnswer: "A",
    explanation: "Blaming instructor enthusiasm is an untested speculation. True root causes might be marketing, course fees, or timing.",
    distractorNotes: "B is false (no numbers were used). C is false (it is completely vague). D is unrelated."
  },
  {
    id: "fa_q9",
    level: "Medium",
    domain: "Decomposition Logic",
    question: "Which of the following represents a MECE decomposition of 'Total Operating Expenses of a Computer Institute'?",
    options: [
      "A) Fixed Expenses (Rent, Permanent Salaries) AND Variable Expenses (Electricity, Marketing, Per-Hour Labs)",
      "B) Electricity Expenses AND Teacher Salaries",
      "C) Expensive Months AND Cheap Months",
      "D) Marketing Fees AND Coffee Expenses"
    ],
    correctAnswer: "A",
    explanation: "Dividing into Fixed vs Variable expenses covers 100% of costs (Collectively Exhaustive) with zero overlap (Mutually Exclusive).",
    distractorNotes: "B, C, and D are incomplete subsets that omit large portions of expenses."
  },
  {
    id: "fa_q10",
    level: "Medium",
    domain: "Information Gathering",
    question: "A retail website notices a 50% drop in checkout completions. Which piece of missing information should be gathered FIRST?",
    options: [
      "A) The personal hobbies of the CEO",
      "B) The exact drop-off step in the checkout funnel and server error logs for the payment gateway API",
      "C) The font family used in the website footer",
      "D) The average weather in the city where servers are hosted"
    ],
    correctAnswer: "B",
    explanation: "Funnel drop-off analytics and server error logs pinpoint whether the breakdown is technical, usability, or payment rejection.",
    distractorNotes: "A, C, and D are irrelevant distractions."
  },
  {
    id: "fa_q11",
    level: "Medium",
    domain: "Constraint Analysis",
    question: "A project team must develop a mobile app. The client specifies: 'Budget: ₹50,000; Deadline: 3 weeks; Target OS: Both Android and iOS.' Which proposed alternative must be disqualified immediately?",
    options: [
      "A) Building a cross-platform Flutter app within 3 weeks for ₹45,000",
      "B) Hiring two separate native development teams requiring ₹1,80,000 and 8 weeks",
      "C) Developing a responsive Progressive Web App (PWA) in 2 weeks for ₹30,000",
      "D) Using a low-code mobile app builder for ₹15,000 in 10 days"
    ],
    correctAnswer: "B",
    explanation: "Alternative B severely violates both the ₹50,000 budget constraint (by 3.6x) and the 3-week deadline constraint (by 2.6x).",
    distractorNotes: "A, C, and D all operate within the stated budget and time constraints."
  },
  {
    id: "fa_q12",
    level: "Medium",
    domain: "Alternative Generation",
    question: "To generate unconventional, high-impact alternatives, an analyst uses 'Problem Inversion' by asking: 'How could we make our enquiry callback delays twice as long?' How does this help?",
    options: [
      "A) It actively identifies every hidden friction point, bureaucratic delay, and bad habit currently slowing down the process",
      "B) It encourages staff to provide worse customer service",
      "C) It proves that customer inquiries should be banned",
      "D) It confuses the team so they work slower"
    ],
    correctAnswer: "A",
    explanation: "Inversion exposes hidden structural friction that people take for granted, making it obvious what processes must be dismantled.",
    distractorNotes: "B, C, and D misunderstand the creative problem-solving technique of inversion."
  },
  {
    id: "fa_q13",
    level: "Medium",
    domain: "Root Cause Diagnosis",
    question: "Students in an online coding course complain that video lectures are 'boring.' After surveying 50 dropouts, the data reveals that 82% quit during the 40-minute theoretical slides with no code demo. What is the root cause?",
    options: [
      "A) Students do not enjoy software development",
      "B) The lecture format relies on passive theoretical monologue rather than interactive, hands-on code execution",
      "C) Students' computer screens are too small",
      "D) The video resolution is 1080p instead of 4K"
    ],
    correctAnswer: "B",
    explanation: "The empirical survey isolates the drop-off to passive theory slides, indicating the pedagogical format is the root cause.",
    distractorNotes: "A is an unsupported generalization. C and D are trivial physical speculations."
  },
  {
    id: "fa_q14",
    level: "Medium",
    domain: "Framing Traps",
    question: "Which of the following statements represents the 'Premature Solutioning' trap?",
    options: [
      "A) 'Let's first audit our server response times before deciding what to upgrade.'",
      "B) 'Our admissions are down, so we must immediately build a mobile app.'",
      "C) 'We need to survey the 85 lost leads to understand why they declined.'",
      "D) 'Let's compare the pass rates of morning vs evening batches.'"
    ],
    correctAnswer: "B",
    explanation: "Statement B jumps immediately to a specific costly solution (building a mobile app) without verifying if an app addresses the cause of low admissions.",
    distractorNotes: "A, C, and D all demonstrate disciplined investigation before action."
  },

  // ------------------------------------------
  // HARD LEVEL (QUESTIONS 15 - 20)
  // ------------------------------------------
  {
    id: "fa_q15",
    level: "Hard",
    domain: "Complex Framing & Decomposition",
    question: "A college engineering department observes that 35% of graduates fail campus recruitment coding interviews. A professor decomposes the issue into:\n1. Theoretical Knowledge\n2. Real-time Coding Speed\n3. Communication & Behavioral Skills.\nInitial diagnostic tests reveal graduates score 88% on Theory, but 74% fail the live coding compiler test within 30 minutes. What does this tell the department?",
    options: [
      "A) The department should add 20 more hours of theoretical lectures",
      "B) The true root bottleneck is live timed coding implementation under pressure, not theoretical comprehension",
      "C) Students need more public speaking classes",
      "D) Coding interviews are inherently flawed and should be ignored"
    ],
    correctAnswer: "B",
    explanation: "The decomposition and diagnostic data pinpoint the exact deficit: students understand concepts (88% theory) but lack live keyboard fluency under timed compiler conditions.",
    distractorNotes: "A reinforces what they already know. C treats communication when coding was the failure. D is denial."
  },
  {
    id: "fa_q16",
    level: "Hard",
    domain: "Process Decomposition",
    question: "In an e-learning platform, 1,000 users sign up, 800 verify email, 150 start Course 1, and 120 complete Course 1. Where is the single biggest operational bottleneck in the user journey?",
    options: [
      "A) Between Signup and Email Verification",
      "B) Between Email Verification and Starting Course 1 (81.25% drop-off)",
      "C) Between Starting Course 1 and Completing Course 1",
      "D) After Course 1 completion"
    ],
    correctAnswer: "B",
    explanation: "Of 800 verified users, only 150 started the course—a massive drop of 650 users (81.25% churn). This isolates the onboarding/course discovery stage as the critical bottleneck.",
    distractorNotes: "A is 20% drop. C is only 20% drop (120/150 = 80% completion). D is unmeasured."
  },
  {
    id: "fa_q17",
    level: "Hard",
    domain: "Separating Correlation from Causation",
    question: "An institute finds that students who drink tea during breaks score 6% higher on exams than students who do not. The director proposes providing free tea to all students to boost grades. What logical flaw is present?",
    options: [
      "A) The director confused correlation with causation; tea drinking might correlate with older, more disciplined students who attend evening study sessions",
      "B) Tea is too expensive for an educational institute",
      "C) Coffee is scientifically proven to be better than tea",
      "D) Exams should not be graded with percentages"
    ],
    correctAnswer: "A",
    explanation: "Co-occurrence (correlation) does not prove that tea chemically causes higher exam marks. Confounding variables (student age, study habits) likely explain the difference.",
    distractorNotes: "B is an unverified cost claim. C and D are irrelevant."
  },
  {
    id: "fa_q18",
    level: "Hard",
    domain: "Evaluating Competing Explanations",
    question: "A company website experiences a sudden spike in bounce rate from 20% to 75% on Thursday at 3:00 PM. Two competing hypotheses are offered:\nH1: Competitors launched an advertising campaign.\nH2: The Thursday 2:55 PM software deployment introduced a broken mobile CSS file causing screens to render blank.\nWhich evidence would decisively confirm H2 over H1?",
    options: [
      "A) Looking at competitor social media pages",
      "B) Checking Google Analytics bounce rates segmented by device type: if bounce rate spiked to 98% exclusively on mobile while desktop stayed at 20%",
      "C) Asking the CEO which hypothesis feels more plausible",
      "D) Waiting 30 days to see if the trend reverses"
    ],
    correctAnswer: "B",
    explanation: "Device-segmented analytics correlating directly with the 2:55 PM mobile CSS code deployment provides empirical proof isolating the defect to the software update.",
    distractorNotes: "A is external speculation. C relies on authority bias. D permits catastrophic loss."
  },
  {
    id: "fa_q19",
    level: "Hard",
    domain: "Creative Alternative Synthesis",
    question: "A technical institute has only 20 computers for 40 enrolled students in a 2-hour programming lab. The institute has zero budget for new PCs. Which solution demonstrates the most rigorous, structured problem-solving approach?",
    options: [
      "A) Tell 20 students to go home every week",
      "B) Implement structured Pair Programming (Driver/Navigator roles swapping every 20 minutes) paired with staggered lab shifts (Batch 1: 8–10 AM, Batch 2: 10–12 AM)",
      "C) Make all 40 students share a single computer monitor",
      "D) Cancel the programming course and teach history instead"
    ],
    correctAnswer: "B",
    explanation: "Pair programming is an established industry practice that maximizes 1-computer collaboration, while staggered scheduling doubles physical lab capacity at zero financial cost.",
    distractorNotes: "A denies paid education. C is physically impossible. D abandons the curriculum."
  },
  {
    id: "fa_q20",
    level: "Hard",
    domain: "Systemic Problem Framing Lifecycle",
    question: "Which of the following represents the correct order of the first 4 phases of Structured Problem Solving?",
    options: [
      "A) Brainstorm Solutions → Pick the Best → Define the Problem → Gather Logs",
      "B) Define Measurable Problem Statement → Gather Data & Uncover Root Causes → Decompose into MECE Sub-problems → Generate Multiple Diverse Alternatives",
      "C) Hire Consultants → Buy Software → Blame Staff → Write Report",
      "D) Brainstorm Alternatives → Analyze Constraints → Guess the Cause → Hope for Results"
    ],
    correctAnswer: "B",
    explanation: "Disciplined problem solving begins with clear framing, followed by empirical investigation, structural decomposition, and divergent solution generation.",
    distractorNotes: "A is backwards. C and D represent undisciplined organizational failure."
  }
];

// ==========================================
// 9. REVISION & FRAMEWORK CHEAT SHEET
// ==========================================

export const revisionCheatSheet = {
  title: "Day 10 Revision: Problem Framing & Decomposition Cheat Sheet",
  corePrinciples: [
    { title: "Define Before Solving", desc: "A problem well-stated is a problem half-solved. Specify Who, What, Where, When, Baseline, and Desired Outcome." },
    { title: "Symptom vs Root Cause", desc: "Symptoms are outward warning signs. Root causes are the operational, procedural, or technical defects generating them." },
    { title: "MECE Decomposition", desc: "Mutually Exclusive, Collectively Exhaustive. Break monolithic problems into non-overlapping branches that cover 100% of the issue." },
    { title: "Empirical Facts vs Assumptions", desc: "Base all decisions on audited logs, timestamps, and verifiable records. Never treat speculations as facts." },
    { title: "Know Your Hard Constraints", desc: "Non-negotiable boundaries (budget, deadlines, headcount) instantly filter out non-viable solutions." },
    { title: "Divergent Brainstorming", desc: "Generate at least 3-5 distinct alternatives across short-term containment and long-term systemic fixes." }
  ],
  framingChecklist: [
    "1. Is the problem statement quantified with baseline data and a target outcome?",
    "2. Have we isolated the verified root cause from surface warning symptoms?",
    "3. Has the problem been broken down into non-overlapping MECE branches?",
    "4. What critical information is missing, and what hard constraints exist?",
    "5. Have we generated at least 3 distinct alternatives without premature judgment?",
    "6. Do we have a short-term containment plan to stop immediate losses?"
  ]
};
