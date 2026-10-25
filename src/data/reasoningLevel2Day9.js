// ==========================================
// SPOKO / Alpha Fly LOGICAL REASONING - LEVEL 2 (INTERMEDIATE)
// DAY 9: ROOT CAUSE ANALYSIS (RCA)
// The 5 Whys, Cause-and-Effect Relationships, and Problem Diagnosis
// ==========================================

export const day9Overview = {
  courseName: "Logical Reasoning",
  level: "Level 2 – Intermediate",
  dayNumber: 9,
  title: "Root Cause Analysis",
  subtitle: "The 5 Whys, Cause-and-Effect Relationships, and Problem Diagnosis",
  targetAudience: "Students, college learners, job seekers, and working professionals.",
  difficulty: "Intermediate",
  estimatedMinutes: 55,
  description: "Learn how to look past visible surface symptoms, distinguish facts from speculation, trace complex cause-and-effect relationships using the 5 Whys and Fishbone diagrams, and design permanent, evidence-backed solutions.",
  learningObjectives: [
    "Differentiate clearly between a symptom, an immediate cause, and a root cause.",
    "Understand why identifying the root cause is fundamentally more effective and cost-efficient than treating surface symptoms.",
    "Apply the structured 5 Whys technique to investigate problems methodically without jumping to conclusions.",
    "Identify direct, indirect, contributing, and necessary cause-and-effect relationships, and avoid confusing correlation with causation.",
    "Use 6-category Fishbone (Ishikawa) diagrams to brainstorm and organize plausible causes.",
    "Distinguish observed facts, assumptions, opinions, hypotheses, and verified causes during problem diagnosis.",
    "Prioritize root causes using evidence strength, frequency, impact, testability, and actionability.",
    "Formulate robust, preventative action plans and apply RCA across education, business, technology, and daily life."
  ]
};

// ==========================================
// 2. LESSON INTRODUCTION & DIAGNOSTIC SCENARIO
// ==========================================

export const lessonIntro = {
  title: "What is Root Cause Analysis (RCA)?",
  definition: "Root Cause Analysis (RCA) is a disciplined, evidence-based problem-solving method aimed at identifying the fundamental, underlying reason why a problem or failure occurred, so that permanent corrective actions can be taken to prevent it from ever recurring.",
  whyImportant: [
    "Logical Reasoning & Critical Thinking: Prevents cognitive biases, emotional reactions, and hasty generalizations.",
    "Business Management & Operations: Stops organizations from burning capital on temporary 'band-aids' that fail to fix operational friction.",
    "Software Engineering & IT: Powers modern Incident Post-Mortems, debugging distributed systems, and preventing repeat server outages.",
    "Personal Decision-Making: Helps learners fix study habits, procrastination, and recurring personal roadblocks at the source."
  ],
  scenario: {
    title: "Starter Scenario: The Computer Training Institute Dilemma",
    context: "Apex Skills Institute, a professional computer training center, noticed that admissions dropped sharply this month compared to expectations. The management immediately panicked.",
    initialReaction: "The marketing director suggested: 'Students find our courses too expensive! Let us immediately slash course fees by 25% and offer a monsoon discount.'",
    diagnosticQuestions: [
      {
        question: "Is 'low admissions' the actual root cause or just a symptom?",
        answer: "It is a visible symptom. 'Low admissions' is the observable result of something that went wrong earlier in the inquiry, counseling, or enrollment pipeline."
      },
      {
        question: "What information and facts should we investigate before deciding?",
        answer: "We must analyze: (1) Total inquiries received vs. past months, (2) Counselor response time, (3) Lead source quality, (4) Inquirer feedback reasons, and (5) Batch timings and competitor changes."
      },
      {
        question: "Why might immediately offering a discount fail to solve the real problem?",
        answer: "If inquiries were dropped because counselors took 4 days to return phone calls, or because the website syllabus was confusing, cutting prices will merely erode profit margins without fixing the operational bottleneck!"
      }
    ],
    takeaway: "Visible problems often have multiple hidden underlying causes. A master problem-solver never guesses or rushes into solutions before systematically investigating the evidence."
  }
};

// ==========================================
// 3. CORE CONCEPTS (7 IN-DEPTH MODULES)
// ==========================================

