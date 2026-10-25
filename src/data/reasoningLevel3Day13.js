// ==========================================
// ALPHA FLY LOGICAL REASONING - LEVEL 3 (ADVANCED)
// DAY 13: ADVANCED CRITICAL THINKING & DEDUCTION (PART 2)
// Conditions, Contradictions, Fallacies & Evidence Evaluation
// ==========================================

export const day13Overview = {
  courseName: "Logical Reasoning",
  level: "Level 3 – Advanced",
  dayNumber: 13,
  title: "Advanced Critical Thinking & Logical Deduction (Part 2)",
  subtitle: "Conditions, Contradictions, Logical Fallacies, and Evidence Evaluation",
  targetAudience: "College students, job seekers, placement candidates, competitive examination learners, and working professionals.",
  language: "Simple English with clear, detailed explanations.",
  difficulty: "Advanced",
  estimatedMinutes: 65,
  description: "Master the second half of advanced critical thinking: navigate formal necessary and sufficient conditional logic, detect contradictions and mutual inconsistencies, expose and dismantle 8 major logical fallacies, evaluate empirical evidence credibility, and separate correlation from true causation.",
  learningObjectives: [
    "Distinguish rigorously between necessary conditions and sufficient conditions in formal logic and technical specifications.",
    "Correctly interpret conditional statements ('If A then B', 'A only if B', 'A if B', and 'A if and only if B').",
    "Identify formal contradictions and inconsistencies across conflicting project deadlines, records, and reports.",
    "Recognize, explain, and dismantle 8 common logical fallacies (hasty generalization, false cause, false dilemma, ad hominem, appeal to popularity, circular reasoning, straw man, confirmation bias).",
    "Evaluate cause-and-effect claims and separate genuine causation from correlation and confounding variables.",
    "Construct defensible counterarguments, identify missing evidence, and revise conclusions when new information appears."
  ]
};

// ==========================================
// 2. LESSON INTRODUCTION & DIAGNOSTIC SCENARIO
// ==========================================

export const lessonIntro = {
  title: "From Deduction to Defense: Navigating Conditionals, Fallacies, and Causation",
  importancePoints: [
    "Aptitude & Technical Exams: Questions testing necessary vs. sufficient conditions and logical fallacies are the primary differentiator between average and top-percentile scorers.",
    "Software & System Architecture: Misinterpreting 'only if' in system authorization logic causes catastrophic security vulnerabilities and access lockouts.",
    "Data Science & Analytics: Blindly mistaking statistical correlation for causation wastes millions in flawed marketing and product strategies.",
    "Professional & Academic Debates: Enables candidates to spot flawed reasoning instantly and construct airtight, evidence-based counterarguments."
  ],
  starterScenario: {
    title: "Starter Dilemma: The Cloud Server Downtime Debate",
    context: "During a major project deadline, Alpha Fly's online testing portal went offline for 45 minutes. Two team leads offer competing explanations:\n• Lead A argues: 'The server crashed immediately after Developer Manoj pushed code update v2.4; therefore, Manoj's update caused the crash!'\n• Lead B argues: 'Either we fire Manoj immediately or our system will never be secure again!'",
    reflectiveQuestions: [
      {
        question: "1. What logical fallacy is Lead A committing?",
        answer: "Lead A commits the False Cause (Post Hoc Ergo Propter Hoc) fallacy: assuming that because event B happened after event A, event A must have caused event B."
      },
      {
        question: "2. What logical fallacy is Lead B committing?",
        answer: "Lead B commits the False Dilemma (Black-and-White Thinking) fallacy: artificially restricting the options to two extremes while ignoring countless middle options (like code review, testing, or rollback)."
      },
      {
        question: "3. What empirical evidence would definitively prove what caused the server crash?",
        answer: "Server error logs, network traffic metrics (checking for external DDoS spikes), CPU/RAM utilization graphs, and reproducing the bug in an isolated staging sandbox."
      }
    ]
  }
};

// ==========================================
// 3. CORE CONCEPTS (4 IN-DEPTH MODULES)
// ==========================================

