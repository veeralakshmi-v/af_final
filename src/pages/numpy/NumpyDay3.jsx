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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt|print|sum|len|math|random|np|zeros|ones|eye|full|empty|identity|diag|arange|linspace|logspace|sqrt|power|exp|log|log10|log2|abs|round|floor|ceil|sin|cos|tan|astype|dtype|where|any|all|percentile|char)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
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
    q: 'Which function creates a new typecasted array in NumPy without modifying the original array?',
    options: ['arr.typecast()', 'arr.astype()', 'arr.convert()', 'arr.dtype()'],
    ans: 1
  },
  {
    id: 'q2',
    q: 'What does np.where(arr > 5, arr, 0) return?',
    options: [
      'Indices where elements are greater than 5.',
      'An array where elements greater than 5 are kept, and others are replaced with 0.',
      'A boolean mask of true/false values.',
      'The sum of elements greater than 5.'
    ],
    ans: 1
  },
  {
    id: 'q3',
    q: 'Which slicing syntax reverses the elements of a 1D NumPy array?',
    options: ['arr[::1]', 'arr[::-1]', 'arr[reverse]', 'arr[-1:0]'],
    ans: 1
  },
  {
    id: 'q4',
    q: 'How do you check if any element in a boolean array is True?',
    options: ['np.all()', 'np.any()', 'np.where()', 'arr.has_any()'],
    ans: 1
  },
  {
    id: 'q5',
    q: 'Which bound formula is commonly used with Interquartile Range (IQR) to detect outliers?',
    options: ['Q1 - IQR / Q3 + IQR', 'Q1 - 1.5 * IQR / Q3 + 1.5 * IQR', 'Mean +/- 2 * StdDev', 'Median +/- IQR'],
    ans: 1
  }
];

