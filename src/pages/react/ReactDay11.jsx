import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Link as LinkIcon, Layers, Lock, Home, CheckCircle,
  FileText, ArrowRight, ArrowLeft, RefreshCw, AlertTriangle,
  ExternalLink, Sparkles, Check, X, Shield, Terminal, Zap,
  User, Search, LogIn, LogOut, ChevronRight, BookOpen,
  HelpCircle, Eye, Sliders, Play, Code, Info
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

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

const StepCard = ({ stepNumber, title, desc, children }) => (
  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
      <span style={{ background: '#6366f1', color: 'white', fontWeight: 800, fontSize: '0.85rem', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {stepNumber}
      </span>
      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{title}</h4>
    </div>
    {desc && <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{desc}</p>}
    {children}
  </div>
);

/* ─────────────────────────────── main component ──────────────────────── */
export default function ReactDay11({ activeTab, onNavigate }) {
  const go = (id) => {
    onNavigate('react_module11', id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ──────────────────────────────────────────────────────────────────────────
     1. WHY CLIENT ROUTING? INTERACTIVE STATE
  ────────────────────────────────────────────────────────────────────────── */
  const [testUrlInput, setTestUrlInput] = useState('/about');
  const [spaSimPage, setSpaSimPage] = useState('home');
  const [spaReloadCount, setSpaReloadCount] = useState(0);
  const [mpaFlash, setMpaFlash] = useState(false);

  const triggerMpaSim = (page) => {
    setMpaFlash(true);
    setTimeout(() => {
      setMpaFlash(false);
      setSpaSimPage(page);
    }, 600);
  };

  const triggerSpaSim = (page) => {
    setSpaSimPage(page);
    setSpaReloadCount(c => c + 1);
  };

  /* ──────────────────────────────────────────────────────────────────────────
     2. LINK vs NAVLINK INTERACTIVE STATE
  ────────────────────────────────────────────────────────────────────────── */
  const [activeNavTab, setActiveNavTab] = useState('courses');
  const [navLinkStyleMode, setNavLinkStyleMode] = useState('class'); // 'class' | 'style'
  const [stateLossCounter, setStateLossCounter] = useState(10);
  const [showReloadAlert, setShowReloadAlert] = useState(false);

  const handleFakeAnchorClick = (e) => {
    e.preventDefault();
    setShowReloadAlert(true);
    setStateLossCounter(0); // State destroyed on full page reload
    setTimeout(() => setShowReloadAlert(false), 3000);
  };

  /* ──────────────────────────────────────────────────────────────────────────
     3. DYNAMIC PARAMS & SEARCH PARAMS INTERACTIVE STATE
  ────────────────────────────────────────────────────────────────────────── */
  const [selectedCourseId, setSelectedCourseId] = useState('react-fundamentals');
  const [selectedLessonId, setSelectedLessonId] = useState('lesson-3');
  const [queryFilter, setQueryFilter] = useState('beginner');
  const [querySort, setQuerySort] = useState('popular');

  const courseCatalog = {
    'react-fundamentals': {
      title: 'React 19 Fundamentals',
      instructor: 'Sarah Connor',
      level: 'Beginner',
      duration: '4 Weeks',
      lessons: {
        'lesson-1': 'Components & JSX Structure',
        'lesson-2': 'Props & State Management',
        'lesson-3': 'Hooks & Lifecycle Effects',
        'lesson-4': 'Client Routing with React Router'
      }
    },
    'nodejs-backend': {
      title: 'Node.js & Express Architecture',
      instructor: 'Alex Murphy',
      level: 'Intermediate',
      duration: '6 Weeks',
      lessons: {
        'lesson-1': 'Node Event Loop & Modules',
        'lesson-2': 'Building RESTful APIs',
        'lesson-3': 'Middleware & Authentication',
        'lesson-4': 'Database ORM Integration'
      }
    },
    'sql-database': {
      title: 'PostgreSQL Database Engineering',
      instructor: 'Elena Fisher',
      level: 'Beginner',
      duration: '3 Weeks',
      lessons: {
        'lesson-1': 'Relational Schema Design',
        'lesson-2': 'Complex SQL Joins & Aggregates',
        'lesson-3': 'Indexing & Query Optimization'
      }
    }
  };

  /* ──────────────────────────────────────────────────────────────────────────
     4. USENAVIGATE INTERACTIVE STATE
  ────────────────────────────────────────────────────────────────────────── */
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutFormData, setCheckoutFormData] = useState({ name: 'Alex Doe', email: 'alex@example.com', plan: 'Pro LMS Pass' });
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(false);
  const [simNavStack, setSimNavStack] = useState(['/checkout/step-1']);

  const handleNextStep = async () => {
    setIsProcessingRedirect(true);
    await new Promise(r => setTimeout(r, 600));
    setIsProcessingRedirect(false);
    if (checkoutStep === 1) {
      setCheckoutStep(2);
      setSimNavStack(prev => [...prev, '/checkout/step-2']);
    } else if (checkoutStep === 2) {
      setCheckoutStep(3);
      setSimNavStack(prev => [...prev, '/checkout/confirmation?orderId=ORD-9921']);
    }
  };

  const handleNavBack = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(prev => prev - 1);
      setSimNavStack(prev => prev.slice(0, -1));
    }
  };

  const handleResetCheckout = () => {
    setCheckoutStep(1);
    setSimNavStack(['/checkout/step-1']);
  };

  /* ──────────────────────────────────────────────────────────────────────────
     5. PROTECTED ROUTES & 404 INTERACTIVE STATE
  ────────────────────────────────────────────────────────────────────────── */
  const [currentUserRole, setCurrentUserRole] = useState('guest'); // 'guest' | 'student' | 'admin'
  const [targetRoute, setTargetRoute] = useState('/dashboard');
  const [guardLogs, setGuardLogs] = useState([]);

  const testRouteAccess = (path, requiredRole) => {
    const timestamp = new Date().toLocaleTimeString();
    if (currentUserRole === 'guest' && requiredRole !== 'none') {
      setGuardLogs(prev => [`[${timestamp}] ❌ BLOCKED: "${path}" requested by Guest → Redirecting to /login`, ...prev].slice(0, 5));
    } else if (requiredRole === 'admin' && currentUserRole !== 'admin') {
      setGuardLogs(prev => [`[${timestamp}] ⚠️ 403 FORBIDDEN: "${path}" requires Admin privilege → Redirecting to /unauthorized`, ...prev].slice(0, 5));
    } else {
      setGuardLogs(prev => [`[${timestamp}] 🔓 200 OK: Granted access to "${path}" as [${currentUserRole.toUpperCase()}]`, ...prev].slice(0, 5));
    }
  };

  /* ──────────────────────────────────────────────────────────────────────────
     6. CAPSTONE MINI-SPA SIMULATOR STATE
  ────────────────────────────────────────────────────────────────────────── */
  const [capstoneUrl, setCapstoneUrl] = useState('/');
  const [capstoneAuth, setCapstoneAuth] = useState(false);
  const [capstoneRole, setCapstoneRole] = useState('student');
  const [capstoneSearch, setCapstoneSearch] = useState('');
  const [capstoneCodeTab, setCapstoneCodeTab] = useState('app');

  const capstoneNavigate = (path) => {
    setCapstoneUrl(path);
  };

  const renderCapstoneView = () => {
    if (capstoneUrl.startsWith('/courses/')) {
      const id = capstoneUrl.replace('/courses/', '');
      const item = courseCatalog[id];
      if (!item) {
        return (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <AlertTriangle size={36} color="#ef4444" style={{ marginBottom: 8 }} />
            <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>Course Not Found (404)</h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748b' }}>No course exists for param ID: <code>"{id}"</code></p>
            <button onClick={() => capstoneNavigate('/courses')} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
              ← Return to Catalog
            </button>
          </div>
        );
      }
      return (
        <div>
          <button onClick={() => capstoneNavigate('/courses')} style={{ background: '#f1f5f9', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', marginBottom: 12, color: '#475569', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Back to Course Catalog
          </button>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                useParams() resolved: id="{id}"
              </span>
              <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                Level: {item.level}
              </span>
            </div>
            <h3 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>{item.title}</h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748b' }}>Instructor: {item.instructor} · Duration: {item.duration}</p>
            <h5 style={{ margin: '0 0 8px', fontSize: '0.88rem', color: '#334155', fontWeight: 700 }}>Curriculum Lessons:</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(item.lessons).map(([lesKey, lesTitle], idx) => (
                <div key={lesKey} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: 6, fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span><strong>Lesson {idx + 1}:</strong> {lesTitle}</span>
                  <span style={{ color: '#6366f1', fontSize: '0.75rem', fontWeight: 700 }}>Dynamic Sub-Route</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (capstoneUrl === '/dashboard') {
      if (!capstoneAuth) {
        return (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 12 }}>
            <Lock size={36} color="#e11d48" style={{ marginBottom: 8 }} />
            <h4 style={{ margin: '0 0 4px', color: '#9f1239', fontWeight: 800 }}>Protected Route Intercepted</h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#be123c' }}>
              You are currently logged out. The <code>&lt;ProtectedRoute&gt;</code> guard blocked access to <code>/dashboard</code>.
            </p>
            <button onClick={() => { setCapstoneAuth(true); capstoneNavigate('/dashboard'); }} style={{ background: '#e11d48', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
              Sign In as Student (Authenticate)
            </button>
          </div>
        );
      }
      return (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>Auth Passed</span>
              <h3 style={{ margin: '4px 0 0', color: '#0f172a', fontWeight: 800 }}>Student Portal & Learning Hub</h3>
            </div>
            <button onClick={() => setCapstoneAuth(false)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <LogOut size={14} /> Log Out
            </button>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 1rem' }}>Welcome back, Student! Your session is verified by the React Router Guard.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: 12, borderRadius: 8 }}>
              <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block', marginBottom: 4 }}>Enrolled Courses</strong>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#6366f1' }}>3 Active</span>
            </div>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: 12, borderRadius: 8 }}>
              <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block', marginBottom: 4 }}>Course Completion</strong>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>85%</span>
            </div>
          </div>
        </div>
      );
    }

    if (capstoneUrl === '/courses') {
      const filtered = Object.entries(courseCatalog).filter(([k, v]) =>
        v.title.toLowerCase().includes(capstoneSearch.toLowerCase()) ||
        v.level.toLowerCase().includes(capstoneSearch.toLowerCase())
      );

      return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 }}>
            <div>
              <h3 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>All Available Courses</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Explore catalog with dynamic routes</span>
            </div>
            <div style={{ position: 'relative', width: 200 }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Filter by name/level..."
                value={capstoneSearch}
                onChange={(e) => setCapstoneSearch(e.target.value)}
                style={{ width: '100%', padding: '6px 8px 6px 28px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.8rem', outline: 'none' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(([courseKey, courseData]) => (
              <div
                key={courseKey}
                onClick={() => capstoneNavigate(`/courses/${courseKey}`)}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <div>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>{courseData.title}</strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Instructor: {courseData.instructor} · {courseData.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                    {courseData.level}
                  </span>
                  <span style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                    Open Details <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (capstoneUrl === '/') {
      return (
        <div>
          <div style={{ background: 'linear-gradient(135deg,#e0e7ff,#fae8ff)', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: '0 0 6px', color: '#312e81', fontWeight: 800 }}>Welcome to UniRoute LMS 🚀</h3>
            <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: '#4338ca', lineHeight: 1.6 }}>
              A modern Single Page Application powered by React Router. Fast component swaps, parameterized detail pages, protected auth barriers, and smart history navigation.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => capstoneNavigate('/courses')} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                Browse Courses →
              </button>
              <button onClick={() => capstoneNavigate('/dashboard')} style={{ background: 'white', color: '#4338ca', border: '1px solid #c7d2fe', borderRadius: 6, padding: '7px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                Go to Portal 🔒
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { icon: '⚡', title: 'Zero Reloads', desc: 'Client router intercepts anchor clicks in DOM.' },
              { icon: '🎯', title: 'Wildcard Params', desc: 'useParams hook parses course IDs dynamically.' },
              { icon: '🛡️', title: 'Route Guards', desc: 'ProtectedRoute redirects unauthenticated visitors.' }
            ].map((feature, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}>
                <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: 4 }}>{feature.icon}</span>
                <strong style={{ fontSize: '0.82rem', color: '#0f172a', display: 'block', marginBottom: 2 }}>{feature.title}</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{feature.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 404 Fallback
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <AlertTriangle size={40} color="#f59e0b" style={{ marginBottom: 8 }} />
        <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>404 Page Not Found</h4>
        <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748b' }}>
          No Route matched the URL path <code>"{capstoneUrl}"</code>.
        </p>
        <button onClick={() => capstoneNavigate('/')} style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
          ← Return to Safe Harbor (Home)
        </button>
      </div>
    );
  };

  /* ──────────────────────────────────────────────────────────────────────────
     7. QUIZ QUESTIONS
  ────────────────────────────────────────────────────────────────────────── */
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const questions = [
    {
      k: 'q1',
      q: 'Why do Single Page Applications (SPAs) use React Router instead of regular <a href="..."> links?',
      opts: [
        'Because standard <a> tags crash the browser on mobile phones',
        'Standard <a> tags force a full page refresh from the server, wiping in-memory React state and resetting DOM, whereas React Router swaps components instantly with zero reload',
        'React Router makes database SQL queries execute on the client side',
        '<a> tags cannot have CSS classes applied in modern HTML5'
      ],
      ans: 1,
      exp: 'Standard <a> tags cause a full HTTP round-trip request to the server, clearing all React component states and variables. React Router uses the HTML5 History API to update the URL and swap views inside the existing DOM without refreshing.'
    },
    {
      k: 'q2',
      q: 'What is the key difference between <Link> and <NavLink>?',
      opts: [
        '<Link> works only for external URLs; <NavLink> works for local routes',
        '<NavLink> is deprecated in React Router V6 and replaced by <Anchor>',
        '<NavLink> provides active state awareness via `isActive` boolean (adding active CSS classes or styling) when its route matches the current URL',
        '<Link> reloads the browser, while <NavLink> does not'
      ],
      ans: 2,
      exp: '<NavLink> is a specialized wrapper around <Link> that knows if its `to` prop matches the active URL, allowing you to easily style active navigation tabs.'
    },
    {
      k: 'q3',
      q: 'In the route `<Route path="/users/:userId/orders/:orderId" element={<OrderDetails />} />`, how do you access the parameter values inside OrderDetails?',
      opts: [
        'const { userId, orderId } = useParams();',
        'const { userId, orderId } = useRouteParams();',
        'const { userId, orderId } = props.params;',
        'const { userId, orderId } = useQuery();'
      ],
      ans: 0,
      exp: 'The `useParams()` hook returns an object of key/value pairs of dynamic URL parameters matched from the path pattern defined with colons (e.g. `:userId`).'
    },
    {
      k: 'q4',
      q: 'When should you use the `useNavigate()` hook instead of a `<Link>` component?',
      opts: [
        'Whenever you need a clickable button on a navigation bar',
        'Only when redirecting to external websites like google.com',
        'When you need programmatic navigation inside JavaScript functions (e.g. after a form submits, login succeeds, or a timer expires)',
        'useNavigate() is only used to refresh the page'
      ],
      ans: 2,
      exp: 'Use `<Link>` / `<NavLink>` for user-clickable navigation links, and use `useNavigate()` for programmatic code-driven redirects in event handlers or async flows.'
    },
    {
      k: 'q5',
      q: 'How do you create a catch-all 404 "Page Not Found" route in React Router V6?',
      opts: [
        '<Route path="404" element={<NotFound />} />',
        '<Route path="*" element={<NotFound />} /> as the last child inside <Routes>',
        '<Route default element={<NotFound />} />',
        '<Route fallback={<NotFound />} />'
      ],
      ans: 1,
      exp: 'In React Router V6, setting `path="*"` acts as a wildcard catch-all route. If no preceding specific route matches the URL, this fallback route is rendered.'
    },
    {
      k: 'q6',
      q: 'How does a Protected Route prevent unauthorized users from seeing a private page?',
      opts: [
        'It closes the user’s browser tab automatically',
        'It encrypts the HTML using AES-256 before sending it over HTTP',
        'A wrapper component checks auth status; if false, it returns `<Navigate to="/login" replace />` instead of rendering the private children',
        'It disables the computer mouse until credentials are entered'
      ],
      ans: 2,
      exp: 'A Protected Route is a higher-order or wrapper component that checks authentication state. If false, it replaces the view with `<Navigate to="/login" replace />`, blocking unauthorized rendering.'
    }
  ];

  const quizScore = questions.filter(q => quizAnswers[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ──────────────────────────────────────────────────────────────────
          TAB 1: WHY CLIENT ROUTING? (REACT ROUTER FUNDAMENTALS)
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'intro_react' && (
        <Section key="s1" eyebrow="Module 01 • Day 11" title="React Router & Client-Side Routing">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Hero Banner */}
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Compass size={28} color="#a5b4fc" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Beginner's Guide to Client Routing</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                In traditional Multi-Page Applications (MPAs), clicking any link asks the server for a brand new HTML document, causing visible white screen flashes, losing React state, and redownloading assets.
                <strong> React Router</strong> turns your app into a high-speed Single Page Application (SPA) by intercepting URLs and switching components inside the browser instantly with <strong>zero reloads</strong>.
              </p>
            </div>

            {/* Beginner Step-by-Step Setup Guide */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              🛠️ Step-by-Step React Router V6 Setup Guide
            </h3>

            <StepCard
              stepNumber="1"
              title="Install the React Router package"
              desc="Open your terminal in your project directory and install react-router-dom from npm."
            >
              <CodeBlock title="Terminal" code={`npm install react-router-dom`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Import Core Components in your App"
              desc="Import BrowserRouter, Routes, and Route from 'react-router-dom', plus your page components."
            >
              <CodeBlock title="src/App.jsx" code={`import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="Configure BrowserRouter and Routes Hierarchy"
              desc="Wrap your entire application in <BrowserRouter>, place <Routes> as the routing switcher, and define each <Route>."
            >
              <CodeBlock title="src/App.jsx (Full Starter Component)" code={`function App() {
  return (
    <BrowserRouter>
      {/* Navbar sits outside Routes so it stays visible on every page */}
      <nav style={{ padding: "1rem", background: "#f1f5f9" }}>
        {/* Navigation links will go here */}
      </nav>

      <main style={{ padding: "1.5rem" }}>
        {/* <Routes> examines the current URL and renders the first matching <Route> */}
        <Routes>
          {/* Exact home route */}
          <Route path="/" element={<Home />} />
          
          {/* Standard page routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 Catch-all Route for any unknown URL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;`} />
            </StepCard>

            {/* Core Building Blocks Architecture */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>
              🧱 The 3 Core Building Blocks Explained
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { title: '<BrowserRouter>', role: 'Top-Level Provider', desc: 'Connects React Router to the browser HTML5 History API. Manages URL sync and back/forward buttons.', color: '#6366f1', bg: '#eef2ff' },
                { title: '<Routes>', role: 'Smart Switcher', desc: 'Looks through all child <Route> elements and finds the best matching path for the current location.', color: '#10b981', bg: '#f0fdf4' },
                { title: '<Route>', role: 'Path-to-UI Mapping', desc: 'Pairs a path string (e.g. "/about") with a React element component (e.g. <About />).', color: '#f59e0b', bg: '#fffbeb' }
              ].map((item, idx) => (
                <div key={idx} style={{ background: item.bg, border: `1.5px solid ${item.color}33`, borderRadius: 12, padding: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.color, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{item.role}</span>
                  <h4 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Side-by-Side Comparison: Traditional MPA vs React SPA */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              ⚡ Side-by-Side Comparison: MPA vs SPA
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Feature</th>
                    <th style={{ padding: '10px 14px', color: '#dc2626' }}>Traditional Website (MPA)</th>
                    <th style={{ padding: '10px 14px', color: '#16a34a' }}>React SPA (Client Routing)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'Page Transitions', mpa: 'Full white-flash screen reload', spa: 'Instant component swap in DOM' },
                    { f: 'React State (useState)', mpa: 'Wiped out on every click', spa: 'Preserved seamlessly across pages' },
                    { f: 'Network Overhead', mpa: 'Re-downloads entire HTML & assets', spa: 'Fetches only necessary JSON data' },
                    { f: 'User Experience (UX)', mpa: 'Jarring, slower desktop-like feel', spa: 'Silky smooth mobile app-like feel' },
                    { f: 'Route Controller', mpa: 'Web Server (Apache / Nginx / Express)', spa: 'React Router library in browser' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#fcfcfd' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1e293b' }}>{row.f}</td>
                      <td style={{ padding: '10px 14px', color: '#991b1b' }}>{row.mpa}</td>
                      <td style={{ padding: '10px 14px', color: '#166534', fontWeight: 600 }}>{row.spa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Interactive Route Matcher Playground */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={18} color="#6366f1" /> Interactive Route Matcher Sandbox
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem' }}>
                Type or click different test paths to see how <code>&lt;Routes&gt;</code> selects which component to render.
              </p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
                {['/', '/about', '/contact', '/services', '/unknown-random-link'].map(p => (
                  <button key={p} onClick={() => setTestUrlInput(p)} style={{ background: testUrlInput === p ? '#6366f1' : 'white', color: testUrlInput === p ? 'white' : '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '5px 12px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                    {p}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                  <span style={{ color: '#8892b0' }}>{'// Evaluated <Routes> Configuration:'}</span>
                  <div style={{ marginTop: 6, lineHeight: 1.6 }}>
                    <div style={{ color: testUrlInput === '/' ? '#86efac' : '#94a3b8' }}>{testUrlInput === '/' ? '▶ ' : '  '}&lt;Route path="/" element=&lt;Home /&gt; /&gt;</div>
                    <div style={{ color: testUrlInput === '/about' ? '#86efac' : '#94a3b8' }}>{testUrlInput === '/about' ? '▶ ' : '  '}&lt;Route path="/about" element=&lt;About /&gt; /&gt;</div>
                    <div style={{ color: testUrlInput === '/contact' ? '#86efac' : '#94a3b8' }}>{testUrlInput === '/contact' ? '▶ ' : '  '}&lt;Route path="/contact" element=&lt;Contact /&gt; /&gt;</div>
                    <div style={{ color: !['/', '/about', '/contact'].includes(testUrlInput) ? '#fbbf24' : '#94a3b8' }}>{!['/', '/about', '/contact'].includes(testUrlInput) ? '▶ ' : '  '}&lt;Route path="*" element=&lt;NotFound /&gt; /&gt;</div>
                  </div>
                </div>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Active Rendered UI:</span>
                  <div style={{ marginTop: 6 }}>
                    {testUrlInput === '/' && <h4 style={{ margin: 0, color: '#16a34a', fontWeight: 800 }}>🏠 Home Page Component</h4>}
                    {testUrlInput === '/about' && <h4 style={{ margin: 0, color: '#2563eb', fontWeight: 800 }}>ℹ️ About Us Component</h4>}
                    {testUrlInput === '/contact' && <h4 style={{ margin: 0, color: '#7c3aed', fontWeight: 800 }}>📬 Contact Support Component</h4>}
                    {!['/', '/about', '/contact'].includes(testUrlInput) && <h4 style={{ margin: 0, color: '#d97706', fontWeight: 800 }}>⚠️ 404 Fallback Component</h4>}
                    <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                      URL matches pattern: <code>"{testUrlInput}"</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('useState_hook')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Link vs NavLink (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 2: LINK vs NAVLINK (DECLARATIVE NAVIGATION)
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'useState_hook' && (
        <Section key="s2" eyebrow="Module 02 • Day 11" title="Link vs NavLink Navigation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Warning Alert Banner */}
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <AlertTriangle size={24} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: '#92400e', fontSize: '0.98rem', display: 'block' }}>
                  Rule #1 for Beginners: Never use standard &lt;a href="..."&gt; inside React!
                </strong>
                <p style={{ margin: '4px 0 0', color: '#78350f', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Standard HTML <code>&lt;a&gt;</code> anchors trigger a browser full refresh. This destroys all your React component states, reinitializes Context, resets form inputs, and kills app performance. Always import and use <code>&lt;Link&gt;</code> or <code>&lt;NavLink&gt;</code> from <code>react-router-dom</code>.
                </p>
              </div>
            </div>

            {/* Step-by-Step Guide */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              📋 Step-by-Step Implementation
            </h3>

            <StepCard
              stepNumber="1"
              title="Standard Navigation with <Link>"
              desc="Use <Link to='/path'> for general buttons, card clicks, footer links, or inline hyperlinks where active indicator styling is not needed."
            >
              <CodeBlock title="Basic Link Usage" code={`import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link to="/about">About Us</Link>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/terms">Terms of Service</Link>
    </footer>
  );
}`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Navigation Bars with <NavLink> (Active State Awareness)"
              desc="<NavLink> is designed specifically for navigation headers and menus. It inspects the current URL and passes an `isActive` boolean flag to your className or style prop."
            >
              <CodeBlock title="NavLink with isActive Callback" code={`import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-container">
      {/* 1. Using className callback function (Recommended) */}
      <NavLink 
        to="/" 
        end
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Home
      </NavLink>

      {/* 2. Using inline style callback function */}
      <NavLink 
        to="/courses" 
        style={({ isActive }) => ({
          color: isActive ? "#6366f1" : "#64748b",
          fontWeight: isActive ? "bold" : "normal"
        })}
      >
        Courses
      </NavLink>
    </nav>
  );
}`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="Understanding the `end` Prop on Root Links"
              desc="Without `end`, a NavLink to '/' will stay active on ALL sub-routes (like '/courses') because all URLs start with '/'. Adding the `end` prop ensures '/' only activates when the URL is strictly '/'."
            >
              <CodeBlock title="Root Link Best Practice" code={`// ✅ Correct: Only active on exactly localhost:3000/
<NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
  Home
</NavLink>`} />
            </StepCard>

            {/* Comparison Table */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>
              ⚖️ &lt;a&gt; vs &lt;Link&gt; vs &lt;NavLink&gt; Comparison
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Tag</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Reloads Page?</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Active State Awareness</th>
                    <th style={{ padding: '10px 14px', color: '#0f172a' }}>Primary Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#ef4444' }}>&lt;a href="..."&gt;</td>
                    <td style={{ padding: '10px 14px', color: '#ef4444', fontWeight: 600 }}>Yes (Wipes State ❌)</td>
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>None</td>
                    <td style={{ padding: '10px 14px', color: '#475569' }}>External links only (e.g. to google.com)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fcfcfd' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#6366f1' }}>&lt;Link to="..."&gt;</td>
                    <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>No (Instant Swap ✅)</td>
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>None</td>
                    <td style={{ padding: '10px 14px', color: '#475569' }}>Buttons, cards, footer & general links</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#10b981' }}>&lt;NavLink to="..."&gt;</td>
                    <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>No (Instant Swap ✅)</td>
                    <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 700 }}>Built-in ({`isActive`}) ✅</td>
                    <td style={{ padding: '10px 14px', color: '#475569' }}>Navigation headers, tabs & sidebars</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Interactive NavLink Simulator */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    🔗 Interactive NavLink Active State Visualizer
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Click tabs to observe dynamic active class and styles</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => setNavLinkStyleMode('class')} style={{ background: navLinkStyleMode === 'class' ? '#6366f1' : 'white', color: navLinkStyleMode === 'class' ? 'white' : '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                    CSS Class Mode
                  </button>
                  <button onClick={() => setNavLinkStyleMode('style')} style={{ background: navLinkStyleMode === 'style' ? '#6366f1' : 'white', color: navLinkStyleMode === 'style' ? 'white' : '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                    Inline Style Mode
                  </button>
                </div>
              </div>

              {/* Simulated Navigation Bar */}
              <div style={{ background: '#0f172a', borderRadius: 12, padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['home', 'courses', 'dashboard', 'profile'].map((tab) => {
                    const isActive = activeNavTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveNavTab(tab)}
                        style={{
                          background: isActive ? '#6366f1' : 'transparent',
                          color: isActive ? 'white' : '#94a3b8',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 14px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'all 0.15s'
                        }}
                      >
                        {tab.toUpperCase()}
                        {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#86efac' }} />}
                      </button>
                    );
                  })}
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>Active URL: /{activeNavTab}</span>
              </div>

              {/* Live Code Evaluation Output */}
              <div style={{ background: '#1e293b', borderRadius: 10, padding: '1rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#e2e8f0' }}>
                <span style={{ color: '#8892b0' }}>{'// Rendered JSX Output for current URL:'}</span>
                <div style={{ marginTop: 6, color: '#a5d6ff' }}>
                  {navLinkStyleMode === 'class' ? (
                    `&lt;NavLink to="/${activeNavTab}" className={({ isActive }) => "${activeNavTab === 'home' ? 'nav-item active' : 'nav-item'}"} /&gt;`
                  ) : (
                    `&lt;NavLink to="/${activeNavTab}" style={({ isActive }) => ({ color: "${activeNavTab ? '#6366f1' : '#94a3b8'}", fontWeight: "bold" })} /&gt;`
                  )}
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('multiple_states')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Dynamic params (useParams) (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 3: DYNAMIC PARAMS & useParams HOOK
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'multiple_states' && (
        <Section key="s3" eyebrow="Module 03 • Day 11" title="Dynamic Routing & useParams Hook">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Overview Banner */}
            <div style={{ background: 'linear-gradient(135deg,#059669,#0d9488)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Layers size={28} color="#a7f3d0" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Dynamic Path Variables</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                In real applications, you don't create separate static routes for thousands of products or courses. Instead, you declare <strong>Dynamic Parameter Placeholders</strong> using the colon syntax (<code>:paramName</code>). React Router parses the URL and provides the variables through the <strong><code>useParams()</code></strong> hook.
              </p>
            </div>

            {/* Step-by-Step Guide */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              📚 Step-by-Step Dynamic Route Workflow
            </h3>

            <StepCard
              stepNumber="1"
              title="Declare the Route with a Colon Variable (:id)"
              desc="In your Routes definition, add a colon prefix before the wildcard parameter name."
            >
              <CodeBlock title="src/App.jsx" code={`<Routes>
  {/* The colon :courseId becomes a dynamic variable */}
  <Route path="/courses/:courseId" element={<CourseDetail />} />
  
  {/* You can also have nested dynamic parameters */}
  <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonView />} />
</Routes>`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Create Dynamic Navigation Links"
              desc="Link to dynamic paths using template literals with real database or array item IDs."
            >
              <CodeBlock title="src/pages/CoursesList.jsx" code={`import { Link } from "react-router-dom";

function CoursesList({ courses }) {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          {/* Construct URL dynamically */}
          <Link to={\`/courses/\${course.id}\`}>
            View Course Details →
          </Link>
        </div>
      ))}
    </div>
  );
}`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="Extract Parameters with the useParams() Hook"
              desc="Call useParams() inside your target component to retrieve an object containing all route parameters."
            >
              <CodeBlock title="src/pages/CourseDetail.jsx" code={`import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CourseDetail() {
  // 1. Extract the parameter defined in the Route path (e.g. :courseId)
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Fetch specific item data using the extracted ID
    fetch(\`/api/courses/\${courseId}\`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      });
  }, [courseId]); // Re-fetch whenever the URL parameter changes!

  if (loading) return <p>Loading course details...</p>;
  if (!course) return <p>Course not found!</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>Course ID: {courseId}</p>
      <p>Instructor: {course.instructor}</p>
    </div>
  );
}`} />
            </StepCard>

            {/* Dynamic vs Query Params Breakdown */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '1rem' }}>
              🔍 Path Params (useParams) vs Search Query Params (useSearchParams)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>useParams()</span>
                <h4 style={{ margin: '8px 0 4px', color: '#0f172a', fontWeight: 800 }}>Path Parameters</h4>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: '0 0 10px' }}>
                  Identifies a <strong>specific unique resource</strong>.
                </p>
                <div style={{ background: '#0f172a', borderRadius: 8, padding: 8, fontFamily: 'monospace', fontSize: '0.78rem', color: '#86efac' }}>
                  URL: /courses/react-fundamentals<br />
                  useParams() → &#123; courseId: "react-fundamentals" &#125;
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>useSearchParams()</span>
                <h4 style={{ margin: '8px 0 4px', color: '#0f172a', fontWeight: 800 }}>Query String Parameters</h4>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: '0 0 10px' }}>
                  Used for <strong>sorting, filtering, pagination, and searching</strong>.
                </p>
                <div style={{ background: '#0f172a', borderRadius: 8, padding: 8, fontFamily: 'monospace', fontSize: '0.78rem', color: '#fbbf24' }}>
                  URL: /courses?level=beginner&sort=popular<br />
                  searchParams.get("level") → "beginner"
                </div>
              </div>
            </div>

            {/* Interactive Dynamic Param Explorer */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sliders size={18} color="#059669" /> Dynamic URL Composer & Params Inspector
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem' }}>
                Select a course and lesson below to see how React Router constructs the URL path and decodes the variables.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '1.25rem' }}>
                {Object.keys(courseCatalog).map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedCourseId(id)}
                    style={{
                      padding: '10px 12px',
                      background: selectedCourseId === id ? '#059669' : 'white',
                      color: selectedCourseId === id ? 'white' : '#0f172a',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      transition: 'all 0.15s'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', opacity: 0.8, display: 'block' }}>Course ID</span>
                    {courseCatalog[id].title}
                  </button>
                ))}
              </div>

              {/* URL Address Bar */}
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', color: 'white', marginBottom: '1rem' }}>
                <span style={{ color: '#8892b0', fontSize: '0.75rem', display: 'block', marginBottom: 4 }}>Simulated Browser URL:</span>
                <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: '#a5d6ff' }}>
                  https://uniroute.dev/courses/<span style={{ color: '#86efac', fontWeight: 800 }}>{selectedCourseId}</span>?level=<span style={{ color: '#fbbf24' }}>{queryFilter}</span>
                </div>
              </div>

              {/* Live Rendered Card */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 10, padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Decoded Data from useParams():</span>
                <div style={{ marginTop: 6 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>{courseCatalog[selectedCourseId].title}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                    Instructor: <strong>{courseCatalog[selectedCourseId].instructor}</strong> | Duration: {courseCatalog[selectedCourseId].duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('object_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: useNavigate Hook (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 4: USENAVIGATE HOOK (PROGRAMMATIC NAVIGATION)
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'object_state' && (
        <Section key="s4" eyebrow="Module 04 • Day 11" title="Programmatic Navigation with useNavigate">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Overview Banner */}
            <div style={{ background: 'linear-gradient(135deg,#0284c7,#2563eb)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Compass size={28} color="#bae6fd" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Programmatic Navigation</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                While <code>&lt;Link&gt;</code> is triggered by user clicks, <strong><code>useNavigate()</code></strong> allows your JavaScript code to trigger navigation automatically — such as after saving form inputs, logging in with credentials, completing payments, or timer expirations.
              </p>
            </div>

            {/* Step-by-Step Guide */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              🚀 Step-by-Step useNavigate Guide
            </h3>

            <StepCard
              stepNumber="1"
              title="Import and Initialize the Hook"
              desc="Import useNavigate from react-router-dom and invoke it at the top of your functional component."
            >
              <CodeBlock title="Hook Initialization" code={`import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  // Obtain the navigate function
  const navigate = useNavigate();
  // ...
}`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Trigger Redirects Inside Event Handlers"
              desc="Call navigate('/path') after async operations finish (e.g. database save or API check)."
            >
              <CodeBlock title="Form Submission Handler" code={`const handleRegister = async (event) => {
  event.preventDefault();

  try {
    // 1. Submit form data to backend API
    await api.registerUser(formData);

    // 2. Programmatically redirect user to their new dashboard
    navigate("/dashboard");

  } catch (error) {
    console.error("Registration failed:", error);
  }
};`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="History Manipulation & State Passing"
              desc="useNavigate supports delta steps (back/forward), history entry replacement, and passing state objects."
            >
              <CodeBlock title="Advanced useNavigate Patterns" code={`// 1. Go back 1 page in browser history (like browser back button)
navigate(-1);

// 2. Go forward 1 page in browser history
navigate(1);

// 3. Replace current history entry (Prevents user from clicking 'Back' to return to login)
navigate("/dashboard", { replace: true });

// 4. Pass temporary state to the target page without putting it in the URL
navigate("/order-success", {
  state: { orderNumber: "ORD-8812", amount: 49.99 }
});`} />
            </StepCard>

            {/* Interactive Multi-Step Checkout Simulator */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  ⏱️ Interactive Multi-Step Workflow Simulator
                </h4>
                <button onClick={handleResetCheckout} style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                  Reset Workflow
                </button>
              </div>

              {/* Progress Steps Indicator */}
              <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem' }}>
                {[
                  { step: 1, label: '1. Student Info', path: '/checkout/step-1' },
                  { step: 2, label: '2. Payment Review', path: '/checkout/step-2' },
                  { step: 3, label: '3. Order Confirmation', path: '/checkout/confirmation' }
                ].map((s) => (
                  <div
                    key={s.step}
                    style={{
                      flex: 1,
                      background: checkoutStep === s.step ? '#2563eb' : checkoutStep > s.step ? '#10b981' : 'white',
                      color: checkoutStep >= s.step ? 'white' : '#64748b',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>

              {/* Step Content Container */}
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
                {checkoutStep === 1 && (
                  <div>
                    <h4 style={{ margin: '0 0 8px', color: '#0f172a' }}>Step 1: Student Details</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem' }}>Click below to simulate saving user profile and triggering <code>navigate('/checkout/step-2')</code>.</p>
                    <button
                      disabled={isProcessingRedirect}
                      onClick={handleNextStep}
                      style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      {isProcessingRedirect ? 'Saving & Navigating...' : 'Continue to Step 2 → (useNavigate)'}
                    </button>
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div>
                    <h4 style={{ margin: '0 0 8px', color: '#0f172a' }}>Step 2: Confirm Plan & Payment</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem' }}>Selected Plan: <strong>Pro LMS Pass ($49/mo)</strong></p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={handleNavBack}
                        style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: 6, padding: '8px 14px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        ← Back (navigate(-1))
                      </button>
                      <button
                        disabled={isProcessingRedirect}
                        onClick={handleNextStep}
                        style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {isProcessingRedirect ? 'Processing...' : 'Complete Payment (useNavigate)'}
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', marginBottom: 6 }}>
                      <CheckCircle size={22} />
                      <h4 style={{ margin: 0, fontWeight: 800 }}>Enrollment Confirmed!</h4>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem' }}>Order ID: <strong>ORD-9921</strong>. Navigated with <code>{`navigate('/confirmation', { replace: true })`}</code>.</p>
                    <button onClick={handleResetCheckout} style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                      Start New Registration
                    </button>
                  </div>
                )}
              </div>

              {/* History Stack Log */}
              <div style={{ background: '#0f172a', borderRadius: 8, padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.78rem', color: '#94a3b8' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: 4 }}>Browser History Stack:</span>
                {simNavStack.map((item, idx) => (
                  <div key={idx} style={{ color: idx === simNavStack.length - 1 ? '#86efac' : '#64748b' }}>
                    {idx === simNavStack.length - 1 ? '▶ ' : '  '}{item}
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('nested_state')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Protected Routes & 404 (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 5: PROTECTED ROUTES & 404 FALLBACK
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'nested_state' && (
        <Section key="s5" eyebrow="Module 05 • Day 11" title="Protected Routes & 404 Error Pages">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Overview Banner */}
            <div style={{ background: 'linear-gradient(135deg,#e11d48,#be123c)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Lock size={28} color="#fecdd3" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Route Guards & 404 Fallbacks</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.95 }}>
                Not all pages in your app should be publicly visible. <strong>Protected Routes</strong> act as security gatekeepers, checking if a user is authenticated or has proper admin credentials before rendering sensitive dashboards. If unauthenticated, it redirects visitors instantly with <strong><code>&lt;Navigate to="/login" replace /&gt;</code></strong>.
              </p>
            </div>

            {/* Step-by-Step Guide to Protected Routes */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              🛡️ Step-by-Step Protected Route Component Pattern
            </h3>

            <StepCard
              stepNumber="1"
              title="Create the Reusable <ProtectedRoute> Wrapper"
              desc="Build a simple wrapper component that evaluates your authentication state."
            >
              <CodeBlock title="src/components/ProtectedRoute.jsx" code={`import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but save the current location so we can return here after login!
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Access granted: render the protected child components
  return children;
}

export default ProtectedRoute;`} />
            </StepCard>

            <StepCard
              stepNumber="2"
              title="Wrap Sensitive Routes in App.jsx"
              desc="Enclose private views inside the <ProtectedRoute> component tag."
            >
              <CodeBlock title="src/App.jsx" code={`import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

      {/* Protected Route — Guarded by ProtectedRoute */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* 404 Catch-All Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}`} />
            </StepCard>

            <StepCard
              stepNumber="3"
              title="Build a Custom 404 'Not Found' Page"
              desc="Create an elegant 404 view that captures misspelled or deleted route URLs and helps users navigate back."
            >
              <CodeBlock title="src/pages/NotFound.jsx" code={`import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>404 — Page Not Found 🧭</h1>
      <p>Oops! The route you are looking for does not exist.</p>
      <Link to="/" style={{ padding: "8px 16px", background: "#6366f1", color: "white", borderRadius: 6, textDecoration: "none" }}>
        ← Return to Safe Harbor
      </Link>
    </div>
  );
}`} />
            </StepCard>

            {/* Interactive Route Guard Simulator */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    🔒 Interactive Gatekeeper & Role Guard Simulator
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Switch current user role and test protected URL access</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['guest', 'student', 'admin'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setCurrentUserRole(role)}
                      style={{
                        padding: '5px 12px',
                        background: currentUserRole === role ? '#0f172a' : 'white',
                        color: currentUserRole === role ? 'white' : '#334155',
                        border: '1px solid #cbd5e1',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {role === 'guest' ? '👤 Guest' : role === 'student' ? '🎓 Student' : '👑 Admin'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons to Test Routes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '1rem' }}>
                <button
                  onClick={() => testRouteAccess('/courses', 'none')}
                  style={{ padding: '10px', background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}
                >
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>GET /courses</strong>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a' }}>Public Route (Anyone)</span>
                </button>

                <button
                  onClick={() => testRouteAccess('/dashboard', 'student')}
                  style={{ padding: '10px', background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}
                >
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>GET /dashboard</strong>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb' }}>Guarded (Requires Auth)</span>
                </button>

                <button
                  onClick={() => testRouteAccess('/admin-portal', 'admin')}
                  style={{ padding: '10px', background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}
                >
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>GET /admin-portal</strong>
                  <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>Strict Admin Guard</span>
                </button>
              </div>

              {/* Security Audit Log */}
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <span style={{ color: '#8892b0', display: 'block', marginBottom: 6 }}>Security Gateway Access Log:</span>
                {guardLogs.length === 0 ? (
                  <span style={{ color: '#64748b', fontStyle: 'italic' }}>Click any route above to test the gatekeeper...</span>
                ) : (
                  guardLogs.map((log, i) => (
                    <div key={i} style={{ padding: '2px 0', color: log.includes('200 OK') ? '#86efac' : log.includes('BLOCKED') ? '#fca5a5' : '#fde047' }}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('state_lifting')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Next: Capstone Multi-page App (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 6: CAPSTONE MULTI-PAGE WEBSITE SIMULATOR
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'state_lifting' && (
        <Section key="s6" eyebrow="Capstone Project • Day 11" title="UniRoute Academy — Multi-Page App Simulator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Project Overview */}
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '1.75rem', marginBottom: '2rem', color: 'white' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800 }}>🎓 Capstone Project: Full SPA Walkthrough</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.95 }}>
                Test an end-to-end Single Page Application with dynamic routing, active navigation indicators, protected authentication barriers, parameter parsing, and fallback 404 views.
              </p>
            </div>

            {/* Simulated Browser Window Chrome */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
              
              {/* Browser Address Bar Header */}
              <div style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => capstoneNavigate('/')} style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 4, padding: '2px 6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    <Home size={12} />
                  </button>
                  <button onClick={() => {}} style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 4, padding: '2px 6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                    <RefreshCw size={12} />
                  </button>
                </div>

                {/* Simulated URL Input */}
                <div style={{ display: 'flex', flex: 1, background: 'white', border: '1px solid #cbd5e1', borderRadius: 6, padding: '5px 12px', fontSize: '0.82rem', alignItems: 'center', gap: 8, fontFamily: 'monospace' }}>
                  <LinkIcon size={14} color="#94a3b8" />
                  <span style={{ color: '#0f172a' }}>https://academy.react.dev<strong>{capstoneUrl}</strong></span>
                </div>

                {/* Auth Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: capstoneAuth ? '#dcfce7' : '#fee2e2', color: capstoneAuth ? '#166534' : '#991b1b' }}>
                    {capstoneAuth ? 'Logged In' : 'Guest'}
                  </span>
                </div>
              </div>

              {/* Browser Body */}
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 340, background: 'white' }}>
                
                {/* Simulated Sidebar with NavLink */}
                <div style={{ borderRight: '1px solid #e2e8f0', background: '#f8fafc', padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                    &lt;NavLink&gt; Menu
                  </span>

                  {[
                    { path: '/', label: 'Home Page', icon: <Home size={15} /> },
                    { path: '/courses', label: 'Course Catalog', icon: <BookOpen size={15} /> },
                    { path: '/dashboard', label: 'Student Portal 🔒', icon: <User size={15} /> },
                    { path: '/broken-404-link', label: 'Test 404 Route', icon: <AlertTriangle size={15} /> }
                  ].map((tab) => {
                    const active = capstoneUrl === tab.path || (tab.path === '/courses' && capstoneUrl.startsWith('/courses/'));
                    return (
                      <button
                        key={tab.path}
                        onClick={() => capstoneNavigate(tab.path)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 12px',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          background: active ? '#6366f1' : 'transparent',
                          color: active ? 'white' : '#475569',
                          transition: 'all 0.15s'
                        }}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Viewport Content */}
                <div style={{ padding: '1.5rem' }}>
                  {renderCapstoneView()}
                </div>
              </div>
            </div>

            {/* Beginner 7-Step Build Checklist */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              📝 7-Step Checklist to Build This App Locally
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: '2rem' }}>
              {[
                { step: '1', title: 'Initialize Vite Project', desc: 'npm create vite@latest my-app -- --template react' },
                { step: '2', title: 'Install Router', desc: 'npm install react-router-dom' },
                { step: '3', title: 'Configure App.jsx', desc: 'Wrap in BrowserRouter, Routes, and Route tags' },
                { step: '4', title: 'Create NavLink Header', desc: 'Use NavLink with isActive styling for menu' },
                { step: '5', title: 'Dynamic Catalog Route', desc: 'Create /courses/:id route and consume useParams()' },
                { step: '6', title: 'Protected Dashboard Guard', desc: 'Create <ProtectedRoute> returning <Navigate replace />' },
                { step: '7', title: 'Add 404 Catch-All', desc: 'Add <Route path="*" element={<NotFound />} />' }
              ].map((c) => (
                <div key={c.step} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ background: '#6366f1', color: 'white', width: 20, height: 20, borderRadius: '50%', fontSize: '0.72rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      {c.step}
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{c.title}</strong>
                  </div>
                  <code style={{ fontSize: '0.75rem', color: '#4338ca', display: 'block', background: '#eef2ff', padding: '2px 6px', borderRadius: 4 }}>
                    {c.desc}
                  </code>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Go to Knowledge Check Quiz (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 7: QUIZ
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 11 Quiz — React Router Masterclass">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p style={{ margin: '0 0 1.5rem', fontSize: '0.92rem', color: '#475569' }}>
              Test your understanding of client-side routing, hooks (<code>useParams</code>, <code>useNavigate</code>), active link styling, route guards, and 404 handling.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {questions.map((item, qi) => (
                <div key={item.k} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                  <p style={{ fontWeight: 700, color: '#0f172a', margin: '0 0 0.8rem', fontSize: '0.95rem' }}>
                    {qi + 1}. {item.q}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.opts.map((opt, oi) => {
                      const selected = quizAnswers[item.k] === oi;
                      const correct = oi === item.ans;
                      let bg = 'white', border = '1px solid #cbd5e1';
                      if (quizSubmitted) {
                        if (correct) { bg = '#dcfce7'; border = '1.5px solid #10b981'; }
                        else if (selected) { bg = '#fee2e2'; border = '1.5px solid #ef4444'; }
                      } else if (selected) {
                        bg = '#e0f2fe'; border = '1.5px solid #0ea5e9';
                      }

                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [item.k]: oi }))}
                          style={{
                            background: bg,
                            border,
                            padding: '0.65rem 1rem',
                            borderRadius: 8,
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            textAlign: 'left',
                            fontSize: '0.88rem',
                            transition: 'all 0.15s'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#334155', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #6366f1' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!quizSubmitted ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length < questions.length}
                    style={{ background: '#6366f1', borderColor: '#6366f1', minWidth: 160 }}
                  >
                    Submit Quiz Answers
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-outline"
                      onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                      style={{ minWidth: 150 }}
                    >
                      Retry Quiz
                    </button>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: quizScore === questions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {quizScore} / {questions.length} ({Math.round(quizScore / questions.length * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Continue Button */}
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                Continue to Hands-on Assignments <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          TAB 8: ASSIGNMENT
      ────────────────────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Homework & Practice" title="Day 11 Guided Assignments">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>

            {/* Completion Banner */}
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', borderRadius: 16, padding: '1.75rem', marginBottom: '2rem', color: 'white' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800 }}>🎉 Day 11 React Router Masterclass!</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.95 }}>
                Complete these 3 hands-on step-by-step challenges to cement your routing skills. Follow the detailed steps, code templates, and hints below.
              </p>
            </div>

            {/* Task 1 */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#e0e7ff', color: '#4338ca', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>
                    Task 1: Build a 4-Page Site with Active &lt;NavLink&gt; Styling
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem' }}>
                    Create a mini-site containing <code>Home (/)</code>, <code>About (/about)</code>, <code>Services (/services)</code>, and a custom <code>404 Catch-all Route (/*)</code>. Ensure all navbar tabs use <code>NavLink</code> with dynamic active colors.
                  </p>
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', color: '#1d4ed8' }}>
                    💡 <strong>Step Hint:</strong> Remember to add the <code>end</code> prop to the Home link (<code>&lt;NavLink to="/" end&gt;</code>) to avoid parent route highlighting!
                  </div>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#dcfce7', color: '#15803d', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>
                    Task 2: Dynamic E-Commerce Product View with useParams
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem' }}>
                    Configure a dynamic route <code>/products/:productId</code>. Inside the <code>ProductDetail</code> component, extract <code>productId</code> with <code>useParams()</code>, look up the item from a mock products array, and render the title, price, and image. If ID is not found, display a helpful error message.
                  </p>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', color: '#166534' }}>
                    💡 <strong>Step Hint:</strong> Use <code>const { productId } = useParams();</code> and array find: <code>products.find(p =&gt; p.id === productId)</code>.
                  </div>
                </div>
              </div>
            </div>

            {/* Task 3 */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#fef3c7', color: '#b45309', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0f172a', fontWeight: 800 }}>
                    Task 3: Protected Dashboard Gatekeeper with useNavigate
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 0.75rem' }}>
                    Build a reusable <code>&lt;ProtectedRoute&gt;</code> wrapper that checks an <code>isLoggedIn</code> boolean state. Protect <code>/dashboard</code>. On the login form, when the user clicks 'Sign In', simulate auth verification and call <code>{"navigate('/dashboard', { replace: true })"}</code>.
                  </p>
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', color: '#92400e' }}>
                    💡 <strong>Step Hint:</strong> If <code>!isLoggedIn</code>, return <code>&lt;Navigate to="/login" replace /&gt;</code> inside the wrapper component.
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Footer */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
              <CheckCircle size={36} color="#10b981" style={{ marginBottom: '0.5rem' }} />
              <h5 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Ready for Deployment</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                Commit your updated files to GitHub and deploy to Vercel to publish your interactive course platform!
              </p>
            </div>

          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
