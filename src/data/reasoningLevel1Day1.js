/**
 * SPOKO Logical Reasoning & Analytical Thinking
 * Level 1: Beginner
 * Day 1: Introduction to Logical Thinking
 * 
 * Interactive written lessons, worked examples, interactive classification,
 * cause-and-effect checks, 5-step framework cases, and 20 practice questions.
 */

export const day1Overview = {
  courseName: "Logical Reasoning & Analytical Thinking",
  level: "Level 1 – Beginner",
  day: "Day 1",
  topic: "Introduction to Logical Thinking",
  targetAudience: "Students, college graduates, freshers, job seekers, and beginners",
  objectives: [
    "Explain what logical thinking means and distinguish it from guessing.",
    "Distinguish facts from opinions and assumptions with objective confidence.",
    "Identify the root problem before attempting to jump into solutions.",
    "Recognise cause-and-effect relationships without falling for correlation traps.",
    "Apply the 5-step logical framework: Observe → Identify → Analyse → Solve → Verify.",
    "Evaluate simple arguments and conclusions using only provided evidence."
  ]
};

// ==========================================
// SECTION 1: WHAT IS LOGICAL THINKING?
// ==========================================
export const section1Content = {
  title: "What Is Logical Thinking?",
  definition: {
    core: "Logical thinking is the disciplined process of analysing verifiable information, establishing valid relationships between ideas, and drawing objective conclusions without relying on guesswork or emotional bias.",
    breakdown: [
      {
        term: "Systematic",
        desc: "It follows an orderly, step-by-step sequence rather than chaotic, random thoughts."
      },
      {
        term: "Evidence-Based",
        desc: "Every conclusion is anchored in observable, verifiable facts and tested logic."
      },
      {
        term: "Objective",
        desc: "It separates personal feelings, initial prejudices, or hopes from reality."
      }
    ]
  },
  importance: [
    {
      domain: "Daily Life",
      icon: "Home",
      summary: "Everyday decisions like budgeting, managing time, and evaluating online news rely on separating real information from deceptive claims."
    },
    {
      domain: "Higher Education",
      icon: "GraduationCap",
      summary: "Academic success requires understanding underlying concepts, evaluating scientific or historical evidence, and writing logically sound arguments."
    },
    {
      domain: "Job Interviews",
      icon: "Briefcase",
      summary: "Recruiters evaluate problem-solving aptitude, situational judgment, and whether you can structure an answer clearly under pressure."
    },
    {
      domain: "Workplace & Career",
      icon: "TrendingUp",
      summary: "Professionals must diagnose root causes of operational bottlenecks, resolve conflicts calmly, and design scalable solutions."
    }
  ],
  guessingVsReasoning: {
    comparison: [
      {
        feature: "Starting Point",
        guessing: "A hunch, emotional gut feeling, or random chance.",
        reasoning: "Observable facts, data points, or reliable premises."
      },
      {
        feature: "Process",
        guessing: "Immediate leap to an answer without supporting steps.",
        reasoning: "Methodical analysis connecting cause, evidence, and effect."
      },
      {
        feature: "Consistency",
        guessing: "Unreliable; cannot be repeatedly reproduced with certainty.",
        reasoning: "Repeatable; another person reviewing the same facts reaches the same conclusion."
      },
      {
        feature: "When Challenged",
        guessing: "Defended with 'I just feel like it' or defensive excuses.",
        reasoning: "Defended by referencing specific data, logic, and tests."
      }
    ]
  },
  decisionMakingImpact: [
    "Minimises costly mistakes by testing assumptions before committing money or time.",
    "Reduces stress and cognitive overload by breaking complex dilemmas into manageable steps.",
    "Enables effective communication, allowing you to explain your rationale persuasively to others.",
    "Helps you detect bias, logical fallacies, and deceptive marketing claims."
  ],
  everydayExamples: [
    {
      title: "Smartphone Battery Drainage",
      nonLogical: "Assuming the phone is permanently broken and immediately borrowing money to buy a new one.",
      logical: "Checking battery usage in settings, discovering a background social app is consuming 48% battery, disabling background refresh, and monitoring battery life over 24 hours."
    },
    {
      title: "Discount Shopping Offer",
      nonLogical: "Buying three jackets immediately because the banner screams 'Buy 2 Get 1 Free - Today Only!'.",
      logical: "Calculating unit price, realizing each jacket was marked up 40% prior to the sale, and determining whether you actually need three jackets."
    },
    {
      title: "Choosing a Daily Commute",
      nonLogical: "Taking the highway every day because it has higher speed limits, even though you get stuck in gridlock.",
      logical: "Comparing travel times on the highway versus the metro across 5 weekdays, discovering the metro is 14 minutes faster and 30% cheaper."
    }
  ],
  workedExample: {
    scenario: "You leave home at 8:30 AM and arrive late to work three consecutive days in a row.",
    steps: [
      {
        stepNumber: 1,
        question: "What is the actual problem?",
        analysis: "The problem is that you are consistently arriving at your workplace past the scheduled start time. Note: The problem is NOT 'the traffic is horrible' or 'my alarm is rude'—those are possible factors, but the core issue is late arrival."
      },
      {
        stepNumber: 2,
        question: "What information should you collect?",
        analysis: "Record your exact departure time, the duration of each segment (walking to stop, transit wait time, travel time), weather conditions, and road bottlenecks across those three days."
      },
      {
        stepNumber: 3,
        question: "What possible causes could explain the delay?",
        analysis: "Possible causes: (a) A new school opening nearby at 8:35 AM increased vehicle density, (b) Road construction reduced lanes on your main junction, or (c) The bus timetable shifted by 10 minutes."
      },
      {
        stepNumber: 4,
        question: "What solution could you test?",
        analysis: "Formulate a testable plan: Leave home at 8:15 AM (15 minutes earlier) or test an alternate route via the outer ring road for the next 3 days, logging arrival times to verify if the issue resolves."
      }
    ]
  }
};

