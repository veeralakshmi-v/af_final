/**
 * SPOKO Logical Reasoning - Level 1, Day 7: Everyday Problem Solving
 * Comprehensive lesson data, worked examples, interactive scenarios,
 * quick revision summary, and exactly 20 unique multiple-choice practice questions.
 * This is the final capstone lesson of Level 1.
 */

// ==========================================
// DAY 7 OVERVIEW & LEARNING OBJECTIVES
// ==========================================
export const day7Overview = {
  dayNumber: 7,
  level: "Level 1: Beginner",
  course: "Logical Reasoning & Analytical Thinking",
  title: "Everyday Problem Solving",
  duration: "45–60 mins",
  difficulty: "Beginner",
  description: "Apply your complete Level 1 logical reasoning toolkit—patterns, classification, analogies, and deduction—to solve real-world problems in student life, shopping, personal scheduling, and workplace environments.",
  objectives: [
    "Identify and define the actual core problem in any situation, separating it from surface symptoms.",
    "Distinguish verified facts from ungrounded assumptions with discipline.",
    "Systematically investigate and pinpoint the root cause of a failure or delay.",
    "Compare multiple potential solutions using cost, time, effectiveness, and risk criteria.",
    "Select an optimal, logical solution that directly matches the stated constraints.",
    "Understand cause-and-effect sequences and avoid confusing correlation with causation.",
    "Apply number patterns, analogies, and deductive reasoning to practical challenges.",
    "Verify whether a chosen course of action actually produced the desired outcome."
  ],
  stats: {
    totalSections: 7,
    practiceQuestions: 20,
    passingScore: "70% (14 / 20)",
    estimatedReadTime: "25–30 mins"
  }
};

// ==========================================
// SECTION 1: UNDERSTANDING A PROBLEM
// ==========================================
export const section1Content = {
  title: "Understanding a Problem",
  concept: "A problem is a gap between your current reality and your desired outcome. The single most common mistake in problem solving is rushing to a quick fix before clearly defining what the problem actually is.",
  fourComponents: [
    {
      term: "1. The Actual Problem",
      desc: "The fundamental obstacle or gap between current state and desired goal.",
      example: "A student does not have enough time to complete homework alongside exam study."
    },
    {
      term: "2. The Symptoms",
      desc: "The visible warning signs that signal a problem exists.",
      example: "Missed submission deadlines, incomplete worksheet questions, fatigue."
    },
    {
      term: "3. Possible Causes",
      desc: "The underlying factors that generated the problem.",
      example: "Unclear priorities, unexpected family commitments, distraction from social media."
    },
    {
      term: "4. Desired Outcome",
      desc: "The specific, measurable target state once solved.",
      example: "All assignments submitted 1 hour before deadlines with quality scores."
    }
  ],
  primaryCase: {
    situation: "A student repeatedly submits assignments late.",
    symptoms: ["Missed portal deadlines", "Late penalty mark deductions"],
    investigation: "Instead of assuming the student is simply lazy (an assumption), a logical thinker investigates: Did the student understand the instructions? Was there internet outage? Was there a scheduling conflict? Finding the true cause allows a real solution."
  },
  additionalCases: [
    {
      domain: "Workplace Case",
      situation: "A software development team experiences sudden crash reports in production.",
      symptom: "App crashes when users upload photos.",
      rootCauseInvestigation: "The crash is a symptom. The cause could be a missing file-size validation check or server memory limits. Patching the symptom without fixing memory limits leads to recurring crashes."
    },
    {
      domain: "Everyday Life Case",
      situation: "Your smartphone battery completely dies by 2 PM every day.",
      symptom: "Phone shuts off mid-afternoon.",
      rootCauseInvestigation: "Buying a new phone immediately is an expensive mistake. First investigate: Is screen brightness at 100%? Are 15 background apps refreshing GPS location? Is the battery health worn out?"
    }
  ]
};

