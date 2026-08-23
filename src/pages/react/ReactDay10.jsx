import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, CheckCircle, Code, ArrowRight,
  Copy, FileText, Plus, AlertTriangle, BookOpenCheck, Zap,
  GitBranch, RefreshCw, Server, Wifi, WifiOff, ChevronLeft,
  ChevronRight, Search, Edit, Trash2, Eye, Send, Download,
  Activity, Globe, Shield, Clock, Hash, List, Filter,
  ChevronDown, Check, X, Loader, AlertCircle, Info
} from 'lucide-react';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CodeBlock = ({ title, code }) => {
  const [cp, setCp] = useState(false);
  const hlJS = (c) => {
    let h = c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    h = h.replace(/(?<!=)(["'`])(?:\\.|[^\n"'`\\])*?\1/g, '<span style="color:#a5d6ff">$&</span>');
    h = h.replace(/(?<!["':a-zA-Z0-9])(\/\/[^\n]*)/g, '<span style="color:#8892b0">$1</span>');
    ['const','let','var','return','import','export','default','function','from','if','else','async','await','try','catch','throw','new','true','false','null','undefined'].forEach(k => {
      h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#ff7b72;font-weight:bold">$1</span>');
    });
    ['fetch','axios','then','catch','json','useState','useEffect','map','filter'].forEach(k => {
      h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#d2a8ff">$1</span>');
    });
    return <span dangerouslySetInnerHTML={{ __html: h }} />;
  };
  return (
    <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', margin: '1.2rem 0', overflowX: 'auto' }}>
      {title && (
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <button onClick={() => { navigator.clipboard.writeText(code); setCp(true); setTimeout(() => setCp(false), 2000); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Copy size={12} /> {cp ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: '1rem', color: '#f8fafc', fontSize: '0.88rem', fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre' }}>
        <code>{hlJS(code)}</code>
      </pre>
    </div>
  );
};

/* ── Mock student data (simulates backend) ── */
const INITIAL_STUDENTS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@school.com', course: 'React', grade: 'A', score: 92 },
  { id: 2, name: 'Bob Smith', email: 'bob@school.com', course: 'JavaScript', grade: 'B', score: 78 },
  { id: 3, name: 'Carol White', email: 'carol@school.com', course: 'React', grade: 'A', score: 95 },
  { id: 4, name: 'Dave Brown', email: 'dave@school.com', course: 'Python', grade: 'C', score: 62 },
  { id: 5, name: 'Eve Davis', email: 'eve@school.com', course: 'SQL', grade: 'B', score: 80 },
  { id: 6, name: 'Frank Miller', email: 'frank@school.com', course: 'React', grade: 'B', score: 75 },
  { id: 7, name: 'Grace Lee', email: 'grace@school.com', course: 'JavaScript', grade: 'A', score: 88 },
  { id: 8, name: 'Hank Wilson', email: 'hank@school.com', course: 'Python', grade: 'C', score: 58 },
  { id: 9, name: 'Ivy Taylor', email: 'ivy@school.com', course: 'SQL', grade: 'A', score: 91 },
  { id: 10, name: 'Jake Anderson', email: 'jake@school.com', course: 'React', grade: 'B', score: 83 },
  { id: 11, name: 'Kara Thomas', email: 'kara@school.com', course: 'JavaScript', grade: 'A', score: 90 },
  { id: 12, name: 'Liam Martin', email: 'liam@school.com', course: 'Python', grade: 'B', score: 74 },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay10({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('react_module10', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Section 2: Fetch vs Axios demo ── */
  const [fetchState, setFetchState] = useState('idle');
  const [fetchData, setFetchData] = useState(null);
  const [fetchLib, setFetchLib] = useState('fetch');

  const runFetch = async () => {
    setFetchState('loading'); setFetchData(null);
    await sleep(1200);
    setFetchData({ userId: 1, id: 1, title: 'Introduction to REST APIs', completed: true });
    setFetchState('success');
  };
  const runError = async () => {
    setFetchState('loading'); setFetchData(null);
    await sleep(900);
    setFetchState('error');
  };

  /* ── Section 3: HTTP Methods simulator ── */
  const [methodStudents, setMethodStudents] = useState([...INITIAL_STUDENTS.slice(0, 4)]);
  const [methodLog, setMethodLog] = useState([]);
  const [methodLoading, setMethodLoading] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', course: 'React', score: 80 });

  const simulateRequest = async (method, action, fn) => {
    setMethodLoading(true);
    setMethodLog(p => [{ method, action, status: 'pending' }, ...p].slice(0, 6));
    await sleep(700);
    fn();
    setMethodLog(p => [{ method, action, status: 'success' }, ...p.slice(1)].slice(0, 6));
    setMethodLoading(false);
  };

  const doGet = () => simulateRequest('GET', 'GET /api/students → 200 OK', () => {});
  const doPost = () => {
    if (!newStudent.name) return;
    simulateRequest('POST', `POST /api/students → 201 Created`, () => {
      const g = newStudent.score >= 80 ? 'A' : newStudent.score >= 60 ? 'B' : 'C';
      setMethodStudents(p => [...p, { id: Date.now(), grade: g, ...newStudent, score: +newStudent.score }]);
      setNewStudent({ name: '', email: '', course: 'React', score: 80 });
    });
  };
  const doPut = (student) => {
    simulateRequest('PUT', `PUT /api/students/${student.id} → 200 OK`, () => {
      setMethodStudents(p => p.map(s => s.id === student.id ? { ...s, score: Math.min(100, s.score + 5), grade: s.score >= 79 ? 'A' : 'B' } : s));
    });
    setEditRow(null);
  };
  const doDelete = (id) => {
    simulateRequest('DELETE', `DELETE /api/students/${id} → 204 No Content`, () => {
      setMethodStudents(p => p.filter(s => s.id !== id));
    });
  };

  /* ── Section 4: Loading + Error ── */
  const [spinnerType, setSpinnerType] = useState('circle');
  const [errorDemo, setErrorDemo] = useState('idle');

  /* ── Section 5: Pagination ── */
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);
  const [pageSearch, setPageSearch] = useState('');
  const filtered = INITIAL_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(pageSearch.toLowerCase()) ||
    s.course.toLowerCase().includes(pageSearch.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStudents = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  useEffect(() => { setPage(1); }, [pageSearch]);

  /* ── Capstone: Student Management API UI ── */
  const [apiStudents, setApiStudents] = useState([...INITIAL_STUDENTS]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiPage, setApiPage] = useState(1);
  const [apiSearch, setApiSearch] = useState('');
  const [apiForm, setApiForm] = useState({ name: '', email: '', course: 'React', score: 80 });
  const [apiEditId, setApiEditId] = useState(null);
  const [apiMsg, setApiMsg] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const showMsg = (text, type = 'success') => {
    setApiMsg({ text, type });
    setTimeout(() => setApiMsg(null), 3000);
  };

  const apiFiltered = apiStudents.filter(s =>
    s.name.toLowerCase().includes(apiSearch.toLowerCase()) ||
    s.course.toLowerCase().includes(apiSearch.toLowerCase())
  );
  const API_PAGE_SIZE = 5;
  const apiTotalPages = Math.ceil(apiFiltered.length / API_PAGE_SIZE);
  const apiPageData = apiFiltered.slice((apiPage - 1) * API_PAGE_SIZE, apiPage * API_PAGE_SIZE);
  useEffect(() => { setApiPage(1); }, [apiSearch]);

  const apiGet = async () => {
    setApiLoading(true); setApiError(null);
    await sleep(800);
    setApiLoading(false);
    showMsg(`GET /api/students → ${apiStudents.length} records fetched`);
  };
  const apiPost = async () => {
    if (!apiForm.name || !apiForm.email) { showMsg('Name and email are required', 'error'); return; }
    setApiLoading(true);
    await sleep(600);
    const g = apiForm.score >= 80 ? 'A' : apiForm.score >= 60 ? 'B' : 'C';
    const newRec = { id: Date.now(), grade: g, ...apiForm, score: +apiForm.score };
    setApiStudents(p => [newRec, ...p]);
    setApiForm({ name: '', email: '', course: 'React', score: 80 });
    setApiLoading(false);
    showMsg('POST /api/students → 201 Created ✅');
  };
  const apiPut = async () => {
    if (!apiForm.name || !apiForm.email) { showMsg('Name and email are required', 'error'); return; }
    setApiLoading(true);
    await sleep(600);
    const g = apiForm.score >= 80 ? 'A' : apiForm.score >= 60 ? 'B' : 'C';
    setApiStudents(p => p.map(s => s.id === apiEditId ? { ...s, grade: g, ...apiForm, score: +apiForm.score } : s));
    setApiEditId(null);
    setApiForm({ name: '', email: '', course: 'React', score: 80 });
    setApiLoading(false);
    showMsg('PUT /api/students/:id → 200 Updated ✅');
  };
  const apiDelete = async (id) => {
    setApiLoading(true);
    await sleep(500);
    setApiStudents(p => p.filter(s => s.id !== id));
    setDeleteConfirm(null);
    setApiLoading(false);
    showMsg('DELETE /api/students/:id → 204 No Content ✅');
  };
  const startEdit = (s) => {
    setApiEditId(s.id);
    setApiForm({ name: s.name, email: s.email, course: s.course, score: s.score });
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'What HTTP method is used to CREATE a new resource on the server?',
      opts: ['GET', 'DELETE', 'POST', 'PATCH'], ans: 2,
      exp: 'POST sends data to the server to create a new resource. The server responds with 201 Created.' },
    { k: 'q2', q: 'What does a 404 HTTP status code mean?',
      opts: ['Server crashed', 'Unauthorized access', 'Resource not found', 'Bad request syntax'],
      ans: 2, exp: '404 Not Found means the server could not find the requested resource at the given URL.' },
    { k: 'q3', q: 'What is the difference between fetch() and axios?',
      opts: [
        'fetch() is faster; axios is slower',
        'fetch() is built-in but requires manual .json() parsing and no auto-error throwing; axios auto-parses JSON and throws on 4xx/5xx status codes',
        'axios is built-in to React; fetch requires installation',
        'There is no difference — they work identically'
      ], ans: 1,
      exp: 'fetch() is native but you must call .json() and it does NOT throw on 4xx/5xx. axios auto-parses JSON into response.data and throws automatically on error status codes.' },
    { k: 'q4', q: 'In React, where should you write an API fetch call?',
      opts: [
        'Directly inside JSX return statement',
        'Inside useEffect with the correct dependency array',
        'Inside the useState initializer function',
        'In the component file but outside the function'
      ], ans: 1,
      exp: 'API calls are side effects and must go inside useEffect. The dependency array controls when the fetch re-runs (e.g., [] = once on mount, [id] = when id changes).' },
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  const methodColor = { GET: '#10b981', POST: '#6366f1', PUT: '#f59e0b', DELETE: '#ef4444' };

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. REST API CONCEPTS + JSON ─────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 10" title="REST API & JSON">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🌐 What is a REST API?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                A <strong>REST API</strong> (Representational State Transfer Application Programming Interface) is a web service that lets your React frontend communicate with a backend server using standard <strong>HTTP methods</strong>. Think of it as a menu in a restaurant — you request items and the kitchen (server) sends back what you asked for.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icon: <Globe size={20}/>, title: 'Client-Server', desc: 'React (client) sends requests; backend (server) sends responses. They are separate.', color: '#6366f1' },
                { icon: <Hash size={20}/>, title: 'Stateless', desc: 'Each request is independent. The server doesn\'t remember previous requests.', color: '#10b981' },
                { icon: <Shield size={20}/>, title: 'Uniform Interface', desc: 'Standard HTTP methods (GET, POST, PUT, DELETE) for all operations.', color: '#f59e0b' },
                { icon: <Layers size={20}/>, title: 'Resource-based URLs', desc: 'Each URL represents a resource: /api/students, /api/students/1', color: '#3b82f6' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#f8fafc', border: `1px solid ${c.color}22`, borderLeft: `4px solid ${c.color}`, borderRadius: 10, padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: c.color, fontWeight: 800 }}>
                    {c.icon} {c.title}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.87rem', color: '#475569', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>HTTP Status Codes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
              {[
                { code: '200', label: 'OK', desc: 'Request succeeded', color: '#10b981', bg: '#f0fdf4' },
                { code: '201', label: 'Created', desc: 'Resource created', color: '#10b981', bg: '#f0fdf4' },
                { code: '204', label: 'No Content', desc: 'Success, no body', color: '#10b981', bg: '#f0fdf4' },
                { code: '400', label: 'Bad Request', desc: 'Invalid data sent', color: '#f59e0b', bg: '#fffbeb' },
                { code: '404', label: 'Not Found', desc: 'Resource missing', color: '#ef4444', bg: '#fef2f2' },
                { code: '500', label: 'Server Error', desc: 'Backend crashed', color: '#ef4444', bg: '#fef2f2' },
              ].map((s, i) => (
                <div key={i} style={{ background: s.bg, border: `1px solid ${s.color}33`, borderRadius: 10, padding: '0.75rem', textAlign: 'center' }}>
                  <strong style={{ display: 'block', fontSize: '1.3rem', color: s.color }}>{s.code}</strong>
                  <span style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#374151' }}>{s.label}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{s.desc}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>JSON — JavaScript Object Notation</h3>
            <p>JSON is the <strong>universal language</strong> APIs use to exchange data. It looks like a JavaScript object but is always a string over the network.</p>
            <CodeBlock title="JSON example — API response" code={`// API Response (raw JSON string over network):
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@school.com",
  "course": "React",
  "score": 92,
  "grade": "A",
  "isActive": true,
  "tags": ["react", "javascript"]
}

// In React after parsing:
const student = JSON.parse(responseText);
console.log(student.name);   // "Alice Johnson"
console.log(student.score);  // 92

// Converting JS object back to JSON:
const jsonString = JSON.stringify(student);`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. FETCH vs AXIOS ────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 10" title="fetch() vs axios">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                { lib: 'fetch()', points: ['✅ Built-in — no install needed', '⚠️ Must call .json() manually', '⚠️ Does NOT throw on 4xx/5xx', '⚠️ No request cancellation built-in', '✅ Works in all modern browsers'], color: '#6366f1', bg: '#eff6ff' },
                { lib: 'axios', points: ['📦 Needs: npm install axios', '✅ Auto-parses JSON → response.data', '✅ Auto-throws on 4xx/5xx errors', '✅ Built-in request cancellation', '✅ Better error objects'], color: '#10b981', bg: '#f0fdf4' },
              ].map((l, i) => (
                <div key={i} style={{ background: l.bg, border: `2px solid ${l.color}33`, borderRadius: 14, padding: '1.25rem' }}>
                  <h4 style={{ color: l.color, fontWeight: 900, fontSize: '1.1rem', margin: '0 0 0.75rem', fontFamily: 'monospace' }}>{l.lib}</h4>
                  {l.points.map((p, j) => <div key={j} style={{ fontSize: '0.87rem', color: '#374151', marginBottom: 4 }}>{p}</div>)}
                </div>
              ))}
            </div>

            <CodeBlock title="Same GET request — fetch() vs axios" code={`// ── Using fetch() ──────────────────────────────────
fetch("https://api.school.com/students")
  .then(res => {
    if (!res.ok) throw new Error("HTTP Error: " + res.status);
    return res.json();          // MUST call .json() manually
  })
  .then(data => setStudents(data))
  .catch(err => setError(err.message));

// ── Using axios ────────────────────────────────────
import axios from "axios";

axios.get("https://api.school.com/students")
  .then(res => setStudents(res.data))  // .data auto-parsed
  .catch(err => setError(err.message)); // auto-throws on 4xx/5xx

// ── async/await pattern (both work the same way) ──
useEffect(() => {
  const getStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  getStudents();
}, []);`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🌐 Mock API Client</h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {['fetch', 'axios'].map(l => (
                <button key={l} onClick={() => setFetchLib(l)}
                  style={{ padding: '6px 18px', borderRadius: 8, border: '1.5px solid #6366f1', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                    background: fetchLib === l ? '#6366f1' : 'white', color: fetchLib === l ? 'white' : '#6366f1', transition: 'all 0.15s' }}>
                  {l}()
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-primary" onClick={runFetch} style={{ background: '#10b981', borderColor: '#10b981', flex: 1 }}>✅ Simulate Success</button>
                  <button className="btn btn-outline" onClick={runError} style={{ borderColor: '#ef4444', color: '#ef4444', flex: 1 }}>❌ Simulate Error</button>
                </div>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 10, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {fetchState === 'idle' && <span style={{ color: '#475569' }}>// Click a button to simulate a request…</span>}
                  {fetchState === 'loading' && <span style={{ color: '#fbbf24' }}>⏳ {fetchLib === 'fetch' ? 'await fetch(url).then(r => r.json())' : 'await axios.get(url)'}</span>}
                  {fetchState === 'success' && <span style={{ color: '#86efac' }}>{JSON.stringify(fetchData, null, 2)}</span>}
                  {fetchState === 'error' && <span style={{ color: '#fca5a5' }}>Error: {fetchLib === 'fetch' ? 'HTTP Error: 404' : 'AxiosError: Request failed with status 404'}</span>}
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 8 }}>State machine:</span>
                {['idle','loading','success','error'].map(s => (
                  <div key={s} style={{ fontFamily: 'monospace', fontSize: '0.8rem', padding: '3px 0',
                    color: fetchState === s ? '#86efac' : '#475569', fontWeight: fetchState === s ? 'bold' : 'normal' }}>
                    {fetchState === s ? '▶ ' : '  '}{s}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('multiple_states')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. GET POST PUT DELETE ───────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 10" title="GET, POST, PUT, DELETE">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
              {[
                { method: 'GET', icon: <Download size={18}/>, desc: 'Read / fetch data', when: 'Load page, search', color: '#10b981', bg: '#f0fdf4' },
                { method: 'POST', icon: <Plus size={18}/>, desc: 'Create new resource', when: 'Register, submit form', color: '#6366f1', bg: '#eff6ff' },
                { method: 'PUT', icon: <Edit size={18}/>, desc: 'Update full resource', when: 'Edit profile, update', color: '#f59e0b', bg: '#fffbeb' },
                { method: 'DELETE', icon: <Trash2 size={18}/>, desc: 'Remove a resource', when: 'Delete item, remove', color: '#ef4444', bg: '#fef2f2' },
              ].map((m, i) => (
                <div key={i} style={{ background: m.bg, border: `2px solid ${m.color}33`, borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ color: m.color, fontFamily: 'monospace', fontWeight: 900, fontSize: '1rem', marginBottom: 6 }}>{m.method}</div>
                  <span style={{ color: m.color, display: 'block', marginBottom: 4 }}>{m.icon}</span>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: 2 }}>{m.desc}</div>
                  <div style={{ fontSize: '0.74rem', color: '#6b7280' }}>{m.when}</div>
                </div>
              ))}
            </div>

            <CodeBlock title="All four methods with fetch() + useEffect" code={`const BASE = "https://api.school.com/students";

// GET — fetch all students on mount
useEffect(() => {
  fetch(BASE).then(r => r.json()).then(setStudents);
}, []);

// POST — add new student
const addStudent = async (student) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  const created = await res.json();
  setStudents(prev => [...prev, created]); // immutable add
};

// PUT — update a student by ID
const updateStudent = async (id, updated) => {
  await fetch(BASE + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  setStudents(prev => prev.map(s => s.id === id ? updated : s));
};

// DELETE — remove student by ID
const deleteStudent = async (id) => {
  await fetch(BASE + "/" + id, { method: "DELETE" });
  setStudents(prev => prev.filter(s => s.id !== id));
};`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🔴 Live HTTP Methods Simulator</h4>

            {/* Add form */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem', marginBottom: '1rem' }}>
              <h5 style={{ margin: '0 0 0.75rem', color: '#374151', fontWeight: 700 }}>POST — Add New Student</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.5rem' }}>
                <input className="form-control" placeholder="Name" value={newStudent.name} onChange={e => setNewStudent(p => ({ ...p, name: e.target.value }))} style={{ fontSize: '0.88rem' }} />
                <input className="form-control" placeholder="Email" value={newStudent.email} onChange={e => setNewStudent(p => ({ ...p, email: e.target.value }))} style={{ fontSize: '0.88rem' }} />
                <input className="form-control" type="number" placeholder="Score" min={0} max={100} value={newStudent.score} onChange={e => setNewStudent(p => ({ ...p, score: e.target.value }))} style={{ fontSize: '0.88rem' }} />
                <button onClick={doPost} disabled={methodLoading} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, padding: '0 14px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                  <Plus size={14} style={{ verticalAlign: 'middle' }} /> POST
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    {['Name', 'Email', 'Score', 'Grade', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#374151', borderBottom: '1px solid #cbd5e1' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {methodStudents.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '9px 12px', fontWeight: 600 }}>{s.name}</td>
                      <td style={{ padding: '9px 12px', color: '#64748b' }}>{s.email}</td>
                      <td style={{ padding: '9px 12px' }}>
                        <span style={{ background: s.score >= 80 ? '#dcfce7' : s.score >= 60 ? '#fef3c7' : '#fee2e2', color: s.score >= 80 ? '#166534' : s.score >= 60 ? '#92400e' : '#991b1b', padding: '2px 8px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 600 }}>{s.score}</span>
                      </td>
                      <td style={{ padding: '9px 12px', fontWeight: 700, color: s.grade === 'A' ? '#10b981' : s.grade === 'B' ? '#f59e0b' : '#ef4444' }}>{s.grade}</td>
                      <td style={{ padding: '9px 12px' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button onClick={() => doPut(s)} disabled={methodLoading}
                            style={{ background: '#fef3c7', border: '1px solid #f59e0b', color: '#92400e', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                            PUT +5
                          </button>
                          <button onClick={() => doDelete(s.id)} disabled={methodLoading}
                            style={{ background: '#fee2e2', border: '1px solid #ef4444', color: '#991b1b', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Request log */}
            <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem' }}>
              <span style={{ color: '#8892b0', fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: 6 }}>Request Log:</span>
              {methodLog.length === 0 ? (
                <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '0.78rem', fontStyle: 'italic' }}>Click GET / POST / PUT / DELETE to see requests…</span>
              ) : methodLog.map((l, i) => (
                <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.8rem', padding: '3px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ background: methodColor[l.method], color: 'white', padding: '1px 6px', borderRadius: 4, fontSize: '0.72rem', fontWeight: 800 }}>{l.method}</span>
                  <span style={{ color: l.status === 'success' ? '#86efac' : '#fbbf24' }}>{l.action}</span>
                </div>
              ))}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. LOADING + ERROR HANDLING ─────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Module 04 • Day 10" title="Loading Spinner & Error Handling">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Every API call can have three outcomes: <strong>loading</strong>, <strong>success</strong>, or <strong>error</strong>. Handling all three is the mark of professional React code — users should always know what's happening.</p>

            <CodeBlock title="The standard 3-state pattern" code={`function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/students");
        if (!res.ok) throw new Error("Server error: " + res.status);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // always runs
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} />;
  if (students.length === 0) return <EmptyState />;
  return <StudentTable students={students} />;
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>⏳ Loading Spinner Styles</h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {['circle', 'dots', 'bar', 'skeleton'].map(t => (
                <button key={t} onClick={() => setSpinnerType(t)}
                  style={{ padding: '6px 16px', borderRadius: 8, border: '1.5px solid #6366f1', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                    background: spinnerType === t ? '#6366f1' : 'white', color: spinnerType === t ? 'white' : '#6366f1' }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 100, marginBottom: '1.5rem' }}>
              {spinnerType === 'circle' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, border: '4px solid #e2e8f0', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem' }}>Loading students…</span>
                </div>
              )}
              {spinnerType === 'dots' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: '#6366f1', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              )}
              {spinnerType === 'bar' && (
                <div style={{ width: '60%', height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg,#6366f1,#a5b4fc)', borderRadius: 3, animation: 'progress 1.5s ease-in-out infinite', width: '40%' }} />
                </div>
              )}
              {spinnerType === 'skeleton' && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[100, 80, 90].map((w, i) => (
                    <div key={i} style={{ height: 16, width: `${w}%`, background: 'linear-gradient(90deg,#f1f5f9,#e2e8f0,#f1f5f9)', borderRadius: 4, backgroundSize: '200% 100%', animation: 'shimmer 1.5s linear infinite' }} />
                  ))}
                </div>
              )}
            </div>

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>❌ Error State Patterns</h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {['network', 'notfound', 'server', 'timeout'].map(e => (
                <button key={e} onClick={() => setErrorDemo(e)} style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #ef4444', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', background: errorDemo === e ? '#ef4444' : 'white', color: errorDemo === e ? 'white' : '#ef4444' }}>
                  {e}
                </button>
              ))}
            </div>

            {errorDemo !== 'idle' && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '1.25rem', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <AlertCircle size={22} color="#dc2626" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong style={{ display: 'block', color: '#dc2626', marginBottom: 4 }}>
                    {errorDemo === 'network' && 'Network Error'}
                    {errorDemo === 'notfound' && '404 Not Found'}
                    {errorDemo === 'server' && '500 Internal Server Error'}
                    {errorDemo === 'timeout' && 'Request Timeout'}
                  </strong>
                  <span style={{ fontSize: '0.87rem', color: '#7f1d1d' }}>
                    {errorDemo === 'network' && 'Failed to fetch: No internet connection. Please check your network and try again.'}
                    {errorDemo === 'notfound' && 'The student with this ID does not exist. It may have been deleted.'}
                    {errorDemo === 'server' && 'The server encountered an unexpected condition. Please try again later.'}
                    {errorDemo === 'timeout' && 'The request took too long to complete. Check your connection speed.'}
                  </span>
                  <button onClick={() => setErrorDemo('idle')} style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', marginTop: 8, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                    <RefreshCw size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Retry
                  </button>
                </div>
              </div>
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-12px); } }
            @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
            @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          `}</style>
        </Section>
      )}

      {/* ── 5. PAGINATION ────────────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="s5" eyebrow="Module 05 • Day 10" title="Pagination Basics">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>When an API returns thousands of records, you <strong>cannot render them all at once</strong> — it'll crash the browser. Pagination splits data into pages, loading only a small subset at a time.</p>

            <CodeBlock title="Client-side pagination logic" code={`const PAGE_SIZE = 5;
const [page, setPage] = useState(1);
const [data, setData] = useState(allStudents);

// Calculate the current page's slice:
const totalPages = Math.ceil(data.length / PAGE_SIZE);
const pageData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

// In JSX:
pageData.map(student => <StudentRow key={student.id} {...student} />)

// Pagination controls:
<button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
  Previous
</button>
<span>Page {page} of {totalPages}</span>
<button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
  Next
</button>`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>📋 Live Pagination Demo</h4>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input className="form-control" placeholder="Search by name or course…" value={pageSearch}
                    onChange={e => setPageSearch(e.target.value)}
                    style={{ paddingLeft: 32, fontSize: '0.88rem' }} />
                </div>
                <span style={{ fontSize: '0.82rem', color: '#64748b', whiteSpace: 'nowrap' }}>{filtered.length} records · Page {page} of {Math.max(1, totalPages)}</span>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    {['#', 'Name', 'Course', 'Score', 'Grade'].map(h => (
                      <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 700, color: '#374151', borderBottom: '1px solid #cbd5e1' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageStudents.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No students found</td></tr>
                  ) : pageStudents.map((s, i) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '9px 12px', color: '#94a3b8', fontSize: '0.8rem' }}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                      <td style={{ padding: '9px 12px', fontWeight: 600 }}>{s.name}</td>
                      <td style={{ padding: '9px 12px' }}><span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: 4, fontSize: '0.78rem', fontWeight: 600 }}>{s.course}</span></td>
                      <td style={{ padding: '9px 12px' }}>{s.score}</td>
                      <td style={{ padding: '9px 12px', fontWeight: 700, color: s.grade === 'A' ? '#10b981' : s.grade === 'B' ? '#f59e0b' : '#ef4444' }}>{s.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                <button onClick={() => setPage(1)} disabled={page === 1}
                  style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 12px', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, fontSize: '0.82rem' }}>
                  «
                </button>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 14px', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem' }}>
                  <ChevronLeft size={14} /> Prev
                </button>
                {[...Array(Math.max(1, totalPages))].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: 'all 0.15s',
                      background: page === i + 1 ? '#6366f1' : 'white', color: page === i + 1 ? 'white' : '#374151', borderColor: page === i + 1 ? '#6366f1' : '#cbd5e1' }}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(Math.max(1, totalPages), p + 1))} disabled={page >= totalPages}
                  style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 14px', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem' }}>
                  Next <ChevronRight size={14} />
                </button>
                <button onClick={() => setPage(Math.max(1, totalPages))} disabled={page >= totalPages}
                  style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 12px', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1, fontSize: '0.82rem' }}>
                  »
                </button>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Capstone Task <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. CAPSTONE: STUDENT MANAGEMENT API UI ───────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="s6" eyebrow="Capstone Task • Day 10" title="Student Management API UI">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, color: 'white', margin: '0 0 0.4rem', fontSize: '1.2rem' }}>🎓 Student Management API UI</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                A fully functional CRUD interface with simulated REST API calls — GET, POST, PUT, DELETE with loading states, error handling, search, and pagination.
              </p>
            </div>

            {/* Toast message */}
            <AnimatePresence>
              {apiMsg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  style={{ background: apiMsg.type === 'error' ? '#fee2e2' : '#dcfce7', border: `1px solid ${apiMsg.type === 'error' ? '#fca5a5' : '#86efac'}`, borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: apiMsg.type === 'error' ? '#991b1b' : '#166534', fontWeight: 600 }}>
                  {apiMsg.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
                  {apiMsg.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls bar */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input className="form-control" placeholder="Search students…" value={apiSearch}
                  onChange={e => setApiSearch(e.target.value)} style={{ paddingLeft: 32, fontSize: '0.88rem' }} />
              </div>
              <button onClick={apiGet} disabled={apiLoading}
                style={{ background: '#f0fdf4', border: '1.5px solid #10b981', color: '#166534', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                {apiLoading ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={14} />} GET All
              </button>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{apiFiltered.length} records</span>
            </div>

            {/* Form */}
            <div style={{ background: '#f8fafc', border: `2px solid ${apiEditId ? '#f59e0b' : '#6366f1'}22`, borderRadius: 14, padding: '1.25rem', marginBottom: '1.25rem' }}>
              <h5 style={{ margin: '0 0 0.75rem', color: apiEditId ? '#92400e' : '#4338ca', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                {apiEditId ? <><Edit size={16} /> Edit Student (PUT)</> : <><Plus size={16} /> Add Student (POST)</>}
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <input className="form-control" placeholder="Full Name *" value={apiForm.name} onChange={e => setApiForm(p => ({ ...p, name: e.target.value }))} style={{ fontSize: '0.87rem' }} />
                <input className="form-control" placeholder="Email *" value={apiForm.email} onChange={e => setApiForm(p => ({ ...p, email: e.target.value }))} style={{ fontSize: '0.87rem' }} />
                <select className="form-control" value={apiForm.course} onChange={e => setApiForm(p => ({ ...p, course: e.target.value }))} style={{ fontSize: '0.87rem' }}>
                  {['React', 'JavaScript', 'Python', 'SQL'].map(c => <option key={c}>{c}</option>)}
                </select>
                <input className="form-control" type="number" min={0} max={100} placeholder="Score" value={apiForm.score} onChange={e => setApiForm(p => ({ ...p, score: e.target.value }))} style={{ fontSize: '0.87rem' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={apiEditId ? apiPut : apiPost} disabled={apiLoading}
                  style={{ background: apiEditId ? '#f59e0b' : '#6366f1', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {apiLoading ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : (apiEditId ? <Check size={14} /> : <Plus size={14} />)}
                  {apiEditId ? 'Update Student' : 'Add Student'}
                </button>
                {apiEditId && (
                  <button onClick={() => { setApiEditId(null); setApiForm({ name: '', email: '', course: 'React', score: 80 }); }}
                    style={{ background: 'white', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <X size={14} /> Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 14, marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['#', 'Name', 'Email', 'Course', 'Score', 'Grade', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '11px 12px', textAlign: 'left', fontWeight: 700, color: '#374151', borderBottom: '2px solid #e2e8f0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {apiLoading ? (
                    <tr><td colSpan={7} style={{ padding: '2.5rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Loading…</span>
                      </div>
                    </td></tr>
                  ) : apiPageData.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No students found</td></tr>
                  ) : apiPageData.map((s, i) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9', background: apiEditId === s.id ? '#fffbeb' : 'white', transition: 'background 0.15s' }}>
                      <td style={{ padding: '10px 12px', color: '#94a3b8', fontSize: '0.8rem' }}>{(apiPage - 1) * API_PAGE_SIZE + i + 1}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a' }}>{s.name}</td>
                      <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '0.82rem' }}>{s.email}</td>
                      <td style={{ padding: '10px 12px' }}><span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: 4, fontSize: '0.78rem', fontWeight: 600 }}>{s.course}</span></td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{s.score}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: s.grade === 'A' ? '#10b981' : s.grade === 'B' ? '#f59e0b' : '#ef4444' }}>{s.grade}</span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button onClick={() => startEdit(s)} title="Edit"
                            style={{ background: '#fef3c7', border: '1px solid #f59e0b', color: '#92400e', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Edit size={12} /> PUT
                          </button>
                          <button onClick={() => setDeleteConfirm(s.id)} title="Delete"
                            style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Trash2 size={12} /> DEL
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Confirm delete modal */}
            <AnimatePresence>
              {deleteConfirm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                    style={{ background: 'white', borderRadius: 16, padding: '2rem', maxWidth: 380, width: '90%', textAlign: 'center' }}>
                    <Trash2 size={40} color="#dc2626" style={{ marginBottom: 12 }} />
                    <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>Confirm Delete</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
                      DELETE /api/students/{deleteConfirm} — This action cannot be undone.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                      <button onClick={() => setDeleteConfirm(null)} style={{ background: 'white', border: '1px solid #cbd5e1', color: '#374151', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                      <button onClick={() => apiDelete(deleteConfirm)} style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 700 }}>
                        <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Delete
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem' }}>
              <button onClick={() => setApiPage(p => Math.max(1, p - 1))} disabled={apiPage === 1}
                style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '7px 14px', cursor: apiPage === 1 ? 'not-allowed' : 'pointer', opacity: apiPage === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}>
                <ChevronLeft size={14} /> Prev
              </button>
              {[...Array(Math.max(1, apiTotalPages))].map((_, i) => (
                <button key={i} onClick={() => setApiPage(i + 1)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700,
                    background: apiPage === i + 1 ? '#6366f1' : 'white', color: apiPage === i + 1 ? 'white' : '#374151', borderColor: apiPage === i + 1 ? '#6366f1' : '#cbd5e1' }}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setApiPage(p => Math.min(Math.max(1, apiTotalPages), p + 1))} disabled={apiPage >= apiTotalPages}
                style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '7px 14px', cursor: apiPage >= apiTotalPages ? 'not-allowed' : 'pointer', opacity: apiPage >= apiTotalPages ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}>
                Next <ChevronRight size={14} />
              </button>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Take the Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 10 Quiz — API Integration">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {questions.map((item, qi) => (
                <div key={item.k} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const selected = qAns[item.k] === oi;
                      const correct = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1';
                      if (qDone) { if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; } else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; } }
                      else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0ea5e9'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}><strong>Explanation:</strong> {item.exp}</div>}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)} disabled={Object.keys(qAns).length < questions.length} style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: 150 }}>Submit Answers</button>
                ) : (
                  <>
                    <button className="btn btn-outline" onClick={() => { setQAns({}); setQDone(false); }} style={{ minWidth: 150 }}>Retry Quiz</button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: score === questions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {score} / {questions.length} ({Math.round(score / questions.length * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENT ───────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Homework" title="Day 10 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 Day 10 Complete!</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                You've covered REST API fundamentals, JSON, fetch vs axios, all four HTTP methods with React state management, loading/error states, and pagination. Now extend these skills in the assignments below.
              </p>
            </div>
            {[
              { num: 1, icon: '🌐', title: 'JSONPlaceholder GET Posts', desc: 'Use fetch() inside useEffect to load posts from https://jsonplaceholder.typicode.com/posts?_limit=10. Display them in a styled list with loading spinner and error handling.', hint: 'useState([]) for data, useState(true) for loading, useState(null) for error. Use try/catch/finally.' },
              { num: 2, icon: '📝', title: 'POST a New Post (Form)', desc: 'Create a form with title and body inputs. On submit, send a POST request to https://jsonplaceholder.typicode.com/posts with the form data as JSON body. Show the created post ID in a success toast.', hint: 'method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData)' },
              { num: 3, icon: '📄', title: 'Paginated User List with Search', desc: 'Fetch all users from https://jsonplaceholder.typicode.com/users. Implement client-side search (by name) and pagination showing 3 users per page with Previous/Next controls.', hint: 'const filtered = users.filter(u => u.name.includes(search)); Then slice for current page.' },
            ].map(task => (
              <div key={task.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', color: 'white', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{task.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>Task {task.num}: {task.title}</h4>
                    <p style={{ fontSize: '0.92rem', color: '#475569', margin: '0 0 0.75rem' }}>{task.desc}</p>
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 12px', fontSize: '0.83rem', color: '#1d4ed8' }}>
                      💡 Hint: {task.hint}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
              <BookOpenCheck size={36} color="#0ea5e9" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Push to your Course Repository</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>All three tasks should be in separate component files. Submit the GitHub link to your instructor.</p>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