// ==========================================
// SECTION 2: FACTS, OPINIONS, AND ASSUMPTIONS
// ==========================================
export const section2Content = {
  title: "Facts, Opinions, and Assumptions",
  definitions: [
    {
      type: "Fact",
      badgeColor: "emerald",
      definition: "A statement that can be checked and verified against reliable, objective evidence such as scientific measurement, official documents, historical records, or direct observation.",
      keyTest: "Can this statement be proven true or false using objective data, regardless of who reads it?",
      example: "Water freezes at 0 degrees Celsius at standard atmospheric pressure."
    },
    {
      type: "Opinion",
      badgeColor: "amber",
      definition: "A personal belief, feeling, preference, or value judgment that expresses how someone feels or evaluates something. It cannot be proven true or false for everyone.",
      keyTest: "Does this statement depend on individual taste, emotions, or personal standards?",
      example: "Winter is the most enjoyable season of the year."
    },
    {
      type: "Assumption",
      badgeColor: "indigo",
      definition: "Something accepted or taken for granted as true without sufficient immediate verification, proof, or factual backing.",
      keyTest: "Is this premise being treated as an established truth even though no current evidence has confirmed it?",
      example: "The train will arrive on time today because it usually does."
    }
  ],
  classificationItems: [
    {
      id: "foa_1",
      statement: "The company headquarters is located on the 4th floor of the North Tower.",
      correctType: "Fact",
      explanation: "This statement can be verified directly against building directories, physical inspection, and official registration documents.",
      whyNotOther: "It is not an opinion because it doesn't express a personal preference, nor an assumption because it refers to a verifiable physical location."
    },
    {
      id: "foa_2",
      statement: "Remote work is far more productive and satisfying than working in an office.",
      correctType: "Opinion",
      explanation: "'Productive' and 'satisfying' in this broad context reflect subjective personal preferences and work-style values that differ greatly among individuals.",
      whyNotOther: "Even if many share this view, satisfaction is a subjective human emotion, making this a personal viewpoint rather than an universal fact."
    },
    {
      id: "foa_3",
      statement: "Rohan did not reply to my email within two hours, so he must be ignoring me.",
      correctType: "Assumption",
      explanation: "The conclusion that Rohan is deliberately ignoring you is accepted as truth without verifying other possibilities (such as being in meetings, technical glitches, or urgent tasks).",
      whyNotOther: "The non-reply within two hours is a fact, but concluding 'he must be ignoring me' is an unverified assumption."
    },
    {
      id: "foa_4",
      statement: "The temperature in Chennai reached 38 degrees Celsius yesterday afternoon.",
      correctType: "Fact",
      explanation: "This is an objective meteorological measurement recorded by instruments and historical weather databases.",
      whyNotOther: "It does not involve personal bias or unverified belief; calibrated thermometer records provide conclusive proof."
    },
    {
      id: "foa_5",
      statement: "Python is the best programming language for every aspiring software developer.",
      correctType: "Opinion",
      explanation: "The word 'best' is a value judgment. The optimal language depends entirely on project requirements, domain (e.g., embedded systems vs data science), and career goals.",
      whyNotOther: "While Python has high popularity metrics (which is a fact), claiming it is 'the best for everyone' is a subjective judgment."
    },
    {
      id: "foa_6",
      statement: "Because the candidate graduated from a top university, she will naturally outperform our existing team members.",
      correctType: "Assumption",
      explanation: "This takes future workplace performance for granted based solely on college pedigree without assessing practical skills, teamwork, or experience.",
      whyNotOther: "Her graduation from that university may be a fact, but the claim that she will outperform the team is an unverified presumption."
    },
    {
      id: "foa_7",
      statement: "The human heart typically pumps about 5 litres of blood per minute at rest.",
      correctType: "Fact",
      explanation: "This is a well-established physiological measurement documented through extensive medical research and clinical observation.",
      whyNotOther: "It is an empirical biological fact that does not depend on someone's point of view."
    },
    {
      id: "foa_8",
      statement: "Classical instrumental music is much more relaxing than modern acoustic guitar music.",
      correctType: "Opinion",
      explanation: "What feels 'relaxing' depends on individual psychological response, cultural background, and musical taste.",
      whyNotOther: "Personal emotional and aesthetic responses cannot be standardized as universal scientific facts."
    },
    {
      id: "foa_9",
      statement: "Sales dropped this quarter, so our marketing team must have done poor work.",
      correctType: "Assumption",
      explanation: "Blaming marketing assumes without evidence that external factors (e.g., seasonal downturn, competitor discount campaigns, supply chain delays) were not responsible.",
      whyNotOther: "The sales decline is a verifiable fact, but attributing blame entirely to marketing without investigation is an assumption."
    },
    {
      id: "foa_10",
      statement: "A triangle has three interior angles whose sum is always 180 degrees in Euclidean geometry.",
      correctType: "Fact",
      explanation: "This is a mathematically proven theorem verifiable by formal geometric proof.",
      whyNotOther: "Mathematical laws are definitive facts within their defined axioms, not opinions or assumptions."
    },
    {
      id: "foa_11",
      statement: "Since the weather is sunny right now, it will certainly remain dry throughout the evening.",
      correctType: "Assumption",
      explanation: "Predicting dry evening weather solely from current sunshine assumes atmospheric stability without checking barometer readings or meteorological radar.",
      whyNotOther: "Current sunshine is a fact; projecting it unconditionally into the future without continuous data is an assumption."
    },
    {
      id: "foa_12",
      statement: "Modern minimalist architectural design looks sterile, unwelcoming, and cold.",
      correctType: "Opinion",
      explanation: "Evaluating an architectural aesthetic as 'sterile' or 'unwelcoming' is an aesthetic assessment governed by individual perspective.",
      whyNotOther: "Architectural aesthetics cannot be empirically proven true or false; different people perceive the exact same building differently."
    }
  ]
};

