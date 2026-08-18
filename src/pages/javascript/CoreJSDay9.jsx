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
    } else if (name === 'propagation') {
      setEditorCode(`// Event propagation bubbling vs capturing
// If parent click listener useCapture is true (third param), parent runs first!
document.addEventListener("click", function() {
  console.log("Document Clicked (Bubbling)");
});`);
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

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Interactive Event Types</h3>
            <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              Events fall into standard categories based on the user's action:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { type: 'Mouse Events', list: 'click, dblclick, mousemove, mouseover, mouseout', bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af' },
                { type: 'Keyboard Events', list: 'keydown, keypress, keyup', bg: '#ecfdf5', border: '#a7f3d0', color: '#065f46' },
                { type: 'Form Events', list: 'submit, change, focus, blur', bg: '#fffbeb', border: '#fde68a', color: '#854d0e' },
                { type: 'Window Events', list: 'load, resize, scroll', bg: '#fdf2f8', border: '#fbcfe8', color: '#9d174d' },
              ].map(evt => (
                <div key={evt.type} style={{ background: evt.bg, border: `1px solid ${evt.border}`, borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: evt.color, marginBottom: '0.25rem' }}>{evt.type}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', fontFamily: 'monospace' }}>{evt.list}</div>
                </div>
              ))}
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
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('propagation')}>
              Next: Event Propagation →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: PROPAGATION ───────────── */}
      {activeTab === 'propagation' && (
        <Section key="propagation" eyebrow="Day 9 • Propagation" title="Event Propagation (Bubbling vs Capturing)">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              Event propagation is the process by which an event travels through the DOM tree. When an element is clicked, the event ripples through three phases:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              {[
                { name: '1. Capturing Phase', desc: 'The event travels down from the window object, through parents, to the target node.' },
                { name: '2. Target Phase', desc: 'The event reaches the clicked element itself where handlers run.' },
                { name: '3. Bubbling Phase', desc: 'The event bubbles back up from the target element to the window. This is the default.' },
              ].map(phase => (
                <div key={phase.name} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                  <h4 style={{ color: '#ca8a04', margin: '0 0 0.5rem 0' }}>{phase.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{phase.desc}</p>
                </div>
              ))}
            </div>

            {/* Interactive Propagation Playground */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#1e40af', marginTop: 0, marginBottom: '0.5rem' }}>🌊 Bubbling vs. Capturing Sandbox</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
                Toggle capturing phase. Clicking "Click Child Button" bubbles or captures click handlers.
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#475569' }}>
                  <input type="checkbox" checked={useCapturing} onChange={e => { setUseCapturing(e.target.checked); setPropagationLogs([]); }} style={{ marginRight: '0.5rem' }} />
                  Enable Capturing (useCapture = true)
                </label>
                <button onClick={() => setPropagationLogs([])} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Clear logs</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.2rem', alignItems: 'start' }}>
                {/* Interactive Demo */}
                <div 
                  onClick={() => {
                    if (!useCapturing) {
                      handleParentClick('bubbling');
                    }
                  }}
                  onClickCapture={() => {
                    if (useCapturing) {
                      handleParentClick('capturing');
                    }
                  }}
                  style={{ background: '#bfdbfe', border: '2px solid #1d4ed8', padding: '2.5rem', borderRadius: '8px', cursor: 'pointer', textAlign: 'center' }}
                >
                  <span style={{ display: 'block', fontWeight: 700, color: '#1d4ed8', marginBottom: '1rem', fontSize: '0.9rem' }}>PARENT CONTAINER</span>
                  
                  <button onClick={() => {
                    handleChildClick();
                  }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Click Child Button
                  </button>
                </div>

                {/* Logs */}
                <div>
                  <h5 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Propagation Trigger Order:</h5>
                  <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.8rem', borderRadius: '6px', minHeight: '120px', fontSize: '0.85rem' }}>
                    {propagationLogs.length === 0 ? (
                      <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Logs empty. Click the button above.</span>
                    ) : (
                      propagationLogs.map((log, idx) => <div key={idx} style={{ color: '#ca8a04', fontWeight: 600, paddingBottom: '4px' }}>{idx + 1}. {log}</div>)
                    )}
                  </div>
                </div>

                {/* Source Code */}
                <div>
                  <h5 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>💻 Source Code:</h5>
                  <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', overflowY: 'auto', maxHeight: '220px' }}>
                    <SyntaxHighlighter code={useCapturing ? `// HTML
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
let parent = document.getElementById("parent");
let child = document.getElementById("child");

// 1. Parent intercepts first in Capture Phase (3rd param is true)
parent.addEventListener("click", function() {
  console.log("1. Parent clicked (Capturing)");
}, true);

// 2. Child runs second
child.addEventListener("click", function() {
  console.log("2. Child clicked (Target)");
});
</script>` : `// HTML
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
let parent = document.getElementById("parent");
let child = document.getElementById("child");

// 1. Child fires first (Target Phase)
child.addEventListener("click", function() {
  console.log("1. Child clicked (Target)");
});

// 2. Parent fires second (Bubbling Phase - default)
parent.addEventListener("click", function() {
  console.log("2. Parent clicked (Bubbling)");
});
</script>`} />
                  </div>
                  {useCapturing ? (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', margin: '0.75rem 0 0 0' }}>
                      <strong>How it works:</strong> Setting the third parameter to <code>true</code> means <strong>"Parent goes first!"</strong>. The parent catches the click event on its way down to the child, so parent runs first and child runs second.
                    </p>
                  ) : (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', margin: '0.75rem 0 0 0' }}>
                      <strong>How it works:</strong> By default (no third parameter), JavaScript uses <strong>"Child goes first!"</strong> (Bubbling). The child button runs its click event first, and then the event bubbles up to run the parent container's click event second.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Explanation Content */}
          <div style={{ marginTop: '2.5rem', background: '#ffffff', borderRadius: '12px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: 700 }}>
              💡 Simple Guide to Event Propagation
            </h3>
            
            {/* What is Event Propagation in Simple Terms */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>🤔 What is Event Propagation in Simple Terms?</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Imagine you have two nested gift boxes: an <strong>Outer Box</strong> (Parent Container) and an <strong>Inner Box</strong> (Child Button). 
                If you poke the Inner Box with a stick, you are technically poking the Outer Box as well because the inner box is inside it. 
                In web development, this "poke" is a click event. How this click travels through the parent and child elements is called <strong>Event Propagation</strong>.
              </p>
            </div>

            {/* Why Do We Need Event Propagation */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>🚀 Why Do We Need Event Propagation?</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Event propagation is extremely useful for two main reasons:
              </p>
              <ul style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '20px', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Event Delegation (Efficiency)</strong>: Instead of adding click listeners to 100 individual buttons, you can add just <em>one</em> click listener to their parent container. When any button is clicked, the event bubbles up to the parent, where you can handle it. This saves memory and keeps code clean.
                </li>
                <li>
                  <strong>Event Interception (Control)</strong>: By using the Capturing phase, you can catch, log, or stop events on a parent level before they even reach the child buttons.
                </li>
              </ul>
            </div>

            {/* Visual Graphic Representation of Event Flow */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                🗺️ How Event Propagation is Processed (Event Flow Diagram)
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Below is the visual lifecycle of an event. When you click the <strong>Target</strong> element, the event cycles through all three phases:
              </p>
              
              {/* CSS Flow Diagram */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '600px', margin: '0 auto', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                {/* Level 1: Window */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: activeStep === 'window-cap' ? '#fef3c7' : (activeStep === 'window-bub' ? '#e0f2fe' : '#f1f5f9'),
                  border: activeStep === 'window-cap' ? '2px solid #d97706' : (activeStep === 'window-bub' ? '2px solid #0284c7' : '1px solid #cbd5e1'),
                  boxShadow: activeStep === 'window-cap' ? '0 0 12px rgba(217,119,6,0.4)' : (activeStep === 'window-bub' ? '0 0 12px rgba(2,132,199,0.4)' : 'none'),
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Window</span>
                  <div style={{ display: 'flex', gap: '2rem', fontSize: '0.78rem' }}>
                    <span style={{ color: activeStep === 'window-cap' ? '#b45309' : '#d97706', fontWeight: 700 }}>1. Start Capturing ↓</span>
                    <span style={{ color: activeStep === 'window-bub' ? '#0369a1' : '#0284c7', fontWeight: 700 }}>3. Finish Bubbling ↑</span>
                  </div>
                </div>
                {/* Arrow down and up */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <span>↓</span>
                  <span>↑</span>
                </div>
                {/* Level 2: Document */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: activeStep === 'doc-cap' ? '#fef3c7' : (activeStep === 'doc-bub' ? '#e0f2fe' : '#f1f5f9'),
                  border: activeStep === 'doc-cap' ? '2px solid #d97706' : (activeStep === 'doc-bub' ? '2px solid #0284c7' : '1px solid #cbd5e1'),
                  boxShadow: activeStep === 'doc-cap' ? '0 0 12px rgba(217,119,6,0.4)' : (activeStep === 'doc-bub' ? '0 0 12px rgba(2,132,199,0.4)' : 'none'),
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Document</span>
                  <div style={{ display: 'flex', gap: '2rem', fontSize: '0.78rem' }}>
                    <span style={{ color: activeStep === 'doc-cap' ? '#b45309' : '#d97706', fontWeight: activeStep === 'doc-cap' ? 700 : 400 }}>Capturing Phase ↓</span>
                    <span style={{ color: activeStep === 'doc-bub' ? '#0369a1' : '#0284c7', fontWeight: activeStep === 'doc-bub' ? 700 : 400 }}>Bubbling Phase ↑</span>
                  </div>
                </div>
                {/* Arrow down and up */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <span>↓</span>
                  <span>↑</span>
                </div>
                {/* Level 3: Parent Container */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: activeStep === 'parent-cap' ? '#fef3c7' : (activeStep === 'parent-bub' ? '#e0f2fe' : '#eff6ff'),
                  border: activeStep === 'parent-cap' ? '2px solid #d97706' : (activeStep === 'parent-bub' ? '2px solid #0284c7' : '1px solid #bfdbfe'),
                  boxShadow: activeStep === 'parent-cap' ? '0 0 12px rgba(217,119,6,0.4)' : (activeStep === 'parent-bub' ? '0 0 12px rgba(2,132,199,0.4)' : 'none'),
                  transition: 'all 0.3s ease',
                  padding: '0.6rem 1rem',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e40af' }}>Parent Container &lt;div&gt;</span>
                  <div style={{ display: 'flex', gap: '2rem', fontSize: '0.78rem' }}>
                    <span style={{ color: activeStep === 'parent-cap' ? '#b45309' : '#d97706', fontWeight: 700 }}>Captured Here</span>
                    <span style={{ color: activeStep === 'parent-bub' ? '#0369a1' : '#0284c7', fontWeight: 700 }}>Bubbled Here</span>
                  </div>
                </div>
                {/* Arrow down and up */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <span>↓</span>
                  <span>↑</span>
                </div>
                {/* Level 4: Child Target */}
                <div style={{
                  background: activeStep === 'target' ? '#d1fae5' : '#ecfdf5',
                  border: activeStep === 'target' ? '2px solid #10b981' : '1px solid #a7f3d0',
                  boxShadow: activeStep === 'target' ? '0 0 16px rgba(16,185,129,0.5)' : 'none',
                  transform: activeStep === 'target' ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  padding: '0.8rem 1rem',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#065f46', display: 'block', marginBottom: '0.2rem' }}>
                    Child Button &lt;button&gt; (Target Element)
                  </span>
                  <span style={{ fontSize: '0.75rem', background: activeStep === 'target' ? '#059669' : '#34d399', color: activeStep === 'target' ? '#ffffff' : '#065f46', padding: '0.15rem 0.6rem', borderRadius: '10px', fontWeight: 700, display: 'inline-block', transition: 'all 0.3s ease' }}>
                    2. Target Phase (Fires Click Event)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Bubbling Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.5rem' }}>
                <h4 style={{ color: '#0284c7', marginTop: 0, marginBottom: '0.8rem', fontSize: '1.15rem' }}>🌊 1. Event Bubbling (Default)</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  The event starts at the target (the child button) and bubbles <strong>upwards</strong> to parent elements.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.82rem', marginBottom: '1rem' }}>
                  <code style={{ color: '#38bdf8', fontFamily: 'monospace' }}>
                    {`// Child fires first, then Parent\n`}
                    {`child.addEventListener("click", () => {\n`}
                    {`  console.log("Child clicked");\n`}
                    {`});\n\n`}
                    {`parent.addEventListener("click", () => {\n`}
                    {`  console.log("Parent clicked");\n`}
                    {`});`}
                  </code>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                  Output: 1. Child clicked → 2. Parent clicked
                </div>
              </div>

              {/* Capturing Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.5rem' }}>
                <h4 style={{ color: '#0d9488', marginTop: 0, marginBottom: '0.8rem', fontSize: '1.15rem' }}>🪂 2. Event Capturing (Trickle Down)</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  The event travels <strong>downwards</strong> from the parent to the target element. Enabled by passing <code>true</code> as the 3rd parameter.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.82rem', marginBottom: '1rem' }}>
                  <code style={{ color: '#38bdf8', fontFamily: 'monospace' }}>
                    {`// Parent intercepts first during capture phase\n`}
                    {`parent.addEventListener("click", () => {\n`}
                    {`  console.log("Parent clicked");\n`}
                    {`}, true); // <--- capture = true\n\n`}
                    {`child.addEventListener("click", () => {\n`}
                    {`  console.log("Child clicked");\n`}
                    {`});`}
                  </code>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                  Output: 1. Parent clicked → 2. Child clicked
                </div>
              </div>
            </div>

            {/* Precedence/Stop Propagation Note */}
            <div style={{ background: '#fffbeb', borderLeft: '4px solid #d97706', padding: '1rem 1.25rem', borderRadius: '6px', fontSize: '0.92rem', color: '#78350f', lineHeight: 1.6 }}>
              💡 <strong>Stopping Propagation:</strong> You can prevent an event from bubbling up or capturing down by calling <code>event.stopPropagation()</code> inside any event listener.
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'handlers')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('listeners')}>Next: Event Listeners →</button>
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
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day9', 'propagation')}>← Back</button>
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
                ['propagation',  '🌊 Bubble vs Capture'],
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