export const coreConcepts = {
  concept1: {
    id: "concept1",
    title: "Concept 1: Necessary and Sufficient Conditions",
    subtitle: "Mastering Formal Conditionals: 'If A, then B' vs. 'A only if B'",
    theory: "Confusing a necessary condition with a sufficient condition is the #1 cause of lost marks in advanced reasoning examinations and flawed technical specifications.",
    comparisonTable: [
      {
        type: "Sufficient Condition",
        meaning: "A condition that GUARANTEES the outcome. If the condition is met, the result must occur.",
        formula: "If A, then B (A → B)",
        example: "Scoring 100% on the final exam is SUFFICIENT to pass the course.",
        trap: "Reversing the implication: Passing the course does NOT mean you scored 100% (you could have scored 80%)."
      },
      {
        type: "Necessary Condition",
        meaning: "A condition that MUST be present for the outcome to even be possible. Without it, the result cannot occur.",
        formula: "B only if A (B → A), or 'If not A, then not B'",
        example: "Having electricity is NECESSARY for a desktop computer to turn on.",
        trap: "Assuming necessity guarantees success: Having electricity does NOT guarantee the computer turns on (the power button or motherboard could be broken!)."
      }
    ],
    conditionalPhrases: [
      { phrase: "If A, then B", meaning: "A is SUFFICIENT for B (A → B). If A happens, B is guaranteed." },
      { phrase: "A only if B", meaning: "B is NECESSARY for A (A → B). A cannot happen unless B happens." },
      { phrase: "A if B", meaning: "B is SUFFICIENT for A (B → A). If B happens, A is guaranteed." },
      { phrase: "A if and only if B (iff)", meaning: "Biconditional: A is both necessary and sufficient for B (A ↔ B). They are logically identical." }
    ]
  },

  concept2: {
    id: "concept2",
    title: "Concept 2: Contradictions and Inconsistencies",
    subtitle: "Detecting Mutually Exclusive Claims and Resolving Conflicting Data",
    theory: "A contradiction occurs when two or more statements cannot all be true simultaneously under the exact same conditions. In system audits and legal/technical aptitude, identifying contradictions proves that at least one statement is false.",
    domainsOfConflict: [
      {
        domain: "Student Attendance & Exam Records",
        conflictExample: "Record 1 states: 'Student Priya was marked absent for the entire day of Oct 14th.' Record 2 states: 'Priya personally submitted a handwritten physical lab test in the classroom at 2:00 PM on Oct 14th.'",
        analysis: "Both records cannot be true simultaneously. Either Priya was present for the test, or the lab test submission was forged/misdated."
      },
      {
        domain: "Conflicting Software Deadlines",
        conflictExample: "Specification 1 states: 'The mobile app launch must take place on Nov 1st.' Specification 2 states: 'Security penetration testing requires 3 weeks and cannot begin until all code is frozen on Oct 25th.'",
        analysis: "Oct 25 + 3 weeks = Nov 15th. A Nov 1st launch with a 3-week security audit starting Oct 25th is mathematically impossible."
      },
      {
        domain: "Inconsistent Financial Statements",
        conflictExample: "Report A states: 'Our branch made a net profit of ₹40,000 in August.' Report B states: 'Total gross revenue was ₹1,00,000 and total operating costs were ₹1,20,000 in August.'",
        analysis: "Revenue (1L) - Costs (1.2L) = Net Loss of ₹20,000. Report A directly contradicts the audited line items in Report B."
      }
    ],
    reconciliationMethod: [
      "Step 1: Formalize each statement into its core truth claims.",
      "Step 2: Check for overlapping conditions (same time, same entity, same metric).",
      "Step 3: Identify the mutual exclusion (A and Not-A cannot coexist).",
      "Step 4: Request third-party timestamped logs, physical receipts, or raw audit trails to determine which claim is valid."
    ]
  },

  concept3: {
    id: "concept3",
    title: "Concept 3: 8 Logical Fallacies and Weak Reasoning",
    subtitle: "Cataloguing and Dismantling Common Flaws in Arguments",
    theory: "A logical fallacy is a flaw in reasoning that renders an argument invalid, weak, or deceptive. Master thinkers recognize these 8 classic fallacies in technical proposals, interview questions, and management debates.",
    fallaciesList: [
      {
        name: "1. Hasty Generalization",
        definition: "Drawing a broad universal conclusion from an unrepresentative or tiny sample size.",
        example: "'Two students from college X struggled with Python loops; therefore, no student from college X understands programming.'",
        whyWeak: "Two individuals cannot statistically represent hundreds of students.",
        betterWay: "Audit a statistically significant, randomized sample before making generalized claims."
      },
      {
        name: "2. False Cause (Post Hoc Ergo Propter Hoc)",
        definition: "Assuming that because Event Y occurred after Event X, Event X must have caused Event Y.",
        example: "'We installed a new coffee maker in the office last month, and sales increased by 20%. The coffee maker boosted our sales!'",
        whyWeak: "Temporal sequence (after) is not causal consequence. Market seasonality or new sales hires likely explain the revenue.",
        betterWay: "Conduct controlled A/B testing and isolate confounding variables."
      },
      {
        name: "3. False Dilemma (Black-or-White)",
        definition: "Presenting only two extreme choices when multiple viable intermediate alternatives exist.",
        example: "'Either we spend ₹10,00,000 on brand new laboratory servers right now, or the institute will collapse completely.'",
        whyWeak: "Artificially ignores middle-ground solutions (e.g. upgrading RAM, cloud hosting, or cleaning existing hardware).",
        betterWay: "Map the entire spectrum of alternatives before committing to extremes."
      },
      {
        name: "4. Ad Hominem (Personal Attack)",
        definition: "Attacking the character, background, or identity of the speaker rather than evaluating the validity of their argument.",
        example: "'We should ignore Rajesh's proposed database indexing optimization because he is only 21 years old.'",
        whyWeak: "The mathematical performance of a database query is completely independent of the engineer's age.",
        betterWay: "Benchmark the database query execution times objectively."
      },
      {
        name: "5. Appeal to Popularity (Bandwagon)",
        definition: "Arguing that a claim must be true or best simply because the majority of people believe or do it.",
        example: "'Every other coaching center in town teaches older Python 2 syntax, so our institute should also teach Python 2.'",
        whyWeak: "Widespread adoption does not equal technical correctness; the crowd can be obsolete.",
        betterWay: "Evaluate against current industry standards and employer job requirements."
      },
      {
        name: "6. Circular Reasoning (Begging the Question)",
        definition: "An argument whose conclusion is simply assumed as a premise in different words.",
        example: "'Alpha Fly is the most prestigious institute in the state because no other institute matches its high prestige.'",
        whyWeak: "Offers zero independent evidence; merely repeats the claim in a loop.",
        betterWay: "Provide external verifiable evidence: audited placement rates, student certification pass rates, or faculty credentials."
      },
      {
        name: "7. Straw Man Fallacy",
        definition: "Misrepresenting or exaggerating an opponent's argument to make it easy to attack and disprove.",
        example: "Instructor: 'We should include 30 minutes of code debugging exercises.' Opponent: 'So you want students to sit in silence and never listen to any lectures at all!'",
        whyWeak: "Attacks a ridiculous caricature that the instructor never suggested.",
        betterWay: "Restate the opponent's argument fairly and accurately before addressing its points."
      },
      {
        name: "8. Confirmation Bias",
        definition: "Searching for, favoring, and remembering only information that confirms one's pre-existing beliefs while ignoring disconfirming data.",
        example: "A manager who believes women are poor coders only remembers the two female students who struggled, while ignoring the five who achieved 100% on the final project.",
        whyWeak: "Selectively cherry-picks data, distorting reality.",
        betterWay: "Actively search for counterexamples that challenge your initial hypothesis."
      }
    ]
  },

  concept4: {
    id: "concept4",
    title: "Concept 4: Evidence, Counterarguments, and Alternative Explanations",
    subtitle: "Challenging Claims Constructively and Updating Beliefs with Data",
    theory: "Critical thinkers do not accept the first convincing story. They actively search for missing evidence, evaluate counterexamples, separate correlation from causation, and pivot their conclusions when facts change.",
    evidenceToolkit: [
      {
        tool: "1. Missing Evidence Check",
        desc: "Ask: 'What piece of information is conspicuously absent?'",
        example: "An ad claims: '90% of our students get hired!' Missing evidence: 'What was the dropout rate before graduation? What types of jobs were they hired for?'"
      },
      {
        tool: "2. The Counterexample Test",
        desc: "Search for a single verified instance that disproves a universal claim.",
        example: "Claim: 'No one can learn programming without a computer science degree.' Counterexample: 'Millions of top software engineers at Google and Microsoft are self-taught or hold arts degrees.'"
      },
      {
        tool: "3. Correlation vs. Causation",
        desc: "Recognize that two variables moving together does not prove one causes the other. A third 'confounding variable' often causes both.",
        example: "Ice cream sales and drowning incidents correlate strongly in summer. Does ice cream cause drowning? No! The confounding variable is summer heat (leads to more swimming AND more ice cream)."
      },
      {
        tool: "4. Belief Updating (Bayesian Thinking)",
        desc: "A rational thinker updates their confidence in a conclusion as new evidence appears, rather than defending initial opinions stubbornly.",
        example: "If new audit logs prove a bug was caused by a network switch rather than Developer A's code, the team lead immediately clears Developer A."
      }
    ]
  }
};

// ==========================================
// 4. SOLVED MASTER EXAMPLES (5 WORKED EXAMPLES)
// ==========================================

