// src/data/reasoningLevel3Day17.js
// Alpha Fly Computer Education - Logical Reasoning Level 3 (Advanced) Day 6
// Title: Advanced Syllogisms, Assumptions and Logical Conclusions

export const day17Overview = {
  course: 'Logical Reasoning',
  level: 'Level 3 – Advanced',
  day: 'Day 6 (Cumulative Day 17)',
  title: 'Advanced Syllogisms, Assumptions and Logical Conclusions',
  duration: '60–75 minutes',
  difficulty: 'Advanced',
  prerequisite: 'Day 5 – Advanced Blood Relations and Family-Tree Logic',
  learningObjectives: [
    'Master advanced multi-statement syllogisms involving 3 to 5 categories with absolute deductive rigor.',
    'Differentiate the four classical categorical propositions: Universal Affirmative (All), Universal Negative (No), Particular Affirmative (Some), and Particular Negative (Some... not).',
    'Classify conclusions definitively into: Definitely Follows, Definitely Does Not Follow, and Possible/Indeterminate.',
    'Construct multi-circle Venn diagram models to verify required vs prohibited vs permitted set overlaps.',
    'Master the modern Boolean interpretation of categorical logic (avoiding existential import fallacies).',
    'Detect hidden assumptions using the formal Negation Test (reductio ad absurdum).',
    'Segregate implicit assumptions from explicit facts, extrapolative opinions, and deduced conclusions.',
    'Evaluate argumentative strength by auditing relevance, causal validity, and correlation-versus-causation traps.',
    'Completely detach personal real-world knowledge from premise evaluation in formal logic puzzles.',
    'Articulate exact counter-models demonstrating why an invalid conclusion fails across alternative valid Venn representations.'
  ]
};

export const section1Fundamentals = {
  title: 'Section 1 – Syllogism Fundamentals Refresher',
  introduction: `A syllogism is a deductive argument in which a conclusion is drawn from two or more premises. In categorical syllogisms, every statement asserts or denies that members of one category (the Subject) belong to another category (the Predicate). The hallmark of formal logic is that truth is structural: if the premises are accepted as true, a valid conclusion MUST follow in EVERY conceivable model, regardless of whether the statement contradicts real-world facts.`,
  categoricalPropositions: [
    {
      code: 'A (Universal Affirmative)',
      format: 'All S are P',
      meaning: 'Every single member of category S belongs to category P. Set S is completely enclosed within Set P (S ⊆ P).',
      keyRule: 'CRITICAL TRAP: "All S are P" DOES NOT imply "All P are S". (e.g., All Python scripts are computer programs, but not all computer programs are Python scripts).'
    },
    {
      code: 'E (Universal Negative)',
      format: 'No S is P',
      meaning: 'Set S and Set P are completely mutually exclusive (disjoint sets: S ∩ P = ∅). Zero members in common.',
      keyRule: 'SYMMETRIC: "No S is P" logically and fully guarantees "No P is S".'
    },
    {
      code: 'I (Particular Affirmative)',
      format: 'Some S are P',
      meaning: 'At least one member belongs to both Set S and Set P (S ∩ P ≠ ∅). "Some" mathematically means 1, 2, ..., or even ALL!',
      keyRule: 'SYMMETRIC: "Some S are P" guarantees "Some P are S". But "Some S are P" does NOT definitively prove that "Some S are not P"!'
    },
    {
      code: 'O (Particular Negative)',
      format: 'Some S are not P',
      meaning: 'At least one member of Set S exists outside Set P (S \\ P ≠ ∅).',
      keyRule: 'ASYMMETRIC: "Some S are not P" DOES NOT guarantee "Some P are not S".'
    }
  ],
  corePrinciples: [
    {
      title: 'Premises vs Conclusions',
      description: 'Premises are the unchallengeable axioms provided by the problem. Conclusions are candidate statements whose validity is tested strictly against whether they hold in ALL valid configurations of the premises.'
    },
    {
      title: 'The Real-World Isolation Principle',
      description: 'Even if a premise states: "All laptops are bananas; All bananas are rockets", you must treat it as absolute truth within the logical universe. Never let real-world physical facts override formal logical deduction.'
    },
    {
      title: 'The "Some" Mathematical Convention',
      description: 'In conversational English, "some" often implies "not all". In formal deductive logic, "some" strictly means "at least one" (1% to 100%). "Some A are B" is completely compatible with "All A are B" being possible!'
    }
  ],
  warmupQuestions: [
    {
      id: 'wu1',
      question: 'Statements: All cloud servers are hardware nodes. All hardware nodes are machines. Which conclusion definitely follows?',
      options: [
        'All machines are cloud servers',
        'All cloud servers are machines',
        'Some machines are not hardware nodes',
        'No cloud server is a machine'
      ],
      correct: 'B',
      explanation: 'Let C = Cloud servers, H = Hardware nodes, M = Machines. Premise 1: C ⊆ H. Premise 2: H ⊆ M. By transitive set inclusion: C ⊆ M. Therefore, "All cloud servers are machines" definitely follows. Option A fails because subset inclusion is asymmetric. Option C is possible but not guaranteed.',
      distractors: [
        'Option A: Asymmetric fallacy; C ⊆ M does not mean M ⊆ C.',
        'Option C: While possible, the premises do not guarantee that H is a proper subset of M.',
        'Option D: Directly contradicts the transitive inclusion C ⊆ M.'
      ]
    },
    {
      id: 'wu2',
      question: 'Statements: No bug is a feature. Some errors are bugs. Which conclusion definitely follows?',
      options: [
        'Some errors are not features',
        'No error is a feature',
        'All features are errors',
        'Some features are bugs'
      ],
      correct: 'A',
      explanation: 'Let B = Bugs, F = Features, E = Errors. Premise 1: B ∩ F = ∅ (No bug is a feature). Premise 2: E ∩ B ≠ ∅ (There exist members that are both errors and bugs). Those specific errors that are bugs cannot belong to F (since no bug belongs to F). Therefore, "Some errors are not features" definitely follows (Option A).',
      distractors: [
        'Option B: Overgeneralization; errors that are not bugs could potentially overlap with features.',
        'Option C: Contradicts nothing directly but has zero supporting evidence from the premises.',
        'Option D: Directly contradicts Premise 1 (B ∩ F = ∅).'
      ]
    },
    {
      id: 'wu3',
      question: 'Statement: "All software architects at Alpha Fly are certified engineers." Which of the following is logically guaranteed to be true?',
      options: [
        'All certified engineers at Alpha Fly are software architects.',
        'If a person is not a certified engineer, they cannot be a software architect at Alpha Fly.',
        'If a person is a certified engineer, they must be a software architect at Alpha Fly.',
        'Some software architects at Alpha Fly are not certified engineers.'
      ],
      correct: 'B',
      explanation: 'This is the contrapositive of a universal statement: "All A are B" (A → B) is logically equivalent to its contrapositive "If Not B, then Not A" (¬B → ¬A). Therefore, if a person is not a certified engineer, they cannot be a software architect at Alpha Fly (Option B).',
      distractors: [
        'Option A: Fallacy of affirming the consequent (converse).',
        'Option C: Same converse fallacy as Option A.',
        'Option D: Directly contradicts the given universal premise.'
      ]
    },
    {
      id: 'wu4',
      question: 'Statements: Some databases are SQL. Some databases are NoSQL. Conclusions: I. Some SQL databases are NoSQL. II. Some databases are both SQL and NoSQL. What can be concluded?',
      options: [
        'Only conclusion I follows',
        'Only conclusion II follows',
        'Both conclusions follow',
        'Neither conclusion follows'
      ],
      correct: 'D',
      explanation: 'Let D = Databases, S = SQL, N = NoSQL. Premise 1: D ∩ S ≠ ∅. Premise 2: D ∩ N ≠ ∅. Both S and N overlap with D, but the premises provide zero information about whether the overlap of S with D and N with D share any common elements! S and N can be completely disjoint. Hence, neither conclusion follows definitely.',
      distractors: [
        'Option A: Assumes an unstated intersection between S and N.',
        'Option B: Same unwarranted overlap assumption.',
        'Option C: Double assumption without premise support.'
      ]
    }
  ]
};

