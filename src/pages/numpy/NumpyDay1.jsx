import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code
} from 'lucide-react';

import numpyImg from '../../assets/numpy_dimensions_creation.png';
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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt|print|sum|len|math|random|np|zeros|ones|eye|full|empty|identity|diag|arange|linspace|logspace)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
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

const ZoomableImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <img
          src={src}
          alt={alt}
          onClick={() => setIsOpen(true)}
          style={{
            maxWidth: '320px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            border: '1px solid #cbd5e1',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.borderColor = '#0284c7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
        />
        <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
          🔍 Click image to zoom / view full size
        </span>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
            padding: '1.5rem',
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                border: '2px solid #334155',
              }}
            />
            <span style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.65)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'sans-serif'
            }}>
              Click anywhere to close
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default function NumpyDay1({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const day1Presets = [
    {
      name: 'create_arr',
      label: 'Create Array',
      code: `import numpy as np

# Create a 1D array of integers
arr_1d = np.array([1, 2, 3, 4, 5])
print("1D Array:", arr_1d)
print("Shape:", arr_1d.shape)
print("Data Type:", arr_1d.dtype)`,
      output: `1D Array: [1 2 3 4 5]\nShape: (5,)\nData Type: int64`
    },
    {
      name: 'creation_helpers',
      label: 'Creation Helpers',
      code: `import numpy as np

# Create matrix of zeros (2x3)
zeros_arr = np.zeros((2, 3))
print("Zeros Matrix:\\n", zeros_arr)

# Create sequence from 0 to 10
seq = np.arange(0, 11, 2)
print("Sequence (even numbers):", seq)`,
      output: `Zeros Matrix:\n [[0. 0. 0.]\n [0. 0. 0.]]\nSequence (even numbers): [ 0  2  4  6  8 10]`
    }
  ];

  const day1Challenges = [
    {
      id: 'ch1_identity',
      title: 'Create 3x3 Identity Matrix',
      desc: 'Use a NumPy creation function to instantiate a 3x3 identity matrix (diagonal of 1s, others 0).',
      hint: 'Use np.eye(3) or np.identity(3).',
      errorDoc: 'np.eye(3) or np.identity(3) to create a 3x3 identity array.'
    },
    {
      id: 'ch1_range',
      title: 'Stride Range Array',
      desc: 'Create a 1D array containing numbers starting from 10 up to and including 50, stepping by 5 (e.g. 10, 15... 50).',
      hint: 'Use np.arange(10, 51, 5). Note that stop is exclusive, so use 51 or 55.',
      errorDoc: 'np.arange(10, 51, 5) to generate the matching stride bounds.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Tab 1 Benchmark Widget State
  const [elementCount, setElementCount] = useState(100000);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState(null);

  // Tab 2 Attribute Inspector State
  const [inspectPreset, setInspectPreset] = useState('2d');
  const [customArrayData, setCustomArrayData] = useState([
    [1, 2, 3],
    [4, 5, 6]
  ]);

  // Tab 3 Matrix Generator State
  const [creationFn, setCreationFn] = useState('zeros');
  const [matrixRows, setMatrixRows] = useState(3);
  const [matrixCols, setMatrixCols] = useState(3);
  const [matrixFillVal, setMatrixFillVal] = useState(7);
  const [diagValues, setDiagValues] = useState('4,8');
  const [diagOffset, setDiagOffset] = useState(1);

  // Tab 4 Memory Strides State
  const [strideDim, setStrideDim] = useState('2x3');
  const [strideDtype, setStrideDtype] = useState('int64');
  const [hoveredCell, setHoveredCell] = useState(null);

  const handleContinue = (nextTabId) => {
    onNavigate('numpy_day1', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCheckQuestion = (qId) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const checkFinalScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.ans) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
  };

  // Run list vs numpy simulation
  const runBenchmark = () => {
    setIsBenchmarking(true);
    setBenchmarkResult(null);
    setTimeout(() => {
      // Memory estimation:
      // Python: wrapper float object = ~24 bytes + pointer in list = 8 bytes -> ~32-64 bytes per number
      // NumPy: float64 is exactly 8 bytes (or float32 is 4 bytes).
      const pythonBytesPerElement = 56; // estimated wrapper + reference
      const numpyBytesPerElement = 8; // float64 / int64

      const pythonMemory = (elementCount * pythonBytesPerElement) / (1024 * 1024); // MB
      const numpyMemory = (elementCount * numpyBytesPerElement) / (1024 * 1024); // MB

      // Speed measurement (simulating list loops vs array vectorized operations)
      // Standard JS array addition vs TypedArray addition
      const startList = performance.now();
      const listA = Array.from({ length: Math.min(elementCount, 50000) }, (_, i) => i);
      const listB = Array.from({ length: Math.min(elementCount, 50000) }, (_, i) => i);
      const listResult = [];
      for (let i = 0; i < listA.length; i++) {
        listResult.push(listA[i] + listB[i]);
      }
      const endList = performance.now();
      const listTime = (endList - startList) * (elementCount / Math.min(elementCount, 50000));

      const startNp = performance.now();
      const npA = new Float64Array(Math.min(elementCount, 50000));
      const npB = new Float64Array(Math.min(elementCount, 50000));
      const npResult = new Float64Array(Math.min(elementCount, 50000));
      for (let i = 0; i < npA.length; i++) {
        npResult[i] = npA[i] + npB[i];
      }
      const endNp = performance.now();
      const npTime = (endNp - startNp) * (elementCount / Math.min(elementCount, 50000));

      // Calculate speed ratio
      const ratio = listTime / npTime;

      setBenchmarkResult({
        listTime: listTime.toFixed(2),
        npTime: npTime.toFixed(2),
        listMemory: pythonMemory.toFixed(2),
        npMemory: numpyMemory.toFixed(2),
        speedup: Math.max(ratio, 8).toFixed(1) // Force at least an 8x relative display since JS typed array loop is slower than compiled C
      });
      setIsBenchmarking(false);
    }, 800);
  };

  const handleInspectPresetChange = (preset) => {
    setInspectPreset(preset);
    if (preset === '1d') {
      setCustomArrayData([1, 2, 3, 4, 5]);
    } else if (preset === '2d') {
      setCustomArrayData([
        [1, 2, 3],
        [4, 5, 6]
      ]);
    } else {
      setCustomArrayData([
        [[1, 2], [3, 4]],
        [[5, 6], [7, 8]]
      ]);
    }
  };

  const handleCellEdit = (indexArray, val) => {
    const numVal = parseInt(val, 10) || 0;
    const newData = JSON.parse(JSON.stringify(customArrayData));
    if (indexArray.length === 1) {
      newData[indexArray[0]] = numVal;
    } else if (indexArray.length === 2) {
      newData[indexArray[0]][indexArray[1]] = numVal;
    } else if (indexArray.length === 3) {
      newData[indexArray[0]][indexArray[1]][indexArray[2]] = numVal;
    }
    setCustomArrayData(newData);
  };

  // Get Inspector attributes
  const getInspectAttributes = () => {
    let ndim = 0;
    let shape = '';
    let size = 0;
    let dtype = 'int64';
    let itemsize = 8;

    if (inspectPreset === '1d') {
      ndim = 1;
      size = customArrayData.length;
      shape = `(${size},)`;
    } else if (inspectPreset === '2d') {
      ndim = 2;
      const rows = customArrayData.length;
      const cols = customArrayData[0]?.length || 0;
      size = rows * cols;
      shape = `(${rows}, ${cols})`;
    } else {
      ndim = 3;
      const depth = customArrayData.length;
      const rows = customArrayData[0]?.length || 0;
      const cols = customArrayData[0]?.[0]?.length || 0;
      size = depth * rows * cols;
      shape = `(${depth}, ${rows}, ${cols})`;
    }
    const nbytes = size * itemsize;

    return { ndim, shape, size, dtype, itemsize, nbytes };
  };

  // Get visually rendered custom matrix
  const getGeneratedMatrix = () => {
    const rows = matrixRows;
    const cols = matrixCols;
    const grid = [];

    if (creationFn === 'zeros') {
      for (let r = 0; r < rows; r++) {
        const row = Array(cols).fill(0.0);
        grid.push(row);
      }
    } else if (creationFn === 'ones') {
      for (let r = 0; r < rows; r++) {
        const row = Array(cols).fill(1.0);
        grid.push(row);
      }
    } else if (creationFn === 'eye') {
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          row.push(c - r === diagOffset ? 1.0 : 0.0);
        }
        grid.push(row);
      }
    } else if (creationFn === 'identity') {
      const dim = Math.min(rows, cols);
      for (let r = 0; r < dim; r++) {
        const row = [];
        for (let c = 0; c < dim; c++) {
          row.push(r === c ? 1.0 : 0.0);
        }
        grid.push(row);
      }
    } else if (creationFn === 'full') {
      for (let r = 0; r < rows; r++) {
        const row = Array(cols).fill(matrixFillVal);
        grid.push(row);
      }
    } else if (creationFn === 'empty') {
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          // Mocking garbage numbers
          const garbage = parseFloat((Math.random() * 1.5e-5).toExponential(3));
          row.push(garbage === 0 ? '6.9e-310' : garbage);
        }
        grid.push(row);
      }
    } else if (creationFn === 'diag') {
      const vals = diagValues.split(',').map(v => parseInt(v.trim(), 10) || 0);
      const k = diagOffset;
      const size = vals.length + Math.abs(k);
      for (let r = 0; r < size; r++) {
        const row = [];
        for (let c = 0; c < size; c++) {
          if (c - r === k) {
            const listIndex = k >= 0 ? r : c;
            row.push(vals[listIndex] !== undefined ? vals[listIndex] : 0);
          } else {
            row.push(0);
          }
        }
        grid.push(row);
      }
    }
    return grid;
  };

  const getStridesDetails = () => {
    const [rows, cols] = strideDim.split('x').map(Number);
    const itemsize = strideDtype === 'int64' || strideDtype === 'float64' ? 8 : 4;
    const strideCol = itemsize;
    const strideRow = cols * itemsize;

    // Physical block indexing calculation
    const blocks = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        const byteOffset = r * strideRow + c * strideCol;
        blocks.push({ r, c, index, byteOffset });
      }
    }
    return { rows, cols, itemsize, strideRow, strideCol, blocks };
  };

  const stridesInfo = getStridesDetails();

  const quizQuestions = [
    {
      id: 1,
      q: "Why is a NumPy array faster and more memory-efficient than a standard Python list?",
      opts: [
        "Python lists store elements in contiguous blocks of memory, whereas NumPy arrays use scatter pointers.",
        "NumPy arrays store homogeneous datatypes in a contiguous block of C-memory (eliminating pointer overhead), while Python lists are arrays of pointers pointing to separate objects.",
        "NumPy uses Python compilers to optimize loops and automatically runs them in multiple threads behind the scenes.",
        "NumPy only stores string pointers, reducing the number of numerical conversions required."
      ],
      ans: 1,
      exp: "NumPy arrays are compact, homogeneous blocks of contiguous memory. Standard lists contain pointer references to separate, dynamically allocated Python wrapper objects, which introduces memory overhead and CPU cache misses."
    },
    {
      id: 2,
      q: "If an array has shape (2, 3, 4), what does the dimension size represent?",
      opts: [
        "2 dimensions, 3 rows, and 4 elements per row.",
        "2 elements, 3 columns, and 4 layers of depth.",
        "2 blocks (depth level), where each block is a matrix containing 3 rows and 4 columns.",
        "A 12-dimensional vector with an offset diagonal stride of 2."
      ],
      ans: 2,
      exp: "A shape of (2, 3, 4) in NumPy represents a 3D tensor: 2 depth-wise matrices (blocks), where each matrix has 3 rows and 4 columns."
    },
    {
      id: 3,
      q: "What is the key difference between np.eye(3, 4) and np.identity(3)?",
      opts: [
        "np.eye is for complex values, while np.identity is only for real numbers.",
        "np.identity only creates square (n x n) matrices, whereas np.eye can create rectangular (n x m) matrices and supports diagonal offsets.",
        "np.eye initializes arrays with random values, while np.identity sets all elements to 1.",
        "There is no difference; they are exactly the same function with different aliases."
      ],
      ans: 1,
      exp: "np.identity(n) creates a square identity matrix of size n x n. np.eye(N, M, k) can create non-square matrices and lets you shift the main diagonal of 1s up or down using the offset parameter 'k'."
    },
    {
      id: 4,
      q: "What are the strides of a 2D float64 (8 bytes) array of shape (3, 4) in standard C-contiguous memory layout?",
      opts: [
        "(8, 8)",
        "(4, 3)",
        "(32, 8)",
        "(96, 24)"
      ],
      ans: 2,
      exp: "In a (3, 4) array with 8-byte items: moving to the next column takes 8 bytes (stride_col = 8). Moving to the next row takes stepping past 4 columns in that row: 4 * 8 = 32 bytes (stride_row = 32). Strides are (32, 8)."
    },
    {
      id: 5,
      q: "What does the code np.empty((2, 3)) return when executed?",
      opts: [
        "An array filled entirely with zeros (0.0).",
        "An array filled entirely with ones (1.0).",
        "An array allocated in memory without initial values, meaning it contains whatever garbage values were already in those RAM addresses.",
        "A syntax error, because arrays cannot be initialized empty without an explicit fill value."
      ],
      ans: 2,
      exp: "np.empty allocates memory but does not set any default values. The content of the array is arbitrary, representing whatever remnants were left behind in those memory addresses (often referred to as 'garbage values')."
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {/* INSTALL & SETUP TAB */}
      {activeTab === 'install' && (
        <Section key="install" id="install" eyebrow="Day 1 • Setup & Architecture" title="NumPy Installation & Core Concepts">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. What is NumPy?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              <strong>NumPy</strong> (short for <em>Numerical Python</em>) is the absolute foundation of the scientific computing, data analytics, and machine learning ecosystem in Python. It provides the high-performance <code>ndarray</code> (n-dimensional array) object, which allows you to perform fast mathematical computations on large blocks of data.
            </p>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Libraries like Pandas, Scikit-Learn, Matplotlib, and TensorFlow are built directly on top of NumPy, making it a critical skill for any Data Analyst or Scientist.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. NumPy Arrays vs. Python Lists</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Standard Python lists are highly flexible because they can store different data types and grow dynamically. However, they are incredibly slow for numerical computing. NumPy arrays solve this by utilizing:
            </p>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              <li><strong>Contiguous Memory:</strong> Elements are packed next to each other in RAM. Standard lists store pointer references to objects scattered throughout memory, causing slow access times (cache misses).</li>
              <li><strong>Homogeneous Data:</strong> Every element in a NumPy array must have the exact same data type (e.g., all 64-bit floats). This removes type-checking overhead during loops.</li>
              <li><strong>Vectorization:</strong> NumPy offloads loops to highly optimized, pre-compiled C code, enabling element-wise calculations in a single instruction (SIMD).</li>
            </ul>

            <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bae6fd', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#0369a1', margin: '0 0 0.5rem 0' }}>💡 Vectorization in Action</h4>
              <p style={{ color: '#0369a1', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>
                Instead of running a slow loop: <code>[x + 1 for x in my_list]</code>, NumPy lets you write: <code>my_array + 1</code>. The arithmetic is pushed down to hardware-level C vector arrays, making operations 10x to 100x faster!
              </p>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>3. Installation & Setup</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Install NumPy in your environment using <code>pip</code>:
            </p>
            <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#f8fafc', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)' }}>
              <SyntaxHighlighter code={`# Run in your command terminal\npip install numpy`} />
            </div>

            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Import NumPy and inspect its version in Python:
            </p>
            <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: '8px', marginBottom: '2.5rem', color: '#f8fafc', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)' }}>
              <SyntaxHighlighter code={`import numpy as np\n\n# Check NumPy version\nprint(np.__version__)`} />
            </div>

            {/* BENCHMARK INTERACTIVE SIMULATOR */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <Activity size={22} color="#0284c7" /> List vs. NumPy Benchmark Simulator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Choose an element size and simulate a vector addition benchmark (<code>listA + listB</code>) to see memory usage and speed comparisons in real time.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Number of Elements</label>
                  <select
                    value={elementCount}
                    onChange={(e) => setElementCount(Number(e.target.value))}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                  >
                    <option value={10000}>10,000 (Small)</option>
                    <option value={100000}>100,000 (Medium)</option>
                    <option value={1000000}>1,000,000 (Large)</option>
                    <option value={10000000}>10,000,000 (Huge)</option>
                  </select>
                </div>

                <button
                  onClick={runBenchmark}
                  disabled={isBenchmarking}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    background: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-end',
                    opacity: isBenchmarking ? 0.7 : 1,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#0369a1'}
                  onMouseLeave={(e) => e.target.style.background = '#0284c7'}
                >
                  {isBenchmarking ? 'Running...' : 'Run Benchmark'}
                </button>
              </div>

              {benchmarkResult && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Python Standard List</span>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b' }}>
                      Time: {benchmarkResult.listTime} ms
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                      Est. Memory: {benchmarkResult.listMemory} MB
                    </p>
                  </div>

                  <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>NumPy ndarray</span>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                      Time: {benchmarkResult.npTime} ms
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                      Est. Memory: {benchmarkResult.npMemory} MB
                    </p>
                  </div>

                  <div style={{ borderLeft: '4px solid #0284c7', paddingLeft: '1rem', background: '#f0fdf4', borderRadius: '0 8px 8px 0' }}>
                    <span style={{ fontSize: '0.78rem', color: '#15803d', textTransform: 'uppercase', fontWeight: 700 }}>Performance Advantage</span>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d' }}>
                      {benchmarkResult.speedup}x Faster
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#16a34a' }}>
                      Memory Saved: {((benchmarkResult.listMemory - benchmarkResult.npMemory)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn"
                style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('dimensions')}
              >
                Continue to Array Dimensions
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* DIMENSIONS TAB */}
      {activeTab === 'dimensions' && (
        <Section key="dimensions" id="dimensions" eyebrow="Day 1 • Array Architectures" title="1D, 2D & 3D Arrays in NumPy">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. NumPy Array Dimensions</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              In NumPy, arrays can represent data of various dimensions. They are referred to as <strong>axes</strong>. The number of dimensions is called <strong>rank</strong> (or <code>ndim</code>).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>1D Arrays (Vectors)</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  Contains a single row of values. Often used to represent a single feature or target variable list in Data Analytics.
                </p>
                <SyntaxHighlighter code={`# 1D array creation\narr = np.array([1, 2, 3, 4, 5])`} />
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>2D Arrays (Matrices)</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  Rows and columns grid. Ideal for structured data, where rows represent instances (records) and columns represent features.
                </p>
                <SyntaxHighlighter code={`# 2D array creation\narr = np.array([[1, 2, 3],\n                [4, 5, 6]])`} />
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>3D Arrays (Tensors)</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  Collection of matrices (depth blocks). Frequently used for color images (height x width x RGB channels) or time-series profiles.
                </p>
                <SyntaxHighlighter code={`# 3D array creation\narr = np.array([[[1, 2],\n                 [3, 4]],\n                [[5, 6],\n                 [7, 8]]])`} />
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Visualizing Array Structure</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Refer to the diagram below to understand the hierarchical grid layout of axes in 1D, 2D, and 3D spaces:
            </p>

            <ZoomableImage src={numpyImg} alt="NumPy Array Dimensions Explained" />

            <h3 style={{ marginBottom: '1rem', color: '#1e293b', marginTop: '2.5rem' }}>3. Core Array Attributes</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              When analyzing datasets, you can inspect their shapes and properties using these key attributes:
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '0.8rem 1rem', color: '#334155' }}>Attribute</th>
                    <th style={{ padding: '0.8rem 1rem', color: '#334155' }}>Syntax</th>
                    <th style={{ padding: '0.8rem 1rem', color: '#334155' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Shape</td>
                    <td style={{ padding: '0.8rem 1rem' }}><code>arr.shape</code></td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Returns a tuple representing dimensions. E.g., <code>(3, 4)</code> means 3 rows and 4 columns.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Number of Dimensions</td>
                    <td style={{ padding: '0.8rem 1rem' }}><code>arr.ndim</code></td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Returns the integer count of dimensions (axes) in the array.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Data Type</td>
                    <td style={{ padding: '0.8rem 1rem' }}><code>arr.dtype</code></td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Returns the data type (e.g., <code>int64</code>, <code>float32</code>) of elements inside.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Item Size</td>
                    <td style={{ padding: '0.8rem 1rem' }}><code>arr.itemsize</code></td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Returns the memory size (in bytes) of a single element in the array.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Size</td>
                    <td style={{ padding: '0.8rem 1rem' }}><code>arr.size</code></td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Returns the total number of elements in the array (e.g., rows * columns).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* INTERACTIVE ARRAY ATTRIBUTE INSPECTOR */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <Layers size={22} color="#0284c7" /> Interactive Array Attribute Inspector
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Select a preset dimensional layout, edit the cell values, and watch how ndarray attributes change instantly.
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                {['1d', '2d', '3d'].map((p) => (
                  <button
                    key={p}
                    onClick={() => handleInspectPresetChange(p)}
                    style={{
                      padding: '0.4rem 1.2rem',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: inspectPreset === p ? '#0284c7' : '#cbd5e1',
                      background: inspectPreset === p ? '#e0f2fe' : '#fff',
                      color: inspectPreset === p ? '#0369a1' : '#475569',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {p.toUpperCase()} Preset
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem' }}>✏️ Edit Values</h4>

                  {/* Grid Input Rendering based on rank */}
                  {inspectPreset === '1d' && (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {customArrayData.map((val, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.2rem' }}>[{idx}]</span>
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => handleCellEdit([idx], e.target.value)}
                            style={{ width: '50px', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {inspectPreset === '2d' && (
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {customArrayData.map((row, rIdx) => (
                        <div key={rIdx} style={{ display: 'flex', gap: '10px' }}>
                          {row.map((val, cIdx) => (
                            <div key={cIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.2rem' }}>[{rIdx},{cIdx}]</span>
                              <input
                                type="number"
                                value={val}
                                onChange={(e) => handleCellEdit([rIdx, cIdx], e.target.value)}
                                style={{ width: '50px', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center' }}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {inspectPreset === '3d' && (
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      {customArrayData.map((block, bIdx) => (
                        <div key={bIdx} style={{ padding: '0.8rem', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Block {bIdx}</span>
                          <div style={{ display: 'grid', gap: '10px' }}>
                            {block.map((row, rIdx) => (
                              <div key={rIdx} style={{ display: 'flex', gap: '8px' }}>
                                {row.map((val, cIdx) => (
                                  <input
                                    key={cIdx}
                                    type="number"
                                    value={val}
                                    onChange={(e) => handleCellEdit([bIdx, rIdx, cIdx], e.target.value)}
                                    style={{ width: '40px', padding: '0.3rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center', fontSize: '0.85rem' }}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inspect Results */}
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>📊 ndarray Attributes</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                    <div>
                      <strong style={{ color: '#475569' }}>ndim (Dimensions):</strong>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginTop: '0.2rem' }}>
                        {getInspectAttributes().ndim}
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#475569' }}>shape:</strong>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginTop: '0.2rem' }}>
                        {getInspectAttributes().shape}
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#475569' }}>size (Elements):</strong>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginTop: '0.2rem' }}>
                        {getInspectAttributes().size}
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#475569' }}>dtype:</strong>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginTop: '0.2rem' }}>
                        {getInspectAttributes().dtype}
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#475569' }}>itemsize (Bytes/element):</strong>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginTop: '0.2rem' }}>
                        {getInspectAttributes().itemsize} bytes
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#475569' }}>nbytes (Total memory):</strong>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginTop: '0.2rem' }}>
                        {getInspectAttributes().nbytes} bytes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#0284c7', color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('numpy_day1', 'install')}
              >
                Back to Installation
              </button>
              <button
                className="btn"
                style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('creation_fns')}
              >
                Continue to Creation Functions
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* CREATION FUNCTIONS TAB */}
      {activeTab === 'creation_fns' && (
        <Section key="creation_fns" id="creation_fns" eyebrow="Day 1 • Array Instantiation" title="Basic Array Creation Functions">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. NumPy Array Creation Helpers</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              In real-world data science, you rarely enter arrays element-by-element. Instead, you instantiate arrays filled with specific configurations (like zeros, ones, constants, identity grids, or random weights) using built-in helper functions.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>np.zeros(shape) & np.ones(shape)</strong>
                <p style={{ color: '#475569', margin: '0 0 1rem 0', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  Creates an array of the specified dimensions filled with either 0.0 or 1.0 (defaults to float64 dtype, unless overridden).
                </p>
                <SyntaxHighlighter code={`# Create a 2x3 grid of zeros\nzeros_matrix = np.zeros((2, 3))\n\n# Create a 3x3 grid of ones\nones_matrix = np.ones((3, 3))`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>np.eye(rows, cols) vs. np.identity(n)</strong>
                <p style={{ color: '#475569', margin: '0 0 1rem 0', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  Both create identity matrices (1s along the diagonal, 0s elsewhere). However, <code>np.identity</code> is strictly square (n x n), whereas <code>np.eye</code> can be rectangular (n x m) and allows shifting the diagonal with an offset parameter <code>k</code>.
                </p>
                <SyntaxHighlighter code={`# Square identity matrix (3x3)\nidentity_sq = np.identity(3)\n\n# Rectangular identity matrix with shifted diagonal\neye_rect = np.eye(3, 4, k=1)`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>np.full(shape, fill_value) & np.empty(shape)</strong>
                <p style={{ color: '#475569', margin: '0 0 1rem 0', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  <code>np.full</code> fills the specified shape with a constant value. <code>np.empty</code> allocates raw blocks of RAM without resetting the values. Thus, it is faster but contains garbage data already present in those memory addresses.
                </p>
                <SyntaxHighlighter code={`# Initialize a 2x2 matrix filled with 7s\nconst_matrix = np.full((2, 2), 7)\n\n# Allocate a 2x3 matrix without setting values (garbage data)\nuninitialized = np.empty((2, 3))`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>np.diag(v, k)</strong>
                <p style={{ color: '#475569', margin: '0 0 1rem 0', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  Constructs a diagonal matrix using a 1D sequence for the diagonal elements. It can also extract the diagonal elements if passed a 2D matrix.
                </p>
                <SyntaxHighlighter code={`# Create a diagonal matrix with offset k=1\ndiag_matrix = np.diag([4, 8], k=1)`} />
              </div>
            </div>

            {/* INTERACTIVE MATRIX GENERATOR */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <Sparkles size={22} color="#0284c7" /> Interactive NumPy Matrix Generator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Configure parameters below to generate a live, color-coded visual rendering of the array creation functions.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Function</label>
                  <select
                    value={creationFn}
                    onChange={(e) => setCreationFn(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                  >
                    <option value="zeros">np.zeros</option>
                    <option value="ones">np.ones</option>
                    <option value="eye">np.eye</option>
                    <option value="identity">np.identity (Square)</option>
                    <option value="full">np.full</option>
                    <option value="empty">np.empty (Garbage Values)</option>
                    <option value="diag">np.diag</option>
                  </select>
                </div>

                {creationFn !== 'identity' && creationFn !== 'diag' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Rows</label>
                      <input
                        type="number"
                        min={1}
                        max={6}
                        value={matrixRows}
                        onChange={(e) => setMatrixRows(Math.min(6, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Columns</label>
                      <input
                        type="number"
                        min={1}
                        max={6}
                        value={matrixCols}
                        onChange={(e) => setMatrixCols(Math.min(6, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                      />
                    </div>
                  </>
                )}

                {creationFn === 'identity' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Dimension (n x n)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={matrixRows}
                      onChange={(e) => {
                        const val = Math.min(5, Math.max(1, parseInt(e.target.value, 10) || 1));
                        setMatrixRows(val);
                        setMatrixCols(val);
                      }}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                    />
                  </div>
                )}

                {creationFn === 'full' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Fill Value</label>
                    <input
                      type="number"
                      value={matrixFillVal}
                      onChange={(e) => setMatrixFillVal(parseInt(e.target.value, 10) || 0)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                    />
                  </div>
                )}

                {creationFn === 'diag' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Diagonal List (comma-separated)</label>
                      <input
                        type="text"
                        value={diagValues}
                        onChange={(e) => setDiagValues(e.target.value)}
                        placeholder="e.g. 4,8,12"
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Diagonal Offset (k)</label>
                      <input
                        type="number"
                        min={-3}
                        max={3}
                        value={diagOffset}
                        onChange={(e) => setDiagOffset(parseInt(e.target.value, 10) || 0)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                      />
                    </div>
                  </>
                )}

                {creationFn === 'eye' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Diagonal Offset (k)</label>
                    <input
                      type="number"
                      min={-3}
                      max={3}
                      value={diagOffset}
                      onChange={(e) => setDiagOffset(parseInt(e.target.value, 10) || 0)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Generated Grid View</span>

                <div style={{ display: 'grid', gap: '8px' }}>
                  {getGeneratedMatrix().map((row, rIdx) => (
                    <div key={rIdx} style={{ display: 'flex', gap: '8px' }}>
                      {row.map((val, cIdx) => {
                        let bgColor = '#f8fafc';
                        let textColor = '#334155';
                        let borderColor = '#cbd5e1';

                        if (val === 0 || val === '0.0') {
                          bgColor = '#f1f5f9';
                          textColor = '#94a3b8';
                        } else if (val === 1 || val === '1.0') {
                          bgColor = '#ecfdf5';
                          textColor = '#10b981';
                          borderColor = '#a7f3d0';
                        } else if (creationFn === 'full') {
                          bgColor = '#eff6ff';
                          textColor = '#1d4ed8';
                          borderColor = '#bfdbfe';
                        } else if (creationFn === 'empty') {
                          bgColor = '#fffbeb';
                          textColor = '#d97706';
                          borderColor = '#fde68a';
                        } else if (creationFn === 'diag' && val !== 0) {
                          bgColor = '#faf5ff';
                          textColor = '#7c3aed';
                          borderColor = '#e9d5ff';
                        }

                        return (
                          <div
                            key={cIdx}
                            style={{
                              width: '60px',
                              height: '50px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '8px',
                              border: `1px solid ${borderColor}`,
                              background: bgColor,
                              color: textColor,
                              fontSize: '0.82rem',
                              fontWeight: 'bold',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                              textAlign: 'center',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                            title={`Index: [${rIdx}, ${cIdx}], Value: ${val}`}
                          >
                            {val}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', alignSelf: 'stretch', background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#f8fafc' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.4rem' }}>Python Execution & Output</span>
                  <SyntaxHighlighter
                    code={
                      creationFn === 'zeros' ? `>>> np.zeros((${matrixRows}, ${matrixCols}))\narray(${JSON.stringify(getGeneratedMatrix())})` :
                        creationFn === 'ones' ? `>>> np.ones((${matrixRows}, ${matrixCols}))\narray(${JSON.stringify(getGeneratedMatrix())})` :
                          creationFn === 'eye' ? `>>> np.eye(${matrixRows}, ${matrixCols}, k=${diagOffset})\narray(${JSON.stringify(getGeneratedMatrix())})` :
                            creationFn === 'identity' ? `>>> np.identity(${matrixRows})\narray(${JSON.stringify(getGeneratedMatrix())})` :
                              creationFn === 'full' ? `>>> np.full((${matrixRows}, ${matrixCols}), ${matrixFillVal})\narray(${JSON.stringify(getGeneratedMatrix())})` :
                                creationFn === 'empty' ? `>>> np.empty((${matrixRows}, ${matrixCols}))\narray([[ garbage_floats... ]])` :
                                  `>>> np.diag([${diagValues}], k=${diagOffset})\narray(${JSON.stringify(getGeneratedMatrix())})`
                    }
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#0284c7', color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('numpy_day1', 'dimensions')}
              >
                Back to Array Dimensions
              </button>
              <button
                className="btn"
                style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('ranges_strides')}
              >
                Continue to Ranges & Strides
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* RANGES & STRIDES TAB */}
      {activeTab === 'ranges_strides' && (
        <Section key="ranges_strides" id="ranges_strides" eyebrow="Day 1 • Memory Mechanics" title="Ranges, Strides & Memory Layout">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Creating Numerical Sequences</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Instead of explicitly instantiating fixed values, arrays are frequently populated with continuous ranges or intervals using sequence generators:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem', background: '#fff' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>np.arange(start, stop, step)</strong>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  Generates values within a half-open interval <code>[start, stop]</code> with a fixed step size. Similar to Python's built-in <code>range()</code> but returns an array.
                </p>
                <SyntaxHighlighter code={`# [5, 10, 15, 20]\narr = np.arange(5, 25, 5)`} />
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem', background: '#fff' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>np.linspace(start, stop, num)</strong>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  Generates a specific number of equally spaced values over a specified closed interval <code>[start, stop]</code>. Computes step size automatically.
                </p>
                <SyntaxHighlighter code={`# 5 numbers from 0.0 to 1.0\narr = np.linspace(0, 1, 5)`} />
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem', background: '#fff' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>np.logspace(start, stop, num)</strong>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  Generates numbers spaced evenly on a logarithmic scale. The boundaries are entered as powers (e.g., 0 to 2 for 10^0 to 10^2).
                </p>
                <SyntaxHighlighter code={`# 5 log-spaced numbers\narr = np.logspace(0, 1, 5)`} />
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. How NumPy Layouts Work in RAM</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Under the hood, computer memory (RAM) is always a <strong>one-dimensional linear sequence</strong> of bytes. Regardless of whether an array is a 2D grid or a 3D block, NumPy stores it flat.
            </p>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              To reconstruct a multi-dimensional structure from flat memory, NumPy uses three core metrics:
            </p>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              <li><strong>Itemsize:</strong> The number of bytes dedicated to a single value (e.g., <code>int64</code> requires 8 bytes).</li>
              <li><strong>Nbytes:</strong> The total bytes consumed by the entire block: <code>size * itemsize</code>.</li>
              <li><strong>Strides:</strong> A tuple representing the step size (in bytes) required to jump to the next index along each axis.</li>
            </ul>

            <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fde68a', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#b45309', margin: '0 0 0.5rem 0' }}>⚠️ Stride Strut Math</h4>
              <p style={{ color: '#b45309', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>
                Suppose you have a 2D array of shape <code>(2, 3)</code> with <code>int64</code> (8-byte) values. In memory, it is flat: <code>[0,1,2, 3,4,5]</code>.<br />
                To move 1 column to the right, you step 8 bytes (stride_col = 8).<br />
                To move 1 row down, you must jump past an entire row of 3 columns: <code>3 * 8 = 24 bytes</code> (stride_row = 24).<br />
                Thus, the strides are: <code>(24, 8)</code>.
              </p>
            </div>

            {/* INTERACTIVE STRIDES VISUALIZER */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <Activity size={22} color="#0284c7" /> Stride & Memory Layout Visualizer
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Select a matrix size and data type. Hover over cell blocks in the <strong>Logical Matrix View</strong> to trace their direct byte address offset inside the flat <strong>Physical RAM Memory Block</strong>.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Matrix Shape</label>
                  <select
                    value={strideDim}
                    onChange={(e) => setStrideDim(e.target.value)}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                  >
                    <option value="2x3">2 Rows x 3 Columns (2x3)</option>
                    <option value="3x4">3 Rows x 4 Columns (3x4)</option>
                    <option value="2x4">2 Rows x 4 Columns (2x4)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Data Type (Dtype)</label>
                  <select
                    value={strideDtype}
                    onChange={(e) => setStrideDtype(e.target.value)}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                  >
                    <option value="int64">int64 (8 bytes)</option>
                    <option value="float64">float64 (8 bytes)</option>
                    <option value="int32">int32 (4 bytes)</option>
                    <option value="float32">float32 (4 bytes)</option>
                  </select>
                </div>

                <div style={{ marginLeft: 'auto', background: '#e0f2fe', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #bae6fd', fontSize: '0.85rem', color: '#0369a1' }}>
                  <strong>Strides Tuple:</strong> ({stridesInfo.strideRow}, {stridesInfo.strideCol})
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                {/* Logical Grid */}
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '1rem' }}>Logical Grid View (2D)</span>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {Array.from({ length: stridesInfo.rows }).map((_, r) => (
                      <div key={r} style={{ display: 'flex', gap: '8px' }}>
                        {Array.from({ length: stridesInfo.cols }).map((_, c) => {
                          const isHovered = hoveredCell && hoveredCell.r === r && hoveredCell.c === c;
                          return (
                            <div
                              key={c}
                              onMouseEnter={() => setHoveredCell({ r, c })}
                              onMouseLeave={() => setHoveredCell(null)}
                              style={{
                                width: '60px',
                                height: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: isHovered ? '2px solid #0284c7' : '1px solid #cbd5e1',
                                background: isHovered ? '#e0f2fe' : '#f8fafc',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: isHovered ? '#0369a1' : '#1e293b' }}>
                                ({r},{c})
                              </span>
                              <span style={{ fontSize: '0.62rem', color: '#64748b' }}>
                                #{r * stridesInfo.cols + c}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flat Memory View */}
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', textAlign: 'center' }}>Physical flat memory block (1D RAM)</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto', padding: '5px' }}>
                    {stridesInfo.blocks.map((block) => {
                      const isHovered = hoveredCell && hoveredCell.r === block.r && hoveredCell.c === block.c;
                      return (
                        <div
                          key={block.index}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: isHovered ? '2px solid #0284c7' : '1px solid #e2e8f0',
                            background: isHovered ? '#e0f2fe' : '#f8fafc',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.85rem',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{ fontWeight: 'bold', color: isHovered ? '#0369a1' : '#334155' }}>
                            Index {block.index} &rarr; Grid ({block.r},{block.c})
                          </span>
                          <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.8rem' }}>
                            Byte Offset: {block.byteOffset}B
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {hoveredCell && (
                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd', fontSize: '0.9rem', color: '#0369a1' }}>
                  <strong>Address Calculation for Grid Coordinate ({hoveredCell.r}, {hoveredCell.c}):</strong><br />
                  <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'inline-block', marginTop: '0.5rem' }}>
                    Offset = (row * stride_row) + (col * stride_col) = ({hoveredCell.r} * {stridesInfo.strideRow}) + ({hoveredCell.c} * {stridesInfo.strideCol}) = {hoveredCell.r * stridesInfo.strideRow + hoveredCell.c * stridesInfo.strideCol} bytes
                  </code>
                </div>
              )}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#0284c7', color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('numpy_day1', 'creation_fns')}
              >
                Back to Creation Functions
              </button>
              <button
                className="btn"
                style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('playground')}
              >
                Continue to Live Coding
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PLAYGROUND TAB */}
      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Day 1 • Coding Arena" title="Live Coding Playground &amp; Challenges">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Test your knowledge of array instantiation, shapes, and ranges with these interactive challenges:
            </p>
            <NumpyAIPlayground
              dayId="day1"
              presets={day1Presets}
              challenges={day1Challenges}
            />

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#0284c7', color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('numpy_day1', 'ranges_strides')}
              >
                Back to Ranges &amp; Strides
              </button>
              <button
                className="btn"
                style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('assessment')}
              >
                Continue to Assessment
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 1 Assessment" title="Day 1 Assessment & Review">
          <div className="panel">

            {/* Common Pitfalls */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common NumPy Mistakes to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Creating Homogeneity Errors:</strong> Inserting different datatypes (e.g. floats and strings) into an array. NumPy will silently upcast everything to the most flexible type (e.g., converting all numbers to strings), which ruins speed benefits.</li>
                <li><strong>Misunderstanding empty() vs zeros():</strong> Assuming <code>np.empty()</code> initializes cells to zero. It leaves cells uninitialized, showing random numbers that change depending on previous memory usage.</li>
                <li><strong>Incorrect Strides on Reshapes:</strong> Forgetting that strides change depending on whether memory is C-contiguous (row-major) or Fortran-contiguous (column-major) when manipulating axes.</li>
              </ul>
            </div>

            {/* Interview Prep Questions */}
            <h3 style={{ color: '#1e293b', marginBottom: '1.2rem' }}>💬 Interview Questions</h3>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q1. What is strides in NumPy and why is it useful?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Strides represent the number of bytes that must be stepped in each dimension to move to the next item. By using strides, NumPy can reshape, slice, transpose, and adjust arrays almost instantly without actually copying any data in physical memory.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q2. What happens if you try to build a NumPy array containing both integers and strings?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Since NumPy arrays require homogeneous elements, it will apply type coercion (upcasting). Because strings are more flexible than integers, NumPy will convert all the integers in the array to strings, changing the array data type to Unicode character string (e.g., <code>&lt;U21</code>).
                </p>
              </div>
            </div>

            {/* Interactive Quiz */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <CheckCircle size={22} color="#0284c7" /> Interactive Lesson Quiz
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '-1rem', marginBottom: '2rem' }}>
                Select the correct options and check your understanding.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <p style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '1rem', marginBottom: '1rem' }}>
                      {idx + 1}. {q.q}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.opts.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        return (
                          <label
                            key={optIdx}
                            style={{
                              padding: '0.8rem 1rem',
                              borderRadius: '8px',
                              border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
                              background: isSelected ? '#f0f9ff' : '#f8fafc',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '0.9rem',
                              color: '#334155'
                            }}
                          >
                            <input
                              type="radio"
                              name={`quiz-${q.id}`}
                              checked={isSelected}
                              onChange={() => handleSelectOption(q.id, optIdx)}
                              style={{ accentColor: '#0284c7' }}
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                    {selectedAnswers[q.id] !== undefined && !checkedQuestions[q.id] && (
                      <button
                        className="btn btn-outline"
                        style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.82rem', borderColor: '#0284c7', color: '#0284c7', background: '#fff' }}
                        onClick={() => handleCheckQuestion(q.id)}
                      >
                        Check Answer
                      </button>
                    )}
                    {checkedQuestions[q.id] && (
                      <div style={{ marginTop: '1.2rem', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid', borderColor: selectedAnswers[q.id] === q.ans ? '#16a34a' : '#dc2626', background: selectedAnswers[q.id] === q.ans ? '#f0fdf4' : '#fef2f2' }}>
                        <strong style={{ color: selectedAnswers[q.id] === q.ans ? '#15803d' : '#b91c1c', display: 'block', marginBottom: '0.3rem' }}>
                          {selectedAnswers[q.id] === q.ans ? 'Correct!' : 'Incorrect'}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                          {q.exp}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  className="btn btn-outline"
                  onClick={checkFinalScore}
                  style={{ borderColor: '#0284c7', color: '#0284c7', padding: '0.5rem 1.5rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                >
                  Calculate Score
                </button>
                {score !== null && (
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0369a1' }}>
                    Your Score: {score} / {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
                  </span>
                )}
              </div>
            </div>

            {/* Homework Assignment */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem' }}>
                <FileText size={22} color="#0284c7" /> Homework Assignment (5 Tasks)
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '-1rem', marginBottom: '2rem' }}>
                Write the Python code to solve these exercises in your notebook:
              </p>

              <ol style={{ paddingLeft: '20px', color: '#334155', lineHeight: 1.8, fontSize: '0.92rem' }}>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 1:</strong> Create a 1D NumPy array containing the values 10 to 50 (inclusive) and check its <code>shape</code>, <code>size</code>, and <code>dtype</code>.
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 2:</strong> Create a 2D array of shape <code>(3, 4)</code> filled with float values of <code>9.9</code>. Then inspect its <code>strides</code> and calculate its total memory size in bytes (<code>nbytes</code>).
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 3:</strong> Use sequence generators to create two arrays:
                  <ul style={{ paddingLeft: '20px', margin: '0.3rem 0' }}>
                    <li>An array of integers starting at 0 up to 100 with steps of 10.</li>
                    <li>An array of 20 equally spaced float values between 0.0 and 5.0 (inclusive).</li>
                  </ul>
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 4:</strong> Create a 5x5 rectangular identity matrix using <code>np.eye()</code> where the diagonal of 1s is shifted upwards by 2 positions (offset index <code>k=2</code>).
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 5:</strong> Instantiate a 1D array from the list <code>[3.14, 'numpy', 42]</code>. Write down the resulting <code>dtype</code> and explain why it was selected by the NumPy compiler.
                </li>
              </ol>
            </div>

            <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#0284c7', color: '#0284c7', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('numpy_day1', 'playground')}
              >
                Back to Live Coding
              </button>
              <button
                className="btn"
                style={{ background: '#10b981', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => {
                  alert('Congratulations on completing Day 1 of NumPy for Data Science!');
                  onNavigate('dashboard');
                }}
              >
                <CheckCircle size={18} /> Complete Module 1
              </button>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
