// ==========================================
// ALPHA FLY LOGICAL REASONING - LEVEL 3 (ADVANCED)
// DAY 12: ADVANCED CRITICAL THINKING & DEDUCTION (PART 1)
// Facts, Opinions, Assumptions, and Multi-Statement Deduction
// ==========================================

export const day12Overview = {
  courseName: "Logical Reasoning",
  level: "Level 3 – Advanced",
  dayNumber: 12,
  title: "Advanced Critical Thinking & Logical Deduction (Part 1)",
  subtitle: "Facts, Opinions, Hidden Assumptions, and Deductive Validity",
  targetAudience: "College students, job seekers, placement candidates, competitive examination learners, and working professionals.",
  language: "Simple English with clear, detailed explanations.",
  difficulty: "Advanced",
  estimatedMinutes: 60,
  description: "Master foundational advanced critical thinking: learn to dissect complex arguments into premises and conclusions, expose unstated hidden assumptions, evaluate deductive validity vs inductive strength, combine multiple relational statements with quantifiers (all, some, none, unless, if-then), and avoid unsupported conclusions.",
  learningObjectives: [
    "Analyze complex multi-sentence arguments systematically into premises, evidence, and conclusions.",
    "Distinguish rigorously between verifiable facts, subjective opinions, unstated assumptions, and derived conclusions.",
    "Identify hidden assumptions required for an argument's conclusion to logically hold.",
    "Evaluate the logical strength, relevance, and deductive validity of competing arguments.",
    "Combine multiple relational statements to draw airtight logical deductions using formal quantifiers (all, some, none, only, unless).",
    "Avoid common deduction errors such as treating 'some' as 'all' or drawing conclusions beyond stated premises."
  ]
};

// ==========================================
// 2. LESSON INTRODUCTION & STARTER SCENARIO
// ==========================================

export const lessonIntro = {
  title: "The Leap from Basic Reasoning to Advanced Critical Thinking",
  foundationalShift: [
    {
      level: "Basic Logical Reasoning",
      focus: "Pattern recognition, basic arithmetic series, simple family trees, and direct linear sequencing.",
      limitation: "Often relies on clear, complete rules where the question provides 100% of the puzzle pieces."
    },
    {
      level: "Advanced Critical Thinking",
      focus: "Deconstructing ambiguous arguments, evaluating evidence credibility, exposing unstated hidden premises, and distinguishing correlation from causation.",
      power: "Equips learners to evaluate claims where incomplete information is presented, intentional persuasive biases exist, or competing explanations fight for credibility."
    }
  ],
  starterScenario: {
    title: "Starter Scenario: The Extra Practice Sessions Dilemma",
    context: "At Alpha Fly Computer Education, the academic director noticed an intriguing pattern: Students who voluntarily attended additional 2-hour Saturday lab practice sessions achieved an average score of 84% on the final certification exam, whereas students who attended only standard weekday lectures achieved an average score of 71%.",
    initialClaim: "The marketing team immediately printed banners proclaiming: 'Attending Alpha Fly's Saturday Practice Sessions causes a 13-point increase in student examination marks!'",
    reflectiveQuestions: [
      {
        question: "1. Does this data prove that additional practice sessions caused the higher examination scores?",
        answer: "No. The data shows an association (correlation), but does NOT prove causation. Attendance was voluntary, introducing a massive self-selection bias."
      },
      {
        question: "2. What alternative explanations could account for the 13-point score gap?",
        answer: "Students who voluntarily attend extra weekend sessions may already possess higher intrinsic motivation, greater dedication, prior programming background, or fewer conflicting family/job obligations during weekdays."
      },
      {
        question: "3. What unstated assumption is being made by the marketing banner?",
        answer: "It assumes that the students attending Saturday labs were identical in baseline aptitude, motivation, and study habits to the students who did not attend."
      },
      {
        question: "4. What conclusion can safely be drawn from the information provided?",
        answer: "Students in this cohort who attended extra Saturday practice scored higher on average (84% vs 71%). We cannot conclude that forcing an unmotivated student to attend will guarantee an 84% score."
      }
    ]
  },
  coreDistinctions: [
    { term: "Valid Reasoning", definition: "A deductive argument where if all stated premises are true, the conclusion MUST be true by necessity." },
    { term: "Strong Evidence", definition: "Empirical, audited, representative, and verifiable data directly relevant to the specific claim." },
    { term: "Hidden Assumption", definition: "An unstated premise that the speaker took for granted, without which the argument collapses." },
    { term: "Unsupported Conclusion", definition: "A conclusion that makes a broader, more definitive claim than the provided premises logically permit." }
  ]
};

// ==========================================
// 3. CORE CONCEPTS (4 IN-DEPTH MODULES)
// ==========================================