export const section2MultiStatement = {
  title: 'Section 2 – Advanced Syllogisms with Multiple Statements',
  theory: `In multi-statement syllogisms (involving 3 or more premises and 3 to 5 categories), chaining premises across intermediate categories is required. A conclusion is VALID if and only if it holds across EVERY valid Venn configuration. If even a single counter-diagram exists where the premises are satisfied but the conclusion is false, the conclusion is INVALID.`,
  chainingRules: [
    {
      rule: 'Rule of Transitive Inclusion (A + A = A)',
      formula: 'All A are B + All B are C ⟹ All A are C',
      note: 'The middle term B connects A and C completely.'
    },
    {
      rule: 'Rule of Particular Inclusion (A + I = I)',
      formula: 'All A are B + Some B are C ⟹ No definite conclusion between A and C!',
      note: 'CRITICAL TRAP: The "Some" portion of B that overlaps with C might not contain any A.'
    },
    {
      rule: 'Rule of Negative Exclusivity (A + E = E)',
      formula: 'All A are B + No B is C ⟹ No A is C',
      note: 'Since all A are inside B, and B is disjoint from C, A is completely blocked from C.'
    },
    {
      rule: 'Rule of Particular Negative (I + E = O)',
      formula: 'Some A are B + No B is C ⟹ Some A are not C',
      note: 'The specific subset of A that lies inside B cannot ever touch C.'
    }
  ],
  workedExamples: [
    {
      id: 'ex2_1',
      statements: [
        '1. All routers are network devices.',
        '2. All network devices are electronic modules.',
        '3. Some electronic modules are battery-powered.'
      ],
      proposedConclusions: [
        'I. All routers are electronic modules.',
        'II. Some routers are battery-powered.'
      ],
      diagramDescription: `
Set R (Routers) is completely inside Set N (Network devices).
Set N is completely inside Set E (Electronic modules).
Set B (Battery-powered) overlaps with Set E, but may or may not reach Set R.
      `,
      stepByStep: [
        'Step 1: Check Conclusion I (All routers are electronic modules): R ⊆ N and N ⊆ E implies R ⊆ E. This is guaranteed in all models. Conclusion I DEFINITELY FOLLOWS.',
        'Step 2: Check Conclusion II (Some routers are battery-powered): We know E ∩ B ≠ ∅. However, that overlap could reside entirely outside N and R! A minimal model can have B overlapping only with the outer ring of E.',
        'Step 3: Since a valid model exists where R and B have zero intersection, Conclusion II is NOT guaranteed.',
        'Step 4: Final verdict: Only conclusion I follows.'
      ],
      finalResult: 'Only Conclusion I follows.',
      whyCorrect: 'Conclusion I is a direct transitive inclusion. Conclusion II is only a possibility, not a definite conclusion.'
    },
    {
      id: 'ex2_2',
      statements: [
        '1. No frontend script is a database query.',
        '2. All database queries are backend operations.',
        '3. All backend operations are server tasks.'
      ],
      proposedConclusions: [
        'I. No frontend script is a backend operation.',
        'II. Some server tasks are not frontend scripts.'
      ],
      diagramDescription: `
Set F (Frontend) is completely disjoint from Set D (Database queries).
Set D is entirely inside Set B (Backend operations).
Set B is entirely inside Set S (Server tasks).
      `,
      stepByStep: [
        'Step 1: Check Conclusion I: F is disjoint from D. But B is larger than D. Could F overlap with B outside D? Yes! F could be inside B as long as it avoids D. Thus Conclusion I does not definitely follow.',
        'Step 2: Check Conclusion II: D is inside B, and B is inside S, so D is inside S. Since F is disjoint from D, those server tasks that are database queries (Set D) can NEVER be frontend scripts! Therefore, there definitely exist server tasks that are not frontend scripts.',
        'Step 3: Conclusion II DEFINITELY FOLLOWS.'
      ],
      finalResult: 'Only Conclusion II follows.',
      whyCorrect: 'D ⊆ S, and D ∩ F = ∅. Therefore, the elements of D within S cannot be F, guaranteeing that some S are not F.'
    },
    {
      id: 'ex2_3',
      statements: [
        '1. Some compilers are interpreters.',
        '2. Some interpreters are assemblers.',
        '3. No assembler is a linker.'
      ],
      proposedConclusions: [
        'I. Some compilers are assemblers.',
        'II. Some interpreters are not linkers.'
      ],
      diagramDescription: `
C overlaps with I.
I overlaps with A (independently of C).
A is disjoint from L.
      `,
      stepByStep: [
        'Step 1: Check Conclusion I: C overlaps with I, and I overlaps with A. But two overlapping circles sharing a third circle does not require the outer circles to overlap. A valid model exists where C ∩ A = ∅. Conclusion I fails.',
        'Step 2: Check Conclusion II: Premise 2 guarantees that Some I are A (I ∩ A ≠ ∅). Premise 3 states No A is L (A ∩ L = ∅). Those specific interpreters that are assemblers CANNOT be linkers. Thus, "Some interpreters are not linkers" must hold true in all models!',
        'Step 3: Conclusion II DEFINITELY FOLLOWS.'
      ],
      finalResult: 'Only Conclusion II follows.',
      whyCorrect: 'The intersection I ∩ A exists, and since A is disjoint from L, that entire intersection is excluded from L.'
    },
    {
      id: 'ex2_4',
      statements: [
        '1. All algorithms are step sequences.',
        '2. No step sequence is random noise.',
        '3. All chaotic inputs are random noise.'
      ],
      proposedConclusions: [
        'I. No algorithm is random noise.',
        'II. No chaotic input is a step sequence.'
      ],
      diagramDescription: `
A is inside S.
S is disjoint from R.
C is inside R.
      `,
      stepByStep: [
        'Step 1: Check Conclusion I: A ⊆ S and S ∩ R = ∅. Since A is entirely inside S, A cannot intersect R. Conclusion I definitely follows.',
        'Step 2: Check Conclusion II: C ⊆ R. S is disjoint from R. Since S has no overlap with R, and C is inside R, S cannot overlap with C. By symmetry, No chaotic input is a step sequence. Conclusion II definitely follows.',
        'Step 3: Both conclusions follow.'
      ],
      finalResult: 'Both Conclusion I and Conclusion II follow.',
      whyCorrect: 'Sets S and R are disjoint. Set A is entirely in S, and Set C is entirely in R. Therefore, A and R are disjoint, and S and C are disjoint.'
    },
    {
      id: 'ex2_5',
      statements: [
        '1. Some microservices are written in Go.',
        '2. All microservices are containerized.',
        '3. No containerized service is a monolith.'
      ],
      proposedConclusions: [
        'I. Some Go services are containerized.',
        'II. No Go service is a monolith.',
        'III. Some containerized services are written in Go.'
      ],
      diagramDescription: `
M overlaps with G (Some M are G).
All M is inside C (M ⊆ C).
C is completely disjoint from MO (C ∩ MO = ∅).
      `,
      stepByStep: [
        'Step 1: Check Conclusion I: Some M are G, and all M are inside C. Those specific M that are G are also inside C. Thus, some Go services are containerized. Conclusion I follows.',
        'Step 2: Check Conclusion II: Some Go services are containerized and therefore cannot be monoliths. But what about Go services that are NOT microservices? They could potentially be monoliths! So "No Go service is a monolith" is an overreach. Conclusion II does not follow.',
        'Step 3: Check Conclusion III: Since some Go services are containerized, by symmetry some containerized services are written in Go. Conclusion III follows.',
        'Step 4: Final verdict: Only I and III follow.'
      ],
      finalResult: 'Only Conclusions I and III follow.',
      whyCorrect: 'Conclusions I and III follow directly from M ⊆ C and M ∩ G ≠ ∅. Conclusion II fails because non-microservice Go services could exist outside C.'
    },
    {
      id: 'ex2_6',
      statements: [
        '1. All firewalls are security gates.',
        '2. Some security gates are proxies.',
        '3. No proxy is a honeypot.'
      ],
      proposedConclusions: [
        'I. Some security gates are not honeypots.',
        'II. No firewall is a honeypot.'
      ],
      diagramDescription: `
F is inside S.
S overlaps with P (Some S are P).
P is disjoint from H (P ∩ H = ∅).
      `,
      stepByStep: [
        'Step 1: Check Conclusion I: The subset of security gates that are proxies (S ∩ P) exists. Since no proxy is a honeypot, those specific security gates can never be honeypots. Thus, "Some security gates are not honeypots" definitely follows.',
        'Step 2: Check Conclusion II: F is inside S. Does F overlap with P? Not necessarily. Could F overlap with H? Yes, H could intersect S and even F without touching P! Thus "No firewall is a honeypot" is not guaranteed.',
        'Step 3: Final verdict: Only Conclusion I follows.'
      ],
      finalResult: 'Only Conclusion I follows.',
      whyCorrect: 'Conclusion I holds because S ∩ P is disjoint from H. Conclusion II fails because F is not constrained from intersecting H.'
    }
  ]
};

