import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Play, Zap, RefreshCw, Code } from 'lucide-react';
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
  const lines = code.split('\n');
  return (
    <div style={{ 
      fontFamily: 'monospace', 
      lineHeight: '1.6', 
      fontSize: '0.9rem', 
      overflowX: 'auto', 
      background: '#0f172a', 
      padding: '1rem', 
      borderRadius: '8px', 
      color: '#e1e4e8', 
      ...style 
    }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt|print|sum|len|math|random|np|zeros|ones|eye|full|empty|identity|diag|arange|linspace|logspace|reshape|ravel|flatten|transpose|concatenate|vstack|hstack|column_stack|stack|dstack|meshgrid|nditer|split|hsplit|vsplit|searchsorted|argmax|argmin|char|startswith|sort|argsort)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (htmlTag) color = '#7ee787';
          else if (kw) { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
          else if (ident) color = '#e1e4e8';
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
    q: 'What is the purpose of passing -1 as a dimension to np.reshape()?',
    options: [
      'It creates an empty array dimension.',
      'It tells NumPy to automatically calculate that dimension based on the array size.',
      'It reverses the elements along that axis.',
      'It flattens the array entirely.'
    ],
    ans: 1
  },
  {
    id: 'q2',
    q: 'Which function stacks 1D or 2D arrays depth-wise along a new 3rd dimension?',
    options: ['np.vstack()', 'np.hstack()', 'np.dstack()', 'np.concatenate()'],
    ans: 2
  },
  {
    id: 'q3',
    q: 'What does np.argsort(arr) return?',
    options: [
      'The array sorted in descending order.',
      'The sorted array values.',
      'The indices that would sort the array.',
      'The boolean mask of sorted values.'
    ],
    ans: 2
  },
  {
    id: 'q4',
    q: 'Which function is used to find the insertion index in a sorted array to maintain order?',
    options: ['np.where()', 'np.searchsorted()', 'np.find()', 'np.insert_index()'],
    ans: 1
  },
  {
    id: 'q5',
    q: 'What is a key difference between ravel() and flatten()?',
    options: [
      'flatten() is faster.',
      'ravel() returns a view (modifies original) if possible, while flatten() always returns a copy.',
      'ravel() only works on 2D arrays.',
      'flatten() works in-place.'
    ],
    ans: 1
  }
];