// ==========================================
// SECTION 2: FACTS VERSUS ASSUMPTIONS
// ==========================================
export const section2Content = {
  title: "Facts Versus Assumptions",
  concept: "A fact is an objective, verified piece of evidence that can be proven. An assumption is a guess or unverified belief treated as true without proof. Effective problem solvers build solutions only on facts.",
  caseStudy: {
    situation: "A student receives a low test score of 40 out of 100 on a 20-question test.",
    facts: [
      "The student scored 40 out of 100 marks.",
      "The test contained exactly 20 questions.",
      "The student answered 8 questions correctly and 12 incorrectly."
    ],
    assumption: "The student did not study or does not care about the subject.",
    explanation: "The score alone provides zero proof of study effort! The student might have studied for 15 hours but misunderstood the question formats, experienced severe exam anxiety, or fallen ill during the test. Concluding they did not study is an unsupported assumption."
  },
  practicalScenarios: [
    {
      field: "Workplace Performance",
      fact: "An employee did not attend the 10:00 AM team video call.",
      assumption: "The employee overslept or is slacking off.",
      realityCheck: "The employee might have experienced an internet outage or an urgent emergency call with a key client."
    },
    {
      field: "Missed Appointment",
      fact: "The patient did not show up for their 2:00 PM clinic appointment.",
      assumption: "The patient forgot about the checkup.",
      realityCheck: "The patient might have been delayed by severe road gridlock or an unexpected family crisis."
    },
    {
      field: "Business Enquiry",
      fact: "A prospective client filled out a contact form but did not answer the 3:00 PM phone call.",
      assumption: "The client is no longer interested in the product.",
      realityCheck: "The client was likely in a business meeting. A professional follows up with an email instead of closing the lead."
    },
    {
      field: "Delayed Delivery",
      fact: "A courier package did not arrive on Tuesday.",
      assumption: "The courier company lost the parcel permanently.",
      realityCheck: "The package tracking may show a weather-related delay or address confirmation hold."
    }
  ]
};

// ==========================================
// SECTION 3: FINDING THE ROOT CAUSE
// ==========================================
export const section3Content = {
  title: "Finding the Root Cause",
  concept: "Treating symptoms provides temporary relief, but finding the root cause eliminates the problem permanently. Logical thinkers follow a structured diagnostic method.",
  sixStepDiagnosis: [
    { step: 1, name: "Define the Problem", desc: "State exactly what went wrong and where." },
    { step: 2, name: "Collect Relevant Facts", desc: "Gather verifiable data, logs, timestamps, and error messages." },
    { step: 3, name: "List Possible Causes", desc: "Brainstorm plausible factors without premature judgment." },
    { step: 4, name: "Test Causes with Evidence", desc: "Cross-check each hypothesis against the known facts." },
    { step: 5, name: "Select a Practical Action", desc: "Implement targeted changes that address the confirmed cause." },
    { step: 6, name: "Review the Result", desc: "Verify whether the issue has actually stopped occurring." }
  ],
  fiveWhysMethod: {
    title: "The 5 Whys Technique",
    desc: "By asking 'Why?' five times, you drill down through superficial layers to discover the fundamental breakdown.",
    example: [
      { q: "1. Why did the student submit the project past the midnight deadline?", a: "Because they finished typing at 12:15 AM." },
      { q: "2. Why did they finish typing so late?", a: "Because they only started drafting the report at 10:30 PM." },
      { q: "3. Why did they start at 10:30 PM?", a: "Because they spent the evening searching for research reference links." },
      { q: "4. Why were reference links not ready earlier?", a: "Because they didn't review the project requirements when assigned on Monday." },
      { q: "5. Why did they not review requirements on Monday?", a: "Because they lacked a weekly planner to inspect assignment attachments early." }
    ],
    rootCauseLesson: "The root cause was not slow typing or lack of knowledge; it was the absence of an early assignment review workflow!"
  }
};

