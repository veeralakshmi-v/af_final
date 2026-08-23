import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Database, Sparkles, RefreshCw, Settings, CheckCircle, Code, ArrowRight, Info, Play, Trash2, Cpu, Laptop, Terminal, Copy, FileText } from 'lucide-react';
import componentTreeImg from '../../assets/react_component_tree.png';
import virtualDomImg from '../../assets/react_virtual_dom.png';

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

  // Comments: // (lookbehind check to avoid URL protocol or quoted paths matching) or /* */
  html = html.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #8892b0;">$1</span>');
  // Shell comments
  html = html.replace(/(#[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');

  // String literals
  html = html.replace(/(["'])([\s\S]*?)\1/g, '<span style="color: #a5d6ff;">$1$2$1</span>');

  // Keywords
  const keywords = ['const', 'let', 'var', 'return', 'import', 'export', 'default', 'function', 'from', 'class', 'extends', 'if', 'else', 'new', 'cd', 'npm'];
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b(${kw})\\b`, 'g');
    html = html.replace(reg, '<span style="color: #ff7b72; font-weight: bold;">$1</span>');
  });

  // HTML/JSX elements
  html = html.replace(/(&lt;[A-Z][a-zA-Z0-9]*)/g, '<span style="color: #7ee787;">$1</span>');
  html = html.replace(/(&lt;\/[A-Z][a-zA-Z0-9]*&gt;)/g, '<span style="color: #7ee787;">$1</span>');
  html = html.replace(/(&lt;[a-z]+)/g, '<span style="color: #79c0ff;">$1</span>');
  html = html.replace(/(&lt;\/[a-z]+&gt;)/g, '<span style="color: #79c0ff;">$1</span>');

  // React hooks
  const hooks = ['useState', 'useEffect', 'useContext'];
  hooks.forEach(hook => {
    const reg = new RegExp(`\\b(${hook})\\b`, 'g');
    html = html.replace(reg, '<span style="color: #d18616; font-weight: bold;">$1</span>');
  });

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
    <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflowX: 'auto', margin: '1.5rem 0', position: 'relative', width: '100%', maxWidth: '100%' }}>
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

export default function ReactDay1({ activeTab, onNavigate }) {
  const [newItem, setNewItem] = useState('');
  const [updatesLog, setUpdatesLog] = useState([]);
  const [vdomList, setVdomList] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [activeLifecycleStage, setActiveLifecycleStage] = useState('mounting');
  const [zoomedImage, setZoomedImage] = useState(null);
  const [vdomStep, setVdomStep] = useState(1);
  
  // JSX Playground states
  const [jsxUserText, setJsxUserText] = useState('Student');
  const [jsxBtnColor, setJsxBtnColor] = useState('#6366f1');
  
  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('react_module1', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddVdomItem = () => {
    if (!newItem.trim()) return;
    const oldList = [...vdomList];
    const newList = [...vdomList, newItem.trim()];
    
    const logs = [];
    logs.push(`[Virtual DOM Snapshot]: Created new virtual tree representation.`);
    logs.push(`[VDOM Comparison]: Diffing old tree (${oldList.length} nodes) vs new tree (${newList.length} nodes).`);
    logs.push(`[VDOM Reconciliation]: Identified single new element "${newItem.trim()}" at index ${oldList.length}.`);
    logs.push(`[DOM Sync]: Patched changed node to Actual DOM without full page refresh.`);
    
    setVdomList(newList);
    setUpdatesLog(logs);
    setNewItem('');
  };

  const handleClearVdomItems = () => {
    setVdomList([]);
    setUpdatesLog([
      `[Virtual DOM Snapshot]: Empty tree generated.`,
      `[VDOM Comparison]: Identified removal of all children nodes.`,
      `[DOM Sync]: Cleared container elements inside Actual DOM.`
    ]);
  };

  const handleQuizAnswer = (key, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [key]: optionIdx }));
  };

  const quizQuestions = [
    {
      key: 'q1',
      question: 'Who originally developed React?',
      options: [
        'Google',
        'Facebook',
        'Microsoft',
        'Twitter'
      ],
      correct: 1,
      explanation: 'React was originally developed by Facebook and is now maintained by Facebook and Instagram developers, along with contributions from the open-source community.'
    },
    {
      key: 'q2',
      question: 'What is JSX in React?',
      options: [
        'A stylesheet extension for styling components.',
        'A database query format for state values.',
        'A syntax extension that allows writing HTML-like code within JavaScript files.',
        'A package manager command script.'
      ],
      correct: 2,
      explanation: 'JSX (JavaScript XML) is a syntax extension that allows writing HTML-like code within JavaScript files, keeping markup and UI logic together.'
    },
    {
      key: 'q3',
      question: 'In which lifecycle phase is the componentWillUnmount method called?',
      options: [
        'Initialization Phase',
        'Mounting Phase',
        'Updating Phase',
        'Unmounting Phase'
      ],
      correct: 3,
      explanation: 'The componentWillUnmount() method is called immediately before a component is unmounted and destroyed from the browser DOM.'
    }
  ];

  return (
    <AnimatePresence mode="wait">
      
      {/* 1. INTRODUCTION */}
      {activeTab === 'intro_react' && (
        <Section key="intro_react" id="intro_react" eyebrow="React JS • Module 01" title="Introduction to React">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '1.5rem' }}>
              React, also known as ReactJS or React.js, is a JavaScript library for front-end development. It was originally developed by Facebook and is now maintained by Facebook and Instagram developers, along with contributions from the open-source community.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, margin: '2rem 0 1rem 0' }}>Why We Use React</h3>
            <p>We use React to address the challenges of building modern, dynamic, and high-performance web applications. Key reasons and benefits include:</p>

            <div className="grid-2col" style={{ margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Layers size={18} /> Component-Based Architecture</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>
                  React encourages breaking down the UI into independent, reusable components, which makes the codebase easier to manage, test, and scale for large applications.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Database size={18} /> Performance with the Virtual DOM</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>
                  Instead of updating the entire browser's Document Object Model (DOM) when data changes (which is slow), React uses a Virtual DOM. It calculates the minimal number of changes needed and updates only those specific parts in the real DOM.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Code size={18} /> JSX (JavaScript XML)</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>
                  React uses JSX, a syntax extension that allows writing HTML-like code within JavaScript files. This makes the code more readable and keeps the UI logic and markup close together.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Sparkles size={18} /> Efficiency and Productivity</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>
                  The ability to reuse components and the one-way data flow (passing data down via props) significantly boosts developer productivity and ensures better code stability.
                </p>
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('react_vs_traditional')}>
              Next: React vs Traditional JS <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 2. REACT VS TRADITIONAL JS */}
      {activeTab === 'react_vs_traditional' && (
        <Section key="react_vs_traditional" id="react_vs_traditional" eyebrow="React JS • Module 02" title="React vs Traditional JS">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Traditional JavaScript applications directly manipulate the browser's Document Object Model (DOM) to update the interface. In contrast, React utilizes a lightweight copy of the DOM (Virtual DOM) in memory to run reconciliation checks before updating elements.
            </p>

            <div className="grid-2col" style={{ margin: '2rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ color: '#ef4444', fontWeight: 800, marginTop: 0, marginBottom: '0.8rem', fontSize: '1.15rem' }}>
                  Real (Actual) DOM
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#475569' }}>
                  <li>Real DOM is the actual structure represented in the User Interface.</li>
                  <li>The Real DOM (Document Object Model) represents the structure of an HTML document in the form of a tree, where each node corresponds to an element in the document.</li>
                  <li>Direct updates to the Real DOM are slow and force the browser to recalculate element sizes, coordinates, and trigger a repaint of the page layout.</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ color: '#10b981', fontWeight: 800, marginTop: 0, marginBottom: '0.8rem', fontSize: '1.15rem' }}>
                  Virtual DOM
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#475569' }}>
                  <li>A virtual DOM object is the same as a real DOM object, except that it is a lightweight copy.</li>
                  <li>This means that it cannot manipulate on-screen elements.</li>
                  <li>Moreover, upon any change of a property, it only updates the corresponding nodes and not the entire tree.</li>
                </ul>
              </div>
            </div>

            {/* Feature Comparison Table */}
            <h4 style={{ color: '#1e293b', marginBottom: '0.8rem', fontWeight: 700, fontSize: '1.1rem' }}>📊 Feature Comparison Table</h4>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                    <th style={{ padding: '0.6rem 1rem', color: '#1e293b' }}>Feature</th>
                    <th style={{ padding: '0.6rem 1rem', color: '#ef4444' }}>Real (Actual) DOM</th>
                    <th style={{ padding: '0.6rem 1rem', color: '#10b981' }}>Virtual DOM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>Nature</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Actual UI elements rendered on screen</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Lightweight JavaScript object in memory</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>Updates Speed</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Slower (triggers layout reflow &amp; repaint)</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Faster (modifies memory objects instantly)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>Direct UI Access</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Directly updates elements on screen</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Cannot alter on-screen elements directly</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>Efficiency</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Rebuilds entire element tree / large sections</td>
                    <td style={{ padding: '0.6rem 1rem' }}>Diffing algorithm updates only changed nodes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Explanation Workflow Diagram */}
            <h4 style={{ color: '#1e293b', marginBottom: '0.8rem', fontWeight: 700, fontSize: '1.1rem' }}>🗺️ Virtual DOM Update Workflow Diagram</h4>
            <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              Click through the steps below to see how state changes trigger Virtual DOM diffing and update the Real DOM efficiently:
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                {[
                  { id: 1, label: '1. State Change' },
                  { id: 2, label: '2. New VDOM' },
                  { id: 3, label: '3. Diffing' },
                  { id: 4, label: '4. Reconciliation' },
                  { id: 5, label: '5. Real DOM Patch' },
                ].map(step => (
                  <button
                    key={step.id}
                    onClick={() => setVdomStep(step.id)}
                    style={{
                      padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                      background: vdomStep === step.id ? '#2563eb' : '#e2e8f0',
                      color: vdomStep === step.id ? '#fff' : '#475569', transition: 'all 0.2s ease'
                    }}
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              {/* Workflow Graphic Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '650px', margin: '0 auto' }}>
                {[
                  { id: 1, title: 'Step 1: User Action / State Change', desc: 'A user clicks a button or new data is fetched from an API.', color: '#3b82f6', bg: '#eff6ff' },
                  { id: 2, title: 'Step 2: New Virtual DOM Created', desc: 'A lightweight JS copy of the entire DOM tree is created in memory instantly.', color: '#10b981', bg: '#ecfdf5' },
                  { id: 3, title: 'Step 3: Diffing Algorithm Executed', desc: 'React compares the New Virtual DOM with the Previous Virtual DOM snapshot.', color: '#f59e0b', bg: '#fffbeb' },
                  { id: 4, title: 'Step 4: Pinpoint Changed Nodes (Reconciliation)', desc: 'Only the exact modified node is isolated, ignoring unchanged parts of the tree.', color: '#ef4444', bg: '#fef2f2' },
                  { id: 5, title: 'Step 5: Batch Update to Real DOM', desc: 'Only the changed element is updated in the Real DOM, rendering the screen smoothly.', color: '#8b5cf6', bg: '#f5f3ff' },
                ].map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: vdomStep === item.id ? item.bg : '#fff',
                      border: vdomStep === item.id ? `2px solid ${item.color}` : '1px solid #cbd5e1',
                      borderRadius: '8px', padding: '0.8rem 1rem', transition: 'all 0.3s ease',
                      boxShadow: vdomStep === item.id ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: item.color, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      {item.title} {vdomStep === item.id && '🎯 (Active Step)'}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('react_jsx')}>
              Next: React JSX Syntax <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 2b. REACT JSX SYNTAX */}
      {activeTab === 'react_jsx' && (
        <Section key="react_jsx" id="react_jsx" eyebrow="React JS • Module 02b" title="React JSX Syntax">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            
             <div style={{ background: 'linear-gradient(135deg,#4f46e5,#6366f1)', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1.5rem', color: '#ffffff' }}>
               <h3 style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#ffffff' }}>⚡ What is JSX?</h3>
               <p style={{ margin: 0, fontSize: '0.92rem', opacity: 0.95, lineHeight: 1.6, color: '#ffffff' }}>
                 <strong style={{ color: '#ffffff' }}>JSX</strong> stands for <strong style={{ color: '#ffffff' }}>JavaScript XML</strong>. It is a syntax extension to JavaScript that allows you to write HTML-like structures directly inside your React Javascript code, which is then compiled into standard JS.
               </p>
             </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Fundamental Rules of JSX</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: '1. Single Root Parent Element', desc: 'A component must return a single root element. Wrap sibling elements in a parent <div> or React Fragment (<>...</>).' },
                { title: '2. All Tags Must Close', desc: 'Self-closing elements like <img />, <br />, and <input /> must end with a forward slash. Normal tags must close correctly.' },
                { title: '3. camelCase Attributes', desc: 'HTML attributes are written as camelCase variables: "class" becomes "className", "onclick" becomes "onClick", "for" becomes "htmlFor".' },
                { title: '4. Embedding Expressions', desc: 'Evaluate any valid JavaScript expression (variables, functions, ternary checks) inside templates by wrapping them in curly braces { }.' }
              ].map((rule, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                  <strong style={{ display: 'block', fontSize: '0.88rem', color: '#4f46e5', marginBottom: 4 }}>{rule.title}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>{rule.desc}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>JSX Under the Hood (Compilation)</h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.88rem' }}>Browsers do not understand JSX. Compilers like Babel translate JSX tags into standard <code>React.createElement()</code> functions before execution:</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <strong style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: 4 }}>What you write (JSX):</strong>
                <pre style={{ background: '#0f172a', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: '0.82rem', fontFamily: 'monospace', margin: 0 }}>
{`const element = (
  <div className="card">
    <h1>Hello, World!</h1>
  </div>
);`}
                </pre>
              </div>
              <div>
                <strong style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: 4 }}>Compiled JavaScript:</strong>
                <pre style={{ background: '#0f172a', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: '0.82rem', fontFamily: 'monospace', margin: 0 }}>
{`const element = React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h1', null, 'Hello, World!')
);`}
                </pre>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>🧪 Live JSX Expressions Playground</h3>
            <p>Customize the expressions below to watch React render them dynamically and see the corresponding code representation:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Greeting Name (dynamic expression):</label>
                  <input className="form-control" value={jsxUserText} onChange={e => setJsxUserText(e.target.value)} style={{ background: 'white' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Button Accent Color:</label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#6366f1', '#10b981', '#f59e0b', '#ef4444'].map(color => (
                      <button key={color} onClick={() => setJsxBtnColor(color)}
                        style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: color, border: jsxBtnColor === color ? '2.5px solid #0f172a' : '1px solid #cbd5e1', cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>Rendered JSX View</span>
                  <div style={{ marginTop: 12 }}>
                    <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Welcome, {jsxUserText}!</h4>
                    <button style={{ backgroundColor: jsxBtnColor, color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      Accent Button
                    </button>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 8, marginTop: 10, fontFamily: 'monospace', fontSize: '0.74rem', color: '#64748b' }}>
                  {"// Code:\n<h4>Welcome, {" + jsxUserText + "}!</h4>"}
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('react_components')}>
              Next: Component-Based Architecture <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 3. COMPONENT-BASED ARCHITECTURE */}
      {activeTab === 'react_components' && (
        <Section key="react_components" id="react_components" eyebrow="React JS • Module 03" title="Component-Based Architecture">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1.5rem' }}>
              React follows a component-based approach, where the UI is broken down into reusable components. These components can be functional or class-based. It allows code reusability, maintainability, and scalability.
            </p>

            <div className="grid-split-left-heavy" style={{ margin: '2rem 0', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 800, margin: '0 0 0.8rem 0' }}>Core Benefits:</h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem' }}>
                  <li><strong>Code Reusability:</strong> Components are self-contained. You can write a single card or button element and import it multiple times with different properties.</li>
                  <li><strong>Maintainability:</strong> Modularity keeps code clean and isolated. Editing a visual state inside a specific card does not alter the layout of parent elements.</li>
                  <li><strong>Scalability:</strong> High-scale projects are easily managed by splitting files into folders matching component hierarchies.</li>
                </ul>
              </div>

              {/* Hierarchy representation */}
              <div style={{ border: '1px dashed #cbd5e1', padding: '1.5rem', borderRadius: '16px', background: '#f8fafc', textAlign: 'center' }}>
                <h5 style={{ margin: '0 0 1rem 0', fontWeight: 700, color: '#475569' }}>LMS App Tree</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                  <div style={{ border: '1px solid #818cf8', background: '#eef2ff', padding: '0.4rem', borderRadius: '8px', color: '#4f46e5' }}>&lt;App /&gt;</div>
                  <div style={{ alignSelf: 'center', height: '14px', borderLeft: '1px dashed #cbd5e1' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ border: '1px solid #10b981', background: '#ecfdf5', padding: '0.4rem', borderRadius: '8px', color: '#059669' }}>&lt;Sidebar /&gt;</div>
                    <div style={{ border: '1px solid #10b981', background: '#ecfdf5', padding: '0.4rem', borderRadius: '8px', color: '#059669' }}>&lt;Dashboard /&gt;</div>
                  </div>
                  <div style={{ alignSelf: 'center', height: '14px', borderLeft: '1px dashed #cbd5e1', alignSelf: 'flex-end', marginRight: '50px' }} />
                  <div style={{ border: '1px solid #ca8a04', background: '#fef9c3', padding: '0.4rem', borderRadius: '8px', color: '#a16207', width: '120px', alignSelf: 'flex-end' }}>&lt;CourseCard /&gt;</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 800, marginBottom: '1rem', textAlign: 'left' }}>Visual Architecture Breakdown:</h4>
              <img 
                src={componentTreeImg} 
                alt="React Component Tree Infographic" 
                onClick={() => setZoomedImage(componentTreeImg)}
                style={{ 
                  width: '100%', 
                  maxWidth: '540px', 
                  display: 'block', 
                  margin: '1.5rem auto 0', 
                  borderRadius: '16px', 
                  border: '1px solid #e2e8f0', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
                  cursor: 'zoom-in',
                  transition: 'transform 0.25s ease-out'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.025)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2.5rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('react_vdom')}>
              Next: Virtual DOM Concept <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 4. THE VIRTUAL DOM CONCEPT */}
      {activeTab === 'react_vdom' && (
        <Section key="react_vdom" id="react_vdom" eyebrow="React JS • Module 04" title="Virtual DOM Concept">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1.5rem' }}>
              React works by using a Virtual DOM to efficiently update the Real DOM in the browser. Instead of reloading the page document entirely, it updates only targeted nodes.
            </p>

            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: '2rem 0 1rem 0' }}>How Does the Virtual DOM Work?</h3>
            <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem', marginBottom: '2rem' }}>
              <li><strong>Virtual DOM Creation:</strong> When the application state changes, the Virtual DOM creates a new virtual tree.</li>
              <li><strong>Diffing Algorithm:</strong> The new Virtual DOM tree is compared with the previous version, and the differences (known as "diffs") are calculated.</li>
              <li><strong>Batch Updates:</strong> Instead of updating the entire Real DOM, only the nodes that have changed are updated, leading to faster rendering.</li>
            </ol>

            <div className="grid-split-right-heavy" style={{ margin: '2rem 0' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 800, margin: '0 0 0.8rem 0' }}>Actual DOM vs Virtual DOM Sync Lifecycle:</h4>
                <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <li><strong>Actual DOM and Virtual DOM:</strong> Initially, there is an Actual DOM (Real DOM) containing a div with two child elements: h1 and h2. React maintains a previous Virtual DOM to track the UI state before any updates.</li>
                  <li><strong>Detecting Changes:</strong> When a change occurs (e.g. adding a new h3 element), React generates a New Virtual DOM. React compares the previous Virtual DOM with the New Virtual DOM using a process called reconciliation.</li>
                  <li><strong>Efficient DOM Update:</strong> React identifies the differences (in this case, the new h3 element). Instead of updating the entire DOM, React updates only the changed part in the New Actual DOM, making the update process more efficient.</li>
                </ol>
              </div>

              {/* Interactive Sandbox */}
              <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🧪 Interactive VDOM Reconciliation Sandbox
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem 0' }}>
                  Add items to simulate state mutation and see how React's VDOM diffing isolates modifications.
                </p>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item text..."
                    style={{ flex: 1, padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                  <button onClick={handleAddVdomItem} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.4rem 0.8rem' }}>
                    <Play size={14} /> Add
                  </button>
                  <button onClick={handleClearVdomItems} style={{ border: 'none', background: '#fee2e2', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.82rem' }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.8rem', background: '#f8fafc' }}>
                    <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#475569' }}>Real DOM Tree View:</strong>
                    {vdomList.length === 0 ? <span style={{ color: '#94a3b8' }}>Empty List</span> : (
                      <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                        {vdomList.map((item, idx) => <li key={idx} style={{ color: '#0f172a', fontWeight: 600 }}>{item}</li>)}
                      </ul>
                    )}
                  </div>
                  
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.8rem', background: '#0f172a', color: '#38bdf8', fontFamily: 'monospace', overflowY: 'auto', maxHeight: '120px' }}>
                    <strong>Reconciliation log:</strong>
                    <div style={{ fontSize: '0.72rem', marginTop: '0.3rem', lineHeight: 1.4, color: '#a5d6ff' }}>
                      {updatesLog.length === 0 ? <span style={{ color: '#64748b' }}>Awaiting component state changes...</span> : (
                        updatesLog.map((log, idx) => <div key={idx} style={{ marginBottom: '4px' }}>{log}</div>)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 800, marginBottom: '1rem', textAlign: 'left' }}>Visual VDOM Diffing & Reconciliation:</h4>
              <img 
                src={virtualDomImg} 
                alt="React Virtual DOM Infographic" 
                onClick={() => setZoomedImage(virtualDomImg)}
                style={{ 
                  width: '100%', 
                  maxWidth: '540px', 
                  display: 'block', 
                  margin: '1.5rem auto 0', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                  cursor: 'zoom-in',
                  transition: 'transform 0.25s ease-out'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.025)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2.5rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('react_features')}>
              Next: Key Features of React <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 5. KEY FEATURES OF REACT */}
      {activeTab === 'react_features' && (
        <Section key="react_features" id="react_features" eyebrow="React JS • Module 05" title="Key Features of React">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1.5rem' }}>
              React provides several essential capabilities that make dynamic client-side applications secure, fast, and structured:
            </p>

            <div className="grid-2col" style={{ margin: '1.5rem 0' }}>
              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontWeight: 800 }}>1. Virtual DOM</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                  React uses a Virtual DOM to optimize UI rendering. It creates a lightweight copy of the DOM, compares it with the previous version to detect changes (diffing), and updates only those changed parts in the actual DOM (reconciliation).
                </p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontWeight: 800 }}>2. Component-Based Architecture</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                  React follows a component-based approach, where the UI is broken down into reusable components. These can be functional or class-based and allow code reusability, maintainability, and scalability.
                </p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontWeight: 800 }}>3. JSX (JavaScript XML)</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                  React uses JSX, a syntax extension that allows developers to write HTML inside JavaScript. This makes the code more readable and expressive, and easier to understand and debug.
                </p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04', fontWeight: 800 }}>4. One-Way Data Binding</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                  React uses one-way data binding, meaning data flows in a single direction from parent components to child components via props. This provides better control over data and helps maintain predictable behavior.
                </p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontWeight: 800 }}>5. State Management</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                  React manages component state efficiently using the <code>useState</code> hook (for functional components) or <code>this.state</code> (for class components). State allows dynamic updates without reloading the page.
                </p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#6d28d9', fontWeight: 800 }}>6. React Hooks</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                  Hooks allow functional components to use state and lifecycle features without needing class components. Common hooks include <code>useState</code> for managing state, <code>useEffect</code> for side effects, and <code>useContext</code> for global context access.
                </p>
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('react_lifecycle')}>
              Next: React Component Life Cycle <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 6. COMPONENT LIFECYCLE */}
      {activeTab === 'react_lifecycle' && (
        <Section key="react_lifecycle" id="react_lifecycle" eyebrow="React JS • Module 06" title="React Component Life Cycle">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1.5rem' }}>
              React components go through a lifecycle consisting of four distinct phases: Initialization, Mounting, Updating, and Unmounting.
            </p>

            <div className="grid-split-left-heavy" style={{ margin: '2rem 0' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                  {['mounting', 'updating', 'unmounting'].map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setActiveLifecycleStage(stage)}
                      style={{
                        background: activeLifecycleStage === stage ? '#2563eb' : '#f1f5f9',
                        color: activeLifecycleStage === stage ? 'white' : '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {stage}
                    </button>
                  ))}
                </div>

                <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontWeight: 800 }}>1. Initialization Phase</h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.5rem' }}>
                    This is the stage where the component is constructed with the given Props and default state. This is done in the constructor of a Component Class.
                  </p>

                  {activeLifecycleStage === 'mounting' && (
                    <>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontWeight: 800 }}>2. Mounting Phase</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
                        This phase happens when the component is being initialized and inserted into the browser DOM:
                        <br />• <strong>Constructor</strong>: The constructor method initializes the component. It's where you set up the initial state and bind event handlers.
                        <br />• <strong>render()</strong>: This method returns the JSX representation of the component. It's called during initial rendering and subsequent updates.
                        <br />• <strong>componentDidMount()</strong>: After the component is inserted into the DOM, this method is invoked. Use it for side effects like data fetching or setting timers.
                      </p>
                    </>
                  )}
                  {activeLifecycleStage === 'updating' && (
                    <>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontWeight: 800 }}>3. Updating Phase</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
                        Triggered when local state values or parent-passed props change:
                        <br />• <strong>componentDidUpdate(prevProps, prevState)</strong>: Called after the component updates due to new props or state changes. Handle side effects here.
                        <br />• <strong>shouldComponentUpdate(nextProps, nextState)</strong>: Determines if the component should re-render. Optimize performance by customizing this method.
                        <br />• <strong>render()</strong>: Again, the render() method reflects changes in state or props during updates.
                      </p>
                    </>
                  )}
                  {activeLifecycleStage === 'unmounting' && (
                    <>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', fontWeight: 800 }}>4. Unmounting Phase</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>
                        Triggered when the component is removed from the DOM:
                        <br />• <strong>componentWillUnmount()</strong>: Invoked just before the component is removed from the DOM. Clean up resources (e.g. event listeners, timers).
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Graphic Flowchart */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', border: '1px dashed #cbd5e1', padding: '1rem', borderRadius: '16px', background: '#f8fafc', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Execution Flow</div>
                <div style={{ padding: '0.5rem', background: '#eef2ff', border: '1px solid #818cf8', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'center', color: '#4f46e5', fontWeight: 700 }}>Initialization</div>
                <div style={{ alignSelf: 'center', borderLeft: '1px solid #cbd5e1', height: '10px' }} />
                <div style={{ padding: '0.5rem', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'center', color: '#059669', fontWeight: 700 }}>Mounting</div>
                <div style={{ alignSelf: 'center', borderLeft: '1px solid #cbd5e1', height: '10px' }} />
                <div style={{ padding: '0.5rem', background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'center', color: '#b45309', fontWeight: 700 }}>Updating</div>
                <div style={{ alignSelf: 'center', borderLeft: '1px solid #cbd5e1', height: '10px' }} />
                <div style={{ padding: '0.5rem', background: '#fef2f2', border: '1px solid #ef4444', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'center', color: '#b91c1c', fontWeight: 700 }}>Unmounting</div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('react_setup')}>
              Next: Setting up Environment <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 7. SETTING UP ENVIRONMENT */}
      {activeTab === 'react_setup' && (
        <Section key="react_setup" id="react_setup" eyebrow="React JS • Module 07" title="Setting up Environment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1rem' }}>
              Follow these steps to configure your local development workspace and create a React project using Vite.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>Step 1: Install NodeJS & npm</strong> - Visit the NodeJS official website and download the latest stable version.</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>Step 2: Create a New Project with Vite</strong> - Run the setup scaffold commands inside your terminal directory.</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>Step 3: Select a Framework</strong> - Choose <code>React</code> when prompted inside the terminal selection UI.</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>Step 4: Select Variant</strong> - Choose <code>JavaScript</code> to configure React without TypeScript definitions.</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>Step 5: Install Dependencies</strong> - Execute <code>npm install</code> (or <code>npm i</code>) to build the node_modules cache.</p>
              <p style={{ margin: 0 }}>• <strong>Step 6: Start the Server</strong> - Run <code>npm run dev</code> to boot the local server on <code>http://localhost:5173/</code>.</p>
            </div>

            <CodeBlock title="Terminal Setup Commands" code={`# Step 2: Initialize project folder
npm create vite@latest my-react-app -- --template react

# Navigate into project directory
cd my-react-app

# Step 5: Install modules
npm install

# Step 6: Start dev server
npm run dev`} />

            <div style={{ marginTop: '2.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 800, margin: '0 0 0.8rem 0' }}>Project Folder Structure</h4>
              <div className="grid-split-right-heavy" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a', fontWeight: 700 }}>
                  my-react-app/
                  <br />├── node_modules/
                  <br />├── public/
                  <br />├── src/
                  <br />│   ├── App.jsx
                  <br />│   └── main.jsx
                  <br />├── .eslintrc.cjs
                  <br />├── .gitignore
                  <br />├── index.html
                  <br />├── package-lock.json
                  <br />├── package.json
                  <br />├── README.md
                  <br />└── vite.config.js
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                  <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>package.json:</strong> Tracks scripts, plugins, and libraries like <code>react</code> and <code>react-dom</code>.</p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>index.html:</strong> Direct mount file holding the target element <code>&lt;div id="root"&gt;&lt;/div&gt;</code>.</p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>• <strong>src/main.jsx:</strong> Integrates the react libraries and mounts the App component inside the HTML element.</p>
                  <p style={{ margin: 0 }}>• <strong>src/App.jsx:</strong> Root template component containing the visual UI states and sub-components.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 800, margin: '0 0 0.8rem 0' }}>Step-by-Step React Program from Scratch (Vite CLI)</h4>
              <p>Follow these structural steps to initialize and write your very first React program from scratch:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                  <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 1: Create the Vite Project Scaffold</strong>
                  <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', color: '#475569' }}>
                    Open your terminal and run the creation script command to scaffold a new project directory.
                  </p>
                  <CodeBlock title="Terminal" code={`npm create vite@latest my-react-app -- --template react`} />
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                  <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 2: Enter Directory and Install React Packages</strong>
                  <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', color: '#475569' }}>
                    Navigate into the newly created folder and run install to load core packages.
                  </p>
                  <CodeBlock title="Terminal" code={`cd my-react-app
npm install`} />
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                  <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 3: Create Your Custom React Component from Scratch</strong>
                  <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', color: '#475569' }}>
                    Open the project folder inside your code editor (like VS Code), open <code>src/App.jsx</code>, clear all the default template codes, and write this simple component from scratch:
                  </p>
                  <CodeBlock title="src/App.jsx" code={`import React from 'react';

// 1. Write a child Greeting component
function Greeting(props) {
  return <h1>Hello, \${props.name}!</h1>;
}

// 2. Write the main root App component
function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <Greeting name="Student" />
      <p>My first React program running from scratch using Vite!</p>
    </div>
  );
}

export default App;`} />
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                  <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 4: Run the Development Server</strong>
                  <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', color: '#475569' }}>
                    Boot up the Vite build compiler to launch your website locally.
                  </p>
                  <CodeBlock title="Terminal" code={`npm run dev`} />
                  <p style={{ margin: '0.8rem 0 0 0', fontSize: '0.88rem', color: '#64748b', fontStyle: 'italic' }}>
                    Open your web browser and load the URL <strong>http://localhost:5173/</strong> to see your new React program running!
                  </p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('quiz')}>
              Next: Check Your Knowledge (Quiz) <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 8. QUIZ */}
      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Assessment" title="Day 1 Quiz: React Foundations">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map((q, qIdx) => (
                <div key={q.key} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                    Q{qIdx + 1}: {q.question}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.key] === optIdx;
                      const isCorrect = optIdx === q.correct;
                      return (
                        <button
                          key={optIdx}
                          disabled={quizChecked}
                          onClick={() => handleQuizAnswer(q.key, optIdx)}
                          style={{
                            textAlign: 'left',
                            background: isSelected 
                              ? (quizChecked ? (isCorrect ? '#dcfce7' : '#fee2e2') : '#e0e7ff') 
                              : '#ffffff',
                            color: isSelected 
                              ? (quizChecked ? (isCorrect ? '#15803d' : '#b91c1c') : '#312e81') 
                              : '#334155',
                            border: '1px solid',
                            borderColor: isSelected 
                              ? (quizChecked ? (isCorrect ? '#86efac' : '#fca5a5') : '#818cf8') 
                              : '#cbd5e1',
                            borderRadius: '10px',
                            padding: '0.75rem 1rem',
                            cursor: quizChecked ? 'default' : 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSelected ? 700 : 500,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{opt}</span>
                          {quizChecked && isCorrect && <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Correct</span>}
                          {quizChecked && isSelected && !isCorrect && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗ Incorrect</span>}
                        </button>
                      );
                    })}
                  </div>
                  {quizChecked && (
                    <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', background: '#eff6ff', borderRadius: '10px', fontSize: '0.82rem', color: '#1e40af', lineHeight: 1.45 }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              {!quizChecked ? (
                <button
                  onClick={() => setQuizChecked(true)}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="btn btn-primary"
                  style={{ opacity: Object.keys(quizAnswers).length < quizQuestions.length ? 0.6 : 1, backgroundColor: '#2563eb', borderColor: '#2563eb' }}
                >
                  Submit & Check Answers
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizChecked(false);
                    }}
                    className="btn btn-outline"
                  >
                    Reset Quiz
                  </button>
                  <button
                    onClick={() => handleContinue('assignment')}
                    className="btn btn-primary"
                    style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}
                  >
                    Continue to Assignment <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>

          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 1 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Review & Practice: Build Your First React Component</h3>
            <p>To reinforce what you've learned today, complete the following assignment tasks:</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #4f46e5', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', fontWeight: 800 }}>Task 1: Environment Setup</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                Set up your React project using Vite by running <code>npm create vite@latest my-react-app -- --template react</code>. Verify that the development server starts successfully and you can load the default page on <code>http://localhost:5173/</code>.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', fontWeight: 800 }}>Task 2: Build a Custom Greeting Component</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                Inside the <code>src/</code> directory, create a new file named <code>Greeting.jsx</code>. Build a functional component that accepts a name as a prop and renders: <code>&lt;h1&gt;Hello, [Name]! Welcome to React.&lt;/h1&gt;</code>. Import and render it inside <code>App.jsx</code>.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #ca8a04', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', fontWeight: 800 }}>Task 3: Explore JSX Rules</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                Modify your <code>Greeting.jsx</code> component to render multiple elements wrapped in a single parent container (e.g., using a React Fragment <code>&lt;&gt;&lt;/&gt;</code> or a parent <code>&lt;div&gt;</code>). Explain why this is a core JSX syntax rule.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => alert('React Day 1 Assignment Submitted successfully!')} style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}>
                Submit Assignment
              </button>
            </div>
          </div>
        </Section>
      )}

      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: '2rem'
          }}
        >
          <img 
            src={zoomedImage} 
            alt="Zoomed Diagram" 
            style={{ 
              maxWidth: '95%', 
              maxHeight: '95%', 
              borderRadius: '16px', 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }} 
          />
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '2rem',
            color: '#94a3b8',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            background: 'rgba(255,255,255,0.15)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            pointerEvents: 'none'
          }}>
            Click anywhere to close
          </div>
        </div>
      )}

    </AnimatePresence>
  );
}
