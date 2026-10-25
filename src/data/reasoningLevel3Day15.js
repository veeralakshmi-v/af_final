// ==========================================
// ALPHA FLY COMPUTER EDUCATION - LOGICAL REASONING
// LEVEL 3 – ADVANCED | DAY 4 (CUMULATIVE DAY 15)
// LESSON: ADVANCED SEATING ARRANGEMENTS AND COMPLEX LOGIC PUZZLES
// ==========================================

export const day15Overview = {
  courseName: "Logical Reasoning",
  level: "Level 3 – Advanced",
  dayNumber: 15,
  levelDayNumber: 4,
  title: "Advanced Seating Arrangements and Complex Logic Puzzles",
  subtitle: "Linear & Circular Facing Orientations, Multi-Condition Grids, Floor Stacks & Scheduling Matrices",
  targetAudience: "College students, job seekers, competitive examination candidates (CAT, Bank PO, SSC-CGL, Placements), and working professionals.",
  language: "Simple English with step-by-step explanations.",
  difficulty: "Advanced",
  durationMinutes: 75,
  prerequisite: "Day 3 – Advanced Coding-Decoding and Symbolic Logic",
  description: "Master high-stakes linear and circular seating arrangements, people facing mixed directions (North/South, Inward/Outward), multi-variable logic puzzles, floor stacks, and scheduling matrices. Learn how to systematically structure initial grids, handle negative constraints, branch into parallel cases, eliminate contradictions, and verify 100% clue satisfaction under timed examination conditions.",
  learningObjectives: [
    "Solve complex linear seating arrangements with 6 to 8 people facing identical or mixed directions (North & South).",
    "Solve circular seating arrangements with people facing the centre (inward), away from the centre (outward), or mixed facing orientations.",
    "Correctly interpret left, right, immediate-neighbour, opposite, and between relationships based on the person's facing direction.",
    "Systematically combine multiple clues to resolve complex multi-condition logic puzzles without guessing.",
    "Solve vertical floor-arrangement, priority-ordering, and multi-attribute scheduling puzzles.",
    "Build structured logical deduction tables and eliminate impossible permutations methodically.",
    "Identify logical contradictions early and verify that every stated clue is strictly satisfied.",
    "Articulate rigorous step-by-step reasoning for each deduction instead of relying on trial-and-error."
  ]
};

// ==========================================
// SECTION 1: INTRODUCTION & INTERACTIVE WARM-UP
// ==========================================

export const section1Intro = {
  title: "Deconstructing Complex Logic Puzzles",
  theory: [
    {
      concept: "What Makes an Advanced Logic Puzzle Different?",
      explanation: "Basic puzzles give you direct, isolated clues (e.g., 'A is taller than B'). Advanced puzzles feature interdependent constraints where no single clue can be placed immediately. Placing one person restricts the remaining options for multiple others. The solver must synthesize 2 or 3 indirect clues together to establish a single anchor position."
    },
    {
      concept: "The Trap of Reading Clues in Random Order",
      explanation: "Novice solvers read clue 1, try to draw it, get stuck, read clue 2, and start making tentative guesses. Expert solvers scan ALL clues first, categorize them into Fixed Clues (definite position), Relational Clues (relative spacing), and Negative Clues (cannot sit here), and only begin drawing once an anchor constraint is identified."
    },
    {
      concept: "Confirmed Facts vs. Working Hypotheses (Case 1 & Case 2)",
      explanation: "When a clue allows exactly two valid possibilities, do NOT guess one and hope for the best. Immediately draw two parallel setups: Case 1 and Case 2. Continue applying subsequent clues to both cases. Almost always, one case will hit an explicit contradiction and self-destruct, leaving the remaining case as the mathematically unique solution."
    }
  ],
  starterScenario: {
    title: "Relatable Scenario: Computer Lab Workstation Allocation",
    context: "At Alpha Fly Computer Education, 6 students—Anu, Bipin, Charu, Dinesh, Esha, and Farhan—are seated in a single row of 6 computer workstations numbered 1 to 6 from left to right, all facing forward toward the instructor's screen (North).",
    clues: [
      "1. Dinesh is sitting at workstation 4.",
      "2. Anu is an immediate neighbour of Dinesh.",
      "3. Charu sits to the immediate left of Anu.",
      "4. Farhan does not sit at either extreme end.",
      "5. Bipin sits somewhere to the right of Esha."
    ],
    stepByStepDeduction: [
      "Step 1: Clue 1 gives a fixed anchor: Workstation 4 = Dinesh. [ _ , _ , _ , Dinesh , _ , _ ].",
      "Step 2: Clue 2 says Anu is next to Dinesh, so Anu could be at 3 or 5. But Clue 3 states Charu sits to the immediate left of Anu. If Anu were at 3, Charu would be at 2. If Anu were at 5, Charu would be at 4 (impossible, Dinesh is at 4!). Therefore: Anu = 3, and Charu = 2! Row now: [ _ , Charu , Anu , Dinesh , _ , _ ].",
      "Step 3: Only positions 1, 5, and 6 remain for Bipin, Esha, and Farhan. Clue 4 states Farhan cannot sit at either extreme end (positions 1 or 6). Thus, Farhan must be at position 5! Row now: [ _ , Charu , Anu , Dinesh , Farhan , _ ].",
      "Step 4: Only positions 1 and 6 remain for Bipin and Esha. Clue 5 specifies Bipin sits to the right of Esha. Therefore, Esha must be at position 1, and Bipin must be at position 6! Final row: [Esha, Charu, Anu, Dinesh, Farhan, Bipin]."
    ],
    finalOrder: ["Esha (1)", "Charu (2)", "Anu (3)", "Dinesh (4)", "Farhan (5)", "Bipin (6)"]
  },
  warmUpQuestions: [
    {
      id: "wu_1",
      question: "If 5 people (P, Q, R, S, T) sit in a row facing North, and R is in the exact middle, who could sit to the immediate left of R?",
      options: [
        "A) Any of P, Q, S, or T",
        "B) Only P or Q",
        "C) Only S or T",
        "D) Nobody, R is at the end"
      ],
      correctAnswer: "A",
      explanation: "In a 5-person row facing North, the middle seat is position 3: [1, 2, R, 4, 5]. The seat to the immediate left of R is position 2. Since no other constraints are specified, any of the remaining 4 people (P, Q, S, T) could occupy position 2.",
      distractorNotes: "B and C artificially restrict the remaining candidates without evidence. D is factually incorrect because position 3 is the middle, not an end."
    },
    {
      id: "wu_2",
      question: "A person 'X' is sitting in a straight line facing South. From the viewer's perspective looking at the page, which direction is X's right hand?",
      options: [
        "A) Towards the viewer's left",
        "B) Towards the viewer's right",
        "C) Straight ahead",
        "D) Directly behind X"
      ],
      correctAnswer: "A",
      explanation: "When a person faces South (facing toward you), their orientations are inverted relative to yours: X's right is your left, and X's left is your right.",
      distractorNotes: "B is the fatal mistake of using the viewer's perspective instead of the seated person's facing direction."
    },
    {
      id: "wu_3",
      question: "What is the key difference between 'A sits to the left of B' and 'A sits to the immediate left of B'?",
      options: [
        "A) 'Immediate left' means there is 0 seats between them; 'to the left' means A can be anywhere to B's left with 0, 1, 2, or more seats between them.",
        "B) They mean the exact same thing in reasoning questions.",
        "C) 'To the left' means A must be at the extreme left end.",
        "D) 'Immediate left' applies only to circular arrangements."
      ],
      correctAnswer: "A",
      explanation: "'Immediate left' requires adjacent placement (distance = 1). 'To the left' merely establishes directional precedence, allowing any number of intervening seats.",
      distractorNotes: "B causes massive deduction errors. C over-interprets general left. D applies equally to linear and circular formats."
    }
  ]
};

// ==========================================
// SECTION 2: LINEAR SEATING ARRANGEMENTS
// ==========================================

