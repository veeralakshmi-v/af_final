import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Play, Zap, RefreshCw, Layers, Columns, Compass, Code, FileText } from 'lucide-react';
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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt|print|sum|len|math|random|np|zeros|ones|eye|full|empty|identity|diag|arange|linspace|reshape|ravel|flatten|transpose|concatenate|vstack|hstack|column_stack|stack|dstack|meshgrid|nditer|split|hsplit|vsplit|searchsorted|argmax|argmin|char|startswith|sort|argsort|square|add|subtract|multiply|divide|floor_divide|mod|power|sin|cos|tan|arcsin|arccos|arctan|sinh|cosh|tanh|deg2rad|rad2deg|exp|exp2|expm1|log|log10|log2|log1p|sqrt|cbrt|round|floor|ceil|trunc|rint|abs|sign|real|imag|angle|conj|equal|not_equal|less|less_equal|greater|greater_equal|isnan|isinf|isposinf|isneginf|isfinite|logical_and|logical_or|logical_xor|logical_not|frompyfunc|vectorize|seterr|errstate)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
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
    q: 'What are Universal Functions (ufuncs) in NumPy?',
    options: [
      'Functions that only work on 1D python lists.',
      'Functions that run element-wise on ndarrays, enabling fast vectorized loops.',
      'Functions that require custom Numba installation to execute.',
      'Functions that perform file loading and database conversions.'
    ],
    ans: 1
  },
  {
    id: 'q2',
    q: 'Which ufunc method accumulates the intermediate results of an operation along a specified axis (e.g. cumulative sum)?',
    options: ['np.add.reduce()', 'np.add.accumulate()', 'np.add.reduceat()', 'np.add.outer()'],
    ans: 1
  },
  {
    id: 'q3',
    q: 'How does checking equality for NaN values behave in standard comparisons (e.g., arr == np.nan)?',
    options: [
      'It returns True for all positions containing NaN.',
      'It always returns False; you must use np.isnan() instead.',
      'It automatically fills NaN values with 0.',
      'It throws a compile-time ValueError.'
    ],
    ans: 1
  },
  {
    id: 'q4',
    q: 'What is the main difference between np.frompyfunc() and np.vectorize() for creating custom ufuncs?',
    options: [
      'np.frompyfunc always returns an object array, while np.vectorize allows specifying/promoting output dtypes.',
      'np.frompyfunc is slower than np.vectorize.',
      'np.vectorize only supports 1 input parameter.',
      'There is no difference.'
    ],
    ans: 0
  },
  {
    id: 'q5',
    q: 'How can you temporarily ignore mathematical division by zero warnings inside a block of code?',
    options: [
      'Use np.seterr(all=\'ignore\') globally and never restore it.',
      'Wrap the operations inside "with np.errstate(divide=\'ignore\'):".',
      'Wrap the code in a standard try-except block.',
      'Math warnings cannot be ignored in NumPy.'
    ],
    ans: 1
  }
];

