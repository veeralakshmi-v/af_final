import React, { useState } from 'react';
import { 
  BookOpen, MonitorPlay, LayoutGrid, Layers, Code, PenTool,
  Briefcase, Sparkles, CheckCircle, Trophy, ChevronRight, 
  ArrowRight, Lightbulb, RefreshCw, Terminal, Eye, Sliders, Menu, X, Play, HelpCircle,
  Filter, Image as ImageIcon, Monitor, Smartphone, Tablet, Check, FileText
} from 'lucide-react';

export default function WebDesignDay6({ activeTab = 'intro', onNavigate, openAITutor }) {
  const handleTabChange = (tabId) => {
    if (onNavigate) {
      onNavigate('web_design_day6', tabId);
    }
  };

  // Interactive Syntax-Highlighted Code Editor component with scroll syncing
  const LiveSyntaxCodeEditor = ({ value, onChange, language = 'html', rows = 10, label = '' }) => {
    const preRef = React.useRef(null);

    const handleScroll = (e) => {
      if (preRef.current) {
        preRef.current.scrollTop = e.target.scrollTop;
        preRef.current.scrollLeft = e.target.scrollLeft;
      }
    };

    const escapeHTML = (str) =>
      str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

    const highlightCode = (codeStr, lang) => {
      if (!codeStr) return '';
      const escaped = escapeHTML(codeStr);

      if (lang === 'html') {
        const tokenRegex = /(&lt;<!--[\s\S]*?--&gt;)|(&lt;!DOCTYPE html&gt;)|(&lt;\/?[a-zA-Z0-9\-]+)|([a-zA-Z\-]+)(?=\s*=)|("[\s\S]*?"|'[\s\S]*?')/gi;
        return escaped.replace(tokenRegex, (match, comment, doctype, tag, attr, stringVal) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (doctype) return `<span style="color:#c084fc;font-weight:bold;">${doctype}</span>`;
          if (tag) {
            const m = tag.match(/^(&lt;\/?)([a-zA-Z0-9\-]+)$/);
            return m ? `${m[1]}<span style="color:#f43f5e;font-weight:bold;">${m[2]}</span>` : tag;
          }
          if (attr) return `<span style="color:#fbbf24;font-weight:600;">${attr}</span>`;
          if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
          return match;
        });
      }

      if (lang === 'css') {
        const cssTokenRegex = /(\/\*[\s\S]*?\*\/)|([.#][a-zA-Z0-9_\-]+|[a-zA-Z0-9_\-]+(?=\s*\{))|([a-zA-Z\-]+)(?=\s*:)|(:\s*[^;\}]+;)/gi;
        return escaped.replace(cssTokenRegex, (match, comment, selector, prop, val) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (selector) return `<span style="color:#38bdf8;font-weight:bold;">${selector}</span>`;
          if (prop) return `<span style="color:#fb923c;font-weight:600;">${prop}</span>`;
          if (val) return `:<span style="color:#34d399;">${val.slice(1)}</span>`;
          return match;
        });
      }

      if (lang === 'js') {
        const jsTokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(\b(?:const|let|var|function|return|if|else|for|while|switch|case|break)\b)|(\b(?:document|window|console|Math|Array|Object|String|Number|Boolean)\b)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)/gi;
        return escaped.replace(jsTokenRegex, (match, comment, kw, builtin, stringVal) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (kw) return `<span style="color:#fb923c;font-weight:bold;">${kw}</span>`;
          if (builtin) return `<span style="color:#38bdf8;font-weight:600;">${builtin}</span>`;
          if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
          return match;
        });
      }

      return escaped;
    };

    const highlightedHTML = highlightCode(value, language);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {label && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: language === 'html' ? '#ea580c' : language === 'css' ? '#2563eb' : '#d97706', letterSpacing: '0.5px' }}>
              {label}
            </label>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Interactive Editor</span>
          </div>
        )}

        <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#090d16', border: '1px solid #1e293b' }}>
          <pre
            ref={preRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              padding: '1rem',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.82rem',
              lineHeight: '1.6',
              color: '#f8fafc',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              pointerEvents: 'none',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
            dangerouslySetInnerHTML={{ __html: highlightedHTML + '\n' }}
          />

          <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            onScroll={handleScroll}
            spellCheck={false}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: `${rows * 1.6}rem`,
              margin: 0,
              padding: '1rem',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.82rem',
              lineHeight: '1.6',
              color: 'transparent',
              caretColor: '#38bdf8',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflow: 'auto',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    );
  };

  const renderSyntaxHighlightedHTML = (codeStr, lang = 'html') => {
    if (!codeStr) return null;
    const escapeHTML = (str) =>
      str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

    const escaped = escapeHTML(codeStr);

    if (lang === 'html') {
      const tokenRegex = /(&lt;<!--[\s\S]*?--&gt;)|(&lt;!DOCTYPE html&gt;)|(&lt;\/?[a-zA-Z0-9\-]+)|([a-zA-Z\-]+)(?=\s*=)|("[\s\S]*?"|'[\s\S]*?')/gi;
      const highlighted = escaped.replace(tokenRegex, (match, comment, doctype, tag, attr, stringVal) => {
        if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
        if (doctype) return `<span style="color:#c084fc;font-weight:bold;">${doctype}</span>`;
        if (tag) {
          const m = tag.match(/^(&lt;\/?)([a-zA-Z0-9\-]+)$/);
          return m ? `${m[1]}<span style="color:#f43f5e;font-weight:bold;">${m[2]}</span>` : tag;
        }
        if (attr) return `<span style="color:#fbbf24;font-weight:600;">${attr}</span>`;
        if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
        return match;
      });
      return (
        <pre
          style={{
            margin: 0,
            fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
            fontSize: '0.83rem',
            lineHeight: '1.6',
            color: '#f8fafc',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    }

    if (lang === 'css') {
      const cssTokenRegex = /(\/\*[\s\S]*?\*\/)|([.#][a-zA-Z0-9_\-]+|[a-zA-Z0-9_\-]+(?=\s*\{))|([a-zA-Z\-]+)(?=\s*:)|(:\s*[^;\}]+;)/gi;
      const highlighted = escaped.replace(cssTokenRegex, (match, comment, selector, prop, val) => {
        if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
        if (selector) return `<span style="color:#38bdf8;font-weight:bold;">${selector}</span>`;
        if (prop) return `<span style="color:#fb923c;font-weight:600;">${prop}</span>`;
        if (val) return `:<span style="color:#34d399;">${val.slice(1)}</span>`;
        return match;
      });
      return (
        <pre
          style={{
            margin: 0,
            fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
            fontSize: '0.83rem',
            lineHeight: '1.6',
            color: '#f8fafc',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    }

    return <pre style={{ margin: 0, color: '#f8fafc' }}>{codeStr}</pre>;
  };

  // --- Track Completion & Progress ---
  const [completedSteps, setCompletedSteps] = useState({
    intro: true,
    guidedBuild: 0, // 0 to 18 stages
    challenges: 0,
    assignment: false,
    aiChallenge: false,
    quiz: false
  });

  // --- Section 3: Visual Result Filter State & Breakdown ---
  const [targetFilter, setTargetFilter] = useState('all');
  const [showTargetCodeBreakdown, setShowTargetCodeBreakdown] = useState(false);
  const [targetCodeTab, setTargetCodeTab] = useState('html');

  // --- Section 4: Component Explorer State ---
  const [selectedExplorerItem, setSelectedExplorerItem] = useState('grid');
  const [selectedTreeNode, setSelectedTreeNode] = useState('card');

  // --- Section 6: HTML Incremental Build Step ---
  const [htmlBuildStep, setHtmlBuildStep] = useState(1);

  // --- Section 8: Image Handling & object-fit Toggle ---
  const [objectFitMode, setObjectFitMode] = useState('cover'); // 'none' | 'cover' | 'contain'

  // --- Section 9: CSS Grid Visualizer State ---
  const [gridCols, setGridCols] = useState(3); // 1, 2, 3, 4
  const [gridGap, setGridGap] = useState(30); // 10, 20, 30, 40 px

  // --- Section 11: Hover Animation Mode ---
  const [hoverEffectActive, setHoverEffectActive] = useState(true);

  // --- Section 15: Card Height Problem & Solution ---
  const [heightLayoutMode, setHeightLayoutMode] = useState('flex_balanced'); // 'unbalanced' | 'flex_balanced'

  // --- Section 20: JS Filtering Step-by-Step Simulator ---
  const [jsFilterStep, setJsFilterStep] = useState(1);
  const [simulatorFilter, setSimulatorFilter] = useState('web');

  // --- Section 22: Responsive Device Tester ---
  const [responsiveDevice, setResponsiveDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // --- Section 24: Live Code Playground State ---
  const [playgroundFilter, setPlaygroundFilter] = useState('all');
  const [playgroundHtml, setPlaygroundHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alpha Fly Theni - Portfolio & Projects</title>
</head>
<body>

  <!-- Day 2 Navbar -->
  <header style="display:flex; justify-content:space-between; align-items:center; background:#1e1b4b; padding:1rem 2rem; border-radius:12px; margin-bottom:2rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly Theni</div>
    <nav style="display:flex; gap:1rem; font-size:0.9rem;">
      <a href="#home" style="color:#cbd5e1; text-decoration:none;">Home</a>
      <a href="#about" style="color:#cbd5e1; text-decoration:none;">About</a>
      <a href="#services" style="color:#cbd5e1; text-decoration:none;">Services</a>
      <a href="#projects" style="color:#60a5fa; font-weight:800; text-decoration:none;">Projects</a>
    </nav>
  </header>

  <!-- Day 6 Projects Section -->
  <section id="projects" class="projects-section">
    <div class="projects-container">
      <span class="section-label">OUR RECENT WORK</span>
      <h2 class="section-title">Featured Projects & Client Work</h2>
      <p class="section-description">
        Explore practical work created using web design, UI concepts, and data visualization.
      </p>

      <!-- Filter Buttons -->
      <div class="filter-bar">
        <button class="filter-btn active" data-filter="all">ALL</button>
        <button class="filter-btn" data-filter="web">WEB</button>
        <button class="filter-btn" data-filter="design">DESIGN</button>
        <button class="filter-btn" data-filter="data">DATA</button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div class="project-card" data-category="web">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Business Landing Page" />
          </div>
          <div class="card-content">
            <span class="card-category">WEB</span>
            <h3 class="card-title">Business Landing Page</h3>
            <p class="card-desc">A responsive website designed for a fictional local business with modern layout.</p>
            <div class="card-tags">
              <span class="tag">HTML</span>
              <span class="tag">CSS</span>
              <span class="tag">JS</span>
            </div>
            <a href="#view" class="btn-project">View Project →</a>
          </div>
        </div>

        <div class="project-card" data-category="web">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="Learning Dashboard" />
          </div>
          <div class="card-content">
            <span class="card-category">WEB</span>
            <h3 class="card-title">Learning Dashboard</h3>
            <p class="card-desc">An interactive web dashboard concept for tracking learning progress and skills.</p>
            <div class="card-tags">
              <span class="tag">HTML</span>
              <span class="tag">CSS</span>
              <span class="tag">JS DOM</span>
            </div>
            <a href="#view" class="btn-project">View Project →</a>
          </div>
        </div>

        <div class="project-card" data-category="data">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80" alt="Analytics Visualizer" />
          </div>
          <div class="card-content">
            <span class="card-category">DATA</span>
            <h3 class="card-title">Analytics Visualizer</h3>
            <p class="card-desc">A visual dashboard concept for understanding business information and charts.</p>
            <div class="card-tags">
              <span class="tag">Python</span>
              <span class="tag">SQL</span>
              <span class="tag">Data Viz</span>
            </div>
            <a href="#view" class="btn-project">View Project →</a>
          </div>
        </div>

        <div class="project-card" data-category="design">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" alt="Design Studio UI" />
          </div>
          <div class="card-content">
            <span class="card-category">DESIGN</span>
            <h3 class="card-title">Design Studio UI</h3>
            <p class="card-desc">A sleek UI mockup for creative design agencies with modern glassmorphism aesthetics.</p>
            <div class="card-tags">
              <span class="tag">UI Design</span>
              <span class="tag">Figma</span>
              <span class="tag">Responsive</span>
            </div>
            <a href="#view" class="btn-project">View Project →</a>
          </div>
        </div>

        <div class="project-card" data-category="design">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80" alt="E-Commerce Mobile App" />
          </div>
          <div class="card-content">
            <span class="card-category">DESIGN</span>
            <h3 class="card-title">E-Commerce Mobile App</h3>
            <p class="card-desc">Mobile shopping experience UI prototype featuring clean product cards and cart flow.</p>
            <div class="card-tags">
              <span class="tag">UI Design</span>
              <span class="tag">Mobile</span>
              <span class="tag">Prototype</span>
            </div>
            <a href="#view" class="btn-project">View Project →</a>
          </div>
        </div>

        <div class="project-card" data-category="data">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" alt="Customer Insights Tool" />
          </div>
          <div class="card-content">
            <span class="card-category">DATA</span>
            <h3 class="card-title">Customer Insights Tool</h3>
            <p class="card-desc">Interactive reporting tool for sales data analysis, metrics, and growth forecasting.</p>
            <div class="card-tags">
              <span class="tag">SQL</span>
              <span class="tag">Data Viz</span>
              <span class="tag">Dashboard</span>
            </div>
            <a href="#view" class="btn-project">View Project →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

</body>
</html>`);

  const [playgroundCss, setPlaygroundCss] = useState(`.projects-section { padding: 4rem 2rem; background: #ffffff; color: #0f172a; }
.projects-container { max-width: 1200px; margin: 0 auto; text-align: center; }
.section-label { font-size: 0.8rem; font-weight: 800; color: #2563eb; letter-spacing: 1px; }
.section-title { font-size: 2.2rem; font-weight: 900; color: #0f172a; margin: 0.5rem 0 1rem 0; }
.section-description { font-size: 0.95rem; color: #64748b; margin-bottom: 2rem; max-width: 620px; margin-left: auto; margin-right: auto; }

/* Filter Buttons */
.filter-bar { display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
.filter-btn {
  background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;
  padding: 0.6rem 1.25rem; border-radius: 30px; font-weight: 800; font-size: 0.85rem;
  cursor: pointer; transition: all 0.25s ease;
}
.filter-btn:hover { background: #e2e8f0; color: #0f172a; }
.filter-btn.active { background: #2563eb; color: #ffffff; border-color: #2563eb; box-shadow: 0 4px 12px rgba(37,99,235,0.25); }

/* Projects Grid */
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: left; }

/* Card Component */
.project-card {
  background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04); overflow: hidden;
  display: flex; flex-direction: column; height: 100%; transition: all 0.35s ease;
}
.project-card:hover { transform: translateY(-8px); box-shadow: 0 14px 28px rgba(37, 99, 235, 0.16); border-color: #93c5fd; }

.card-img-wrap { width: 100%; height: 200px; overflow: hidden; background: #e2e8f0; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.project-card:hover .card-img-wrap img { transform: scale(1.06); }

.card-content { padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1; }
.card-category { font-size: 0.72rem; font-weight: 900; color: #2563eb; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 0.4rem; }
.card-title { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
.card-desc { font-size: 0.88rem; color: #64748b; line-height: 1.5; margin-bottom: 1.25rem; }

.card-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.tag { background: #f1f5f9; color: #334155; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 6px; }

.btn-project { margin-top: auto; color: #2563eb; font-weight: 800; font-size: 0.88rem; text-decoration: none; display: inline-block; transition: color 0.2s; }
.btn-project:hover { color: #1d4ed8; text-decoration: underline; }

@media (max-width: 900px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .projects-grid { grid-template-columns: 1fr; }
}`);

  const [playgroundJs, setPlaygroundJs] = useState(`// Step 1: Select filter buttons and project cards
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Step 2: Add click event listener to each filter button
filterBtns.forEach(button => {
  button.addEventListener('click', () => {
    // Step 3: Remove active class from all buttons and add to clicked button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Step 4: Get selected category filter value
    const selectedCategory = button.getAttribute('data-filter');

    // Step 5: Loop through each project card and compare categories
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      // Step 6: Show or hide card based on category match
      if (selectedCategory === 'all' || cardCategory === selectedCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});`);

  // --- Section 25: Guided Build Stages (18 Stages) ---
  const [guidedBuildStage, setGuidedBuildStage] = useState(1);

  // --- Section 26: Predict Output State ---
  const [predictionAnswers, setPredictionAnswers] = useState({});
  const [showPredictionResults, setShowPredictionResults] = useState({});

  // --- Section 27: Debugging Challenge State ---
  const [debugAnswerSubmitted, setDebugAnswerSubmitted] = useState(false);
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugSolution, setShowDebugSolution] = useState(false);

  // --- Section 28: AI Challenge State ---
  const [aiBizTypeInput, setAiBizTypeInput] = useState('Tech Training Institute');
  const [aiAudienceInput, setAiAudienceInput] = useState('Students & Career Switchers');
  const [aiWorkInput, setAiWorkInput] = useState('Full Stack Apps, Dashboards, UI Mockups');
  const [aiGeneratedProjects, setAiGeneratedProjects] = useState(null);

  // --- Section 29: AI Code Review State ---
  const [userSubmittedCode, setUserSubmittedCode] = useState('');
  const [aiReviewResult, setAiReviewResult] = useState(null);

  // --- Section 32: Quiz Answers State ---
  const [quizAnswers, setQuizAnswers] = useState({});

  // ---------------- Data Collections ----------------
  const targetProjectsList = [
    {
      id: 1,
      title: 'Business Landing Page',
      category: 'web',
      desc: 'A responsive website designed for a fictional local business with clear hero, about, and services sections.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      cta: 'View Project →'
    },
    {
      id: 2,
      title: 'Learning Dashboard',
      category: 'web',
      desc: 'An interactive web dashboard concept for tracking student learning progress, quiz scores, and assignments.',
      tags: ['HTML', 'CSS', 'JS DOM'],
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      cta: 'View Project →'
    },
    {
      id: 3,
      title: 'Analytics Visualizer',
      category: 'data',
      desc: 'A visual dashboard concept for understanding business information, key metrics, and revenue growth charts.',
      tags: ['Python', 'SQL', 'Data Viz'],
      img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
      cta: 'View Project →'
    },
    {
      id: 4,
      title: 'Design Studio UI',
      category: 'design',
      desc: 'A sleek UI mockup for creative design agencies featuring modern dark-mode glassmorphism and clean typography.',
      tags: ['UI Design', 'Figma', 'Responsive'],
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      cta: 'View Project →'
    },
    {
      id: 5,
      title: 'E-Commerce Mobile App',
      category: 'design',
      desc: 'Mobile shopping experience UI prototype with intuitive product search cards and smooth cart checkout flow.',
      tags: ['UI Design', 'Mobile', 'Prototype'],
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
      cta: 'View Project →'
    },
    {
      id: 6,
      title: 'Customer Insights Tool',
      category: 'data',
      desc: 'Interactive reporting tool for sales data analysis, trend predictions, and real-time customer data charts.',
      tags: ['SQL', 'Data Viz', 'Dashboard'],
      img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      cta: 'View Project →'
    }
  ];

  const explorerItemsData = {
    img: {
      name: 'Project Visual / Image (<img object-fit: cover>)',
      purpose: 'Gives visitors an immediate visual representation of the completed project.',
      htmlRole: '<img src="project.jpg" alt="Business Landing Page" />',
      cssRole: 'width: 100%; height: 200px; object-fit: cover;'
    },
    category: {
      name: 'Category Badge (.card-category)',
      purpose: 'Categorizes the project (WEB, DESIGN, DATA) so visitors understand the project domain.',
      htmlRole: '<span class="card-category">WEB</span>',
      cssRole: 'font-size: 0.72rem; font-weight: 900; color: #2563eb; text-transform: uppercase;'
    },
    title: {
      name: 'Project Title (H3)',
      purpose: 'Identifies the project clearly using concise, descriptive naming.',
      htmlRole: '<h3 class="card-title">Business Landing Page</h3>',
      cssRole: 'font-size: 1.2rem; font-weight: 800; color: #0f172a;'
    },
    description: {
      name: 'Project Summary / Context (P)',
      purpose: 'Provides a brief 2-sentence description of what problem the project solved.',
      htmlRole: '<p class="card-desc">A responsive website designed for a fictional business...</p>',
      cssRole: 'font-size: 0.88rem; color: #64748b; line-height: 1.5;'
    },
    tags: {
      name: 'Technology Tags (.tag)',
      purpose: 'Highlights specific technologies, tools, or design skills used to create the project.',
      htmlRole: '<div class="card-tags"><span class="tag">HTML</span><span class="tag">CSS</span></div>',
      cssRole: 'background: #f1f5f9; padding: 0.25rem 0.6rem; border-radius: 6px;'
    },
    cta: {
      name: 'View Project CTA (A / Button)',
      purpose: 'Allows interested visitors or recruiters to inspect live demo or GitHub repository.',
      htmlRole: '<a href="#view" class="btn-project">View Project →</a>',
      cssRole: 'color: #2563eb; font-weight: 800; text-decoration: none;'
    },
    grid: {
      name: 'CSS Grid Container (.projects-grid)',
      purpose: 'Arranges repeated project cards into neat 3-column rows with uniform spacing.',
      htmlRole: '<div class="projects-grid"><!-- Project Cards --></div>',
      cssRole: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;'
    }
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the key business purpose of a Portfolio / Projects Section on a website?',
      options: [
        'To list office locations and contact phone numbers.',
        'To demonstrate proof of actual completed work, building trust with potential clients or employers.',
        'To hide navigation links from search engines.',
        'To store user login passwords.'
      ],
      correct: 1,
      explanation: 'While Services tell visitors what you CAN do, Portfolio proves what you HAVE ALREADY done.'
    },
    {
      id: 'q2',
      question: 'What is the main functional difference between a Services Section and a Portfolio Section?',
      options: [
        'Services section lists offered capabilities, while Portfolio displays real completed projects/case studies.',
        'Services section uses images, while Portfolio uses only text.',
        'Portfolio cannot use buttons.',
        'Services section is for mobile phones only.'
      ],
      correct: 0,
      explanation: 'Services explain offerings ("What we do"), whereas Portfolio showcases concrete results ("What we built").'
    },
    {
      id: 'q3',
      question: 'What does the CSS property `object-fit: cover;` do for project images inside card containers?',
      options: [
        'It shrinks font sizes.',
        'It scales and crops the image to completely fill its container without stretching or distorting aspect ratio.',
        'It makes the image transparent.',
        'It forces all images to be circular.'
      ],
      correct: 1,
      explanation: '`object-fit: cover` maintains aspect ratio while filling container dimensions cleanly.'
    },
    {
      id: 'q4',
      question: 'Why is `overflow: hidden;` applied to `.project-card` containers with image hover zoom effects?',
      options: [
        'It prevents zoomed images from expanding outside the rounded borders of the project card.',
        'It hides all text inside the card.',
        'It turns off CSS Grid layout.',
        'It forces horizontal scrolling.'
      ],
      correct: 0,
      explanation: '`overflow: hidden` clips any scaled content (like zoomed images) to card border radius boundaries.'
    },
    {
      id: 'q5',
      question: 'Which CSS Grid declaration creates a 3-column layout for desktop portfolio cards?',
      options: [
        'grid-template-columns: repeat(3, 1fr);',
        'flex-direction: row-reverse;',
        'display: inline-block;',
        'margin: 3px;'
      ],
      correct: 0,
      explanation: '`repeat(3, 1fr)` splits available container width evenly across 3 equal columns.'
    },
    {
      id: 'q6',
      question: 'What is the purpose of HTML data attributes like `data-category="web"` on project cards?',
      options: [
        'They give JavaScript custom data values on HTML elements so scripts can filter cards easily.',
        'They change font colors automatically.',
        'They load external CSS libraries.',
        'They create database tables.'
      ],
      correct: 0,
      explanation: 'Data attributes (`data-*`) store custom metadata on DOM nodes for easy JavaScript retrieval.'
    },
    {
      id: 'q7',
      question: 'Which JavaScript method selects ALL project card elements with `.project-card` class?',
      options: [
        'document.querySelectorAll(".project-card")',
        'document.getElementById("project-card")',
        'document.getElementsByTagName("card")',
        'document.selectCard()'
      ],
      correct: 0,
      explanation: '`querySelectorAll` returns a NodeList of all matching elements matching the CSS selector.'
    },
    {
      id: 'q8',
      question: 'What does `button.addEventListener("click", function)` do when attached to a filter button?',
      options: [
        'It listens for user clicks on the button and executes the specified JavaScript function.',
        'It changes the button URL link.',
        'It reloads the website page.',
        'It deletes the button from HTML.'
      ],
      correct: 0,
      explanation: '`addEventListener("click", ...)` binds an interactive click handler function to DOM elements.'
    },
    {
      id: 'q9',
      question: 'How does JavaScript filter project cards when a user clicks the "WEB" category filter button?',
      options: [
        'It loops through cards, checks `card.getAttribute("data-category")`, and sets `card.style.display = "flex"` for matching cards and `"none"` for non-matching.',
        'It deletes all HTML elements except WEB tags.',
        'It changes CSS background colors to blue.',
        'It closes the web browser tab.'
      ],
      correct: 0,
      explanation: 'Toggling `display: flex/block` vs `display: none` shows or hides cards based on category criteria.'
    },
    {
      id: '10',
      question: 'Why do we use flex column layout (`display: flex; flex-direction: column;`) inside cards with `margin-top: auto;` on CTA buttons?',
      options: [
        'It aligns CTA buttons neatly at the bottom of all cards regardless of varying description text lengths.',
        'It makes images bigger than cards.',
        'It prevents JavaScript from running.',
        'It forces all cards to stay horizontal.'
      ],
      correct: 0,
      explanation: 'Setting `margin-top: auto` in a flex column pushes the element to the bottom edge of the container.'
    },
    {
      id: 'q11',
      question: 'What visual feedback should an active filter button provide to the user?',
      options: [
        'A distinct active CSS state (e.g. bold contrast color, solid background, shadow) so users know which category is filtered.',
        'It should vanish completely.',
        'It should spin continuously.',
        'It should display error text.'
      ],
      correct: 0,
      explanation: 'Active filter state signals the current filtering view clearly to website visitors.'
    },
    {
      id: 'q12',
      question: 'How should a 3-column project grid adapt for narrow mobile screens?',
      options: [
        'Collapse to 1 column (`grid-template-columns: 1fr`) for easy single-column vertical scrolling.',
        'Keep 3 columns and shrink text until unreadable.',
        'Remove all project images.',
        'Disable button clicks.'
      ],
      correct: 0,
      explanation: 'Media queries adjust grid columns to 1fr on mobile screens so content fits naturally without horizontal scroll.'
    }
  ];

  const handleQuizSelect = (qId, optIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  const quizAttempted = Object.keys(quizAnswers).length === 12;
  const isDay6Completed = guidedBuildStage >= 18 && quizAttempted;
  
  // Progress calculation for Day 6 (30% overall)
  const overallCourseProgress = isDay6Completed ? 30 : 25 + Math.round((guidedBuildStage / 18) * 5);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      
      {/* 💅 GLOBAL CSS STYLES FOR HOVER ANIMATION & FILTER STYLING */}
      <style>{`
        .portfolio-card-hoverable {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer;
        }
        .portfolio-card-hoverable:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 16px 32px rgba(37, 99, 235, 0.16) !important;
          border-color: #93c5fd !important;
        }
        .portfolio-card-hoverable:hover .card-zoom-img {
          transform: scale(1.06) !important;
        }
        .card-zoom-img {
          transition: transform 0.4s ease !important;
        }
      `}</style>

      {/* 🌟 COURSE HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#ffffff',
        boxShadow: '0 20px 30px rgba(15, 23, 42, 0.25)',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '30px', width: 'fit-content', marginBottom: '1.25rem' }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Day 6 • 20 Days Progressive Practical Track
          </span>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          Day 6 — Build a Professional Portfolio / Projects Section
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#e0e7ff', margin: 0, maxWidth: '880px', lineHeight: 1.6 }}>
          Master HTML <code>&lt;section id="projects"&gt;</code>, project cards, <code>object-fit: cover</code> images, CSS Grid 3-column layout, technology tag pills, image zoom hover transitions, data attributes (<code>data-category</code>), and interactive <strong>JavaScript DOM filtering</strong>.
        </p>
      </div>

      {/* 📊 COURSE PROGRESS TRACKER WIDGET */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            AI-Powered Web Design • Day 6 / 20
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', marginTop: 2 }}>
            Overall Course Progress: {overallCourseProgress}%
          </div>
        </div>

        {/* Progress Bar & Indicators */}
        <div style={{ flex: 1, maxWidth: '440px', minWidth: '240px' }}>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ height: '100%', width: `${(overallCourseProgress / 30) * 100}%`, background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
            <span>Day 5 (25%)</span>
            <span style={{ color: '#2563eb', fontWeight: 800 }}>Day 6 (30% Goal)</span>
            <span>Day 7 (35%)</span>
          </div>
        </div>

        {/* Status Badge */}
        <div style={{
          background: isDay6Completed ? '#dcfce7' : '#eff6ff',
          color: isDay6Completed ? '#166534' : '#1e40af',
          border: `1px solid ${isDay6Completed ? '#bbf7d0' : '#bfdbfe'}`,
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {isDay6Completed ? (
            <>
              <Trophy size={16} color="#16a34a" /> Day 6 Mastered!
            </>
          ) : (
            <>
              <Sliders size={16} color="#2563eb" /> Build &amp; Test Filter Below
            </>
          )}
        </div>
      </div>

      {/* ==================== TAB CONTENT AREA ==================== */}

      {/* ==================== SECTION 1 & 2: INTRO & BUSINESS QUESTION ==================== */}
      {activeTab === 'intro' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              1. Business Context &amp; Objective
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
              "If a customer likes your services, what will they ask next?"
            </h2>

            <p style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              In Day 5, we built the <strong>Services Section</strong> which lists what services a business can offer. However, any smart customer or employer will immediately ask:
            </p>

            <div style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb', padding: '1.25rem 1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.25rem' }}>
                ❓ "Have you actually done this kind of work before? Can I see real examples?"
              </div>
              <div style={{ fontSize: '0.9rem', color: '#1e3a8a' }}>
                This is where the <strong>PORTFOLIO / PROJECTS SECTION</strong> becomes essential!
              </div>
            </div>

            {/* Services vs Portfolio Comparison */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              Services vs Portfolio: What is the difference?
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <PenTool size={20} /> SERVICES SECTION
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem' }}>
                  "What we CAN do" (Capabilities &amp; Offerings)
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                  <li>Web Development Track</li>
                  <li>UI &amp; UX Design</li>
                  <li>Data &amp; Business Analytics</li>
                  <li>AI Solution Integration</li>
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <Briefcase size={20} /> PORTFOLIO / PROJECTS SECTION
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', marginBottom: '0.75rem' }}>
                  "What we HAVE BUILT" (Concrete Proof &amp; Case Studies)
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#166534', lineHeight: 1.6 }}>
                  <li>Business Landing Page (WEB)</li>
                  <li>Learning Dashboard (WEB)</li>
                  <li>Analytics Visualizer (DATA)</li>
                  <li>E-Commerce Mobile App (DESIGN)</li>
                </ul>
              </div>
            </div>

            {/* Examples across industries */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              How Different Businesses Call Their Portfolio Section:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.86rem' }}>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}><strong>IT / Training Company:</strong> Projects</div>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}><strong>UI Designer:</strong> Portfolio</div>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}><strong>Photographer:</strong> Photo Gallery</div>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}><strong>Restaurant:</strong> Food Showcase</div>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}><strong>Interior Designer:</strong> Completed Spaces</div>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}><strong>Freelancer:</strong> Case Studies</div>
            </div>

            {/* Continuous Website Blueprint */}
            <div style={{ marginTop: '2rem', background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '1rem' }}>
                🖥️ Continuous Website Progress Blueprint — Navbar → Hero → About → Services → Projects
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: '#1e293b', padding: '10px 16px', borderRadius: '8px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', justify: 'space-between' }}>
                  <span>1. NAVBAR (Day 2)</span>
                  <span style={{ color: '#4ade80' }}>✓ Completed</span>
                </div>
                <div style={{ background: '#1e293b', padding: '10px 16px', borderRadius: '8px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', justify: 'space-between' }}>
                  <span>2. HERO SECTION (Day 3)</span>
                  <span style={{ color: '#4ade80' }}>✓ Completed</span>
                </div>
                <div style={{ background: '#1e293b', padding: '10px 16px', borderRadius: '8px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', justify: 'space-between' }}>
                  <span>3. ABOUT SECTION (Day 4)</span>
                  <span style={{ color: '#4ade80' }}>✓ Completed</span>
                </div>
                <div style={{ background: '#1e293b', padding: '10px 16px', borderRadius: '8px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', justify: 'space-between' }}>
                  <span>4. SERVICES SECTION (Day 5)</span>
                  <span style={{ color: '#4ade80' }}>✓ Completed</span>
                </div>
                <div style={{ background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)', padding: '12px 16px', borderRadius: '8px', border: '1px solid #60a5fa', color: '#ffffff', fontSize: '0.9rem', fontWeight: 900, display: 'flex', justify: 'space-between', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                  <span>5. PORTFOLIO / PROJECTS SECTION (Day 6)</span>
                  <span style={{ color: '#fef08a' }}>⚡ BUILDING TODAY</span>
                </div>
              </div>
            </div>

          </div>

          <button
            onClick={() => handleTabChange('visual')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Target Output &amp; Card Explorer <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 3 & 4: TARGET OUTPUT & CARD EXPLORER ==================== */}
      {activeTab === 'visual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Target Visual Output &amp; Interactive Filtering Preview
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Below is the target <strong>Projects Section</strong> for <strong>Alpha Fly Theni</strong>. Try clicking the filter buttons (<strong>[ALL] [WEB] [DESIGN] [DATA]</strong>) to test live JavaScript category filtering!
            </p>

            {/* Target Live Filter Demo */}
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Live Interactive Target Result:
                </span>
                <button
                  onClick={() => setShowTargetCodeBreakdown(!showTargetCodeBreakdown)}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {showTargetCodeBreakdown ? 'Hide Code Breakdown' : 'See How It Is Built'}
                </button>
              </div>

              {/* Target Rendered Output */}
              <section id="projects" style={{ background: '#ffffff', color: '#0f172a', borderRadius: '14px', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#2563eb', letterSpacing: '1px' }}>OUR RECENT WORK</span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0.4rem 0 0.6rem 0', color: '#0f172a' }}>Featured Projects &amp; Client Work</h2>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '560px', margin: '0 auto' }}>
                    A selection of practical work created using web technologies, UI design, and data concepts.
                  </p>
                </div>

                {/* Filter Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  {['all', 'web', 'design', 'data'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTargetFilter(cat)}
                      style={{
                        background: targetFilter === cat ? '#2563eb' : '#f1f5f9',
                        color: targetFilter === cat ? '#ffffff' : '#475569',
                        border: targetFilter === cat ? '1px solid #2563eb' : '1px solid #cbd5e1',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        boxShadow: targetFilter === cat ? '0 4px 12px rgba(37,99,235,0.25)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  {targetProjectsList
                    .filter(p => targetFilter === 'all' || p.category === targetFilter)
                    .map(proj => (
                      <div
                        key={proj.id}
                        className="portfolio-card-hoverable"
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                        }}
                      >
                        <div style={{ width: '100%', height: '170px', overflow: 'hidden', background: '#f1f5f9' }}>
                          <img src={proj.img} alt={proj.title} className="card-zoom-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#2563eb', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                            {proj.category.toUpperCase()}
                          </span>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                            {proj.title}
                          </h3>
                          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                            {proj.desc}
                          </p>

                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                            {proj.tags.map((t, idx) => (
                              <span key={idx} style={{ background: '#f1f5f9', color: '#334155', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                                {t}
                              </span>
                            ))}
                          </div>

                          <a href="#view" style={{ marginTop: 'auto', color: '#2563eb', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none' }}>
                            {proj.cta}
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </section>

              {/* Code Breakdown Modal Toggle */}
              {showTargetCodeBreakdown && (
                <div style={{ marginTop: '1.5rem', background: '#1e293b', borderRadius: '12px', padding: '1.25rem', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                    <button
                      onClick={() => setTargetCodeTab('html')}
                      style={{ background: targetCodeTab === 'html' ? '#2563eb' : '#334155', color: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      HTML
                    </button>
                    <button
                      onClick={() => setTargetCodeTab('css')}
                      style={{ background: targetCodeTab === 'css' ? '#2563eb' : '#334155', color: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      CSS
                    </button>
                    <button
                      onClick={() => setTargetCodeTab('js')}
                      style={{ background: targetCodeTab === 'js' ? '#2563eb' : '#334155', color: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      JavaScript
                    </button>
                  </div>

                  <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b', overflowX: 'auto' }}>
                    {targetCodeTab === 'html' && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alpha Fly Theni - Projects</title>
</head>
<body>

  <!-- Day 2 Navbar -->
  <header style="display:flex; justify-content:space-between; align-items:center; background:#1e1b4b; padding:1rem 2rem; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly Theni</div>
    <nav style="display:flex; gap:1rem; font-size:0.9rem;">
      <a href="#home" style="color:#cbd5e1; text-decoration:none;">Home</a>
      <a href="#projects" style="color:#60a5fa; font-weight:800; text-decoration:none;">Projects</a>
    </nav>
  </header>

  <!-- Day 6 Projects Section -->
  <section id="projects">
    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">ALL</button>
      <button class="filter-btn" data-filter="web">WEB</button>
    </div>
    <div class="projects-grid">
      <div class="project-card" data-category="web">
        <img src="project1.jpg" alt="Business Landing Page" />
        <span class="card-category">WEB</span>
        <h3>Business Landing Page</h3>
        <div class="card-tags"><span>HTML</span><span>CSS</span></div>
        <a href="#">View Project →</a>
      </div>
    </div>
  </section>

</body>
</html>`)}
                    {targetCodeTab === 'css' && <pre style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'monospace', color: '#34d399' }}>{`.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.project-card {
  border-radius: 16px;
  overflow: hidden;
  display: flex; flex-direction: column;
}
.project-card img {
  width: 100%; height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.project-card:hover img { transform: scale(1.06); }`}</pre>}
                    {targetCodeTab === 'js' && <pre style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'monospace', color: '#fbbf24' }}>{`const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      card.style.display = (filter === 'all' || category === filter) ? 'flex' : 'none';
    });
  });
});`}</pre>}
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Interactive Project Card Component Explorer */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              Interactive Project Card Explorer — Click Any Component:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '1.25rem' }}>
              {Object.keys(explorerItemsData).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedExplorerItem(key)}
                  style={{
                    background: selectedExplorerItem === key ? '#2563eb' : '#f8fafc',
                    color: selectedExplorerItem === key ? '#ffffff' : '#334155',
                    border: selectedExplorerItem === key ? '1px solid #2563eb' : '1px solid #cbd5e1',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Explorer Detail Card */}
            <div style={{ background: '#f8fafc', border: '1px solid #3b82f6', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#1e40af', marginBottom: '0.4rem' }}>
                {explorerItemsData[selectedExplorerItem].name}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#334155', margin: '0 0 0.75rem 0' }}>
                <strong>Purpose:</strong> {explorerItemsData[selectedExplorerItem].purpose}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                <div style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>HTML: </span>{explorerItemsData[selectedExplorerItem].htmlRole}
                </div>
                <div style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <span style={{ color: '#059669', fontWeight: 'bold' }}>CSS: </span>{explorerItemsData[selectedExplorerItem].cssRole}
                </div>
              </div>
            </div>

          </div>

          <button
            onClick={() => handleTabChange('html_build')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Step-by-Step HTML Builder <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 5, 6 & 7: HTML STRUCTURE & TREE ==================== */}
      {activeTab === 'html_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              HTML Architecture &amp; Tree Breakdown
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
              Project Card Structural Hierarchy
            </h2>

            {/* Tree Component */}
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Interactive DOM Tree (Click nodes to inspect code):
              </div>

              <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.8 }}>
                <div onClick={() => setSelectedTreeNode('card')} style={{ cursor: 'pointer', color: selectedTreeNode === 'card' ? '#60a5fa' : '#ffffff', fontWeight: 'bold' }}>
                  Project Card (.project-card [data-category="web"])
                </div>
                <div style={{ paddingLeft: '1.5rem' }}>
                  <div onClick={() => setSelectedTreeNode('img')} style={{ cursor: 'pointer', color: selectedTreeNode === 'img' ? '#60a5fa' : '#94a3b8' }}>
                    ├── Image Wrapper (.card-img-wrap) → &lt;img src="..." alt="..." /&gt;
                  </div>
                  <div onClick={() => setSelectedTreeNode('category')} style={{ cursor: 'pointer', color: selectedTreeNode === 'category' ? '#60a5fa' : '#94a3b8' }}>
                    ├── Category Label (&lt;span class="card-category"&gt;WEB&lt;/span&gt;)
                  </div>
                  <div onClick={() => setSelectedTreeNode('title')} style={{ cursor: 'pointer', color: selectedTreeNode === 'title' ? '#60a5fa' : '#94a3b8' }}>
                    ├── Title (&lt;h3 class="card-title"&gt;Business Landing Page&lt;/h3&gt;)
                  </div>
                  <div onClick={() => setSelectedTreeNode('desc')} style={{ cursor: 'pointer', color: selectedTreeNode === 'desc' ? '#60a5fa' : '#94a3b8' }}>
                    ├── Description (&lt;p class="card-desc"&gt;A responsive website...&lt;/p&gt;)
                  </div>
                  <div onClick={() => setSelectedTreeNode('tags')} style={{ cursor: 'pointer', color: selectedTreeNode === 'tags' ? '#60a5fa' : '#94a3b8' }}>
                    ├── Technology Tags (.card-tags) → &lt;span class="tag"&gt;HTML&lt;/span&gt;
                  </div>
                  <div onClick={() => setSelectedTreeNode('cta')} style={{ cursor: 'pointer', color: selectedTreeNode === 'cta' ? '#60a5fa' : '#94a3b8' }}>
                    └── CTA Action Link (&lt;a href="#" class="btn-project"&gt;View Project →&lt;/a&gt;)
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Progressive HTML Build */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              Step-by-Step HTML Construction (Steps 1–6):
            </h3>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5, 6].map(st => (
                <button
                  key={st}
                  onClick={() => setHtmlBuildStep(st)}
                  style={{
                    background: htmlBuildStep === st ? '#2563eb' : '#f1f5f9',
                    color: htmlBuildStep === st ? '#ffffff' : '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Step {st}
                </button>
              ))}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
              {htmlBuildStep === 1 && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                    Step 1: Create Section Element &amp; Connect to Navbar Link (#projects)
                  </div>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1rem', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    {`<section id="projects" class="projects-section">
  <!-- Projects container will go here -->
</section>`}
                  </pre>
                </div>
              )}

              {htmlBuildStep === 2 && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                    Step 2: Add Section Label Badge ("OUR RECENT WORK")
                  </div>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1rem', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    {`<span class="section-label">OUR RECENT WORK</span>`}
                  </pre>
                </div>
              )}

              {htmlBuildStep === 3 && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                    Step 3: Add Main Heading (&lt;h2&gt;)
                  </div>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1rem', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    {`<h2 class="section-title">Featured Projects & Client Work</h2>`}
                  </pre>
                </div>
              )}

              {htmlBuildStep === 4 && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                    Step 4: Add Concise Section Description Paragraph (&lt;p&gt;)
                  </div>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1rem', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    {`<p class="section-description">
  A selection of practical work created using web technologies, UI design, and data concepts.
</p>`}
                  </pre>
                </div>
              )}

              {htmlBuildStep === 5 && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                    Step 5: Create First Project Card with Data Category Attribute
                  </div>
                  <pre style={{ background: '#0f172a', color: '#60a5fa', padding: '1rem', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    {`<div class="project-card" data-category="web">
  <div class="card-img-wrap">
    <img src="project1.jpg" alt="Business Landing Page" />
  </div>
  <div class="card-content">
    <span class="card-category">WEB</span>
    <h3 class="card-title">Business Landing Page</h3>
    <p class="card-desc">A responsive website designed for a local business.</p>
    <div class="card-tags">
      <span class="tag">HTML</span>
      <span class="tag">CSS</span>
    </div>
    <a href="#" class="btn-project">View Project →</a>
  </div>
</div>`}
                  </pre>
                </div>
              )}

              {htmlBuildStep === 6 && (
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                    Step 6: Add Additional Cards (4–6 Project Cards following the exact same structure)
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                    Repeated card components should maintain consistent HTML nesting so CSS Grid and JavaScript category filters work uniformly across all cards.
                  </p>
                </div>
              )}
            </div>

          </div>

          <button
            onClick={() => handleTabChange('css_grid')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: CSS Grid &amp; Image Handling <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 8–15: CSS GRID, OBJECT-FIT & HOVER EFFECTS ==================== */}
      {activeTab === 'css_grid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              CSS Styling &amp; Layout Engineering
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
              Image Handling (`object-fit: cover`), CSS Grid &amp; Hover Effects
            </h2>

            {/* Image object-fit Before/After Comparison */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              1. Image Fitting Concept (`object-fit: cover`)
            </h3>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
              <button
                onClick={() => setObjectFitMode('none')}
                style={{ background: objectFitMode === 'none' ? '#ef4444' : '#f1f5f9', color: objectFitMode === 'none' ? '#ffffff' : '#334155', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
              >
                ❌ Without object-fit (Stretched)
              </button>
              <button
                onClick={() => setObjectFitMode('cover')}
                style={{ background: objectFitMode === 'cover' ? '#10b981' : '#f1f5f9', color: objectFitMode === 'cover' ? '#ffffff' : '#334155', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
              >
                ✅ With object-fit: cover (Clean Aspect Ratio)
              </button>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '14px', padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '6px' }}>Image Container (200px Height):</div>
                <div style={{ width: '100%', height: '180px', background: '#334155', borderRadius: '8px', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
                    alt="Demo"
                    style={{ width: '100%', height: '100%', objectFit: objectFitMode }}
                  />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', marginBottom: '6px' }}>CSS Rule Applied:</div>
                <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace', margin: 0 }}>
                  {`.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: ${objectFitMode};
}`}
                </pre>
                <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.75rem', lineHeight: 1.5 }}>
                  {objectFitMode === 'cover' 
                    ? '`object-fit: cover` fills the 200px height perfectly without squishing or distorting the photo!' 
                    : 'Without `object-fit: cover`, images with different aspect ratios stretch unnaturally.'}
                </div>
              </div>
            </div>

            {/* CSS Grid Interactive Visualizer */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              2. Interactive CSS Grid Visualizer
            </h3>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '4px' }}>Columns (`grid-template-columns`):</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4].map(c => (
                      <button
                        key={c}
                        onClick={() => setGridCols(c)}
                        style={{ background: gridCols === c ? '#2563eb' : '#ffffff', color: gridCols === c ? '#ffffff' : '#334155', border: '1px solid #cbd5e1', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        {c} Col
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '4px' }}>Gap Spacing (`gap`):</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[10, 20, 30, 40].map(g => (
                      <button
                        key={g}
                        onClick={() => setGridGap(g)}
                        style={{ background: gridGap === g ? '#2563eb' : '#ffffff', color: gridGap === g ? '#ffffff' : '#334155', border: '1px solid #cbd5e1', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                      >
                        {g}px
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid Output */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: `${gridGap}px` }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{ background: '#ffffff', border: '1px solid #2563eb', padding: '1rem', borderRadius: '10px', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#1e40af' }}>
                    Card {n}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 15: Card Height Consistency & Flexbox Solution */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              3. Card Height Consistency &amp; Alignment Problem
            </h3>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
              <button
                onClick={() => setHeightLayoutMode('unbalanced')}
                style={{ background: heightLayoutMode === 'unbalanced' ? '#ef4444' : '#f1f5f9', color: heightLayoutMode === 'unbalanced' ? '#ffffff' : '#334155', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
              >
                ❌ Unbalanced Card Heights &amp; Misaligned CTAs
              </button>
              <button
                onClick={() => setHeightLayoutMode('flex_balanced')}
                style={{ background: heightLayoutMode === 'flex_balanced' ? '#10b981' : '#f1f5f9', color: heightLayoutMode === 'flex_balanced' ? '#ffffff' : '#334155', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
              >
                ✅ Balanced Cards (`display: flex; flex-direction: column; margin-top: auto;`)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: heightLayoutMode === 'flex_balanced' ? 'column' : 'block', height: '100%' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Short Project Title</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Short 1-line description here.</p>
                <a href="#demo" style={{ marginTop: heightLayoutMode === 'flex_balanced' ? 'auto' : '10px', color: '#2563eb', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>View Project →</a>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: heightLayoutMode === 'flex_balanced' ? 'column' : 'block', height: '100%' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Detailed E-Commerce App Project Title</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>This project contains multiple paragraphs of detailed explanation about customer user flow, payment gateways, and shopping cart design.</p>
                <a href="#demo" style={{ marginTop: heightLayoutMode === 'flex_balanced' ? 'auto' : '10px', color: '#2563eb', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>View Project →</a>
              </div>
            </div>

          </div>

          <button
            onClick={() => handleTabChange('js_filter')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: DOM Interaction &amp; JS Filtering <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 16–21: JAVASCRIPT DOM FILTERING SIMULATOR ==================== */}
      {activeTab === 'js_filter' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              First JavaScript DOM Concept
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
              How JavaScript Filters Portfolio Projects in Real Time
            </h2>

            <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Today students learn their first practical introduction to <strong>JavaScript DOM Interaction</strong>! We use 5 fundamental JS building blocks to make category buttons filter project cards:
            </p>

            {/* 5 JS Concepts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563eb' }}>1. querySelectorAll()</div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>Selects all matching HTML elements in document (e.g. all `.filter-btn`).</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563eb' }}>2. addEventListener()</div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>Listens for user clicks on a button and triggers a function.</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563eb' }}>3. getAttribute('data-*')</div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>Reads category metadata stored on cards (`data-category="web"`).</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563eb' }}>4. classList.add/remove</div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>Toggles active visual highlight styling on buttons.</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563eb' }}>5. card.style.display</div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>Sets matching cards to `'flex'` and non-matching cards to `'none'`.</div>
              </div>
            </div>

            {/* Interactive JS Step Simulator */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              Interactive JS Execution Simulator — Step-by-Step Walkthrough:
            </h3>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5, 6].map(step => (
                <button
                  key={step}
                  onClick={() => setJsFilterStep(step)}
                  style={{
                    background: jsFilterStep === step ? '#2563eb' : '#f1f5f9',
                    color: jsFilterStep === step ? '#ffffff' : '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Step {step}
                </button>
              ))}
            </div>

            <div style={{ background: '#0f172a', borderRadius: '14px', padding: '1.25rem', color: '#ffffff' }}>
              {jsFilterStep === 1 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa', marginBottom: '6px' }}>
                    Step 1 — Select Elements from DOM:
                  </div>
                  <pre style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {`const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');`}
                  </pre>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '6px' }}>
                    `querySelectorAll` finds all elements matching `.filter-btn` and `.project-card` on the page.
                  </div>
                </div>
              )}

              {jsFilterStep === 2 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa', marginBottom: '6px' }}>
                    Step 2 — Attach Click Listener:
                  </div>
                  <pre style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {`filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Executes when user clicks button!
  });
});`}
                  </pre>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '6px' }}>
                    Loop through each button and listen for user clicks.
                  </div>
                </div>
              )}

              {jsFilterStep === 3 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa', marginBottom: '6px' }}>
                    Step 3 — Read Selected Category Filter:
                  </div>
                  <pre style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {`const filterValue = btn.getAttribute('data-filter');`}
                  </pre>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '6px' }}>
                    Extracts `data-filter` value (e.g. `'web'`, `'design'`, `'data'`, `'all'`).
                  </div>
                </div>
              )}

              {jsFilterStep === 4 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa', marginBottom: '6px' }}>
                    Step 4 — Loop Through All Project Cards:
                  </div>
                  <pre style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {`projectCards.forEach(card => {
  const cardCategory = card.getAttribute('data-category');
});`}
                  </pre>
                </div>
              )}

              {jsFilterStep === 5 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa', marginBottom: '6px' }}>
                    Step 5 — Compare Category Values (Conditional Logic):
                  </div>
                  <pre style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {`if (filterValue === 'all' || cardCategory === filterValue) {
  // Matches selected category!
}`}
                  </pre>
                </div>
              )}

              {jsFilterStep === 6 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#60a5fa', marginBottom: '6px' }}>
                    Step 6 — Show or Hide Cards:
                  </div>
                  <pre style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {`card.style.display = 'flex'; // Show card
// OR
card.style.display = 'none'; // Hide card`}
                  </pre>
                </div>
              )}
            </div>

          </div>

          <button
            onClick={() => handleTabChange('responsive')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Responsive Portfolio &amp; Device Tester <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 22–23: RESPONSIVE PORTFOLIO ==================== */}
      {activeTab === 'responsive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Responsive Design &amp; Device Adaptation
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
              Responsive Portfolio Grid across Mobile, Tablet &amp; Desktop
            </h2>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setResponsiveDevice('desktop')}
                style={{
                  background: responsiveDevice === 'desktop' ? '#2563eb' : '#f1f5f9',
                  color: responsiveDevice === 'desktop' ? '#ffffff' : '#334155',
                  border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Monitor size={16} /> Desktop (3 Cols)
              </button>
              <button
                onClick={() => setResponsiveDevice('tablet')}
                style={{
                  background: responsiveDevice === 'tablet' ? '#2563eb' : '#f1f5f9',
                  color: responsiveDevice === 'tablet' ? '#ffffff' : '#334155',
                  border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Tablet size={16} /> Tablet (2 Cols)
              </button>
              <button
                onClick={() => setResponsiveDevice('mobile')}
                style={{
                  background: responsiveDevice === 'mobile' ? '#2563eb' : '#f1f5f9',
                  color: responsiveDevice === 'mobile' ? '#ffffff' : '#334155',
                  border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Smartphone size={16} /> Mobile (1 Col Stack)
              </button>
            </div>

            {/* Device Container Frame */}
            <div style={{
              margin: '0 auto',
              maxWidth: responsiveDevice === 'desktop' ? '100%' : responsiveDevice === 'tablet' ? '768px' : '380px',
              border: '2px dashed #3b82f6',
              borderRadius: '16px',
              padding: '1.25rem',
              background: '#f8fafc',
              transition: 'all 0.4s ease'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Simulated Screen Width: {responsiveDevice === 'desktop' ? '1200px' : responsiveDevice === 'tablet' ? '768px' : '380px'}
              </div>

              {/* Grid Output */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: responsiveDevice === 'desktop' ? 'repeat(3, 1fr)' : responsiveDevice === 'tablet' ? 'repeat(2, 1fr)' : '1fr',
                gap: '1rem'
              }}>
                {targetProjectsList.slice(0, 3).map(p => (
                  <div key={p.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ width: '100%', height: '100px', background: '#e2e8f0', borderRadius: '6px', marginBottom: '8px', overflow: 'hidden' }}>
                      <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#2563eb' }}>{p.category.toUpperCase()}</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{p.title}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <button
            onClick={() => handleTabChange('guided_build')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Build With Me (18 Stages) <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 25: GUIDED BUILD (18 STAGES) ==================== */}
      {activeTab === 'guided_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Interactive Guided Build
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                  Build Your Portfolio (18 Stages)
                </h2>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: '20px', color: '#1e40af', fontSize: '0.85rem', fontWeight: 800 }}>
                Progress: Stage {guidedBuildStage} / 18
              </div>
            </div>

            {/* Stages Selector Buttons */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '1.25rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {Array.from({ length: 18 }, (_, i) => i + 1).map(st => (
                <button
                  key={st}
                  onClick={() => setGuidedBuildStage(st)}
                  style={{
                    background: guidedBuildStage === st ? '#2563eb' : guidedBuildStage > st ? '#dcfce7' : '#f1f5f9',
                    color: guidedBuildStage === st ? '#ffffff' : guidedBuildStage > st ? '#166534' : '#475569',
                    border: '1px solid #cbd5e1',
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Active Stage Box */}
            {(() => {
              const currentStage = [
                {
                  title: 'Create Projects section tag (<section id="projects">)',
                  code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly - Portfolio</title>
</head>
<body>
  <section id="projects" class="projects-section">
  </section>
</body>
</html>`,
                  lang: 'html',
                  explanation: 'Define the outer semantic <section> container with id="projects" for navigation anchor links.',
                  render: <div style={{ padding: '1rem', background: '#ffffff', border: '2px dashed #94a3b8', borderRadius: '8px', color: '#64748b', fontSize: '0.84rem' }}>[Empty Projects Section Container]</div>
                },
                {
                  title: 'Add section container and label ("OUR RECENT WORK")',
                  code: `<section id="projects" class="projects-section">
  <div class="container">
    <span class="section-label">OUR RECENT WORK</span>
  </div>
</section>`,
                  lang: 'html',
                  explanation: 'Add a centered max-width container wrapper and an uppercase blue category section badge.',
                  render: (
                    <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px', textTransform: 'uppercase' }}>OUR RECENT WORK</span>
                    </div>
                  )
                },
                {
                  title: 'Add section title and description',
                  code: `<section id="projects" class="projects-section">
  <div class="container">
    <span class="section-label">OUR RECENT WORK</span>
    <h2 class="section-title">Featured Student & Client Projects</h2>
    <p class="section-desc">Explore practical web applications built by our students.</p>
  </div>
</section>`,
                  lang: 'html',
                  explanation: 'Add an h2 section title and a descriptive lead paragraph.',
                  render: (
                    <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px', textTransform: 'uppercase' }}>OUR RECENT WORK</span>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 6px 0' }}>Featured Student & Client Projects</h2>
                      <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>Explore practical web applications built by our students.</p>
                    </div>
                  )
                },
                {
                  title: 'Create first project card wrapper with data-category="web"',
                  code: `<div class="portfolio-grid">
  <div class="project-card" data-category="web">
    <!-- Project card content goes here -->
  </div>
</div>`,
                  lang: 'html',
                  explanation: 'Create the card wrapper element and set data-category="web" attribute for JS filtering.',
                  render: (
                    <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '2px dashed #3b82f6', maxWidth: '280px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6' }}>data-category="web"</div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>[Project Card Wrapper Created]</div>
                    </div>
                  )
                },
                {
                  title: 'Add project image with object-fit: cover',
                  code: `<div class="project-card" data-category="web">
  <div class="card-image-wrap">
    <img src="project-web1.jpg" alt="EduLearn LMS Web App">
  </div>
</div>`,
                  lang: 'html',
                  explanation: 'Wrap image in a container and use object-fit: cover for aspect ratio handling.',
                  render: (
                    <div style={{ maxWidth: '280px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#ffffff' }}>
                      <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        📷 project-web1.jpg
                      </div>
                    </div>
                  )
                },
                {
                  title: 'Add category label badge (<span class="card-category">WEB</span>)',
                  code: `<div class="card-image-wrap">
  <img src="project-web1.jpg" alt="EduLearn LMS Web App">
  <span class="card-category">WEB</span>
</div>`,
                  lang: 'html',
                  explanation: 'Overlay a small category badge over top corner of the project thumbnail.',
                  render: (
                    <div style={{ maxWidth: '280px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#ffffff', position: 'relative' }}>
                      <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        📷 project-web1.jpg
                      </div>
                      <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#2563eb', color: 'white', padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>WEB</span>
                    </div>
                  )
                },
                {
                  title: 'Add project title (<h3>)',
                  code: `<div class="card-body">
  <h3 class="card-title">EduLearn LMS Web Portal</h3>
</div>`,
                  lang: 'html',
                  explanation: 'Add an h3 heading element inside the card body.',
                  render: (
                    <div style={{ maxWidth: '280px', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem', background: '#ffffff' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>EduLearn LMS Web Portal</h3>
                    </div>
                  )
                },
                {
                  title: 'Add project description paragraph (<p>)',
                  code: `<div class="card-body">
  <h3 class="card-title">EduLearn LMS Web Portal</h3>
  <p class="card-desc">Full-featured learning management dashboard with real-time progress tracking.</p>
</div>`,
                  lang: 'html',
                  explanation: 'Add a concise overview paragraph describing features built in the project.',
                  render: (
                    <div style={{ maxWidth: '280px', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem', background: '#ffffff' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>EduLearn LMS Web Portal</h3>
                      <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>Full-featured learning management dashboard with real-time progress tracking.</p>
                    </div>
                  )
                },
                {
                  title: 'Add technology tag pills (<span class="tag">)',
                  code: `<div class="tech-tags">
  <span class="tag">HTML5</span>
  <span class="tag">CSS Grid</span>
  <span class="tag">JS ES6</span>
</div>`,
                  lang: 'html',
                  explanation: 'Display technology tag pills for technologies used in this project.',
                  render: (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>HTML5</span>
                      <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>CSS Grid</span>
                      <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>JS ES6</span>
                    </div>
                  )
                },
                {
                  title: 'Add View Project CTA link (<a>)',
                  code: `<a href="#demo" class="card-link">View Project Demo →</a>`,
                  lang: 'html',
                  explanation: 'Add action CTA link targeting live demo URL or repository.',
                  render: (
                    <a href="#" onClick={e=>e.preventDefault()} style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.84rem', textDecoration: 'none' }}>
                      View Project Demo →
                    </a>
                  )
                },
                {
                  title: 'Add additional project cards (WEB, DESIGN, DATA categories)',
                  code: `<div class="portfolio-grid">
  <div class="project-card" data-category="web">...</div>
  <div class="project-card" data-category="design">...</div>
  <div class="project-card" data-category="data">...</div>
</div>`,
                  lang: 'html',
                  explanation: 'Populate the portfolio section with cards spanning WEB, DESIGN, and DATA categories.',
                  render: (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <div style={{ padding: '6px 10px', background: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe', fontSize: '0.78rem', fontWeight: 700, color: '#1e40af' }}>Card 1: Web</div>
                      <div style={{ padding: '6px 10px', background: '#fdf4ff', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.78rem', fontWeight: 700, color: '#86198f' }}>Card 2: Design</div>
                      <div style={{ padding: '6px 10px', background: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '0.78rem', fontWeight: 700, color: '#166534' }}>Card 3: Data</div>
                    </div>
                  )
                },
                {
                  title: 'Style CSS Grid container (repeat(3, 1fr), gap: 2rem)',
                  code: `.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}`,
                  lang: 'css',
                  explanation: 'Set display: grid with repeat(auto-fit, minmax(300px, 1fr)) for responsive multi-column layout.',
                  render: (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
                      <div style={{ background: '#2563eb', color: 'white', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>Grid 1</div>
                      <div style={{ background: '#2563eb', color: 'white', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>Grid 2</div>
                      <div style={{ background: '#2563eb', color: 'white', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>Grid 3</div>
                    </div>
                  )
                },
                {
                  title: 'Add image zoom hover effect (transform: scale(1.06))',
                  code: `.card-image-wrap img {
  transition: transform 0.4s ease;
}
.project-card:hover img {
  transform: scale(1.06);
}`,
                  lang: 'css',
                  explanation: 'Add smooth scale transformation on card hover for dynamic visual feedback.',
                  render: (
                    <div style={{ width: '120px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #2563eb' }}>
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2563eb, #1e1b4b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.72rem', transform: 'scale(1.08)' }}>
                        Zoomed Image
                      </div>
                    </div>
                  )
                },
                {
                  title: 'Add category filter buttons HTML with data-filter',
                  code: `<div class="filter-buttons">
  <button class="filter-btn active" data-filter="all">All Projects</button>
  <button class="filter-btn" data-filter="web">Web Apps</button>
  <button class="filter-btn" data-filter="design">UI/UX Design</button>
</div>`,
                  lang: 'html',
                  explanation: 'Create filter buttons equipped with custom data-filter attributes.',
                  render: (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>All</button>
                      <button style={{ background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>Web</button>
                      <button style={{ background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>Design</button>
                    </div>
                  )
                },
                {
                  title: 'Add active filter button styling CSS',
                  code: `.filter-btn.active {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}`,
                  lang: 'css',
                  explanation: 'Style active tab state with primary blue theme and elevation shadow.',
                  render: (
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
                      Active State (.active)
                    </button>
                  )
                },
                {
                  title: 'Add JavaScript DOM selection (querySelectorAll)',
                  code: `const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');`,
                  lang: 'js',
                  explanation: 'Query all filter buttons and card nodes from the DOM tree.',
                  render: (
                    <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: '#090d16', color: '#38bdf8', padding: '8px 12px', borderRadius: '6px' }}>
                      Selected 4 filter buttons &amp; 6 project cards
                    </div>
                  )
                },
                {
                  title: 'Add JavaScript addEventListener & category filter logic',
                  code: `filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || filter === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});`,
                  lang: 'js',
                  explanation: 'Attach click listeners, compare data-filter to data-category, and toggle element visibility.',
                  render: (
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 12px', borderRadius: '8px', color: '#166534', fontSize: '0.82rem', fontWeight: 700 }}>
                      ✓ Interactive JS filter logic active!
                    </div>
                  )
                },
                {
                  title: 'Make portfolio grid responsive for mobile devices',
                  code: `@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}`,
                  lang: 'css',
                  explanation: 'Add media query to stack portfolio cards in a single column on smartphones.',
                  render: (
                    <div style={{ maxWidth: '180px', padding: '8px', border: '2px solid #ea580c', borderRadius: '10px', background: '#fff' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>📱 Mobile View (768px)</div>
                      <div style={{ background: '#f1f5f9', padding: '4px 6px', borderRadius: '4px', fontSize: '0.72rem', marginBottom: '3px' }}>Card 1 (Full Width)</div>
                      <div style={{ background: '#f1f5f9', padding: '4px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>Card 2 (Full Width)</div>
                    </div>
                  )
                }
              ][guidedBuildStage - 1];

              return (
                <div style={{ background: '#f8fafc', border: '1px solid #3b82f6', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Stage Header */}
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e40af' }}>
                      Stage {guidedBuildStage}: {currentStage.title}
                    </div>
                    <div style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb', padding: '8px 12px', borderRadius: '0 8px 8px 0', marginTop: '8px', fontSize: '0.85rem', color: '#1e3a8a', fontWeight: 600 }}>
                      💡 Tip: {currentStage.explanation}
                    </div>
                  </div>

                  {/* Code & Live Render Split Display */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {/* Code Snippet Box */}
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: 4 }}>
                        Stage {guidedBuildStage} Code Snippet ({currentStage.lang.toUpperCase()}):
                      </div>
                      <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', maxHeight: '240px', overflowY: 'auto' }}>
                        {renderSyntaxHighlightedHTML(currentStage.code, currentStage.lang)}
                      </div>
                    </div>

                    {/* Live Output Preview Box */}
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', marginBottom: 4 }}>
                        Live Stage Browser Output Preview:
                      </div>
                      <div style={{ background: '#ffffff', border: '2px solid #22c55e', borderRadius: '12px', padding: '1.25rem', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {currentStage.render}
                      </div>
                    </div>
                  </div>

                  {/* Stage Controls */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                    {guidedBuildStage > 1 && (
                      <button
                        onClick={() => setGuidedBuildStage(guidedBuildStage - 1)}
                        style={{ background: '#ffffff', color: '#334155', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        ← Previous Stage
                      </button>
                    )}
                    {guidedBuildStage < 18 && (
                      <button
                        onClick={() => setGuidedBuildStage(guidedBuildStage + 1)}
                        style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        Next Stage →
                      </button>
                    )}
                  </div>

                </div>
              );
            })()}

          </div>

          <button
            onClick={() => handleTabChange('playground')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Live Code Playground <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 24: LIVE CODE PLAYGROUND ==================== */}
      {activeTab === 'playground' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Day 6 Live Code Playground (HTML + CSS + JavaScript)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Edit the HTML, CSS, or JavaScript code below and test real-time category filtering!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              <LiveSyntaxCodeEditor
                label="HTML Code:"
                language="html"
                rows={11}
                value={playgroundHtml}
                onChange={e => setPlaygroundHtml(e.target.value)}
              />

              <LiveSyntaxCodeEditor
                label="CSS Code:"
                language="css"
                rows={11}
                value={playgroundCss}
                onChange={e => setPlaygroundCss(e.target.value)}
              />
            </div>

            {/* JS Editor */}
            <div style={{ marginTop: '1.25rem' }}>
              <LiveSyntaxCodeEditor
                label="JavaScript Code:"
                language="js"
                rows={9}
                value={playgroundJs}
                onChange={e => setPlaygroundJs(e.target.value)}
              />
            </div>

            {/* Interactive Preview Output */}
            <div style={{ marginTop: '1.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '1rem' }}>
                🖥️ Live Interactive Output Preview:
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {['all', 'web', 'design', 'data'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setPlaygroundFilter(cat)}
                    style={{
                      background: playgroundFilter === cat ? '#2563eb' : '#ffffff',
                      color: playgroundFilter === cat ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {targetProjectsList
                  .filter(p => playgroundFilter === 'all' || p.category === playgroundFilter)
                  .map(p => (
                    <div key={p.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#2563eb' }}>{p.category.toUpperCase()}</span>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px 0' }}>{p.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{p.desc}</div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

          <button
            onClick={() => handleTabChange('challenges')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Code Challenges &amp; Debugging <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 26, 27, 28, 29: CODE CHALLENGES & DEBUGGING ==================== */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Interactive Challenges &amp; Debugging
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
              Predict Output &amp; Fix the Broken Portfolio Filter
            </h2>

            {/* Predict Output Challenge */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              1. Predict the Output Question
            </h3>

            <div style={{ background: '#0f172a', color: '#ffffff', padding: '1.25rem', borderRadius: '12px', marginBottom: '1rem' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.82rem', color: '#38bdf8' }}>
                {`button.addEventListener("click", function() {
    console.log("Filter clicked");
});`}
              </pre>
            </div>

            <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
              What happens when the user clicks the button?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
              {[
                { id: 'a', text: 'A. The web page automatically closes.' },
                { id: 'b', text: 'B. The function runs and prints "Filter clicked" to the developer console.' },
                { id: 'c', text: 'C. The image gets deleted from the server.' },
                { id: 'd', text: 'D. CSS styles stop working.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setPredictionAnswers(prev => ({ ...prev, p1: opt.id }));
                    setShowPredictionResults(prev => ({ ...prev, p1: true }));
                  }}
                  style={{
                    background: predictionAnswers.p1 === opt.id ? (opt.id === 'b' ? '#dcfce7' : '#fee2e2') : '#f8fafc',
                    color: predictionAnswers.p1 === opt.id ? (opt.id === 'b' ? '#166534' : '#991b1b') : '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {showPredictionResults.p1 && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '10px', color: '#166534', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                ✅ <strong>Correct!</strong> `addEventListener("click", ...)` binds a callback function that executes when the user clicks the element.
              </div>
            )}

            {/* Debugging Challenge */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              2. Debugging Challenge: Fix the Broken Portfolio Filter
            </h3>

            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '1.25rem', borderRadius: '12px', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#9f1239', marginBottom: '6px' }}>
                ⚠️ Intentional Bug Scenario:
              </div>
              <p style={{ fontSize: '0.85rem', color: '#881337', margin: 0 }}>
                When clicking "WEB", no projects appear! Why is the JavaScript filter broken?
              </p>
              <pre style={{ background: '#0f172a', color: '#f87171', padding: '0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', marginTop: '8px' }}>
                {`// HTML: <div class="project-card" data-category="web-dev">
// JS:   const filter = button.getAttribute("data-filter"); // "web"`}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setShowDebugHint(!showDebugHint)}
                style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                {showDebugHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                onClick={() => setShowDebugSolution(!showDebugSolution)}
                style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                {showDebugSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
            </div>

            {showDebugHint && (
              <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '1rem', borderRadius: '10px', color: '#854d0e', fontSize: '0.85rem', marginBottom: '1rem' }}>
                💡 <strong>Hint:</strong> Check if the data-category attribute string in HTML ("web-dev") matches the filter button data-filter string ("web") exactly!
              </div>
            )}

            {showDebugSolution && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '10px', color: '#166534', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                ✅ <strong>Solution:</strong> Update the HTML to match: <code>&lt;div class="project-card" data-category="web"&gt;</code>. Data attributes must match exact strings for JS comparisons to evaluate to <code>true</code>!
              </div>
            )}

          </div>

          <button
            onClick={() => handleTabChange('assignment')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Assignment &amp; AI Challenge <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 30 & 31: PRACTICE TASK & DAY 6 ASSIGNMENT ==================== */}
      {activeTab === 'assignment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Practice &amp; Assignment
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
              Day 6 Assignment — Build a Business Portfolio
            </h2>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.75rem' }}>
                📋 Assignment Requirements (Minimum 6 Project Cards across 3 Categories):
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>HTML Checklist</div>
                  <div>✓ Semantic &lt;section id="projects"&gt;</div>
                  <div>✓ 6 Project Cards</div>
                  <div>✓ Custom data-category attributes</div>
                  <div>✓ Technology tag pills</div>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#059669', marginBottom: '4px' }}>CSS Checklist</div>
                  <div>✓ CSS Grid layout (repeat(3, 1fr))</div>
                  <div>✓ object-fit: cover on images</div>
                  <div>✓ Zoom hover effects</div>
                  <div>✓ Responsive single-column stack</div>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#d97706', marginBottom: '4px' }}>JS Checklist</div>
                  <div>✓ Filter buttons ([ALL] [WEB] [DESIGN])</div>
                  <div>✓ addEventListener click handling</div>
                  <div>✓ Active filter button styling</div>
                  <div>✓ Show/hide cards based on category</div>
                </div>
              </div>
            </div>

            {/* AI Portfolio Planner Prompt Tool */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              🤖 AI Assistant Tool — Plan Portfolio Content
            </h3>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534' }}>Business Type:</label>
                  <input
                    type="text"
                    value={aiBizTypeInput}
                    onChange={(e) => setAiBizTypeInput(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #a7f3d0', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534' }}>Target Audience:</label>
                  <input
                    type="text"
                    value={aiAudienceInput}
                    onChange={(e) => setAiAudienceInput(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #a7f3d0', fontSize: '0.82rem' }}
                  />
                </div>
              </div>

              <button
                onClick={() => setAiGeneratedProjects([
                  { title: `${aiBizTypeInput} Web App`, cat: 'WEB', tags: ['HTML', 'CSS', 'JS'] },
                  { title: `${aiAudienceInput} Portal`, cat: 'DESIGN', tags: ['UI', 'Figma'] },
                  { title: 'Data Analytics Tool', cat: 'DATA', tags: ['Python', 'SQL'] }
                ])}
                style={{ background: '#16a34a', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Generate Custom Portfolio Project Ideas
              </button>

              {aiGeneratedProjects && (
                <div style={{ marginTop: '1rem', background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', marginBottom: '6px' }}>
                    AI Suggested Project Concepts:
                  </div>
                  {aiGeneratedProjects.map((proj, idx) => (
                    <div key={idx} style={{ fontSize: '0.82rem', color: '#334155', marginBottom: '4px' }}>
                      • <strong>{proj.title}</strong> ({proj.cat}) — Tags: {proj.tags.join(', ')}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <button
            onClick={() => handleTabChange('quiz')}
            style={{
              alignSelf: 'flex-end',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Knowledge Check &amp; Completion <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 32, 33, 34: KNOWLEDGE CHECK & COMPLETION SCREEN ==================== */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Assessment &amp; Mastery
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 1.25rem 0' }}>
              Day 6 Knowledge Check (12 Interactive Questions)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {quizQuestions.map((q, qIdx) => (
                <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                    {qIdx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleQuizSelect(q.id, optIdx)}
                        style={{
                          background: quizAnswers[q.id] === optIdx 
                            ? (optIdx === q.correct ? '#dcfce7' : '#fee2e2') 
                            : '#ffffff',
                          color: quizAnswers[q.id] === optIdx 
                            ? (optIdx === q.correct ? '#166534' : '#991b1b') 
                            : '#334155',
                          border: quizAnswers[q.id] === optIdx 
                            ? (optIdx === q.correct ? '1px solid #86efac' : '1px solid #fca5a5') 
                            : '1px solid #cbd5e1',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          textAlign: 'left',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {quizAnswers[q.id] !== undefined && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: quizAnswers[q.id] === q.correct ? '#15803d' : '#b91c1c', fontWeight: 700 }}>
                      {quizAnswers[q.id] === q.correct ? '✅ Correct!' : '❌ Try again.'} {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Score Summary */}
            {quizAttempted && (
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '1.25rem', textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e40af' }}>
                  Quiz Score: {calculateQuizScore()} / 12 Correct!
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: '4px' }}>
                  {calculateQuizScore() >= 10 ? '🎉 Excellent! You have mastered Day 6 concepts.' : 'Review missed questions and retry!'}
                </div>
              </div>
            )}

            {/* DAY 6 COMPLETION SCREEN */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              color: '#ffffff',
              textAlign: 'center',
              boxShadow: '0 20px 30px rgba(4, 120, 87, 0.25)'
            }}>
              <Trophy size={64} style={{ marginBottom: '1rem', opacity: 0.9 }} />
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.75rem 0' }}>
                🎉 Day 6 Completed
              </h2>

              {/* Checklist achieved */}
              <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  YOU LEARNED:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <div>✓ Portfolio section layout</div>
                  <div>✓ Project card structure</div>
                  <div>✓ Images (object-fit: cover)</div>
                  <div>✓ CSS Grid 3-column layout</div>
                  <div>✓ Technology badge tags</div>
                  <div>✓ Card hover scale zoom</div>
                  <div>✓ Custom data attributes</div>
                  <div>✓ addEventListener triggers</div>
                  <div>✓ DOM querySelectorAll</div>
                  <div>✓ JS category filtering</div>
                  <div>✓ Responsive mobile grid</div>
                  <div>✓ AI portfolio planning</div>
                </div>
              </div>

              {/* Website Progress List */}
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                  Your Continuous Website So Far:
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                  <div>Day 1: Website layout ✓</div>
                  <div>Day 2: Professional Navbar ✓</div>
                  <div>Day 3: Hero Section ✓</div>
                  <div>Day 4: About Section ✓</div>
                  <div>Day 5: Services Section ✓</div>
                  <div>Day 6: Portfolio / Projects Section ✓</div>
                </div>
              </div>

              {/* DAY 7 PREVIEW CARD */}
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                  🚀 COMING UP IN DAY 7:
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                  Day 7 — Build a Testimonials &amp; Trust Section
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                  Preview: Customer Cards → Star Ratings → Trust Indicators → Responsive Quote Layout
                </p>
              </div>

              <button
                onClick={() => handleTabChange('quiz')}
                style={{
                  background: '#ffffff',
                  color: '#047857',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
              >
                Continue to Day 7 →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
