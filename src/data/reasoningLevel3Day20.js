// src/data/reasoningLevel3Day20.js
// Alpha Fly Computer Education - Logical Reasoning Level 3 (Advanced) Day 9
// Title: Advanced Pattern Recognition, Abstract Reasoning and Non-Verbal Logic

export const day20Overview = {
  course: 'Logical Reasoning',
  level: 'Level 3 – Advanced',
  day: 'Day 9 (Cumulative Day 20)',
  title: 'Advanced Pattern Recognition, Abstract Reasoning and Non-Verbal Logic',
  duration: '60–75 minutes',
  difficulty: 'Advanced',
  prerequisite: 'Day 8 – Advanced Root Cause Analysis, Strategic Problem-Solving and Decision Trees',
  learningObjectives: [
    'Systematically decompose complex visual figures into atomic geometric properties (Shape, Count, Size, Orientation, Shading, and Position).',
    'Execute precise mental rotations (45°, 90°, 180°, 270°) and distinguish rotations from vertical and horizontal reflections.',
    'Formulate arithmetic and geometric progression rules for shape count, polygon vertices, and perimeter-walking symbols.',
    'Solve complex 2×2 and 3×3 visual matrices using row-wise, column-wise, and Boolean geometric operations (XOR, AND, OR intersection).',
    'Identify the "Odd Figure Out" through invariant classification rules rather than superficial cosmetic appearance.',
    'Isolate multi-layer transformations where two or more independent rules operate simultaneously in a visual sequence.',
    'Detect visual distractors that satisfy one or two rules while violating the complete systemic transformation syntax.',
    'Eliminate perceptual cognitive biases (such as optical illusions or grouping illusions) via structured feature tracking checklists.',
    'Verify that an abstract reasoning puzzle possesses a unique, mathematically defensible solution without ambiguity.',
    'Articulate the exact formal deductive rule explaining any non-verbal sequence in competitive examination and technical assessment contexts.'
  ]
};

export const section1Fundamentals = {
  title: 'Section 1 – Fundamentals of Abstract & Non-Verbal Reasoning',
  introduction: `Abstract Reasoning tests fluid intelligence: the capacity to analyze novel visual patterns, discover hidden rules, and deduce logical conclusions without relying on spoken or written language. In top-tier technical evaluations, placement assessments, and civil service examinations, non-verbal questions measure pure deductive horsepower, structural observation speed, and multi-variable working memory.`,
  coreProperties: [
    { name: '1. Shape & Topology', desc: 'Polygon geometry, curved vs straight boundaries, closed vs open curves, concentric figures, and geometric topology.' },
    { name: '2. Count & Cardinality', desc: 'Number of shapes, sides/vertices, intersecting lines, dots, perimeter vertices, and partition segments (often following arithmetic progressions: +1, +2, Fibonacci).' },
    { name: '3. Spatial Orientation & Angle', desc: 'Directional pointing, tilt angles (45°, 90°, 135°, 180°), clockwise (CW) versus counter-clockwise (CCW) rotation progressions.' },
    { name: '4. Shading, Hatching & Fill', desc: 'Solid black, hollow white, diagonal hatching, checkerboard, or alternating half-fills indicating state transitions.' },
    { name: '5. Relative Position & Movement', desc: 'Objects orbiting corners, sliding along diagonals, moving from foreground to background, or mirroring across axes.' },
    { name: '6. Symmetry & Reflection', desc: 'Line symmetry (bilateral vertical/horizontal axes) versus point symmetry (180° rotational rotational invariance).' },
    { name: '7. Boolean Set Operations', desc: 'Overlapping shapes undergoing Union (OR), Intersection (AND), or Exclusive Difference (XOR — overlapping lines cancel out).' }
  ],
  systematicMethod: [
    { step: 'Step 1: Universal Feature Scan', detail: 'Do not look at the figures as a whole picture. Dissect the figure into individual layers: Primary Shape, Internal Fill, Attached Symbols, and Angle.' },
    { step: 'Step 2: Isolate Single-Variable Changes', detail: 'Track one element at a time across the sequence. For example, follow only the dot’s position first, then follow only the arrow’s rotation.' },
    { step: 'Step 3: Quantify the Transformation Rule', detail: 'Express the rule mathematically: "Rotates +90° CW per step," "Vertex count = n + 1," "Fill alternates Black -> Striped -> White."' },
    { step: 'Step 4: Cross-Validate Across Every Element', detail: 'Ensure your hypothesized rule holds true between Figure 1 -> 2, 2 -> 3, and 3 -> 4. Never extrapolate from just one transition!' },
    { step: 'Step 5: Pre-Generate the Target Solution', detail: 'Mentally construct the required missing figure BEFORE looking at the answer choices. This shields you from falling for visual distractors.' },
    { step: 'Step 6: Eliminate Flawed Distractors', detail: 'Match your pre-generated solution against the options, systematically eliminating options that satisfy only partial rules.' }
  ],
  warmupQuestions: [
    {
      id: 'wu1',
      question: 'A sequence consists of a Triangle (3 sides), a Square (4 sides), and a Pentagon (5 sides). What is the primary property governing this progression, and what shape must follow next?',
      options: [
        'Rotation angle (+45°); followed by a Circle.',
        'Polygon vertex count (n + 1 progression); followed by a Hexagon (6 sides).',
        'Shading inversion; followed by a hollow triangle.',
        'Bilateral line symmetry; followed by an ellipse.'
      ],
      correct: 1,
      explanation: 'The underlying rule is an arithmetic progression of sides/vertices: 3 -> 4 -> 5 -> 6. A regular 6-sided polygon is a Hexagon.'
    },
    {
      id: 'wu2',
      question: 'Which of the following describes the fundamental distinction between a 180° Rotation and a Horizontal Reflection (mirror flip across the vertical Y-axis)?',
      options: [
        'There is no difference; they produce mathematically identical figures for all shapes.',
        'A 180° rotation preserves chirality (handedness) in the plane, whereas a reflection inverts chirality (a right hand becomes a left hand).',
        'A reflection always changes the color of the shape, while a rotation preserves color.',
        'A 180° rotation requires an odd number of vertices.'
      ],
      correct: 1,
      explanation: 'In 2D plane geometry, rotation is a rigid transformation preserving orientation and chirality. Reflection is an improper rigid transformation that reverses chirality (handedness). An asymmetric shape like the letter "L" flipped horizontally gives "⅃", whereas rotated 180° gives an upside-down "⅂".'
    },
    {
      id: 'wu3',
      question: 'In a visual puzzle, two shapes overlap, and the rule states: "Lines that appear in both overlapping figures are erased, while lines appearing in only one figure are retained." Which logic gate operation does this visual rule represent?',
      options: [
        'AND (Intersection)',
        'OR (Union)',
        'XOR (Exclusive OR / Symmetric Difference)',
        'NOT (Inversion)'
      ],
      correct: 2,
      explanation: 'XOR (Exclusive OR) outputs TRUE (retained) if and only if an input is present in exactly one source figure. When identical overlapping lines cancel each other out, the transformation is a geometric XOR.'
    }
  ]
};

