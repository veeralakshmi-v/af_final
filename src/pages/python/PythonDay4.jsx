import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, Play, Trophy, Code, Zap, RefreshCw, BookOpen, Cpu, Filter, Terminal } from 'lucide-react';

/* ─────────────────────────────────────────────
   SHARED UI HELPERS
───────────────────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} className="learning-card">
    <div style={{ marginBottom:'1.5rem' }}>
      <span style={{ color:'var(--accent-secondary)', fontWeight:600, fontSize:'0.9rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize:'2rem', marginTop:'0.5rem', color:'#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CodeBlock = ({ title, children }) => (
  <div style={{ borderRadius:'12px', overflow:'hidden', marginBottom:'1.6rem', border:'1px solid #334155' }}>
    {title && (
      <div style={{ background:'#1e293b', padding:'0.55rem 1.2rem', display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #334155' }}>
        <Code size={14} color="#38bdf8"/>
        <span style={{ color:'#94a3b8', fontSize:'0.8rem', fontWeight:600 }}>{title}</span>
      </div>
    )}
    <div style={{ background:'#0f172a', color:'#f8fafc', padding:'1.3rem', fontFamily:'monospace', fontSize:'0.91rem', lineHeight:1.9, overflowX:'auto' }}>{children}</div>
  </div>
);

/* Syntax helpers */
const c  = t => <span style={{ color:'#64748b' }}>{t}</span>;
const kw = t => <span style={{ color:'#f472b6' }}>{t}</span>;
const fn = t => <span style={{ color:'#38bdf8' }}>{t}</span>;
const nm = t => <span style={{ color:'#fbbf24' }}>{t}</span>;
const st = t => <span style={{ color:'#a5b4fc' }}>{t}</span>;
const ok = t => <span style={{ color:'#10b981' }}>{t}</span>;

/* ─────────────────────────────────────────────
   AST-BASED PYTHON INTERPRETER
───────────────────────────────────────────── */
function mergeMultiLineStatements(code) {
  const rawLines = code.split('\n');
  const mergedLines = [];
  let currentLine = '';
  let openParens = 0, openBrackets = 0, openBraces = 0;
  let inStr = false, strChar = '';
  for (let rIdx = 0; rIdx < rawLines.length; rIdx++) {
    const line = rawLines[rIdx];
    let idx = 0;
    while (idx < line.length) {
      const c = line[idx];
      if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; }
      else if (inStr && c === strChar && line[idx - 1] !== '\\') { inStr = false; }
      else if (!inStr) {
        if (c === '(') openParens++; else if (c === ')') openParens--;
        else if (c === '[') openBrackets++; else if (c === ']') openBrackets--;
        else if (c === '{') openBraces++; else if (c === '}') openBraces--;
      }
      idx++;
    }
    if (currentLine) { currentLine += ' ' + line.trim(); } else { currentLine = line; }
    if (openParens <= 0 && openBrackets <= 0 && openBraces <= 0) {
      mergedLines.push(currentLine);
      currentLine = ''; openParens = 0; openBrackets = 0; openBraces = 0;
    }
  }
  if (currentLine.trim()) mergedLines.push(currentLine);
  return mergedLines;
}

