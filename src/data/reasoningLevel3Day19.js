// src/data/reasoningLevel3Day19.js
// Alpha Fly Computer Education - Logical Reasoning Level 3 (Advanced) Day 8
// Title: Advanced Root Cause Analysis, Strategic Problem-Solving and Decision Trees

export const day19Overview = {
  course: 'Logical Reasoning',
  level: 'Level 3 – Advanced',
  day: 'Day 8 (Cumulative Day 19)',
  title: 'Advanced Root Cause Analysis, Strategic Problem-Solving and Decision Trees',
  duration: '60–75 minutes',
  difficulty: 'Advanced',
  prerequisite: 'Day 7 – Advanced Data Interpretation, Analytical Reasoning and Decision-Making',
  learningObjectives: [
    'Distinguish observable symptoms from underlying immediate causes, contributing factors, and fundamental root causes.',
    'Execute rigorous 5 Whys investigations backed by empirical evidence rather than assumptions or blame.',
    'Construct comprehensive Ishikawa (Fishbone) diagrams across standardized operational categories (People, Process, Technology, Environment, Measurement, Information).',
    'Evaluate candidate causes using multi-dimensional prioritization matrices (Impact, Frequency, Evidence, Urgency, Risk of Inaction).',
    'Apply a 10-step structured problem-solving architecture to bridge performance gaps systematically.',
    'Differentiate short-term corrective containment from long-term preventive institutional remediation.',
    'Construct formal Decision Trees with Decision Nodes, Chance Nodes, Branches, and Payoff Terminals.',
    'Calculate Expected Monetary Values (EMV) via backward induction across uncertain multi-stage probabilistic outcomes.',
    'Analyze trade-offs, secondary side-effects, and reversibility (Type 1 vs. Type 2 decisions) in strategic execution.',
    'Formulate an evidence-based Action Plan with measurable Key Performance Indicators (KPIs) to verify causal resolution.'
  ]
};

export const section1UnderstandingProblems = {
  title: 'Section 1 – Understanding Complex Problems',
  introduction: `In professional operations, technology engineering, and strategic leadership, high-stakes failures are rarely isolated accidents. More commonly, they represent the cumulative manifestation of latent systemic vulnerabilities. Solving complex problems requires analytical rigor: separating surface distress signals from structural root causes.`,
  hierarchy: [
    {
      term: 'Symptom',
      definition: 'The outward, observable manifestation or distress signal indicating that a system is impaired.',
      example: 'LMS website response time spikes to 14 seconds during student login peak.',
      trap: 'Treating the symptom (e.g., restarting the web server) temporarily restores speed but guarantees the crash will recur.'
    },
    {
      term: 'Immediate Cause',
      definition: 'The direct physical or technical trigger that preceded the failure event.',
      example: 'The web server CPU hit 100% utilization and ran out of available thread pools.',
      trap: 'Stopping here leads to superficial fixes (e.g., doubling server CPU size), ignoring why threads were tied up.'
    },
    {
      term: 'Contributing Factor',
      definition: 'Environmental, operational, or behavioral conditions that increased the likelihood or severity of the failure.',
      example: 'Three different student batches were scheduled to submit their weekly lab assignments at the exact same minute (5:00 PM).',
      trap: 'Treating contributing factors as the sole cause leaves other vulnerability paths open.'
    },
    {
      term: 'Root Cause',
      definition: 'The fundamental, actionable systemic breakdown, policy void, or architectural design flaw which, if permanently resolved, prevents recurrence of the symptom.',
      example: 'Assignment submission API processes multipart media uploads synchronously in the main web thread instead of asynchronously offloading to object storage via presigned URLs.',
      trap: 'Blaming "human error" or "students submitting late" instead of identifying the underlying structural flaw.'
    }
  ],
  corePrinciples: [
    {
      principle: '1. The Iceberg Model (Symptoms vs Root Causes)',
      detail: 'Symptoms occupy the top 10% of visible operational reality. The underlying 90% consists of systemic processes, architecture, governance guidelines, and unexamined institutional assumptions.'
    },
    {
      principle: '2. Multi-Factor Convergence (The Swiss Cheese Model)',
      detail: 'Catastrophic failures rarely stem from a single broken part. They happen when multiple defensive layers (validation, testing, monitoring, training) each possess latent holes that momentarily align.'
    },
    {
      principle: '3. One Root Cause, Many Diverse Symptoms',
      detail: 'A single unpatched DNS server can simultaneously generate website connection drops, missing email alerts, point-of-sale timeouts, and failed automated student grade syncs.'
    },
    {
      principle: '4. Correlation Never Establishes Causation in RCA',
      detail: 'Just because student absenteeism spikes on rainy Mondays does not prove rain causes absenteeism. Empirical audit may reveal a scheduling clash with a mandatory off-campus industrial visit.'
    },
    {
      principle: '5. Evidentiary Audit Standard',
      detail: 'A hypothesized root cause must be corroborated by physical logs, timestamped data, or reproducible tests. A plausible explanation without evidence is merely an untested hypothesis.'
    }
  ],
  warmupQuestions: [
    {
      id: 'wu1',
      question: 'During a morning lab examination, 35 student computers suddenly lost internet access. The lab technician immediately rebooted the main router, which restored internet connectivity for the rest of the day. Which of the following statements is analytically correct?',
      options: [
        'The root cause of the network outage was permanently resolved because connectivity was restored.',
        'The technician treated an immediate symptom/trigger, but the underlying root cause remains uninvestigated and may recur.',
        'The router hardware is defective and must be discarded immediately without further diagnostic inspection.',
        'The 35 students caused the outage by opening high-bandwidth applications simultaneously.'
      ],
      correct: 1,
      explanation: 'Rebooting the router cleared its internal routing table and memory state (treating the immediate symptom), which temporarily restored service. However, what caused the router to hang (memory leak, broadcast storm, overheating, firmware bug) remains uninvestigated. Without root cause analysis, the failure can recur during any subsequent examination.'
    },
    {
      id: 'wu2',
      question: 'An educational institute notices that whenever student satisfaction scores drop below 70%, enrollment in the subsequent term declines by 15%. A manager concludes: "Dropping satisfaction directly causes declining enrollment." What analytical flaw exists in this conclusion?',
      options: [
        'The manager confused an immediate cause with a symptom.',
        'The manager assumed a direct causal relationship without investigating confounding variables (e.g., economic downturn, tuition fee hikes, competitor discounts).',
        'Enrollment figures can never be analyzed using quantitative percentages.',
        'Student satisfaction surveys are always 100% statistically invalid.'
      ],
      correct: 1,
      explanation: 'While dropping satisfaction and declining enrollment correlate strongly, correlation does not establish unilateral causation. Confounding third variables—such as an abrupt local fee increase or a competitor opening nearby—could independently drive both lower satisfaction and lower enrollments.'
    },
    {
      id: 'wu3',
      question: 'Which of the following best defines a true "Root Cause" in operational problem-solving?',
      options: [
        'The person who made the final mistake before the breakdown occurred.',
        'The most expensive component in the system that failed during operation.',
        'The deepest underlying systemic or architectural defect that, when corrected, permanently prevents recurrence of the problem.',
        'The first explanation proposed by senior management during an emergency meeting.'
      ],
      correct: 2,
      explanation: 'A true root cause is systemic, actionable, and fundamental. Fixing it eliminates the recurrence of the breakdown across all similar future contexts, unlike superficial human-blame or quick-fix workarounds.'
    }
  ]
};