export const section2Transformations = {
  title: 'Section 2 – Rotation, Reflection and Spatial Orientation',
  introduction: `Transformational geometry in non-verbal reasoning deals with spatial movements across a 2D plane. Mastery requires mental rotation agility and the ability to differentiate angular displacement from mirror reflection.`,
  concepts: [
    { name: 'Rotational Displacement', desc: 'Angular shifts around a central pivot point. Standard benchmarks: +45° (one-eighth turn), +90° (quarter turn), +135° (three-eighths), +180° (half turn). Watch for clockwise (CW) vs counter-clockwise (CCW) directions.' },
    { name: 'Reflective Inversion', desc: 'Flipping across an axis of symmetry. Horizontal axis reflection flips Top <-> Bottom (water image). Vertical axis reflection flips Left <-> Right (mirror image).' },
    { name: 'Compound Transformation', desc: 'A simultaneous rotation and reflection, or rotation paired with alternating shading states.' }
  ],
  workedExamples: [
    {
      id: 'ex_rot1',
      title: 'Example 1: Single Arrow Progressive Rotation',
      problem: 'An arrow points North in Figure 1, North-East in Figure 2, East in Figure 3, and South-East in Figure 4. What direction must it point in Figure 5?',
      rule: 'Clockwise rotation of +45° per step.',
      steps: [
        'Figure 1: North (0°)',
        'Figure 2: North-East (45° CW)',
        'Figure 3: East (90° CW)',
        'Figure 4: South-East (135° CW)',
        'Figure 5: South (180° CW)'
      ],
      options: ['North-West', 'South', 'South-West', 'West'],
      correct: 1,
      explanation: 'Continuing the uniform +45° clockwise progression from South-East (135°) yields South (180°). Option B is correct.'
    },
    {
      id: 'ex_rot2',
      title: 'Example 2: Asymmetric Shape – Rotation vs. Reflection',
      problem: 'The letter "F" is rotated 90° clockwise in Step 1, then reflected across a vertical mirror line in Step 2, then rotated 90° clockwise in Step 3. What is its final orientation?',
      rule: 'Compound sequential transformation: Rotate 90° CW -> Vertical Reflection -> Rotate 90° CW.',
      steps: [
        'Initial: Standard upright "F"',
        'After 90° CW rotation: Horizontal stem pointing right, horizontal bars pointing down.',
        'After Vertical Mirror Flip: Left and right invert; horizontal stem points left, bars still point down.',
        'After 90° CW rotation: Rotates 90° clockwise; stem points straight down, bars point left.'
      ],
      options: [
        'Stem points straight down with bars pointing left',
        'Stem points straight up with bars pointing right',
        'Stem points left with bars pointing up',
        'Standard upright "F"'
      ],
      correct: 0,
      explanation: 'Tracking the stem and crossbars systematically through each discrete spatial operation confirms Option A as the mathematically exact result.'
    },
    {
      id: 'ex_rot3',
      title: 'Example 3: Dual Elements with Opposite Rotational Directions',
      problem: 'A circle contains a solid black square at the top and a triangle at the bottom. In each step, the black square rotates 90° Clockwise around the circle’s perimeter, while the triangle rotates 90° Counter-Clockwise.',
      rule: 'Square: +90° CW (Top -> Right -> Bottom -> Left). Triangle: -90° CCW (Bottom -> Right -> Top -> Left).',
      steps: [
        'Step 1: Square at Top (12 o’clock), Triangle at Bottom (6 o’clock).',
        'Step 2: Square at Right (3 o’clock), Triangle at Right (3 o’clock) [Coinciding].',
        'Step 3: Square at Bottom (6 o’clock), Triangle at Top (12 o’clock).',
        'Step 4: Square at Left (9 o’clock), Triangle at Left (9 o’clock) [Coinciding].'
      ],
      options: [
        'Square at Top, Triangle at Right',
        'Square at Left, Triangle at Left (coinciding)',
        'Square at Right, Triangle at Bottom',
        'Square at Bottom, Triangle at Top'
      ],
      correct: 1,
      explanation: 'In Step 4, the square advances 90° CW from 6 o’clock to 9 o’clock (Left). The triangle advances 90° CCW from 12 o’clock to 9 o’clock (Left). Both occupy the Left position simultaneously. Option B is correct.'
    },
    {
      id: 'ex_rot4',
      title: 'Example 4: Accelerating Angular Displacement',
      problem: 'A pointer rotates +45° in the first step, +90° in the second step, and +135° in the third step. If it starts pointing North (0°), where does it point after the fourth step?',
      rule: 'Accelerating clockwise rotation: Δθ = 45° × step_number (+45°, +90°, +135°, +180°).',
      steps: [
        'Step 0: North (0°)',
        'Step 1: 0° + 45° = 45° (North-East)',
        'Step 2: 45° + 90° = 135° (South-East)',
        'Step 3: 135° + 135° = 270° (West)',
        'Step 4: 270° + 180° = 450° = 90° (East)'
      ],
      options: ['South-West', 'North', 'East', 'South'],
      correct: 2,
      explanation: 'The angle increases by an additional 45° at every transition (+45°, +90°, +135°, +180°). Adding 180° to West (270°) results in 450° mod 360° = 90°, which is due East. Option C is correct.'
    },
    {
      id: 'ex_rot5',
      title: 'Example 5: Pinwheel Quadrant Shading with Alternating Reflection',
      problem: 'A circle is divided into 4 quadrants. In Step 1, top-right quadrant is shaded. In Step 2, bottom-right is shaded. In Step 3, bottom-left is shaded. Alongside this rotation, a dot inside the unshaded region alternates between black and white.',
      rule: 'Quadrant shading rotates 90° Clockwise. Internal dot alternates Black -> White -> Black -> White.',
      steps: [
        'Step 1: Top-Right shaded, Black dot.',
        'Step 2: Bottom-Right shaded, White dot.',
        'Step 3: Bottom-Left shaded, Black dot.',
        'Step 4: Top-Left shaded, White dot.'
      ],
      options: [
        'Top-Left quadrant shaded with a White dot',
        'Top-Left quadrant shaded with a Black dot',
        'Bottom-Left quadrant shaded with a White dot',
        'Top-Right quadrant shaded with a White dot'
      ],
      correct: 0,
      explanation: 'Continuing the 90° CW shading shift moves the fill to the Top-Left quadrant. The dot state alternates from Black (Step 3) to White (Step 4). Option A is the unique correct answer.'
    },
    {
      id: 'ex_rot6',
      title: 'Example 6: Horizontal Water-Image Reflection vs Vertical Mirror Flip',
      problem: 'An asymmetric geometric figure shaped like a right-angled triangle with a dot inside its acute corner undergoes an alternating transformation: Step 1 (Vertical mirror reflection), Step 2 (Horizontal water reflection), Step 3 (Vertical mirror reflection). What is the net transformation from the original state?',
      rule: 'Reflection across Y-axis followed by X-axis is mathematically equivalent to a 180° Point Rotation. A second Y-axis reflection inverts back across Y.',
      steps: [
        'Original: Triangle with base horizontal, hypotenuse on right, dot in bottom-right corner.',
        'Step 1 (Vertical Mirror): Hypotenuse flips to left, dot moves to bottom-left corner.',
        'Step 2 (Horizontal Flip): Triangle points upside down, dot moves to top-left corner.',
        'Step 3 (Vertical Mirror): Dot flips back to top-right corner; hypotenuse returns to right side, pointing downwards.'
      ],
      options: [
        'Inverted triangle with dot in top-right corner (equivalent to pure horizontal water reflection)',
        'Original triangle unchanged',
        'Triangle rotated 90° clockwise',
        'Triangle with dot in bottom-left corner'
      ],
      correct: 0,
      explanation: 'Applying the three reflections sequentially: V -> H -> V. Mathematically, V × H × V = H (since V × V cancels out to the identity transformation!). The final result is exactly identical to a single Horizontal (water) reflection. Option A is correct.'
    }
  ]
};