export const workedExamples = [
  {
    id: "ex1",
    title: "Example 1: Necessary vs. Sufficient Conditions",
    type: "Conditional Reasoning",
    scenario: "Rule: 'A candidate is invited to the final HR interview ONLY IF they have scored at least 75% on the technical coding assessment.'\nFact: 'Candidate Rahul scored 82% on the technical coding assessment.'",
    question: "What conclusion must be true based on the rule and fact?",
    options: [
      "A) Rahul will definitely be invited to the final HR interview.",
      "B) Rahul might be invited to the final HR interview, but it is not guaranteed.",
      "C) Rahul is guaranteed to be hired by the company.",
      "D) Rahul failed the technical coding assessment."
    ],
    correctAnswer: 1, // B
    stepByStepReasoning: [
      "Step 1 (Analyze 'ONLY IF'): 'A only if B' means B is a NECESSARY condition. Formula: HR Interview → Score ≥ 75%.",
      "Step 2 (Evaluate the Fact): Rahul scored 82% (he satisfied the necessary condition).",
      "Step 3 (Avoid the Trap): Satisfying a necessary condition does NOT guarantee the outcome (it is not sufficient). Rahul could still be rejected due to resume gaps, behavioral red flags, or headcount freezes.",
      "Step 4 (Conclusion): Rahul is eligible, so he MIGHT be invited, but an invitation is NOT guaranteed."
    ],
    distractorAnalysis: [
      "A confuses a necessary condition with a sufficient condition.",
      "C leaps to final hiring without evidence.",
      "D is factually false (82% > 75%)."
    ]
  },
  {
    id: "ex2",
    title: "Example 2: Resolving Contradictory Statements",
    type: "Contradiction Resolution",
    scenario: "An investigator reviews three statements regarding a laboratory security incident on Wednesday night:\n1. Security Guard: 'The computer lab door was locked at 8:00 PM and remained locked until 6:00 AM Thursday.'\n2. Badge Log System: 'Student Dinesh used his digital RFID keycard to unlock the computer lab door at 10:15 PM on Wednesday.'\n3. Lab CCTV Camera: 'The lab was completely empty and dark from 8:00 PM Wednesday to 6:00 AM Thursday.'",
    question: "Which of the following possibilities successfully resolves the apparent contradiction between Statement 1, Statement 2, and Statement 3?",
    options: [
      "A) Dinesh unlocked the door at 10:15 PM, but the RFID scanner was on a training simulation server and did not physically unlock the door, so the lab remained empty and locked.",
      "B) Dinesh was studying in the lab all night with the lights on.",
      "C) Security Guard was sleeping in the server room.",
      "D) Wednesday night never occurred."
    ],
    correctAnswer: 0, // A
    stepByStepReasoning: [
      "Step 1 (Identify Conflict): Guard says door was locked all night; Badge log says Dinesh unlocked it at 10:15 PM; CCTV says room was empty.",
      "Step 2 (Test Resolution A): If the badge reader's log reflected a test simulation rather than physical access, the door physically remained locked (matching Guard) and no one entered (matching CCTV). All 3 observations are reconciled without contradiction."
    ],
    distractorAnalysis: [
      "B contradicts both the Guard and the CCTV camera footage.",
      "C does not resolve the conflict between the RFID log and CCTV.",
      "D is an absurd non-explanation."
    ]
  },
  {
    id: "ex3",
    title: "Example 3: Identifying Logical Fallacies",
    type: "Fallacy Identification",
    scenario: "In an academic committee meeting, an instructor proposes: 'We should include a 2-hour module on Git and GitHub in our Python course so students learn team collaboration.' A senior professor responds: 'If we start adding Git, next we will have to teach Docker, then Kubernetes, then cloud DevOps, and soon students will spend all their time configuring servers and never write a single line of Python code!'",
    question: "Which logical fallacy is the senior professor committing?",
    options: [
      "A) Slippery Slope Fallacy",
      "B) Ad Hominem Fallacy",
      "C) Circular Reasoning",
      "D) Bandwagon Fallacy"
    ],
    correctAnswer: 0, // A
    stepByStepReasoning: [
      "Step 1 (Analyze Structure): The professor claims that taking a minor, reasonable step (adding Git) will inevitably trigger an uncontrollable chain reaction leading to an extreme, catastrophic outcome (students never writing Python code).",
      "Step 2 (Define Fallacy): This is the textbook definition of the Slippery Slope fallacy."
    ],
    distractorAnalysis: [
      "B is incorrect: The professor did not attack the instructor personally.",
      "C is incorrect: The argument is not circular.",
      "D is incorrect: There was no appeal to majority popularity."
    ]
  },
  {
    id: "ex4",
    title: "Example 4: Evaluating Cause-and-Effect Claims",
    type: "Causation Analysis",
    scenario: "A statewide survey reveals that schools with modern, air-conditioned computer laboratories have significantly higher student pass rates in mathematics than schools with non-air-conditioned laboratories. An education official concludes: 'Installing air conditioners directly improves students' mathematical cognition.'",
    question: "What is the most plausible alternative explanation that undermines the official's causal conclusion?",
    options: [
      "A) Schools that can afford air-conditioned computer labs are located in affluent districts with greater funding, better-paid teachers, smaller class sizes, and more extensive tutoring resources (the confounding variable).",
      "B) Air conditioners emit sound frequencies that erase mathematical knowledge.",
      "C) Students prefer studying mathematics in hot, humid rooms.",
      "D) Mathematics examinations cannot be graded in air-conditioned buildings."
    ],
    correctAnswer: 0, // A
    stepByStepReasoning: [
      "Step 1 (Detect Confounder): Wealthy school districts have money for air conditioning AND money for top teachers, tutoring, and books. School funding is the confounding variable driving both AC installation and high math scores.",
      "Step 2 (Evaluate Causal Claim): Cool air does not magically teach calculus; funding and educational resources do."
    ],
    distractorAnalysis: [
      "B, C, and D are factually absurd."
    ]
  },
  {
    id: "ex5",
    title: "Example 5: Comparing Competing Explanations",
    type: "Competing Explanations",
    scenario: "Alpha Fly's web server experienced an unexpected traffic surge at 11:30 PM on a Tuesday, with requests jumping from 50/sec to 2,000/sec.\n• Hypothesis 1: A malicious actor launched a distributed denial of service (DDoS) attack.\n• Hypothesis 2: A prominent Tamil tech influencer posted a YouTube video praising Alpha Fly's free coding tutorials at 11:28 PM.",
    question: "Which of the following pieces of evidence would decisively favor Hypothesis 2 over Hypothesis 1?",
    options: [
      "A) 92% of the incoming traffic requests contain HTTP referer headers from `youtube.com` and target the tutorial video landing page.",
      "B) The server CPU temperature rose by 5 degrees.",
      "C) It was raining heavily outside the server room.",
      "D) Tuesday is the third day of the work week."
    ],
    correctAnswer: 0, // A
    stepByStepReasoning: [
      "Step 1 (Check Referer Data): If 92% of requests carry `youtube.com` referers and navigate directly to the specific tutorial video mentioned by the influencer, it proves organic user traffic from YouTube, confirming Hypothesis 2.",
      "Step 2 (DDoS Signature): A DDoS attack typically uses spoofed botnet IPs, random URLs, or SYN floods with no valid HTTP referers."
    ],
    distractorAnalysis: [
      "B occurs in both traffic surges.",
      "C and D are completely irrelevant environmental facts."
    ]
  }
];

