// ==========================================
// ALPHA FLY LOGICAL REASONING - LEVEL 3 (ADVANCED)
// DAY 1: ADVANCED CRITICAL THINKING AND LOGICAL DEDUCTION
// Evaluate Arguments, Hidden Assumptions, Deductions, and Fallacies
// ==========================================

export const day1Overview = {
  courseName: "Logical Reasoning",
  level: "Level 3 – Advanced",
  dayNumber: 1,
  title: "Advanced Critical Thinking and Logical Deduction",
  subtitle: "Evaluate Arguments, Hidden Assumptions, Deductions, and Fallacies",
  targetAudience: "College students, job seekers, placement candidates, competitive examination learners, and working professionals.",
  language: "Simple English with clear, detailed explanations.",
  difficulty: "Advanced",
  estimatedMinutes: 70,
  description: "Master rigorous cognitive reasoning: learn how to dissect complex multi-premise arguments, expose unstated hidden assumptions, evaluate deductive validity vs. inductive strength, navigate formal necessary and sufficient conditionals, isolate contradictions, dismantle 8 major logical fallacies, and distinguish genuine causation from misleading correlation.",
  learningObjectives: [
    "Analyze complex multi-sentence arguments systematically into premises, evidence, and conclusions.",
    "Distinguish rigorously between verifiable facts, subjective opinions, unstated assumptions, and derived conclusions.",
    "Identify hidden assumptions required for an argument's conclusion to logically hold.",
    "Evaluate the logical strength, relevance, and deductive validity of competing arguments.",
    "Combine multiple relational statements to draw airtight logical deductions (all, some, none, unless, if-then).",
    "Identify contradictions, mutual inconsistencies, and conflicting operational data.",
    "Distinguish what MUST be true from what MIGHT be true under strict formal constraints.",
    "Detect and dismantle 8 common logical fallacies (hasty generalization, false cause, ad hominem, false dilemma, etc.).",
    "Apply disciplined critical thinking to aptitude tests, technical interviews, software architecture, and workplace decisions."
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
        question: "3. What evidence would be required to establish a true causal relationship?",
        answer: "A controlled trial where students with identical baseline test scores and study habits are randomly assigned to either mandatory extra practice or no extra practice, with all other variables strictly held constant."
      },
      {
        question: "4. What conclusion can SAFELY and strictly be drawn from the data provided?",
        answer: "There is a positive statistical association between attending extra practice sessions and higher examination scores. However, one cannot guarantee that forcing a low-performing student to attend will raise their score by 13 points."
      }
    ],
    coreElements: [
      { term: "Valid Reasoning", desc: "The logical structure ensures that if the premises are true, the conclusion cannot be false." },
      { term: "Strong Evidence", desc: "Empirical, verifiable, unbiased, and statistically significant data directly relevant to the claim." },
      { term: "Hidden Assumptions", desc: "Unstated premises that the author silently assumes to be true for the conclusion to work." },
      { term: "Alternative Explanations", desc: "Equally plausible hypotheses that explain the observed data without relying on the author's claim." },
      { term: "Unsupported Conclusions", desc: "Claims that leap beyond what the stated evidence actually proves or establishes." }
    ]
  }
};

// ==========================================
// 3. CORE CONCEPTS (8 ADVANCED MODULES)
// ==========================================