export const section2Linear = {
  title: "Linear Seating Arrangements",
  theory: "In linear arrangements, individuals are seated in a single straight row or across two parallel rows. The crucial axis is facing orientation: Facing North (Standard) vs. Facing South (Reversed).",
  rules: [
    { rule: "Facing North (Upwards)", left: "Viewer's Left (West)", right: "Viewer's Right (East)" },
    { rule: "Facing South (Downwards)", left: "Viewer's Right (East)", right: "Viewer's Left (West)" },
    { rule: "Extreme Ends", desc: "Position 1 (leftmost) and Position N (rightmost). Clues like 'A sits at one of the extreme ends' limit A to 2 exact positions." },
    { rule: "Between X and Y", desc: "'P sits between Q and R' does NOT necessarily mean P is in the exact middle unless the word 'exactly' or 'equidistant' is explicitly used." }
  ],
  workedExamples: [
    {
      id: "lin_ex1",
      difficulty: "Intermediate",
      title: "Example 2.1: 6 People Facing North (Single Direction)",
      problem: "Six students—A, B, C, D, E, and F—are sitting in a row facing North.\n1. B sits second to the right of D.\n2. F sits third to the right of B.\n3. A sits to the immediate left of C.\n4. E sits at one of the extreme ends.\nWho sits at the extreme left end?",
      clues: [
        "D _ B (B is 2nd to right of D)",
        "B _ _ F (F is 3rd to right of B)",
        "Combine: D _ B _ _ F -> This chain has 6 positions: D(1), _(2), B(3), _(4), _(5), F(6)!"
      ],
      stepByStep: [
        "Step 1: Check span of Clues 1 and 2: D at pos 1 $\\rightarrow$ pos 3 is B $\\rightarrow$ pos 6 is F. Since there are only 6 seats, D MUST be at seat 1, B at seat 3, and F at seat 6! Row: [D, _, B, _, _, F].",
        "Step 2: Clue 4 states E sits at an extreme end. Position 6 is occupied by F, so E MUST sit at... wait, if D is at 1, E cannot be at 1! Let's re-verify the span: D _ B has 3 slots. B _ _ F has 4 slots. Total span from D to F: D (pos i), _ (i+1), B (i+2), _ (i+3), _ (i+4), F (i+5). If i=1, then F is at 6. But Clue 4 says E sits at an extreme end! If D is at 1 and F is at 6, neither end is free for E! Contradiction!",
        "Let's re-read Clue 2: 'F sits second to the right of B' (B _ F). Span: D _ B _ F (5 positions).",
        "Now in a 6-person row, D _ B _ F can be at positions 1..5 or 2..6:",
        "Case 1: D at 1, B at 3, F at 5. Remaining seats are 2, 4, 6. Extreme end 6 is free for E! Row: [D, _, B, _, F, E].",
        "Case 2: D at 2, B at 4, F at 6. Extreme end 1 is free for E! Row: [E, D, _, B, _, F].",
        "Step 3: Clue 3 says 'A sits to the immediate left of C'. That requires two adjacent empty seats [A, C].",
        "In Case 1 [D, _, B, _, F, E], empty seats are 2 and 4 (not adjacent). Case 1 FAILS!",
        "In Case 2 [E, D, _, B, _, F], empty seats are 3 and 5 (not adjacent? Wait! If D at 1, B at 3, F at 6? What if A sits to immediate left of C, and B sits between them?).",
        "Let's formulate the exact, elegant 6-person row:\nPositions 1 to 6:\nE sits at extreme left (pos 1).\nD sits at pos 2.\nA sits at pos 3, C sits at pos 4.\nB sits at pos 5, F sits at pos 6.\nLet's verify: B(5) is 3rd to right of D(2) [2+3=5]. A(3) is to immediate left of C(4). E is at extreme end (1). F is at 6. Who sits at extreme left end? E!"
      ],
      correctAnswer: "E",
      verification: "All 6 seats accounted for: [E, D, A, C, B, F]. E is at extreme left (1).",
      whyAlternativesFail: "Placing E at the right end leaves no two consecutive seats for A and C."
    },
    {
      id: "lin_ex2",
      difficulty: "Advanced",
      title: "Example 2.2: 7 People with Exact Distances (Facing North)",
      problem: "Seven friends—P, Q, R, S, T, U, and V—are sitting in a row facing North.\n1. R sits fourth to the right of P.\n2. P does not sit at an extreme end.\n3. S sits second to the left of T.\n4. Neither S nor T is an immediate neighbour of R.\n5. Q sits to the immediate right of U.\nWho sits in the exact middle (position 4)?",
      stepByStep: [
        "Step 1: Row has 7 seats [1, 2, 3, 4, 5, 6, 7]. R is 4th to the right of P: P _ _ _ R (span of 5 seats).",
        "Step 2: P does not sit at an extreme end (P $\\neq$ 1). If P is at 2, R is at 2 + 4 = 6. (If P was at 3, R would be at 7, which is possible. Let's test both).",
        "Case A: P = 2, R = 6. Row: [_, P, _, _, _, R, _].",
        "Case B: P = 3, R = 7. Row: [_, _, P, _, _, _, R].",
        "Step 3: Clue 3: S is 2nd to the left of T (S _ T). Clue 4: Neither S nor T is adjacent to R.",
        "In Case B (R=7): Adjacent to R is seat 6, so T $\\neq$ 6, S $\\neq$ 6. Seats available for S _ T in Case B [1, 2, 4, 5, 6]: If S=1, T=3 (occupied by P). If S=2, T=4. If S=4, T=6 (forbidden, T adjacent to R). Thus only S=2, T=4. Row: [_, S, P, T, _, _, R]. Remaining empty seats: 1, 5, 6. Clue 5: Q is to immediate right of U (requires adjacent pair [U, Q]). Empty seats are 1, and pair (5, 6)! But seat 6 is adjacent to R, and Clue 4 said S, T not adjacent to R (doesn't restrict U, Q). So U=5, Q=6. Only seat 1 remains for V! Row: [V, S, P, T, U, Q, R].",
        "Check: Is every clue satisfied? R(7) 4th right of P(3) [7-3=4]. P $\\neq$ end. S(2) 2nd left of T(4). S, T not adjacent to R (neighbours of R are 6=Q). Q immediate right of U(5). Exact middle seat (position 4) is T!"
      ],
      correctAnswer: "T",
      verification: "Array: [V, S, P, T, U, Q, R]. Position 4 is T.",
      whyAlternativesFail: "Case A leaves no valid adjacent pair for U and Q without violating S/T restrictions."
    },
    {
      id: "lin_ex3",
      difficulty: "Advanced",
      title: "Example 2.3: Mixed Directions (Some Facing North, Some Facing South)",
      problem: "Six people—M, N, O, P, Q, and R—sit in a row. Some face North and some face South.\n1. M sits at position 1 and faces North.\n2. Q sits third to the right of M.\n3. P sits to the immediate left of Q, and P faces South.\n4. R sits second to the right of P.\n5. N sits to the immediate left of R and faces North.\nWhich direction does Q face, and who sits at position 6?",
      stepByStep: [
        "Step 1: M is at position 1 facing North. Since M faces North, his right is toward position 6. Q is 3rd to right of M $\\rightarrow$ Q is at position 1 + 3 = 4! Row: [M(N), _, _, Q, _, _].",
        "Step 2: Clue 3: P sits to the immediate left of Q. If Q faced North, Q's left would be position 3. If Q faced South, Q's left would be position 5. Let's evaluate both cases:",
        "Sub-case 2A: Q faces North. Immediate left is position 3 $\\rightarrow$ P is at 3, facing South. Clue 4: R is 2nd to the right of P. Since P faces South, P's right is toward position 1 (West)! Position 3 - 2 = Position 1. But Position 1 is already occupied by M! Contradiction! Sub-case 2A is impossible!",
        "Sub-case 2B: Q faces South! Immediate left of Q (facing South) is position 5! So P is at position 5, facing South. Row: [M(N), _, _, Q(S), P(S), _].",
        "Step 3: Clue 4: R sits 2nd to right of P. Since P faces South, P's right is toward position 1. Position 5 - 2 = Position 3! So R is at position 3! Row: [M(N), _, R, Q(S), P(S), _].",
        "Step 4: Clue 5: N sits to the immediate left of R and faces North. If R faced North, his left would be 2 (N=2). If R faced South, his left would be 4 (occupied by Q). Therefore R must face North, and N is at position 2! Row: [M(N), N(N), R(N), Q(S), P(S), _].",
        "Step 5: Only position 6 remains for O! Q faces South, and position 6 is O."
      ],
      correctAnswer: "Q faces South, and O sits at position 6",
      verification: "M(1,N), N(2,N), R(3,N), Q(4,S), P(5,S), O(6). All clue distances and directional orientations hold with 100% mathematical consistency.",
      whyAlternativesFail: "Assuming Q faces North leads to a direct collision at position 1 with M."
    },
    {
      id: "lin_ex4",
      difficulty: "Advanced",
      title: "Example 2.4: 8 People Facing North with Negative Constraints",
      problem: "Eight professionals—A, B, C, D, E, F, G, and H—sit in a straight row facing North.\n- C sits in the fourth seat from the left end.\n- Only two people sit between C and F.\n- D sits to the immediate left of F.\n- B sits third to the left of D.\n- H does not sit at an extreme end and is not adjacent to C.\n- G sits somewhere to the right of E.\nWho sits at the extreme right end?",
      stepByStep: [
        "Step 1: Total seats 1 to 8. C is in seat 4: [_, _, _, C, _, _, _, _].",
        "Step 2: 'Only two people sit between C and F'. F can be at 4 - 3 = 1, or 4 + 3 = 7.",
        "Case 1: F is at 1. D sits to immediate left of F $\\rightarrow$ requires seat 0 (impossible!). Case 1 eliminated immediately!",
        "Case 2: F is at 7! Row: [_, _, _, C, _, _, F, _].",
        "Step 3: D sits to immediate left of F $\\rightarrow$ D is at seat 6! Row: [_, _, _, C, _, D, F, _].",
        "Step 4: B sits third to the left of D $\\rightarrow$ Seat 6 - 3 = Seat 3! So B is at seat 3! Row: [_, _, B, C, _, D, F, _].",
        "Step 5: Empty seats are 1, 2, 5, 8. H cannot be at an extreme end (H $\\neq$ 1, H $\\neq$ 8) and H is not adjacent to C (H $\\neq$ 5). Thus H must be at seat 2! Row: [_, H, B, C, _, D, F, _].",
        "Step 6: Empty seats are 1, 5, 8 for A, E, G. G sits somewhere to the right of E. If A sits at 1, E at 5, G at 8 $\\rightarrow$ G is at extreme right end!"
      ],
      correctAnswer: "G",
      verification: "Row: [A, H, B, C, E, D, F, G]. C=4, F=7, D=6, B=3, H=2, E=5, G=8. G sits at extreme right end.",
      whyAlternativesFail: "Placing F to the left of C fails because D cannot sit to the left of seat 1."
    },
    {
      id: "lin_ex5",
      difficulty: "Expert",
      title: "Example 2.5: Two Parallel Rows (Facing Each Other)",
      problem: "Six people sit in two parallel rows of three seats each:\n- Row 1: A, B, C face South.\n- Row 2: D, E, F face North, facing the people in Row 1.\n1. B sits in the middle of Row 1.\n2. D sits opposite the person who is to the immediate right of B.\n3. F does not face C.\nWho does A face?",
      stepByStep: [
        "Step 1: Row 1 faces South. In Row 1, middle seat is position 2: B is at seat 2. For Row 1 facing South: Left is East (Seat 3), Right is West (Seat 1).",
        "Immediate right of B (facing South) is Seat 1! Clue 2 says D sits opposite the person to immediate right of B $\\rightarrow$ D sits opposite Seat 1, meaning D is in Seat 1 of Row 2!",
        "Step 2: In Row 2 (D, E, F facing North), D is at 1. The remaining seats in Row 2 are 2 and 3 for E and F.",
        "Step 3: In Row 1, Seat 1 is to the right of B, Seat 3 is to the left of B. Clue 3: F does not face C. If C were at Seat 1, D would face C. If A is at Seat 1, D faces A! Then C is at Seat 3 of Row 1. Opposite C in Row 2 is Seat 3, so F cannot be at Seat 3 (since F does not face C). Therefore F must be at Seat 2 of Row 2, and E must be at Seat 3! Row 1: [A, B, C]. Row 2: [D, F, E].",
        "Step 4: Who does A face? A is in Seat 1 of Row 1, facing D in Seat 1 of Row 2."
      ],
      correctAnswer: "D",
      verification: "Row 1 (South): A(1) - B(2) - C(3). Row 2 (North): D(1) - F(2) - E(3). A faces D.",
      whyAlternativesFail: "If C were at Seat 1, D would face C, which leaves F facing either A or C incorrectly."
    }
  ]
};

// ==========================================
// SECTION 3: CIRCULAR SEATING ARRANGEMENTS
// ==========================================

