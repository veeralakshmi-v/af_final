import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, CheckCircle, Code, ArrowRight,
  Copy, FileText, Plus, AlertTriangle, BookOpenCheck, X, Sliders, Play, RotateCcw, Award, Sparkles, Flame
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

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

// Memoized child component for useCallback demonstration
const ChildComponent = React.memo(({ title, onClick, renderLogs }) => {
  renderLogs(title);
  return (
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0' }}>
      <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{title}</span>
      <button className="btn btn-outline" onClick={onClick} style={{ padding: '4px 10px', fontSize: '0.78rem' }}>Trigger Callback</button>
    </div>
  );
});
ChildComponent.displayName = 'ChildComponent';

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay12({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('react_module12', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Section 1: useRef ── */
  const inputRef = useRef(null);
  const refCounter = useRef(0);
  const [stateCounter, setStateCounter] = useState(0);
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  const incrementRef = () => {
    refCounter.current += 1;
  };

  /* ── Section 2: useMemo ── */
  const [memoNumber, setMemoNumber] = useState(30);
  const [memoState, setMemoState] = useState('');
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  const calculateFactorial = (num) => {
    // Artificial heavy computational stress loop
    let i = 0;
    while (i < 8000000) { i++; }
    if (num <= 0) return 1;
    return num * calculateFactorial(num - 1);
  };

  const factorialResult = useMemo(() => {
    if (useMemoEnabled) {
      return calculateFactorial(Math.min(memoNumber, 35));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoNumber, useMemoEnabled]);

  const rawFactorialResult = useMemoEnabled ? factorialResult : calculateFactorial(Math.min(memoNumber, 35));

  /* ── Section 3: useCallback ── */
  const [parentCount, setParentCount] = useState(0);
  const [callbackLogs, setCallbackLogs] = useState([]);

  const logRender = (componentName) => {
    // Pushes log showing component rendered
    useEffect(() => {
      setCallbackLogs(p => [...p, `Child rendered at ${new Date().toLocaleTimeString()}`].slice(-4));
    });
  };

  const handleStandardCallback = () => {
    // Normal function rebuilds every render
  };

  const handleMemoizedCallback = useCallback(() => {
    // Memoized callback function stays unchanged
  }, []);

  /* ── Section 4: Custom Hooks ── */
  const [hookValue, setHookValue] = useState('Type to save...');
  const [saveStatus, setSaveStatus] = useState('Saved to localStorage');
  useEffect(() => {
    setSaveStatus('Saving...');
    const id = setTimeout(() => setSaveStatus('Saved to localStorage (Simulated)'), 500);
    return () => clearTimeout(id);
  }, [hookValue]);

  /* ── Capstone Task: Form Focus + Optimized List Component ── */
  const capstoneInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentScoreThreshold, setStudentScoreThreshold] = useState(60);
  const [capstoneStudents, setCapstoneStudents] = useState([
    { id: 1, name: 'Alice Johnson', score: 92 },
    { id: 2, name: 'Bob Smith', score: 78 },
    { id: 3, name: 'Carol White', score: 95 },
    { id: 4, name: 'Dave Brown', score: 55 },
    { id: 5, name: 'Eve Davis', score: 80 },
    { id: 6, name: 'Frank Miller', score: 48 }
  ]);
  const [capstoneRenderLog, setCapstoneRenderLog] = useState([]);

  // Focus action
  const focusCapstoneInput = () => {
    if (capstoneInputRef.current) capstoneInputRef.current.focus();
  };

  // 1. useMemo for filtering students list (expensive computation simulation)
  const filteredStudents = useMemo(() => {
    setCapstoneRenderLog(p => [...p, '⚙️ Recalculated students list (useMemo)'].slice(-4));
    return capstoneStudents.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      s.score >= studentScoreThreshold
    );
  }, [capstoneStudents, searchTerm, studentScoreThreshold]);

  // 2. useCallback to memoize student deletion action
  const handleDeleteStudent = useCallback((id) => {
    setCapstoneStudents(p => p.filter(s => s.id !== id));
  }, []);

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'Which hook should you use to store a mutable value that does NOT trigger a re-render when changed?',
      opts: ['useState', 'useRef', 'useMemo', 'useEffect'], ans: 1,
      exp: 'useRef returns a mutable ref object whose .current property can be updated without triggering a component re-render.' },
    { k: 'q2', q: 'What is the primary benefit of useMemo?',
      opts: [
        'To create references to DOM nodes',
        'To optimize performance by caching the result of expensive calculations so they don\'t run on every render',
        'To fetch data asynchronously',
        'To prevent callback functions from being re-created'
      ], ans: 1,
      exp: 'useMemo caches (memoizes) the return value of a computation. It only re-calculates when one of its dependencies changes.' },
    { k: 'q3', q: 'How does useCallback differ from useMemo?',
      opts: [
        'useCallback returns a memoized callback function; useMemo returns a memoized value',
        'useCallback does not take a dependency array',
        'useCallback is used for DOM queries',
        'There is no difference — they are completely identical'
      ], ans: 0,
      exp: 'useCallback(fn, deps) is shorthand for useMemo(() => fn, deps). It caches the function definition itself to prevent unnecessary recreation.' },
    { k: 'q4', q: 'What is a custom hook in React?',
      opts: [
        'A hook imported from a third-party styling library like Tailwind',
        'A custom JavaScript function whose name starts with "use" and that can call other React hooks',
        'A hook that can only be written in class components',
        'A hook that doesn\'t trigger component re-renders'
      ], ans: 1,
      exp: 'Custom hooks are normal JavaScript functions that start with the prefix "use" (e.g. useFetch) and encapsulate reusable stateful hook logic.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. useRef HOOK ──────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 12" title="The useRef Hook">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>📦 What is useRef?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                The <code>useRef</code> hook does two main things: (1) Reference DOM elements directly (like focusing input elements or scrolling), and (2) Keep mutable values that persist across renders <strong>without triggering a re-render</strong> when they change.
              </p>
            </div>

            <CodeBlock title="useRef examples" code={`import { useRef, useState } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Focus the input element directly using DOM reference
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

// ── Storing persistent values without rendering ──
function RenderCounter() {
  const renderCount = useRef(0);
  renderCount.current += 1; // updates count, does NOT cause render!
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🧪 Live useRef Lab</h4>
            <p>Compare how updating <strong>Ref count</strong> (mutable ref) differs from updating <strong>State count</strong> (triggers component refresh):</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-primary" onClick={incrementRef} style={{ flex: 1, background: '#6366f1', borderColor: '#6366f1' }}>
                    Increment Ref count
                  </button>
                  <button className="btn btn-outline" onClick={() => setStateCounter(c => c + 1)} style={{ flex: 1 }}>
                    Increment State: {stateCounter}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input ref={inputRef} className="form-control" placeholder="Input element to focus..." style={{ flex: 1 }} />
                  <button className="btn btn-outline" onClick={focusInput} style={{ borderColor: '#6366f1', color: '#6366f1' }}>Focus Input</button>
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 6 }}>Counters Inspector:</span>
                <div style={{ color: 'white', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                  refCounter.current = <span style={{ color: '#86efac', fontWeight: 'bold' }}>{refCounter.current}</span>
                  <br />
                  stateCounter = <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{stateCounter}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 8, fontStyle: 'italic' }}>
                  * Notice how updating the Ref count does not update the screen until you trigger a state update.
                </span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. useMemo HOOK ─────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 12" title="The useMemo Hook">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#166534' }}>💡 Performance Optimization</strong>
              <p style={{ margin: '4px 0 0', color: '#14532d', fontSize: '0.9rem' }}>
                <code>useMemo</code> caches (memoizes) the return value of an expensive calculation. It prevents running computational overheads on every component refresh unless its dependencies change.
              </p>
            </div>

            <CodeBlock title="useMemo syntax" code={`import { useMemo, useState } from "react";

function Calculator({ numbers }) {
  const [query, setQuery] = useState("");

  // Caches calculation results — only re-runs when "numbers" array changes
  const computedSum = useMemo(() => {
    console.log("Computing expensive sum...");
    return numbers.reduce((sum, val) => sum + val, 0);
  }, [numbers]); // <-- only recalculates when numbers change

  return <div>Sum: {computedSum}</div>;
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>⚡ Performance Memoization Simulator</h4>
            <p>Toggle useMemo to compare calculation delay speeds when typing unrelated states:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Factorial parameter (triggers computational lag):</label>
                  <input className="form-control" type="number" min={5} max={35} value={memoNumber} onChange={e => setMemoNumber(Math.min(35, Math.max(1, +e.target.value)))} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Unrelated typing state (normally causes re-evaluation lag):</label>
                  <input className="form-control" placeholder="Type here..." value={memoState} onChange={e => setMemoState(e.target.value)} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}>
                  <input type="checkbox" checked={useMemoEnabled} onChange={e => setUseMemoEnabled(e.target.checked)} />
                  Enable useMemo Optimization
                </label>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>Computation Output:</span>
                <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                  Result: <strong style={{ color: '#fbbf24' }}>{rawFactorialResult?.toLocaleString() || 'Calculating...'}</strong>
                </span>
                <div style={{ borderTop: '1px solid #1e293b', marginTop: 10, paddingTop: 10, fontSize: '0.72rem', color: '#94a3b8' }}>
                  Optimization: <strong style={{ color: useMemoEnabled ? '#10b981' : '#ef4444' }}>{useMemoEnabled ? 'MEMOIZED (Fast)' : 'UNOPTIMIZED (Slow)'}</strong>
                  <br />
                  <span style={{ color: '#64748b' }}>* Typing with unoptimized useMemo introduces loops lag on every stroke.</span>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('multiple_states')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. useCallback HOOK ─────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 12" title="The useCallback Hook">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p><code>useCallback</code> caches the <strong>function definition itself</strong> between renders. It is used alongside <code>React.memo</code> to prevent child components from re-rendering when parent callbacks re-create.</p>

            <CodeBlock title="useCallback usage pattern" code={`import { useCallback, useState } from "react";

// Child element wrapped in React.memo (renders only if props change)
const ListItem = React.memo(({ item, onDelete }) => {
  console.log("ListItem Rendered:", item.name);
  return <button onClick={() => onDelete(item.id)}>Delete</button>;
});

function Container() {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);

  // useCallback keeps the reference to this function identical
  // so the onDelete prop passed to child items doesn't trigger re-renders
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []); // <-- empty array = function reference never changes
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>⏱ Child Re-render Tracer</h4>
            <p>Toggle parent states and observe child render updates. In a standard setup, children refresh on all parent updates.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div>
                <button className="btn btn-primary" onClick={() => setParentCount(c => c + 1)} style={{ width: '100%', marginBottom: '1rem', background: '#6366f1', borderColor: '#6366f1' }}>
                  Force Parent Re-render (Count: {parentCount})
                </button>
                <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 8 }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: 4 }}>Child Component:</span>
                  <ChildComponent title="Memoized Child" onClick={parentCount % 2 === 0 ? handleMemoizedCallback : handleStandardCallback} renderLogs={logRender} />
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 6 }}>Render Logs:</span>
                {callbackLogs.map((l, i) => (
                  <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#86efac', padding: '2px 0' }}>{l}</div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. CUSTOM HOOKS ─────────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Module 04 • Day 12" title="Custom Hooks">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Custom hooks are JavaScript functions that start with <code>"use"</code>. They allow you to extract stateful component logic into reusable functions, keeping components clean and focused.</p>

            <CodeBlock title="custom hook implementation" code={`import { useState, useEffect } from "react";

// ── Custom hook for synchronizing state to localStorage ──
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

// ── In consumer component ──
function UserProfile() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  // Works exactly like useState but auto-saves to LocalStorage!
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>📦 Custom Hook Simulator</h4>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Sync key values input:</label>
                <input className="form-control" value={hookValue} onChange={e => setHookValue(e.target.value)} />
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>Localstorage Sync engine:</span>
                <span style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '0.82rem' }}>{saveStatus}</span>
                <div style={{ marginTop: 8, color: '#94a3b8', fontSize: '0.76rem', fontFamily: 'monospace' }}>
                  key: "custom_input"<br />
                  val: "{hookValue}"
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. HOOK CHEAT SHEET ─────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="s5" eyebrow="Module 05 • Day 12" title="When to use which hook">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    {['Hook', 'Primary Purpose', 'Common Use Case', 'Performance Impact'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#374151', borderBottom: '1px solid #cbd5e1' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'useState', purpose: 'Track component state values', use: 'Form inputs, toggle modals, data lists', impact: 'Triggers re-render on change', color: '#6366f1' },
                    { name: 'useEffect', purpose: 'Run side-effects dynamically', use: 'API data fetches, starting intervals', impact: 'Runs asynchronously after render', color: '#10b981' },
                    { name: 'useRef', purpose: 'DOM queries or persist variables', use: 'Focusing inputs, tracking render count', impact: 'Zero re-renders on value updates', color: '#8b5cf6' },
                    { name: 'useMemo', purpose: 'Memoize calculation outputs', use: 'Filtering lists, sorting computations', impact: 'Caches results to speed renders', color: '#f59e0b' },
                    { name: 'useCallback', purpose: 'Memoize function references', use: 'Passing callbacks to memoized children', impact: 'Prevents parent recreation loops', color: '#0ea5e9' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 800, fontFamily: 'monospace', color: row.color }}>{row.name}</td>
                      <td style={{ padding: '10px 14px' }}>{row.purpose}</td>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>{row.use}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 600 }}>{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Capstone Task <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. CAPSTONE TASK: OPTIMIZED COMPONENT & FORM FOCUS ─────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="s6" eyebrow="Capstone Task • Day 12" title="Form Focus & Optimized List Component">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, color: 'white', margin: '0 0 0.4rem', fontSize: '1.2rem' }}>🎓 Form Focus & Optimized Component</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Combining useRef DOM focus controls, useMemo array filtering optimizations, and useCallback actions to prevent child updates.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
              <div>
                {/* Search Form */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
                  <h5 style={{ margin: '0 0 10px', fontWeight: 800, color: '#0f172a' }}>Filter Controls</h5>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input ref={capstoneInputRef} className="form-control" placeholder="Search students by name..." value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)} style={{ fontSize: '0.88rem' }} />
                    </div>
                    <button className="btn btn-outline" onClick={focusCapstoneInput} style={{ borderColor: '#6366f1', color: '#6366f1', fontSize: '0.8rem', fontWeight: 700 }}>
                      Focus Input
                    </button>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Minimum Score Threshold: {studentScoreThreshold}</label>
                    <input type="range" min={0} max={100} value={studentScoreThreshold} onChange={e => setStudentScoreThreshold(+e.target.value)} style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Students list */}
                <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1', padding: '10px 14px', fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                    Student Records ({filteredStudents.length} matches)
                  </div>
                  <div style={{ padding: '0.5rem' }}>
                    {filteredStudents.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.88rem' }}>No student records found</div>
                    ) : filteredStudents.map(s => (
                      <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
                        <div>
                          <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{s.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b' }}>Score: {s.score}/100</span>
                        </div>
                        <button className="btn btn-outline" onClick={() => handleDeleteStudent(s.id)}
                          style={{ borderColor: '#ef4444', color: '#ef4444', padding: '4px 8px', fontSize: '0.76rem' }}>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Render tracer logger */}
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Optimization logs:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                  {capstoneRenderLog.map((log, i) => (
                    <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#86efac', padding: '3px 0', borderBottom: '1px solid #1e293b' }}>
                      {log}
                    </div>
                  ))}
                  {capstoneStudents.length === 0 && (
                    <div style={{ color: '#fbbf24', fontSize: '0.8rem', fontStyle: 'italic', marginTop: 10 }}>All students deleted. Click reset below to load initial data.</div>
                  )}
                </div>
                <button className="btn btn-outline" onClick={() => setCapstoneStudents([...INITIAL_STUDENTS.slice(0, 6)])}
                  style={{ width: '100%', marginTop: 'auto', borderColor: '#475569', color: '#94a3b8', fontSize: '0.8rem' }}>
                  Reset Students list
                </button>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 12 Quiz — Advanced Hooks">
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENT ───────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Homework" title="Day 12 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 Day 12 Complete!</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                You've completed Advanced Hooks optimization patterns including: useRef references, useMemo values caching, useCallback method bindings, and custom hooks.
              </p>
            </div>

            {[
              { num: 1, icon: '🔍', title: 'Focus on field load', desc: 'Create a component that automatically focuses the first input field on load, and contains an "Add Item" button that focuses the input field again after submission.', hint: 'Use `useRef` and trigger `.focus()` in a useEffect on mount.' },
              { num: 2, icon: '💾', title: 'Custom useFetch Hook', desc: 'Create a custom hook called useFetch that accepts a URL, fetches data, handles loading and error states, and returns all three values.', hint: 'Use useState and useEffect inside a function that starts with use.' },
              { num: 3, icon: '⚙️', title: 'Optimized Sort list', desc: 'Build a component that sorts a list of 1000 items. Implement useMemo to only perform the sort when the sort criteria changes, preventing lags.', hint: 'Dependency array should be: [items, sortCriteria].' },
            ].map(task => (
              <div key={task.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{task.icon}</div>
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
              <BookOpenCheck size={36} color="#6366f1" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Complete Assignments</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save all updates. Run and push codes to your personal repo to complete this module.</p>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