export const coreConcepts = {
  concept1: {
    id: "concept1",
    title: "Concept 1: Facts, Opinions, Assumptions, and Conclusions",
    subtitle: "The 4 Essential Building Blocks of Every Argument",
    definitions: [
      {
        term: "Fact",
        meaning: "A statement that can be objectively checked and verified against empirical evidence, records, or direct measurement.",
        test: "Can it be proven true or false with logs, timestamps, certificates, or physical data?",
        example: "'The Python database server logged 1,240 API requests between 10:00 AM and 11:00 AM on Monday.'"
      },
      {
        term: "Opinion",
        meaning: "A subjective belief, value judgment, preference, or emotional feeling that cannot be conclusively proven true or false.",
        test: "Does it contain value-laden words like 'better', 'boring', 'unfair', 'superior', or 'terrible'?",
        example: "'Python is the most elegant and enjoyable programming language ever created.'"
      },
      {
        term: "Assumption",
        meaning: "An unstated premise or claim accepted as true without proof, upon which an argument depends.",
        test: "What must the speaker take for granted for their statement to make sense?",
        example: "'Students who do not enroll in our cloud computing course will struggle to find IT jobs in 2026.'"
      },
      {
        term: "Conclusion",
        meaning: "A claim derived from or justified by one or more supporting premises or evidence.",
        test: "What is the final point the author is trying to convince us of? (Look for 'therefore', 'thus', 'so').",
        example: "'Because server latency exceeded 5 seconds during all three load tests, we must upgrade the RAM before launch.'"
      }
    ],
    eightRealExamples: [
      { domain: "Education", text: "Alpha Fly has trained over 4,500 students in web development since 2018.", category: "Fact", reason: "Directly verifiable through enrollment databases and official certificates." },
      { domain: "Education", text: "Morning batches are much more enjoyable than afternoon batches.", category: "Opinion", reason: "Expresses subjective preference ('enjoyable') that varies across individual students." },
      { domain: "Technology", text: "Cloud databases are always more secure than local on-premise servers.", category: "Assumption", reason: "Assumes cloud configuration is flawless and uncompromised without proof." },
      { domain: "Technology", text: "The code threw an OutOfMemoryError on line 42; therefore, the recursive function lacks a base case.", category: "Conclusion", reason: "Derives a causal deduction based on the observed error trace." },
      { domain: "Business", text: "Monthly student enquiries dropped by 24% following the 50% course fee increase.", category: "Fact", reason: "Recorded numerical metrics documented in accounting and CRM ledgers." },
      { domain: "Business", text: "The marketing director is too stubborn to accept social media feedback.", category: "Opinion", reason: "A subjective personal judgment of personality ('too stubborn')." },
      { domain: "Workplace", text: "If we hire only candidates with 5+ years of experience, our software bug count will drop to zero.", category: "Assumption", reason: "Unproven premise that senior engineers never write software bugs." },
      { domain: "Workplace", text: "Candidate A solved the algorithm in 10 minutes, whereas Candidate B did not finish; thus, Candidate A demonstrated superior problem-solving speed.", category: "Conclusion", reason: "Deduces relative candidate speed directly from timed objective observations." }
    ]
  },

  concept2: {
    id: "concept2",
    title: "Concept 2: Identifying Hidden Assumptions",
    subtitle: "Exposing the Unspoken Foundation of Every Claim",
    theory: "An assumption is the unstated bridge connecting an explicit premise to a conclusion. If the assumption is false, the entire argument collapses. To detect a hidden assumption, ask: 'What MUST be true for this conclusion to follow from the given premise?'",
    negationTest: "The Negation Test: If you negate (reverse) the hidden assumption, does the argument fall apart? If yes, it is a necessary assumption.",
    anchorScenario: {
      statement: "The institute should offer weekend classes because many prospective students have weekday job commitments.",
      premise: "Many prospective students work on weekdays.",
      conclusion: "The institute should offer weekend classes.",
      hiddenAssumptions: [
        "Assumption 1: Prospective students with weekday job commitments are willing and available to attend classes on weekends.",
        "Assumption 2: The institute has available faculty and classroom facilities to conduct weekend batches effectively.",
        "Assumption 3: The revenue generated from weekend students will justify the operational cost of opening the center on Saturdays and Sundays."
      ],
      breakdown: "If prospective students work 6 days a week (including Saturdays) and prefer self-paced evening online videos, opening physical weekend batches will fail completely!"
    },
    fiveWorkedExamples: [
      {
        id: "ha1",
        statement: "We should switch all classroom lectures to recorded video modules to reduce institute electricity bills.",
        hiddenAssumption: "Recorded video modules deliver equivalent or acceptable educational outcomes compared to live classroom teaching.",
        negationImpact: "If students cannot learn programming from recorded videos without live instructor debugging, student dropouts will destroy institute revenue, rendering electricity savings meaningless."
      },
      {
        id: "ha2",
        statement: "Priya completed all 15 Python lab assignments; therefore, she will score above 90% on the theoretical written exam.",
        hiddenAssumption: "Completing hands-on practical lab coding exercises guarantees mastery of theoretical examination questions.",
        negationImpact: "If the written exam tests abstract mathematical proof of algorithm complexity that was not covered in labs, Priya might not score 90%."
      },
      {
        id: "ha3",
        statement: "Company X must be a terrible place to work because three of its software developers resigned last month.",
        hiddenAssumption: "Three developer resignations reflect poor company workplace culture rather than normal career progression, relocation, or contract completions.",
        negationImpact: "If the three developers resigned because their fixed 6-month consulting contracts ended, the resignations indicate zero negative workplace culture."
      },
      {
        id: "ha4",
        statement: "To prevent student assignment cheating, we must install automated plagiarism detection software on the portal.",
        hiddenAssumption: "Students are cheating on assignments by copying digital text from the internet or peers, which software algorithms can detect.",
        negationImpact: "If students cheat by having a private tutor write original custom code for them, plagiarism detection software will find 0% similarity and completely fail."
      },
      {
        id: "ha5",
        statement: "The government should ban mobile phones in all college classrooms because they distract students from listening to professors.",
        hiddenAssumption: "The distractions caused by mobile phones outweigh any potential educational benefits (e.g. digital textbooks, coding sandboxes, calculator apps).",
        negationImpact: "If mobile phones are the only device low-income students have to access online coding compilers in class, banning them will destroy their ability to learn."
      }
    ]
  },

  concept3: {
    id: "concept3",
    title: "Concept 3: Evaluating Arguments",
    subtitle: "Premises, Evidence Relevance, Validity, and Argument Strength",
    anatomy: [
      { component: "Premise", desc: "A foundational statement or fact provided as support or justification." },
      { component: "Inference", desc: "The logical step connecting the premise to the resulting conclusion." },
      { component: "Conclusion", desc: "The primary claim that the author asserts is established by the premises." }
    ],
    strengthCriteria: [
      { criterion: "1. Factual Accuracy", question: "Are the stated premises empirically true and verifiable?" },
      { criterion: "2. Relevancy", question: "Does the evidence directly relate to the specific conclusion being drawn?" },
      { criterion: "3. Sufficiency", question: "Is the evidence substantial enough to justify the conclusion without major leaps?" },
      { criterion: "4. Logical Deductive Validity", question: "Does the conclusion follow inescapably from the premises (if premises are true, conclusion MUST be true)?" }
    ],
    argumentComparisons: [
      {
        type: "Strong Valid Argument",
        premises: "Premise 1: All enrolled Alpha Fly Python students must complete 5 projects to earn a certificate.\nPremise 2: Rahul is an enrolled Alpha Fly Python student who earned his certificate.",
        conclusion: "Therefore, Rahul completed at least 5 projects.",
        evaluation: "VALID & STRONG. The conclusion is an inescapable logical deduction from the premises. There is zero ambiguity."
      },
      {
        type: "Weak Invalid Argument (Affirming the Consequent)",
        premises: "Premise 1: If it rains, the cricket pitch will be wet.\nPremise 2: The cricket pitch is wet.",
        conclusion: "Therefore, it rained.",
        evaluation: "INVALID & WEAK. The pitch could be wet because groundskeepers turned on the water sprinklers, or a pipe leaked. The premise does not state rain is the ONLY cause."
      },
      {
        type: "Weak Irrelevant Evidence Argument",
        premises: "Premise: Dr. Kumar has published 40 research papers in theoretical astrophysics.",
        conclusion: "Therefore, Dr. Kumar's recommendation for our company's accounting software must be the best choice.",
        evaluation: "WEAK & FLAWED. Dr. Kumar's expertise in astrophysics is completely irrelevant to corporate accounting software selection (False Authority fallacy)."
      }
    ]
  },

  concept4: {
    id: "concept4",
    title: "Concept 4: Logical Deduction from Multiple Statements",
    subtitle: "Synthesizing Complex Multi-Variable Premises into Airtight Deductions",
    theory: "Deductive reasoning moves from general rules to specific certainties. When multiple statements interlock, we must combine them systematically using formal Venn intersections or conditional chains without making external assumptions.",
    quantifiersGuide: [
      { term: "All A are B", meaning: "Every single member of set A is inside set B. (If A, then B). Does NOT mean all B are A." },
      { term: "Some A are B", meaning: "At least one member of set A is in set B (1% to 100%). It implies Some B are A." },
      { term: "No A are B", meaning: "Complete mutual exclusion. A and B share zero overlap. (No B are A)." },
      { term: "Only A are B", meaning: "All B are A! (If B, then A). Being A is necessary to be B." }
    ],
    multiStatementDeductions: [
      {
        domain: "Student Enrollment",
        statements: [
          "Statement 1: All students who complete the final capstone project are eligible for campus placement drives.",
          "Statement 2: Some Python Data Science students have completed the final capstone project."
        ],
        validDeduction: "Some Python Data Science students are eligible for campus placement drives.",
        invalidTrap: "Invalid: 'All Python Data Science students are eligible' (Error: 'Some' does not mean 'All')."
      },
      {
        domain: "Software Permissions",
        statements: [
          "Statement 1: Only System Administrators have access to production database credentials.",
          "Statement 2: No Junior Intern is a System Administrator.",
          "Statement 3: Arjun is a Junior Intern."
        ],
        validDeduction: "Arjun does NOT have access to production database credentials.",
        invalidTrap: "Invalid: 'Arjun will never become a System Administrator' (The statements only describe his current status, not future career)."
      },
      {
        domain: "Business Operations",
        statements: [
          "Statement 1: All branch managers must approve purchase orders above ₹10,000.",
          "Statement 2: Purchase Order #402 is for ₹18,500.",
          "Statement 3: Branch Manager Meera rejected Purchase Order #402."
        ],
        validDeduction: "Purchase Order #402 cannot be processed under company policy.",
        invalidTrap: "Invalid: 'Meera rejects all purchase orders' (Generalizing from one single order rejection)."
      }
    ]
  },

  concept5: {
    id: "concept5",
    title: "Concept 5: Necessary and Sufficient Conditions",
    subtitle: "Mastering Formal Conditionals: 'If A, then B' vs. 'A only if B'",
    theory: "Confusing a necessary condition with a sufficient condition is the #1 cause of lost marks in advanced reasoning examinations and flawed technical specifications.",
    comparisonTable: [
      {
        type: "Sufficient Condition",
        meaning: "A condition that GUARANTEES the outcome. If the condition is met, the result must occur.",
        formula: "If A, then B (A → B)",
        example: "Scoring 100% on the exam is sufficient to pass the course."
      },
      {
        type: "Necessary Condition",
        meaning: "A condition that MUST be present for the outcome to even be possible. Without it, the result cannot occur.",
        formula: "B only if A (B → A), or 'If not A, then not B'",
        example: "Submitting an exam paper is necessary to pass the course (you cannot pass without submitting, but submitting alone does not guarantee a passing grade)."
      }
    ],
    fourConditionalPhrases: [
      { phrase: "If A, then B", translation: "A is SUFFICIENT for B. (A → B). If A happens, B definitely happens." },
      { phrase: "A only if B", translation: "B is NECESSARY for A. (A → B). You cannot have A without B." },
      { phrase: "A if B", translation: "B is SUFFICIENT for A. (B → A). If B happens, A happens." },
      { phrase: "A if and only if B (iff)", translation: "Biconditional: A is both necessary AND sufficient for B. (A ↔ B)." }
    ],
    fallacyWarnings: [
      {
        name: "Trap 1: Affirming the Consequent (Converse Error)",
        flawedRule: "Given: 'If you have the flu (A), you have a fever (B)'. Observation: Patient has a fever (B). Flawed Conclusion: 'Patient has the flu!'",
        whyFlawed: "Fever is necessary for flu, but fever can be caused by heat exhaustion, infection, or malaria. B does not prove A."
      },
      {
        name: "Trap 2: Denying the Antecedent (Inverse Error)",
        flawedRule: "Given: 'If you score 100 (A), you pass (B)'. Observation: Student did not score 100 (~A). Flawed Conclusion: 'Student failed!'",
        whyFlawed: "Scoring 100 is sufficient, but scoring 80 or 60 also passes the exam. Not achieving 100 does not imply failing."
      }
    ]
  },

  concept6: {
    id: "concept6",
    title: "Concept 6: Contradictions and Inconsistencies",
    subtitle: "Detecting Mutually Exclusive Claims and Conflicting Evidence",
    theory: "Two statements are contradictory if they cannot both be true and cannot both be false at the same time under identical conditions. Detecting inconsistencies protects software testers, auditors, and detectives from accepting corrupted data.",
    inconsistencyScenarios: [
      {
        domain: "Student Attendance Logs",
        statements: [
          "Log Entry 1: Student Vikram signed the physical attendance sheet in Classroom 3 at 10:15 AM.",
          "Log Entry 2: Vikram's student ID card was swiped at the campus main entry gate (2 km away) at 10:17 AM.",
          "Log Entry 3: Vikram was walking on foot and possesses no vehicle."
        ],
        conflict: "Walking 2 kilometers in 2 minutes is physically impossible (requires a speed of 60 km/h).",
        resolutionNeeded: "Investigate whether another student signed the paper sheet for Vikram (proxy signing) or if the gate clock is unsynchronized."
      },
      {
        domain: "Software System Specifications",
        statements: [
          "Requirement A: All user passwords must be hashed with SHA-256 one-way encryption before storing in the database.",
          "Requirement B: The customer support portal must display the user's original plaintext password so agents can read it back over the phone."
        ],
        conflict: "Requirement A and Requirement B are mutually exclusive. One-way SHA-256 hashing cannot be decrypted back into plaintext.",
        resolutionNeeded: "Redesign Requirement B to implement temporary one-time password (OTP) verification rather than plaintext password display."
      },
      {
        domain: "Financial Report",
        statements: [
          "Report 1: Total hardware sales revenue grew by 20% this quarter.",
          "Report 2: The average price per unit remained unchanged at ₹1,000.",
          "Report 3: The total number of units shipped declined from 500 to 450 units."
        ],
        conflict: "If unit shipments fell from 500 to 450 (-10%) at a fixed ₹1,000 price, revenue MUST have declined from ₹5,00,000 to ₹4,50,000 (-10%). It is mathematically impossible for revenue to grow by 20%.",
        resolutionNeeded: "Audit the accounting ledger for unrecorded revenue streams or mathematical misstatements."
      }
    ]
  },

  concept7: {
    id: "concept7",
    title: "Concept 7: Logical Fallacies and Weak Reasoning",
    subtitle: "Cataloging the 8 Most Common Flaws in Human Reasoning",
    theory: "A logical fallacy is a flaw in an argument's structure or reasoning that renders the conclusion invalid or weak, even if the premise sounds persuasive or emotionally compelling.",
    fallacies: [
      {
        name: "1. Hasty Generalization",
        definition: "Drawing a broad, universal conclusion based on an unrepresentative or tiny sample size.",
        example: "'My cousin studied JavaScript for two days and found it difficult; therefore, nobody can ever learn JavaScript.'",
        weakness: "One person's isolated experience cannot represent the learning capacity of millions of developers.",
        betterWay: "Look at broad statistical distributions and diverse learning data."
      },
      {
        name: "2. False Cause (Post Hoc Ergo Propter Hoc)",
        definition: "Assuming that because Event B occurred after Event A, Event A must have caused Event B.",
        example: "'The institute repainted the main lobby blue on Tuesday. On Wednesday, enrollments doubled. The blue paint increased our sales!'",
        weakness: "Sequence does not equal causation. University final exams may have ended on Tuesday, freeing students to enroll.",
        betterWay: "Investigate whether a plausible causal mechanism and controlled testing link the events."
      },
      {
        name: "3. False Dilemma (Black-and-White Thinking)",
        definition: "Presenting only two extreme alternatives when multiple nuanced options exist.",
        example: "'Either you study 14 hours every single day, or you will fail every exam and end up unemployed.'",
        weakness: "Ignores effective distributed study (3-4 focused hours daily) and varied career paths.",
        betterWay: "Seek middle-ground alternatives, compromises, and hybrid approaches."
      },
      {
        name: "4. Ad Hominem (Personal Attack)",
        definition: "Attacking the character, appearance, or background of the person making an argument instead of addressing the validity of the argument itself.",
        example: "'Rohan's proposal to optimize our database caching algorithm is wrong because he is only 21 years old.'",
        weakness: "Rohan's age has zero mathematical bearing on whether his algorithm reduces server latency.",
        betterWay: "Evaluate the code, benchmarks, and mathematical logic independently of the speaker."
      },
      {
        name: "5. Appeal to Popularity (Bandwagon / Ad Populum)",
        definition: "Arguing that a claim must be true or optimal simply because the majority of people believe or do it.",
        example: "'80% of students in our hostel skip breakfast before exams; therefore, skipping breakfast must be the best exam strategy.'",
        weakness: "Widespread adoption does not make an unhealthy habit physiologically effective.",
        betterWay: "Evaluate claims against medical and cognitive evidence rather than popularity polls."
      },
      {
        name: "6. Circular Reasoning (Begging the Question)",
        definition: "An argument whose conclusion is already assumed or restated as its supporting premise.",
        example: "'Alpha Fly is the greatest computer education institute because it offers superior training, and we know its training is superior because Alpha Fly is the greatest.'",
        weakness: "Provides zero external evidence; merely repeats the original claim using different vocabulary.",
        betterWay: "Supply independent empirical proof (alumni placement rates, curriculum depth, student reviews)."
      },
      {
        name: "7. Straw Man Fallacy",
        definition: "Distorting, exaggerating, or misrepresenting an opponent's argument to make it easier to attack.",
        example: "Student: 'I think we should take a 10-minute break after 2 hours of coding.' Instructor: 'So you want us to completely abandon teaching and shut down the institute!'",
        weakness: "Attacks a ridiculous caricature that the student never suggested.",
        betterWay: "Address the exact words and reasonable intent of the speaker."
      },
      {
        name: "8. Confirmation Bias",
        definition: "Seeking, favoring, and remembering only information that confirms one's pre-existing beliefs while ignoring disconfirming facts.",
        example: "A manager who believes remote workers are lazy notices the one time a remote worker is 5 minutes late to a Zoom call, while ignoring 40 hours of on-time deliveries.",
        weakness: "Selectively filters data, leading to distorted, unfair decisions.",
        betterWay: "Actively search for contradictory evidence and evaluate the complete dataset."
      }
    ]
  },

  concept8: {
    id: "concept8",
    title: "Concept 8: Evidence, Counterarguments, and Alternative Explanations",
    subtitle: "Stress-Testing Claims Through Rival Hypotheses and Counterexamples",
    theory: "Critical thinkers do not accept an explanation simply because it is plausible. They actively generate rival competing explanations, search for counterexamples, and identify what missing evidence would make or break the claim.",
    stressTestingWorkflow: [
      { step: "1. Isolate the Core Claim", desc: "Strip away rhetoric and emotional framing to expose the exact factual relationship claimed." },
      { step: "2. Check for Counterexamples", desc: "Can you find a single case where the premise holds true but the predicted conclusion fails?" },
      { step: "3. Brainstorm Alternative Explanations", desc: "Could confounding factors, reverse causality, or third-party variables explain the outcome?" },
      { step: "4. Identify Falsifying Evidence", desc: "What measurable data point, if discovered, would prove this claim completely false?" }
    ],
    pivotingCaseStudy: {
      headline: "The Case of the Leaping Website Bounce Rate",
      initialObservation: "Alpha Fly's web team notices that bounce rate on the course admissions page jumped from 30% to 65% after launching a new modern UI redesign on Monday.",
      hastyConclusion: "The lead designer panicked: 'Students hate our new color scheme and typography! We must revert to the old UI immediately!'",
      criticalThinkingInvestigation: [
        "Alternative Hypothesis 1: Did mobile traffic increase? (Investigation revealed 80% of traffic on Wednesday was from low-speed 3G mobile connections).",
        "Alternative Hypothesis 2: Did page load speed degrade? (Performance logs showed the new UI included an uncompressed 18 MB background video).",
        "Alternative Hypothesis 3: Did the enrollment form break on specific mobile browsers? (Logs showed 400 errors on Safari mobile)."
      ],
      theRevealedTruth: "The design itself was praised by students; the 65% bounce rate was caused entirely by the 18 MB uncompressed video that took 14 seconds to load on mobile phones!",
      takeaway: "Compressing the video restored the bounce rate to 28% without rolling back the modern design. Jumping to the hasty aesthetic conclusion would have wasted weeks of development work."
    }
  }
};