export const section2FiveWhysAnalysis = {
  title: 'Section 2 – Advanced 5 Whys Analysis',
  introduction: `Developed by Sakichi Toyoda for the Toyota Production System, the 5 Whys technique is an iterative interrogative technique used to explore the cause-and-effect relationships underlying a particular problem. The primary goal is to determine the root cause of a defect or problem by repeating the question "Why?".`,
  methodologySteps: [
    { step: '1. State the Problem Objectively', desc: 'Define what happened, where, when, and the measurable magnitude of the impact. Avoid vague emotional statements.' },
    { step: '2. Ask the First "Why?"', desc: 'Identify the direct physical or technical mechanism that caused the event to take place.' },
    { step: '3. Demand Empirical Proof', desc: 'Each answer must be supported by verifiable logs, timestamps, or physical inspections—not speculative assumptions.' },
    { step: '4. Chain Successive "Why?" Inquiries', desc: 'Ask why the preceding condition occurred. Trace the breakdown upstream through process, policy, and architecture.' },
    { step: '5. Branch When Multi-Causal', desc: 'If an event required two concurrent conditions to occur, split the 5 Whys into parallel branch paths.' },
    { step: '6. Recognize the Stopping Criteria', desc: 'Stop when you reach a fundamental systemic policy, process rule, or architectural design within your control to remediate.' },
    { step: '7. Deploy Preventive Countermeasures', desc: 'Formulate an institutional fix (process automation, defensive design, architectural refactoring) rather than human admonishment.' }
  ],
  workedExamples: [
    {
      id: 'ex5w1',
      title: 'Example 1: Computer Lab Session Starts 20 Minutes Late',
      problemStatement: 'On Monday morning, Batch A-04 (40 students) was unable to begin their Python Programming Practical on time because the lab remained locked.',
      chain: [
        { why: 'Why was the lab locked at 9:00 AM?', answer: 'The instructor did not have the physical RFID smart card to open the digital door lock.', evidence: 'Security door audit log shows 0 unlock attempts before 9:20 AM.' },
        { why: 'Why did the instructor not have the RFID card?', answer: 'The instructor left the card at home after changing bags over the weekend.', evidence: 'Instructor personal statement and security sign-in log.' },
        { why: 'Why was the entire class dependent on a single instructor card?', answer: 'The lab digital lock has only one primary master card assigned per batch with no backup key protocol.', evidence: 'Lab asset registry confirms only 1 active RFID key issued.' },
        { why: 'Why was there no automated backup or administrative override protocol?', answer: 'The department SOP specifies physical key handover but lacks a digital emergency dual-custody override or front-desk access code.', evidence: 'Operations SOP Manual Section 4.2.' },
        { why: 'Why has the SOP not been updated to support digital redundant access?', answer: 'Facility access policies are reviewed annually without operational hazard assessments for single-point-of-failure risks.', evidence: 'Facility governance schedule shows last review was 18 months ago.' }
      ],
      alternativeExplanations: 'The door lock battery was dead (disproven: lock worked immediately at 9:20 AM when the spare was brought from central storage).',
      defensibleRootCause: 'Absence of an operational redundancy protocol (dual-custody cloud passcode / duty-officer override) and failure to audit facilities for single-point-of-failure vulnerabilities.',
      correctiveAction: 'Install keypad dual-factor master access code tied to the LMS attendance dashboard and issue an authorized duty-supervisor master card stored in a secure key safe.',
      measurableMetric: 'Zero delayed lab session starts due to access failure over the next 180 academic days.'
    },
    {
      id: 'ex5w2',
      title: 'Example 2: Students Miss Weekly Assignment Deadlines',
      problemStatement: 'In the Data Analytics module, 46% of students in Batch 3 failed to submit their weekend case study by the Sunday 11:59 PM deadline.',
      chain: [
        { why: 'Why did 46% of students fail to submit before 11:59 PM?', answer: 'The LMS portal timed out and threw HTTP 504 Gateway errors between 11:45 PM and 11:59 PM.', evidence: 'Nginx server access logs show 184 gateway timeout errors during that 15-minute window.' },
        { why: 'Why did the portal throw HTTP 504 Gateway errors?', answer: 'The web application server exhausted its database connection pool and worker memory limits.', evidence: 'PostgreSQL connection pool reached maximum capacity (100/100 active connections).' },
        { why: 'Why was the database connection pool exhausted?', answer: 'Students were uploading uncompressed 250 MB CSV datasets, and the backend was validating rows synchronously inside active database transactions.', evidence: 'APM application traces reveal transactions lasting >45 seconds per student upload.' },
        { why: 'Why were uncompressed large files allowed in synchronous transactions?', answer: 'The file upload endpoint lacked client-side file compression and maximum file-size throttling.', evidence: 'Frontend React form had no `maxSize` prop or client-side zip compression hook.' },
        { why: 'Why was client-side validation and asynchronous S3 offloading missing?', answer: 'The LMS assignment module was rapidly released as an internal MVP without non-functional requirements review or load-stress testing.', evidence: 'Sprint backlog shows zero load test tickets completed prior to deployment.' }
      ],
      alternativeExplanations: 'Students were simply lazy and procrastinated (disproven: timestamps show 38 students attempted submission between 11:30 PM and 11:45 PM before server hung).',
      defensibleRootCause: 'Architectural defect in upload handling (synchronous processing inside DB transactions) combined with the absence of non-functional load-testing in the development lifecycle.',
      correctiveAction: 'Refactor upload architecture to use Amazon S3 presigned URLs with client-side file size caps (<25 MB) and asynchronous background Celery worker processing.',
      measurableMetric: 'LMS submission success rate $\ge 99.9\%$ during peak submission windows across all subsequent deadlines.'
    },
    {
      id: 'ex5w3',
      title: 'Example 3: Website Form Receives Fewer Completed Submissions',
      problemStatement: 'The online course enquiry form experienced a 65% drop in completed submissions over a 14-day period following a website redesign.',
      chain: [
        { why: 'Why did completed form submissions drop by 65%?', answer: 'Mobile visitors (which account for 78% of web traffic) abandoned the form at Step 2 (Phone Number entry).', evidence: 'Google Analytics funnel visualization indicates an 82% drop-off at input field `user_phone` on mobile devices.' },
        { why: 'Why did mobile users abandon the form at the phone input field?', answer: 'The form prevented submission by showing an invisible validation error stating "Invalid Phone Format".', evidence: 'Session replay software reveals mobile users repeatedly tapping the disabled "Submit" button.' },
        { why: 'Why was an invalid format error triggered on valid mobile phone numbers?', answer: 'The updated validation regex required phone numbers with hyphens (`XXX-XXX-XXXX`), but mobile keypads automatically popped up the numeric-only keyboard (`type="number"`) which lacks hyphens.', evidence: 'HTML source code inspection shows `<input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">`.' },
        { why: 'Why did the input pattern conflict with the input type?', answer: 'A junior front-end developer copied the regex from a desktop-only template without testing on mobile viewports.', evidence: 'Git commit history confirms commit `#f82d1` authored by an intern without mobile testing.' },
        { why: 'Why was this mobile incompatibility not caught before production deployment?', answer: 'The QA deployment pipeline lacks automated end-to-end mobile device emulators and cross-browser regression test suites.', evidence: 'CI/CD pipeline runs only desktop Chrome headless unit tests.' }
      ],
      alternativeExplanations: 'Course demand dropped due to seasonal shifts (disproven: direct phone-in enquiries remained at normal volume).',
      defensibleRootCause: 'Inadequate QA pipeline lacking automated mobile viewport validation and cross-device testing before code merges to production.',
      correctiveAction: 'Standardize phone inputs to flexible unformatted digit parsers (`libphonenumber-js`) and implement automated Playwright mobile test suites in the GitHub Actions CI pipeline.',
      measurableMetric: 'Mobile enquiry form completion rate returns to $\ge 18\%$ within 72 hours of hotfix release.'
    },
    {
      id: 'ex5w4',
      title: 'Example 4: Software Report Contains Incorrect Figures',
      problemStatement: 'The monthly Finance and Enrollment Reconciliation report showed a ₹2,40,000 revenue discrepancy between fees collected and course admissions.',
      chain: [
        { why: 'Why did the reconciliation report show a ₹2,40,000 discrepancy?', answer: '12 students enrolled in the Full-Stack Web Development Course were counted as "Paid" in LMS but showed "Zero Fees" in Tally ERP.', evidence: 'Cross-table diff between LMS student registry and Tally ERP transaction log.' },
        { why: 'Why were they active in LMS without a corresponding payment record in Tally?', answer: 'An administrator manually toggled their enrollment status to "Active" via the backend admin panel.', evidence: 'Audit log confirms manual override by admin user ID #4.' },
        { why: 'Why did the administrator manually activate their course accounts?', answer: 'Students presented UPI transaction screenshots via WhatsApp to the front office to obtain immediate access on the weekend.', evidence: 'Front office WhatsApp chat history and admission slip notes.' },
        { why: 'Why did the front office rely on manual WhatsApp screenshots instead of automated payment gateway webhooks?', answer: 'The weekend admission surge overwhelmed the counter, and the bank payment gateway webhook had failed without notifying staff.', evidence: 'Payment gateway dashboard shows 12 webhook delivery attempts failed with HTTP 500 error.' },
        { why: 'Why did the webhook fail without alerting tech or finance personnel?', answer: 'The webhook endpoint had no automated retry queue (Dead Letter Queue) or failure monitoring alert.', evidence: 'Server codebase shows webhook receiver lacks try/catch logging and dead-letter queueing.' }
      ],
      alternativeExplanations: 'Students fabricated fake payment screenshots (disproven: bank account statement showed the funds were indeed received).',
      defensibleRootCause: 'Lack of fault-tolerant webhook integration (no Dead Letter Queue, automated reconciliation, or failure alerting) and an informal manual override loophole bypassing financial reconciliation.',
      correctiveAction: 'Implement automated payment webhook retry with AWS SQS Dead Letter Queue, disable manual administrative LMS account activation without verified payment ID, and run automated hourly reconciliation scripts.',
      measurableMetric: 'Zero unreconciled manual enrollment discrepancies in monthly audit.'
    },
    {
      id: 'ex5w5',
      title: 'Example 5: Software Team Repeatedly Misses Project Milestones',
      problemStatement: 'The LMS Engineering Team missed their Sprint 6 and Sprint 7 milestone delivery deadlines by an average of 9 business days.',
      chain: [
        { why: 'Why did the engineering team miss consecutive sprint milestones?', answer: 'Senior developers spent 60% of their sprint hours resolving urgent customer support escalation tickets rather than writing scheduled feature code.', evidence: 'Jira timesheet logs reveal 182 hours logged to "Tier 3 Escalations" versus 120 hours on "Feature Roadmap".' },
        { why: 'Why were senior developers handling customer support escalations?', answer: 'The Tier 1 and Tier 2 customer support teams escalated user tickets directly to engineering without initial technical triage.', evidence: 'Zendesk ticket routing logs show 74% of tickets assigned directly to engineering queue.' },
        { why: 'Why did Tier 1 and Tier 2 support escalate tickets without triage?', answer: 'Support personnel lacked diagnostic documentation, error code glossaries, and administrative debug tools.', evidence: 'Internal knowledge base has zero runbooks for LMS error codes 400-500.' },
        { why: 'Why did support lack diagnostic runbooks and documentation?', answer: 'Engineering releases new feature updates without delivering customer support training or internal technical documentation.', evidence: 'Product release notes contain marketing summaries but zero technical troubleshooting guides.' },
        { why: 'Why are features released without support documentation?', answer: 'The team "Definition of Done" (DoD) only requires passing unit tests and code review, completely omitting operational handoff documentation.', evidence: 'Engineering Agile charter document DoD checklist.' }
      ],
      alternativeExplanations: 'Sprint velocity estimations were unrealistically aggressive (disproven: feature estimates matched historical execution velocity prior to ticket surge).',
      defensibleRootCause: 'Flawed organizational governance: The engineering "Definition of Done" failed to include support documentation and operational readiness criteria, creating an unmitigated escalation loop.',
      correctiveAction: 'Revise the Definition of Done to require approved support runbooks and diagnostic tooling before any feature can merge into production.',
      measurableMetric: 'Senior developer escalation time reduced from 60% to $<10\%$ within two sprint cycles.'
    }
  ]
};

export const section3FishboneAnalysis = {
  title: 'Section 3 – Cause-and-Effect and Fishbone (Ishikawa) Analysis',
  introduction: `Devised by Kaoru Ishikawa in 1968, the Fishbone Diagram (also known as the Cause-and-Effect or Ishikawa Diagram) is a structured brainstorming tool designed to map all potential contributing causes to a single defined effect or defect. Rather than focusing on a single linear chain (like 5 Whys), the Fishbone organizes multi-system complexity into thematic branches.`,
  categories: [
    { name: 'People (Workforce)', focus: 'Skills, training, fatigue, workload, communication gaps, supervision, compliance with procedures.' },
    { name: 'Process (Methods)', focus: 'SOPs, workflows, approval chains, documentation, handoff rules, testing protocols, operational sequencing.' },
    { name: 'Technology & Equipment', focus: 'Hardware specifications, network bandwidth, software bugs, server capacities, tool availability, firmware stability.' },
    { name: 'Environment', focus: 'Physical lab layout, temperature, ambient noise, lighting, work-from-home conditions, psychological safety.' },
    { name: 'Measurement', focus: 'Metrics, KPIs, sensor calibrations, test rigor, scoring rubrics, monitoring frequency, benchmark validity.' },
    { name: 'Information (Data)', focus: 'Accuracy of source records, data timeliness, communication channels, syllabus clarity, documentation accessibility.' }
  ],
  workedDiagrams: [
    {
      id: 'fb1',
      title: 'Fishbone 1: High Student Dropout Rate in Advanced Weekend Batches (32% Dropout)',
      effect: '32% Student Dropout Rate in Weekend Advanced Python & Data Science Batch',
      branches: [
        {
          category: 'People',
          causes: [
            { cause: 'Instructor fatigue from 6-day teaching schedules', status: 'Verified by HR time-logs' },
            { cause: 'Wide disparity in student prerequisite programming literacy', status: 'Verified by diagnostic test scores' },
            { cause: 'Lack of dedicated teaching assistants for one-on-one debugging', status: 'Confirmed by staffing roster' }
          ]
        },
        {
          category: 'Process',
          causes: [
            { cause: 'Inflexible absence makeup policy (missed class = permanent knowledge gap)', status: 'Verified in student handbook' },
            { cause: 'Lab assignments scheduled immediately without intervening practice buffer', status: 'Verified in curriculum calendar' }
          ]
        },
        {
          category: 'Technology',
          causes: [
            { cause: 'LMS lecture recording cloud uploads delayed by 4-5 days', status: 'Verified by cloud upload timestamps' },
            { cause: 'Jupyter notebook cloud server crashes under simultaneous compilation', status: 'Server logs confirm OOM errors' }
          ]
        },
        {
          category: 'Environment',
          causes: [
            { cause: '6-hour marathon weekend lecture sessions without adequate rest intervals', status: 'Class schedule timetable' },
            { cause: 'Classroom AC thermal instability causing afternoon cognitive drowsiness', status: 'Facilities maintenance log' }
          ]
        }
      ],
      investigationFinding: 'The primary verified systemic drivers are the lack of timely lecture recording access (Technology) and the absence of a structured makeup mechanism (Process) when working adult learners inevitably miss a weekend session.'
    },
    {
      id: 'fb2',
      title: 'Fishbone 2: Frequent Online Examination Server Crashes',
      effect: 'Online Exam Portal Crashing at Minute 0 of High-Stakes Assessments',
      branches: [
        {
          category: 'Technology',
          causes: [
            { cause: 'Database locks on simultaneous student login token generation', status: 'DB deadlock logs' },
            { cause: 'Single server instance without auto-scaling group configured', status: 'AWS infrastructure audit' }
          ]
        },
        {
          category: 'Process',
          causes: [
            { cause: 'All 500 exam candidates instructed to log in at the exact same second', status: 'Exam instruction email' },
            { cause: 'Pre-exam stress load testing omitted in release sprint', status: 'Jira release history' }
          ]
        },
        {
          category: 'Measurement',
          causes: [
            { cause: 'Server health monitoring alert polling on 10-minute intervals (too slow to catch spikes)', status: 'Datadog monitor config' },
            { cause: 'Zero APM tracing enabled for student session telemetry', status: 'New Relic agent absent' }
          ]
        },
        {
          category: 'People',
          causes: [
            { cause: 'Proctors instructing students to repeatedly refresh browsers when delay occurs', status: 'Proctor interview testimony' },
            { cause: 'Absence of dedicated DevOps standby engineer during exam kickoff', status: 'Duty roster' }
          ]
        }
      ],
      investigationFinding: 'Root vulnerability: Concentrated traffic surge triggered by synchronized login instructions (Process) hitting an un-scaled monolithic infrastructure (Technology).'
    },
    {
      id: 'fb3',
      title: 'Fishbone 3: Inconsistent Student Practical Scores Across 3 Campus Labs',
      effect: 'Campus Center C Average Practical Exam Score is 24% Lower than Centers A & B',
      branches: [
        {
          category: 'Technology',
          causes: [
            { cause: 'Center C computers use mechanical HDDs with 4x slower code compilation', status: 'Hardware inventory audit' },
            { cause: 'Center C Python IDE version 3.8 vs Center A/B using version 3.11 with newer syntax support', status: 'Lab software audit' }
          ]
        },
        {
          category: 'Measurement',
          causes: [
            { cause: 'Center C proctors grade code manually while Center A/B use automated unit test runner', status: 'Grading rubric documentation' },
            { cause: 'Subjective deduction of points for code styling differences at Center C', status: 'Instructor grade sheets' }
          ]
        },
        {
          category: 'Environment',
          causes: [
            { cause: 'Center C lab suffers intermittent street noise and poor acoustic insulation', status: 'Site visit report' }
          ]
        },
        {
          category: 'Information',
          causes: [
            { cause: 'Center C students received an outdated syllabus sheet without sample test cases', status: 'Handout printing logs' }
          ]
        }
      ],
      investigationFinding: 'The discrepancy is primarily driven by Measurement bias (manual subjective grading vs automated unit test runners) and Technology disparity (outdated Python IDE and hardware latency).'
    },
    {
      id: 'fb4',
      title: 'Fishbone 4: High Costs and Dispatch Delays in Course Physical Kit Distribution',
      effect: 'Average Course Welcome Kit Delivery Time Exceeds 18 Days (Target: 4 Days)',
      branches: [
        {
          category: 'Process',
          causes: [
            { cause: 'Manual address entry by staff into separate courier portals', status: 'Staff workflow observation' },
            { cause: 'Kits dispatched in individual ad-hoc batches rather than daily scheduled pickups', status: 'Courier manifest logs' }
          ]
        },
        {
          category: 'Information',
          causes: [
            { cause: 'Student postal address data contains 22% missing pin codes or typos', status: 'Database address query' },
            { cause: 'Inventory stockouts uncommunicated between warehouse and admissions', status: 'Stock audit report' }
          ]
        },
        {
          category: 'People',
          causes: [
            { cause: 'Front desk staff packaging kits manually between phone calls', status: 'Front desk duty roster' },
            { cause: 'Lack of designated logistics coordinator role', status: 'Org chart review' }
          ]
        },
        {
          category: 'Technology',
          causes: [
            { cause: 'Zero API integration between CRM admissions and logistics courier partners', status: 'IT systems architecture map' }
          ]
        }
      ],
      investigationFinding: 'Primary structural bottleneck: Lack of automated API integration (Technology) and unvalidated address entry at the point of enrollment (Information).'
    }
  ],
  interactiveExercise: {
    title: 'Interactive Fishbone Categorization Drill',
    instructions: 'Categorize each of the 8 candidate causes into the correct Fishbone operational branch for the problem: "Students failing the Database SQL Capstone Project".',
    items: [
      { id: 'c1', text: 'MySQL server memory limit set to default 128 MB on student lab workstations', category: 'Technology' },
      { id: 'c2', text: 'Project assignment instructions handed out without ER-diagram design guidelines', category: 'Information' },
      { id: 'c3', text: 'Grading rubric evaluates query execution time without standardizing computer CPU models', category: 'Measurement' },
      { id: 'c4', text: 'Students allowed only 2 days between learning advanced subqueries and final project submission', category: 'Process' },
      { id: 'c5', text: 'Lab room temperature exceeding 34°C due to malfunctioning air conditioning units', category: 'Environment' },
      { id: 'c6', text: 'Teaching assistants providing conflicting guidance on normalization standards (3NF vs BCNF)', category: 'People' },
      { id: 'c7', text: 'Automated test suite failing queries due to strict trailing whitespace mismatches', category: 'Technology' },
      { id: 'c8', text: 'Late project submission policy not documented in student LMS syllabus', category: 'Process' }
    ]
  }
};