export const section3Possibility = {
  title: 'Section 3 – Possibility and Definite Conclusions',
  introduction: `In advanced competitive reasoning, questions frequently ask whether a conclusion "is a possibility" (e.g., "All A being B is a possibility"). A possibility conclusion is VALID if there exists AT LEAST ONE valid Venn diagram configuration where it is true without violating any premise. Conversely, a definite conclusion requires that the statement is true in ALL valid Venn configurations.`,
  modalityComparison: [
    {
      status: 'Definitely Follows (Certainty)',
      condition: 'True in 100% of valid Venn models.',
      test: 'Try to draw a counter-example where it is false. If impossible, it definitely follows.'
    },
    {
      status: 'Definitely Does Not Follow (Impossible)',
      condition: 'False in 100% of valid Venn models (directly contradicts a premise).',
      test: 'If assuming it true violates a premise, it definitely does not follow.'
    },
    {
      status: 'Possibility (Permitted / Can Be)',
      condition: 'True in at least one valid Venn model (even if false in others).',
      test: 'Can you draw at least one non-contradictory diagram where this holds? If yes, it is a possibility!'
    },
    {
      status: 'Cannot Be Determined (Indeterminate as Definite)',
      condition: 'True in some models, false in others.',
      test: 'As a DEFINITE statement, it fails. But as a POSSIBILITY statement, it succeeds!'
    }
  ],
  workedExamples: [
    {
      id: 'ex3_1',
      statements: [
        '1. Some scripts are functions.',
        '2. All functions are procedures.'
      ],
      proposedConclusions: [
        'I. All scripts being procedures is a possibility.',
        'II. All procedures being scripts is a possibility.'
      ],
      stepByStep: [
        'Step 1: The premises state S overlaps with F, and F ⊆ P.',
        'Step 2: Evaluate Conclusion I: Could the entire Set S be drawn inside Set P? Yes! If Set S is completely enclosed in P (while still overlapping F), all premises remain satisfied. Thus, Conclusion I IS A POSSIBILITY.',
        'Step 3: Evaluate Conclusion II: Could the entire Set P be drawn inside Set S? Yes! Set S could be the largest circle containing P (which contains F). All premises remain satisfied. Thus, Conclusion II IS ALSO A POSSIBILITY.',
        'Step 4: Final verdict: Both Conclusions I and II are valid possibilities.'
      ],
      finalResult: 'Both Conclusion I and Conclusion II follow as possibilities.',
      whyCorrect: 'Neither possibility contradicts any premise. Concentric set arrangements satisfy all conditions.'
    },
    {
      id: 'ex3_2',
      statements: [
        '1. All tokens are hashes.',
        '2. No hash is a cleartext password.'
      ],
      proposedConclusions: [
        'I. Some tokens being cleartext passwords is a possibility.',
        'II. Some cleartext passwords being tokens is a possibility.'
      ],
      stepByStep: [
        'Step 1: Premise 1: T ⊆ H. Premise 2: H ∩ C = ∅.',
        'Step 2: Since T is completely inside H, and H has zero overlap with C, Set T is completely blocked from Set C in ALL valid models.',
        'Step 3: T ∩ C = ∅ is a definite universal truth. Any overlap would directly contradict Premise 2.',
        'Step 4: Therefore, it is IMPOSSIBLE for any token to be a cleartext password. Both conclusions definitely do not follow.'
      ],
      finalResult: 'Neither conclusion follows.',
      whyCorrect: 'Direct negative contradiction. A subset of a disjoint set can never intersect the excluded set.'
    },
    {
      id: 'ex3_3',
      statements: [
        '1. Some routers are modems.',
        '2. Some modems are gateways.',
        '3. No gateway is a firewall.'
      ],
      proposedConclusions: [
        'I. All routers being firewalls is a possibility.',
        'II. All firewalls being modems is a possibility.'
      ],
      stepByStep: [
        'Step 1: R overlaps with M. M overlaps with G. G is disjoint from F.',
        'Step 2: Does F have any negative constraint with R? No! F is only blocked from G. F could completely contain R (or R could be inside F) without touching G. Thus, Conclusion I IS A POSSIBILITY.',
        'Step 3: Does F have a negative constraint with M? F cannot overlap with the G portion of M, but F could easily lie inside the non-G portion of M! Thus, All F being M IS A POSSIBILITY.',
        'Step 4: Final verdict: Both conclusions are valid possibilities.'
      ],
      finalResult: 'Both Conclusion I and Conclusion II follow as possibilities.',
      whyCorrect: 'No premise prevents R from being inside F, and no premise prevents F from being inside the non-G region of M.'
    },
    {
      id: 'ex3_4',
      statements: [
        '1. All caches are memories.',
        '2. Some memories are registers.',
        '3. No register is a disk.'
      ],
      proposedConclusions: [
        'I. All caches being disks is a possibility.',
        'II. Some disks being registers is a possibility.'
      ],
      stepByStep: [
        'Step 1: C ⊆ M. M overlaps R. R ∩ D = ∅.',
        'Step 2: Evaluate Conclusion I: C is inside M. R is disjoint from D. Could C be inside D? If C is inside D, and C is inside M, then M and D intersect. Does that violate any premise? No! Only R is forbidden from D, not M or C. Thus Conclusion I IS A POSSIBILITY.',
        'Step 3: Evaluate Conclusion II: Premise 3 explicitly asserts No register is a disk (R ∩ D = ∅). Any intersection between D and R is a direct contradiction! Thus Conclusion II is IMPOSSIBLE.',
        'Step 4: Final verdict: Only Conclusion I follows as a possibility.'
      ],
      finalResult: 'Only Conclusion I follows as a possibility.',
      whyCorrect: 'Conclusion I does not violate any negative constraint. Conclusion II directly contradicts Premise 3.'
    },
    {
      id: 'ex3_5',
      statements: [
        '1. Only Python is used in Lab 1 (Meaning: All Lab 1 languages are Python).',
        '2. Some Python developers know Java.'
      ],
      proposedConclusions: [
        'I. Some Lab 1 developers knowing Java is a possibility.',
        'II. No Lab 1 developer knowing Java is a possibility.'
      ],
      stepByStep: [
        'Step 1: Premise 1 equates to: Lab1 ⊆ Python. Premise 2: Python ∩ Java ≠ ∅.',
        'Step 2: Can Lab 1 overlap with the Java portion of Python? Yes! Lab 1 could be inside the Python ∩ Java intersection. Thus Conclusion I is a possibility.',
        'Step 3: Can Lab 1 be completely inside the non-Java portion of Python? Yes! Lab 1 could avoid the Java overlap entirely. Thus Conclusion II is also a possibility.',
        'Step 4: Since neither state is prohibited and neither is guaranteed, BOTH are valid possibilities.'
      ],
      finalResult: 'Both Conclusion I and Conclusion II follow as possibilities.',
      whyCorrect: 'The premises allow Lab 1 to either overlap with or remain disjoint from Java inside Python.'
    }
  ]
};

export const section4VennTechniques = {
  title: 'Section 4 – Venn Diagram and Logical Elimination Techniques',
  theory: `Venn diagrams provide a visual proof mechanism for categorical reasoning. In advanced problems involving 3 or 4 sets, you must distinguish between the "Minimal Model" (representing only the mandatory overlaps asserted by the premises) and "Alternative Models" (incorporating permitted overlaps).`,
  sevenStepMethod: [
    '1. Identify all unique categories (nouns) in the premises.',
    '2. Draw closed curves (circles or ellipses) for each category.',
    '3. Universal Affirmative (All A are B): Place Set A entirely inside Set B.',
    '4. Universal Negative (No A is B): Draw Set A and Set B disjoint and place a clear connecting cross-line (X) between them.',
    '5. Particular Affirmative (Some A are B): Place an asterisk (*) or checkmark in the overlapping region.',
    '6. Test Proposed Conclusions: Does the conclusion hold in the minimal diagram? If no, it is NOT a definite conclusion.',
    '7. Counter-Model Search: If it holds in the minimal diagram, can an alternative valid diagram be drawn where it is false? If so, it fails!'
  ],
  workedExamples: [
    {
      id: 'ex4_1',
      title: 'Three-Circle Classic Intersection',
      statements: [
        '1. All analysts are coders.',
        '2. All coders are problem solvers.',
        '3. No problem solver is lazy.'
      ],
      conclusions: [
        'I. No analyst is lazy.',
        'II. Some problem solvers are analysts.'
      ],
      vennModel: `
[Analysts] ⊂ [Coders] ⊂ [Problem Solvers]  <====X====>  [Lazy]
      `,
      stepByStep: [
        'Set A is inside Set C. Set C is inside Set P. Set P is disjoint from Set L.',
        'Conclusion I: Since Set A is inside Set P, and Set P has zero overlap with Set L, Set A cannot overlap with Set L. Valid in 100% of models.',
        'Conclusion II: Set A exists inside Set P. Therefore, the region of Set P occupied by Set A guarantees that some problem solvers are analysts. Valid in 100% of models.',
        'Both conclusions follow.'
      ],
      finalResult: 'Both Conclusion I and Conclusion II follow.',
      whyCorrect: 'Concentric nesting establishes universal negative with Set L and non-empty particular intersection with Set P.'
    },
    {
      id: 'ex4_2',
      title: 'The "Only / None But" Disambiguation',
      statements: [
        '1. Only cloud architects have admin keys (Admin keys ⊆ Cloud architects).',
        '2. Some interns have admin keys.'
      ],
      conclusions: [
        'I. Some interns are cloud architects.',
        'II. All cloud architects are interns.'
      ],
      vennModel: `
[Admin Keys] ⊂ [Cloud Architects]
[Interns] overlaps [Admin Keys]
      `,
      stepByStep: [
        'Statement 1: "Only A are B" translates to "All B are A". Thus, Admin keys ⊆ Cloud architects.',
        'Statement 2: Some Interns have Admin keys (Interns ∩ Admin keys ≠ ∅).',
        'Conclusion I: Since the Admin keys region is entirely inside Cloud architects, any intern with an admin key is automatically a cloud architect. Conclusion I DEFINITELY FOLLOWS.',
        'Conclusion II: Cloud architects could be much larger than Admin keys and Interns. Conclusion II DOES NOT FOLLOW.'
      ],
      finalResult: 'Only Conclusion I follows.',
      whyCorrect: 'The overlap between Interns and Admin keys is contained inside Cloud architects, proving Some interns are cloud architects.'
    },
    {
      id: 'ex4_3',
      title: 'Four-Category Set Partitioning',
      statements: [
        '1. All frontend devs know CSS.',
        '2. All backend devs know SQL.',
        '3. No one who knows CSS knows SQL.',
        '4. Some designers are frontend devs.'
      ],
      conclusions: [
        'I. No frontend dev knows SQL.',
        'II. Some designers know CSS.',
        'III. No designer knows SQL.'
      ],
      vennModel: `
[Frontend] ⊂ [CSS]    <==X==>    [SQL] ⊃ [Backend]
    ∪ (overlap)
[Designers]
      `,
      stepByStep: [
        'Check I: Frontend ⊆ CSS. CSS ∩ SQL = ∅. Thus Frontend ∩ SQL = ∅. Conclusion I follows.',
        'Check II: Designers overlap Frontend, and Frontend ⊆ CSS. Thus Designers overlap CSS. Conclusion II follows.',
        'Check III: Designers overlap CSS, but can Designers also overlap SQL outside Frontend and CSS? Yes! Nothing prevents Designers from touching SQL. Conclusion III does NOT follow.'
      ],
      finalResult: 'Only Conclusions I and II follow.',
      whyCorrect: 'Conclusions I and II are guaranteed by transitive inclusion. Conclusion III is an unsupported exclusion.'
    },
    {
      id: 'ex4_4',
      title: 'Particular Negative Boundary Test',
      statements: [
        '1. Some algorithms are efficient.',
        '2. All efficient solutions are scalable.',
        '3. Some algorithms are not scalable.'
      ],
      conclusions: [
        'I. Some algorithms are scalable.',
        'II. All scalable solutions are algorithms.'
      ],
      vennModel: `
Algorithms ∩ Efficient ≠ ∅
Efficient ⊆ Scalable
Algorithms \\ Scalable ≠ ∅
      `,
      stepByStep: [
        'Check I: Algorithms overlap Efficient. Efficient is inside Scalable. Thus Algorithms must overlap Scalable! Conclusion I definitely follows.',
        'Check II: Scalable can be far larger than Algorithms. Conclusion II does not follow.'
      ],
      finalResult: 'Only Conclusion I follows.',
      whyCorrect: 'Algorithms intersect Efficient, which is a subset of Scalable, guaranteeing an overlap with Scalable.'
    },
    {
      id: 'ex4_5',
      title: 'The Either-Or Complementary Pair Principle',
      statements: [
        '1. Some scripts are modules.',
        '2. Some modules are libraries.'
      ],
      conclusions: [
        'I. Some scripts are libraries.',
        'II. No script is a library.'
      ],
      vennModel: `
Scripts overlaps Modules; Modules overlaps Libraries.
Relative position of Scripts and Libraries is indeterminate.
      `,
      stepByStep: [
        'Individually: Neither Conclusion I nor Conclusion II is guaranteed.',
        'Complementary Pair Test: Notice that Conclusions I (Some A are B) and II (No A is B) form an I-E contradictory pair!',
        'In any logical model, either Set Scripts and Set Libraries share at least one element (Some are), OR they share zero elements (No are). One of these two MUST be true.',
        'Therefore, "Either I or II follows".'
      ],
      finalResult: 'Either Conclusion I or Conclusion II follows.',
      whyCorrect: 'They form an exhaustive contradictory pair (I and E propositions) between the exact same subject and predicate.'
    }
  ]
};

