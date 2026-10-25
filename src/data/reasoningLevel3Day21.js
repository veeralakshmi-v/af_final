// src/data/reasoningLevel3Day21.js
// Alpha Fly Computer Education - Logical Reasoning Level 3 (Advanced) Day 10
// Title: Comprehensive Logical Reasoning Challenge and Final Assessment

export const day21Overview = {
  course: 'Logical Reasoning',
  level: 'Level 3 – Advanced',
  day: 'Day 10 (Cumulative Day 21)',
  title: 'Comprehensive Logical Reasoning Challenge and Final Assessment',
  duration: '90 minutes',
  difficulty: 'Advanced / Capstone',
  prerequisite: 'Level 3, Day 9 – Advanced Pattern Recognition, Abstract Reasoning and Non-Verbal Logic',
  learningObjectives: [
    'Apply integrated logical reasoning techniques to novel, multi-layered problem architectures.',
    'Deconstruct and solve complex numerical, alphanumeric, and non-verbal pattern progressions.',
    'Resolve multi-condition linear and circular seating arrangements under bidirectional constraints.',
    'Deduce complex multi-generational family trees and resolve coded blood relations.',
    'Evaluate syllogisms, identify unstated assumptions, and deduce formally valid logical conclusions.',
    'Synthesize heterogeneous datasets, detect misleading statistics, and formulate evidence-based decisions.',
    'Execute rigorous Root Cause Analysis (5 Whys, Fishbone, Prioritization Matrices) on operational breakdowns.',
    'Solve 2×2 and 3×3 matrix problems, visual transformations, and topological classifications.',
    'Manage cognitive bandwidth and pacing across a timed 50-question comprehensive assessment.',
    'Analyze personal cognitive diagnostic feedback to implement focused post-course improvement roadmaps.'
  ]
};

export const section1CourseRevision = {
  title: 'Section 1 – Comprehensive Course-Wide Revision',
  levels: [
    {
      level: 'Level 1 – Fundamentals',
      topics: [
        {
          name: 'Number & Letter Series',
          summary: 'Identifies basic arithmetic (+/-), geometric (×/÷), prime number, and alphabet positional progressions (A=1 to Z=26).',
          strategy: 'Calculate first-order differences between consecutive terms; if uneven, check second-order differences or alternating positions.',
          example: 'Series: 4, 9, 19, 39, 79, ? -> Pattern: (x × 2) + 1. Next term = (79 × 2) + 1 = 159.',
          mistake: 'Assuming a constant difference without checking multiplicative or quadratic relationships.',
          drill: {
            q: 'What is the next number in the series: 3, 7, 15, 31, 63, ?',
            options: ['127', '125', '126', '129'],
            correct: 0,
            explanation: 'Pattern: Each term is (Previous × 2) + 1. 63 × 2 + 1 = 127.'
          }
        },
        {
          name: 'Analogies & Classification',
          summary: 'Examines semantic, functional, and mathematical relationships (A is to B as C is to D) and odd-one-out groups.',
          strategy: 'Formulate a precise sentence defining the relationship between pair 1 and test options against that exact sentence.',
          example: 'Architect : Building :: Sculptor : ? -> An architect designs a building; a sculptor creates a Statue.',
          mistake: 'Choosing an option associated with the subject (e.g., chisel) rather than the resulting creation (statue).',
          drill: {
            q: 'Thermometer : Temperature :: Barometer : ?',
            options: ['Atmospheric Pressure', 'Humidity', 'Earthquake', 'Wind Speed'],
            correct: 0,
            explanation: 'A thermometer measures temperature; a barometer measures atmospheric pressure.'
          }
        },
        {
          name: 'Basic Coding-Decoding',
          summary: 'Transposes letters via fixed positional shifts (+1, -2), reverse alphabet pairs (AZ, BY), or symbol replacement.',
          strategy: 'Write down alphabet coordinates (1–26) and check for uniform offset or mirror indexing (Sum = 27).',
          example: 'If CAT is coded as DBU (+1 shift), DOG is coded as EPH.',
          mistake: 'Confusing reverse alphabetical order with reverse string spelling.',
          drill: {
            q: 'If LIGHT is coded as MJHIU, how is FLAME coded?',
            options: ['GMBNF', 'GLBNF', 'GMCND', 'EKZLD'],
            correct: 0,
            explanation: 'Each letter is shifted by +1: F->G, L->M, A->B, M->N, E->F = GMBNF.'
          }
        },
        {
          name: 'Direction & Spatial Sense',
          summary: 'Tracks 2D navigational movements across cardinal (N, S, E, W) and ordinal (NE, NW, SE, SW) bearings.',
          strategy: 'Always sketch a coordinate cross from the origin and apply the Pythagorean Theorem ($c^2 = a^2 + b^2$) for diagonal displacement.',
          example: 'Walk 3m North, then 4m East. Displacement = $\\sqrt{3^2 + 4^2} = 5\\text{m}$ North-East.',
          mistake: 'Confusing person-relative "left/right" turns when facing South or West.',
          drill: {
            q: 'A person walks 10m South, turns right and walks 6m, then turns right again and walks 10m. How far is the person from the start?',
            options: ['6m West', '10m South', '6m East', '16m North'],
            correct: 0,
            explanation: 'Walking South, a right turn points West (6m). Another right turn points North (10m). The final position is exactly 6m West of origin.'
          }
        }
      ]
    },
    {
      level: 'Level 2 – Intermediate',
      topics: [
        {
          name: 'Seating Arrangements & Linear Order',
          summary: 'Places entities into linear rows or circular rings governed by relative and absolute position constraints.',
          strategy: 'Start with fixed anchor points ("X is 3rd from left end") and diagram all potential branches before eliminating impossible states.',
          example: 'A sits immediate left of B; B is center in a 5-person row. Order: _ A B _ _.',
          mistake: 'Confusing "immediate left" with "somewhere to the left".',
          drill: {
            q: 'Five students P, Q, R, S, T sit in a row facing North. S is between T and Q. Q is immediate left of R. P is on the extreme left. Who sits in the middle?',
            options: ['S', 'Q', 'T', 'R'],
            correct: 0,
            explanation: 'Order: P (extreme left), T, S, Q, R. S is in the middle (3rd position).'
          }
        },
        {
          name: 'Blood Relations & Family Trees',
          summary: 'Decodes generational family bonds, maternal vs paternal lines, and indirect referential puzzles.',
          strategy: 'Use standard pedigree notation: squares for males, circles for females, double lines for spouses, vertical stems for parent-child.',
          example: 'A points to B: "His mother is the only daughter of my father." -> Only daughter of my father = myself (if female). B is A’s son.',
          mistake: 'Assuming gender from names without explicit pronoun or relationship clues.',
          drill: {
            q: 'Introducing a boy, a girl said, "He is the son of the daughter of the father of my uncle." How is the boy related to the girl?',
            options: ['Brother', 'Nephew', 'Uncle', 'Father'],
            correct: 0,
            explanation: 'Father of my uncle = my grandfather. Daughter of my grandfather = my mother (or aunt). Son of my mother = my brother.'
          }
        },
        {
          name: 'Syllogisms & Deductive Venn Logic',
          summary: 'Validates categorical propositions (All, Some, No, Some Not) using set-theoretic Venn diagrams.',
          strategy: 'Draw the minimal overlapping Venn diagram. A conclusion is VALID only if it holds across every permissible diagram configuration.',
          example: 'Statements: All Dogs are Mammals. All Mammals are Animals. -> Conclusion: All Dogs are Animals (100% Valid).',
          mistake: 'Treating "Some A are B" as implying "Some A are not B".',
          drill: {
            q: 'Statements: Some Pens are Books. All Books are Papers. Conclusion: Some Pens are Papers.',
            options: ['Conclusion follows definitely', 'Conclusion does not follow', 'Either conclusion follows', 'Data insufficient'],
            correct: 0,
            explanation: 'The intersection between Pens and Books is fully contained inside Papers; therefore, Some Pens are definitely Papers.'
          }
        },
        {
          name: 'Data Interpretation & Funnel Math',
          summary: 'Extracts insight from tables, dual-axis graphs, and charts using percentage changes, weighted averages, and ratios.',
          strategy: 'Always verify denominators before calculating percentage changes: $\\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100$.',
          example: 'Enrollment rises from 200 to 250 -> Gain = $\\frac{50}{200} \\times 100 = +25\\%$.',
          mistake: 'Confusing percentage points with relative percentage change.',
          drill: {
            q: 'If a course pass rate rises from 40% to 50%, what is the relative percentage increase?',
            options: ['25%', '10%', '10 percentage points', '50%'],
            correct: 0,
            explanation: 'The absolute increase is 10 percentage points, but the relative percentage increase is (10 / 40) × 100 = 25%.'
          }
        }
      ]
    },
    {
      level: 'Level 3 – Advanced',
      topics: [
        {
          name: 'Advanced Seating & Multi-Variable Grid Puzzles',
          summary: 'Resolves complex puzzles combining circular/linear seating with multiple attributes (professions, cities, colors).',
          strategy: 'Construct a cross-tabular grid matrix; fill definite positive matches with checkmarks and negative exclusions with crosses.',
          example: '8 executives around a circular table facing center/outward with assigned department heads.',
          mistake: 'Failing to track facing direction (facing outwards inverts left and right orientation).',
          drill: {
            q: 'In a circular seating arrangement facing OUTWARD from center, moving clockwise means moving towards a person’s:',
            options: ['Left', 'Right', 'Behind', 'Center'],
            correct: 0,
            explanation: 'When facing away from the center (outward), looking along the perimeter in a clockwise direction is to your Left.'
          }
        },
        {
          name: 'Root Cause Analysis & Decision Trees',
          summary: 'Deconstructs systemic breakdowns using 5 Whys, Ishikawa Fishbone diagrams, Priority Indices, and Expected Monetary Value ($EMV$).',
          strategy: 'Apply backward induction on Decision Trees: calculate $EV = \\sum (P_i \\times V_i) - \\text{Cost}$ at chance nodes; maximize at decision nodes.',
          example: 'Server repair (Cost: ₹15k, EV: ₹30.5k) vs Server replacement (Cost: ₹55k, EV: ₹64k) -> Decision: Replace.',
          mistake: 'Stopping a 5 Whys inquiry at human error rather than uncovering the systemic process or architectural gap.',
          drill: {
            q: 'A chance node has two outcomes: 80% chance of ₹50,000 and 20% chance of -₹10,000. Upfront cost is ₹5,000. What is the Net EV?',
            options: ['₹33,000', '₹38,000', '₹35,000', '₹40,000'],
            correct: 0,
            explanation: 'Gross EV = (0.80 × 50,000) + (0.20 × -10,000) = 40,000 - 2,000 = ₹38,000. Net EV = ₹38,000 - ₹5,000 = ₹33,000.'
          }
        },
        {
          name: 'Abstract Reasoning & Non-Verbal Logic',
          summary: 'Decodes visual sequences, 2D rigid rotations (45°, 90°, 180°), mirror reflections, and 3×3 matrix Boolean operations (XOR).',
          strategy: 'Use Feature Decoupling: separate outer polygon, inner symbol, vertex counts, and shading into independent algebraic layers.',
          example: 'XOR matrix: overlapping identical lines in cell 1 and cell 2 disappear in cell 3; unique lines are retained.',
          mistake: 'Confusing 180° plane rotation (preserves chirality) with mirror reflection (inverts chirality).',
          drill: {
            q: 'If a shape is reflected vertically across a mirror line and then reflected vertically again across the same line, what is the net transformation?',
            options: ['Original shape unchanged (Identity transformation)', 'Rotated 180°', 'Rotated 90°', 'Reflected horizontally'],
            correct: 0,
            explanation: 'Double reflection across the identical axis cancels out: $R \\times R = I$ (Identity transformation).'
          }
        }
      ]
    }
  ]
};

