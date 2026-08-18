import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Layers, Database, CheckCircle, Code, ArrowRight,
  Copy, FileText, Plus, AlertTriangle, BookOpenCheck, Zap,
  GitBranch, RefreshCw, Home, Compass, User, Lock, Unlock,
  ShieldAlert, Terminal, Eye, Link2, LogIn, LogOut, Search,
  ChevronRight, ArrowLeft, RefreshCw as RefreshIcon
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
    h = h.replace(/(\/\/[^\n]*)/g, '<span style="color:#8892b0">$1</span>');
    h = h.replace(/(["'`])([\s\S]*?)\1/g, '<span style="color:#a5d6ff">$1$2$1</span>');
    ['const','let','var','return','import','export','default','function','from','if','else','async','await','try','catch','throw','new','true','false','null','undefined'].forEach(k => {
      h = h.replace(new RegExp(`\\b(${k})\\b`, 'g'), '<span style="color:#ff7b72;font-weight:bold">$1</span>');
    });
    ['BrowserRouter','Routes','Route','Link','NavLink','useParams','useNavigate','Navigate','Outlet'].forEach(k => {
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

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay11({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('react_module11', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Section 2: Link vs NavLink ── */
  const [activeLinkTab, setActiveLinkTab] = useState('home');

  /* ── Section 3: useParams ── */
  const [selectedStudentId, setSelectedStudentId] = useState('101');
  const studentsMock = {
    '101': { name: 'Alice Johnson', course: 'React Developer', enrolled: '2026-01-10' },
    '102': { name: 'Bob Smith', course: 'Fullstack JavaScript', enrolled: '2026-02-15' },
    '103': { name: 'Carol White', course: 'SQL Databases', enrolled: '2026-03-01' }
  };

  /* ── Section 4: useNavigate ── */
  const [navHistory, setNavHistory] = useState(['/home']);
  const [navStatus, setNavStatus] = useState('idle');

  const handleNavSimulation = async (path) => {
    setNavStatus('redirecting');
    await new Promise(r => setTimeout(r, 600));
    setNavHistory(p => [...p, path].slice(-5));
    setNavStatus('idle');
  };

  /* ── Section 5: Protected Routes ── */
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [protectedLogs, setProtectedLogs] = useState([]);

  const attemptAccessPrivate = () => {
    if (isUserLoggedIn) {
      setProtectedLogs(p => [...p, '🔓 GET /dashboard → 200 OK (Access Granted)'].slice(-4));
    } else {
      setProtectedLogs(p => [...p, '❌ GET /dashboard → 403 Forbidden! Redirecting to /login...'].slice(-4));
    }
  };

  /* ── Capstone Task: Multi-page Website Simulator ── */
  const [simUrl, setSimUrl] = useState('/');
  const [simAuth, setSimAuth] = useState(false);
  const [simSearch, setSimSearch] = useState('');

  const simGo = (path) => {
    setSimUrl(path);
  };

  // Simulated Route Resolver
  const renderSimRoute = () => {
    const isDetailRoute = simUrl.startsWith('/courses/');
    if (isDetailRoute) {
      const courseId = simUrl.replace('/courses/', '');
      const courses = {
        'react': { title: 'React JS & Frontend Architectures', dur: '8 Weeks', diff: 'Intermediate' },
        'node': { title: 'Node.js Backend Microservices', dur: '6 Weeks', diff: 'Advanced' },
        'sql': { title: 'PostgreSQL Database Engineering', dur: '4 Weeks', diff: 'Beginner' }
      };
      const course = courses[courseId];
      if (!course) return render404();

      return (
        <div>
          <button onClick={() => simGo('/courses')} style={{ background: '#f1f5f9', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', marginBottom: 12 }}>
            <ArrowLeft size={12} /> Back to Courses
          </button>
          <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>useParams() ID: "{courseId}"</span>
          <h4 style={{ margin: '8px 0 4px', color: '#0f172a', fontWeight: 800 }}>{course.title}</h4>
          <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#475569' }}>Duration: {course.dur} · Difficulty: {course.diff}</p>
          <div style={{ background: '#f8fafc', padding: 8, borderRadius: 6, fontSize: '0.78rem', fontFamily: 'monospace' }}>
            {"const { id } = useParams(); // resolved to: " + courseId}
          </div>
        </div>
      );
    }

    if (simUrl === '/dashboard') {
      if (!simAuth) {
        // Guarded Redirect Simulation
        return (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <Lock size={32} color="#ef4444" style={{ marginBottom: 8 }} />
            <h5 style={{ margin: '0 0 4px', color: '#991b1b', fontWeight: 700 }}>Access Denied (Guarded Route)</h5>
            <p style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#7f1d1d' }}>You must sign in to view the student dashboard.</p>
            <button onClick={() => { setSimAuth(true); simGo('/dashboard'); }} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
              Sign In and Retry
            </button>
          </div>
        );
      }
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h4 style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>🔓 Student Private Portal</h4>
            <button onClick={() => { setSimAuth(false); simGo('/'); }} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <LogOut size={12} /> Sign Out
            </button>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#475569' }}>Welcome back! You have successfully passed the Protected Route gatekeeper check.</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 8, background: '#f8fafc', fontSize: '0.78rem' }}>
            <strong>Enrollments:</strong> React Module 11 (Completed), API Integration Project (Submitted)
          </div>
        </div>
      );
    }

    switch (simUrl) {
      case '/':
        return (
          <div>
            <h4 style={{ margin: '0 0 6px', fontWeight: 800, color: '#0f172a' }}>UniRoute Academics</h4>
            <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#475569' }}>This is the home page of a single page application using client-side routing. Switch tabs to see instant page updates with zero page refreshes.</p>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: 8, fontSize: '0.78rem', color: '#1d4ed8' }}>
              💡 React Router replaces standard anchor elements with Link/NavLink tags to intercept clicks and swap components inside the DOM.
            </div>
          </div>
        );
      case '/courses':
        return (
          <div>
            <h4 style={{ margin: '0 0 8px', fontWeight: 800, color: '#0f172a' }}>Available Courses</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { id: 'react', title: 'React JS Development' },
                { id: 'node', title: 'Node.js Backend Development' },
                { id: 'sql', title: 'Database Design' }
              ].map(c => (
                <div key={c.id} onClick={() => simGo(`/courses/${c.id}`)}
                  style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.title}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: 2 }}>View Details <ChevronRight size={12} /></span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return render404();
    }
  };

  const render404 = () => (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <AlertTriangle size={32} color="#f59e0b" style={{ marginBottom: 8 }} />
      <h5 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>404 Page Not Found</h5>
      <p style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#64748b' }}>We could not find a Route configured to match "{simUrl}".</p>
      <button onClick={() => simGo('/')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, padding: '5px 12px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
        Return Home
      </button>
    </div>
  );

  /* ── Quiz ── */
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const quizQuestions = [
    {
      k: 'q1', q: 'Why is client-side routing preferred in Single Page Applications (SPAs)?',
      opts: [
        'It makes queries run faster in database tables',
        'It allows swapping contents on the page without full document refreshes, resulting in smooth transitions',
        'It checks authorization credentials on servers',
        'It creates CSS modules dynamically'
      ], ans: 1, exp: 'SPAs load a single HTML document. Client-side routing intercepts URL changes to swap components instantly inside the DOM without page refreshes.'
    },
    {
      k: 'q2', q: 'How does NavLink differ from a standard Link component?',
      opts: [
        'NavLink loads pages from the backend server directly',
        'NavLink applies active styles or classes automatically when its route matches the current URL',
        'NavLink cannot accept parameterized properties',
        'NavLink is faster than a standard Link tag'
      ], ans: 1, exp: 'NavLink is a special version of Link that automatically adds an "active" class or passes isActive to styles/classes when the route matches.'
    },
    {
      k: 'q3', q: 'What React hook is used to extract dynamic parameters like ":id" from the URL?',
      opts: ['useSearchParams', 'useNavigate', 'useParams', 'useRouteMatch'], ans: 2,
      exp: 'useParams() returns an object of key/value pairs of URL parameters defined in the Route (e.g. /courses/:id resolves { id: "value" }).'
    },
    {
      k: 'q4', q: 'What is the purpose of useNavigate() hook?',
      opts: [
        'To verify password encryption hashes',
        'To update CSS variables on class changes',
        'To redirect users programmatically (e.g. after form submissions or successful sign-in checks)',
        'To listen for viewport resize triggers'
      ], ans: 2, exp: 'useNavigate() returns a navigate function that you can call in callbacks (e.g., navigate("/dashboard")) to change URLs programmatically.'
    }
  ];
  const quizScore = quizQuestions.filter(q => quizAnswers[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. WHY ROUTING? + ENVIRONMENT SETUP ─────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 11" title="React Router Overview">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🧭 Why Routing in React?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                In traditional websites, navigating to a new page sends a request to the server, resulting in a white-flash <strong>full page refresh</strong>. In React, we build Single Page Applications (SPAs). React Router intercepts clicks, changes the URL in the browser bar, and swaps components instantly in the DOM with <strong>zero page reloads</strong>.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Core Routing Components</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: 'BrowserRouter', desc: 'Wraps the entire app. Enables HTML5 history API tracking to sync URLs.', color: '#6366f1', bg: '#eff6ff' },
                { title: 'Routes', desc: 'Acts as a switcher. Examines all child Route tags and renders the first matching one.', color: '#10b981', bg: '#f0fdf4' },
                { title: 'Route', desc: 'Declares path-to-component mappings: <Route path="/about" element={<About />} />', color: '#f59e0b', bg: '#fffbeb' }
              ].map((c, i) => (
                <div key={i} style={{ background: c.bg, border: `1px solid ${c.color}33`, borderRadius: 12, padding: '1rem' }}>
                  <strong style={{ display: 'block', color: c.color, fontSize: '0.95rem', marginBottom: 4 }}>{c.title}</strong>
                  <span style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>{c.desc}</span>
                </div>
              ))}
            </div>

            <CodeBlock title="App.jsx — React Router V6 Setup" code={`import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      {/* Routes matches the current URL path to a single route child */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* 404 Fallback — matches anything not caught above */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. LINK vs NAVLINK ───────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 11" title="Link vs NavLink">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#92400e' }}>⚠️ Don't use normal anchor tags &lt;a href="..."&gt;!</strong>
              <p style={{ margin: '4px 0 0', color: '#78350f', fontSize: '0.9rem' }}>
                Anchor tags force the browser to request a new HTML file from the server, breaking state and re-loading the app. Always use React Router's <code>Link</code> or <code>NavLink</code>.
              </p>
            </div>

            <CodeBlock title="Link vs NavLink Usage" code={`import { Link, NavLink } from "react-router-dom";

// ── Standard Link (simple navigation) ─────────────
<Link to="/about">About Us</Link>

// ── NavLink (injects .active class on match) ──────
<NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
  Dashboard
</NavLink>

// NavLink inline style syntax:
<NavLink to="/courses" style={({ isActive }) => ({
  color: isActive ? "blue" : "gray"
})}>
  Courses
</NavLink>`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🔗 NavLink Active styling Simulator</h4>
            <p>Click the links below to simulate navigation. Notice how <code>NavLink</code> automatically applies a highlighted active state based on the current URL path.</p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: 16 }}>
              {/* Mock Navigation Bar */}
              <div style={{ display: 'flex', gap: '0.5rem', background: '#0f172a', padding: 8, borderRadius: 10, marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold', padding: '0 8px', fontFamily: 'monospace' }}>Mock Navbar:</span>
                {['home', 'courses', 'profile'].map(tab => {
                  const active = activeLinkTab === tab;
                  return (
                    <button key={tab} onClick={() => setActiveLinkTab(tab)}
                      style={{
                        background: active ? '#6366f1' : 'transparent',
                        border: 'none',
                        borderRadius: 6,
                        padding: '6px 14px',
                        color: active ? 'white' : '#94a3b8',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  );
                })}
              </div>

              {/* Code output simulator */}
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                <span style={{ color: '#8892b0' }}>{'// NavLink Output className evaluation:'}</span>
                <div style={{ color: '#a5d6ff', marginTop: 4 }}>
                  {`&lt;NavLink to="/home" className={isActive =&gt; "${activeLinkTab === 'home' ? 'active-highlight' : 'inactive-link'}"}&gt;Home&lt;/NavLink&gt;`}
                  <br />
                  {`&lt;NavLink to="/courses" className={isActive =&gt; "${activeLinkTab === 'courses' ? 'active-highlight' : 'inactive-link'}"}&gt;Courses&lt;/NavLink&gt;`}
                  <br />
                  {`&lt;NavLink to="/profile" className={isActive =&gt; "${activeLinkTab === 'profile' ? 'active-highlight' : 'inactive-link'}"}&gt;Profile&lt;/NavLink&gt;`}
                </div>
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

      {/* ── 3. useParams ────────────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 11" title="Dynamic Routing & useParams">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Dynamic routing lets you declare wildcard parameters in path URLs. React Router automatically parses the URL and provides the variables via the <code>useParams()</code> hook.</p>

            <CodeBlock title="Dynamic Routes configuration" code={`// Declaring parameters in Routes path:
<Route path="/students/:studentId" element={<StudentDetail />} />

// Inside StudentDetail component:
import { useParams } from "react-router-dom";

function StudentDetail() {
  const { studentId } = useParams(); // Extracts value from URL path

  useEffect(() => {
    // Fetch data using the dynamic parameter ID
    fetch(\`/api/students/\${studentId}\`)
      .then(res => res.json())
      .then(setStudentData);
  }, [studentId]);

  return <h3>Viewing Student Profile: {studentId}</h3>;
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>👁️ Params Decoders Visualizer</h4>
            <p>Select a student profile URL from the list to see how <code>useParams()</code> parses variables from path parameters dynamically:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1rem' }}>
                  {Object.keys(studentsMock).map(id => (
                    <button key={id} onClick={() => setSelectedStudentId(id)}
                      style={{
                        padding: '10px 14px',
                        border: '1px solid',
                        borderColor: selectedStudentId === id ? '#6366f1' : '#cbd5e1',
                        borderRadius: 8,
                        background: 'white',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#0f172a'
                      }}>
                      <span>URL: <code>/students/{id}</code></span>
                      <span style={{ fontSize: '0.75rem', color: '#6366f1' }}>{studentsMock[id].name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 6 }}>useParams() Evaluator:</span>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: '#86efac', marginBottom: 10 }}>
                  {"{ studentId: \"" + selectedStudentId + "\" }"}
                </div>
                <div style={{ color: 'white', fontSize: '0.82rem' }}>
                  <strong style={{ display: 'block', color: '#fbbf24', marginBottom: 4 }}>Simulated component render:</strong>
                  <span style={{ color: '#94a3b8' }}>Name:</span> {studentsMock[selectedStudentId].name}<br />
                  <span style={{ color: '#94a3b8' }}>Course:</span> {studentsMock[selectedStudentId].course}<br />
                  <span style={{ color: '#94a3b8' }}>Enrollment Date:</span> {studentsMock[selectedStudentId].enrolled}
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. useNavigate ─────────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Module 04 • Day 11" title="Programmatic Navigation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Sometimes you need to trigger navigation <strong>inside javascript functions</strong> rather than layout link clicks — e.g. redirecting users to dashboards after forms submit successfully or authenticating credentials checks.</p>

            <CodeBlock title="useNavigate usage" code={`import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await saveStudentData();

    // Programmatic redirect to courses catalog page:
    navigate("/courses");

    // To go back in navigation history stack:
    // navigate(-1);
  };

  return <form onSubmit={handleRegister}>...</form>;
}`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>⏱ Programmatic Redirect simulator</h4>
            <p>Click "Submit Form" to trigger a simulated async save action. Notice how JavaScript automatically updates the navigation location bar on completion:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem' }}>
              <div>
                <button className="btn btn-primary" onClick={() => handleNavSimulation('/courses')} disabled={navStatus === 'redirecting'}
                  style={{ background: '#10b981', borderColor: '#10b981', width: '100%', marginBottom: '1rem', position: 'relative' }}>
                  {navStatus === 'redirecting' ? 'Saving Student Data…' : 'Submit Registration (Form Submit)'}
                </button>
                <button className="btn btn-outline" onClick={() => handleNavSimulation('/dashboard')} disabled={navStatus === 'redirecting'}
                  style={{ width: '100%' }}>
                  Log In (Form Submit) → Navigate to /dashboard
                </button>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 6 }}>Browser Navigation History stack:</span>
                {navHistory.map((h, i) => (
                  <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: i === navHistory.length - 1 ? '#86efac' : '#475569', padding: '2px 0' }}>
                    {i === navHistory.length - 1 ? '▶ ' : '  '}{h}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. PROTECTED ROUTES ─────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="s5" eyebrow="Module 05 • Day 11" title="Protected Routes & 404 Pages">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <p>Protected Routes guard private dashboards from unauthorized visitors. If authentication credentials verify as false, it redirects visitors to logins page immediately.</p>

            <CodeBlock title="Protected Route configuration wrapper" code={`import { Navigate } from "react-router-dom";

// ── Protect Routes Component Wrapper ──────────────
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Redirect to login page instantly
    return <Navigate to="/login" replace />;
  }
  return children; // Authorized access granted
}

// ── In Route declarations switch ──────────────────
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>`} />

            <h4 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem' }}>🔒 Protected Route Gateway Simulator</h4>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-outline" onClick={() => setIsUserLoggedIn(v => !v)}
                    style={{ flex: 1, borderColor: isUserLoggedIn ? '#10b981' : '#ef4444', color: isUserLoggedIn ? '#10b981' : '#ef4444' }}>
                    {isUserLoggedIn ? '🔓 isLoggedIn = TRUE' : '🔒 isLoggedIn = FALSE'}
                  </button>
                  <button className="btn btn-primary" onClick={attemptAccessPrivate} style={{ flex: 1, background: '#6366f1', borderColor: '#6366f1' }}>
                    Access /dashboard
                  </button>
                </div>
                <div style={{ background: '#0f172a', borderRadius: 8, padding: '8px 12px', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  Route Guards evaluate dynamically before rendering children component paths.
                </div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 6 }}>API Gateway logs:</span>
                {protectedLogs.length === 0 ? (
                  <span style={{ color: '#475569', fontSize: '0.78rem', fontStyle: 'italic', fontFamily: 'monospace' }}>Trigger route checks…</span>
                ) : protectedLogs.map((l, i) => (
                  <div key={i} style={{ color: l.includes('Granted') ? '#86efac' : '#fca5a5', fontFamily: 'monospace', fontSize: '0.74rem', padding: '2px 0' }}>{l}</div>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. CAPSTONE TASK: MULTI-PAGE WEBSITE SIMULATOR ─────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="s6" eyebrow="Capstone Task • Day 11" title="Multi-page Website Simulator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, color: 'white', margin: '0 0 0.4rem', fontSize: '1.2rem' }}>🎓 Multi-page Website Simulator</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                A mini browser simulation demonstrating full single-page routing: navigation paths, dynamic parameters, protected guards, and custom 404 fallbacks.
              </p>
            </div>

            {/* Mock Browser Window Container */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              
              {/* Simulated Browser URL bar */}
              <div style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />)}
                </div>
                <div style={{ display: 'flex', flex: 1, background: 'white', border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 12px', fontSize: '0.8rem', color: '#64748b', alignItems: 'center', gap: 6, fontFamily: 'monospace' }}>
                  <Link2 size={13} color="#94a3b8" />
                  <span>localhost:3000{simUrl}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 600, color: simAuth ? '#166534' : '#991b1b', background: simAuth ? '#dcfce7' : '#fee2e2', padding: '2px 8px', borderRadius: 4 }}>
                    {simAuth ? 'Signed In' : 'Guest'}
                  </span>
                </div>
              </div>

              {/* Simulated Browser Webpage content */}
              <div style={{ background: 'white', minHeight: 220, display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                
                {/* Simulated Sidebar Link tags */}
                <div style={{ borderRight: '1px solid #cbd5e1', padding: '1rem', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Navigation Links</span>
                  {[
                    { path: '/', label: 'Home Page', icon: <Home size={14} /> },
                    { path: '/courses', label: 'All Courses', icon: <Compass size={14} /> },
                    { path: '/dashboard', label: 'Private Portal', icon: <User size={14} /> },
                    { path: '/not-exists', label: 'Broken Link (404)', icon: <AlertTriangle size={14} /> }
                  ].map(link => {
                    const active = simUrl === link.path || (link.path === '/courses' && simUrl.startsWith('/courses/'));
                    return (
                      <button key={link.path} onClick={() => simGo(link.path)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.15s',
                          background: active ? '#6366f1' : 'transparent', color: active ? 'white' : '#475569'
                        }}>
                        {link.icon} {link.label}
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Webpage Viewports */}
                <div style={{ padding: '1.25rem' }}>
                  {renderSimRoute()}
                </div>
              </div>

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
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 11 Quiz — React Router">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {quizQuestions.map((item, qi) => (
                <div key={item.k} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.8rem' }}>{qi + 1}. {item.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const selected = quizAnswers[item.k] === oi;
                      const correct = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1';
                      if (quizCompleted) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0ea5e9'; }
                      return (
                        <button key={oi} disabled={quizCompleted} onClick={() => setQuizAnswers(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: quizCompleted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizCompleted && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!quizCompleted ? (
                  <button className="btn btn-primary" onClick={() => setQuizCompleted(true)}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: 150 }}>
                    Submit Answers
                  </button>
                ) : (
                  <>
                    <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizCompleted(false); }} style={{ minWidth: 150 }}>Retry Quiz</button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: quizScore === quizQuestions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {quizScore} / {quizQuestions.length} ({Math.round(quizScore / quizQuestions.length * 100)}%)
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
        <Section key="asgn" eyebrow="Homework" title="Day 11 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>🎓 Day 11 Complete!</h3>
              <p style={{ color: 'white', opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                You've completed React Router navigation topics including: BrowserRouter config, dynamic useParams selectors, programmatic redirects, route protections, and custom 404 views. Complete the assignments below to build confidence.
              </p>
            </div>

            {[
              { num: 1, icon: '🏠', title: 'Create standard routes stack', desc: 'Create a mini-site setup in your project including: Home Page, About Page, Services catalog page, and a Fallback 404 page containing links to return to base paths.', hint: 'Use `<BrowserRouter>`, `<Routes>`, and `<Route path="*">` for fallbacks.' },
              { num: 2, icon: '🏷️', title: 'Parameter dynamic router', desc: 'Create a details view for products loading data based on product parameterized URLs (e.g. `/products/:productId`). Use useParams to decode the variable and load values.', hint: 'Create a mock array dataset mapping to products IDs to render values.' },
              { num: 3, icon: '🔒', title: 'Protected Dashboards gatekeeper', desc: 'Create a simulated auth flag state. Build a ProtectedRoute wrapper component redirecting non-auth visitors back to logins page.', hint: 'Return `<Navigate to="/login" replace />` inside guards check blocks.' },
            ].map(task => (
              <div key={task.num} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{task.icon}</div>
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
              <BookOpenCheck size={36} color="#6366f1" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Complete Assignments</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Save all configuration updates. Run and push codes to your personal repo to complete this module.</p>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
