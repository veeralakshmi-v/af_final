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
        <Section key="function_types" eyebrow="Day 5 • Types" title="Types of Functions in JavaScript">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>1. Function Declaration (Named Function)</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              Defined with the <code>function</code> keyword and a mandatory identifier name. Function Declarations are <strong>fully hoisted</strong>, meaning they can be invoked anywhere in their scope, even <em>before</em> their declaration line in the source code.
            </p>
            
            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>function functionName(param1, param2) &#123; /* code */ return result; &#125;</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Function Declaration</title>
</head>
<body>
  <h2>1. Function Declaration (Named Function)</h2>
  <script>
    // Hoisted invocation (Works before declaration!)
    document.write("<p>Square of 5: " + getSquare(5) + "</p>");

    function getSquare(num) {
      return num * num;
    }
  </script>
</body>
</html>`} />
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
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>2. Function Expression (Anonymous &amp; Named Expressions)</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              A function defined inside an expression (typically assigned to a variable). Unlike declarations, Function Expressions are <strong>not hoisted as callable functions</strong>. You must define them before invoking them.
            </p>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>var variableName = function(param1, param2) &#123; /* code */ return result; &#125;;</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Function Expression</title>
</head>
<body>
  <h2>2. Function Expression</h2>
  <script>
    // Must be defined BEFORE calling!
    var addNumbers = function(a, b) {
      return a + b;
    };

    document.write("<p>Sum (10 + 20): " + addNumbers(10, 20) + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>3. Arrow Functions (ES6)</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              Introduced in ES6, arrow functions offer a compact syntax using <code>=&gt;</code>. Key properties: they inherit <code>this</code> lexically from their enclosing parent scope, do not create their own <code>arguments</code> object, and cannot be used as constructors with <code>new</code>.
            </p>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>const funcName = (param1, param2) =&gt; &#123; return expression; &#125;; // Or implicit: const fn = x =&gt; x * 2;</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Arrow Functions</title>
</head>
<body>
  <h2>3. Arrow Functions (ES6)</h2>
  <script>
    const multiply = (a, b) => a * b;
    const double = x => x * 2;

    document.write("<p>Product (4 x 5): " + multiply(4, 5) + "</p>");
    document.write("<p>Double of 7: " + double(7) + "</p>");
  </script>
</body>
</html>`} />
            </div>
            {/* Interactive Arrow Test */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, color: '#475569' }}>Test multiply(a, b):</span>
              <input type="number" value={arrowInputA} onChange={e => {
                const a = parseInt(e.target.value, 10);
                const b = parseInt(arrowInputB, 10);
                setArrowInputA(e.target.value);
                if (!isNaN(a) && !isNaN(b)) setArrowOutput(a * b);
              }} style={{ width: '80px', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center' }} />
              <span>×</span>
              <input type="number" value={arrowInputB} onChange={e => {
                const a = parseInt(arrowInputA, 10);
                const b = parseInt(e.target.value, 10);
                setArrowInputB(e.target.value);
                if (!isNaN(a) && !isNaN(b)) setArrowOutput(a * b);
              }} style={{ width: '80px', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', textAlign: 'center' }} />
              <span style={{ fontWeight: 700, color: '#ca8a04' }}>Output: {arrowOutput}</span>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>4. IIFE (Immediately Invoked Function Expressions)</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              An IIFE is a function that executes immediately upon creation. Wrapped inside parentheses <code>(function() &#123;...&#125;)()</code>, it creates a private lexical scope to prevent global variable pollution.
            </p>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>(function(arg1) &#123; /* private scope */ &#125;)(val1);</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>IIFE Demo</title>
</head>
<body>
  <h2>4. Immediately Invoked Function Expression</h2>
  <script>
    (function(appName) {
      var secretToken = "AUTH_998877";
      document.write("<p>Initialized: " + appName + " (Token secured in local scope)</p>");
    })("AlphaFly LMS");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>5. Anonymous Functions</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              An Anonymous Function is a function declared without a name identifier. They are commonly passed inline as callback arguments or assigned to event handlers.
            </p>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>function(param1) &#123; /* no name identifier */ &#125;</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Anonymous Functions</title>
</head>
<body>
  <h2>5. Anonymous Functions</h2>
  <script>
    var numbers = [1, 2, 3, 4];
    
    // Anonymous function passed as array callback
    var doubled = numbers.map(function(num) {
      return num * 2;
    });

    document.write("<p>Doubled Numbers: " + doubled.join(", ") + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>6. Callback Functions &amp; Higher-Order Functions (HOF)</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              A <strong>Callback Function</strong> is a function passed as an argument into another function. A <strong>Higher-Order Function</strong> is a function that accepts a function as a parameter or returns a function.
            </p>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>function higherOrder(data, callbackFn) &#123; callbackFn(data); &#125;</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Callback &amp; HOF</title>
</head>
<body>
  <h2>6. Callback &amp; Higher-Order Functions</h2>
  <script>
    // Higher-Order Function accepting a callback function
    function processUser(name, callback) {
      document.write("<p>Processing record for: " + name + "</p>");
      callback(name);
    }

    // Callback Function
    function issueCertificate(studentName) {
      document.write("<p style='color:green; font-weight:bold;'>Certificate Issued to " + studentName + "! 🎓</p>");
    }

    processUser("Kavya", issueCertificate);
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>7. Constructor Functions</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              A Constructor Function is used with the <code>new</code> operator to instantiate object instances. Its name starts with a capital letter by convention, and <code>this</code> points to the new object instance created.
            </p>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>function ClassName(p1) &#123; this.p1 = p1; &#125;; const obj = new ClassName(val);</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Constructor Functions</title>
</head>
<body>
  <h2>7. Constructor Functions</h2>
  <script>
    function Student(name, course) {
      this.name = name;
      this.course = course;
      this.getDetails = function() {
        return this.name + " enrolled in " + this.course;
      };
    }

    var student1 = new Student("Alex", "Vanilla JavaScript");
    document.write("<p>Student Info: " + student1.getDetails() + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>8. Generator Functions (ES6 function*)</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              Generator Functions (declared with <code>function*</code>) can pause execution using <code>yield</code> and resume later when <code>.next()</code> is called on the iterator object.
            </p>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>function* generatorName() &#123; yield value1; yield value2; &#125;</code>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Generator Functions</title>
</head>
<body>
  <h2>8. Generator Functions (function*)</h2>
  <script>
    function* idGenerator() {
      var id = 101;
      while (id <= 103) {
        yield id++;
      }
    }

    var gen = idGenerator();
    document.write("<p>ID 1: " + gen.next().value + "</p>");
    document.write("<p>ID 2: " + gen.next().value + "</p>");
    document.write("<p>ID 3: " + gen.next().value + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'intro')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('rest_spread')}>Next: Rest &amp; Spread Operators →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: REST & SPREAD OPERATORS ────────── */}
      {activeTab === 'rest_spread' && (
        <Section key="rest_spread" eyebrow="Day 5 • ES6" title="Rest &amp; Spread Operators (... syntax)">
          
          {/* 1. Rest Operator */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>1. The Rest Operator (...rest) — "Gathering / Packing Items"</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              The <strong>Rest operator</strong> allows a function to accept an indefinite number of arguments as an array. It gathers individual loose elements together into a <strong>single array parameter</strong>.
            </p>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.3rem' }}>💡 Real-Time Analogy (Packing Loose Clothes into a Suitcase):</strong>
              <p style={{ color: '#1e3a8a', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Imagine packing for a trip. You put your passport into your pocket, and then gather all <strong>the REST of your loose clothes, shoes, and chargers</strong> together into <strong>one single travel suitcase (an Array)</strong>.
              </p>
            </div>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Rest Operator Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>function packLuggage(passport, ...suitcaseItems) &#123; /* suitcaseItems is an Array */ &#125;</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Rest Operator Demo</title>
</head>
<body>
  <h2>Rest Operator (...rest)</h2>

  <script>
    // 1. Function Rest Parameters (Gathers loose prices into an array)
    function calculateTotal(discount, ...prices) {
      var sum = prices.reduce(function(acc, curr) { return acc + curr; }, 0);
      var finalPrice = sum - discount;
      document.write("<p>Subtotal: $" + sum + " | Final (after $" + discount + " off): $" + finalPrice + "</p>");
    }

    calculateTotal(15, 100, 50, 25); // discount=15, prices=[100, 50, 25]

    // 2. Destructuring with Rest Operator
    var scores = [95, 88, 72, 64, 50];
    var [topper, runnerUp, ...remainingScores] = scores;

    document.write("<p>1st Place: " + topper + " | 2nd Place: " + runnerUp + "</p>");
    document.write("<p>Other Competitors: " + remainingScores.join(", ") + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          {/* 2. Spread Operator */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>2. The Spread Operator (...spread) — "Unpacking / Spreading Items Out"</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              The <strong>Spread operator</strong> takes an existing array or object and <strong>unpacks / spreads out</strong> its individual elements into separate values.
            </p>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <strong style={{ color: '#166534', display: 'block', marginBottom: '0.3rem' }}>💡 Real-Time Analogy (Unpacking Suitcase on Hotel Bed / Spreading Toppings):</strong>
              <p style={{ color: '#14532d', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                When you arrive at your hotel, you open your zipped suitcase and <strong>spread out all individual items</strong> onto the bed! Or when baking pizza, you take a box of toppings and <strong>spread them out</strong> over the pizza base.
              </p>
            </div>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Spread Operator Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>const copyArray = [...originalArray]; const mergedObj = &#123; ...obj1, ...obj2 &#125;; Math.max(...numbers);</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Spread Operator Demo</title>
</head>
<body>
  <h2>Spread Operator (...spread)</h2>

  <script>
    // 1. Unpacking Array Elements for Math.max()
    var marks = [78, 92, 85, 99, 81];
    var highest = Math.max(...marks);
    document.write("<p>Highest Mark: " + highest + "</p>");

    // 2. Merging Arrays with Spread
    var frontend = ["HTML", "CSS", "JavaScript"];
    var backend = ["Node.js", "Python", "SQL"];
    var fullstack = [...frontend, ...backend, "Git & GitHub"];

    document.write("<p>Full Stack Tech Stack: " + fullstack.join(" &rarr; ") + "</p>");

    // 3. Merging Objects with Spread
    var defaultSettings = { theme: "light", font: "Inter" };
    var userSettings = { theme: "dark" };
    var finalConfig = { ...defaultSettings, ...userSettings, version: "2.0" };

    document.write("<p>Final Theme Config: " + finalConfig.theme + " (Font: " + finalConfig.font + ")</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          {/* ⚖️ Comparison Table: Rest vs Spread */}
          <div className="panel" style={{ marginBottom: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚖️ Difference Between Rest Operator &amp; Spread Operator
            </h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1rem' }}>
              Although both operators share the exact same <code>...</code> syntax, they perform opposite operations depending on where they are used:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#fff', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 1rem', border: '1px solid #334155' }}>Feature</th>
                    <th style={{ padding: '0.75rem 1rem', border: '1px solid #334155' }}>Rest Operator (<code>...rest</code>)</th>
                    <th style={{ padding: '0.75rem 1rem', border: '1px solid #334155' }}>Spread Operator (<code>...spread</code>)</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#334155' }}>
                  <tr style={{ background: '#fff' }}>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>Core Purpose</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}><strong>Packs / Gathers</strong> multiple individual values into a single array.</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}><strong>Unpacks / Expands</strong> an iterable array or object into individual elements.</td>
                  </tr>
                  <tr style={{ background: '#f8fafc' }}>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>Where Used</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}>Function parameter definitions &amp; left-hand side destructuring.</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}>Function invocation arguments, array literals, &amp; object literals.</td>
                  </tr>
                  <tr style={{ background: '#fff' }}>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>Direction</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}>Many elements &rarr; 1 Array</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}>1 Array / Object &rarr; Many individual elements</td>
                  </tr>
                  <tr style={{ background: '#f8fafc' }}>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>Positional Rule</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}>Must be the <strong>last parameter</strong> in a function declaration.</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}>Can appear <strong>anywhere</strong> inside argument lists or array/object literals.</td>
                  </tr>
                  <tr style={{ background: '#fff' }}>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontWeight: 700 }}>Code Example</td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem' }}><code>function sum(...nums) &#123; &#125;</code></td>
                    <td style={{ padding: '0.75rem 1rem', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem' }}><code>Math.max(...numsArray)</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'function_types')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('array_methods')}>Next: map(), filter() &amp; reduce() →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: BUILT-IN FUNCTIONS (map, filter, reduce) ────────── */}
      {activeTab === 'array_methods' && (
        <Section key="array_methods" eyebrow="Day 5 • Built-in Methods" title="Built-in Array Methods: map(), filter() &amp; reduce()">
          
          {/* 1. map() */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>1. map() Method — "Transform Every Item in an Array"</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              The <code>map()</code> method loops through an array, runs a transformation function on <strong>every single item</strong>, and outputs a <strong>brand new array</strong> containing all the converted values.
            </p>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.3rem' }}>💡 Real-World Analogy (Currency Converter):</strong>
              <p style={{ color: '#1e3a8a', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Imagine putting an array of USD prices <code>[10, 25, 50]</code> into a currency exchange machine. <code>map()</code> multiplies every bill by 83 to return a new array of INR prices: <code>[830, 2075, 4150]</code>.
              </p>
            </div>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Easy Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>var newArray = oldArray.map(function(item) &#123; return item * 2; &#125;);</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Array map() Demo</title>
</head>
<body>
  <h2>Array map() Method</h2>

  <script>
    var pricesInUSD = [10, 25, 50, 100];
    var exchangeRate = 83; // 1 USD = 83 INR

    // Transform USD prices to INR prices
    var pricesInINR = pricesInUSD.map(function(usd) {
      return usd * exchangeRate;
    });

    document.write("<p>USD Prices: $" + pricesInUSD.join(", $") + "</p>");
    document.write("<p style='color:green;'>INR Prices: ₹" + pricesInINR.join(", ₹") + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          {/* 2. filter() */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>2. filter() Method — "Select Only Items That Match a Rule"</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              The <code>filter()</code> method checks every item in an array using a condition rule. Items that pass the test (where rule returns <code>true</code>) are kept in a <strong>new filtered array</strong>, while failing items are left behind.
            </p>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <strong style={{ color: '#166534', display: 'block', marginBottom: '0.3rem' }}>💡 Real-World Analogy (Quality Check / Exam Pass Filter):</strong>
              <p style={{ color: '#14532d', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Think of an exam mark sheet <code>[45, 82, 38, 91, 55]</code>. <code>filter()</code> checks each score and keeps ONLY scores that are <code>&ge; 50</code>, producing a new array of passing scores: <code>[82, 91, 55]</code>.
              </p>
            </div>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Easy Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>var filteredArray = numbers.filter(function(num) &#123; return num &gt;= 50; &#125;);</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Array filter() Demo</title>
</head>
<body>
  <h2>Array filter() Method</h2>

  <script>
    var marks = [45, 82, 38, 91, 55, 29, 74];

    // Filter students who passed (mark >= 50)
    var passedMarks = marks.filter(function(score) {
      return score >= 50;
    });

    document.write("<p>All Scores: " + marks.join(", ") + "</p>");
    document.write("<p style='color:green; font-weight:bold;'>Passing Scores (&ge; 50): " + passedMarks.join(", ") + "</p>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          {/* 3. reduce() */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>3. reduce() Method — "Combine All Array Items into 1 Single Total Result"</h3>
            <p style={{ color: '#475569', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              The <code>reduce()</code> method takes an entire array of elements and rolls them up step-by-step into <strong>one single final result</strong> (such as a total bill sum, grand total, or combined string).
            </p>

            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <strong style={{ color: '#c2410c', display: 'block', marginBottom: '0.3rem' }}>💡 Real-World Analogy (Shopping Cart Cash Register):</strong>
              <p style={{ color: '#9a3412', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Imagine a cash register scanning items in your shopping cart. You start with <code>0</code> (initial value). As each item price is scanned (<code>60000</code>, <code>1200</code>, <code>2500</code>), it gets added to your running <code>total</code> accumulator, giving <strong>1 final bill total: ₹63,700</strong>.
              </p>
            </div>

            <div style={{ background: '#f1f5f9', borderLeft: '4px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>📌 Easy Syntax Blueprint:</span>
              <code style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>var total = prices.reduce(function(accumulator, item) &#123; return accumulator + item; &#125;, 0);</code>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem' }}>
              <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Array reduce() Demo</title>
</head>
<body>
  <h2>Array reduce() Method</h2>

  <script>
    var cartItems = [
      { product: "Laptop", price: 60000 },
      { product: "Mouse", price: 1200 },
      { product: "Keyboard", price: 2500 }
    ];

    // Calculate grand total using reduce
    var grandTotal = cartItems.reduce(function(total, item) {
      return total + item.price;
    }, 0); // 0 is starting initial total accumulator

    document.write("<h3>Shopping Cart Receipt</h3>");
    cartItems.forEach(function(item) {
      document.write("<p>" + item.product + ": ₹" + item.price + "</p>");
    });
    document.write("<h4 style='color:blue;'>Grand Total: ₹" + grandTotal + "</h4>");
  </script>
</body>
</html>`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'rest_spread')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('inventory_manager')}>Next: Inventory Manager Project →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: INVENTORY MANAGER ─────────────────── */}
      {activeTab === 'inventory_manager' && (
        <Section key="inventory_manager" eyebrow="Day 5 • Project" title="Inventory Manager Program">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This project is built using functions to add, track, update and delete items from an inventory storage array list.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
              {/* App View */}
              <div style={{ flex: '1 1 360px', maxWidth: '460px', background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #28a745', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
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
              <div style={{ flex: '2 1 450px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Full Inventory HTML &amp; JS Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowX: 'auto', maxHeight: '500px', width: '100%', boxSizing: 'border-box' }}>
                  <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Store Inventory Manager</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f4f6f9; }
    .card { background: #fff; padding: 20px; border-radius: 8px; max-width: 500px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    input, button { padding: 10px; margin: 5px 0; width: 100%; box-sizing: border-box; border-radius: 4px; }
    input { border: 1px solid #ccc; }
    button { background: #28a745; color: white; border: none; font-weight: bold; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { background: #f8fafc; padding: 8px 12px; margin-bottom: 5px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
    .btn-del { background: #dc3545; width: auto; padding: 4px 8px; margin: 0; font-size: 0.8rem; }
  </style>
</head>
<body>

  <div class="card">
    <h2>📦 Store Inventory Manager</h2>
    <input type="text" id="itemName" placeholder="Item Name (e.g. Pens)">
    <input type="number" id="itemQty" placeholder="Quantity">
    <button onclick="addItem()">Add Item</button>

    <h3>Stock Listing</h3>
    <div id="displayArea"></div>
  </div>

  <script>
    // 1. Initial State
    var inventory = [];

    // 2. Render Function using DOM updates
    function renderInventory() {
      var html = "<ul>";
      if (inventory.length === 0) {
        html += "<p style='color:#777;'>No items in inventory.</p>";
      } else {
        for (var i = 0; i < inventory.length; i++) {
          html += "<li><span><strong>" + inventory[i].name + "</strong> (Qty: " + inventory[i].qty + ")</span> " +
                  "<button class='btn-del' onclick='deleteItem(" + i + ")'>Delete</button></li>";
        }
      }
      html += "</ul>";
      document.getElementById("displayArea").innerHTML = html;
    }

    // 3. Function to Add Item
    function addItem() {
      var name = document.getElementById("itemName").value.trim();
      var qty = parseInt(document.getElementById("itemQty").value, 10);

      if (name === "" || isNaN(qty) || qty <= 0) {
        alert("Please enter valid item details.");
        return;
      }

      var found = false;
      for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].name.toLowerCase() === name.toLowerCase()) {
          inventory[i].qty += qty;
          found = true;
          break;
        }
      }

      if (!found) {
        inventory.push({ name: name, qty: qty });
      }

      document.getElementById("itemName").value = "";
      document.getElementById("itemQty").value = "";
      renderInventory();
    }

    // 4. Function to Delete Item
    function deleteItem(index) {
      inventory.splice(index, 1);
      renderInventory();
    }

    // Initial render
    renderInventory();
  </script>
</body>
</html>`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day5', 'array_methods')}>← Back</button>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
              {/* App View */}
              <div style={{ flex: '1 1 360px', maxWidth: '460px', background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #007bff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
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
              <div style={{ flex: '2 1 450px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Full Shopping Cart HTML &amp; JS Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowX: 'auto', maxHeight: '500px', width: '100%', boxSizing: 'border-box' }}>
                  <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<head>
  <title>Store Shopping Cart</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f4f6f9; }
    .card { background: #fff; padding: 20px; border-radius: 8px; max-width: 450px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .prod { display: flex; justify-content: space-between; padding: 8px; background: #f8fafc; margin-bottom: 5px; border-radius: 4px; border: 1px solid #ddd; }
    button { background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
    .cart-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
    .total-box { font-weight: bold; font-size: 1.2rem; text-align: right; margin-top: 15px; color: #333; }
  </style>
</head>
<body>

  <div class="card">
    <h2>🛒 Store Shopping Cart</h2>

    <h3>Available Products</h3>
    <div class="prod"><span>Product 1 ($10)</span> <button onclick="addToCart('Product 1', 10)">Add to Cart</button></div>
    <div class="prod"><span>Product 2 ($15)</span> <button onclick="addToCart('Product 2', 15)">Add to Cart</button></div>
    <div class="prod"><span>Product 3 ($20)</span> <button onclick="addToCart('Product 3', 20)">Add to Cart</button></div>

    <h3>Items in Cart</h3>
    <div id="cartDisplay"></div>
    <div class="total-box" id="totalDisplay">Total: $0</div>
  </div>

  <script>
    // 1. Initial State
    var cart = [];

    // 2. Add to Cart Function
    function addToCart(name, price) {
      var existing = cart.find(function(item) { return item.name === name; });
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name: name, price: price, quantity: 1 });
      }
      renderCart();
    }

    // 3. Render Cart & Calculate Total
    function renderCart() {
      var displayArea = document.getElementById("cartDisplay");
      var totalArea = document.getElementById("totalDisplay");

      if (cart.length === 0) {
        displayArea.innerHTML = "<p style='color:#777;'>Cart is empty.</p>";
        totalArea.innerHTML = "Total: $0";
        return;
      }

      var html = "";
      var grandTotal = cart.reduce(function(acc, item) {
        return acc + (item.price * item.quantity);
      }, 0);

      cart.forEach(function(item) {
        html += "<div class='cart-item'><span>" + item.name + " x" + item.quantity + "</span>" +
                "<strong style='color:#007bff;'>$" + (item.price * item.quantity) + "</strong></div>";
      });

      displayArea.innerHTML = html;
      totalArea.innerHTML = "Total: $" + grandTotal;
    }

    // Initial render
    renderCart();
  </script>
</body>
</html>`} />
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

          {/* Topic-Wise Interview Questions */}
          <div className="panel" style={{ marginBottom: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
            <h3 style={{ marginBottom: '1.2rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💬 Day 5 Topic-Wise Technical Interview Questions & Answers
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Function Declaration vs Function Expression
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: How does hoisting differ between a Function Declaration and a Function Expression?</strong><br />
                  <strong>Answer:</strong> Function Declarations (<code>function foo() {}</code>) are fully hoisted with their implementation, allowing them to be called anywhere in their scope before definition. Function Expressions (<code>const foo = function() {}</code>) are subject to variable hoisting rules—if declared with <code>const</code>/<code>let</code>, calling them before definition throws a <code>ReferenceError</code> (TDZ).
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Arrow Functions & Lexical `this`
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What are the main differences between Arrow Functions and traditional functions regarding <code>this</code>, <code>arguments</code>, and <code>new</code> constructor calls?</strong><br />
                  <strong>Answer:</strong> Arrow functions do NOT have their own <code>this</code> binding (they inherit <code>this</code> lexically from their enclosing parent scope). They also lack the <code>arguments</code> object and cannot be invoked with <code>new</code> as constructors.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Pure Functions & High Order Functions (HOF)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What makes a function "Pure" and what defines a Higher-Order Function in JavaScript?</strong><br />
                  <strong>Answer:</strong> A Pure Function given the same input always produces the exact same output without side effects (like modifying global variables or external DOM state). A Higher-Order Function is a function that accepts another function as an argument, returns a function, or both.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Immediately Invoked Function Expressions (IIFE)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What is an IIFE (<code>(function() &#123; ... &#125;)()</code>) and why is it used?</strong><br />
                  <strong>Answer:</strong> An IIFE is a function that executes immediately upon creation. It creates an isolated, private scope that prevents internal variable declarations from polluting the global namespace.
                </p>
              </div>

              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Rest Parameters vs Arguments Object
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Q: What are the advantages of ES6 Rest parameters (<code>...args</code>) over the legacy <code>arguments</code> object?</strong><br />
                  <strong>Answer:</strong> Rest parameters (<code>...args</code>) gather trailing arguments into a true native Array (allowing methods like <code>.map()</code> or <code>.reduce()</code>), whereas <code>arguments</code> is an Array-like object without array methods. Rest parameters can also be used in arrow functions, unlike <code>arguments</code>.
                </p>
              </div>
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