export const section4RootCausePrioritization = {
  title: 'Section 4 – Root Cause Prioritization & Evidence Evaluation',
  introduction: `Brainstorming via Fishbone or 5 Whys typically generates a multitude of plausible candidate causes. However, attempting to solve every candidate simultaneously squanders organizational capital. Analytical leaders apply structured Prioritization Scoring to determine which hypotheses must be investigated first.`,
  prioritizationCriteria: [
    { name: 'Impact (1–5)', desc: 'If this cause is genuine, how severe is the damage to student outcomes, revenue, or operational continuity? (1 = Negligible, 5 = Critical failure).' },
    { name: 'Frequency (1–5)', desc: 'How frequently does this failure condition occur? (1 = Rare annual anomaly, 5 = Occurs daily/in every batch).' },
    { name: 'Evidence Strength (1–5)', desc: 'How robust is our empirical proof right now? (1 = Speculative rumor, 5 = Hard timestamped log data).' },
    { name: 'Urgency (1–5)', desc: 'How fast will the damage compound if unaddressed? (1 = Can wait a quarter, 5 = Immediate danger within 24 hours).' },
    { name: 'Ease of Testing / Validation (1–5)', desc: 'How quickly and cheaply can we test this hypothesis? (1 = Requires costly 6-month trial, 5 = Can verify in 10 minutes).' },
    { name: 'Risk of Inaction (1–5)', desc: 'What is the institutional exposure (legal, reputational, financial) if this cause is ignored? (1 = Low, 5 = Catastrophic).' }
  ],
  scoringScaleGuide: 'Scores range from 1 to 5. The Composite Priority Index (PI) is calculated as: PI = (Impact × 0.30) + (Frequency × 0.25) + (Risk of Inaction × 0.20) + (Evidence Strength × 0.15) + (Ease of Testing × 0.10). A higher score means "Investigate and Validate Immediately", NOT that the cause is automatically confirmed.',
  workedExamples: [
    {
      id: 'prio1',
      title: 'Triage: 4 Candidate Causes for Video Lecture Buffering on Mobile LMS',
      problem: 'Mobile learners experiencing severe buffering during evening lecture playback.',
      candidates: [
        {
          cause: 'A. Cloud CDN edge server lacks regional caching in South India',
          impact: 4.5,
          frequency: 4.0,
          riskInaction: 4.0,
          evidence: 4.5,
          easeTesting: 5.0,
          compositeScore: 4.33,
          rationale: 'High impact across all evening mobile users; CDN traffic logs can be verified within 15 minutes.',
          action: 'Audit AWS CloudFront regional cache hit ratio immediately; if <60%, enable Chennai edge location.'
        },
        {
          cause: 'B. Students have slow personal mobile cellular data connections (2G/3G)',
          impact: 2.0,
          frequency: 3.5,
          riskInaction: 1.5,
          evidence: 2.0,
          easeTesting: 2.5,
          compositeScore: 2.33,
          rationale: 'External factor outside institutional control; does not explain why buffering only started after last week update.',
          action: 'Deprioritize for now; collect client connection telemetry over time.'
        },
        {
          cause: 'C. Video files encoded at fixed 4K bitrate without adaptive HLS bitrate streaming',
          impact: 5.0,
          frequency: 5.0,
          riskInaction: 4.5,
          evidence: 5.0,
          easeTesting: 4.5,
          compositeScore: 4.85,
          rationale: 'Highest structural leverage. Transcoding to 720p/480p HLS streaming solves buffering universally across devices.',
          action: 'Top Priority! Check video encoding pipeline and implement adaptive multi-bitrate HLS conversion.'
        },
        {
          cause: 'D. Mobile phone operating system battery saver throttling background network',
          impact: 1.5,
          frequency: 1.5,
          riskInaction: 1.0,
          evidence: 1.5,
          easeTesting: 2.0,
          compositeScore: 1.45,
          rationale: 'Extremely localized to rare phone models with negligible overall institutional impact.',
          action: 'Log as low-priority FAQ troubleshooting tip; no active engineering investment.'
        }
      ]
    },
    {
      id: 'prio2',
      title: 'Triage: High Student Absenteeism on Monday Morning Classes (Batch Alpha)',
      problem: 'Monday 8:30 AM attendance averages 54% compared to 91% Tuesday through Friday.',
      candidates: [
        {
          cause: 'A. Commute transport buses do not run early on Monday morning routes',
          impact: 4.0,
          frequency: 4.5,
          riskInaction: 3.5,
          evidence: 4.0,
          easeTesting: 4.5,
          compositeScore: 4.08,
          rationale: 'Bus route schedules can be verified in 1 hour by cross-checking municipal transit timetables.',
          action: 'Audit municipal bus schedules for 7:30–8:15 AM window; survey absent students commute mode.'
        },
        {
          cause: 'B. Sunday night social fatigue / general student procrastination',
          impact: 2.0,
          frequency: 3.0,
          riskInaction: 1.5,
          evidence: 1.5,
          easeTesting: 2.0,
          compositeScore: 2.08,
          rationale: 'Vague speculative behavioral assumption without actionable institutional remediation.',
          action: 'Deprioritize; avoid blaming student character without structural investigation.'
        },
        {
          cause: 'C. Monday 8:30 AM class is scheduled as a theoretical lecture with no practical lab credits',
          impact: 4.5,
          frequency: 4.0,
          riskInaction: 4.0,
          evidence: 4.0,
          easeTesting: 4.0,
          compositeScore: 4.15,
          rationale: 'Curriculum structure strongly dictates attendance incentive; swapping to a hands-on project lab can be tested easily.',
          action: 'Examine student attendance correlation by subject type across different terms; propose timetable swap.'
        }
      ]
    },
    {
      id: 'prio3',
      title: 'Triage: 3 Operational Bottlenecks in Certificate Printing & Dispatch',
      problem: 'Graduating students waiting 28 days for physical printed certificates.',
      candidates: [
        {
          cause: 'A. Single physical printer frequently runs out of toner and specialized parchment paper',
          impact: 3.5,
          frequency: 4.0,
          riskInaction: 3.0,
          evidence: 4.5,
          easeTesting: 5.0,
          compositeScore: 3.83,
          rationale: 'Easily confirmed by checking inventory records and supply reorder lead times.',
          action: 'Establish minimum 3-unit safety buffer stock for toner and certificate paper.'
        },
        {
          cause: 'B. Physical ink signature required from Institute Director who travels 15 days/month',
          impact: 5.0,
          frequency: 5.0,
          riskInaction: 4.5,
          evidence: 5.0,
          easeTesting: 4.0,
          compositeScore: 4.80,
          rationale: 'Major administrative bottleneck; single-point-of-failure holding up hundreds of completed credentials.',
          action: 'Top Priority! Propose policy transition to cryptographically secure digital signatures with QR verification.'
        },
        {
          cause: 'C. Courier delivery van arrives at 2:00 PM instead of 11:00 AM for dispatch pickup',
          impact: 1.5,
          frequency: 2.5,
          riskInaction: 1.5,
          evidence: 3.0,
          easeTesting: 4.0,
          compositeScore: 2.23,
          rationale: 'A 3-hour courier pickup difference causes at most a 24-hour delay, not a 28-day bottleneck.',
          action: 'Deprioritize; this is a trivial secondary symptom.'
        }
      ]
    },
    {
      id: 'prio4',
      title: 'Triage: 3 Potential Vulnerabilities in Student SQL Database Workstations',
      problem: 'Student test databases randomly dropping tables during practical exams.',
      candidates: [
        {
          cause: 'A. Automated nightly disk cleanup script deleting active MySQL temporary tablespaces',
          impact: 5.0,
          frequency: 3.5,
          riskInaction: 5.0,
          evidence: 4.5,
          easeTesting: 5.0,
          compositeScore: 4.55,
          rationale: 'Can be validated instantly by reviewing cron scheduler logs on the database host.',
          action: 'Top Priority! Inspect `/etc/cron.daily/cleanup.sh` and disable wild-card temp file purging.'
        },
        {
          cause: 'B. Malicious student intentionally executing `DROP DATABASE` scripts on peers',
          impact: 4.0,
          frequency: 1.0,
          riskInaction: 3.5,
          evidence: 1.5,
          easeTesting: 3.0,
          compositeScore: 2.68,
          rationale: 'Dramatic assumption without server audit proof; investigate technical mechanisms first.',
          action: 'Check MySQL query audit logs for foreign connection IP addresses.'
        },
        {
          cause: 'C. Unfiltered shared database user credentials (`root` with blank password) on all workstations',
          impact: 5.0,
          frequency: 5.0,
          riskInaction: 5.0,
          evidence: 5.0,
          easeTesting: 5.0,
          compositeScore: 5.00,
          rationale: 'Urgent systemic vulnerability. Allows any user to accidentally overwrite or drop shared databases.',
          action: 'Immediate Emergency Action! Provision isolated containerized database instances per student.'
        }
      ]
    },
    {
      id: 'prio5',
      title: 'Triage: Drivers Behind Declining Corporate Training Inquiries',
      problem: 'Corporate B2B training inquiries declined by 40% quarter-over-quarter.',
      candidates: [
        {
          cause: 'A. Outdated course catalog missing in-demand Generative AI and Agentic AI modules',
          impact: 5.0,
          frequency: 4.5,
          riskInaction: 5.0,
          evidence: 4.0,
          easeTesting: 3.5,
          compositeScore: 4.58,
          rationale: 'Competitor benchmarking confirms corporate clients are reallocating training budgets to GenAI and cloud automation.',
          action: 'Launch 2-week curriculum modernization sprint with industry advisory board.'
        },
        {
          cause: 'B. Corporate brochure graphic design looks dated and lacks modern typography',
          impact: 2.0,
          frequency: 2.5,
          riskInaction: 1.5,
          evidence: 2.0,
          easeTesting: 4.0,
          compositeScore: 2.23,
          rationale: 'Superficial cosmetic element; does not override syllabus relevance and corporate ROI.',
          action: 'Refresh brochure styling during next scheduled marketing update.'
        },
        {
          cause: 'C. Enterprise inquiries sent to a legacy email inbox that is only checked once weekly',
          impact: 5.0,
          frequency: 5.0,
          riskInaction: 4.5,
          evidence: 5.0,
          easeTesting: 5.0,
          compositeScore: 4.90,
          rationale: 'Critical operational failure. Corporate buyers expect responses within 4 hours, not 7 days.',
          action: 'Top Priority! Forward corporate inbox to CRM auto-assign pipeline with 2-hour SLA alerts.'
        }
      ]
    }
  ]
};