export const section2ProblemFramework = {
  title: 'Section 2 – The 6-Step Advanced Problem-Solving Framework',
  introduction: `Faced with an unfamiliar, high-stakes logical reasoning problem, guessing or jumping to conclusions produces high error rates. Expert analytical thinkers deploy a standardized Six-Step Cognitive Protocol to eliminate ambiguity and guarantee verifiable answers.`,
  sixSteps: [
    { step: '1. Understand', action: 'Isolate the core question objective. Identify whether the problem asks for what is definitely true, definitely false, possible, or optimal.' },
    { step: '2. Extract', action: 'Extract all given constants, variables, rules, and constraints. Separate empirical facts from unproven assumptions.' },
    { step: '3. Represent', action: 'Select the optimal structural representation model: Sequence line, Cross-Tabular Grid, Venn Diagram, Pedigree Tree, Decision Tree, or Layered SVG.' },
    { step: '4. Analyze', action: 'Execute deductive derivations. Fill definite anchors first, test boundary cases, and cross off contradictions.' },
    { step: '5. Verify', action: 'Stress-test the candidate solution against 100% of the given constraints to confirm zero rule violations.' },
    { step: '6. Answer', action: 'Confirm the exact answer key choice and articulate the step-by-step deductive proof.' }
  ],
  representationSelector: [
    { problemType: 'Linear or Circular Ordering / Lab Seating', model: 'Spatial Blueprint or Seating Ring', why: 'Visualizes facing directions, neighbor adjacencies, and endpoints.' },
    { problemType: 'Multi-Generation Family Relationships', model: 'Pedigree Family Tree Diagram', why: 'Prevents confusing generations and maternal/paternal lineages.' },
    { problemType: 'Categorical Syllogisms & Group Membership', model: 'Overlapping Venn Diagram Circles', why: 'Directly displays subsets, intersections, and disjoint exclusions.' },
    { problemType: 'Multi-Attribute Matching (Person + Car + City)', model: 'Cross-Tabular Grid Matrix (Tick & Cross)', why: 'Eliminates possibilities by row and column simultaneously.' },
    { problemType: 'Risk, Costs, and Multi-Stage Uncertainty', model: 'Decision Tree with Backward Induction', why: 'Calculates Expected Monetary Value (EMV) at chance nodes systematically.' },
    { problemType: 'Visual Sequences & Matrix Transformations', model: 'Feature Decoupling Layer Stack', why: 'Isolates shape, count, rotation, and fill into independent sub-problems.' }
  ],
  strategyDrills: [
    {
      id: 'sd1',
      scenario: 'You are presented with 6 engineers from 6 different companies wearing 6 different colored badges sitting around an octagonal conference table. Which representation model should you choose first?',
      options: [
        'A Cross-Tabular Grid Matrix combined with an Octagonal Seating Ring',
        'A single linear number line',
        'A pedigree family tree',
        'A pie chart'
      ],
      correct: 0,
      explanation: 'Multi-attribute circular seating requires a dual model: an Octagonal Ring for spatial orientations/adjacencies and a Cross-Tabular Grid Matrix to cross-reference Engineer × Company × Color.'
    },
    {
      id: 'sd2',
      scenario: 'A question presents: "All developers drink coffee. Some coffee drinkers are tea lovers. No tea lover eats sugar." What representation model guarantees 100% deductive accuracy?',
      options: [
        'Overlapping Venn Diagrams with minimal overlapping boundaries',
        'A 5 Whys causal chain',
        'A decision tree with expected values',
        'A bar chart'
      ],
      correct: 0,
      explanation: 'Categorical propositions (All, Some, No) are standard set-theoretic syllogisms best analyzed using minimal overlapping Venn diagrams.'
    },
    {
      id: 'sd3',
      scenario: 'An operational manager wants to know whether to buy insurance for an expensive lab server against power surge damage. Probabilities and costs are provided. Which model applies?',
      options: [
        'Decision Tree with Chance Nodes and Expected Monetary Value ($EMV$) calculation',
        'Ishikawa Fishbone diagram',
        'Latin Square 3x3 matrix',
        'Linear seating order'
      ],
      correct: 0,
      explanation: 'Problems with choices under risk, known probabilities, and financial payoffs require a Decision Tree evaluated via Expected Monetary Value ($EMV = \\sum P_i \\cdot V_i - \\text{Cost}$).'
    },
    {
      id: 'sd4',
      scenario: 'In a visual sequence, a polygon gains sides while an arrow rotates and an internal dot changes color. What is the most effective problem-solving strategy?',
      options: [
        'Feature Decoupling: Break the figure into 3 separate layers (sides, arrow rotation, dot color) and solve each rule independently.',
        'Staring at the whole figure until an intuitive feeling appears.',
        'Choosing the most complicated-looking option.',
        'Assuming the arrow direction overrides all other rules.'
      ],
      correct: 0,
      explanation: 'Feature Decoupling isolates independent visual variables, allowing you to solve each progression cleanly and eliminate distractors.'
    },
    {
      id: 'sd5',
      scenario: 'What is the crucial difference between the "Extract" step and the "Analyze" step in the Six-Step Method?',
      options: [
        'Extract strictly gathers the provided facts without making assumptions; Analyze performs logical deductions and explores relationships.',
        'Extract calculates the final answer; Analyze reads the question.',
        'They are exact synonyms with no practical difference.',
        'Extract is only done on math questions; Analyze is for verbal questions.'
      ],
      correct: 0,
      explanation: 'Extracting organizes the raw inputs (facts, constraints). Analyzing combines those inputs through deductive logic to derive unstated truths and eliminate impossibilities.'
    }
  ]
};

