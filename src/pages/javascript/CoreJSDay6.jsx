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
  { id: 'q1', q: 'Which Math function rounds a number UP to the nearest integer?', options: ['Math.floor()', 'Math.round()', 'Math.ceil()', 'Math.trunc()'], ans: 2 },
  { id: 'q2', q: 'What does the string method slice(1, 4) return for the string "JavaScript"?', options: ['"ava"', '"jav"', '"avas"', '"Jav"'], ans: 0 },
  { id: 'q3', q: 'Which array method adds one or more elements to the START of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], ans: 3 },
  { id: 'q4', q: 'What is the main difference between slice() and splice()?', options: ['slice modifies the array, splice does not', 'splice modifies the array, slice does not', 'They are completely identical', 'slice is only for strings'], ans: 1 },
  { id: 'q5', q: 'How do you access the value "BMW" in the nested array: var cars = [["Toyota", "Honda"], ["Ford", "BMW"]];', options: ['cars[1][1]', 'cars[0][1]', 'cars[1][0]', 'cars[2][2]'], ans: 0 }
];

export default function CoreJSDay6({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Math interactive states
  const [mathNum, setMathNum] = useState(4.7);
  
  // String interactive states
  const [strInput, setStrInput] = useState("  Learn JavaScript!  ");
  
  // Student List Manager State
  const [students, setStudents] = useState(["Alice", "Bob", "Charlie"]);
  const [studentNameInput, setStudentNameInput] = useState("");
  const [searchNameInput, setSearchNameInput] = useState("");
  const [searchResultMsg, setSearchResultMsg] = useState("");

  // Playground state
  const [playgroundMode, setPlaygroundMode] = useState('console');
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`// Array and Math example
var numbers = [10.2, 20.7, 30.5, 40.1];
var roundedNumbers = [];

for (var num of numbers) {
  roundedNumbers.push(Math.round(num));
}

console.log("Original:", numbers);
console.log("Rounded:", roundedNumbers);`);
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
    onNavigate('core_js_day6', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student Manager Handlers
  const addStudent = () => {
    const name = studentNameInput.trim();
    if (name === "") {
      alert("Please enter a valid student name.");
      return;
    }
    setStudents(prev => [...prev, name]);
    setStudentNameInput("");
  };

  const removeStudent = (index) => {
    setStudents(prev => prev.filter((_, idx) => idx !== index));
  };

  const checkStudent = () => {
    const name = searchNameInput.trim();
    if (name === "") {
      setSearchResultMsg("Please enter a name to search.");
      return;
    }
    const hasStudent = students.includes(name);
    const index = students.indexOf(name);
    if (hasStudent) {
      setSearchResultMsg(`✓ "${name}" is in the class (Index: ${index})`);
    } else {
      setSearchResultMsg(`✗ "${name}" not found.`);
    }
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
    if (name === 'math') {
      setEditorCode(`// Math Functions
console.log("Math.round(4.7):", Math.round(4.7));
console.log("Math.ceil(4.1):", Math.ceil(4.1));
console.log("Math.floor(4.9):", Math.floor(4.9));
console.log("Math.random():", Math.random());
console.log("Random between 1 and 10:", Math.floor(Math.random() * 10) + 1);`);
    } else if (name === 'string') {
      setEditorCode(`// String Methods
var text = "  Learn JavaScript!  ";
console.log("Length:", text.length);
console.log("Trimmed:", text.trim());
console.log("Uppercase:", text.toUpperCase());
console.log("Slice (2, 7):", text.slice(2, 7));
console.log("Split by space:", text.trim().split(" "));`);
    } else if (name === 'arrays') {
      setEditorCode(`// Array Methods
var fruits = ["Apple", "Banana"];
fruits.push("Cherry"); // Adds to end
fruits.unshift("Mango"); // Adds to start
console.log("Fruits after addition:", fruits);

fruits.pop(); // Removes from end
fruits.shift(); // Removes from start
console.log("Fruits after removals:", fruits);

// Splice (index, deleteCount, items...)
fruits.splice(1, 0, "Grapes", "Orange");
console.log("After Splice insert:", fruits);`);
    } else if (name === 'slicesplice') {
      setEditorCode(`// slice() vs splice()
var original = [1, 2, 3, 4, 5];

// slice does NOT modify original
var sliced = original.slice(1, 4);
console.log("slice result:", sliced);
console.log("original after slice:", original);

// splice DOES modify original
var spliced = original.splice(1, 2);
console.log("splice result:", spliced);
console.log("original after splice:", original);`);
    } else if (name === 'nested') {
      setEditorCode(`// Nested 2D Arrays
var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("Element at row 1, col 1:", matrix[1][1]); // 5
console.log("Row 0:", matrix[0]);`);
    } else if (name === 'student') {
      setEditorCode(`// Student List Manager Script
var students = ["Alice", "Bob", "Charlie"];

// 1. Add student (push)
students.push("Dave");
console.log("Added student:", students);

// 2. Find index (indexOf / includes)
var index = students.indexOf("Charlie");
console.log("Charlie's index:", index);
console.log("Does class include Bob?", students.includes("Bob"));

// 3. Remove student (splice)
students.splice(1, 1); // removes Bob
console.log("After removing index 1:", students);`);
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

      {/* ── TAB 1: MATH FUNCTIONS ─────────────────── */}
      {activeTab === 'math_functions' && (
        <Section key="math_functions" eyebrow="Day 6 • Math, String &amp; Array" title="JavaScript Math Functions">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7 }}>
              The JavaScript <strong>Math</strong> object allows you to perform mathematical tasks on numbers. Unlike other objects, the Math object has no constructor; it is static, meaning we call methods directly on it.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { name: 'Math.round(x)', desc: 'Rounds x to the nearest integer.', example: 'Math.round(4.7) // 5' },
                { name: 'Math.ceil(x)', desc: 'Rounds x UP to its nearest integer.', example: 'Math.ceil(4.1) // 5' },
                { name: 'Math.floor(x)', desc: 'Rounds x DOWN to its nearest integer.', example: 'Math.floor(4.9) // 4' },
                { name: 'Math.trunc(x)', desc: 'Returns the integer part of x (removes decimals).', example: 'Math.trunc(4.7) // 4' },
                { name: 'Math.random()', desc: 'Returns a random number between 0 (inclusive) and 1 (exclusive).', example: 'Math.random()' },
                { name: 'Math.pow(x, y)', desc: 'Returns the value of x to the power of y.', example: 'Math.pow(8, 2) // 64' },
              ].map(m => (
                <div key={m.name} style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#ca8a04', marginBottom: '0.25rem', fontFamily: 'monospace' }}>{m.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>{m.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block' }}>{m.example}</code>
                </div>
              ))}
            </div>

            {/* Interactive Math Sandbox */}
            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#854d0e', marginBottom: '0.5rem' }}>🧮 Live Math Evaluator</h4>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: '#854d0e' }}>Enter Float Number:</label>
                <input type="number" step="0.1" value={mathNum} onChange={e => setMathNum(parseFloat(e.target.value) || 0)} style={{ padding: '0.4rem', border: '1px solid #ca8a04', borderRadius: '6px', width: '90px', fontWeight: 700 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', background: '#fff', padding: '1rem', borderRadius: '8px' }}>
                <div>Round: <span style={{ fontWeight: 700, color: '#ca8a04' }}>{Math.round(mathNum)}</span></div>
                <div>Ceil: <span style={{ fontWeight: 700, color: '#ca8a04' }}>{Math.ceil(mathNum)}</span></div>
                <div>Floor: <span style={{ fontWeight: 700, color: '#ca8a04' }}>{Math.floor(mathNum)}</span></div>
                <div>Trunc: <span style={{ fontWeight: 700, color: '#ca8a04' }}>{Math.trunc(mathNum)}</span></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('string_functions')}>
              Next: String Functions →
            </button>
          </div>
        </Section>
      )}

      {/* ── TAB 2: STRING FUNCTIONS ───────── */}
      {activeTab === 'string_functions' && (
        <Section key="string_functions" eyebrow="Day 6 • Math, String &amp; Array" title="JavaScript String Functions">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              String methods help you manipulate and work with text strings. All string methods return a new value without modifying the original variable.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { name: 'length', desc: 'Returns the length of a string.', example: '"Hello".length // 5' },
                { name: 'indexOf(str)', desc: 'Returns the index of the first occurrence of text.', example: '"Hello".indexOf("l") // 2' },
                { name: 'slice(start, end)', desc: 'Extracts a part of a string.', example: '"JavaScript".slice(0, 4) // "Java"' },
                { name: 'replace(old, new)', desc: 'Replaces a specified value with another.', example: '"hi".replace("h", "b") // "bi"' },
                { name: 'toUpperCase()', desc: 'Converts a string to upper case.', example: '"abc".toUpperCase() // "ABC"' },
                { name: 'trim()', desc: 'Removes whitespace from both sides.', example: '"  hi  ".trim() // "hi"' },
              ].map(s => (
                <div key={s.name} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '0.25rem', fontFamily: 'monospace' }}>{s.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}>{s.desc}</div>
                  <code style={{ fontSize: '0.78rem', background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', display: 'block' }}>{s.example}</code>
                </div>
              ))}
            </div>

            {/* Interactive String Inspector */}
            <div style={{ background: '#dbeafe', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>🔤 Interactive String Inspector</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600, color: '#1e40af' }}>Type Test String:</label>
                <input type="text" value={strInput} onChange={e => setStrInput(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #3b82f6', borderRadius: '6px', width: '100%', fontWeight: 600 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', background: '#fff', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                <div>Length: <span style={{ fontWeight: 700, color: '#1e40af' }}>{strInput.length}</span></div>
                <div>Trimmed: <span style={{ fontWeight: 700, color: '#1e40af' }}>"{strInput.trim()}"</span></div>
                <div>Uppercase: <span style={{ fontWeight: 700, color: '#1e40af' }}>{strInput.toUpperCase()}</span></div>
                <div>Sliced (2-7): <span style={{ fontWeight: 700, color: '#1e40af' }}>"{strInput.slice(2, 7)}"</span></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day6', 'math_functions')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('array_concepts')}>Next: Array Concepts →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 3: ARRAY CONCEPTS ─────────── */}
      {activeTab === 'array_concepts' && (
        <Section key="array_concepts" eyebrow="Day 6 • Arrays" title="Array Properties &amp; Operations in JavaScript">
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>1. Accessing, Length &amp; Looping</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Arrays are zero-indexed ordered collections. Use the <code>.length</code> property to find the total count of elements, and iterate using loop systems.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var list = ["Red", "Green", "Blue"];
console.log(list[0]);       // Output: Red
console.log(list.length);   // Output: 3

// Loop through elements
for (var color of list) {
  console.log(color);
}`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>2. Adding &amp; Removing Elements</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              You can insert or delete elements at the start or end of arrays using built-in methods:
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var nums = [20, 30];
nums.push(40);      // Add to end -> [20, 30, 40]
nums.unshift(10);   // Add to start -> [10, 20, 30, 40]

nums.pop();         // Remove from end -> [10, 20, 30]
nums.shift();       // Remove from start -> [20, 30]`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>3. slice() vs. splice()</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              <strong>slice(start, end)</strong> extracts a copy of a portion of an array into a new array. It does not modify the original array.<br />
              <strong>splice(start, deleteCount, newItems)</strong> inserts or deletes items directly in the original array (mutates the source array).
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var arr = [10, 20, 30, 40];
var sliced = arr.slice(1, 3); // sliced = [20, 30]. arr remains [10, 20, 30, 40].

arr.splice(1, 2, 99); // Removes 20 & 30, inserts 99. arr becomes [10, 99, 40].`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>4. Searching Arrays</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              To look up elements or identify their positions within an array:
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var items = ["pen", "pencil", "eraser"];
console.log(items.indexOf("pencil"));  // Output: 1
console.log(items.indexOf("paper"));   // Output: -1 (not found)
console.log(items.includes("eraser"));  // Output: true`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>5. Conversion &amp; Combining</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Use <code>join()</code> or <code>toString()</code> to convert arrays to text, and <code>concat()</code> to combine multiple arrays.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var colors = ["Red", "Green"];
console.log(colors.join(" - ")); // Output: "Red - Green"
console.log(colors.toString());   // Output: "Red,Green"

var extra = ["Blue", "Yellow"];
var allColors = colors.concat(extra); // ["Red", "Green", "Blue", "Yellow"]`} />
            </div>
          </div>

          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#1e293b' }}>6. Nested Arrays (2D Grid Systems)</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.7 }}>
              Arrays can contain other arrays as elements. These are called 2D arrays, commonly used for representing grids or coordinate lists.
            </p>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <SyntaxHighlighter code={`var grid = [
  ["A", "B", "C"],
  ["D", "E", "F"]
];

console.log(grid[0][1]); // Output: "B" (row 0, col 1)
console.log(grid[1][2]); // Output: "F" (row 1, col 2)`} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day6', 'string_functions')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('student_manager')}>Next: Student List Manager →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 4: STUDENT MANAGER ────────── */}
      {activeTab === 'student_manager' && (
        <Section key="student_manager" eyebrow="Day 6 • Mini Project" title="Mini Project: Student List Manager">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This interactive project utilizes array operations (`push`, `splice`, `indexOf`, and `includes`) to manage a class roster.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' }}>
              {/* App View */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '2px solid #ca8a04', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: '#ca8a04', marginBottom: '1.2rem', fontSize: '1.2rem', borderBottom: '2px solid #ca8a04', paddingBottom: '0.5rem' }}>Student List Manager</h4>
                
                {/* Inputs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input type="text" placeholder="Enter student name" value={studentNameInput} onChange={e => setStudentNameInput(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', flex: 1 }} />
                  <button onClick={addStudent} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>Add</button>
                </div>

                {/* Search */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexDirection: 'column', background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Find or Check Student:</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" placeholder="Search name" value={searchNameInput} onChange={e => setSearchNameInput(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '6px', flex: 1 }} />
                    <button onClick={checkStudent} style={{ background: '#475569', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>Search</button>
                  </div>
                  {searchResultMsg && <div style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '0.25rem' }}>{searchResultMsg}</div>}
                </div>

                {/* List Output */}
                <h5 style={{ margin: '1rem 0 0.5rem 0', color: '#1e293b' }}>Current Class Roster ({students.length})</h5>
                {students.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '1rem 0' }}>Class is empty.</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '180px', overflowY: 'auto' }}>
                    {students.map((student, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '5px', fontSize: '0.9rem', alignItems: 'center' }}>
                        <span>{student} <small style={{ color: '#64748b' }}>(Index: {idx})</small></span>
                        <button onClick={() => removeStudent(idx)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer' }}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Code View */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ color: '#1e293b', margin: 0 }}>Student Roster Source Code:</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', overflowY: 'auto', maxHeight: '380px' }}>
                  <SyntaxHighlighter code={`// 1. Class Array State
let students = ["Alice", "Bob", "Charlie"];

// 2. Add student using push()
function addStudent(name) {
  if (name.trim() !== "") {
    students.push(name.trim());
  }
}

// 3. Search using indexOf() / includes()
function searchStudent(name) {
  const exists = students.includes(name);
  const position = students.indexOf(name);
  console.log("Exists:", exists, "Index:", position);
}

// 4. Remove student using splice()
function removeStudent(index) {
  // removes exactly 1 element at the index
  students.splice(index, 1);
}`} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day6', 'array_concepts')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('playground')}>Next: Live Coding Lab →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 5: PLAYGROUND ──────────────────────────── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Write and execute Math, String, and Array methods live:
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                ['math',         '🧮 Math Functions'],
                ['string',       '🔤 String Methods'],
                ['arrays',       '📚 Array Add/Remove'],
                ['slicesplice',  '✂️ slice() vs splice()'],
                ['nested',       '🗂️ Nested 2D Arrays'],
                ['student',      '🎓 Student Manager'],
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
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day6', 'student_manager')}>← Back</button>
            <button style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleContinue('assessment')}>Next: Day 6 Assessment →</button>
          </div>
        </Section>
      )}

      {/* ── TAB 6: ASSESSMENT ─────────────────────────── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 6 • Assessment" title="Day 6 Assessment — Built-in Objects &amp; Arrays">

          {/* Common Mistakes */}
          <div className="panel" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Common Pitfalls
            </h3>
            {[
              { mistake: 'Modifying arrays in-place vs. returning new arrays', code: `var nums = [1, 2, 3];\n// slice returns a new array, does not change original\nvar res = nums.slice(0, 2); \nconsole.log(nums); // [1, 2, 3] (original is safe)\n\n// splice modifies original array\nnums.splice(0, 2);\nconsole.log(nums); // [3] (original was altered!)` },
              { mistake: 'Invalid index reference (out of bounds)', code: `var colors = ["red", "blue"];\nconsole.log(colors[2]); // undefined (arrays are 0-indexed, valid: 0, 1)` },
              { mistake: 'Using Math.random() without floor/ceil for ranges', code: `// Generates floats between 0 and 10, not integers:\nvar rand = Math.random() * 10;\n\n// Generates actual integer from 1 to 10:\nvar randInt = Math.floor(Math.random() * 10) + 1;` },
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
              <FileText size={20} /> Day 6 Practice Assignments
            </h3>
            <ol style={{ color: '#475569', lineHeight: 2, paddingLeft: '1.2rem', margin: 0 }}>
              <li>Write a program that uses `Math.random()` to simulate rolling a 6-sided die.</li>
              <li>Create a function that takes a full name (e.g. "John Doe Smith") and returns the middle name only.</li>
              <li>Given an array of colors `["red", "blue", "green"]`, add `"yellow"` to the beginning and remove `"green"`.</li>
              <li>Create a 2D array representing a Tic-Tac-Toe grid and set the middle cell to `"X"`.</li>
              <li>Extend the **Student List Manager** to prevent adding duplicate names to the roster.</li>
            </ol>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff', border: '1px solid #ca8a04' }} onClick={() => onNavigate('core_js_day6', 'playground')}>← Back to Playground</button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