// ==========================================
// 5. PRACTICE SETS (A, B, C)
// ==========================================

export const practiceSetA = {
  id: "set_a",
  title: "Practice Set A: Necessary vs. Sufficient & Contradictions",
  subtitle: "Formal Conditionals and Identifying Inconsistent Data",
  timeLimitSeconds: 360, // 6 minutes
  questions: [
    {
      id: "ps_a1",
      question: "Which of the following statements illustrates a SUFFICIENT condition?",
      options: [
        "A) Being at least 18 years old is sufficient to become President of India.",
        "B) Boiling water at 100°C at sea level is sufficient to turn it into steam.",
        "C) Having four wheels is sufficient for a vehicle to be an electric Tesla car.",
        "D) Registering for an exam is sufficient to achieve an A grade."
      ],
      correctAnswer: "B",
      explanation: "Boiling water at 100°C at sea level guarantees the transition to steam (sufficient). A, C, and D describe necessary or insufficient conditions.",
      distractorNotes: "A is necessary (must be 35). C is insufficient (a tractor has 4 wheels). D does not guarantee grades."
    },
    {
      id: "ps_a2",
      question: "Rule: 'A student will pass the certification course IF they complete all 20 project milestones.' Fact: 'Sneha passed the certification course.' What can we conclude?",
      options: [
        "A) Sneha definitely completed all 20 project milestones.",
        "B) Sneha might have completed all 20 milestones, or passed through another allowable path (e.g. passing an equivalence exam).",
        "C) Sneha failed the course.",
        "D) Completing 20 milestones is the only way anyone can pass."
      ],
      correctAnswer: "B",
      explanation: "'If A, then B' establishes that A is sufficient, but NOT that A is the only way (necessary). Sneha passed, but we cannot assume she took that exact route.",
      distractorNotes: "A commits the converse fallacy. C contradicts fact. D is unstated."
    },
    {
      id: "ps_a3",
      question: "Which of the following pairs of statements represents a DIRECT CONTRADICTION?",
      options: [
        "A) 'Ravi works 40 hours a week' AND 'Ravi enjoys playing chess on weekends.'",
        "B) 'The software server had 100% uptime throughout October' AND 'The software server crashed and was unavailable for 4 hours on October 12th.'",
        "C) 'Python is easy to learn' AND 'C++ is fast.'",
        "D) 'Some students like online learning' AND 'Some students like classroom learning.'"
      ],
      correctAnswer: "B",
      explanation: "100% uptime means ZERO downtime. A 4-hour crash directly contradicts 100% uptime; both statements cannot be true simultaneously.",
      distractorNotes: "A, C, and D describe perfectly compatible, non-conflicting facts."
    },
    {
      id: "ps_a4",
      question: "Statement: 'A candidate is eligible for campus placement ONLY IF they have no active backlogs.' Which of the following is logically impossible?",
      options: [
        "A) An eligible candidate who has zero backlogs.",
        "B) An ineligible candidate who has 2 active backlogs.",
        "C) A candidate with 1 active backlog who is eligible for campus placement.",
        "D) A candidate who has zero backlogs but is ineligible due to low attendance."
      ],
      correctAnswer: "C",
      explanation: "Having zero backlogs is a NECESSARY condition. It is logically impossible for someone with backlogs to be eligible under this rule.",
      distractorNotes: "A, B, and D all obey the conditional rule."
    },
    {
      id: "ps_a5",
      question: "What is the biconditional statement 'A if and only if B' logically equivalent to?",
      options: [
        "A) If A then B, AND If B then A (both directions are valid).",
        "B) Neither A nor B can ever be true.",
        "C) A is true, but B is completely unknown.",
        "D) If A is false, B must be true."
      ],
      correctAnswer: "A",
      explanation: "Biconditional means mutual implication: A → B and B → A. A and B always share the exact same truth value.",
      distractorNotes: "B, C, and D misunderstand the biconditional definition."
    }
  ]
};

export const practiceSetB = {
  id: "set_b",
  title: "Practice Set B: Identifying 8 Logical Fallacies",
  subtitle: "Recognizing Flawed Arguments in Real-World Scenarios",
  timeLimitSeconds: 480, // 8 minutes
  questions: [
    {
      id: "ps_b1",
      question: "Speaker: 'You cannot believe Dr. Meenakshi's research paper on cyber security protocols because she was once fined for illegal parking.' Which fallacy is this?",
      options: [
        "A) Ad Hominem Fallacy",
        "B) False Dilemma",
        "C) Circular Reasoning",
        "D) Slippery Slope"
      ],
      correctAnswer: "A",
      explanation: "Attacking parking fines instead of evaluating the technical merit of her cyber security protocols is a classic Ad Hominem attack.",
      distractorNotes: "B presents two choices. C is circular. D is a chain of disasters."
    },
    {
      id: "ps_b2",
      question: "Statement: 'Our institute's coding bootcamp is the best in South India because millions of students believe it is the best.' Which fallacy is this?",
      options: [
        "A) Appeal to Popularity (Bandwagon Fallacy)",
        "B) Straw Man Fallacy",
        "C) Hasty Generalization",
        "D) Red Herring"
      ],
      correctAnswer: "A",
      explanation: "Arguing that something is high quality simply because a large number of people believe it is an Appeal to Popularity.",
      distractorNotes: "B distorts an argument. C generalizes from tiny sample. D distracts."
    },
    {
      id: "ps_b3",
      question: "Politician: 'Either you support our educational policy completely, or you hate all children and want education to fail.' Which fallacy is this?",
      options: [
        "A) False Dilemma (Black-and-White Fallacy)",
        "B) Ad Hominem",
        "C) Post Hoc Ergo Propter Hoc",
        "D) Confirmation Bias"
      ],
      correctAnswer: "A",
      explanation: "Artificially forcing a complex debate into two extreme choices while ignoring reasonable middle positions is a False Dilemma.",
      distractorNotes: "B attacks a person. C confuses timing with cause. D is selective memory."
    },
    {
      id: "ps_b4",
      question: "Manager: 'We must not allow employees to work from home on Fridays, because if we do, next they will demand Thursdays off, then Wednesdays, and soon nobody will ever come to the office again!' Which fallacy is this?",
      options: [
        "A) Slippery Slope Fallacy",
        "B) Straw Man Fallacy",
        "C) Hasty Generalization",
        "D) Appeal to Authority"
      ],
      correctAnswer: "A",
      explanation: "Claiming that one step will inevitably trigger a chain of unpreventable extreme consequences without evidence is a Slippery Slope.",
      distractorNotes: "B caricatures an argument. C is tiny sample. D cites a celebrity."
    },
    {
      id: "ps_b5",
      question: "Debater A: 'We should allocate 10% of our lab budget to buying ergonomic chairs for students.' Debater B: 'Debater A wants to bankrupt our institute and spend all our money on luxury furniture instead of computers!' Which fallacy did Debater B commit?",
      options: [
        "A) Straw Man Fallacy",
        "B) Circular Reasoning",
        "C) False Cause",
        "D) Ad Hominem"
      ],
      correctAnswer: "A",
      explanation: "Debater B grossly exaggerates 10% for ergonomic chairs into 'bankrupting the institute on luxury furniture', attacking an exaggerated caricature.",
      distractorNotes: "B is circular. C is causation. D is personal insult."
    }
  ]
};

