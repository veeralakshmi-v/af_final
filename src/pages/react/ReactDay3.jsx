import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Layers, Database, Sparkles, CheckCircle, ArrowRight, ArrowDown, Copy, FileText, Shield } from 'lucide-react';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const highlightJS = (code) => {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // Strings first (before HTML tags are inserted)
  html = html.replace(/(?<!=)(["'])(?:\\.|[^\n"'\\])*?\1/g, '<span style="color: #a5d6ff;">$&</span>');
  // Comments second
  html = html.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #8892b0;">$1</span>');
  const keywords = ['const', 'let', 'var', 'return', 'import', 'export', 'default', 'function', 'from', 'if', 'else', 'new'];
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b(${kw})\\b`, 'g');
    html = html.replace(reg, '<span style="color: #ff7b72; font-weight: bold;">$1</span>');
  });
  html = html.replace(/(&lt;[A-Z][a-zA-Z0-9]*)/g, '<span style="color: #7ee787;">$1</span>');
  html = html.replace(/(&lt;\/[A-Z][a-zA-Z0-9]*&gt;)/g, '<span style="color: #7ee787;">$1</span>');
  html = html.replace(/(&lt;[a-z]+)/g, '<span style="color: #79c0ff;">$1</span>');
  html = html.replace(/(&lt;\/[a-z]+&gt;)/g, '<span style="color: #79c0ff;">$1</span>');
  const hooks = ['useState', 'useEffect', 'useContext', 'createContext'];
  hooks.forEach(hook => {
    const reg = new RegExp(`\\b(${hook})\\b`, 'g');
    html = html.replace(reg, '<span style="color: #d18616; font-weight: bold;">$1</span>');
  });
  html = html.replace(/\b(props)\b/g, '<span style="color: #c084fc; font-weight: bold;">props</span>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const CodeBlock = ({ title, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflowX: 'auto', margin: '1.5rem 0', position: 'relative', width: '100%' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', left: 0 }}>
          <span>{title}</span>
          <button onClick={handleCopy} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
            <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.9rem', fontFamily: 'monospace', lineHeight: 1.5, whiteSpace: 'pre' }}>
        <code>{highlightJS(code)}</code>
      </pre>
    </div>
  );
};

// ─── Interactive Live Props Flow Visualizer ───────────────────────────────────
const PropFlowVisualizer = () => {
  const [propName, setPropName] = useState('John');
  const [propAge, setPropAge] = useState('25');
  const [showFlow, setShowFlow] = useState(false);

  const handleAnimate = () => {
    setShowFlow(false);
    setTimeout(() => setShowFlow(true), 100);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)', border: '1px solid #c7d2fe', borderRadius: '20px', padding: '2rem', margin: '2rem 0' }}>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4338ca', marginBottom: '1.5rem', textAlign: 'center' }}>
        🔄 Live Props Flow Visualizer
      </h4>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', display: 'block', marginBottom: '4px' }}>name prop</label>
          <input value={propName} onChange={e => setPropName(e.target.value)} style={{ padding: '8px 12px', border: '2px solid #818cf8', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: 'white', width: '140px' }} placeholder="Enter name..." />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', display: 'block', marginBottom: '4px' }}>age prop</label>
          <input value={propAge} onChange={e => setPropAge(e.target.value)} style={{ padding: '8px 12px', border: '2px solid #818cf8', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: 'white', width: '100px' }} placeholder="Age..." />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button onClick={handleAnimate} style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
            ▶ Pass Props
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <motion.div style={{ background: '#3730a3', color: 'white', padding: '1.25rem', borderRadius: '16px', minWidth: '180px', textAlign: 'center', boxShadow: '0 4px 15px rgba(67,56,202,0.35)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>📦</div>
          <div style={{ fontWeight: 800, fontSize: '1rem' }}>App (Parent)</div>
          <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div>&lt;Greeting</div>
            <div style={{ color: '#c4b5fd' }}>  name=<span style={{ color: '#a5d6ff' }}>"</span><span style={{ color: '#a5d6ff' }}>{propName}</span><span style={{ color: '#a5d6ff' }}>"</span></div>
            <div style={{ color: '#c4b5fd' }}>  age=<span style={{ color: '#fbbf24' }}>{'{' + propAge + '}'}</span></div>
            <div>/&gt;</div>
          </div>
        </motion.div>
        <AnimatePresence>
          {showFlow && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 700 }}>props →</div>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ height: '3px', width: '60px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '2px', transformOrigin: 'left' }} />
              <ArrowRight size={18} color="#6366f1" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showFlow && (
            <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ background: '#059669', color: 'white', padding: '1.25rem', borderRadius: '16px', minWidth: '180px', textAlign: 'center', boxShadow: '0 4px 15px rgba(5,150,105,0.35)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🧩</div>
              <div style={{ fontWeight: 800, fontSize: '1rem' }}>Greeting (Child)</div>
              <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
                Hello, {propName || '...'}! 👋<br />Age: {propAge || '?'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!showFlow && <p style={{ textAlign: 'center', color: '#6366f1', marginTop: '1rem', fontSize: '0.9rem' }}>Edit the values above and click <strong>▶ Pass Props</strong> to see data flow!</p>}
    </div>
  );
};

// ─── Props Drilling Interactive Flowchart ────────────────────────────────────
const PropsFlowChart = () => {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const nodes = [
    { id: 'app', label: 'App', desc: 'Root component holds the data (e.g., userName = "Alice"). Passes it down as props to ComponentA.' },
    { id: 'comp_a', label: 'ComponentA', desc: 'Receives props from App. Does NOT use the data itself. Just passes it further down to ComponentB.' },
    { id: 'comp_b', label: 'ComponentB', desc: 'Receives props from ComponentA. Still does not use it. Passes it one more level down to ComponentC.' },
    { id: 'comp_c', label: 'ComponentC 🎯', desc: 'Final destination! This component ACTUALLY USES the prop value to render: "Hello, Alice!"', isTarget: true },
  ];
  return (
    <div style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)', border: '1px solid #fbbf24', borderRadius: '20px', padding: '2rem', margin: '2rem 0' }}>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#92400e', marginBottom: '0.5rem', textAlign: 'center' }}>🕳️ Props Drilling — Interactive Flowchart</h4>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#78350f', marginBottom: '1.5rem' }}>Click each component to see what happens at that level</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {nodes.map((node, idx) => (
          <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveNodeId(activeNodeId === node.id ? null : node.id)}
              style={{
                background: activeNodeId === node.id ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : node.isTarget ? 'linear-gradient(135deg, #059669, #047857)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white', padding: '0.9rem 2rem', borderRadius: '14px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', minWidth: '220px', textAlign: 'center',
                border: activeNodeId === node.id ? '3px solid #a78bfa' : '3px solid transparent', transition: 'all 0.2s',
              }}
            >
              📦 {node.label}
              {idx > 0 && <span style={{ fontSize: '0.75rem', opacity: 0.8, display: 'block' }}>receives props ↓</span>}
            </motion.div>
            <AnimatePresence>
              {activeNodeId === node.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  style={{ background: 'white', border: '1px solid #c4b5fd', borderRadius: '12px', padding: '0.75rem 1.25rem', margin: '8px 0', maxWidth: '320px', fontSize: '0.85rem', color: '#4c1d95', lineHeight: 1.6, textAlign: 'center', boxShadow: '0 4px 15px rgba(124,58,237,0.15)' }}>
                  {node.desc}
                </motion.div>
              )}
            </AnimatePresence>
            {idx < nodes.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0' }}>
                <div style={{ width: '3px', height: '20px', background: 'linear-gradient(180deg, #6366f1, #8b5cf6)' }} />
                <ArrowDown size={16} color="#6366f1" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem', background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
        <strong style={{ color: '#92400e' }}>⚠️ Problem:</strong>
        <span style={{ color: '#78350f', fontSize: '0.9rem' }}> Middle components must pass props they don't even use. Solution: <strong>React Context API!</strong></span>
      </div>
    </div>
  );
};

// ─── Props vs State Comparison Table ────────────────────────────────────────
const PropsVsStateTable = () => {
  const rows = [
    { feature: 'Who sets it?', props: 'Parent component', state: 'Component itself' },
    { feature: 'Can it change?', props: 'No — Immutable (read-only)', state: 'Yes — using setState / useState' },
    { feature: 'Direction', props: 'Top-down (parent → child)', state: 'Local to the component' },
    { feature: 'Purpose', props: 'Pass data to children', state: 'Manage dynamic/interactive data' },
    { feature: 'When to use', props: 'For fixed or external values', state: 'For user interactions & events' },
    { feature: 'Re-renders', props: 'When parent re-renders', state: 'When state value changes' },
    { feature: 'Example', props: 'name="Alice", age={25}', state: 'count, isOpen, formInput' },
  ];
  return (
    <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={{ background: '#1e293b', color: 'white', padding: '12px 16px', textAlign: 'left' }}>Feature</th>
            <th style={{ background: '#3730a3', color: 'white', padding: '12px 16px', textAlign: 'left' }}>📦 Props</th>
            <th style={{ background: '#065f46', color: 'white', padding: '12px 16px', textAlign: 'left' }}>🔄 State</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr key={row.feature} whileHover={{ backgroundColor: '#f0f4ff' }} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white', cursor: 'default' }}>
              <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}>{row.feature}</td>
              <td style={{ padding: '12px 16px', color: '#3730a3', borderBottom: '1px solid #e2e8f0' }}>{row.props}</td>
              <td style={{ padding: '12px 16px', color: '#065f46', borderBottom: '1px solid #e2e8f0' }}>{row.state}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Immutability Interactive Demo ────────────────────────────────────────────
const ImmutabilityDemo = () => {
  const [showError, setShowError] = useState(false);
  const tryMutate = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };
  return (
    <div style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)', border: '1px solid #fecaca', borderRadius: '20px', padding: '1.75rem', margin: '2rem 0' }}>
      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#991b1b', marginBottom: '1rem' }}>🔒 Props Immutability — Interactive Demo</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: '200px', background: '#0f172a', borderRadius: '10px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#f8fafc', lineHeight: 1.7 }}>
          <div style={{ color: '#8892b0' }}>// Inside a child component:</div>
          <div><span style={{ color: '#ff7b72' }}>function</span> <span style={{ color: '#7ee787' }}>Child</span>(<span style={{ color: '#c084fc' }}>props</span>) {'{'}</div>
          <div style={{ paddingLeft: '1rem', color: '#f97316' }}>// ❌ This will cause an error!</div>
          <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#c084fc' }}>props</span>.name = <span style={{ color: '#a5d6ff' }}>"Bob"</span>;</div>
          <div style={{ paddingLeft: '1rem', color: '#8892b0' }}>// Props are read-only!</div>
          <div>{'}'}</div>
        </div>
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: 'white', border: '1px solid #fca5a5', borderRadius: '10px', padding: '1rem', fontSize: '0.88rem', color: '#374151' }}>
            <strong style={{ color: '#dc2626' }}>📌 Rule:</strong> A child component can NEVER modify the props it receives. Props flow in ONE direction only — parent → child.
          </div>
          <button onClick={tryMutate} style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>
            Try to Mutate Props
          </button>
          <AnimatePresence>
            {showError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                style={{ background: '#dc2626', color: 'white', borderRadius: '10px', padding: '10px 14px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                ❌ TypeError: Cannot assign to read-only property 'name'
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReactDay3({ activeTab, onNavigate }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('react_module3', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizQuestions = [
    { key: 'q1', question: 'What does "props" stand for in React?', options: ['Properties', 'Protocols', 'Proposals', 'Programs'], correct: 0 },
    { key: 'q2', question: 'Can a child component modify its own props?', options: ['Yes, using setState', 'Yes, directly', 'No, props are immutable', 'Only with useEffect'], correct: 2 },
    { key: 'q3', question: 'What is props destructuring used for?', options: ['To delete props', 'To extract specific values from props for cleaner code', 'To convert props to state', 'To merge two prop objects'], correct: 1 },
    { key: 'q4', question: 'What are Default Props used for?', options: ['To override existing props', 'To provide fallback values when no prop is passed from parent', 'To reset component state', 'To pass props upward'], correct: 1 },
    { key: 'q5', question: 'What is the main problem with Props Drilling?', options: ['Props become mutable', 'Intermediate components must carry props they do not need', 'It causes infinite loops', 'Props are lost in transit'], correct: 1 },
    { key: 'q6', question: 'Which React API solves Props Drilling?', options: ['useState', 'useReducer', 'React Context (createContext / useContext)', 'useRef'], correct: 2 },
    { key: 'q7', question: 'In which direction do props flow?', options: ['Bottom to top', 'Sideways between siblings', 'Top to bottom (parent → child)', 'Bidirectional'], correct: 2 },
  ];

  const handleQuizAnswer = (key, idx) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [key]: idx }));
  };

  const getQuizScore = () => quizQuestions.filter(q => quizAnswers[q.key] === q.correct).length;

  return (
    <div>

      {/* ── 1. INTRO TO PROPS ────────────────────────────────────────────── */}
      {activeTab === 'intro_props' && (
        <Section key="intro_props" id="intro_props" eyebrow="Module 01 • Day 3" title="Introduction to Props">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>📦 What are Props?</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white' }}>
                <strong>Props</strong> (short for <em>Properties</em>) are how React components communicate with each other.
                They allow a <strong>parent component</strong> to pass data and configuration to its <strong>child components</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                { icon: '🔽', title: 'Unidirectional Flow', desc: 'Props flow ONE way — from parent down to child. Never the other way.' },
                { icon: '🔒', title: 'Read-Only', desc: 'A child component cannot modify its own props. They are immutable.' },
                { icon: '🎯', title: 'Any Data Type', desc: 'Props can be strings, numbers, objects, arrays, booleans, or even functions.' },
                { icon: '⚡', title: 'Dynamic Rendering', desc: 'Props make components reusable by allowing different data on each render.' },
              ].map(item => (
                <div key={item.title} style={{ flex: '1 1 200px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.88rem', color: '#64748b' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🔑 Props as Function Arguments — Analogy</h3>
            <p>Think of props like arguments to a function. Just as you pass arguments to customize a function's behavior, you pass props to customize a component's output.</p>

            <CodeBlock title="Props Analogy — Function vs Component" code={`// Regular JavaScript function with arguments
function greet(name, age) {
  return "Hello, " + name + "! You are " + age;
}
greet("Alice", 25);

// React component with props — same concept!
function Greeting(props) {
  return <h1>Hello, {props.name}! You are {props.age}</h1>;
}

// Used in parent:
<Greeting name="Alice" age={25} />`} />

            <PropFlowVisualizer />

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem', marginTop: '1rem' }}>
              <strong style={{ color: '#166534' }}>💡 Key Points:</strong>
              <ul style={{ marginTop: '8px', color: '#14532d', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Props are <strong>passed by the parent</strong> — children only receive them</li>
                <li>Access inside component as <code>props.propName</code> or via destructuring</li>
                <li>Props enable <strong>component reuse</strong> with different data</li>
                <li>Props make your UI <strong>dynamic and configurable</strong></li>
              </ul>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '2rem' }} onClick={() => handleContinue('passing_props')}>
              Next: Passing Props <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── 2. PASSING PROPS ─────────────────────────────────────────────── */}
      {activeTab === 'passing_props' && (
        <Section key="passing_props" id="passing_props" eyebrow="Module 02 • Day 3" title="Passing Props">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Passing props is how parent components send data to child components. You pass props like HTML attributes on a JSX element.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📌 Passing Props from Parent (App.jsx)</h3>
            <CodeBlock title="App.jsx (Parent)" code={`import React from 'react';
import Greeting from './Greeting';

function App() {
  return (
    <div>
      {/* Passing string prop — no curly braces needed */}
      <Greeting name="Alice" />

      {/* Passing number — use curly braces for non-strings */}
      <Greeting name="Bob" age={30} />

      {/* Passing boolean prop */}
      <Greeting name="Charlie" isStudent={true} />

      {/* Passing object prop */}
      <Greeting name="Diana" info={{ city: "Chennai", score: 95 }} />
    </div>
  );
}

export default App;`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📌 Receiving Props in Child (Greeting.jsx)</h3>
            <CodeBlock title="Greeting.jsx (Child)" code={`import React from 'react';

function Greeting(props) {
  return (
    <div>
      <h2>Hello, {props.name}! 👋</h2>
      <p>Age: {props.age}</p>
      <p>Is Student: {props.isStudent ? "Yes" : "No"}</p>
      <p>City: {props.info ? props.info.city : "N/A"}</p>
    </div>
  );
}

export default Greeting;`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🎯 Passing Functions as Props</h3>
            <p>You can also pass functions as props — this allows child components to trigger actions in the parent.</p>
            <CodeBlock title="Passing a Function as Prop" code={`// Parent: App.jsx
function App() {
  const handleClick = (message) => {
    alert("Child says: " + message);
  };

  return <Button onClick={handleClick} label="Click Me!" />;
}

// Child: Button.jsx
function Button(props) {
  return (
    <button onClick={() => props.onClick("Hello from Button!")}>
      {props.label}
    </button>
  );
}

export default Button;`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔑 Rules for Passing Props</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { rule: 'String values can be passed without curly braces', example: 'name="Alice"' },
                { rule: 'Non-string values (numbers, booleans, arrays, objects, functions) need curly braces', example: 'age={25} active={true} items={[1,2,3]}' },
                { rule: 'A prop with no value defaults to true', example: 'isActive   (same as isActive={true})' },
                { rule: 'Any valid JavaScript expression can go inside {}', example: 'value={a + b} label={name.toUpperCase()}' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ background: '#4f46e5', color: 'white', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.rule}</div>
                    <code style={{ fontSize: '0.85rem', color: '#7c3aed', background: '#f3f0ff', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>{item.example}</code>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '2rem' }} onClick={() => handleContinue('props_destructuring')}>
              Next: Props Destructuring <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── 3. PROPS DESTRUCTURING ───────────────────────────────────────── */}
      {activeTab === 'props_destructuring' && (
        <Section key="props_destructuring" id="props_destructuring" eyebrow="Module 03 • Day 3" title="Props Destructuring">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>
              <strong>Props destructuring</strong> is a JavaScript ES6 feature that allows you to extract specific values from the <code>props</code> object directly in the function parameter.
              This makes your code <strong>cleaner, shorter, and easier to read</strong>.
            </p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📊 Before vs After Destructuring</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.6rem 1rem', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#dc2626' }}>❌ Without Destructuring</div>
                <CodeBlock title="Greeting.jsx" code={`function Greeting(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
      <p>{props.city}</p>
      <p>{props.course}</p>
    </div>
  );
}`} />
              </div>
              <div>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.6rem 1rem', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#15803d' }}>✅ With Destructuring</div>
                <CodeBlock title="Greeting.jsx" code={`function Greeting({ name, age, city, course }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
      <p>{city}</p>
      <p>{course}</p>
    </div>
  );
}`} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔧 Method 1: Destructure in Function Parameter</h3>
            <CodeBlock title="Destructure in parameter — most common" code={`// Directly destructure in the parameter list
function UserCard({ name, age, email, isAdmin }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      {isAdmin && <span>Admin Badge</span>}
    </div>
  );
}

// Used in parent:
<UserCard name="Alice" age={28} email="alice@mail.com" isAdmin={true} />`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔧 Method 2: Destructure Inside Function Body</h3>
            <CodeBlock title="Destructure inside body" code={`function UserCard(props) {
  // Destructure inside the function body
  const { name, age, email } = props;

  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{email}</p>
    </div>
  );
}`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔧 Destructuring with Default Values</h3>
            <CodeBlock title="Destructure with default fallback values" code={`function Greeting({ name = "Guest", age = 0, role = "User" }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// Parent passes only name — age and role use their defaults
<Greeting name="Alice" />`} />

            <div style={{ background: '#faf5ff', border: '1px solid #d8b4fe', borderRadius: '12px', padding: '1.25rem', marginTop: '1rem' }}>
              <strong style={{ color: '#7e22ce' }}>💡 Why use Destructuring?</strong>
              <ul style={{ marginTop: '8px', color: '#6b21a8', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Shorter code — no need to repeat <code>props.</code> every time</li>
                <li>Clear function signature — see all required props at a glance</li>
                <li>Easy to add default values inline</li>
                <li>Modern JavaScript (ES6+) best practice</li>
              </ul>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '2rem' }} onClick={() => handleContinue('default_props')}>
              Next: Default Props <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── 4. DEFAULT PROPS ─────────────────────────────────────────────── */}
      {activeTab === 'default_props' && (
        <Section key="default_props" id="default_props" eyebrow="Module 04 • Day 3" title="Default Props">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>📌 What are Default Props?</h3>
              <p style={{ opacity: 0.95, lineHeight: 1.7, color: 'white' }}>
                Default Props allow us to configure the behavior of a child component in the absence of defined, but not received properties by
                setting up a <strong>default value</strong> that will be used in case a certain prop will not be passed down from a parent.
              </p>
              <p style={{ opacity: 0.9, marginTop: '0.75rem', fontStyle: 'italic', color: 'white' }}>
                Default props are used when no value is passed from parent.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔧 Method 1: Using .defaultProps</h3>
            <CodeBlock title="Greeting.jsx — using .defaultProps" code={`import React from 'react';

function Greeting({ name, age, course }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Age: {age}</p>
      <p>Course: {course}</p>
    </div>
  );
}