// ==========================================
// 4. INTERACTIVE CLASSIFICATION WIDGET ITEMS
// ==========================================

export const interactiveClassificationItems = [
  { id: "c1", text: "Alpha Fly Computer Education has 4 physical computer labs with 30 terminals each.", category: "Fact" },
  { id: "c2", text: "Programming in Python is far more rewarding than developing in Java.", category: "Opinion" },
  { id: "c3", text: "Because all 25 students submitted their projects on GitHub on time, every student has mastered version control.", category: "Conclusion" },
  { id: "c4", text: "Students who score below 50% on the midterm will drop out before the final exam.", category: "Assumption" },
  { id: "c5", text: "The institute's electricity tariff increased by ₹1.50 per unit on January 1st.", category: "Fact" },
  { id: "c6", text: "Dark mode color themes are much more professional than light themes.", category: "Opinion" },
  { id: "c7", text: "The network router crashed due to thermal overheating; therefore, we must install an exhaust fan in the server rack.", category: "Conclusion" },
  { id: "c8", text: "Younger instructors naturally possess better rapport with college learners than senior instructors.", category: "Assumption" }
];

// ==========================================
// 5. 10 DETAILED WORKED MASTER EXAMPLES
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
    reasoning: "The conclusion argues that advertising in newspapers will successfully recruit students because newspaper readers value education. For this to work, prospective programming students (or their primary fee-sponsoring parents) must actually read print newspapers. If programming students only browse digital media and never touch newspapers, the campaign fails completely.",
    distractorAnalysis: "Option A is not necessary (it could be expensive but worthwhile). Option C is an extreme overstatement not required for the argument. Option D is an absurd exaggeration."
  },
  {
    id: "ex2",
    title: "Example 2: Evaluating Argument Strength",
    type: "Argument Strength",
    scenario: "Statement: 'Should Alpha Fly replace all written final exams with hands-on coding portfolio reviews?'\n\nArgument 1: Yes, because software tech employers evaluate candidates based on their working code and GitHub repositories rather than handwritten syntax answers.\nArgument 2: No, because handwriting on paper is a centuries-old tradition that builds mental discipline.",
    question: "Evaluate the logical strength of both arguments:",
    options: [
      "A) Only Argument 1 is strong.",
      "B) Only Argument 2 is strong.",
      "C) Both Argument 1 and Argument 2 are strong.",
      "D) Neither Argument 1 nor Argument 2 is strong."
    ],
    correctAnswer: 0, // A
    reasoning: "Argument 1 is strong because it provides a direct, highly relevant link to the educational objective: preparing students for real-world software employer hiring criteria. Argument 2 is weak because it relies purely on an appeal to tradition (Fallacy of Tradition), which is irrelevant to assessing software programming competency.",
    distractorAnalysis: "Argument 2 lacks factual relevance to modern technical job placement standards."
  },
  {
    id: "ex3",
    title: "Example 3: Multi-Statement Logical Deduction",
    type: "Logical Deduction",
    scenario: "Read the following statements carefully:\n1. All students who complete the Advanced Web Development course learn React.\n2. Some students who learn React build full-stack web applications.\n3. Karthik is an Advanced Web Development student who completed the course.",
    question: "Which of the following conclusions MUST be true based solely on the statements above?",
    options: [
      "A) Karthik has built a full-stack web application.",
      "B) Karthik has learned React.",
      "C) All students who build full-stack web applications completed the Advanced Web Development course.",
      "D) Karthik will immediately receive a job offer as a full-stack engineer."
    ],
    correctAnswer: 1, // B
    reasoning: "Statement 1 specifies that completing the course guarantees learning React (All A are B). Statement 3 states Karthik completed the course. Therefore, Karthik definitely learned React (Option B).",
    distractorAnalysis: "Option A is only possible, not certain (Statement 2 states only 'some' React students build full-stack apps). Option C reverses the conditional. Option D introduces external speculation."
  },
  {
    id: "ex4",
    title: "Example 4: Necessary vs. Sufficient Conditions",
    type: "Formal Conditionals",
    scenario: "College Regulation: 'A student will be permitted to sit for the semester examination only if they achieve at least 75% attendance in theory lectures.'",
    question: "Praveen achieved 88% attendance in theory lectures. Which of the following deductions is logically valid?",
    options: [
      "A) Praveen is guaranteed to pass the semester examination.",
      "B) Praveen will definitely be permitted to sit for the semester examination.",
      "C) Praveen has met the attendance prerequisite, but other requirements (like paying exam fees or clearing dues) might still be necessary before permission is granted.",
      "D) Praveen did not need to attend practical lab sessions."
    ],
    correctAnswer: 2, // C
    reasoning: "The phrase 'only if' establishes a NECESSARY condition, not a sufficient one! Achieving 75% attendance is a mandatory gate (without it, you cannot sit). However, satisfying this single necessary condition does not guarantee permission if other conditions (e.g. paying fees, clearing disciplinary holds) also exist.",
    distractorAnalysis: "Option B confuses a necessary condition with a sufficient condition. Option A is an absurd leap. Option D is unsupported."
  },
  {
    id: "ex5",
    title: "Example 5: Conditional Reasoning and Transposition",
    type: "Conditional Reasoning",
    scenario: "Rule: 'If a database query takes longer than 2.0 seconds to execute, the monitoring system logs an alert.'\nObservation: The monitoring system did NOT log an alert for Query #108.",
    question: "What conclusion can be deduced with absolute logical certainty?",
    options: [
      "A) Query #108 took longer than 2.0 seconds.",
      "B) Query #108 executed in 2.0 seconds or less.",
      "C) Query #108 crashed the entire database server.",
      "D) The monitoring system was turned off."
    ],
    correctAnswer: 1, // B
    reasoning: "This is formal Modus Tollens (Proof by Contraposition): If P → Q, then ~Q → ~P. If duration > 2.0s implies Alert, then No Alert implies duration is NOT > 2.0s (i.e. <= 2.0s).",
    distractorAnalysis: "Option A directly contradicts Modus Tollens. Options C and D assume external unmentioned system failures."
  },
  {
    id: "ex6",
    title: "Example 6: Resolving Contradictory Statements",
    type: "Contradiction Resolution",
    scenario: "Four statements regarding the institute's inventory:\nStatement 1: All 50 computer workstations in Lab 1 are in perfect working order.\nStatement 2: Student Ananya could not complete her lab exam because her workstation in Lab 1 failed to boot.\nStatement 3: Ananya was assigned to Workstation #12 in Lab 1.\nStatement 4: Exactly 49 workstations in Lab 1 booted successfully during the exam.",
    question: "Which statement is directly contradictory to Statement 1?",
    options: [
      "A) Statement 3",
      "B) Statements 2 and 4",
      "C) None of the statements conflict",
      "D) Statement 1 contradicts Statement 3 only"
    ],
    correctAnswer: 1, // B
    reasoning: "Statement 1 asserts that ALL 50 workstations are working. Statement 2 (Ananya's workstation failed to boot) and Statement 4 (only 49 workstations booted) directly negate Statement 1. If even one workstation fails to boot, 'All 50 are working' is logically false.",
    distractorAnalysis: "Statement 3 merely identifies which desk was assigned and is not inherently contradictory until combined with Statement 2."
  },
  {
    id: "ex7",
    title: "Example 7: Identifying Logical Fallacies",
    type: "Logical Fallacy",
    scenario: "During a staff meeting, Teacher X suggests: 'We should introduce automated unit tests in our web development course so students learn modern industry testing.'\nTeacher Y responds: 'Teacher X wants us to stop teaching fundamentals and let robots grade our students because he hates reading student code!'",
    question: "Which logical fallacy did Teacher Y commit in his response?",
    options: [
      "A) False Dilemma",
      "B) Straw Man Fallacy",
      "C) Circular Reasoning",
      "D) Hasty Generalization"
    ],
    correctAnswer: 1, // B
    reasoning: "Teacher Y committed the Straw Man Fallacy by distorting and exaggerating Teacher X's proposal (adding unit testing tools) into a ridiculous caricature ('let robots take over because he hates reading student code') to make it easy to attack.",
    distractorAnalysis: "False dilemma involves two extreme choices. Circular reasoning begs the question. Hasty generalization generalizes from a small sample."
  },
  {
    id: "ex8",
    title: "Example 8: Evaluating Cause-and-Effect Claims",
    type: "Cause and Effect",
    scenario: "A software startup instituted a mandatory 15-minute morning standup meeting in September. In October, software bug reports decreased by 30%. The CTO concluded: 'The 15-minute morning standup is directly responsible for reducing software bugs by 30%.'",
    question: "Which piece of additional information would MOST SEVERELY WEAKEN the CTO's causal claim?",
    options: [
      "A) The standup meeting started at 9:30 AM rather than 9:00 AM.",
      "B) In late September, the engineering team hired an external QA testing firm that audited and cleaned the codebase prior to release.",
      "C) Two software developers drank green tea during the meetings.",
      "D) The standup meetings were conducted standing up in the hallway."
    ],
    correctAnswer: 1, // B
    reasoning: "Hiring an external QA firm that thoroughly audited the codebase introduces a massive, undeniable confounding alternative cause that directly explains the drop in bugs, breaking the causal link to the standup meeting.",
    distractorAnalysis: "Meeting start time, beverages, and standing location are trivial, irrelevant cosmetic details."
  },
  {
    id: "ex9",
    title: "Example 9: Identifying Unsupported Conclusions",
    type: "Unsupported Conclusions",
    scenario: "Fact: In a survey of 100 successful full-stack developers, 70 reported that they read programming blogs weekly, and 65 reported that they contribute to open-source GitHub repositories.",
    question: "Which of the following conclusions is UNSUPPORTED by the information provided?",
    options: [
      "A) Some successful full-stack developers read programming blogs weekly.",
      "B) At least 35 of the surveyed developers both read blogs and contribute to open-source repositories.",
      "C) Contributing to open-source GitHub repositories guarantees that a candidate will become a successful full-stack developer.",
      "D) The majority of surveyed developers read programming blogs weekly."
    ],
    correctAnswer: 2, // C
    reasoning: "Option C makes an extreme causal claim of guarantee. The survey shows correlation among existing developers; it does not prove that open-source contributions guarantee career success for any candidate.",
    distractorAnalysis: "Option A is supported (70/100). Option B is mathematically supported (70 + 65 = 135 - 100 = at least 35 overlap). Option D is supported (70% is a majority)."
  },
  {
    id: "ex10",
    title: "Example 10: Comparing Competing Explanations",
    type: "Competing Explanations",
    scenario: "Observation: Student enrollment in the Advanced Java module dropped by 45% this semester compared to last year.\n\nExplanation 1: The course fees were increased by ₹500.\nExplanation 2: The university updated its curriculum to mandate Python for all semester project submissions, reducing student demand for Java.",
    question: "Which principle of critical thinking determines which explanation is more credible and robust?",
    options: [
      "A) Explanations involving money are always 100% correct.",
      "B) We must examine student exit surveys and enrollment trends in other fee-increased courses to determine whether a minor ₹500 fee change or a mandatory university curriculum shift was the primary driver.",
      "C) Explanation 1 must be chosen because it was stated first.",
      "D) Neither explanation should be considered because Java is an old programming language."
    ],
    correctAnswer: 1, // B
    reasoning: "Critical thinking requires testing competing hypotheses against empirical data. A mandatory university curriculum shift directly changes academic necessity (a powerful structural driver), whereas a small ₹500 fee change can be compared against other courses to isolate elasticity.",
    distractorAnalysis: "Options A and C are irrational heuristics. Option D is an emotional subjective dismissal."
  }
];