export const section5HiddenAssumptions = {
  title: 'Section 5 – Identifying Hidden Assumptions',
  introduction: `An assumption is an unstated, implicit premise that the author MUST accept as true for their conclusion or statement to hold. If the assumption is shown to be false, the entire argument collapses. To master assumption questions, you must apply the formal Negation Technique.`,
  negationTest: {
    title: 'The Negation Test (The Ultimate Acid Test)',
    steps: [
      'Step 1: Identify the author’s primary conclusion and supporting premises.',
      'Step 2: Negate the candidate assumption (turn it into its logical opposite).',
      'Step 3: Insert the negated statement back into the argument.',
      'Step 4: Evaluate the impact: If the author’s conclusion completely FALLS APART, the assumption is NECESSARY. If the conclusion still survives, the assumption is NOT necessary!'
    ]
  },
  workedExamples: [
    {
      id: 'assump_1',
      statement: '“The institute introduced additional live lab practice sessions, and the percentage of students clearing technical placement interviews increased from 62% to 88%.”',
      proposedAssumptions: [
        'I. The additional live lab practice sessions contributed to the improved interview performance.',
        'II. Prior to this, students were completely incapable of clearing technical interviews.',
        'III. No other factors (such as easier interview questions or prior preparation) were solely responsible for the 26% increase.'
      ],
      analysis: [
        'Assumption I: Negate it: "The practice sessions did NOT contribute to the improvement." If they did not contribute, crediting the practice sessions is entirely unfounded. Hence, this is a necessary underlying assumption.',
        'Assumption II: Negate it: "Prior to this, students were NOT completely incapable." The premise already states 62% cleared! This assumption is absurd and contradicted by the fact.',
        'Assumption III: Negate it: "Other factors were SOLELY responsible for the increase." If other factors were solely responsible, the practice sessions had zero effect, destroying the implicit causal link. Thus, III is also necessary.',
        'Verdict: Assumptions I and III are valid implicit assumptions.'
      ],
      finalResult: 'Assumptions I and III are implicit.',
      whyCorrect: 'Both I and III are required to establish that the observed increase is not purely coincidental.'
    },
    {
      id: 'assump_2',
      statement: '“To resolve database latency issues during peak traffic hours, Alpha Fly should migrate its monolithic LMS to a microservices architecture.”',
      proposedAssumptions: [
        'I. Microservices architecture is capable of handling peak traffic latency better than the current monolithic architecture.',
        'II. Database latency during peak traffic hours is a problem that requires resolution.',
        'III. Alpha Fly has the financial and engineering budget to execute this migration immediately.'
      ],
      analysis: [
        'Assumption I: If microservices cannot handle latency better, recommending it is irrational. Negating it kills the recommendation. Necessary.',
        'Assumption II: If database latency does not need fixing, the proposal is pointless. Necessary.',
        'Assumption III: Budget details are external. While practical, the argument itself is about technical capability and necessity, not immediate affordability.',
        'Verdict: Assumptions I and II are necessary.'
      ],
      finalResult: 'Assumptions I and II are implicit.',
      whyCorrect: 'Recommending a solution assumes both that the problem requires fixing and that the proposed remedy works.'
    },
    {
      id: 'assump_3',
      statement: '“Enroll in our 30-day AI Bootcamp to guarantee yourself an entry-level AI developer role.”',
      proposedAssumptions: [
        'I. Completing the bootcamp provides sufficient skills or credentials required for entry-level AI roles.',
        'II. There are open entry-level AI developer roles available in the job market.',
        'III. Every candidate who enrolls will complete the entire 30 days.'
      ],
      analysis: [
        'Assumption I: If the bootcamp does not provide the needed skills, guaranteeing jobs is impossible. Necessary.',
        'Assumption II: If there are zero jobs in the market, the guarantee is impossible. Necessary.',
        'Assumption III: Guarantees are conditional upon completion. The advertisement does not assume 100% completion rate without attrition.',
        'Verdict: Assumptions I and II are necessary.'
      ],
      finalResult: 'Assumptions I and II are implicit.',
      whyCorrect: 'A job guarantee assumes both adequate training delivery and market demand.'
    },
    {
      id: 'assump_4',
      statement: '“Switching from manual code reviews to automated static code analyzers will reduce our deployment bugs by 40%.”',
      proposedAssumptions: [
        'I. A significant proportion of current deployment bugs are detectable by static code analyzers.',
        'II. Human developers will actively fix the warnings flagged by the automated tool.',
        'III. Manual code reviews are completely useless and should be abolished entirely.'
      ],
      analysis: [
        'Assumption I: If static analyzers cannot detect the types of bugs causing deployment issues, they cannot reduce them by 40%. Necessary.',
        'Assumption II: If developers ignore the tool’s output, bugs will still deploy. Necessary.',
        'Assumption III: Overly extreme. Replacing an activity does not require declaring it completely useless.',
        'Verdict: Assumptions I and II are necessary.'
      ],
      finalResult: 'Assumptions I and II are implicit.',
      whyCorrect: 'The tool must be capable of detecting the bugs and the team must act on its findings.'
    },
    {
      id: 'assump_5',
      statement: '“We must mandate two-factor authentication for all staff accounts to prevent credential phishing attacks.”',
      proposedAssumptions: [
        'I. Credential phishing attacks pose a legitimate threat to staff accounts.',
        'II. Two-factor authentication provides meaningful defense against unauthorized access even if passwords are leaked.',
        'III. Staff members will find two-factor authentication extremely convenient.'
      ],
      analysis: [
        'Assumption I: Mandating security controls assumes the threat exists. Necessary.',
        'Assumption II: 2FA must block access when passwords are compromised. Necessary.',
        'Assumption III: Convenience is not assumed; security mandates often accept user friction.',
        'Verdict: Assumptions I and II are implicit.'
      ],
      finalResult: 'Assumptions I and II are implicit.',
      whyCorrect: 'Mandates assume threat validity and mitigation efficacy, not convenience.'
    },
    {
      id: 'assump_6',
      statement: '“Students who solve at least 50 algorithmic puzzles weekly consistently secure top-quartile marks in technical assessments.”',
      proposedAssumptions: [
        'I. Solving 50 algorithmic puzzles weekly improves or reinforces problem-solving capabilities tested in technical assessments.',
        'II. The assessments test skills related to the algorithmic puzzles solved by the students.',
        'III. Solving fewer than 50 puzzles makes it impossible to achieve top-quartile marks.'
      ],
      analysis: [
        'Assumption I: Necessary connection between practice and test performance.',
        'Assumption II: Necessary alignment between puzzle domains and assessment contents.',
        'Assumption III: Extreme quantifier. The statement says solving 50 guarantees top-quartile, not that it is the EXCLUSIVE path.',
        'Verdict: Assumptions I and II are implicit.'
      ],
      finalResult: 'Assumptions I and II are implicit.',
      whyCorrect: 'Sufficient conditions do not imply necessity; III confuses sufficient with necessary.'
    }
  ]
};