// ==========================================
// SECTION 4: COMPARING POSSIBLE SOLUTIONS
// ==========================================
export const section4Content = {
  title: "Comparing Possible Solutions",
  concept: "A problem rarely has only one possible answer. The mark of a strong logical thinker is the ability to evaluate multiple options against objective criteria before acting.",
  fiveEvaluationCriteria: [
    { name: "Effectiveness", desc: "Will this option directly solve the core problem, or just mask it?" },
    { name: "Cost", desc: "Do we have the budget and financial resources to implement this?" },
    { name: "Time Required", desc: "Can this solution be executed before the deadline arrives?" },
    { name: "Available Resources", desc: "Do we have the tools, personnel, and materials needed right now?" },
    { name: "Possible Risks", desc: "Does this solution create dangerous new secondary problems?" }
  ],
  workedExample: {
    situation: "A student has an important exam tomorrow morning and still has 3 chapters left to revise.",
    solutions: [
      {
        name: "Option A: Pull an All-Nighter",
        pros: "Covers all 3 chapters without sleep.",
        cons: "Severe fatigue during exam, poor memory recall, high health risk.",
        verdict: "High Risk, Low Effectiveness"
      },
      {
        name: "Option B: Prioritize Key Topics & Practise Questions",
        pros: "Focuses on high-weightage questions, allows 6 hours of sleep, sharp focus.",
        cons: "A few minor low-weightage details might be skipped.",
        verdict: "Optimal Solution: High Effectiveness, Low Risk"
      },
      {
        name: "Option C: Spend Time Decorating Notes",
        pros: "Looks neat and pleasant.",
        cons: "Consumes precious hours without testing recall or solving problems.",
        verdict: "Ineffective Time Waste"
      }
    ],
    recommendation: "Option B is the logical choice because it maximizes retention and exam alertness under the strict constraint of a next-morning deadline."
  }
};

// ==========================================
// SECTION 5: APPLYING LOGICAL REASONING TO EVERYDAY SITUATIONS
// ==========================================
export const section5Content = {
  title: "Applying Logical Reasoning to Everyday Situations",
  concept: "Logical reasoning is your daily decision-making superpower. Let's examine four realistic everyday scenarios.",
  scenarios: [
    {
      id: "scen_a",
      title: "Scenario A: Time Management",
      context: "A learner has two assignments due tomorrow morning. Assignment 1 requires 30 minutes; Assignment 2 requires 2 hours.",
      reasoning: "Total focused time required: 30 minutes + 120 minutes = 150 minutes (2 hours 30 mins). With a 15-minute rest break, the learner needs a 2-hour 45-minute study block. Starting at 7:00 PM guarantees completion by 9:45 PM, leaving plenty of time for restful sleep."
    },
    {
      id: "scen_b",
      title: "Scenario B: Smart Shopping Comparison",
      context: "Store A sells a course workbook for ₹800 with free store pickup. Store B sells the exact same workbook for ₹720 with a ₹50 home delivery charge.",
      reasoning: "Store A Total = ₹800. Store B Total = ₹720 + ₹50 = ₹770. Comparing costs: ₹800 - ₹770 = ₹30 savings. Store B is ₹30 cheaper and delivers directly to the door, assuming both workbooks are genuine and identical."
    },
    {
      id: "scen_c",
      title: "Scenario C: Workplace Collaboration",
      context: "A colleague has not submitted their contribution to a shared project presentation due in 2 hours.",
      reasoning: "Avoid emotional anger or assumptions. First, check communication: Was the deadline communicated in writing? Does the colleague have access to the slides? Contact them directly with a polite, urgent check-in before escalating to a manager."
    },
    {
      id: "scen_d",
      title: "Scenario D: Customer Service Enquiry",
      context: "A customer calls complaining: 'I submitted an enquiry form on your website yesterday, but nobody has contacted me!'",
      reasoning: "Audit the evidence: Check the CRM database for the customer's name $\\rightarrow$ Verify phone number and email address $\\rightarrow$ Check if the ticket was assigned to a representative $\\rightarrow$ Check spam or outgoing mail logs. Apologize for the delay and answer their questions immediately."
    }
  ]
};

// ==========================================
// SECTION 6: DECISION-MAKING AND CHECKING RESULTS
// ==========================================
export const section6Content = {
  title: "Decision-Making and Checking Results",
  concept: "Taking action is not the final step of problem solving. A true analytical thinker always completes the loop with verification: Did our action actually produce the desired outcome?",
  frameworkStages: [
    { stage: "DEFINE", desc: "What exact issue are we addressing?" },
    { stage: "COLLECT FACTS", desc: "What verifiable data and evidence exists?" },
    { stage: "IDENTIFY CAUSES", desc: "What underlying root mechanisms caused it?" },
    { stage: "COMPARE SOLUTIONS", desc: "Which solution has the best effectiveness vs risk profile?" },
    { stage: "ACT", desc: "Implement the chosen solution with clear ownership." },
    { stage: "VERIFY", desc: "Measure the results after implementation. If it worked, keep it; if not, adjust!" }
  ],
  punctualityCase: {
    problem: "A learner frequently arrives 15 minutes late to morning classes.",
    auditPlan: [
      "1. Track arrival times for one week to establish baseline data.",
      "2. Identify common reason: The 8:15 AM bus gets delayed by traffic congestion at the city bridge.",
      "3. Compare solutions: (A) Take earlier 7:55 AM bus, or (B) Complain to the college.",
      "4. Act: Catch the 7:55 AM bus every morning for the next week.",
      "5. Verify: Did the learner arrive on time 5 out of 5 days? Yes! The solution is validated."
    ]
  }
};

