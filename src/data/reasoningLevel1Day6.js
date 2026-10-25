/**
 * SPOKO Logical Reasoning - Level 1, Day 6: Basic Deductive Reasoning
 * Comprehensive lesson data, worked examples, interactive practice modules,
 * quick revision summary, and exactly 20 unique multiple-choice practice questions.
 */

// ==========================================
// DAY 6 OVERVIEW & LEARNING OBJECTIVES
// ==========================================
export const day6Overview = {
  dayNumber: 6,
  level: "Level 1: Beginner",
  course: "Logical Reasoning & Analytical Thinking",
  title: "Basic Deductive Reasoning",
  duration: "45–60 mins",
  difficulty: "Beginner",
  description: "Master the foundation of formal logic: evaluate premises, draw necessary conclusions, avoid invalid reverse inferences, identify direct contradictions, and solve real-world problems strictly using provided information.",
  objectives: [
    "Understand the core definition and mechanics of deductive reasoning.",
    "Distinguish clearly between facts, stated premises, conclusions, and unverified assumptions.",
    "Draw logically necessary conclusions from given premises without guessing.",
    "Understand universal and specific quantifiers: 'All', 'Some', and 'None'.",
    "Identify whether a stated conclusion necessarily follows or fails to follow.",
    "Spot invalid reverse conclusions (e.g. reversing 'All A are B' to 'All B are A').",
    "Recognize direct contradictions between statements under identical conditions.",
    "Apply disciplined deductive reasoning to everyday academic, office, and business situations."
  ],
  stats: {
    totalSections: 7,
    practiceQuestions: 20,
    passingScore: "70% (14 / 20)",
    estimatedReadTime: "25–30 mins"
  }
};

// ==========================================
// SECTION 1: INTRODUCTION TO DEDUCTIVE REASONING
// ==========================================
export const section1Content = {
  title: "Introduction to Deductive Reasoning",
  concept: "Deductive reasoning is a method of thinking where you start with given statements (called premises) that are accepted as 100% true. From these premises, you determine what MUST logically follow. If the premises are true and the logic is valid, the conclusion is guaranteed to be true.",
  coreDefinitions: [
    {
      term: "Premise",
      definition: "A statement accepted as an undeniable fact for the purpose of the problem, regardless of real-world skepticism.",
      badge: "The Foundation"
    },
    {
      term: "Conclusion",
      definition: "A statement that is logically and inescapably derived directly from the stated premises.",
      badge: "The Inescapable Result"
    },
    {
      term: "Assumption",
      definition: "An unstated belief treated as true without explicit supporting evidence in the problem. Deductive reasoning strictly forbids unstated assumptions!",
      badge: "The Danger Zone"
    }
  ],
  primaryExample: {
    statement1: "All birds have feathers.",
    statement2: "A sparrow is a bird.",
    conclusion: "A sparrow has feathers.",
    explanation: "Because Statement 1 asserts that 100% of birds have feathers, and Statement 2 confirms that a sparrow is within the category of birds, it is an inescapable mathematical certainty that a sparrow has feathers. The conclusion strictly follows."
  },
  additionalExamples: [
    {
      id: "sec1_ex1",
      statement1: "All mammals breathe air.",
      statement2: "Whales are mammals.",
      conclusion: "Whales breathe air.",
      explanation: "Statement 1 applies air-breathing to every single mammal. Statement 2 classifies whales as mammals. Therefore, whales must breathe air."
    },
    {
      id: "sec1_ex2",
      statement1: "All fruits contain seeds.",
      statement2: "An apple is a fruit.",
      conclusion: "An apple contains seeds.",
      explanation: "Since every member of the fruit class contains seeds, and an apple is a fruit, it follows that an apple contains seeds."
    }
  ]
};