export const section6StrongWeakArguments = {
  title: 'Section 6 – Strong and Weak Arguments',
  theory: `In argumentative reasoning, an argument is STRONG if it is both directly RELEVANT to the core issue and supported by SOUND, realistic evidence or established principles. An argument is WEAK if it is irrelevant, relies on emotional appeals, confuses correlation with causation, or overgeneralizes without factual grounding.`,
  evaluationCriteria: [
    { criterion: '1. Direct Relevance', desc: 'Does the premise directly address the specific policy or question asked, or does it deflect to a tangential topic?' },
    { criterion: '2. Proportionality & Causal Link', desc: 'Is there a verified cause-and-effect relationship, or is it an unsubstantiated speculation?' },
    { criterion: '3. Avoidance of Fallacies', desc: 'Does the argument avoid ad hominem (attacking people), slippery slope (extreme catastrophic projections), and circular reasoning?' },
    { criterion: '4. Concrete Evidence vs Emotional Appeal', desc: 'Does it cite empirical realities, industry standards, or operational metrics rather than emotional sentiment?' }
  ],
  workedExamples: [
    {
      id: 'arg_1',
      question: 'Should Alpha Fly Computer Education make project-based capstones mandatory for course completion certificates?',
      argument1: 'Argument I: Yes, because tech employers increasingly require demonstrable GitHub repositories and hands-on portfolio artifacts during hiring screenings.',
      argument2: 'Argument II: No, because some students feel stressed when building complete software applications.',
      evaluation: 'Argument I is STRONG; Argument II is WEAK.',
      reasoning: 'Argument I directly connects curriculum policy to real-world employment criteria with concrete, verified rationale. Argument II is weak because transient student stress does not outweigh professional competence requirements in vocational education.'
    },
    {
      id: 'arg_2',
      question: 'Should companies completely replace human software testers with autonomous AI agents?',
      argument1: 'Argument I: Yes, because AI agents work 24/7 without needing salaries or taking leave.',
      argument2: 'Argument II: No, because current AI agents lack subjective user experience judgment, domain edge-case intuition, and can hallucinate test passing states.',
      evaluation: 'Argument I is WEAK; Argument II is STRONG.',
      reasoning: 'Argument I ignores software quality and correctness, focusing exclusively on cost while neglecting systemic risk. Argument II addresses technical reliability, failure modes, and domain validity directly.'
    },
    {
      id: 'arg_3',
      question: 'Should colleges ban students from using smartphones inside computer labs?',
      argument1: 'Argument I: Yes, because mobile notifications frequently cause cognitive fragmentation and distract students from programming tasks.',
      argument2: 'Argument II: No, because other colleges in neighboring cities allow smartphones.',
      evaluation: 'Argument I is STRONG; Argument II is WEAK.',
      reasoning: 'Argument I provides a sound pedagogical and cognitive rationale. Argument II is a peer fallacy (bandwagon/appeal to other colleges) without demonstrating educational benefit.'
    },
    {
      id: 'arg_4',
      question: 'Should all legacy relational databases be immediately migrated to NoSQL document stores?',
      argument1: 'Argument I: No, because relational databases provide guaranteed ACID transactional consistency, which is vital for financial and ledger records.',
      argument2: 'Argument II: Yes, because NoSQL is modern and everyone is talking about it on social media.',
      evaluation: 'Argument I is STRONG; Argument II is WEAK.',
      reasoning: 'Argument I cites core computer science database invariants (ACID transactions). Argument II is a superficial trend appeal without technical substance.'
    },
    {
      id: 'arg_5',
      question: 'Should software companies adopt a mandatory 4-day work week for engineering teams?',
      argument1: 'Argument I: Yes, because multiple empirical corporate trials demonstrated that well-rested engineers produce fewer critical bugs and maintain higher sustained velocity.',
      argument2: 'Argument II: No, because computers operate 7 days a week, so humans should work more days too.',
      evaluation: 'Argument I is STRONG; Argument II is WEAK.',
      reasoning: 'Argument I cites measurable empirical productivity studies. Argument II is a bizarre false equivalence comparing mechanical hardware to biological human cognition.'
    }
  ]
};

export const practiceSetA = [
  {
    id: 'pa1',
    question: 'Statements: All compilers are translators. No translator is an emulator. All emulators are virtual environments. Conclusions: I. No compiler is an emulator. II. Some virtual environments are not translators.',
    options: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Both conclusions I and II follow',
      'Neither conclusion follows'
    ],
    correct: 'C',
    explanation: '1) Compilers ⊆ Translators. 2) Translators ∩ Emulators = ∅. 3) Emulators ⊆ Virtual Environments. Conclusion I: Since Compilers are inside Translators, and Translators are disjoint from Emulators, Compilers cannot overlap Emulators. Follows. Conclusion II: Emulators are inside Virtual Environments. Since Emulators are disjoint from Translators, those Virtual Environments that are Emulators can NEVER be Translators. Follows. Both follow.',
    distractors: [
      'Option A: Misses conclusion II which is guaranteed by the non-empty Emulators subset in Virtual Environments.',
      'Option B: Misses conclusion I which is a direct transitive exclusion.',
      'Option D: Both conclusions are formally valid.'
    ]
  },
  {
    id: 'pa2',
    question: 'Statements: Some scripts are automated. All automated tools are reliable. No reliable tool is buggy. Conclusions: I. Some scripts are reliable. II. No automated tool is buggy. III. Some scripts are not buggy.',
    options: [
      'Only I and II follow',
      'Only II and III follow',
      'Only I and III follow',
      'All I, II, and III follow'
    ],
    correct: 'D',
    explanation: '1) Scripts overlap Automated (S ∩ A ≠ ∅). 2) Automated ⊆ Reliable. 3) Reliable ∩ Buggy = ∅. Conclusion I: The overlap S ∩ A is inside Reliable. Thus Some scripts are reliable. Follows. Conclusion II: Automated is inside Reliable, and Reliable is disjoint from Buggy. Thus No automated tool is buggy. Follows. Conclusion III: The scripts that are automated/reliable cannot be buggy. Thus Some scripts are not buggy. Follows. All three follow.',
    distractors: [
      'Option A: Overlooks Conclusion III.',
      'Option B: Overlooks Conclusion I.',
      'Option C: Overlooks Conclusion II.'
    ]
  },
  {
    id: 'pa3',
    question: 'Statements: All algorithms are deterministic. Some procedures are algorithms. No procedure is chaotic. Conclusions: I. Some deterministic processes are procedures. II. Some deterministic processes are not chaotic.',
    options: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Both conclusions follow',
      'Neither conclusion follows'
    ],
    correct: 'C',
    explanation: '1) Algorithms ⊆ Deterministic. 2) Procedures overlap Algorithms (P ∩ A ≠ ∅). 3) Procedures ∩ Chaotic = ∅. Conclusion I: P ∩ A is inside Deterministic, so Some deterministic processes are procedures. Follows. Conclusion II: P ∩ A is inside Deterministic. But wait: are those procedures disjoint from Chaotic? Yes, all procedures are disjoint from Chaotic! Therefore, the deterministic processes in P ∩ A cannot be chaotic. Thus Some deterministic processes are not chaotic. Both follow.',
    distractors: [
      'Option A: Misses Conclusion II.',
      'Option B: Misses Conclusion I.',
      'Option D: Both are valid deductive derivations.'
    ]
  },
  {
    id: 'pa4',
    question: 'Statements: No frontend dev is a DBA. All DBAs are SQL experts. Some SQL experts are data scientists. Conclusions: I. No frontend dev is a SQL expert. II. Some data scientists are not frontend devs.',
    options: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Either conclusion I or II follows',
      'Neither conclusion follows'
    ],
    correct: 'D',
    explanation: '1) Frontend ∩ DBA = ∅. 2) DBA ⊆ SQL. 3) SQL ∩ DataScience ≠ ∅. Check I: Frontend is disjoint from DBA. But SQL is larger than DBA. Frontend could easily overlap SQL outside DBA. Conclusion I fails. Check II: Could all Data Scientists be frontend devs? Data Science overlaps SQL. Can Frontend devs overlap SQL and Data Science while avoiding DBA? Yes! None of the premises prohibit Frontend from overlapping Data Science. Neither conclusion follows.',
    distractors: [
      'Option A: Fallacy of extending disjointness with a subset (DBA) to the superset (SQL).',
      'Option B: Assumes Data Scientists cannot overlap Frontend.',
      'Option C: Not a complementary pair.'
    ]
  },
  {
    id: 'pa5',
    question: 'Statements: All cloud nodes are virtual. All virtual nodes are scalable. Some scalable nodes are containerized. Conclusions: I. All cloud nodes are scalable. II. Some cloud nodes are containerized.',
    options: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Both follow',
      'Neither follows'
    ],
    correct: 'A',
    explanation: '1) Cloud ⊆ Virtual. 2) Virtual ⊆ Scalable. 3) Scalable ∩ Containerized ≠ ∅. Conclusion I: Cloud ⊆ Scalable (transitive). Follows. Conclusion II: Containerized overlaps Scalable, but might only touch the outer ring of Scalable, never reaching Cloud. Does not follow definitely. Only I follows.',
    distractors: [
      'Option B: Assumes particular overlap reaches the innermost subset.',
      'Option C: Incorrectly accepts Conclusion II as definite.',
      'Option D: Misses valid transitive inclusion I.'
    ]
  }
];

