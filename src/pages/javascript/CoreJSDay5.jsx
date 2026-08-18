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
  { id: 'q1', q: 'Which function type is automatically executed immediately after it is defined?', options: ['Arrow Function', 'Anonymous Function', 'IIFE', 'Named Function'], ans: 2 },
  { id: 'q2', q: 'What is a key characteristic of Arrow Functions?', options: ['They cannot be assigned to variables', 'They do not have their own "this" context', 'They require the function keyword', 'They are automatically hoisted'], ans: 1 },
  { id: 'q3', q: 'Which statement correctly defines an anonymous function assigned to a variable?', options: ['var myFn = function() { };', 'function myFn() { };', 'var myFn = function myName() { };', 'function() { } = var myFn;'], ans: 0 },
  { id: 'q4', q: 'What keyword is used inside a function to send a value back to the caller?', options: ['send', 'output', 'give', 'return'], ans: 3 },
  { id: 'q5', q: 'Can named functions be called before they are declared in the code?', options: ['No, never', 'Yes, due to Hoisting', 'Only if declared with "var"', 'Only inside strict mode'], ans: 1 }
];

export default function CoreJSDay5({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Inventory Manager State
  const [inventory, setInventory] = useState([]);
  const [invName, setInvName] = useState('');
  const [invQty, setInvQty] = useState('');

  // Shopping Cart State
  const [cart, setCart] = useState([]);
  
  // Interactive functions state
  const [squareInput, setSquareInput] = useState(5);
  const [squareOutput, setSquareOutput] = useState(25);
  const [arrowInputA, setArrowInputA] = useState(10);
  const [arrowInputB, setArrowInputB] = useState(20);
  const [arrowOutput, setArrowOutput] = useState(30);

  // Playground state
  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`// Named function example
function sayHello(name) {
  return "Hello, " + name + "! Welcome to Day 5.";
}

var greeting = sayHello("Student");
console.log(greeting);`);
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
    onNavigate('core_js_day5', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inventory Manager functions
  const addInventoryItem = () => {
    const name = invName.trim();
    const qty = parseInt(invQty, 10);
    if (name === '' || isNaN(qty) || qty <= 0) {
      alert('Please enter valid item details.');
      return;
    }
    setInventory(prev => {
      const existing = prev.find(item => item.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        return prev.map(item => item.name.toLowerCase() === name.toLowerCase() ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { name, qty }];
    });
    setInvName('');
    setInvQty('');
  };

  const deleteInventoryItem = (index) => {
    setInventory(prev => prev.filter((_, i) => i !== index));
  };

  // Shopping Cart functions
  const addToCart = (name, price) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === name);
      if (existing) {
        return prev.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { name, price, quantity: 1 }];
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
    if (name === 'named') {
      setEditorCode(`// 1. Named Function
function calculateDiscount(price, discountRate) {
  var savings = price * discountRate;
  return price - savings;
}

var finalPrice = calculateDiscount(100, 0.2); // 20% discount
console.log("Final Price: $" + finalPrice);`);
    } else if (name === 'anonymous') {
      setEditorCode(`// 2. Anonymous Function assigned to variable
var multiply = function(x, y) {
  return x * y;
};

console.log("Result of multiplication: " + multiply(6, 7));`);
    } else if (name === 'arrow') {
      setEditorCode(`// 3. Arrow Function (ES6)
const isEven = (num) => num % 2 === 0;

console.log("Is 4 even? " + isEven(4));
console.log("Is 7 even? " + isEven(7));`);
    } else if (name === 'iife') {
      setEditorCode(`// 4. IIFE (Immediately Invoked Function Expression)
(function() {
  var privateMessage = "This variable is secure inside the IIFE scope!";
  console.log(privateMessage);
})();

// console.log(privateMessage); // ReferenceError! (safe and encapsulated)`);
    } else if (name === 'inventory') {
      setEditorCode(`// Complete JS code logic for Inventory Manager
var inventory = [];

function addItem(name, qty) {
  var existing = inventory.find(function(item) {
    return item.name.toLowerCase() === name.toLowerCase();
  });
  if (existing) {
    existing.qty += qty;
  } else {
    inventory.push({ name: name, qty: qty });
  }
}

addItem("Notebooks", 15);
addItem("Pens", 20);
addItem("Notebooks", 5); // increases quantity of Notebooks

console.log("Current Inventory:");
inventory.forEach(function(item) {
  console.log(item.name + " - Quantity: " + item.qty);
});`);
    } else if (name === 'cart') {
      setEditorCode(`// Complete JS code logic for Shopping Cart
var cart = [];

function addToCart(name, price) {
  var existing = cart.find(function(item) {
    return item.name === name;
  });
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }
}

addToCart("Product 1", 10);
addToCart("Product 2", 15);
addToCart("Product 1", 10); // increments quantity

var total = 0;
console.log("Shopping Cart Receipt:");
cart.forEach(function(item) {
  var itemCost = item.price * item.quantity;
  total += itemCost;
  console.log(item.name + " x" + item.quantity + " - $" + itemCost);
});
console.log("Total Cost: $" + total);`);
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
        <Section key="intro" eyebrow="Day 5 • JavaScript Functions" title="Functions in JavaScript">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              A <strong>function</strong> is a reusable block of code designed to perform a particular task. It is executed (called or invoked) when something else triggers it. Functions are the fundamental building blocks of JavaScript applications, allowing us to write clean, modular, and DRY (Don't Repeat Yourself) code.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Why Do We Need Functions?</h3>
            <ul style={{ color: '#475569', lineHeight: 1.8, paddingLeft: '1.2rem', marginBottom: '2rem' }}>
              <li><strong>Reusability:</strong> Define code once, use it multiple times.</li>
              <li><strong>Abstraction:</strong> Perform complex tasks without needing to know the exact internal implementation.</li>
              <li><strong>Organization:</strong> Divide programs into smaller, more manageable sub-units.</li>
            </ul>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Basic Syntax &amp; Execution</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Let's break down the core components of creating and using functions:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>1. Function Declaration</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Creating a function is called <strong>declaring</strong> or <strong>defining</strong> a function. We use the <code>function</code> keyword, followed by a name, parentheses for optional parameters, and curly braces for the code block.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`function sayHello() {
  console.log("Hello, World!");
}`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>2. Calling a Function</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Declaring a function does not execute it. To run the code, we must <strong>call</strong> (or <strong>invoke</strong>) the function by writing its name followed by parentheses.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`// Call the function
sayHello();`} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>3. Function without Parameters</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Functions can be written without parameters. These perform the exact same set of steps every single time they are called.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`function printHeader() {
  console.log("--- WELCOME TO MY SITE ---");
}

printHeader(); // Prints header line`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '0.5rem', fontSize: '1rem' }}>4. Function with Parameters</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  To make functions dynamic, we pass values. <strong>Parameters</strong> act as variables inside the function definition. <strong>Arguments</strong> are the actual values passed during invocation.
                </p>
                <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`// 'name' and 'age' are parameters
function printProfile(name, age) {
  console.log(name + " is " + age + " years old.");
}

// "John" and 25 are arguments
printProfile("John", 25);`} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('function_types')}>
              Next: Types of Functions →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: FUNCTION TYPES ─────────── */}
      {activeTab === 'function_types' && (
        <Section key="function_types" eyebrow="Day 5 • Types" title="Types of Functions">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>1. Named Functions</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              A named function is declared with a specific name. These are <strong>hoisted</strong>, meaning they can be called before they are declared in the code.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`function getSquare(num) {
  return num * num;
}`} />
            </div>
            {/* Interactive Calculator */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: '#475569' }}>Test getSquare:</span>
              <input type="number" value={squareInput} onChange={e => {
                const val = parseInt(e.target.value, 10);
                setSquareInput(e.target.value);
                if (!isNaN(val)) setSquareOutput(val * val);
              }} style={{ width: '80px', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center' }} />
              <span style={{ fontWeight: 700, color: '#ca8a04' }}>Output: {squareOutput}</span>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>2. Anonymous Functions</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              An anonymous function is a function without a name. It is typically assigned to a variable or passed as an argument. They are <strong>not hoisted</strong>.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`var add = function(a, b) {
  return a + b;
};`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>3. Arrow Functions</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Introduced in ES6, arrow functions offer a shorter syntax. They do not bind their own `this` keyword.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`const sum = (a, b) => a + b;`} />
            </div>
            {/* Interactive Arrow Test */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, color: '#475569' }}>Test sum(a, b):</span>
              <input type="number" value={arrowInputA} onChange={e => {
                const a = parseInt(e.target.value, 10);
                const b = parseInt(arrowInputB, 10);
                setArrowInputA(e.target.value);
                if (!isNaN(a) && !isNaN(b)) setArrowOutput(a + b);
              }} style={{ width: '80px', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center' }} />
              <span>+</span>
              <input type="number" value={arrowInputB} onChange={e => {
                const a = parseInt(arrowInputA, 10);
                const b = parseInt(e.target.value, 10);
                setArrowInputB(e.target.value);
                if (!isNaN(a) && !isNaN(b)) setArrowOutput(a + b);
              }} style={{ width: '80px', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center' }} />
              <span style={{ fontWeight: 700, color: '#ca8a04' }}>Output: {arrowOutput}</span>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>4. IIFE (Immediately Invoked Function Expressions)</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              An IIFE is a function that runs immediately as soon as it is defined. It is used to create local scope and prevent global namespace pollution.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`(function() {
  console.log("Runs immediately!");
})();`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'intro')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('inventory_manager')}>Next: Inventory Manager Project →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: INVENTORY MANAGER ─────────────────── */}
      {activeTab === 'inventory_manager' && (
        <Section key="inventory_manager" eyebrow="Day 5 • Project" title="Inventory Manager Program">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This project is built using functions to add, track, update and delete items from an inventory storage array list.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' }}>
              {/* App View */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #28a745', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: '#28a745', marginBottom: '1.2rem', textAlign: 'center', fontSize: '1.2rem' }}>📦 Store Inventory Manager</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input type="text" placeholder="Item Name (e.g. Pens)" value={invName} onChange={e => setInvName(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  <input type="number" placeholder="Quantity" value={invQty} onChange={e => setInvQty(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  <button onClick={addInventoryItem} style={{ padding: '0.6rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Add Item
                  </button>
                </div>

                <h5 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.4rem', color: '#333' }}>Stock Listing</h5>
                {inventory.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', margin: '1rem 0' }}>No items in inventory. Add one above!</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0' }}>
                    {inventory.map((item, index) => (
                      <li key={index} style={{ background: '#f8fafc', padding: '0.5rem 0.75rem', marginBottom: '5px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                        <span><strong>{item.name}</strong> (Qty: {item.qty})</span>
                        <button onClick={() => deleteInventoryItem(index)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Code View */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Inventory JavaScript Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '350px' }}>
                  <SyntaxHighlighter code={`// 1. Initial State
let inventory = [];

// 2. Function to Add / Increment Items
function addItem(name, qty) {
  name = name.trim();
  qty = parseInt(qty);
  
  if (name === '' || isNaN(qty) || qty <= 0) {
    alert('Please enter valid item details.');
    return;
  }

  // Find if item already exists
  const existingItem = inventory.find(item => 
    item.name.toLowerCase() === name.toLowerCase()
  );

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    inventory.push({ name, qty });
  }
}

// 3. Function to Delete Item
function deleteItem(index) {
  inventory.splice(index, 1);
}`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'function_types')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('shopping_cart')}>Next: Shopping Cart Project →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: SHOPPING CART ─────────────────────────── */}
      {activeTab === 'shopping_cart' && (
        <Section key="shopping_cart" eyebrow="Day 5 • Project" title="Shopping Cart Program">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This project uses functions to manage shopping cart items, calculating totals and tracking quantities dynamically.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' }}>
              {/* App View */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #007bff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: '#007bff', marginBottom: '1.2rem', textAlign: 'center', fontSize: '1.2rem' }}>🛒 Store Shopping Cart</h4>
                
                {/* Product Catalog */}
                <h5 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Available Products</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[
                    { name: 'Product 1', price: 10 },
                    { name: 'Product 2', price: 15 },
                    { name: 'Product 3', price: 20 },
                  ].map(prod => (
                    <div key={prod.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.75rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
                      <span>{prod.name} (${prod.price})</span>
                      <button onClick={() => addToCart(prod.name, prod.price)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Output */}
                <h5 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.4rem', color: '#333', margin: 0 }}>Items in Cart</h5>
                {cart.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', margin: '1rem 0' }}>Cart is empty.</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0' }}>
                    {cart.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.3rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span>{item.name} x{item.quantity}</span>
                        <span style={{ fontWeight: 600, color: '#1e40af' }}>${item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div style={{ borderTop: '2px solid #eee', paddingTop: '0.6rem', textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
                  Total: ${getCartTotal()}
                </div>
              </div>

              {/* Code View */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Shopping Cart Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '350px' }}>
                  <SyntaxHighlighter code={`// 1. Initial State
let cart = [];

// 2. Add to Cart function
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
}

// 3. Calculate Total cost
function getCartTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'inventory_manager')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Write, edit and run JavaScript function declarations live in the sandbox:
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['named',     '➕ Named Function'],
                ['anonymous', '📝 Anonymous Function'],
                ['arrow',     '🏹 Arrow Function'],
                ['iife',      '🔁 IIFE block'],
                ['inventory', '📦 Inventory Manager'],
                ['cart',      '🛒 Shopping Cart'],
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
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'shopping_cart')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 5 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 5 • Assessment" title="Day 5 Assessment — Functions">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Mistakes with Functions
            </h3>
            {[
              { mistake: 'Forgetting to "return" a value', code: `function multiply(a, b) {\n  var result = a * b;\n  // ❌ Missing return statement!\n}\nvar val = multiply(2, 5); // val is undefined!` },
              { mistake: 'Confusing parameters and arguments', code: `// Parameters are placeholders defined in function declaration:\nfunction sum(x, y) { ... }\n\n// Arguments are actual values passed in function call:\nsum(10, 20);` },
              { mistake: 'Hoisting issues with expressions',   code: `// This works (function declaration is hoisted):\nsayHi();\nfunction sayHi() { console.log("Hi!"); }\n\n// This throws TypeError (function expression is not hoisted):\nsayHello();\nvar sayHello = function() { console.log("Hello!"); };` },
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
              <FileText size={20} /> Day 5 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Write a named function `celsiusToFahrenheit` that converts a temperature and returns it.</li>
              <li>Create an anonymous function assigned to a variable `greet` that takes a name and prints a welcome message.</li>
              <li>Convert the `greet` function from above into a modern ES6 arrow function.</li>
              <li>Write an IIFE that calculates the area of a circle and prints the result inside the console automatically.</li>
              <li>Extend the **Inventory Manager** program to keep track of product prices as well as quantities.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
