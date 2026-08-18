import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Cpu, Terminal, Zap, Shield, HelpCircle, Link2, MessageSquare, Timer } from 'lucide-react';

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
        <Section key="intro" eyebrow="Capstone Suite" title="Python Application Projects">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#3b82f6)', color:'white', padding:'2.2rem', borderRadius:'16px', marginBottom:'2.2rem' }}>
              <h3 style={{ fontSize:'1.7rem', margin:'0 0 0.8rem', fontWeight:900 }}>📦 Real-World Software Suite</h3>
              <p style={{ color:'#dbeafe', lineHeight:1.8, margin:0, fontSize:'1.05rem' }}>
                Welcome to the Practical Application Projects suite. Here, we move from writing single lines of code to constructing complete, structured, and modular utility applications in Python.
              </p>
            </div>

            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              We will build, run, and dissect 5 practical mini-applications that solve real developer tasks:
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.3rem', marginBottom:'2rem' }}>
              {[
                { title:'🔑 Password Generator', icon:<Shield size={20} color="#10b981"/>, desc:'Assemble secure passwords of custom sizes using randomized character selections.' },
                { title:'🧠 Quiz Application', icon:<HelpCircle size={20} color="#3b82f6"/>, desc:'A terminal assessment engine tracking user choices, scoring points, and displaying responses.' },
                { title:'🔗 URL Shortener', icon:<Link2 size={20} color="#f59e0b"/>, desc:'Uses Python dictionaries to associate original websites with unique generated codes.' },
                { title:'💬 Chat Application', icon:<MessageSquare size={20} color="#a855f7"/>, desc:'Simulates message passing, sender attributes, and formatting logs.' },
                { title:'⏱️ Countdown Timer', icon:<Timer size={20} color="#ec4899"/>, desc:'Runs tick loops printing remaining duration and raising a finish alarm.' }
              ].map((proj, i) => (
                <div key={i} style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0', display:'flex', gap:'12px' }}>
                  <div style={{ background:'white', borderRadius:'10px', padding:'0.6rem', border:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', height:'fit-content' }}>
                    {proj.icon}
                  </div>
                  <div>
                    <h4 style={{ margin:'0 0 0.4rem 0', color:'#0f172a' }}>{proj.title}</h4>
                    <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.5 }}>{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('password_gen')}>Next: Password Generator <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: PASSWORD GENERATOR ─── */}
      {activeTab === 'password_gen' && (
        <Section key="password_gen" eyebrow="Project 1" title="🔑 Random Password Generator">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              This project uses the Python <code>random</code> library and string categories to construct secure passwords of custom length containing letters, digits, and special characters.
            </p>

            <CodeBlock title="password_generator.py">
              {kw('import')} random<br/>
              {kw('import')} string<br/><br/>
              {kw('def')} {fn('generate_password')}(length):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} length &lt; {nm('1')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Length must be at least 1."')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('""')}<br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Pool containing letters, digits, and punctuation symbols')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;pool = string.ascii_letters + string.digits + string.punctuation<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;password = {st('""')}<br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{c('# Pick random chars from the pool')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} _ {kw('in')} {fn('range')}(length):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password += random.choice(pool)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} password<br/><br/>
              {fn('print')}(generate_password({nm('12')}))
            </CodeBlock>

            <Playground
              id="password_gen_play"
              title="Test Password Generator"
              inputs={[{ label:'Password Length =', default:'14' }]}
              defaultCode={`import random
import string

def generate_password(length):
    if length < 1:
        return "Invalid length"
    
    # Combined character pool
    pool = string.ascii_letters + string.digits + string.punctuation
    password = ""
    for _ in range(length):
        password += random.choice(pool)
    return password

size = int(input("Length: "))
print("Your Password:", generate_password(size))`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('quiz_app')}>Next: Quiz App <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: QUIZ APP ─── */}
      {activeTab === 'quiz_app' && (
        <Section key="quiz_app" eyebrow="Project 2" title="🧠 Quiz Application">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Create an interactive multiple-choice quiz engine that loops over questions, presents numbered choices, reads input, matches answers, and prints a final scorecard.
            </p>

            <CodeBlock title="quiz_app.py">
              {kw('def')} {fn('display_question')}(question, options, correct):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(question)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} idx, opt {kw('in')} {fn('enumerate')}(options):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(str(idx + {nm('1')}) + {st('". "')} + opt)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;user_ans = {fn('input')}({st('"Select option (1-4): "')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} user_ans == {fn('str')}(correct)<br/>
            </CodeBlock>

            <Playground
              id="quiz_app_play"
              title="Play Quiz App Console"
              inputs={[
                { label:'Q1 Answer (1-4) =', default:'3' },
                { label:'Q2 Answer (1-4) =', default:'1' }
              ]}
              defaultCode={`def run_quiz():
    score = 0
    # Questions format: (question_text, [options], correct_index)
    questions = [
        ("What is the capital of France?", ["Berlin", "London", "Paris", "Madrid"], 3),
        ("What is the capital of Germany?", ["Berlin", "London", "Paris", "Madrid"], 1)
    ]
    
    for idx, (q, opts, correct) in enumerate(questions):
        print("Question", idx + 1, ":", q)
        for i, opt in enumerate(opts):
            print(str(i+1) + ")", opt)
        
        user_val = input("Your answer: ")
        if user_val == str(correct):
            print("Correct!\\n")
            score += 1
        else:
            print("Wrong!\\n")
            
    print("Final Score:", score, "out of", len(questions))

run_quiz()`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('url_shortener')}>Next: URL Shortener <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: URL SHORTENER ─── */}
      {activeTab === 'url_shortener' && (
        <Section key="url_shortener" eyebrow="Project 3" title="🔗 Dictionary URL Shortener">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              This application uses a Python dictionary (acting as a local lookup database) to map short alphanumeric codes to long destination website links.
            </p>

            <CodeBlock title="url_shortener.py">
              {kw('import')} random<br/>
              {kw('import')} string<br/><br/>
              url_db = {}<br/><br/>
              {kw('def')} {fn('shorten')}(url):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;chars = string.ascii_letters + string.digits<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;code = {st('""')}.join(random.choice(chars) {kw('for')} _ {kw('in')} {fn('range')}({nm('6')}))<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;url_db[code] = url<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} code
            </CodeBlock>

            <Playground
              id="url_shortener_play"
              title="Test URL Shortener Lookup"
              inputs={[{ label:'Long URL =', default:'https://google.com/search?q=python', width:'250px' }]}
              defaultCode={`import random
import string

url_db = {}

def shorten(long_url):
    chars = string.ascii_letters + string.digits
    # Generate a random 6-character short code
    code = ""
    for _ in range(6):
        code += random.choice(chars)
    url_db[code] = long_url
    return code

destination = input("Enter destination: ")
short_code = shorten(destination)

print("Shortened Url: http://short.ly/" + short_code)
print("Looking up database: key [" + short_code + "] maps to:", url_db[short_code])`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('chat_app')}>Next: Chat Application <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: CHAT APP ─── */}
      {activeTab === 'chat_app' && (
        <Section key="chat_app" eyebrow="Project 4" title="💬 Interactive Chat Simulation">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Simulates a terminal chat interface where messages are stored dynamically inside a log history array. Users can send messages under distinct aliases.
            </p>

            <CodeBlock title="chat_application.py">
              chat_logs = []<br/><br/>
              {kw('def')} {fn('post_message')}(user, message):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;chat_logs.append(user + {st('": "')} + message)<br/><br/>
              {fn('post_message')}({st('"Alice"')}, {st('"Hi Bob!"')})<br/>
              {fn('post_message')}({st('"Bob"')}, {st('"Hey Alice!"')})
            </CodeBlock>

            <Playground
              id="chat_app_play"
              title="Run Chat Simulator"
              inputs={[
                { label:'Message 1 (Alice) =', default:'Hello there!', width:'200px' },
                { label:'Message 2 (Bob) =', default:'Hey Alice, how is Day 7 going?', width:'200px' }
              ]}
              defaultCode={`chat_history = []

def send_msg(sender, body):
    chat_history.append("[" + sender + "]: " + body)

# Get simulated messages from console inputs
m1 = input("Alice msg: ")
send_msg("Alice", m1)

m2 = input("Bob msg: ")
send_msg("Bob", m2)

# Print log logs
print("\\n--- Simulation History ---")
for entry in chat_history:
    print(entry)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('countdown_timer')}>Next: Countdown Timer <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: COUNTDOWN TIMER ─── */}
      {activeTab === 'countdown_timer' && (
        <Section key="countdown_timer" eyebrow="Project 5" title="⏱️ Countdown Timer">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              This project implements a numerical loop that counts down from a specified start duration, reporting the seconds left before outputting a sound alert signal.
            </p>

            <CodeBlock title="countdown_timer.py">
              {kw('def')} {fn('start_timer')}(seconds):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Timer started!"')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} sec {kw('in')} {fn('range')}(seconds, {nm('0')}, -{nm('1')}):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({fn('str')}(sec) + {st('" seconds left..."')})<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Time is up! ⏰"')})<br/><br/>
              start_timer({nm('5')})
            </CodeBlock>

            <Playground
              id="countdown_timer_play"
              title="Test Countdown Loop"
              inputs={[{ label:'Timer Seconds =', default:'6' }]}
              defaultCode={`def timer(duration):
    print("COUNTDOWN TICK:")
    for remaining in range(duration, 0, -1):
        print(remaining, "...")
    print("⏰ TIME IS UP! Beep beep!")

seconds = int(input("Start duration: "))
timer(seconds)`}
            />

            <div style={{ background:'#f0fdf4', borderLeft:'4px solid #10b981', padding:'1rem 1.5rem', borderRadius:'8px', marginTop:'2.2rem' }}>
              <p style={{ margin:0, color:'#065f46', fontSize:'0.9rem', lineHeight:1.6 }}>
                💡 <strong>Code Dissection:</strong> Note the parameters of the <code>range()</code> function: <code>range(duration, 0, -1)</code>. The step size of <code>-1</code> makes the range count backwards rather than forwards, which is ideal for timers!
              </p>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
