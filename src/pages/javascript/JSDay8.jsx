import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, PenTool, Layers, Zap, FolderTree, Edit3, Settings } from 'lucide-react';
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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|Set|Map|Element|Node|Document)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
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
export default function JSDay8({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_module8', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // ── Tab 1: Node Visualizer State ──
  const [activeNodeHighlight, setActiveNodeHighlight] = useState('none');

  // ── Tab 2: Traversing State ──
  const [traverseFocus, setTraverseFocus] = useState('none');

  // ── Tab 3: Content & style state ──
  const [cardText, setCardText] = useState('Hello World');
  const [cardHtml, setCardHtml] = useState('<b>Strong Text</b>');
  const [cardBg, setCardBg] = useState('#ffffff');
  const [cardSize, setCardSize] = useState('16');
  const [cardClasses, setCardClasses] = useState({ highlight: false, shadow: false, bordered: false });

  // ── Tab 4: Dynamic DOM builders ──
  const [dynamicItems, setDynamicItems] = useState(['Coffee ☕', 'Tea 🍵']);
  const [newItemVal, setNewItemVal] = useState('');

  const appendItem = () => {
    if (newItemVal.trim()) {
      setDynamicItems(prev => [...prev, newItemVal.trim()]);
      setNewItemVal('');
    }
  };
  const prependItem = () => {
    if (newItemVal.trim()) {
      setDynamicItems(prev => [newItemVal.trim(), ...prev]);
      setNewItemVal('');
    }
  };
  const removeLastItem = () => setDynamicItems(prev => prev.slice(0, -1));
  const replaceItem = (idx) => {
    setDynamicItems(prev => prev.map((item, i) => i === idx ? 'Water 💧' : item));
  };

  // ── Tab 5: Day 16 PDF Unified Program States ──
  const [demoColorState, setDemoColorState] = useState('black');
  const [demoTextVal, setDemoTextVal] = useState('Original Text');
  const [demoFontSize, setDemoFontSize] = useState('16px');
  const [demoElements, setDemoElements] = useState([]);
  const [demoImgSrc, setDemoImgSrc] = useState('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&auto=format&fit=crop');
  const [demoImgStyle, setDemoImgStyle] = useState({ border: '3px solid purple', borderRadius: '10px' });
  const [demoClasses, setDemoClasses] = useState({ highlight: false });
  const [demoEventClicked, setDemoEventClicked] = useState(false);
  const [demoParentText, setDemoParentText] = useState('');
  const [demoChildrenText, setDemoChildrenText] = useState('');

  // ── Form Validation State ──
  const [valEmail, setValEmail] = useState('');
  const [valPassword, setValPassword] = useState('');
  const [valError, setValError] = useState('');
  const [valSuccess, setValSuccess] = useState(false);

  const handleValidateSubmit = (e) => {
    e.preventDefault();
    if (!valEmail.includes('@')) {
      setValError('Please enter a valid email address.');
      setValSuccess(false);
    } else if (valPassword.length < 6) {
      setValError('Password must be at least 6 characters long.');
      setValSuccess(false);
    } else {
      setValError('');
      setValSuccess(true);
    }
  };

  // ── Assignment ──
  const [submitted, setSubmitted] = useState(false);
  const [assignVal, setAssignVal] = useState('');

  return (
    <AnimatePresence mode="wait">

      {/* ════════════════ TAB 1: DOM INTRO & NODES ════════════════ */}
      {activeTab === 'js_dom_intro' && (
        <Section eyebrow="Syllabus 01" title="What is the Document Object Model (DOM)?">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>The <strong>Document Object Model (DOM)</strong> is a programming interface for HTML documents. It represents a web page as a structured tree of objects, allowing JavaScript to interact with, traverse, and dynamically change the page content, design, and structure.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>The DOM Tree Structure</h3>
            <p>When a browser loads a web page, it parses the HTML and generates a tree-like hierarchy of nodes. At the absolute root sits the <code>document</code> object.</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', margin: '1rem 0' }}>
              <strong style={{ color: '#0f172a' }}>Interactive Tree Node Visualizer:</strong>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Click on any button below to see where the node type lies in the DOM tree:</p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                {['document', 'element', 'attribute', 'text', 'comment'].map(type => (
                  <button key={type} onClick={() => setActiveNodeHighlight(type)}
                    style={{
                      background: activeNodeHighlight === type ? '#ca8a04' : '#1e293b',
                      color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', textTransform: 'capitalize', fontSize: '0.85rem'
                    }}>
                    {type} Node
                  </button>
                ))}
                <button onClick={() => setActiveNodeHighlight('none')} style={{ background: '#e2e8f0', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>Clear Highlight</button>
              </div>

              {/* DOM Tree Diagram */}
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1.2rem', color: '#e1e4e8', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.5' }}>
                <div style={{ color: activeNodeHighlight === 'document' ? '#fbbf24' : '#e1e4e8', fontWeight: activeNodeHighlight === 'document' ? 'bold' : 'normal' }}>
                  [Root Node: document]
                </div>
                <div> &nbsp;└── &lt;html&gt; <span style={{ color: activeNodeHighlight === 'element' ? '#38bdf8' : '#8b949e' }}>(Element Node)</span></div>
                <div> &nbsp; &nbsp; &nbsp;├── &lt;head&gt; <span style={{ color: activeNodeHighlight === 'element' ? '#38bdf8' : '#8b949e' }}>(Element Node)</span></div>
                <div> &nbsp; &nbsp; &nbsp;│ &nbsp; &nbsp;└── &lt;title&gt;</div>
                <div> &nbsp; &nbsp; &nbsp;│ &nbsp; &nbsp; &nbsp; &nbsp;└── "My Website" <span style={{ color: activeNodeHighlight === 'text' ? '#4ade80' : '#8b949e' }}>(Text Node)</span></div>
                <div> &nbsp; &nbsp; &nbsp;└── &lt;body&gt; <span style={{ color: activeNodeHighlight === 'element' ? '#38bdf8' : '#8b949e' }}>(Element Node)</span></div>
                <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ├── &lt;h1&gt;</div>
                <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; │ &nbsp; &nbsp;└── "Welcome Header" <span style={{ color: activeNodeHighlight === 'text' ? '#4ade80' : '#8b949e' }}>(Text Node)</span></div>
                <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ├── &lt;a <span style={{ color: activeNodeHighlight === 'attribute' ? '#f43f5e' : '#fb923c', fontWeight: activeNodeHighlight === 'attribute' ? 'bold' : 'normal' }}>href="index.html"</span>&gt; <span style={{ color: activeNodeHighlight === 'attribute' ? '#f43f5e' : '#8b949e' }}>(Attribute Node)</span></div>
                <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; │ &nbsp; &nbsp;└── "Home Link" <span style={{ color: activeNodeHighlight === 'text' ? '#4ade80' : '#8b949e' }}>(Text Node)</span></div>
                <div style={{ color: activeNodeHighlight === 'comment' ? '#a78bfa' : '#8b949e', fontWeight: activeNodeHighlight === 'comment' ? 'bold' : 'normal' }}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └── &lt;!-- page footer section --&gt; (Comment Node)</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>DOM Node Classifications</h3>
            <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><strong>Document Node</strong>: Represents the root webpage itself. Accessible via the <code>document</code> global variable, it serves as the gatekeeper for all DOM APIs.</li>
              <li><strong>Element Node</strong>: Represents concrete HTML tags (e.g. <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;button&gt;</code>).</li>
              <li><strong>Attribute Node</strong>: Represents attributes specified inside element tags (e.g. <code>id</code>, <code>class</code>, <code>src</code>, <code>href</code>).</li>
              <li><strong>Text Node</strong>: Represents the raw text content nested inside an element.</li>
              <li><strong>Comment Node</strong>: Represents HTML comments (<code>&lt;!-- comment --&gt;</code>) which remain inside the DOM tree although hidden visually.</li>
            </ol>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_dom_selectors')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Selectors & Traversal <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 2: SELECTORS & TRAVERSAL ════════════════ */}
      {activeTab === 'js_dom_selectors' && (
        <Section eyebrow="Syllabus 02" title="Selecting & Traversing Elements">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>To interact with an element, you must select it first. JavaScript provides direct lookup methods by ID, Class Name, Tag, or flexible CSS selectors.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Element Selection Methods</h3>
            <CB code={`// 1. Get by ID (Returns single element or null)
const banner = document.getElementById("main-banner");

// 2. Get by Class Name (Returns live HTMLCollection)
const items = document.getElementsByClassName("list-item");

// 3. Get by HTML Tag (Returns live HTMLCollection)
const paragraphs = document.getElementsByTagName("p");

// 4. Query Selector (Returns first matching element using CSS selectors)
const firstBtn = document.querySelector(".btn-action");

// 5. Query Selector All (Returns static NodeList of all matching elements)
const allCards = document.querySelectorAll("div.card-item");`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Traversing the DOM Tree</h3>
            <p>Once you hold a reference to an element node, you can navigate up, down, or sideways to sibling elements using tree traversing properties:</p>
            <CB code={`let childEl = document.getElementById("target-child");

// Navigate UP to parent
let parent = childEl.parentNode; 

// Navigate DOWN to children
let children = parent.children; // HTMLCollection of element children only
let first = parent.firstElementChild; // First element child
let last = parent.lastElementChild; // Last element child

// Navigate SIDEWAYS to siblings
let nextSibling = childEl.nextElementSibling; // Next sibling element
let prevSibling = childEl.previousElementSibling; // Previous sibling element`} />

            {/* Interactive Selector & Traversal Demo */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>🎮 Live Playground: Selector & Traversal</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                <button onClick={() => setTraverseFocus('parent')} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>Get Parent Box</button>
                <button onClick={() => setTraverseFocus('child1')} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>Get First Child</button>
                <button onClick={() => setTraverseFocus('child2')} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>Get Middle Child</button>
                <button onClick={() => setTraverseFocus('child3')} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>Get Last Child</button>
                <button onClick={() => setTraverseFocus('none')} style={{ background: '#e2e8f0', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>Reset</button>
              </div>

              {/* Rendered DOM Mockup */}
              <div style={{ border: traverseFocus === 'parent' ? '3px solid #fbbf24' : '1px solid #cbd5e1', borderRadius: 10, padding: '1rem', background: '#fff' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>&lt;div id="parentBox"&gt;</span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div style={{
                    padding: '0.5rem', borderRadius: 6,
                    border: traverseFocus === 'child1' ? '3px solid #ef4444' : '1px solid #e2e8f0',
                    background: traverseFocus === 'child1' ? '#fee2e2' : '#f8fafc'
                  }}>
                    <span style={{ fontWeight: 600 }}>Child Item 1 (First Child)</span>
                  </div>
                  
                  <div style={{
                    padding: '0.5rem', borderRadius: 6,
                    border: traverseFocus === 'child2' ? '3px solid #3b82f6' : '1px solid #e2e8f0',
                    background: traverseFocus === 'child2' ? '#dbeafe' : '#f8fafc'
                  }}>
                    <span style={{ fontWeight: 600 }}>Child Item 2 (Middle Sibling)</span>
                  </div>
                  
                  <div style={{
                    padding: '0.5rem', borderRadius: 6,
                    border: traverseFocus === 'child3' ? '3px solid #10b981' : '1px solid #e2e8f0',
                    background: traverseFocus === 'child3' ? '#dcfce7' : '#f8fafc'
                  }}>
                    <span style={{ fontWeight: 600 }}>Child Item 3 (Last Child)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_dom_content')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Content & Class Manipulation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 3: CONTENT & CLASS MANIPULATION ════════════════ */}
      {activeTab === 'js_dom_content' && (
        <Section eyebrow="Syllabus 03" title="Changing Content, Styles & Class Lists">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>JavaScript allows you to update visible text, insert styled HTML structures, toggle CSS stylesheets classes, and write custom inline styling directly.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. Modifying Text & HTML Content</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>textContent</strong>: Gets or sets the raw, plain text of a node and all its descendants. Escapes HTML symbols naturally.</li>
              <li><strong>innerHTML</strong>: Gets or sets structural HTML nodes. Dangerous to use with direct raw user input (XSS threat).</li>
              <li><strong>innerText</strong>: Respects visual layouts and styling (e.g. ignores hidden text), but triggers performance layout reflows.</li>
            </ul>
            <CB code={`let box = document.getElementById("demo-box");
box.textContent = "Updates with clean text only";
box.innerHTML = "<strong>Injected bold element!</strong>";`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. ClassList manipulation</h3>
            <p>Instead of manually parsing class strings, elements have a <code>classList</code> object containing helper methods:</p>
            <CB code={`let div = document.getElementById("my-card");

div.classList.add("shadow-lg"); // Adds class
div.classList.remove("bordered"); // Removes class
div.classList.toggle("active"); // Adds if missing, removes if present
console.log(div.classList.contains("active")); // Checks presence (true/false)`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>3. Inline Style Manipulation</h3>
            <p>Direct inline styles are manipulated using the element's <code>style</code> property (camelCased):</p>
            <CB code={`let heading = document.getElementById("main-title");
heading.style.color = "blue";
heading.style.fontSize = "24px";
heading.style.marginTop = "1.5rem";`} />

            {/* Interactive Styles & Class List Playground */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>🎮 Live Demo: Content & Styles Controller</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>1. Update textContent:</label>
                <input value={cardText} onChange={e => setCardText(e.target.value)}
                  style={{ display: 'block', width: '100%', padding: '0.4rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: 8, marginBottom: '0.8rem' }} />

                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>2. Update innerHTML:</label>
                <input value={cardHtml} onChange={e => setCardHtml(e.target.value)}
                  style={{ display: 'block', width: '100%', padding: '0.4rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: 8, marginBottom: '0.8rem' }} />

                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>3. Modify Inline Styles:</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <input type="color" value={cardBg} onChange={e => setCardBg(e.target.value)} style={{ border: 'none', width: '40px', height: '35px', cursor: 'pointer' }} />
                  <input type="number" value={cardSize} onChange={e => setCardSize(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: 8, width: '60px' }} />
                  <span style={{ alignSelf: 'center', fontSize: '0.85rem' }}>px Font Size</span>
                </div>

                <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>4. Toggle classList Classes:</label>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                  {['highlight', 'shadow', 'bordered'].map(cls => (
                    <button key={cls} onClick={() => setCardClasses(prev => ({ ...prev, [cls]: !prev[cls] }))}
                      style={{
                        border: '1px solid #cbd5e1', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer',
                        background: cardClasses[cls] ? '#ca8a04' : '#fff', color: cardClasses[cls] ? 'white' : '#1e293b'
                      }}>
                      .{cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Preview Box */}
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>Live Node Preview:</span>
                <div
                  className={`
                    ${cardClasses.highlight ? 'highlight-class-demo' : ''} 
                    ${cardClasses.shadow ? 'shadow-class-demo' : ''} 
                    ${cardClasses.bordered ? 'bordered-class-demo' : ''}
                  `}
                  style={{
                    backgroundColor: cardBg,
                    fontSize: `${cardSize}px`,
                    padding: '1.2rem',
                    borderRadius: 12,
                    border: cardClasses.bordered ? '2px dashed #ca8a04' : '1px solid #e2e8f0',
                    transition: 'all 0.2s',
                    boxShadow: cardClasses.shadow ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
                    background: cardClasses.highlight ? '#fef08a' : cardBg,
                    marginTop: '0.5rem',
                    minHeight: '120px'
                  }}
                >
                  <p style={{ margin: '0 0 0.5rem 0' }}>{cardText}</p>
                  <div dangerouslySetInnerHTML={{ __html: cardHtml }} />
                </div>

                {/* CSS styles defined for demo classes */}
                <style dangerouslySetInnerHTML={{ __html: `
                  .highlight-class-demo { border: 2px solid #ca8a04 !important; }
                  .shadow-class-demo { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1) !important; }
                  .bordered-class-demo { border-width: 4px !important; }
                ` }} />
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_dom_create')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Creating & Modifying Nodes <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 4: CREATING & MODIFYING DOM ════════════════ */}
      {activeTab === 'js_dom_create' && (
        <Section eyebrow="Syllabus 04" title="Creating, Inserting & Replacing Elements">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>You can construct entire HTML elements from scratch in memory, configure their attributes, and insert them anywhere in the live DOM tree document.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. Creating elements</h3>
            <p>Create nodes in the virtual document using <code>createElement</code>:</p>
            <CB code={`const newParagraph = document.createElement("p");
newParagraph.textContent = "Hello, I am a new element!";`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. Inserting Elements into the Tree</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>appendChild(node)</strong>: Adds the node as the last child of the specified parent element.</li>
              <li><strong>insertBefore(newNode, referenceNode)</strong>: Inserts the node right before the reference child node.</li>
            </ul>
            <CB code={`let parentDiv = document.getElementById("parent-container");

// Insert at the end
parentDiv.appendChild(newParagraph);

// Insert before the first item
let firstChild = parentDiv.firstElementChild;
parentDiv.insertBefore(newParagraph, firstChild);`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>3. Replacing & Removing Nodes</h3>
            <CB code={`let oldItem = document.getElementById("obsolete-item");

// Replace child
let replacement = document.createElement("span");
replacement.textContent = "Updated Content";
oldItem.parentNode.replaceChild(replacement, oldItem);

// Remove child
parentDiv.removeChild(replacement);

// Modern Element-level Remove (Self-delete)
replacement.remove();`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>4. Manipulating Element Attributes</h3>
            <p>Control attributes using get, set, or remove APIs:</p>
            <CB code={`let image = document.querySelector("img");
image.setAttribute("src", "logo.png"); // Sets attribute
let source = image.getAttribute("src"); // Gets attribute (returns "logo.png")
image.removeAttribute("alt"); // Deletes attribute`} />

            {/* Interactive Dynamic DOM Builder */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>🎮 Live Playground: Dynamic DOM Builder</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <input placeholder="Enter tag content..." value={newItemVal} onChange={e => setNewItemVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && appendItem()}
                  style={{ padding: '0.4rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '150px' }} />
                <button onClick={prependItem} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Prepend Child</button>
                <button onClick={appendItem} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Append Child</button>
                <button onClick={removeLastItem} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Remove Last</button>
              </div>

              {/* Rendered list */}
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 10, padding: '1rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#64748b' }}>Parent Container (&lt;div id="container"&gt;):</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {dynamicItems.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0.5rem', background: '#f1f5f9', borderRadius: 6 }}>
                      <span>{item}</span>
                      <button onClick={() => replaceItem(idx)}
                        style={{ background: '#3b82f6', color: 'white', border: 'none', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: 4, cursor: 'pointer' }}>
                        Replace with Water 💧
                      </button>
                    </li>
                  ))}
                  {dynamicItems.length === 0 && (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No children elements exist.</span>
                  )}
                </ul>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_codedemo8')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Live Coding Demo <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 5: LIVE CODING DEMO ════════════════ */}
      {activeTab === 'js_codedemo8' && (
        <Section eyebrow="Day 16 Program" title="DOM Programming Interactive Workspace">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>This sandbox compiles all functions demonstrated inside the <strong>Day 16 - DOM Program PDF</strong>. Interact with the panels to observe live DOM manipulation.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
              
              {/* 1. SELECTING ELEMENTS */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>1. Selecting Elements</h4>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem' }}>
                  <button onClick={() => setDemoColorState('red')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Select by ID (Red)</button>
                  <button onClick={() => setDemoColorState('blue')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Select by Class (Blue)</button>
                  <button onClick={() => setDemoColorState('green')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Select by Query (Green)</button>
                </div>
                <p style={{ color: demoColorState === 'red' ? 'red' : 'black', margin: '0.2rem 0', fontWeight: 600 }}>This is ID element</p>
                <p style={{ color: demoColorState === 'blue' ? 'blue' : 'black', margin: '0.2rem 0', fontWeight: 600 }}>This is CLASS element</p>
                <p style={{ color: demoColorState === 'green' ? 'green' : 'black', margin: '0.2rem 0', fontWeight: 600 }}>This is QUERY element</p>
              </div>

              {/* 2. CONTENT & STYLES */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>2. Changing Content & Style</h4>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem' }}>
                  <button onClick={() => setDemoTextVal('Text Updated!')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Change Text</button>
                  <button onClick={() => setDemoFontSize('24px')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Change Style</button>
                  <button onClick={() => { setDemoTextVal('Original Text'); setDemoFontSize('16px'); }} style={{ background: '#cbd5e1', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Reset</button>
                </div>
                <p style={{ fontSize: demoFontSize, margin: 0, fontWeight: 700 }}>{demoTextVal}</p>
              </div>

              {/* 3. CREATING ELEMENTS */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>3. Creating & Adding Elements</h4>
                <button onClick={() => setDemoElements(prev => [...prev, 'New Element Added!'])}
                  style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Add New Element
                </button>
                <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                  {demoElements.map((el, i) => <p key={i} style={{ margin: '0.2rem 0', color: '#64748b' }}>{el}</p>)}
                </div>
              </div>

              {/* 4. MODIFYING ATTRIBUTES */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>4. Modifying Attributes</h4>
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setDemoImgSrc('https://images.unsplash.com/photo-1557683316-973673baf926?w=150&auto=format&fit=crop')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Change Image</button>
                  <button onClick={() => alert('SRC: ' + demoImgSrc)} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Get SRC</button>
                  <button onClick={() => setDemoImgStyle({})} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Remove Style</button>
                </div>
                <img src={demoImgSrc} style={{ width: '80px', height: '50px', objectFit: 'cover', ...demoImgStyle }} alt="demo" />
              </div>

              {/* 5. CLASSLIST ADD/REMOVE/TOGGLE */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>5. classList Manipulation</h4>
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.8rem' }}>
                  <button onClick={() => setDemoClasses({ highlight: true })} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Add Class</button>
                  <button onClick={() => setDemoClasses({ highlight: false })} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Remove Class</button>
                  <button onClick={() => setDemoClasses(prev => ({ highlight: !prev.highlight }))} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Toggle Class</button>
                </div>
                <p style={{
                  padding: '0.4rem', borderRadius: 6, border: '1px solid #e2e8f0',
                  background: demoClasses.highlight ? '#fef08a' : 'transparent',
                  color: demoClasses.highlight ? '#a16207' : 'black',
                  fontWeight: demoClasses.highlight ? 'bold' : 'normal'
                }}>
                  Class manipulation paragraph
                </p>
              </div>

              {/* 6. EVENT LISTENERS */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>6. Event Listeners</h4>
                <button onClick={() => setDemoEventClicked(true)} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
                  Click Me
                </button>
                <p style={{ margin: '0.5rem 0 0 0', fontWeight: 600, color: demoEventClicked ? '#16a34a' : 'black' }}>
                  {demoEventClicked ? 'Button Clicked! ✅' : 'Waiting for click...'}
                </p>
              </div>

              {/* 7. DOM TRAVERSAL */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', background: '#fff', gridColumn: 'span 1' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 800 }}>7. DOM Traversing</h4>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem' }}>
                  <button onClick={() => setDemoParentText('Parent Node: DIV')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Show Parent</button>
                  <button onClick={() => setDemoChildrenText('Total Children: 2')} style={{ background: '#e2e8f0', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}>Show Children</button>
                </div>
                <div id="parentBoxDemo" style={{ display: 'none' }}>
                  <p>child</p>
                  <p>Child</p>
                </div>
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>{demoParentText} {demoChildrenText}</p>
              </div>
            </div>

            {/* Source Code */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>📋 JavaScript Code Reference</h3>
            <CB code={`// 1. Selecting Elements
function selectById() {
  document.getElementById("demo1").style.color = "red";
}
function selectByClass() {
  document.getElementsByClassName("demoClass")[0].style.color = "blue";
}
function selectByQuery() {
  document.querySelector(".demoQuery").style.color = "green";
}

// 2. Changing Content & Style
function changeText() {
  document.getElementById("demo2").textContent = "Text Updated!";
}
function changeStyle() {
  document.getElementById("demo2").style.fontSize = "24px";
}

// 3. Creating & Adding Elements
function addNewElement() {
  let p = document.createElement("p");
  p.textContent = "New Element Added!";
  document.getElementById("demo3").appendChild(p);
}

// 4. Modifying Attributes
function changeImage() {
  document.getElementById("demoImage").setAttribute("src", "image2.jpg");
}
function showImageSrc() {
  let src = document.getElementById("demoImage").getAttribute("src");
  alert("SRC: " + src);
}
function removeImageBorder() {
  document.getElementById("demoImage").removeAttribute("style");
}

// 5. Class List Manipulation
function addClass() {
  document.getElementById("demo6").classList.add("highlight");
}
function removeClass() {
  document.getElementById("demo6").classList.remove("highlight");
}
function toggleClass() {
  document.getElementById("demo6").classList.toggle("highlight");
}

// 6. Event Listeners
document.getElementById("eventBtn").addEventListener("click", function() {
  document.getElementById("demo7").textContent = "Button Clicked!";
});

// 7. DOM Traversing
function showParent() {
  let parent = document.getElementById("parentBox").parentNode;
  document.getElementById("demo8").textContent = "Parent Node: " + parent.nodeName;
}
function showChildren() {
  let childrenCount = document.getElementById("parentBox").children.length;
  document.getElementById("demo8").textContent = "Total Children: " + childrenCount;
}`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_form_validation')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Form Validation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: FORM VALIDATION ════════════ */}
      {activeTab === 'js_form_validation' && (
        <Section eyebrow="Syllabus 05" title="Form Validation using DOM">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Form validation is one of the most common uses of DOM manipulation. It prevents invalid data from being sent to the server by checking values client-side using JavaScript.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>How Form Validation Works</h3>
            <p>1. Listen for the form's <code>submit</code> event.<br />2. Use <code>event.preventDefault()</code> to stop the form from submitting automatically.<br />3. Read input field values using their <code>.value</code> property.<br />4. Check values against validation criteria.<br />5. Display error messages by changing the text content of error elements.</p>

            <CB code={`let form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  let email = document.getElementById("email").value;
  let errorSpan = document.getElementById("error-msg");

  if (!email.includes("@")) {
    event.preventDefault(); // Stop form submission
    errorSpan.textContent = "Please enter a valid email!";
    errorSpan.style.color = "red";
  }
});`} />

            {/* Interactive Demo */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Demo: Interactive Form Validator</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', marginTop: '1rem', maxWidth: '400px' }}>
              <form onSubmit={handleValidateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>Email Address</label>
                  <input type="text" value={valEmail} onChange={e => setValEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>Password (min 6 chars)</label>
                  <input type="password" value={valPassword} onChange={e => setValPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, boxSizing: 'border-box' }} />
                </div>
                {valError && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>⚠️ {valError}</div>}
                {valSuccess && <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>✅ Validation Successful! Ready to submit.</div>}
                <button type="submit" style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.6rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', marginTop: '0.4rem' }}>Submit Form</button>
              </form>
            </div>

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

      {/* ── DAY 8 QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d8" id="quiz_d8" eyebrow="Day 8 • Assessment" title="Day 8 Quiz: DOM Manipulation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'What does DOM stand for?', opts: ['Data Object Model', 'Document Object Model', 'Digital Object Management', 'Document Orientation Mapping'], ans: 1 },
              { q: 'Which method selects the first element matching a CSS selector?', opts: ['getElementById()', 'getElementsByClassName()', 'querySelector()', 'querySelectorAll()'], ans: 2 },
              { q: 'Which property is used to change the text content inside an HTML element?', opts: ['textContent', 'innerHTML', 'innerText', 'All of these'], ans: 3 },
              { q: 'How do you create a new element in JavaScript?', opts: ['document.createElement()', 'document.newElement()', 'document.makeElement()', 'new Element()'], ans: 0 },
              { q: 'Which method prevents the default form submission action?', opts: ['event.stopPropagation()', 'event.preventDefault()', 'event.stop()', 'return false'], ans: 1 },
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

      {/* ════════════════ TAB 6: ASSIGNMENT ════════════════ */}
      {activeTab === 'assignment' && (
        <Section eyebrow="Homework" title="Day 8 Assignment: DOM Manipulation">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📝 Tasks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { no: 1, task: 'Write JavaScript code to select an element by its ID and change its background color to yellow when a button is clicked.' },
                { no: 2, task: 'Create a list of 5 elements in HTML. Write a function to select all elements using document.querySelectorAll() and update their text content to upperCase using a forEach loop.' },
                { no: 3, task: 'Create an empty <div> container. Write a function to dynamically create a new <p> element, set its text content to "Dynamic Paragraph", set a class name, and append it to the div.' },
                { no: 4, task: 'Write a script that toggles the class "active" on an element every time it is clicked, using element.classList.toggle().' },
                { no: 5, task: 'Create an image element with a default placeholder source. Write a function that changes the source attribute of the image using setAttribute() and logs the new source using getAttribute().' },
                { no: 6, task: 'Create a button element. Use addEventListener("click", callback) to count the number of times it has been clicked and display the click count inside a paragraph element.' },
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
