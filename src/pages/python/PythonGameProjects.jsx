import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Zap, Terminal, Shield } from 'lucide-react';

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

const c  = t => <span style={{ color:'#64748b' }}>{t}</span>;
const kw = t => <span style={{ color:'#f472b6' }}>{t}</span>;
const fn = t => <span style={{ color:'#38bdf8' }}>{t}</span>;
const nm = t => <span style={{ color:'#fbbf24' }}>{t}</span>;
const st = t => <span style={{ color:'#a5b4fc' }}>{t}</span>;
const ok = t => <span style={{ color:'#10b981' }}>{t}</span>;

/* ─────────────────────────────────────────────
   AST-BASED PYTHON INTERPRETER (With random/time libraries)
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
        break;
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
  const instructionLimit = 8000;

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
    
    // random and time standard library simulation
    if (/^random\.choice\((.+)\)$/.test(expr)) {
      const lst = evalExpr(expr.match(/^random\.choice\((.+)\)$/)[1]);
      if (Array.isArray(lst)) {
        return lst[Math.floor(Math.random() * lst.length)];
      }
      return '';
    }
    if (/^random\.randint\((.+)\)$/.test(expr)) {
      const match = expr.match(/^random\.randint\((.+)\)$/)[1];
      const args = match.split(',').map(x => Number(evalExpr(x.trim())));
      return Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0];
    }
    if (expr === 'time.time()') {
      return Date.now() / 1000;
    }

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
        throw new Error("TimeLimitExceeded: Loop or execution limit reached.");
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

/* ─── PLAYGROUND WRAPPER ─── */
function Playground({ id, defaultCode, inputs = [], title = 'Playground Console' }) {
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
          <span>🎮</span>
          <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.93rem' }}>{title}</span>
          <span style={{ background:'#10b981', color:'white', fontSize:'0.68rem', padding:'0.1rem 0.5rem', borderRadius:'20px', fontWeight:700 }}>PLAYABLE</span>
        </div>
        <button onClick={reset} style={{ background:'transparent', border:'none', color:'#64748b', cursor:'pointer', fontSize:'0.78rem', display:'flex', alignItems:'center', gap:'4px' }}>
          <RefreshCw size={12}/> Reset Game
        </button>
      </div>
      {inputs.length > 0 && (
        <div style={{ background:'#162032', padding:'0.7rem 1.4rem', borderBottom:'1px solid #1e293b', display:'flex', flexWrap:'wrap', gap:'1rem', alignItems:'center' }}>
          <span style={{ color:'#64748b', fontSize:'0.78rem', fontWeight:600 }}>PLAYER INPUT:</span>
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
        style={{ width:'100%', minHeight:'180px', background:'#0d1b2a', color:'#e2e8f0', fontFamily:'monospace', fontSize:'0.89rem', lineHeight:1.8, padding:'1.1rem', border:'none', outline:'none', resize:'vertical', borderBottom:'1px solid #1e293b', boxSizing:'border-box' }}/>
      <div style={{ padding:'0.75rem 1.4rem', display:'flex', alignItems:'center', gap:'1rem', background:'#111827' }}>
        <button onClick={run}
          style={{ background:'linear-gradient(135deg,#10b981,#059669)', color:'white', border:'none', padding:'0.52rem 1.5rem', borderRadius:'8px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'0.9rem', boxShadow:'0 4px 12px rgba(16,185,129,0.3)' }}>
          <Play size={14} fill="white"/> Run Game
        </button>
        {ran && <span style={{ color:'#64748b', fontSize:'0.78rem' }}>Running...</span>}
      </div>
      {output && (
        <div style={{ borderTop:'1px solid #1e293b', padding:'0.9rem 1.4rem', background:'#0a1628' }}>
          <div style={{ color:'#64748b', fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', marginBottom:'0.4rem', letterSpacing:'0.06em' }}>Console Output</div>
          {output.lines.map((line,i) => (
            <div key={i} style={{ fontFamily:'monospace', fontSize:'0.9rem', color: output.isError?'#f87171':'#34d399', lineHeight:1.8 }}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PythonGameProjects({ activeTab, onNavigate }) {
  const nav = (tab) => { onNavigate('python_games', tab); window.scrollTo({ top:0, behavior:'smooth' }); };

  return (
    <AnimatePresence mode="wait">

      {/* ─── OVERVIEW ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Course Projects" title="Text-Based Game Suite">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.6rem', margin:'0 0 1rem', fontWeight:800 }}>Gaming Projects Overview</h3>
              <p style={{ color:'#bfdbfe', lineHeight:1.7, margin:0, fontSize:'1.05rem' }}>
                Apply your conditional statements (Day 3) and loops (Day 4) to build interactive games. Below are the 5 text-based projects extracted from your alpha fly Game Projects syllabus.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
              {[
                { n:'01', icon:'✊', title:'Rock Paper Scissors', desc:'Random computer selection vs user input with nested comparisons.', col:'#3b82f6', bg:'#eff6ff', tab:'rock_paper_scissor' },
                { n:'02', icon:'🎯', title:'Number Guessing', desc:'Looping logic with higher/lower checking and limited attempts.', col:'#10b981', bg:'#f0fdf4', tab:'number_guessing' },
                { n:'03', icon:'🧠', title:'Memory Game', desc:'Briefly display numbers, clear screen, and evaluate recall.', col:'#8b5cf6', bg:'#f5f3ff', tab:'memory_game' },
                { n:'04', icon:'⚡', title:'Reaction Time Test', desc:'Measure precision timing delays using time conversions.', col:'#f59e0b', bg:'#fffbeb', tab:'reaction_time' },
                { n:'05', icon:'👮', title:'Police & Thief', desc:'Interactive storyline with nested choices and alternative endings.', col:'#ec4899', bg:'#fdf2f8', tab:'police_thief' },
              ].map(i => (
                <div key={i.n} onClick={() => nav(i.tab)} style={{ background:i.bg, borderRadius:'12px', padding:'1.4rem', border:`1px solid ${i.col}25`, cursor:'pointer', transition:'transform 0.2s' }} className="hover-scale">
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.6rem' }}>
                    <span style={{ fontSize:'1.3rem' }}>{i.icon}</span>
                    <h4 style={{ margin:0, color:'#0f172a', fontSize:'0.95rem' }}>{i.title}</h4>
                  </div>
                  <p style={{ margin:0, color:'#475569', fontSize:'0.82rem', lineHeight:1.5 }}>{i.desc}</p>
                </div>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('rock_paper_scissor')}>Play Project 1: Rock Paper Scissors <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 1. ROCK PAPER SCISSORS ─── */}
      {activeTab === 'rock_paper_scissor' && (
        <Section key="rps" eyebrow="Project 1" title="✊ Rock Paper Scissors">
          <div className="panel">
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>Explanation & Rules</h3>
            <ul style={{ color:'#475569', lineHeight:1.7, marginBottom:'2rem', paddingLeft:'20px' }}>
              <li>The program displays a welcome message and asks the player to enter their choice (<code>'rock'</code>, <code>'paper'</code>, or <code>'scissors'</code>).</li>
              <li>Player choice is cast to lowercase via <code>.lower()</code> for validation.</li>
              <li>The computer choice is selected randomly using <code>random.choice(['rock', 'paper', 'scissors'])</code>.</li>
              <li>We compare using nested <code>if</code>, <code>elif</code>, and <code>else</code> blocks to print the winner.</li>
            </ul>

            <CodeBlock title="rock_paper_scissors.py">
              {kw('import')} random<br/><br/>
              {fn('print')}({st('"Welcome to Rock, Paper, Scissors!"')})<br/>
              player = {fn('input')}({st('"Choose rock, paper, or scissors: "')}).{fn('lower')}()<br/>
              computer = random.{fn('choice')}([{st('"rock"')}, {st('"paper"')}, {st('"scissors"')},])<br/><br/>
              {fn('print')}({st('"Computer chose:"')}, computer)<br/><br/>
              {kw('if')} player == computer:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"It\'s a tie!"')})<br/>
              {kw('elif')} player == {st('"rock"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} computer == {st('"scissors"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"You win! Rock breaks scissors."')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Computer wins! Paper covers rock."')})<br/>
              {kw('elif')} player == {st('"paper"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} computer == {st('"rock"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"You win! Paper covers rock."')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Computer wins! Scissors cut paper."')})<br/>
              {kw('elif')} player == {st('"scissors"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} computer == {st('"paper"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"You win! Scissors cut paper."')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Computer wins! Rock breaks scissors."')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Invalid choice! Choose rock, paper, or scissors."')})
            </CodeBlock>

            <Playground
              id="rps_game"
              title="Play Rock Paper Scissors Live"
              inputs={[{ label:'Your choice =', default:'rock', width:'90px' }]}
              defaultCode={`import random

print("Welcome to Rock, Paper, Scissors!")
# The simulator gets input from the box above
player = input("Your choice (rock/paper/scissors): ").lower()
computer = random.choice(["rock", "paper", "scissors"])

print("Computer chose:", computer)

if player == computer:
    print("It's a tie!")
elif player == "rock":
    if computer == "scissors":
        print("You win! Rock breaks scissors.")
    else:
        print("Computer wins! Paper covers rock.")
elif player == "paper":
    if computer == "rock":
        print("You win! Paper covers rock.")
    else:
        print("Computer wins! Scissors cut paper.")
elif player == "scissors":
    if computer == "paper":
        print("You win! Scissors cut paper.")
    else:
        print("Computer wins! Rock breaks scissors.")
else:
    print("Invalid choice!")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('number_guessing')}>Play Project 2: Number Guessing <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 2. NUMBER GUESSING ─── */}
      {activeTab === 'number_guessing' && (
        <Section key="num_guess" eyebrow="Project 2" title="🎯 Number Guessing Game">
          <div className="panel">
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>Explanation & Rules</h3>
            <ul style={{ color:'#475569', lineHeight:1.7, marginBottom:'2rem', paddingLeft:'20px' }}>
              <li>The computer generates a random number from 1 to 10 using <code>random.randint(1, 10)</code>.</li>
              <li>The player is given a limit of 3 attempts to guess the number.</li>
              <li>A <code>while</code> loop tracks attempts. Comparisons provide hints (Too high / Too low).</li>
              <li>Using <code>break</code> allows immediate termination of the loop if the guess is correct.</li>
            </ul>

            <CodeBlock title="number_guessing.py">
              {kw('import')} random<br/><br/>
              secret = random.{fn('randint')}({nm('1')}, {nm('10')})<br/>
              attempts = {nm('1')}<br/>
              win = {kw('False')}<br/><br/>
              {kw('while')} attempts &lt;= {nm('3')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('""Attempt {attempts} of 3""')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;guess = {fn('int')}({fn('input')}({st('"Enter a number (1-10): "')}))<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} guess == secret:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Correct! You win!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;win = {kw('True')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('break')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} guess &lt; secret:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Too low!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Too high!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;attempts += {nm('1')}<br/><br/>
              {kw('if')} {kw('not')} win:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Game Over! The number was:"')}, secret)
            </CodeBlock>

            <Playground
              id="guessing_game"
              title="Play Number Guessing Live"
              inputs={[
                { label:'Guess 1 =', default:'5', width:'50px' },
                { label:'Guess 2 =', default:'8', width:'50px' },
                { label:'Guess 3 =', default:'3', width:'50px' },
              ]}
              defaultCode={`import random

secret = random.randint(1, 10)
attempts = 1
win = False

while attempts <= 3:
    print(f"Attempt {attempts} of 3")
    guess = int(input("Enter guess: "))
    if guess == secret:
        print("🏆 Correct! You win!")
        win = True
        break
    elif guess < secret:
        print("Too low!")
    else:
        print("Too high!")
    attempts += 1

if not win:
    print("Game Over! The number was:", secret)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('memory_game')}>Play Project 3: Memory Game <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 3. MEMORY GAME ─── */}
      {activeTab === 'memory_game' && (
        <Section key="mem_game" eyebrow="Project 3" title="🧠 Memory Game">
          <div className="panel">
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>Explanation & Rules</h3>
            <ul style={{ color:'#475569', lineHeight:1.7, marginBottom:'2rem', paddingLeft:'20px' }}>
              <li>Generate two random digits (from 1 to 9). Display them on screen.</li>
              <li>Wait for user confirmation, then clear the screen by printing 40 empty lines.</li>
              <li>Prompt the user to recall and input the two digits one by one.</li>
              <li>Evaluate correctness using nested if/else statements and print matching reports.</li>
            </ul>

            <CodeBlock title="memory_game.py">
              {kw('import')} random<br/><br/>
              n1 = random.{fn('randint')}({nm('1')}, {nm('9')})<br/>
              n2 = random.{fn('randint')}({nm('1')}, {nm('9')})<br/><br/>
              {fn('print')}({st('"MEMORIZE THESE DIGITS NOW!"')})<br/>
              {fn('print')}(f{st('""Digit 1: {n1} | Digit 2: {n2}""')})<br/>
              {fn('input')}({st('"Press Enter when ready to test..."')})<br/><br/>
              {c('# Clear screen simulation')}<br/>
              {fn('print')}({st('""\\n""')} * {nm('40')})<br/><br/>
              {fn('print')}({st('"RECALL AND INPUT THE DIGITS:"')})<br/>
              g1 = {fn('int')}({fn('input')}({st('"What was Digit 1? "')}))<br/>
              g2 = {fn('int')}({fn('input')}({st('"What was Digit 2? "')}))<br/><br/>
              {kw('if')} g1 == n1 {kw('and')} g2 == n2:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🏆 Perfect Recall! You Win!"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"❌ Wrong Recall!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('""Correct sequence was: {n1}, {n2}""')})
            </CodeBlock>

            <Playground
              id="memory_playable"
              title="Play Memory Game Live"
              inputs={[
                { label:'Press Enter to Clear =', default:'', width:'40px' },
                { label:'Guess Digit 1 =', default:'5', width:'50px' },
                { label:'Guess Digit 2 =', default:'7', width:'50px' },
              ]}
              defaultCode={`import random

n1 = random.randint(1, 9)
n2 = random.randint(1, 9)

print("MEMORIZE THESE DIGITS NOW!")
print(f"Digit 1: {n1} | Digit 2: {n2}")
input("Press Enter when ready...")

# Clear screen
print("\\n" * 40)

print("RECALL TIME!")
g1 = int(input("What was Digit 1? "))
g2 = int(input("What was Digit 2? "))

if g1 == n1 and g2 == n2:
    print("🏆 Perfect Recall! You win!")
else:
    print("❌ Wrong Recall!")
    print(f"Correct sequence was: {n1}, {n2}")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('reaction_time')}>Play Project 4: Reaction Time Test <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 4. REACTION TIME TEST ─── */}
      {activeTab === 'reaction_time' && (
        <Section key="reaction" eyebrow="Project 4" title="⚡ Reaction Time Test">
          <div className="panel">
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>Explanation & Rules</h3>
            <ul style={{ color:'#475569', lineHeight:1.7, marginBottom:'2rem', paddingLeft:'20px' }}>
              <li>Generate a random time delay using <code>random.randint(1, 4)</code>.</li>
              <li>Wait, then print <code>"!!! GO !!!"</code> or <code>"!!! PRESS ENTER NOW !!!"</code>.</li>
              <li>Use <code>time.time()</code> to capture the exact timestamp before and after the <code>input()</code> event.</li>
              <li>Calculate reaction time = <code>end_time - start_time</code>. Print ratings based on speed milestones.</li>
            </ul>

            <CodeBlock title="reaction_test.py">
              {kw('import')} random<br/>
              {kw('import')} time<br/><br/>
              {fn('print')}({st('"Testing your reaction time..."')})<br/>
              {fn('print')}({st('"Wait for the GO prompt and hit Enter immediately."')})<br/><br/>
              delay = random.{fn('randint')}({nm('1')}, {nm('3')})<br/>
              {c('# Simulator simulates sleep by skipping delay')}<br/><br/>
              start = time.{fn('time')}()<br/>
              {fn('input')}({st('"!!! GO !!! PRESS ENTER NOW:"')})<br/>
              end = time.{fn('time')}()<br/><br/>
              diff = end - start<br/>
              {fn('print')}(f{st('""Reaction Time: {diff:.3f} seconds""')})<br/><br/>
              {kw('if')} diff &lt; {nm('0.2')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🏎️ Reflexes like a Formula 1 driver!"')})<br/>
              {kw('elif')} diff &lt; {nm('0.35')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🏃 Fast reaction times!"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🐢 Need to be faster. Try again!"')})
            </CodeBlock>

            <Playground
              id="reaction_game"
              title="Play Reaction Test Live (Reacts immediately)"
              inputs={[{ label:'Press Enter on GO =', default:'', width:'40px' }]}
              defaultCode={`import time
import random

print("Wait for the GO prompt...")
delay = random.randint(1, 3)
print("...Ready...")

start = time.time()
input("!!! GO !!! (Press Enter): ")
end = time.time()

reaction_time = end - start
print(f"Reaction speed: {reaction_time:.3f} seconds")

if reaction_time < 0.25:
    print("⚡ Superhuman reflexes!")
elif reaction_time < 0.45:
    print("👍 Average reaction speed.")
else:
    print("💤 Wake up! Too slow.")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('police_thief')}>Play Project 5: Police & Thief <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 5. POLICE & THIEF ─── */}
      {activeTab === 'police_thief' && (
        <Section key="police_thief_game" eyebrow="Project 5" title="👮 Police & Thief Game">
          <div className="panel">
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>Explanation & Rules</h3>
            <ul style={{ color:'#475569', lineHeight:1.7, marginBottom:'2rem', paddingLeft:'20px' }}>
              <li>The player chooses a path: <code>'police'</code> or <code>'thief'</code>.</li>
              <li>A series of nested conditions direct the story based on user choice.</li>
              <li>Police goal: Investigate and catch the thief. Thief goal: Steal and escape to shelter.</li>
              <li>Show custom endings based on combinations of decisions.</li>
            </ul>

            <Playground
              id="police_thief_playable"
              title="Play Police & Thief Live Story"
              inputs={[
                { label:'police/thief =', default:'police', width:'70px' },
                { label:'Yes/No 1 =', default:'yes', width:'50px' },
                { label:'Yes/No 2 =', default:'yes', width:'50px' },
              ]}
              defaultCode={`print("Welcome to the Police, Thief, Shelter game!")
print("You can choose to be either a police officer or a thief.")
print("Goal as Police: catch the thief.")
print("Goal as Thief: steal and escape to the shelter.")

player_choice = input("Choose role (police/thief): ").lower()

if player_choice == "police":
    print("You are on patrol. You receive a call about a robbery in progress.")
    action = input("Do you want to investigate? (yes/no): ").lower()
    if action == "yes":
        print("You arrive at the scene, follow clues, and catch the thief.")
        print("🏆 Congratulations! You caught the thief.")
    else:
        print("You ignore the call and continue patrolling.")
        print("The thief escapes and the crime remains unsolved.")

elif player_choice == "thief":
    print("You are planning a heist to steal valuable gems.")
    action = input("Do you want to proceed? (yes/no): ").lower()
    if action == "yes":
        print("You break into the vault successfully.")
        escape = input("Do you want to escape to the shelter? (yes/no): ").lower()
        if escape == "yes":
            print("🏆 You evade the cops and escape to the shelter!")
        else:
            print("Cops surround you. Game Over! You are arrested.")
    else:
        print("You cancel the heist. You live a peaceful life.")
else:
    print("Invalid choice!")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('intro')}>Return to Overview <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