// ==========================================
// SECTION 7: INTEGRATED PROBLEM-SOLVING CHALLENGE
// ==========================================
export const section7Content = {
  title: "Integrated Problem-Solving Challenge",
  concept: "Celebrate your journey through Level 1! In this capstone section, we combine skills from Days 1 to 6 (series, symbols, classification, analogies, deduction) into multi-step practical challenges.",
  challenges: [
    {
      id: "chal1",
      dayLink: "Day 2: Number Patterns",
      title: "Challenge 1: Progressive Practice Routine",
      problem: "A learner completes 5 questions on Monday, 10 on Tuesday, 15 on Wednesday, and 20 on Thursday. How many questions should they plan for Friday if the pattern continues?",
      stepByStep: "Step 1: Calculate differences between days: 10 - 5 = +5, 15 - 10 = +5, 20 - 15 = +5. Step 2: The sequence is an arithmetic series with a constant step of +5. Step 3: Friday = 20 + 5 = 25 questions.",
      answer: "25 Questions"
    },
    {
      id: "chal2",
      dayLink: "Day 4: Classification & Odd One Out",
      title: "Challenge 2: Workspace Resource Sorting",
      problem: "A student bag contains a Notebook, Textbook, Pen, and Banana. Which item does not belong to the study stationery group?",
      stepByStep: "Step 1: Identify shared feature: Notebook, Textbook, and Pen are academic stationery tools used for reading and writing. Step 2: A Banana is an edible organic fruit. Step 3: Banana is the odd one out.",
      answer: "Banana"
    },
    {
      id: "chal3",
      dayLink: "Day 6: Deductive Reasoning",
      title: "Challenge 3: System Record Verification",
      problem: "Statements:\n1. Every completed assignment is recorded in the tracking system.\n2. Priya's assignment is completed.\nConclusion: Priya's assignment is recorded in the tracking system.",
      stepByStep: "Step 1: The premise states that 100% of completed assignments are recorded. Step 2: Priya's assignment meets the completion criteria. Step 3: Therefore, it must be recorded in the system. The conclusion strictly follows.",
      answer: "The conclusion follows."
    },
    {
      id: "chal4",
      dayLink: "Day 5: Analogies & Relationships",
      title: "Challenge 4: Instrument & Measurement",
      problem: "Thermometer : Temperature :: Clock : ?",
      stepByStep: "Step 1: A thermometer is an instrument specifically manufactured to measure temperature. Step 2: A clock is an instrument specifically manufactured to measure time. Step 3: Time completes the analogy.",
      answer: "Time"
    },
    {
      id: "chal5",
      dayLink: "Day 3: Alphabet Sequences",
      title: "Challenge 5: Code Sequence Generation",
      problem: "A project task list has codes: B, D, F, H, ___. What is the next task code?",
      stepByStep: "Step 1: Convert to alphabet numbers: B=2, D=4, F=6, H=8. Step 2: The pattern is an even-number series with a step of +2. Step 3: Next position is 8 + 2 = 10, which corresponds to the letter J.",
      answer: "J"
    }
  ]
};

