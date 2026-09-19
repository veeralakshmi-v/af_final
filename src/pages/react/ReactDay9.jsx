import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, Sparkles, RefreshCw, CheckCircle, Code,
  ArrowRight, Info, Copy, FileText, Plus, AlertTriangle, BookOpenCheck,
  Sliders, GitBranch, Bell, Activity, Play, Pause, RotateCcw, Zap,
  Clock, Timer, Wifi, WifiOff, Server, List, Hash, HelpCircle, Flame,
  ShieldAlert, Lightbulb, Check, ChevronRight, Eye
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

const LogEntry = ({ text, type = 'info', idx }) => {
  const colors = { effect: '#86efac', render: '#38bdf8', cleanup: '#fbbf24', error: '#fca5a5', info: '#cbd5e1' };
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
      style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: colors[type], borderBottom: '1px solid #1e293b', padding: '5px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
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
  const [s1Logs, setS1Logs] = useState([{ text: '🟢 Component mounted (initial render)', type: 'render' }]);
  useEffect(() => {
    if (activeTab !== 'intro_react') return;
    setS1Logs(prev => [...prev, { text: `⚡ useEffect executed! (count = ${s1Count})`, type: 'effect' }].slice(-8));
  }, [s1Count, activeTab]);

  /* ── Section 2: No dependency array – runs every render ── */
  const [s2Items, setS2Items] = useState(['HTML & CSS', 'JavaScript Basics']);
  const [s2Logs, setS2Logs] = useState([]);
  const s2Ref = useRef(false);
  useEffect(() => {
    if (activeTab !== 'useState_hook') return;
    if (!s2Ref.current) { s2Ref.current = true; return; }
    setS2Logs(prev => [...prev, { text: `🔄 Effect fired on re-render! Total items: ${s2Items.length}`, type: 'effect' }].slice(-6));
  });

  /* ── Section 3: Empty [] – runs once ── */
  const [s3Mounted, setS3Mounted] = useState(false);
  const [s3Log, setS3Log] = useState('⏸ Component not mounted yet');
  const [s3Count, setS3Count] = useState(0);
  useEffect(() => {
    if (activeTab !== 'multiple_states' || !s3Mounted) return;
    setS3Log('✅ useEffect ran ONCE on initial mount. Will never run again!');
  }, [s3Mounted]);

  /* ── Section 4: Specific dependency ── */
  const [s4A, setS4A] = useState(0);
  const [s4B, setS4B] = useState(0);
  const [s4Watch, setS4Watch] = useState('A');
  const [s4Logs, setS4Logs] = useState([]);
  const s4Dep = s4Watch === 'A' ? s4A : s4B;
  useEffect(() => {
    if (activeTab !== 'object_state') return;
    setS4Logs(prev => [...prev, { text: `🎯 Effect triggered because [${s4Watch}] changed to ${s4Dep}`, type: 'effect' }].slice(-6));
  }, [s4Dep, activeTab]);

  /* ── Section 5: Cleanup – timer ── */
  const [s5Running, setS5Running] = useState(false);
  const [s5Tick, setS5Tick] = useState(0);
  const [s5Logs, setS5Logs] = useState([{ text: '⏸ Timer is idle. Click Start below.', type: 'info' }]);
  useEffect(() => {
    if (activeTab !== 'nested_state') return;
    if (!s5Running) return;
    setS5Logs(prev => [...prev, { text: '▶ useEffect started setInterval timer', type: 'effect' }].slice(-8));
    const id = setInterval(() => {
      setS5Tick(t => t + 1);
      setS5Logs(prev => [...prev, { text: `⏱ Tick fired (+1s)`, type: 'render' }].slice(-8));
    }, 1000);
    return () => {
      clearInterval(id);
      setS5Logs(prev => [...prev, { text: '🧹 Cleanup ran: clearInterval(id) — 0 memory leak!', type: 'cleanup' }].slice(-8));
    };
  }, [s5Running, activeTab]);

  /* ── Section 6: API fetch pattern ── */
  const [s6State, setS6State] = useState('idle'); // idle | loading | success | error
  const [s6Posts, setS6Posts] = useState([]);
  const MOCK_POSTS = [
    { id: 1, title: 'Learn React Hooks from Scratch', author: 'Dan A.' },
    { id: 2, title: 'Mastering useEffect and LifeCycles', author: 'Sophie B.' },
    { id: 3, title: 'Why Cleanup Functions Prevent Memory Leaks', author: 'Alex C.' },
    { id: 4, title: 'Fetching REST APIs with Async/Await', author: 'Emma D.' },
  ];
  const fetchPosts = () => {
    setS6State('loading');
    setS6Posts([]);
    setTimeout(() => setS6State('success'), 1200);
  };
  const fetchError = () => {
    setS6State('loading');
    setTimeout(() => setS6State('error'), 1200);
  };
  useEffect(() => {
    if (s6State === 'success') setS6Posts(MOCK_POSTS);
  }, [s6State]);

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1', q: 'What is the main purpose of the useEffect hook?',
      opts: [
        'To create HTML elements in JSX',
        'To perform side effects (API calls, timers, subscriptions, DOM updates) after rendering',
        'To store and modify component local state only',
        'To replace CSS stylesheets'
      ],
      ans: 1, exp: 'useEffect lets you synchronize your component with external systems (APIs, timers, browser DOM, etc.) after React paints the screen.'
    },
    {
      k: 'q2', q: 'What happens when you pass an EMPTY dependency array: useEffect(fn, [])?',
      opts: [
        'It runs after every single render and state change',
        'It never runs at all',
        'It runs exactly ONCE when the component first mounts (appears on screen)',
        'It causes an infinite re-render loop'
      ],
      ans: 2, exp: 'An empty dependency array [] tells React this effect depends on nothing, so it only executes once right after the initial mount (equivalent to componentDidMount).'
    },
    {
      k: 'q3', q: 'When does useEffect with NO dependency array: useEffect(fn) run?',
      opts: [
        'Only when the page reloads',
        'After the initial mount AND after EVERY subsequent state/prop re-render',
        'Only when clicking a button',
        'Only right before the component is deleted'
      ],
      ans: 1, exp: 'Without any dependency array, the effect executes after initial mount and after every single re-render.'
    },
    {
      k: 'q4', q: 'In useEffect(() => { ... }, [userId]), when will the effect re-run?',
      opts: [
        'Every second automatically',
        'Only when the userId value changes (plus the initial mount)',
        'Never after the first render',
        'Only when the window is resized'
      ],
      ans: 1, exp: 'Specifying [userId] instructs React to watch userId. If userId changes between renders, the effect will re-execute.'
    },
    {
      k: 'q5', q: 'Why do we return a cleanup function from useEffect?',
      opts: [
        'To reset the user password',
        'To clear intervals/timeouts, remove event listeners, and avoid memory leaks when unmounting or re-running',
        'To force the component to re-render again',
        'To delete unused CSS files'
      ],
      ans: 1, exp: 'The returned function from useEffect is the cleanup handler. React calls it before unmounting the component and before running the effect on subsequent renders.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. WHAT IS useEffect ─────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 9" title="What is useEffect? ">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Quick Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 10 }}>
                  <Sparkles size={24} color="#fef08a" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', margin: 0 }}>
                  The "Do This After the Screen Paints" Hook
                </h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.95)', margin: '0 0 0.8rem', fontSize: '1.02rem', lineHeight: 1.7 }}>
                In simple words, <strong><code>useEffect</code></strong> is a tool that tells React to run extra code <em>after</em> your component shows up on the screen.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '0.96rem', lineHeight: 1.7 }}>
                Think of it as a way to handle <strong>"side effects"</strong>—tasks that need to happen outside of simply drawing the HTML on the screen, like fetching data from the internet, starting a timer, or changing the page title.
              </p>
            </div>

            {/* Real World Analogy Card */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.8rem' }}>
                <Lightbulb size={22} color="#f59e0b" />
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Real-World Analogy: The Restaurant</h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginTop: '1rem' }}>
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>React Rendering</span>
                  <h5 style={{ margin: '6px 0 8px', fontSize: '1.05rem', color: '#0f172a' }}>🍽️ The Chef serving your food</h5>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                    The chef prepares the food and places it on your table (React generates JSX and renders it on screen). Fast and uninterrupted!
                  </p>
                </div>
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>useEffect (Side Effect)</span>
                  <h5 style={{ margin: '6px 0 8px', fontSize: '1.05rem', color: '#0f172a' }}>🧹 The Waiter cleaning up or fetching water</h5>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                    After the food is served on your table, the waiter brings water, logs the bill, and later cleans the table when you leave.
                  </p>
                </div>
              </div>
            </div>

            {/* ⏳ Mount vs. Render Comparison Card */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⏳</span>
                <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Mount vs. Render</h4>
              </div>
              <p style={{ margin: '0 0 1.2rem', fontSize: '0.95rem', color: '#475569' }}>
                It is common to confuse <strong>mounting</strong> with <strong>rendering</strong>, but they are completely different steps in a component's lifecycle:
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '1.2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 800, width: '15%' }}>Concept</th>
                      <th style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 800, width: '55%' }}>What React is doing</th>
                      <th style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 800, width: '30%' }}>How often it happens</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 800, color: '#10b981' }}>🌱 Mount</td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        React builds the component for the <strong>first time</strong> and inserts it into the webpage (DOM).
                      </td>
                      <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>
                        <strong>Only once</strong> per component lifetime.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', fontWeight: 800, color: '#6366f1' }}>🔄 Render</td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        React calls the component function to see what the HTML layout <em>should</em> look like based on current data.
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6366f1', fontWeight: 700 }}>
                        <strong>Many times</strong> (every time state or props change).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Lightbulb size={20} color="#2563eb" style={{ flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#1e40af', lineHeight: 1.6 }}>
                  <em><strong>Analogy:</strong></em> <strong>Mounting</strong> is like building a brand-new house. <strong>Rendering</strong> is like changing or rearranging the furniture inside that house.
                </p>
              </div>
            </div>

            {/* Why Can't We Just Put Code in the Component Body? */}
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#be123c', fontWeight: 800, marginBottom: '0.5rem' }}>
                <ShieldAlert size={20} />
                <span>Why can't we just write fetch() directly inside the component body?</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#9f1239', lineHeight: 1.7 }}>
                If you put <code>fetch()</code> or <code>setInterval()</code> directly in the function body without <code>useEffect</code>, it will execute on <strong>every millisecond of rendering</strong>, freeze your website, and if you update state inside, cause an <strong>infinite re-render loop that crashes the browser</strong>! <code>useEffect</code> prevents this by running safely after rendering.
              </p>
            </div>

            {/* Common Side Effects */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.85rem' }}>When Do We Use useEffect?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.9rem', marginBottom: '2rem' }}>
              {[
                { icon: <Wifi size={20} />, label: '1. Fetching API Data', desc: 'Load products, users, or posts from server', color: '#6366f1', bg: '#eff6ff' },
                { icon: <Clock size={20} />, label: '2. Timers & Clocks', desc: 'Run setInterval or setTimeout countdowns', color: '#10b981', bg: '#f0fdf4' },
                { icon: <Bell size={20} />, label: '3. Event Listeners', desc: 'Listen to window resize, keypress, scroll', color: '#f59e0b', bg: '#fffbeb' },
                { icon: <Database size={20} />, label: '4. LocalStorage', desc: 'Save or restore cart data in browser storage', color: '#3b82f6', bg: '#eff6ff' },
                { icon: <Hash size={20} />, label: '5. Browser Title Sync', desc: 'Update document.title = "New Message (3)"', color: '#8b5cf6', bg: '#f5f3ff' },
                { icon: <Activity size={20} />, label: '6. Subscriptions', desc: 'Chat sockets, Firebase live data listeners', color: '#ef4444', bg: '#fef2f2' },
              ].map((item, i) => (
                <div key={i} style={{ background: item.bg, border: `1px solid ${item.color}30`, borderRadius: 12, padding: '1rem' }}>
                  <div style={{ color: item.color, marginBottom: 6 }}>{item.icon}</div>
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: '#0f172a', marginBottom: 4 }}>{item.label}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Syntax Breakdown */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>The Anatomy of useEffect</h3>
            <CodeBlock title="useEffect Syntax Breakdown" code={`import { useEffect } from "react";

useEffect(() => {
  // 1. SIDE EFFECT CODE:
  // Runs AFTER the component renders (e.g. fetch API, start timer)
  console.log("Effect executed!");

  // 2. CLEANUP FUNCTION (Optional):
  // Runs before the effect re-runs OR when component leaves the screen (unmounts)
  return () => {
    console.log("Cleanup code (e.g. clearInterval, removeEventListener)");
  };
}, [/* 3. DEPENDENCY ARRAY: Controls WHEN this effect should run */]);`} />

            {/* The 3 Ways to Control It (The Dependency Array) */}
            <div style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                The 3 Ways to Control It (The Dependency Array)
              </h3>
              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.7, margin: '0 0 1.2rem 0' }}>
                <strong><code>useEffect</code></strong> takes a function as its first argument, and an optional <strong>array <code>[]</code></strong> as its second argument. This array controls <em>when</em> the code runs.
              </p>

              {/* Dependency Array Comparison Table */}
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 800, width: '32%' }}>Syntax Example</th>
                      <th style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 800, width: '38%' }}>When does it run?</th>
                      <th style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 800, width: '30%' }}>Common Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <strong style={{ display: 'block', color: '#b45309', marginBottom: 4 }}>No Array at all</strong>
                        <code style={{ background: '#fffbeb', color: '#92400e', padding: '3px 6px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600 }}>
                          useEffect(() =&gt; &#123; ... &#125;)
                        </code>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155' }}>
                        <strong>Every single time</strong> the component updates or re-renders.
                      </td>
                      <td style={{ padding: '14px 16px', color: '#64748b' }}>
                        General logging, animations, or tracking changes.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <strong style={{ display: 'block', color: '#15803d', marginBottom: 4 }}>Empty Array []</strong>
                        <code style={{ background: '#f0fdf4', color: '#166534', padding: '3px 6px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600 }}>
                          useEffect(() =&gt; &#123; ... &#125;, [])
                        </code>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155' }}>
                        <strong>Only once</strong>, right when the component first shows up on the screen (mounts).
                      </td>
                      <td style={{ padding: '14px 16px', color: '#64748b' }}>
                        Fetching API data on page load, setting up subscriptions or timers.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '14px 16px' }}>
                        <strong style={{ display: 'block', color: '#1d4ed8', marginBottom: 4 }}>With Dependencies [prop, state]</strong>
                        <code style={{ background: '#eff6ff', color: '#1e40af', padding: '3px 6px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600 }}>
                          useEffect(() =&gt; &#123; ... &#125;, [count])
                        </code>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155' }}>
                        On <strong>mount AND whenever</strong> the specified dependencies change.
                      </td>
                      <td style={{ padding: '14px 16px', color: '#64748b' }}>
                        Auto-saving input text, re-fetching data when a filter or dropdown changes.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* The 3 Golden Rules Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 12, padding: '1.2rem' }}>
                  <span style={{ background: '#f59e0b', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>RULE 1</span>
                  <code style={{ display: 'block', margin: '8px 0 4px', fontWeight: 700, color: '#92400e', fontSize: '0.85rem' }}>useEffect(fn)</code>
                  <strong style={{ color: '#b45309', display: 'block', fontSize: '0.95rem', marginBottom: 4 }}>No Dependency Array</strong>
                  <p style={{ fontSize: '0.82rem', color: '#78350f', margin: 0 }}>Runs on mount AND after <strong>EVERY single re-render</strong>.</p>
                </div>

                <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 12, padding: '1.2rem' }}>
                  <span style={{ background: '#10b981', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>RULE 2 (Most Common)</span>
                  <code style={{ display: 'block', margin: '8px 0 4px', fontWeight: 700, color: '#166534', fontSize: '0.85rem' }}>useEffect(fn, [])</code>
                  <strong style={{ color: '#15803d', display: 'block', fontSize: '0.95rem', marginBottom: 4 }}>Empty Array []</strong>
                  <p style={{ fontSize: '0.82rem', color: '#14532d', margin: 0 }}>Runs <strong>ONLY ONCE</strong> when component first mounts.</p>
                </div>

                <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 12, padding: '1.2rem' }}>
                  <span style={{ background: '#3b82f6', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>RULE 3</span>
                  <code style={{ display: 'block', margin: '8px 0 4px', fontWeight: 700, color: '#1e40af', fontSize: '0.85rem' }}>useEffect(fn, [prop/state])</code>
                  <strong style={{ color: '#1d4ed8', display: 'block', fontSize: '0.95rem', marginBottom: 4 }}>With Dependencies</strong>
                  <p style={{ fontSize: '0.82rem', color: '#1e3a8a', margin: 0 }}>Runs on mount + whenever <strong>watched variable changes</strong>.</p>
                </div>
              </div>
            </div>

            {/* Live Interactive Logger */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                <Play size={18} color="#6366f1" />
                <h4 style={{ fontWeight: 800, color: '#0f172a', margin: 0 }}>Live Demo: Click to see render vs useEffect timing</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.2rem' }}>
                Click "Increment Count". Notice how React first renders the new count, then immediately runs <code>useEffect</code> afterwards!
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: 12, marginBottom: '1rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Current Count State:</span>
                    <strong style={{ fontSize: '2.5rem', color: '#6366f1' }}>{s1Count}</strong>
                  </div>
                  <button className="btn btn-primary" onClick={() => setS1Count(c => c + 1)} style={{ background: '#6366f1', borderColor: '#6366f1', width: '100%' }}>
                    <Plus size={16} /> Increment Count (Triggers Render & Effect)
                  </button>
                </div>

                <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 'bold' }}>Execution Console:</span>
                    <button onClick={() => setS1Logs([])} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.75rem', cursor: 'pointer' }}>Clear</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {s1Logs.length === 0 ? (
                      <span style={{ color: '#475569', fontSize: '0.78rem', fontStyle: 'italic' }}>Click increment to log events...</span>
                    ) : (
                      s1Logs.map((log, i) => <LogEntry key={i} {...log} idx={i} />)
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Rule 1: No Dependency Array <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. NO DEPENDENCY ARRAY ─────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 9" title="Case 1: useEffect With NO Dependency Array">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Warning Card */}
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400e', fontWeight: 800, marginBottom: '0.4rem' }}>
                <AlertTriangle size={20} color="#f59e0b" />
                <span>Behavior: Runs on Mount + Runs after EVERY Single Render</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#78350f', lineHeight: 1.6 }}>
                When you omit the second argument array entirely, React calls this effect <strong>every time anything in the component changes</strong>.
                <br />
                <strong>Analogy:</strong> Like a camera taking a snapshot every single time you blink.
              </p>
            </div>

            {/* Complete Program Example */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>Complete Program Example</h3>
            <CodeBlock title="NoDependencyArrayDemo.jsx" code={`import React, { useState, useEffect } from "react";

function NoDependencyArrayDemo() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  // ⚠️ NO DEPENDENCY ARRAY:
  // This runs when the page first loads AND every time 'text' or 'count' changes!
  useEffect(() => {
    console.log("🔄 Component just rendered or re-rendered!");
  }); // <-- Look, no array [] here!

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Case 1: No Dependency Array</h3>
      
      <input 
        type="text" 
        value={text} 
        placeholder="Type something..." 
        onChange={(e) => setText(e.target.value)} 
      />
      
      <p>Typed text: {text}</p>
      
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}

export default NoDependencyArrayDemo;`} />

            {/* The Infinite Loop Danger */}
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '1.25rem', margin: '1.5rem 0' }}>
              <h4 style={{ color: '#dc2626', fontWeight: 800, margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Flame size={18} /> ⚠️ The Infinite Loop Trap (Very Common Beginner Mistake!)
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#991b1b', margin: '0 0 0.8rem', lineHeight: 1.6 }}>
                If you update state inside a <code>useEffect</code> that has <strong>no dependency array</strong>, it triggers a re-render. That re-render triggers the effect again, which updates state again... forever!
              </p>
              <CodeBlock title="❌ CRASH CAUSING CODE" code={`// ❌ DO NOT DO THIS — INFINITE LOOP CRASH!
useEffect(() => {
  setCount(count + 1); // 💣 Updates state -> Triggers Render -> Runs Effect -> Updates State -> CRASH!
});`} />
            </div>

            {/* Interactive Widget */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.75rem' }}>🔄 Live Every-Render Visualizer</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <button className="btn btn-primary" onClick={() => setS2Items(p => [...p, `Skill #${p.length + 1}`])}
                  style={{ background: '#f59e0b', borderColor: '#f59e0b', width: '100%', marginBottom: '1rem' }}>
                  <Plus size={14} /> Add Item (Triggers State Update & Re-render)
                </button>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Items in list:</span>
                  <ul style={{ margin: '8px 0 0', paddingLeft: '1.2rem', fontSize: '0.88rem' }}>
                    {s2Items.map((item, i) => (
                      <li key={i} style={{ color: '#334155' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Effect Execution Log:</span>
                {s2Logs.length === 0 ? (
                  <span style={{ color: '#475569', fontSize: '0.78rem', fontStyle: 'italic' }}>Add an item to watch effect run...</span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {s2Logs.map((log, i) => <LogEntry key={i} {...log} idx={i} />)}
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('multiple_states')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Rule 2: Empty Array [] (Run Once) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. EMPTY DEPENDENCY ARRAY ─────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 9" title="Case 2: Empty Dependency Array [] (Run Once on Mount)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Highlight Banner */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontWeight: 800, marginBottom: '0.4rem' }}>
                <CheckCircle size={20} color="#10b981" />
                <span>Behavior: Runs Exactly ONCE when component appears (Mount)</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#14532d', lineHeight: 1.6 }}>
                Passing an empty array <code>[]</code> tells React: <em>"This effect has ZERO variables to watch. Run it once when the component is born on the screen, and NEVER run it again!"</em>
                <br />
                <strong>Analogy:</strong> Moving into a new house and turning on the main circuit breaker once.
              </p>
            </div>

            {/* Complete Program Example */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>Complete Program Example (API Data on Load)</h3>
            <CodeBlock title="RunOnceOnMount.jsx" code={`import React, { useState, useEffect } from "react";

function RunOnceOnMount() {
  const [welcomeMessage, setWelcomeMessage] = useState("Loading greeting...");
  const [count, setCount] = useState(0);

  // ✅ EMPTY ARRAY []:
  // This executes ONLY ONCE when the component first appears on screen!
  useEffect(() => {
    console.log("🚀 Component mounted! Fetching initial greeting...");
    
    // Simulate loading initial data from server
    setTimeout(() => {
      setWelcomeMessage("Welcome back, Learner! 👋");
    }, 1000);

  }, []); // <-- Empty array = run ONCE on mount

  return (
    <div style={{ padding: "20px", border: "1px solid #10b981", borderRadius: "8px" }}>
      <h2>{welcomeMessage}</h2>
      
      <p>Even if you click the button below and re-render 100 times, the effect will NOT re-run.</p>
      
      <button onClick={() => setCount(count + 1)}>
        Re-render Component ({count} clicks)
      </button>
    </div>
  );
}

export default RunOnceOnMount;`} />

            {/* Mount Simulator Widget */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🚀 Mount & Render Simulator</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Click <strong>Mount Component</strong> to mount for the first time. Then click <strong>Trigger State Update</strong> — notice the log stays frozen because <code>[]</code> ignores future re-renders!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-primary" onClick={() => { setS3Mounted(true); setS3Count(0); }}
                    style={{ flex: 1, background: '#10b981', borderColor: '#10b981' }}>
                    <Play size={14} /> Mount Component
                  </button>
                  <button className="btn btn-outline" onClick={() => { setS3Mounted(false); setS3Log('⏸ Component unmounted / not mounted yet'); setS3Count(0); }}
                    style={{ flex: 1 }}>
                    <RotateCcw size={14} /> Unmount / Reset
                  </button>
                </div>
                {s3Mounted && (
                  <button className="btn btn-outline" onClick={() => setS3Count(c => c + 1)} style={{ width: '100%', borderColor: '#6366f1', color: '#6366f1' }}>
                    Trigger State Update (Clicked: {s3Count})
                  </button>
                )}
              </div>

              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>useEffect Log ([]):</span>
                <span style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '0.82rem', display: 'block' }}>{s3Log}</span>
                {s3Mounted && s3Count > 0 && (
                  <div style={{ marginTop: '10px', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.78rem', borderTop: '1px solid #334155', paddingTop: '8px' }}>
                    ⏸ Re-renders triggered: {s3Count} <br />
                    <span style={{ color: '#fbbf24' }}>Effect ignored re-renders because [] has 0 dependencies.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Rule 3: Specific Dependencies [value] <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. SPECIFIC DEPENDENCIES ─────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Module 04 • Day 9" title="Case 3: Specific Dependencies [prop, state]">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Info Card */}
            <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1e40af', fontWeight: 800, marginBottom: '0.4rem' }}>
                <Eye size={20} color="#3b82f6" />
                <span>Behavior: Runs on Mount + whenever the watched variable changes</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#1e3a8a', lineHeight: 1.6 }}>
                When you place state or prop variables inside the array (e.g., <code>[userId]</code> or <code>[searchQuery]</code>), React compares the old value with the new value. If they are different, the effect fires!
                <br />
                <strong>Analogy:</strong> Changing your umbrella only when the weather forecast switches to rain.
              </p>
            </div>

            {/* Complete Program Example */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>Complete Program Example (Dynamic User Switcher)</h3>
            <CodeBlock title="DynamicUserFetcher.jsx" code={`import React, { useState, useEffect } from "react";

function DynamicUserFetcher() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🎯 WATCHES [userId]:
  // Runs on initial mount (with userId = 1)
  // AND re-runs whenever userId changes (e.g. 1 -> 2 -> 3)
  useEffect(() => {
    setLoading(true);
    console.log(\`Fetching profile data for User ID: \${userId}...\`);

    // Mock API call to fetch user profile
    const timer = setTimeout(() => {
      const users = {
        1: { name: "Alice Johnson", role: "Frontend Dev", city: "New York" },
        2: { name: "Bob Smith", role: "Backend Engineer", city: "London" },
        3: { name: "Charlie Davis", role: "UI/UX Designer", city: "Tokyo" },
      };
      setUserData(users[userId] || { name: "Unknown", role: "N/A", city: "N/A" });
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [userId]); // <-- Only re-runs when userId changes!

  return (
    <div style={{ padding: "20px", border: "1px solid #3b82f6", borderRadius: "10px" }}>
      <h3>User Profile Viewer</h3>
      
      {/* Switch between user IDs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              padding: "8px 16px",
              background: userId === id ? "#3b82f6" : "#f1f5f9",
              color: userId === id ? "white" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            User {id}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading user #{userId} profile...</p>
      ) : (
        userData && (
          <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px" }}>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>City:</strong> {userData.city}</p>
          </div>
        )
      )}
    </div>
  );
}

export default DynamicUserFetcher;`} />

            {/* Interactive Dependency Watcher */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>👁️ Interactive Dependency Watcher</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              We have two counters (A and B). Choose which counter the effect should watch. Then increment both — the effect only responds to the watched variable!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-outline" onClick={() => setS4A(v => v + 1)}
                    style={{ flex: 1, borderColor: '#6366f1', color: '#6366f1', fontWeight: 700 }}>
                    Counter A: {s4A}
                  </button>
                  <button className="btn btn-outline" onClick={() => setS4B(v => v + 1)}
                    style={{ flex: 1, borderColor: '#10b981', color: '#10b981', fontWeight: 700 }}>
                    Counter B: {s4B}
                  </button>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Currently Watching in Dependency Array: <code>[{s4Watch === 'A' ? 'counterA' : 'counterB'}]</code>
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" onClick={() => setS4Watch('A')} style={{ flex: 1, ...(s4Watch === 'A' ? { background: '#6366f1', color: 'white', borderColor: '#6366f1' } : {}) }}>
                      Watch A (Ignore B)
                    </button>
                    <button className="btn btn-outline" onClick={() => setS4Watch('B')} style={{ flex: 1, ...(s4Watch === 'B' ? { background: '#10b981', color: 'white', borderColor: '#10b981' } : {}) }}>
                      Watch B (Ignore A)
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                  Log (Watching {s4Watch}):
                </span>
                {s4Logs.length <= 1 ? (
                  <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '0.78rem', fontStyle: 'italic' }}>
                    Click Counter {s4Watch} to trigger effect...
                  </span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {s4Logs.slice(1).map((log, i) => <LogEntry key={i} {...log} idx={i} />)}
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Cleanup Function (Memory Leaks) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. CLEANUP FUNCTION ───────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="s5" eyebrow="Module 05 • Day 9" title="The Cleanup Function (Preventing Memory Leaks)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Hero / Problem statement */}
            <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: 16, padding: '1.5rem 2rem', marginBottom: '1.5rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
                <Zap size={22} color="#fef08a" />
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>What is a Memory Leak & Why Clean Up?</h3>
              </div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.92)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                If you start a <code>setInterval</code> or add a <code>window.addEventListener('scroll')</code> inside a component, and the user navigates away to another page, that timer/listener <strong>does NOT automatically stop</strong>!
                It stays running in browser background, eating RAM and slowing down your computer.
                <br /><br />
                The <strong>cleanup function</strong> returned from <code>useEffect</code> turns off the timer or removes the event listener before the component is destroyed.
              </p>
            </div>

            {/* Analogy Box */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem', display: 'flex', gap: 12, alignItems: 'center' }}>
              <Lightbulb size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
                <strong>Analogy:</strong> If you turn on the bathroom water faucet (useEffect), you must turn it off (cleanup) before leaving the house so you don’t flood the room!
              </p>
            </div>

            {/* Complete Program 1: Timer with Cleanup */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>Complete Program: Safe StopWatch with Cleanup</h3>
            <CodeBlock title="StopWatchWithCleanup.jsx" code={`import React, { useState, useEffect } from "react";

function StopWatchWithCleanup() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timerId = null;

    if (isActive) {
      // 1. START INTERVAL: Runs every 1000ms (1s)
      timerId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      console.log("⏱️ Timer started with ID:", timerId);
    }

    // 2. CLEANUP FUNCTION (Crucial!):
    // React calls this when isActive changes or when component unmounts
    return () => {
      if (timerId) {
        clearInterval(timerId);
        console.log("🧹 Cleanup executed: Stopped timer ID:", timerId);
      }
    };
  }, [isActive]); // Re-runs whenever isActive flips true/false

  return (
    <div style={{ padding: "20px", border: "1px solid #cbd5e1", borderRadius: "10px", textAlign: "center" }}>
      <h2>Time Elapsed: {seconds}s</h2>
      
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => setIsActive(true)} style={{ background: "#10b981", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px" }}>
          Start
        </button>
        <button onClick={() => setIsActive(false)} style={{ background: "#ef4444", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px" }}>
          Pause & Cleanup
        </button>
        <button onClick={() => { setIsActive(false); setSeconds(0); }} style={{ background: "#64748b", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px" }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default StopWatchWithCleanup;`} />

            {/* Live Interactive Timer Widget */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>⏱️ Live Timer & Cleanup Visualizer</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Click <strong>Start Timer</strong>. Then click <strong>Stop (Cleanup!)</strong>. Watch the console on the right prove that <code>clearInterval()</code> was called to prevent memory leaks!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: 110, height: 110, borderRadius: '50%', border: `6px solid ${s5Running ? '#6366f1' : '#e2e8f0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem',
                    fontSize: '2.2rem', fontWeight: 800, color: s5Running ? '#6366f1' : '#94a3b8',
                    transition: 'all 0.3s ease', boxShadow: s5Running ? '0 0 24px rgba(99, 102, 241, 0.25)' : 'none'
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
                    disabled={!s5Running} style={{ flex: 1, borderColor: '#ef4444', color: '#ef4444' }}>
                    <Pause size={14} /> Stop & Cleanup
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Cleanup Console Log:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 180, overflowY: 'auto' }}>
                  {s5Logs.map((log, i) => <LogEntry key={i} {...log} idx={i} />)}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Fetching API Data (Real-World Guide) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. FETCHING DATA WITH useEffect ──────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="s6" eyebrow="Module 06 • Day 9" title="Fetching API Data with useEffect (The Industry Standard)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p style={{ fontSize: '1.02rem', lineHeight: 1.7 }}>
              Fetching data from a REST API is the <strong>#1 most common task</strong> in modern React applications.
              To create a world-class user experience, professional developers always manage <strong>3 states</strong>:
            </p>

            {/* The 3 States of Data Fetching */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 12, padding: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2563eb', fontWeight: 800, marginBottom: 4 }}>
                  <RefreshCw size={16} /> 1. Loading State
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#1e40af' }}>
                  Show a spinner or skeleton loader while data travels from server across internet.
                </p>
              </div>

              <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 12, padding: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', fontWeight: 800, marginBottom: 4 }}>
                  <CheckCircle size={16} /> 2. Data/Success State
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534' }}>
                  Store the JSON response and map over it to render cards, tables, or list items.
                </p>
              </div>

              <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 12, padding: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#dc2626', fontWeight: 800, marginBottom: 4 }}>
                  <AlertTriangle size={16} /> 3. Error State
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#991b1b' }}>
                  If server is down or user is offline, display a friendly error message + Retry button.
                </p>
              </div>
            </div>

            {/* Complete Full-Stack Program */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>Complete Program: Modern Async/Await API Fetcher</h3>
            <CodeBlock title="UserDirectory.jsx" code={`import React, { useState, useEffect } from "react";

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 💡 Pro Tip: Declare the async function INSIDE useEffect
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from real public API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch users from server (Status: " + response.status + ")");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Turn off spinner whether success or failure
      }
    };

    fetchUsers(); // Call it once on mount!
  }, []); // <-- Empty array [] ensures we only fetch once on load

  // 1. Loading UI
  if (loading) {
    return <div style={{ textAlign: "center", padding: "30px" }}>⏳ Loading users, please wait...</div>;
  }

  // 2. Error UI
  if (error) {
    return (
      <div style={{ padding: "20px", color: "red", background: "#fee2e2", borderRadius: "8px" }}>
        ⚠️ Error: {error}
        <br />
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // 3. Success UI
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>👥 User Directory ({users.length} Users)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
        {users.map((user) => (
          <div key={user.id} style={{ border: "1px solid #e2e8f0", padding: "15px", borderRadius: "8px", background: "#f8fafc" }}>
            <h4 style={{ margin: "0 0 5px" }}>{user.name}</h4>
            <p style={{ margin: "0 0 5px", color: "#64748b", fontSize: "0.9rem" }}>✉️ {user.email}</p>
            <span style={{ fontSize: "0.8rem", color: "#0ea5e9" }}>🏢 {user.company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDirectory;`} />

            {/* Live Mock API Simulator */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🌐 Interactive API State Machine Simulator</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Test how the UI seamlessly transitions between <code>idle</code>, <code>loading</code>, <code>success</code>, and <code>error</code> states.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <button className="btn btn-outline" onClick={fetchPosts} style={{ borderColor: '#10b981', color: '#10b981', fontWeight: 700 }}>
                    ✅ Fetch Success (200 OK)
                  </button>
                  <button className="btn btn-outline" onClick={fetchError} style={{ borderColor: '#ef4444', color: '#ef4444', fontWeight: 700 }}>
                    ❌ Fetch Error (500 Server Error)
                  </button>
                  <button className="btn btn-outline" onClick={() => { setS6State('idle'); setS6Posts([]); }}>
                    🔄 Reset
                  </button>
                </div>

                {/* State badges */}
                <div style={{ background: '#0f172a', padding: '12px 16px', borderRadius: 10, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  <div style={{ color: '#94a3b8', marginBottom: 6 }}>{'// Current React State Machine:'}</div>
                  {['idle', 'loading', 'success', 'error'].map(st => (
                    <div key={st} style={{
                      color: s6State === st ? '#86efac' : '#475569',
                      fontWeight: s6State === st ? 'bold' : 'normal',
                      padding: '3px 0'
                    }}>
                      {s6State === st ? '👉 ' : '   '}{st.toUpperCase()}: {s6State === st ? 'ACTIVE ⚡' : 'idle'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rendered Output Box */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {s6State === 'idle' && (
                  <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                    <Server size={32} style={{ marginBottom: 6 }} />
                    <strong style={{ display: 'block', color: '#475569' }}>Awaiting API Call</strong>
                    <span style={{ fontSize: '0.8rem' }}>Click one of the fetch buttons to test</span>
                  </div>
                )}
                {s6State === 'loading' && (
                  <div style={{ textAlign: 'center', color: '#d97706' }}>
                    <div style={{ width: 32, height: 32, border: '3px solid #fef3c7', borderTop: '3px solid #d97706', borderRadius: '50%', margin: '0 auto 10px', animation: 'spin 1s linear infinite' }} />
                    <strong style={{ display: 'block' }}>Fetching Articles...</strong>
                    <span style={{ fontSize: '0.8rem', color: '#b45309' }}>Simulating 1.2s network latency</span>
                  </div>
                )}
                {s6State === 'error' && (
                  <div style={{ textAlign: 'center', color: '#dc2626' }}>
                    <AlertTriangle size={32} style={{ marginBottom: 6, color: '#ef4444' }} />
                    <strong style={{ display: 'block' }}>Network Error 500</strong>
                    <span style={{ fontSize: '0.82rem' }}>Failed to connect to JSONPlaceholder server</span>
                  </div>
                )}
                {s6State === 'success' && (
                  <div>
                    <h5 style={{ margin: '0 0 10px', color: '#166534', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem' }}>
                      <CheckCircle size={18} color="#10b981" /> {s6Posts.length} Posts Loaded Successfully
                    </h5>
                    <ul style={{ margin: 0, padding: '0 0 0 1.2rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {s6Posts.map(p => (
                        <li key={p.id} style={{ fontSize: '0.84rem', color: '#334155' }}>
                          <strong>{p.title}</strong> — <span style={{ color: '#64748b' }}>{p.author}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Summary Table */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '2.5rem 0 0.8rem' }}>
              Day 9 useEffect Master Cheat Sheet
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: 10 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Dependency Array</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>When does it run?</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Typical Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px' }}><code>useEffect(fn)</code></td>
                    <td style={{ padding: '10px 14px', color: '#b45309' }}>Mount + <strong>Every render</strong></td>
                    <td style={{ padding: '10px 14px' }}>Logging, DOM sizing checks (Use rarely)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f0fdf4' }}>
                    <td style={{ padding: '10px 14px' }}><code>useEffect(fn, [])</code></td>
                    <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: 700 }}>Mount <strong>ONLY ONCE</strong></td>
                    <td style={{ padding: '10px 14px' }}>Fetching initial API data, setting timers</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px' }}><code>useEffect(fn, [val])</code></td>
                    <td style={{ padding: '10px 14px', color: '#1d4ed8' }}>Mount + when <strong>val changes</strong></td>
                    <td style={{ padding: '10px 14px' }}>Search filter, fetching user by ID, syncing title</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px' }}><code>return () =&gt; &#123;...&#125;</code></td>
                    <td style={{ padding: '10px 14px', color: '#c2410c' }}>Before next run &amp; <strong>Unmount</strong></td>
                    <td style={{ padding: '10px 14px' }}><code>clearInterval()</code>, <code>removeEventListener()</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Test Your Knowledge (Quiz) <ArrowRight size={16} />
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
        <Section key="asgn" eyebrow="Hands-on Practice" title="Day 9 Assignment: Build with useEffect">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 Day 9 Mastery Challenge</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                Build these 3 hands-on mini projects to test your understanding of dependencies, cleanup timers, and API integration.
              </p>
            </div>

            {[
              { num: 1, icon: '⏱', title: 'Live Digital Clock with Cleanup', desc: 'Build a clock component that displays the current time (HH:MM:SS) and updates every second using setInterval inside useEffect. Implement proper return () => clearInterval(id) cleanup.', hint: 'Dependency array: []. Inside useEffect, start interval that updates new Date().toLocaleTimeString().' },
              { num: 2, icon: '🌐', title: 'GitHub User Search Card', desc: 'Create a component with an input box for a GitHub username. When the user submits, useEffect should fetch https://api.github.com/users/{username} and show the user avatar, bio, and repository count.', hint: 'State variables: username, userProfile, loading, error. Dependencies: [username].' },
              { num: 3, icon: '📜', title: 'Dynamic Browser Tab Title', desc: 'Build a counter or chat message simulator that updates document.title (e.g. "(3) New Notifications - My App") whenever notification count increments.', hint: 'useEffect(() => { document.title = `(${count}) New Notifications`; }, [count]);' },
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
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Ready for Day 10!</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Push your code solutions to your repository to complete Day 9.</p>
            </div>
          </div>
        </Section>
      )}

      <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
    </AnimatePresence>
  );
}
