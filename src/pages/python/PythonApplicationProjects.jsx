import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Cpu, Terminal, Zap, Shield, HelpCircle, Link2, MessageSquare, Timer, Bot, TrendingUp, Activity, AlertTriangle } from 'lucide-react';

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
   PYTHON COMPILER FOR APPLICATION PROJECTS
───────────────────────────────────────────── */
function mergeMultiLineStatements(code) {
  const rawLines = code.split('\n');
  const mergedLines = [];
  let currentLine = '';
  let openParens = 0;
  let openBrackets = 0;
  let openBraces = 0;
  let inStr = false;
  let strChar = '';

  for (let rIdx = 0; rIdx < rawLines.length; rIdx++) {
    const line = rawLines[rIdx];
    
    let idx = 0;
    while (idx < line.length) {
      const c = line[idx];
      if (!inStr && (c === '"' || c === "'")) {
        inStr = true;
        strChar = c;
      } else if (inStr && c === strChar && line[idx - 1] !== '\\') {
        inStr = false;
      } else if (!inStr) {
        if (c === '(') openParens++;
        else if (c === ')') openParens--;
        else if (c === '[') openBrackets++;
        else if (c === ']') openBrackets--;
        else if (c === '{') openBraces++;
        else if (c === '}') openBraces--;
      }
      idx++;
    }

    if (currentLine) {
      currentLine += ' ' + line.trim();
    } else {
      currentLine = line;
    }

    if (openParens <= 0 && openBrackets <= 0 && openBraces <= 0) {
      mergedLines.push(currentLine);
      currentLine = '';
      openParens = 0;
      openBrackets = 0;
      openBraces = 0;
    }
  }
  if (currentLine.trim()) {
    mergedLines.push(currentLine);
  }
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

        if (trimLine.startsWith('try:')) {
          i++;
          const body = parseBlock(baseIndent + 4);
          const handlers = [];
          let finally_body = null;
          
          while (i < lines.length) {
            const nextTrim = lines[i].trim();
            const nextIndent = lines[i].search(/\S/);
            if (nextIndent !== baseIndent) break;
            if (nextTrim.startsWith('except')) {
              const errMatch = nextTrim.match(/^except\s*([a-zA-Z_]\w*)?(?:\s+as\s+([a-zA-Z_]\w*))?\s*:$/);
              const errClass = errMatch ? errMatch[1] || 'Exception' : 'Exception';
              const errVar = errMatch ? errMatch[2] || null : null;
              i++;
              const handlerBody = parseBlock(baseIndent + 4);
              handlers.push({ errClass, errVar, body: handlerBody });
            } else if (nextTrim.startsWith('finally:')) {
              i++;
              finally_body = parseBlock(baseIndent + 4);
              break;
            } else {
              break;
            }
          }
          block.push({ type: 'try', body, handlers, finally_body });
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

        const assignMatch = trimLine.match(/^([a-zA-Z_]\w*(?:\[.+?\])?(?:\s*,\s*[a-zA-Z_]\w*(?:\[.+?\])?)*)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
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
  let inStr = false;
  let strChar = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (!inStr && (c === '"' || c === "'")) {
      inStr = true;
      strChar = c;
      result += c;
      i++;
    } else if (inStr && c === strChar) {
      inStr = false;
      result += c;
      i++;
    } else if (!inStr && c === '(') {
      const prevTrimmed = result.trim();
      const isFuncCall = prevTrimmed && /[a-zA-Z0-9_]/.test(prevTrimmed[prevTrimmed.length - 1]);
      
      let depth = 1;
      let j = i + 1;
      let hasComma = false;
      let innerText = '';
      let subInStr = false;
      let subStrChar = '';
      while (j < text.length && depth > 0) {
        const sc = text[j];
        if (!subInStr && (sc === '"' || sc === "'")) {
          subInStr = true;
          subStrChar = sc;
        } else if (subInStr && sc === subStrChar) {
          subInStr = false;
        }
        if (!subInStr) {
          if (sc === '(') depth++;
          if (sc === ')') depth--;
          if (sc === ',' && depth === 1) hasComma = true;
        }
        if (depth > 0) innerText += sc;
        j++;
      }
      if (hasComma && !isFuncCall) {
        result += '[' + translateTuplesToArrays(innerText) + ']';
      } else {
        result += '(' + translateTuplesToArrays(innerText) + ')';
      }
      i = j;
    } else {
      result += c;
      i++;
    }
  }
  return result;
}

function translateFStrings(text) {
  return text.replace(/[fF](["'])(.*?)\1/g, (match, quote, content) => {
    const jsContent = content.replace(/\{([^{}]+)\}/g, '${$1}');
    return '`' + jsContent + '`';
  });
}

function unpackAssign(targetName, value, targetScope) {
  let nameStr = targetName.trim();
  if (nameStr.startsWith('(') && nameStr.endsWith(')')) {
    nameStr = nameStr.slice(1, -1).trim();
  }
  const parts = splitByTopLevelCommas(nameStr);
  if (parts.length > 1) {
    for (let idx = 0; idx < parts.length; idx++) {
      unpackAssign(parts[idx], value[idx], targetScope);
    }
  } else {
    targetScope[nameStr] = value;
  }
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

    // raw string pattern support
    if (/^r["']/.test(expr)) {
      return expr.slice(2, -1);
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
    safe = translateFStrings(safe);
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
          if (step > 0) {
            for (let i = start; i < stop; i += step) arr.push(i);
          } else {
            for (let i = start; i > stop; i += step) arr.push(i);
          }
          return arr;
        };

        const enumerate = (iterable) => {
          const arr = typeof iterable === 'string' ? iterable.split('') : iterable;
          return arr.map((val, idx) => [idx, val]);
        };

        // Mock random and string libraries
        const string = {
          ascii_letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
          digits: "0123456789",
          punctuation: "!\\"#$%&'()*+,-./:;<=>?@[]^_~{|}"
        };
        const random = {
          choice: (arr) => { if (typeof arr === 'string') return arr[Math.floor(Math.random()*arr.length)]; return arr[Math.floor(Math.random() * arr.length)]; },
          randint: (a, b) => Math.floor(Math.random()*(b-a+1))+a,
          shuffle: (arr) => { for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return null; }
        };

        // Python built-ins
        const list = (x) => { if (x === undefined || x === null) return []; if (Array.isArray(x)) return [...x]; if (typeof x === 'string') return x.split(''); return Array.from(x); };
        const tuple = (x) => list(x);
        const map = (fn, iterable) => (Array.isArray(iterable) ? iterable : Array.from(iterable)).map(fn);
        const filter = (fn, iterable) => (Array.isArray(iterable) ? iterable : Array.from(iterable)).filter(fn);
        const zip = (...arrs) => { const len = Math.min(...arrs.map(a => a.length)); const result = []; for(let i=0;i<len;i++) result.push(arrs.map(a=>a[i])); return result; };
        const sorted = (arr, ...opts) => { const copy = [...arr]; copy.sort((a,b)=>a>b?1:-1); return copy; };
        const reversed = (arr) => [...arr].reverse();
        const sum = (arr) => arr.reduce((a,b)=>a+b, 0);
        const min = (...args) => { const arr = args.length===1&&Array.isArray(args[0])?args[0]:args; return Math.min(...arr); };
        const max = (...args) => { const arr = args.length===1&&Array.isArray(args[0])?args[0]:args; return Math.max(...arr); };
        const abs = (x) => Math.abs(x);
        const round = (x, n) => n !== undefined ? parseFloat(x.toFixed(n)) : Math.round(x);
        const type = (x) => { if (x === null) return 'NoneType'; if (Array.isArray(x)) return 'list'; return typeof x; };
        const set_fn = (arr) => Object.fromEntries([...new Set(arr)].map(x=>[x,true]));
        const dict = (pairs) => { if(Array.isArray(pairs)) return Object.fromEntries(pairs); return pairs||{}; };

        ${uniqueKeys.map(k => {
          const v = scope[k] !== undefined ? scope[k] : env[k];
          if (v && v.type === 'function') {
            return `const ${k} = (...args) => {
              const localEnv = { ...scope };
              const params = env['${k}'].params;
              for (let idx = 0; idx < params.length; idx++) {
                localEnv[params[idx]] = args[idx];
              }
              const status = execBlock(env['${k}'].body, localEnv);
              return status && status.type === 'return' ? status.value : null;
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
      } else if (node.type === 'try') {
        try {
          const status = execBlock(node.body, scope);
          if (status) return status;
        } catch (e) {
          let handled = false;
          const errMsg = e.message;
          for (const handler of node.handlers) {
            if (errMsg.includes(handler.errClass) || handler.errClass === 'Exception') {
              const localEnv = { ...scope };
              if (handler.errVar) {
                localEnv[handler.errVar] = errMsg;
              }
              const status = execBlock(handler.body, localEnv);
              if (status) return status;
              handled = true;
              break;
            }
          }
          if (!handled) {
            throw e;
          }
        } finally {
          if (node.finally_body) {
            execBlock(node.finally_body, scope);
          }
        }
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
          unpackAssign(name, val, scope);
          if (scope === env) {
            unpackAssign(name, val, env);
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
            unpackAssign(node.varName, item, scope);
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

/* ─────────────────────────────────────────────
   LIVE PLAYGROUND COMPONENT
───────────────────────────────────────────── */
function Playground({ id, defaultCode, inputs = [], title = 'Live Python Console' }) {
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
          <span style={{ background:'#10b981', color:'white', fontSize:'0.68rem', padding:'0.1rem 0.5rem', borderRadius:'20px', fontWeight:700 }}>PLAYGROUND</span>
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
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PythonApplicationProjects({ activeTab, onNavigate }) {
  const nav = (tab) => { onNavigate('python_apps', tab); window.scrollTo({ top:0, behavior:'smooth' }); };

  return (
    <AnimatePresence mode="wait">

      {/* ─── TAB 1: INTRO ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Capstone Suite" title="Python 2027 Real-Time Projects">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#0f172a 0%, #1e1b4b 50%, #312e81 100%)', color:'white', padding:'2.2rem', borderRadius:'16px', marginBottom:'2.2rem', boxShadow:'0 10px 25px rgba(49,46,129,0.2)' }}>
              <h3 style={{ fontSize:'1.7rem', margin:'0 0 0.8rem', fontWeight:900, color:'#a5b4fc' }}>⚡ 2027 Real-Time Python Engineering Suite</h3>
              <p style={{ color:'#e0e7ff', lineHeight:1.8, margin:0, fontSize:'1.05rem' }}>
                Welcome to the modern 2027 Application Projects suite. In real-world software engineering, functions are the fundamental building blocks of production systems. Here, you will build and run <strong>5 production-grade, real-time functional applications</strong> spanning Generative AI, IoT Edge Telemetry, Quantitative FinTech, Zero-Trust Cybersecurity, and Clinical HealthTech.
              </p>
            </div>

            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              Explore the 5 industry-trend projects below. Each project is constructed using modular, single-responsibility Python functions:
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.3rem', marginBottom:'2rem' }}>
              {[
                { title:'🤖 AI Token & Cost Optimizer', icon:<Bot size={20} color="#3b82f6"/>, desc:'Estimates prompt tokens, computes multi-LLM API pricing, and dynamically routes requests to the most cost-efficient model within budget.' },
                { title:'⚡ IoT Telemetry & Anomaly Detector', icon:<Zap size={20} color="#f59e0b"/>, desc:'Ingests live multi-sensor streams, validates payload integrity, calculates baselines, and triggers automated emergency coolant flushes.' },
                { title:'📈 Algorithmic Trade Signal Engine', icon:<TrendingUp size={20} color="#10b981"/>, desc:'Computes short vs. long moving averages, identifies golden crosses, calculates position sizing, and triggers automated buy/sell orders.' },
                { title:'🛡️ Zero-Trust Security & IP Rate Limiter', icon:<Shield size={20} color="#8b5cf6"/>, desc:'Implements token-bucket rate limiting, analyzes brute-force login anomalies, and dynamically enforces ALLOW, THROTTLE, or BLOCK firewall rules.' },
                { title:'🏥 HealthTech Real-Time Vitals Triage', icon:<Activity size={20} color="#ec4899"/>, desc:'Calculates National Early Warning Scores (NEWS2) from streaming ICU vitals to trigger emergency physician escalation.' }
              ].map((proj, i) => (
                <div key={i} style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0', display:'flex', gap:'12px', transition:'transform 0.2s' }}>
                  <div style={{ background:'white', borderRadius:'10px', padding:'0.6rem', border:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', height:'fit-content' }}>
                    {proj.icon}
                  </div>
                  <div>
                    <h4 style={{ margin:'0 0 0.4rem 0', color:'#0f172a', fontSize:'1rem' }}>{proj.title}</h4>
                    <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.5 }}>{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('ai_token_optimizer')}>Next: AI Token & Cost Optimizer <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: AI TOKEN & COST OPTIMIZER ─── */}
      {(activeTab === 'ai_token_optimizer' || activeTab === 'password_gen') && (
        <Section key="ai_token_optimizer" eyebrow="Project 1 • AI & FinOps" title="🤖 AI Token & Cost Optimizer">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              In modern 2027 enterprise AI engineering, LLM API costs scale rapidly. This real-time application uses modular functions to estimate token consumption, calculate cost across frontier models (GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash), and route execution to the optimal model that strictly respects your financial budget.
            </p>

            <CodeBlock title="ai_token_optimizer.py — Modular Token Estimation & Model Routing">
              {c('# Function 1: Estimate tokens from character count')}<br/>
              {kw('def')} {fn('estimate_tokens')}(text):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;words = {fn('len')}(text)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;approx_tokens = {fn('int')}(words / {nm('4')}) + {nm('1')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} approx_tokens<br/><br/>

              {c('# Function 2: Calculate model API cost per 1K tokens')}<br/>
              {kw('def')} {fn('calculate_cost')}(model, tokens):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;rate = {nm('0.001')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} model == {st('"Gemini_2_Flash"')}: rate = {nm('0.0001')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} model == {st('"Claude_3_Sonnet"')}: rate = {nm('0.003')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} model == {st('"GPT_4o"')}: rate = {nm('0.010')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} (tokens / {nm('1000')}) * rate<br/><br/>

              {c('# Function 3: High-level routing orchestrator')}<br/>
              {kw('def')} {fn('route_best_model')}(prompt, budget):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;tokens = {fn('estimate_tokens')}(prompt)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Evaluate models against budget constraint...')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} selected_model
            </CodeBlock>

            <Playground
              id="ai_token_optimizer_play"
              title="Execute AI Token & Cost Optimizer"
              inputs={[
                { label:'Prompt Text =', default:'Summarize customer support transcript and classify urgency', width:'340px' },
                { label:'Budget ($) =', default:'0.0005', width:'80px' }
              ]}
              defaultCode={`def estimate_tokens(text):
    words = len(text)
    approx_tokens = int(words / 4) + 1
    return approx_tokens

def calculate_cost(model, tokens):
    rate = 0.001
    if model == "Gemini_2_Flash":
        rate = 0.0001
    elif model == "Claude_3_Sonnet":
        rate = 0.003
    elif model == "GPT_4o":
        rate = 0.010
    cost = (tokens / 1000) * rate
    return cost

def route_best_model(prompt, budget):
    tokens = estimate_tokens(prompt)
    print("--- 🤖 AI Token & Cost Optimizer ---")
    print("Input Prompt Length:", len(prompt), "chars")
    print("Estimated Token Count:", tokens, "tokens")
    print("Available Budget: $" + str(budget))
    print()
    
    models = ["GPT_4o", "Claude_3_Sonnet", "Gemini_2_Flash"]
    selected = "None"
    for m in models:
        cost = calculate_cost(m, tokens)
        print("Model:", m, "-> Est. Cost: $" + str(round(cost, 6)))
        if cost <= budget and selected == "None":
            selected = m

    print()
    if selected != "None":
        print("✅ Optimal Route Selected:", selected)
    else:
        print("⚠️ Budget exceeded! Consider shortening your prompt.")

prompt_input = input("Enter prompt: ")
budget_limit = float(input("Budget: "))
route_best_model(prompt_input, budget_limit)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('iot_anomaly_detector')}>Next: IoT Anomaly Detector <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: IOT ANOMALY DETECTOR ─── */}
      {(activeTab === 'iot_anomaly_detector' || activeTab === 'quiz_app') && (
        <Section key="iot_anomaly_detector" eyebrow="Project 2 • Edge AI & IoT" title="⚡ Real-Time IoT Telemetry & Anomaly Detector">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Connected smart devices and industrial IoT edge sensors transmit telemetry data continuously. This application validates packet payloads, performs threshold difference calculations, and triggers automated alerts to prevent hardware meltdowns.
            </p>

            <CodeBlock title="iot_anomaly_detector.py — Sensor Ingestion & Alert Dispatch">
              {c('# Function 1: Telemetry packet validation')}<br/>
              {kw('def')} {fn('validate_packet')}(sensor_id, temp, vibration):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {fn('len')}(sensor_id) &lt; {nm('3')}: {kw('return')} {kw('False')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} temp &lt; -{nm('50')} {kw('or')} temp &gt; {nm('150')}: {kw('return')} {kw('False')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {kw('True')}<br/><br/>

              {c('# Function 2: Anomaly threshold comparison')}<br/>
              {kw('def')} {fn('check_anomaly')}(temp, max_temp):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} temp &gt; max_temp<br/><br/>

              {c('# Function 3: Incident response dispatcher')}<br/>
              {kw('def')} {fn('dispatch_alert')}(sensor_id, temp, is_critical):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} is_critical:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"🚨 CRITICAL OVERHEAT! Initiating coolant flush."')})
            </CodeBlock>

            <Playground
              id="iot_anomaly_detector_play"
              title="Stream Simulated IoT Sensor Data"
              inputs={[
                { label:'Sensor ID =', default:'SENS-TURBINE-04', width:'150px' },
                { label:'Temp (°C) =', default:'88.5', width:'70px' },
                { label:'Vibration =', default:'1.8', width:'60px' },
                { label:'Max Safe Temp =', default:'75.0', width:'70px' }
              ]}
              defaultCode={`def validate_packet(sensor_id, temp, vibration):
    if len(sensor_id) < 3:
        return False
    if temp < -50 or temp > 150:
        return False
    return True

def check_anomaly(temp, max_temp):
    if temp > max_temp:
        return True
    return False

def dispatch_alert(sensor_id, temp, is_critical):
    if is_critical:
        print("🚨 [CRITICAL ALERT] Sensor", sensor_id, "OVERHEAT! Temp:", temp, "C")
        print("Action: Initiating Automated Coolant Flush & SMS to Engineer...")
    else:
        print("✅ [TELEMETRY OK] Sensor", sensor_id, "operating normal at", temp, "C")

def process_sensor_stream(sensor_id, temp, vibration, limit):
    print("--- ⚡ IoT Edge Telemetry Stream ---")
    if not validate_packet(sensor_id, temp, vibration):
        print("❌ Packet corrupted! Dropping invalid telemetry frame.")
        return
    
    anomaly = check_anomaly(temp, limit)
    dispatch_alert(sensor_id, temp, anomaly)

s_id = input("Sensor ID: ")
current_t = float(input("Current Temp (C): "))
vib = float(input("Vibration: "))
threshold = float(input("Max Safe Temp: "))

process_sensor_stream(s_id, current_t, vib, threshold)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('algo_trade_engine')}>Next: Algo Trade Signal Engine <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: ALGO TRADE SIGNAL ENGINE ─── */}
      {(activeTab === 'algo_trade_engine' || activeTab === 'url_shortener') && (
        <Section key="algo_trade_engine" eyebrow="Project 3 • Quantitative FinTech" title="📈 Real-Time Algorithmic Trade Signal Engine">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              FinTech quant desks execute trades algorithmically based on statistical indicators. This project uses functions to compute moving average trends, evaluate trend crossovers, size position risk to a strict 2% account capital rule, and set stop-loss protection.
            </p>

            <CodeBlock title="algo_trade_engine.py — Moving Averages & Risk Sizing">
              {c('# Function 1: Mathematical moving average')}<br/>
              {kw('def')} {fn('calculate_average')}(prices):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {fn('len')}(prices) == {nm('0')}: {kw('return')} {nm('0')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {fn('sum')}(prices) / {fn('len')}(prices)<br/><br/>

              {c('# Function 2: Trend signal evaluation')}<br/>
              {kw('def')} {fn('evaluate_trade_signal')}(short_ma, long_ma, current_price):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} short_ma &gt; long_ma {kw('and')} current_price &gt;= short_ma: {kw('return')} {st('"BUY"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} short_ma &lt; long_ma {kw('and')} current_price &lt;= short_ma: {kw('return')} {st('"SELL"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"HOLD"')}<br/><br/>

              {c('# Function 3: Strict risk management & position sizing')}<br/>
              {kw('def')} {fn('calculate_position')}(capital, risk_pct, entry, stop_loss):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;risk_dollars = capital * (risk_pct / {nm('100')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;risk_per_share = {fn('abs')}(entry - stop_loss)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {fn('int')}(risk_dollars / risk_per_share)
            </CodeBlock>

            <Playground
              id="algo_trade_engine_play"
              title="Run Algorithmic Trade Engine"
              inputs={[
                { label:'Ticker =', default:'NVDA', width:'70px' },
                { label:'Capital ($) =', default:'10000', width:'90px' },
                { label:'Price ($) =', default:'145.50', width:'80px' },
                { label:'Stop Loss ($) =', default:'140.00', width:'80px' }
              ]}
              defaultCode={`def calculate_average(prices):
    if len(prices) == 0:
        return 0
    total = sum(prices)
    return total / len(prices)

def evaluate_trade_signal(short_ma, long_ma, current_price):
    if short_ma > long_ma and current_price >= short_ma:
        return "BUY"
    elif short_ma < long_ma and current_price <= short_ma:
        return "SELL"
    else:
        return "HOLD"

def calculate_position(capital, risk_pct, entry, stop_loss):
    risk_dollars = capital * (risk_pct / 100)
    risk_per_share = abs(entry - stop_loss)
    if risk_per_share == 0:
        return 0
    shares = int(risk_dollars / risk_per_share)
    return shares

def run_trading_bot(symbol, capital, current_price, stop_loss):
    print("--- 📈 FinTech Quantitative Trade Engine ---")
    print("Asset Symbol:", symbol)
    print("Portfolio Capital: $" + str(capital))
    print("Current Price: $" + str(current_price))
    
    short_ticks = [current_price * 0.98, current_price * 0.99, current_price]
    long_ticks = [current_price * 0.94, current_price * 0.95, current_price * 0.96]
    
    short_ma = calculate_average(short_ticks)
    long_ma = calculate_average(long_ticks)
    
    print("Short-Term MA (3 ticks): $" + str(round(short_ma, 2)))
    print("Long-Term MA (3 ticks):  $" + str(round(long_ma, 2)))
    
    signal = evaluate_trade_signal(short_ma, long_ma, current_price)
    print("Generated Signal: " + signal)
    
    if signal == "BUY":
        shares = calculate_position(capital, 2.0, current_price, stop_loss)
        target = current_price + (abs(current_price - stop_loss) * 2)
        print("Risk Management: 2% Risk -> Order Size:", shares, "units")
        print("Target: $" + str(round(target, 2)) + " | Stop Loss: $" + str(round(stop_loss, 2)))

sym = input("Ticker: ")
cap = float(input("Capital: "))
price = float(input("Price: "))
sl = float(input("Stop Loss: "))

run_trading_bot(sym, cap, price, sl)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('rate_limiter')}>Next: Zero-Trust Rate Limiter <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: ZERO-TRUST RATE LIMITER ─── */}
      {(activeTab === 'rate_limiter' || activeTab === 'chat_app') && (
        <Section key="rate_limiter" eyebrow="Project 4 • Cloud Cybersecurity" title="🛡️ Zero-Trust Security Threat & IP Rate Limiter">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Modern API Gateways and microservices must protect against botnet DDoS floods and credential stuffing attacks. This project implements the token-bucket algorithm, calculates behavioral threat scores, and enforces automated firewall responses.
            </p>

            <CodeBlock title="zero_trust_rate_limiter.py — Token Bucket & Anomaly Defense">
              {c('# Function 1: Token-bucket algorithm check')}<br/>
              {kw('def')} {fn('check_token_bucket')}(tokens, cost):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} tokens &gt;= cost<br/><br/>

              {c('# Function 2: Threat risk score calculator')}<br/>
              {kw('def')} {fn('compute_threat_score')}(failed_attempts, rps):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;score = failed_attempts * {nm('25')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} rps &gt; {nm('100')}: score = score + {nm('50')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} score<br/><br/>

              {c('# Function 3: Dynamic firewall policy enforcement')}<br/>
              {kw('def')} {fn('evaluate_firewall_rule')}(threat_score, bucket_passed):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} threat_score &gt;= {nm('75')}: {kw('return')} {st('"BLOCKED (403 Botnet)"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {kw('not')} bucket_passed: {kw('return')} {st('"THROTTLED (429 Rate Limit)"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"ALLOWED (200 OK)"')}
            </CodeBlock>

            <Playground
              id="rate_limiter_play"
              title="Test Gateway Security Inspector"
              inputs={[
                { label:'Client IP =', default:'192.168.1.105', width:'130px' },
                { label:'Bucket Tokens =', default:'10', width:'60px' },
                { label:'Failed Logins =', default:'3', width:'60px' },
                { label:'Reqs/Sec =', default:'120', width:'60px' }
              ]}
              defaultCode={`def check_token_bucket(tokens, cost):
    if tokens >= cost:
        return True
    return False

def compute_threat_score(failed_attempts, rps):
    score = 0
    score = score + (failed_attempts * 25)
    if rps > 100:
        score = score + 50
    elif rps > 50:
        score = score + 20
    return score

def evaluate_firewall_rule(threat_score, bucket_passed):
    if threat_score >= 75:
        return "BLOCKED (403 Forbidden - Botnet Behavior)"
    elif not bucket_passed:
        return "THROTTLED (429 Too Many Requests - Rate Limit Exceeded)"
    elif threat_score >= 40:
        return "CHALLENGE (Trigger Cloudflare MFA / CAPTCHA)"
    else:
        return "ALLOWED (200 OK - Legitimate Client Traffic)"

def process_security(ip, tokens, failed_auth, rps):
    print("--- 🛡️ Zero-Trust Security Inspector ---")
    print("Inspecting Client IP:", ip)
    
    passed_bucket = check_token_bucket(tokens, 1)
    threat = compute_threat_score(failed_auth, rps)
    verdict = evaluate_firewall_rule(threat, passed_bucket)
    
    print("Threat Risk Score:", threat, "/ 100")
    print("Firewall Decision:", verdict)

ip_addr = input("Client IP: ")
cur_tokens = int(input("Bucket Tokens: "))
fails = int(input("Failed Logins: "))
rate = int(input("Reqs/Sec: "))

process_security(ip_addr, cur_tokens, fails, rate)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('health_triage')}>Next: HealthTech Vitals Triage <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: HEALTHTECH VITALS TRIAGE ─── */}
      {(activeTab === 'health_triage' || activeTab === 'countdown_timer') && (
        <Section key="health_triage" eyebrow="Project 5 • Clinical AI & HealthTech" title="🏥 HealthTech Real-Time Vitals Alert & Triage">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              ICUs and remote hospital care systems track real-time telemetry from patient vitals. Using the standard clinical <strong>NEWS2 (National Early Warning Score)</strong> framework, this system calculates organ stress scores and determines automated clinical escalation protocols.
            </p>

            <CodeBlock title="healthtech_triage.py — Clinical Early Warning System (NEWS2)">
              {c('# Function 1: Heart rate deviation score')}<br/>
              {kw('def')} {fn('score_heart_rate')}(bpm):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} bpm &lt; {nm('40')} {kw('or')} bpm &gt;= {nm('130')}: {kw('return')} {nm('3')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} bpm &lt;= {nm('50')} {kw('or')} bpm &gt;= {nm('110')}: {kw('return')} {nm('2')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} bpm &lt;= {nm('90')}: {kw('return')} {nm('0')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {nm('1')}<br/><br/>

              {c('# Function 2: Oxygen saturation (SpO2) score')}<br/>
              {kw('def')} {fn('score_oxygen')}(spo2):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} spo2 &lt;= {nm('91')}: {kw('return')} {nm('3')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} spo2 &lt;= {nm('93')}: {kw('return')} {nm('2')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} spo2 &lt;= {nm('95')}: {kw('return')} {nm('1')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {nm('0')}<br/><br/>

              {c('# Function 3: Aggregate EWS calculation')}<br/>
              {kw('def')} {fn('calculate_ews')}(bpm, spo2, bp):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {fn('score_heart_rate')}(bpm) + {fn('score_oxygen')}(spo2) + {fn('score_systolic_bp')}(bp)
            </CodeBlock>

            <Playground
              id="health_triage_play"
              title="Execute Clinical Vitals Triage Engine"
              inputs={[
                { label:'Patient =', default:'John Doe', width:'100px' },
                { label:'Heart Rate =', default:'125', width:'60px' },
                { label:'SpO2 % =', default:'92', width:'60px' },
                { label:'Systolic BP =', default:'85', width:'60px' }
              ]}
              defaultCode={`def score_heart_rate(bpm):
    if bpm < 40 or bpm >= 130:
        return 3
    elif bpm <= 50 or bpm >= 110:
        return 2
    elif bpm <= 90:
        return 0
    else:
        return 1

def score_oxygen(spo2):
    if spo2 <= 91:
        return 3
    elif spo2 <= 93:
        return 2
    elif spo2 <= 95:
        return 1
    return 0

def score_systolic_bp(bp):
    if bp <= 90 or bp >= 220:
        return 3
    elif bp <= 100:
        return 2
    elif bp <= 110:
        return 1
    return 0

def calculate_ews(bpm, spo2, bp):
    s1 = score_heart_rate(bpm)
    s2 = score_oxygen(spo2)
    s3 = score_systolic_bp(bp)
    total = s1 + s2 + s3
    return total

def triage_escalation(patient, bpm, spo2, bp):
    score = calculate_ews(bpm, spo2, bp)
    print("--- 🏥 HealthTech Real-Time Clinical Triage ---")
    print("Patient Name:", patient)
    print("Vitals: HR=" + str(bpm) + " bpm, SpO2=" + str(spo2) + "%, BP=" + str(bp) + " mmHg")
    print("Early Warning Score (NEWS2):", score, "/ 9")
    print()
    
    if score >= 7:
        print("🚨 CODE RED: Critical deterioration!")
        print("Action: Auto-dispatching Rapid Response Team & ICU Doctor.")
    elif score >= 5:
        print("⚠️ CODE ORANGE: Significant instability.")
        print("Action: Alerting Senior Nurse for bedside evaluation.")
    elif score >= 3:
        print("🟡 CODE YELLOW: Mild disturbance.")
        print("Action: Increasing vitals check frequency to 1 hour.")
    else:
        print("🟢 CODE GREEN: Patient vitals normal.")

pat = input("Patient: ")
hr = int(input("Heart Rate: "))
ox = int(input("SpO2 %: "))
sys_bp = int(input("Systolic BP: "))

triage_escalation(pat, hr, ox, sys_bp)`}
            />

            <div style={{ background:'#eff6ff', borderLeft:'4px solid #3b82f6', padding:'1rem 1.5rem', borderRadius:'8px', marginTop:'2.2rem' }}>
              <p style={{ margin:0, color:'#1e40af', fontSize:'0.9rem', lineHeight:1.6 }}>
                💡 <strong>Function Architecture Tip:</strong> Notice how each physiological measurement is decomposed into its own small, single-purpose scoring function (<code>score_heart_rate</code>, <code>score_oxygen</code>, etc.). This makes clinical systems easily testable, auditable, and maintainable.
              </p>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}