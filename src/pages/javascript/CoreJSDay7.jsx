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
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              A JavaScript <strong>Set</strong> is a collection of unique values. Each value can only occur once in a Set. A Set can hold any values of any data type.
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
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('objects')}>
              Next: Objects →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: OBJECTS ────────────────── */}
      {activeTab === 'objects' && (
        <Section key="objects" eyebrow="Day 7 • Objects" title="JavaScript Objects - In-Depth">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
              An <strong>Object</strong> is a standalone entity with properties and type. A property is an association between a name (or key) and a value. A property's value can be a function, in which case the property is known as a <strong>method</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>1. Creating Objects</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  The most common way to create an object is using the <strong>Object Literal</strong> syntax. You can also use <code>new Object()</code>.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`// Object Literal (Recommended)
let student = {
  name: "Alice",
  grade: "A"
};

// Object Constructor
let user = new Object();
user.username = "alice99";`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>2. Dot vs. Bracket Notation</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Use <strong>Dot notation</strong> for clean syntax. Use <strong>Bracket notation</strong> if the key is a variable or contains spaces / special characters.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`let user = { 
  name: "Bob",
  "home address": "123 Main St"
};

console.log(user.name); // Bob
console.log(user["home address"]); // 123 Main St

let prop = "name";
console.log(user[prop]); // Bob (dynamic lookup)`} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>3. Object Methods &amp; "this"</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  A method is a function definition stored as a property. The <code>this</code> keyword refers to the current object.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`let user = {
  firstName: "Jane",
  lastName: "Doe",
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

console.log(user.fullName()); // Jane Doe`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>4. Static Utility Methods</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Built-in helper methods in the global <code>Object</code> class return structural lists:
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`let car = { brand: "Ford", year: 2022 };

console.log(Object.keys(car));
// ["brand", "year"]

console.log(Object.values(car));
// ["Ford", 2022]

console.log(Object.entries(car));
// [["brand", "Ford"], ["year", 2022]]`} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>5. Updating &amp; Deleting</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Assign to a key to add/update it. Use the <code>delete</code> keyword to remove a key-value property entirely.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`let item = { name: "Pen", price: 2 };
item.price = 3;      // Updates price
item.color = "blue"; // Adds new key

delete item.color;   // Removes color property`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>6. Looping through Object (for...in)</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  A <code>for...in</code> loop iterates through all the keys of an object sequentially, letting you read dynamic property mappings.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`let score = { math: 90, physics: 85 };

for (let subject in score) {
  console.log(subject + ": " + score[subject]);
}`} />
                </div>
              </div>
            </div>
            {/* Interactive Object Inspector */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem', marginTop: '1.5rem' }}>
              <h4 style={{ color: '#1e293b', marginBottom: '1rem' }}>👤 Live Object Inspector</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input type="text" placeholder="Key (e.g. color)" value={newObjKey} onChange={e => setNewObjKey(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    <input type="text" placeholder="Value (e.g. Red)" value={newObjVal} onChange={e => setNewObjVal(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    <button onClick={setObjProp} style={{ background: '#475569', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Set Property</button>
                  </div>
                </div>
                <div>
                  <h5 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Object State:</h5>
                  <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px', color: '#7ee787', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {"{"}
                    {Object.keys(testObj).map(key => (
                      <div key={key} style={{ paddingLeft: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{key}: "{testObj[key]}"</span>
                        <button onClick={() => deleteObjProp(key)} style={{ background: 'none', border: 'none', color: '#ff7b72', cursor: 'pointer', fontSize: '0.8rem' }}>delete</button>
                      </div>
                    ))}
                    {"}"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day7', 'sets')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('maps')}>Next: Maps →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: MAPS ───────────────────── */}
      {activeTab === 'maps' && (
        <Section key="maps" eyebrow="Day 7 • Maps" title="JavaScript Map Object">
          <div className="panel">
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' }}>
              {/* App View */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #ca8a04', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '1.2rem', fontSize: '1.2rem', borderBottom: '2px solid #ca8a04', paddingBottom: '0.5rem' }}>📞 Store Contact Book</h4>
                
                {/* Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input type="text" placeholder="Contact Name" value={newContactName} onChange={e => setNewContactName(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  <input type="text" placeholder="Phone Number" value={newContactPhone} onChange={e => setNewContactPhone(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  <input type="text" placeholder="Group (e.g. Friends)" value={newContactGroup} onChange={e => setNewContactGroup(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  <button onClick={addContact} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>Add Contact</button>
                </div>

                {/* Groups */}
                <h5 style={{ margin: '1rem 0 0.5rem 0', color: '#1e293b' }}>Active Groups:</h5>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Roster Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '380px' }}>
                  <SyntaxHighlighter code={`// 1. Initial Storage Structs
let contacts = new Map();
let groups = new Set();

const settings = {
  icon: "👤"
};

// 2. Add contact
function addContact(phone, name, group) {
  contacts.set(phone, name);
  groups.add(group);
}

// 3. Delete contact
function deleteContact(phone) {
  contacts.delete(phone);
}`} />
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
