import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layers, List, Table, Terminal, ShieldAlert, Cpu, ArrowRight, BookOpen, Code, Sliders, PenTool, CheckCircle, Eye, FileCode2 } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

const Section = ({ id, eyebrow, title, children }) => (
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

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.5' }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        // Groups: 1=comment 2=string 3=htmlTag 4=keyword 5=literal 6=builtin 7=number 8=identifier 9=symbol
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment)         color = '#8b949e';
          else if (str)        color = '#a5d6ff';
          else if (htmlTag)    color = '#7ee787';
          else if (kw)       { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal)    color = '#d2a8ff';
          else if (builtin)    color = '#ffb454';
          else if (num)        color = '#79c0ff';
          else if (ident)      color = '#e1e4e8';
          else if (sym)        color = '#ff7b72';
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


export default function JSDay1({ activeTab, onNavigate }) {
  const [activeSubTab, setActiveSubTab] = useState('implicit');
  const [eqLhs, setEqLhs] = useState('5');
  const [eqRhs, setEqRhs] = useState('5_str');
  const [operator, setOperator] = useState('==');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);

  // E-commerce Sandbox variables
  const [itemName, setItemName] = useState('Premium Keyboard');
  const [itemPrice, setItemPrice] = useState(120);
  const [itemQty, setItemQty] = useState(2);
  const [taxRate, setTaxRate] = useState(8);
  const [discountAmt, setDiscountAmt] = useState(15);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [docWrites, setDocWrites] = useState([]);

  // Assignment states
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [assignmentValue, setAssignmentValue] = useState('');

  const handleContinue = (nextTabId) => {
    onNavigate('js_module1', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompile = () => {
    const logs = [];
    const writes = [];

    // Simulate variable storage
    const subtotal = Number(itemPrice) * Number(itemQty);
    const tax = subtotal * (Number(taxRate) / 100);
    const discount = Number(discountAmt);
    const total = subtotal + tax - discount;

    logs.push(`[System]: Initializing variable storage references...`);
    logs.push(`[Stack Memory]: Declared constant item = "${itemName}"`);
    logs.push(`[Stack Memory]: Declared subtotal = ${subtotal} (Price: ${itemPrice} * Qty: ${itemQty})`);
    logs.push(`[Stack Memory]: Calculated tax total = ${tax.toFixed(2)} (Tax Rate: ${taxRate}%)`);
    logs.push(`[Stack Memory]: Loaded discount value = ${discount}`);
    logs.push(`[Stack Memory]: Computed grand total = ${total.toFixed(2)}`);

    writes.push(`<h2>Invoice Receipt</h2>`);
    writes.push(`<p><strong>Item Purchased:</strong> ${itemName}</p>`);
    writes.push(`<p><strong>Quantity:</strong> ${itemQty}</p>`);
    writes.push(`<p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>`);
    writes.push(`<p><strong>Estimated Tax:</strong> $${tax.toFixed(2)}</p>`);
    writes.push(`<p><strong>Discount Applied:</strong> -$${discount.toFixed(2)}</p>`);
    writes.push(`<hr style="border-top: 1px dashed #cbd5e1" />`);
    writes.push(`<h3>Grand Total: $${total.toFixed(2)}</h3>`);

    setConsoleLogs(logs);
    setDocWrites(writes);
  };

  const handleQuizAnswer = (question, option) => {
    setQuizAnswers(prev => ({ ...prev, [question]: option }));
  };

  const renderComparisonResult = () => {
    let left = eqLhs === '5' ? 5 : '5';
    let right = eqRhs === '5' ? 5 : '5';
    let res = operator === '==' ? (left == right) : (left === right);
    return res ? 'true' : 'false';
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* INTRO */}
      {activeTab === 'intro_js' && (
        <Section key="intro_js" id="intro_js" eyebrow="Syllabus 01" title="Introduction to JavaScript">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>
              JavaScript (JS) is a high-level, interpreted programming language that conforms to the ECMAScript specification. Originally developed by Brendan Eich at Netscape in 1995 to make web pages interactive, it has evolved into the cornerstone of modern web development.
            </p>
            <p>
              Unlike HTML (which constructs structure) and CSS (which manages presentation), JavaScript acts as the **logic core** in the web browser, driving user interactions, updating document styles, and communicating asynchronously with web servers.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#fefcbf', border: '1px solid #fef08a', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#854d0e', display: 'flex', alignItems: 'center', gap: '6px' }}><Code size={16} /> Client-Side Scripting Cycle</h4>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#713f12', fontSize: '0.9rem' }}>
                  <li>HTML loads structure and static contents.</li>
                  <li>CSS maps layouts and background styles.</li>
                  <li>JavaScript intercepts clicks, submits, or scroll gestures.</li>
                  <li>JavaScript dynamically changes CSS variables or HTML text elements without full-page reloads.</li>
                </ol>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}><Cpu size={16} /> The JS Ecosystem</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#14532d' }}>
                  Today, JS is much more than client scripts:
                  <br />• <strong>Libraries</strong>: React, jQuery, Axios, Lodash.
                  <br />• <strong>Frameworks</strong>: Next.js, Vue, Express, NestJS.
                  <br />• <strong>Runtimes & Packages</strong>: Node.js, npm, yarn.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.8rem', marginTop: '2rem' }}>Historical Misconception: Java vs JavaScript</h3>
            <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderLeft: '4px solid #ca8a04', borderRadius: '4px 12px 12px 4px' }}>
              <p style={{ margin: 0, fontSize: '0.92rem' }}>
                JavaScript was marketed as a "complementary" companion language to Java. In reality, they are entirely distinct. Java is a compiled, statically typed class-based language, whereas JavaScript is an interpreted, dynamically typed prototype-based scripting language.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_variables')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* VARIABLES & OUTPUTS */}
      {activeTab === 'js_variables' && (
        <Section key="js_variables" id="js_variables" eyebrow="Syllabus 02" title="JavaScript Variables & Scopes">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Variables are named containers used to store data references. In modern JavaScript, we declare variables using three keywords:</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#e11d48' }}>var</h4>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  <li>Traditional declaration.</li>
                  <li><strong>Function-scoped</strong> or globally scoped.</li>
                  <li>Supports <strong>hoisting</strong> (can be accessed before declaration, returning <code>undefined</code>).</li>
                </ul>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb' }}>let</h4>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  <li>Modern declaration.</li>
                  <li><strong>Block-scoped</strong> (restricted to the enclosing curly braces <code>{`{}`}</code>).</li>
                  <li>Does not allow duplicate redeclarations in the same scope.</li>
                </ul>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>const</h4>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  <li>Block-scoped constant.</li>
                  <li>Requires immediate value initialization.</li>
                  <li>Cannot be reassigned (read-only reference).</li>
                </ul>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>🌍 Scope: Global, Function, and Block Scope</h3>
            <p>Scope defines where variables are accessible in your program. Let's study the three main scope categories with examples:</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>1. Global Scope</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.8rem 0' }}>
                  Variables declared outside any function or block. They are accessible from **anywhere** in your script (inside functions, conditions, or loops).
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`// Global declaration
let globalUser = "Alice";

function showUser() {
  console.log(globalUser); // Accessible inside function: "Alice"
}
showUser();
console.log(globalUser); // Accessible in global script: "Alice"`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>2. Function Scope</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.8rem 0' }}>
                  Variables declared inside a function block using <code>var</code>, <code>let</code>, or <code>const</code>. They are **only** accessible inside that specific function and invisible from the outside.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`function calculateArea() {
  var area = 150; // Function-scoped
  console.log(area); // Accessible: 150
}
calculateArea();
console.log(area); // Throws ReferenceError: area is not defined`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>3. Block Scope (let & const)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.8rem 0' }}>
                  Variables declared inside curly braces <code>{`{}`}</code> using <code>let</code> or <code>const</code> (e.g. inside `if` statements or `for` loops). **Caution:** Variables declared with <code>var</code> ignore block boundaries and hoist outside!
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`if (true) {
  let blockLet = "Restricted"; 
  const blockConst = "Also Restricted";
  var blockVar = "Leaked Outside!"; // var ignores block scope!
}
console.log(blockVar);   // Prints: "Leaked Outside!"
console.log(blockLet);   // Throws ReferenceError: blockLet is not defined
console.log(blockConst); // Throws ReferenceError: blockConst is not defined`} />
                </div>
              </div>
            </div>

            {/* NEW SUB-SECTION: console.log vs document.write */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>📟 console.log() vs document.write()</h3>
            <p>JavaScript provides multiple ways to output variables and results, each serving a different purpose:</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>console.log(value)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.8rem 0' }}>
                  Writes content directly to the browser's developer console (F12). Primarily used by developers for debugging diagnostics. It has no visual impact on the webpage document.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let count = 10;
console.log("Current count:", count);`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>document.write(value)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.8rem 0' }}>
                  Writes HTML text directly to the document structure. <strong>Warning:</strong> If called after the DOM finishes loading (e.g., inside an event click handler), it overwrites the entire webpage.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let username = "Bob";
document.write("<h1>Welcome " + username + "</h1>");`} />
                </div>
              </div>
            </div>

            {/* NEW SUB-SECTION: Value Retrieval and User Input */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>📥 Assigning & Getting User Inputs</h3>
            <p>In full stack applications, developers fetch values from users and store them inside variables:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#fefcbf', padding: '1.2rem', borderRadius: 12, border: '1px solid #fef08a' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#854d0e' }}>1. Using Window Prompts</h4>
                <p style={{ fontSize: '0.88rem', color: '#713f12', margin: '0 0 0.8rem 0' }}>
                  A blocking modal dialog that asks the user for a text input. It always returns the user input as a <strong>String</strong> (even if they type a number).
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`// Blocks thread until user submits
let age = prompt("Enter your age:");
console.log(typeof age); // "string"`} />
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: 12, border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>2. Using HTML DOM Nodes</h4>
                <p style={{ fontSize: '0.88rem', color: '#14532d', margin: '0 0 0.8rem 0' }}>
                  The standard web approach: targeting an HTML input field using its unique ID identifier and fetching the dynamic text value attribute on click.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`// Fetch from <input id="userEmail">
let email = document.getElementById("userEmail").value;
console.log("Logged email:", email);`} />
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_datatypes')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* DATA TYPES WITH COMPREHENSIVE EXAMPLES */}
      {activeTab === 'js_datatypes' && (
        <Section key="js_datatypes" id="js_datatypes" eyebrow="Syllabus 03" title="JavaScript Data Types in Depth">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>JavaScript is a **dynamically typed** language. In JS, values have types, not variables. A variable can hold a string, then be reassigned to hold a number. Under the hood, JavaScript organizes these values into two main categories: **Primitives** and **Non-Primitives** (Reference Types). These differ fundamentally in how they are stored and accessed in memory:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Primitive Types (Stack Memory)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>
                  Stored directly in the fast-access **Call Stack**. When you assign a primitive to a new variable, JavaScript copies the *actual literal value*. Primitives are immutable—they cannot be changed, only replaced.
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>Non-Primitive Types (Heap Memory)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>
                  Stored in the larger **Heap Memory**. The variable in the stack only holds a *reference pointer* (memory address) to where the object resides. Modifying an object changes its heap structure directly; copying it only copies the pointer reference.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1.2rem' }}>1. Primitive Data Types (The 7 Pillars)</h3>
            <p>JavaScript defines exactly seven primitive data types. Let's study each with comprehensive details:</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Number */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>• Number</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  All numbers in JavaScript are stored as double-precision 64-bit binary format (IEEE 754), meaning there is no distinction between integers and decimals. Number also includes special values: <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code> (Not-a-Number, which represents failed arithmetic).
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let decimal = 19.99;
let integer = 42;
let invalidCalculation = 0 / 0; // returns NaN

console.log(typeof decimal);            // "number"
console.log(typeof invalidCalculation); // "number" (Yes, NaN is technically a number!)`} />
                </div>
              </div>

              {/* BigInt */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>• BigInt</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  Standard Numbers cannot safely represent integers greater than <code>9007199254740991</code> (Number.MAX_SAFE_INTEGER). BigInt was introduced to represent arbitrarily large integers for precise calculations (e.g. cryptography or ledger database IDs). Created by appending an <code>n</code> to the integer.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let maxSafe = 9007199254740991n; // Appending n makes it a BigInt
let result = maxSafe + 2n;

console.log(result);         // 9007199254740993n
console.log(typeof result);  // "bigint"`} />
                </div>
              </div>

              {/* String */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>• String</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  Represents a sequence of Unicode characters. Strings are immutable in JavaScript (methods like <code>.toUpperCase()</code> return a *new* string rather than mutating the original). Declared using single quotes, double quotes, or backticks (which allow multi-line layout blocks and template interpolation).
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let name = "Alice";
let greeting = \`Welcome, \${name}!\`; // Template literal interpolation
let multiline = \`Line one
Line two\`;

console.log(typeof greeting); // "string"`} />
                </div>
              </div>

              {/* Boolean */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>• Boolean</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  Represents logical entity values. It can only contain two states: <code>true</code> and <code>false</code>. Used extensively inside conditional expressions (if-statements) to control code execution pathways.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let hasPaid = true;
let isEligible = 10 > 25; // evaluates to false

console.log(isEligible);       // false
console.log(typeof hasPaid);   // "boolean"`} />
                </div>
              </div>

              {/* Undefined */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>• Undefined</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  A default placeholder assigned automatically to variables that have been declared but not initialized with an explicit value. It means "value does not exist yet".
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let profilePic; // Declared but unassigned

console.log(profilePic);         // undefined
console.log(typeof profilePic);  // "undefined"`} />
                </div>
              </div>

              {/* Null */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>• Null</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  Represents the intentional absence of any object value. It is explicitly assigned by developers to represent "no object". **Historical Bug:** Running <code>typeof null</code> returns <code>"object"</code>. This is a famous bug from the first version of JS that was kept to avoid breaking existing websites.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let userSession = null; // Explicitly declared empty

console.log(userSession);         // null
console.log(typeof userSession);  // "object" (JavaScript historical bug!)`} />
                </div>
              </div>

              {/* Symbol */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>• Symbol</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  Introduced in ES6, Symbols are unique and immutable values. Each Symbol created has a completely isolated identity, even if they share the same descriptor string. Commonly used to declare non-colliding hidden keys in objects.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let key1 = Symbol("userId");
let key2 = Symbol("userId");

console.log(key1 === key2); // false (they are guaranteed unique!)
console.log(typeof key1);   // "symbol"`} />
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1.2rem' }}>2. Non-Primitive Data Types (Objects & Reference Types)</h3>
            <p>Non-primitive values represent structural models. Unlike primitives, they can hold multiple properties and are compared by reference memory location.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Object */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>• Object</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  A collection of key-value properties. Keys are strings or symbols, and values can be any datatype (including other objects or functions).
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let developer = {
  name: "Marcus",
  role: "Full Stack Engineer",
  skills: ["React", "Node", "SQL"]
};

console.log(developer.name);    // "Marcus"
console.log(typeof developer);   // "object"`} />
                </div>
              </div>

              {/* Array */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>• Array</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  Ordered list of values indexed by integers (starting from 0). In JavaScript, arrays are dynamic (they can grow/shrink in size) and can store different data types inside the same list. Technically, Arrays are a specialized subtype of Object.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let fruits = ["Apple", "Orange", 100, true]; // Mixed types allowed

console.log(fruits[1]);       // "Orange"
console.log(typeof fruits);    // "object" (Arrays inherit from Object)`} />
                </div>
              </div>

              {/* Function */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>• Function</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  Callable blocks of code containing statement sets. In JS, functions are **First-Class Citizens**—meaning they behave like any other variable. They can be stored in variables, passed as arguments to other functions, or returned.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`function square(num) {
  return num * num;
}
let runSquare = square;

console.log(runSquare(5));     // 25
console.log(typeof square);    // "function"`} />
                </div>
              </div>

              {/* Date */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>• Date Object</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  A built-in class used to work with date values, times, years, and timezone offsets. Dates are represented internally as milliseconds elapsed since the Unix Epoch (January 1, 1970).
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let current = new Date();
console.log(current.toDateString()); // e.g. "Wed Jul 29 2026"
console.log(typeof current);         // "object"`} />
                </div>
              </div>

              {/* RegExp */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>• RegExp (Regular Expression)</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                  A built-in object describing a pattern of characters. Used to execute search, replacement, or validation actions on string text.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let numberPattern = /\\d+/; // Match one or more digits
let testStr = "Order #342";

console.log(numberPattern.test(testStr)); // true
console.log(typeof numberPattern);        // "object"`} />
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_typeconversion')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* TYPE CONVERSION */}
      {activeTab === 'js_typeconversion' && (
        <Section key="js_typeconversion" id="js_typeconversion" eyebrow="Syllabus 04" title="JavaScript Type Conversion">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Since JavaScript is dynamically typed, it converts datatypes automatically when required (Implicit conversion), but also allows developers to perform it explicitly (Explicit conversion).</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Implicit Conversion (Coercion)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  Occurs automatically under the hood when mismatching data types undergo mathematical calculations.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let val = "5" + 2; // "52" (number coerced to string)
let diff = "5" - 2; // 3 (string coerced to number)
let prod = "5" * "2"; // 10 (both coerced to numbers)`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>Explicit Conversion (Type Casting)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  Performed intentionally by the developer using built-in constructors (e.g. <code>Number()</code>, <code>String()</code>, <code>Boolean()</code>).
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let age = Number("25"); // Converts string "25" to number 25
let str = String(100); // Converts number 100 to string "100"
let bool = Boolean(1); // Converts number 1 to boolean true`} />
                </div>
              </div>
            </div>

            {/* INTERACTIVE QUIZ SECTION */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>🧠 Variable Conversion Quiz</h3>
            <p>Select variables to test JavaScript comparison operator results:</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700 }}>Left Operand (LHS):</label>
                <select value={eqLhs} onChange={e => setEqLhs(e.target.value)} style={{ padding: '0.4rem 1rem', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                  <option value="5">5 (Number)</option>
                  <option value="5_str">"5" (String)</option>
                </select>

                <label style={{ fontSize: '0.9rem', fontWeight: 700 }}>Comparison Operator:</label>
                <select value={operator} onChange={e => setOperator(e.target.value)} style={{ padding: '0.4rem 1rem', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                  <option value="==">== (Loose Equality)</option>
                  <option value="===">=== (Strict Equality)</option>
                </select>

                <label style={{ fontSize: '0.9rem', fontWeight: 700 }}>Right Operand (RHS):</label>
                <select value={eqRhs} onChange={e => setEqRhs(e.target.value)} style={{ padding: '0.4rem 1rem', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                  <option value="5">5 (Number)</option>
                  <option value="5_str">"5" (String)</option>
                </select>
              </div>

              <div style={{ background: '#0f172a', color: '#34d399', padding: '1rem', borderRadius: 8, fontFamily: 'monospace', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Expression: {eqLhs === '5' ? '5' : '"5"'} {operator} {eqRhs === '5' ? '5' : '"5"'}</span>
                <span style={{ fontWeight: 'bold', color: renderComparisonResult() === 'true' ? '#34d399' : '#f87171' }}>Result: {renderComparisonResult()}</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_codedemo')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* CODE DEMO */}
      {activeTab === 'js_codedemo' && (
        <Section key="js_codedemo" id="js_codedemo" eyebrow="Syllabus 05" title="Live Coding: E-Commerce Variable Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Modify variables in the panel below to dynamically compile and execute invoice calculations using stack and heap reference principles.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ margin: 0, color: '#ca8a04' }}>Input Variables Configuration</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Item Name (String):</label>
                  <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 8 }} />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Price ($):</label>
                    <input type="number" value={itemPrice} onChange={e => setItemPrice(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 8 }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Quantity (Number):</label>
                    <input type="number" value={itemQty} onChange={e => setItemQty(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 8 }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Tax Rate (%):</label>
                    <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 8 }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Discount ($):</label>
                    <input type="number" value={discountAmt} onChange={e => setDiscountAmt(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 8 }} />
                  </div>
                </div>

                <button className="btn btn-primary" onClick={handleCompile} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04', marginTop: '1rem', fontWeight: 'bold' }}>
                  Compile and Run JS
                </button>
              </div>

              {/* OUTPUT DISPLAY */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, height: '180px', overflowY: 'auto' }}>
                  <h5 style={{ color: '#38bdf8', margin: '0 0 0.5rem 0', fontFamily: 'monospace' }}>Developer Console Output</h5>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {consoleLogs.length === 0 ? (
                      <span style={{ color: '#64748b' }}>Console is clear. Modify input fields and run.</span>
                    ) : (
                      consoleLogs.map((log, i) => <div key={i}>{log}</div>)
                    )}
                  </div>
                </div>

                <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: 12, border: '1px solid #e2e8f0', height: '220px', overflowY: 'auto' }}>
                  <h5 style={{ color: '#64748b', margin: '0 0 0.5rem 0' }}>Browser Webpage View</h5>
                  {docWrites.length === 0 ? (
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', paddingTop: '3rem' }}>Webpage document has not been written.</div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: docWrites.join('') }} style={{ color: '#1e293b' }} />
                  )}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '0.8rem' }}>💻 E-Commerce Sandbox Source Code</h3>
            <p>Below is the JavaScript source code that is executed under the hood when you click "Compile and Run JS". It maps the dynamic variables, runs standard arithmetic, logs to developer diagnostic console, and outputs elements to the page:</p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', overflowX: 'auto', marginBottom: '2rem' }}>
              <SyntaxHighlighter code={`// 1. Declaring Input Variables
let itemName = "${itemName}"; // String type
let itemPrice = ${itemPrice}; // Number type
let itemQty = ${itemQty}; // Number type
let taxRate = ${taxRate}; // Number type (percentage)
let discountAmt = ${discountAmt}; // Number type

// 2. Variable Storage & Computations
let subtotal = itemPrice * itemQty;
let tax = subtotal * (taxRate / 100);
let discount = discountAmt;
let total = subtotal + tax - discount;

// 3. Developer Console Output Logging
console.log("[System]: Initializing variable storage references...");
console.log("Declared constant item = " + itemName);
console.log("Calculated subtotal = " + subtotal);
console.log("Calculated tax total = " + tax);
console.log("Loaded discount value = " + discount);
console.log("Computed grand total = " + total);

// 4. Browser Webpage Output Writing
document.write("<h2>Invoice Receipt</h2>");
document.write("<p>Item Purchased: " + itemName + "</p>");
document.write("<p>Quantity: " + itemQty + "</p>");
document.write("<p>Subtotal: $" + subtotal.toFixed(2) + "</p>");
document.write("<p>Estimated Tax: $" + tax.toFixed(2) + "</p>");
document.write("<p>Discount Applied: -$" + discount.toFixed(2) + "</p>");
document.write("<h3>Grand Total: $" + total.toFixed(2) + "</h3>");`} />
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSIGNMENT */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 1 Assignment: Invoice Compiler Sandbox">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Practice Tasks</h3>
            <p>Paste your answers in the script input field below. Submit your assignment to save variables.</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, borderLeft: '4px solid #ca8a04', margin: '1.5rem 0' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Task Requirements:</h4>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                <li>Write statements to declare three different block-scoped variables and assign their types correctly.</li>
                <li>Write a code snippet illustrating explicit and implicit data conversion.</li>
                <li>Submit your code block to receive feedback.</li>
              </ol>
            </div>

            <textarea
              value={assignmentValue}
              onChange={e => setAssignmentValue(e.target.value)}
              disabled={assignmentSubmitted}
              placeholder="Paste your code script and explanations here..."
              style={{ width: '100%', height: '180px', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            />
            
            <button
              onClick={() => setAssignmentSubmitted(true)}
              disabled={assignmentSubmitted || !assignmentValue.trim()}
              style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {assignmentSubmitted ? 'Submitted!' : 'Submit Assignment'}
            </button>

            {assignmentSubmitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '1rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> Assignment submitted successfully!
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── CONSOLE OUTPUT ─────────────────────────────────────────────── */}
      {activeTab === 'js_console' && (
        <Section key="js_console" id="js_console" eyebrow="Day 1 • New Topic" title="Console Output">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>🖥️ What is the Console?</h3>
              <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
                The <strong>Console</strong> is a built-in browser developer tool that lets you <strong>print messages, debug code, and inspect values</strong> at runtime.
                Open it with <code style={{ background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '4px' }}>F12</code> → Console tab.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📌 console.log() — Most Used</h3>
            <p>Prints any value to the console. Used for debugging and inspecting variables.</p>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.8, margin: '1rem 0' }}>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#a5d6ff' }}>"Hello, JavaScript!"</span>);</div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#fbbf24' }}>42</span>);</div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#ff7b72', fontWeight: 700 }}>true</span>);</div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#fbbf24' }}>2 + 3</span>);&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// 5</span></div>
              <div style={{ marginTop: '8px' }}><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#a5d6ff' }}>"Name:"</span>, <span style={{ color: '#fbbf24' }}>"Alice"</span>, <span style={{ color: '#a5d6ff' }}>"Age:"</span>, <span style={{ color: '#fbbf24' }}>25</span>);&nbsp;<span style={{ color: '#8892b0' }}>// multiple values</span></div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
              {[
                { method: 'console.log()', desc: 'General output — most common', color: '#059669', bg: '#f0fdf4', border: '#86efac' },
                { method: 'console.warn()', desc: 'Yellow warning message ⚠️', color: '#d97706', bg: '#fffbeb', border: '#fcd34d' },
                { method: 'console.error()', desc: 'Red error message ❌', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5' },
                { method: 'console.table()', desc: 'Displays arrays/objects as table', color: '#4f46e5', bg: '#f0f4ff', border: '#a5b4fc' },
                { method: 'console.clear()', desc: 'Clears the console output', color: '#374151', bg: '#f8fafc', border: '#cbd5e1' },
              ].map(item => (
                <div key={item.method} style={{ flex: '1 1 200px', background: item.bg, border: `1px solid ${item.border}`, borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: item.color, marginBottom: '4px', fontSize: '0.9rem' }}>{item.method}</div>
                  <div style={{ fontSize: '0.85rem', color: '#374151' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>📋 All Console Methods — Full Example</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#8892b0' }}>// log — normal output</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#a5d6ff' }}>"User logged in"</span>);</div>
              <div style={{ marginTop: '8px' }}><span style={{ color: '#8892b0' }}>// warn — something might be wrong</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#fbbf24' }}>warn</span>(<span style={{ color: '#a5d6ff' }}>"Password is weak!"</span>);</div>
              <div style={{ marginTop: '8px' }}><span style={{ color: '#8892b0' }}>// error — something broke</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#f87171' }}>error</span>(<span style={{ color: '#a5d6ff' }}>"File not found!"</span>);</div>
              <div style={{ marginTop: '8px' }}><span style={{ color: '#8892b0' }}>// table — arrays & objects look great</span></div>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>const</span> students = [<span style={{ color: '#a5d6ff' }}>"Alice"</span>, <span style={{ color: '#a5d6ff' }}>"Bob"</span>, <span style={{ color: '#a5d6ff' }}>"Charlie"</span>];</div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#79c0ff' }}>table</span>(students);</div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1.25rem', marginTop: '1.5rem' }}>
              <strong style={{ color: '#166534' }}>💡 Pro Tip:</strong>
              <span style={{ color: '#14532d' }}> Use <code>console.log()</code> frequently while learning to understand what value a variable holds at any point in your code. Remove them before production!</span>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04', marginTop: '2rem' }} onClick={() => onNavigate('js_module1', 'js_comments')}>
              Next: Comments <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── COMMENTS ──────────────────────────────────────────────────── */}
      {activeTab === 'js_comments' && (
        <Section key="js_comments" id="js_comments" eyebrow="Day 1 • New Topic" title="Comments in JavaScript">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>💬 What are Comments?</h3>
              <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
                Comments are lines of text in your code that the <strong>JavaScript engine ignores</strong> completely.
                They are written for <strong>humans to read</strong> — to explain what the code does, why a decision was made, or to temporarily disable code.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>1️⃣ Single-Line Comment <code>//</code></h3>
                <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#f8fafc', lineHeight: 1.9 }}>
                  <div><span style={{ color: '#8892b0' }}>// This is a single-line comment</span></div>
                  <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>let</span> name = <span style={{ color: '#a5d6ff' }}>"Alice"</span>;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// inline comment</span></div>
                  <div><span style={{ color: '#8892b0' }}>// console.log("disabled line");</span></div>
                  <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(name);&nbsp;<span style={{ color: '#8892b0' }}>// prints Alice</span></div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>2️⃣ Multi-Line Comment <code>{'/* */'}</code></h3>
                <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#f8fafc', lineHeight: 1.9 }}>
                  <div><span style={{ color: '#8892b0' }}>{'/*'}</span></div>
                  <div><span style={{ color: '#8892b0' }}>&nbsp;&nbsp;This is a multi-line comment.</span></div>
                  <div><span style={{ color: '#8892b0' }}>&nbsp;&nbsp;Use it to explain complex logic</span></div>
                  <div><span style={{ color: '#8892b0' }}>&nbsp;&nbsp;or to block out sections of code.</span></div>
                  <div><span style={{ color: '#8892b0' }}>{'*/'}</span></div>
                  <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>let</span> age = <span style={{ color: '#fbbf24' }}>25</span>;</div>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem' }}>🎯 When to use Comments?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '📖', use: 'Explain complex logic', example: '// Calculate compound interest: P * (1 + r/n)^(nt)' },
                { icon: '🔧', use: 'Mark TODO items', example: '// TODO: add input validation here' },
                { icon: '🚫', use: 'Temporarily disable code', example: '// console.log(debug_data);' },
                { icon: '📌', use: 'Section headers', example: '// ─── User Authentication ───────────────' },
              ].map(item => (
                <div key={item.use} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.use}</div>
                    <code style={{ fontSize: '0.82rem', color: '#6366f1', background: '#f0f4ff', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>{item.example}</code>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '12px', padding: '1.25rem', marginTop: '1.5rem' }}>
              <strong style={{ color: '#713f12' }}>⚠️ Best Practice:</strong>
              <ul style={{ paddingLeft: '1.5rem', color: '#78350f', lineHeight: 2, marginTop: '8px' }}>
                <li>Don't comment <em>what</em> the code does — it should be self-explanatory</li>
                <li>Comment <em>why</em> you made a decision if it isn't obvious</li>
                <li>Keep comments short and accurate — outdated comments are misleading</li>
              </ul>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04', marginTop: '2rem' }} onClick={() => handleContinue('js_playground')}>
              Next: Live Coding Lab <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: LIVE CODING PLAYGROUND ════════════════ */}
      {activeTab === 'js_playground' && (
        <Section key="js_playground" id="js_playground" eyebrow="Playground" title="JavaScript Live Coding Lab">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Write your own JavaScript code in the editor on the left and see console logs in the output terminal on the right. Experiment with loops, functions, variables, and math operators!</p>
            <JSLiveEditor dayKey="day1" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── DAY 1 QUIZ ───────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d1" id="quiz_d1" eyebrow="Day 1 • Assessment" title="Day 1 Quiz: JavaScript Basics">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which keyword declares a variable that cannot be reassigned?', opts: ['var', 'let', 'const', 'static'], ans: 2 },
              { q: 'What does console.log() do?', opts: ['Opens the browser console', 'Prints output to the console', 'Saves data to a file', 'Declares a function'], ans: 1 },
              { q: 'Which of these is a valid single-line comment in JavaScript?', opts: ['<!-- comment -->', '/* comment */', '// comment', '** comment **'], ans: 2 },
              { q: 'What data type is the value true?', opts: ['String', 'Number', 'Boolean', 'Object'], ans: 2 },
              { q: 'Which variable declaration has block scope?', opts: ['var', 'let and const', 'function', 'global'], ans: 1 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#ca8a04" />
            ))}
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