// ==========================================
// 6. 3 TIMED PROGRESSIVE PRACTICE SETS
// ==========================================

export const practiceSetA = {
  id: "set_a",
  title: "Practice Set A: Critical Thinking Fundamentals",
  subtitle: "Facts, Opinions, Hidden Assumptions, and Supporting Evidence",
  timeLimitSeconds: 360, // 6 minutes
  questions: [
    {
      id: "pa_q1",
      question: "Which of the following statements represents a verifiable FACT rather than an opinion or assumption?",
      options: [
        "A) 'The institute's Saturday Python workshop was highly engaging and intellectually stimulating.'",
        "B) 'Linux is inherently superior to Windows for all serious software developers.'",
        "C) 'The institute's server logs recorded 412 unique IP addresses during the Sunday online mock test.'",
        "D) 'Students who fail to memorize algorithms will never clear technical coding rounds.'"
      ],
      correctAnswer: 2, // C
      explanation: "Server IP records are empirically verifiable through digital log files. The other statements express subjective evaluations or unproven assumptions."
    },
    {
      id: "pa_q2",
      question: "Statement: 'We should install air conditioning in the computer lab so that student programming skills will improve.' What is the underlying hidden assumption?",
      options: [
        "A) Air conditioning will reduce the institute's electric bill.",
        "B) Room temperature and physical comfort directly influence a student's cognitive ability to learn and write code effectively.",
        "C) All computer components crash when room temperature exceeds 25°C.",
        "D) Students only enroll in institutes that provide luxury facilities."
      ],
      correctAnswer: 1, // B
      explanation: "The argument connects physical cooling to mental skill improvement. It assumes that room comfort is a significant factor in cognitive learning efficiency."
    },
    {
      id: "pa_q3",
      question: "Which of the following best defines an INFERENCE in logical reasoning?",
      options: [
        "A) A random guess made without any prior knowledge.",
        "B) A logical deduction derived step-by-step from known facts or premises.",
        "C) An emotional argument intended to intimidate opponents.",
        "D) A formal database command used to query records."
      ],
      correctAnswer: 1, // B
      explanation: "An inference is the cognitive bridge connecting observed facts/premises to a justified conclusion."
    },
    {
      id: "pa_q4",
      question: "Premise 1: Every member of the Alpha Fly Coding Club has a GitHub profile.\nPremise 2: Swetha does not have a GitHub profile.\nWhat conclusion necessarily follows?",
      options: [
        "A) Swetha is not a member of the Alpha Fly Coding Club.",
        "B) Swetha does not know how to code.",
        "C) Swetha will create a GitHub profile tomorrow.",
        "D) The Coding Club will shut down."
      ],
      correctAnswer: 0, // A
      explanation: "If All Club Members have GitHub, anyone without GitHub cannot be a club member (Modus Tollens: ~Q → ~P)."
    },
    {
      id: "pa_q5",
      question: "Which statement expresses a CONCLUSION rather than a premise?",
      options: [
        "A) 'The power grid suffered a surge at 3:15 PM.'",
        "B) 'The server hardware was not connected to an uninterruptible power supply (UPS).'",
        "C) 'Therefore, the server crash was caused by the unmitigated power surge.'",
        "D) 'The power company reported transformer maintenance on 3rd Avenue.'"
      ],
      correctAnswer: 2, // C
      explanation: "The word 'Therefore' explicitly signals the derived claim or conclusion supported by the preceding factual premises."
    }
  ]
};