export const coreConcepts = {
  concept1: {
    id: "concept1",
    title: "Concept 1: Facts, Opinions, Assumptions, and Conclusions",
    subtitle: "The 4 Fundamental Building Blocks of Logical Arguments",
    theory: "Critical thinking begins with categorizing statements into their correct epistemological status. Treating an opinion as a fact, or an unverified assumption as a proven conclusion, is the root cause of flawed decisions.",
    definitions: [
      {
        term: "Fact",
        meaning: "A statement that can be checked against empirical evidence, records, or objective observation. Facts are verifiable independently of personal beliefs.",
        educationExample: "Alpha Fly's Python course includes 24 hands-on coding assignments.",
        techExample: "The Python standard library `math.sqrt(16)` returns `4.0` in Python 3.12.",
        businessExample: "The company's quarterly revenue rose by 14.2% year-over-year according to audited filings."
      },
      {
        term: "Opinion",
        meaning: "A personal judgment, preference, value assessment, or belief that cannot be proven true or false objectively. It reflects subjective sentiment.",
        educationExample: "Python is a far more elegant and enjoyable programming language than C++.",
        techExample: "Clean code structure is more important than raw runtime execution speed.",
        businessExample: "Our customer service department is the friendliest team in the region."
      },
      {
        term: "Assumption",
        meaning: "An unstated or unverified proposition taken for granted as true without proof, upon which an argument or action is built.",
        educationExample: "Because a student attended 100% of lectures, they will definitely pass the final exam.",
        techExample: "Users will automatically understand how to use the new dashboard without tutorials.",
        businessExample: "Lowering course enrollment fees by 20% will automatically double student enrollment."
      },
      {
        term: "Conclusion",
        meaning: "A statement or claim derived from supporting premises or evidence through a process of logical inference.",
        educationExample: "All enrolled students completed Assignment 1; Ravi is an enrolled student; therefore, Ravi completed Assignment 1.",
        techExample: "Server memory usage exceeded 98% and CPU spiked to 100%; therefore, the server crashed due to an out-of-memory exception.",
        businessExample: "Operating expenses exceeded gross revenue in Q3; therefore, the branch operated at a net loss in Q3."
      }
    ]
  },

  concept2: {
    id: "concept2",
    title: "Concept 2: Identifying Hidden Assumptions",
    subtitle: "Exposing the Unstated Foundations of Arguments",
    theory: "In spoken and written arguments, speakers rarely state every premise. They leave crucial connections unsaid. A 'hidden assumption' is an unstated bridge connecting the stated evidence (premise) to the claimed conclusion. If the assumption is false, the argument collapses.",
    theNegationTest: {
      name: "The Negation Test (The Ultimate Assumption Detector)",
      explanation: "To verify whether an assumption is truly NECESSARY for an argument: 1) Negate the assumption (assume its exact opposite); 2) Check if the argument's conclusion can still survive. If the negated assumption destroys the conclusion, then it was a genuine, necessary hidden assumption!",
      example: "Argument: 'Priya studied 10 hours daily for the placement exam; therefore, she will get selected.'\nCandidate Assumption: 'Studying 10 hours daily guarantees exam success.'\nNegation: 'Studying 10 hours daily does NOT guarantee success.'\nResult: The conclusion completely falls apart! Thus, it was indeed a necessary hidden assumption."
    },
    workedExamples: [
      {
        id: "ha1",
        statement: "The institute should offer weekend classes because many prospective students have weekday daytime employment commitments.",
        premises: "Many working students cannot attend during weekday daytime hours.",
        conclusion: "The institute should launch weekend classes.",
        hiddenAssumptions: [
          "Assumption 1: Prospective students with weekday commitments have free time on weekends and are willing to attend classes on weekends.",
          "Assumption 2: The institute possesses available classroom space, computers, and qualified instructors to operate on weekends profitably."
        ],
        probingQuestions: "Do all working individuals want to study on weekends, or do they prefer online self-paced evenings? Can the institute find staff to teach on Sundays?"
      },
      {
        id: "ha2",
        statement: "Alpha Fly should replace all desktop computers with laptops so that students can learn anywhere in the building.",
        premises: "Laptops are portable, allowing learning in corridors, cafeteria, and study lounges.",
        conclusion: "Replacing desktops with laptops will improve the learning environment.",
        hiddenAssumptions: [
          "Students actually desire to code in casual locations rather than dedicated lab desks.",
          "Battery life, theft risk, and smaller screen sizes will not impair complex coding exercises."
        ]
      },
      {
        id: "ha3",
        statement: "Our software development bootcamp increased tuition by ₹5,000, yet enrollment rose by 20%. Therefore, increasing tuition always increases enrollment.",
        premises: "Tuition rose by ₹5,000; enrollment increased by 20% in the subsequent batch.",
        conclusion: "Higher tuition causes higher enrollment across all situations.",
        hiddenAssumptions: [
          "External factors (like university exam season ending, hiring market boom, or new AI syllabus additions) played no role in the enrollment surge.",
          "Prospective students perceive higher fees as an indicator of premium quality across all price levels."
        ]
      },
      {
        id: "ha4",
        statement: "Candidate Suresh has a 9.5 GPA in computer science; therefore, he will be an exceptional team lead on our client project.",
        premises: "Suresh achieved a 9.5 academic GPA.",
        conclusion: "He will excel as a project team lead.",
        hiddenAssumptions: [
          "Academic GPA in college directly translates to leadership, conflict resolution, and client communication abilities.",
          "Technical theoretical knowledge is the primary prerequisite for project team leadership."
        ]
      },
      {
        id: "ha5",
        statement: "We should discontinue phone call reminders for late fee payments because 85% of our learners use WhatsApp daily.",
        premises: "85% of learners use WhatsApp daily.",
        conclusion: "Phone call reminders are redundant and can be discontinued.",
        hiddenAssumptions: [
          "Learners who read WhatsApp messages respond to financial payment reminders as reliably as they do to direct human phone calls.",
          "The remaining 15% who do not use WhatsApp daily will not suffer fee penalties or disruption."
        ]
      }
    ]
  },

  concept3: {
    id: "concept3",
    title: "Concept 3: Evaluating Arguments",
    subtitle: "Differentiating Strong Evidence, Valid Deductions, and Fallacious Rhetoric",
    theory: "An argument consists of one or more premises intended to establish a conclusion. Evaluating an argument requires asking two independent questions: 1) Are the premises true and relevant? 2) Does the conclusion logically follow from the premises?",
    dimensions: [
      {
        dimension: "Deductive Validity vs. Factuality",
        detail: "An argument can be logically VALID even if its premises are factual nonsense. Validity means: IF the premises are true, the conclusion MUST be true.",
        example: "Premise 1: All birds are reptiles. Premise 2: An eagle is a bird. Conclusion: Therefore, an eagle is a reptile. (This deduction is 100% logically VALID, even though Premise 1 is biologically false!)."
      },
      {
        dimension: "Soundness",
        detail: "An argument is SOUND if and only if it is: 1) Logically Valid, AND 2) Every single premise is empirically true in reality.",
        example: "Premise 1: All programming languages require syntax rules. Premise 2: Python is a programming language. Conclusion: Python requires syntax rules. (Valid AND Factually True = SOUND)."
      },
      {
        dimension: "Relevant vs. Irrelevant Evidence",
        detail: "Strong arguments rely on premises that directly establish the conclusion. Irrelevant premises (appeals to emotion, tradition, or celebrity endorsement) weaken arguments.",
        example: "Claim: 'This database engine handles 10,000 queries per second.' Irrelevant evidence: 'The database logo was designed by an award-winning artist.' Strong evidence: 'Benchmark tests logged 10,240 QPS with under 15ms latency across 50 server clusters.'"
      },
      {
        dimension: "Strong vs. Weak Inductive Arguments",
        detail: "In inductive reasoning, conclusions are probable rather than absolute. A strong argument makes the conclusion highly probable; a weak argument provides insufficient backing.",
        example: "Weak: 'I met two students who struggled with recursion; therefore, recursion is impossible for humans to learn.' Strong: 'In an audited sample of 500 computer science undergraduates across 6 universities, 78% completed recursion assessments within 45 minutes.'"
      }
    ]
  },

  concept4: {
    id: "concept4",
    title: "Concept 4: Logical Deduction from Multiple Statements",
    subtitle: "Synthesizing Multi-Statement Chains with Formal Quantifiers",
    theory: "Logical deduction combines multiple separate statements to infer a necessary truth. In competitive exams and systems architecture, deductions hinge on formal quantifier words: All, Some, None, Only, Unless, and If-Then.",
    quantifierRules: [
      { word: "ALL (Universal Affirmative)", meaning: "Every single member of set A is inside set B (A ⊆ B).", trap: "Does NOT mean All B are A! 'All Python students are enrolled' does not mean 'All enrolled students study Python'." },
      { word: "SOME (Particular Affirmative)", meaning: "At least one member of set A is inside set B (A ∩ B ≠ ∅). Can mean 1, 50%, or even 100%.", trap: "In formal logic, 'Some are' does NOT automatically mean 'Some are not'!" },
      { word: "NONE / NO (Universal Negative)", meaning: "Zero members of set A belong to set B (A ∩ B = ∅). Completely mutually exclusive.", trap: "Symmetric: 'No A is B' guarantees 'No B is A'." },
      { word: "ONLY", meaning: "'Only A are B' translates to 'All B are A'.", trap: "'Only graduates can apply' means 'If you can apply, you MUST be a graduate' (Not: all graduates will apply)." },
      { word: "UNLESS", meaning: "'A unless B' translates to 'If not B, then A'.", trap: "'Class is held unless it rains' means 'If it does NOT rain, class is held'." }
    ],
    workedDeductions: [
      {
        id: "d1",
        title: "Deduction 1: Student Eligibility",
        premises: [
          "1. All students who complete the required laboratory exercises are eligible for the final certification examination.",
          "2. Some Python Full-Stack students have completed all required laboratory exercises."
        ],
        validConclusion: "Some Python Full-Stack students are eligible for the final certification examination.",
        whyValid: "Premise 2 establishes an overlap between Python students and Lab Completers. Premise 1 states that ALL Lab Completers are eligible. Thus, those Python students who completed the labs are necessarily eligible.",
        invalidTrap: "Invalid: 'All Python Full-Stack students are eligible' (Treating 'Some' as 'All')."
      },
      {
        id: "d2",
        title: "Deduction 2: Software System Permissions",
        premises: [
          "1. No intern has database write permissions.",
          "2. All database administrators have database write permissions.",
          "3. Rajesh is an intern."
        ],
        validConclusion: "Rajesh is not a database administrator, and Rajesh does not have database write permissions.",
        whyValid: "Premise 1 excludes all interns from write permissions. Rajesh is an intern, so he cannot have write permissions. Because all DBAs have write permissions, Rajesh cannot be a DBA.",
        invalidTrap: "Invalid: 'No database administrator is a full-time employee' (Introduces unmentioned concepts)."
      },
      {
        id: "d3",
        title: "Deduction 3: Department Budget Approvals",
        premises: [
          "1. All projects approved by the Director receive funding.",
          "2. Only projects submitted before Friday are reviewed by the Director.",
          "3. Project Phoenix was submitted on Saturday."
        ],
        validConclusion: "Project Phoenix was not reviewed by the Director.",
        whyValid: "Premise 2 means: 'If reviewed by the Director, it must have been submitted before Friday.' Phoenix was submitted on Saturday; therefore, by contrapositive, it was not reviewed by the Director.",
        invalidTrap: "Invalid: 'Project Phoenix will definitely never receive any funding from any source' (It could receive funding from non-Director grants)."
      }
    ]
  }
};