export const practiceSetB = [
  {
    id: 'pb1',
    question: 'Statements: Some routers are gateways. Some gateways are proxies. Conclusions: I. All routers being proxies is a possibility. II. No router being a proxy is a possibility.',
    options: [
      'Only conclusion I is a possibility',
      'Only conclusion II is a possibility',
      'Both conclusions are possibilities',
      'Neither is a possibility'
    ],
    correct: 'C',
    explanation: 'Routers overlap Gateways, and Gateways overlap Proxies. There are zero negative premises! In the absence of negative constraints, Routers and Proxies can either completely overlap (All R are P) or be completely disjoint (No R is P). Both represent valid non-contradictory models.',
    distractors: [
      'Option A: Fails to see that disjointness is also permitted.',
      'Option B: Fails to see that complete inclusion is permitted.',
      'Option D: Confuses possibility with definite requirement.'
    ]
  },
  {
    id: 'pb2',
    question: 'Statements: All firewalls are filters. No filter is malware. Conclusions: I. Some firewalls being malware is a possibility. II. No firewall being malware is a certainty.',
    options: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Both follow',
      'Neither follows'
    ],
    correct: 'B',
    explanation: 'Firewalls ⊆ Filters. Filters ∩ Malware = ∅. Since Firewalls are inside Filters, Firewalls can NEVER touch Malware. Conclusion I is strictly IMPOSSIBLE. Conclusion II ("No firewall is malware is a certainty") is 100% true in all models. Only II follows.',
    distractors: [
      'Option A: Direct contradiction of premise 2.',
      'Option C: Cannot be both possible and impossible.',
      'Option D: Misses that certainty of non-overlap is valid.'
    ]
  },
  {
    id: 'pb3',
    question: 'Statements: Some microservices are written in Java. Some microservices are written in Rust. No Rust service has memory leaks. Conclusions: I. All Java microservices having memory leaks is a possibility. II. Some Java microservices having no memory leaks is a certainty.',
    options: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Both follow',
      'Neither follows'
    ],
    correct: 'A',
    explanation: 'Java microservices are not subject to the negative constraint (only Rust services are leak-free). Could all Java microservices have memory leaks? Yes, nothing prevents it. Conclusion I is a possibility. Is it a CERTAINTY that some Java services have no leaks? No! Java services could all leak. Thus II is not a certainty. Only I follows.',
    distractors: [
      'Option B: Confuses possibility with certainty.',
      'Option C: II is not guaranteed.',
      'Option D: I is a completely valid possibility.'
    ]
  },
  {
    id: 'pb4',
    question: 'Statements: Only engineers can access the production cluster. Some engineers are interns. Conclusions: I. All interns accessing the production cluster is a possibility. II. No intern accessing the production cluster is a possibility.',
    options: [
      'Only I follows',
      'Only II follows',
      'Both I and II follow as possibilities',
      'Neither follows'
    ],
    correct: 'C',
    explanation: '"Only engineers can access cluster" means ClusterAccess ⊆ Engineers. Interns overlap Engineers. Can all Interns be inside Engineers and have Cluster Access? Yes. Can the overlap between Interns and Engineers have zero Cluster Access? Yes, because ClusterAccess could be a subset of non-intern engineers. Both are valid possibilities.',
    distractors: [
      'Option A: Misses that zero overlap with access is also permitted.',
      'Option B: Misses that full access is permitted.',
      'Option D: Both are valid independent models.'
    ]
  },
  {
    id: 'pb5',
    question: 'Statements: All caches are high-speed. Some high-speed memories are volatile. No volatile memory is non-volatile. Conclusions: I. All caches being volatile is a possibility. II. All caches being non-volatile is a possibility.',
    options: [
      'Only I is a possibility',
      'Only II is a possibility',
      'Both I and II are valid possibilities',
      'Neither is a possibility'
    ],
    correct: 'C',
    explanation: 'Caches ⊆ HighSpeed. HighSpeed overlaps Volatile. Caches can either be inside Volatile, or completely outside Volatile (and thus non-volatile). Neither violates any premise. Both are valid possibilities.',
    distractors: [
      'Option A: Overlooks that caches can be non-volatile.',
      'Option B: Overlooks that caches can be volatile.',
      'Option D: Neither contradicts the premises.'
    ]
  }
];

export const practiceSetC = [
  {
    id: 'pc1',
    question: 'Statement: “Alpha Fly introduced an AI-assisted diagnostic quiz before every coding session, leading to a 35% decrease in syntax errors during lab practicals.” Which assumption is necessary?',
    options: [
      'Syntax errors were the only errors students made prior to this quiz.',
      'The AI-assisted diagnostic quiz helped students identify and avoid syntax errors.',
      'All computer education institutes should use the same diagnostic quiz.',
      'Students would have eliminated all syntax errors without any intervention.'
    ],
    correct: 'B',
    explanation: 'Applying the Negation Test: If the quiz did NOT help students identify and avoid syntax errors, then attributing the 35% decrease to the quiz is completely invalid. Thus Option B is a necessary assumption.',
    distractors: [
      'Option A: "Only errors" is extreme and unstated.',
      'Option C: External normative recommendation.',
      'Option D: Directly contradicts the premise causal claim.'
    ]
  },
  {
    id: 'pc2',
    question: 'Statement: “To build production-grade web applications, developers must master asynchronous JavaScript and promise handling.” Which assumption is implicit?',
    options: [
      'Synchronous JavaScript cannot handle all modern web application requirements such as API fetching and non-blocking I/O.',
      'Asynchronous JavaScript is the most difficult programming concept ever invented.',
      'Developers who master asynchronous JavaScript will never introduce software bugs.',
      'Python and Java do not support asynchronous programming.'
    ],
    correct: 'A',
    explanation: 'Negation Test: If synchronous JavaScript COULD handle all modern web app requirements, then mastering asynchronous JS would NOT be a strict necessity ("must master"). Thus, Option A is a necessary assumption.',
    distractors: [
      'Option B: Hyperbolic value judgment.',
      'Option C: Extreme overgeneralization.',
      'Option D: Irrelevant comparison with other languages.'
    ]
  },
  {
    id: 'pc3',
    question: 'Question: Should tech institutes replace all physical classroom lectures with pre-recorded on-demand video modules? Argument I: No, because live classroom environments enable immediate doubt resolution, collaborative peer debugging, and structured accountability. Argument II: Yes, because recorded videos can be watched while eating snacks.',
    options: [
      'Only Argument I is strong',
      'Only Argument II is strong',
      'Both arguments are strong',
      'Neither argument is strong'
    ],
    correct: 'A',
    explanation: 'Argument I addresses core pedagogical efficacy, feedback loops, and educational accountability. It is strong. Argument II is frivolous, trivial, and lacks educational substance. Only Argument I is strong.',
    distractors: [
      'Option B: Argument II is trivial and weak.',
      'Option C: Fails to evaluate quality of evidence.',
      'Option D: Argument I is a sound pedagogical argument.'
    ]
  },
  {
    id: 'pc4',
    question: 'Statement: “The company should migrate from self-hosted physical servers to managed cloud instances to minimize downtime caused by hardware failures.” Which assumption is implicit?',
    options: [
      'Managed cloud instances experience less downtime from hardware failures than self-hosted physical servers.',
      'Physical servers never fail under ordinary operating conditions.',
      'Cloud instances are completely free of operational costs.',
      'Cloud providers never experience security breaches.'
    ],
    correct: 'A',
    explanation: 'Negation Test: If managed cloud instances experienced equal or GREATER downtime from hardware failures, migrating to minimize downtime would be irrational. Hence Option A is essential.',
    distractors: [
      'Option B: Contradicted by the statement intent.',
      'Option C: Unrelated to cost.',
      'Option D: Unrelated to security.'
    ]
  },
  {
    id: 'pc5',
    question: 'Question: Should competitive programming ratings be the sole criteria for hiring software engineers? Argument I: No, because competitive programming does not evaluate system design, code maintainability, teamwork, or architectural trade-offs essential in industry projects. Argument II: Yes, because people who solve math puzzles are always the best humans.',
    options: [
      'Only Argument I is strong',
      'Only Argument II is strong',
      'Both are strong',
      'Neither is strong'
    ],
    correct: 'A',
    explanation: 'Argument I accurately identifies the discrepancy between isolated algorithmic puzzle solving and enterprise engineering realities. It is strong. Argument II is a sweeping, emotional overgeneralization with zero validity. Only I is strong.',
    distractors: [
      'Option B: Argument II is an absurd overgeneralization.',
      'Option C: Argument II is completely invalid.',
      'Option D: Argument I is highly relevant and strong.'
    ]
  }
];

export const challengeCaseStudy = {
  title: 'Alpha Fly Computer Education – Evaluating Course Claims',
  context: `Alpha Fly Computer Education’s Curriculum Academic Council is auditing student performance metrics across Full Stack Web Development, Python Data Science, and Cloud DevOps. The faculty board submitted an evaluation report containing eight interconnected claims, premises, and statistical observations. As Lead Reasoning Analyst, you must audit the logical consistency of these claims.`,
  premises: [
    '1. All students enrolled in the Cloud DevOps cohort complete the Docker & Kubernetes module.',
    '2. No student who completes the Docker & Kubernetes module fails the Linux deployment practical.',
    '3. Some students who pass the Linux deployment practical are hired by Tier-1 cloud service providers.',
    '4. All students who maintain >90% lab attendance complete the Docker & Kubernetes module.',
    '5. In the Python Data Science cohort, the introduction of automated SQL code linting coincided with a 30% increase in capstone project submission scores.',
    '6. Some Python Data Science students are also enrolled in the Cloud DevOps cohort.',
    '7. The academic director stated: "To maximize placement offers, we should replace all conceptual lectures with algorithmic speed drills."',
    '8. Student feedback indicates: "Students who participate in weekly peer code reviews report higher confidence during technical HR interviews."'
  ],
  questions: [
    {
      qId: 'ccq1',
      question: 'Based on Premises 1 and 2, which syllogistic conclusion definitely follows?',
      options: [
        'All students who pass the Linux deployment practical are in the Cloud DevOps cohort.',
        'No student enrolled in the Cloud DevOps cohort fails the Linux deployment practical.',
        'Some Cloud DevOps students fail the Linux deployment practical.',
        'All students in the institute are enrolled in Cloud DevOps.'
      ],
      correct: 'B',
      explanation: 'DevOps ⊆ DockerModule. DockerModule ∩ FailsLinux = ∅. Therefore, DevOps ∩ FailsLinux = ∅. "No student enrolled in the Cloud DevOps cohort fails the Linux deployment practical" definitely follows.'
    },
    {
      qId: 'ccq2',
      question: 'Based on Premises 1, 2, and 3, which of the following is a VALID POSSIBILITY (not necessarily a certainty)?',
      options: [
        'Some students who fail the Linux deployment practical completed the Docker module.',
        'All Cloud DevOps students being hired by Tier-1 cloud service providers is a possibility.',
        'No student enrolled in Cloud DevOps completes the Docker module.',
        'Some students who fail the Linux deployment practical are in the Cloud DevOps cohort.'
      ],
      correct: 'B',
      explanation: 'Premise 3 states Some students who pass Linux deployment are hired by Tier-1 providers. Could ALL Cloud DevOps students be in that hired group? Yes! Nothing prevents 100% of DevOps students from being hired. It is a completely valid possibility.'
    },
    {
      qId: 'ccq3',
      question: 'Evaluate Premise 5: "The introduction of automated SQL code linting coincided with a 30% increase in capstone project scores." What hidden assumption is required to conclude that linting CAUSED the score increase?',
      options: [
        'SQL code linting is the only programming topic taught in Python Data Science.',
        'The increase in capstone project scores was not caused solely by other concurrent factors (such as easier grading or extra tutoring).',
        'Students who do not use SQL code linting will always receive failing grades.',
        'Every student in Python Data Science achieved a 100% score.'
      ],
      correct: 'B',
      explanation: 'Correlation does not establish causation without ruling out confounding variables. For the linting tool to be credited with the increase, it must be assumed that external concurrent factors were not solely responsible.'
    },
    {
      qId: 'ccq4',
      question: 'Evaluate the Academic Director’s statement in Premise 7: "To maximize placement offers, we should replace all conceptual lectures with algorithmic speed drills." Why is this argument WEAK?',
      options: [
        'Because algorithmic speed drills are completely banned by tech companies.',
        'Because technical placement interviews evaluate conceptual fundamentals, system design, and architectural reasoning alongside coding, making complete elimination of conceptual lectures counter-productive.',
        'Because students do not like taking lectures in the morning.',
        'Because the academic director has no authority over curriculum.'
      ],
      correct: 'B',
      explanation: 'The proposal commits an extreme false dichotomy (replacing ALL conceptual foundations with speed drills). Technical interviews heavily test system design and conceptual trade-offs.'
    },
    {
      qId: 'ccq5',
      question: 'Based on Premises 2 and 4, which conclusion is guaranteed to be true?',
      options: [
        'No student with >90% lab attendance fails the Linux deployment practical.',
        'All students who pass the Linux practical have >90% lab attendance.',
        'Some students with >90% lab attendance fail the Linux deployment practical.',
        'Only students with >90% lab attendance can complete the Docker module.'
      ],
      correct: 'A',
      explanation: 'Attendance >90% ⊆ DockerModule. DockerModule ∩ FailsLinux = ∅. Transitive exclusion proves that No student with >90% lab attendance fails the Linux deployment practical.'
    }
  ]
};

