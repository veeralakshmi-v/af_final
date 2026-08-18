import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, CheckCircle, Code, ArrowRight,
  Copy, FileText, Plus, AlertTriangle, BookOpenCheck, Zap,
  GitBranch, RefreshCw, Folder, FolderOpen, File, Trash2,
  Search, Star, ShoppingCart, User, PlusCircle, Layout,
  Smartphone, BarChart2, CheckSquare, Trash, Mail,
  ExternalLink, RefreshCw as RefreshIcon
} from 'lucide-react';

import StudentSystem from './mini-projects/StudentSystem';
import PortfolioBuilder from './mini-projects/PortfolioBuilder';
import ProductStore from './mini-projects/ProductStore';
import DashboardApp from './mini-projects/DashboardApp';

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
    h = h.replace(/(\/\/[^\n]*)/g, '<span style="color:#8892b0">$1</span>');
    h = h.replace(/(["'`])([\s\S]*?)\1/g, '<span style="color:#a5d6ff">$1$2$1</span>');
    ['const','let','var','return','import','export','default','function','from','if','else','async','await','try','catch','throw','new','true','false','null','undefined'].forEach(k => {
      h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#ff7b72;font-weight:bold">$1</span>');
    });
    return <span dangerouslySetInnerHTML={{ __html: h }} />;
  };
  return (
    <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', margin: '1rem 0', overflowX: 'auto' }}>
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

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay14({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('react_module14', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Section 1: Folder Tree state ── */
  const [openFolders, setOpenFolders] = useState({ src: true, components: false, hooks: false });
  const toggleFolder = (f) => setOpenFolders(p => ({ ...p, [f]: !p[f] }));

  /* ── Section 2: Selected Project ── */
  const [activeProj, setActiveProj] = useState('student');
  const [projTab, setProjTab] = useState('preview'); // preview | code

  /* ── Student Management System state ── */
  const [smsStudents, setSmsStudents] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@school.com', course: 'React Developer', grade: 'A' },
    { id: 2, name: 'Bob Smith', email: 'bob@school.com', course: 'Fullstack JS', grade: 'B' },
    { id: 3, name: 'Carol White', email: 'carol@school.com', course: 'SQL Databases', grade: 'A' }
  ]);
  const [smsForm, setSmsForm] = useState({ name: '', email: '', course: 'React Developer', grade: 'A' });
  const handleAddSms = () => {
    if (!smsForm.name || !smsForm.email) return;
    setSmsStudents(p => [...p, { id: Date.now(), ...smsForm }]);
    setSmsForm({ name: '', email: '', course: 'React Developer', grade: 'A' });
  };

  /* ── Portfolio Builder state ── */
  const [portForm, setPortForm] = useState({
    name: 'Jane Doe',
    title: 'Frontend Engineer',
    bio: 'Passionate about building responsive, high-performance user interfaces.',
    skills: 'React, JavaScript, CSS, HTML, Git',
    email: 'jane@developer.com',
    github: 'https://github.com'
  });

  /* ── Product Store state ── */
  const productsMock = [
    { id: 1, name: 'Wireless Headset', price: 2999, category: 'Audio', rating: 4.5 },
    { id: 2, name: 'Mechanical Keyboard', price: 4500, category: 'Peripherals', rating: 4.8 },
    { id: 3, name: 'Ergonomic Mouse', price: 1800, category: 'Peripherals', rating: 4.2 },
    { id: 4, name: 'Smart Fitness Band', price: 3500, category: 'Wearables', rating: 4.0 }
  ];
  const [cart, setCart] = useState([]);
  const handleAddToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) {
        return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  /* ── Dashboard App state ── */
  const [dashTasks, setDashTasks] = useState([
    { id: 1, label: 'Submit API Integrations homework', done: true },
    { id: 2, label: 'Configure protected routing gates', done: false },
    { id: 3, label: 'Optimize factorials rendering tables', done: false }
  ]);
  const toggleDashTask = (id) => {
    setDashTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  /* ── Source Codes catalog ── */
  const sourceCodes = {
    student: `// Student Management System Component
import React, { useState } from 'react';

export default function StudentSystem() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@school.com', course: 'React', grade: 'A' }
  ]);
  const [form, setForm] = useState({ name: '', email: '', course: 'React', grade: 'A' });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    setStudents(prev => [...prev, { id: Date.now(), ...form }]);
    setForm({ name: '', email: '', course: 'React', grade: 'A' });
  };

  return (
    <div>
      <h3>Students Registry</h3>
      <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <button onClick={handleAdd}>Add Student</button>
      
      <ul>
        {students.map(s => (
          <li key={s.id}>{s.name} ({s.course}) - Grade: {s.grade}</li>
        ))}
      </ul>
    </div>
  );
}`,
    portfolio: `// Portfolio Builder Component
import React, { useState } from 'react';

export default function PortfolioBuilder() {
  const [profile, setProfile] = useState({
    name: 'Jane Doe', title: 'Developer', bio: 'I write code.'
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <form>
        <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
        <input value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} />
      </form>
      <div className="preview">
        <h2>{profile.name}</h2>
        <h3>{profile.title}</h3>
      </div>
    </div>
  );
}`,
    store: `// Product Store Component
import React, { useState } from 'react';

export default function ProductStore() {
  const products = [{ id: 1, name: 'Mouse', price: 99 }];
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div>
      <h3>Catalog</h3>
      {products.map(p => (
        <button key={p.id} onClick={() => addToCart(p)}>Buy {p.name}</button>
      ))}
      <h3>Cart ({cart.length} items)</h3>
    </div>
  );
}`,
    dashboard: `// Dashboard Analytics Component
import React, { useState } from 'react';

export default function DashboardApp() {
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Homework Task', done: false }
  ]);

  return (
    <div>
      <h4>Task Dashboard</h4>
      {tasks.map(t => (
        <label key={t.id}>
          <input type="checkbox" checked={t.done} onChange={() => {}} />
          {t.label}
        </label>
      ))}
    </div>
  );
}`
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'What is the recommended React project folder for helper utilities (e.g. date formatters)?',
      opts: ['/assets', '/components', '/utils', '/services'], ans: 2,
      exp: 'The /utils or /helpers directory stores stateless, reusable utility functions used across different modules.' },
    { k: 'q2', q: 'Why should you group components inside subdirectory folders (e.g., components/Button)?',
      opts: [
        'Because React throws errors if components are in the root folder',
        'To co-locate the component logic, styles, and unit tests in one organized module place',
        'It makes the code bundle compile faster automatically',
        'To prevent browser caches overrides'
      ], ans: 1,
      exp: 'Folder-by-feature or component structuring co-locates JS files, styling stylesheets, and tests together for modular maintainability.' },
    { k: 'q3', q: 'Where should global API request configurations (like Axios instances) live?',
      opts: ['In /services or /api folder', 'In the /assets folder', 'In the root App.jsx only', 'Inside components state arrays'],
      ans: 0, exp: 'Grouping Axios headers configs, endpoints routes, and request clients inside /services keeps components free from API transport layer logic.' },
    { k: 'q4', q: 'What is the purpose of the /hooks directory in a standard architecture?',
      opts: [
        'To hold image files and fonts',
        'To co-locate custom reusable hooks like useFetch or useLocalStorage',
        'To override browser default HTML nodes',
        'To store system environment config variables'
      ], ans: 1,
      exp: 'The /hooks folder consolidates custom, stateful hook modules so they can be imported and shared by any page component.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. PROJECT ARCHITECTURE ─────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 14" title="React Project Architecture">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>📂 Feature-based File Architecture</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                As your React application scales, organizing files logically is critical to codebase maintainability. Standard production configurations structure folders by feature modules or technical layers (components, hooks, pages, services).
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Interactive Folder Explorer</h3>
            <p>Click the directories below to explore a standard enterprise folder layout:</p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.88rem' }}>
              
              {/* Root src */}
              <div onClick={() => toggleFolder('src')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#0f172a', fontWeight: 'bold' }}>
                {openFolders.src ? <FolderOpen size={16} color="#eab308" /> : <Folder size={16} color="#eab308" />}
                <span>/src</span>
              </div>

              {openFolders.src && (
                <div style={{ paddingLeft: '1.5rem', borderLeft: '1px dashed #cbd5e1', marginLeft: 8, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  
                  {/* assets */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569' }}>
                    <Folder size={16} color="#eab308" />
                    <span>/assets <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>— Images, fonts, styles</span></span>
                  </div>

                  {/* components */}
                  <div onClick={() => toggleFolder('components')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#0f172a' }}>
                    {openFolders.components ? <FolderOpen size={16} color="#eab308" /> : <Folder size={16} color="#eab308" />}
                    <span>/components <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>— Reusable global UI (Button, Card)</span></span>
                  </div>

                  {openFolders.components && (
                    <div style={{ paddingLeft: '1.5rem', borderLeft: '1px dashed #cbd5e1', marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b' }}>
                        <File size={14} color="#64748b" />
                        <span>Button.jsx</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b' }}>
                        <File size={14} color="#64748b" />
                        <span>Card.jsx</span>
                      </div>
                    </div>
                  )}

                  {/* hooks */}
                  <div onClick={() => toggleFolder('hooks')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#0f172a' }}>
                    {openFolders.hooks ? <FolderOpen size={16} color="#eab308" /> : <Folder size={16} color="#eab308" />}
                    <span>/hooks <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>— Custom hooks (useFetch, useAuth)</span></span>
                  </div>

                  {openFolders.hooks && (
                    <div style={{ paddingLeft: '1.5rem', borderLeft: '1px dashed #cbd5e1', marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b' }}>
                        <File size={14} color="#64748b" />
                        <span>useFetch.js</span>
                      </div>
                    </div>
                  )}

                  {/* pages */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569' }}>
                    <Folder size={16} color="#eab308" />
                    <span>/pages <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>— Page-level router targets (Home, Dashboard)</span></span>
                  </div>

                  {/* services */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569' }}>
                    <Folder size={16} color="#eab308" />
                    <span>/services <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>— API configurations & transport modules</span></span>
                  </div>

                  {/* App.jsx */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569' }}>
                    <File size={14} color="#64748b" />
                    <span>App.jsx</span>
                  </div>

                </div>
              )}

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. MINI PROJECTS VIEWPORT ───────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 14" title="Interactive Mini Projects">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p style={{ marginBottom: '1.5rem' }}>Select a mini project to interact with its live preview dashboard and read its clean React source code:</p>

            {/* Select tabs bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'student', label: '🎓 Student Registry' },
                { id: 'portfolio', label: '💼 Portfolio Builder' },
                { id: 'store', label: '🛒 Product Store' },
                { id: 'dashboard', label: '📊 Metric Dashboard' }
              ].map(proj => (
                <button key={proj.id} onClick={() => { setActiveProj(proj.id); setProjTab('preview'); }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    border: '1.5px solid #6366f1',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    background: activeProj === proj.id ? '#6366f1' : 'white',
                    color: activeProj === proj.id ? 'white' : '#6366f1'
                  }}>
                  {proj.label}
                </button>
              ))}
            </div>

            {/* Preview/Code toggle */}
            <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #cbd5e1', paddingBottom: 6, marginBottom: '1rem' }}>
              <button onClick={() => setProjTab('preview')}
                style={{ background: 'transparent', border: 'none', borderBottom: projTab === 'preview' ? '2.5px solid #6366f1' : 'none', color: projTab === 'preview' ? '#6366f1' : '#64748b', fontWeight: 700, cursor: 'pointer', padding: '4px 10px', fontSize: '0.85rem' }}>
                Live Preview
              </button>
              <button onClick={() => setProjTab('code')}
                style={{ background: 'transparent', border: 'none', borderBottom: projTab === 'code' ? '2.5px solid #6366f1' : 'none', color: projTab === 'code' ? '#6366f1' : '#64748b', fontWeight: 700, cursor: 'pointer', padding: '4px 10px', fontSize: '0.85rem' }}>
                Inspect Source Code
              </button>
            </div>

            {/* Display container */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', minHeight: 280 }}>
              {projTab === 'code' ? (
                <CodeBlock title={`${activeProj}System.jsx`} code={sourceCodes[activeProj]} />
              ) : (
                <div>
                  
                  {/* Live Student Registry */}
                  {activeProj === 'student' && <StudentSystem />}

                  {/* Live Portfolio Builder */}
                  {activeProj === 'portfolio' && <PortfolioBuilder />}

                  {/* Live Product Store */}
                  {activeProj === 'store' && <ProductStore />}

                  {/* Live Dashboard App */}
                  {activeProj === 'dashboard' && <DashboardApp />}

                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 14 Quiz — Project Architecture">
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
                      if (qDone) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0ea5e9'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: 150 }}>
                    Submit Answers
                  </button>
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
        <Section key="asgn" eyebrow="Homework" title="Day 14 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 Day 14 Complete!</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                You've completed Project Architecture structures and inspected implementation scopes for the four mini projects.
              </p>
            </div>

            {[
              { num: 1, icon: '🎓', title: 'Student registry search and pagination', desc: 'Add search capabilities and student list filters pagination to the Student Management System. Track active item lists inside local states.', hint: 'Use slice() combined with page size counters.' },
              { num: 2, icon: '💼', title: 'Multiple profiles creator', desc: 'Expand the Portfolio Builder to support loading multiple student bio configurations. Render select sliders to toggle between bio summaries.', hint: 'Save profiles to an array of objects state.' },
              { num: 3, icon: '🛒', title: 'Product category filter', desc: 'Add price filters and category filter selects to the Product Store marketplace UI to sort catalogs.', hint: 'Chain filter() and sort() on mock product arrays.' },
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
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Complete Assignments</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save all updates. Run and push codes to your personal repo to complete this module.</p>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
