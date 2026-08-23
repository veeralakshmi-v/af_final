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
  { id: 'q1', q: 'Which method is used to check if a specific value exists inside a Set?', options: ['set.exists()', 'set.includes()', 'set.has()', 'set.find()'], ans: 2 },
  { id: 'q2', q: 'How do you delete a property named "age" from an object named "student"?', options: ['delete student.age;', 'student.age.delete();', 'remove student.age;', 'student.delete("age");'], ans: 0 },
  { id: 'q3', q: 'Which property returns the number of key-value pairs inside a Map?', options: ['map.length', 'map.size', 'map.count', 'map.volume'], ans: 1 },
  { id: 'q4', q: 'What loop structure is used to iterate through all key-value entries of an Object?', options: ['for...of', 'for...in', 'forEach', 'while'], ans: 1 },
  { id: 'q5', q: 'What is a key difference between an Object and a Map?', options: ['Objects cannot store functions', 'Maps preserve insertion order and allow keys of any type', 'Objects can only store numbers', 'Maps do not have methods'], ans: 1 }
];

export default function CoreJSDay7({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Set Interactive States
  const [testSet, setTestSet] = useState(new Set(["Apple", "Banana"]));
  const [setNewItem, setSetNewItem] = useState("");
  const [setSearchItem, setSetSearchItem] = useState("");
  const [setSearchResult, setSetSearchResult] = useState("");

  // Object Interactive States
  const [testObj, setTestObj] = useState({ brand: "Tesla", model: "Model 3", year: 2023 });
  const [newObjKey, setNewObjKey] = useState("");
  const [newObjVal, setNewObjVal] = useState("");

  // Map Interactive States
  const [testMap, setTestMap] = useState(new Map([["US", "Washington"], ["IN", "New Delhi"]]));
  const [newMapKey, setNewMapKey] = useState("");
  const [newMapVal, setNewMapVal] = useState("");

  // Contact Manager State
  const [contacts, setContacts] = useState(new Map([["123456", "John Doe"], ["987654", "Alice Smith"]]));
  const [groups, setGroups] = useState(new Set(["Friends", "Work"]));
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactGroup, setNewContactGroup] = useState("");

  // Playground state
  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`// Day 7: Set, Object, Map
var items = new Set([1, 2, 3]);
items.add(4);
items.add(2); // duplicate is ignored!

console.log("Set size:", items.size);
console.log("Has 3?", items.has(3));`);
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
    onNavigate('core_js_day7', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set Handlers
  const addSetItem = () => {
    const val = setNewItem.trim();
    if (val === "") return;
    setTestSet(prev => {
      const copy = new Set(prev);
      copy.add(val);
      return copy;
    });
    setSetNewItem("");
  };

  const deleteSetItem = (val) => {
    setTestSet(prev => {
      const copy = new Set(prev);
      copy.delete(val);
      return copy;
    });
  };

  const checkSetItem = () => {
    const val = setSearchItem.trim();
    if (val === "") {
      setSetSearchResult("Please enter a value.");
      return;
    }
    if (testSet.has(val)) {
      setSetSearchResult(`✓ "${val}" exists in the Set!`);
    } else {
      setSetSearchResult(`✗ "${val}" not found.`);
    }
  };

  // Object Handlers
  const setObjProp = () => {
    const key = newObjKey.trim();
    const val = newObjVal.trim();
    if (key === "" || val === "") return;
    setTestObj(prev => ({ ...prev, [key]: val }));
    setNewObjKey("");
    setNewObjVal("");
  };

  const deleteObjProp = (key) => {
    setTestObj(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  // Map Handlers
  const addMapProp = () => {
    const key = newMapKey.trim();
    const val = newMapVal.trim();
    if (key === "" || val === "") return;
    setTestMap(prev => {
      const copy = new Map(prev);
      copy.set(key, val);
      return copy;
    });
    setNewMapKey("");
    setNewMapVal("");
  };

  const deleteMapProp = (key) => {
    setTestMap(prev => {
      const copy = new Map(prev);
      copy.delete(key);
      return copy;
    });
  };

  // Contact Manager Handlers
  const addContact = () => {
    const phone = newContactPhone.trim();
    const name = newContactName.trim();
    const group = newContactGroup.trim();

    if (phone === "" || name === "" || group === "") {
      alert("Please enter valid details.");
      return;
    }

    setContacts(prev => {
      const copy = new Map(prev);
      copy.set(phone, name);
      return copy;
    });

    setGroups(prev => {
      const copy = new Set(prev);
      copy.add(group);
      return copy;
    });

    setNewContactPhone("");
    setNewContactName("");
    setNewContactGroup("");
  };

  const deleteContact = (phone) => {
    setContacts(prev => {
      const copy = new Map(prev);
      copy.delete(phone);
      return copy;
    });
  };

  const executePlaygroundCode = () => {
    setConsoleOutput('');
    setRunTrigger(prev => prev + 1);
    if (editorCode.includes('<html') || editorCode.includes('<div') || editorCode.includes('<style>')) {
      setPlaygroundMode('preview');
    } else {
      setPlaygroundMode('console');
    }
  };

  const loadPresetSnippet = (name) => {
    if (name === 'set') {
      setEditorCode(`// JavaScript Set example
let fruits = new Set(["Apple", "Banana"]);
fruits.add("Orange");
fruits.add("Apple"); // Duplicate ignored!

console.log("Set size:", fruits.size);
console.log("Has Banana?", fruits.has("Banana"));

fruits.delete("Banana");
console.log("Fruits listing:");
fruits.forEach(val => console.log(val));`);
    } else if (name === 'object') {
      setEditorCode(`// JavaScript Object example
let user = {
  name: "Alice",
  age: 25,
  role: "Developer"
};

// Accessing properties
console.log("Name:", user.name);
console.log("Age:", user["age"]);

// Adding & Updating
user.city = "New York";
user.age = 26;

// Deleting
delete user.role;

console.log("User Properties:");
for (let key in user) {
  console.log(key + ": " + user[key]);
}`);
    } else if (name === 'map') {
      setEditorCode(`// JavaScript Map example
let countries = new Map();
countries.set("US", "Washington");
countries.set("IN", "New Delhi");
countries.set("FR", "Paris");

console.log("IN capital:", countries.get("IN"));
console.log("Has US?", countries.has("US"));
console.log("Map size:", countries.size);

countries.delete("FR");
console.log("Countries listings:");
countries.forEach((val, key) => {
  console.log(key + " => " + val);
});`);
    } else if (name === 'contacts') {
      setEditorCode(`// Interactive Contact Manager logic
let contacts = new Map();
let groups = new Set();

function addContact(phone, name, group) {
  contacts.set(phone, name);
  groups.add(group);
}

addContact("123456", "John Doe", "Friends");
addContact("987654", "Alice Smith", "Work");

console.log("Contacts map size:", contacts.size);
console.log("Groups set size:", groups.size);

contacts.forEach((name, phone) => {
  console.log("Contact:", name, "Phone:", phone);
});`);
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

      {/* ── TAB 1: SET ───────────────────── */}
      {activeTab === 'sets' && (
        <Section key="sets" eyebrow="Day 7 • Built-in Collections" title="JavaScript Set Object">
          <div className="panel">
            {/* Easy & Simple Definition Banner */}
            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderLeft: '4px solid #ca8a04', padding: '0.9rem 1.2rem', borderRadius: '8px', marginBottom: '1.2rem' }}>
              <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.2rem', fontSize: '0.95rem' }}>💡 Easy &amp; Simple Definition:</strong>
              <p style={{ color: '#854d0e', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                A <strong>Set</strong> is a collection of <strong>UNIQUE</strong> values where duplicate items are automatically forbidden. If you add the same value twice, JavaScript ignores the second one!
              </p>
              <div style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: '#854d0e', fontWeight: 600 }}>
                <strong>Analogy:</strong> A VIP Guest List — a guest's name can only appear once on the list.
              </div>
            </div>

            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              A JavaScript <strong>Set</strong> can hold values of any data type (numbers, strings, objects). Below are the core methods for working with Sets:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { name: 'new Set()', desc: 'Creates a brand new Set object.', example: 'let items = new Set();' },
                { name: 'add(value)', desc: 'Adds a new value to the Set. Returns the Set.', example: 'items.add("Apple");' },
                { name: 'has(value)', desc: 'Checks if a value exists in the Set. Returns boolean.', example: 'items.has("Apple") // true' },
                { name: 'delete(value)', desc: 'Removes a specific value from the Set.', example: 'items.delete("Apple");' },
                { name: 'size', desc: 'Property returning the number of elements.', example: 'items.size // 1' },
                { name: 'clear()', desc: 'Removes all elements from the Set.', example: 'items.clear();' },
              ].map(item => (
                <div key={item.name} style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#ca8a04', marginBottom: '0.25rem', fontFamily: 'monospace' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>{item.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block' }}>{item.example}</code>
                </div>
              ))}
            </div>

            {/* Interactive Set Playground */}
            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#854d0e', marginBottom: '1rem' }}>⭐ Interactive Set Playground</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input type="text" placeholder="Add value" value={setNewItem} onChange={e => setSetNewItem(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #ca8a04', borderRadius: '6px', flex: 1 }} />
                    <button onClick={addSetItem} style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>Add</button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', background: '#fff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Check Value (has()):</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="text" placeholder="Search value" value={setSearchItem} onChange={e => setSetSearchItem(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', flex: 1 }} />
                      <button onClick={checkSetItem} style={{ background: '#475569', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Check</button>
                    </div>
                    {setSearchResult && <div style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '0.25rem' }}>{setSearchResult}</div>}
                  </div>
                </div>
                <div>
                  <h5 style={{ margin: '0 0 0.5rem 0', color: '#854d0e' }}>Current Set Elements:</h5>
                  {testSet.size === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Set is empty.</p>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {Array.from(testSet).map(val => (
                        <span key={val} style={{ background: '#fff', border: '1px solid #ca8a04', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {val}
                          <button onClick={() => deleteSetItem(val)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 700 }}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day6', 'objects')}>← Back to Objects (Day 6)</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('maps')}>Next: Maps →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: MAPS ───────────────────── */}
      {activeTab === 'maps' && (
        <Section key="maps" eyebrow="Day 7 • Maps" title="JavaScript Map Object">
          <div className="panel">
            {/* Easy & Simple Definition Banner */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '4px solid #1e40af', padding: '0.9rem 1.2rem', borderRadius: '8px', marginBottom: '1.2rem' }}>
              <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.2rem', fontSize: '0.95rem' }}>💡 Easy &amp; Simple Definition:</strong>
              <p style={{ color: '#1e3a8a', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                A <strong>Map</strong> is an advanced dictionary of key-value pairs where keys can be of <strong>ANY data type</strong> (numbers, objects, functions), and insertion order is strictly preserved.
              </p>
              <div style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: '#1e3a8a', fontWeight: 600 }}>
                <strong>Analogy:</strong> A Luggage Locker System — a unique key token unlocks your exact bag inside the locker.
              </div>
            </div>

            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              A <strong>Map</strong> holds key-value pairs where the keys can be of any data type. Maps preserve the insertion order of elements.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { name: 'new Map()', desc: 'Creates a brand new Map object.', example: 'let map = new Map();' },
                { name: 'set(key, value)', desc: 'Sets a key-value entry in the Map.', example: 'map.set("US", "Washington");' },
                { name: 'get(key)', desc: 'Gets the value mapped to a key. Returns undefined if missing.', example: 'map.get("US") // "Washington"' },
                { name: 'has(key)', desc: 'Checks if a key exists in the Map. Returns boolean.', example: 'map.has("US") // true' },
                { name: 'delete(key)', desc: 'Removes a key-value pair from the Map.', example: 'map.delete("US");' },
                { name: 'size', desc: 'Property returning the entry count.', example: 'map.size // 1' },
              ].map(item => (
                <div key={item.name} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '0.25rem', fontFamily: 'monospace' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>{item.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block' }}>{item.example}</code>
                </div>
              ))}
            </div>

            {/* Interactive Map Playground */}
            <div style={{ background: '#dbeafe', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>🗺️ Interactive Map Playground</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input type="text" placeholder="Key (e.g. FR)" value={newMapKey} onChange={e => setNewMapKey(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #bfdbfe', borderRadius: '6px' }} />
                    <input type="text" placeholder="Value (e.g. Paris)" value={newMapVal} onChange={e => setNewMapVal(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #bfdbfe', borderRadius: '6px' }} />
                    <button onClick={addMapProp} style={{ background: '#1e40af', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Set Map Entry</button>
                  </div>
                </div>
                <div>
                  <h5 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Map Contents:</h5>
                  {testMap.size === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Map is empty.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {Array.from(testMap.entries()).map(([key, val]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', alignItems: 'center' }}>
                          <span><strong>{key}</strong> &rarr; {val}</span>
                          <button onClick={() => deleteMapProp(key)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 700 }}>delete</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Object vs Set vs Map Comparison */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '0.8rem' }}>⚖️ Object vs Set vs Map — Quick Comparison</h3>
            
            {/* Easy & Simple Summary Definition Banner */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderLeft: '4px solid #0f172a', padding: '0.9rem 1.2rem', borderRadius: '8px', marginBottom: '1.2rem' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem', fontSize: '0.95rem' }}>💡 Simple Definitions at a Glance:</strong>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.9rem', lineHeight: 1.7 }}>
                <li><strong>📦 Object:</strong> Key-value store for single-entity properties (e.g. <code>name: "Kavya"</code>). Keys are strings/symbols.</li>
                <li><strong>🗺️ Map:</strong> Key-value dictionary where keys can be <strong>ANY data type</strong> and insertion order is preserved.</li>
                <li><strong>🧺 Set:</strong> List of <strong>UNIQUE values</strong> where duplicate entries are automatically discarded.</li>
              </ul>
            </div>

            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Choose the right structure for your collection based on your exact needs. Here is a simple explanation and comparison:
            </p>

            {/* Simple Cards with Analogies */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: '📦 Object', bg: '#fef3c7', border: '#fde68a', text: 'Best for storing properties of a single entity (like details of a user or a product).', analogy: 'Name, Age, Country on an ID Card' },
                { title: '🗺️ Map', bg: '#dbeafe', border: '#bfdbfe', text: 'Best for advanced key-value lookup where order matters and keys can be anything.', analogy: 'A Luggage Locker Room system' },
                { title: '🧺 Set', bg: '#ecfdf5', border: '#a7f3d0', text: 'Best for storing lists of unique values where duplicate values are forbidden.', analogy: 'A VIP Guest List (no duplicate names)' }
              ].map(card => (
                <div key={card.title} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', fontSize: '1rem' }}>{card.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.8rem' }}>{card.text}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', background: 'rgba(255,255,255,0.6)', padding: '4px 8px', borderRadius: '6px', display: 'inline-block' }}>
                    Analogy: {card.analogy}
                  </div>
                </div>
              ))}
            </div>

            {/* Simplified Comparison Table */}
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#ca8a04', color: '#fff' }}>
                    {['Feature', 'Object 📦', 'Map 🗺️', 'Set 🧺'].map(h => (
                      <th key={h} style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['What is it?', 'Details of a single item', 'Advanced key-value dictionary', 'A collection of unique values'],
                    ['Key Types', 'Strings & Symbols only', 'Any type (Numbers, Objects, etc.)', 'No keys (Values only)'],
                    ['Order of Items', 'No guaranteed order', 'Maintains insertion order', 'Maintains insertion order'],
                    ['Duplicates', 'Keys must be unique', 'Keys must be unique', 'Duplicates automatically ignored'],
                    ['Get Size', 'Manual (Object.keys(obj).length)', 'Direct property (map.size)', 'Direct property (set.size)'],
                    ['How to check?', 'obj.name !== undefined', 'map.has(key)', 'set.has(value)'],
                    ['Write Item', 'obj.name = "Alice"', 'map.set(key, value)', 'set.add(value)'],
                  ].map(([feature, obj, map, set], i) => (
                    <tr key={feature} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.8rem 1rem', fontWeight: 700, color: '#1e293b' }}>{feature}</td>
                      <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>{obj}</td>
                      <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>{map}</td>
                      <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>{set}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day7', 'objects')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('map_vs_map')}>Next: map() vs new Map() →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: FRESH TOPIC - MAP() VS NEW MAP() ────────── */}
      {activeTab === 'map_vs_map' && (
        <Section key="map_vs_map" eyebrow="Day 7 • Key Concept Comparison" title="Array map() Function vs. Map Data Structure">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            
            {/* Easy & Simple Definition Banner */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #ca8a04', padding: '0.9rem 1.2rem', borderRadius: '8px', marginBottom: '1.2rem' }}>
              <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.2rem', fontSize: '0.95rem' }}>💡 Easy &amp; Simple Summary:</strong>
              <p style={{ color: '#854d0e', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                <strong>Array <code>map()</code></strong> is an <em>array action method</em> that transforms list elements into a new array. <br />
                <strong><code>new Map()</code></strong> is a <em>data structure container</em> that stores key-value pairs for fast lookup.
              </p>
            </div>

            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              A very common point of confusion for JavaScript beginners is confusing the built-in <strong>Array <code>map()</code> function</strong> with the <strong>Map Data Structure (<code>new Map()</code>)</strong>. Although both use the word "map", they serve completely different purposes in JavaScript!
            </p>

            {/* Side by Side Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
              {/* 1. Array.prototype.map() */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1.2rem' }}>
                <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                  1. Array.prototype.map()
                </div>
                <span style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  Array Transformation Function
                </span>
                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  An <strong>Array Method</strong> that loops through an existing array, applies a function to transform each element, and returns a <strong>brand new transformed array</strong> of the exact same length.
                </p>

                <div style={{ background: '#fff', border: '1px solid #bfdbfe', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.2rem' }}>💡 Factory Analogy:</strong>
                  A factory conveyor belt worker taking raw items from a box, processing each item, and outputting a box of transformed goods.
                </div>

                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`// Transforms array elements
var nums = [1, 2, 3];
var doubled = nums.map(x => x * 2);
// doubled = [2, 4, 6]`} />
                </div>
              </div>

              {/* 2. new Map() Data Structure */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1.2rem' }}>
                <div style={{ fontWeight: 800, color: '#ca8a04', fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                  2. new Map()
                </div>
                <span style={{ display: 'inline-block', background: '#fef9c3', color: '#854d0e', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  Key-Value Collection Class
                </span>
                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  A standalone <strong>Data Structure</strong> object that stores key-value pairs where keys can be of <strong>ANY data type</strong> and items maintain strict insertion order for fast key lookup.
                </p>

                <div style={{ background: '#fff', border: '1px solid #fde68a', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.2rem' }}>💡 Locker Room Analogy:</strong>
                  A luggage deposit room where you present key ticket #101 to instantly retrieve your assigned suitcase.
                </div>

                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`// Key-Value Dictionary Store
var userMap = new Map();
userMap.set("id1", "Kavya");
// userMap.get("id1") -> "Kavya"`} />
                </div>
              </div>
            </div>

            {/* Complete Runnable HTML Code Block */}
            <h4 style={{ color: '#0f172a', marginBottom: '0.5rem', fontSize: '0.98rem' }}>
              📄 Complete Runnable HTML Code (Array <code>map()</code> vs. <code>new Map()</code>):
            </h4>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Array map() vs new Map() Demo</title>
</head>
<body>
  <h2>Difference Between Array map() and Map Data Structure</h2>

  <script>
    // 1. Array map() Function: Transforms Array Elements
    var pricesInUSD = [10, 20, 30];
    var pricesInINR = pricesInUSD.map(function(price) {
      return price * 83; // Converts USD to INR
    });

    document.write("<h3>1. Array map() Transformation:</h3>");
    document.write("<p>USD Prices: " + pricesInUSD.join(", ") + "</p>");
    document.write("<p>INR Prices (Transformed): " + pricesInINR.join(", ") + "</p>");

    // 2. Map Data Structure: Key-Value Dictionary
    var capitals = new Map();
    capitals.set("India", "New Delhi");
    capitals.set("Japan", "Tokyo");
    capitals.set("France", "Paris");

    document.write("<h3>2. Map Data Structure (new Map()):</h3>");
    document.write("<p>Capital of India: " + capitals.get("India") + "</p>");
    document.write("<p>Capital of Japan: " + capitals.get("Japan") + "</p>");
    document.write("<p>Total Map Items Count (size): " + capitals.size + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day7', 'maps')}>← Back to Maps</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('set_vs_set')}>Next: new Set() vs .set() Method →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: FRESH TOPIC - NEW SET() VS .SET() METHOD ────────── */}
      {activeTab === 'set_vs_set' && (
        <Section key="set_vs_set" eyebrow="Day 7 • Key Concept Comparison" title="new Set() Data Structure vs. .set() Method &amp; Setter Functions">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            
            {/* Easy & Simple Definition Banner */}
            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderLeft: '4px solid #ca8a04', padding: '0.9rem 1.2rem', borderRadius: '8px', marginBottom: '1.2rem' }}>
              <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.2rem', fontSize: '0.95rem' }}>💡 Easy &amp; Simple Summary:</strong>
              <p style={{ color: '#854d0e', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                <strong><code>new Set()</code></strong> is a <em>standalone Data Structure class</em> that holds a list of <strong>UNIQUE values</strong>. <br />
                <strong><code>.set(key, value)</code></strong> is a <em>built-in action function / method</em> used on Map objects to insert or update key-value pairs!
              </p>
            </div>

            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Just like with "map", the word <strong>"set"</strong> appears in JavaScript in two completely different contexts: as a standalone <strong>Data Structure (<code>new Set()</code>)</strong> for unique items, and as a <strong>Method / Function (<code>map.set()</code> or Object Setter)</strong> used to assign values.
            </p>

            {/* 2 Side-by-Side Comparison Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* 1. new Set() Data Structure */}
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '1.2rem' }}>
                <div style={{ fontWeight: 800, color: '#047857', fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                  1. new Set()
                </div>
                <span style={{ display: 'inline-block', background: '#d1fae5', color: '#047857', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  Unique List Collection Class
                </span>
                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  A standalone <strong>Data Structure Class</strong> that stores a collection of <strong>unique values</strong>. Duplicate entries are automatically rejected.
                </p>

                <div style={{ background: '#fff', border: '1px solid #a7f3d0', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#047857', display: 'block', marginBottom: '0.2rem' }}>💡 Guest List Analogy:</strong>
                  A VIP party guest list where a guest's name can only be added once. Re-adding the same name is ignored!
                </div>

                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`// Data Structure Class
var tags = new Set();
tags.add("JS");
tags.add("JS"); // Duplicate ignored!
// tags.size -> 1`} />
                </div>
              </div>

              {/* 2. map.set() Method */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1.2rem' }}>
                <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                  2. map.set(key, value)
                </div>
                <span style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  Map Key-Value Action Function
                </span>
                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  A built-in <strong>Method / Function</strong> on a <code>Map</code> object used to store or update an entry mapping a key to a specific value.
                </p>

                <div style={{ background: '#fff', border: '1px solid #bfdbfe', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.2rem' }}>💡 Locker Stamp Analogy:</strong>
                  Stamping locker key token #101 onto suitcase "Red Bag" inside a deposit room catalog.
                </div>

                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`// Action Method on Map Instance
var userMap = new Map();
userMap.set("role", "Admin");
// Stores pair ("role" => "Admin")`} />
                </div>
              </div>

            </div>

            {/* Side-by-Side Comparison Table */}
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              📊 Quick Comparison Table:
            </h4>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#ca8a04', color: '#fff' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Feature</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>new Set() (Data Structure)</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>.set(key, val) (Map Function)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>What is it?</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Standalone Collection Class</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Built-in Action Method on Map</td>
                  </tr>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Primary Goal</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Store list of unique values</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Insert key-value pair in a Map</td>
                  </tr>
                  <tr style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>How to invoke?</td>
                    <td style={{ padding: '0.75rem 1rem' }}><code>new Set([1, 2])</code></td>
                    <td style={{ padding: '0.75rem 1rem' }}><code>myMap.set("k", "v")</code></td>
                  </tr>
                  <tr style={{ background: '#f8fafc' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Stores Key-Value?</td>
                    <td style={{ padding: '0.75rem 1rem' }}>No (Values only)</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Yes (Key &amp; Value)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Complete Runnable HTML Code Block */}
            <h4 style={{ color: '#0f172a', marginBottom: '0.5rem', fontSize: '0.98rem' }}>
              📄 Complete Runnable HTML Code (new Set() vs. map.set()):
            </h4>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>new Set() vs .set() Method Demo</title>
</head>
<body>
  <h2>Difference Between new Set() and .set() Method</h2>

  <script>
    // 1. new Set() DATA STRUCTURE: Stores Unique Values
    var uniqueSkills = new Set();
    uniqueSkills.add("HTML");
    uniqueSkills.add("CSS");
    uniqueSkills.add("HTML"); // Duplicate ignored!

    document.write("<h3>1. new Set() Data Structure Output:</h3>");
    document.write("<p>Total Unique Skills Count (size): " + uniqueSkills.size + "</p>");
    document.write("<p>Has CSS? " + uniqueSkills.has("CSS") + "</p>");

    // 2. .set() MAP METHOD: Stores Key-Value Pair inside Map
    var studentScores = new Map();
    studentScores.set("Kavya", 95);  // .set() function call
    studentScores.set("Ananya", 88); // .set() function call

    document.write("<h3>2. Map .set(key, value) Method Output:</h3>");
    document.write("<p>Kavya's Score: " + studentScores.get("Kavya") + "</p>");
    document.write("<p>Ananya's Score: " + studentScores.get("Ananya") + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day7', 'map_vs_map')}>← Back to map() vs new Map()</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('contact_manager')}>Next: Contact Manager Project →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: CONTACT MANAGER ────────── */}
      {activeTab === 'contact_manager' && (
        <Section key="contact_manager" eyebrow="Day 7 • Mini Project" title="Mini Project: Interactive Contact Book">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This project integrates all three concepts: a <strong>Map</strong> for phone-to-name lookup, a <strong>Set</strong> for listing unique group names, and an <strong>Object</strong> for display configurations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
              {/* App View */}
              <div style={{ flex: '1 1 360px', maxWidth: '460px', background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #ca8a04', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '1.2rem', fontSize: '1.2rem', borderBottom: '2px solid #ca8a04', paddingBottom: '0.5rem' }}>📞 Store Contact Book</h4>
                
                {/* Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input type="text" placeholder="Contact Name" value={newContactName} onChange={e => setNewContactName(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  <input type="text" placeholder="Phone Number" value={newContactPhone} onChange={e => setNewContactPhone(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  <input type="text" placeholder="Group (e.g. Friends)" value={newContactGroup} onChange={e => setNewContactGroup(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  <button onClick={addContact} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>Add Contact</button>
                </div>

                {/* Groups */}
                <h5 style={{ margin: '1rem 0 0.5rem 0', color: '#1e293b' }}>Active Groups (Unique Set):</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {Array.from(groups).map(g => (
                    <span key={g} style={{ background: '#fef9c3', border: '1px solid #fde68a', color: '#854d0e', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{g}</span>
                  ))}
                </div>

                {/* Roster */}
                <h5 style={{ margin: '1rem 0 0.5rem 0', color: '#1e293b' }}>All Contacts ({contacts.size})</h5>
                {contacts.size === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '0.5rem 0' }}>Roster is empty.</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {Array.from(contacts.entries()).map(([phone, name]) => (
                      <li key={phone} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '5px', fontSize: '0.88rem', alignItems: 'center' }}>
                        <span>👤 <strong>{name}</strong> ({phone})</span>
                        <button onClick={() => deleteContact(phone)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Delete</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Code View */}
              <div style={{ flex: '2 1 450px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Full Contact Book HTML &amp; JS Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowX: 'auto', maxHeight: '500px', width: '100%', boxSizing: 'border-box' }}>
                  <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Contact Book Manager</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
    .card { background: #fff; padding: 20px; border-radius: 8px; max-width: 450px; border: 2px solid #ca8a04; }
    input, button { padding: 8px; margin: 4px 0; width: 100%; box-sizing: border-box; }
    button { background: #ca8a04; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
    .tag { background: #fef9c3; border: 1px solid #fde68a; color: #854d0e; padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; margin-right: 4px; display: inline-block; }
    ul { list-style: none; padding: 0; }
    li { background: #f1f5f9; padding: 8px; margin-bottom: 4px; border-radius: 4px; display: flex; justify-content: space-between; }
    .btn-del { width: auto; background: #ef4444; font-size: 0.75rem; padding: 2px 8px; }
  </style>
</head>
<body>

  <div class="card">
    <h2>📞 Contact Book Manager</h2>
    <input type="text" id="name" placeholder="Contact Name">
    <input type="text" id="phone" placeholder="Phone Number">
    <input type="text" id="group" placeholder="Group (e.g. Work)">
    <button onclick="addContact()">Save Contact</button>

    <h3>Active Groups (Unique Set):</h3>
    <div id="groupsDisplay"></div>

    <h3>All Contacts (<span id="count">0</span>):</h3>
    <div id="contactsDisplay"></div>
  </div>

  <script>
    // 1. Data Structures Initialization
    var contacts = new Map([["9876543210", "Ananya"], ["9123456789", "Kavya"]]);
    var groups = new Set(["Work", "Friends"]);

    // 2. Render Function using DOM updates
    function renderBook() {
      // Render Groups (Set)
      var groupHtml = "";
      groups.forEach(function(g) {
        groupHtml += "<span class='tag'>" + g + "</span>";
      });
      document.getElementById("groupsDisplay").innerHTML = groupHtml;

      // Render Contacts (Map)
      var contactHtml = "<ul>";
      contacts.forEach(function(name, phone) {
        contactHtml += "<li><span>👤 <strong>" + name + "</strong> (" + phone + ")</span> " +
                       "<button class='btn-del' onclick='deleteContact(\"" + phone + "\")'>Delete</button></li>";
      });
      contactHtml += "</ul>";
      document.getElementById("contactsDisplay").innerHTML = contactHtml;
      document.getElementById("count").innerText = contacts.size;
    }

    // 3. Add Contact (Map & Set Operations)
    function addContact() {
      var n = document.getElementById("name").value.trim();
      var p = document.getElementById("phone").value.trim();
      var g = document.getElementById("group").value.trim();

      if (!n || !p || !g) {
        alert("Please enter Name, Phone, and Group!");
        return;
      }

      contacts.set(p, n); // Map: key = phone, val = name
      groups.add(g);      // Set: automatically ignores duplicate groups!

      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("group").value = "";
      renderBook();
    }

    // 4. Delete Contact
    function deleteContact(phone) {
      contacts.delete(phone);
      renderBook();
    }

    // Initial render
    renderBook();
  </script>
</body>
</html>`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day7', 'maps')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Write and execute Set, Object, and Map operations live in the editor:
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['set',       '💎 Set Operations'],
                ['object',    '📦 Object R/W/Delete'],
                ['map',       '🗺️ Map Operations'],
                ['contacts',  '📞 Contact Manager Book'],
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
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day7', 'contact_manager')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 7 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 7 • Assessment" title="Day 7 Assessment — Set, Object &amp; Map">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Pitfalls
            </h3>
            {[
              { mistake: 'Adding duplicate items to Set', code: `let mySet = new Set();\nmySet.add("Apple");\nmySet.add("Apple"); // ❌ Ignored! Sets only store unique values.\nconsole.log(mySet.size); // 1` },
              { mistake: 'Confusing Map methods with Object dot notation', code: `let myMap = new Map();\nmyMap.set("name", "Alice");\n\n// ❌ Invalid access (returns undefined):\nconsole.log(myMap.name);\n\n// ✅ Correct access:\nconsole.log(myMap.get("name"));` },
              { mistake: 'Attempting to use delete keyword incorrectly', code: `// Object delete syntax:\ndelete car.brand; \n\n// Map delete syntax:\nmyMap.delete("name"); \n\n// Set delete syntax:\nmySet.delete("Apple");` },
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
              💬 Day 7 Topic-Wise Technical Interview Questions & Answers
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Map vs Plain JavaScript Object
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What are the key advantages of using ES6 <code>Map</code> over a standard Object literal for key-value storage?</strong><br />
                  <strong>Answer:</strong> <code>Map</code> allows keys of ANY data type (including objects, functions, and numbers), preserves insertion order during iteration, has an O(1) <code>.size</code> property, and provides built-in high-performance <code>set()</code>/<code>get()</code>/<code>has()</code>/<code>delete()</code> API methods without inheriting prototype pollution keys.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Set Unique Storage & Reference Uniqueness
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: Why does <code>new Set([{}, {}]).size</code> return <code>2</code> while <code>new Set([1, 1]).size</code> returns <code>1</code>?</strong><br />
                  <strong>Answer:</strong> <code>Set</code> checks uniqueness using SameValueZero algorithm. Primitive numbers <code>1 === 1</code> are equal, so duplicate numbers are ignored. However, JavaScript object literals <code>{}</code> instantiate distinct heap memory references, so two different object references are considered unique elements.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: WeakMap & WeakSet Garbage Collection
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What is a <code>WeakMap</code> and how does garbage collection differ between <code>Map</code> and <code>WeakMap</code>?</strong><br />
                  <strong>Answer:</strong> A <code>WeakMap</code> only accepts objects as keys and holds weak references to them. If a key object has no other strong references in the program, it can be garbage collected automatically, preventing memory leaks (ideal for private data storage or DOM metadata caching).
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Shallow Copy vs Deep Copy
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What is the difference between a Shallow Copy and a Deep Copy of an object?</strong><br />
                  <strong>Answer:</strong> A Shallow Copy (e.g. <code>Object.assign()</code> or Spread operator <code>&#123;...obj&#125;</code>) duplicates top-level properties but copies nested object references by pointer. A Deep Copy (e.g. <code>structuredClone(obj)</code>) recursively duplicates all nested sub-objects into entirely new heap memory locations.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Property Descriptors & Immutability
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: How do <code>Object.freeze()</code> and <code>Object.seal()</code> protect objects against mutation?</strong><br />
                  <strong>Answer:</strong> <code>Object.freeze()</code> makes an object completely immutable: properties cannot be added, deleted, or modified. <code>Object.seal()</code> prevents adding or deleting properties, but allows modifying existing property values.
                </p>
              </div>
            </div>
          </div>

          {/* Assignments */}
          <div className="panel" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
            <h3 style={{ marginBottom: '1rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} /> Day 7 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Write a program to remove duplicate items from an array using a Set.</li>
              <li>Create a book object with titles, authors, and year details, then display each key-value pair using a `for...in` loop.</li>
              <li>Instantiate a Map containing three item names and their corresponding stock count. Increment one item's stock count.</li>
              <li>Demonstrate adding, deleting, and checking values inside both a Map and a Set.</li>
              <li>Modify the **Contact Manager** program to filter contacts based on a selected Active Group.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day7', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
