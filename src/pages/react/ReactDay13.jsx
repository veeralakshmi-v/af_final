import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, CheckCircle, Code, ArrowRight,
  Copy, FileText, Plus, AlertTriangle, BookOpenCheck, Zap,
  GitBranch, RefreshCw, Sun, Moon, Sparkles, User, Palette,
  Settings, Award, RefreshCcw, Sliders, Layout, List
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

import { CodeBlock } from '../../utils/codeHighlight';

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay13({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('react_module13', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Section 1: State Lifting ── */
  const [liftedText, setLiftedText] = useState('Sync text...');

  /* ── Section 2: Redux vs Context ── */
  const [activeWorkflow, setActiveWorkflow] = useState('context');

  /* ── Capstone Task: Theme Switcher using Context API ── */
  const [themeMode, setThemeMode] = useState('light'); // light | dark | neon
  const themes = {
    light: {
      bg: '#ffffff',
      cardBg: '#f8fafc',
      border: '#e2e8f0',
      text: '#0f172a',
      subText: '#475569',
      accent: '#4f46e5',
      accentBg: '#eeebff'
    },
    dark: {
      bg: '#0f172a',
      cardBg: '#1e293b',
      border: '#334155',
      text: '#f8fafc',
      subText: '#94a3b8',
      accent: '#38bdf8',
      accentBg: '#0f385c'
    },
    neon: {
      bg: '#0b0f19',
      cardBg: '#111827',
      border: '#ec4899',
      text: '#39ff14',
      subText: '#e5e7eb',
      accent: '#f43f5e',
      accentBg: '#4c0519'
    }
  };
  const currentTheme = themes[themeMode];

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'What is prop drilling in React?',
      opts: [
        'A performance optimization technique',
        'Passing props down through multiple nested levels of child components that do not actually need the data themselves',
        'A way to save variables to localStorage',
        'A method of compiling JSX files'
      ], ans: 1,
      exp: 'Prop drilling occurs when you pass state down through mid-level wrapper components that only serve to route the data to a deeply nested target.' },
    { k: 'q2', q: 'What React hooks are used to create and consume Context?',
      opts: [
        'useState and useEffect',
        'createContext and useContext',
        'useRef and useMemo',
        'useReducer and useCallback'
      ], ans: 1,
      exp: 'React.createContext() initializes a context container, and the useContext(Context) hook reads current values from the nearest matching Provider.' },
    { k: 'q3', q: 'What is the primary drawback of using Context API for rapidly changing global states?',
      opts: [
        'Context cannot store objects or arrays',
        'Any change to the context value triggers a re-render of ALL consuming components, which can cause performance bottlenecks',
        'Context only works in class components',
        'Context requires installing Redux Toolkit'
      ], ans: 1,
      exp: 'Because Context does not support fine-grained selector optimizations natively, all components reading that context re-render whenever the value updates.' },
    { k: 'q4', q: 'When is Redux Toolkit (RTK) preferred over the Context API?',
      opts: [
        'For simple theme toggles or user profiles',
        'In small apps with fewer than 3 components',
        'For complex, highly active global states with frequent updates and structured actions tracking (e.g. e-commerce carts, undo/redo)',
        'When you want to avoid writing JavaScript code'
      ], ans: 2,
      exp: 'Redux provides centralized slice stores, action payloads dispatch trackers, and selector optimizations (like useSelector) to restrict renders to changing keys.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. STATE LIFTING ────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 13" title="State Lifting Recap">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🔄 Lifting State Up</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                When two sibling components need to share or synchronize data, they cannot talk to each other directly. Instead, we <strong>lift the state</strong> up to their nearest common parent component and pass it down as props.
              </p>
            </div>

            <CodeBlock title="State lifting hierarchy" code={`// Parent component holds the shared state
function Parent() {
  const [text, setText] = useState("");

  return (
    <div>
      <InputSibling text={text} onChange={setText} />
      <DisplaySibling text={text} />
    </div>
  );
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>⚡ Sibling Synchronization Simulator</h4>
            <p>Type in Sibling A. The state is lifted to their parent container and immediately passed down to Sibling B:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}>
                  <strong style={{ display: 'block', fontSize: '0.76rem', color: '#6366f1', textTransform: 'uppercase', marginBottom: 4 }}>Sibling A (Input Component)</strong>
                  <input className="form-control" value={liftedText} onChange={e => setLiftedText(e.target.value)} placeholder="Type here..." />
                </div>
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}>
                  <strong style={{ display: 'block', fontSize: '0.76rem', color: '#10b981', textTransform: 'uppercase', marginBottom: 4 }}>Sibling B (Display Component)</strong>
                  <span style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 600 }}>{liftedText || 'Empty state...'}</span>
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>Parent State Scope:</span>
                <span style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                  {"const [text, setText] = useState(\"" + liftedText + "\");"}
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

      {/* ── 2. CONTEXT API & useContext ──────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 13" title="The Context API">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>
              When components are nested 5 or 6 levels deep, passing state down as props gets tedious and cluttered. This is called **prop drilling**. Context API solves this by allowing components to broadcast values directly to deep children, bypassing intermediate parents.
            </p>

            <CodeBlock title="Context API setup" code={`import { createContext, useContext, useState } from "react";

// 1. Create context container
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    // 2. Wrap components in Provider to broadcast the state
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout />
    </ThemeContext.Provider>
  );
}

function DeepChildButton() {
  // 3. Read context directly from any nested child component
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme("dark")}>
      Theme is: {theme}
    </button>
  );
}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('multiple_states')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. GLOBAL STATE & REDUX TOOLKIT ─────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 13" title="Redux Toolkit & Global State">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#92400e' }}>⚠️ The Context Re-render Drawback</strong>
              <p style={{ margin: '4px 0 0', color: '#78350f', fontSize: '0.9rem' }}>
                Whenever a context provider's value changes, <strong>all child components that consume it are forced to re-render</strong>. For large apps with rapid state changes, this is a major performance bottleneck.
              </p>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Context API vs Redux Toolkit (RTK)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { name: 'Context API (Built-in)', points: ['✅ Built directly into React core', '✅ Perfect for static values (themes, profiles)', '⚠️ Triggers re-renders on all consumers', '⚠️ No structured action tracking logs'], color: '#6366f1', bg: '#eff6ff' },
                { name: 'Redux Toolkit (RTK)', points: ['📦 Extra setup (npm install @reduxjs/toolkit)', '✅ Optimized selectors re-render only target elements', '✅ Structured action history logs', '✅ Standard for complex enterprise states'], color: '#10b981', bg: '#f0fdf4' }
              ].map((c, i) => (
                <div key={i} style={{ background: c.bg, border: `2px solid ${c.color}33`, borderRadius: 12, padding: '1.25rem' }}>
                  <h4 style={{ color: c.color, fontWeight: 900, fontSize: '1rem', margin: '0 0 0.5rem 0' }}>{c.name}</h4>
                  {c.points.map((p, j) => <div key={j} style={{ fontSize: '0.85rem', color: '#374151', marginBottom: 3 }}>{p}</div>)}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {['context', 'redux'].map(type => (
                <button key={type} onClick={() => setActiveWorkflow(type)}
                  style={{ padding: '6px 18px', borderRadius: 8, border: '1.5px solid #6366f1', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                    background: activeWorkflow === type ? '#6366f1' : 'white', color: activeWorkflow === type ? 'white' : '#6366f1' }}>
                  {type === 'context' ? 'Context API flow' : 'Redux Toolkit code'}
                </button>
              ))}
            </div>

            {activeWorkflow === 'context' ? (
              <CodeBlock title="React Context Provider Hierarchy" code={`// Simple theme Context provider wrapper:
<ThemeContext.Provider value={{ theme, setTheme }}>
  <Navbar />
  <MainContent /> {/* Updates to theme re-renders everything below */}
</ThemeContext.Provider>`} />
            ) : (
              <CodeBlock title="Redux Toolkit Slice definition" code={`import { createSlice, configureStore } from "@reduxjs/toolkit";

// 1. Declare Slice with actions and initial values
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; }, // RTK allows mutable logic via Immer
  }
});

export const { increment } = counterSlice.actions;

// 2. Configure central Store
export const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});`} />
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. CAPSTONE TASK: THEME SWITCHER USING CONTEXT API ───────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Capstone Task • Day 13" title="Context Theme Switcher">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, color: 'white', margin: '0 0 0.4rem', fontSize: '1.2rem' }}>🎓 Theme Switcher Provider</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Simulating a Context Provider: select different themes to broadcast configuration objects directly to consumer cards below.
              </p>
            </div>

            {/* Simulated Provider settings controls */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { mode: 'light', label: '☀️ Sunset Light', color: '#f59e0b' },
                { mode: 'dark', label: '🌙 Midnight Dark', color: '#38bdf8' },
                { mode: 'neon', label: '⚡ Cyberpunk Neon', color: '#ec4899' }
              ].map(t => (
                <button key={t.mode} onClick={() => setThemeMode(t.mode)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '2px solid',
                    borderColor: themeMode === t.mode ? t.color : '#cbd5e1',
                    background: 'white',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                  <Palette size={14} color={t.color} /> {t.label}
                </button>
              ))}
            </div>

            {/* Broadcast output viewport */}
            <div style={{ background: currentTheme.bg, border: `2px solid ${currentTheme.border}`, borderRadius: 16, padding: '2rem', transition: 'all 0.3s ease' }}>
              
              {/* Card Title */}
              <h4 style={{ color: currentTheme.text, margin: '0 0 0.5rem', fontWeight: 800 }}>
                {themeMode === 'neon' ? 'SYSTEM SHUTDOWN ACTIVATED' : 'Academics Portal'}
              </h4>
              <p style={{ color: currentTheme.subText, fontSize: '0.88rem', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
                This card acts as a <code>ThemeContext.Consumer</code>. Styles are updated by reading variables from the nearest provider.
              </p>

              {/* Sibling card nodes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: 12, padding: '1rem' }}>
                  <span style={{ color: currentTheme.text, fontWeight: 700, display: 'block', fontSize: '0.9rem', marginBottom: 4 }}>Student Info</span>
                  <span style={{ color: currentTheme.subText, fontSize: '0.8rem' }}>Enrolled: React Day 13</span>
                </div>
                <div style={{ background: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: 12, padding: '1rem' }}>
                  <span style={{ color: currentTheme.text, fontWeight: 700, display: 'block', fontSize: '0.9rem', marginBottom: 4 }}>System Privileges</span>
                  <span style={{ color: currentTheme.subText, fontSize: '0.8rem' }}>Role: Admin Auditor</span>
                </div>
              </div>

              {/* Sample Action button */}
              <button style={{ background: currentTheme.accent, color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                Submit Theme Details
              </button>

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
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 13 Quiz — State Management">
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
        <Section key="asgn" eyebrow="Homework" title="Day 13 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 Day 13 Complete!</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                You've completed State Management topics including: lifting states, Context API providers, useContext hooks, and Redux Toolkit slices configurations.
              </p>
            </div>

            {[
              { num: 1, icon: '💡', title: 'ThemeContext Custom Provider', desc: 'Build a Context Provider that manages a theme state string. Export a custom useTheme hook to expose theme status fields directly to children.', hint: 'Create a separate themeContext.js file defining `ThemeContext.Provider`.' },
              { num: 2, icon: '🔑', title: 'User authentication context', desc: 'Create a UserContext managing logged-in user profile objects. Guard dashboard navigation actions by validating context logins status variables.', hint: 'Use `useContext(UserContext)` to toggle layouts between login forms and welcome cards.' },
              { num: 3, icon: '🛒', title: 'Redux Toolkit Store config', desc: 'Define a Redux Toolkit Slice managing shop cart items arrays. Declare actions to add/remove elements and select totals.', hint: 'Use createSlice() and configureStore() setup patterns.' },
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