// ==========================================
// 4. INTERACTIVE CLASSIFICATION ITEMS (8 EXAMPLES)
// ==========================================

export const interactiveClassificationItems = [
  { id: "c1", text: "Alpha Fly Computer Education was established in 2018 in Tamil Nadu.", category: "Fact" },
  { id: "c2", text: "Online education is fundamentally superior to classroom instruction because students learn faster.", category: "Opinion" },
  { id: "c3", text: "Because all 25 students submitted their projects on GitHub on time, every student has mastered version control.", category: "Conclusion" },
  { id: "c4", text: "Students who score below 50% on the midterm will drop out before the final exam.", category: "Assumption" },
  { id: "c5", text: "The institute's electricity tariff increased by ₹1.50 per unit on January 1st.", category: "Fact" },
  { id: "c6", text: "Dark mode color themes are much more professional than light themes.", category: "Opinion" },
  { id: "c7", text: "The network router crashed due to thermal overheating; therefore, we must install an exhaust fan in the server rack.", category: "Conclusion" },
  { id: "c8", text: "Younger instructors naturally possess better rapport with college learners than senior instructors.", category: "Assumption" }
];

// ==========================================
// 5. SOLVED MASTER EXAMPLES (5 WORKED EXAMPLES)
// ==========================================

export const workedExamples = [
  {
    id: "ex1",
    title: "Example 1: Identifying Hidden Assumptions",
    type: "Hidden Assumption",
    scenario: "An institute marketing manager states: 'We must start running advertisements in local Tamil and English daily newspapers because newspaper readers value formal professional education.'",
    question: "Which of the following is a NECESSARY hidden assumption underlying the manager's argument?",
    options: [
      "A) Newspaper advertising is the cheapest marketing channel in the state.",
      "B) Prospective students who wish to learn computer programming actively read local print newspapers.",
      "C) Digital social media advertisements have zero impact on enrollment.",
      "D) Every newspaper reader in the city will enroll in Alpha Fly courses."
    ],
    correctAnswer: 1, // B
    stepByStepReasoning: [
      "Step 1 (Isolate Conclusion): 'We must run ads in newspapers.'",
      "Step 2 (Isolate Premise): 'Newspaper readers value formal professional education.'",
      "Step 3 (Bridge the Gap): For the ads to generate computer enrollments, people looking for computer courses must actually read those newspapers. If no prospective student reads print newspapers, running ads there produces zero students regardless of how much readers value education.",
      "Step 4 (Apply Negation Test to B): 'Prospective students who wish to learn computer programming DO NOT read print newspapers.' If this is true, advertising in newspapers is completely futile. The conclusion collapses! Thus, B is a necessary assumption."
    ],
    distractorAnalysis: [
      "A is incorrect: The argument does not claim newspapers are the CHEAPEST, only that they reach people who value education.",
      "C is incorrect: The manager does not need social media to have zero impact; newspapers could simply be an additional viable channel.",
      "D is incorrect: 'Every reader' is an extreme generalization; an ad campaign only needs a tiny percentage of readers to enroll to be successful."
    ]
  },
  {
    id: "ex2",
    title: "Example 2: Evaluating Argument Strength",
    type: "Argument Strength",
    scenario: "Statement: 'Should Alpha Fly Computer Education make daily attendance in programming lab sessions mandatory for all enrolled students?'",
    question: "Which of the following arguments is the STRONGEST argument in favor of the proposal?",
    options: [
      "A) Yes; because many other institutes in the city force their students to sign attendance registers every morning.",
      "B) Yes; because continuous programming skills develop through regular hands-on keyboard practice, and internal historical data shows that students who complete daily lab sessions have an 88% placement rate compared to 34% for irregular attendees.",
      "C) No; because students are adults and adults should never be expected to follow rules.",
      "D) Yes; because the institute purchased expensive lab air conditioners and they should not be wasted."
    ],
    correctAnswer: 1, // B
    stepByStepReasoning: [
      "Step 1 (Check Relevance): Argument B provides empirical, audited correlation directly linking the proposed action (daily lab sessions) to the ultimate institutional goal (job placement: 88% vs 34%).",
      "Step 2 (Evaluate Logic): Programming is a motor and cognitive skill requiring frequent execution. B directly addresses the pedagogical mechanism of skill acquisition."
    ],
    distractorAnalysis: [
      "A is a weak Appeal to Popularity / Bandwagon fallacy: just because other institutes do something does not prove it is pedagogically sound.",
      "C is a weak generalization and emotional assertion: adults in professional jobs have strict attendance expectations.",
      "D is an irrelevant justification (Sunk Cost Fallacy): air conditioners do not justify academic policy."
    ]
  },
  {
    id: "ex3",
    title: "Example 3: Multi-Statement Logical Deduction",
    type: "Logical Deduction",
    scenario: "Consider the following three statements:\n1. All certified cloud architects know Linux shell scripting.\n2. Some Alpha Fly students are certified cloud architects.\n3. No person who knows Linux shell scripting is intimidated by terminal command lines.",
    question: "Which of the following conclusions MUST be true based solely on the statements above?",
    options: [
      "A) All Alpha Fly students know Linux shell scripting.",
      "B) Some Alpha Fly students are not intimidated by terminal command lines.",
      "C) All persons who know Linux shell scripting are certified cloud architects.",
      "D) No Alpha Fly student is intimidated by terminal command lines."
    ],
    correctAnswer: 1, // B
    stepByStepReasoning: [
      "Step 1 (Link 1 & 2): Some Alpha Fly students are Cloud Architects (Premise 2). All Cloud Architects know Linux scripting (Premise 1). Therefore, SOME Alpha Fly students definitely know Linux scripting.",
      "Step 2 (Link with 3): Premise 3 states that NO person who knows Linux scripting is intimidated by terminal command lines. Since some Alpha Fly students belong to this Linux-scripting group, those specific students CANNOT be intimidated by command lines.",
      "Step 3 (Derive Truth): 'Some Alpha Fly students are not intimidated by terminal command lines' is 100% mathematically and deductively certain."
    ],
    distractorAnalysis: [
      "A is invalid: Only 'some' students are cloud architects, not 'all'.",
      "C is invalid: Reverses the conditional (All Cloud Architects know Linux does NOT mean all Linux users are Cloud Architects).",
      "D is invalid: Generalizes from 'some' to 'no Alpha Fly student'."
    ]
  },
  {
    id: "ex4",
    title: "Example 4: Conditional Reasoning & Quantifiers",
    type: "Conditional Reasoning",
    scenario: "Rule: 'An applicant is granted interview clearance ONLY IF they have passed the coding screening test.'\nFact: 'Candidate Ananya was granted interview clearance.'",
    question: "What conclusion must be true?",
    options: [
      "A) Ananya might or might not have passed the coding screening test.",
      "B) Ananya definitely passed the coding screening test.",
      "C) Ananya will definitely be hired as a software engineer.",
      "D) Anyone who passed the coding screening test is automatically hired."
    ],
    correctAnswer: 1, // B
    stepByStepReasoning: [
      "Step 1 (Analyze 'ONLY IF'): 'A only if B' means B is a NECESSARY condition for A. Formula: A → B. Here: Clearance → Passed Coding Test.",
      "Step 2 (Apply Fact): Ananya received Clearance (A is true).",
      "Step 3 (Modus Ponens): Since A is true, B MUST be true. Therefore, Ananya definitely passed the coding screening test."
    ],
    distractorAnalysis: [
      "A is false: Clearance cannot exist without passing the screening test.",
      "C is unsupported: Passing the test and clearing the interview gateway does not guarantee final hiring.",
      "D confuses necessary with sufficient."
    ]
  },
  {
    id: "ex5",
    title: "Example 5: Identifying Unsupported Conclusions",
    type: "Unsupported Conclusions",
    scenario: "A study of 100 successful technology startup founders found that 82% of them wake up before 6:00 AM. A business columnist concludes: 'Therefore, waking up before 6:00 AM will make an entrepreneur successful.'",
    question: "Why is the columnist's conclusion UNSUPPORTED by the study?",
    options: [
      "A) The study did not examine unsuccessful entrepreneurs, millions of whom may also wake up before 6:00 AM without achieving success.",
      "B) 100 is not a round number.",
      "C) Technology startup founders do not use alarm clocks.",
      "D) Entrepreneurs should only wake up at noon."
    ],
    correctAnswer: 0, // A
    stepByStepReasoning: [
      "Step 1 (Detect Survivorship Bias): The study only sampled SUCCESSFUL founders. It ignored the thousands of failed founders who also woke up early.",
      "Step 2 (Correlation vs Causation): Waking up early may simply correlate with high ambition or long working hours; it is not a sufficient cause of business success."
    ],
    distractorAnalysis: [
      "B is numerically false (100 is round).",
      "C and D are absurd distractors."
    ]
  }
];