export const section5StrategicProblemSolving = {
  title: 'Section 5 – Structured Strategic Problem-Solving Architecture',
  introduction: `Solving a problem strategically means developing a resilient, repeatable solution that accounts for operational constraints, second-order consequences, and implementation trade-offs. It bridges the gap between diagnosing the root cause and achieving sustainable organizational transformation.`,
  tenStepProcess: [
    { step: '1. Define the Desired Future State', desc: 'Specify the target outcome with quantitative clarity (e.g., "95% on-time lab starts, zero access lockouts").' },
    { step: '2. Quantify Current Baseline Reality', desc: 'Measure the existing status quo using objective metrics and historical telemetry, not subjective impressions.' },
    { step: '3. Formulate the Precise Gap', desc: 'Gap = Desired Target - Current Performance. This defines the exact scope of required intervention.' },
    { step: '4. Deconstruct the Problem (MECE)', desc: 'Break the problem into Mutually Exclusive, Collectively Exhaustive sub-components (Technical, Operational, Behavioral).' },
    { step: '5. Map Constraints & Dependencies', desc: 'Identify immovable boundary conditions: budget caps, regulatory compliance, hardware limitations, and staff capacity.' },
    { step: '6. Divergent Solution Generation', desc: 'Brainstorm at least 3 distinct strategic options. Avoid jumping to the first obvious fix.' },
    { step: '7. Multi-Criteria Trade-Off Evaluation', desc: 'Evaluate options across Cost, Speed, Scalability, Feasibility, and Risk of unintended side-effects.' },
    { step: '8. Classify Reversibility (Type 1 vs Type 2)', desc: 'Type 1 (One-way doors: irreversible, high risk; require deep analysis). Type 2 (Two-way doors: easily reversible; test rapidly).' },
    { step: '9. Phased Execution Roadmap & Milestones', desc: 'Deploy with clear accountability: Who does what by when, including pilot testing and rollback triggers.' },
    { step: '10. Closed-Loop Feedback & KPI Verification', desc: 'Measure outcomes post-implementation. If the gap does not close, iterate back to the diagnostic phase.' }
  ],
  workedStrategicExamples: [
    {
      id: 'strat1',
      title: 'Problem 1: Managing Peak Server Load Overages (500% Spike During Exam Openings)',
      desiredState: 'Zero exam portal downtime, response time under 1.2s under 2,000 concurrent students.',
      currentReality: 'Portal crashes completely for 20-30 minutes when all students attempt to load Question 1 simultaneously.',
      gap: 'Current max capacity is 400 concurrent requests; deficit is 1,600 concurrent connections.',
      solutionsCompared: [
        {
          name: 'Solution A: Vertically Upgrade Server (Quadruple CPU & RAM)',
          pros: 'Fast implementation (takes 10 minutes in AWS console). Zero code changes required.',
          cons: 'Extremely expensive (ongoing 4x monthly cost for an event that only happens twice a month); still vulnerable if traffic exceeds 1,500.',
          reversibility: 'Type 2 (Easily downscaled if unneeded).'
        },
        {
          name: 'Solution B: Redis Session Caching + Read-Replica DB + Staggered Exam Logins',
          pros: 'Permanent architectural resilience; reduces primary DB load by 85%; handles 5,000+ users gracefully at 1/3 the cost of Solution A.',
          cons: 'Requires 2 weeks of engineering time to refactor session code and update exam scheduling SOP.',
          reversibility: 'Type 1 (Architectural investment).'
        }
      ],
      selectedStrategy: 'Solution B is superior. While Solution A offers a tempting quick fix, it wastes financial capital on idle capacity during normal days and fails to address the underlying database query locking bottleneck. Solution B solves the root problem permanently.',
      implementationMilestones: 'Week 1: Deploy Redis cluster and database read replicas. Week 2: Configure 5-minute staggered batch login windows (Batches A, B, C, D). Week 3: Run full automated load test simulating 3,000 virtual users.'
    },
    {
      id: 'strat2',
      title: 'Problem 2: Resolving Lab Computer Hardware Obsolescence',
      desiredState: 'All 60 lab computers run modern Python, Docker, and Data Science stacks smoothly with zero lag.',
      currentReality: '35 out of 60 machines have 8-year-old Dual-Core CPUs and 4 GB RAM, choking on modern IDEs.',
      gap: 'Deficit of 35 capable workstations; budget is constrained to ₹6,00,000.',
      solutionsCompared: [
        {
          name: 'Solution A: Full Hardware Replacement (Buy 35 new desktop PCs)',
          pros: 'Standardized brand new hardware; local performance is fast.',
          cons: 'Cost exceeds ₹14,00,000 (vastly beyond the ₹6,00,000 budget cap). High future maintenance and depreciation.',
          reversibility: 'Type 1 (High capital expenditure, irreversible).'
        },
        {
          name: 'Solution B: Cloud VDI / Centralized Lab Server + Thin Client Conversion',
          pros: 'Convert existing 35 old PCs into lightweight Thin Clients running Linux; install a centralized on-premise high-core server (32-core AMD Epyc, 128 GB RAM) for ₹4,50,000. Fits well within budget; easy centralized administration.',
          cons: 'Requires reliable internal gigabit LAN switch infrastructure.',
          reversibility: 'Type 2 (Server hardware retains high residual value and versatility).'
        }
      ],
      selectedStrategy: 'Solution B. It respects the hard budget constraint, upgrades all 35 workstations simultaneously, eliminates future per-seat software upgrade burdens, and leaves ₹1,50,000 in reserve for gigabit network switches.',
      implementationMilestones: 'Month 1: Procurement of central server and gigabit switches. Month 2: Image old PCs with lightweight PXE-boot Linux. Month 3: Stress-test 35 simultaneous Python/Docker sessions.'
    },
    {
      id: 'strat3',
      title: 'Problem 3: Improving Student Homework and Practical Assignment Completion',
      desiredState: '90% of students submit high-quality, non-plagiarized assignments on time.',
      currentReality: 'Submission rate is 58%; 22% of submitted assignments show evidence of direct copy-pasting from peers.',
      gap: '32 percentage points deficit in completion; rampant plagiarism undermining learning.',
      solutionsCompared: [
        {
          name: 'Solution A: Punitive Measures (Deduct 20% marks per day late, fail plagiarized work)',
          pros: 'Zero financial cost; immediate implementation.',
          cons: 'Creates student resentment, increases dropout rates, does not address lack of comprehension or guidance, encourages better cheating methods.',
          reversibility: 'Type 2.'
        },
        {
          name: 'Solution B: Modular In-Class Lab Sprints + Automated Immediate Feedback Tooling',
          pros: 'Integrate assignment completion into the last 45 minutes of scheduled lab classes with instant automated unit test feedback; peer-review grading paired with randomized dataset variables.',
          cons: 'Requires instructors to redesign assignments into modular bite-sized tasks.',
          reversibility: 'Type 2.'
        }
      ],
      selectedStrategy: 'Solution B. Research in cognitive education proves punitive models worsen disengagement. Integrating guided completion with automated feedback removes procrastination friction and personalizes datasets, making copy-pasting futile.',
      implementationMilestones: 'Sprint 1: Parametrize assignment datasets so every student receives unique numbers. Sprint 2: Deploy autograder with instant test feedback. Sprint 3: Track completion rates over 4 consecutive modules.'
    },
    {
      id: 'strat4',
      title: 'Problem 4: Surge in Student Career Placement Inquiries Overwhelming Placement Officer',
      desiredState: '100% of graduating students receive personalized resume reviews and mock interviews within 5 days of request.',
      currentReality: 'Single placement officer faces a backlog of 140 pending student requests; average wait time is 26 days.',
      gap: 'Wait time is 21 days beyond acceptable service level agreement (SLA).',
      solutionsCompared: [
        {
          name: 'Solution A: Hire 2 Additional Full-Time Placement Officers',
          pros: 'Triples physical human capacity immediately.',
          cons: 'Adds ₹12,00,000 in permanent annual payroll overhead; slow hiring and onboarding lead time (6-8 weeks).',
          reversibility: 'Type 1 (Permanent recurring salary liability).'
        },
        {
          name: 'Solution B: Asynchronous AI Resume Triage Bot + Alumni Peer Mock Interview Network',
          pros: 'Deploy an automated ATS resume scoring bot that resolves 70% of formatting/keyword issues instantly; partner with active alumni for weekend mock interview clinics in exchange for mentoring credits. Placement officer handles only final-stage escalations.',
          cons: 'Requires 3 weeks to build alumni network and configure AI resume tool.',
          reversibility: 'Type 2 (Adaptable, low ongoing fixed cost).'
        }
      ],
      selectedStrategy: 'Solution B is strategically optimal. It resolves 70% of routine resume feedback instantly at minimal marginal cost, enriches alumni-student networking, and allows the placement officer to focus on high-value corporate recruiter partnerships.',
      implementationMilestones: 'Day 1-10: Configure automated resume scanning template. Day 11-20: Onboard 25 alumni mentors. Day 21-30: Relaunch career portal with self-service scheduling.'
    },
    {
      id: 'strat5',
      title: 'Problem 5: Eliminating Course Completion Certificate Bottlenecks',
      desiredState: 'Student receives verifiable credential within 24 hours of passing final assessment.',
      currentReality: 'Paper certificate printing and dispatch takes an average of 22 days.',
      gap: '21-day delay causing student anxiety and hindering immediate job application submissions.',
      solutionsCompared: [
        {
          name: 'Solution A: Dedicated In-House High-Speed Commercial Printer & Dispatch Clerk',
          pros: 'Retains traditional heavy-cardboard physical certificate aesthetic.',
          cons: 'Capital expenditure of ₹2,80,000 plus ongoing courier costs (₹120/shipment) and shipping transit delays.',
          reversibility: 'Type 1.'
        },
        {
          name: 'Solution B: Instant Blockchain/QR Cryptographically Verifiable Digital Certificate + On-Demand Print Option',
          pros: 'Instant automated delivery (0-second wait); shareable on LinkedIn and resume portfolios with 1-click employer verification; zero paper or shipping costs; physical print provided only upon paid student request.',
          cons: 'Requires integrating a digital credentials API into the LMS portal.',
          reversibility: 'Type 2.'
        }
      ],
      selectedStrategy: 'Solution B. Modern employers prioritize instant digital verification over physical paper. Solution B reduces credential issuance time from 22 days to zero seconds, eliminates ₹1,50,000 in annual courier overhead, and modernizes the brand.',
      implementationMilestones: 'Sprint 1: Design dynamic SVG certificate template with unique hash. Sprint 2: Build public verification URL `/verify/{cert_id}`. Sprint 3: Automate issuance upon passing the final exam.'
    }
  ]
};