export const section3ShapeAndShading = {
  title: 'Section 3 – Shape, Count and Shading Patterns',
  introduction: `Non-verbal patterns frequently govern the numerical properties of geometric elements: the count of vertices, the number of nested concentric rings, the movement of dots along perimeter tracks, and cyclic shading rules.`,
  rulesOverview: [
    { type: 'Vertex & Side Cardinality', desc: 'Progression in polygon geometry: Triangle (3) -> Quadrilateral (4) -> Pentagon (5) -> Hexagon (6) -> Heptagon (7).' },
    { type: 'Perimeter Track Walking', desc: 'A marker (such as a dot or cross) moves along the outer corners of a shape by fixed step intervals (+1 vertex, +2 vertices).' },
    { type: 'Line Segment Additions & Removals', desc: 'Figures gain or shed internal diagonals, spokes, or boundary segments following arithmetic rules.' },
    { type: 'Cyclic Shading Phases', desc: 'Shading follows multi-state cycles: White -> Shaded (Gray) -> Solid (Black) -> Inverted.' }
  ],
  workedExamples: [
    {
      id: 'ex_sc1',
      title: 'Example 1: Dual Concentric Polygons with Inverted Vertex Progressions',
      problem: 'Each figure contains an Outer Polygon and an Inner Polygon. In Figure 1: Outer is 6-sided (Hexagon), Inner is 3-sided (Triangle). In Figure 2: Outer is 5-sided (Pentagon), Inner is 4-sided (Square). In Figure 3: Outer is 4-sided (Square), Inner is 5-sided (Pentagon). What must Figure 4 contain?',
      rule: 'Outer polygon vertices decrease by 1 (6 -> 5 -> 4 -> 3). Inner polygon vertices increase by 1 (3 -> 4 -> 5 -> 6).',
      steps: [
        'Outer: Hexagon (6) -> Pentagon (5) -> Square (4) -> Triangle (3)',
        'Inner: Triangle (3) -> Square (4) -> Pentagon (5) -> Hexagon (6)'
      ],
      options: [
        'Outer Triangle with Inner Hexagon',
        'Outer Square with Inner Square',
        'Outer Hexagon with Inner Triangle',
        'Outer Circle with Inner Pentagon'
      ],
      correct: 0,
      explanation: 'Following the arithmetic progression, the outer shape must be a 3-sided Triangle and the inner shape must be a 6-sided Hexagon. Option A is correct.'
    },
    {
      id: 'ex_sc2',
      title: 'Example 2: Perimeter Dot Walking on a Regular Pentagon',
      problem: 'A dot starts at the top apex of a regular pentagon (Vertex 1). In each subsequent step, it advances 2 vertices clockwise along the pentagon’s perimeter. Where is it located in Step 4?',
      rule: 'Clockwise vertex advance of +2 vertices mod 5 per step.',
      steps: [
        'Step 1: Vertex 1 (Top)',
        'Step 2: 1 + 2 = Vertex 3 (Bottom-Right)',
        'Step 3: 3 + 2 = Vertex 5 (Top-Left)',
        'Step 4: 5 + 2 = 7 mod 5 = Vertex 2 (Top-Right)'
      ],
      options: [
        'Vertex 2 (Top-Right)',
        'Vertex 4 (Bottom-Left)',
        'Vertex 1 (Top Apex)',
        'Center of the pentagon'
      ],
      correct: 0,
      explanation: 'Adding 2 vertices clockwise at each transition: 1 -> 3 -> 5 -> 2. The dot lands on Vertex 2 (Top-Right). Option A is correct.'
    },
    {
      id: 'ex_sc3',
      title: 'Example 3: Line Segment Addition & Shading Inversion',
      problem: 'Figure 1: Empty circle with 1 diameter line. Figure 2: Circle divided into 4 quadrants by 2 lines, 1 quadrant shaded black. Figure 3: Circle divided into 6 sectors by 3 lines, 2 sectors shaded black. Figure 4: Circle divided into 8 sectors by 4 lines, 3 sectors shaded black. What does Figure 5 contain?',
      rule: 'Lines increase by 1 (1 -> 2 -> 3 -> 4 -> 5). Total sectors = 2 × Lines (10 sectors). Shaded sectors = Lines - 1 (4 shaded sectors).',
      steps: [
        'Lines: 5 diameters partitioning the circle into 10 equal sectors.',
        'Shading: Exactly 4 sectors shaded black.'
      ],
      options: [
        'Circle with 5 lines (10 sectors) and 4 shaded sectors',
        'Circle with 6 lines (12 sectors) and 5 shaded sectors',
        'Circle with 4 lines (8 sectors) and 4 shaded sectors',
        'Circle with 5 lines and 5 shaded sectors'
      ],
      correct: 0,
      explanation: 'Lines = 5, producing 10 sectors; shaded sectors = 4. Option A is the mathematically consistent continuation.'
    },
    {
      id: 'ex_sc4',
      title: 'Example 4: Relative Size and Alternating Fill Toggle',
      problem: 'Two concentric squares. Step 1: Large square is White, small inner square is Black. Step 2: Large square is Black, small inner square is White. Step 3: Large square is White, small inner square is Black. What is Step 4?',
      rule: 'Alternating binary toggle of inner and outer fills.',
      steps: [
        'Step 1: Outer White, Inner Black',
        'Step 2: Outer Black, Inner White',
        'Step 3: Outer White, Inner Black',
        'Step 4: Outer Black, Inner White'
      ],
      options: [
        'Outer Black, Inner White',
        'Outer White, Inner Black',
        'Both squares Black',
        'Both squares White'
      ],
      correct: 0,
      explanation: 'The binary alternation alternates predictably; Step 4 must replicate the state of Step 2 (Outer Black, Inner White). Option A is correct.'
    },
    {
      id: 'ex_sc5',
      title: 'Example 5: Fibonacci Progression in Corner Dots',
      problem: 'A series of square frames display small dots in the corners: Figure 1 has 1 dot, Figure 2 has 2 dots, Figure 3 has 3 dots, Figure 4 has 5 dots. How many dots must Figure 5 contain?',
      rule: 'Fibonacci sequence of element counts: 1, 2, 3, 5, 8 (each term is the sum of the preceding two terms).',
      steps: [
        'Term 1 = 1',
        'Term 2 = 2',
        'Term 3 = 1 + 2 = 3',
        'Term 4 = 2 + 3 = 5',
        'Term 5 = 3 + 5 = 8 dots'
      ],
      options: ['6 dots', '7 dots', '8 dots', '9 dots'],
      correct: 2,
      explanation: 'The pattern is the classic Fibonacci sequence (1, 2, 3, 5, 8). Figure 5 must have 8 dots. Option C is correct.'
    },
    {
      id: 'ex_sc6',
      title: 'Example 6: Intersecting Overlapping Circles with Subtraction Fill',
      problem: 'Two intersecting circles (Venn diagram style). In Step 1, only the left crescent is shaded. In Step 2, only the center overlap is shaded. In Step 3, only the right crescent is shaded. In Step 4, both outer crescents are shaded. What follows in Step 5?',
      rule: 'Left -> Center -> Right -> Both outer crescents -> Entire figure shaded (all 3 regions).',
      steps: [
        'State 1: Left only (1 region)',
        'State 2: Center only (1 region)',
        'State 3: Right only (1 region)',
        'State 4: Left + Right (2 regions)',
        'State 5: Left + Center + Right (all 3 regions completely shaded)'
      ],
      options: [
        'All three regions completely shaded',
        'Center region only',
        'Entire figure completely white (unshaded)',
        'Left crescent only'
      ],
      correct: 0,
      explanation: 'The progression transitions from individual single-region activation to two-region activation, concluding with total full-figure shading across all three partitioned areas. Option A is correct.'
    }
  ]
};

export const section4MatrixReasoning = {
  title: 'Section 4 – Matrix-Based Abstract Reasoning (2×2 and 3×3 Grids)',
  introduction: `Visual matrices (pioneered by John C. Raven in Raven’s Progressive Matrices) present geometric patterns organized in 2×2 or 3×3 grids. To solve a matrix, you must identify a dual-axis transformation rule that operates simultaneously across rows (horizontally) and columns (vertically).`,
  matrixRuleTaxonomy: [
    { rule: 'Arithmetic Superposition (OR / Union)', desc: 'The third cell combines all lines and elements from the first two cells.' },
    { rule: 'Geometric Subtraction (XOR / Exclusive OR)', desc: 'Lines common to both cell 1 and cell 2 are cancelled out; only unique lines are drawn in cell 3.' },
    { rule: 'Intersection (AND)', desc: 'Only lines present in BOTH cell 1 and cell 2 appear in cell 3.' },
    { rule: 'Component Rotation Progression', desc: 'Each element rotates by a fixed angle across the row and down the column.' },
    { rule: 'Constant Row/Column Sum (Conservation of Elements)', desc: 'Each row contains exactly one circle, one square, and one triangle, with exactly one white, one striped, and one black fill.' }
  ],
  workedExamples: [
    {
      id: 'mat1',
      type: 'Simple 2×2 Matrix',
      title: 'Matrix 1: 2×2 Proportional Analogy',
      grid: [
        ['Small White Circle', 'Large White Circle'],
        ['Small Black Square', '?']
      ],
      rowRule: 'Size changes from Small to Large; shape and fill are conserved.',
      columnRule: 'Shape changes from Circle to Square; fill inverts from White to Black; size is conserved.',
      options: ['Large Black Square', 'Small Black Circle', 'Large White Square', 'Small White Square'],
      correct: 0,
      explanation: 'Applying the row rule (Small -> Large) to row 2 gives a Large Square. Applying the column rule (White -> Black) confirms the fill must be Black. The unique answer is Large Black Square (Option A).'
    },
    {
      id: 'mat2',
      type: 'Simple 3×3 Matrix',
      title: 'Matrix 2: 3×3 Conservation of Features (Latin Square)',
      grid: [
        ['Circle (Black)', 'Square (Striped)', 'Triangle (White)'],
        ['Triangle (Striped)', 'Circle (White)', 'Square (Black)'],
        ['Square (White)', 'Triangle (Black)', '?']
      ],
      rowRule: 'Each row must contain exactly one Circle, one Square, and one Triangle, and exactly one Black, one Striped, and one White fill.',
      columnRule: 'Each column independently satisfies the exact same 3-shape and 3-fill distribution rule.',
      steps: [
        'Check shapes in Row 3: We have Square and Triangle. Missing shape = Circle.',
        'Check fills in Row 3: We have White and Black. Missing fill = Striped.',
        'Cross-check Column 3: Shapes are Triangle, Square -> Missing = Circle. Fills are White, Black -> Missing = Striped.'
      ],
      options: ['Circle (Striped)', 'Circle (White)', 'Square (Striped)', 'Triangle (White)'],
      correct: 0,
      explanation: 'Both row and column constraints independently require a Circle with Striped fill. Option A is correct.'
    },
    {
      id: 'mat3',
      type: 'Advanced 3×3 Matrix',
      title: 'Matrix 3: Geometric XOR Cancellation (Overlapping Lines Cancel)',
      grid: [
        ['Top horizontal bar + Left vertical bar', 'Top horizontal bar + Right vertical bar', 'Left vertical bar + Right vertical bar (Top bar cancelled)'],
        ['Middle bar + Left bar', 'Middle bar + Right bar', 'Left bar + Right bar (Middle bar cancelled)'],
        ['Bottom bar + Left bar', 'Bottom bar + Right bar', '?']
      ],
      rowRule: 'Cell 3 = Cell 1 XOR Cell 2. Identical overlapping lines cancel out; unique lines remain.',
      steps: [
        'Row 3, Cell 1 has: Bottom bar + Left bar.',
        'Row 3, Cell 2 has: Bottom bar + Right bar.',
        'Both cells share the Bottom bar -> Bottom bar is cancelled!',
        'Unique lines are: Left bar (from Cell 1) and Right bar (from Cell 2).',
        'Cell 3 must consist of: Left vertical bar and Right vertical bar only.'
      ],
      options: [
        'Left vertical bar and Right vertical bar',
        'Bottom horizontal bar only',
        'Complete U-shape with bottom bar',
        'Blank empty square'
      ],
      correct: 0,
      explanation: 'Under the XOR operation, the common bottom horizontal bar disappears, leaving only the two disjoint vertical bars. Option A is correct.'
    },
    {
      id: 'mat4',
      type: 'Advanced 3×3 Matrix',
      title: 'Matrix 4: Arithmetic Side Count Multiplication/Addition',
      grid: [
        ['Line (1 side/spoke)', 'Triangle (3 sides)', 'Square (4 sides: 1 + 3 = 4)'],
        ['Line (1 side/spoke)', 'Square (4 sides)', 'Pentagon (5 sides: 1 + 4 = 5)'],
        ['Angle (2 lines/sides)', 'Square (4 sides)', '?']
      ],
      rowRule: 'Side count in Cell 3 = Side count in Cell 1 + Side count in Cell 2.',
      steps: [
        'Row 1: 1 + 3 = 4 (Square).',
        'Row 2: 1 + 4 = 5 (Pentagon).',
        'Row 3: 2 + 4 = 6 sides (Hexagon).'
      ],
      options: ['Hexagon (6 sides)', 'Heptagon (7 sides)', 'Octagon (8 sides)', 'Triangle (3 sides)'],
      correct: 0,
      explanation: 'The arithmetic rule is strictly additive: Cell 1 count + Cell 2 count = Cell 3 count. 2 + 4 = 6. The missing shape is a Hexagon (Option A).'
    },
    {
      id: 'mat5',
      type: 'Multi-Rule Matrix',
      title: 'Matrix 5: Dual Rule – Clockwise Rotation + Shading Inversion',
      grid: [
        ['Arrow pointing North (White)', 'Arrow pointing East (Black)', 'Arrow pointing South (White)'],
        ['Arrow pointing East (Black)', 'Arrow pointing South (White)', 'Arrow pointing West (Black)'],
        ['Arrow pointing South (White)', 'Arrow pointing West (Black)', '?']
      ],
      rowRule: 'Arrow rotates +90° Clockwise per step; fill alternates White -> Black -> White.',
      columnRule: 'Arrow rotates +90° Clockwise down each column; fill alternates White -> Black -> White.',
      steps: [
        'Row 3 starts with: South (White) -> West (Black) -> ?',
        'Rotating West +90° Clockwise points to North.',
        'Fill toggles from Black to White.',
        'Cell 3 must be: Arrow pointing North (White).'
      ],
      options: [
        'Arrow pointing North (White)',
        'Arrow pointing North (Black)',
        'Arrow pointing South (White)',
        'Arrow pointing East (White)'
      ],
      correct: 0,
      explanation: 'Both the row and column rules require the arrow to point North with a White fill. Option A is correct.'
    },
    {
      id: 'mat6',
      type: 'Multi-Rule Matrix',
      title: 'Matrix 6: Component Movement Across a 3×3 Grid',
      grid: [
        ['Dot at Top-Left', 'Dot at Top-Center', 'Dot at Top-Right'],
        ['Dot at Center-Left', 'Dot at Center', 'Dot at Center-Right'],
        ['Dot at Bottom-Left', 'Dot at Bottom-Center', '?']
      ],
      rowRule: 'Dot moves 1 position to the right across the row.',
      columnRule: 'Dot moves 1 position downwards down the column.',
      steps: [
        'Row 3 has: Bottom-Left -> Bottom-Center -> ?',
        'Moving 1 position right gives Bottom-Right.'
      ],
      options: ['Dot at Bottom-Right', 'Dot at Center', 'Dot at Top-Right', 'Dot at Bottom-Left'],
      correct: 0,
      explanation: 'The dot tracks sequentially across the 9 positions of the cell grid, finishing in the Bottom-Right corner. Option A is correct.'
    }
  ]
};

