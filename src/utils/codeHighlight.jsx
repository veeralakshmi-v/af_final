/**
 * codeHighlight.jsx
 *
 * Shared, bug-free syntax highlighter for Python, JS/JSX/React, HTML, and Shell code blocks.
 *
 * Root cause of the old bugs:
 *   Regex replacements running on string literals/comments sequentially would match
 *   previously injected HTML tags and style attributes (e.g. `style="color:#a5d6ff"` or `#8892b0`),
 *   corrupting the HTML markup and rendering raw hex codes / style strings onto the screen.
 *
 * Fix: Character-by-character tokenizers that process raw source code directly without
 *   ever re-processing injected HTML tags.
 */
import React, { useState } from 'react';
import { Copy } from 'lucide-react';

/* ── Comprehensive Django / Python keyword set ── */
const PY_KEYWORDS = new Set([
  'def', 'import', 'from', 'return', 'class', 'if', 'else', 'elif',
  'for', 'while', 'in', 'not', 'and', 'or', 'is', 'True', 'False', 'None',
  'try', 'except', 'finally', 'with', 'as', 'pass', 'break', 'continue',
  'lambda', 'yield', 'global', 'nonlocal', 'del', 'raise', 'assert', 'super',
  'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set',
  'type', 'isinstance', 'hasattr', 'getattr', 'setattr',
  'python', 'pip', 'install', 'django-admin', 'startproject', 'startapp',
  'runserver', 'makemigrations', 'migrate',
  'models', 'forms', 'views', 'request', 'POST', 'GET',
  'objects', 'filter', 'get', 'create', 'update', 'delete', 'save', 'all',
  'render', 'redirect', 'get_object_or_404', 'HttpResponse',
  'authenticate', 'login', 'logout', 'login_required',
  'UserCreationForm', 'AuthenticationForm',
  'is_valid', 'is_authenticated', 'messages',
  'ModelForm', 'ForeignKey', 'CASCADE', 'CharField', 'TextField',
  'DecimalField', 'PositiveIntegerField', 'EmailField', 'BooleanField',
  'DateTimeField', 'IntegerField', 'Meta', 'ValidationError', 'commit',
  'admin', 'register', 'ModelAdmin', 'list_display', 'search_fields'
]);

/* ── JS / JSX / React / Git keywords & libraries ── */
const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'import', 'export', 'default',
  'from', 'if', 'else', 'async', 'await', 'try', 'catch', 'throw', 'new',
  'true', 'false', 'null', 'undefined', 'class', 'extends', 'typeof', 'instanceof',
  'void', 'delete', 'switch', 'case', 'break', 'continue', 'while', 'for', 'do',
  'in', 'of', 'yield', 'npm', 'cd', 'npx', 'create', 'vite', 'run', 'dev', 'install',
  'git', 'init', 'add', 'commit', 'status', 'log', 'config', 'checkout', 'branch',
  'push', 'pull', 'merge', 'clone', 'remote', 'rebase', 'stash', 'reset'
]);

const REACT_HOOKS = new Set([
  'useState', 'useEffect', 'useRef', 'useContext', 'useReducer', 'useCallback',
  'useMemo', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue',
  'useDeferredValue', 'useTransition', 'useId', 'useNavigate', 'useParams',
  'useLocation', 'useRouteError'
]);

const REACT_LIBS = new Set([
  'React', 'ReactDOM', 'Component', 'PureComponent', 'Fragment', 'createContext',
  'memo', 'forwardRef', 'lazy', 'Suspense', 'BrowserRouter', 'Routes', 'Route',
  'Link', 'NavLink', 'Outlet', 'Navigate', 'axios', 'fetch', 'console', 'window',
  'document', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean'
]);