export const section3MixedChallenge = {
  title: 'Section 3 – Mixed Logical Reasoning Practice Challenge (15 Questions)',
  introduction: 'Test your holistic mastery across all course disciplines. Each question represents an advanced, competitive-examination caliber challenge.',
  questions: [
    {
      id: 'mc1',
      topic: 'Number & Letter Patterns',
      question: 'Find the next term in the alphanumeric progression: B2D, D5G, G10K, K17P, ?',
      options: ['P26V', 'P25V', 'Q26W', 'O26U'],
      correct: 0,
      explanation: 'First letter: B(+2)->D(+3)->G(+4)->K(+5)->P. Number: 2(+3)->5(+5)->10(+7)->17(+9)->26 (or $n^2 + 1$: $1^2+1=2, 2^2+1=5, 3^2+1=10, 4^2+1=17, 5^2+1=26$). Last letter: D(+3)->G(+4)->K(+5)->P(+6)->V. Term = P26V. Option A is correct.'
    },
    {
      id: 'mc2',
      topic: 'Number & Letter Patterns',
      question: 'Identify the missing number in the sequence: 6, 13, 28, 59, 122, ?',
      options: ['249', '245', '251', '244'],
      correct: 0,
      explanation: 'Pattern: $(x \\times 2) + 1$, $(x \\times 2) + 2$, $(x \\times 2) + 3$, $(x \\times 2) + 4$, $(x \\times 2) + 5$. $122 \\times 2 + 5 = 244 + 5 = 249$. Option A is correct.'
    },
    {
      id: 'mc3',
      topic: 'Coding-Decoding & Symbolic Logic',
      question: 'In a certain code, "ALPHA" is written as "ZOKSZ" (each letter replaced by its reverse alphabet mirror letter, where A=Z, B=Y, etc.). How is "FLY" written in that code?',
      options: ['UOB', 'VOB', 'UPA', 'TNA'],
      correct: 0,
      explanation: 'Reverse mirror alphabet pairs (Sum = 27): F(6) -> U(21); L(12) -> O(15); Y(25) -> B(2). Code = UOB. Option A is correct.'
    },
    {
      id: 'mc4',
      topic: 'Coding-Decoding & Symbolic Logic',
      question: 'If "P + Q" means P is brother of Q, "P - Q" means P is mother of Q, and "P * Q" means P is sister of Q, which expression represents that "M is maternal uncle of R"?',
      options: ['M + K - R', 'M - K + R', 'M * K - R', 'M + K * R'],
      correct: 0,
      explanation: 'M + K means M is brother of K. K - R means K is mother of R. Since M is brother of R’s mother, M is the maternal uncle of R. Expression: M + K - R.'
    },
    {
      id: 'mc5',
      topic: 'Seating Arrangements & Spatial Reasoning',
      question: 'Six friends A, B, C, D, E, F sit around a circular table facing center. D is between A and F. C is opposite D. B is not adjacent to C. Who sits between C and A?',
      options: ['E', 'B', 'F', 'D'],
      correct: 0,
      explanation: 'Positions around circle (1 to 6): Let D = 1. A = 2, F = 6 (since D is between A and F). C is opposite D -> C = 4. Positions left are 3 and 5. B is not adjacent to C (so B cannot be 3 or 5? Wait: if B is not adjacent to C, B cannot be 3 or 5, which leaves no place for B unless A and F are arranged such that B is at 2 or 6! But A and F are adjacent to D. Let us place: 1=D, 2=F, 3=B, 4=C, 5=E, 6=A. Here B is at 3 (adjacent to C? No, 3 is adjacent to 4). Let us arrange: 1=D, 2=A, 3=E, 4=C, 5=B, 6=F. Notice B is at 5 (adjacent to C). So place B at 6? D is adjacent to A and F. The only configuration placing B away from C puts B between F and D? No, D is between A and F. Therefore B is at position 6, F at 5, C at 4, E at 3, A at 2, D at 1. Then between C(4) and A(2) sits E(3). Option A is correct.'
    },
    {
      id: 'mc6',
      topic: 'Seating Arrangements & Spatial Reasoning',
      question: 'A person starts from Point X, walks 20m North, turns left and walks 15m, turns left and walks 20m, and finally turns right and walks 10m to reach Point Y. What is the shortest distance and direction from Point X to Point Y?',
      options: ['25m West', '25m East', '15m West', '35m South'],
      correct: 0,
      explanation: 'Start (0, 0). North 20m -> (0, 20). Turn left (West) 15m -> (-15, 20). Turn left (South) 20m -> (-15, 0). Turn right (West) 10m -> (-25, 0). The final point Y is (-25, 0), exactly 25m West of X.'
    },
    {
      id: 'mc7',
      topic: 'Blood Relations & Family Trees',
      question: 'Pointing to a photograph of a man, Sunita said: "His mother is the only daughter-in-law of my husband’s father." How is the man in the photograph related to Sunita?',
      options: ['Son', 'Brother', 'Husband', 'Nephew'],
      correct: 0,
      explanation: 'Sunita’s husband’s father = Sunita’s father-in-law. The "only daughter-in-law" of Sunita’s father-in-law is Sunita herself! Therefore, the man’s mother is Sunita. The man is Sunita’s Son.'
    },
    {
      id: 'mc8',
      topic: 'Blood Relations & Family Trees',
      question: 'In a family of six (A, B, C, D, E, F), there are two married couples. D is grandmother of A and mother of B. C is wife of B and mother of F. F is granddaughter of E. Who is E’s wife?',
      options: ['D', 'C', 'A', 'B'],
      correct: 0,
      explanation: 'D is grandmother of A and mother of B. C is wife of B. Since F is granddaughter of E and D is grandmother of A, E and D are the grandparents (Couple 1: E and D). Couple 2: B and C. Therefore, E’s wife is D.'
    },
    {
      id: 'mc9',
      topic: 'Syllogisms & Logical Conclusions',
      question: 'Statements: (1) All Python programmers know Logic. (2) Some Logic experts know SQL. (3) No SQL expert is careless. Conclusions: I. Some Python programmers know SQL. II. No careless person is an SQL expert.',
      options: [
        'Only Conclusion II follows',
        'Only Conclusion I follows',
        'Both Conclusions I and II follow',
        'Neither Conclusion follows'
      ],
      correct: 0,
      explanation: 'Conclusion I does not follow because the intersection between Python and Logic does not necessarily overlap with SQL. Conclusion II is the contrapositive of Statement 3 ("No SQL expert is careless" <=> "No careless person is an SQL expert"), which is 100% logically valid. Only Conclusion II follows.'
    },
    {
      id: 'mc10',
      topic: 'Syllogisms & Logical Conclusions',
      question: 'Statement: "The government should install AI-powered traffic lights at all city intersections to eliminate rush-hour congestion." Assumptions: I. AI traffic lights can dynamically adjust light durations based on real-time vehicle density. II. Traffic congestion is solely caused by poor signal timings.',
      options: [
        'Only Assumption I is implicit',
        'Only Assumption II is implicit',
        'Both Assumptions are implicit',
        'Neither Assumption is implicit'
      ],
      correct: 0,
      explanation: 'Assumption I is implicit because proposing AI lights assumes they possess dynamic traffic density capabilities. Assumption II is NOT implicit; assuming signal timing can eliminate congestion does not require believing timing is the *sole* cause of all traffic problems.'
    },
    {
      id: 'mc11',
      topic: 'Data Interpretation & Analytical Reasoning',
      question: 'In Batch 1, 40 out of 50 students passed (80%). In Batch 2, 90 out of 150 students passed (60%). What is the combined weighted average pass rate across both batches?',
      options: ['65.0%', '70.0%', '62.5%', '68.0%'],
      correct: 0,
      explanation: 'Total students = 50 + 150 = 200. Total passed = 40 + 90 = 130. Combined pass rate = (130 / 200) × 100 = 65.0%. (Notice: simple average of 80% and 60% is 70%, which is incorrect because batch sizes are unequal!).'
    },
    {
      id: 'mc12',
      topic: 'Data Interpretation & Analytical Reasoning',
      question: 'A computer center’s monthly server expenses rose from ₹40,000 to ₹50,000, while total enrolled students rose from 200 to 300. Did the server cost per student increase or decrease, and by what percentage?',
      options: [
        'Decreased by 16.7%',
        'Increased by 25.0%',
        'Decreased by 20.0%',
        'Increased by 10.0%'
      ],
      correct: 0,
      explanation: 'Old cost per student = ₹40,000 / 200 = ₹200. New cost per student = ₹50,000 / 300 = ₹166.67. Change = (166.67 - 200) / 200 = -33.33 / 200 = -16.67% (Decreased by 16.7%).'
    },
    {
      id: 'mc13',
      topic: 'Root Cause Analysis',
      question: 'During online assessments, 30% of students were logged out mid-exam. Investigation reveals: web servers ran out of memory -> session tokens stored in unindexed local memory instead of Redis cache -> developer omitted caching library during quick release. What is the defensible root cause?',
      options: [
        'Architectural design flaw: using un-cached in-memory sessions combined with missing non-functional testing criteria in the release checklist.',
        'The students pressed the logout button accidentally.',
        'Internet service providers throttled student connections.',
        'The exam questions were too difficult.'
      ],
      correct: 0,
      explanation: 'The fundamental systemic defect is architectural (in-memory session storage without distributed cache) combined with procedural governance (omitting non-functional load testing from deployment gates).'
    },
    {
      id: 'mc14',
      topic: 'Abstract Reasoning & Visual Patterns',
      question: 'In a 3×3 matrix, lines common to Cell 1 and Cell 2 are deleted, while unique lines are retained in Cell 3. What is this Boolean transformation called?',
      options: [
        'Geometric XOR (Exclusive OR)',
        'Geometric AND (Intersection)',
        'Geometric OR (Union)',
        'Rotational Translation'
      ],
      correct: 0,
      explanation: 'The cancellation of identical overlapping elements while preserving unique non-overlapping segments is the definition of geometric XOR.'
    },
    {
      id: 'mc15',
      topic: 'Abstract Reasoning & Visual Patterns',
      question: 'An asymmetric geometric shape is reflected across a vertical mirror line, then rotated 180° in the plane, and then reflected across the same vertical mirror line. What is the net resulting state?',
      options: [
        'Rotated 180° from original',
        'Identical to original starting figure',
        'Reflected horizontally only',
        'Rotated 90° clockwise'
      ],
      correct: 0,
      explanation: 'Let $V$ be vertical reflection ($x \\to -x, y \\to y$) and $R_{180}$ be 180° rotation ($x \\to -x, y \\to -y$). Sequence: $V \\circ R_{180} \\circ V$. Start with $(x, y)$: After $V$ -> $(-x, y)$. After $R_{180}$ -> $(x, -y)$. After $V$ -> $(-x, -y)$. Notice $(-x, -y)$ is exactly the 180° rotation of $(x, y)$! Option A is correct.'
    }
  ]
};