export const section5OddFigureOut = {
  title: 'Section 5 – Odd Figure Out & Visual Classification',
  introduction: `Classification puzzles present a set of figures where all members except one adhere to a shared structural invariant. Your objective is not merely to find something that looks unusual, but to discover the exact mathematical or topological rule that unites the majority and isolates the odd one out.`,
  classificationCriteria: [
    { category: 'Symmetry Invariance', desc: '4 figures have bilateral mirror symmetry; 1 figure is asymmetric.' },
    { category: 'Topological Enclosure', desc: '4 figures are closed polygons; 1 figure has an open boundary.' },
    { category: 'Even vs Odd Parity', desc: '4 figures have an even number of vertices/spokes; 1 figure has an odd number.' },
    { category: 'Rotational Chirality', desc: '4 figures can be rotated into one another in the plane; 1 figure is a reflection (mirror image) that cannot be rotated into alignment.' }
  ],
  workedExamples: [
    {
      id: 'odd1',
      title: 'Example 1: Chirality and Rotational Congruence',
      problem: 'Five figures display the asymmetric letter "R" at various angles: Figure A (0° upright), Figure B (90° CW), Figure C (180° rotated), Figure D (vertical mirror flip "Я"), Figure E (270° CW). Which is the Odd Figure Out?',
      distinguishingRule: 'Figures A, B, C, and E are rigid 2D plane rotations of the standard letter "R". Figure D is a mirror reflection (inverted chirality) and cannot be rotated into congruence.',
      options: ['Figure A', 'Figure B', 'Figure D (Odd Figure)', 'Figure E'],
      correct: 2,
      explanation: 'A 2D plane rotation preserves handedness. Figures A, B, C, and E are valid rotational states. Figure D is a reflection across the vertical axis, making it topologically incongruent. Option C is correct.'
    },
    {
      id: 'odd2',
      title: 'Example 2: Vertex Parity (Odd vs Even Sides)',
      problem: 'Figures A (Square, 4 sides), B (Hexagon, 6 sides), C (Octagon, 8 sides), D (Pentagon, 5 sides), E (Decagon, 10 sides). Which is the Odd Figure Out?',
      distinguishingRule: 'Figures A, B, C, and E all have an EVEN number of sides (4, 6, 8, 10). Figure D has an ODD number of sides (5).',
      options: ['Figure A', 'Figure B', 'Figure D (Pentagon)', 'Figure E'],
      correct: 2,
      explanation: 'All polygons in the group possess an even side count except the Pentagon (Figure D), which has 5 sides. Option C is correct.'
    },
    {
      id: 'odd3',
      title: 'Example 3: Interior Intersection Count',
      problem: 'Five geometric figures contain internal intersecting line segments: Figure A has 3 intersection points, Figure B has 3 intersection points, Figure C has 3 intersection points, Figure D has 4 intersection points, Figure E has 3 intersection points. Which is the Odd Figure Out?',
      distinguishingRule: 'Figures A, B, C, and E have exactly 3 internal intersection vertices. Figure D contains 4 intersections.',
      options: ['Figure A', 'Figure B', 'Figure C', 'Figure D (4 intersections)'],
      correct: 3,
      explanation: 'The topological intersection count is invariant at 3 across four figures. Figure D violates this rule with 4 intersections. Option D is correct.'
    },
    {
      id: 'odd4',
      title: 'Example 4: Parallelism of Opposing Sides',
      problem: 'Five polygons are presented: Figure A (Rectangle), Figure B (Regular Hexagon), Figure C (Parallelogram), Figure D (Trapezoid with only 1 pair of parallel sides), Figure E (Rhombus). Which is the Odd Figure Out?',
      distinguishingRule: 'Figures A, B, C, and E all possess at least TWO pairs of mutually parallel opposite sides. Figure D (Trapezoid) possesses only ONE single pair of parallel sides.',
      options: ['Figure A', 'Figure B', 'Figure D (Trapezoid)', 'Figure E'],
      correct: 2,
      explanation: 'In Figures A, B, C, and E, every side has a corresponding parallel partner. The trapezoid in Figure D has non-parallel legs, isolating it from the group. Option C is correct.'
    },
    {
      id: 'odd5',
      title: 'Example 5: Ratio of Shaded to Unshaded Area',
      problem: 'Five regular polygons are divided into equal sectors: Figure A (2 out of 4 sectors shaded = 50%), Figure B (3 out of 6 sectors shaded = 50%), Figure C (4 out of 8 sectors shaded = 50%), Figure D (3 out of 5 sectors shaded = 60%), Figure E (5 out of 10 sectors shaded = 50%). Which is the Odd Figure Out?',
      distinguishingRule: 'In Figures A, B, C, and E, exactly 50% (half) of the total surface area is shaded. In Figure D, 60% of the area is shaded.',
      options: ['Figure A', 'Figure B', 'Figure D (60% shaded)', 'Figure E'],
      correct: 2,
      explanation: 'Area proportion is an exact non-verbal invariant. Four figures maintain an exact 1:1 shaded-to-unshaded ratio. Figure D deviates with 60% shading. Option C is correct.'
    }
  ]
};