export const practiceSetB = {
  id: "set_b",
  title: "Practice Set B: Logical Deduction",
  subtitle: "Multiple Premises, Conditionals, Necessary Conditions, and Contradictions",
  timeLimitSeconds: 480, // 8 minutes
  questions: [
    {
      id: "pb_q1",
      question: "Statements:\n1. All database engineers know SQL.\n2. No one who knows SQL is ignorant of relational algebra.\n3. Deepa is a database engineer.\nWhat MUST be true?",
      options: [
        "A) Deepa knows Python.",
        "B) Deepa is not ignorant of relational algebra.",
        "C) Deepa has 10 years of experience.",
        "D) Deepa is the team manager."
      ],
      correctAnswer: 1, // B
      explanation: "Deepa is a database engineer → Deepa knows SQL → Deepa is not ignorant of relational algebra (transitive deduction)."
    },
    {
      id: "pb_q2",
      question: "Statement: 'A candidate is eligible for the Senior Developer interview only if they have built at least two full-scale production applications.'\nSanjay has built three full-scale production applications. Does this guarantee that Sanjay will be hired?",
      options: [
        "A) Yes, because building two apps was sufficient.",
        "B) No, because building apps was a necessary condition for interview eligibility, which does not guarantee interview success or a job offer.",
        "C) Yes, because three is greater than two.",
        "D) No, because Sanjay must also be a college professor."
      ],
      correctAnswer: 1, // B
      explanation: "'Only if' denotes a necessary condition for eligibility, not a guarantee (sufficiency) of being hired."
    },
    {
      id: "pb_q3",
      question: "Examine these statements:\nStatement A: 'All workstations in Room B are connected to the Gigabit switch.'\nStatement B: 'Workstation 7 is located in Room B.'\nStatement C: 'Workstation 7 is connected to a 100Mbps hub and has no connection to the Gigabit switch.'\nWhich statement can be deduced about Statements A, B, and C?",
      options: [
        "A) All three statements are completely harmonious.",
        "B) Statements A, B, and C are mutually contradictory; they cannot all be true simultaneously.",
        "C) Statement C proves that Room B does not exist.",
        "D) Statement B is an opinion."
      ],
      correctAnswer: 1, // B
      explanation: "If all Room B workstations are connected to the Gigabit switch (A) and Workstation 7 is in Room B (B), Workstation 7 MUST be connected to the Gigabit switch. Statement C directly contradicts this."
    },
    {
      id: "pb_q4",
      question: "Conditional: 'If the API server receives a valid JWT token, it returns a 200 OK status code.'\nObservation: The API server returned a 401 Unauthorized status code.",
      options: [
        "A) The request contained a valid JWT token.",
        "B) The request did NOT contain a valid JWT token.",
        "C) The database exploded.",
        "D) The user typed their password backwards."
      ],
      correctAnswer: 1, // B
      explanation: "By Modus Tollens (~Q → ~P): If valid token implies 200 OK, not getting 200 OK implies the token was NOT valid."
    },
    {
      id: "pb_q5",
      question: "Statements:\n- Some mentors are software architects.\n- All software architects are problem solvers.\nWhich deduction is sound?",
      options: [
        "A) All mentors are problem solvers.",
        "B) Some mentors are problem solvers.",
        "C) No mentors are problem solvers.",
        "D) All problem solvers are mentors."
      ],
      correctAnswer: 1, // B
      explanation: "Mentors overlap with Architects (Some), and ALL Architects are Problem Solvers. Therefore, that overlapping subset of mentors MUST be problem solvers."
    }
  ]
};

export const practiceSetC = {
  id: "set_c",
  title: "Practice Set C: Advanced Argument Analysis",
  subtitle: "Logical Fallacies, Alternative Explanations, and Evidence Evaluation",
  timeLimitSeconds: 600, // 10 minutes
  questions: [
    {
      id: "pc_q1",
      question: "Candidate X argues: 'We should adopt TypeScript because its compile-time type checking catches syntax errors early.'\nCandidate Y retorts: 'Candidate X is wrong because he only joined our company two months ago and has messy hair!'\nWhich fallacy is committed by Candidate Y?",
      options: [
        "A) Ad Hominem",
        "B) Appeal to Popularity",
        "C) False Cause",
        "D) Circular Reasoning"
      ],
      correctAnswer: 0, // A
      explanation: "Candidate Y attacks Candidate X's tenure and physical appearance instead of evaluating the technical merits of TypeScript's type checking."
    },
    {
      id: "pc_q2",
      question: "A company notes that departments with large coffee machines have 15% higher code commit rates. The CEO orders giant coffee machines for every department to boost coding speed. What logical error was committed?",
      options: [
        "A) Hasty Generalization",
        "B) Confusing Correlation with Causation (False Cause)",
        "C) Straw Man Fallacy",
        "D) Slippery Slope"
      ],
      correctAnswer: 1, // B
      explanation: "The CEO assumes coffee machines caused higher code commits. In reality, larger engineering teams might simply have been assigned larger coffee machines due to headcount."
    },
    {
      id: "pc_q3",
      question: "Which question is MOST CRITICAL when stress-testing an argument proposing a complete software rewrite?",
      options: [
        "A) 'What font was used to write the proposal?'",
        "B) 'What alternative solutions (such as modular refactoring) could achieve the same performance gains with lower business disruption and risk?'",
        "C) 'Did the proposal author eat lunch today?'",
        "D) 'How many slides are in the presentation deck?'"
      ],
      correctAnswer: 1, // B
      explanation: "Critical evaluation requires exploring alternative hypotheses and less risky solutions before approving massive, disruptive commitments."
    },
    {
      id: "pc_q4",
      question: "Argument: 'You either love full-stack development and dedicate your life to code, or you hate technology and should never work in IT.' Which fallacy is this?",
      options: [
        "A) False Dilemma (Black-and-White Fallacy)",
        "B) Circular Reasoning",
        "C) Red Herring",
        "D) Appeal to Nature"
      ],
      correctAnswer: 0, // A
      explanation: "This forces an extreme binary choice while completely ignoring the vast spectrum of IT roles (UI/UX design, QA testing, product management, DevOps)."
    },
    {
      id: "pc_q5",
      question: "What is the primary indicator of CONFIRMATION BIAS in data analysis?",
      options: [
        "A) Using automated SQL queries to extract data.",
        "B) Actively highlighting only metrics that support a pre-existing hypothesis while discarding or explaining away contradictory metrics.",
        "C) Plotting bar charts with blue and green colors.",
        "D) Calculating percentage averages accurately."
      ],
      correctAnswer: 1, // B
      explanation: "Confirmation bias manifests when an investigator selectively filters evidence to fit their favored narrative while ignoring disconfirming data."
    }
  ]
};

