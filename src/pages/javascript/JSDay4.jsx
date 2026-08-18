import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, PenTool, RefreshCw, Repeat, SkipForward } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter
// ─────────────────────────────────────────────────────────────────────────────
const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: '"Fira Code", "Consolas", monospace', lineHeight: '1.65', fontSize: '0.85rem' }}>
      {lines.map((line, li) => {
        if (line === '') return <div key={li} style={{ height: '0.8em' }} />;
        // Groups: 1=comment 2=string 3=htmlTag 4=keyword 5=literal 6=builtin 7=number 8=identifier 9=symbol
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const toks = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fw = 'normal';
          if (comment)       color = '#8b949e';
          else if (str)      color = '#a5d6ff';
          else if (htmlTag)  color = '#7ee787';
          else if (kw)     { color = '#ff7b72'; fw = 'bold'; }
          else if (literal)  color = '#d2a8ff';
          else if (builtin)  color = '#ffb454';
          else if (num)      color = '#79c0ff';
          else if (ident)    color = '#e1e4e8';
          else if (sym)      color = '#ff7b72';
          toks.push(<span key={k++} style={{ color, fontWeight: fw }}>{tok}</span>);
        }
        return <div key={li} style={{ whiteSpace: 'pre' }}>{toks.length > 0 ? toks : line}</div>;
      })}
    </div>
  );
};