export default function NumpyDay4({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Performance timer state
  const [perfResult, setPerfResult] = useState(null);
  const [perfRunning, setPerfRunning] = useState(false);


  // Interactive sorting states
  const [sortInput, setSortInput] = useState('8, 3, 5, 1, 9, 2');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedResult, setSortedResult] = useState(null);

  // Interactive Code Playground
  const day4Presets = [
    {
      name: 'reshape',
      label: 'Reshape',
      code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])
print("Reshaped 2x3:\\n", arr.reshape(2, 3))`,
      output: `Reshaped 2x3:\n [[1 2 3]\n  [4 5 6]]`
    },
    {
      name: 'stacking',
      label: 'Stacking',
      code: `import numpy as np

a = np.array([[1, 2]])
b = np.array([[3, 4]])

print("VStack:\\n", np.vstack((a, b)))
print("HStack:", np.hstack((a, b)))`,
      output: `VStack:\n [[1 2]\n  [3 4]]\nHStack: [[1 2 3 4]]`
    }
  ];

  const day4Challenges = [
    {
      id: 'ch4_reshape',
      title: 'Reshape 1D to 3x4 2D',
      desc: 'Reshape a 1D array of 12 elements (1 to 12) into a 2D array with 3 rows and 4 columns.',
      hint: 'Define arr = np.arange(1, 13) and use .reshape(3, 4).',
      errorDoc: '.reshape(3, 4) to convert the array configuration.'
    },
    {
      id: 'ch4_stack',
      title: 'Horizontal Stacking',
      desc: 'Stack two 2D arrays: a = [[1, 2], [3, 4]] and b = [[5, 6], [7, 8]] horizontally.',
      hint: 'Use np.hstack((a, b)).',
      errorDoc: 'np.hstack((a, b)) call to combine columns.'
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
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.ans) c += 1;
    });
    setScore(c);
  };

  const handleContinue = (nextTabId) => {
    onNavigate('numpy_day4', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Performance timer simulation
  const runPerfBenchmark = () => {
    setPerfRunning(true);
    setPerfResult(null);
    setTimeout(() => {
      setPerfResult({
        loopTime: '0.1452 seconds',
        vectorTime: '0.0012 seconds',
        speedup: '121.0x'
      });
      setPerfRunning(false);
    }, 1200);
  };

  // Sorter simulation
  const executeSort = () => {
    const vals = sortInput.split(',').map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));
    const sorted = [...vals].sort((a, b) => sortOrder === 'asc' ? a - b : b - a);
    setSortedResult({
      original: vals.join(', '),
      sorted: sorted.join(', '),
      indices: vals.map((v, i) => ({ v, i })).sort((a, b) => sortOrder === 'asc' ? a.v - b.v : b.v - a.v).map(x => x.i).join(', ')
    });
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* ── TAB 1: SHAPING ───────────────── */}
      {activeTab === 'shaping' && (
        <Section key="shaping" eyebrow="NumPy Day 4 • Dimensions" title="Array Shaping, Reshaping &amp; Transposing">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Understanding dimensions (`.shape` and `.ndim`) and how to transform them without copying data in memory is essential for high-performance machine learning pipelines.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Inspecting Array Shape</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: '#0284c7' }}>1D Shape</strong>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block', margin: '4px 0' }}>np.array([1, 2, 3]).shape  # (3,)</code>
                <span style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 'auto', paddingTop: '0.5rem' }}>Vector along one axis.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: '#0284c7' }}>2D Shape</strong>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block', margin: '4px 0' }}>np.array([[1, 2], [3, 4]]).shape # (2, 2)</code>
                <span style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 'auto', paddingTop: '0.5rem' }}>Grid containing rows and columns.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: '#0284c7' }}>3D Shape</strong>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block', margin: '4px 0' }}>np.array([[[1, 2], [3, 4]]]).shape # (1, 2, 2)</code>
                <span style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 'auto', paddingTop: '0.5rem' }}>Tensor containing depth/layer slices.</span>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Reshaping Arrays (`reshape()`)</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              We can change shapes as long as the total elements match. Use <code>-1</code> to tell NumPy to automatically compute that dimension for you.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) # Size: 12

# Reshape to 3 rows, 4 columns
reshaped_2d = arr.reshape(3, 4)

# Reshape to 3D: shape (2, 2, 3)
reshaped_3d = arr.reshape(2, 2, 3)

# Auto column count: 4 rows, auto cols
auto_reshape = arr.reshape(4, -1) # shape is (4, 3) since 12 / 4 = 3`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Flattening vs. Transposing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ color: '#0f172a' }}>Flattening (flatten vs ravel)</strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 8px 0' }}>
                  Converts matrix back to a 1D vector. <code>.flatten()</code> creates a copy, while <code>.ravel()</code> returns a view if possible.
                </p>
                <div style={{ background: '#0f172a', padding: '0.5rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`vector = matrix.ravel()`} />
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ color: '#0f172a' }}>Transposing (.T)</strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 8px 0' }}>
                  Flips axes. For 2D matrices, swaps rows and columns.
                </p>
                <div style={{ background: '#0f172a', padding: '0.5rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`transposed = matrix.T`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('stacking')}>
              Next: Concatenation &amp; Stacking →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: STACKING ──────────────── */}
      {activeTab === 'stacking' && (
        <Section key="stacking" eyebrow="NumPy Day 4 • Joins" title="Concatenation &amp; Stacking">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Joining arrays can be done along existing axes (concatenation) or along a new axis (stacking).
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Array Concatenation</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

# 1D Concatenation
arr1 = np.array([1, 2])
arr2 = np.array([3, 4])
print(np.concatenate([arr1, arr2])) # [1, 2, 3, 4]

# 2D Concatenation (requires specifying axis)
m1 = np.array([[1, 2], [3, 4]])
m2 = np.array([[5, 6], [7, 8]])

# Along rows (axis=0)
print(np.concatenate([m1, m2], axis=0)) # Shape (4, 2)

# Along columns (axis=1)
print(np.concatenate([m1, m2], axis=1)) # Shape (2, 4)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Stacking Functions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0284c7' }}>np.vstack() (Vertical)</strong>
                <p style={{ fontSize: '0.82rem', color: '#475569', margin: '4px 0 0 0' }}>Stacks arrays vertically (row-wise). Equivalent to axis=0.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0284c7' }}>np.hstack() (Horizontal)</strong>
                <p style={{ fontSize: '0.82rem', color: '#475569', margin: '4px 0 0 0' }}>Stacks arrays horizontally (column-wise). Equivalent to axis=1.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0284c7' }}>np.column_stack()</strong>
                <p style={{ fontSize: '0.82rem', color: '#475569', margin: '4px 0 0 0' }}>Stacks 1D arrays side-by-side as columns in a new 2D matrix.</p>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3D Depth Stacking &amp; Meshgrids</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`# Depth Stack (dstack) along 3rd axis
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
depth_stacked = np.dstack([a, b])
print(depth_stacked.shape) # (2, 2, 2)

# Meshgrid coordinates creation
x = np.array([1, 2, 3])
y = np.array([4, 5])
xx, yy = np.meshgrid(x, y) # helpful for coordinates grids`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Python List Concatenation Comparison</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Unlike NumPy arrays which are optimized for contiguous memory grids, standard Python lists can be concatenated in several standard ways:
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
              <SyntaxHighlighter code={`list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Method 1: Using + operator
concat_plus = list1 + list2

# Method 2: In-place extend
list_copy = list1.copy()
list_copy.extend(list2)

# Method 3: Unpacking operator
concat_unpack = [*list1, *list2]

# Method 4: itertools chain
from itertools import chain
concat_chain = list(chain(list1, list2))`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day4', 'shaping')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('iteration')}>Next: Array Iteration →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: ITERATION ──────────────── */}
      {activeTab === 'iteration' && (
        <Section key="iteration" eyebrow="NumPy Day 4 • Loops" title="Array Iteration &amp; Vectorization Performance">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy arrays can be iterated using basic Python loops, optimized flat iterators, or multi-dimensional index trackers.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Basic Iteration Patterns</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

# 1D Iteration
arr_1d = np.array([10, 20, 30])
for idx, x in enumerate(arr_1d):
    print(f"Index {idx}: {x}")

# 2D Iteration (defaults to iterating over row slices)
arr_2d = np.array([[1, 2], [3, 4]])
for row in arr_2d:
    print(row) # prints [1, 2] then [3, 4]

# Flat iteration (element-by-element)
for x in arr_2d.flat:
    print(x) # 1, 2, 3, 4`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Advanced Iteration with `nditer`</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <code>np.nditer()</code> is an efficient multi-dimensional iterator object. You can specify order traversal (C-order vs Fortran-order column slices) and track multi-dimensional coordinates index flags.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`# Fortran order column traversal
for x in np.nditer(arr_2d, order='F'):
    print(x) # 1, 3, 2, 4

# Multi-index tracking flags
it = np.nditer(arr_2d, flags=['multi_index'])
while not it.finished:
    print(f"Index {it.multi_index} = {it[0]}")
    it.iternext()`} />
            </div>

            {/* Performance Timer Visual Benchmark */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#b45309', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Zap size={18} /> Interactive Performance Benchmark
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Compare standard Python loops vs NumPy vectorized calculations squaring 1,000,000 values:
              </p>

              <button onClick={runPerfBenchmark} disabled={perfRunning} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: perfRunning ? 'wait' : 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {perfRunning ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                {perfRunning ? 'Running Benchmark...' : 'Run Benchmark'}
              </button>

              {perfResult && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center', marginTop: '1.2rem' }}>
                  <div style={{ background: '#fef2f2', padding: '0.5rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 700 }}>Python loop time</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '4px', color: '#ef4444' }}>{perfResult.loopTime}</div>
                  </div>
                  <div style={{ background: '#ecfdf5', padding: '0.5rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>NumPy vectorized</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '4px', color: '#10b981' }}>{perfResult.vectorTime}</div>
                  </div>
                  <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#1d4ed8', fontWeight: 700 }}>Speedup factor</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '4px', color: '#1d4ed8' }}>{perfResult.speedup}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day4', 'stacking')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('searching')}>Next: Splitting &amp; Searching →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: SEARCHING ──────────────── */}
      {activeTab === 'searching' && (
        <Section key="searching" eyebrow="NumPy Day 4 • Search" title="Array Splitting &amp; Searching">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Splitting divides one grid into multiple smaller arrays, while searching locates element matching index locations.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Array Splitting</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])

# Split into 3 equal pieces
parts = np.split(arr, 3) 
# parts[0] = [1, 2], parts[1] = [3, 4], parts[2] = [5, 6]

# 2D Axis splitting: hsplit (columns) & vsplit (rows)
matrix = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
cols_split = np.hsplit(matrix, 2) # Splits horizontally into two 2x2 matrices`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Array Searching (`np.where()`)</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Use <code>np.where()</code> to locate index parameters matching values, or <code>argmax()/argmin()</code> to get maximum/minimum indexes.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`arr = np.array([1, 3, 5, 7, 5, 9])

# Find indices of value 5
indices = np.where(arr == 5)[0] # [2, 4]

# Find indices satisfying conditions
greater_4 = np.where(arr > 4)[0] # [2, 3, 4, 5]

# Max and Min element locations
data = np.array([3, 1, 9, 2])
print(np.argmax(data)) # Output: 2 (Index of value 9)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Sorted Searches &amp; Strings</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
              <SyntaxHighlighter code={`# searchsorted: returns index insertion point in sorted arrays
sorted_arr = np.array([1, 3, 5, 7, 9])
idx = np.searchsorted(sorted_arr, 6)
print(idx) # Output: 3 (where 6 should insert to preserve order)

# String searching
names = np.array(["apple", "banana", "cherry"])
has_a = np.char.find(names, "a") >= 0
print(names[has_a]) # ['apple' 'banana']`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day4', 'iteration')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('sorting')}>Next: Array Sorting →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: SORTING ────────────────── */}
      {activeTab === 'sorting' && (
        <Section key="sorting" eyebrow="NumPy Day 4 • Sort" title="Array Sorting Operations">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Sorting reorders elements. You can perform in-place sorts, return sorted copies, retrieve sorting index parameters, or sort along specific matrix dimensions.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Basic Sorting (`sort()` &amp; `argsort()`)</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

arr = np.array([3, 1, 4, 1, 5, 9])

# Method 1: Return sorted copy
print(np.sort(arr)) # [1, 1, 3, 4, 5, 9]

# Method 2: Reverse sorting (descending)
print(np.sort(arr)[::-1]) # [9, 5, 4, 3, 1, 1]

# Method 3: argsort (returns indices that sort the array)
indices = np.argsort(arr)
print(indices) # [1, 3, 0, 2, 4, 5]`} />
            </div>

            {/* Interactive Sorter Simulator */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#1e40af', marginTop: 0, marginBottom: '0.5rem' }}>🛠️ Interactive Sorter Simulator</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Enter values separated by commas, select order, and click "Execute Sort" to view argsort indexes.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Array:</span>
                  <input type="text" value={sortInput} onChange={e => setSortInput(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%', fontSize: '0.9rem' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Direction:</span>
                  <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%', background: '#fff' }}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>

              <button onClick={executeSort} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '1.2rem' }}>
                Execute Sort
              </button>

              {sortedResult && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                  <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>Original</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '4px' }}>[{sortedResult.original}]</div>
                  </div>
                  <div style={{ background: '#ecfdf5', padding: '0.5rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>Sorted</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '4px', color: '#10b981' }}>[{sortedResult.sorted}]</div>
                  </div>
                  <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#1d4ed8', fontWeight: 700 }}>Argsort indices</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '4px', color: '#1d4ed8' }}>[{sortedResult.indices}]</div>
                  </div>
                </div>
              )}
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Multi-dimensional Matrix Sorting</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`matrix = np.array([
    [3, 1, 4],
    [1, 5, 9],
    [2, 6, 5]
])

# Sort each column individually (axis=0)
print(np.sort(matrix, axis=0))
# [[1 1 4]
#  [2 5 5]
#  [3 6 9]]

# Sort each row individually (axis=1)
print(np.sort(matrix, axis=1))

# Sort entire array flattened
print(np.sort(matrix, axis=None)) # [1 1 2 3 4 5 5 6 9]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Structured Sorting</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
              <SyntaxHighlighter code={`# Structured array elements sorting
data = np.array([
    ('Alice', 25, 85.5),
    ('Bob', 30, 92.3),
    ('Charlie', 22, 78.9)
], dtype=[('name', 'U10'), ('age', 'i4'), ('score', 'f4')])

# Sort by age
print(np.sort(data, order='age'))`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day4', 'searching')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: PLAYGROUND ──────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="NumPy Shaping &amp; Iteration Lab">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Test your knowledge of array shapes, stacking, splitting, sorting, and iteration. Select a challenge on the right and edit the code to solve it!
            </p>
            
            <NumpyAIPlayground
              dayId="day4"
              presets={day4Presets}
              challenges={day4Challenges}
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day4', 'sorting')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 4 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: ASSESSMENT ─────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="NumPy Day 4 • Assessment" title="Day 4 Assessment — Shaping &amp; Sort">
          
          {/* Quick Mistakes panel */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={20} color="#f59e0b" /> Common Pitfalls
            </h3>
            {[
              {
                mistake: 'Concatenating arrays with mismatching shapes',
                code: `arr1 = np.ones((2, 3))\narr2 = np.ones((2, 4))\n\n# ❌ ValueError: all input dimensions except concatenation axis must match exactly!\n# print(np.concatenate([arr1, arr2], axis=0))\n\n# ✅ Correct: stack along columns (axis=1)\nprint(np.concatenate([arr1, arr2], axis=1)) # shape (2, 7)`
              },
              {
                mistake: 'Assuming np.sort() sorts the array in-place',
                code: `arr = np.array([3, 1, 2])\n\n# ❌ np.sort(arr) returns a sorted copy, does not mutate arr!\nnp.sort(arr)\nprint(arr) # Output: [3, 1, 2] (original stays unchanged)\n\n# ✅ Correct: reassign, or use in-place .sort()\narr.sort()\nprint(arr) # Output: [1, 2, 3]`
              }
            ].map((pitfall, idx) => (
              <div key={idx} style={{ border: '1px solid #fca5a5', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                <div style={{ background: '#fef2f2', padding: '0.6rem 1rem', fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>
                  ⚠️ {pitfall.mistake}
                </div>
                <div style={{ background: '#0f172a', padding: '0.75rem 1rem' }}>
                  <SyntaxHighlighter code={pitfall.code} />
                </div>
              </div>
            ))}
          </div>

          {/* Quiz panel */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={20} color="#10b981" /> Concept Check
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
                        if (selected === idx) {
                          bg = '#e0f2fe'; border = '1px solid #0284c7'; color = '#0369a1';
                        }
                        if (checked) {
                          if (idx === q.ans) {
                            bg = '#d1fae5'; border = '1px solid #10b981'; color = '#065f46';
                          } else if (selected === idx) {
                            bg = '#fee2e2'; border = '1px solid #ef4444'; color = '#991b1b';
                          }
                        }
                        return (
                          <button key={idx} onClick={() => !checked && handleSelectAnswer(q.id, idx)}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              border,
                              background: bg,
                              color,
                              textAlign: 'left',
                              cursor: checked ? 'default' : 'pointer',
                              fontWeight: selected === idx ? 600 : 400
                            }}>
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
                        {selected === q.ans ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${q.options[q.ans]}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button onClick={checkFinalScore} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                Get Quiz Score
              </button>
              {score !== null && (
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: score >= 4 ? '#10b981' : score >= 3 ? '#f59e0b' : '#ef4444' }}>
                  Final Score: {score} / 5
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day4', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