export const finalAssessmentQuestions = [
  // 1-6: Advanced Syllogisms
  {
    id: 'fa1',
    category: 'Advanced Syllogisms',
    question: 'Statements: All microservices are containerized. All containerized apps are orchestrated. No orchestrated app is unmonitored. Conclusions: I. No microservice is unmonitored. II. Some orchestrated apps are microservices.',
    options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
    correct: 'C',
    explanation: 'Microservices ⊆ Containerized ⊆ Orchestrated. Orchestrated ∩ Unmonitored = ∅. 1) Microservices are inside Orchestrated, so they cannot be unmonitored (I follows). 2) Microservices exist inside Orchestrated, so some orchestrated apps are microservices (II follows). Both follow.',
    distractorReason: 'Both conclusions follow from direct transitive set nesting.'
  },
  {
    id: 'fa2',
    category: 'Advanced Syllogisms',
    question: 'Statements: Some APIs are RESTful. Some APIs are GraphQL. No RESTful API is SOAP. Conclusions: I. Some GraphQL APIs are RESTful. II. Some APIs are not SOAP.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correct: 'B',
    explanation: 'APIs overlap RESTful. RESTful ∩ SOAP = ∅. Those APIs that are RESTful can NEVER be SOAP! Thus "Some APIs are not SOAP" definitely follows. APIs overlapping GraphQL and RESTful does not require GraphQL and RESTful to touch. Only II follows.',
    distractorReason: 'Conclusion I is an invalid assumption of overlap between two independent offshoots.'
  },
  {
    id: 'fa3',
    category: 'Advanced Syllogisms',
    question: 'Statements: All Python developers know Git. No one who knows Git is careless with versioning. All Alpha Fly staff know Git. Conclusions: I. No Python developer is careless with versioning. II. All Alpha Fly staff are Python developers.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correct: 'A',
    explanation: 'PythonDev ⊆ Git. Git ∩ Careless = ∅. Hence PythonDev ∩ Careless = ∅ (I follows). Staff ⊆ Git does not mean Staff ⊆ PythonDev (converse fallacy). Only I follows.',
    distractorReason: 'Conclusion II commits the fallacy of assuming two subsets of the same superset must equal each other.'
  },
  {
    id: 'fa4',
    category: 'Advanced Syllogisms',
    question: 'Statements: No bug is a feature. All features are documented. Some documented items are test cases. Conclusions: I. Some documented items are not bugs. II. No bug is a test case.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correct: 'A',
    explanation: 'Features ⊆ Documented. Bug ∩ Feature = ∅. The documented items that are features cannot be bugs. Thus Some documented items are not bugs (I follows). Test cases can overlap Bug outside Documented. Thus II does not follow. Only I follows.',
    distractorReason: 'Conclusion II fails because Test Cases are not constrained from intersecting Bug.'
  },
  {
    id: 'fa5',
    category: 'Advanced Syllogisms',
    question: 'Statements: All compiled languages are statically typed. Some statically typed languages are memory safe. All memory safe languages are modern. Conclusions: I. Some compiled languages are memory safe. II. Some modern languages are statically typed.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correct: 'B',
    explanation: 'Compiled ⊆ StaticallyTyped. StaticallyTyped overlaps MemorySafe. MemorySafe ⊆ Modern. MemorySafe is inside Modern and overlaps StaticallyTyped, so Some modern languages are statically typed (II follows). The overlap between StaticallyTyped and MemorySafe might not contain any Compiled languages. Conclusion I fails. Only II follows.',
    distractorReason: 'Conclusion I assumes particular overlap reaches the internal subset.'
  },
  {
    id: 'fa6',
    category: 'Advanced Syllogisms',
    question: 'Statements: Some databases are relational. No relational database is schema-less. All NoSQL databases are schema-less. Conclusions: I. No relational database is NoSQL. II. Some databases are not NoSQL.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correct: 'C',
    explanation: 'Relational ∩ SchemaLess = ∅. NoSQL ⊆ SchemaLess. 1) Since NoSQL is inside SchemaLess, Relational cannot touch NoSQL (I follows). 2) The databases that are relational cannot be NoSQL. Thus Some databases are not NoSQL (II follows). Both follow.',
    distractorReason: 'Both conclusions follow from set exclusion.'
  },

  // 7-10: Possibility and Definite Conclusions
  {
    id: 'fa7',
    category: 'Possibility & Definite Conclusions',
    question: 'Statements: Some servers are Linux. Some servers are Windows. No Windows server is macOS. Conclusions: I. All Linux servers being Windows is a possibility. II. All Linux servers being macOS is a possibility.',
    options: ['Only I is a possibility', 'Only II is a possibility', 'Both I and II are valid possibilities', 'Neither is a possibility'],
    correct: 'C',
    explanation: 'Linux has no negative restrictions with Windows, nor with macOS! Linux can completely overlap Windows, or completely overlap macOS. Both are valid possibilities.',
    distractorReason: 'Neither possibility violates any negative constraint.'
  },
  {
    id: 'fa8',
    category: 'Possibility & Definite Conclusions',
    question: 'Statements: All encryptors are algorithms. No algorithm is a random guess. Conclusions: I. Some encryptors being random guesses is a possibility. II. No encryptor being a random guess is a certainty.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correct: 'B',
    explanation: 'Encryptors ⊆ Algorithms. Algorithms ∩ RandomGuess = ∅. Encryptors can NEVER be random guesses. Conclusion I is impossible. Conclusion II is a 100% certainty. Only II follows.',
    distractorReason: 'Conclusion I is a direct violation of universal exclusion.'
  },
  {
    id: 'fa9',
    category: 'Possibility & Definite Conclusions',
    question: 'Statements: Only certified security analysts can view audit logs. Some staff members view audit logs. Conclusions: I. All staff members being certified security analysts is a possibility. II. Some certified security analysts not being staff members is a possibility.',
    options: ['Only I is a possibility', 'Only II is a possibility', 'Both I and II are valid possibilities', 'Neither is a possibility'],
    correct: 'C',
    explanation: 'AuditLogs ⊆ Analysts. Staff overlaps AuditLogs. Staff can be entirely inside Analysts (I is a possibility). Analysts can be much larger than Staff (II is a possibility). Both are valid.',
    distractorReason: 'Both set configurations are non-contradictory.'
  },
  {
    id: 'fa10',
    category: 'Possibility & Definite Conclusions',
    question: 'Statements: Some frontend apps are responsive. No responsive app is slow. All slow apps are legacy. Conclusions: I. All frontend apps being legacy is a possibility. II. Some responsive apps being slow is a possibility.',
    options: ['Only I is a possibility', 'Only II is a possibility', 'Both are possibilities', 'Neither is a possibility'],
    correct: 'A',
    explanation: 'Conclusion II directly contradicts Premise 2 (No responsive app is slow), making II impossible. Can frontend apps be legacy? Yes, legacy can contain slow and non-slow apps. Thus Conclusion I is a possibility. Only I follows.',
    distractorReason: 'Conclusion II contradicts a universal negative premise.'
  },

  // 11-14: Venn Diagram Reasoning
  {
    id: 'fa11',
    category: 'Venn Diagram Reasoning',
    question: 'Statements: All routers are switches. All switches are hubs. No hub is a bridge. Which statement is verified by the minimal Venn diagram?',
    options: [
      'Some bridges are routers',
      'No router is a bridge',
      'All hubs are routers',
      'Some bridges are switches'
    ],
    correct: 'B',
    explanation: 'Routers ⊆ Switches ⊆ Hubs. Hubs ∩ Bridges = ∅. Routers is entirely inside Hubs, so Routers ∩ Bridges = ∅. "No router is a bridge" is verified.',
    distractorReason: 'Options A, C, and D violate the disjointness or subset direction.'
  },
  {
    id: 'fa12',
    category: 'Venn Diagram Reasoning',
    question: 'Statements: Some developers know C++. Some developers know Python. No one who knows C++ knows HTML. Which conclusion forms an Either-Or complementary pair?',
    options: [
      '“All developers know HTML” and “No developer knows HTML”',
      '“Some developers who know Python know HTML” and “No developer who know Python knows HTML”',
      '“All developers know C++” and “Some developers know C++”',
      '“Some developers know HTML” and “All developers know HTML”'
    ],
    correct: 'B',
    explanation: 'An I-proposition ("Some S are P") and an E-proposition ("No S is P") sharing the exact same subject and predicate form an exhaustive contradictory pair. Either Some Python devs know HTML, or No Python dev knows HTML.',
    distractorReason: 'Only Option B pairs "Some" with "No" between the identical subject and predicate.'
  },
  {
    id: 'fa13',
    category: 'Venn Diagram Reasoning',
    question: 'In a 3-circle Venn diagram of Developers, Testers, and Managers: Developers and Testers are disjoint. All Managers are Developers. Which statement is true?',
    options: [
      'Some Managers are Testers',
      'No Manager is a Tester',
      'All Testers are Managers',
      'Some Testers are Developers'
    ],
    correct: 'B',
    explanation: 'Managers ⊆ Developers. Developers ∩ Testers = ∅. Since Managers are inside Developers, Managers have zero intersection with Testers. "No Manager is a Tester" is true.',
    distractorReason: 'Direct consequence of Managers being a subset of a set disjoint from Testers.'
  },
  {
    id: 'fa14',
    category: 'Venn Diagram Reasoning',
    question: 'Statements: Some cloud instances are serverless. All serverless instances are auto-scaling. No auto-scaling instance is fixed-capacity. What must be true of the region representing "Serverless instances"?',
    options: [
      'It completely overlaps with Fixed-capacity instances.',
      'It has zero overlap with Fixed-capacity instances.',
      'It is completely disjoint from Auto-scaling instances.',
      'It cannot overlap with Cloud instances.'
    ],
    correct: 'B',
    explanation: 'Serverless ⊆ AutoScaling. AutoScaling ∩ FixedCapacity = ∅. Thus Serverless has zero overlap with Fixed-capacity instances.',
    distractorReason: 'Transitive exclusion guarantees zero overlap.'
  },

  // 15-17: Identifying Assumptions
  {
    id: 'fa15',
    category: 'Identifying Assumptions',
    question: 'Statement: “The institute should mandate daily timed coding assessments to improve students’ real-time algorithmic problem solving under exam pressure.” Which assumption is necessary?',
    options: [
      'Daily timed assessments simulate exam pressure and reinforce problem-solving speed.',
      'Students never experience burnout from daily assessments.',
      'All competitive examinations feature identical coding questions.',
      'Manual coding on paper is completely obsolete.'
    ],
    correct: 'A',
    explanation: 'Negation Test: If daily timed assessments do NOT simulate exam pressure or reinforce problem-solving speed, the policy will fail its stated objective. Necessary.',
    distractorReason: 'Options B, C, and D are extreme, unrealistic, or irrelevant.'
  },
  {
    id: 'fa16',
    category: 'Identifying Assumptions',
    question: 'Statement: “Implementing automated unit tests will allow our engineering team to refactor legacy codebases with significantly greater confidence.” Which assumption is implicit?',
    options: [
      'Automated unit tests can verify that existing software behaviors are preserved during refactoring.',
      'Legacy codebases can never be refactored by human programmers without tools.',
      'Unit tests prevent all possible cybersecurity vulnerabilities.',
      'Refactoring code always reduces server operating costs.'
    ],
    correct: 'A',
    explanation: 'Negation Test: If automated unit tests CANNOT verify that existing behaviors are preserved, they would provide zero confidence during refactoring. Necessary.',
    distractorReason: 'Option B is hyperbolic; Options C and D are irrelevant to refactoring confidence.'
  },
  {
    id: 'fa17',
    category: 'Identifying Assumptions',
    question: 'Statement: “To reduce customer complaints about application crashes, the engineering team must upgrade its caching layer.” What is an essential assumption?',
    options: [
      'At least some application crashes are caused by issues in the current caching layer.',
      'Caching layer upgrades eliminate 100% of all software bugs.',
      'Customer complaints are always malicious and exaggerated.',
      'Upgrading the caching layer is the cheapest task on the engineering roadmap.'
    ],
    correct: 'A',
    explanation: 'Negation Test: If zero crashes were caused by the caching layer, upgrading it would have zero impact on crash reduction. Hence Option A is essential.',
    distractorReason: 'Option B is an extreme overgeneralization; C and D are irrelevant.'
  },

  // 18-20: Strong and Weak Arguments
  {
    id: 'fa18',
    category: 'Strong & Weak Arguments',
    question: 'Question: Should tech education companies require all students to learn Git and GitHub version control in their first week? Argument I: Yes, because version control is a foundational industry workflow prerequisite for collaborating on real-world projects and preserving code history. Argument II: No, because learning Git commands can make students feel slightly confused for a few days.',
    options: [
      'Only Argument I is strong',
      'Only Argument II is strong',
      'Both arguments are strong',
      'Neither argument is strong'
    ],
    correct: 'A',
    explanation: 'Argument I addresses essential industry technical competency and project collaboration. Argument II cites minor temporary learning curve friction, which is a weak basis for discarding a foundational skill. Only I is strong.',
    distractorReason: 'Argument II is a weak avoidance of productive learning challenges.'
  },
  {
    id: 'fa19',
    category: 'Strong & Weak Arguments',
    question: 'Question: Should artificial intelligence pair-programmers (such as GitHub Copilot) be banned during technical coding interviews? Argument I: Yes, because technical interviews are intended to evaluate the candidate’s personal problem-solving ability, algorithmic comprehension, and syntax fluency. Argument II: No, because computers are made of silicon and humans are made of carbon.',
    options: [
      'Only Argument I is strong',
      'Only Argument II is strong',
      'Both arguments are strong',
      'Neither argument is strong'
    ],
    correct: 'A',
    explanation: 'Argument I clearly articulates the diagnostic purpose of technical interviews. Argument II is a nonsensical material comparison completely divorced from assessment logic. Only I is strong.',
    distractorReason: 'Argument II is absurd and completely irrelevant.'
  },
  {
    id: 'fa20',
    category: 'Strong & Weak Arguments',
    question: 'Question: Should companies migrate their entire database infrastructure to cloud providers? Argument I: Yes, because managed cloud database services provide automated automated failover, regular automated backups, and scalable read replicas that decrease catastrophic data loss risks. Argument II: No, because my uncle tried cloud storage ten years ago and did not like the icon.',
    options: [
      'Only Argument I is strong',
      'Only Argument II is strong',
      'Both arguments are strong',
      'Neither argument is strong'
    ],
    correct: 'A',
    explanation: 'Argument I provides verified operational and architectural reliability justifications. Argument II is a trivial, outdated personal anecdote with zero technical validity. Only I is strong.',
    distractorReason: 'Argument II is an informal anecdotal fallacy.'
  }
];

