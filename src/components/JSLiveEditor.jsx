import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

const presetTemplates = {
  general: [
    {
      title: 'Hello World',
      code: `// Welcome to the JavaScript Live Coding Lab!\nconsole.log("Hello, World!");\nconsole.log("Welcome to Antigravity Coding Studio!");`
    },
    {
      title: 'Variables & Types',
      code: `let userName = "John";\nconst scoreLimit = 100;\nlet currentScore = 85;\nlet isPassing = currentScore >= 50;\n\nconsole.log("User:", userName);\nconsole.log("Score Status:", currentScore + " / " + scoreLimit);\nconsole.log("Passing?", isPassing);\nconsole.log("Type of userName:", typeof userName);`
    },
    {
      title: 'Conditionals',
      code: `let age = 20;\nlet hasId = true;\n\nif (age >= 18 && hasId) {\n  console.log("Access Granted: Eligible to enter");\n} else if (age >= 18 && !hasId) {\n  console.log("Access Denied: Please show ID");\n} else {\n  console.log("Access Denied: Underage");\n}`
    },
    {
      title: 'Loops & Iteration',
      code: `console.log("--- Standard For Loop ---");\nfor (let i = 1; i <= 5; i++) {\n  console.log("Iteration " + i);\n}\n\nconsole.log("\\n--- Array Iteration ---");\nlet colors = ["Red", "Green", "Blue"];\ncolors.forEach((color, index) => {\n  console.log("Color #" + (index + 1) + ": " + color);\n});`
    },
    {
      title: 'Arrow Functions',
      code: `// Named Arrow Function\nconst calculateTax = (price, rate = 0.18) => {\n  return price * rate;\n};\n\n// Inline Arrow Function\nconst double = x => x * 2;\n\nlet itemPrice = 1200;\nlet tax = calculateTax(itemPrice);\nconsole.log("Item Price: ₹" + itemPrice);\nconsole.log("Tax Amount (18%): ₹" + tax);\nconsole.log("Double Price: ₹" + double(itemPrice));`
    },
    {
      title: 'Math & Numbers',
      code: `let randomNumber = Math.random();\nconsole.log("Random decimal (0-1):", randomNumber);\n\n// Generate random integer between 1 and 100\nlet randomInt = Math.floor(randomNumber * 100) + 1;\nconsole.log("Random integer (1-100):", randomInt);\n\nconsole.log("Math.PI:", Math.PI);\nconsole.log("Math.sqrt(64):", Math.sqrt(64));\nconsole.log("Math.pow(2, 5):", Math.pow(2, 5));`
    }
  ],
  day1: [
    {
      title: 'Day 1 Template',
      code: `// Day 1: Console, Variables & Comments\nlet course = "JavaScript Fundamentals";\nconst days = 10;\n\nconsole.log("Learning:", course);\nconsole.log("Duration:", days + " Days");\n\n// Try changing the variables and click Run!`
    }
  ],
  day2: [
    {
      title: 'Day 2 Template',
      code: `// Day 2: Operators & User Dialogs\nlet a = 15;\nlet b = 4;\n\nconsole.log("Addition:", a + b);\nconsole.log("Modulus (Remainder):", a % b);\nconsole.log("Strict Equality (15 === '15'):", a === "15");\nconsole.log("Logical AND:", (a > 10 && b < 5));`
    }
  ],
  day3: [
    {
      title: 'Day 3 Template',
      code: `// Day 3: Conditional If-Else & Switch\nlet score = 85;\nlet grade;\n\nif (score >= 90) {\n  grade = 'A+';\n} else if (score >= 80) {\n  grade = 'A';\n} else if (score >= 50) {\n  grade = 'Pass';\n} else {\n  grade = 'Fail';\n}\n\nconsole.log("Score:", score);\nconsole.log("Grade Evaluated:", grade);`
    }
  ],
  day4: [
    {
      title: 'Day 4 Template',
      code: `// Day 4: Looping Constructs\nlet count = 1;\nconsole.log("Looping from 1 to 3:");\n\nwhile (count <= 3) {\n  console.log("Count:", count);\n  count++;\n}`
    }
  ],
  day5: [
    {
      title: 'Day 5 Template',
      code: `// Day 5: Functions & Scope\nfunction greet(name = "Developer") {\n  return "Welcome, " + name + "!";\n}\n\nconsole.log(greet("John"));\nconsole.log(greet());`
    }
  ],
  day6: [
    {
      title: 'Day 6 Template',
      code: `// Day 6: Arrays and Objects\nlet student = {\n  name: "Alice",\n  skills: ["HTML", "CSS", "JS"],\n  isActive: true\n};\n\nconsole.log("Student Name:", student.name);\nconsole.log("First Skill:", student.skills[0]);\nconsole.log("Keys list:", Object.keys(student));`
    }
  ],
  day7: [
    {
      title: 'Day 7 Template',
      code: `// Day 7: String & Array Iteration methods\nlet phrase = "Learning JavaScript is awesome";\nconsole.log("Includes 'JS'?", phrase.toUpperCase().includes("JS"));\n\nlet prices = [100, 250, 600, 1200];\nlet expensive = prices.filter(p => p > 500);\nconsole.log("Filtered Prices (>500):", expensive);`
    }
  ]
};