export const section6DecisionTreesAndExpectedValue = {
  title: 'Section 6 – Decision Trees and Expected Value Analysis',
  introduction: `A Decision Tree is a graphical model that maps out the chronological sequence of choices, uncertain events, and downstream payoffs. It allows decision-makers to evaluate complex strategies under uncertainty by calculating Expected Monetary Value (EMV) through backward induction ("folding back").`,
  anatomy: [
    { symbol: '□ (Square)', name: 'Decision Node', desc: 'Points where the decision-maker has complete control to choose one branch among competing alternatives. No probabilities attached.' },
    { symbol: '○ (Circle)', name: 'Chance (Event) Node', desc: 'Points where an uncertain event occurs beyond direct control. Each emanating branch represents a mutually exclusive outcome with an assigned probability ($P$). The sum of probabilities on all branches from a single chance node MUST equal 1.0.' },
    { symbol: '▷ (Triangle)', name: 'End / Payoff Node', desc: 'Terminal outcome representing the final monetary, operational, or utility payoff (Net Value = Benefits - Costs).' }
  ],
  backwardInductionRules: [
    { rule: '1. Chronological Left-to-Right Construction', desc: 'Build the tree from left to right in the chronological order in which decisions are made and chance events unfold.' },
    { rule: '2. Right-to-Left "Folding Back" Evaluation', desc: 'Calculate Expected Value starting from the terminal payoff nodes on the far right and work backwards toward the root decision node on the left.' },
    { rule: '3. Chance Node Calculation', desc: 'At every Chance Node (○), calculate the Expected Value: $\\text{EV} = \\sum_{i=1}^{n} (P_i \\times \\text{Payoff}_i)$.' },
    { rule: '4. Decision Node Selection', desc: 'At every Decision Node (□), compare the Expected Values of all alternative branches, select the branch with the highest payoff (or lowest cost), and prune the inferior branches.' }
  ],
  workedExamples: [
    {
      id: 'dt1',
      title: 'Example 1: Repair vs. Replace Lab Main Database Server',
      scenario: 'Alpha Fly Computer Education’s primary lab database server is experiencing intermittent memory controller failures. Management must choose between repairing the existing unit or purchasing a new commercial rack server.',
      branches: [
        {
          choice: 'Option A: Repair the Existing Server',
          upfrontCost: 15000,
          outcomes: [
            { event: 'Repair succeeds permanently (70% probability)', grossValue: 80000, netPayoff: 65000, p: 0.70 },
            { event: 'Repair fails within 3 months, requiring emergency replacement (30% probability)', grossValue: 10000, netPayoff: -50000, p: 0.30 }
          ],
          calculation: `EV(Chance Node A) = (0.70 × ₹65,000) + (0.30 × -₹50,000)
EV = ₹45,500 - ₹15,000 = ₹30,500.`
        },
        {
          choice: 'Option B: Replace with New Commercial Server',
          upfrontCost: 55000,
          outcomes: [
            { event: 'Flawless 3-year enterprise operation (95% probability)', grossValue: 120000, netPayoff: 65000, p: 0.95 },
            { event: 'Minor hardware warranty claim (5% probability)', grossValue: 100000, netPayoff: 45000, p: 0.05 }
          ],
          calculation: `EV(Chance Node B) = (0.95 × ₹65,000) + (0.05 × ₹45,000)
EV = ₹61,750 + ₹2,250 = ₹64,000.`
        }
      ],
      decisionSynthesis: 'Option B (Replace with New Server) has an Expected Value of ₹64,000 compared to only ₹30,500 for Option A (Repair). Although Option B requires higher upfront capital (₹55,000 vs ₹15,000), Option A carries a 30% risk of catastrophic secondary failure costing ₹50,000 in emergency replacements and student downtime. Decision: REPLACE.'
    },
    {
      id: 'dt2',
      title: 'Example 2: Direct Full Rollout vs. Pilot Testing a New AI Teaching Assistant',
      scenario: 'Management is evaluating an AI coding tutor. They can roll it out immediately across all 500 students, or pay ₹15,000 to run a 3-week pilot test with 50 students first.',
      branches: [
        {
          choice: 'Strategy 1: Immediate Full Rollout (No Pilot)',
          upfrontCost: 60000,
          outcomes: [
            { event: 'High student adoption & retention (60% probability)', netPayoff: 180000, p: 0.60 },
            { event: 'Low adoption & student pushback requiring cancellation (40% probability)', netPayoff: -60000, p: 0.40 }
          ],
          calculation: `EV(Strategy 1) = (0.60 × ₹1,80,000) + (0.40 × -₹60,000)
EV = ₹1,08,000 - ₹24,000 = ₹84,000.`
        },
        {
          choice: 'Strategy 2: Run Pilot Test First (Cost: ₹15,000)',
          upfrontCost: 15000,
          outcomes: [
            {
              event: 'Pilot is Favorable (70% probability)',
              p: 0.70,
              subDecision: 'Roll out to all students: Under favorable pilot conditions, probability of full adoption rises to 90% (Net Payoff: ₹1,80,000 - ₹15,000 - ₹60,000 = ₹1,05,000); 10% risk of failure (Net Payoff: -₹75,000). EV = (0.90 × 1,05,000) + (0.10 × -75,000) = ₹94,500 - ₹7,500 = ₹87,000.'
            },
            {
              event: 'Pilot is Unfavorable (30% probability)',
              p: 0.30,
              subDecision: 'Abort rollout immediately. Net Loss is limited strictly to the pilot cost (-₹15,000).'
            }
          ],
          calculation: `EV(Strategy 2) = (0.70 × ₹87,000) + (0.30 × -₹15,000)
EV = ₹60,900 - ₹4,500 = ₹56,400.
Wait! Notice that Strategy 1 has an EV of ₹84,000 vs Strategy 2 EV of ₹56,400.
However, Strategy 2 protects the institute from an unhedged ₹60,000 disaster if the tool is rejected. Risk-tolerant decision favors Strategy 1; Risk-averse decision with capital constraints favors Strategy 2.`
        }
      ],
      decisionSynthesis: 'While pure mathematical EV favors Strategy 1 under assumed probabilities, Strategy 2 purchases catastrophic downside insurance. If the institute has sufficient capital buffer, Strategy 1 maximizes expected return; if cash reserves are fragile, Strategy 2 prevents insolvency.'
    },
    {
      id: 'dt3',
      title: 'Example 3: Agile Iterative vs. Waterfall Course Curriculum Redesign',
      scenario: 'Redesigning the Data Analytics syllabus. Agile redesign costs ₹40,000 in monthly sprint iterations. Waterfall redesign costs ₹70,000 in a single upfront contract with an external agency.',
      branches: [
        {
          choice: 'Agile Modular Redesign (Cost: ₹40,000)',
          outcomes: [
            { event: 'Syllabus perfectly aligns with industry demand (75% probability)', netPayoff: 150000, p: 0.75 },
            { event: 'Requires 2 additional sprint revisions (25% probability)', netPayoff: 90000, p: 0.25 }
          ],
          calculation: `EV(Agile) = (0.75 × ₹1,50,000) + (0.25 × ₹90,000) - ₹40,000
EV = ₹1,12,500 + ₹22,500 - ₹40,000 = ₹95,000.`
        },
        {
          choice: 'Waterfall External Agency Redesign (Cost: ₹70,000)',
          outcomes: [
            { event: 'Complete curriculum delivered on target (50% probability)', netPayoff: 160000, p: 0.50 },
            { event: 'Curriculum outdated on delivery due to rapid AI shifts (50% probability)', netPayoff: 20000, p: 0.50 }
          ],
          calculation: `EV(Waterfall) = (0.50 × ₹1,60,000) + (0.50 × ₹20,000) - ₹70,000
EV = ₹80,000 + ₹10,000 - ₹70,000 = ₹20,000.`
        }
      ],
      decisionSynthesis: 'The Agile approach yields an Expected Value of ₹95,000 versus ₹20,000 for Waterfall. In fast-evolving domains like tech and data science, locking in an unchangeable Waterfall contract carries immense obsolescence risk. Decision: AGILE.'
    },
    {
      id: 'dt4',
      title: 'Example 4: Student Exam Prep Strategy – Intensive Bootcamp vs. Daily Micro-Learning',
      scenario: 'A student preparing for the National Data Aptitude Certification can take a 3-day full-time crash bootcamp (Cost: ₹6,000) or practice 45 minutes daily over 60 days via an interactive self-paced app (Cost: ₹1,500).',
      branches: [
        {
          choice: 'Strategy A: 3-Day Crash Bootcamp',
          cost: 6000,
          outcomes: [
            { event: 'Top Tier Score -> Placement Guarantee (45% probability)', value: 80000, p: 0.45 },
            { event: 'Cognitive Overload -> Average Score (55% probability)', value: 25000, p: 0.55 }
          ],
          calculation: `EV(Bootcamp) = (0.45 × ₹80,000) + (0.55 × ₹25,000) - ₹6,000
EV = ₹36,000 + ₹13,750 - ₹6,000 = ₹43,750.`
        },
        {
          choice: 'Strategy B: Daily 45-Min Micro-Learning App',
          cost: 1500,
          outcomes: [
            { event: 'High Retention & Mastery -> Top Tier Score (70% probability)', value: 80000, p: 0.70 },
            { event: 'Loss of Study Discipline -> Average Score (30% probability)', value: 25000, p: 0.30 }
          ],
          calculation: `EV(Daily App) = (0.70 × ₹80,000) + (0.30 × ₹25,000) - ₹1,500
EV = ₹56,000 + ₹7,500 - ₹1,500 = ₹62,000.`
        }
      ],
      decisionSynthesis: 'Strategy B delivers an Expected Value of ₹62,000 versus ₹43,750 for the Bootcamp. Spaced repetition over 60 days yields higher cognitive consolidation and retention (70% success) at 25% of the financial cost. Decision: DAILY MICRO-LEARNING.'
    },
    {
      id: 'dt5',
      title: 'Example 5: Cloud Storage Architecture – Single Region vs. Multi-Region Replication',
      scenario: 'Archiving student assessment video submissions. Option 1: Single Cloud Region S3 Standard (Cost: ₹12,000/yr). Option 2: Multi-Region Replication with Cross-Zone Disaster Recovery (Cost: ₹24,000/yr).',
      branches: [
        {
          choice: 'Option 1: Single Region Storage',
          cost: 12000,
          outcomes: [
            { event: 'No cloud outage occurs (99.2% probability)', loss: 0, p: 0.992 },
            { event: 'Regional cloud disaster causes data loss & regulatory fines (0.8% probability)', loss: 2000000, p: 0.008 }
          ],
          calculation: `Expected Loss(Option 1) = Cost + (0.008 × ₹20,00,000)
Expected Cost = ₹12,000 + ₹16,000 = ₹28,000.`
        },
        {
          choice: 'Option 2: Multi-Region Replication',
          cost: 24000,
          outcomes: [
            { event: 'Total protection across all regional disaster scenarios (100% probability)', loss: 0, p: 1.0 }
          ],
          calculation: `Expected Cost(Option 2) = ₹24,000.`
        }
      ],
      decisionSynthesis: 'Option 2 has a lower total expected cost (₹24,000 vs ₹28,000). Paying an extra ₹12,000 in upfront multi-region replication eliminates an expected risk-adjusted loss of ₹16,000 and completely protects institutional accreditation. Decision: MULTI-REGION REPLICATION.'
    }
  ]
};