function parsePython(code) {
  const lines = mergeMultiLineStatements(code);
  let i = 0;

  function parseBlock(baseIndent) {
    const block = [];
    while (i < lines.length) {
      const line = lines[i];
      const trimLine = line.trim();
      if (!trimLine || trimLine.startsWith('#')) {
        i++;
        continue;
      }
      const indent = line.search(/\S/);
      if (indent < baseIndent) {
        break; // exiting loop/if body
      }
      if (indent === baseIndent) {
        if (trimLine.startsWith('import ')) {
          block.push({ type: 'pass' });
          i++;
          continue;
        }
        if (trimLine.startsWith('if ')) {
          const cond = trimLine.slice(3, -1);
          i++;
          const body = parseBlock(baseIndent + 4);
          const elifs = [];
          let else_body = null;
          
          while (i < lines.length) {
            const nextTrim = lines[i].trim();
            const nextIndent = lines[i].search(/\S/);
            if (nextIndent !== baseIndent) break;
            if (nextTrim.startsWith('elif ')) {
              const elifCond = nextTrim.slice(5, -1);
              i++;
              const elifBody = parseBlock(baseIndent + 4);
              elifs.push({ cond: elifCond, body: elifBody });
            } else if (nextTrim.startsWith('else:')) {
              i++;
              else_body = parseBlock(baseIndent + 4);
              break;
            } else {
              break;
            }
          }
          block.push({ type: 'if', cond, body, elifs, else_body });
          continue;
        }

        if (trimLine.startsWith('for ')) {
          const match = trimLine.match(/^for\s+(.+?)\s+in\s+(.+):$/);
          if (match) {
            const varName = match[1].trim();
            const iterExpr = match[2].trim();
            i++;
            const body = parseBlock(baseIndent + 4);
            block.push({ type: 'for', varName, iterExpr, body });
            continue;
          }
        }

        if (trimLine.startsWith('while ')) {
          const cond = trimLine.slice(6, -1);
          i++;
          const body = parseBlock(baseIndent + 4);
          block.push({ type: 'while', cond, body });
          continue;
        }

        if (trimLine === 'break') {
          block.push({ type: 'break' });
          i++;
          continue;
        }

        if (trimLine === 'continue') {
          block.push({ type: 'continue' });
          i++;
          continue;
        }

        if (trimLine === 'pass') {
          block.push({ type: 'pass' });
          i++;
          continue;
        }

        if (trimLine.startsWith('print(')) {
          block.push({ type: 'print', line: trimLine });
          i++;
          continue;
        }

        // x = val or x += val
        const assignMatch = trimLine.match(/^([a-zA-Z_]\w*)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
        if (assignMatch) {
          block.push({ type: 'assign', name: assignMatch[1], op: assignMatch[2] ? assignMatch[2] + '=' : '=', expr: assignMatch[3] });
          i++;
          continue;
        }

        block.push({ type: 'expr', expr: trimLine });
        i++;
      } else {
        i++;
      }
    }
    return block;
  }

  return parseBlock(0);
}

function interpretPython(ast, env, inputs, output) {
  let inputIdx = 0;
  let totalInstructions = 0;
  const instructionLimit = 5000;

  const getInput = () => {
    const val = inputs[inputIdx] !== undefined ? String(inputs[inputIdx]) : '';
    inputIdx++;
    return val;
  };

  const evalExpr = (expr) => {
    expr = expr.trim();
    const isSingleStringLiteral = /^"([^"\\]|\\.)*"$/.test(expr) || /^'([^'\\]|\\.)*'$/.test(expr);
    if (isSingleStringLiteral) {
      return expr.slice(1, -1);
    }
    if (expr === 'True') return true;
    if (expr === 'False') return false;
    if (expr === 'None') return null;

    if (/^int\((.+)\)$/.test(expr)) return parseInt(evalExpr(expr.match(/^int\((.+)\)$/)[1]), 10);
    if (/^float\((.+)\)$/.test(expr)) return parseFloat(evalExpr(expr.match(/^float\((.+)\)$/)[1]));
    if (/^str\((.+)\)$/.test(expr)) return String(evalExpr(expr.match(/^str\((.+)\)$/)[1]));
    if (/^bool\((.+)\)$/.test(expr)) return Boolean(evalExpr(expr.match(/^bool\((.+)\)$/)[1]));
    if (/^input\(.*\)$/.test(expr)) return getInput();
    if (/^len\((.+)\)$/.test(expr)) { const v = evalExpr(expr.match(/^len\((.+)\)$/)[1]); return v ? v.length : 0; }
    if (/^ord\((.+)\)$/.test(expr)) return String(evalExpr(expr.match(/^ord\((.+)\)$/)[1])).charCodeAt(0);
    if (/^chr\((.+)\)$/.test(expr)) return String.fromCharCode(Number(evalExpr(expr.match(/^chr\((.+)\)$/)[1])));

    if (/^f["']/.test(expr)) {
      const inner = expr.slice(2, -1);
      return inner.replace(/\{([^}]+)\}/g, (_, k) => {
        let valExpr = k.trim();
        let format = null;
        if (valExpr.includes(':')) {
          const parts = valExpr.split(':');
          valExpr = parts[0].trim();
          format = parts[1].trim();
        }
        const v = evalExpr(valExpr);
        if (v !== undefined) {
          if (format) {
            const fMatch = format.match(/^\.(\d+)f$/);
            if (fMatch) {
              return Number(v).toFixed(Number(fMatch[1]));
            }
          }
          return String(v);
        }
        return '';
      });
    }

    // range() helper
    if (/^range\((.+)\)$/.test(expr)) {
      const argsStr = expr.match(/^range\((.+)\)$/)[1];
      const args = argsStr.split(',').map(x => Number(evalExpr(x.trim())));
      let start = 0, stop = 0, step = 1;
      if (args.length === 1) {
        stop = args[0];
      } else if (args.length === 2) {
        start = args[0];
        stop = args[1];
      } else if (args.length === 3) {
        start = args[0];
        stop = args[1];
        step = args[2];
      }
      const vals = [];
      if (step > 0) {
        for (let idx = start; idx < stop; idx += step) vals.push(idx);
      } else if (step < 0) {
        for (let idx = start; idx > stop; idx += step) vals.push(idx);
      }
      return vals;
    }

    // List e.g. [1, 2, 3] or ["A", "B"]
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return [];
      const items = [];
      let cur = '', inStr = false, strChar = '';
      for (let c of inner) {
        if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; cur += c; }
        else if (inStr && c === strChar) { inStr = false; cur += c; }
        else if (!inStr && c === ',') { items.push(cur.trim()); cur = ''; }
        else cur += c;
      }
      if (cur.trim()) items.push(cur.trim());
      return items.map(x => evalExpr(x));
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) {
      if (env[expr] !== undefined) return env[expr];
      throw new Error(`NameError: '${expr}' is not defined`);
    }

    let safe = expr;
    Object.keys(env).sort((a, b) => b.length - a.length).forEach(k => {
      const v = env[k];
      const rep = typeof v === 'string' ? `"${v.replace(/"/g, '\\"')}"` : v === true ? 'true' : v === false ? 'false' : v === null ? 'null' : Array.isArray(v) ? JSON.stringify(v) : String(v);
      safe = safe.replace(new RegExp(`\\b${k}\\b`, 'g'), rep);
    });
    safe = safe.replace(/ and /g, ' && ').replace(/ or /g, ' || ').replace(/ not /g, ' !').replace(/^not /, '!').replace(/==/g, '===').replace(/!=/g, '!==');
    try {
      return Function(`"use strict"; return (${safe})`)();
    } catch (e) {
      throw new Error(`SyntaxError in: ${expr}`);
    }
  };

  const parsePrint = (trimLn) => {
    const m = trimLn.match(/^print\((.*)\)$/);
    if (!m) return;
    const inner = m[1];
    let endStr = '\n';
    let contentExpr = inner;

    const endMatch = inner.match(/,\s*end\s*=\s*(["'].*?["'])$/);
    if (endMatch) {
      endStr = evalExpr(endMatch[1]);
      contentExpr = inner.replace(/,\s*end\s*=\s*["'].*?["']$/, '');
    }

    if (!contentExpr.trim()) {
      output.push(endStr);
      return;
    }

    const args = [];
    let depth = 0, cur = '', inStr = false, strChar = '';
    for (let c of contentExpr) {
      if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; cur += c; }
      else if (inStr && c === strChar) { inStr = false; cur += c; }
      else if (!inStr && c === '(') { depth++; cur += c; }
      else if (!inStr && c === ')') { depth--; cur += c; }
      else if (!inStr && c === ',' && depth === 0) { args.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    if (cur.trim()) args.push(cur.trim());

    const printed = args.map(a => {
      const v = evalExpr(a.trim());
      return v === true ? 'True' : v === false ? 'False' : v === null ? 'None' : String(v);
    }).join(' ');

    output.push(printed + endStr);
  };

  function execBlock(nodes) {
    for (const node of nodes) {
      totalInstructions++;
      if (totalInstructions > instructionLimit) {
        throw new Error("TimeLimitExceeded: Infinite loop or loop limit reached.");
      }

      if (node.type === 'assign') {
        const { name, op, expr } = node;
        let val = evalExpr(expr);
        if (op !== '=') {
          const cur = env[name] !== undefined ? env[name] : 0;
          if (op === '+=') val = cur + val;
          else if (op === '-=') val = cur - val;
          else if (op === '*=') val = cur * val;
          else if (op === '/=') val = cur / val;
          else if (op === '//=') val = Math.floor(cur / val);
          else if (op === '%=') val = cur % val;
          else if (op === '**=') val = Math.pow(cur, val);
        }
        env[name] = val;
      } else if (node.type === 'print') {
        parsePrint(node.line);
      } else if (node.type === 'break') {
        return 'break';
      } else if (node.type === 'continue') {
        return 'continue';
      } else if (node.type === 'pass') {
        // do nothing
      } else if (node.type === 'expr') {
        evalExpr(node.expr);
      } else if (node.type === 'if') {
        const condVal = Boolean(evalExpr(node.cond));
        let branchMatched = false;
        if (condVal) {
          const status = execBlock(node.body);
          if (status) return status;
          branchMatched = true;
        } else {
          for (const elif of node.elifs) {
            if (Boolean(evalExpr(elif.cond))) {
              const status = execBlock(elif.body);
              if (status) return status;
              branchMatched = true;
              break;
            }
          }
        }
        if (!branchMatched && node.else_body) {
          const status = execBlock(node.else_body);
          if (status) return status;
        }
      } else if (node.type === 'for') {
        const items = evalExpr(node.iterExpr);
        if (Array.isArray(items) || typeof items === 'string') {
          for (const item of items) {
            env[node.varName] = item;
            const status = execBlock(node.body);
            if (status === 'break') break;
            if (status === 'continue') continue;
            if (status) return status;
          }
        }
      } else if (node.type === 'while') {
        while (Boolean(evalExpr(node.cond))) {
          const status = execBlock(node.body);
          if (status === 'break') break;
          if (status === 'continue') continue;
          if (status) return status;

          totalInstructions++;
          if (totalInstructions > instructionLimit) {
            throw new Error("TimeLimitExceeded: Infinite loop detected.");
          }
        }
      }
    }
    return null;
  }

  try {
    execBlock(ast);
  } catch (e) {
    return { lines: [`Error: ${e.message}`], isError: true };
  }

  const formattedOutput = [];
  let buffer = '';
  for (const chunk of output) {
    buffer += chunk;
    if (buffer.endsWith('\n')) {
      formattedOutput.push(buffer.slice(0, -1));
      buffer = '';
    }
  }
  if (buffer) {
    formattedOutput.push(buffer);
  }

  return { lines: formattedOutput.length ? formattedOutput : ['(no output)'], isError: false };
}

/* ─── LIVE PLAYGROUND COMPONENT ─── */
function Playground({ id, defaultCode, inputs = [], title = 'Live Python Playground' }) {
  const [code, setCode]       = useState(defaultCode);
  const [vals, setVals]       = useState(inputs.map(i => i.default));
  const [output, setOutput]   = useState(null);
  const [ran, setRan]         = useState(false);

  const run = () => {
    try {
      const ast = parsePython(code);
      const res = interpretPython(ast, {}, vals, []);
      setOutput(res);
    } catch(e) {
      setOutput({ lines: [`RuntimeError: ${e.message}`], isError: true });
    }
    setRan(true);
  };
  const reset = () => { setCode(defaultCode); setVals(inputs.map(i=>i.default)); setOutput(null); setRan(false); };

  return (
    <div style={{ background:'#0f172a', borderRadius:'16px', overflow:'hidden', marginBottom:'2rem', border:'1px solid #334155' }}>
      <div style={{ background:'#1e293b', padding:'0.75rem 1.4rem', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #334155' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span>🐍</span>
          <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.93rem' }}>{title}</span>
          <span style={{ background:'#10b981', color:'white', fontSize:'0.68rem', padding:'0.1rem 0.5rem', borderRadius:'20px', fontWeight:700 }}>LIVE</span>
        </div>
        <button onClick={reset} style={{ background:'transparent', border:'none', color:'#64748b', cursor:'pointer', fontSize:'0.78rem', display:'flex', alignItems:'center', gap:'4px' }}>
          <RefreshCw size={12}/> Reset
        </button>
      </div>
      {inputs.length > 0 && (
        <div style={{ background:'#162032', padding:'0.7rem 1.4rem', borderBottom:'1px solid #1e293b', display:'flex', flexWrap:'wrap', gap:'1rem', alignItems:'center' }}>
          <span style={{ color:'#64748b', fontSize:'0.78rem', fontWeight:600 }}>USER INPUT:</span>
          {inputs.map((inp,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <label style={{ color:'#94a3b8', fontSize:'0.8rem' }}>{inp.label}</label>
              <input value={vals[i]} onChange={e=>{ const v=[...vals]; v[i]=e.target.value; setVals(v); }}
                style={{ background:'#1e293b', border:'1px solid #475569', color:'#e2e8f0', padding:'0.3rem 0.6rem', borderRadius:'6px', width:inp.width||'80px', fontSize:'0.88rem', fontFamily:'monospace' }}/>
            </div>
          ))}
        </div>
      )}
      <textarea value={code} onChange={e=>setCode(e.target.value)} spellCheck={false}
        style={{ width:'100%', minHeight:'155px', background:'#0d1b2a', color:'#e2e8f0', fontFamily:'monospace', fontSize:'0.89rem', lineHeight:1.8, padding:'1.1rem', border:'none', outline:'none', resize:'vertical', borderBottom:'1px solid #1e293b', boxSizing:'border-box' }}/>
      <div style={{ padding:'0.75rem 1.4rem', display:'flex', alignItems:'center', gap:'1rem', background:'#111827' }}>
        <button onClick={run}
          style={{ background:'linear-gradient(135deg,#10b981,#059669)', color:'white', border:'none', padding:'0.52rem 1.5rem', borderRadius:'8px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'0.9rem', boxShadow:'0 4px 12px rgba(16,185,129,0.3)' }}>
          <Play size={14} fill="white"/> Run Code
        </button>
        {ran && <span style={{ color:'#64748b', fontSize:'0.78rem' }}>Done</span>}
      </div>
      {output && (
        <div style={{ borderTop:'1px solid #1e293b', padding:'0.9rem 1.4rem', background:'#0a1628' }}>
          <div style={{ color:'#64748b', fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', marginBottom:'0.4rem', letterSpacing:'0.06em' }}>Output</div>
          {output.lines.map((line,i) => (
            <div key={i} style={{ fontFamily:'monospace', fontSize:'0.9rem', color: output.isError?'#f87171':'#34d399', lineHeight:1.8 }}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   QUIZ DATA
───────────────────────────────────────────── */
const quizData = [
  { q:"Which loop is best suited when you know the exact number of iterations in advance?", opts:["while loop","do-while loop","for loop","infinite loop"], ans:2, exp:"The 'for' loop is standard for iterating a predetermined sequence or range." },
  { q:"What is the output of: range(5)?", opts:["1, 2, 3, 4, 5","0, 1, 2, 3, 4","0, 1, 2, 3, 4, 5","5, 4, 3, 2, 1, 0"], ans:1, exp:"range(5) generates numbers from 0 up to (but not including) 5: 0, 1, 2, 3, 4." },
  { q:"What keyword is used to terminate a loop immediately?", opts:["continue","stop","exit","break"], ans:3, exp:"The 'break' keyword exits the innermost active loop immediately." },
  { q:"What does 'continue' do inside a loop?", opts:["Restarts the loop from index 0","Terminates the program","Skips the rest of the current iteration and moves to the next","Does nothing"], ans:2, exp:"'continue' skips all remaining statements in the current iteration and jumps straight to the next evaluation." },
  { q:"Which condition runs a while loop forever?", opts:["while False:","while True:","while None:","while 0:"], ans:1, exp:"'while True:' is an infinite loop because the condition is always True." },
  { q:"What is a loop inside another loop called?", opts:["Nested loop","Double loop","Recursive loop","Cascading loop"], ans:0, exp:"A loop placed inside the body of another loop is called a nested loop." },
  { q:"What is the purpose of 'pass' in Python?", opts:["Terminates loops","Skips to next iteration","Serves as a syntactic placeholder that does nothing","Prints output"], ans:2, exp:"'pass' is a null statement. It is used as a placeholder where code is syntactically required but no action is needed." },
  { q:"What is the output of range(2, 10, 3)?", opts:["2, 5, 8","2, 5, 8, 11","3, 6, 9","2, 10, 3"], ans:0, exp:"Start = 2, Stop = 10, Step = 3. Generating: 2, 2+3=5, 5+3=8. (Next is 11, which exceeds 10)." },
  { q:"Which collection types can you iterate over using a for loop?", opts:["Lists only","Strings only","Ranges only","All of lists, strings, and ranges"], ans:3, exp:"You can iterate over strings, lists, tuples, dicts, ranges, and any other iterable collections." },
  { q:"How do you print on the same line without starting a new line in Python?", opts:["print(x, newLine=False)","print(x, end=' ')","print(x, join=' ')","print(x)"], ans:1, exp:"Adding the parameter end=' ' or any string to print() changes the default trailing newline character." },
  { q:"What happens to variables inside a loop block?", opts:["They are local and deleted after the loop","They remain accessible after the loop finishes","They cause an Error","They become constants"], ans:1, exp:"In Python, loops do not create a new scope. Variables assigned inside a loop remain accessible outside of it." },
  { q:"Which loop type repeatedly executes a block as long as a condition remains True?", opts:["for loop","while loop","nested loop","if-else ladder"], ans:1, exp:"The 'while' loop checks a condition on every iteration and runs as long as it evaluates to True." }
];

/* ─────────────────────────────────────────────
   MAIN DAY 4 MODULE COMPONENT
───────────────────────────────────────────── */
export default function PythonDay4({ activeTab, onNavigate }) {
  const [quizAnswers, setQuizAnswers]     = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const nav = (tab) => { onNavigate('python_day4', tab); window.scrollTo({ top:0, behavior:'smooth' }); };
  const quizScore = quizData.reduce((a, q, i) => a + (quizAnswers[i] === q.ans ? 1 : 0), 0);

  return (
    <AnimatePresence mode="wait">

      {/* ─── TAB 1: INTRO ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 4 • Introduction" title="Loops in Python">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.6rem', margin:'0 0 1rem', fontWeight:800 }}>What is a Loop?</h3>
              <p style={{ color:'#bfdbfe', lineHeight:1.7, margin:0, fontSize:'1.05rem' }}>
                A <strong>loop</strong> is a programming structure that repeats a block of instructions as long as a certain condition is met, or iterates over a sequence of items. It eliminates redundant code by executing statements repeatedly.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
              {[
                { n:'01', icon:'🔁', title:'for loop', desc:'Iterates over a sequence (range, list, string, etc.). Best when iterations are known.', col:'#3b82f6', bg:'#eff6ff' },
                { n:'02', icon:'🔄', title:'while loop', desc:'Repeats block as long as a condition is True. Best when stopping condition is dynamic.', col:'#10b981', bg:'#f0fdf4' },
                { n:'03', icon:'📦', title:'Loop Control', desc:'break, continue, and pass statements that modify the loop\'s execution flow.', col:'#f59e0b', bg:'#fffbeb' },
                { n:'04', icon:'🪆', title:'Nested Loops', desc:'Putting a loop inside another loop. Often used for row/column operations and patterns.', col:'#8b5cf6', bg:'#f5f3ff' },
              ].map(i => (
                <div key={i.n} style={{ background:i.bg, borderRadius:'12px', padding:'1.4rem', border:`1px solid ${i.col}25` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.6rem' }}>
                    <span style={{ fontSize:'1.3rem' }}>{i.icon}</span>
                    <h4 style={{ margin:0, color:'#0f172a' }}>{i.title}</h4>
                  </div>
                  <p style={{ margin:0, color:'#475569', fontSize:'0.88rem', lineHeight:1.5 }}>{i.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock title="loops_intro.py — Basic loop concept">
              {c('# Repeating print() 5 times without a loop is bad practice:')}<br/>
              print({st('"Hello"')})<br/>
              print({st('"Hello"')})<br/>
              {c('# ... repeats 3 more times')}<br/><br/>
              {c('# With a loop, it takes only 2 lines:')}<br/>
              {kw('for')} i {kw('in')} {fn('range')}({nm('5')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Hello"')})
            </CodeBlock>

            <Playground
              id="intro"
              title="Try it — Change the range stop number and run"
              defaultCode={`# This prints "Hello" 5 times
for i in range(5):
    print("Hello", i)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('for_loop')}>Next: for loop <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: FOR LOOP ─── */}
      {activeTab === 'for_loop' && (
        <Section key="for_loop" eyebrow="Day 4 • Loop Types" title="The for Loop">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              The <code>for</code> loop iterates over an iterable collection (like a string, list, or range). Python fetches the next item in the collection, assigns it to the loop variable, and executes the block.
            </p>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🔧 Understanding range()</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              The <code>range(start, stop, step)</code> function generates numbers. It is <strong>inclusive</strong> of start, but <strong>exclusive</strong> of stop.
            </p>

            <div style={{ overflowX:'auto', marginBottom:'2rem' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'12px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
                <thead>
                  <tr style={{ background:'#1d4ed8', color:'white' }}>
                    {['Syntax','Output Sequence','Description'].map(h => <th key={h} style={{ padding:'0.9rem 1rem', fontSize:'0.88rem' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { syn:'range(5)', res:'0, 1, 2, 3, 4', desc:'Starts at 0 by default, stops before 5.' },
                    { syn:'range(2, 7)', res:'2, 3, 4, 5, 6', desc:'Starts at 2, stops before 7.' },
                    { syn:'range(1, 10, 2)', res:'1, 3, 5, 7, 9', desc:'Starts at 1, steps (jumps) by 2.' },
                    { syn:'range(5, 0, -1)', res:'5, 4, 3, 2, 1', desc:'Negative step for reverse countdown.' },
                  ].map((r,i) => (
                    <tr key={i} style={{ borderBottom:'1px solid #e2e8f0', background:i%2===1?'#f8fafc':'white' }}>
                      <td style={{ padding:'0.85rem 1rem' }}><code style={{ background:'#eff6ff', color:'#1d4ed8', padding:'0.25rem 0.6rem', borderRadius:'6px', fontWeight:700 }}>{r.syn}</code></td>
                      <td style={{ padding:'0.85rem 1rem', fontFamily:'monospace', fontWeight:700, color:'#065f46' }}>{r.res}</td>
                      <td style={{ padding:'0.85rem 1rem', color:'#475569', fontSize:'0.88rem' }}>{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock title="for_loop_examples.py — Range and string loops">
              {c('# Example 1: Sum numbers from 1 to 5')}<br/>
              total = {nm('0')}<br/>
              {kw('for')} num {kw('in')} {fn('range')}({nm('1')}, {nm('6')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;total += num<br/>
              {fn('print')}({st('"Total sum:"')}, total) {ok('# → Total sum: 15')}<br/><br/>

              {c('# Example 2: Looping through a String')}<br/>
              word = {st('"PY"')}<br/>
              {kw('for')} char {kw('in')} word:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(char) {ok('# prints P then Y')}<br/><br/>

              {c('# Example 3: Looping through a List')}<br/>
              fruits = [{st('"apple"')}, {st('"banana"')}]<br/>
              {kw('for')} fruit {kw('in')} fruits:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"I like"')}, fruit)
            </CodeBlock>

            <Playground
              id="for_loop"
              title="for Loop Playground"
              defaultCode={`# Try modifying the range parameters
print("Numbers:")
for i in range(1, 10, 2):
    print(i)

print("Sum of numbers:")
total = 0
for num in range(1, 6):
    total += num
print("Total:", total)

print("Character loop:")
for char in "PYTHON":
    print("Char:", char)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('while_loop')}>Next: while loop <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: WHILE LOOP ─── */}
      {activeTab === 'while_loop' && (
        <Section key="while_loop" eyebrow="Day 4 • Loop Types" title="The while Loop">
          <div className="panel">
            <div style={{ background:'#f0fdf4', borderLeft:'4px solid #10b981', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#065f46', lineHeight:1.7 }}>
                A <code>while</code> loop checks a condition first. If it is <code>True</code>, it runs the block and checks the condition again. This loops continuously until the condition becomes <code>False</code>.
              </p>
            </div>

            <div style={{ background:'#fee2e2', borderLeft:'4px solid #ef4444', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <h4 style={{ color:'#991b1b', margin:'0 0 0.4rem', display:'flex', alignItems:'center', gap:'6px' }}><XCircle size={18}/> ⚠️ Warning: Infinite Loops</h4>
              <p style={{ margin:0, color:'#7f1d1d', fontSize:'0.9rem', lineHeight:1.6 }}>
                If the condition never becomes <code>False</code>, the loop runs forever, freezing the computer. Always ensure the loop variable is updated (e.g. <code>i += 1</code>) inside the block.
              </p>
            </div>

            <CodeBlock title="while_examples.py — Countdown and Sentinel validation">
              {c('# Example 1: Standard countdown loop')}<br/>
              count = {nm('3')}<br/>
              {kw('while')} count &gt; {nm('0')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(count)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;count -= {nm('1')} &nbsp;{c('# decrement variable so loop stops')}<br/>
              {fn('print')}({st('"Blast off! 🚀"')})<br/><br/>

              {c('# Example 2: Interactive sentinel simulator')}<br/>
              tries = {nm('1')}<br/>
              {kw('while')} tries &lt;= {nm('3')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Try number:"')}, tries)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;tries += {nm('1')}
            </CodeBlock>

            <Playground
              id="while_loop"
              title="while Loop Playground"
              defaultCode={`# Countdown
count = 5
while count > 0:
    print("Countdown:", count)
    count -= 1
print("Blast off!")

# Infinite Loop Safe check:
# If you run a loop that runs too long, the simulator stops it automatically.`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('nested_loops')}>Next: Nested Loops <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: NESTED LOOPS ─── */}
      {activeTab === 'nested_loops' && (
        <Section key="nested_loops" eyebrow="Day 4 • Advanced Loops" title="Nested Loops">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              A <strong>nested loop</strong> is a loop statement placed inside the body of another loop. The outer loop runs once, and then the inner loop runs completely through its iterations before the outer loop continues to its next iteration.
            </p>

            <CodeBlock title="nested_loops.py — Grid coordinates example">
              {c('# Outer loop handles rows')}<br/>
              {kw('for')} row {kw('in')} {fn('range')}({nm('1')}, {nm('3')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Inner loop handles columns')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} col {kw('in')} {fn('range')}({nm('1')}, {nm('4')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"{row},{col}"')}, end={st('" "')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}() {c('# prints a newline at the end of each row')}<br/><br/>
              {ok('# Output:')}<br/>
              {ok('# 1,1 1,2 1,3')}<br/>
              {ok('# 2,1 2,2 2,3')}
            </CodeBlock>

            <Playground
              id="nested_loops"
              title="Nested Loops Playground"
              defaultCode={`# This generates a coordinate grid
for x in range(1, 4):
    for y in range(1, 4):
        print(f"({x},{y})", end=" ")
    print() # Newline`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('loop_control')}>Next: Loop Control <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: LOOP CONTROL ─── */}
      {activeTab === 'loop_control' && (
        <Section key="loop_control" eyebrow="Day 4 • Loop Control" title="break, continue, and pass">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              Python provides three control statements to alter the loop sequence dynamically based on intermediate checks.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
              {[
                { kw:'break', title:'Exit Loop', desc:'Terminates the loop immediately and jumps to the line following the loop.', col:'#ef4444', bg:'#fef2f2' },
                { kw:'continue', title:'Skip Iteration', desc:'Skips the rest of the statements in the current iteration and jumps to the next loop pass.', col:'#3b82f6', bg:'#eff6ff' },
                { kw:'pass', title:'Empty Placeholder', desc:'A null statement. Used as a syntax placeholder where code is required but no action should be taken.', col:'#64748b', bg:'#f8fafc' },
              ].map(item => (
                <div key={item.kw} style={{ background:item.bg, padding:'1.5rem', borderRadius:'14px', border:`2px solid ${item.col}` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.6rem' }}>
                    <code style={{ background:item.col, color:'white', padding:'0.25rem 0.7rem', borderRadius:'8px', fontWeight:700 }}>{item.kw}</code>
                    <strong style={{ color:'#0f172a' }}>{item.title}</strong>
                  </div>
                  <p style={{ margin:0, color:'#475569', fontSize:'0.88rem', lineHeight:1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock title="control_statements.py — break, continue and pass patterns">
              {c('# 1. break example')}<br/>
              {kw('for')} i {kw('in')} {fn('range')}({nm('1')}, {nm('6')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} i == {nm('4')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('break')} {c('# terminates at 4')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(i) {ok('# prints 1, 2, 3')}<br/><br/>

              {c('# 2. continue example')}<br/>
              {kw('for')} i {kw('in')} {fn('range')}({nm('1')}, {nm('6')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} i == {nm('3')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('continue')} {c('# skips 3')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(i) {ok('# prints 1, 2, 4, 5')}<br/><br/>

              {c('# 3. pass example')}<br/>
              {kw('for')} i {kw('in')} {fn('range')}({nm('1')}, {nm('4')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} i == {nm('2')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('pass')} {c('# place holder, does nothing')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(i) {ok('# prints 1, 2, 3')}
            </CodeBlock>

            <Playground
              id="loop_control"
              title="Loop Control Playground"
              defaultCode={`print("Testing Break:")
for i in range(1, 10):
    if i == 5:
        break
    print("Num:", i)

print("\\nTesting Continue:")
for i in range(1, 6):
    if i == 3:
        continue
    print("Num:", i)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('pattern_printing')}>Next: Pattern Printing <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: PATTERN PRINTING ─── */}
      {activeTab === 'pattern_printing' && (
        <Section key="pattern_printing" eyebrow="Day 4 • Application" title="Pattern Printing">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              Pattern printing is an excellent way to master nested loop logics. By controlling the iterations of the outer loop (rows) and inner loop (columns), we print characters in different shapes.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem', marginBottom:'2rem' }}>
              <div>
                <h4 style={{ color:'#0f172a', marginBottom:'0.5rem' }}>⭐ Star Triangle Pattern</h4>
                <CodeBlock>
                  {kw('for')} i {kw('in')} {fn('range')}({nm('1')}, {nm('6')}):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} j {kw('in')} {fn('range')}(i):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"*"')}, end={st('" "')})<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}()
                </CodeBlock>
              </div>
              <div>
                <h4 style={{ color:'#0f172a', marginBottom:'0.5rem' }}>🔢 Number Triangle Pattern</h4>
                <CodeBlock>
                  {kw('for')} i {kw('in')} {fn('range')}({nm('1')}, {nm('6')}):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} j {kw('in')} {fn('range')}({nm('1')}, i + {nm('1')}):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(j, end={st('" "')})<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}()
                </CodeBlock>
              </div>
            </div>

            <Playground
              id="pattern_printing"
              title="Pattern Printing Playground"
              defaultCode={`# 1. Print a Star Triangle
print("Star Triangle:")
for i in range(1, 6):
    for j in range(i):
        print("*", end=" ")
    print()

print("\\n2. Print a Number Triangle:")
for i in range(1, 6):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('practice')}>Next: Guessing Game Project <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 7: PRACTICE PROJECT ─── */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 4 • Capstone" title="🎲 Number Guessing Game">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0369a1)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.5rem', margin:'0 0 0.8rem', fontWeight:800 }}>Capstone: Secret Number Guessing</h3>
              <p style={{ color:'#bae6fd', margin:0, lineHeight:1.7 }}>
                Combine loops and conditional statements to create a guessing game. The program loops up to 3 times to ask the user to guess a secret number.
              </p>
            </div>

            <CodeBlock title="guessing_game.py — pure loop + logic (no def)">
              secret_number = {nm('7')}<br/>
              attempts = {nm('1')}<br/>
              guess_limit = {nm('3')}<br/>
              win = {kw('False')}<br/><br/>
              {kw('while')} attempts &lt;= guess_limit:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('""Try number {attempts} of {guess_limit}""')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;guess = {fn('int')}({fn('input')}({st('"Enter your guess (1-10): "')}))<br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} guess == secret_number:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🏆 Correct! You win!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;win = {kw('True')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('break')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} guess &lt; secret_number:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Too low!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Too high!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;attempts += {nm('1')}<br/><br/>
              {kw('if')} {kw('not')} win:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Game Over! The number was"')}, secret_number)
            </CodeBlock>

            <Playground
              id="guessing_game"
              title="Playground — Run the Guessing Game"
              inputs={[
                { label:'First Guess =', default:'4', width:'50px' },
                { label:'Second Guess =', default:'8', width:'50px' },
                { label:'Third Guess =', default:'7', width:'50px' },
              ]}
              defaultCode={`secret_number = 7
attempts = 1
guess_limit = 3
win = False

while attempts <= guess_limit:
    print(f"Attempt {attempts} of {guess_limit}")
    # The simulator retrieves inputs in order from the boxes above
    guess = int(input("Enter guess: "))
    
    if guess == secret_number:
        print("🏆 Correct! You won!")
        win = True
        break
    elif guess < secret_number:
        print("Too low!")
    else:
        print("Too high!")
        
    attempts += 1

if not win:
    print("Game Over! The number was:", secret_number)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('assignment_work')}>Next: Assignment 📝 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 8: ASSIGNMENT ─── */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 4 • Assignment" title="📝 Day 4 Assignment">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2.5rem' }}>
              <h3 style={{ margin:'0 0 0.6rem', fontSize:'1.4rem', fontWeight:800 }}>Rules</h3>
              <p style={{ color:'#bfdbfe', margin:0, lineHeight:1.7 }}>Save as <code style={{ color:'#fde68a' }}>day4_assignment.py</code>. Use loops, ranges, inputs, and conditional statements. <strong>Do not use functions (def keyword).</strong></p>
            </div>

            {[
              { n:1,  t:'Print Numbers 1 to 10',     diff:'Easy',   col:'#10b981', desc:'Write a for loop to print numbers from 1 to 10. Repeat the same using a while loop.' },
              { n:2,  t:'Print Even Numbers',        diff:'Easy',   col:'#10b981', desc:'Print all even numbers between 1 and 20 using a for loop with a step parameter.' },
              { n:3,  t:'Multiplication Table',      diff:'Easy',   col:'#10b981', desc:'Take an integer N from the user. Print the multiplication table for N up to 10.' },
              { n:4,  t:'Calculate Factorial',       diff:'Medium', col:'#f59e0b', desc:'Take a number N as input. Using a loop, calculate N factorial (e.g. 5! = 5*4*3*2*1) and print it.' },
              { n:5,  t:'Sum of Natural Numbers',    diff:'Medium', col:'#f59e0b', desc:'Take N as input. Compute the sum of natural numbers from 1 to N using a while loop.' },
              { n:6,  t:'Reverse a String',          diff:'Medium', col:'#f59e0b', desc:'Take a string as input. Loop through the string in reverse to create a new reversed string and print it.' },
              { n:7,  t:'Search in List (break)',    diff:'Medium', col:'#f59e0b', desc:'Create a list of 5 numbers. Take a search target from the user. Loop through the list. If found, print "Found!" and break. If the loop completes without finding, print "Not Found".' },
              { n:8,  t:'Skip Odd Numbers (continue)',diff:'Medium', col:'#f59e0b', desc:'Iterate from 1 to 15. If the number is odd, use continue to skip it. Otherwise, print the number.' },
              { n:9,  t:'Star Right-Triangle Pattern',diff:'Hard',   col:'#ef4444', desc:'Use nested loops to print a right-triangle of height N input by the user.' },
              { n:10, t:'Fibonacci Series',          diff:'Hard',   col:'#ef4444', desc:'Print the first N Fibonacci numbers (0, 1, 1, 2, 3, 5, 8...). Start with two variables term1 = 0, term2 = 1.' },
            ].map(task => (
              <div key={task.n} style={{ border:'1px solid #e2e8f0', borderRadius:'12px', padding:'1.3rem', marginBottom:'1rem', background:'#fff' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem', flexWrap:'wrap', gap:'0.5rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ background:'#0f172a', color:'white', width:'30px', height:'30px', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.85rem', flexShrink:0 }}>{task.n}</span>
                    <h4 style={{ margin:0, color:'#0f172a' }}>{task.t}</h4>
                  </div>
                  <span style={{ background:`${task.col}20`, color:task.col, padding:'0.2rem 0.7rem', borderRadius:'20px', fontSize:'0.75rem', fontWeight:700 }}>{task.diff}</span>
                </div>
                <p style={{ margin:0, color:'#475569', lineHeight:1.6, fontSize:'0.93rem', paddingLeft:'40px' }}>{task.desc}</p>
              </div>
            ))}

            <div className="card-actions" style={{ marginTop:'1.5rem' }}>
              <button className="btn btn-primary" onClick={() => nav('quiz')}>Take Quiz 🧠 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 9: QUIZ ─── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Day 4 • Assessment" title="🧠 Quiz — Loops">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#4c1d95,#5b21b6)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2rem' }}>
              <h3 style={{ margin:'0 0 0.5rem', fontSize:'1.4rem', fontWeight:800 }}>Test Your Loop Knowledge!</h3>
              <p style={{ color:'#ddd6fe', margin:0 }}>{quizData.length} questions · Select answers · Click Submit to score.</p>
            </div>

            {quizData.map((q, qi) => {
              const selected = quizAnswers[qi];
              const isCorrect = selected === q.ans;
              return (
                <div key={qi} style={{ border:`2px solid ${quizSubmitted?(isCorrect?'#10b981':'#ef4444'):selected!==undefined?'#3b82f6':'#e2e8f0'}`, borderRadius:'14px', padding:'1.3rem', marginBottom:'1.1rem', background:'white', transition:'border-color 0.3s' }}>
                  <div style={{ display:'flex', gap:'12px', marginBottom:'1rem' }}>
                    <span style={{ background:'#0f172a', color:'white', minWidth:'28px', height:'28px', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.82rem', flexShrink:0 }}>{qi+1}</span>
                    <p style={{ margin:0, color:'#0f172a', fontWeight:600, lineHeight:1.5 }}>{q.q}</p>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:'0.55rem', paddingLeft:'40px' }}>
                    {q.opts.map((opt, oi) => {
                      let bg='#f8fafc', border='#e2e8f0', textCol='#475569';
                      if (selected===oi && !quizSubmitted) { bg='#eff6ff'; border='#3b82f6'; textCol='#1d4ed8'; }
                      if (quizSubmitted) {
                        if (oi===q.ans)         { bg='#d1fae5'; border='#10b981'; textCol='#065f46'; }
                        else if (selected===oi) { bg='#fee2e2'; border='#ef4444'; textCol='#991b1b'; }
                      }
                      return (
                        <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p=>({...p,[qi]:oi}))}
                          style={{ background:bg, border:`2px solid ${border}`, color:textCol, padding:'0.65rem 1rem', borderRadius:'8px', textAlign:'left', cursor:quizSubmitted?'default':'pointer', fontWeight:selected===oi||quizSubmitted&&oi===q.ans?600:400, fontSize:'0.88rem', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'6px' }}>
                          {quizSubmitted && oi===q.ans && <CheckCircle size={15} color="#10b981"/>}
                          {quizSubmitted && selected===oi && oi!==q.ans && <XCircle size={15} color="#ef4444"/>}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div style={{ marginTop:'0.7rem', paddingLeft:'40px', background:isCorrect?'#f0fdf4':'#fef2f2', padding:'0.7rem 1rem 0.7rem 50px', borderRadius:'8px' }}>
                      <span style={{ color:isCorrect?'#065f46':'#991b1b', fontSize:'0.87rem' }}>
                        {isCorrect?'✅ Correct! ':'❌ Wrong. '}{q.exp}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
                <button onClick={() => { if (Object.keys(quizAnswers).length < quizData.length) { alert(`Please answer all ${quizData.length} questions!`); return; } setQuizSubmitted(true); window.scrollTo({top:0,behavior:'smooth'}); }}
                  style={{ background:'#4c1d95', color:'white', border:'none', padding:'1rem 2.5rem', borderRadius:'12px', fontSize:'1.05rem', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 14px rgba(76,29,149,0.3)' }}>
                  Submit Quiz 🚀
                </button>
                <p style={{ color:'#94a3b8', marginTop:'0.7rem', fontSize:'0.88rem' }}>Answered {Object.keys(quizAnswers).length}/{quizData.length}</p>
              </div>
            ) : (
              <div style={{ background:quizScore>=11?'linear-gradient(135deg,#065f46,#10b981)':quizScore>=8?'linear-gradient(135deg,#1d4ed8,#3b82f6)':'linear-gradient(135deg,#92400e,#f59e0b)', padding:'2rem', borderRadius:'16px', textAlign:'center', marginTop:'1rem' }}>
                <Trophy size={48} color="white" style={{ marginBottom:'0.8rem' }}/>
                <h3 style={{ color:'white', fontSize:'2rem', margin:'0 0 0.5rem', fontWeight:900 }}>{quizScore}/{quizData.length}</h3>
                <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'1.1rem', margin:'0 0 1.2rem' }}>
                  {quizScore===quizData.length?'🏆 Perfect! Loops Mastered!':quizScore>=10?'🥇 Excellent Work!':quizScore>=7?'🥈 Good Job! Review correct answers below.':'📚 Keep revising loop control and ranges!'}
                </p>
                <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                  <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); window.scrollTo({top:0,behavior:'smooth'}); }}
                    style={{ background:'white', color:'#1d4ed8', border:'none', padding:'0.7rem 1.8rem', borderRadius:'10px', fontWeight:700, cursor:'pointer' }}>
                    Retake 🔄
                  </button>
                  <button onClick={() => nav('intro')}
                    style={{ background:'rgba(255,255,255,0.2)', color:'white', border:'2px solid rgba(255,255,255,0.5)', padding:'0.7rem 1.8rem', borderRadius:'10px', fontWeight:700, cursor:'pointer' }}>
                    Review Lessons 📖
                  </button>
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
