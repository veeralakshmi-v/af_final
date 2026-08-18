import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, Eye, Settings, RefreshCw, Activity, Database, Lock
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

/* ─────────────────────────────── helpers ─────────────────────────────── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const InfoBox = ({ icon: Icon, color, bg, border, children }) => (
  <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: 12, display: 'flex', gap: 10, color, margin: '1rem 0' }}>
    <Icon size={20} style={{ flexShrink: 0, marginTop: 2 }} />
    <div style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{children}</div>
  </div>
);

export default function DjangoDay8({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module8', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Interactive Sandbox States ── */
  const [sessionDb, setSessionDb] = useState({
    's5k8a3j9m2': { last_visit: '2026-08-04 14:02:11', last_activity: '2026-08-04 14:02:11', username: 'alice' }
  });
  const [cookies, setCookies] = useState({
    'sessionid': 's5k8a3j9m2'
  });
  const [currentUser, setCurrentUser] = useState('alice');
  const [currentPath, setCurrentPath] = useState('/user_dashboard/');
  const [middlewareEnabled, setMiddlewareEnabled] = useState(true);
  const [sandboxLogs, setSandboxLogs] = useState([
    'System: Session and Middleware Sandbox Initialized.',
    'System: Session cookie "sessionid: s5k8a3j9m2" loaded in client browser.'
  ]);
  const [serverLastVisit, setServerLastVisit] = useState('First time visiting');

  const visitPage = (path) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    let logs = [];
    logs.push(`[Request] GET request sent to "${path}"`);

    // 1. Read Cookies from Browser
    const sessionid = cookies['sessionid'];
    logs.push(`[Cookie Middleware] Read cookie: sessionid="${sessionid || 'None'}"`);

    let activeSession = null;
    let finalSessionid = sessionid;

    // 2. Session Middleware intercept
    if (sessionid && sessionDb[sessionid]) {
      activeSession = { ...sessionDb[sessionid] };
      logs.push(`[Session Middleware] Found session ID in DB. Loaded data: ${JSON.stringify(activeSession)}`);
    } else {
      // Create new session
      const newSessionid = 's' + Math.random().toString(36).substring(2, 11);
      finalSessionid = newSessionid;
      activeSession = { last_visit: 'First time visiting' };
      setCookies(prev => ({ ...prev, sessionid: newSessionid }));
      logs.push(`[Session Middleware] No session found. Created session ID: "${newSessionid}"`);
    }

    // 3. User association (Authentication Middleware simulation)
    if (currentUser) {
      activeSession.username = currentUser;
      logs.push(`[Auth Middleware] Associated request with logged-in user: "${currentUser}"`);
    } else {
      logs.push(`[Auth Middleware] Anonymous user request.`);
    }

    // 4. Custom UserActivityMiddleware
    if (middlewareEnabled) {
      if (currentUser) {
        activeSession.last_activity = timestamp;
        logs.push(`[UserActivityMiddleware] Logged activity: User "${currentUser}" visited "${path}" at ${timestamp}`);
      } else {
        logs.push(`[UserActivityMiddleware] Guest user skipped activity logging.`);
      }
    }

    // 5. Update last_visit in View (Views simulation)
    if (path === '/user_dashboard/') {
      setServerLastVisit(activeSession.last_visit || 'First time visiting');
      activeSession.last_visit = timestamp;
      logs.push(`[View] dashboard view rendered. Updated session last_visit to ${timestamp}`);
    }

    // 6. Save back to Session DB
    setSessionDb(prev => ({
      ...prev,
      [finalSessionid]: activeSession
    }));
    logs.push(`[Session Middleware] Saved updated session to database: ${JSON.stringify(activeSession)}`);

    setCurrentPath(path);
    setSandboxLogs(prev => [...prev, ...logs]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Force a fresh session
    const newSessionid = 's' + Math.random().toString(36).substring(2, 11);
    setCookies({ sessionid: newSessionid });
    setSessionDb(prev => ({
      ...prev,
      [newSessionid]: { last_visit: 'First time visiting', username: user }
    }));
    setSandboxLogs(prev => [
      ...prev,
      `[User Action] Logged in as ${user || 'Guest'}. Generated new session "${newSessionid}"`
    ]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCookies({});
    setSandboxLogs(prev => [...prev, `[User Action] Logged out. Cleared browser session cookie.`]);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Where does Django store session data by default?',
      opts: [
        'In the browser memory',
        'Directly inside the cookie file in encrypted text',
        'In the database (django.contrib.sessions.backends.db)',
        'In local storage files on the web server'
      ],
      ans: 2,
      exp: 'By default, Django stores session data in the database. Only the session ID is stored in the browser cookie.'
    },
    {
      k: 'q2',
      q: 'What setting determines how long a session cookie lasts in the browser?',
      opts: ['SESSION_EXPIRE_AT_BROWSER_CLOSE', 'SESSION_COOKIE_AGE', 'SESSION_SAVE_EVERY_REQUEST', 'SESSION_ENGINE'],
      ans: 1,
      exp: 'SESSION_COOKIE_AGE sets the session age in seconds. The default value is 1209600 seconds, which equals 2 weeks.'
    },
    {
      k: 'q3',
      q: 'In custom middleware, what is the role of the self.get_response function?',
      opts: [
        'It terminates the request cycle immediately',
        'It fetches session data from the database',
        'It forwards the request to the next middleware or view in line',
        'It compiles the Django template files'
      ],
      ans: 2,
      exp: 'The get_response callable represents the next middleware layer or the final view. Calling self.get_response(request) processes the request and returns the response.'
    },
    {
      k: 'q4',
      q: 'Which middleware is required in settings.py to read and write session variables?',
      opts: [
        'django.middleware.common.CommonMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'authen.middleware.UserActivityMiddleware'
      ],
      ans: 1,
      exp: 'SessionMiddleware handles the instantiation, loading, and saving of session hashes on every incoming request.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO TO SESSIONS & COOKIES ─────────────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 8 • Module 01" title="Sessions, Cookies, and Middleware">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0369a1,#0284c7)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🔄 Understanding State in Web Apps</h3>
              <p style={{ color: '#e0f2fe', margin: 0, lineHeight: 1.7 }}>
                HTTP is a <strong>stateless protocol</strong>. This means the server treats every request as completely independent. To build dashboards or maintain log-in sessions, we need a way to store user data across requests. This is accomplished using <strong>Cookies</strong> (stored in the browser) and <strong>Sessions</strong> (stored on the server).
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Cookies vs. Sessions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#0284c7', fontWeight: 800, marginTop: 0 }}>🍪 Cookies</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>Stored on the **Client-Side** (the user's web browser).</li>
                  <li>Sent automatically with every HTTP request to the server.</li>
                  <li>Great for small, non-sensitive items (e.g. theme preference).</li>
                  <li>Can be modified by the user (less secure).</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#7c3aed', fontWeight: 800, marginTop: 0 }}>💾 Sessions</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>Stored on the **Server-Side** (database or cache).</li>
                  <li>Linked to the browser via a unique, random **Session ID** cookie.</li>
                  <li>Great for sensitive items (e.g. user authentication state).</li>
                  <li>Tamper-proof and highly secure.</li>
                </ul>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Session Configuration <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. SESSION CONFIGURATION ───────────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="config" eyebrow="Django • Day 8 • Module 02" title="Session Engine & Settings.py">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django provides multiple options for storing sessions on the server. You can configure this using settings in your project's <code>settings.py</code> file.</p>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Session Store Engines</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Engine Setting</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Pros/Cons</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["'django.contrib.sessions.backends.db'", 'Database (Default)', 'Persistent and easy to set up. Can cause DB load with high traffic.'],
                  ["'django.contrib.sessions.backends.cache'", 'Cache (Memcached/Redis)', 'Extremely fast. Session data is lost if cache restarts.'],
                  ["'django.contrib.sessions.backends.cached_db'", 'Write-Through Cache', 'Fast reads from cache, writes persistent to DB. Recommended.'],
                  ["'django.contrib.sessions.backends.signed_cookies'", 'Signed Cookies', 'No database lookup needed. Limited to 4KB size constraint.'],
                ].map(([engine, type, comment]) => (
                  <tr key={engine} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>{engine}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{type}</td>
                    <td style={{ padding: '8px 12px', color: '#64748b' }}>{comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Session Configurations in Settings.py</h3>
            <CodeBlock title="mysite/settings.py — Session & Cookie parameters" code={`# Enable django sessions in installed applications
INSTALLED_APPS = [
    # ...
    'django.contrib.sessions',
    # ...
]

# Database backend is set by default. You can explicitly configure it:
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# How long session cookies last in seconds (default is 2 weeks = 1209600)
SESSION_COOKIE_AGE = 1209600

# Whether to save session to DB on every single page request (default False)
SESSION_SAVE_EVERY_REQUEST = True

# Expire the session when the user closes their browser window (default False)
SESSION_EXPIRE_AT_BROWSER_CLOSE = False`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Reading & Writing Session Data <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. SESSION VIEWS API ───────────────────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="views" eyebrow="Django • Day 8 • Module 03" title="Handling Session Data in Views">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django handles session lookup automatically. Inside any view, <code>request.session</code> behaves like a standard Python dictionary.</p>

            <CodeBlock title="authen/views.py — Storing & accessing sessions" code={`from django.shortcuts import render
from django.utils import timezone

def user_dashboard(request):
    # 1. Read data from session (use .get to prevent KeyErrors)
    last_visit = request.session.get('last_visit', 'First time visiting')
    visit_count = request.session.get('visit_count', 0)
    
    # 2. Update data in session
    visit_count += 1
    request.session['visit_count'] = visit_count
    request.session['last_visit'] = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # 3. Store nested values (needs request.session.modified = True if changes occur inside nested structures)
    # request.session['user_preferences'] = {'theme': 'dark'}
    
    context = {
      'last_visit': last_visit,
      'visit_count': visit_count
    }
    return render(request, 'user_dashboard.html', context)`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Common Session Operations</h3>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', fontFamily: 'monospace', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div><strong style={{ color: '#0284c7' }}>request.session['key'] = 'val'</strong> — Write session key</div>
              <div><strong style={{ color: '#0284c7' }}>request.session.get('key', 'default')</strong> — Read session key safely</div>
              <div><strong style={{ color: '#0284c7' }}>del request.session['key']</strong> — Remove specific key from session</div>
              <div><strong style={{ color: '#0284c7' }}>request.session.clear()</strong> — Remove all variables from active session</div>
              <div><strong style={{ color: '#0284c7' }}>request.session.flush()</strong> — Delete session record from DB and clear cookie (logout safety)</div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('middleware_intro')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Introduction to Middleware <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. MIDDLEWARE INTRODUCTION ─────────────────────────────────── */}
      {activeTab === 'middleware_intro' && (
        <Section key="mw_intro" eyebrow="Django • Day 8 • Module 04" title="Understanding Middleware">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Middleware is a framework of hooks that allows you to execute code globally during the request-response cycle.</p>

            <div style={{ margin: '1.5rem 0', textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontSize: '0.8rem' }}>
                <span style={{ background: '#0284c7', color: 'white', padding: '6px 12px', borderRadius: 6, fontWeight: 700 }}>1. Incoming Request</span>
                <span style={{ color: '#64748b' }}>▼ passes through</span>
                <span style={{ border: '2px solid #7c3aed', color: '#7c3aed', padding: '6px 12px', borderRadius: 6, fontWeight: 700 }}>Security &amp; Session Middleware (Request Stage)</span>
                <span style={{ color: '#64748b' }}>▼ passes through</span>
                <span style={{ background: '#10b981', color: 'white', padding: '6px 12px', borderRadius: 6, fontWeight: 700 }}>Django View (Execution)</span>
                <span style={{ color: '#64748b' }}>▲ returns</span>
                <span style={{ border: '2px solid #7c3aed', color: '#7c3aed', padding: '6px 12px', borderRadius: 6, fontWeight: 700 }}>Session &amp; Security Middleware (Response Stage in Reverse)</span>
                <span style={{ color: '#64748b' }}>▲ returns</span>
                <span style={{ background: '#0f172a', color: 'white', padding: '6px 12px', borderRadius: 6, fontWeight: 700 }}>2. Client Browser</span>
              </div>
            </div>

            <p>Django reads middleware in the exact order they are listed in settings.py. For requests, it processes top-to-bottom. For responses, it processes bottom-to-top.</p>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('custom_middleware')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Custom Activity Middleware <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. CUSTOM MIDDLEWARE ───────────────────────────────────────── */}
      {activeTab === 'custom_middleware' && (
        <Section key="custom_mw" eyebrow="Django • Day 8 • Module 05" title="Implementing Custom Activity Middleware">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Let's create custom middleware to track the timestamp of a user's last activity. This is highly useful for checking active users or timing out inactive sessions.</p>

            <CodeBlock title="authen/middleware.py — Activity Tracking Middleware" code={`from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class UserActivityMiddleware:
    def __init__(self, get_response):
        # One-time configuration and initialization.
        self.get_response = get_response

    def __call__(self, request):
        # 1. Code executed on each request before the view is called.
        if request.user.is_authenticated:
            user = request.user.username
            path = request.path
            timestamp = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
            
            # Log visit details
            logger.info(f"User '{user}' visited '{path}' at {timestamp}")
            
            # Store timestamp directly in the session
            request.session['last_activity'] = timestamp

        # 2. Forward request to view
        response = self.get_response(request)

        # 3. Code executed on each response after the view is called.
        return response`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Registering the Middleware in settings.py</h3>
            <CodeBlock title="mysite/settings.py" code={`MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware', # Mandatory for session access
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware', # Mandatory for request.user
    'django.contrib.messages.middleware.MessageMiddleware',
    
    # Custom activity tracking middleware (Registered at the bottom)
    'authen.middleware.UserActivityMiddleware',
]`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_sessions')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Live Session &amp; Middleware Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. INTERACTIVE SESSIONS & MIDDLEWARE SANDBOX ───────────────── */}
      {activeTab === 'interactive_sessions' && (
        <Section key="sandbox" eyebrow="Django • Day 8 • Module 06" title="Interactive Session & Middleware Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Visit mock URLs and watch in real-time how session cookies, middleware intercept hooks, and the server-side database interact.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Client Simulator Panel */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Laptop size={16} /> Browser Client Simulator
                </h4>

                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 12px', display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.75rem', background: '#e2e8f0', padding: '2px 8px', borderRadius: 4, fontWeight: 700, color: '#475569' }}>URL</span>
                  <input type="text" readOnly value={`http://127.0.0.1:8000${currentPath}`} style={{ flexGrow: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', color: '#0f172a', fontFamily: 'monospace' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 12 }}>
                  <button onClick={() => visitPage('/user_dashboard/')} style={{ padding: '6px 8px', borderRadius: 6, background: '#0284c7', border: 'none', color: 'white', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}>
                    Visit /dashboard/
                  </button>
                  <button onClick={() => visitPage('/products/')} style={{ padding: '6px 8px', borderRadius: 6, background: '#0284c7', border: 'none', color: 'white', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}>
                    Visit /products/
                  </button>
                  <button onClick={() => visitPage('/profile/')} style={{ padding: '6px 8px', borderRadius: 6, background: '#0284c7', border: 'none', color: 'white', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}>
                    Visit /profile/
                  </button>
                </div>

                {/* Simulated cookies in browser storage */}
                <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 12px', fontSize: '0.74rem', marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, color: '#475569', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>🍪 Client Cookie Storage</span>
                  </div>
                  {Object.keys(cookies).length > 0 ? (
                    Object.entries(cookies).map(([k, v]) => (
                      <div key={k} style={{ fontFamily: 'monospace' }}>
                        <span style={{ color: '#0284c7' }}>{k}</span> = <span style={{ color: '#475569' }}>"{v}"</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>No session cookies found.</div>
                  )}
                </div>

                {/* Login controls */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {currentUser ? (
                    <>
                      <div style={{ fontSize: '0.8rem', color: '#0f172a' }}>
                        Logged in as: <strong style={{ color: '#7c3aed' }}>{currentUser}</strong>
                      </div>
                      <button onClick={handleLogout} style={{ marginLeft: 'auto', padding: '4px 8px', border: '1px solid #ef4444', color: '#ef4444', background: 'transparent', borderRadius: 6, fontSize: '0.7rem', cursor: 'pointer' }}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '0.8rem' }}>Log in as:</span>
                      <button onClick={() => handleLogin('alice')} style={{ padding: '4px 8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: '0.7rem', cursor: 'pointer' }}>alice</button>
                      <button onClick={() => handleLogin('bob')} style={{ padding: '4px 8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: '0.7rem', cursor: 'pointer' }}>bob</button>
                    </>
                  )}
                </div>
              </div>

              {/* Middleware & Server DB Monitor Panel */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '1rem', color: '#cbd5e1' }}>
                <h4 style={{ margin: '0 0 10px', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Database size={16} /> Server &amp; Database Monitor
                </h4>

                {/* Middleware switcher */}
                <div style={{ background: '#1e293b', padding: '6px 10px', borderRadius: 8, fontSize: '0.74rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span>Custom UserActivityMiddleware</span>
                  <button onClick={() => setMiddlewareEnabled(!middlewareEnabled)} style={{ padding: '3px 8px', border: 'none', background: middlewareEnabled ? '#10b981' : '#ef4444', color: 'white', fontWeight: 700, borderRadius: 4, cursor: 'pointer', fontSize: '0.7rem' }}>
                    {middlewareEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                {/* Session Database content */}
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: '0.74rem', marginBottom: 10 }}>
                  <div style={{ fontWeight: 800, color: '#94a3b8', marginBottom: 6, borderBottom: '1px solid #334155', paddingBottom: 4 }}>
                    💾 Database: django_session Table
                  </div>
                  {Object.keys(sessionDb).length > 0 ? (
                    Object.entries(sessionDb).map(([sessId, data]) => (
                      <div key={sessId} style={{ marginBottom: 6, fontFamily: 'monospace' }}>
                        <div style={{ color: '#38bdf8', fontWeight: 700 }}>session_key: "{sessId}"</div>
                        <div style={{ color: '#cbd5e1', paddingLeft: 8 }}>session_data: {JSON.stringify(data)}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#64748b', fontStyle: 'italic' }}>Session database table is empty.</div>
                  )}
                </div>

                {/* View output preview */}
                {currentPath === '/user_dashboard/' && (
                  <div style={{ background: '#1e293b', padding: '8px 12px', borderRadius: 8, borderLeft: '3.5px solid #10b981', fontSize: '0.74rem' }}>
                    <div style={{ fontWeight: 800, color: 'white', marginBottom: 4 }}>Template Render (user_dashboard.html)</div>
                    <div>last_visit: <span style={{ color: '#34d399' }}>{serverLastVisit}</span></div>
                    {middlewareEnabled && currentUser && sessionDb[cookies['sessionid']]?.last_activity && (
                      <div>last_activity: <span style={{ color: '#38bdf8' }}>{sessionDb[cookies['sessionid']].last_activity}</span></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Live Logs terminal */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
                <span>📜 Terminal Log Output (Request &amp; Response Loop)</span>
                <button onClick={() => setSandboxLogs([])} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.7rem' }}>Clear Logs</button>
              </div>
              <div style={{ maxHeight: 150, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {sandboxLogs.map((log, i) => {
                  let color = '#cbd5e1';
                  if (log.startsWith('[Request]')) color = '#f59e0b';
                  if (log.startsWith('[Cookie')) color = '#0284c7';
                  if (log.startsWith('[Session')) color = '#8b5cf6';
                  if (log.startsWith('[Auth')) color = '#3b82f6';
                  if (log.startsWith('[UserActivity')) color = '#10b981';
                  if (log.startsWith('[View]')) color = '#14b8a6';
                  return <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color }}>{log}</pre>;
                })}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. QUIZ ────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 8 Quiz — Session &amp; Cookies">
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
                      } else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0284c7'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #0284c7' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#0284c7', borderColor: '#0284c7', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 8. ASSIGNMENT ──────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 8 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Implement Session Visit Counters and Log User Activities</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Follow these steps to build session and custom middleware activity tracking:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Configure custom session parameters in <code>settings.py</code>: set <code>SESSION_COOKIE_AGE = 3600</code> (1 hour expiry) and enable <code>SESSION_SAVE_EVERY_REQUEST = True</code>.</li>
                <li>In your <code>views.py</code>, update the dashboard views to record and increment <code>request.session['visit_count']</code>. Display this count inside the <code>user_dashboard.html</code> template.</li>
                <li>Create <code>authen/middleware.py</code> and write the complete <code>UserActivityMiddleware</code> class setup with <code>__init__</code> and <code>__call__</code> hooks.</li>
                <li>Inside the middleware's call hook, use <code>request.user.is_authenticated</code> to retrieve the user's username, request path (<code>request.path</code>), and visit timestamp. Log this using Python's standard <code>logging</code> library.</li>
                <li>Save this visit timestamp directly in the session: <code>request.session['last_activity'] = timezone.now().strftime('%Y-%m-%d %H:%M:%S')</code>.</li>
                <li>Register the custom middleware path <code>'authen.middleware.UserActivityMiddleware'</code> at the end of the <code>MIDDLEWARE</code> list in <code>settings.py</code>.</li>
                <li>Update your templates (e.g. <code>user_dashboard.html</code>) to read and print <code>{"{{ request.session.last_activity }}"}</code> so users can see their last recorded timestamp.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Configuration Warning:</strong> Always place your custom middlewares after <code>SessionMiddleware</code> and <code>AuthenticationMiddleware</code>, as your middleware relies on <code>request.session</code> and <code>request.user</code> being initialized!
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#0284c7', borderColor: '#0284c7', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module9', 'intro_orm')}>
              Next: Day 9 — Django ORM, Aggregation &amp; Annotation <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