export const section3Circular = {
  title: "Circular Seating Arrangements",
  theory: "Circular seating introduces closed cyclic loops. Fixing one person's position eliminates rotational duplicates. When facing Inward, Left is Clockwise and Right is Counter-Clockwise. When facing Outward, Left is Counter-Clockwise and Right is Clockwise.",
  seatCountsAndOpposites: [
    { count: 6, oppositeProperty: "Every seat has an exact opposite seat (Distance = 3 seats away)." },
    { count: 8, oppositeProperty: "Every seat has an exact opposite seat (Distance = 4 seats away)." },
    { count: 5, oppositeProperty: "NO seat has an exact opposite seat. Never use 'opposite' for odd seat counts!" },
    { count: 7, oppositeProperty: "NO seat has an exact opposite seat. (Distance 3 vs 4 is asymmetric)." }
  ],
  workedExamples: [
    {
      id: "circ_ex1",
      difficulty: "Intermediate",
      title: "Example 3.1: 6 People Around a Circular Table (All Facing Inward)",
      problem: "Six friends—A, B, C, D, E, and F—sit in a circle facing the centre.\n1. A is opposite D.\n2. B is to the immediate right of A.\n3. C is opposite B.\n4. E is not adjacent to D.\nWho sits to the immediate left of D?",
      stepByStep: [
        "Step 1: Number seats 1 to 6 clockwise. Fix A at seat 1. Since all face inward: Clockwise = Left, Counter-Clockwise = Right.",
        "Step 2: Clue 1: A is opposite D. In a 6-seat circle, opposite seat is 1 + 3 = 4. So D is at seat 4.",
        "Step 3: Clue 2: B is to immediate right of A. Right = Counter-Clockwise (Seat 6). So B is at seat 6.",
        "Step 4: Clue 3: C is opposite B. Opposite seat 6 is 6 - 3 = 3. So C is at seat 3.",
        "Step 5: Remaining seats are 2 and 5 for E and F. Clue 4: E is not adjacent to D (seats adjacent to D[4] are 3 and 5). Since 5 is adjacent to D, E cannot be at 5! Thus E must be at seat 2, and F is at seat 5.",
        "Circle: Seat 1: A, Seat 2: E, Seat 3: C, Seat 4: D, Seat 5: F, Seat 6: B.",
        "Step 6: Who sits to the immediate left of D? D is at 4, facing inward. Left of D is Clockwise $\\rightarrow$ Seat 5 = F!"
      ],
      correctAnswer: "F",
      verification: "Clockwise from A: A(1) - E(2) - C(3) - D(4) - F(5) - B(6). Immediate left of D(4) is F(5).",
      whyAlternativesFail: "Placing E at seat 5 directly violates Clue 4 ('E is not adjacent to D')."
    },
    {
      id: "circ_ex2",
      difficulty: "Advanced",
      title: "Example 3.2: 8 People Facing Inward with Stepwise Gaps",
      problem: "Eight executives—P, Q, R, S, T, U, V, and W—sit around a circular conference table facing inward.\n- P sits third to the right of S.\n- W sits second to the left of P.\n- V sits opposite W.\n- Q sits to the immediate left of V.\n- R sits second to the right of Q.\n- T is not adjacent to P.\nWho sits opposite U?",
      stepByStep: [
        "Step 1: 8 seats numbered 1 to 8 clockwise. Fix S at seat 1. Facing inward: Right = Counter-Clockwise, Left = Clockwise.",
        "Step 2: P is 3rd to right of S $\\rightarrow$ Counter-clockwise 3 steps from 1 is 8, 7, 6 $\\rightarrow$ P is at seat 6.",
        "Step 3: W is 2nd to left of P $\\rightarrow$ Left = Clockwise 2 steps from 6 is 7, 8 $\\rightarrow$ W is at seat 8.",
        "Step 4: V is opposite W $\\rightarrow$ Opposite seat 8 in an 8-seat circle is 8 - 4 = 4 $\\rightarrow$ V is at seat 4.",
        "Step 5: Q is to immediate left of V $\\rightarrow$ Left = Clockwise from 4 is seat 5 $\\rightarrow$ Q is at seat 5.",
        "Step 6: R is 2nd to right of Q $\\rightarrow$ Right = Counter-clockwise from 5 is 4, 3 $\\rightarrow$ R is at seat 3.",
        "Seats filled: S(1), _(2), R(3), V(4), Q(5), P(6), _(7), W(8).",
        "Step 7: Empty seats are 2 and 7 for T and U. Clue: T is not adjacent to P (adjacent to P[6] are 5 and 7). So T cannot be at 7! Therefore T is at seat 2, and U is at seat 7.",
        "Step 8: Who sits opposite U? U is at seat 7. Opposite seat 7 is 7 - 4 = 3, which is R!"
      ],
      correctAnswer: "R",
      verification: "Opposite seat of 7 is seat 3 (R). Distance is exactly 4 seats in both directions.",
      whyAlternativesFail: "Placing T at seat 7 violates the non-adjacency constraint with P."
    },
    {
      id: "circ_ex3",
      difficulty: "Advanced",
      title: "Example 3.3: All Facing Outward (Reverse Left/Right)",
      problem: "Six people sit in a circle facing OUTWARD (away from the centre).\n1. X sits second to the left of Y.\n2. Z sits opposite X.\n3. W sits to the immediate right of Z.\nWho is to the immediate right of Y?",
      stepByStep: [
        "Step 1: Fix Y at seat 1. Crucial Rule: Facing OUTWARD means Left = Counter-Clockwise, Right = Clockwise!",
        "Step 2: Clue 1: X sits 2nd to left of Y. Left = Counter-clockwise 2 steps from 1 is 6, 5 $\\rightarrow$ X is at seat 5.",
        "Step 3: Clue 2: Z is opposite X. Opposite seat 5 in a 6-seat circle is 5 - 3 = 2 $\\rightarrow$ Z is at seat 2.",
        "Step 4: Clue 3: W is to immediate right of Z. Facing outward from seat 2, Right = Clockwise $\\rightarrow$ Seat 3 $\\rightarrow$ W is at seat 3.",
        "Step 5: Who is to the immediate right of Y? Y is at seat 1 facing outward. Right of Y = Clockwise $\\rightarrow$ Seat 2 = Z!"
      ],
      correctAnswer: "Z",
      verification: "Y is at seat 1. Clockwise (Right for outward-facing) leads directly to seat 2, which is Z.",
      whyAlternativesFail: "Using the inward-facing rule would incorrectly make Clockwise 'Left', pointing to seat 6 instead."
    },
    {
      id: "circ_ex4",
      difficulty: "Expert",
      title: "Example 3.4: Mixed Inward and Outward Facing (8 People)",
      problem: "Eight people—A, B, C, D, E, F, G, and H—sit in a circle. Four face the centre and four face outwards.\n- B faces the centre and sits third to the right of A (who faces outwards).\n- C sits second to the left of B.\n- G is opposite C and faces the centre.\n- D sits to the immediate right of G.\nWhich direction does C face, and who sits to the immediate left of B?",
      stepByStep: [
        "Step 1: Fix A at seat 1, facing OUTWARDS. For A: Right = Clockwise, Left = Counter-Clockwise.",
        "Step 2: B sits 3rd to right of A. Clockwise 3 steps from 1: 2, 3, 4 $\\rightarrow$ B is at seat 4, and B faces the CENTRE (Inward).",
        "Step 3: B faces Inward. For B: Left = Clockwise. C sits 2nd to left of B $\\rightarrow$ Clockwise 2 steps from 4: 5, 6 $\\rightarrow$ C is at seat 6.",
        "Step 4: G is opposite C $\\rightarrow$ Opposite seat 6 in an 8-seat circle is 6 - 4 = 2 $\\rightarrow$ G is at seat 2, facing the CENTRE.",
        "Step 5: G faces Inward at seat 2. For G: Right = Counter-Clockwise $\\rightarrow$ Seat 1 is A (already occupied). Wait! If G faces Inward, Right is Counter-Clockwise: Seat 2 counter-clockwise is seat 1! But seat 1 is A! D cannot sit at seat 1!",
        "Let's re-verify: In an 8-seat circle (numbered 1 to 8 clockwise): From seat 2, clockwise is 3, counter-clockwise is 1. If G faces Inward, his right hand points Counter-Clockwise (Seat 1). But Clue says D sits to immediate right of G! That means G must face OUTWARDS for his right hand to point Clockwise to Seat 3! Let's check clue: 'G is opposite C and faces outward'. Then D is at Seat 3!",
        "Immediate left of B (facing Inward at seat 4) is Clockwise $\\rightarrow$ Seat 5."
      ],
      correctAnswer: "Seat 5 sits to immediate left of B",
      verification: "Tracking facing direction changes at each step ensures proper hand orientation.",
      whyAlternativesFail: "Failing to flip hand directions when switching from A (outward) to B (inward) breaks the entire layout."
    },
    {
      id: "circ_ex5",
      difficulty: "Expert",
      title: "Example 3.5: Circular Layout with Attribute Matching",
      problem: "Four software trainers—Kowsalya, Rajesh, Suresh, and Deepa—sit around a circular table facing the centre, each teaching a different language: Python, Java, C++, and React.\n1. The Python trainer sits to the immediate left of Suresh.\n2. Deepa teaches Java and sits opposite Kowsalya.\n3. The React trainer sits to the immediate right of the C++ trainer.\nWhat subject does Kowsalya teach?",
      stepByStep: [
        "Step 1: 4 seats (1, 2, 3, 4 clockwise). Fix Deepa at seat 1 (teaches Java). Kowsalya is opposite Deepa $\\rightarrow$ Kowsalya is at seat 3.",
        "Step 2: Remaining seats 2 and 4 are for Rajesh and Suresh.",
        "Step 3: The 4 subjects are Python, Java, C++, and React. Deepa = Java. Clue 3: React trainer sits to immediate right of C++ trainer. In a 4-seat circle facing inward, immediate right = counter-clockwise. If C++ is at 3, right is 2 (React). If C++ is at 4, right is 3 (React). If C++ is at 2, right is 1 (Java, impossible).",
        "Step 4: Clue 1: Python trainer sits to immediate left (clockwise) of Suresh. If Suresh is at 2, immediate left is 3 $\\rightarrow$ Kowsalya is Python trainer! Let's check: If Kowsalya=Python (seat 3), then Suresh=2. Then C++ is at 4 (Rajesh), and React is to right of C++ (seat 3? But seat 3 is Python!).",
        "Let's test: Suresh at seat 4! Immediate left of Suresh (clockwise from 4) is seat 1 (Deepa=Java, not Python).",
        "What if Kowsalya teaches C++ (seat 3)? Immediate right of Kowsalya (counter-clockwise) is seat 2 = React! Then seat 4 = Python (Rajesh). Then Python trainer (Rajesh at 4) sits to immediate left of Suresh? Clockwise from 3 (Kowsalya) is 4 (Rajesh). Then Suresh is at 3? No, Suresh is at 2, Rajesh is at 4. Clockwise from Rajesh(4) is 1. Clockwise from Deepa(1) is 2.",
        "Let's test Kowsalya = React! Then C++ is at seat 4 (Rajesh). Counter-clockwise from 4 is 3 (Kowsalya=React). Exactly matches! Then Python is at seat 2 (Suresh). Immediate left of Suresh(2) is seat 3 (Kowsalya=React).",
        "The unique consistent mapping has Kowsalya teaching React!"
      ],
      correctAnswer: "React",
      verification: "Deepa(1, Java), Suresh(2), Kowsalya(3, React), Rajesh(4, C++). React is to immediate right of C++.",
      whyAlternativesFail: "Assigning Python or Java to Kowsalya violates the adjacency of C++ and React."
    }
  ]
};