// ==========================================
// 6. PRACTICE SETS (A, B, C)
// ==========================================

export const practiceSetA = {
  id: "set_a",
  title: "Practice Set A: Critical Thinking Fundamentals",
  subtitle: "Facts, Opinions, Assumptions, and Derived Conclusions",
  timeLimitSeconds: 360, // 6 minutes
  questions: [
    {
      id: "ps_a1",
      question: "Which of the following statements represents an EMPIRICAL FACT rather than an opinion or assumption?",
      options: [
        "A) Python is the best programming language for beginners.",
        "B) Alpha Fly's campus recorded 342 student attendance check-ins on Monday between 8:30 AM and 10:00 AM.",
        "C) Students learn much more effectively in morning batches than in evening batches.",
        "D) Our computer course curriculum is much more engaging than that of our competitors."
      ],
      correctAnswer: "B",
      explanation: "Option B is verifiable against physical timestamp logs and attendance records. A, C, and D are opinions, value judgments, or unverified claims.",
      distractorNotes: "A and D are subjective opinions. C is an unverified assumption."
    },
    {
      id: "ps_a2",
      question: "Statement: 'The institute should replace all textbooks with PDF tablets because digital reading improves learning.' What is the underlying UNSTATED ASSUMPTION?",
      options: [
        "A) PDF tablets are manufactured overseas.",
        "B) Students will use the tablets strictly for studying rather than gaming, and digital screens will not cause visual fatigue that impairs reading.",
        "C) Textbooks will be completely illegal next year.",
        "D) No student in the institute currently owns a smartphone."
      ],
      correctAnswer: "B",
      explanation: "The conclusion relies on the assumption that digital reading actually produces better learning outcomes without introducing distractions or fatigue.",
      distractorNotes: "A is an irrelevant manufacturing detail. C and D are extreme factual absurdities."
    },
    {
      id: "ps_a3",
      question: "Consider this argument: 'Premise 1: All full-stack developers know JavaScript. Premise 2: Swetha is a full-stack developer. Conclusion: Swetha knows JavaScript.' Which term best describes this argument?",
      options: [
        "A) A weak inductive hypothesis",
        "B) A deductively valid and sound argument",
        "C) A circular logical fallacy",
        "D) An unsupported personal opinion"
      ],
      correctAnswer: "B",
      explanation: "If both premises are true, the conclusion is guaranteed by mathematical necessity. Because the premises are also factually true in software engineering, the argument is both valid and sound.",
      distractorNotes: "A is wrong because this is deduction, not induction. C and D misunderstand the formal logic structure."
    },
    {
      id: "ps_a4",
      question: "What is the primary danger of accepting an 'Unverified Assumption' as a proven fact during workplace decision-making?",
      options: [
        "A) It makes project meetings finish too quickly.",
        "B) It leads teams to allocate budgets and design solutions for problems that do not exist, or rely on mechanisms that fail in reality.",
        "C) It automatically invalidates the company's trade license.",
        "D) It forces all employees to retake high school mathematics."
      ],
      correctAnswer: "B",
      explanation: "Assumptions accepted without verification cause teams to invest money, time, and engineering effort on false premises.",
      distractorNotes: "A, C, and D are frivolous and incorrect."
    },
    {
      id: "ps_a5",
      question: "Which of the following sentences expresses an OPINION?",
      options: [
        "A) 'The course fee for the Web Development program is ₹12,000.'",
        "B) 'The Python course syllabus consists of 6 modules and 2 capstone projects.'",
        "C) 'Writing code in dark mode is aesthetically superior and creates a more professional ambiance.'",
        "D) 'The final examination duration is 120 minutes.'"
      ],
      correctAnswer: "C",
      explanation: "Aesthetic preference ('superior', 'more professional') cannot be measured or proven true objectively; it is a subjective opinion.",
      distractorNotes: "A, B, and D are verifiable factual statements about course policies."
    }
  ]
};

