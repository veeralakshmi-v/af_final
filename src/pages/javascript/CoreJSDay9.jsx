import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, AlertTriangle, Activity } from 'lucide-react';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code, style = {} }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', overflowX: 'auto', ...style }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|parseInt|parseFloat|isNaN|alert)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (htmlTag) color = '#7ee787';
          else if (kw) { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
          tokens.push(<span key={k++} style={{ color, fontWeight }}>{tok}</span>);
        }
        return (
          <div key={lineIdx} style={{ whiteSpace: 'pre' }}>
            {tokens.length > 0 ? tokens : line}
          </div>
        );
      })}
    </div>
  );
};

const quizQuestions = [
  { id: 'q1', q: 'Which parameter inside element.addEventListener(event, function, useCapture) controls capturing phase?', options: ['The first parameter', 'The second parameter', 'The third optional boolean parameter (useCapture)', 'None of the above'], ans: 2 },
  { id: 'q2', q: 'How do you stop an event from continuing to bubble up the DOM tree?', options: ['event.preventDefault()', 'event.stopPropagation()', 'return false;', 'event.stopBubbling()'], ans: 1 },
  { id: 'q3', q: 'Which BOM object represents the browser window size and contains top-level alerts?', options: ['screen', 'location', 'window', 'navigator'], ans: 2 },
  { id: 'q4', q: 'How do you redirect the user to a new website URL programmatically using BOM?', options: ['window.redirect("url")', 'location.href = "url"', 'history.pushState("url")', 'navigator.link("url")'], ans: 1 },
  { id: 'q5', q: 'What timing method executes a callback repeatedly at specified intervals?', options: ['setTimeout()', 'setInterval()', 'requestAnimationFrame()', 'delay()'], ans: 1 }
];

