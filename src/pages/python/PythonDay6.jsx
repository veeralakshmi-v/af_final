import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Cpu, Filter, Terminal, Trophy, Zap, CheckCircle, XCircle } from 'lucide-react';

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
   AST-BASED PYTHON INTERPRETER WITH FUNCTION SUPPORT
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

        if (trimLine.startsWith('def ')) {
          const match = trimLine.match(/^def\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*:$/);
          if (match) {
            const funcName = match[1];
            const paramStr = match[2];
            const params = paramStr ? paramStr.split(',').map(x => x.trim()) : [];
            i++;
            const body = parseBlock(baseIndent + 4);
            block.push({ type: 'def', name: funcName, params, body });
            continue;
          }
        }

        if (trimLine.startsWith('return ')) {
          const expr = trimLine.slice(7);
          block.push({ type: 'return', expr });
          i++;
          continue;
        }
        if (trimLine === 'return') {
          block.push({ type: 'return', expr: 'None' });
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

        const assignMatch = trimLine.match(/^([a-zA-Z_]\w*(?:\[.+?\])?)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
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

function splitByTopLevelCommas(text) {
  const args = [];
  let depth = 0;
  let inStr = false;
  let strChar = '';
  let cur = '';
  for (let idx = 0; idx < text.length; idx++) {
    const c = text[idx];
    if (!inStr && (c === '"' || c === "'")) {
      inStr = true;
      strChar = c;
      cur += c;
    } else if (inStr && c === strChar) {
      inStr = false;
      cur += c;
    } else if (!inStr && (c === '(' || c === '[' || c === '{')) {
      depth++;
      cur += c;
    } else if (!inStr && (c === ')' || c === ']' || c === '}')) {
      depth--;
      cur += c;
    } else if (!inStr && c === ',' && depth === 0) {
      args.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  if (cur.trim()) {
    args.push(cur.trim());
  }
  return args;
}

function translateTuplesToArrays(text) {
  let result = '';
  let inStr = false, strChar = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; result += c; i++; }
    else if (inStr && c === strChar) { inStr = false; result += c; i++; }
    else if (!inStr && c === '(') {
      const prevTrimmed = result.trim();
      const isFuncCall = prevTrimmed && /[a-zA-Z0-9_]/.test(prevTrimmed[prevTrimmed.length - 1]);
      let depth = 1, j = i + 1, hasComma = false, innerText = '';
      let subInStr = false, subStrChar = '';
      while (j < text.length && depth > 0) {
        const sc = text[j];
        if (!subInStr && (sc === '"' || sc === "'")) { subInStr = true; subStrChar = sc; }
        else if (subInStr && sc === subStrChar) { subInStr = false; }
        if (!subInStr) {
          if (sc === '(') depth++;
          if (sc === ')') depth--;
          if (sc === ',' && depth === 1) hasComma = true;
        }
        if (depth > 0) innerText += sc;
        j++;
      }
      result += (hasComma && !isFuncCall) ? '[' + translateTuplesToArrays(innerText) + ']' : '(' + translateTuplesToArrays(innerText) + ')';
      i = j;
    } else { result += c; i++; }
  }
  return result;
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

  const evalExpr = (expr, scope = env) => {
    expr = expr.trim();
    const isSingleStringLiteral = /^"([^"\\]|\\.)*"$/.test(expr) || /^'([^'\\]|\\.)*'$/.test(expr);
    if (isSingleStringLiteral) {
      return expr.slice(1, -1);
    }
    if (expr === 'True') return true;
    if (expr === 'False') return false;
    if (expr === 'None') return null;

    if (/^input\(.*\)$/.test(expr)) return getInput();

    // lambda expression parsing
    if (expr.startsWith('lambda ')) {
      const match = expr.match(/^lambda\s+([^:]+):\s*(.+)$/);
      if (match) {
        const paramStr = match[1];
        const bodyStr = match[2];
        return {
          type: 'lambda',
          params: paramStr.split(',').map(x => x.trim()),
          bodyStr
        };
      }
    }

    // list(map(func, list)) or map(func, list)
    const listMapMatch = expr.match(/^list\(map\((.+?),\s*(.+?)\)\)$/) || expr.match(/^map\((.+?),\s*(.+?)\)$/);
    if (listMapMatch) {
      const funcName = listMapMatch[1].trim();
      const listExpr = listMapMatch[2].trim();
      const listVal = evalExpr(listExpr, scope);
      if (Array.isArray(listVal)) {
        let funcObj = null;
        if (funcName.startsWith('lambda ')) {
          funcObj = evalExpr(funcName, scope);
        } else {
          funcObj = scope[funcName] !== undefined ? scope[funcName] : env[funcName];
        }

        if (funcObj) {
          return listVal.map(item => {
            if (funcObj.type === 'lambda') {
              const localEnv = { ...scope };
              localEnv[funcObj.params[0]] = item;
              return evalExpr(funcObj.bodyStr, localEnv);
            } else if (funcObj.type === 'function') {
              const localEnv = { ...scope };
              localEnv[funcObj.params[0]] = item;
              const status = execBlock(funcObj.body, localEnv);
              return status && status.type === 'return' ? status.value : null;
            }
            return null;
          });
        }
      }
      return [];
    }

    // Method calls
    const methodMatch = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (methodMatch) {
      const varName = methodMatch[1];
      const method = methodMatch[2];
      const argStr = methodMatch[3];
      const args = argStr ? splitByTopLevelCommas(argStr).map(x => evalExpr(x.trim(), scope)) : [];
      const obj = scope[varName] !== undefined ? scope[varName] : env[varName];
      if (obj !== undefined && obj !== null) {
        if (Array.isArray(obj)) {
          if (method === 'append') { obj.push(args[0]); return null; }
          if (method === 'insert') { obj.splice(args[0], 0, args[1]); return null; }
          if (method === 'pop') { return args.length > 0 ? obj.splice(args[0], 1)[0] : obj.pop(); }
          if (method === 'remove') { const pos = obj.indexOf(args[0]); if(pos !== -1) obj.splice(pos, 1); return null; }
          if (method === 'sort') { obj.sort((a,b)=>a>b?1:-1); return null; }
        } else if (typeof obj === 'string') {
          if (method === 'lower') return obj.toLowerCase();
          if (method === 'upper') return obj.toUpperCase();
          if (method === 'strip') return obj.trim();
          if (method === 'startswith') return obj.startsWith(args[0]);
          if (method === 'endswith') return obj.endsWith(args[0]);
          if (method === 'replace') return obj.split(args[0]).join(args[1]);
          if (method === 'split') return obj.split(args[0] !== undefined ? args[0] : ' ');
          if (method === 'find') return obj.indexOf(args[0]);
          if (method === 'count') return obj.split(args[0]).length - 1;
        } else if (typeof obj[method] === 'function') {
          return obj[method](...args);
        }
      }
    }

    // Index lookup
    const itemMatch = expr.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
    if (itemMatch) {
      const varName = itemMatch[1];
      const key = evalExpr(itemMatch[2], scope);
      const obj = scope[varName] !== undefined ? scope[varName] : env[varName];
      if (obj !== undefined && obj !== null) {
        return obj[key];
      }
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) {
      if (scope[expr] !== undefined) return scope[expr];
      if (env[expr] !== undefined) return env[expr];
      throw new Error(`NameError: name '${expr}' is not defined`);
    }

    let safe = expr;
    safe = translateTuplesToArrays(safe);
    const allKeys = Object.keys(scope).concat(Object.keys(env));
    const uniqueKeys = Array.from(new Set(allKeys)).sort((a, b) => b.length - a.length);
    safe = safe.replace(/ and /g, ' && ').replace(/ or /g, ' || ').replace(/ not /g, ' !').replace(/^not /, '!').replace(/==/g, '===').replace(/!=/g, '!==');

    try {
      const runner = new Function('scope', 'env', 'execBlock', 'evalExpr', 'getInput', `
        const str = (x) => String(x === true ? 'True' : x === false ? 'False' : x === null ? 'None' : x);
        const int = (x) => parseInt(x, 10);
        const float = (x) => parseFloat(x);
        const bool = (x) => Boolean(x);
        const len = (x) => x ? x.length : 0;
        const input = () => getInput();

        const range = (start, stop, step) => {
          if (stop === undefined) { stop = start; start = 0; }
          if (step === undefined) { step = 1; }
          const arr = [];
          if (step > 0) { for (let i = start; i < stop; i += step) arr.push(i); }
          else { for (let i = start; i > stop; i += step) arr.push(i); }
          return arr;
        };

        const list = (x) => { if (!x) return []; if (Array.isArray(x)) return [...x]; if (typeof x === 'string') return x.split(''); return Array.from(x); };
        const tuple = (x) => list(x);
        const map = (fn, iterable) => (Array.isArray(iterable) ? iterable : Array.from(iterable)).map(fn);
        const filter = (fn, iterable) => (Array.isArray(iterable) ? iterable : Array.from(iterable)).filter(fn);
        const zip = (...arrs) => { const len = Math.min(...arrs.map(a=>a.length)); const result=[]; for(let i=0;i<len;i++) result.push(arrs.map(a=>a[i])); return result; };
        const sorted = (arr) => { const copy=[...arr]; copy.sort((a,b)=>a>b?1:-1); return copy; };
        const reversed = (arr) => [...arr].reverse();
        const sum = (arr) => arr.reduce((a,b)=>a+b, 0);
        const min = (...args) => { const arr = args.length===1&&Array.isArray(args[0])?args[0]:args; return Math.min(...arr); };
        const max = (...args) => { const arr = args.length===1&&Array.isArray(args[0])?args[0]:args; return Math.max(...arr); };
        const abs = (x) => Math.abs(x);
        const round = (x, n) => n !== undefined ? parseFloat(x.toFixed(n)) : Math.round(x);
${uniqueKeys.map(k => {
          const v = scope[k] !== undefined ? scope[k] : env[k];
          if (v && v.type === 'function') {
            return `const ${k} = (...args) => {
              const localEnv = { ...scope };
              const params = env['${k}'].params;
              for (let idx = 0; idx < params.length; idx++) {
                let p = params[idx];
                if (p.startsWith('**')) {
                  let kwName = p.slice(2);
                  localEnv[kwName] = (args[idx] !== undefined && typeof args[idx] === 'object') ? args[idx] : {};
                } else if (p.startsWith('*')) {
                  let argName = p.slice(1);
                  localEnv[argName] = args.slice(idx);
                } else {
                  localEnv[p] = args[idx];
                }
              }
              const status = execBlock(env['${k}'].body, localEnv);
              return status && status.type === 'return' ? status.value : null;
            };`;
          }
          if (v && v.type === 'lambda') {
            return `const ${k} = (...args) => {
              const localEnv = { ...scope };
              const params = env['${k}'].params;
              for (let idx = 0; idx < params.length; idx++) {
                localEnv[params[idx]] = args[idx];
              }
              return evalExpr(env['${k}'].bodyStr, localEnv);
            };`;
          }
          return `const ${k} = scope['${k}'] !== undefined ? scope['${k}'] : env['${k}'];`;
        }).join('\n')}

        return (${safe});
      `);
      return runner(scope, env, execBlock, evalExpr, getInput);
    } catch(e) {
      throw new Error(`SyntaxError in expression: ${expr}`);
    }
  };

  const parsePrint = (trimLn, scope) => {
    const m = trimLn.match(/^print\((.*)\)$/);
    if (!m) return;
    const inner = m[1];
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

    const printed = args.map(a => {
      const v = evalExpr(a.trim(), scope);
      if (Array.isArray(v)) return JSON.stringify(v);
      if (typeof v === 'object' && v !== null && v.type === undefined) return JSON.stringify(v);
      return v === true ? 'True' : v === false ? 'False' : v === null ? 'None' : String(v);
    }).join(' ');

    output.push(printed + '\n');
  };

  function execBlock(nodes, scope = env) {
    for (const node of nodes) {
      totalInstructions++;
      if (totalInstructions > instructionLimit) {
        throw new Error("TimeLimitExceeded: Maximum instruction limit reached.");
      }

      if (node.type === 'def') {
        env[node.name] = {
          type: 'function',
          params: node.params,
          body: node.body
        };
      } else if (node.type === 'return') {
        const val = evalExpr(node.expr, scope);
        return { type: 'return', value: val };
      } else if (node.type === 'assign') {
        const { name, op, expr } = node;
        let val = evalExpr(expr, scope);
        
        const itemMatch = name.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
        if (itemMatch) {
          const varName = itemMatch[1];
          const key = evalExpr(itemMatch[2], scope);
          const obj = scope[varName] !== undefined ? scope[varName] : env[varName];
          if (obj && typeof obj === 'object') {
            obj[key] = val;
          }
        } else {
          if (op !== '=') {
            const cur = scope[name] !== undefined ? scope[name] : (env[name] !== undefined ? env[name] : 0);
            if (op === '+=') val = cur + val;
            else if (op === '-=') val = cur - val;
          }
          scope[name] = val;
          if (scope === env) {
            env[name] = val;
          }
        }
      } else if (node.type === 'print') {
        parsePrint(node.line, scope);
      } else if (node.type === 'break') {
        return 'break';
      } else if (node.type === 'continue') {
        return 'continue';
      } else if (node.type === 'pass') {
        // no-op
      } else if (node.type === 'expr') {
        evalExpr(node.expr, scope);
      } else if (node.type === 'if') {
        const condVal = Boolean(evalExpr(node.cond, scope));
        let branchMatched = false;
        if (condVal) {
          const status = execBlock(node.body, scope);
          if (status) return status;
          branchMatched = true;
        } else {
          for (const elif of node.elifs) {
            if (Boolean(evalExpr(elif.cond, scope))) {
              const status = execBlock(elif.body, scope);
              if (status) return status;
              branchMatched = true;
              break;
            }
          }
        }
        if (!branchMatched && node.else_body) {
          const status = execBlock(node.else_body, scope);
          if (status) return status;
        }
      } else if (node.type === 'for') {
        const items = evalExpr(node.iterExpr, scope);
        if (Array.isArray(items) || typeof items === 'string') {
          for (const item of items) {
            scope[node.varName] = item;
            const status = execBlock(node.body, scope);
            if (status === 'break') break;
            if (status === 'continue') continue;
            if (status) return status;
          }
        }
      } else if (node.type === 'while') {
        while (Boolean(evalExpr(node.cond, scope))) {
          const status = execBlock(node.body, scope);
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
        style={{ width:'100%', minHeight:'180px', background:'#0d1b2a', color:'#e2e8f0', fontFamily:'monospace', fontSize:'0.89rem', lineHeight:1.8, padding:'1.1rem', border:'none', outline:'none', resize:'vertical', borderBottom:'1px solid #1e293b', boxSizing:'border-box' }}/>
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
  { q:"Which Python keyword is used to declare a function?", opts:["function","fun","def","declare"], ans:2, exp:"The 'def' keyword is short for 'define' and is used to declare a user-defined function in Python." },
  { q:"What is the purpose of the return statement?", opts:["To exit a loop","To send a value back to the caller","To print output","To call another function"], ans:1, exp:"The 'return' statement exits the function and sends a result back to the block that called it." },
  { q:"What are the inputs passed inside function parentheses called?", opts:["Parameters","Outputs","Headers","Comments"], ans:0, exp:"Inputs in a function declaration are parameters, and values passed during a call are arguments." },
  { q:"What is an anonymous function called in Python?", opts:["def function","inline function","lambda function","recursive function"], ans:2, exp:"Lambda functions are anonymous, single-line functions created using the 'lambda' keyword." },
  { q:"What is it called when a function calls itself?", opts:["Iteration","Looping","Recursion","Abstraction"], ans:2, exp:"Recursion is a programming technique where a function solves a problem by calling itself." },
  { q:"What does *args receive inside a function definition?", opts:["A List","A Tuple","A Dictionary","An Integer"], ans:1, exp:"*args receives any number of positional arguments grouped into a Tuple." },
  { q:"What does **kwargs receive inside a function definition?", opts:["A Tuple","A Set","A Dictionary","A String"], ans:2, exp:"**kwargs collects arbitrary keyword arguments grouped into a Dictionary." },
  { q:"What is the default return value of a function if there is no return statement?", opts:["0","None","False","Error"], ans:1, exp:"Python functions implicitly return 'None' if no return statement is executed." },
  { q:"Which of the following is a built-in Python function?", opts:["greet()","len()","factorial()","add()"], ans:1, exp:"len() is a built-in function that returns the length of a string, list, tuple, etc." },
  { q:"In recursion, what prevents the function from calling itself infinitely?", opts:["The stack overflow","The loop control","The base case","The return type"], ans:2, exp:"The base case contains a simple condition that exits the recursion without making a self-call." },
  { q:"What is the output of: x = lambda a : a + 10; print(x(5))?", opts:["5","10","15","Error"], ans:2, exp:"The lambda adds 10 to its argument, so 5 + 10 evaluates to 15." },
  { q:"Where are variables defined inside a function accessible?", opts:["Everywhere (Global)","Only inside that function (Local)","Only inside loops","Nowhere"], ans:1, exp:"Variables declared inside a function have a local scope and cannot be accessed outside the function." }
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PythonDay6({ activeTab, onNavigate }) {
  const [quizAnswers, setQuizAnswers]     = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const nav = (tab) => { onNavigate('python_day6', tab); window.scrollTo({ top:0, behavior:'smooth' }); };
  const quizScore = quizData.reduce((a, q, i) => a + (quizAnswers[i] === q.ans ? 1 : 0), 0);

  return (
    <AnimatePresence mode="wait">

      {/* ─── TAB 1: INTRO ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 6 • Overview" title="Introduction to Functions">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3b8a,#1d4ed8)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.6rem', margin:'0 0 1rem', fontWeight:800 }}>Modularity and Reuse</h3>
              <p style={{ color:'#bfdbfe', lineHeight:1.7, margin:0, fontSize:'1.05rem' }}>
                A <strong>function</strong> is a reusable block of code designed to perform a specific task. By wrapping code inside functions, you avoid duplication (DRY: Don't Repeat Yourself), make programs modular, and build clean abstractions.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>⚙️ Input parameters</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.88rem', lineHeight:1.5 }}>
                  Functions accept inputs known as <strong>parameters</strong> or arguments. These let the function behave dynamically.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>📦 Return Output</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.88rem', lineHeight:1.5 }}>
                  Functions execute calculations and pass the result back using the <code>return</code> keyword.
                </p>
              </div>
            </div>

            <Playground
              id="intro"
              title="Interactive Function Overview"
              defaultCode={`# A simple greeting function
def greet(name):
    return "Hello " + name + "!"

# Call the function
msg = greet("Priya")
print(msg)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('builtin')}>Next: Built-in Functions <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: BUILT-IN FUNCTIONS ─── */}
      {activeTab === 'builtin' && (
        <Section key="builtin" eyebrow="Day 6 • Built-in" title="Python Built-in Functions">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              Python comes with a rich set of pre-defined functions that are always available for use without any setup.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'1rem', marginBottom:'2rem' }}>
              {[
                { name:'print()',  desc:'Outputs text to the terminal.' },
                { name:'len()',    desc:'Returns length of lists, tuples, or strings.' },
                { name:'input()',  desc:'Requests string keyboard input from user.' },
                { name:'int()',    desc:'Converts values to integers.' },
                { name:'float()',  desc:'Converts values to decimal floats.' },
                { name:'str()',    desc:'Converts variables to string characters.' }
              ].map(f => (
                <div key={f.name} style={{ background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'1rem' }}>
                  <code style={{ color:'#0f172a', fontWeight:700, fontSize:'0.9rem' }}>{f.name}</code>
                  <p style={{ color:'#475569', margin:'0.3rem 0 0 0', fontSize:'0.82rem', lineHeight:1.4 }}>{f.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock title="builtin_usage.py">
              text = {st('"Learning Python"')}<br/>
              length = {fn('len')}(text)<br/>
              {fn('print')}({st('"Length:"')}, length) {ok('# Length: 15')}<br/><br/>
              number = {fn('int')}({st('"45"')})<br/>
              {fn('print')}(number + {nm('5')}) {ok('# 50')}
            </CodeBlock>

            <Playground
              id="builtin_play"
              title="Testing Built-ins"
              defaultCode={`word = "Python"
print("Length of word :", len(word))

val = float("12.5")
print("Float addition :", val + 2.5)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('user_defined')}>Next: User-Defined <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: USER-DEFINED FUNCTIONS ─── */}
      {activeTab === 'user_defined' && (
        <Section key="user_defined" eyebrow="Day 6 • User-Defined" title="User-Defined Functions">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              You declare your own functions using the <code>def</code> keyword, followed by the function name, parameter inputs, and a colon.
            </p>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>📌 Parameters vs Arguments</h3>
            <ul style={{ color:'#475569', lineHeight:1.6, paddingLeft:'20px', fontSize:'0.92rem', marginBottom:'2rem' }}>
              <li><strong>Parameters</strong>: The variables listed in the function definition (e.g. <code>x, y</code>).</li>
              <li><strong>Arguments</strong>: The actual values sent to the function when called (e.g. <code>5, 10</code>).</li>
            </ul>

            <CodeBlock title="custom_functions.py">
              {kw('def')} {fn('add_numbers')}(num1, num2):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;result = num1 + num2<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} result<br/><br/>
              {c('# Call function')}<br/>
              sum_val = {fn('add_numbers')}({nm('20')}, {nm('30')})<br/>
              {fn('print')}(sum_val) {ok('  # 50')}
            </CodeBlock>

            <Playground
              id="user_defined_play"
              title="Play with User-Defined Functions"
              defaultCode={`def calculate_square(number):
    return number * number

ans = calculate_square(6)
print("Square of 6 is:", ans)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('lambda_tab')}>Next: Lambda Functions <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: LAMBDA FUNCTIONS ─── */}
      {activeTab === 'lambda_tab' && (
        <Section key="lambda" eyebrow="Day 6 • Lambda" title="Lambda Functions & The map() Function">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              A <strong>lambda function</strong> is a small, anonymous (nameless) function defined using the <code>lambda</code> keyword. It can take any number of arguments, but can only have **one single expression**.
            </p>

            <div style={{ background:'#eff6ff', borderRadius:'12px', padding:'1.3rem', border:'1px solid #bfdbfe', marginBottom:'2rem' }}>
              <h4 style={{ margin:'0 0 0.5rem', color:'#1e3a8a' }}>✂️ Syntax:</h4>
              <code style={{ background:'#ffffff', color:'#1d4ed8', padding:'0.3rem 0.6rem', borderRadius:'6px', display:'inline-block', fontSize:'0.95rem' }}>
                lambda arguments : expression
              </code>
            </div>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>✨ 1. Simple Lambda Example</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Here is how a standard function compares to a single-line anonymous lambda function:
            </p>
            <CodeBlock title="simple_lambda.py">
              {c('# Regular function declaration')}<br/>
              {kw('def')} {fn('add_ten')}(a):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} a + {nm('10')}<br/><br/>
              {c('# Equivalent anonymous lambda')}<br/>
              quick_add = {kw('lambda')} a : a + {nm('10')}<br/><br/>
              {fn('print')}(quick_add({nm('5')})) {ok('# 15')}
            </CodeBlock>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🗺️ 2. The map() Function with Lambda</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              The built-in <code>map()</code> function applies a function (like a lambda) to all elements in an iterable (like a list) and returns a map object, which is typically converted back into a list using <code>list()</code>.
            </p>

            <CodeBlock title="lambda_and_map.py">
              numbers = [{nm('1')}, {nm('2')}, {nm('3')}, {nm('4')}]<br/><br/>
              {c('# Double every number using map and lambda')}<br/>
              doubled = {fn('list')}({fn('map')}({kw('lambda')} x : x * {nm('2')}, numbers))<br/>
              {fn('print')}(doubled) {ok('# [2, 4, 6, 8]')}
            </CodeBlock>

            <Playground
              id="lambda_play"
              title="Test Lambda Expressions & map()"
              defaultCode={`# 1. Standard Lambda call
double = lambda a : a * 2
print("Double of 10 :", double(10))

# 2. Applying map() with lambda
my_list = [1, 2, 3, 4]
squared_list = list(map(lambda x : x * x, my_list))
print("Squared List :", squared_list)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('recursion')}>Next: Recursion <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: RECURSION ─── */}
      {activeTab === 'recursion' && (
        <Section key="recursion" eyebrow="Day 6 • Recursion" title="Recursive Functions">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              A function is **recursive** if it calls itself. Recursion splits a large task into smaller sub-problems.
            </p>

            <div style={{ background:'#fee2e2', borderLeft:'4px solid #ef4444', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#991b1b', lineHeight:1.7, fontSize:'0.95rem' }}>
                ⚠️ <strong>The Base Case Rule:</strong><br/>
                Every recursive function <strong>must</strong> have a base case (a condition to stop the recursion). Without a base case, the function will loop infinitely and crash due to a Stack Overflow.
              </p>
            </div>

            <CodeBlock title="factorial_recursion.py">
              {kw('def')} {fn('factorial')}(n):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Base Case')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} n &lt;= {nm('1')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {nm('1')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Recursive Case')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} n * {fn('factorial')}(n - {nm('1')})<br/><br/>
              {fn('print')}({fn('factorial')}({nm('3')})) {ok('# 6')}
            </CodeBlock>

            {/* Visual Trace Flowchart */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.8rem' }}>📊 Visualizing Recursion Flow: factorial(3)</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Think of recursion as two phases: first, we break the problem down into smaller calls (Winding), and once we hit the base case, we pass the results back up to calculate the final answer (Unwinding).
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'2rem', marginBottom:'2.5rem' }}>
              {/* Winding Phase */}
              <div style={{ background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:'14px', padding:'1.5rem' }}>
                <h4 style={{ color:'#1e3a8a', margin:'0 0 1rem 0', display:'flex', alignItems:'center', gap:'6px', fontWeight:700 }}>
                  <span>📥</span> Phase 1: Winding (Calling Down)
                </h4>
                
                <div style={{ display:'flex', flexDirection:'column', gap:'0.8rem', alignItems:'center' }}>
                  <div style={{ background:'white', border:'1px solid #93c5fd', padding:'0.75rem 1.2rem', borderRadius:'8px', width:'100%', textAlign:'center' }}>
                    <strong style={{ color:'#1e40af' }}>factorial(3)</strong>
                    <div style={{ fontSize:'0.8rem', color:'#64748b', marginTop:'0.2rem' }}>Needs 3 * factorial(2)</div>
                  </div>
                  <div style={{ color:'#60a5fa', fontSize:'1.2rem', transform:'rotate(90deg)', fontWeight:700 }}>➜</div>
                  <div style={{ background:'white', border:'1px solid #93c5fd', padding:'0.75rem 1.2rem', borderRadius:'8px', width:'100%', textAlign:'center' }}>
                    <strong style={{ color:'#1e40af' }}>factorial(2)</strong>
                    <div style={{ fontSize:'0.8rem', color:'#64748b', marginTop:'0.2rem' }}>Needs 2 * factorial(1)</div>
                  </div>
                  <div style={{ color:'#60a5fa', fontSize:'1.2rem', transform:'rotate(90deg)', fontWeight:700 }}>➜</div>
                  <div style={{ background:'#d1fae5', border:'1px solid #34d399', padding:'0.75rem 1.2rem', borderRadius:'8px', width:'100%', textAlign:'center' }}>
                    <strong style={{ color:'#065f46' }}>factorial(1)</strong>
                    <div style={{ fontSize:'0.8rem', color:'#065f46', marginTop:'0.2rem', fontWeight:600 }}>🌟 Base Case Hit! Returns 1</div>
                  </div>
                </div>
              </div>

              {/* Unwinding Phase */}
              <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'14px', padding:'1.5rem' }}>
                <h4 style={{ color:'#166534', margin:'0 0 1rem 0', display:'flex', alignItems:'center', gap:'6px', fontWeight:700 }}>
                  <span>📤</span> Phase 2: Unwinding (Returning Up)
                </h4>

                <div style={{ display:'flex', flexDirection:'column', gap:'0.8rem', alignItems:'center' }}>
                  <div style={{ background:'white', border:'1px solid #86efac', padding:'0.75rem 1.2rem', borderRadius:'8px', width:'100%', textAlign:'center' }}>
                    <strong style={{ color:'#14532d' }}>factorial(3) = 6</strong>
                    <div style={{ fontSize:'0.8rem', color:'#166534', marginTop:'0.2rem', fontWeight:600 }}>Calculates: 3 * 2</div>
                  </div>
                  <div style={{ color:'#34d399', fontSize:'1.2rem', transform:'rotate(-90deg)', fontWeight:700 }}>➜</div>
                  <div style={{ background:'white', border:'1px solid #86efac', padding:'0.75rem 1.2rem', borderRadius:'8px', width:'100%', textAlign:'center' }}>
                    <strong style={{ color:'#14532d' }}>factorial(2) = 2</strong>
                    <div style={{ fontSize:'0.8rem', color:'#166534', marginTop:'0.2rem', fontWeight:600 }}>Calculates: 2 * 1</div>
                  </div>
                  <div style={{ color:'#34d399', fontSize:'1.2rem', transform:'rotate(-90deg)', fontWeight:700 }}>➜</div>
                  <div style={{ background:'#d1fae5', border:'1px solid #34d399', padding:'0.75rem 1.2rem', borderRadius:'8px', width:'100%', textAlign:'center' }}>
                    <strong style={{ color:'#065f46' }}>factorial(1) = 1</strong>
                    <div style={{ fontSize:'0.8rem', color:'#065f46', marginTop:'0.2rem' }}>Bubbles up: 1</div>
                  </div>
                </div>
              </div>
            </div>

            <Playground
              id="recursion_play"
              title="Play with Recursion"
              defaultCode={`# Countdown recursive function
def countdown(n):
    if n <= 0:
        return "Liftoff!"
    return str(n) + "..." + countdown(n - 1)

print(countdown(5))`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('args_kwargs')}>Next: *args & **kwargs <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: ARGS & KWARGS ─── */}
      {activeTab === 'args_kwargs' && (
        <Section key="args_kwargs" eyebrow="Day 6 • Arguments" title="*args and **kwargs in Python">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              What if you don't know beforehand how many arguments a user might pass into your function? Python provides <code>*args</code> and <code>**kwargs</code> to handle variable inputs.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem', marginBottom:'2.5rem' }}>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🌟 *args (Non-Keyword Args)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Allows a function to accept any number of positional arguments. The inputs are collected into a **Tuple**.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🔑 **kwargs (Keyword Args)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Allows a function to accept any number of keyword/named arguments. The inputs are collected into a **Dictionary**.
                </p>
              </div>
            </div>

            {/* 1. *args Example */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🌟 1. Positional Arguments (*args)</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Use <code>*args</code> when you want to pass a variable number of positional arguments into a function.
            </p>

            <CodeBlock title="args_example.py">
              {c('# positional arguments list')}<br/>
              {kw('def')} {fn('sum_numbers')}(*args):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;total = {nm('0')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} num {kw('in')} args:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += num<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} total<br/><br/>
              {fn('print')}({fn('sum_numbers')}({nm('5')}, {nm('10')}, {nm('15')})) {ok('# 30')}
            </CodeBlock>

            <Playground
              id="args_play"
              title="Test Variable Positional Arguments (*args)"
              defaultCode={`# A simple multi-greet function
def welcome_users(*args):
    # args represents a tuple of values
    msg = "Welcome: "
    for name in args:
        msg = msg + name + " "
    return msg

print(welcome_users("Amit", "Priya", "Karthik"))`}
            />

            {/* 2. **kwargs Example */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginTop:'2.5rem', marginBottom:'0.5rem' }}>🔑 2. Keyword Arguments (**kwargs)</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Use <code>**kwargs</code> when you want to pass a variable number of keyword (named) arguments. Inside the function, <code>kwargs</code> acts as a <strong>Dictionary</strong> containing parameter names as keys and their values as dictionary values.
            </p>

            <CodeBlock title="kwargs_example.py">
              {c('# keyword arguments dictionary')}<br/>
              {kw('def')} {fn('print_user_profile')}(**kwargs):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} key, value {kw('in')} kwargs.items():<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"{key}: {value}"')})<br/><br/>
              {c('# Call function with named keyword arguments')}<br/>
              {fn('print_user_profile')}(name={st('"Rahul"')}, age={nm('25')}, city={st('"Bangalore"')})<br/><br/>
              {ok('# Output:')}<br/>
              {ok('# name: Rahul')}<br/>
              {ok('# age: 25')}<br/>
              {ok('# city: Bangalore')}
            </CodeBlock>

            <Playground
              id="kwargs_play"
              title="Test Variable Keyword Arguments (**kwargs)"
              defaultCode={`# Function receiving key-value keyword arguments
def display_profile(**kwargs):
    # kwargs is a dictionary of named inputs
    print("User Details:")
    for key in kwargs:
        print(" -", key, ":", kwargs[key])

display_profile(name="Priya", role="Developer", status="Active")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('practice')}>Next: Expense Tracker Project <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 7: EXPENSE TRACKER COMPONENT ─── */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 6 • Capstone" title="💼 Expense Tracker Application">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0369a1)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.5rem', margin:'0 0 0.8rem', fontWeight:800 }}>Day 6 Project: Expense Tracker</h3>
              <p style={{ color:'#bae6fd', margin:0, lineHeight:1.7 }}>
                Build an application that uses **functions** to add expenses, calculate totals, and print records in a modular format.
              </p>
            </div>

            <CodeBlock title="expense_tracker_modular.py">
              expenses = []<br/><br/>
              {kw('def')} {fn('add_expense')}(category, amount):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;expenses.append({'{'}{st('"category"')}: category, {st('"amount"')}: amount{'}'})<br/><br/>
              {kw('def')} {fn('get_total_expenses')}():<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;total = {nm('0')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} item {kw('in')} expenses:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += item[{st('"amount"')}]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} total<br/><br/>
              {c('# Simulate Adding entries')}<br/>
              {fn('add_expense')}({st('"Food"')}, {nm('150')})<br/>
              {fn('add_expense')}({st('"Travel"')}, {nm('300')})<br/>
              {fn('print')}({st('"Total Spent:"')}, {fn('get_total_expenses')}()) {ok('# Total Spent: 450')}
            </CodeBlock>

            <Playground
              id="expense_tracker"
              title="Run Expense Tracker Workspace"
              inputs={[
                { label:'Category =', default:'Food', width:'120px' },
                { label:'Amount =', default:'180', width:'80px' }
              ]}
              defaultCode={`# Storage for expenses list
expenses_db = []

def add_expense(cat, amt):
    expenses_db.append({"category": cat, "amount": amt})

def show_summary():
    print("Expense Summary:")
    total = 0
    for e in expenses_db:
        print("-", e["category"], ":", e["amount"])
        total += e["amount"]
    print("Grand Total Spent:", total)

# Pre-populate some values
add_expense("Rent", 500)

# Add custom expense from the text boxes above
user_cat = input("Enter Category: ")
user_amt = int(input("Enter Amount: "))

add_expense(user_cat, user_amt)
show_summary()`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('assignment_work')}>Next: Assignment 📝 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 8: ASSIGNMENT ─── */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 6 • Assignment" title="📝 Day 6 Assignment">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2.5rem' }}>
              <h3 style={{ margin:'0 0 0.6rem', fontSize:'1.4rem', fontWeight:800 }}>Rules</h3>
              <p style={{ color:'#bfdbfe', margin:0, lineHeight:1.7 }}>Save your assignment files as <code style={{ color:'#fde68a' }}>day6_assignment.py</code>. Code modular, readable functions using the keywords you learned today.</p>
            </div>

            {[
              { n:1,  t:'Area of Circle',          diff:'Easy',   col:'#10b981', desc:'Write a function calculate_area(radius) that returns the area of a circle. (Area = 3.14 * radius * radius)' },
              { n:2,  t:'Even or Odd checker',     diff:'Easy',   col:'#10b981', desc:'Create a function is_even(num) that returns True if a number is even, and False if it is odd.' },
              { n:3,  t:'Sum of List Elements',    diff:'Easy',   col:'#10b981', desc:'Write a function sum_list(numbers) that accepts a list of integers and returns their sum.' },
              { n:4,  t:'Factorial (Recursion)',   diff:'Medium', col:'#f59e0b', desc:'Write a recursive function recur_factorial(n) that returns the factorial of an integer n.' },
              { n:5,  t:'String Reversal Function',diff:'Medium', col:'#f59e0b', desc:'Write a function reverse_str(text) that returns the reverse of a string.' },
              { n:6,  t:'Fibonacci Number',        diff:'Medium', col:'#f59e0b', desc:'Write a recursive function fibonacci(n) that returns the nth Fibonacci number.' },
              { n:7,  t:'Max of Three numbers',    diff:'Medium', col:'#f59e0b', desc:'Write a function max_of_three(a, b, c) that checks and returns the largest number of the three inputs without using max().' },
              { n:8,  t:'Lambda squaring',         diff:'Medium', col:'#f59e0b', desc:'Create a lambda function that squares a single input value, and print its evaluation for input 12.' },
              { n:9,  t:'Arbitrary positional arguments', diff:'Hard', col:'#ef4444', desc:'Write a function print_grocery_list(*args) that prints each argument passed to it with a bullet point.' },
              { n:10, t:'Check Prime Number',       diff:'Hard',   col:'#ef4444', desc:'Write a function is_prime(n) that returns True if the number is prime, and False if it is not.' }
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
        <Section key="quiz" eyebrow="Day 6 • Assessment" title="🧠 Quiz — Functions">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#4c1d95,#5b21b6)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2rem' }}>
              <h3 style={{ margin:'0 0 0.5rem', fontSize:'1.4rem', fontWeight:800 }}>Test Your Knowledge!</h3>
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
                  {quizScore===quizData.length?'🏆 Perfect! Functions Mastered!':quizScore>=10?'🥇 Excellent Work!':quizScore>=7?'🥈 Good Job! Review answers below.':'📚 Keep studying functions, lambda, and recursion!'}
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
