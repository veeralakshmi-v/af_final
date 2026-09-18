import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Layers, Database, Sparkles, RefreshCw, Settings, 
  CheckCircle, Code, ArrowRight, Info, Play, Trash2, Cpu, 
  Laptop, Terminal, Copy, FileText, User as UserIcon, Plus, 
  AlertTriangle, Check, BookOpenCheck, HelpCircle, Sliders,
  GitBranch, Palette, Eye, Layout, ShieldAlert, Monitor, 
  Grid, Compass, Sun, Moon, Lock, Zap, CreditCard, TrendingUp, Shield
} from 'lucide-react';
import { CodeBlock, highlightJS } from '../../utils/codeHighlight';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function ReactDay8({ activeTab, onNavigate }) {
  const handleContinue = (nextTabId) => {
    onNavigate('react_module8', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Widget 1: Inline Styling compiler ---
  const [inlineColor, setInlineColor] = useState("#ffffff");
  const [inlineBg, setInlineBg] = useState("#4f46e5");
  const [inlinePadding, setInlinePadding] = useState("20");
  const [inlineRadius, setInlineRadius] = useState("12");

  // --- Widget 2: CSS Modules hashed outputs ---
  const [moduleScoping, setModuleScoping] = useState('global'); // global, modular

  // --- Widget 3: Styled Components Prop Resolver ---
  const [styledPrimary, setStyledPrimary] = useState(true);

  // --- Widget 4: Tailwind Theme Dashboard simulator ---
  const [tailwindDark, setTailwindDark] = useState(false);

  // --- Widget 5: Mini Project Interactive Playground State ---
  const [miniDark, setMiniDark] = useState(false);
  const [miniBilling, setMiniBilling] = useState('monthly'); // 'monthly' or 'annual'
  const [miniPlan, setMiniPlan] = useState('pro'); // 'starter', 'pro', 'enterprise'
  const [miniUsage, setMiniUsage] = useState(65);
  const [miniCodeTab, setMiniCodeTab] = useState('simple'); // 'simple', 'full', 'css'

  // --- Quiz States ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const quizQuestions = [
    {
      key: 'q1',
      question: 'Which of the following is correct syntax for inline styling in React JSX?',
      options: [
        '<div style="color: red; font-size: 20px;"></div>',
        '<div style={{ color: "red", fontSize: "20px" }}></div>',
        '<div style={ color: "red", font-size: "20px" }></div>',
        '<div css={{ color: "red", fontSize: "20px" }}></div>'
      ],
      correct: 1,
      explanation: 'In React JSX, the style attribute accepts a JavaScript object. Therefore, we use double curly braces: the outer braces denote a JSX expression, and the inner braces denote the style object literal.'
    },
    {
      key: 'q2',
      question: 'What is the main advantage of using CSS Modules over traditional CSS sheets in React?',
      options: [
        'It parses CSS styles faster at runtime.',
        'It automatically prefixes animation properties.',
        'It generates unique hashed class names to prevent style leakage and namespace collisions across components.',
        'It eliminates the need to import stylesheets entirely.'
      ],
      correct: 2,
      explanation: 'CSS Modules compile class names into unique identifier strings (e.g. styles.btn compiles to Button_btn__a8b9c), scoping styles locally to that component.'
    },
    {
      key: 'q3',
      question: 'How do you pass dynamic states (like active/disabled toggles) into Styled Components?',
      options: [
        'By writing standard inline scripts inside style tags.',
        'By passing values as React props, which are evaluated inside template literals using function interpolation: ${(props) => ...}.',
        'By declaring local class names globally.',
        'By using query selectors inside useEffect hooks.'
      ],
      correct: 1,
      explanation: 'Styled Components can parse props dynamically inside standard backtick declarations, allowing developers to adapt component styles using function calls: ${props => props.primary ? "green" : "blue"}.'
    },
    {
      key: 'q4',
      question: 'Which Tailwind configuration file property dictates which files should be scanned for class utilities?',
      options: [
        'theme.extend',
        'plugins',
        'content',
        'scaffolds'
      ],
      correct: 2,
      explanation: 'The "content" array in tailwind.config.js specifies paths to all HTML and JavaScript/JSX files, enabling Tailwind to parse active utility class names and purge unused utilities.'
    }
  ];

  const handleQuizAnswer = (qKey, optIdx) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [qKey]: optIdx }));
  };

  const getQuizScore = () => quizQuestions.filter(q => quizAnswers[q.key] === q.correct).length;

  return (
    <AnimatePresence mode="wait">
      
      {/* ── 1. INLINE STYLING ───────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="intro_react" id="intro_react" eyebrow="Module 01 • Day 8" title="1. Inline Styling in React">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header banner */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>🎨 What is Inline Styling in React?</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.6, color: 'white', margin: 0 }}>
                In HTML, you wrote <code>style="color: red;"</code>. In React JSX, you pass a <strong>JavaScript Object</strong> inside double curly braces: <code>style=&#123;&#123; color: "red" &#125;&#125;</code>.
              </p>
            </div>

            {/* The 2 Golden Rules */}
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>📌 The 2 Golden Rules:</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <strong style={{ color: '#4f46e5', display: 'block', marginBottom: '4px' }}>1. Use camelCase for CSS names</strong>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                  Instead of <code>background-color</code> ❌, write <code>backgroundColor</code> ✅.<br />
                  Instead of <code>font-size</code> ❌, write <code>fontSize</code> ✅.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <strong style={{ color: '#10b981', display: 'block', marginBottom: '4px' }}>2. Use double curly braces &#123;&#123; &#125;&#125;</strong>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                  Outer <code>&#123; &#125;</code> is for JSX expressions.<br />
                  Inner <code>&#123; &#125;</code> is the JavaScript style object.
                </p>
              </div>
            </div>

            <CodeBlock title="InlineExample.jsx" code={`// Simple Example 1: Direct inline style
<h2 style={{ color: "blue", fontSize: "24px", textAlign: "center" }}>
  Hello React!
</h2>

// Simple Example 2: Store in a variable object first
const cardStyle = {
  backgroundColor: "#4f46e5",
  color: "white",
  padding: "16px",
  borderRadius: "8px"
};

function MyCard() {
  return <div style={cardStyle}>Styled with React!</div>;
}`} />

            {/* --- INTERACTIVE WIDGET: INLINE STYLE COMPILER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>⚙️ Interactive Playground: Try It Yourself</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1rem 0' }}>Adjust the controls below to see how the React inline style object changes:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Text Color:</label>
                    <input type="color" value={inlineColor} onChange={(e) => setInlineColor(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', cursor: 'pointer', borderRadius: '6px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Background Color:</label>
                    <input type="color" value={inlineBg} onChange={(e) => setInlineBg(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', cursor: 'pointer', borderRadius: '6px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Padding: {inlinePadding}px</label>
                    <input type="range" min="10" max="40" value={inlinePadding} onChange={(e) => setInlinePadding(e.target.value)} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Border Radius: {inlineRadius}px</label>
                    <input type="range" min="0" max="30" value={inlineRadius} onChange={(e) => setInlineRadius(e.target.value)} style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Compiled Code block view */}
                <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  <span style={{ color: '#8892b0' }}>{'// React JSX output:'}</span>
                  <div style={{ marginTop: '4px' }}>
                    {`<div style={{`}
                    <div style={{ paddingLeft: '1rem', color: '#a5d6ff' }}>
                      color: <span style={{ color: '#ff7b72' }}>"{inlineColor}"</span>,<br />
                      backgroundColor: <span style={{ color: '#ff7b72' }}>"{inlineBg}"</span>,<br />
                      padding: <span style={{ color: '#ff7b72' }}>"{inlinePadding}px"</span>,<br />
                      borderRadius: <span style={{ color: '#ff7b72' }}>"{inlineRadius}px"</span>
                    </div>
                    {`}}>Hello World</div>`}
                  </div>
                </div>
              </div>

              {/* Visual Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  color: inlineColor,
                  backgroundColor: inlineBg,
                  padding: `${inlinePadding}px`,
                  borderRadius: `${inlineRadius}px`,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.15s ease',
                  width: '80%'
                }}>
                  Live Preview Card
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('useState_hook')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Next: CSS Files &amp; Modules <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. CSS MODULES ─────────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="useState_hook" id="useState_hook" eyebrow="Module 02 • Day 8" title="2. CSS Files vs CSS Modules (Simplified)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header with simple concept */}
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', borderRadius: '16px', padding: '1.75rem', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                💡 SIMPLE EXPLANATION
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'white' }}>
                The Big Problem: Why Normal CSS Can Break Your App
              </h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.6, margin: 0, color: 'white' }}>
                When you import a normal <code>.css</code> file, its classes are <strong>global</strong>. That means if two different components both have a class called <code>.title</code> or <code>.btn</code>, one will accidentally overwrite the other!
              </p>
            </div>

            {/* Real Life Analogy Box */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#166534', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                🏫 Real-Life Analogy: The Name Clash
              </strong>
              <p style={{ fontSize: '0.9rem', color: '#14532d', margin: 0, lineHeight: 1.6 }}>
                Imagine two students in a school both named <strong>"Rahul"</strong>. If the principal announces: <em>"Rahul must wear a blue hat"</em>, both Rahuls get confused (Normal CSS).<br />
                With <strong>CSS Modules</strong>, React attaches a unique ID: <em>"Rahul_Class10_A"</em> vs <em>"Rahul_Class5_B"</em>. Now their styles never interfere with each other!
              </p>
            </div>

            {/* Side-by-Side Comparison */}
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>
              🔍 Side-by-Side Comparison
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              
              {/* Option 1: Normal CSS */}
              <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: 16, border: '1.5px solid #fecaca' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <span style={{ background: '#ef4444', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>✕</span>
                  <h4 style={{ margin: 0, fontWeight: 800, color: '#991b1b', fontSize: '1.05rem' }}>Normal CSS (Global 🌍)</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#7f1d1d', margin: '0 0 0.75rem 0' }}>
                  ⚠️ Risk of name collision: styles leak everywhere in the application.
                </p>

                <CodeBlock title="Navbar.css" code={`/* 1. In CSS file: */
.btn {
  background: green;
  color: white;
}

/* 2. In Component: */
import "./Navbar.css";

function Navbar() {
  return <button className="btn">Navbar</button>;
}`} />
              </div>

              {/* Option 2: CSS Modules */}
              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: 16, border: '1.5px solid #bfdbfe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <span style={{ background: '#10b981', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>✓</span>
                  <h4 style={{ margin: 0, fontWeight: 800, color: '#1e40af', fontSize: '1.05rem' }}>CSS Modules (Private 🔒)</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#1e3a8a', margin: '0 0 0.75rem 0' }}>
                  ✅ 100% Safe: Scoped only to this file by creating unique hashes.
                </p>

                <CodeBlock title="Navbar.module.css" code={`/* 1. Name must end with: .module.css */
.btn {
  background: purple;
  color: white;
}

/* 2. In Component: import as an object! */
import styles from "./Navbar.module.css";

function Navbar() {
  return <button className={styles.btn}>Navbar</button>;
}`} />
              </div>
            </div>

            {/* The 3 Simple Steps to Use CSS Modules */}
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>
              🛠️ How to Use CSS Modules in 3 Easy Steps:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: '#6366f1', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</span>
                <span style={{ fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Create file ending in <code>.module.css</code></strong> (e.g. <code>Header.module.css</code> instead of <code>Header.css</code>).
                </span>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: '#6366f1', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</span>
                <span style={{ fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Import it as a JavaScript object:</strong> <code>import styles from "./Header.module.css";</code>
                </span>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: '#6366f1', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</span>
                <span style={{ fontSize: '0.9rem', color: '#334155' }}>
                  <strong>Apply class using dot notation:</strong> <code>&lt;button className=&#123;styles.btn&#125;&gt;</code>
                </span>
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>
              🧪 Live Simulation: Watch Class Names in the Inspector
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1rem 0' }}>
              Toggle between <strong>Global CSS</strong> and <strong>CSS Module</strong> below to see how React transforms the class name to prevent collisions:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '8px' }}>Select Styling Mode:</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className={`btn ${moduleScoping === 'global' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setModuleScoping('global')} style={moduleScoping === 'global' ? { background: '#ef4444', borderColor: '#ef4444' } : {}}>Normal CSS (Global)</button>
                  <button className={`btn ${moduleScoping === 'modular' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setModuleScoping('modular')} style={moduleScoping === 'modular' ? { background: '#10b981', borderColor: '#10b981' } : {}}>CSS Module (Scoped)</button>
                </div>

                <div style={{ background: '#0f172a', padding: '12px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.85rem', color: '#e1e4e8' }}>
                  <span style={{ color: '#8892b0' }}>{'// What gets generated in HTML:'}</span>
                  <div style={{ marginTop: '6px', color: '#a5d6ff' }}>
                    {moduleScoping === 'global' ? (
                      <div>
                        &lt;button <span style={{ color: '#f87171' }}>class="btn"</span>&gt;<br />
                        <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>/* ⚠️ Any other file with .btn can overwrite this! */</span>
                      </div>
                    ) : (
                      <div>
                        &lt;button <span style={{ color: '#4ade80' }}>class="Navbar_btn__9x2k"</span>&gt;<br />
                        <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>/* ✅ Unique hash "__9x2k" makes it impossible to clash! */</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Resulting Button Appearance:</span>
                <button style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'white',
                  background: moduleScoping === 'global' ? '#ef4444' : '#10b981',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  transition: 'background 0.2s ease'
                }}>
                  {moduleScoping === 'global' ? 'Button with Global Style' : 'Button with Scoped Module'}
                </button>
              </div>
            </div>

            {/* Quick Summary Table */}
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>
              📊 Quick Summary Cheat-Sheet:
            </h4>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', background: 'white', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#0f172a', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Feature</th>
                    <th style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Normal CSS</th>
                    <th style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>CSS Modules</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>File Name</td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}><code>Button.css</code></td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}><code>Button.module.css</code></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>How to Import</td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}><code>import "./Button.css"</code></td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}><code>import styles from "./Button.module.css"</code></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Class Syntax</td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}><code>className="btn"</code></td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}><code>className=&#123;styles.btn&#125;</code></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>Scope</td>
                    <td style={{ padding: '10px 14px', color: '#ef4444' }}>Global (can cause bugs)</td>
                    <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Private (100% safe)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('multiple_states')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Next: Styled Components <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. STYLED COMPONENTS ────────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="multiple_states" id="multiple_states" eyebrow="Module 03 • Day 8" title="3. Styled Components">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>💅 What are Styled Components?</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Styled Components is a library that allows you to create styled React components using backtick (<code>` `</code>) syntax and pass React props to change styles dynamically!
              </p>
            </div>

            <CodeBlock title="StyledButton.jsx" code={`import styled from "styled-components";

// 1. Create a styled button component
const Button = styled.button\`
  background-color: \${props => props.primary ? "#10b981" : "#3b82f6"};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
\`;

// 2. Use it in JSX like any normal React component!
function App() {
  return (
    <div>
      <Button primary>Primary Button (Green)</Button>
      <Button>Normal Button (Blue)</Button>
    </div>
  );
}`} />

            {/* --- INTERACTIVE WIDGET --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>💅 Interactive Props Resolver</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setStyledPrimary(prev => !prev)}
                  style={{ width: '100%', background: '#6366f1', borderColor: '#6366f1', marginBottom: '1rem' }}
                >
                  Click to Toggle Prop: primary = {styledPrimary ? 'true' : 'false'}
                </button>

                <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  {`background-color: `}
                  <span style={{ 
                    background: styledPrimary ? '#10b981' : '#3b82f6', 
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: 4
                  }}>
                    {styledPrimary ? '"#10b981" (Green)' : '"#3b82f6" (Blue)'}
                  </span>
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <button style={{
                  background: styledPrimary ? '#10b981' : '#3b82f6',
                  color: 'white',
                  padding: '10px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease'
                }}>
                  {styledPrimary ? '<Button primary />' : '<Button />'}
                </button>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('object_state')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Next: Tailwind CSS Setup <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. TAILWIND CSS SETUP ──────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="object_state" id="object_state" eyebrow="Module 04 • Day 8" title="4. Tailwind CSS Setup">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>⚡ What is Tailwind CSS?</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Tailwind gives you ready-made helper classes so you never have to write custom CSS files. For example: <code>bg-blue-600</code>, <code>text-white</code>, <code>p-4</code>, <code>rounded-lg</code>.
              </p>
            </div>

            <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '1rem 0 0.5rem 0' }}>Step 1: Install in Terminal</h4>
            <CodeBlock title="Terminal" code={`# 1. Install Tailwind and PostCSS
npm install -D tailwindcss postcss autoprefixer

# 2. Generate config file
npx tailwindcss init`} />

            <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '1.5rem 0 0.5rem 0' }}>Step 2: Add Tailwind Directives</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <CodeBlock title="tailwind.config.js" code={`export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};`} />
              <CodeBlock title="src/index.css" code={`@tailwind base;
@tailwind components;
@tailwind utilities;`} />
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('nested_state')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Next: Tailwind Student Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. TAILWIND STUDENT DASHBOARD ───────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="nested_state" id="nested_state" eyebrow="Module 05 • Day 8" title="5. Tailwind Student Dashboard">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                💻 PRACTICAL PROJECT
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>Student Dashboard with Dark/Light Theme</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Here is how to build a responsive Student Dashboard with Profile and Statistics cards using <strong>Tailwind CSS utility classes</strong> and <strong>React State</strong>.
              </p>
            </div>

            {/* Interactive Live Demo */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>
              🎮 Live Interactive Preview
            </h4>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 20, marginBottom: '2rem' }}>
              <div style={{ 
                background: tailwindDark ? '#111827' : '#ffffff', 
                color: tailwindDark ? '#f9fafb' : '#111827', 
                borderRadius: '12px', 
                border: tailwindDark ? '1px solid #374151' : '1px solid #e5e7eb', 
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}>
                
                {/* Navbar */}
                <div style={{ background: '#2563eb', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                  <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>🎓 Student Dashboard</h4>
                  <button 
                    onClick={() => setTailwindDark(d => !d)}
                    style={{ background: 'white', color: '#111827', border: 'none', padding: '6px 14px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    {tailwindDark ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#2563eb" />}
                    {tailwindDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>

                {/* Grid Container */}
                <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  
                  {/* Profile Card */}
                  <div style={{ 
                    background: tailwindDark ? '#1f2937' : '#f8fafc', 
                    color: tailwindDark ? '#f9fafb' : '#111827', 
                    padding: '1.25rem', 
                    borderRadius: 12, 
                    textAlign: 'center',
                    border: tailwindDark ? '1px solid #374151' : '1px solid #e2e8f0'
                  }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold', fontSize: '1.2rem' }}>
                      JD
                    </div>
                    <h5 style={{ margin: '0 0 2px 0', fontWeight: 800 }}>John Doe</h5>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Computer Science</span>
                  </div>

                  {/* Stat Cards */}
                  {[
                    { title: "Total Attendance", value: "85%" },
                    { title: "Completed Assignments", value: "12" },
                    { title: "Upcoming Exams", value: "3" }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        background: tailwindDark ? '#1f2937' : '#f8fafc', 
                        color: tailwindDark ? '#f9fafb' : '#111827', 
                        padding: '1.25rem', 
                        borderRadius: 12,
                        border: tailwindDark ? '1px solid #374151' : '1px solid #e2e8f0'
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>{stat.title}</span>
                      <strong style={{ display: 'block', fontSize: '1.6rem', marginTop: '6px', color: '#6366f1' }}>{stat.value}</strong>
                    </div>
                  ))}

                </div>

              </div>
            </div>

            {/* --- COMPLETE PROGRAM CODE --- */}
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>
              📄 Complete Program Source Code
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 0.75rem 0' }}>
              Create a file named <code>StudentDashboard.jsx</code> in your React project and paste this code:
            </p>

            <CodeBlock title="src/StudentDashboard.jsx" code={`import React, { useState } from 'react';

export default function StudentDashboard() {
  // 1. State for Dark/Light Mode
  const [isDark, setIsDark] = useState(false);

  // 2. Student Statistics Data
  const stats = [
    { title: "Total Attendance", value: "85%" },
    { title: "Completed Assignments", value: "12" },
    { title: "Upcoming Exams", value: "3" }
  ];

  return (
    <div className={isDark ? "bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 text-gray-900 min-h-screen p-6"}>
      
      {/* Container Card */}
      <div className="max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        
        {/* Navbar */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🎓 Student Dashboard
          </h2>
          <button
            onClick={() => setIsDark(!isDark)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Dashboard Grid (1 col on mobile, 4 cols on desktop) */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Profile Card */}
          <div className={isDark ? "bg-gray-800 p-6 rounded-xl text-center border border-gray-700" : "bg-white p-6 rounded-xl text-center shadow border border-gray-100"}>
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-3">
              JD
            </div>
            <h3 className="font-bold text-lg">John Doe</h3>
            <p className="text-gray-400 text-sm">Computer Science</p>
          </div>

          {/* Stats Cards */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className={isDark ? "bg-gray-800 p-6 rounded-xl border border-gray-700" : "bg-white p-6 rounded-xl shadow border border-gray-100"}
            >
              <span className="text-sm text-gray-400 font-medium">{stat.title}</span>
              <p className="text-3xl font-extrabold text-blue-500 mt-2">{stat.value}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}`} />

            {/* How to use in App.jsx */}
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>
              🚀 How to Render in <code>App.jsx</code>:
            </h4>

            <CodeBlock title="src/App.jsx" code={`import React from 'react';
import StudentDashboard from './StudentDashboard';

function App() {
  return (
    <div>
      <StudentDashboard />
    </div>
  );
}

export default App;`} />

            {/* Key Tailwind Classes Breakdown */}
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.8rem' }}>
              🔑 Key Tailwind Classes Explained:
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <code style={{ color: '#4f46e5', fontWeight: 'bold' }}>grid-cols-1 md:grid-cols-4</code>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  1 column on mobile screens, 4 columns on tablets and desktops.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <code style={{ color: '#10b981', fontWeight: 'bold' }}>rounded-2xl shadow-lg</code>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  Gives cards smooth rounded borders and a soft shadow.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <code style={{ color: '#ec4899', fontWeight: 'bold' }}>flex justify-between items-center</code>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  Places the title on the left and the theme button on the right.
                </p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('mini_project')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Next: Mini Project: Themeable SaaS UI <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. MINI PROJECT: THEMEABLE SAAS DASHBOARD & PRICING UI ─────────── */}
      {activeTab === 'mini_project' && (
        <Section key="mini_project" id="mini_project" eyebrow="Hands-On Practice • Day 8" title="Mini Project: Themeable SaaS UI (Made Simple!)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Friendly Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                <Sparkles size={16} /> SIMPLE &amp; PRACTICAL MINI PROJECT
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'white' }}>
                Themeable SaaS UI &amp; Pricing Dashboard
              </h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.6, margin: 0, color: 'white' }}>
                Don't worry if styling felt complicated earlier! In this project, we combine everything into <strong>3 easy concepts</strong>: 
                <strong> 1. Dark/Light Theme</strong>, <strong>2. Dynamic Progress Bars</strong>, and <strong>3. Clickable Pricing Cards</strong>.
              </p>
            </div>

            {/* ── INTERACTIVE LIVE PLAYGROUND ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                🎮 Try the Live Interactive Demo
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#6366f1', background: '#eff6ff', padding: '4px 10px', borderRadius: '8px', fontWeight: 600 }}>
                Click below to see React styles change live! 👇
              </span>
            </div>

            {/* Interactive Widget Box */}
            <div style={{
              background: miniDark ? '#0f172a' : '#f8fafc',
              color: miniDark ? '#f8fafc' : '#0f172a',
              border: miniDark ? '2px solid #334155' : '2px solid #e2e8f0',
              borderRadius: '20px',
              padding: '1.75rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              marginBottom: '2.5rem'
            }}>
              
              {/* Top Controls Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: miniDark ? '1px solid #334155' : '1px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6366f1' }}>
                    SaaS Dashboard Demo
                  </span>
                  <h4 style={{ margin: '2px 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: miniDark ? '#ffffff' : '#0f172a' }}>
                    ⚡ CloudFlow Analytics
                  </h4>
                </div>

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setMiniDark(!miniDark)}
                  style={{
                    background: miniDark ? '#1e293b' : '#ffffff',
                    color: miniDark ? '#f8fafc' : '#0f172a',
                    border: miniDark ? '1px solid #475569' : '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                  }}
                >
                  {miniDark ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#6366f1" />}
                  {miniDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
              </div>

              {/* Part 1: Dynamic Progress Bar (Inline Style Demo) */}
              <div style={{
                background: miniDark ? '#1e293b' : '#ffffff',
                border: miniDark ? '1px solid #334155' : '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '0.75rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: miniDark ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Cpu size={16} color="#6366f1" /> Live Server CPU Load: 
                      <span style={{ color: miniUsage > 80 ? '#ef4444' : miniUsage > 60 ? '#f59e0b' : '#10b981' }}> {miniUsage}%</span>
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: miniDark ? '#94a3b8' : '#64748b' }}>
                      Uses dynamic inline styling: <code>style=&#123;&#123; width: '{miniUsage}%' &#125;&#125;</code>
                    </span>
                  </div>

                  {/* Slider to adjust */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: miniDark ? '#94a3b8' : '#64748b' }}>Drag to change:</span>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={miniUsage} 
                      onChange={(e) => setMiniUsage(Number(e.target.value))}
                      style={{ cursor: 'pointer', width: '120px' }}
                    />
                  </div>
                </div>

                {/* Meter Track & Dynamic Bar */}
                <div style={{ width: '100%', height: '12px', background: miniDark ? '#334155' : '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${miniUsage}%`,
                    height: '100%',
                    background: miniUsage > 80 ? '#ef4444' : miniUsage > 60 ? '#f59e0b' : '#10b981',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease, background 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Part 2: Pricing Switcher */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'inline-flex',
                  background: miniDark ? '#1e293b' : '#e2e8f0',
                  padding: '4px',
                  borderRadius: '12px',
                  gap: '4px'
                }}>
                  <button
                    onClick={() => setMiniBilling('monthly')}
                    style={{
                      background: miniBilling === 'monthly' ? '#6366f1' : 'transparent',
                      color: miniBilling === 'monthly' ? '#ffffff' : (miniDark ? '#94a3b8' : '#475569'),
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setMiniBilling('annual')}
                    style={{
                      background: miniBilling === 'annual' ? '#6366f1' : 'transparent',
                      color: miniBilling === 'annual' ? '#ffffff' : (miniDark ? '#94a3b8' : '#475569'),
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Annual <span style={{ background: '#10b981', color: 'white', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px' }}>SAVE 20%</span>
                  </button>
                </div>
              </div>

              {/* Part 3: Pricing Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  { id: 'starter', name: 'Starter', monthly: 19, annual: 15, features: ['5 Projects', 'Community Support'] },
                  { id: 'pro', name: 'Pro Plan', monthly: 49, annual: 39, features: ['Unlimited Projects', 'Priority Support', 'Custom Domain'], popular: true },
                  { id: 'enterprise', name: 'Enterprise', monthly: 99, annual: 79, features: ['Dedicated Server', '24/7 SLA', 'Custom Security'] }
                ].map((plan) => {
                  const isSelected = miniPlan === plan.id;
                  const price = miniBilling === 'annual' ? plan.annual : plan.monthly;

                  return (
                    <div
                      key={plan.id}
                      onClick={() => setMiniPlan(plan.id)}
                      style={{
                        background: miniDark ? '#1e293b' : '#ffffff',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        border: isSelected 
                          ? '2.5px solid #6366f1' 
                          : plan.popular 
                            ? '2px solid #818cf8' 
                            : (miniDark ? '1px solid #334155' : '1px solid #e2e8f0'),
                        position: 'relative',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                        boxShadow: isSelected ? '0 10px 20px rgba(99, 102, 241, 0.2)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      {/* Most Popular Badge */}
                      {plan.popular && (
                        <span style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '15px',
                          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '10px'
                        }}>
                          POPULAR
                        </span>
                      )}

                      <div>
                        <h5 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800, color: miniDark ? '#ffffff' : '#0f172a' }}>
                          {plan.name}
                        </h5>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '0.5rem 0' }}>
                          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6366f1' }}>&#36;{price}</span>
                          <span style={{ fontSize: '0.8rem', color: miniDark ? '#94a3b8' : '#64748b' }}>/month</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                          {plan.features.map((f, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: miniDark ? '#cbd5e1' : '#475569' }}>
                              <Check size={14} color="#10b981" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        style={{
                          width: '100%',
                          background: isSelected ? '#6366f1' : 'transparent',
                          color: isSelected ? '#ffffff' : (miniDark ? '#cbd5e1' : '#475569'),
                          border: isSelected ? 'none' : (miniDark ? '1px solid #475569' : '1px solid #cbd5e1'),
                          borderRadius: '8px',
                          padding: '8px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          marginTop: '0.5rem'
                        }}
                      >
                        {isSelected ? '✓ Selected' : 'Choose Plan'}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* ── THE 3 SIMPLE CONCEPTS YOU NEED TO KNOW ── */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              🧠 The 3 Simple Rules Behind This Project
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              
              {/* Rule 1 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontWeight: 800, marginBottom: '0.5rem' }}>
                  <Sun size={18} /> 1. Dark/Light Theme Toggle
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem 0' }}>
                  Just store a boolean state and pick your colors with ternary operator:
                </p>
                <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  const [isDark, setIsDark] = useState(false);<br /><br />
                  const bg = isDark ? '#111827' : '#ffffff';<br />
                  const text = isDark ? '#ffffff' : '#111827';
                </div>
              </div>

              {/* Rule 2 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 800, marginBottom: '0.5rem' }}>
                  <TrendingUp size={18} /> 2. Dynamic Progress Bar
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem 0' }}>
                  Set the bar width directly from a percentage variable inside JSX:
                </p>
                <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  {`// Width dynamically changes with 'usage':`}
                  <br />
                  {`<div style={{ width: \`\${usage}%\` }} />`}
                </div>
              </div>

              {/* Rule 3 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontWeight: 800, marginBottom: '0.5rem' }}>
                  <CheckCircle size={18} /> 3. Selected Plan Highlight
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem 0' }}>
                  When a card is clicked, check if its ID matches the selected state:
                </p>
                <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  const isSelected = selected === plan.id;<br /><br />
                  border: isSelected ? '2px solid blue' : '1px solid gray'
                </div>
              </div>

            </div>

            {/* ── CODE TABS: EASY TO COPY & LEARN ── */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>
              💻 Choose Your Code View
            </h3>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button
                className={`btn ${miniCodeTab === 'simple' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMiniCodeTab('simple')}
                style={miniCodeTab === 'simple' ? { background: '#6366f1', borderColor: '#6366f1' } : {}}
              >
                ⚡ 30-Second Quick Start (Easiest)
              </button>
              <button
                className={`btn ${miniCodeTab === 'full' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMiniCodeTab('full')}
                style={miniCodeTab === 'full' ? { background: '#6366f1', borderColor: '#6366f1' } : {}}
              >
                📦 Full SaaSDashboard.jsx
              </button>
              <button
                className={`btn ${miniCodeTab === 'css' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMiniCodeTab('css')}
                style={miniCodeTab === 'css' ? { background: '#6366f1', borderColor: '#6366f1' } : {}}
              >
                🎨 Dashboard.module.css
              </button>
            </div>

            {/* Tab 1: 30-Second Super Simple Example */}
            {miniCodeTab === 'simple' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  Here is the simplest ~30-line version showing all 3 styling concepts without extra clutter:
                </p>
                <CodeBlock title="SimpleThemeApp.jsx" code={`import React, { useState } from 'react';

export default function SimpleThemeApp() {
  const [isDark, setIsDark] = useState(false);
  const [usage, setUsage] = useState(65);
  const [plan, setPlan] = useState('pro');

  return (
    <div style={{
      backgroundColor: isDark ? '#1e293b' : '#f8fafc',
      color: isDark ? '#ffffff' : '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      fontFamily: 'sans-serif'
    }}>
      {/* 1. Theme Toggle */}
      <button onClick={() => setIsDark(!isDark)}>
        Toggle to {isDark ? 'Light' : 'Dark'} Mode
      </button>

      {/* 2. Dynamic Progress Bar */}
      <h4 style={{ marginTop: '20px' }}>CPU Load: {usage}%</h4>
      <div style={{ width: '100%', height: '10px', background: '#ccc', borderRadius: '5px' }}>
        <div style={{
          width: \`\${usage}%\`,
          height: '100%',
          backgroundColor: usage > 80 ? 'red' : 'green',
          borderRadius: '5px'
        }} />
      </div>

      {/* 3. Clickable Plan Card */}
      <div 
        onClick={() => setPlan('pro')}
        style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '8px',
          background: isDark ? '#334155' : '#ffffff',
          border: plan === 'pro' ? '2px solid #6366f1' : '1px solid #ccc',
          cursor: 'pointer'
        }}
      >
        <strong>Pro Plan ($49/mo)</strong>
        <p>{plan === 'pro' ? '✓ Currently Selected' : 'Click to Select'}</p>
      </div>
    </div>
  );
}`} />
              </div>
            )}

            {/* Tab 2: Full Complete Component */}
            {miniCodeTab === 'full' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  The complete production-ready SaaS Dashboard component:
                </p>
                <CodeBlock title="src/SaaSDashboard.jsx" code={`import React, { useState } from 'react';

export default function SaaSDashboard() {
  // 1. Theme State (Dark / Light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Billing Period State (Monthly vs Annual)
  const [isAnnual, setIsAnnual] = useState(false);

  // 3. Selected Plan Tier
  const [selectedPlan, setSelectedPlan] = useState('pro');

  // 4. Resource Usage
  const [cpuUsage, setCpuUsage] = useState(68);

  const plans = [
    { id: 'starter', name: 'Starter', monthly: 19, annual: 15, features: ['5 Projects', 'Community Support'] },
    { id: 'pro', name: 'Pro Plan', monthly: 49, annual: 39, features: ['Unlimited Projects', 'Priority Support'], popular: true },
    { id: 'enterprise', name: 'Enterprise', monthly: 99, annual: 79, features: ['Dedicated Server', '24/7 SLA'] }
  ];

  return (
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
      color: isDarkMode ? '#f8fafc' : '#0f172a',
      padding: '2rem',
      borderRadius: '16px',
      fontFamily: 'system-ui, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      {/* Header & Theme Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>⚡ Cloud Analytics</h2>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Dynamic Progress Bar */}
      <div style={{ background: isDarkMode ? '#1e293b' : '#ffffff', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 600 }}>
          <span>Server CPU Utilization</span>
          <span style={{ color: cpuUsage > 80 ? '#ef4444' : '#10b981' }}>{cpuUsage}%</span>
        </div>
        <div style={{ width: '100%', height: '10px', background: isDarkMode ? '#334155' : '#e2e8f0', borderRadius: '10px' }}>
          <div style={{
            width: \`\${cpuUsage}%\`,
            height: '100%',
            backgroundColor: cpuUsage > 80 ? '#ef4444' : '#10b981',
            borderRadius: '10px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Billing Switcher */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setIsAnnual(false)} 
          style={{ padding: '6px 12px', background: !isAnnual ? '#6366f1' : 'transparent', color: !isAnnual ? '#fff' : 'inherit', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Monthly
        </button>
        <button 
          onClick={() => setIsAnnual(true)} 
          style={{ padding: '6px 12px', background: isAnnual ? '#6366f1' : 'transparent', color: isAnnual ? '#fff' : 'inherit', border: 'none', borderRadius: '6px', cursor: 'pointer', marginLeft: '6px' }}
        >
          Annual (Save 20%)
        </button>
      </div>

      {/* Pricing Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {plans.map((p) => {
          const isSelected = selectedPlan === p.id;
          const price = isAnnual ? p.annual : p.monthly;
          return (
            <div 
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              style={{
                background: isDarkMode ? '#1e293b' : '#ffffff',
                padding: '1.5rem',
                borderRadius: '12px',
                border: isSelected ? '2px solid #6366f1' : '1px solid #cbd5e1',
                cursor: 'pointer'
              }}
            >
              <h3 style={{ margin: '0 0 6px 0' }}>{p.name}</h3>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#6366f1' }}>\${price}/mo</div>
              <ul style={{ paddingLeft: '1.2rem', margin: '1rem 0' }}>
                {p.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button style={{ width: '100%', padding: '8px', borderRadius: '6px', background: isSelected ? '#6366f1' : '#e2e8f0', color: isSelected ? '#fff' : '#000', border: 'none', fontWeight: 600 }}>
                {isSelected ? '✓ Selected' : 'Choose'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}`} />
              </div>
            )}

            {/* Tab 3: CSS Modules */}
            {miniCodeTab === 'css' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  Optional CSS Modules stylesheet if you want scoped classes:
                </p>
                <CodeBlock title="src/Dashboard.module.css" code={`/* Scoped classes for cards and badges */
.cardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.planCard {
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.planCard:hover {
  transform: translateY(-4px);
}

.popularBadge {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
}`} />
              </div>
            )}

            {/* Next step button */}
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Next: Check Your Knowledge (Quiz) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. INTERACTIVE QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Knowledge Check" title="Day 8 Interactive Quiz">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {quizQuestions.map((item, qi) => (
                <div key={item.key} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem 0' }}>{qi + 1}. {item.question}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.options.map((opt, oi) => {
                      const isSelected = quizAnswers[item.key] === oi;
                      const isCorrect = oi === item.correct;
                      let bg = "white";
                      let border = "1px solid #cbd5e1";
                      if (quizChecked) {
                        if (isCorrect) { bg = "#dcfce7"; border = "1.5px solid #10b981"; }
                        else if (isSelected) { bg = "#fee2e2"; border = "1.5px solid #ef4444"; }
                      } else if (isSelected) {
                        bg = "#e0f2fe"; border = "1.5px solid #0ea5e9";
                      }
                      return (
                        <button
                          key={oi}
                          disabled={quizChecked}
                          onClick={() => handleQuizAnswer(item.key, oi)}
                          style={{ background: bg, border: border, padding: '0.6rem 1rem', borderRadius: 8, cursor: quizChecked ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizChecked && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!quizChecked ? (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setQuizChecked(true)} 
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: '150px' }}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => { setQuizAnswers({}); setQuizChecked(false); }}
                      style={{ minWidth: '150px' }}
                    >
                      Retry Quiz
                    </button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: getQuizScore() === quizQuestions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {getQuizScore()} / {quizQuestions.length} ({Math.round((getQuizScore() / quizQuestions.length) * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. ASSIGNMENT ───────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 8 Assignment: Styling in React">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Completion banner with fix for contrast */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem', color: 'white' }}>🎓 Day 8 Syllabus Completed!</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Awesome! You have fully mastered Inline Styling objects, CSS Scoped Modules, Styled Components backticks resolving props, and Tailwind CSS configuration setups. Complete your homework assignment.
              </p>
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>📋 Homework Assignments</h4>
            {[
              { num: 1, title: 'Scoped Navigation Header App', icon: '🎨', desc: 'Create a header bar where style rules are isolated using CSS Modules. Prevent style overrides from leaking into sibling components.', hint: 'Use Navigation.module.css and import styles from "./Navigation.module.css".' },
              { num: 2, title: 'Dynamic Styled Alert Cards', icon: '💅', desc: 'Create an AlertCard component using Styled Components. The background and border colors should dynamically resolve based on the passed alert type prop (e.g. success, warning, error).', hint: 'Map type props: background: ${props => props.type === "success" ? "#dcfce7" : "#fee2e2"}.' },
              { num: 3, title: 'Tailwind Profile Grid', desc: 'Design a responsive Profile Grid with hover effects and spacing helpers. Style it strictly using Tailwind utility class naming patterns.', hint: 'Use md:grid-cols-4 and shadow-lg indicators.', icon: '🌐' }
            ].map(task => (
              <div key={task.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{task.icon}</div>
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

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
              <BookOpenCheck size={36} color="#6366f1" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>Submit Day 8 Exercises</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save your code files inside the local playground repository and sync to complete module validation.</p>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}

// Minimal GlobeIcon helper mapping
const GlobeIcon = ({ size, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);