export default function CoreJSDay9({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Propagation Interactive States
  const [propagationLogs, setPropagationLogs] = useState([]);
  const [useCapturing, setUseCapturing] = useState(false);
  const [activeStep, setActiveStep] = useState('');

  // Event Types Tester interactive states
  const [activeEvtTypeTab, setActiveEvtTypeTab] = useState('mouse');
  const [evtLogs, setEvtLogs] = useState([]);
  const [keyInputVal, setKeyInputVal] = useState('');
  const [lastKeyEvent, setLastKeyEvent] = useState(null);
  const [formInputVal, setFormInputVal] = useState('');
  const [formStatus, setFormStatus] = useState('Idle (Focus or Edit field)');

  // BOM Monitor Mini Program States
  const [eventTrackerLogs, setEventTrackerLogs] = useState(["Tracker initiated. Try clicking, resizing, or hovering!"]);
  const [windowDimensions, setWindowDimensions] = useState({ w: window.innerWidth, h: window.innerHeight });

  // Playground state
  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`// Day 9: addEventListener & BOM demo
console.log("Window size: " + window.innerWidth + "x" + window.innerHeight);
console.log("Browser Language: " + navigator.language);

// Alert demo
window.alert("Welcome to Day 9 Live Sandbox!");`);
  const [consoleOutput, setConsoleOutput] = useState('Click "Run Code" to view output here...');

  const editorRef = useRef(null);
  const highlighterRef = useRef(null);

  const handleEditorScroll = () => {
    if (editorRef.current && highlighterRef.current) {
      highlighterRef.current.scrollTop = editorRef.current.scrollTop;
      highlighterRef.current.scrollLeft = editorRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const handleMsg = (event) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' || prev.startsWith('⚠️') ? '' : prev + '\n';
          return base + event.data.log;
        });
      } else if (event.data && event.data.type === 'CONSOLE_ERROR') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' ? '' : prev + '\n';
          return base + `⚠️ Error: ${event.data.error}`;
        });
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  const handleContinue = (nextTabId) => {
    onNavigate('core_js_day9', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Propagation Handlers
  const handleParentClick = (phase) => {
    if (phase === 'capturing') {
      setPropagationLogs(prev => [...prev, "Parent Div Clicked (Capturing Phase)"]);
    } else if (phase === 'bubbling') {
      setPropagationLogs(prev => [...prev, "Parent Div Clicked (Bubbling Phase)"]);
    }
  };

  const handleChildClick = () => {
    setPropagationLogs(prev => [...prev, "Child Button Clicked (Target Phase)"]);
    
    // Animate the flow diagram steps
    setActiveStep('');
    if (useCapturing) {
      setTimeout(() => setActiveStep('window-cap'), 50);
      setTimeout(() => setActiveStep('doc-cap'), 350);
      setTimeout(() => setActiveStep('parent-cap'), 650);
      setTimeout(() => setActiveStep('target'), 950);
      setTimeout(() => setActiveStep(''), 1500);
    } else {
      setTimeout(() => setActiveStep('target'), 50);
      setTimeout(() => setActiveStep('parent-bub'), 350);
      setTimeout(() => setActiveStep('doc-bub'), 650);
      setTimeout(() => setActiveStep('window-bub'), 950);
      setTimeout(() => setActiveStep(''), 1500);
    }
  };

  // BOM Monitor Handlers
  const handleResizeSimulation = () => {
    const randomW = Math.floor(Math.random() * 500) + 300;
    const randomH = Math.floor(Math.random() * 500) + 300;
    setWindowDimensions({ w: randomW, h: randomH });
    setEventTrackerLogs(prev => [`[Resize] Simulator window resized to ${randomW}x${randomH}`, ...prev]);
  };

  const executePlaygroundCode = () => {
    setConsoleOutput('');
    setRunTrigger(prev => prev + 1);
    if (editorCode.includes('<html') || editorCode.includes('<div') || editorCode.includes('<style>') || editorCode.includes('window.')) {
      setPlaygroundMode('preview');
    } else {
      setPlaygroundMode('console');
    }
  };

  const loadPresetSnippet = (name) => {
    if (name === 'handler') {
      setEditorCode(`// HTML Attribute Handler Example
// Equivalent to: <button onclick="alert('Clicked!')">Click</button>
console.log("Listening to clicks...");`);

    } else if (name === 'listener') {
      setEditorCode(`// Adding Multiple Event Listeners to same element
var btn = document.createElement("button");
btn.textContent = "Multi Event Button";
document.body.appendChild(btn);

btn.addEventListener("click", function() {
  console.log("Action 1: Click registered.");
});
btn.addEventListener("mouseenter", function() {
  console.log("Action 2: Mouse hover registered.");
});`);
    } else if (name === 'bom') {
      setEditorCode(`// Window size, location, history
console.log("URL Location: " + window.location.href);
console.log("Navigator platform: " + window.navigator.platform);
console.log("Screen resolution: " + screen.width + "x" + screen.height);`);
    } else if (name === 'timers') {
      setEditorCode(`// setTimeout & setInterval
console.log("Starting 1.5s timeout...");
window.setTimeout(function() {
  console.log("Timeout fired after 1.5 seconds!");
}, 1500);`);
    }
  };

  const handleSelectAnswer = (qId, idx) => setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0;
    quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c += 1; });
    setScore(c);
  };

  return (
    <AnimatePresence mode="wait">

      {/* ── TAB 1: EVENT HANDLERS ────────── */}
      {activeTab === 'handlers' && (
        <Section key="handlers" eyebrow="Day 9 • Events" title="Introduction to Event Handlers">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              An <strong>Event Handler</strong> is JavaScript code associated with a particular tag element and event. It triggers whenever the user interacts with the page (e.g. click, keydown, hover).
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Interactive Event Types &amp; Examples</h3>
            <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              Events fall into standard categories based on the user's action. Below are the key event categories along with practical JavaScript code examples:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { 
                  type: 'Mouse Events', 
                  list: 'click, dblclick, mousemove, mouseover, mouseout', 
                  code: `// Mouse Event Example\nelement.addEventListener("click", (e) => {\n  console.log("Clicked at X:" + e.clientX + " Y:" + e.clientY);\n});\nelement.addEventListener("dblclick", () => console.log("Double clicked!"));`,
                  bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af' 
                },
                { 
                  type: 'Keyboard Events', 
                  list: 'keydown, keypress, keyup', 
                  code: `// Keyboard Event Example\ninput.addEventListener("keydown", (e) => {\n  console.log("Pressed key:", e.key, "Code:", e.code);\n});`,
                  bg: '#ecfdf5', border: '#a7f3d0', color: '#065f46' 
                },
                { 
                  type: 'Form Events', 
                  list: 'submit, change, focus, blur, input', 
                  code: `// Form Event Example\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // Prevents page reload\n  console.log("Submitted!");\n});`,
                  bg: '#fffbeb', border: '#fde68a', color: '#854d0e' 
                },
                { 
                  type: 'Window Events', 
                  list: 'load, resize, scroll', 
                  code: `// Window Event Example\nwindow.addEventListener("resize", () => {\n  console.log("Width: " + window.innerWidth);\n});`,
                  bg: '#fdf2f8', border: '#fbcfe8', color: '#9d174d' 
                },
              ].map(evt => (
                <div key={evt.type} style={{ background: evt.bg, border: `1px solid ${evt.border}`, borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: evt.color, marginBottom: '0.25rem', fontSize: '1rem' }}>{evt.type}</div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', fontFamily: 'monospace', marginBottom: '0.75rem' }}>{evt.list}</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                    <SyntaxHighlighter code={evt.code} />
                  </div>
                </div>
              ))}
            </div>

            {/* Live Interactive Event Types Sandbox */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>⚡ Interactive Live Event Tester</h4>
                <div style={{ display: 'flex', gap: '0.3rem', background: '#e2e8f0', padding: '3px', borderRadius: '6px' }}>
                  {[
                    { id: 'mouse', label: 'Mouse' },
                    { id: 'keyboard', label: 'Keyboard' },
                    { id: 'form', label: 'Form' },
                    { id: 'window', label: 'Window' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveEvtTypeTab(tab.id)}
                      style={{
                        padding: '0.25rem 0.75rem', borderRadius: '4px', border: 'none', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                        background: activeEvtTypeTab === tab.id ? '#ca8a04' : 'transparent',
                        color: activeEvtTypeTab === tab.id ? '#fff' : '#475569', transition: 'all 0.2s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', alignItems: 'start' }}>
                {/* Active Interactive Widget */}
                <div>
                  {activeEvtTypeTab === 'mouse' && (
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Mouse Events Box</h5>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.8rem' }}>Single click, double click, hover, or right click below!</p>
                      <div
                        onClick={(e) => setEvtLogs(prev => [`[click] at (${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY})`, ...prev.slice(0, 5)])}
                        onDoubleClick={() => setEvtLogs(prev => [`[dblclick] Double Clicked!`, ...prev.slice(0, 5)])}
                        onMouseEnter={() => setEvtLogs(prev => [`[mouseenter] Mouse entered box`, ...prev.slice(0, 5)])}
                        onMouseLeave={() => setEvtLogs(prev => [`[mouseleave] Mouse left box`, ...prev.slice(0, 5)])}
                        onContextMenu={(e) => { e.preventDefault(); setEvtLogs(prev => [`[contextmenu] Right clicked!`, ...prev.slice(0, 5)]); }}
                        style={{
                          background: '#fff', border: '2px dashed #3b82f6', borderRadius: '8px', padding: '1.5rem', cursor: 'pointer',
                          fontWeight: 'bold', color: '#1d4ed8', userSelect: 'none'
                        }}
                      >
                        🖱️ Click, Hover, or Right-Click Me
                      </div>
                    </div>
                  )}

                  {activeEvtTypeTab === 'keyboard' && (
                    <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '1rem' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: '#065f46' }}>Keyboard Events Input</h5>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.8rem' }}>Type keys inside the field below:</p>
                      <input
                        type="text"
                        value={keyInputVal}
                        onChange={(e) => setKeyInputVal(e.target.value)}
                        onKeyDown={(e) => {
                          setLastKeyEvent({ key: e.key, code: e.code });
                          setEvtLogs(prev => [`[keydown] Key: "${e.key}" (Code: ${e.code})`, ...prev.slice(0, 5)]);
                        }}
                        onKeyUp={(e) => {
                          setEvtLogs(prev => [`[keyup] Released: "${e.key}"`, ...prev.slice(0, 5)]);
                        }}
                        placeholder="Type something here..."
                        style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #a7f3d0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                      {lastKeyEvent && (
                        <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: '#047857', background: '#fff', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid #a7f3d0' }}>
                          Last Pressed: <strong>Key = "{lastKeyEvent.key}"</strong> | <strong>Code = "{lastKeyEvent.code}"</strong>
                        </div>
                      )}
                    </div>
                  )}

                  {activeEvtTypeTab === 'form' && (
                    <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: '#854d0e' }}>Form Events Playground</h5>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        setEvtLogs(prev => [`[submit] Form submitted! e.preventDefault() stopped reload.`, ...prev.slice(0, 5)]);
                      }} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <input
                          type="text"
                          value={formInputVal}
                          onChange={(e) => {
                            setFormInputVal(e.target.value);
                            setEvtLogs(prev => [`[change/input] Value: "${e.target.value}"`, ...prev.slice(0, 5)]);
                          }}
                          onFocus={() => {
                            setFormStatus('Focused 🎯');
                            setEvtLogs(prev => [`[focus] Input gained focus`, ...prev.slice(0, 5)]);
                          }}
                          onBlur={() => {
                            setFormStatus('Blurred 💤');
                            setEvtLogs(prev => [`[blur] Input lost focus`, ...prev.slice(0, 5)]);
                          }}
                          placeholder="Click to focus / change text..."
                          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #fde68a', fontSize: '0.85rem' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 600 }}>Field Status: {formStatus}</span>
                          <button type="submit" style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                            Submit Form
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {activeEvtTypeTab === 'window' && (
                    <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '8px', padding: '1rem' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: '#9d174d' }}>Window Events Monitor</h5>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.8rem' }}>Try resizing your browser window or scrolling the page!</p>
                      <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #fbcfe8', fontSize: '0.85rem', color: '#9d174d' }}>
                        <div><strong>Window Width:</strong> {windowDimensions.w}px</div>
                        <div><strong>Window Height:</strong> {windowDimensions.h}px</div>
                      </div>
                      <button onClick={() => setEvtLogs(prev => [`[resize] Current viewport: ${window.innerWidth}x${window.innerHeight}`, ...prev.slice(0, 5)])} style={{ marginTop: '0.6rem', background: '#9d174d', color: '#fff', border: 'none', padding: '0.35rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                        Log Current Window Metrics
                      </button>
                    </div>
                  )}
                </div>

                {/* Live Event Log Stream */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h5 style={{ margin: 0, color: '#1e40af', fontSize: '0.88rem' }}>📋 Live Event Log Stream:</h5>
                    <button onClick={() => setEvtLogs([])} style={{ background: '#cbd5e1', border: 'none', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>Clear</button>
                  </div>
                  <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', minHeight: '140px', maxHeight: '180px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.8rem', color: '#38bdf8' }}>
                    {evtLogs.length === 0 ? (
                      <span style={{ color: '#64748b', fontStyle: 'italic' }}>Interact with the tester box on the left to see live event logs...</span>
                    ) : (
                      evtLogs.map((log, i) => (
                        <div key={i} style={{ paddingBottom: '3px', borderBottom: '1px solid #1e293b' }}>
                          <span style={{ color: '#fbbf24' }}>#{evtLogs.length - i}:</span> {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Inline HTML Event Handler Attributes</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
              Directly attach actions to tags using <code>on[Event]</code> attributes:
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Inline event handler attribute\n<button onclick="alert('Thank you!')">Click Me</button>`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('listeners')}>
              Next: addEventListener() →
            </button>
          </div>
        </Section>
      )}


      {/* ── TAB 3: LISTENERS ─────────────── */}
      {activeTab === 'listeners' && (
        <Section key="listeners" eyebrow="Day 9 • addEventListener" title="addEventListener() syntax">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              The <code>addEventListener()</code> method attaches an event handler to a target element without overriding existing event handlers.
            </p>

            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Syntax
element.addEventListener(event, function, useCapture);

// Example
let btn = document.getElementById("myButton");
btn.addEventListener("click", function() {
  console.log("Button Clicked!");
});`} />
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Adding Multiple Listeners &amp; removeEventListener()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
              You can add multiple event listeners of same or different types to a single element. You can remove a listener using <code>removeEventListener()</code>.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`function myAlert() {
  alert("Fired!");
}

// Attach
btn.addEventListener("click", myAlert);

// Remove (requires named function reference)
btn.removeEventListener("click", myAlert);`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'handlers')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('bom_core')}>Next: BOM core →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: BOM CORE ──────────────── */}
      {activeTab === 'bom_core' && (
        <Section key="bom_core" eyebrow="Day 9 • BOM" title="Browser Object Model (BOM)">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              The <strong>Browser Object Model (BOM)</strong> allows JavaScript to communicate with the browser regarding window measurements, user operating systems, and history records outside page node content.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { name: 'window', desc: 'Represents the browser window frame. Serves as global parent scope.', example: 'window.innerWidth / window.innerHeight' },
                { name: 'navigator', desc: 'Provides data about user browser tags and platform names.', example: 'navigator.userAgent / navigator.language' },
                { name: 'screen', desc: 'Supplies dimensions about the user screen monitor.', example: 'screen.width / screen.height' },
              ].map(obj => (
                <div key={obj.name} style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#ca8a04', marginBottom: '0.25rem', fontFamily: 'monospace' }}>{obj.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>{obj.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block' }}>{obj.example}</code>
                </div>
              ))}
            </div>

            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Reading user device parameters via BOM navigator
console.log(navigator.userAgent); // Browser Details
console.log(navigator.language);  // preferred language: e.g. en-US

// Screen details
console.log("Width: " + screen.width + ", Height: " + screen.height);`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'listeners')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('bom_location')}>Next: Location &amp; History →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: BOM LOCATION ──────────── */}
      {activeTab === 'bom_location' && (
        <Section key="bom_location" eyebrow="Day 9 • Location &amp; History" title="Location, History &amp; Window Methods">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              The BOM includes objects to inspect URL links, travel page navigation histories, and spawn browser tabs:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', margin: '0 0 0.5rem 0' }}>Location Object</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  The <code>location</code> object represents the URL of the current page. Assigning to <code>location.href</code> redirects the browser.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`console.log(location.href);\nlocation.href = "https://google.com";`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', margin: '0 0 0.5rem 0' }}>History Object</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  The <code>history</code> object contains the browser session history stack, letting you navigate backward and forward.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`history.back();    // go back\nhistory.forward(); // go forward`} />
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Window resizeTo() method</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
              The <code>window.resizeTo(width, height)</code> method resizes a secondary opened window tab to the specified width and height.
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`let newWindow = window.open("https://www.example.com/", "Newwindow", "width=500,height=500");\nnewWindow.resizeTo(300, 300);`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'bom_core')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('mini_program')}>Next: Mini Program →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: MINI PROGRAM ───────────── */}
      {activeTab === 'mini_program' && (
        <Section key="mini_program" eyebrow="Day 9 • Mini Project" title="Mini Project: Browser Environment Monitor">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This project combines BOM objects (<code>window</code> size metrics) with DOM <code>addEventListener</code> events.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' }}>
              {/* App View */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #ca8a04', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '1.2rem', fontSize: '1.2rem', borderBottom: '2px solid #ca8a04', paddingBottom: '0.5rem' }}>📊 Browser Monitor</h4>
                
                {/* Simulated window info */}
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1.2rem' }}>
                  <div style={{ marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                    <strong>Simulated Width:</strong> {windowDimensions.w}px
                  </div>
                  <div style={{ marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                    <strong>Simulated Height:</strong> {windowDimensions.h}px
                  </div>
                  <div style={{ fontSize: '0.88rem' }}>
                    <strong>Navigator Platform:</strong> {navigator.platform || "Unknown Device"}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <button onClick={handleResizeSimulation} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>
                    Simulate Window Resize
                  </button>
                  <button onClick={() => setEventTrackerLogs(["Logs cleared."])} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                    Clear Logs
                  </button>
                </div>

                <h5 style={{ margin: '1rem 0 0.5rem 0', color: '#1e293b' }}>Active Event Listener Tracker:</h5>
                <div style={{ background: '#0f172a', color: '#7ee787', padding: '0.8rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.82rem', maxHeight: '150px', overflowY: 'auto' }}>
                  {eventTrackerLogs.map((log, idx) => <div key={idx} style={{ paddingBottom: '4px' }}>&gt; {log}</div>)}
                </div>
              </div>

              {/* Code View */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Monitor Script Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '380px' }}>
                  <SyntaxHighlighter code={`// 1. Listen for Window Resize (BOM)
window.addEventListener("resize", function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  logEvent("Resized to " + width + "x" + height);
});

// 2. Click Monitor (DOM)
document.addEventListener("click", function(e) {
  logEvent("Click detected at coordinate (" + e.clientX + ", " + e.clientY + ")");
});

// 3. Platform details
var device = navigator.platform;
logEvent("Loaded platform: " + device);`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'bom_location')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Select a preset to load BOM and Event Listener sample scripts, then run them live:
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['handler',      '🎯 HTML Event Handlers'],
                ['listener',     '➕ addEventListener'],
                ['bom',          '💻 BOM Window metrics'],
                ['timers',       '⏰ Timeout timers'],
              ].map(([key, label]) => (
                <button key={key} onClick={() => loadPresetSnippet(key)}
                  style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {/* Editor */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Source Code Editor</span>
                  <button onClick={executePlaygroundCode} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.3rem 1.2rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Run Code &rarr;
                  </button>
                </div>
                <div style={{ position: 'relative', width: '100%', height: '320px', background: '#0f172a' }}>
                  <div ref={highlighterRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', pointerEvents: 'none', whiteSpace: 'pre', overflow: 'hidden', margin: 0 }}>
                    <SyntaxHighlighter code={editorCode} style={{ overflowX: 'visible' }} />
                  </div>
                  <textarea ref={editorRef} value={editorCode} onChange={e => setEditorCode(e.target.value)} onScroll={handleEditorScroll} wrap="off"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', background: 'transparent', color: 'transparent', caretColor: '#fff', resize: 'none', outline: 'none', border: 'none', whiteSpace: 'pre', overflow: 'auto', margin: 0 }} />
                </div>
              </div>

              {/* Output */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.4rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {['console', 'preview'].map(mode => (
                    <button key={mode} onClick={() => setPlaygroundMode(mode)}
                      style={{ background: 'none', border: 'none', fontSize: '0.78rem', fontWeight: 700, color: playgroundMode === mode ? '#ca8a04' : '#64748b', borderBottom: playgroundMode === mode ? '2px solid #ca8a04' : '2px solid transparent', padding: '0.3rem 0.5rem', cursor: 'pointer', textTransform: 'uppercase' }}>
                      {mode === 'console' ? 'Console Logs' : 'Live Page Preview'}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, minHeight: '320px', background: '#1e293b', position: 'relative' }}>
                  {playgroundMode === 'console' ? (
                    <pre style={{ margin: 0, padding: '1rem', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, fontFamily: 'monospace', fontSize: '0.88rem', background: '#1e293b', color: '#38bdf8', overflowY: 'auto', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {consoleOutput}
                    </pre>
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#fff' }}>
                      {runTrigger > 0 ? (
                        <iframe
                          key={runTrigger}
                          srcDoc={`<!DOCTYPE html><html><head><style>body{font-family:sans-serif;margin:10px;}</style></head><body><script>const _l=console.log;console.log=(...a)=>{_l(...a);window.parent.postMessage({type:'CONSOLE_LOG',log:a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ')},'*');};window.onerror=(m)=>{window.parent.postMessage({type:'CONSOLE_ERROR',error:m},'*');return false;};</script>${editorCode.includes('<html') || editorCode.includes('<script') ? editorCode : '<script>' + editorCode + '</script>'}</body></html>`}
                          title="Sandbox Preview"
                          sandbox="allow-scripts"
                          style={{ width: '100%', height: '320px', border: 'none' }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '0.9rem' }}>
                          Click &quot;Run Code&quot; to render preview
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'mini_program')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 9 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 8: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 9 • Assessment" title="Day 9 Assessment — Event &amp; BOM">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Pitfalls
            </h3>
            {[
              { mistake: 'Removing an anonymous event listener', code: `// ❌ This listener cannot be removed:\nbtn.addEventListener("click", () => alert("Fired"));\nbtn.removeEventListener("click", () => alert("Fired")); // Does nothing!\n\n// ✅ Correct: must pass a named function reference:\nfunction handler() { alert("Fired"); }\nbtn.addEventListener("click", handler);\nbtn.removeEventListener("click", handler);` },
              { mistake: 'Confusing window.innerWidth with screen.width', code: `// innerWidth/Height is the visible layout viewport inside browser tab:\nconsole.log(window.innerWidth); \n\n// screen.width/height is the device monitor resolution itself:\nconsole.log(screen.width);` },
              { mistake: 'Using incorrect case sensitivity for event names', code: `// ❌ Event listener attributes are lower-case, addEventListener takes no "on":\nbtn.addEventListener("onclick", handler); // Invalid!\n\n// ✅ Correct:\nbtn.addEventListener("click", handler);` },
            ].map(({ mistake, code }) => (
              <div key={mistake} style={{ border: '1px solid #fecaca', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                <div style={{ background: '#fef2f2', padding: '0.6rem 1rem', fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>⚠️ {mistake}</div>
                <div style={{ background: '#0f172a', padding: '0.75rem 1rem' }}><SyntaxHighlighter code={code} /></div>
              </div>
            ))}
          </div>

          {/* Quiz */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="#ca8a04" /> Quick Knowledge Check
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map((question) => {
                const selected = selectedAnswers[question.id];
                const checked  = checkedQuestions[question.id];
                return (
                  <div key={question.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.2rem' }}>
                    <p style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.75rem' }}>{question.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {question.options.map((opt, idx) => {
                        let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                        if (selected === idx) { bg = '#fffbeb'; border = '1px solid #ca8a04'; color = '#92400e'; }
                        if (checked) {
                          if (idx === question.ans) { bg = '#f0fdf4'; border = '1px solid #10b981'; color = '#065f46'; }
                          else if (selected === idx) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#991b1b'; }
                        }
                        return (
                          <button key={idx} onClick={() => !checked && handleSelectAnswer(question.id, idx)}
                            style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border, background: bg, color, textAlign: 'left', cursor: checked ? 'default' : 'pointer', fontWeight: selected === idx ? 600 : 400 }}>
                            {['A', 'B', 'C', 'D'][idx]}. {opt}
                          </button>
                        );
                      })}
                    </div>
                    {!checked && selected !== undefined && (
                      <button onClick={() => handleCheckQuestion(question.id)} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.4rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                        Check Answer
                      </button>
                    )}
                    {checked && (
                      <div style={{ fontSize: '0.85rem', color: selected === question.ans ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                        {selected === question.ans ? '✅ Correct!' : `❌ Incorrect. Correct: ${['A','B','C','D'][question.ans]}. ${question.options[question.ans]}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button onClick={checkFinalScore} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                Submit All &amp; Get Score
              </button>
              {score !== null && (
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: score >= 4 ? '#10b981' : score >= 3 ? '#f59e0b' : '#ef4444' }}>
                  Score: {score}/{quizQuestions.length} — {score === 5 ? '🏆 Perfect!' : score >= 4 ? '🎉 Great job!' : score >= 3 ? '👍 Good effort!' : '📚 Keep practising!'}
                </div>
              )}
            </div>
          </div>

          {/* Topic-Wise Interview Questions */}
          <div className="panel" style={{ marginBottom: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
            <h3 style={{ marginBottom: '1.2rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💬 Day 9 Topic-Wise Technical Interview Questions & Answers
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Event Propagation (Bubbling vs Capturing vs Delegation)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: Explain Event Bubbling vs Event Capturing, and how Event Delegation improves memory efficiency?</strong><br />
                  <strong>Answer:</strong> Event Capturing travels down from the <code>window</code> to the target element (3rd param of <code>addEventListener</code> set to <code>true</code>). Event Bubbling travels upward from target to <code>window</code>. Event Delegation attaches a single listener on a common parent, utilizing <code>event.target</code> to handle dynamically added child elements without binding individual listeners to each node.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: event.stopPropagation() vs event.preventDefault()
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What is the exact difference between <code>event.stopPropagation()</code> and <code>event.preventDefault()</code>?</strong><br />
                  <strong>Answer:</strong> <code>event.stopPropagation()</code> halts the event from bubbling up to parent ancestors. <code>event.preventDefault()</code> cancels the browser's default native browser action (such as preventing a form submit refresh or anchor link navigation), but does NOT stop event propagation.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Browser Storage (localStorage vs sessionStorage vs Cookies)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: Compare storage capacity, expiration, and server header transmission for LocalStorage, SessionStorage, and Cookies?</strong><br />
                  <strong>Answer:</strong> <code>localStorage</code> stores ~5MB persistently until manually deleted. <code>sessionStorage</code> stores ~5MB cleared when the browser tab closes. Cookies store ~4KB, support expiration dates, and are sent automatically in HTTP headers with every request to the server.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Debouncing vs Throttling
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What is the difference between Debouncing and Throttling in event handling?</strong><br />
                  <strong>Answer:</strong> <strong>Debouncing</strong> delays function execution until a specified delay has elapsed since the <em>last</em> event call (ideal for search input auto-complete). <strong>Throttling</strong> enforces a maximum rate limit, executing the callback at most once per fixed time interval (ideal for scroll or window resize handlers).
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: BOM Timers (setTimeout vs setInterval Minimum Delay)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: Why does <code>setTimeout(fn, 0)</code> not execute immediately in 0ms?</strong><br />
                  <strong>Answer:</strong> <code>setTimeout(fn, 0)</code> puts the callback into the Macrotask Callback Queue. The browser must wait for the current Call Stack to clear completely and process pending microtasks before the Event Loop can dequeue and execute the timer callback (HTML spec also enforces a 4ms minimum nesting delay).
                </p>
              </div>
            </div>
          </div>

          {/* Assignments */}
          <div className="panel" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
            <h3 style={{ marginBottom: '1rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} /> Day 9 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Write a script that tracks mouse movements and displays coordinates on screen.</li>
              <li>Implement nested elements where parent and child alert click events. Compare bubbling vs capturing sequences.</li>
              <li>Create a button that removes its own click listener after being clicked once.</li>
              <li>Write a script showing browser userAgent language details, alongside monitor screen heights.</li>
              <li>Create an interactive stopwatch utilizing <code>setInterval()</code> and <code>clearInterval()</code> BOM timer methods.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
