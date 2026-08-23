import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Layers, Database, Sparkles, RefreshCw, Settings, 
  CheckCircle, Code, ArrowRight, Info, Play, Trash2, Cpu, 
  Laptop, Terminal, Copy, FileText, User as UserIcon, Plus, 
  AlertTriangle, Check, BookOpenCheck, HelpCircle, Sliders,
  GitBranch, Palette, Eye, Layout, ShieldAlert, Monitor, 
  Grid, Compass, Sun, Moon, Lock
} from 'lucide-react';

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

const highlightJS = (code) => {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // String literals first
  html = html.replace(/(?<!=)(["'])(?:\\.|[^\n"'\\])*?\1/g, '<span style="color: #a5d6ff;">$&</span>');

  // Comments
  html = html.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(#[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');

  const keywords = ['const', 'let', 'var', 'return', 'import', 'export', 'default', 'function', 'from', 'class', 'extends', 'if', 'else', 'new', 'typeof', 'as'];
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b(${kw})\\b`, 'g');
    html = html.replace(reg, '<span style="color: #ff7b72; font-weight: bold;">$1</span>');
  });

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
    <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflowX: 'auto', margin: '1.5rem 0', position: 'relative', width: '100%' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        <Section key="intro_react" id="intro_react" eyebrow="Module 01 • Day 8" title="Inline Styling in React">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header banner with contrast fix */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>🎨 Styling Methods in React</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white', margin: 0 }}>
                React elements can be styled using multiple patterns: Inline Styles, traditional CSS files, Scoped CSS Modules, Styled Components libraries, and utility engines like Tailwind CSS.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>Inline Styling</h3>
            <p>
              In React JSX, inline styles are written directly inside the elements using **JavaScript objects** rather than style strings.
            </p>

            <div style={{ background: '#f8fafc', borderLeft: '4px solid #6366f1', padding: '1rem', borderRadius: '4px 12px 12px 4px', margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <strong style={{ color: '#0f172a' }}>⚠️ Inline Styling Rules:</strong>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#475569' }}>
                <li>Styles must be represented as a JavaScript <strong>object</strong>.</li>
                <li>CSS properties must use <strong>camelCase</strong> keys (e.g. <code>backgroundColor</code> instead of <code>background-color</code>).</li>
                <li>CSS values are written as strings (or numbers, which React converts to pixel units automatically).</li>
              </ul>
            </div>

            <CodeBlock title="InlineExample.jsx" code={`function InlineExample() {
  const style = {
    color: "white",
    backgroundColor: "blue",
    padding: "10px",
    textAlign: "center"
  };

  return <h2 style={style}>Hello React Styling</h2>;
}

// Or inline directly (using double curly braces):
<h3 style={{ color: "red", fontSize: "20px" }}>Inline Style</h3>`} />

            {/* --- INTERACTIVE WIDGET: INLINE STYLE COMPILER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>⚙️ Live Inline Style Compiler</h4>
            <p>Modify the style state properties below and watch how React compiles the variables into a dynamic JSX inline style object.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Text Color:</label>
                    <input type="color" value={inlineColor} onChange={(e) => setInlineColor(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', cursor: 'pointer' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Background Color:</label>
                    <input type="color" value={inlineBg} onChange={(e) => setInlineBg(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', cursor: 'pointer' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Padding (px): {inlinePadding}px</label>
                    <input type="range" min="10" max="40" value={inlinePadding} onChange={(e) => setInlinePadding(e.target.value)} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Border Radius (px): {inlineRadius}px</label>
                    <input type="range" min="0" max="30" value={inlineRadius} onChange={(e) => setInlineRadius(e.target.value)} style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Compiled Code block view */}
                <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  <span style={{ color: '#8892b0' }}>{'// Compiled JSX Code:'}</span>
                  <div style={{ marginTop: '4px' }}>
                    {`<div style={{`}
                    <div style={{ paddingLeft: '1rem', color: '#a5d6ff' }}>
                      color: <span style={{ color: '#ff7b72' }}>"{inlineColor}"</span>,<br />
                      backgroundColor: <span style={{ color: '#ff7b72' }}>"{inlineBg}"</span>,<br />
                      padding: <span style={{ color: '#ff7b72' }}>"{inlinePadding}px"</span>,<br />
                      borderRadius: <span style={{ color: '#ff7b72' }}>"{inlineRadius}px"</span>
                    </div>
                    {`}}>Preview Card</div>`}
                  </div>
                </div>
              </div>

              {/* Visual Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{
                  color: inlineColor,
                  backgroundColor: inlineBg,
                  padding: `${inlinePadding}px`,
                  borderRadius: `${inlineRadius}px`,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.15s ease'
                }}>
                  Preview Element
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('useState_hook')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. CSS MODULES ─────────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="useState_hook" id="useState_hook" eyebrow="Module 02 • Day 8" title="CSS Files vs CSS Modules">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              Traditional CSS files import styles globally. If two components use the class name <code>.btn</code>, the stylesheet imported last will override the first one, causing UI style leakage bugs.
            </p>
            <p>
              <strong>CSS Modules</strong> solve this by scoping classes locally to the component. Vite automatically parses filenames ending in <code>*.module.css</code> and compiles class keys into unique hashed strings.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 16, border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 4 }}><GlobeIcon size={16} /> Traditional CSS Files</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Styles are linked globally. Class conflicts occur easily if identical names are reused across different components.</p>
                <CodeBlock title="Button.css" code={`.btn {
  background-color: green;
  color: white;
}`} />
              </div>

              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: 16, border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800, color: '#1e40af', display: 'flex', alignItems: 'center', gap: 4 }}><Lock size={16} /> Scoped CSS Modules</h4>
                <p style={{ fontSize: '0.85rem', color: '#1e3a8a' }}>CSS is compiled locally. Vite resolves classes as keys on an imported styles object, generating unique hash identifiers.</p>
                <CodeBlock title="Button.module.css" code={`.btn {
  background-color: purple;
  color: white;
}`} />
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET: SCOPING & LEAKS PLAYGROUND --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🔒 Live Namespace Scoping Simulator</h4>
            <p>Toggle the styling method below. Observe how global scoping leaks CSS overrides across components, while modular scoping isolates button styles by compiling classes into unique hashes.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '8px' }}>Select CSS Compiler Mode:</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className={`btn ${moduleScoping === 'global' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setModuleScoping('global')} style={moduleScoping === 'global' ? { background: '#ef4444', borderColor: '#ef4444' } : {}}>Global Style Sheet Leak</button>
                  <button className={`btn ${moduleScoping === 'modular' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setModuleScoping('modular')} style={moduleScoping === 'modular' ? { background: '#10b981', borderColor: '#10b981' } : {}}>Local CSS Modules Hash</button>
                </div>

                <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  <span style={{ color: '#8892b0' }}>{'// Mapped HTML Class Attribute:'}</span>
                  <div style={{ marginTop: '4px', color: '#a5d6ff' }}>
                    {moduleScoping === 'global' ? (
                      `class="btn"   /* leaked! global overrides button color */`
                    ) : (
                      `class="Button_btn__a8b9c"   /* scoped hash prevents overrides */`
                    )}
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Button visual output:</span>
                <button style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'white',
                  background: moduleScoping === 'global' ? '#10b981' : '#a855f7',
                  transition: 'background 0.15s ease'
                }}>
                  {moduleScoping === 'global' ? 'Green button (Leaked global)' : 'Purple button (Modular)'}
                </button>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('multiple_states')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. STYLED COMPONENTS ────────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="multiple_states" id="multiple_states" eyebrow="Module 03 • Day 8" title="Styled Components">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              <strong>Styled Components</strong> is a popular library that allows writing plain CSS inside JavaScript using ES6 template literals. It creates styled React components directly.
            </p>

            <CodeBlock title="StyledButton.jsx" code={`import styled from "styled-components";

const Button = styled.button\`
  background-color: \${props => props.primary ? "#4CAF50" : "#2196F3"};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px;

  &:hover {
    opacity: 0.8;
  }
\`;`} />

            {/* --- INTERACTIVE WIDGET: STYLED RESOLVER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>💅 Live Template Literal Resolver</h4>
            <p>Toggle the primary prop flag below. Watch how the backtick template expression evaluates dynamically inside JavaScript to override styling attributes.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <button 
                  className={`btn ${styledPrimary ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setStyledPrimary(prev => !prev)}
                  style={{ width: '100%', background: styledPrimary ? '#6366f1' : 'transparent', borderColor: '#6366f1', color: styledPrimary ? 'white' : '#6366f1', marginBottom: '1rem' }}
                >
                  Toggle Component Prop: primary = {styledPrimary ? 'true' : 'false'}
                </button>

                <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  {`background-color: `}
                  <span style={{ 
                    background: styledPrimary ? '#10b981' : 'transparent', 
                    color: styledPrimary ? 'white' : '#38bdf8',
                    padding: '2px 4px',
                    borderRadius: 4
                  }}>{`props.primary ? "#4CAF50" (Green)`}</span>
                  {` : `}
                  <span style={{ 
                    background: !styledPrimary ? '#3b82f6' : 'transparent', 
                    color: !styledPrimary ? 'white' : '#38bdf8',
                    padding: '2px 4px',
                    borderRadius: 4
                  }}>{`"#2196F3" (Blue)`}</span>
                </div>
              </div>

              {/* Resolution output */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <button style={{
                  background: styledPrimary ? '#4CAF50' : '#2196F3',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}>
                  {styledPrimary ? 'Primary Button' : 'Normal Button'}
                </button>
              </div>
            </div>

            {/* --- DASHBOARD PREVIEW --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>📊 Styled Components Dashboard Preview (Page 7)</h4>
            <div style={{ background: '#e8e8e8', padding: '1.5rem', borderRadius: 16, border: '1px solid #cbd5e1', textAlign: 'center' }}>
              <div style={{ background: '#282c34', color: 'white', padding: '1rem', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>Styled Components Dashboard</h4>
              </div>
              <div style={{ padding: '1rem', background: '#f4f4f4', borderRadius: '0 0 8px 8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  <button style={{ background: '#4CAF50', color: 'white', padding: '6px 12px', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>Primary Button</button>
                  <button style={{ background: '#2196F3', color: 'white', padding: '6px 12px', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>Normal Button</button>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[
                    { title: "Users", val: "Total Users: 120" },
                    { title: "Orders", val: "Total Orders: 45" },
                    { title: "Revenue", val: "$4500" }
                  ].map((card, idx) => (
                    <div key={idx} style={{ background: 'white', padding: '12px 18px', border: '1px solid #ddd', borderRadius: 8, minWidth: '130px', textAlign: 'center' }}>
                      <strong style={{ display: 'block', color: '#333', fontSize: '0.85rem' }}>{card.title}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#666' }}>{card.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('object_state')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. TAILWIND CSS SETUP ──────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="object_state" id="object_state" eyebrow="Module 04 • Day 8" title="Tailwind CSS Setup">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              Tailwind CSS is a utility-first CSS framework. It provides classes (like <code>flex</code>, <code>bg-blue-600</code>, <code>text-white</code>, <code>p-4</code>) to design interfaces quickly.
            </p>

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, margin: '1.5rem 0 0.8rem 0' }}>Tailwind Installation in Vite:</h3>
            <CodeBlock title="Shell / Terminal" code={`npm create vite@latest tailwind-dashboard
cd tailwind-dashboard
npm install

# Install Tailwind and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind configuration file
npx tailwindcss init`} />

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, margin: '1.5rem 0 0.8rem 0' }}>Configure Tailwind:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', margin: '1rem 0' }}>
              <div>
                <CodeBlock title="tailwind.config.js" code={`export default {
  // Scans HTML and JS/JSX files for utility classes
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}`} />
              </div>
              <div>
                <CodeBlock title="src/index.css" code={`@tailwind base;
@tailwind components;
@tailwind utilities;`} />
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('nested_state')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. TAILWIND STUDENT DASHBOARD ───────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="nested_state" id="nested_state" eyebrow="Module 05 • Day 8" title="Tailwind Student Dashboard">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header banner with contrast fix */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>💼 Tailwind Student Dashboard Project</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white', margin: 0 }}>
                This student dashboard simulates Tailwind utility-based layout grid designs, complete with responsive columns, spacing classes, and light/dark theme variables.
              </p>
            </div>

            {/* --- INTERACTIVE WIDGET: TAILWIND DASHBOARD SIMULATOR --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📱 Tailwind Theme Toggle Simulator</h4>
            <p>Click "Toggle Theme". Notice how the classes prefix (e.g. <code>dark:bg-gray-900</code>) reacts to the top-level parent class, swapping color palettes instantly.</p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 20 }}>
              
              {/* Simulator shell panel replicating Page 10 */}
              <div style={{ 
                background: tailwindDark ? '#111827' : '#f3f4f6', 
                color: tailwindDark ? '#f9fafb' : '#111827', 
                borderRadius: '12px', 
                border: '1px solid #d1d5db', 
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}>
                
                {/* Navbar */}
                <div style={{ background: '#2563eb', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                  <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>student Dashboard</h4>
                  <button 
                    onClick={() => setTailwindDark(d => !d)}
                    style={{ background: 'white', color: '#111827', border: 'none', padding: '6px 12px', borderRadius: 6, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    {tailwindDark ? <Sun size={14} /> : <Moon size={14} />}
                    Toggle Theme
                  </button>
                </div>

                {/* Grid Container */}
                <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  
                  {/* Profile Card */}
                  <div style={{ 
                    background: tailwindDark ? '#e5e7eb' : 'white', 
                    color: '#111827',
                    padding: '1.25rem', 
                    borderRadius: 8, 
                    textAlign: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}>
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                      alt="Avatar"
                      style={{ width: '80px', margin: '0 auto 10px auto', borderRadius: '50%' }}
                    />
                    <h5 style={{ margin: '0 0 2px 0', fontWeight: 800, color: '#1f2937' }}>John Doe</h5>
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>B.Sc Computer Science</span>
                  </div>

                  {/* Stat Cards */}
                  {[
                    { title: "Total Students", value: "250" },
                    { title: "Attendance", value: "85%" },
                    { title: "Assignments", value: "12" },
                    { title: "Pending Fees", value: "₹5000" },
                    { title: "Exams", value: "3 Upcoming" }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        background: tailwindDark ? '#1f2937' : 'white', 
                        color: tailwindDark ? '#f9fafb' : '#1f2937', 
                        padding: '1.25rem', 
                        borderRadius: 8,
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06)',
                        border: tailwindDark ? '1px solid #374151' : '1px solid #e5e7eb'
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: tailwindDark ? '#9ca3af' : '#6b7280', display: 'block', fontWeight: 600 }}>{stat.title}</span>
                      <strong style={{ display: 'block', fontSize: '1.6rem', marginTop: '6px' }}>{stat.value}</strong>
                    </div>
                  ))}

                </div>

              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Go to Module Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. INTERACTIVE QUIZ ─────────────────────────────────────────────── */}
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
