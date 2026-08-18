import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Layers, Database, Sparkles, RefreshCw, Settings, 
  CheckCircle, Code, ArrowRight, Info, Play, Trash2, Cpu, 
  Laptop, Terminal, Copy, FileText, User as UserIcon, Plus, 
  AlertTriangle, Check, BookOpenCheck, HelpCircle, Sliders,
  GitBranch, CheckSquare, Square, Mail, Lock, ShieldAlert
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

export default function ReactDay5({ activeTab, onNavigate }) {
  const handleContinue = (nextTabId) => {
    onNavigate('react_module5', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Widget 1: Interactive Event Handler Console ---
  const [eventLogs, setEventLogs] = useState([]);
  const [nativeDetails, setNativeDetails] = useState(null);

  const simulateClick = (e) => {
    const logItem = {
      timestamp: new Date().toLocaleTimeString(),
      type: e.type,
      tag: e.target.tagName,
      phase: e.eventPhase === 3 ? "Bubbling" : "Target/Capturing",
      bubbles: e.bubbles ? "True" : "False",
      cancelable: e.cancelable ? "True" : "False"
    };
    setEventLogs(prev => [logItem, ...prev].slice(0, 3));
    setNativeDetails({
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      ctrlKey: e.ctrlKey ? "Active" : "Inactive",
      altKey: e.altKey ? "Active" : "Inactive"
    });
  };

  // --- Widget 2: Event cycle flow chart steps (Page 3) ---
  const [eventFlowStep, setEventFlowStep] = useState(1);
  const eventFlowSteps = [
    { step: 1, title: "1. User Action", desc: "The user interacts with the UI (e.g. clicks a button or types in an input)." },
    { step: 2, title: "2. Event Triggered", desc: "The browser fires the corresponding native event (e.g. 'click' or 'keydown')." },
    { step: 3, title: "3. SyntheticEvent Created", desc: "React intercepts the native event and wraps it in a normalized SyntheticEvent object, standardizing API surfaces." },
    { step: 4, title: "4. Cross-Browser Consistency", desc: "Ensures the event details, properties, and methods (like stopPropagation()) behave exactly the same across Chrome, Firefox, Safari, and Edge." }
  ];

  // --- Widget 3: Controlled Input Cycle simulation (Page 5,6) ---
  const [controlledText, setControlledText] = useState("");
  const [controlledCycleStep, setControlledCycleStep] = useState(1);
  const [controlledLogs, setControlledLogs] = useState([]);

  const handleControlledChange = (e) => {
    const val = e.target.value;
    setControlledText(val);
    setControlledCycleStep(5); // setState / update state
    setControlledLogs(prev => [`e.target.value = "${val}" dispatched to state via setControlledText`, ...prev].slice(0, 3));
  };

  // --- Widget 4: Checkbox State Live Demo (Page 7) ---
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // --- Widget 5: Multiple Inputs Refactoring comparison ---
  const [refactorMode, setRefactorMode] = useState('verbose'); // verbose vs dry
  // Verbose States
  const [newCompany, setCompany] = useState("");
  const [newPosition, setPosition] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newNote, setNewNote] = useState("");
  // Dry States
  const initialValues = { company: "", position: "", link: "", date: "", note: "" };
  const [dryValues, setDryValues] = useState(initialValues);

  const handleDryChange = (e) => {
    const { name, value } = e.target;
    setDryValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetDry = () => {
    setDryValues(initialValues);
  };

  const handleResetVerbose = () => {
    setCompany("");
    setPosition("");
    setNewLink("");
    setNewDate("");
    setNewNote("");
  };

  // --- Widget 6: MultipleInputsForm App (Page 11) ---
  const [formDataPage11, setFormDataPage11] = useState({ username: '', email: '', password: '' });
  const [submitLogPage11, setSubmitLogPage11] = useState(null);

  const handlePage11Change = (e) => {
    const { name, value } = e.target;
    setFormDataPage11(prev => ({ ...prev, [name]: value }));
  };

  const handlePage11Submit = (e) => {
    e.preventDefault();
    setSubmitLogPage11(formDataPage11);
    alert(`Welcome, ${formDataPage11.username}!`);
  };

  // --- Widget 7: Form Submission and preventDefault sandbox ---
  const [preventedData, setPreventedData] = useState({ name: '', email: '' });
  const [preventedHistory, setPreventedHistory] = useState([]);
  const [isDefaultPrevented, setIsDefaultPrevented] = useState(true);

  const handlePreventedSubmit = (e) => {
    if (isDefaultPrevented) {
      e.preventDefault();
      setPreventedHistory(prev => [`[Success]: event.preventDefault() called. Form data { name: "${preventedData.name}", email: "${preventedData.email}" } processed. Page did NOT reload!`, ...prev].slice(0, 4));
    } else {
      // Allow browser refresh default behavior
      setPreventedHistory([]);
    }
  };

  // --- Widget 8: Form Validation registration demo (Page 13, 14) ---
  const [validationData, setValidationData] = useState({ name: "", email: "", password: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [validationSuccess, setValidationSuccess] = useState(false);

  const validateFields = () => {
    let errs = {};
    if (!validationData.name.trim()) {
      errs.name = "Name is required";
    }
    if (!validationData.email) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(validationData.email)) {
      errs.email = "Email is not valid";
    }
    if (!validationData.password) {
      errs.password = "Password is required";
    } else if (validationData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleValidationSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (isValid) {
      setValidationSuccess(true);
      alert("Form Submitted Successfully");
      setValidationData({ name: "", email: "", password: "" });
      setValidationErrors({});
    } else {
      setValidationSuccess(false);
    }
  };

  // --- Quiz States ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const quizQuestions = [
    {
      key: 'q1',
      question: 'What is a Synthetic Event in React?',
      options: [
        'A mock event generated for unit testing frameworks.',
        'A cross-browser wrapper around the browser\'s native event, maintaining performance and api consistency.',
        'An event listener defined directly on the window DOM tree.',
        'A slow wrapper that should be bypassed using native onclick.'
      ],
      correct: 1,
      explanation: 'React wraps native browser events in a SyntheticEvent object to normalize behavior and provide a consistent interface across Chrome, Firefox, and other browsers.'
    },
    {
      key: 'q2',
      question: 'What defines a Controlled Component in React?',
      options: [
        'An input element whose value is managed directly by the browser DOM.',
        'An element whose state is controlled via external styles only.',
        'An input form element (input, select, textarea) whose value is entirely managed by React component state.',
        'A component that cannot trigger onClick events.'
      ],
      correct: 2,
      explanation: 'In controlled components, React state acts as the single source of truth for input values. Component state is bound to the input value prop, and updates are handled by state setter dispatches.'
    },
    {
      key: 'q3',
      question: 'How do you handle multiple input fields with a single change handler function?',
      options: [
        'By creating 5 different useState variables.',
        'By reading e.target.value directly into the window context.',
        'By using dynamic property key bracket notation: [e.target.name]: e.target.value inside the state updater.',
        'By calling event.preventDefault() inside inputs.'
      ],
      correct: 2,
      explanation: 'By adding a name attribute to each input that matches its corresponding state object key, we can update state dynamically using bracket notation: [name]: value.'
    },
    {
      key: 'q4',
      question: 'Why do we call event.preventDefault() inside a form onSubmit handler?',
      options: [
        'To clear the state inputs automatically.',
        'To prevent the default browser behavior of submitting the form data via a page reload, allowing React to process state and call APIs asynchronously.',
        'To activate inputs validation stylesheets.',
        'To stop event bubbling up to parent components.'
      ],
      correct: 1,
      explanation: 'By default, submitting a form reloads the page. Calling event.preventDefault() stops this, allowing React components to process data, validate fields, and execute network fetches in the background.'
    }
  ];

  const handleQuizAnswer = (qKey, optIdx) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [qKey]: optIdx }));
  };

  const getQuizScore = () => quizQuestions.filter(q => quizAnswers[q.key] === q.correct).length;

  return (
    <AnimatePresence mode="wait">
      
      {/* ── 1. EVENT HANDLING & SYNTHETIC EVENTS ─────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="intro_react" id="intro_react" eyebrow="Module 01 • Day 5" title="Event Handling & Synthetic Events">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header banner with fix for contrast */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>⚡ React Event System</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white', margin: 0 }}>
                In React, events are handled similarly to how they are handled in regular HTML. However, React event handling is done using JSX syntax and utilizes a custom **Synthetic Event System** for performance optimization and cross-browser API normalization.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>Understanding JSX Event Handlers</h3>
            <p>
              React provides event handlers named in camelCase (e.g. <code>onClick</code> instead of <code>onclick</code>). Handler callback routines are passed directly as JavaScript functions inside curly braces:
            </p>
            <CodeBlock title="ClickCounter.jsx" code={`import React from 'react';

function ClickCounter() {
  const handleClick = (event) => {
    console.log('Button clicked!', event.target.tagName);
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
export default ClickCounter;`} />

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Info size={16} /> Key Terms Explained</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0 }}>
                  <li><strong>onClick:</strong> Synthetic event handler provided by React, normalizing mouse interaction.</li>
                  <li><strong>handleClick:</strong> The callback event handler function that accepts the event object.</li>
                  <li><strong>event:</strong> A wrapper instance of <code>SyntheticEvent</code> which ensures cross-browser compliance.</li>
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><Sparkles size={16} /> Why Synthetic Events?</h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#14532d', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0 }}>
                  <li><strong>Cross-browser consistency:</strong> Normalized behavior across Chrome, Firefox, Safari.</li>
                  <li><strong>Performance optimization:</strong> Implements event delegation behind the scenes.</li>
                  <li><strong>Follows standard API:</strong> Exposes familiar methods like <code>preventDefault()</code>.</li>
                </ul>
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET: EVENT CONSOLE --- */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>⚡ Live Interactive Event Console</h3>
            <p>Click the button below to trigger a React Synthetic Event and inspect the wrapped properties in comparison to native attributes.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div>
                <button 
                  className="btn btn-primary" 
                  onClick={simulateClick}
                  style={{ width: '100%', height: '80px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderColor: '#4f46e5' }}
                >
                  Trigger onClick Event
                </button>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', marginTop: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.5rem 0', color: '#475569', fontWeight: 'bold', fontSize: '0.8rem' }}>Event Trigger Log history:</h5>
                  {eventLogs.length === 0 ? (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>Awaiting click triggers...</span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {eventLogs.map((log, i) => (
                        <div key={i} style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '4px', color: '#6366f1' }}>
                          [{log.timestamp}] Type: "{log.type}" | Target tag: &lt;{log.tag}&gt; | Bubble Phase: {log.phase}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Event Attributes Details Panel */}
              <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '1.25rem', borderRadius: 12, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: '8px' }}>// SyntheticEvent Properties:</span>
                {nativeDetails ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>clientX: <span style={{ color: '#fca5a5' }}>{nativeDetails.clientX}px</span></div>
                    <div>clientY: <span style={{ color: '#fca5a5' }}>{nativeDetails.clientY}px</span></div>
                    <div>screenX: <span style={{ color: '#fca5a5' }}>{nativeDetails.screenX}px</span></div>
                    <div>screenY: <span style={{ color: '#fca5a5' }}>{nativeDetails.screenY}px</span></div>
                    <div>ctrlKey state: <span style={{ color: '#86efac' }}>{nativeDetails.ctrlKey}</span></div>
                    <div>altKey state: <span style={{ color: '#86efac' }}>{nativeDetails.altKey}</span></div>
                  </div>
                ) : (
                  <span style={{ color: '#8892b0', fontStyle: 'italic' }}>Click the trigger button to inspect attributes</span>
                )}
              </div>
            </div>

            {/* --- INTERACTIVE EVENT CYCLE STEPS --- */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '3rem', marginBottom: '1rem' }}>🔄 Interactive Event Firing Cycle</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '2rem' }}>
              <div>
                <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ background: '#4f46e5', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{eventFlowStep}</span>
                  {eventFlowSteps[eventFlowStep - 1].title}
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#475569', minHeight: '80px', lineHeight: 1.6 }}>
                  {eventFlowSteps[eventFlowStep - 1].desc}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <button className="btn btn-outline" onClick={() => setEventFlowStep(p => Math.max(1, p - 1))} disabled={eventFlowStep === 1}>Previous</button>
                  <button className="btn btn-primary" onClick={() => setEventFlowStep(p => Math.min(4, p + 1))} disabled={eventFlowStep === 4} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>Next Step</button>
                </div>
              </div>

              {/* Graphical Event Node Visualizer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {eventFlowSteps.map(item => {
                  const isActive = item.step === eventFlowStep;
                  return (
                    <div 
                      key={item.step}
                      onClick={() => setEventFlowStep(item.step)}
                      style={{ 
                        padding: '10px 14px', 
                        background: isActive ? '#e0f2fe' : 'white', 
                        border: isActive ? '1px solid #0ea5e9' : '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: '0.82rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#0369a1' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{item.title}</span>
                      {isActive && <span style={{ color: '#0ea5e9', fontSize: '0.8rem' }}>Active</span>}
                    </div>
                  );
                })}
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

      {/* ── 2. SYNTHETIC EVENTS ──────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="useState_hook" id="useState_hook" eyebrow="Module 02 • Day 5" title="Synthetic Events Properties">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>What is a Synthetic Event?</h3>
            <p>
              React wraps native browser events in a custom <code>SyntheticEvent</code> object. The synthetic wrapper implements standard W3C event specifications, so you do not need to worry about browser incompatibilities.
            </p>

            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Works same across all browsers:</strong> Safe representation of event arguments on Safari, Chrome, Firefox, etc.</li>
              <li><strong>Improves performance:</strong> Implements event pool delegation, binding handlers at the document root level rather than on discrete child elements.</li>
              <li><strong>Follows same API:</strong> Exposes properties like <code>event.type</code>, <code>event.target</code>, <code>event.preventDefault()</code>, and <code>event.stopPropagation()</code>.</li>
            </ul>

            <CodeBlock title="SyntheticExample.jsx" code={`function App() {
  const handleClick = (event) => {
    console.log(event); // React Synthetic Event wrapper
    console.log(event.type); // "click"
  };
  return (
    <button onClick={handleClick}>Click</button>
  );
}`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('multiple_states')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. CONTROLLED COMPONENTS ─────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="multiple_states" id="multiple_states" eyebrow="Module 03 • Day 5" title="Controlled Components">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              In React, a <strong>controlled component</strong> is an input form element (like <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, or <code>&lt;select&gt;</code>) whose value is entirely managed by React's state. The component acts as the "single source of truth" for the form data.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.25rem', borderRadius: 12, margin: '1.5rem 0' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>Component Binding Step Flow:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.9rem', color: '#475569' }}>
                <div>
                  <strong>Step 1: Component State Setup</strong>
                  <div style={{ background: '#0f172a', padding: '8px', borderRadius: 6, margin: '6px 0', fontFamily: 'monospace', color: '#f8fafc', fontSize: '0.8rem' }}>
                    const [name, setName] = useState("");
                  </div>
                  React stores the input value in state. Initially, state is empty.
                </div>
                <div>
                  <strong>Step 2: Value Property Binding</strong>
                  <div style={{ background: '#0f172a', padding: '8px', borderRadius: 6, margin: '6px 0', fontFamily: 'monospace', color: '#f8fafc', fontSize: '0.8rem' }}>
                    &lt;input value={"{name}"} /&gt;
                  </div>
                  Input displays the state value. Re-renders automatically when state changes.
                </div>
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET: CONTROLLED INPUT CYCLE --- */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🎮 Live Controlled Input Step Tracer</h3>
            <p>Type in the input box below. As you type, the visual block logs state cycles and demonstrates how values move from state back into the viewport DOM.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '6px' }}>Controlled Input Box:</label>
                <input 
                  type="text" 
                  value={controlledText}
                  onChange={handleControlledChange}
                  placeholder="Type characters here..."
                  style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                />

                <div style={{ background: 'white', padding: '1rem', borderRadius: 12, border: '1px dashed #cbd5e1', marginTop: '1.2rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>React State Variable value:</span>
                  <strong style={{ fontSize: '1.4rem', color: '#6366f1' }}>"{controlledText}"</strong>
                </div>
              </div>

              {/* Cycle Log Viewer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h5 style={{ margin: '0 0 4px 0', fontSize: '0.82rem', color: '#475569', fontWeight: 'bold' }}>Reconciliation Cycle Steps:</h5>
                
                {[
                  { id: 1, text: "State initialized in React engine" },
                  { id: 2, text: "Input reads value property from state" },
                  { id: 3, text: "User inputs character (Change event triggered)" },
                  { id: 4, text: "React invokes handleChange callback" },
                  { id: 5, text: "setState updates state in memory" },
                  { id: 6, text: "Component re-renders, updating DOM value" }
                ].map(step => {
                  const isActive = step.id === controlledCycleStep || (controlledCycleStep === 5 && step.id >= 4);
                  return (
                    <div 
                      key={step.id}
                      style={{ 
                        padding: '6px 10px', 
                        background: isActive ? '#e0f2fe' : 'white', 
                        border: isActive ? '1px solid #0ea5e9' : '1px solid #cbd5e1',
                        borderRadius: 6,
                        fontSize: '0.78rem',
                        color: isActive ? '#0369a1' : '#94a3b8'
                      }}
                    >
                      {step.id}. {step.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- CHECKBOX STATE EXAMPLE (Page 7) --- */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginTop: '3rem', marginBottom: '0.8rem' }}>Controlled Checkbox Component</h3>
            <p>For boolean toggle options, React uses the <code>checked</code> attribute bound to state, and updates the value using <code>e.target.checked</code>:</p>

            <CodeBlock title="Checkbox.jsx" code={`import React, { useState } from 'react';

function CheckboxApp() {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <p>Checkbox is {isChecked ? "Checked" : "Unchecked"}</p>
    </div>
  );
}`} />

            {/* Live Checkbox Render */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>☑️ Live Checkbox Component Render</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: 16, border: '1px solid #cbd5e1' }}>
              <div 
                onClick={() => setIsCheckboxChecked(prev => !prev)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {isCheckboxChecked ? (
                  <CheckSquare size={32} color="#6366f1" />
                ) : (
                  <Square size={32} color="#cbd5e1" />
                )}
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>Toggle Checkbox State</span>
              </div>

              <div style={{ background: 'white', padding: '10px 20px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.9rem', color: '#334155' }}>
                  Checkbox state is: <strong style={{ color: isCheckboxChecked ? '#10b981' : '#ef4444' }}>{isCheckboxChecked ? "Checked" : "Unchecked"}</strong>
                </span>
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

      {/* ── 4. HANDLING MULTIPLE INPUTS ───────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="object_state" id="object_state" eyebrow="Module 04 • Day 5" title="Handling Multiple Inputs">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>The Problem: Verbose Inputs Handling</h3>
            <p>
              Imagine a form component with 5 input fields. If you define a separate state variable and change handler callback for each input field, the code becomes long, repetitive, and hard to maintain (non-DRY):
            </p>

            <CodeBlock title="VerboseForm.jsx" code={`export default function Form() {
  const [newCompany, setCompany] = useState("");
  const [newPosition, setPosition] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newNote, setNewNote] = useState("");

  const reset = () => {
    setCompany(""); setPosition(""); setNewLink(""); setNewDate(""); setNewNote("");
  };

  return (
    <form>
      <input value={newCompany} onChange={(e) => setCompany(e.target.value)} />
      <input value={newPosition} onChange={(e) => setPosition(e.target.value)} />
      {/* ... */}
    </form>
  );
}`} />

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginTop: '2.5rem', marginBottom: '0.8rem' }}>The Solution: Object State & Dynamic Keys</h3>
            <p>
              Rather than maintaining multiple isolated state hooks, bundle all variables into a single object state. We can then handle updates for all inputs using a **single event handler** function.
            </p>
            <p>
              This is accomplished by using the input field's <strong><code>name</code></strong> attribute (which matches the key in the state object) and updating using ES6 dynamic bracket notation <code>[name]: value</code>:
            </p>

            <CodeBlock title="RefactoredForm.jsx" code={`const initialValues = {
  company: "",
  position: "",
  link: "",
  date: "",
  note: "",
};

