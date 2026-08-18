import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Terminal, Trophy, CheckCircle, XCircle, Sliders, Cpu, Filter, Zap, Link, ShieldAlert, Sparkles } from 'lucide-react';

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

/* ── Custom Python OOP & Abstraction Interpreter Engine ── */
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
      if (t.startsWith('@')) { i++; continue; } // Ignore decorators like @abstractmethod
      const ind = line.search(/\S/);
      if (ind < bi) break;
      if (ind === bi) {
        if (t.startsWith('import ') || t.startsWith('from ')) { i++; continue; }
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
        if (t.startsWith('try:')) { i++; const bd = block(bi+4); let eb = null; if (lines[i] && lines[i].trim().startsWith('except')) { i++; eb = block(bi+4); } b.push({ type:'try', body:bd, except_body:eb }); continue; }
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
      if (parent === 'ABC') continue;
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

    // operator overloading *
    const mulM = expr.match(/^([a-zA-Z_]\w*)\s*\*\s*([a-zA-Z_]\w*)$/);
    if (mulM) {
      const obj1 = evalExpr(mulM[1], scope);
      const obj2 = evalExpr(mulM[2], scope);
      if (obj1 && obj1.__class__) {
        const mulFn = lookupMethod(obj1.__class__, '__mul__');
        if (mulFn) {
          const localEnv = {};
          localEnv[mulFn.params[0]] = obj1;
          localEnv[mulFn.params[1]] = obj2;
          localEnv['self'] = obj1;
          const status = execBlock(mulFn.body, localEnv);
          return status && status.type === 'return' ? status.value : null;
        }
      }
      if (typeof obj1 === 'number' && typeof obj2 === 'number') return obj1 * obj2;
      if (typeof obj1 === 'string' && typeof obj2 === 'number') return obj1.repeat(obj2);
      if (typeof obj1 === 'number' && typeof obj2 === 'string') return obj2.repeat(obj1);
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
            if (parent === 'ABC') continue;
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

    // Constructor call
    const callM = expr.match(/^([a-zA-Z_]\w*)\((.*)\)$/);
    if (callM) {
      const name = callM[1];
      const argsStr = callM[2];
      const args = argsStr ? splitCommas(argsStr).map(x => evalExpr(x.trim(), scope)) : [];
      
      if (name === 'str') return String(args[0]);
      if (name === 'isinstance') {
        const val = args[0];
        const typeStr = argsStr.split(',')[1].trim();
        if (typeStr === 'int') return typeof val === 'number' && Number.isInteger(val);
        if (typeStr === 'str') return typeof val === 'string';
        return false;
      }

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
      }
    }

    // Attribute lookups
    const dotM = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)$/);
    if (dotM) {
      const objName = dotM[1];
      let attrName = dotM[2];
      const obj = scope[objName] !== undefined ? scope[objName] : env[objName];
      if (obj !== undefined && obj !== null) {
        if (obj.__class__) {
          const className = obj.__class__;
          if (obj[attrName] !== undefined) return obj[attrName];
          if (obj.attributes[attrName] !== undefined) return obj.attributes[attrName];
          
          const lookupClassAttr = (clsName) => {
            const cls = env[clsName];
            if (!cls) return undefined;
            if (cls.attributes && cls.attributes[attrName] !== undefined) return cls.attributes[attrName];
            for (const parent of cls.parents) {
              if (parent === 'ABC') continue;
              const val = lookupClassAttr(parent);
              if (val !== undefined) return val;
            }
            return undefined;
          };
          return lookupClassAttr(className);
        }
        return obj[attrName];
      }
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
        return v === true ? 'True' : v === false ? 'False' : v === null ? 'None' : String(v);
      } catch(e) { return `[Error:${e.message}]`; }
    });
    output.push(parts.join(' ')+'\n');
  };

  function execBlock(nodes, scope=env) {
    for (const node of nodes) {
      total++; if(total>8000) throw new Error('TimeLimitExceeded');
      if (node.type === 'class') {
        const cls = { type: 'class', name: node.name, parents: node.parents, methods: {}, attributes: {}, properties: {} };
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
      else if (node.type==='try') {
        try {
          const s = execBlock(node.body, scope);
          if (s) return s;
        } catch(e) {
          if (node.except_body) {
            const s = execBlock(node.except_body, scope);
            if (s) return s;
          }
        }
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
            obj[dotM[2]] = val;
            obj.attributes[dotM[2]] = val;
          }
        } else if (idxM) {
          const obj = evalExpr(idxM[1], scope);
          const key = evalExpr(idxM[2], scope);
          if (obj) obj[key] = evalExpr(expr, scope);
        } else {
          scope[name] = evalExpr(expr, scope);
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

/* ── Playground Component ── */
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
      <textarea value={code} onChange={e=>setCode(e.target.value)} style={{ width:'100%', minHeight:240, fontFamily:'monospace', fontSize:'0.88rem', padding:'0.9rem', borderRadius:10, border:'1.5px solid #334155', background:'#0f172a', color:'#f8fafc', lineHeight:1.7, resize:'vertical', outline:'none', boxSizing:'border-box' }} spellCheck={false}/>
      {out&&<div style={{ background:'#f0fdf4', border:'1.5px solid #10b981', borderRadius:10, padding:'0.9rem', marginTop:'0.6rem', fontFamily:'monospace', fontSize:'0.87rem', whiteSpace:'pre-wrap', color:'#064e3b' }}><strong style={{ color:'#10b981' }}>Output:</strong><br/>{out}</div>}
    </div>
  );
}

/* ── Quiz ── */
const QUIZ = [
  { q:'What is Abstraction in Python?', opts:['A process to calculate percentages','A technique to handle complexity by hiding internal implementation details','A system to optimize CPU speeds','A way to import packages'], ans:1 },
  { q:'Which library is imported in Python to define abstract classes and methods?', opts:['sys','abc','os','math'], ans:1 },
  { q:'Which decorator declares a method as abstract with no body?', opts:['@classmethod','@staticmethod','@abstractmethod','@property'], ans:2 },
  { q:'Can you instantiate an abstract class directly in Python?', opts:['Yes, always','No, it is incomplete and designed only to be inherited','Only inside recursive loops','Only if it contains a constructor'], ans:1 },
  { q:'What is Polymorphism in Python?', opts:['The ability of an object to take on multiple forms','The process of creating copies of classes','A compilation syntax error','A module formatting technique'], ans:0 },
  { q:'Which concept allows a subclass to provide a specific implementation of a method that is already defined in its parent?', opts:['Method Overloading','Method Overriding','Operator Overloading','Name Mangling'], ans:1 },
  { q:'What is Method Overloading?', opts:['Methods with the same name but different parameters in the same class','Inheriting from a parent class','Adding print statements','Overriding parent methods'], ans:0 },
  { q:'How can we overload operators (e.g. *) in Python?', opts:['Using the @abstractmethod decorator','By defining magic methods like __mul__ in the class','By calling super()','Using the import system'], ans:1 },
  { q:'Which parent class should a class inherit from to become an abstract class?', opts:['Object','ABC','base','Abstract'], ans:1 },
  { q:'What happens if a concrete subclass fails to implement an abstract method of its parent?', opts:['It is ignored','It raises a TypeError when instantiating the subclass','It runs normally with empty defaults','It prints warning logs'], ans:1 },
  { q:'What does the super() function do?', opts:['It deletes a parent class','It calls methods and initializers of the parent class','It speeds up compilation','It creates a dictionary'], ans:1 },
  { q:'Which magic method is used to overload the addition (+) operator in Python?', opts:['__mul__','__add__','__sum__','__plus__'], ans:1 },
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
          <p style={{ margin:'0.4rem 0 0', color:'#475569' }}>{score>=9?'🎉 Excellent! You have mastered Data Abstraction!':score>=6?'👍 Good job! Review the concepts.':'📚 Keep practicing!'}</p>
          <button className="btn btn-outline" style={{ marginTop:'0.8rem' }} onClick={()=>{setAnswers({});setSubmitted(false);}}>Retry Quiz</button>
        </div>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function PythonDay13({ activeTab, onNavigate }) {
  const nav = tab => onNavigate('python_day13', tab);

  const sections = {
    intro: (
      <Section key="intro" eyebrow="Day 13" title="🏛️ Data Abstraction & Polymorphism">
        <p style={{ fontSize:'1.1rem', color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Welcome to Day 13! Today we cover the final core pillars of Object-Oriented Programming: <strong>Data Abstraction</strong> and <strong>Polymorphism</strong>.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon:<BookOpen size={28} color="#6366f1"/>, title:'Data Abstraction', desc:'Hiding background complexity and exposing only essential operations via abstract base classes (ABC).' },
            { icon:<Zap size={28} color="#10b981"/>, title:'Polymorphism', desc:'Allowing a single interface/method name to act differently across distinct subclasses.' },
            { icon:<Sliders size={28} color="#f472b6"/>, title:'Operator Overloading', desc:'Defining specialized behaviors for operators (like *) using magic methods (like __mul__).' },
            { icon:<Sparkles size={28} color="#f59e0b"/>, title:'3 Capstone Projects', desc:'Clean applications showcasing payment systems, smart home, and school databases.' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'1.2rem', border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:8 }}>
              {item.icon}
              <strong style={{ color:'#1e293b' }}>{item.title}</strong>
              <p style={{ margin:0, color:'#64748b', fontSize:'0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background:'linear-gradient(135deg,#6366f115,#f472b615)', borderRadius:14, padding:'1.5rem', border:'1px solid #6366f140' }}>
          <h3 style={{ margin:'0 0 1rem', color:'#312e81' }}>📋 Day 13 Syllabus Outline</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem' }}>
            {['Introduction to Abstraction','Abstract Classes & Methods','ABC Module & @abstractmethod','Understanding Polymorphism','Method Overriding vs Overloading','Operator Overloading (__mul__)','Capstone: Vehicle Abstract Polymorphism','Project 1: Payment Processor System','Project 2: Smart Home Controller','Project 3: School database Manager','Quiz & Assignments'].map((t,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', color:'#475569', padding:'0.3rem 0' }}>
                <CheckCircle size={15} color="#10b981"/> {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:'right', marginTop:'1.5rem' }}>
          <button className="btn btn-primary" onClick={()=>nav('abstraction')}>Next: Data Abstraction <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    abstraction: (
      <Section key="abstraction" eyebrow="Concept 1" title="🧱 Data Abstraction & ABC Module">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          In Python, abstraction is achieved using the <strong>ABC (Abstract Base Classes)</strong> module. We decorate base methods with <code>@abstractmethod</code> to mandate that all subclasses implement concrete overrides.
        </p>

        <CodeBlock title="abstraction_intro.py">
          {kw('from')} abc {kw('import')} ABC, abstractmethod<br/><br/>
          {kw('class')} {fn('Employee')}{"(ABC):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('@abstractmethod')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('getTotalSalary')}{"(self):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('pass')}<br/><br/>
          {kw('class')} {fn('Engineer')}{"(Employee):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}{"(self, name, base_salary, bonus):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.base_salary = base_salary<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.bonus = bonus<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('getTotalSalary')}{"(self):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} self.base_salary + self.bonus
        </CodeBlock>

        <Playground id="abstraction_play" title="🧪 Try Abstract Base Classes"
          defaultCode={`from abc import ABC, abstractmethod

class Employee(ABC):
    @abstractmethod
    def getTotalSalary(self):
        pass

class Engineer(Employee):
    def __init__(self, name, base_salary, bonus):
        self.name = name
        self.base_salary = base_salary
        self.bonus = bonus

    # Overriding abstract method
    def getTotalSalary(self):
        return self.base_salary + self.bonus

eng = Engineer("John", 50000, 10000)
print(eng.name, "Total Salary:", eng.getTotalSalary())`}
        />
        <button className="btn btn-primary" onClick={()=>nav('polymorphism')} style={{ float:'right', marginTop:'1rem' }}>Next: Polymorphism <ArrowRight size={16}/></button>
      </Section>
    ),

    polymorphism: (
      <Section key="polymorphism" eyebrow="Concept 2" title="🌀 Polymorphism & Operator Overloading">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          **Polymorphism** allows different object classes to share the same method names. In Python, this is seen in **Method Overriding** (child class replaces parent method) and **Operator Overloading** (using magic methods like <code>__mul__</code> to configure the <code>*</code> operator).
        </p>

        <CodeBlock title="operator_overload.py">
          {kw('class')} {fn('A')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}{"(self, a):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.a = a<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__mul__')}{"(self, o):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} self.a * o.a
        </CodeBlock>

        <Playground id="poly_play" title="🧪 Try Method Overriding & Operator Overloading"
          defaultCode={`class A:
    def __init__(self, a):
        self.a = a

    # Overloading the multiplication (*) operator
    def __mul__(self, o):
        return self.a * o.a

ob1 = A(2)
ob2 = A(3)
ob3 = A("SideBayes!")

print("Numeric Overloading:", ob1 * ob2)
print("String Multiplier Overloading:", ob2 * ob3)`}
        />
        <button className="btn btn-primary" onClick={()=>nav('capstone')} style={{ float:'right', marginTop:'1rem' }}>Next: Capstone <ArrowRight size={16}/></button>
      </Section>
    ),

    capstone: (
      <Section key="capstone" eyebrow="Capstone" title="🚗 Vehicle Abstract Polymorphism">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This Capstone combines Abstraction (Abstract class <code>Vehicle</code> with abstract method <code>start_engine()</code>) and Polymorphism (subclass <code>Car</code> overriding constructor and methods).
        </p>

        <Playground id="capstone_play" title="🧪 Run Capstone Code"
          defaultCode={`from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def get_vehicle_info(self):
        return str(self.year) + " " + self.make + " " + self.model

    @abstractmethod
    def start_engine(self):
        pass

class Car(Vehicle):
    def __init__(self, make, model, year, color):
        super().__init__(make, model, year)
        self.color = color

    def start_engine(self):
        return "Car engine started"

my_car = Car("Toyota", "Camry", 2022, "Blue")
print("Vehicle Info:", my_car.get_vehicle_info())
print("Engine Status:", my_car.start_engine())
print("Color:", my_car.color)

my_car.color = "Red"
print("Updated Color:", my_car.color)`}
        />
        <button className="btn btn-primary" onClick={()=>nav('project1')} style={{ float:'right', marginTop:'1rem' }}>Next: Project 1 <ArrowRight size={16}/></button>
      </Section>
    ),

    project1: (
      <Section key="project1" eyebrow="Project 1" title="💳 Online Payment Processor">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1rem' }}>
          An payment gateway engine utilizing abstraction. The parent <code>Payment</code> is abstract, forcing each payment option (Credit Card, PayPal, Crypto) to write its own transaction logic.
        </p>

        <CodeBlock title="Payment Class Hierarchy">
          {kw('class')} {fn('Payment')}{"(ABC):"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('@abstractmethod')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('process_payment')}{"(self, amount):"} {kw('pass')}
        </CodeBlock>

        <Playground id="proj1_play" title="🧪 Run Online Payment Gateway Console"
          defaultCode={`from abc import ABC, abstractmethod

class Payment(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class CreditCardPayment(Payment):
    def __init__(self, card_number, card_holder):
        self.card_number = card_number
        self.card_holder = card_holder

    def process_payment(self, amount):
        print(f"Credit Card ending in {self.card_number[-4:]} processed payment of \${amount} for {self.card_holder}.")

class PayPalPayment(Payment):
    def __init__(self, email):
        self.email = email

    def process_payment(self, amount):
        print(f"PayPal account {self.email} processed payment of \${amount}.")

class CryptoPayment(Payment):
    def __init__(self, wallet_address):
        self.wallet_address = wallet_address

    def process_payment(self, amount):
        print(f"Crypto wallet {self.wallet_address[:6]}...{self.wallet_address[-4:]} processed transaction of \${amount}.")

# Polymorphic payment executor
def checkout(payment_method, amount):
    payment_method.process_payment(amount)

cc = CreditCardPayment("1234567890123456", "Bhavana")
pp = PayPalPayment("bhavana@example.com")
crypto = CryptoPayment("0x123abc456def7890")

checkout(cc, 250.0)
checkout(pp, 85.5)
checkout(crypto, 1200.0)`}
        />
        <button className="btn btn-primary" onClick={()=>nav('project2')} style={{ float:'right', marginTop:'1.5rem' }}>Next: Project 2 <ArrowRight size={16}/></button>
      </Section>
    ),

    project2: (
      <Section key="project2" eyebrow="Project 2" title="🏠 Smart Home Device Controller">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1rem' }}>
          This simulator controls smart household items polymorphicly. The abstract base class <code>SmartDevice</code> ensures consistency across all connected appliances (lights, thermostats, security systems).
        </p>

        <Playground id="proj2_play" title="🧪 Run Smart Home Simulator console"
          defaultCode={`from abc import ABC, abstractmethod

class SmartDevice(ABC):
    def __init__(self, device_name):
        self.device_name = device_name
        self.status = "OFF"

    @abstractmethod
    def get_status_report(self):
        pass

class SmartLight(SmartDevice):
    def __init__(self, device_name, brightness=50):
        super().__init__(device_name)
        self.brightness = brightness

    def turn_on(self):
        self.status = "ON"

    def get_status_report(self):
        print(f"Device: {self.device_name} | State: {self.status} | Brightness: {self.brightness}%")

class SmartThermostat(SmartDevice):
    def __init__(self, device_name, temperature=22):
        super().__init__(device_name)
        self.temperature = temperature

    def set_temp(self, temp):
        self.temperature = temp

    def get_status_report(self):
        print(f"Device: {self.device_name} | State: {self.status} | Target Temperature: {self.temperature}°C")

class SmartCamera(SmartDevice):
    def __init__(self, device_name):
        super().__init__(device_name)
        self.recording = False

    def start_recording(self):
        self.status = "ON"
        self.recording = True

    def get_status_report(self):
        rec_status = "RECORDING" if self.recording else "IDLE"
        print(f"Device: {self.device_name} | State: {self.status} | Mode: {rec_status}")

# Smart Hub Simulator
light = SmartLight("Living Room Light", 80)
thermostat = SmartThermostat("Main Hall Thermostat", 24)
camera = SmartCamera("Front Door Camera")

light.turn_on()
camera.start_recording()

devices = [light, thermostat, camera]
print("--- Connected Devices Report ---")
for device in devices:
    device.get_status_report()`}
        />
        <button className="btn btn-primary" onClick={()=>nav('project3')} style={{ float:'right', marginTop:'1.5rem' }}>Next: Project 3 <ArrowRight size={16}/></button>
      </Section>
    ),

    project3: (
      <Section key="project3" eyebrow="Project 3" title="🏫 School Management System Database">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1rem' }}>
          An entity management system for schools. <code>Person</code> acts as an abstract template, exposing a polymorphic <code>get_role_details()</code> query method.
        </p>

        <Playground id="proj3_play" title="🧪 Run School database Console"
          defaultCode={`from abc import ABC, abstractmethod

class Person(ABC):
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @abstractmethod
    def get_role_details(self):
        pass

class Student(Person):
    def __init__(self, name, age, roll_number, major):
        super().__init__(name, age)
        self.roll_number = roll_number
        self.major = major

    def get_role_details(self):
        return f"Student [Roll: {self.roll_number}] majoring in {self.major}"

class Teacher(Person):
    def __init__(self, name, age, subject, salary):
        super().__init__(name, age)
        self.subject = subject
        self.salary = salary

    def get_role_details(self):
        return f"Teacher instructing {self.subject} [Salary: \${self.salary}]"

class Staff(Person):
    def __init__(self, name, age, department):
        super().__init__(name, age)
        self.department = department

    def get_role_details(self):
        return f"Support Staff working in {self.department} Department"

# Registry List
school_registry = [
    Student("Alice", 20, "S101", "Computer Science"),
    Teacher("Dr. Smith", 45, "Mathematics", 7500),
    Staff("Johnathan", 38, "Administration")
]

print("=== School Registry Database ===")
for person in school_registry:
    print(f"Name: {person.name} | Age: {person.age} | Role: {person.get_role_details()}")`}
        />
        <button className="btn btn-primary" onClick={()=>nav('assignment_work')} style={{ float:'right', marginTop:'1.5rem' }}>Next: Assignments <ArrowRight size={16}/></button>
      </Section>
    ),

    assignment_work: (
      <Section key="assignment_work" eyebrow="Practice" title="📝 Assignment — 10 Tasks">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Complete these abstraction and polymorphism tasks to reinforce your learning:</p>
        <div style={{ display:'grid', gap:'0.8rem' }}>
          {[
            { n:1, title:'Abstract Shape Class', desc:'Create abstract Shape class with abstract area() and perimeter() methods. Subclass Rectangle and Circle.', color:'#6366f1' },
            { n:2, title:'Animal sounds polymorphism', desc:'Create abstract Animal class with abstract make_sound() method. Override it inside Dog, Cat, and Lion subclasses.', color:'#f472b6' },
            { n:3, title:'Overload Addition (+) operator', desc:'Create Book class with page count attributes. Overload the + operator (__add__) to sum pages of two books.', color:'#10b981' },
            { n:4, title:'Abstract File System', desc:'Create abstract File class with abstract read() and write() methods. Subclass TextFile and BinaryFile.', color:'#f59e0b' },
            { n:5, title:'Operator Overloading (==)', desc:'Create Employee class with salary. Overload the == operator (__eq__) to check if two employees have the same salary.', color:'#38bdf8' },
            { n:6, title:'Polymorphic Area Calculator', desc:'Write a print_areas(shapes_list) function that receives a list of shapes and prints their areas polymorphicly.', color:'#a855f7' },
            { n:7, title:'Abstract Employee structure', desc:'Create abstract Employee with abstract calculate_weekly_pay(). Subclass HourlyEmployee and SalariedEmployee.', color:'#ec4899' },
            { n:8, title:'Abstract database Connector', desc:'Create abstract DatabaseConnector with connect() and query() methods. Subclass MySQLConnector and SQLiteConnector.', color:'#ef4444' },
            { n:9, title:'Operator Overloading (<)', desc:'Create Product class with prices. Overload the < operator (__lt__) to compare product prices.', color:'#06b6d4' },
            { n:10, title:'Abstract Game Character', desc:'Create abstract GameCharacter with abstract attack() method. Subclass Warrior, Mage, and Archer.', color:'#8b5cf6' },
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
      <Section key="quiz" eyebrow="Assessment" title="🧠 Quiz — Abstraction & Polymorphism (12 Questions)">
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