// ==========================================
// SECTION 8: QUICK REVISION & CHECKLIST
// ==========================================
export const day7Revision = {
  title: "Day 7 Quick Revision & Level 1 Master Checklist",
  subtitle: "Keep these 8 core problem-solving principles sharp before launching the Level 1 graduation assessment:",
  checklist: [
    { title: "1. Define Before Fixing", text: "Clearly distinguish the core problem from surface symptoms." },
    { title: "2. Facts Over Guesses", text: "Base all deductions on verified evidence, never on unstated assumptions." },
    { title: "3. Dig for Root Causes", text: "Use structured questioning like the 5 Whys to fix the source, not the symptom." },
    { title: "4. Compare Objective Criteria", text: "Evaluate solutions by effectiveness, cost, time, available tools, and risk." },
    { title: "5. Calculate Practical Numbers", text: "Always verify time totals and cost breakdowns to compare alternatives." },
    { title: "6. Close the Loop (Verify)", text: "Always measure results after taking action to confirm the problem is resolved." },
    { title: "7. Integrate Your Skills", text: "Combine series, classification, analogies, and deduction for complex challenges." },
    { title: "8. Level 1 Graduation", text: "Consistent practice builds permanent problem-solving confidence." }
  ],
  revisionQuestions: [
    {
      q: "Revision 1: A computer monitor screen goes black. Is 'black screen' the problem or a symptom?",
      ans: "It is a symptom.",
      exp: "The black screen is a symptom. The problem could be a disconnected power cable, faulty HDMI wire, or graphics card failure."
    },
    {
      q: "Revision 2: Store A charges ₹600 for a shirt. Store B charges ₹550 + ₹40 shipping. Which store is cheaper?",
      ans: "Store B is cheaper by ₹10.",
      exp: "Store A = ₹600. Store B = ₹550 + ₹40 = ₹590. Store B saves ₹10."
    },
    {
      q: "Revision 3: A student scores 95% on an exam. Does it follow that the exam was easy?",
      ans: "No, that is an assumption.",
      exp: "The student may have prepared thoroughly for weeks. A high score alone does not prove the exam was universally easy."
    },
    {
      q: "Revision 4: What is the main benefit of the 5 Whys technique?",
      ans: "It drills down to uncover the root cause rather than stopping at surface symptoms.",
      exp: "Repeatedly asking why uncovers the systemic failure that allowed the issue to happen."
    },
    {
      q: "Revision 5: What is the final step in the logical decision-making framework?",
      ans: "VERIFY.",
      exp: "Checking the actual result confirms whether the problem was solved or if a new approach is needed."
    }
  ]
};