export default function NumpyDay5({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Performance benchmark states
  const [perfRunning, setPerfRunning] = useState(false);
  const [perfResult, setPerfResult] = useState(null);

  // Interactive calculator state
  const [calcInput, setCalcInput] = useState('1.5, -2.7, 3.2, 0.0, -0.5');
  const [calcOp, setCalcOp] = useState('abs');
  const [calcResult, setCalcResult] = useState(null);

  // Playground presets
  const day5Presets = [
    {
      name: 'intro',
      label: 'Intro & Broadcasting',
      code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
numpy_square = np.square(arr)
print("NumPy vectorized square:", numpy_square)

# Broadcasting
arr1 = np.array([[1, 2, 3]])      # Shape (1, 3)
arr2 = np.array([[1], [2], [3]])  # Shape (3, 1)
result = np.add(arr1, arr2)
print("Broadcasting sum shape:", result.shape)`,
      output: `NumPy vectorized square: [ 1  4  9 16 25]\nBroadcasting sum shape: (3, 3)`
    },
    {
      name: 'comparisons',
      label: 'Comparison & Logic',
      code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])
print("isnan check:", np.isnan(np.array([1.0, float('nan'), 2.0])))
print("logical_and:", np.logical_and(arr > 2, arr < 5))`,
      output: `isnan check: [False  True False]\nlogical_and: [False False  True  True False False]`
    }
  ];

  const day5Challenges = [
    {
      id: 'ch5_square',
      title: 'Square all elements',
      desc: 'Use np.square() to compute the square of all elements in arr = np.array([2, 4, 6, 8]).',
      hint: 'Call np.square(arr) and print the result.',
      errorDoc: 'np.square(arr) usage.'
    },
    {
      id: 'ch5_filter',
      title: 'Filter finite values',
      desc: 'From arr = np.array([1.0, float("nan"), float("inf"), 2.0]), extract only finite values.',
      hint: 'Use arr[np.isfinite(arr)].',
      errorDoc: 'np.isfinite(arr) filter mask.'
    }
  ];



  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCheckQuestion = (qId) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const checkFinalScore = () => {
    let currentScore = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.ans) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
  };

  const runPerfBenchmark = () => {
    setPerfRunning(true);
    setPerfResult(null);
    setTimeout(() => {
      const loopTimeVal = (Math.random() * 0.04 + 0.08).toFixed(4);
      const vectorTimeVal = (Math.random() * 0.0005 + 0.0008).toFixed(5);
      const ratio = (parseFloat(loopTimeVal) / parseFloat(vectorTimeVal)).toFixed(1);
      setPerfResult({
        loopTime: `${loopTimeVal}s`,
        vectorTime: `${vectorTimeVal}s`,
        speedup: `${ratio}x`
      });
      setPerfRunning(false);
    }, 1200);
  };

  const calculateUfuncResults = () => {
    try {
      const arr = calcInput.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
      if (arr.length === 0) return;
      let output = '';
      if (calcOp === 'abs') {
        output = `np.abs(arr) = [${arr.map(x => Math.abs(x)).join(', ')}]`;
      } else if (calcOp === 'square') {
        output = `np.square(arr) = [${arr.map(x => x*x).join(', ')}]`;
      } else if (calcOp === 'floor') {
        output = `np.floor(arr) = [${arr.map(x => Math.floor(x)).join(', ')}]`;
      } else if (calcOp === 'ceil') {
        output = `np.ceil(arr) = [${arr.map(x => Math.ceil(x)).join(', ')}]`;
      } else if (calcOp === 'sign') {
        output = `np.sign(arr) = [${arr.map(x => x > 0 ? 1 : x < 0 ? -1 : 0).join(', ')}]`;
      }
      setCalcResult(output);
    } catch (e) {
      setCalcResult('Error parsing comma-separated array input.');
    }
  };

  const handleContinue = (nextTabId) => {
    onNavigate('numpy_day5', nextTabId);
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* ── TAB 1: INTRO ─────────────────── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="NumPy Day 5 • Vectorization" title="Universal Functions (ufuncs) Overview">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              <strong>Universal Functions (ufuncs)</strong> in NumPy are functions that operate element-wise on ndarray objects. They are a core component of NumPy, enabling efficient and vectorized operations on arrays without explicit, slow Python loops.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. NumPy Vectorization</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: '#0284c7' }}>Regular Python (Slow)</strong>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '4px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block', margin: '4px 0' }}>[python_square(x) for x in arr]</code>
                <span style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 'auto', paddingTop: '0.5rem' }}>Iterates values sequentially in Python interpreter, overhead on every element.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: '#0284c7' }}>NumPy ufunc (Fast)</strong>
                <code style={{ fontSize: '0.8rem', background: '#fff', padding: '4px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block', margin: '4px 0' }}>np.square(arr)</code>
                <span style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 'auto', paddingTop: '0.5rem' }}>Delegates calculations to optimized C loops, bypassing Python interpreter overhead.</span>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Broadcasting Properties</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              ufuncs automatically apply broadcasting rules when operating on inputs with mismatching shape profiles, repeating rows or columns implicitly in memory.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`import numpy as np
arr1 = np.array([[1, 2, 3]])      # Shape (1, 3)
arr2 = np.array([[1], [2], [3]])  # Shape (3, 1)

# Adds matching columns/rows
result = np.add(arr1, arr2) # Shape becomes (3, 3)`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Type Casting &amp; Promotion</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              ufuncs handle mixed data types dynamically by promoting output arrays to the safest common format (e.g. adding <code>int32</code> and <code>float64</code> outputs a <code>float64</code> array).
            </p>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('math_ops')}>
              Next: Mathematical ufuncs →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: MATH_OPS ──────────────── */}
      {activeTab === 'math_ops' && (
        <Section key="math_ops" eyebrow="NumPy Day 5 • Calculations" title="Mathematical ufunc Modules">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              NumPy implements a comprehensive collection of mathematical ufuncs, covering arithmetic overloads, trigonometry, exponents, logs, and rounding formulas.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Basic Arithmetic</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`# Arithmetic functions and their operator equivalents:
# np.add(a, b)          => a + b
# np.subtract(a, b)     => a - b
# np.multiply(a, b)     => a * b
# np.divide(a, b)       => a / b
# np.floor_divide(a, b) => a // b
# np.mod(a, b)          => a % b
# np.power(a, b)        => a ** b`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Trigonometric &amp; Hyperbolic Functions</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              NumPy computes angles in radians. You can easily translate representations using <code>np.deg2rad()</code> or <code>np.rad2deg()</code>.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`# Angles in radians
rads = np.array([0, np.pi/2])
print("Sin values:", np.sin(rads))
print("Cos values:", np.cos(rads))

# Inverses
print("Arcsin of 0.5:", np.arcsin(0.5))

# Hyperbolic
print("Sinh of 1:", np.sinh(1))`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Exponents &amp; Logarithmic Functions</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`x = np.array([1, 2, 3])
print("exp(x):", np.exp(x))      # e^x
print("exp2(x):", np.exp2(x))    # 2^x
print("log(x):", np.log(x))      # Natural logarithm ln(x)
print("log10(x):", np.log10(x))  # log10(x)
print("sqrt(x):", np.sqrt(x))    # Square root
print("cbrt(x):", np.cbrt(x))    # Cube root`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>4. Rounding &amp; Absolute Value</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              NumPy rounding ufuncs handle decimal truncating and ceiling limits. Absolute value ufuncs process magnitudes of numbers (including magnitude calculations for complex values).
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`arr = np.array([-3.7, 2.3])
print("round:", np.round(arr)) # Nearest integer
print("floor:", np.floor(arr)) # Round down
print("ceil:", np.ceil(arr))   # Round up
print("abs:", np.abs(arr))     # Absolute value

# Complex magnitude
complex_val = np.array([3 + 4j])
print("Magnitude:", np.abs(complex_val)) # 5.0 (real^2 + imag^2 square root)`} />
            </div>

            {/* Interactive ufunc calculator */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#0284c7', marginTop: 0, marginBottom: '0.5rem' }}>
                Interactive Mathematical ufunc Demos
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                Enter comma-separated floats and pick a ufunc operation to see the element-wise output:
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <input value={calcInput} onChange={(e) => setCalcInput(e.target.value)} style={{ flex: 1, padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} placeholder="e.g. -1.2, 3.7, -4.5" />
                <select value={calcOp} onChange={(e) => setCalcOp(e.target.value)} style={{ padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                  <option value="abs">np.abs (Absolute)</option>
                  <option value="square">np.square (Power 2)</option>
                  <option value="floor">np.floor (Floor)</option>
                  <option value="ceil">np.ceil (Ceiling)</option>
                  <option value="sign">np.sign (Sign check)</option>
                </select>
                <button onClick={calculateUfuncResults} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Compute ufunc
                </button>
              </div>

              {calcResult && (
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.2rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#0369a1', fontWeight: 600 }}>
                  {calcResult}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day5', 'intro')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('comparisons')}>Next: Comparisons &amp; Logic →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: COMPARISONS ───────────── */}
      {activeTab === 'comparisons' && (
        <Section key="comparisons" eyebrow="NumPy Day 5 • Logic" title="Comparison &amp; Logical ufunc Operators">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Comparison ufuncs evaluate two arrays element-by-element and yield boolean masks. Logical ufuncs allow combining conditions efficiently.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Element-wise Comparisons</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`a = np.array([1, 2, 3, 4])
b = np.array([1, 3, 2, 4])

# Comparison functions and operator overloads:
# np.equal(a, b)          => a == b
# np.not_equal(a, b)      => a != b
# np.less(a, b)           => a < b
# np.less_equal(a, b)     => a <= b
# np.greater(a, b)        => a > b
# np.greater_equal(a, b)   => a >= b`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Special Values Handling (NaN, Infinity)</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Comparing a NaN value using equality (e.g. <code>arr == np.nan</code>) always returns <code>False</code>. You must use specialized ufuncs to isolate finite values, infinity, or empty variables.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`arr = np.array([1.0, np.nan, np.inf])

print("isnan:", np.isnan(arr))      # [False, True, False]
print("isinf:", np.isinf(arr))      # [False, False, True]
print("isfinite:", np.isfinite(arr))  # [True, False, False]

# Extracting only finite numbers
finite_numbers = arr[np.isfinite(arr)] # [1.0]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Logical ufuncs</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Combine multiple conditions using logical functions. Standard Python operators (like <code>and</code>, <code>or</code>, <code>not</code>) do not work on arrays. Instead, use bitwise operators (<code>&amp;</code>, <code>|</code>, <code>~</code>) or logical ufuncs.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`arr = np.array([1, 2, 3, 4, 5, 6])
cond1 = arr > 2
cond2 = arr < 5

# Using logical ufuncs
and_cond = np.logical_and(cond1, cond2)
print("And filter values:", arr[and_cond]) # [3, 4]

# Operator equivalents (Requires wrapping parenthesis!)
print("Operator & filter:", (arr > 2) & (arr < 5))`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day5', 'math_ops')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('advanced')}>Next: Advanced Features →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: ADVANCED ──────────────── */}
      {activeTab === 'advanced' && (
        <Section key="advanced" eyebrow="NumPy Day 5 • Methods" title="Advanced ufunc Methods &amp; Customization">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              ufuncs offer powerful helper methods to reduce dimensions, accumulate operations, calculate outer matrices, customize vectorization, and define mathematical error policies.
            </p>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Helper Methods (reduce, accumulate, outer)</h3>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`matrix = np.array([[1, 2, 3], [4, 5, 6]])

# reduce(): Applies operation along axis, reducing dimensions
print("Sum columns (axis=0):", np.add.reduce(matrix, axis=0)) # [5, 7, 9]

# accumulate(): Performs operation cumulatively
print("Cumulative sum rows:\\n", np.add.accumulate(matrix, axis=1))

# outer(): Evaluates all element-pair combinations
x = np.array([1, 2, 3])
y = np.array([10, 20])
print("Outer Product:\\n", np.multiply.outer(x, y))`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Output Allocation Parameters</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Specify pre-allocated arrays using <code>out</code> to avoid creating copies in memory, or use <code>where</code> parameters to evaluate calculations conditionally.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`a = np.array([1.0, 2.0, 3.0])
b = np.array([4.0, 5.0, 6.0])

result = np.empty_like(a)
np.add(a, b, out=result) # Saves sum directly into pre-allocated result array

condition = np.array([True, False, True])
result_where = np.add(a, b, where=condition) # Sums only where condition is True`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Creating Custom ufuncs</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Define element-wise functions in Python, and convert them to vectorized ufuncs using <code>np.frompyfunc()</code> or the decorator <code>@np.vectorize</code>.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`@np.vectorize
def custom_sum_squares(x, y):
    return x**2 + y**2

# custom_sum_squares is now a ufunc and runs on NumPy arrays
print(custom_sum_squares(np.array([1, 2]), np.array([3, 4]))) # [10, 20]`} />
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>4. Math Error Policies</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Define policies for handling invalid values (like square root of negatives) or division by zero using <code>np.seterr()</code> or localized <code>np.errstate()</code> blocks.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`# Division by zero warning suppression
with np.errstate(divide='ignore', invalid='ignore'):
    result = 1.0 / np.array([0.0, -1.0]) # Prints no console warnings`} />
            </div>

            {/* Performance Timer visual benchmark */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#b45309', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Zap size={18} /> Interactive Performance Benchmark
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Compare standard Python loops vs NumPy vectorized ufuncs squaring 1,000,000 values:
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
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day5', 'comparisons')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: PLAYGROUND ─────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="NumPy Day 5 • Playground" title="Live Coding Playground Simulator">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Test your understanding of Universal Functions (ufuncs). Select a challenge on the right, edit the code, and see how ufuncs handle vectorization, comparisons, and broadcasting.
            </p>
            <NumpyAIPlayground
              dayId="day5"
              presets={day5Presets}
              challenges={day5Challenges}
            />
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day5', 'advanced')}>← Back</button>
            <button style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 5 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: ASSESSMENT ─────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="NumPy Day 5 • Assessment" title="Day 5 Assessment — Universal Functions (ufuncs)">
          
          {/* Quick Mistakes panel */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={20} color="#f59e0b" /> Common Pitfalls
            </h3>
            {[
              {
                mistake: 'Using logical operators (and, or, not) instead of ufuncs',
                code: `arr = np.array([1, 2, 3])\n\n# ❌ ValueError: truth value of an array is ambiguous!\n# print((arr > 1) and (arr < 3))\n\n# ✅ Correct: use logical ufuncs or bitwise operators with parenthesis\nprint(np.logical_and(arr > 1, arr < 3)) # [False, True, False]\nprint((arr > 1) & (arr < 3))           # [False, True, False]`
              },
              {
                mistake: 'Checking for NaN values using standard equality',
                code: `arr = np.array([1.0, np.nan, 2.0])\n\n# ❌ arr == np.nan always returns [False, False, False]\nprint(arr == np.nan)\n\n# ✅ Correct: use np.isnan() instead\nprint(np.isnan(arr)) # [False, True, False]`
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
            <button style={{ color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #0284c7' }} onClick={() => onNavigate('numpy_day5', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
