import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, ShieldAlert, PenTool, GitBranch, Layers, Zap } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter Component
// ─────────────────────────────────────────────────────────────────────────────
const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: '"Fira Code", "Consolas", monospace', lineHeight: '1.6', fontSize: '0.85rem' }}>
      {lines.map((line, lineIdx) => {
        if (line === '') return <div key={lineIdx} style={{ height: '0.8em' }} />;
        // Groups: 1=comment 2=string 3=htmlTag 4=keyword 5=literal 6=builtin 7=number 8=identifier 9=symbol 10=space
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment)         color = '#8b949e';
          else if (str)        color = '#a5d6ff';
          else if (htmlTag)    color = '#7ee787';
          else if (kw)       { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal)    color = '#d2a8ff';
          else if (builtin)    color = '#ffb454';
          else if (num)        color = '#79c0ff';
          else if (ident)      color = '#e1e4e8';
          else if (sym)        color = '#ff7b72';
          tokens.push(<span key={k++} style={{ color, fontWeight }}>{tok}</span>);
        }
        return <div key={lineIdx} style={{ whiteSpace: 'pre' }}>{tokens.length > 0 ? tokens : line}</div>;
      })}
    </div>
  );
};


// ─────────────────────────────────────────────────────────────────────────────
// Reusable Section wrapper
// ─────────────────────────────────────────────────────────────────────────────
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CodeBlock = ({ code }) => (
  <div style={{ background: '#0f172a', padding: '1.2rem 1.5rem', borderRadius: 12, overflowX: 'auto', margin: '0.8rem 0', border: '1px solid #1e293b' }}>
    <SyntaxHighlighter code={code} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function JSDay3({ activeTab, onNavigate }) {
  const handleContinue = (nextTabId) => {
    onNavigate('js_module3', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactive If-Else simulator
  const [age, setAge] = useState(20);
  const [marks, setMarks] = useState(75);

  // Switch demo
  const [dayNum, setDayNum] = useState(1);

  // Ternary demo
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Nested if demo
  const [salary, setSalary] = useState(50000);

  // Live grade calculator
  const [studentScore, setStudentScore] = useState(85);
  const [gradeResult, setGradeResult] = useState('');

  // Assignment
  const [assignValue, setAssignValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getAgeResult = () => {
    if (age >= 18) return { label: 'ELIGIBLE to Vote ✅', color: '#22c55e', bg: '#f0fdf4', border: '#86efac' };
    else return { label: 'NOT eligible to Vote ❌', color: '#ef4444', bg: '#fef2f2', border: '#fca5a5' };
  };

  const getMarksResult = () => {
    if (marks >= 90) return 'Grade A+ 🏆';
    else if (marks >= 80) return 'Grade A 🌟';
    else if (marks >= 70) return 'Grade B 👍';
    else if (marks >= 60) return 'Grade C 📘';
    else if (marks >= 50) return 'Grade D ⚠️';
    else return 'FAIL ❌';
  };

  const getDayName = () => {
    const days = { 1: 'Monday 🌅', 2: 'Tuesday 🔥', 3: 'Wednesday 🌿', 4: 'Thursday ⚡', 5: 'Friday 🎉', 6: 'Saturday 🎮', 7: 'Sunday 😴' };
    return days[dayNum] || 'Invalid Day';
  };

  const getSalaryTax = () => {
    if (salary > 100000) {
      if (salary > 500000) return { bracket: '>5 Lakh', rate: '30% tax bracket 💸' };
      else return { bracket: '1-5 Lakh', rate: '20% tax bracket 📊' };
    } else if (salary > 50000) {
      return { bracket: '50K-1 Lakh', rate: '10% tax bracket 📋' };
    } else {
      return { bracket: '≤ 50K', rate: 'No tax bracket ✅' };
    }
  };

  const handleGradeCheck = () => {
    const s = Number(studentScore);
    let g = '';
    if (s >= 90) g = 'A+ – Outstanding! 🏆';
    else if (s >= 80) g = 'A – Excellent! 🌟';
    else if (s >= 70) g = 'B – Good 👍';
    else if (s >= 60) g = 'C – Average 📘';
    else if (s >= 50) g = 'D – Below Average ⚠️';
    else g = 'FAIL – Study harder! ❌';
    setGradeResult(g);
  };

  const ageRes = getAgeResult();
  const taxRes = getSalaryTax();

  return (
    <AnimatePresence mode="wait">

      {/* ══════ TAB 1: IF-ELSE ══════ */}
      {activeTab === 'js_if_else' && (
        <Section key="js_if_else" eyebrow="Syllabus 01" title="if / else if / else Statements">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>Conditional statements let the program make decisions and execute different blocks of code based on whether a condition is <code>true</code> or <code>false</code>. JavaScript provides several types of conditionals — <strong>if</strong>, <strong>else if</strong>, <strong>else</strong>, <strong>switch</strong>, and <strong>ternary</strong>.</p>

            {/* if statement */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>1. The <code>if</code> Statement</h3>
            <p>The <code>if</code> statement evaluates a condition inside parentheses. If the result is <strong>truthy</strong>, the code inside curly braces <code>{`{}`}</code> executes. If falsy, that block is skipped entirely.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1rem 1.5rem', borderRadius: 12, marginBottom: '1rem' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontSize: '0.88rem', color: '#713f12', fontFamily: 'monospace' }}>{`if (condition) {\n  // code runs only if condition is true\n}`}</pre>
            </div>

            <CodeBlock code={`let age = 18;

if (age >= 18) {
  console.log("You are eligible to vote.");
}
// Output: You are eligible to vote.`} />

            {/* else statement */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>2. The <code>else</code> Statement</h3>
            <p>The <code>else</code> block runs when the <code>if</code> condition is <strong>false</strong>. It acts as a fallback — "if not this, then do that".</p>

            <CodeBlock code={`let age = 15;

if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("You are too young to vote.");
}
// Output: You are too young to vote.`} />

            {/* else if */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>3. The <code>else if</code> Chain</h3>
            <p>Use <code>else if</code> to test multiple conditions in sequence. JavaScript evaluates each condition from top to bottom and executes the <strong>first match</strong> that is truthy. All remaining blocks are skipped.</p>

            <CodeBlock code={`let marks = 78;

if (marks >= 90) {
  console.log("Grade A+");
} else if (marks >= 80) {
  console.log("Grade A");
} else if (marks >= 70) {
  console.log("Grade B");
} else if (marks >= 60) {
  console.log("Grade C");
} else {
  console.log("FAIL");
}
// Output: Grade B`} />

            {/* Visual Flow Diagram */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>📊 Execution Flow Diagram</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start', margin: '1rem 0', padding: '1.5rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              {[
                { label: 'START → Evaluate condition', bg: '#0f172a', fg: '#f8fafc' },
                { label: 'if (condition true) → execute block', bg: '#16a34a', fg: 'white' },
                { label: 'else if (next condition true) → execute block', bg: '#ca8a04', fg: 'white' },
                { label: 'else (nothing matched) → execute fallback', bg: '#dc2626', fg: 'white' },
                { label: 'CONTINUE → rest of program runs', bg: '#0f172a', fg: '#f8fafc' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                  <div style={{ background: step.bg, color: step.fg, padding: '0.5rem 1rem', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.85rem', minWidth: '380px', fontWeight: 600 }}>{step.label}</div>
                  {i < 4 && <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>↓</div>}
                </div>
              ))}
            </div>

            {/* INTERACTIVE DEMO */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Demo: if-else Simulator</h3>
            <p>Change the sliders and watch the code execute in real-time:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1rem 0' }}>
              {/* Age checker */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Age Eligibility Checker</h4>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Age: <strong style={{ color: '#ca8a04' }}>{age}</strong></label>
                <input type="range" min="1" max="100" value={age} onChange={e => setAge(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', accentColor: '#ca8a04' }} />
                <div style={{ background: ageRes.bg, border: `1px solid ${ageRes.border}`, padding: '0.8rem 1rem', borderRadius: 8, fontWeight: 700, color: ageRes.color }}>
                  {ageRes.label}
                </div>
                <CodeBlock code={`let age = ${age};
if (age >= 18) {
  // RUNS: ${age >= 18 ? '✅ YES' : '❌ NO'}
  console.log("Eligible to vote");
} else {
  // RUNS: ${age < 18 ? '✅ YES' : '❌ NO'}
  console.log("Not eligible");
}`} />
              </div>

              {/* Marks checker */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Grade Calculator</h4>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Marks: <strong style={{ color: '#ca8a04' }}>{marks}</strong></label>
                <input type="range" min="0" max="100" value={marks} onChange={e => setMarks(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', accentColor: '#ca8a04' }} />
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.8rem 1rem', borderRadius: 8, fontWeight: 700, color: '#0f172a' }}>
                  Result: {getMarksResult()}
                </div>
                <CodeBlock code={`let marks = ${marks};
if (marks >= 90) {        // ${marks >= 90 ? '✅' : '❌'}
  // Grade A+
} else if (marks >= 80) { // ${marks >= 80 && marks < 90 ? '✅' : '❌'}
  // Grade A
} else if (marks >= 70) { // ${marks >= 70 && marks < 80 ? '✅' : '❌'}
  // Grade B
} else {                  // ${marks < 70 ? '✅' : '❌'}
  // FAIL
}`} />
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_switch')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 2: SWITCH ══════ */}
      {activeTab === 'js_switch' && (
        <Section key="js_switch" eyebrow="Syllabus 02" title="Switch Statement">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>The <code>switch</code> statement is a cleaner alternative to a long chain of <code>else if</code> blocks when you are checking <strong>one variable</strong> against many exact values. It compares the expression using <strong>strict equality</strong> (<code>===</code>).</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '1.2rem', borderRadius: 12 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc2626' }}>❌ Without switch (messy)</h4>
                <CodeBlock code={`if (day === 1) { console.log("Monday"); }
else if (day === 2) { console.log("Tuesday"); }
else if (day === 3) { console.log("Wednesday"); }
else if (day === 4) { console.log("Thursday"); }
else if (day === 5) { console.log("Friday"); }
else { console.log("Weekend"); }`} />
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '1.2rem', borderRadius: 12 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#16a34a' }}>✅ With switch (clean)</h4>
                <CodeBlock code={`switch (day) {
  case 1: console.log("Monday"); break;
  case 2: console.log("Tuesday"); break;
  case 3: console.log("Wednesday"); break;
  case 4: console.log("Thursday"); break;
  case 5: console.log("Friday"); break;
  default: console.log("Weekend");
}`} />
              </div>
            </div>

            {/* switch keywords explained */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1rem' }}>🔑 Key Keywords Explained</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', margin: '1rem 0' }}>
              {[
                { kw: 'switch(expr)', color: '#ff7b72', desc: 'Evaluates the expression once and compares it to each case.' },
                { kw: 'case value:', color: '#7ee787', desc: 'A matching label. If expr === value, this block executes.' },
                { kw: 'break;', color: '#79c0ff', desc: 'Stops execution and exits the switch block. Without break, the code "falls through" to the next case.' },
                { kw: 'default:', color: '#d2a8ff', desc: 'Runs if no case matches — similar to else. Optional but recommended.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.8rem 1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <code style={{ color: item.color, fontWeight: 700, minWidth: '140px', fontFamily: 'monospace' }}>{item.kw}</code>
                  <span style={{ fontSize: '0.9rem', color: '#475569' }}>{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Fall-through warning */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1rem' }}>⚠️ Fall-Through Behavior (Without break)</h3>
            <p>If you forget <code>break</code>, JavaScript continues executing all the following cases regardless of whether they match. This is called <strong>fall-through</strong>.</p>

            <CodeBlock code={`let season = 2; // 1=Spring, 2=Summer, 3=Autumn, 4=Winter

switch (season) {
  case 1: console.log("Spring"); // no break!
  case 2: console.log("Summer"); // no break!
  case 3: console.log("Autumn"); // matches AND falls through
  case 4: console.log("Winter");
  default: console.log("Unknown");
}
// Output: Summer, Autumn, Winter, Unknown (ALL cases after match run!)`} />

            {/* Intentional fall-through */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1rem' }}>✅ Intentional Fall-Through (Group Cases)</h3>
            <p>Sometimes fall-through is intentional — when multiple values should trigger the same code:</p>

            <CodeBlock code={`let month = 4; // April

switch (month) {
  case 3:
  case 4:
  case 5:
    console.log("Spring Season"); // Runs for March, April, May
    break;
  case 6:
  case 7:
  case 8:
    console.log("Summer Season");
    break;
  default:
    console.log("Other Season");
}
// Output: Spring Season`} />

            {/* INTERACTIVE */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1rem' }}>🎮 Live Demo: Day Name Switch</h3>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Select Day Number (1-7):</label>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5, 6, 7].map(d => (
                  <button key={d} onClick={() => setDayNum(d)} style={{
                    padding: '0.5rem 1rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
                    background: dayNum === d ? '#ca8a04' : '#e2e8f0', color: dayNum === d ? 'white' : '#1e293b'
                  }}>{d}</button>
                ))}
              </div>
              <div style={{ background: '#0f172a', color: '#22c55e', padding: '0.8rem 1rem', borderRadius: 8, fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem' }}>
                Output: {getDayName()}
              </div>
              <CodeBlock code={`let day = ${dayNum};
switch(day) {
  case 1: console.log("Monday");    break; ${dayNum === 1 ? '// ← MATCHED ✅' : ''}
  case 2: console.log("Tuesday");   break; ${dayNum === 2 ? '// ← MATCHED ✅' : ''}
  case 3: console.log("Wednesday"); break; ${dayNum === 3 ? '// ← MATCHED ✅' : ''}
  case 4: console.log("Thursday");  break; ${dayNum === 4 ? '// ← MATCHED ✅' : ''}
  case 5: console.log("Friday");    break; ${dayNum === 5 ? '// ← MATCHED ✅' : ''}
  case 6: console.log("Saturday");  break; ${dayNum === 6 ? '// ← MATCHED ✅' : ''}
  case 7: console.log("Sunday");    break; ${dayNum === 7 ? '// ← MATCHED ✅' : ''}
  default: console.log("Invalid");
}`} />
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_ternary')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 3: TERNARY ══════ */}
      {activeTab === 'js_ternary' && (
        <Section key="js_ternary" eyebrow="Syllabus 03" title="Ternary Operator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>The <strong>ternary operator</strong> is JavaScript's only operator that takes <strong>three operands</strong>. It is a compact shorthand for writing a simple <code>if-else</code> statement in a single line.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'monospace', color: '#713f12', fontSize: '0.9rem' }}>
                {`condition  ?  valueIfTrue  :  valueIfFalse`}
              </pre>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#713f12' }}>
                Read it as: <em>"If condition is true, return left; otherwise return right"</em>
              </p>
            </div>

            {/* Comparison table */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>if-else vs Ternary: Side-by-Side</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1rem 0' }}>
              <div>
                <h4 style={{ color: '#475569', fontWeight: 700, marginBottom: '0.5rem' }}>Using if-else (4 lines)</h4>
                <CodeBlock code={`let age = 20;
let result;

if (age >= 18) {
  result = "Adult";
} else {
  result = "Minor";
}
console.log(result); // "Adult"`} />
              </div>
              <div>
                <h4 style={{ color: '#475569', fontWeight: 700, marginBottom: '0.5rem' }}>Using Ternary (1 line)</h4>
                <CodeBlock code={`let age = 20;

// One line version:
let result = age >= 18 ? "Adult" : "Minor";

console.log(result); // "Adult"`} />
              </div>
            </div>

            {/* Real world uses */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>📌 Real-World Ternary Examples</h3>

            <CodeBlock code={`// Example 1: Login check
let isLoggedIn = true;
let message = isLoggedIn ? "Welcome back!" : "Please login";
console.log(message); // "Welcome back!"

// Example 2: Even or Odd
let num = 7;
let type = num % 2 === 0 ? "Even" : "Odd";
console.log(type); // "Odd"

// Example 3: Discount eligibility
let totalPrice = 1500;
let finalPrice = totalPrice > 1000 ? totalPrice * 0.9 : totalPrice;
console.log("Final Price: " + finalPrice); // 1350

// Example 4: Dynamic HTML class
let score = 85;
let cssClass = score >= 60 ? "pass-badge" : "fail-badge";
console.log(cssClass); // "pass-badge"`} />

            {/* Nested ternary */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🔗 Nested Ternary (Use Carefully)</h3>
            <p>You can chain ternary operators, but readability suffers. Prefer <code>else if</code> for 3+ conditions.</p>

            <CodeBlock code={`let score = 75;

// Nested ternary (hard to read):
let grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : "C";
console.log(grade); // "B"

// Better with else-if chain for 3+ conditions`} />

            {/* Interactive */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Demo: Login Status Toggle</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <button onClick={() => setIsLoggedIn(true)} style={{ padding: '0.5rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', background: isLoggedIn ? '#16a34a' : '#e2e8f0', color: isLoggedIn ? 'white' : '#1e293b', fontWeight: 700 }}>Logged In</button>
                <button onClick={() => setIsLoggedIn(false)} style={{ padding: '0.5rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', background: !isLoggedIn ? '#dc2626' : '#e2e8f0', color: !isLoggedIn ? 'white' : '#1e293b', fontWeight: 700 }}>Logged Out</button>
              </div>
              <div style={{ background: '#0f172a', color: '#22c55e', padding: '0.8rem 1rem', borderRadius: 8, fontFamily: 'monospace', marginBottom: '0.8rem', fontWeight: 700 }}>
                Output: {isLoggedIn ? '"Welcome back! 👋"' : '"Please login first 🔐"'}
              </div>
              <CodeBlock code={`let isLoggedIn = ${isLoggedIn};
let message = isLoggedIn ? "Welcome back! 👋" : "Please login first 🔐";
console.log(message);
// → ${isLoggedIn ? '"Welcome back! 👋"' : '"Please login first 🔐"'}`} />
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_nested_if')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 4: NESTED IF ══════ */}
      {activeTab === 'js_nested_if' && (
        <Section key="js_nested_if" eyebrow="Syllabus 04" title="Nested if Statements">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>A <strong>nested if</strong> means placing an <code>if</code> statement <em>inside</em> another <code>if</code> block. This allows checking secondary conditions only when the outer condition is already satisfied.</p>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#166534' }}>When to use nested if:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', color: '#14532d', fontSize: '0.9rem' }}>
                <li>When conditions are hierarchical (parent-child relationship)</li>
                <li>When the inner condition only matters if the outer is already true</li>
              </ul>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '1rem' }}>Example: ATM Withdrawal Logic</h3>
            <CodeBlock code={`let hasCard = true;
let balance = 5000;
let withdrawAmount = 2000;

if (hasCard) {
  console.log("Card inserted ✅");

  if (balance >= withdrawAmount) {
    console.log("Dispensing ₹" + withdrawAmount);
    balance = balance - withdrawAmount;
    console.log("Remaining balance: ₹" + balance);
  } else {
    console.log("Insufficient balance ❌");
  }

} else {
  console.log("Please insert a valid card 🃏");
}
// Output:
// Card inserted ✅
// Dispensing ₹2000
// Remaining balance: ₹3000`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Example: Income Tax Brackets (Nested)</h3>
            <CodeBlock code={`let salary = 75000;

if (salary > 0) {
  console.log("Income detected");

  if (salary > 100000) {
    if (salary > 500000) {
      console.log("Tax bracket: 30%");
    } else {
      console.log("Tax bracket: 20%");
    }
  } else if (salary > 50000) {
    console.log("Tax bracket: 10%");
  } else {
    console.log("No tax");
  }

} else {
  console.log("No income — no tax");
}
// Output: Income detected → Tax bracket: 10%`} />

            {/* Interactive nested */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Demo: Income Tax Bracket Calculator</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Annual Salary (₹): <strong style={{ color: '#ca8a04' }}>₹{salary.toLocaleString()}</strong></label>
              <input type="range" min="0" max="1000000" step="10000" value={salary} onChange={e => setSalary(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', accentColor: '#ca8a04' }} />
              <div style={{ background: '#0f172a', color: '#22c55e', padding: '0.8rem 1rem', borderRadius: 8, fontFamily: 'monospace', fontWeight: 700, marginBottom: '0.8rem' }}>
                Bracket: {taxRes.bracket} → {taxRes.rate}
              </div>
              <CodeBlock code={`let salary = ${salary};
if (salary > 0) {               // ${salary > 0 ? '✅' : '❌'}
  if (salary > 100000) {        // ${salary > 100000 ? '✅' : '❌'}
    if (salary > 500000) {      // ${salary > 500000 ? '✅ → 30% tax' : '❌'}
      console.log("30% tax");
    } else {
      console.log("20% tax");   ${salary > 100000 && salary <= 500000 ? '// ← RUNS ✅' : ''}
    }
  } else if (salary > 50000) { // ${salary > 50000 && salary <= 100000 ? '✅ → 10% tax' : '❌'}
    console.log("10% tax");
  } else {
    console.log("No tax");      ${salary <= 50000 && salary > 0 ? '// ← RUNS ✅' : ''}
  }
}`} />
            </div>

            {/* Best Practices */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>⚡ Best Practices for Nested if</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
              <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: 10, border: '1px solid #86efac' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#16a34a', fontSize: '0.95rem' }}>✅ Do</h4>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.88rem', color: '#14532d', lineHeight: 1.6 }}>
                  <li>Keep nesting to max 2-3 levels</li>
                  <li>Use meaningful variable names</li>
                  <li>Consider using early returns or guard clauses</li>
                  <li>Comment complex logic for readability</li>
                </ul>
              </div>
              <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: 10, border: '1px solid #fca5a5' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc2626', fontSize: '0.95rem' }}>❌ Don't</h4>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.88rem', color: '#991b1b', lineHeight: 1.6 }}>
                  <li>Avoid deeply nested ifs (5+ levels)</li>
                  <li>Don't repeat conditions that can be combined</li>
                  <li>Avoid magic numbers without explanation</li>
                </ul>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_codedemo3')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
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
            <JSLiveEditor dayKey="day3" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════ TAB 6: ASSIGNMENT ══════ */}
      {activeTab === 'assignment' && (
        <Section key="assignment" eyebrow="Homework" title="Day 3 Assignment: Conditional Statements">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📝 Tasks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { no: 1, task: 'Write an if-else program that checks if a number is positive, negative, or zero.' },
                { no: 2, task: 'Create a switch statement that outputs the type of a vehicle given a string: "car", "bike", "truck", "boat".' },
                { no: 3, task: 'Use a ternary operator to check if a user is an adult (age >= 18) and store the result in a variable.' },
                { no: 4, task: 'Build a nested if statement that: first checks if a student has attended class (true/false), then checks their marks and assigns a pass/fail status.' },
                { no: 5, task: 'Create an HTML file with a login form. Use conditional statements to check if the username === "admin" and password === "1234". Display "Access Granted" or "Access Denied".' },
              ].map(t => (
                <div key={t.no} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <span style={{ background: '#ca8a04', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{t.no}</span>
                  <span style={{ fontSize: '0.92rem', color: '#334155' }}>{t.task}</span>
                </div>
              ))}
            </div>

            <textarea
              value={assignValue}
              onChange={e => setAssignValue(e.target.value)}
              disabled={submitted}
              placeholder="Paste your code and answers here..."
              style={{ width: '100%', height: '200px', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', fontSize: '0.9rem' }}
            />

            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted || !assignValue.trim()}
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

      {/* ── DAY 3 QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d3" id="quiz_d3" eyebrow="Day 3 • Assessment" title="Day 3 Quiz: Conditional Statements">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which statement is used to execute different code based on multiple conditions?', opts: ['for loop', 'switch statement', 'while loop', 'try...catch'], ans: 1 },
              { q: 'What does the ternary operator return?', opts: ['Always true', 'A value based on a condition', 'A loop counter', 'A function'], ans: 1 },
              { q: 'What keyword must appear at the end of each case in a switch statement to prevent fall-through?', opts: ['stop', 'return', 'break', 'end'], ans: 2 },
              { q: 'What is the syntax of the ternary operator?', opts: ['if ? condition : else', 'condition ? valueIfTrue : valueIfFalse', 'condition : valueIfTrue ? valueIfFalse', 'if(condition) ? value'], ans: 1 },
              { q: 'In a nested if statement, the inner if executes only when:', opts: ['Always', 'The outer condition is false', 'The outer condition is true', 'Never'], ans: 2 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#4f46e5" />
            ))}
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
