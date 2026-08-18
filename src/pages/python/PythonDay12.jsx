import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Terminal, Trophy, CheckCircle, XCircle, Sliders, Cpu, Filter, Zap, Link, ShieldAlert } from 'lucide-react';

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

/* ── Simple OOP Python Interpreter with Encapsulation ── */
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
          if (method.startsWith('__') && !method.endsWith('__')) {
            if (scope['self'] !== obj) {
              throw new Error(`AttributeError: '${className}' object has no attribute '${method}'`);
            }
          }
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
      const objName = dotM[1];
      let attrName = dotM[2];
      const obj = scope[objName] !== undefined ? scope[objName] : env[objName];
      if (obj !== undefined && obj !== null) {
        if (obj.__class__) {
          const className = obj.__class__;
          const cls = env[className];
          
          if (cls && cls.properties && cls.properties[attrName]) {
            const prop = cls.properties[attrName];
            const getterM = lookupMethod(className, prop.getter);
            if (getterM) {
              const localEnv = { self: obj };
              localEnv[getterM.params[0]] = obj;
              const status = execBlock(getterM.body, localEnv);
              return status && status.type === 'return' ? status.value : null;
            }
          }

          if (attrName.startsWith('__') && !attrName.endsWith('__')) {
            if (scope['self'] !== obj) {
              throw new Error(`AttributeError: '${className}' object has no attribute '${attrName}'`);
            }
          }

          const mangleM = attrName.match(/^_(?:[a-zA-Z_]\w*)__(.*)$/);
          if (mangleM) {
            const actualPrivateAttr = '__' + mangleM[1];
            if (obj.attributes[actualPrivateAttr] !== undefined) return obj.attributes[actualPrivateAttr];
          }

          if (obj[attrName] !== undefined) return obj[attrName];
          if (obj.attributes[attrName] !== undefined) return obj.attributes[attrName];
          
          const lookupClassAttr = (clsName) => {
            const cls = env[clsName];
            if (!cls) return undefined;
            if (cls.attributes && cls.attributes[attrName] !== undefined) return cls.attributes[attrName];
            for (const parent of cls.parents) {
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
        const cls = { type: 'class', name: node.name, parents: node.parents, methods: {}, attributes: {}, properties: {} };
        env[node.name] = cls;
        node.body.forEach(child => {
          if (child.type === 'def') {
            cls.methods[child.name] = child;
          } else if (child.type === 'assign') {
            const propM = child.expr.match(/^property\(([^,]+),\s*([^,]+)(?:,\s*["']([^"']+)["'])?\)$/);
            if (propM) {
              cls.properties[child.name] = { getter: propM[1].trim(), setter: propM[2].trim() };
            } else {
              cls.attributes[child.name] = evalExpr(child.expr, scope);
            }
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
          const objName = dotM[1];
          const attrName = dotM[2];
          const obj = scope[objName] !== undefined ? scope[objName] : env[objName];
          const val = evalExpr(expr, scope);
          if (obj && obj.__class__) {
            const className = obj.__class__;
            
            const cls = env[className];
            if (cls && cls.properties && cls.properties[attrName]) {
              const prop = cls.properties[attrName];
              const setterM = lookupMethod(className, prop.setter);
              if (setterM) {
                const localEnv = { self: obj };
                localEnv[setterM.params[0]] = obj;
                localEnv[setterM.params[1]] = val;
                execBlock(setterM.body, localEnv);
                continue;
              }
            }

            if (attrName.startsWith('__') && !attrName.endsWith('__')) {
              if (scope['self'] !== obj) {
                throw new Error(`AttributeError: '${className}' object has no attribute '${attrName}'`);
              }
            }

            if (obj[attrName] !== undefined) {
              obj[attrName] = val;
            } else {
              obj.attributes[attrName] = val;
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
  { q:'What is Encapsulation in Python?', opts:['A mechanism to download modules','A practice of bundling data and methods, restricting direct outside access','A method for recursion','A standard template library function'], ans:1 },
  { q:'Which prefix convention is used in Python to indicate a Protected variable?', opts:['Single underscore _','Double underscore __','Triple underscore ___','Dollar sign $'], ans:0 },
  { q:'Which prefix is used in Python to specify a Private variable?', opts:['Single underscore _','Double underscore __','Hash symbol #','No prefix'], ans:1 },
  { q:'Can protected variables be accessed from outside their class in Python?', opts:['No, they throw AttributeError','Yes, Python does not enforce strict access block, it is just a convention','Only via super()','Only within decorators'], ans:1 },
  { q:'What happens if you try to access a private attribute (e.g. obj.__age) from outside?', opts:['It returns None','It prints an error string','It raises an AttributeError','It runs normally'], ans:2 },
  { q:'What is Name Mangling in Python?', opts:['Automatically rewriting private attribute names as _ClassName__attribute','Formatting string names in lowercase','Converting variables into integers','Randomly renaming local variables'], ans:0 },
  { q:'If a class is named BankAccount with private attribute __balance, what is the mangled name?', opts:['BankAccount._balance','_BankAccount__balance','__balance_BankAccount','BankAccount.__balance'], ans:1 },
  { q:'What is a Getter method?', opts:['A method to set new values','A method to retrieve the value of a private instance variable','A constructor','A destructor'], ans:1 },
  { q:'What is a Setter method?', opts:['A method to assign/modify the value of a private instance variable, often with validation','A method to import files','A method to print details','A destructor'], ans:0 },
  { q:'How does the property() function map attributes?', opts:['It links variable names to getter and setter methods','It copies values into directories','It deletes duplicate attributes','It creates standard dictionaries'], ans:0 },
  { q:'Which built-in function checks the datatype of a variable (e.g. checking if it is an int)?', opts:['type()','isinstance()','typeof()','checktype()'], ans:1 },
  { q:'Why is data hiding used in software design?', opts:['To protect internal object states from unintended modifications','To speed up program compiles','To reduce memory footprint','To print outputs cleanly'], ans:0 },
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
          <p style={{ margin:'0.4rem 0 0', color:'#475569' }}>{score>=9?'🎉 Excellent! You are an encapsulation master!':score>=6?'👍 Good job! Review the concepts.':'📚 Keep practicing!'}</p>
          <button className="btn btn-outline" style={{ marginTop:'0.8rem' }} onClick={()=>{setAnswers({});setSubmitted(false);}}>Retry Quiz</button>
        </div>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function PythonDay12({ activeTab, onNavigate }) {
  const nav = tab => onNavigate('python_day12', tab);

  const sections = {
    intro: (
      <Section key="intro" eyebrow="Day 12" title="🔒 Python Encapsulation">
        <p style={{ fontSize:'1.1rem', color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Welcome to Day 12! Today we explore <strong>Encapsulation</strong>, the OOP concept that bundles data and methods together into a single class unit while restricting direct access from outside code. This creates a secure, clean public interface and hides the internal implementation details of your objects.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon:<BookOpen size={28} color="#6366f1"/>, title:'Why Encapsulation?', desc:'Prevents outside code from modifying internal states directly, reducing bugs and vulnerabilities.' },
            { icon:<ShieldAlert size={28} color="#10b981"/>, title:'Access Specifiers', desc:'Mark attributes as Public, Protected (_), or Private (__) depending on structural needs.' },
            { icon:<Cpu size={28} color="#f472b6"/>, title:'Name Mangling', desc:'Python internally renames private fields to prevent collisions and direct outside reference.' },
            { icon:<Sliders size={28} color="#f59e0b"/>, title:'Getters & Setters', desc:'Expose safe functions to read or modify private data with strict validation checks.' },
          ].map((item,i)=>(
            <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'1.2rem', border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:8 }}>
              {item.icon}
              <strong style={{ color:'#1e293b' }}>{item.title}</strong>
              <p style={{ margin:0, color:'#64748b', fontSize:'0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background:'linear-gradient(135deg,#667eea15,#764ba215)', borderRadius:14, padding:'1.5rem', border:'1px solid #667eea40' }}>
          <h3 style={{ margin:'0 0 1rem', color:'#312e81' }}>📋 Day 12 Syllabus Outline</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem' }}>
            {['Introduction to Encapsulation','Understanding Public members','Understanding Protected members (_)','Understanding Private members (__)','Name Mangling and _ClassName__variable','Implementing Getter and Setter methods','Using the property() function mapping','Capstone: Secure Library System','Day 12 Assignment (10 Tasks)','Quiz (12 Questions)'].map((t,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', color:'#475569', padding:'0.3rem 0' }}>
                <CheckCircle size={15} color="#10b981"/> {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:'right', marginTop:'1.5rem' }}>
          <button className="btn btn-primary" onClick={()=>nav('specifiers')}>Next: Access Specifiers <ArrowRight size={16}/></button>
        </div>
      </Section>
    ),

    specifiers: (
      <Section key="specifiers" eyebrow="Concept 1" title="🛡️ Public, Protected, and Private Specifiers">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          Python provides naming conventions to indicate how data elements should be accessed:
        </p>

        <div style={{ overflowX:'auto', marginBottom:'1.5rem' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', border:'1px solid #e2e8f0' }}>
            <thead>
              <tr style={{ background:'#f1f5f9', borderBottom:'2px solid #cbd5e1' }}>
                <th style={{ padding:'0.8rem', textAlign:'left', color:'#1e293b' }}>Type</th>
                <th style={{ padding:'0.8rem', textAlign:'left', color:'#1e293b' }}>Syntax Prefix</th>
                <th style={{ padding:'0.8rem', textAlign:'left', color:'#1e293b' }}>Accessibility Scope</th>
              </tr>
            </thead>
            <tbody style={{ color:'#475569' }}>
              <tr style={{ borderBottom:'1px solid #e2e8f0' }}>
                <td style={{ padding:'0.8rem', fontWeight:600, color:'#10b981' }}>Public</td>
                <td style={{ padding:'0.8rem' }}><code>self.variable</code></td>
                <td style={{ padding:'0.8rem' }}>Accessible anywhere (inside/outside class).</td>
              </tr>
              <tr style={{ borderBottom:'1px solid #e2e8f0' }}>
                <td style={{ padding:'0.8rem', fontWeight:600, color:'#3b82f6' }}>Protected</td>
                <td style={{ padding:'0.8rem' }}><code>self._variable</code></td>
                <td style={{ padding:'0.8rem' }}>Accessible inside the class and its subclasses (by convention).</td>
              </tr>
              <tr>
                <td style={{ padding:'0.8rem', fontWeight:600, color:'#ef4444' }}>Private</td>
                <td style={{ padding:'0.8rem' }}><code>self.__variable</code></td>
                <td style={{ padding:'0.8rem' }}>Accessible <strong>only</strong> within the defining class block.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock title="specifiers_demo.py">
          {kw('class')} {fn('Employee')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, name, age, salary):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name          {c('# Public attribute')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._salary = salary     {c('# Protected attribute')}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.__age = age          {c('# Private attribute')}
        </CodeBlock>

        <Playground id="specifiers_play" title="🧪 Try Access Specifiers (Notice the AttributeError on Private)"
          defaultCode={`class Employee:
    def __init__(self, name, age, salary):
        self.name = name       # public
        self._salary = salary   # protected
        self.__age = age       # private

e = Employee("Bhavana", 24, 10000)
print("Public name:", e.name)
print("Protected salary:", e._salary)

# Trying to access private variable directly from outside raises AttributeError
try:
    print(e.__age)
except AttributeError as err:
    print("Caught expected error:", err)`}
        />
        <button className="btn btn-primary" onClick={()=>nav('mangling')} style={{ float:'right', marginTop:'1rem' }}>Next: Name Mangling <ArrowRight size={16}/></button>
      </Section>
    ),

    mangling: (
      <Section key="mangling" eyebrow="Concept 2" title="🌀 Private Variables & Name Mangling">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          When an attribute begins with a double underscore (like <code>self.__balance</code>), Python automatically applies **Name Mangling**. It translates the name internally to <code>_ClassName__attributeName</code>.
        </p>

        <div style={{ background:'#fef3c7', borderRadius:10, padding:'1.2rem', border:'1px solid #f59e0b', color:'#92400e', marginBottom:'1.5rem' }}>
          <strong>💡 Why does Name Mangling exist?</strong><br/>
          It prevents naming conflicts between superclasses and subclasses, and makes it harder (though not entirely impossible) for outside scripts to modify private variables directly.
        </div>

        <CodeBlock title="name_mangling.py">
          {kw('class')} {fn('BankAccount')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, holder, balance):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.holder = holder<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.__balance = balance  {c('# Private attribute')}<br/><br/>
          account = {fn('BankAccount')}({st('"Alice"')}, {nm('5000')})<br/>
          {cm('# Accessing mangled attribute directly')}<br/>
          {fn('print')}(account._BankAccount__balance)  {c('# Prints 5000')}
        </CodeBlock>

        <Playground id="mangling_play" title="🧪 Try Name Mangling"
          defaultCode={`class BankAccount:
    def __init__(self, account_holder, balance):
        self.account_holder = account_holder
        self.__balance = balance

account = BankAccount("Alice", 5000)

# Accessing the mangled attribute name
print("Mangled balance lookup:", account._BankAccount__balance)`}
        />
        <button className="btn btn-primary" onClick={()=>nav('getters_setters')} style={{ float:'right', marginTop:'1rem' }}>Next: Getters & Setters <ArrowRight size={16}/></button>
      </Section>
    ),

    getters_setters: (
      <Section key="getters_setters" eyebrow="Concept 3" title="⚙️ Getters, Setters, and property()">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          To securely read and write private fields, we use **Getter** and **Setter** methods. Setters are especially valuable because they can perform **input validation** before modifying data. The <code>property()</code> function maps these methods directly to standard attribute access.
        </p>

        <CodeBlock title="property_mapping.py">
          {kw('class')} {fn('Employee')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, name, age):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.__name = name<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.__age = age<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('get_name')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} self.__name<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('set_name')}(self, val):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.__name = val<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;name = {fn('property')}(get_name, set_name)
        </CodeBlock>

        <Playground id="getters_setters_play" title="🧪 Try Getters, Setters & properties"
          defaultCode={`class Employee:
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

    def get_age(self):
        return self.__age

    def set_age(self, age):
        if age > 0:
            self.__age = age
        else:
            print("Invalid age entered!")

    name = property(get_name, set_name)
    age = property(get_age, set_age)

emp = Employee("Bhavana", 24)
print("Initial Name:", emp.name, "| Age:", emp.age)

# Modify attributes via property setters
emp.name = "Archana"
emp.age = 23
print("Updated Name:", emp.name, "| Age:", emp.age)

# Failed validation check
emp.age = -5`}
        />
        <button className="btn btn-primary" onClick={()=>nav('capstone')} style={{ float:'right', marginTop:'1rem' }}>Next: Capstone Project <ArrowRight size={16}/></button>
      </Section>
    ),

    capstone: (
      <Section key="capstone" eyebrow="Capstone" title="📚 Secure Library Management System">
        <p style={{ color:'#475569', lineHeight:1.8, marginBottom:'1.5rem' }}>
          This capstone project implements a **Secure Library Management System** combining inheritance, overriding, private catalogs (<code>self.__catalog_number</code>), and getter/setter validation hooks.
        </p>

        <CodeBlock title="secure_library.py">
          {kw('class')} {fn('Media')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self, title, author):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.title = title<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.author = author<br/><br/>
          {kw('class')} {fn('Library')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('__init__')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.media_collection = []<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.__catalog_number = {nm('1000')}  {c('# Private catalog code')}<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('get_catalog_number')}(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} self.__catalog_number<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{kw('def')} {fn('set_catalog_number')}(self, val):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {fn('isinstance')}(val, {fn('int')}) {kw('and')} val &gt; {nm('0')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.__catalog_number = val<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Invalid catalog number."')})
        </CodeBlock>

        <Playground id="capstone_play" title="🧪 Try the Secure Library Management Capstone"
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

class Library:
    def __init__(self):
        self.media_collection = []
        self.__catalog_number = 1000
        print("Library system initialized.")

    def get_catalog_number(self):
        return self.__catalog_number

    def set_catalog_number(self, val):
        if isinstance(val, int) and val > 0:
            self.__catalog_number = val
            print("Catalog updated to:", self.__catalog_number)
        else:
            print("Invalid catalog number. Must be a positive integer.")

    def add_media(self, media):
        self.media_collection.append(media)
        print(f"'{media.title}' added with catalog number {self.__catalog_number}")
        self.__catalog_number += 1

    def display_all(self):
        if len(self.media_collection) == 0:
            print("The library is empty.")
        else:
            print("Media Collection:")
            for media in self.media_collection:
                media.display_info()
                print("---")

library = Library()
b = Book("Secure Coding in Python", "John Doe", "Cybersecurity")
library.add_media(b)

# Inspect Catalog Number
print("Current Catalog Code:", library.get_catalog_number())

# Change Catalog Code
library.set_catalog_number(2500)
print("New Catalog Code:", library.get_catalog_number())`}
        />
        <button className="btn btn-primary" onClick={()=>nav('assignment_work')} style={{ float:'right', marginTop:'1rem' }}>Next: Assignment <ArrowRight size={16}/></button>
      </Section>
    ),

    assignment_work: (
      <Section key="assignment_work" eyebrow="Practice" title="📝 Assignment — 10 Tasks">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Complete these tasks to master Encapsulation, Name Mangling, and properties:</p>
        <div style={{ display:'grid', gap:'0.8rem' }}>
          {[
            { n:1, title:'Create Private Bank Account', desc:'Create class BankAccount with private balance attribute. Instantiate it and verify that printing the balance throws an AttributeError.', color:'#6366f1' },
            { n:2, title:'Getter/Setter for Balance', desc:'Add get_balance() and set_balance() methods to your BankAccount class. Ensure setter prevents negative values.', color:'#f472b6' },
            { n:3, title:'Mangled attribute access', desc:'Write a script that bypasses the private access block of BankAccount and prints the balance using name mangling.', color:'#10b981' },
            { n:4, title:'Circle Radius property', desc:'Create Circle class with private __radius. Map radius using property(get_radius, set_radius) with validation ensuring positive values.', color:'#f59e0b' },
            { n:5, title:'Protected subclass attributes', desc:'Create base Product class with protected _price, and subclass DigitalProduct that accesses _price directly in its methods.', color:'#38bdf8' },
            { n:6, title:'Student Grade Encapsulation', desc:'Create Student class with private __grade. Create getter/setter checking if grade is between 0 and 100.', color:'#a855f7' },
            { n:7, title:'Employee Salary Calculator', desc:'Create Employee with private __base_salary. Add set_salary() validation that prevents salary reductions below current value.', color:'#ec4899' },
            { n:8, title:'Private methods inside class', desc:'Create Database class with private __connect() method. Add public execute() method that calls __connect() first.', color:'#ef4444' },
            { n:9, title:'Property-based Temperature Converter', desc:'Create Celsius class with private __temp. Map temp using property. Setter converts inputs, validating values below absolute zero (-273.15).', color:'#06b6d4' },
            { n:10, title:'Car Speed controller', desc:'Create Car class with private __speed. Add accelerate() method that prevents speed from exceeding max_limit (200).', color:'#8b5cf6' },
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
      <Section key="quiz" eyebrow="Assessment" title="🧠 Quiz — Encapsulation (12 Questions)">
        <p style={{ color:'#475569', marginBottom:'1.5rem' }}>Test your understanding of Encapsulation, Access Specifiers, and property mappings:</p>
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
