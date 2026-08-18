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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|parseInt|parseFloat|isNaN|alert)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
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
  { id: 'q1', q: 'Which loop is guaranteed to execute at least once?', options: ['for loop', 'while loop', 'do-while loop', 'forEach loop'], ans: 2 },
  { id: 'q2', q: 'Which loop is best suited for iterating over the properties (keys) of an object?', options: ['for...of', 'for...in', 'forEach', 'while'], ans: 1 },
  { id: 'q3', q: 'What does the break statement do inside a loop?', options: ['Skips the current iteration', 'Exits the loop entirely', 'Restarts the loop', 'Suspends execution for 1 second'], ans: 1 },
  { id: 'q4', q: 'Which loop type does NOT support break and continue statements?', options: ['for loop', 'for...of loop', 'forEach loop', 'while loop'], ans: 2 },
  { id: 'q5', q: 'What is the correct syntax for a standard for loop?', options: ['for (i = 0; i < 5) { }', 'for (var i = 0; i < 5; i++) { }', 'for (i <= 5; i++) { }', 'for (var i = 0, i < 5, i++) { }'], ans: 1 },
];

export default function CoreJSDay4({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Pattern visualizer state
  const [patternRows, setPatternRows] = useState(5);
  const [patternResult, setPatternResult] = useState([]);

  // Loop demo selection state
  const [demoNum, setDemoNum] = useState(5);

  // Playground state
  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f8fafc; padding: 20px; }
    h2 { color: #ca8a04; }
    .box { background: white; border: 2px solid #ca8a04; border-radius: 8px; padding: 12px 18px; max-width: 360px; margin: 8px 0; }
  </style>
</head>
<body>
  <h2>Multiplication Table</h2>
  <script>
    var num = 5;
    for (var i = 1; i <= 10; i++) {
      var result = num * i;
      document.write('<div class="box">' + num + ' x ' + i + ' = ' + result + '</div>');
    }
  </script>
</body>
</html>`);
  const [consoleOutput, setConsoleOutput] = useState('Click "Run Code" to view output here...');

  const [feArr] = useState(['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']);
  const [feFilter, setFeFilter] = useState('');
  const feFiltered = feArr.filter(item => item.toLowerCase().includes(feFilter.toLowerCase()));

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
    onNavigate('core_js_day4', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate loop patterns
  const generatePattern = () => {
    const rows = parseInt(patternRows, 10);
    if (isNaN(rows) || rows <= 0 || rows > 10) return;
    const lines = [];
    for (let i = 1; i <= rows; i++) {
      let lineStr = '';
      for (let j = 1; j <= i; j++) {
        lineStr += '* ';
      }
      lines.push(lineStr);
    }
    setPatternResult(lines);
  };

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
    if (name === 'forloop') {
      setEditorCode(`// Standard for loop
for (var i = 1; i <= 5; i++) {
  console.log("Iteration number:", i);
}`);
    } else if (name === 'forin') {
      setEditorCode(`// for...in loop (Iterates keys of an object)
var student = {
  name: "John",
  age: 20,
  course: "Core JS"
};

for (var key in student) {
  console.log(key + " : " + student[key]);
}`);
    } else if (name === 'forof') {
      setEditorCode(`// for...of loop (Iterates values of an array)
var colors = ["Red", "Green", "Blue"];

for (var val of colors) {
  console.log("Color element:", val);
}`);
    } else if (name === 'whileloop') {
      setEditorCode(`// while loop
var count = 1;
while (count <= 5) {
  console.log("Count is:", count);
  count++;
}`);
    } else if (name === 'dowhile') {
      setEditorCode(`// do-while loop (Runs at least once!)
var i = 10;
do {
  console.log("This will print once even though i is 10:", i);
  i++;
} while (i < 5);`);
    } else if (name === 'miniproject') {
      setEditorCode(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f8fafc; padding: 20px; }
    .box { background: white; border: 2px solid #ca8a04; border-radius: 8px; padding: 12px 18px; margin: 6px 0; }
  </style>
</head>
<body>
  <h2>Mini Project: Multiples Generator</h2>
  <script>
    var num = 7;
    document.write('<h3>Table of ' + num + '</h3>');
    for (var i = 1; i <= 10; i++) {
      document.write('<div class="box">' + num + ' x ' + i + ' = ' + (num * i) + '</div>');
    }
  </script>
</body>
</html>`);
    } else if (name === 'foreach') {
      setEditorCode(`// Array forEach method
var numbers = [10, 20, 30, 40, 50];
var sum = 0;

numbers.forEach(function(num) {
  sum += num;
  console.log("Adding: " + num + " -> Current Sum: " + sum);
});

console.log("Final Sum: " + sum);`);
    }
  };

  const handleSelectAnswer = (qId, idx) => setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0;
    quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c += 1; });
    setScore(c);
  };

  return (
    <AnimatePresence mode="wait">

      {/* ── TAB 1: INTRO ─────────────────── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 4 • JavaScript Loops" title="Loops in JavaScript">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              In JavaScript, <strong>loops</strong> are used to repeatedly execute a block of code as long as a specified condition remains true. They are incredibly useful for automating repetitive tasks, iterating through array collections, or generating recurring outputs.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Categories of Loops</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'for loop', desc: 'Repeat code a specific number of times.', example: 'for (var i = 0; i < 5; i++)', color: '#eff6ff' },
                { label: 'for...in loop', desc: 'Loops through the keys/properties of an object.', example: 'for (var key in obj)', color: '#fef9c3' },
                { label: 'for...of loop', desc: 'Loops through the values of an iterable (array).', example: 'for (var val of array)', color: '#fdf4ff' },
                { label: 'while loop', desc: 'Repeat code while a condition is true.', example: 'while (condition)', color: '#f0fdf4' },
                { label: 'do-while loop', desc: 'Guaranteed to execute at least once before checking the condition.', example: 'do { ... } while (condition)', color: '#fef2f2' },
              ].map(card => (
                <div key={card.label} style={{ background: card.color, border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{card.label}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.5rem' }}>{card.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>{card.example}</code>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('for_loops')}>
              Next: for, for...in &amp; for...of →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: FOR LOOPS ──────────────── */}
      {activeTab === 'for_loops' && (
        <Section key="for_loops" eyebrow="Day 4 • Loops" title="for, for...in &amp; for...of Loops">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. The Standard "for" loop</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              A standard `for` loop has three expressions: initialization, condition check, and increment/decrement.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`for (initialization; condition; increment) {
  // block of code to run
}`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. The "for...in" loop</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The `for...in` loop is designed to iterate over the enumerable **keys** (properties) of a JavaScript object.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var car = { brand: "Toyota", model: "Corolla", year: 2026 };
for (var prop in car) {
  console.log(prop + " = " + car[prop]);
}`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>3. The "for...of" loop</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The `for...of` loop is used to iterate over the actual **values** of an iterable collection (like arrays or strings).
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var list = ["Apples", "Bananas", "Cherries"];
for (var val of list) {
  console.log(val); // logs Apple, Bananas, Cherries
}`} />
            </div>

          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>4. Nested Loops</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              A <strong>nested loop</strong> is a loop inside another loop. The "inner loop" will execute all of its iterations for each single iteration of the "outer loop". This is commonly used for multi-dimensional data, grids, or drawing patterns.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Outer loop runs 3 times
for (var i = 1; i <= 3; i++) {
  console.log("Outer loop: i = " + i);
  // Inner loop runs 2 times for each outer loop iteration
  for (var j = 1; j <= 2; j++) {
    console.log("  Inner loop: j = " + j);
  }
}`} />
            </div>

            {/* Interactive check */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1.2rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e40af' }}>⭐ Interactive Nested Loop: Star Pattern Generator</h4>
              <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '1rem' }}>
                Change the number of rows to see how the nested loop generates a pyramid of stars.
              </p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: '#475569' }}>Number of Rows (1-10):</label>
                <input type="number" value={patternRows} onChange={e => setPatternRows(e.target.value)} style={{ width: '80px', padding: '0.4rem', border: '1px solid #3b82f6', borderRadius: '6px', textAlign: 'center', fontWeight: 700 }} />
                <button onClick={generatePattern} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.45rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                  Generate Pattern
                </button>
              </div>
              {patternResult.length > 0 && (
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', color: '#38bdf8', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  {patternResult.map((line, idx) => <div key={idx}>{line}</div>)}
                </div>
              )}

              <h5 style={{ color: '#1e40af', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Source Code for this Pattern Generator:</h5>
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                <SyntaxHighlighter code={`var rows = ${patternRows};
for (var i = 1; i <= rows; i++) {
  var lineStr = "";
  // Nested inner loop builds each row's characters
  for (var j = 1; j <= i; j++) {
    lineStr += "* ";
  }
  console.log(lineStr);
}`} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day4', 'intro')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('comparison_table')}>Next: Loop Comparison Table →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: COMPARISON TABLE ─────────────────── */}
      {activeTab === 'comparison_table' && (
        <Section key="comparison_table" eyebrow="Day 4 • Loop Comparison" title="for vs for...of vs for...in vs forEach">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              This comparison matrix details the core differences between the four primary loop structures in JavaScript:
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#fef9c3' }}>
                    {['Loop Type', 'Works On', 'Returns Values', 'Supports break/continue', 'Common Use'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #ca8a04' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['for',      'All',             'index via i',       'Yes', 'counting, custom loops'],
                    ['for...of', 'arrays, strings', 'direct values',     'Yes', 'reading array data'],
                    ['for...in', 'objects',         'keys',              'Yes', 'object properties'],
                    ['forEach',  'arrays',          'value only',        'No',  'simple array iteration'],
                  ].map(([type, works, ret, brk, use], i) => (
                    <tr key={type} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', fontFamily: 'monospace', fontWeight: 700, color: '#ca8a04' }}>{type}</td>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>{works}</td>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', color: '#1e40af', fontFamily: 'monospace' }}>{ret}</td>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: brk === 'Yes' ? '#10b981' : '#ef4444' }}>{brk}</td>
                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', color: '#475569' }}>{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day4', 'for_loops')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('while_loops')}>Next: while &amp; do-while Loops →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: WHILE LOOPS ───────────── */}
      {activeTab === 'while_loops' && (
        <Section key="while_loops" eyebrow="Day 4 • Loops" title="while &amp; do-while Loops">

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. The "while" Loop</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The `while` loop checks the condition BEFORE running the code block. If the condition starts off false, the code block never runs.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Syntax:
while (condition) {
  // code block
  // MUST increment/update variable to avoid infinite loop!
}`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. The "do-while" Loop</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The `do-while` loop is guaranteed to run **at least once** because it executes the code block BEFORE checking the condition.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Syntax:
do {
  // code block
} while (condition);`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day4', 'comparison_table')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('mini_project')}>Next: Loops Mini Project →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: MINI PROJECT ─────────────────────────── */}
      {activeTab === 'mini_project' && (
        <Section key="mini_project" eyebrow="Day 4 • Mini Project" title="Mini Project: Multiples Table Generator">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This interactive project utilizes a standard `for` loop to generate multiples of any selected number from 1 to 10.
            </p>

            <div style={{ maxWidth: '400px', margin: '0 auto', background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #ca8a04', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#ca8a04', marginBottom: '1rem', textAlign: 'center' }}>Multiples Calculator</h4>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>Select Base Number:</span>
                <select value={demoNum} onChange={e => setDemoNum(parseInt(e.target.value, 10))} style={{ padding: '0.4rem 0.8rem', border: '2px solid #ca8a04', borderRadius: '6px', fontWeight: 700, fontSize: '1rem', color: '#ca8a04' }}>
                  {[1,2,3,4,5,6,7,8,9,10,12,15].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* Outputs list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '240px', overflowY: 'auto' }}>
                {Array.from({ length: 10 }).map((_, idx) => {
                  const factor = idx + 1;
                  return (
                    <div key={factor} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                      <span>{demoNum} x {factor}</span>
                      <span style={{ fontWeight: 'bold', color: '#1e40af' }}>= {demoNum * factor}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: '2rem', background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Source Code for this Project:</h4>
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                <SyntaxHighlighter code={`// Multiples Table Generator
var num = ${demoNum};
for (var i = 1; i <= 10; i++) {
  var result = num * i;
  console.log(num + " x " + i + " = " + result);
}`} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day4', 'while_loops')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('foreach')}>Next: Array forEach →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5.5: FOREACH ───────────────── */}
      {activeTab === 'foreach' && (
        <Section key="foreach" eyebrow="Day 4 • Loops" title="Array forEach() Method">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The <code>forEach()</code> method is a built-in JavaScript <strong>Array method</strong> that executes a provided callback function once for every element in the array. It is a modern, clean, and highly readable way to iterate over arrays without manually managing loop counters or index variables.
            </p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0 1.5rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'monospace', color: '#713f12', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{`array.forEach(function(element, index, array) {
  // code to run for each element
});

// Shorthand with Arrow Function:
array.forEach((element, index) => {
  // code to run
});`}</pre>
            </div>

            <h3 style={{ marginBottom: '1.2rem', color: '#1e293b', fontWeight: 800, fontSize: '1.2rem' }}>Callback Parameters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
              {[
                { p: 'element', color: '#10b981', d: 'The current element value being processed in the array (required).' },
                { p: 'index', color: '#3b82f6', d: 'The index position of the current element (optional).' },
                { p: 'array', color: '#8b5cf6', d: 'The original array that forEach was called upon (optional).' },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.7rem 1rem', background: '#f8fafc', borderRadius: 9, border: '1px solid #e2e8f0' }}>
                  <code style={{ color: x.color, fontWeight: 700, minWidth: '90px', fontFamily: 'monospace' }}>{x.p}</code>
                  <span style={{ fontSize: '0.88rem', color: '#475569' }}>{x.d}</span>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: '1.2rem', color: '#1e293b', fontWeight: 800, fontSize: '1.2rem' }}>Example 1: Basic Array Iteration</h3>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var fruits = ["Apple", "Banana", "Cherry"];

fruits.forEach(function(fruit) {
  console.log("Fruit:", fruit);
});

// Output:
// Fruit: Apple
// Fruit: Banana
// Fruit: Cherry`} />
            </div>

            <h3 style={{ marginBottom: '1.2rem', color: '#1e293b', fontWeight: 800, fontSize: '1.2rem' }}>Example 2: Accessing Element Index</h3>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var students = ["Alice", "Bob", "Charlie"];

students.forEach(function(student, index) {
  console.log("Student #" + (index + 1) + ": " + student);
});

// Output:
// Student #1: Alice
// Student #2: Bob
// Student #3: Charlie`} />
            </div>

            <h3 style={{ marginBottom: '1.2rem', color: '#1e293b', fontWeight: 800, fontSize: '1.2rem' }}>Example 3: Summing Array Values</h3>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var scores = [10, 20, 30, 40];
var total = 0;

scores.forEach(function(score) {
  total += score;
});

console.log("Total Score:", total);
// Output: Total Score: 100`} />
            </div>

            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '1.2rem', borderRadius: 10, margin: '1.5rem 0' }}>
              <strong style={{ color: '#dc2626' }}>⚠️ Important Constraint:</strong>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', color: '#991b1b', lineHeight: 1.5 }}>
                Unlike regular <code>for</code> or <code>while</code> loops, you <strong>cannot</strong> use <code>break</code> or <code>continue</code> statements inside a <code>forEach()</code> loop. If you need to exit a loop early, you should use a standard <code>for</code> or <code>for...of</code> loop.
              </p>
            </div>

            {/* Interactive check */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1.2rem', marginTop: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e40af', fontWeight: 700 }}>⭐ Interactive Demo: forEach Live Filter</h4>
              <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '1rem' }}>
                Type in the search box to filter the list of technologies using `forEach()`.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>Search Technologies:</label>
                <input
                  type="text"
                  value={feFilter}
                  onChange={e => setFeFilter(e.target.value)}
                  placeholder="e.g. React, CSS..."
                  style={{ width: '100%', maxWidth: '300px', padding: '0.5rem', border: '1px solid #3b82f6', borderRadius: '6px' }}
                />
              </div>

              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <SyntaxHighlighter code={`var techStack = ${JSON.stringify(feArr)};
var filtered = [];

techStack.forEach(function(item) {
  if (item.toLowerCase().includes("${feFilter.toLowerCase()}")) {
    filtered.push(item);
  }
});
console.log(filtered);`} />
              </div>

              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '0.5rem' }}>// Console Output:</div>
                {feFiltered.length === 0 ? (
                  <div style={{ color: '#f87171', fontFamily: 'monospace', fontSize: '0.9rem' }}>[] (No matches)</div>
                ) : (
                  <div style={{ color: '#34d399', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {JSON.stringify(feFiltered)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day4', 'mini_project')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Write and execute loop blocks live in the editor sandbox:
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['forloop',    '➕ for loop'],
                ['forin',      '📝 for...in (object)'],
                ['forof',      '🔍 for...of (array)'],
                ['whileloop',  '🔗 while loop'],
                ['dowhile',    '🔁 do-while'],
                ['foreach',    '⚡ forEach method'],
                ['miniproject','🧮 Multiples Project'],
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
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day4', 'foreach')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 4 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 4 • Assessment" title="Day 4 Assessment — JavaScript Loops">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Mistakes with Loops
            </h3>
            {[
              { mistake: 'Infinite Loops (no update step)', code: `// Runs forever and crashes the browser!\nvar count = 1;\nwhile (count <= 5) {\n  console.log(count);\n  // ❌ Missing count++ increment step!\n}` },
              { mistake: 'Off-by-One iteration errors',   code: `// Loop runs 4 times instead of 5\nfor (var i = 1; i < 5; i++) { ... }\n// Loop runs 5 times\nfor (var i = 1; i <= 5; i++) { ... }` },
              { mistake: 'Incorrect semicolon position',    code: `// Semicolon placed immediately after loop parameters\nfor (var i = 0; i < 5; i++); { \n  console.log(i); // Runs only once!\n}` },
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
              <FileText size={20} /> Day 4 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Write a `for` loop that prints all **even numbers** from 1 to 20.</li>
              <li>Create a `while` loop that counts down from 10 to 1 and prints "Blast off! 🚀".</li>
              <li>Declare an object with 4 property pairs and use a `for...in` loop to display its properties in a list.</li>
              <li>Declare an array of 5 fruits and iterate over them using `for...of` and `forEach` loops.</li>
              <li>Write a program that uses nested loops to print a **right-angled star pattern** of size 6.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day4', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
