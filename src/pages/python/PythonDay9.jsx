import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Terminal, Trophy, CheckCircle, XCircle, Globe, Link, Database, Layers, Server, Wifi, Bot } from 'lucide-react';

/* ── UI Helpers ── */
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
    {title && <div style={{ background:'#1e293b', padding:'0.55rem 1.2rem', display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #334155' }}>
      <Code size={14} color="#38bdf8"/>
      <span style={{ color:'#94a3b8', fontSize:'0.8rem', fontWeight:600 }}>{title}</span>
    </div>}
    <div style={{ background:'#0f172a', color:'#f8fafc', padding:'1.3rem', fontFamily:'monospace', fontSize:'0.91rem', lineHeight:1.9, overflowX:'auto' }}>{children}</div>
  </div>
);

const c  = t => <span style={{ color:'#64748b' }}>{t}</span>;
const kw = t => <span style={{ color:'#f472b6' }}>{t}</span>;
const fn = t => <span style={{ color:'#38bdf8' }}>{t}</span>;
const nm = t => <span style={{ color:'#fbbf24' }}>{t}</span>;
const st = t => <span style={{ color:'#a5b4fc' }}>{t}</span>;
const cm = t => <span style={{ color:'#6b7280', fontStyle:'italic' }}>{t}</span>;

/* ── Step Card ── */
const StepCard = ({ step, icon, title, desc, color }) => (
  <div style={{ display:'flex', gap:'1rem', padding:'1.2rem', background:'#f8fafc', borderRadius:12, border:`2px solid ${color}20`, marginBottom:'1rem', alignItems:'flex-start' }}>
    <div style={{ width:44, height:44, borderRadius:'50%', background:`${color}15`, border:`2px solid ${color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <span style={{ color, fontWeight:800, fontSize:'1.1rem' }}>{step}</span>
    </div>
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>{icon}<strong style={{ color:'#0f172a', fontSize:'1.05rem' }}>{title}</strong></div>
      <p style={{ margin:0, color:'#475569', lineHeight:1.6 }}>{desc}</p>
    </div>
  </div>
);

/* ── QUIZ & PARSER LOGIC ── */
// ... (Keeping parsing and runCode logic intact)

/* ── Playground ── */
function Playground({ id, title, defaultCode, inputs=[] }) {
  const [code, setCode] = useState(defaultCode);
  const [vals, setVals] = useState(inputs.map(i=>i.default||''));
  const [out, setOut] = useState('');
  const [running, setRunning] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [activePlaygroundTab, setActivePlaygroundTab] = useState('output'); // 'output' or 'ai'

  const run = () => { 
    setRunning(true); 
    setTimeout(()=>{ 
      setOut(runCode(code,vals)); 
      setRunning(false); 
      setActivePlaygroundTab('output');
    }, 80); 
  };

  const reset = () => { 
    setCode(defaultCode); 
    setOut(''); 
    setAiFeedback('');
    setVals(inputs.map(i=>i.default||'')); 
  };

  const getPlaygroundAIFeedback = () => {
    setAiLoading(true);
    setTimeout(() => {
      let feedback = "";
      const lines = code.split('\n');
      let indentationError = false;
      for (let i = 0; i < lines.length; i++) {
        if ((lines[i].startsWith(' ') && lines[i].length % 4 !== 0 && !lines[i].trim().startsWith('#')) ||
            (lines[i].includes('def ') && lines[i+1] && !lines[i+1].startsWith('    ') && !lines[i+1].trim().startsWith('#') && lines[i+1].trim() !== '')) {
          indentationError = true;
        }
      }
      
      let colonError = false;
      if (/def\s+\w+\s*\([^)]*\)\s*$/m.test(code) || /class\s+\w+\s*$/m.test(code) || /if\s+.*$/m.test(code) || /for\s+.*$/m.test(code) || /while\s+.*$/m.test(code)) {
        colonError = true;
      }
      
      if (indentationError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Indentation Issue Detected**\n\nPython relies heavily on indentation (typically 4 spaces) to define code blocks. Make sure your lines inside functions or classes are indented by exactly 4 spaces.";
      } else if (colonError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Missing Colon (:)**\n\nIn Python, statements that define a block (like `def`, `class`, `if`, `for`, `while`) MUST end with a colon `:`.";
      } else {
        feedback = `🤖 **AI Co-Pilot Code Review:**\n\nYour code looks syntactically clean! Here is a breakdown of what it accomplishes:\n`;
        if (code.includes('sqlite3') || code.includes('connect')) {
          feedback += `- **Database Operations**: You are simulating establishing a database connection and executing SQL queries.\n- **Transaction Commit**: Remember to call \`conn.commit()\` after inserts to persist changes!\n`;
        }
        if (code.includes('math') || code.includes('random') || code.includes('json')) {
          feedback += `- **Standard Library Modules**: Correct usage of pre-installed Python standard libraries.\n`;
        }
        if (code.includes('def ')) {
          feedback += `- **Function Definition**: Properly modularized functions with return values.\n`;
        }
        feedback += `\n**Optimization Tip:** Add exception handling (\`try...except\`) around SQL connections to ensure \`conn.close()\` is always called if a query fails!`;
      }
      
      setAiFeedback(feedback);
      setAiLoading(false);
      setActivePlaygroundTab('ai');
    }, 600);
  };

  return (
    <div id={id} style={{ marginTop:'1.5rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
        <span style={{ fontWeight:700, color:'#0f172a' }}>{title}</span>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          <button className="btn btn-outline" onClick={getPlaygroundAIFeedback} style={{ padding:'0.3rem 0.8rem', fontSize:'0.82rem', borderColor: '#8b5cf6', color: '#8b5cf6' }}>
            <Bot size={13} /> {aiLoading ? 'Analyzing...' : 'AI Explain'}
          </button>
          <button className="btn btn-outline" onClick={reset} style={{ padding:'0.3rem 0.8rem', fontSize:'0.82rem' }}><RefreshCw size={13}/> Reset</button>
          <button className="btn btn-primary" onClick={run} disabled={running} style={{ padding:'0.3rem 0.9rem', fontSize:'0.82rem' }}><Play size={13}/> {running?'Running…':'Run'}</button>
        </div>
      </div>
      {inputs.length>0&&<div style={{ display:'flex', gap:'0.7rem', marginBottom:'0.7rem', flexWrap:'wrap' }}>{inputs.map((inp,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
          <label style={{ fontSize:'0.82rem', color:'#475569', fontWeight:600 }}>{inp.label}</label>
          <input value={vals[i]} onChange={e=>{const v=[...vals];v[i]=e.target.value;setVals(v);}} style={{ padding:'0.25rem 0.5rem', borderRadius:6, border:'1px solid #cbd5e1', fontSize:'0.85rem', width:100 }}/>
        </div>
      ))}</div>}
      <textarea value={code} onChange={e=>setCode(e.target.value)} style={{ width:'100%', minHeight:200, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
      
      {/* Tab Selectors */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginTop: '0.6rem', background: '#1e293b', borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
        <button 
          onClick={() => setActivePlaygroundTab('output')}
          style={{ padding: '0.6rem 1.2rem', background: activePlaygroundTab === 'output' ? '#0f172a' : 'transparent', color: activePlaygroundTab === 'output' ? '#10b981' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
        >
          <Terminal size={14} /> Terminal Output
        </button>
        <button 
          onClick={() => { if (!aiFeedback) getPlaygroundAIFeedback(); else setActivePlaygroundTab('ai'); }}
          style={{ padding: '0.6rem 1.2rem', background: activePlaygroundTab === 'ai' ? '#0f172a' : 'transparent', color: activePlaygroundTab === 'ai' ? '#a5b4fc' : '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
        >
          <Bot size={14} /> ✨ AI Feedback
        </button>
      </div>

      {activePlaygroundTab === 'output' && out && (
        <div style={{ background:'#f0fdf4', border:'1.5px solid #10b981', borderTop: 'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#064e3b' }}>
          <strong style={{ color:'#10b981' }}>Output:</strong><br/>{out}
        </div>
      )}

      {activePlaygroundTab === 'ai' && aiFeedback && (
        <div style={{ background:'#f5f3ff', border:'1.5px solid #8b5cf6', borderTop: 'none', borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:'0.9rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#3b0764' }}>
          {aiFeedback}
        </div>
      )}
    </div>
  );
}

/* ── Mock API responses ── */
const MOCK_APIS = {
  'jsonplaceholder.typicode.com/posts/1': { userId:1, id:1, title:'Python Modules are Amazing', body:'Python has a rich standard library with hundreds of useful modules ready to use...' },
  'jsonplaceholder.typicode.com/users/1': { id:1, name:'Leanne Graham', username:'Bret', email:'Sincere@april.biz', company:{ name:'Romaguera-Crona' } },
  'api.openweathermap.org': { city:'Chennai', temperature:34, condition:'Sunny', humidity:72 },
  'api.github.com/users/torvalds': { login:'torvalds', name:'Linus Torvalds', public_repos:7, followers:234567, bio:'Just a fellow lad building an OS for fun...' },
};

/* ── Simple Interpreter ── */
function mergeLines(code) {
  const raw = code.split('\n'); const merged = []; let cur = ''; let d = [0,0,0]; let inS = false, sC = '';
  for (const line of raw) {
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (!inS && (ch==='"'||ch==="'")) { inS=true; sC=ch; }
      else if (inS && ch===sC && line[i-1]!=='\\') { inS=false; }
      else if (!inS) {
        if (ch==='(') d[0]++; else if (ch===')') d[0]--;
        else if (ch==='[') d[1]++; else if (ch===']') d[1]--;
        else if (ch==='{') d[2]++; else if (ch==='}') d[2]--;
      }
    }
    if (cur) { cur += ' ' + line.trim(); } else { cur = line; }
    if (d[0]<=0 && d[1]<=0 && d[2]<=0) { merged.push(cur); cur=''; d=[0,0,0]; }
  }
  if (cur.trim()) merged.push(cur);
  return merged;
}

function parsePy(code) {
  const lines = mergeLines(code); let i = 0;
  function block(bi) {
    const b = [];
    while (i < lines.length) {
      const line = lines[i]; const t = line.trim();
      if (!t || t.startsWith('#')) { i++; continue; }
      const ind = line.search(/\S/);
      if (ind < bi) break;
      if (ind === bi) {
        if (t.startsWith('import ') || t.startsWith('from ')) { b.push({ type:'import', line:t }); i++; continue; }
        if (t.startsWith('def ')) {
          const m = t.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
          if (m) { const ps = m[2] ? m[2].split(',').map(x=>x.trim().split('=')[0].trim()) : []; i++; const bd = block(bi+4); b.push({ type:'def', name:m[1], params:ps, body:bd }); continue; }
        }
        if (t.startsWith('return ')) { b.push({ type:'return', expr:t.slice(7) }); i++; continue; }
        if (t === 'return') { b.push({ type:'return', expr:'None' }); i++; continue; }
        if (t.startsWith('if ')) {
          const cond = t.slice(3,-1); i++; const bd = block(bi+4); const elifs=[]; let eb=null;
          while (i<lines.length) { const nt=lines[i].trim(); const ni=lines[i].search(/\S/); if(ni!==bi)break; if(nt.startsWith('elif ')){const ec=nt.slice(5,-1);i++;const ebd=block(bi+4);elifs.push({cond:ec,body:ebd});}else if(nt.startsWith('else:')){i++;eb=block(bi+4);break;}else break; }
          b.push({ type:'if', cond, body:bd, elifs, else_body:eb }); continue;
        }
        if (t.startsWith('for ')) { const m=t.match(/^for\s+(.+?)\s+in\s+(.+):$/); if(m){i++;const bd=block(bi+4);b.push({type:'for',varName:m[1].trim(),iterExpr:m[2].trim(),body:bd});continue;} }
        if (t.startsWith('while ')) { const cond=t.slice(6,-1);i++;const bd=block(bi+4);b.push({type:'while',cond,body:bd});continue; }
        if (t==='break'){b.push({type:'break'});i++;continue;}
        if (t==='continue'){b.push({type:'continue'});i++;continue;}
        if (t==='pass'){b.push({type:'pass'});i++;continue;}
        if (t.startsWith('print(')){ b.push({type:'print',line:t});i++;continue; }
        const am=t.match(/^([a-zA-Z_]\w*(?:\[.+?\])?(?:\s*,\s*[a-zA-Z_]\w*(?:\[.+?\])?)*)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
        if(am){b.push({type:'assign',name:am[1],op:am[2]?am[2]+'=':'=',expr:am[3]});i++;continue;}
        b.push({type:'expr',expr:t});i++;
      } else { i++; }
    }
    return b;
  }
  return block(0);
}

function splitCommas(text) {
  const args=[]; let d=0,inS=false,sC='',cur='';
  for(const ch of text){
    if(!inS&&(ch==='"'||ch==="'")){inS=true;sC=ch;cur+=ch;}
    else if(inS&&ch===sC){inS=false;cur+=ch;}
    else if(!inS&&(ch==='('||ch==='['||ch==='{')){d++;cur+=ch;}
    else if(!inS&&(ch===')'||ch===']'||ch==='}')){d--;cur+=ch;}
    else if(!inS&&ch===','&&d===0){args.push(cur.trim());cur='';}
    else cur+=ch;
  }
  if(cur.trim())args.push(cur.trim());
  return args;
}

function tuplesToArrays(text) {
  let r=''; let inS=false,sC=''; let i=0;
  while(i<text.length){
    const ch=text[i];
    if(!inS&&(ch==='"'||ch==="'")){inS=true;sC=ch;r+=ch;i++;}
    else if(inS&&ch===sC){inS=false;r+=ch;i++;}
    else if(!inS&&ch==='('){
      const prev=r.trim();
      const isF=prev&&/[a-zA-Z0-9_]/.test(prev[prev.length-1]);
      let d=1,j=i+1,hasC=false,inner=''; let ss=false,sc='';
      while(j<text.length&&d>0){const s=text[j];if(!ss&&(s==='"'||s==="'")){ss=true;sc=s;}else if(ss&&s===sc){ss=false;}if(!ss){if(s==='(')d++;if(s===')')d--;if(s===','&&d===1)hasC=true;}if(d>0)inner+=s;j++;}
      r+=(hasC&&!isF)?'['+tuplesToArrays(inner)+']':'('+tuplesToArrays(inner)+')';
      i=j;
    }else{r+=ch;i++;}
  }
  return r;
}

function runCode(code, inputs=[]) {
  const env = {};
  const output = [];
  let inputIdx = 0;
  let total = 0;
  const getInput = () => { const v = inputs[inputIdx] !== undefined ? String(inputs[inputIdx]) : ''; inputIdx++; return v; };

  const MODS = {
    math: { pi:Math.PI, e:Math.E, sqrt:Math.sqrt, floor:Math.floor, ceil:Math.ceil, pow:Math.pow, log:Math.log, sin:Math.sin, cos:Math.cos, fabs:Math.abs, factorial:n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;}, gcd:(a,b)=>{while(b){[a,b]=[b,a%b];}return a;} },
    random: { random:Math.random, randint:(a,b)=>Math.floor(Math.random()*(b-a+1))+a, choice:arr=>{if(typeof arr==='string')return arr[Math.floor(Math.random()*arr.length)];return arr[Math.floor(Math.random()*arr.length)];}, shuffle:arr=>{for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return null;}, uniform:(a,b)=>a+Math.random()*(b-a) },
    os: { getcwd:()=>'/home/student/python', listdir:()=>['main.py','utils.py','data.json'], path:{ join:(...p)=>p.join('/'), exists:()=>true, basename:p=>p.split('/').pop() }, cpu_count:()=>8, getenv:k=>k==='HOME'?'/home/student':'undefined' },
    datetime: { datetime:{ now:()=>new Date().toISOString().slice(0,19).replace('T',' '), today:()=>new Date().toISOString().slice(0,10) } },
    json: { dumps:(o,n)=>JSON.stringify(o,null,n), loads:s=>{try{return JSON.parse(s);}catch(e){return null;}} },
    sys: { version:'3.12.0 (main)', argv:['script.py'], path:['/usr/lib/python3'] },
    requests: {
      get: url => {
        const key = Object.keys(MOCK_APIS).find(k => url.includes(k));
        const data = key ? MOCK_APIS[key] : { error:'Not Found' };
        return { status_code: key?200:404, ok:!!key, json:()=>data, text:JSON.stringify(data,null,2), headers:{'Content-Type':'application/json'} };
      },
      post: (url, data) => ({ status_code:201, ok:true, json:()=>({...data, id:101}), text:JSON.stringify({...data,id:101}) }),
    },
  };

  const evalExpr = (expr, scope=env) => {
    expr = expr.trim();
    if (/^"([^"\\]|\\.)*"$/.test(expr)||/^'([^'\\]|\\.)*'$/.test(expr)) return expr.slice(1,-1);
    if (expr==='True') return true;
    if (expr==='False') return false;
    if (expr==='None') return null;
    if (/^input\(.*\)$/.test(expr)) return getInput();
    if (expr.startsWith('lambda ')) { const m=expr.match(/^lambda\s+([^:]+):\s*(.+)$/); if(m)return{type:'lambda',params:m[1].split(',').map(x=>x.trim()),bodyStr:m[2]}; }

    // f-string
    if (/^f["']/.test(expr)) {
      const q = expr[1]; const inner = expr.slice(2,-1);
      return inner.replace(/\{([^}]+)\}/g, (_,k)=>{ try{ return String(evalExpr(k.trim(),scope)); }catch(e){return ''+e.message;} });
    }

    // method call
    const mm = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (mm) {
      const [,vn,method,argStr] = mm;
      const args = argStr ? splitCommas(argStr).map(x=>evalExpr(x.trim(),scope)) : [];
      const obj = scope[vn]!==undefined ? scope[vn] : env[vn];
      if (obj!==undefined&&obj!==null) {
        if (typeof obj[method]==='function') return obj[method](...args);
        if (Array.isArray(obj)) {
          if(method==='append'){obj.push(args[0]);return null;}
          if(method==='pop') return args.length>0?obj.splice(args[0],1)[0]:obj.pop();
          if(method==='sort'){obj.sort((a,b)=>a>b?1:-1);return null;}
          if(method==='reverse'){obj.reverse();return null;}
          if(method==='join') return args[0].join(String(obj));
        }
        if (typeof obj==='string') {
          if(method==='upper') return obj.toUpperCase();
          if(method==='lower') return obj.toLowerCase();
          if(method==='strip') return obj.trim();
          if(method==='split') return obj.split(args[0]!==undefined?args[0]:undefined);
          if(method==='replace') return obj.split(args[0]).join(args[1]);
          if(method==='format'){let res=obj;let idx=0;res=res.replace(/\{\}/g,()=>String(args[idx++]));return res;}
          if(method==='startswith') return obj.startsWith(args[0]);
          if(method==='endswith') return obj.endsWith(args[0]);
          if(method==='find') return obj.indexOf(args[0]);
          if(method==='join') return args[0].join(obj);
          if(method==='count') return obj.split(args[0]).length-1;
        }
        if (typeof obj==='object'&&!Array.isArray(obj)) {
          if(method==='keys') return Object.keys(obj);
          if(method==='values') return Object.values(obj);
          if(method==='items') return Object.entries(obj).map(([k,v])=>[k,v]);
          if(method==='get') return obj[args[0]]!==undefined?obj[args[0]]:(args[1]!==undefined?args[1]:null);
        }
      }
    }

    // attribute (no call)
    const am2 = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)$/);
    if (am2) { const obj=scope[am2[1]]!==undefined?scope[am2[1]]:env[am2[1]]; if(obj!==undefined&&obj!==null) return obj[am2[2]]; }

    // index
    const im = expr.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
    if (im) { const obj=scope[im[1]]!==undefined?scope[im[1]]:env[im[1]]; if(obj!==undefined&&obj!==null) return obj[evalExpr(im[2],scope)]; }

    // simple var
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) {
      if (scope[expr]!==undefined) return scope[expr];
      if (env[expr]!==undefined) return env[expr];
      throw new Error(`NameError: name '${expr}' is not defined`);
    }

    let safe = tuplesToArrays(expr);
    const keys = [...new Set(Object.keys(scope).concat(Object.keys(env)))].sort((a,b)=>b.length-a.length);
    safe = safe.replace(/ and /g,' && ').replace(/ or /g,' || ').replace(/ not /g,' !').replace(/^not /,'!').replace(/==/g,'===').replace(/!=/g,'!==');
    try {
      const runner = new Function('scope','env','execBlock','evalExpr','getInput','MODS',`
        const str=x=>String(x===true?'True':x===false?'False':x===null?'None':x);
        const int=x=>parseInt(x,10); const float=x=>parseFloat(x); const bool=x=>Boolean(x);
        const len=x=>x?x.length:0; const input=()=>getInput();
        const range=(s,e,st)=>{if(e===undefined){e=s;s=0;}if(st===undefined)st=1;const a=[];if(st>0){for(let i=s;i<e;i+=st)a.push(i);}else{for(let i=s;i>e;i+=st)a.push(i);}return a;};
        const list=x=>{if(!x)return[];if(Array.isArray(x))return[...x];if(typeof x==='string')return x.split('');return Array.from(x);};
        const tuple=x=>list(x);
        const map=(fn,it)=>(Array.isArray(it)?it:Array.from(it)).map(fn);
        const filter=(fn,it)=>(Array.isArray(it)?it:Array.from(it)).filter(fn);
        const zip=(...arrs)=>{const n=Math.min(...arrs.map(a=>a.length));const r=[];for(let i=0;i<n;i++)r.push(arrs.map(a=>a[i]));return r;};
        const sorted=arr=>{const c=[...arr];c.sort((a,b)=>a>b?1:-1);return c;};
        const sum=arr=>arr.reduce((a,b)=>a+b,0);
        const min=(...args)=>{const arr=args.length===1&&Array.isArray(args[0])?args[0]:args;return Math.min(...arr);};
        const max=(...args)=>{const arr=args.length===1&&Array.isArray(args[0])?args[0]:args;return Math.max(...arr);};
        const abs=x=>Math.abs(x); const round=(x,n)=>n!==undefined?parseFloat(x.toFixed(n)):Math.round(x);
        const math=MODS.math; const random=MODS.random; const os=MODS.os; const datetime=MODS.datetime;
        const json=MODS.json; const sys=MODS.sys; const requests=MODS.requests;
        const type=x=>{if(x===null)return 'NoneType';if(Array.isArray(x))return 'list';return typeof x;};
        ${keys.map(k=>{
          const v=scope[k]!==undefined?scope[k]:env[k];
          if(v&&v.type==='function') return `const ${k}=(...args)=>{const le={...scope};const ps=env['${k}'].params;for(let i=0;i<ps.length;i++)le[ps[i]]=args[i];const s=execBlock(env['${k}'].body,le);return s&&s.type==='return'?s.value:null;};`;
          if(v&&v.type==='lambda') return `const ${k}=(...args)=>{const le={...scope};for(let i=0;i<env['${k}'].params.length;i++)le[env['${k}'].params[i]]=args[i];return evalExpr(env['${k}'].bodyStr,le);};`;
          return `const ${k}=scope['${k}']!==undefined?scope['${k}']:env['${k}'];`;
        }).join('\n')}
        return (${safe});
      `);
      return runner(scope,env,execBlock,evalExpr,getInput,MODS);
    } catch(e) { throw new Error(`SyntaxError: ${expr}`); }
  };

  const parsePrint = (line, scope) => {
    const m = line.match(/^print\((.*)\)$/s);
    if (!m) return;
    const args = splitCommas(m[1]);
    const parts = args.map(a => {
      a = a.trim();
      if (a.startsWith('sep=')||a.startsWith('end=')) return null;
      try {
        const v = evalExpr(a, scope);
        if (Array.isArray(v)) return '['+v.map(x=>typeof x==='string'?`'${x}'`:x===true?'True':x===false?'False':x===null?'None':String(x)).join(', ')+']';
        if (typeof v==='object'&&v!==null&&!v.type) return JSON.stringify(v,null,2);
        return v===true?'True':v===false?'False':v===null?'None':String(v);
      } catch(e) { return `[Error:${e.message}]`; }
    }).filter(x=>x!==null);
    output.push(parts.join(' ')+'\n');
  };

  function unpack(name, val, scope) {
    const parts = name.split(',').map(x=>x.trim());
    if (parts.length>1) { parts.forEach((p,i)=>{ scope[p]=Array.isArray(val)?val[i]:val; }); }
    else { scope[name]=val; }
  }

  function execBlock(nodes, scope=env) {
    for (const node of nodes) {
      total++; if(total>8000) throw new Error('TimeLimitExceeded');
      if (node.type==='import') {
        const lm = node.line.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?/);
        if(lm){ const mn=lm[1],al=lm[2]||lm[1]; if(MODS[mn]){scope[al]=MODS[mn];env[al]=MODS[mn];} }
        const fm = node.line.match(/^from\s+(\w+)\s+import\s+(.+)$/);
        if(fm){ const mn=fm[1],what=fm[2]; if(MODS[mn]){ if(what==='*'){Object.assign(scope,MODS[mn]);Object.assign(env,MODS[mn]);}else{what.split(',').map(x=>x.trim()).forEach(n=>{scope[n]=MODS[mn][n];env[n]=MODS[mn][n];});} } }
      }
      else if (node.type==='def') { env[node.name]={type:'function',params:node.params,body:node.body}; }
      else if (node.type==='return') { return{type:'return',value:evalExpr(node.expr,scope)}; }
      else if (node.type==='if') {
        let ran=false;
        if(evalExpr(node.cond,scope)){const s=execBlock(node.body,{...scope});if(s&&s.type==='return')return s;ran=true;}
        if(!ran)for(const e of node.elifs){if(evalExpr(e.cond,scope)){const s=execBlock(e.body,{...scope});if(s&&s.type==='return')return s;ran=true;break;}}
        if(!ran&&node.else_body){const s=execBlock(node.else_body,{...scope});if(s&&s.type==='return')return s;}
      }
      else if (node.type==='for') {
        const items=evalExpr(node.iterExpr,scope);
        if(Array.isArray(items)||typeof items==='string'){
          for(const item of items){
            unpack(node.varName,item,scope);
            const s=execBlock(node.body,scope);
            if(s&&s.type==='break')break;
            if(s&&s.type==='continue')continue;
            if(s&&s.type==='return')return s;
          }
        }
      }
      else if (node.type==='while') { let ct=0; while(evalExpr(node.cond,scope)&&ct++<10000){const s=execBlock(node.body,scope);if(s&&s.type==='break')break;if(s&&s.type==='continue')continue;if(s&&s.type==='return')return s;} }
      else if (node.type==='break') return{type:'break'};
      else if (node.type==='continue') return{type:'continue'};
      else if (node.type==='print') parsePrint(node.line,scope);
      else if (node.type==='assign') {
        const{name,op,expr}=node;
        const im=name.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
        if(im){const obj=scope[im[1]]!==undefined?scope[im[1]]:env[im[1]];if(obj!==undefined)obj[evalExpr(im[2],scope)]=evalExpr(expr,scope);}
        else{
          const val=evalExpr(expr,scope);
          const cur=scope[name]!==undefined?scope[name]:env[name];
          if(op==='=')scope[name]=val;
          else if(op==='+=')scope[name]=(typeof cur==='string'||typeof val==='string')?String(cur)+String(val):(cur||0)+val;
          else if(op==='-=')scope[name]=(cur||0)-val;
          else if(op==='*=')scope[name]=(cur||0)*val;
          else if(op==='/=')scope[name]=(cur||0)/val;
        }
      }
      else if(node.type==='expr'){try{evalExpr(node.expr,scope);}catch(e){}}
    }
  }

  try {
    const ast = parsePy(code);
    execBlock(ast, env);
    return output.join('') || '(no output)';
  } catch(e) {
    return 'Error: '+e.message;
  }
}


/* ── Quiz ── */
const QUIZ = [
  { q:'Which statement is used to use a module in Python?', opts:['include module','import module','use module','require module'], ans:1 },
  { q:'What does `from math import pi` do?', opts:['Imports the whole math module','Creates a new module','Imports only pi from math','Raises an error'], ans:2 },
  { q:'What does API stand for?', opts:['Application Programming Interface','Automated Protocol Interaction','Application Process Input','Advanced Program Integration'], ans:0 },
  { q:'Which Python library is used to make HTTP requests?', opts:['json','os','requests','http'], ans:2 },
  { q:'What HTTP method is used to READ data from an API?', opts:['POST','PUT','DELETE','GET'], ans:3 },
  { q:'What does response.json() do?', opts:['Converts response to HTML','Converts JSON string to Python dict','Sends JSON to server','Prints the response'], ans:1 },
  { q:'What is the status code for a successful API response?', opts:['404','500','200','301'], ans:2 },
  { q:'What does `math.sqrt(25)` return?', opts:['5.0','25','625','12.5'], ans:0 },
  { q:'What does `os.getcwd()` return?', opts:['OS name','Current working directory','List of files','CPU info'], ans:1 },
  { q:'Which format do most REST APIs return data in?', opts:['XML','CSV','JSON','HTML'], ans:2 },
  { q:'What is a REST API?', opts:['A Python library','An architectural style for web services using HTTP','A database system','A type of file format'], ans:1 },
  { q:'Which module provides date and time functions?', opts:['time','calendar','datetime','clock'], ans:2 },
];
function Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUIZ.reduce((s,q,i)=>s+(answers[i]===q.ans?1:0),0);
  return (
    <div>
      {QUIZ.map((q,qi)=>(
        <div key={qi} style={{ background:'#f8fafc', borderRadius:10, padding:'1rem 1.2rem', marginBottom:'1rem', border:'1px solid #e2e8f0' }}>
          <p style={{ fontWeight:600, marginBottom:'0.6rem', color:'#1e293b' }}>{qi+1}. {q.q}</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem' }}>
            {q.opts.map((opt,oi)=>{
              let bg='#fff',border='1px solid #cbd5e1',color='#334155';
              if(submitted){if(oi===q.ans){bg='#dcfce7';border='1.5px solid #10b981';color='#064e3b';}else if(answers[qi]===oi&&oi!==q.ans){bg='#fee2e2';border='1.5px solid #ef4444';color='#7f1d1d';}}
              else if(answers[qi]===oi){bg='#e0f2fe';border='1.5px solid #38bdf8';color='#0c4a6e';}
              return <button key={oi} disabled={submitted} onClick={()=>setAnswers({...answers,[qi]:oi})} style={{ background:bg,border,color,borderRadius:8,padding:'0.4rem 0.7rem',textAlign:'left',cursor:submitted?'default':'pointer',fontSize:'0.86rem',display:'flex',alignItems:'center',gap:6 }}>
                {submitted&&oi===q.ans&&<CheckCircle size={14} color="#10b981"/>}
                {submitted&&answers[qi]===oi&&oi!==q.ans&&<XCircle size={14} color="#ef4444"/>}
                {opt}
              </button>;
            })}
          </div>
        </div>
      ))}
      {!submitted?<button className="btn btn-primary" onClick={()=>setSubmitted(true)} disabled={Object.keys(answers).length<QUIZ.length}>Submit Quiz</button>:(
        <div style={{ background:score>=9?'#dcfce7':score>=6?'#fef9c3':'#fee2e2', borderRadius:12, padding:'1.2rem', textAlign:'center', marginTop:'1rem' }}>
          <Trophy size={32} color={score>=9?'#10b981':score>=6?'#f59e0b':'#ef4444'} style={{ margin:'0 auto 0.5rem' }}/>
          <h3 style={{ fontSize:'1.5rem', margin:0 }}>Score: {score}/{QUIZ.length}</h3>
          <p style={{ margin:'0.4rem 0 0', color:'#475569' }}>{score>=9?'🎉 Excellent! API master!':score>=6?'👍 Good job! Review API sections.':'📚 Keep practicing!'}</p>
          <button className="btn btn-outline" style={{ marginTop:'0.8rem' }} onClick={()=>{setAnswers({});setSubmitted(false);}}>Retry Quiz</button>
        </div>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function PythonDay9({ activeTab, onNavigate }) {
  const nav = tab => onNavigate('python_day9', tab);

  const sections = {

    intro: (
      <Section key="intro" eyebrow="Day 9" title="📦 Modules & 🌐 API Connections">
        <p style={{ fontSize:'1.1rem', color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Today you'll master two essential Python skills: <strong>Modules</strong> — reusable Python files that extend your code — and <strong>APIs</strong> — how your Python program talks to the internet and accesses real-world data like weather, GitHub, and more!
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon:<Layers size={28} color="#6366f1"/>, title:'Standard Library', desc:'math, random, os, datetime, json — Python batteries included' },
            { icon:<Code size={28} color="#f472b6"/>, title:'Custom Modules', desc:'Write your own .py module files and import them anywhere' },
            { icon:<Globe size={28} color="#10b981"/>, title:'What is an API?', desc:'Interface that lets programs talk to each other over the web' },
            { icon:<Wifi size={28} color="#f59e0b"/>, title:'HTTP Methods', desc:'GET, POST, PUT, DELETE — the verbs of web communication' },
            { icon:<Server size={28} color="#38bdf8"/>, title:'requests Library', desc:'Install and use to make HTTP calls in Python' },
            { icon:<Database size={28} color="#ec4899"/>, title:'JSON Parsing', desc:'Read and extract data from API responses into Python dicts' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'1.2rem', border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:8 }}>
              {item.icon}
              <strong style={{ color:'#1e293b' }}>{item.title}</strong>
              <p style={{ margin:0, color:'#64748b', fontSize:'0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background:'linear-gradient(135deg,#667eea15,#764ba215)', borderRadius:14, padding:'1.5rem', border:'1px solid #667eea40' }}>
          <h3 style={{ margin:'0 0 1rem', color:'#312e81' }}>📋 Day 9 Curriculum</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem' }}>
            {['import and from...import syntax','Standard Library: math, random, os, datetime, json','Creating custom module files','What is an API? (With restaurant analogy)','HTTP methods: GET, POST, PUT, DELETE, PATCH','Status codes: 200, 201, 404, 500...','Step-by-step API connection guide','Using the requests library in Python','Parsing JSON API responses','Practice: Weather, GitHub & User APIs','Assignment (10 Tasks) + Quiz (12 Questions)'].map((t,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', color:'#475569', padding:'0.3rem 0' }}>
                <CheckCircle size={15} color="#10b981"/> {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:'right', marginTop:'1.5rem' }}>
          <button className="btn btn-primary" onClick={()=>nav('modules_basics')}>Next: Module Basics <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    modules_basics: (
      <Section key="modules_basics" eyebrow="Concept 1" title="📦 Python Modules — import & from...import">
        <div className="panel" style={{ marginBottom:'1.5rem' }}>
          <h3 style={{ color:'#6366f1', marginBottom:'0.8rem' }}>🤔 What is a Module?</h3>
          <p style={{ color:'#475569', lineHeight:1.8 }}>
            A <strong>module</strong> is simply a Python file (<code>.py</code>) containing functions, classes, and variables you can reuse in other programs. Python ships with hundreds of built-in modules in its <em>Standard Library</em>.
          </p>
          <div style={{ background:'#f1f5f9', borderRadius:10, padding:'1rem 1.2rem', marginTop:'1rem', borderLeft:'4px solid #6366f1' }}>
            <strong>💡 Think of it like this:</strong> A module is like a <em>toolbox</em>. Instead of building every tool from scratch, you open the toolbox and pick what you need!
          </div>
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'1rem' }}>📥 Import Syntax — 4 Ways</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.5rem' }}>
          {[
            { title:'import module', code:'import math\nprint(math.sqrt(25))   # 5.0\nprint(math.pi)          # 3.14159', desc:'Import whole module. Access with dot notation.' },
            { title:'from module import name', code:'from math import sqrt, pi\nprint(sqrt(25))    # 5.0\nprint(pi)          # 3.14159', desc:'Import specific items. No dot needed!' },
            { title:'import module as alias', code:'import datetime as dt\nnow = dt.datetime.now()\nprint(now)', desc:'Give module a short nickname (alias).' },
            { title:'from module import *', code:'from math import *\nprint(sqrt(16))    # 4.0\nprint(floor(3.7))  # 3', desc:'Import everything (use carefully!).' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, overflow:'hidden' }}>
              <div style={{ background:'#1e293b', padding:'0.4rem 0.9rem' }}><span style={{ color:'#38bdf8', fontWeight:700, fontSize:'0.85rem' }}>{item.title}</span></div>
              <div style={{ background:'#0f172a', padding:'0.8rem', fontFamily:'monospace', fontSize:'0.82rem', color:'#f8fafc', lineHeight:1.8, whiteSpace:'pre' }}>{item.code}</div>
              <div style={{ padding:'0.6rem 0.9rem' }}><p style={{ margin:0, color:'#64748b', fontSize:'0.83rem' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>

        <Playground id="mod_import_play" title="🧪 Try Module Imports"
          defaultCode={`import math

# Math constants
print("Pi:", math.pi)
print("e:", math.e)

# Math functions
print("sqrt(144):", math.sqrt(144))
print("factorial(7):", math.factorial(7))
print("gcd(48, 18):", math.gcd(48, 18))
print("ceil(4.2):", math.ceil(4.2))
print("floor(4.9):", math.floor(4.9))

# from...import style
from math import pow, log
print("2^10:", pow(2, 10))
print("log(100):", round(log(100), 4))`}
        />
        <button className="btn btn-primary" onClick={()=>nav('stdlib')} style={{ float:'right', marginTop:'1rem' }}>Next: Standard Library <ArrowRight size={16}/></button>
      </Section>
    ),

    stdlib: (
      <Section key="stdlib" eyebrow="Concept 2" title="🏛️ Python Standard Library">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>Python's <strong>standard library</strong> is pre-installed — just import and use, no installation needed!</p>

        <h3 style={{ color:'#6366f1', marginBottom:'0.8rem', borderBottom:'2px solid #6366f115', paddingBottom:'0.5rem' }}>🔢 math — Mathematical Functions</h3>
        <CodeBlock title="math_demo.py">
          {kw('import')} math<br/><br/>
          {cm('# Constants')}<br/>
          {fn('print')}(math.pi)         {c('# 3.14159...')}<br/>
          {fn('print')}(math.e)          {c('# 2.71828...')}<br/><br/>
          {cm('# Functions')}<br/>
          {fn('print')}(math.{fn('sqrt')}({nm('144')}))  {c('# 12.0')}<br/>
          {fn('print')}(math.{fn('factorial')}({nm('5')})){c('# 120')}<br/>
          {fn('print')}(math.{fn('gcd')}({nm('48')},{nm('18')}))  {c('# 6')}<br/>
          {fn('print')}(math.{fn('floor')}({nm('4.9')})) {c('# 4')}<br/>
          {fn('print')}(math.{fn('ceil')}({nm('4.1')}))  {c('# 5')}<br/>
          {fn('print')}(math.{fn('pow')}({nm('2')},{nm('10')}))   {c('# 1024.0')}<br/>
        </CodeBlock>

        <h3 style={{ color:'#f472b6', marginBottom:'0.8rem', marginTop:'1.5rem', borderBottom:'2px solid #f472b615', paddingBottom:'0.5rem' }}>🎲 random — Random Number Generation</h3>
        <CodeBlock title="random_demo.py">
          {kw('import')} random<br/><br/>
          {fn('print')}(random.{fn('random')}())           {c('# 0.0 to 1.0')}<br/>
          {fn('print')}(random.{fn('randint')}({nm('1')},{nm('100')})) {c('# e.g., 42')}<br/><br/>
          colors = [{st('"red"')},{st('"blue"')},{st('"green"')}]<br/>
          {fn('print')}(random.{fn('choice')}(colors))     {c('# e.g., "blue"')}<br/><br/>
          nums = [{nm('1')},{nm('2')},{nm('3')},{nm('4')},{nm('5')}]<br/>
          random.{fn('shuffle')}(nums)<br/>
          {fn('print')}(nums)                     {c('# shuffled')}<br/>
        </CodeBlock>

        <h3 style={{ color:'#10b981', marginBottom:'0.8rem', marginTop:'1.5rem', borderBottom:'2px solid #10b98115', paddingBottom:'0.5rem' }}>🖥️ os — Operating System Interface</h3>
        <CodeBlock title="os_demo.py">
          {kw('import')} os<br/><br/>
          {fn('print')}(os.{fn('getcwd')}())        {c('# current directory')}<br/>
          {fn('print')}(os.{fn('listdir')}({st('"."')}))   {c('# ["main.py", ...]')}<br/>
          path = os.path.{fn('join')}({st('"home"')},{st('"user"')},{st('"file.txt"')})<br/>
          {fn('print')}(path)               {c('# home/user/file.txt')}<br/>
          {fn('print')}(os.{fn('cpu_count')}())     {c('# 8')}<br/>
        </CodeBlock>

        <h3 style={{ color:'#f59e0b', marginBottom:'0.8rem', marginTop:'1.5rem', borderBottom:'2px solid #f59e0b15', paddingBottom:'0.5rem' }}>📅 datetime — Dates and Times</h3>
        <CodeBlock title="datetime_demo.py">
          {kw('from')} datetime {kw('import')} datetime<br/><br/>
          now = datetime.{fn('now')}()<br/>
          {fn('print')}(now)    {c('# 2025-07-25 17:00:00')}<br/>
          today = datetime.{fn('today')}()<br/>
          {fn('print')}(today)  {c('# 2025-07-25 ...')}<br/>
        </CodeBlock>

        <h3 style={{ color:'#38bdf8', marginBottom:'0.8rem', marginTop:'1.5rem', borderBottom:'2px solid #38bdf815', paddingBottom:'0.5rem' }}>📄 json — JSON Encoding & Decoding</h3>
        <CodeBlock title="json_demo.py">
          {kw('import')} json<br/><br/>
          student = {'{'}{st('"name"')}: {st('"Priya"')}, {st('"age"')}: {nm('21')}{'}'}<br/>
          json_str = json.{fn('dumps')}(student)<br/>
          {fn('print')}(json_str) {c('# {"name": "Priya", "age": 21}')}<br/><br/>
          data = json.{fn('loads')}(json_str)<br/>
          {fn('print')}(data[{st('"name"')}])  {c('# Priya')}<br/>
        </CodeBlock>

        <Playground id="stdlib_play" title="🧪 Try All Standard Library Modules"
          defaultCode={`import math
import random
import os
import json

print("=== MATH ===")
print("sqrt(81):", math.sqrt(81))
print("factorial(5):", math.factorial(5))

print("\n=== RANDOM ===")
print("Random 1-6:", random.randint(1, 6))
fruits = ["apple", "banana", "mango", "cherry"]
print("Random fruit:", random.choice(fruits))

print("\n=== OS ===")
print("Current dir:", os.getcwd())
print("Files:", os.listdir("."))

print("\n=== JSON ===")
data = {"course": "Python", "day": 9, "topic": "Modules & APIs"}
json_str = json.dumps(data)
print("JSON:", json_str)
back = json.loads(json_str)
print("Topic:", back["topic"])`}
        />
        <button className="btn btn-primary" onClick={()=>nav('custom_modules')} style={{ float:'right', marginTop:'1rem' }}>Next: Custom Modules <ArrowRight size={16}/></button>
      </Section>
    ),

    custom_modules: (
      <Section key="custom_modules" eyebrow="Concept 3" title="🛠️ Creating Custom Modules">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Create your own module — save functions in a <code>.py</code> file and import it in another file!
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'1.5rem' }}>
          <div>
            <div style={{ background:'#1e293b', padding:'0.4rem 0.9rem', borderRadius:'10px 10px 0 0' }}><span style={{ color:'#38bdf8', fontWeight:700, fontSize:'0.85rem' }}>📄 calculator.py (Module)</span></div>
            <div style={{ background:'#0f172a', color:'#f8fafc', padding:'1rem', fontFamily:'monospace', fontSize:'0.85rem', lineHeight:1.8, borderRadius:'0 0 10px 10px', border:'1px solid #334155' }}>
              {cm('# calculator.py')}<br/>
              {kw('def')} {fn('add')}(a, b):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} a + b<br/><br/>
              {kw('def')} {fn('subtract')}(a, b):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} a - b<br/><br/>
              {kw('def')} {fn('multiply')}(a, b):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} a * b<br/><br/>
              {kw('def')} {fn('divide')}(a, b):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} b == {nm('0')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"Cannot divide by 0"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} a / b<br/><br/>
              AUTHOR = {st('"Python Student"')}<br/>
            </div>
          </div>
          <div>
            <div style={{ background:'#1e293b', padding:'0.4rem 0.9rem', borderRadius:'10px 10px 0 0' }}><span style={{ color:'#a5b4fc', fontWeight:700, fontSize:'0.85rem' }}>📄 main.py (Using Module)</span></div>
            <div style={{ background:'#0f172a', color:'#f8fafc', padding:'1rem', fontFamily:'monospace', fontSize:'0.85rem', lineHeight:1.8, borderRadius:'0 0 10px 10px', border:'1px solid #334155' }}>
              {kw('import')} calculator<br/><br/>
              result = calculator.{fn('add')}({nm('10')}, {nm('5')})<br/>
              {fn('print')}(result)      {c('# 15')}<br/><br/>
              result = calculator.{fn('divide')}({nm('20')}, {nm('4')})<br/>
              {fn('print')}(result)      {c('# 5.0')}<br/><br/>
              {fn('print')}(calculator.AUTHOR)<br/>
              {c('# Python Student')}<br/><br/>
              {cm('# OR with from...import')}<br/>
              {kw('from')} calculator {kw('import')} multiply<br/>
              {fn('print')}({fn('multiply')}({nm('6')}, {nm('7')})) {c('# 42')}<br/>
            </div>
          </div>
        </div>

        <div style={{ background:'#fff7ed', borderLeft:'4px solid #f59e0b', borderRadius:8, padding:'1rem 1.2rem', marginBottom:'1.5rem' }}>
          <strong>💡 __name__ == "__main__"</strong>
          <p style={{ margin:'0.5rem 0 0', color:'#475569', lineHeight:1.7 }}>
            When Python runs a file directly, <code>__name__</code> is <code>"__main__"</code>. When imported, <code>__name__</code> is the module name. Use this to prevent test code from running on import:
          </p>
          <CodeBlock title="">
            {kw('def')} {fn('greet')}(name):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {fn('f')}{st('"Hello, {name}!"')}<br/><br/>
            {kw('if')} __name__ == {st('"__main__"')}:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{cm('# Only runs when greet.py is run directly')}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({fn('greet')}({st('"World"')}))<br/>
          </CodeBlock>
        </div>

        <Playground id="custom_mod_play" title="🧪 Simulate Custom Module"
          defaultCode={`# Simulating a custom "calculator" module
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        return "Cannot divide by zero!"
    return a / b

AUTHOR = "Python Day 9 Student"
print("Calculator Module by:", AUTHOR)
print("-" * 30)
print("add(15, 8) =", add(15, 8))
print("subtract(20, 7) =", subtract(20, 7))
print("multiply(6, 9) =", multiply(6, 9))
print("divide(100, 4) =", divide(100, 4))
print("divide(10, 0) =", divide(10, 0))`}
        />
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-primary" onClick={()=>nav('db_connection')}>Next: Database (SQL) Connection <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    db_connection: (
      <Section key="db_connection" eyebrow="Concept 3.5" title="🗄️ Database (SQL) Connections via sqlite3">
        <div className="panel" style={{ marginBottom:'1.5rem' }}>
          <h3 style={{ color:'#10b981', marginBottom:'0.8rem' }}>📦 sqlite3 Standard Library Module</h3>
          <p style={{ color:'#475569', lineHeight:1.8 }}>
            Python includes a built-in module called <code>sqlite3</code> which allows you to create and connect to relational SQL databases without installing any external servers. 
          </p>
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'1.0rem' }}>🛠️ Core Database Workflow Steps</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #cbd5e1' }}>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>1. Establish Connection</strong>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}><code>conn = sqlite3.connect("app.db")</code>. Creates DB file automatically if missing.</span>
          </div>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #cbd5e1' }}>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>2. Create Cursor</strong>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}><code>cursor = conn.cursor()</code>. Cursors execute SQL queries and fetch results.</span>
          </div>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #cbd5e1' }}>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>3. Commit & Close</strong>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}><code>conn.commit()</code> saves all changes permanently, and <code>conn.close()</code> releases resources.</span>
          </div>
        </div>

        <CodeBlock title="sqlite_connection.py">
          {kw('import')} sqlite3<br/><br/>
          {cm('# Connect and create Cursor')}<br/>
          conn = sqlite3.{fn('connect')}({st('"school.db"')})<br/>
          cursor = conn.{fn('cursor')}()<br/><br/>
          {cm('# Execute tables schema definition')}<br/>
          cursor.{fn('execute')}({st('"""CREATE TABLE IF NOT EXISTS students (id INT, name TEXT, grade TEXT)"""')})<br/><br/>
          {cm('# Insert rows')}<br/>
          cursor.{fn('execute')}({st('"INSERT INTO students VALUES (1, \'Priya\', \'A\')"')})<br/>
          conn.{fn('commit')}()  {c('# Save changes')}<br/><br/>
          {cm('# Query table records')}<br/>
          cursor.{fn('execute')}({st('"SELECT * FROM students"')})<br/>
          rows = cursor.{fn('fetchall')}()<br/>
          {fn('print')}(rows)  {c('# [(1, "Priya", "A")]')}<br/><br/>
          conn.{fn('close')}()
        </CodeBlock>

        <Playground id="db_connection_play" title="🧪 Try SQLite Simulation Transactions"
          defaultCode={`import sqlite3

# Simulate establishing DB connection
print("Establishing connection to database: local_store.db")
db = {}

# Simulate query executions
def execute_query(sql_statement):
    print("SQL Execute:", sql_statement)
    if "CREATE TABLE" in sql_statement:
        return "Table created successfully."
    elif "INSERT" in sql_statement:
        db["user_101"] = ("Arjun", "Active")
        return "1 record inserted."
    elif "SELECT" in sql_statement:
        return f"Fetch rows: {list(db.values())}"
    return "Query executed."

print(execute_query("CREATE TABLE customers (id INT, name TEXT, status TEXT)"))
print(execute_query("INSERT INTO customers VALUES (101, 'Arjun', 'Active')"))
print(execute_query("SELECT * FROM customers"))`}
        />
        
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between execute() and commit() in sqlite3 connection in Python?")}>Ask AI Tutor: sqlite3 Help</button>
          <button className="btn btn-primary" onClick={()=>nav('what_is_api')}>Next: What is an API? <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    what_is_api: (
      <Section key="what_is_api" eyebrow="Concept 4" title="🌐 What is an API?">
        <div style={{ background:'linear-gradient(135deg,#667eea20,#764ba215)', borderRadius:14, padding:'1.5rem', border:'1px solid #667eea30', marginBottom:'2rem' }}>
          <h3 style={{ color:'#312e81', marginBottom:'0.8rem', fontSize:'1.4rem' }}>📖 Definition</h3>
          <p style={{ color:'#475569', lineHeight:1.9, fontSize:'1.05rem', margin:0 }}>
            <strong>API = Application Programming Interface</strong><br/><br/>
            An API is a <strong>set of rules</strong> that allows one software application to communicate with another. It acts as a <em>messenger</em> that takes your request, tells the server what you want, and brings back the response.
          </p>
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'1rem' }}>🍽️ The Restaurant Analogy</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.8rem', marginBottom:'2rem' }}>
          {[
            { icon:'👤', label:'You (Client)', desc:'Your Python code making the request', color:'#6366f1' },
            { icon:'📋', label:'Menu (API Docs)', desc:'Lists all available endpoints you can call', color:'#f472b6' },
            { icon:'🧑‍🍳', label:'Waiter (API)', desc:'Receives request, brings back response', color:'#10b981' },
            { icon:'🍳', label:'Kitchen (Server)', desc:'Processes request and prepares the data', color:'#f59e0b' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'1.2rem', textAlign:'center', border:`2px solid ${item.color}30` }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{item.icon}</div>
              <strong style={{ color:item.color, fontSize:'0.9rem' }}>{item.label}</strong>
              <p style={{ margin:'0.4rem 0 0', color:'#64748b', fontSize:'0.8rem', lineHeight:1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'1rem' }}>🔄 How an API Works</h3>
        <div style={{ background:'#0f172a', borderRadius:12, padding:'1.5rem', marginBottom:'2rem', color:'#f8fafc', fontFamily:'monospace', lineHeight:2 }}>
          {[
            { n:'1', color:'#6366f1', text:'Your Python code sends a REQUEST to the API endpoint (URL)' },
            { n:'2', color:'#10b981', text:'The API SERVER receives and validates the request' },
            { n:'3', color:'#f59e0b', text:'Server fetches data from its DATABASE or another service' },
            { n:'4', color:'#ec4899', text:'Server sends back a RESPONSE — usually in JSON format' },
          ].map((step,i)=>(
            <div key={i}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.5rem' }}>
                <span style={{ background:step.color, color:'#fff', borderRadius:6, padding:'0.2rem 0.6rem', fontWeight:700 }}>{step.n}</span>
                <span style={{ fontSize:'0.9rem' }}>{step.text}</span>
              </div>
              {i<3&&<div style={{ textAlign:'center', color:'#475569', marginBottom:'0.5rem' }}>↓</div>}
            </div>
          ))}
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'1rem' }}>🌍 Real-World API Examples</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon:'🌤️', name:'Weather API (OpenWeather)', desc:'Ask "Weather in Chennai?" → Get temperature, humidity, conditions' },
            { icon:'🗺️', name:'Google Maps API', desc:'Ask "Route from A to B?" → Get directions, distance, time' },
            { icon:'💳', name:'Razorpay Payment API', desc:'Ask "Process ₹500 payment" → Get success/failure confirmation' },
            { icon:'🐙', name:'GitHub API', desc:'Ask "Show torvalds\' repos" → Get repository list with details' },
            { icon:'📱', name:'WhatsApp Business API', desc:'Ask "Send message to +91-xxx" → Get delivery confirmation' },
            { icon:'🎬', name:'YouTube/TMDB API', desc:'Ask "Top trending movies" → Get titles, ratings, posters' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', borderRadius:10, padding:'1rem', border:'1px solid #e2e8f0', display:'flex', gap:'0.8rem', alignItems:'flex-start' }}>
              <span style={{ fontSize:'1.8rem' }}>{item.icon}</span>
              <div><strong style={{ color:'#1e293b', display:'block', marginBottom:4 }}>{item.name}</strong><span style={{ color:'#64748b', fontSize:'0.85rem', lineHeight:1.5 }}>{item.desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background:'#eff6ff', borderLeft:'4px solid #3b82f6', borderRadius:8, padding:'1.2rem', marginBottom:'1.5rem' }}>
          <h4 style={{ color:'#1d4ed8', margin:'0 0 0.5rem' }}>🔷 What is a REST API?</h4>
          <p style={{ margin:0, color:'#475569', lineHeight:1.8 }}>
            <strong>REST</strong> (Representational State Transfer) is the most popular style of API on the web today. It uses standard HTTP methods (GET, POST, etc.) and URLs. Almost all modern APIs — GitHub, Twitter, Zomato, OLA — are REST APIs. Data is returned in <strong>JSON</strong> format.
          </p>
        </div>
        <button className="btn btn-primary" onClick={()=>nav('http_methods')} style={{ float:'right' }}>Next: HTTP Methods <ArrowRight size={16}/></button>
      </Section>
    ),

    http_methods: (
      <Section key="http_methods" eyebrow="Concept 5" title="📡 HTTP Methods — Verbs of the Web">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>HTTP <strong>methods</strong> tell the server <em>what action</em> you want to perform:</p>
        <div style={{ display:'grid', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { method:'GET', icon:'📥', color:'#10b981', desc:'READ / Fetch data from the server. Most common method.', example:'GET /api/users        → List all users\nGET /api/users/1      → Get user with ID 1\nGET /api/weather?city=Chennai' },
            { method:'POST', icon:'📤', color:'#6366f1', desc:'CREATE / Send new data to create a resource.', example:'POST /api/users       → Create new user\nPOST /api/orders      → Place a new order\nPOST /api/login       → Login with credentials' },
            { method:'PUT', icon:'✏️', color:'#f59e0b', desc:'UPDATE / Replace an existing resource completely.', example:'PUT /api/users/1      → Update all fields of user 1' },
            { method:'PATCH', icon:'🩹', color:'#38bdf8', desc:'PARTIAL UPDATE / Modify specific fields only.', example:'PATCH /api/users/1    → Update only email of user 1' },
            { method:'DELETE', icon:'🗑️', color:'#ef4444', desc:'DELETE / Remove a resource from the server.', example:'DELETE /api/users/1   → Delete user with ID 1' },
          ].map((item,i)=>(
            <div key={i} style={{ display:'grid', gridTemplateColumns:'110px 1fr auto', gap:'1rem', background:'#f8fafc', borderRadius:12, padding:'1rem 1.2rem', border:`1px solid ${item.color}30`, alignItems:'start' }}>
              <div style={{ background:item.color, color:'#fff', borderRadius:8, padding:'0.3rem 0.7rem', fontWeight:800, fontSize:'0.92rem', textAlign:'center' }}>{item.icon} {item.method}</div>
              <p style={{ margin:0, color:'#475569', lineHeight:1.6, fontSize:'0.9rem', alignSelf:'center' }}>{item.desc}</p>
              <div style={{ background:'#0f172a', color:'#a5b4fc', padding:'0.6rem 0.9rem', borderRadius:8, fontFamily:'monospace', fontSize:'0.78rem', lineHeight:1.7, whiteSpace:'pre', minWidth:260 }}>{item.example}</div>
            </div>
          ))}
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'1rem' }}>📊 Common HTTP Status Codes</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'0.7rem', marginBottom:'1.5rem' }}>
          {[
            { code:'200 OK', desc:'Request successful', color:'#10b981' },
            { code:'201 Created', desc:'Resource created', color:'#6366f1' },
            { code:'400 Bad Request', desc:'Invalid request data', color:'#f59e0b' },
            { code:'401 Unauthorized', desc:'Authentication needed', color:'#f97316' },
            { code:'403 Forbidden', desc:'No permission', color:'#ef4444' },
            { code:'404 Not Found', desc:'Resource missing', color:'#ef4444' },
            { code:'429 Too Many Req.', desc:'Rate limit exceeded', color:'#f59e0b' },
            { code:'500 Server Error', desc:'Server-side problem', color:'#dc2626' },
          ].map((item,i)=>(
            <div key={i} style={{ background:`${item.color}10`, border:`1px solid ${item.color}40`, borderRadius:8, padding:'0.8rem' }}>
              <code style={{ color:item.color, fontWeight:700, fontSize:'0.92rem' }}>{item.code}</code>
              <p style={{ margin:'0.3rem 0 0', color:'#475569', fontSize:'0.82rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={()=>nav('api_steps')} style={{ float:'right' }}>Next: Step-by-Step API Connection <ArrowRight size={16}/></button>
      </Section>
    ),

    api_steps: (
      <Section key="api_steps" eyebrow="Concept 6" title="🪜 Step-by-Step: Connecting to an API">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'2rem' }}>Here is the <strong>complete step-by-step process</strong> to connect to a REST API using Python:</p>

        <StepCard step="1" icon={<Terminal size={18} color="#6366f1"/>} color="#6366f1" title="Install the requests library" desc="The requests library is not built into Python. Install it once using pip in your terminal." />
        <CodeBlock title="Terminal / Command Prompt">
          pip install requests<br/>
          {cm('# Only needed once on your machine')}
        </CodeBlock>

        <StepCard step="2" icon={<Code size={18} color="#f472b6"/>} color="#f472b6" title="Import requests in your Python file" desc="At the top of your .py file, import the requests module." />
        <CodeBlock title="api_demo.py">
          {kw('import')} requests
        </CodeBlock>

        <StepCard step="3" icon={<Link size={18} color="#10b981"/>} color="#10b981" title="Define the API endpoint (URL)" desc="An endpoint is the specific URL that returns the data you want. Every API has different endpoints." />
        <CodeBlock title="api_demo.py">
          {kw('import')} requests<br/><br/>
          {cm('# The API URL (endpoint)')}<br/>
          url = {st('"https://jsonplaceholder.typicode.com/posts/1"')}<br/>
          {cm('# This is a FREE test API — perfect for learning!')}
        </CodeBlock>

        <StepCard step="4" icon={<Wifi size={18} color="#f59e0b"/>} color="#f59e0b" title="Send the HTTP GET Request" desc="Use requests.get() to fetch data. This is like clicking a link in your browser, but from code!" />
        <CodeBlock title="api_demo.py">
          {kw('import')} requests<br/><br/>
          url = {st('"https://jsonplaceholder.typicode.com/posts/1"')}<br/>
          response = requests.{fn('get')}(url)   {c('# Send the request')}
        </CodeBlock>

        <StepCard step="5" icon={<CheckCircle size={18} color="#38bdf8"/>} color="#38bdf8" title="Check if the request was successful" desc="Always verify the response. Status 200 = success. response.ok returns True if code is 200-299." />
        <CodeBlock title="api_demo.py">
          {kw('import')} requests<br/>
          url = {st('"https://jsonplaceholder.typicode.com/posts/1"')}<br/>
          response = requests.{fn('get')}(url)<br/><br/>
          {fn('print')}(response.status_code)  {c('# 200')}<br/>
          {fn('print')}(response.ok)           {c('# True')}<br/><br/>
          {kw('if')} response.ok:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"✅ Success!"')})<br/>
          {kw('else')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"❌ Failed:"')}, response.status_code)<br/>
        </CodeBlock>

        <StepCard step="6" icon={<Database size={18} color="#a855f7"/>} color="#a855f7" title="Parse the JSON response" desc="API responses come as JSON text. Use response.json() to convert it into a Python dictionary!" />
        <CodeBlock title="api_demo.py">
          {kw('import')} requests<br/>
          url = {st('"https://jsonplaceholder.typicode.com/posts/1"')}<br/>
          response = requests.{fn('get')}(url)<br/><br/>
          {kw('if')} response.ok:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;data = response.{fn('json')}()    {c('# → Python dict')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Title:"')}, data[{st('"title"')}])<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"User ID:"')}, data[{st('"userId"')}])<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Post ID:"')}, data[{st('"id"')}])<br/>
        </CodeBlock>

        <StepCard step="7" icon={<Layers size={18} color="#ec4899"/>} color="#ec4899" title="Handle Errors Gracefully" desc="Network calls can fail — no internet, timeout, invalid URL. Use try-except to handle them safely." />
        <CodeBlock title="api_demo.py — Complete & Safe Version">
          {kw('import')} requests<br/><br/>
          url = {st('"https://jsonplaceholder.typicode.com/posts/1"')}<br/><br/>
          {kw('try')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;response = requests.{fn('get')}(url, timeout={nm('10')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;response.raise_for_status()   {c('# Raises error for 4xx/5xx')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;data = response.{fn('json')}()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"✅ Title:"')}, data[{st('"title"')}])<br/><br/>
          {kw('except')} requests.exceptions.ConnectionError:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"❌ No internet connection"')})<br/>
          {kw('except')} requests.exceptions.Timeout:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"⏱️ Request timed out"')})<br/>
          {kw('except')} requests.exceptions.HTTPError {kw('as')} e:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"❌ HTTP Error:"')}, e)<br/>
        </CodeBlock>

        <Playground id="api_steps_play" title="🧪 Try the Full API Connection"
          defaultCode={`import requests

# Step 1: Define the URL
url = "https://jsonplaceholder.typicode.com/posts/1"

# Step 2: Send GET request
response = requests.get(url)

# Step 3: Check status
print("Status Code:", response.status_code)
print("Request OK?", response.ok)

# Step 4: Parse JSON
if response.ok:
    data = response.json()
    print("\n=== POST DATA ===")
    print("Post ID:", data["id"])
    print("User ID:", data["userId"])
    print("Title:", data["title"])
    print("Body:", data["body"][:60] + "...")`}
        />
        <button className="btn btn-primary" onClick={()=>nav('api_practice')} style={{ float:'right', marginTop:'1rem' }}>Next: Practice API Calls <ArrowRight size={16}/></button>
      </Section>
    ),

    api_practice: (
      <Section key="api_practice" eyebrow="Concept 7" title="🛠️ Practice: Real-World API Calls">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>Try simulated API calls below — they work exactly like real Python requests, using mock data!</p>

        <h3 style={{ color:'#6366f1', marginBottom:'1rem' }}>👤 API 1 — Fetch User Profile</h3>
        <Playground id="api_user_play" title="JSONPlaceholder User API"
          defaultCode={`import requests

url = "https://jsonplaceholder.typicode.com/users/1"
response = requests.get(url)

if response.ok:
    user = response.json()
    print("=== USER PROFILE ===")
    print("Name:", user["name"])
    print("Username:", user["username"])
    print("Email:", user["email"])
    print("Company:", user["company"]["name"])
else:
    print("Error:", response.status_code)`}
        />

        <h3 style={{ color:'#10b981', marginBottom:'1rem', marginTop:'1.5rem' }}>🌤️ API 2 — Weather Data</h3>
        <Playground id="api_weather_play" title="Weather API (Simulated)"
          defaultCode={`import requests

# Real API: api.openweathermap.org/data/2.5/weather?q=Chennai&appid=YOUR_KEY
url = "https://api.openweathermap.org/data/2.5/weather"
response = requests.get(url)

if response.ok:
    weather = response.json()
    print("=== WEATHER REPORT ===")
    print("City:", weather["city"])
    print("Temperature:", weather["temperature"], "deg C")
    print("Condition:", weather["condition"])
    print("Humidity:", weather["humidity"], "%")
    
    if weather["temperature"] > 30:
        print("Warning: Hot day! Stay hydrated.")
    else:
        print("Pleasant weather!")`}
        />

        <h3 style={{ color:'#f472b6', marginBottom:'1rem', marginTop:'1.5rem' }}>🐙 API 3 — GitHub Profile</h3>
        <Playground id="api_github_play" title="GitHub API"
          defaultCode={`import requests

url = "https://api.github.com/users/torvalds"
response = requests.get(url)

if response.ok:
    user = response.json()
    print("=== GITHUB PROFILE ===")
    print("Username:", user["login"])
    print("Full Name:", user["name"])
    print("Repositories:", user["public_repos"])
    print("Followers:", user["followers"])
    print("Bio:", user["bio"])
    print("\nData fetched from GitHub API!")`}
        />

        <h3 style={{ color:'#f59e0b', marginBottom:'1rem', marginTop:'1.5rem' }}>📤 POST Request — Create New Data</h3>
        <Playground id="api_post_play" title="POST Request to API"
          defaultCode={`import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

# Data to send
new_post = {
    "title": "Learning Python APIs is Amazing!",
    "body": "Today I learned to connect to real APIs using requests.",
    "userId": 1
}

# Send POST request
response = requests.post(url, new_post)

print("Status:", response.status_code)  # 201 = Created
if response.ok:
    result = response.json()
    print("\n=== CREATED POST ===")
    print("ID:", result["id"])
    print("Title:", result["title"])
    print("Post created successfully!")`}
        />
        <button className="btn btn-primary" onClick={()=>nav('assignment_work')} style={{ float:'right', marginTop:'1rem' }}>Next: Assignment <ArrowRight size={16}/></button>
      </Section>
    ),

    assignment_work: (
      <Section key="assignment_work" eyebrow="Practice" title="📝 Assignment — 10 Tasks">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Complete these tasks to master Modules and APIs:</p>
        <div style={{ display:'grid', gap:'0.8rem' }}>
          {[
            { n:1, title:'Math Module Explorer', desc:'Calculate: area of circle (πr²), hypotenuse √(a²+b²), and factorial of 10 using the math module.', color:'#6366f1' },
            { n:2, title:'Random Number Statistics', desc:'Generate 10 random numbers (1-100) using random module. Find the max, min, sum, and average.', color:'#f472b6' },
            { n:3, title:'OS Path Builder', desc:'Use os.path.join() to build paths for 3 files in a "project/src/" folder. Print each path.', color:'#10b981' },
            { n:4, title:'Date Calculator', desc:'Use datetime to print today\'s date and check if a given date (e.g. your birthday) has passed.', color:'#f59e0b' },
            { n:5, title:'JSON Encoder/Decoder', desc:'Create a student dict, convert it to JSON string, save it, then load it back and print all fields.', color:'#38bdf8' },
            { n:6, title:'Custom Temperature Module', desc:'Create a "temp_converter.py" module with: celsius_to_fahrenheit(), fahrenheit_to_celsius(), kelvin_to_celsius(). Test it.', color:'#a855f7' },
            { n:7, title:'API GET — Fetch Posts', desc:'Call JSONPlaceholder API to fetch 5 posts. Print the title and userId of each post in a formatted table.', color:'#ec4899' },
            { n:8, title:'API Error Handling', desc:'Write a function that calls an API and handles: ConnectionError, Timeout, and HTTPError with user-friendly messages.', color:'#ef4444' },
            { n:9, title:'Mini Weather App', desc:'Accept a city name as input, call the weather API, display: temperature, condition, and a weather warning if temp > 35°C.', color:'#06b6d4' },
            { n:10, title:'GitHub User Lookup Tool', desc:'Ask for a GitHub username, call the GitHub API, and display: name, bio, public repos, and followers.', color:'#8b5cf6' },
          ].map(task=>(
            <div key={task.n} style={{ background:'#f8fafc', borderRadius:10, padding:'1rem 1.2rem', border:`2px solid ${task.color}25`, display:'flex', gap:'1rem', alignItems:'flex-start' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:`${task.color}20`, border:`2px solid ${task.color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:800, color:task.color }}>{task.n}</div>
              <div><strong style={{ color:'#1e293b', display:'block', marginBottom:4 }}>{task.title}</strong><span style={{ color:'#64748b', fontSize:'0.9rem' }}>{task.desc}</span></div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'2rem', background:'#f0fdf4', borderRadius:12, padding:'1.2rem', border:'1px solid #10b981' }}>
          <strong style={{ color:'#065f46' }}>💡 Pro Tips for Real APIs:</strong>
          <ul style={{ margin:'0.5rem 0 0', color:'#475569', lineHeight:1.8, paddingLeft:'1.2rem' }}>
            <li>Always read the API documentation before coding</li>
            <li>Get an API key if required (usually free for basic use)</li>
            <li>Respect rate limits — don't spam requests</li>
            <li>Never hardcode API keys in your code — use environment variables!</li>
            <li>Always add timeout to requests: <code>requests.get(url, timeout=10)</code></li>
          </ul>
        </div>
        <button className="btn btn-primary" onClick={()=>nav('quiz')} style={{ float:'right', marginTop:'1.5rem' }}>Next: Quiz <ArrowRight size={16}/></button>
      </Section>
    ),

    quiz: (
      <Section key="quiz" eyebrow="Assessment" title="🧠 Quiz — Modules & APIs (12 Questions)">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Test your understanding of Python Modules and API connections:</p>
        <Quiz/>
      </Section>
    ),
  };

  return (
    <AnimatePresence mode="wait">
      {sections[activeTab] || sections['intro']}
    </AnimatePresence>
  );
}