// ==========================================
// 7. REAL-WORLD CASE STUDY
// ==========================================

export const caseStudyData = {
  title: "Case Study: Does Additional Practice Improve Examination Results?",
  context: "Alpha Fly Computer Education tracked 80 students across two parallel batches of the 'Full-Stack JavaScript' course during the August semester. Forty students voluntarily attended supplementary 2-hour Saturday hands-on lab practice sessions, while forty students attended only the standard weekday lectures. Both groups wrote the identical proctored certification exam at semester end.",
  dataSummary: [
    { group: "Students attending additional Saturday practice", count: 40, avgScore: "82%" },
    { group: "Students NOT attending additional Saturday practice", count: 40, avgScore: "74%" }
  ],
  tasks: [
    { step: 1, label: "Identify Verified Facts", desc: "List the exact empirical facts established by the table." },
    { step: 2, label: "Calculate Score Differential", desc: "Compute the difference in average scores (82% - 74% = +8 percentage points)." },
    { step: 3, label: "State Supported Association", desc: "Formulate a sound statement that describes the relationship without claiming causation." },
    { step: 4, label: "Expose Hidden Assumptions", desc: "Identify what must be assumed to claim the Saturday lab caused the 8-point gap." },
    { step: 5, label: "Brainstorm 3 Rival Explanations", desc: "Identify alternative variables (motivation, prior knowledge, weekday workload)." },
    { step: 6, label: "Design Controlled Experiment", desc: "How would you structure a study to prove true causal impact?" },
    { step: 7, label: "Critique Universal Claims", desc: "Evaluate: 'Every student who attends extra practice will score higher.'" },
    { step: 8, label: "Draft Balanced Conclusion", desc: "Synthesize the findings without overstating the evidence." }
  ],
  modelAnswer: {
    verifiedFacts: "1) Exactly 40 students voluntarily attended Saturday practice sessions; 2) Exactly 40 students did not; 3) The Saturday practice group had an average exam score of 82%, while the non-attending group averaged 74% (an 8-point gap).",
    supportedConclusion: "There is a positive statistical correlation between voluntary attendance at Saturday practice sessions and higher final examination scores.",
    hiddenAssumptionsOfCausalClaim: "To claim the practice caused the score lift, one must assume: 1) Both groups had identical baseline coding aptitude, intelligence, and motivation at the semester start; 2) Outside study hours on weekdays were equal; 3) Non-attending students did not face external obstacles (e.g. part-time jobs) that also hindered their exam prep.",
    alternativeExplanations: "1) Self-Selection Bias: Highly driven students naturally chose to attend extra sessions; their pre-existing high motivation drove their higher scores; 2) Baseline Knowledge: Students with prior coding experience had more free weekend time; 3) Fatigue Factor: Students who did not attend had demanding weekday jobs, causing general fatigue during the exam.",
    controlledTrialDesign: "Randomly assign 80 students of identical baseline diagnostic test scores into two groups (A and B). Mandate that Group A attends Saturday practice while Group B does not, ensuring study hours and instructor exposure are strictly controlled.",
    critiqueOfUniversalClaim: "'Every student who attends will score higher' is a demonstrably false hasty generalization. Averages reflect group aggregates; an individual student who attends Saturday sessions while sleeping during lectures or experiencing test anxiety could easily score lower than 74%.",
    balancedExecutiveConclusion: "While Saturday lab attendance is associated with an 8-percentage-point higher average score, Alpha Fly cannot claim causality until baseline motivation and background variables are controlled. Extra practice is a recommended support tool, but not an absolute guarantee of individual exam success."
  }
};

// ==========================================
// 8. COMMON MISTAKES AND STRATEGIES
// ==========================================

export const commonMistakes = [
  {
    mistake: "1. Confusing an Assumption with a Fact",
    explanation: "Treating an unstated premise ('Students prefer weekend classes') as if it were a proven fact without checking CRM survey data.",
    strategy: "Always ask: 'Where is the empirical proof? Can this statement be independently verified by a third-party auditor?'"
  },
  {
    mistake: "2. Accepting a Conclusion Because it Sounds Intuitive",
    explanation: "Agreeing with a conclusion because it matches your personal feelings or common sense, even when the stated premises fail to prove it.",
    strategy: "Evaluate arguments based strictly on the logical link between premises and conclusion, not your personal worldview."
  },
  {
    mistake: "3. Illicit Conversion (Reversing an 'If-Then' Statement)",
    explanation: "Assuming that 'If P then Q' means 'If Q then P'. (e.g., 'If it rains, roads are wet' does not mean 'If roads are wet, it rained').",
    strategy: "Remember: 'If P then Q' only guarantees the contrapositive: 'If not Q, then not P' (Modus Tollens)."
  },
  {
    mistake: "4. Treating Correlation as Proof of Causation",
    explanation: "Assuming that because two variables rise together, one must cause the other, ignoring confounding third variables.",
    strategy: "Always search for rival confounding variables and self-selection biases before endorsing a causal claim."
  },
  {
    mistake: "5. Hasty Generalization from an Isolated Sample",
    explanation: "Declaring an entire programming framework or course useless because two students struggled in the first week.",
    strategy: "Demand statistically significant sample sizes and diverse demographic cohorts before drawing universal conclusions."
  },
  {
    mistake: "6. Dismissing Claims via Personal Attacks (Ad Hominem)",
    explanation: "Rejecting a software architectural proposal because the engineer is junior or has an introverted personality.",
    strategy: "Judge ideas on technical merits, code benchmarks, and logical validity, never on the persona of the speaker."
  },
  {
    mistake: "7. Falling for False Dilemmas (Binary Blindness)",
    explanation: "Believing that there are only two extreme paths (e.g., 'Either we rewrite the entire system from scratch or we will go bankrupt').",
    strategy: "Force yourself to list at least three hybrid or middle-ground options whenever presented with an either-or scenario."
  },
  {
    mistake: "8. Confirmation Bias and Selective Data Filtering",
    explanation: "Remembering only the instances where your intuitive hunch was right while conveniently ignoring the times it failed.",
    strategy: "Maintain an objective decision journal and actively invite teammates to point out disconfirming evidence."
  },
  {
    mistake: "9. Drawing Extrapolations Beyond the Stated Premises",
    explanation: "Adding unmentioned real-world context to aptitude test questions that are strictly bounded by explicit fictional rules.",
    strategy: "In formal reasoning tests, assume NOTHING beyond what the passage explicitly states. Treat the text as a self-contained universe."
  }
];

// ==========================================
// 9. TIMED FINAL ASSESSMENT (20 ADVANCED MCQS)
// Distributed across 5 domains (4 Qs each):
// Q1-Q4: Assumptions & Conclusions
// Q5-Q8: Argument Evaluation
// Q9-Q12: Logical Deduction & Conditional Reasoning
// Q13-Q16: Contradictions & Fallacies
// Q17-Q20: Evidence Evaluation & Alternative Explanations
// Difficulty: 7 Easy, 7 Medium, 6 Hard
// ==========================================