export const practiceSetB = {
  id: "set_b",
  title: "Practice Set B: Evaluating Arguments & Hidden Assumptions",
  subtitle: "Testing Relevance, Soundness, and the Negation Test",
  timeLimitSeconds: 480, // 8 minutes
  questions: [
    {
      id: "ps_b1",
      question: "Statement: 'We must switch our student code editor from VS Code to a simple command-line text editor because professional Linux kernel developers use command-line editors.' Why is this argument WEAK?",
      options: [
        "A) It commits a false analogy by assuming beginner students have the same operational requirements and workflow needs as veteran operating-system kernel engineers.",
        "B) Because VS Code was invented before Linux.",
        "C) Because text editors cannot run on computers.",
        "D) Because students are not allowed to use keyboards."
      ],
      correctAnswer: "A",
      explanation: "Beginner students benefit from syntax highlighting, visual debuggers, and autocomplete. What fits a kernel developer does not automatically fit a novice learner.",
      distractorNotes: "B is historically false. C and D are nonsensical."
    },
    {
      id: "ps_b2",
      question: "Apply the NEGATION TEST: Argument: 'Karthik finished his final year project in 3 days; therefore, his project code must be terrible.' Which negated assumption destroys this argument?",
      options: [
        "A) Karthik has never used a computer before.",
        "B) It is possible for a skilled, focused developer to write high-quality code in 3 days.",
        "C) 3 days is equal to 72 hours.",
        "D) Other students took 3 months."
      ],
      correctAnswer: "B",
      explanation: "If it is indeed possible to write high-quality code in 3 days (negation), the conclusion that Karthik's code MUST be terrible falls apart.",
      distractorNotes: "A is extreme. C is unit conversion. D is irrelevant background."
    },
    {
      id: "ps_b3",
      question: "A training center director argues: 'We should not hire Instructor Arun because he previously worked at a competitor institute, and our competitors are dishonest.' Which error does this argument commit?",
      options: [
        "A) Guilt by Association / Ad Hominem: attacking the past employer rather than evaluating Arun's personal teaching competence, subject knowledge, and student reviews.",
        "B) Mathematical calculation error.",
        "C) Necessary condition violation.",
        "D) Modus tollens deduction."
      ],
      correctAnswer: "A",
      explanation: "The argument attacks the competitor rather than Arun's qualifications, assuming guilt by past association.",
      distractorNotes: "B, C, and D are irrelevant logic categories."
    },
    {
      id: "ps_b4",
      question: "Which of the following arguments is DEDUCTIVELY VALID?",
      options: [
        "A) Premise 1: Some coders drink tea. Premise 2: Some tea drinkers exercise. Conclusion: Therefore, all coders exercise.",
        "B) Premise 1: If a student submits all homework, they pass the course. Premise 2: Deepa passed the course. Conclusion: Therefore, Deepa submitted all homework.",
        "C) Premise 1: All relational databases use SQL. Premise 2: PostgreSQL is a relational database. Conclusion: Therefore, PostgreSQL uses SQL.",
        "D) Premise 1: Most computers are fast. Premise 2: My phone is a computer. Conclusion: Therefore, my phone is the fastest computer in the world."
      ],
      correctAnswer: "C",
      explanation: "C follows the airtight syllogism: All A are B; C is an A; therefore C is B. B commits the fallacy of affirming the consequent (Deepa could pass by acing the final exam).",
      distractorNotes: "A draws 'all' from 'some'. B reverses conditional. D is an extreme leap."
    },
    {
      id: "ps_b5",
      question: "Statement: 'The government should mandate that all college students complete an internship because internships provide real-world industry experience.' What hidden assumption is required?",
      options: [
        "A) There are sufficient industry companies willing and capable of offering meaningful, supervised internships to every single enrolled student in the country.",
        "B) College degrees will be abolished next year.",
        "C) Students never study during internships.",
        "D) All internships are 10 years long."
      ],
      correctAnswer: "A",
      explanation: "For a national mandate to be feasible and achieve its goal, the private sector must have the capacity to host every student.",
      distractorNotes: "B, C, and D are wild exaggerations."
    }
  ]
};

export const practiceSetC = {
  id: "set_c",
  title: "Practice Set C: Multi-Statement Deductions & Quantifiers",
  subtitle: "Syllogisms, Quantifiers (All, Some, None), and Conditional Logic",
  timeLimitSeconds: 600, // 10 minutes
  questions: [
    {
      id: "ps_c1",
      question: "Statements:\n1. All frontend developers know HTML.\n2. Some frontend developers know TypeScript.\n3. Everyone who knows TypeScript knows JavaScript.\nWhich conclusion MUST be true?",
      options: [
        "A) Everyone who knows HTML knows TypeScript.",
        "B) Some frontend developers know JavaScript.",
        "C) All JavaScript developers know HTML.",
        "D) No frontend developer knows Python."
      ],
      correctAnswer: "B",
      explanation: "Some frontend developers know TypeScript (Premise 2). All who know TypeScript know JavaScript (Premise 3). Therefore, those frontend developers necessarily know JavaScript.",
      distractorNotes: "A treats 'some' as 'all'. C reverses implication. D introduces Python with zero evidence."
    },
    {
      id: "ps_c2",
      question: "Statements:\n1. No student in the Python batch is under 18 years old.\n2. Vijay is 17 years old.\nWhat conclusion logically follows?",
      options: [
        "A) Vijay is enrolled in the Java batch.",
        "B) Vijay is not a student in the Python batch.",
        "C) Vijay will enroll in the Python batch next year.",
        "D) Vijay does not know how to write code."
      ],
      correctAnswer: "B",
      explanation: "Since ALL students in Python must be ≥18, anyone under 18 cannot be in the Python batch. Vijay is 17; therefore, Vijay is not in the Python batch.",
      distractorNotes: "A, C, and D make unsupported assertions beyond the premises."
    },
    {
      id: "ps_c3",
      question: "What is the logical translation of: 'Only students with valid ID cards may enter the computer laboratory'?",
      options: [
        "A) If you enter the computer laboratory, you must possess a valid ID card.",
        "B) Every person with a valid ID card will definitely enter the computer laboratory.",
        "C) Students without ID cards are expelled from the institute.",
        "D) The laboratory is closed on weekends."
      ],
      correctAnswer: "A",
      explanation: "'Only A are B' means B → A. If you enter the lab, you must have an ID card. It does NOT mean everyone with an ID will enter.",
      distractorNotes: "B confuses necessary with sufficient. C and D are unstated."
    },
    {
      id: "ps_c4",
      question: "Statements:\n1. All senior engineers are mentors.\n2. Some mentors are authors.\nCan we validly conclude: 'Some senior engineers are authors'?",
      options: [
        "A) Yes, it is 100% deductively certain.",
        "B) No, it might be true, but it does not necessarily follow from the premises (the authors could be mentors who are not senior engineers).",
        "C) Yes, because senior engineers always write books.",
        "D) No, because senior engineers are never authors."
      ],
      correctAnswer: "B",
      explanation: "The subset of mentors who are authors might have zero overlap with the subset of mentors who are senior engineers. It MIGHT be true, but is not guaranteed.",
      distractorNotes: "A commits the quantifier fallacy. C and D make dogmatic assertions."
    },
    {
      id: "ps_c5",
      question: "Statement: 'Unless a candidate scores 80% or higher on the aptitude test, they will not be invited to the technical interview.' Candidate Sneha was invited to the technical interview. What MUST be true?",
      options: [
        "A) Sneha scored 80% or higher on the aptitude test.",
        "B) Sneha scored exactly 80%.",
        "C) Sneha has 5 years of software experience.",
        "D) Sneha was the highest scorer in the state."
      ],
      correctAnswer: "A",
      explanation: "The rule states that scoring ≥80% is a necessary condition for an interview. Because Sneha received an interview, she must have met the necessary condition (scored ≥80%).",
      distractorNotes: "B is overly specific. C and D are unmentioned speculations."
    }
  ]
};

// ==========================================
// 7. REAL-WORLD CASE STUDY (PART 1)
// ==========================================