// ==========================================
// SECTION 2: FACTS, STATEMENTS, AND ASSUMPTIONS
// ==========================================
export const section2Content = {
  title: "Facts, Statements, and Assumptions",
  concept: "The cardinal rule of deductive reasoning is: Rely ONLY on the information explicitly provided in the question. Never bring in outside knowledge or personal opinions to fill in blanks.",
  ruleCard: "Golden Rule: Treat the problem as a self-contained universe. If a statement says 'All dogs have wings', you must accept it as fact within that problem! Do not let real-world facts override problem premises.",
  contrastCase: {
    validCase: {
      title: "Case 1: Universal Statement (Valid Deduction)",
      statement: "All employees in Team A attended the training.",
      given: "Ravi is an employee in Team A.",
      conclusion: "Ravi attended the training.",
      result: "The conclusion follows.",
      reasoning: "Because 'All' includes 100% of Team A members, Ravi is definitively included."
    },
    invalidCase: {
      title: "Case 2: Particular Statement (Invalid Assumption)",
      statement: "Some employees attended the training.",
      given: "Ravi is an employee.",
      conclusion: "Ravi attended the training.",
      result: "The conclusion does NOT follow.",
      reasoning: "'Some' means at least one, but not necessarily all. Ravi could easily be one of the employees who did not attend. We cannot assume he was there."
    }
  },
  checklistItems: [
    "Is this fact explicitly written in the statements?",
    "Am I using outside knowledge that was not mentioned?",
    "Could there be a possibility where the conclusion is false even if the premises are true?",
    "If any possibility of falsehood exists, the conclusion DOES NOT follow!"
  ]
};

// ==========================================
// SECTION 3: ALL, SOME, AND NONE
// ==========================================
export const section3Content = {
  title: "All, Some, and None",
  concept: "In deductive reasoning, logical quantifiers define the exact scope of relationships between categories. Mastering the precise logical boundaries of 'All', 'Some', and 'None' is essential.",
  quantifiers: [
    {
      id: "all",
      name: "All (Universal Affirmative)",
      definition: "100% of category A is entirely contained inside category B.",
      whatItEstablishes: "Every single A is a B. If X is an A, X is guaranteed to be a B.",
      whatItDoesNotEstablish: "It does NOT mean that all B are A! (e.g. All roses are flowers does NOT mean all flowers are roses).",
      example: "All roses are flowers. A red rose is a rose. Therefore, a red rose is a flower."
    },
    {
      id: "some",
      name: "Some (Particular Affirmative)",
      definition: "At least one member (from 1 to 100%) of category A overlaps with category B.",
      whatItEstablishes: "There is at least one shared member between A and B.",
      whatItDoesNotEstablish: "It does NOT guarantee that all A are B, nor does it guarantee that some A are not B. It only guarantees a minimum of one overlap.",
      example: "Some students play chess. This establishes that at least one student plays chess, but does not tell us about any specific individual student."
    },
    {
      id: "none",
      name: "None / No (Universal Negative)",
      definition: "0% overlap. Category A and category B are completely separate with zero shared elements.",
      whatItEstablishes: "If X belongs to A, X can NEVER belong to B. The separation is total and absolute.",
      whatItDoesNotEstablish: "No exceptions or partial overlaps are permitted.",
      example: "No squares are circles. A particular shape is a square. Therefore, that shape is definitely not a circle."
    }
  ]
};