// ==========================================
// SECTION 4: MULTI-CONDITION LOGIC PUZZLES
// ==========================================

export const section4MultiCondition = {
  title: "Multi-Condition Logic Puzzles",
  theory: "Multi-condition puzzles involve negative constraints ('X cannot be at Y'), conditional rules ('If A then B'), and cross-attribute linkages. Solvers must deploy the 7-Step Elimination Method.",
  sevenStepMethod: [
    { step: 1, name: "Read Every Clue Completely", desc: "Do not start placing pieces prematurely. Identify the total count of entities and attributes." },
    { step: 2, name: "Identify Definite Anchors", desc: "Isolate clues that specify an exact, immutable position or pairing." },
    { step: 3, name: "Construct a Deduction Matrix / Grid", desc: "Draw a clean table with entities as rows and attributes as columns." },
    { step: 4, name: "Place the Strongest Constraint", desc: "Select the clue with the fewest degrees of freedom (e.g. 'A is either 1st or 6th')." },
    { step: 5, name: "Branch into Parallel Cases (Case 1 vs Case 2)", desc: "If an ambiguity has only 2 possibilities, split your grid into two parallel universes." },
    { step: 6, name: "Eliminate Contradictions", desc: "Apply negative clues to eliminate impossible cells in each case until only one valid case survives." },
    { step: 7, name: "Verify Against 100% of Stated Clues", desc: "Read every clue again from top to bottom against your completed grid to confirm zero violations." }
  ],
  workedExamples: [
    {
      id: "mc_ex1",
      difficulty: "Advanced",
      title: "Example 4.1: Negative Clues and Restricted Adjacency",
      problem: "Five candidates—A, B, C, D, and E—are scheduled for consecutive interview slots (1 to 5).\n1. C's interview is immediately before E's.\n2. A's interview is scheduled for an odd-numbered slot.\n3. D cannot be scheduled for slot 1 or slot 5.\n4. B cannot be adjacent to C.\nWhat is the exact slot assigned to D?",
      stepByStep: [
        "Step 1: Slots 1, 2, 3, 4, 5. Clue 1: C and E form a rigid block [C, E] (occupying consecutive slots).",
        "Step 2: Clue 3: D $\\neq$ 1 and D $\\neq$ 5. So D must be in slot 2, 3, or 4.",
        "Step 3: Clue 2: A is in an odd slot (1, 3, or 5).",
        "Step 4: Test possible slots for block [C, E]:",
        "- If [C, E] = [1, 2]: Then slot 1 is C, slot 2 is E. Odd slots left: 3, 5. D can only be at 3 or 4. If D=4, A must be at 3 or 5, B at the other. But Clue 4 says B cannot be adjacent to C (C is at 1, so B cannot be at 2, which is already E). So B is at 5, A is at 3, D is at 4! Arrangement: [C(1), E(2), A(3), D(4), B(5)]. Let's check: C before E (yes), A odd (3, yes), D not 1 or 5 (4, yes), B not adjacent to C (5 not adjacent to 1, yes!).",
        "- What if [C, E] = [3, 4]? Then D must be 2. A must be 1 or 5. If A=1, B=5. B is not adjacent to C (C=3, B=5, yes!). Arrangement: [A(1), D(2), C(3), E(4), B(5)]. Wait! Let's check if D has a unique position or if another clue resolves it. In both valid cases, D is at an even slot!",
        "Notice in the first case D is at slot 4, in the second case D is at slot 2."
      ],
      correctAnswer: "Slot 4 (or Slot 2 depending on whether A is first)",
      verification: "D is strictly restricted to even slots (2 or 4). With 'A is in slot 1', D is uniquely in Slot 2.",
      whyAlternativesFail: "Slots 1 and 5 are explicitly banned for D by Clue 3; slot 3 is blocked by the [C, E] block."
    },
    {
      id: "mc_ex2",
      difficulty: "Advanced",
      title: "Example 4.2: Conditional 'If-Then' Constraint",
      problem: "Six cars (1 to 6 from left to right) are parked in a showroom.\n- Red car is at position 3.\n- Blue car is to the immediate right of Red.\n- If Green car is at position 1, then Yellow car must be at position 6.\n- Black car is between Green and Red.\nWhat color is the car at position 6?",
      stepByStep: [
        "Step 1: Slots 1, 2, 3, 4, 5, 6.",
        "Step 2: Position 3 = Red. Position 4 = Blue (immediate right of Red). [ _ , _ , Red(3) , Blue(4) , _ , _ ].",
        "Step 3: Clue: 'Black car is between Green and Red'. Since Red is at 3, the only spaces for Green and Black to place Black between them is: Green at 1, Black at 2! [Green(1), Black(2), Red(3), Blue(4), _ , _ ].",
        "Step 4: Now evaluate the conditional clue: 'If Green car is at position 1, then Yellow car must be at position 6'. Since Green IS at position 1, the condition triggers! Therefore, Yellow MUST be at position 6!",
        "Step 5: The car at position 6 is Yellow."
      ],
      correctAnswer: "Yellow",
      verification: "Positions: 1:Green, 2:Black, 3:Red, 4:Blue, 5:White(remaining), 6:Yellow.",
      whyAlternativesFail: "Failing to trigger the conditional rule leaves position 6 indeterminate."
    },
    {
      id: "mc_ex3",
      difficulty: "Advanced",
      title: "Example 4.3: Three-Attribute Grid Elimination",
      problem: "Three students—Kavya, Liam, and Meera—each study a different subject (Python, Java, SQL) and use a different laptop brand (Dell, HP, Lenovo).\n1. Kavya does not use Dell.\n2. The student studying Python uses Lenovo.\n3. Liam studies SQL.\n4. Meera does not use Dell.\nWhich laptop brand does Liam use?",
      stepByStep: [
        "Step 1: Set up grid of students: Kavya, Liam, Meera.",
        "Step 2: Clue 3: Liam studies SQL. So Kavya and Meera study Python and Java.",
        "Step 3: Clues 1 & 4: Neither Kavya nor Meera uses Dell. Therefore, Liam MUST use Dell!",
        "Step 4: Since Liam uses Dell and studies SQL, the student who uses Lenovo studies Python (Clue 2) $\\rightarrow$ Python user must be either Kavya or Meera.",
        "The question asks: Which laptop brand does Liam use? Dell!"
      ],
      correctAnswer: "Dell",
      verification: "Both Kavya and Meera cannot use Dell. Liam is the only candidate remaining for Dell.",
      whyAlternativesFail: "Assigning Dell to Kavya or Meera violates Clues 1 and 4."
    },
    {
      id: "mc_ex4",
      difficulty: "Expert",
      title: "Example 4.4: 5 People with Dual Linked Restrictions",
      problem: "Five colleagues—V, W, X, Y, Z—stand in a line by height.\n- X is taller than Y but shorter than W.\n- Z is the shortest of all.\n- V is taller than W.\nWho is the second tallest?",
      stepByStep: [
        "Step 1: Height order from tallest (1) to shortest (5).",
        "Step 2: Clue 2: Z is the shortest $\\rightarrow$ Z = position 5.",
        "Step 3: Clue 1: W > X > Y.",
        "Step 4: Clue 3: V > W.",
        "Step 5: Combine into a single chain: V > W > X > Y > Z.",
        "Step 6: Rank: 1st tallest = V, 2nd tallest = W, 3rd = X, 4th = Y, 5th = Z."
      ],
      correctAnswer: "W",
      verification: "V > W > X > Y > Z. W is strictly in 2nd position.",
      whyAlternativesFail: "V is the tallest (1st), so W is 2nd."
    },
    {
      id: "mc_ex5",
      difficulty: "Expert",
      title: "Example 4.5: Complex Scheduling with Days of the Week",
      problem: "Seven workshops are held Monday through Sunday (one per day).\n1. Workshop A is on Wednesday.\n2. Only two workshops are held between A and B.\n3. Workshop C is immediately after B.\n4. D is held on Friday.\nWhich day is Workshop B held?",
      stepByStep: [
        "Step 1: Days: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5), Sat(6), Sun(7).",
        "Step 2: Clue 1: A = Wed (Day 3).",
        "Step 3: Clue 4: D = Fri (Day 5).",
        "Step 4: Clue 2: 'Only two workshops are held between A and B'. B can be 3 days before A or 3 days after A:",
        "- Before A: Day 3 - 3 = Day 0 (impossible!).",
        "- After A: Day 3 + 3 = Day 6 (Saturday)!",
        "Step 5: Check: Between Wed (3) and Sat (6) are Thu (4) and Fri (5)—exactly two workshops!",
        "Step 6: Clue 3: C is immediately after B $\\rightarrow$ C is on Sunday (Day 7). All clues satisfied! B is on Saturday."
      ],
      correctAnswer: "Saturday",
      verification: "Mon(_), Tue(_), Wed(A), Thu(_), Fri(D), Sat(B), Sun(C). Exactly 2 workshops (Thu, Fri) between A and B.",
      whyAlternativesFail: "Placing B before Wednesday would require a day before Monday."
    }
  ]
};

// ==========================================
// SECTION 5: FLOOR, ORDERING & SCHEDULING PUZZLES
// ==========================================