export const finalAssessmentQuestions = [
  // ------------------------------------------
  // EASY LEVEL (QUESTIONS 1 - 7)
  // ------------------------------------------
  {
    id: "fa_q1",
    difficulty: "Easy",
    category: "Facts vs Opinions",
    domain: "Assumptions & Conclusions",
    question: "Which of the following is a FACT rather than an opinion or assumption?",
    options: [
      "A) 'Alpha Fly's web development syllabus is the most comprehensive in the district.'",
      "B) 'The Python course enrolled 120 students between July and September 2025.'",
      "C) 'Students who avoid learning C++ will never master memory management.'",
      "D) 'Morning coding sessions are superior to evening coding sessions.'"
    ],
    correctAnswer: 1, // B
    explanation: "Option B reports an objective, verifiable numerical count (120 students in July-Sept 2025) recorded in official admission ledgers. The others are subjective claims or unproven assumptions."
  },
  {
    id: "fa_q2",
    difficulty: "Easy",
    category: "Hidden Assumptions",
    domain: "Assumptions & Conclusions",
    question: "Statement: 'We should purchase faster laptops for the computer lab so that our students can write code with fewer syntax errors.' What hidden assumption is this claim based upon?",
    options: [
      "A) Faster laptops are cheaper than desktop computers.",
      "B) Syntax errors in programming code are primarily caused by hardware processing speed.",
      "C) Students prefer laptops with illuminated keyboards.",
      "D) All programming languages execute at the exact same speed."
    ],
    correctAnswer: 1, // B
    explanation: "The speaker links laptop processing speed directly to reducing student syntax errors. This assumes hardware latency causes syntax errors (which is actually a conceptual/knowledge gap)."
  },
  {
    id: "fa_q3",
    difficulty: "Easy",
    category: "Premise and Conclusion",
    domain: "Argument Evaluation",
    question: "In the following statement: 'Because the network cable was unplugged, the printer failed to receive the print job; thus, the printer was not at fault.' What is the CONCLUSION of the argument?",
    options: [
      "A) The network cable was unplugged.",
      "B) The printer failed to receive the print job.",
      "C) The printer was not at fault.",
      "D) The network cable was defective."
    ],
    correctAnswer: 2, // C
    explanation: "The word 'thus' signals the derived conclusion: 'the printer was not at fault'. The disconnected cable and missed job are the supporting premises."
  },
  {
    id: "fa_q4",
    difficulty: "Easy",
    category: "Basic Deduction",
    domain: "Logical Deduction & Conditional Reasoning",
    question: "Given:\n1. All web developers understand HTML.\n2. Sanjay is a web developer.\nWhat must be true?",
    options: [
      "A) Sanjay knows Python.",
      "B) Sanjay understands HTML.",
      "C) Sanjay is a senior engineer.",
      "D) Sanjay works remotely."
    ],
    correctAnswer: 1, // B
    explanation: "Direct categorical deduction: If All Web Developers know HTML and Sanjay is a web developer, Sanjay must understand HTML."
  },
  {
    id: "fa_q5",
    difficulty: "Easy",
    category: "Direct Contradiction",
    domain: "Contradictions & Fallacies",
    question: "Which of the following two statements directly CONTRADICT each other?",
    options: [
      "A) 'Ramesh is in Classroom 1' and 'Ramesh is enrolled in Python.'",
      "B) 'The server room door is locked' and 'The server room door is wide open.'",
      "C) 'Priya likes JavaScript' and 'Priya also studies CSS.'",
      "D) 'The batch started at 9:00 AM' and 'The lecture finished at 11:00 AM.'"
    ],
    correctAnswer: 1, // B
    explanation: "A door cannot be simultaneously locked shut and wide open under the exact same conditions. They are mutually exclusive contradictory states."
  },
  {
    id: "fa_q6",
    difficulty: "Easy",
    category: "Fallacy Identification",
    domain: "Contradictions & Fallacies",
    question: "Someone argues: 'My grandfather smoked cigarettes every day and lived to age 95; therefore, smoking cigarettes cannot be harmful to human health.' Which fallacy is this?",
    options: [
      "A) Hasty Generalization",
      "B) Straw Man Fallacy",
      "C) Appeal to Authority",
      "D) Circular Reasoning"
    ],
    correctAnswer: 0, // A
    explanation: "Drawing a sweeping universal medical conclusion from a single anecdotal case (sample size of 1) is a textbook Hasty Generalization."
  },
  {
    id: "fa_q7",
    difficulty: "Easy",
    category: "Evidence Evaluation",
    domain: "Evidence Evaluation & Alternative Explanations",
    question: "Which of the following represents the STRONGEST evidence supporting the claim that a new sorting algorithm is faster than the old algorithm?",
    options: [
      "A) The developer who wrote it claims it feels much faster.",
      "B) A benchmark test showing the new algorithm sorted 1,000,000 integers in 42 ms versus 185 ms for the old algorithm across 50 trials.",
      "C) The algorithm was published on an attractive blog website.",
      "D) The algorithm code is 10 lines shorter."
    ],
    correctAnswer: 1, // B
    explanation: "Option B provides rigorous, empirical, reproducible benchmark metrics across a large dataset (1,000,000 integers) and repeated trials (50 times)."
  },

  // ------------------------------------------
  // MEDIUM LEVEL (QUESTIONS 8 - 14)
  // ------------------------------------------
  {
    id: "fa_q8",
    difficulty: "Medium",
    category: "Hidden Assumptions",
    domain: "Assumptions & Conclusions",
    question: "Statement: 'To increase our institute's revenue, we must double the price of our course enrollment fees.' What is a critical hidden assumption?",
    options: [
      "A) Student demand will not drop so drastically that the total revenue actually decreases.",
      "B) All competitors will immediately increase their fees too.",
      "C) Teachers will demand a 100% salary hike.",
      "D) The institute will stop teaching programming."
    ],
    correctAnswer: 0, // A
    explanation: "The plan assumes price elasticity is low enough that doubling fees will not cause a 75% collapse in student enrollment, which would lead to net revenue loss."
  },
  {
    id: "fa_q9",
    difficulty: "Medium",
    category: "Argument Evaluation",
    domain: "Argument Evaluation",
    question: "Evaluate the following argument:\nPremise: Over 90% of students who completed Alpha Fly's React course successfully cleared their company technical interview rounds.\nConclusion: The React course is highly effective at preparing students for technical interview challenges.",
    options: [
      "A) The argument is strong because the high success rate (90%) directly correlates with and supports the course's effectiveness.",
      "B) The argument is completely invalid because React is a frontend library.",
      "C) The argument is circular because React is a technology.",
      "D) The argument is weak because 90% is less than 100%."
    ],
    correctAnswer: 0, // A
    explanation: "The evidence (90% interview clearance rate) is directly relevant, statistically substantial, and logically connects to the conclusion of course efficacy."
  },
  {
    id: "fa_q10",
    difficulty: "Medium",
    category: "Conditional Logic",
    domain: "Logical Deduction & Conditional Reasoning",
    question: "Rule: 'If a student achieves a score of 90% or above (P), they receive a Certificate of Distinction (Q).'\nObservation: Student Manoj received a Certificate of Distinction.\nCan we conclude with 100% logical certainty that Manoj scored 90% or above?",
    options: [
      "A) Yes, because getting the certificate guarantees he scored 90% or above.",
      "B) No, because scoring 90% is sufficient for the certificate, but the rule does not state it is the ONLY way (e.g. exceptional project work might also grant it). Concluding he scored 90% commits the fallacy of Affirming the Consequent.",
      "C) Yes, because certificates are never given to anyone else.",
      "D) No, because certificates are fictional."
    ],
    correctAnswer: 1, // B
    explanation: "P → Q does not imply Q → P. Assuming Manoj must have scored 90% commits the formal fallacy of Affirming the Consequent. P was sufficient, not stated as necessary."
  },
  {
    id: "fa_q11",
    difficulty: "Medium",
    category: "Multi-Statement Syllogism",
    domain: "Logical Deduction & Conditional Reasoning",
    question: "Statements:\n1. No senior engineer writes production code without code reviews.\n2. Some senior engineers mentor junior interns.\n3. Anand writes production code without code reviews.\nWhich deduction MUST be true?",
    options: [
      "A) Anand is a senior engineer.",
      "B) Anand is NOT a senior engineer.",
      "C) Anand mentors junior interns.",
      "D) Anand does not know how to code."
    ],
    correctAnswer: 1, // B
    explanation: "Statement 1: Senior Engineer → Does NOT write without reviews. Contrapositive: Writes without reviews → NOT a senior engineer. Since Anand writes without reviews, he cannot be a senior engineer."
  },
  {
    id: "fa_q12",
    difficulty: "Medium",
    category: "Fallacy Identification",
    domain: "Contradictions & Fallacies",
    question: "During a technical review, a junior developer suggests: 'We should switch our server architecture to microservices because Amazon, Google, and Netflix use microservices.' Which fallacy is this?",
    options: [
      "A) Appeal to Popularity / False Equivalence",
      "B) Ad Hominem",
      "C) Slippery Slope",
      "D) Circular Reasoning"
    ],
    correctAnswer: 0, // A
    explanation: "Arguing that an architecture is right for a small 5-person startup simply because massive tech giants (with billions of daily users) use it is a classic Bandwagon / False Equivalence fallacy."
  },
  {
    id: "fa_q13",
    difficulty: "Medium",
    category: "Alternative Explanations",
    domain: "Evidence Evaluation & Alternative Explanations",
    question: "A company noticed that website sales were 40% higher in November than in October. The marketing manager claimed: 'Our new email newsletter sent in November caused this 40% surge.' Which observation provides the STRONGEST alternative explanation?",
    options: [
      "A) November had Diwali and Black Friday festival sales promotions across the entire retail industry.",
      "B) The email newsletter had a colorful banner.",
      "C) The marketing manager worked from home in November.",
      "D) The office internet speed increased in November."
    ],
    correctAnswer: 0, // A
    explanation: "Massive annual nationwide festival shopping holidays (Diwali / Black Friday) introduce a powerful macro-economic seasonal explanation that accounts for retail sales surges regardless of newsletters."
  },
  {
    id: "fa_q14",
    difficulty: "Medium",
    category: "Distinguishing What Must Be True",
    domain: "Evidence Evaluation & Alternative Explanations",
    question: "In a company of 50 developers, 35 know Java, 30 know Python, and all 50 know at least one of these two languages. What MUST be true?",
    options: [
      "A) Exactly 15 developers know both Java and Python.",
      "B) Exactly 20 developers know only Python.",
      "C) Every developer prefers Python over Java.",
      "D) Developers who know Java cannot learn Python."
    ],
    correctAnswer: 0, // A
    explanation: "By set theory: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) → 50 = 35 + 30 - n(Both) → 50 = 65 - n(Both) → n(Both) = 15. Exactly 15 developers know both languages."
  },

  // ------------------------------------------
  // HARD LEVEL (QUESTIONS 15 - 20)
  // ------------------------------------------
  {
    id: "fa_q15",
    difficulty: "Hard",
    category: "Complex Assumption Analysis",
    domain: "Assumptions & Conclusions",
    question: "Argument: 'Alpha Fly should replace its 3-month in-person web development bootcamp with a 1-month fully online asynchronous course because fast-track online courses allow students to graduate faster.'\nWhich of the following is a vital hidden assumption that, if FALSE, completely destroys the argument?",
    options: [
      "A) Online students have access to high-speed internet.",
      "B) Compressing the curriculum into 1 month asynchronous delivery maintains the requisite technical competency and job-readiness expected by employers.",
      "C) Tuition fees will remain completely unchanged.",
      "D) Online instructors receive higher salaries than in-person instructors."
    ],
    correctAnswer: 1, // B
    explanation: "Applying the Negation Test: If graduating faster in 1 month fails to produce competent, job-ready developers, employers will reject the graduates, destroying the bootcamp's core value proposition and reputation."
  },
  {
    id: "fa_q16",
    difficulty: "Hard",
    category: "Complex Deduction with Multiple Negations",
    domain: "Logical Deduction & Conditional Reasoning",
    question: "Premises:\n1. A student is eligible for the placement drive ONLY IF they clear the benchmark assessment.\n2. A student clears the benchmark assessment UNLESS they fail the algorithmic coding module.\n3. Rohini was declared INELIGIBLE for the placement drive.\nIf all premises are true, which conclusion MUST be true?",
    options: [
      "A) Rohini passed the algorithmic coding module with distinction.",
      "B) Rohini failed to clear the benchmark assessment.",
      "C) Rohini did not attend the placement drive interview.",
      "D) Rohini is enrolled in a different college."
    ],
    correctAnswer: 1, // B
    explanation: "Premise 1: Eligible → Cleared Benchmark. Contrapositive: ~Cleared Benchmark → ~Eligible. Furthermore, 'Eligible ONLY IF Cleared' means Cleared is necessary. If Rohini was ineligible, could she have cleared? Wait: Being eligible requires clearing. If someone did NOT clear, they are ineligible. But if Rohini is ineligible, does it mean she didn't clear? By Premise 1, if she had cleared, she MIGHT be eligible unless other rules exist. But Premise 1 is the ONLY stated condition for eligibility! Thus, in this self-contained formal system, her ineligibility implies she failed to clear the benchmark assessment."
  },
  {
    id: "fa_q17",
    difficulty: "Hard",
    category: "Necessary vs Sufficient Chains",
    domain: "Logical Deduction & Conditional Reasoning",
    question: "Consider three software conditions:\n1. Condition A is necessary for Condition B.\n2. Condition B is sufficient for Condition C.\n3. Condition C is NOT met.\nWhich of the following MUST be true?",
    options: [
      "A) Condition B is met.",
      "B) Condition B is NOT met.",
      "C) Condition A is NOT met.",
      "D) Condition A is met."
    ],
    correctAnswer: 1, // B
    explanation: "Premise 2: B → C. Contrapositive: ~C → ~B. Since Condition C is NOT met (~C), Condition B CANNOT be met (~B). Note: We cannot deduce ~A because A was only necessary for B, and B did not occur."
  },
  {
    id: "fa_q18",
    difficulty: "Hard",
    category: "Subtle Fallacy Detection",
    domain: "Contradictions & Fallacies",
    question: "A project manager argues: 'We must not allow developers to work remotely on Fridays. If we let them work remotely on Fridays, they will soon demand remote work on Mondays. Then they will demand full-time remote work, stop communicating, and eventually our company will collapse into complete bankruptcy!' Which fallacy is this?",
    options: [
      "A) Slippery Slope Fallacy",
      "B) Circular Reasoning",
      "C) Straw Man Fallacy",
      "D) Equivocation"
    ],
    correctAnswer: 0, // A
    explanation: "The Slippery Slope Fallacy asserts that a modest, reasonable initial step (remote work on Friday) will inevitably trigger an uncontrolled chain reaction leading to an extreme catastrophic disaster (bankruptcy) with zero evidence."
  },
  {
    id: "fa_q19",
    difficulty: "Hard",
    category: "Evaluating Competing Causal Claims",
    domain: "Evidence Evaluation & Alternative Explanations",
    question: "Medical researchers observed that cities with more hospitals have significantly higher total annual deaths than cities with fewer hospitals. A journalist published an article headlined: 'Hospitals Cause Deaths!' What is the fundamental flaw in the journalist's critical thinking?",
    options: [
      "A) The journalist failed to spell the word 'hospital' correctly.",
      "B) The journalist confused correlation with causation and ignored the confounding variable of population size (larger cities have both more hospitals and more total residents, and critically ill patients travel to hospital-dense cities for treatment).",
      "C) All hospitals falsify death certificates.",
      "D) Cities with fewer hospitals have zero deaths."
    ],
    correctAnswer: 1, // B
    explanation: "This is a classic confounding variable / reverse causality trap. Larger populations naturally have higher absolute counts of both hospitals and deaths, and sicker people congregate near advanced hospital facilities."
  },
  {
    id: "fa_q20",
    difficulty: "Hard",
    category: "Comprehensive Argument Evaluation",
    domain: "Argument Evaluation",
    question: "Read the passage carefully:\n'Recent data shows that 80% of tech startup founders who raised Series A venture capital attended elite universities. Therefore, attending an elite university is essential for anyone who wants to successfully launch a tech startup.'\nWhich of the following statements represents the STRONGEST critique of this argument?",
    options: [
      "A) Elite universities have high tuition fees.",
      "B) The argument suffers from survivorship bias and overlooks the thousands of elite university graduates whose tech startups failed, as well as the successful founders who never attended college or raised VC.",
      "C) Founders should study biology instead of computer science.",
      "D) Venture capital funds only invest in healthcare companies."
    ],
    correctAnswer: 1, // B
    explanation: "The argument commits survivorship bias by looking only at founders who succeeded in raising VC, ignoring the vast denominator of failed elite founders and non-elite bootstrapped successes, falsely declaring an elite degree 'essential'."
  }
];