// ==========================================
// SECTION 4: DRAWING LOGICAL CONCLUSIONS
// ==========================================
export const section4Content = {
  title: "Drawing Logical Conclusions",
  concept: "A deductive conclusion is valid if and only if it is IMPOSSIBLE for the premises to be true and the conclusion to be false at the same time. One of the most frequent traps in competitive exams is the invalid reverse statement.",
  validExample: {
    statement1: "All managers are employees.",
    statement2: "Priya is a manager.",
    conclusion: "Priya is an employee.",
    status: "The conclusion follows.",
    explanation: "Since the entire set of managers is enclosed within employees, Priya (being a manager) is automatically an employee."
  },
  invalidReverseExample: {
    statement1: "All doctors are educated.",
    conclusion: "All educated people are doctors.",
    status: "The conclusion DOES NOT follow.",
    explanation: "Reversing a universal statement is a fundamental logical error. While all doctors belong to the educated group, the educated group includes engineers, teachers, lawyers, and writers. Not all educated people are doctors!"
  },
  commonTraps: [
    {
      trap: "The Reverse Trap",
      badLogic: "'All A are B' does NOT imply 'All B are A'.",
      example: "All cats are animals does NOT mean all animals are cats."
    },
    {
      trap: "The 'Some' Specificity Trap",
      badLogic: "'Some A are B' does NOT allow you to conclude that a specific individual X is B.",
      example: "Some employees are late does NOT prove that John is late."
    },
    {
      trap: "The Real-World Bias Trap",
      badLogic: "Accepting a conclusion because it sounds true in real life, even when the premises don't support it.",
      example: "Always ask: Did the premises explicitly force this conclusion?"
    }
  ]
};

// ==========================================
// SECTION 5: IDENTIFYING CONTRADICTIONS
// ==========================================
export const section5Content = {
  title: "Identifying Contradictions",
  concept: "A contradiction occurs when two or more statements make claims that cannot both be true simultaneously under the exact same conditions. Spotting contradictions allows you to eliminate impossible scenarios and detect conflicting premises.",
  contradictionExample: {
    statement1: "All members attended the meeting.",
    statement2: "Arun is a member and did not attend the meeting.",
    analysis: "Statement 1 claims 100% attendance of members. Statement 2 identifies a member who did not attend. Both statements cannot be true at the same time. They directly contradict each other."
  },
  auditChecklist: [
    {
      step: "1. Direct Conflict Check",
      desc: "Does statement A say something occurred while statement B says it did not?"
    },
    {
      step: "2. Subject & Identity Check",
      desc: "Are both statements referring to the exact same person, object, or defined group?"
    },
    {
      step: "3. Time & Condition Check",
      desc: "Did the events take place at the same time and place, or did conditions differ (e.g. morning vs evening)?"
    },
    {
      step: "4. Premise vs Conclusion Check",
      desc: "Does a proposed conclusion directly negate or violate one of the given premises?"
    }
  ]
};

// ==========================================
// SECTION 6: DEDUCTIVE REASONING IN EVERYDAY SITUATIONS
// ==========================================
export const section6Content = {
  title: "Deductive Reasoning in Everyday Situations",
  concept: "Deductive logic is not just for formal philosophy exams; it is the core thinking mechanism behind software testing, legal compliance, financial auditing, and workplace decision-making.",
  realWorldScenarios: [
    {
      domain: "Academic / Student Scenario",
      statement: "Every student who passes the final assessment receives a course certificate.",
      given: "Meena passed the final assessment.",
      conclusion: "Meena receives a course certificate.",
      status: "Conclusion Follows",
      explanation: "The condition for receiving a certificate is passing the final assessment. Meena fulfilled the condition, so she is guaranteed the certificate."
    },
    {
      domain: "Workplace & HR Scenario",
      statement: "Every approved leave request is recorded in the central attendance system.",
      given: "Kumar's leave request was officially approved.",
      conclusion: "Kumar's leave is recorded in the central attendance system.",
      status: "Conclusion Follows",
      explanation: "Since 100% of approved leaves are recorded, Kumar's approved leave must be recorded. No outside speculation is needed."
    },
    {
      domain: "Commercial & Business Scenario",
      statement: "All paid orders are automatically marked as 'Paid' in the billing system.",
      given: "Order 104 has been successfully paid.",
      conclusion: "Order 104 is marked as 'Paid' in the billing system.",
      status: "Conclusion Follows",
      explanation: "The billing rule applies universally to all paid orders. Order 104 satisfies the condition, so its status is guaranteed."
    }
  ]
};