export const section4CaseStudy = {
  title: 'Section 4 – Integrated Operational Case Study',
  scenarioName: 'Alpha Fly Computer Education – Admissions & Lab Scheduling Optimization',
  disclaimer: 'Note: All operational figures, staff rosters, and incident logs in this case study are fictional educational simulations created for logical reasoning assessment and do not represent actual internal Alpha Fly metrics.',
  scenarioOverview: `Alpha Fly Computer Education is experiencing growing pains at its flagship tech campus. While course enquiries grew from 160 to 240 (+50%) between Quarter 1 and Quarter 2, student admissions only increased from 24 to 26 (+8.3%). Conversion dropped from 15.0% to 10.8%. At the same time, the campus is facing a lab scheduling deadlock with 4 instructors sharing 3 specialized computer labs. Management has commissioned an integrated analytical investigation.`,
  dataset: {
    q1: { enquiries: 160, admissions: 24, convRate: '15.0%', avgResponse: '14 hours', followUpRate: '82%' },
    q2: { enquiries: 240, admissions: 26, convRate: '10.8%', avgResponse: '46 hours', followUpRate: '51%' },
    gap: 'Conversion dropped by 4.2 percentage points (a 28% relative drop), while response latency tripled from 14h to 46h.'
  },
  schedulingConstraints: [
    'Four Instructors: A (Python), B (Data Science), C (Web Dev), D (Cybersecurity).',
    'Three Specialized Labs: Lab 1 (AI / GPU Lab), Lab 2 (Full-Stack Lab), Lab 3 (General Computing).',
    'Rule 1: Instructor A requires Lab 1 for GPU computing on Tuesdays and Thursdays.',
    'Rule 2: Instructor B cannot teach in Lab 3 (requires specialized data science software only on Lab 1 and Lab 2).',
    'Rule 3: Instructor C must teach in Lab 2 on Tuesdays.',
    'Rule 4: Instructor D is available on Tuesdays but cannot be in Lab 1 due to hardware conflicts.'
  ],
  tasks: [
    { id: 't1', title: 'Task 1: Calculate Conversion Rates & Quantify Deficit', question: 'Verify the conversion rate in Q1 and Q2, and determine the shortfall in admissions if Q1’s 15.0% benchmark had been maintained in Q2.' },
    { id: 't2', title: 'Task 2: Evidence vs. Assumption Analysis', question: 'Analyze: "Social media leads in Q2 were unmotivated students looking for free certificates." Is this an established empirical fact or an untested hypothesis?' },
    { id: 't3', title: 'Task 3: Root Cause Deduction', question: 'Construct a 5 Whys chain explaining why response latency exploded from 14h to 46h.' },
    { id: 't4', title: 'Task 4: Resolve the Tuesday Lab Allocation Puzzle', question: 'Using the scheduling constraints, allocate Labs 1, 2, and 3 to Instructors A, B, C, D on Tuesday morning with zero conflicts.' },
    { id: 't5', title: 'Task 5: Syllogistic Policy Verification', question: 'Evaluate: "All admitted students attend orientation. No orientation attendee is uncontacted. Therefore, some uncontacted leads were admitted."' },
    { id: 't6', title: 'Task 6: Decision Matrix – Automated CRM vs Hiring Telecallers', question: 'Compare Option A (Hiring 2 telecallers) vs Option B (Deploying CRM webhook auto-dialer) using Cost, Speed, Scalability, and Risk.' },
    { id: 't7', title: 'Task 7: Recommendation & Success Metric', question: 'Provide an actionable strategic recommendation and define the primary 30-day KPI to evaluate success.' }
  ],
  modelSolution: {
    t1: 'Q1 Conversion = (24 / 160) × 100 = 15.0%. Q2 Conversion = (26 / 240) × 100 = 10.83%. If 15.0% was maintained in Q2: Expected admissions = 240 × 0.15 = 36 admissions. Actual admissions = 26. Shortfall = 10 lost student admissions (representing ~₹3,50,000 in lost tuition revenue).',
    t2: 'It is an UNTESTED HYPOTHESIS and cognitive bias. The empirical data proves that counsellors took 46 hours (nearly 2 days) to make first contact and only completed follow-ups for 51% of leads. High lead latency directly kills conversion intent before lead quality can even be evaluated.',
    t3: 'Why did latency jump to 46h? -> Counsellors were overwhelmed by manual lead data entry. Why? -> Marketing launched 3 new ad campaigns without integrating lead forms to CRM webhooks. Why? -> Admissions and Marketing worked in silos without joint campaign readiness reviews (Root Cause).',
    t4: 'Tuesday Lab Assignment Proof: Rule 1 mandates Instructor A gets Lab 1. Rule 3 mandates Instructor C gets Lab 2. Remaining lab is Lab 3. Remaining instructors are B and D. Rule 2 states Instructor B CANNOT teach in Lab 3. Therefore, Instructor B cannot teach Tuesday morning! Instructor D gets Lab 3 (which satisfies Rule 4, since D is not in Lab 1). Result: Lab 1 = Instructor A; Lab 2 = Instructor C; Lab 3 = Instructor D. Instructor B is off/scheduled on Wednesday.',
    t5: 'Logically INVALID. If "No orientation attendee is uncontacted", and "All admitted students attend orientation", then NO admitted student can be uncontacted! The proposition "Some uncontacted leads were admitted" directly contradicts the premise.',
    t6: 'Option B (Automated CRM Webhook + Instant WhatsApp Triage) dominates Option A (Hiring). Option B costs ₹15,000 one-time vs ₹35,000/month recurring payroll, compresses latency from 46h to <8 minutes, and scales to thousands of leads with zero human fatigue.',
    t7: 'Immediate Action: Deploy Meta/Google Ads CRM webhook pipeline with automated WhatsApp brochure auto-responder within 5 minutes. Primary KPI: Reduce average first-contact latency to <15 minutes and restore overall conversion to ≥16% within 45 days.'
  }
};

