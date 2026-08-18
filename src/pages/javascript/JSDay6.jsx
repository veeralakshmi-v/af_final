import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, PenTool, Layers, Zap, List, Database } from 'lucide-react';
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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|Set|Map|WeakSet|WeakMap)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const toks = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fw = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (htmlTag) color = '#7ee787';
          else if (kw) { color = '#ff7b72'; fw = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
          else if (ident) color = '#e1e4e8';
          else if (sym) color = '#ff7b72';
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

const MethodCard = ({ method, syntax, desc, example, result }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', marginBottom: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
      <code style={{ background: '#1e293b', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: 6, fontSize: '0.9rem', fontWeight: 700 }}>{method}</code>
      <span style={{ color: '#64748b', fontSize: '0.82rem', fontFamily: 'monospace' }}>{syntax}</span>
    </div>
    <p style={{ margin: '0.4rem 0', color: '#334155', fontSize: '0.9rem' }}>{desc}</p>
    {example && <CB code={`${example}\n// Output: ${result}`} />}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function JSDay6({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_module6', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // ── Array Demo State ──
  const [demoArray, setDemoArray] = useState(['Apple', 'Banana', 'Mango']);
  const [arrayInput, setArrayInput] = useState('');

  // ── Set Demo ──
  const [setInput, setSetInput] = useState('');
  const [setItems, setSetItems] = useState(['apple', 'banana', 'mango', 'apple', 'banana']);
  const uniqueSet = new Set(setItems);
  const [setSearch, setSetSearch] = useState('');

  const addToSet = () => {
    if (setInput.trim()) { setSetItems(prev => [...prev, setInput.trim()]); setSetInput(''); }
  };
  const deleteFromSet = (val) => setSetItems(prev => { const s = new Set(prev); s.delete(val); return [...s]; });

  // ── Object Demo ──
  const [objPerson, setObjPerson] = useState({ name: 'Alice', age: 28, role: 'Developer', city: 'Chennai', salary: 75000 });
  const [newObjKey, setNewObjKey] = useState('');
  const [newObjVal, setNewObjVal] = useState('');
  const [editKey, setEditKey] = useState('');
  const [editVal, setEditVal] = useState('');

  const addObjProp = () => {
    if (newObjKey.trim() && newObjVal.trim()) {
      setObjPerson(prev => ({ ...prev, [newObjKey.trim()]: newObjVal.trim() }));
      setNewObjKey(''); setNewObjVal('');
    }
  };
  const deleteObjProp = (key) => setObjPerson(prev => { const o = { ...prev }; delete o[key]; return o; });
  const updateObjProp = () => {
    if (editKey && objPerson.hasOwnProperty(editKey)) {
      setObjPerson(prev => ({ ...prev, [editKey]: editVal }));
      setEditKey(''); setEditVal('');
    }
  };

  // ── Map Demo ──
  const [mapData, setMapData] = useState(new Map([
    ['username', 'john_doe'],
    ['email', 'john@example.com'],
    ['score', 95],
    ['active', true],
  ]));
  const [mapKey, setMapKey] = useState('');
  const [mapVal, setMapVal] = useState('');
  const [mapSearch, setMapSearch] = useState('');

  const addToMap = () => {
    if (mapKey.trim()) {
      setMapData(prev => new Map([...prev, [mapKey.trim(), mapVal]]));
      setMapKey(''); setMapVal('');
    }
  };
  const deleteFromMap = (key) => setMapData(prev => { const m = new Map(prev); m.delete(key); return m; });

  // ── Mini Project: Contact Book ──
  const [contacts, setContacts] = useState(new Map([
    ['Alice', { phone: '9876543210', email: 'alice@email.com', city: 'Chennai' }],
    ['Bob', { phone: '8765432109', email: 'bob@email.com', city: 'Bangalore' }],
    ['Charlie', { phone: '7654321098', email: 'charlie@email.com', city: 'Mumbai' }],
  ]));
  const [cName, setCName] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cCity, setCCity] = useState('');
  const [cSearch, setCSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [assignVal, setAssignVal] = useState('');

  const addContact = () => {
    if (cName.trim() && cPhone.trim()) {
      setContacts(prev => new Map([...prev, [cName.trim(), { phone: cPhone, email: cEmail, city: cCity }]]));
      setCName(''); setCPhone(''); setCEmail(''); setCCity('');
    }
  };
  const deleteContact = (name) => setContacts(prev => { const m = new Map(prev); m.delete(name); return m; });

  const filteredContacts = [...contacts.entries()].filter(([name]) =>
    name.toLowerCase().includes(cSearch.toLowerCase())
  );

  return (
    <AnimatePresence mode="wait">

      {/* ════════════ TAB: ARRAYS INTRO ════════════ */}
      {activeTab === 'js_arrays_intro' && (
        <Section eyebrow="Syllabus 01" title="Introduction to JavaScript Arrays">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>An <strong>Array</strong> is a special variable that can hold more than one value at a time. It is an ordered list of elements, where each element is associated with a numeric index starting from <strong>0</strong>.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Creating Arrays</h3>
            <p>The most common way to create an array is using the array literal syntax (square brackets):</p>
            <CB code={`// Creating an array of fruits
let fruits = ["Apple", "Banana", "Mango"];

// Creating an empty array
let emptyArray = [];`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Accessing Elements</h3>
            <p>You access an array element by referring to its <strong>index number</strong> inside square brackets <code>[]</code>:</p>
            <CB code={`let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]); // "Apple" (First element)
console.log(fruits[1]); // "Banana" (Second element)
console.log(fruits[2]); // "Mango" (Third element)
console.log(fruits[3]); // undefined (No element at index 3)`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Modifying Elements & Finding Length</h3>
            <p>You can change an element by assigning a new value to its index, or check the number of elements using the <code>.length</code> property:</p>
            <CB code={`let fruits = ["Apple", "Banana", "Mango"];

// Modifying an element
fruits[1] = "Orange";
console.log(fruits); // ["Apple", "Orange", "Mango"]

// Checking the size of the array
console.log(fruits.length); // 3`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_array_methods')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Array Methods <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: ARRAY METHODS ════════════ */}
      {activeTab === 'js_array_methods' && (
        <Section eyebrow="Syllabus 02" title="Common Array Methods">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>JavaScript provides a wide variety of built-in methods to manipulate arrays easily. Here are the most essential ones:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', margin: '1.5rem 0' }}>
              <MethodCard method="push()" syntax="array.push(element)" desc="Adds one or more elements to the END of an array and returns the new length." example={`let fruits = ["Apple", "Banana"];\nfruits.push("Mango");\nconsole.log(fruits);`} result={`["Apple", "Banana", "Mango"]`} />
              <MethodCard method="pop()" syntax="array.pop()" desc="Removes the LAST element from an array and returns that element." example={`let fruits = ["Apple", "Banana", "Mango"];\nlet last = fruits.pop();\nconsole.log(fruits);`} result={`["Apple", "Banana"] (returns "Mango")`} />
              <MethodCard method="unshift()" syntax="array.unshift(element)" desc="Adds one or more elements to the BEGINNING of an array and returns the new length." example={`let fruits = ["Apple", "Banana"];\nfruits.unshift("Mango");\nconsole.log(fruits);`} result={`["Mango", "Apple", "Banana"]`} />
              <MethodCard method="shift()" syntax="array.shift()" desc="Removes the FIRST element from an array and returns that element." example={`let fruits = ["Apple", "Banana", "Mango"];\nlet first = fruits.shift();\nconsole.log(fruits);`} result={`["Banana", "Mango"] (returns "Apple")`} />
              <MethodCard method="splice()" syntax="array.splice(startIndex, deleteCount, item1, ...)" desc="Adds or removes elements from any position in the array." example={`let fruits = ["Apple", "Banana", "Mango"];\n// At index 1, remove 1 item and add "Orange"\nfruits.splice(1, 1, "Orange");\nconsole.log(fruits);`} result={`["Apple", "Orange", "Mango"]`} />
              <MethodCard method="slice()" syntax="array.slice(start, end)" desc="Returns a shallow copy of a portion of an array into a new array object (non-mutating)." example={`let fruits = ["Apple", "Banana", "Mango", "Orange"];\nlet subset = fruits.slice(1, 3);\nconsole.log(subset);`} result={`["Banana", "Mango"]`} />
            </div>

            {/* Interactive Array Visualizer */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Playground: Array Methods</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input placeholder="Add element..." value={arrayInput} onChange={e => setArrayInput(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1 }} />
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <button onClick={() => { if (arrayInput) { setDemoArray([...demoArray, arrayInput]); setArrayInput(''); } }} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>push()</button>
                <button onClick={() => { const a = [...demoArray]; a.pop(); setDemoArray(a); }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>pop()</button>
                <button onClick={() => { if (arrayInput) { setDemoArray([arrayInput, ...demoArray]); setArrayInput(''); } }} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>unshift()</button>
                <button onClick={() => { const a = [...demoArray]; a.shift(); setDemoArray(a); }} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>shift()</button>
                <button onClick={() => setDemoArray(['Apple', 'Banana', 'Mango'])} style={{ background: '#64748b', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Reset</button>
              </div>

              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, display: 'flex', gap: '0.5rem', flexWrap: 'wrap', minHeight: '50px', alignItems: 'center' }}>
                {demoArray.map((item, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(135deg, #ca8a04 0%, #d97706 100%)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: 6, fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>[{idx}]</span>
                    <span style={{ fontWeight: 700 }}>"{item}"</span>
                  </div>
                ))}
                {demoArray.length === 0 && <span style={{ color: '#64748b', fontFamily: 'monospace' }}>Empty Array []</span>}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.5rem', fontFamily: 'monospace' }}>
                // Current Array representation: [{demoArray.map(x => `"${x}"`).join(', ')}] (length: {demoArray.length})
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_objects_intro')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Objects Intro <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: OBJECTS INTRO ════════════ */}
      {activeTab === 'js_objects_intro' && (
        <Section eyebrow="Syllabus 03" title="Introduction to JavaScript Objects">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>An <strong>Object</strong> is a standalone entity, with properties and type. Compare it with a cup, for example. A cup has properties like color, design, weight, material, etc. In JavaScript, objects are collection of key-value pairs.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Object Literals</h3>
            <p>The simplest way to define an object is with curly braces <code>{'{}'}</code>, specifying key-value pairs separated by commas:</p>
            <CB code={`// Object literal representing a student
let student = {
  name: "John",
  age: 21,
  course: "Full Stack Development",
  isEnrolled: true
};

console.log(student);`} />

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1.2rem', marginTop: '1.5rem' }}>
              <strong style={{ color: '#1e40af' }}>💡 Key Concepts:</strong>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0 0 0', color: '#1e3a8a' }}>
                <li>Keys are properties (like <code>name</code> or <code>age</code>) and must be unique.</li>
                <li>Values can be of any data type (string, number, boolean, array, even another object!).</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_object_properties')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Object Properties <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: OBJECT PROPERTIES ════════════ */}
      {activeTab === 'js_object_properties' && (
        <Section eyebrow="Syllabus 04" title="Object Properties (Dot vs Bracket)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Properties of JavaScript objects can be accessed, added, updated, or deleted dynamically using either <strong>Dot notation</strong> or <strong>Bracket notation</strong>.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. Accessing Properties</h3>
            <CB code={`let user = { name: "Alice", age: 25 };

// Dot notation (most common)
console.log(user.name); // "Alice"

// Bracket notation (required when key is dynamic or contains special characters/spaces)
console.log(user["age"]); // 25`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. Adding & Modifying Properties</h3>
            <p>Simply assign a value to a new or existing key:</p>
            <CB code={`let user = { name: "Alice" };

// Adding a property
user.age = 25; 
// Modifying a property
user.name = "Bob";

console.log(user); // { name: "Bob", age: 25 }`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>3. Deleting Properties</h3>
            <p>Use the <code>delete</code> operator to remove properties entirely:</p>
            <CB code={`let user = { name: "Alice", age: 25 };

delete user.age;
console.log(user); // { name: "Alice" }`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_object_methods')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Object Methods <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: OBJECT METHODS ════════════ */}
      {activeTab === 'js_object_methods' && (
        <Section eyebrow="Syllabus 05" title="Object Methods & 'this'">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>An object property can also be a <strong>function</strong>. In that context, the function is called a <strong>method</strong> of the object. Methods are used to define the behavior of an object.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Defining and Calling Methods</h3>
            <CB code={`let person = {
  firstName: "John",
  lastName: "Doe",
  // Method
  greet: function() {
    return "Hello, my name is " + this.firstName + " " + this.lastName;
  }
};

console.log(person.greet()); // "Hello, my name is John Doe"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>The 'this' Keyword</h3>
            <p>Inside an object method, the <code>this</code> keyword refers to the <strong>current object</strong> itself. It allows you to access other properties of the same object.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Object helper methods</h3>
            <p>JavaScript provides utility methods to extract parts of an object:</p>
            <CB code={`let person = { name: "Alice", age: 25 };

console.log(Object.keys(person));   // ["name", "age"]
console.log(Object.values(person)); // ["Alice", 25]
console.log(Object.entries(person)); // [["name", "Alice"], ["age", 25]]`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_set')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Set <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB 1: JAVASCRIPT SET ════════════ */}
      {activeTab === 'js_set' && (
        <Section eyebrow="Syllabus 01" title="JavaScript Set">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>A <strong>Set</strong> is a collection of <strong>unique values</strong> — it automatically removes duplicates. Unlike arrays, a Set stores each value only once, regardless of how many times you add it.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: '1rem' }}>
                <strong style={{ color: '#dc2626' }}>Array (allows duplicates)</strong>
                <CB code={`let arr = [1, 2, 2, 3, 3, 3];
console.log(arr);
// [1, 2, 2, 3, 3, 3]`} />
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '1rem' }}>
                <strong style={{ color: '#166534' }}>Set (unique only)</strong>
                <CB code={`let mySet = new Set([1, 2, 2, 3, 3, 3]);
console.log(mySet);
// Set {1, 2, 3}`} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Creating a Set</h3>
            <CB code={`// Empty Set
let mySet = new Set();

// Set from an array
let fruits = new Set(["apple", "banana", "mango", "apple"]);
console.log(fruits);        // Set {"apple", "banana", "mango"}
console.log(fruits.size);   // 3  (not .length — use .size for Sets)`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Set Methods</h3>

            <MethodCard
              method=".add()"
              syntax="set.add(value)"
              desc="Adds a value to the Set. If it already exists, nothing changes — no duplicates."
              example={`let mySet = new Set();\nmySet.add("apple");\nmySet.add("banana");\nmySet.add("apple"); // duplicate — ignored\nconsole.log(mySet);\nconsole.log(mySet.size);`}
              result='Set {"apple", "banana"} / 2'
            />

            <MethodCard
              method=".has()"
              syntax="set.has(value)"
              desc="Returns true if the value exists in the Set, otherwise false."
              example={`let colors = new Set(["red", "green", "blue"]);\nconsole.log(colors.has("green"));\nconsole.log(colors.has("yellow"));`}
              result="true / false"
            />

            <MethodCard
              method=".delete()"
              syntax="set.delete(value)"
              desc="Removes a specific value from the Set. Returns true if removed, false if not found."
              example={`let mySet = new Set(["a", "b", "c"]);\nmySet.delete("b");\nconsole.log(mySet);`}
              result='Set {"a", "c"}'
            />

            <MethodCard
              method=".clear()"
              syntax="set.clear()"
              desc="Removes ALL values from the Set."
              example={`let mySet = new Set([1, 2, 3]);\nmySet.clear();\nconsole.log(mySet);\nconsole.log(mySet.size);`}
              result="Set {} / 0"
            />

            <MethodCard
              method=".size"
              syntax="set.size"
              desc="Returns the number of unique values in the Set. (Property — no parentheses)"
              example={`let nums = new Set([10, 20, 30, 20, 10]);\nconsole.log(nums.size);`}
              result="3"
            />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Looping Through a Set</h3>
            <CB code={`let fruits = new Set(["apple", "banana", "mango"]);

// Method 1: for...of
for (let fruit of fruits) {
  console.log(fruit);
}

// Method 2: forEach
fruits.forEach(function(value) {
  console.log(value);
});

// Convert Set back to Array
let arr = [...fruits];          // Spread operator
let arr2 = Array.from(fruits);  // Array.from()
console.log(arr);   // ["apple", "banana", "mango"]`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Common Use Case: Remove Duplicates from Array</h3>
            <CB code={`let rawData = [1, 2, 3, 2, 4, 1, 5, 3, 5];

// Convert to Set (removes duplicates), then back to array
let unique = [...new Set(rawData)];
console.log(unique);
// Output: [1, 2, 3, 4, 5]

// Practical: remove duplicate names
let names = ["Alice", "Bob", "Alice", "Charlie", "Bob"];
let uniqueNames = [...new Set(names)];
console.log(uniqueNames);
// Output: ["Alice", "Bob", "Charlie"]`} />

            {/* Interactive Set Demo */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>🎮 Live Demo: JavaScript Set</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', color: '#64748b' }}>
                Raw input (with duplicates): <strong style={{ color: '#334155' }}>[{setItems.join(', ')}]</strong>
              </p>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#64748b' }}>
                After <code>new Set()</code>: <strong style={{ color: '#10b981' }}>{'{' + [...uniqueSet].join(', ') + '}'}</strong> &nbsp;|&nbsp; size: <strong>{uniqueSet.size}</strong>
              </p>

              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <input placeholder="Add value..." value={setInput} onChange={e => setSetInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addToSet()}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '140px' }} />
                <button onClick={addToSet} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Add</button>
                <input placeholder="Check has()..." value={setSearch} onChange={e => setSetSearch(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '140px' }} />
                <span style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: uniqueSet.has(setSearch) ? '#10b981' : '#ef4444', fontSize: '0.9rem' }}>
                  {setSearch ? (uniqueSet.has(setSearch) ? '✅ Found' : '❌ Not Found') : '—'}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[...uniqueSet].map(val => (
                  <div key={val} style={{ background: '#1e293b', color: '#79c0ff', padding: '0.3rem 0.8rem', borderRadius: 20, fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {val}
                    <button onClick={() => deleteFromSet(val)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_object')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Objects <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB 2: OBJECTS ════════════ */}
      {activeTab === 'js_object' && (
        <Section eyebrow="Syllabus 02" title="JavaScript Objects">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>An <strong>Object</strong> is a collection of <strong>key-value pairs</strong>. It represents a real-world entity (like a person, product, or car) with <em>properties</em> (keys) and their <em>values</em>. Objects are the most important data structure in JavaScript.</p>

            <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.2rem 1.5rem', borderRadius: 12, margin: '1rem 0' }}>
              <strong style={{ color: '#854d0e' }}>Syntax:</strong>
              <CB code={`let objectName = {
  key1: value1,    // key: value pairs separated by commas
  key2: value2,
  key3: value3
};`} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Creating an Object</h3>
            <CB code={`// Object literal (most common way)
let person = {
  name: "Alice",
  age: 28,
  role: "Developer",
  city: "Chennai",
  isActive: true
};

console.log(person);
// { name: "Alice", age: 28, role: "Developer", city: "Chennai", isActive: true }`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Accessing Object Properties</h3>
            <CB code={`let person = { name: "Alice", age: 28, city: "Chennai" };

// Method 1: Dot notation (most common)
console.log(person.name);    // "Alice"
console.log(person.age);     // 28

// Method 2: Bracket notation (use when key is dynamic or has spaces)
console.log(person["city"]);  // "Chennai"

let key = "age";
console.log(person[key]);     // 28  — dynamic key access`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Adding New Key-Value Pairs</h3>
            <CB code={`let person = { name: "Alice", age: 28 };

// Dot notation
person.email = "alice@email.com";

// Bracket notation
person["phone"] = "9876543210";

console.log(person);
// { name: "Alice", age: 28, email: "alice@email.com", phone: "9876543210" }`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Updating Existing Values</h3>
            <CB code={`let person = { name: "Alice", age: 28, city: "Chennai" };

// Simply assign a new value to an existing key
person.age = 29;
person["city"] = "Bangalore";

console.log(person.age);   // 29
console.log(person.city);  // "Bangalore"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Deleting Properties</h3>
            <CB code={`let person = { name: "Alice", age: 28, city: "Chennai", temp: "unused" };

// Use the delete keyword
delete person.temp;
delete person["city"];

console.log(person);
// { name: "Alice", age: 28 }

// Check if a property exists
console.log("name" in person);   // true
console.log("city" in person);   // false`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Looping Through an Object</h3>
            <CB code={`let person = { name: "Alice", age: 28, role: "Developer", city: "Chennai" };

// for...in — iterates over all enumerable keys
for (let key in person) {
  console.log(key + ": " + person[key]);
}
// name: Alice
// age: 28
// role: Developer
// city: Chennai

// Object.keys() — returns array of keys
let keys = Object.keys(person);
console.log(keys);  // ["name", "age", "role", "city"]

// Object.values() — returns array of values
let values = Object.values(person);
console.log(values);  // ["Alice", 28, "Developer", "Chennai"]

// Object.entries() — returns array of [key, value] pairs
let entries = Object.entries(person);
entries.forEach(([key, value]) => {
  console.log(key + " => " + value);
});`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Nested Objects</h3>
            <CB code={`let student = {
  name: "Alice",
  age: 20,
  address: {
    street: "MG Road",
    city: "Chennai",
    pincode: "600001"
  },
  scores: {
    math: 95,
    english: 88,
    science: 92
  }
};

// Access nested properties
console.log(student.address.city);    // "Chennai"
console.log(student.scores.math);     // 95

// Update nested value
student.address.city = "Bangalore";
console.log(student.address.city);    // "Bangalore"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Object Methods (Functions inside Objects)</h3>
            <CB code={`let calculator = {
  brand: "Casio",
  add: function(a, b) { return a + b; },
  subtract: function(a, b) { return a - b; },
  multiply: function(a, b) { return a * b; },
  greet: function() {
    return "I am " + this.brand + " calculator!";
  }
};

console.log(calculator.add(10, 5));       // 15
console.log(calculator.subtract(10, 5));  // 5
console.log(calculator.greet());          // "I am Casio calculator!"`} />

            {/* Interactive Object Demo */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>🎮 Live Demo: JavaScript Object</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              {/* Current object state */}
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', marginBottom: '1rem', overflowX: 'auto' }}>
                <p style={{ color: '#8b949e', fontFamily: 'monospace', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>// Current Object State:</p>
                {Object.entries(objPerson).map(([k, v]) => (
                  <div key={k} style={{ fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ color: '#79c0ff' }}>{k}</span>
                    <span style={{ color: '#ff7b72' }}>:</span>
                    <span style={{ color: '#a5d6ff' }}>"{String(v)}"</span>
                    <button onClick={() => deleteObjProp(k)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem' }}>delete</button>
                  </div>
                ))}
              </div>

              {/* Add property */}
              <div style={{ marginBottom: '0.8rem' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>➕ Add / Update Property:</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <input placeholder="Key..." value={newObjKey} onChange={e => setNewObjKey(e.target.value)}
                    style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '100px' }} />
                  <input placeholder="Value..." value={newObjVal} onChange={e => setNewObjVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addObjProp()}
                    style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '100px' }} />
                  <button onClick={addObjProp} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Add</button>
                </div>
              </div>

              {/* Update property */}
              <div>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>✏️ Update Existing Key:</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <select value={editKey} onChange={e => setEditKey(e.target.value)}
                    style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '100px' }}>
                    <option value="">Select key...</option>
                    {Object.keys(objPerson).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                  <input placeholder="New value..." value={editVal} onChange={e => setEditVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && updateObjProp()}
                    style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '100px' }} />
                  <button onClick={updateObjProp} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Update</button>
                </div>
              </div>

              <div style={{ marginTop: '0.8rem', fontSize: '0.82rem', color: '#64748b' }}>
                Keys: [{Object.keys(objPerson).join(', ')}] &nbsp;|&nbsp; Total properties: {Object.keys(objPerson).length}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_map')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Map <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB 3: MAP ════════════ */}
      {activeTab === 'js_map' && (
        <Section eyebrow="Syllabus 03" title="JavaScript Map">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>

            <p>A <strong>Map</strong> is a collection of <strong>key-value pairs</strong> where <em>any data type</em> can be a key (including objects, arrays, and numbers). Unlike objects, Maps maintain insertion order and have better performance for frequent additions/deletions.</p>

            {/* Object vs Map comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: '1rem' }}>
                <strong style={{ color: '#dc2626', display: 'block', marginBottom: '0.5rem' }}>Object</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: 1.7 }}>
                  <li>Keys must be strings or symbols</li>
                  <li>No guaranteed insertion order</li>
                  <li>Use <code>Object.keys().length</code> for size</li>
                  <li>Not iterable directly</li>
                  <li>Prototype chain interference</li>
                </ul>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '1rem' }}>
                <strong style={{ color: '#166534', display: 'block', marginBottom: '0.5rem' }}>Map</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: 1.7 }}>
                  <li>Keys can be ANY data type</li>
                  <li>Maintains insertion order</li>
                  <li>Built-in <code>.size</code> property</li>
                  <li>Directly iterable</li>
                  <li>No prototype interference</li>
                </ul>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Creating a Map</h3>
            <CB code={`// Empty Map
let myMap = new Map();

// Map from array of [key, value] pairs
let userMap = new Map([
  ["name", "Alice"],
  ["age", 28],
  ["role", "Developer"]
]);

console.log(userMap);
// Map { "name" => "Alice", "age" => 28, "role" => "Developer" }
console.log(userMap.size);  // 3`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Map Methods</h3>

            <MethodCard
              method=".set()"
              syntax="map.set(key, value)"
              desc="Adds or updates a key-value pair. Returns the Map itself (chainable)."
              example={`let myMap = new Map();\nmyMap.set("name", "Alice");\nmyMap.set("age", 28);\nmyMap.set(1, "one");  // number as key!\nconsole.log(myMap);`}
              result='Map { "name" => "Alice", "age" => 28, 1 => "one" }'
            />

            <MethodCard
              method=".get()"
              syntax="map.get(key)"
              desc="Returns the value for the given key. Returns undefined if the key doesn't exist."
              example={`let myMap = new Map([["city", "Chennai"], ["score", 95]]);\nconsole.log(myMap.get("city"));\nconsole.log(myMap.get("score"));\nconsole.log(myMap.get("missing"));`}
              result='"Chennai" / 95 / undefined'
            />

            <MethodCard
              method=".has()"
              syntax="map.has(key)"
              desc="Returns true if the Map contains the given key."
              example={`let myMap = new Map([["x", 10], ["y", 20]]);\nconsole.log(myMap.has("x"));\nconsole.log(myMap.has("z"));`}
              result="true / false"
            />

            <MethodCard
              method=".delete()"
              syntax="map.delete(key)"
              desc="Removes the entry for the given key. Returns true if successful."
              example={`let myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);\nmyMap.delete("b");\nconsole.log(myMap);`}
              result='Map { "a" => 1, "c" => 3 }'
            />

            <MethodCard
              method=".size"
              syntax="map.size"
              desc="Returns the number of key-value pairs in the Map."
              example={`let myMap = new Map([["x", 1], ["y", 2], ["z", 3]]);\nconsole.log(myMap.size);`}
              result="3"
            />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Looping Through a Map</h3>
            <CB code={`let scores = new Map([
  ["Alice", 95],
  ["Bob", 82],
  ["Charlie", 74]
]);

// for...of with destructuring
for (let [name, score] of scores) {
  console.log(name + " scored " + score);
}

// forEach
scores.forEach(function(value, key) {
  console.log(key + ": " + value);
});

// Get all keys or values
console.log([...scores.keys()]);    // ["Alice", "Bob", "Charlie"]
console.log([...scores.values()]);  // [95, 82, 74]
console.log([...scores.entries()]); // [["Alice",95],["Bob",82],["Charlie",74]]`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Map with Non-String Keys</h3>
            <CB code={`// Number keys
let numMap = new Map();
numMap.set(1, "one");
numMap.set(2, "two");
numMap.set(3, "three");
console.log(numMap.get(1));  // "one"

// Object keys
let objKey = { id: 101 };
let userMap = new Map();
userMap.set(objKey, { name: "Alice", role: "Admin" });
console.log(userMap.get(objKey)); // { name: "Alice", role: "Admin" }

// Boolean keys
let boolMap = new Map([[true, "Yes"], [false, "No"]]);
console.log(boolMap.get(true));   // "Yes"
console.log(boolMap.get(false));  // "No"`} />

            {/* Interactive Map Demo */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>🎮 Live Demo: JavaScript Map</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>

              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', marginBottom: '1rem', overflowX: 'auto' }}>
                <p style={{ color: '#8b949e', fontFamily: 'monospace', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>// Map entries (size: {mapData.size}):</p>
                {[...mapData.entries()].map(([k, v]) => (
                  <div key={String(k)} style={{ fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: '#ffb454' }}>"{String(k)}"</span>
                    <span style={{ color: '#8b949e' }}>=&gt;</span>
                    <span style={{ color: '#a5d6ff' }}>"{String(v)}"</span>
                    <button onClick={() => deleteFromMap(k)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem' }}>delete</button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                <input placeholder="Key..." value={mapKey} onChange={e => setMapKey(e.target.value)}
                  style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '100px' }} />
                <input placeholder="Value..." value={mapVal} onChange={e => setMapVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addToMap()}
                  style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '100px' }} />
                <button onClick={addToMap} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>map.set()</button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input placeholder="map.has() — enter key..." value={mapSearch} onChange={e => setMapSearch(e.target.value)}
                  style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '140px' }} />
                <span style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: mapData.has(mapSearch) ? '#10b981' : '#ef4444', fontSize: '0.9rem' }}>
                  {mapSearch ? (mapData.has(mapSearch) ? `✅ "${mapData.get(mapSearch)}"` : '❌ Not Found') : '—'}
                </span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_miniproject6')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Mini Project <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB 4: MINI PROJECT ════════════ */}
      {activeTab === 'js_miniproject6' && (
        <Section eyebrow="Mini Project" title="Contact Book App">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>This project combines <strong>Map</strong> (to store contacts by name), <strong>Object</strong> (for each contact's details), and <strong>Set</strong> (for tracking unique cities) into a fully functional contact manager.</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { label: 'Total Contacts', value: contacts.size, color: '#3b82f6' },
                { label: 'Unique Cities', value: new Set([...contacts.values()].map(c => c.city).filter(Boolean)).size, color: '#8b5cf6' },
                { label: 'With Email', value: [...contacts.values()].filter(c => c.email).length, color: '#10b981' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: '#f8fafc', border: `2px solid ${color}22`, borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color }}>{value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Add contact */}
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '1.2rem', marginBottom: '1rem' }}>
              <strong style={{ color: '#166534', fontSize: '0.9rem' }}>➕ Add New Contact</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem', marginTop: '0.8rem' }}>
                <input placeholder="Name*" value={cName} onChange={e => setCName(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #86efac', borderRadius: 8 }} />
                <input placeholder="Phone*" value={cPhone} onChange={e => setCPhone(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #86efac', borderRadius: 8 }} />
                <input placeholder="Email" value={cEmail} onChange={e => setCEmail(e.target.value)}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #86efac', borderRadius: 8 }} />
                <input placeholder="City" value={cCity} onChange={e => setCCity(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addContact()}
                  style={{ padding: '0.5rem 0.8rem', border: '1px solid #86efac', borderRadius: 8 }} />
              </div>
              <button onClick={addContact} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', marginTop: '0.8rem' }}>
                Add Contact
              </button>
            </div>

            {/* Search */}
            <input placeholder="🔍 Search contacts by name..." value={cSearch} onChange={e => setCSearch(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: 8, boxSizing: 'border-box', marginBottom: '1rem' }} />

            {/* Contacts list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {filteredContacts.map(([name, info]) => (
                <div key={name} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>
                      {name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{name}</div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        📞 {info.phone}{info.email ? ` · ✉️ ${info.email}` : ''}{info.city ? ` · 📍 ${info.city}` : ''}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteContact(name)}
                    style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.3rem 0.8rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                    Delete
                  </button>
                </div>
              ))}
              {filteredContacts.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No contacts found.</div>
              )}
            </div>

            {/* Source Code */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem' }}>📋 Source Code</h3>
            <CB code={`// Contact Book — using Map + Object + Set

// Map: contactName => contact object
let contacts = new Map([
  ["Alice", { phone: "9876543210", email: "alice@email.com", city: "Chennai" }],
  ["Bob",   { phone: "8765432109", email: "bob@email.com",   city: "Bangalore" }],
]);

// Add a contact
contacts.set("Charlie", { phone: "7654321098", city: "Mumbai" });

// Get a contact
let alice = contacts.get("Alice");
console.log(alice.phone);   // "9876543210"

// Check if contact exists
console.log(contacts.has("Bob"));    // true
console.log(contacts.has("Diana")); // false

// Delete a contact
contacts.delete("Bob");
console.log(contacts.size);  // 2

// Loop through all contacts
for (let [name, info] of contacts) {
  console.log(name + ": " + info.phone);
}

// Use Set to find unique cities
let cities = new Set();
for (let info of contacts.values()) {
  if (info.city) cities.add(info.city);
}
console.log("Unique cities:", [...cities]);`} />

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
            <JSLiveEditor dayKey="day6" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── DAY 6 QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d6" id="quiz_d6" eyebrow="Day 6 • Assessment" title="Day 6 Quiz: Arrays & Objects">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which is the correct way to find the number of elements in an array?', opts: ['array.size', 'array.length', 'array.count()', 'array.limit'], ans: 1 },
              { q: 'Which method removes the first element from an array?', opts: ['pop()', 'shift()', 'unshift()', 'push()'], ans: 1 },
              { q: 'What is the index of the first element in a JavaScript array?', opts: ['1', '-1', '0', 'Any integer'], ans: 2 },
              { q: 'Which operator is used to delete a property from an object?', opts: ['remove', 'clear', 'delete', 'exclude'], ans: 2 },
              { q: 'What does Object.keys(obj) return?', opts: ['An array of keys', 'A Set of keys', 'A string containing keys', 'An object containing keys'], ans: 0 },
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

      {/* ════════════ TAB 5: ASSIGNMENT ════════════ */}
      {activeTab === 'assignment' && (
        <Section eyebrow="Homework" title="Day 6 Assignment: Set, Object & Map">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📝 Tasks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { no: 1, task: 'Create a Set from an array of 10 numbers that has duplicates. Use .add(), .has(), .delete(), and .size. Then convert the Set back to an array using the spread operator.' },
                { no: 2, task: 'Create an object representing a "Product" with at least 5 properties (name, price, category, stock, rating). Write code to: access all properties using for...in, add a new property, update an existing one, and delete one.' },
                { no: 3, task: 'Use Object.keys(), Object.values(), and Object.entries() on a student object. Display the keys and values in a formatted HTML table on a webpage.' },
                { no: 4, task: 'Create a Map to store employee IDs (number) as keys and employee names as values. Use .set(), .get(), .has(), .delete(). Loop through it with for...of and display all entries.' },
                { no: 5, task: 'Write a program that takes an array of words and uses a Map to count how many times each word appears (word frequency counter). Display the result sorted by frequency.' },
                { no: 6, task: 'Build an HTML mini project: a simple phonebook where users can add (name + phone) and delete contacts using a Map. Display all contacts in a styled list that updates without page reload.' },
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