// ==========================================
// SECTION 3: UNDERSTANDING PROBLEMS
// ==========================================
export const section3Content = {
  title: "Understanding Problems",
  intro: "Before rushing to solve a problem, you must clearly understand what the problem actually is. Most bad decisions come from solving the wrong problem or treating a visible symptom as the root cause.",
  frameworkSteps: [
    {
      step: 1,
      name: "Identify the Actual Problem",
      detail: "Separate the visible symptom (e.g., 'the car won't start') from the underlying breakdown (e.g., 'the battery terminal is corroded')."
    },
    {
      step: 2,
      name: "Separate Known Information from Missing Information",
      detail: "List what facts you currently have on hand, and identify what critical data is still unknown or missing."
    },
    {
      step: 3,
      name: "Identify Possible Causes",
      detail: "Brainstorm plausible factors that could generate the issue without prejudging or jumping to conclusions."
    },
    {
      step: 4,
      name: "Develop Alternative Solutions",
      detail: "Generate at least two or three viable options rather than latching onto the first idea that comes to mind."
    },
    {
      step: 5,
      name: "Compare Possible Outcomes",
      detail: "Evaluate each option by considering required resources, feasibility, risks, and likelihood of permanent resolution."
    },
    {
      step: 6,
      name: "Choose a Solution and Evaluate Its Result",
      detail: "Execute the chosen course of action systematically and measure the outcome against concrete benchmarks."
    }
  ],
  workedScenarios: [
    {
      id: "scenario_1",
      title: "Scenario 1: A Student Repeatedly Scores Poorly in a Subject",
      symptom: "A college student scores 42/100 and 45/100 on two consecutive Data Structures exams.",
      analysis: {
        step1: "Actual Problem: The student fails to demonstrate conceptual mastery and problem-solving on exam questions within the allocated time.",
        step2: "Known vs Missing: Known: Scores, exam syllabus, topics failed. Missing: How does the student study? Does the student practice writing code on paper? Does exam anxiety cause mental blocks?",
        step3: "Possible Causes: (a) Passive studying (rereading slides instead of coding), (b) Missing prerequisite understanding of pointers and arrays, (c) Poor exam time allocation.",
        step4: "Alternative Solutions: Option A: Reread textbook twice. Option B: Solve 3 timed coding problems daily and attend professor office hours for difficult concepts. Option C: Study in a group with friends.",
        step5: "Comparison: Option A reinforces passive memorization. Option C risks social distraction. Option B targets active recall, timed practice, and authoritative clarification.",
        step6: "Evaluation: Implement Option B for 3 weeks; evaluate performance on weekly mock quizzes to verify if scores rise above 75%."
      }
    },
    {
      id: "scenario_2",
      title: "Scenario 2: An Employee Frequently Misses Deadlines",
      symptom: "A junior analyst delivers 4 out of 5 weekly reports 24 to 48 hours late.",
      analysis: {
        step1: "Actual Problem: Weekly deliverables are not submitted within the agreed-upon project timeframe, disrupting downstream team workflows.",
        step2: "Known vs Missing: Known: Submission timestamps, report templates. Missing: When does the analyst begin working? Are requirements changing midway? Are other departments delaying input data?",
        step3: "Possible Causes: (a) Unclear requirements causing rework, (b) Dependency bottlenecks where another team delays source data, (c) Poor time estimation and prioritization.",
        step4: "Alternative Solutions: Option A: Work late every night. Option B: Implement a dependency tracking checklist and daily 10-minute check-in with the data provider. Option C: Request extended official deadlines.",
        step5: "Comparison: Option A leads to employee burnout and errors. Option C masks inefficiencies without fixing the root delay. Option B identifies and eliminates dependency blockers.",
        step6: "Evaluation: Roll out Option B; monitor next 4 weekly deliverables to verify if on-time completion reaches 100%."
      }
    },
    {
      id: "scenario_3",
      title: "Scenario 3: A Business Receives Fewer Customer Enquiries",
      symptom: "An online tutoring portal notices website inquiries dropped by 60% over the last 30 days.",
      analysis: {
        step1: "Actual Problem: The conversion of website visitors into contact inquiries has experienced a steep, sudden drop.",
        step2: "Known vs Missing: Known: Total inquiries dropped. Missing: Did total website traffic drop, or did visitors arrive but fail to submit the inquiry form? On which devices did the drop occur?",
        step3: "Possible Causes: (a) Broken web contact form after a recent update, (b) Competitor launched a viral discount campaign, (c) Marketing ad campaigns were paused, (d) Search engine ranking dropped.",
        step4: "Alternative Solutions: Option A: Spend $2,000 on new marketing ads immediately. Option B: Audit website analytics to locate the exact drop-off point and test the form on mobile/desktop browsers. Option C: Lower course prices across the board.",
        step5: "Comparison: Option A wastes money if the contact form is broken. Option C cuts revenue unnecessarily. Option B isolates the mechanical and analytical root cause with zero financial risk.",
        step6: "Evaluation: Audit analytics. Discover the mobile submit button stopped functioning on iOS Safari. Fix the code; test across 5 devices; monitor inquiry restoration within 48 hours."
      }
    }
  ]
};