export const section7PracticeSets = {
  title: 'Section 7 – Interactive Practice Sets',
  introduction: 'Test your analytical competence across Root Cause Analysis, Fishbone Prioritization, and Decision Tree mathematics. Complete all three sets of 5 questions each.',
  setA: {
    title: 'Practice Set A: Root Cause Analysis and 5 Whys',
    questions: [
      {
        id: 'pa1',
        question: 'A software company experiences repeated data entry errors on invoices. The manager concludes: "The billing clerk was careless, so we must issue a formal warning." Which core principle of Root Cause Analysis did the manager violate?',
        options: [
          'The manager should have fired the billing clerk immediately without any warning.',
          'The manager treated human error as the root cause rather than investigating why the system allowed invalid data to be entered without automated validation checks.',
          'Billing errors can never be analyzed using 5 Whys.',
          'The manager should have doubled the invoice processing fee to compensate for errors.'
        ],
        correct: 1,
        explanation: 'In robust RCA, human error is viewed as a symptom of flawed system design. Disciplining or replacing the clerk does not prevent the next clerk from making the identical error. The true root cause lies in the lack of input field validation, drop-down constraints, or automated reconciliation in the billing software.'
      },
      {
        id: 'pa2',
        question: 'In a 5 Whys investigation regarding a laboratory PC memory freeze, which of the following answers is an example of an unsubstantiated assumption rather than verified evidence?',
        options: [
          'Windows Task Manager recorded RAM utilization at 98.4% at 10:14 AM.',
          'The student running the software was probably playing heavy online video games in another tab.',
          'The MySQL query executed a 4-table join on non-indexed text columns.',
          'System event viewer log showed Event ID 2004: Resource-Exhaustion-Detector.'
        ],
        correct: 1,
        explanation: 'Option B is a speculative subjective assumption without log corroboration. Options A, C, and D are objective, timestamped evidentiary facts derived from system tools.'
      },
      {
        id: 'pa3',
        question: 'When conducting a 5 Whys analysis, when is it appropriate to terminate the inquiry?',
        options: [
          'Always exactly at the fifth "Why?", regardless of the depth reached.',
          'As soon as an external vendor or partner can be blamed for the failure.',
          'When you uncover a fundamental process, policy, or architectural vulnerability within your organizational span of control to remediate permanently.',
          'When the meeting duration reaches 60 minutes.'
        ],
        correct: 2,
        explanation: 'The number "5" is a rule of thumb, not a dogma. You stop when you reach an actionable systemic lever within your organizational authority that, if changed, permanently halts the failure cascade.'
      },
      {
        id: 'pa4',
        question: 'A high-speed train arrived 45 minutes late. Inquiry reveals: (1) Signal cable cut by excavator -> (2) Excavator was digging a roadside trench -> (3) Contractor did not have utility line map -> (4) Municipal utility portal was offline for maintenance. What is the most defensible institutional root cause?',
        options: [
          'The train engine driver should have driven faster to make up the lost 45 minutes.',
          'The excavation permit protocol lacked a mandatory pre-dig physical utility line verification clearance requirement prior to excavation commencement.',
          'The internet provider that hosted the municipal portal should be fined ₹10,00,000.',
          'Train signals should not use physical cables.'
        ],
        correct: 1,
        explanation: 'Relying on an online portal without an enforced mandatory physical locating protocol (e.g., "Call Before You Dig" on-site technician clearance before breaking ground) is the structural failure that permitted excavation without underground hazard verification.'
      },
      {
        id: 'pa5',
        question: 'Which of the following scenarios illustrates a single underlying root cause generating multiple seemingly unrelated symptoms?',
        options: [
          'A student forgets their pen, misses their bus, and leaves their notebook at home.',
          'An expired SSL security certificate causes the public website to display security warnings, the payment gateway to fail, and mobile app API synchronizations to crash simultaneously.',
          'A thunderstorm causes rain, wind, and thunder.',
          'A printer runs out of paper and a monitor screen breaks.'
        ],
        correct: 1,
        explanation: 'An expired SSL certificate (one root cause) breaks every system relying on secure HTTPS transport (website, payment API, mobile app sync), generating multiple disparate symptoms across independent departments.'
      }
    ]
  },
  setB: {
    title: 'Practice Set B: Cause-and-Effect and Prioritization',
    questions: [
      {
        id: 'pb1',
        question: 'In a Fishbone (Ishikawa) diagram, what is the primary function of categorizing brainstormed causes under major ribs (e.g., People, Process, Technology, Environment)?',
        options: [
          'To assign blame equally to every department manager.',
          'To ensure systematic exploration across all operational dimensions and prevent over-focusing on a single familiar area (like human error).',
          'To guarantee that every category has exactly the same number of causes.',
          'To satisfy legal compliance paperwork.'
        ],
        correct: 1,
        explanation: 'Categorization forces analytical breadth. Without categorized ribs, investigation teams routinely default to blaming "People" (training/carelessness) while ignoring silent failures in "Process", "Measurement", or "Technology".'
      },
      {
        id: 'pb2',
        question: 'A software QA team identifies 4 candidate causes for intermittent login failures. Which candidate cause should receive top priority for immediate empirical testing?',
        options: [
          'Cause A: Impact: Low (1/5), Evidence: Speculative (1/5), Ease of Testing: Hard (1/5).',
          'Cause B: Impact: Critical (5/5), Frequency: High (5/5), Evidence: Supported by server error logs (4/5), Ease of Testing: Fast (5/5).',
          'Cause C: Impact: Moderate (3/5), Frequency: Rare (1/5), Cost to investigate: ₹1,00,000.',
          'Cause D: Rumor heard in the lunchroom that internet cables were chewed by mice.'
        ],
        correct: 1,
        explanation: 'Cause B combines maximum severity (Impact 5, Frequency 5), strong log evidence, and can be verified quickly (Ease 5). It dominates all other candidates in prioritization ranking.'
      },
      {
        id: 'pb3',
        question: 'In a manufacturing facility, a machine produces defective parts only during the 2:00 PM to 4:00 PM afternoon shift. An environmental audit discovers that direct afternoon sunlight shines through an unshaded skylight directly onto the thermal laser calibration sensor, raising its temperature by 8°C. Under which Fishbone branch does this root cause belong?',
        options: [
          'People',
          'Process',
          'Environment',
          'Measurement'
        ],
        correct: 2,
        explanation: 'The ambient physical condition (unshaded sunlight through skylight elevating room temperature) is an Environmental factor disrupting machine sensor calibration.'
      },
      {
        id: 'pb4',
        question: 'A manager reviews a completed Fishbone diagram and claims: "Every cause listed on this diagram is a verified contributor to our revenue drop." What fundamental misunderstanding has the manager committed?',
        options: [
          'Fishbone diagrams can only be used for software bugs, not revenue drops.',
          'A Fishbone diagram is a brainstorming map of potential candidate hypotheses; each branch must still be tested and substantiated by empirical evidence before it can be deemed verified.',
          'The manager should have used a pie chart instead.',
          'Fishbone diagrams only list confirmed solutions, not causes.'
        ],
        correct: 1,
        explanation: 'A Fishbone diagram visualizes *hypothesized* causes generated during exploratory brainstorming. Treating every brainstormed branch as an established fact leads to wasted capital and misdirected interventions.'
      },
      {
        id: 'pb5',
        question: 'When using a 1-to-5 Prioritization Matrix, what is the precise interpretation of a candidate cause receiving the highest composite priority score?',
        options: [
          'It is guaranteed to be the 100% true root cause of the breakdown.',
          'It represents the candidate hypothesis that should be investigated and validated first based on risk, severity, and ease of testing.',
          'Management must immediately spend the entire annual budget fixing it without testing.',
          'It indicates that all other candidate causes can be permanently erased from records.'
        ],
        correct: 1,
        explanation: 'A high priority score in analytical triage designates the *investigative sequence*—directing diagnostic resources to where the potential impact is highest and testing is most feasible.'
      }
    ]
  },
  setC: {
    title: 'Practice Set C: Strategic Decisions and Decision Trees',
    questions: [
      {
        id: 'pc1',
        question: 'A computer education institute is deciding whether to host an online webinar. Option A (Free Webinar): Cost ₹5,000. 80% chance of attracting 20 new paying course enrollments (Gross Value: ₹1,00,000); 20% chance of attracting only 2 enrollments (Gross Value: ₹10,000). What is the Expected Value (EV) of Option A?',
        options: [
          '₹77,000',
          '₹82,000',
          '₹85,000',
          '₹90,000'
        ],
        correct: 0,
        explanation: 'Gross EV = (0.80 × ₹1,00,000) + (0.20 × ₹10,000) = ₹80,000 + ₹2,000 = ₹82,000. Net EV = Gross EV - Upfront Cost = ₹82,000 - ₹5,000 = ₹77,000.'
      },
      {
        id: 'pc2',
        question: 'In a Decision Tree, what mathematical rule must ALWAYS be satisfied by the probability values assigned to the branches emanating from a single Chance Node (○)?',
        options: [
          'The probabilities must all be equal to 0.50.',
          'The probabilities of all mutually exclusive and exhaustive outcomes must sum to exactly 1.0 (or 100%).',
          'The probabilities must multiply to 1.0.',
          'Each probability must be greater than 1.0.'
        ],
        correct: 1,
        explanation: 'By the axioms of probability, a chance event represents a complete set of mutually exclusive outcomes; therefore, their individual probabilities must sum to exactly 1.0 (100%).'
      },
      {
        id: 'pc3',
        question: 'When evaluating a Decision Tree using the Backward Induction method, which direction do you work, and what do you do at a Decision Node (□)?',
        options: [
          'Work Left-to-Right; multiply all costs by probabilities.',
          'Work Right-to-Left (from terminal payoffs backward); select the alternative with the highest expected value and prune inferior branches.',
          'Work Top-to-Bottom; average all values together.',
          'Work Right-to-Left; always select the cheapest upfront option regardless of future value.'
        ],
        correct: 1,
        explanation: 'Backward induction rolls back from right (terminal payoffs) to left (root decision). At chance nodes, you calculate expected values; at decision nodes, you rationally choose the branch that maximizes payoff (or minimizes cost).'
      },
      {
        id: 'pc4',
        question: 'An educational center evaluates two marketing campaigns. Campaign X has an EV of ₹50,000 with a 0% risk of losing money. Campaign Y has an EV of ₹52,000, but has a 20% risk of resulting in a catastrophic ₹1,50,000 loss that would bankrupt the center. Why might management rationally choose Campaign X despite its lower EV?',
        options: [
          'Management made a mathematical error in addition.',
          'Expected Value assumes risk neutrality over infinite trials; for a firm with limited cash reserves facing an existential bankruptcy risk, risk-aversion and downside preservation take precedence over a minor +₹2,000 EV difference.',
          'Campaign Y has fewer letters in its name.',
          'Expected Value can never be calculated for marketing campaigns.'
        ],
        correct: 1,
        explanation: 'Expected Value is an average expectation over repeated trials. In real-world strategy, the "risk of ruin" (bankruptcy) imposes an asymmetric penalty. A risk-averse organization will happily forgo a tiny marginal gain (+₹2,000) to eliminate a 20% chance of catastrophic insolvency.'
      },
      {
        id: 'pc5',
        question: 'Which of the following distinguishes a Type 1 decision from a Type 2 decision in strategic problem-solving?',
        options: [
          'Type 1 decisions involve hardware; Type 2 decisions involve software.',
          'Type 1 decisions are "one-way doors" (irreversible, high consequence, require exhaustive deliberation); Type 2 decisions are "two-way doors" (easily reversible, low consequence, should be tested quickly).',
          'Type 1 decisions are made by students; Type 2 decisions are made by teachers.',
          'Type 1 decisions always cost more than ₹10,00,000.'
        ],
        correct: 1,
        explanation: 'Jeff Bezos popularized this distinction: Type 1 decisions are irreversible one-way doors (e.g., selling a company, signing a 10-year lease) requiring deep analysis. Type 2 decisions are two-way doors (e.g., testing a new lecture schedule, changing button color) that can be reversed in minutes if results are suboptimal.'
      }
    ]
  }
};