export const caseStudyData = {
  title: "Case Study: Deconstructing Claims & Exposing Hidden Assumptions",
  subtitle: "Part 1: The 'Guaranteed Placement' Claim Breakdown",
  context: "A commercial coding institute published an advertisement in education magazines: 'Join our 12-Week Full-Stack Coding Bootcamp! 94% of our graduates get placed in top IT firms within 30 days of graduation. Therefore, enrolling in our bootcamp guarantees you will become a high-earning software engineer!'",
  claimBreakdown: [
    { component: "Premise 1", text: "94% of graduates are placed in IT firms within 30 days." },
    { component: "Conclusion 1", text: "Enrolling in this bootcamp guarantees you will become a software engineer." },
    { component: "Conclusion 2", text: "You will earn a high salary." }
  ],
  tasks: [
    {
      id: 1,
      prompt: "1. Distinguish the stated FACT from the unverified ASSUMPTIONS in the advertisement.",
      hint: "Is the 94% placement an audited fact or an unverified marketing metric? What is assumed about enrollment vs graduation?"
    },
    {
      id: 2,
      prompt: "2. Identify the critical difference between 'Enrolling in the bootcamp' and 'Graduating from the bootcamp'.",
      hint: "What if 100 students enroll, but 70 drop out due to extreme pace, and 94% of the remaining 30 get placed?"
    },
    {
      id: 3,
      prompt: "3. Identify at least two hidden assumptions required for the conclusion 'You will become a high-earning engineer' to hold.",
      hint: "Does every IT job pay a high salary? Does every student have the baseline dedication to complete projects?"
    },
    {
      id: 4,
      prompt: "4. Apply the Negation Test to the claim: 'The bootcamp instruction caused the 94% placement rate.'",
      hint: "What if the bootcamp only admits candidates who already have Computer Science engineering degrees?"
    },
    {
      id: 5,
      prompt: "5. Write a balanced, logically sound version of the advertisement that does not overstate the evidence.",
      hint: "Focus on graduate outcomes without making absolute guarantees to prospective enrollees."
    }
  ],
  modelAnswer: {
    factsVsAssumptions: "Claimed Fact: 94% of graduates get placed within 30 days (needs independent audit verification). Core Assumptions: 1) Every enrolled student will graduate; 2) The placement rate was caused by the curriculum rather than pre-existing student talent; 3) All placements are high-earning software engineering roles.",
    enrollmentVsGraduationGap: "The advertisement commits a classic Survivorship Bias fallacy. If 100 students enroll, 60 drop out, and only 40 graduate, then 94% of 40 = ~38 students placed. The true placement rate among enrollees would be only 38%, not 94%!",
    hiddenAssumptions: "Assumption A: The jobs obtained are high-paying software developer roles (many could be low-wage tech support or data entry). Assumption B: The prospective applicant possesses the baseline aptitude, English fluency, and logical reasoning needed to pass the rigorous course.",
    negationTest: "Negation: 'Graduates would have been hired by IT firms even without this bootcamp (e.g. because they already hold B.E. Computer Science degrees and passed campus interviews).' If true, the bootcamp adds minimal causal value.",
    soundRevision: "'In our previous cohort, 94% of students who successfully completed all projects and graduated were placed in IT roles within 30 days. Prior programming knowledge, daily lab practice, and interview preparation are essential to achieve these results.'"
  }
};

// ==========================================
// 8. COMMON MISTAKES AND STRATEGIES
// ==========================================

export const commonMistakes = [
  {
    mistake: "Confusing an Assumption with a Fact",
    whyItHappens: "Treating unverified assertions as established truths simply because they sound familiar or align with personal beliefs.",
    correction: "Always ask: 'Can this statement be checked against audited empirical records right now?' If not, it is an assumption."
  },
  {
    mistake: "Treating 'Some' as 'All'",
    whyItHappens: "Observing a subset of a group and unconsciously generalizing the trait to the entire population.",
    correction: "In formal logic, 'Some' means at least one; it never guarantees the entire group shares the property."
  },
  {
    mistake: "Accepting a Conclusion Because it Sounds Plausible",
    whyItHappens: "Judging the conclusion by its standalone real-world appeal rather than checking whether the stated premises actually prove it.",
    correction: "Separate truth from validity: Even a true statement is an INVALID deduction if the premises do not mathematically entail it."
  },
  {
    mistake: "Reversing Conditional Statements (Affirming the Consequent)",
    whyItHappens: "Assuming that 'If A, then B' means 'If B, then A'.",
    correction: "Remember: 'If it rains, the grass is wet' does NOT mean 'If the grass is wet, it must have rained' (a sprinkler could have caused it!)."
  },
  {
    mistake: "Drawing Conclusions Beyond the Stated Premises",
    whyItHappens: "Importing outside background knowledge into a formal deduction puzzle where only the stated rules are allowed.",
    correction: "Treat the given statements as the entire universe of truth; never introduce unstated external assumptions."
  }
];

export const practicalChecklist = [
  "1. What exactly is the author's primary conclusion?",
  "2. What explicit premises and evidence are provided to support it?",
  "3. Are the premises verifiable facts, or subjective opinions?",
  "4. What unstated hidden assumptions must be true for the argument to hold?",
  "5. If I negate the primary assumption, does the conclusion collapse?",
  "6. Does the conclusion follow by deductive necessity, or does it overreach beyond the evidence?"
];

// ==========================================
// 9. FINAL ASSESSMENT (20 ADVANCED QUESTIONS)
// ==========================================