export default function NumpyDay3({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Trig calculator states
  const [angleInput, setAngleInput] = useState('45');
  const [trigResults, setTrigResults] = useState(null);

  // Rounding visualizer
  const [roundNumber, setRoundNumber] = useState('1.5');

  // Indexing/Slicing Interactive Simulator
  const sliceSampleArray = [10, 20, 30, 40, 50, 60, 70];
  const [sliceStart, setSliceStart] = useState('1');
  const [sliceStop, setSliceStop] = useState('4');
  const [sliceStep, setSliceStep] = useState('1');

  // Filtering Interactive Simulator
  const [filterThreshold, setFilterThreshold] = useState(30);

  // Interactive Code Playground
  const day3Presets = [
    {
      name: 'slicing',
      label: 'Slicing',
      code: `import numpy as np

arr = np.array([10, 20, 30, 40, 50, 60, 70])
print("Slice [1:4]:", arr[1:4])
print("Every 2nd element:", arr[::2])`,
      output: `Slice [1:4]: [20 30 40]\nEvery 2nd element: [10 30 50 70]`
    },
    {
      name: 'boolean_filter',
      label: 'Boolean Indexing',
      code: `import numpy as np

arr = np.array([15, 22, 45, 62, 88, 30])
print("Even elements:", arr[arr % 2 == 0])`,
      output: `Even elements: [22 62 88 30]`
    }
  ];

  const day3Challenges = [
    {
      id: 'ch3_even',
      title: 'Filter Evens',
      desc: 'Use boolean indexing to filter and print all even values from the array: arr = np.array([11, 12, 13, 14, 15, 16, 17, 18, 19]).',
      hint: 'Use the condition: arr[arr % 2 == 0].',
      errorDoc: 'boolean filter mask like arr[arr % 2 == 0].'
    },
    {
      id: 'ch3_where',
      title: 'Replace elements with np.where',
      desc: 'Replace all elements greater than 30 with itself, and others with 0 in array: arr = np.array([10, 20, 30, 40, 50, 25]).',
      hint: 'Use np.where(arr > 30, arr, 0).',
      errorDoc: 'np.where(arr > 30, arr, 0) expression.'
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
    onNavigate('numpy_day3', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trig calculator
  const calculateTrig = () => {
    const deg = parseFloat(angleInput) || 0;
    const rad = (deg * Math.PI) / 180;
    setTrigResults({
      rad: rad.toFixed(4),
      sin: Math.sin(rad).toFixed(4),
      cos: Math.cos(rad).toFixed(4),
      tan: Math.abs(deg % 180) === 90 ? 'Undefined (∞)' : Math.tan(rad).toFixed(4)
    });
  };

  // Helper for computing sliced index highlight
  const getSlicedIndices = () => {
    const start = parseInt(sliceStart, 10);
    const stop = parseInt(sliceStop, 10);
    const step = parseInt(sliceStep, 10);
    if (isNaN(start) || isNaN(stop) || isNaN(step) || step === 0) return [];
    
    const indices = [];
    if (step > 0) {
      for (let i = start; i < stop && i < sliceSampleArray.length; i += step) {
        if (i >= 0) indices.push(i);
      }
    } else {
      for (let i = start; i > stop && i >= 0; i += step) {
        if (i < sliceSampleArray.length) indices.push(i);
      }
    }
    return indices;
  };

  const activeSlicedIndices = getSlicedIndices();

  return (
    <AnimatePresence mode="wait">
      
      {/* ── TAB 1: MATH OPERATIONS ────────── */}
      {activeTab === 'table' && (
        <Section key="table" eyebrow="NumPy Day 3 • Math &amp; Filtering" title="Mathematical Operations in NumPy">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy arrays support compiled vector math libraries (ufuncs) that execute operations instantly across multidimensional grids.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Core Math Ufuncs Reference</h3>
            <div style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ padding: '0.8rem 1.2rem', color: '#0f172a', fontWeight: 'bold' }}>Function</th>
                    <th style={{ padding: '0.8rem 1.2rem', color: '#0f172a', fontWeight: 'bold' }}>Description</th>
                    <th style={{ padding: '0.8rem 1.2rem', color: '#0f172a', fontWeight: 'bold' }}>Notation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { fn: 'np.sqrt(x)', desc: 'Square root of each element.', math: '√x' },
                    { fn: 'np.power(x, y)', desc: 'Exponentiation (base x raised to power y).', math: 'xʸ' },
                    { fn: 'np.exp(x)', desc: 'Natural exponential (Euler\'s constant e^x).', math: 'eˣ' },
                    { fn: 'np.log(x) / np.log10()', desc: 'Natural logarithm (ln) and common base-10 log.', math: 'ln(x) / log(x)' },
                    { fn: 'np.abs(x)', desc: 'Returns positive absolute value.', math: '|x|' },
                    { fn: 'np.round(x) / np.floor()', desc: 'Decimal rounding and flooring (rounds down).', math: 'round(x) / ⌊x⌋' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ padding: '0.8rem 1.2rem', fontFamily: 'monospace', color: '#0284c7', fontWeight: 600 }}>{row.fn}</td>
                      <td style={{ padding: '0.8rem 1.2rem', color: '#475569' }}>{row.desc}</td>
                      <td style={{ padding: '0.8rem 1.2rem', fontFamily: 'monospace', color: '#334155' }}>{row.math}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Trig degrees-to-radians interactive */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#1e40af', marginTop: 0, marginBottom: '0.5rem' }}>📐 Degree-to-Radian Trig Calculator</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Angles in NumPy math formulas must be inputted in <strong>radians</strong>. Enter degrees to convert:
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Degrees:</span>
                <input type="number" value={angleInput} onChange={e => setAngleInput(e.target.value)} style={{ padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '120px' }} />
                <button onClick={calculateTrig} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.45rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>
                  Convert &amp; Calc
                </button>
              </div>
              {trigResults && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Radians</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{trigResults.rad}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#10b981' }}>np.sin()</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981' }}>{trigResults.sin}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#3b82f6' }}>np.cos()</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#3b82f6' }}>{trigResults.cos}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#f59e0b' }}>np.tan()</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f59e0b' }}>{trigResults.tan}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('datatypes')}>
              Next: Data Types &amp; Casting →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: DATA TYPES ────────────── */}
      {activeTab === 'datatypes' && (
        <Section key="datatypes" eyebrow="NumPy Day 3 • Types" title="Data Types &amp; Type Casting">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Unlike standard Python lists which can store mixed items, NumPy arrays are strictly **homogeneous** (all elements must share the same data type) for optimal caching and vector operations.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Checking Array Type (`.dtype`)</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Use the <code>.dtype</code> parameter attribute to identify the memory size and class format layout of your arrays.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

a = np.array([1, 2, 3], dtype=np.int32)
print(a.dtype) # int32

b = np.array([1.0, 2.5], dtype=np.float64)
print(b.dtype) # float64

# String array with fixed max-length bounds
c = np.array(["Hello", "World"], dtype='U10') # Unicode string up to 10 chars`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Type Casting (`.astype()`)</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              To convert an array type, use <code>.astype()</code>. Note: <strong>This creates a copy</strong> and does not mutate the original array in-place.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`arr = np.array([1, 2, 3])
float_arr = arr.astype(float)
print(float_arr)       # [1. 2. 3.]
print(float_arr.dtype) # float64

# Converting string list to integer array
str_arr = np.array(["1", "2", "3"])
int_arr = str_arr.astype(int)
print(int_arr) # [1 2 3]`} />
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ fontWeight: 700, color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={18} /> Important Note on Casting
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                Casting floating numbers to integers in NumPy will always **truncate (floor)** the decimal fraction rather than round to the nearest integer. E.g., <code>np.array([1.9]).astype(int)</code> yields <code>[1]</code>.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day3', 'table')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('indexing')}>Next: Indexing &amp; Slicing →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: INDEXING & SLICING ─────── */}
      {activeTab === 'indexing' && (
        <Section key="indexing" eyebrow="NumPy Day 3 • Indexing" title="Array Indexing &amp; Slicing">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy arrays support positive/negative index slicing, strides, step ranges, and multi-dimensional matrices sub-section isolation.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1D Positive &amp; Negative Indexing</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`arr = np.array([10, 20, 30, 40, 50])

print(arr[0])   # Positive: 10 (first item)
print(arr[-1])  # Negative: 50 (last item)
print(arr[-2])  # Negative: 40 (second to last)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Slicing Syntax: `[start:stop:step]`</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`arr = np.array([10, 20, 30, 40, 50, 60, 70])

print(arr[1:4])  # Basic slicing: [20, 30, 40]
print(arr[:3])   # Omit start: [10, 20, 30] (first 3)
print(arr[::2])  # Steps: [10, 30, 50, 70] (every 2nd element)
print(arr[::-1]) # Reverse Slicing: [70, 60, 50, 40, 30, 20, 10]
print(arr[-4:-1]) # Negative indexing slice: [40, 50, 60]`} />
            </div>

            {/* Interactive Slicing Simulator */}
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '1.2rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#0369a1', marginTop: 0, marginBottom: '0.8rem' }}>🔄 Interactive Array Slicing Simulator</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Modify index values below to see how slicing operates on the array: <code>[10, 20, 30, 40, 50, 60, 70]</code>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Start Index:</span>
                  <input type="number" value={sliceStart} onChange={e => setSliceStart(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Stop Index:</span>
                  <input type="number" value={sliceStop} onChange={e => setSliceStop(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Step:</span>
                  <input type="number" value={sliceStep} onChange={e => setSliceStep(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {sliceSampleArray.map((val, idx) => {
                  const isHighlighted = activeSlicedIndices.includes(idx);
                  return (
                    <div key={idx} style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      background: isHighlighted ? '#0284c7' : '#f8fafc',
                      color: isHighlighted ? '#fff' : '#64748b',
                      border: `2px solid ${isHighlighted ? '#0284c7' : '#cbd5e1'}`,
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      minWidth: '50px',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>[{idx}]</div>
                      <div style={{ fontSize: '1.1rem' }}>{val}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.8rem 1.2rem', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Operation Result:</span>
                <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '4px', color: '#0f172a' }}>
                  [ {activeSlicedIndices.map(i => sliceSampleArray[i]).join(', ')} ]
                </div>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2D Matrix Indexing and Slicing</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Unlike nested Python lists that require <code>matrix[r][c]</code>, NumPy uses single bracket comma spacing <code>matrix[r, c]</code> which is cleaner and far more efficient.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`matrix = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
])

print(matrix[1, 2]) # Row 1, Col 2: 7

# Slicing center 2x2 sub-matrix
# Row range 1 to 3 (exclusive of 3), Col range 1 to 3
print(matrix[1:3, 1:3])
# [[ 6  7]
#  [10 11]]

print(matrix[:, 1])  # All rows, Column 1: [2, 6, 10]
print(matrix[1, :])  # Row 1, All columns: [5, 6, 7, 8]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Modifying Arrays via Slicing</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              You can assign values directly to sliced segments of arrays to update multiple items at once.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
              <SyntaxHighlighter code={`arr = np.array([1, 2, 3, 4, 5])
arr[1:4] = [20, 30, 40]
print(arr) # [1, 20, 30, 40, 50]

# Replacing segment with scalar stretches it
arr[1:3] = 100
print(arr) # [1, 100, 100, 40, 50]`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day3', 'datatypes')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('filtering')}>Next: Conditional Filtering →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: CONDITIONAL FILTERING ──── */}
      {activeTab === 'filtering' && (
        <Section key="filtering" eyebrow="NumPy Day 3 • Filter" title="Conditional Filtering">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Filtering allows you to extract elements from an array that meet specific conditions using **Boolean Masking**.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>How Boolean Masking Works</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              When you evaluate a condition on an array, NumPy returns a boolean array of same shape. Indexing with this boolean array returns only the elements where the value is <code>True</code>.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np

numbers = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Condition returns boolean array:
mask = numbers % 2 == 0
print(mask) # [False True False True False True False True False True]

# Indexing with mask returns matching items
evens = numbers[mask]
print(evens) # [2, 4, 6, 8, 10]

# All numbers greater than 5
print(numbers[numbers > 5]) # [6, 7, 8, 9, 10]`} />
            </div>

            {/* Interactive Filter Simulator */}
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '1.2rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#0369a1', marginTop: 0, marginBottom: '0.8rem' }}>⚡ Live Boolean Filtering Simulator</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Filter elements in the array: <code>[10, 25, 30, 45, 50, 15, 35]</code> based on value threshold:
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Filter values &gt; :</span>
                <input type="range" min="10" max="50" step="5" value={filterThreshold} onChange={e => setFilterThreshold(parseInt(e.target.value, 10))} style={{ flex: 1 }} />
                <span style={{ fontSize: '1rem', fontWeight: 'bold', width: '40px' }}>{filterThreshold}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {[10, 25, 30, 45, 50, 15, 35].map((val, idx) => {
                  const isPassed = val > filterThreshold;
                  return (
                    <div key={idx} style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      background: isPassed ? '#10b981' : '#f8fafc',
                      color: isPassed ? '#fff' : '#94a3b8',
                      border: `2px solid ${isPassed ? '#10b981' : '#cbd5e1'}`,
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }}>
                      {val}
                    </div>
                  );
                })}
              </div>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Filtering Strings &amp; Structured Arrays</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`# Filter strings by length
words = np.array(["python", "java", "c", "javascript", "go"])
long_words = words[np.char.str_len(words) > 4]
print(long_words) # ['python' 'javascript']

# Custom array prime filter
def is_prime_array(arr):
    primes = []
    for n in arr:
        if n < 2: continue
        if np.all(n % np.arange(2, int(np.sqrt(n)) + 1) != 0):
            primes.append(n)
    return np.array(primes)

numbers = np.array([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
print(is_prime_array(numbers)) # [2, 3, 5, 7, 11]`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day3', 'indexing')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('conditionals')}>Next: Conditionals (where, any, all) →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: CONDITIONALS ───────────── */}
      {activeTab === 'conditionals' && (
        <Section key="conditionals" eyebrow="NumPy Day 3 • Conditionals" title="any(), all(), where() Functions">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy conditional functions provide fast evaluation rules to aggregate checks or replace elements dynamically.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Logical Aggregations: `np.any()` &amp; `np.all()`</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0f172a' }}>np.any()</strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0 0' }}>Returns <code>True</code> if <strong>at least one</strong> element meets the condition.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0f172a' }}>np.all()</strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '4px 0 0 0' }}>Returns <code>True</code> only if <strong>every single</strong> element meets the condition.</p>
              </div>
            </div>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`numbers = np.array([2, 4, 6, 8, 10])

print(np.all(numbers % 2 == 0)) # True (all numbers are even)
print(np.any(numbers > 8))      # True (10 is greater than 8)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Dynamic Replacements &amp; Searches: `np.where()`</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <code>np.where(condition, [x, y])</code> can be used in two ways:
            </p>
            <ul style={{ margin: '0 0 1rem 0', paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.6, fontSize: '0.88rem' }}>
              <li><strong>With 3 parameters:</strong> Evaluates condition; returns <code>x</code> where True, <code>y</code> where False.</li>
              <li><strong>With 1 parameter:</strong> Returns the indices of elements that are True.</li>
            </ul>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`arr = np.array([10, 25, 30, 45, 50, 15, 35])

# Example 1: Finding indices
indices = np.where(arr > 30)[0]
print(indices) # [3 4 6]

# Example 2: Conditional replacements
# Replace elements > 30 with value itself, others with 0
result = np.where(arr > 30, arr, 0)
print(result) # [ 0  0  0 45 50  0 35]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>Multiple Condition Masking on Structured Arrays</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
              <SyntaxHighlighter code={`# Define structured students list
students = np.array([
    ("Alice",   20, 85),
    ("Bob",     22, 78),
    ("Charlie", 19, 92),
    ("Diana",   21, 88)
], dtype=[("name", "U10"), ("age", "i4"), ("grade", "i4")])

# Age >= 20 and Grade >= 85
mask = (students["age"] >= 20) & (students["grade"] >= 85)
high_achievers = students[mask]

print(high_achievers["name"]) # ['Alice' 'Diana']`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day3', 'filtering')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('advanced')}>Next: Data Cleaning &amp; Outliers →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: DATA CLEANING ──────────── */}
      {activeTab === 'advanced' && (
        <Section key="advanced" eyebrow="NumPy Day 3 • Clean" title="Outlier Cleaning &amp; Time Series Filtering">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy arrays excel at data pre-processing pipelines such as outlier removal and time-series date indexing.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Removing Outliers via IQR Bounds</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              The <strong>Interquartile Range (IQR)</strong> method uses statistical percentiles to calculate bounds and filter anomalous elements from the dataset.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`import numpy as np

data = np.array([1, 2, 3, 100, 4, 5, 6, -50, 7, 8, 9]) # 100 and -50 are outliers

# Calculate quartiles
q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1

# Define boundaries
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

# Remove outliers using boolean masks
clean_data = data[(data >= lower_bound) & (data <= upper_bound)]

print("Original:", data)
print("Cleaned :", clean_data) # [1 2 3 4 5 6 7 8 9]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Time Series Filtering</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Filter datasets between specific ranges of timestamps:
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
              <SyntaxHighlighter code={`# Simulate time series data
dates = np.array([np.datetime64('2024-01-01') + np.timedelta64(i, 'D') for i in range(10)])
values = np.array([10, 12, 8, 15, 20, 18, 22, 25, 19, 16])

# Filter range
start_date = np.datetime64('2024-01-05')
end_date = np.datetime64('2024-01-08')

mask = (dates >= start_date) & (dates <= end_date)

print("Filtered Dates :", dates[mask])
print("Filtered Values:", values[mask])`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day3', 'conditionals')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Coding Lab →</button>
          </div>
        </Section>
      )}


      {/* ── TAB 7: PLAYGROUND ────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="NumPy Operators Live Workspace">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Test your knowledge of array slicing, casting, and logical masking. Select a challenge on the right and edit the code to solve it!
            </p>
            <NumpyAIPlayground
              dayId="day3"
              presets={day3Presets}
              challenges={day3Challenges}
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day3', 'advanced')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 3 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 8: ASSESSMENT ─────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="NumPy Day 3 • Assessment" title="Day 3 Assessment — Slicing &amp; Filtering">
          
          {/* Quick Mistakes panel */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={20} color="#f59e0b" /> Common Mistakes
            </h3>
            {[
              {
                mistake: 'Slicing returns a VIEW, not a COPY',
                code: `# Modifying a slice alters the original array too!\narr = np.array([1, 2, 3])\nslice_view = arr[0:2]\nslice_view[0] = 99\n\nprint(arr) # ❌ Output: [99, 2, 3]! Original mutated.\n\n# ✅ Correct: use .copy() if you want a separate array\nslice_copy = arr[0:2].copy()`
              },
              {
                mistake: 'Using python keywords (and, or) on NumPy boolean arrays',
                code: `arr = np.array([1, 2, 3])\n\n# ❌ ValueError: truth value of an array is ambiguous!\n# print((arr > 1) and (arr < 3))\n\n# ✅ Correct: use bitwise operands & (and), | (or)\nprint((arr > 1) & (arr < 3)) # [False True False]`
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
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day3', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