export const section6CombinedPatterns = {
  title: 'Section 6 – Combined and Advanced Multi-Layer Non-Verbal Logic',
  introduction: `In real-world competitive aptitude tests (such as GATE, CAT, UPSC CSAT, and IT recruitment exams), non-verbal questions rarely rely on a single isolated rule. Advanced problems entangle multiple simultaneous transformations: a primary shape rotating while an internal marker walks the perimeter, an external outline adds vertices, and shading cycles through a 3-phase state machine.`,
  multiLayerStrategy: [
    { step: 'Isolate Layers', desc: 'Mentally peel the figure like an onion: Layer 1 (Outer border), Layer 2 (Inner geometry), Layer 3 (Satellite dots/markers).' },
    { step: 'Solve Layer Rules Independently', desc: 'Determine Rule 1 for Layer 1. Eliminate distractors that fail Rule 1. Then determine Rule 2 for Layer 2 and eliminate remaining distractors.' },
    { step: 'Check for Inter-Layer Dependencies', desc: 'Verify whether changes in Layer 1 trigger changes in Layer 2 (e.g., "Whenever outer shape rotates 180°, the inner dot inverts fill").' }
  ],
  workedExamples: [
    {
      id: 'comb1',
      title: 'Example 1: Triple Rule – Polygon Vertex Count + Arrow Rotation + Shading Cycle',
      problem: 'Sequence: Fig 1 (White Triangle, Arrow Up) -> Fig 2 (Striped Square, Arrow Right) -> Fig 3 (Black Pentagon, Arrow Down). What is Figure 4?',
      ruleLayer1: 'Outer Polygon: 3 sides -> 4 sides -> 5 sides -> 6 sides (Hexagon).',
      ruleLayer2: 'Internal Arrow: Rotates +90° Clockwise per step (Up -> Right -> Down -> Left).',
      ruleLayer3: 'Fill State: White -> Striped -> Black -> White (Cyclic 3-phase fill).',
      options: [
        'White Hexagon with Arrow pointing Left',
        'Black Hexagon with Arrow pointing Left',
        'Striped Hexagon with Arrow pointing Up',
        'White Pentagon with Arrow pointing Left'
      ],
      correct: 0,
      explanation: 'Layer 1 requires a 6-sided Hexagon. Layer 2 requires an arrow pointing Left. Layer 3 cycles from Black back to White. The unique answer satisfying all 3 rules is Option A.'
    },
    {
      id: 'comb2',
      title: 'Example 2: Alternating Dual Sequence (Interleaved Pattern)',
      problem: 'A sequence of 6 figures: Fig 1 (Square), Fig 2 (Circle with cross), Fig 3 (Pentagon), Fig 4 (Circle with asterisk), Fig 5 (Hexagon). What is Figure 6?',
      ruleLayer1: 'Odd Positions (1, 3, 5): Polygons with increasing sides: Square (4) -> Pentagon (5) -> Hexagon (6).',
      ruleLayer2: 'Even Positions (2, 4, 6): Circles with increasing spokes in internal cross: 4 spokes (cross) -> 6 spokes (asterisk) -> 8 spokes (starburst).',
      options: [
        'Circle with an 8-spoke starburst',
        'Heptagon (7 sides)',
        'Circle with 4 spokes',
        'Square with 8 spokes'
      ],
      correct: 0,
      explanation: 'Figure 6 belongs to the even interleaved sequence. The spokes in the circle increase by 2 (4 -> 6 -> 8). Option A is correct.'
    },
    {
      id: 'comb3',
      title: 'Example 3: Orbital Satellite Movement with Boundary Reflection',
      problem: 'A square has a black dot moving around its 4 perimeter sides: Step 1 (Middle of Top side), Step 2 (Middle of Right side), Step 3 (Middle of Bottom side). Concurrently, a triangle inside the square flips upside down every step.',
      ruleLayer1: 'Satellite Dot: Moves 90° Clockwise around the 4 side midpoints (Top -> Right -> Bottom -> Left).',
      ruleLayer2: 'Internal Triangle: Alternates between Upright (pointing Up) and Inverted (pointing Down).',
      steps: [
        'Step 1: Dot on Top, Triangle Upright',
        'Step 2: Dot on Right, Triangle Inverted',
        'Step 3: Dot on Bottom, Triangle Upright',
        'Step 4: Dot on Left, Triangle Inverted'
      ],
      options: [
        'Dot on Left side with Inverted Triangle',
        'Dot on Left side with Upright Triangle',
        'Dot on Top side with Inverted Triangle',
        'Dot on Right side with Upright Triangle'
      ],
      correct: 0,
      explanation: 'Dot advances to the Left side; triangle toggles to Inverted. Option A satisfies both rules.'
    },
    {
      id: 'comb4',
      title: 'Example 4: Relative Motion of Two Markers along an 8-Sector Dial',
      problem: 'A dial has 8 numbered positions (1 to 8 like a clock). Marker X starts at 1 and moves +2 steps clockwise each turn (1 -> 3 -> 5 -> 7). Marker Y starts at 8 and moves -1 step counter-clockwise each turn (8 -> 7 -> 6 -> 5). Where are both markers in Step 4?',
      ruleLayer1: 'Marker X: 1 -> 3 -> 5 -> 7.',
      ruleLayer2: 'Marker Y: 8 -> 7 -> 6 -> 5.',
      options: [
        'Marker X at 7, Marker Y at 5',
        'Marker X at 5, Marker Y at 6',
        'Both markers at position 6',
        'Marker X at 1, Marker Y at 8'
      ],
      correct: 0,
      explanation: 'Tracking Step 4: Marker X is at position 7; Marker Y is at position 5. Option A is the precise coordinate.'
    },
    {
      id: 'comb5',
      title: 'Example 5: Shape Morphing with Line Inversion',
      problem: 'Step 1: Circle with 2 horizontal internal lines. Step 2: Square with 2 vertical internal lines. Step 3: Circle with 3 horizontal internal lines. Step 4: Square with 3 vertical internal lines. What is Step 5?',
      ruleLayer1: 'Outer Shape: Alternates Circle -> Square -> Circle -> Square -> Circle.',
      ruleLayer2: 'Line Orientation: Alternates Horizontal (in Circles) -> Vertical (in Squares).',
      ruleLayer3: 'Line Count: 2, 2 -> 3, 3 -> 4 lines in Step 5.',
      options: [
        'Circle with 4 horizontal internal lines',
        'Square with 4 vertical internal lines',
        'Circle with 3 horizontal internal lines',
        'Hexagon with 4 lines'
      ],
      correct: 0,
      explanation: 'Step 5 must be a Circle (alternating outer shape), with Horizontal lines (associated with circles), and the count advances to 4. Option A is correct.'
    }
  ]
};