// ==========================================
// SECTION 4: BASIC CAUSE-AND-EFFECT REASONING
// ==========================================
export const section4Content = {
  title: "Basic Cause-and-Effect Reasoning",
  concepts: {
    cause: "A cause is an event, action, or condition that directly produces a specific result or outcome.",
    effect: "An effect is the change, result, or consequence that occurs because of the preceding cause.",
    temporalRule: "A cause must always precede or occur simultaneously with its effect. An event occurring on Friday cannot cause an event that happened on Wednesday.",
    correlationWarning: "Correlation means two events occur together or share a pattern. Causation means one event directly produces the other. Two events occurring together does NOT automatically prove one caused the other."
  },
  everydayExamples: [
    {
      title: "1. Rain and Wet Sidewalks",
      cause: "Heavy rain falls from clouds.",
      effect: "The outdoor sidewalks become wet.",
      explanation: "The water droplets from the rain directly soak the pavement. Note: Wet sidewalks do not cause rain (directional cause-effect)."
    },
    {
      title: "2. Ice Cream Sales and Drowning Incidents (The Confounder Trap)",
      cause: "High summer temperatures (Third Variable).",
      effect: "Both ice cream sales surge AND more people swim in lakes/rivers.",
      explanation: "Ice cream does not cause drowning. Summer heat causes people to buy cold ice cream, and summer heat causes more people to swim, raising drowning risks."
    },
    {
      title: "3. Laptop Fan Speed and Open Applications",
      cause: "Running 25 browser tabs alongside heavy video editing software.",
      effect: "The computer processor works at maximum capacity, generating excess heat that triggers the cooling fan to spin loudly.",
      explanation: "A clear physical mechanism links high computational workload to thermal generation and fan activation."
    },
    {
      title: "4. Neglecting Plant Watering",
      cause: "A houseplant receives no water for 21 consecutive days in hot weather.",
      effect: "The plant's leaves wilt, turn brown, and dry up.",
      explanation: "Cellular turgor pressure collapses without water, causing direct biological wilting."
    },
    {
      title: "5. Carrying an Umbrella and Rainy Weather",
      cause: "Atmospheric low-pressure system and moisture condensation.",
      effect: "Rainfall occurs.",
      explanation: "You carrying an umbrella has zero atmospheric impact on rainfall. Believing your umbrella summons rain is a superstitious confusion of coincidence with causation."
    }
  ],
  interactiveQuestions: [
    {
      id: "ce_1",
      scenario: "A retail store notices that on days when they play classical background music, total sales are 15% higher. The manager concludes that playing classical music forces customers to spend more money.",
      question: "Which of the following is the most logically sound evaluation of this conclusion?",
      options: [
        "The conclusion is definitely proven because sales data showed a 15% numerical increase.",
        "The conclusion jumps to causation without testing other variables, such as weekend foot traffic or customer demographics.",
        "Classical music always makes everyone buy luxury goods regardless of circumstances.",
        "Playing rock music would have produced an identical 15% increase."
      ],
      correctIndex: 1,
      explanation: "A numerical correlation between music and sales does not eliminate confounding factors. It is possible classical music was played predominantly on weekends when wealthier or larger crowds naturally visited the store."
    },
    {
      id: "ce_2",
      scenario: "A researcher observes that cities with a higher number of fire stations also report a higher number of fires each year.",
      question: "What is the most logical explanation for this correlation?",
      options: [
        "Fire stations actively start fires to justify their budget.",
        "A third variable, such as total population and city size, causes both more fires and the need for more fire stations.",
        "Fires are caused by the sound of fire truck sirens.",
        "The presence of firefighters makes citizens careless with fire."
      ],
      correctIndex: 1,
      explanation: "Larger cities with millions of residents naturally have more fires due to sheer population density, and they also build more fire stations to protect those residents."
    },
    {
      id: "ce_3",
      scenario: "Every morning at 5:30 AM, the rooster crows. At 5:45 AM, the sun rises over the horizon.",
      question: "Does the rooster's crow cause the sun to rise?",
      options: [
        "Yes, because the rooster crows before the sun rises every single day.",
        "Yes, because there is an unbroken correlation over several years.",
        "No; temporal precedence (happening before) does not establish a physical mechanism of causation.",
        "Yes, but only in rural farming environments."
      ],
      correctIndex: 2,
      explanation: "Just because Event A happens before Event B does not mean A causes B (the 'post hoc ergo propter hoc' fallacy). The Earth's rotation causes sunrise; the rooster responds to early twilight."
    },
    {
      id: "ce_4",
      scenario: "A software developer changes three CSS styling rules and reboots their computer. The website layout now displays correctly.",
      question: "How should the developer logically test whether rebooting the computer was the cause of the fix?",
      options: [
        "Reboot the computer three more times to see if the layout gets even better.",
        "Revert the CSS changes while keeping the computer running, or inspect CSS caching rules to isolate the exact variable.",
        "Assume the reboot was the sole reason and always reboot whenever CSS fails.",
        "Delete the website codebase and start again."
      ],
      correctIndex: 1,
      explanation: "To test a cause, you must isolate variables. Reverting CSS changes or checking if browser cache was cleared by the reboot reveals which action actually fixed the rendering."
    },
    {
      id: "ce_5",
      scenario: "During winter, warm jacket sales increase, and flu cases also increase. A student claims that wearing warm jackets causes the flu.",
      question: "Why is this claim logically flawed?",
      options: [
        "Because jackets are too expensive to cause illnesses.",
        "Because cold winter weather drives indoor crowding and virus transmission, which also coincides with people wearing jackets.",
        "Because viruses only infect people who do not own jackets.",
        "Because flu cases only happen in summer months."
      ],
      correctIndex: 1,
      explanation: "Cold weather drives people indoors where respiratory viruses spread readily, while also motivating people to wear jackets. The jacket is not the causal agent of viral infection."
    }
  ]
};