/* ── HTML escape ── */
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ── Python line tokenizer ── */
function tokenizePyLine(raw) {
  let out = '';
  let i = 0;
  while (i < raw.length) {
    if (raw[i] === '#') {
      out += `<span style="color:#34d399;font-style:italic;">${esc(raw.slice(i))}</span>`;
      break;
    }
    if (raw[i] === '"' || raw[i] === "'") {
      const q = raw[i];
      let j = i + 1;
      while (j < raw.length) {
        if (raw[j] === '\\') { j += 2; continue; }
        if (raw[j] === q) { j++; break; }
        j++;
      }
      out += `<span style="color:#a5d6ff">${esc(raw.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(raw[i])) {
      let j = i;
      while (j < raw.length && /[a-zA-Z0-9_\-]/.test(raw[j])) j++;
      const word = raw.slice(i, j);
      if (PY_KEYWORDS.has(word)) {
        out += `<span style="color:#ff7b72;font-weight:bold">${word}</span>`;
      } else {
        out += esc(word);
      }
      i = j;
      continue;
    }
    if (raw[i] === '@') {
      let j = i + 1;
      while (j < raw.length && /[a-zA-Z0-9_.()]/.test(raw[j])) j++;
      out += `<span style="color:#d2a8ff">${esc(raw.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    out += esc(raw[i]);
    i++;
  }
  return out;
}

/* ── JS / JSX / React character-by-character tokenizer ── */
export function highlightJSString(code) {
  if (!code) return '';
  let out = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    // 0. HTML Comment in JSX <!-- -->
    if (code[i] === '<' && code.slice(i, i + 4) === '&lt;!--' || code.slice(i, i + 4) === '<!--') {
      let endTag = code.indexOf('-->', i);
      if (endTag === -1) endTag = code.indexOf('--&gt;', i);
      if (endTag !== -1) {
        let j = endTag + (code.slice(endTag, endTag + 6) === '--&gt;' ? 6 : 3);
        out += `<span style="color:#34d399;font-style:italic;font-weight:600;">${esc(code.slice(i, j))}</span>`;
        i = j;
        continue;
      }
    }

    // 1. Single-line comment //
    if (code[i] === '/' && code[i + 1] === '/') {
      let j = code.indexOf('\n', i);
      if (j === -1) j = len;
      out += `<span style="color:#34d399;font-style:italic;">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 2. Block comment /* */
    if (code[i] === '/' && code[i + 1] === '*') {
      let j = code.indexOf('*/', i + 2);
      if (j === -1) j = len; else j += 2;
      out += `<span style="color:#34d399;font-style:italic;">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 3. Shell / terminal comment #
    if (code[i] === '#') {
      let prev = i > 0 ? code[i - 1] : '\n';
      if (prev === ' ' || prev === '\t' || prev === '\n' || prev === '\r') {
        let j = code.indexOf('\n', i);
        if (j === -1) j = len;
        out += `<span style="color:#34d399;font-style:italic;">${esc(code.slice(i, j))}</span>`;
        i = j;
        continue;
      }
    }

    // 4. Strings ("...", '...', `...`)
    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const q = code[i];
      let j = i + 1;
      while (j < len) {
        if (code[j] === '\\') {
          j += 2;
          continue;
        }
        if (code[j] === q) {
          j++;
          break;
        }
        if (q !== '`' && code[j] === '\n') {
          break;
        }
        j++;
      }
      out += `<span style="color:#a5d6ff">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 5. JSX Tags: </Tag> or <Tag ...
    if (code[i] === '<') {
      const closeMatch = code.slice(i).match(/^<\/([a-zA-Z0-9_\-\.]+)\s*>/);
      if (closeMatch) {
        const tagName = closeMatch[1];
        const isComp = /^[A-Z]/.test(tagName);
        const color = isComp ? '#7ee787' : '#79c0ff';
        out += `&lt;/<span style="color:${color}">${tagName}</span>&gt;`;
        i += closeMatch[0].length;
        continue;
      }

      const openMatch = code.slice(i).match(/^<([a-zA-Z0-9_\-\.]+)(\s|\/|>)/);
      if (openMatch) {
        const tagName = openMatch[1];
        const isComp = /^[A-Z]/.test(tagName);
        const color = isComp ? '#7ee787' : '#79c0ff';
        const suffix = openMatch[2];
        if (suffix === '>') {
          out += `&lt;<span style="color:${color}">${tagName}</span>&gt;`;
          i += openMatch[1].length + 2;
        } else if (suffix === '/') {
          out += `&lt;<span style="color:${color}">${tagName}</span>/`;
          i += openMatch[1].length + 2;
        } else {
          out += `&lt;<span style="color:${color}">${tagName}</span> `;
          i += openMatch[1].length + 2;
        }
        continue;
      }
    }

    // 6. Words / Identifiers / Keywords / Hooks
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < len && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (JS_KEYWORDS.has(word)) {
        out += `<span style="color:#ff7b72;font-weight:bold">${word}</span>`;
      } else if (REACT_HOOKS.has(word) || /^use[A-Z]/.test(word)) {
        out += `<span style="color:#d18616;font-weight:bold">${word}</span>`;
      } else if (REACT_LIBS.has(word)) {
        out += `<span style="color:#d2a8ff">${word}</span>`;
      } else {
        out += esc(word);
      }
      i = j;
      continue;
    }

    // 7. Single char fallback
    out += esc(code[i]);
    i++;
  }

  return out;
}

export function highlightJS(code) {
  return <span dangerouslySetInnerHTML={{ __html: highlightJSString(code) }} />;
}

/* ── HTML/Django template highlighter ── */
function highlightHtmlTemplate(code) {
  const escaped = esc(code);
  const commentRegex = /(&lt;!--[\s\S]*?--&gt;)/g;
  const comments = [];
  let tokenized = escaped.replace(commentRegex, (match) => {
    comments.push(`<span style="color:#34d399;font-style:italic;font-weight:600;">${match}</span>`);
    return `___HTML_COMMENT_${comments.length - 1}___`;
  });

  tokenized = tokenized.replace(/(\{%[\s\S]*?%\})/g, '<span style="color:#ff7b72;font-weight:bold">$1</span>');
  tokenized = tokenized.replace(/(\{\{[\s\S]*?\}\})/g, '<span style="color:#a5d6ff;font-weight:bold">$1</span>');
  tokenized = tokenized.replace(/(&lt;\/?)([\w-]+)/g, '$1<span style="color:#7ee787">$2</span>');

  return tokenized.replace(/___HTML_COMMENT_(\d+)___/g, (_, index) => comments[Number(index)]);
}

/* ── Main highlight dispatcher ── */
export function highlight(code, language) {
  if (language === 'html') {
    return highlightHtmlTemplate(code);
  }
  if (language === 'js' || language === 'jsx' || language === 'javascript' || language === 'react' || language === 'json' || language === 'bash') {
    return highlightJSString(code);
  }
  // Default: Python
  return code.split('\n').map(tokenizePyLine).join('\n');
}

/* ── Exported CodeBlock component ── */
export function CodeBlock({ title, code, language = 'jsx' }) {
  const [cp, setCp] = useState(false);
  const html = highlight(code, language);

  return (
    <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', margin: '1.2rem 0', width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'auto', boxSizing: 'border-box' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
          <button
            onClick={() => { navigator.clipboard.writeText(code); setCp(true); setTimeout(() => setCp(false), 2000); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}
          >
            <Copy size={12} /> {cp ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre', overflowX: 'auto', maxWidth: '100%' }}>
        <code>
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </code>
      </pre>
    </div>
  );
}