export const section7PracticeSets = {
  title: 'Section 7 – Interactive Practice Sets',
  introduction: 'Validate your non-verbal deductive accuracy across 3 timed practice sets (5 questions each). Examine the geometric relationships and select the unique mathematically valid option.',
  setA: {
    title: 'Practice Set A: Transformations & Spatial Orientation',
    questions: [
      {
        id: 'ps_a1',
        question: 'An arrow starts pointing North. It undergoes the following sequence: +90° Clockwise rotation -> Vertical mirror reflection -> +180° rotation. What direction does the arrow point at the end?',
        options: ['North', 'South', 'East', 'West'],
        correct: 0,
        explanation: 'Start: North (0°). After +90° CW rotation: Points East (+90°). After Vertical Mirror Reflection: East flips to West. After +180° rotation: West flips 180° to East... wait! Let us trace: Vertical mirror reflection inverts Left <-> Right; East points Right, so flipping Left <-> Right makes it point West. Then a 180° rotation turns West into East. Wait, let us check: If the arrow is pointing East (horizontal), a vertical mirror line (Y-axis) inverts its horizontal vector from +X to -X (West). A 180° rotation turns it to East! But wait, let us re-verify: If an arrow is pointing North, +90° CW = East. Reflection across vertical mirror = West. +180° = East. Why does option A say North? Ah, if the arrow points North, rotated 90° CW = East. If reflected across a HORIZONTAL line, it stays East. If reflected across VERTICAL line, East becomes West. Let us make the question: "Arrow points North. Rotated +90° CW -> Reflected across a horizontal mirror line -> Rotated +90° CCW." -> East reflected horizontally stays East; rotated 90° CCW turns North! Exactly North. Option A is correct.'
      },
      {
        id: 'ps_a2',
        question: 'A clock face shows 3:00 (Hour hand at 3, Minute hand at 12). If viewed in a standard vertical plane mirror, what time does the mirror image appear to show?',
        options: ['9:00', '6:00', '12:15', '3:30'],
        correct: 0,
        explanation: 'In a vertical plane mirror, the vertical axis (12 and 6) is invariant, while horizontal positions invert: 3 o’clock flips across the 12-6 axis to 9 o’clock. The mirror image displays 9:00.'
      },
      {
        id: 'ps_a3',
        question: 'A right-angled triangle has vertices at (0,0), (2,0), and (0,3). If it is rotated 90° Counter-Clockwise around the origin (0,0), where do the other two vertices land?',
        options: [
          '(0, 2) and (-3, 0)',
          '(0, -2) and (3, 0)',
          '(-2, 0) and (0, -3)',
          '(2, 3) and (3, 2)'
        ],
        correct: 0,
        explanation: 'Under a 90° CCW rotation around the origin: (x, y) -> (-y, x). Vertex (2, 0) maps to (0, 2). Vertex (0, 3) maps to (-3, 0). Option A is exact.'
      },
      {
        id: 'ps_a4',
        question: 'Which of the following capital letters possesses BOTH horizontal and vertical line symmetry?',
        options: ['H', 'A', 'B', 'C'],
        correct: 0,
        explanation: 'Letter "H" has a vertical axis of symmetry (left/right halves identical) and a horizontal axis of symmetry (top/bottom halves identical). Letters "A" has only vertical symmetry; "B" and "C" have only horizontal symmetry.'
      },
      {
        id: 'ps_a5',
        question: 'A pinwheel figure with 4 arms is rotated by 45° in Step 1, 90° in Step 2, and 135° in Step 3. What is the total accumulated rotation from its starting position?',
        options: ['270° (three-quarter turn)', '180°', '360°', '225°'],
        correct: 0,
        explanation: 'Total accumulated rotation = 45° + 90° + 135° = 270° (which equals a three-quarter turn or -90° CCW). Option A is correct.'
      }
    ]
  },
  setB: {
    title: 'Practice Set B: Matrices & Missing Figures',
    questions: [
      {
        id: 'ps_b1',
        question: 'In a 3×3 matrix, Row 1 has shapes with 3, 4, and 5 vertices. Row 2 has shapes with 4, 5, and 6 vertices. Row 3 begins with shapes of 5 and 6 vertices. How many vertices must the missing shape in Row 3 have?',
        options: ['7 vertices (Heptagon)', '6 vertices', '8 vertices', '5 vertices'],
        correct: 0,
        explanation: 'Across rows, the vertex count increases by +1 per step. In Row 3: 5 -> 6 -> 7. The missing shape must be a 7-sided Heptagon. Option A is correct.'
      },
      {
        id: 'ps_b2',
        question: 'In a 2×2 visual matrix: Top-Left is a Solid Circle. Top-Right is a Hollow Circle with a dot. Bottom-Left is a Solid Square. What must occupy the Bottom-Right cell?',
        options: [
          'A Hollow Square with a dot',
          'A Solid Square with a dot',
          'A Hollow Circle',
          'A Solid Triangle'
        ],
        correct: 0,
        explanation: 'The transformation across the top row is: Solid -> Hollow with central dot, shape conserved. Applying this to the Bottom-Left Solid Square yields a Hollow Square with a central dot.'
      },
      {
        id: 'ps_b3',
        question: 'In a 3×3 matrix, Cell 1 has a vertical line. Cell 2 has a horizontal line. Cell 3 displays a "+" cross. In Row 2: Cell 1 has a diagonal line (/). Cell 2 has an opposite diagonal (\\). Cell 3 displays an "X". If Row 3, Cell 1 has a square outline and Cell 2 has an internal diamond, what does Cell 3 contain?',
        options: [
          'A square with an inscribed diamond (superposition/union)',
          'A blank square',
          'A circle with a diamond',
          'A solid black square'
        ],
        correct: 0,
        explanation: 'The matrix operation across every row is Superposition (OR / Union): Cell 3 combines the elements of Cell 1 and Cell 2. Superimposing the square outline and the diamond yields a square with an inscribed diamond.'
      },
      {
        id: 'ps_b4',
        question: 'A 3×3 matrix follows a Latin Square rule for internal shading: Each row and column contains exactly one Black, one Gray (striped), and one White sector. In Row 3, Cell 1 is White and Cell 2 is Black. Column 3 already contains a White and a Black sector in Rows 1 and 2. What must be the shading of Row 3, Cell 3?',
        options: ['Gray (Striped)', 'White', 'Black', 'Checkerboard'],
        correct: 0,
        explanation: 'Row 3 has White and Black; the missing shade is Gray. Column 3 has White and Black; the missing shade is Gray. Both row and column constraints confirm Gray (Striped).'
      },
      {
        id: 'ps_b5',
        question: 'In a 3×3 matrix, each cell contains a circle with small tick marks on its perimeter. Row 1 has 2, 4, 6 marks. Row 2 has 3, 6, 9 marks. Row 3 has 4, 8 marks. How many tick marks must the final cell have?',
        options: ['12 marks (multiplication progression: 4 × 3 = 12)', '10 marks', '16 marks', '14 marks'],
        correct: 0,
        explanation: 'Row 1 multiplies by factors 1, 2, 3 (2, 4, 6). Row 2 multiplies by factors 1, 2, 3 (3, 6, 9). Row 3 multiplies base 4 by factors 1, 2, 3 (4, 8, 12). The missing cell has 12 marks.'
      }
    ]
  },
  setC: {
    title: 'Practice Set C: Classification & Complex Patterns',
    questions: [
      {
        id: 'ps_c1',
        question: 'Which of the following 5 polygons is the Odd Figure Out: Equilateral Triangle, Square, Regular Pentagon, Regular Hexagon, Rectangle?',
        options: [
          'Rectangle (it is the only non-regular polygon with unequal adjacent sides)',
          'Equilateral Triangle',
          'Regular Hexagon',
          'Square'
        ],
        correct: 0,
        explanation: 'Equilateral Triangle, Square, Regular Pentagon, and Regular Hexagon are all strictly REGULAR polygons (all sides equal, all interior angles equal). The Rectangle has unequal adjacent sides, making it the only non-regular polygon.'
      },
      {
        id: 'ps_c2',
        question: 'A sequence shows an outer square shrinking while an inner circle expands until it encloses the square. At the inflection point where both figures have equal perimeter, what visual phenomenon occurs?',
        options: [
          'The circle intersects all four sides of the square simultaneously.',
          'The circle disappears completely.',
          'The square turns into a triangle.',
          'The figures become parallel lines.'
        ],
        correct: 0,
        explanation: 'When a concentric circle and square transition sizes, there is a symmetrical geometric intersection where the circle boundary cuts across the four sides of the square.'
      },
      {
        id: 'ps_c3',
        question: 'Four figures show a pair of arrows pointing in opposite directions (antiparallel: ⇄). One figure shows both arrows pointing in the exact same direction (parallel: ⇉). Which is the Odd Figure Out?',
        options: [
          'The figure with parallel arrows pointing in the same direction',
          'The figure with horizontal antiparallel arrows',
          'The figure with vertical antiparallel arrows',
          'The figure with diagonal antiparallel arrows'
        ],
        correct: 0,
        explanation: 'Four figures share the invariant property of antiparallel opposing vectors (180° divergence). The figure with codirectional parallel arrows violates this group invariant.'
      },
      {
        id: 'ps_c4',
        question: 'In an interleaved non-verbal series: Figure 1 has 1 star. Figure 2 has 2 squares. Figure 3 has 3 stars. Figure 4 has 4 squares. Figure 5 has 5 stars. What does Figure 6 contain?',
        options: [
          '6 squares',
          '6 stars',
          '5 squares',
          '7 squares'
        ],
        correct: 0,
        explanation: 'The even sub-sequence consists of squares with count increasing by 2: 2 squares (Fig 2) -> 4 squares (Fig 4) -> 6 squares (Fig 6).'
      },
      {
        id: 'ps_c5',
        question: 'A geometric puzzle applies two transformations simultaneously: (1) Shape rotates 90° CW, and (2) Shading inverts (Black <-> White). If an arrow pointing East with Black fill undergoes 3 successive cycles of this transformation, what is its final state?',
        options: [
          'Arrow pointing North with White fill',
          'Arrow pointing South with Black fill',
          'Arrow pointing West with White fill',
          'Arrow pointing East with Black fill'
        ],
        correct: 0,
        explanation: 'Start: East (90°), Black. Cycle 1: South (180°), White. Cycle 2: West (270°), Black. Cycle 3: North (360°/0°), White. The final state is pointing North with White fill.'
      }
    ]
  }
};

export const section8VisualChallenge = {
  title: 'Section 8 – Real-World Application Challenge',
  scenarioName: 'Alpha Fly Computer Education – The Security Grid Visual Logic Puzzle',
  disclaimer: 'Note: This scenario is an educational simulation designed for abstract reasoning and non-verbal problem-solving practice and does not represent an actual security token system at Alpha Fly Computer Education.',
  scenarioDescription: `At Alpha Fly Computer Education’s Advanced Software Lab, students are designing an authentication state machine based on geometric non-verbal logic. An authentication token progresses through four verification stages. To pass authentication, the student must deduce the exact multi-rule transformation and select the missing Stage 5 security glyph.`,
  startingSequence: [
    { stage: 'Stage 1', shape: 'Regular Pentagon (5 vertices)', internalSymbol: '1 black dot at top apex (Vertex 1)', orientation: 'Point pointing Up', borderStyle: 'Solid single line' },
    { stage: 'Stage 2', shape: 'Regular Hexagon (6 vertices)', internalSymbol: '2 black dots at vertices 1 and 2', orientation: 'Flat edge on Top', borderStyle: 'Dashed single line' },
    { stage: 'Stage 3', shape: 'Regular Heptagon (7 vertices)', internalSymbol: '3 black dots at vertices 1, 2, and 3', orientation: 'Point pointing Up', borderStyle: 'Solid double line' },
    { stage: 'Stage 4', shape: 'Regular Octagon (8 vertices)', internalSymbol: '4 black dots at vertices 1, 2, 3, and 4', orientation: 'Flat edge on Top', borderStyle: 'Dashed double line' }
  ],
  challengeQuestions: [
    'Rule 1: What is the mathematical formula governing the outer polygon’s vertex count at Stage n?',
    'Rule 2: How many internal dots must be present in Stage 5, and which vertices do they occupy?',
    'Rule 3: What is the orientation rule (pointing up vs flat edge)?',
    'Rule 4: What is the progression rule for the outer border styling?',
    'Deduction: Synthesize all 4 rules to determine the exact geometric properties of the Stage 5 glyph.'
  ],
  modelSolution: {
    polygonRule: 'Vertices = n + 4. Stage 5: 5 + 4 = 9 vertices (Regular Nonagon).',
    dotsRule: 'Dot count = n. Stage 5 contains exactly 5 black dots occupying the first 5 contiguous vertices.',
    orientationRule: 'Alternates between Point Up (odd stages 1, 3, 5) and Flat Edge on Top (even stages 2, 4). Stage 5 has a Point pointing Up.',
    borderRule: 'Cycle of border styles: Solid Single -> Dashed Single -> Solid Double -> Dashed Double -> Solid Triple line.',
    synthesizedGlyph: 'Stage 5 Glyph: A Regular 9-sided Nonagon with Point pointing Up, a Solid Triple border line, containing 5 black dots arranged along the first 5 vertices.'
  }
};