const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CB = ({ code }) => (
  <div style={{ background: '#0f172a', padding: '1.2rem 1.5rem', borderRadius: 12, overflowX: 'auto', margin: '0.8rem 0', border: '1px solid #1e293b' }}>
    <SyntaxHighlighter code={code} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function JSDay4({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_module4', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // for loop demo
  const [forStart, setForStart] = useState(1);
  const [forEnd, setForEnd] = useState(5);
  const [forStep, setForStep] = useState(1);
  const forOutput = (() => {
    const out = [];
    for (let i = Number(forStart); i <= Number(forEnd); i += Number(forStep)) out.push(i);
    return out;
  })();

  // while demo
  const [whileTarget, setWhileTarget] = useState(5);
  const whileOutput = (() => {
    const out = []; let i = 1;
    while (i <= Number(whileTarget)) { out.push(i); i++; }
    return out;
  })();

  // do-while demo
  const [dwTarget, setDwTarget] = useState(3);
  const dwOutput = (() => {
    const out = []; let i = 1;
    do { out.push(i); i++; } while (i <= Number(dwTarget));
    return out;
  })();

  // for..in demo
  const [forinObj] = useState({ name: 'Alice', age: 25, role: 'Developer' });

  // for..of demo
  const [forofArr] = useState(['React', 'Node.js', 'MongoDB', 'Express']);

  // break/continue demo
  const [bcTarget, setBcTarget] = useState(7);
  const [bcMode, setBcMode] = useState('break');
  const bcOutput = (() => {
    const out = [];
    for (let i = 1; i <= 10; i++) {
      if (i === Number(bcTarget)) {
        if (bcMode === 'break') { out.push(`→ break at i=${i} — loop STOPS`); break; }
        else { out.push(`→ continue at i=${i} — SKIPPED`); continue; }
      }
      out.push(`i = ${i}`);
    }
    return out;
  })();

  // live multiplication table
  const [tableNum, setTableNum] = useState(5);
  const tableOutput = [];
  for (let i = 1; i <= 10; i++) tableOutput.push(`${tableNum} × ${i} = ${tableNum * i}`);

  // forEach demo
  const [feArr] = useState(['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']);
  const [feFilter, setFeFilter] = useState('');
  const feFiltered = feArr.filter(item => item.toLowerCase().includes(feFilter.toLowerCase()));

  // nested loop demo
  const [nestedRows, setNestedRows] = useState(3);
  const [nestedCols, setNestedCols] = useState(3);
  const nestedOutput = [];
  for (let r = 1; r <= nestedRows; r++) {
    const row = [];
    for (let c = 1; c <= nestedCols; c++) row.push(r * c);
    nestedOutput.push(row);
  }

  // assignment
  const [assignVal, setAssignVal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence mode="wait">

      {/* ══════ TAB 1: for loop ══════ */}
      {activeTab === 'js_for_loop' && (
        <Section eyebrow="Syllabus 01" title="The for Loop">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>A <strong>loop</strong> repeats a block of code multiple times, avoiding repetitive manual statements. The <code>for</code> loop is the most commonly used loop in JavaScript. It is best when you know <strong>exactly how many times</strong> you want to repeat something.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'monospace', color: '#713f12', fontSize: '0.9rem' }}>{`for (initialization; condition; update) {\n  // code to execute\n}`}</pre>
            </div>

            {/* Three parts */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.8rem' }}>🔑 Three Parts of the for Loop</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', margin: '0.5rem 0 1.5rem 0' }}>
              {[
                { part: 'Initialization', ex: 'let i = 0', color: '#7ee787', desc: 'Runs ONCE before the loop starts. Sets up the counter variable.' },
                { part: 'Condition', ex: 'i < 5', color: '#a5d6ff', desc: 'Checked BEFORE every iteration. Loop runs while this is true. When false, the loop exits.' },
                { part: 'Update (Increment/Decrement)', ex: 'i++', color: '#ffb454', desc: 'Runs AFTER every iteration. Typically increments or decrements the counter.' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.8rem 1rem', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <code style={{ color: p.color, fontWeight: 700, minWidth: '220px', fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.part}: <span style={{ color: '#d2a8ff' }}>{p.ex}</span></code>
                  <span style={{ fontSize: '0.88rem', color: '#475569' }}>{p.desc}</span>
                </div>
              ))}
            </div>

            {/* Examples */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '0.5rem' }}>Example 1: Count 1 to 5</h3>
            <CB code={`for (let i = 1; i <= 5; i++) {
  console.log("Count: " + i);
}
// Output:
// Count: 1
// Count: 2
// Count: 3
// Count: 4
// Count: 5`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 2: Count Down (Decrement)</h3>
            <CB code={`for (let i = 5; i >= 1; i--) {
  console.log("Countdown: " + i);
}
// Output: 5, 4, 3, 2, 1`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 3: Loop Through an Array</h3>
            <CB code={`let fruits = ["Apple", "Banana", "Cherry", "Mango"];

for (let i = 0; i < fruits.length; i++) {
  console.log(i + ": " + fruits[i]);
}
// Output:
// 0: Apple
// 1: Banana
// 2: Cherry
// 3: Mango`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 4: Sum of Numbers</h3>
            <CB code={`let sum = 0;

for (let i = 1; i <= 10; i++) {
  sum = sum + i; // Add each number to sum
}
console.log("Sum of 1 to 10 = " + sum);
// Output: Sum of 1 to 10 = 55`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 5: Print Even Numbers</h3>
            <CB code={`for (let i = 2; i <= 20; i += 2) {
  console.log("Even: " + i);
}
// Output: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20`} />

            {/* INTERACTIVE */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>🎮 Live Demo: Customize Your for Loop</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Start (i = )</label>
                  <input type="number" value={forStart} onChange={e => setForStart(e.target.value)} min="1" max="20"
                    style={{ display: 'block', marginTop: '0.3rem', padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, width: '80px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>End (i &lt;= )</label>
                  <input type="number" value={forEnd} onChange={e => setForEnd(e.target.value)} min="1" max="50"
                    style={{ display: 'block', marginTop: '0.3rem', padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, width: '80px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Step (i += )</label>
                  <input type="number" value={forStep} onChange={e => setForStep(e.target.value)} min="1" max="10"
                    style={{ display: 'block', marginTop: '0.3rem', padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, width: '80px' }} />
                </div>
              </div>

              <CB code={`for (let i = ${forStart}; i <= ${forEnd}; i += ${forStep}) {\n  console.log(i);\n}`} />

              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginTop: '0.5rem' }}>
                <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>// Console Output:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {forOutput.length === 0
                    ? <span style={{ color: '#f87171', fontFamily: 'monospace', fontSize: '0.85rem' }}>// No output (check your values)</span>
                    : forOutput.map((v, i) => (
                      <span key={i} style={{ background: '#1e293b', color: '#79c0ff', padding: '0.2rem 0.6rem', borderRadius: 6, fontFamily: 'monospace', fontSize: '0.85rem' }}>{v}</span>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_while_loop')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 2: while loop ══════ */}
      {activeTab === 'js_while_loop' && (
        <Section eyebrow="Syllabus 02" title="The while Loop">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>The <code>while</code> loop repeats a block of code <strong>as long as a condition is true</strong>. Use it when you don't know in advance exactly how many iterations you need — the loop keeps going until the condition becomes false.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'monospace', color: '#713f12', fontSize: '0.9rem' }}>{`while (condition) {\n  // code runs while condition is true\n  // must update the condition inside!\n}`}</pre>
            </div>

            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '1rem 1.5rem', borderRadius: 10, margin: '1rem 0' }}>
              <strong style={{ color: '#dc2626' }}>⚠️ Infinite Loop Warning:</strong>
              <p style={{ margin: '0.3rem 0 0 0', color: '#991b1b', fontSize: '0.9rem' }}>
                Always update the counter variable inside the while loop body! If the condition never becomes false, the browser will hang in an infinite loop.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Example 1: Basic while Loop</h3>
            <CB code={`let i = 1;

while (i <= 5) {
  console.log("Number: " + i);
  i++; // IMPORTANT: update counter to avoid infinite loop
}
// Output: 1, 2, 3, 4, 5`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 2: Sum Until a Target</h3>
            <CB code={`let sum = 0;
let num = 1;

while (sum < 100) {
  sum += num;
  num++;
}
console.log("Sum reached:", sum);
console.log("Last number added:", num - 1);
// Output: Sum reached: 105, Last number added: 14`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 3: Password Retry Simulator</h3>
            <CB code={`let attempts = 0;
let maxAttempts = 3;
let correctPassword = "admin123";
let enteredPassword = "wrong"; // simulated user input

while (attempts < maxAttempts && enteredPassword !== correctPassword) {
  attempts++;
  console.log("Attempt " + attempts + ": Incorrect password!");
  // In real app: enteredPassword = prompt("Enter password:");
}

if (enteredPassword === correctPassword) {
  console.log("Access Granted ✅");
} else {
  console.log("Account locked after " + maxAttempts + " attempts ❌");
}
// Output: Attempt 1,2,3 → Account locked`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 4: Reverse a Number</h3>
            <CB code={`let num = 12345;
let reversed = 0;

while (num > 0) {
  let lastDigit = num % 10;    // Extract last digit
  reversed = reversed * 10 + lastDigit;
  num = Math.floor(num / 10);  // Remove last digit
}
console.log("Reversed: " + reversed);
// Output: Reversed: 54321`} />

            {/* INTERACTIVE */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>🎮 Live Demo: while Loop Counter</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Count up to: <strong style={{ color: '#ca8a04' }}>{whileTarget}</strong></label>
              <input type="range" min="1" max="20" value={whileTarget} onChange={e => setWhileTarget(e.target.value)}
                style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', accentColor: '#ca8a04' }} />
              <CB code={`let i = 1;\nwhile (i <= ${whileTarget}) {\n  console.log(i);\n  i++;\n}`} />
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginTop: '0.5rem' }}>
                <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>// Console Output:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {whileOutput.map((v, i) => (
                    <span key={i} style={{ background: '#1e293b', color: '#79c0ff', padding: '0.2rem 0.6rem', borderRadius: 6, fontFamily: 'monospace', fontSize: '0.85rem' }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_do_while')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 3: do-while ══════ */}
      {activeTab === 'js_do_while' && (
        <Section eyebrow="Syllabus 03" title="The do...while Loop">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>The <code>do...while</code> loop is similar to the <code>while</code> loop, but with one key difference: the code block <strong>always executes at least once</strong> before the condition is checked. This makes it useful when you need to run code first, then verify.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'monospace', color: '#713f12', fontSize: '0.9rem' }}>{`do {\n  // code runs AT LEAST ONCE\n} while (condition);`}</pre>
            </div>

            {/* while vs do-while comparison */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.8rem' }}>⚖️ while vs do...while — Key Difference</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>while (condition checked FIRST)</h4>
                <CB code={`let i = 10;

while (i < 5) {
  console.log(i);
  i++;
}
// Output: Nothing!
// (condition is false from the start)`} />
              </div>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>do...while (code runs FIRST)</h4>
                <CB code={`let i = 10;

do {
  console.log(i);
  i++;
} while (i < 5);

// Output: 10
// (runs once even though condition is false!)`} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Example 2: Menu-Driven Program</h3>
            <CB code={`let choice;

do {
  // In real app: choice = prompt("Choose: 1=New, 2=Open, 3=Exit");
  choice = "3"; // simulated selection
  console.log("Menu loaded. User chose: " + choice);
} while (choice !== "3");

console.log("Exiting application...");
// Output: Menu loaded. User chose: 3 → Exiting`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 3: Dice Roll Game</h3>
            <CB code={`let diceRoll;

do {
  diceRoll = Math.floor(Math.random() * 6) + 1; // 1 to 6
  console.log("Rolled: " + diceRoll);
} while (diceRoll !== 6); // Keep rolling until we get 6

console.log("Got a 6! Game over.");`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 4: Input Validation Pattern</h3>
            <CB code={`let userAge;

do {
  userAge = Number(prompt("Enter your age (must be > 0):"));
  // Keep asking until valid input
} while (userAge <= 0 || isNaN(userAge));

console.log("Valid age entered: " + userAge);`} />

            {/* INTERACTIVE */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>🎮 Live Demo: do...while Counter</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Run until i exceeds: <strong style={{ color: '#ca8a04' }}>{dwTarget}</strong></label>
              <input type="range" min="0" max="15" value={dwTarget} onChange={e => setDwTarget(e.target.value)}
                style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', accentColor: '#ca8a04' }} />
              <CB code={`let i = 1;\ndo {\n  console.log(i);\n  i++;\n} while (i <= ${dwTarget});\n// Note: Always runs at least once (even if target = 0)`} />
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginTop: '0.5rem' }}>
                <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>// Console Output:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {dwOutput.map((v, i) => (
                    <span key={i} style={{ background: '#1e293b', color: '#79c0ff', padding: '0.2rem 0.6rem', borderRadius: 6, fontFamily: 'monospace', fontSize: '0.85rem' }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* When to use each */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>📋 When to Use Which Loop?</h3>
            <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#ca8a04', color: 'white' }}>
                    {['Loop', 'Use When', 'Runs at least once?', 'Counter needed?'].map(h => (
                      <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['for', 'You know the number of iterations', 'No', 'Yes (built-in)'],
                    ['while', 'Iteration count is unknown; condition-based', 'No', 'Must manage manually'],
                    ['do...while', 'Must run body at least once before checking', 'Yes ✅', 'Must manage manually'],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #e2e8f0', color: j === 0 ? '#ca8a04' : '#334155', fontWeight: j === 0 ? 700 : 400, fontFamily: j === 0 ? 'monospace' : 'inherit' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_for_in_of')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 4: for..in / for..of ══════ */}
      {activeTab === 'js_for_in_of' && (
        <Section eyebrow="Syllabus 04" title="for...in and for...of Loops">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>JavaScript provides two modern loop types introduced in ES6 for cleaner iteration over <strong>objects</strong> and <strong>arrays/iterables</strong> without manually managing index counters.</p>

            {/* for..in */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>1. for...in — Iterate Over Object Keys</h3>
            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.4rem 0 0 0', fontFamily: 'monospace', color: '#713f12', fontSize: '0.88rem' }}>{`for (let key in object) {\n  // key = property name (string)\n  // object[key] = property value\n}`}</pre>
            </div>
            <p><code>for...in</code> loops through every <strong>key (property name)</strong> in an object. On each iteration, the variable holds the key as a string.</p>

            <CB code={`let student = {
  name: "Alice",
  age: 22,
  grade: "A+",
  course: "JavaScript"
};

for (let key in student) {
  console.log(key + ": " + student[key]);
}
// Output:
// name: Alice
// age: 22
// grade: A+
// course: JavaScript`} />

            <h4 style={{ margin: '1.2rem 0 0.5rem 0', color: '#0f172a' }}>Use with Arrays (with caution)</h4>
            <CB code={`let scores = [85, 92, 78, 95];

for (let index in scores) {
  console.log("Index " + index + " → Score: " + scores[index]);
}
// Output:
// Index 0 → Score: 85
// Index 1 → Score: 92
// Index 2 → Score: 78
// Index 3 → Score: 95

// ⚠️ for...in gives string indices, not numbers.
// For arrays, prefer for...of instead.`} />

            {/* for..of */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>2. for...of — Iterate Over Array Values</h3>
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '1rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#166534' }}>Syntax:</strong>
              <pre style={{ margin: '0.4rem 0 0 0', fontFamily: 'monospace', color: '#14532d', fontSize: '0.88rem' }}>{`for (let value of iterable) {\n  // value = each element directly\n}`}</pre>
            </div>
            <p><code>for...of</code> loops through every <strong>value</strong> in an iterable (Array, String, Set, Map). You get the actual value, not the index.</p>

            <CB code={`let courses = ["HTML", "CSS", "JavaScript", "React"];

for (let course of courses) {
  console.log("Learning: " + course);
}
// Output:
// Learning: HTML
// Learning: CSS
// Learning: JavaScript
// Learning: React`} />

            <h4 style={{ margin: '1.2rem 0 0.5rem 0', color: '#0f172a' }}>Loop Through a String</h4>
            <CB code={`let word = "Hello";

for (let char of word) {
  console.log(char);
}
// Output: H, e, l, l, o`} />

            {/* Side by side comparison */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>⚖️ for...in vs for...of</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1rem 0' }}>
              <div style={{ background: '#fefcbf', padding: '1.2rem', borderRadius: 12, border: '1px solid #fef08a' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#854d0e' }}>for...in</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#713f12', lineHeight: 1.6 }}>
                  <li>Works best with <strong>Objects</strong></li>
                  <li>Gives you the <strong>key/index</strong></li>
                  <li>Returns indices as strings for arrays</li>
                  <li>Iterates all enumerable properties</li>
                </ul>
              </div>
              <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: 12, border: '1px solid #86efac' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>for...of</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#14532d', lineHeight: 1.6 }}>
                  <li>Works best with <strong>Arrays, Strings, Sets</strong></li>
                  <li>Gives you the <strong>value</strong> directly</li>
                  <li>Cannot iterate plain objects (not iterable)</li>
                  <li>Clean and modern (ES6+)</li>
                </ul>
              </div>
            </div>

            {/* Interactive */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '0.5rem' }}>🎮 Live Demo: for...in on an Object</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
              <CB code={`let student = {\n  name: "${forinObj.name}",\n  age: ${forinObj.age},\n  role: "${forinObj.role}"\n};\n\nfor (let key in student) {\n  console.log(key + ": " + student[key]);\n}`} />
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginTop: '0.5rem' }}>
                <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>// Console Output:</p>
                {Object.entries(forinObj).map(([k, v], i) => (
                  <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#22c55e' }}>{k}: {v}</div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>🎮 Live Demo: for...of on an Array</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <CB code={`let stack = ${JSON.stringify(forofArr)};\n\nfor (let item of stack) {\n  console.log("Technology: " + item);\n}`} />
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginTop: '0.5rem' }}>
                <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>// Console Output:</p>
                {forofArr.map((v, i) => (
                  <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#22c55e' }}>Technology: {v}</div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_break_continue')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 5: break & continue ══════ */}
      {activeTab === 'js_break_continue' && (
        <Section eyebrow="Syllabus 05" title="break and continue Statements">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>Inside loops, JavaScript provides two special control statements: <code>break</code> and <code>continue</code>. They let you alter the default execution flow of the loop on specific conditions.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '1.2rem', borderRadius: 12 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc2626' }}>🛑 break</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#991b1b' }}>
                  Immediately <strong>exits the entire loop</strong>. No more iterations happen after break executes. The program continues from the first line after the loop block.
                </p>
              </div>
              <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem', borderRadius: 12 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>⏭️ continue</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#713f12' }}>
                  <strong>Skips the current iteration</strong> only. The loop does not stop — it jumps to the update expression and checks the condition for the next iteration.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Example 1: break — Stop at a Value</h3>
            <CB code={`for (let i = 1; i <= 10; i++) {
  if (i === 6) {
    console.log("Found 6! Stopping loop.");
    break; // exits loop immediately
  }
  console.log("i = " + i);
}
// Output: 1, 2, 3, 4, 5, Found 6! Stopping loop.
// (6 through 10 are never printed)`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 2: continue — Skip a Value</h3>
            <CB code={`for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue; // skip 5, go to next iteration
  }
  console.log("i = " + i);
}
// Output: 1, 2, 3, 4, 6, 7, 8, 9, 10
// (5 is skipped but loop continues)`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 3: Skip Even Numbers (Print Odd Only)</h3>
            <CB code={`for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // skip all even numbers
  }
  console.log("Odd: " + i);
}
// Output: 1, 3, 5, 7, 9`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 4: Search with break</h3>
            <CB code={`let products = ["Laptop", "Phone", "Tablet", "Watch", "Keyboard"];
let searchTarget = "Tablet";
let found = false;

for (let i = 0; i < products.length; i++) {
  if (products[i] === searchTarget) {
    console.log("Found: " + searchTarget + " at index " + i);
    found = true;
    break; // no need to search further
  }
}

if (!found) {
  console.log(searchTarget + " not found.");
}
// Output: Found: Tablet at index 2`} />

            {/* INTERACTIVE */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>🎮 Live Demo: break vs continue</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Trigger at i = <strong style={{ color: '#ca8a04' }}>{bcTarget}</strong></label>
                  <input type="range" min="1" max="10" value={bcTarget} onChange={e => setBcTarget(e.target.value)}
                    style={{ display: 'block', marginTop: '0.3rem', accentColor: '#ca8a04', width: '160px' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setBcMode('break')} style={{ padding: '0.5rem 1.2rem', borderRadius: 8, border: 'none', cursor: 'pointer', background: bcMode === 'break' ? '#dc2626' : '#e2e8f0', color: bcMode === 'break' ? 'white' : '#1e293b', fontWeight: 700 }}>break</button>
                  <button onClick={() => setBcMode('continue')} style={{ padding: '0.5rem 1.2rem', borderRadius: 8, border: 'none', cursor: 'pointer', background: bcMode === 'continue' ? '#ca8a04' : '#e2e8f0', color: bcMode === 'continue' ? 'white' : '#1e293b', fontWeight: 700 }}>continue</button>
                </div>
              </div>
              <CB code={`for (let i = 1; i <= 10; i++) {\n  if (i === ${bcTarget}) {\n    ${bcMode};\n  }\n  console.log("i = " + i);\n}`} />
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.4rem 0', fontSize: '0.8rem' }}>// Console Output:</p>
                {bcOutput.map((line, i) => (
                  <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.83rem', color: line.startsWith('→') ? '#fbbf24' : '#22c55e' }}>{line}</div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_codedemo4')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 6: CODE DEMO / MINI PROJECT ══════ */}
      {activeTab === 'js_codedemo4' && (
        <Section eyebrow="Syllabus 06" title="Live Coding: Multiplication Table Generator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>A real-world demonstration of <code>for</code> loops generating a <strong>multiplication table</strong> dynamically. Change the number and watch both the output and the source code update live.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#ca8a04' }}>Configuration</h4>
                  <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Table of: <strong style={{ color: '#ca8a04' }}>{tableNum}</strong></label>
                  <input type="range" min="1" max="20" value={tableNum} onChange={e => setTableNum(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', accentColor: '#ca8a04' }} />
                  <input type="number" min="1" max="20" value={tableNum} onChange={e => setTableNum(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 8, fontFamily: 'monospace', boxSizing: 'border-box' }} />
                </div>

                <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, flex: 1 }}>
                  <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.8rem 0', fontSize: '0.8rem', fontWeight: 700 }}>
                    📊 Multiplication Table of {tableNum}:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {tableOutput.map((row, i) => (
                      <div key={i} style={{
                        fontFamily: 'monospace', fontSize: '0.88rem',
                        color: (i + 1) % 2 === 0 ? '#a5d6ff' : '#22c55e',
                        padding: '1px 0'
                      }}>{row}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a' }}>📋 Live Source Code</h4>
                <CB code={`// Multiplication Table using for loop
let tableNumber = ${tableNum};

for (let i = 1; i <= 10; i++) {
  let result = tableNumber * i;
  console.log(tableNumber + " × " + i + " = " + result);
}

// Writing to browser page:
document.write("<h2>Table of ${tableNum}</h2>");
for (let i = 1; i <= 10; i++) {
  document.write(
    "<p>${tableNum} × " + i + " = " + (${tableNum} * i) + "</p>"
  );
}`} />
              </div>
            </div>

            {/* Mini Project */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem' }}>📦 Complete HTML Mini Project – Loop Showcase</h3>
            <p>Copy and save as <code>loops_project.html</code> and open in your browser:</p>
            <CB code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Loops Mini Project</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #e1e4e8; padding: 2rem; margin: 0; }
    h1 { color: #ca8a04; }
    h2 { color: #38bdf8; border-bottom: 1px solid #1e293b; padding-bottom: 0.5rem; }
    .box { background: #1e293b; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
    input, button { padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: white; font-size: 1rem; }
    button { background: #ca8a04; border: none; cursor: pointer; font-weight: bold; margin-left: 0.5rem; }
    #output { background: #0f172a; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-family: monospace; white-space: pre; color: #22c55e; }
    table { border-collapse: collapse; width: 100%; }
    td { padding: 0.4rem 1rem; border: 1px solid #334155; }
    td:first-child { color: #ca8a04; font-weight: bold; }
  </style>
</head>
<body>
  <h1>🔄 JavaScript Loops Project</h1>

  <div class="box">
    <h2>1. Multiplication Table (for loop)</h2>
    <input type="number" id="tableNum" value="5" min="1" max="20" />
    <button onclick="generateTable()">Generate</button>
    <div id="tableOutput"></div>
  </div>

  <div class="box">
    <h2>2. Sum Calculator (while loop)</h2>
    <input type="number" id="sumLimit" value="10" min="1" />
    <button onclick="calcSum()">Calculate Sum</button>
    <div id="sumOutput"></div>
  </div>

  <div class="box">
    <h2>3. Even/Odd Filter (for + continue)</h2>
    <input type="number" id="filterLimit" value="20" min="1" />
    <button onclick="filterEvenOdd()">Show Odd Numbers</button>
    <div id="filterOutput"></div>
  </div>

  <script>
    function generateTable() {
      let n = Number(document.getElementById("tableNum").value);
      let html = "<table>";
      for (let i = 1; i <= 10; i++) {
        html += "<tr><td>" + n + " × " + i + "</td><td>= " + (n * i) + "</td></tr>";
      }
      html += "</table>";
      document.getElementById("tableOutput").innerHTML = html;
    }

    function calcSum() {
      let limit = Number(document.getElementById("sumLimit").value);
      let sum = 0; let i = 1;
      while (i <= limit) { sum += i; i++; }
      document.getElementById("sumOutput").innerHTML =
        "<p style='color:#22c55e'>Sum of 1 to " + limit + " = <strong>" + sum + "</strong></p>";
    }

    function filterEvenOdd() {
      let limit = Number(document.getElementById("filterLimit").value);
      let result = "Odd numbers from 1 to " + limit + ":\\n";
      for (let i = 1; i <= limit; i++) {
        if (i % 2 === 0) continue;
        result += i + " ";
      }
      document.getElementById("filterOutput").innerHTML =
        "<div id='output'>" + result + "</div>";
    }
  </script>
</body>
</html>`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_foreach')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 7: forEach ══════ */}
      {activeTab === 'js_foreach' && (
        <Section eyebrow="Syllabus 07" title="Array forEach() Method">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>The <code>forEach()</code> method is a built-in <strong>Array method</strong> that executes a provided callback function once for every element in the array. It is the most readable and modern way to loop through arrays — no index counter needed.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'monospace', color: '#713f12', fontSize: '0.9rem' }}>{`array.forEach(function(element, index, array) {\n  // code runs for each element\n});\n\n// Arrow function shorthand:\narray.forEach((element, index) => {\n  // cleaner version\n});`}</pre>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>🔑 Callback Parameters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', margin: '0.5rem 0 1.5rem 0' }}>
              {[
                { p: 'element', color: '#7ee787', d: 'The current element value being processed (required)' },
                { p: 'index', color: '#a5d6ff', d: 'The index position of the current element (optional)' },
                { p: 'array', color: '#d2a8ff', d: 'The original array itself (optional, rarely used)' },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.7rem 1rem', background: '#f8fafc', borderRadius: 9, border: '1px solid #e2e8f0' }}>
                  <code style={{ color: x.color, fontWeight: 700, minWidth: '90px', fontFamily: 'monospace' }}>{x.p}</code>
                  <span style={{ fontSize: '0.88rem', color: '#475569' }}>{x.d}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Example 1: Basic forEach</h3>
            <CB code={`let fruits = ["Apple", "Banana", "Cherry", "Mango"];

fruits.forEach(function(fruit) {
  console.log("Fruit: " + fruit);
});
// Output:
// Fruit: Apple
// Fruit: Banana
// Fruit: Cherry
// Fruit: Mango`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 2: forEach with Index</h3>
            <CB code={`let students = ["Alice", "Bob", "Charlie", "Diana"];

students.forEach((student, index) => {
  console.log((index + 1) + ". " + student);
});
// Output:
// 1. Alice
// 2. Bob
// 3. Charlie
// 4. Diana`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 3: Sum of Scores Using forEach</h3>
            <CB code={`let scores = [85, 92, 78, 95, 88];
let total = 0;

scores.forEach((score) => {
  total += score;
});

let average = total / scores.length;
console.log("Total: " + total);
console.log("Average: " + average.toFixed(2));
// Output: Total: 438 | Average: 87.60`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 4: forEach with Objects Array</h3>
            <CB code={`let products = [
  { name: "Laptop", price: 50000 },
  { name: "Phone",  price: 20000 },
  { name: "Watch",  price: 8000  }
];

products.forEach((product, i) => {
  console.log((i + 1) + ". " + product.name + " — ₹" + product.price);
});
// Output:
// 1. Laptop — ₹50000
// 2. Phone — ₹20000
// 3. Watch — ₹8000`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 5: Generate HTML with forEach</h3>
            <CB code={`let skills = ["HTML", "CSS", "JavaScript", "React"];
let html = "<ul>";

skills.forEach((skill) => {
  html += "<li>" + skill + "</li>";
});
html += "</ul>";

document.write(html);
// Renders a bullet list on the browser page`} />

            {/* for loop vs forEach comparison */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>⚖️ for Loop vs forEach</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1rem 0' }}>
              <div>
                <h4 style={{ color: '#475569', fontWeight: 700, marginBottom: '0.5rem' }}>Using for loop</h4>
                <CB code={`let arr = [10, 20, 30];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// Works but verbose — needs index management`} />
              </div>
              <div>
                <h4 style={{ color: '#475569', fontWeight: 700, marginBottom: '0.5rem' }}>Using forEach</h4>
                <CB code={`let arr = [10, 20, 30];
arr.forEach(item => {
  console.log(item);
});
// Cleaner — no index, no condition, no update`} />
              </div>
            </div>

            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '1rem 1.5rem', borderRadius: 10, margin: '1rem 0' }}>
              <strong style={{ color: '#dc2626' }}>⚠️ Important:</strong>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', color: '#991b1b' }}>
                <code>forEach()</code> does NOT support <code>break</code> or <code>continue</code>. If you need to stop early or skip elements, use a regular <code>for</code> loop or <code>for...of</code>.
              </p>
            </div>

            {/* INTERACTIVE */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '0.5rem' }}>🎮 Live Demo: forEach Filter</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Filter tech stack (type to search):</label>
              <input
                type="text" value={feFilter} onChange={e => setFeFilter(e.target.value)}
                placeholder="e.g. react, node..."
                style={{ display: 'block', width: '100%', marginTop: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1rem', border: '1px solid #cbd5e1', borderRadius: 8, boxSizing: 'border-box' }}
              />
              <CB code={`let stack = ${JSON.stringify(feArr)};
let results = [];

stack.forEach((item) => {
  if (item.toLowerCase().includes("${feFilter.toLowerCase()}")) {
    results.push(item);
  }
});
console.log(results);`} />
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, marginTop: '0.5rem' }}>
                <p style={{ color: '#38bdf8', fontFamily: 'monospace', margin: '0 0 0.4rem 0', fontSize: '0.8rem' }}>// Output:</p>
                {feFiltered.length === 0
                  ? <span style={{ fontFamily: 'monospace', color: '#f87171', fontSize: '0.85rem' }}>// No matches found</span>
                  : feFiltered.map((item, i) => (
                    <div key={i} style={{ fontFamily: 'monospace', color: '#22c55e', fontSize: '0.85rem' }}>{item}</div>
                  ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_nested_loop')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 8: NESTED LOOPS ══════ */}
      {activeTab === 'js_nested_loop' && (
        <Section eyebrow="Syllabus 08" title="Nested Loops">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>A <strong>nested loop</strong> is a loop placed inside another loop. The <strong>outer loop</strong> runs once, while the <strong>inner loop</strong> completes all its iterations for each single iteration of the outer loop. Nested loops are essential for working with 2D data — tables, matrices, grids, and patterns.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>How It Works:</strong>
              <p style={{ margin: '0.4rem 0 0 0', color: '#713f12', fontSize: '0.9rem' }}>For <strong>each</strong> iteration of the outer loop → inner loop runs <strong>completely</strong> from start to finish.</p>
              <p style={{ margin: '0.2rem 0 0 0', color: '#713f12', fontSize: '0.88rem' }}>Total iterations = outer count × inner count</p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Example 1: Basic Nested for Loop</h3>
            <CB code={`for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log("i=" + i + ", j=" + j);
  }
}
// Output:
// i=1, j=1 | i=1, j=2 | i=1, j=3
// i=2, j=1 | i=2, j=2 | i=2, j=3
// i=3, j=1 | i=3, j=2 | i=3, j=3
// Total: 3 × 3 = 9 iterations`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 2: Multiplication Table Grid</h3>
            <CB code={`for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += (i * j) + "\t"; // tab-separated
  }
  console.log(row);
}
// Output (5×5 multiplication grid):
//  1  2  3  4  5
//  2  4  6  8 10
//  3  6  9 12 15
//  4  8 12 16 20
//  5 10 15 20 25`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 3: Star Pattern (Triangle)</h3>
            <CB code={`for (let i = 1; i <= 5; i++) {
  let stars = "";
  for (let j = 1; j <= i; j++) {
    stars += "* ";
  }
  console.log(stars);
}
// Output:
// *
// * *
// * * *
// * * * *
// * * * * *`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 4: Loop Through 2D Array (Matrix)</h3>
            <CB code={`let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log("matrix[" + row + "][" + col + "] = " + matrix[row][col]);
  }
}
// Output: matrix[0][0]=1, matrix[0][1]=2 ... matrix[2][2]=9`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.2rem' }}>Example 5: Class Seating Plan (Nested forEach)</h3>
            <CB code={`let classrooms = [
  { room: "Room A", students: ["Alice", "Bob"] },
  { room: "Room B", students: ["Charlie", "Diana"] },
  { room: "Room C", students: ["Eve", "Frank"] }
];

classrooms.forEach((classroom) => {
  console.log("--- " + classroom.room + " ---");
  classroom.students.forEach((student) => {
    console.log("  " + student);
  });
});
// Output:
// --- Room A ---
//   Alice
//   Bob
// --- Room B ---
//   Charlie
//   Diana`} />

            {/* INTERACTIVE nested loop table */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>🎮 Live Demo: Nested Loop Multiplication Grid</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Rows (outer loop): <strong style={{ color: '#ca8a04' }}>{nestedRows}</strong></label>
                  <input type="range" min="1" max="10" value={nestedRows} onChange={e => setNestedRows(Number(e.target.value))}
                    style={{ display: 'block', marginTop: '0.4rem', accentColor: '#ca8a04', width: '160px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Cols (inner loop): <strong style={{ color: '#ca8a04' }}>{nestedCols}</strong></label>
                  <input type="range" min="1" max="10" value={nestedCols} onChange={e => setNestedCols(Number(e.target.value))}
                    style={{ display: 'block', marginTop: '0.4rem', accentColor: '#ca8a04', width: '160px' }} />
                </div>
              </div>

              <CB code={`// Total iterations: ${nestedRows} × ${nestedCols} = ${nestedRows * nestedCols}
for (let i = 1; i <= ${nestedRows}; i++) {     // outer loop
  for (let j = 1; j <= ${nestedCols}; j++) {   // inner loop
    console.log(i + " × " + j + " = " + (i * j));
  }
}`} />

              <div style={{ overflowX: 'auto', marginTop: '0.8rem' }}>
                <table style={{ borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#ca8a04', color: 'white', padding: '0.4rem 0.8rem', border: '1px solid #1e293b' }}>×</th>
                      {Array.from({ length: nestedCols }, (_, j) => (
                        <th key={j} style={{ background: '#1e293b', color: '#38bdf8', padding: '0.4rem 0.8rem', border: '1px solid #334155', minWidth: '40px' }}>{j + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {nestedOutput.map((row, ri) => (
                      <tr key={ri}>
                        <td style={{ background: '#1e293b', color: '#38bdf8', padding: '0.4rem 0.8rem', border: '1px solid #334155', fontWeight: 700 }}>{ri + 1}</td>
                        {row.map((val, ci) => (
                          <td key={ci} style={{
                            background: '#0f172a', color: ri === ci ? '#fbbf24' : '#22c55e',
                            padding: '0.4rem 0.8rem', border: '1px solid #1e293b', textAlign: 'center', fontWeight: ri === ci ? 700 : 400
                          }}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>🟡 Yellow diagonal = square numbers (i × i)</p>
              </div>
            </div>

            {/* Performance note */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.2rem' }}>⚡ Performance Note</h3>
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '1rem 1.5rem', borderRadius: 10 }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#991b1b' }}>
                Nested loops multiply execution time. An outer loop of <code>n</code> with an inner loop of <code>m</code> runs <code>n × m</code> total iterations.
                Avoid nesting beyond 2–3 levels for large datasets — this leads to O(n²) or O(n³) complexity which is very slow at scale.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_playground')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Live Coding Lab <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: LIVE CODING PLAYGROUND ════════════════ */}
      {activeTab === 'js_playground' && (
        <Section key="js_playground" id="js_playground" eyebrow="Playground" title="JavaScript Live Coding Lab">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Write your own JavaScript code in the editor on the left and see console logs in the output terminal on the right. Experiment with loops, functions, variables, and math operators!</p>
            <JSLiveEditor dayKey="day4" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 9: ASSIGNMENT ══════ */}
      {activeTab === 'assignment' && (
        <Section eyebrow="Homework" title="Day 4 Assignment: Loops">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📝 Tasks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { no: 1, task: 'Write a for loop that prints all numbers from 1 to 100. Then modify it to print only multiples of 3.' },
                { no: 2, task: 'Use a while loop to keep doubling a number (starting from 1) until it exceeds 1000. Print how many doublings it took.' },
                { no: 3, task: 'Use do...while to simulate a number guessing game: generate a random number between 1-10 and keep looping until "guessed" (use a counter instead of actual input for now).' },
                { no: 4, task: 'Create an object with 5 student names and marks. Use for...in to loop and print each student\'s result (pass/fail based on marks >= 50).' },
                { no: 5, task: 'Use forEach() on an array of 5 product prices. Calculate and print the total price and the price with 18% GST added for each item.' },
                { no: 6, task: 'Write a nested loop that prints a 5×5 star pattern (*) on the page. Then modify it to print a number triangle (rows: 1, 12, 123, 1234, 12345).' },
                { no: 7, task: 'Build an HTML page: a text input takes a number, a button runs a for loop to show the multiplication table (1 to 12) of that number in a styled table.' },
              ].map(t => (
                <div key={t.no} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <span style={{ background: '#ca8a04', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{t.no}</span>
                  <span style={{ fontSize: '0.92rem', color: '#334155' }}>{t.task}</span>
                </div>
              ))}
            </div>

            <textarea
              value={assignVal}
              onChange={e => setAssignVal(e.target.value)}
              disabled={submitted}
              placeholder="Paste your code and answers here..."
              style={{ width: '100%', height: '200px', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', fontSize: '0.9rem' }}
            />
            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted || !assignVal.trim()}
              style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {submitted ? 'Submitted ✅' : 'Submit Assignment'}
            </button>
            {submitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '1rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> Assignment submitted successfully!
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── DAY 4 QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d4" id="quiz_d4" eyebrow="Day 4 • Assessment" title="Day 4 Quiz: Loops">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which loop checks the condition AFTER executing the body at least once?', opts: ['for loop', 'while loop', 'do...while loop', 'for...of loop'], ans: 2 },
              { q: 'What does the break statement do inside a loop?', opts: ['Skips the current iteration', 'Exits the loop immediately', 'Restarts the loop', 'Pauses execution'], ans: 1 },
              { q: 'Which loop is best when you know the exact number of iterations in advance?', opts: ['while', 'do...while', 'for', 'forEach'], ans: 2 },
              { q: 'What does continue do inside a loop?', opts: ['Stops the loop', 'Skips the rest of the current iteration and goes to the next one', 'Returns a value', 'Breaks the outer loop'], ans: 1 },
              { q: 'What will be logged? for(let i=0; i<3; i++) { console.log(i); }', opts: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'], ans: 1 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#16a34a" />
            ))}
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}