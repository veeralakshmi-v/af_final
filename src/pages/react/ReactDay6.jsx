import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Layers, Database, Sparkles, RefreshCw, Settings, 
  CheckCircle, Code, ArrowRight, Info, Play, Trash2, Cpu, 
  Laptop, Terminal, Copy, FileText, User as UserIcon, Plus, 
  AlertTriangle, Check, BookOpenCheck, HelpCircle, Sliders,
  GitBranch, CheckSquare, Square, Mail, Lock, ShieldAlert,
  Bell, Eye, EyeOff, Loader, FolderOpen, Heart
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

  html = html.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(#[^\n]*)/g, '<span style="color: #8892b0;">$1</span>');
  html = html.replace(/(["'])([\s\S]*?)\1/g, '<span style="color: #a5d6ff;">$1$2$1</span>');

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

const CodeBlock = ({ title, code, highlightedLines = [] }) => {
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

// --- Mock Components for Swapper (Page 8) ---
const DashboardComponent = () => (
  <div style={{ padding: '1.5rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: 12, textAlign: 'center' }}>
    <Sparkles size={32} color="#10b981" style={{ marginBottom: '8px' }} />
    <h4 style={{ fontWeight: 800, color: '#14532d', margin: '0 0 4px 0' }}>Dashboard Component</h4>
    <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534' }}>Welcome Back, User! Accessing premium data feeds...</p>
  </div>
);

const LoginComponent = () => (
  <div style={{ padding: '1.5rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 12, textAlign: 'center' }}>
    <Lock size={32} color="#ef4444" style={{ marginBottom: '8px' }} />
    <h4 style={{ fontWeight: 800, color: '#7f1d1d', margin: '0 0 4px 0' }}>Login Component</h4>
    <p style={{ margin: 0, fontSize: '0.85rem', color: '#991b1b' }}>Please enter credentials to unlock dashboard.</p>
  </div>
);

export default function ReactDay6({ activeTab, onNavigate }) {
  const handleContinue = (nextTabId) => {
    onNavigate('react_module6', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Widget 1: if/else logic simulator (Page 4) ---
  const [isLoggedInIfElse, setIsLoggedInIfElse] = useState(true);

  // --- Widget 2: Ternary highlight sandbox (Page 5,6) ---
  const [isLoggedInTernary, setIsLoggedInTernary] = useState(false);

  // --- Widget 3: Logical AND indicator (Page 7) ---
  const [notificationCount, setNotificationCount] = useState(0);

  // --- Widget 4: Component Swapper playground (Page 8) ---
  const [swapperLoggedIn, setSwapperLoggedIn] = useState(true);

  // --- Widget 5: Loading, Error & Empty state fetch simulator (Page 9, 10, 11) ---
  const [apiState, setApiState] = useState('idle'); // idle, loading, success_data, success_empty, error
  const [fetchedItems, setFetchedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const triggerApiCall = (mode) => {
    setApiState('loading');
    setFetchedItems([]);
    setErrorMessage("");

    setTimeout(() => {
      if (mode === 'success_data') {
        setApiState('success_data');
        setFetchedItems(['Vite.js Scaffolding', 'React DOM Elements', 'framer-motion physics', 'lucide-react icons']);
      } else if (mode === 'success_empty') {
        setApiState('success_empty');
        setFetchedItems([]);
      } else if (mode === 'error') {
        setApiState('error');
        setErrorMessage("Network Error: Failed to fetch API records (code 503)");
      }
    }, 1500);
  };

  // --- Quiz States ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const quizQuestions = [
    {
      key: 'q1',
      question: 'Which of the following is true regarding writing if/else blocks inside React JSX returns?',
      options: [
        'It is fully valid and recommended for clean rendering.',
        'if/else statements cannot be written inside JSX return blocks. They must be executed before return.',
        'if/else statements should be written inside single curly braces in JSX.',
        'React renders if/else statements as plain HTML text.'
      ],
      correct: 1,
      explanation: 'Because JSX is syntactic sugar for function calls, statement syntax like if/else cannot be embedded inside expressions. Use ternary operators (? :) or logical AND (&&) for inline conditions, or use if/else before returning.'
    },
    {
      key: 'q2',
      question: 'When is it best to use the Ternary Operator (? :) in React?',
      options: [
        'For writing multi-level nested loops.',
        'For styling static text fields only.',
        'For clean, inline conditional rendering of two mutually exclusive expressions or small HTML nodes.',
        'To prevent component re-renders completely.'
      ],
      correct: 2,
      explanation: 'Ternary operators are ideal for short, inline conditions where you need to render one of two possible outcomes based on a boolean value.'
    },
    {
      key: 'q3',
      question: 'What happens in React when using {condition && <Component />} if the condition is false?',
      options: [
        'React renders the text "false" to the screen.',
        'It throws a TypeError crash.',
        'Nothing is rendered at all (evaluates to false, which React ignores).',
        'It falls back to loading spinners.'
      ],
      correct: 2,
      explanation: 'React ignores boolean outputs like false. If the left side of the logical AND operator is false, the expression short-circuits and renders nothing.'
    },
    {
      key: 'q4',
      question: 'If you want to render a warning card stating "No data found" when a fetched array is empty, which check is correct?',
      options: [
        'if (items === []) { return <p>No data found</p>; }',
        'if (items.length === 0) { return <p>No data found</p>; }',
        'if (!items) { return <p>No data found</p>; }',
        'if (items.isEmpty) { return <p>No data found</p>; }'
      ],
      correct: 1,
      explanation: 'Checking array length (items.length === 0) is the correct way to identify empty state arrays. In JavaScript, empty arrays evaluate to truthy, so checking if (items) or comparing array pointers (items === []) will fail.'
    }
  ];

  const handleQuizAnswer = (qKey, optIdx) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [qKey]: optIdx }));
  };

  const getQuizScore = () => quizQuestions.filter(q => quizAnswers[q.key] === q.correct).length;

  return (
    <AnimatePresence mode="wait">
      
      {/* ── 1. IF/ELSE RENDERING ────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="intro_react" id="intro_react" eyebrow="Module 01 • Day 6" title="if / else Rendering">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header banner with contrast fix */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>🔀 What is Conditional Rendering?</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white', margin: 0 }}>
                Conditional Rendering means **showing different UI elements based on conditions** (such as login status, loading cycles, validation errors, or data empty states). In React, conditions are handled using plain JavaScript, not custom templates.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>The if/else Concept</h3>
            <p>
              <code>if/else</code> statements are standard JavaScript logic blocks. They are used when rendering logic is complex or multiple conditions exist.
            </p>

            <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem', borderRadius: '4px 12px 12px 4px', margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#0369a1', fontSize: '0.92rem' }}>⚠️ <strong>if / else statements cannot be written inside JSX return blocks</strong></span>
              <span style={{ color: '#0369a1', fontSize: '0.92rem' }}>⚠️ <strong>Write if / else conditions before the return statement</strong></span>
            </div>

            <CodeBlock title="if_else_example.jsx" code={`function App() {
  const isLoggedIn = true;

  // if/else executes BEFORE the return block
  if (isLoggedIn) {
    return <h1>Welcome User</h1>;
  } else {
    return <h1>Please Login</h1>;
  }
}`} />

            {/* --- INTERACTIVE WIDGET: IF/ELSE MOCK --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>👤 Live if/else Render Playground</h4>
            <p>Toggle the login status state below. Watch how the complete return block is switched programmatically based on the state variable.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '8px' }}>Toggle State (isLoggedIn):</label>
                <button 
                  className={`btn ${isLoggedInIfElse ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setIsLoggedInIfElse(prev => !prev)}
                  style={{ width: '100%', background: isLoggedInIfElse ? '#6366f1' : 'transparent', borderColor: '#6366f1', color: isLoggedInIfElse ? 'white' : '#6366f1' }}
                >
                  {isLoggedInIfElse ? 'isLoggedIn = true (Logout)' : 'isLoggedIn = false (Login)'}
                </button>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifycontent: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '8px' }}>Rendered output:</span>
                {isLoggedInIfElse ? (
                  <h3 style={{ margin: 0, color: '#10b981', fontWeight: 800 }}>Welcome User</h3>
                ) : (
                  <h3 style={{ margin: 0, color: '#ef4444', fontWeight: 800 }}>Please Login</h3>
                )}
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

      {/* ── 2. TERNARY OPERATOR ─────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="useState_hook" id="useState_hook" eyebrow="Module 02 • Day 6" title="Ternary Operator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              The ternary operator (<code>? :</code>) is an inline expression used to conditionally evaluate one of two sub-expressions. It is a clean way to implement short, inline render logic directly within JSX.
            </p>

            <CodeBlock title="TernaryApp.jsx" code={`function App() {
  const isLoggedIn = false;

  return (
    <h1>
      {isLoggedIn ? "Welcome User" : "Please Login"}
    </h1>
  );
}`} />

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}><Info size={16} /> When to use Ternaries?</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0 }}>
                  <li><strong>Clean UI code:</strong> Avoids breaking JSX structures with early returns.</li>
                  <li><strong>Short conditions:</strong> Best for simple checks (e.g. true/false values).</li>
                  <li><strong>Inline rendering:</strong> Allows changing small text strings or styling properties inline.</li>
                </ul>
              </div>

              {/* Graphic Diagram Mock */}
              <div style={{ background: '#e0f2fe', border: '1px solid #bae6fd', padding: '1.25rem', borderRadius: 16, fontSize: '0.8rem', color: '#0369a1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <strong style={{ display: 'block', marginBottom: '8px' }}>Ternary syntax cycle:</strong>
                <div style={{ fontFamily: 'monospace', background: '#0f172a', color: '#cbd5e1', padding: '10px', borderRadius: 8 }}>
                  Condition <span style={{ color: '#38bdf8' }}>?</span> Expr1 <span style={{ color: '#ffb454' }}>:</span> Expr2
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>
                  • If True: Executes/renders Expr1
                  <br />
                  • If False: Executes/renders Expr2
                </div>
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET: TERNARY TRACER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🔍 Interactive Ternary Operator Path Tracer</h4>
            <p>Click to toggle the login state below. Watch which expression branch is active and how the rendering engine evaluates it.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setIsLoggedInTernary(prev => !prev)}
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  Toggle State (isLoggedIn = {isLoggedInTernary ? 'true' : 'false'})
                </button>

                {/* Inline code blocks with branch highlights */}
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, fontFamily: 'monospace', fontSize: '0.85rem', color: '#e1e4e8', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  <span>{`{ isLoggedIn ?`}</span>
                  <span style={{ 
                    background: isLoggedInTernary ? '#10b981' : 'transparent', 
                    color: isLoggedInTernary ? 'white' : '#8892b0',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontWeight: isLoggedInTernary ? 'bold' : 'normal'
                  }}>
                    "Welcome Back!"
                  </span>
                  <span>{`:`}</span>
                  <span style={{ 
                    background: !isLoggedInTernary ? '#ef4444' : 'transparent', 
                    color: !isLoggedInTernary ? 'white' : '#8892b0',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontWeight: !isLoggedInTernary ? 'bold' : 'normal'
                  }}>
                    "Please Sign In"
                  </span>
                  <span>{`}`}</span>
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifycontent: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '8px' }}>Component output:</span>
                <h3 style={{ margin: 0, fontWeight: 800, color: '#6366f1' }}>
                  {isLoggedInTernary ? "Welcome Back!" : "Please Sign In"}
                </h3>
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

      {/* ── 3. CONDITIONAL COMPONENT RENDERING ───────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="multiple_states" id="multiple_states" eyebrow="Module 03 • Day 6" title="Conditional Component Rendering">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>Rendering Entire Components Based on Conditions</h3>
            <p>
              In large production apps, we don't just change simple text strings. We swap out **entire visual components** (like rendering a `Dashboard` layout for authenticated users, and a `Login` wrapper card for guests). This is a core best practice in React.
            </p>

            <CodeBlock title="ComponentSwapper.jsx" code={`function Login() {
  return <h2>Login Component</h2>;
}

function Dashboard() {
  return <h2>Dashboard Component</h2>;
}

function App() {
  const isLoggedIn = true;
  return (
    <>
      {isLoggedIn ? <Dashboard /> : <Login />}
    </>
  );
}`} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <CheckCircle size={24} color="#6366f1" style={{ marginBottom: '6px' }} />
                <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>Break UI</h5>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Keeps your files small, focused, and component modular.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <Cpu size={24} color="#6366f1" style={{ marginBottom: '6px' }} />
                <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>Improve Readability</h5>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Easier to audit conditional branches in parent files.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <RefreshCw size={24} color="#6366f1" style={{ marginBottom: '6px' }} />
                <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>Reusable Code</h5>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Individual sub-components remain fully reusable.</span>
              </div>
            </div>

            {/* --- INTERACTIVE COMPONENT SWAPPER PLAYGROUND --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🧩 Live Component Swapper Playground</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '8px' }}>Toggle Authentication (isLoggedIn):</label>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setSwapperLoggedIn(prev => !prev)}
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  isLoggedIn = {swapperLoggedIn ? 'true (Logout)' : 'false (Login)'}
                </button>
                <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  {`{ isLoggedIn ? `}
                  <span style={{ color: swapperLoggedIn ? '#86efac' : '#8892b0' }}>&lt;Dashboard /&gt;</span>
                  {` : `}
                  <span style={{ color: !swapperLoggedIn ? '#fca5a5' : '#8892b0' }}>&lt;Login /&gt;</span>
                  {` }`}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {swapperLoggedIn ? <DashboardComponent /> : <LoginComponent />}
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

      {/* ── 4. LOGICAL AND (&&) OPERATOR ────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="object_state" id="object_state" eyebrow="Module 04 • Day 6" title="Logical AND (&&) Operator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>The Short-Circuit Evaluation Concept</h3>
            <p>
              Sometimes, you only want to render markup when a condition is <strong>true</strong>, and render <strong>nothing</strong> if it is false. 
              In JavaScript, the double ampersand <code>&amp;&amp;</code> operator short-circuits: if the left operand is false, it returns false and skips evaluating the right side.
            </p>
            <p>
              Since React ignores boolean values like <code>false</code> in JSX, this results in nothing being rendered when the condition evaluates to false.
            </p>

            <CodeBlock title="Notification.jsx" code={`function Notification({ hasNotifications }) {
  return (
    <div>
      {hasNotifications && <p>You have new notifications!</p>}
    </div>
  );
}`} />

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}><Info size={16} /> Key Characteristics</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0 }}>
                  <li><strong>If condition is true:</strong> React renders the component on the right.</li>
                  <li><strong>If condition is false:</strong> React renders nothing.</li>
                  <li><strong>No else block:</strong> Best suited for unary conditions (where no fallback UI is needed).</li>
                </ul>
              </div>

              <div style={{ background: '#fee2e2', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: 16, fontSize: '0.9rem', color: '#991b1b', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <strong>⚠️ Gotcha Alert:</strong> Avoid using numbers (e.g. <code>count &amp;&amp; &lt;Badge/&gt;</code>) if count can be 0. If count is 0, JavaScript evaluates the left side to 0, and React *will* render the number 0 to the screen! Always check lengths (e.g. <code>count &gt; 0 &amp;&amp; &lt;Badge/&gt;</code>).
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET: NOTIFICATION ALERTS --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🔔 Interactive Notification center</h4>
            <p>Click "Send Notification" to increment count. The alert dialog will render only when count is greater than zero using the logical AND (&&) operator.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  <button className="btn btn-primary" onClick={() => setNotificationCount(c => c + 1)} style={{ background: '#6366f1', borderColor: '#6366f1', flex: 1 }}>Send Notification</button>
                  <button className="btn btn-outline" onClick={() => setNotificationCount(0)} disabled={notificationCount === 0} style={{ flex: 1 }}>Clear All</button>
                </div>

                <div style={{ background: '#0f172a', padding: '12px 16px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  {`{ notificationCount > 0 && `}
                  <span style={{ color: notificationCount > 0 ? '#86efac' : '#8892b0' }}>&lt;Badge count={"{count}"} /&gt;</span>
                  {` }`}
                </div>
              </div>

              {/* Live Render Area */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative' }}>
                <Bell size={32} color={notificationCount > 0 ? "#6366f1" : "#cbd5e1"} />
                
                {/* Logical AND rendering here */}
                {notificationCount > 0 && (
                  <div style={{ background: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '1.5rem', right: '4.2rem' }}>
                    {notificationCount}
                  </div>
                )}
                
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>
                  {notificationCount > 0 ? `You have ${notificationCount} unread alert messages` : "No new notifications"}
                </span>
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

      {/* ── 5. LOADING & ERROR UI ─────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="nested_state" id="nested_state" eyebrow="Module 05 • Day 6" title="Loading & Error UI">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>
              In real-world production projects, data loading is asynchronous. We fetch data from APIs, which can succeed (returning items) or fail (due to connection/auth errors). React developers handle these states conditionally:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '1.25rem', borderRadius: 12 }}>
                <h5 style={{ fontWeight: 800, color: '#d97706', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: 4 }}><Loader size={14} className="animate-spin" /> Loading UI</h5>
                <span style={{ fontSize: '0.8rem', color: '#b45309' }}>Rendered while the fetch request is pending. Keeps users informed.</span>
              </div>
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1.25rem', borderRadius: 12 }}>
                <h5 style={{ fontWeight: 800, color: '#dc2626', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: 4 }}><ShieldAlert size={14} /> Error UI</h5>
                <span style={{ fontSize: '0.8rem', color: '#b91c1c' }}>Rendered if something fails, displaying red warning containers or retry options.</span>
              </div>
            </div>

            <CodeBlock title="AsyncStates.jsx" code={`// Loading UI
if (isLoading) {
  return <h3>Loading...</h3>;
}

// Error UI
if (error) {
  return <p style={{ color: "red" }}>{error}</p>;
}`} />

            {/* --- INTERACTIVE MOCK API CLIENT WIDGET --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🌐 Live Mock API Client Playground</h4>
            <p>Select a simulated API response payload type and click "Fetch Data" to trace how React conditionally renders the corresponding state UI.</p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <button className="btn btn-outline" onClick={() => triggerApiCall('success_data')} style={{ borderColor: '#10b981', color: '#10b981' }}>Mock Success (With Data)</button>
                <button className="btn btn-outline" onClick={() => triggerApiCall('error')} style={{ borderColor: '#ef4444', color: '#ef4444' }}>Mock API Error (503)</button>
              </div>

              {/* Dynamic rendering display container based on apiState */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '2rem', minHeight: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                {apiState === 'idle' && (
                  <div style={{ textAlign: 'center', color: '#64748b' }}>
                    <Database size={40} style={{ marginBottom: '8px', color: '#cbd5e1' }} />
                    <strong style={{ display: 'block' }}>Awaiting Trigger</strong>
                    <span style={{ fontSize: '0.85rem' }}>Click one of the mock options above to execute a simulated async fetch request.</span>
                  </div>
                )}

                {apiState === 'loading' && (
                  <div style={{ textAlign: 'center', color: '#d97706' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      border: '3px solid #fef3c7', 
                      borderTop: '3px solid #d97706', 
                      borderRadius: '50%', 
                      margin: '0 auto 12px auto',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <strong style={{ display: 'block' }}>Fetching courses data...</strong>
                    <span style={{ fontSize: '0.85rem' }}>Pending server response (Simulated latency of 1.5 seconds)</span>
                  </div>
                )}

                {apiState === 'error' && (
                  <div style={{ textAlign: 'center', color: '#dc2626' }}>
                    <AlertTriangle size={36} style={{ marginBottom: '8px', color: '#fca5a5' }} />
                    <strong style={{ display: 'block' }}>Fetch Failed!</strong>
                    <span style={{ fontSize: '0.85rem', color: '#ef4444', fontFamily: 'monospace' }}>{errorMessage}</span>
                  </div>
                )}

                {(apiState === 'success_data' || apiState === 'success_empty') && (
                  <div style={{ width: '100%' }}>
                    <h5 style={{ fontWeight: 800, color: '#166534', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={18} color="#10b981" /> 
                      Successfully loaded {fetchedItems.length || 0} records!
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem', color: '#334155' }}>
                      {fetchedItems.map((item, index) => (
                        <li key={index}><code>{item}</code></li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('state_lifting')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Empty State UI <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. EMPTY STATE UI ──────────────────────────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="state_lifting" id="state_lifting" eyebrow="Module 06 • Day 6" title="Empty State UI">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>
              An <strong>empty state</strong> is rendered when a query or resource fetch successfully completes, but returns an empty dataset (an array with length 0). Showing a friendly message explains to users that no data was found, preventing them from assuming a network breakdown occurred.
            </p>

            <CodeBlock title="EmptyStateExample.jsx" code={`function List({ items }) {
  // Checking list length handles empty state arrays safely
  if (items.length === 0) {
    return <p>No data found</p>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}`} />

            {/* --- INTERACTIVE WIDGET: EMPTY STATE SIMULATOR --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>📂 Live Empty State Simulator</h4>
            <p>Toggle the elements inside the items array using the control actions below to watch React shift between rendering mapped items and rendering a friendly empty state alert.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  <button className="btn btn-primary" onClick={() => triggerApiCall('success_data')} style={{ background: '#10b981', borderColor: '#10b981', flex: 1 }}>Populate items</button>
                  <button className="btn btn-outline" onClick={() => triggerApiCall('success_empty')} style={{ borderColor: '#6366f1', color: '#6366f1', flex: 1 }}>Clear items</button>
                </div>
                
                <div style={{ background: '#0f172a', padding: '12px 16px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#e1e4e8' }}>
                  {`if (items.length === 0) {`}
                  <div style={{ paddingLeft: '1rem', color: apiState === 'success_empty' ? '#ef4444' : '#8892b0' }}>return &lt;p&gt;No data found&lt;/p&gt;;</div>
                  {`} return (`}
                  <div style={{ paddingLeft: '1rem', color: apiState === 'success_data' ? '#86efac' : '#8892b0' }}>{`items.map(item => ...)`}</div>
                  {`);`}
                </div>
              </div>

              {/* Display visual */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '150px' }}>
                {apiState === 'success_empty' ? (
                  <div style={{ textAlign: 'center', color: '#ef4444' }}>
                    <FolderOpen size={36} style={{ marginBottom: '6px', color: '#cbd5e1' }} />
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>No data found</strong>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Array items length = 0</span>
                  </div>
                ) : (
                  <div style={{ width: '100%' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Mapped items:</span>
                    {fetchedItems.length === 0 ? (
                      <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.8rem' }}>Default array empty</span>
                    ) : (
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#334155' }}>
                        {fetchedItems.map((item, i) => (
                          <li key={i} style={{ marginBottom: '2px' }}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
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

      {/* ── 7. INTERACTIVE QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Knowledge Check" title="Day 6 Interactive Quiz">
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
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 6 Assignment: Conditional Rendering">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Completion banner with fix for contrast */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem', color: 'white' }}>🎓 Day 6 Syllabus Completed!</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Excellent! You have fully mastered if/else rendering logic, ternary operators, short-circuit ampersand evaluations, conditional components layouts, and fetching state UIs (loading/error/empty state screens). Complete your homework assignments.
              </p>
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>📋 Homework Assignments</h4>
            {[
              { num: 1, title: 'Clean Toggle Card Visibility App', icon: '👁️', desc: 'Create a Card component with a Show More / Show Less button. Use a boolean state and ternary expression to conditionally hide/reveal the descriptive content inside.', hint: 'Use simple useState(false) toggler.' },
              { num: 2, title: 'Logical AND User Badge', icon: '👤', desc: 'Build a ProfileCard component. If the user prop contains isPremium = true, render a gold star badge icon beside their username using logical AND (&&). If false, show no badge.', hint: 'Use prop isPremium && <StarIcon />.' },
              { num: 3, title: 'Asynchronous Course Search Panel', desc: 'Build a list search panel with an input box. As you type, simulate an API fetch. Handle loading (show spinner), error (if key contains "#"), success listing, and empty states (if no items match).', hint: 'Combine array filter length checks with state indicators.', icon: '🌐' }
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
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>Submit Day 6 Exercises</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save your code files inside the local playground repository workspace and sync to complete module validation.</p>
            </div>

          </div>
        </Section>
      )}

      {/* Dynamic Keyframes inject strictly inside component style tag to support Loader Spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </AnimatePresence>
  );
}