export const practiceSetC = {
  id: "set_c",
  title: "Practice Set C: Evidence Evaluation & Causation",
  subtitle: "Confounding Variables, Counterexamples, and Causal Rigor",
  timeLimitSeconds: 600, // 10 minutes
  questions: [
    {
      id: "ps_c1",
      question: "A study finds that cities with more fire stations have more house fires. An analyst concludes: 'Building fire stations causes house fires.' What is the confounding variable?",
      options: [
        "A) City population size: larger cities have more residents, which naturally leads to both more fire stations and more fires.",
        "B) The color of fire trucks.",
        "C) Fire stations are made of flammable wood.",
        "D) Firefighters start fires deliberately."
      ],
      correctAnswer: "A",
      explanation: "Population is the third variable driving both fire station construction and the absolute number of house fires.",
      distractorNotes: "B, C, and D are absurd or irrelevant distractors."
    },
    {
      id: "ps_c2",
      question: "What is a 'Counterexample' and how does it function in critical thinking?",
      options: [
        "A) A polite compliment paid to an opponent.",
        "B) A single verifiable instance that directly disproves a universal general claim (e.g. finding one black swan disproves 'All swans are white').",
        "C) An arithmetic formula used to calculate percentages.",
        "D) A contract signed with an external auditor."
      ],
      correctAnswer: "B",
      explanation: "A counterexample decisively invalidates a universal generalization by demonstrating that the rule does not hold in all cases.",
      distractorNotes: "A is social etiquette. C is math. D is legal."
    },
    {
      id: "ps_c3",
      question: "An institute notices that students who take practice tests score 15% higher on final certification exams. How can the institute verify whether practice tests CAUSE the higher scores rather than just reflecting higher student motivation?",
      options: [
        "A) Randomly assign a single cohort into two groups: Group 1 completes practice tests, while Group 2 completes identical review lectures without practice tests, keeping all other variables identical.",
        "B) Assume that practice tests always work without testing.",
        "C) Ask students in a survey if they feel smarter.",
        "D) Delete all practice tests from the server."
      ],
      correctAnswer: "A",
      explanation: "A randomized controlled trial (A/B testing) isolates the intervention and controls for baseline motivation and prior ability.",
      distractorNotes: "B relies on assumption. C relies on subjective self-reporting. D avoids solving."
    },
    {
      id: "ps_c4",
      question: "What is 'Confirmation Bias' in professional decision-making?",
      options: [
        "A) The habit of actively searching only for data that supports one's pre-existing hypothesis while ignoring contradictory evidence.",
        "B) Confirming meeting invitations by email.",
        "C) Passing a software test on the first try.",
        "D) Double-checking mathematical additions."
      ],
      correctAnswer: "A",
      explanation: "Confirmation bias distorts reality by selectively remembering and validating only information that fits pre-existing beliefs.",
      distractorNotes: "B is office etiquette. C is testing success. D is verification diligence."
    },
    {
      id: "ps_c5",
      question: "When new empirical evidence surfaces that directly disproves your previous hypothesis, what is the rational response of a master critical thinker?",
      options: [
        "A) Suppress the evidence and attack the credibility of whoever discovered it.",
        "B) Update your conclusion to align with the new evidence (Bayesian belief updating).",
        "C) Insist that your original belief was spiritually true even if factually false.",
        "D) Resign from your job immediately."
      ],
      correctAnswer: "B",
      explanation: "Critical thinking demands intellectual humility and updating beliefs when confronted with valid new empirical data.",
      distractorNotes: "A is dogmatic suppression. C is cognitive dissonance. D is an extreme overreaction."
    }
  ]
};

// ==========================================
// 6. REAL-WORLD CASE STUDY (PART 2)
// ==========================================

export const caseStudyData = {
  title: "Case Study: Does Additional Practice Improve Examination Results?",
  subtitle: "Part 2: Deep-Dive Causation Analysis & Evidence Evaluation",
  context: "Alpha Fly Computer Education tracked 80 students across two parallel Python certification batches. The academic team compiled the following empirical dataset after the final semester examination:",
  metricsTable: [
    { studentGroup: "Students who voluntarily attended Saturday practice labs", studentCount: 40, averageScore: 82 },
    { studentGroup: "Students who did not attend Saturday practice labs", studentCount: 40, averageScore: 74 }
  ],
  tasks: [
    {
      id: 1,
      prompt: "1. State the verified empirical facts shown by the table.",
      hint: "List the sample sizes and average examination scores for both groups."
    },
    {
      id: 2,
      prompt: "2. Calculate the difference in average scores between the two student groups.",
      hint: "Subtract the non-attending average from the attending average."
    },
    {
      id: 3,
      prompt: "3. State one conclusion that is DIRECTLY supported by the data without making unstated assumptions.",
      hint: "Keep the claim strictly descriptive of this specific cohort."
    },
    {
      id: 4,
      prompt: "4. Identify two hidden assumptions required to claim that Saturday practice CAUSED the 8-point score difference.",
      hint: "Think about student motivation, prior background, and baseline ability."
    },
    {
      id: 5,
      prompt: "5. Suggest three plausible alternative explanations for the 8-point gap.",
      hint: "Why would students voluntarily attend on Saturdays? Could self-selection be at play?"
    },
    {
      id: 6,
      prompt: "6. What additional evidence or experimental design would establish a genuine causal relationship?",
      hint: "Consider randomized assignment (A/B testing) rather than voluntary self-selection."
    },
    {
      id: 7,
      prompt: "7. Evaluate the statement: 'Every student who attends Saturday practice will score higher than students who do not.'",
      hint: "Does a difference in group averages guarantee that EVERY individual in Group 1 scores higher than EVERY individual in Group 2?"
    },
    {
      id: 8,
      prompt: "8. Formulate a balanced, defensible institutional conclusion that does not overstate the evidence.",
      hint: "Acknowledge the positive association while recommending further controlled validation."
    }
  ],
  modelAnswer: {
    verifiedFacts: "Fact 1: 40 students attended Saturday practice labs voluntarily and achieved an average score of 82. Fact 2: 40 students did not attend and achieved an average score of 74. Fact 3: The attending group scored 8 points higher on average (82 - 74 = 8).",
    directConclusion: "In this specific cohort, students who voluntarily attended Saturday practice sessions achieved an 8-point higher average examination score than those who did not.",
    hiddenAssumptions: "Assumption 1: Both groups had identical baseline intelligence, programming background, and academic dedication prior to the Saturday labs. Assumption 2: The Saturday labs were the sole differentiator, and attending students did not study more hours at home during weekdays.",
    alternativeExplanations: "1) Self-Selection Bias: Highly dedicated and ambitious students chose to attend on Saturdays, and their high motivation would have produced higher scores anyway. 2) Prior Coding Knowledge: Students with prior exposure to coding felt more confident in labs. 3) Socioeconomic Flexibility: Students without weekend jobs or caregiving responsibilities had more overall free time to rest and study.",
    causalEvidenceNeeded: "A Randomized Controlled Trial (RCT): Randomly assign 80 students into two mandatory groups (40 assigned to Saturday labs, 40 assigned to standard self-study) after baseline pre-testing to equalize motivation and prior knowledge.",
    evaluationOfUniversalClaim: "The statement is logically FALSE. An average score difference between two groups of 40 does NOT mean every individual student scored higher. In reality, a student in the non-attending group could have scored 95, while an attending student could have scored 65. Averages describe group aggregates, not individual guarantees.",
    balancedConclusion: "'The data demonstrates a positive association between voluntary Saturday practice attendance and higher examination performance (+8 points). While additional lab practice is strongly recommended as an enriching study opportunity, student motivation and prior preparation likely contributed to the difference. A randomized study is recommended to measure the isolated causal impact.'"
  }
};

