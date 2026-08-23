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
   AST-BASED PYTHON INTERPRETER WITH STRING & REGEX SUPPORT
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

    // raw string pattern: r"\d+" -> extract the inner string literal
    if (/^r["']/.test(expr)) {
      return expr.slice(2, -1);
    }

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

    // Method calls
    const methodMatch = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (methodMatch) {
      const varName = methodMatch[1];
      const method = methodMatch[2];
      const argStr = methodMatch[3];
      const args = argStr ? splitByTopLevelCommas(argStr).map(x => evalExpr(x.trim(), scope)) : [];
      let obj = scope[varName] !== undefined ? scope[varName] : env[varName];
      if (varName === 're') {
        obj = {
          search: (pattern, text) => {
            const regex = new RegExp(pattern);
            const match = text.match(regex);
            return match ? { group: (i = 0) => match[i] } : null;
          },
          findall: (pattern, text) => {
            const regex = new RegExp(pattern, 'g');
            return text.match(regex) || [];
          },
          match: (pattern, text) => {
            const regex = new RegExp('^' + pattern.replace(/^\^/, ''));
            const match = text.match(regex);
            return match ? { group: (i = 0) => match[i] } : null;
          },
          sub: (pattern, replacement, text) => {
            const regex = new RegExp(pattern, 'g');
            return text.replace(regex, replacement);
          },
          split: (pattern, text) => {
            const regex = new RegExp(pattern);
            return text.split(regex);
          },
          compile: (pattern) => {
            return {
              search: (text) => obj.search(pattern, text),
              findall: (text) => obj.findall(pattern, text),
              match: (text) => obj.match(pattern, text),
              sub: (replacement, text) => obj.sub(pattern, replacement, text),
              split: (text) => obj.split(pattern, text)
            };
          }
        };
      }
      if (obj !== undefined && obj !== null) {
        if (Array.isArray(obj)) {
          if (method === 'append') { obj.push(args[0]); return null; }
          if (method === 'insert') { obj.splice(args[0], 0, args[1]); return null; }
          if (method === 'pop') { return args.length > 0 ? obj.splice(args[0], 1)[0] : obj.pop(); }
          if (method === 'remove') { const pos = obj.indexOf(args[0]); if(pos !== -1) obj.splice(pos, 1); return null; }
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
        // Extend JS String prototype to support Python string methods inside sandbox
        String.prototype.lower = function() { return this.toLowerCase(); };
        String.prototype.upper = function() { return this.toUpperCase(); };
        String.prototype.strip = function() { return this.trim(); };
        String.prototype.lstrip = function() { return this.replace(/^\s+/, ''); };
        String.prototype.rstrip = function() { return this.replace(/\s+$/, ''); };
        String.prototype.startswith = function(prefix) { return this.startsWith(prefix); };
        String.prototype.endswith = function(suffix) { return this.endsWith(suffix); };
        String.prototype.find = function(sub) { return this.indexOf(sub); };
        String.prototype.count = function(sub) { return this.split(sub).length - 1; };
        String.prototype.isdigit = function() { return /^\d+$/.test(this.trim()); };
        String.prototype.isalpha = function() { return /^[a-zA-Z]+$/.test(this.trim()); };
        String.prototype.isalnum = function() { return /^[a-zA-Z0-9]+$/.test(this.trim()); };
        String.prototype.isspace = function() { return /^\s+$/.test(this); };
        String.prototype.islower = function() { return this.length > 0 && this === this.toLowerCase(); };
        String.prototype.isupper = function() { return this.length > 0 && this === this.toUpperCase(); };
        String.prototype.title = function() { return this.replace(/\b\w/g, c => c.toUpperCase()); };
        String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase(); };
        String.prototype.swapcase = function() { return this.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); };
        String.prototype.join = function(arr) { return Array.isArray(arr) ? arr.join(this) : String(arr); };
        
        const originalReplace = String.prototype.replace;
        String.prototype.replace = function(searchValue, replaceValue) {
          if (typeof searchValue === 'string') {
            return this.split(searchValue).join(replaceValue);
          }
          return originalReplace.call(this, searchValue, replaceValue);
        };

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

        // Python re module simulation inside JS context
        const re = {
          search: (pattern, text) => {
            const regex = new RegExp(pattern);
            const match = text.match(regex);
            return match ? { group: (i = 0) => match[i] } : null;
          },
          findall: (pattern, text) => {
            const regex = new RegExp(pattern, 'g');
            return text.match(regex) || [];
          },
          match: (pattern, text) => {
            const regex = new RegExp('^' + pattern.replace(/^\^/, ''));
            const match = text.match(regex);
            return match ? { group: (i = 0) => match[i] } : null;
          },
          sub: (pattern, replacement, text) => {
            const regex = new RegExp(pattern, 'g');
            return text.replace(regex, replacement);
          }
        };

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
  { q:"Which character is used to denote raw strings in Python regex?", opts:["w","r","f","x"], ans:1, exp:"An 'r' prefix before a string denotes a raw string, ignoring backslash escape sequences (e.g. r'\\d')." },
  { q:"Which string method removes extra leading and trailing whitespaces?", opts:["lower()","strip()","replace()","split()"], ans:1, exp:"The .strip() method removes all leading and trailing whitespaces from a string." },
  { q:"Which re module function returns ALL non-overlapping pattern matches as a list?", opts:["re.search()","re.match()","re.findall()","re.sub()"], ans:2, exp:"re.findall() searches a string and returns a list of all matching items." },
  { q:"What is the meta-character for checking if a string starts with a pattern?", opts:["$","*","^","?"], ans:2, exp:"The caret symbol (^) matches the starting boundary of a string." },
  { q:"What does the regex token \\d represent?", opts:["Any digit [0-9]","Any word character","Any whitespace","Any vowel"], ans:0, exp:"\\d is the standard shorthand token representing any single digit from 0 to 9." },
  { q:"What does the regex token \\w represent?", opts:["Word boundary","Alphanumeric character [a-zA-Z0-9_]","Whitespace character","Wildcard symbol"], ans:1, exp:"\\w matches any single alphanumeric character, including uppercase, lowercase, digits, and underscores." },
  { q:"How do you replace matching patterns in a string using regex?", opts:["re.search()","re.findall()","re.sub()","re.match()"], ans:2, exp:"re.sub() (substitute) replaces matching pattern occurrences with a replacement string." },
  { q:"Which regex quantifier matches 1 or more occurrences of a token?", opts:["*","+","?","{0}"], ans:1, exp:"The plus symbol (+) checks for one or more occurrences of the preceding token." },
  { q:"Which regex quantifier matches 0 or 1 occurrence of a token?", opts:["*","+","?","{2}"], ans:2, exp:"The question mark (?) makes the preceding token optional, matching 0 or 1 occurrence." },
  { q:"How do you create a multi-line string in Python?", opts:["Single quotes","Double quotes","Triple quotes","Quotes are not needed"], ans:2, exp:"Triple quotes (''' or \"\"\") allow strings to span across multiple lines." },
  { q:"What is the output of: 'apple'.endswith('le')?", opts:["True","False","None","Error"], ans:0, exp:".endswith() returns True if the string ends with the specified suffix." },
  { q:"What happens when you try to modify a character in a string: s = 'abc'; s[0] = 'z'?", opts:["s becomes 'zbc'","s becomes 'abcz'","Throws a TypeError (strings are immutable)","s remains 'abc'"], ans:2, exp:"Python strings are completely immutable. Attempting to assign value to an index throws a TypeError." }
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PythonDay7({ activeTab, onNavigate }) {
  const [quizAnswers, setQuizAnswers]     = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const nav = (tab) => { onNavigate('python_day7', tab); window.scrollTo({ top:0, behavior:'smooth' }); };
  const quizScore = quizData.reduce((a, q, i) => a + (quizAnswers[i] === q.ans ? 1 : 0), 0);

  return (
    <AnimatePresence mode="wait">

      {/* ─── TAB 1: INTRO ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 7 • Overview" title="Strings and Regular Expressions">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.6rem', margin:'0 0 1rem', fontWeight:800 }}>Text-Processing Powerhouse</h3>
              <p style={{ color:'#bfdbfe', lineHeight:1.7, margin:0, fontSize:'1.05rem' }}>
                Strings store text characters in Python. Combining strings with **Regular Expressions (RegEx)** gives you the power to find patterns, parse inputs, validate formatting (like emails or phones), and construct smart text applications.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>📝 String Declarations</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.88rem', lineHeight:1.5 }}>
                  Surround text with single <code>'</code>, double <code>"</code>, or triple quotes <code>"""</code> for multi-line block text.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🔍 RegEx Patterns</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.88rem', lineHeight:1.5 }}>
                  Search text structures dynamically (e.g. check if user entered a valid numeric telephone code).
                </p>
              </div>
            </div>

            <Playground
              id="intro"
              title="Interactive Text Preview"
              defaultCode={`# Triple quotes preserve linebreaks
message = """Welcome to Python!
Day 7 is about Strings
and Regular Expressions."""

print(message)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('manipulation')}>Next: String Manipulation <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: STRING MANIPULATION ─── */}
      {activeTab === 'manipulation' && (
        <Section key="manipulation" eyebrow="Day 7 • Manipulation" title="Comprehensive Guide to Python Strings">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              In Python, a <strong>String</strong> (<code>str</code>) is an immutable sequence of Unicode characters. Strings are foundational to almost every Python program — from processing user inputs to parsing CSV files and API payloads.
            </p>

            {/* 1. Indexing & Slicing */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>📌 1. String Indexing & Advanced Slicing <code>[start:stop:step]</code></h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Each character in a string has a zero-based position index (positive from the left, negative from the right). You can slice strings using <code>[start:stop:step]</code>:
            </p>

            {/* Visual Index Diagram */}
            <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'12px', padding:'1.2rem', marginBottom:'1.5rem', overflowX:'auto' }}>
              <div style={{ color:'#64748b', fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', marginBottom:'0.8rem', letterSpacing:'0.05em' }}>Visualizing Indexing for "PYTHON"</div>
              <div style={{ display:'flex', gap:'8px', minWidth:'340px' }}>
                {['P','Y','T','H','O','N'].map((char, idx) => (
                  <div key={idx} style={{ flex:1, textStyle:'center', background:'white', border:'1px solid #cbd5e1', borderRadius:'8px', padding:'0.6rem 0', textAlign:'center' }}>
                    <div style={{ fontSize:'1.2rem', fontWeight:800, color:'#1e293b' }}>{char}</div>
                    <div style={{ fontSize:'0.75rem', color:'#2563eb', marginTop:'0.2rem', fontWeight:600 }}>Pos: {idx}</div>
                    <div style={{ fontSize:'0.75rem', color:'#ef4444', marginTop:'0.1rem' }}>Neg: {idx - 6}</div>
                  </div>
                ))}
              </div>
            </div>

            <CodeBlock title="string_slicing.py">
              text = {st('"PYTHON"')}<br/><br/>
              {c('# Indexing')}<br/>
              {fn('print')}(text[{nm('0')}]) {ok('# "P" (first character)')}<br/>
              {fn('print')}(text[-{nm('1')}]) {ok('# "N" (last character)')}<br/><br/>
              {c('# Basic Slicing [start:stop]')}<br/>
              {fn('print')}(text[{nm('0')}:{nm('4')}]) {ok('# "PYTH" (indices 0, 1, 2, 3)')}<br/>
              {fn('print')}(text[{nm('2')}:]) {ok('# "THON" (from index 2 to end)')}<br/><br/>
              {c('# Advanced Slicing [start:stop:step]')}<br/>
              {fn('print')}(text[::{nm('2')}]) {ok('# "PTO" (every 2nd character)')}<br/>
              {fn('print')}(text[::-{nm('1')}]) {ok('# "NOHTYP" (Reverse String!)')}
            </CodeBlock>

            <Playground
              id="slicing_play"
              title="Test String Slicing & Reversal"
              defaultCode={`word = "DEVELOPER"

# Extract first 5 letters
print("Substring (0:5) :", word[0:5])

# Every second letter
print("Every 2nd char  :", word[::2])

# Reverse string trick
print("Reversed String :", word[::-1])`}
            />

            {/* 2. String Formatting */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginTop:'2.5rem', marginBottom:'0.5rem' }}>✨ 2. String Formatting (f-Strings vs .format())</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Python provides multiple ways to inject variables into strings. Modern Python (3.6+) favors <strong>f-Strings (Formatted String Literals)</strong> for clean syntax and high execution speed.
            </p>

            <CodeBlock title="string_formatting.py">
              name = {st('"Ananya"')}<br/>
              score = {nm('95')}<br/><br/>
              {c('# 1. f-Strings (Recommended)')}<br/>
              msg1 = f{st('"Student {name} scored {score}% in Python!"')}<br/>
              {fn('print')}(msg1) {ok('# "Student Ananya scored 95% in Python!"')}<br/><br/>
              {c('# 2. .format() method')}<br/>
              msg2 = {st('"Student {} scored {}%"')}.{fn('format')}(name, score)<br/>
              {fn('print')}(msg2)<br/><br/>
              {c('# 3. Expressions inside f-strings')}<br/>
              {fn('print')}(f{st('"Next year score target: {score + 5}"')}) {ok('# "Next year score target: 100"')}
            </CodeBlock>

            {/* 3. Splitting and Joining */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginTop:'2.5rem', marginBottom:'0.5rem' }}>🪓 3. Splitting & Joining (<code>.split()</code> & <code>.join()</code>)</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Use <code>.split()</code> to break a string into a list of items, and <code>.join()</code> to stitch a list back into a single formatted string.
            </p>

            <CodeBlock title="split_and_join.py">
              csv_line = {st('"HTML,CSS,JavaScript,Python"')}<br/><br/>
              {c('# Split CSV line into a Python List')}<br/>
              skills = csv_line.{fn('split')}({st('","')})<br/>
              {fn('print')}(skills) {ok('# ["HTML", "CSS", "JavaScript", "Python"]')}<br/><br/>
              {c('# Join List items with custom separator')}<br/>
              formatted = {st('" | "')}.{fn('join')}(skills)<br/>
              {fn('print')}(formatted) {ok('# "HTML | CSS | JavaScript | Python"')}
            </CodeBlock>

            <Playground
              id="split_join_play"
              title="Test .split() and .join()"
              defaultCode={`sentence = "Apple Banana Mango Orange"

# Split words by whitespace
fruits_list = sentence.split(" ")
print("List of fruits :", fruits_list)

# Join back with dash
new_str = " -> ".join(fruits_list)
print("Joined String  :", new_str)`}
            />

            {/* 4. Built-in Methods Grid */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginTop:'2.5rem', marginBottom:'0.5rem' }}>🛠️ 4. Comprehensive String Methods</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Python provides a rich built-in library of string manipulation and inspection methods:
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🔠 Case Transformation</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  <code>.lower()</code>: Convert to lowercase<br/>
                  <code>.upper()</code>: Convert to uppercase<br/>
                  <code>.title()</code>: Capitalize each word<br/>
                  <code>.capitalize()</code>: Capitalize first character<br/>
                  <code>.swapcase()</code>: Swap case letters
                </p>
              </div>

              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🧹 Trimming & Cleaning</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  <code>.strip()</code>: Remove spaces from both ends<br/>
                  <code>.lstrip()</code>: Remove leading spaces<br/>
                  <code>.rstrip()</code>: Remove trailing spaces<br/>
                  <code>.replace(old, new)</code>: Replace occurrences
                </p>
              </div>

              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🔍 Searching & Counting</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  <code>.find(sub)</code>: Return index of sub or -1<br/>
                  <code>.count(sub)</code>: Count non-overlapping matches<br/>
                  <code>.startswith(val)</code>: Check string start<br/>
                  <code>.endswith(val)</code>: Check string suffix
                </p>
              </div>

              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>✅ Inspection & Validation</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  <code>.isdigit()</code>: True if all chars are digits<br/>
                  <code>.isalpha()</code>: True if all chars are letters<br/>
                  <code>.isalnum()</code>: True if letters or digits<br/>
                  <code>.isspace()</code>: True if whitespace only
                </p>
              </div>
            </div>

            <CodeBlock title="string_methods_demo.py">
              text = {st('"  python programming  "')}<br/><br/>
              {c('# Transformations')}<br/>
              {fn('print')}(text.{fn('strip')}().{fn('title')}()) {ok('# "Python Programming"')}<br/>
              {fn('print')}(text.{fn('count')}({st('"m"')})) {ok('# 2')}<br/><br/>
              {c('# Validation checks')}<br/>
              pin = {st('"9481"')}<br/>
              {fn('print')}(pin.{fn('isdigit')}()) {ok('# True')}<br/>
              {fn('print')}(pin.{fn('isalpha')}()) {ok('# False')}
            </CodeBlock>

            <Playground
              id="methods_play"
              title="Test String Transformation & Inspection Methods"
              defaultCode={`data = "12345"
text = "hello world"

print("Is '12345' digits?    :", data.isdigit())
print("Title case 'hello world':", text.title())
print("Count of 'l' in text   :", text.count("l"))`}
            />

            {/* 5. Immutability & Escape Sequences */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginTop:'2.5rem', marginBottom:'0.5rem' }}>🔒 5. Immutability & Escape Characters</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Python strings are <strong>immutable</strong> (cannot be altered in place). Attempting <code>s[0] = 'X'</code> raises a <code>TypeError</code>. To modify a string, you must reassign the new value to the variable.
            </p>

            <div style={{ background:'#fff7ed', borderLeft:'4px solid #f97316', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#9a3412', lineHeight:1.7, fontSize:'0.93rem' }}>
                💡 <strong>Common Escape Sequences:</strong><br/>
                <code>\n</code> = Newline &nbsp;|&nbsp; <code>\t</code> = Tab indent &nbsp;|&nbsp; <code>\\</code> = Literal Backslash &nbsp;|&nbsp; <code>r"..."</code> = Raw String (ignores escapes)
              </p>
            </div>

            <CodeBlock title="immutability_and_escapes.py">
              {c('# Escape sequences')}<br/>
              {fn('print')}({st('"Line 1\\nLine 2"')}) {ok('# Prints across 2 lines')}<br/>
              {fn('print')}({st('"Name:\\tKavya"')}) {ok('# Tab space between Name: and Kavya')}<br/><br/>
              {c('# Raw strings (useful for file paths & regex)')}<br/>
              path = r{st('"C:\\new\\folder\\file.txt"')}<br/>
              {fn('print')}(path) {ok('# "C:\\new\\folder\\file.txt" (no newline on \\n)')}
            </CodeBlock>

            <div className="card-actions" style={{ marginTop:'2rem' }}>
              <button className="btn btn-primary" onClick={() => nav('regex_basics')}>Next: RegEx Basics <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: REGEX BASICS ─── */}
      {activeTab === 'regex_basics' && (
        <Section key="regex_basics" eyebrow="Day 7 • RegEx" title="Regular Expression Patterns">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              A <strong>Regular Expression</strong> (RegEx) is a sequence of characters that forms a search pattern. Python uses the built-in <code>re</code> module to work with regex.
            </p>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.8rem' }}>📌 Cheat Sheet: Meta-characters</h3>
            
            <div style={{ overflowX:'auto', marginBottom:'2.5rem' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'12px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
                <thead>
                  <tr style={{ background:'#1e293b', color:'white' }}>
                    {['Character','Description','Example Pattern','Matches'].map(h => <th key={h} style={{ padding:'0.9rem 1.2rem', fontSize:'0.88rem' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { char:'\\d', desc:'Matches any decimal digit [0-9]', pat:'\\d+', ex:'"123"' },
                    { char:'\\w', desc:'Alphanumeric character [a-zA-Z0-9_]', pat:'\\w+', ex:'"code_123"', alt:true },
                    { char:'\\s', desc:'Matches any whitespace character', pat:'\\s+', ex:'" " (space/tabs)' },
                    { char:'+',   desc:'Matches 1 or more occurrences', pat:'a+', ex:'"a", "aa", "aaa"', alt:true },
                    { char:'*',   desc:'Matches 0 or more occurrences', pat:'a*', ex:'"", "a", "aa"' },
                    { char:'?',   desc:'Matches 0 or 1 occurrence (optional)', pat:'a?', ex:'"", "a"', alt:true }
                  ].map(r => (
                    <tr key={r.char} style={{ borderBottom:'1px solid #e2e8f0', background: r.alt ? '#f8fafc':'white' }}>
                      <td style={{ padding:'0.85rem 1.2rem', fontWeight:700, fontFamily:'monospace', color:'#1d4ed8' }}>{r.char}</td>
                      <td style={{ padding:'0.85rem 1.2rem', color:'#475569' }}>{r.desc}</td>
                      <td style={{ padding:'0.85rem 1.2rem', fontFamily:'monospace', color:'#0f172a' }}><code>{r.pat}</code></td>
                      <td style={{ padding:'0.85rem 1.2rem', fontFamily:'monospace', color:'#475569' }}>{r.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Playground
              id="regex_basics_play"
              title="Interactive RegEx Tester"
              defaultCode={`# re module is mocked in browser console
import re

text = "Admin login pin is 9481"
# Search for numeric digits
match = re.search(r"\\d+", text)
if match:
    print("Found numeric code:", match.group())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('regex_functions')}>Next: re Module Functions <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: REGEX FUNCTIONS ─── */}
      {activeTab === 'regex_functions' && (
        <Section key="regex_functions" eyebrow="Day 7 • re Module" title="RegEx Functions: search, match, findall, sub, split, compile">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              The <code>re</code> module provides several functions to query, match, split, and update text strings using regular expression patterns:
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem', marginBottom:'2.5rem' }}>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🔍 re.search(pattern, str)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Searches the entire string for the **first** match and returns a Match object. Use <code>.group()</code> to retrieve the string.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>🎯 re.match(pattern, str)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Checks if the regular expression matches only at the **beginning** of the string. Returns `None` if match fails at start.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>📋 re.findall(pattern, str)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Returns a **List** containing all non-overlapping matches found anywhere in the text.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>✏️ re.sub(pat, rep, str)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Replaces matching pattern occurrences with a replacement string, returning a modified copy.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>✂️ re.split(pattern, str)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Splits the string by occurrences of the matching pattern and returns a **List** of substrings.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>⚡ re.compile(pattern)</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  Compiles a pattern into a reusable **RegEx Object** for fast execution across multiple searches.
                </p>
              </div>
            </div>

            <CodeBlock title="regex_operations.py">
              import re<br/>
              text = {st('"Code 22 and Code 44"')}<br/><br/>
              {c('# 1. search vs match')}<br/>
              m1 = re.search(r{st('"\\d+"')}, text)<br/>
              {fn('print')}(m1.group()) {ok('# "22"')}<br/><br/>
              {c('# 2. findall')}<br/>
              codes = re.findall(r{st('"\\d+"')}, text)<br/>
              {fn('print')}(codes) {ok('# ["22", "44"]')}<br/><br/>
              {c('# 3. sub')}<br/>
              updated = re.sub(r{st('"\\d+"')}, {st('"XX"')}, text)<br/>
              {fn('print')}(updated) {ok('# "Code XX and Code XX"')}<br/><br/>
              {c('# 4. split')}<br/>
              parts = re.split(r{st('" and "')}, text)<br/>
              {fn('print')}(parts) {ok('# ["Code 22", "Code 44"]')}<br/><br/>
              {c('# 5. compile reusable pattern')}<br/>
              digit_pattern = re.compile(r{st('"\\d+"')})<br/>
              {fn('print')}(digit_pattern.findall({st('"ID: 101, Age: 30"')})) {ok('# ["101", "30" ]')}
            </CodeBlock>

            <Playground
              id="regex_funcs_play"
              title="Test All RegEx Functions"
              defaultCode={`import re
sentence = "Contact office at 999-888-7777 or support@work.com"

# 1. Extract email using findall
email = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", sentence)
print("1. Extracted Email:", email)

# 2. Mask phone numbers using sub
masked = re.sub(r"\\d{3}-\\d{3}-\\d{4}", "XXX-XXX-XXXX", sentence)
print("2. Masked Sentence:", masked)

# 3. Split sentence by space or dash
parts = re.split(r"\\s", "Python RegEx Functions")
print("3. Split Words    :", parts)

# 4. Use compiled pattern
phone_pattern = re.compile(r"\\d{3}-\\d{3}-\\d{4}")
found_phone = phone_pattern.search(sentence)
if found_phone:
    print("4. Found Phone    :", found_phone.group())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('practice')}>Next: Chatbot Project <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: PRACTICE CHATBOT ─── */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 7 • Capstone" title="🤖 Simple Chatbot Application">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0369a1)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.5rem', margin:'0 0 0.8rem', fontWeight:800 }}>Day 7 Capstone: RegEx Chatbot</h3>
              <p style={{ color:'#bae6fd', margin:0, lineHeight:1.7 }}>
                Build a console chatbot that parses user questions (like email submission, telephone numbers, greetings) using regular expressions to reply intelligently.
              </p>
            </div>

            <CodeBlock title="chatbot.py">
              import re<br/><br/>
              {kw('def')} {fn('chatbot_reply')}(user_input):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;user_input = user_input.lower()<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} re.search(r{st('"hello|hi|hey"')}, user_input):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"Hello! How can I assist you today?"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} re.search(r{st('"email"')}, user_input):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"Sure, you can write to us at contact@ai.com"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('elif')} re.search(r{st('"\\d+"')}, user_input):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"I noticed you entered a number. How can I help with that?"')}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('return')} {st('"I am still learning! Can you rephrase that?"')}<br/><br/>
              {fn('print')}(chatbot_reply({st('"Hi there!"')}))
            </CodeBlock>

            <Playground
              id="chatbot"
              title="Interact with the RegEx Chatbot"
              inputs={[
                { label:'Your Message =', default:'hi, my email is admin@gmail.com', width:'250px' }
              ]}
              defaultCode={`import re

def reply(msg):
    # Check greeting
    if re.search(r"hi|hello|hey", msg.lower()):
        return "Hello user! Welcome."
    
    # Check if user submitted an email
    email_match = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", msg)
    if len(email_match) > 0:
        return "Thanks for submitting your email: " + email_match[0]
        
    return "I parsed your message but did not match any greeting or email patterns!"

user_msg = input("Enter message: ")
print("Chatbot reply:", reply(user_msg))`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('assignment_work')}>Next: Assignment 📝 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: ASSIGNMENT ─── */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 7 • Assignment" title="📝 Day 7 Assignment">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2.5rem' }}>
              <h3 style={{ margin:'0 0 0.6rem', fontSize:'1.4rem', fontWeight:800 }}>Rules</h3>
              <p style={{ color:'#bfdbfe', margin:0, lineHeight:1.7 }}>Save your script as <code style={{ color:'#fde68a' }}>day7_assignment.py</code>. Write modular functions using built-in string methods or the <code>re</code> module.</p>
            </div>

            {[
              { n:1,  t:'Vowel Counter',            diff:'Easy',   col:'#10b981', desc:'Write a function count_vowels(text) that counts and returns the number of vowels (a, e, i, o, u) present in a string.' },
              { n:2,  t:'Mask Email Domain',        diff:'Easy',   col:'#10b981', desc:'Write a function mask_email(email) that hides the domain name, replacing it with "XXX.com" (e.g. "priya@gmail.com" becomes "priya@XXX.com").' },
              { n:3,  t:'Clean Whitespaces',        diff:'Easy',   col:'#10b981', desc:'Write a function clean_text(text) that removes all leading, trailing, and duplicate inner whitespaces from a string.' },
              { n:4,  t:'Find Digits in Sentence',  diff:'Medium', col:'#f59e0b', desc:'Write a function extract_numbers(sentence) that uses re.findall() to extract and return all numeric digits in a list.' },
              { n:5,  t:'Capitalize Words',         diff:'Medium', col:'#f59e0b', desc:'Write a function capitalize_words(text) that takes a sentence and capitalizes the first letter of every word.' },
              { n:6,  t:'Validate Password Length', diff:'Medium', col:'#f59e0b', desc:'Write a function is_valid_password(pwd) that returns True if a password starts with an alphanumeric character and has a length between 8 and 16 characters.' },
              { n:7,  t:'Extract Phone Numbers',    diff:'Medium', col:'#f59e0b', desc:'Write a function find_phone(text) that extracts telephone formats matching "XXX-XXX-XXXX" from a passage.' },
              { n:8,  t:'Remove Non-Alphanumeric',  diff:'Medium', col:'#f59e0b', desc:'Write a function remove_special(text) that uses re.sub() to strip away all characters that are not letters or digits.' },
              { n:9,  t:'URL Validator Pattern',    diff:'Hard',   col:'#ef4444', desc:'Write a function check_url(url) that returns True if a URL starts with "http://" or "https://" and ends with a valid domain suffix (like .com, .org, or .in).' },
              { n:10, t:'Check File Extension',     diff:'Hard',   col:'#ef4444', desc:'Write a function get_pdf_files(file_list) that accepts a list of file names and returns a list containing only file names that end in ".pdf" (case-insensitive).' }
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

      {/* ─── TAB 7: QUIZ ─── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Day 7 • Assessment" title="🧠 Quiz — String & RegEx">
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
                  {quizScore===quizData.length?'🏆 Perfect! String & RegEx Mastered!':quizScore>=10?'🥇 Excellent Work!':quizScore>=7?'🥈 Good Job! Review answers below.':'📚 Keep studying string methods and regex tokens!'}
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