export const section8RealWorldChallenge = {
  title: 'Section 8 – Real-World Application Challenge',
  scenarioName: 'Alpha Fly Computer Education – Improving Enquiry-to-Admission Conversion',
  disclaimer: 'Note: The figures and operational observations in this exercise are realistic educational simulations designed for analytical training and do not represent actual Alpha Fly Computer Education institutional metrics.',
  background: `Alpha Fly Computer Education observed that over a recent 60-day campaign, total course enquiries reached 120, but only 18 candidates finalized admission. This represents an Enquiry-to-Admission conversion rate of 15.0%, which falls significantly below the institutional target benchmark of 25.0% (a 10 percentage point deficit). Management requires a rigorous Root Cause Analysis and an evidence-backed strategic intervention plan.`,
  startingData: {
    totalEnquiries: 120,
    admissions: 18,
    conversionRate: '15.0%',
    targetRate: '25.0%',
    conversionGap: '10.0 percentage points (or a 40% relative shortfall)'
  },
  fictionalEvidenceLog: [
    { source: 'Channel A: Paid Social Media Ads', enquiries: 65, admissions: 6, convRate: '9.2%', avgFirstResponse: '38 hours', notes: '48% of leads were called only once; if unanswered, no second follow-up or WhatsApp message was dispatched.' },
    { source: 'Channel B: Walk-ins & Student Referrals', enquiries: 35, admissions: 10, convRate: '28.6%', avgFirstResponse: '< 1 hour', notes: 'Face-to-face counselling with demo lab session; highest conversion rate across all channels.' },
    { source: 'Channel C: Website Contact Form', enquiries: 20, admissions: 2, convRate: '10.0%', avgFirstResponse: '22 hours', notes: '12 out of 20 form submissions had invalid phone digits or omitted preferred course timing.' }
  ],
  tenStepInvestigationTasks: [
    { step: 1, task: 'Define the Problem Statement with Quantitative Precision', solution: 'During the 60-day campaign, Enquiry-to-Admission conversion was 15.0% (18/120), falling 10.0 percentage points below the 25.0% institutional target, with Paid Social Media converting at only 9.2%.' },
    { step: 2, task: 'Verify Core Metric Calculations', solution: 'Total Enquiries = 120. Total Admissions = 18. Baseline Conversion = (18 / 120) × 100 = 15.0%. Target Admissions = 120 × 0.25 = 30 students. Shortfall = 12 admissions.' },
    { step: 3, task: 'Distinguish Observed Facts from Speculative Hypotheses', solution: 'Fact: Paid Social Media response time averaged 38 hours, and 48% received only 1 call attempt. Hypothesis: "Social media leads are not serious students who just want free certificates."' },
    { step: 4, task: 'Construct a 5 Whys Chain for the Paid Social Media Conversion Deficit', solution: 'Why 1: Social ad conversion is 9.2%? Leads were contacted 38 hours after submitting enquiry. Why 2: Why 38 hours delay? Counsellors manually download CSV lead sheets from Facebook Ads Manager once every 2 days. Why 3: Why manual CSV export? CRM lacks direct webhook integration with Meta Lead Ads API. Why 4: Why no direct webhook integration? Technical integration was not included in the marketing campaign launch scope. Why 5: Why was integration omitted? Lack of cross-functional governance between Admissions and Marketing (Root Cause).' },
    { step: 5, task: 'Develop a 4-Category Fishbone Map', solution: 'People: Counsellors make only 1 attempt before abandoning lead. Process: Manual bi-daily lead CSV download with 38-hour latency. Technology: Absence of Meta webhook-to-CRM auto-dialer API. Measurement: Counsellors evaluated on call volume, not lead response velocity or conversion yield.' },
    { step: 6, task: 'Prioritize Top 3 High-Leverage Causes', solution: 'Priority 1: Lead response latency (38 hrs down to <15 mins via CRM webhook). Priority 2: Structured multi-channel follow-up cadences (WhatsApp + Call Day 1, Day 3, Day 5). Priority 3: Form input validation on website.' },
    { step: 7, task: 'Compare Two Strategic Solutions', solution: 'Option A (Hire 2 additional telecallers): Adds ₹40,000/month recurring payroll without fixing lead latency. Option B (Deploy Automated CRM Webhook + WhatsApp Nudge Bot + 15-Minute Response Protocol): One-time ₹15,000 setup, enables instant outreach while lead intent is hot.' },
    { step: 8, task: 'Build a Decision Tree for Option Selection', solution: 'Decision Node: Option A vs Option B. Option B achieves higher Expected Value (EV = ₹1,42,000 vs ₹68,000) and structurally compresses first-contact latency from 38 hours to 8 minutes.' },
    { step: 9, task: 'Formulate an Evidence-Based Action Plan & Success KPI', solution: 'Action: Implement Zapier/Meta CRM webhook pipeline with instant WhatsApp brochure delivery within 5 minutes of ad form submission. Target KPI: Reduce first-contact response time to <15 minutes; raise overall conversion rate to $\ge 24\%$ in next 45-day cohort.' },
    { step: 10, task: 'Specify Additional Data Needed to Establish True Causation', solution: 'Run an A/B test: Randomly split next 100 social media leads into Group A (Legacy 38-hr manual call) and Group B (Automated 10-minute CRM instant WhatsApp + call). A statistically significant conversion gap in this controlled trial proves response velocity directly drives admission conversion.' }
  ]
};