export const section5ExamStrategy = {
  title: 'Section 5 – Exam Strategy & Time Management Architecture',
  principles: [
    { title: 'The 3-Pass Pacing Strategy', desc: 'Pass 1 (0-20 mins): Answer instant visual and pattern questions (30-45s each). Mark complex puzzles for review. Pass 2 (20-45 mins): Solve data interpretation, syllogisms, and seating puzzles. Pass 3 (45-60 mins): Review marked items and verify bubble answers.' },
    { title: 'The 90-Second Rule', desc: 'If you have worked on a single reasoning puzzle for 90 seconds without discovering an anchor point or rule, STOP, mark it for review, and move forward. Time traps destroy scores.' },
    { title: 'Negative Option Elimination', desc: 'Do not seek the correct answer among 4 choices immediately. Find disqualifying properties (wrong arrow direction, odd vertex parity) to eliminate 2-3 distractors in seconds.' },
    { title: 'Verification Check Before Submission', desc: 'Ensure zero unanswered questions. On single-answer exams without negative marking, never leave blanks. Check for transposition slips.' }
  ],
  timeExercises: [
    {
      q: 'You are 40 minutes into a 60-minute 50-question test. You have answered 32 questions and encounter a 7-person circular seating puzzle with 8 complex constraints. What should you do?',
      options: [
        'Mark it for review, skip it immediately, answer the remaining single-question items (DI/abstract), and return if time permits.',
        'Spend the next 15 minutes solving every possible permutation of the circle until it works.',
        'Guess randomly and close your test.',
        'Stop the test and complain to the proctor.'
      ],
      correct: 0,
      explanation: 'With 20 minutes left and 18 questions remaining (~1 min/question), sinking 8-10 minutes into one puzzle will starve easier questions. Mark for review and bank easy points first.'
    },
    {
      q: 'Which question type typically offers the fastest accuracy yield per second on competitive logical reasoning exams?',
      options: [
        'Single-rule non-verbal classification & basic analogies (15–30 seconds)',
        'Complex 8-person 2-row seating arrangements (3–5 minutes)',
        'Multi-step weighted average data tables (2–3 minutes)',
        'Deciphering a 6-variable family pedigree with unknown genders (2 minutes)'
      ],
      correct: 0,
      explanation: 'Visual classification, odd-one-out, and direct analogies can be solved in 15-30 seconds with high accuracy, establishing an essential time buffer for multi-condition puzzles.'
    }
  ]
};

