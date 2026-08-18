import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  Play, ArrowRight, Check, X, ShieldAlert, Laptop,
  Folder, File, ChevronRight, HelpCircle, Network, ZoomIn
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

export default function DjangoDay2({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module2', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Interactive Workspace states ── */
  const [activeFile, setActiveFile] = useState('views');
  const [serverRunning, setServerRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(['Type "python manage.py runserver" to launch the development server...']);
  const [cmdInput, setCmdInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState('http://127.0.0.1:8000/dashboard/');

  // Editable Code Files
  const [viewsCode, setViewsCode] = useState(`from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Inventory System!")

def dashboard(request):
    products = [
        {'name': 'Laptop', 'quantity': 10},
        {'name': 'Keyboard', 'quantity': 5},
        {'name': 'Mouse', 'quantity': 20},
    ]
    return render(request, 'inventory/dashboard.html', {'products': products})`);

  const [urlsCode, setUrlsCode] = useState(`from django.urls import path
from invent_app import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
]`);

  const [settingsCode, setSettingsCode] = useState(`# settings.py configurations
import os
BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
            ],
        },
    },
]

STATIC_URL = 'static/'
STATIC_DIRS = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    STATIC_DIRS,
]`);

  const [baseHtmlCode, setBaseHtmlCode] = useState(`<!DOCTYPE html>
{% load static %}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Inventory Dashboard{% endblock %}</title>
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
</head>
<body>
    <header>
        <h1>Inventory Management System</h1>
    </header>
    <main>
        {% block content %}{% endblock %}
    </main>
    <footer>
        <p>&copy; 2024 Inventory Management</p>
    </footer>
</body>
</html>`);

  const [dashboardHtmlCode, setDashboardHtmlCode] = useState(`{% extends 'inventory/base.html' %}

{% block title %}Dashboard{% endblock %}

{% block content %}
  <h2>Welcome to the Inventory Dashboard</h2>
  <ul class="nav-links">
    <li><a href="#">View Products</a></li>
    <li><a href="#">Add New Product</a></li>
    <li><a href="#">Manage Stock</a></li>
  </ul>
  
  <div class="product-section">
    <h3>Product Inventory</h3>
    <ul class="product-list">
      {% for product in products %}
        <li><strong>{{ product.name }}</strong> - Quantity: {{ product.quantity }}</li>
      {% endfor %}
    </ul>
  </div>

  {% if products %}
    <p class="status success">We have products in stock.</p>
  {% else %}
    <p class="status alert">No products available.</p>
  {% endif %}
{% endblock %}`);

  const [styleCssCode, setStyleCssCode] = useState(`body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
header {
    background-color: #333;
    color: white;
    padding: 15px;
    text-align: center;
}
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
}`);

  // Parsing helper to show real-time changes in viewsCode products list
  const parseProductsList = () => {
    try {
      // Find products definition
      const startIdx = viewsCode.indexOf('products = [');
      if (startIdx === -1) return [];
      const endIdx = viewsCode.indexOf(']', startIdx);
      const listStr = viewsCode.substring(startIdx, endIdx + 1);
      
      // Parse individual dicts using regex
      const regex = /\{\s*'name'\s*:\s*'([^']*)'\s*,\s*'quantity'\s*:\s*(\d+)\s*\}/g;
      const parsed = [];
      let match;
      while ((match = regex.exec(listStr)) !== null) {
        parsed.push({ name: match[1], quantity: parseInt(match[2]) });
      }
      return parsed.length ? parsed : [
        { name: 'Laptop', quantity: 10 },
        { name: 'Keyboard', quantity: 5 },
        { name: 'Mouse', quantity: 20 }
      ];
    } catch (e) {
      return [
        { name: 'Laptop', quantity: 10 },
        { name: 'Keyboard', quantity: 5 },
        { name: 'Mouse', quantity: 20 }
      ];
    }
  };

  // Parsing style configurations
  const parseCSSStyles = () => {
    try {
      const styles = {};
      const headerBgMatch = styleCssCode.match(/header\s*\{[^}]*background-color:\s*([^;}]*)/);
      if (headerBgMatch) styles.headerBg = headerBgMatch[1].trim();
      const bodyBgMatch = styleCssCode.match(/body\s*\{[^}]*background-color:\s*([^;}]*)/);
      if (bodyBgMatch) styles.bodyBg = bodyBgMatch[1].trim();
      const headerColorMatch = styleCssCode.match(/header\s*\{[^}]*color:\s*([^;}]*)/);
      if (headerColorMatch) styles.headerColor = headerColorMatch[1].trim();
      return styles;
    } catch (e) {
      return {};
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;

    let reply = '';
    if (cmd === 'python manage.py runserver') {
      setServerRunning(true);
      reply = 'Watching for file changes...\nSystem check identified no issues.\nStarting development server at http://127.0.0.1:8000/\nQuit the server with CONTROL-C.';
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setCmdInput('');
      return;
    } else {
      reply = `Command "${cmd}" not recognized. Run "python manage.py runserver" to test templates.`;
    }

    setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
    setCmdInput('');
  };

  // Parsing HTML welcome header
  const parseHeaderTitle = () => {
    const match = baseHtmlCode.match(/<h1>([^<]*)<\/h1>/);
    return match ? match[1].trim() : 'Inventory Management System';
  };

  /* ── Quiz States ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'What is the key difference between MVC and MVT patterns in Django?',
      opts: [
        'MVT replaces views with templates',
        'In MVT, the framework itself acts as the controller, routing URLs to views',
        'MVT does not use database models',
        'MVC does not use views'
      ], ans: 1,
      exp: 'In Django\'s MVT pattern, Django handles the controller role, mapping URLs directly to views, which query models and return templates.' },
    { k: 'q2', q: 'In Django settings.py, which list variable registration must contain your custom template directories?',
      opts: ['STATICFILES_DIRS', 'TEMPLATESDIRS', 'TEMPLATES inside the \'DIRS\' key', 'INSTALLED_APPS'], ans: 2,
      exp: 'To configure Django to find templates, you add the path (e.g. os.path.join(BASE_DIR, \'templates\')) to the DIRS list inside the TEMPLATES configuration.' },
    { k: 'q3', q: 'What is the correct syntax tag to iterate over a list in a Django template?',
      opts: [
        '{{ for product in products }} ... {{ endfor }}',
        '{% for product in products %} ... {% endfor %}',
        '[% for product in products %] ... [% endfor %]',
        '<django-for product in products> ... </django-for>'
      ], ans: 1,
      exp: 'Django templates use control tags enclosed in {% %} for logic, loops, and block definitions.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">
      {/* ── 1. INTRODUCTION ─────────────────────────────────────────────── */}
      {activeTab === 'intro_templates' && (
        <Section key="intro" eyebrow="Django • Day 2 • Module 01" title="Templates & MVT Architecture">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🖥️ What is a Django Template?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                A Django Template is a text file (usually HTML) that separates the visual representation of data from the business logic. It generates dynamic HTML pages dynamically using placeholder variables and control blocks that are processed before being sent to the browser.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>🔄 MVC vs MVT Architecture</h3>
            <p>Django uses a variation of the classic MVC (Model-View-Controller) design pattern called <strong>MVT (Model-View-Template)</strong>:</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.5rem 0', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Component</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>MVT Mapping</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Model</td>
                  <td style={{ padding: '10px', color: '#0d9488', fontWeight: 600 }}>models.py</td>
                  <td style={{ padding: '10px' }}>Handles data structures, storage, database schemas, and data relationships.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>View</td>
                  <td style={{ padding: '10px', color: '#0d9488', fontWeight: 600 }}>views.py</td>
                  <td style={{ padding: '10px' }}>Acts as the bridge/controller. Processes requests, fetches models, and renders templates.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Template</td>
                  <td style={{ padding: '10px', color: '#0d9488', fontWeight: 600 }}>HTML files</td>
                  <td style={{ padding: '10px' }}>Manages user interaction and UI logic. Takes variables and renders user-facing outputs.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Controller</td>
                  <td style={{ padding: '10px', color: '#0f766e', fontWeight: 600 }}>Django Framework</td>
                  <td style={{ padding: '10px' }}>Django itself handles routing requests to the views, acting as the system controller.</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('setup_templates')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Directory Setup <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. DIRECTORY SETUP ─────────────────────────────────────────────── */}
      {activeTab === 'setup_templates' && (
        <Section key="setup" eyebrow="Django • Day 2 • Module 02" title="Setting Up Templates">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>1. Create the Templates Folder Structure</h3>
            <p>To keep templates structured and organized, Django looks inside app folders by default if configured. Follow this structure inside your project:</p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', border: '1px solid #cbd5e1', borderRadius: 12, margin: '1.2rem 0' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#334155' }}>
                inventory/ <span style={{ color: '#64748b' }}># Main App directory</span><br />
                ├── templates/<br />
                │   └── inventory/ <span style={{ color: '#0d9488' }}># Namespaced folder (prevents file naming conflicts)</span><br />
                │       └── base.html<br />
                │       └── dashboard.html<br />
                └── views.py
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>2. Configure settings.py TEMPLATES</h3>
            <p>Open <code>settings.py</code> and make sure the <code>DIRS</code> parameter tells Django to search your global templates folder path:</p>

            <CodeBlock title="settings.py" code={`import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')], # Add this directory path
        'APP_DIRS': True, # Tells Django to search inside each app directory's templates/ folder
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('base_template')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Base Template <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. BASE TEMPLATE ─────────────────────────────────────────────── */}
      {activeTab === 'base_template' && (
        <Section key="base" eyebrow="Django • Day 2 • Module 03" title="Base Template (Layout Inheritance)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Creating base.html</h3>
            <p>Django supports <strong>template inheritance</strong>. This lets you write a single, reusable layout file (e.g. header, navigation bar, footer) and inject page-specific blocks dynamically.</p>

            <CodeBlock title="templates/inventory/base.html" language="html" code={`<!DOCTYPE html>
{% load static %}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Inventory System{% endblock %}</title>
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
</head>
<body>
    <header>
        <h1>Inventory Management System</h1>
    </header>

    <main style="padding: 20px;">
        <!-- Page contents get dynamically injected here -->
        {% block content %}
        {% endblock %}
    </main>

    <footer>
        <p>&copy; 2024 Inventory Management</p>
    </footer>
</body>
</html>`} />

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#166534', marginTop: '1.5rem' }}>
              <CheckCircle size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem' }}>
                <strong>Key Tag:</strong> <code>{"{% block content %}{% endblock %}"}</code> acts as an insertion marker. Child templates will override this block to insert content.
              </span>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('template_tags')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Template Tags <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. TEMPLATE TAGS ─────────────────────────────────────────────── */}
      {activeTab === 'template_tags' && (
        <Section key="tags" eyebrow="Django • Day 2 • Module 04" title="Django Template Tags & Logic">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django templates allow you to run logic (like loops and conditions) directly inside HTML using control tags:</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>1. Loop Tags</h3>
            <p>To iterate over collections sent from views (e.g. list of dictionaries):</p>
            <CodeBlock title="Loops Syntax" language="html" code={`<ul>
  {% for product in products %}
    <li>{{ product.name }} - Quantity: {{ product.quantity }}</li>
  {% endfor %}
</ul>`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>2. Condition Tags</h3>
            <p>To conditionally render text blocks or warnings:</p>
            <CodeBlock title="Conditional Syntax" language="html" code={`{% if products %}
  <p>We have products in stock.</p>
{% else %}
  <p>No products available.</p>
{% endif %}`} />

            <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#9d174d', marginTop: '1.5rem' }}>
              <ShieldAlert size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem' }}>
                <strong>Important Syntax rule:</strong> Control tags like <code>{"{% for %}"}</code> or <code>{"{% if %}"}</code> must always be closed with <code>{"{% endfor %}"}</code> and <code>{"{% endif %}"}</code>.
              </span>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('child_template')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Child Template <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. CHILD TEMPLATE ─────────────────────────────────────────────── */}
      {activeTab === 'child_template' && (
        <Section key="child" eyebrow="Django • Day 2 • Module 05" title="Child Templates (Inheritance)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>A child template extends a parent base file and overrides its block markers. This avoids repeating base header/footer html code on every new site page.</p>

            <CodeBlock title="templates/inventory/dashboard.html" language="html" code={`{% extends 'inventory/base.html' %}

{% block title %}Dashboard{% endblock %}

{% block content %}
  <h2>Welcome to the Inventory Dashboard</h2>
  <ul class="nav-links">
    <li><a href="#">View Products</a></li>
    <li><a href="#">Add New Product</a></li>
    <li><a href="#">Manage Stock</a></li>
  </ul>
  
  <div class="product-section">
    <h3>Product Inventory</h3>
    <ul class="product-list">
      {% for product in products %}
        <li><strong>{{ product.name }}</strong> - Quantity: {{ product.quantity }}</li>
      {% endfor %}
    </ul>
  </div>

  {% if products %}
    <p class="status success">We have products in stock.</p>
  {% else %}
    <p class="status alert">No products available.</p>
  {% endif %}
{% endblock %}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('static_files')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Static Files <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. STATIC FILES ─────────────────────────────────────────────── */}
      {activeTab === 'static_files' && (
        <Section key="static" eyebrow="Django • Day 2 • Module 06" title="Static Files & CSS Stylesheets">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>1. Static Folder Structure</h3>
            <p>CSS, JavaScript, and asset images are static files. Inside your app directory, create a folder named <code>static</code>:</p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', border: '1px solid #cbd5e1', borderRadius: 12, margin: '1.2rem 0' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#334155' }}>
                inventory/<br />
                └── static/<br />
                │   └── css/<br />
                │       └── style.css
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>2. Configure static paths in settings.py</h3>
            <CodeBlock title="settings.py static config" code={`STATIC_URL = 'static/'

# Tells Django where to look for global static assets during development
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>3. Load static tags in HTML</h3>
            <p>At the very top of your HTML templates, you must add <code>{"{% load static %}"}</code> to activate the static asset loader. Then, link CSS files using the loader tag syntax:</p>
            <CodeBlock title="Loading Stylesheet" language="html" code={`{% load static %}
<link rel="stylesheet" href="{% static 'css/style.css' %}">`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('routing_views')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Routing & Views <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. ROUTING & VIEWS (INTERACTIVE WORKSPACE) ────────────────── */}
      {activeTab === 'routing_views' && (
        <Section key="routing" eyebrow="Django • Day 2 • Module 07" title="Interactive Workspace: Templates & URL Routing">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>
              Verify your templates setup using the interactive code files explorer below. Type <code>python manage.py runserver</code> in the terminal to view your styled layout preview!
            </p>

            <div style={{ background: '#e2e8f0', borderRadius: 16, padding: '1rem', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', minHeight: 380 }}>
                {/* File Tree Explorer */}
                <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>📁 inventory_project</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <button onClick={() => setActiveFile('settings')} style={{ background: activeFile === 'settings' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#0284c7" /> settings.py
                    </button>
                    <button onClick={() => setActiveFile('views')} style={{ background: activeFile === 'views' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#059669" /> views.py
                    </button>
                    <button onClick={() => setActiveFile('urls')} style={{ background: activeFile === 'urls' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#f43f5e" /> urls.py
                    </button>
                    
                    <div style={{ fontWeight: 800, fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', marginBottom: '0.2rem' }}>📁 templates/</div>
                    <button onClick={() => setActiveFile('base')} style={{ background: activeFile === 'base' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155', paddingLeft: 16 }}>
                      <File size={14} color="#eab308" /> base.html
                    </button>
                    <button onClick={() => setActiveFile('dashboard')} style={{ background: activeFile === 'dashboard' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155', paddingLeft: 16 }}>
                      <File size={14} color="#eab308" /> dashboard.html
                    </button>

                    <div style={{ fontWeight: 800, fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', marginBottom: '0.2rem' }}>📁 static/css/</div>
                    <button onClick={() => setActiveFile('style')} style={{ background: activeFile === 'style' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155', paddingLeft: 16 }}>
                      <File size={14} color="#8b5cf6" /> style.css
                    </button>
                  </div>
                </div>

                {/* Editor & Web Browser Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: 8, border: '1px solid #1e293b', overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.76rem', color: '#cbd5e1', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>✏️ Interactive File Editor ({activeFile === 'settings' ? 'settings.py' : activeFile === 'views' ? 'views.py' : activeFile === 'urls' ? 'urls.py' : activeFile === 'base' ? 'base.html' : activeFile === 'dashboard' ? 'dashboard.html' : 'style.css'})</span>
                    <span style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, color: '#8b949e', fontSize: '0.7rem' }}>auto-saved</span>
                  </div>

                  {/* Code Editors */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {activeFile === 'views' && (
                      <textarea className="form-control" value={viewsCode} onChange={e => setViewsCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'urls' && (
                      <textarea className="form-control" value={urlsCode} onChange={e => setUrlsCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'settings' && (
                      <textarea className="form-control" value={settingsCode} onChange={e => setSettingsCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'base' && (
                      <textarea className="form-control" value={baseHtmlCode} onChange={e => setBaseHtmlCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'dashboard' && (
                      <textarea className="form-control" value={dashboardHtmlCode} onChange={e => setDashboardHtmlCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'style' && (
                      <textarea className="form-control" value={styleCssCode} onChange={e => setStyleCssCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                  </div>

                  {/* Dynamic Browser Preview Frame */}
                  {serverRunning && (
                    <div style={{ borderTop: '2px solid #cbd5e1', background: 'white', padding: '10px' }}>
                      <div style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 4, marginBottom: 6, fontSize: '0.74rem', border: '1px solid #cbd5e1' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div>
                        <input 
                          type="text" 
                          value={previewUrl} 
                          onChange={(e) => setPreviewUrl(e.target.value)} 
                          style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#334155', fontWeight: 600 }}
                        />
                      </div>

                      {/* Mocked Browser Viewport Output */}
                      <div style={{ 
                        border: '1px solid #cbd5e1', 
                        borderRadius: 6, 
                        background: parseCSSStyles().bodyBg || '#f4f4f4', 
                        fontFamily: 'Arial, sans-serif',
                        color: '#0f172a',
                        overflow: 'hidden'
                      }}>
                        {previewUrl === 'http://127.0.0.1:8000/dashboard/' ? (
                          <div>
                            {/* Header */}
                            <header style={{ 
                              background: parseCSSStyles().headerBg || '#333', 
                              color: parseCSSStyles().headerColor || 'white', 
                              padding: '12px', 
                              textAlign: 'center' 
                            }}>
                              <h1 style={{ margin: 0, fontSize: '1.2rem' }}>{parseHeaderTitle()}</h1>
                            </header>
                            
                            {/* Main Content Body */}
                            <div style={{ padding: '16px', minHeight: '140px', background: '#ffffff', margin: '10px', borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#1e293b' }}>Welcome to the Inventory Dashboard</h3>
                              <ul style={{ display: 'flex', gap: '10px', padding: 0, margin: '0 0 15px 0', listStyle: 'none', fontSize: '0.75rem' }}>
                                <li><span style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>View Products</span></li>
                                <li><span style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>Add New Product</span></li>
                                <li><span style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>Manage Stock</span></li>
                              </ul>

                              <h4 style={{ margin: '0 0 6px 0', fontSize: '0.88rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Product Inventory</h4>
                              <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '0.8rem', lineHeight: '1.5' }}>
                                {parseProductsList().map((p, idx) => (
                                  <li key={idx}><strong>{p.name}</strong> - Quantity: {p.quantity}</li>
                                ))}
                              </ul>

                              {parseProductsList().length > 0 ? (
                                <p style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '0.78rem', margin: '12px 0 0 0' }}>✓ We have products in stock.</p>
                              ) : (
                                <p style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.78rem', margin: '12px 0 0 0' }}>✗ No products available.</p>
                              )}
                            </div>

                            {/* Footer */}
                            <footer style={{ 
                              background: parseCSSStyles().headerBg || '#333', 
                              color: 'white', 
                              textAlign: 'center', 
                              padding: '8px', 
                              fontSize: '0.7rem' 
                            }}>
                              <p style={{ margin: 0 }}>&copy; 2024 Inventory Management</p>
                            </footer>
                          </div>
                        ) : previewUrl === 'http://127.0.0.1:8000/home/' ? (
                          <div style={{ padding: '20px', background: 'white', minHeight: '120px', fontSize: '0.9rem' }}>
                            Welcome to the Inventory System!
                          </div>
                        ) : (
                          <div style={{ padding: '20px', background: '#ffffcc', color: '#7a2200', border: '1px solid #ffd8b1', fontSize: '0.85rem' }}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#b91c1c' }}>Page not found (404)</h3>
                            <p style={{ margin: 0 }}>Using the URLconf defined in <code>inventory.urls</code>, Django tried URL patterns in this order:</p>
                            <ol style={{ marginTop: '6px', fontSize: '0.78rem' }}>
                              <li>home/</li>
                              <li>dashboard/</li>
                            </ol>
                            <p style={{ marginTop: '8px', fontSize: '0.78rem', margin: 0 }}>The current path, <code>{previewUrl.replace('http://127.0.0.1:8000', '')}</code>, didn't match any of these.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Simulated Terminal console input */}
                  <div style={{ background: '#0f172a', padding: '8px 12px', borderTop: '1px solid #1e293b' }}>
                    <div style={{ maxHeight: 75, overflowY: 'auto', marginBottom: 6, fontFamily: 'monospace', fontSize: '0.74rem', color: '#94a3b8' }}>
                      {terminalLogs.map((log, index) => (
                        <pre key={index} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('Error') ? '#fca5a5' : log.startsWith('>') ? '#e2e8f0' : '#86efac' }}>{log}</pre>
                      ))}
                    </div>
                    <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: 6 }}>
                      <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', alignSelf: 'center' }}>$</span>
                      <input className="form-control" type="text" value={cmdInput} onChange={e => setCmdInput(e.target.value)} placeholder="Type a CLI command (e.g. python manage.py runserver)..."
                        style={{ background: '#1e293b', border: 'none', color: 'white', fontFamily: 'monospace', fontSize: '0.8rem', padding: '4px 8px', flexGrow: 1, outline: 'none' }} />
                    </form>
                  </div>
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

      {/* ── 8. QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 2 Quiz — Templates & Inheritance">
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

      {/* ── 9. ASSIGNMENT ──────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 2 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Build a Custom App Dashboard</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Complete the following steps on your local system using Django templates and static files:</p>
              
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Configure the templates path inside <code>settings.py</code> by updating the <code>'DIRS'</code> list inside the <code>TEMPLATES</code> list.</li>
                <li>Create a <code>base.html</code> inside <code>templates/inventory/</code> containing layout structures and block wrappers: <code>{"{% block content %}{% endblock %}"}</code>.</li>
                <li>Create a child template <code>dashboard.html</code> that extends the base layout, loops through products using <code>{"{% for %}"}</code>, and uses conditional tag checks.</li>
                <li>Add a static directory, create a CSS file, load static tags in your base template via <code>{"{% load static %}"}</code>, and link the stylesheet.</li>
                <li>Verify your app loads correctly by calling <code>python manage.py runserver</code> and opening <code>http://127.0.0.1:8000/dashboard/</code>.</li>
              </ol>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#b45309', marginBottom: '1.5rem' }}>
              <ShieldAlert size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.78rem' }}><strong>Self-Check</strong>: Check that your template tags are enclosed correctly. Double curly brackets are for variables <code>{"{{ }}"}</code> and percentage curly brackets are for tags <code>{"{% %}"}</code>.</span>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('django_module3', 'intro_models')}>
              Go to Day 3 - Models & Admin Panel <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