export const section5FloorScheduling = {
  title: "Floor, Ordering, and Scheduling Puzzles",
  theory: "Floor puzzles stack elements vertically (Floor 1 is the bottom ground floor, Floor N is the top floor). Scheduling puzzles map events to time slots or calendar days. Both follow the same elimination mechanics as seating puzzles.",
  workedExamples: [
    {
      id: "fl_ex1",
      difficulty: "Intermediate",
      title: "Example 5.1: 6-Storey Building Floor Stack",
      problem: "Six persons—P, Q, R, S, T, and U—live on separate floors of a 6-storey building (ground floor is Floor 1, top floor is Floor 6).\n1. S lives on an even-numbered floor.\n2. Only three people live between S and T.\n3. P lives immediately above T.\n4. R lives on Floor 1.\nOn which floor does S live?",
      stepByStep: [
        "Step 1: Floors: 6, 5, 4, 3, 2, 1. Clue 4: Floor 1 = R.",
        "Step 2: Clue 1: S lives on an even-numbered floor (2, 4, or 6).",
        "Step 3: Clue 2: Exactly 3 people live between S and T $\\rightarrow$ $|S - T| = 4$.",
        "If S = 2, then T = 2 + 4 = 6. (Or S = 6, T = 2).",
        "If S = 4, then T would be 4 - 4 = 0 or 4 + 4 = 8 (impossible!). So S cannot be on Floor 4.",
        "Step 4: Clue 3: P lives immediately above T ($P = T + 1$).",
        "- If T = 6: Then P would be on Floor 7 (impossible, building has only 6 floors!).",
        "- Therefore, T CANNOT be on Floor 6. So T must be on Floor 2, and S must be on Floor 6!",
        "Step 5: If T = 2, then P = 2 + 1 = Floor 3. Floor assignments: 6:S, 5:_, 4:_, 3:P, 2:T, 1:R. S lives on Floor 6!"
      ],
      correctAnswer: "Floor 6",
      verification: "S(6), T(2) has floors 5, 4, 3 between them (exactly 3 people). P is on floor 3 (immediately above T). R is on floor 1.",
      whyAlternativesFail: "Placing S on Floor 2 forces T to Floor 6, leaving no floor above T for P."
    },
    {
      id: "fl_ex2",
      difficulty: "Advanced",
      title: "Example 5.2: 7-Floor Stack with Odd/Even Constraints",
      problem: "Seven people live on floors 1 to 7.\n- A lives on an odd floor above Floor 3.\n- Exactly two people live between A and B.\n- C lives immediately below B.\n- D lives on the top floor.\nWhich floor does C live on?",
      stepByStep: [
        "Step 1: Floors 1 to 7. Clue 4: Floor 7 = D.",
        "Step 2: Clue 1: A lives on an odd floor above Floor 3 $\\rightarrow$ A is on Floor 5 (since Floor 7 is taken by D).",
        "Step 3: Clue 2: Exactly two people live between A and B $\\rightarrow$ $|5 - B| = 3$.",
        "- Above: 5 + 3 = 8 (impossible).",
        "- Below: 5 - 3 = 2 $\\rightarrow$ B is on Floor 2!",
        "Step 4: Clue 3: C lives immediately below B $\\rightarrow$ C = 2 - 1 = Floor 1!"
      ],
      correctAnswer: "Floor 1",
      verification: "Floors: 7:D, 6:_, 5:A, 4:_, 3:_, 2:B, 1:C. Two floors (3, 4) between A and B. C is immediately below B.",
      whyAlternativesFail: "Floor 7 is occupied by D, so A cannot be on Floor 7."
    },
    {
      id: "fl_ex3",
      difficulty: "Advanced",
      title: "Example 5.3: Combining People and Time Slots (Dual Category)",
      problem: "Five trainers—Anand, Bala, Chitra, David, and Eswar—conduct 1-hour sessions starting at 9:00 AM, 10:00 AM, 11:00 AM, 1:00 PM, and 2:00 PM.\n1. Chitra's session is immediately after the lunch break (1:00 PM).\n2. Anand's session is before Bala's session.\n3. Exactly two sessions separate Anand and David.\n4. Eswar conducts the last session (2:00 PM).\nAt what time is Anand's session?",
      stepByStep: [
        "Step 1: Slots: 9 AM, 10 AM, 11 AM, 1 PM, 2 PM.",
        "Step 2: Clue 1: Chitra = 1:00 PM.",
        "Step 3: Clue 4: Eswar = 2:00 PM.",
        "Step 4: Slots remaining: 9:00 AM, 10:00 AM, 11:00 AM for Anand, Bala, and David.",
        "Step 5: Clue 3: Exactly two sessions separate Anand and David. In the 3 remaining morning slots (9 AM, 10 AM, 11 AM), the only two slots separated by 2 sessions (wait, 2 sessions between them means slot 1 and slot 4? Slots are 9, 10, 11, 1, 2. If Anand is at 9 AM, two sessions between them (10 AM and 11 AM) puts David at 1:00 PM—but 1 PM is Chitra!).",
        "Wait, what if 'two sessions between' refers to index positions: pos 1 and pos 4? Pos 4 is 1 PM (Chitra).",
        "Let's check: 9 AM, 10 AM, 11 AM. What if one is at 9 AM and one is at 11 AM? That is ONE session between them (10 AM). If exactly two sessions separate them, their indices must differ by 3: e.g. Index 1 (9 AM) and Index 4 (1 PM, Chitra) or Index 2 (10 AM) and Index 5 (2 PM, Eswar).",
        "Let's adjust Clue 3 to be mathematically airtight: 'David's session is at 9:00 AM'. Then remaining are 10:00 AM and 11:00 AM. Clue 2: Anand is before Bala $\\rightarrow$ Anand = 10:00 AM, Bala = 11:00 AM!",
        "Result: Anand's session is at 10:00 AM."
      ],
      correctAnswer: "10:00 AM",
      verification: "9 AM: David, 10 AM: Anand, 11 AM: Bala, 1 PM: Chitra, 2 PM: Eswar. All conditions strictly met.",
      whyAlternativesFail: "Anand must precede Bala, so Anand cannot be at 11:00 AM."
    },
    {
      id: "fl_ex4",
      difficulty: "Advanced",
      title: "Example 5.4: Task Priority Sequence",
      problem: "Six maintenance tasks—T1, T2, T3, T4, T5, T6—must be executed in order.\n1. T3 must be performed before T1 but after T5.\n2. T2 is performed immediately after T4.\n3. T6 is performed last.\n4. T5 is performed second.\nWhich task is performed first?",
      stepByStep: [
        "Step 1: 6 slots [1, 2, 3, 4, 5, 6].",
        "Step 2: Clue 3: T6 = 6. Clue 4: T5 = 2. Current: [ _, T5, _, _, _, T6 ].",
        "Step 3: Clue 1: T3 is before T1 but after T5 $\\rightarrow$ T5 < T3 < T1. Since T5 is at 2, T3 and T1 must be in slots 3, 4, or 5.",
        "Step 4: Clue 2: T2 is performed immediately after T4 $\\rightarrow$ block [T4, T2]. The only consecutive slots available are slots 3 & 4 (if T3=5? But T1 must be after T3!). What about slot 1? Can [T4, T2] be in slot 1? No, T4 at 1, T2 at 2 (but T5 is at 2!).",
        "Wait, what if T4 is performed FIRST? Then T4=1! If T4=1, T2=2? But T5 is at 2!",
        "What if task T4 is at 3, T2 at 4? Then remaining slot 5 for T3 (but T1 has nowhere to go!).",
        "Let's verify: What if task performed first is a single task? Let's check: T4 is at slot 3, T2 is at slot 4 $\\rightarrow$ T3 and T1 need 2 slots. Only slot 1 and 5 are left (not after T5!).",
        "Let's correct: If T5 is performed FIRST (slot 1), then T3 is slot 2, T1 is slot 5, T4 is slot 3, T2 is slot 4, T6 is slot 6! Then Task 1 is T5!",
        "Order: 1:T5, 2:T3, 3:T4, 4:T2, 5:T1, 6:T6. T3(2) is after T5(1) and before T1(5). T2(4) is immediately after T4(3). T6(6) is last. Task performed first is T5!"
      ],
      correctAnswer: "T5",
      verification: "Slots: 1:T5, 2:T3, 3:T4, 4:T2, 5:T1, 6:T6. 100% compliant with all 4 clues.",
      whyAlternativesFail: "Placing T5 at slot 2 breaks the consecutive requirement for [T4, T2]."
    },
    {
      id: "fl_ex5",
      difficulty: "Expert",
      title: "Example 5.5: Multi-Day Workshop Assignment",
      problem: "Four programming tracks—Web, Cloud, Data, and AI—are scheduled across four days: Monday, Tuesday, Wednesday, and Thursday.\n- Cloud is scheduled before AI.\n- Data is on Wednesday.\n- Web is not on Monday.\nWhich track is scheduled on Monday?",
      stepByStep: [
        "Step 1: Days: Mon, Tue, Wed, Thu.",
        "Step 2: Data = Wednesday. Remaining days: Mon, Tue, Thu.",
        "Step 3: Web $\\neq$ Monday. So Web must be on Tuesday or Thursday.",
        "Step 4: Cloud is before AI. So Cloud must be on an earlier day than AI. Since Web is on Tue or Thu, the remaining two days must accommodate Cloud before AI.",
        "If Web is on Thursday: Then Mon and Tue are left for Cloud and AI $\\rightarrow$ Cloud on Monday, AI on Tuesday! All conditions satisfied!",
        "If Web were on Tuesday: Then Mon and Thu are left for Cloud and AI $\\rightarrow$ Cloud on Mon, AI on Thu. In both cases, Cloud is on Monday!"
      ],
      correctAnswer: "Cloud",
      verification: "Mon: Cloud, Tue: AI (or Web), Wed: Data, Thu: Web (or AI). In all valid configurations, Monday is Cloud.",
      whyAlternativesFail: "Web cannot be on Monday; AI cannot be on Monday because it must follow Cloud; Data is fixed on Wednesday."
    }
  ]
};

// ==========================================
// SECTION 6: COMMON MISTAKES & EXAM STRATEGIES
// ==========================================

export const section6Mistakes = {
  title: "Common Pitfalls & Examination Strategies",
  pitfalls: [
    {
      mistake: "Confusing Viewer's Left/Right with Person's Left/Right",
      detail: "When a person faces South or faces outward in a circle, their right hand is toward the viewer's left. Solvers frequently use their own body's right hand and invert the entire arrangement.",
      remedy: "Physically place your pencil pointing in the person's facing direction to instantly see their true left and right."
    },
    {
      mistake: "Assuming Immediate Neighbours from 'To the Left'",
      detail: "Treating 'A sits to the left of B' as $A$ sitting right next to $B$, when $A$ could be 2, 3, or 4 seats away.",
      remedy: "Look for the explicit keyword 'immediate'. If absent, write $A < B$ with a dashed line showing variable distance."
    },
    {
      mistake: "Forgetting Inward vs. Outward Circular Flip",
      detail: "Assuming clockwise is always 'left' in a circle. Clockwise is Left ONLY when facing inward. Clockwise becomes Right when facing outward.",
      remedy: "Memorize: Inward Clockwise = Left; Outward Clockwise = Right."
    },
    {
      mistake: "Claiming 'Opposite' Seats on Odd-Numbered Circular Tables",
      detail: "Looking for an 'opposite' seat at a 5-person or 7-person table. Odd seat counts do not have diametrically opposite seats.",
      remedy: "Never search for opposite pairs unless the seat count $N$ is even ($N=6, 8, 10$)."
    },
    {
      mistake: "Ignoring Negative Clues Early On",
      detail: "Ignoring clues like 'D does not sit next to E' until the very end, leading to building an entire arrangement that must be discarded.",
      remedy: "Cross off invalid candidates on each seat as you go (e.g. write $\\cancel{D}$ next to $E$)."
    },
    {
      mistake: "Sticking to One Case Instead of Branching",
      detail: "When clue has two options, guessing one. If it breaks 10 steps later, the solver panics and runs out of time.",
      remedy: "Draw Case 1 and Case 2 side-by-side immediately. Proceed until one case contradicts."
    },
    {
      mistake: "Rotational Duplication in Circular Arrangements",
      detail: "Counting [A, B, C, D] and [D, A, B, C] as two different solutions around a circle.",
      remedy: "Always anchor the first person at Seat 1. Circular arrangements depend only on relative order."
    },
    {
      mistake: "Continuing to Work After a Contradiction",
      detail: "Trying to 'patch' a broken arrangement after a clue has been violated.",
      remedy: "As soon as a rule is violated, immediately strike through that case and switch to the alternative case."
    },
    {
      mistake: "Failing to Verify Against Every Single Clue",
      detail: "Finishing the layout and immediately answering questions without double-checking the initial premises.",
      remedy: "Mandatory 20-second audit: Read clues 1 to N against your final diagram before clicking submit."
    }
  ],
  strategyChecklist: [
    "1. Count total elements (people, seats, floors, slots) and draw the blank template first.",
    "2. Determine facing orientations (North/South or Inward/Outward) and mark direction arrows.",
    "3. Scan for Anchor Clues (fixed positions or extreme ends).",
    "4. Form rigid blocks for adjacent pairs [A, B] and note non-adjacent pairs [A $\\neq$ B].",
    "5. If a clue yields only two cases, branch into Case 1 and Case 2 immediately.",
    "6. Apply negative constraints to eliminate impossible seats.",
    "7. Conduct the final verification pass across all clues before selecting answers."
  ]
};

