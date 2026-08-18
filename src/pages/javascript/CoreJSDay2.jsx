import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, AlertTriangle, Activity } from 'lucide-react';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code, style = {} }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', overflowX: 'auto', ...style }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|parseInt|parseFloat|isNaN|alert)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (htmlTag) color = '#7ee787';
          else if (kw) { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
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
  { id: 'q1', q: 'What does the += operator do?', options: ['Adds and returns a new variable', 'Adds the right value to the left variable and assigns the result', 'Compares two values', 'Concatenates two strings only'], ans: 1 },
  { id: 'q2', q: 'What is the result of: 10 % 3 ?', options: ['3', '1', '0', '3.3'], ans: 1 },
  { id: 'q3', q: 'Which operator is the strict equality operator?', options: ['==', '!=', '===', '=>'], ans: 2 },
  { id: 'q4', q: 'What does the logical && operator return when the left operand is false?', options: ['true', 'false', '1', 'undefined'], ans: 1 },
  { id: 'q5', q: 'What is the result of: "Hello" + " " + "World" ?', options: ['"Hello World"', 'NaN', 'undefined', 'Error'], ans: 0 },
];

export default function CoreJSDay2({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const [calcLeft, setCalcLeft] = useState('10');
  const [calcRight, setCalcRight] = useState('3');
  const [calcOp, setCalcOp] = useState('+');
  const [calcResult, setCalcResult] = useState(null);

  const [cmpLeft, setCmpLeft] = useState('5');
  const [cmpRight, setCmpRight] = useState('"5"');

  const [bwA, setBwA] = useState('5');
  const [bwB, setBwB] = useState('3');
  const [bwOp, setBwOp] = useState('&');

  const [ternScore, setTernScore] = useState('75');

  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f8fafc; padding: 20px; }
    h2 { color: #ca8a04; }
    .box { background: white; border: 2px solid #ca8a04; border-radius: 10px; padding: 14px 18px; max-width: 360px; margin: 8px 0; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }
    .label { font-weight: bold; color: #475569; }
    .value { color: #1e40af; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Operators in Action</h2>
  <script>
    var a = 10;
    var b = 3;
    document.write('<div class="box"><span class="label">a + b =</span> <span class="value">' + (a + b) + '</span></div>');
    document.write('<div class="box"><span class="label">a - b =</span> <span class="value">' + (a - b) + '</span></div>');
    document.write('<div class="box"><span class="label">a * b =</span> <span class="value">' + (a * b) + '</span></div>');
    document.write('<div class="box"><span class="label">a / b =</span> <span class="value">' + (a / b) + '</span></div>');
    document.write('<div class="box"><span class="label">a % b =</span> <span class="value">' + (a % b) + '</span></div>');
    document.write('<div class="box"><span class="label">a ** b =</span> <span class="value">' + (a ** b) + '</span></div>');
    var firstName = "Alpha";
    var lastName = "Fly";
    var fullName = firstName + " " + lastName;
    document.write('<div class="box"><span class="label">String concat:</span> <span class="value">' + fullName + '</span></div>');
    console.log("a =", a, "  b =", b);
    console.log("a + b =", a + b);
    console.log("a % b =", a % b);
    console.log("fullName =", fullName);
  </script>
</body>
</html>`);
  const [consoleOutput, setConsoleOutput] = useState('Click "Run Code" to view output here...');

  const editorRef = useRef(null);
  const highlighterRef = useRef(null);

  const handleEditorScroll = () => {
    if (editorRef.current && highlighterRef.current) {
      highlighterRef.current.scrollTop = editorRef.current.scrollTop;
      highlighterRef.current.scrollLeft = editorRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const handleMsg = (event) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' || prev.startsWith('⚠️') ? '' : prev + '\n';
          return base + event.data.log;
        });
      } else if (event.data && event.data.type === 'CONSOLE_ERROR') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' ? '' : prev + '\n';
          return base + `⚠️ Error: ${event.data.error}`;
        });
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  const handleContinue = (nextTabId) => {
    onNavigate('core_js_day2', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runCalc = () => {
    try {
      const l = parseFloat(calcLeft);
      const r = parseFloat(calcRight);
      let res;
      if (calcOp === '+') res = l + r;
      else if (calcOp === '-') res = l - r;
      else if (calcOp === '*') res = l * r;
      else if (calcOp === '/') res = r !== 0 ? l / r : 'Infinity';
      else if (calcOp === '%') res = l % r;
      else if (calcOp === '**') res = l ** r;
      else if (calcOp === '++') res = l + 1;
      else if (calcOp === '--') res = l - 1;
      setCalcResult(String(res));
    } catch { setCalcResult('Error'); }
  };

  const getComparisonResults = () => {
    let lv, rv;
    try { lv = JSON.parse(cmpLeft); } catch { lv = cmpLeft; }
    try { rv = JSON.parse(cmpRight); } catch { rv = cmpRight; }
    return [
      { op: '==',  label: 'Loose Equal',     result: String(lv == rv)  },
      { op: '===', label: 'Strict Equal',     result: String(lv === rv) },
      { op: '!=',  label: 'Loose Not Equal',  result: String(lv != rv)  },
      { op: '!==', label: 'Strict Not Equal', result: String(lv !== rv) },
      { op: '>',   label: 'Greater Than',     result: String(lv > rv)   },
      { op: '<',   label: 'Less Than',        result: String(lv < rv)   },
      { op: '>=',  label: 'Greater or Equal', result: String(lv >= rv)  },
      { op: '<=',  label: 'Less or Equal',    result: String(lv <= rv)  },
    ];
  };

  const getBitwiseResult = () => {
    try {
      const a = parseInt(bwA, 10);
      const b = parseInt(bwB, 10);
      let result;
      if (bwOp === '&')  result = a & b;
      else if (bwOp === '|')  result = a | b;
      else if (bwOp === '^')  result = a ^ b;
      else if (bwOp === '~')  result = ~a;
      else if (bwOp === '<<') result = a << b;
      else if (bwOp === '>>') result = a >> b;
      return {
        aDecimal: a, bDecimal: b,
        aBinary: (a >>> 0).toString(2).padStart(8, '0'),
        bBinary: (b >>> 0).toString(2).padStart(8, '0'),
        result, resultBinary: (result >>> 0).toString(2).padStart(8, '0')
      };
    } catch { return null; }
  };

  const getTernaryResult = () => parseInt(ternScore, 10) >= 50 ? 'Pass ✅' : 'Fail ❌';

  const executePlaygroundCode = () => {
    setConsoleOutput('');
    setRunTrigger(prev => prev + 1);
    if (editorCode.includes('<html') || editorCode.includes('<div') || editorCode.includes('<style>')) {
      setPlaygroundMode('preview');
    } else {
      setPlaygroundMode('console');
    }
  };

  const loadPresetSnippet = (name) => {
    if (name === 'arithmetic') {
      setEditorCode(`// Arithmetic Operators
var a = 10;
var b = 3;
console.log("a + b =", a + b);
console.log("a - b =", a - b);
console.log("a * b =", a * b);
console.log("a / b =", a / b);
console.log("a % b =", a % b);
console.log("a ** b =", a ** b);
var x = 5;
console.log("x++ =", x++);
console.log("x now =", x);
console.log("++x =", ++x);`);
    } else if (name === 'assignment') {
      setEditorCode(`// Assignment Operators
var x = 10;
console.log("Initial x =", x);
x += 5;
console.log("x += 5  → x =", x);
x -= 3;
console.log("x -= 3  → x =", x);
x *= 2;
console.log("x *= 2  → x =", x);
x /= 4;
console.log("x /= 4  → x =", x);
x %= 4;
console.log("x %= 4  → x =", x);
x **= 3;
console.log("x **= 3 → x =", x);`);
    } else if (name === 'comparison') {
      setEditorCode(`// Comparison Operators
var a = 5;
var b = "5";
console.log("a == b  →", a == b);
console.log("a === b →", a === b);
console.log("a != b  →", a != b);
console.log("a !== b →", a !== b);
var p = 10;
var q = 20;
console.log("p > q   →", p > q);
console.log("p < q   →", p < q);
console.log("p >= 10 →", p >= 10);
console.log("p <= 9  →", p <= 9);`);
    } else if (name === 'logical') {
      setEditorCode(`// Logical Operators
var x = true;
var y = false;
console.log("x && y →", x && y);
console.log("x || y →", x || y);
console.log("!x     →", !x);
var age = 20;
var hasID = true;
console.log("Can enter:", age >= 18 && hasID);
console.log("Discount:", age < 18 || age > 60);`);
    } else if (name === 'string') {
      setEditorCode(`// String Operator — Concatenation
var firstName = "Alpha";
var lastName  = "Fly";
var fullName  = firstName + " " + lastName;
console.log("Full Name:", fullName);
var greeting = "Score: " + 95;
console.log(greeting);
var message = "Hello";
message += ", World!";
console.log(message);
// Common mistake: string + number
console.log('"10" + 5 =', "10" + 5);
console.log('10 + 5 =',    10 + 5);`);
    } else if (name === 'calculator') {
      setEditorCode(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f8fafc; padding: 20px; }
    h2 { color: #ca8a04; }
    .result-box { background: white; border: 2px solid #ca8a04; border-radius: 10px; padding: 14px 18px; max-width: 360px; margin: 8px 0; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }
    .label { font-weight: bold; color: #475569; }
    .value { color: #1e40af; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Calculator Program (Slide Code Demo)</h2>
  <script>
    var num1 = 10;
    var num2 = 5;
    var add      = num1 + num2;
    var subtract = num1 - num2;
    var multiply = num1 * num2;
    var divide   = num1 / num2;
    var modulus  = num1 % num2;
    document.write('<div class="result-box"><span class="label">num1 + num2 =</span> <span class="value">' + add + '</span></div>');
    document.write('<div class="result-box"><span class="label">num1 - num2 =</span> <span class="value">' + subtract + '</span></div>');
    document.write('<div class="result-box"><span class="label">num1 * num2 =</span> <span class="value">' + multiply + '</span></div>');
    document.write('<div class="result-box"><span class="label">num1 / num2 =</span> <span class="value">' + divide + '</span></div>');
    document.write('<div class="result-box"><span class="label">num1 % num2 =</span> <span class="value">' + modulus + '</span></div>');
    console.log("Addition:", add);
    console.log("Subtraction:", subtract);
    console.log("Multiplication:", multiply);
    console.log("Division:", divide);
    console.log("Modulus:", modulus);
  </script>
</body>
</html>`);
    }
  };

  const handleSelectAnswer = (qId, idx) => setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0;
    quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c += 1; });
    setScore(c);
  };

  const cell = (v, extra = {}) => ({
    padding: '8px 14px', borderBottom: '1px solid #f1f5f9', fontFamily: 'monospace', ...extra
  });

  return (
    <AnimatePresence mode="wait">

      {/* ── TAB 1: OPERATORS OVERVIEW ─────────────────── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 2 • JavaScript Operators" title="JavaScript Operators">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              An <strong>operator</strong> is a special symbol used to perform operations on operands (values and variables).
              JavaScript has a rich set of operators grouped by category.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Operator Categories</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icon: '📝', title: 'Assignment Operators', desc: 'Assign values to variables. e.g. =, +=, -=, *=, /=, %=, **=', color: '#fef9c3' },
                { icon: '🔍', title: 'Comparison Operators', desc: 'Compare two values and return boolean. e.g. ==, ===, !=, !==, >, <, >=, <=', color: '#eff6ff' },
                { icon: '➕', title: 'Arithmetic Operators', desc: 'Perform math on numbers. e.g. +, -, *, /, %, **, ++, --', color: '#f0fdf4' },
                { icon: '🔌', title: 'Bitwise Operators',   desc: 'Work on 32-bit integers at bit level. e.g. &, |, ^, ~, <<, >>', color: '#fdf4ff' },
                { icon: '🔗', title: 'Logical Operators',   desc: 'Combine boolean conditions. e.g. &&, ||, !', color: '#fff7ed' },
                { icon: '🔤', title: 'String Operator',     desc: 'Concatenate strings using + and +=', color: '#ecfdf5' },
                { icon: '❓', title: 'Ternary Operator',    desc: 'Inline condition: condition ? valueIfTrue : valueIfFalse', color: '#fef2f2' },
              ].map(card => (
                <div key={card.title} style={{ background: card.color, border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{card.title}</div>
                    <div style={{ fontSize: '0.82rem', color: '#475569' }}>{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>What is an Operand?</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The values that an operator works on are called <strong>operands</strong>. In <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>10 + 5</code>, both <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>10</code> and <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>5</code> are operands, and <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>+</code> is the operator.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`// Binary operator — two operands
10 + 5       // operands: 10 and 5

// Unary operator — one operand
var x = 5;
x++;         // operand: x (increment by 1)

// Ternary operator — three operands
// condition ? value1 : value2`} />
            </div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assignment_arithmetic')}>
              Next: Assignment &amp; Arithmetic →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: ASSIGNMENT & ARITHMETIC ──────────────── */}
      {activeTab === 'assignment_arithmetic' && (
        <Section key="assignment_arithmetic" eyebrow="Day 2 • Operators" title="Assignment & Arithmetic Operators">

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Assignment Operators</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Assignment operators assign values to JavaScript variables. The basic assignment operator is <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>=</code>. Compound operators perform an operation AND assign the result in one step.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#fef9c3' }}>
                    {['Operator', 'Example', 'Equivalent To', 'Description'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #ca8a04' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['=',   'x = 5',   '—',          'Assigns 5 to x'],
                    ['+=',  'x += 3',  'x = x + 3',  'Adds 3, assigns result'],
                    ['-=',  'x -= 3',  'x = x - 3',  'Subtracts 3, assigns result'],
                    ['*=',  'x *= 2',  'x = x * 2',  'Multiplies by 2, assigns result'],
                    ['/=',  'x /= 2',  'x = x / 2',  'Divides by 2, assigns result'],
                    ['%=',  'x %= 3',  'x = x % 3',  'Modulus, assigns remainder'],
                    ['**=', 'x **= 2', 'x = x ** 2', 'Exponentiation, assigns result'],
                  ].map(([op, ex, eq, desc], i) => (
                    <tr key={op} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ ...cell(null), fontWeight: 700, color: '#ca8a04' }}>{op}</td>
                      <td style={{ ...cell(null), color: '#1e40af' }}>{ex}</td>
                      <td style={{ ...cell(null), color: '#475569' }}>{eq}</td>
                      <td style={{ ...cell(null), fontFamily: 'sans-serif', color: '#64748b' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Arithmetic Operators</h3>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f0fdf4' }}>
                    {['Op', 'Name', 'Example', 'Result'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #10b981' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['+',  'Addition',       '10 + 3',  '13'],
                    ['-',  'Subtraction',    '10 - 3',  '7'],
                    ['*',  'Multiplication', '10 * 3',  '30'],
                    ['/',  'Division',       '10 / 3',  '3.333…'],
                    ['%',  'Modulus',        '10 % 3',  '1'],
                    ['**', 'Exponentiation', '2 ** 10', '1024'],
                    ['++', 'Increment',      'x++',     'x + 1'],
                    ['--', 'Decrement',      'x--',     'x - 1'],
                  ].map(([op, name, ex, res], i) => (
                    <tr key={op + name} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ ...cell(null), fontWeight: 700, color: '#10b981' }}>{op}</td>
                      <td style={{ padding: '8px 14px', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{name}</td>
                      <td style={{ ...cell(null), color: '#1e40af' }}>{ex}</td>
                      <td style={{ ...cell(null), fontWeight: 700, color: '#ca8a04' }}>{res}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="panel" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>🧮 Interactive Arithmetic Calculator</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
              <input type="number" value={calcLeft} onChange={e => setCalcLeft(e.target.value)} style={{ width: '90px', padding: '0.5rem', border: '1px solid #ca8a04', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }} />
              <select value={calcOp} onChange={e => setCalcOp(e.target.value)} style={{ padding: '0.5rem 0.75rem', border: '1px solid #ca8a04', borderRadius: '6px', fontWeight: 700, fontSize: '1rem', color: '#ca8a04' }}>
                {['+', '-', '*', '/', '%', '**', '++', '--'].map(op => <option key={op} value={op}>{op}</option>)}
              </select>
              {calcOp !== '++' && calcOp !== '--' && (
                <input type="number" value={calcRight} onChange={e => setCalcRight(e.target.value)} style={{ width: '90px', padding: '0.5rem', border: '1px solid #ca8a04', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }} />
              )}
              <button onClick={runCalc} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                = Calculate
              </button>
            </div>
            {calcResult !== null && (
              <div style={{ background: '#fff', border: '2px solid #ca8a04', borderRadius: '8px', padding: '1rem', display: 'inline-block', fontSize: '1.3rem', fontWeight: 700, color: '#ca8a04', fontFamily: 'monospace' }}>
                Result: {calcResult}
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day2', 'intro')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('comparison_logical')}>Next: Comparison &amp; Logical →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: COMPARISON & LOGICAL ─────────────────── */}
      {activeTab === 'comparison_logical' && (
        <Section key="comparison_logical" eyebrow="Day 2 • Operators" title="Comparison & Logical Operators">

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Comparison Operators</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Comparison operators compare two values and return a <strong>boolean</strong> — either <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>true</code> or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>false</code>.
            </p>
            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
              <strong>⚠️ Key Distinction:</strong> <code style={{ background: '#fff', padding: '1px 5px', borderRadius: '3px', marginLeft: '4px' }}>==</code> checks value only (loose), <code style={{ background: '#fff', padding: '1px 5px', borderRadius: '3px', marginLeft: '4px' }}>===</code> checks value AND type (strict). Always prefer <code style={{ background: '#fff', padding: '1px 5px', borderRadius: '3px' }}>===</code>.
            </div>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#eff6ff' }}>
                    {['Operator', 'Name', 'Example', 'Result'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #3b82f6' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['==',  'Loose Equal',      '5 == "5"',  'true'],
                    ['===', 'Strict Equal',     '5 === "5"', 'false'],
                    ['!=',  'Loose Not Equal',  '5 != "5"',  'false'],
                    ['!==', 'Strict Not Equal', '5 !== "5"', 'true'],
                    ['>',   'Greater Than',     '10 > 5',    'true'],
                    ['<',   'Less Than',        '10 < 5',    'false'],
                    ['>=',  'Greater or Equal', '5 >= 5',    'true'],
                    ['<=',  'Less or Equal',    '4 <= 5',    'true'],
                  ].map(([op, name, ex, res], i) => (
                    <tr key={op + name} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ ...cell(null), fontWeight: 700, color: '#3b82f6' }}>{op}</td>
                      <td style={{ padding: '8px 14px', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{name}</td>
                      <td style={{ ...cell(null), color: '#1e40af' }}>{ex}</td>
                      <td style={{ ...cell(null), fontWeight: 700, color: res === 'true' ? '#10b981' : '#ef4444' }}>{res}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison Checker */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1.2rem' }}>
              <h4 style={{ marginBottom: '0.75rem', color: '#1e40af' }}>🔍 Interactive Comparison Checker</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                <input value={cmpLeft}  onChange={e => setCmpLeft(e.target.value)}  placeholder="Left value"  style={{ width: '120px', padding: '0.45rem', border: '1px solid #3b82f6', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 700 }} />
                <span style={{ fontWeight: 700, color: '#64748b' }}>vs</span>
                <input value={cmpRight} onChange={e => setCmpRight(e.target.value)} placeholder="Right value" style={{ width: '120px', padding: '0.45rem', border: '1px solid #3b82f6', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 700 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {getComparisonResults().map(({ op, label, result }) => (
                  <div key={op} style={{ background: '#fff', borderRadius: '6px', padding: '0.5rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#3b82f6', marginRight: '6px' }}>{op}</span>
                    <span style={{ color: '#475569', fontSize: '0.8rem' }}>{label}</span>
                    <span style={{ fontWeight: 700, color: result === 'true' ? '#10b981' : '#ef4444', fontFamily: 'monospace' }}>{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Logical Operators</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Logical operators are used to determine the logic between variables or values.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#fff7ed' }}>
                    {['Op', 'Name', 'Description', 'Example', 'Result'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #f97316' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['&&', 'Logical AND', 'True only if BOTH are true',         'true && false', 'false'],
                    ['||', 'Logical OR',  'True if AT LEAST ONE is true',        'true || false', 'true'],
                    ['!',  'Logical NOT', 'Reverses the boolean value',          '!true',         'false'],
                  ].map(([op, name, desc, ex, res], i) => (
                    <tr key={op} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ ...cell(null), fontWeight: 700, fontSize: '1.05rem', color: '#f97316' }}>{op}</td>
                      <td style={{ padding: '8px 14px', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{name}</td>
                      <td style={{ padding: '8px 14px', color: '#475569', fontSize: '0.85rem', borderBottom: '1px solid #f1f5f9' }}>{desc}</td>
                      <td style={{ ...cell(null), color: '#1e40af' }}>{ex}</td>
                      <td style={{ ...cell(null), fontWeight: 700, color: res === 'true' ? '#10b981' : '#ef4444' }}>{res}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>Truth Table</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    {['A', 'B', 'A && B', 'A || B', '!A'].map(h => (
                      <th key={h} style={{ padding: '8px 16px', borderBottom: '2px solid #e2e8f0', fontFamily: 'monospace' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [true, true, true, true, false],
                    [true, false, false, true, false],
                    [false, true, false, true, true],
                    [false, false, false, false, true],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      {row.map((val, j) => (
                        <td key={j} style={{ padding: '7px 16px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 600, borderBottom: '1px solid #f1f5f9', color: val === true ? '#10b981' : '#ef4444' }}>
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day2', 'assignment_arithmetic')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('bitwise_string_ternary')}>Next: Bitwise, String &amp; Ternary →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: BITWISE, STRING & TERNARY ───────────── */}
      {activeTab === 'bitwise_string_ternary' && (
        <Section key="bitwise_string_ternary" eyebrow="Day 2 • Operators" title="Bitwise, String & Ternary Operators">

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Bitwise Operators</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Bitwise operators work on <strong>32-bit integers at the binary (bit) level</strong>. JS converts the number to a 32-bit signed integer, performs the operation, then converts back.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#fdf4ff' }}>
                    {['Op', 'Name', 'Example', 'Binary', 'Result'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #a855f7' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['&',  'AND',         '5 & 3',  '0101 & 0011', '1'],
                    ['|',  'OR',          '5 | 3',  '0101 | 0011', '7'],
                    ['^',  'XOR',         '5 ^ 3',  '0101 ^ 0011', '6'],
                    ['~',  'NOT',         '~5',     '~00000101',   '-6'],
                    ['<<', 'Left Shift',  '5 << 1', '0101 → 1010', '10'],
                    ['>>', 'Right Shift', '5 >> 1', '0101 → 0010', '2'],
                  ].map(([op, name, ex, bin, res], i) => (
                    <tr key={op} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ ...cell(null), fontWeight: 700, color: '#a855f7' }}>{op}</td>
                      <td style={{ padding: '8px 14px', fontWeight: 600, color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{name}</td>
                      <td style={{ ...cell(null), color: '#1e40af' }}>{ex}</td>
                      <td style={{ ...cell(null), color: '#64748b', fontSize: '0.82rem' }}>{bin}</td>
                      <td style={{ ...cell(null), fontWeight: 700, color: '#a855f7' }}>{res}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bitwise Visualizer */}
            <div style={{ background: '#fdf4ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '1.2rem' }}>
              <h4 style={{ marginBottom: '0.75rem', color: '#7c3aed' }}>🔌 Bitwise Visualizer</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                <input type="number" value={bwA} onChange={e => setBwA(e.target.value)} style={{ width: '70px', padding: '0.4rem', border: '1px solid #a855f7', borderRadius: '6px', textAlign: 'center', fontWeight: 700 }} />
                <select value={bwOp} onChange={e => setBwOp(e.target.value)} style={{ padding: '0.4rem 0.6rem', border: '1px solid #a855f7', borderRadius: '6px', fontWeight: 700, color: '#7c3aed' }}>
                  {['&', '|', '^', '~', '<<', '>>'].map(op => <option key={op} value={op}>{op}</option>)}
                </select>
                {bwOp !== '~' && <input type="number" value={bwB} onChange={e => setBwB(e.target.value)} style={{ width: '70px', padding: '0.4rem', border: '1px solid #a855f7', borderRadius: '6px', textAlign: 'center', fontWeight: 700 }} />}
              </div>
              {(() => {
                const r = getBitwiseResult();
                if (!r) return null;
                return (
                  <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div><span style={{ color: '#64748b', display: 'inline-block', width: '80px' }}>A ({r.aDecimal}):</span><span style={{ color: '#1e40af', letterSpacing: '0.15em' }}>{r.aBinary}</span></div>
                    {bwOp !== '~' && <div><span style={{ color: '#64748b', display: 'inline-block', width: '80px' }}>B ({r.bDecimal}):</span><span style={{ color: '#1e40af', letterSpacing: '0.15em' }}>{r.bBinary}</span></div>}
                    <div style={{ borderTop: '1px solid #e9d5ff', paddingTop: '0.4rem' }}>
                      <span style={{ color: '#7c3aed', fontWeight: 700, display: 'inline-block', width: '80px' }}>Result ({r.result}):</span>
                      <span style={{ color: '#7c3aed', fontWeight: 700, letterSpacing: '0.15em' }}>{r.resultBinary}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. String Operator</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>+</code> operator joins strings together — called <strong>concatenation</strong>. The <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>+=</code> operator also works for building strings.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`var text1 = "Hello";
var text2 = "World";
var result = text1 + " " + text2;
console.log(result);        // "Hello World"

var msg = "Good ";
msg += "Morning!";
console.log(msg);           // "Good Morning!"

// ⚠️ String + Number — type coercion!
console.log("10" + 5);     // "105"  (NOT 15!)
console.log(10 + 5);       // 15`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>3. Conditional (Ternary) Operator</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The ternary operator is the only operator that takes <strong>three operands</strong>. It is a compact alternative to a simple if-else.
            </p>
            <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', textAlign: 'center', fontSize: '1rem', fontFamily: 'monospace' }}>
              <span style={{ color: '#3b82f6' }}>condition</span>
              <span style={{ color: '#ca8a04', fontWeight: 700 }}> ? </span>
              <span style={{ color: '#10b981' }}>valueIfTrue</span>
              <span style={{ color: '#ca8a04', fontWeight: 700 }}> : </span>
              <span style={{ color: '#ef4444' }}>valueIfFalse</span>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`var age = 20;
var result = age >= 18 ? "Adult" : "Minor";
console.log(result);   // "Adult"

var score = 45;
var grade = score >= 50 ? "Pass" : "Fail";
console.log(grade);    // "Fail"`} />
            </div>

            {/* Interactive Ternary Builder */}
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1.2rem' }}>
              <h4 style={{ marginBottom: '0.75rem', color: '#dc2626' }}>❓ Interactive Ternary Builder</h4>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>score =</span>
                <input type="number" value={ternScore} onChange={e => setTernScore(e.target.value)} style={{ width: '80px', padding: '0.4rem', border: '1px solid #dc2626', borderRadius: '6px', textAlign: 'center', fontWeight: 700 }} />
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', marginBottom: '0.5rem', color: '#1e293b' }}>
                <span style={{ color: '#3b82f6' }}>score &gt;= 50</span>
                <span style={{ color: '#ca8a04', fontWeight: 700 }}> ? </span>
                <span style={{ color: '#10b981' }}>&quot;Pass&quot;</span>
                <span style={{ color: '#ca8a04', fontWeight: 700 }}> : </span>
                <span style={{ color: '#ef4444' }}>&quot;Fail&quot;</span>
              </div>
              <div style={{ background: '#fff', border: '2px solid #dc2626', borderRadius: '8px', padding: '0.75rem', display: 'inline-block', fontWeight: 700, fontSize: '1.1rem', color: getTernaryResult().includes('Pass') ? '#10b981' : '#ef4444', fontFamily: 'monospace' }}>
                Result: {getTernaryResult()}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day2', 'comparison_logical')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('expressions')}>Next: Expressions →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: EXPRESSIONS ─────────────────────────── */}
      {activeTab === 'expressions' && (
        <Section key="expressions" eyebrow="Day 2 • JavaScript Expressions" title="JavaScript Expressions">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              In JavaScript, an <strong>expression</strong> is a unit of code that <em>evaluates to a single value</em>. This value can be of any data type — a number, string, boolean, object, or function.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Expressions are fundamental building blocks of JavaScript programs, as they are used to <strong>compute, assign, and manipulate values</strong>.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Types of Expressions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { title: 'Arithmetic Expression', example: '5 + 3 * 2', result: '11', color: '#f0fdf4' },
                { title: 'String Expression',     example: '"Hello" + " " + "World"', result: '"Hello World"', color: '#eff6ff' },
                { title: 'Logical Expression',    example: 'true && false', result: 'false', color: '#fff7ed' },
                { title: 'Assignment Expression', example: 'x = 10', result: '10 (and assigns)', color: '#fef9c3' },
                { title: 'Comparison Expression', example: '5 > 3', result: 'true', color: '#fdf4ff' },
                { title: 'Ternary Expression',    example: 'age >= 18 ? "Adult" : "Minor"', result: 'string value', color: '#fef2f2' },
              ].map(({ title, example, result, color }) => (
                <div key={title} style={{ background: color, border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{title}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#1e40af', background: '#fff', padding: '4px 8px', borderRadius: '4px', marginBottom: '0.4rem' }}>{example}</div>
                  <div style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600, fontFamily: 'monospace' }}>= {result}</div>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Expression vs Statement</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: '✅ Expression', points: ['Produces a value', 'Can be part of a statement', 'e.g. 5 + 3, x = 10, true && false'], color: '#f0fdf4', border: '#10b981' },
                { title: '📋 Statement', points: ['Performs an action', 'May not produce a value', 'e.g. var x = 5;  console.log(x);'], color: '#fff7ed', border: '#f97316' },
              ].map(({ title, points, color, border }) => (
                <div key={title} style={{ background: color, border: `1px solid ${border}`, borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{title}</div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.88rem', lineHeight: 1.8 }}>
                    {points.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem' }}>
              <SyntaxHighlighter code={`// Expressions — produce a value
5 + 3             // evaluates to 8
"Hi" + " there"   // evaluates to "Hi there"
10 > 5            // evaluates to true
x = 20            // evaluates to 20 (and assigns)

// Statements — perform an action
var x = 10;       // variable declaration statement
console.log(x);   // function call statement`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day2', 'bitwise_string_ternary')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Write and run JavaScript code live. Select a preset to load a ready-made example — the <strong>Calculator (Slide Demo)</strong> matches the Notepad++ code demo from the PDF slides.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['arithmetic',  '➕ Arithmetic'],
                ['assignment',  '📝 Assignment'],
                ['comparison',  '🔍 Comparison'],
                ['logical',     '🔗 Logical'],
                ['string',      '🔤 String'],
                ['calculator',  '🧮 Calculator (Slide Demo)'],
              ].map(([key, label]) => (
                <button key={key} onClick={() => loadPresetSnippet(key)}
                  style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {/* Editor */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Source Code Editor</span>
                  <button onClick={executePlaygroundCode} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.3rem 1.2rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Run Code &rarr;
                  </button>
                </div>
                <div style={{ position: 'relative', width: '100%', height: '320px', background: '#0f172a' }}>
                  <div ref={highlighterRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', pointerEvents: 'none', whiteSpace: 'pre', overflow: 'hidden', margin: 0 }}>
                    <SyntaxHighlighter code={editorCode} style={{ overflowX: 'visible' }} />
                  </div>
                  <textarea ref={editorRef} value={editorCode} onChange={e => setEditorCode(e.target.value)} onScroll={handleEditorScroll} wrap="off"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', background: 'transparent', color: 'transparent', caretColor: '#fff', resize: 'none', outline: 'none', border: 'none', whiteSpace: 'pre', overflow: 'auto', margin: 0 }} />
                </div>
              </div>

              {/* Output */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.4rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {['console', 'preview'].map(mode => (
                    <button key={mode} onClick={() => setPlaygroundMode(mode)}
                      style={{ background: 'none', border: 'none', fontSize: '0.78rem', fontWeight: 700, color: playgroundMode === mode ? '#ca8a04' : '#64748b', borderBottom: playgroundMode === mode ? '2px solid #ca8a04' : '2px solid transparent', padding: '0.3rem 0.5rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                      {mode === 'console' ? 'Console Logs' : 'Live Page Preview'}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, minHeight: '320px', background: '#1e293b', position: 'relative' }}>
                  {playgroundMode === 'console' ? (
                    <pre style={{ margin: 0, padding: '1rem', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, fontFamily: 'monospace', fontSize: '0.88rem', background: '#1e293b', color: '#38bdf8', overflowY: 'auto', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {consoleOutput}
                    </pre>
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#fff' }}>
                      {runTrigger > 0 ? (
                        <iframe
                          key={runTrigger}
                          srcDoc={`<!DOCTYPE html><html><head><style>body{font-family:sans-serif;margin:10px;}</style></head><body><script>const _l=console.log;console.log=(...a)=>{_l(...a);window.parent.postMessage({type:'CONSOLE_LOG',log:a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ')},'*');};window.onerror=(m)=>{window.parent.postMessage({type:'CONSOLE_ERROR',error:m},'*');return false;};</script>${editorCode.includes('<html') || editorCode.includes('<script') ? editorCode : '<script>' + editorCode + '</script>'}</body></html>`}
                          title="Sandbox Preview"
                          sandbox="allow-scripts"
                          style={{ width: '100%', height: '320px', border: 'none' }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '0.9rem' }}>
                          Click &quot;Run Code&quot; to render preview
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day2', 'expressions')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 2 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 2 • Assessment" title="Day 2 Assessment — JavaScript Operators">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Mistakes with Operators
            </h3>
            {[
              { mistake: 'Using = instead of == or ===', code: `var x = 5;\n// if (x = 10) { }  // ❌ WRONG: assigns 10, always true!\n// if (x == 10) { } // ✅ Correct: compares value` },
              { mistake: 'Using == instead of ===',     code: `0 == false    // true  (loose — JS coerces type)\n0 === false   // false (strict — different types)\n"" == false   // true  (loose)\n"" === false  // false (strict)` },
              { mistake: 'String + Number coercion',    code: `"5" + 3    // "53"  — string concat (NOT 8!)\n"5" - 3    //  2   — subtraction forces number\n"5" * 2    //  10  — multiplication forces number` },
              { mistake: 'Division by zero',            code: `var result = 10 / 0;\nconsole.log(result);   // Infinity (not an error!)` },
              { mistake: 'Forgetting operator precedence', code: `var r = 2 + 3 * 4;     // 14, NOT 20  (* first!)\nvar r = (2 + 3) * 4;   // 20  (parentheses control order)` },
            ].map(({ mistake, code }) => (
              <div key={mistake} style={{ border: '1px solid #fecaca', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                <div style={{ background: '#fef2f2', padding: '0.6rem 1rem', fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>⚠️ {mistake}</div>
                <div style={{ background: '#0f172a', padding: '0.75rem 1rem' }}><SyntaxHighlighter code={code} /></div>
              </div>
            ))}
          </div>

          {/* Quiz */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="#ca8a04" /> Quick Knowledge Check
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map((question) => {
                const selected = selectedAnswers[question.id];
                const checked  = checkedQuestions[question.id];
                return (
                  <div key={question.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.2rem' }}>
                    <p style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{question.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {question.options.map((opt, idx) => {
                        let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                        if (selected === idx) { bg = '#fffbeb'; border = '1px solid #ca8a04'; color = '#92400e'; }
                        if (checked) {
                          if (idx === question.ans) { bg = '#f0fdf4'; border = '1px solid #10b981'; color = '#065f46'; }
                          else if (selected === idx) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#991b1b'; }
                        }
                        return (
                          <button key={idx} onClick={() => !checked && handleSelectAnswer(question.id, idx)}
                            style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border, background: bg, color, textAlign: 'left', cursor: checked ? 'default' : 'pointer', fontWeight: selected === idx ? 600 : 400 }}>
                            {['A', 'B', 'C', 'D'][idx]}. {opt}
                          </button>
                        );
                      })}
                    </div>
                    {!checked && selected !== undefined && (
                      <button onClick={() => handleCheckQuestion(question.id)} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.4rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                        Check Answer
                      </button>
                    )}
                    {checked && (
                      <div style={{ fontSize: '0.85rem', color: selected === question.ans ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                        {selected === question.ans ? '✅ Correct!' : `❌ Incorrect. Correct: ${['A','B','C','D'][question.ans]}. ${question.options[question.ans]}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button onClick={checkFinalScore} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                Submit All &amp; Get Score
              </button>
              {score !== null && (
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: score >= 4 ? '#10b981' : score >= 3 ? '#f59e0b' : '#ef4444' }}>
                  Score: {score}/{quizQuestions.length} — {score === 5 ? '🏆 Perfect!' : score >= 4 ? '🎉 Great job!' : score >= 3 ? '👍 Good effort!' : '📚 Keep practising!'}
                </div>
              )}
            </div>
          </div>

          {/* Assignments */}
          <div className="panel" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
            <h3 style={{ marginBottom: '1rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} /> Day 2 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Create a <strong>calculator</strong> using all arithmetic operators on two variables and display results with <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>document.write</code>.</li>
              <li>Declare <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>price = 100</code> and use all assignment operators (<code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>+=</code>, <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>-=</code>, etc.) logging each step.</li>
              <li>Compare <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>10</code> and <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>"10"</code> using <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>==</code> vs <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>===</code>. Explain the difference.</li>
              <li>Use the <strong>string operator</strong> to build a student profile card with name, age, and course, displayed with <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>document.write</code>.</li>
              <li>Write a ternary expression to check if a number is <strong>even or odd</strong> using the <code style={{ background: '#fff', padding: '1px 4px', borderRadius: '3px' }}>%</code> operator.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day2', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