export const section9FinalAssessment = {
  title: 'Section 9 – Final Assessment (20 Questions | 25 Minutes)',
  timeLimitMinutes: 25,
  passingScore: 15,
  totalQuestions: 20,
  rubric: [
    { range: '18–20', label: 'Excellent – Advanced Problem Solver', desc: 'Demonstrates master-level proficiency in root cause deconstruction, evidentiary audit, and decision tree modeling.' },
    { range: '15–17', label: 'Very Good – Strong Analytical Investigator', desc: 'Solid analytical reasoning and sound methodology with minor lapses in complex multi-stage calculations.' },
    { range: '11–14', label: 'Good – Practise Root Cause & Decision Methods', desc: 'Understands basic concepts but struggles with distinguishing symptoms from systemic causes or backward induction.' },
    { range: '0–10', label: 'Needs Improvement – Revise Core Techniques', desc: 'Requires comprehensive review of 5 Whys, Fishbone structures, Expected Value arithmetic, and Type 1/2 decisions.' }
  ],
  questions: [
    // 4 Qs: Root Cause Analysis & 5 Whys
    {
      id: 'q1',
      domain: 'Root Cause & 5 Whys',
      question: 'A computer lab’s power breaker trips every Tuesday at 2:15 PM. The lab assistant resets the breaker switch and it works until the following Tuesday. In analytical problem-solving, what error is being committed?',
      options: [
        'The breaker switch should be glued permanently in the "ON" position.',
        'The assistant is treating the immediate symptom (resetting the tripped breaker) without investigating what weekly scheduled load triggers the electrical overload at 2:15 PM.',
        'The electricity company is maliciously targeting the computer lab.',
        'Breakers trip randomly due to atmospheric pressure.'
      ],
      correct: 1,
      explanation: 'Resetting the breaker switch restores power temporarily (treating the symptom). The failure will continue recurring every Tuesday until the team investigates what specific scheduled equipment, appliance, or machine turns on at 2:15 PM.'
    },
    {
      id: 'q2',
      domain: 'Root Cause & 5 Whys',
      question: 'In a 5 Whys investigation regarding late student project submissions, an investigator writes: "Why did students not understand the assignment? -> Because the instructor did not care." Why is this a flawed 5 Whys step?',
      options: [
        'Because instructors are always 100% blameless.',
        'It attributes an unprovable subjective motive ("did not care") rather than analyzing actionable operational causes (e.g., lack of rubrics, ambiguous task descriptions, or insufficient office hours).',
        'A 5 Whys investigation should never ask questions about an instructor.',
        'The investigator should have used a pie chart instead.'
      ],
      correct: 1,
      explanation: 'Effective RCA avoids moralizing or psychoanalyzing motives. Subjective accusations ("did not care") cannot be tested or engineered into systemic safeguards. An actionable investigation analyzes tangible processes (e.g., rubric clarity, sample test cases).'
    },
    {
      id: 'q3',
      domain: 'Root Cause & 5 Whys',
      question: 'Why is "Human Error" considered an unacceptable stopping point for a Root Cause Analysis in mature organizations?',
      options: [
        'Because humans never make mistakes in workplace environments.',
        'Because human error is merely the symptom of poorly designed user interfaces, ambiguous procedures, fatigue, or the absence of defensive guardrails.',
        'Because human employees cannot be retrained.',
        'Because ISO quality standards prohibit mentioning humans.'
      ],
      correct: 1,
      explanation: 'Human error is the starting point of an investigation, never the conclusion. A resilient system is engineered with poka-yoke (mistake-proofing), validation constraints, and redundant safeguards so that an inevitable human slip does not trigger a catastrophic failure.'
    },
    {
      id: 'q4',
      domain: 'Root Cause & 5 Whys',
      question: 'Consider the following 5 Whys chain: (1) Machine stopped -> (2) Overload caused fuse to blow -> (3) Bearing was not lubricated -> (4) Lubrication pump was not circulating oil -> (5) Pump intake shaft was worn due to metal shavings. What is the next logical analytical question?',
      options: [
        'Why was the machine manufactured in Germany?',
        'Why were metal shavings entering the pump intake, and why was there no filter strainer to catch them?',
        'Which worker turned the machine on this morning?',
        'How much did the machine cost when purchased?'
      ],
      correct: 1,
      explanation: 'To reach the true systemic root cause, you must ask why metal shavings were present and why there was no protective filter or magnetic strainer to prevent debris from wearing out the pump intake.'
    },

    // 4 Qs: Fishbone Diagrams & Cause Classification
    {
      id: 'q5',
      domain: 'Cause-and-Effect & Fishbone',
      question: 'In a Fishbone diagram investigating "High LMS Latency during Peak Online Exams", an engineer notes: "Database query uses an unindexed `LIKE %search%` scan across 5,00,000 rows." Under which standard category does this cause belong?',
      options: [
        'Environment',
        'People',
        'Technology & Equipment',
        'Measurement'
      ],
      correct: 2,
      explanation: 'Software code, database queries, and indexing architecture fall directly under the Technology & Equipment category.'
    },
    {
      id: 'q6',
      domain: 'Cause-and-Effect & Fishbone',
      question: 'Which of the following causes from a course dropout investigation represents a "Process" category failure?',
      options: [
        'Classroom air conditioning unit stopped working during summer.',
        'The student attendance policy requires 85% attendance but provides zero formal mechanism to make up missed lab hours.',
        'LMS database server ran out of disk space.',
        'Student was offered a full-time job.'
      ],
      correct: 1,
      explanation: 'The lack of a formal, documented mechanism for makeup hours is a flaw in institutional policy and workflow design (Process).'
    },
    {
      id: 'q7',
      domain: 'Cause-and-Effect & Fishbone',
      question: 'When developing a Fishbone diagram, what is the key difference between a "Direct Cause" and a "Contributing Factor"?',
      options: [
        'A Direct Cause costs money, while a Contributing Factor is free.',
        'A Direct Cause independently triggers the failure mechanism, whereas a Contributing Factor creates the environmental conditions that amplify vulnerability or severity.',
        'There is no analytical difference; they are exact synonyms.',
        'Contributing factors are always human beings.'
      ],
      correct: 1,
      explanation: 'A direct cause is the immediate physical or logical trigger; a contributing factor establishes the pre-existing background condition that allowed the direct cause to produce catastrophic impact.'
    },
    {
      id: 'q8',
      domain: 'Cause-and-Effect & Fishbone',
      question: 'A training academy finds that its instructors in Center 1 grade subjective Python coding assignments 25% harsher than instructors in Center 2. Under which Fishbone branch should this grading discrepancy be mapped?',
      options: [
        'Environment',
        'Measurement',
        'Technology',
        'Raw Materials'
      ],
      correct: 1,
      explanation: 'Inconsistent grading rubrics, subjective scoring variance, and calibration discrepancies across evaluators fall squarely under the Measurement branch.'
    },

    // 4 Qs: Prioritization Matrix & Evidence Quality
    {
      id: 'q9',
      domain: 'Prioritization & Evidence',
      question: 'An operational prioritization matrix evaluates candidate causes using several parameters. If Cause X has high impact but extremely weak evidence (pure rumor), while Cause Y has high impact and is corroborated by server log data, what is the correct triage decision?',
      options: [
        'Spend the entire budget resolving Cause X first because rumors are usually true.',
        'Prioritize Cause Y for immediate remediation and design a rapid verification test for Cause X before spending capital.',
        'Ignore both causes and wait for another incident.',
        'Dismiss Cause Y because log data is unreliable.'
      ],
      correct: 1,
      explanation: 'Evidence strength is a core triage criterion. Allocating capital to unverified rumors (Cause X) risks fixing the wrong problem. Cause Y has verified evidence and high impact, warranting immediate action, while Cause X must first be empirically validated.'
    },
    {
      id: 'q10',
      domain: 'Prioritization & Evidence',
      question: 'Which of the following forms of evidence provides the highest evidentiary strength when confirming a suspected root cause for software crashes?',
      options: [
        'A senior developer expressing an intuitive belief during a standup meeting.',
        'An anonymous student feedback survey stating the app feels slow.',
        'A timestamped stack trace and memory dump captured at the exact moment of failure showing an out-of-memory exception at line 142.',
        'A marketing report predicting that internet usage will increase next year.'
      ],
      correct: 2,
      explanation: 'Direct physical/digital instrumentation data (stack traces, memory dumps, server access logs) captured at the time of failure provides empirical, objective, high-validity proof.'
    },
    {
      id: 'q11',
      domain: 'Prioritization & Evidence',
      question: 'Why should the "Cost of Investigation" and "Ease of Testing" be included in a cause prioritization matrix alongside "Impact" and "Frequency"?',
      options: [
        'Because managers should always pick the easiest option to avoid working hard.',
        'To optimize return on diagnostic investment: if a high-impact cause can be definitively verified or ruled out in 10 minutes at zero cost, testing it first saves weeks of wasted analysis.',
        'Because expensive causes are always the true root causes.',
        'To guarantee that all causes receive identical funding.'
      ],
      correct: 1,
      explanation: 'Prioritization is about optimizing diagnostic sequence. A low-hanging, high-impact hypothesis that can be verified in minutes allows an investigator to quickly confirm or eliminate major risk factors before committing to expensive long-term investigations.'
    },
    {
      id: 'q12',
      domain: 'Prioritization & Evidence',
      question: 'In a medical diagnostic analogy, what does an elevated body temperature (fever) represent in the hierarchy of problem-solving?',
      options: [
        'The root cause.',
        'The immediate bacterial strain.',
        'A symptom indicating that the body’s immune system is responding to an underlying pathology.',
        'A statistical error.'
      ],
      correct: 2,
      explanation: 'A fever is an observable distress signal (symptom). Taking a fever-reducing medication masks the symptom without eradicating the underlying viral or bacterial pathogen (the root cause).'
    },

    // 4 Qs: Strategic Problem-Solving & Solution Evaluation
    {
      id: 'q13',
      domain: 'Strategic Problem-Solving',
      question: 'What is the fundamental difference between a "Corrective Action" and a "Preventive Action"?',
      options: [
        'A Corrective Action resolves a problem that has already occurred; a Preventive Action re-engineers the system to stop the problem from ever occurring again in any future context.',
        'Corrective actions cost money; preventive actions are always free.',
        'Corrective actions are taken by managers; preventive actions are taken by interns.',
        'They are exact synonyms with no distinction.'
      ],
      correct: 0,
      explanation: 'Corrective actions remediate the existing breakdown (putting out the fire); preventive actions modify the underlying architecture, policy, or design so that similar fires cannot ignite anywhere in the organization in the future.'
    },
    {
      id: 'q14',
      domain: 'Strategic Problem-Solving',
      question: 'An institute’s director decides to change the color of the course enrollment button on the website from blue to green to test if conversion improves. This decision can be reverted in 30 seconds if conversion drops. According to strategic decision classification, what type of decision is this?',
      options: [
        'A Type 1 (One-Way Door) decision that requires 6 months of board approval.',
        'A Type 2 (Two-Way Door) decision that is easily reversible and should be tested rapidly without bureaucratic delay.',
        'An existential financial hazard.',
        'A permanent architectural commitment.'
      ],
      correct: 1,
      explanation: 'A button color change is a classic Type 2 decision (two-way door): highly reversible, virtually zero cost to roll back, and ideal for rapid empirical testing.'
    },
    {
      id: 'q15',
      domain: 'Strategic Problem-Solving',
      question: 'When deconstructing a complex strategic problem using the MECE framework, what do the letters ME and CE stand for?',
      options: [
        'Most Effective, Completely Efficient',
        'Mutually Exclusive, Collectively Exhaustive',
        'Maximum Effort, Continuous Evaluation',
        'Minimum Error, Critical Examination'
      ],
      correct: 1,
      explanation: 'MECE stands for Mutually Exclusive (no overlap between sub-components) and Collectively Exhaustive (together, they cover 100% of the problem domain).'
    },
    {
      id: 'q16',
      domain: 'Strategic Problem-Solving',
      question: 'A team installs a loud buzzer in a classroom that sounds every time a student looks away from the screen for 5 seconds. Within 2 days, students stop looking away but report severe headaches and drop out in record numbers. What strategic reasoning failure occurred?',
      options: [
        'The buzzer was not loud enough.',
        'The team failed to anticipate secondary unintended consequences and negative trade-offs of their intervention.',
        'The students should have worn earplugs.',
        'The team did not ask 5 Whys.'
      ],
      correct: 1,
      explanation: 'Second-order thinking is vital in strategic problem-solving. An intervention that technically eliminates a minor symptom while inducing catastrophic unintended consequences (headaches, mass dropouts) is a failed strategic solution.'
    },

    // 4 Qs: Decision Trees & Expected Value Calculations
    {
      id: 'q17',
      domain: 'Decision Trees & Expected Value',
      question: 'An educational center evaluates two equipment maintenance contracts. Plan A has a fixed annual cost of ₹20,000 and zero breakdown risk. Plan B costs ₹8,000 upfront, but has a 30% chance of requiring a ₹50,000 emergency repair. Which plan has the lower Expected Cost?',
      options: [
        'Plan A (Expected Cost: ₹20,000)',
        'Plan B (Expected Cost: ₹23,000)',
        'Both plans have the exact same expected cost.',
        'Plan B (Expected Cost: ₹8,000)'
      ],
      correct: 0,
      explanation: 'Plan A Expected Cost = ₹20,000. Plan B Expected Cost = Upfront Cost + Expected Emergency Cost = ₹8,000 + (0.30 × ₹50,000) = ₹8,000 + ₹15,000 = ₹23,000. Therefore, Plan A has a lower expected cost by ₹3,000.'
    },
    {
      id: 'q18',
      domain: 'Decision Trees & Expected Value',
      question: 'A Chance Node (○) in a decision tree has 3 branches. Branch 1 has a probability of 0.45 and payoff ₹40,000. Branch 2 has a probability of 0.35 and payoff ₹20,000. What MUST be the probability of Branch 3, and if its payoff is -₹10,000, what is the Expected Value of this Chance Node?',
      options: [
        'Probability: 0.20; Expected Value: ₹23,000',
        'Probability: 0.20; Expected Value: ₹25,000',
        'Probability: 0.10; Expected Value: ₹22,000',
        'Probability: 0.30; Expected Value: ₹30,000'
      ],
      correct: 0,
      explanation: 'Probabilities must sum to 1.0: P3 = 1.0 - (0.45 + 0.35) = 1.0 - 0.80 = 0.20. Expected Value = (0.45 × 40,000) + (0.35 × 20,000) + (0.20 × -10,000) = 18,000 + 7,000 - 2,000 = ₹23,000.'
    },
    {
      id: 'q19',
      domain: 'Decision Trees & Expected Value',
      question: 'In a Decision Tree, what mathematical operation is performed at a Decision Node (□) when folding back the tree?',
      options: [
        'You calculate the average of all branches.',
        'You select the branch that yields the maximum Expected Value (or minimum cost) and prune away the inferior alternatives.',
        'You multiply the values of all connecting branches together.',
        'You divide the terminal payoff by the number of students.'
      ],
      correct: 1,
      explanation: 'At a Decision Node (□), the decision-maker possesses executive choice. Therefore, the optimal rational action is to select the highest expected value (or lowest cost) branch and prune the competing options.'
    },
    {
      id: 'q20',
      domain: 'Decision Trees & Expected Value',
      question: 'A tech training startup is considering launching a new Course X (Initial investment: ₹50,000). There is a 70% probability of high demand (Net revenue: ₹1,50,000) and a 30% probability of low demand (Net revenue: ₹20,000). What is the Net Expected Monetary Value of launching Course X?',
      options: [
        '₹61,000',
        '₹75,000',
        '₹1,11,000',
        '₹50,000'
      ],
      correct: 0,
      explanation: 'Gross Expected Revenue = (0.70 × ₹1,50,000) + (0.30 × ₹20,000) = ₹1,05,000 + ₹6,000 = ₹1,11,000. Net Expected Value = Gross Expected Revenue - Initial Investment = ₹1,11,000 - ₹50,000 = ₹61,000.'
    }
  ]
};

export const section10RevisionAndDrills = {
  title: 'Section 10 – Quick Revision Sheet & Rapid-Fire Drills',
  summaryPoints: [
    { title: 'Symptom vs Root Cause', text: 'Symptoms are observable distress signals (e.g., website latency). Root causes are systemic structural vulnerabilities (e.g., synchronous upload processing blocking database threads). Treating symptoms guarantees recurrence.' },
    { title: '5 Whys Guardrails', text: '5 is a guideline, not dogma. Stop when reaching an actionable organizational/architectural lever within your span of control. Never stop at "human error" or blame.' },
    { title: 'Fishbone (Ishikawa) Categories', text: 'Standard ribs: People, Process, Technology/Equipment, Environment, Measurement, Information. Distinguish unverified brainstormed hypotheses from empirically proven root causes.' },
    { title: 'Prioritization Scoring', text: 'Prioritize candidate hypotheses by Impact, Frequency, Risk of Inaction, Evidence Strength, and Ease of Testing. High priority means "investigate first", not "automatically guilty".' },
    { title: '10-Step Strategic Problem Solving', text: 'Define Target -> Measure Baseline -> Quantify Gap -> Deconstruct (MECE) -> Map Constraints -> Generate Options -> Trade-off Matrix -> Select (Type 1 vs Type 2) -> Implement Roadmaps -> Closed-Loop Verification.' },
    { title: 'Decision Trees & Expected Value', text: 'Decision Nodes (□) represent choices. Chance Nodes (○) represent probabilistic events (sum of branch probabilities = 1.0). End Nodes (▷) represent payoffs. Calculate EV = Σ(P_i × V_i) - Cost via Backward Induction (right to left).' },
    { title: 'Type 1 vs Type 2 Decisions', text: 'Type 1 (One-way doors: irreversible, high stakes; require exhaustive analysis). Type 2 (Two-way doors: reversible, low stakes; test rapidly and iterate).' }
  ],
  rapidFireQuestions: [
    {
      id: 'rf1',
      question: 'True or False: In a rigorous 5 Whys analysis, the fifth answer is always the guaranteed root cause.',
      answer: 'FALSE',
      explanation: 'The number 5 is merely an illustrative guideline. A shallow problem might reach its root cause in 3 Whys; a complex systemic breakdown might require 7 or 8 Whys across branching causal pathways.'
    },
    {
      id: 'rf2',
      question: 'What is the sum of probabilities for all branches originating from a single Chance Node (○)?',
      answer: 'EXACTLY 1.0 (or 100%)',
      explanation: 'Branches from a chance node represent mutually exclusive and collectively exhaustive outcomes of an uncertain event; by probability axioms, their sum must always equal 1.0.'
    },
    {
      id: 'rf3',
      question: 'If an action can be undone in 10 minutes with zero permanent financial loss, is it a Type 1 or Type 2 decision?',
      answer: 'TYPE 2 (Two-Way Door)',
      explanation: 'Type 2 decisions are reversible and low-risk, making them ideal for rapid experimentation without bureaucratic delay.'
    },
    {
      id: 'rf4',
      question: 'Under which Fishbone category does "uncalibrated lab weighing scales" belong?',
      answer: 'MEASUREMENT',
      explanation: 'Any sensor, metric, grading rubric, or calibration tool used to evaluate operational state falls under Measurement.'
    },
    {
      id: 'rf5',
      question: 'What does backward induction mean in Decision Tree analysis?',
      answer: 'EVALUATING FROM RIGHT TO LEFT',
      explanation: 'You calculate payoffs at the terminal branches on the far right first, then "fold back" toward the initial decision node on the left.'
    }
  ]
};