export default function Form() {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    // Destructure name and value from event target
    const { name, value } = e.target;
    setValues({
      ...values,      // Keep existing properties
      [name]: value   // Dynamically overwrite key using name attribute
    });
  };

  return (
    <form>
      <input name="company" value={values.company} onChange={handleInputChange} />
      <input name="position" value={values.position} onChange={handleInputChange} />
      {/* ... */}
    </form>
  );
}`} />

            {/* --- INTERACTIVE WIDGET: DRY PLAYGROUND --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🧩 Live Side-by-Side: Verbose Code vs DRY Object Code</h4>
            <p>Toggle between Verbose Form (multiple hook states) and DRY Form (single state object) below. Inspect the difference in code structure and complexity.</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button 
                className={`btn ${refactorMode === 'verbose' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setRefactorMode('verbose')}
                style={refactorMode === 'verbose' ? { background: '#ef4444', borderColor: '#ef4444' } : {}}
              >
                Verbose Starter Form
              </button>
              <button 
                className={`btn ${refactorMode === 'dry' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setRefactorMode('dry')}
                style={refactorMode === 'dry' ? { background: '#10b981', borderColor: '#10b981' } : {}}
              >
                DRY Refactored Form
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              {refactorMode === 'verbose' ? (
                <div>
                  <h5 style={{ margin: '0 0 1rem 0', fontWeight: 800, color: '#b91c1c' }}>Form with 5 Independent States</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input type="text" placeholder="Company" value={newCompany} onChange={(e) => setCompany(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="text" placeholder="Job Title" value={newPosition} onChange={(e) => setPosition(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="text" placeholder="Job Link" value={newLink} onChange={(e) => setNewLink(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="text" placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <button className="btn btn-outline" onClick={handleResetVerbose} style={{ marginTop: '1rem', width: '100%', borderColor: '#ef4444', color: '#ef4444' }}>Reset Form</button>
                </div>
              ) : (
                <div>
                  <h5 style={{ margin: '0 0 1rem 0', fontWeight: 800, color: '#15803d' }}>Form with Single State Object</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input type="text" name="company" placeholder="Company" value={dryValues.company} onChange={handleDryChange} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="text" name="position" placeholder="Job Title" value={dryValues.position} onChange={handleDryChange} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="text" name="link" placeholder="Job Link" value={dryValues.link} onChange={handleDryChange} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="date" name="date" value={dryValues.date} onChange={handleDryChange} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <input type="text" name="note" placeholder="Note" value={dryValues.note} onChange={handleDryChange} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <button className="btn btn-outline" onClick={handleResetDry} style={{ marginTop: '1rem', width: '100%', borderColor: '#10b981', color: '#10b981' }}>Reset Form</button>
                </div>
              )}

              {/* State visual inspector */}
              <div style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: 12, fontFamily: 'monospace', fontSize: '0.78rem' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: '8px' }}>// State inspector:</span>
                {refactorMode === 'verbose' ? (
                  <div>
                    <div>const [newCompany] = "{newCompany}";</div>
                    <div>const [newPosition] = "{newPosition}";</div>
                    <div>const [newLink] = "{newLink}";</div>
                    <div>const [newDate] = "{newDate}";</div>
                    <div>const [newNote] = "{newNote}";</div>
                    <span style={{ color: '#ef4444', display: 'block', marginTop: '1rem' }}>*Requires 5 state handlers in memory</span>
                  </div>
                ) : (
                  <div>
                    <div>const [values] = {`{`}</div>
                    <div style={{ paddingLeft: '1rem' }}>
                      company: "{dryValues.company}",
                      <br />
                      position: "{dryValues.position}",
                      <br />
                      link: "{dryValues.link}",
                      <br />
                      date: "{dryValues.date}",
                      <br />
                      note: "{dryValues.note}"
                    </div>
                    <div>{`}`}</div>
                    <span style={{ color: '#10b981', display: 'block', marginTop: '1rem' }}>*Requires only 1 state object handler!</span>
                  </div>
                )}
              </div>
            </div>

            {/* --- MULTIPLE INPUTS FORM COMPLETE CODE (Page 11) --- */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginTop: '3rem', marginBottom: '0.8rem' }}>Complete Form Code Example</h3>
            <CodeBlock title="MultipleInputsForm.jsx" code={`import React, { useState } from 'react';

const initialValues = { username: '', email: '', password: '' };

function MultipleInputsForm() {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert(\`Welcome, \${formData.username}!\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>👤 Live login Form App Renders</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <form onSubmit={handlePage11Submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label htmlFor="username_demo" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Username:</label>
                  <input type="text" id="username_demo" name="username" value={formDataPage11.username} onChange={handlePage11Change} style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label htmlFor="email_demo" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Email:</label>
                  <input type="email" id="email_demo" name="email" value={formDataPage11.email} onChange={handlePage11Change} style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label htmlFor="password_demo" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Password:</label>
                  <input type="password" id="password_demo" name="password" value={formDataPage11.password} onChange={handlePage11Change} style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ background: '#6366f1', borderColor: '#6366f1', marginTop: '0.5rem' }}>Submit</button>
              </form>

              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem', fontSize: '0.82rem', color: '#475569' }}>
                <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Submitted Payload Console:</span>
                {submitLogPage11 ? (
                  <div style={{ fontFamily: 'monospace' }}>
                    <div>username: "{submitLogPage11.username}"</div>
                    <div>email: "{submitLogPage11.email}"</div>
                    <div>password: "•••••"</div>
                  </div>
                ) : (
                  <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Fill the form and submit to see payload log</span>
                )}
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

      {/* ── 5. FORM SUBMISSION & RESET ──────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="nested_state" id="nested_state" eyebrow="Module 05 • Day 5" title="Form Submission & Reset">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              In React, form submission is handled by an <code>onSubmit</code> event handler on the form wrapper, while resetting a form is accomplished by clearing the state in controlled components.
            </p>
            <p>
              <strong>Form Submission:</strong> The standard way to handle submission is to add an <code>onSubmit</code> event listener to the <code>&lt;form&gt;</code> element. The handler function calls <strong><code>event.preventDefault()</code></strong> to stop the browser's default behavior of reloading the page and processes the form data.
            </p>

            <CodeBlock title="MyForm.jsx" code={`import React, { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop default browser refresh behavior
    console.log('Form data submitted:', formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({ name: '', email: '' }); // Clear state
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
      <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button> 
      {/* Note: Use type="button" on reset to prevent form submission trigger */}
    </form>
  );
}`} />

            {/* --- INTERACTIVE WIDGET: PREVENT DEFAULT SANDBOX --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>🚫 PreventDefault Sandbox</h4>
            <p>Toggle <code>event.preventDefault()</code> check below. If unchecked, clicking submit will refresh the page, clearing all state history. If checked, click submit to see state logs update seamlessly without loading spinner disruptions.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <form onSubmit={handlePreventedSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '10px', borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: '8px' }}>
                  <input 
                    type="checkbox" 
                    id="prevent_check" 
                    checked={isDefaultPrevented} 
                    onChange={(e) => setIsDefaultPrevented(e.target.checked)} 
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="prevent_check" style={{ fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}>Enable event.preventDefault() (Recommended)</label>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Name:</label>
                  <input type="text" name="name" value={preventedData.name} onChange={(e) => setPreventedData({ ...preventedData, name: e.target.value })} style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Email:</label>
                  <input type="email" name="email" value={preventedData.email} onChange={(e) => setPreventedData({ ...preventedData, email: e.target.value })} style={{ width: '100%', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#6366f1', borderColor: '#6366f1' }}>Submit Form</button>
                  <button type="button" className="btn btn-outline" onClick={() => setPreventedData({ name: '', email: '' })} style={{ flex: 1 }}>Reset State</button>
                </div>
              </form>

              {/* Prevent default logs */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', fontSize: '0.78rem', color: '#475569', minHeight: '200px' }}>
                <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Execution History:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace' }}>
                  {preventedHistory.length === 0 ? (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No submissions triggered yet</span>
                  ) : (
                    preventedHistory.map((log, index) => (
                      <div key={index} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', color: '#1e3a8a' }}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('state_lifting')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. FORM VALIDATION ───────────────────────────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="state_lifting" id="state_lifting" eyebrow="Module 06 • Day 5" title="Form Validation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>
              Form validation is a key requirement in production-grade web applications. By utilizing controlled components, we can easily validate inputs programmatically inside state update handlers or form submit actions before pushing payloads to database APIs.
            </p>

            <CodeBlock title="RegistrationForm.jsx" code={`import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form Submitted Successfully");
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      {/* ... Rest of input fields ... */}
    </form>
  );
}`} />

            {/* --- INTERACTIVE WIDGET: FORM VALIDATOR PLAYGROUND --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>📝 Live Registration Validator Playground</h4>
            <p>Fill out the registration details below. Validation errors will appear beneath the inputs in real-time, matching the output shown on page 14 of the PDF.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: 20 }}>
              <form onSubmit={handleValidationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px', color: '#334155' }}>Name:</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter Name"
                    value={validationData.name} 
                    onChange={(e) => setValidationData({ ...validationData, name: e.target.value })} 
                    style={{ width: '100%', padding: '10px', border: validationErrors.name ? '1.5px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }} 
                  />
                  {validationErrors.name && (
                    <span style={{ fontSize: '0.78rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <ShieldAlert size={12} /> {validationErrors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px', color: '#334155' }}>Email:</label>
                  <input 
                    type="text" 
                    name="email" 
                    placeholder="Enter Email"
                    value={validationData.email} 
                    onChange={(e) => setValidationData({ ...validationData, email: e.target.value })} 
                    style={{ width: '100%', padding: '10px', border: validationErrors.email ? '1.5px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }} 
                  />
                  {validationErrors.email && (
                    <span style={{ fontSize: '0.78rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <ShieldAlert size={12} /> {validationErrors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px', color: '#334155' }}>Password:</label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Enter Password"
                    value={validationData.password} 
                    onChange={(e) => setValidationData({ ...validationData, password: e.target.value })} 
                    style={{ width: '100%', padding: '10px', border: validationErrors.password ? '1.5px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }} 
                  />
                  {validationErrors.password && (
                    <span style={{ fontSize: '0.78rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <ShieldAlert size={12} /> {validationErrors.password}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ background: '#6366f1', borderColor: '#6366f1', marginTop: '0.5rem' }}>Submit Registration</button>
              </form>

              {/* Status card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '180px' }}>
                  {validationSuccess ? (
                    <>
                      <CheckCircle size={40} color="#10b981" style={{ marginBottom: '8px' }} />
                      <strong style={{ fontSize: '1rem', color: '#15803d', display: 'block' }}>Validation Success!</strong>
                      <span style={{ fontSize: '0.8rem', color: '#475569' }}>Form validated successfully and payload is clear for transmission.</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle size={40} color="#cbd5e1" style={{ marginBottom: '8px' }} />
                      <strong style={{ fontSize: '1rem', color: '#475569', display: 'block' }}>Awaiting Validation</strong>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Form fields will check validations upon clicking submit.</span>
                    </>
                  )}
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

      {/* ── 7. INTERACTIVE QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Knowledge Check" title="Day 5 Interactive Quiz">
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

      {/* ── 8. ASSIGNMENT ───────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 5 Assignment: Events & Forms">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Completion banner with fix for contrast */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem', color: 'white' }}>🎓 Day 5 Syllabus Completed!</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Awesome job! You have fully mastered React event handlers, synthetic event parameters, controlled checkboxes/inputs, object-based form states, reset callbacks, and form submission validators. Complete your assignments.
              </p>
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>📋 Homework Assignments</h4>
            {[
              { num: 1, title: 'Multi-Step Contact Form', icon: '📝', desc: 'Build a multi-step contact form that captures Name, Address, and Message. Use a single state object. Validate fields on each step (e.g. step 1: Name required; step 2: Address required). Block moving forward unless validation passes.', hint: 'Use a step state variable to render panels conditionally.' },
              { num: 2, title: 'Password Strength & Matches Checker', icon: '🔒', desc: 'Create a registration widget with Password and Confirm Password inputs. Validate that the password is at least 8 characters, contains a number, and matches the Confirm Password input before unlocking submit.', hint: 'Check matching constraints inside the onSubmit validation callback.' },
              { num: 3, title: 'Interactive Event Logger panel', desc: 'Create a dashboard component with different button hooks: mouseHover, focusInput, dragItem. Log triggers into a scrolling event list, printing synthetic properties.', hint: 'Use onMouseEnter, onFocus, and onDragStart listener attributes.', icon: '⚡' }
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
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>Submit Day 5 Exercises</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save your code files inside the playground local repository and sync to complete module validation.</p>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