// ==========================================
// SECTION 7: A STEP-BY-STEP DEDUCTIVE REASONING METHOD
// ==========================================
export const section7Content = {
  title: "A Step-by-Step Deductive Reasoning Method",
  concept: "Follow this disciplined 7-step method to solve any deductive reasoning question with speed and certainty:",
  sevenSteps: [
    { num: 1, title: "Read Statements Carefully", desc: "Read every premise word for word. Pay special attention to quantifiers (All, Some, None, Only)." },
    { num: 2, title: "Identify the Stated Premises", desc: "List what is accepted as absolute fact for this problem. Ignore your personal opinions." },
    { num: 3, title: "Examine the Conclusion", desc: "Look at the exact claim being made in the conclusion." },
    { num: 4, title: "Connect the Logic Chain", desc: "Trace whether the premises create an unbroken path to the conclusion." },
    { num: 5, title: "Test for Inescapability", desc: "Ask: 'Could the conclusion be false even if all premises are true?' If yes, it does NOT follow." },
    { num: 6, title: "Reject Unsupported Assumptions", desc: "If the conclusion requires extra unstated facts, reject it immediately." },
    { num: 7, title: "Select the Correct Evaluation", desc: "Choose whether the conclusion follows, does not follow, or whether statements contradict." }
  ],
  fiveWorkedExamples: [
    {
      type: "1. All / Some / None Statements",
      statements: "All graphic designers know Photoshop. Some graphic designers know Figma.",
      conclusion: "Some people who know Photoshop also know Figma.",
      answer: "The conclusion follows.",
      explanation: "Because all graphic designers know Photoshop, anyone who is a graphic designer knows Photoshop. Since some graphic designers know Figma, those individuals know both Photoshop and Figma. Thus, some people who know Photoshop know Figma."
    },
    {
      type: "2. Direct Deduction",
      statements: "All registered voters are at least 18 years old. Priya is a registered voter.",
      conclusion: "Priya is at least 18 years old.",
      answer: "The conclusion follows.",
      explanation: "Priya belongs to the category of registered voters, and 100% of that category is at least 18 years old. Therefore, Priya is at least 18 years old."
    },
    {
      type: "3. Invalid Reverse Conclusion",
      statements: "All smartphones have touchscreens. Device Z has a touchscreen.",
      conclusion: "Device Z is a smartphone.",
      answer: "The conclusion does NOT follow.",
      explanation: "ATM machines, tablets, and kiosks also have touchscreens. Having a touchscreen does not prove a device is a smartphone. The reverse conclusion is invalid."
    },
    {
      type: "4. Identifying Contradictions",
      statements: "Statement 1: The office is completely closed on Sundays.\nStatement 2: Rahul attended an in-person staff meeting at the office on Sunday.",
      conclusion: "The statements contradict each other.",
      answer: "The statements contradict each other.",
      explanation: "If the office is completely closed, an in-person meeting inside the office on that same day is impossible. The statements directly conflict."
    },
    {
      type: "5. Everyday Problem-Solving",
      statements: "Only employees with Level 2 security clearance can access the server room. Neha does not have Level 2 security clearance.",
      conclusion: "Neha cannot access the server room.",
      answer: "The conclusion follows.",
      explanation: "'Only' establishes an absolute requirement. Without Level 2 clearance, access is impossible. Since Neha lacks clearance, she cannot access the room."
    }
  ]
};

