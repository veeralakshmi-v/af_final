import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  Play, ArrowRight, Check, X, ShieldAlert, Laptop,
  Folder, File, ChevronRight, HelpCircle, Network, ZoomIn
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';
import djangoWorkflowImg from '../../assets/django_workflow_diagram.png';

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


export default function DjangoDay1({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module1', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const [isZoomed, setIsZoomed] = useState(false);
  const [isImgHovered, setIsImgHovered] = useState(false);

  /* ── Interactive Workspace states ── */
  const [terminalLogs, setTerminalLogs] = useState(['Type "python -m venv venv" to prepare virtual environment...']);
  const [cmdInput, setCmdInput] = useState('');
  const [activeFile, setActiveFile] = useState('welcome');
  
  // Project steps
  const [venvCreated, setVenvCreated] = useState(false);
  const [djangoInstalled, setDjangoInstalled] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [appCreated, setAppCreated] = useState(false);
  const [serverRunning, setServerRunning] = useState(false);

  // Editable Code Files
  const [viewsCode, setViewsCode] = useState(`# edit views.py code here\nfrom django.http import HttpResponse\n\ndef home(request):\n    return HttpResponse("Welcome to the Inventory System!")`);
  const [appUrlsCode, setAppUrlsCode] = useState(`# edit app-level urls.py code here\nfrom django.urls import path\nfrom .views import home\n\nurlpatterns = [\n    path('', home, name='home'),\n]`);
  const [projUrlsCode, setProjUrlsCode] = useState(`# edit project-level urls.py\nfrom django.contrib import admin\nfrom django.urls import path, include\n\nurlpatterns = [\n    path('admin/', admin.site.urls),\n    path('', include('invent_app.urls')),\n]`);
  const [settingsApps, setSettingsApps] = useState(`INSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    'invent_app',\n]`);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;

    let reply = '';
    if (cmd === 'python -m venv venv') {
      setVenvCreated(true);
      reply = 'venv created successfully.\nType "venv\\Scripts\\activate" (Windows) or "source venv/bin/activate" (Mac) to activate.';
    } else if (cmd === 'venv\\Scripts\\activate' || cmd === 'source venv/bin/activate') {
      if (!venvCreated) {
        reply = 'Error: Cannot activate virtual environment. Create it first using "python -m venv venv".';
      } else {
        reply = '(.venv) Activated virtual environment.\nType "pip install django" to download framework files.';
      }
    } else if (cmd === 'pip install django' || cmd === 'python -m pip install django') {
      if (!venvCreated) {
        reply = 'Error: Virtual environment not active. Run activation script first.';
      } else {
        setDjangoInstalled(true);
        reply = 'Collecting django...\nDownloading django-5.1.2...\nSuccessfully installed asgiref, django, pytz, sqlparse.\nType "django-admin startproject inventory" to build structure.';
      }
    } else if (cmd === 'django-admin startproject inventory') {
      if (!djangoInstalled) {
        reply = 'Error: django-admin command not found. Install django framework first.';
      } else {
        setProjectCreated(true);
        reply = 'Project directory "inventory" created.\nNavigate in using "cd inventory" and run "python manage.py startapp invent_app".';
      }
    } else if (cmd === 'cd inventory') {
      if (!projectCreated) {
        reply = 'Error: Folder "inventory" does not exist.';
      } else {
        reply = 'Changed directory to ./inventory/';
      }
    } else if (cmd === 'python manage.py startapp invent_app') {
      if (!projectCreated) {
        reply = 'Error: execute project creation first.';
      } else {
        setAppCreated(true);
        reply = 'App folder "invent_app" created.\nOpen views.py or urls.py in workspace above to design views, then run "python manage.py runserver".';
      }
    } else if (cmd === 'python manage.py runserver') {
      if (!appCreated) {
        reply = 'Error: configure project app components first.';
      } else {
        setServerRunning(true);
        reply = 'Watching for file changes...\nSystem check identified no issues.\nStarting development server at http://127.0.0.1:8000/\nQuit the server with CONTROL-C.';
      }
    } else {
      reply = `Command "${cmd}" not recognized in this Day 1 CLI tutorial session.`;
    }

    setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
    setCmdInput('');
  };

  /* ── Quiz States ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'Which Django app file resolves URL request targets and directs them to Python functions?',
      opts: ['models.py', 'urls.py', 'views.py', 'settings.py'], ans: 1,
      exp: 'urls.py matches incoming URL endpoints and points them to their corresponding handlers in views.py.' },
    { k: 'q2', q: 'What is the correct order of command line setups to initialize a Django app?',
      opts: [
        'startproject -> startapp -> runserver',
        'runserver -> startapp -> startproject',
        'startapp -> startproject -> runserver',
        'pip install -> runserver -> startapp'
      ], ans: 0,
      exp: 'First build the main project boundary (startproject), then add custom modular folders (startapp), and finally run local development servers (runserver).' },
    { k: 'q3', q: 'Where do you register newly created modular application names in Django?',
      opts: ['urls.py under urlpatterns', 'views.py import headers', 'settings.py inside INSTALLED_APPS', 'manage.py configurations'], ans: 2,
      exp: 'All custom apps must be appended as string literals in settings.py inside the INSTALLED_APPS list so the framework loads them.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">
      {/* ── 1. INTRODUCTION ─────────────────────────────────────────────── */}
      {activeTab === 'intro_django' && (
        <Section key="intro_django" eyebrow="Django • Day 1 • Module 01" title="Introduction to Django">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: 'linear-gradient(135deg,#0284c7,#0369a1)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🔌 The Python Web Framework</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                <strong>Django</strong> (pronounced "Jango") is a high-level, open-source Python web framework first released in 2005. It encourages rapid development and clean, pragmatic design, handling much of the hassle of web development so developers can focus on writing app logic.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>🔄 The MVT Django Workflow</h3>
            
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
              <div 
                onClick={() => setIsZoomed(true)}
                onMouseEnter={() => setIsImgHovered(true)}
                onMouseLeave={() => setIsImgHovered(false)}
                style={{ 
                  maxWidth: '480px',
                  width: '100%',
                  borderRadius: 12, 
                  overflow: 'hidden', 
                  border: '1px solid #cbd5e1', 
                  boxShadow: isImgHovered 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
                    : '0 4px 6px -1px rgba(0,0,0,0.05)',
                  cursor: 'zoom-in',
                  position: 'relative',
                  backgroundColor: 'white',
                  transform: isImgHovered ? 'scale(1.015)' : 'scale(1)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <img src={djangoWorkflowImg} alt="Django MVT Workflow Infographic" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: 'white',
                  padding: '6px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  pointerEvents: 'none',
                  opacity: isImgHovered ? 1 : 0.85,
                  transition: 'opacity 0.2s'
                }}>
                  <ZoomIn size={14} /> Click to expand
                </div>
              </div>
            </div>

            <p>Django follows the <strong>Model-View-Template (MVT)</strong> architecture pattern to handle server requests:</p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ background: '#0ea5e9', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>1</span>
                <div>
                  <strong>URL Routing (urls.py)</strong>: When a client browser requests a path (e.g., <code>/tutorials</code>), Django checks <code>urls.py</code> to see which python view function handles it.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ background: '#0ea5e9', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>2</span>
                <div>
                  <strong>Views Controller (views.py)</strong>: The matched view function runs. It performs backend logic, retrieves data from the database Model, and packages it.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ background: '#0ea5e9', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>3</span>
                <div>
                  <strong>Model & Templates (models.py / html templates)</strong>: Models fetch dynamic database entries, while HTML template sheets style and render content responses back to the client.
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('env_setup')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsZoomed(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'zoom-out',
                  padding: '2rem'
                }}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  style={{
                    position: 'relative',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={djangoWorkflowImg}
                    alt="Django MVT Workflow Infographic (Zoomed)"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '85vh',
                      objectFit: 'contain',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  <button
                    onClick={() => setIsZoomed(false)}
                    style={{
                      position: 'absolute',
                      top: '-40px',
                      right: '0px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Section>
      )}

      {/* ── 2. VIRTUAL ENVIRONMENT & INSTALL ────────────────────────────── */}
      {activeTab === 'env_setup' && (
        <Section key="env_setup" eyebrow="Django • Day 1 • Module 02" title="Virtual Environment & Installation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>To avoid package collisions between projects, always run Django applications within a dedicated <strong>Virtual Environment</strong>:</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Create & Activate Virtual Environment</h3>
            <CodeBlock title="Create virtual env command line" code={`# 1. Create a virtual environment named "venv"
python -m venv venv

# 2. Activate environment on Windows:
venv\\Scripts\\activate

# Or activate environment on macOS / Linux:
source venv/bin/activate`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Install Django using pip</h3>
            <p>Once the environment is active (indicated by a <code>(.venv)</code> prefix in your terminal), install Django:</p>
            <CodeBlock title="pip command" code={`# Upgrade pip installation package
python -m pip install --upgrade pip

# Install Django framework files
pip install django

# Verify successful installation and version
python -m django --version`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('project_app')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. PROJECT & APP CREATION ──────────────────────────────────── */}
      {activeTab === 'project_app' && (
        <Section key="project_app" eyebrow="Django • Day 1 • Module 03" title="Project & App Creation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Scaffold a Django Project</h3>
            <p>Create the main configuration boundary for your web project (e.g. <code>inventory</code>) using `django-admin`:</p>
            <CodeBlock title="Project creation command" code={`# Creates a folder "inventory" with project config settings
django-admin startproject inventory

# Navigate into project directory
cd inventory`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Project Folder Structure</h3>
            <pre style={{ background: '#f8fafc', padding: 12, border: '1px solid #cbd5e1', borderRadius: 8, fontSize: '0.82rem', fontFamily: 'monospace' }}>
{`inventory/
├── manage.py             # CLI commands file (runs server, migrations)
└── inventory/            # Configuration directory
    ├── __init__.py
    ├── settings.py       # Global database, apps registry configurations
    ├── urls.py           # Project level URL mapping routes
    ├── wsgi.py
    └── asgi.py`}
            </pre>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Create a Django Application App</h3>
            <p>A project is divided into modular **Apps** that handle specific features (e.g. <code>invent_app</code>):</p>
            <CodeBlock title="Create application command" code={`# Run manage.py CLI command to create an app
python manage.py startapp invent_app`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>App Folder Structure</h3>
            <pre style={{ background: '#f8fafc', padding: 12, border: '1px solid #cbd5e1', borderRadius: 8, fontSize: '0.82rem', fontFamily: 'monospace' }}>
{`invent_app/
├── admin.py
├── apps.py
├── models.py             # Database structures
├── tests.py
├── views.py              # Requests logic handler views functions
└── migrations/`}
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('views_urls')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. VIEWS, URLS & LIVE WORKSPACE SIMULATOR ───────────────────── */}
      {activeTab === 'views_urls' && (
        <Section key="views_urls" eyebrow="Django • Day 1 • Module 04" title="Views, URL Mapping & Server">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <p>Now configuration is complete. To respond with standard string messages, we register app routing structures across 4 files:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>
                <strong>settings.py</strong>: Add app key name to <code>INSTALLED_APPS</code>.
              </div>
              <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>
                <strong>views.py</strong>: Write view responses using <code>HttpResponse</code>.
              </div>
              <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>
                <strong>app urls.py</strong>: Define route paths pointing to view functions.
              </div>
              <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.8rem' }}>
                <strong>project urls.py</strong>: Include app URL patterns inside main configuration list.
              </div>
            </div>

            {/* Simulated interactive workspace */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>💻 Live Django Workspace & CLI Simulator</h3>
            <p style={{ fontSize: '0.85rem', margin: '0 0 1rem' }}>Operate the simulated Django directory by typing terminal setups or editing views/url routes:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden', minHeight: 380, background: '#f8fafc', marginBottom: '1.5rem' }}>
              {/* Sidebar directory tree */}
              <div style={{ background: '#1e293b', padding: '1rem', color: '#cbd5e1', borderRight: '1px solid #334155' }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700, marginBottom: 12 }}>Django Files Workspace</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f8fafc', fontWeight: 'bold' }}>
                    <Folder size={14} color="#38bdf8" /> <span>inventory/ (Root)</span>
                  </div>

                  {projectCreated && (
                    <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'bold' }}>
                        <Folder size={14} color="#38bdf8" /> <span>inventory/ (Settings)</span>
                      </div>
                      <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button onClick={() => setActiveFile('settings')} style={{ background: 'transparent', border: 'none', color: activeFile === 'settings' ? '#38bdf8' : '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontStyle: 'monospace', fontSize: '0.78rem' }}>
                          <File size={12} /> settings.py
                        </button>
                        <button onClick={() => setActiveFile('proj_urls')} style={{ background: 'transparent', border: 'none', color: activeFile === 'proj_urls' ? '#38bdf8' : '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontStyle: 'monospace', fontSize: '0.78rem' }}>
                          <File size={12} /> urls.py
                        </button>
                      </div>
                    </div>
                  )}

                  {appCreated && (
                    <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'bold' }}>
                        <Folder size={14} color="#38bdf8" /> <span>invent_app/ (App)</span>
                      </div>
                      <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button onClick={() => setActiveFile('views')} style={{ background: 'transparent', border: 'none', color: activeFile === 'views' ? '#38bdf8' : '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontStyle: 'monospace', fontSize: '0.78rem' }}>
                          <File size={12} /> views.py
                        </button>
                        <button onClick={() => setActiveFile('app_urls')} style={{ background: 'transparent', border: 'none', color: activeFile === 'app_urls' ? '#38bdf8' : '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontStyle: 'monospace', fontSize: '0.78rem' }}>
                          <File size={12} /> urls.py
                        </button>
                      </div>
                    </div>
                  )}

                  {projectCreated && (
                    <div style={{ paddingLeft: 12, display: 'flex', alignItems: 'center', gap: 6, fontStyle: 'monospace', fontSize: '0.78rem', color: '#94a3b8' }}>
                      <File size={12} /> manage.py
                    </div>
                  )}
                </div>
              </div>

              {/* Code Editor and output frame */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#0f172a', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#94a3b8', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Editor File Preview: <strong>{activeFile === 'welcome' ? 'Welcome.txt' : `${activeFile}.py`}</strong></span>
                  {activeFile !== 'welcome' && <span style={{ fontSize: '0.72rem', color: '#10b981' }}>● Edited Live</span>}
                </div>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 200 }}>
                  {activeFile === 'welcome' && (
                    <div style={{ padding: '1.5rem', color: '#475569', fontSize: '0.85rem' }}>
                      <h4 style={{ margin: '0 0 8px', color: '#0f172a' }}>Simulated Workspace Overview</h4>
                      <p>Run directory initialization commands in the terminal block below to scaffold files. Once folders appear, click settings.py, views.py, or urls.py in the workspace list to view or edit their configurations!</p>
                    </div>
                  )}

                  {activeFile === 'settings' && (
                    <textarea className="form-control" value={settingsApps} onChange={e => setSettingsApps(e.target.value)}
                      style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.8rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12 }} />
                  )}

                  {activeFile === 'views' && (
                    <textarea className="form-control" value={viewsCode} onChange={e => setViewsCode(e.target.value)}
                      style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.8rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12 }} />
                  )}

                  {activeFile === 'app_urls' && (
                    <textarea className="form-control" value={appUrlsCode} onChange={e => setAppUrlsCode(e.target.value)}
                      style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.8rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12 }} />
                  )}

                  {activeFile === 'proj_urls' && (
                    <textarea className="form-control" value={projUrlsCode} onChange={e => setProjUrlsCode(e.target.value)}
                      style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.8rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12 }} />
                  )}
                </div>

                {/* Simulated Localhost Frame */}
                {serverRunning && (
                  <div style={{ borderTop: '2px solid #cbd5e1', background: 'white', padding: '10px' }}>
                    <div style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 4, marginBottom: 6, fontSize: '0.74rem', border: '1px solid #cbd5e1' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div>
                      <span>Simulated Web Browser: http://127.0.0.1:8000/</span>
                    </div>
                    <div style={{ border: '1px dashed #cbd5e1', padding: '14px', borderRadius: 6, background: '#f8fafc', fontSize: '0.88rem', color: '#0f172a', fontWeight: 'bold' }}>
                      {/* Check if app registry and url include match up correctly */}
                      {viewsCode.includes('Welcome to the Inventory System') && settingsApps.includes('invent_app') && projUrlsCode.includes('invent_app.urls') ? (
                        <span style={{ color: '#0369a1' }}>Welcome to the Inventory System!</span>
                      ) : (
                        <div style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'normal' }}>
                          <strong>HTTP 404 NOT FOUND</strong> or <strong>AppConfig Error</strong>. Check settings.py installed app list and project-level URL include routing directives.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Simulated Terminal console input */}
                <div style={{ background: '#0f172a', padding: '8px 12px', borderTop: '1px solid #1e293b' }}>
                  <div style={{ maxHeight: 90, overflowY: 'auto', marginBottom: 6, fontFamily: 'monospace', fontSize: '0.74rem', color: '#94a3b8' }}>
                    {terminalLogs.map((log, index) => (
                      <pre key={index} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('Error') ? '#fca5a5' : log.startsWith('>') ? '#e2e8f0' : '#86efac' }}>{log}</pre>
                    ))}
                  </div>
                  <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: 6 }}>
                    <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', alignSelf: 'center' }}>$</span>
                    <input className="form-control" type="text" value={cmdInput} onChange={e => setCmdInput(e.target.value)} placeholder="Type a CLI setup command..."
                      style={{ background: '#1e293b', border: 'none', color: 'white', fontFamily: 'monospace', fontSize: '0.8rem', padding: '4px 8px', flexGrow: 1 }} />
                  </form>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 1 Quiz — Django Basics">
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
                      } else if (selected) { bg = '#f0f9ff'; border = '1.5px solid #0ea5e9'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #0ea5e9' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#0ea5e9', borderColor: '#0ea5e9', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENT ──────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 1 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Setting up an Inventory server</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Complete the following steps on your local system using Django tools:</p>
              
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Configure a python virtual environment folder: <code>python -m venv venv</code>.</li>
                <li>Activate virtual environment controls, and run: <code>pip install django</code>.</li>
                <li>Create a skeleton directory wrapper: <code>django-admin startproject inventory</code>.</li>
                <li>Construct a modular inventory app component: <code>python manage.py startapp invent_app</code>.</li>
                <li>Add <code>'invent_app',</code> to settings.py <code>INSTALLED_APPS</code>.</li>
                <li>Write a home view function in invent_app <code>views.py</code>, register an app-level <code>urls.py</code>, and link it inside the project configuration.</li>
                <li>Launch the local host pipeline: <code>python manage.py runserver</code>. Check <code>http://127.0.0.1:8000/</code> in your browser!</li>
              </ol>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#b45309', marginBottom: '1.5rem' }}>
              <ShieldAlert size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.78rem' }}><strong>Self-Check</strong>: Make sure to type include paths carefully inside settings and urls! Any syntax typos will trigger compilation errors on runserver launch.</span>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('django_module2', 'intro_templates')}>
              Go to Day 2 - Templates & Static Files <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
