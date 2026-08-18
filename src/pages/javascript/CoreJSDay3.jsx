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
  { id: 'q1', q: 'Which statement executes a block of code if a condition is true?', options: ['switch', 'if', 'for', 'ternary'], ans: 1 },
  { id: 'q2', q: 'What is the purpose of the default case in a switch statement?', options: ['It is executed first', 'It is executed if no matching case is found', 'It is required to terminate the switch statement', 'It stops the script execution'], ans: 1 },
  { id: 'q3', q: 'What does parseInt("100") return?', options: ['"100" (string)', '100 (number)', 'NaN', '100.0 (float)'], ans: 1 },
  { id: 'q4', q: 'What happens if you omit the break keyword in a switch case?', options: ['The code throws an error', 'The code falls through to the next case', 'The switch statement terminates immediately', 'The default case is skipped'], ans: 1 },
  { id: 'q5', q: 'Which is a correct ternary statement?', options: ['var x = (y > 5) ? 10 : 20;', 'var x = y > 5 : 10 ? 20;', 'var x = ? (y > 5) 10 : 20;', 'var x = (y > 5) ? 10 : ? 20;'], ans: 0 },
];

export default function CoreJSDay3({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // ATM Simulator State
  const [atmBalance, setAtmBalance] = useState(1000);
  const atmPin = '1234';
  const [enteredPin, setEnteredPin] = useState('');
  const [atmAmount, setAtmAmount] = useState('');
  const [atmScreenMsg, setAtmScreenMsg] = useState('Welcome! Please enter your PIN to start.');
  const [pinVerified, setPinVerified] = useState(false);

  // Interactive Code Evaluator States
  const [evalAge, setEvalAge] = useState('18');
  const [evalResult, setEvalResult] = useState('');

  // Switch builder states
  const [switchDay, setSwitchDay] = useState('1');

  // Playground States
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
  <h2>Conditionals in Action</h2>
  <script>
    var score = 85;
    var grade;

    if (score >= 90) {
      grade = "A";
    } else if (score >= 80) {
      grade = "B";
    } else if (score >= 70) {
      grade = "C";
    } else {
      grade = "F";
    }

    document.write('<div class="box"><span class="label">Score:</span> <span class="value">' + score + '</span></div>');
    document.write('<div class="box"><span class="label">Grade:</span> <span class="value">' + grade + '</span></div>');

    console.log("Evaluation complete. Score was", score, "resulting in Grade", grade);
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
    onNavigate('core_js_day3', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Evaluate interactive if/else ladder
  const runInteractiveLadder = () => {
    const age = parseInt(evalAge, 10);
    if (isNaN(age)) {
      setEvalResult('Please enter a valid age number.');
      return;
    }
    if (age >= 18) {
      setEvalResult('Eligible to Vote! 🗳️');
    } else {
      setEvalResult('Not eligible to vote yet. ⏳');
    }
  };

  // Evaluate switch simulation
  const getSwitchResult = () => {
    switch (switchDay) {
      case '1': return 'Monday - Back to work! 💼';
      case '2': return 'Tuesday - Staying productive. 📈';
      case '3': return 'Wednesday - Midweek checkpoint. 🎯';
      case '4': return 'Thursday - Friday is near! 🚀';
      case '5': return 'Friday - Weekend vibes! 🎉';
      case '6': return 'Saturday - Time to relax. 🏖️';
      case '7': return 'Sunday - Recharge day. 🔋';
      default: return 'Invalid day selection!';
    }
  };

  // ATM simulation handlers
  const handleAtmPinSubmit = () => {
    if (enteredPin === atmPin) {
      setPinVerified(true);
      setAtmScreenMsg('PIN Verified! Current Balance: $' + atmBalance + '. Choose an option:');
    } else {
      setAtmScreenMsg('❌ Incorrect PIN. Please try again.');
      setEnteredPin('');
    }
  };

  const handleAtmWithdraw = () => {
    const amt = parseInt(atmAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      setAtmScreenMsg('❌ Invalid Amount. Please enter a valid number.');
      return;
    }
    if (amt > atmBalance) {
      setAtmScreenMsg('❌ Insufficient Balance. You only have $' + atmBalance);
    } else {
      const newBal = atmBalance - amt;
      setAtmBalance(newBal);
      setAtmScreenMsg('✅ Successfully withdrew $' + amt + '. New Balance: $' + newBal);
      setAtmAmount('');
    }
  };

  const handleAtmDeposit = () => {
    const amt = parseInt(atmAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      setAtmScreenMsg('❌ Invalid Amount. Please enter a valid number.');
      return;
    }
    const newBal = atmBalance + amt;
    setAtmBalance(newBal);
    setAtmScreenMsg('✅ Successfully deposited $' + amt + '. New Balance: $' + newBal);
    setAtmAmount('');
  };

  const handleAtmExit = () => {
    setPinVerified(false);
    setEnteredPin('');
    setAtmAmount('');
    setAtmScreenMsg('Welcome! Please enter your PIN to start.');
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
    if (name === 'ifelse') {
      setEditorCode(`// Simple if...else Statement
var age = 20;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}`);
    } else if (name === 'ladder') {
      setEditorCode(`// if...else if...else Ladder
var score = 78;
console.log("Checking score:", score);

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 60) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}`);
    } else if (name === 'switch') {
      setEditorCode(`// Switch Statement
var rollNo = 2;
console.log("Checking prize for Roll No:", rollNo);

switch(rollNo) {
  case 1:
    console.log("First Prize: Laptop 💻");
    break;
  case 2:
    console.log("Second Prize: Tablet 📱");
    break;
  case 3:
    console.log("Third Prize: Smartwatch ⌚");
    break;
  default:
    console.log("Participation Certificate 📄");
}`);
    } else if (name === 'ternary') {
      setEditorCode(`// Ternary Operator (?:)
var price = 120;
var status = (price > 100) ? "Expensive" : "Affordable";

console.log("Product is:", status);`);
    } else if (name === 'atm') {
      setEditorCode(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8fafc; }
    .box { background: white; border: 2px solid #ca8a04; border-radius: 8px; padding: 12px 18px; margin: 6px 0; }
  </style>
</head>
<body>
  <h2>ATM Machine Simulation Code</h2>
  <script>
    // Mock user input values
    var balance = 1000;
    var enterPin = 1234;
    var withdrawAmt = 300;

    document.write('<div class="box">Attempting withdrawal...</div>');

    if (enterPin === 1234) {
      if (withdrawAmt <= balance) {
        balance -= withdrawAmt;
        document.write('<div class="box">Withdrawal successful of $' + withdrawAmt + '</div>');
        document.write('<div class="box">Remaining Balance: $' + balance + '</div>');
      } else {
        document.write('<div class="box">Error: Insufficient balance.</div>');
      }
    } else {
      document.write('<div class="box">Error: Incorrect PIN.</div>');
    }

    console.log("ATM Run Complete. Balance:", balance);
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

  return (
    <AnimatePresence mode="wait">

      {/* ── TAB 1: INTRO ─────────────────── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 3 • JavaScript Conditionals" title="Conditional Statements">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              In JavaScript, <strong>conditional statements</strong> allow you to control the flow of execution. Instead of running all commands line by line, you can make decisions: execute specific blocks of code only if their matching condition is met.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Categories of Conditionals</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'if Statement', desc: 'Runs code ONLY if the condition is true.', example: 'if (age >= 18) { ... }', color: '#eff6ff' },
                { label: 'if...else', desc: 'Runs if block when true, else block when false.', example: 'if (x) { } else { }', color: '#f0fdf4' },
                { label: 'if...else if...else Ladder', desc: 'Checks multiple conditions sequentially.', example: 'if (a) { } else if (b) { }', color: '#fef9c3' },
                { label: 'switch Statement', desc: 'Compares a value against multiple match cases.', example: 'switch (day) { case 1: ... }', color: '#fdf4ff' },
                { label: 'Ternary Operator (?:)', desc: 'Inline ternary statement for simple true/false cases.', example: 'age >= 18 ? "vote" : "no"', color: '#fef2f2' },
              ].map(card => (
                <div key={card.label} style={{ background: card.color, border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{card.label}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.5rem' }}>{card.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>{card.example}</code>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>What makes up a condition?</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              A condition is any expression that evaluates to a <strong>Boolean value</strong> (`true` or `false`). These usually utilize comparison and logical operators we studied in Day 2.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`// This evaluates to true
var hasTicket = true;
var age = 21;

if (age >= 18 && hasTicket) {
  console.log("Enjoy the movie! 🎬");
}`} />
            </div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('if_statements')}>
              Next: if &amp; else Statements →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: IF STATEMENTS ──────────────── */}
      {activeTab === 'if_statements' && (
        <Section key="if_statements" eyebrow="Day 3 • Conditionals" title="if &amp; else Statements">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. The single "if" statement</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The basic `if` statement decides whether to execute a block of code based on a single condition.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Syntax:
if (condition) {
  // block of code to run if condition is true
}`} />
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. The "if...else" statement</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Add an `else` block to execute alternative code if the condition evaluates to `false`.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Syntax:
if (condition) {
  // code if true
} else {
  // code if false
}`} />
            </div>

            {/* Interactive check */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1.2rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e40af' }}>🗳️ Voting Eligibility Checker</h4>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: '#475569' }}>Enter Age:</label>
                <input type="number" value={evalAge} onChange={e => setEvalAge(e.target.value)} style={{ width: '80px', padding: '0.4rem', border: '1px solid #3b82f6', borderRadius: '6px', textAlign: 'center', fontWeight: 700 }} />
                <button onClick={runInteractiveLadder} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.45rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                  Check status
                </button>
              </div>
              {evalResult && (
                <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #bfdbfe', fontWeight: 700, color: '#1e40af' }}>
                  {evalResult}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day3', 'intro')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('ladder_switch')}>Next: Ladder &amp; Switch →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: LADDER & SWITCH ─────────────────── */}
      {activeTab === 'ladder_switch' && (
        <Section key="ladder_switch" eyebrow="Day 3 • Conditionals" title="Ladder &amp; Switch Statement">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. if...else if...else Ladder</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              When you have multiple choices or stages of evaluation, chain `else if` statements to create a ladder structure. Once a matches condition is found, its block runs, and the rest are ignored.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var score = 85;

if (score >= 90) {
  console.log("Excellent!");
} else if (score >= 80) {
  console.log("Good job!");
} else if (score >= 60) {
  console.log("Average.");
} else {
  console.log("Need improvement.");
}`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. switch Statement</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The `switch` statement selects one of many code blocks to be executed. It is highly optimized for comparing a single variable against discrete static matches.
            </p>
            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
              <strong>⚠️ Crucial:</strong> Remember the `break;` statement at the end of each case! If omitted, execution will "fall through" and execute subsequent cases regardless of whether they match.
            </div>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var option = 2;

switch(option) {
  case 1:
    console.log("You selected option 1");
    break;
  case 2:
    console.log("You selected option 2");
    break; // Stops switch execution here!
  default:
    console.log("No valid option chosen");
}`} />
            </div>

            {/* Interactive Switch Builder */}
            <div style={{ background: '#fdf4ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '1.2rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#7c3aed' }}>📅 Switch Weekday Evaluator</h4>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: '#475569' }}>Select Day Number:</label>
                <select value={switchDay} onChange={e => setSwitchDay(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #a855f7', borderRadius: '6px', fontWeight: 700, color: '#7c3aed' }}>
                  {['1','2','3','4','5','6','7'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e9d5ff', fontWeight: 700, color: '#7c3aed', marginBottom: '1rem' }}>
                {getSwitchResult()}
              </div>

              <h5 style={{ color: '#7c3aed', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Source Code for this Evaluator:</h5>
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                <SyntaxHighlighter code={`var day = ${switchDay};
switch (day) {
  case 1:
    console.log("Monday - Back to work! 💼");
    break;
  case 2:
    console.log("Tuesday - Staying productive. 📈");
    break;
  case 3:
    console.log("Wednesday - Midweek checkpoint. 🎯");
    break;
  case 4:
    console.log("Thursday - Friday is near! 🚀");
    break;
  case 5:
    console.log("Friday - Weekend vibes! 🎉");
    break;
  case 6:
    console.log("Saturday - Time to relax. 🏖️");
    break;
  case 7:
    console.log("Sunday - Recharge day. 🔋");
    break;
  default:
    console.log("Invalid day selection!");
}`} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day3', 'if_statements')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('ternary_operator')}>Next: Ternary &amp; parseInt →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: TERNARY & PARSEINT ───────────── */}
      {activeTab === 'ternary_operator' && (
        <Section key="ternary_operator" eyebrow="Day 3 • Conditionals" title="Ternary Operator &amp; parseInt">

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. The Ternary Operator (?:)</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              The conditional (ternary) operator evaluates a condition and resolves to one of two expressions. It serves as a concise inline alternative to simple `if...else` blocks.
            </p>
            <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', textAlign: 'center', fontSize: '1rem', fontFamily: 'monospace' }}>
              <span style={{ color: '#3b82f6' }}>condition</span>
              <span style={{ color: '#ca8a04', fontWeight: 700 }}> ? </span>
              <span style={{ color: '#10b981' }}>valueIfTrue</span>
              <span style={{ color: '#ca8a04', fontWeight: 700 }}> : </span>
              <span style={{ color: '#ef4444' }}>valueIfFalse</span>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Example:
var isMember = true;
var discount = isMember ? "$5.00" : "$0.00";
console.log(discount); // "$5.00"`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. The parseInt() Function</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              In JavaScript, values captured from inputs or text variables are often typed as strings. To perform numeric comparisons on them safely, use **`parseInt()`** to parse string digits into an actual integer number.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`// converts string digits to a number:
var textValue = "100";
var numberValue = parseInt(textValue);

console.log(numberValue === 100); // true`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day3', 'ladder_switch')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('atm_simulator')}>Next: ATM Simulation →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: ATM SIMULATION ─────────────────────────── */}
      {activeTab === 'atm_simulator' && (
        <Section key="atm_simulator" eyebrow="Day 3 • ATM Simulation" title="ATM Machine Simulator">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This interactive widget demonstrates nested conditionals and numeric type conversions in an ATM workflow.
            </p>

            <div style={{ maxWidth: '420px', margin: '0 auto', background: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '4px solid #475569', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}>
              {/* ATM Screen */}
              <div style={{ background: '#0f172a', color: '#10b981', padding: '1.5rem', fontFamily: 'monospace', minHeight: '110px', borderBottom: '4px solid #475569' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.4 }}>{atmScreenMsg}</p>
              </div>

              {/* ATM Inputs / Controls */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#334155' }}>
                {!pinVerified ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>Enter PIN (hint: 1234):</label>
                    <input type="password" value={enteredPin} onChange={e => setEnteredPin(e.target.value)} maxLength={4} placeholder="••••" style={{ padding: '0.5rem', borderRadius: '6px', border: 'none', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.4em', fontWeight: 700 }} />
                    <button onClick={handleAtmPinSubmit} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                      Verify PIN
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="number" placeholder="Enter Amount" value={atmAmount} onChange={e => setAtmAmount(e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: 'none', fontWeight: 700 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <button onClick={handleAtmWithdraw} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                        Withdraw
                      </button>
                      <button onClick={handleAtmDeposit} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                        Deposit
                      </button>
                    </div>
                    <button onClick={handleAtmExit} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}>
                      Logout / Exit
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '2rem', background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Source Code for ATM Simulator:</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                This is the complete JavaScript code running the simulation above:
              </p>
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                <SyntaxHighlighter code={`// ATM Machine Simulation Program
var balance = ${atmBalance};       // Current bank balance
var pin = "1234";          // Registered secret PIN
var enteredPin = "${enteredPin}"; // PIN entered by user

if (enteredPin === pin) {
  console.log("PIN Verified successfully!");
  
  // Option selected by student (Withdraw/Deposit)
  var amount = ${atmAmount || 0}; 
  var option = "withdraw"; // Or "deposit"
  
  if (option === "withdraw") {
    if (amount <= 0) {
      console.log("Error: Invalid transaction amount!");
    } else if (amount <= balance) {
      balance = balance - amount; // balance -= amount
      console.log("Withdrawal of $" + amount + " successful!");
      console.log("Remaining Balance: $" + balance);
    } else {
      console.log("Error: Insufficient funds!");
      console.log("Current Balance: $" + balance);
    }
  } else if (option === "deposit") {
    if (amount <= 0) {
      console.log("Error: Invalid transaction amount!");
    } else {
      balance = balance + amount; // balance += amount
      console.log("Successfully deposited $" + amount);
      console.log("New Balance: $" + balance);
    }
  }
} else {
  console.log("Error: Incorrect PIN. Access denied!");
}`} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day3', 'ternary_operator')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Write and test JavaScript conditional blocks live. Use presets to inspect ladders, switch flows, or test full calculator logic.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['ifelse',    '➕ if...else'],
                ['ladder',    '🪜 Ladder'],
                ['switch',    '🔌 Switch Case'],
                ['ternary',   '⚖️ Ternary'],
                ['atm',       '🧮 ATM Simulation'],
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
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day3', 'atm_simulator')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 3 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 3 • Assessment" title="Day 3 Assessment — JavaScript Conditionals">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Mistakes with Conditionals
            </h3>
            {[
              { mistake: 'Forgetting break; in switch', code: `// Result: Fall-through executing next match code block\nswitch(day) {\n  case 1:\n    console.log("Monday"); // ❌ Missing break! Runs Tuesday block too\n  case 2:\n    console.log("Tuesday");\n}` },
              { mistake: 'Incorrect syntax in else if',   code: `// else syntax error\nif (x > 5) { ... }\nelse (x > 3) { ... }  // ❌ SyntaxError: should be else if` },
              { mistake: 'Comparing inputs directly without parseInt', code: `var val = "50";\nif (val === 50) { ... } // ❌ false: String vs Number\nif (parseInt(val) === 50) { ... } // ✅ true: values match` },
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
              <FileText size={20} /> Day 3 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Write a program that takes a variable `temperature` and outputs: "Hot" if &gt; 35, "Warm" if &gt; 20, else "Cold".</li>
              <li>Simulate a simple grade calculator using a `switch` statement for values A, B, C, D, F.</li>
              <li>Create a simple login form validation simulation using nested `if` statements.</li>
              <li>Use the **ternary operator** to print whether a student is "Eligible" or "Ineligible" for a discount based on a membership status boolean.</li>
              <li>Write a currency converter script that converts a string value to a number using `parseInt` before carrying out a math conversion.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day3', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
