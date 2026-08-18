import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Cpu, Filter, Terminal, Trophy, Zap, CheckCircle, XCircle } from 'lucide-react';

/* ─────────────────────────────────────────────
   SHARED UI HELPERS
───────────────────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CodeBlock = ({ title, children }) => (
  <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1.6rem', border: '1px solid #334155' }}>
    {title && (
      <div style={{ background: '#1e293b', padding: '0.55rem 1.2rem', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #334155' }}>
        <Code size={14} color="#38bdf8" />
        <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>{title}</span>
      </div>
    )}
    <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1.3rem', fontFamily: 'monospace', fontSize: '0.91rem', lineHeight: 1.9, overflowX: 'auto' }}>{children}</div>
  </div>
);

const c = t => <span style={{ color: '#64748b' }}>{t}</span>;
const kw = t => <span style={{ color: '#f472b6' }}>{t}</span>;
const fn = t => <span style={{ color: '#38bdf8' }}>{t}</span>;
const nm = t => <span style={{ color: '#fbbf24' }}>{t}</span>;
const st = t => <span style={{ color: '#a5b4fc' }}>{t}</span>;
const ok = t => <span style={{ color: '#10b981' }}>{t}</span>;

/* ─────────────────────────────────────────────
   VIRTUAL FILESYSTEM HANDLE
───────────────────────────────────────────── */
class VirtualFileHandle {
  constructor(filename, mode, vfs) {
    this.filename = filename;
    this.mode = mode.replace(/['"]/g, '').trim();
    this.vfs = vfs;
    this.closed = false;
  }

  read() {
    if (this.closed) {
      throw new Error("ValueError: I/O operation on closed file.");
    }
    if (this.mode !== 'r' && !this.mode.includes('+')) {
      throw new Error("UnsupportedOperation: not readable");
    }
    if (!(this.filename in this.vfs)) {
      throw new Error(`FileNotFoundError: [Errno 2] No such file or directory: '${this.filename}'`);
    }
    return this.vfs[this.filename];
  }

  write(content) {
    if (this.closed) {
      throw new Error("ValueError: I/O operation on closed file.");
    }
    if (this.mode === 'r') {
      throw new Error("UnsupportedOperation: not writable");
    }

    const textToWrite = String(content);
    if (this.mode.startsWith('w')) {
      this.vfs[this.filename] = textToWrite;
    } else if (this.mode.startsWith('a')) {
      const current = this.vfs[this.filename] || '';
      this.vfs[this.filename] = current + textToWrite;
    }
    return null;
  }

  close() {
    this.closed = true;
  }
}

/* ─────────────────────────────────────────────
   AST PYTHON INTERPRETER WITH VFS & EXCEPTION HANDLING
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
      if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; }
      else if (inStr && c === strChar && line[idx - 1] !== '\\') { inStr = false; }
      else if (!inStr) {
        if (c === '(') openParens++;
        else if (c === ')') openParens--;
        else if (c === '[') openBrackets++;
        else if (c === ']') openBrackets--;
        else if (c === '{') openBraces++;
        else if (c === '}') openBraces--;
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

        if (trimLine.startsWith('with open(')) {
          const match = trimLine.match(/^with\s+open\((.+?),\s*(.+?)\)\s+as\s+([a-zA-Z_]\w*)\s*:$/);
          if (match) {
            const filenameExpr = match[1];
            const modeExpr = match[2];
            const varName = match[3];
            i++;
            const body = parseBlock(baseIndent + 4);
            block.push({ type: 'with_open', filenameExpr, modeExpr, varName, body });
            continue;
          }
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
  let inStr = false;
  let strChar = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (!inStr && (c === '"' || c === "'")) {
      inStr = true; strChar = c; result += c; i++;
    } else if (inStr && c === strChar) {
      inStr = false; result += c; i++;
    } else if (!inStr && c === '(') {
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
      if (hasComma && !isFuncCall) {
        result += '[' + translateTuplesToArrays(innerText) + ']';
      } else {
        result += '(' + translateTuplesToArrays(innerText) + ')';
      }
      i = j;
    } else {
      result += c; i++;
    }
  }
  return result;
}

function interpretPython(ast, env, inputs, output, virtualFiles = {}) {
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

    // raw string matches
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

      // If virtual file handle method call
      if (obj instanceof VirtualFileHandle) {
        if (method === 'read') return obj.read();
        if (method === 'write') return obj.write(args[0]);
        if (method === 'close') { obj.close(); return null; }
      }

      if (obj !== undefined && obj !== null) {
        if (Array.isArray(obj)) {
          if (method === 'append') { obj.push(args[0]); return null; }
          if (method === 'insert') { obj.splice(args[0], 0, args[1]); return null; }
          if (method === 'pop') { return args.length > 0 ? obj.splice(args[0], 1)[0] : obj.pop(); }
          if (method === 'remove') { const pos = obj.indexOf(args[0]); if (pos !== -1) obj.splice(pos, 1); return null; }
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
      const runner = new Function('scope', 'env', 'execBlock', 'evalExpr', 'VirtualFileHandle', 'virtualFiles', 'getInput', `
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
        
        const open = (filename, mode = 'r') => {
          return new VirtualFileHandle(filename, mode, virtualFiles);
        };

        const pickle = {
          dump: (obj, f) => { f.write(JSON.stringify(obj)); return null; },
          load: (f) => { return JSON.parse(f.read()); }
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
        return `const ${k} = scope['${k}'] !== undefined ? scope['${k}'] : env['${k}'];`;
      }).join('\n')}

        return (${safe});
      `);
      return runner(scope, env, execBlock, evalExpr, VirtualFileHandle, virtualFiles, getInput);
    } catch (e) {
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
      if (v instanceof VirtualFileHandle) return `<_io.TextIOWrapper name='${v.filename}' mode='${v.mode}' encoding='UTF-8'>`;
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
      } else if (node.type === 'with_open') {
        const filename = evalExpr(node.filenameExpr, scope);
        const mode = evalExpr(node.modeExpr, scope);
        const fileObj = new VirtualFileHandle(filename, mode, virtualFiles);
        const localEnv = { ...scope };
        localEnv[node.varName] = fileObj;
        try {
          const status = execBlock(node.body, localEnv);
          if (status) return status;
        } finally {
          fileObj.close();
        }
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

  return { lines: formattedOutput.length ? formattedOutput : ['(no output)'], isError: false, vfs: virtualFiles };
}

/* ─────────────────────────────────────────────
   LIVE PLAYGROUND COMPONENT WITH VFS PREVIEW
───────────────────────────────────────────── */
function Playground({ id, defaultCode, inputs = [], title = 'VFS Python Console', initialFiles = {} }) {
  const [code, setCode] = useState(defaultCode);
  const [vals, setVals] = useState(inputs.map(i => i.default));
  const [output, setOutput] = useState(null);
  const [vfs, setVfs] = useState(initialFiles);
  const [ran, setRan] = useState(false);

  const run = () => {
    const virtualFS = { ...vfs };
    try {
      const ast = parsePython(code);
      const res = interpretPython(ast, {}, vals, [], virtualFS);
      setOutput(res);
      setVfs(virtualFS);
    } catch (e) {
      setOutput({ lines: [`RuntimeError: ${e.message}`], isError: true });
    }
    setRan(true);
  };
  const reset = () => { setCode(defaultCode); setVals(inputs.map(i => i.default)); setOutput(null); setVfs(initialFiles); setRan(false); };

  return (
    <div style={{ background: '#0f172a', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid #334155' }}>
      <div style={{ background: '#1e293b', padding: '0.75rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📂</span>
          <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.93rem' }}>{title}</span>
          <span style={{ background: '#3b82f6', color: 'white', fontSize: '0.68rem', padding: '0.1rem 0.5rem', borderRadius: '20px', fontWeight: 700 }}>VFS ACTIVE</span>
        </div>
        <button onClick={reset} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <RefreshCw size={12} /> Reset
        </button>
      </div>

      {/* VIRTUAL FILES SYSTEM PREVIEW */}
      <div style={{ background: '#09111e', padding: '0.75rem 1.4rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>🗄️ Virtual Filesystem State:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {Object.keys(vfs).length === 0 ? (
            <span style={{ color: '#64748b', fontSize: '0.82rem', fontStyle: 'italic' }}>(no files created yet)</span>
          ) : (
            Object.entries(vfs).map(([name, content]) => (
              <div key={name} style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>📄 {name}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.1rem', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px', whiteSpace: 'nowrap' }}>
                  "{content}"
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {inputs.length > 0 && (
        <div style={{ background: '#162032', padding: '0.7rem 1.4rem', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>USER INPUT:</span>
          {inputs.map((inp, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{inp.label}</label>
              <input value={vals[i]} onChange={e => { const v = [...vals]; v[i] = e.target.value; setVals(v); }}
                style={{ background: '#1e293b', border: '1px solid #475569', color: '#e2e8f0', padding: '0.3rem 0.6rem', borderRadius: '6px', width: inp.width || '80px', fontSize: '0.88rem', fontFamily: 'monospace' }} />
            </div>
          ))}
        </div>
      )}
      <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
        style={{ width: '100%', minHeight: '180px', background: '#0d1b2a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.89rem', lineHeight: 1.8, padding: '1.1rem', border: 'none', outline: 'none', resize: 'vertical', borderBottom: '1px solid #1e293b', boxSizing: 'border-box' }} />
      <div style={{ padding: '0.75rem 1.4rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#111827' }}>
        <button onClick={run}
          style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: 'white', border: 'none', padding: '0.52rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
          <Play size={14} fill="white" /> Run Code
        </button>
        {ran && <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Done</span>}
      </div>
      {output && (
        <div style={{ borderTop: '1px solid #1e293b', padding: '0.9rem 1.4rem', background: '#0a1628' }}>
          <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.06em' }}>Output</div>
          {output.lines.map((line, i) => (
            <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: output.isError ? '#f87171' : '#34d399', lineHeight: 1.8 }}>{line}</div>
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
  { q: "Which parameter is used in open() to open a file for appending data?", opts: ["'r'", "'w'", "'a'", "'x'"], ans: 2, exp: "The 'a' mode opens a file for appending. New data is written to the end of the file." },
  { q: "Which block in exception handling ALWAYS runs regardless of whether an error occurred?", opts: ["except", "else", "finally", "try"], ans: 2, exp: "The finally block is guaranteed to execute at the end, making it ideal for cleaning up resources like closing files." },
  { q: "What happens when you open a non-existent file in write ('w') mode?", opts: ["Throws FileNotFoundError", "Creates a new empty file", "Throws a ValueError", "No-op"], ans: 1, exp: "Write mode ('w') automatically creates a new file if it does not already exist on the filesystem." },
  { q: "Which keyword is used in Python to trigger/throw a custom exception manually?", opts: ["trigger", "throw", "raise", "except"], ans: 2, exp: "The raise keyword is used to trigger/raise custom exceptions (e.g. raise ValueError)." },
  { q: "What is the safest way to open files in Python ensuring they are closed automatically?", opts: ["f = open()", "try/except", "using the with open() context manager", "f.close()"], ans: 2, exp: "The 'with open(...) as f:' context manager automatically closes the file handle when the block is exited, even if errors occur." },
  { q: "Which exception class matches dividing a number by zero?", opts: ["ValueError", "TypeError", "ZeroDivisionError", "IndexError"], ans: 2, exp: "ZeroDivisionError is raised when the denominator in a division or modulo operation is zero." },
  { q: "What happens when you try to write to a file opened in read ('r') mode?", opts: ["Automatically changes to write mode", "Throws an UnsupportedOperation error", "Successfully writes", "Quietly fails"], ans: 1, exp: "Opening a file in read-only mode throws an UnsupportedOperation exception if you attempt a .write() call." },
  { q: "Which except block structure handles ANY unclassified runtime error?", opts: ["except FileNotFoundError:", "except: (or except Exception:)", "except Value:", "except Error:"], ans: 1, exp: "A general 'except:' or 'except Exception:' block catches all standard exceptions that inherit from the BaseException class." },
  { q: "What is the file closing method?", opts: ".stop()", opts: [".stop()", ".end()", ".close()", ".quit()"], ans: 2, exp: "The .close() method flushes and closes the file stream wrapper." },
  { q: "Which parameter mode opens a file in binary mode?", opts: ["'r'", "'b'", "'t'", "'+'"], ans: 1, exp: "The 'b' parameter suffix denotes binary mode, used for non-text files like images or zip archives." },
  { q: "What is the purpose of the else block in try-except statements?", opts: ["Runs if an exception is raised", "Runs only if no exceptions were raised", "Always runs", "Acts as default handler"], ans: 1, exp: "The else block runs only if the code inside the try block executes successfully without raising any exceptions." },
  { q: "Which exception is raised when conversion from string to integer fails, like int('hello')?", opts: ["TypeError", "ValueError", "NameError", "KeyError"], ans: 1, exp: "ValueError is raised when an argument has the right type but an inappropriate value." }
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PythonDay8({ activeTab, onNavigate }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const nav = (tab) => { onNavigate('python_day8', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const quizScore = quizData.reduce((a, q, i) => a + (quizAnswers[i] === q.ans ? 1 : 0), 0);

  return (
    <AnimatePresence mode="wait">

      {/* ─── TAB 1: INTRO ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 8 • Overview" title="File & Exception Handling">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.6rem', margin: '0 0 1rem', fontWeight: 800 }}>Persistence & Robustness</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.05rem' }}>
                Day 8 introduces two core software engineering concepts: **File Handling** (reading/writing data to files permanently) and **Exception Handling** (gracefully intercepting and managing runtime code crashes).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.3rem', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>💾 1. File Handling</h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Learn to save user logs, configuration, and variables permanently. Create, read, edit, and append data using Python's file objects.
                </p>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.3rem', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>🛡️ 2. Exception Handling</h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Prevent program crashes! Learn to catch, manage, and bypass standard Python exceptions (like <code>ValueError</code> or <code>FileNotFoundError</code>).
                </p>
              </div>
            </div>

            <Playground
              id="intro"
              title="Interactive File Previewer"
              initialFiles={{ "hello.txt": "Hello Python World!" }}
              defaultCode={`# Let's open hello.txt and read it!
with open("hello.txt", "r") as f:
    text = f.read()
    print("File Content:", text)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('file_handling')}>Next: File Handling <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: FILE HANDLING ─── */}
      {activeTab === 'file_handling' && (
        <Section key="file_handling" eyebrow="Day 8 • Persistence" title="Opening, Reading & Writing Files">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              To work with files, Python uses the built-in <code>open(filename, mode)</code> function.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem' }}>📂 Common Opening Modes:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { m: "'r'", d: "Read mode (Default). Fails if file does not exist." },
                { m: "'w'", d: "Write mode. Creates file, overrides all existing content." },
                { m: "'a'", d: "Append mode. Appends new data to the end of the file." }
              ].map((x, i) => (
                <div key={i} style={{ background: '#eff6ff', borderRadius: '8px', padding: '1rem', border: '1px solid #bfdbfe' }}>
                  <code style={{ fontSize: '1rem', color: '#1d4ed8', fontWeight: 700 }}>{x.m}</code>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>{x.d}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem' }}>🛡️ The Context Manager: <code>with open()</code></h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>
              The <code>with</code> keyword ensures that the file handle is closed automatically as soon as the block is exited, protecting the stream from data corruption:
            </p>

            <CodeBlock title="context_manager.py">
              {c('# Writing data safely')}<br />
              {kw('with')} {fn('open')}({st('"data.txt"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Python persistence text."')})<br /><br />
              {c('# Reading data safely')}<br />
              {kw('with')} {fn('open')}({st('"data.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;content = f.read()<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(content) {ok('# "Python persistence text."')}
            </CodeBlock>

            <Playground
              id="file_handling_play"
              title="Test Virtual Writing"
              defaultCode={`# Write to a file
with open("user_log.txt", "w") as myfile:
    myfile.write("Log Entry #1: User logged in.\\n")

# Append to the file
with open("user_log.txt", "a") as myfile:
    myfile.write("Log Entry #2: User loaded dashboard.\\n")

# Read the file
with open("user_log.txt", "r") as myfile:
    print(myfile.read())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('exception_handling')}>Next: Exception Handling <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: EXCEPTION HANDLING ─── */}
      {activeTab === 'exception_handling' && (
        <Section key="exception_handling" eyebrow="Day 8 • Robustness" title="Exception Handling: try / except">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Runtime errors in Python are called <strong>Exceptions</strong>. Exception handling uses the <code>try</code>, <code>except</code>, <code>else</code>, and <code>finally</code> block syntax to intercept and manage crashes.
            </p>

            <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '1.3rem', border: '1px solid #bfdbfe', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '6px' }}>🛡️ The Exception Syntax:</h4>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                <strong>try:</strong> Runs code block that might fail.<br />
                <strong>except Error:</strong> Runs code block if specified exception occurs.<br />
                <strong>else:</strong> Runs if no exceptions were thrown in try block.<br />
                <strong>finally:</strong> Always runs at the end (useful for closing file streams).
              </p>
            </div>

            <CodeBlock title="try_except_example.py">
              {kw('try')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;num = {fn('int')}({fn('input')}({st('"Enter divisor: "')}))<br />
              &nbsp;&nbsp;&nbsp;&nbsp;result = {nm('10')} / num<br />
              {kw('except')} ZeroDivisionError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Error: Cannot divide by zero!"')})<br />
              {kw('except')} ValueError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Error: Please enter a valid number!"')})<br />
              {kw('else')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Division result:"')}, result)<br />
              {kw('finally')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Execution complete."')})
            </CodeBlock>

            <Playground
              id="try_except_play"
              title="Test Exceptions in Real Time"
              inputs={[{ label: 'Divisor input =', default: '0' }]}
              defaultCode={`try:
    num = int(input("Enter number: "))
    result = 100 / num
    print("Result:", result)
except ZeroDivisionError:
    print("Caught division by zero exception!")
except ValueError:
    print("Caught type conversion value exception!")
finally:
    print("This runs no matter what!")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('pickle')}>Next: Object Pickling <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: OBJECT PICKLING ─── */}
      {activeTab === 'pickle' && (
        <Section key="pickle" eyebrow="Day 8 • Serialization" title="Object Pickling & Unpickling">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              When working with files, we often need to store complex data structures (like <strong>lists</strong> or <strong>dictionaries</strong>) permanently. Plain text mode only supports string data. To solve this, Python provides the <strong>Pickle</strong> module.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>🧠 Terminology & Core Concepts:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fafafa', borderRadius: '10px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>🥒 Serialization (Pickling)</strong>
                <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                  The process of converting a Python object hierarchy (lists, dictionaries, custom class instances) into a byte stream. It uses <code>pickle.dump(obj, file)</code>.
                </span>
              </div>
              <div style={{ background: '#fafafa', borderRadius: '10px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>🔓 Deserialization (Unpickling)</strong>
                <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                  The inverse operation, where a byte stream from a file is converted back into an active Python object in memory. It uses <code>pickle.load(file)</code>.
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>📂 Summary of File Handling Modes Covered:</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2.2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 0.5rem', color: '#0f172a', fontWeight: 700 }}>Mode Parameter</th>
                  <th style={{ padding: '0.75rem 0.5rem', color: '#0f172a', fontWeight: 700 }}>Description & Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ color: '#3b82f6', fontWeight: 700 }}>'r'</code></td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#475569' }}>Opens a text file for reading. Raises <code>FileNotFoundError</code> if missing.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ color: '#3b82f6', fontWeight: 700 }}>'w'</code></td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#475569' }}>Opens a text file for writing. Overwrites or creates if missing.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ color: '#3b82f6', fontWeight: 700 }}>'a'</code></td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#475569' }}>Opens for appending data to end. Creates file if missing.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ color: '#3b82f6', fontWeight: 700 }}>'wb' / 'rb'</code></td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#475569' }}><strong>Binary modes</strong>. Necessary for Pickle operations. Write Binary / Read Binary.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ color: '#3b82f6', fontWeight: 700 }}>'+' (e.g. 'r+')</code></td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#475569' }}><strong>Read & Write mode</strong>. Opens file for both reading and writing simultaneously.</td>
                </tr>
              </tbody>
            </table>

            <CodeBlock title="pickle_example.py">
              {kw('import')} pickle<br /><br />
              user_profile = &#123;<span style={{ color: '#a5b4fc' }}>"username"</span>: <span style={{ color: '#a5b4fc' }}>"alex"</span>, <span style={{ color: '#a5b4fc' }}>"score"</span>: <span style={{ color: '#fbbf24' }}>95</span>&#125;<br /><br />
              {c('# Pickling (Serialization) to binary file')}<br />
              {kw('with')} {fn('open')}({st('"data.pkl"')}, {st('"wb"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;pickle.dump(user_profile, f)<br /><br />
              {c('# Unpickling (Deserialization) from binary file')}<br />
              {kw('with')} {fn('open')}({st('"data.pkl"')}, {st('"rb"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;loaded_profile = pickle.load(f)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(loaded_profile[<span style={{ color: '#a5b4fc' }}>"username"</span>]) {ok('# Output: alex')}
            </CodeBlock>

            <Playground
              id="pickle_play"
              title="Test Pickling Sandbox"
              defaultCode={`import pickle

user_state = {"username": "Alex", "score": 98, "active": True}

# 1. Pickle the dictionary object into user_state.pkl
with open("user_state.pkl", "wb") as f:
    pickle.dump(user_state, f)
    print("State pickled successfully!")

# 2. Unpickle back into memory
with open("user_state.pkl", "rb") as f:
    loaded_data = pickle.load(f)
    print("Unpickled Object:", loaded_data)
    print("Verified score:", loaded_data["score"])`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('practice')}>Next: Notes Taking App <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: PRACTICE NOTE-TAKING APP ─── */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 8 • Capstone" title="💾 Notes Taking Application">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#0c4a6e,#0284c7)', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>Day 8 Capstone: Virtual Notes Database</h3>
              <p style={{ color: '#bae6fd', margin: 0, lineHeight: 1.7 }}>
                Build a program that handles user logs. Appends note texts, displays saved contents, and handles <code>FileNotFoundError</code> exceptions if students look up non-existent note cards.
              </p>
            </div>

            <CodeBlock title="notes_app.py">
              {c('# Save a note')}<br />
              {kw('with')} {fn('open')}({st('"notes.txt"')}, {st('"a"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Study file operations\\n"')})<br /><br />
              {c('# Read notes with FileNotFoundError check')}<br />
              {kw('try')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('with')} {fn('open')}({st('"notes.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f.read())<br />
              {kw('except')} FileNotFoundError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Warning: No notes exist yet. Writing notes..."')})
            </CodeBlock>

            <Playground
              id="notes_play"
              title="Test Note Taking Database"
              inputs={[
                { label: 'Choose Option (1=Read, 2=Write) =', default: '2', width: '60px' },
                { label: 'Note Text (for Write) =', default: 'Finish python Day 8 assignment!', width: '200px' }
              ]}
              initialFiles={{}}
              defaultCode={`# Interactive Notes Manager
choice = input("Choice: ")

if choice == "1":
    try:
        with open("notes.txt", "r") as f:
            print("--- Saved Notes ---")
            print(f.read())
    except FileNotFoundError:
        print("Error: No note card has been created yet!")
elif choice == "2":
    note_text = input("Note: ")
    with open("notes.txt", "a") as f:
        f.write(note_text + "\\n")
    print("Note successfully saved to file notes.txt!")
else:
    print("Invalid option.")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('assignment_work')}>Next: Assignment 📝 <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: ASSIGNMENT ─── */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 8 • Assignment" title="📝 Day 8 Assignment">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#1f2937,#111827)', padding: '1.8rem', borderRadius: '14px', color: 'white', marginBottom: '2.5rem' }}>
              <h3 style={{ margin: '0 0 0.6rem', fontSize: '1.4rem', fontWeight: 800 }}>Rules</h3>
              <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>Save your script as <code style={{ color: '#fde68a' }}>day8_assignment.py</code>. Write modular functions using built-in file methods or try-except blocks.</p>
            </div>

            {[
              { n: 1, t: 'File Creator', diff: 'Easy', col: '#10b981', desc: 'Write a function write_file(filename, text) that creates a file and writes the text into it.' },
              { n: 2, t: 'File Safe Reader', diff: 'Easy', col: '#10b981', desc: 'Write a function read_file_safe(filename) that reads a file and returns its content. Catch FileNotFoundError and return a friendly error message.' },
              { n: 3, t: 'Logging Logger', diff: 'Easy', col: '#10b981', desc: 'Write a function log_activity(log_text) that appends log_text followed by a newline into user_log.txt.' },
              { n: 4, t: 'Vowel Counter in File', diff: 'Medium', col: '#f59e0b', desc: 'Write a function count_vowels_in_file(filename) that reads a file and returns the number of vowels present. Handle errors if the file does not exist.' },
              { n: 5, t: 'Word Count in File', diff: 'Medium', col: '#f59e0b', desc: 'Write a function count_words(filename) that counts and returns the number of words inside a text file.' },
              { n: 6, t: 'Number Splitter', diff: 'Medium', col: '#f59e0b', desc: 'Write a function safe_divide(a, b) that performs a / b. Catch ZeroDivisionError and TypeError, printing clean error logs.' },
              { n: 7, t: 'List Reader', diff: 'Medium', col: '#f59e0b', desc: 'Write a function read_lines_list(filename) that returns all lines from a file as a Python list. Handle FileNotFoundError.' },
              { n: 8, t: 'Float Input Parser', diff: 'Medium', col: '#f59e0b', desc: 'Write a function read_float_input() that prompts the user for float input. Keep prompting using while loop and try-except until a valid float is inputted.' },
              { n: 9, t: 'File Copier', diff: 'Hard', col: '#ef4444', desc: 'Write a function copy_file(src, dest) that reads contents from a source file and writes them to a destination file. Catch exceptions.' },
              { n: 10, t: 'Custom Exception Handler', diff: 'Hard', col: '#ef4444', desc: 'Write a function check_positive_number(num) that raises a ValueError("Number must be positive") if num is negative, and prints it if positive.' }
            ].map(task => (
              <div key={task.n} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.3rem', marginBottom: '1rem', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ background: '#0f172a', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{task.n}</span>
                    <h4 style={{ margin: 0, color: '#0f172a' }}>{task.t}</h4>
                  </div>
                  <span style={{ background: `${task.col}20`, color: task.col, padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>{task.diff}</span>
                </div>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.6, fontSize: '0.93rem', paddingLeft: '40px' }}>{task.desc}</p>
              </div>
            ))}

            <div className="card-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => nav('quiz')}>Take Quiz 🧠 <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: QUIZ ─── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Day 8 • Assessment" title="🧠 Quiz — File & Exception Handling">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', padding: '1.8rem', borderRadius: '14px', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', fontWeight: 800 }}>Score Card Quiz!</h3>
              <p style={{ color: '#c7d2fe', margin: 0 }}>{quizData.length} questions · Select answers · Click Submit to score.</p>
            </div>

            {quizData.map((q, qi) => {
              const selected = quizAnswers[qi];
              const isCorrect = selected === q.ans;
              return (
                <div key={qi} style={{ border: `2px solid ${quizSubmitted ? (isCorrect ? '#10b981' : '#ef4444') : selected !== undefined ? '#3b82f6' : '#e2e8f0'}`, borderRadius: '14px', padding: '1.3rem', marginBottom: '1.1rem', background: 'white', transition: 'border-color 0.3s' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '1rem' }}>
                    <span style={{ background: '#0f172a', color: 'white', minWidth: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>{qi + 1}</span>
                    <p style={{ margin: 0, color: '#0f172a', fontWeight: 600, lineHeight: 1.5 }}>{q.q}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '0.55rem', paddingLeft: '40px' }}>
                    {q.opts.map((opt, oi) => {
                      let bg = '#f8fafc', border = '#e2e8f0', textCol = '#475569';
                      if (selected === oi && !quizSubmitted) { bg = '#eff6ff'; border = '#3b82f6'; textCol = '#1d4ed8'; }
                      if (quizSubmitted) {
                        if (oi === q.ans) { bg = '#d1fae5'; border = '#10b981'; textCol = '#065f46'; }
                        else if (selected === oi) { bg = '#fee2e2'; border = '#ef4444'; textCol = '#991b1b'; }
                      }
                      return (
                        <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(p => ({ ...p, [qi]: oi }))}
                          style={{ background: bg, border: `2px solid ${border}`, color: textCol, padding: '0.65rem 1rem', borderRadius: '8px', textAlign: 'left', cursor: quizSubmitted ? 'default' : 'pointer', fontWeight: selected === oi || quizSubmitted && oi === q.ans ? 600 : 400, fontSize: '0.88rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {quizSubmitted && oi === q.ans && <CheckCircle size={15} color="#10b981" />}
                          {quizSubmitted && selected === oi && oi !== q.ans && <XCircle size={15} color="#ef4444" />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div style={{ marginTop: '0.7rem', paddingLeft: '40px', background: isCorrect ? '#f0fdf4' : '#fef2f2', padding: '0.7rem 1rem 0.7rem 50px', borderRadius: '8px' }}>
                      <span style={{ color: isCorrect ? '#065f46' : '#991b1b', fontSize: '0.87rem' }}>
                        {isCorrect ? '✅ Correct! ' : '❌ Wrong. '}{q.exp}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button onClick={() => { if (Object.keys(quizAnswers).length < quizData.length) { alert(`Please answer all ${quizData.length} questions!`); return; } setQuizSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: '#312e81', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(49,46,129,0.3)' }}>
                  Submit Quiz 🚀
                </button>
                <p style={{ color: '#94a3b8', marginTop: '0.7rem', fontSize: '0.88rem' }}>Answered {Object.keys(quizAnswers).length}/{quizData.length}</p>
              </div>
            ) : (
              <div style={{ background: quizScore >= 11 ? 'linear-gradient(135deg,#065f46,#10b981)' : quizScore >= 8 ? 'linear-gradient(135deg,#1d4ed8,#3b82f6)' : 'linear-gradient(135deg,#92400e,#f59e0b)', padding: '2rem', borderRadius: '16px', textAlign: 'center', marginTop: '1rem' }}>
                <Trophy size={48} color="white" style={{ marginBottom: '0.8rem' }} />
                <h3 style={{ color: 'white', fontSize: '2rem', margin: '0 0 0.5rem', fontWeight: 900 }}>{quizScore}/{quizData.length}</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', margin: '0 0 1.2rem' }}>
                  {quizScore === quizData.length ? '🏆 Perfect! Persistence & Safety Mastered!' : quizScore >= 10 ? '🥇 Excellent Work!' : quizScore >= 7 ? '🥈 Good Job! Review answers below.' : '📚 Keep reviewing try-except blocks and context manager syntax!'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'white', color: '#1d4ed8', border: 'none', padding: '0.7rem 1.8rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    Retake 🔄
                  </button>
                  <button onClick={() => nav('intro')}
                    style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid rgba(255,255,255,0.5)', padding: '0.7rem 1.8rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
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
