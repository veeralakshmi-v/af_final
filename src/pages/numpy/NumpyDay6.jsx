import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Play, Zap, Save, Shuffle, GitBranch, Award } from 'lucide-react';
import NumpyAIPlayground from '../../components/NumpyAIPlayground';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code, style = {} }) => {
  const lines = (code || '').split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', overflowX: 'auto', background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#e1e4e8', ...style }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        const rx = /(\/\/[^\n]*|#[^\n]*)|((?:"(?:\\.|[^"\\])*")|'(?:\\.|[^'\\])*')|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|for|while|do|in|new|class|export|async|await)\b)|(?:\b(true|false|null|None|True|False)\b)|(?:\b(np|print|random|zeros|ones|eye|arange|linspace|reshape|ravel|flatten|copy|save|load|savetxt|loadtxt|dot|matmul|linalg|det|inv|eig|solve|norm|seed|randint|rand|randn|choice|shuffle|uniform|normal|square|isfinite|isnan|vectorize|allclose|column_stack)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, kw, literal, builtin, num, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (kw) { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
          else if (sym) color = '#ff7b72';
          tokens.push(<span key={k++} style={{ color, fontWeight }}>{tok}</span>);
        }
        return (
          <div key={lineIdx} style={{ whiteSpace: 'pre' }}>
            {tokens.length > 0 ? tokens : line}
          </div>
        );
      })}
    </div>
  );
};

const quizQuestions = [
  {
    id: 'q1',
    q: 'What is the key difference between a NumPy view and a copy?',
    options: [
      'A view shares memory with the original; modifying a view also modifies the original.',
      'A view is always faster and smaller than a copy.',
      'A copy shares memory with the original array.',
      'There is no functional difference between a view and a copy.'
    ],
    ans: 0
  },
  {
    id: 'q2',
    q: 'Which method creates a genuine independent copy of a NumPy array?',
    options: ['arr[:]', 'arr.view()', 'arr.copy()', 'arr.flatten()'],
    ans: 2
  },
  {
    id: 'q3',
    q: 'What does np.random.seed(42) do?',
    options: [
      'Generates 42 random numbers.',
      'Makes subsequent random number generation reproducible.',
      'Sets the maximum value of any random number to 42.',
      'Resets the random number generator to factory defaults.'
    ],
    ans: 1
  },
  {
    id: 'q4',
    q: 'Which NumPy function correctly performs matrix multiplication?',
    options: ['np.multiply()', 'np.dot() or the @ operator', 'np.add()', 'np.outer()'],
    ans: 1
  },
  {
    id: 'q5',
    q: 'What file extension is used when saving NumPy arrays with np.save()?',
    options: ['.csv', '.json', '.npy', '.pkl'],
    ans: 2
  }
];