// ==========================================
// 7. COMMON MISTAKES AND STRATEGIES
// ==========================================

export const commonMistakes = [
  {
    mistake: "Treating Correlation as Proof of Causation",
    whyItHappens: "Assuming that because Variable A and Variable B increase together, A must have caused B.",
    correction: "Always ask: 'Could a third confounding variable explain both, or could B be causing A, or is it coincidental?'"
  },
  {
    mistake: "Conflating Necessary and Sufficient Conditions",
    whyItHappens: "Assuming that satisfying a prerequisite condition guarantees the final outcome.",
    correction: "Remember: Oxygen is necessary for fire, but having oxygen does not guarantee a fire breaks out."
  },
  {
    mistake: "The Fallacy of the Average (Ecological Fallacy)",
    whyItHappens: "Assuming that every individual member of a group shares the exact properties of the group's mathematical average.",
    correction: "Averages describe cohorts; individual distributions contain significant overlap and outliers."
  },
  {
    mistake: "Falling for False Dilemmas",
    whyItHappens: "Accepting an argument that restricts options to two stark extremes without exploring intermediate compromises.",
    correction: "Always look for the third, fourth, and fifth options between extreme poles."
  },
  {
    mistake: "Ad Hominem Disregard",
    whyItHappens: "Dismissing a valid technical proposal or fact simply because you dislike the person who stated it.",
    correction: "Separate the message from the messenger: evaluate claims on empirical data, not personality."
  }
];