export const coreConcepts = {
  concept1: {
    id: "concept1",
    title: "Concept 1: Symptoms, Immediate Causes, and Root Causes",
    summary: "A fundamental error in reasoning is treating the visible signal as the root problem. To diagnose accurately, problem-solvers divide issues into three distinct tiers.",
    tiers: [
      {
        tier: "1. Symptom",
        badge: "Visible Signal",
        color: "#f59e0b",
        definition: "The visible sign, alert, or manifestation that something is malfunctioning or suboptimal.",
        analogy: "A high fever of 103°F in a patient.",
        action: "Do not stop here. It only tells you that trouble exists."
      },
      {
        tier: "2. Immediate Cause",
        badge: "Direct Trigger",
        color: "#3b82f6",
        definition: "The event or condition that directly produced the symptom right before it appeared.",
        analogy: "The body's immune system releasing pyrogens in response to a bacterial infection.",
        action: "Fixing this provides temporary relief but does not eliminate the source."
      },
      {
        tier: "3. Root Cause",
        badge: "Underlying Source",
        color: "#10b981",
        definition: "The deepest, foundational reason or system defect that initiated the causal sequence. When addressed, the problem is prevented from recurring.",
        analogy: "Contaminated drinking water containing Salmonella bacteria entering the household.",
        action: "Addressing this permanently solves the issue."
      }
    ],
    examples: [
      {
        domain: "Education",
        symptom: "Students are missing online morning classes repeatedly.",
        immediateCause: "Students did not receive or notice the morning lecture link reminders.",
        rootCauseHypothesis: "The institute lacks an automated scheduling system, relying on manual WhatsApp messages sent irregularly by busy tutors.",
        evidenceNeeded: "Logs showing message dispatch timestamps vs. class start times."
      },
      {
        domain: "Business",
        symptom: "Retail store inventory is frequently out of stock for top-selling items.",
        immediateCause: "Store managers placed reorders 3 days too late.",
        rootCauseHypothesis: "The inventory reorder threshold was based on outdated annual averages rather than seasonal weekend sales spikes.",
        evidenceNeeded: "POS transaction velocity data during promotional weekends."
      },
      {
        domain: "Technology",
        symptom: "A mobile banking application crashes when users open their transaction history.",
        immediateCause: "An 'Out of Memory' exception was triggered by the smartphone OS.",
        rootCauseHypothesis: "The API query retrieves all historical records spanning 5 years into memory at once without database pagination.",
        evidenceNeeded: "Application memory heap dump and backend SQL query logs."
      }
    ],
    goldenRule: "Golden Rule of RCA: A proposed root cause is ONLY a hypothesis until verified by objective, empirical evidence. Never confuse a plausible story with a confirmed fact."
  },

  concept2: {
    id: "concept2",
    title: "Concept 2: The 5 Whys Technique",
    summary: "Developed by Sakichi Toyoda for the Toyota Production System, the 5 Whys technique involves repeatedly asking 'Why?' to peel away surface layers and reveal the actionable root cause.",
    sevenSteps: [
      { step: 1, name: "Define the Problem Clearly", desc: "Write a specific, objective problem statement grounded in observable facts (who, what, where, when)." },
      { step: 2, name: "Ask Why the Problem Occurred", desc: "Identify the direct condition that made the problem happen." },
      { step: 3, name: "Use Evidence to Answer", desc: "Verify the answer with real data or logs; never rely on speculation or guesswork." },
      { step: 4, name: "Ask Why to That Answer", desc: "Treat the previous answer as a new effect and investigate its cause." },
      { step: 5, name: "Continue Until Actionable", desc: "Stop when you reach an underlying process, design, or behavioral defect that your team can directly control." },
      { step: 6, name: "Verify the Suspected Cause", desc: "Test whether reversing or removing this cause stops the problem from happening." },
      { step: 7, name: "Deploy Corrective Action & Monitor", desc: "Implement process safeguards and measure metrics to ensure recurrence is zero." }
    ],
    ruleOfFive: "Why Five? '5' is a practical guideline, not a mathematical law. Simple problems may need 3 Whys; complex distributed systems may require 7 or 8. Furthermore, problems frequently branch into multiple causal paths.",
    workedExamples: [
      {
        id: "five_why_ex1",
        title: "Example 1: Late Student Project Submission (From Course Prompt)",
        problem: "A student's major final project submission was 2 days late.",
        ladder: [
          { level: "Why 1?", question: "Why was the project submitted 2 days late?", answer: "The student finished the project 2 days past the deadline.", evidence: "Timestamp on portal upload." },
          { level: "Why 2?", question: "Why did the student finish so late?", answer: "The student started the main coding and writing work too close to the deadline.", evidence: "Git commit history showing first commit 48 hours prior." },
          { level: "Why 3?", question: "Why did they start so late?", answer: "The student severely underestimated how long software testing and debugging would take.", evidence: "Student self-reflection log stating 'I thought testing takes 1 hour'." },
          { level: "Why 4?", question: "Why did they underestimate testing time?", answer: "The student did not break the project into smaller tasks and modular test checkpoints.", evidence: "Absence of a task breakdown structure or work log." },
          { level: "Why 5?", question: "Why did they not break it down?", answer: "The student had never been taught project planning methods or milestone estimation frameworks.", evidence: "Curriculum review showing only coding syntax was taught, no project management." }
        ],
        rootCause: "Lack of structured task breakdown and milestone estimation training in the academic curriculum.",
        correctiveAction: "Incorporate mandatory milestone planning templates, progressive checkpoint submissions (25%, 50%, 75%), and early testing workshops into course orientation.",
        verificationNote: "Verify this by checking whether other students in the same cohort exhibited identical late-submission patterns due to planning deficits."
      },
      {
        id: "five_why_ex2",
        title: "Example 2: E-Commerce Payment Gateway Timeouts",
        problem: "Users experienced repeated 'Payment Gateway Timeout' errors during a flash sale.",
        ladder: [
          { level: "Why 1?", question: "Why did checkout fail with timeouts?", answer: "The payment service HTTP requests took longer than the 30-second gateway threshold.", evidence: "Server access logs." },
          { level: "Why 2?", question: "Why were payment requests taking over 30 seconds?", answer: "The database transaction pool was completely exhausted, queueing queries.", evidence: "Database connection pool metrics." },
          { level: "Why 3?", question: "Why was the database connection pool exhausted?", answer: "Concurrent checkout queries were locking the 'orders' table due to full-table scans.", evidence: "Database slow-query log." },
          { level: "Why 4?", question: "Why was a full-table scan occurring?", answer: "A database index on the 'customer_id' column was missing in the production schema.", evidence: "Schema inspection in PostgreSQL." },
          { level: "Why 5?", question: "Why was the index missing in production?", answer: "The database migration script for the new index was not reviewed or executed during the previous staging release.", evidence: "Deployment pipeline logs." }
        ],
        rootCause: "Deployment pipeline lacks an automated verification check to ensure database migrations match staging schemas before traffic goes live.",
        correctiveAction: "Add an automated schema-diff validation check to the CI/CD deployment pipeline that blocks deployment if indices differ between staging and production.",
        verificationNote: "Simulated load tests confirmed query time dropped from 32s to 45ms once index was added."
      },
      {
        id: "five_why_ex3",
        title: "Example 3: Early Workplace Employee Turnover",
        problem: "40% of newly recruited junior developers resign within their first 60 days.",
        ladder: [
          { level: "Why 1?", question: "Why are junior recruits leaving within 60 days?", answer: "Exit interviews reveal new hires feel lost, isolated, and overwhelmed by codebase complexity.", evidence: "HR exit interview feedback forms." },
          { level: "Why 2?", question: "Why do they feel lost and overwhelmed?", answer: "They receive little guidance and cannot set up the local development environment.", evidence: "Time-to-first-commit metric averaging 24 days." },
          { level: "Why 3?", question: "Why do they receive little guidance?", answer: "Senior developers assigned as 'buddies' rarely respond or schedule 1-on-1 check-ins.", evidence: "Slack response logs and calendar audits." },
          { level: "Why 4?", question: "Why do senior buddies not schedule check-ins?", answer: "Seniors are evaluated 100% on individual feature velocity and have no allocated time for mentoring.", evidence: "Quarterly KPI performance rubrics." },
          { level: "Why 5?", question: "Why is mentoring not part of KPI evaluations?", answer: "Engineering leadership treats onboarding as an informal HR duty rather than an engineering priority.", evidence: "Leadership meeting minutes." }
        ],
        rootCause: "Engineering leadership KPIs fail to allocate formal capacity or recognize senior engineers for developer onboarding and mentoring.",
        correctiveAction: "Allocate 15% dedicated capacity in sprint planning for designated mentors, and add 'New Hire Ramp-Up Success' to senior engineer quarterly performance metrics.",
        verificationNote: "Track 60-day retention and time-to-first-commit over the next two hiring cycles."
      }
    ]
  },

  concept3: {
    id: "concept3",
    title: "Concept 3: Cause-and-Effect Relationships",
    summary: "Logical reasoning requires mapping how conditions interact. Problems rarely follow a naive single-line sequence; understanding causal topologies prevents superficial fixes.",
    causalTypes: [
      {
        name: "Direct vs. Indirect Causes",
        desc: "A direct cause triggers the effect with no intervening steps (e.g., unplugging a cord immediately powers off the PC). An indirect cause initiates a chain of intermediate events (e.g., budget cuts lead to deferred maintenance, leading to worn parts, leading to machine breakdown months later)."
      },
      {
        name: "Multiple Causes → One Problem (Multi-Causality)",
        desc: "A failure occurs only when multiple conditions coincide. For example, a car accident caused by (1) worn tire treads, (2) rain-slicked road, and (3) distracted driving. Fixing only one factor helps, but understanding the system requires mapping all three."
      },
      {
        name: "One Cause → Multiple Problems (Cascading Failure)",
        desc: "A single root failure propagates across diverse symptoms. For example, an uncalibrated measuring scale in a factory causes incorrect chemical mixtures, failed batch inspections, customer returns, and accounting inventory discrepancies."
      },
      {
        name: "Contributing Factors vs. Necessary Causes",
        desc: "A Necessary Cause MUST be present for the problem to occur (e.g., oxygen is necessary for a fire). A Contributing Factor increases the likelihood or severity of the problem, but cannot cause it alone (e.g., dry wind fuels the fire)."
      },
      {
        name: "Correlation vs. Causation",
        desc: "Two variables moving together does NOT prove one caused the other! A famous trap: Ice cream sales and drowning incidents both peak in July, not because ice cream causes drowning, but because summer heat (a third confounding variable) drives both."
      }
    ],
    practicalCase: {
      title: "Real-World Trap: Software Errors & Email Campaigns",
      scenario: "On Monday at 10:00 AM, the marketing team sent out 50,000 promotional newsletters. At 10:05 AM, the billing server crashed. The IT manager yelled: 'The marketing email crashed our database!'",
      analysis: "Investigation revealed the server crashed due to an out-of-disk error caused by uncompressed daily database backups scheduled at 10:00 AM. The marketing campaign was merely correlated in time, not the cause!",
      lesson: "Always verify physical and logical mechanisms of action before declaring causation."
    }
  },

  concept4: {
    id: "concept4",
    title: "Concept 4: Fishbone Diagram (Ishikawa Diagram)",
    summary: "Invented by Kaoru Ishikawa, the Fishbone Diagram (Cause-and-Effect Diagram) visually structures brainstorming around a central problem (the 'head') and branches into categorized potential causes (the 'bones').",
    sixCategories: [
      { name: "People", desc: "Skills, training, experience, fatigue, communication, workload, mindset." },
      { name: "Process", desc: "Workflows, standardized operating procedures (SOPs), handoffs, documentation, approvals." },
      { name: "Technology / Tools", desc: "Software, hardware, network stability, tooling suitability, automation." },
      { name: "Materials / Information", desc: "Input data quality, brochures, syllabi, raw supplies, clarity of specifications." },
      { name: "Measurement", desc: "Metrics tracked, calculation methods, KPI definitions, inspection accuracy, bias in logs." },
      { name: "Environment", desc: "Physical workspace, noise, temperature, market competition, seasonality, economic factors." }
    ],
    demonstrationProblem: "Low Student Admission Conversion Rate",
    fishboneBranches: {
      people: [
        "Counselors not trained in addressing specific student curriculum questions",
        "Staff shortage during peak afternoon inquiry hours",
        "Counselor burn-out leading to unenthusiastic phone calls"
      ],
      process: [
        "Inquiries assigned manually with 24–48 hour delay",
        "No standardized follow-up protocol after first brochure download",
        "Complicated 5-step registration and fee payment form"
      ],
      technology: [
        "Website CRM webhook periodically drops submitted contact forms",
        "SMS verification code arrives 15 minutes late",
        "Mobile landing page loads in 8.5 seconds on 4G networks"
      ],
      materials: [
        "Course syllabus PDF lacks clear placement and salary outcome statistics",
        "Prerequisites not clearly explained, confusing beginner applicants",
        "Pricing brochure confusing with hidden lab fee disclaimers"
      ],
      measurement: [
        "Conversion rate calculated against spam bot inquiries, distorting true numbers",
        "Counselor performance measured only on call volume, not lead qualification",
        "No tracking of drop-offs across specific stages of the enrollment funnel"
      ],
      environment: [
        "New competing institute opened 2 blocks away offering weekend batches",
        "University semester final examinations happening during the same fortnight",
        "Economic downturn causing students to postpone non-degree upskilling"
      ]
    },
    criticalCaution: "Every bone on this diagram is an UNVERIFIED HYPOTHESIS. A fishbone organizes your investigative hypotheses; it does not replace empirical testing!"
  },

  concept5: {
    id: "concept5",
    title: "Concept 5: Evidence-Based Problem Diagnosis",
    summary: "Amateur problem-solvers argue with opinions and assumptions. Master problem-solvers diagnose using the hierarchy of analytical validity.",
    validityHierarchy: [
      {
        type: "Observed Fact",
        reliability: "Highest",
        color: "#10b981",
        description: "Objective, directly measurable, verifiable data recorded without subjective interpretation.",
        example: "'The server CPU reached 98% utilization at 14:02 UTC according to CloudWatch metrics.'"
      },
      {
        type: "Hypothesis",
        reliability: "Scientific & Testable",
        color: "#3b82f6",
        description: "A proposed causal explanation formulated to be confirmed or disproven through empirical testing.",
        example: "'If inquiry response latency exceeds 2 hours, conversion probability drops by 50%.'"
      },
      {
        type: "Verified Cause",
        reliability: "Empirically Proven",
        color: "#8b5cf6",
        description: "A hypothesis that has been tested with data and proven to be the causal driver of the effect.",
        example: "'Data analysis proved that inquiries called within 30 minutes converted at 32%, while those called after 24 hours converted at only 4%.'"
      },
      {
        type: "Assumption",
        reliability: "Dangerous / Unverified",
        color: "#f59e0b",
        description: "Something taken for granted as true without supporting proof or data.",
        example: "'Students are not enrolling because our fees are too high compared to others.'"
      },
      {
        type: "Opinion",
        reliability: "Lowest / Subjective",
        color: "#ef4444",
        description: "A personal belief, emotional reaction, or aesthetic preference.",
        example: "'The new institute logo looks uninviting, which is why students are turning away.'"
      }
    ],
    reliableEvidenceCatalog: [
      { source: "Timestamped Activity Logs", use: "Verifying exact latency, sequence of actions, and response times." },
      { source: "Error Traces & Dump Files", use: "Determining exact technical exception types, stack frames, and memory states." },
      { source: "Standardized User Surveys", use: "Capturing direct user feedback at the point of cancellation or exit." },
      { source: "Before-and-After Control Tests (A/B Testing)", use: "Proving whether changing a specific variable isolates and fixes the outcome." },
      { source: "Funnel Drop-Off Analytics", use: "Pinpointing the exact screen or step where users abandon a process." }
    ],
    blameVsProcess: "Why Blaming Individuals Fails: When managers blame a person ('Rohan was careless and forgot the reminder'), they overlook the broken process ('Why does our system require a human to manually remember 200 reminders without an automated calendar alert?'). Blame creates a culture of cover-ups; process analysis builds resilient organizations."
  },

  concept6: {
    id: "concept6",
    title: "Concept 6: Prioritizing Root Causes",
    summary: "A complex problem often reveals 10 to 15 contributing factors. You cannot fix everything simultaneously. Prioritizing ensures resources tackle the highest-leverage root causes first.",
    fiveEvaluationCriteria: [
      { name: "1. Evidence Strength", weight: "Crucial", desc: "Is this cause supported by solid data or just team speculation?" },
      { name: "2. Frequency", weight: "High", desc: "Does this failure happen continuously, daily, or once a year?" },
      { name: "3. Impact / Severity", weight: "Critical", desc: "How severely does this cause degrade conversions, revenue, or user experience?" },
      { name: "4. Testability", weight: "Medium", desc: "Can we isolate and experiment on this factor to prove its causal role?" },
      { name: "5. Addressability / Actionability", weight: "High", desc: "Does our team have the authority and technical capability to fix it?" }
    ],
    prioritizationMatrix: {
      methodology: "Score each suspected cause from 1 to 5 on Impact, Frequency, and Actionability. Total Leverage Score = (Impact × Frequency × Actionability). Causes with scores ≥ 60 represent Tier-1 priorities.",
      sampleTable: [
        { cause: "Counselor response delay > 24 hours", evidence: "Call logs confirm 68% calls made on Day 3", impact: 5, frequency: 5, actionability: 4, score: 100, priority: "Tier 1: Immediate Action" },
        { cause: "Website course syllabus PDF unformatted", evidence: "3 user complaints out of 120 leads", impact: 3, frequency: 2, actionability: 5, score: 30, priority: "Tier 3: Quick Fix Later" },
        { cause: "Competitor running billboard ads 2km away", evidence: "Photos of billboard", impact: 2, frequency: 4, actionability: 1, score: 8, priority: "Tier 4: External / Low Control" },
        { cause: "Payment gateway checkout failing on mobile", evidence: "12 failed transactions logged in Stripe", impact: 5, frequency: 4, actionability: 5, score: 100, priority: "Tier 1: Immediate Action" }
      ]
    }
  },

  concept7: {
    id: "concept7",
    title: "Concept 7: Corrective Actions and Prevention",
    summary: "Problem-solving completes only when solutions prevent recurrence. An effective resolution moves from immediate mitigation to structural immunity.",
    actionTiers: [
      { tier: "Mitigation (Band-Aid)", purpose: "Contain the damage right now (e.g., restart a crashed server, manually refund an angry customer). Does not solve the root cause." },
      { tier: "Root Cause Correction", purpose: "Eliminate the specific flaw that allowed the failure to occur (e.g., patch the memory leak in the code)." },
      { tier: "Systemic Prevention", purpose: "Build automated safeguards or architectural barriers so the error is structurally impossible in the future (e.g., automated memory limit alerts and CI/CD linting)." },
      { tier: "Verification & Monitoring", purpose: "Track metrics over 30 to 90 days to prove the problem rate remains at zero." }
    ],
    solutionComparison: [
      {
        scenario: "Staff repeatedly enter incorrect customer phone numbers into the CRM.",
        weakSolution: "Issue a warning email telling staff to 'be more careful and pay attention.' (Fails: human fatigue remains unchanged).",
        strongSolution: "Add input validation with regex and SMS OTP verification so phone numbers must be formatted correctly before submission."
      },
      {
        scenario: "Students miss online assignment submission deadlines due to forgotten dates.",
        weakSolution: "Deduct 5 marks for late submissions to penalize tardiness. (Fails: does not solve the memory/calendar gap).",
        strongSolution: "Configure automated Google Calendar sync, SMS reminders 24 hours prior, and visual dashboard countdown clocks."
      },
      {
        scenario: "Production database crashed due to full disk space from logs.",
        weakSolution: "Manually delete old log files whenever the server slows down. (Fails: repeats every 3 months).",
        strongSolution: "Implement automated log rotation with retention capped at 7 days, plus automated alerts at 80% disk threshold."
      }
    ],
    sevenStepActionPlan: [
      "1. State the Problem with clear facts and boundary metrics.",
      "2. Record and preserve objective evidence (logs, timestamps, records).",
      "3. Identify and rigorously test potential causes.",
      "4. Select evidence-supported, high-leverage corrective actions.",
      "5. Assign a specific owner and strict deadline to every action item.",
      "6. Measure the outcome using predefined quantitative success metrics.",
      "7. Review at 30/60/90 days to confirm zero recurrence."
    ]
  }
};