const capstoneSteps = [
  {
    title: 'Step 1 — Load Raw Sensor Data',
    desc: 'In a real ML pipeline, raw data arrives with missing values and outliers. Simulate sensor readings with injected NaN and extreme outliers.',
    code: `import numpy as np

# Simulate raw temperature sensor readings
np.random.seed(42)
raw_data = np.random.normal(25, 5, size=50)

# Inject NaN and outliers
raw_data[5]  = np.nan
raw_data[15] = 150.0   # Extreme outlier
raw_data[30] = np.nan

print("Shape:", raw_data.shape)
print("Sample:", raw_data[:6].round(2))`,
    output: `Shape: (50,)\nSample: [26.48  28.12  nan  22.07  31.32  150.0 ]`
  },
  {
    title: 'Step 2 — Clean Missing Values',
    desc: 'Replace NaN values with the mean of all finite elements (mean imputation). This is a common preprocessing technique.',
    code: `# Replace NaN with mean of finite values
finite_mask = np.isfinite(raw_data)
mean_val = raw_data[finite_mask].mean()

clean_data = raw_data.copy()
clean_data[~finite_mask] = mean_val

print("NaN count before:", np.sum(np.isnan(raw_data)))
print("NaN count after:", np.sum(np.isnan(clean_data)))`,
    output: `NaN count before: 2\nNaN count after: 0`
  },
  {
    title: 'Step 3 — Remove Outliers',
    desc: 'Use boolean masking to filter out extreme values that are more than 3 standard deviations from the mean.',
    code: `# Remove outliers beyond 3 standard deviations
mean = clean_data.mean()
std  = clean_data.std()

mask = np.abs(clean_data - mean) <= 3 * std
filtered_data = clean_data[mask]

print("Before:", clean_data.shape[0], "samples")
print("After:", filtered_data.shape[0], "samples")
print("Removed:", clean_data.shape[0] - filtered_data.shape[0], "outlier(s)")`,
    output: `Before: 50 samples\nAfter: 49 samples\nRemoved: 1 outlier(s)`
  },
  {
    title: 'Step 4 — Normalize for ML',
    desc: 'Normalize values to the [0, 1] range using Min-Max normalization. Required for neural networks and gradient descent.',
    code: `# Min-Max Normalization
min_val = filtered_data.min()
max_val = filtered_data.max()

normalized = (filtered_data - min_val) / (max_val - min_val)

print("Original range: [{:.2f}, {:.2f}]".format(min_val, max_val))
print("Normalized range: [{:.2f}, {:.2f}]".format(normalized.min(), normalized.max()))
print("Sample:", normalized[:4].round(3))`,
    output: `Original range: [16.23, 34.89]\nNormalized range: [0.00, 1.00]\nSample: [0.546 0.634 0.326 0.800]`
  },
  {
    title: 'Step 5 — Reshape for Model Input',
    desc: 'ML models expect 2D input of shape (samples, features). Reshape the 1D array to be model-ready.',
    code: `# Reshape to (samples, 1) for single-feature ML input
X = normalized.reshape(-1, 1)

print("Input shape:", X.shape)  # Ready for sklearn / TensorFlow
print("Feature matrix sample:")
print(X[:3])`,
    output: `Input shape: (49, 1)\nFeature matrix sample:\n[[0.546]\n [0.634]\n [0.326]]`
  }
];

