import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Terminal, Trophy, CheckCircle, XCircle, Sliders, Cpu, Filter, Zap, Bot } from 'lucide-react';

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

/* ── Simple OOP Python Interpreter ── */
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
        if (t.startsWith('class ')) {
          const m = t.match(/^class\s+(\w+)\s*:/);
          if (m) { i++; const bd = block(bi+4); b.push({ type:'class', name:m[1], body:bd }); continue; }
        }
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
        if (t.startsWith('del ')) { b.push({ type:'del', target:t.slice(4).trim() }); i++; continue; }
        if (t.startsWith('print(')){ b.push({type:'print',line:t});i++;continue; }
        const am=t.match(/^([a-zA-Z_]\w*(?:\.\w+)?(?:\[.+?\])?(?:\s*,\s*[a-zA-Z_]\w*(?:\.\w+)?(?:\[.+?\])?)*)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
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

function runCode(code, inputs=[]) {
  const env = {};
  const output = [];
  let inputIdx = 0;
  let total = 0;
  const getInput = () => { const v = inputs[inputIdx] !== undefined ? String(inputs[inputIdx]) : ''; inputIdx++; return v; };

  const evalExpr = (expr, scope=env) => {
    expr = expr.trim();
    if (/^"([^"\\]|\\.)*"$/.test(expr)||/^'([^'\\]|\\.)*'$/.test(expr)) return expr.slice(1,-1);
    if (expr==='True') return true;
    if (expr==='False') return false;
    if (expr==='None') return null;
    if (/^input\(.*\)$/.test(expr)) return getInput();

    // f-string
    if (/^f["']/.test(expr)) {
      const inner = expr.slice(2,-1);
      return inner.replace(/\{([^}]+)\}/g, (_,k)=>{ try{ return String(evalExpr(k.trim(),scope)); }catch(e){return ''+e.message;} });
    }

    // Constructor call or normal function call
    const callM = expr.match(/^([a-zA-Z_]\w*)\((.*)\)$/);
    if (callM) {
      const name = callM[1];
      const argsStr = callM[2];
      const args = argsStr ? splitCommas(argsStr).map(x => evalExpr(x.trim(), scope)) : [];
      if (env[name] && env[name].type === 'class') {
        const instance = {
          __class__: name,
          books: [],
          file: { close: () => output.push("File closed.\n") },
          attributes: {}
        };
        if (env[name].methods['__init__']) {
          const initFn = env[name].methods['__init__'];
          const localEnv = {};
          localEnv[initFn.params[0]] = instance;
          for (let idx = 1; idx < initFn.params.length; idx++) {
            localEnv[initFn.params[idx]] = args[idx - 1];
          }
          execBlock(initFn.body, localEnv);
        }
        return instance;
      }
    }

    // Method call
    const mm = expr.match(/^([a-zA-Z_]\w*(?:\.\w+)*)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (mm) {
      const [,vn,method,argStr] = mm;
      const args = argStr ? splitCommas(argStr).map(x=>evalExpr(x.trim(),scope)) : [];
      const obj = evalExpr(vn, scope);
      if (obj!==undefined&&obj!==null) {
        if (obj.__class__) {
          const className = obj.__class__;
          const cls = env[className];
          if (cls && cls.methods[method]) {
            const methodFn = cls.methods[method];
            const localEnv = {};
            localEnv[methodFn.params[0]] = obj;
            for (let idx = 1; idx < methodFn.params.length; idx++) {
              localEnv[methodFn.params[idx]] = args[idx - 1];
            }
            const status = execBlock(methodFn.body, localEnv);
            return status && status.type === 'return' ? status.value : null;
          }
        }
        if (Array.isArray(obj)) {
          if(method==='append'){obj.push(args[0]);return null;}
          if(method==='remove'){const idx=obj.indexOf(args[0]); if(idx!==-1) obj.splice(idx,1); return null;}
          if(method==='pop') return args.length>0?obj.splice(args[0],1)[0]:obj.pop();
        }
        if (typeof obj === 'string') {
          if (method === 'lower') return obj.toLowerCase();
          if (method === 'upper') return obj.toUpperCase();
        }
        if (typeof obj[method] === 'function') return obj[method](...args);
      }
    }

    // Attribute lookups
    const dotM = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)$/);
    if (dotM) {
      const obj = scope[dotM[1]] !== undefined ? scope[dotM[1]] : env[dotM[1]];
      if (obj !== undefined && obj !== null) {
        if (obj.__class__) {
          if (obj[dotM[2]] !== undefined) return obj[dotM[2]];
          return obj.attributes[dotM[2]];
        }
        return obj[dotM[2]];
      }
    }

    // Index lookup
    const idxM = expr.match(/^([a-zA-Z_]\w*(?:\.\w+)?)\[(.+)\]$/);
    if (idxM) {
      const obj = evalExpr(idxM[1], scope);
      const key = evalExpr(idxM[2], scope);
      if (obj !== undefined && obj !== null) return obj[key];
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) {
      if (scope[expr]!==undefined) return scope[expr];
      if (env[expr]!==undefined) return env[expr];
      throw new Error(`NameError: name '${expr}' is not defined`);
    }

    try {
      const keys = [...new Set(Object.keys(scope).concat(Object.keys(env)))].sort((a,b)=>b.length-a.length);
      let safe = expr.replace(/==/g,'===').replace(/!=/g,'!==');
      const runner = new Function('scope','env','evalExpr',`
        const len = x => x ? x.length : 0;
        const enumerate = (arr, start=0) => arr.map((x,i)=>[i+start, x]);
        ${keys.map(k=>`const ${k}=scope['${k}']!==undefined?scope['${k}']:env['${k}'];`).join('\n')}
        return (${safe});
      `);
      return runner(scope,env,evalExpr);
    } catch(e) { throw new Error(`SyntaxError: ${expr}`); }
  };

  const parsePrint = (line, scope) => {
    const m = line.match(/^print\((.*)\)$/s);
    if (!m) return;
    const args = splitCommas(m[1]);
    const parts = args.map(a => {
      a = a.trim();
      try {
        const v = evalExpr(a, scope);
        if (Array.isArray(v)) {
          if (Array.isArray(v[0])) {
            return v.map(item => `${item[0]}. ${item[1]}`).join('\n');
          }
          return '['+v.map(x=>typeof x==='string'?`'${x}'`:String(x)).join(', ')+']';
        }
        return v === true ? 'True' : v === false ? 'False' : v === null ? 'None' : String(v);
      } catch(e) { return `[Error:${e.message}]`; }
    });
    output.push(parts.join(' ')+'\n');
  };

  function execBlock(nodes, scope=env) {
    for (const node of nodes) {
      total++; if(total>8000) throw new Error('TimeLimitExceeded');
      if (node.type === 'class') {
        const cls = { type: 'class', name: node.name, methods: {} };
        env[node.name] = cls;
        node.body.forEach(child => {
          if (child.type === 'def') {
            cls.methods[child.name] = child;
          }
        });
      }
      else if (node.type==='def') { env[node.name]={type:'function',params:node.params,body:node.body}; }
      else if (node.type==='return') { return{type:'return',value:evalExpr(node.expr,scope)}; }
      else if (node.type === 'del') {
        const name = node.target;
        const obj = scope[name] !== undefined ? scope[name] : env[name];
        if (obj && obj.__class__) {
          const className = obj.__class__;
          const cls = env[className];
          if (cls && cls.methods['__del__']) {
            const delFn = cls.methods['__del__'];
            const localEnv = {};
            localEnv[delFn.params[0]] = obj;
            execBlock(delFn.body, localEnv);
          }
        }
        delete scope[name];
        delete env[name];
      }
      else if (node.type==='if') {
        let ran=false;
        if(evalExpr(node.cond,scope)){const s=execBlock(node.body,{...scope});if(s)return s;ran=true;}
        if(!ran)for(const e of node.elifs){if(evalExpr(e.cond,scope)){const s=execBlock(e.body,{...scope});if(s)return s;ran=true;break;}}
        if(!ran&&node.else_body){const s=execBlock(node.else_body,{...scope});if(s)return s;}
      }
      else if (node.type==='for') {
        const items=evalExpr(node.iterExpr,scope);
        if(Array.isArray(items)){
          for(const item of items) {
            const vars = node.varName.split(',').map(x=>x.trim());
            if (vars.length > 1 && Array.isArray(item)) {
              vars.forEach((v, idx) => { scope[v] = item[idx]; });
            } else {
              scope[node.varName] = item;
            }
            const s=execBlock(node.body,scope);
            if(s&&s.type==='break')break;
            if(s&&s.type==='continue')continue;
            if(s)return s;
          }
        }
      }
      else if (node.type==='while') { let ct=0; while(evalExpr(node.cond,scope)&&ct++<10000){const s=execBlock(node.body,scope);if(s&&s.type==='break')break;if(s&&s.type==='continue')continue;if(s)return s;} }
      else if (node.type==='break') return{type:'break'};
      else if (node.type==='continue') return{type:'continue'};
      else if (node.type==='print') parsePrint(node.line,scope);
      else if (node.type==='assign') {
        const{name,op,expr}=node;
        const dotM = name.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)$/);
        const idxM = name.match(/^([a-zA-Z_]\w*(?:\.\w+)?)?\[(.+)\]$/);
        if (dotM) {
          const obj = scope[dotM[1]] !== undefined ? scope[dotM[1]] : env[dotM[1]];
          const val = evalExpr(expr, scope);
          if (obj && obj.__class__) {
            if (obj[dotM[2]] !== undefined) {
              obj[dotM[2]] = val;
            } else {
              obj.attributes[dotM[2]] = val;
            }
          }
        } else if (idxM) {
          const obj = evalExpr(idxM[1], scope);
          const key = evalExpr(idxM[2], scope);
          if (obj) obj[key] = evalExpr(expr, scope);
        } else {
          const val=evalExpr(expr,scope);
          if(op==='=')scope[name]=val;
        }
      }
      else if(node.type==='expr'){try{evalExpr(node.expr,scope);}catch(e){}}
    }
    return null;
  }

  try {
    const ast = parsePy(code);
    execBlock(ast, env);
    return output.join('') || '(no output)';
  } catch(e) { return 'Error: '+e.message; }
}

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
      
      // Indentation Error check
      let indentationError = false;
      for (let i = 0; i < lines.length; i++) {
        if ((lines[i].startsWith(' ') && lines[i].length % 4 !== 0 && !lines[i].trim().startsWith('#')) ||
            (lines[i].includes('def ') && lines[i+1] && !lines[i+1].startsWith('    ') && !lines[i+1].trim().startsWith('#') && lines[i+1].trim() !== '')) {
          indentationError = true;
        }
      }
      
      // Colon Error check
      let colonError = false;
      if (/def\s+\w+\s*\([^)]*\)\s*$/m.test(code) || /class\s+\w+\s*$/m.test(code) || /if\s+.*$/m.test(code) || /for\s+.*$/m.test(code) || /while\s+.*$/m.test(code)) {
        colonError = true;
      }
      
      if (indentationError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Indentation Issue Detected**\n\nPython relies heavily on indentation (typically 4 spaces) to define code blocks. Make sure your lines inside functions or classes are indented by exactly 4 spaces.\n\n**Suggested Fix:**\nEnsure def/class bodies are indented.";
      } else if (colonError) {
        feedback = "⚠️ **AI Co-Pilot Alert: Missing Colon (:)**\n\nIn Python, statements that define a block (like `def`, `class`, `if`, `for`, `while`) MUST end with a colon `:`.\n\n**Suggested Fix:**\nAdd `:` at the end of block definition lines.";
      } else {
        feedback = `🤖 **AI Co-Pilot Code Review:**\n\nYour code looks syntactically clean! Here is a breakdown of what it accomplishes:\n`;
        if (code.includes('class') || code.includes('self')) {
          feedback += `- **OOP Paradigm**: You have defined a blueprint class to bundle state and behavior.\n- **Constructor & self**: You are correctly using instance properties and constructor methods.\n`;
        }
        if (code.includes('print')) {
          feedback += `- **Output Delivery**: Using \`print()\` to log output to the console.\n`;
        }
        if (code.includes('def ')) {
          feedback += `- **Modular Architecture**: You defined a custom method to encapsulate logic.\n`;
        }
        feedback += `\n**Optimization Tip:** Add docstrings to document your classes and methods for better team readability!`;
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
      <textarea value={code} onChange={e=>setCode(e.target.value)} style={{ width:'100%', minHeight:220, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
      
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

/* ── Quiz ── */
const QUIZ = [
  { q:'What is a Class in Python?', opts:['A function that executes code','A blueprint or template for creating objects','A type of list','An imported library'], ans:1 },
  { q:'What is an Object?', opts:['An instance of a class','A built-in keyword','A type of loop','A comment line'], ans:0 },
  { q:'What is the purpose of `self` in Python classes?', opts:['To import standard modules','To reference the current class instance','To delete an object from memory','To return a value from a class'], ans:2 },
  { q:'Which method is the special constructor in Python?', opts:['__del__','__init__','__main__','__new__'], ans:1 },
  { q:'What is the name of the Destructor method in Python?', opts:['__del__','__destroy__','__init__','__close__'], ans:0 },
  { q:'When is a Destructor (__del__) called?', opts:['When the class is created','When the object is instantiated','When the object is about to be garbage collected or deleted','Only at program exit'], ans:2 },
  { q:'How do you call the destructor explicitly in Python code?', opts:['object.close()','del object','destroy object','object.__del__()'], ans:1 },
  { q:'If you define `class Person:`, how do you create an instance of it?', opts:['p = new Person()','p = Person()','p = Person.create()','Person p;'], ans:1 },
  { q:'Can instance methods access variables outside the class without parameters?', opts:['Yes, always','No, they can only access attributes via self or passed parameters','Only constructors can','Only destructors can'], ans:1 },
  { q:'In the constructor `def __init__(self, name):`, what parameter is passed automatically?', opts:['name','None','self (representing the instance)','Both'], ans:2 },
  { q:'Which OOP concept binds data and methods together as a single unit?', opts:['Inheritance','Polymorphism','Encapsulation','Abstraction'], ans:2 },
  { q:'Where should class methods be defined?', opts:['Outside the class','Indented inside the class block','At the start of the script','Inside global functions'], ans:1 },
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
          <p style={{ margin:'0.4rem 0 0', color:'#475569' }}>{score>=9?'🎉 Excellent! You are an OOP master!':score>=6?'👍 Good job! Review the concepts.':'📚 Keep practicing!'}</p>
          <button className="btn btn-outline" style={{ marginTop:'0.8rem' }} onClick={()=>{setAnswers({});setSubmitted(false);}}>Retry Quiz</button>
        </div>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function PythonDay10({ activeTab, onNavigate, openAITutor }) {
  const nav = tab => onNavigate('python_day10', tab);

  const sections = {
    intro: (
      <Section key="intro" eyebrow="Day 10" title="🏫 Introduction to OOPs (Object-Oriented Programming)">
        <p style={{ fontSize:'1.1rem', color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Welcome to Day 10! Today we step into one of the most powerful paradigms of modern software: <strong>Object-Oriented Programming (OOP)</strong>. You will learn to represent real-world concepts in your Python code using Classes and Objects.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon:<BookOpen size={28} color="#6366f1"/>, title:'Why OOP?', desc:'Bind data and functions together into a single unit, keeping data safe from outside code.' },
            { icon:<Cpu size={28} color="#f472b6"/>, title:'Classes', desc:'Blueprints or templates containing fields (data) and methods (behavior).' },
            { icon:<Zap size={28} color="#10b981"/>, title:'Objects', desc:'Real-world instances created using class blueprints, with distinct properties.' },
            { icon:<Terminal size={28} color="#38bdf8"/>, title:'self Convention', desc:'Refer to instance variables and access current object attributes easily.' },
            { icon:<Sliders size={28} color="#f59e0b"/>, title:'Constructors', desc:'The __init__ method that automatically initializes variables upon instantiation.' },
            { icon:<Filter size={28} color="#ec4899"/>, title:'Destructors', desc:'The __del__ method that closes files, releases resources, and cleans up memory.' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'1.2rem', border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:8 }}>
              {item.icon}
              <strong style={{ color:'#1e293b' }}>{item.title}</strong>
              <p style={{ margin:0, color:'#64748b', fontSize:'0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background:'linear-gradient(135deg,#667eea15,#764ba215)', borderRadius:14, padding:'1.5rem', border:'1px solid #667eea40' }}>
          <h3 style={{ margin:'0 0 1rem', color:'#312e81' }}>📋 Day 10 Syllabus Outline</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem' }}>
            {['Introduction to OOP paradigm','Understanding Classes vs Objects','Using Python self keyword','Using the __init__ constructor','Using the __del__ destructor','Attributes vs Instance Methods','Chained methods and object references','Capstone: Library Management System','Assignment (10 Tasks)','Quiz (12 Questions)'].map((t,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', color:'#475569', padding:'0.3rem 0' }}>
                <CheckCircle size={15} color="#10b981"/> {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("What is Object-Oriented Programming (OOP) in Python and why is it useful?")}>Ask AI Tutor: Intro to OOP</button>
          <button className="btn btn-primary" onClick={()=>nav('class_objects')}>Next: Classes & Objects <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    class_objects: (
      <Section key="class_objects" eyebrow="Concept 1" title="🏫 Classes and Objects">
        <div className="panel" style={{ marginBottom:'1.5rem' }}>
          <h3 style={{ color:'#6366f1', marginBottom:'0.8rem' }}>🤔 Blueprint vs House</h3>
          <p style={{ color:'#475569', lineHeight:1.8 }}>
            A <strong>Class</strong> is like an architect's blueprint. It contains the layout plans, dimensions, and descriptions but is not an actual building. An <strong>Object</strong> is the actual house built from that blueprint. You can build as many houses (objects) as you want from a single blueprint (class)!
          </p>
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'1.0rem' }}>🛠️ Class Definition Syntax</h3>
        <CodeBlock title="class_syntax.py">
          {kw('class')} {fn('Car')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{cm('# Class blueprint')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;brand = {st('"Toyota"')}<br/><br/>
          {cm('# Create object instances of Car')}<br/>
          car1 = {fn('Car')}()<br/>
          car2 = {fn('Car')}()<br/><br/>
          {fn('print')}(car1.brand)  {c('# Toyota')}<br/>
          {fn('print')}(car2.brand)  {c('# Toyota')}
        </CodeBlock>

        <Playground id="class_obj_play" title="🧪 Try Class & Object Instantiation"
          defaultCode={`class Dog:
    breed = "Golden Retriever"
    sound = "Woof!"

    def bark(self):
        print("The dog says:", self.sound)

# Instantiate dog objects
dog1 = Dog()
print("Breed of dog1:", dog1.breed)
dog1.bark()`}
        />
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between a class and an object in Python?")}>Ask AI Tutor: Class vs Object</button>
          <button className="btn btn-primary" onClick={()=>nav('self_init')}>Next: self & __init__ <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    self_init: (
      <Section key="self_init" eyebrow="Concept 2" title="🧭 Understanding self and __init__">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'1.5rem' }}>
          <div style={{ background:'#f8fafc', padding:'1.2rem', borderRadius:12, border:'1px solid #cbd5e1' }}>
            <h4 style={{ color:'#2563eb', margin:'0 0 0.6rem' }}>🧭 self</h4>
            <p style={{ margin:0, color:'#475569', fontSize:'0.9rem', lineHeight:1.7 }}>
              <code>self</code> represents the <strong>current instance</strong> of the class. It is passed as the first parameter to every instance method so Python knows which object's attributes and methods are being referenced.
            </p>
          </div>
          <div style={{ background:'#f8fafc', padding:'1.2rem', borderRadius:12, border:'1px solid #cbd5e1' }}>
            <h4 style={{ color:'#db2777', margin:'0 0 0.6rem' }}>🛠️ __init__ (Constructor)</h4>
            <p style={{ margin:0, color:'#475569', fontSize:'0.9rem', lineHeight:1.7 }}>
              <code>__init__</code> is a special method automatically called when a new object is created. It initializes the object's instance variables (state) upon creation.
            </p>
          </div>
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'0.8rem' }}>📦 Constructor Code Example</h3>
        <CodeBlock title="constructor_demo.py">
          {kw('class')} {fn('Person')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, name, age):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name  {c('# Instance variable')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.age = age    {c('# Instance variable')}<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('greet')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"Hello, my name is {self.name} and I am {self.age} years old."')})<br/><br/>
          {cm('# Objects are instantiated with arguments passed to __init__')}<br/>
          person1 = {fn('Person')}({st('"Alice"')}, {nm('25')})<br/>
          person2 = {fn('Person')}({st('"Bob"')}, {nm('30')})<br/><br/>
          person1.{fn('greet')}()  {c('# Hello, my name is Alice and I am 25 years old.')}<br/>
          person2.{fn('greet')}()  {c('# Hello, my name is Bob and I am 30 years old.')}
        </CodeBlock>

        <Playground id="self_init_play" title="🧪 Try self and Constructors"
          defaultCode={`class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def check_result(self):
        if self.marks >= 50:
            return "Passed"
        else:
            return "Failed"

student1 = Student("Priya", 85)
student2 = Student("Rahul", 42)

print(student1.name, "result:", student1.check_result())
print(student2.name, "result:", student2.check_result())`}
        />
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("What does the self keyword do and why is it required in Python methods?")}>Ask AI Tutor: Explain self & __init__</button>
          <button className="btn btn-primary" onClick={()=>nav('constructor_destructor')}>Next: Constructor & Destructor <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    constructor_destructor: (
      <Section key="constructor_destructor" eyebrow="Concept 3" title="⚙️ Constructor vs Destructor">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          While a <strong>Constructor</strong> initializes a class instance, a <strong>Destructor</strong> performs cleanup tasks before the object's memory is released or garbage collected.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'1.5rem' }}>
          <div>
            <h4 style={{ color:'#10b981', marginBottom:'0.6rem' }}>🟢 Constructor (__init__)</h4>
            <ul style={{ color:'#475569', paddingLeft:'1.2rem', lineHeight:1.7, fontSize:'0.9rem' }}>
              <li>Declared as <code>def __init__(self, ...)</code></li>
              <li>Triggered automatically during object instantiation</li>
              <li>Allocates memory and sets up initial attributes</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color:'#ef4444', marginBottom:'0.6rem' }}>🔴 Destructor (__del__)</h4>
            <ul style={{ color:'#475569', paddingLeft:'1.2rem', lineHeight:1.7, fontSize:'0.9rem' }}>
              <li>Declared as <code>def __del__(self)</code></li>
              <li>Triggered when an object is about to be garbage collected</li>
              <li>Closes files, closes database connections, clears resources</li>
            </ul>
          </div>
        </div>

        <h3 style={{ color:'#0f172a', marginBottom:'0.8rem' }}>🔧 Resource Manager Example</h3>
        <CodeBlock title="resource_manager.py">
          {kw('class')} {fn('MyClass')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, filename):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.file = {fn('open')}(filename, {st('"w"')})<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__del__')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.file.{fn('close')}()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"File closed."')})<br/><br/>
          obj = {fn('MyClass')}({st('"myfile.txt"')})<br/>
          {cm('# Trigger the destructor explicitly by deleting object')}<br/>
          {kw('del')} obj   {c('# Prints: File closed.')}
        </CodeBlock>

        <Playground id="constructor_destructor_play" title="🧪 Try Constructors and Destructors"
          defaultCode={`class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        print("Connected to database:", self.db_name)

    def query(self, sql):
        print("Executing:", sql, "on", self.db_name)

    def __del__(self):
        print("Closed connection to database:", self.db_name)

db = DatabaseConnection("sales_db")
db.query("SELECT * FROM users")
# Deleting object will trigger the destructor
del db`}
        />
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("When does __del__ run in Python, and how is it used for resource management?")}>Ask AI Tutor: Constructor vs Destructor</button>
          <button className="btn btn-primary" onClick={()=>nav('capstone')}>Next: Capstone Project <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    capstone: (
      <Section key="capstone" eyebrow="Capstone" title="📚 Library Management System Capstone">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This capstone project implements an interactive <strong>Library Management System</strong> utilizing a `Library` class, initialization constructors, display methods, list modification attributes, and cleanup destructors.
        </p>

        <CodeBlock title="library_system.py">
          {kw('class')} {fn('Library')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.books = []<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Library system initialized."')})<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('display_books')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {fn('len')}(self.books) == {nm('0')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"The library is empty. No books available."')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Books currently in the library:"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} index, book {kw('in')} {fn('enumerate')}(self.books, {nm('1')}):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(index, book)<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('add_book')}(self, book_name):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.books.{fn('append')}(book_name)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Added book:"')}, book_name)<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('remove_book')}(self, book_name):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.books.{fn('remove')}(book_name)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Removed book:"')}, book_name)<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__del__')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Library system is closing. All data has been cleared."')})
        </CodeBlock>

        <Playground id="capstone_play" title="🧪 Interact with the Library Management System"
          defaultCode={`class Library:
    def __init__(self):
        self.books = []
        print("Library system initialized.")

    def display_books(self):
        if len(self.books) == 0:
            print("The library is empty. No books available.")
        else:
            print("Books currently in the library:")
            for index, book in enumerate(self.books, 1):
                print(index, book)

    def add_book(self, book_name):
        self.books.append(book_name)
        print("Added book:", book_name)

    def remove_book(self, book_name):
        self.books.remove(book_name)
        print("Removed book:", book_name)

    def __del__(self):
        print("Library system is closing. All data has been cleared.")

# Run system
library = Library()
library.display_books()
library.add_book("Data Structures")
library.display_books()
library.remove_book("Data Structures")
del library`}
        />
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("Explain the Library Management System capstone code line by line and show me how to extend it.")}>Ask AI Tutor: Explain Capstone</button>
          <button className="btn btn-primary" onClick={()=>nav('assignment_work')}>Next: Assignment <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    assignment_work: (
      <Section key="assignment_work" eyebrow="Practice" title="📝 Assignment — 10 Tasks">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Complete these tasks to master Classes, Objects, Constructors, and Destructors:</p>
        <div style={{ display:'grid', gap:'0.8rem' }}>
          {[
            { n:1, title:'Create a simple Class', desc:'Create a class Employee with variable: company_name = "Tech Corp". Instantiate three objects and print the company name for each.', color:'#6366f1' },
            { n:2, title:'Book Details Constructor', desc:'Create a class Book with constructor __init__(self, title, author, price). Instantiate two books and print their details.', color:'#f472b6' },
            { n:3, title:'Employee Salary Calculator', desc:'Create a class Employee with attributes name, base_salary, bonus. Add method calculate_total_salary() that returns base + bonus.', color:'#10b981' },
            { n:4, title:'Circle Area Calculator', desc:'Create a Circle class with radius attribute. Add area() method that calculates area using PI (3.14159).', color:'#f59e0b' },
            { n:5, title:'Calculator Object', desc:'Create a Calculator class with methods add(a, b), subtract(a, b), multiply(a, b), divide(a, b). Test all methods.', color:'#38bdf8' },
            { n:6, title:'Log File Destructor', desc:'Create a LogManager class. Constructor should open log.txt, and destructor (__del__) should close the file safely.', color:'#a855f7' },
            { n:7, title:'Bank Account Deposit System', desc:'Create a BankAccount class with holder_name, balance (default 0). Add deposit(amount) and withdraw(amount) methods.', color:'#ec4899' },
            { n:8, title:'Car Speed Checker', desc:'Create a Car class with model and speed (starts at 0). Add accelerate(increase) and brake(decrease) methods. Print final speed.', color:'#ef4444' },
            { n:9, title:'Shopping Cart Class', desc:'Create a ShoppingCart class with items (empty list). Add methods: add_item(name), remove_item(name), display_items().', color:'#06b6d4' },
            { n:10, title:'Student Grade Evaluator', desc:'Create a Student class with name and marks. Destructor should print "[name] records have been removed from database."', color:'#8b5cf6' },
          ].map(task=>(
            <div key={task.n} style={{ background:'#f8fafc', borderRadius:10, padding:'1rem 1.2rem', border:`2px solid ${task.color}25`, display:'flex', gap:'1rem', alignItems:'flex-start' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:`${task.color}20`, border:`2px solid ${task.color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:800, color:task.color }}>{task.n}</div>
              <div><strong style={{ color:'#1e293b', display:'block', marginBottom:4 }}>{task.title}</strong><span style={{ color:'#64748b', fontSize:'0.9rem' }}>{task.desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:'2rem', background:'#f0fdf4', borderRadius:12, padding:'1.2rem', border:'1px solid #10b981' }}>
          <strong style={{ color:'#065f46' }}>💡 OOP Rules to Remember:</strong>
          <ul style={{ margin:'0.5rem 0 0', color:'#475569', lineHeight:1.8, paddingLeft:'1.2rem' }}>
            <li>Classes are named using PascalCase (e.g. <code>BankAccount</code>, NOT <code>bank_account</code>).</li>
            <li>Method declarations MUST always have <code>self</code> as their first parameter.</li>
            <li>Instance variables are declared inside methods by prefixing them with <code>self.</code> (e.g. <code>self.balance = 0</code>).</li>
          </ul>
        </div>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("How can I write an Employee or BankAccount class in Python OOP? Give me a code structure.")}>Ask AI Tutor: Assignment Helper</button>
          <button className="btn btn-primary" onClick={()=>nav('quiz')}>Next: Quiz <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    quiz: (
      <Section key="quiz" eyebrow="Assessment" title="🧠 Quiz — Intro to OOPs (12 Questions)">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Test your understanding of Classes, Objects, Constructors, and Destructors:</p>
        <Quiz/>
        <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
          <button className="btn btn-outline" onClick={() => openAITutor("Can you quiz me on Python Object-Oriented Programming (OOP) concepts?")}>Ask AI Tutor: Quiz Me on OOP</button>
        </div>
      </Section>
    ),
  };

  return (
    <AnimatePresence mode="wait">
      {sections[activeTab] || sections['intro']}
    </AnimatePresence>
  );
}