export const revisionData = {
  summaryPoints: [
    {
      title: 'The 4 Classical Categorical Forms',
      content: 'A: All S are P (S ⊆ P) | E: No S is P (S ∩ P = ∅) | I: Some S are P (S ∩ P ≠ ∅) | O: Some S are not P (S \\ P ≠ ∅).'
    },
    {
      title: 'Transitive Inclusion vs Asymmetry',
      content: 'All A are B + All B are C guarantees All A are C. But All A are B DOES NOT mean All B are A!'
    },
    {
      title: 'Definite vs Possibility Rules',
      content: 'Definite Conclusion: Must hold in 100% of valid Venn configurations. Possibility: Must hold in at least 1 valid configuration without violating premises.'
    },
    {
      title: 'The Negation Test for Assumptions',
      content: 'To verify an assumption: Negate it! If the negated statement destroys the author’s conclusion, the assumption is necessary. If the conclusion survives, it is not an assumption.'
    },
    {
      title: 'Strong Argument Checklist',
      content: 'A strong argument MUST be directly relevant to the core issue, cite empirical reality/invariants, and avoid emotional appeals, overgeneralizations, or false causality.'
    }
  ],
  rapidFireQuestions: [
    {
      q: '1. If "All A are B" and "No B is C", what is the definite relationship between A and C?',
      a: 'No A is C (A is a subset of B, which has zero overlap with C).'
    },
    {
      q: '2. In formal logic, does "Some A are B" mean "Some A are NOT B"?',
      a: 'NO. In formal logic, "Some" strictly means "at least one" and is compatible with "All A are B" being possible.'
    },
    {
      q: '3. What test is used to prove that an unstated assumption is strictly necessary?',
      a: 'The Negation Test (if negating the assumption collapses the conclusion, it is necessary).'
    },
    {
      q: '4. If two statements are: "Some X are Y" and "Some Y are Z", does "Some X are Z" definitely follow?',
      a: 'NO. Two particular statements with a middle term do not guarantee an overlap between the outer categories.'
    },
    {
      q: '5. What makes an argument weak even if its premise is factually true?',
      a: 'Lack of direct relevance, disproportionate claims, or confusing correlation with causation.'
    }
  ]
};