export const practicalChecklist = [
  "1. Is the conditional rule stating necessity ('only if') or sufficiency ('if')?",
  "2. Are two claims mutually exclusive under the exact same operational conditions?",
  "3. Does the argument rely on any of the 8 classic fallacies (e.g. slippery slope, ad hominem)?",
  "4. Does the data prove causation, or does it merely establish statistical association?",
  "5. Could self-selection bias or a confounding variable explain the observed difference?",
  "6. Does the conclusion apply to groups on average, or does it make unwarranted individual guarantees?"
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
    domain: "Necessary vs Sufficient",
    question: "Having a valid driving license is which type of condition for legally driving a motor vehicle on public roads?",
    options: [
      "A) A sufficient condition",
      "B) A necessary condition",
      "C) Both necessary and sufficient",
      "D) Neither necessary nor sufficient"
    ],
    correctAnswer: "B",
    explanation: "A driving license is NECESSARY (you cannot legally drive without it). It is not sufficient because you also need a vehicle, fuel, sobriety, and insurance.",
    distractorNotes: "A is false because a license alone does not put you on the road. C and D misunderstand the terms."
  },
  {
    id: "fa_q2",
    level: "Easy",
    domain: "Contradictions",
    question: "Which of the following pairs of statements is logically INCONSISTENT (cannot both be true)?",
    options: [
      "A) 'The server CPU usage was 45%' AND 'The server RAM usage was 85%.'",
      "B) 'Every student enrolled in Batch A passed the exam' AND 'Kavitha is enrolled in Batch A and failed the exam.'",
      "C) 'Python is interpreted' AND 'C is compiled.'",
      "D) 'It rained in Chennai' AND 'It was sunny in Madurai.'"
    ],
    correctAnswer: "B",
    explanation: "If EVERY student in Batch A passed, Kavitha cannot be in Batch A and have failed. They are mutually exclusive.",
    distractorNotes: "A, C, and D describe completely compatible, non-conflicting statements."
  },
  {
    id: "fa_q3",
    level: "Easy",
    domain: "Logical Fallacies",
    question: "What is an 'Ad Hominem' fallacy?",
    options: [
      "A) Attacking an opponent's physical appearance or personal character rather than addressing the substance of their argument",
      "B) Quoting too many statistics in a debate",
      "C) Using difficult technical jargon",
      "D) Forgetting to provide a conclusion"
    ],
    correctAnswer: "A",
    explanation: "Ad hominem translates to 'to the person'—dismissing a claim by insulting the speaker.",
    distractorNotes: "B, C, and D are not logical fallacies."
  },
  {
    id: "fa_q4",
    level: "Easy",
    domain: "Correlation vs Causation",
    question: "A researcher notes that people who sleep 8 hours a night report higher career satisfaction. What can be scientifically concluded?",
    options: [
      "A) Sleeping 8 hours is correlated with higher career satisfaction, but this alone does not prove causation.",
      "B) Sleeping 8 hours guarantees that anyone will be promoted to manager.",
      "C) Career satisfaction causes insomnia.",
      "D) People who work hard never sleep."
    ],
    correctAnswer: "A",
    explanation: "Correlation does not prove causation. Higher satisfaction might lead to better sleep, or less stressful jobs allow both.",
    distractorNotes: "B leaps to causal guarantees. C and D are unverified extremes."
  },
  {
    id: "fa_q5",
    level: "Easy",
    domain: "False Dilemma",
    question: "Which of the following is an example of a FALSE DILEMMA?",
    options: [
      "A) 'Either you invest all your savings in cryptocurrency today, or you will die in poverty!'",
      "B) 'Water freezes at 0°C at normal atmospheric pressure.'",
      "C) 'All squares are rectangles.'",
      "D) 'Some software projects finish on time.'"
    ],
    correctAnswer: "A",
    explanation: "Option A artificially restricts financial planning to two extreme choices (crypto vs poverty), ignoring thousands of diversified investment options.",
    distractorNotes: "B is physical science. C is geometry. D is an empirical observation."
  },
  {
    id: "fa_q6",
    level: "Easy",
    domain: "Necessary Conditions",
    question: "Oxygen is which type of condition for a wooden matchstick to catch fire and burn?",
    options: [
      "A) A necessary condition",
      "B) A sufficient condition",
      "C) An irrelevant condition",
      "D) An imaginary condition"
    ],
    correctAnswer: "A",
    explanation: "Oxygen is necessary (fire cannot exist without an oxidizer). It is not sufficient because you also need heat and fuel.",
    distractorNotes: "B is wrong because matches sitting in an oxygen-rich room do not spontaneously burn. C and D are false."
  },
  {
    id: "fa_q7",
    level: "Easy",
    domain: "Hasty Generalization",
    question: "A tourist visits a city for 2 hours, meets one rude taxi driver, and declares: 'All citizens of this city are terrible and rude!' Which fallacy did the tourist commit?",
    options: [
      "A) Hasty Generalization",
      "B) Appeal to Tradition",
      "C) Circular Reasoning",
      "D) Red Herring"
    ],
    correctAnswer: "A",
    explanation: "Generalizing about an entire city population from a single individual sample is a textbook Hasty Generalization.",
    distractorNotes: "B appeals to custom. C repeats the premise. D introduces a distraction."
  },

  // ------------------------------------------
  // MEDIUM LEVEL (QUESTIONS 8 - 14)
  // ------------------------------------------
  {
    id: "fa_q8",
    level: "Medium",
    domain: "Conditionals & Contrapositives",
    question: "Rule: 'An employee receives a year-end performance bonus ONLY IF their project delivery was rated 'Exemplary'.' Employee Manoj received a year-end performance bonus. What MUST be true?",
    options: [
      "A) Manoj's project delivery was rated 'Exemplary'.",
      "B) Manoj was the top-rated employee in the company.",
      "C) Every employee whose delivery was rated 'Exemplary' received a bonus.",
      "D) Manoj will receive a promotion next week."
    ],
    correctAnswer: "A",
    explanation: "'Bonus only if Exemplary' means Bonus → Exemplary. Since Manoj received the bonus, his project delivery MUST have been rated 'Exemplary'.",
    distractorNotes: "B and D are unsupported speculations. C confuses necessary with sufficient."
  },
  {
    id: "fa_q9",
    level: "Medium",
    domain: "Fallacy Identification",
    question: "Debater: 'We must not allow students to use calculators during introductory physics tests, because if we do, next they will demand computers, then they will demand AI bots write their theses, and within 3 years students won't know how to read or write!' Which fallacy is this?",
    options: [
      "A) Slippery Slope Fallacy",
      "B) Straw Man Fallacy",
      "C) Ad Hominem Fallacy",
      "D) Bandwagon Fallacy"
    ],
    correctAnswer: "A",
    explanation: "Claiming that a modest calculator allowance will inevitably trigger an extreme catastrophe without evidence is a Slippery Slope.",
    distractorNotes: "B distorts an opponent's argument. C attacks character. D appeals to crowds."
  },
  {
    id: "fa_q10",
    level: "Medium",
    domain: "Confounding Variables",
    question: "A hospital reports that patients who consume olive oil live 4 years longer on average than patients who consume margarine. A doctor concludes that olive oil chemically extends human life. What confounding variable might explain this association?",
    options: [
      "A) Olive oil consumers typically have higher incomes, consume more vegetables, exercise more regularly, and have better access to quality healthcare.",
      "B) Olive oil is made from olives.",
      "C) Margarine was invented in France.",
      "D) Doctors prefer green bottles over yellow tubs."
    ],
    correctAnswer: "A",
    explanation: "Socioeconomic status and overall healthy lifestyle habits are confounding variables that strongly influence longevity and dietary choices.",
    distractorNotes: "B and C are trivia. D is irrelevant preference."
  },
  {
    id: "fa_q11",
    level: "Medium",
    domain: "Contradiction Resolution",
    question: "Two reports present conflicting claims:\n• Report 1: 'All 30 workstations in Lab 2 were fully operational at 10:00 AM on Monday.'\n• Report 2: 'Student Suresh was unable to log in to Workstation #14 at 10:00 AM on Monday because its operating system was missing.'\nWhich finding would successfully RECONCILE this conflict?",
    options: [
      "A) Workstation #14 was located in Lab 1, not Lab 2; Suresh entered the wrong classroom.",
      "B) Operating systems are not necessary for workstations.",
      "C) Lab 2 has only 5 workstations.",
      "D) Both reports are completely accurate about the same computer in the same room."
    ],
    correctAnswer: "A",
    explanation: "If Suresh was in Lab 1, then Lab 2's workstations were indeed all operational, resolving the spatial conflict seamlessly.",
    distractorNotes: "B is technical nonsense. C contradicts Report 1. D ignores the mutual exclusion."
  },
  {
    id: "fa_q12",
    level: "Medium",
    domain: "Circular Reasoning",
    question: "Which of the following represents CIRCULAR REASONING?",
    options: [
      "A) 'The law should be obeyed because it is the law and illegal actions are against the law.'",
      "B) 'We must clean the computer filters because dust blocks ventilation and causes thermal throttling.'",
      "C) 'If you drop a glass on concrete, it will shatter.'",
      "D) 'Some students prefer Python over Java.'"
    ],
    correctAnswer: "A",
    explanation: "Statement A provides zero independent justification for the law; it merely defines the law by itself in a circular loop.",
    distractorNotes: "B provides causal physical reasons. C is empirical physics. D is an observation."
  },
  {
    id: "fa_q13",
    level: "Medium",
    domain: "Straw Man Identification",
    question: "Director: 'We should hire an external consultant to audit our student assessment grading criteria.' Professor: 'So you are saying our faculty members are all corrupt criminals who deliberately fail students!' Which fallacy is the professor committing?",
    options: [
      "A) Straw Man Fallacy",
      "B) Slippery Slope Fallacy",
      "C) False Cause Fallacy",
      "D) Appeal to Tradition"
    ],
    correctAnswer: "A",
    explanation: "The professor exaggerates a standard quality audit into an accusation of 'corrupt criminals', attacking an extreme distortion.",
    distractorNotes: "B is an unpreventable chain. C is causation. D appeals to historical custom."
  },
  {
    id: "fa_q14",
    level: "Medium",
    domain: "Necessary vs Sufficient Scenarios",
    question: "A company's recruitment rule states: 'A bachelor's degree in engineering is necessary to apply for the Junior Architect role.' Candidate Vikram holds a bachelor's degree in engineering. Which of the following is true?",
    options: [
      "A) Vikram is guaranteed to receive a job offer.",
      "B) Vikram is eligible to submit an application, but has no guarantee of being hired.",
      "C) Vikram cannot apply because degrees are not sufficient.",
      "D) Vikram will be rejected immediately."
    ],
    correctAnswer: "B",
    explanation: "The degree is necessary to apply (it meets the baseline filter). It is not sufficient for a job offer, which requires interviews and reviews.",
    distractorNotes: "A confuses necessary with sufficient. C and D contradict the rule."
  },

  // ------------------------------------------
  // HARD LEVEL (QUESTIONS 15 - 20)
  // ------------------------------------------
  {
    id: "fa_q15",
    level: "Hard",
    domain: "Complex Necessary vs Sufficient",
    question: "Consider this formal conditional rule in database transaction safety:\n'A transaction commit is durable ONLY IF it has been written to the non-volatile transaction log.'\nWhich of the following scenarios violates this rule?",
    options: [
      "A) A transaction commit that is durable, but was never written to the non-volatile transaction log.",
      "B) A transaction that was written to the non-volatile transaction log, but aborted before commit.",
      "C) A transaction that was written to the log and successfully committed.",
      "D) A transaction that was neither logged nor committed."
    ],
    correctAnswer: "A",
    explanation: "Durable → Logged. If a transaction is durable without being logged, the necessary condition was breached, representing a catastrophic violation of the rule.",
    distractorNotes: "B is an aborted transaction (valid). C is normal success. D is an uninitiated transaction."
  },
  {
    id: "fa_q16",
    level: "Hard",
    domain: "Evaluating Competing Causal Explanations",
    question: "A tech institute adds a 1-hour weekly career-coaching session to its curriculum. Over the next year, graduate placements rise by 25%. A business analyst wants to determine whether career coaching caused the rise. Which piece of data would most strongly WEAKEN the claim that career coaching caused the placement increase?",
    options: [
      "A) During the same year, the regional tech industry experienced a 300% surge in entry-level hiring, and competitor institutes without career coaching saw their placements rise by 35%.",
      "B) The career coach has 10 years of human resource experience.",
      "C) Students filled out positive surveys about the career coach.",
      "D) The career coaching sessions were held in Room 3B."
    ],
    correctAnswer: "A",
    explanation: "If competitor institutes without career coaching achieved even higher placement growth (+35%), the macro hiring boom was the true cause, not the coaching sessions.",
    distractorNotes: "B, C, and D do not evaluate the external macro market confounder."
  },
  {
    id: "fa_q17",
    level: "Hard",
    domain: "Formal Contradiction in Business Claims",
    question: "An audited financial report for an online software training company contains four statements:\n1. All course offerings generated a profit in Q2.\n2. The Data Science course incurred marketing expenses that exceeded its tuition revenue by ₹50,000 in Q2, with zero other income sources.\n3. The Web Development course generated ₹2,00,000 net profit in Q2.\n4. Total company net profit was positive in Q2.\nWhich pair of statements directly contradicts each other?",
    options: [
      "A) Statement 1 and Statement 2",
      "B) Statement 3 and Statement 4",
      "C) Statement 1 and Statement 4",
      "D) Statement 2 and Statement 4"
    ],
    correctAnswer: "A",
    explanation: "Statement 1 claims ALL courses were profitable. Statement 2 describes the Data Science course running a net loss of ₹50,000. These two statements are mutually exclusive.",
    distractorNotes: "B, C, and D are perfectly compatible."
  },
  {
    id: "fa_q18",
    level: "Hard",
    domain: "Subtle Fallacy Identification",
    question: "An AI researcher states: 'Deep neural networks process information through layered node weights. Human brains also process information through layered synaptic connections. Therefore, deep neural networks possess human emotional consciousness.' Which fallacy is present?",
    options: [
      "A) False Analogy Fallacy (assuming that sharing superficial structural properties guarantees identical emergent consciousness)",
      "B) Ad Hominem Fallacy",
      "C) Appeal to Ignorance",
      "D) Slippery Slope"
    ],
    correctAnswer: "A",
    explanation: "Assuming that because two systems share computational layer abstractions they must share complex biological/emotional consciousness is a classic False Analogy.",
    distractorNotes: "B attacks a person. C argues absence of evidence. D is a disaster chain."
  },
  {
    id: "fa_q19",
    level: "Hard",
    domain: "Self-Selection Bias Analysis",
    question: "A coding platform publishes: 'Users who complete our optional daily 6:00 AM coding challenge have a 95% interview pass rate, compared to 40% for other users. Therefore, waking up at 6:00 AM to code will make you pass technical interviews.' What is the primary methodological flaw in this argument?",
    options: [
      "A) Survivorship and Self-Selection Bias: Individuals who voluntarily wake up at 6:00 AM daily to practice coding possess extraordinary discipline, work ethic, and motivation that would make them pass interviews regardless of the time of day.",
      "B) 6:00 AM is too dark for computer screens.",
      "C) Technical interviews do not use computers.",
      "D) The platform was founded in 2020."
    ],
    correctAnswer: "A",
    explanation: "Self-selection bias invalidates the causal claim. The underlying trait (extraordinary personal discipline) drives both early rising and interview success.",
    distractorNotes: "B, C, and D are frivolous or irrelevant."
  },
  {
    id: "fa_q20",
    level: "Hard",
    domain: "Advanced Evidence Synthesis",
    question: "A clinical trial tests a new drug for focus among 1,000 students. In Group A (received drug), 70% reported improved focus. In Group B (received a sugar pill placebo), 68% reported improved focus. What conclusion is scientifically and logically valid?",
    options: [
      "A) The drug is a revolutionary breakthrough that must be administered to all students immediately.",
      "B) The drug demonstrated no statistically significant therapeutic efficacy beyond the placebo effect (70% vs 68% is within normal experimental noise).",
      "C) Sugar causes high mental focus.",
      "D) Clinical trials are useless."
    ],
    correctAnswer: "B",
    explanation: "When an active intervention produces virtually identical results to a placebo control (70% vs 68%), the drug has no proven clinical efficacy.",
    distractorNotes: "A ignores the control group. C confuses the placebo mechanism. D rejects science."
  }
];

