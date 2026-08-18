import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle, XCircle, AlertCircle, Play, Lightbulb, Code, Trophy, BookOpen } from 'lucide-react';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CodeBlock = ({ title, children }) => (
  <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1.8rem', border: '1px solid #334155' }}>
    {title && (
      <div style={{ background: '#1e293b', padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #334155' }}>
        <Code size={15} color="#38bdf8" />
        <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600 }}>{title}</span>
      </div>
    )}
    <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1.4rem', fontFamily: 'monospace', fontSize: '0.92rem', lineHeight: 1.9, overflowX: 'auto' }}>
      {children}
    </div>
  </div>
);

const c  = (t) => <span style={{ color: '#64748b' }}>{t}</span>;
const kw = (t) => <span style={{ color: '#f472b6' }}>{t}</span>;
const fn = (t) => <span style={{ color: '#38bdf8' }}>{t}</span>;
const num = (t) => <span style={{ color: '#fbbf24' }}>{t}</span>;
const str = (t) => <span style={{ color: '#a5b4fc' }}>{t}</span>;
const out = (t) => <span style={{ color: '#10b981' }}>{t}</span>;
const err = (t) => <span style={{ color: '#f87171' }}>{t}</span>;

/* ─── PYTHON SIMULATOR (same engine as Day 3) ─── */
function simulatePython(code, userInputs = []) {
  const lines = code.split('\n');
  const env = {};
  const output = [];
  let inputIdx = 0;
  const getInput = () => { const v = userInputs[inputIdx] !== undefined ? String(userInputs[inputIdx]) : ''; inputIdx++; return v; };
  const evalExpr = (expr) => {
    expr = expr.trim();
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) return expr.slice(1,-1);
    if (expr === 'True') return true; if (expr === 'False') return false; if (expr === 'None') return null;
    if (/^int\((.+)\)$/.test(expr)) return parseInt(evalExpr(expr.match(/^int\((.+)\)$/)[1]), 10);
    if (/^float\((.+)\)$/.test(expr)) return parseFloat(evalExpr(expr.match(/^float\((.+)\)$/)[1]));
    if (/^str\((.+)\)$/.test(expr)) return String(evalExpr(expr.match(/^str\((.+)\)$/)[1]));
    if (/^bool\((.+)\)$/.test(expr)) return Boolean(evalExpr(expr.match(/^bool\((.+)\)$/)[1]));
    if (/^input\(.*\)$/.test(expr)) return getInput();
    if (/^len\((.+)\)$/.test(expr)) { const v = evalExpr(expr.match(/^len\((.+)\)$/)[1]); return v ? v.length : 0; }
    if (/^f["']/.test(expr)) { const inner = expr.slice(2,-1); return inner.replace(/\{([^}]+)\}/g, (_,k)=>{ const v=evalExpr(k.trim()); return v!==undefined?v:''; }); }
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) return env[expr] !== undefined ? env[expr] : (() => { throw new Error(`NameError: '${expr}' is not defined`); })();
    if (/^[a-zA-Z_]\w*\.\w+\(\)$/.test(expr)) { const [obj,method]=expr.split('.'); const val=env[obj]; if(method==='lower()')return String(val).toLowerCase(); if(method==='upper()')return String(val).toUpperCase(); if(method==='strip()')return String(val).trim(); }
    let safe = expr;
    Object.keys(env).sort((a,b)=>b.length-a.length).forEach(k => { const v=env[k]; const rep=typeof v==='string'?`"${v}"`:v===true?'true':v===false?'false':v===null?'null':String(v); safe=safe.replace(new RegExp(`\\b${k}\\b`,'g'),rep); });
    safe = safe.replace(/ and /g,' && ').replace(/ or /g,' || ').replace(/^not /,'!').replace(/ not /g,' !').replace(/==/g,'===').replace(/!=/g,'!==');
    try { return Function(`"use strict"; return (${safe})`)(); } catch(e) { throw new Error(`SyntaxError in: ${expr}`); }
  };
  const evalCond = (cond) => Boolean(evalExpr(cond));
  const parsePrint = (line) => {
    const m = line.match(/^print\((.+)\)$/); if(!m) return;
    const inner=m[1]; const args=[]; let depth=0,cur='',inStr=false,strChar='';
    for(let ch of inner){if(!inStr&&(ch==='"'||ch==="'")){inStr=true;strChar=ch;cur+=ch;}else if(inStr&&ch===strChar){inStr=false;cur+=ch;}else if(!inStr&&ch==='('){depth++;cur+=ch;}else if(!inStr&&ch===')'){depth--;cur+=ch;}else if(!inStr&&ch===','&&depth===0){args.push(cur.trim());cur='';}else cur+=ch;} if(cur.trim())args.push(cur.trim());
    output.push(args.map(a=>{const v=evalExpr(a.trim());return v===true?'True':v===false?'False':v===null?'None':String(v);}).join(' '));
  };
  const execBlock = (blockLines) => {
    let bi=0;
    while(bi<blockLines.length){
      const ln=blockLines[bi].trim(); if(!ln||ln.startsWith('#')){bi++;continue;}
      const assignMatch=ln.match(/^([a-zA-Z_]\w*)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
      if(assignMatch&&!ln.startsWith('if')&&!ln.startsWith('elif')&&!ln.startsWith('else')&&!ln.startsWith('print')){
        const[,varName,op,valExpr]=assignMatch; let val=evalExpr(valExpr);
        if(op){const cur=env[varName]||0;if(op==='+')val=cur+val;else if(op==='-')val=cur-val;else if(op==='*')val=cur*val;else if(op==='/')val=cur/val;else if(op==='//')val=Math.floor(cur/val);else if(op==='%')val=cur%val;else if(op==='**')val=Math.pow(cur,val);}
        env[varName]=val; bi++; continue;
      }
      if(ln.startsWith('print(')){parsePrint(ln);bi++;continue;}
      if(ln.startsWith('if ')||ln.startsWith('elif ')||ln.startsWith('else')){
        const chain=[];
        while(bi<blockLines.length){
          const cl=blockLines[bi],ct=cl.trim();
          if(ct.startsWith('if ')||ct.startsWith('elif ')||ct==='else:'||ct.startsWith('else:')){
            const indent=cl.search(/\S/);
            const cond=ct==='else:'||ct.startsWith('else:')?null:(ct.match(/^(?:if|elif) (.+):$/)||[])[1];
            const bodyLines=[]; bi++;
            while(bi<blockLines.length){const bl=blockLines[bi],bt=bl.trim();if(!bt){bi++;continue;}const bIndent=bl.search(/\S/);if(bIndent<=indent&&(bt.startsWith('elif ')||bt==='else:'||bt.startsWith('else:')))break;if(bIndent<=indent&&!bt.startsWith('elif')&&!bt.startsWith('else'))break;bodyLines.push(bl.slice(indent+4));bi++;}
            chain.push({cond,body:bodyLines});
          } else break;
        }
        let executed=false;
        for(const branch of chain){if(branch.cond===null&&!executed){execBlock(branch.body);executed=true;break;}else if(branch.cond!==null&&!executed&&evalCond(branch.cond)){execBlock(branch.body);executed=true;break;}}
        continue;
      }
      bi++;
    }
  };
  try { execBlock(lines); } catch(e) { return { lines:[`Error: ${e.message}`], isError:true }; }
  return { lines: output.length ? output : ['(no output)'], isError: false };
}

/* ─── LIVE PLAYGROUND COMPONENT ─── */
function Playground({ id, defaultCode, inputs = [], title = 'Live Python Playground' }) {
  const { useState: useS } = React;
  const [code, setCode]     = useS(defaultCode);
  const [vals, setVals]     = useS(inputs.map(i=>i.default));
  const [output, setOutput] = useS(null);
  const [ran, setRan]       = useS(false);

  const run = () => {
    try { setOutput(simulatePython(code, vals)); } catch(e) { setOutput({ lines:[`RuntimeError: ${e.message}`], isError:true }); }
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
          ↺ Reset
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
          <span>▶</span> Run Code
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

const quizData = [
  { q: "What is the output of: print(17 % 5)?", opts: ["2", "3", "12", "3.4"], ans: 0, exp: "17 % 5 = 17 - (5×3) = 17 - 15 = 2. Modulus gives the remainder." },
  { q: "What does the // operator do?", opts: ["Returns a float quotient", "Rounds result up", "Returns floor (rounded down) quotient", "Returns remainder"], ans: 2, exp: "// is the floor division operator. 7//2 = 3 (discards the decimal)." },
  { q: "What is the result of: 2 ** 8?", opts: ["16", "256", "64", "128"], ans: 1, exp: "** is exponentiation. 2**8 = 2×2×2×2×2×2×2×2 = 256." },
  { q: "What does == check in Python?", opts: ["Assignment", "Value equality", "Identity (same object)", "Type equality"], ans: 1, exp: "== checks if two values are equal. = is assignment. 'is' checks identity." },
  { q: "What is the output of: print(True and False)?", opts: ["True", "False", "None", "Error"], ans: 1, exp: "and returns True ONLY if BOTH sides are True. True and False = False." },
  { q: "Which operator checks if a value EXISTS in a list?", opts: ["==", "in", "is", "has"], ans: 1, exp: "'in' is the membership operator. Example: 'apple' in ['apple','banana'] → True." },
  { q: "x = 10; x += 5. What is x now?", opts: ["5", "10", "15", "50"], ans: 2, exp: "+= adds the right value to the current value. x += 5 means x = x + 5 = 15." },
  { q: "What is the output of: print(not True)?", opts: ["True", "False", "0", "None"], ans: 1, exp: "not reverses a boolean. not True = False." },
  { q: "a = [1,2,3]; b = a. What does 'a is b' return?", opts: ["False", "True", "None", "Error"], ans: 1, exp: "b = a makes b point to the SAME object in memory, so 'a is b' is True." },
  { q: "What does 10 != 10 evaluate to?", opts: ["True", "False", "None", "Error"], ans: 1, exp: "!= means 'not equal'. 10 != 10 is False because they ARE equal." },
  { q: "What is the output of: print(7 / 2)?", opts: ["3", "3.5", "4", "3.0"], ans: 1, exp: "/ in Python 3 always returns a float. 7/2 = 3.5." },
  { q: "Which of these correctly uses the 'or' operator?", opts: ["True or False → False", "True or False → True", "False or False → True", "True or True → False"], ans: 1, exp: "or returns True if at least ONE condition is True. True or False = True." },
];

export default function PythonDay2({ activeTab, onNavigate }) {
  const [tempValue, setTempValue]     = useState('100');
  const [tempUnit, setTempUnit]       = useState('C');
  const [tempResult, setTempResult]   = useState(null);
  const [calcA, setCalcA]             = useState('15');
  const [calcB, setCalcB]             = useState('4');
  const [calcResult, setCalcResult]   = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleContinue = (next) => {
    onNavigate('python_day2', next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runCalculator = () => {
    const a = parseFloat(calcA) || 0;
    const b = parseFloat(calcB) || 0;
    if (b === 0) { setCalcResult({ error: 'ZeroDivisionError: division by zero!' }); return; }
    setCalcResult({ add: a+b, sub: a-b, mul: a*b, div: parseFloat((a/b).toFixed(4)), floordiv: Math.floor(a/b), mod: ((a % b + b) % b).toFixed(0), exp: Math.pow(a, b) });
  };

  const runTempConverter = () => {
    const val = parseFloat(tempValue);
    if (isNaN(val)) { setTempResult({ error: 'ValueError: enter a valid number!' }); return; }
    if (tempUnit === 'C') setTempResult({ toF: parseFloat((val*9/5+32).toFixed(2)), toK: parseFloat((val+273.15).toFixed(2)), unit: '°C' });
    else if (tempUnit === 'F') setTempResult({ toC: parseFloat(((val-32)*5/9).toFixed(2)), toK: parseFloat(((val-32)*5/9+273.15).toFixed(2)), unit: '°F' });
    else setTempResult({ toC: parseFloat((val-273.15).toFixed(2)), toF: parseFloat(((val-273.15)*9/5+32).toFixed(2)), unit: 'K' });
  };

  const quizScore = quizData.reduce((acc, q, i) => acc + (quizAnswers[i] === q.ans ? 1 : 0), 0);

  return (
    <AnimatePresence mode="wait">

      {/* ─── 1. INTRO ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 2 • Overview" title="Operators in Python">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', color: '#fff', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.6rem', margin: '0 0 1rem', fontWeight: 800 }}>What are Operators?</h3>
              <p style={{ color: '#bfdbfe', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: '#fff' }}>Operators</strong> are special symbols or keywords used to perform operations on variables and values. Python supports 6 major categories.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              {[
                { n:'01', icon:'➕', title:'Arithmetic',            desc:'+, -, *, /, //, %, **',       col:'#3b82f6', bg:'#eff6ff' },
                { n:'02', icon:'⚖️', title:'Relational',            desc:'==, !=, >, <, >=, <=',        col:'#10b981', bg:'#f0fdf4' },
                { n:'03', icon:'🔗', title:'Logical',               desc:'and, or, not',                col:'#8b5cf6', bg:'#f5f3ff' },
                { n:'04', icon:'📥', title:'Assignment',            desc:'=, +=, -=, *=, /=…',          col:'#f59e0b', bg:'#fffbeb' },
                { n:'05', icon:'🔍', title:'Membership',            desc:'in, not in',                  col:'#ec4899', bg:'#fdf2f8' },
                { n:'06', icon:'🆔', title:'Identity',              desc:'is, is not',                  col:'#14b8a6', bg:'#f0fdfa' },
              ].map(i => (
                <div key={i.n} style={{ background: i.bg, borderRadius:'12px', padding:'1.4rem', border:`1px solid ${i.col}30` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.6rem' }}>
                    <span style={{ fontSize:'1.3rem' }}>{i.icon}</span>
                    <span style={{ fontSize:'0.72rem', color: i.col, fontWeight:700, background:`${i.col}15`, padding:'0.2rem 0.5rem', borderRadius:'20px' }}>{i.n}</span>
                  </div>
                  <h4 style={{ margin:'0 0 0.3rem', color:'#0f172a', fontSize:'1rem' }}>{i.title}</h4>
                  <p style={{ margin:0, color:'#64748b', fontSize:'0.85rem' }}>{i.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick example */}
            <CodeBlock title="operators_intro.py — Quick overview of all 6 types">
              {c('# 1. Arithmetic')}<br/>
              print({num('10')} + {num('3')})  {out('  # 13')}<br/>
              print({num('10')} % {num('3')})  {out('  # 1  (remainder)')}<br/><br/>
              {c('# 2. Relational')}<br/>
              print({num('10')} &gt; {num('5')})  {out('  # True')}<br/><br/>
              {c('# 3. Logical')}<br/>
              print({num('10')} &gt; {num('5')} {kw(' and ')} {num('3')} &lt; {num('8')}) {out(' # True')}<br/><br/>
              {c('# 4. Assignment shorthand')}<br/>
              x = {num('5')}; x += {num('3')}; print(x) {out('  # 8')}<br/><br/>
              {c('# 5. Membership')}<br/>
              print({str('"a"')} {kw('in')} {str('"Python"')}) {out(' # True')}<br/><br/>
              {c('# 6. Identity')}<br/>
              a = {kw('None')}; print(a {kw('is')} {kw('None')}) {out(' # True')}
            </CodeBlock>

            <Playground
              id="intro"
              title="Try it — All 6 operator types at once"
              defaultCode={`# 1. Arithmetic
print(10 + 3)   # 13
print(10 % 3)   # 1 (remainder)

# 2. Relational
print(10 > 5)   # True

# 3. Logical
print(10 > 5 and 3 < 8)  # True

# 4. Assignment shorthand
x = 5
x += 3
print(x)        # 8

# 5. Membership
print("a" in "Python")   # True

# 6. Identity
a = None
print(a is None)         # True`}
            />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('arithmetic')}>Start: Arithmetic Operators <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 2. ARITHMETIC ─── */}
      {activeTab === 'arithmetic' && (
        <Section key="arithmetic" eyebrow="Day 2 • Operators" title="Arithmetic Operators">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              Python supports <strong>7 arithmetic operators</strong>. Two extras beyond basic math: <strong>floor division (//)</strong> and <strong>modulus (%)</strong>.
            </p>

            <div style={{ overflowX:'auto', marginBottom:'2rem' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'12px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
                <thead>
                  <tr style={{ background:'#1d4ed8', color:'white' }}>
                    {['Operator','Symbol','Description','Example (a=15, b=4)','Result'].map(h => <th key={h} style={{ padding:'0.9rem 1rem', fontSize:'0.88rem' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name:'Addition',       sym:'+',  desc:'Adds two values',                      ex:'a + b',   res:'19' },
                    { name:'Subtraction',    sym:'-',  desc:'Subtracts right from left',             ex:'a - b',   res:'11',   alt:true },
                    { name:'Multiplication', sym:'*',  desc:'Multiplies two values',                 ex:'a * b',   res:'60' },
                    { name:'Division',       sym:'/',  desc:'Always returns a float',                ex:'a / b',   res:'3.75', alt:true },
                    { name:'Floor Division', sym:'//', desc:'Rounds DOWN after division',            ex:'a // b',  res:'3' },
                    { name:'Modulus',        sym:'%',  desc:'Returns remainder after division',      ex:'a % b',   res:'3',    alt:true },
                    { name:'Exponentiation', sym:'**', desc:'Raises left to the power of right',    ex:'a ** b',  res:'50625' },
                  ].map(r => (
                    <tr key={r.sym} style={{ borderBottom:'1px solid #e2e8f0', background: r.alt ? '#f8fafc':'white' }}>
                      <td style={{ padding:'0.85rem 1rem', fontWeight:600, color:'#0f172a' }}>{r.name}</td>
                      <td style={{ padding:'0.85rem 1rem' }}><code style={{ background:'#eff6ff', color:'#1d4ed8', padding:'0.25rem 0.6rem', borderRadius:'6px', fontWeight:700 }}>{r.sym}</code></td>
                      <td style={{ padding:'0.85rem 1rem', color:'#475569', fontSize:'0.88rem' }}>{r.desc}</td>
                      <td style={{ padding:'0.85rem 1rem', fontFamily:'monospace', color:'#0f172a' }}>{r.ex}</td>
                      <td style={{ padding:'0.85rem 1rem' }}><span style={{ background:'#d1fae5', color:'#065f46', padding:'0.2rem 0.6rem', borderRadius:'6px', fontFamily:'monospace', fontWeight:700 }}>{r.res}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Example Code */}
            <CodeBlock title="arithmetic_example.py — All 7 operators with real-world usage">
              a = {num('15')}<br/>
              b = {num('4')}<br/><br/>
              {c('# Basic operations')}<br/>
              {fn('print')}({str('"Addition:"')},      a + b)   {out('# 19')}<br/>
              {fn('print')}({str('"Subtraction:"')},   a - b)   {out('# 11')}<br/>
              {fn('print')}({str('"Multiplication:"')},a * b)   {out('# 60')}<br/>
              {fn('print')}({str('"Division:"')},      a / b)   {out('# 3.75  (always float!)')}<br/><br/>
              {c('# Special operators')}<br/>
              {fn('print')}({str('"Floor Div:"')},  a // b)  {out('# 3     (removes decimal)')}<br/>
              {fn('print')}({str('"Modulus:"')},    a % b)   {out('# 3     (15 = 4×3 + 3)')}<br/>
              {fn('print')}({str('"Exponent:"')},   a ** b)  {out('# 50625 (15⁴)')}<br/><br/>
              {c('# Real-world: check if a number is even or odd')}<br/>
              number = {num('29')}<br/>
              is_even = (number % {num('2')} == {num('0')})<br/>
              {fn('print')}({str('"Is even:"')}, is_even)  {out('# Is even: False  → Odd')}<br/><br/>
              {c('# Operator precedence — BODMAS / PEMDAS rule')}<br/>
              {c('# ** first, then *, then +')}<br/>
              result = {num('2')} + {num('3')} * {num('4')} ** {num('2')}<br/>
              {fn('print')}({str('"Result:"')}, result)  {out('# 50  (not 100!)')}<br/><br/>
              {c('# Calculate BMI using arithmetic only')}<br/>
              weight_kg = {num('70')}<br/>
              height_m  = {num('1.75')}<br/>
              bmi = weight_kg / (height_m ** {num('2')})<br/>
              {fn('print')}({str('"BMI:"')}, bmi)  {out('# 22.857... (healthy range)')}
            </CodeBlock>

            {/* Live Calculator */}
            <div style={{ background:'#0f172a', borderRadius:'14px', overflow:'hidden', marginBottom:'1.5rem' }}>
              <div style={{ background:'#1e293b', padding:'0.9rem 1.4rem', borderBottom:'1px solid #334155', display:'flex', alignItems:'center', gap:'8px' }}>
                <Code size={17} color="#3b82f6"/><span style={{ color:'#e2e8f0', fontWeight:600 }}>🔢 Live Arithmetic Calculator</span>
              </div>
              <div style={{ padding:'1.4rem' }}>
                <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', alignItems:'flex-end', marginBottom:'1rem' }}>
                  {[['Value of a', calcA, setCalcA], ['Value of b', calcB, setCalcB]].map(([lbl, val, set]) => (
                    <div key={lbl}>
                      <label style={{ color:'#94a3b8', fontSize:'0.82rem', display:'block', marginBottom:'0.3rem' }}>{lbl}</label>
                      <input type="number" value={val} onChange={e => set(e.target.value)}
                        style={{ background:'#1e293b', border:'1px solid #475569', color:'white', padding:'0.5rem 0.8rem', borderRadius:'8px', width:'90px', fontSize:'1rem' }}/>
                    </div>
                  ))}
                  <button onClick={runCalculator} style={{ background:'#3b82f6', color:'white', border:'none', padding:'0.6rem 1.4rem', borderRadius:'8px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
                    <Play size={15} fill="white"/> Run
                  </button>
                </div>
                {calcResult && (
                  calcResult.error
                    ? <div style={{ color:'#f87171', fontFamily:'monospace', background:'#1e293b', padding:'1rem', borderRadius:'8px' }}>{calcResult.error}</div>
                    : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px,1fr))', gap:'0.7rem' }}>
                        {[
                          { label:`${calcA} + ${calcB}`,  val:calcResult.add,      color:'#34d399' },
                          { label:`${calcA} - ${calcB}`,  val:calcResult.sub,      color:'#60a5fa' },
                          { label:`${calcA} * ${calcB}`,  val:calcResult.mul,      color:'#a78bfa' },
                          { label:`${calcA} / ${calcB}`,  val:calcResult.div,      color:'#f9a8d4' },
                          { label:`${calcA} // ${calcB}`, val:calcResult.floordiv, color:'#fcd34d' },
                          { label:`${calcA} % ${calcB}`,  val:calcResult.mod,      color:'#fb923c' },
                          { label:`${calcA} ** ${calcB}`, val:calcResult.exp,      color:'#22d3ee' },
                        ].map(item => (
                          <div key={item.label} style={{ background:'#1e293b', padding:'0.8rem', borderRadius:'8px', border:`1px solid ${item.color}40` }}>
                            <div style={{ fontFamily:'monospace', color:'#94a3b8', fontSize:'0.78rem', marginBottom:'0.3rem' }}>{item.label} =</div>
                            <div style={{ color:item.color, fontFamily:'monospace', fontWeight:700, fontSize:'1.15rem' }}>{item.val}</div>
                          </div>
                        ))}
                      </div>
                )}
              </div>
            </div>

            <Playground
              id="arithmetic"
              title="Arithmetic Playground — change a and b"
              inputs={[{ label:'a =', default:'15', width:'60px' }, { label:'b =', default:'4', width:'60px' }]}
              defaultCode={`a = 15
b = 4

print("Addition:",       a + b)
print("Subtraction:",    a - b)
print("Multiplication:", a * b)
print("Division:",       a / b)
print("Floor Div:",      a // b)
print("Modulus:",        a % b)
print("Exponent:",       a ** b)

# BMI calculation using arithmetic
weight = 70
height = 1.75
bmi = weight / (height ** 2)
print("BMI:", bmi)`}
            />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('relational')}>Next: Relational Operators <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 3. RELATIONAL ─── */}
      {activeTab === 'relational' && (
        <Section key="relational" eyebrow="Day 2 • Operators" title="Relational (Comparison) Operators">
          <div className="panel">
            <div style={{ background:'#f0fdf4', borderLeft:'4px solid #10b981', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#065f46', lineHeight:1.7 }}>Relational operators compare two values and <strong>always return a boolean</strong> — either <code>True</code> or <code>False</code>. They power every <code>if</code> condition and <code>while</code> loop.</p>
            </div>

            <div style={{ overflowX:'auto', marginBottom:'2rem' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'12px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
                <thead>
                  <tr style={{ background:'#065f46', color:'white' }}>
                    {['Operator','Symbol','Description','Example (a=10, b=20)','Result'].map(h => <th key={h} style={{ padding:'0.9rem 1rem', fontSize:'0.88rem' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name:'Equal to',        sym:'==', desc:'True if both values are equal',                 ex:'a == b', res:'False' },
                    { name:'Not Equal',       sym:'!=', desc:'True if values differ',                         ex:'a != b', res:'True',  alt:true },
                    { name:'Greater Than',    sym:'>',  desc:'True if left is greater',                       ex:'a > b',  res:'False' },
                    { name:'Less Than',       sym:'<',  desc:'True if left is smaller',                       ex:'a < b',  res:'True',  alt:true },
                    { name:'Greater or Equal',sym:'>=', desc:'True if left >= right',                         ex:'a >= b', res:'False' },
                    { name:'Less or Equal',   sym:'<=', desc:'True if left <= right',                         ex:'a <= b', res:'True',  alt:true },
                  ].map(r => (
                    <tr key={r.sym} style={{ borderBottom:'1px solid #e2e8f0', background:r.alt?'#f8fafc':'white' }}>
                      <td style={{ padding:'0.85rem 1rem', fontWeight:600, color:'#0f172a' }}>{r.name}</td>
                      <td style={{ padding:'0.85rem 1rem' }}><code style={{ background:'#f0fdf4', color:'#065f46', padding:'0.25rem 0.6rem', borderRadius:'6px', fontWeight:700 }}>{r.sym}</code></td>
                      <td style={{ padding:'0.85rem 1rem', color:'#475569', fontSize:'0.88rem' }}>{r.desc}</td>
                      <td style={{ padding:'0.85rem 1rem', fontFamily:'monospace', color:'#0f172a' }}>{r.ex}</td>
                      <td style={{ padding:'0.85rem 1rem' }}><span style={{ background:r.res==='True'?'#d1fae5':'#fee2e2', color:r.res==='True'?'#065f46':'#991b1b', padding:'0.2rem 0.6rem', borderRadius:'6px', fontFamily:'monospace', fontWeight:700 }}>{r.res}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock title="relational_example.py — All 6 comparison operators with practical examples">
              a = {num('10')};  b = {num('20')};  c_val = {num('10')}<br/><br/>
              {c('# Basic comparisons')}<br/>
              {fn('print')}(a == c_val)  {out('# True  — same value')}<br/>
              {fn('print')}(a == b)     {out(' # False — different values')}<br/>
              {fn('print')}(a != b)     {out(' # True  — they differ')}<br/>
              {fn('print')}(a &lt; b)      {out(' # True  — 10 &lt; 20')}<br/>
              {fn('print')}(a &gt; b)      {out(' # False — 10 is not &gt; 20')}<br/>
              {fn('print')}(a &lt;= c_val) {out('# True  — 10 &lt;= 10')}<br/>
              {fn('print')}(b &gt;= {num('20')})   {out('# True  — 20 &gt;= 20')}<br/><br/>
              {c('# Practical use-case: grading system (no functions, no loops)')}<br/>
              marks = {num('87')}<br/>
              {kw('if')} marks &gt;= {num('90')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Grade: A+"')})<br/>
              {kw('elif')} marks &gt;= {num('75')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Grade: A"')}) {out('  # → Grade: A')}<br/>
              {kw('elif')} marks &gt;= {num('50')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Grade: B"')})<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Grade: F — Fail"')})<br/><br/>
              {c('# Chaining relational operators (Pythonic!)')}<br/>
              age = {num('25')}<br/>
              is_working_age = {num('18')} &lt;= age &lt;= {num('60')}<br/>
              {fn('print')}({str('"Valid working age:"')}, is_working_age) {out(' # True')}<br/><br/>
              {c('# Store comparison result in a variable')}<br/>
              a = {num('100')};  b = {num('200')}<br/>
              is_greater = a &gt; b<br/>
              {fn('print')}({str('"a > b ?"')}, is_greater) {out('  # False')}
            </CodeBlock>

            <Playground
              id="relational"
              title="Relational Playground — compare two values"
              inputs={[{ label:'a =', default:'10', width:'60px' }, { label:'b =', default:'20', width:'60px' }]}
              defaultCode={`a = 10
b = 20

print("a == b :", a == b)
print("a != b :", a != b)
print("a >  b :", a > b)
print("a <  b :", a < b)
print("a >= b :", a >= b)
print("a <= b :", a <= b)

# Store result in a variable
age = 25
is_working_age = 18 <= age <= 60
print("Valid working age:", is_working_age)`}
            />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('logical')}>Next: Logical Operators <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 4. LOGICAL ─── */}
      {activeTab === 'logical' && (
        <Section key="logical" eyebrow="Day 2 • Operators" title="Logical Operators">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              Logical operators <strong>combine multiple boolean conditions</strong> into one expression. They are essential for complex decision-making.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px, 1fr))', gap:'1.4rem', marginBottom:'2rem' }}>
              {[
                { kw:'and', title:'Logical AND', color:'#8b5cf6', bg:'#f5f3ff', dark:'#4c1d95',
                  rule:'True ONLY if BOTH sides are True.',
                  tt: [['True','True','True'], ['True','False','False'], ['False','True','False'], ['False','False','False']] },
                { kw:'or', title:'Logical OR', color:'#f59e0b', bg:'#fffbeb', dark:'#78350f',
                  rule:'True if AT LEAST ONE side is True.',
                  tt: [['True','True','True'], ['True','False','True'], ['False','True','True'], ['False','False','False']] },
                { kw:'not', title:'Logical NOT', color:'#ec4899', bg:'#fdf2f8', dark:'#831843',
                  rule:'REVERSES (flips) the boolean value.',
                  tt: [['True','—','False'], ['False','—','True']] },
              ].map(op => (
                <div key={op.kw} style={{ border:`2px solid ${op.color}`, borderRadius:'14px', padding:'1.5rem', background:op.bg }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.8rem' }}>
                    <code style={{ background:op.color, color:'white', padding:'0.3rem 0.7rem', borderRadius:'8px', fontSize:'1rem', fontWeight:700 }}>{op.kw}</code>
                    <span style={{ color:op.dark, fontWeight:700 }}>{op.title}</span>
                  </div>
                  <p style={{ color:op.dark, fontSize:'0.9rem', lineHeight:1.5, marginBottom:'0.8rem' }}>{op.rule}</p>
                  <div style={{ background:op.dark, color:'white', borderRadius:'8px', overflow:'hidden', fontSize:'0.82rem', fontFamily:'monospace' }}>
                    <div style={{ display:'grid', gridTemplateColumns: op.kw==='not'?'1fr 1fr':'1fr 1fr 1fr', background:'rgba(255,255,255,0.1)', padding:'0.4rem 0.8rem' }}>
                      {op.kw==='not' ? <><span>Input</span><span>Output</span></> : <><span>Left</span><span>Right</span><span>Result</span></>}
                    </div>
                    {op.tt.map((row,i) => (
                      <div key={i} style={{ display:'grid', gridTemplateColumns: op.kw==='not'?'1fr 1fr':'1fr 1fr 1fr', padding:'0.35rem 0.8rem', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
                        {row.filter(c=>c!=='—').map((cell,j) => (
                          <span key={j} style={{ color: cell==='True'?'#86efac':cell==='False'?'#fca5a5':'#e2e8f0' }}>{cell}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <CodeBlock title="logical_example.py — All 3 logical operators with real-world scenarios">
              {c('# Scenario 1: Login system using AND')}<br/>
              username = {str('"admin"')}<br/>
              password = {str('"1234"')}<br/>
              entered_user = {str('"admin"')}<br/>
              entered_pass = {str('"1234"')}<br/><br/>
              {kw('if')} entered_user == username {kw('and')} entered_pass == password:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"✅ Login successful!"')}) {out('# runs — both conditions True')}<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"❌ Invalid credentials"')})<br/><br/>
              {c('# Scenario 2: Day-off checker using OR')}<br/>
              day = {str('"Saturday"')}<br/>
              {kw('if')} day == {str('"Saturday"')} {kw('or')} day == {str('"Sunday"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"🎉 It\'s a holiday!"')}) {out('# runs')}<br/><br/>
              {c('# Scenario 3: NOT operator — toggle logic')}<br/>
              is_logged_in = {kw('False')}<br/>
              {kw('if')} {kw('not')} is_logged_in:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Please log in first"')}) {out('# runs')}<br/><br/>
              {c('# Combining all three')}<br/>
              age = {num('20')};  has_ticket = {kw('True')};  is_banned = {kw('False')}<br/>
              {kw('if')} age &gt;= {num('18')} {kw('and')} has_ticket {kw('and')} {kw('not')} is_banned:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Entry allowed! 🎭"')}) {out('# runs')}
            </CodeBlock>

            <Playground
              id="logical"
              title="Logical Playground — AND / OR / NOT"
              inputs={[{ label:'age =', default:'20', width:'60px' }, { label:'has_ticket =', default:'True', width:'65px' }]}
              defaultCode={`age = 20
has_ticket = True
is_banned = False

# AND — both must be True
print("AND:", age >= 18 and has_ticket)

# OR — at least one must be True
day = "Saturday"
print("Holiday:", day == "Saturday" or day == "Sunday")

# NOT — reverses boolean
is_logged_in = False
print("Need login:", not is_logged_in)

# Combined
print("Entry:", age >= 18 and has_ticket and not is_banned)`}
            />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('assignment_ops')}>Next: Assignment Operators <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 5. ASSIGNMENT OPERATORS ─── */}
      {activeTab === 'assignment_ops' && (
        <Section key="assignment_ops" eyebrow="Day 2 • Operators" title="Assignment Operators">
          <div className="panel">
            <div style={{ background:'#fffbeb', borderLeft:'4px solid #f59e0b', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#78350f', lineHeight:1.7 }}>
                Shorthand operators like <code>+=</code> combine an operation WITH assignment in one step, saving you from writing the variable name twice.
              </p>
            </div>

            <div style={{ overflowX:'auto', marginBottom:'2rem' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'12px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
                <thead>
                  <tr style={{ background:'#92400e', color:'white' }}>
                    {['Op','Example','Equivalent To','x starts at 10 → Result'].map(h => <th key={h} style={{ padding:'0.9rem 1rem', fontSize:'0.88rem' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { op:'=',   ex:'x = 10',  eq:'x = 10',      res:'10' },
                    { op:'+=',  ex:'x += 5',  eq:'x = x + 5',   res:'15', alt:true },
                    { op:'-=',  ex:'x -= 3',  eq:'x = x - 3',   res:'7'  },
                    { op:'*=',  ex:'x *= 2',  eq:'x = x * 2',   res:'20', alt:true },
                    { op:'/=',  ex:'x /= 4',  eq:'x = x / 4',   res:'2.5' },
                    { op:'//=', ex:'x //= 3', eq:'x = x // 3',  res:'3',  alt:true },
                    { op:'%=',  ex:'x %= 3',  eq:'x = x % 3',   res:'1' },
                    { op:'**=', ex:'x **= 2', eq:'x = x ** 2',  res:'100',alt:true },
                  ].map(r => (
                    <tr key={r.op} style={{ borderBottom:'1px solid #e2e8f0', background:r.alt?'#fef9f0':'white' }}>
                      <td style={{ padding:'0.85rem 1rem' }}><code style={{ background:'#fffbeb', color:'#92400e', padding:'0.25rem 0.6rem', borderRadius:'6px', fontWeight:700 }}>{r.op}</code></td>
                      <td style={{ padding:'0.85rem 1rem', fontFamily:'monospace', color:'#0f172a' }}>{r.ex}</td>
                      <td style={{ padding:'0.85rem 1rem', fontFamily:'monospace', color:'#64748b', fontSize:'0.9rem' }}>{r.eq}</td>
                      <td style={{ padding:'0.85rem 1rem' }}><span style={{ background:'#fef3c7', color:'#92400e', padding:'0.2rem 0.6rem', borderRadius:'6px', fontFamily:'monospace', fontWeight:600 }}>x → {r.res}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBlock title="assignment_example.py — All 8 shorthand operators step by step">
              {c('# Start with a score value')}<br/>
              score = {num('0')}<br/>
              {fn('print')}({str('"Start:"')},    score)   {out('# 0')}<br/><br/>
              score += {num('10')}   {c('# score = 0 + 10')}<br/>
              {fn('print')}({str('"After +=10:"')},  score)   {out('# 10')}<br/><br/>
              score += {num('5')}    {c('# score = 10 + 5')}<br/>
              {fn('print')}({str('"After +=5:"')},   score)   {out('# 15')}<br/><br/>
              score *= {num('2')}    {c('# score = 15 * 2')}<br/>
              {fn('print')}({str('"After *=2:"')},   score)   {out('# 30')}<br/><br/>
              score -= {num('8')}    {c('# score = 30 - 8')}<br/>
              {fn('print')}({str('"After -=8:"')},   score)   {out('# 22')}<br/><br/>
              score //= {num('2')}   {c('# score = 22 // 2')}<br/>
              {fn('print')}({str('"After //=2:"')},  score)   {out('# 11')}<br/><br/>
              score %= {num('4')}    {c('# score = 11 % 4  → remainder')}<br/>
              {fn('print')}({str('"After %=4:"')},   score)   {out('# 3')}<br/><br/>
              score **= {num('3')}   {c('# score = 3 ** 3  → cube')}<br/>
              {fn('print')}({str('"After **=3:"')},  score)   {out('# 27')}<br/><br/>
              score /= {num('3')}    {c('# score = 27 / 3  → float')}<br/>
              {fn('print')}({str('"After /=3:"')},   score)   {out('# 9.0')}
            </CodeBlock>

            <Playground
              id="assignment_ops"
              title="Assignment Playground — watch score change step by step"
              defaultCode={`score = 0
print("Start:",   score)

score += 10
print("After +=10:", score)

score += 5
print("After +=5:",  score)

score *= 2
print("After *=2:",  score)

score -= 8
print("After -=8:",  score)

score //= 2
print("After //=2:", score)

score %= 4
print("After %=4:",  score)

score **= 3
print("After **=3:", score)`}
            />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('membership_identity')}>Next: Membership & Identity <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 6. MEMBERSHIP & IDENTITY ─── */}
      {activeTab === 'membership_identity' && (
        <Section key="membership_identity" eyebrow="Day 2 • Operators" title="Membership & Identity Operators">
          <div className="panel">

            {/* MEMBERSHIP */}
            <h3 style={{ fontSize:'1.35rem', color:'#0f172a', marginBottom:'0.5rem', display:'flex', alignItems:'center', gap:'8px' }}>🔍 Membership Operators — <code style={{ fontSize:'1rem' }}>in</code> / <code style={{ fontSize:'1rem' }}>not in</code></h3>
            <p style={{ color:'#475569', lineHeight:1.6, marginBottom:'1.5rem' }}>Test whether a value <strong>exists inside</strong> a string, list, tuple, or dict key. Returns True or False.</p>

            <CodeBlock title="membership_example.py">
              {c('# Works with lists')}<br/>
              fruits = [{str('"mango"')}, {str('"apple"')}, {str('"grape"')}]<br/>
              {fn('print')}({str('"mango"')} {kw('in')} fruits)      {out('# True')}<br/>
              {fn('print')}({str('"banana"')} {kw('in')} fruits)     {out('# False')}<br/>
              {fn('print')}({str('"banana"')} {kw('not in')} fruits) {out('# True')}<br/><br/>
              {c('# Works with strings (substring check)')}<br/>
              email = {str('"student@gmail.com"')}<br/>
              {fn('print')}({str('"@gmail"')} {kw('in')} email)    {out('  # True')}<br/>
              {fn('print')}({str('"@yahoo"')} {kw('in')} email)    {out('  # False')}<br/><br/>
              {c('# Works with tuple')}<br/>
              allowed_roles = ({str('"admin"')}, {str('"editor"')}, {str('"viewer"')})<br/>
              role = {str('"hacker"')}<br/>
              {kw('if')} role {kw('not in')} allowed_roles:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Access denied! ❌"')}) {out('# → Access denied!')}<br/><br/>
              {c('# Works with dict keys')}<br/>
              student = {'{'}  {str('"name"')}: {str('"Alice"')}, {str('"age"')}: {num('20')} {'}'}<br/>
              {fn('print')}({str('"name"')} {kw('in')} student)    {out('# True  (checks keys)')}<br/>
              {fn('print')}({str('"Alice"')} {kw('in')} student)   {out('# False (values not checked!)')}
            </CodeBlock>

            {/* IDENTITY */}
            <h3 style={{ fontSize:'1.35rem', color:'#0f172a', margin:'2rem 0 0.5rem', display:'flex', alignItems:'center', gap:'8px' }}>🆔 Identity Operators — <code style={{ fontSize:'1rem' }}>is</code> / <code style={{ fontSize:'1rem' }}>is not</code></h3>
            <div style={{ background:'#fffbeb', borderLeft:'4px solid #f59e0b', padding:'1rem 1.4rem', borderRadius:'10px', marginBottom:'1.5rem' }}>
              <p style={{ margin:0, color:'#78350f', lineHeight:1.6, fontSize:'0.95rem' }}>
                <strong>Key difference:</strong> <code>==</code> checks if values are equal. <code>is</code> checks if two variables point to the <strong>same memory address</strong> (id).
              </p>
            </div>

            <CodeBlock title="identity_example.py">
              {c('# List assignment — same object vs same values')}<br/>
              a = [{num('1')}, {num('2')}, {num('3')}]<br/>
              b = a          {c('  # b references the SAME object as a')}<br/>
              c_var = [{num('1')}, {num('2')}, {num('3')}]  {c('# c has same values but NEW object')}<br/><br/>
              {fn('print')}(a {kw('is')} b)       {out('  # True  — same memory address')}<br/>
              {fn('print')}(a {kw('is')} c_var)   {out('  # False — different objects')}<br/>
              {fn('print')}(a == c_var)   {out('  # True  — same values')}<br/>
              {fn('print')}({fn('id')}(a), {fn('id')}(b)) {out(' # same number (same object)')}<br/><br/>
              {c('# Best practice: use "is" ONLY to check None')}<br/>
              result = {kw('None')}<br/>
              {kw('if')} result {kw('is')} {kw('None')}:       {c('# Correct Pythonic way ✅')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"No result yet"')}) {out('# → runs')}<br/><br/>
              {c('# is not — opposite of is')}<br/>
              x = {str('"hello"')}<br/>
              {kw('if')} x {kw('is not')} {kw('None')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"x has a value:"')}, x) {out('  # → x has a value: hello')}
            </CodeBlock>

            <Playground
              id="membership_identity"
              title="Membership & Identity Playground"
              defaultCode={`# Membership — in / not in
fruits = ["mango", "apple", "grape"]
print("mango in fruits:  ", "mango" in fruits)
print("banana in fruits: ", "banana" in fruits)
print("banana not in:    ", "banana" not in fruits)

# String membership
email = "student@gmail.com"
print("@gmail in email:", "@gmail" in email)

# Identity — is / is not
result = None
print("result is None:    ", result is None)
print("result is not None:", result is not None)`}
            />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('practice')}>Next: 🌡️ Practice Project <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 7. PRACTICE PROJECT ─── */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 2 • Capstone" title="🌡️ Temperature Converter">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0369a1)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.5rem', margin:'0 0 0.8rem', fontWeight:800 }}>Day 2 Capstone: Temperature Converter</h3>
              <p style={{ color:'#bae6fd', margin:0, lineHeight:1.7 }}>
                Apply arithmetic operators to convert between °C, °F, and Kelvin. Uses <code style={{ color:'#fde68a' }}>*</code>, <code style={{ color:'#fde68a' }}>/</code>, <code style={{ color:'#fde68a' }}>+</code>, <code style={{ color:'#fde68a' }}>-</code>, relational <code style={{ color:'#fde68a' }}>&gt;=</code>, logical <code style={{ color:'#fde68a' }}>and</code>, and type casting!
              </p>
            </div>

            <CodeBlock title="temperature_converter.py — No functions, no loops — pure operators + if/elif">
              {c('# Conversion Formulas:')}<br/>
              {c('# °C → °F : (celsius × 9/5) + 32')}<br/>
              {c('# °F → °C : (fahrenheit - 32) × 5/9')}<br/>
              {c('# °C → K  : celsius + 273.15')}<br/><br/>
              {c('# Step 1: Get input from user')}<br/>
              temp_str = {fn('input')}({str('"Enter temperature value: "')})<br/>
              unit     = {fn('input')}({str('"Enter unit (C / F / K): "')})<br/><br/>
              {c('# Step 2: Convert string → float using type casting')}<br/>
              temp = {fn('float')}(temp_str)<br/><br/>
              {c('# Step 3: Calculate using arithmetic operators')}<br/>
              {kw('if')} unit == {str('"C"')} {kw('or')} unit == {str('"c"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;to_f = (temp * {num('9')} / {num('5')}) + {num('32')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;to_k = temp + {num('273.15')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Fahrenheit:"')}, to_f) {out('  # e.g. 212.0')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Kelvin:"')},     to_k) {out('  # e.g. 373.15')}<br/><br/>
              {kw('elif')} unit == {str('"F"')} {kw('or')} unit == {str('"f"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;to_c = (temp - {num('32')}) * {num('5')} / {num('9')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;to_k = to_c + {num('273.15')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Celsius:"')}, to_c) {out('  # e.g. 0.0')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Kelvin:"')},  to_k) {out('  # e.g. 273.15')}<br/><br/>
              {kw('elif')} unit == {str('"K"')} {kw('or')} unit == {str('"k"')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;to_c = temp - {num('273.15')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;to_f = (to_c * {num('9')} / {num('5')}) + {num('32')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Celsius:"')},    to_c) {out('  # e.g. 26.85')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Fahrenheit:"')}, to_f) {out('  # e.g. 80.33')}<br/><br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({str('"Invalid! Enter C, F, or K only"')})
            </CodeBlock>

            {/* Live converter */}
            <div style={{ background:'#0f172a', borderRadius:'14px', overflow:'hidden', marginBottom:'2rem' }}>
              <div style={{ background:'#1e293b', padding:'0.9rem 1.4rem', borderBottom:'1px solid #334155', display:'flex', alignItems:'center', gap:'8px' }}>
                <span>🌡️</span><span style={{ color:'#e2e8f0', fontWeight:600 }}>Live Interactive Converter</span>
              </div>
              <div style={{ padding:'1.4rem' }}>
                <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', alignItems:'flex-end', marginBottom:'1.2rem' }}>
                  <div>
                    <label style={{ color:'#94a3b8', fontSize:'0.82rem', display:'block', marginBottom:'0.3rem' }}>Temperature Value</label>
                    <input type="number" value={tempValue} onChange={e=>setTempValue(e.target.value)}
                      style={{ background:'#1e293b', border:'1px solid #475569', color:'white', padding:'0.55rem 1rem', borderRadius:'8px', width:'120px', fontSize:'1.1rem' }}/>
                  </div>
                  <div>
                    <label style={{ color:'#94a3b8', fontSize:'0.82rem', display:'block', marginBottom:'0.3rem' }}>Input Unit</label>
                    <select value={tempUnit} onChange={e=>setTempUnit(e.target.value)}
                      style={{ background:'#1e293b', border:'1px solid #475569', color:'white', padding:'0.55rem 1rem', borderRadius:'8px', fontSize:'0.95rem' }}>
                      <option value="C">°C — Celsius</option>
                      <option value="F">°F — Fahrenheit</option>
                      <option value="K">K — Kelvin</option>
                    </select>
                  </div>
                  <button onClick={runTempConverter}
                    style={{ background:'#0ea5e9', color:'white', border:'none', padding:'0.6rem 1.6rem', borderRadius:'8px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}>
                    <Play size={16} fill="white"/> Convert
                  </button>
                </div>
                {tempResult && (
                  tempResult.error
                    ? <div style={{ color:'#f87171', fontFamily:'monospace', background:'#1e293b', padding:'1rem', borderRadius:'8px' }}>{tempResult.error}</div>
                    : <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                        {[
                          tempResult.toF!==undefined && { label:'Fahrenheit', val:`${tempResult.toF}°F`, col:'#f87171' },
                          tempResult.toC!==undefined && { label:'Celsius',    val:`${tempResult.toC}°C`, col:'#60a5fa' },
                          tempResult.toK!==undefined && { label:'Kelvin',     val:`${tempResult.toK} K`, col:'#34d399' },
                        ].filter(Boolean).map(item => (
                          <div key={item.label} style={{ background:'#1e293b', borderRadius:'12px', padding:'1.2rem 1.8rem', border:`1px solid ${item.col}40`, flex:1, minWidth:'130px' }}>
                            <div style={{ color:'#94a3b8', fontSize:'0.78rem', marginBottom:'0.4rem' }}>{item.label}</div>
                            <div style={{ color:item.col, fontFamily:'monospace', fontSize:'1.8rem', fontWeight:800 }}>{item.val}</div>
                          </div>
                        ))}
                      </div>
                )}
              </div>
            </div>

            <Playground
              id="practice_temp"
              title="Temperature Converter Playground"
              inputs={[{ label:'temp =', default:'100', width:'65px' }, { label:'unit (C/F/K) =', default:'C', width:'55px' }]}
              defaultCode={`temp = 100
unit = "C"

if unit == "C" or unit == "c":
    to_f = (temp * 9 / 5) + 32
    to_k = temp + 273.15
    print("Fahrenheit:", to_f)
    print("Kelvin:",     to_k)
elif unit == "F" or unit == "f":
    to_c = (temp - 32) * 5 / 9
    to_k = to_c + 273.15
    print("Celsius:", to_c)
    print("Kelvin:",  to_k)
elif unit == "K" or unit == "k":
    to_c = temp - 273.15
    to_f = (to_c * 9 / 5) + 32
    print("Celsius:",    to_c)
    print("Fahrenheit:", to_f)
else:
    print("Invalid unit! Use C, F, or K")`}
            />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('assignment_work')}>Next: Assignment 📝 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 8. ASSIGNMENT ─── */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 2 • Assignment" title="📝 Day 2 Assignment">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', padding:'2rem', borderRadius:'16px', color:'white', marginBottom:'2.5rem' }}>
              <h3 style={{ margin:'0 0 0.8rem', fontSize:'1.5rem', fontWeight:800 }}>Submit by Next Class</h3>
              <p style={{ color:'#bfdbfe', margin:0, lineHeight:1.7 }}>Complete all 10 tasks below in a single Python file called <code style={{ color:'#fde68a' }}>day2_assignment.py</code>. Comment each answer with the task number.</p>
            </div>

            {[
              { n:1,  t:'Arithmetic Calculator',        diff:'Easy',   col:'#10b981', desc:'Take two numbers from the user as input (use input() and int()). Print the result of all 7 arithmetic operations (+, -, *, /, //, %, **) with labels.' },
              { n:2,  t:'Even or Odd Checker',          diff:'Easy',   col:'#10b981', desc:'Take a number from the user. Use the modulus (%) operator to print whether it is "Even" or "Odd".' },
              { n:3,  t:'Grade Calculator',             diff:'Easy',   col:'#10b981', desc:'Take a marks value (0–100). Use relational operators (>=, <) with if/elif/else to print the grade: A+ (≥90), A (≥75), B (≥60), C (≥45), F (<45).' },
              { n:4,  t:'Simple Interest Calculator',   diff:'Medium', col:'#f59e0b', desc:'Take Principal (P), Rate (R), and Time (T) from user. Calculate Simple Interest = (P * R * T) / 100 using arithmetic operators and print the result.' },
              { n:5,  t:'Login Validator',              diff:'Medium', col:'#f59e0b', desc:'Store a correct username and password. Ask user for input. Use logical AND to check if both are correct. Print "Login Success" or "Invalid Credentials".' },
              { n:6,  t:'Temperature Converter',        diff:'Medium', col:'#f59e0b', desc:'Ask the user to enter a temperature and choose a unit (C, F, or K). Convert and print all three units using the conversion formulas from today.' },
              { n:7,  t:'Membership Checker',           diff:'Medium', col:'#f59e0b', desc:'Create a list of 5 cities. Ask user to type a city name. Use "in" operator to check if it exists in the list. Print "Found" or "Not Found".' },
              { n:8,  t:'Score Tracker with Shorthand', diff:'Medium', col:'#f59e0b', desc:'Start with score = 0. Simulate 5 rounds: add 10, subtract 3, multiply by 2, floor divide by 3, then mod by 7. Print the score after every step using shorthand operators.' },
              { n:9,  t:'Age-Group Classifier',         diff:'Hard',   col:'#ef4444', desc:'Take age from user. Use chained relational operators and logical operators to classify: Child (0–12), Teen (13–17), Adult (18–59), Senior (60+). Also check if they are eligible to vote (age >= 18).' },
              { n:10, t:'Shopping Cart Checker',        diff:'Hard',   col:'#ef4444', desc:'Create a shopping cart (list). Ask user to search for an item. Use "in" to check existence. Display total items using len(). Use arithmetic to calculate a 10% discount if total > 3 items.' },
            ].map(task => (
              <div key={task.n} style={{ border:'1px solid #e2e8f0', borderRadius:'12px', padding:'1.4rem', marginBottom:'1.2rem', background:'#ffffff' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.6rem', flexWrap:'wrap', gap:'0.5rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ background:'#0f172a', color:'white', width:'32px', height:'32px', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.9rem', flexShrink:0 }}>{task.n}</span>
                    <h4 style={{ margin:0, color:'#0f172a', fontSize:'1.1rem' }}>{task.t}</h4>
                  </div>
                  <span style={{ background:`${task.col}20`, color:task.col, padding:'0.2rem 0.7rem', borderRadius:'20px', fontSize:'0.78rem', fontWeight:700, whiteSpace:'nowrap' }}>{task.diff}</span>
                </div>
                <p style={{ margin:0, color:'#475569', lineHeight:1.6, fontSize:'0.95rem', paddingLeft:'42px' }}>{task.desc}</p>
              </div>
            ))}

            <div style={{ background:'#eff6ff', padding:'1.5rem', borderRadius:'12px', border:'1px solid #bfdbfe', marginTop:'1rem' }}>
              <h4 style={{ color:'#1e3a8a', margin:'0 0 0.5rem', display:'flex', alignItems:'center', gap:'8px' }}><Lightbulb size={20}/> AI Tip for Assignments</h4>
              <p style={{ color:'#1e40af', margin:0, lineHeight:1.6, fontSize:'0.95rem' }}>
                Stuck? Ask ChatGPT: <em>"Explain why my Python modulus gives a negative result"</em> or <em>"Write a docstring for this temperature converter function."</em> Use AI to understand, not just to copy!
              </p>
            </div>

            <div className="card-actions" style={{ marginTop:'1.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Take Quiz 🧠 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── 9. QUIZ ─── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Day 2 • Assessment" title="🧠 Quiz — Python Operators">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#4c1d95,#5b21b6)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2rem' }}>
              <h3 style={{ margin:'0 0 0.5rem', fontSize:'1.4rem', fontWeight:800 }}>Test Your Knowledge!</h3>
              <p style={{ color:'#ddd6fe', margin:0 }}>{quizData.length} questions · Select an answer for each · Click Submit to see your score.</p>
            </div>

            {quizData.map((q, qi) => {
              const selected = quizAnswers[qi];
              const isCorrect = selected === q.ans;
              return (
                <div key={qi} style={{ border:`2px solid ${quizSubmitted ? (isCorrect?'#10b981':'#ef4444') : selected!==undefined?'#3b82f6':'#e2e8f0'}`, borderRadius:'14px', padding:'1.4rem', marginBottom:'1.2rem', background:'white', transition:'border-color 0.3s' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:'12px', marginBottom:'1rem' }}>
                    <span style={{ background:'#0f172a', color:'white', minWidth:'30px', height:'30px', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.85rem' }}>{qi+1}</span>
                    <p style={{ margin:0, color:'#0f172a', fontWeight:600, fontSize:'1rem', lineHeight:1.5 }}>{q.q}</p>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:'0.6rem', paddingLeft:'42px' }}>
                    {q.opts.map((opt, oi) => {
                      let bg = '#f8fafc', border = '#e2e8f0', textCol = '#475569';
                      if (selected === oi && !quizSubmitted) { bg='#eff6ff'; border='#3b82f6'; textCol='#1d4ed8'; }
                      if (quizSubmitted) {
                        if (oi === q.ans)          { bg='#d1fae5'; border='#10b981'; textCol='#065f46'; }
                        else if (selected === oi)  { bg='#fee2e2'; border='#ef4444'; textCol='#991b1b'; }
                      }
                      return (
                        <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p=>({...p,[qi]:oi}))}
                          style={{ background:bg, border:`2px solid ${border}`, color:textCol, padding:'0.7rem 1rem', borderRadius:'8px', textAlign:'left', cursor: quizSubmitted?'default':'pointer', fontWeight: selected===oi||quizSubmitted&&oi===q.ans ? 600:400, fontSize:'0.9rem', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'8px' }}>
                          {quizSubmitted && oi===q.ans && <CheckCircle size={16} color="#10b981"/>}
                          {quizSubmitted && selected===oi && oi!==q.ans && <XCircle size={16} color="#ef4444"/>}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div style={{ marginTop:'0.8rem', paddingLeft:'42px', background:isCorrect?'#f0fdf4':'#fef2f2', padding:'0.8rem 1rem 0.8rem 52px', borderRadius:'8px' }}>
                      <span style={{ color:isCorrect?'#065f46':'#991b1b', fontSize:'0.88rem', fontWeight:500 }}>
                        {isCorrect ? '✅ Correct! ' : '❌ Wrong. '} {q.exp}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
                <button
                  onClick={() => { if (Object.keys(quizAnswers).length < quizData.length) { alert(`Please answer all ${quizData.length} questions first!`); return; } setQuizSubmitted(true); window.scrollTo({top:0,behavior:'smooth'}); }}
                  style={{ background:'#4c1d95', color:'white', border:'none', padding:'1rem 2.5rem', borderRadius:'12px', fontSize:'1.1rem', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 14px rgba(76,29,149,0.3)' }}>
                  Submit Quiz 🚀
                </button>
                <p style={{ color:'#94a3b8', marginTop:'0.8rem', fontSize:'0.9rem' }}>Answered {Object.keys(quizAnswers).length}/{quizData.length} questions</p>
              </div>
            ) : (
              <div style={{ background: quizScore>=10?'linear-gradient(135deg,#065f46,#10b981)': quizScore>=7?'linear-gradient(135deg,#1d4ed8,#3b82f6)':'linear-gradient(135deg,#92400e,#f59e0b)', padding:'2rem', borderRadius:'16px', textAlign:'center', marginTop:'1rem' }}>
                <Trophy size={48} color="white" style={{ marginBottom:'0.8rem' }}/>
                <h3 style={{ color:'white', fontSize:'2rem', margin:'0 0 0.5rem', fontWeight:900 }}>{quizScore}/{quizData.length}</h3>
                <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'1.1rem', margin:'0 0 1.2rem' }}>
                  {quizScore===quizData.length ? '🏆 Perfect Score! Python Operators Master!' :
                   quizScore>=10 ? '🥇 Excellent! Outstanding performance!' :
                   quizScore>=7  ? '🥈 Good work! Review the answers below.' :
                                   '📚 Keep practicing! Revisit the lessons.'}
                </p>
                <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                  <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); window.scrollTo({top:0,behavior:'smooth'}); }}
                    style={{ background:'white', color:'#1d4ed8', border:'none', padding:'0.7rem 1.8rem', borderRadius:'10px', fontWeight:700, cursor:'pointer', fontSize:'0.95rem' }}>
                    Retake Quiz 🔄
                  </button>
                  <button onClick={() => handleContinue('intro')}
                    style={{ background:'rgba(255,255,255,0.2)', color:'white', border:'2px solid rgba(255,255,255,0.5)', padding:'0.7rem 1.8rem', borderRadius:'10px', fontWeight:700, cursor:'pointer', fontSize:'0.95rem' }}>
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
