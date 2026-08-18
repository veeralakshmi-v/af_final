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
  { id: 'q1', q: 'Which method returns a single element that matches the specified CSS selector?', options: ['document.getElementsByClassName()', 'document.querySelectorAll()', 'document.querySelector()', 'document.getElementById()'], ans: 2 },
  { id: 'q2', q: 'What is the correct way to add a CSS class named "highlight" to a DOM element variable named "el"?', options: ['el.className = "highlight";', 'el.classList.add("highlight");', 'el.setAttribute("class", "highlight");', 'Both A and B are correct'], ans: 3 },
  { id: 'q3', q: 'Which property allows you to read or set the HTML content inside a DOM element?', options: ['textContent', 'innerText', 'innerHTML', 'nodeValue'], ans: 2 },
  { id: 'q4', q: 'Given a parent element node, how do you access its immediate array-like list of child elements?', options: ['parent.childNodes', 'parent.children', 'parent.firstChild', 'parent.nextSibling'], ans: 1 },
  { id: 'q5', q: 'Which DOM method is used to remove a child element from the tree?', options: ['document.removeElement()', 'parent.removeChild(child)', 'child.delete()', 'document.deleteChild()'], ans: 1 }
];

export default function CoreJSDay8({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Interactive selectors states
  const [selectorDemoText, setSelectorDemoText] = useState("Change me using selectors!");
  const [selectorDemoStyle, setSelectorDemoStyle] = useState({ color: '#1e293b', fontSize: '1.2rem', fontWeight: 'bold' });

  // Class manipulation states
  const [classStateActive, setClassStateActive] = useState(false);

  // Traversal visualization state
  const [selectedTraversedNode, setSelectedTraversedNode] = useState('b');

  // DOM Programs active selection and interactive states
  const [activeProgTab, setActiveProgTab] = useState(1);
  const [prog1Color, setProg1Color] = useState({ id: 'inherit', class: 'inherit', query: 'inherit' });
  const [prog2Text, setProg2Text] = useState("Original Text");
  const [prog2Size, setProg2Size] = useState("16px");
  const [prog3Items, setProg3Items] = useState([]);
  const [prog4Visible, setProg4Visible] = useState(true);
  const [prog5Src, setProg5Src] = useState("https://via.placeholder.com/120");
  const [prog5Style, setProg5Style] = useState({ border: '3px solid purple', borderRadius: '8px', marginTop: '10px', width: '120px' });
  const [prog5Output, setProg5Output] = useState("");
  const [prog6Highlight, setProg6Highlight] = useState(false);
  const [prog7Text, setProg7Text] = useState("");
  const [prog8Output, setProg8Output] = useState("");

  // DOM builder interactive states
  const [domItems, setDomItems] = useState([
    { id: 1, text: "Initial Paragraph Element", color: "#3b82f6" },
  ]);
  const [newDomText, setNewDomText] = useState("");
  const [newDomColor, setNewDomColor] = useState("#ca8a04");

  // Playground state
  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`// 1. Select the preview body
var container = document.createElement("div");
container.style.padding = "20px";
container.style.background = "#eff6ff";
container.style.border = "2px dashed #3b82f6";
container.style.borderRadius = "8px";

// 2. Create child header
var header = document.createElement("h3");
header.textContent = "Created Live via JS DOM!";
header.style.color = "#1e40af";
container.appendChild(header);

// 3. Append to body
document.body.appendChild(container);
console.log("Appended new container to body!");`);
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
    onNavigate('core_js_day8', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // DOM builder handlers
  const addDomElement = () => {
    const txt = newDomText.trim();
    if (txt === "") return;
    setDomItems(prev => [...prev, { id: Date.now(), text: txt, color: newDomColor }]);
    setNewDomText("");
  };

  const removeDomElement = (id) => {
    setDomItems(prev => prev.filter(item => item.id !== id));
  };

  const executePlaygroundCode = () => {
    setConsoleOutput('');
    setRunTrigger(prev => prev + 1);
    if (editorCode.includes('<html') || editorCode.includes('<div') || editorCode.includes('<style>') || editorCode.includes('document.')) {
      setPlaygroundMode('preview');
    } else {
      setPlaygroundMode('console');
    }
  };

  const loadPresetSnippet = (name) => {
    if (name === 'selectors') {
      setEditorCode(`// DOM Selectors Demo
var el = document.getElementById("demo-header");
if (!el) {
  // Let's create it for preview purposes
  el = document.createElement("h2");
  el.id = "demo-header";
  el.textContent = "Select Me!";
  document.body.appendChild(el);
}

// Modify content
el.innerHTML = "<em>Content Changed!</em>";
el.style.color = "#ca8a04";
console.log("Modified demo-header content and color.");`);
    } else if (name === 'manipulation') {
      setEditorCode(`// Create, append and remove elements
var btn = document.createElement("button");
btn.textContent = "Click Me";
btn.style.padding = "10px 20px";
btn.style.backgroundColor = "#ca8a04";
btn.style.color = "white";
btn.style.border = "none";
btn.style.borderRadius = "4px";

// Append to body
document.body.appendChild(btn);
console.log("Appended button to preview.");

// Set attribute
btn.setAttribute("id", "myJsBtn");
console.log("Button ID set to:", btn.getAttribute("id"));`);
    } else if (name === 'traversal') {
      setEditorCode(`// DOM Traversal Demo
var list = document.createElement("ul");
list.id = "myList";
for (var i = 1; i <= 3; i++) {
  var item = document.createElement("li");
  item.textContent = "Item " + i;
  list.appendChild(item);
}
document.body.appendChild(list);

// Traverse
var parent = list.parentNode;
var children = list.children;
console.log("Parent Node Tag:", parent.nodeName);
console.log("List children count:", children.length);
console.log("First child text:", list.firstChild.textContent);`);
    } else if (name === 'classes') {
      setEditorCode(`// Class manipulation demo
var box = document.createElement("div");
box.style.width = "100px";
box.style.height = "100px";
box.style.border = "1px solid #000";
document.body.appendChild(box);

// add, remove, toggle classList
box.classList.add("my-style-class");
console.log("Has class? ", box.classList.contains("my-style-class"));

box.classList.toggle("another-class");
console.log("Class list:", box.className);`);
    } else if (name === 'builder') {
      setEditorCode(`// Live Interactive DOM Tree Builder Script
function createCard(title, text) {
  var card = document.createElement("div");
  card.style.border = "1px solid #cbd5e1";
  card.style.borderRadius = "8px";
  card.style.padding = "1rem";
  card.style.margin = "10px 0";
  card.style.background = "#fff";
  
  var header = document.createElement("h4");
  header.textContent = title;
  header.style.margin = "0 0 8px 0";
  header.style.color = "#ca8a04";
  
  var p = document.createElement("p");
  p.textContent = text;
  p.style.margin = 0;
  p.style.fontSize = "0.9rem";
  p.style.color = "#475569";
  
  card.appendChild(header);
  card.appendChild(p);
  document.body.appendChild(card);
}

createCard("Card Title", "This card was built dynamically by constructing nodes!");`);
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

      {/* ── TAB 1: INTRO ─────────────────── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 8 • Document Object Model" title="Introduction to DOM">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              The <strong>Document Object Model (DOM)</strong> is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>The DOM Tree Structure</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              When an HTML page is loaded, the browser creates a tree-like model of the page called a **DOM Tree**. In this tree, every HTML tag is an <strong>Element Node</strong>, and the text inside tags represents <strong>Text Nodes</strong>.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              {/* Document Root */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: '#475569', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600 }}>document</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Root Node</span>
              </div>
              
              {/* HTML Root */}
              <div style={{ borderLeft: '2px solid #cbd5e1', marginLeft: '1rem', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ background: '#ca8a04', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600 }}>&lt;html&gt;</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Root Element Node</span>
                </div>
                
                {/* Head Node */}
                <div style={{ borderLeft: '2px solid #cbd5e1', marginLeft: '1rem', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ background: '#eab308', color: '#854d0e', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600 }}>&lt;head&gt;</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Element Node</span>
                  </div>
                  
                  {/* Title Node */}
                  <div style={{ borderLeft: '2px solid #cbd5e1', marginLeft: '1rem', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ background: '#fef08a', color: '#854d0e', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600 }}>&lt;title&gt;</span>
                      <span style={{ color: '#94a3b8' }}>&rarr;</span>
                      <span style={{ background: '#fff', color: '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', border: '1px solid #e2e8f0' }}>"My Page"</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Text Node</span>
                    </div>
                  </div>
                </div>

                {/* Body Node */}
                <div style={{ borderLeft: '2px solid #cbd5e1', marginLeft: '1rem', paddingLeft: '1.5rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ background: '#eab308', color: '#854d0e', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600 }}>&lt;body&gt;</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Element Node</span>
                  </div>
                  
                  {/* H1 Node */}
                  <div style={{ borderLeft: '2px solid #cbd5e1', marginLeft: '1rem', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ background: '#fef08a', color: '#854d0e', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600 }}>&lt;h1&gt;</span>
                      <span style={{ color: '#94a3b8' }}>&rarr;</span>
                      <span style={{ background: '#fff', color: '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', border: '1px solid #e2e8f0' }}>"Header Text"</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Text Node</span>
                    </div>
                  </div>

                  {/* Paragraph Node */}
                  <div style={{ borderLeft: '2px solid #cbd5e1', marginLeft: '1rem', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ background: '#fef08a', color: '#854d0e', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600 }}>&lt;p&gt;</span>
                      <span style={{ color: '#94a3b8' }}>&rarr;</span>
                      <span style={{ background: '#fff', color: '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', border: '1px solid #e2e8f0' }}>"Paragraph content"</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Text Node</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('selectors')}>
              Next: DOM Selectors →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: SELECTORS ──────────────── */}
      {activeTab === 'selectors' && (
        <Section key="selectors" eyebrow="Day 8 • Selectors" title="Accessing &amp; Changing Content">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>1. Accessing DOM Elements</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Use these standard methods to locate tags/elements in the page:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { name: 'document.getElementById("id")', desc: 'Returns the unique element matching the ID.' },
                { name: 'document.getElementsByClassName("class")', desc: 'Returns an HTMLCollection of all matching elements.' },
                { name: 'document.querySelector("selector")', desc: 'Returns the first element matching a CSS selector.' },
                { name: 'document.querySelectorAll("selector")', desc: 'Returns a static NodeList of all matching elements.' },
              ].map(sel => (
                <div key={sel.name} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', minWidth: 0, display: 'flex', flexDirection: 'column', justifyBetween: 'stretch' }}>
                  <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '0.25rem', fontFamily: 'monospace', fontSize: '0.82rem', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{sel.name}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>{sel.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>2. Changing Element Content</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Once selected, you can edit element text or HTML markup using properties:
            </p>
            <ul style={{ color: '#475569', lineHeight: 1.8, paddingLeft: '1.2rem', marginBottom: '1.5rem' }}>
              <li><strong>innerHTML:</strong> Sets or returns the HTML content (tags are parsed).</li>
              <li><strong>textContent:</strong> Sets or returns the raw text content (tags are treated as plain text).</li>
              <li><strong>innerText:</strong> Returns or sets only the visible text content (similar to textContent, but respects styling).</li>
            </ul>

            {/* Interactive Selectors Demo */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <div>
                <h4 style={{ color: '#1e40af', marginBottom: '0.8rem', marginTop: 0 }}>🎯 Interactive Content Setter</h4>
                <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
                  <span style={selectorDemoStyle}>{selectorDemoText}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button onClick={() => {
                    setSelectorDemoText("Bold content updated!");
                    setSelectorDemoStyle({ color: '#ca8a04', fontSize: '1.3rem', fontWeight: 'bold' });
                  }} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Change textContent</button>
                  
                  <button onClick={() => {
                    setSelectorDemoText("Red Alert Style!");
                    setSelectorDemoStyle({ color: '#ef4444', fontSize: '1.4rem', fontWeight: 900, textDecoration: 'underline' });
                  }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Set Red Style</button>
                  
                  <button onClick={() => {
                    setSelectorDemoText("Reset Default Text");
                    setSelectorDemoStyle({ color: '#1e293b', fontSize: '1.2rem', fontWeight: 'bold' });
                  }} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Reset</button>
                </div>
              </div>
              <div>
                <h4 style={{ color: '#1e293b', marginBottom: '0.8rem', marginTop: 0 }}>💻 Widget JavaScript:</h4>
                <div style={{ background: '#0f172a', padding: '0.8rem 1rem', borderRadius: '8px', overflowX: 'auto' }}>
                  <SyntaxHighlighter code={`// 1. Change textContent
function changeText() {
  var el = document.querySelector("#demo-span");
  el.textContent = "Bold content updated!";
  el.style.color = "#ca8a04";
  el.style.fontSize = "1.3rem";
}

// 2. Set Red Style
function setRedStyle() {
  var el = document.querySelector("#demo-span");
  el.textContent = "Red Alert Style!";
  el.style.color = "#ef4444";
  el.style.textDecoration = "underline";
}

// 3. Reset
function resetStyle() {
  var el = document.querySelector("#demo-span");
  el.textContent = "Reset Default Text";
  el.style.color = "#1e293b";
  el.style.textDecoration = "none";
}`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'intro')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('manipulation')}>Next: DOM Manipulation →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: MANIPULATION ───────────── */}
      {activeTab === 'manipulation' && (
        <Section key="manipulation" eyebrow="Day 8 • Manipulation" title="DOM Node Manipulation">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>1. Creating &amp; Appending Elements</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Build new elements dynamically using <code>document.createElement()</code> and place them inside the document tree using <code>appendChild()</code>.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`// Create a new paragraph element
var p = document.createElement("p");
p.textContent = "New element added dynamically!";

// Append to a parent container
document.getElementById("myContainer").appendChild(p);`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>2. Managing Attributes</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Set, inspect, or remove HTML tag attributes using DOM object methods:
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var link = document.querySelector("a");

// Change link destination
link.setAttribute("href", "https://google.com");

// Read link destination
console.log(link.getAttribute("href"));

// Remove link title
link.removeAttribute("title");`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'selectors')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('traversal')}>Next: Traversing DOM →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: TRAVERSAL ──────────────── */}
      {activeTab === 'traversal' && (
        <Section key="traversal" eyebrow="Day 8 • Traversal" title="Traversing the DOM Tree">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.7 }}>
              DOM Traversal is the act of moving from one element to another related element (parent, child, or sibling) using properties built into JavaScript.
            </p>

            {/* Insight Box: Node vs Element */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1.2rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#92400e', marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={18} /> Crucial Concept: Node vs. Element Traversal
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                Standard **Node Traversal** properties include text nodes (whitespace, line breaks) and comments. **Element Traversal** properties bypass text/comment nodes and interact strictly with HTML tags.
              </p>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ca8a04', textAlign: 'left' }}>
                    <th style={{ padding: '0.4rem', color: '#854d0e' }}>Relation</th>
                    <th style={{ padding: '0.4rem', color: '#854d0e' }}>Node Traversal (Any Node)</th>
                    <th style={{ padding: '0.4rem', color: '#854d0e' }}>Element Traversal (Strictly HTML Tags)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #fef08a' }}>
                    <td style={{ padding: '0.4rem', fontWeight: 600 }}>Parent</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>parentNode</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>parentElement</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #fef08a' }}>
                    <td style={{ padding: '0.4rem', fontWeight: 600 }}>Children List</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>childNodes</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>children</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #fef08a' }}>
                    <td style={{ padding: '0.4rem', fontWeight: 600 }}>First Child</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>firstChild</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>firstElementChild</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #fef08a' }}>
                    <td style={{ padding: '0.4rem', fontWeight: 600 }}>Last Child</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>lastChild</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>lastElementChild</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #fef08a' }}>
                    <td style={{ padding: '0.4rem', fontWeight: 600 }}>Next Sibling</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>nextSibling</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>nextElementSibling</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #fef08a' }}>
                    <td style={{ padding: '0.4rem', fontWeight: 600 }}>Previous Sibling</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>previousSibling</td>
                    <td style={{ padding: '0.4rem', fontFamily: 'monospace' }}>previousElementSibling</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Detail Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e293b', marginTop: 0, marginBottom: '0.5rem' }}>1. Parent Traversal</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  To travel upward to the containing node, use <code>parentElement</code>:
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`let btn = document.querySelector("#myBtn");\nlet card = btn.parentElement; // moves 1 level up\ncard.style.borderColor = "red";`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.2rem', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e293b', marginTop: 0, marginBottom: '0.5rem' }}>2. Child Traversal</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Access array-like lists of tags with <code>children</code> or individual extreme children:
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`let list = document.querySelector("#myList");\nlet first = list.firstElementChild; // first LI tag\nlet last = list.lastElementChild; // last LI tag`} />
                </div>
              </div>
            </div>

            {/* Interactive Traversal Visualizer */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#1e40af', marginTop: 0, marginBottom: '0.8rem' }}>🌳 Interactive Family Traversal Inspector</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.2rem' }}>
                Click on any child list item below to select it. Watch the visualizer highlight the **Parent Element** (blue outline), the **Selected Element** (gold border), and its **Sibling Elements** (red borders) using pure DOM traversing rules!
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                <div>
                  <h5 style={{ margin: '0 0 0.8rem 0', color: '#1e40af' }}>Select Node:</h5>
                  <div style={{
                    padding: '1rem', background: '#fff', borderRadius: '8px', border: selectedTraversedNode ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                    boxShadow: selectedTraversedNode ? '0 4px 12px rgba(59,130,246,0.1)' : 'none'
                  }}>
                    <strong style={{ display: 'block', marginBottom: '0.8rem', color: '#1e40af' }}>#list-parent (Container)</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        { key: 'a', name: 'Child Item A' },
                        { key: 'b', name: 'Child Item B' },
                        { key: 'c', name: 'Child Item C' },
                      ].map(item => {
                        let outline = '1px solid #cbd5e1'; let bg = '#fff';
                        if (selectedTraversedNode === item.key) { outline = '2px solid #ca8a04'; bg = '#fffbeb'; }
                        else if ((selectedTraversedNode === 'b' && (item.key === 'a' || item.key === 'c')) || (selectedTraversedNode === 'a' && item.key === 'b') || (selectedTraversedNode === 'c' && item.key === 'b')) {
                          outline = '2px dashed #ef4444'; bg = '#fef2f2';
                        }
                        return (
                          <button key={item.key} onClick={() => setSelectedTraversedNode(item.key)}
                            style={{ padding: '0.5rem', borderRadius: '6px', border: outline, background: bg, textAlign: 'left', cursor: 'pointer', fontWeight: selectedTraversedNode === item.key ? 700 : 500 }}>
                            {item.name} {selectedTraversedNode === item.key && '🎯 (Selected)'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 style={{ margin: '0 0 0.8rem 0', color: '#1e40af' }}>Traversed Node Metadata:</h5>
                  <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '8px', fontSize: '0.88rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ color: '#64748b', fontWeight: 600 }}>Selected Element:</span>{' '}
                      <code style={{ background: '#fffbeb', color: '#b45309', padding: '2px 6px', borderRadius: '4px', border: '1px solid #fde68a' }}>
                        Child Item {selectedTraversedNode.toUpperCase()}
                      </code>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ color: '#64748b', fontWeight: 600 }}>.parentElement:</span>{' '}
                      <code style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                        #list-parent Container
                      </code>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ color: '#64748b', fontWeight: 600 }}>.previousElementSibling:</span>{' '}
                      {selectedTraversedNode === 'a' ? (
                        <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>null (none)</span>
                      ) : (
                        <code style={{ background: '#fef2f2', color: '#b91c1c', padding: '2px 6px', borderRadius: '4px', border: '1px solid #fecaca' }}>
                          Child Item {selectedTraversedNode === 'b' ? 'A' : 'B'}
                        </code>
                      )}
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontWeight: 600 }}>.nextElementSibling:</span>{' '}
                      {selectedTraversedNode === 'c' ? (
                        <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>null (none)</span>
                      ) : (
                        <code style={{ background: '#fef2f2', color: '#b91c1c', padding: '2px 6px', borderRadius: '4px', border: '1px solid #fecaca' }}>
                          Child Item {selectedTraversedNode === 'a' ? 'B' : 'C'}
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'manipulation')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('classes')}>Next: Class List Manipulation →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: CLASSES ────────────────── */}
      {activeTab === 'classes' && (
        <Section key="classes" eyebrow="Day 8 • Classes" title="ClassList Manipulation">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Manipulating CSS classes on elements is the best way to dynamic-style a page. Access classes using the <code>classList</code> object.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { name: 'classList.add("className")', desc: 'Adds a class to the element.' },
                { name: 'classList.remove("className")', desc: 'Removes a class from the element.' },
                { name: 'classList.toggle("className")', desc: 'Adds class if missing, removes it if present.' },
                { name: 'classList.contains("className")', desc: 'Checks if element has a class. Returns boolean.' },
              ].map(m => (
                <div key={m.name} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '0.25rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>{m.desc}</div>
                </div>
              ))}
            </div>

            {/* Interactive Toggle Demo */}
            <div style={{ background: '#f3f4f6', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                width: '120px', height: '120px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem',
                background: classStateActive ? '#3b82f6' : '#fff', color: classStateActive ? '#fff' : '#475569', border: classStateActive ? 'none' : '2px dashed #94a3b8',
                boxShadow: classStateActive ? '0 10px 15px rgba(59,130,246,0.3)' : 'none', transition: 'all 0.3s ease'
              }}>
                {classStateActive ? "ACTIVE CLASS" : "NO CLASS"}
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Try Toggling ClassList:</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>See the styles transform dynamically by clicking below.</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setClassStateActive(true)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>classList.add()</button>
                  <button onClick={() => setClassStateActive(false)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>classList.remove()</button>
                  <button onClick={() => setClassStateActive(prev => !prev)} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>classList.toggle()</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'traversal')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('dom_programs')}>Next: DOM Programs →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5.5: DOM PROGRAMS ───────────── */}
      {activeTab === 'dom_programs' && (
        <Section key="dom_programs" eyebrow="Day 8 • Programs" title="Day 16 - Interactive DOM Programs">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Select any of the 8 DOM Programs from **Day 16** to interact with the live widget, inspect the HTML structure, and see the JavaScript script executed under the hood.
            </p>

            {/* Program selectors */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              {[
                { id: 1, label: "1. Selecting Elements" },
                { id: 2, label: "2. Content & Style" },
                { id: 3, label: "3. Creating & Adding" },
                { id: 4, label: "4. Removing Elements" },
                { id: 5, label: "5. Modifying Attributes" },
                { id: 6, label: "6. Class Manipulation" },
                { id: 7, label: "7. DOM Events" },
                { id: 8, label: "8. DOM Traversing" },
              ].map(p => (
                <button key={p.id} onClick={() => setActiveProgTab(p.id)}
                  style={{
                    padding: '0.45rem 0.9rem', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                    background: activeProgTab === p.id ? '#ca8a04' : '#f1f5f9', color: activeProgTab === p.id ? '#fff' : '#475569',
                    transition: 'all 0.2s ease'
                  }}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Split Screen Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Left Panel: Live Demo */}
              <div style={{ background: '#fff', border: '2px solid #ca8a04', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <h4 style={{ color: '#ca8a04', marginTop: 0, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>🖥️ Live Widget Demo</h4>

                {/* Program 1 */}
                {activeProgTab === 1 && (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                      <button onClick={() => setProg1Color(prev => ({ ...prev, id: 'red' }))} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Select by ID</button>
                      <button onClick={() => setProg1Color(prev => ({ ...prev, class: 'blue' }))} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Select by Class</button>
                      <button onClick={() => setProg1Color(prev => ({ ...prev, query: 'green' }))} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Select by Query</button>
                      <button onClick={() => setProg1Color({ id: 'inherit', class: 'inherit', query: 'inherit' })} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Reset</button>
                    </div>
                    <p style={{ color: prog1Color.id, fontFamily: 'monospace', margin: '0 0 0.5rem 0' }}>This is ID element</p>
                    <p style={{ color: prog1Color.class, fontFamily: 'monospace', margin: '0 0 0.5rem 0' }}>This is CLASS element</p>
                    <p style={{ color: prog1Color.query, fontFamily: 'monospace', margin: 0 }}>This is QUERY element</p>
                  </div>
                )}

                {/* Program 2 */}
                {activeProgTab === 2 && (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                      <button onClick={() => setProg2Text("Text Updated!")} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Change Text</button>
                      <button onClick={() => setProg2Size("24px")} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Change Style</button>
                      <button onClick={() => { setProg2Text("Original Text"); setProg2Size("16px"); }} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Reset</button>
                    </div>
                    <p style={{ fontSize: prog2Size, color: '#1e293b', transition: 'all 0.2s ease', margin: 0 }}>{prog2Text}</p>
                  </div>
                )}

                {/* Program 3 */}
                {activeProgTab === 3 && (
                  <div>
                    <button onClick={() => setProg3Items(prev => [...prev, "New Element Added!"])} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem', marginBottom: '1rem' }}>
                      Add New Element
                    </button>
                    <button onClick={() => setProg3Items([])} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem', marginLeft: '0.5rem', marginBottom: '1rem' }}>Clear</button>
                    <div style={{ border: '1px dashed #cbd5e1', padding: '0.5rem', borderRadius: '6px', background: '#f8fafc', minHeight: '60px' }}>
                      {prog3Items.length === 0 ? (
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.82rem' }}>No dynamic child elements added yet.</p>
                      ) : (
                        prog3Items.map((val, idx) => <p key={idx} style={{ color: '#ca8a04', margin: '0 0 4px 0', fontSize: '0.85rem' }}>{val}</p>)
                      )}
                    </div>
                  </div>
                )}

                {/* Program 4 */}
                {activeProgTab === 4 && (
                  <div>
                    <button onClick={() => setProg4Visible(false)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem', marginBottom: '1rem' }}>
                      Remove Element
                    </button>
                    <button onClick={() => setProg4Visible(true)} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem', marginLeft: '0.5rem', marginBottom: '1rem' }}>Restore</button>
                    <div style={{ minHeight: '40px' }}>
                      {prog4Visible ? (
                        <p style={{ color: '#1e293b', background: '#fee2e2', padding: '8px', borderRadius: '4px', border: '1px solid #fecaca', margin: 0 }}>Remove this text</p>
                      ) : (
                        <p style={{ color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>Element node removed from the tree.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Program 5 */}
                {activeProgTab === 5 && (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <button onClick={() => { setProg5Src("https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&auto=format&fit=crop"); setProg5Output(""); }} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Change Image</button>
                      <button onClick={() => setProg5Output("SRC: " + prog5Src)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Get SRC</button>
                      <button onClick={() => { setProg5Style({}); setProg5Output("Style attribute removed"); }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Remove Style</button>
                      <button onClick={() => { setProg5Src("https://via.placeholder.com/120"); setProg5Style({ border: '3px solid purple', borderRadius: '8px', marginTop: '10px', width: '120px' }); setProg5Output(""); }} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Reset</button>
                    </div>
                    <img src={prog5Src} alt="Demo Attribute" style={prog5Style} />
                    {prog5Output && <p style={{ marginTop: '0.8rem', background: '#f1f5f9', padding: '6px', borderRadius: '4px', fontSize: '0.85rem', fontFamily: 'monospace' }}>{prog5Output}</p>}
                  </div>
                )}

                {/* Program 6 */}
                {activeProgTab === 6 && (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <button onClick={() => setProg6Highlight(true)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Add Class</button>
                      <button onClick={() => setProg6Highlight(false)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Remove Class</button>
                      <button onClick={() => setProg6Highlight(prev => !prev)} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Toggle Class</button>
                    </div>
                    <p style={{
                      padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', transition: 'all 0.2s ease', margin: 0,
                      background: prog6Highlight ? '#fffbeb' : '#fff', color: prog6Highlight ? '#854d0e' : '#475569',
                      borderLeft: prog6Highlight ? '4px solid #ca8a04' : '1px solid #cbd5e1', fontWeight: prog6Highlight ? 'bold' : 'normal'
                    }}>
                      Class manipulation example
                    </p>
                  </div>
                )}

                {/* Program 7 */}
                {activeProgTab === 7 && (
                  <div>
                    <button onClick={() => setProg7Text("Button Clicked!")} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                      Click Me
                    </button>
                    <button onClick={() => setProg7Text("")} style={{ background: '#64748b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: 'bold' }}>Reset</button>
                    <p style={{ minHeight: '20px', marginTop: '1rem', color: '#ca8a04', fontWeight: 'bold', fontSize: '1.1rem' }}>{prog7Text}</p>
                  </div>
                )}

                {/* Program 8 */}
                {activeProgTab === 8 && (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <button onClick={() => setProg8Output("Parent Node: DIV")} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Show Parent</button>
                      <button onClick={() => setProg8Output("Total Children: 2")} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Show Children</button>
                      <button onClick={() => setProg8Output("")} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem' }}>Clear</button>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>#parentBox Container</span>
                      <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem' }}>child 1</p>
                      <p style={{ margin: 0, fontSize: '0.85rem' }}>Child 2</p>
                    </div>
                    {prog8Output && <p style={{ color: '#ca8a04', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{prog8Output}</p>}
                  </div>
                )}

              </div>

              {/* Right Panel: Source Code */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>💻 Slide HTML &amp; JavaScript</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', overflowY: 'auto', maxHeight: '360px' }}>
                  
                  {activeProgTab === 1 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button onclick="selectById()">Select by ID</button>
<button onclick="selectByClass()">Select by Class</button>
<button onclick="selectByQuery()">Select by Query</button>

<p id="demo1">This is ID element</p>
<p class="demoClass">This is CLASS element</p>
<p class="demoQuery">This is QUERY element</p>

/* JavaScript */
function selectById() {
  document.getElementById("demo1").style.color = "red";
}
function selectByClass() {
  document.getElementsByClassName("demoClass")[0].style.color = "blue";
}
function selectByQuery() {
  document.querySelector(".demoQuery").style.color = "green";
}`} />
                  )}

                  {activeProgTab === 2 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button onclick="changeText()">Change Text</button>
<button onclick="changeStyle()">Change Style</button>

<p id="demo2">Original Text</p>

/* JavaScript */
function changeText() {
  document.getElementById("demo2").textContent = "Text Updated!";
}
function changeStyle() {
  document.getElementById("demo2").style.fontSize = "24px";
}`} />
                  )}

                  {activeProgTab === 3 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button onclick="addNewElement()">Add New Element</button>
<div id="demo3"></div>

/* JavaScript */
function addNewElement() {
  let p = document.createElement("p");
  p.textContent = "New Element Added!";
  document.getElementById("demo3").appendChild(p);
}`} />
                  )}

                  {activeProgTab === 4 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button onclick="removeElement()">Remove Element</button>
<p id="demo4">Remove this text</p>

/* JavaScript */
function removeElement() {
  let el = document.getElementById("demo4");
  el.remove();
}`} />
                  )}

                  {activeProgTab === 5 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button onclick="changeImage()">Change Image</button>
<button onclick="showImagesSrc()">Get SRC</button>
<button onclick="removeImageBorder()">Remove Style</button>

<img id="demoImage" src="placeholder.com" style="border:3px solid purple;">
<p id="output"></p>

/* JavaScript */
function changeImage() {
  document.getElementById("demoImage")
    .setAttribute("src", "newImage.png");
}
function showImagesSrc() {
  let src = document.getElementById("demoImage").getAttribute("src");
  document.getElementById("output").textContent = "SRC: " + src;
}
function removeImageBorder() {
  document.getElementById("demoImage").removeAttribute("style");
  document.getElementById("output").textContent = "Style removed";
}`} />
                  )}

                  {activeProgTab === 6 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button onclick="addClass()">Add Class</button>
<button onclick="removeClass()">Remove Class</button>
<button onclick="toggleClass()">Toggle Class</button>

<p id="demo6">Class manipulation example</p>

/* JavaScript */
function addClass() {
  document.getElementById("demo6").classList.add("highlight");
}
function removeClass() {
  document.getElementById("demo6").classList.remove("highlight");
}
function toggleClass() {
  document.getElementById("demo6").classList.toggle("highlight");
}`} />
                  )}

                  {activeProgTab === 7 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button id="eventBtn">Click Me</button>
<p id="demo7"></p>

/* JavaScript */
document.getElementById("eventBtn")
  .addEventListener("click", function() {
    document.getElementById("demo7").textContent = "Button Clicked!";
  });`} />
                  )}

                  {activeProgTab === 8 && (
                    <SyntaxHighlighter code={`<!-- HTML -->
<button onclick="showParent()">Show Parent</button>
<button onclick="showChildren()">Show Children</button>

<div id="parentBox">
  <p>child 1</p>
  <p>Child 2</p>
</div>
<p id="demo8"></p>

/* JavaScript */
function showParent() {
  let parent = document.getElementById("parentBox").parentNode;
  document.getElementById("demo8").textContent = "Parent Node: " + parent.nodeName;
}
function showChildren() {
  let children = document.getElementById("parentBox").children.length;
  document.getElementById("demo8").textContent = "Total Children: " + children;
}`} />
                  )}

                </div>
              </div>

            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'classes')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('dom_builder')}>Next: DOM Builder Project →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: DOM BUILDER ───────────────── */}
      {activeTab === 'dom_builder' && (
        <Section key="dom_builder" eyebrow="Day 8 • Mini Project" title="Mini Project: Interactive DOM Builder">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This builder allows you to dynamically <strong>create element nodes</strong>, configure text values and backgrounds, append them to a list container, and remove them using the parent node tree interface.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' }}>
              {/* App View */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #ca8a04', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '1.2rem', fontSize: '1.2rem', borderBottom: '2px solid #ca8a04', paddingBottom: '0.5rem' }}>🏗️ Live DOM Element Tree Builder</h4>
                
                {/* Element builder form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <input type="text" placeholder="Paragraph Text (e.g. Dynamic Text)" value={newDomText} onChange={e => setNewDomText(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Select Theme Color:</label>
                    <select value={newDomColor} onChange={e => setNewDomColor(e.target.value)} style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                      <option value="#3b82f6">Blue Theme</option>
                      <option value="#10b981">Green Theme</option>
                      <option value="#ca8a04">Yellow Theme</option>
                      <option value="#ef4444">Red Theme</option>
                    </select>
                  </div>
                  <button onClick={addDomElement} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.55rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>
                    document.createElement() &amp; appendChild()
                  </button>
                </div>

                {/* Rendered Container */}
                <h5 style={{ margin: '1rem 0 0.5rem 0', color: '#1e293b' }}>Rendered Parent Container:</h5>
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '1rem', background: '#f8fafc', minHeight: '120px' }}>
                  {domItems.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', margin: '2rem 0' }}>Container is empty.</p>
                  ) : (
                    domItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#fff', borderLeft: `4px solid ${item.color}`, borderRadius: '4px', marginBottom: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', fontSize: '0.88rem', alignItems: 'center' }}>
                        <span>{item.text}</span>
                        <button onClick={() => removeDomElement(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 'bold' }}>
                          removeChild()
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Code View */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>DOM Manipulation Script:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '380px' }}>
                  <SyntaxHighlighter code={`// 1. Adding Element
function addElement(text, themeColor) {
  // Create element node
  var p = document.createElement("p");
  
  // Set content & styles
  p.textContent = text;
  p.style.borderLeft = "4px solid " + themeColor;
  p.style.padding = "8px";
  
  // Append to container
  var container = document.getElementById("container");
  container.appendChild(p);
}

// 2. Removing Element
function removeElement(childElement) {
  var container = document.getElementById("container");
  // Remove node child
  container.removeChild(childElement);
}`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'dom_programs')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 7: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Select a preset to load sample DOM scripts and execute them live in the workspace:
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['selectors',     '🎯 Select & Modify'],
                ['manipulation',  '🏗️ Create & Attribute'],
                ['traversal',     '📚 Traverse Tree'],
                ['classes',       '🎨 classList Toggle'],
                ['builder',       '🧩 Card Builder Script'],
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
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'dom_builder')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 8 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 8: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 8 • Assessment" title="Day 8 Assessment — DOM Tree">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Mistakes with DOM
            </h3>
            {[
              { mistake: 'Attempting to call array methods directly on NodeList/HTMLCollection', code: `// querySelectorAll returns a NodeList (not an Array):\nvar elements = document.querySelectorAll(".item");\n\n// ❌ Throws TypeError in older engines:\n// elements.push(newDiv);\n\n// ✅ Iterate correctly using loop or forEach:\nelements.forEach(el => console.log(el.textContent));` },
              { mistake: 'Forgetting to append element node after creation', code: `// ❌ Creates node but it stays detached from the web page:\nvar p = document.createElement("p");\np.textContent = "Detached paragraph";\n\n// ✅ Must append to body or parent:\ndocument.body.appendChild(p);` },
              { mistake: 'Confusing querySelector and querySelectorAll', code: `// querySelector returns the FIRST match ONLY:\nvar item = document.querySelector(".btn"); // single element\n\n// querySelectorAll returns ALL matches:\nvar items = document.querySelectorAll(".btn"); // NodeList` },
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
              <FileText size={20} /> Day 8 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Write a script that changes the text content of a header element to "Hello World".</li>
              <li>Create a program that queries all paragraphs with the class `info` and changes their font weight to bold.</li>
              <li>Create a new list item (`li`) containing "New Item", and append it to an existing unordered list (`ul`).</li>
              <li>Write a function that toggles the class `dark-mode` on the document body element.</li>
              <li>Extend the **DOM Element Tree Builder** to allow setting attributes (like an `id` or `title`) on created elements.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day8', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