// ==========================================
// SECTION 8: QUICK REVISION & CHECKLIST
// ==========================================
export const day6Revision = {
  title: "Day 6 Quick Revision & Deductive Logic Checklist",
  subtitle: "Review these 8 foundational principles and test yourself with 5 rapid-check questions before taking the quiz:",
  eightPrinciples: [
    { title: "1. What is Deduction?", text: "Reasoning from general true premises to specific inescapable conclusions." },
    { title: "2. Premises vs Conclusions", text: "Premises are accepted facts; conclusions are results derived from them." },
    { title: "3. Facts vs Assumptions", text: "Rely strictly on stated facts. Never introduce outside real-world assumptions." },
    { title: "4. All Means 100%", text: "Universal affirmative encompasses every single member of the group." },
    { title: "5. Some Means At Least One", text: "'Some' guarantees a minimum of one overlap, but never guarantees all." },
    { title: "6. None Means 0%", text: "Complete separation between two categories with zero exceptions." },
    { title: "7. Beware the Reverse", text: "'All A are B' never implies 'All B are A'. Avoid reversing statements." },
    { title: "8. Contradictions Conflict", text: "Two statements that cannot both be true simultaneously form a contradiction." }
  ],
  revisionQuestions: [
    {
      q: "Revision 1: All metals conduct electricity. Copper is a metal. Does it follow that copper conducts electricity?",
      ans: "Yes, the conclusion follows.",
      exp: "Copper is included in the metal category, and all metals conduct electricity."
    },
    {
      q: "Revision 2: All birds can fly. An ostrich is a bird. In a logical reasoning test, must you accept that an ostrich can fly?",
      ans: "Yes, within the test universe.",
      exp: "In deductive reasoning, given premises are accepted as 100% true for the problem, regardless of real-world biology."
    },
    {
      q: "Revision 3: Some apples are red. Does this mean all apples are red?",
      ans: "No, it does not follow.",
      exp: "'Some' means at least one. It does not establish that all apples are red."
    },
    {
      q: "Revision 4: Statement 1: All lights are off. Statement 2: The bedroom light is turned on. What is the relation?",
      ans: "They contradict each other.",
      exp: "If all lights are off, no individual light can be turned on at the same time."
    },
    {
      q: "Revision 5: All doctors are graduates. Rajesh is a graduate. Does it follow that Rajesh is a doctor?",
      ans: "No, the conclusion does not follow.",
      exp: "This is an invalid reverse conclusion. Rajesh could be an engineer, teacher, or accountant."
    }
  ]
};

