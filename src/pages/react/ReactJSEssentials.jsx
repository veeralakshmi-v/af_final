import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, Sparkles, CheckCircle, Code, ArrowRight,
  Info, Copy, FileText, Plus, AlertTriangle, BookOpenCheck, Zap,
  GitBranch, Hash, List, Settings, Terminal, RefreshCw, Filter,
  ChevronRight, ChevronDown, Box
} from 'lucide-react';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const hlJS = (code) => {
  let h = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  h = h.replace(/(?<!=)(["'`])(?:\\.|[^\n"'`\\])*?\1/g, '<span style="color:#a5d6ff">$&</span>');
  h = h.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color:#8892b0">$1</span>');
  ['const','let','var','return','import','export','default','function','from','if','else','for','of','in','true','false','null','undefined','new','typeof','class','extends','super','this','async','await','throw','try','catch'].forEach(k => {
    h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#ff7b72;font-weight:bold">$1</span>');
  });
  ['map','filter','reduce','forEach','find','findIndex','some','every','includes','push','pop','slice','splice','Object','Array','console','log','JSON','stringify','parse','Math'].forEach(k => {
    h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#d2a8ff">$1</span>');
  });
  return <span dangerouslySetInnerHTML={{ __html: h }} />;
};

const CodeBlock = ({ title, code }) => {
  const [cp, setCp] = useState(false);
  return (
    <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', margin: '1.2rem 0', overflowX: 'auto' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <button onClick={() => { navigator.clipboard.writeText(code); setCp(true); setTimeout(() => setCp(false), 2000); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Copy size={12} /> {cp ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre' }}>
        <code>{hlJS(code)}</code>
      </pre>
    </div>
  );
};

const ConceptCard = ({ icon, title, desc, color = '#6366f1' }) => (
  <div style={{ background: '#f8fafc', border: `1px solid ${color}22`, borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
    <span style={{ color, flexShrink: 0, marginTop: 2 }}>{icon}</span>
    <div>
      <strong style={{ display: 'block', color: '#0f172a', marginBottom: 4, fontSize: '0.95rem' }}>{title}</strong>
      <span style={{ fontSize: '0.87rem', color: '#475569', lineHeight: 1.6 }}>{desc}</span>
    </div>
  </div>
);

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactJSEssentials({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('react_js_essentials', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Section 1: var / let / const ── */
  const [varDemo, setVarDemo] = useState({ name: 'React', version: 19, isActive: true });

  /* ── Section 2: Arrow Functions ── */
  const [arrowInput, setArrowInput] = useState('Hello React');
  const [arrowOutput, setArrowOutput] = useState('');
  const arrowTransform = () => setArrowOutput(arrowInput.toUpperCase().split('').reverse().join(''));

  /* ── Section 3: Destructuring ── */
  const [destMode, setDestMode] = useState('array');

  /* ── Section 4: Spread & Rest ── */
  const [spreadArr, setSpreadArr] = useState([1, 2, 3]);
  const [spreadLog, setSpreadLog] = useState([]);
  const spreadAdd = () => {
    const next = spreadArr.length + 1;
    const newArr = [...spreadArr, next];
    setSpreadArr(newArr);
    setSpreadLog(p => [...p, `[...arr, ${next}] → [${newArr.join(', ')}]`].slice(-5));
  };

  /* ── Section 5: Template Literals ── */
  const [tlName, setTlName] = useState('Alice');
  const [tlCourse, setTlCourse] = useState('React');

  /* ── Section 6: Array Methods ── */
  const [arrData] = useState([
    { id: 1, name: 'Alice', age: 22, score: 88 },
    { id: 2, name: 'Bob', age: 19, score: 54 },
    { id: 3, name: 'Carol', age: 24, score: 92 },
    { id: 4, name: 'Dave', age: 20, score: 45 },
    { id: 5, name: 'Eve', age: 23, score: 77 },
  ]);
  const [arrMethod, setArrMethod] = useState('map');
  const arrResults = {
    map: arrData.map(s => ({ ...s, _result: `Grade: ${s.score >= 80 ? 'A' : s.score >= 60 ? 'B' : 'C'}` })),
    filter: arrData.filter(s => s.score >= 60),
    reduce: [{ name: 'Total Score', _result: arrData.reduce((sum, s) => sum + s.score, 0) }],
    find: [arrData.find(s => s.score >= 90) || { name: 'Not found', _result: '' }],
  };

  /* ── Section 7: Short-circuit & Ternary ── */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count2, setCount2] = useState(3);

  /* ── Section 8: Modules ── */

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1', q: 'Which keyword creates a block-scoped constant that cannot be reassigned?',
      opts: ['var', 'let', 'const', 'function'], ans: 2,
      exp: 'const creates a block-scoped binding whose value cannot be reassigned. var is function-scoped, and let is block-scoped but re-assignable.'
    },
    {
      k: 'q2', q: 'What does the spread operator (...) do when used with an array?',
      opts: ['Removes elements', 'Creates a reference to the same array', 'Expands elements into individual items — creating a shallow copy', 'Sorts the array'],
      ans: 2, exp: '[...arr] expands each element individually, useful for copying arrays or merging without mutation — critical for immutable React state updates.'
    },
    {
      k: 'q3', q: 'What does array.filter() return?',
      opts: [
        'A single value — the first match',
        'A new array with only the elements that pass the test function',
        'The original array, mutated in place',
        'A boolean indicating if any element matches'
      ],
      ans: 1, exp: 'filter() always returns a NEW array containing only elements for which the callback returns true. The original array is unchanged.'
    },
    {
      k: 'q4', q: 'In JSX, what does {isLoggedIn && <Dashboard />} do?',
      opts: [
        'Always renders Dashboard',
        'Never renders Dashboard',
        'Renders Dashboard only if isLoggedIn is truthy — short-circuit evaluation',
        'Throws an error'
      ],
      ans: 2, exp: '&& short-circuits: if the left side is falsy, JavaScript stops and returns that falsy value without evaluating the right side. This is the standard conditional render pattern in React JSX.'
    },
    {
      k: 'q5', q: 'What is the difference between a named export and a default export?',
      opts: [
        'Named exports use {} on import; a file can have many. Default exports have no {}, only one per file.',
        'Named exports are faster than default exports.',
        'Default exports require a specific filename.',
        'There is no difference — they work identically.'
      ],
      ans: 0, exp: 'import { name } from "./file" — named (curly braces). import anything from "./file" — default (no curly braces, can be renamed freely). A file can have many named exports but only one default.'
    },
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 0. INTRO / OVERVIEW ──────────────────────────────────────────── */}
      {activeTab === 'intro_essentials' && (
        <Section key="intro" eyebrow="Pre-Course • JS for React" title="JavaScript Essentials for React">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>⚡ Why JS First?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                React is <em>built on</em> modern JavaScript. Before writing a single JSX line, you need to be fluent in ES6+ features — because React uses them <strong>everywhere</strong>: destructuring in props, spread for state updates, map() for rendering lists, and modules for component imports.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Topics covered in this module</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.8rem', marginBottom: '2rem' }}>
              {[
                { icon: <Hash size={18}/>, label: 'var / let / const', color: '#6366f1', tab: 'var_let_const' },
                { icon: <Zap size={18}/>, label: 'Arrow Functions', color: '#10b981', tab: 'arrow_functions' },
                { icon: <Box size={18}/>, label: 'Destructuring', color: '#f59e0b', tab: 'destructuring' },
                { icon: <Code size={18}/>, label: 'Spread & Rest Operator', color: '#3b82f6', tab: 'spread_rest' },
                { icon: <Terminal size={18}/>, label: 'Template Literals', color: '#8b5cf6', tab: 'template_literals' },
                { icon: <Filter size={18}/>, label: 'Array Methods (map/filter/reduce)', color: '#ef4444', tab: 'array_methods' },
                { icon: <Zap size={18}/>, label: 'Short-circuit & Ternary', color: '#0ea5e9', tab: 'short_circuit' },
                { icon: <GitBranch size={18}/>, label: 'Modules (import/export)', color: '#14b8a6', tab: 'modules_import' },
              ].map((item, i) => (
                <button key={i} onClick={() => go(item.tab)}
                  style={{ background: '#f8fafc', border: `1px solid ${item.color}33`, borderRadius: 12, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = `${item.color}11`}
                  onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151' }}>{item.label}</span>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', color: '#94a3b8' }} />
                </button>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => go('var_let_const')} style={{ background: '#f59e0b', borderColor: '#f59e0b' }}>
                Start Learning <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 1. VAR / LET / CONST ─────────────────────────────────────────── */}
      {activeTab === 'var_let_const' && (
        <Section key="s1" eyebrow="Module 01 • JS Essentials" title="var, let & const">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { kw: 'var', scope: 'Function scoped', reassign: '✅ Yes', redeclare: '✅ Yes', hoisted: '✅ Yes (undefined)', color: '#ef4444', bg: '#fef2f2' },
                { kw: 'let', scope: 'Block scoped {}', reassign: '✅ Yes', redeclare: '❌ No', hoisted: '⚠️ TDZ error', color: '#f59e0b', bg: '#fffbeb' },
                { kw: 'const', scope: 'Block scoped {}', reassign: '❌ No', redeclare: '❌ No', hoisted: '⚠️ TDZ error', color: '#10b981', bg: '#f0fdf4' },
              ].map((row, i) => (
                <div key={i} style={{ background: row.bg, border: `1px solid ${row.color}33`, borderRadius: 12, padding: '1rem' }}>
                  <code style={{ fontSize: '1.3rem', fontWeight: 900, color: row.color, display: 'block', marginBottom: '0.75rem' }}>{row.kw}</code>
                  <div style={{ fontSize: '0.82rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span>📦 Scope: <strong>{row.scope}</strong></span>
                    <span>🔄 Re-assign: <strong>{row.reassign}</strong></span>
                    <span>📝 Re-declare: <strong>{row.redeclare}</strong></span>
                    <span>🔼 Hoisting: <strong>{row.hoisted}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <CodeBlock title="variables.js" code={`// var - function scoped (avoid in modern JS)
var city = "Chennai";
var city = "Mumbai"; // re-declaration allowed - no error!

// let - block scoped, can be reassigned
let score = 0;
score = 42; // OK
// let score = 100; // Error! Cannot re-declare

// const - block scoped, cannot be reassigned
const PI = 3.14;
// PI = 5; // Error! Assignment to constant variable

// ✅ In React — use const for components, let for loop vars
const App = () => <h1>Hello</h1>;

// const with objects/arrays — the REFERENCE is constant
// but the CONTENTS can still change:
const user = { name: "Alice" };
user.name = "Bob"; // This is fine!
// user = {}; // This throws an error`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🧪 Live Variable Inspector</h4>
            <p style={{ marginBottom: '1rem' }}>The object below is declared with <code>const</code>. Notice you can still mutate its properties — only the reference is locked.</p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>user.name:</label>
                <input className="form-control" value={varDemo.name} onChange={e => setVarDemo(d => ({ ...d, name: e.target.value }))} placeholder="name" />
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>user.version:</label>
                <input className="form-control" type="number" value={varDemo.version} onChange={e => setVarDemo(d => ({ ...d, version: +e.target.value }))} />
              </div>
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                <span style={{ color: '#8892b0' }}>{'// const user = { ... }'}</span>
                <br /><span style={{ color: '#86efac' }}>{JSON.stringify(varDemo, null, 2)}</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('arrow_functions')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. ARROW FUNCTIONS ───────────────────────────────────────────── */}
      {activeTab === 'arrow_functions' && (
        <Section key="s2" eyebrow="Module 02 • JS Essentials" title="Arrow Functions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Arrow functions are a shorter syntax for writing functions. They are the <strong>standard way to write components and callbacks</strong> in React.</p>

            <CodeBlock title="arrow-functions.js" code={`// Traditional function declaration
function greet(name) {
  return "Hello, " + name;
}

// Arrow function — same thing, shorter syntax
const greet = (name) => {
  return "Hello, " + name;
};

// Even shorter — implicit return (no braces, no return)
const greet = (name) => "Hello, " + name;

// Single parameter? Can drop the parens
const double = n => n * 2;

// No parameters? Use empty parens
const sayHi = () => "Hi!";

// ✅ Arrow functions in React
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Array method callbacks use arrow functions
const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]`} />

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1rem 1.25rem', margin: '1.5rem 0' }}>
              <strong style={{ color: '#1d4ed8' }}>📌 Arrow functions & this</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#1e40af' }}>
                Arrow functions don't have their own <code>this</code> — they inherit it from the surrounding scope. This is why they're preferred in React class component event handlers (and why functional components prefer them overall).
              </p>
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>⚡ Arrow Function Lab</h4>
            <p>Type a string below and apply an arrow function transformation to it:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input className="form-control" value={arrowInput} onChange={e => setArrowInput(e.target.value)} placeholder="Type something..." />
                <button className="btn btn-primary" onClick={arrowTransform} style={{ background: '#10b981', borderColor: '#10b981' }}>
                  Apply: <code>s =&gt; s.toUpperCase().split('').reverse().join('')</code>
                </button>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#8892b0', fontSize: '0.78rem' }}>// Output:</span><br />
                <span style={{ color: '#86efac', fontSize: '1.1rem', fontWeight: 700 }}>{arrowOutput || '—'}</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('destructuring')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. DESTRUCTURING ─────────────────────────────────────────────── */}
      {activeTab === 'destructuring' && (
        <Section key="s3" eyebrow="Module 03 • JS Essentials" title="Destructuring">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Destructuring lets you <strong>unpack values from arrays or properties from objects into distinct variables</strong>. React uses this constantly — especially for extracting props.</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {['array', 'object', 'props'].map(m => (
                <button key={m} onClick={() => setDestMode(m)}
                  style={{ padding: '6px 18px', borderRadius: 8, border: '1.5px solid #6366f1', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem',
                    background: destMode === m ? '#6366f1' : 'white', color: destMode === m ? 'white' : '#6366f1', transition: 'all 0.15s' }}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            {destMode === 'array' && (
              <CodeBlock title="Array Destructuring" code={`// Without destructuring
const colors = ["red", "green", "blue"];
const first = colors[0];
const second = colors[1];

// ✅ With array destructuring
const [first, second, third] = colors;
console.log(first);  // "red"
console.log(second); // "green"

// Skip elements with commas
const [,, blue] = colors; // blue = "blue"

// Default values
const [a = 10, b = 20] = [5];
// a = 5, b = 20 (default used)

// ✅ React useState uses array destructuring!
const [count, setCount] = useState(0);`} />
            )}
            {destMode === 'object' && (
              <CodeBlock title="Object Destructuring" code={`const user = {
  name: "Alice",
  age: 22,
  course: "React"
};

// Without destructuring
const name = user.name;
const age = user.age;

// ✅ With object destructuring
const { name, age, course } = user;
console.log(name);   // "Alice"
console.log(course); // "React"

// Rename while destructuring
const { name: studentName, age: studentAge } = user;

// Default values
const { grade = "A" } = user; // grade = "A" (not in object)

// Nested destructuring
const { address: { city, zip } } = user;`} />
            )}
            {destMode === 'props' && (
              <CodeBlock title="Destructuring in React Props" code={`// Without destructuring — verbose
function Card(props) {
  return <h1>{props.title}</h1>;
}

// ✅ With destructuring — clean and readable
function Card({ title, subtitle, isActive }) {
  return (
    <div className={isActive ? "active" : ""}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

// Destructuring with defaults in props
function Button({ label = "Click me", color = "blue" }) {
  return <button style={{ color }}>{label}</button>;
}

// ✅ Used everywhere in React — hooks, props, context
const { data, loading, error } = useFetch("/api/posts");`} />
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('spread_rest')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. SPREAD & REST ─────────────────────────────────────────────── */}
      {activeTab === 'spread_rest' && (
        <Section key="s4" eyebrow="Module 04 • JS Essentials" title="Spread & Rest Operator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#1d4ed8', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: 6 }}><Code size={16}/> Spread Operator (…)</h4>
                <p style={{ fontSize: '0.88rem', color: '#1e40af', margin: 0, lineHeight: 1.6 }}>
                  <strong>Expands</strong> an array or object into individual elements. Used for copying, merging, and immutable state updates in React.
                </p>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#166534', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: 6 }}><Layers size={16}/> Rest Parameter (…)</h4>
                <p style={{ fontSize: '0.88rem', color: '#14532d', margin: 0, lineHeight: 1.6 }}>
                  <strong>Collects</strong> multiple function arguments into a single array. Appears in function parameter lists.
                </p>
              </div>
            </div>

            <CodeBlock title="spread-rest.js" code={`/* ── SPREAD: expand ── */
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Merge arrays (creates a new array — immutable!)
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Copy array (not a reference — safe for React state!)
const copy = [...arr1]; // [1, 2, 3]

// Add item without mutation (React pattern)
const withNew = [...arr1, 7]; // [1, 2, 3, 7]

// Spread objects
const user = { name: "Alice", age: 22 };
const updated = { ...user, age: 23 }; // { name: "Alice", age: 23 }

// ✅ React useState update pattern:
setUser(prev => ({ ...prev, age: 23 }));


/* ── REST: collect ── */
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// First param explicit, rest collected
function log(first, ...others) {
  console.log("First:", first, "Rest:", others);
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🧩 Spread Immutability Visualizer</h4>
            <p>Click "Add Item" to see the spread operator create a new array each time — the original is never mutated (critical for React state).</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div>
                <button className="btn btn-primary" onClick={spreadAdd} style={{ background: '#3b82f6', borderColor: '#3b82f6', width: '100%', marginBottom: '1rem' }}>
                  <Plus size={14} /> Add Item (spread + append)
                </button>
                <div style={{ background: '#0f172a', borderRadius: 8, padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#86efac' }}>
                  Current: [{spreadArr.join(', ')}]
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.78rem', display: 'block', marginBottom: '6px' }}>Operation log:</span>
                {spreadLog.length === 0 ? (
                  <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '0.75rem', fontStyle: 'italic' }}>Click Add Item…</span>
                ) : spreadLog.map((l, i) => (
                  <div key={i} style={{ color: '#a5d6ff', fontFamily: 'monospace', fontSize: '0.75rem', padding: '2px 0' }}>{l}</div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('template_literals')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. TEMPLATE LITERALS ─────────────────────────────────────────── */}
      {activeTab === 'template_literals' && (
        <Section key="s5" eyebrow="Module 05 • JS Essentials" title="Template Literals">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Template literals use <strong>backticks</strong> (`) instead of quotes to allow embedded expressions, multi-line strings, and clean string formatting — replacing messy string concatenation.</p>

            <CodeBlock title="template-literals.js" code={
'// Old way — string concatenation\n' +
'const greeting = "Hello, " + name + "! You are " + age + " years old.";\n' +
'\n' +
'// With template literal — clean and readable\n' +
'const greeting = `Hello, ${name}! You are ${age} years old.`;\n' +
'\n' +
'// Any JavaScript expression inside ${}\n' +
'const total = `Total: ${price * quantity} INR`;\n' +
'const status = `Status: ${user.isActive ? "Online" : "Offline"}`;\n' +
'\n' +
'// Multi-line strings (no \\n needed)\n' +
'const html = `\n' +
'  <div class="card">\n' +
'    <h1>${title}</h1>\n' +
'    <p>${description}</p>\n' +
'  </div>\n' +
'`;\n' +
'\n' +
'// React dynamic className\n' +
'const className = `btn ${isActive ? "btn-active" : "btn-inactive"}`;\n' +
'\n' +
'// React dynamic API URLs\n' +
'const url = `https://api.example.com/users/${userId}/posts`;'
} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>✏️ Live Template Literal Builder</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Name</label>
                  <input className="form-control" value={tlName} onChange={e => setTlName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Course</label>
                  <input className="form-control" value={tlCourse} onChange={e => setTlCourse(e.target.value)} />
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1.25rem' }}>
                <span style={{ color: '#8892b0', fontFamily: 'monospace', fontSize: '0.78rem', display: 'block', marginBottom: '6px' }}>{'// Output:'}</span>
                <span style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  Hello, {tlName}!<br />
                  Welcome to the {tlCourse} course.<br />
                  Profile URL: /students/{tlName.toLowerCase().replace(/ /g, '-')}
                </span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('array_methods')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. ARRAY METHODS ─────────────────────────────────────────────── */}
      {activeTab === 'array_methods' && (
        <Section key="s6" eyebrow="Module 06 • JS Essentials" title="Array Methods: map, filter, reduce, find">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>These four array methods are the <strong>most-used tools in React</strong> — <code>map()</code> renders lists, <code>filter()</code> handles search/deletion, <code>find()</code> locates items, and <code>reduce()</code> computes derived values.</p>

            <CodeBlock title="array-methods.js" code={`const students = [
  { id: 1, name: "Alice", score: 88 },
  { id: 2, name: "Bob",   score: 54 },
  { id: 3, name: "Carol", score: 92 },
];

// map() — transform every element → new array (same length)
const names = students.map(s => s.name); // ["Alice", "Bob", "Carol"]

// ✅ React list rendering:
students.map(s => <li key={s.id}>{s.name}: {s.score}</li>)

// filter() — keep elements matching condition → new array
const passed = students.filter(s => s.score >= 60); // Alice, Carol

// ✅ React delete pattern:
setItems(items.filter(item => item.id !== deletedId));

// find() — return FIRST match (or undefined)
const topStudent = students.find(s => s.score >= 90); // Carol

// reduce() — accumulate into single value
const total = students.reduce((sum, s) => sum + s.score, 0); // 234
const average = total / students.length; // 78`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🔬 Array Method Playground</h4>
            <p>Select a method to see it applied to the student dataset below:</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {['map', 'filter', 'reduce', 'find'].map(m => (
                <button key={m} onClick={() => setArrMethod(m)}
                  style={{ padding: '8px 22px', borderRadius: 8, border: '1.5px solid #6366f1', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem',
                    background: arrMethod === m ? '#6366f1' : 'white', color: arrMethod === m ? 'white' : '#6366f1', transition: 'all 0.15s' }}>
                  .{m}()
                </button>
              ))}
            </div>

            <div style={{ background: '#0f172a', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.82rem' }}>
              {arrMethod === 'map' && <span style={{ color: '#a5d6ff' }}>students.map(s =&gt; {`({ ...s, grade: s.score >= 80 ? "A" : s.score >= 60 ? "B" : "C" })`})</span>}
              {arrMethod === 'filter' && <span style={{ color: '#a5d6ff' }}>students.filter(s =&gt; s.score &gt;= 60)</span>}
              {arrMethod === 'reduce' && <span style={{ color: '#a5d6ff' }}>students.reduce((sum, s) =&gt; sum + s.score, 0)</span>}
              {arrMethod === 'find' && <span style={{ color: '#a5d6ff' }}>students.find(s =&gt; s.score &gt;= 90)</span>}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    {['ID', 'Name', 'Age', 'Score', 'Result'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#374151', borderBottom: '1px solid #cbd5e1' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {arrResults[arrMethod].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '10px 14px' }}>{row.id ?? '—'}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 600 }}>{row.name}</td>
                      <td style={{ padding: '10px 14px' }}>{row.age ?? '—'}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ background: row.score >= 80 ? '#dcfce7' : row.score >= 60 ? '#fef3c7' : '#fee2e2', color: row.score >= 80 ? '#166534' : row.score >= 60 ? '#92400e' : '#991b1b', padding: '2px 8px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 600 }}>
                          {row.score ?? '—'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#6366f1' }}>{row._result ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('short_circuit')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. SHORT-CIRCUIT & TERNARY ───────────────────────────────────── */}
      {activeTab === 'short_circuit' && (
        <Section key="s7" eyebrow="Module 07 • JS Essentials" title="Short-circuit & Ternary Operator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>These two patterns control <strong>what React renders based on conditions</strong>. They're the building blocks of conditional rendering in JSX.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#1d4ed8', margin: '0 0 0.5rem' }}>⚡ && Short-circuit</h4>
                <p style={{ fontSize: '0.87rem', margin: 0, color: '#1e40af', lineHeight: 1.6 }}>
                  <code>A && B</code> — if A is truthy, returns B. If A is falsy, stops and returns A.<br/><br/>
                  <strong>React use:</strong> render something <em>only when</em> a condition is true.
                </p>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#166534', margin: '0 0 0.5rem' }}>❓ Ternary Operator</h4>
                <p style={{ fontSize: '0.87rem', margin: 0, color: '#14532d', lineHeight: 1.6 }}>
                  <code>condition ? A : B</code> — returns A if true, B if false.<br/><br/>
                  <strong>React use:</strong> render one of <em>two things</em> based on a condition.
                </p>
              </div>
            </div>

            <CodeBlock title="conditional-rendering.jsx" code={`// ✅ && short-circuit — render only when condition is true
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Renders Dashboard only when isLoggedIn is true */}
      {isLoggedIn && <Dashboard />}

      {/* ⚠️ Gotcha! count is 0 (falsy) → React renders "0" not nothing! */}
      {count && <span>Items: {count}</span>}
      {/* Fix: use explicit boolean */}
      {count > 0 && <span>Items: {count}</span>}

      {/* ✅ Ternary — renders one of two things */}
      {isLoggedIn ? <UserProfile /> : <LoginPage />}

      {/* Inline ternary for text/class */}
      <p>Status: {isLoggedIn ? "Online" : "Offline"}</p>
    </div>
  );
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🔴 Live Conditional Renderer</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn btn-outline" onClick={() => setIsLoggedIn(v => !v)}
                  style={{ borderColor: isLoggedIn ? '#10b981' : '#ef4444', color: isLoggedIn ? '#10b981' : '#ef4444' }}>
                  {isLoggedIn ? '✅ isLoggedIn = true' : '❌ isLoggedIn = false'} (click to toggle)
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="btn btn-outline" onClick={() => setCount2(c => Math.max(0, c - 1))} style={{ width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', flex: 1, textAlign: 'center' }}>count = {count2}</span>
                  <button className="btn btn-outline" onClick={() => setCount2(c => c + 1)} style={{ width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem' }}>{'// JSX render result:'}</span>
                <span style={{ color: '#86efac' }}>{isLoggedIn ? '▶ <Dashboard />' : '⏸ null (not rendered)'}</span>
                <span style={{ color: '#fbbf24' }}>count {'&&'} → {count2 === 0 ? '"0" rendered! (bug)' : `<Items count=${count2} />`}</span>
                <span style={{ color: '#a5d6ff' }}>{isLoggedIn ? '▶ <UserProfile />' : '▶ <LoginPage />'}</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('modules_import')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 8. MODULES / IMPORT EXPORT ───────────────────────────────────── */}
      {activeTab === 'modules_import' && (
        <Section key="s8" eyebrow="Module 08 • JS Essentials" title="Modules: import & export">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>ES Modules let you split code into reusable files. React's entire component system is built on this — every component file uses <code>export</code> and every consumer uses <code>import</code>.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ color: '#7c3aed', margin: '0 0 0.5rem' }}>📤 Exports</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#6d28d9', lineHeight: 1.8 }}>
                  <li><strong>Named export:</strong> <code>export const x</code> or <code>export function f</code></li>
                  <li><strong>Default export:</strong> <code>export default Component</code></li>
                  <li>One file = one default + many named</li>
                </ul>
              </div>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ color: '#065f46', margin: '0 0 0.5rem' }}>📥 Imports</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#047857', lineHeight: 1.8 }}>
                  <li><strong>Named import:</strong> <code>{`import { x } from './file'`}</code></li>
                  <li><strong>Default import:</strong> <code>import App from './App'</code></li>
                  <li><strong>Alias:</strong> <code>{`import { x as y } from './file'`}</code></li>
                </ul>
              </div>
            </div>

            <CodeBlock title="mathUtils.js — Named Exports" code={`// mathUtils.js — multiple named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14159;

// mathUtils.js — also works like this:
const multiply = (a, b) => a * b;
export { multiply };`} />

            <CodeBlock title="App.jsx — Importing" code={`// Importing named exports — must use exact names in {}
import { add, subtract, PI } from './mathUtils';

// Importing with alias — rename on import
import { add as sum } from './mathUtils';

// Importing all named exports as a namespace
import * as MathUtils from './mathUtils';
MathUtils.add(1, 2);

// Default export — single value per file
export default function App() { return <div>App</div>; }
// or: export default App;

// Importing default — no curly braces, any name allowed
import App from './App';
import MyApp from './App'; // same thing, different alias

// ✅ React component files always use default export
import React, { useState, useEffect } from 'react'; // mixed!`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Take the Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'js_quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="JS Essentials Quiz">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {questions.map((item, qi) => (
                <div key={item.k} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const selected = qAns[item.k] === oi;
                      const correct = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1';
                      if (qDone) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0ea5e9'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: 150 }}>
                    Submit Answers
                  </button>
                ) : (
                  <>
                    <button className="btn btn-outline" onClick={() => { setQAns({}); setQDone(false); }} style={{ minWidth: 150 }}>Retry Quiz</button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: score === questions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {score} / {questions.length} ({Math.round(score / questions.length * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENT ───────────────────────────────────────────────────── */}
      {activeTab === 'js_assignment' && (
        <Section key="asgn" eyebrow="Practice" title="JS Essentials Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 JS Essentials Complete!</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                You've covered the core JavaScript features that power every React app: var/let/const, arrow functions, destructuring, spread/rest, template literals, array methods, conditional operators, and ES modules. Now put them into practice!
              </p>
            </div>

            {[
              { num: 1, icon: '📦', title: 'Variable Declaration Practice', desc: 'Refactor a given code snippet (provided by your instructor) to replace all var declarations with appropriate let or const. Add a comment explaining why you chose each one.', hint: 'Use const for values that never change (e.g. API URLs, config), let for values that will be reassigned (e.g. loop counters, state holders).' },
              { num: 2, icon: '🗂️', title: 'Array Method Pipeline', desc: 'Given an array of 10 student objects (with name, age, score), write a pipeline using map(), filter(), and reduce() to: (1) filter students who scored above 60, (2) add a "grade" field, (3) calculate the class average.', hint: 'Chain methods: students.filter(...).map(...) then use reduce separately for the average.' },
              { num: 3, icon: '📤', title: 'ES Modules Structure', desc: 'Create two JavaScript files: utils.js (with at least 3 named exports: add, formatName, and calculateGrade) and main.js (that imports and uses all three). Write your answer as code blocks.', hint: 'export const add = (a,b) => a + b; then import { add, formatName, calculateGrade } from "./utils";' },
            ].map(task => (
              <div key={task.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', color: 'white', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{task.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>Task {task.num}: {task.title}</h4>
                    <p style={{ fontSize: '0.92rem', color: '#475569', margin: '0 0 0.75rem' }}>{task.desc}</p>
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 12px', fontSize: '0.83rem', color: '#1d4ed8' }}>
                      💡 Hint: {task.hint}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
              <BookOpenCheck size={36} color="#f59e0b" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Ready for React Day 1!</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Complete these tasks and you'll be fully prepared to write React components with confidence.</p>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
