import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database
} from 'lucide-react';
import PandasAIPlayground from '../../components/PandasAIPlayground';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(pd|DataFrame|Series|read_csv|head|tail|sample|info|describe|shape|columns|index|dtypes|np|array)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
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

export default function PandasDay1({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const day1Presets = [
    {
      name: 'create_series',
      label: 'Create Series',
      code: `import pandas as pd\n\n# Create a Series from a List\ndata = [10, 20, 30]\ns = pd.Series(data)\nprint(s)`,
      output: `0    10\n1    20\n2    30\ndtype: int64`
    },
    {
      name: 'create_df',
      label: 'Create DataFrame',
      code: `import pandas as pd\n\n# Create a DataFrame from a Dictionary\ndata = {\n    'Name': ['Alice', 'Bob'],\n    'Age': [25, 30]\n}\ndf = pd.DataFrame(data)\nprint(df)`,
      output: `    Name  Age\n0  Alice   25\n1    Bob   30`
    }
  ];

  const day1Challenges = [
    {
      id: 'ch1_series',
      title: 'Create Series from List',
      desc: 'Create a pandas Series named s containing the values 10, 20, 30.',
      hint: 'Use s = pd.Series([10, 20, 30]).',
    },
    {
      id: 'ch1_dataframe',
      title: 'Create DataFrame from Dict',
      desc: 'Create a DataFrame named df from a dictionary with Name: Alice/Bob and Age: 25/30.',
      hint: 'Use df = pd.DataFrame({"Name": ["Alice", "Bob"], "Age": [25, 30]}).',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // Tab 3 Attribute Inspector State
  const [inspectPreset, setInspectPreset] = useState('students');
  const [customData, setCustomData] = useState([
    { ID: 1, Name: 'Raj', Maths: 85, Science: 90 },
    { ID: 2, Name: 'Simran', Maths: 92, Science: 88 },
    { ID: 3, Name: 'Amit', Maths: 78, Science: 82 }
  ]);

  // AI Activity Form State
  const [aiActivityCode, setAiActivityCode] = useState(
`import pandas as pd

# Create student marks dictionary
data = {
    'Student': ['Raj', 'Simran', 'Amit', 'Neha'],
    'Maths': [85, 92, 78, 95],
    'Science': [90, 88, 82, 91]
}

# Convert to DataFrame
marks_df = pd.DataFrame(data)

print(marks_df)`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('pandas_day1', nextTabId);
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

  const getInspectAttributes = () => {
    const shape = `(${customData.length}, ${Object.keys(customData[0] || {}).length})`;
    const columns = JSON.stringify(Object.keys(customData[0] || {}));
    const index = `RangeIndex(start=0, stop=${customData.length}, step=1)`;
    const dtypes = Object.keys(customData[0] || {}).map(k => `${k}: ${typeof customData[0][k] === 'number' ? 'int64' : 'object'}`).join(', ');

    return { shape, columns, index, dtypes };
  };

  const handleCellEdit = (index, key, val) => {
    const numVal = isNaN(val) || val.trim() === '' ? val : parseInt(val, 10);
    const newData = [...customData];
    newData[index][key] = numVal;
    setCustomData(newData);
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Instantiating Environment...\n');
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import pandas as pd') || aiActivityCode.includes('import pandas');
      const hasDataFrame = aiActivityCode.includes('pd.DataFrame(') && aiActivityCode.includes('data');
      const hasCorrectData = aiActivityCode.includes('Raj') && aiActivityCode.includes('Neha') && aiActivityCode.includes('85') && aiActivityCode.includes('91');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: No module named "pandas"\nEnsure you import pandas as pd.');
        return;
      }
      if (!hasDataFrame) {
        setAiActivityConsole(p => p + 'ValueError: DataFrame variable "marks_df" not defined correctly.');
        return;
      }
      if (!hasCorrectData) {
        setAiActivityConsole(p => p + 'KeyError: Dictionary values do not match student records.');
        return;
      }

      setAiActivityConsole(
        `>>> DataFrame successfully initialized!\n\nmarks_df.shape: (4, 3)\n\n   Student  Maths  Science\n0      Raj     85       90\n1   Simran     92       88\n2     Amit     78       82\n3     Neha     95       91\n\n✅ AI Validation: Student Marks DataFrame compiles perfectly!`
      );
      setAiActivityPassed(true);
    }, 600);
  };

  const quizQuestions = [
    {
      id: 'q1',
      q: 'Which Pandas object represents a 1D labeled array capable of holding any data type?',
      opts: ['DataFrame', 'Series', 'Panel', 'Index'],
      ans: 1,
      exp: 'A Series is a 1D labeled array, while a DataFrame is a 2D tabular data structure.'
    },
    {
      id: 'q2',
      q: 'What is the correct syntax to import the Pandas library using its common alias?',
      opts: ['import pandas as np', 'import pandas as pd', 'import pd from pandas', 'import pandas'],
      ans: 1,
      exp: '`import pandas as pd` is the standard alias used across the data science ecosystem.'
    },
    {
      id: 'q3',
      q: 'Which DataFrame attribute displays the total number of rows and columns as a tuple?',
      opts: ['.size', '.shape', '.dtypes', '.info()'],
      ans: 1,
      exp: '`.shape` returns a tuple (rows, columns). `.size` returns the total number of cells (rows * columns).'
    },
    {
      id: 'q4',
      q: 'What is the purpose of the df.describe() method?',
      opts: [
        'To print structural schema information',
        'To return the first 5 rows of the DataFrame',
        'To generate summary statistics of numeric columns (mean, std, min, max, etc.)',
        'To check for missing values'
      ],
      ans: 2,
      exp: '`df.describe()` calculates summary statistics. Structural information like non-null counts and memory usage is returned by `df.info()`.'
    }
  ];

  return (
    <div className="learning-container">
      
      {/* TABS CONTAINER */}
      {activeTab === 'intro' && (
        <Section eyebrow="Day 1 • Introduction" title="What is Pandas?">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. The Foundation of Data Science</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              <strong>Pandas</strong> is a fast, powerful, and flexible open-source data analysis and manipulation library built on top of the Python programming language.
              It provides two primary data structures: <strong>Series</strong> (1D arrays) and <strong>DataFrames</strong> (2D tables).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <strong style={{ color: '#166534', display: 'block', marginBottom: '0.5rem' }}>Why Pandas?</strong>
                <ul style={{ color: '#166534', paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li>Easy handling of missing data (NaN)</li>
                  <li>Fast filtering, sorting, and merging of tables</li>
                  <li>Direct parsing from files (CSV, Excel, JSON, SQL)</li>
                  <li>Powerful alignment and grouping capabilities</li>
                </ul>
              </div>

              <div style={{ padding: '1.2rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.5rem' }}>NumPy vs Pandas</strong>
                <ul style={{ color: '#1e40af', paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <li><strong>NumPy:</strong> Operates on homogeneous multi-dimensional arrays (all items must be of the same type). Optimized for mathematical calculations.</li>
                  <li><strong>Pandas:</strong> Operates on heterogeneous tabular structures (columns can hold different types like string, int, float). Best for business reports and file ingestion.</li>
                </ul>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Installation & Importing</h3>
            <p style={{ marginBottom: '1rem', color: '#475569' }}>
              To start using Pandas, make sure it is installed in your Python environment:
            </p>
            <SyntaxHighlighter code={`# In your terminal\npip install pandas`} />
            
            <p style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#475569' }}>
              Then import it in your scripts using the standard alias <code>pd</code>:
            </p>
            <SyntaxHighlighter code={`import pandas as pd`} />

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('creation')}>
                Continue to Creating DataFrames →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'creation' && (
        <Section eyebrow="Day 1 • Ingestion & Structuring" title="Creating Series & DataFrames">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. The Series</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              A <strong>Series</strong> is a one-dimensional array-like object containing a sequence of values and an associated array of data labels, called its <em>index</em>.
            </p>
            <SyntaxHighlighter code={`import pandas as pd\n\n# Create a Series from a list\ns = pd.Series([10, 20, 30])\nprint(s)\n# Output:\n# 0    10\n# 1    20\n# 2    30\n# dtype: int64`} />

            <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>2. The DataFrame</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              A <strong>DataFrame</strong> represents a rectangular table of data containing an ordered collection of columns, each of which can be a different value type (numeric, string, boolean, etc.).
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>From a Dictionary (Columns-first)</strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Each key becomes a column name, and values are stored in lists representing column data.</p>
                <SyntaxHighlighter code={`data = {\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Age': [25, 30, 35]\n}\ndf = pd.DataFrame(data)`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>From a List of Dictionaries (Rows-first)</strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Each dictionary represents a row mapping keys to values.</p>
                <SyntaxHighlighter code={`data = [\n    {'Name': 'Alice', 'Age': 25},\n    {'Name': 'Bob', 'Age': 30}\n]\ndf = pd.DataFrame(data)`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>From a NumPy Array</strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Provides raw matrix data; indices and columns can be named explicitly.</p>
                <SyntaxHighlighter code={`import numpy as np\narr = np.array([[1, 2], [3, 4]])\ndf = pd.DataFrame(arr, columns=['A', 'B'])`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>From a CSV File</strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Reads directly from a comma-separated values file into a table.</p>
                <SyntaxHighlighter code={`df = pd.read_csv('dataset.csv')`} />
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('intro')}>
                ← Back to Intro
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('attributes')}>
                Continue to Attributes & Inspection →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'attributes' && (
        <Section eyebrow="Day 1 • Inspection & Schema" title="DataFrame Attributes & Summary Methods">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Essential Structural Attributes</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Once you load or create a DataFrame, you can inspect its shape, index labels, column names, and data types without calling methods (these are attributes, so they don't require parentheses).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <code style={{ fontWeight: 'bold', color: '#10b981' }}>df.shape</code>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 0 0' }}>Returns a tuple containing <code>(rows, columns)</code>.</p>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <code style={{ fontWeight: 'bold', color: '#10b981' }}>df.columns</code>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 0 0' }}>Returns an Index list of all column headers.</p>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <code style={{ fontWeight: 'bold', color: '#10b981' }}>df.index</code>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 0 0' }}>Returns index details (e.g., RangeIndex, labels).</p>
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <code style={{ fontWeight: 'bold', color: '#10b981' }}>df.dtypes</code>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '4px 0 0 0' }}>Displays data types of columns (int64, object, etc.).</p>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Summary & Inspection Methods</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Methods require parentheses and perform actions to inspect portions of the table or run mathematical aggregation summaries.
            </p>

            <ul style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
              <li><strong><code>df.head(n=5)</code>:</strong> Returns the first <em>n</em> rows of the DataFrame (useful for quick previews).</li>
              <li><strong><code>df.tail(n=5)</code>:</strong> Returns the last <em>n</em> rows.</li>
              <li><strong><code>df.sample(n=1)</code>:</strong> Returns a random sample of rows.</li>
              <li><strong><code>df.info()</code>:</strong> Prints schema structure, data types, non-null counts, and memory usage.</li>
              <li><strong><code>df.describe()</code>:</strong> Computes summary statistics (count, mean, std, min, percentiles, max) for numeric columns.</li>
            </ul>

            {/* INTERACTIVE DATA INSPECTOR */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', marginBottom: '1rem' }}>
                <Sliders size={20} color="#10b981" /> Interactive DataFrame Inspector
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem' }}>
                Click cells below to edit numbers or text, and watch how the DataFrame's structural attributes update immediately.
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#475569' }}>Index</th>
                      {Object.keys(customData[0] || {}).map(k => (
                        <th key={k} style={{ padding: '10px', textAlign: 'left', color: '#475569' }}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {customData.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '10px', color: '#94a3b8', fontWeight: 600 }}>{rIdx}</td>
                        {Object.keys(row).map(key => (
                          <td key={key} style={{ padding: '8px 10px' }}>
                            <input
                              type="text"
                              value={row[key]}
                              onChange={(e) => handleCellEdit(rIdx, key, e.target.value)}
                              style={{
                                width: '80px',
                                border: '1px solid transparent',
                                background: 'transparent',
                                fontSize: '0.9rem',
                                color: '#1e293b',
                                outline: 'none'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#cbd5e1';
                                e.target.style.background = '#fff';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'transparent';
                                e.target.style.background = 'transparent';
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>DataFrame Attributes</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
                    <div><strong>.shape:</strong> <code style={{ color: '#047857' }}>{getInspectAttributes().shape}</code></div>
                    <div><strong>.columns:</strong> <code style={{ color: '#047857' }}>{getInspectAttributes().columns}</code></div>
                    <div><strong>.index:</strong> <code style={{ color: '#047857', wordBreak: 'break-all' }}>{getInspectAttributes().index}</code></div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Column Types (.dtypes)</span>
                  <div style={{ fontSize: '0.88rem', color: '#334155' }}>
                    <code>{getInspectAttributes().dtypes}</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('creation')}>
                ← Back to Creation
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 1 • AI Interactive Studio" title="AI Activity: Student Marks DataFrame">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Interactive Challenge Description</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              In this activity, you will verify how to create a custom student database containing name records and marks, convert it to a DataFrame using <code>pd.DataFrame()</code>, and check its layout.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Construct a python dictionary containing columns: <code>'Student'</code>, <code>'Maths'</code>, and <code>'Science'</code>.</li>
                <li>Add records for <strong>Raj</strong> (85 Maths, 90 Science), <strong>Simran</strong> (92 Maths, 88 Science), <strong>Amit</strong> (78 Maths, 82 Science), and <strong>Neha</strong> (95 Maths, 91 Science).</li>
                <li>Instantiate a DataFrame named <code>marks_df</code> using your dictionary.</li>
                <li>Execute the validation check to verify correct compilation!</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  student_marks.py
                </div>
                <textarea
                  value={aiActivityCode}
                  onChange={(e) => setAiActivityCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0f172a',
                    color: '#e2e8f0',
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.88rem',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    lineHeight: 1.6
                  }}
                />
                <div style={{ padding: '8px 12px', background: '#1e293b', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleRunAIActivity} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                    Validate Code
                  </button>
                </div>
              </div>

              {/* Console output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', border: '1px solid #334155' }}>
                  {aiActivityConsole || 'Console compiler idle... Click Validate Code to execute.'}
                </div>

                {aiActivityPassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Milestone Cleared!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>You have successfully created and verified the Student Marks DataFrame structure.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('attributes')}>
                ← Back to Attributes
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 1 • Practical Lab" title="Pandas Live Coding Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using proper Pandas array creation syntax and run codes to see console feedbacks.
            </p>
            <PandasAIPlayground dayId="day1" presets={day1Presets} challenges={day1Challenges} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('activity')}>
                ← Back to AI Activity
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Quiz →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 1 • Evaluation" title="Day 1 Assessment Quiz">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Test Your Understanding</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Q{idx + 1}.</span> {q.q}
                  </h4>
                  <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {q.opts.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[q.id] === oIdx;
                      const isChecked = checkedQuestions[q.id];
                      const isCorrect = q.ans === oIdx;

                      let btnStyle = {
                        width: '100%',
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'all 0.2s'
                      };

                      if (isSelected) {
                        btnStyle.background = '#eff6ff';
                        btnStyle.borderColor = '#3b82f6';
                        btnStyle.color = '#1d4ed8';
                      }

                      if (isChecked) {
                        if (isCorrect) {
                          btnStyle.background = '#dcfce7';
                          btnStyle.borderColor = '#86efac';
                          btnStyle.color = '#15803d';
                        } else if (isSelected) {
                          btnStyle.background = '#fee2e2';
                          btnStyle.borderColor = '#fca5a5';
                          btnStyle.color = '#b91c1c';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => !isChecked && handleSelectOption(q.id, oIdx)}
                          style={btnStyle}
                          disabled={isChecked}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!checkedQuestions[q.id] && selectedAnswers[q.id] !== undefined && (
                    <button
                      onClick={() => handleCheckQuestion(q.id)}
                      style={{
                        marginTop: '1rem',
                        background: '#1e293b',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 16px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Verify Answer
                    </button>
                  )}

                  {checkedQuestions[q.id] && (
                    <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem', color: '#475569', display: 'flex', gap: '6px' }}>
                      <Sparkles size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Tutor Explanation:</strong> {q.exp}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#14532d' }}>Submit Your Assessment</h3>
              <p style={{ color: '#166534', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Verify all answers above before computing final grading scores.
              </p>
              
              <button className="btn btn-primary" onClick={checkFinalScore}>
                Calculate Grading Score
              </button>

              {score !== null && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', display: 'block' }}>{score} / 4</span>
                  <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 600 }}>
                    {score === 4 ? '🏆 Outstanding! Perfect score!' : score >= 2 ? '👍 Good job! Review the explanations to refine your knowledge.' : '⚠️ Keep practicing! Ask the AI Tutor for assistance.'}
                  </span>
                </div>
              )}
            </div>

            {/* Homework Assignment */}
            <div style={{ marginTop: '2.5rem', background: '#f8fafc', border: '1px dashed #64748b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                <FileText size={20} color="#3b82f6" /> 📝 Homework Assignment
              </h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Write a python script that loads your custom personal expenses dataset from a local CSV, strips column whitespaces, prints out the first 5 records using <code>head()</code>, and saves it to a cleaned output file. Submit your script inside the sandbox.
              </p>
            </div>

            {/* Lesson Rating */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>⭐ Rate this Lesson:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setLessonRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.8rem',
                      cursor: 'pointer',
                      color: star <= lessonRating ? '#f59e0b' : '#cbd5e1',
                      transition: 'color 0.2s'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              {lessonRating > 0 && (
                <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                  Thank you! You rated this lesson {lessonRating}/5 stars.
                </span>
              )}
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