// ==========================================
// 10. LESSON SUMMARY AND REVISION SHEET
// ==========================================

export const revisionCheatSheet = {
  title: "Level 3 Day 1 Revision: Advanced Critical Thinking & Logical Deduction",
  summaryPoints: [
    { title: "Facts vs. Assumptions", desc: "Facts are empirically verifiable; assumptions are unproven foundations taken for granted. Never treat assumptions as facts." },
    { title: "Premises & Deductive Validity", desc: "In a valid deductive argument, if the premises are true, the conclusion is guaranteed to be true (inescapable certainty)." },
    { title: "Necessary vs. Sufficient", desc: "Sufficient guarantees the result (If A → B); Necessary is mandatory for the result to occur (B only if A)." },
    { title: "Contrapositive Rule", desc: "The only valid transformation of 'If P then Q' is its contrapositive: 'If not Q, then not P'. Reversing to 'If Q then P' is invalid." },
    { title: "Correlation vs. Causation", desc: "Two variables moving together does not prove one caused the other. Always search for third confounding variables and selection biases." },
    { title: "Fallacy Defense", desc: "Be vigilant against Ad Hominem attacks, False Dilemmas, Straw Man caricatures, Slippery Slopes, and Hasty Generalizations." }
  ],
  criticalThinkingChecklist: [
    "1. What exactly is the core claim being made?",
    "2. What empirical evidence directly supports this claim?",
    "3. What hidden assumptions must be true for the argument to work?",
    "4. Does the conclusion follow with deductive certainty or merely probability?",
    "5. Could an alternative explanation or confounding factor explain the observed outcome?",
    "6. What new evidence, if discovered, would prove this conclusion false?"
  ]
};
