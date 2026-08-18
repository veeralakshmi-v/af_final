import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, PenTool, Layers, Zap, MousePointerClick, FastForward, Smartphone, Settings } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter
// ─────────────────────────────────────────────────────────────────────────────
const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: '"Fira Code", "Consolas", monospace', lineHeight: '1.65', fontSize: '0.85rem' }}>
      {lines.map((line, li) => {
        if (line === '') return <div key={li} style={{ height: '0.8em' }} />;
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|Set|Map|navigator|location|screen|history)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const toks = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fw = 'normal';
          if (comment)       color = '#8b949e';
          else if (str)      color = '#a5d6ff';
          else if (htmlTag)  color = '#7ee787';
          else if (kw)     { color = '#ff7b72'; fw = 'bold'; }
          else if (literal)  color = '#d2a8ff';
          else if (builtin)  color = '#ffb454';
          else if (num)      color = '#79c0ff';
          else if (ident)    color = '#e1e4e8';
          else if (sym)      color = '#ff7b72';
          toks.push(<span key={k++} style={{ color, fontWeight: fw }}>{tok}</span>);
        }
        return <div key={li} style={{ whiteSpace: 'pre' }}>{toks.length > 0 ? toks : line}</div>;
      })}
    </div>
  );
};

const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CB = ({ code }) => (
  <div style={{ background: '#0f172a', padding: '1.2rem 1.5rem', borderRadius: 12, overflowX: 'auto', margin: '0.8rem 0', border: '1px solid #1e293b' }}>
    <SyntaxHighlighter code={code} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function JSDay9({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_module9', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // ── Propagation Sandbox States ──
  const [useCaptureMode, setUseCaptureMode] = useState(false);
  const [propagationLogs, setPropagationLogs] = useState([]);
  const [stopPropagationActive, setStopPropagationActive] = useState(false);

  const triggerParentClick = (e) => {
    if (useCaptureMode) {
      setPropagationLogs(prev => [...prev, 'Parent Captured! 🛡️']);
    } else {
      setPropagationLogs(prev => [...prev, 'Parent Bubbled! 🫧']);
    }
  };

  const triggerChildClick = (e) => {
    if (stopPropagationActive) {
      e.stopPropagation();
      setPropagationLogs(prev => [...prev, 'Child Clicked! 🎯 (Stopped propagation)']);
    } else {
      setPropagationLogs(prev => [...prev, 'Child Clicked! 🎯']);
    }
  };

  // ── BOM Stats State ──
  const [bomInfo, setBomInfo] = useState({
    userAgent: 'Loading...',
    language: 'Loading...',
    screenSize: 'Loading...',
    simulatedUrl: 'https://alpha-dev-academy.ai/dashboard',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBomInfo({
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${screen.width} x ${screen.height} (${screen.colorDepth}-bit color)`,
        simulatedUrl: window.location.href,
      });
    }
  }, []);

  // ── Sandbox Console Logs ──
  const [consoleLogs, setConsoleLogs] = useState(['AI-Driven Console Active. Perform triggers...']);
  const [typedInput, setTypedInput] = useState('');

  const addConsoleLog = (msg) => {
    setConsoleLogs(prev => [msg, ...prev.slice(0, 14)]);
  };

  // ── Mouse & Keyboard State ──
  const [lastKeyPressed, setLastKeyPressed] = useState('None');
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // ── Local Storage State ──
  const [lsKey, setLsKey] = useState('');
  const [lsVal, setLsVal] = useState('');
  const [lsOutput, setLsOutput] = useState('');

  // ── To-Do List State ──
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('js_day9_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [todoInput, setTodoInput] = useState('');

  const addTodo = () => {
    if (todoInput.trim()) {
      const newTodos = [...todos, { id: Date.now(), text: todoInput.trim() }];
      setTodos(newTodos);
      localStorage.setItem('js_day9_todos', JSON.stringify(newTodos));
      setTodoInput('');
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(t => t.id !== id);
    setTodos(newTodos);
    localStorage.setItem('js_day9_todos', JSON.stringify(newTodos));
  };

  // ── Assignment ──
  const [submitted, setSubmitted] = useState(false);
  const [assignVal, setAssignVal] = useState('');

  return (
    <AnimatePresence mode="wait">

      {/* ════════════════ TAB 1: EVENT HANDLERS & LISTENERS ════════════════ */}
      {activeTab === 'js_event_handlers' && (
        <Section eyebrow="Syllabus 01" title="AI-Powered Event Handlers & Listeners">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>In modern web applications, <strong>events</strong> are signals sent by the browser informing your code that "something occurred" (like clicks, key presses, or load statuses). JavaScript hooks into these interactions via event handling functions.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. Inline Event Attributes (Traditional)</h3>
            <p>Traditional inline attribute handlers mix structure (HTML) with behavior (JavaScript), which is generally discouraged in clean production code but useful for simple tasks.</p>
            <CB code={`<!-- Inline Event Attribute -->
<button onclick="alert('Thank you for clicking!')">Click Me!</button>

<!-- Calling a defined function -->
<button onclick="jump()">Jump Action</button>`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. addEventListener() Method (Modern Standard)</h3>
            <p>The standard modern way to register events is <code>addEventListener()</code>. It allows attaching multiple listeners of the same or different types to a single element without overwriting existing triggers.</p>
            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <CB code={`element.addEventListener(event, callbackFunction, useCapture);`} />
            </div>
            <CB code={`const button = document.getElementById("action-btn");

// Attaching standard click listener
button.addEventListener("click", function(event) {
  console.log("Button clicked!");
});

// Attaching multiple listeners
button.addEventListener("mouseenter", () => console.log("Mouse hovered!"));
button.addEventListener("mouseleave", () => console.log("Mouse left!"));`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Common Event Triggers</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Event Type</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Triggers</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>Mouse Events</td>
                    <td style={{ padding: '0.7rem 1rem' }}>User clicks, hovers, or drags.</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>'click', 'dblclick', 'mouseenter', 'mouseleave'</td>
                  </tr>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>Keyboard Events</td>
                    <td style={{ padding: '0.7rem 1rem' }}>User interacts with keys.</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>'keydown', 'keyup', 'keypress'</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>Form Events</td>
                    <td style={{ padding: '0.7rem 1rem' }}>User updates inputs or submits.</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>'submit', 'change', 'focus', 'blur'</td>
                  </tr>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>Window Events</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Browser processes window changes.</td>
                    <td style={{ padding: '0.7rem 1rem', fontFamily: 'monospace' }}>'load', 'resize', 'scroll'</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_mouse_keyboard')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Mouse & Keyboard Events <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: MOUSE & KEYBOARD EVENTS ════════════ */}
      {activeTab === 'js_mouse_keyboard' && (
        <Section eyebrow="Syllabus 02" title="Mouse & Keyboard Events">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>JavaScript allows listening to specific hardware triggers. Keyboard events track user input keystrokes, while mouse events capture cursor position and click interactions.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Mouse Event Types</h3>
            <p>Common mouse events include <code>click</code>, <code>dblclick</code>, <code>mouseenter</code>, <code>mouseleave</code>, and <code>mousemove</code>.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Keyboard Event Types</h3>
            <p>Common keyboard events include <code>keydown</code> (when key is pressed down) and <code>keyup</code> (when key is released).</p>
            <CB code={`window.addEventListener("keydown", function(event) {
  console.log("Key pressed: " + event.key);
  console.log("Key code: " + event.code);
});`} />

            {/* Interactive Demo */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Playground: Event Tracker</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMouseCoords({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
              }} style={{ height: '150px', background: '#0f172a', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#86efac', cursor: 'crosshair' }}>
                <strong style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Hover & Move Mouse Here</strong>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '8px' }}>X: {mouseCoords.x}px, Y: {mouseCoords.y}px</span>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffb454' }}>
                <strong style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>Type Anywhere & Focus Input</strong>
                <input placeholder="Type here..." onKeyDown={e => setLastKeyPressed(e.key)}
                  style={{ padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, outline: 'none', width: '80%', color: '#334155' }} />
                <span style={{ fontSize: '1.1rem', marginTop: '8px', fontWeight: 700 }}>Last Key: {lastKeyPressed}</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_local_storage')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Local Storage <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: LOCAL STORAGE ════════════ */}
      {activeTab === 'js_local_storage' && (
        <Section eyebrow="Syllabus 03" title="Web Storage: Local Storage">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p><strong>LocalStorage</strong> allows JavaScript web applications to store key-value pairs in a web browser with no expiration date. The data survives page refreshes and browser restarts.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Local Storage Methods</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem' }}>
                <code style={{ background: '#1e293b', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: 6 }}>localStorage.setItem(key, value)</code>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem' }}>Saves a key-value pair in browser storage. Note: values must be strings.</p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem' }}>
                <code style={{ background: '#1e293b', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: 6 }}>localStorage.getItem(key)</code>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem' }}>Retrieves the value associated with the specified key.</p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem' }}>
                <code style={{ background: '#1e293b', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: 6 }}>localStorage.removeItem(key)</code>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem' }}>Removes the key-value pair from storage.</p>
              </div>
            </div>

            {/* Interactive LocalStorage Demo */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Demo: Storage Manager</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                <input placeholder="Key (e.g. username)..." value={lsKey} onChange={e => setLsKey(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1 }} />
                <input placeholder="Value (e.g. Alice)..." value={lsVal} onChange={e => setLsVal(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1 }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <button onClick={() => { if(lsKey && lsVal) { localStorage.setItem(lsKey, lsVal); setLsOutput(`Saved: ${lsKey} = ${lsVal}`); setLsKey(''); setLsVal(''); } }}
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>setItem()</button>
                <button onClick={() => { if(lsKey) { const v = localStorage.getItem(lsKey); setLsOutput(v ? `Found: ${lsKey} = ${v}` : `Key "${lsKey}" not found!`); } }}
                  style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>getItem()</button>
                <button onClick={() => { if(lsKey) { localStorage.removeItem(lsKey); setLsOutput(`Removed: ${lsKey}`); setLsKey(''); } }}
                  style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>removeItem()</button>
              </div>
              {lsOutput && <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8, color: '#a5d6ff', fontFamily: 'monospace', fontSize: '0.85rem' }}>{lsOutput}</div>}
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_json_basics')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: JSON Basics <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: JSON BASICS ════════════ */}
      {activeTab === 'js_json_basics' && (
        <Section eyebrow="Syllabus 04" title="JSON Basics (stringify & parse)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p><strong>JSON (JavaScript Object Notation)</strong> is a lightweight format for storing and transporting data. Because LocalStorage only stores strings, we must use JSON conversion methods to save arrays and objects.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. JSON.stringify()</h3>
            <p>Converts a JavaScript object/array into a JSON string:</p>
            <CB code={`let user = { name: "Alice", age: 25 };
let jsonString = JSON.stringify(user);
console.log(jsonString); // '{"name":"Alice","age":25}' (String type)

// Save to LocalStorage
localStorage.setItem("user_profile", jsonString);`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. JSON.parse()</h3>
            <p>Converts a JSON string back into a JavaScript object/array:</p>
            <CB code={`let dataString = localStorage.getItem("user_profile");
let userObject = JSON.parse(dataString);
console.log(userObject.name); // "Alice" (Object type)`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_todo_project')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Mini Project <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: MINI PROJECT ════════════ */}
      {activeTab === 'js_todo_project' && (
        <Section eyebrow="Mini Project" title="Persistent To-Do List App">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>This mini project showcases event listeners, JSON stringify/parse, and localStorage persistence by creating a functional task organizer.</p>
            
            {/* Add Task Form */}
            <div style={{ background: '#f8fafc', padding: '1.2rem', border: '1px solid #cbd5e1', borderRadius: 12, display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input placeholder="Add a new task..." value={todoInput} onChange={e => setTodoInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTodo()}
                style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1 }} />
              <button onClick={addTodo} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Add Task</button>
            </div>

            {/* Task List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {todos.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.8rem 1rem', borderRadius: 10 }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{t.text}</span>
                  <button onClick={() => deleteTodo(t.id)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '0.3rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}>Delete</button>
                </div>
              ))}
              {todos.length === 0 && <div style={{ color: '#94a3b8', textAlign: 'center', padding: '1.5rem' }}>No tasks. Add some above!</div>}
            </div>

            {/* Source Code */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '2rem' }}>📋 Source Code</h3>
            <CB code={`// 1. Get from localStorage or default empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 2. Add Task Function
function addTask(text) {
  todos.push({ id: Date.now(), text: text });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 3. Delete Task Function
function deleteTask(id) {
  todos = todos.filter(t => t.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
}`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_event_propagation')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Event Propagation (Bonus) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── TAB 2: EVENT PROPAGATION ── */}
      {activeTab === 'js_event_propagation' && (
        <Section eyebrow="Syllabus 02" title="Event Propagation: Bubbling & Capturing">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p><strong>Event Propagation</strong> describes the sequence in which event handlers fire when an action is performed on elements nested inside one another. JavaScript divides this process into three distinct phases:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: 10 }}>
                <strong style={{ color: '#ca8a04' }}>1. Capturing Phase</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>The event starts from the outermost window parent node and travels downwards to the target element. Configured using <code>useCapture = true</code>.</p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: 10 }}>
                <strong style={{ color: '#3b82f6' }}>2. Target Phase</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>The event reaches the exact element node that originated the click/interaction and executes its specific handlers.</p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: 10 }}>
                <strong style={{ color: '#10b981' }}>3. Bubbling Phase</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>The event rises up from the target element back up to the window parent root. This is the default phase for standard listeners.</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Stopping Propagation</h3>
            <p>You can stop an event from continuing its path up or down the DOM tree by calling <code>event.stopPropagation()</code> inside the handler:</p>
            <CB code={`childElement.addEventListener("click", function(event) {
  event.stopPropagation(); // Prevents bubbling up to parents!
  console.log("Child clicked only!");
});`} />

            {/* Interactive Propagation Visualizer */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>🎮 Live Visualizer: Propagation order</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={useCaptureMode} onChange={e => setUseCaptureMode(e.target.checked)} />
                  Enable Capturing Phase (Parent fires first)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={stopPropagationActive} onChange={e => setStopPropagationActive(e.target.checked)} />
                  Call event.stopPropagation()
                </label>
                <button onClick={() => setPropagationLogs([])} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.7rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}>Clear Logs</button>
              </div>

              {/* Box structures */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
                <div onClickCapture={triggerParentClick} onClick={!useCaptureMode ? triggerParentClick : undefined}
                  style={{ background: '#dbeafe', border: '3px solid #3b82f6', borderRadius: 12, padding: '2rem', cursor: 'pointer', textAlign: 'center' }}>
                  <strong style={{ color: '#1e3a8a' }}>Outer Parent Div</strong>
                  
                  <div onClick={triggerChildClick}
                    style={{ background: '#dcfce7', border: '3px solid #10b981', borderRadius: 8, padding: '1.5rem', marginTop: '1rem', cursor: 'pointer' }}>
                    <strong style={{ color: '#064e3b' }}>Target Child Element (Click Me!)</strong>
                  </div>
                </div>

                <div style={{ background: '#0f172a', color: '#e1e4e8', borderRadius: 10, padding: '1rem', minHeight: '130px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  <span style={{ color: '#ca8a04', fontWeight: 700 }}>Trigger Propagation Logs:</span>
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {propagationLogs.map((log, i) => <li key={i}>{log}</li>)}
                    {propagationLogs.length === 0 && <li style={{ color: '#8b949e', listStyle: 'none' }}>* Click the Target Child to see order *</li>}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_bom_objects')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Browser Object Model (BOM) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 3: BROWSER OBJECT MODEL (BOM) ════════════════ */}
      {activeTab === 'js_bom_objects' && (
        <Section eyebrow="Syllabus 03" title="The Browser Object Model (BOM)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>The <strong>Browser Object Model (BOM)</strong> represents the browser window interface. Unlike the DOM, which manages the webpage content, the BOM controls external components like navigation history, monitor dimensions, URLs, and device info.</p>

            <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>BOM Object</th>
                    <th style={{ padding: '0.7rem 1rem', textAlign: 'left' }}>Description & Common Methods</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>window</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Global top-level scope container. <br /><code style={{ fontSize: '0.82rem' }}>window.innerWidth / innerHeight</code>, <code style={{ fontSize: '0.82rem' }}>window.open()</code>, <code style={{ fontSize: '0.82rem' }}>window.resizeTo()</code>.</td>
                  </tr>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>navigator</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Contains device/browser profile configurations.<br /><code style={{ fontSize: '0.82rem' }}>navigator.userAgent</code> (OS/browser type), <code style={{ fontSize: '0.82rem' }}>navigator.language</code>.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>location</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Manages document URL properties. Redirects browser paths.<br /><code style={{ fontSize: '0.82rem' }}>location.href</code>, <code style={{ fontSize: '0.82rem' }}>location.reload()</code>.</td>
                  </tr>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>screen</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Describes monitor hardware specifications.<br /><code style={{ fontSize: '0.82rem' }}>screen.width</code>, <code style={{ fontSize: '0.82rem' }}>screen.height</code>.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.7rem 1rem', fontWeight: 700 }}>history</td>
                    <td style={{ padding: '0.7rem 1rem' }}>Controls current browser session navigation stacks.<br /><code style={{ fontSize: '0.82rem' }}>history.back()</code>, <code style={{ fontSize: '0.82rem' }}>history.forward()</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>AI Agent Relevance</h3>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1.2rem', borderRadius: 12, margin: '1rem 0', color: '#1e3a8a' }}>
              <strong>🤖 AI Agent Note:</strong> Modern AI browser agents (like the ones executing this codebase!) heavily rely on BOM configurations like <code>navigator.userAgent</code> to identify environments, and <code>location.href</code> to guide browser traversal pipelines!
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>BOM API Examples</h3>
            <CB code={`// Redirect window
function redirectToGoogle() {
  location.href = "https://www.google.com";
}

// Open new window
let win = window.open("https://example.com", "Name", "width=400,height=300");
win.resizeTo(500, 500); // Resizes the popup window

// Go back in history
function goBack() {
  history.back();
}`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_playground')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Live Coding Lab <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: LIVE CODING PLAYGROUND ════════════════ */}
      {activeTab === 'js_playground' && (
        <Section key="js_playground" id="js_playground" eyebrow="Playground" title="JavaScript Live Coding Lab">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Write your own JavaScript code in the editor on the left and see console logs in the output terminal on the right. Experiment with loops, functions, variables, and math operators!</p>
            <JSLiveEditor dayKey="general" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── DAY 9 QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d9" id="quiz_d9" eyebrow="Day 9 • Assessment" title="Day 9 Quiz: Events & Browser Storage">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which method is used to register an event handler on a DOM element?', opts: ['registerEvent()', 'attachListener()', 'addEventListener()', 'on()'], ans: 2 },
              { q: 'What is event delegation?', opts: ['Telling someone else to do the code', 'Attaching a single listener to a parent element to handle events on its children', 'Removing all listeners', 'None of the above'], ans: 1 },
              { q: 'Which local storage method is used to store data?', opts: ['localStorage.save()', 'localStorage.store()', 'localStorage.setItem()', 'localStorage.put()'], ans: 2 },
              { q: 'What data type can LocalStorage store?', opts: ['Objects only', 'Arrays only', 'Strings only', 'Booleans only'], ans: 2 },
              { q: 'Which function converts a JavaScript object into a JSON string?', opts: ['JSON.parse()', 'JSON.stringify()', 'JSON.toString()', 'JSON.objectify()'], ans: 1 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#ca8a04" />
            ))}
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 5: ASSIGNMENT ════════════════ */}
      {activeTab === 'assignment' && (
        <Section eyebrow="Homework" title="Day 9 Assignment: Events & Storage">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📝 Tasks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { no: 1, task: 'Create a button that changes the background color of the page to a random color when clicked.' },
                { no: 2, task: 'Build a text input field. When the user types inside it, display the number of characters typed live.' },
                { no: 3, task: 'Save a user\'s theme preference ("dark" or "light") to LocalStorage when they toggle a theme button, and retrieve it on reload.' },
                { no: 4, task: 'Explain the difference between JSON.stringify() and JSON.parse() with simple code examples.' },
                { no: 5, task: 'Build an interactive panel that displays "Welcome back, [Name]" if a name is saved in LocalStorage, otherwise shows a form to enter and save it.' },
                { no: 6, task: 'Create a simple todo list where tasks are saved in LocalStorage so they remain when the user refreshes the page.' }
              ].map(t => (
                <div key={t.no} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <span style={{ background: '#ca8a04', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{t.no}</span>
                  <span style={{ fontSize: '0.92rem', color: '#334155' }}>{t.task}</span>
                </div>
              ))}
            </div>

            <textarea
              value={assignVal}
              onChange={e => setAssignVal(e.target.value)}
              disabled={submitted}
              placeholder="Paste your code and answers here..."
              style={{ width: '100%', height: '200px', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', fontSize: '0.9rem' }}
            />

            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted || !assignVal.trim()}
              style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {submitted ? 'Submitted ✅' : 'Submit Assignment'}
            </button>

            {submitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '1rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> Assignment submitted successfully!
              </div>
            )}
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}