// ==========================================
// 4. WORKED EXAMPLES (8 COMPREHENSIVE CASE STUDIES)
// ==========================================

export const workedExamples = [
  {
    id: "ex1",
    domain: "Academic & Education",
    title: "Example 1: Student Repeatedly Missing Assignment Deadlines",
    problemStatement: "A college engineering student, Priya, has submitted 4 out of 5 course assignments 2 to 4 days late this semester.",
    symptomsAndFacts: [
      "Assignment grades penalized by 20% for lateness.",
      "Submissions occur at 3:00 AM on the late deadline.",
      "Priya reports feeling chronically stressed and exhausted during submission weeks.",
      "Portal logs reveal Priya first downloads the assignment handout 36 hours before the deadline."
    ],
    possibleCauses: [
      "Hypothesis A: Priya does not understand the course material.",
      "Hypothesis B: Priya has excessive extracurricular commitments.",
      "Hypothesis C: Priya lacks task decomposition skills and defers starting until panic sets in."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why were assignments submitted late?", a: "Priya finished drafting and writing 2 days after the target deadline." },
      { step: "Why 2?", q: "Why did drafting take until 2 days after the deadline?", a: "Priya only began writing the code 36 hours prior to the original deadline." },
      { step: "Why 3?", q: "Why did she wait until 36 hours before?", a: "The assignment looked massive and intimidating, so she deferred it while working on smaller daily homework." },
      { step: "Why 4?", q: "Why did the assignment look intimidating?", a: "Priya had not broken the multi-part project into discrete daily sub-tasks or milestones." },
      { step: "Why 5?", q: "Why did she not break it down?", a: "Priya never adopted a task-decomposition framework (like Pomodoro or Kanban) to manage large-scale academic projects." }
    ],
    evidenceToVerify: "Compare Priya's quiz scores (which are high: 88%) vs. project timelines. High quiz scores disprove lack of intellect (Hypothesis A). Calendar audits confirm no extracurricular overload (Hypothesis B). Download timestamps prove late initiation (Hypothesis C confirmed).",
    correctiveAction: "Implement a 3-stage milestone schedule for large assignments: (1) Outline & Setup due Day 3, (2) Core Implementation due Day 7, (3) Testing & Polish due Day 10.",
    measurementOfImprovement: "Track submission timestamps for the remaining 3 semester assignments; target 100% on-time submission with zero grade penalties."
  },

  {
    id: "ex2",
    domain: "Business & Training Institutes",
    title: "Example 2: Low Admissions at a Computer Training Institute",
    problemStatement: "Apex Training Institute received 120 course inquiries in October but achieved only 18 admissions (15% conversion), down from 25% in September.",
    symptomsAndFacts: [
      "Total inquiries actually increased from 100 in Sept to 120 in Oct (+20%).",
      "Total enrollments fell from 25 to 18 (-28%).",
      "Course fees, curriculum, and faculty remained identical across both months.",
      "Google Ads campaign in October targeted a broader geographic region (40km radius vs 10km previously)."
    ],
    possibleCauses: [
      "Hypothesis 1: Course fees are too expensive.",
      "Hypothesis 2: Counselors take too long to call prospective leads.",
      "Hypothesis 3: Geographic expansion attracted out-of-commute leads who cannot attend physical classes."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why did admissions drop despite higher inquiries?", a: "A significantly lower percentage of inquirers showed up for classroom counseling visits (22 out of 120 vs 45 out of 100)." },
      { step: "Why 2?", q: "Why did inquirers refuse to attend classroom counseling?", a: "64% of inquirers reported that the institute campus was too far away for daily commuting." },
      { step: "Why 3?", q: "Why were distant leads inquiring in the first place?", a: "The October Google Ads campaign expanded geographic targeting to a 40km radius without specifying that courses were strictly classroom-only." },
      { step: "Why 4?", q: "Why did the ads not specify 'classroom-only'?", a: "The freelance marketing agency was incentivized purely on raw lead count rather than qualified local enrollments." },
      { step: "Why 5?", q: "Why was agency compensation tied to raw leads?", a: "Institute management lacked a full-funnel lead attribution system connecting marketing spend to enrolled student revenue." }
    ],
    evidenceToVerify: "Cross-reference lead postal codes with counseling no-show rates. 85% of non-converting October leads lived >25km away.",
    correctiveAction: "(1) Restrict ad geotargeting strictly to a 10km radius; (2) Clearly highlight 'In-Person Lab Training in T. Nagar' on all ad copy; (3) Align marketing agency contract KPIs to verified walk-ins and enrollments.",
    measurementOfImprovement: "Track conversion rate over November; target recovery back to ≥25% with zero ad spend wasted on out-of-commute leads."
  },

  {
    id: "ex3",
    domain: "Corporate Operations",
    title: "Example 3: Employees Completing Client Deliverables Late",
    problemStatement: "An IT services firm's QA and deployment team missed delivery SLA deadlines on 7 out of 10 software releases this quarter.",
    symptomsAndFacts: [
      "Client satisfaction (CSAT) rating dropped from 4.6 to 3.2.",
      "Senior management demanded employees work unpaid overtime on weekends.",
      "Despite overtime, sprint release delays continued to average 3.5 days late.",
      "Deployment logs indicate code reached the QA team 48 hours before the promised client release date instead of the required 7 days."
    ],
    possibleCauses: [
      "Hypothesis A: QA engineers lack automated testing skills.",
      "Hypothesis B: Developers are coding too slowly.",
      "Hypothesis C: Client scope changes are accepted mid-sprint without extending delivery deadlines."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why were client software deliveries late?", a: "QA testing was completed 3 days past the promised delivery SLA." },
      { step: "Why 2?", q: "Why was QA testing finished so late?", a: "QA only received the final build 48 hours before the delivery date, making full regression testing impossible in time." },
      { step: "Why 3?", q: "Why did developers hand over code so late?", a: "Developers had to rebuild authentication and checkout modules during the last 3 days of the sprint." },
      { step: "Why 4?", q: "Why did developers rebuild core modules mid-sprint?", a: "The client requested major feature revisions via email, which project managers accepted without updating the schedule." },
      { step: "Why 5?", q: "Why did project managers accept scope changes without adjusting deadlines?", a: "The company has no formal Change Request Process or contract clause requiring schedule extensions when scope changes occur mid-sprint." }
    ],
    evidenceToVerify: "Audit Jira tickets and email logs. 9 out of 10 delayed sprints contained 'Urgent Client Scope Additions' added during sprint week 2.",
    correctiveAction: "Enforce a strict 'Sprint Freeze' policy: all mid-sprint scope additions must go through a formal Change Order that automatically recalculates delivery dates and client billing.",
    measurementOfImprovement: "Track QA handover lead time (target ≥ 6 days) and on-time SLA delivery rate over next quarter (target 95%)."
  },

  {
    id: "ex4",
    domain: "Technology & Web Performance",
    title: "Example 4: A Website Loading Slowly During Peak Hours",
    problemStatement: "An educational video streaming portal experiences severe page load delays (average 11.2 seconds) between 7:00 PM and 10:00 PM daily.",
    symptomsAndFacts: [
      "Off-peak load time is 1.4 seconds (fast and normal).",
      "During peak hours, user bounce rate jumps from 18% to 62%.",
      "Server CPU usage remains moderate at 45%.",
      "Bandwidth network graph peaks at 98% of the hosting plan's egress network bandwidth threshold."
    ],
    possibleCauses: [
      "Hypothesis 1: Database queries are poorly optimized.",
      "Hypothesis 2: Server hardware lacks sufficient CPU cores.",
      "Hypothesis 3: Large, uncompressed course thumbnail images are served directly from the web server rather than a CDN."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why is the website loading slowly during peak evening hours?", a: "Network transmission of web assets is throttled and queues for up to 9 seconds." },
      { step: "Why 2?", q: "Why is network transmission throttled?", a: "The hosting server's outbound bandwidth cap (100 Mbps) is completely saturated." },
      { step: "Why 3?", q: "Why is bandwidth saturated when visitor count is only 500 concurrent users?", a: "Each homepage load downloads 28 megabytes of raw image assets." },
      { step: "Why 4?", q: "Why does the homepage require 28 MB per user load?", a: "Course creator instructors uploaded raw 4K PNG banner images (6-8 MB each) which the server delivers uncompressed." },
      { step: "Why 5?", q: "Why are raw 4K images served uncompressed?", a: "The content management portal has no automated image compression pipeline or Content Delivery Network (CDN) offloader." }
    ],
    evidenceToVerify: "Network payload inspection in Chrome DevTools shows 8 image files accounting for 25.4 MB out of total 27.8 MB page weight.",
    correctiveAction: "(1) Integrate an automated image processing pipeline converting uploads to WebP format (max 150 KB per image); (2) Route all static assets through a global CDN (Cloudflare).",
    measurementOfImprovement: "Homepage payload size reduced from 28 MB to <1.2 MB; peak-hour load time reduced to <1.8 seconds; bounce rate maintained below 20%."
  },

  {
    id: "ex5",
    domain: "Software & Fintech",
    title: "Example 5: Repeated Errors in a Billing Application",
    problemStatement: "A SaaS billing application generated incorrect invoices for 142 enterprise clients at the end of the month, causing billing disputes and delayed payments.",
    symptomsAndFacts: [
      "Invoices miscalculated tax amounts, applying 18% GST to tax-exempt overseas clients.",
      "Finance team spent 40 hours manually issuing credit notes and regenerating invoices.",
      "Customer complaints increased by 300%.",
      "The tax error occurred only on accounts that changed subscription tiers mid-month."
    ],
    possibleCauses: [
      "Hypothesis A: Finance team made manual data entry errors.",
      "Hypothesis B: The billing software code has an uncaught logic flaw in the mid-cycle prorated calculation service.",
      "Hypothesis C: The tax rules database table was updated incorrectly."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why did 142 overseas enterprise invoices contain incorrect 18% tax charges?", a: "The invoice generation script defaulted the tax code to 'DOMESTIC_18%' instead of 'EXPORT_0%'." },
      { step: "Why 2?", q: "Why did it default to domestic tax for overseas clients?", a: "The client profile object passed to the tax engine had an empty 'tax_exemption_status' attribute." },
      { step: "Why 3?", q: "Why was the tax exemption status attribute empty?", a: "When an account upgraded tiers mid-month, the 'TierUpgradeHandler' cloned user data but omitted the country tax metadata fields." },
      { step: "Why 4?", q: "Why did the 'TierUpgradeHandler' omit those fields?", a: "The developer who wrote the feature 2 months ago manually copied selected attributes instead of using the central customer schema serializer." },
      { step: "Why 5?", q: "Why was this incomplete attribute copy not caught prior to production?", a: "The automated unit test suite tested tier upgrades only on standard domestic customer fixtures, with zero test cases covering international tax-exempt accounts." }
    ],
    evidenceToVerify: "Git commit history and test suite code review. Inspecting `TierUpgradeHandler.js` confirmed missing metadata fields; test coverage report showed 0% coverage for overseas tier upgrades.",
    correctiveAction: "(1) Refactor `TierUpgradeHandler` to use the unified immutable customer profile serializer; (2) Write comprehensive regression unit tests for all combinations of international tax exemptions and mid-month tier upgrades.",
    measurementOfImprovement: "Zero incorrect tax invoices generated in subsequent month-end billing cycles; 100% test coverage on billing tier upgrade pipelines."
  },

  {
    id: "ex6",
    domain: "UX & Customer Conversion",
    title: "Example 6: Customers Abandoning an Online Enquiry Form",
    problemStatement: "An online course landing page attracts 5,000 visitors per week, but form completion dropped from 8.2% to 1.9% following a website redesign.",
    symptomsAndFacts: [
      "Weekly visitors remained constant (5,000).",
      "Clicks on 'Enquire Now' button remained strong (1,200 clicks/week).",
      "Only 95 visitors actually completed and submitted the form.",
      "Analytics show 88% of users drop off on Step 3 of the new 4-step modal form."
    ],
    possibleCauses: [
      "Hypothesis 1: Course curriculum is no longer appealing.",
      "Hypothesis 2: Step 3 asks for invasive or unnecessary personal information.",
      "Hypothesis 3: A technical validation bug on Step 3 blocks submission."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why did form completions plunge from 8.2% to 1.9%?", a: "Over 80% of users who opened the form abandoned it immediately upon reaching Step 3." },
      { step: "Why 2?", q: "Why did users abandon Step 3 in droves?", a: "Step 3 made uploading a scanned copy of their college degree certificate and entering their Aadhaar/PAN number mandatory." },
      { step: "Why 3?", q: "Why did the form require identity documents for a simple course inquiry?", a: "The admissions team requested these fields to prevent 'unserious inquiries' from wasting counselor time." },
      { step: "Why 4?", q: "Why did the admissions team believe identity proof was needed at inquiry time?", a: "They merged the preliminary inquiry form with the official final course matriculation form." },
      { step: "Why 5?", q: "Why did management allow merging inquiry and matriculation without UX testing?", a: "There was no cross-functional product review process to evaluate user friction and conversion impact prior to form deployment." }
    ],
    evidenceToVerify: "Heatmaps and session recordings (Hotjar) showing users reaching Step 3, pausing for 4 seconds at 'Upload Identity Document', and closing the tab.",
    correctiveAction: "(1) Revert preliminary inquiry form to 3 frictionless fields: Name, Email, Phone Number; (2) Defer identity document verification to post-counseling enrollment; (3) Establish a policy requiring UX sign-off for form changes.",
    measurementOfImprovement: "Enquiry form conversion rate tracked weekly; target immediate bounce back to ≥8.5%."
  },

  {
    id: "ex7",
    domain: "Education & Pedagogy",
    title: "Example 7: Low Examination Performance in Mathematics Module",
    problemStatement: "In a 60-student batch of Computer Science students, 38 students (63%) failed the midterm exam for 'Discrete Mathematics & Boolean Logic'.",
    symptomsAndFacts: [
      "Historical failure rate for this course over the past 5 years was 12% to 16%.",
      "Students performed adequately on theoretical definitions (average 74%), but scored an average of 18% on multi-step proof and logic derivation problems.",
      "Student attendance in lectures was 91% (consistently high).",
      "The syllabus was taught using lecture slides with zero live problem-solving sessions."
    ],
    possibleCauses: [
      "Hypothesis A: The exam questions were unfairly difficult or outside syllabus.",
      "Hypothesis B: Students lacked prerequisite high-school algebra knowledge.",
      "Hypothesis C: Teaching methodology focused on passive memorization of definitions rather than active problem-solving practice."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why did 63% of students fail the midterm exam?", a: "Students failed virtually all multi-step proof and Boolean reduction questions." },
      { step: "Why 2?", q: "Why did students fail multi-step proofs despite knowing definitions?", a: "Students had never practiced constructing logic proofs independently under test conditions." },
      { step: "Why 3?", q: "Why had students never practiced constructing proofs?", a: "Classroom sessions consisted of the professor reading through completed proofs on slide decks without interactive derivation." },
      { step: "Why 4?", q: "Why did classroom sessions rely solely on slide reading?", a: "The new faculty member had to cover an expanded syllabus in 30 days and skipped weekly tutorial problem labs to save time." },
      { step: "Why 5?", q: "Why were tutorial problem labs skippable?", a: "The academic department lacked standardized course delivery guidelines mandating minimum hands-on problem lab hours per credit." }
    ],
    evidenceToVerify: "Review student homework submissions: 100% of homework assignments were multiple-choice theoretical quizzes; zero handwritten proof assignments were given prior to the midterm exam.",
    correctiveAction: "(1) Reintroduce mandatory 2-hour weekly problem-solving tutorial labs; (2) Replace 50% of passive lecture slides with live whiteboard step-by-step problem derivations; (3) Conduct a non-graded practice diagnostic test 2 weeks before the final exam.",
    measurementOfImprovement: "Track final examination scores; target overall failure rate dropping below 15%."
  },

  {
    id: "ex8",
    domain: "Sales & Strategic Management",
    title: "Example 8: A Team Repeatedly Missing Quarterly Targets",
    problemStatement: "A B2B enterprise software sales team missed its quarterly revenue targets for 3 consecutive quarters by an average margin of 35%.",
    symptomsAndFacts: [
      "The sales pipeline showed $4,000,000 in potential deals each quarter (more than double the $1.5M target).",
      "Sales representatives conducted 40 product demos per week (high activity).",
      "Deals remained stuck in the 'Negotiation / Legal Review' stage for an average of 115 days before quietly expiring.",
      "Sales leadership blamed representatives for 'lacking closing aggression'."
    ],
    possibleCauses: [
      "Hypothesis 1: The product is priced significantly above market competitors.",
      "Hypothesis 2: Sales representatives are ineffective at negotiating.",
      "Hypothesis 3: Enterprise security and compliance certifications are missing, stalling enterprise legal sign-offs."
    ],
    fiveWhysAnalysis: [
      { step: "Why 1?", q: "Why is the sales team missing quarterly revenue targets by 35%?", a: "Over 60% of qualified deals stall indefinitely in the contract and security review phase." },
      { step: "Why 2?", q: "Why are deals stalling during contract and security review?", a: "Enterprise client IT security teams refuse to sign off without SOC-2 Type II and ISO 27001 compliance certificates." },
      { step: "Why 3?", q: "Why does the company lack SOC-2 and ISO security certificates?", a: "The engineering team deferred third-party security audits to focus all bandwidth on shipping consumer features." },
      { step: "Why 4?", q: "Why did engineering prioritize consumer features over enterprise compliance?", a: "Company leadership pivoted the sales strategy to target Fortune 500 enterprises without checking engineering enterprise readiness." },
      { step: "Why 5?", q: "Why was the strategic pivot launched without enterprise readiness alignment?", a: "Executive leadership operates in department silos without a cross-functional Go-To-Market (GTM) product gating checklist." }
    ],
    evidenceToVerify: "Audit CRM deal loss notes. In 28 out of 34 lost deals, the explicit reason provided by the client procurement officer was: 'Vendor failed mandatory vendor security assessment due to lack of SOC-2.'",
    correctiveAction: "(1) Expedite SOC-2 Type II security certification audit with dedicated engineering resources; (2) Temporarily refocus sales prospecting onto mid-market clients who do not mandate SOC-2 until audit completion.",
    measurementOfImprovement: "Average contract closing cycle time reduced from 115 days to <45 days; achievement of quarterly sales quota at ≥95%."
  }
];