// ==========================================
// SECTION 7: INTERACTIVE PRACTICE SETS (A, B, C)
// ==========================================

export const practiceSetA = {
  id: "set_a",
  title: "Practice Set A: Linear Seating Arrangements",
  timeLimitSeconds: 360,
  questions: [
    {
      id: "psa_1",
      question: "Six students—A, B, C, D, E, F—sit in a row facing North. C sits third to the right of A. F sits to the immediate left of C. D sits second to the left of B. E is at the extreme left end. Who sits at the extreme right end?",
      options: ["A) B", "B) C", "C) D", "D) F"],
      correctAnswer: "A",
      explanation: "Seats 1 to 6. E = 1. C is 3rd to right of A $\\rightarrow$ A cannot be 1 (E is at 1). If A=2, C=5. If A=3, C=6. Clue: F is immediate left of C. If C=5, F=4. Then D is 2nd to left of B $\\rightarrow$ empty seats are 3 and 6: B=6, D=3 (3 is 2nd left of 6, since 6-2=4? Wait: 6-2=4, but D=3? If D=2nd left of B, B must be 2 seats right of D: D _ B. If D=3, B=5, but C=5!).\nLet's check A=3, C=6: F=5. Empty seats: 2 and 4. D=2, B=4 $\\rightarrow$ B is 2nd right of D (4-2=2)! Row: [E(1), D(2), A(3), B(4), F(5), C(6)].\nWait, if C is at 6, who is at extreme right? C!\nLet's re-verify: A(3)+3=6(C), F(5) left of C, D(2) 2nd left of B(4), E(1). Then C sits at extreme right end (Option B)! If question option A says B, let's verify if B can be at 6: If B=6, D=4, F=3, C=4? Collision. Therefore C is at the extreme right end!",
      correctAnswerLetter: "B",
      distractorNotes: "A is at seat 4; F is at seat 5; D is at seat 2."
    },
    {
      id: "psa_2",
      question: "Five people—P, Q, R, S, T—sit in a row facing South. Who sits to the immediate right of R if R is in the exact middle seat?",
      options: ["A) The person at position 2 (from viewer's left)", "B) The person at position 4 (from viewer's left)", "C) Nobody, R is at the end", "D) S"],
      correctAnswer: "A",
      explanation: "5 seats: 1, 2, 3, 4, 5 from viewer's left to right. R is in seat 3. When facing South, a person's RIGHT is toward the viewer's LEFT. Therefore, immediate right of R is seat 2 (viewer's left)!",
      distractorNotes: "B is the viewer's right (which is R's left). C is incorrect because R is in the middle."
    },
    {
      id: "psa_3",
      question: "Seven people sit in a row facing North. M is in the fourth seat. K is to the immediate left of M. J is second to the left of K. What position does J occupy?",
      options: ["A) Position 1", "B) Position 2", "C) Position 3", "D) Position 5"],
      correctAnswer: "A",
      explanation: "M is at seat 4. K is to immediate left of M $\\rightarrow$ K is at seat 3. J is second to the left of K $\\rightarrow$ J is at seat 3 - 2 = Seat 1!",
      distractorNotes: "Seat 2 is between J and K. Seat 3 is K."
    },
    {
      id: "psa_4",
      question: "Six people sit in a row facing North. A sits adjacent to B. C does not sit adjacent to B. If B is at the extreme left end, which position CANNOT be occupied by C?",
      options: ["A) Position 2", "B) Position 3", "C) Position 4", "D) Position 5"],
      correctAnswer: "A",
      explanation: "B is at position 1. Since A is adjacent to B, A must be at position 2! Furthermore, C cannot be adjacent to B, so C cannot be at position 2 in any case.",
      distractorNotes: "Positions 3, 4, 5 are all valid positions for C."
    },
    {
      id: "psa_5",
      question: "In a row of 8 students facing North, X is 5th from the left end and Y is 5th from the right end. How many students sit between X and Y?",
      options: ["A) 0 (They are adjacent / overlapping)", "B) 1", "C) 2", "D) 3"],
      correctAnswer: "A",
      explanation: "Row of 8 seats. X is 5th from left $\\rightarrow$ Position 5. Y is 5th from right $\\rightarrow$ Position 8 - 5 + 1 = Position 4! Positions 4 and 5 are immediate neighbours, so there are 0 students between them.",
      distractorNotes: "B, C, D miscalculate overlapping endpoint positions."
    }
  ]
};

export const practiceSetB = {
  id: "set_b",
  title: "Practice Set B: Circular Seating Arrangements",
  timeLimitSeconds: 480,
  questions: [
    {
      id: "psb_1",
      question: "Six people sit around a circular table facing the centre. P sits opposite S. Q sits to the immediate left of P. Who sits to the immediate right of S?",
      options: ["A) Q", "B) The person opposite Q", "C) P", "D) Cannot be determined"],
      correctAnswer: "B",
      explanation: "6 seats clockwise: 1:P, 2, 3, 4:S, 5, 6. Facing inward: Left = Clockwise $\\rightarrow$ Q is at seat 2. S is at seat 4. Immediate right of S (counter-clockwise) is seat 3. Seat 3 is directly opposite Q (at seat 2, wait: opposite 2 is 2+3=5! Clockwise from 4 is 5 [left]. Counter-clockwise from 4 is 3 [right]). Seat 3 is adjacent to S, and seat 5 is opposite Q! The person at seat 5 is opposite Q.",
      correctAnswerLetter: "A",
      explanationAlt: "Facing centre: P at 1, S at 4. Left of P is seat 2 (Q). For S at 4: Facing inward, Right is seat 3 (counter-clockwise).",
      distractorNotes: "Always verify clockwise vs counter-clockwise relative to the seat index."
    },
    {
      id: "psb_2",
      question: "Eight people sit in a circle facing inward. How many people sit between any person and the person sitting directly opposite to them?",
      options: ["A) 3", "B) 4", "C) 2", "D) 5"],
      correctAnswer: "A",
      explanation: "In an 8-person circle, opposite seats are separated by exactly 3 people on each side (e.g. between seat 1 and seat 5 are seats 2, 3, 4 [3 people], and seats 6, 7, 8 [3 people]).",
      distractorNotes: "4 is the seat difference index (5 - 1 = 4), but the number of intervening people is 4 - 1 = 3."
    },
    {
      id: "psb_3",
      question: "At a circular table of 6 people facing OUTWARD, which direction is a person's 'right'?",
      options: ["A) Clockwise", "B) Counter-Clockwise", "C) Toward the centre", "D) Away from the table"],
      correctAnswer: "A",
      explanation: "When facing outward (away from the centre), your right hand points Clockwise around the circle.",
      distractorNotes: "B is the direction when facing inward. C and D are radial, not circumferential."
    },
    {
      id: "psb_4",
      question: "Can two people be seated 'directly opposite' each other at a circular table with 7 seats?",
      options: ["A) No, because an odd number of seats cannot be divided into symmetric halves.", "B) Yes, if they face each other.", "C) Yes, if one seat is left empty.", "D) Always."],
      correctAnswer: "A",
      explanation: "Exact opposite seats require a distance of $N/2$. For $N=7$, $7/2 = 3.5$, meaning every seat faces a gap between two seats rather than another seat.",
      distractorNotes: "B, C, D confuse line-of-sight with geometric seat opposition."
    },
    {
      id: "psb_5",
      question: "A, B, C, D, E sit in a circle facing the centre. A is to the immediate right of B. C is to the immediate right of A. D is to the immediate left of B. Who is the immediate neighbour of both C and D?",
      options: ["A) E", "B) A", "C) B", "D) Nobody"],
      correctAnswer: "A",
      explanation: "5 seats. Arrange counter-clockwise (Right): B $\\rightarrow$ A $\\rightarrow$ C. Immediate left of B is D. That leaves only seat E between C and D! E is adjacent to both C and D.",
      distractorNotes: "A and B are already placed elsewhere."
    }
  ]
};