// Define default prop values below the component
Greeting.defaultProps = {
  name: "Guest",
  age: 18,
  course: "React Basics",
};

export default Greeting;

// In parent — not passing any props:
// <Greeting /> → renders: "Hello, Guest! Age: 18, Course: React Basics"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔧 Method 2: Default Values in Destructuring (Modern)</h3>
            <CodeBlock title="Greeting.jsx — destructuring defaults" code={`import React from 'react';

// Modern approach: set defaults directly in destructuring parameters
function Greeting({ name = "Guest", age = 18, course = "React Basics" }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Age: {age}</p>
      <p>Course: {course}</p>
    </div>
  );
}

export default Greeting;`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🎯 Prop Provided vs Not Provided</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#166534', marginBottom: '0.75rem' }}>✅ Prop Provided</div>
                <code style={{ fontSize: '0.85rem', background: '#dcfce7', padding: '4px 8px', borderRadius: '4px', display: 'block', marginBottom: '8px' }}>&lt;Greeting name="Alice" /&gt;</code>
                <p style={{ color: '#14532d', fontSize: '0.9rem', margin: 0 }}>Output: <strong>Hello, Alice!</strong><br />(uses passed prop value)</p>
              </div>
              <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#1e40af', marginBottom: '0.75rem' }}>🔵 No Prop Passed</div>
                <code style={{ fontSize: '0.85rem', background: '#dbeafe', padding: '4px 8px', borderRadius: '4px', display: 'block', marginBottom: '8px' }}>&lt;Greeting /&gt;</code>
                <p style={{ color: '#1e3a8a', fontSize: '0.9rem', margin: 0 }}>Output: <strong>Hello, Guest!</strong><br />(uses default prop value)</p>
              </div>
            </div>

            <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '12px', padding: '1.25rem' }}>
              <strong style={{ color: '#713f12' }}>⚡ Key Rule:</strong>
              <span style={{ color: '#78350f' }}> When a parent passes a prop, it <strong>overrides</strong> the default. When no value is passed, the default is used. Passed value always wins!</span>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '2rem' }} onClick={() => handleContinue('props_drilling')}>
              Next: Props Drilling <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── 5. PROPS DRILLING ────────────────────────────────────────────── */}
      {activeTab === 'props_drilling' && (
        <Section key="props_drilling" id="props_drilling" eyebrow="Module 05 • Day 3" title="Props Drilling">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>🕳️ What is Props Drilling?</h3>
              <p style={{ opacity: 0.95, lineHeight: 1.7, color: 'white' }}>
                Props drilling happens when data needs to be passed through <strong>multiple levels</strong> of nested components,
                even though the intermediate components don't need that data — they just pass it along.
              </p>
            </div>

            <PropsFlowChart />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📄 Program 1: with_drill.jsx — Props Drilling Example</h3>
            <p>The data <code>userName</code> lives in App. ComponentA and ComponentB just carry it along. Only ComponentC uses it.</p>

            <CodeBlock title="with_drill.jsx — Full Program" code={`import React from 'react';

// ComponentC — the ONLY one that actually uses the prop
function ComponentC({ userName }) {
  return (
    <div style={{ padding: "10px", border: "2px solid green", margin: "5px" }}>
      <h4>Component C</h4>
      <p>Hello from the deepest level! User: <strong>{userName}</strong></p>
    </div>
  );
}

// ComponentB — receives the prop but just passes it forward
function ComponentB({ userName }) {
  return (
    <div style={{ padding: "10px", border: "2px solid blue", margin: "5px" }}>
      <h4>Component B</h4>
      <ComponentC userName={userName} />
    </div>
  );
}

// ComponentA — receives the prop but just passes it forward
function ComponentA({ userName }) {
  return (
    <div style={{ padding: "10px", border: "2px solid orange", margin: "5px" }}>
      <h4>Component A</h4>
      <ComponentB userName={userName} />
    </div>
  );
}

// App — the ROOT that holds the data
function App() {
  const userName = "Alice";

  return (
    <div style={{ padding: "20px", border: "2px solid red", margin: "5px" }}>
      <h2>App (Root) — data lives here</h2>
      <ComponentA userName={userName} />
    </div>
  );
}

export default App;`} />

            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1.25rem', margin: '1.5rem 0' }}>
              <strong style={{ color: '#991b1b' }}>⚠️ Problems with Prop Drilling:</strong>
              <ul style={{ paddingLeft: '1.5rem', color: '#7f1d1d', lineHeight: 2, marginTop: '8px' }}>
                <li>ComponentA and ComponentB <strong>don't need</strong> userName — they just carry it</li>
                <li>As the app grows with more levels, it becomes <strong>harder to maintain</strong></li>
                <li>Renaming or removing props requires editing <strong>every intermediate file</strong></li>
                <li>Code becomes tightly coupled and <strong>difficult to refactor</strong></li>
              </ul>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>✅ Program 2: using_context.jsx — Solving Prop Drilling with Context API</h3>
            <p>React Context allows you to share data across the entire component tree <strong>without passing props at every level</strong>.</p>

            <CodeBlock title="using_context.jsx — Full Program" code={`import React, { createContext, useContext } from 'react';

// Step 1: Create a Context object
const UserContext = createContext();

// ComponentC — directly reads from Context (no props needed!)
function ComponentC() {
  const userName = useContext(UserContext); // reads context value
  return (
    <div style={{ padding: "10px", border: "2px solid green", margin: "5px" }}>
      <h4>Component C</h4>
      <p>User (via Context): <strong>{userName}</strong></p>
    </div>
  );
}

// ComponentB — no props passed or received at all!
function ComponentB() {
  return (
    <div style={{ padding: "10px", border: "2px solid blue", margin: "5px" }}>
      <h4>Component B</h4>
      <ComponentC />
    </div>
  );
}

// ComponentA — no props passed or received at all!
function ComponentA() {
  return (
    <div style={{ padding: "10px", border: "2px solid orange", margin: "5px" }}>
      <h4>Component A</h4>
      <ComponentB />
    </div>
  );
}

// App — wraps everything inside the Context Provider
function App() {
  const userName = "Alice";

  return (
    // Step 2: Wrap with Provider and pass the value
    <UserContext.Provider value={userName}>
      <div style={{ padding: "20px", border: "2px solid red", margin: "5px" }}>
        <h2>App (Root)</h2>
        <ComponentA />
      </div>
    </UserContext.Provider>
  );
}

export default App;`} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#991b1b', marginBottom: '0.5rem' }}>❌ with_drill.jsx</div>
                <ul style={{ paddingLeft: '1.2rem', color: '#7f1d1d', fontSize: '0.9rem', lineHeight: 1.9 }}>
                  <li>Props passed at every level</li>
                  <li>Middle components cluttered</li>
                  <li>Hard to maintain at scale</li>
                </ul>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#166534', marginBottom: '0.5rem' }}>✅ using_context.jsx</div>
                <ul style={{ paddingLeft: '1.2rem', color: '#14532d', fontSize: '0.9rem', lineHeight: 1.9 }}>
                  <li>Data accessible anywhere in tree</li>
                  <li>No intermediate passing needed</li>
                  <li>Cleaner, scalable architecture</li>
                </ul>
              </div>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '1rem' }} onClick={() => handleContinue('immutable_props')}>
              Next: Immutable Props <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── 6. IMMUTABLE PROPS ───────────────────────────────────────────── */}
      {activeTab === 'immutable_props' && (
        <Section key="immutable_props" id="immutable_props" eyebrow="Module 06 • Day 3" title="Immutable Props">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>🔒 What does Immutable mean?</h3>
              <p style={{ opacity: 0.95, lineHeight: 1.7, color: 'white' }}>
                In React, props are <strong>immutable</strong> — meaning a child component <strong>cannot modify</strong> the props it receives from its parent.
                Props are <strong>read-only</strong>. This is a core design principle in React.
              </p>
            </div>

            <ImmutabilityDemo />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>❌ Wrong — Trying to Mutate Props</h3>
            <CodeBlock title="Wrong approach — mutating props causes an error" code={`function Child(props) {
  // ❌ This is WRONG — React will throw a TypeError
  props.name = "Bob"; // Cannot assign to read-only property!

  return <h1>{props.name}</h1>;
}

// React enforces immutability of props.`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>✅ Correct — Copy the Prop into Local State</h3>
            <p>If the child needs to change a value, copy the prop into <code>useState</code> and manage it locally.</p>
            <CodeBlock title="Correct — use local state to hold a modifiable copy" code={`import React, { useState } from 'react';

function Child({ initialName }) {
  // ✅ Copy the prop into local state — now you can change it!
  const [name, setName] = useState(initialName);

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={() => setName("Bob")}>
        Change Name
      </button>
    </div>
  );
}

// Parent passes the initial value
<Child initialName="Alice" />`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🧠 Why are Props Immutable?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '🔮', title: 'Predictability', desc: 'Data flows in one direction only (parent → child). If props could change inside a child, the UI would behave unpredictably.' },
                { icon: '🐛', title: 'Easier Debugging', desc: 'When you know props never change inside a component, it is easier to trace bugs. The data source is always the parent.' },
                { icon: '⚡', title: 'Performance', desc: 'React can optimize re-renders efficiently because it knows props only change when the parent re-renders.' },
                { icon: '🏗️', title: 'Pure Components', desc: 'React encourages "pure" components — given the same props, a component always renders the same output. Immutability makes this possible.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.title}</div>
                    <div style={{ fontSize: '0.9rem', color: '#475569' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '2rem' }} onClick={() => handleContinue('props_vs_state')}>
              Next: Props vs State <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── 7. PROPS VS STATE ────────────────────────────────────────────── */}
      {activeTab === 'props_vs_state' && (
        <Section key="props_vs_state" id="props_vs_state" eyebrow="Module 07 • Day 3" title="Props vs State">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Understanding the difference between <strong>Props</strong> and <strong>State</strong> is one of the most fundamental concepts in React. They serve different purposes.</p>

            <PropsVsStateTable />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🎯 Props in Action</h3>
            <CodeBlock title="Props — data passed from outside" code={`// Parent decides the card content via props
function ProductCard({ name, price, inStock }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <p>{inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>
    </div>
  );
}

// Reuse the same component with different props
<ProductCard name="Laptop" price={55000} inStock={true} />
<ProductCard name="Phone" price={15000} inStock={false} />`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔄 State in Action</h3>
            <CodeBlock title="State — data managed internally by the component" code={`import React, { useState } from 'react';

// Component manages its own count internally
function Counter() {
  const [count, setCount] = useState(0); // internal state

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+ Increment</button>
      <button onClick={() => setCount(count - 1)}>- Decrement</button>
    </div>
  );
}

<Counter /> // No props needed — fully self-managed`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🔑 Using Both Together</h3>
            <CodeBlock title="Props + State working together" code={`import React, { useState } from 'react';

// Receives initial value via props, manages changes with state
function LikeButton({ initialLikes, productName }) {
  const [likes, setLikes] = useState(initialLikes); // init from prop

  return (
    <div>
      <h3>{productName}</h3>
      <button onClick={() => setLikes(likes + 1)}>
        ❤️ Like ({likes})
      </button>
    </div>
  );
}

// Parent passes initial value — component manages the rest
<LikeButton productName="React Course" initialLikes={42} />`} />

            <div style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)', border: '1px solid #c7d2fe', borderRadius: '16px', padding: '1.5rem', margin: '1.5rem 0' }}>
              <h4 style={{ fontWeight: 800, color: '#3730a3', marginBottom: '1rem' }}>🧠 Quick Decision Guide</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { q: 'Is the data passed from parent?', a: '→ Use Props', color: '#4338ca' },
                  { q: 'Does the component control this data itself?', a: '→ Use State', color: '#059669' },
                  { q: 'Should the data stay the same once set?', a: '→ Use Props', color: '#4338ca' },
                  { q: 'Does the data change due to user interactions?', a: '→ Use State', color: '#059669' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderRadius: '10px', padding: '12px 16px', border: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#374151', fontWeight: 600 }}>{item.q}</span>
                    <span style={{ color: item.color, fontWeight: 800, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{item.a}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '1rem' }} onClick={() => handleContinue('quiz')}>
              Next: Quiz <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── 8. QUIZ ──────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Assessment" title="Day 3 Quiz: React Props">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map((q, qIdx) => (
                <div key={q.key} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>Q{qIdx + 1}: {q.question}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.key] === optIdx;
                      const isCorrect = optIdx === q.correct;
                      let bg = '#ffffff', border = '1px solid #cbd5e1', color = '#334155';
                      if (quizChecked) {
                        if (isCorrect) { bg = '#f0fdf4'; border = '2px solid #22c55e'; color = '#166534'; }
                        else if (isSelected && !isCorrect) { bg = '#fef2f2'; border = '2px solid #ef4444'; color = '#991b1b'; }
                      } else if (isSelected) { bg = '#eff6ff'; border = '2px solid #3b82f6'; color = '#1d4ed8'; }
                      return (
                        <div key={optIdx} onClick={() => handleQuizAnswer(q.key, optIdx)}
                          style={{ background: bg, border, borderRadius: '10px', padding: '10px 14px', cursor: quizChecked ? 'default' : 'pointer', color, fontWeight: isSelected || (quizChecked && isCorrect) ? 700 : 400, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0 }}>
                            {quizChecked && isCorrect ? '✓' : quizChecked && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + optIdx)}
                          </span>
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {!quizChecked ? (
              <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '2rem' }} onClick={() => setQuizChecked(true)}>
                <CheckCircle size={16} /> Submit Quiz
              </button>
            ) : (
              <div style={{ marginTop: '2rem', background: getQuizScore() >= 6 ? '#f0fdf4' : '#fef9c3', border: `2px solid ${getQuizScore() >= 6 ? '#22c55e' : '#f59e0b'}`, borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{getQuizScore() >= 6 ? '🎉' : '📚'}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: getQuizScore() >= 6 ? '#15803d' : '#92400e' }}>{getQuizScore()} / {quizQuestions.length} Correct</div>
                <div style={{ color: '#374151', marginTop: '0.5rem' }}>
                  {getQuizScore() >= 6 ? 'Excellent! You have mastered React Props! 🚀' : 'Good try! Review the sections above and retry.'}
                </div>
                <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', marginTop: '1.25rem' }} onClick={() => handleContinue('assignment')}>
                  Next: Assignment <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── 9. ASSIGNMENT ────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 3 Assignment: Props">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem', color: 'white' }}>📋 Day 3 Homework Tasks</h3>
              <p style={{ opacity: 0.9, color: 'white' }}>Complete all three tasks to reinforce your understanding of React Props.</p>
            </div>
            {[
              { num: 1, title: 'Student Profile Card', icon: '🎓', desc: 'Create a StudentCard component that receives name, rollNo, department, and percentage as props. Render a styled card using those props. Create at least 3 different StudentCard instances in App.jsx with different student data.', hint: 'Use props destructuring for clean, readable code!' },
              { num: 2, title: 'Default Props Practice', icon: '🔘', desc: 'Create a Button component that accepts label, color, and size as props. Set default values: label = "Click Me", color = "blue", size = "medium". Use the Button with and without passing props — observe defaults in action.', hint: 'Use Greeting.defaultProps = {...} or destructuring defaults.' },
              { num: 3, title: 'Mini Context App', icon: '🌐', desc: 'Build a 3-level nested component structure: App → Parent → Child → GrandChild. Store a theme value ("dark" or "light") using React Context. Access it in GrandChild without passing props through Parent and Child.', hint: 'Use createContext() and useContext() — no prop drilling!' },
            ].map(task => (
              <div key={task.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{task.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>Task {task.num}: {task.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 0.75rem' }}>{task.desc}</p>
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', color: '#1d4ed8' }}>
                      💡 Hint: {task.hint}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '12px', padding: '1.25rem', marginTop: '0.5rem' }}>
              <strong style={{ color: '#713f12' }}>⭐ Bonus Challenge:</strong>
              <span style={{ color: '#78350f' }}> Extend the Props Drilling example to 5 levels. First solve it with prop drilling, then refactor using Context API. Compare the two approaches and note the differences.</span>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