// ==========================================
// PRACTICE QUIZ: EXACTLY 20 UNIQUE QUESTIONS
// Q1-Q5: Easy
// Q6-Q12: Easy-to-Moderate
// Q13-Q17: Moderate
// Q18-Q20: Integrated Reasoning Challenges
// ==========================================
export const day7PracticeQuestions = [
  {
    id: "d7_q1",
    question: "A college student has a 2-hour study window (120 minutes) before an evening class. She spends 35 minutes reading course notes and 50 minutes completing a problem set. How much free time remains before class begins?",
    options: ["25 minutes", "35 minutes", "40 minutes", "45 minutes"],
    correctAnswer: 1, // 35 minutes
    difficulty: "Easy",
    topic: "Everyday Time Allocation",
    explanation: "Total study time utilized is 35 + 50 = 85 minutes. The remaining time in the 120-minute window is 120 - 85 = 35 minutes.",
    distractorNotes: "25 is 120 - 95; 40 and 45 are common arithmetic miscalculations."
  },
  {
    id: "d7_q2",
    question: "A team member arrives at work at 9:30 AM instead of 9:00 AM. Which of the following is a verified FACT rather than an assumption?",
    options: [
      "The team member arrived 30 minutes past 9:00 AM.",
      "The team member woke up late.",
      "The team member was delayed by traffic.",
      "The team member lacks interest in the job."
    ],
    correctAnswer: 0, // Option A
    difficulty: "Easy",
    topic: "Facts Versus Assumptions",
    explanation: "The arrival time of 9:30 AM is an observed, measurable fact. Waking up late, traffic, and lack of interest are unproven assumptions until verified.",
    distractorNotes: "Options B, C, and D are possible causes, but unproven guesses."
  },
  {
    id: "d7_q3",
    question: "A student is organizing their study desk: Notebook, Textbook, Pen, and Apple. Which item does NOT belong to the study materials group?",
    options: ["Notebook", "Textbook", "Pen", "Apple"],
    correctAnswer: 3, // Apple
    difficulty: "Easy",
    topic: "Resource Classification (Day 4 Link)",
    explanation: "Notebook, Textbook, and Pen are academic stationery materials. An apple is an edible fruit. Therefore, Apple is the odd one out.",
    distractorNotes: "The first three items share the common functional category of study supplies."
  },
  {
    id: "d7_q4",
    question: "A fitness tracker records a runner's daily distance: 2 km, 4 km, 6 km, 8 km. If this constant pattern continues, what distance will the runner complete on Day 5?",
    options: ["9 km", "10 km", "12 km", "14 km"],
    correctAnswer: 1, // 10 km
    difficulty: "Easy",
    topic: "Number Series in Daily Routine (Day 2 Link)",
    explanation: "The daily distance increases by a constant +2 km each day (2, 4, 6, 8). On Day 5: 8 + 2 = 10 km.",
    distractorNotes: "9 is +1; 12 skips a step; 14 is +6."
  },
  {
    id: "d7_q5",
    question: "Statements:\nAll approved expense reports are reimbursed within 7 days.\nManoj's expense report has been approved.\n\nConclusion: Manoj's expense report will be reimbursed within 7 days.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Easy",
    topic: "Deductive Reasoning in Workplace (Day 6 Link)",
    explanation: "The universal rule guarantees reimbursement within 7 days for all approved reports. Manoj's report was approved, so it must be reimbursed within 7 days. The conclusion follows.",
    distractorNotes: "The deduction is direct and complete without missing premises."
  },
  {
    id: "d7_q6",
    question: "Store X sells a textbook for ₹500 with free store pickup. Store Y sells the exact same textbook for ₹440 with a ₹40 home delivery charge. Which option is cheaper and by how much?",
    options: [
      "Store X is cheaper by ₹20.",
      "Store Y is cheaper by ₹20.",
      "Both stores cost the exact same amount.",
      "Store Y is cheaper by ₹60."
    ],
    correctAnswer: 1, // Store Y is cheaper by ₹20
    difficulty: "Easy-to-Moderate",
    topic: "Practical Cost Comparison",
    explanation: "Store X total = ₹500. Store Y total = ₹440 + ₹40 = ₹480. Difference = ₹500 - ₹480 = ₹20. Store Y is cheaper by ₹20.",
    distractorNotes: "Forgetting delivery would give ₹60; comparing only base prices is an incomplete calculation."
  },
  {
    id: "d7_q7",
    question: "A shared office printer consistently prints pages with blurred, smudged text. The office assistant claims: 'The blurred text is the problem.' How should an analytical problem solver classify the blurred text?",
    options: [
      "It is a visible symptom of an underlying cause, such as low toner or a damaged roller.",
      "It is the root cause of the printing failure.",
      "It is an unverified assumption.",
      "It is the desired outcome."
    ],
    correctAnswer: 0, // Option A
    difficulty: "Easy-to-Moderate",
    topic: "Problem vs Symptom Identification",
    explanation: "Blurred text is a visible symptom signaling that something inside the printer (toner, drum, roller, or settings) is malfunctioning.",
    distractorNotes: "The symptom alerts you to an issue; it is not the mechanical cause itself."
  },
  {
    id: "d7_q8",
    question: "A student cannot hear audio during a live online lecture. Which of the following represents the most systematic first diagnostic step?",
    options: [
      "Order a new set of headphones immediately.",
      "Check whether the computer volume and video player are muted or set to zero.",
      "Assume the university internet connection has permanently crashed.",
      "Submit a formal complaint to the university chancellor."
    ],
    correctAnswer: 1, // Option B
    difficulty: "Easy-to-Moderate",
    topic: "Root Cause Investigation",
    explanation: "A logical troubleshooter checks the simplest, most common, zero-cost factors first (volume sliders and mute buttons) before escalating.",
    distractorNotes: "Ordering new gear or filing complaints without checking audio controls is an impulsive overreaction."
  },
  {
    id: "d7_q9",
    question: "Doctor : Patient :: Teacher : ?",
    options: ["School", "Student", "Chalkboard", "Library"],
    correctAnswer: 1, // Student
    difficulty: "Easy-to-Moderate",
    topic: "Relationship Analogy (Day 5 Link)",
    explanation: "A doctor provides professional services to a patient. In the same way, a teacher provides educational services to a student.",
    distractorNotes: "School and library are workplaces; chalkboard is a tool."
  },
  {
    id: "d7_q10",
    question: "An office needs to deliver an urgent signed legal contract across town within 45 minutes. Courier A costs ₹100 and takes 2 hours. Courier B costs ₹250 and takes 30 minutes. Which decision is logically correct?",
    options: [
      "Choose Courier A because it saves ₹150.",
      "Choose Courier B because only Courier B meets the mandatory 45-minute deadline.",
      "Choose Courier A because 2 hours is close enough.",
      "Cancel the contract delivery."
    ],
    correctAnswer: 1, // Option B
    difficulty: "Easy-to-Moderate",
    topic: "Comparing Solutions Against Deadlines",
    explanation: "The primary non-negotiable constraint is the 45-minute deadline. Courier A takes 2 hours (120 mins) and fails the constraint. Only Courier B (30 mins) can deliver on time.",
    distractorNotes: "Choosing a cheaper option that fails a mandatory deadline makes the delivery useless."
  },
  {
    id: "d7_q11",
    question: "A project software release sequence is labeled: A, C, E, G, ___. Following this alphabet pattern, what should be the label of the next release?",
    options: ["H", "I", "J", "K"],
    correctAnswer: 1, // I
    difficulty: "Easy-to-Moderate",
    topic: "Alphabet Pattern Recognition (Day 3 Link)",
    explanation: "The sequence steps forward by +2 positions in the alphabet: A(1), C(3), E(5), G(7). The next position is 7 + 2 = 9, which is the letter I.",
    distractorNotes: "H is +1; J is +3; K is +4."
  },
  {
    id: "d7_q12",
    question: "What is the primary objective of applying the '5 Whys' technique in everyday troubleshooting?",
    options: [
      "To assign blame to five different team members.",
      "To drill down past superficial symptoms to uncover the root cause.",
      "To guarantee that every problem has exactly five separate causes.",
      "To write a five-page report before taking any action."
    ],
    correctAnswer: 1, // Option B
    difficulty: "Easy-to-Moderate",
    topic: "The 5 Whys Method",
    explanation: "The 5 Whys technique iteratively asks 'Why?' to peel away superficial symptoms and reveal the underlying systemic root cause.",
    distractorNotes: "It is an inquiry tool for root causes, not a blame mechanism or rigid page requirement."
  },
  {
    id: "d7_q13",
    question: "A college student club has a total budget of ₹1,000 for an orientation workshop. They spend ₹350 on snacks, ₹250 on stationery, and ₹150 on certificate printing. How much budget remains for decorations?",
    options: ["₹150", "₹200", "₹250", "₹300"],
    correctAnswer: 2, // ₹250
    difficulty: "Moderate",
    topic: "Multi-Constraint Budgeting",
    explanation: "Total spent so far = 350 + 250 + 150 = ₹750. Remaining budget = 1,000 - 750 = ₹250.",
    distractorNotes: "350+250+150=750; subtracting from 1000 leaves exactly 250."
  },
  {
    id: "d7_q14",
    question: "A customer support representative resolved 30 tickets today, while the team target is 50 tickets. The supervisor concludes: 'The representative was wasting time on social media.' Why is this conclusion logically flawed?",
    options: [
      "Because the representative always works perfectly.",
      "Because it treats an unverified assumption as fact without considering valid causes like complex tickets or system downtime.",
      "Because 30 is larger than 50.",
      "Because targets should never be set in customer support."
    ],
    correctAnswer: 1, // Option B
    difficulty: "Moderate",
    topic: "Facts vs Assumptions in Performance",
    explanation: "The ticket count (30) is the only fact. Concluding social media use is an ungrounded assumption; the representative may have handled difficult calls or faced database errors.",
    distractorNotes: "Logical problem solvers investigate facts before accusing employees."
  },
  {
    id: "d7_q15",
    question: "Statements:\nOnly registered members who have paid the annual subscription can attend the masterclass.\nKaran has not paid the annual subscription.\n\nConclusion: Karan cannot attend the masterclass.",
    options: [
      "The conclusion follows.",
      "The conclusion does not follow.",
      "The statements contradict each other.",
      "There is not enough information."
    ],
    correctAnswer: 0, // A
    difficulty: "Moderate",
    topic: "Deductive Access Rules (Day 6 Link)",
    explanation: "'Only' creates a strict mandatory requirement. Without paying the annual subscription, attendance is prohibited. Since Karan has not paid, he cannot attend. The conclusion follows.",
    distractorNotes: "'Only' establishes an absolute necessary condition."
  },
  {
    id: "d7_q16",
    question: "A neighborhood bakery wants to increase repeat customer visits on weekdays. Option 1: Spend ₹15,000 on a highway billboard. Option 2: Introduce a loyalty card offering a free pastry after every 5 coffee purchases. Which evaluation criteria most strongly supports Option 2 for a small local business?",
    options: [
      "Option 2 directly targets existing local customers with low upfront cost and low financial risk.",
      "Option 1 is better because highway billboards are larger in size.",
      "Option 1 guarantees that thousands of drivers will stop by daily.",
      "Option 2 is free and requires zero staff cooperation."
    ],
    correctAnswer: 0, // Option A
    difficulty: "Moderate",
    topic: "Comparing Practical Solutions",
    explanation: "Option 2 directly targets the defined goal (repeat weekday visits from local customers) with minimal capital expenditure and high effectiveness.",
    distractorNotes: "Highway drivers rarely exit for neighborhood bakeries; Option 1 carries high cost and low relevance."
  },
  {
    id: "d7_q17",
    question: "8 : 64 :: 9 : ?",
    options: ["72", "81", "90", "99"],
    correctAnswer: 1, // 81
    difficulty: "Moderate",
    topic: "Number Analogy (Day 5 Link)",
    explanation: "The relationship is n : n² (8² = 8 × 8 = 64). Applying the same square rule to 9: 9² = 9 × 9 = 81.",
    distractorNotes: "72 is 9×8; 90 is 9×10; 99 is 9×11."
  },
  {
    id: "d7_q18",
    question: "A software engineer has a 4-hour morning block (240 minutes). She plans:\n- Task 1: Code review (40 mins)\n- Task 2: Bug fixing (90 mins)\n- Task 3: API documentation (50 mins)\n- A mandatory tea break (15 mins)\nCan all three tasks and the break fit within the 4-hour block, and how much buffer time remains?",
    options: [
      "Yes, with 45 minutes of buffer time remaining.",
      "Yes, with 60 minutes of buffer time remaining.",
      "No, it exceeds the 240-minute limit by 15 minutes.",
      "No, it exceeds the 240-minute limit by 30 minutes."
    ],
    correctAnswer: 0, // Option A
    difficulty: "Applied Reasoning",
    topic: "Multi-Task Time Scheduling",
    explanation: "Total time needed = 40 + 90 + 50 + 15 = 195 minutes. Total available time = 240 minutes. Remaining buffer = 240 - 195 = 45 minutes. It easily fits with 45 minutes to spare.",
    distractorNotes: "40+90+50+15 = 195; 240 - 195 = 45."
  },
  {
    id: "d7_q19",
    question: "A customer calls a retail helpline stating: 'My package was supposed to arrive today, but it is not here.' The agent checks the tracking log and finds: 'Delivery attempted at 1:30 PM; office gate was locked; notification left.' What is the most logical next action for the agent?",
    options: [
      "Cancel the order and block the customer's phone number.",
      "Explain the delivery attempt, confirm the customer's gate hours, and arrange a redelivery window.",
      "Assume the courier driver stole the package.",
      "Advise the customer that packages never arrive on weekdays."
    ],
    correctAnswer: 1, // Option B
    difficulty: "Applied Reasoning",
    topic: "Customer Service Investigation",
    explanation: "The tracking evidence explains why the delivery failed (gate locked). The professional action is to communicate the facts, clarify access hours, and schedule redelivery.",
    distractorNotes: "Canceling or making baseless accusations contradicts verified evidence in the tracking log."
  },
  {
    id: "d7_q20",
    question: "An e-commerce website changes its checkout button color from blue to green to fix low sales. Two weeks later, total sales remain identical. According to the problem-solving framework, what should the team do next?",
    options: [
      "Assume the test failed because two weeks is too short, and wait another year.",
      "Conclude that button color was not the root cause, and investigate other friction points such as payment options, pricing, or page loading speed.",
      "Shut down the online store immediately.",
      "Double the price of all items to force higher revenue."
    ],
    correctAnswer: 1, // Option B
    difficulty: "Applied Reasoning",
    topic: "The Verification Step in Problem Solving",
    explanation: "In the VERIFY stage, when an action fails to produce the desired result, an analytical thinker concludes the hypothesis was incorrect and investigates other factors.",
    distractorNotes: "Persisting with an invalidated theory or shutting down the store violates logical decision-making."
  }
];
