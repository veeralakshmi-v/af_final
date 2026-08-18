import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, Eye, Sparkles, Sun, Moon, Filter, Send, MessageSquare } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter
// ─────────────────────────────────────────────────────────────────────────────
const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: '"Fira Code", "Consolas", monospace', lineHeight: '1.65', fontSize: '0.85rem' }}>
      {lines.map((line, li) => {
        if (line === '') return <div key={li} style={{ height: '0.8em' }} />;
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|Set|Map|localStorage)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const toks = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fw = 'normal';
          if (comment)       color = '#8b949e';
          else if (str)      color = '#a5d6ff';
          else if (htmlTag)  color = '#7ee787';
          else if (kw)     { color = '#ff7b72'; fw = 'bold'; }
          else if (literal)  color = '#d2a8ff';
          else if (builtin)  color = '#ffb454';
          else if (num)      color = '#79c0ff';
          else if (ident)    color = '#e1e4e8';
          else if (sym)      color = '#ff7b72';
          toks.push(<span key={k++} style={{ color, fontWeight: fw }}>{tok}</span>);
        }
        return <div key={li} style={{ whiteSpace: 'pre' }}>{toks.length > 0 ? toks : line}</div>;
      })}
    </div>
  );
};

const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CB = ({ code }) => (
  <div style={{ background: '#0f172a', padding: '1.2rem 1.5rem', borderRadius: 12, overflowX: 'auto', margin: '0.8rem 0', border: '1px solid #1e293b' }}>
    <SyntaxHighlighter code={code} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function JSDay10({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_module10', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // ── Simulated SPA Live Demo State ──
  const [themeMode, setThemeMode] = useState('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // ── Async/Fetch Demo State ──
  const [fetchData, setFetchData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const triggerFetchDemo = async () => {
    setFetchLoading(true);
    setFetchError(null);
    setFetchData(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!res.ok) throw new Error('API request failed!');
      const data = await res.json();
      setFetchData(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  // Typewriter effect mock state
  const words = ['Full Stack Engineer', 'AI Agent Architect', 'JavaScript Specialist'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter loop
  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && displayedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentWord.substring(0, displayedText.length - 1)
            : currentWord.substring(0, displayedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  // Project List
  const portfolioProjects = [
    { id: 1, title: 'AI Assistant Portal', category: 'ai', desc: 'RAG Pipeline chatbot integrating document vector index search.', tech: 'HTML, Bootstrap, JS, Python' },
    { id: 2, title: 'E-Shop Dashboard', category: 'web', desc: 'Complete checkout cart showing promo coupons and tax calculators.', tech: 'Bootstrap, Vanilla JS, CSS' },
    { id: 3, title: 'Platformer Arcade', category: 'games', desc: '2D canvas physics simulation gaming workspace.', tech: 'HTML Canvas, JavaScript' },
    { id: 4, title: 'Chatbot Builder Studio', category: 'ai', desc: 'Visual nodal workspace connecting APIs & LLMs.', tech: 'React, Node, Bootstrap' }
  ];

  const filteredList = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeFilter);

  // Contact form handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setValidationError('Please fill in all inputs before submitting!');
      setIsSuccess(false);
      return;
    }
    if (!contactEmail.includes('@')) {
      setValidationError('Please enter a valid email address.');
      setIsSuccess(false);
      return;
    }
    setValidationError('');
    setIsSuccess(true);
    // Reset inputs
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  // ── Source Code Snippets ──
  const htmlSrc = `<!-- index.html - Developer SPA Layout -->
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio SPA</title>
  <!-- Bootstrap CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Sticky Navbar -->
  <nav class="navbar navbar-expand-lg sticky-top shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold text-primary" href="#">DevPort.IO</a>
      <div class="d-flex align-items-center">
        <!-- Theme Toggle Button -->
        <button id="themeToggleBtn" class="btn btn-outline-secondary me-3 btn-sm">Toggle Theme</button>
        <div class="navbar-nav d-none d-md-flex flex-row gap-3">
          <a class="nav-link active" href="#hero">Home</a>
          <a class="nav-link" href="#projects">Projects</a>
          <a class="nav-link" href="#contact">Contact</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="hero" class="py-5 text-center bg-light-gradient">
    <div class="container py-5">
      <h1 class="display-4 fw-bold">Hi, I am Alex</h1>
      <p class="lead">I build interactive web applications as a <span id="typewriter" class="text-primary fw-bold"></span><span class="cursor">|</span></p>
      <a href="#projects" class="btn btn-primary btn-lg mt-3">Explore Projects</a>
    </div>
  </section>

  <!-- Projects Gallery Section -->
  <section id="projects" class="py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-4">My Projects</h2>
      
      <!-- Filter Buttons -->
      <div class="d-flex justify-content-center gap-2 mb-4">
        <button class="btn btn-outline-primary filter-btn active" data-filter="all">All</button>
        <button class="btn btn-outline-primary filter-btn" data-filter="web">Web Apps</button>
        <button class="btn btn-outline-primary filter-btn" data-filter="ai">AI Projects</button>
        <button class="btn btn-outline-primary filter-btn" data-filter="games">Games</button>
      </div>

      <!-- Projects Grid -->
      <div id="projectsGrid" class="row g-4">
        <!-- Dynmically loaded cards -->
      </div>
    </div>
  </section>

  <!-- Contact Form Section -->
  <section id="contact" class="py-5 bg-light">
    <div class="container" style="max-width: 600px;">
      <h2 class="text-center fw-bold mb-4">Get In Touch</h2>
      <form id="contactForm" class="card p-4 shadow-sm">
        <div class="mb-3">
          <label class="form-label fw-bold">Name</label>
          <input type="text" id="contactName" class="form-control" placeholder="John Doe">
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Email</label>
          <input type="email" id="contactEmail" class="form-control" placeholder="john@example.com">
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Message</label>
          <textarea id="contactMessage" class="form-control" rows="4" placeholder="Hi, let's collaborate..."></textarea>
        </div>
        <div id="validationWarning" class="alert alert-danger d-none"></div>
        <div id="successNotice" class="alert alert-success d-none">Message sent successfully! ✅</div>
        <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">Send Message</button>
      </form>
    </div>
  </section>

  <!-- Details Bootstrap Modal -->
  <div class="modal fade" id="projectModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="modalTitle" class="modal-title fw-bold">Project Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p id="modalDesc"></p>
          <hr>
          <span class="fw-bold">Tech Stack:</span> <span id="modalTech" class="text-secondary"></span>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap Bundle JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Custom JS -->
  <script src="script.js"></script>
</body>
</html>`;

  const cssSrc = `/* style.css - Custom Theme Variables & Animations */
:root {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  --navbar-bg: rgba(255, 255, 255, 0.85);
  --lead-color: #475569;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f8fafc;
  --navbar-bg: rgba(15, 23, 42, 0.85);
  --lead-color: #cbd5e1;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar {
  background-color: var(--navbar-bg);
  backdrop-filter: blur(8px);
}

.bg-light-gradient {
  background: linear-gradient(135deg, #fef08a 0%, #ca8a04 100%);
  color: white;
}

.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.project-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}`;

  const jsSrc = `// script.js - SPA Router, Filter Engine, Theme and Validator
const projectsData = [
  { id: 1, title: 'AI Assistant Portal', category: 'ai', desc: 'RAG Pipeline chatbot integrating vector index search.', tech: 'HTML, Bootstrap, JS' },
  { id: 2, title: 'E-Shop Dashboard', category: 'web', desc: 'Complete checkout cart showing promo coupons.', tech: 'Bootstrap, JS' },
  { id: 3, title: 'Platformer Arcade', category: 'games', desc: '2D canvas physics simulation gaming workspace.', tech: 'HTML Canvas, JS' },
  { id: 4, title: 'Chatbot Builder Studio', category: 'ai', desc: 'Visual nodal workspace connecting APIs & LLMs.', tech: 'React, Bootstrap' }
];

// Theme Toggle
const themeBtn = document.getElementById("themeToggleBtn");
themeBtn.addEventListener("click", function() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Load stored theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// Typewriter Animation
const words = ["Full Stack Engineer", "AI Agent Architect", "JavaScript Specialist"];
let wordIdx = 0;
let text = "";
let isDel = false;

function typeLoop() {
  const currentWord = words[wordIdx];
  if (!isDel) {
    text = currentWord.substring(0, text.length + 1);
  } else {
    text = currentWord.substring(0, text.length - 1);
  }

  document.getElementById("typewriter").textContent = text;

  let speed = isDel ? 50 : 100;
  if (!isDel && text === currentWord) {
    speed = 1500;
    isDel = true;
  } else if (isDel && text === "") {
    isDel = false;
    wordIdx = (wordIdx + 1) % words.length;
  }

  setTimeout(typeLoop, speed);
}

// Render filtered cards
function renderCards(filterType = "all") {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";

  const filtered = filterType === "all" ? projectsData : projectsData.filter(p => p.category === filterType);

  filtered.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = \`
      <div class="card h-100 project-card border-0 shadow-sm">
        <div class="card-body d-flex flex-column justify-content-between p-4">
          <div>
            <span class="badge bg-warning text-dark mb-2 text-uppercase">\${p.category}</span>
            <h5 class="card-title fw-bold text-dark">\${p.title}</h5>
            <p class="card-text text-secondary">\${p.desc}</p>
          </div>
          <button class="btn btn-outline-warning btn-sm mt-3 w-100" onclick="showModal(\${p.id})">Details</button>
        </div>
      </div>
    \`;
    grid.appendChild(col);
  });
}

// Set filter trigger actions
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", function(event) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");
    renderCards(event.target.getAttribute("data-filter"));
  });
});

// Modal Detail Viewer
function showModal(id) {
  const p = projectsData.find(proj => proj.id === id);
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalTech").textContent = p.tech;

  const myModal = new bootstrap.Modal(document.getElementById('projectModal'));
  myModal.show();
}

// Contact form Validation
const cForm = document.getElementById("contactForm");
cForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;
  
  const warn = document.getElementById("validationWarning");
  const success = document.getElementById("successNotice");
  
  warn.classList.add("d-none");
  success.classList.add("d-none");

  if (!name.trim() || !email.trim() || !message.trim()) {
    warn.textContent = "Please fill in all input boxes!";
    warn.classList.remove("d-none");
    return;
  }
  if (!email.includes("@")) {
    warn.textContent = "A valid email is required!";
    warn.classList.remove("d-none");
    return;
  }

  success.classList.remove("d-none");
  cForm.reset();
});

// Kick off
document.addEventListener("DOMContentLoaded", () => {
  typeLoop();
  renderCards();
});`;

  return (
    <AnimatePresence mode="wait">

      {/* ════════════ TAB: PROMISES ════════════ */}
      {activeTab === 'js_promises' && (
        <Section eyebrow="Syllabus 01" title="JavaScript Promises">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>A <strong>Promise</strong> is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>The Three States of a Promise</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ border: '1px solid #cbd5e1', background: '#f8fafc', padding: '1rem', borderRadius: 12 }}>
                <strong style={{ color: '#64748b' }}>1. Pending</strong>
                <p style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>Initial state, neither fulfilled nor rejected. The operation is still in progress.</p>
              </div>
              <div style={{ border: '1px solid #86efac', background: '#f0fdf4', padding: '1rem', borderRadius: 12 }}>
                <strong style={{ color: '#166534' }}>2. Fulfilled</strong>
                <p style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>Meaning that the operation was completed successfully. Returns a value.</p>
              </div>
              <div style={{ border: '1px solid #fca5a5', background: '#fef2f2', padding: '1rem', borderRadius: 12 }}>
                <strong style={{ color: '#991b1b' }}>3. Rejected</strong>
                <p style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>Meaning that the operation failed. Returns an error or rejection reason.</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Promise Syntax</h3>
            <CB code={`let myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject("Operation failed.");
  }
});

myPromise
  .then(result => console.log(result))  // Logs "Operation succeeded!"
  .catch(error => console.error(error))
  .finally(() => console.log("Done."));`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_fetch_api')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Fetch API <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: FETCH API ════════════ */}
      {activeTab === 'js_fetch_api' && (
        <Section eyebrow="Syllabus 02" title="JavaScript Fetch API">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>The <strong>Fetch API</strong> provides a modern, flexible interface for accessing and manipulating parts of the protocol, such as requests and responses. It returns a Promise that resolves to the Response object.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Making a GET Request</h3>
            <p>Use <code>fetch()</code> passing the API URL. Because fetch is asynchronous, it returns a Promise. You convert the response body to JSON using <code>.json()</code>, which also returns a Promise.</p>
            <CB code={`fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Fetch failed: ", error));`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_async_await')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Async & Await <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: ASYNC & AWAIT ════════════ */}
      {activeTab === 'js_async_await' && (
        <Section eyebrow="Syllabus 03" title="Async & Await">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Introduced in ES8, <strong>async</strong> and <strong>await</strong> are extensions of promises. They act as syntactic sugar, allowing you to write asynchronous code that looks and behaves like synchronous code.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>How to use Async/Await</h3>
            <p>1. Prepend the <code>async</code> keyword to the function declaration.<br />2. Use the <code>await</code> keyword inside the function before any statement returning a Promise. This pauses function execution until the promise settles.</p>
            <CB code={`async function getUserData() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  let data = await response.json();
  console.log(data);
}

getUserData();`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_error_handling')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Error Handling <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: ERROR HANDLING ════════════ */}
      {activeTab === 'js_error_handling' && (
        <Section eyebrow="Syllabus 04" title="Asynchronous Error Handling">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>When working with asynchronous requests, networking errors or bad responses can happen. We use <strong>try...catch</strong> blocks to handle errors cleanly within async functions.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>The try...catch Block Syntax</h3>
            <CB code={`async function fetchSafe() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/invalid-url");
    if (!response.ok) {
      throw new Error("HTTP request failed with status: " + response.status);
    }
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred: ", error.message);
  }
}`} />

            {/* Interactive Demo */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>🎮 Live Playground: Fetch User API</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0', marginTop: '1rem' }}>
              <button onClick={triggerFetchDemo} disabled={fetchLoading}
                style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {fetchLoading ? 'Fetching...' : 'Fetch User Details'}
              </button>

              {fetchData && (
                <div style={{ background: '#0f172a', color: '#86efac', padding: '1rem', borderRadius: 10, marginTop: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  <div>// Response Status: 200 OK</div>
                  <div>// Name: {fetchData.name}</div>
                  <div>// Email: {fetchData.email}</div>
                  <div>// Company: {fetchData.company?.name}</div>
                </div>
              )}

              {fetchError && (
                <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: 10, marginTop: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  ⚠️ Error: {fetchError}
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_final_project')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Final Project Overview <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: FINAL PROJECT DEVELOPMENT ════════════ */}
      {activeTab === 'js_final_project' && (
        <Section eyebrow="Final Project" title="Capstone SPA Project Overview">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Your capstone project for Day 10 is to build a responsive **Single Page Application (SPA)** developer portfolio that showcases your work, links vector database models, and provides custom interactive panels.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Project Architecture</h3>
            <p>The application should be split into three clean files:</p>
            <ul>
              <li><strong>index.html</strong>: Uses semantic HTML5, links Bootstrap CDN for premium styled utilities, and references custom style sheets.</li>
              <li><strong>style.css</strong>: Adds theme styles, CSS transitions, hover transforms, and dark-theme class definitions.</li>
              <li><strong>script.js</strong>: Manages application theme states, typewriter loops, dynamic array item filters, and contact forms validation rules.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_project_demo')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: View Project Demo <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 1: DYNAMIC PROJECT DEMO ════════════════ */}
      {activeTab === 'js_project_demo' && (
        <Section eyebrow="Day 10 Final Project" title="Developer Portfolio SPA (Single Page Application)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Welcome to the JavaScript Capstone Project. This is a fully featured, responsive **Single Page Application (SPA)** template demonstrating nested layout structures, grid models, dynamic typewriter actions, visual filtering arrays, and contact validation modules.</p>

            {/* Simulated SPA Preview Frame */}
            <div style={{ background: themeMode === 'light' ? '#f8fafc' : '#0f172a', color: themeMode === 'light' ? '#0f172a' : '#f8fafc', padding: '1.5rem', borderRadius: 16, border: '2px solid #cbd5e1', margin: '2rem 0', transition: 'all 0.3s ease' }}>
              
              {/* Simulated Sticky Navbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: themeMode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(30,41,59,0.9)', padding: '0.8rem 1.2rem', borderRadius: 8, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontWeight: 800, color: '#ca8a04', fontSize: '1.1rem' }}>DevPort.IO</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: themeMode === 'light' ? '#0f172a' : '#f8fafc' }}>
                    {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: themeMode === 'light' ? '#475569' : '#cbd5e1' }}>Home</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: themeMode === 'light' ? '#475569' : '#cbd5e1' }}>Projects</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: themeMode === 'light' ? '#475569' : '#cbd5e1' }}>Contact</span>
                </div>
              </div>

              {/* Simulated Hero Banner */}
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center', marginTop: '1rem', background: 'linear-gradient(135deg, #fef08a 0%, #ca8a04 100%)', borderRadius: 12, color: '#0f172a' }}>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, margin: 0 }}>Hi, I am Alex</h3>
                <p style={{ fontSize: '1.1rem', margin: '0.8rem 0 0 0', fontWeight: 500 }}>
                  I build interactive web applications as a{' '}
                  <span style={{ color: '#0f172a', fontWeight: 800 }}>{displayedText}</span>
                  <span style={{ fontWeight: 800, animation: 'blink 0.7s infinite' }}>|</span>
                </p>
                <button style={{ background: '#0f172a', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: 8, border: 'none', marginTop: '1.2rem', fontWeight: 700 }}>Explore Work</button>
              </div>

              {/* Projects Filter Gallery */}
              <div style={{ marginTop: '2.5rem' }}>
                <h4 style={{ textAlign: 'center', fontWeight: 800, margin: '0 0 1.2rem 0' }}>My Projects</h4>
                
                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {['all', 'web', 'ai', 'games'].map(f => (
                    <button key={f} onClick={() => setActiveFilter(f)} style={{
                      background: activeFilter === f ? '#ca8a04' : (themeMode === 'light' ? '#e2e8f0' : '#1e293b'),
                      color: activeFilter === f ? '#fff' : (themeMode === 'light' ? '#1f2937' : '#f8fafc'),
                      border: 'none', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize'
                    }}>
                      {f}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {filteredList.map(p => (
                    <div key={p.id} style={{ background: themeMode === 'light' ? '#fff' : '#1e293b', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <div>
                        <span style={{ background: '#fef08a', color: '#854d0e', padding: '0.2rem 0.6rem', borderRadius: 12, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.6rem' }}>{p.category}</span>
                        <h5 style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: themeMode === 'light' ? '#0f172a' : '#f8fafc' }}>{p.title}</h5>
                        <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.4rem 0 0 0' }}>{p.desc}</p>
                      </div>
                      <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '0.8rem', paddingTop: '0.6rem', fontSize: '0.78rem', color: '#ca8a04', fontFamily: 'monospace' }}>
                        Stack: {p.tech}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Contact Form */}
              <div style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2.5rem' }}>
                <h4 style={{ textAlign: 'center', fontWeight: 800, margin: '0 0 1.2rem 0' }}>Get In Touch</h4>
                <form onSubmit={handleContactSubmit} style={{ maxWidth: '450px', margin: '0 auto', background: themeMode === 'light' ? '#fff' : '#1e293b', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Name</label>
                    <input value={contactName} onChange={e => setContactName(e.target.value)} style={{ width: '100%', padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: '0.88rem', boxSizing: 'border-box' }} placeholder="John Doe" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Email</label>
                    <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: '0.88rem', boxSizing: 'border-box' }} placeholder="john@example.com" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Message</label>
                    <textarea value={contactMessage} onChange={e => setContactMessage(e.target.value)} style={{ width: '100%', padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: '0.88rem', boxSizing: 'border-box', resize: 'none' }} rows={3} placeholder="Hi, let's connect..." />
                  </div>

                  {validationError && (
                    <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.6rem 0.8rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem' }}>
                      ⚠️ {validationError}
                    </div>
                  )}

                  {isSuccess && (
                    <div style={{ background: '#d1fae5', color: '#065f46', padding: '0.6rem 0.8rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem' }}>
                      ✅ Message sent successfully!
                    </div>
                  )}

                  <button type="submit" style={{ width: '100%', background: '#ca8a04', color: 'white', padding: '0.6rem 1rem', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                    Send Message
                  </button>
                </form>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_project_source')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Project Source Code <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 2: CODE SOURCE ════════════════ */}
      {activeTab === 'js_project_source' && (
        <Section eyebrow="Source Code" title="SPA Portfolio Implementation Files">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Deploy this fully customized Single Page Application template in your local workspace. It imports standard **Bootstrap CSS/JS dependencies** and structures logic cleanly across files.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. index.html</h3>
            <CB code={htmlSrc} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. style.css</h3>
            <CB code={cssSrc} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>3. script.js</h3>
            <CB code={jsSrc} />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_playground')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Live Coding Lab <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: LIVE CODING PLAYGROUND ════════════════ */}
      {activeTab === 'js_playground' && (
        <Section key="js_playground" id="js_playground" eyebrow="Playground" title="JavaScript Live Coding Lab">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Write your own JavaScript code in the editor on the left and see console logs in the output terminal on the right. Experiment with loops, functions, variables, and math operators!</p>
            <JSLiveEditor dayKey="general" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}
      {/* ── DAY 10 QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d10" id="quiz_d10" eyebrow="Day 10 • Assessment" title="Day 10 Quiz: Modern JavaScript">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which statement correctly describes a Promise state?', opts: ['Fulfilled, Rejected, Paused', 'Pending, Fulfilled, Rejected', 'Loading, Ready, Error', 'Active, Inactive, Completed'], ans: 1 },
              { q: 'What does the await keyword do inside an async function?', opts: ['Exits the function immediately', 'Pauses function execution until a Promise resolves or rejects', 'Speeds up execution of code', 'Prevents all errors from occurring'], ans: 1 },
              { q: 'Which function converts a Response object into a JSON data promise?', opts: ['response.toJson()', 'response.json()', 'JSON.parse(response)', 'JSON.stringify(response)'], ans: 1 },
              { q: 'Which block is used to catch synchronous and asynchronous errors?', opts: ['catch...throw', 'try...catch', 'check...handle', 'error...catch'], ans: 1 },
              { q: 'What keyword must prepend a function if we want to use the await keyword inside it?', opts: ['promise', 'await', 'async', 'defer'], ans: 2 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#ca8a04" />
            ))}
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