// ==========================================
// PRACTICE QUIZ: EXACTLY 20 UNIQUE QUESTIONS
// Q1-Q5: Easy
// Q6-Q12: Easy-to-Moderate
// Q13-Q17: Moderate
// Q18-Q20: Applied Reasoning & Mixed
// Options Format:
// A. The conclusion follows.
// B. The conclusion does not follow.
// C. The statements contradict each other.
// D. There is not enough information.
// ==========================================
export const day6PracticeQuestions = [
  {
    id: "d6_q1",
    question: "Statements:\nAll birds lay eggs.\nA penguin is a bird.\n\nConclusion: A penguin lays eggs.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy",
    topic: "Universal Statements (All)",
    explanation: "Statement 1 establishes that every member of the bird category lays eggs. Statement 2 confirms that a penguin is a bird. Therefore, a penguin must lay eggs. The conclusion follows.",
    distractorNotes: "The deduction is direct and complete without any missing premises."
  },
  {
    id: "d6_q2",
    question: "Statements:\nAll laptops need electricity to run.\nDevice X needs electricity to run.\n\nConclusion: Device X is a laptop.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 1, // B
    difficulty: "Easy",
    topic: "Invalid Reverse Conclusions",
    explanation: "The premise states that all laptops need electricity, but it does NOT state that laptops are the only things that need electricity. Televisions, phones, and refrigerators also need electricity. Device X could be any electrical appliance. The conclusion does not follow.",
    distractorNotes: "Reversing 'All laptops need electricity' to 'All electricity-using devices are laptops' is a classic logical fallacy."
  },
  {
    id: "d6_q3",
    question: "Statements:\nEvery student who scores above 90 marks receives an A grade.\nDeepa scored 95 marks on the exam.\n\nConclusion: Deepa receives an A grade.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy",
    topic: "Academic Scenario Deduction",
    explanation: "Deepa's score of 95 is strictly above the 90-mark threshold. The rule guarantees an A grade to every student above 90. Therefore, Deepa definitely receives an A grade. The conclusion follows.",
    distractorNotes: "The premise directly applies to Deepa's verified score."
  },
  {
    id: "d6_q4",
    question: "Statements:\nNo reptiles have fur.\nA lizard is a reptile.\n\nConclusion: A lizard does not have fur.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy",
    topic: "Universal Negative (None)",
    explanation: "The universal negative premise establishes that zero reptiles have fur. Because a lizard is a reptile, it cannot possess fur. The conclusion follows.",
    distractorNotes: "'No A are B' completely separates the two classes."
  },
  {
    id: "d6_q5",
    question: "Statements:\nStatement 1: The classroom door is completely locked.\nStatement 2: Students are freely walking through the open classroom door.\n\nQuestion: What is the logical relationship between these two statements?",
    options: [
      "The statements contradict each other.",
      "The conclusion follows that the door is open.",
      "Both statements can easily be true simultaneously.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy",
    topic: "Identifying Direct Contradictions",
    explanation: "A door cannot be both completely locked and simultaneously open for students to freely walk through at the same time and place. The two statements directly conflict and contradict each other.",
    distractorNotes: "They cannot coexist under the same physical conditions."
  },
  {
    id: "d6_q6",
    question: "Statements:\nSome employees in the finance department speak French.\nDaniel works in the finance department.\n\nConclusion: Daniel speaks French.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information to decide if Daniel is an employee."
    ],
    correctAnswer: 1, // B
    difficulty: "Easy-to-Moderate",
    topic: "Particular Statements (Some)",
    explanation: "'Some' means at least one employee speaks French, but it does NOT mean all employees do. Daniel could easily be one of the employees who does not speak French. The conclusion does not necessarily follow.",
    distractorNotes: "'Some' never guarantees inclusion for a specific individual."
  },
  {
    id: "d6_q7",
    question: "Statements:\nAll security badges must be renewed annually.\nPriya's security badge was issued 3 years ago and was never renewed.\n\nConclusion: Priya's security badge is currently expired.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy-to-Moderate",
    topic: "Workplace Policy Deduction",
    explanation: "Since all badges require annual renewal (every 1 year) and Priya's badge has not been renewed for 3 years, it has exceeded its 1-year validity window and is expired. The conclusion follows.",
    distractorNotes: "The timeframe strictly exceeds the annual requirement."
  },
  {
    id: "d6_q8",
    question: "Statements:\nEvery candidate who passed the interview received a confirmation email by 5 PM.\nRohan did not receive a confirmation email by 5 PM.\n\nConclusion: Rohan did not pass the interview.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy-to-Moderate",
    topic: "Modus Tollens (Negative Deduction)",
    explanation: "If passing guaranteed receiving an email by 5 PM, then anyone who did not receive an email by 5 PM could not have passed. Therefore, Rohan did not pass. The conclusion follows.",
    distractorNotes: "This is a valid contrapositive deduction (If P then Q; Not Q; therefore Not P)."
  },
  {
    id: "d6_q9",
    question: "Statements:\nSome fruits are sweet.\nAn orange is a fruit.\n\nConclusion: An orange is sweet.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 1, // B
    difficulty: "Easy-to-Moderate",
    topic: "Facts vs Real-World Assumptions",
    explanation: "While real-world experience tells you oranges are often sweet, the premise states only that SOME fruits are sweet. The premises provide zero information about whether an orange belongs to the sweet group or the non-sweet group. Strictly from the premises, the conclusion does not follow.",
    distractorNotes: "Never let real-world knowledge override the strict logic of the premises."
  },
  {
    id: "d6_q10",
    question: "Statements:\nAll squares are rectangles.\nAll rectangles are quadrilaterals.\n\nConclusion: All squares are quadrilaterals.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy-to-Moderate",
    topic: "Transitive Deductive Chains",
    explanation: "If all A are B and all B are C, then all A must be C. Because all squares are enclosed in rectangles, and all rectangles are enclosed in quadrilaterals, all squares are quadrilaterals. The conclusion follows.",
    distractorNotes: "A classic valid transitive syllogism."
  },
  {
    id: "d6_q11",
    question: "Statements:\nStatement 1: Every member of the engineering team worked from home on Friday.\nStatement 2: Vikram, an engineer in the team, worked from the office on Friday.\n\nQuestion: What can be deduced about these two statements?",
    options: [
      "The statements contradict each other.",
      "The conclusion follows that Vikram was sick.",
      "Both statements support each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy-to-Moderate",
    topic: "Identifying Direct Contradictions",
    explanation: "Statement 1 states that 100% of engineering team members worked from home. Statement 2 identifies an engineering team member who worked from the office on the same day. These statements cannot both be true under identical conditions. They contradict each other.",
    distractorNotes: "A universal statement cannot coexist with a direct exception on the same day."
  },
  {
    id: "d6_q12",
    question: "Statements:\nNo books in the reference section can be borrowed for home use.\nThe Oxford Dictionary is in the reference section.\n\nConclusion: The Oxford Dictionary cannot be borrowed for home use.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy-to-Moderate",
    topic: "Universal Negative Exclusion",
    explanation: "The reference section rule excludes all items in it from home borrowing. Since the dictionary is in that section, it cannot be borrowed for home use. The conclusion follows.",
    distractorNotes: "Zero overlap exists between reference books and borrowable books."
  },
  {
    id: "d6_q13",
    question: "Statements:\nIf it rains, the football match will be cancelled.\nThe football match was cancelled.\n\nConclusion: It rained.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 1, // B
    difficulty: "Moderate",
    topic: "Fallacy of Affirming the Consequent",
    explanation: "The premise says that rain guarantees cancellation, but it does NOT say rain is the ONLY reason a match can be cancelled. The match could have been cancelled due to team illness, lightning, or field maintenance. We cannot conclude that it rained. The conclusion does not follow.",
    distractorNotes: "Assuming rain occurred just because the match was cancelled is a logical fallacy."
  },
  {
    id: "d6_q14",
    question: "Statements:\nAll senior software engineers have at least 5 years of coding experience.\nAnita has 6 years of coding experience.\n\nConclusion: Anita is a senior software engineer.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 1, // B
    difficulty: "Moderate",
    topic: "Invalid Reverse Reasoning",
    explanation: "Having 5+ years of experience is a requirement for senior engineers, but the statement does NOT claim that anyone with 5+ years is automatically a senior engineer. Anita might work as a project manager, QA tester, or teacher. The conclusion does not follow.",
    distractorNotes: "Being in the larger group (5+ years) does not prove membership in the specific sub-title."
  },
  {
    id: "d6_q15",
    question: "Statements:\nStatement 1: All library members have a valid membership card.\nStatement 2: Only people with a valid membership card can enter the reading room.\nStatement 3: Suman does not have a valid membership card.\n\nConclusion: Suman cannot enter the reading room.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Moderate",
    topic: "Multi-Premise Deduction",
    explanation: "Statement 2 explicitly restricts entry ONLY to people with a valid card. Statement 3 confirms Suman does not have a valid card. Therefore, Suman cannot enter the reading room. The conclusion follows.",
    distractorNotes: "'Only' sets a strict necessary condition that Suman fails to meet."
  },
  {
    id: "d6_q16",
    question: "Statements:\nStatement 1: No animals in the wildlife sanctuary are fed by visitors.\nStatement 2: A visitor fed an apple to a deer inside the wildlife sanctuary.\n\nQuestion: Which statement best describes the relationship between these statements?",
    options: [
      "The statements contradict each other.",
      "Statement 2 logically follows from Statement 1.",
      "Statement 1 proves Statement 2 is correct.",
      "Both statements are true if the deer was hungry."
    ],
    correctAnswer: 0, // A
    difficulty: "Moderate",
    topic: "Contradiction Identification",
    explanation: "Statement 1 claims that zero animals are fed by visitors. Statement 2 describes a visitor feeding an animal. These two claims directly contradict each other and cannot both be true under the same conditions.",
    distractorNotes: "A zero-allowance policy is directly violated by Statement 2."
  },
  {
    id: "d6_q17",
    question: "Statements:\nAll graphic designers know Photoshop.\nSome graphic designers know 3D modeling.\n\nConclusion: Some people who know Photoshop also know 3D modeling.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Moderate",
    topic: "Syllogistic Overlap (All + Some)",
    explanation: "Because all graphic designers know Photoshop, anyone who is a graphic designer knows Photoshop. Since some graphic designers know 3D modeling, those specific individuals know both Photoshop and 3D modeling. Therefore, some people who know Photoshop also know 3D modeling. The conclusion follows.",
    distractorNotes: "The intersection of the sets guarantees shared knowledge for that subset."
  },
  {
    id: "d6_q18",
    question: "Statements:\nStatement 1: All customer orders placed before 2 PM are shipped on the same day.\nStatement 2: Order #502 was placed at 11 AM on Tuesday.\nStatement 3: Order #502 was not shipped on Tuesday.\n\nQuestion: What can be logically deduced about these three statements?",
    options: [
      "Statements 1 and 2 together contradict Statement 3.",
      "The conclusion follows that Order #502 was shipped on Wednesday.",
      "Statement 3 proves Statement 1 is true.",
      "All three statements are completely harmonious."
    ],
    correctAnswer: 0, // A
    difficulty: "Applied Reasoning",
    topic: "Business Scenario Contradiction",
    explanation: "Statement 1 guarantees same-day shipping for orders before 2 PM. Statement 2 confirms Order #502 was placed at 11 AM (before 2 PM), meaning it MUST have shipped on Tuesday. But Statement 3 asserts it was NOT shipped on Tuesday. Therefore, Statements 1 and 2 together directly contradict Statement 3.",
    distractorNotes: "A system rule and timestamp directly conflict with the outcome statement."
  },
  {
    id: "d6_q19",
    question: "Statements:\nStatement 1: A candidate is eligible for the scholarship if and only if they have attendance above 85% and an exam score above 80%.\nStatement 2: Rahul scored 92% on the exam.\n\nConclusion: Rahul is eligible for the scholarship.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 3, // D
    difficulty: "Applied Reasoning",
    topic: "Incomplete Information & Assumption Avoidance",
    explanation: "Eligibility requires TWO conditions: score above 80% AND attendance above 85%. While Rahul satisfies the score requirement (92%), the problem provides ZERO information about his attendance. We cannot assume his attendance is above 85%. Therefore, there is not enough information to conclude he is eligible.",
    distractorNotes: "Assuming his attendance is fine would be an unstated assumption."
  },
  {
    id: "d6_q20",
    question: "Statements:\nStatement 1: Only employees who have completed cybersecurity certification are granted remote server access.\nStatement 2: No interns have completed cybersecurity certification.\nStatement 3: Arjun is an intern at the company.\n\nConclusion: Arjun is not granted remote server access.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Applied Reasoning",
    topic: "Chained Deductions & Access Policies",
    explanation: "Arjun is an intern (Statement 3). No interns have completed certification (Statement 2), which means Arjun has definitely not completed certification. Because ONLY certified employees receive remote server access (Statement 1), Arjun cannot be granted remote server access. The conclusion follows.",
    distractorNotes: "The deduction is airtight through all three linked premises."
  }
];
