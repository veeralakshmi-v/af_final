import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Activity, Link, Code
} from 'lucide-react';

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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt|print|write|sum|len|math|random)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (htmlTag) color = '#7ee787';
          else if (kw) { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
          else if (ident) color = '#e1e4e8';
          else if (sym) color = '#ff7b72';
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

export default function CoreJSDay1({ activeTab, onNavigate, openAITutor: _openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Tab 1.5: Connecting JS State
  const [selectedJsConnectMethod, setSelectedJsConnectMethod] = useState('inline');

  // Tab 2: Scope Inspector States
  const [activeScopeType, setActiveScopeType] = useState('block');

  // Tab 3: Data Type Analyzer States
  const [analyzerInput, setAnalyzerInput] = useState('42');
  const [analyzerResult, setAnalyzerResult] = useState({
    type: 'number',
    primitive: 'Yes (Primitive)',
    description: 'An integer or a floating-point number'
  });

  // Tab 4: Equality Checker States
  const [operandLeft, setOperandLeft] = useState('5');
  const [operandRight, setOperandRight] = useState('"5"');

  // Tab 5: Live Code Playground States
  const [playgroundMode, setPlaygroundMode] = useState('console'); // console or preview
  const [runTrigger, setRunTrigger] = useState(0);
  const [editorCode, setEditorCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: sans-serif;
      background: #f8fafc;
      padding: 20px;
    }
    h2 {
      color: #ca8a04;
    }
    .info-box {
      background: white;
      border: 2px solid #ca8a04;
      border-radius: 10px;
      padding: 16px 20px;
      max-width: 340px;
      margin: 12px 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.07);
    }
    .label {
      font-weight: bold;
      color: #475569;
    }
    .value {
      color: #1e40af;
    }
  </style>
</head>
<body>
  <h2>My JavaScript Variables</h2>
  <script>
    // --- Variable Declarations (Day 1 Topic) ---

    // Using var (old style - function scoped)
    var studentName = "John";
    var courseName  = "Core JavaScript";

    // Using let (block scoped - can be updated)
    let currentDay  = 1;
    let topic       = "Variables & Data Types";

    // Using const (block scoped - cannot be reassigned)
    const batchYear = 2026;
    const language  = "JavaScript";

    // --- Data Types in use ---
    var score       = 95.5;          // Number
    var isPassed    = true;          // Boolean
    var grade       = null;          // Null (intentionally empty)
    var remarks;                     // Undefined (declared, not assigned)

    // --- Display using document.write ---
    document.write('<div class="info-box"><span class="label">Student Name:</span> <span class="value">' + studentName + '</span></div>');
    document.write('<div class="info-box"><span class="label">Course:</span> <span class="value">' + courseName + '</span></div>');
    document.write('<div class="info-box"><span class="label">Day:</span> <span class="value">' + currentDay + '</span></div>');
    document.write('<div class="info-box"><span class="label">Topic:</span> <span class="value">' + topic + '</span></div>');
    document.write('<div class="info-box"><span class="label">Batch Year:</span> <span class="value">' + batchYear + '</span></div>');
    document.write('<div class="info-box"><span class="label">Score:</span> <span class="value">' + score + '</span></div>');
    document.write('<div class="info-box"><span class="label">Passed:</span> <span class="value">' + isPassed + '</span></div>');
    document.write('<div class="info-box"><span class="label">Grade:</span> <span class="value">' + grade + '</span></div>');
    document.write('<div class="info-box"><span class="label">Remarks:</span> <span class="value">' + remarks + '</span></div>');

    // --- Also log to Console ---
    console.log("studentName =", studentName);
    console.log("currentDay =", currentDay);
    console.log("batchYear =", batchYear);
    console.log("score =", score);
    console.log("isPassed =", isPassed);
    console.log("grade =", grade);
    console.log("remarks =", remarks);
  </script>
</body>
</html>`);
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
    const handleIframeMessage = (event) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' || prev.startsWith('⚠️ Error:') ? '' : prev + '\n';
          return base + event.data.log;
        });
      } else if (event.data && event.data.type === 'CONSOLE_ERROR') {
        setConsoleOutput(prev => {
          const base = prev === 'Click "Run Code" to view output here...' ? '' : prev + '\n';
          return base + `⚠️ Error: ${event.data.error}`;
        });
      }
    };

    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, []);

  const handleContinue = (nextTabId) => {
    onNavigate('core_js_day1', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCheckQuestion = (qId) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const checkFinalScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.ans) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
  };

  // Run Custom JS Playground Code
  const executePlaygroundCode = () => {
    setConsoleOutput('');
    setRunTrigger(prev => prev + 1);

    if (editorCode.includes('<html') || editorCode.includes('<div') || editorCode.includes('<style>') || editorCode.includes('<button')) {
      setPlaygroundMode('preview');
    } else {
      setPlaygroundMode('console');
    }
  };

  const loadPresetSnippet = (presetName) => {
    if (presetName === 'variables') {
      setEditorCode(`// Redeclaration & Updates Demonstration\nvar x = 10;\nconsole.log("x declared first as var:", x);\nvar x = "Hello"; // var allows redeclaration\nconsole.log("x redeclared as var:", x);\n\nlet y = 20;\nconsole.log("y declared as let:", y);\n// let y = "Error"; // SyntaxError: Identifier 'y' has already been declared!\ny = 30; // updating let is allowed\nconsole.log("y updated to:", y);\n\nconst z = 100;\nconsole.log("z declared as const:", z);\n// z = 200; // TypeError: Assignment to constant variable!`);
    } else if (presetName === 'scoping') {
      setEditorCode(`// ===== var Hoisting Demonstration =====
// 'var' declarations are HOISTED to the top of their scope.
// The variable exists but has no value yet — it prints 'undefined'.

console.log("1. Before declaring studentName:", studentName); // undefined (hoisted!)

var studentName = "Kavya";
console.log("2. After declaring studentName:", studentName);  // Kavya

// var allows REDECLARATION — same variable name, new value
var studentName = "Advanced Student";
console.log("3. After redeclaring studentName:", studentName); // Advanced Student

// ===== let — NO hoisting to undefined, NO redeclaration =====
let courseName = "Core JavaScript";
console.log("4. courseName with let:", courseName);

courseName = "Vanilla JavaScript"; // Updating let is allowed
console.log("5. courseName updated:", courseName);

// let courseName = "Error"; // SyntaxError — cannot redeclare with let

// ===== const — must be initialized, cannot change =====
const batchYear = 2026;
console.log("6. batchYear with const:", batchYear);

// batchYear = 2027; // TypeError — assignment to constant variable!

// ===== typeof — check data type of a variable =====
var score   = 88.5;
var passed  = true;
var remarks;          // declared but not assigned → undefined
var grade   = null;   // intentionally empty

console.log("---");
console.log("typeof score   →", typeof score);    // number
console.log("typeof passed  →", typeof passed);   // boolean
console.log("typeof remarks →", typeof remarks);  // undefined
console.log("typeof grade   →", typeof grade);    // object (JS quirk!)`);
    } else if (presetName === 'conversions') {
      setEditorCode(`// Coercion and Equality\nconsole.log("Strict Equality (5 === '5'):", 5 === '5');\nconsole.log("Abstract Equality (5 == '5'):", 5 == '5');\nconsole.log("Coercion (true == 1):", true == 1);\n\n// Explicit conversions\nconsole.log("Number('42') ->", Number('42'));\nconsole.log("String(false) ->", String(false));\nconsole.log("Boolean(0) ->", Boolean(0));\nconsole.log("Boolean('hello') ->", Boolean('hello'));`);
    } else if (presetName === 'codedemo') {
      setEditorCode(`<!DOCTYPE html>\n<html>\n<body>\n  <h3>Notepad++ Slide 10 Code Demo</h3>\n  <script>\n    var variable; // variable declaration\n    document.write(variable + "<br>");\n    \n    document.write(variable + "<br>");\n    \n    var var1 = "DF"; // variable declaration and initialization\n    document.write("Variable's value is " + var1 + "<br>");\n    \n    document.write("After redeclaration,<br>");\n    var var1 = "DataFlair"; // variable redeclared\n    document.write("Variable's value is " + var1);\n  </script>\n</body>\n</html>`);
    } else if (presetName === 'integration') {
      setEditorCode(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: sans-serif;
      background: #f8fafc;
      padding: 20px;
    }
    h2 {
      color: #ca8a04;
    }
    .info-box {
      background: white;
      border: 2px solid #ca8a04;
      border-radius: 10px;
      padding: 16px 20px;
      max-width: 340px;
      margin: 12px 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.07);
    }
    .label {
      font-weight: bold;
      color: #475569;
    }
    .value {
      color: #1e40af;
    }
  </style>
</head>
<body>
  <h2>My JavaScript Variables</h2>
  <script>
    // --- Variable Declarations (Day 1 Topic) ---

    // Using var (old style - function scoped)
    var studentName = "John";
    var courseName  = "Core JavaScript";

    // Using let (block scoped - can be updated)
    let currentDay  = 1;
    let topic       = "Variables & Data Types";

    // Using const (block scoped - cannot be reassigned)
    const batchYear = 2026;
    const language  = "JavaScript";

    // --- Data Types in use ---
    var score       = 95.5;          // Number
    var isPassed    = true;          // Boolean
    var grade       = null;          // Null (intentionally empty)
    var remarks;                     // Undefined (declared, not assigned)

    // --- Display using document.write ---
    document.write('<div class="info-box"><span class="label">Student Name:</span> <span class="value">' + studentName + '</span></div>');
    document.write('<div class="info-box"><span class="label">Course:</span> <span class="value">' + courseName + '</span></div>');
    document.write('<div class="info-box"><span class="label">Day:</span> <span class="value">' + currentDay + '</span></div>');
    document.write('<div class="info-box"><span class="label">Topic:</span> <span class="value">' + topic + '</span></div>');
    document.write('<div class="info-box"><span class="label">Batch Year:</span> <span class="value">' + batchYear + '</span></div>');
    document.write('<div class="info-box"><span class="label">Score:</span> <span class="value">' + score + '</span></div>');
    document.write('<div class="info-box"><span class="label">Passed:</span> <span class="value">' + isPassed + '</span></div>');
    document.write('<div class="info-box"><span class="label">Grade:</span> <span class="value">' + grade + '</span></div>');
    document.write('<div class="info-box"><span class="label">Remarks:</span> <span class="value">' + remarks + '</span></div>');

    // --- Also log to Console ---
    console.log("studentName =", studentName);
    console.log("currentDay =", currentDay);
    console.log("batchYear =", batchYear);
    console.log("score =", score);
    console.log("isPassed =", isPassed);
    console.log("grade =", grade);
    console.log("remarks =", remarks);
  </script>
</body>
</html>`);
    }
  };

  const handleAnalyzeType = () => {
    let valStr = analyzerInput.trim();
    let type = 'string';
    let primitive = 'Yes (Primitive)';
    let desc = 'Represents textual data';

    // Parse logic
    if (valStr.toLowerCase() === 'true' || valStr.toLowerCase() === 'false') {
      type = 'boolean';
      desc = 'Any of two values: true or false';
    } else if (valStr.toLowerCase() === 'null') {
      type = 'null (object gotcha)';
      desc = 'Represents intentional absence of any object value';
    } else if (valStr.toLowerCase() === 'undefined') {
      type = 'undefined';
      desc = 'A data type whose variable is not initialized';
    } else if (!isNaN(valStr) && valStr !== '') {
      type = 'number';
      desc = 'An integer or a floating-point number';
    } else if (valStr.startsWith('[') && valStr.endsWith(']')) {
      type = 'object (Array)';
      primitive = 'No (Non-primitive)';
      desc = 'An ordered list of elements';
    } else if (valStr.startsWith('{') && valStr.endsWith('}')) {
      type = 'object (Object)';
      primitive = 'No (Non-primitive)';
      desc = 'A collection of key-value properties';
    } else if (valStr.endsWith('n') && !isNaN(valStr.slice(0, -1)) && valStr.length > 1) {
      type = 'bigint';
      desc = 'Used to store large integers beyond Number limit';
    }

    setAnalyzerResult({ type, primitive, description: desc });
  };

  const evaluateEquality = () => {
    try {
      const left = new Function(`return ${operandLeft}`)();
      const right = new Function(`return ${operandRight}`)();

      const abstract = left == right;
      const strict = left === right;

      return {
        abstract: abstract ? 'True' : 'False',
        strict: strict ? 'True' : 'False',
        explain: strict
          ? 'Both values and datatypes are identical.'
          : abstract
            ? `Values match after implicit type conversion (coerced to same type), but actual data types differ: typeof Left (${typeof left}) vs typeof Right (${typeof right}).`
            : 'Both values and datatypes are completely different.'
      };
    } catch {
      return { abstract: 'Error', strict: 'Error', explain: 'Invalid JS expressions entered.' };
    }
  };

  const equalityResult = evaluateEquality();

  const quizQuestions = [
    {
      id: 1,
      q: "Who developed JavaScript and when was it first released?",
      opts: [
        "James Gosling in 1995.",
        "Brendan Eich in 1995.",
        "Tim Berners-Lee in 1991.",
        "Guido van Rossum in 1991."
      ],
      ans: 1,
      exp: "JavaScript was developed by Brendan Eich in 1995 while working at Netscape Communications."
    },
    {
      id: 2,
      q: "Which variable declaration statement is block-scoped and allows updates but prevents redeclaring inside the same scope?",
      opts: [
        "var",
        "let",
        "const",
        "Both var and let"
      ],
      ans: 1,
      exp: "let is block-scoped. Unlike var, it prevents redeclaring inside the same scope, and unlike const, it allows updating value assignments."
    },
    {
      id: 3,
      q: "What does the code `typeof null` evaluate to in JavaScript?",
      opts: [
        "null",
        "undefined",
        "object",
        "string"
      ],
      ans: 2,
      exp: "This is a well-known legacy bug in JavaScript. typeof null evaluates to 'object', representing the absence of an object reference."
    },
    {
      id: 4,
      q: "What will `console.log(10 == '10')` and `console.log(10 === '10')` print?",
      opts: [
        "true, true",
        "true, false",
        "false, true",
        "false, false"
      ],
      ans: 1,
      exp: "The == operator performs type coercion, casting '10' to the number 10, thus returning true. The strict === operator checks types without coercion, returning false because number !== string."
    },
    {
      id: 5,
      q: "In the Notepad++ slide code demo, when `var variable;` is declared inside a block, why does accessing it outside the block output `undefined` instead of throwing a ReferenceError?",
      opts: [
        "Because JavaScript automatically initialises all variables to 0.",
        "Because var has global/function scope and is hoisted, making it visible outside the block wrapper.",
        "Because let was used, which has local scoping overrides.",
        "Because document.write ignores block scoping rules."
      ],
      ans: 1,
      exp: "Unlike let and const, var ignores block scopes (like if statements or isolated brackets). It is hoisted to the enclosing function or global scope, making it accessible outside the block but with a default uninitialized value of undefined."
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {/* INTRO TAB */}
      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Day 1 • Core Scripting" title="Introduction to JavaScript">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. What is JavaScript?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Developed by <strong>Brendan Eich in 1995</strong>, JavaScript (JS) is a lightweight, interpreted programming language designed for creating network-centric applications. It is open, cross-platform, and integrated directly with HTML, making it incredibly easy to execute in any web browser.
            </p>

            <h3 style={{ marginBottom: '1.2rem', color: '#1e293b' }}>2. Client-Side JavaScript Roles</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              In front-end development, three technologies coordinate to construct web pages:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.4rem' }}>HTML (Content)</strong>
                <p style={{ color: '#1e40af', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Defines the structural blueprint, headings, text elements, media containers, and form outlines.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <strong style={{ color: '#064e3b', display: 'block', marginBottom: '0.4rem' }}>CSS (Presentation)</strong>
                <p style={{ color: '#14532d', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Handles design themes, colors, page positioning alignments, media grid parameters, and style displays.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#fef9c3', borderRadius: '8px', border: '1px solid #fef08a' }}>
                <strong style={{ color: '#713f12', display: 'block', marginBottom: '0.4rem' }}>JavaScript (Logic)</strong>
                <p style={{ color: '#854d0e', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Adds logic rules, processes operations, validates input forms, handles mouse clicks, and updates layout styles dynamically.
                </p>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>3. The JavaScript Ecosystem Map</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Modern JS extends far beyond client-side scripting, branching into server backend architectures and visual libraries:
            </p>

            <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem' }}>📦 Ecosystem Directory</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', fontSize: '0.85rem' }}>
                <div>
                  <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.5rem' }}>JS Libraries</strong>
                  <ul style={{ paddingLeft: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    <li>React, Preact</li>
                    <li>Lodash, Axios</li>
                    <li>jQuery, Moment.js</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.5rem' }}>JS Frameworks (Frontend)</strong>
                  <ul style={{ paddingLeft: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    <li>Next.js, Vue.js</li>
                    <li>Angular, Nuxt.js</li>
                    <li>Remix, Gatsby</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.5rem' }}>JS Frameworks (Backend)</strong>
                  <ul style={{ paddingLeft: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    <li>Express.js, NestJS</li>
                    <li>Koa.js, Fastify</li>
                    <li>Sails.js</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ color: '#ca8a04', display: 'block', marginBottom: '0.5rem' }}>Package Managers</strong>
                  <ul style={{ paddingLeft: '15px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    <li>npm</li>
                    <li>yarn</li>
                    <li>pnpm</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>4. ECMAScript 6 (ES6) Modern Upgrades</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              ES6 (released in 2015) was a massive update to JavaScript, bringing features that define modern scripting workflows:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
              <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
                <strong style={{ color: '#0f172a' }}>⚡ Syntax & Keywords</strong>
                <ul style={{ paddingLeft: '15px', color: '#475569', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  <li><code>let</code> and <code>const</code> block scopes</li>
                  <li>Arrow functions syntax</li>
                  <li>Template Literals (backticks interpolation)</li>
                </ul>
              </div>
              <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
                <strong style={{ color: '#0f172a' }}>⚙️ Objects & Operations</strong>
                <ul style={{ paddingLeft: '15px', color: '#475569', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  <li>Destructuring variables</li>
                  <li>Rest and Spread operators</li>
                  <li>Default parameters</li>
                </ul>
              </div>
              <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
                <strong style={{ color: '#0f172a' }}>🚀 Architecture & Async</strong>
                <ul style={{ paddingLeft: '15px', color: '#475569', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  <li>ES Modules (import / export)</li>
                  <li>Promises for async workflows</li>
                  <li>Classes scaffolding</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn"
                style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('connecting_js')}
              >
                Continue to Connecting JS & innerHTML (+10 XP)
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* CONNECTING JS & INNERHTML TAB */}
      {activeTab === 'connecting_js' && (
        <Section key="connecting_js" id="connecting_js" eyebrow="HTML & JS Integration" title="Connecting JavaScript in HTML & innerHTML DOM Manipulation">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🔌 How JavaScript Connects to HTML Documents</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                JavaScript needs to be embedded inside or linked to an HTML document to execute in a web browser. There are 3 main methods to include JS code into HTML: <strong>Inline</strong>, <strong>Internal</strong>, and <strong>External</strong>, plus key DOM properties like <strong><code>innerHTML</code></strong> to manipulate page content dynamically!
              </p>
            </div>

            {/* SECTION 1: 3 WAYS TO CONNECT JS */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Three Ways to Include JavaScript in HTML</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* 1. INLINE */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', borderTop: '4px solid #ef4444' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>⚡ 1. Inline JavaScript</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Written directly inside HTML element event attributes like <code>onclick</code>, <code>onmouseover</code>, or <code>onsubmit</code>.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`<button onclick="alert('Button Clicked!')">\n  Click Me\n</button>`} />
                </div>
                <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: '#dc2626', fontWeight: 700 }}>
                  ⚠️ Not recommended for production (violates separation of concerns).
                </div>
              </div>

              {/* 2. INTERNAL */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', borderTop: '4px solid #f59e0b' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>📜 2. Internal JavaScript</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Written inside <code>&lt;script&gt;</code> tags placed within the HTML <code>&lt;head&gt;</code> or right before <code>&lt;/body&gt;</code>.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`<script>\n  function showMessage() {\n    console.log("Hello from Internal JS!");\n  }\n</script>`} />
                </div>
                <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: '#d97706', fontWeight: 700 }}>
                  💡 Great for single-page scripts or small quick prototypes.
                </div>
              </div>

              {/* 3. EXTERNAL */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', borderTop: '4px solid #10b981' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>🔗 3. External JavaScript (Best Practice)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Code is saved in a separate <code>.js</code> file (e.g. <code>app.js</code>) and linked in HTML using the <code>src</code> attribute.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: '6px' }}>
                  <SyntaxHighlighter code={`<!-- In index.html -->\n<script src="script.js" defer></script>\n\n// In script.js\nconsole.log("External JS Loaded!");`} />
                </div>
                <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                  ✅ Standard for real-world production (reusable, clean & cached).
                </div>
              </div>

            </div>

            {/* SECTION 2: DOM & INNERHTML EXPLANATION */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. DOM Manipulation & `innerHTML`</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              The <strong>Document Object Model (DOM)</strong> allows JavaScript to read, edit, add, or delete HTML elements dynamically while the page is running in the browser!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1rem', fontWeight: 700 }}>document.getElementById("id")</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>Selects a specific HTML element using its unique `id` attribute.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #ca8a04', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1rem', fontWeight: 700 }}>element.innerHTML</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>Reads or replaces the <strong>HTML content & tags</strong> inside the element.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1rem', fontWeight: 700 }}>element.innerText</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>Sets or returns only the <strong>visible human-readable text</strong> (strips HTML tags).</p>
              </div>
            </div>

            {/* CODE EXAMPLE OF INNERHTML */}
            <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.8rem' }}>Example: Live DOM Modification with `innerHTML`</h4>
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-pane">
                <SyntaxHighlighter code={`<!DOCTYPE html>
<html>
<body>

  <h2 id="heading">Original Title</h2>
  <div id="content">Default Paragraph Content</div>

  <button onclick="changeContent()">Update Content with innerHTML</button>

  <script>
    function changeContent() {
      // 1. Select the element by ID
      let contentDiv = document.getElementById("content");
      
      // 2. Modify its innerHTML with new HTML tags
      contentDiv.innerHTML = "<h3 style='color: #2563eb;'>🎉 Updated via JavaScript innerHTML!</h3><p>This content was inserted dynamically without refreshing!</p>";
    }
  </script>

</body>
</html>`} />
              </div>
            </div>

            {/* SECTION 3: INTERACTIVE DOM SIMULATOR */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive JS Connection & innerHTML Simulator</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Select a JavaScript connection method below to test how `innerHTML` modifies the rendered HTML output in real time!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {[
                  { id: 'inline', label: '⚡ Inline JS Method' },
                  { id: 'internal', label: '📜 Internal JS Method' },
                  { id: 'external', label: '🔗 External JS Method' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedJsConnectMethod(item.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      border: selectedJsConnectMethod === item.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      background: selectedJsConnectMethod === item.id ? '#2563eb' : 'white',
                      color: selectedJsConnectMethod === item.id ? 'white' : '#1e293b'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Output Box */}
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #2563eb' }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, marginBottom: '0.8rem' }}>
                  Simulated Browser Rendered Output ({selectedJsConnectMethod.toUpperCase()} MODE)
                </div>

                <div 
                  dangerouslySetInnerHTML={{
                    __html: selectedJsConnectMethod === 'inline'
                      ? `<div style="background: #fef2f2; padding: 1.2rem; border-radius: 8px; border: 1px solid #fca5a5;">
                          <h4 style="color: #991b1b; margin: 0 0 0.5rem;">Inline JS Trigger</h4>
                          <button style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;" onclick="alert('Inline JS Executed!')">Click Me (Inline Event)</button>
                        </div>`
                      : selectedJsConnectMethod === 'internal'
                      ? `<div style="background: #fef3c7; padding: 1.2rem; border-radius: 8px; border: 1px solid #fde68a;">
                          <h4 style="color: #92400e; margin: 0 0 0.5rem;">Internal Script Result</h4>
                          <p style="margin: 0; color: #78350f; font-weight: 600;">innerHTML set this text via &lt;script&gt; block in HTML!</p>
                        </div>`
                      : `<div style="background: #ecfdf5; padding: 1.2rem; border-radius: 8px; border: 1px solid #6ee7b7;">
                          <h4 style="color: #065f46; margin: 0 0 0.5rem;">External app.js Loaded</h4>
                          <p style="margin: 0; color: #047857; font-weight: 600;">Linked via &lt;script src="app.js" defer&gt;&lt;/script&gt;.</p>
                        </div>`
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn"
                style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('variables')}
              >
                Continue to Variables & Scope (+10 XP)
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* VARIABLES TAB */}
      {activeTab === 'variables' && (
        <Section key="variables" id="variables" eyebrow="Day 1 • Variables Scopes" title="JavaScript Variables & Scope Rules">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. What are Variables?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Variables act as named containers in memory to store data values that your code can update and evaluate during execution.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e293b', margin: '0 0 1rem 0' }}>📋 Anatomy of Variable Declaration</h4>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', fontFamily: 'monospace', fontSize: '1.1rem', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <div style={{ textAlign: 'center' }}><div style={{ background: '#fef08a', padding: '4px 8px', borderRadius: '4px' }}>var</div><span style={{ fontSize: '0.72rem', color: '#64748b' }}>Keyword</span></div>
                <div style={{ textAlign: 'center' }}><div style={{ background: '#bfdbfe', padding: '4px 8px', borderRadius: '4px' }}>name</div><span style={{ fontSize: '0.72rem', color: '#64748b' }}>Identifier</span></div>
                <div>=</div>
                <div style={{ textAlign: 'center' }}><div style={{ background: '#bbf7d0', padding: '4px 8px', borderRadius: '4px' }}>'James Bond'</div><span style={{ fontSize: '0.72rem', color: '#64748b' }}>Value</span></div>
                <div>;</div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. var vs. let vs. const</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              JavaScript variables can be declared in three ways, each subject to distinct memory scoping rules:
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '0.8rem 1rem', color: '#334155' }}>Feature</th>
                    <th style={{ padding: '0.8rem 1rem', color: '#334155' }}><code>var</code></th>
                    <th style={{ padding: '0.8rem 1rem', color: '#334155' }}><code>let</code></th>
                    <th style={{ padding: '0.8rem 1rem', color: '#334155' }}><code>const</code></th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Scoping Level</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Function or Global scope (ignores braces block scopes)</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Block Scope <code>{`{}`}</code></td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Block Scope <code>{`{}`}</code></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Hoisting Behavior</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Hoisted with value <code>undefined</code> (safe reference)</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Hoisted in Temporal Dead Zone (throws ReferenceError)</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>Hoisted in Temporal Dead Zone (throws ReferenceError)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Can be updated?</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#16a34a', fontWeight: 'bold' }}>Yes</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#16a34a', fontWeight: 'bold' }}>Yes</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#dc2626', fontWeight: 'bold' }}>No (Constant allocation)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Can be redeclared?</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#16a34a', fontWeight: 'bold' }}>Yes (re-uses existing address)</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#dc2626', fontWeight: 'bold' }}>No (in same block)</td>
                    <td style={{ padding: '0.8rem 1rem', color: '#dc2626', fontWeight: 'bold' }}>No (in same block)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* INTERACTIVE SCOPING WIDGET */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <Activity size={22} color="#ca8a04" /> Variable Scoping Interactive Simulator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '2.0rem' }}>
                Select a variable declaration type to visualize where the variable exists in memory scopes (Global vs Function vs Block limits).
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                {['var', 'let', 'const'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveScopeType(type)}
                    style={{
                      padding: '0.5rem 1.5rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: activeScopeType === type ? '#ca8a04' : '#cbd5e1',
                      background: activeScopeType === type ? '#fef9c3' : '#fff',
                      color: activeScopeType === type ? '#854d0e' : '#475569',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {type.toUpperCase()} Scope
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {/* Visual Representation */}
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', minHeight: '220px', position: 'relative' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', display: 'block', textTransform: 'uppercase', marginBottom: '1rem' }}>Scoping Diagram</span>

                  {/* Global boundary */}
                  <div style={{ border: '2px dashed #94a3b8', borderRadius: '8px', padding: '1rem', background: '#f8fafc' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 'bold' }}>GLOBAL SCOPE (Window)</span>

                    {activeScopeType === 'var' && (
                      <div style={{ background: '#fef08a', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', margin: '8px', fontSize: '0.82rem', border: '1px solid #fef08a' }}>
                        var x = 10; (Leaked/Accessible Here!)
                      </div>
                    )}

                    {/* Block Scope boundary */}
                    <div style={{ border: '2px solid #cbd5e1', borderRadius: '8px', padding: '1rem', background: '#fff', marginTop: '1rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 'bold' }}>BLOCK SCOPE {`{}`} (e.g. if/for statement)</span>

                      <div style={{ marginTop: '0.5rem' }}>
                        {activeScopeType === 'let' && (
                          <div style={{ background: '#bfdbfe', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', fontSize: '0.82rem' }}>
                            let y = 20; (Trapped inside!)
                          </div>
                        )}
                        {activeScopeType === 'const' && (
                          <div style={{ background: '#bbf7d0', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', fontSize: '0.82rem' }}>
                            const z = 30; (Trapped inside!)
                          </div>
                        )}
                        {activeScopeType === 'var' && (
                          <div style={{ color: '#94a3b8', fontSize: '0.82rem', fontStyle: 'italic' }}>
                            Block bounds are ignored by var
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytical behavior */}
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', display: 'block', textTransform: 'uppercase', marginBottom: '1rem' }}>Scoping Characteristics</span>
                  {activeScopeType === 'var' && (
                    <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                      <p><strong>Hoisting:</strong> Yes. It compiles as initialized to <code>undefined</code>. Referencing it before its line declaration returns <code>undefined</code> rather than throwing an error.</p>
                      <p><strong>Global Pollution:</strong> High. Declaring a <code>var</code> variable outside a function attaches it directly to the global window context (<code>window.x</code>).</p>
                    </div>
                  )}
                  {activeScopeType === 'let' && (
                    <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                      <p><strong>Hoisting:</strong> Hoisted in the <em>Temporal Dead Zone</em>. Referencing it before its line declaration causes a <code>ReferenceError</code>.</p>
                      <p><strong>Block Security:</strong> Secure. It is restricted to the nearest enclosing braces block <code>{`{}`}</code>, meaning it won't leak out of loops or conditionals.</p>
                    </div>
                  )}
                  {activeScopeType === 'const' && (
                    <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                      <p><strong>Constant Constraint:</strong> Const requires an initial value upon declaration. You cannot assign new values to it later (re-assignment raises a TypeError).</p>
                      <p><strong>Primitive vs Object Mutability:</strong> Const prevents changing the variable pointer wrapper. However, properties inside a const <em>Object</em> or elements in a const <em>Array</em> can still be updated!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('core_js_day1', 'intro')}
              >
                Back to Introduction
              </button>
              <button
                className="btn"
                style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('datatypes')}
              >
                Continue to Data Types
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* DATA TYPES TAB */}
      {activeTab === 'datatypes' && (
        <Section key="datatypes" id="datatypes" eyebrow="Day 1 • Core Foundations" title="JavaScript Data Types">
          <div className="panel">
            {/* DEFINITION CARD */}
            <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#854d0e', margin: '0 0 0.8rem 0', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📖 What is a Data Type?
              </h3>
              <p style={{ color: '#713f12', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                A <strong>Data Type</strong> defines the type or category of value a variable holds in computer memory. It informs the JavaScript engine how much memory to allocate for the value, how the bits are stored, and what operations (such as math addition, string concatenation, or logical comparison) can be legitimately performed on that variable.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #fef08a' }}>
                  <strong style={{ color: '#854d0e', display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>⚡ Dynamic (Weakly) Typed</strong>
                  <p style={{ color: '#713f12', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    JavaScript is dynamically typed. Data types are associated with <em>values</em>, not variable declarations. A variable can hold a number initially and later be reassigned to a string or object.
                  </p>
                </div>

                <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #fef08a' }}>
                  <strong style={{ color: '#854d0e', display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>🔍 The typeof Operator</strong>
                  <p style={{ color: '#713f12', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    Use <code>typeof variable</code> to inspect the runtime data type of any value (e.g. <code>typeof 42</code> returns <code>"number"</code>, <code>typeof "hello"</code> returns <code>"string"</code>).
                  </p>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Data Type Categories</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              JavaScript values fall into one of two fundamental classifications: <strong>Primitive</strong> types and <strong>Non-Primitive</strong> (Reference) types.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Primitive Data Types</h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  Stored directly in the execution stack. They are immutable (cannot be mutated, only reassigned) and copied by value.
                </p>
                <ul style={{ paddingLeft: '20px', color: '#334155', fontSize: '0.88rem', lineHeight: 1.8 }}>
                  <li><strong>Number:</strong> Integers & floats (e.g. <code>3.14</code>, <code>100</code>).</li>
                  <li><strong>String:</strong> Text blocks (e.g. <code>'hello'</code>).</li>
                  <li><strong>Boolean:</strong> <code>true</code> or <code>false</code>.</li>
                  <li><strong>Undefined:</strong> Declared but uninitialized (<code>let a;</code>).</li>
                  <li><strong>Null:</strong> Explicit empty value representation.</li>
                  <li><strong>Symbol:</strong> Unique immutable tokens (ES6).</li>
                  <li><strong>BigInt:</strong> Arbitrary precision integers (ES2020).</li>
                </ul>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Non-Primitive Data Types</h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  Stored in the memory heap. The stack only keeps a pointer reference pointing to their heap coordinates. Copied by reference address.
                </p>
                <ul style={{ paddingLeft: '20px', color: '#334155', fontSize: '0.88rem', lineHeight: 1.8 }}>
                  <li><strong>Object:</strong> Key-value collection (<code>{`{name: 'James'}`}</code>).</li>
                  <li><strong>Array:</strong> Ordered list elements (<code>[1, 2, 3]</code>).</li>
                  <li><strong>Function:</strong> Executable code wrappers (<code>function() { }</code>).</li>
                  <li><strong>Date:</strong> Date and time wrappers.</li>
                  <li><strong>RegExp:</strong> Regular expression mapping.</li>
                </ul>
              </div>
            </div>

            {/* INTERACTIVE DATA TYPE ANALYZER */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <Layers size={22} color="#ca8a04" /> Interactive JS Data Type Inspector
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Type an input value below (e.g. <code>42</code>, <code>"hello"</code>, <code>true</code>, <code>[1, 2]</code>, or <code>{`{}`}</code>) to inspect its native JavaScript data type dynamically.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Input Expression</label>
                  <input
                    type="text"
                    value={analyzerInput}
                    onChange={(e) => setAnalyzerInput(e.target.value)}
                    placeholder="e.g. [1, 2, 3]"
                    style={{ width: '100%', padding: '0.5rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#1e293b' }}
                  />
                </div>

                <button
                  onClick={handleAnalyzeType}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    background: '#ca8a04',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-end',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#854d0e'}
                  onMouseLeave={(e) => e.target.style.background = '#ca8a04'}
                >
                  Inspect Type
                </button>
              </div>

              {analyzerResult && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ borderLeft: '4px solid #ca8a04', paddingLeft: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Evaluated Type</span>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#ca8a04' }}>
                      {analyzerResult.type}
                    </p>
                  </div>

                  <div style={{ borderLeft: '4px solid #06b6d4', paddingLeft: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Primitive Category</span>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#06b6d4' }}>
                      {analyzerResult.primitive}
                    </p>
                  </div>

                  <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Description</span>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.4 }}>
                      {analyzerResult.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('core_js_day1', 'variables')}
              >
                Back to Variables & Scope
              </button>
              <button
                className="btn"
                style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('conversions')}
              >
                Continue to Conversions
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* CONVERSIONS TAB */}
      {activeTab === 'conversions' && (
        <Section key="conversions" id="conversions" eyebrow="Day 1 • Type Conversion" title="Type Conversions & Equality Operators">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Type Conversions</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              In JavaScript, type conversion is the process of converting data of one type to another. There are two types of type conversion in JavaScript:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Implicit Type Conversion (Coercion)</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Occurs automatically when JavaScript encounters an operation that requires a certain type of data. For example, if you add a string and a number, JavaScript will implicitly convert the number to a string so that string concatenation can be performed.<br />
                  <code>5 + '5' // returns '55' (string)</code><br />
                  <code>'10' - 2 // returns 8 (number)</code>
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Explicit Type Conversion</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Occurs when you manually convert a value from one type to another using built-in wrapper functions such as <code>Number()</code>, <code>String()</code>, and <code>Boolean()</code>.<br />
                  <code>Number('42') // returns 42 (number)</code><br />
                  <code>String(true) // returns 'true' (string)</code>
                </p>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Equality: strict (===) vs. abstract (==)</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              JavaScript provides two comparison operators to evaluate equality, which operate differently based on datatypes:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>Strict Equality Operator (<code>===</code>)</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Compares **both** the values and their datatypes. No implicit coercion is allowed. If the types differ, it returns <code>false</code> immediately.<br />
                  <code>5 === '5' // returns false (number vs string)</code>
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>Abstract Equality Operator (<code>==</code>)</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Compares values **after** implicitly converting them to a common datatype (coercion). This is often less predictable and prone to bugs.<br />
                  <code>5 == '5' // returns true (casted to same value)</code>
                </p>
              </div>
            </div>

            {/* INTERACTIVE EQUALITY MATRIX */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <Activity size={22} color="#ca8a04" /> Live JS Equality Evaluator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '2rem' }}>
                Input two JavaScript expressions to check and compare their outputs under strict and abstract equality.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Left Operand</label>
                  <input
                    type="text"
                    value={operandLeft}
                    onChange={(e) => setOperandLeft(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>Right Operand</label>
                  <input
                    type="text"
                    value={operandRight}
                    onChange={(e) => setOperandRight(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.9rem', color: '#1e293b' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Abstract comparison (==)</span>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.3rem', fontWeight: 'bold', color: equalityResult.abstract === 'True' ? '#10b981' : '#ef4444' }}>
                    {equalityResult.abstract}
                  </p>
                </div>

                <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Strict comparison (===)</span>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '1.3rem', fontWeight: 'bold', color: equalityResult.strict === 'True' ? '#10b981' : '#ef4444' }}>
                    {equalityResult.strict}
                  </p>
                </div>

                <div style={{ borderLeft: '4px solid #ca8a04', paddingLeft: '1rem', gridColumn: 'span 1', background: '#fefbeb', borderRadius: '0 8px 8px 0' }}>
                  <span style={{ fontSize: '0.78rem', color: '#854d0e', textTransform: 'uppercase', fontWeight: 700 }}>Coercion Explanation</span>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#854d0e', lineHeight: 1.5 }}>
                    {equalityResult.explain}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('core_js_day1', 'datatypes')}
              >
                Back to Data Types
              </button>
              <button
                className="btn"
                style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('playground')}
              >
                Continue to Playgrounds
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PLAYGROUND TAB */}
      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Interactive Lab" title="JavaScript Live Code Workspace">
          <div className="panel">
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Use this workspace to write, edit, and test your own JavaScript code. Select one of the preloaded templates to see scoping, variables, and type conversions execute live in the sandbox browser environment.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => loadPresetSnippet('integration')}
                style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
              >
                🗂️ Variables & Data Types Demo
              </button>
              <button
                onClick={() => loadPresetSnippet('variables')}
                style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
              >
                📋 Redeclaration Snippet
              </button>
              <button
                onClick={() => loadPresetSnippet('scoping')}
                style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
              >
                🔒 Scope Leak Snippet
              </button>
              <button
                onClick={() => loadPresetSnippet('conversions')}
                style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
              >
                ⚖️ Coercion Snippet
              </button>
              <button
                onClick={() => loadPresetSnippet('codedemo')}
                style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
              >
                🖥️ Notepad++ Slide Code
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {/* Code Editor Container */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Source Code Editor</span>
                  <button
                    onClick={executePlaygroundCode}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.3rem 1.2rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Run Code &rarr;
                  </button>
                </div>
                <div style={{ position: 'relative', width: '100%', height: '320px', background: '#0f172a' }}>
                  {/* Backdrop Highlight Layer */}
                  <div
                    ref={highlighterRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: '1rem',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      pointerEvents: 'none',
                      whiteSpace: 'pre',
                      overflow: 'hidden',
                      color: '#f8fafc',
                      margin: 0
                    }}
                  >
                    <SyntaxHighlighter code={editorCode} style={{ overflowX: 'visible' }} />
                  </div>
                  {/* Editable Input Layer */}
                  <textarea
                    ref={editorRef}
                    value={editorCode}
                    onChange={(e) => setEditorCode(e.target.value)}
                    onScroll={handleEditorScroll}
                    wrap="off"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      height: '100%',
                      padding: '1rem',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      background: 'transparent',
                      color: 'transparent',
                      caretColor: '#fff',
                      resize: 'none',
                      outline: 'none',
                      border: 'none',
                      whiteSpace: 'pre',
                      overflow: 'auto',
                      margin: 0
                    }}
                  />
                </div>
              </div>

              {/* Outputs Container */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f1f5f9', padding: '0.4rem 1rem', borderBottom: '1px solid #cbd5e1', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button
                    onClick={() => setPlaygroundMode('console')}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: playgroundMode === 'console' ? '#ca8a04' : '#64748b',
                      borderBottom: playgroundMode === 'console' ? '2px solid #ca8a04' : '2px solid transparent',
                      padding: '0.3rem 0.5rem',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Console Logs
                  </button>
                  <button
                    onClick={() => setPlaygroundMode('preview')}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: playgroundMode === 'preview' ? '#ca8a04' : '#64748b',
                      borderBottom: playgroundMode === 'preview' ? '2px solid #ca8a04' : '2px solid transparent',
                      padding: '0.3rem 0.5rem',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Live Page Preview
                  </button>
                </div>

                <div style={{ flex: 1, minHeight: '320px', background: '#1e293b', position: 'relative' }}>
                  {playgroundMode === 'console' ? (
                    <pre
                      style={{
                        margin: 0,
                        padding: '1rem',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        fontFamily: 'monospace',
                        fontSize: '0.88rem',
                        background: '#1e293b',
                        color: '#38bdf8',
                        overflowY: 'auto',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {consoleOutput}
                    </pre>
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#fff' }}>
                      {runTrigger > 0 ? (
                        <iframe
                          key={runTrigger}
                          srcDoc={`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 10px; color: #1e293b; }
  </style>
</head>
<body>
  <script>
    const _log = console.log;
    console.log = (...args) => {
      _log(...args);
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
      window.parent.postMessage({ type: 'CONSOLE_LOG', log: msg }, '*');
    };
    window.onerror = (message) => {
      window.parent.postMessage({ type: 'CONSOLE_ERROR', error: message }, '*');
      return false;
    };
  </script>
  ${editorCode.includes('<html') || editorCode.includes('<script') ? editorCode : '<script>' + editorCode + '</script>'}
</body>
</html>
`}
                          title="Sandbox Web Preview"
                          sandbox="allow-scripts"
                          style={{ width: '100%', height: '320px', border: 'none' }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '0.9rem' }}>
                          Click "Run Code" to render preview
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('core_js_day1', 'conversions')}
              >
                Back to Conversions
              </button>
              <button
                className="btn"
                style={{ background: '#ca8a04', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleContinue('assessment')}
              >
                Continue to Assessment
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 1 Assessment" title="Day 1 Assessment & Review">
          <div className="panel">

            {/* Common Pitfalls */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common JavaScript Pitfalls to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>The var Block-Scope Misconception:</strong> Assuming <code>var</code> declared variables inside loops or conditions are local. Remember: var ignores braces and becomes global/function-scoped, causing variable leaks.</li>
                <li><strong>Strict vs Abstract Coercion traps:</strong> Using double equals <code>==</code> which causes unpredictable conversions (like <code>"" == 0 // true</code>). Always default to triple equals <code>===</code>.</li>
                <li><strong>Immutable const pointers:</strong> Believing a <code>const</code> object cannot be modified. While you cannot reassign a new object to a const variable (<code>const obj = { }</code>), you can update, add, or delete properties inside it (<code>obj.name = "James"</code>).</li>
              </ul>
            </div>

            {/* Notepad++ Slide Code Demo Analysis */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', fontSize: '1.15rem' }}>🖥️ Notepad++ Slide Code Analysis</h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Recall the code demo from the presentation slide. Let's analyze why it prints <code>undefined</code> twice and then outputs the variable redeclarations:
              </p>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: '8px', border: '1px solid #1e293b', color: '#fff', marginBottom: '1rem', overflowX: 'auto' }}>
                <SyntaxHighlighter code={`// Var declarations have global/function scope and are hoisted\n{\n  var variable; // declared but undefined\n  document.write(variable + "<br>");\n}\ndocument.write(variable + "<br>"); // Still accessible outside the block!\n\nvar var1 = "DF";\ndocument.write("Variable's value is " + var1 + "<br>");\n\n// var allows redeclaration\nvar var1 = "DataFlair";\ndocument.write("Variable's value is " + var1);`} />
              </div>
              <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0 }}>
                💡 <strong>Key takeaway:</strong> Because <code>var</code> is hoisted and does not respect block boundaries (like brackets <code>{`{}`}</code>), it exists throughout the scope. If we used <code>let variable;</code> instead, accessing it outside the block would throw a ReferenceError.
              </p>
            </div>

            {/* Interview Prep Questions */}
            <h3 style={{ color: '#1e293b', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              💬 Day 1 Topic-Wise Technical Interview Questions & Answers
            </h3>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: JS Connection & Script Execution (Inline, Internal, External)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Q: Why is loading external JS files using the <code>defer</code> attribute considered best practice over placing scripts directly in the <code>&lt;head&gt;</code> tag?</strong><br />
                  <strong>Answer:</strong> Placing scripts in the <code>&lt;head&gt;</code> without attributes blocks HTML DOM parsing while the browser downloads and runs the script. Adding <code>defer</code> allows the browser to download the script asynchronously in parallel with HTML parsing, and guarantees execution only after the entire DOM is parsed, preventing parser blocking without requiring <code>DOMContentLoaded</code> wrappers.
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Variables & Scopes (var vs let vs const)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Q: What is the Temporal Dead Zone (TDZ) and how does it affect <code>let</code> and <code>const</code> variable hoisting?</strong><br />
                  <strong>Answer:</strong> While <code>var</code> is hoisted and initialized to <code>undefined</code>, <code>let</code> and <code>const</code> variables are hoisted but left uninitialized in an inaccessible zone called the <em>Temporal Dead Zone (TDZ)</em>. Any attempt to read or write a <code>let</code>/<code>const</code> variable in the TDZ throws a <code>ReferenceError</code>.
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Data Types & Coercion (Primitives vs Objects, == vs ===)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Q: Why does <code>typeof null</code> evaluate to <code>"object"</code> and why does <code>0 == false</code> return <code>true</code> while <code>0 === false</code> returns <code>false</code>?</strong><br />
                  <strong>Answer:</strong> <code>typeof null === "object"</code> is a legacy JavaScript bug from 1995 where object type tags were represented as <code>000</code>. Loose equality (<code>==</code>) performs implicit type coercion, converting boolean <code>false</code> to number <code>0</code> before comparing (<code>0 == 0</code> &rarr; <code>true</code>). Strict equality (<code>===</code>) checks both type and value without coercion, returning <code>false</code>.
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: DOM Manipulation & innerHTML
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Q: What is the difference between <code>innerHTML</code> and <code>innerText</code> / <code>textContent</code>, and what security concern comes with <code>innerHTML</code>?</strong><br />
                  <strong>Answer:</strong> <code>innerHTML</code> parses text as HTML markup and instantiates DOM elements, whereas <code>textContent</code> treats all input strictly as plain text. Using <code>innerHTML</code> with un-sanitized user input exposes applications to <strong>Cross-Site Scripting (XSS)</strong> attacks.
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  📌 Topic: Memory Storage (Call Stack vs Heap Memory)
                </strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Q: How does memory allocation differ between Primitive data types and Non-Primitive (Reference) data types in JavaScript?</strong><br />
                  <strong>Answer:</strong> Primitive values (number, string, boolean, null, undefined, symbol, bigint) are stored directly on the fast execution <strong>Call Stack</strong> as fixed-size memory slots. Non-Primitive values (Objects, Arrays, Functions) are dynamically allocated in the <strong>Memory Heap</strong>, while the Call Stack holds a memory address reference pointing to that heap location.
                </p>
              </div>
            </div>

            {/* Interactive Quiz */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <CheckCircle size={22} color="#ca8a04" /> Interactive Lesson Quiz
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '-1rem', marginBottom: '2rem' }}>
                Select the correct options and check your understanding.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <p style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '1rem', marginBottom: '1rem' }}>
                      {idx + 1}. {q.q}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.opts.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        return (
                          <label
                            key={optIdx}
                            style={{
                              padding: '0.8rem 1rem',
                              borderRadius: '8px',
                              border: isSelected ? '2px solid #ca8a04' : '1px solid #cbd5e1',
                              background: isSelected ? '#fef9c3' : '#f8fafc',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              gap: '12px',
                              fontSize: '0.9rem',
                              color: '#334155',
                              textAlign: 'left'
                            }}
                          >
                            <input
                              type="radio"
                              name={`quiz-${q.id}`}
                              checked={isSelected}
                              onChange={() => handleSelectOption(q.id, optIdx)}
                              style={{ accentColor: '#ca8a04', margin: 0, flexShrink: 0 }}
                            />
                            <span style={{ textAlign: 'left', flex: 1 }}>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                    {selectedAnswers[q.id] !== undefined && !checkedQuestions[q.id] && (
                      <button
                        className="btn btn-outline"
                        style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.82rem', borderColor: '#ca8a04', color: '#ca8a04', background: '#fff' }}
                        onClick={() => handleCheckQuestion(q.id)}
                      >
                        Check Answer
                      </button>
                    )}
                    {checkedQuestions[q.id] && (
                      <div style={{ marginTop: '1.2rem', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid', borderColor: selectedAnswers[q.id] === q.ans ? '#16a34a' : '#dc2626', background: selectedAnswers[q.id] === q.ans ? '#f0fdf4' : '#fef2f2' }}>
                        <strong style={{ color: selectedAnswers[q.id] === q.ans ? '#15803d' : '#b91c1c', display: 'block', marginBottom: '0.3rem' }}>
                          {selectedAnswers[q.id] === q.ans ? 'Correct!' : 'Incorrect'}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                          {q.exp}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  className="btn btn-outline"
                  onClick={checkFinalScore}
                  style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.5rem 1.5rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                >
                  Calculate Score
                </button>
                {score !== null && (
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#854d0e' }}>
                    Your Score: {score} / {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
                  </span>
                )}
              </div>
            </div>

            {/* Homework Assignment */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem' }}>
                <FileText size={22} color="#ca8a04" /> Homework Assignment (5 Tasks)
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '-1rem', marginBottom: '2rem' }}>
                Write JavaScript statements to solve these core exercises in your local editor:
              </p>

              <ol style={{ paddingLeft: '20px', color: '#334155', lineHeight: 1.8, fontSize: '0.92rem' }}>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 1:</strong> Declare three variables (one with <code>var</code>, one with <code>let</code>, and one with <code>const</code>) inside an isolated block. Write down which variables can be accessed outside the block and explain why.
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 2:</strong> Declare a constant object representing a student with properties `name` and `age`. Update the `age` property, and explain whether JavaScript throws an error or accepts this change.
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 3:</strong> Write code to explicitly convert:
                  <ul style={{ paddingLeft: '20px', margin: '0.3rem 0' }}>
                    <li>The string <code>"123.45"</code> to a float number.</li>
                    <li>The number <code>0</code> to a boolean.</li>
                    <li>The boolean <code>true</code> to a string.</li>
                  </ul>
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 4:</strong> Check the output and explain the coercion difference in operations:
                  <ul style={{ paddingLeft: '20px', margin: '0.3rem 0' }}>
                    <li><code>10 + "5"</code></li>
                    <li><code>"10" - 5</code></li>
                  </ul>
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Task 5:</strong> Write two comparison expressions for values <code>null</code> and <code>undefined</code> using:
                  <ul style={{ paddingLeft: '20px', margin: '0.3rem 0' }}>
                    <li>Abstract equality (<code>==</code>)</li>
                    <li>Strict equality (<code>===</code>)</li>
                  </ul>
                  Explain the returned boolean results.
                </li>
              </ol>
            </div>

            <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#ca8a04', color: '#ca8a04', padding: '0.6rem 2rem', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
                onClick={() => onNavigate('core_js_day1', 'playground')}
              >
                Back to Playgrounds
              </button>
              <button
                className="btn"
                style={{ background: '#10b981', color: '#fff', padding: '0.6rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => {
                  alert('Congratulations on completing Day 1 of Core JavaScript Course!');
                  onNavigate('dashboard');
                }}
              >
                <CheckCircle size={18} /> Complete Day 1
              </button>
            </div>

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
