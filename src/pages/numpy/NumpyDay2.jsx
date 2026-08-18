import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Play, Code } from 'lucide-react';
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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt|print|sum|len|math|random|np|zeros|ones|eye|full|empty|identity|diag|arange|linspace|logspace|reshape|ravel|transpose|split|concatenate|stack|expand_dims|squeeze|sin|cos|tan|log|log10|round|floor|ceil|mean|max|min|std|dot|matmul|linalg|union1d|intersect1d|setdiff1d|einsum)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
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
    q: 'Which function is used to flatten a multi-dimensional array into a 1D array?',
    options: ['np.flatten_dims()', 'np.ravel()', 'np.squeeze()', 'np.transpose()'],
    ans: 1
  },
  {
    id: 'q2',
    q: 'What is NumPy\'s broadcasting behavior?',
    options: [
      'It sends data over network channels.',
      'It allows mathematical operations between arrays of different shapes by stretching the smaller array.',
      'It flattens multi-dimensional arrays automatically.',
      'It converts data to boolean true/false values.'
    ],
    ans: 1
  },
  {
    id: 'q3',
    q: 'Which of the following array shapes are compatible for broadcasting with an array of shape (3, 1)?',
    options: ['(3, 3)', '(1, 3)', 'Both are compatible', 'Neither is compatible'],
    ans: 2
  },
  {
    id: 'q4',
    q: 'Which function returns the elements that are in the first array but not in the second array?',
    options: ['np.setdiff1d()', 'np.intersect1d()', 'np.union1d()', 'np.difference()'],
    ans: 0
  },
  {
    id: 'q5',
    q: 'What does np.union1d([1, 2], [2, 3]) return?',
    options: ['[1, 2, 2, 3]', '[2]', '[1, 2, 3]', '[1, 3]'],
    ans: 2
  }
];