export default function NumpyDay6({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [viewDemoResult, setViewDemoResult] = useState(null);
  const [randType, setRandType] = useState('randint');
  const [randOutput, setRandOutput] = useState(null);
  const [capstoneStep, setCapstoneStep] = useState(0);

  const day6Presets = [
    {
      name: 'copy_view',
      label: 'Copy vs View',
      code: `import numpy as np

original = np.array([1, 2, 3, 4, 5])

# Slice creates a VIEW — shares memory
view = original[1:4]
view[0] = 99
print("After view mutation - original:", original)

# .copy() is INDEPENDENT
original2 = np.array([1, 2, 3, 4, 5])
copy = original2[1:4].copy()
copy[0] = 99
print("After copy mutation - original:", original2)`,
      output: `After view mutation - original: [ 1 99  3  4  5]\nAfter copy mutation - original: [1 2 3 4 5]`
    },
    {
      name: 'random',
      label: 'Random Module',
      code: `import numpy as np

np.random.seed(42)

print("Random integers:", np.random.randint(1, 10, size=5))
print("Uniform floats:", np.random.uniform(0, 1, size=3).round(4))
print("Normal dist:", np.random.normal(0, 1, size=4).round(4))`,
      output: `Random integers: [7 4 8 5 7]\nUniform floats: [0.3745 0.9507 0.732]\nNormal dist: [ 0.4967 -0.1382  0.6477  1.5228]`
    }
  ];

  const day6Challenges = [
    {
      id: 'ch6_copy',
      title: 'Prove Copy Independence',
      desc: 'Create arr = np.array([10, 20, 30, 40]). Make a copy, change copy[0] to 999, and prove arr is unchanged.',
      hint: 'Use arr.copy() and print both arrays after the modification.',
      errorDoc: '.copy() creates an independent duplicate that does not share memory.'
    },
    {
      id: 'ch6_random',
      title: 'Generate a Seeded Dataset',
      desc: 'Use np.random.seed(0) then generate 6 random integers between 1 and 100.',
      hint: 'Call np.random.seed(0) then np.random.randint(1, 101, size=6).',
      errorDoc: 'np.random.randint(low, high, size=N) generates N integers in [low, high).'
    }
  ];

  const handleSelectAnswer = (qId, idx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  };
  const handleCheckQuestion = (qId) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };
  const checkFinalScore = () => {
    let c = 0;
    quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c += 1; });
    setScore(c);
  };
  const handleContinue = (nextTabId) => {
    onNavigate('numpy_day6', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runViewDemo = (mode) => {
    if (mode === 'view') {
      setViewDemoResult({ mode: 'view', original: [1, 99, 3, 4, 5], note: 'Original changed! Slice is a VIEW — it shares memory with the original array.' });
    } else {
      setViewDemoResult({ mode: 'copy', original: [1, 2, 3, 4, 5], note: 'Original unchanged! .copy() creates an INDEPENDENT duplicate with its own memory.' });
    }
  };

  const generateRandom = () => {
    let output = '';
    if (randType === 'randint') {
      const arr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
      output = 'np.random.randint(1, 100, size=5)\n= [' + arr.join(', ') + ']';
    } else if (randType === 'uniform') {
      const arr = Array.from({ length: 4 }, () => Math.random().toFixed(4));
      output = 'np.random.uniform(0, 1, size=4)\n= [' + arr.join(', ') + ']';
    } else if (randType === 'normal') {
      const arr = Array.from({ length: 4 }, () => ((Math.random() * 4) - 2).toFixed(3));
      output = 'np.random.normal(mean=0, std=1, size=4)\n= [' + arr.join(', ') + ']';
    } else if (randType === 'shuffle') {
      const arr = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
      output = 'np.random.shuffle([1,2,3,4,5,6])\n= [' + arr.join(', ') + ']  (in-place shuffle!)';
    }
    setRandOutput(output);
  };

  return (
    <AnimatePresence mode="wait">

      {/* TAB 1: COPY VS VIEW */}
      {activeTab === 'copy_view' && (
        <Section key="copy_view" eyebrow="NumPy Day 6 | Memory" title="Copy vs View — Understanding Memory Sharing">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              One of NumPy's most important concepts: <strong>slicing returns a VIEW, not a copy</strong>. This means modifying a slice also modifies the original array — unless you explicitly call <code>.copy()</code>.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. What is a View?</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

original = np.array([10, 20, 30, 40, 50])

# Slicing creates a VIEW (NOT a copy!)
view = original[1:4]
view[0] = 999

print(original)  # [10, 999, 30, 40, 50] <- original changed!
print(view)      # [999, 30, 40]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. How to Make a True Copy</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`original = np.array([10, 20, 30, 40, 50])

# .copy() gives you an INDEPENDENT copy
copy = original[1:4].copy()
copy[0] = 999

print(original)  # [10, 20, 30, 40, 50] <- original unchanged
print(copy)      # [999, 30, 40]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Checking if an Array Owns Its Data</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`arr = np.array([1, 2, 3, 4, 5])

view = arr[1:3]
copy = arr[1:3].copy()

print(view.base is arr)   # True  -> shares memory
print(copy.base is None)  # True  -> independent memory`} />
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#0284c7', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GitBranch size={18} /> Interactive: View vs Copy Demo
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                Mutate <code>slice[0] = 99</code> — does the original change?
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <button onClick={() => runViewDemo('view')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Run with Slice (VIEW)
                </button>
                <button onClick={() => runViewDemo('copy')} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Run with .copy()
                </button>
              </div>
              {viewDemoResult && (
                <div style={{ background: '#fff', border: '2px solid ' + (viewDemoResult.mode === 'view' ? '#fca5a5' : '#86efac'), borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontFamily: 'monospace', marginBottom: '0.5rem', color: '#0f172a' }}>
                    original = [{viewDemoResult.original.join(', ')}]
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: viewDemoResult.mode === 'view' ? '#dc2626' : '#16a34a' }}>
                    {viewDemoResult.mode === 'view' ? '⚠️ ' : '✅ '}{viewDemoResult.note}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('vectorization')}>
              Next: Vectorization →
            </button>
          </div>
        </Section>
      )}

      {/* TAB 2: VECTORIZATION */}
      {activeTab === 'vectorization' && (
        <Section key="vectorization" eyebrow="NumPy Day 6 | Performance" title="Vectorization — Why NumPy is Fast">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              <strong>Vectorization</strong> replaces slow Python loops with array operations that execute in optimized C code inside NumPy. This makes NumPy 100x–1000x faster for large datasets.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Loop vs Vectorized</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np, time

arr = np.arange(1_000_000)

# Slow Python loop
start = time.time()
result = [x ** 2 for x in arr]
print("Loop time:", round(time.time() - start, 4), "s")

# Fast NumPy vectorized
start = time.time()
result = np.square(arr)
print("NumPy time:", round(time.time() - start, 5), "s")  # ~100x faster`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Vectorized Boolean Filtering</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`scores = np.array([55, 78, 42, 88, 91, 65])

# No loops needed
passed = scores[scores >= 60]
failed = scores[scores < 60]

print("Passed:", passed)
print("Failed:", failed)
print("Pass rate:", len(passed) / len(scores) * 100, "%")`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. np.vectorize() for Custom Functions</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`def letter_grade(score):
    if score >= 90: return "A"
    elif score >= 80: return "B"
    elif score >= 70: return "C"
    else: return "F"

grade_fn = np.vectorize(letter_grade)
scores = np.array([55, 78, 42, 88, 91, 65])
print("Grades:", grade_fn(scores))  # ["F" "C" "F" "B" "A" "C"]`} />
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #86efac', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#16a34a', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={18} /> Key Takeaway for AI/ML
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#065f46', margin: 0 }}>
                Training datasets can have millions of rows. Always prefer vectorized NumPy operations over Python loops — the speed difference at scale is enormous.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day6', 'copy_view')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('random')}>Next: Random Module →</button>
          </div>
        </Section>
      )}

      {/* TAB 3: RANDOM MODULE */}
      {activeTab === 'random' && (
        <Section key="random" eyebrow="NumPy Day 6 | Simulation" title="NumPy Random Module">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              The <code>np.random</code> module is essential for ML: generating synthetic data, initializing neural network weights, splitting train/test sets, and running simulations.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Reproducibility: np.random.seed()</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

# Setting seed makes results reproducible
np.random.seed(42)
print(np.random.randint(1, 10, size=5))  # [7 4 8 5 7]

np.random.seed(42)  # Reset to same seed
print(np.random.randint(1, 10, size=5))  # [7 4 8 5 7] -- same result!`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Quick Reference</h3>
            <div style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ padding: '0.8rem 1.2rem', color: '#0f172a' }}>Function</th>
                    <th style={{ padding: '0.8rem 1.2rem', color: '#0f172a' }}>Description</th>
                    <th style={{ padding: '0.8rem 1.2rem', color: '#0f172a' }}>Example Output</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['np.random.rand(3)', 'Uniform float [0, 1)', '[0.37, 0.95, 0.73]'],
                    ['np.random.randint(1, 10, 5)', 'Random integers', '[7, 4, 8, 5, 7]'],
                    ['np.random.normal(0, 1, 4)', 'Normal (Gaussian) distribution', '[-0.47, 0.63, 1.52, 0.12]'],
                    ['np.random.uniform(5, 15, 3)', 'Uniform float in [low, high)', '[8.2, 13.1, 6.7]'],
                    ['np.random.choice([A,B,C], 4)', 'Random sample from array', '[B, A, C, B]'],
                    ['np.random.shuffle(arr)', 'Shuffle array in-place', '(mutates original)'],
                  ].map(([fn, desc, out], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ padding: '0.7rem 1.2rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#0284c7' }}>{fn}</td>
                      <td style={{ padding: '0.7rem 1.2rem', color: '#475569', fontSize: '0.87rem' }}>{desc}</td>
                      <td style={{ padding: '0.7rem 1.2rem', fontFamily: 'monospace', color: '#10b981', fontSize: '0.82rem' }}>{out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Generating Synthetic ML Datasets</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`np.random.seed(0)

# 100 students: height (cm) + weight (kg)
heights = np.random.normal(170, 10, size=100)
weights = np.random.normal(70, 15, size=100)

# Stack as feature matrix (100, 2)
X = np.column_stack((heights, weights))
print("Dataset shape:", X.shape)  # (100, 2)`} />
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#0284c7', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shuffle size={18} /> Interactive Random Generator
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>Select a distribution type and generate a sample:</p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {[
                  { value: 'randint', label: 'randint (integers)' },
                  { value: 'uniform', label: 'uniform (floats)' },
                  { value: 'normal', label: 'normal (Gaussian)' },
                  { value: 'shuffle', label: 'shuffle (in-place)' }
                ].map(opt => (
                  <button key={opt.value} onClick={() => setRandType(opt.value)}
                    style={{ background: randType === opt.value ? '#0284c7' : '#fff', color: randType === opt.value ? '#fff' : '#475569', border: '1px solid #cbd5e1', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                    {opt.label}
                  </button>
                ))}
              </div>
              <button onClick={generateRandom} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.8rem' }}>
                Generate Data
              </button>
              {randOutput && (
                <div style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#38bdf8', whiteSpace: 'pre-wrap' }}>
                  {randOutput}
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day6', 'vectorization')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('files')}>Next: Saving Arrays →</button>
          </div>
        </Section>
      )}

      {/* TAB 4: SAVING/LOADING */}
      {activeTab === 'files' && (
        <Section key="files" eyebrow="NumPy Day 6 | Storage" title="Saving and Loading NumPy Arrays">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              In real ML projects, you preprocess large datasets once and save them to disk. NumPy provides efficient binary formats (<code>.npy</code>, <code>.npz</code>) that are much faster than CSV for numeric data.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Single Array (.npy)</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

data = np.array([1.1, 2.2, 3.3, 4.4, 5.5])
np.save("sensor_data.npy", data)

loaded = np.load("sensor_data.npy")
print("Loaded:", loaded)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Multiple Arrays (.npz)</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`X = np.array([[1.2, 3.4], [5.6, 7.8]])
y = np.array([0, 1])

np.savez("dataset.npz", features=X, labels=y)

archive = np.load("dataset.npz")
print("Features:", archive["features"])
print("Labels:  ", archive["labels"])`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. CSV Format: savetxt / loadtxt</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`data = np.array([[1, 2, 3], [4, 5, 6]])
np.savetxt("output.csv", data, delimiter=",", fmt="%d")

loaded = np.loadtxt("output.csv", delimiter=",", dtype=int)
print("From CSV:", loaded)`} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { fmt: '.npy', speed: '⚡⚡⚡', size: 'Small', use: 'Single array, fast I/O' },
                { fmt: '.npz', speed: '⚡⚡⚡', size: 'Small', use: 'Multiple named arrays' },
                { fmt: '.csv', speed: '⚡', size: 'Larger', use: 'Human-readable, shareable' }
              ].map(item => (
                <div key={item.fmt} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginBottom: '0.5rem' }}>{item.fmt}</div>
                  <div style={{ fontSize: '0.83rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div>Speed: {item.speed}</div>
                    <div>File Size: {item.size}</div>
                    <div>Best For: {item.use}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day6', 'random')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('linalg')}>Next: Linear Algebra →</button>
          </div>
        </Section>
      )}

      {/* TAB 5: LINEAR ALGEBRA */}
      {activeTab === 'linalg' && (
        <Section key="linalg" eyebrow="NumPy Day 6 | Math" title="Introduction to Linear Algebra">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Linear algebra is the mathematical foundation of AI and ML. NumPy's <code>np.linalg</code> module gives access to matrix operations that power everything from neural networks to PCA.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Matrix Multiplication</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

# In ML: X (data) @ W (weights) = predictions
X = np.array([[1, 2], [3, 4]])
W = np.array([[0.5, 0.1], [0.3, 0.7]])

pred = X @ W       # Modern Python @ operator
pred2 = np.dot(X, W)  # Classic np.dot

print("Predictions:")
print(pred)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Common linalg Operations</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`A = np.array([[3, 1], [1, 2]])

print("Determinant:", np.linalg.det(A))
print("Inverse:")
print(np.linalg.inv(A))

eigenvals, eigenvecs = np.linalg.eig(A)
print("Eigenvalues:", eigenvals)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Solving Linear Systems (Ax = b)</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`# Solve: 3x + y = 9
#        x + 2y = 8
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])

x = np.linalg.solve(A, b)
print("Solution: x =", x[0], "y =", x[1])
print("Verify:", np.allclose(A @ x, b))`} />
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#b45309', marginTop: 0, marginBottom: '0.8rem' }}>Why This Matters for AI</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.8rem' }}>
                {[
                  ['Matrix Multiply (@)', 'Forward pass in neural networks'],
                  ['Determinant', 'Checking if a matrix is invertible'],
                  ['Eigenvalues', 'PCA — dimensionality reduction'],
                  ['np.linalg.solve()', 'Linear regression closed-form solution']
                ].map(([op, use]) => (
                  <div key={op} style={{ background: '#fff', padding: '0.8rem', borderRadius: '8px', border: '1px solid #fde68a' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{op}</div>
                    <div style={{ color: '#78350f', fontSize: '0.8rem', marginTop: '4px' }}>{use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day6', 'files')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('capstone')}>Next: Capstone Project →</button>
          </div>
        </Section>
      )}

      {/* TAB 6: CAPSTONE */}
      {activeTab === 'capstone' && (
        <Section key="capstone" eyebrow="NumPy Day 6 | Project" title="AI Data Preparation Project">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', color: '#fff' }}>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={22} /> Real-World ML Data Pipeline
              </h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>
                Simulate the first stage of every ML project: cleaning raw sensor data, removing outliers, normalizing, and reshaping for model input — using only NumPy.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {capstoneSteps.map((_, i) => (
                <div key={i} onClick={() => setCapstoneStep(i)}
                  style={{ flex: 1, height: '6px', borderRadius: '4px', background: i <= capstoneStep ? '#0284c7' : '#cbd5e1', cursor: 'pointer', transition: 'background 0.3s' }} />
              ))}
            </div>

            <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0284c7', padding: '0.8rem 1.2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>{capstoneSteps[capstoneStep].title}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>Step {capstoneStep + 1} of {capstoneSteps.length}</span>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>{capstoneSteps[capstoneStep].desc}</p>
              </div>
              <div style={{ background: '#0f172a', padding: '1rem' }}>
                <SyntaxHighlighter code={capstoneSteps[capstoneStep].code} />
              </div>
              <div style={{ background: '#1e293b', padding: '0.8rem 1rem', borderTop: '1px solid #1e3a5f' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>Expected Output:</div>
                <div style={{ fontFamily: 'monospace', color: '#38bdf8', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                  {capstoneSteps[capstoneStep].output}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <button disabled={capstoneStep === 0} onClick={() => setCapstoneStep(s => s - 1)}
                style={{ background: capstoneStep === 0 ? '#e2e8f0' : '#fff', color: capstoneStep === 0 ? '#94a3b8' : '#0284c7', border: '1px solid #cbd5e1', padding: '0.5rem 1.2rem', borderRadius: '8px', cursor: capstoneStep === 0 ? 'default' : 'pointer', fontWeight: 600 }}>
                Previous Step
              </button>
              {capstoneStep < capstoneSteps.length - 1 ? (
                <button onClick={() => setCapstoneStep(s => s + 1)}
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
                  Next Step →
                </button>
              ) : (
                <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} /> Pipeline Complete!
                </div>
              )}
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#16a34a', marginTop: 0, marginBottom: '0.8rem' }}>NumPy Skills Used in this Project</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.6rem' }}>
                {['np.random.normal', 'np.isfinite()', 'arr.copy()', 'Boolean masking', 'arr.reshape()', 'Min-Max normalization', 'np.save / np.load', 'np.random.seed()'].map(skill => (
                  <div key={skill} style={{ background: '#fff', padding: '0.5rem 0.8rem', borderRadius: '6px', fontSize: '0.82rem', color: '#0f172a', border: '1px solid #bbf7d0' }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day6', 'linalg')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* TAB 7: PLAYGROUND */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="NumPy Day 6 | Lab" title="Advanced NumPy Live Coding Lab">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Practice copy vs view, random generation, and the concepts from this day. Select a challenge on the right and solve it!
            </p>
            <NumpyAIPlayground
              dayId="day6"
              presets={day6Presets}
              challenges={day6Challenges}
            />
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day6', 'capstone')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Final Assessment →</button>
          </div>
        </Section>
      )}

      {/* TAB 8: ASSESSMENT */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="NumPy Day 6 | Final" title="Final Assessment — Advanced NumPy">

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={20} color="#f59e0b" /> Common Advanced Mistakes
            </h3>
            {[
              {
                mistake: 'Assuming a slice always creates a copy',
                code: `arr = np.array([1, 2, 3, 4, 5])\nslice_it = arr[1:4]\nslice_it[0] = 999\n\n# Unexpected! Original changed:\nprint(arr)  # [1, 999, 3, 4, 5]\n\n# Correct: Use .copy() for independence\nslice_it = arr[1:4].copy()`
              },
              {
                mistake: 'Forgetting to set a random seed for reproducibility',
                code: `# Results change every run -- experiments not reproducible!\nresult1 = np.random.randint(1, 10, size=5)\n\n# Always set seed BEFORE generating data\nnp.random.seed(42)\nresult2 = np.random.randint(1, 10, size=5)  # Always [7 4 8 5 7]`
              }
            ].map((pitfall, idx) => (
              <div key={idx} style={{ border: '1px solid #fca5a5', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                <div style={{ background: '#fef2f2', padding: '0.6rem 1rem', fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>
                  {pitfall.mistake}
                </div>
                <div style={{ background: '#0f172a', padding: '0.75rem 1rem' }}>
                  <SyntaxHighlighter code={pitfall.code} />
                </div>
              </div>
            ))}
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={20} color="#10b981" /> Final Concept Check
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map((q) => {
                const selected = selectedAnswers[q.id];
                const checked = checkedQuestions[q.id];
                return (
                  <div key={q.id} style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.2rem', background: '#fff' }}>
                    <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.8rem' }}>{q.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.8rem' }}>
                      {q.options.map((opt, idx) => {
                        let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                        if (selected === idx) { bg = '#e0f2fe'; border = '1px solid #0284c7'; color = '#0369a1'; }
                        if (checked) {
                          if (idx === q.ans) { bg = '#d1fae5'; border = '1px solid #10b981'; color = '#065f46'; }
                          else if (selected === idx) { bg = '#fee2e2'; border = '1px solid #ef4444'; color = '#991b1b'; }
                        }
                        return (
                          <button key={idx} onClick={() => !checked && handleSelectAnswer(q.id, idx)}
                            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border, background: bg, color, textAlign: 'left', cursor: checked ? 'default' : 'pointer', fontWeight: selected === idx ? 600 : 400 }}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {!checked && selected !== undefined && (
                      <button onClick={() => handleCheckQuestion(q.id)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.4rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                        Check Answer
                      </button>
                    )}
                    {checked && (
                      <div style={{ fontSize: '0.85rem', color: selected === q.ans ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                        {selected === q.ans ? 'Correct!' : 'Incorrect. Correct answer: ' + q.options[q.ans]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button onClick={checkFinalScore} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                Get Final Score
              </button>
              {score !== null && (
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: score >= 4 ? '#10b981' : score >= 3 ? '#f59e0b' : '#ef4444' }}>
                  Final Score: {score} / 5 {score === 5 ? ' Perfect!' : score >= 4 ? ' Excellent!' : ''}
                </div>
              )}
            </div>
          </div>

          {score !== null && score >= 3 && (
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: '16px', padding: '2rem', color: '#fff', textAlign: 'center', marginBottom: '1.5rem' }}>
              <Award size={48} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', margin: 0, marginBottom: '0.5rem' }}>NumPy Course Complete!</h3>
              <p style={{ opacity: 0.9, margin: 0, fontSize: '0.95rem' }}>
                You have mastered NumPy from basic arrays all the way to AI data preparation pipelines. You are ready for Pandas and Machine Learning!
              </p>
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day6', 'playground')}>
              Back to Lab
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