export default function JSLiveEditor({ dayKey = 'general' }) {
  const templates = presetTemplates[dayKey] || presetTemplates.general;
  const [code, setCode] = useState(templates[0]?.code || presetTemplates.general[0].code);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [execTime, setExecTime] = useState(null);

  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    if (templates[0]) {
      setCode(templates[0].code);
    }
  }, [dayKey]);

  const handleTemplateChange = (e) => {
    const idx = Number(e.target.value);
    if (templates[idx]) {
      setCode(templates[idx].code);
      setLogs([]);
      setError('');
      setExecTime(null);
    }
  };

  const runCode = () => {
    setLogs([]);
    setError('');
    const t0 = performance.now();
    const capturedLogs = [];

    const customConsole = {
      log: (...args) => {
        capturedLogs.push(
          args.map(arg => {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
            return String(arg);
          }).join(' ')
        );
      },
      error: (...args) => {
        capturedLogs.push('❌ [ERROR] ' + args.map(arg => String(arg)).join(' '));
      },
      warn: (...args) => {
        capturedLogs.push('⚠️ [WARN] ' + args.map(arg => String(arg)).join(' '));
      }
    };

    try {
      // Use Function constructor to evaluate user JS code inside a clean scope
      const evalScript = new Function('console', code);
      evalScript(customConsole);
      const t1 = performance.now();
      setExecTime((t1 - t0).toFixed(2));
      setLogs(capturedLogs);
    } catch (err) {
      setError(err.message);
      setExecTime(null);
    }
  };

  const clearConsole = () => {
    setLogs([]);
    setError('');
    setExecTime(null);
  };

  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');

  return (
    <div style={{
      background: 'var(--surface-color, #ffffff)',
      border: '1px solid var(--surface-border, #e2e8f0)',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      marginTop: '1rem'
    }}>
      {/* Toolbar */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>⚡ JS Live Workspace</span>

          <select
            onChange={handleTemplateChange}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: 'white',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {templates.map((tmpl, idx) => (
              <option key={idx} value={idx}>{tmpl.title}</option>
            ))}
            {dayKey !== 'general' && presetTemplates.general.map((tmpl, idx) => (
              <option key={`gen-${idx}`} value={templates.length + idx}>{tmpl.title} (General)</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-outline"
            onClick={clearConsole}
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              fontWeight: 700
            }}
          >
            Clear Console
          </button>
          <button
            className="btn btn-primary"
            onClick={runCode}
            style={{
              padding: '0.4rem 1.25rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              backgroundColor: '#ca8a04',
              borderColor: '#ca8a04',
              fontWeight: 700
            }}
          >
            Run Script
          </button>
        </div>
      </div>

      {/* Editor & Console split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '480px', background: '#1e1e1e' }}>

        {/* Editor Area */}
        <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #334155', position: 'relative' }}>
          <div style={{ background: '#141414', color: '#8892b0', fontSize: '0.75rem', padding: '0.4rem 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #2d3748', display: 'flex', justifyContent: 'space-between' }}>
            <span>main.js</span>
            <span style={{ color: '#ca8a04' }}>Editable</span>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleScroll}
              spellCheck={false}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1.2rem',
                fontFamily: '"Fira Code", monospace', fontSize: '13px', lineHeight: 1.6,
                border: 'none', margin: 0, color: 'transparent', caretColor: 'white',
                background: 'transparent', resize: 'none', outline: 'none', zIndex: 2, whiteSpace: 'pre',
                width: '100%', height: '100%', boxSizing: 'border-box'
              }}
            />
            <pre
              aria-hidden="true"
              ref={highlightRef}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1.2rem',
                fontFamily: '"Fira Code", monospace', fontSize: '13px', lineHeight: 1.6,
                border: 'none', margin: 0, color: '#a5d6ff', zIndex: 1, pointerEvents: 'none',
                overflow: 'hidden', width: '100%', height: '100%', boxSizing: 'border-box'
              }}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </div>
        </div>

        {/* Console Logs Area */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
          <div style={{ background: '#141414', color: '#8892b0', fontSize: '0.75rem', padding: '0.4rem 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #2d3748', display: 'flex', justifyContent: 'space-between' }}>
            <span>Console Output</span>
            {execTime && <span style={{ color: '#4ade80' }}>Executed in {execTime}ms</span>}
          </div>

          <div style={{
            flex: 1,
            padding: '1.2rem',
            fontFamily: '"Fira Code", monospace',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#f8fafc',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxSizing: 'border-box'
          }}>
            {/* Show logs */}
            {logs.map((log, idx) => (
              <div key={idx} style={{
                color: log.startsWith('❌') ? '#f87171' : log.startsWith('⚠️') ? '#fbbf24' : '#e2e8f0',
                borderBottom: '1px solid #141414',
                paddingBottom: '0.3rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
              }}>
                {log}
              </div>
            ))}

            {/* Show runtime syntax/evaluation error */}
            {error && (
              <div style={{
                color: '#f87171',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontWeight: '600'
              }}>
                🛑 Runtime Error: {error}
              </div>
            )}

            {/* Default state */}
            {logs.length === 0 && !error && (
              <div style={{ color: '#4b5563', fontStyle: 'italic', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
                Console is empty.<br />Click "Run Script" to execute code and see console logs.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