export const section6FinalAssessment = {
  title: 'Section 6 – Final Comprehensive Assessment (50 Questions | 60 Minutes)',
  timeLimitMinutes: 60,
  passingScore: 35,
  totalQuestions: 50,
  rubric: [
    { range: '45–50', label: 'Excellent – Advanced Logical Reasoning Master', desc: 'Elite problem-solving horsepower, impeccable spatial agility, and flawless multi-variable deduction across all domains.' },
    { range: '38–44', label: 'Very Good – Strong Analytical Reasoning', desc: 'Strong conceptual grasp and analytical accuracy with minor slips under speed constraints.' },
    { range: '30–37', label: 'Good – Review Selected Advanced Topics', desc: 'Solid fundamental logic; requires further practice on multi-condition seating puzzles and matrix XOR operations.' },
    { range: '20–29', label: 'Developing – Additional Practice Recommended', desc: 'Demonstrates basic familiarity but struggles with complex deductions and time pacing.' },
    { range: '0–19', label: 'Needs Improvement – Revisit Course Fundamentals', desc: 'Comprehensive revision of Levels 1, 2, and 3 recommended.' }
  ],
  questions: [
    // 1. Number & Letter Series (5 Qs)
    { id: 'fa_nl1', topic: 'Number & Letter Series', question: 'Find the missing number in the series: 7, 14, 42, 168, 840, ?', options: ['5040', '4200', '5880', '4800'], correct: 0, explanation: 'Pattern: ×2, ×3, ×4, ×5, ×6. 840 × 6 = 5040.' },
    { id: 'fa_nl2', topic: 'Number & Letter Series', question: 'Find the next term: Z1A, X2C, V6E, T24G, ?', options: ['R120I', 'R100I', 'S120I', 'R120H'], correct: 0, explanation: 'Letters: Z(-2)->X(-2)->V(-2)->T(-2)->R. Numbers: 1(×2)->2(×3)->6(×4)->24(×5)->120. Last letters: A(+2)->C(+2)->E(+2)->G(+2)->I. Term = R120I.' },
    { id: 'fa_nl3', topic: 'Number & Letter Series', question: 'What comes next in the sequence: 2, 3, 5, 7, 11, 13, 17, ?', options: ['19', '21', '23', '25'], correct: 0, explanation: 'This is the sequence of consecutive prime numbers. The prime number following 17 is 19.' },
    { id: 'fa_nl4', topic: 'Number & Letter Series', question: 'Complete the pattern: 1, 8, 27, 64, 125, ?', options: ['216', '343', '256', '196'], correct: 0, explanation: 'Cubes of natural numbers: $1^3, 2^3, 3^3, 4^3, 5^3, 6^3 = 216$.' },
    { id: 'fa_nl5', topic: 'Number & Letter Series', question: 'Find the missing letter pair: AZ, CX, EV, GT, ?', options: ['IR', 'IS', 'HS', 'JQ'], correct: 0, explanation: 'First letter advances by +2: A, C, E, G, I. Second letter is the reverse alphabet pair (Sum = 27): I(9) + R(18) = 27. Pair = IR.' },

    // 2. Analogies & Classification (4 Qs)
    { id: 'fa_ac1', topic: 'Analogies & Classification', question: 'Ophthalmologist : Eye :: Dermatologist : ?', options: ['Skin', 'Heart', 'Bones', 'Nerves'], correct: 0, explanation: 'An ophthalmologist specializes in the eye; a dermatologist specializes in the skin.' },
    { id: 'fa_ac2', topic: 'Analogies & Classification', question: 'Which word is the odd one out: Copper, Silver, Gold, Brass?', options: ['Brass (it is an alloy, while the others are pure elemental metals)', 'Copper', 'Silver', 'Gold'], correct: 0, explanation: 'Copper, Silver, and Gold are elemental metals; Brass is an alloy (copper + zinc).' },
    { id: 'fa_ac3', topic: 'Analogies & Classification', question: '8 : 64 :: 11 : ?', options: ['121', '1331', '110', '144'], correct: 0, explanation: 'Pattern: $n : n^2$. $8^2 = 64$. $11^2 = 121$.' },
    { id: 'fa_ac4', topic: 'Analogies & Classification', question: 'Identify the odd pair: (2, 8), (3, 27), (4, 64), (5, 100)', options: ['(5, 100)', '(2, 8)', '(3, 27)', '(4, 64)'], correct: 0, explanation: 'Pattern is $n : n^3$. $2^3=8, 3^3=27, 4^3=64$. But $5^3=125$, not 100.' },

    // 3. Coding-Decoding & Symbolic Logic (5 Qs)
    { id: 'fa_cd1', topic: 'Coding-Decoding & Symbolic Logic', question: 'In a code, "LOGIC" is written as "NNIKB" (+2, -1, +2, -1, +2? Let us check: L(+2)=N, O(-1)=N, G(+2)=I, I(+2)=K? No: L(12)->N(14)[+2], O(15)->Q(17)[+2], G(7)->I(9)[+2], I(9)->K(11)[+2], C(3)->E(5)[+2]). If every letter shifts +2, how is "REASON" coded?',
      options: ['TGCHQP', 'TGCUQP', 'SFBTPM', 'UGDHRO'], correct: 0, explanation: 'R(+2)=T, E(+2)=G, A(+2)=C, S(+2)=U? Wait: S(19)+2 = U(21). So T, G, C, U, Q, P: R(+2)=T, E(+2)=G, A(+2)=C, S(+2)=U, O(+2)=Q, N(+2)=P -> TGCUQP! Option B is correct.' },
    { id: 'fa_cd2', topic: 'Coding-Decoding & Symbolic Logic', question: 'If RED is coded as 27 (R=18, E=5, D=4; 18+5+4 = 27), what is the code for BLUE?', options: ['40', '38', '42', '36'], correct: 0, explanation: 'B=2, L=12, U=21, E=5. Sum = 2 + 12 + 21 + 5 = 40.' },
    { id: 'fa_cd3', topic: 'Coding-Decoding & Symbolic Logic', question: 'In a code: "786" means "study very hard", "958" means "hard work pays", "645" means "study and work". What digit stands for "very"?', options: ['7', '8', '6', '9'], correct: 0, explanation: '"hard" appears in 786 and 958 -> code 8. "study" appears in 786 and 645 -> code 6. In 786, the remaining word is "very" and remaining digit is 7.' },
    { id: 'fa_cd4', topic: 'Coding-Decoding & Symbolic Logic', question: 'If "+" means "×", "-" means "÷", "×" means "+", and "÷" means "-", evaluate: $20 + 2 - 4 \\times 6 \\div 2$', options: ['14', '16', '12', '18'], correct: 0, explanation: 'Substitute: $20 \\times 2 \\div 4 + 6 - 2 = 40 \\div 4 + 6 - 2 = 10 + 6 - 2 = 14$.' },
    { id: 'fa_cd5', topic: 'Coding-Decoding & Symbolic Logic', question: 'If A=1, B=2 and "CAB" is 6, what is "FEED"?', options: ['20', '18', '22', '16'], correct: 0, explanation: 'F(6) + E(5) + E(5) + D(4) = 20.' },

    // 4. Direction & Spatial Reasoning (4 Qs)
    { id: 'fa_ds1', topic: 'Direction & Spatial Reasoning', question: 'Rohan walks 8 km South, turns right and walks 6 km. What is his straight-line distance from the start?', options: ['10 km', '14 km', '12 km', '8 km'], correct: 0, explanation: 'Displacement = $\\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ km}$.' },
    { id: 'fa_ds2', topic: 'Direction & Spatial Reasoning', question: 'At sunrise, Amit is facing a pole. The shadow of the pole falls exactly to his right. Which direction is Amit facing?', options: ['South', 'North', 'East', 'West'], correct: 0, explanation: 'At sunrise, the sun is in the East; shadows fall towards the West. If the shadow is to Amit’s right, his right side points West; therefore Amit is facing South.' },
    { id: 'fa_ds3', topic: 'Direction & Spatial Reasoning', question: 'A compass is damaged so that North points East. If a traveler wants to walk West, which direction on this damaged compass should they follow?', options: ['North', 'South', 'East', 'West'], correct: 0, explanation: 'The compass is rotated 90° clockwise (North -> East, East -> South, South -> West, West -> North). To travel true West (which corresponds to North on the compass), follow North on the compass.' },
    { id: 'fa_ds4', topic: 'Direction & Spatial Reasoning', question: 'Starting from Point A, Priya walks 12m East, then 5m North to Point B. Distance and direction of B from A?', options: ['13m North-East', '17m North-East', '13m North-West', '7m East'], correct: 0, explanation: '$\\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = 13\\text{m}$ North-East.' },

    // 5. Blood Relations & Family Trees (5 Qs)
    { id: 'fa_br1', topic: 'Blood Relations & Family Trees', question: 'A is B’s sister. C is B’s mother. D is C’s father. E is D’s mother. How is A related to D?', options: ['Granddaughter', 'Daughter', 'Grandmother', 'Niece'], correct: 0, explanation: 'A is C’s daughter. D is C’s father. Therefore, A is the Granddaughter of D.' },
    { id: 'fa_br2', topic: 'Blood Relations & Family Trees', question: 'Pointing to a man, a woman says: "His only brother is the father of my daughter’s father." Who is the man to the woman?', options: ['Paternal Uncle / Father-in-law’s brother', 'Father', 'Brother', 'Husband'], correct: 0, explanation: 'Daughter’s father = my husband. Father of my husband = father-in-law. The man is the brother of my father-in-law.' },
    { id: 'fa_br3', topic: 'Blood Relations & Family Trees', question: 'If X is brother of the son of Y’s son, how is X related to Y?', options: ['Grandson', 'Son', 'Brother', 'Cousin'], correct: 0, explanation: 'Y’s son’s son = grandson of Y. The brother of Y’s grandson is also Y’s Grandson.' },
    { id: 'fa_br4', topic: 'Blood Relations & Family Trees', question: 'A family has a man, his wife, their 4 sons, and their wives. Each son has 3 sons and 1 daughter. How many total male members are in the family?', options: ['17 males', '16 males', '18 males', '15 males'], correct: 0, explanation: 'Father (1) + 4 Sons (4) + Grandsons (4 sons × 3 sons each = 12). Total males = 1 + 4 + 12 = 17.' },
    { id: 'fa_br5', topic: 'Blood Relations & Family Trees', question: 'K is brother of T. M is mother of K. W is brother of M. How is W related to T?', options: ['Maternal Uncle', 'Paternal Uncle', 'Brother', 'Father'], correct: 0, explanation: 'T and K are siblings. M is their mother. M’s brother W is their Maternal Uncle.' },

    // 6. Syllogisms, Assumptions & Conclusions (6 Qs)
    { id: 'fa_syl1', topic: 'Syllogisms & Conclusions', question: 'Statements: All Apples are Fruits. All Fruits are Healthy. Conclusion: All Apples are Healthy.', options: ['Definitely Follows', 'Does Not Follow', 'Probably Follows', 'Data Insufficient'], correct: 0, explanation: 'Apples ⊂ Fruits ⊂ Healthy. Therefore Apples ⊂ Healthy. Follows definitely.' },
    { id: 'fa_syl2', topic: 'Syllogisms & Conclusions', question: 'Statements: No Cats are Dogs. Some Dogs are Birds. Conclusions: I. Some Birds are not Cats. II. Some Dogs are Cats.', options: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Both follow', 'Neither follows'], correct: 0, explanation: 'The Birds that are Dogs cannot be Cats (since No Cats are Dogs). Thus, Some Birds are not Cats is valid. Conclusion I follows.' },
    { id: 'fa_syl3', topic: 'Syllogisms & Conclusions', question: 'Statements: Some Doctors are Teachers. All Teachers are Researchers. Conclusions: I. Some Doctors are Researchers. II. All Researchers are Doctors.', options: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Both follow', 'Neither follows'], correct: 0, explanation: 'The Doctors who are Teachers are also Researchers; so Some Doctors are Researchers. The reverse universal "All Researchers are Doctors" does not follow.' },
    { id: 'fa_syl4', topic: 'Syllogisms & Conclusions', question: 'Statement: "Join Alpha Fly Computer Education to master Python programming in 30 days." Assumptions: I. 30 days is sufficient for learners to master Python fundamentals with structured training. II. People want to learn Python programming.', options: ['Both Assumptions are implicit', 'Only Assumption I is implicit', 'Only Assumption II is implicit', 'Neither is implicit'], correct: 0, explanation: 'Advertising a 30-day course assumes that learning Python in 30 days is feasible (I) and that there is public demand to learn it (II). Both are implicit.' },
    { id: 'fa_syl5', topic: 'Syllogisms & Conclusions', question: 'Statements: All Squares are Rectangles. No Rectangle is a Triangle. Conclusion: No Square is a Triangle.', options: ['Definitely Follows', 'Does Not Follow', 'Can be true', 'False'], correct: 0, explanation: 'Squares are entirely inside Rectangles, which are entirely disjoint from Triangles. No Square can ever be a Triangle.' },
    { id: 'fa_syl6', topic: 'Syllogisms & Conclusions', question: 'Statements: Some Cars are Fast. Some Fast things are Aeroplanes. Conclusion: Some Cars are Aeroplanes.', options: ['Does Not Follow (Fallacy of the Undistributed Middle)', 'Follows definitely', 'Follows probably', 'None of these'], correct: 0, explanation: 'Two particular affirmative premises ("Some A are B" and "Some B are C") cannot yield a valid deductive link between A and C.' },

    // 7. Seating Arrangements & Complex Puzzles (5 Qs)
    { id: 'fa_sa1', topic: 'Seating Arrangements & Puzzles', question: 'Seven people A, B, C, D, E, F, G sit in a straight row facing North. C sits 3rd to the right of A. E sits 2nd to the left of C. Where does E sit relative to A?', options: ['Immediate right of A', '2nd to right of A', 'Immediate left of A', 'Opposite A'], correct: 0, explanation: 'Let A = position 1. C (3rd right) = position 4. E (2nd left of C) = position 4 - 2 = position 2. Position 2 is immediate right of A.' },
    { id: 'fa_sa2', topic: 'Seating Arrangements & Puzzles', question: 'In a group of 5 students, Ravi is taller than Shyam but shorter than Anand. Suresh is taller than Anand. Who is the tallest?', options: ['Suresh', 'Anand', 'Ravi', 'Shyam'], correct: 0, explanation: 'Order of height: Suresh > Anand > Ravi > Shyam. Suresh is the tallest.' },
    { id: 'fa_sa3', topic: 'Seating Arrangements & Puzzles', question: 'Six persons K, L, M, N, O, P sit around a circle facing center. K is opposite N. L is immediate left of K. Who is immediate right of N?', options: ['L', 'O', 'P', 'M'], correct: 0, explanation: 'Around a circle facing center, the person opposite to K is N. The person immediate left of K is directly opposite the person immediate right of N. Therefore, immediate right of N is L.' },
    { id: 'fa_sa4', topic: 'Seating Arrangements & Puzzles', question: 'Four students live on floors 1, 2, 3, 4 of a building. Rahul lives above Sneha. Aman lives below Sneha. Vikas lives on Floor 4. On which floor does Sneha live?', options: ['Floor 2', 'Floor 3', 'Floor 1', 'Floor 4'], correct: 0, explanation: 'Vikas = Floor 4. Remaining floors 3, 2, 1 must hold Rahul, Sneha, Aman in descending order (Rahul > Sneha > Aman). Rahul = Floor 3, Sneha = Floor 2, Aman = Floor 1.' },
    { id: 'fa_sa5', topic: 'Seating Arrangements & Puzzles', question: 'A, B, C, D are seated at the four corners of a square table facing center. A and C are diagonally opposite. If B is to the right of A, who is to the right of C?', options: ['D', 'B', 'A', 'None'], correct: 0, explanation: 'Going clockwise around square facing center: A -> right is D or B. If B is to right of A, order is A, B, C, D. The person to the right of C is D.' },

    // 8. Data Interpretation & Analytical Reasoning (5 Qs)
    { id: 'fa_di1', topic: 'Data Interpretation & Analytical', question: 'A student scored 60 out of 80 in Test 1, and 75 out of 100 in Test 2. In which test was the percentage score higher?', options: ['Both are identical (75%)', 'Test 1 was higher', 'Test 2 was higher', 'Cannot be determined'], correct: 0, explanation: 'Test 1 = (60 / 80) × 100 = 75.0%. Test 2 = (75 / 100) × 100 = 75.0%. Both percentages are identical.' },
    { id: 'fa_di2', topic: 'Data Interpretation & Analytical', question: 'If Company X revenue is ₹40 Lakhs and expenses are ₹30 Lakhs, while Company Y revenue is ₹80 Lakhs and expenses are ₹70 Lakhs. Which company has the higher Profit Margin percentage (Profit / Revenue)?', options: ['Company X (25.0%)', 'Company Y (12.5%)', 'Both have identical profit margins', 'Company Y has higher margin because revenue is double'], correct: 0, explanation: 'Company X profit = 10L / 40L = 25.0%. Company Y profit = 10L / 80L = 12.5%. Company X has double the profit margin.' },
    { id: 'fa_di3', topic: 'Data Interpretation & Analytical', question: 'In a pie chart, a sector represents 90°. What percentage of the total does this sector represent?', options: ['25%', '30%', '20%', '33.3%'], correct: 0, explanation: 'Percentage = (Angle / 360°) × 100 = (90 / 360) × 100 = 25%.' },
    { id: 'fa_di4', topic: 'Data Interpretation & Analytical', question: 'The average mark of 4 students is 80. When a 5th student’s mark is added, the new average becomes 82. What mark did the 5th student score?', options: ['90', '88', '85', '92'], correct: 0, explanation: 'Initial sum = 4 × 80 = 320. New sum = 5 × 82 = 410. 5th student mark = 410 - 320 = 90.' },
    { id: 'fa_di5', topic: 'Data Interpretation & Analytical', question: 'In an enquiry funnel: 200 enquiries lead to 80 attended demo sessions, which lead to 20 paid admissions. What is the conversion rate from Demo Attendees to Admissions?', options: ['25.0%', '10.0%', '40.0%', '15.0%'], correct: 0, explanation: 'Conversion = (Admissions / Demo Attendees) × 100 = (20 / 80) × 100 = 25.0%.' },

    // 9. Root Cause Analysis & Problem Solving (4 Qs)
    { id: 'fa_rc1', topic: 'Root Cause Analysis', question: 'A software company experiences customer complaints that reports generate slowly. Management buys faster laptops for the support team. Why does this fail as a root cause resolution?',
      options: [
        'It treats an un-related cosmetic symptom without addressing the backend database query bottleneck slowing down report generation.',
        'Laptops are never used in software support.',
        'Customers will always complain regardless of speed.',
        'Management should have fired the customers.'
      ], correct: 0, explanation: 'Buying support laptops does not change database execution time on the server. The true root cause lies in unoptimized SQL queries or missing table indexes.' },
    { id: 'fa_rc2', topic: 'Root Cause Analysis', question: 'What is the primary objective of categorizing causes in an Ishikawa (Fishbone) diagram under People, Process, Technology, and Environment?', options: ['To prevent investigative blind spots and ensure systematic multi-dimensional root cause discovery', 'To assign equal blame to each department', 'To make the diagram look visually balanced', 'To eliminate the need for data collection'], correct: 0, explanation: 'Categorization forces broad structural inquiry, preventing teams from defaulting to simplistic human blame.' },
    { id: 'fa_rc3', topic: 'Root Cause Analysis', question: 'In a 5 Whys analysis, why must each step be substantiated with empirical evidence (logs, timestamps, physical records)?', options: ['To prevent the investigation from following false assumptions or narrative speculation', 'To satisfy accounting auditors', 'Because questions without proof are illegal', 'To make the meeting last longer'], correct: 0, explanation: 'Without empirical evidence, 5 Whys degenerates into subjective storytelling and finger-pointing.' },
    { id: 'fa_rc4', topic: 'Root Cause Analysis', question: 'What distinguishes a Type 1 decision from a Type 2 decision in strategic execution?', options: ['Type 1 decisions are irreversible "one-way doors"; Type 2 decisions are easily reversible "two-way doors"', 'Type 1 decisions are cheap; Type 2 decisions are expensive', 'Type 1 is hardware; Type 2 is software', 'There is no distinction'], correct: 0, explanation: 'Type 1 decisions (one-way doors) are irreversible and carry systemic consequences; Type 2 decisions (two-way doors) can be reversed quickly and should be tested empirically.' },

    // 10. Abstract Reasoning & Visual Patterns (4 Qs)
    { id: 'fa_ar1', topic: 'Abstract Reasoning & Patterns', question: 'A square with an arrow pointing North is rotated 270° clockwise. What direction does the arrow point now?', options: ['West', 'East', 'South', 'North-West'], correct: 0, explanation: '270° clockwise = 90° counter-clockwise. North rotated 90° CCW points West.' },
    { id: 'fa_ar2', topic: 'Abstract Reasoning & Patterns', question: 'How many lines of symmetry does a regular octagon possess?', options: ['8', '4', '6', '16'], correct: 0, explanation: 'Any regular n-sided polygon possesses exactly n lines of symmetry. A regular octagon has 8.' },
    { id: 'fa_ar3', topic: 'Abstract Reasoning & Patterns', question: 'In a visual series: Shape 1 has 3 sides (Triangle), Shape 2 has 4 sides (Square), Shape 3 has 5 sides (Pentagon). What polygon must follow?', options: ['Hexagon (6 sides)', 'Heptagon (7 sides)', 'Circle', 'Octagon (8 sides)'], correct: 0, explanation: 'Arithmetic side count progression: 3, 4, 5, 6 (Hexagon).' },
    { id: 'fa_ar4', topic: 'Abstract Reasoning & Patterns', question: 'Under a geometric XOR operation between two overlapping figures, what happens to line segments that exist in both figures?', options: ['They cancel out and are erased', 'They become thicker', 'They turn into circles', 'They double in length'], correct: 0, explanation: 'In geometric XOR (exclusive OR), overlapping common lines cancel out; only unique lines are rendered.' },

    // 11. Decision-Making & Logical Evaluation (3 Qs)
    { id: 'fa_dm1', topic: 'Decision-Making & Evaluation', question: 'In a Weighted Decision Matrix, Option A scores 8/10 on Quality (weight: 0.6) and 4/10 on Cost (weight: 0.4). What is its weighted score?', options: ['6.4 / 10', '6.0 / 10', '7.2 / 10', '5.8 / 10'], correct: 0, explanation: 'Weighted Score = $(0.6 \\times 8) + (0.4 \\times 4) = 4.8 + 1.6 = 6.4$.' },
    { id: 'fa_dm2', topic: 'Decision-Making & Evaluation', question: 'A project option has a 70% chance of yielding ₹1,00,000 and a 30% chance of yielding ₹20,000. Upfront cost is ₹30,000. What is the Expected Monetary Value (EMV)?', options: ['₹46,000', '₹56,000', '₹76,000', '₹50,000'], correct: 0, explanation: 'Gross EV = $(0.70 \\times 100,000) + (0.30 \\times 20,000) = 70,000 + 6,000 = ₹76,000$. Net EMV = $76,000 - 30,000 = ₹46,000$.' },
    { id: 'fa_dm3', topic: 'Decision-Making & Evaluation', question: 'When evaluating multiple strategic alternatives, why must decision criteria weights sum to 1.0 (or 100%)?', options: ['To maintain mathematical consistency and prevent artificial inflation of composite scores', 'Because computers cannot calculate fractions', 'To make the test harder', 'It is optional and not necessary'], correct: 0, explanation: 'Normalizing criterion weights to sum to 1.0 ensures that composite scores remain on an identical, un-distorted standard scale for valid comparison.' }
  ]
};

export const section8RevisionSheet = {
  title: 'Section 8 – Ultimate Non-Verbal & Logical Reasoning Reference Sheet',
  cheatSheet: [
    { title: 'Series & Patterns', formulas: 'Arithmetic: $T_n = a + (n-1)d$. Alphanumeric: Alphabet position + mirror pairs (Sum = 27).' },
    { title: 'Direction Sense', formulas: 'Pythagorean Theorem: $D = \\sqrt{\\Delta x^2 + \\Delta y^2}$. Sunrise shadows point West; Sunset shadows point East.' },
    { title: 'Blood Relations', formulas: 'Generations on vertical lines; Spouses on double horizontal; Siblings on single horizontal; M/F notations.' },
    { title: 'Categorical Syllogisms', formulas: 'Minimal Venn diagram. Contrapositive: "No A is B" $\\iff$ "No B is A". "All A are B" does NOT mean "All B are A".' },
    { title: 'Data Interpretation', formulas: '$\\% \\text{ Change} = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100$. Weighted Avg: $\\frac{\\sum w_i x_i}{\\sum w_i}$.' },
    { title: 'Root Cause & Decision Trees', formulas: '5 Whys to actionable systemic lever. Expected Value: $EV = \\sum (P_i \\times V_i) - \\text{Cost}$. Backward induction.' },
    { title: 'Non-Verbal Geometry', formulas: 'Regular n-gon has n lines of symmetry. Double reflection across same axis cancels out: $R \\times R = I$. XOR cancels common lines.' }
  ],
  rapidFireQuestions: [
    { id: 'rf1', q: 'What is the sum of alphabet positions for any two reverse mirror letters (e.g., A and Z, B and Y)?', a: 'EXACTLY 27', exp: 'A(1) + Z(26) = 27; B(2) + Y(25) = 27.' },
    { id: 'rf2', q: 'If you walk 6m North and 8m East, what is the straight-line displacement from start?', a: '10 METERS', exp: '$\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = 10\\text{m}$.' },
    { id: 'rf3', q: 'In an outward-facing circular arrangement, which hand corresponds to clockwise movement?', a: 'LEFT HAND', exp: 'Facing outward inverts the direction relative to center-facing circles.' },
    { id: 'rf4', q: 'Can an average of percentages be calculated by simply adding them and dividing by 2?', a: 'NO (Unless group sizes are identical)', exp: 'Unequal cohort sizes require weighted average calculation.' },
    { id: 'rf5', q: 'What does backward induction mean in Decision Tree analysis?', a: 'RIGHT TO LEFT EVALUATION', exp: 'Calculate payoffs at terminal nodes first, then fold back toward root.' },
    { id: 'rf6', q: 'True or False: A 180° rotation is identical to a vertical mirror reflection for all shapes.', a: 'FALSE', exp: 'Reflection reverses 2D chirality (handedness); rotation preserves chirality.' },
    { id: 'rf7', q: 'What logic gate cancels common overlapping elements in visual matrices?', a: 'XOR (EXCLUSIVE OR)', exp: 'Common lines are erased; unique lines are retained.' },
    { id: 'rf8', q: 'How many lines of symmetry does a regular pentagon have?', a: 'EXACTLY 5', exp: 'Regular n-sided polygon has n lines of symmetry.' },
    { id: 'rf9', q: 'In 5 Whys analysis, what is "human error" considered?', a: 'A SYMPTOM OF POOR SYSTEM DESIGN', exp: 'Never a defensible stopping point; investigate why the system permitted the mistake.' },
    { id: 'rf10', q: 'What are the two letters in MECE problem deconstruction?', a: 'MUTUALLY EXCLUSIVE, COLLECTIVELY EXHAUSTIVE', exp: 'Zero overlap between branches, covering 100% of problem domain.' }
  ]
};
