import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Terminal, Trophy, CheckCircle, XCircle, Sliders, Cpu, Filter, Zap, Link } from 'lucide-react';

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

/* ── Simple OOP Python Interpreter with Inheritance ── */
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
          const m = t.match(/^class\s+(\w+)(?:\(([^)]+)\))?\s*:/);
          if (m) {
            const parents = m[2] ? m[2].split(',').map(x=>x.trim()) : [];
            i++; const bd = block(bi+4);
            b.push({ type:'class', name:m[1], parents, body:bd });
            continue;
          }
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

  const lookupMethod = (className, methodName) => {
    const cls = env[className];
    if (!cls) return null;
    if (cls.methods[methodName]) return cls.methods[methodName];
    for (const parent of cls.parents) {
      const found = lookupMethod(parent, methodName);
      if (found) return found;
    }
    return null;
  };

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

    // super() call
    const superCallM = expr.match(/^super\(\)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (superCallM) {
      const methodName = superCallM[1];
      const argsStr = superCallM[2];
      const args = argsStr ? splitCommas(argsStr).map(x => evalExpr(x.trim(), scope)) : [];
      const selfObj = scope['self'];
      if (selfObj && selfObj.__class__) {
        const currentClassName = selfObj.__class__;
        const currentClass = env[currentClassName];
        if (currentClass && currentClass.parents.length > 0) {
          for (const parent of currentClass.parents) {
            const methodFn = lookupMethod(parent, methodName);
            if (methodFn) {
              const localEnv = {};
              localEnv[methodFn.params[0]] = selfObj;
              for (let idx = 1; idx < methodFn.params.length; idx++) {
                localEnv[methodFn.params[idx]] = args[idx - 1];
              }
              localEnv['self'] = selfObj;
              const status = execBlock(methodFn.body, localEnv);
              return status && status.type === 'return' ? status.value : null;
            }
          }
        }
      }
      throw new Error(`AttributeError: super object has no attribute '${methodName}'`);
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
          media_collection: [],
          attributes: {}
        };
        const initFn = lookupMethod(name, '__init__');
        if (initFn) {
          const localEnv = {};
          localEnv[initFn.params[0]] = instance;
          for (let idx = 1; idx < initFn.params.length; idx++) {
            localEnv[initFn.params[idx]] = args[idx - 1];
          }
          localEnv['self'] = instance;
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
          const methodFn = lookupMethod(className, method);
          if (methodFn) {
            const localEnv = {};
            localEnv[methodFn.params[0]] = obj;
            for (let idx = 1; idx < methodFn.params.length; idx++) {
              localEnv[methodFn.params[idx]] = args[idx - 1];
            }
            localEnv['self'] = obj;
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
          if (obj.attributes[dotM[2]] !== undefined) return obj.attributes[dotM[2]];
          const lookupClassAttr = (clsName) => {
            const cls = env[clsName];
            if (!cls) return undefined;
            if (cls.attributes && cls.attributes[dotM[2]] !== undefined) return cls.attributes[dotM[2]];
            for (const parent of cls.parents) {
              const val = lookupClassAttr(parent);
              if (val !== undefined) return val;
            }
            return undefined;
          };
          return lookupClassAttr(obj.__class__);
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
        const cls = { type: 'class', name: node.name, parents: node.parents, methods: {}, attributes: {} };
        env[node.name] = cls;
        node.body.forEach(child => {
          if (child.type === 'def') {
            cls.methods[child.name] = child;
          } else if (child.type === 'assign') {
            cls.attributes[child.name] = evalExpr(child.expr, scope);
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
          const delFn = lookupMethod(className, '__del__');
          if (delFn) {
            const localEnv = {};
            localEnv[delFn.params[0]] = obj;
            localEnv['self'] = obj;
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
  const run = () => { setRunning(true); setTimeout(()=>{ setOut(runCode(code,vals)); setRunning(false); }, 80); };
  const reset = () => { setCode(defaultCode); setOut(''); setVals(inputs.map(i=>i.default||'')); };
  return (
    <div id={id} style={{ marginTop:'1.5rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
        <span style={{ fontWeight:700, color:'#0f172a' }}>{title}</span>
        <div style={{ display:'flex', gap:'0.5rem' }}>
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
      {out&&<div style={{ background:'#f0fdf4', border:'1.5px solid #10b981', borderRadius:10, padding:'0.9rem', marginTop:'0.6rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#064e3b' }}><strong style={{ color:'#10b981' }}>Output:</strong><br/>{out}</div>}
    </div>
  );
}

/* ── Quiz ── */
const QUIZ = [
  { q:'What is Inheritance in Python?', opts:['A method to clear memory','A mechanism of creating a new class based on an existing class','A type of loop','An imported module'], ans:1 },
  { q:'In inheritance, what is the class that inherits from another called?', opts:['Base class','Parent class','Child or Derived class','Superclass'], ans:2 },
  { q:'In inheritance, what is the class being inherited from called?', opts:['Child class','Parent, Base, or Superclass','Derived class','Subclass'], ans:1 },
  { q:'What is Single Inheritance?', opts:['A child class inheriting from multiple parent classes','A child class inheriting from a single parent class','A parent class inheriting from a child class','None of the above'], ans:1 },
  { q:'What is Multiple Inheritance?', opts:['A parent inheriting from two children','A child class inheriting from more than one parent class','Multiple parent classes inheriting from one child','Inheriting through a chain of classes'], ans:1 },
  { q:'What is Multilevel Inheritance?', opts:['A child class inheriting from a parent class which itself inherits from another class','A child inheriting from two parent classes directly','Multiple children inheriting from one parent class','A class inheriting from itself'], ans:0 },
  { q:'What is Hierarchical Inheritance?', opts:['One parent class with multiple child classes inheriting from it','Multiple parent classes with one child class','A single class with no children','A nested hierarchy of modules'], ans:0 },
  { q:'What is Hybrid Inheritance?', opts:['A combination of two or more types of inheritance','Inheritance from built-in datatypes','Inheritance without constructors','Inheriting from external APIs'], ans:0 },
  { q:'What is the purpose of the super() function?', opts:['To close database connections','To access and call methods of the parent class','To skip compiler checks','To double the memory limit'], ans:1 },
  { q:'What is Method Overriding?', opts:['When child class redefines a parent method with the same name and signature to change behavior','When a class has two methods with different parameter counts','When you call a method from outside the class','When a destructor deletes a method'], ans:0 },
  { q:'In the code `class B(A):`, which class is the parent?', opts:['Class B','Class A','Both','Neither'], ans:1 },
  { q:'If super().__init__(title, author) is called, which constructor is executed?', opts:['The child class constructor','The parent class constructor','The global main function','No constructor is called'], ans:1 },
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
          <p style={{ margin:'0.4rem 0 0', color:'#475569' }}>{score>=9?'🎉 Excellent! You are an inheritance expert!':score>=6?'👍 Good job! Review the concepts.':'📚 Keep practicing!'}</p>
          <button className="btn btn-outline" style={{ marginTop:'0.8rem' }} onClick={()=>{setAnswers({});setSubmitted(false);}}>Retry Quiz</button>
        </div>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function PythonDay11({ activeTab, onNavigate }) {
  const nav = tab => onNavigate('python_day11', tab);

  const sections = {
    intro: (
      <Section key="intro" eyebrow="Day 11" title="🧬 Python Class Inheritance">
        <p style={{ fontSize:'1.1rem', color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Welcome to Day 11! Today we explore <strong>Inheritance</strong>, a fundamental paradigm of Object-Oriented Programming (OOP) that allows a new class (derived/child class) to inherit attributes and methods from an existing class (base/parent class). This enables code reuse, extensibility, and hierarchical structures.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon:<BookOpen size={28} color="#6366f1"/>, title:'Why Inherit?', desc:'Reuse logic from existing classes, reducing duplication and maintaining clean codebases.' },
            { icon:<Sliders size={28} color="#10b981"/>, title:'super() Helper', desc:'Call and invoke parent constructor initializers and methods dynamically.' },
            { icon:<Cpu size={28} color="#f472b6"/>, title:'Method Overriding', desc:'Subclasses can redefine parent methods to customize behavior.' },
            { icon:<Zap size={28} color="#f59e0b"/>, title:'Polymorphism', desc:'Execute method calls on subclass objects, accessing overridden logic automatically.' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'1.2rem', border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:8 }}>
              {item.icon}
              <strong style={{ color:'#1e293b' }}>{item.title}</strong>
              <p style={{ margin:0, color:'#64748b', fontSize:'0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background:'linear-gradient(135deg,#667eea15,#764ba215)', borderRadius:14, padding:'1.5rem', border:'1px solid #667eea40' }}>
          <h3 style={{ margin:'0 0 1rem', color:'#312e81' }}>📋 Day 11 Syllabus Outline</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem' }}>
            {['Introduction to inheritance','Single Inheritance','Multiple Inheritance','Multilevel Inheritance','Hierarchical Inheritance','Hybrid Inheritance','Method Overriding','The super() function','Hierarchical Library Management Capstone','Day 11 Assignment (10 Tasks)','Quiz (12 Questions)'].map((t,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', color:'#475569', padding:'0.3rem 0' }}>
                <CheckCircle size={15} color="#10b981"/> {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:'right', marginTop:'1.5rem' }}>
          <button className="btn btn-primary" onClick={()=>nav('single')}>Next: Single Inheritance <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    single: (
      <Section key="single" eyebrow="Concept 1" title="🟢 Single Inheritance">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          <strong>Single Inheritance</strong> occurs when a single subclass (derived class) inherits attributes and methods from a single parent class (base class).
        </p>

        <CodeBlock title="single_inheritance.py">
          {kw('class')} {fn('Teacher')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, name):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('getName')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} self.name<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('isStudent')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {kw('False')}<br/><br/>
          {cm('# Child class inheriting from Teacher')}<br/>
          {kw('class')} {fn('Student')}(Teacher):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('isStudent')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {kw('True')}
        </CodeBlock>

        <Playground id="single_play" title="🧪 Try Single Inheritance"
          defaultCode={`class Teacher:
    def __init__(self, name):
        self.name = name
    def getName(self):
        return self.name
    def isStudent(self):
        return False

class Student(Teacher):
    def isStudent(self):
        return True

stud1 = Teacher("Lily")
print("Teacher getName:", stud1.getName(), "| isStudent?", stud1.isStudent())

stud2 = Student("Lucky")
print("Student getName:", stud2.getName(), "| isStudent?", stud2.isStudent())`}
        />
        <button className="btn btn-primary" onClick={()=>nav('multiple')} style={{ float:'right', marginTop:'1rem' }}>Next: Multiple Inheritance <ArrowRight size={16}/></button>
      </Section>
    ),

    multiple: (
      <Section key="multiple" eyebrow="Concept 2" title="⛓️ Multiple Inheritance">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          <strong>Multiple Inheritance</strong> occurs when a subclass inherits directly from <strong>more than one parent class</strong>.
        </p>

        <CodeBlock title="multiple_inheritance.py">
          {kw('class')} {fn('Name')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;name = {st('""')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('myfun1')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(self.name)<br/><br/>
          {kw('class')} {fn('Surname')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;surname = {st('""')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('myfun2')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(self.surname)<br/><br/>
          {cm('# Student inherits from both Name and Surname parents')}<br/>
          {kw('class')} {fn('Student')}(Name, Surname):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('parents')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Name :"')}, self.name)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Surname :"')}, self.surname)
        </CodeBlock>

        <Playground id="multiple_play" title="🧪 Try Multiple Inheritance"
          defaultCode={`class Name:
    name = ""
    def myfun1(self):
        print(self.name)

class Surname:
    surname = ""
    def myfun2(self):
        print(self.surname)

class Student(Name, Surname):
    def parents(self):
        print("Name :", self.name)
        print("Surname :", self.surname)

stud = Student()
stud.name = "Lily"
stud.surname = "Jones"
stud.parents()`}
        />
        <button className="btn btn-primary" onClick={()=>nav('multilevel')} style={{ float:'right', marginTop:'1rem' }}>Next: Multilevel Inheritance <ArrowRight size={16}/></button>
      </Section>
    ),

    multilevel: (
      <Section key="multilevel" eyebrow="Concept 3" title="🪜 Multilevel Inheritance">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          <strong>Multilevel Inheritance</strong> is a chain of inheritance where a subclass inherits from a parent class, which itself inherits from another parent class (grandparent).
        </p>

        <CodeBlock title="multilevel_inheritance.py">
          {kw('class')} {fn('Principal')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('principal')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"I\'m Principal"')})<br/><br/>
          {kw('class')} {fn('Teacher')}(Principal):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('teacher')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"I\'m Teacher"')})<br/><br/>
          {kw('class')} {fn('Student')}(Teacher):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('student')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"I\'m student"')})
        </CodeBlock>

        <Playground id="multilevel_play" title="🧪 Try Multilevel Inheritance"
          defaultCode={`class Principal:
    def principal(self):
        print("I'm Principal")

class Teacher(Principal):
    def teacher(self):
        print("I'm Teacher")

class Student(Teacher):
    def student(self):
        print("I'm student")

d = Student()
d.principal()
d.teacher()
d.student()`}
        />
        <button className="btn btn-primary" onClick={()=>nav('hierarchical')} style={{ float:'right', marginTop:'1rem' }}>Next: Hierarchical Inheritance <ArrowRight size={16}/></button>
      </Section>
    ),

    hierarchical: (
      <Section key="hierarchical" eyebrow="Concept 4" title="🌳 Hierarchical Inheritance">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          <strong>Hierarchical Inheritance</strong> occurs when multiple subclasses (derived classes) inherit from a <strong>single parent class</strong>.
        </p>

        <CodeBlock title="hierarchical_inheritance.py">
          {kw('class')} {fn('Animal')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, species):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.species = species<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('speak')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} f{st('"{self.species} makes a sound."')}<br/><br/>
          {kw('class')} {fn('Dog')}(Animal):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, name):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('super')}().{fn('__init__')}({st('"Dog"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('bark')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} f{st('"{self.name} says Woof!"')}<br/><br/>
          {kw('class')} {fn('Cat')}(Animal):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, name):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('super')}().{fn('__init__')}({st('"Cat"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('meow')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} f{st('"{self.name} says Meow!"')}
        </CodeBlock>

        <Playground id="hierarchical_play" title="🧪 Try Hierarchical Inheritance"
          defaultCode={`class Animal:
    def __init__(self, species):
        self.species = species
    def speak(self):
        return f"{self.species} makes a sound."

class Dog(Animal):
    def __init__(self, name):
        super().__init__("Dog")
        self.name = name
    def bark(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def __init__(self, name):
        super().__init__("Cat")
        self.name = name
    def meow(self):
        return f"{self.name} says Meow!"

dog = Dog("Buddy")
cat = Cat("Whiskers")
print(dog.speak())
print(dog.bark())
print(cat.speak())
print(cat.meow())`}
        />
        <button className="btn btn-primary" onClick={()=>nav('hybrid')} style={{ float:'right', marginTop:'1rem' }}>Next: Hybrid Inheritance <ArrowRight size={16}/></button>
      </Section>
    ),

    hybrid: (
      <Section key="hybrid" eyebrow="Concept 5" title="🌀 Hybrid Inheritance">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          <strong>Hybrid Inheritance</strong> is a combination of two or more types of inheritance patterns (e.g. combining multilevel and hierarchical inheritance).
        </p>

        <CodeBlock title="hybrid_inheritance.py">
          {kw('class')} {fn('GrandFather')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('grandFather')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"I\'m Baron, the father of your father"')})<br/><br/>
          {kw('class')} {fn('Father')}(GrandFather):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('father')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"I\'m John, your father"')})<br/><br/>
          {kw('class')} {fn('SonTom')}(Father):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('tom')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Hey! I\'m Tom"')})<br/><br/>
          {kw('class')} {fn('DaughterJenny')}(Father):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('jenny')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Hey! I\'m Jenny"')})
        </CodeBlock>

        <Playground id="hybrid_play" title="🧪 Try Hybrid Inheritance"
          defaultCode={`class GrandFather:
    def grandFather(self):
        print("I'm Baron, the father of your father")

class Father(GrandFather):
    def father(self):
        print("I'm John, your father")

class SonTom(Father):
    def tom(self):
        print("Hey! I'm Tom")

class DaughterJenny(Father):
    def jenny(self):
        print("Hey! I'm Jenny")

tom = SonTom()
jenny = DaughterJenny()

print("Tom calls:")
tom.tom()
tom.father()
tom.grandFather()

print("\\nJenny calls:")
jenny.jenny()
jenny.father()
jenny.grandFather()`}
        />
        <button className="btn btn-primary" onClick={()=>nav('overriding')} style={{ float:'right', marginTop:'1rem' }}>Next: Method Overriding <ArrowRight size={16}/></button>
      </Section>
    ),

    overriding: (
      <Section key="overriding" eyebrow="Concept 6" title="⚙️ Method Overriding and super()">
        <div style={{ background:'#f8fafc', padding:'1.2rem', borderRadius:12, border:'1px solid #cbd5e1', marginBottom:'1.5rem' }}>
          <h3 style={{ color:'#2563eb', margin:'0 0 0.6rem' }}>⚙️ Method Overriding</h3>
          <p style={{ margin:0, color:'#475569', fontSize:'0.9rem', lineHeight:1.7 }}>
            <strong>Method overriding</strong> allows a subclass to provide a specific implementation of a method that is already defined in its superclass. Subclasses can use the <code>super()</code> function to call the original parent method before or after modifying behavior.
          </p>
        </div>

        <CodeBlock title="method_overriding.py">
          {kw('class')} {fn('Parent')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('show')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Parent method"')})<br/><br/>
          {kw('class')} {fn('Child')}(Parent):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('show')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('super')}().{fn('show')}()  {c('# Call parent implementation')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Child specialized method"')})
        </CodeBlock>

        <Playground id="overriding_play" title="🧪 Try Overriding and super()"
          defaultCode={`class ParentClass:
    def greet(self):
        print("Hello from ParentClass!")

class ChildClass(ParentClass):
    def greet(self):
        super().greet() # Call the base class greet
        print("Hello from ChildClass!")

obj = ChildClass()
obj.greet()`}
        />
        <button className="btn btn-primary" onClick={()=>nav('capstone')} style={{ float:'right', marginTop:'1rem' }}>Next: Capstone Project <ArrowRight size={16}/></button>
      </Section>
    ),

    capstone: (
      <Section key="capstone" eyebrow="Capstone" title="📚 Hierarchical Library Management System">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This capstone project implements a hierarchical management system with a base `Media` class, subclasses `Book`, `Magazine`, and `Newspaper` overriding parent methods, and a central `Library` class tracking the collection.
        </p>

        <CodeBlock title="hierarchical_library.py">
          {kw('class')} {fn('Media')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, title, author):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.title = title<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.author = author<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('display_info')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"Title: {self.title}"')})<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"Author: {self.author}"')})<br/><br/>
          {kw('class')} {fn('Book')}(Media):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, title, author, genre):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('super')}().{fn('__init__')}(title, author)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.genre = genre<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('display_info')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('super')}().{fn('display_info')}()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"Genre: {self.genre}"')})
        </CodeBlock>

        <Playground id="library_play" title="🧪 Try the Complete Hierarchical Library System"
          defaultCode={`class Media:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    def display_info(self):
        print("Title:", self.title)
        print("Author:", self.author)

class Book(Media):
    def __init__(self, title, author, genre):
        super().__init__(title, author)
        self.genre = genre
    def display_info(self):
        super().display_info()
        print("Genre:", self.genre)

class Magazine(Media):
    def __init__(self, title, author, issue):
        super().__init__(title, author)
        self.issue = issue
    def display_info(self):
        super().display_info()
        print("Issue:", self.issue)

class Library:
    def __init__(self):
        self.media_collection = []
        print("Library system initialized.")

    def add_media(self, media):
        self.media_collection.append(media)
        print("Added:", media.title)

    def display_all(self):
        if len(self.media_collection) == 0:
            print("The library is empty.")
        else:
            print("Media Collection:")
            for media in self.media_collection:
                media.display_info()
                print("---")

library = Library()
b = Book("Python OOP", "John Doe", "Tech")
m = Magazine("Tech Today", "Jane Smith", "45")

library.add_media(b)
library.add_media(m)
library.display_all()`}
        />
        <button className="btn btn-primary" onClick={()=>nav('assignment_work')} style={{ float:'right', marginTop:'1rem' }}>Next: Assignment <ArrowRight size={16}/></button>
      </Section>
    ),

    assignment_work: (
      <Section key="assignment_work" eyebrow="Practice" title="📝 Assignment — 10 Tasks">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Complete these tasks to master Inheritance, Method Overriding, and super() calls:</p>
        <div style={{ display:'grid', gap:'0.8rem' }}>
          {[
            { n:1, title:'Device Single Inheritance', desc:'Create a Device parent class with brand, and a SmartPhone subclass inheriting from it with model.', color:'#6366f1' },
            { n:2, title:'Vehicle speed override', desc:'Create a Vehicle class with max_speed. Subclass RaceCar overrides max_speed and displays a custom message.', color:'#f472b6' },
            { n:3, title:'Multiple Inheritance: PersonDetails', desc:'Create Name class and Address class. Student class inherits from both Name and Address to output complete profiles.', color:'#10b981' },
            { n:4, title:'Multilevel Manager', desc:'Create Employee -> Manager -> Executive. Each class prints its rank. Executive instances invoke all levels.', color:'#f59e0b' },
            { n:5, title:'Hierarchical Shapes', desc:'Create Shape class. Inherit Circle and Square from Shape. Test both subclasses.', color:'#38bdf8' },
            { n:6, title:'super() Constructor', desc:'Create Person class with name. Inherit Employee. Pass name parameter from Employee to Person using super().__init__(name).', color:'#a855f7' },
            { n:7, title:'Method Overriding: Account Rates', desc:'Create BankAccount with get_interest_rate(). Overridden SavingsAccount interest rate returns 4.5% instead of 0.5%.', color:'#ec4899' },
            { n:8, title:'Hybrid Animal Hierarchy', desc:'Build a hybrid structure: LivingBeing -> Animal -> Mammal/Reptile -> Dog/Snake. Print inheritance outputs.', color:'#ef4444' },
            { n:9, title:'Chained display details', desc:'Create Product with show_details(). Subclass ElectronicProduct overrides method and uses super().show_details() before printing electronics details.', color:'#06b6d4' },
            { n:10, title:'Destructor cleanup sequence', desc:'Create database backup classes. Base backup class destructor prints "[Backup] cleared". Child backup class destructor prints "[ChildBackup] finished". Use del explicitly.', color:'#8b5cf6' },
          ].map(task=>(
            <div key={task.n} style={{ background:'#f8fafc', borderRadius:10, padding:'1rem 1.2rem', border:`2px solid ${task.color}25`, display:'flex', gap:'1rem', alignItems:'flex-start' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:`${task.color}20`, border:`2px solid ${task.color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:800, color:task.color }}>{task.n}</div>
              <div><strong style={{ color:'#1e293b', display:'block', marginBottom:4 }}>{task.title}</strong><span style={{ color:'#64748b', fontSize:'0.9rem' }}>{task.desc}</span></div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={()=>nav('quiz')} style={{ float:'right', marginTop:'1.5rem' }}>Next: Quiz <ArrowRight size={16}/></button>
      </Section>
    ),

    quiz: (
      <Section key="quiz" eyebrow="Assessment" title="🧠 Quiz — Inheritance (12 Questions)">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Test your understanding of Python Class Inheritance, super(), and Method Overriding:</p>
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