// ==========================================
// 5. INTERACTIVE PRACTICE ACTIVITIES (3 PROGRESSIVE SETS)
// ==========================================

export const practiceSetA = {
  id: "setA",
  title: "Practice Set A: Identify the Problem",
  subtitle: "Distinguish Symptoms, Immediate Causes, Root Causes, Facts & Assumptions",
  durationMinutes: 5,
  questions: [
    {
      id: "setA_q1",
      scenario: "A delivery company notices customer complaints about broken ceramic dishes surged by 40% in July. The warehouse supervisor says: 'Package loaders are throwing boxes carelessly!'",
      question: "Which element in this scenario represents the 'Symptom'?",
      options: [
        "Package loaders throwing boxes carelessly.",
        "The 40% increase in customer complaints about broken ceramic dishes.",
        "High summer temperatures making warehouse workers irritable.",
        "Inadequate bubble wrap packaging used on fragile items."
      ],
      correctIndex: 1,
      rationale: "Option B is the correct answer. The 40% surge in customer complaints is the observable manifestation (symptom) alerting the company that a problem exists. The supervisor's statement about careless throwing is an unverified assumption/hypothesis, not the symptom."
    },
    {
      id: "setA_q2",
      scenario: "An office printer jams every afternoon at 2:00 PM. A technician observes that paper trays are filled with cheap, high-moisture paper that curls in the humid afternoon heat. The office manager states: 'Staff members are printing too many documents.'",
      question: "What is the manager's statement an example of?",
      options: [
        "An observed fact verified by printer memory logs.",
        "An unverified assumption reflecting personal bias.",
        "A confirmed root cause.",
        "A necessary cause of printer mechanical failure."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. The manager assumes staff print volume causes the jam without reviewing printer usage logs. An assumption is something accepted as true without proof, often misdirecting problem-solving away from the physical cause (paper quality and humidity)."
    },
    {
      id: "setA_q3",
      scenario: "A developer notices that an API server restarts every 6 hours. (1) Error log displays 'Fatal Out of Memory'. (2) A background cache array grows indefinitely without clearing old entries. (3) The restart disrupts active user sessions.",
      question: "Which of the following correctly pairs the Immediate Cause with the Root Cause?",
      options: [
        "Immediate Cause: Disrupted user sessions; Root Cause: Fatal Out of Memory.",
        "Immediate Cause: Fatal Out of Memory; Root Cause: Background cache array growing indefinitely without eviction.",
        "Immediate Cause: Background cache growth; Root Cause: Disrupted user sessions.",
        "Immediate Cause: Server restarting; Root Cause: Fatal Out of Memory."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. The Immediate Cause (direct technical trigger right before crash) is the Out of Memory exception. The Root Cause (fundamental design flaw) is the cache array leaking memory without an eviction policy."
    },
    {
      id: "setA_q4",
      scenario: "Consider four statements regarding a hospital's patient wait times: (W) 'Wait times averaged 54 minutes in August.' (X) 'Patients are impatient and complain easily.' (Y) 'Receptionists are too slow.' (Z) 'The patient check-in software took 4.2 minutes per entry due to server lag.'",
      question: "Which two statements qualify as objective 'Observed Facts'?",
      options: [
        "(W) and (X)",
        "(X) and (Y)",
        "(W) and (Z)",
        "(Y) and (Z)"
      ],
      correctIndex: 2,
      rationale: "Option C is correct. (W) and (Z) contain specific, quantitative, measurable data points (54 minutes, 4.2 minutes). Statements (X) and (Y) are subjective opinions and personal judgments unsupported by empirical metrics."
    },
    {
      id: "setA_q5",
      scenario: "A manufacturing plant replaces a burned-out conveyor belt motor three times in two months. Each time, maintenance installs a new motor, but it burns out again within weeks.",
      question: "Why does the motor continue to burn out?",
      options: [
        "Because modern replacement motors are inherently defective.",
        "Because replacing the motor treats only the symptom and immediate damage, ignoring the underlying cause (e.g., mechanical overload or voltage surges).",
        "Because conveyor belts require daily manual lubrication.",
        "Because maintenance technicians did not follow 5 Whys documentation."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. Replacing the damaged motor is an immediate component repair (treating the symptom). If the conveyor roller bearings are seized or line voltage fluctuates, excessive mechanical load will repeatedly destroy any new motor installed."
    }
  ]
};

export const practiceSetB = {
  id: "setB",
  title: "Practice Set B: Apply the 5 Whys",
  subtitle: "Formulate Questions, Detect Logic Gaps & Verify Causal Chains",
  durationMinutes: 7,
  questions: [
    {
      id: "setB_q1",
      scenario: "Problem: A student failed an online programming quiz.\nWhy 1: The student ran out of time on Question 5.\nWhy 2: The student spent 25 minutes debugging a syntax error in Question 5.",
      question: "What is the most logical and effective next question (Why 3)?",
      options: [
        "Why is Question 5 worth more marks than Question 1?",
        "Why did the student spend 25 minutes on a syntax error rather than applying basic syntax rules or moving forward?",
        "Why did the university choose this online testing platform?",
        "Why did the student not study 10 hours a day?"
      ],
      correctIndex: 1,
      rationale: "Option B is correct. A strong 5 Whys inquiry stays tightly focused on the direct causal chain. Investigating why the student became fixated on a syntax error explores time-management and debugging strategy, whereas platform choice or mark distribution are unrelated tangents."
    },
    {
      id: "setB_q2",
      scenario: "Examine this causal chain:\nProblem: Company website crashed during Black Friday.\nWhy 1: The web server stopped responding.\nWhy 2: The marketing team ran too many television commercials.\nWhy 3: The CEO wanted to beat the competitor.",
      question: "What is the major logical flaw in this 5 Whys analysis?",
      options: [
        "It reached the root cause too quickly in only 3 steps.",
        "It made an unjustified logical leap between Why 1 and Why 2 by skipping the technical mechanism (traffic volume, server capacity, or lack of autoscaling).",
        "It blamed the CEO instead of the IT manager.",
        "TV commercials cannot increase web traffic."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. The chain jumps from 'web server stopped responding' straight to 'marketing ran TV ads', skipping the immediate engineering reality (incoming HTTP requests exceeded server thread pool capacity due to lack of autoscaling). Jumping across layers creates gaps in understanding."
    },
    {
      id: "setB_q3",
      scenario: "During a 5 Whys analysis on a warehouse shipping delay, the team proposes: 'The shipping supervisor was absent on Friday.'",
      question: "What evidence is required to verify that the supervisor's absence was actually a contributing cause of the delay?",
      options: [
        "Testimonial from another manager saying the supervisor takes frequent leaves.",
        "Warehouse dispatch logs showing orders ground to a halt specifically during the shift due to lack of supervisor system sign-offs.",
        "A copy of the supervisor's medical certificate.",
        "Confirmation that the supervisor owns a smartphone."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. To prove causal contribution, you must demonstrate a direct operational link: that pending shipments specifically required the supervisor's authorization token and remained blocked in the queue while the supervisor was absent."
    },
    {
      id: "setB_q4",
      scenario: "A software team conducts a 5 Whys analysis and stops at: 'Why 4: The database crashed because the cloud vendor had an unannounced global data center power failure.'",
      question: "Should the team continue asking 'Why 5: Why did the cloud vendor experience a power failure'?",
      options: [
        "Yes, because 5 Whys strictly requires reaching exactly 5 questions.",
        "No, because the internal cause of the vendor's data center outage is outside the company's direct control; the team should instead ask why the company lacked multi-region failover redundancy.",
        "Yes, the team should sue the cloud vendor.",
        "No, power failures are natural acts of God that can never be mitigated."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. You stop asking 'Why' when an external factor is outside your operational control, and redirect the inquiry back to your own architecture: 'Why did our system lack automated failover to a secondary cloud region?'"
    },
    {
      id: "setB_q5",
      scenario: "A food delivery app receives complaints that hot food arrives cold.\nWhy 1: Delivery drivers take 45 minutes to travel 3 kilometers.\nWhy 2: Drivers are assigned 4 orders simultaneously in opposite directions.",
      question: "What is the most actionable root cause indicated by this sequence?",
      options: [
        "Food packaging insulated bags are low quality.",
        "Delivery drivers ride motorcycles too slowly.",
        "The automated dispatch algorithm groups batch orders by raw volume rather than geographic route proximity.",
        "Customers live too far from their favorite restaurants."
      ],
      correctIndex: 2,
      rationale: "Option C is correct. Why 2 directly exposes an algorithmic dispatch policy defect: assigning divergent orders simultaneously. Fixing the dispatch algorithm is completely within the company's control and permanently prevents cold deliveries."
    }
  ]
};

export const practiceSetC = {
  id: "setC",
  title: "Practice Set C: Diagnose and Solve",
  subtitle: "Fishbone Categories, Prioritization & Preventive Solutions",
  durationMinutes: 10,
  questions: [
    {
      id: "setC_q1",
      scenario: "An educational coaching academy conducts a Fishbone analysis to investigate 'Low Student Test Scores'. One factor listed is: 'Classroom lighting is dim and air conditioning filters have not been cleaned for 6 months, causing drowsiness.'",
      question: "Under which Fishbone category does this factor belong?",
      options: [
        "People",
        "Process",
        "Environment",
        "Measurement"
      ],
      correctIndex: 2,
      rationale: "Option C is correct. Physical surroundings, lighting, temperature, noise levels, and workplace ergonomics fall directly under the 'Environment' category of an Ishikawa diagram."
    },
    {
      id: "setC_q2",
      scenario: "A clinical laboratory discovers 12 blood sample test results were mixed up. Two causes are identified: (1) Sample tubes had handwritten labels that blurred when chilled. (2) Lab technicians were rushing to meet an unrealistic 15-minute quota.",
      question: "How do these two causes relate to the problem?",
      options: [
        "They are mutually exclusive; only one can be true.",
        "They represent multi-causality: an information/material flaw (blurred labels) combined with a process/measurement flaw (unrealistic speed quotas).",
        "Blurry handwriting is a symptom, not a cause.",
        "Neither is relevant because laboratory equipment is automated."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. Real-world failures frequently stem from multi-causality where a physical vulnerability (un-laminated handwritten ink) interacts synergistically with a process pressure (speed quotas) to create an error."
    },
    {
      id: "setC_q3",
      scenario: "A team prioritizes four suspected causes using the formula: Score = Impact (1-5) × Frequency (1-5) × Actionability (1-5).\nCause Alpha: Impact=5, Frequency=5, Actionability=4 (Score: 100)\nCause Beta: Impact=4, Frequency=2, Actionability=5 (Score: 40)\nCause Gamma: Impact=2, Frequency=5, Actionability=2 (Score: 20)\nCause Delta: Impact=5, Frequency=1, Actionability=1 (Score: 5)",
      question: "Which cause should the engineering team tackle as their highest priority?",
      options: [
        "Cause Delta, because its Impact is 5.",
        "Cause Gamma, because its Frequency is 5.",
        "Cause Alpha, because its combined leverage score (100) reflects severe impact, high recurrence, and high team feasibility.",
        "Cause Beta, because its Actionability is 5."
      ],
      correctIndex: 2,
      rationale: "Option C is correct. High-impact alone (Delta) or high frequency alone (Gamma) without actionability wastes resources. Cause Alpha delivers maximum return on investment with a score of 100."
    },
    {
      id: "setC_q4",
      scenario: "A bank branch experiences frequent cashier cash-counting discrepancies at closing time. Management decides to: 'Require cashiers to stay unpaid until midnight whenever discrepancies occur.'",
      question: "Why is this considered a 'Weak / Flawed' solution?",
      options: [
        "It treats cashiers too gently.",
        "It penalizes individuals without addressing the process flaws (e.g., dual-custody verification, counting machines, or shift fatigue).",
        "Cash discrepancies cannot be prevented in banking.",
        "Midnight is too early for banking audits."
      ],
      correctIndex: 1,
      rationale: "Option B is correct. Punitive measures that blame individuals create resentment, fatigue (which increases errors!), and encourage workers to conceal mistakes rather than fixing process controls like automated counting scales."
    },
    {
      id: "setC_q5",
      scenario: "A web hosting company wants to ensure that a customer's database disk full outage never happens again. They consider four actions.",
      question: "Which of the following represents 'Systemic Prevention' rather than a temporary fix?",
      options: [
        "Reboot the database server whenever an outage ticket is logged.",
        "Ask system administrators to manually check disk space every Monday morning.",
        "Configure automated disk auto-expansion when capacity reaches 80%, paired with automated Prometheus alerts sent to Slack.",
        "Advise customers to delete their own old database tables."
      ],
      correctIndex: 2,
      rationale: "Option C is correct. Automated elastic auto-expansion and alert thresholds engineer the system so that human forgetfulness cannot cause a failure. This represents systemic prevention."
    }
  ]
};

// ==========================================
// 6. REAL-WORLD CASE STUDY: DECLINING ADMISSIONS
// ==========================================

export const admissionsCaseStudy = {
  title: "Case Study: Why Are Student Admissions Declining?",
  subtitle: "Apex Computer Institute – Forensic Problem Diagnosis",
  scenario: `Apex Computer Institute offers career-oriented courses in Python Full Stack, Data Analytics, and Web Design. During the management review meeting, the director noted with alarm that student admissions plunged in October despite record inquiry numbers.`,
  metricsTable: {
    headers: ["Metric", "September (Previous Month)", "October (Current Month)", "Change (%)"],
    rows: [
      ["Total Student Enquiries Received", "100", "120", "+20.0%"],
      ["Total Confirmed Student Admissions", "25", "18", "-28.0%"],
      ["Admission Conversion Rate", "25.0%", "15.0%", "-10.0% pts (-40% relative drop)"]
    ]
  },
  investigationAreas: [
    { area: "Response Time", detail: "How quickly counselors contact leads after online form submission." },
    { area: "Lead Source & Ad Quality", detail: "Where the new inquiries originated and whether demographic targeting changed." },
    { area: "Course Suitability & Prerequisites", detail: "Whether inquirer expectations match syllabus technical requirements." },
    { area: "Pricing & Payment Flexibility", detail: "Whether fee structures, installment plans, or competitor discounts factored in." },
    { area: "Follow-Up Consistency", detail: "How many touchpoints and reminders were made prior to closing." },
    { area: "Counseling Quality", detail: "Whether counselors answered curriculum and job placement questions effectively." }
  ],
  tasks: [
    {
      id: "task1",
      prompt: "Task 1: Identify the exact visible problem based on the data table.",
      options: [
        "Course syllabus is outdated.",
        "Total student admissions dropped by 28% (from 25 to 18) and conversion rate plunged from 25% to 15%, despite a 20% increase in inquiries.",
        "The marketing budget was cut by 20%.",
        "Students prefer online courses over classroom learning."
      ],
      correctIndex: 1,
      explanation: "Task 1 requires sticking to observable facts. We know inquiries grew from 100 to 120 (+20%) but admissions dropped from 25 to 18 (-28%), sinking conversion from 25% to 15%. Anything else is speculation."
    },
    {
      id: "task2",
      prompt: "Task 2: Calculate and compare the conversion rates mathematically.",
      options: [
        "Sept: 20%; Oct: 15%; Gap: -5%",
        "Sept: 25% (25/100); Oct: 15% (18/120); Net drop: 10 percentage points (a 40% relative drop in conversion efficiency).",
        "Sept: 30%; Oct: 18%; Gap: -12%",
        "Both months had identical conversion rates."
      ],
      correctIndex: 1,
      explanation: "September Conversion = 25 / 100 = 25.0%. October Conversion = 18 / 120 = 15.0%. The conversion efficiency declined by 10 percentage points, representing a relative drop of (10 / 25) = 40%."
    },
    {
      id: "task3",
      prompt: "Task 3: Why does the inquiry increase (+20%) NOT prove that the admissions process improved?",
      options: [
        "Because inquiries and admissions are completely unrelated.",
        "Because inquiries measure top-of-funnel marketing interest, not enrollment efficacy; attracting low-quality or out-of-commute leads inflates inquiries while dragging down conversions.",
        "Because marketing teams always lie about inquiry numbers.",
        "Because 120 is smaller than 100 in marketing mathematics."
      ],
      correctIndex: 1,
      explanation: "An increase in raw inquiries simply means marketing generated more traffic. If the audience is mismatched (e.g. wrong location, wrong age group, misleading ad copy), the bottom of the funnel (admissions) suffers."
    },
    {
      id: "task4",
      prompt: "Task 4: Select the group of 4 plausible hypotheses for the conversion decline that warrant investigation.",
      options: [
        "1. Counselors stopped coming to work; 2. The building caught fire; 3. Computers were stolen; 4. Fees tripled.",
        "1. Response time latency increased; 2. October ad targeting brought unqualified/distant leads; 3. Counselors lacked placement data; 4. Competitor opened aggressive campaign.",
        "1. Students do not like computers anymore; 2. Internet was shut down; 3. October has 31 days; 4. Counselors spoke in whispers.",
        "1. Weather was too rainy; 2. Google crashed; 3. Pencils ran out; 4. WhatsApp was banned."
      ],
      correctIndex: 1,
      explanation: "Professional investigation focuses on high-probability hypotheses: response latency, lead source qualification, counselor pitch quality, and competitor dynamics."
    },
    {
      id: "task5",
      prompt: "Task 5: Which specific empirical evidence is required to test whether 'Counselor Response Latency' caused the drop?",
      options: [
        "Ask the counselors if they felt busy in October.",
        "Audit CRM call logs to calculate the timestamp difference between lead form submission and the counselor's first outbound phone call across Sept vs. Oct.",
        "Check how many brochures were printed in October.",
        "Survey existing enrolled students from 2024."
      ],
      correctIndex: 1,
      explanation: "Objective timestamps from CRM telephony records provide indisputable proof of response latency. Inquiries called within 1 hour convert exponentially higher than those called after 24–48 hours."
    },
    {
      id: "task6",
      prompt: "Task 6: Audit shows counselor first-call delay surged from 2.5 hours in Sept to 46.5 hours in Oct. Which 5 Whys chain best explains this?",
      options: [
        "Counselors were lazy -> Fired counselors -> Hired new staff -> Fixed.",
        "Inquiries jumped by 20% -> Lead alerts were sent to a single shared email inbox -> Counselors manually sorted through 120 emails without assignment -> Leads sat uncalled for 2 days -> Institute lacked an automated CRM round-robin lead distributor.",
        "Website crashed -> Email disappeared -> Phone line cut -> Delay occurred -> Bad luck.",
        "Students submitted fake numbers -> Counselors gave up -> Conversion dropped."
      ],
      correctIndex: 1,
      explanation: "Option B follows a rigorous process-level causal chain: volume increase overwhelmed a manual shared email inbox, proving the root cause is the absence of an automated round-robin CRM lead routing system."
    },
    {
      id: "task7",
      prompt: "Task 7: Recommend the most effective, evidence-backed corrective action.",
      options: [
        "Offer a 50% discount on all courses immediately.",
        "Implement an automated CRM round-robin lead distribution system with an instant SMS notification and strict 2-hour SLA response rule.",
        "Force counselors to work until 10:00 PM without extra compensation.",
        "Stop running all Google and social media advertisements."
      ],
      correctIndex: 1,
      explanation: "Deploying automated CRM round-robin distribution with instant lead routing and a 2-hour SLA directly eliminates the 46.5-hour response latency at the root level."
    },
    {
      id: "task8",
      prompt: "Task 8: Define the precise quantitative metric to measure if this corrective action succeeds.",
      options: [
        "Counselor self-reported happiness score.",
        "Average lead first-contact time maintained < 60 minutes, and admission conversion rate recovering to ≥ 25% over the next 60 days.",
        "Total printed brochures distributed per week.",
        "Number of website page views."
      ],
      correctIndex: 1,
      explanation: "Success must be verified with two paired quantitative metrics: operational SLA compliance (<60 min response time) and business outcome recovery (conversion rate ≥ 25%)."
    }
  ]
};

// ==========================================
// 7. COMMON MISTAKES AND PRACTICAL TIPS
// ==========================================

export const commonMistakes = [
  {
    id: "m1",
    title: "1. Treating a Symptom as the Root Cause",
    description: "Putting a bucket under a leaking ceiling rather than repairing the cracked roof tile. The leak stops temporarily, but structural damage escalates.",
    correction: "Always ask: 'If I fix this specific item, is it physically impossible for the problem to occur again?' If it can occur again, you have only found a symptom."
  },
  {
    id: "m2",
    title: "2. Assuming Every Problem Has Only One Cause",
    description: "Believing that complex systems fail due to a single isolated trigger. In reality, plane crashes and enterprise failures result from multiple aligning flaws (The Swiss Cheese Model).",
    correction: "Use Fishbone diagrams and multi-branch 5 Whys to investigate parallel contributing factors (People + Process + Tech)."
  },
  {
    id: "m3",
    title: "3. Asking 'Why?' Without Using Evidence",
    description: "Sitting in a conference room guessing answers to 'Why?' based on personal intuition, pet theories, or seniority rather than examining logs and data.",
    correction: "Rule of Evidence: Every answer in a 5 Whys chain must cite a tangible piece of evidence (log line, timestamp, audit record, or measurement)."
  },
  {
    id: "m4",
    title: "4. Stopping at the First Plausible Explanation",
    description: "Finding an explanation that sounds logical and immediately halting the investigation before discovering the deeper systemic defect.",
    correction: "Do not stop at human error ('the cashier forgot'). Push through: 'Why did our system allow a single person's memory lapse to cause a critical failure?'"
  },
  {
    id: "m5",
    title: "5. Blaming People Instead of Examining the Process",
    description: "Concluding that an employee was 'careless, lazy, or untrained' and issuing warnings. Blame encourages employees to hide mistakes and cover up failures.",
    correction: "Adopt a Blameless Post-Mortem mindset: Assume people come to work with good intentions. Look for flawed software, ambiguous instructions, and missing safety nets."
  },
  {
    id: "m6",
    title: "6. Confusing Correlation with Causation",
    description: "Assuming that because Event B occurred right after Event A, Event A caused Event B (Post hoc ergo propter hoc).",
    correction: "Identify the exact physical or logical mechanism connecting the events. Conduct A/B isolation tests to confirm causation."
  },
  {
    id: "m7",
    title: "7. Implementing a Solution Without Checking Results",
    description: "Rolling out a corrective action, declaring victory, and walking away without monitoring post-implementation metrics.",
    correction: "Schedule mandatory 30-day, 60-day, and 90-day review checkpoints to mathematically confirm zero recurrence."
  },
  {
    id: "m8",
    title: "8. Continuing to Ask 'Why?' After Reaching an Actionable Process Cause",
    description: "Over-analyzing into philosophical infinity (e.g. asking 'Why did the universe create gravity?' after identifying that an unanchored ladder fell).",
    correction: "Stop asking 'Why?' the moment you reach an actionable root cause that your team directly controls and can permanently engineer out of existence."
  }
];

export const practicalChecklist = [
  { step: "Step 1: Problem Definition", q: "What exactly is the problem? (State who, what, where, when, and magnitude without opinions)." },
  { step: "Step 2: Evidence Gathering", q: "What objective evidence and data do I have? (Preserve logs, timestamps, records, and measurements)." },
  { step: "Step 3: Hypothesis Brainstorming", q: "What are all possible causes? (Map across People, Process, Tech, Materials, Measurement, Environment)." },
  { step: "Step 4: Empirical Testing", q: "How can I test each suspected cause? (Isolate variables with data; reject unsupported guesses)." },
  { step: "Step 5: Prioritization", q: "Which root cause has the strongest support and leverage? (Score by Impact × Frequency × Actionability)." },
  { step: "Step 6: Solution Design", q: "What corrective action permanently eliminates that cause? (Design systemic safeguards over manual vigilance)." },
  { step: "Step 7: Verification & Monitoring", q: "How will I measure long-term success? (Set quantitative KPIs and track 30/60/90-day recurrence rates)." }
];

// ==========================================
// 8. TIMED FINAL ASSESSMENT (15 INTERMEDIATE QUESTIONS)
// ==========================================

export const finalAssessmentQuestions = [
  // Distribution:
  // 3 on symptoms, immediate causes, root causes (Q1, Q2, Q3)
  // 4 on the 5 Whys technique (Q4, Q5, Q6, Q7)
  // 3 on cause-and-effect relationships (Q8, Q9, Q10)
  // 2 on fishbone diagrams (Q11, Q12)
  // 3 on evidence, corrective actions, and prevention (Q13, Q14, Q15)

  {
    id: "final_q1",
    category: "symptoms_causes",
    question: "A delivery van's engine overheated on the highway. Investigation reveals: (1) Temperature gauge needle hit the red zone. (2) Radiator coolant had completely leaked out through a cracked rubber hose. (3) The hose was 7 years old and had never been inspected because the fleet lacked a preventative maintenance schedule. Which element represents the true Root Cause?",
    options: [
      "The temperature gauge needle hitting the red zone.",
      "The complete lack of a scheduled preventative maintenance and parts-replacement program.",
      "The radiator coolant leaking out on the highway.",
      "The driver driving at high speed on a hot afternoon."
    ],
    correctIndex: 1,
    explanation: "The red gauge is the symptom. The coolant leak is the immediate cause. The failure to have a scheduled preventative maintenance program is the systemic root cause that allowed a 7-year-old degraded hose to remain in service until failure."
  },
  {
    id: "final_q2",
    category: "symptoms_causes",
    question: "Why is treating only the immediate cause of a recurring problem generally considered a wasteful strategy?",
    options: [
      "Because immediate causes are always imaginary.",
      "Because addressing the immediate cause only provides temporary containment while allowing the underlying defect to generate identical failures in the future.",
      "Because immediate causes cost more money to repair than root causes.",
      "Because immediate causes should only be handled by external consultants."
    ],
    correctIndex: 1,
    explanation: "Fixing only the immediate cause (e.g., wiping up leaked oil, restarting a crashed server, replacing a blown fuse) leaves the initiating vulnerability intact, guaranteeing future recurrence and escalating lifecycle costs."
  },
  {
    id: "final_q3",
    category: "symptoms_causes",
    question: "A college librarian observes that 35% of borrowed textbooks are returned with torn covers. The librarian suggests: 'Students do not respect books.' How should a critical thinker classify this suggestion?",
    options: [
      "An observed fact supported by book return statistics.",
      "An unverified personal opinion / assumption that misattributes human character flaw without investigating structural causes (e.g., bag size, binding quality).",
      "A confirmed root cause ready for immediate disciplinary action.",
      "A hypothesis that has already been verified."
    ],
    correctIndex: 1,
    explanation: "Attributing damage to 'students do not respect books' is an assumption and subjective opinion. A critical thinker investigates book binding durability, transit conditions, or whether the publisher used substandard glue."
  },
  {
    id: "final_q4",
    category: "five_whys",
    question: "What is the primary operational objective when performing the 5 Whys technique?",
    options: [
      "To discover which specific employee should be held financially accountable.",
      "To drill down past superficial symptoms until an actionable, systemic process defect within your control is reached.",
      "To ensure that exactly five questions are asked in every single meeting, no more and no less.",
      "To prove that management decisions are always correct."
    ],
    correctIndex: 1,
    explanation: "The purpose of 5 Whys is to move methodically from visible effect down to an actionable process or design vulnerability that the organization can permanently rectify."
  },
  {
    id: "final_q5",
    category: "five_whys",
    question: "In a 5 Whys analysis: Problem: Laboratory centrifuge machine stopped spinning.\nWhy 1: The electric motor overheated and shut down.\nWhy 2: The internal cooling fan was jammed.\nWhy 3: Thick lint and dust accumulated on the intake screen.\nWhat is the most constructive and actionable 'Why 4'?",
    options: [
      "Why did the manufacturer invent such a weak motor?",
      "Why was the intake screen not cleaned according to standard operating procedures?",
      "Why is science so complicated for lab technicians?",
      "Why did the centrifuge stop in the afternoon rather than the morning?"
    ],
    correctIndex: 1,
    explanation: "Asking why the intake screen was not cleaned directly probes the maintenance procedure, SOP execution, or cleaning schedule, which leads straight to the actionable preventive protocol."
  },
  {
    id: "final_q6",
    category: "five_whys",
    question: "When should an investigator decide to STOP asking further 'Why?' questions in a 5 Whys analysis?",
    options: [
      "Immediately after asking the third question.",
      "As soon as someone suggests a plausible theory that sounds convincing.",
      "When the analysis reaches a fundamental cause that is actionable, within organizational control, and whose elimination prevents recurrence.",
      "Only when the analysis reaches cosmic or philosophical principles outside the company."
    ],
    correctIndex: 2,
    explanation: "An investigation stops when it identifies an actionable, evidence-supported systemic cause within team control. Pushing past this point into uncontrollable macro-factors (e.g. global weather, human genetics) is unconstructive."
  },
  {
    id: "final_q7",
    category: "five_whys",
    question: "Which of the following describes the most severe danger of conducting a 5 Whys analysis without checking factual evidence at each step?",
    options: [
      "The meeting will end 10 minutes too early.",
      "The team risks building a plausible-sounding chain of fantasy that validates personal biases and solves the wrong problem.",
      "The 5 Whys cannot be written down on a whiteboard.",
      "Software tools cannot parse verbal statements."
    ],
    correctIndex: 1,
    explanation: "Without evidence (logs, timestamps, physical checks), 5 Whys devolves into '5 Guesses', leading teams to build intricate solutions for non-existent root causes while the actual defect remains untouched."
  },
  {
    id: "final_q8",
    category: "cause_effect",
    question: "A data analytics team notes that whenever company blog post publications increase, website server error rates also increase. The lead analyst claims: 'Writing blog posts directly causes our server code to crash.' What reasoning flaw did the analyst commit?",
    options: [
      "Confusing correlation with causation without investigating confounding variables (e.g., both are driven by sudden traffic surges).",
      "Using a 5 Whys technique on software architecture.",
      "Failing to calculate percentage changes with decimals.",
      "Assuming multi-causality when only one server exists."
    ],
    correctIndex: 0,
    explanation: "Correlation does not equal causation. High blog post volume and server crashes were likely both correlated with sudden visitor traffic spikes or coincidental background batch jobs, not caused by the act of blogging itself."
  },
  {
    id: "final_q9",
    category: "cause_effect",
    question: "What is the difference between a 'Necessary Cause' and a 'Contributing Factor'?",
    options: [
      "A necessary cause is always minor, while a contributing factor is always catastrophic.",
      "A necessary cause MUST be present for the problem to occur, whereas a contributing factor increases the likelihood or severity but cannot trigger the event alone.",
      "Contributing factors apply only to machines, while necessary causes apply only to humans.",
      "There is no difference; the terms are identical synonyms."
    ],
    correctIndex: 1,
    explanation: "A necessary cause is indispensable: without it, the effect cannot happen (e.g., spark for a combustion). A contributing factor facilitates or aggravates the condition (e.g., high humidity making paper jam more easily), but cannot cause it alone."
  },
  {
    id: "final_q10",
    category: "cause_effect",
    question: "A cloud platform failure occurred when (1) a fiber cable was accidentally cut by road construction, AND (2) the backup generator failed to start because its starter battery was dead. This failure scenario is a classic example of:",
    options: [
      "A single linear causal chain.",
      "Multi-causality (coinciding independent failures required to create the disaster).",
      "An unverified hypothesis.",
      "A purely psychological cognitive error."
    ],
    correctIndex: 1,
    explanation: "Multi-causality occurs when multiple distinct failures (external grid severed + internal emergency battery dead) align simultaneously to defeat system redundancy (The Swiss Cheese Model)."
  },
  {
    id: "final_q11",
    category: "fishbone",
    question: "In an Ishikawa (Fishbone) diagram investigating 'High Call Center Customer Abandonment', where should 'Slow CRM software search function' and 'Frequent headset audio static' be categorized?",
    options: [
      "People",
      "Technology / Tools",
      "Measurement",
      "Environment"
    ],
    correctIndex: 1,
    explanation: "Software search latency and faulty headset hardware are technical assets, tooling, and infrastructure, categorizing them under 'Technology / Tools'."
  },
  {
    id: "final_q12",
    category: "fishbone",
    question: "What is the primary function of a Fishbone Diagram during the initial phases of root cause analysis?",
    options: [
      "To calculate the final mathematical probability of system failure.",
      "To systematically brainstorm and visualize all potential contributing hypotheses across structured categories before testing.",
      "To replace the need for collecting empirical log files.",
      "To automatically rank employee performance ratings."
    ],
    correctIndex: 1,
    explanation: "A Fishbone diagram is a qualitative structuring tool. It ensures the team does not suffer from tunnel vision, organizing all brainstorming hypotheses across People, Process, Tech, Materials, Measurement, and Environment."
  },
  {
    id: "final_q13",
    category: "evidence_action",
    question: "When evaluating 5 competing root cause hypotheses, which criterion is most critical in elevating a hypothesis to a 'Verified Cause'?",
    options: [
      "The hypothesis was proposed by the most senior director in the room.",
      "The hypothesis is supported by direct, reproducible empirical data and demonstrated mechanisms of action.",
      "The hypothesis is the cheapest to fix.",
      "The hypothesis aligns with company traditions."
    ],
    correctIndex: 1,
    explanation: "In logical reasoning and scientific problem-solving, only objective, reproducible empirical evidence can prove a hypothesis. Seniority, convenience, or tradition carry zero diagnostic weight."
  },
  {
    id: "final_q14",
    category: "evidence_action",
    question: "A pharmacy discovers that two medications with similar-sounding names ('Lamictal' and 'Lamisil') were accidentally swapped on the shelf twice this year. Which corrective action represents 'Systemic Mistake-Proofing (Poka-Yoke)'?",
    options: [
      "Send an email reminding pharmacists to read drug labels more carefully.",
      "Implement barcode scanning verification where the register physically blocks sale unless the bottle's barcode matches the scanned prescription.",
      "Fire the pharmacist who made the second mistake.",
      "Place a handwritten yellow warning sticky note on the shelf."
    ],
    correctIndex: 1,
    explanation: "Warning emails and sticky notes rely on fallible human vigilance. Barcode hardware interlocking physically makes dispensing the wrong drug impossible, providing true systemic mistake-proofing (Poka-Yoke)."
  },
  {
    id: "final_q15",
    category: "evidence_action",
    question: "What is the final, essential step in any professional 7-Step Root Cause Action Plan?",
    options: [
      "Close the project ticket immediately after installing the software patch.",
      "Schedule follow-up review checkpoints at 30, 60, and 90 days to verify using metrics that the problem has not recurred.",
      "Celebrate with a team dinner and archive the documentation.",
      "Publish a press release stating that the issue was resolved."
    ],
    correctIndex: 1,
    explanation: "An action plan is incomplete without follow-up verification. Measuring recurrence metrics over 30/60/90 days confirms that the corrective action was effective and that no new unintended side effects emerged."
  }
];

// ==========================================
// 9. LESSON SUMMARY AND REVISION SHEET
// ==========================================

export const revisionCheatSheet = {
  title: "Day 9 Summary & Root Cause Diagnostic Cheat Sheet",
  coreTiers: [
    { term: "Symptom", meaning: "Visible manifestation that trouble exists (e.g. fever, drop in sales, error message). Never fix this alone." },
    { term: "Immediate Cause", meaning: "The direct event or trigger that caused the symptom (e.g. leaking hose, out of memory). Fix for containment only." },
    { term: "Root Cause", meaning: "The fundamental process, design, or behavioral defect that enabled the failure. Eliminating this permanently prevents recurrence." }
  ],
  fiveWhysRules: [
    "1. Define the problem with observable, bounded facts (who, what, where, when).",
    "2. Base every answer on tangible evidence, not conjecture.",
    "3. Keep each step tightly focused on the direct causal mechanism.",
    "4. Stop when you reach an actionable root cause within your operational control.",
    "5. Remember: '5' is a guideline, not a rigid constraint. Explore parallel branches."
  ],
  fishboneSixCategories: [
    { cat: "People", items: "Skills, fatigue, training, communication, workload" },
    { cat: "Process", items: "SOPs, workflows, handoffs, approvals, clarity" },
    { cat: "Technology", items: "Software, hardware, network, tooling, automation" },
    { cat: "Materials / Info", items: "Data inputs, specs, syllabi, brochures, supplies" },
    { cat: "Measurement", items: "Metrics, KPI definitions, inspection tools, calculation bias" },
    { cat: "Environment", items: "Physical workspace, noise, temperature, competition, market" }
  ],
  factsVsAssumptions: [
    { type: "Observed Fact", rule: "Measurable, verifiable data recorded without subjective bias (e.g. 'Latency was 4.2 seconds')." },
    { type: "Assumption", rule: "Something accepted as true without proof (e.g. 'Students find fees too expensive'). Dangerous!" },
    { type: "Hypothesis", rule: "A testable proposed explanation structured to be confirmed or rejected with data." },
    { type: "Verified Cause", rule: "A hypothesis empirically confirmed through testing, logs, and repeatable evidence." }
  ],
  quickChecklist: [
    "What exactly is the problem? (Facts only)",
    "What empirical evidence do I have? (Logs, timestamps)",
    "What are all possible causes? (Fishbone 6 categories)",
    "How can I test each suspected cause? (Data isolation)",
    "Which cause has the strongest support? (Evidence score)",
    "What action permanently addresses that cause? (Systemic prevention)",
    "How will I measure long-term success? (30/60/90-day tracking)"
  ]
};