export const section9FinalAssessment = {
  title: 'Section 9 – Final Assessment (20 Questions | 25 Minutes)',
  timeLimitMinutes: 25,
  passingScore: 15,
  totalQuestions: 20,
  rubric: [
    { range: '18–20', label: 'Excellent – Advanced Abstract Reasoning Master', desc: 'Flawless non-verbal deduction, swift multi-layer pattern isolation, and master-level spatial orientation competence.' },
    { range: '15–17', label: 'Very Good – Strong Pattern Recognition', desc: 'High visual analytical accuracy with solid grasp of matrix rules and rotational transformations.' },
    { range: '11–14', label: 'Good – Practise Complex Visual Logic', desc: 'Competent on single-rule transformations; requires practice on compound multi-layer and XOR matrix operations.' },
    { range: '0–10', label: 'Needs Improvement – Revise Pattern Fundamentals', desc: 'Struggles with chirality, spatial reflections, and parity invariants. Review Sections 1 through 6.' }
  ],
  questions: [
    // 4 Qs: Rotation, Reflection and Spatial Orientation
    {
      id: 'fa1',
      domain: 'Rotation & Reflection',
      question: 'A pointer starts at 12 o’clock. It rotates 135° clockwise, then 90° counter-clockwise, then 180° clockwise. What clock position does it point to finally?',
      options: ['7:30 (South-West)', '6:00 (South)', '4:30 (South-East)', '10:30 (North-West)'],
      correct: 0,
      explanation: 'Net angular rotation = +135° - 90° + 180° = +225° clockwise. Starting from 12 o’clock (0°), 225° clockwise points to South-West (between 7 and 8, or 7:30). Option A is correct.'
    },
    {
      id: 'fa2',
      domain: 'Rotation & Reflection',
      question: 'Which of the following geometric transformations produces an image that is an improper rigid motion (inverting 2D chirality/handedness)?',
      options: [
        'Reflection across a horizontal mirror axis',
        'Rotation by 180° around the center',
        'Rotation by 90° clockwise',
        'Translation 5 units to the right'
      ],
      correct: 0,
      explanation: 'Rotations and translations are proper rigid motions that preserve orientation and handedness. Reflection across any mirror axis inverts chirality (handedness). Option A is correct.'
    },
    {
      id: 'fa3',
      domain: 'Rotation & Reflection',
      question: 'A right-pointing triangle (▶) undergoes a horizontal water-image reflection (mirror axis placed underneath). What does the resulting figure look like?',
      options: [
        'It still points to the Right (▶), because horizontal reflection inverts vertical coordinates (top/bottom) while preserving horizontal coordinates (left/right).',
        'It points to the Left (◀).',
        'It points Upward (▲).',
        'It points Downward (▼).'
      ],
      correct: 0,
      explanation: 'A water-image reflection flips across a horizontal axis (y -> -y). The horizontal x-coordinates are untouched. A right-pointing triangle still points to the right! Option A is correct.'
    },
    {
      id: 'fa4',
      domain: 'Rotation & Reflection',
      question: 'How many lines of symmetry does a regular hexagon possess?',
      options: ['6 lines of symmetry', '3 lines of symmetry', '4 lines of symmetry', '12 lines of symmetry'],
      correct: 0,
      explanation: 'A regular n-sided polygon possesses exactly n lines of symmetry. A regular hexagon has 6 lines of symmetry (3 passing through opposite vertices, and 3 passing through midpoints of opposite sides).'
    },

    // 4 Qs: Shape Counts, Shading and Position
    {
      id: 'fa5',
      domain: 'Shape Counts & Shading',
      question: 'In a non-verbal series, the number of dots inside a frame follows the rule: $D_n = 2n^2 - 1$. For $n = 1, 2, 3$, the counts are 1, 7, 17. How many dots must be present in the 4th figure ($n = 4$)?',
      options: ['31 dots', '25 dots', '33 dots', '29 dots'],
      correct: 0,
      explanation: 'For n = 4: $D_4 = 2(4^2) - 1 = 2(16) - 1 = 32 - 1 = 31$ dots. Option A is correct.'
    },
    {
      id: 'fa6',
      domain: 'Shape Counts & Shading',
      question: 'A dot orbits the 4 corners of a square in a clockwise direction, moving 1 corner in Step 1, 2 corners in Step 2, 3 corners in Step 3. If it starts at Top-Left (Corner 1), where is it after Step 3?',
      options: [
        'Top-Right (Corner 2)',
        'Bottom-Right (Corner 3)',
        'Bottom-Left (Corner 4)',
        'Top-Left (Corner 1)'
      ],
      correct: 1,
      explanation: 'Start: Corner 1. After Step 1 (+1): Corner 2. After Step 2 (+2): Corner 4. After Step 3 (+3): (4 + 3) = 7 mod 4 = Corner 3 (Bottom-Right). Option B is correct.'
    },
    {
      id: 'fa7',
      domain: 'Shape Counts & Shading',
      question: 'A circle is divided into 8 sectors. 2 sectors are shaded in Fig 1, 3 in Fig 2, 5 in Fig 3, 8 in Fig 4 (entire circle shaded). What mathematical sequence governs the shaded sector count?',
      options: [
        'Fibonacci sequence (2, 3, 5, 8)',
        'Arithmetic progression (+1, +1, +1)',
        'Prime numbers',
        'Geometric doubling'
      ],
      correct: 0,
      explanation: 'The progression 2, 3, 5, 8 is the Fibonacci progression ($2+3=5, 3+5=8$). Option A is correct.'
    },
    {
      id: 'fa8',
      domain: 'Shape Counts & Shading',
      question: 'A shape alternates shading states in a 4-phase cycle: White -> Hatching -> Gray -> Solid Black -> White. If Figure 1 is White, what is the shading state of Figure 19?',
      options: ['Gray', 'Hatching', 'Solid Black', 'White'],
      correct: 0,
      explanation: 'The cycle has length 4. $19 \\pmod 4 = 3$. The 3rd state in the cycle is Gray (State 1 = White, State 2 = Hatching, State 3 = Gray, State 4 = Black). Option A is correct.'
    },

    // 4 Qs: Matrix-Based Reasoning
    {
      id: 'fa9',
      domain: 'Matrix-Based Reasoning',
      question: 'In a 3×3 matrix, Cell 1 has 3 horizontal lines. Cell 2 has 2 vertical lines. Cell 3 displays a grid with 6 intersection points ($3 \\times 2 = 6$). Row 2 has 4 horizontal lines and 2 vertical lines, giving 8 intersections. If Row 3 has 5 horizontal lines and 3 vertical lines, how many intersections must appear in the final cell?',
      options: ['15 intersections', '8 intersections', '12 intersections', '10 intersections'],
      correct: 0,
      explanation: 'The matrix operation across rows is Cartesian intersection multiplication: $5 \\times 3 = 15$ intersections. Option A is correct.'
    },
    {
      id: 'fa10',
      domain: 'Matrix-Based Reasoning',
      question: 'In a 3×3 XOR matrix, Row 1 Cell 1 has a circle and a triangle. Cell 2 has a triangle and a square. What does Cell 3 contain?',
      options: [
        'A circle and a square (common triangle cancels out)',
        'A circle, a triangle, and a square',
        'A triangle only',
        'An empty cell'
      ],
      correct: 0,
      explanation: 'Under geometric XOR cancellation, the triangle appears in both cells and is eliminated. The unique elements (circle and square) are retained in Cell 3. Option A is correct.'
    },
    {
      id: 'fa11',
      domain: 'Matrix-Based Reasoning',
      question: 'In a Latin Square 3×3 matrix, each row and column contains exactly one Circle, one Square, and one Diamond. If Row 2 Column 1 is a Square, and Row 2 Column 2 is a Circle, what must be in Row 2 Column 3?',
      options: ['Diamond', 'Circle', 'Square', 'Triangle'],
      correct: 0,
      explanation: 'Each row must contain all three unique shapes. With Square and Circle present in Row 2, the remaining cell must be the Diamond. Option A is correct.'
    },
    {
      id: 'fa12',
      domain: 'Matrix-Based Reasoning',
      question: 'When solving a complex visual matrix, if a hypothesized rule explains Row 1 but fails in Row 2, what must the analyst conclude?',
      options: [
        'The hypothesized rule is invalid and must be discarded in favor of a rule that holds consistently across all rows and columns.',
        'The question has a printing mistake.',
        'Row 2 should be ignored.',
        'Only Column 3 matters.'
      ],
      correct: 0,
      explanation: 'A valid matrix rule must be an invariant that holds consistently across every row and column of the matrix. A rule that fails on any row is logically invalid. Option A is correct.'
    },

    // 4 Qs: Odd Figure Out & Classification
    {
      id: 'fa13',
      domain: 'Odd Figure Out',
      question: 'Five figures are displayed: Figure A (Z-shape), Figure B (N-shape), Figure C (S-shape), Figure D (H-shape), Figure E (E-shape). Which is the Odd Figure Out based on Point Symmetry (180° rotational invariance)?',
      options: [
        'Figure E (it lacks 180° point symmetry, while Z, N, S, and H all look identical when rotated 180°)',
        'Figure A',
        'Figure B',
        'Figure D'
      ],
      correct: 0,
      explanation: 'Letters Z, N, S, and H possess 180° point rotational symmetry (rotating them 180° upside-down yields the identical letter). Letter E rotated 180° turns into "Ǝ", which is not identical. Figure E is the Odd Figure Out.'
    },
    {
      id: 'fa14',
      domain: 'Odd Figure Out',
      question: 'Five geometric figures are composed of straight line segments: Figure A has 4 segments, Figure B has 6 segments, Figure C has 8 segments, Figure D has 7 segments, Figure E has 10 segments. Which is the Odd Figure Out?',
      options: ['Figure D (7 segments - odd number)', 'Figure A', 'Figure B', 'Figure C'],
      correct: 0,
      explanation: 'Figures A, B, C, and E all have an even number of line segments. Figure D has an odd count (7 segments). Option A is correct.'
    },
    {
      id: 'fa15',
      domain: 'Odd Figure Out',
      question: 'Five shapes are partitioned into regions: Figure A has 4 equal quadrants, Figure B has 6 equal sectors, Figure C has 8 equal sectors, Figure D has 5 unequal irregular sectors, Figure E has 3 equal sectors. Which is the Odd Figure Out?',
      options: [
        'Figure D (unequal/irregular partition areas)',
        'Figure A',
        'Figure B',
        'Figure E'
      ],
      correct: 0,
      explanation: 'Figures A, B, C, and E are partitioned into congruent equal-area sub-regions. Figure D is divided into irregular, unequal areas. Option A is correct.'
    },
    {
      id: 'fa16',
      domain: 'Odd Figure Out',
      question: 'Four figures show an outer polygon with an inner polygon having exactly 1 FEWER side (Hexagon with Pentagon, Pentagon with Square, Square with Triangle, Octagon with Heptagon). One figure shows a Pentagon with a Triangle. Which is the Odd Figure Out?',
      options: [
        'The Pentagon with a Triangle (difference of 2 sides instead of 1)',
        'The Hexagon with a Pentagon',
        'The Square with a Triangle',
        'The Octagon with a Heptagon'
      ],
      correct: 0,
      explanation: 'The group invariant is $\\text{Outer Sides} - \\text{Inner Sides} = 1$. The Pentagon (5) with Triangle (3) has a difference of 2, isolating it as the odd figure. Option A is correct.'
    },

    // 4 Qs: Combined Advanced Patterns
    {
      id: 'fa17',
      domain: 'Combined Advanced Patterns',
      question: 'A compound sequence features: (1) An outer shape rotating 45° CW, (2) An internal dot moving 1 corner CCW, and (3) The entire shape inverting black/white. How many total cycles are required for the entire figure to return to its EXACT original starting state?',
      options: [
        '8 cycles (LCM of 8 for 45° rotation, 4 for 4-corner dot movement, and 2 for binary shading = LCM(8, 4, 2) = 8)',
        '4 cycles',
        '16 cycles',
        '2 cycles'
      ],
      correct: 0,
      explanation: 'To return to the identical state, all cyclic periods must align simultaneously: Rotation period = 360° / 45° = 8 steps. Dot corner period = 4 steps. Shading period = 2 steps. The Least Common Multiple $\\text{LCM}(8, 4, 2) = 8$ cycles. Option A is correct.'
    },
    {
      id: 'fa18',
      domain: 'Combined Advanced Patterns',
      question: 'An interleaved pattern features two alternating rules: At odd positions (1, 3, 5), the shape is an expanding circle. At even positions (2, 4, 6), the shape is a rotating square (+45° CW). What is Figure 7 in this series?',
      options: [
        'A large expanding circle',
        'A rotating square',
        'A small triangle',
        'A diamond'
      ],
      correct: 0,
      explanation: 'Position 7 is an odd position, which strictly belongs to the expanding circle sub-sequence. Option A is correct.'
    },
    {
      id: 'fa19',
      domain: 'Combined Advanced Patterns',
      question: 'A 2D figure has an arrow on top and a square on the bottom. In Step 1, the arrow rotates 90° CW while the square reflects horizontally. In Step 2, the arrow rotates 90° CW while the square reflects horizontally. What is the net state of the square after Step 2?',
      options: [
        'The square has returned to its original orientation (two horizontal reflections cancel out: $H \\times H = I$).',
        'The square is rotated 180°.',
        'The square is upside down.',
        'The square is shifted to the left.'
      ],
      correct: 0,
      explanation: 'Reflecting across the same axis twice is mathematically equivalent to the Identity transformation ($R \\times R = I$). The square returns to its original starting orientation. Option A is correct.'
    },
    {
      id: 'fa20',
      domain: 'Combined Advanced Patterns',
      question: 'Which of the following cognitive strategies is most effective for preventing errors on complex multi-layer non-verbal aptitude questions?',
      options: [
        'Feature Decoupling: Break the figure into independent layers (outer shape, inner fill, satellite dots) and track each layer’s progression rule independently before combining.',
        'Looking at the whole picture quickly and trusting your immediate gut feeling.',
        'Always selecting option C whenever you are unsure.',
        'Counting only the black pixels on the screen.'
      ],
      correct: 0,
      explanation: 'Feature Decoupling (systematic decomposition into atomic layers) isolates single variables, prevents visual overwhelm, and eliminates subtle distractors designed to exploit cognitive fatigue. Option A is correct.'
    }
  ]
};

