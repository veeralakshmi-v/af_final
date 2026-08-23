import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Layers, Database, Sparkles, RefreshCw, Settings, 
  CheckCircle, Code, ArrowRight, Info, Play, Trash2, Cpu, 
  Laptop, Terminal, Copy, FileText, User as UserIcon, Plus, 
  AlertTriangle, Check, BookOpenCheck, HelpCircle, Sliders,
  GitBranch, Edit, Trash, Search, ArrowUpDown, Server, ListPlus
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

export default function ReactDay7({ activeTab, onNavigate }) {
  const handleContinue = (nextTabId) => {
    onNavigate('react_module7', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Widget 1: Interactive map() Visualizer ---
  const [mapInput, setMapInput] = useState("1, 2, 3, 4, 5");
  const [mapOperation, setMapOperation] = useState("square"); // square, double, upper
  
  const getMappedResults = () => {
    const arr = mapInput.split(',').map(x => x.trim()).filter(Boolean);
    if (mapOperation === "square") {
      return arr.map(x => {
        const num = Number(x);
        return isNaN(num) ? `${x}²` : num ** 2;
      });
    } else if (mapOperation === "double") {
      return arr.map(x => {
        const num = Number(x);
        return isNaN(num) ? `${x}${x}` : num * 2;
      });
    } else {
      return arr.map(x => x.toUpperCase());
    }
  };

  // --- Widget 2: CRUD Immutability heap allocator simulation ---
  const [heapItems, setHeapItems] = useState([
    { id: 101, text: "Buy milk" },
    { id: 102, text: "Finish task" }
  ]);
  const [heapLogs, setHeapLogs] = useState([]);
  const [typedHeapItem, setTypedHeapItem] = useState("");
  const [editingHeapId, setEditingHeapId] = useState(null);

  const addHeapItem = () => {
    if (!typedHeapItem.trim()) return;
    const newItem = { id: Date.now() % 1000, text: typedHeapItem.trim() };
    setHeapItems(prev => {
      const next = [...prev, newItem];
      setHeapLogs(prevLogs => [`[Allocation]: Created new array reference in memory Heap. Address: 0x${(Date.now() % 100000).toString(16).toUpperCase()} with items count ${next.length}.`, ...prevLogs].slice(0, 3));
      return next;
    });
    setTypedHeapItem("");
  };

  const deleteHeapItem = (id) => {
    setHeapItems(prev => {
      const next = prev.filter(x => x.id !== id);
      setHeapLogs(prevLogs => [`[Filter Output]: filter() executed. Created new array reference. Address: 0x${(Date.now() % 100000).toString(16).toUpperCase()} without item ID ${id}.`, ...prevLogs].slice(0, 3));
      return next;
    });
  };

  const editHeapItem = (id, newText) => {
    setHeapItems(prev => {
      const next = prev.map(item => item.id === id ? { ...item, text: newText } : item);
      setHeapLogs(prevLogs => [`[Map Update]: Mapped items array. Replaced reference pointer for object ID ${id} with modified text. Address updated.`, ...prevLogs].slice(0, 3));
      return next;
    });
    setEditingHeapId(null);
  };

  // --- Widget 3: Live CRUD To-Do App capstone (Pages 9, 10, 11) ---
  const [todos, setTodos] = useState([
    { id: 1, text: "Study Conditional Rendering" },
    { id: 2, text: "Take notes on useState" }
  ]);
  const [todoText, setTodoText] = useState("");
  const [todoSearch, setTodoSearch] = useState("");
  const [todoEditId, setTodoEditId] = useState(null);

  const handleAddTodo = () => {
    if (todoText.trim() === "") return;
    if (todoEditId) {
      setTodos(prev => prev.map(todo => todo.id === todoEditId ? { ...todo, text: todoText.trim() } : todo));
      setTodoEditId(null);
    } else {
      setTodos(prev => [...prev, { id: Date.now(), text: todoText.trim() }]);
    }
    setTodoText("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleStartEdit = (todo) => {
    setTodoText(todo.text);
    setTodoEditId(todo.id);
  };

  const handleSortTodos = () => {
    setTodos(prev => [...prev].sort((a, b) => a.text.localeCompare(b.text)));
  };

  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(todoSearch.toLowerCase())
  );

  // --- Quiz States ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  const quizQuestions = [
    {
      key: 'q1',
      question: 'Which array method is standard for rendering list elements in React?',
      options: [
        'array.forEach()',
        'array.map()',
        'array.push()',
        'array.reduce()'
      ],
      correct: 1,
      explanation: 'React uses array.map() because it returns a new array of JSX elements that can be embedded directly within JSX return statements.'
    },
    {
      key: 'q2',
      question: 'What is the correct way to add an item to an array state in React?',
      options: [
        'setItems(items.push(newItem))',
        'items.push(newItem); setItems(items);',
        'setItems([...items, newItem])',
        'setItems(items.concat([newItem]))' // wait concat is also immutable but spread is the one explicitly requested on slides
      ],
      correct: 2,
      explanation: 'Direct array mutations (like items.push) do not change the array pointer, causing React to skip re-renders. Spreading [...items, newItem] immutably allocates a new array reference.'
    },
    {
      key: 'q3',
      question: 'Which method should you use to delete an item from an array state by ID?',
      options: [
        'items.splice()',
        'items.pop()',
        'items.filter(item => item.id !== id)',
        'items.delete(id)'
      ],
      correct: 2,
      explanation: 'items.filter() returns a new array with all elements that pass the criteria, satisfying the immutability requirements of React state updates.'
    },
    {
      key: 'q4',
      question: 'Why do we use the spread operator when editing a nested object inside an array (e.g. { ...item, text: updatedText })?',
      options: [
        'To speed up compiler syntax lookups.',
        'To preserve the other properties of the object while replacing the specified field with a new value in a new object reference.',
        'To transform the object into an array structure.',
        'To enforce strict typescript validations.'
      ],
      correct: 1,
      explanation: 'Using the spread operator copies all existing properties of the object first, ensuring we only update the selected properties while keeping the remaining fields intact.'
    }
  ];

  const handleQuizAnswer = (qKey, optIdx) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [qKey]: optIdx }));
  };

  const getQuizScore = () => quizQuestions.filter(q => quizAnswers[q.key] === q.correct).length;

  return (
    <AnimatePresence mode="wait">
      
      {/* ── 1. LIST MAPPING ─────────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="intro_react" id="intro_react" eyebrow="Module 01 • Day 7" title="Rendering Lists using map()">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header banner with contrast fix */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>📋 List Rendering in React</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white', margin: 0 }}>
                In React, multiple elements are stored as arrays and dynamically rendered into DOM list structures using JavaScript's native <strong><code>map()</code></strong> loop method.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>Array Mapping Concept</h3>
            <p>
              The <code>map()</code> method iterates over each element in an array and returns a new array with the transformed items. In React, we map data values into JSX nodes:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>JavaScript Transform:</span>
                <CodeBlock title="map_squares.js" code={`var ints = [1, 2, 3, 4, 5];
var squares = ints.map(int => int ** 2);
console.log(squares); 
// [1, 4, 9, 16, 25]`} />
              </div>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>React Render Method:</span>
                <CodeBlock title="StudentList.jsx" code={`function StudentList() {
  const students = ["Ram", "Priya", "John", "Sara"];
  return (
    <ul>
      {students.map((name) => (
        <li>{name}</li>
      ))}
    </ul>
  );
}`} />
              </div>
            </div>

            {/* --- INTERACTIVE WIDGET: MAP TRANSFORM VISUALIZER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>⚡ Live Array Map Visualizer</h4>
            <p>Modify the values inside the array block, select a map transform method, and inspect how JavaScript translates items into a brand-new array mapping dynamically.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '6px' }}>Array Elements (comma separated):</label>
                <input 
                  type="text" 
                  value={mapInput}
                  onChange={(e) => setMapInput(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none' }}
                />

                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '6px' }}>Select Transformation Function:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className={`btn ${mapOperation === 'square' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMapOperation('square')} style={mapOperation === 'square' ? { background: '#6366f1', borderColor: '#6366f1' } : {}}>Square Numbers (x ** 2)</button>
                  <button className={`btn ${mapOperation === 'double' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMapOperation('double')} style={mapOperation === 'double' ? { background: '#6366f1', borderColor: '#6366f1' } : {}}>Double (x * 2)</button>
                  <button className={`btn ${mapOperation === 'upper' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMapOperation('upper')} style={mapOperation === 'upper' ? { background: '#6366f1', borderColor: '#6366f1' } : {}}>Capitalize strings</button>
                </div>
              </div>

              {/* Mapped results */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Returned mapped output:</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {getMappedResults().map((res, i) => (
                    <span key={i} style={{ padding: '6px 12px', background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
                      {res}
                    </span>
                  ))}
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

      {/* ── 2. ADD & DELETE OPERATIONS ────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="useState_hook" id="useState_hook" eyebrow="Module 02 • Day 7" title="Add & Delete Operations">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>1. Adding Items Immutably</h3>
            <p>
              To add data in React, we manage arrays inside state hooks. We gather user inputs and update the array state. Remember: **always update arrays immutably using the spread operator**.
            </p>

            <CodeBlock title="AddItemExample.jsx" code={`const [items, setItems] = useState([]);

function addItem(newItem) {
  // CORRECT: spreads items into a brand-new array container reference
  setItems([...items, newItem]);
}`} />

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginTop: '2.5rem', marginBottom: '0.8rem' }}>2. Deleting Items Immutably</h3>
            <p>
              To delete an item, we use the JavaScript <code>filter()</code> method. The filter callback parses each element and creates a brand-new array containing only the items that satisfy the filter condition (non-matched elements are discarded).
            </p>

            <CodeBlock title="DeleteItemExample.jsx" code={`function deleteItem(id) {
  // filter() creates a new array without the targeted item ID
  setItems(items.filter(item => item.id !== id));
}`} />

            {/* --- INTERACTIVE WIDGET: ADD & DELETE HEAP VISUALIZER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '3rem', marginBottom: '1rem' }}>🧠 Live Heap Memory & References Inspector</h4>
            <p>Add and delete items below. The visual allocator panel displays logs showing how React allocates new memory spaces and pointers instead of mutating variables in-place.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter item description..."
                    value={typedHeapItem}
                    onChange={(e) => setTypedHeapItem(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none' }}
                  />
                  <button className="btn btn-primary" onClick={addHeapItem} style={{ background: '#6366f1', borderColor: '#6366f1' }}><Plus size={16} /> Add</button>
                </div>

                {/* Rendered Items with filter buttons */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', minHeight: '120px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Live Items List:</span>
                  {heapItems.length === 0 ? (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>List is empty. Add items above.</span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {heapItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                          <span>{item.text} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>(ID: {item.id})</span></span>
                          <button onClick={() => deleteHeapItem(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Memory Heap Log Panel */}
              <div style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: 12, fontSize: '0.78rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Memory Heap Visualizer:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {heapLogs.length === 0 ? "Awaiting allocations..." : heapLogs.map((log, index) => (
                    <div key={index} style={{ borderBottom: '1px solid #1e293b', paddingBottom: '6px', color: log.startsWith('[Allocation') ? '#86efac' : '#38bdf8' }}>
                      {log}
                    </div>
                  ))}
                </div>
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

      {/* ── 3. EDIT ITEM OPERATIONS ─────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="multiple_states" id="multiple_states" eyebrow="Module 03 • Day 7" title="Edit Item Operations">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>Modifying Elements Inside Array State</h3>
            <p>
              To edit a specific item inside an array state, we map over the array. For each element, we check if the element's unique identifier matches the target ID.
            </p>
            <p>
              If they match, we return a <strong>new object reference containing the updated fields</strong> (copying unchanged fields via the spread operator). If they do not match, we return the item unchanged.
            </p>

            <CodeBlock title="EditItemExample.jsx" code={`function editItem(id, updatedText) {
  setItems(
    items.map(item =>
      // Check ID match: copy properties + update text OR return unchanged item
      item.id === id ? { ...item, text: updatedText } : item
    )
  );
}`} />

            {/* --- INTERACTIVE WIDGET: EDIT REFERENCE CHANGER --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>✏️ Interactive Object Pointer Swapping Demo</h4>
            <p>Click the Edit icon beside one of the items. Try changing its value and updating it. Review the memory heap logs to see how React replaces object pointers inside the array container.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              <div>
                {editingHeapId !== null ? (
                  <div style={{ background: 'white', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Edit Item Text (ID: {editingHeapId}):</label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input 
                        type="text" 
                        id="heap_edit_input" 
                        defaultValue={heapItems.find(x => x.id === editingHeapId)?.text || ""} 
                        style={{ flex: 1, padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                      />
                      <button 
                        className="btn btn-primary" 
                        onClick={() => {
                          const val = document.getElementById("heap_edit_input").value;
                          editHeapItem(editingHeapId, val);
                        }}
                        style={{ background: '#10b981', borderColor: '#10b981' }}
                      >
                        Update
                      </button>
                      <button className="btn btn-outline" onClick={() => setEditingHeapId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', minHeight: '120px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Items available:</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {heapItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                          <span>{item.text} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>(Address: {item.id === 101 ? "0xBC3" : item.id === 102 ? "0x78E" : `0x${item.id.toString(16).toUpperCase()}`})</span></span>
                          <button onClick={() => setEditingHeapId(item.id)} style={{ background: 'transparent', border: 'none', color: '#6366f1', cursor: 'pointer' }}><Edit size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Logs */}
              <div style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: 12, fontSize: '0.78rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Map Heap Logs:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {heapLogs.length === 0 ? "Awaiting updates..." : heapLogs.map((log, index) => (
                    <div key={index} style={{ borderBottom: '1px solid #1e293b', paddingBottom: '6px', color: '#a5d6ff' }}>
                      {log}
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

      {/* ── 4. SEARCH, FILTER & SORTING ─────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="object_state" id="object_state" eyebrow="Module 04 • Day 7" title="Search, Filter & Sorting">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>1. Search & Filtering</h3>
            <p>
              To filter search matches, we bind a text input value to a <code>search</code> state variable. We then create a derived array variable using the array's <code>filter()</code> method, checking if the item's text matches the search criteria (using case-insensitive matches).
            </p>

            <CodeBlock title="SearchFilterExample.jsx" code={`const [search, setSearch] = useState("");

const filtered = items.filter(item =>
  // Case insensitive match checking includes()
  item.text.toLowerCase().includes(search.toLowerCase())
);`} />

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginTop: '2.5rem', marginBottom: '0.8rem' }}>2. List Sorting</h3>
            <p>
              To sort elements, we duplicate the array state (preventing in-place mutation errors) and call the JavaScript <code>sort()</code> method, comparing strings using <code>localeCompare()</code>.
            </p>

            <CodeBlock title="SortListExample.jsx" code={`function sortItems() {
  // [...items] spreads elements first, creating a copy to safely sort
  const sorted = [...items].sort((a, b) =>
    a.text.localeCompare(b.text)
  );
  setItems(sorted);
}`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('nested_state')} style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. REACT TO-DO CRUD APP (Syllabus Capstone) ────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="nested_state" id="nested_state" eyebrow="Module 05 • Day 7" title="React To-Do CRUD App">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Header banner with contrast fix */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>💼 React To-Do Application</h3>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, lineHeight: 1.7, color: 'white', margin: 0 }}>
                This capstone project combines all list mapping, additions, filter deletions, map updates, search queries, and sorting algorithms into a single operational interface.
              </p>
            </div>

            {/* --- COMPLETE APPLICATION INTERACTIVE CLIENT --- */}
            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📱 Fully Functional CRUD Dashboard</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.75rem', borderRadius: 20 }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: 6 }}><ListPlus size={22} color="#6366f1" /> React To-Do App</h3>
                
                {/* Search Bar */}
                <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '6px 12px', marginBottom: '1rem', gap: '6px' }}>
                  <Search size={16} color="#94a3b8" />
                  <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    value={todoSearch}
                    onChange={(e) => setTodoSearch(e.target.value)}
                    style={{ border: 'none', width: '100%', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                {/* Task Input and buttons */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter todo item..." 
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <button className="btn btn-primary" onClick={handleAddTodo} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                    {todoEditId ? "Update" : "Add"}
                  </button>
                  <button className="btn btn-outline" onClick={handleSortTodos} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ArrowUpDown size={14} /> Sort
                  </button>
                </div>

                {/* To-Do List */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem', minHeight: '160px' }}>
                  {filteredTodos.length === 0 ? (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem', display: 'block', textAlign: 'center', marginTop: '2rem' }}>No matching tasks found</span>
                  ) : (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {filteredTodos.map(todo => (
                        <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem' }}>
                          <span>{todo.text}</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => handleStartEdit(todo)} style={{ background: 'transparent', border: 'none', color: '#6366f1', cursor: 'pointer' }}><Edit size={14} /></button>
                            <button onClick={() => handleDeleteTodo(todo.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash size={14} /></button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Data State visualizer */}
              <div style={{ background: '#0f172a', color: '#86efac', padding: '1.25rem', borderRadius: 12, fontFamily: 'monospace', fontSize: '0.82rem' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}><Server size={14} style={{ display: 'inline', marginRight: 4 }} /> Raw state.todos JSON:</span>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#a5d6ff', lineHeight: 1.4 }}>
                  {JSON.stringify(todos, null, 2)}
                </pre>
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
        <Section key="quiz" id="quiz" eyebrow="Knowledge Check" title="Day 7 Interactive Quiz">
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
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 7 Assignment: CRUD Operations">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Completion banner with fix for contrast */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem', color: 'white' }}>🎓 Day 7 Syllabus Completed!</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6, color: 'white', margin: 0 }}>
                Wonderful! You have fully mastered array mapping transforms, immutable list updates, filter deletions, map value overrides, and search/sorting operations. Complete your homework assignment.
              </p>
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>📋 Homework Assignments</h4>
            {[
              { num: 1, title: 'Interactive Guest Log App', icon: '📝', desc: 'Create a GuestBook component. Allow visitors to enter name and comment. Maintain guests as an array of objects. Add list rendering, options to remove comments, and sort comments alphabetically by author.', hint: 'Utilize [...guests, newGuest] and localeCompare() for sorting.' },
              { num: 2, title: 'Dynamic Product Stock Manager', icon: '🛒', desc: 'Build a store inventory card index. Users should be able to search items by name. Add buttons beside products to edit name, delete product cards, or increment stock counts.', hint: 'Use map() to increment quantity: p.id === id ? { ...p, stock: p.stock + 1 } : p.' },
              { num: 3, title: 'Color Palette CRUD Sandbox', desc: 'Build a palette designer where users can add custom HSL colors, edit palette hex codes, and filter combinations by search terms.', hint: 'Store hex arrays in state and map HSL colors to background styles.', icon: '🎨' }
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
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>Submit Day 7 Exercises</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save your code files inside the local playground repository and sync to complete module validation.</p>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