// ==========================================
// 9. REVISION & CRITICAL-THINKING CHEAT SHEET
// ==========================================

export const revisionCheatSheet = {
  title: "Day 13 Revision: Conditions, Fallacies & Evidence Cheat Sheet",
  corePrinciples: [
    { title: "Necessary vs Sufficient", desc: "Sufficient guarantees the result (If A → B). Necessary is an unavoidable prerequisite (B only if A). Never reverse them." },
    { title: "Contradiction Detection", desc: "Two statements cannot both be true simultaneously. Identify mutually exclusive claims and verify with third-party audit logs." },
    { title: "The 8 Core Fallacies", desc: "Hasty Generalization, False Cause, False Dilemma, Ad Hominem, Bandwagon, Circular Reasoning, Straw Man, Confirmation Bias." },
    { title: "Correlation ≠ Causation", desc: "Co-occurrence does not prove causation. Always look for confounding variables and self-selection bias." },
    { title: "The Counterexample Method", desc: "A single verifiable counterexample destroys a universal generalization. Search vigorously for disconfirming data." },
    { title: "Group Averages vs Individuals", desc: "A difference in group averages never guarantees that every individual in Group 1 outperforms Group 2." }
  ],
  criticalThinkingChecklist: [
    "1. Is a condition being claimed as sufficient (guarantee) or merely necessary (prerequisite)?",
    "2. Are any statements in this report or audit mutually exclusive?",
    "3. Is the argument attacking the opponent's character rather than evaluating their evidence?",
    "4. Does this claim confuse an after-the-fact event with a direct causal mechanism?",
    "5. Could an unmeasured confounding variable (e.g. socioeconomic background) explain the correlation?",
    "6. Have we tested whether this conclusion holds under rigorous A/B randomized conditions?"
  ]
};