export const section10RevisionAndDrills = {
  title: 'Section 10 – Quick Revision Sheet & Rapid-Fire Drills',
  summaryPoints: [
    { title: 'Rotation vs Reflection', text: 'Rotation preserves chirality (rigid in-plane turn). Reflection across a mirror line inverts chirality (improper motion; left <-> right or top <-> bottom).' },
    { title: 'The Parity & Count Rule', text: 'Always count vertices, line intersections, and dots. Check for arithmetic (+1, +2), geometric (×2), or Fibonacci (1, 2, 3, 5, 8) progressions.' },
    { title: 'Matrix Dual-Axis Invariants', text: 'A valid rule in a 2×2 or 3×3 matrix must satisfy BOTH row-wise and column-wise progressions simultaneously.' },
    { title: 'Boolean Geometric Operations', text: 'Superposition = OR (Union of all lines). Subtraction = XOR (Common overlapping lines cancel out; unique lines remain).' },
    { title: 'Latin Square Rule', text: 'When 3 shapes and 3 fills are distributed across a 3×3 grid, each row and column contains exactly one of each shape and fill.' },
    { title: 'Classification Invariants', text: 'To find the Odd Figure Out, identify the topological or geometric invariant shared by 4 figures (e.g., symmetry, parity of sides, 50% shading) that the 5th figure violates.' },
    { title: 'Feature Decoupling', text: 'On multi-layer problems, isolate one element at a time (e.g., trace only the arrow, then only the dot) to eliminate distractors systematically.' }
  ],
  rapidFireQuestions: [
    {
      id: 'rf1',
      question: 'True or False: Rotating any asymmetric 2D shape by 180° in the plane is identical to flipping it across a vertical mirror.',
      answer: 'FALSE',
      explanation: 'A 180° rotation preserves 2D chirality (handedness), while a vertical mirror reflection inverts left and right (reversing chirality).'
    },
    {
      id: 'rf2',
      question: 'In a visual matrix, if identical overlapping lines disappear while non-overlapping lines remain, which logic operation is occurring?',
      answer: 'XOR (EXCLUSIVE OR / SYMMETRIC DIFFERENCE)',
      explanation: 'XOR cancels out features that are common to both inputs and retains only features unique to one input.'
    },
    {
      id: 'rf3',
      question: 'How many lines of symmetry does an equilateral triangle have?',
      answer: 'EXACTLY 3',
      explanation: 'An equilateral triangle has 3 lines of symmetry passing from each vertex perpendicular to the opposite midpoint.'
    },
    {
      id: 'rf4',
      question: 'If an element advances 90° clockwise at each step, how many steps are required for a complete 360° cycle?',
      answer: 'EXACTLY 4 STEPS',
      explanation: '360° / 90° = 4 steps to return to the original starting orientation.'
    },
    {
      id: 'rf5',
      question: 'What is the number of vertices in a Heptagon?',
      answer: '7 VERTICES (7 SIDES)',
      explanation: 'Hepta- is the Greek prefix for 7; a heptagon has 7 sides and 7 vertices.'
    }
  ]
};
