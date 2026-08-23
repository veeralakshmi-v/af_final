import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, Sparkles, RefreshCw, CheckCircle, Code,
  ArrowRight, Info, Copy, FileText, Plus, AlertTriangle, BookOpenCheck,
  Sliders, GitBranch, Bell, Activity, Play, Pause, RotateCcw, Zap,
  Clock, Timer, Wifi, WifiOff, Server, List, Hash
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
  h = h.replace(/(?<!=)(["'])(?:\\.|[^\n"'\\])*?\1/g, '<span style="color:#a5d6ff">$&</span>');
  h = h.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color:#8892b0">$1</span>');
  ['const','let','var','return','import','export','default','function','from','if','else','async','await'].forEach(k => {
    h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#ff7b72;font-weight:bold">$1</span>');
  });
  ['useState','useEffect','useRef'].forEach(k => {
    h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#d18616;font-weight:bold">$1</span>');
  });
  return <span dangerouslySetInnerHTML={{ __html: h }} />;
};

const CodeBlock = ({ title, code }) => {
  const [cp, setCp] = useState(false);
  return (
    <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', margin: '1.5rem 0', overflowX: 'auto' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <button onClick={() => { navigator.clipboard.writeText(code); setCp(true); setTimeout(() => setCp(false), 2000); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Copy size={12} /> {cp ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.55, whiteSpace: 'pre' }}>
        <code>{hlJS(code)}</code>
      </pre>
    </div>
  );
};

const LogEntry = ({ text, type = 'info', idx }) => {
  const colors = { effect: '#86efac', render: '#38bdf8', cleanup: '#fbbf24', error: '#fca5a5', info: '#cbd5e1' };
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
      style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: colors[type], borderBottom: '1px solid #1e293b', padding: '4px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ color: '#475569', minWidth: 20, textAlign: 'right' }}>{idx + 1}</span>
      <span>{text}</span>
    </motion.div>
  );
};

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay9({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('react_module9', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Section 1: What is useEffect – render log demo ── */
  const [s1Count, setS1Count] = useState(0);
  const [s1Logs, setS1Logs] = useState([{ text: '🟢 Component mounted', type: 'render' }]);
  useEffect(() => {
    if (activeTab !== 'intro_react') return;
    setS1Logs(prev => [...prev, { text: `⚡ useEffect ran (count is now ${s1Count})`, type: 'effect' }].slice(-8));
  }, [s1Count, activeTab]);

  /* ── Section 2: No dependency array – runs every render ── */
  const [s2Items, setS2Items] = useState(['React', 'Hooks']);
  const [s2Logs, setS2Logs] = useState([]);
  const s2Ref = useRef(false);
  useEffect(() => {
    if (activeTab !== 'useState_hook') return;
    if (!s2Ref.current) { s2Ref.current = true; return; }
    setS2Logs(prev => [...prev, { text: `🔄 Effect ran (items count = ${s2Items.length})`, type: 'effect' }].slice(-6));
  });

  /* ── Section 3: Empty [] – runs once ── */
  const [s3Mounted, setS3Mounted] = useState(false);
  const [s3Log, setS3Log] = useState('⏸ Component not mounted yet');
  const [s3Count, setS3Count] = useState(0);
  useEffect(() => {
    if (activeTab !== 'multiple_states' || !s3Mounted) return;
    setS3Log('✅ useEffect ran ONCE on mount. Will not run again.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s3Mounted]);

  /* ── Section 4: Specific dependency ── */
  const [s4A, setS4A] = useState(0);
  const [s4B, setS4B] = useState(0);
  const [s4Watch, setS4Watch] = useState('A');
  const [s4Logs, setS4Logs] = useState([]);
  const s4Dep = s4Watch === 'A' ? s4A : s4B;
  useEffect(() => {
    if (activeTab !== 'object_state') return;
    setS4Logs(prev => [...prev, { text: `⚡ Effect fired! Watched value (${s4Watch}) changed to ${s4Dep}`, type: 'effect' }].slice(-6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s4Dep, activeTab]);

  /* ── Section 5: Cleanup – timer ── */
  const [s5Running, setS5Running] = useState(false);
  const [s5Tick, setS5Tick] = useState(0);
  const [s5Logs, setS5Logs] = useState([{ text: '⏸ Timer not started', type: 'info' }]);
  useEffect(() => {
    if (activeTab !== 'nested_state') return;
    if (!s5Running) return;
    setS5Logs(prev => [...prev, { text: '▶ setInterval started (cleanup will clearInterval on unmount)', type: 'effect' }].slice(-8));
    const id = setInterval(() => {
      setS5Tick(t => t + 1);
      setS5Logs(prev => [...prev, { text: `⏱ tick fired`, type: 'render' }].slice(-8));
    }, 1000);
    return () => {
      clearInterval(id);
      setS5Logs(prev => [...prev, { text: '🧹 Cleanup: clearInterval() called — memory leak prevented!', type: 'cleanup' }].slice(-8));
    };
  }, [s5Running, activeTab]);

  /* ── Section 6: API fetch pattern ── */
  const [s6State, setS6State] = useState('idle'); // idle | loading | success | error
  const [s6Posts, setS6Posts] = useState([]);
  const MOCK_POSTS = [
    { id: 1, title: 'Introduction to React Hooks' },
    { id: 2, title: 'Understanding useEffect Lifecycle' },
    { id: 3, title: 'State Management Patterns' },
    { id: 4, title: 'Building Custom Hooks' },
  ];
  const fetchPosts = () => {
    setS6State('loading');
    setS6Posts([]);
    setTimeout(() => setS6State('success'), 1500);
  };
  const fetchError = () => {
    setS6State('loading');
    setTimeout(() => setS6State('error'), 1500);
  };
  useEffect(() => {
    if (s6State === 'success') setS6Posts(MOCK_POSTS);
  }, [s6State]);

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1', q: 'What does useEffect with NO dependency array do?',
      opts: ['Runs once on mount only', 'Runs after every render (mount + every update)', 'Never runs', 'Runs only on unmount'],
      ans: 1, exp: 'Without a dependency array, useEffect runs after the initial render AND after every subsequent re-render.'
    },
    {
      k: 'q2', q: 'What does useEffect(() => { ... }, []) do (empty array)?',
      opts: ['Runs after every render', 'Runs on every state change', 'Runs exactly once — after the initial mount only', 'Causes infinite loops'],
      ans: 2, exp: 'An empty dependency array [] tells React this effect has no dependencies, so it only runs once after the first render (like componentDidMount).'
    },
    {
      k: 'q3', q: 'What is the purpose of the cleanup function returned from useEffect?',
      opts: [
        'To reset all state variables',
        'To prevent memory leaks by clearing timers, subscriptions, or listeners when the component unmounts or before the effect re-runs',
        'To re-fetch data on every click',
        'To clear the browser cache'
      ],
      ans: 1, exp: 'The returned function from useEffect is called before the component unmounts and before the effect re-runs — critical for clearInterval, removeEventListener, and unsubscribe calls.'
    },
    {
      k: 'q4', q: 'In useEffect(() => { fetchData() }, [userId]), when does the effect re-run?',
      opts: [
        'Every time any state changes',
        'Only when userId value changes',
        'Only on the initial mount',
        'Every 5 seconds automatically'
      ],
      ans: 1, exp: 'Specifying [userId] as the dependency means the effect watches that value. It runs on mount and re-runs only when userId changes.'
    },
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. WHAT IS useEffect ─────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 9" title="What is useEffect?">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>⚡ Side Effects in React</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                A <strong>side effect</strong> is anything that reaches outside the component's render cycle — API calls, DOM manipulation, timers, subscriptions, or logging. <code>useEffect</code> is React's built-in hook to handle all of these safely.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Common Side Effects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {[
                { icon: <Wifi size={18} />, label: 'Fetching API Data', color: '#6366f1' },
                { icon: <Clock size={18} />, label: 'Timers & Intervals', color: '#10b981' },
                { icon: <Bell size={18} />, label: 'Event Listeners', color: '#f59e0b' },
                { icon: <Database size={18} />, label: 'LocalStorage Reads', color: '#3b82f6' },
                { icon: <Hash size={18} />, label: 'DOM Manipulation', color: '#8b5cf6' },
                { icon: <Activity size={18} />, label: 'Subscriptions', color: '#ef4444' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Syntax</h3>
            <CodeBlock title="useEffect syntax" code={`import { useEffect } from "react";

useEffect(() => {
  // Side effect code runs here

  return () => {
    // Cleanup (optional) — runs before next effect or unmount
  };
}, [dependencies]); // dependency array controls when effect runs`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 0.5rem' }}>Three Dependency Patterns</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { code: 'useEffect(fn)', label: 'No array', when: 'Runs after every render', color: '#f59e0b', bg: '#fffbeb' },
                { code: 'useEffect(fn, [])', label: 'Empty array', when: 'Runs once on mount', color: '#10b981', bg: '#f0fdf4' },
                { code: 'useEffect(fn, [val])', label: 'With values', when: 'Runs when val changes', color: '#6366f1', bg: '#eff6ff' },
              ].map((p, i) => (
                <div key={i} style={{ background: p.bg, border: `1px solid ${p.color}33`, borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                  <code style={{ fontSize: '0.78rem', background: '#0f172a', color: '#a5d6ff', padding: '4px 8px', borderRadius: 4, display: 'block', marginBottom: '0.5rem' }}>{p.code}</code>
                  <strong style={{ display: 'block', color: p.color, fontSize: '0.85rem', marginBottom: '4px' }}>{p.label}</strong>
                  <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>{p.when}</span>
                </div>
              ))}
            </div>

            {/* Live demo */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>🔴 Live Side-Effect Log</h4>
            <p style={{ marginBottom: '1rem' }}>Click the button to increment the counter. The effect log on the right shows when React executes the effect relative to renders.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: '#374151' }}>
                  Current count: <strong style={{ fontSize: '1.4rem', color: '#6366f1' }}>{s1Count}</strong>
                </p>
                <button className="btn btn-primary" onClick={() => setS1Count(c => c + 1)} style={{ background: '#6366f1', borderColor: '#6366f1', width: '100%', marginBottom: '0.75rem' }}>
                  <Plus size={14} /> Increment Count (triggers re-render + effect)
                </button>
                <CodeBlock code={`useEffect(() => {
  console.log("Count changed:", count);
}, [count]);`} />
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Effect Execution Log:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {s1Logs.map((log, i) => <LogEntry key={i} {...log} idx={i} />)}
                </div>
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

      {/* ── 2. NO DEPENDENCY ARRAY ─────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 9" title="useEffect — No Dependency Array">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#92400e' }}>⚠️ Runs after EVERY render</strong>
              <p style={{ margin: '4px 0 0', color: '#78350f', fontSize: '0.9rem' }}>
                Without a dependency array, the effect fires on the initial mount AND after every state update. Use this rarely — it can cause performance issues or infinite loops.
              </p>
            </div>

            <CodeBlock title="NoDepArray.jsx" code={`import { useState, useEffect } from "react";

function NoDepArray() {
  const [items, setItems] = useState([]);

  // Runs after EVERY render
  useEffect(() => {
    console.log("Effect ran! Items:", items.length);
  }); // <-- no dependency array

  return (
    <div>
      <p>Items: {items.length}</p>
      <button onClick={() => setItems([...items, "Item " + (items.length + 1)])}>
        Add Item
      </button>
    </div>
  );
}`} />

            {/* Interactive */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🔄 Every-Render Effect Visualizer</h4>
            <p>Add items to the list. Notice the effect fires after <em>each and every</em> render — even renders unrelated to the watched data.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <button className="btn btn-primary" onClick={() => setS2Items(p => [...p, `Item ${p.length + 1}`])}
                  style={{ background: '#f59e0b', borderColor: '#f59e0b', width: '100%', marginBottom: '1rem' }}>
                  <Plus size={14} /> Add Item (triggers render → effect)
                </button>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {s2Items.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.88rem', color: '#374151' }}>{item}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Effect Log (no dep array):</span>
                {s2Logs.length === 0 ? (
                  <span style={{ color: '#475569', fontSize: '0.78rem', fontStyle: 'italic' }}>Add an item to see effect fire…</span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {s2Logs.map((log, i) => <LogEntry key={i} {...log} idx={i} />)}
                  </div>
                )}
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

      {/* ── 3. EMPTY DEPENDENCY ARRAY ─────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 9" title="useEffect — Empty Dependency Array []">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#166534' }}>✅ Runs exactly ONCE — on mount</strong>
              <p style={{ margin: '4px 0 0', color: '#14532d', fontSize: '0.9rem' }}>
                Passing an empty array tells React this effect has zero dependencies. It runs after the first render only and never again — even if state changes later. Equivalent to <code>componentDidMount</code> in class components.
              </p>
            </div>

            <CodeBlock title="OnMount.jsx" code={`import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // Runs ONCE after mount — empty dependency array
  useEffect(() => {
    console.log("Component mounted! Starting timer...");
    // commonly used for: API calls, event listeners, subscriptions
  }, []); // <-- empty array = run once

  return <p>Seconds: {seconds}</p>;
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🚀 Mount Simulator</h4>
            <p>Click "Mount Component" to simulate a component rendering for the first time. Then update local state — notice the effect log stays frozen.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-primary" onClick={() => { setS3Mounted(true); setS3Count(0); }}
                    style={{ flex: 1, background: '#10b981', borderColor: '#10b981' }}>
                    <Play size={14} /> Mount Component
                  </button>
                  <button className="btn btn-outline" onClick={() => { setS3Mounted(false); setS3Log('⏸ Component not mounted yet'); setS3Count(0); }}
                    style={{ flex: 1 }}>
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
                {s3Mounted && (
                  <button className="btn btn-outline" onClick={() => setS3Count(c => c + 1)} style={{ width: '100%' }}>
                    Update State ({s3Count} updates so far)
                  </button>
                )}
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Effect Log (empty []):</span>
                <span style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '0.8rem' }}>{s3Log}</span>
                {s3Mounted && s3Count > 0 && (
                  <div style={{ marginTop: '8px', color: '#475569', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    ⏸ {s3Count} state update(s) — effect did NOT re-run
                  </div>
                )}
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

      {/* ── 4. SPECIFIC DEPENDENCIES ─────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Module 04 • Day 9" title="useEffect — Specific Dependencies">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Passing specific values in the dependency array means the effect <strong>watches</strong> those values and re-runs whenever any of them changes. This is the most common pattern for reacting to prop or state changes.</p>

            <CodeBlock title="SpecificDep.jsx" code={`import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Re-runs whenever userId changes
  useEffect(() => {
    console.log("Fetching user:", userId);
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // <-- watches userId

  return <p>{user?.name}</p>;
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>👁️ Dependency Watcher Simulator</h4>
            <p>Two independent counters (A and B). Select which one the effect should watch. Then increment each — the effect only fires when the watched value changes.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-outline" onClick={() => setS4A(v => v + 1)}
                    style={{ flex: 1, borderColor: '#6366f1', color: '#6366f1' }}>
                    Counter A: {s4A}
                  </button>
                  <button className="btn btn-outline" onClick={() => setS4B(v => v + 1)}
                    style={{ flex: 1, borderColor: '#10b981', color: '#10b981' }}>
                    Counter B: {s4B}
                  </button>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>useEffect dependency: [{s4Watch === 'A' ? 'counterA' : 'counterB'}]</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" onClick={() => setS4Watch('A')} style={{ flex: 1, ...(s4Watch === 'A' ? { background: '#6366f1', color: 'white', borderColor: '#6366f1' } : {}) }}>Watch A</button>
                    <button className="btn btn-outline" onClick={() => setS4Watch('B')} style={{ flex: 1, ...(s4Watch === 'B' ? { background: '#10b981', color: 'white', borderColor: '#10b981' } : {}) }}>Watch B</button>
                  </div>
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Effect Log (watching {s4Watch}):</span>
                {s4Logs.length <= 1 ? (
                  <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '0.78rem', fontStyle: 'italic' }}>Increment a counter to see…</span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {s4Logs.slice(1).map((log, i) => <LogEntry key={i} {...log} idx={i} />)}
                  </div>
                )}
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

      {/* ── 5. CLEANUP FUNCTION ───────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="s5" eyebrow="Module 05 • Day 9" title="useEffect — Cleanup Function">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>
              When a component using <code>setInterval</code>, <code>addEventListener</code>, or subscriptions is removed from the DOM, the timer/listener keeps running — causing <strong>memory leaks</strong>. The cleanup function (returned from useEffect) prevents this.
            </p>

            <CodeBlock title="TimerCleanup.jsx" code={`import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Start interval when component mounts
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // Cleanup: clear interval when component unmounts
    return () => {
      clearInterval(id);
      console.log("Cleaned up! Memory leak prevented.");
    };
  }, []); // run once

  return <p>Seconds: {count}</p>;
}`} />

            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: '1rem 1.25rem', margin: '1.5rem 0' }}>
              <strong style={{ color: '#9a3412' }}>🧹 Cleanup also runs before effects re-run</strong>
              <p style={{ margin: '4px 0 0', color: '#7c2d12', fontSize: '0.88rem' }}>
                The cleanup function isn't just for unmounting. If a dependency changes and the effect re-runs, React calls the previous cleanup first, then runs the new effect.
              </p>
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>⏱ Live Timer Cleanup Demo</h4>
            <p>Start the timer and watch it tick. Stop it to trigger the cleanup — observe how <code>clearInterval</code> is called and memory is freed.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: 100, height: 100, borderRadius: '50%', border: `6px solid ${s5Running ? '#6366f1' : '#e2e8f0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem',
                    fontSize: '2rem', fontWeight: 800, color: s5Running ? '#6366f1' : '#94a3b8',
                    transition: 'all 0.3s ease', boxShadow: s5Running ? '0 0 20px #6366f133' : 'none'
                  }}>
                    {s5Tick}s
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" onClick={() => { setS5Running(true); setS5Tick(0); }}
                    disabled={s5Running} style={{ flex: 1, background: '#6366f1', borderColor: '#6366f1' }}>
                    <Play size={14} /> Start Timer
                  </button>
                  <button className="btn btn-outline" onClick={() => setS5Running(false)}
                    disabled={!s5Running} style={{ flex: 1 }}>
                    <Pause size={14} /> Stop (Cleanup!)
                  </button>
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Cleanup Log:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 200, overflowY: 'auto' }}>
                  {s5Logs.map((log, i) => <LogEntry key={i} {...log} idx={i} />)}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. FETCHING DATA WITH useEffect ──────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="s6" eyebrow="Module 06 • Day 9" title="Fetching Data with useEffect">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>The most common real-world use of <code>useEffect</code> is <strong>fetching data from an API</strong> when a component mounts. The standard pattern combines three state variables: <code>loading</code>, <code>data</code>, and <code>error</code>.</p>

            <CodeBlock title="FetchPosts.jsx" code={`import { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => { setPosts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []); // fetch once on mount

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🌐 Mock API Client</h4>
            <p>Simulate fetching posts. The three buttons mimic real API outcomes — watch how each state transition maps to a different conditional render.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <button className="btn btn-outline" onClick={fetchPosts} style={{ borderColor: '#10b981', color: '#10b981' }}>✅ Fetch (Success)</button>
                  <button className="btn btn-outline" onClick={fetchError} style={{ borderColor: '#ef4444', color: '#ef4444' }}>❌ Fetch (Error)</button>
                  <button className="btn btn-outline" onClick={() => { setS6State('idle'); setS6Posts([]); }}>🔄 Reset</button>
                </div>

                {/* State machine visualization */}
                <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem' }}>
                  <div style={{ color: '#8892b0', marginBottom: 4 }}>{'// State machine:'}</div>
                  {['idle', 'loading', 'success', 'error'].map(st => (
                    <div key={st} style={{
                      color: s6State === st ? '#86efac' : '#475569',
                      fontWeight: s6State === st ? 'bold' : 'normal',
                      padding: '2px 0'
                    }}>
                      {s6State === st ? '▶ ' : '  '}{st}: {s6State === st ? 'ACTIVE' : '—'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rendered output */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {s6State === 'idle' && (
                  <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                    <Server size={32} style={{ marginBottom: 6 }} />
                    <strong style={{ display: 'block' }}>Awaiting fetch</strong>
                  </div>
                )}
                {s6State === 'loading' && (
                  <div style={{ textAlign: 'center', color: '#d97706' }}>
                    <div style={{ width: 32, height: 32, border: '3px solid #fef3c7', borderTop: '3px solid #d97706', borderRadius: '50%', margin: '0 auto 10px', animation: 'spin 1s linear infinite' }} />
                    <strong>Loading...</strong>
                  </div>
                )}
                {s6State === 'error' && (
                  <div style={{ textAlign: 'center', color: '#dc2626' }}>
                    <AlertTriangle size={32} style={{ marginBottom: 6, color: '#fca5a5' }} />
                    <strong style={{ display: 'block' }}>Network Error</strong>
                    <span style={{ fontSize: '0.82rem' }}>Failed to fetch posts</span>
                  </div>
                )}
                {s6State === 'success' && (
                  <div>
                    <h5 style={{ margin: '0 0 8px', color: '#166534', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={16} color="#10b981" /> {s6Posts.length} Posts Loaded
                    </h5>
                    <ul style={{ margin: 0, padding: '0 0 0 1.2rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {s6Posts.map(p => (
                        <li key={p.id} style={{ fontSize: '0.82rem', color: '#374151' }}>{p.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
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

      {/* ── 7. QUIZ ──────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 9 Interactive Quiz">
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

      {/* ── 8. ASSIGNMENT ────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Homework" title="Day 9 Assignment: useEffect">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 Day 9 Completed!</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                You've mastered useEffect — no dependency array, empty [], specific dependencies, cleanup functions, and async API fetching patterns. Complete these exercises to solidify your knowledge.
              </p>
            </div>

            {[
              { num: 1, icon: '⏱', title: 'Auto-Updating Clock', desc: 'Build a digital clock component that displays the current time (HH:MM:SS) and updates every second using setInterval inside useEffect. Implement proper cleanup to prevent memory leaks.', hint: 'Use useEffect with [] to start the interval once, return () => clearInterval(id) for cleanup.' },
              { num: 2, icon: '🌐', title: 'GitHub User Fetcher', desc: 'Create a component with a text input for a GitHub username. When the username state changes, useEffect should fetch https://api.github.com/users/{username} and display the avatar, name, and follower count.', hint: 'Dependency array: [username]. Add a debounce to avoid excessive API calls.' },
              { num: 3, icon: '📜', title: 'Page Title Sync', desc: 'Build a component that keeps the browser tab title in sync with a state variable (e.g., a counter or typed text). Use useEffect to update document.title whenever the state changes.', hint: 'useEffect(() => { document.title = count }, [count]) — no cleanup needed here.' },
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
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Submit Day 9 Exercises</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save and push your code to the course repository to complete this module.</p>
            </div>
          </div>
        </Section>
      )}

      <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
    </AnimatePresence>
  );
}