export const finalAssessmentQuestions = [
  // ------------------------------------------
  // EASY LEVEL (QUESTIONS 1 - 7)
  // ------------------------------------------
  {
    id: "fa_q1",
    level: "Easy",
    domain: "Facts vs Opinions",
    question: "Which of the following is an objective, verifiable FACT?",
    options: [
      "A) Python code is much more enjoyable to read than Java code.",
      "B) The Linux kernel was initially released by Linus Torvalds in 1991.",
      "C) Every software engineer should learn functional programming.",
      "D) Front-end development is less challenging than back-end engineering."
    ],
    correctAnswer: "B",
    explanation: "Linus Torvalds released the initial Linux kernel in 1991; this is an audited historical fact. A, C, and D are personal opinions or value judgments.",
    distractorNotes: "A and D are subjective opinions. C is a normative recommendation."
  },
  {
    id: "fa_q2",
    level: "Easy",
    domain: "Hidden Assumptions",
    question: "Statement: 'We should hire Karthik as our software instructor because he worked at Google for 5 years.' What is the underlying hidden assumption?",
    options: [
      "A) Google is located in Mountain View, California.",
      "B) Having worked as a software engineer at Google guarantees that a person has the pedagogical and communication ability to teach students effectively.",
      "C) Karthik does not want to work at Google anymore.",
      "D) All software instructors must have worked at Google."
    ],
    correctAnswer: "B",
    explanation: "The conclusion relies on the bridge that engineering experience at Google directly translates into teaching competence.",
    distractorNotes: "A is geographical fact. C is irrelevant motive. D is an extreme requirement."
  },
  {
    id: "fa_q3",
    level: "Easy",
    domain: "Argument Analysis",
    question: "What is a 'Premise' in a logical argument?",
    options: [
      "A) The final claim that the speaker is trying to convince the audience to accept",
      "B) A supporting statement or piece of evidence offered to establish or justify the conclusion",
      "C) A personal insult directed at an opponent",
      "D) An unrelated topic introduced to distract listeners"
    ],
    correctAnswer: "B",
    explanation: "A premise is a proposition offered as evidence or justification for a conclusion.",
    distractorNotes: "A defines the conclusion. C defines ad hominem. D defines red herring."
  },
  {
    id: "fa_q4",
    level: "Easy",
    domain: "Deductive Logic",
    question: "Statements:\n1. All cats are felines.\n2. All felines are mammals.\nWhat conclusion necessarily follows?",
    options: [
      "A) All mammals are cats.",
      "B) All cats are mammals.",
      "C) Some cats are not mammals.",
      "D) No cat is a feline."
    ],
    correctAnswer: "B",
    explanation: "Standard categorical syllogism (Hypothetical Syllogism): All A are B, and All B are C; therefore, All A are C.",
    distractorNotes: "A reverses the quantifier. C and D directly contradict the premises."
  },
  {
    id: "fa_q5",
    level: "Easy",
    domain: "Formal Quantifiers",
    question: "In formal logic, what does the statement 'Some students in the class passed the examination' mathematically imply?",
    options: [
      "A) Exactly 50% of the students passed.",
      "B) At least one student in the class passed the examination.",
      "C) Exactly half of the students failed.",
      "D) Every single student in the class failed."
    ],
    correctAnswer: "B",
    explanation: "In formal deductive logic, 'Some' means 'at least one' (and potentially all, unless restricted).",
    distractorNotes: "A and C assume arbitrary percentages. D is the exact opposite."
  },
  {
    id: "fa_q6",
    level: "Easy",
    domain: "Conclusions vs Evidence",
    question: "In the sentence: 'Because inflation reached 7% and raw material costs doubled, the manufacturing company raised product prices by 15%,' what is the CONCLUSION?",
    options: [
      "A) Inflation reached 7%.",
      "B) Raw material costs doubled.",
      "C) The manufacturing company raised product prices by 15%.",
      "D) Global economics is unpredictable."
    ],
    correctAnswer: "C",
    explanation: "The price increase is the derived action/claim (conclusion), supported by the premises of 7% inflation and doubled raw material costs.",
    distractorNotes: "A and B are premises. D is unmentioned."
  },
  {
    id: "fa_q7",
    level: "Easy",
    domain: "Assumption Identification",
    question: "An advertisement states: 'Switch to Alpha Fly's automated typing tutor and double your typing speed in 14 days!' What assumption is made?",
    options: [
      "A) Every person who uses the software has two hands and a computer.",
      "B) The software's exercises are effective, and users will practice consistently as required to achieve the speed increase.",
      "C) Typing speed has no impact on computer programming.",
      "D) Text keyboards will be obsolete in 14 days."
    ],
    correctAnswer: "B",
    explanation: "The promised result assumes both that the software's pedagogical method works and that users put in the requisite practice.",
    distractorNotes: "A is physical hardware context. C and D contradict the premise."
  },

  // ------------------------------------------
  // MEDIUM LEVEL (QUESTIONS 8 - 14)
  // ------------------------------------------
  {
    id: "fa_q8",
    level: "Medium",
    domain: "Conditional Reasoning",
    question: "Rule: 'If a student achieves 90% or higher, they receive an automatic scholarship.'\nFact: 'Pooja did NOT receive an automatic scholarship.'\nWhat can be deduced with absolute certainty?",
    options: [
      "A) Pooja scored below 90%.",
      "B) Pooja scored exactly 89%.",
      "C) Pooja was expelled from the institute.",
      "D) Pooja will never receive any scholarship."
    ],
    correctAnswer: "A",
    explanation: "Modus Tollens: If P → Q, then Not Q → Not P. Since Pooja did not receive the scholarship (Not Q), she could not have scored 90% or higher (Not P).",
    distractorNotes: "B is overly specific. C and D make wild speculations."
  },
  {
    id: "fa_q9",
    level: "Medium",
    domain: "Negation Test Application",
    question: "Argument: 'Alpha Fly Computer Education should open a branch in City X because City X has 5 engineering colleges.'\nWhich candidate assumption passes the Negation Test?",
    options: [
      "A) Engineering college students in City X have an interest in supplementary technical skills and would consider enrolling at Alpha Fly.",
      "B) City X is the largest city in the state.",
      "C) All 5 engineering colleges teach the exact same courses.",
      "D) Alpha Fly already owns buildings in City X."
    ],
    correctAnswer: "A",
    explanation: "Negate A: 'Engineering students in City X have NO interest in supplementary skills and will NOT enroll.' If this is true, opening a branch is useless! The conclusion collapses; thus A is necessary.",
    distractorNotes: "B, C, and D do not destroy the argument if negated."
  },
  {
    id: "fa_q10",
    level: "Medium",
    domain: "Syllogism Analysis",
    question: "Statements:\n1. All data scientists are proficient in statistics.\n2. Some software engineers are data scientists.\nWhich conclusion necessarily follows?",
    options: [
      "A) All software engineers are proficient in statistics.",
      "B) Some software engineers are proficient in statistics.",
      "C) No software engineer is proficient in statistics.",
      "D) All persons proficient in statistics are software engineers."
    ],
    correctAnswer: "B",
    explanation: "The software engineers who are also data scientists must, by Premise 1, be proficient in statistics. Therefore, 'Some software engineers are proficient in statistics' MUST be true.",
    distractorNotes: "A leaps to 'All'. C contradicts the overlap. D reverses the category."
  },
  {
    id: "fa_q11",
    level: "Medium",
    domain: "Relevance of Evidence",
    question: "A company proposes: 'We must replace our relational SQL database with a NoSQL database to improve developer productivity.' Which of the following pieces of evidence is most directly RELEVANT to evaluating this proposal?",
    options: [
      "A) NoSQL databases are heavily discussed on social media podcasts.",
      "B) The company's data model consists of rapidly evolving, nested document structures that require expensive schema migrations in SQL.",
      "C) Relational databases were originally invented in the 1970s.",
      "D) The NoSQL vendor's sales representative is a polite person."
    ],
    correctAnswer: "B",
    explanation: "Rapidly evolving nested schemas directly address why NoSQL improves developer velocity versus relational schemas. A, C, and D are irrelevant or fallacious.",
    distractorNotes: "A is appeal to popularity. C is chronological snobbery. D is ad hominem/favoritism."
  },
  {
    id: "fa_q12",
    level: "Medium",
    domain: "Unsupported Deductions",
    question: "Statements:\n1. All members of the Cyber Security Club have passed the Networking exam.\n2. Naveen has passed the Networking exam.\nCan we validly conclude that Naveen is a member of the Cyber Security Club?",
    options: [
      "A) Yes, because Premise 1 states all members passed the exam.",
      "B) No, this commits the fallacy of Affirming the Consequent; many students who passed the Networking exam might not belong to the Cyber Security Club.",
      "C) Yes, because Networking and Cyber Security are identical.",
      "D) No, because Naveen is an intern."
    ],
    correctAnswer: "B",
    explanation: "'All Members passed' means Member → Passed. Naveen passed (consequent is true), which does not prove he is a member (antecedent).",
    distractorNotes: "A commits the converse fallacy. C is false. D introduces unmentioned facts."
  },
  {
    id: "fa_q13",
    level: "Medium",
    domain: "Quantifier Translation",
    question: "Which of the following statements is logically equivalent to: 'No student who failed the midterm exam is eligible for the honors scholarship'?",
    options: [
      "A) Every student who failed the midterm exam is eligible for the honors scholarship.",
      "B) If a student is eligible for the honors scholarship, they did not fail the midterm exam.",
      "C) All students who passed the midterm exam will receive the honors scholarship.",
      "D) Midterm exams are the only exams in the course."
    ],
    correctAnswer: "B",
    explanation: "If Failed → Not Eligible, then by Contrapositive: Eligible → Not Failed (Did not fail the midterm).",
    distractorNotes: "A is the opposite. C assumes passing guarantees scholarship (sufficient vs necessary). D is unstated."
  },
  {
    id: "fa_q14",
    level: "Medium",
    domain: "Evaluating Argument Strength",
    question: "Debate topic: 'Should software companies require developers to work in the physical office 5 days a week?'\nWhich of the following represents the WEAKEST argument?",
    options: [
      "A) 'Yes, because in-person whiteboarding sessions reduce architectural miscommunications by 35% according to team sprint logs.'",
      "B) 'No, because remote work allows companies to recruit top specialized talent from anywhere in the country without relocation costs.'",
      "C) 'Yes, because my grandfather worked in a physical office for 40 years and people today are just lazy.'",
      "D) 'No, because eliminating daily 2-hour commutes gives engineers more rest and reduces code defect rates.'"
    ],
    correctAnswer: "C",
    explanation: "C relies on anecdotal tradition, generational bias, and emotional insults, making it logically vacuous and irrelevant.",
    distractorNotes: "A, B, and D provide substantive operational, logistical, or health-related arguments."
  },

  // ------------------------------------------
  // HARD LEVEL (QUESTIONS 15 - 20)
  // ------------------------------------------
  {
    id: "fa_q15",
    level: "Hard",
    domain: "Complex Syllogisms",
    question: "Statements:\n1. All certified AI developers understand calculus.\n2. No one who understands calculus makes basic arithmetic errors in financial modeling.\n3. Some Python learners make basic arithmetic errors in financial modeling.\nWhich conclusion MUST be true?",
    options: [
      "A) All Python learners do not understand calculus.",
      "B) Some Python learners are not certified AI developers.",
      "C) No certified AI developer understands Python.",
      "D) Everyone who makes arithmetic errors is a Python learner."
    ],
    correctAnswer: "B",
    explanation: "Those Python learners who make arithmetic errors cannot understand calculus (Premise 2). Since they do not understand calculus, they cannot be certified AI developers (Premise 1). Therefore, SOME Python learners are definitely NOT certified AI developers.",
    distractorNotes: "A generalizes from 'some' to 'all'. C and D are baseless claims."
  },
  {
    id: "fa_q16",
    level: "Hard",
    domain: "Complex Assumption Analysis",
    question: "An education consultant argues: 'Institutes that use automated grading software for student programming assignments will see an increase in student enrollment because students prefer receiving immediate feedback on their code within 5 seconds instead of waiting 5 days for a human instructor to grade it.'\nWhich of the following is an essential hidden assumption?",
    options: [
      "A) Human instructors refuse to grade programming assignments.",
      "B) The automated grading software can evaluate code accuracy and edge cases with sufficient reliability that students trust the automated feedback.",
      "C) All automated software runs on open-source Linux servers.",
      "D) Human instructors are more expensive than software licenses."
    ],
    correctAnswer: "B",
    explanation: "For immediate automated feedback to attract students, the feedback must actually be accurate and trusted. If the auto-grader generates false errors, students will become frustrated and drop out, disproving the conclusion.",
    distractorNotes: "A is extreme. C is a technical irrelevance. D is a cost argument not stated in the pedagogical reasoning."
  },
  {
    id: "fa_q17",
    level: "Hard",
    domain: "Multi-Premise Deduction Chain",
    question: "Statements:\n1. An employee is assigned to Project Titan ONLY IF they have security clearance Level 3.\n2. All security clearance Level 3 holders have completed background verification.\n3. Maya has NOT completed background verification.\nWhat can be deduced?",
    options: [
      "A) Maya has security clearance Level 3.",
      "B) Maya is assigned to Project Titan.",
      "C) Maya is NOT assigned to Project Titan.",
      "D) Maya will complete background verification tomorrow."
    ],
    correctAnswer: "C",
    explanation: "Titan → Level 3 → Background Verification. Since Maya has NOT completed Background Verification, by contrapositive she does not have Level 3, and therefore cannot be assigned to Project Titan.",
    distractorNotes: "A and B directly contradict the contrapositive chain. D is a speculation about the future."
  },
  {
    id: "fa_q18",
    level: "Hard",
    domain: "Distinguishing What Must Be True",
    question: "Statements:\n1. All successful algorithms are efficient.\n2. Some sorting algorithms are successful.\n3. Some searching algorithms are efficient.\nWhich of the following MUST be true?",
    options: [
      "A) All searching algorithms are successful.",
      "B) Some sorting algorithms are efficient.",
      "C) All efficient algorithms are sorting algorithms.",
      "D) No searching algorithm is a sorting algorithm."
    ],
    correctAnswer: "B",
    explanation: "Some sorting algorithms are successful (Premise 2). All successful algorithms are efficient (Premise 1). Therefore, those successful sorting algorithms MUST be efficient.",
    distractorNotes: "A and C overreach. D is unstated."
  },
  {
    id: "fa_q19",
    level: "Hard",
    domain: "Evaluating Argument Soundness",
    question: "Argument: 'Premise 1: Any student who scores 100% on every test is a genius. Premise 2: A computer can score 100% on every multiple-choice test. Conclusion: Therefore, a computer is a genius.'\nWhy is this argument flawed?",
    options: [
      "A) It commits the Fallacy of Equivocation by treating 'genius' (human cognitive insight, creativity, and wisdom) as merely equivalent to mechanical pattern matching and data retrieval.",
      "B) Because multiple-choice tests are illegal in colleges.",
      "C) Because computers do not have electricity.",
      "D) Because Premise 2 is impossible."
    ],
    correctAnswer: "A",
    explanation: "The term 'genius' shifts meaning from human high intellect to mechanical information recall (Equivocation).",
    distractorNotes: "B, C, and D are factually absurd."
  },
  {
    id: "fa_q20",
    level: "Hard",
    domain: "Holistic Critical Thinking Synthesis",
    question: "Which of the following best reflects the core principle of advanced deductive critical thinking?",
    options: [
      "A) Trusting whatever conclusion feels most comforting or aligns with tradition.",
      "B) Rigorously ensuring that conclusions are strictly entailed by true premises, unstated assumptions are exposed and tested, and correlation is never confused with causation.",
      "C) Assuming that whenever two events happen together, the first one must have caused the second one.",
      "D) Accepting any argument as long as the speaker has a prestigious university title."
    ],
    correctAnswer: "B",
    explanation: "Advanced critical thinking demands deductive rigor, exposing hidden premises, and distinguishing correlation from true causation.",
    distractorNotes: "A, C, and D describe cognitive fallacies (appeal to comfort, false cause, appeal to authority)."
  }
];