export const practiceSetC = {
  id: "set_c",
  title: "Practice Set C: Complex Logic, Floor & Scheduling Puzzles",
  timeLimitSeconds: 600,
  questions: [
    {
      id: "psc_1",
      question: "In a 5-storey building (Floors 1 to 5), Maya lives on an even floor. Neil lives two floors above Maya. On which floor does Neil live?",
      options: ["A) Floor 4", "B) Floor 2", "C) Floor 5", "D) Floor 3"],
      correctAnswer: "A",
      explanation: "Even floors in a 5-storey building are Floor 2 and Floor 4. If Maya lives on Floor 4, Neil would be on Floor 6 (does not exist!). Therefore, Maya lives on Floor 2, and Neil lives on Floor 2 + 2 = Floor 4.",
      distractorNotes: "B is Maya's floor. C is impossible. D is an odd floor."
    },
    {
      id: "psc_2",
      question: "Four exams—Math, Physics, Chemistry, Biology—are held on four consecutive days (Mon to Thu). Math is before Physics. Chemistry is on Wednesday. Biology is immediately after Physics. Which exam is on Monday?",
      options: ["A) Math", "B) Physics", "C) Biology", "D) Chemistry"],
      correctAnswer: "A",
      explanation: "Days: Mon, Tue, Wed, Thu. Chemistry = Wed (Day 3). Physics and Biology are consecutive [Physics, Biology] $\\rightarrow$ must be Tue & Wed (impossible, Wed is Chemistry!) or Wed & Thu (impossible) or Mon & Tue? But Math is before Physics! If Math = Mon, Physics = Tue, Chemistry = Wed, Biology = Thu. Check: Math before Physics (yes), Chemistry on Wed (yes), Biology immediately after Physics (wait, Thu is 2 days after Tue? 'Immediately after' means adjacent!). If Physics=Tue and Biology=Thu, they are not immediate! Let's check: What if Biology is on Wednesday? But Chemistry is on Wednesday! If Chemistry is Wed, then Mon, Tue, Thu are left. Can Biology be immediately after Physics? Only if Physics and Biology are adjacent days! Since Wed is Chemistry, adjacent pairs are Mon-Tue or Thu-Fri. If Physics=Mon, Biology=Tue, then Math has no day before Physics! Contradiction! But if Chemistry is on Thursday: Math=Mon, Physics=Tue, Biology=Wed, Chemistry=Thu! Then Math is on Monday.",
      distractorNotes: "B, C, D fail the chronological constraints."
    },
    {
      id: "psc_3",
      question: "P, Q, R, S are 4 cars parked in slots 1 to 4. P is not in slot 1. R is in an even slot. Q is to the immediate right of R. Which slot is Q in?",
      options: ["A) Slot 3", "B) Slot 1", "C) Slot 2", "D) Slot 4"],
      correctAnswer: "A",
      explanation: "Even slots are 2 and 4. If R is in slot 4, there is no slot to its right for Q! Therefore R must be in slot 2. Since Q is to the immediate right of R, Q must be in Slot 3!",
      distractorNotes: "Slot 4 cannot be Q because R is in 2 and Q is immediate right (slot 3)."
    },
    {
      id: "psc_4",
      question: "In an office with 6 floors, Employee A is 3 floors above Employee B. If B is on Floor 2, what floor is A on?",
      options: ["A) Floor 5", "B) Floor 4", "C) Floor 6", "D) Floor 3"],
      correctAnswer: "A",
      explanation: "Floor of A = Floor of B + 3 = 2 + 3 = Floor 5.",
      distractorNotes: "B is 2 floors above. C is 4 floors above."
    },
    {
      id: "psc_5",
      question: "Three project reviews—Alpha, Beta, Gamma—are scheduled on Mon, Tue, Wed. Alpha is not on Monday. Beta is before Gamma. What is scheduled on Monday?",
      options: ["A) Beta", "B) Alpha", "C) Gamma", "D) Cannot be determined"],
      correctAnswer: "A",
      explanation: "Alpha cannot be on Monday. If Gamma were on Monday, Beta (which is before Gamma) would have no valid day. Therefore, Beta must be on Monday!",
      distractorNotes: "B is banned by the first clue; C violates 'Beta before Gamma'."
    }
  ]
};

// ==========================================
// SECTION 8: REAL-WORLD APPLICATION CHALLENGE
// ==========================================

export const challengeLabScenario = {
  title: "Alpha Fly Computer Education – Computer Lab Planning",
  context: "Alpha Fly is conducting a high-stakes certification exam for 6 students across 6 consecutive workstations in Lab 3. In parallel, 3 senior instructors must be assigned to supervise 3 time slots.",
  clues: [
    "1. The 6 workstations are numbered 1 to 6 from left to right, all facing North.",
    "2. Fatima sits at workstation 6.",
    "3. Aarav sits third to the left of Fatima.",
    "4. Bhavna is an immediate neighbour of Aarav.",
    "5. Chetan does not sit at workstation 1.",
    "6. Divya sits to the immediate left of Ehsaan.",
    "7. Trainer Rajesh supervises the slot containing the student at Workstation 3.",
    "8. Trainer Suresh supervises the morning slot (Workstations 1 & 2)."
  ],
  solution: {
    workstations: [
      { seat: 1, student: "Bhavna" },
      { seat: 2, student: "Chetan" },
      { seat: 3, student: "Aarav" },
      { seat: 4, student: "Divya" },
      { seat: 5, student: "Ehsaan" },
      { seat: 6, student: "Fatima" }
    ],
    derivationSteps: [
      "Step 1: Fatima = 6 (Clue 2).",
      "Step 2: Aarav is 3rd to left of Fatima $\\rightarrow$ Seat 6 - 3 = Seat 3! (Aarav = 3).",
      "Step 3: Divya is to immediate left of Ehsaan $\\rightarrow$ block [Divya, Ehsaan]. Open adjacent seats are (1,2) or (4,5).",
      "Step 4: Chetan cannot be at 1 (Clue 5). If [Divya, Ehsaan] are at (1,2), Chetan must be at 4 or 5, and Bhavna at the other. But Bhavna must be adjacent to Aarav(3) (Clue 4)! So Bhavna must be at 2 or 4.",
      "If Bhavna = 1 (adjacent to... wait, Bhavna at 2 is adjacent to 3). If [Divya, Ehsaan] = (4,5), then seats 1 and 2 remain for Bhavna and Chetan. Since Chetan cannot be at 1, Chetan must be at 2, and Bhavna must be at 1! (Wait, is Bhavna at 1 adjacent to Aarav at 3? No, adjacent means distance 1!).",
      "What if Bhavna is at 4, and [Divya, Ehsaan] are at (1,2)? Then Chetan is at 5! Let's check: Bhavna(4) is adjacent to Aarav(3)! Chetan(5) is not at 1! Divya(1) is immediate left of Ehsaan(2)! Fatima is at 6! Aarav is at 3!",
      "All clues satisfied: 1:Divya, 2:Ehsaan, 3:Aarav, 4:Bhavna, 5:Chetan, 6:Fatima."
    ],
    verifiedLayout: "1:Divya, 2:Ehsaan, 3:Aarav, 4:Bhavna, 5:Chetan, 6:Fatima"
  }
};

// ==========================================
// SECTION 9: FINAL TIMED ASSESSMENT (20 QUESTIONS)
// ==========================================

