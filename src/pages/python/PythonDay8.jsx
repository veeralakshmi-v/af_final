import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Play, RefreshCw, BookOpen, Cpu, Filter, Terminal, Trophy, Zap, CheckCircle, XCircle, FileText, Folder, ShieldAlert, Sliders, Database, Layers, Copy } from 'lucide-react';

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
    this.mode = (mode || 'r').replace(/['"]/g, '').trim();
    this.vfs = vfs;
    this.closed = false;
    this.pos = 0;

    if (this.mode.includes('x')) {
      if (this.filename in this.vfs) {
        throw new Error(`FileExistsError: [Errno 17] File exists: '${this.filename}'`);
      }
      this.vfs[this.filename] = '';
    } else if (this.mode.includes('w')) {
      this.vfs[this.filename] = '';
    } else if (this.mode.includes('r')) {
      if (!(this.filename in this.vfs)) {
        throw new Error(`FileNotFoundError: [Errno 2] No such file or directory: '${this.filename}'`);
      }
    } else if (this.mode.includes('a')) {
      if (!(this.filename in this.vfs)) {
        this.vfs[this.filename] = '';
      }
      this.pos = (this.vfs[this.filename] || '').length;
    }
  }

  read(size) {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
    if (!this.mode.includes('r') && !this.mode.includes('+')) {
      throw new Error("UnsupportedOperation: not readable");
    }
    const content = this.vfs[this.filename] || '';
    if (size === undefined || size === null || size < 0) {
      const res = content.slice(this.pos);
      this.pos = content.length;
      return res;
    }
    const res = content.slice(this.pos, this.pos + size);
    this.pos += res.length;
    return res;
  }

  readline() {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
    if (!this.mode.includes('r') && !this.mode.includes('+')) {
      throw new Error("UnsupportedOperation: not readable");
    }
    const content = this.vfs[this.filename] || '';
    if (this.pos >= content.length) return '';
    const nextNewline = content.indexOf('\n', this.pos);
    if (nextNewline === -1) {
      const line = content.slice(this.pos);
      this.pos = content.length;
      return line;
    } else {
      const line = content.slice(this.pos, nextNewline + 1);
      this.pos = nextNewline + 1;
      return line;
    }
  }

  readlines() {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
    const lines = [];
    while (true) {
      const l = this.readline();
      if (!l) break;
      lines.push(l);
    }
    return lines;
  }

  write(text) {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
    if (this.mode === 'r') throw new Error("UnsupportedOperation: not writable");
    const str = String(text);
    const content = this.vfs[this.filename] || '';
    if (this.mode.includes('a')) {
      this.vfs[this.filename] = content + str;
      this.pos = this.vfs[this.filename].length;
    } else {
      const prefix = content.slice(0, this.pos);
      this.vfs[this.filename] = prefix + str;
      this.pos += str.length;
    }
    return str.length;
  }

  writelines(lines) {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
    let count = 0;
    if (Array.isArray(lines)) {
      for (const line of lines) {
        count += this.write(line);
      }
    }
    return count;
  }

  tell() {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
    return this.pos;
  }

  seek(offset, whence = 0) {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
    const content = this.vfs[this.filename] || '';
    let target = 0;
    if (whence === 0) target = offset;
    else if (whence === 1) target = this.pos + offset;
    else if (whence === 2) target = content.length + offset;
    this.pos = Math.max(0, Math.min(content.length, target));
    return this.pos;
  }

  flush() {
    if (this.closed) throw new Error("ValueError: I/O operation on closed file.");
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
        if (trimLine.startsWith('import ') || trimLine.startsWith('from ')) {
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
          const match = trimLine.match(/^with\s+open\((.+?)\)\s+as\s+([a-zA-Z_]\w*)\s*:$/);
          if (match) {
            const argsStr = match[1];
            const varName = match[2];
            const parts = splitByTopLevelCommas(argsStr);
            const filenameExpr = parts[0];
            const modeExpr = parts[1] || '"r"';
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
          let else_body = null;
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
            } else if (nextTrim.startsWith('else:')) {
              i++;
              else_body = parseBlock(baseIndent + 4);
            } else if (nextTrim.startsWith('finally:')) {
              i++;
              finally_body = parseBlock(baseIndent + 4);
              break;
            } else {
              break;
            }
          }
          block.push({ type: 'try', body, handlers, else_body, finally_body });
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

        if (trimLine.startsWith('raise ')) {
          const errExpr = trimLine.slice(6).trim();
          block.push({ type: 'raise', errExpr });
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
  let depth = 0, inStr = false, strChar = '', cur = '';
  for (let idx = 0; idx < text.length; idx++) {
    const c = text[idx];
    if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; cur += c; }
    else if (inStr && c === strChar) { inStr = false; cur += c; }
    else if (!inStr && (c === '(' || c === '[' || c === '{')) { depth++; cur += c; }
    else if (!inStr && (c === ')' || c === ']' || c === '}')) { depth--; cur += c; }
    else if (!inStr && c === ',' && depth === 0) { args.push(cur.trim()); cur = ''; }
    else { cur += c; }
  }
  if (cur.trim()) args.push(cur.trim());
  return args;
}

function translateTuplesToArrays(text) {
  let result = '';
  let inStr = false, strChar = '', i = 0;
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

    // Method calls
    const methodMatch = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (methodMatch) {
      const varName = methodMatch[1];
      const method = methodMatch[2];
      const argStr = methodMatch[3];
      const args = argStr ? splitByTopLevelCommas(argStr).map(x => evalExpr(x.trim(), scope)) : [];
      const obj = scope[varName] !== undefined ? scope[varName] : env[varName];

      if (obj instanceof VirtualFileHandle) {
        if (method === 'read') return obj.read(args[0]);
        if (method === 'readline') return obj.readline();
        if (method === 'readlines') return obj.readlines();
        if (method === 'write') return obj.write(args[0]);
        if (method === 'writelines') return obj.writelines(args[0]);
        if (method === 'tell') return obj.tell();
        if (method === 'seek') return obj.seek(args[0], args[1] !== undefined ? args[1] : 0);
        if (method === 'flush') return obj.flush();
        if (method === 'close') { obj.close(); return null; }
      }

      if (obj !== undefined && obj !== null) {
        if (Array.isArray(obj)) {
          if (method === 'append') { obj.push(args[0]); return null; }
          if (method === 'insert') { obj.splice(args[0], 0, args[1]); return null; }
          if (method === 'pop') { return args.length > 0 ? obj.splice(args[0], 1)[0] : obj.pop(); }
          if (method === 'remove') { const pos = obj.indexOf(args[0]); if (pos !== -1) obj.splice(pos, 1); return null; }
          if (method === 'join') return obj.join(args[0] !== undefined ? args[0] : '');
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

        const open = (filename, mode = 'r') => new VirtualFileHandle(filename, mode, virtualFiles);

        const shutil = {
          copy: (src, dst) => { virtualFiles[dst] = virtualFiles[src]; return dst; },
          copyfile: (src, dst) => { virtualFiles[dst] = virtualFiles[src]; return dst; }
        };

        const json = {
          dumps: (obj, indent) => JSON.stringify(obj, null, indent ? 2 : undefined),
          loads: (s) => JSON.parse(s),
          dump: (obj, f) => { f.write(JSON.stringify(obj, null, 2)); return null; },
          load: (f) => JSON.parse(f.read())
        };

        const csv = {
          reader: (f) => {
            const text = typeof f === 'string' ? f : f.read();
            return text.split('\\n').filter(l => l.trim().length > 0).map(l => l.split(',').map(c => c.trim()));
          },
          writer: (f) => ({
            writerow: (row) => { f.write(row.join(',') + '\\n'); },
            writerows: (rows) => { rows.forEach(r => f.write(r.join(',') + '\\n')); }
          }),
          DictReader: (f) => {
            const text = typeof f === 'string' ? f : f.read();
            const lines = text.split('\\n').filter(l => l.trim().length > 0);
            if (lines.length === 0) return [];
            const headers = lines[0].split(',').map(h => h.trim());
            return lines.slice(1).map(line => {
              const cells = line.split(',').map(c => c.trim());
              const dict = {};
              headers.forEach((h, idx) => { dict[h] = cells[idx] !== undefined ? cells[idx] : ''; });
              return dict;
            });
          }
        };

        const pickle = {
          dump: (obj, f) => { f.write(JSON.stringify(obj)); return null; },
          load: (f) => JSON.parse(f.read())
        };

        const os = {
          path: {
            exists: (p) => p in virtualFiles,
            isfile: (p) => p in virtualFiles,
            isdir: (p) => false,
            getsize: (p) => (virtualFiles[p] || '').length,
            join: (...parts) => parts.join('/')
          },
          listdir: () => Object.keys(virtualFiles),
          remove: (p) => { if (p in virtualFiles) delete virtualFiles[p]; else throw new Error("FileNotFoundError"); },
          rename: (oldP, newP) => { if (oldP in virtualFiles) { virtualFiles[newP] = virtualFiles[oldP]; delete virtualFiles[oldP]; } else throw new Error("FileNotFoundError"); }
        };

        const Path = (filename) => ({
          read_text: () => virtualFiles[filename] || '',
          write_text: (txt) => { virtualFiles[filename] = String(txt); return txt.length; },
          exists: () => filename in virtualFiles,
          unlink: () => { delete virtualFiles[filename]; }
        });

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
        env[node.name] = { type: 'function', params: node.params, body: node.body };
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
      } else if (node.type === 'raise') {
        const err = evalExpr(node.errExpr, scope);
        throw new Error(String(err));
      } else if (node.type === 'try') {
        let exceptionThrown = null;
        try {
          const status = execBlock(node.body, scope);
          if (status) return status;
        } catch (e) {
          exceptionThrown = e;
          let handled = false;
          const errMsg = e.message;
          for (const handler of node.handlers) {
            if (errMsg.includes(handler.errClass) || handler.errClass === 'Exception') {
              const localEnv = { ...scope };
              if (handler.errVar) localEnv[handler.errVar] = errMsg;
              const status = execBlock(handler.body, localEnv);
              if (status) return status;
              handled = true;
              break;
            }
          }
          if (!handled) throw e;
        } finally {
          if (!exceptionThrown && node.else_body) {
            execBlock(node.else_body, scope);
          }
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
          if (obj && typeof obj === 'object') obj[key] = val;
        } else {
          if (op !== '=') {
            const cur = scope[name] !== undefined ? scope[name] : (env[name] !== undefined ? env[name] : 0);
            if (op === '+=') val = cur + val;
            else if (op === '-=') val = cur - val;
          }
          scope[name] = val;
          if (scope === env) env[name] = val;
        }
      } else if (node.type === 'print') {
        parsePrint(node.line, scope);
      } else if (node.type === 'break') {
        return 'break';
      } else if (node.type === 'continue') {
        return 'continue';
      } else if (node.type === 'pass') {
        // pass
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
        let items = evalExpr(node.iterExpr, scope);
        if (items instanceof VirtualFileHandle) {
          items = items.readlines();
        }
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
  if (buffer) formattedOutput.push(buffer);

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

      <div style={{ background: '#09111e', padding: '0.75rem 1.4rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>🗄️ Virtual Filesystem State:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {Object.keys(vfs).length === 0 ? (
            <span style={{ color: '#64748b', fontSize: '0.82rem', fontStyle: 'italic' }}>(no files created yet)</span>
          ) : (
            Object.entries(vfs).map(([name, content]) => (
              <div key={name} style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>📄 {name}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.1rem', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px', whiteSpace: 'nowrap' }}>
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
        style={{ width: '100%', minHeight: '190px', background: '#0d1b2a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.89rem', lineHeight: 1.8, padding: '1.1rem', border: 'none', outline: 'none', resize: 'vertical', borderBottom: '1px solid #1e293b', boxSizing: 'border-box' }} />
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
   COMPREHENSIVE 15-QUESTION QUIZ DATA
───────────────────────────────────────────── */
const quizData = [
  { q: "Which parameter is used in open() to open a file for appending data without truncating existing content?", opts: ["'r'", "'w'", "'a'", "'x'"], ans: 2, exp: "The 'a' (append) mode opens a file for appending data to the end of the file without deleting current contents." },
  { q: "Which method is best suited for copying content line-by-line from a source file into a target destination file?", opts: ["for line in src: dest.write(line)", "dest.copy(src)", "src.transfer(dest)", "dest.read(src)"], ans: 0, exp: "Streaming line-by-line using `for line in src:` and `dest.write(line)` copies large files memory-efficiently." },
  { q: "Which keyword is used to implement context managers in Python that automatically close file streams?", opts: ["using", "with", "manage", "auto"], ans: 1, exp: "The 'with' statement creates a context manager that guarantees the file handle will be closed upon block exit." },
  { q: "What exception is raised when attempting to open a non-existent file in read ('r') mode?", opts: ["FileExistsError", "FileNotFoundError", "IOError", "PermissionError"], ans: 1, exp: "FileNotFoundError is raised when trying to open a non-existent file path in read mode." },
  { q: "What happens when you open a file using exclusive creation mode ('x') if the file already exists?", opts: ["It overwrites the file", "It appends to the file", "It raises FileExistsError", "It ignores the operation"], ans: 2, exp: "Mode 'x' fails and raises FileExistsError if the target file already exists." },
  { q: "Which method reads all remaining lines from a file and returns them as a Python list of strings?", opts: ["readline()", "readlines()", "readall()", "extractlines()"], ans: 1, exp: "f.readlines() reads all lines from the current cursor position to EOF and returns a list." },
  { q: "What is the primary advantage of iterating directly over a file object (`for line in f:`)?", opts: ["It auto-formats text to uppercase", "It is memory efficient by streaming line-by-line", "It sorts lines alphabetically", "It converts lines into numbers"], ans: 1, exp: "Streaming line-by-line avoids loading multi-gigabyte files entirely into RAM at once." },
  { q: "Which Python standard library module provides built-in high-level file copying utilities like `shutil.copy()`?", opts: ["os", "sys", "shutil", "pathlib"], ans: 2, exp: "The shutil module provides high-level file copy operations like shutil.copy(src, dst)." },
  { q: "How can you open both a source file for reading and a destination file for writing in a single `with` statement?", opts: ["with open('src') as s, open('dst', 'w') as d:", "with open('src') and open('dst'):", "with open('src' -> 'dst'):", "with open('src') + open('dst'):"], ans: 0, exp: "Python allows comma-separated context managers: `with open('src') as s, open('dst', 'w') as d:`." },
  { q: "Which method forces unwritten buffered data in memory to be flushed directly to physical disk storage?", opts: ["sync()", "save()", "flush()", "commit()"], ans: 2, exp: "f.flush() flushes the write buffer without closing the file handle." },
  { q: "Which module in Python's standard library is designed for serializing complex Python objects into binary bytes?", opts: ["json", "pickle", "csv", "pathlib"], ans: 1, exp: "The pickle module serializes Python objects (lists, dicts, custom objects) into binary streams." },
  { q: "What is the difference between `json.dumps()` and `json.dump()`?", opts: ["dumps writes to a string, dump writes to a file stream", "dump converts to string, dumps writes to file", "They are identical aliases", "dumps works only on lists"], ans: 0, exp: "json.dumps(obj) converts object to a JSON formatted string, whereas json.dump(obj, file) writes directly to a file handle." },
  { q: "Which block in exception handling always executes regardless of whether an exception occurred?", opts: ["except", "else", "finally", "catch"], ans: 2, exp: "The finally block always runs at the end, making it ideal for cleanup operations like stream teardown." },
  { q: "What does the `else` block do in a `try-except-else-finally` statement?", opts: ["Executes if an exception occurs", "Executes ONLY if NO exception was raised in the try block", "Executes before the try block", "Reraises the exception"], ans: 1, exp: "The else block executes only when the try block completes successfully with zero exceptions." },
  { q: "Which method in the modern `pathlib.Path` class reads all text contents of a file directly as a string?", opts: ["read_text()", "get_string()", "load_content()", "fetch()"], ans: 0, exp: "Path('data.txt').read_text() opens, reads, and closes the text file in a single line." }
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

      {/* ─── TAB 1: OVERVIEW & STORAGE ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 8 • Overview" title="File Handling & Data Persistence">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.6rem', margin: '0 0 1rem', fontWeight: 800 }}>💾 Why Data Persistence Matters</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.05rem' }}>
                Variables, lists, and dictionaries in Python reside in <strong>RAM (Volatile Memory)</strong>. When a script finishes running or power is lost, RAM is cleared. <strong>File Handling</strong> enables permanent data persistence on hard drives or SSDs.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.3rem', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>📄 Text Files vs Binary Files</h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  • <strong>Text Files (.txt, .csv, .json, .log):</strong> Human-readable characters encoded in UTF-8 or ASCII with newline terminators (<code>\n</code>).<br />
                  • <strong>Binary Files (.png, .dat, .pkl, .exe):</strong> Raw byte streams without newline translations, read by specific software or serializers.
                </p>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.3rem', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>🔄 File Stream Lifecycle</h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  1. <strong>Open:</strong> Create file stream handle using <code>open(filename, mode)</code>.<br />
                  2. <strong>Process:</strong> Perform <code>read()</code>, <code>write()</code>, or copy operations.<br />
                  3. <strong>Flush/Close:</strong> Release stream buffer & unlock OS file descriptors using <code>close()</code>.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '1.3rem', border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#1e3a8a' }}>💾 1. File Handling</h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Learn to create, read, edit, append, and copy user logs, configuration files, and data structures permanently.
                </p>
              </div>
              <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '1.3rem', border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#1e3a8a' }}>🛡️ 2. Exception Handling</h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Prevent program crashes! Intercept runtime errors (like <code>FileNotFoundError</code> or <code>ValueError</code>) using <code>try/except</code>.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Program Examples:</h3>

            <CodeBlock title="program_1_basic_file_handling.py">
              {c('# Program 1: Creating, writing, reading, and closing a file stream')}<br />
              {c('# Step 1: Open file for writing')}<br />
              file_out = {fn('open')}({st('"user_profile.txt"')}, {st('"w"')})<br />
              file_out.write({st('"Username: Alex\\n"')})<br />
              file_out.write({st('"Role: Senior Developer\\n"')})<br />
              file_out.close() {c('# Always close streams')}<br /><br />
              {c('# Step 2: Open file for reading')}<br />
              file_in = {fn('open')}({st('"user_profile.txt"')}, {st('"r"')})<br />
              data = file_in.read()<br />
              {fn('print')}({st('"--- File Output ---"')})<br />
              {fn('print')}(data)<br />
              file_in.close()<br />
              {fn('print')}({st('"Is stream closed?"')}, file_in.closed)
            </CodeBlock>

            <CodeBlock title="program_2_file_properties.py">
              {c('# Program 2: Inspecting File Object Metadata Properties')}<br />
              f = {fn('open')}({st('"user_profile.txt"')}, {st('"r"')})<br />
              {fn('print')}({st('"File Name:"')}, f.name)<br />
              {fn('print')}({st('"File Mode:"')}, f.mode)<br />
              {fn('print')}({st('"Is Closed?"')}, f.closed)<br />
              f.close()<br />
              {fn('print')}({st('"Is Closed after .close()?"')}, f.closed)
            </CodeBlock>

            <Playground
              id="intro"
              title="Interactive File Stream Console"
              initialFiles={{ "welcome.txt": "Welcome to Python Data Persistence!\nLine 2: Permanent file storage." }}
              defaultCode={`# Program: Basic Open, Read, and Close
f = open("welcome.txt", "r")
content = f.read()
print("--- Read File Content ---")
print(content)
print("File Name:", f.name)
print("File Mode:", f.mode)
f.close()
print("Stream Closed Successfully:", f.closed)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('file_modes')}>Next: Opening Modes & Encoding <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: OPENING MODES & ENCODING ─── */}
      {activeTab === 'file_modes' && (
        <Section key="file_modes" eyebrow="Day 8 • File Modes" title="File Opening Modes & Character Encodings">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              The <code>open(filename, mode, encoding)</code> function requires specifying mode flags to dictate permissions and pointer behaviors.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>📊 Complete File Mode Matrix:</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Mode</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Access Type</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>If File Exists</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>If File Missing</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>'r'</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Read Only</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Pointer at start (0)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#ef4444', fontWeight: 600 }}>Raises FileNotFoundError</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>'w'</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Write Only</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#d97706', fontWeight: 600 }}>Truncates (deletes) contents</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#10b981', fontWeight: 600 }}>Creates new file</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>'a'</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Append Only</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Pointer at end of file</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#10b981', fontWeight: 600 }}>Creates new file</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>'x'</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Exclusive Write</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#ef4444', fontWeight: 600 }}>Raises FileExistsError</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#10b981', fontWeight: 600 }}>Creates new file</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>'r+'</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Read & Write</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Pointer at start (0)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#ef4444', fontWeight: 600 }}>Raises FileNotFoundError</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Mode Demonstration Programs:</h3>

            <CodeBlock title="program_1_mode_comparison.py">
              {c('# Program 1: Mode Comparison - Write vs Append')}<br />
              {c('# Mode "w" overwrites file completely')}<br />
              {kw('with')} {fn('open')}({st('"demo.txt"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"First Line\\n"')})<br /><br />
              {c('# Mode "a" appends without deleting existing content')}<br />
              {kw('with')} {fn('open')}({st('"demo.txt"')}, {st('"a"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Second Line Appended\\n"')})<br /><br />
              {kw('with')} {fn('open')}({st('"demo.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f.read())
            </CodeBlock>

            <CodeBlock title="program_2_exclusive_mode.py">
              {c('# Program 2: Exclusive Creation Mode "x" Prevents Accidental Overwrites')}<br />
              filename = {st('"system_config.txt"')}<br />
              {kw('try')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('with')} {fn('open')}(filename, {st('"x"')}, encoding={st('"utf-8"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"PORT=8080\\nENVIRONMENT=production\\n"')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Configuration file created!"')})<br />
              {kw('except')} FileExistsError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"Warning: File {filename} already exists! Cannot overwrite."')})
            </CodeBlock>

            <Playground
              id="file_modes_play"
              title="Test Exclusive Creation & Append Modes"
              initialFiles={{ "app.log": "[INFO] Server started\n" }}
              defaultCode={`# Program: Safe File Creation & Logging
try:
    with open("app.log", "x") as f:
        f.write("Header: New Log File\\n")
except FileExistsError:
    print("Caught FileExistsError: app.log already exists! Appending instead.")

# Append new log line
with open("app.log", "a") as f:
    f.write("[INFO] User authenticated successfully\\n")

# Read final file content
with open("app.log", "r") as f:
    print("\\n--- Current app.log Content ---")
    print(f.read())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('file_reading')}>Next: Reading Files & Iteration <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: READING FILES & ITERATION ─── */}
      {activeTab === 'file_reading' && (
        <Section key="file_reading" eyebrow="Day 8 • Reading" title="Reading Files & Memory-Efficient Iteration">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Python provides four distinct methods to read content from an open file handle depending on file size and performance needs.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Practical Reading Programs:</h3>

            <CodeBlock title="program_1_read_all_vs_chunks.py">
              {c('# Program 1: Reading All Content vs Specific Byte Chunks')}<br />
              {kw('with')} {fn('open')}({st('"sample.txt"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Python File Handling Tutorial for Beginners"')})<br /><br />
              {kw('with')} {fn('open')}({st('"sample.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;chunk1 = f.read(<span style={{ color: '#fbbf24' }}>6</span>) {c('# Reads first 6 characters')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;chunk2 = f.read(<span style={{ color: '#fbbf24' }}>13</span>) {c('# Reads next 13 characters')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Chunk 1:"')}, chunk1) {c('# Output: Python')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Chunk 2:"')}, chunk2) {c('# Output:  File Handling')}
            </CodeBlock>

            <CodeBlock title="program_2_readline_and_readlines.py">
              {c('# Program 2: readline() vs readlines()')}<br />
              {kw('with')} {fn('open')}({st('"fruits.txt"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Apple\\nBanana\\nCherry\\n"')})<br /><br />
              {c('# readline() reads 1 line at a time')}<br />
              {kw('with')} {fn('open')}({st('"fruits.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;line1 = f.readline()<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Line 1:"')}, line1.strip())<br /><br />
              {c('# readlines() returns a list of all lines')}<br />
              {kw('with')} {fn('open')}({st('"fruits.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;lines_list = f.readlines()<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"List of lines:"')}, lines_list)
            </CodeBlock>

            <CodeBlock title="program_3_streaming_line_by_line.py">
              {c('# Program 3: Memory-Efficient Streaming for Large Files (for line in f:)')}<br />
              {kw('with')} {fn('open')}({st('"server.log"')}, {st('"r"')}) {kw('as')} file:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} line_num, line {kw('in')} {fn('enumerate')}(file, <span style={{ color: '#fbbf24' }}>1</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {st('"ERROR"')} {kw('in')} line:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"Error on line {line_num}: {line.strip()}"')})
            </CodeBlock>

            <Playground
              id="reading_play"
              title="Test Reading Methods Console"
              initialFiles={{ "data.txt": "Item 1: Apples\nItem 2: Bananas\nItem 3: Cherries\nItem 4: Dates" }}
              defaultCode={`# Program: Compare Reading Techniques
# 1. f.readline()
with open("data.txt", "r") as f:
    print("Readline 1:", f.readline().strip())
    print("Readline 2:", f.readline().strip())

# 2. f.readlines()
with open("data.txt", "r") as f:
    lines = f.readlines()
    print("\\nTotal Lines Count:", len(lines))

# 3. Stream line by line (Best Practice for large files)
print("\\n--- Streaming Line by Line ---")
with open("data.txt", "r") as f:
    for idx, line in enumerate(f, 1):
        print(f"Line {idx}: {line.strip()}")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('file_writing')}>Next: Writing, Appending & Flush <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: WRITING, APPENDING & FLUSH ─── */}
      {activeTab === 'file_writing' && (
        <Section key="file_writing" eyebrow="Day 8 • Writing" title="Writing, Appending & Stream Flushing">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Writing to files in Python is accomplished using <code>write()</code>, <code>writelines()</code>, and forcing buffer disk synchronization via <code>flush()</code>.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Practical Writing Programs:</h3>

            <CodeBlock title="program_1_write_vs_writelines.py">
              {c('# Program 1: f.write() vs f.writelines()')}<br />
              {c('# f.write() takes a single string')}<br />
              {kw('with')} {fn('open')}({st('"notes.txt"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Python Programming\\n"')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"File I/O Operations\\n"')})<br /><br />
              {c('# f.writelines() writes a list of strings')}<br />
              chapters = [<span style={{ color: '#a5b4fc' }}>"Chapter 1: Basics\n"</span>, <span style={{ color: '#a5b4fc' }}>"Chapter 2: Functions\n"</span>, <span style={{ color: '#a5b4fc' }}>"Chapter 3: Files\n"</span>]<br />
              {kw('with')} {fn('open')}({st('"index.txt"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.writelines(chapters)<br /><br />
              {kw('with')} {fn('open')}({st('"index.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f.read())
            </CodeBlock>

            <CodeBlock title="program_2_flush_buffers.py">
              {c('# Program 2: Stream Buffer Flushing using f.flush()')}<br />
              {kw('import')} time<br /><br />
              {kw('with')} {fn('open')}({st('"live_log.txt"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Log entry 1: System boot\\n"')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.flush() {c('# Force write from RAM buffer to physical disk immediately')}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Log entry 1 written and flushed to disk!"')})
            </CodeBlock>

            <Playground
              id="writing_play"
              title="Test Writing & Flushing Console"
              defaultCode={`# Program: Writing List of Strings & Flushing
lines = [
    "Student Report Card\\n",
    "-------------------\\n",
    "Alice: Grade A\\n",
    "Bob: Grade B\\n"
]

with open("report_card.txt", "w") as f:
    written_bytes = f.writelines(lines)
    f.flush()
    print("Report card written and flushed!")

with open("report_card.txt", "r") as f:
    print("\\n--- Output ---")
    print(f.read())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('file_copying')}>Next: Copying Files (File to File) <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: COPYING FILES (FILE TO FILE) ─── */}
      {activeTab === 'file_copying' && (
        <Section key="file_copying" eyebrow="Day 8 • File Operations" title="📋 Copying Content: Saving One File into Another File">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#0284c7,#0369a1)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.6rem', fontWeight: 800 }}>📂 File-to-File Data Copying</h3>
              <p style={{ color: '#e0f2fe', margin: 0, lineHeight: 1.7, fontSize: '1.02rem' }}>
                Copying data from a source file and saving it into a target destination file is a fundamental file handling task in software development (used for backups, data migration, log archiving, and file filtering).
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Complete File Copying Programs:</h3>

            <CodeBlock title="program_1_basic_file_copy.py">
              {c('# Program 1: Basic Read & Write Copy from source.txt to backup.txt')}<br />
              {c('# Step 1: Read content from source file')}<br />
              {kw('with')} {fn('open')}({st('"source.txt"')}, {st('"r"')}) {kw('as')} src_file:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;content = src_file.read()<br /><br />
              {c('# Step 2: Save content into destination backup file')}<br />
              {kw('with')} {fn('open')}({st('"backup.txt"')}, {st('"w"')}) {kw('as')} dest_file:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;dest_file.write(content)<br /><br />
              {fn('print')}({st('"Successfully copied source.txt to backup.txt!"')})
            </CodeBlock>

            <CodeBlock title="program_2_simultaneous_dual_context_copy.py">
              {c('# Program 2: Efficient Single-Line Dual Context Manager Copy')}<br />
              {c('# Opens source and destination streams simultaneously')}<br />
              {kw('with')} {fn('open')}({st('"original.txt"')}, {st('"r"')}) {kw('as')} src, {fn('open')}({st('"copy_target.txt"')}, {st('"w"')}) {kw('as')} dest:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;dest.write(src.read())<br /><br />
              {fn('print')}({st('"Dual stream file copy finished successfully!"')})
            </CodeBlock>

            <CodeBlock title="program_3_streaming_line_copy.py">
              {c('# Program 3: Memory-Efficient Line-by-Line Stream Copy (For Huge Files)')}<br />
              {kw('with')} {fn('open')}({st('"large_source.txt"')}, {st('"r"')}) {kw('as')} src, {fn('open')}({st('"large_dest.txt"')}, {st('"w"')}) {kw('as')} dest:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;line_count = <span style={{ color: '#fbbf24' }}>0</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} line {kw('in')} src:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dest.write(line)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;line_count += <span style={{ color: '#fbbf24' }}>1</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"Streamed and copied {line_count} lines into large_dest.txt!"')})
            </CodeBlock>

            <CodeBlock title="program_4_filtered_copy.py">
              {c('# Program 4: Copying with Text Transformation / Filtering (e.g. Save Only Errors)')}<br />
              {kw('with')} {fn('open')}({st('"app.log"')}, {st('"r"')}) {kw('as')} src, {fn('open')}({st('"errors_only.log"')}, {st('"w"')}) {kw('as')} dest:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} line {kw('in')} src:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('if')} {st('"ERROR"')} {kw('in')} line:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dest.write(line)<br />
              {fn('print')}({st('"Filtered error logs copied to errors_only.log!"')})
            </CodeBlock>

            <CodeBlock title="program_5_shutil_copy.py">
              {c('# Program 5: High-Level File Copy using Built-in shutil module')}<br />
              {kw('import')} shutil<br /><br />
              {c('# shutil.copy(source, destination)')}<br />
              shutil.copy({st('"data.txt"')}, {st('"data_backup.txt"')})<br />
              {fn('print')}({st('"shutil.copy() executed successfully!"')})
            </CodeBlock>

            <Playground
              id="copy_play"
              title="Interactive File Copy Sandbox"
              initialFiles={{
                "source_data.txt": "Line 1: Account Records\nLine 2: [ERROR] Payment failed\nLine 3: User logged out\nLine 4: [ERROR] Database timeout"
              }}
              defaultCode={`# Program: Copy & Filter Errors from source_data.txt to error_report.txt
with open("source_data.txt", "r") as src, open("error_report.txt", "w") as dest:
    copied_count = 0
    for line in src:
        if "[ERROR]" in line:
            dest.write(line)
            copied_count += 1

print(f"Copied {copied_count} error records into error_report.txt!")

# Verify error_report.txt content
with open("error_report.txt", "r") as f:
    print("\\n--- error_report.txt Output ---")
    print(f.read())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('context_managers')}>Next: Context Managers (with) <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: CONTEXT MANAGERS (WITH STATEMENT) ─── */}
      {activeTab === 'context_managers' && (
        <Section key="context_managers" eyebrow="Day 8 • Safety" title="Context Managers: The `with` Statement">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Manual file handling using <code>f = open() ... f.close()</code> is error-prone. If an exception occurs before <code>f.close()</code>, the file handle remains leaked open in memory!
            </p>

            <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '1.3rem', border: '1px solid #bbf7d0', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>🛡️ Why `with open(...) as f:` is Superior:</h4>
              <p style={{ margin: 0, color: '#15803d', fontSize: '0.88rem', lineHeight: 1.6 }}>
                The <code>with</code> statement invokes Python Context Managers (via <code>__enter__</code> and <code>__exit__</code> protocol methods). It **guarantees** the file handle will be closed automatically upon block exit — even if unhandled runtime exceptions crash your code!
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Context Manager Programs:</h3>

            <CodeBlock title="program_1_safe_context_manager.py">
              {c('# Program 1: Safe File Handling with context manager')}<br />
              {kw('with')} {fn('open')}({st('"user_data.txt"')}, {st('"w"')}) {kw('as')} file:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;file.write({st('"User 1: Kavya\\n"')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;file.write({st('"User 2: Alex\\n"')})<br /><br />
              {c('# Outside the block, file is guaranteed to be closed')}<br />
              {fn('print')}({st('"Is file closed outside with block?"')}, file.closed) {ok('# True')}
            </CodeBlock>

            <CodeBlock title="program_2_multi_file_merger.py">
              {c('# Program 2: Merging contents from 2 files into a 3rd combined file')}<br />
              {kw('with')} {fn('open')}({st('"file1.txt"')}, {st('"w"')}) {kw('as')} f1, {fn('open')}({st('"file2.txt"')}, {st('"w"')}) {kw('as')} f2:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f1.write({st('"Header: Part 1\\n"')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f2.write({st('"Header: Part 2\\n"')})<br /><br />
              {c('# Merge files into combined.txt')}<br />
              {kw('with')} {fn('open')}({st('"file1.txt"')}, {st('"r"')}) {kw('as')} f1, {fn('open')}({st('"file2.txt"')}, {st('"r"')}) {kw('as')} f2, {fn('open')}({st('"combined.txt"')}, {st('"w"')}) {kw('as')} out:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;out.write(f1.read() + f2.read())<br /><br />
              {fn('print')}({st('"Files merged into combined.txt successfully!"')})
            </CodeBlock>

            <Playground
              id="context_play"
              title="Test Context Managers Console"
              initialFiles={{ "file1.txt": "Part 1 Data\n", "file2.txt": "Part 2 Data\n" }}
              defaultCode={`# Program: Merge file1.txt & file2.txt into merged.txt
with open("file1.txt", "r") as f1, open("file2.txt", "r") as f2, open("merged.txt", "w") as out:
    out.write(f1.read() + f2.read())
    print("Files merged successfully!")

# Verify merged file
with open("merged.txt", "r") as f:
    print("Merged Output:", f.read().strip())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('structured_data')}>Next: JSON, CSV & Pickle <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 7: STRUCTURED DATA (JSON, CSV, PICKLE) ─── */}
      {activeTab === 'structured_data' && (
        <Section key="structured_data" eyebrow="Day 8 • Serialization" title="Structured Data Files: JSON, CSV & Pickle">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Plain text mode only stores raw strings. To store structured Python data (dictionaries, lists, numbers), Python provides standard serializers: <strong>JSON</strong>, <strong>CSV</strong>, and <strong>Pickle</strong>.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Structured Data Programs:</h3>

            <CodeBlock title="program_1_json_serialization.py">
              {c('# Program 1: JSON dump and load')}<br />
              {kw('import')} json<br /><br />
              user_data = &#123;<span style={{ color: '#a5b4fc' }}>"id"</span>: <span style={{ color: '#fbbf24' }}>101</span>, <span style={{ color: '#a5b4fc' }}>"username"</span>: <span style={{ color: '#a5b4fc' }}>"alex"</span>, <span style={{ color: '#a5b4fc' }}>"roles"</span>: [<span style={{ color: '#a5b4fc' }}>"admin"</span>, <span style={{ color: '#a5b4fc' }}>"user"</span>]&#125;<br /><br />
              {c('# Save dictionary as JSON file')}<br />
              {kw('with')} {fn('open')}({st('"user.json"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;json.dump(user_data, f, indent=<span style={{ color: '#fbbf24' }}>2</span>)<br /><br />
              {c('# Read JSON file back to dictionary object')}<br />
              {kw('with')} {fn('open')}({st('"user.json"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;loaded_dict = json.load(f)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Loaded User Roles:"')}, loaded_dict[<span style={{ color: '#a5b4fc' }}>"roles"</span>])
            </CodeBlock>

            <CodeBlock title="program_2_csv_processing.py">
              {c('# Program 2: CSV DictWriter and DictReader')}<br />
              {kw('import')} csv<br /><br />
              students = [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#123;<span style={{ color: '#a5b4fc' }}>"name"</span>: <span style={{ color: '#a5b4fc' }}>"Kavya"</span>, <span style={{ color: '#a5b4fc' }}>"score"</span>: <span style={{ color: '#fbbf24' }}>95</span>&#125;,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#123;<span style={{ color: '#a5b4fc' }}>"name"</span>: <span style={{ color: '#a5b4fc' }}>"Bob"</span>, <span style={{ color: '#a5b4fc' }}>"score"</span>: <span style={{ color: '#fbbf24' }}>88</span>&#125;<br />
              ]<br /><br />
              {c('# Write CSV with headers')}<br />
              {kw('with')} {fn('open')}({st('"scores.csv"')}, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;writer = csv.DictWriter(f, fieldnames=[<span style={{ color: '#a5b4fc' }}>"name"</span>, <span style={{ color: '#a5b4fc' }}>"score"</span>])<br />
              &nbsp;&nbsp;&nbsp;&nbsp;writer.writeheader()<br />
              &nbsp;&nbsp;&nbsp;&nbsp;writer.writerows(students)<br /><br />
              {c('# Read CSV with DictReader')}<br />
              {kw('with')} {fn('open')}({st('"scores.csv"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;reader = csv.DictReader(f)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('for')} row {kw('in')} reader:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"{row[\'name\']} scored {row[\'score\']}"')})
            </CodeBlock>

            <CodeBlock title="program_3_pickle_binary.py">
              {c('# Program 3: Binary Serialization using Pickle')}<br />
              {kw('import')} pickle<br /><br />
              complex_state = &#123;<span style={{ color: '#a5b4fc' }}>"session_id"</span>: <span style={{ color: '#st' }}>"99812"</span>, <span style={{ color: '#a5b4fc' }}>"matrix"</span>: [[<span style={{ color: '#fbbf24' }}>1</span>, <span style={{ color: '#fbbf24' }}>2</span>], [<span style={{ color: '#fbbf24' }}>3</span>, <span style={{ color: '#fbbf24' }}>4</span>]]&#125;<br /><br />
              {c('# Write Binary mode "wb"')}<br />
              {kw('with')} {fn('open')}({st('"state.pkl"')}, {st('"wb"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;pickle.dump(complex_state, f)<br /><br />
              {c('# Read Binary mode "rb"')}<br />
              {kw('with')} {fn('open')}({st('"state.pkl"')}, {st('"rb"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;restored = pickle.load(f)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Restored Session ID:"')}, restored[<span style={{ color: '#a5b4fc' }}>"session_id"</span>])
            </CodeBlock>

            <Playground
              id="structured_play"
              title="Test Serialization Console"
              defaultCode={`import json
import csv
import pickle

data = {"name": "Kavya", "course": "Python LMS", "modules_completed": 8}

# 1. JSON
with open("data.json", "w") as f:
    json.dump(data, f)

with open("data.json", "r") as f:
    print("JSON Loaded:", json.load(f))

# 2. Pickle
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

with open("data.pkl", "rb") as f:
    print("Pickle Loaded:", pickle.load(f))` }
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('os_pathlib')}>Next: OS & Pathlib Operations <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 8: OS & PATHLIB FILE SYSTEM OPERATIONS ─── */}
      {activeTab === 'os_pathlib' && (
        <Section key="os_pathlib" eyebrow="Day 8 • System Tools" title="OS & Pathlib File System Operations">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Before performing file operations, programmers verify file existence, sizes, and directory paths using the built-in <code>os</code> module and modern <code>pathlib</code>.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 File System Utility Programs:</h3>

            <CodeBlock title="program_1_os_file_utilities.py">
              {c('# Program 1: Checking Existence, Sizes, Renaming and Deleting Files')}<br />
              {kw('import')} os<br /><br />
              filename = {st('"temp_data.txt"')}<br />
              {kw('with')} {fn('open')}(filename, {st('"w"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write({st('"Temporary file contents for testing."')})<br /><br />
              {kw('if')} os.path.exists(filename):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;size = os.path.getsize(filename)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(f{st('"File {filename} exists! Size: {size} bytes"')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;os.rename(filename, {st('"renamed_data.txt"')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Renamed to renamed_data.txt!"')})<br /><br />
              {c('# Clean up file')}<br />
              os.remove({st('"renamed_data.txt"')})<br />
              {fn('print')}({st('"Deleted renamed_data.txt!"')})
            </CodeBlock>

            <CodeBlock title="program_2_pathlib_modern.py">
              {c('# Program 2: Clean 1-Line File I/O using pathlib.Path')}<br />
              {kw('from')} pathlib {kw('import')} Path<br /><br />
              p = Path({st('"quick_notes.txt"')})<br /><br />
              {c('# One line text write')}<br />
              p.write_text({st('"Pathlib streamlines file reads and writes!"')})<br /><br />
              {c('# One line text read')}<br />
              content = p.read_text()<br />
              {fn('print')}({st('"Pathlib Read:"')}, content)<br />
              {fn('print')}({st('"Exists?"')}, p.exists())
            </CodeBlock>

            <Playground
              id="os_play"
              title="Test File System Console"
              initialFiles={{ "document.txt": "Important records" }}
              defaultCode={`import os
from pathlib import Path

# 1. os.path check
if os.path.exists("document.txt"):
    print("document.txt exists! Size:", os.path.getsize("document.txt"), "bytes")
    os.rename("document.txt", "archived_doc.txt")
    print("Renamed file to archived_doc.txt!")

# 2. pathlib Path check
p = Path("archived_doc.txt")
print("Pathlib Content:", p.read_text())`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('exception_handling')}>Next: Exception Safety <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 9: EXCEPTION HANDLING SAFETY ─── */}
      {activeTab === 'exception_handling' && (
        <Section key="exception_handling" eyebrow="Day 8 • Robustness" title="Exception Safety: try / except / else / finally">
          <div className="panel">
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Runtime crashes in Python are called <strong>Exceptions</strong>. Exception handling intercepts errors before they terminate your application.
            </p>

            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '1rem' }}>💻 Exception Safety Programs:</h3>

            <CodeBlock title="program_1_file_not_found_handling.py">
              {c('# Program 1: Handling FileNotFoundError')}<br />
              {kw('try')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('with')} {fn('open')}({st('"missing_file.txt"')}, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text = f.read()<br />
              {kw('except')} FileNotFoundError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Error: The file missing_file.txt could not be found!"')})
            </CodeBlock>

            <CodeBlock title="program_2_full_try_except_else_finally.py">
              {c('# Program 2: Complete try-except-else-finally Lifecycle')}<br />
              {kw('def')} {fn('parse_config')}(filename):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('try')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{kw('with')} {fn('open')}(filename, {st('"r"')}) {kw('as')} f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;val = {fn('int')}(f.read().strip())<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('except')} FileNotFoundError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Exception: Config file missing."')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('except')} ValueError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Exception: Invalid integer value in config file."')})<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('else')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Success! Parsed config integer:"')}, val)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{kw('finally')}:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Parsing procedure completed."')})<br /><br />
              parse_config({st('"missing.txt"')})
            </CodeBlock>

            <Playground
              id="try_play"
              title="Test Try-Except-Else-Finally Console"
              inputs={[{ label: 'Divisor =', default: '0' }]}
              defaultCode={`try:
    num = int(input("Enter number: "))
    result = 100 / num
except ZeroDivisionError:
    print("Caught ZeroDivisionError: Cannot divide by 0!")
except ValueError:
    print("Caught ValueError: Input was not a number!")
else:
    print("Success! Result:", result)
finally:
    print("This finally block always executes!")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('practice')}>Next: Log & File Capstone <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 10: CAPSTONE ─── */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 8 • Capstone" title="💾 Log & File System Manager Application">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#0c4a6e,#0284c7)', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>Day 8 Capstone: System Log Analyzer & File Backup Manager</h3>
              <p style={{ color: '#bae6fd', margin: 0, lineHeight: 1.7 }}>
                Build a real-world system logger application that appends timestamped activities, reads logs safely, copies backup files, and handles missing files gracefully.
              </p>
            </div>

            <Playground
              id="capstone_play"
              title="Test System Log & Backup Manager Console"
              inputs={[
                { label: 'Action (1=Read, 2=Log Activity, 3=Backup Log) =', default: '3', width: '60px' },
                { label: 'Log Message =', default: 'System health check completed', width: '200px' }
              ]}
              initialFiles={{ "system.log": "[INFO] System initialized\n[ERROR] Database timeout\n" }}
              defaultCode={`# Capstone: Interactive System Log & Backup Manager
choice = input("Choice: ")

if choice == "1":
    try:
        with open("system.log", "r") as f:
            print("--- System Logs ---")
            lines = f.readlines()
            for idx, line in enumerate(lines, 1):
                print(f"{idx}. {line.strip()}")
            print(f"Total Log Entries: {len(lines)}")
    except FileNotFoundError:
        print("Error: system.log file does not exist!")
elif choice == "2":
    log_text = input("Log: ")
    with open("system.log", "a") as f:
        f.write(f"[LOG] {log_text}\\n")
        f.flush()
    print("Successfully logged activity to system.log!")
elif choice == "3":
    # Copy system.log to system_backup.log
    try:
        with open("system.log", "r") as src, open("system_backup.log", "w") as dest:
            dest.write(src.read())
        print("Backup created: system.log copied to system_backup.log!")
    except FileNotFoundError:
        print("Backup failed: Source log file does not exist.")
else:
    print("Invalid option selection.")`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('assignment_work')}>Next: Assignment 📝 <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 11: ASSIGNMENT ─── */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 8 • Assignment" title="📝 Day 8 Hands-on Assignment">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#1f2937,#111827)', padding: '1.8rem', borderRadius: '14px', color: 'white', marginBottom: '2.5rem' }}>
              <h3 style={{ margin: '0 0 0.6rem', fontSize: '1.4rem', fontWeight: 800 }}>Assignment Instructions</h3>
              <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>Complete the following 10 coding exercises using <code>with open()</code> context managers, file copying, <code>json</code>, and <code>try-except</code> exception safety.</p>
            </div>

            {[
              { n: 1, t: 'Safe File Creator', diff: 'Easy', col: '#10b981', desc: 'Write a function create_file(filename, text) that creates a file using exclusive mode "x" and catches FileExistsError cleanly.' },
              { n: 2, t: 'Safe File Reader', diff: 'Easy', col: '#10b981', desc: 'Write a function read_file_safe(filename) that reads a file and returns its content. Catch FileNotFoundError and return a clear error message.' },
              { n: 3, t: 'File Copier Function', diff: 'Easy', col: '#10b981', desc: 'Write a function copy_file(source_filename, destination_filename) that reads content from source_filename and writes it into destination_filename.' },
              { n: 4, t: 'Logger Function', diff: 'Easy', col: '#10b981', desc: 'Write a function log_activity(msg) that appends timestamped text into app_activity.log using mode "a".' },
              { n: 5, t: 'Line Counter', diff: 'Medium', col: '#f59e0b', desc: 'Write a function count_lines(filename) that streams a file line-by-line using `for line in f:` and returns the line count.' },
              { n: 6, t: 'Word Finder in File', diff: 'Medium', col: '#f59e0b', desc: 'Write a function find_keyword(filename, keyword) that searches for a specific keyword in a file and returns matching line numbers.' },
              { n: 7, t: 'Filtered File Copy', diff: 'Medium', col: '#f59e0b', desc: 'Write a function copy_matching_lines(src, dst, keyword) that reads src and copies only lines containing keyword into dst.' },
              { n: 8, t: 'JSON Config Manager', diff: 'Medium', col: '#f59e0b', desc: 'Write a function save_config(config_dict, filename) that serializes a dictionary into a JSON file using json.dump().' },
              { n: 9, t: 'Float Input Validator', diff: 'Medium', col: '#f59e0b', desc: 'Write a function prompt_float() that uses a while loop and try-except block to continuously prompt the user until a valid float is entered.' },
              { n: 10, t: 'Custom Exception Handler', diff: 'Hard', col: '#ef4444', desc: 'Write a function validate_age(age) that raises a ValueError("Age cannot be negative") if age < 0, and handles it in try-except.' }
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
              <button className="btn btn-primary" onClick={() => nav('quiz')}>Take Assessment Quiz 🧠 <ArrowRight size={18} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 12: QUIZ ─── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Day 8 • Assessment" title="🧠 Comprehensive File Handling Quiz">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', padding: '1.8rem', borderRadius: '14px', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', fontWeight: 800 }}>Mastery Assessment Quiz</h3>
              <p style={{ color: '#c7d2fe', margin: 0 }}>{quizData.length} questions · Select your answers below to verify your skills.</p>
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '0.55rem', paddingLeft: '40px' }}>
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
              <div style={{ background: quizScore >= 13 ? 'linear-gradient(135deg,#065f46,#10b981)' : quizScore >= 10 ? 'linear-gradient(135deg,#1d4ed8,#3b82f6)' : 'linear-gradient(135deg,#92400e,#f59e0b)', padding: '2rem', borderRadius: '16px', textAlign: 'center', marginTop: '1rem' }}>
                <Trophy size={48} color="white" style={{ marginBottom: '0.8rem' }} />
                <h3 style={{ color: 'white', fontSize: '2rem', margin: '0 0 0.5rem', fontWeight: 900 }}>{quizScore}/{quizData.length}</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', margin: '0 0 1.2rem' }}>
                  {quizScore === quizData.length ? '🏆 Perfect Score! File Handling & Exception Safety Mastered!' : quizScore >= 12 ? '🥇 Outstanding Work!' : quizScore >= 9 ? '🥈 Good Job! Review explanations above.' : '📚 Keep practicing file modes, file copying, and exception safety!'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'white', color: '#1d4ed8', border: 'none', padding: '0.7rem 1.8rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    Retake Quiz 🔄
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