// ==========================================
// SECTION 5: A SIMPLE LOGICAL THINKING FRAMEWORK
// ==========================================
export const section5Content = {
  title: "A Simple Logical Thinking Framework",
  subtitle: "OBSERVE → IDENTIFY → ANALYSE → SOLVE → VERIFY",
  steps: [
    {
      step: 1,
      code: "OBSERVE",
      title: "Observe",
      summary: "Collect relevant, verifiable information without jumping to hasty conclusions.",
      guidelines: [
        "Gather objective data points, logs, and dates.",
        "Avoid letting emotional reactions taint your initial perception.",
        "Distinguish between what you actually witnessed versus what you assumed."
      ]
    },
    {
      step: 2,
      code: "IDENTIFY",
      title: "Identify",
      summary: "Define the actual core problem with precision.",
      guidelines: [
        "State the problem in a single clear, concise sentence.",
        "Target the root breakdown rather than superficial symptoms.",
        "Identify who or what is directly impacted."
      ]
    },
    {
      step: 3,
      code: "ANALYSE",
      title: "Analyse",
      summary: "Examine facts, relationships, assumptions, and potential root causes.",
      guidelines: [
        "Break the situation down into smaller constituent parts.",
        "Evaluate cause-and-effect pathways.",
        "Verify your assumptions and check for missing information."
      ]
    },
    {
      step: 4,
      code: "SOLVE",
      title: "Solve",
      summary: "Develop and select a feasible, cost-effective, and targeted solution.",
      guidelines: [
        "Brainstorm multiple alternative interventions.",
        "Compare potential outcomes, required effort, and trade-offs.",
        "Create an actionable, step-by-step implementation plan."
      ]
    },
    {
      step: 5,
      code: "VERIFY",
      title: "Verify",
      summary: "Test whether the chosen solution actually fixed the problem.",
      guidelines: [
        "Define a measurable success metric before testing.",
        "Observe the results over a reasonable evaluation timeframe.",
        "If the problem persists, retrace your steps to re-analyse."
      ]
    }
  ],
  workedCases: [
    {
      id: "case_student",
      domain: "Student Life",
      scenario: "College Group Project Breakdown",
      context: "A 4-person engineering team has a capstone submission due in 4 days. One team member has stopped responding to WhatsApp messages, and their section (Database Schema & API Design) is completely unwritten.",
      application: [
        {
          stage: "OBSERVE",
          details: "4 days until deadline. Team member Alex hasn't answered messages for 48 hours. Alex's assigned section is empty in the shared Git repo. Other 3 members have completed 70% of their sections."
        },
        {
          stage: "IDENTIFY",
          details: "The database and API design component is missing and will prevent system integration, jeopardising the team's project submission in 96 hours."
        },
        {
          stage: "ANALYSE",
          details: "Facts: Waiting passively risks guaranteed failure. Missing info: Is Alex sick or having an emergency? Feasibility: Can the remaining 3 members absorb Alex's workload without sacrificing quality?"
        },
        {
          stage: "SOLVE",
          details: "1. Attempt one urgent phone call and email to Alex. 2. If no response within 4 hours, hold a 15-minute emergency triage with the 3 active members. 3. Re-divide Alex's section into 3 smaller modules. 4. Inform the course professor proactively of the redistribution."
        },
        {
          stage: "VERIFY",
          details: "Check Git commits daily at 8:00 PM. Confirm the schema compiles with the backend by Day 3, leaving Day 4 for end-to-end integration testing."
        }
      ]
    },
    {
      id: "case_workplace",
      domain: "Workplace Operations",
      scenario: "Warehouse Order Fulfillment Spikes from 24h to 72h",
      context: "An e-commerce company guarantees 24-hour dispatch. Over the past week, average dispatch time escalated to 72 hours, generating over 180 customer complaints.",
      application: [
        {
          stage: "OBSERVE",
          details: "Dispatch time tripled over 7 days. Customer support ticket volume increased 300%. A software update to the warehouse inventory scanner was deployed last Monday."
        },
        {
          stage: "IDENTIFY",
          details: "Warehouse pickers are unable to retrieve and pack orders at the standard rate, creating a bottleneck that delays order dispatch by 48 hours."
        },
        {
          stage: "ANALYSE",
          details: "Investigation reveals that after the scanner update, barcode scanning takes 12 seconds per item instead of 1.5 seconds due to an unindexed database query over Wi-Fi. Pickers spend 5x longer at every shelf."
        },
        {
          stage: "SOLVE",
          details: "1. Engineering team rolls back the scanner firmware to the previous stable release immediately. 2. Temporary manual barcode verification sheets are printed for pickers during the 30-minute rollback window."
        },
        {
          stage: "VERIFY",
          details: "Measure scan latency immediately after rollback (target: < 2 seconds). Track order dispatch volume over the next 24 hours to confirm return to the 24-hour fulfillment standard."
        }
      ]
    }
  ]
};

