/**
 * SPOKO Logical Reasoning & Analytical Thinking
 * Level 1: Beginner
 * Day 1: Introduction to Logical Thinking
 * 
 * Beginner-friendly written lessons, simple everyday examples, 
 * interactive classification, cause-and-effect checks, 
 * 5-step framework cases, and 20 practice questions.
 */

export const day1Overview = {
  courseName: "Logical Reasoning & Analytical Thinking",
  level: "Level 1 – Beginner",
  day: "Day 1",
  topic: "Introduction to Logical Thinking",
  targetAudience: "Students, college freshers, job seekers, and beginners",
  objectives: [
    "Understand what logical thinking means in simple words (no confusing jargon).",
    "Easily tell the difference between a Fact, an Opinion, and an Assumption.",
    "Find the real problem first before trying to fix it.",
    "Understand Cause and Effect: why two things happening together does not mean one caused the other.",
    "Learn the simple 5-step framework: Observe → Identify → Analyse → Solve → Verify.",
    "Practice with 20 beginner-friendly questions with clear, simple explanations."
  ]
};

// ==========================================
// SECTION 1: WHAT IS LOGICAL THINKING?
// ==========================================
export const section1Content = {
  title: "What Is Logical Thinking?",
  definition: {
    core: "Logical thinking simply means thinking step-by-step using real facts, instead of making wild guesses or acting on pure emotions.",
    breakdown: [
      {
        term: "Step-by-Step",
        desc: "You don't jump to conclusions. You take small, steady steps from one clue to the next."
      },
      {
        term: "Based on Real Facts",
        desc: "You look at what is actually true and verified, not what you merely hope or wish."
      },
      {
        term: "Calm and Clear",
        desc: "You keep anger, fear, and panic aside so you can see the truth clearly."
      }
    ]
  },
  importance: [
    {
      domain: "Daily Life",
      icon: "Home",
      summary: "Helps you spend money carefully, plan your day, and avoid falling for online scams or fake rumors."
    },
    {
      domain: "College & Studies",
      icon: "GraduationCap",
      summary: "Helps you truly understand your subjects and write smart exam answers, instead of just memorizing like a robot."
    },
    {
      domain: "Job Interviews",
      icon: "Briefcase",
      summary: "Interviewers love candidates who can explain their answers step-by-step with calm confidence."
    },
    {
      domain: "Workplace & Career",
      icon: "TrendingUp",
      summary: "When a mistake happens at work, logic helps you find the real cause and fix it permanently."
    }
  ],
  guessingVsReasoning: {
    comparison: [
      {
        feature: "Starting Point",
        guessing: "A random hunch, gut feeling, or coin toss.",
        reasoning: "Real facts, numbers, or observable clues."
      },
      {
        feature: "The Process",
        guessing: "Jumping straight to an answer without checking anything.",
        reasoning: "Connecting the clues step-by-step to reach an answer."
      },
      {
        feature: "Can it be repeated?",
        guessing: "No. It is pure luck. It might work once and fail five times.",
        reasoning: "Yes! Because real facts don't change, anyone following the same clues gets the same result."
      },
      {
        feature: "When someone asks 'Why?'",
        guessing: "You say: 'I just felt like it' or 'I don't know.'",
        reasoning: "You can explain clearly: 'Because A happened, it led to B.'"
      }
    ]
  },
  decisionMakingImpact: [
    "Saves you money and time by testing simple facts before making big purchases.",
    "Stops panic and stress by breaking big scary problems into small, easy steps.",
    "Helps you explain your ideas clearly so family, teachers, and bosses respect your thoughts.",
    "Protects you from fake news, clickbait, and misleading discount advertisements."
  ],
  everydayExamples: [
    {
      title: "1. Phone Battery Draining Fast",
      nonLogical: "Panicking, assuming the phone is permanently broken, and borrowing money to buy a new phone immediately.",
      logical: "Opening Settings → Battery, seeing that a social media app was running in the background for 9 hours, turning off background refresh, and checking if the battery lasts all day."
    },
    {
      title: "2. 'Buy 2 Get 1 Free' Sale",
      nonLogical: "Buying three shirts immediately just because the red sale banner screams 'Huge Offer - Today Only!'.",
      logical: "Checking the original price, realizing each shirt was marked up by 40% before the discount, and asking yourself: 'Do I actually need three shirts right now?'"
    },
    {
      title: "3. Choosing Your Daily Route",
      nonLogical: "Taking the main highway every day because cars can drive faster, even though you get stuck in a 30-minute traffic jam every morning.",
      logical: "Checking a maps app for 3 days, trying the metro train, and discovering the train reaches your destination 15 minutes faster with zero traffic stress."
    }
  ],
  workedExample: {
    scenario: "You leave home at 8:30 AM and reach your office late three days in a row.",
    steps: [
      {
        stepNumber: 1,
        question: "What is the actual problem?",
        analysis: "The real problem is: You are arriving at work after your official start time. (Note: The problem is NOT 'traffic is unfair' or 'my alarm is bad'. Those might be reasons, but the actual problem is your late arrival)."
      },
      {
        stepNumber: 2,
        question: "What information should you collect?",
        analysis: "Write down simple facts: What exact minute did you leave home? How long did you wait for the bus? Which road had traffic? What time did you step into the office on all three days?"
      },
      {
        stepNumber: 3,
        question: "What could be causing the delay?",
        analysis: "Possible reasons: (a) A nearby school starts at 8:35 AM and blocks the junction, (b) Road construction reduced lanes on the main bridge, or (c) The 8:30 AM bus timing shifted."
      },
      {
        stepNumber: 4,
        question: "What solution can you test?",
        analysis: "Test a simple fix: Leave home at 8:15 AM (15 minutes earlier) for the next 3 days. Record your arrival time. If you reach work on time every day, your problem is solved!"
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
      definition: "A statement that can be proven true or false using clear, objective proof (like a photo, document, measurement, or official record).",
      keyTest: "Can we check this with proof, a clock, a ruler, or a document?",
      example: "Water freezes into ice at 0 degrees Celsius."
    },
    {
      type: "Opinion",
      badgeColor: "amber",
      definition: "What someone personally feels, likes, or believes. It cannot be proven true or false for everyone because people have different tastes.",
      keyTest: "Does this depend on personal taste or feelings? Could someone else disagree?",
      example: "Mango ice cream is the most delicious dessert in the world."
    },
    {
      type: "Assumption",
      badgeColor: "indigo",
      definition: "Something you accept as true without checking the facts first. It is an unverified guess treated like a fact.",
      keyTest: "Are you treating this as true without actually seeing proof or asking?",
      example: "He did not reply to my text in 10 minutes, so he must be angry with me."
    }
  ],
  classificationItems: [
    {
      id: "foa_1",
      statement: "The college library opens at 8:00 AM every morning.",
      correctType: "Fact",
      explanation: "You can easily check this by looking at the college notice board, library door sign, or official website.",
      whyNotOther: "It is not an opinion because it is a fixed schedule, and not an assumption because it is an official rule."
    },
    {
      id: "foa_2",
      statement: "Working from home is much more fun and relaxing than working in an office.",
      correctType: "Opinion",
      explanation: "Words like 'fun' and 'relaxing' describe personal feelings. Some people love working from home; others get lonely and prefer an office.",
      whyNotOther: "Feelings and personal work styles cannot be proven as a universal scientific fact for everyone."
    },
    {
      id: "foa_3",
      statement: "Rohan did not reply to my email within two hours, so he must be ignoring me on purpose.",
      correctType: "Assumption",
      explanation: "You are assuming he is ignoring you without checking. In reality, he might be in a meeting, his internet might be down, or he had an emergency.",
      whyNotOther: "The fact is that he hasn't replied yet. But guessing *why* he hasn't replied without proof is an assumption."
    },
    {
      id: "foa_4",
      statement: "The temperature in Chennai was 38 degrees Celsius yesterday afternoon.",
      correctType: "Fact",
      explanation: "This is a real number recorded by official thermometers and weather stations.",
      whyNotOther: "Thermometer readings are measurable scientific data, not someone's personal taste."
    },
    {
      id: "foa_5",
      statement: "Python is the best programming language for every single person.",
      correctType: "Opinion",
      explanation: "The word 'best' is a personal judgment. For mobile apps, Kotlin or Swift might be better; for chip design, C or C++ is better.",
      whyNotOther: "While Python is very popular (which is a fact), claiming it is 'the best for everyone' is a personal viewpoint."
    },
    {
      id: "foa_6",
      statement: "Because Priya got the highest marks in college, she will automatically be the top performer at her new job.",
      correctType: "Assumption",
      explanation: "This assumes good exam scores guarantee great job performance. A job also needs teamwork, handling pressure, and communication skills.",
      whyNotOther: "Her college marks are a fact, but predicting her future work success without seeing her on the job is an assumption."
    },
    {
      id: "foa_7",
      statement: "A triangle always has three sides.",
      correctType: "Fact",
      explanation: "By mathematical definition, any shape called a triangle has exactly three sides.",
      whyNotOther: "This is a basic rule of geometry that never changes."
    },
    {
      id: "foa_8",
      statement: "Watching movies in a cinema theater is much better than watching them on a laptop.",
      correctType: "Opinion",
      explanation: "What is 'better' depends on what you enjoy. Some people love the big screen; others prefer the comfort and pause button of their laptop.",
      whyNotOther: "Personal entertainment preferences vary from person to person."
    },
    {
      id: "foa_9",
      statement: "Sales dropped in our shop this month, so our sales staff must have worked lazily.",
      correctType: "Assumption",
      explanation: "Blaming the staff assumes nothing else happened. In reality, heavy rains, road construction, or festival holidays might have kept customers at home.",
      whyNotOther: "Sales dropping is a fact. But blaming laziness without checking other reasons is a pure assumption."
    },
    {
      id: "foa_10",
      statement: "The human body normally has two lungs and one heart.",
      correctType: "Fact",
      explanation: "This is basic human biology that any doctor or medical scan can confirm.",
      whyNotOther: "It is an objective medical fact, not someone's opinion."
    },
    {
      id: "foa_11",
      statement: "Because the morning is bright and sunny, it will definitely not rain this evening.",
      correctType: "Assumption",
      explanation: "Weather can change in a few hours. Assuming the evening will stay sunny just because the morning was clear is guessing without looking at a weather radar.",
      whyNotOther: "The morning sunshine is a fact. But guessing the evening weather without checking data is an assumption."
    },
    {
      id: "foa_12",
      statement: "Dark blue is a much more professional color for an interview shirt than light blue.",
      correctType: "Opinion",
      explanation: "Both colors are widely accepted as professional. Choosing dark blue over light blue is just personal fashion preference.",
      whyNotOther: "Color preference is subjective and not a strict rule."
    }
  ]
};

// ==========================================
// SECTION 3: UNDERSTANDING PROBLEMS
// ==========================================
export const section3Content = {
  title: "Understanding Problems",
  intro: "Most people fail to solve problems because they rush to fix the visible symptom without understanding the real root cause. Learn this simple 6-step method to solve any problem calmly.",
  frameworkSteps: [
    {
      step: 1,
      name: "Find the Real Problem",
      detail: "Don't just look at the surface symptom. Find out what is actually broken or going wrong."
    },
    {
      step: 2,
      name: "Separate Facts from Guesses",
      detail: "What do you know for sure? What information are you still missing or guessing?"
    },
    {
      step: 3,
      name: "List Possible Causes",
      detail: "Think of 2 or 3 sensible reasons why this happened, without blaming anyone right away."
    },
    {
      step: 4,
      name: "Think of a Few Different Solutions",
      detail: "Don't just grab the first random idea. Come up with at least 2 different ways to fix it."
    },
    {
      step: 5,
      name: "Compare the Options",
      detail: "Which option is easiest, safest, lowest cost, and most likely to work?"
    },
    {
      step: 6,
      name: "Test Your Fix and Check Results",
      detail: "Try the best fix and observe: Did the problem actually go away?"
    }
  ],
  workedScenarios: [
    {
      id: "scenario_1",
      title: "Scenario 1: A Student Scores Low Marks in Exams",
      symptom: "A college student gets 42 out of 100 in two exams in a row.",
      analysis: {
        step1: "Real Problem: The student is not understanding key exam questions or is running out of time during tests.",
        step2: "Known vs Missing: Known: The low exam scores and failed topics. Missing: How does the student study? Do they practice writing answers or just read textbook pages passively?",
        step3: "Possible Causes: (a) Only reading notes without practicing questions, (b) Struggling with basic concepts from earlier classes, or (c) Panic and poor time management in the exam hall.",
        step4: "Alternative Solutions: Option A: Read the textbook 3 times. Option B: Solve 2 old exam question papers under a timer every weekend and ask the teacher for help on weak topics. Option C: Study in a group with friends.",
        step5: "Comparison: Option A is passive reading that doesn't build exam speed. Option C can lead to chatting. Option B directly builds practice, speed, and real understanding.",
        step6: "Evaluation: Try Option B for 3 weeks. Take a practice mock test to see if marks improve above 70."
      }
    },
    {
      id: "scenario_2",
      title: "Scenario 2: An Employee Frequently Misses Deadlines",
      symptom: "A new office employee submits 4 out of 5 weekly reports 1 or 2 days late.",
      analysis: {
        step1: "Real Problem: Reports are finished after the agreed deadline, which delays the whole team's work.",
        step2: "Known vs Missing: Known: Submission times. Missing: When did the employee start? Did another department delay sending the necessary data? Was the task instructions clear?",
        step3: "Possible Causes: (a) Waiting on data from another team, (b) Unclear instructions causing confusion, or (c) Starting work too late in the week.",
        step4: "Alternative Solutions: Option A: Work late into the night every day. Option B: Have a quick 5-minute morning check-in on Monday to clarify requirements and track dependencies early. Option C: Ask for official deadline extensions.",
        step5: "Comparison: Option A leads to tiredness and more mistakes. Option C doesn't fix the delay. Option B clarifies requirements immediately and stops bottlenecks before they happen.",
        step6: "Evaluation: Use Option B for the next 4 weeks. Check if all weekly reports are submitted on time."
      }
    },
    {
      id: "scenario_3",
      title: "Scenario 3: A Local Business Gets Fewer Customer Inquiries",
      symptom: "A computer training institute notices phone calls and website inquiries dropped by half this month.",
      analysis: {
        step1: "Real Problem: Fewer people are reaching out to ask about courses compared to last month.",
        step2: "Known vs Missing: Known: Number of inquiries dropped. Missing: Did website visitors drop, or are visitors arriving but not clicking the 'Contact Us' button? Is the phone number working?",
        step3: "Possible Causes: (a) The contact form on the website has a technical bug, (b) Course fees were raised, or (c) Marketing advertisements were paused.",
        step4: "Alternative Solutions: Option A: Spend money on expensive new ads right away. Option B: Test the website contact form and phone number on mobile and laptop right now. Option C: Cut course fees in half.",
        step5: "Comparison: Option A wastes money if the contact form is broken! Option C loses money for no reason. Option B checks the facts for free in 5 minutes.",
        step6: "Evaluation: Test the form. Discover the 'Submit' button was not working on mobile phones. Fix the button immediately; verify inquiries return to normal within 48 hours."
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
    cause: "A Cause is the action or event that makes something happen (The 'Why').",
    effect: "An Effect is the result or change that happens because of the cause (The 'What happened').",
    temporalRule: "A cause must always happen BEFORE or at the exact same time as the effect. An event on Friday cannot cause something that happened on Wednesday!",
    correlationWarning: "CRITICAL RULE: Just because two things happen at the same time does NOT mean one caused the other! A hidden third factor or simple coincidence might be the real reason."
  },
  everydayExamples: [
    {
      title: "1. Rain and Wet Ground",
      cause: "Heavy rain falls from clouds.",
      effect: "The outdoor roads and ground get wet.",
      explanation: "Raindrops directly wet the ground. (Note: A wet road does not cause rain to fall from the sky!)."
    },
    {
      title: "2. Ice Cream Sales and Swimming Accidents (The Third Factor)",
      cause: "Hot Summer Weather (The Hidden Factor).",
      effect: "More people buy cold ice cream AND more people go swimming in lakes.",
      explanation: "Eating ice cream does NOT cause swimming accidents! The hot summer weather is the real cause that makes people do both things at the same time."
    },
    {
      title: "3. Leaving Milk Out in the Sun",
      cause: "Milk bottle is left on the kitchen counter in hot weather for 2 days.",
      effect: "The milk turns sour and curdles.",
      explanation: "Warm temperature allows bacteria to multiply quickly, which spoils the milk."
    },
    {
      title: "4. Heavy Mobile Gaming and Battery Drain",
      cause: "Playing a heavy 3D action game with maximum brightness and 10 apps open.",
      effect: "The phone gets hot and the battery drains from 100% to 20% in two hours.",
      explanation: "Running heavy graphics forces the phone processor and screen to draw maximum power, generating heat."
    },
    {
      title: "5. Carrying an Umbrella Does NOT Make It Rain",
      cause: "Cloud moisture and air pressure change.",
      effect: "Rain falls.",
      explanation: "Carrying a black umbrella in your bag has zero effect on the sky! Thinking 'it rained because I took an umbrella' is just a superstition."
    }
  ],
  interactiveQuestions: [
    {
      id: "ce_1",
      scenario: "A tea shop manager notices that on days when they play soft classical music, daily sales are 15% higher. The manager claims: 'Soft music forces people to buy more snacks.'",
      question: "What is the most sensible, logical evaluation of this claim?",
      options: [
        "The manager is 100% right because sales numbers increased.",
        "The manager jumped to conclusions without checking other facts, such as whether soft music was played on weekends when crowds are naturally bigger.",
        "Classical music has magic powers that open customers' wallets.",
        "Playing rock music would have doubled sales."
      ],
      correctIndex: 1,
      explanation: "Just because music and sales happened together doesn't prove the music forced people to buy. The shop might have played that music on Saturdays and Sundays when more families visit."
    },
    {
      id: "ce_2",
      scenario: "A city report shows that neighborhoods with more fire stations also report more fire accidents each year.",
      question: "What is the most logical explanation for this connection?",
      options: [
        "Fire stations secretly start fires to keep their jobs.",
        "Bigger, crowded areas with thousands of buildings naturally have more fires, so the government builds more fire stations there to keep people safe.",
        "The red paint on fire trucks causes houses to catch fire.",
        "Firefighters make citizens careless."
      ],
      correctIndex: 1,
      explanation: "Population size is the real reason: big crowded neighborhoods have more people, which means more houses, more accidental fires, and therefore more fire stations are needed."
    },
    {
      id: "ce_3",
      scenario: "Every morning at 5:30 AM, the village rooster crows loudly. At 5:45 AM, the sun rises.",
      question: "Does the rooster's crow cause the sun to rise?",
      options: [
        "Yes, because the rooster crows before the sun rises every single day.",
        "Yes, without the rooster the world would stay dark.",
        "No. Just because one event happens right before another does not mean it caused it. The Earth's rotation causes the sunrise.",
        "Yes, but only in farming villages."
      ],
      correctIndex: 2,
      explanation: "Just because Event A happens before Event B does not mean A caused B! The Earth spins on its axis regardless of whether any rooster crows."
    },
    {
      id: "ce_4",
      scenario: "A student restarts their computer and changes their Wi-Fi password. Now the internet works fast.",
      question: "How can the student logically find out which action actually fixed the slow internet?",
      options: [
        "Restart the computer five more times just to be sure.",
        "Test one thing at a time: change the password back to test it, or check the router logs to see what was actually stuck.",
        "Assume both things must always be done together forever.",
        "Buy a brand-new computer."
      ],
      correctIndex: 1,
      explanation: "To find the real cause, you have to test one thing at a time (isolate variables) instead of changing multiple things at once and guessing."
    },
    {
      id: "ce_5",
      scenario: "During winter, warm sweater sales increase and flu sickness also increases. Someone claims: 'Wearing warm sweaters makes people sick with the flu.'",
      question: "Why is this claim logically wrong?",
      options: [
        "Sweaters are too warm to make anyone sick.",
        "Cold winter weather makes people stay indoors close together where flu viruses spread easily, and cold weather also makes people wear sweaters. The sweater did not cause the virus.",
        "Flu only infects people who don't own sweaters.",
        "Flu only happens in the summer."
      ],
      correctIndex: 1,
      explanation: "Cold weather causes people to wear sweaters, and cold weather keeps people indoors where airborne viruses spread easily. The sweater is completely harmless."
    }
  ]
};

// ==========================================
// SECTION 5: A SIMPLE LOGICAL THINKING FRAMEWORK
// ==========================================
export const section5Content = {
  title: "A Simple 5-Step Logical Thinking Framework",
  subtitle: "OBSERVE → IDENTIFY → ANALYSE → SOLVE → VERIFY",
  steps: [
    {
      step: 1,
      code: "OBSERVE",
      title: "Step 1: Observe",
      summary: "Gather real clues and facts calmly without panicking or guessing.",
      guidelines: [
        "Look at what actually happened (dates, times, error messages, numbers).",
        "Don't let anger or panic twist the facts.",
        "Write down only what you can prove, not rumors."
      ]
    },
    {
      step: 2,
      code: "IDENTIFY",
      title: "Step 2: Identify",
      summary: "State the exact problem in one clear, simple sentence.",
      guidelines: [
        "Focus on what is actually broken or delayed.",
        "Don't confuse the symptom with the real problem.",
        "Keep it simple: 'The bike tire has zero air pressure.'"
      ]
    },
    {
      step: 3,
      code: "ANALYSE",
      title: "Step 3: Analyse",
      summary: "Look closely at the clues and ask 'Why did this happen?'",
      guidelines: [
        "Break the situation into smaller, easy pieces.",
        "Check what you know for sure versus what you are guessing.",
        "Find the real cause behind the breakdown."
      ]
    },
    {
      step: 4,
      code: "SOLVE",
      title: "Step 4: Solve",
      summary: "Pick the most practical, sensible fix.",
      guidelines: [
        "Think of 2 or 3 possible ways to fix it.",
        "Pick the fix that is fastest, safest, and most effective.",
        "Take action step-by-step."
      ]
    },
    {
      step: 5,
      code: "VERIFY",
      title: "Step 5: Verify",
      summary: "Check: Did your fix actually solve the problem?",
      guidelines: [
        "Observe the result for a few days.",
        "Check: Is the error gone? Are we on time?",
        "If the problem comes back, go back to Step 1 and look for missing clues."
      ]
    }
  ],
  workedCases: [
    {
      id: "case_student",
      domain: "Student Life",
      scenario: "Teammate Stops Replying 3 Days Before Project Deadline",
      context: "A 4-student college team has a project due in 3 days. One teammate, Rahul, has not answered WhatsApp messages for 24 hours, and his part of the presentation is blank.",
      application: [
        {
          stage: "OBSERVE",
          details: "Facts: Project is due in 72 hours. Rahul hasn't replied to texts for 24 hours. His 5 slides are blank. The other 3 members have finished their parts."
        },
        {
          stage: "IDENTIFY",
          details: "Problem: Five critical presentation slides are missing, and waiting passively risks failing the project."
        },
        {
          stage: "ANALYSE",
          details: "Facts vs Missing: Is Rahul sick or did he lose his phone? We don't know yet. But if we wait another 2 days, it will be too late for anyone to finish."
        },
        {
          stage: "SOLVE",
          details: "Plan: 1. Try calling Rahul directly. 2. If no reply by afternoon, divide Rahul's 5 slides among the 3 active members (only 1 or 2 slides each). 3. Send a polite email to the teacher informing them of the split."
        },
        {
          stage: "VERIFY",
          details: "Check tonight at 9:00 PM: Did everyone finish their extra slide? Yes! The complete presentation is ready 24 hours before the deadline."
        }
      ]
    },
    {
      id: "case_workplace",
      domain: "Workplace & Office",
      scenario: "Parcel Delivery Delay Spikes from 1 Day to 3 Days",
      context: "An online shopping business promises delivery within 24 hours. This week, deliveries are taking 3 days, and customers are calling angry.",
      application: [
        {
          stage: "OBSERVE",
          details: "Facts: Deliveries took 72 hours this week instead of 24 hours. 50 customer complaints received. A new barcode scanner app was installed in the packing room on Monday."
        },
        {
          stage: "IDENTIFY",
          details: "Problem: Packing room staff are taking too long to scan each box, creating a huge delay in shipping."
        },
        {
          stage: "ANALYSE",
          details: "Investigation: Staff show that the new scanner app freezes for 10 seconds on every barcode because the warehouse Wi-Fi is weak in the corner."
        },
        {
          stage: "SOLVE",
          details: "Fix: 1. Move the Wi-Fi router closer to the packing table and switch the app to offline-mode scanning. 2. Staff can now scan boxes in 1 second."
        },
        {
          stage: "VERIFY",
          details: "Check tomorrow's dispatch time: All 120 orders shipped within 24 hours. Delivery speed is back to normal!"
        }
      ]
    }
  ]
};

// ==========================================
// STEP 4: INTERACTIVE PRACTICE QUESTIONS (EXACTLY 20 UNIQUE QUESTIONS)
// ==========================================
// All questions rewritten in simple, crystal-clear, beginner-friendly English!
export const day1PracticeQuestions = [
  // --- Questions 1 to 5: Easy ---
  {
    id: 1,
    difficulty: "Easy",
    category: "Definitions & Basics",
    question: "What is the simplest definition of logical thinking?",
    options: [
      "Guessing what will happen based on lucky gut feelings.",
      "Thinking step-by-step using real facts to reach a sensible answer.",
      "Agreeing with whatever other people say without asking questions.",
      "Closing your eyes and picking the first option that comes to mind."
    ],
    correctAnswer: 1,
    explanation: "Logical thinking means using real facts and connecting clues step-by-step, rather than guessing randomly or relying on moods.",
    whyIncorrect: {
      0: "Gut feelings and luck are guesses, not logical thinking.",
      2: "Blindly agreeing with others without checking facts is not using your own logic.",
      3: "Picking random options is trial-and-error by chance."
    }
  },
  {
    id: 2,
    difficulty: "Easy",
    category: "Facts, Opinions & Assumptions",
    question: "Which of the following is a FACT that can be proven with real proof?",
    options: [
      "The college library has 50 computers and 10 study tables.",
      "The college library is the most peaceful place on earth.",
      "Anyone who studies in this library will get first rank.",
      "The library chairs are uncomfortable."
    ],
    correctAnswer: 0,
    explanation: "You can walk into the library and count the 50 computers and 10 study tables. It is an objective fact.",
    whyIncorrect: {
      1: "'Most peaceful' is a personal opinion; someone else might find it too quiet or chilly.",
      2: "Promising first rank just by sitting in a library is an unproven assumption.",
      3: "Whether chairs feel uncomfortable depends on each person's preference."
    }
  },
  {
    id: 3,
    difficulty: "Easy",
    category: "Facts, Opinions & Assumptions",
    question: "Read this sentence: 'Tea tastes much better than coffee.' What kind of statement is this?",
    options: [
      "A Fact, because millions of people drink tea every day.",
      "An Opinion, because taste is a personal preference that differs for everyone.",
      "An Assumption, because scientists will prove it in a laboratory.",
      "A mathematical law."
    ],
    correctAnswer: 1,
    explanation: "Taste is personal! You cannot prove that tea tastes better than coffee for everyone in the world.",
    whyIncorrect: {
      0: "Many people drinking tea does not make a personal taste a universal fact.",
      2: "Scientists cannot measure 'tastiness' because taste is in the mind of each person.",
      3: "This is a statement about drinks, not mathematics."
    }
  },
  {
    id: 4,
    difficulty: "Easy",
    category: "Facts, Opinions & Assumptions",
    question: "What is an ASSUMPTION in simple words?",
    options: [
      "A statement checked and proven true by a doctor or scientist.",
      "A math formula that gives the exact same result every time.",
      "Something you believe is true without checking the facts first.",
      "A rule written in the country's law book."
    ],
    correctAnswer: 2,
    explanation: "An assumption is a guess you accept as true without checking evidence or asking for proof first.",
    whyIncorrect: {
      0: "Something checked and proven true is a fact.",
      1: "A proven formula is a mathematical fact.",
      3: "A written law is a legal fact."
    }
  },
  {
    id: 5,
    difficulty: "Easy",
    category: "Problem Solving Basics",
    question: "When you face a problem, what is the VERY FIRST thing you should do?",
    options: [
      "Immediately try the first quick solution you can think of.",
      "Find someone to blame so you don't look bad.",
      "Clearly understand what the actual problem is.",
      "Ignore it and hope it disappears on its own."
    ],
    correctAnswer: 2,
    explanation: "Before you can fix anything, you must clearly understand what is actually broken! Rushing into fixes without understanding wastes time.",
    whyIncorrect: {
      0: "Trying fixes without understanding usually fixes the wrong thing.",
      1: "Blaming people creates arguments and does not solve the problem.",
      3: "Ignoring problems usually makes them grow bigger."
    }
  },

  // --- Questions 6 to 12: Easy to Moderate ---
  {
    id: 6,
    difficulty: "Easy to Moderate",
    category: "Cause & Effect Reasoning",
    question: "A plant kept inside a dark box without any sunlight for three weeks turns pale yellow and wilts. What is the most logical cause?",
    options: [
      "The plant was sad because nobody talked to it.",
      "Plants need sunlight to make food and stay green; without light, it cannot survive.",
      "The box had bad luck.",
      "The plant wanted to change its color for fashion."
    ],
    correctAnswer: 1,
    explanation: "Plants need sunlight to produce food (photosynthesis). Without sunlight, the green color fades and the plant starves.",
    whyIncorrect: {
      0: "Plants do not have human emotions.",
      2: "Luck has nothing to do with plant biology.",
      3: "Plants do not follow human fashion trends."
    }
  },
  {
    id: 7,
    difficulty: "Easy to Moderate",
    category: "5-Step Framework",
    question: "In the 5-step framework (Observe → Identify → Analyse → Solve → Verify), what do you do in the 'Analyse' step?",
    options: [
      "Celebrate that you finished your work.",
      "Look at the clues and ask 'Why did this happen?' to find the real cause.",
      "Run away from the problem.",
      "Guess an answer without looking at any clues."
    ],
    correctAnswer: 1,
    explanation: "Analyse means looking closely at the clues and connecting cause and effect to find out why the problem happened.",
    whyIncorrect: {
      0: "You haven't solved the problem yet, so you cannot celebrate.",
      2: "Running away does not solve anything.",
      3: "Guessing is the opposite of analysis."
    }
  },
  {
    id: 8,
    difficulty: "Easy to Moderate",
    category: "Facts, Opinions & Assumptions",
    question: "Read this statement: 'Priya arrived at the office at 9:45 AM today.' What is this statement?",
    options: [
      "An Opinion, because her boss might feel 9:45 AM is late.",
      "A Fact, because the exact arrival time can be checked on the office attendance machine or clock.",
      "An Assumption, because nobody can ever know what time it is.",
      "A fairy tale."
    ],
    correctAnswer: 1,
    explanation: "Her arrival time is an objective fact that is stamped on the attendance register or punch card.",
    whyIncorrect: {
      0: "Whether 9:45 AM is late or not is an opinion, but the statement itself only states the arrival time.",
      2: "Attendance systems record real timestamps.",
      3: "This is a real everyday event."
    }
  },
  {
    id: 9,
    difficulty: "Easy to Moderate",
    category: "Problem Solving Basics",
    question: "A student complains: 'I failed the test because the exam paper was too long!' What piece of information would logically test if this excuse is true?",
    options: [
      "The color of pen the student used during the test.",
      "Whether most other prepared students in the class were able to finish the paper on time.",
      "What the student ate for breakfast that morning.",
      "The brand of bag the student carried to school."
    ],
    correctAnswer: 1,
    explanation: "If 80% of students easily finished on time, the paper was not too long—the student just had poor preparation or slow speed.",
    whyIncorrect: {
      0: "Pen color does not change exam completion time.",
      2: "Breakfast does not prove whether the exam paper was too long.",
      3: "Bag brand has zero connection to exam questions."
    }
  },
  {
    id: 10,
    difficulty: "Easy to Moderate",
    category: "Cause & Effect Reasoning",
    question: "Why does two events happening at the same time NOT prove that one caused the other?",
    options: [
      "Because nothing in the world ever causes anything.",
      "Because a third hidden reason (like hot summer weather) or simple coincidence might be causing both.",
      "Because cause and effect only applies to math equations.",
      "Because computers make mistakes."
    ],
    correctAnswer: 1,
    explanation: "Two things can happen together by coincidence or because of a shared third cause (like summer heat making people buy ice cream and go swimming).",
    whyIncorrect: {
      0: "Causes and effects happen all around us every day.",
      2: "Cause and effect applies to everyday life, health, business, and school.",
      3: "Human reasoning checks for coincidence, not just computers."
    }
  },
  {
    id: 11,
    difficulty: "Easy to Moderate",
    category: "Facts, Opinions & Assumptions",
    question: "Identify the ASSUMPTION in this story: 'My teacher didn't smile at me in the hallway today, so she must be angry with my homework.'",
    options: [
      "The teacher walking in the hallway.",
      "The teacher not smiling.",
      "Believing that the lack of a smile means she is angry with your homework.",
      "The homework existing."
    ],
    correctAnswer: 2,
    explanation: "Assuming she is angry with your homework is a total guess! Maybe she had a headache, was in a hurry, or was thinking about her own family.",
    whyIncorrect: {
      0: "Her walking in the hallway was directly seen.",
      1: "Her not smiling was directly observed.",
      3: "The homework is a real paper."
    }
  },
  {
    id: 12,
    difficulty: "Easy to Moderate",
    category: "5-Step Framework",
    question: "What is the final step in the 5-step framework (Observe → Identify → Analyse → Solve → Verify), and why is it important?",
    options: [
      "Solve; because once you pick an idea, you are 100% done.",
      "Verify; because you must test and check if your solution actually worked.",
      "Guess; because you should guess what happens next.",
      "Forget; because you should never look back at past work."
    ],
    correctAnswer: 1,
    explanation: "Verify means testing: Did our fix actually solve the problem, or is the problem still happening? If it didn't work, we must try a better fix.",
    whyIncorrect: {
      0: "Just picking an idea doesn't mean it worked in real life.",
      2: "Guessing is not a step in logical thinking.",
      3: "Checking results is how good professionals learn and improve."
    }
  },

  // --- Questions 13 to 17: Moderate ---
  {
    id: 13,
    difficulty: "Moderate",
    category: "Logical Deductions",
    question: "Rule 1: Every member of the college football team wears blue jerseys on match days.\nRule 2: Arun is a member of the college football team.\nToday is a match day. What conclusion MUST be true?",
    options: [
      "Arun is the best football player on the team.",
      "Arun is wearing a blue jersey today.",
      "Arun also plays cricket and basketball.",
      "Arun has been on the team for three years."
    ],
    correctAnswer: 1,
    explanation: "Because all team members wear blue jerseys on match days, and Arun is on the team, Arun must be wearing a blue jersey today.",
    whyIncorrect: {
      0: "The rules say nothing about who the best player is.",
      2: "Cricket and basketball are not mentioned at all.",
      3: "How many years he has played is not mentioned."
    }
  },
  {
    id: 14,
    difficulty: "Moderate",
    category: "Cause & Effect Reasoning",
    question: "A store manager changed the shop signboard on Monday. That same day, sales dropped by 30%. The manager immediately took down the new signboard, claiming: 'The new board ruined our sales!' What did the manager forget to check?",
    options: [
      "Whether the signboard had yellow or red letters.",
      "Monday was a major national holiday when all shops in the city had 40% lower sales every year.",
      "Signboards should never be cleaned.",
      "Customers never read signboards."
    ],
    correctAnswer: 1,
    explanation: "The drop in sales was caused by the national holiday, not the new signboard! Forgetting to check the holiday was a big mistake.",
    whyIncorrect: {
      0: "Letter colors are minor compared to a city-wide holiday.",
      2: "Shops update signboards all the time.",
      3: "Customers do look at boards, but a holiday explains the missing crowd."
    }
  },
  {
    id: 15,
    difficulty: "Moderate",
    category: "Logical Deductions",
    question: "Rule: Only students with an attendance of 75% or higher are allowed to write the final exam.\nFact: Karthik's attendance is 71%.\nWhat is the only logical conclusion?",
    options: [
      "Karthik will score 90% in the exam.",
      "Karthik is not eligible to write the final exam under the current rule.",
      "Karthik is the most hardworking student in the class.",
      "The college will cancel all exams tomorrow."
    ],
    correctAnswer: 1,
    explanation: "Since 75% is required and Karthik has 71%, he does not meet the requirement and cannot write the exam under the rule.",
    whyIncorrect: {
      0: "He cannot write the exam, so he cannot score marks.",
      2: "Attendance numbers say nothing about hard work.",
      3: "Assuming exams will be cancelled is an unfounded guess."
    }
  },
  {
    id: 16,
    difficulty: "Moderate",
    category: "Problem Solving Basics",
    question: "A customer calls a phone company shouting angrily: 'Your company is terrible! My Wi-Fi disconnects every 20 minutes!' What is the real technical problem the technician needs to fix?",
    options: [
      "The customer's loud shouting voice.",
      "The customer's personal dislike of the company.",
      "The Wi-Fi signal dropping every 20 minutes.",
      "The customer's monthly payment bill."
    ],
    correctAnswer: 2,
    explanation: "A good technician separates the customer's angry feelings from the real technical problem: the Wi-Fi connection dropping every 20 minutes.",
    whyIncorrect: {
      0: "Shouting is just an emotional reaction, not the network fault.",
      1: "The company reputation is not the technical defect.",
      3: "Payment bills do not cause 20-minute router disconnections."
    }
  },
  {
    id: 17,
    difficulty: "Moderate",
    category: "Facts, Opinions & Assumptions",
    question: "In an office meeting, someone says: 'The finance team took forever to approve our request.' Why is this an unhelpful, non-logical complaint?",
    options: [
      "The words 'took forever' are an exaggerated emotional opinion; a logical person states the exact number of days (e.g., 'It took 12 days instead of the usual 3 days').",
      "Finance teams never make mistakes.",
      "Requests do not need approval.",
      "People should never talk about deadlines in an office."
    ],
    correctAnswer: 0,
    explanation: "Saying 'took forever' is emotional and vague. Giving exact facts ('12 days instead of 3 days') helps the team find the real bottleneck.",
    whyIncorrect: {
      1: "Any team can be delayed, but the problem is the vague language.",
      2: "Approvals are normal in business.",
      3: "Discussing deadlines is normal and necessary."
    }
  },

  // --- Questions 18 to 20: Applied Reasoning Scenarios ---
  {
    id: 18,
    difficulty: "Applied Reasoning",
    category: "Real-Life Decision Making",
    question: "Scenario: A delivery driver has to deliver 25 packages today. Area A has 18 packages close together, but traffic there gets totally jammed after 11:00 AM. Area B has 7 packages far apart, but traffic there stays light all day. Which plan makes the most logical sense?",
    options: [
      "Go to Area B first in the morning, and reach Area A in the afternoon during heavy traffic jams.",
      "Deliver the 18 packages in Area A early in the morning before traffic starts, then deliver Area B where traffic is light all day.",
      "Pick packages at random from the truck without looking at the addresses.",
      "Cancel all deliveries and go home."
    ],
    correctAnswer: 1,
    explanation: "Finishing Area A early avoids the 11:00 AM traffic jam and completes 72% of the deliveries quickly. Then Area B can be finished smoothly.",
    whyIncorrect: {
      0: "Arriving at Area A during peak traffic will trap the driver in traffic for hours.",
      2: "Random driving wastes fuel and guarantees late deliveries.",
      3: "Cancelling valid customer deliveries is irresponsible."
    }
  },
  {
    id: 19,
    difficulty: "Applied Reasoning",
    category: "Real-Life Decision Making",
    question: "Scenario: A client asks you to add a brand-new feature to a website 2 days before launch. Your developer tells you: 'Building this new feature takes 4 days of coding and testing.' What is the most logical, professional reply to the client?",
    options: [
      "Say 'Yes, sure!' and hope for a miracle, even though you know 4 days of work cannot fit in 2 days.",
      "Show the simple facts: explain that adding it now will delay the launch by 2 days, or offer to launch on time and add the new feature in an update next week.",
      "Shout at the client and refuse to ever talk to them again.",
      "Delete the entire website."
    ],
    correctAnswer: 1,
    explanation: "Logical decision-makers present clear facts and give practical options: either delay the launch slightly or release in two clean phases.",
    whyIncorrect: {
      0: "Making false promises destroys trust when the deadline is missed.",
      2: "Shouting is unprofessional and ruins business relationships.",
      3: "Deleting the website is an extreme, foolish overreaction."
    }
  },
  {
    id: 20,
    difficulty: "Applied Reasoning",
    category: "Real-Life Decision Making",
    question: "Scenario: A college student opens their computer to submit an assignment online, but sees an error: 'Cannot connect to server'. Which step shows the correct logical thinking approach?",
    options: [
      "Panic, punch the keyboard, and assume the computer is broken forever.",
      "Check the facts: see if other websites open, check if the Wi-Fi router is plugged in, and read the exact error message before trying fixes.",
      "Close the laptop and pretend the assignment never existed.",
      "Randomly press buttons until the screen changes."
    ],
    correctAnswer: 1,
    explanation: "Checking simple clues (Wi-Fi router, other websites, exact error message) quickly finds the real cause without stress.",
    whyIncorrect: {
      0: "Panicking and hitting the keyboard damages equipment and solves nothing.",
      2: "Avoiding the problem leads to failing the assignment.",
      3: "Pressing random buttons can make computer settings worse."
    }
  }
];