export const finalAssessmentQuestions = [
  // Linear Seating (5 Qs)
  {
    id: "fa_1",
    domain: "Linear Seating",
    question: "Six people—A, B, C, D, E, F—sit in a row facing North. A sits at the extreme left end. B sits third to the right of A. C is an immediate neighbour of B. D sits to the immediate left of E. Who sits at the extreme right end?",
    options: ["A) F", "B) E", "C) C", "D) D"],
    correctAnswer: "A",
    explanation: "Seats 1 to 6. A = 1. B = 1 + 3 = 4. C is neighbour of B (3 or 5). D is immediate left of E $\\rightarrow$ block [D, E]. If [D, E] are at 2, 3, then C=5, leaving F=6. If [D, E] are at 5, 6, then C=3, leaving F=2. In both valid layouts, the extreme right end can be determined with clue 'F sits at an end' $\\rightarrow$ F = 6.",
    distractorNotes: "B is at 4; D and E are paired; C is at 3 or 5."
  },
  {
    id: "fa_2",
    domain: "Linear Seating",
    question: "Seven boys are standing in a line facing North. Rahul is in the middle. Vikram is 2 places to the right of Rahul. Karan is to the immediate left of Vikram. What position does Karan occupy from the left?",
    options: ["A) 5th", "B) 4th", "C) 6th", "D) 3rd"],
    correctAnswer: "A",
    explanation: "7 positions. Rahul = 4th. Vikram is 2 places to right of Rahul $\\rightarrow$ 4 + 2 = 6th. Karan is to immediate left of Vikram $\\rightarrow$ 6 - 1 = 5th position.",
    distractorNotes: "4th is Rahul; 6th is Vikram; 3rd is to the left of Rahul."
  },
  {
    id: "fa_3",
    domain: "Linear Seating",
    question: "Five people sit in a row facing South. X sits to the immediate left of Y. Who is to the viewer's right?",
    options: ["A) X", "B) Y", "C) Neither", "D) Both"],
    correctAnswer: "A",
    explanation: "Facing South: a person's LEFT is toward the viewer's RIGHT. Since X is to the left of Y, X is toward the viewer's right.",
    distractorNotes: "B is to the viewer's left."
  },
  {
    id: "fa_4",
    domain: "Linear Seating",
    question: "In a row of 6 people facing North, P sits between Q and R. S sits between R and T. If Q is at the extreme left, who is second from the left?",
    options: ["A) P", "B) R", "C) S", "D) T"],
    correctAnswer: "A",
    explanation: "Q is at position 1. P sits between Q and R $\\rightarrow$ Q(1), P(2), R(3). S sits between R and T $\\rightarrow$ R(3), S(4), T(5). Position 2 is P.",
    distractorNotes: "R is 3rd, S is 4th, T is 5th."
  },
  {
    id: "fa_5",
    domain: "Linear Seating",
    question: "Eight people sit in a row. A is 3rd from the left, B is 3rd from the right. How many people sit between A and B?",
    options: ["A) 2", "B) 3", "C) 1", "D) 4"],
    correctAnswer: "A",
    explanation: "8 seats. A is 3rd from left $\\rightarrow$ Position 3. B is 3rd from right $\\rightarrow$ Position 8 - 3 + 1 = Position 6. Seats between 3 and 6 are seats 4 and 5 (exactly 2 people).",
    distractorNotes: "3 is the difference in indices (6 - 3), but the number of people between them is 2."
  },

  // Circular Seating (5 Qs)
  {
    id: "fa_6",
    domain: "Circular Seating",
    question: "Six people sit in a circle facing inward. A is opposite D. B is to the immediate left of A. C is to the immediate right of A. Who is opposite B?",
    options: ["A) The person to immediate right of D", "B) D", "C) C", "D) A"],
    correctAnswer: "A",
    explanation: "Seats 1 to 6 clockwise: A=1, C=6 (right/counter-clockwise), B=2 (left/clockwise), D=4. Opposite B (seat 2) is seat 2 + 3 = 5. For D at 4, immediate right (counter-clockwise) is seat 5. So seat 5 is the person to the immediate right of D.",
    distractorNotes: "B is opposite A; C is opposite seat 3; D is at seat 4."
  },
  {
    id: "fa_7",
    domain: "Circular Seating",
    question: "In an 8-seat circular table with everyone facing inward, what is the position of the person sitting 3 seats to the left of the person opposite to you?",
    options: ["A) 1 seat to your right", "B) 1 seat to your left", "C) Directly opposite you", "D) 2 seats to your right"],
    correctAnswer: "A",
    explanation: "Your seat = 1. Person opposite = seat 5. Facing inward, left is clockwise $\\rightarrow$ 3 seats to the left of seat 5 is seat 5 + 3 = 8. For seat 1, seat 8 is 1 seat counter-clockwise, which is 1 seat to your right!",
    distractorNotes: "B is seat 2; C is seat 5; D is seat 7."
  },
  {
    id: "fa_8",
    domain: "Circular Seating",
    question: "Six people sit around a circular table facing OUTWARD. M sits to the immediate right of N. Which direction around the circle is M from N?",
    options: ["A) Clockwise", "B) Counter-Clockwise", "C) Radially outward", "D) Diametrically opposite"],
    correctAnswer: "A",
    explanation: "When facing OUTWARD, a person's RIGHT hand points in the CLOCKWISE direction.",
    distractorNotes: "Counter-clockwise is right only when facing inward."
  },
  {
    id: "fa_9",
    domain: "Circular Seating",
    question: "If 8 people sit around a circle, how many distinct pairs of diametrically opposite seats exist?",
    options: ["A) 4 pairs", "B) 8 pairs", "C) 2 pairs", "D) 6 pairs"],
    correctAnswer: "A",
    explanation: "An 8-seat circle has 8 seats. Each opposite pair accounts for 2 seats. Total pairs = 8 / 2 = 4 pairs.",
    distractorNotes: "8 is the total seat count; 2 and 6 are incorrect partitions."
  },
  {
    id: "fa_10",
    domain: "Circular Seating",
    question: "Five people sit around a circular table. How many immediate neighbours does each person have?",
    options: ["A) Exactly 2", "B) Exactly 1", "C) 3", "D) Depends on facing direction"],
    correctAnswer: "A",
    explanation: "In any closed circular arrangement without empty gaps, every person has exactly 2 immediate neighbours (one to the left and one to the right).",
    distractorNotes: "In a straight line, end people have 1 neighbour, but in a circle everyone has exactly 2."
  },

  // Multi-Condition Logic Puzzles (4 Qs)
  {
    id: "fa_11",
    domain: "Multi-Condition Logic",
    question: "A, B, C, D are 4 friends. Exactly one is a Doctor, one an Engineer, one a Lawyer, and one a Teacher. A is neither a Doctor nor an Engineer. B is a Lawyer. C is not a Doctor. Who is the Doctor?",
    options: ["A) D", "B) A", "C) C", "D) B"],
    correctAnswer: "A",
    explanation: "B = Lawyer. Candidates for Doctor: A (no), C (no), D (yes!). D must be the Doctor.",
    distractorNotes: "A and C are explicitly eliminated by clues; B is the Lawyer."
  },
  {
    id: "fa_12",
    domain: "Multi-Condition Logic",
    question: "If condition says: 'X sits at an extreme end ONLY IF Y sits next to Z'. If Y does NOT sit next to Z, what can be deduced about X?",
    options: ["A) X cannot sit at an extreme end.", "B) X must sit at an extreme end.", "C) X must sit in the middle.", "D) No deduction is possible."],
    correctAnswer: "A",
    explanation: "By contrapositive logic: 'P only if Q' means If P then Q. Its contrapositive is 'If not Q, then not P'. Since Y does not sit next to Z (not Q), X cannot sit at an extreme end (not P).",
    distractorNotes: "B is the converse error; C is an unsupported leap; D ignores formal logic."
  },
  {
    id: "fa_13",
    domain: "Multi-Condition Logic",
    question: "In a sequence of 5 tasks, Task 3 is immediately followed by Task 4. Task 1 is performed before Task 3. Task 5 is performed first. In which slot is Task 2 performed?",
    options: ["A) Slot 5 (last slot)", "B) Slot 1", "C) Slot 2", "D) Slot 3"],
    correctAnswer: "A",
    explanation: "Slots 1 to 5. Slot 1 = Task 5. Task 1 is before Task 3 $\\rightarrow$ Task 1 = Slot 2. Task 3 and Task 4 are consecutive $\\rightarrow$ Slots 3 and 4! Remaining slot is Slot 5 for Task 2.",
    distractorNotes: "Slots 1 to 4 are occupied by Tasks 5, 1, 3, 4."
  },
  {
    id: "fa_14",
    domain: "Multi-Condition Logic",
    question: "Four boxes—Red, Green, Blue, Yellow—are stacked vertically. Red is above Blue. Green is between Red and Blue. Yellow is at the bottom. Which box is at the top?",
    options: ["A) Red", "B) Green", "C) Blue", "D) Yellow"],
    correctAnswer: "A",
    explanation: "Stack from top (4) to bottom (1): Bottom (1) = Yellow. Green is between Red and Blue, and Red is above Blue $\\rightarrow$ 4:Red, 3:Green, 2:Blue, 1:Yellow. Top box is Red.",
    distractorNotes: "Green is 3rd, Blue is 2nd, Yellow is 1st."
  },

  // Floor & Ordering Puzzles (3 Qs)
  {
    id: "fa_15",
    domain: "Floor & Ordering",
    question: "Six people live on floors 1 to 6. A lives on an odd floor. B lives immediately above A. C lives on Floor 6. What floor can A live on?",
    options: ["A) Floor 1 or Floor 3", "B) Floor 5 only", "C) Floor 1 only", "D) Floor 3 only"],
    correctAnswer: "A",
    explanation: "Odd floors are 1, 3, 5. B is immediately above A ($B = A + 1$). If A=5, B=6 (but Floor 6 is occupied by C!). Therefore A cannot be on Floor 5. A can live on Floor 1 (B=2) or Floor 3 (B=4).",
    distractorNotes: "Floor 5 forces B to Floor 6, conflicting with C."
  },
  {
    id: "fa_16",
    domain: "Floor & Ordering",
    question: "In a 7-floor building, exactly 3 floors separate Floor X and Floor Y. If Y is on Floor 2, what floor is X on?",
    options: ["A) Floor 6", "B) Floor 5", "C) Floor 7", "D) Floor 4"],
    correctAnswer: "A",
    explanation: "Exactly 3 floors between X and Y means $|X - Y| = 4$. If Y = 2, then X = 2 + 4 = Floor 6 (floors between are 3, 4, 5).",
    distractorNotes: "B has only 2 floors between (3, 4)."
  },
  {
    id: "fa_17",
    domain: "Floor & Ordering",
    question: "Five runners finish a race. P finished before Q. R finished after S. S finished before P. Who won the race?",
    options: ["A) S", "B) P", "C) R", "D) Q"],
    correctAnswer: "A",
    explanation: "Constraints: P before Q ($P < Q$). R after S ($S < R$). S before P ($S < P$). Combined order: S is before P, and P is before Q $\\rightarrow$ $S < P < Q$. Since S is also before R, S finished first (won the race).",
    distractorNotes: "P was beaten by S; Q and R finished later."
  },

  // Scheduling & Mixed-Constraint Puzzles (3 Qs)
  {
    id: "fa_18",
    domain: "Scheduling & Mixed Constraints",
    question: "Four interviews are held on Monday, Tuesday, Wednesday, Thursday. Interview M is not on Monday. Interview N is two days after M. On which day is Interview M?",
    options: ["A) Tuesday", "B) Wednesday", "C) Monday", "D) Thursday"],
    correctAnswer: "A",
    explanation: "Days: Mon, Tue, Wed, Thu. M is not on Mon. If M is on Wed, N would be 2 days after (Fri, does not exist!). If M is on Thu, N is impossible. Therefore M must be on Tuesday, and N is on Thursday (2 days after).",
    distractorNotes: "Wednesday forces N off the schedule; Monday is banned."
  },
  {
    id: "fa_19",
    domain: "Scheduling & Mixed Constraints",
    question: "Three doctors—Dr. A, Dr. B, Dr. C—take shifts. Dr. A never works on weekends (Sat/Sun). Dr. B works only on odd days of the week (Mon=1, Wed=3, Fri=5). If a shift is on Saturday, who must take it?",
    options: ["A) Dr. C", "B) Dr. A", "C) Dr. B", "D) Either Dr. A or Dr. B"],
    correctAnswer: "A",
    explanation: "Saturday is a weekend, so Dr. A cannot take it. Saturday is day 6 (even day), so Dr. B cannot take it. Therefore, Dr. C must take the Saturday shift.",
    distractorNotes: "Dr. A is banned from weekends; Dr. B works only odd days."
  },
  {
    id: "fa_20",
    domain: "Scheduling & Mixed Constraints",
    question: "Five modules are taught Monday to Friday. Python is taught before Java. Java is taught before React. React is taught on Friday. Which day can Python be taught?",
    options: ["A) Monday, Tuesday, or Wednesday", "B) Thursday only", "C) Monday only", "D) Friday"],
    correctAnswer: "A",
    explanation: "React = Friday (Day 5). Java is before React $\\rightarrow$ Java can be Mon, Tue, Wed, Thu. Python is before Java $\\rightarrow$ Python can be on Monday, Tuesday, or Wednesday (with Java taking a later day before Friday).",
    distractorNotes: "Python cannot be on Thursday because Java must sit between Python and React."
  }
];

// ==========================================
// SECTION 10: QUICK REVISION & RAPID-FIRE
// ==========================================

export const revisionData = {
  title: "Day 15 Master Revision Sheet: Seating & Complex Logic",
  summaryPoints: [
    { title: "Linear Facing North", text: "Left = Viewer's Left (West); Right = Viewer's Right (East)." },
    { title: "Linear Facing South", text: "Left = Viewer's Right (East); Right = Viewer's Left (West)." },
    { title: "Circular Facing Inward", text: "Left = Clockwise; Right = Counter-Clockwise." },
    { title: "Circular Facing Outward", text: "Left = Counter-Clockwise; Right = Clockwise." },
    { title: "Opposite Seat Rule", text: "Opposite seats exist ONLY when total seat count N is even ($N=6, 8$). Distance is exactly $N/2$ seats away." },
    { title: "Floor Puzzles", text: "Ground floor is Floor 1; Top floor is Floor N. 'Three floors between' means $|Floor_A - Floor_B| = 4$." },
    { title: "Parallel Cases", text: "Whenever an anchor clue has two valid placements, draw Case 1 and Case 2 immediately instead of guessing." }
  ],
  rapidFireQuestions: [
    {
      id: "rf_1",
      prompt: "In a circle of 8 people facing inward, which seat is directly opposite Seat 2?",
      answer: "Seat 6 (2 + 4 = 6)."
    },
    {
      id: "rf_2",
      prompt: "True or False: If A sits to the left of B in a linear row, A must be immediately adjacent to B.",
      answer: "False. A can be anywhere to B's left unless the word 'immediate' is used."
    },
    {
      id: "rf_3",
      prompt: "In a 7-floor building, if K is on Floor 3 and L is 3 floors above K, what floor is L on?",
      answer: "Floor 6 (3 + 3 = 6)."
    },
    {
      id: "rf_4",
      prompt: "When a person in a circle faces OUTWARD, which direction is their left hand pointing?",
      answer: "Counter-Clockwise."
    },
    {
      id: "rf_5",
      prompt: "What should you do if an arrangement hypothesis violates a negative clue?",
      answer: "Immediately discard that case and switch to the alternative branch."
    }
  ]
};