// ==========================================
// STEP 4: INTERACTIVE PRACTICE QUESTIONS (EXACTLY 20 UNIQUE QUESTIONS)
// ==========================================
// Difficulty distribution:
// Qs 1–5: Easy
// Qs 6–12: Easy to moderate
// Qs 13–17: Moderate
// Qs 18–20: Applied reasoning scenarios
export const day1PracticeQuestions = [
  // --- Questions 1 to 5: Easy ---
  {
    id: 1,
    difficulty: "Easy",
    category: "Definitions & Foundations",
    question: "What is the primary defining characteristic of logical thinking?",
    options: [
      "Trusting your immediate intuition and acting on gut feelings without delay.",
      "A step-by-step cognitive process of evaluating facts to draw objective, evidence-based conclusions.",
      "Accepting established opinions of authority figures without questioning them.",
      "Relying on random trial-and-error until an acceptable solution is accidentally found."
    ],
    correctAnswer: 1,
    explanation: "Logical thinking is systematic, disciplined, and rooted in verifying evidence and premises rather than guessing or relying purely on emotions.",
    whyIncorrect: {
      0: "Intuition may be helpful occasionally, but it is not a systematic, evidence-based process.",
      2: "Blindly accepting authority opinions without factual validation is an appeal to authority, not logic.",
      3: "Random trial-and-error lacks structure and relies on chance rather than reasoned deduction."
    }
  },
  {
    id: 2,
    difficulty: "Easy",
    category: "Facts, Opinions & Assumptions",
    question: "Which of the following statements represents a verifiable FACT?",
    options: [
      "The laptop has an Intel Core i7 processor and 16 gigabytes of RAM.",
      "The laptop has the most sleek and visually appealing keyboard layout on the market.",
      "Anyone who buys this laptop will instantly become a top-tier programmer.",
      "This laptop is priced far too high for what it offers."
    ],
    correctAnswer: 0,
    explanation: "Hardware specifications (processor type and RAM capacity) can be checked and confirmed with physical inspection and system diagnostic tools.",
    whyIncorrect: {
      1: "Sleek and visually appealing are subjective aesthetic opinions.",
      2: "Claiming buying a laptop will automatically make someone a top programmer is an unverified assumption.",
      3: "Evaluating a price as 'too high' is a subjective personal financial judgment."
    }
  },
  {
    id: 3,
    difficulty: "Easy",
    category: "Facts, Opinions & Assumptions",
    question: "Read the statement: 'Coffee is much more delicious than tea.' How should this statement be classified?",
    options: [
      "Fact, because billions of people drink coffee every morning.",
      "Opinion, because personal taste preference cannot be proven true or false for everyone.",
      "Assumption, because it will be proven true once chemical flavor compounds are tested.",
      "Cause-and-effect relationship, because coffee causes taste enjoyment."
    ],
    correctAnswer: 1,
    explanation: "'Delicious' is a subjective sensory judgment that depends entirely on individual taste. It cannot be objectively measured or declared universally true.",
    whyIncorrect: {
      0: "High consumption figures do not make an aesthetic taste preference an objective scientific fact.",
      2: "Chemical analysis cannot prove taste superiority because taste appreciation is psychological and personal.",
      3: "This is a statement of preference, not an established physical cause-and-effect law."
    }
  },
  {
    id: 4,
    difficulty: "Easy",
    category: "Facts, Opinions & Assumptions",
    question: "What is an assumption in logical reasoning?",
    options: [
      "A statement verified by three independent scientific peer reviews.",
      "A mathematical formula that always yields a predictable result.",
      "Something accepted as true without sufficient immediate proof or verification.",
      "A personal feeling that everyone is required by law to agree with."
    ],
    correctAnswer: 2,
    explanation: "An assumption is a premise taken for granted as true before verifying whether factual evidence actually supports it.",
    whyIncorrect: {
      0: "A peer-reviewed statement supported by data is a verified fact.",
      1: "A proven formula is a mathematical fact.",
      3: "Personal feelings are opinions, not the definition of an assumption."
    }
  },
  {
    id: 5,
    difficulty: "Easy",
    category: "Problem Identification",
    question: "When approaching a problem, what is the very first step you should always take?",
    options: [
      "Implement the fastest and easiest solution you can think of.",
      "Ask a colleague to solve it so you can avoid making a mistake.",
      "Clearly identify and define what the actual problem is.",
      "Assign blame to the person who caused the problem."
    ],
    correctAnswer: 2,
    explanation: "You cannot solve a problem effectively until you precisely define what the problem actually is. Rushing into solutions without clarity usually solves only a symptom.",
    whyIncorrect: {
      0: "Implementing hasty solutions without understanding the issue often wastes time and worsens the situation.",
      1: "Delegating without understanding forfeits personal problem-solving and critical thinking.",
      3: "Assigning blame is an emotional reaction that distracts from diagnostic analysis."
    }
  },

  // --- Questions 6 to 12: Easy to Moderate ---
  {
    id: 6,
    difficulty: "Easy to Moderate",
    category: "Cause & Effect Reasoning",
    question: "A plant kept in a dark cupboard without sunlight for two weeks turns pale yellow and wilts. What is the most logical cause of this condition?",
    options: [
      "The plant became lonely because nobody visited the cupboard.",
      "The lack of sunlight prevented the plant from performing photosynthesis to produce necessary chlorophyll and food.",
      "The dark cupboard temperature was exactly identical to outdoor temperatures.",
      "The plant was cursed with bad luck."
    ],
    correctAnswer: 1,
    explanation: "Photosynthesis requires sunlight to synthesize chlorophyll and nutrients. Depriving the plant of light directly explains the loss of green pigmentation and structural wilting.",
    whyIncorrect: {
      0: "Plants do not possess human social emotions.",
      2: "Equal temperature does not explain physiological degradation.",
      3: "Superstition is not an evidence-based logical explanation."
    }
  },
  {
    id: 7,
    difficulty: "Easy to Moderate",
    category: "Logical Thinking Framework",
    question: "In the 5-step framework (Observe → Identify → Analyse → Solve → Verify), what is the primary objective of the 'Analyse' stage?",
    options: [
      "To immediately execute the first solution that comes to mind.",
      "To celebrate that the problem has been observed.",
      "To examine facts, relationships, assumptions, and potential root causes.",
      "To close the case without testing the outcome."
    ],
    correctAnswer: 2,
    explanation: "Analysis entails dissecting the problem, exploring cause-and-effect links, validating assumptions, and examining what variables contributed to the breakdown.",
    whyIncorrect: {
      0: "Executing a solution is the 'Solve' stage, not 'Analyse'.",
      1: "Celebrating does not analyse the problem.",
      3: "Closing without testing skips both 'Solve' and 'Verify'."
    }
  },
  {
    id: 8,
    difficulty: "Easy to Moderate",
    category: "Facts, Opinions & Assumptions",
    question: "Consider this workplace statement: 'Priya arrived at the office at 9:45 AM today.' How is this statement best classified?",
    options: [
      "An opinion, because the manager might feel that 9:45 AM is unacceptable.",
      "A fact, because her arrival time can be objectively verified using biometric attendance records.",
      "An assumption, because nobody can ever know what time someone enters a room.",
      "A hypothesis, because arrival times change every day."
    ],
    correctAnswer: 1,
    explanation: "The physical time of arrival is an objective event that can be verified against electronic badge logs, reception sign-in sheets, or security video.",
    whyIncorrect: {
      0: "Whether 9:45 AM is 'late' may be an interpretation, but the statement itself only records the time of arrival.",
      2: "Biometric and swipe card systems provide reliable verification.",
      3: "Day-to-day variation does not change the factual nature of today's specific arrival timestamp."
    }
  },
  {
    id: 9,
    difficulty: "Easy to Moderate",
    category: "Problem Identification",
    question: "A student says: 'I failed my chemistry exam because the exam paper was too long.' Which of the following pieces of missing information is most crucial to logically test this explanation?",
    options: [
      "The color of pen the student used during the exam.",
      "Whether other prepared students in the class were able to finish the paper within the allotted time.",
      "The brand of backpack the student carried to school.",
      "What the student ate for dinner two days before the exam."
    ],
    correctAnswer: 1,
    explanation: "Comparing with peers provides an objective benchmark. If 85% of prepared students finished comfortably, the issue was likely personal time management or preparation, not paper length.",
    whyIncorrect: {
      0: "Pen color has negligible influence on exam pacing.",
      2: "Backpack brand is irrelevant to exam completion time.",
      3: "Dinner two days prior is too distant to be a meaningful diagnostic variable."
    }
  },
  {
    id: 10,
    difficulty: "Easy to Moderate",
    category: "Cause & Effect Reasoning",
    question: "Why does the occurrence of two events together (correlation) NOT automatically prove that one event caused the other?",
    options: [
      "Because events in the universe are completely random and nothing ever causes anything.",
      "Because an unobserved third variable or simple coincidence could be responsible for both events occurring together.",
      "Because cause and effect only applies to chemistry, not human activities.",
      "Because correlation is always an illusion created by computers."
    ],
    correctAnswer: 1,
    explanation: "Correlation merely demonstrates co-occurrence. A confounding third factor (e.g., hot summer weather) can cause two unrelated metrics (e.g., ice cream sales and swimming drownings) to rise simultaneously.",
    whyIncorrect: {
      0: "Physical and logical causation governs countless real-world phenomena.",
      2: "Cause and effect applies across economics, psychology, medicine, and engineering.",
      3: "Correlation is a valid mathematical measurement; it simply does not equal causation on its own."
    }
  },
  {
    id: 11,
    difficulty: "Easy to Moderate",
    category: "Facts, Opinions & Assumptions",
    question: "Identify the ASSUMPTION in this scenario: 'The marketing manager didn't greet me in the corridor, so my project proposal must have been rejected.'",
    options: [
      "The manager walking through the corridor.",
      "The manager not saying hello.",
      "The conclusion that lack of a corridor greeting means the proposal was rejected.",
      "The existence of the project proposal."
    ],
    correctAnswer: 2,
    explanation: "Connecting a brief social omission in a hallway to a formal project rejection is an unverified assumption. The manager might have been distracted, thinking of an urgent meeting, or didn't notice.",
    whyIncorrect: {
      0: "The manager's presence in the corridor was directly observed.",
      1: "The absence of a greeting was an observable event.",
      3: "The proposal is an existing document."
    }
  },
  {
    id: 12,
    difficulty: "Easy to Moderate",
    category: "Logical Thinking Framework",
    question: "What is the final step in the 5-step logical thinking framework (Observe → Identify → Analyse → Solve → Verify), and why is it essential?",
    options: [
      "Solve; because once an idea is implemented, success is 100% guaranteed.",
      "Verify; because you must test whether the solution actually resolved the problem or if further adjustments are required.",
      "Assume; because you should assume your work is flawless without looking back.",
      "Observe; because you must start from scratch regardless of whether the problem was solved."
    ],
    correctAnswer: 1,
    explanation: "The 'Verify' step confirms whether the chosen solution achieved the desired measurable outcome in reality, ensuring you do not walk away from a lingering defect.",
    whyIncorrect: {
      0: "No solution is guaranteed to succeed without empirical testing.",
      2: "Assuming perfection without testing is anti-logical.",
      3: "If the problem is verified as resolved, you do not need to restart from scratch."
    }
  },

  // --- Questions 13 to 17: Moderate ---
  {
    id: 13,
    difficulty: "Moderate",
    category: "Logical Conclusions",
    question: "All software engineers at TechCorp know how to write Python code. Sanjay works as a software engineer at TechCorp. Which conclusion MUST logically follow based strictly on the provided premises?",
    options: [
      "Sanjay is the highest-performing software engineer at TechCorp.",
      "Sanjay knows how to write Python code.",
      "Sanjay also knows Java and C++.",
      "Sanjay has worked at TechCorp for more than five years."
    ],
    correctAnswer: 1,
    explanation: "This is a classic syllogism: Premise 1 (All engineers know Python) + Premise 2 (Sanjay is an engineer) leads inevitably to the conclusion that Sanjay knows Python.",
    whyIncorrect: {
      0: "Nothing in the premises mentions performance rankings.",
      2: "Knowledge of Java or C++ is not mentioned in the premises.",
      3: "Duration of employment is unstated."
    }
  },
  {
    id: 14,
    difficulty: "Moderate",
    category: "Cause & Effect Reasoning",
    question: "A company switched to a brand-new website layout on Monday. That same day, sales dropped by 30%. The CEO immediately orders the team to revert to the old layout, claiming the new design caused the drop. What critical factor did the CEO overlook?",
    options: [
      "The CEO failed to check whether the new font was blue or black.",
      "Monday was a national public holiday when retail transactions historically plunge by 40% every single year.",
      "Website designs should never be updated under any circumstances.",
      "Customers always love new designs on day one."
    ],
    correctAnswer: 1,
    explanation: "Failing to account for a recurring seasonal or holiday slump is a major analytical error. The drop may have been entirely due to the national holiday rather than the website redesign.",
    whyIncorrect: {
      0: "Font color is a minor detail compared to macro demand fluctuations.",
      2: "Websites must update periodically to stay competitive and secure.",
      3: "Customers frequently experience initial friction with new interfaces; however, the holiday is the dominant confounding variable."
    }
  },
  {
    id: 15,
    difficulty: "Moderate",
    category: "Logical Conclusions",
    question: "Premise 1: Only students with an attendance rate above 80% are eligible to sit for the semester final examination.\nPremise 2: Vikram's attendance rate is 74%.\nWhich conclusion is logically sound?",
    options: [
      "Vikram will definitely pass the final examination with honors.",
      "Vikram is not eligible to sit for the semester final examination under the current rule.",
      "Vikram is the most hardworking student in the institution.",
      "The attendance policy will be cancelled tomorrow."
    ],
    correctAnswer: 1,
    explanation: "Because attendance > 80% is a necessary condition for eligibility and Vikram's attendance is 74% (below 80%), Vikram fails the criteria and is not eligible.",
    whyIncorrect: {
      0: "He cannot take the exam, so he cannot pass it with honors under the rules.",
      2: "Hard work is not mentioned, and attendance data suggests the opposite.",
      3: "Speculating that the policy will be cancelled is an unfounded assumption."
    }
  },
  {
    id: 16,
    difficulty: "Moderate",
    category: "Problem Identification",
    question: "A customer calls internet support shouting: 'Your company provides terrible service! My internet disconnects every 20 minutes!' What is the actual technical problem that the technician must investigate?",
    options: [
      "The customer's emotional anger and high voice volume.",
      "The customer's personal opinion of the company's reputation.",
      "The periodic physical or network disconnection occurring at 20-minute intervals.",
      "The cost of the customer's monthly subscription plan."
    ],
    correctAnswer: 2,
    explanation: "The technician must separate the customer's emotional frustration (the symptom/reaction) from the objective technical defect: the network connection dropping intermittently every 20 minutes.",
    whyIncorrect: {
      0: "Anger is an emotional reaction to the problem, not the technical breakdown itself.",
      1: "Reputational perception is an opinion stemming from the service disruption.",
      3: "Subscription price was not identified as the cause of network drops."
    }
  },
  {
    id: 17,
    difficulty: "Moderate",
    category: "Facts, Opinions & Assumptions",
    question: "During an interview, a candidate is asked to evaluate this statement: 'Our team was delayed because the finance department took forever to approve the purchase order.' What makes this statement an unhelpful workplace explanation?",
    options: [
      "The phrase 'took forever' is an exaggerated opinion that conceals the exact timeline and prevents objective process improvement.",
      "Finance departments are always perfect and never make delays.",
      "Purchase orders do not require any approval in modern businesses.",
      "The candidate should have lied and said there were no delays."
    ],
    correctAnswer: 0,
    explanation: "'Took forever' is subjective and emotional. A logical explanation states verifiable facts: 'The approval took 14 business days against the standard 3-day SLA due to missing vendor tax IDs.'",
    whyIncorrect: {
      1: "Finance departments can experience bottlenecks, but the issue is the emotional, vague phrasing.",
      2: "Purchase orders routinely require formal authorization.",
      3: "Integrity and clarity are required in professional evaluations."
    }
  },

  // --- Questions 18 to 20: Applied Reasoning Scenarios ---
  {
    id: 18,
    difficulty: "Applied Reasoning",
    category: "Applied Decision Making",
    question: "Scenario: An e-commerce delivery rider has 30 parcels to deliver across two districts. District A has 20 parcels close together but high morning traffic. District B has 10 parcels spread far apart with light traffic throughout the day. Deliveries must be completed between 9:00 AM and 5:00 PM. Which logical delivery strategy minimizes transit delay?",
    options: [
      "Deliver District B first in the morning, then attempt District A during peak afternoon school rush.",
      "Deliver District A in the early morning while streets are clear, then proceed to the spread-out District B where traffic remains light all day.",
      "Pick parcels at random from the vehicle without looking at addresses or locations.",
      "Cancel all deliveries in District B because 10 parcels is too few to bother with."
    ],
    correctAnswer: 1,
    explanation: "Delivering the clustered 20 parcels in District A early avoids worsening traffic congestion and secures 66% of deliveries early. The remaining 10 parcels in District B are unaffected by traffic and can be completed steadily.",
    whyIncorrect: {
      0: "Hitting District A during peak traffic amplifies congestion delays for 20 deliveries.",
      2: "Random selection maximizes zig-zag transit time and guarantees missed deadlines.",
      3: "Cancelling valid customer orders breaches operational duties without logical justification."
    }
  },
  {
    id: 19,
    difficulty: "Applied Reasoning",
    category: "Applied Decision Making",
    question: "Scenario: You are a project manager. A client demands an additional feature 2 days before the scheduled product release. The engineering lead informs you that implementing this feature will require 3 full days of coding and 1 day of testing. Applying the 5-step framework, what is the most logical response to the client?",
    options: [
      "Promise the client the feature will be included in 2 days without telling the engineers, hoping for a miracle.",
      "Present the objective data: explain that adding the feature immediately will delay launch by 4 days, or offer to release the core product on schedule and ship the new feature in Version 1.1 next week.",
      "Insult the client for making a late request and refuse to ever speak to them again.",
      "Immediately cancel the entire product launch permanently."
    ],
    correctAnswer: 1,
    explanation: "Logical decision-making relies on realistic constraints (time, capacity) and provides actionable, transparent trade-offs rather than unfulfillable promises or emotional outbursts.",
    whyIncorrect: {
      0: "Making unfeasible promises guarantees missed deadlines and breaks trust.",
      2: "Insulting a client is unprofessional and destroys commercial relationships.",
      3: "Cancelling the launch is a catastrophic overreaction that ignores reasonable phased delivery."
    }
  },
  {
    id: 20,
    difficulty: "Applied Reasoning",
    category: "Applied Decision Making",
    question: "Scenario: A fresher joins a software team. On day 3, their code produces an error: 'Database connection timed out'. Which of the following sequences represents the correct application of the OBSERVE → IDENTIFY → ANALYSE → SOLVE → VERIFY framework?",
    options: [
      "Delete the database → Blame the cloud provider → Restart computer → Hope it works → Submit code.",
      "Observe: Record exact error log and port → Identify: Connection to database fails on port 5432 → Analyse: Check credentials, network VPN, and DB server status → Solve: Connect to company VPN required for internal DB access → Verify: Rerun query and confirm successful response.",
      "Assume the code is perfect → Complain to the team lead that the task is impossible → Close laptop.",
      "Change random lines in the code until the red error text disappears from the terminal."
    ],
    correctAnswer: 1,
    explanation: "This follows the framework precisely: capturing exact error data, defining the connection fault, examining root causes (VPN requirement), applying the remedy, and verifying query execution.",
    whyIncorrect: {
      0: "Deleting production databases and shifting blame without analysis is disastrous.",
      2: "Giving up without investigation displays zero analytical persistence.",
      3: "Random changes without understanding the underlying error introduce new bugs."
    }
  }
];