export default function NumpyDay2({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Reshape simulator states
  const [reshapeOption, setReshapeOption] = useState('2x3');

  // Set operations interactive states
  const [setAInput, setSetAInput] = useState('1, 2, 3, 4');
  const [setBInput, setSetBInput] = useState('3, 4, 5, 6');
  const [setResult, setSetResult] = useState(null);
  const [setOpType, setSetOpType] = useState('union');

  const day2Presets = [
    {
      name: 'arithmetic',
      label: 'Arithmetic',
      code: `import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print("Addition (a + b):", a + b)
print("Multiplication (a * b):", a * b)
print("a squared (a ** 2):", a ** 2)`,
      output: `Addition (a + b): [5 7 9]\nMultiplication (a * b): [ 4 10 18]\na squared (a ** 2): [1 4 9]`
    },
    {
      name: 'sets',
      label: 'Set Operations',
      code: `import numpy as np

x = np.array([1, 2, 3, 4])
y = np.array([3, 4, 5, 6])

print("Union:", np.union1d(x, y))
print("Intersection:", np.intersect1d(x, y))`,
      output: `Union: [1 2 3 4 5 6]\nIntersection: [3 4]`
    }
  ];

  const day2Challenges = [
    {
      id: 'ch2_broadcast',
      title: 'Broadcasting to Add Scalar',
      desc: 'Use broadcasting to add 10 to a 2D array of shape (3,3) containing numbers from 1 to 9.',
      hint: 'Define arr = np.arange(1, 10).reshape(3, 3) and add 10 (e.g. arr + 10).',
      errorDoc: 'addition or broadcasting logic. Check if you defined the 2D array and added 10.'
    },
    {
      id: 'ch2_intersect',
      title: 'Find Shared Elements',
      desc: 'Use np.intersect1d to find the common elements between a = [10, 20, 30, 40] and b = [30, 40, 50, 60].',
      hint: 'Define two arrays and pass them to np.intersect1d(a, b).',
      errorDoc: 'np.intersect1d(a, b) to find common elements.'
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
    onNavigate('numpy_day2', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set Operations Calculator
  const computeSetOp = () => {
    const parse = (str) => str.split(',').map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));
    const arrA = Array.from(new Set(parse(setAInput)));
    const arrB = Array.from(new Set(parse(setBInput)));

    let res = [];
    if (setOpType === 'union') {
      res = Array.from(new Set([...arrA, ...arrB])).sort((a, b) => a - b);
    } else if (setOpType === 'intersection') {
      res = arrA.filter(x => arrB.includes(x)).sort((a, b) => a - b);
    } else if (setOpType === 'difference') {
      res = arrA.filter(x => !arrB.includes(x)).sort((a, b) => a - b);
    }
    setSetResult(res);
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* ── TAB 1: OPERATORS ──────────────── */}
      {activeTab === 'operators' && (
        <Section key="operators" eyebrow="NumPy Day 2 • Operators" title="NumPy Operators &amp; Arithmetic">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy arrays support efficient element-wise operations. You can perform standard arithmetic, comparison, and logical checks instantly across millions of elements without slow Python loops.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Element-wise Arithmetic Operations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { op: 'Addition (+)', fn: 'np.add(a, b)', desc: 'Adds corresponding elements together.' },
                { op: 'Subtraction (-)', fn: 'np.subtract(a, b)', desc: 'Subtracts second array elements from the first.' },
                { op: 'Multiplication (*)', fn: 'np.multiply(a, b)', desc: 'Multiplies matching positions (not matrix multiplication).' },
                { op: 'Division (/)', fn: 'np.divide(a, b)', desc: 'Divides matching positions element-by-element.' },
                { op: 'Exponentiation (**)', fn: 'np.power(a, b)', desc: 'Raises elements of first array to power of second.' },
              ].map(item => (
                <div key={item.op} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#0284c7', marginBottom: '0.25rem' }}>{item.op}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '0.5rem' }}>{item.fn}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`import numpy as np

# 1D Array Operations
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)  # Output: [5 7 9]
print(a * b)  # Output: [ 4 10 18]

# 2D Array Operations
a_2d = np.array([[1, 2], [3, 4]])
b_2d = np.array([[10, 20], [30, 40]])
print(a_2d + b_2d) 
# Output: 
# [[11 22]
#  [33 44]]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Logical &amp; Comparison Operators</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Comparison operators return boolean arrays indicating which positions meet a condition. Logical functions let you aggregate multiple checks.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#0369a1', marginTop: 0 }}>Comparison Operators</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569' }}>Evaluate element-by-element checks: <code>&gt;</code>, <code>&lt;</code>, <code>==</code>, <code>!=</code></p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`arr = np.array([1, 5, 2, 8])
print(arr > 3) # [False True False True]`} />
                </div>
              </div>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#047857', marginTop: 0 }}>Logical Ufuncs &amp; Bitwise</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569' }}>Combine conditions with: <code>np.logical_and()</code>, <code>np.logical_or()</code>, or bitwise operators <code>&amp;</code>, <code>|</code></p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`a = np.array([1, 2, 3, 4])
print((a > 1) & (a < 4)) 
# [False True True False]`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('manipulation')}>
              Next: Array Manipulation →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: MANIPULATION ───────────── */}
      {activeTab === 'manipulation' && (
        <Section key="manipulation" eyebrow="NumPy Day 2 • Dimensions" title="Array Manipulation &amp; Reshaping">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy offers fast, allocation-free methods to rearrange array rows, columns, and dimensions.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Basic Structural Changes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ color: '#0f172a' }}>reshape()</strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0 0' }}>Gives a new shape to an array without changing its data. The total elements must match.</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ color: '#0f172a' }}>ravel()</strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0 0' }}>Flattens a multi-dimensional array into a simple 1D array.</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ color: '#0f172a' }}>transpose() / .T</strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0 0' }}>Flips rows and columns of 2D/multi-dimensional matrices.</p>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Splitting &amp; Joining</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`import numpy as np

# Joining arrays
a = np.array([1, 2])
b = np.array([3, 4])
joined = np.concatenate((a, b)) # [1, 2, 3, 4]

# Stacking along new axes
stacked_vertical = np.vstack((a, b))
# [[1, 2],
#  [3, 4]]

# Splitting arrays
x = np.array([1, 2, 3, 4, 5, 6])
sub_arrays = np.split(x, 3) 
# returns [ [1, 2], [3, 4], [5, 6] ]`} />
            </div>

            {/* Interactive Reshaping Simulator */}
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#0369a1', marginTop: 0, marginBottom: '0.5rem' }}>🔄 Interactive Array Reshaper Simulator</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                Visualize how a flat 1D array of 6 elements: <code>[1, 2, 3, 4, 5, 6]</code> is restructured into different shapes.
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Select New Shape:</span>
                {['2x3', '3x2', '1x6', '6x1'].map(opt => (
                  <button key={opt} onClick={() => setReshapeOption(opt)}
                    style={{
                      background: reshapeOption === opt ? '#0284c7' : '#fff',
                      color: reshapeOption === opt ? '#fff' : '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.4rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}>
                    {opt}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Resulting Array Layout:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'monospace', fontSize: '1.1rem', color: '#0f172a', fontWeight: 'bold' }}>
                  {reshapeOption === '2x3' && (
                    <>
                      <div>[ [1, 2, 3],</div>
                      <div>  [4, 5, 6] ]</div>
                    </>
                  )}
                  {reshapeOption === '3x2' && (
                    <>
                      <div>[ [1, 2],</div>
                      <div>  [3, 4],</div>
                      <div>  [5, 6] ]</div>
                    </>
                  )}
                  {reshapeOption === '1x6' && (
                    <div>[ [1, 2, 3, 4, 5, 6] ]</div>
                  )}
                  {reshapeOption === '6x1' && (
                    <>
                      <div>[ [1],</div>
                      <div>  [2],</div>
                      <div>  [3],</div>
                      <div>  [4],</div>
                      <div>  [5],</div>
                      <div>  [6] ]</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day2', 'operators')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('ufuncs')}>Next: Universal Functions →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: UFUNCS ────────────────── */}
      {activeTab === 'ufuncs' && (
        <Section key="ufuncs" eyebrow="NumPy Day 2 • Functions" title="Mathematical &amp; Statistical Functions (ufuncs)">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              <strong>Universal Functions (ufuncs)</strong> are fast, compiled C routines that process each array element individually at highly optimized speeds.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>📐 Trigonometric</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>Calculate angles in radians:</p>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.sin()</code> &nbsp;
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.cos()</code> &nbsp;
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.tan()</code>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>📈 Logarithmic &amp; Power</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>Growth &amp; scale computations:</p>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.log()</code> &nbsp;
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.log10()</code>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>🔢 Rounding Functions</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>Round decimal items:</p>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.round()</code> &nbsp;
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.floor()</code> &nbsp;
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>np.ceil()</code>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Statistical Reductions</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Unlike element-by-element actions, statistical methods aggregate values over the whole array or across specific axes (dimensions).
            </p>

            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

arr = np.array([[1, 2], [3, 4]])

print(np.sum(arr)) # Total Sum: 10
print(np.mean(arr)) # Average: 2.5
print(np.std(arr)) # Standard Deviation: 1.118

# Aggregate along specific axis
print(np.sum(arr, axis=0)) # Column sums: [4, 6]
print(np.sum(arr, axis=1)) # Row sums: [3, 7]`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day2', 'manipulation')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('broadcasting')}>Next: Broadcasting →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: BROADCASTING ───────────── */}
      {activeTab === 'broadcasting' && (
        <Section key="broadcasting" eyebrow="NumPy Day 2 • Dimensions" title="Broadcasting rules">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              <strong>Broadcasting</strong> allows arithmetic operations between arrays of different shapes by automatically extending the smaller array to match the larger dimensions.
            </p>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#b45309', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={18} /> Broadcasting Rules
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0 0 0.8rem 0', lineHeight: 1.6 }}>
                Two dimensions are compatible for broadcasting if:
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.8, fontSize: '0.88rem' }}>
                <li>They are completely equal, or</li>
                <li>One of the dimensions is exactly 1 (e.g. a scalar, single column, or single row).</li>
              </ul>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Broadcasting with a Scalar</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

arr = np.array([[1, 2], [3, 4]])

# Adding a scalar (10) to a 2D array
# NumPy automatically stretches 10 into [[10, 10], [10, 10]]
result = arr + 10
print(result)
# [[11 12]
#  [13 14]]

# Multiplying 3D Array by a Scalar
arr_3d = np.array([[[1, 2], [3, 4]]])
print(arr_3d * 2) # [[ [2, 4], [6, 8] ]]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Broadcasting compatible shapes</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
              <SyntaxHighlighter code={`# Array (3, 1) and Array (1, 3)
a = np.array([[1], [2], [3]])  # Shape (3, 1)
b = np.array([10, 20, 30])      # Shape (1, 3)

# Both get stretched to (3, 3) layout and added
print(a + b)
# [[11 21 31]
#  [12 22 32]
#  [13 23 33]]`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day2', 'ufuncs')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('sets')}>Next: Set Operations →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: SET OPERATIONS ─────────── */}
      {activeTab === 'sets' && (
        <Section key="sets" eyebrow="NumPy Day 2 • Sets" title="NumPy Set Operations">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy arrays support rapid set arithmetic operations, extremely useful for finding shared index parameters or unique values.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { name: 'Union: np.union1d()', desc: 'Finds all unique elements present in both input arrays combined.', code: 'np.union1d([1,2], [2,3]) # [1,2,3]' },
                { name: 'Intersection: np.intersect1d()', desc: 'Returns unique sorted items shared between both arrays.', code: 'np.intersect1d([1,2], [2,3]) # [2]' },
                { name: 'Difference: np.setdiff1d()', desc: 'Returns elements present in the first array but not in the second.', code: 'np.setdiff1d([1,2], [2,3]) # [1]' },
              ].map(item => (
                <div key={item.name} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#0284c7', marginBottom: '0.3rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.8rem' }}>{item.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#0f172a', color: '#e1e4e8', padding: '4px 8px', borderRadius: '4px', display: 'block', fontFamily: 'monospace' }}>{item.code}</code>
                </div>
              ))}
            </div>

            {/* Set calculator */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#1e40af', marginTop: 0, marginBottom: '0.5rem' }}>🛠️ Interactive Set Calculator</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Compute union, intersection, or difference of two lists.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.2rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Array A (comma-separated):</span>
                  <input type="text" value={setAInput} onChange={e => setSetAInput(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%', fontSize: '0.9rem' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Array B (comma-separated):</span>
                  <input type="text" value={setBInput} onChange={e => setSetBInput(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%', fontSize: '0.9rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem' }}>
                {['union', 'intersection', 'difference'].map(type => (
                  <button key={type} onClick={() => setSetOpType(type)}
                    style={{
                      background: setOpType === type ? '#0284c7' : '#fff',
                      color: setOpType === type ? '#fff' : '#475569',
                      border: '1px solid #cbd5e1',
                      padding: '0.4rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>
                    {type}
                  </button>
                ))}
              </div>

              <button onClick={computeSetOp} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '1rem' }}>
                Compute Set Operation
              </button>

              {setResult !== null && (
                <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.8rem 1.2rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Operation Result Array:</span>
                  <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '4px', color: '#0f172a' }}>
                    [ {setResult.join(', ')} ]
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day2', 'broadcasting')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: WORKSPACE PLAYGROUND ─────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="NumPy Operators Live Workspace">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Test your knowledge of array operators, broadcasting, and set logic. Select a challenge on the right and edit the code to solve it!
            </p>
            
            <NumpyAIPlayground
              dayId="day2"
              presets={day2Presets}
              challenges={day2Challenges}
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day2', 'sets')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 2 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 8: ASSESSMENT ─────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="NumPy Day 2 • Assessment" title="Day 2 Assessment — Operators &amp; Math">
          
          {/* Quick Mistakes panel */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={20} color="#f59e0b" /> Common NumPy Mistakes
            </h3>
            {[
              {
                mistake: 'Confusing element-wise multiplication with mathematical scaling',
                code: `import numpy as np\na = np.array([1, 2, 3])\nb = np.array([2, 2, 2])\n\n# ❌ Element-wise: multiplies each matching index\nprint(a * b) # [2, 4, 6]\n\n# ✅ Vectorized Scaling: multiplies all elements by scalar\nprint(a * 2) # [2, 4, 6]`
              },
              {
                mistake: 'Incompatible dimensions for broadcasting',
                code: `a = np.ones((3, 2))\nb = np.array([1, 2, 3])\n\n# ❌ ValueError: operands could not be broadcast together!\nprint(a + b)`
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
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day2', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