// ==========================================
// 10. REVISION & CHECKLIST CHEAT SHEET
// ==========================================

export const revisionCheatSheet = {
  title: "Day 12 Revision: Critical Thinking & Deduction Cheat Sheet",
  corePrinciples: [
    { title: "Facts vs Opinions vs Assumptions", desc: "Facts are audited and verifiable. Opinions are personal value judgments. Assumptions are unstated premises taken for granted." },
    { title: "The Negation Test", desc: "Negate the candidate assumption. If the argument's conclusion collapses, the assumption was genuine and necessary." },
    { title: "Deductive Validity", desc: "If all premises are true, the conclusion MUST be true. Validity is about structure, not factuality." },
    { title: "Soundness = Valid + True", desc: "An argument is sound only when its logic is valid AND all its premises are factually accurate in the real world." },
    { title: "Quantifiers in Deduction", desc: "'All' does not reverse. 'Some' means at least one. 'Only A are B' means All B are A." },
    { title: "Never Assume Beyond Premises", desc: "Do not import external real-world knowledge into a formal logic deduction puzzle." }
  ],
  criticalThinkingChecklist: [
    "1. What exactly is being claimed by the author?",
    "2. What empirical evidence supports the claim?",
    "3. What hidden assumptions are being taken for granted?",
    "4. Does the conclusion follow by logical necessity, or does it overreach?",
    "5. Have I separated verifiable facts from subjective opinions?",
    "6. What evidence would prove this argument false?"
  ]
};
