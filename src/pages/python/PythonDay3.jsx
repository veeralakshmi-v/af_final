import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, Play, Trophy, Code, Zap, RefreshCw } from 'lucide-react';

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
const er = t => <span style={{ color:'#f87171' }}>{t}</span>;

/* ─────────────────────────────────────────────
   LIVE PLAYGROUND — embedded per lesson
   Each lesson passes its own default code string
   and a simple evaluator that parses the code
───────────────────────────────────────────── */
function Playground({ id, defaultCode, inputs = [], title = 'Live Python Playground' }) {
  const [code, setCode]       = useState(defaultCode);
  const [userInputs, setUserInputs] = useState(inputs.map(i => i.default));
  const [output, setOutput]   = useState(null);
  const [ran, setRan]         = useState(false);

  const run = () => {
    try {
      // We simulate a restricted Python evaluator in JS
      let result = simulatePython(code, userInputs);
      setOutput(result);
    } catch (e) {
      setOutput({ lines: [`RuntimeError: ${e.message}`], isError: true });
    }
    setRan(true);
  };

  const reset = () => { setCode(defaultCode); setUserInputs(inputs.map(i=>i.default)); setOutput(null); setRan(false); };

  return (
    <div style={{ background:'#0f172a', borderRadius:'16px', overflow:'hidden', marginBottom:'2rem', border:'1px solid #334155' }}>
      {/* Header */}
      <div style={{ background:'#1e293b', padding:'0.8rem 1.4rem', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #334155' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ fontSize:'1rem' }}>🐍</span>
          <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:'0.95rem' }}>{title}</span>
          <span style={{ background:'#10b981', color:'white', fontSize:'0.7rem', padding:'0.1rem 0.5rem', borderRadius:'20px', fontWeight:700 }}>LIVE</span>
        </div>
        <button onClick={reset} title="Reset code" style={{ background:'transparent', border:'none', color:'#64748b', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontSize:'0.8rem' }}>
          <RefreshCw size={14}/> Reset
        </button>
      </div>

      {/* Input variables (if any) */}
      {inputs.length > 0 && (
        <div style={{ background:'#162032', padding:'0.8rem 1.4rem', borderBottom:'1px solid #1e293b', display:'flex', flexWrap:'wrap', gap:'1rem', alignItems:'center' }}>
          <span style={{ color:'#64748b', fontSize:'0.8rem', fontWeight:600 }}>USER INPUT:</span>
          {inputs.map((inp, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <label style={{ color:'#94a3b8', fontSize:'0.8rem' }}>{inp.label}</label>
              <input
                value={userInputs[i]}
                onChange={e => { const v=[...userInputs]; v[i]=e.target.value; setUserInputs(v); }}
                style={{ background:'#1e293b', border:'1px solid #475569', color:'#e2e8f0', padding:'0.3rem 0.6rem', borderRadius:'6px', width: inp.width||'80px', fontSize:'0.88rem', fontFamily:'monospace' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Editable Code Area */}
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        style={{ width:'100%', minHeight:'160px', background:'#0d1b2a', color:'#e2e8f0', fontFamily:'monospace', fontSize:'0.9rem', lineHeight:1.8, padding:'1.2rem', border:'none', outline:'none', resize:'vertical', borderBottom:'1px solid #1e293b', boxSizing:'border-box' }}
      />

      {/* Run button */}
      <div style={{ padding:'0.8rem 1.4rem', display:'flex', alignItems:'center', gap:'1rem', background:'#111827' }}>
        <button onClick={run}
          style={{ background:'linear-gradient(135deg,#10b981,#059669)', color:'white', border:'none', padding:'0.55rem 1.6rem', borderRadius:'8px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'0.92rem', boxShadow:'0 4px 12px rgba(16,185,129,0.3)' }}>
          <Play size={15} fill="white"/> Run Code
        </button>
        {ran && <span style={{ color:'#64748b', fontSize:'0.8rem' }}>Execution complete</span>}
      </div>

      {/* Output */}
      {output && (
        <div style={{ borderTop:'1px solid #1e293b', padding:'1rem 1.4rem', background:'#0a1628' }}>
          <div style={{ color:'#64748b', fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', marginBottom:'0.5rem', letterSpacing:'0.06em' }}>Output</div>
          {output.lines.map((line, i) => (
            <div key={i} style={{ fontFamily:'monospace', fontSize:'0.9rem', color: output.isError ? '#f87171' : line.startsWith('>>>') ? '#64748b' : '#34d399', lineHeight:1.8 }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PYTHON SIMULATOR
   Handles: variable assignment, print(), input(),
   if/elif/else, int()/float()/str() casting,
   arithmetic & relational operators
───────────────────────────────────────────── */
function simulatePython(code, userInputs = []) {
  const lines = code.split('\n');
  const env = {};
  const output = [];
  let inputIdx = 0;
  let i = 0;

  const getInput = () => {
    const val = userInputs[inputIdx] !== undefined ? String(userInputs[inputIdx]) : '';
    inputIdx++;
    return val;
  };

  const evalExpr = (expr) => {
    expr = expr.trim();
    // string literals
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) return expr.slice(1,-1);
    // bool literals
    if (expr === 'True') return true;
    if (expr === 'False') return false;
    if (expr === 'None') return null;
    // int() float() str() bool()
    if (/^int\((.+)\)$/.test(expr)) return parseInt(evalExpr(expr.match(/^int\((.+)\)$/)[1]), 10);
    if (/^float\((.+)\)$/.test(expr)) return parseFloat(evalExpr(expr.match(/^float\((.+)\)$/)[1]));
    if (/^str\((.+)\)$/.test(expr)) return String(evalExpr(expr.match(/^str\((.+)\)$/)[1]));
    if (/^bool\((.+)\)$/.test(expr)) return Boolean(evalExpr(expr.match(/^bool\((.+)\)$/)[1]));
    // input()
    if (/^input\(.*\)$/.test(expr)) return getInput();
    // len()
    if (/^len\((.+)\)$/.test(expr)) { const v = evalExpr(expr.match(/^len\((.+)\)$/)[1]); return v ? v.length : 0; }
    // f-string: f"...{var}..."
    if (/^f["']/.test(expr)) {
      const inner = expr.slice(2, -1);
      return inner.replace(/\{([^}]+)\}/g, (_, k) => { const v = evalExpr(k.trim()); return v !== undefined ? v : ''; });
    }
    // variable lookup
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) return env[expr] !== undefined ? env[expr] : (() => { throw new Error(`NameError: name '${expr}' is not defined`); })();
    // attribute: var.lower() var.upper() var.strip()
    if (/^[a-zA-Z_]\w*\.\w+\(\)$/.test(expr)) {
      const [obj, method] = expr.split('.');
      const val = env[obj];
      if (method === 'lower()') return String(val).toLowerCase();
      if (method === 'upper()') return String(val).toUpperCase();
      if (method === 'strip()') return String(val).trim();
    }
    // arithmetic / comparison — use JS eval with env substitution
    let safe = expr;
    Object.keys(env).sort((a,b)=>b.length-a.length).forEach(k => {
      const v = env[k];
      const rep = typeof v === 'string' ? `"${v}"` : v === true ? 'true' : v === false ? 'false' : v === null ? 'null' : String(v);
      safe = safe.replace(new RegExp(`\\b${k}\\b`, 'g'), rep);
    });
    // Python → JS operator translation
    safe = safe.replace(/\*\*/g, '**').replace(/ and /g, ' && ').replace(/ or /g, ' || ').replace(/ not /g, ' !').replace(/^not /, '!').replace(/==/g,'===').replace(/!=/g,'!==');
    try { return Function(`"use strict"; return (${safe})`)(); } catch(e) { throw new Error(`SyntaxError in: ${expr}`); }
  };

  const evalCondition = (cond) => Boolean(evalExpr(cond));

  const printLine = (args) => {
    const parts = args.map(a => {
      const v = evalExpr(a.trim());
      return v === true ? 'True' : v === false ? 'False' : v === null ? 'None' : String(v);
    });
    output.push(parts.join(' '));
  };

  const parsePrint = (line) => {
    const m = line.match(/^print\((.+)\)$/);
    if (!m) return;
    const inner = m[1];
    // Split by top-level commas
    const args = [];
    let depth = 0, cur = '', inStr = false, strChar = '';
    for (let c of inner) {
      if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; cur += c; }
      else if (inStr && c === strChar) { inStr = false; cur += c; }
      else if (!inStr && c === '(') { depth++; cur += c; }
      else if (!inStr && c === ')') { depth--; cur += c; }
      else if (!inStr && c === ',' && depth === 0) { args.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    if (cur.trim()) args.push(cur.trim());
    printLine(args);
  };

  // Block executor
  const execBlock = (blockLines) => {
    let bi = 0;
    while (bi < blockLines.length) {
      const ln = blockLines[bi].trim();
      if (!ln || ln.startsWith('#')) { bi++; continue; }

      // Variable assignment (simple: x = expr, and shorthand: x += expr etc.)
      const assignMatch = ln.match(/^([a-zA-Z_]\w*)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
      if (assignMatch && !ln.startsWith('if') && !ln.startsWith('elif') && !ln.startsWith('else') && !ln.startsWith('print')) {
        const [, varName, op, valExpr] = assignMatch;
        let val = evalExpr(valExpr);
        if (op) {
          const cur = env[varName] || 0;
          if (op === '+') val = cur + val;
          else if (op === '-') val = cur - val;
          else if (op === '*') val = cur * val;
          else if (op === '/') val = cur / val;
          else if (op === '//') val = Math.floor(cur / val);
          else if (op === '%') val = cur % val;
          else if (op === '**') val = Math.pow(cur, val);
        }
        env[varName] = val;
        bi++; continue;
      }

      // print()
      if (ln.startsWith('print(')) { parsePrint(ln); bi++; continue; }

      // if / elif / else block
      if (ln.startsWith('if ') || ln.startsWith('elif ') || ln.startsWith('else')) {
        // Collect the entire if/elif/else chain
        const chain = [];
        while (bi < blockLines.length) {
          const cl = blockLines[bi];
          const ct = cl.trim();
          if (ct.startsWith('if ') || ct.startsWith('elif ') || ct === 'else:' || ct.startsWith('else:')) {
            const indent = cl.search(/\S/);
            const condMatch = ct.match(/^(?:if|elif) (.+):$/) || (ct === 'else:' && ['else', '']);
            const cond = condMatch ? (ct.startsWith('else') ? null : ct.match(/^(?:if|elif) (.+):$/)[1]) : null;
            const bodyLines = [];
            bi++;
            while (bi < blockLines.length) {
              const bl = blockLines[bi];
              const bt = bl.trim();
              if (!bt) { bi++; continue; }
              const bIndent = bl.search(/\S/);
              if (bIndent <= indent && (bt.startsWith('elif ') || bt === 'else:' || bt.startsWith('else:'))) break;
              if (bIndent <= indent && !bt.startsWith('elif') && !bt.startsWith('else')) break;
              bodyLines.push(bl.slice(indent + 4));
              bi++;
            }
            chain.push({ cond, body: bodyLines });
          } else break;
        }
        // Execute first matching branch
        let executed = false;
        for (const branch of chain) {
          if (branch.cond === null || (!executed && evalCondition(branch.cond))) {
            execBlock(branch.body);
            executed = true;
            break;
          }
        }
        continue;
      }

      bi++;
    }
  };

  execBlock(lines);
  return { lines: output.length ? output : ['(no output)'], isError: false };
}

/* ─────────────────────────────────────────────
   QUIZ DATA
───────────────────────────────────────────── */
const quizData = [
  { q:"Which keyword starts a conditional block in Python?", opts:["when","check","if","condition"], ans:2, exp:"The 'if' keyword starts a conditional block. It checks a condition and executes code if True." },
  { q:"What does 'elif' stand for?", opts:["else if","else in loop","extra if","elif is a keyword only"], ans:0, exp:"'elif' is short for 'else if'. It adds an additional condition when the first 'if' was False." },
  { q:"What is the output of: x=10 → if x > 5: print('A') else: print('B')?", opts:["B","A","Error","Nothing"], ans:1, exp:"x=10 is greater than 5, so the if condition is True → prints 'A'." },
  { q:"How many 'else' clauses can one 'if' block have?", opts:["0","1","Many","Unlimited"], ans:1, exp:"An if/elif chain can only have ONE else clause at the end." },
  { q:"What happens if no 'if' or 'elif' condition is True and there is no 'else'?", opts:["Error","None is printed","Nothing happens","False is printed"], ans:2, exp:"If no condition matches and there's no else, Python simply skips the entire block silently." },
  { q:"What is a Nested if?", opts:["An if inside a loop","An if inside another if","Two separate if blocks","An elif chain"], ans:1, exp:"A nested if is an if statement placed inside the body of another if statement." },
  { q:"What is the correct indentation for Python if blocks?", opts:["2 spaces","4 spaces (standard)","Tab only","No indentation needed"], ans:1, exp:"Python uses 4 spaces as the standard indentation. Consistent indentation is mandatory — it defines the code block." },
  { q:"x=75 → What does this print? if x>=90: print('A+') elif x>=75: print('A') else: print('B')", opts:["A+","A","B","Error"], ans:1, exp:"x=75 fails the first check (75 >= 90 is False), but passes the second (75 >= 75 is True) → prints 'A'." },
  { q:"Can you have elif without an if before it?", opts:["Yes","No — SyntaxError","Yes, if else comes after","Only in Python 3"], ans:1, exp:"No. 'elif' must always follow an 'if' or another 'elif'. It cannot be used standalone." },
  { q:"x=15 → if x>10 and x<20: print('In range'). What prints?", opts:["Nothing","Error","In range","False"], ans:2, exp:"Both conditions are True (15>10 and 15<20) and the 'and' operator requires BOTH to be True → prints 'In range'." },
  { q:"Which operator is used to check equality in an if condition?", opts:["=","===","==","equals"], ans:2, exp:"'==' is the equality operator. A single '=' is assignment. '===' does not exist in Python." },
  { q:"What is an 'elif ladder'?", opts:["A loop inside if","Multiple elif blocks chained one after another","A nested if","A try/except block"], ans:1, exp:"An elif ladder is a series of elif statements chained together to check multiple conditions sequentially." },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PythonDay3({ activeTab, onNavigate }) {
  const [quizAnswers, setQuizAnswers]     = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const nav = (tab) => { onNavigate('python_day3', tab); window.scrollTo({ top:0, behavior:'smooth' }); };
  const quizScore = quizData.reduce((a, q, i) => a + (quizAnswers[i] === q.ans ? 1 : 0), 0);

  return (
    <AnimatePresence mode="wait">

      {/* ══════════════════════════════════════════
          TAB 1: INTRO
      ══════════════════════════════════════════ */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 3 • Overview" title="Conditional Statements">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.6rem', margin:'0 0 1rem', fontWeight:800 }}>What are Conditional Statements?</h3>
              <p style={{ color:'#bfdbfe', lineHeight:1.7, margin:0, fontSize:'1.05rem' }}>
                Conditional statements let your program <strong style={{ color:'#fff' }}>make decisions</strong>. Based on whether a condition is <code style={{ color:'#fde68a' }}>True</code> or <code style={{ color:'#fde68a' }}>False</code>, different blocks of code are executed — like a traffic signal controlling the flow.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'1.2rem', marginBottom:'2.5rem' }}>
              {[
                { n:'01', icon:'1️⃣', kw:'if',         desc:'Execute a block ONLY when condition is True',                col:'#3b82f6', bg:'#eff6ff' },
                { n:'02', icon:'2️⃣', kw:'elif',        desc:'Check another condition if the first if was False',         col:'#10b981', bg:'#f0fdf4' },
                { n:'03', icon:'🪜', kw:'elif ladder',  desc:'Chain many conditions one after another',                   col:'#f59e0b', bg:'#fffbeb' },
                { n:'04', icon:'🪆', kw:'nested if',    desc:'An if statement placed inside another if block',            col:'#8b5cf6', bg:'#f5f3ff' },
              ].map(i => (
                <div key={i.n} style={{ background:i.bg, borderRadius:'12px', padding:'1.4rem', border:`1px solid ${i.col}25` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.8rem' }}>
                    <span style={{ fontSize:'1.3rem' }}>{i.icon}</span>
                    <code style={{ background:i.col, color:'white', padding:'0.2rem 0.6rem', borderRadius:'6px', fontWeight:700 }}>{i.kw}</code>
                  </div>
                  <p style={{ margin:0, color:'#475569', fontSize:'0.88rem', lineHeight:1.5 }}>{i.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock title="overview.py — How Python executes conditional blocks">
              {c('# Python reads conditions TOP to BOTTOM')}<br/>
              {c('# It executes the FIRST block whose condition is True')}<br/>
              {c('# All others are SKIPPED')}<br/><br/>
              marks = {nm('72')}<br/><br/>
              {kw('if')} marks &gt;= {nm('90')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade A+"')})  {c('← skipped')}<br/>
              {kw('elif')} marks &gt;= {nm('75')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade A"')})   {c('← skipped')}<br/>
              {kw('elif')} marks &gt;= {nm('60')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade B"')})   {c('← ✅ THIS runs (72 >= 60)')}<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade F"')})   {c('← skipped')}
            </CodeBlock>

            <Playground
              id="intro"
              title="Try it — change marks and see which grade prints"
              inputs={[{ label:'marks =', default:'72', width:'60px' }]}
              defaultCode={`marks = 72   # Change this value using the input box above

if marks >= 90:
    print("Grade: A+")
elif marks >= 75:
    print("Grade: A")
elif marks >= 60:
    print("Grade: B")
elif marks >= 45:
    print("Grade: C")
else:
    print("Grade: F — Fail")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('if_statement')}>Start: if Statement <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════
          TAB 2: if STATEMENT
      ══════════════════════════════════════════ */}
      {activeTab === 'if_statement' && (
        <Section key="if_statement" eyebrow="Day 3 • Conditionals" title="The if Statement">
          <div className="panel">
            <div style={{ background:'#eff6ff', borderLeft:'4px solid #3b82f6', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#1e3a8a', lineHeight:1.7 }}>
                The <code>if</code> statement checks a single condition. If the condition is <code>True</code>, the indented block runs. If <code>False</code>, it is completely skipped.
              </p>
            </div>

            {/* Syntax diagram */}
            <div style={{ background:'#0f172a', borderRadius:'12px', padding:'1.5rem', marginBottom:'2rem', border:'2px dashed #334155' }}>
              <div style={{ color:'#94a3b8', fontSize:'0.8rem', marginBottom:'0.8rem', textTransform:'uppercase', letterSpacing:'0.08em' }}>Syntax</div>
              <div style={{ fontFamily:'monospace', fontSize:'1rem', lineHeight:2 }}>
                <span style={{ color:'#f472b6' }}>if </span>
                <span style={{ color:'#fbbf24' }}>{'<condition>'}</span>
                <span style={{ color:'#94a3b8' }}>:</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#94a3b8' }}># indented block (4 spaces)</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#38bdf8' }}>print</span>
                <span style={{ color:'#94a3b8' }}>(</span>
                <span style={{ color:'#a5b4fc' }}>"runs only when condition is True"</span>
                <span style={{ color:'#94a3b8' }}>)</span>
              </div>
            </div>

            <CodeBlock title="if_statement.py — Three real-world examples">
              {c('# Example 1: Simple age check')}<br/>
              age = {nm('20')}<br/>
              {kw('if')} age &gt;= {nm('18')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"You are an adult."')}) {ok('# ✅ runs — 20 >= 18 is True')}<br/><br/>

              {c('# Example 2: Positive number check')}<br/>
              number = {nm('45')}<br/>
              {kw('if')} number &gt; {nm('0')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Positive number"')}) {ok('# ✅ runs')}<br/><br/>

              {c('# Example 3: Password check')}<br/>
              password = {st('"alpha123"')}<br/>
              entered  = {st('"alpha123"')}<br/>
              {kw('if')} password == entered:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"✅ Access Granted!"')}) {ok('# ✅ runs')}<br/><br/>

              {c('# When condition is False — nothing happens')}<br/>
              x = {nm('5')}<br/>
              {kw('if')} x &gt; {nm('100')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"This never prints"')}) {c('# ❌ skipped')}
            </CodeBlock>

            <Playground
              id="if"
              title="Playground — if Statement"
              inputs={[{ label:'age =', default:'20', width:'60px' }]}
              defaultCode={`age = 20   # Try: 15, 17, 18, 25

if age >= 18:
    print("✅ You are an adult!")
    print("You can vote.")

if age < 18:
    print("❌ You are a minor.")
    print("Come back in", 18 - age, "years.")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('if_else')}>Next: if / else <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════
          TAB 3: if / else
      ══════════════════════════════════════════ */}
      {activeTab === 'if_else' && (
        <Section key="if_else" eyebrow="Day 3 • Conditionals" title="if / else Statement">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              The <code>else</code> block is the <strong>default fallback</strong>. When the <code>if</code> condition is <code>False</code>, Python automatically runs the <code>else</code> block. Exactly one of the two blocks will always run.
            </p>

            {/* Visual flow */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.2rem', marginBottom:'2rem' }}>
              <div style={{ background:'#f0fdf4', borderRadius:'12px', padding:'1.4rem', border:'2px solid #10b981', textAlign:'center' }}>
                <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>✅</div>
                <code style={{ background:'#10b981', color:'white', padding:'0.3rem 0.8rem', borderRadius:'6px', fontWeight:700, display:'block', marginBottom:'0.6rem' }}>if block</code>
                <p style={{ margin:0, color:'#065f46', fontSize:'0.9rem' }}>Runs when condition is <strong>True</strong></p>
              </div>
              <div style={{ background:'#fef2f2', borderRadius:'12px', padding:'1.4rem', border:'2px solid #ef4444', textAlign:'center' }}>
                <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>❌</div>
                <code style={{ background:'#ef4444', color:'white', padding:'0.3rem 0.8rem', borderRadius:'6px', fontWeight:700, display:'block', marginBottom:'0.6rem' }}>else block</code>
                <p style={{ margin:0, color:'#991b1b', fontSize:'0.9rem' }}>Runs when condition is <strong>False</strong></p>
              </div>
            </div>

            <CodeBlock title="if_else.py — Three practical examples">
              {c('# Example 1: Even or Odd (no if-else needed with functions!)')}<br/>
              number = {nm('29')}<br/>
              is_even = (number % {nm('2')} == {nm('0')})<br/>
              {kw('if')} is_even:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(number, {st('"is Even"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(number, {st('"is Odd"')}) {ok(' # → 29 is Odd')}<br/><br/>

              {c('# Example 2: Positive or Negative')}<br/>
              num = {nm('-8')}<br/>
              {kw('if')} num &gt;= {nm('0')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Positive or Zero"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Negative number"')}) {ok('# → Negative number')}<br/><br/>

              {c('# Example 3: Login check')}<br/>
              correct_pin = {nm('1234')}<br/>
              entered_pin = {nm('1234')}<br/>
              {kw('if')} entered_pin == correct_pin:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"✅ Login Successful"')}) {ok('# → runs')}<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"❌ Wrong PIN"')})
            </CodeBlock>

            <Playground
              id="if_else"
              title="Playground — if / else"
              inputs={[{ label:'number =', default:'29', width:'70px' }]}
              defaultCode={`number = 29   # Try: 2, 10, 99, 0, -5

if number % 2 == 0:
    print(number, "is Even")
else:
    print(number, "is Odd")

if number > 0:
    print("Positive number")
else:
    print("Zero or Negative")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('elif_statement')}>Next: elif Statement <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════
          TAB 4: elif
      ══════════════════════════════════════════ */}
      {activeTab === 'elif_statement' && (
        <Section key="elif_statement" eyebrow="Day 3 • Conditionals" title="The elif Statement">
          <div className="panel">
            <div style={{ background:'#f0fdf4', borderLeft:'4px solid #10b981', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#065f46', lineHeight:1.7 }}>
                <code>elif</code> = <strong>"else if"</strong>. It checks a <em>second condition</em> only when the first <code>if</code> was False. You can have <strong>any number</strong> of <code>elif</code> blocks between one <code>if</code> and one optional <code>else</code>.
              </p>
            </div>

            {/* Syntax */}
            <div style={{ background:'#0f172a', borderRadius:'12px', padding:'1.5rem', marginBottom:'2rem', border:'2px dashed #334155' }}>
              <div style={{ color:'#94a3b8', fontSize:'0.8rem', marginBottom:'0.8rem', textTransform:'uppercase' }}>Syntax</div>
              <div style={{ fontFamily:'monospace', fontSize:'0.95rem', lineHeight:2 }}>
                <span style={{ color:'#f472b6' }}>if </span><span style={{ color:'#fbbf24' }}>condition1</span><span style={{ color:'#94a3b8' }}>:</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#94a3b8' }}>...</span><br/>
                <span style={{ color:'#f472b6' }}>elif </span><span style={{ color:'#fbbf24' }}>condition2</span><span style={{ color:'#94a3b8' }}>:</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#94a3b8' }}>...</span><br/>
                <span style={{ color:'#f472b6' }}>else</span><span style={{ color:'#94a3b8' }}>:</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#94a3b8' }}>...</span>
              </div>
            </div>

            <CodeBlock title="elif_example.py — Month season + BMI classifier">
              {c('# Example 1: BMI Category')}<br/>
              bmi = {nm('22.5')}<br/>
              {kw('if')} bmi &lt; {nm('18.5')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Underweight"')})<br/>
              {kw('elif')} bmi &lt; {nm('25')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Normal weight"')}) {ok('# → runs (18.5 <= 22.5 < 25)')}<br/>
              {kw('elif')} bmi &lt; {nm('30')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Overweight"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Obese"')})<br/><br/>

              {c('# Example 2: Traffic light')}<br/>
              signal = {st('"Green"')}<br/>
              {kw('if')} signal == {st('"Red"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"STOP 🔴"')})<br/>
              {kw('elif')} signal == {st('"Yellow"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"SLOW DOWN 🟡"')})<br/>
              {kw('elif')} signal == {st('"Green"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"GO 🟢"')}) {ok('# → GO 🟢')}
            </CodeBlock>

            <Playground
              id="elif"
              title="Playground — elif Statement"
              inputs={[{ label:'bmi =', default:'22.5', width:'70px' }]}
              defaultCode={`bmi = 22.5   # Try: 15, 20, 22.5, 27, 35

if bmi < 18.5:
    print("Category: Underweight")
elif bmi < 25:
    print("Category: Normal weight ✅")
elif bmi < 30:
    print("Category: Overweight")
else:
    print("Category: Obese")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('elif_ladder')}>Next: elif Ladder <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════
          TAB 5: elif LADDER
      ══════════════════════════════════════════ */}
      {activeTab === 'elif_ladder' && (
        <Section key="elif_ladder" eyebrow="Day 3 • Conditionals" title="elif Ladder">
          <div className="panel">
            <div style={{ background:'#fffbeb', borderLeft:'4px solid #f59e0b', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#78350f', lineHeight:1.7 }}>
                An <strong>elif ladder</strong> is a series of <code>elif</code> conditions chained one after another — like rungs on a ladder. Python tests each rung <em>top to bottom</em> and executes only the <em>first matching one</em>.
              </p>
            </div>

            {/* Visual ladder */}
            <div style={{ background:'#0f172a', borderRadius:'12px', padding:'1.5rem', marginBottom:'2rem' }}>
              {[
                { label:'if   marks >= 90', badge:'A+', col:'#f59e0b' },
                { label:'elif marks >= 80', badge:'A',  col:'#10b981' },
                { label:'elif marks >= 70', badge:'B+', col:'#3b82f6' },
                { label:'elif marks >= 60', badge:'B',  col:'#8b5cf6' },
                { label:'elif marks >= 45', badge:'C',  col:'#ec4899' },
                { label:'else            ', badge:'F',  col:'#ef4444' },
              ].map((r, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'0.5rem 0', borderBottom: i < 5 ? '1px solid #1e293b':'' }}>
                  <span style={{ color:'#64748b', fontSize:'0.78rem', minWidth:'20px' }}>{i+1}</span>
                  <code style={{ color:'#e2e8f0', fontSize:'0.88rem', flex:1 }}>{r.label}:</code>
                  <span style={{ background:r.col, color:'white', padding:'0.15rem 0.6rem', borderRadius:'6px', fontSize:'0.8rem', fontWeight:700 }}>→ "{r.badge}"</span>
                </div>
              ))}
            </div>

            <CodeBlock title="elif_ladder.py — Full grading system and shift classifier">
              {c('# Grading system using elif ladder')}<br/>
              marks = {nm('72')}<br/><br/>
              {kw('if')} marks &gt;= {nm('90')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade: A+"')})<br/>
              {kw('elif')} marks &gt;= {nm('80')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade: A"')})<br/>
              {kw('elif')} marks &gt;= {nm('70')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade: B+"')}) {ok('# → B+ (72 >= 70)')}<br/>
              {kw('elif')} marks &gt;= {nm('60')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade: B"')})<br/>
              {kw('elif')} marks &gt;= {nm('45')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade: C"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade: F — Fail"')})<br/><br/>

              {c('# Work shift classifier')}<br/>
              hour = {nm('14')}<br/>
              {kw('if')} hour &lt; {nm('6')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Night shift 🌙"')})<br/>
              {kw('elif')} hour &lt; {nm('12')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Morning shift ☀️"')})<br/>
              {kw('elif')} hour &lt; {nm('18')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Afternoon shift 🌤️"')}) {ok('# → 14 < 18')}<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Evening shift 🌆"')})
            </CodeBlock>

            <Playground
              id="elif_ladder"
              title="Playground — elif Ladder (Grade System)"
              inputs={[{ label:'marks =', default:'72', width:'60px' }]}
              defaultCode={`marks = 72   # Try: 92, 85, 72, 65, 50, 30

if marks >= 90:
    print("Grade: A+")
elif marks >= 80:
    print("Grade: A")
elif marks >= 70:
    print("Grade: B+")
elif marks >= 60:
    print("Grade: B")
elif marks >= 45:
    print("Grade: C")
else:
    print("Grade: F — Fail")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('nested_if')}>Next: Nested if <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════
          TAB 6: NESTED if
      ══════════════════════════════════════════ */}
      {activeTab === 'nested_if' && (
        <Section key="nested_if" eyebrow="Day 3 • Conditionals" title="Nested if Statements">
          <div className="panel">
            <div style={{ background:'#f5f3ff', borderLeft:'4px solid #8b5cf6', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#4c1d95', lineHeight:1.7 }}>
                A <strong>nested if</strong> is an <code>if</code> statement written inside the body of another <code>if</code> statement. It is used when you need to check a <em>sub-condition</em> after a primary condition passes.
              </p>
            </div>

            {/* Visual structure */}
            <div style={{ background:'#0f172a', borderRadius:'12px', padding:'1.5rem', marginBottom:'2rem', fontFamily:'monospace', fontSize:'0.9rem', lineHeight:2 }}>
              <span style={{ color:'#f472b6' }}>if </span><span style={{ color:'#fbbf24' }}>outer_condition</span><span style={{ color:'#94a3b8' }}>:</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#94a3b8' }}># Outer block</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#f472b6' }}>if </span><span style={{ color:'#a5b4fc' }}>inner_condition</span><span style={{ color:'#94a3b8' }}>:</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#94a3b8' }}># Inner block (8 spaces deep)</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#38bdf8' }}>print</span><span style={{ color:'#94a3b8' }}>(</span><span style={{ color:'#a5b4fc' }}>"Both conditions TRUE"</span><span style={{ color:'#94a3b8' }}>)</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#f472b6' }}>else</span><span style={{ color:'#94a3b8' }}>:</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'#38bdf8' }}>print</span><span style={{ color:'#94a3b8' }}>(</span><span style={{ color:'#a5b4fc' }}>"Outer TRUE, inner FALSE"</span><span style={{ color:'#94a3b8' }}>)</span>
            </div>

            <CodeBlock title="nested_if.py — Voter eligibility + ATM PIN system">
              {c('# Example 1: Voting eligibility + citizenship check')}<br/>
              age = {nm('20')}<br/>
              is_citizen = {kw('True')}<br/><br/>
              {kw('if')} age &gt;= {nm('18')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Age OK ✅"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} is_citizen:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"You can vote! 🗳️"')}) {ok('# → runs')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Not a citizen"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Too young to vote"')})<br/><br/>

              {c('# Example 2: ATM — balance then PIN check')}<br/>
              balance = {nm('5000')}<br/>
              correct_pin = {nm('1234')}<br/>
              entered_pin = {nm('1234')}<br/>
              withdraw     = {nm('2000')}<br/><br/>
              {kw('if')} entered_pin == correct_pin:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"PIN Correct ✅"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} withdraw &lt;= balance:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;balance -= withdraw<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Cash Dispensed! Balance:"')}, balance) {ok('# → 3000')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Insufficient balance"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Wrong PIN ❌"')})
            </CodeBlock>

            <Playground
              id="nested_if"
              title="Playground — Nested if (ATM Simulator)"
              inputs={[
                { label:'PIN =', default:'1234', width:'65px' },
                { label:'Withdraw =', default:'2000', width:'70px' },
              ]}
              defaultCode={`balance = 5000
correct_pin = 1234
entered_pin = 1234
withdraw = 2000

if entered_pin == correct_pin:
    print("PIN Correct ✅")
    if withdraw <= balance:
        balance = balance - withdraw
        print("Cash Dispensed!")
        print("Remaining Balance:", balance)
    else:
        print("❌ Insufficient Balance")
else:
    print("❌ Wrong PIN")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('practice')}>Next: 🎓 Student Grade Project <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════
          TAB 7: PRACTICE PROJECT
      ══════════════════════════════════════════ */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 3 • Capstone" title="🎓 Student Grade System">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0369a1)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.5rem', margin:'0 0 0.8rem', fontWeight:800 }}>Day 3 Capstone: Student Grade System</h3>
              <p style={{ color:'#bae6fd', margin:0, lineHeight:1.7 }}>
                Build a complete Student Grade System using <strong>if, elif, and nested if</strong>. Checks marks, assigns grade, shows remarks, and detects distinction with nested conditions.
              </p>
            </div>

            <CodeBlock title="student_grade_system.py — No functions, no loops — pure conditionals">
              {c('# Student Grade System using Conditional Statements')}<br/>
              {c('# Input from user')}<br/>
              name  = {st('"Priya"')}<br/>
              marks = {nm('88')}<br/><br/>

              {c('# Validate marks range first (nested if)')}<br/>
              {kw('if')} marks &gt;= {nm('0')} {kw('and')} marks &lt;= {nm('100')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Student:"')}, name)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Marks  :"')}, marks)<br/><br/>

              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Assign grade using elif ladder')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} marks &gt;= {nm('90')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = {st('"A+"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark = {st('"Outstanding 🏆"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} marks &gt;= {nm('80')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = {st('"A"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark = {st('"Excellent 🌟"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} marks &gt;= {nm('70')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = {st('"B+"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark = {st('"Very Good 👍"')} {ok('# → 88 maps to A')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} marks &gt;= {nm('60')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = {st('"B"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark = {st('"Good"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} marks &gt;= {nm('45')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = {st('"C"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark = {st('"Average"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = {st('"F"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark = {st('"Fail — Study Harder"')}<br/><br/>

              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Grade  :"')}, grade)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Remark :"')}, remark)<br/><br/>

              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Nested if — check for distinction')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} marks &gt;= {nm('75')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🎖️ Distinction Awarded!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} marks &gt;= {nm('90')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🏆 College Rank Eligible!"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Invalid marks! Enter 0–100."')})
            </CodeBlock>

            <Playground
              id="practice"
              title="Playground — Student Grade System"
              inputs={[{ label:'marks =', default:'88', width:'60px' }]}
              defaultCode={`name = "Priya"
marks = 88

if marks >= 0 and marks <= 100:
    print("Student:", name)
    print("Marks  :", marks)

    if marks >= 90:
        grade = "A+"
        remark = "Outstanding"
    elif marks >= 80:
        grade = "A"
        remark = "Excellent"
    elif marks >= 70:
        grade = "B+"
        remark = "Very Good"
    elif marks >= 60:
        grade = "B"
        remark = "Good"
    elif marks >= 45:
        grade = "C"
        remark = "Average"
    else:
        grade = "F"
        remark = "Fail"

    print("Grade  :", grade)
    print("Remark :", remark)

    if marks >= 75:
        print("Distinction Awarded!")
else:
    print("Invalid marks! Enter 0-100.")`}
            />

            <div style={{ background:'linear-gradient(135deg,#4c1d95,#5b21b6)', padding:'1.5rem', borderRadius:'12px', marginBottom:'2rem' }}>
              <h4 style={{ color:'#e9d5ff', margin:'0 0 0.6rem', display:'flex', alignItems:'center', gap:'8px', fontSize:'1.1rem' }}>
                <Zap size={20} color="#facc15"/> AI Tip — Conditional Statements
              </h4>
              <p style={{ color:'#ddd6fe', margin:0, lineHeight:1.7, fontSize:'0.95rem' }}>
                Ask GitHub Copilot: <em style={{ color:'#fde68a' }}>"Write a Python student grade system using if/elif/else that takes marks as input and prints grade, remark, and distinction status."</em> — Copilot completes the entire block after you type the first <code>if</code>!
              </p>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('assignment_work')}>Assignment 📝 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════
          TAB 8: ASSIGNMENT
      ══════════════════════════════════════════ */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 3 • Assignment" title="📝 Day 3 Assignment">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2.5rem' }}>
              <h3 style={{ margin:'0 0 0.6rem', fontSize:'1.4rem', fontWeight:800 }}>Rules</h3>
              <p style={{ color:'#bfdbfe', margin:0, lineHeight:1.7 }}>Save as <code style={{ color:'#fde68a' }}>day3_assignment.py</code>. Use <strong>only if / elif / else</strong> — no functions, no loops. Use <code>input()</code> and type casting where needed.</p>
            </div>

            {[
              { n:1,  t:'Positive / Negative / Zero',       diff:'Easy',   col:'#10b981', desc:'Take a number from user. Print "Positive", "Negative", or "Zero" using if/elif/else.' },
              { n:2,  t:'Even or Odd',                      diff:'Easy',   col:'#10b981', desc:'Take a number from user. Use modulus (%) in an if/else to print "Even" or "Odd".' },
              { n:3,  t:'Largest of Three Numbers',          diff:'Easy',   col:'#10b981', desc:'Take three numbers a, b, c. Use if/elif/else to find and print the largest.' },
              { n:4,  t:'Voting Eligibility',               diff:'Easy',   col:'#10b981', desc:'Take age from user. Print "Eligible to Vote" if age >= 18, else "Not Eligible".' },
              { n:5,  t:'Day Name from Number',             diff:'Medium', col:'#f59e0b', desc:'Take a number 1–7. Print the day name (1=Monday … 7=Sunday) using elif ladder. Print "Invalid" for other values.' },
              { n:6,  t:'Simple Calculator',                diff:'Medium', col:'#f59e0b', desc:'Take two numbers and one operator (+,-,*,/) from user. Use if/elif to calculate and print the result. Handle division by zero with else.' },
              { n:7,  t:'Electricity Bill',                 diff:'Medium', col:'#f59e0b', desc:'Units consumed: 0–100 → ₹1.50/unit, 101–200 → ₹2/unit, 201–300 → ₹3/unit, >300 → ₹5/unit. Take units as input and print total bill.' },
              { n:8,  t:'Login with Role Check (Nested if)',diff:'Medium', col:'#f59e0b', desc:'Store username and password. Take input from user. If credentials match (nested if), check role: "admin" → "Full Access", "user" → "Limited Access".' },
              { n:9,  t:'Leap Year Checker',                diff:'Hard',   col:'#ef4444', desc:'Take a year from user. A year is a leap year if: (divisible by 4 AND not by 100) OR divisible by 400. Use nested if and logical operators.' },
              { n:10, t:'Income Tax Calculator',            diff:'Hard',   col:'#ef4444', desc:'Income ≤2.5L → No tax, 2.5–5L → 5%, 5–10L → 20%, >10L → 30%. Take income as input. Print tax amount and slab using elif ladder and arithmetic operators.' },
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

      {/* ══════════════════════════════════════════
          TAB 9: QUIZ
      ══════════════════════════════════════════ */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Day 3 • Assessment" title="🧠 Quiz — Conditional Statements">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#4c1d95,#5b21b6)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2rem' }}>
              <h3 style={{ margin:'0 0 0.5rem', fontSize:'1.4rem', fontWeight:800 }}>Test Your Knowledge!</h3>
              <p style={{ color:'#ddd6fe', margin:0 }}>{quizData.length} questions · Select an answer · Click Submit to score.</p>
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
                  {quizScore===quizData.length?'🏆 Perfect! Conditional Statements Master!':quizScore>=10?'🥇 Excellent!':quizScore>=7?'🥈 Good! Review the answers.':'📚 Keep revising — you\'ve got this!'}
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
