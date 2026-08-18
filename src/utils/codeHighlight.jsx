/**
 * codeHighlight.jsx
 *
 * Shared, bug-free syntax highlighter for Django course code blocks.
 *
 * Root cause of the old bug:
 *   The old approach first ran `#[^\n]*` comment regex on the raw code,
 *   injecting spans like <span style="color:#8b949e">. Then the string
 *   regex ran on the already-injected HTML and matched the `"` chars
 *   inside the span style attribute (e.g. "color:#8b949e"), breaking
 *   the HTML and making the raw style text visible on screen.
 *
 * Fix: Character-by-character tokenizer for Python — never processes
 *   already-injected HTML. HTML templates use non-conflicting regex
 *   patterns (no `#` in hex values appears in template code).
 */
import React, { useState } from 'react';
import { Copy } from 'lucide-react';

/* ── Comprehensive Django / Python keyword set ── */
const PY_KEYWORDS = new Set([
  // Python builtins
  'def', 'import', 'from', 'return', 'class', 'if', 'else', 'elif',
  'for', 'while', 'in', 'not', 'and', 'or', 'is', 'True', 'False', 'None',
  'try', 'except', 'finally', 'with', 'as', 'pass', 'break', 'continue',
  'lambda', 'yield', 'global', 'nonlocal', 'del', 'raise', 'assert', 'super',
  // Common builtins
  'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set',
  'type', 'isinstance', 'hasattr', 'getattr', 'setattr',
  // Django / setup commands
  'python', 'pip', 'install', 'django-admin', 'startproject', 'startapp',
  'runserver', 'makemigrations', 'migrate',
  // Django ORM / forms
  'models', 'forms', 'views', 'request', 'POST', 'GET',
  'objects', 'filter', 'get', 'create', 'update', 'delete', 'save', 'all',
  'render', 'redirect', 'get_object_or_404', 'HttpResponse',
  // Auth
  'authenticate', 'login', 'logout', 'login_required',
  'UserCreationForm', 'AuthenticationForm',
  'is_valid', 'is_authenticated', 'messages',
  // Model field types
  'ModelForm', 'ForeignKey', 'CASCADE', 'CharField', 'TextField',
  'DecimalField', 'PositiveIntegerField', 'EmailField', 'BooleanField',
  'DateTimeField', 'IntegerField', 'Meta', 'ValidationError', 'commit',
  // admin
  'admin', 'register', 'ModelAdmin', 'list_display', 'search_fields',
]);

/* ── HTML escape ── */
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ── Python line tokenizer (character-by-character — no regex interference) ── */
function tokenizePyLine(raw) {
  let out = '';
  let i = 0;
  while (i < raw.length) {
    // ── Comment: # to end of line ──────────────────────────────────
    if (raw[i] === '#') {
      out += `<span style="color:#8b949e">${esc(raw.slice(i))}</span>`;
      break;
    }

    // ── String literal ────────────────────────────────────────────
    if (raw[i] === '"' || raw[i] === "'") {
      const q = raw[i];
      let j = i + 1;
      // Skip escaped characters inside the string
      while (j < raw.length) {
        if (raw[j] === '\\') { j += 2; continue; }
        if (raw[j] === q) { j++; break; }
        j++;
      }
      out += `<span style="color:#a5d6ff">${esc(raw.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // ── Word / keyword ────────────────────────────────────────────
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

    // ── Decorators (@login_required, @admin.register …) ──────────
    if (raw[i] === '@') {
      let j = i + 1;
      while (j < raw.length && /[a-zA-Z0-9_.()]/.test(raw[j])) j++;
      out += `<span style="color:#d2a8ff">${esc(raw.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // ── Everything else (operators, punctuation, whitespace) ──────
    out += esc(raw[i]);
    i++;
  }
  return out;
}

/* ── HTML/Django template highlighter (regex — safe: no # interference) ── */
function highlightHtmlTemplate(code) {
  // Escape HTML chars in the source first
  let h = esc(code);
  // Django template tags: {% ... %}  — these chars are not escaped
  h = h.replace(/(\{%[\s\S]*?%\})/g, '<span style="color:#ff7b72;font-weight:bold">$1</span>');
  // Django template variables: {{ ... }}
  h = h.replace(/(\{\{[\s\S]*?\}\})/g, '<span style="color:#a5d6ff;font-weight:bold">$1</span>');
  // HTML tag names (after &lt;)
  h = h.replace(/(&lt;\/?)([\w-]+)/g, '$1<span style="color:#7ee787">$2</span>');
  return h;
}

/* ── Main highlight dispatcher ── */
function highlight(code, language) {
  if (language === 'html') {
    return highlightHtmlTemplate(code);
  }
  // Default: Python
  return code.split('\n').map(tokenizePyLine).join('\n');
}

/* ── Exported CodeBlock component ── */
export function CodeBlock({ title, code, language = 'python' }) {
  const [cp, setCp] = useState(false);
  const html = highlight(code, language);

  return (
    <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', margin: '1.2rem 0', overflowX: 'auto' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <button
            onClick={() => { navigator.clipboard.writeText(code); setCp(true); setTimeout(() => setCp(false), 2000); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Copy size={12} /> {cp ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre' }}>
        <code>
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </code>
      </pre>
    </div>
  );
}
