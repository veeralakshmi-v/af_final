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
   AST-BASED PYTHON INTERPRETER WITH DATA STRUCTURE METHODS
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

  function stripComment(line) {
    let inStr = false;
    let strChar = '';
    for (let idx = 0; idx < line.length; idx++) {
      const c = line[idx];
      if (!inStr && (c === '"' || c === "'")) {
        inStr = true;
        strChar = c;
      } else if (inStr && c === strChar) {
        if (line[idx - 1] !== '\\') {
          inStr = false;
        }
      } else if (!inStr && c === '#') {
        return line.slice(0, idx).trim();
      }
    }
    return line.trim();
  }

  function parseBlock(baseIndent) {
    const block = [];
    while (i < lines.length) {
      const line = lines[i];
      const trimLine = stripComment(line);
      if (!trimLine) {
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

        if (trimLine.startsWith('if ')) {
          const cond = trimLine.slice(3, -1);
          i++;
          const body = parseBlock(baseIndent + 4);
          const elifs = [];
          let else_body = null;
          
          while (i < lines.length) {
            const nextTrim = stripComment(lines[i]);
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

        const assignMatch = trimLine.match(/^([a-zA-Z_]\w*(?:\[.+?\])?(?:,\s*[a-zA-Z_*]\w*)*)\s*([+\-*/%]?|\/\/|\*\*)?=\s*(.+)$/);
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
      if (text[idx - 1] !== '\\') {
        inStr = false;
      }
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

function splitByTopLevelOperator(text, opSymbols) {
  let depth = 0;
  let inStr = false;
  let strChar = '';
  for (let idx = 0; idx < text.length; idx++) {
    const c = text[idx];
    if (!inStr && (c === '"' || c === "'")) {
      inStr = true;
      strChar = c;
    } else if (inStr && c === strChar) {
      if (text[idx - 1] !== '\\') {
        inStr = false;
      }
    } else if (!inStr && (c === '(' || c === '[' || c === '{')) {
      depth++;
    } else if (!inStr && (c === ')' || c === ']' || c === '}')) {
      depth--;
    } else if (!inStr && depth === 0) {
      for (const op of opSymbols) {
        const isWordOp = op === 'in' || op === 'not in';
        if (text.startsWith(op, idx)) {
          if (isWordOp) {
            const before = idx > 0 ? text[idx - 1] : ' ';
            const after = idx + op.length < text.length ? text[idx + op.length] : ' ';
            if (!/[a-zA-Z0-9_]/.test(before) && !/[a-zA-Z0-9_]/.test(after)) {
              return {
                left: text.slice(0, idx).trim(),
                op: op,
                right: text.slice(idx + op.length).trim()
              };
            }
          } else {
            return {
              left: text.slice(0, idx).trim(),
              op: op,
              right: text.slice(idx + op.length).trim()
            };
          }
        }
      }
    }
  }
  return null;
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

  const evalExpr = (expr) => {
    expr = expr.trim();
    const isSingleStringLiteral = /^"([^"\\]|\\.)*"$/.test(expr) || /^'([^'\\]|\\.)*'$/.test(expr);
    if (isSingleStringLiteral) {
      return expr.slice(1, -1);
    }
    if (expr === 'True') return true;
    if (expr === 'False') return false;
    if (expr === 'None') return null;

    if (/^int\((.+)\)$/.test(expr)) return parseInt(evalExpr(expr.match(/^int\((.+)\)$/)[1]), 10);
    if (/^float\((.+)\)$/.test(expr)) return parseFloat(evalExpr(expr.match(/^float\((.+)\)$/)[1]));
    if (/^str\((.+)\)$/.test(expr)) return String(evalExpr(expr.match(/^str\((.+)\)$/)[1]));
    if (/^bool\((.+)\)$/.test(expr)) return Boolean(evalExpr(expr.match(/^bool\((.+)\)$/)[1]));
    if (/^input\(.*\)$/.test(expr)) return getInput();
    
    if (/^len\((.+)\)$/.test(expr)) {
      const v = evalExpr(expr.match(/^len\((.+)\)$/)[1]);
      if (v !== undefined && v !== null) {
        if (typeof v === 'object' && (v.__type__ === 'tuple' || v.__type__ === 'set')) {
          return v.value.length;
        }
        return v.length;
      }
      return 0;
    }

    if (/^set\((.*)\)$/.test(expr)) {
      const arg = expr.match(/^set\((.*)\)$/)[1].trim();
      if (!arg) return { __type__: 'set', value: [] };
      const val = evalExpr(arg);
      let items = [];
      if (Array.isArray(val)) {
        items = val;
      } else if (val && typeof val === 'object' && (val.__type__ === 'tuple' || val.__type__ === 'set')) {
        items = val.value;
      } else if (typeof val === 'string') {
        items = val.split('');
      }
      const uniqueItems = [];
      for (const item of items) {
        const exists = uniqueItems.some(x => {
          if (typeof x === 'object' && x !== null && typeof item === 'object' && item !== null) {
            return JSON.stringify(x) === JSON.stringify(item);
          }
          return x === item;
        });
        if (!exists) uniqueItems.push(item);
      }
      return { __type__: 'set', value: uniqueItems };
    }

    if (/^tuple\((.*)\)$/.test(expr)) {
      const arg = expr.match(/^tuple\((.*)\)$/)[1].trim();
      if (!arg) return { __type__: 'tuple', value: [] };
      const val = evalExpr(arg);
      let items = [];
      if (Array.isArray(val)) {
        items = val;
      } else if (val && typeof val === 'object' && (val.__type__ === 'tuple' || val.__type__ === 'set')) {
        items = val.value;
      } else if (typeof val === 'string') {
        items = val.split('');
      }
      return { __type__: 'tuple', value: items };
    }

    if (/^list\((.*)\)$/.test(expr)) {
      const arg = expr.match(/^list\((.*)\)$/)[1].trim();
      if (!arg) return [];
      const val = evalExpr(arg);
      let items = [];
      if (Array.isArray(val)) {
        items = val;
      } else if (val && typeof val === 'object' && (val.__type__ === 'tuple' || val.__type__ === 'set')) {
        items = val.value;
      } else if (typeof val === 'string') {
        items = val.split('');
      }
      return items;
    }

    if (/^dict\((.*)\)$/.test(expr)) {
      return {};
    }

    if (/^range\((.+)\)$/.test(expr)) {
      const argsStr = expr.match(/^range\((.+)\)$/)[1];
      const args = splitByTopLevelCommas(argsStr).map(x => evalExpr(x.trim()));
      let start = 0, stop = 0, step = 1;
      if (args.length === 1) {
        stop = Number(args[0]);
      } else if (args.length === 2) {
        start = Number(args[0]);
        stop = Number(args[1]);
      } else if (args.length === 3) {
        start = Number(args[0]);
        stop = Number(args[1]);
        step = Number(args[2]);
      }
      const arr = [];
      if (step > 0) {
        for (let idx = start; idx < stop; idx += step) arr.push(idx);
      } else if (step < 0) {
        for (let idx = start; idx > stop; idx += step) arr.push(idx);
      }
      return arr;
    }

    const membership = splitByTopLevelOperator(expr, ['not in', 'in']);
    if (membership) {
      const leftVal = evalExpr(membership.left);
      const rightVal = evalExpr(membership.right);
      if (membership.op === 'in') {
        let arr = Array.isArray(rightVal) ? rightVal : (rightVal && typeof rightVal === 'object' && (rightVal.__type__ === 'tuple' || rightVal.__type__ === 'set') ? rightVal.value : (typeof rightVal === 'string' ? rightVal.split('') : (rightVal && typeof rightVal === 'object' ? Object.keys(rightVal) : null)));
        if (arr === null) throw new Error(`TypeError: argument of type '${typeof rightVal}' is not iterable`);
        return arr.some(x => {
          if (typeof x === 'object' && x !== null && typeof leftVal === 'object' && leftVal !== null) {
            return JSON.stringify(x) === JSON.stringify(leftVal);
          }
          return x === leftVal;
        });
      } else {
        let arr = Array.isArray(rightVal) ? rightVal : (rightVal && typeof rightVal === 'object' && (rightVal.__type__ === 'tuple' || rightVal.__type__ === 'set') ? rightVal.value : (typeof rightVal === 'string' ? rightVal.split('') : (rightVal && typeof rightVal === 'object' ? Object.keys(rightVal) : null)));
        if (arr === null) throw new Error(`TypeError: argument of type '${typeof rightVal}' is not iterable`);
        return !arr.some(x => {
          if (typeof x === 'object' && x !== null && typeof leftVal === 'object' && leftVal !== null) {
            return JSON.stringify(x) === JSON.stringify(leftVal);
          }
          return x === leftVal;
        });
      }
    }

    const equality = splitByTopLevelOperator(expr, ['==', '!=']);
    if (equality) {
      const leftVal = evalExpr(equality.left);
      const rightVal = evalExpr(equality.right);
      const eq = () => {
        if (typeof leftVal === 'object' && leftVal !== null && typeof rightVal === 'object' && rightVal !== null) {
          let lVal = leftVal;
          let rVal = rightVal;
          if (leftVal.__type__ === 'tuple' || leftVal.__type__ === 'set') lVal = leftVal.value;
          if (rightVal.__type__ === 'tuple' || rightVal.__type__ === 'set') rVal = rightVal.value;
          const lType = leftVal.__type__ || (Array.isArray(leftVal) ? 'list' : 'dict');
          const rType = rightVal.__type__ || (Array.isArray(rightVal) ? 'list' : 'dict');
          if (lType !== rType) return false;
          if (lType === 'set') {
            if (lVal.length !== rVal.length) return false;
            return lVal.every(x => rVal.some(y => {
              if (typeof x === 'object' && x !== null && typeof y === 'object' && y !== null) {
                return JSON.stringify(x) === JSON.stringify(y);
              }
              return x === y;
            }));
          }
          return JSON.stringify(lVal) === JSON.stringify(rVal);
        }
        return leftVal === rightVal;
      };
      return equality.op === '==' ? eq() : !eq();
    }

    const bitwise = splitByTopLevelOperator(expr, ['|', '&', '^']);
    if (bitwise) {
      const leftVal = evalExpr(bitwise.left);
      const rightVal = evalExpr(bitwise.right);
      if (leftVal && typeof leftVal === 'object' && leftVal.__type__ === 'set' &&
          rightVal && typeof rightVal === 'object' && rightVal.__type__ === 'set') {
        const lItems = leftVal.value;
        const rItems = rightVal.value;
        if (bitwise.op === '|') {
          const combined = [...lItems, ...rItems];
          const unique = [];
          for (const x of combined) {
            if (!unique.some(u => JSON.stringify(u) === JSON.stringify(x))) unique.push(x);
          }
          return { __type__: 'set', value: unique };
        }
        if (bitwise.op === '&') {
          const intersected = lItems.filter(x => 
            rItems.some(y => JSON.stringify(x) === JSON.stringify(y))
          );
          return { __type__: 'set', value: intersected };
        }
        if (bitwise.op === '^') {
          const unique = [];
          for (const x of lItems) {
            if (!rItems.some(y => JSON.stringify(x) === JSON.stringify(y))) unique.push(x);
          }
          for (const x of rItems) {
            if (!lItems.some(y => JSON.stringify(x) === JSON.stringify(y))) unique.push(x);
          }
          return { __type__: 'set', value: unique };
        }
      }
      if (typeof leftVal === 'number' && typeof rightVal === 'number') {
        if (bitwise.op === '|') return leftVal | rightVal;
        if (bitwise.op === '&') return leftVal & rightVal;
        if (bitwise.op === '^') return leftVal ^ rightVal;
      }
      throw new Error(`TypeError: unsupported operand type(s) for ${bitwise.op}: '${typeof leftVal}' and '${typeof rightVal}'`);
    }

    const additive = splitByTopLevelOperator(expr, ['+', '-']);
    if (additive) {
      const leftVal = evalExpr(additive.left);
      const rightVal = evalExpr(additive.right);
      if (additive.op === '+') {
        if (Array.isArray(leftVal) && Array.isArray(rightVal)) {
          return [...leftVal, ...rightVal];
        }
        if (leftVal && typeof leftVal === 'object' && leftVal.__type__ === 'tuple' &&
            rightVal && typeof rightVal === 'object' && rightVal.__type__ === 'tuple') {
          return { __type__: 'tuple', value: [...leftVal.value, ...rightVal.value] };
        }
        if (typeof leftVal === 'string' && typeof rightVal === 'string') {
          return leftVal + rightVal;
        }
        if (typeof leftVal === 'number' && typeof rightVal === 'number') {
          return leftVal + rightVal;
        }
      } else {
        if (leftVal && typeof leftVal === 'object' && leftVal.__type__ === 'set' &&
            rightVal && typeof rightVal === 'object' && rightVal.__type__ === 'set') {
          const lItems = leftVal.value;
          const rItems = rightVal.value;
          const diff = lItems.filter(x => 
            !rItems.some(y => JSON.stringify(x) === JSON.stringify(y))
          );
          return { __type__: 'set', value: diff };
        }
        if (typeof leftVal === 'number' && typeof rightVal === 'number') {
          return leftVal - rightVal;
        }
      }
      throw new Error(`TypeError: unsupported operand type(s) for ${additive.op}: '${typeof leftVal}' and '${typeof rightVal}'`);
    }

    const multiplicative = splitByTopLevelOperator(expr, ['*']);
    if (multiplicative) {
      const leftVal = evalExpr(multiplicative.left);
      const rightVal = evalExpr(multiplicative.right);
      if (typeof leftVal === 'number' && typeof rightVal === 'number') {
        return leftVal * rightVal;
      }
      let arr = null;
      let num = null;
      let isTuple = false;
      let isString = false;
      if (typeof leftVal === 'number') {
        num = leftVal;
        if (Array.isArray(rightVal)) arr = rightVal;
        else if (rightVal && typeof rightVal === 'object' && rightVal.__type__ === 'tuple') { arr = rightVal.value; isTuple = true; }
        else if (typeof rightVal === 'string') { arr = rightVal; isString = true; }
      } else if (typeof rightVal === 'number') {
        num = rightVal;
        if (Array.isArray(leftVal)) arr = leftVal;
        else if (leftVal && typeof leftVal === 'object' && leftVal.__type__ === 'tuple') { arr = leftVal.value; isTuple = true; }
        else if (typeof leftVal === 'string') { arr = leftVal; isString = true; }
      }
      if (arr !== null && num !== null) {
        if (isString) {
          return arr.repeat(Math.max(0, num));
        }
        const repeated = [];
        for (let j = 0; j < num; j++) {
          repeated.push(...arr);
        }
        if (isTuple) return { __type__: 'tuple', value: repeated };
        return repeated;
      }
      throw new Error(`TypeError: unsupported operand type(s) for *: '${typeof leftVal}' and '${typeof rightVal}'`);
    }

    const methodMatch = expr.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (methodMatch) {
      const varName = methodMatch[1];
      const method = methodMatch[2];
      const argStr = methodMatch[3];
      const args = argStr ? splitByTopLevelCommas(argStr).map(x => evalExpr(x.trim())) : [];
      const obj = env[varName];
      if (obj !== undefined && obj !== null) {
        if (Array.isArray(obj)) {
          if (method === 'append') { obj.push(args[0]); return null; }
          if (method === 'insert') { obj.splice(args[0], 0, args[1]); return null; }
          if (method === 'pop') { return args.length > 0 ? obj.splice(args[0], 1)[0] : obj.pop(); }
          if (method === 'remove') { const pos = obj.indexOf(args[0]); if(pos !== -1) obj.splice(pos, 1); return null; }
          if (method === 'sort') { obj.sort((a,b)=>a>b?1:-1); return null; }
          if (method === 'reverse') { obj.reverse(); return null; }
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
        } else if (typeof obj === 'object') {
          if (obj.__type__ === 'set') {
            const getItems = (val) => {
              if (Array.isArray(val)) return val;
              if (val && typeof val === 'object' && (val.__type__ === 'set' || val.__type__ === 'tuple')) return val.value;
              return [];
            };
            if (method === 'add') {
              const item = args[0];
              const exists = obj.value.some(x => {
                if (typeof x === 'object' && x !== null && typeof item === 'object' && item !== null) {
                  return JSON.stringify(x) === JSON.stringify(item);
                }
                return x === item;
              });
              if (!exists) obj.value.push(item);
              return null;
            }
            if (method === 'remove') {
              const item = args[0];
              const idx = obj.value.findIndex(x => {
                if (typeof x === 'object' && x !== null && typeof item === 'object' && item !== null) {
                  return JSON.stringify(x) === JSON.stringify(item);
                }
                return x === item;
              });
              if (idx !== -1) obj.value.splice(idx, 1);
              else throw new Error(`KeyError: ${item}`);
              return null;
            }
            if (method === 'discard') {
              const item = args[0];
              const idx = obj.value.findIndex(x => {
                if (typeof x === 'object' && x !== null && typeof item === 'object' && item !== null) {
                  return JSON.stringify(x) === JSON.stringify(item);
                }
                return x === item;
              });
              if (idx !== -1) obj.value.splice(idx, 1);
              return null;
            }
            if (method === 'union') {
              const otherItems = getItems(args[0]);
              const combined = [...obj.value, ...otherItems];
              const unique = [];
              for (const x of combined) {
                if (!unique.some(u => JSON.stringify(u) === JSON.stringify(x))) unique.push(x);
              }
              return { __type__: 'set', value: unique };
            }
            if (method === 'intersection') {
              const otherItems = getItems(args[0]);
              const intersected = obj.value.filter(x => 
                otherItems.some(y => JSON.stringify(x) === JSON.stringify(y))
              );
              return { __type__: 'set', value: intersected };
            }
            if (method === 'difference') {
              const otherItems = getItems(args[0]);
              const diffed = obj.value.filter(x => 
                !otherItems.some(y => JSON.stringify(x) === JSON.stringify(y))
              );
              return { __type__: 'set', value: diffed };
            }
            if (method === 'symmetric_difference') {
              const otherItems = getItems(args[0]);
              const unique = [];
              for (const x of obj.value) {
                if (!otherItems.some(y => JSON.stringify(x) === JSON.stringify(y))) unique.push(x);
              }
              for (const x of otherItems) {
                if (!obj.value.some(y => JSON.stringify(x) === JSON.stringify(y))) unique.push(x);
              }
              return { __type__: 'set', value: unique };
            }
            if (method === 'issubset') {
              const otherItems = getItems(args[0]);
              return obj.value.every(x => otherItems.some(y => JSON.stringify(x) === JSON.stringify(y)));
            }
            if (method === 'issuperset') {
              const otherItems = getItems(args[0]);
              return otherItems.every(x => obj.value.some(y => JSON.stringify(x) === JSON.stringify(y)));
            }
            if (method === 'isdisjoint') {
              const otherItems = getItems(args[0]);
              return !obj.value.some(x => otherItems.some(y => JSON.stringify(x) === JSON.stringify(y)));
            }
            if (method === 'copy') {
              return { __type__: 'set', value: [...obj.value] };
            }
            if (method === 'update') {
              const otherItems = getItems(args[0]);
              for (const item of otherItems) {
                const exists = obj.value.some(x => JSON.stringify(x) === JSON.stringify(item));
                if (!exists) obj.value.push(item);
              }
              return null;
            }
            if (method === 'clear') { obj.value = []; return null; }
            if (method === 'pop') { return obj.value.pop(); }
          } else {
            if (method === 'keys') return Object.keys(obj);
            if (method === 'values') return Object.values(obj);
            if (method === 'items') return Object.entries(obj).map(([k,v])=>[k,v]);
            if (method === 'get') return obj[args[0]] !== undefined ? obj[args[0]] : (args[1] !== undefined ? args[1] : null);
            if (method === 'pop') { const v = obj[args[0]]; delete obj[args[0]]; return v; }
            if (method === 'clear') { for(let k in obj) delete obj[k]; return null; }
          }
        }
      }
    }

    const itemMatch = expr.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
    if (itemMatch) {
      const varName = itemMatch[1];
      const sliceExpr = itemMatch[2].trim();
      const obj = env[varName];
      if (obj === undefined || obj === null) {
        throw new Error(`NameError: name '${varName}' is not defined`);
      }
      if (sliceExpr.includes(':')) {
        const parts = sliceExpr.split(':').map(x => x.trim());
        const start = parts[0] ? evalExpr(parts[0]) : undefined;
        const stop = parts[1] ? evalExpr(parts[1]) : undefined;
        const step = parts[2] ? evalExpr(parts[2]) : undefined;
        let arr = Array.isArray(obj) ? obj : (obj && typeof obj === 'object' && (obj.__type__ === 'tuple' || obj.__type__ === 'set') ? obj.value : (typeof obj === 'string' ? obj : null));
        if (arr === null) {
          throw new Error(`TypeError: '${typeof obj}' object is not subscriptable`);
        }
        const isString = typeof arr === 'string';
        if (isString) arr = arr.split('');
        const stride = step !== undefined ? Number(step) : 1;
        if (stride === 0) throw new Error("ValueError: slice step cannot be zero");
        const len = arr.length;
        let begin = start !== undefined ? Number(start) : (stride > 0 ? 0 : len - 1);
        let end = stop !== undefined ? Number(stop) : (stride > 0 ? len : -len - 1);
        if (begin < 0) begin = Math.max(0, len + begin);
        else begin = Math.min(len, begin);
        if (end < 0) end = Math.max(stride > 0 ? 0 : -1, len + end);
        else end = Math.min(len, end);
        const sliced = [];
        if (stride > 0) {
          for (let idx = begin; idx < end; idx += stride) sliced.push(arr[idx]);
        } else {
          for (let idx = begin; idx > end; idx += stride) sliced.push(arr[idx]);
        }
        const finalVal = isString ? sliced.join('') : sliced;
        if (obj && typeof obj === 'object' && obj.__type__ === 'tuple') {
          return { __type__: 'tuple', value: finalVal };
        }
        return finalVal;
      } else {
        const key = evalExpr(sliceExpr);
        if (obj && typeof obj === 'object' && (obj.__type__ === 'tuple' || obj.__type__ === 'set')) {
          return obj.value[key];
        }
        return obj[key];
      }
    }

    if (expr.startsWith('[') && expr.endsWith(']')) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return [];
      const items = splitByTopLevelCommas(inner).map(x => evalExpr(x));
      return items;
    }

    if (expr.startsWith('(') && expr.endsWith(')')) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return { __type__: 'tuple', value: [] };
      let hasComma = false;
      let depth = 0;
      let inStr = false;
      let strChar = '';
      for (let c of inner) {
        if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; }
        else if (inStr && c === strChar) { inStr = false; }
        else if (!inStr) {
          if (c === '(' || c === '[' || c === '{') depth++;
          else if (c === ')' || c === ']' || c === '}') depth--;
          else if (c === ',' && depth === 0) hasComma = true;
        }
      }
      if (hasComma) {
        const items = splitByTopLevelCommas(inner).map(x => evalExpr(x.trim()));
        return { __type__: 'tuple', value: items };
      }
    }

    if (expr.startsWith('{') && expr.endsWith('}')) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return {};
      let isDict = false;
      let depth = 0;
      let inStr = false;
      let strChar = '';
      for (let c of inner) {
        if (!inStr && (c === '"' || c === "'")) { inStr = true; strChar = c; }
        else if (inStr && c === strChar) { inStr = false; }
        else if (!inStr) {
          if (c === '(' || c === '[' || c === '{') depth++;
          else if (c === ')' || c === ']' || c === '}') depth--;
          else if (c === ':' && depth === 0) isDict = true;
        }
      }
      if (isDict) {
        const obj = {};
        const pairs = splitByTopLevelCommas(inner);
        for (const pair of pairs) {
          const colonIdx = pair.indexOf(':');
          if (colonIdx !== -1) {
            const k = evalExpr(pair.slice(0, colonIdx).trim());
            const v = evalExpr(pair.slice(colonIdx + 1).trim());
            obj[k] = v;
          }
        }
        return obj;
      } else {
        const items = splitByTopLevelCommas(inner).map(x => evalExpr(x.trim()));
        const uniqueItems = [];
        for (const item of items) {
          const exists = uniqueItems.some(x => {
            if (typeof x === 'object' && x !== null && typeof item === 'object' && item !== null) {
              return JSON.stringify(x) === JSON.stringify(item);
            }
            return x === item;
          });
          if (!exists) uniqueItems.push(item);
        }
        return { __type__: 'set', value: uniqueItems };
      }
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) {
      if (env[expr] !== undefined) return env[expr];
      throw new Error(`NameError: name '${expr}' is not defined`);
    }

    let safe = expr;
    Object.keys(env).sort((a, b) => b.length - a.length).forEach(k => {
      const v = env[k];
      const rep = typeof v === 'string' ? `"${v.replace(/"/g, '\\"')}"` : v === true ? 'true' : v === false ? 'false' : v === null ? 'null' : Array.isArray(v) ? JSON.stringify(v) : (typeof v === 'object' ? JSON.stringify(v) : String(v));
      safe = safe.replace(new RegExp(`\\b${k}\\b`, 'g'), rep);
    });
    safe = safe.replace(/ and /g, ' && ').replace(/ or /g, ' || ').replace(/ not /g, ' !').replace(/^not /, '!').replace(/==/g, '===').replace(/!=/g, '!==');
    try {
      return Function(`"use strict"; return (${safe})`)();
    } catch (e) {
      throw new Error(`SyntaxError in expression: ${expr}`);
    }
  };

  const parsePrint = (trimLn) => {
    const m = trimLn.match(/^print\((.*)\)$/);
    if (!m) return;
    const inner = m[1];
    let endStr = '\n';
    let contentExpr = inner;

    const endMatch = inner.match(/,\s*end\s*=\s*(["'].*?["'])$/);
    if (endMatch) {
      endStr = evalExpr(endMatch[1]);
      contentExpr = inner.replace(/,\s*end\s*=\s*["'].*?["']$/, '');
    }

    if (!contentExpr.trim()) {
      output.push(endStr);
      return;
    }

    const args = splitByTopLevelCommas(contentExpr);

    const printed = args.map(a => {
      const v = evalExpr(a.trim());
      if (typeof v === 'string') return v;
      
      const formatValue = (x) => {
        if (Array.isArray(x)) {
          return '[' + x.map(y => formatValue(y)).join(', ') + ']';
        }
        if (x && typeof x === 'object') {
          if (x.__type__ === 'tuple') {
            if (x.value.length === 1) {
              return '(' + formatValue(x.value[0]) + ',)';
            }
            return '(' + x.value.map(y => formatValue(y)).join(', ') + ')';
          }
          if (x.__type__ === 'set') {
            if (x.value.length === 0) return 'set()';
            return '{' + x.value.map(y => formatValue(y)).join(', ') + '}';
          }
          const keys = Object.keys(x);
          return '{' + keys.map(k => {
            const kStr = typeof k === 'string' ? `'${k}'` : String(k);
            return `${kStr}: ${formatValue(x[k])}`;
          }).join(', ') + '}';
        }
        if (typeof x === 'string') {
          return `'${x}'`;
        }
        return x === true ? 'True' : x === false ? 'False' : x === null ? 'None' : String(x);
      };
      
      return formatValue(v);
    }).join(' ');

    output.push(printed + endStr);
  };

  function execBlock(nodes) {
    for (const node of nodes) {
      totalInstructions++;
      if (totalInstructions > instructionLimit) {
        throw new Error("TimeLimitExceeded: Loop or execution limit reached.");
      }

      if (node.type === 'assign') {
        const { name, op, expr } = node;
        let val = evalExpr(expr);
        
        if (name.includes(',')) {
          const varNames = name.split(',').map(x => x.trim());
          let items = [];
          if (Array.isArray(val)) {
            items = val;
          } else if (val && typeof val === 'object' && (val.__type__ === 'tuple' || val.__type__ === 'set')) {
            items = val.value;
          } else if (typeof val === 'string') {
            items = val.split('');
          } else {
            throw new Error("TypeError: cannot unpack non-iterable object");
          }
          
          let starIdx = -1;
          for (let j = 0; j < varNames.length; j++) {
            if (varNames[j].startsWith('*')) {
              if (starIdx !== -1) throw new Error("SyntaxError: two starred expressions in assignment");
              starIdx = j;
            }
          }
          
          if (starIdx !== -1) {
            const numLeft = starIdx;
            const numRight = varNames.length - 1 - starIdx;
            if (items.length < numLeft + numRight) {
              throw new Error(`ValueError: not enough values to unpack (expected at least ${numLeft + numRight}, got ${items.length})`);
            }
            for (let j = 0; j < numLeft; j++) {
              env[varNames[j]] = items[j];
            }
            const starVar = varNames[starIdx].slice(1);
            env[starVar] = items.slice(numLeft, items.length - numRight);
            for (let j = 0; j < numRight; j++) {
              env[varNames[varNames.length - 1 - j]] = items[items.length - 1 - j];
            }
          } else {
            if (varNames.length !== items.length) {
              if (items.length < varNames.length) {
                throw new Error(`ValueError: not enough values to unpack (expected ${varNames.length}, got ${items.length})`);
              } else {
                throw new Error(`ValueError: too many values to unpack (expected ${varNames.length})`);
              }
            }
            for (let j = 0; j < varNames.length; j++) {
              env[varNames[j]] = items[j];
            }
          }
        } else {
          const itemMatch = name.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
          if (itemMatch) {
            const varName = itemMatch[1];
            const key = evalExpr(itemMatch[2]);
            const obj = env[varName];
            if (obj && typeof obj === 'object') {
              if (obj.__type__ === 'tuple') {
                throw new Error("TypeError: 'tuple' object does not support item assignment");
              }
              if (obj.__type__ === 'set') {
                throw new Error("TypeError: 'set' object does not support item assignment");
              }
              if (op !== '=') {
                const cur = obj[key] !== undefined ? obj[key] : 0;
                if (op === '+=') obj[key] = cur + val;
                else if (op === '-=') obj[key] = cur - val;
              } else {
                obj[key] = val;
              }
            } else {
              throw new Error(`NameError: '${varName}' is not initialized as a data structure`);
            }
          } else {
            if (op !== '=') {
              const cur = env[name] !== undefined ? env[name] : 0;
              if (op === '+=') val = cur + val;
              else if (op === '-=') val = cur - val;
              else if (op === '*=') val = cur * val;
              else if (op === '/=') val = cur / val;
            }
            env[name] = val;
          }
        }
      } else if (node.type === 'print') {
        parsePrint(node.line);
      } else if (node.type === 'break') {
        return 'break';
      } else if (node.type === 'continue') {
        return 'continue';
      } else if (node.type === 'pass') {
        // do nothing
      } else if (node.type === 'expr') {
        evalExpr(node.expr);
      } else if (node.type === 'if') {
        const condVal = Boolean(evalExpr(node.cond));
        let branchMatched = false;
        if (condVal) {
          const status = execBlock(node.body);
          if (status) return status;
          branchMatched = true;
        } else {
          for (const elif of node.elifs) {
            if (Boolean(evalExpr(elif.cond))) {
              const status = execBlock(elif.body);
              if (status) return status;
              branchMatched = true;
              break;
            }
          }
        }
        if (!branchMatched && node.else_body) {
          const status = execBlock(node.else_body);
          if (status) return status;
        }
      } else if (node.type === 'for') {
        let items = evalExpr(node.iterExpr);
        if (items && typeof items === 'object' && (items.__type__ === 'tuple' || items.__type__ === 'set')) {
          items = items.value;
        }
        if (Array.isArray(items) || typeof items === 'string') {
          for (const item of items) {
            env[node.varName] = item;
            const status = execBlock(node.body);
            if (status === 'break') break;
            if (status === 'continue') continue;
            if (status) return status;
          }
        }
      } else if (node.type === 'while') {
        while (Boolean(evalExpr(node.cond))) {
          const status = execBlock(node.body);
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
        style={{ width:'100%', minHeight:'155px', background:'#0d1b2a', color:'#e2e8f0', fontFamily:'monospace', fontSize:'0.89rem', lineHeight:1.8, padding:'1.1rem', border:'none', outline:'none', resize:'vertical', borderBottom:'1px solid #1e293b', boxSizing:'border-box' }}/>
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
  { q:"Which Python data structure is mutable and ordered?", opts:["Tuple","List","Set","Integer"], ans:1, exp:"Lists are mutable (changeable) and ordered sequences of items, created using square brackets []." },
  { q:"How do you initialize an empty Dictionary?", opts:["x = []","x = {}","x = ()","x = set()"], ans:1, exp:"An empty dictionary is initialized using curly braces {}. An empty set is initialized using set()." },
  { q:"What is the output of: len((10, 20, 30))?", opts:["2","3","4","1"], ans:1, exp:"This is a tuple containing three items, so len() returns 3." },
  { q:"Which structure is unordered and only stores unique elements?", opts:["List","Set","Tuple","Dictionary"], ans:1, exp:"Sets are mutable but unordered collections of unique elements (no duplicates allowed)." },
  { q:"How can you add an element to a list?", opts:["list.append(val)","list.add(val)","list.insert() only","list.push(val)"], ans:0, exp:"Use .append(val) to add an item to the end of a list. .add() is for sets." },
  { q:"What is the output of: x = {'a': 1} → print(x['b'])?", opts:["None","1","KeyError","Error"], ans:2, exp:"Accessing a key that does not exist in a dictionary throws a KeyError." },
  { q:"Which operation finds common elements present in both Set A and Set B?", opts:["Union","Intersection","Difference","Symmetric Difference"], ans:1, exp:"The intersection operation returns common items found in both sets." },
  { q:"Are tuples mutable?", opts:["Yes","No","Only if they contain lists","Only in Python 3"], ans:1, exp:"Tuples are completely immutable (cannot be changed after creation)." },
  { q:"What does dict.keys() return?", opts:["List of values","List of keys","List of key-value tuples","All elements"], ans:1, exp:"The .keys() method returns a sequence of all the keys present in a dictionary." },
  { q:"How do you remove a key from a dictionary while returning its value?", opts:["dict.remove(key)","dict.delete(key)","dict.pop(key)","dict.clear()"], ans:2, exp:"Use .pop(key) to remove a key-value pair and return the value." },
  { q:"What is the output of: x = [1, 2] + [3, 4]?", opts:["[1, 2, 3, 4]","[[1,2], [3,4]]","Error","[4, 6]"], ans:0, exp:"The + operator concatenates lists together in Python." },
  { q:"What happens when you add a duplicate item to a Set?", opts:["Throws an Error","The set ignores it silently","The set appends it","The set is cleared"], ans:1, exp:"Sets enforce uniqueness. Adding a duplicate item is simply ignored, and the size remains unchanged." }
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PythonDay5({ activeTab, onNavigate }) {
  const [quizAnswers, setQuizAnswers]     = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const nav = (tab) => { onNavigate('python_day5', tab); window.scrollTo({ top:0, behavior:'smooth' }); };
  const quizScore = quizData.reduce((a, q, i) => a + (quizAnswers[i] === q.ans ? 1 : 0), 0);

  return (
    <AnimatePresence mode="wait">

      {/* ─── TAB 1: INTRO ─── */}
      {activeTab === 'intro' && (
        <Section key="intro" eyebrow="Day 5 • Overview" title="Python Data Structures">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.6rem', margin:'0 0 1rem', fontWeight:800 }}>Containers of Information</h3>
              <p style={{ color:'#bfdbfe', lineHeight:1.7, margin:0, fontSize:'1.05rem' }}>
                Python provides <strong>4 built-in data structures</strong> to group and organize values: <strong>List, Tuple, Set, and Dictionary</strong>. They differ in mutability, ordering, and duplicate rules.
              </p>
            </div>

            {/* Comparison Table */}
            <div style={{ overflowX:'auto', marginBottom:'2.5rem' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'12px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,.06)' }}>
                <thead>
                  <tr style={{ background:'#1e293b', color:'white' }}>
                    {['Structure','Syntax','Ordered?','Mutable?','Duplicates?','Example'].map(h => <th key={h} style={{ padding:'0.9rem 1.2rem', fontSize:'0.88rem' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name:'List',       syn:'[a, b]', ord:'Yes', mut:'Yes (Changeable)', dup:'Yes', ex:'[1, 2, 2, "c"]' },
                    { name:'Tuple',      syn:'(a, b)', ord:'Yes', mut:'No (Immutable)',   dup:'Yes', ex:'(1, 2, 2, "c")', alt:true },
                    { name:'Set',        syn:'{a, b}', ord:'No',  mut:'Yes (Mutable)',    dup:'No',  ex:'{1, 2, 3}' },
                    { name:'Dictionary', syn:'{k: v}', ord:'Yes', mut:'Yes (Mutable)',    dup:'Keys: No',ex:'{"a": 1, "b": 2}', alt:true },
                  ].map(r => (
                    <tr key={r.name} style={{ borderBottom:'1px solid #e2e8f0', background: r.alt ? '#f8fafc':'white' }}>
                      <td style={{ padding:'0.85rem 1.2rem', fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                      <td style={{ padding:'0.85rem 1.2rem' }}><code style={{ background:'#eff6ff', color:'#1d4ed8', padding:'0.25rem 0.6rem', borderRadius:'6px' }}>{r.syn}</code></td>
                      <td style={{ padding:'0.85rem 1.2rem', color:'#475569' }}>{r.ord}</td>
                      <td style={{ padding:'0.85rem 1.2rem', color:'#475569', fontWeight:600 }}>{r.mut}</td>
                      <td style={{ padding:'0.85rem 1.2rem', color:'#475569' }}>{r.dup}</td>
                      <td style={{ padding:'0.85rem 1.2rem', fontFamily:'monospace', color:'#0f172a' }}>{r.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Playground
              id="intro"
              title="Interactive Data Structures Preview"
              defaultCode={`# Let's inspect the types
my_list = [10, 20, 20]
my_tuple = (10, 20, 20)
my_set = {10, 20, 20}
my_dict = {"a": 10, "b": 20}

print("List:  ", my_list)
print("Tuple: ", my_tuple)
print("Set:   ", my_set)  # Notice duplicate 20 is removed!
print("Dict:  ", my_dict)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('list_tab')}>Start: Lists <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 2: LIST ─── */}
      {activeTab === 'list_tab' && (
        <Section key="list" eyebrow="Day 5 • Lists" title="Lists: Changeable Heterogeneous Arrays">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              A <strong>List</strong> is a sequence of elements that is <strong>ordered</strong> and <strong>mutable</strong> (changeable). Lists allow duplicate elements and can contain multiple data types (heterogeneous) in a single container.
            </p>

            {/* List Declarations & Basic Operations */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>✨ 1. List Declaration & Initialization</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Lists are defined using square brackets <code>[]</code> or via the <code>list()</code> constructor function.
            </p>
            <CodeBlock title="list_declarations.py">
              empty_list = []<br/>
              mixed_list = [{nm('10')}, {st('"Python"')}, {nm('3.14')}, {kw('True')}] {ok('  # heterogeneous list')}<br/>
              colors = [{st('"red"')}, {st('"blue"')}, {st('"red"')}] {ok('  # duplicates allowed')}<br/>
              list_from_str = {fn('list')}({st('"abc"')}) {ok('  # ["a", "b", "c"]')}<br/>
              {fn('print')}(mixed_list)
            </CodeBlock>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🛠️ 2. Core List Operations</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              You can concatenate, replicate, or perform membership checks on lists using basic Python operators:
            </p>
            <ul style={{ color:'#475569', lineHeight:1.6, marginBottom:'1.5rem', paddingLeft:'20px', fontSize:'0.92rem' }}>
              <li><strong>Concatenation (<code>+</code>):</strong> Joins two lists together.</li>
              <li><strong>Replication (<code>*</code>):</strong> Repeats a list a specified number of times.</li>
              <li><strong>Membership (<code>in</code> / <code>not in</code>):</strong> Checks if an element is inside the list.</li>
            </ul>
            <CodeBlock title="list_operators.py">
              a = [{nm('1')}, {nm('2')}]<br/>
              b = [{nm('3')}, {nm('4')}]<br/>
              combined = a + b {ok('  # [1, 2, 3, 4] (Concatenation)')}<br/>
              repeated = a * {nm('3')} {ok('  # [1, 2, 1, 2, 1, 2] (Replication)')}<br/>
              is_present = {nm('2')} {kw('in')} a {ok('  # True (Membership check)')}<br/>
              is_missing = {nm('10')} {kw('not in')} a {ok('  # True')}
            </CodeBlock>

            {/* Visual Indexing Map */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🔍 3. Indexing: Positive vs Negative</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Elements inside lists can be accessed from both ends. Positive index starts from <code>0</code> on the left, while negative index starts from <code>-1</code> on the right.
            </p>
            <div style={{ background:'#1e293b', padding:'1.2rem', borderRadius:'10px', color:'#38bdf8', fontFamily:'monospace', fontSize:'0.92rem', lineHeight:1.8, marginBottom:'2rem', overflowX:'auto' }}>
              Elements:&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;"P"&nbsp;,&nbsp;&nbsp;"y"&nbsp;,&nbsp;&nbsp;"t"&nbsp;,&nbsp;&nbsp;"h"&nbsp;,&nbsp;&nbsp;"o"&nbsp;,&nbsp;&nbsp;"n"&nbsp;&nbsp;]<br/>
              Positive:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5<br/>
              Negative:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-6&nbsp;&nbsp;&nbsp;&nbsp;-5&nbsp;&nbsp;&nbsp;&nbsp;-4&nbsp;&nbsp;&nbsp;&nbsp;-3&nbsp;&nbsp;&nbsp;&nbsp;-2&nbsp;&nbsp;&nbsp;&nbsp;-1
            </div>

            {/* Slicing Mechanics */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>✂️ 4. List Slicing Syntax</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Slicing lets you extract a sub-list. The syntax is: <code style={{ background:'#eff6ff', color:'#1d4ed8', padding:'0.2rem 0.5rem', borderRadius:'4px' }}>list[start : stop : step]</code>
            </p>
            <ul style={{ color:'#475569', lineHeight:1.6, marginBottom:'2rem', paddingLeft:'20px', fontSize:'0.92rem' }}>
              <li><code>start</code>: The index to begin the slice (inclusive). Default is 0.</li>
              <li><code>stop</code>: The index to end the slice (exclusive). Default is the end of list.</li>
              <li><code>step</code>: The number of items to skip. Default is 1. Negative step (e.g. -1) reverses the list.</li>
            </ul>

            <CodeBlock title="indexing_and_slicing.py">
              letters = [{st('"a"')}, {st('"b"')}, {st('"c"')}, {st('"d"')}, {st('"e"')}]<br/><br/>
              {c('# Indexing examples')}<br/>
              {fn('print')}(letters[{nm('0')}]) {ok('# "a" (first element)')}<br/>
              {fn('print')}(letters[-{nm('1')}]) {ok('# "e" (last element)')}<br/><br/>
              {c('# Slicing examples')}<br/>
              {fn('print')}(letters[{nm('1')}:{nm('4')}]) {ok('# ["b", "c", "d"] (from index 1 to 3)')}<br/>
              {fn('print')}(letters[:{nm('3')}]) {ok('# ["a", "b", "c"] (first 3 elements)')}<br/>
              {fn('print')}(letters[{nm('2')}:]) {ok('# ["c", "d", "e"] (elements from index 2 to end)')}<br/>
              {fn('print')}(letters[::{nm('2')}]) {ok('# ["a", "c", "e"] (every second element)')}<br/>
              {fn('print')}(letters[::{nm('-1')}]) {ok('# ["e", "d", "c", "b", "a"] (reversed list)')}<br/><br/>
              {c('# Negative Slicing examples')}<br/>
              {fn('print')}(letters[-{nm('3')}:-{nm('1')}]) {ok('# ["c", "d"] (from index -3 to -2)')}<br/>
              {fn('print')}(letters[-{nm('3')}:]) {ok('# ["c", "d", "e"] (elements from index -3 to end)')}<br/>
              {fn('print')}(letters[:-{nm('2')}]) {ok('# ["a", "b", "c"] (from start to index -3)')}<br/>
              {fn('print')}(letters[::{nm('-2')}]) {ok('# ["e", "c", "a"] (reversed list, skipping every second element)')}
            </CodeBlock>

            {/* List Methods Grid */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🛠️ 5. Exhaustive List Methods</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Lists can be modified in-place or analyzed using standard helper methods. Here is the complete list:
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>Addition Methods</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  <code>.append(x)</code>: Adds element `x` to end of list.<br/>
                  <code>.insert(i, x)</code>: Inserts element `x` at index `i`.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>Removal Methods</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  <code>.pop()</code>: Removes & returns last element.<br/>
                  <code>.pop(i)</code>: Removes & returns element at index `i`.<br/>
                  <code>.remove(x)</code>: Removes first occurrence of item `x`.
                </p>
              </div>
              <div style={{ background:'#f8fafc', borderRadius:'12px', padding:'1.3rem', border:'1px solid #e2e8f0' }}>
                <h4 style={{ margin:'0 0 0.5rem', color:'#0f172a' }}>Utility & Reordering</h4>
                <p style={{ margin:0, color:'#475569', fontSize:'0.85rem', lineHeight:1.6 }}>
                  <code>.sort()</code>: Sorts the list in-place (ascending).<br/>
                  <code>.reverse()</code>: Reverses the list in-place.<br/>
                  <code>.count(x)</code>: Returns number of occurrences of `x`.
                </p>
              </div>
            </div>

            {/* Built-in Functions & Nested Lists */}
            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>📏 6. Built-in Functions & Matrices</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Python provides global mathematical functions for lists, and you can also create multi-dimensional lists (matrices).
            </p>
            <CodeBlock title="functions_and_matrices.py">
              nums = [{nm('10')}, {nm('5')}, {nm('20')}, {nm('15')}]<br/>
              {fn('print')}({fn('len')}(nums)) {ok('  # 4 (Total elements)')}<br/>
              {fn('print')}({fn('min')}(nums)) {ok('  # 5 (Minimum element)')}<br/>
              {fn('print')}({fn('max')}(nums)) {ok('  # 20 (Maximum element)')}<br/><br/>
              {c('# Nested List / Matrix')}<br/>
              matrix = [<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;[{nm('1')}, {nm('2')}, {nm('3')}],<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;[{nm('4')}, {nm('5')}, {nm('6')}]<br/>
              ]<br/>
              {fn('print')}(matrix[{nm('0')}][{nm('1')}]) {ok('  # 2 (Row 0, Col 1)')}
            </CodeBlock>

            <Playground
              id="list_play"
              title="Play with Lists, Indexing & Slicing"
              defaultCode={`numbers = [10, 20, 30, 40, 50]

# 1. Indexing & Slicing
print("Original List:", numbers)
print("Element at index 2:", numbers[2])
print("Last element:", numbers[-1])
print("Middle Slice [1:4]:", numbers[1:4])
print("Reversed List:", numbers[::-1])
print("Negative slice [-3:-1]:", numbers[-3:-1])
print("Negative slice [-3:]  :", numbers[-3:])

# 2. List methods
numbers.append(60)
numbers.insert(0, 5)
print("After appends:", numbers)

numbers.sort()
print("Sorted List:", numbers)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('tuple_tab')}>Next: Tuples <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 3: TUPLE ─── */}
      {activeTab === 'tuple_tab' && (
        <Section key="tuple" eyebrow="Day 5 • Tuples" title="Tuples: Ordered Immutable Sequences">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              A <strong>Tuple</strong> is a collection which is ordered and <strong>immutable</strong> (unchangeable). Once a tuple is created, you cannot add, remove, or modify elements. Tuples are written with parentheses <code>()</code>.
            </p>

            <div style={{ background:'#fffbeb', borderLeft:'4px solid #f59e0b', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#78350f', lineHeight:1.7, fontSize:'0.95rem' }}>
                💡 <strong>Single Element Tuple Rule:</strong><br/>
                To create a tuple with only one element, you <strong>must</strong> include a trailing comma. Otherwise, Python will treat it as a regular string/number in parentheses.<br/>
                <code>single_item = (5,)</code> &nbsp;{ok('  # Correct Tuple')}<br/>
                <code>not_a_tuple = (5)</code> &nbsp;&nbsp;{c('  # Treated as regular integer')}
              </p>
            </div>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>📌 1. Indexing & Slicing in Tuples</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Tuples support indexing, negative indexing, slicing, membership checks, concatenation, and replication in the exact same manner as lists.
            </p>

            <CodeBlock title="tuple_indexing_slicing.py">
              colors = ({st('"red"')}, {st('"green"')}, {st('"blue"')}, {st('"yellow"')})<br/><br/>
              {c('# Accessing elements')}<br/>
              {fn('print')}(colors[{nm('0')}]) {ok('# "red"')}<br/>
              {fn('print')}(colors[-{nm('1')}]) {ok('# "yellow"')}<br/><br/>
              {c('# Slicing')}<br/>
              {fn('print')}(colors[{nm('1')}:{nm('3')}]) {ok('# ("green", "blue")')}<br/><br/>
              {c('# Operators')}<br/>
              joined_tuple = colors + ({st('"pink"')},)<br/>
              repeated_tuple = ({nm('1')}, {nm('2')}) * {nm('2')} {ok('  # (1, 2, 1, 2)')}
            </CodeBlock>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>📦 2. Tuple Unpacking</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Unpacking extracts tuple elements back into variables. Python also supports using the <code>*</code> operator to unpack multiple elements into a list.
            </p>

            <CodeBlock title="tuple_unpacking.py">
              person = ({st('"Amit"')}, {nm('25')}, {st('"Manager"')})<br/>
              name, age, job = person<br/>
              {fn('print')}(name) {ok('  # "Amit"')}<br/>
              {fn('print')}(job) {ok('  # "Manager"')}<br/><br/>
              {c('# Wildcard Unpacking')}<br/>
              numbers = ({nm('1')}, {nm('2')}, {nm('3')}, {nm('4')})<br/>
              first, *middle, last = numbers<br/>
              {fn('print')}(middle) {ok('  # [2, 3] (unpacks middle elements as a list)')}
            </CodeBlock>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🛠️ 3. Tuple Methods Reference</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Tuples have only two built-in methods because they cannot be modified:
            </p>
            <ul style={{ color:'#475569', lineHeight:1.6, marginBottom:'2rem', paddingLeft:'20px', fontSize:'0.92rem' }}>
              <li><strong><code>.count(x)</code></strong>: Returns the number of times value <code>x</code> appears in the tuple.</li>
              <li><strong><code>.index(x)</code></strong>: Searches for value <code>x</code> and returns its first index position.</li>
            </ul>

            <Playground
              id="tuple_play"
              title="Play with Tuples & Unpacking"
              defaultCode={`# Packing coordinates
location = (13.0827, 80.2707, "Chennai")

# Unpack
lat, lon, city = location
print("Latitude :", lat)
print("Longitude:", lon)
print("City     :", city)

# Tuple Methods
numbers = (10, 20, 10, 30, 10)
print("Occurrences of 10:", numbers.count(10))
print("First index of 20:", numbers.index(20))`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('set_tab')}>Next: Sets <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 4: SET ─── */}
      {activeTab === 'set_tab' && (
        <Section key="set" eyebrow="Day 5 • Sets" title="Sets: Unordered Unique Collections">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              A <strong>Set</strong> is a collection of elements that is <strong>unordered</strong>, <strong>unindexed</strong>, and holds <strong>only unique elements</strong> (duplicates are removed automatically).
            </p>

            <div style={{ background:'#f0fdf4', borderLeft:'4px solid #10b981', padding:'1.2rem 1.5rem', borderRadius:'10px', marginBottom:'2rem' }}>
              <p style={{ margin:0, color:'#065f46', lineHeight:1.6, fontSize:'0.95rem' }}>
                ⚠️ <strong>Key Rules of Sets:</strong><br/>
                1. <strong>Unindexed:</strong> You cannot access elements by index: <code>my_set[0]</code> will throw an error.<br/>
                2. <strong>Mutable elements:</strong> While the Set is mutable, the items stored inside must be of immutable types (e.g. integers, floats, strings, tuples).
              </p>
            </div>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>⚙️ 1. Set Modifying & Logical Methods</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Sets support modification methods and logical checks:
            </p>
            <ul style={{ color:'#475569', lineHeight:1.6, marginBottom:'1.5rem', paddingLeft:'20px', fontSize:'0.92rem' }}>
              <li><code>.add(x)</code>: Adds a single element `x` to the set.</li>
              <li><code>.remove(x)</code>: Removes element `x`. Throws error if `x` does not exist.</li>
              <li><code>.discard(x)</code>: Removes element `x` safely without throwing an error if missing.</li>
              <li><code>.pop()</code>: Removes and returns an arbitrary element from the set.</li>
              <li><code>.clear()</code>: Removes all elements from the set.</li>
              <li><code>.issubset(other)</code>: Returns <code>True</code> if all elements of the set are in <code>other</code>.</li>
              <li><code>.issuperset(other)</code>: Returns <code>True</code> if the set contains all elements of <code>other</code>.</li>
              <li><code>.isdisjoint(other)</code>: Returns <code>True</code> if the set has no common elements with <code>other</code>.</li>
            </ul>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>📐 2. Mathematical Set Operations</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1rem' }}>
              Sets are highly optimized for mathematical operators such as Union, Intersection, and Difference:
            </p>

            <CodeBlock title="set_math_operations.py">
              set_a = {'{'} {nm('1')}, {nm('2')}, {nm('3')}, {nm('4')} {'}'}<br/>
              set_b = {'{'} {nm('3')}, {nm('4')}, {nm('5')}, {nm('6')} {'}'}<br/><br/>
              {c('# Union (elements in either set)')}<br/>
              {fn('print')}(set_a | set_b) {ok('# {1, 2, 3, 4, 5, 6}')}<br/><br/>
              {c('# Intersection (common elements)')}<br/>
              {fn('print')}(set_a & set_b) {ok('# {3, 4}')}<br/><br/>
              {c('# Difference (elements in A but not in B)')}<br/>
              {fn('print')}(set_a - set_b) {ok('# {1, 2}')}<br/><br/>
              {c('# Symmetric Difference (elements in A or B but not both)')}<br/>
              {fn('print')}(set_a ^ set_b) {ok('# {1, 2, 5, 6}')}
            </CodeBlock>

            <Playground
              id="set_play"
              title="Play with Sets"
              defaultCode={`set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Print original sets
print("Set 1:", set1)
print("Set 2:", set2)

# Union and Intersection
print("Union       :", set1 | set2)
print("Intersection:", set1 & set2)
print("Difference  :", set1 - set2)
print("Symm Diff   :", set1 ^ set2)

# Logical properties/checks
print("Is subset?  :", {1, 2}.issubset(set1))
print("Is disjoint?:", set1.isdisjoint({10, 20}))

# Modifying set
set1.add(10)
set1.discard(2)
print("Set 1 modified:", set1)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('dict_tab')}>Next: Dictionaries <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 5: DICTIONARY ─── */}
      {activeTab === 'dict_tab' && (
        <Section key="dict" eyebrow="Day 5 • Dictionaries" title="Dictionaries: Structured Key-Value Pairs">
          <div className="panel">
            <p style={{ color:'#475569', fontSize:'1.05rem', lineHeight:1.7, marginBottom:'2rem' }}>
              A <strong>Dictionary</strong> stores data in <strong>key-value pairs</strong>. Key-value structures are ordered (preserving insertion sequence since Python 3.7) and mutable. Keys must be unique and immutable, while values can repeat.
            </p>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>📂 1. Initialization and Value Access</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Create dictionaries using curly braces <code>{'{key: value}'}</code> and access elements safely using <code>.get()</code>.
            </p>

            <CodeBlock title="dict_examples.py">
              student = {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{st('"name"')}: {st('"Priya"')},<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{st('"marks"')}: {nm('88')},<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{st('"city"')}: {st('"Theni"')}<br/>
              {'}'}<br/><br/>
              {c('# Accessing value by key')}<br/>
              {fn('print')}(student[{st('"name"')}]) {ok('# "Priya"')}<br/>
              {c('# Safe retrieval using .get()')}<br/>
              {fn('print')}(student.{fn('get')}({st('"rank"')}, {st('"Not Ranked"')})) {ok('# "Not Ranked" (avoid KeyError)')}
            </CodeBlock>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🛠️ 2. Modifying & Removing Entries</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Entries can be added or updated by direct assignments, and removed via the <code>.pop()</code> or <code>.clear()</code> methods.
            </p>

            <CodeBlock title="dict_modifications.py">
              data = {'{'} {st('"a"')}: {nm('1')} {'}'}<br/>
              data[{st('"a"')}] = {nm('10')} {ok('  # updates existing key')}<br/>
              data[{st('"b"')}] = {nm('20')} {ok('  # adds new key')}<br/>
              removed_val = data.{fn('pop')}({st('"a"')}) {ok('  # removes key "a" and returns 10')}<br/>
              {fn('print')}(data)
            </CodeBlock>

            <h3 style={{ fontSize:'1.3rem', color:'#0f172a', marginBottom:'0.5rem' }}>🔁 3. Dictionary Iteration</h3>
            <p style={{ color:'#475569', fontSize:'0.95rem', marginBottom:'1.5rem' }}>
              Use the built-in iterable structures to traverse keys, values, or full key-value tuples:
            </p>
            <ul style={{ color:'#475569', lineHeight:1.6, marginBottom:'1.5rem', paddingLeft:'20px', fontSize:'0.92rem' }}>
              <li><code>.keys()</code>: Traverses all key indexes.</li>
              <li><code>.values()</code>: Traverses mapped values.</li>
              <li><code>.items()</code>: Traverses key-value pairs as individual tuples.</li>
            </ul>

            <Playground
              id="dict_play"
              title="Play with Dictionaries"
              defaultCode={`contact = {
    "name": "Priya",
    "email": "priya@gmail.com",
    "role": "Analyst"
}

# Accessing keys safely
print("Role:", contact.get("role"))

# Updating value
contact["email"] = "priya.work@gmail.com"

# Adding new key
contact["status"] = "Active"

# print keys and values
print("Keys  :", contact.keys())
print("Values:", contact.values())
print("Dict  :", contact)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('practice')}>Next: Phonebook Project <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 6: PRACTICE PROJECT ─── */}
      {activeTab === 'practice' && (
        <Section key="practice" eyebrow="Day 5 • Capstone" title="📞 Phonebook Application">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#0c4a6e,#0369a1)', color:'white', padding:'2rem', borderRadius:'16px', marginBottom:'2rem' }}>
              <h3 style={{ fontSize:'1.5rem', margin:'0 0 0.8rem', fontWeight:800 }}>Day 5 Capstone: Phonebook System</h3>
              <p style={{ color:'#bae6fd', margin:0, lineHeight:1.7 }}>
                Combine a <strong>dictionary</strong> with a <code>while</code> loop to create an interactive phonebook contacts management program.
              </p>
            </div>

            <CodeBlock title="phonebook_app.py — Pure data structures + loop logic (no def)">
              phonebook = {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{st('"Alice"')}: {st('"9876543210"')},<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{st('"Bob"')}: {st('"8765432109"')}<br/>
              {'}'}<br/><br/>
              {fn('print')}({st('"Contacts Book:"')}, phonebook)<br/><br/>
              {c('# Simulate choice 1: Add or update Alice number')}<br/>
              phonebook[{st('"Alice"')}] = {st('"9998887776"')}<br/>
              {fn('print')}({st('"After Update Alice:"')}, phonebook)<br/><br/>
              {c('# Simulate choice 2: Search for Bob')}<br/>
              name = {st('"Bob"')}<br/>
              {kw('if')} name {kw('in')} phonebook:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}(name, {st('"Phone:"')}, phonebook[name])<br/>
              {kw('else')}:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{fn('print')}({st('"Not found"')})<br/><br/>
              {c('# Simulate choice 3: Delete Bob')}<br/>
              phonebook.{fn('pop')}({st('"Bob"')})<br/>
              {fn('print')}({st('"After Bob deleted:"')}, phonebook)
            </CodeBlock>

            <Playground
              id="phonebook_app"
              title="Play with the Phonebook Console"
              inputs={[
                { label:'Contact Name =', default:'Charlie', width:'100px' },
                { label:'Contact Number =', default:'9999888877', width:'100px' },
              ]}
              defaultCode={`# Initial contact data
phonebook = {
    "Alice": "9876543210",
    "Bob": "8765432109"
}
print("Initial book:", phonebook)

# Add a contact using the user input boxes above
new_name = input("Enter contact name: ")
new_num = input("Enter contact phone: ")

phonebook[new_name] = new_num
print("After adding contact:", phonebook)

# Loop and view keys
print("All Contacts Names:")
for name in phonebook.keys():
    print("-", name)`}
            />

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => nav('assignment_work')}>Next: Assignment 📝 <ArrowRight size={18}/></button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TAB 7: ASSIGNMENT ─── */}
      {activeTab === 'assignment_work' && (
        <Section key="assignment_work" eyebrow="Day 5 • Assignment" title="📝 Day 5 Assignment">
          <div className="panel">
            <div style={{ background:'linear-gradient(135deg,#1e3a8a,#1d4ed8)', padding:'1.8rem', borderRadius:'14px', color:'white', marginBottom:'2.5rem' }}>
              <h3 style={{ margin:'0 0 0.6rem', fontSize:'1.4rem', fontWeight:800 }}>Rules</h3>
              <p style={{ color:'#bfdbfe', margin:0, lineHeight:1.7 }}>Save as <code style={{ color:'#fde68a' }}>day5_assignment.py</code>. Use lists, sets, tuples, and dictionaries. <strong>Do not use functions (def keyword).</strong></p>
            </div>

            {[
              { n:1,  t:'List Sum and Averages',     diff:'Easy',   col:'#10b981', desc:'Create a list of 5 integers. Compute the sum and average of the elements using standard math operations and len(), then print the results.' },
              { n:2,  t:'List Indexing and Slicing', diff:'Easy',   col:'#10b981', desc:'Create a list containing 8 elements. Print the first element, the last element (using negative indexing), and a slice containing elements from index 2 to 5.' },
              { n:3,  t:'Unique elements (Set)',     diff:'Easy',   col:'#10b981', desc:'Take a list with duplicate integers. Cast it to a set using set() to remove duplicates, and print the unique set.' },
              { n:4,  t:'Tuple Unpacking',           diff:'Medium', col:'#f59e0b', desc:'Create a tuple representing a date: (day, month, year). Unpack the tuple into three separate variables and print them formatted as day/month/year.' },
              { n:5,  t:'Dictionary Operations',     diff:'Medium', col:'#f59e0b', desc:'Create a dictionary of a person (name, age, city). Add a new key "job". Modify the key "age". Print all keys of the dictionary.' },
              { n:6,  t:'List element Swap',         diff:'Medium', col:'#f59e0b', desc:'Create a list of 4 items. Swap the first and last element of the list, and print the updated list.' },
              { n:7,  t:'Set Operations (Union)',    diff:'Medium', col:'#f59e0b', desc:'Create two sets of numbers. Print their union (elements in either set) and their intersection (elements present in both sets).' },
              { n:8,  t:'Dictionary Lookup Program', diff:'Medium', col:'#f59e0b', desc:'Create a country-capital dictionary. Ask the user to enter a country name. Use if/else to check if the country exists as a key; if yes, print its capital, otherwise print "Not Found".' },
              { n:9,  t:'List to Dictionary',        diff:'Hard',   col:'#ef4444', desc:'Create a list of keys: ["a", "b", "c"] and values: [1, 2, 3]. Initialize an empty dictionary, and use a loop to map keys to values one by one.' },
              { n:10, t:'Check subsets',             diff:'Hard',   col:'#ef4444', desc:'Create Set A and Set B. Write a comparison script using relational operators or loop membership to print whether Set A is a subset of Set B (all elements of A are in B).' },
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

      {/* ─── TAB 8: QUIZ ─── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Day 5 • Assessment" title="🧠 Quiz — Data Structures">
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
                  {quizScore===quizData.length?'🏆 Perfect! Data Structures Mastered!':quizScore>=10?'🥇 Excellent Work!':quizScore>=7?'🥈 Good Job! Review answers below.':'📚 Keep reviewing List, Set, Tuple & Dict!'}
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
