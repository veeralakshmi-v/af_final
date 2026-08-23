import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveEditor from '../../components/LiveEditor';
import Quiz from '../../components/Quiz';
import Prism from 'prismjs';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function CSSDay4({ activeTab, onNavigate }) {
  const [gridJustifyItems, setGridJustifyItems] = React.useState('center');
  const [gridAlignItems, setGridAlignItems] = React.useState('center');
  const [gridJustifyContent, setGridJustifyContent] = React.useState('center');

  // Item Placement State
  const [itemColStart, setItemColStart] = React.useState(1);
  const [itemColSpan, setItemColSpan] = React.useState(2);
  const [itemRowStart, setItemRowStart] = React.useState(1);
  const [itemRowSpan, setItemRowSpan] = React.useState(2);
  const [itemJustifySelf, setItemJustifySelf] = React.useState('stretch');
  const [itemAlignSelf, setItemAlignSelf] = React.useState('stretch');

  // Auto Flow State
  const [autoFlowMode, setAutoFlowMode] = React.useState('row dense');
  const [autoRowHeight, setAutoRowHeight] = React.useState(60);

  // Mini Project Sub-Tab & Actions State
  const [projectSubTab, setProjectSubTab] = React.useState('preview');
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(projectCodeDay6);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([projectCodeDay6], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "grid_portfolio_dashboard.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module6', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gridIntroCode = `.container {
  display: grid; /* Starts Grid formatting context */
  /* Or use inline-grid to only take needed width */
}`;

  const gridStructureCode = `.container {
  display: grid;
  
  /* Creates 2 rows of 100px each */
  grid-template-rows: 100px 100px;
  
  /* Creates 3 columns: 400px, 200px, and 100px */
  grid-template-columns: 400px 200px 100px;
}

/* Using the 'fr' (fraction) unit to divide available space */
.flexible-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* Middle column is twice as big as the outer ones */
}`;

  const gridSpacingCode = `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  /* Gaps between rows and columns */
  row-gap: 20px;
  column-gap: 10px;
  
  /* Shorthand for both: */
  gap: 20px 10px;
}`;

  const gridItemCode = `.item1 {
  /* Start at row line 2, end at row line 5 */
  grid-row: 2 / 5;
  
  /* Start at col line 3, span across 2 columns */
  grid-column: 3 / span 2;
}`;

  const responsiveGridCode = `.container {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }

/* Responsive Layout */
@media (max-width: 600px) {
  .container {
    grid-template-areas: 
      "header"
      "content"
      "sidebar"
      "footer";
  }
}`;

  const day6QuizQuestions = [
    {
      question: "Which property is used to create a grid container?",
      options: [
        { id: 'a', text: 'display: block', correct: false },
        { id: 'b', text: 'display: flex', correct: false },
        { id: 'c', text: 'display: grid', correct: true },
        { id: 'd', text: 'display: grid-container', correct: false },
      ]
    },
    {
      question: "What does the 'fr' unit stand for in CSS Grid?",
      options: [
        { id: 'a', text: 'Frame', correct: false },
        { id: 'b', text: 'Fraction', correct: true },
        { id: 'c', text: 'Free Space', correct: false },
        { id: 'd', text: 'Fragment', correct: false },
      ]
    },
    {
      question: "How do you define a grid with 3 equal columns?",
      options: [
        { id: 'a', text: 'grid-columns: 1fr 1fr 1fr;', correct: false },
        { id: 'b', text: 'grid-template-columns: repeat(3, 1fr);', correct: true },
        { id: 'c', text: 'columns: 3;', correct: false },
        { id: 'd', text: 'grid-template-columns: 33% 33% 33%;', correct: false },
      ]
    },
    {
      question: "Which property controls the space between grid columns?",
      options: [
        { id: 'a', text: 'column-gap', correct: true },
        { id: 'b', text: 'grid-space', correct: false },
        { id: 'c', text: 'margin-column', correct: false },
        { id: 'd', text: 'col-spacing', correct: false },
      ]
    },
    {
      question: "What shorthand property allows you to define a layout using named areas?",
      options: [
        { id: 'a', text: 'grid-layout', correct: false },
        { id: 'b', text: 'grid-template-areas', correct: true },
        { id: 'c', text: 'grid-areas', correct: false },
        { id: 'd', text: 'grid-names', correct: false },
      ]
    },
    {
      question: "Which property places a grid item starting at row line 1 and ending at row line 3?",
      options: [
        { id: 'a', text: 'grid-row: 1 / 3;', correct: true },
        { id: 'b', text: 'row: 1 to 3;', correct: false },
        { id: 'c', text: 'grid-span: 1 3;', correct: false },
        { id: 'd', text: 'grid-row-start: 1 / 3;', correct: false },
      ]
    }
  ];

  const projectCodeDay6 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creative Creator Portfolio Grid</title>
  <style>
    /* ─── RESET & BASE STYLES ─── */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      padding: 1.5rem;
    }

    /* ─── MAIN GRID LAYOUT WITH NAMED AREAS ─── */
    .portfolio-app {
      display: grid;
      grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
      grid-template-columns: 280px 1fr 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 1.25rem;
      max-width: 1350px;
      margin: 0 auto;
      min-height: 90vh;
    }

    /* ─── 1. HEADER (grid-area: header) ─── */
    .header {
      grid-area: header;
      background: linear-gradient(135deg, #1e293b, #0f172a);
      border: 1px solid #334155;
      padding: 1.2rem 2rem;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.4rem;
      font-weight: 800;
      color: #38bdf8;
    }
    .logo-badge {
      background: linear-gradient(135deg, #38bdf8, #818cf8);
      color: #0f172a;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 900;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .nav-link {
      color: #94a3b8;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    .nav-link:hover, .nav-link.active { color: #38bdf8; }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #334155;
      padding: 6px 14px 6px 6px;
      border-radius: 30px;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f43f5e, #fb7185);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: white;
    }

    /* ─── 2. SIDEBAR (grid-area: sidebar) ─── */
    .sidebar {
      grid-area: sidebar;
      background: #1e293b;
      border: 1px solid #334155;
      padding: 1.8rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .sidebar-title {
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
    }
    .stats-card {
      background: #0f172a;
      padding: 1.2rem;
      border-radius: 12px;
      border: 1px solid #334155;
    }
    .stats-num {
      font-size: 1.8rem;
      font-weight: 800;
      color: #38bdf8;
      margin-top: 4px;
    }
    .cat-menu {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .cat-item {
      padding: 10px 14px;
      border-radius: 8px;
      background: #0f172a;
      color: #cbd5e1;
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .cat-item:hover, .cat-item.active {
      border-color: #38bdf8;
      color: #38bdf8;
      background: #1e293b;
    }
    .cat-count {
      background: #334155;
      color: #94a3b8;
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 12px;
    }

    /* ─── 3. MAIN CONTENT AREA (grid-area: main) ─── */
    .main-content {
      grid-area: main;
      background: #1e293b;
      border: 1px solid #334155;
      padding: 2rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .section-title {
      font-size: 1.4rem;
      font-weight: 800;
    }

    /* NESTED GRID 1: TOP METRICS */
    .top-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }
    .mini-stat {
      background: #0f172a;
      border: 1px solid #334155;
      padding: 1.2rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .stat-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    /* NESTED GRID 2: PORTFOLIO GALLERY CARDS */
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 1.25rem;
    }
    .project-card {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, border-color 0.2s;
    }
    .project-card:hover {
      transform: translateY(-4px);
      border-color: #38bdf8;
    }
    .card-thumb {
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      position: relative;
    }
    .card-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(4px);
      color: #38bdf8;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid #334155;
    }
    .card-body {
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-title {
      font-size: 1.05rem;
      font-weight: 700;
    }
    .card-desc {
      color: #94a3b8;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    .card-tags {
      display: flex;
      gap: 6px;
      margin-top: 6px;
    }
    .tag {
      background: #1e293b;
      color: #38bdf8;
      font-size: 0.72rem;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 700;
    }

    /* ─── 4. FOOTER (grid-area: footer) ─── */
    .footer {
      grid-area: footer;
      background: #1e293b;
      border: 1px solid #334155;
      padding: 1.2rem 2rem;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #94a3b8;
      font-size: 0.9rem;
    }

    /* ─── 5. RESPONSIVE BREAKPOINTS ─── */
    @media (max-width: 900px) {
      .portfolio-app {
        grid-template-areas:
          "header"
          "main"
          "sidebar"
          "footer";
        grid-template-columns: 1fr;
      }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

  <div class="portfolio-app">
    
    <!-- 1. HEADER AREA -->
    <header class="header">
      <div class="brand-logo">
        <span>🎨</span>
        <span>GRIDFOLIO</span>
        <span class="logo-badge">CSS GRID</span>
      </div>
      <nav class="nav-links">
        <a href="#" class="nav-link active">Gallery</a>
        <a href="#" class="nav-link">Analytics</a>
        <a href="#" class="nav-link">Settings</a>
      </nav>
      <div class="user-profile">
        <div class="avatar">AK</div>
        <span style="font-weight: 700; font-size: 0.9rem;">Alex K.</span>
      </div>
    </header>

    <!-- 2. SIDEBAR AREA -->
    <aside class="sidebar">
      <span class="sidebar-title">Quick Overview</span>
      
      <div class="stats-card">
        <span style="font-size: 0.8rem; color: #94a3b8;">Total Revenue</span>
        <div class="stats-num">$24,850</div>
      </div>

      <span class="sidebar-title" style="margin-top: 10px;">Categories</span>
      <ul class="cat-menu">
        <li class="cat-item active">
          <span>💻 Web Design</span>
          <span class="cat-count">12</span>
        </li>
        <li class="cat-item">
          <span>📱 Mobile Apps</span>
          <span class="cat-count">8</span>
        </li>
        <li class="cat-item">
          <span>🎨 UI/UX System</span>
          <span class="cat-count">15</span>
        </li>
        <li class="cat-item">
          <span>🤖 AI Tools</span>
          <span class="cat-count">6</span>
        </li>
      </ul>
    </aside>

    <!-- 3. MAIN CONTENT AREA -->
    <main class="main-content">
      
      <div class="section-header">
        <h2 class="section-title">Featured Projects</h2>
        <span style="color: #38bdf8; font-weight: 700; font-size: 0.9rem; cursor: pointer;">View All →</span>
      </div>

      <!-- Nested Stats Row -->
      <div class="top-stats-grid">
        <div class="mini-stat">
          <div class="stat-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">👁️</div>
          <div>
            <div style="font-size: 1.2rem; font-weight: 800;">142.5K</div>
            <div style="font-size: 0.78rem; color: #94a3b8;">Total Views</div>
          </div>
        </div>
        <div class="mini-stat">
          <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">⭐</div>
          <div>
            <div style="font-size: 1.2rem; font-weight: 800;">4.9 / 5</div>
            <div style="font-size: 0.78rem; color: #94a3b8;">Client Rating</div>
          </div>
        </div>
        <div class="mini-stat">
          <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">🔥</div>
          <div>
            <div style="font-size: 1.2rem; font-weight: 800;">41</div>
            <div style="font-size: 0.78rem; color: #94a3b8;">Projects Shipped</div>
          </div>
        </div>
      </div>

      <!-- Nested Portfolio Cards Grid -->
      <div class="portfolio-grid">
        
        <div class="project-card">
          <div class="card-thumb" style="background: linear-gradient(135deg, #0284c7, #0369a1);">
            🌐
            <span class="card-badge">Web App</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">SaaS Analytics Dashboard</h3>
            <p class="card-desc">Real-time metrics platform using Grid & charts.</p>
            <div class="card-tags">
              <span class="tag">React</span>
              <span class="tag">CSS Grid</span>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="card-thumb" style="background: linear-gradient(135deg, #7c3aed, #5b21b6);">
            🛍️
            <span class="card-badge">E-Commerce</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">Luxe Fashion Store</h3>
            <p class="card-desc">Modern digital store with CSS grid product grid.</p>
            <div class="card-tags">
              <span class="tag">HTML5</span>
              <span class="tag">CSS3</span>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="card-thumb" style="background: linear-gradient(135deg, #059669, #047857);">
            🤖
            <span class="card-badge">AI Platform</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">Neural Prompt Builder</h3>
            <p class="card-desc">Automated workflow builder UI with Grid layout.</p>
            <div class="card-tags">
              <span class="tag">AI</span>
              <span class="tag">Tailwind</span>
            </div>
          </div>
        </div>

      </div>

    </main>

    <!-- 4. FOOTER AREA -->
    <footer class="footer">
      <span>© 2026 GridFolio Studio. Built with CSS Grid.</span>
      <span>Designed for High Performance ⚡</span>
    </footer>

  </div>

</html>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'grid_intro' && (
        <Section key="grid_intro" id="grid_intro" eyebrow="Fundamentals" title="Introduction to Grid">
          <div className="panel">
            <p><strong>CSS Grid</strong> is a 2D layout system used to arrange items in rows and columns simultaneously. Unlike Flexbox (which is 1D), Grid is perfect for complex full-page layouts.</p>
            
            <div style={{ padding: '2rem', background: '#e0f2fe', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #bae6fd' }}>
              <h3 style={{ color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📐</span> Imagine a 2D Chart
              </h3>
              <p style={{ color: '#0c4a6e', marginBottom: '1rem' }}>Grid helps you place boxes exactly where you want.</p>
              <ul style={{ color: '#0c4a6e', paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>✅ Helps you create neat layouts.</li>
                <li>✅ Controls both rows AND columns at the same time.</li>
                <li>✅ Allows precise spacing, alignment, and responsiveness.</li>
                <li>✅ Better and easier than using complicated positioning or floats.</li>
              </ul>
            </div>

            <div className="code-example-box">
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridIntroCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>
            
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('grid_structure')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_structure' && (
        <Section key="grid_structure" id="grid_structure" eyebrow="Definition" title="Defining Grid Structure">
          <div className="panel">
            <p>You can define the exact dimensions of your grid's rows and columns.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridStructureCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Grid Terminology</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Grid Lines</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>The lines that divide the grid. They are numbered starting at 1 (both horizontally and vertically).</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Grid Track</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>The space between two adjacent grid lines (a row or a column).</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Grid Cell / Area</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>A cell is a single unit. An area is one or more adjacent cells forming a rectangle.</p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <h4 style={{ color: '#d97706', marginBottom: '0.5rem' }}>The `fr` Unit (Fraction)</h4>
              <p style={{ color: '#92400e', fontSize: '0.95rem' }}>It divides the available space into parts. For example, <code>1fr 2fr</code> means the second column is twice as big as the first column!</p>
            </div>

            <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>Visual Example</h3>
            <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>grid-template-columns: 1fr 2fr 1fr;</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>1fr</div>
                <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>2fr (Twice as big)</div>
                <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>1fr</div>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('grid_spacing_align')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_spacing_align' && (
        <Section key="grid_spacing_align" id="grid_spacing_align" eyebrow="Layout & Alignment" title="Spacing & All 6 Grid Alignment Properties">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🎯 Complete CSS Grid Alignment Overview</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                CSS Grid alignment consists of 3 distinct levels: <strong>Cell-Level (Items inside cells)</strong>, <strong>Container-Level (Entire grid inside container)</strong>, and <strong>Item-Level (Individual child overrides)</strong>.
              </p>
            </div>

            {/* Gap Syntax */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Grid Spacing (`gap`)</h3>
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridSpacingCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            {/* LEVEL 1: CELL LEVEL */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Cell-Level Alignment (Aligning Items Inside Cells)</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
              Controls how items align inside their individual grid cell boundaries:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>justify-items</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Horizontal alignment inside cell (start, center, end, stretch).</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', gap: '8px', background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ background: '#2563eb', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>1</div>
                  <div style={{ background: '#2563eb', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>2</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>align-items</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Vertical alignment inside cell (start, center, end, stretch).</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '8px', background: '#0f172a', padding: '12px', borderRadius: '8px', height: '80px' }}>
                  <div style={{ background: '#10b981', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>1</div>
                  <div style={{ background: '#10b981', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>2</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #f59e0b', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>place-items</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Shorthand for <code>align-items</code> + <code>justify-items</code>.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', placeItems: 'center', gap: '8px', background: '#0f172a', padding: '12px', borderRadius: '8px', height: '80px' }}>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>1</div>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>2</div>
                </div>
              </div>

            </div>

            {/* LEVEL 2: CONTAINER LEVEL */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>3. Container-Level Alignment (Aligning Entire Grid Tracks)</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
              When the total grid width/height is smaller than the parent container, these properties align the grid tracks as a whole:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #8b5cf6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>justify-content</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Horizontal grid system alignment (center, space-between, space-around, flex-end).</p>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 80px', justifyContent: 'space-between', background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ background: '#8b5cf6', color: 'white', padding: '6px', borderRadius: '4px', textAlign: 'center', fontSize: '0.8rem' }}>Track A</div>
                  <div style={{ background: '#8b5cf6', color: 'white', padding: '6px', borderRadius: '4px', textAlign: 'center', fontSize: '0.8rem' }}>Track B</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #ec4899', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>align-content</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Vertical grid system alignment when container height has extra space.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignContent: 'center', gap: '6px', background: '#0f172a', padding: '12px', borderRadius: '8px', height: '80px' }}>
                  <div style={{ background: '#ec4899', color: 'white', padding: '4px', borderRadius: '4px', textAlign: 'center', fontSize: '0.8rem' }}>Row 1</div>
                  <div style={{ background: '#ec4899', color: 'white', padding: '4px', borderRadius: '4px', textAlign: 'center', fontSize: '0.8rem' }}>Row 2</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #06b6d4', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>place-content</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Shorthand for <code>align-content</code> + <code>justify-content</code>.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 80px', placeContent: 'center', gap: '6px', background: '#0f172a', padding: '12px', borderRadius: '8px', height: '80px' }}>
                  <div style={{ background: '#06b6d4', color: 'white', padding: '4px', borderRadius: '4px', textAlign: 'center', fontSize: '0.8rem' }}>1</div>
                  <div style={{ background: '#06b6d4', color: 'white', padding: '4px', borderRadius: '4px', textAlign: 'center', fontSize: '0.8rem' }}>2</div>
                </div>
              </div>

            </div>

            {/* LEVEL 3: CHILD OVERRIDES */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>4. Child-Level Overrides (`justify-self`, `align-self`, `place-self`)</h3>
            <div style={{ background: '#eff6ff', padding: '1.2rem 1.5rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', border: '1px solid #bfdbfe', borderLeftWidth: '5px', marginBottom: '2.5rem' }}>
              <p style={{ color: '#1e3a8a', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
                Individual grid items can override container settings using <code>justify-self</code> (horizontal cell alignment) and <code>align-self</code> (vertical cell alignment). Shorthand: <code>place-self: center end;</code>.
              </p>
            </div>

            {/* ─── INTERACTIVE ALIGNMENT PLAYGROUND ─── */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive Grid Alignment Controls</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Toggle parameters below to see how cell alignment (`justify-items`, `align-items`) and grid container alignment (`justify-content`) work in real time!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    justify-items: <span style={{ color: '#2563eb' }}>{gridJustifyItems}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['start', 'center', 'end', 'stretch'].map(val => (
                      <button
                        key={val}
                        onClick={() => setGridJustifyItems(val)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: gridJustifyItems === val ? '2px solid #2563eb' : '1px solid #cbd5e1',
                          background: gridJustifyItems === val ? '#2563eb' : 'white',
                          color: gridJustifyItems === val ? 'white' : '#1e293b'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    align-items: <span style={{ color: '#10b981' }}>{gridAlignItems}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['start', 'center', 'end', 'stretch'].map(val => (
                      <button
                        key={val}
                        onClick={() => setGridAlignItems(val)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: gridAlignItems === val ? '2px solid #10b981' : '1px solid #cbd5e1',
                          background: gridAlignItems === val ? '#10b981' : 'white',
                          color: gridAlignItems === val ? 'white' : '#1e293b'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    justify-content: <span style={{ color: '#8b5cf6' }}>{gridJustifyContent}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['start', 'center', 'end', 'space-between'].map(val => (
                      <button
                        key={val}
                        onClick={() => setGridJustifyContent(val)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: gridJustifyContent === val ? '2px solid #8b5cf6' : '1px solid #cbd5e1',
                          background: gridJustifyContent === val ? '#8b5cf6' : 'white',
                          color: gridJustifyContent === val ? 'white' : '#1e293b'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Canvas */}
            <div style={{ padding: '2rem 1.5rem', background: '#0f172a', borderRadius: '14px', marginBottom: '2rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                Grid Container (`grid-template-columns: 140px 140px; height: 160px;`)
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '140px 140px', 
                justifyContent: gridJustifyContent, 
                justifyItems: gridJustifyItems, 
                alignItems: gridAlignItems, 
                gap: '12px', 
                height: '160px', 
                background: '#1e293b', 
                padding: '1rem', 
                borderRadius: '10px', 
                border: '2px dashed #475569' 
              }}>
                <div style={{ background: '#2563eb', color: 'white', padding: '10px', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center' }}>
                  Cell 1
                </div>
                <div style={{ background: '#10b981', color: 'white', padding: '10px', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center' }}>
                  Cell 2
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Active Grid Alignment CSS</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
`.grid-container {
  display: grid;
  grid-template-columns: 140px 140px;
  
  /* Cell-Level Alignment: */
  justify-items: ${gridJustifyItems};   /* ${gridJustifyItems === 'center' ? 'Centers items horizontally in cells' : gridJustifyItems === 'stretch' ? 'Stretches items full cell width' : 'Aligns to cell edge'} */
  align-items: ${gridAlignItems};       /* ${gridAlignItems === 'center' ? 'Centers items vertically in cells' : gridAlignItems === 'stretch' ? 'Stretches items full cell height' : 'Aligns to cell edge'} */
  
  /* Container-Level Track Alignment: */
  justify-content: ${gridJustifyContent}; /* ${gridJustifyContent === 'center' ? 'Centers whole grid system in parent' : 'Positions grid tracks'} */
}`, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('grid_items')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_items' && (
        <Section key="grid_items" id="grid_items" eyebrow="Child Placement" title="Grid Item Properties & Placement">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #312e81' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📌 Positioning Individual Items in CSS Grid</h3>
              <p style={{ color: '#c7d2fe', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                Unlike Flexbox where items flow sequentially, CSS Grid allows you to target any specific child element and place it precisely across grid line numbers, spanning multiple rows and columns!
              </p>
            </div>

            {/* SECTION 1: GRID LINES BREAKDOWN */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Understanding Grid Line Numbers</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem' }}>
              Grid tracks are separated by numbered lines starting from <strong>1</strong> at the top/left edge up to <strong>N+1</strong> at the bottom/right edge. You can also use <strong>-1</strong> to refer to the last line!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #6366f1', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>grid-column</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Shorthand for <code>grid-column-start / grid-column-end</code>.</p>
                <code style={{ background: '#e0e7ff', color: '#3730a3', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>grid-column: 1 / 4;</code>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Starts at Line 1 and ends at Line 4 (spans 3 columns).</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #8b5cf6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>grid-row</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Shorthand for <code>grid-row-start / grid-row-end</code>.</p>
                <code style={{ background: '#f3e8ff', color: '#6b21a8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>grid-row: 2 / span 2;</code>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Starts at Line 2 and spans across 2 rows.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #ec4899', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>grid-area</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>4-in-1 shorthand for row-start / col-start / row-end / col-end.</p>
                <code style={{ background: '#fce7f3', color: '#9d174d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>grid-area: 1 / 2 / 3 / 4;</code>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Row 1-3, Column 2-4.</p>
              </div>

            </div>

            {/* SECTION 2: PRO TIPS & SPECIAL SYNTAX */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Pro Placement Techniques</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#eff6ff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ color: '#1e40af', margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700 }}>🌟 Full Width Stretch (`1 / -1`)</h4>
                <p style={{ color: '#1e3a8a', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                  Using <code>grid-column: 1 / -1</code> forces an item to span across ALL available columns from the first line to the very last line regardless of screen size!
                </p>
              </div>

              <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ color: '#166534', margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700 }}>🎭 Item Overlapping (Stacking)</h4>
                <p style={{ color: '#14532d', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                  Multiple grid items assigned to the same row & column will overlap! Combine with <code>z-index</code> to build hero banners with text over image cards effortlessly.
                </p>
              </div>

              <div style={{ background: '#fff7ed', padding: '1.2rem', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                <h4 style={{ color: '#9a3412', margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700 }}>🎯 Individual Overrides (`justify-self`, `align-self`)</h4>
                <p style={{ color: '#7c2d12', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                  Override container-level <code>justify-items</code> and <code>align-items</code> for just one specific element using <code>align-self: center; justify-self: end;</code>.
                </p>
              </div>
            </div>

            {/* SECTION 3: INTERACTIVE PLACEMENT SANDBOX */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive Grid Item Placement Playground</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Adjust column start, column span, row start, row span, and item alignment below to see <strong>Target Box (Hero)</strong> move dynamically on the 4x3 Grid!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    Col Start (Line 1-4): <span style={{ color: '#6366f1' }}>{itemColStart}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="4" 
                    value={itemColStart} 
                    onChange={(e) => setItemColStart(Number(e.target.value))} 
                    style={{ width: '100%' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    Col Span (1-{5 - itemColStart}): <span style={{ color: '#6366f1' }}>{itemColSpan}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max={5 - itemColStart} 
                    value={Math.min(itemColSpan, 5 - itemColStart)} 
                    onChange={(e) => setItemColSpan(Number(e.target.value))} 
                    style={{ width: '100%' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    Row Start (Line 1-3): <span style={{ color: '#8b5cf6' }}>{itemRowStart}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    value={itemRowStart} 
                    onChange={(e) => setItemRowStart(Number(e.target.value))} 
                    style={{ width: '100%' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    Row Span (1-{4 - itemRowStart}): <span style={{ color: '#8b5cf6' }}>{itemRowSpan}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max={4 - itemRowStart} 
                    value={Math.min(itemRowSpan, 4 - itemRowStart)} 
                    onChange={(e) => setItemRowSpan(Number(e.target.value))} 
                    style={{ width: '100%' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    justify-self: <span style={{ color: '#ec4899' }}>{itemJustifySelf}</span>
                  </label>
                  <select 
                    value={itemJustifySelf} 
                    onChange={(e) => setItemJustifySelf(e.target.value)}
                    style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                  >
                    <option value="stretch">stretch</option>
                    <option value="start">start</option>
                    <option value="center">center</option>
                    <option value="end">end</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    align-self: <span style={{ color: '#10b981' }}>{itemAlignSelf}</span>
                  </label>
                  <select 
                    value={itemAlignSelf} 
                    onChange={(e) => setItemAlignSelf(e.target.value)}
                    style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                  >
                    <option value="stretch">stretch</option>
                    <option value="start">start</option>
                    <option value="center">center</option>
                    <option value="end">end</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Grid Line Visual Map Canvas */}
            <div style={{ background: '#0f172a', padding: '2rem 1.5rem', borderRadius: '14px', marginBottom: '2rem', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', padding: '0 5px' }}>
                <span>Line 1</span>
                <span>Line 2</span>
                <span>Line 3</span>
                <span>Line 4</span>
                <span>Line 5</span>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gridTemplateRows: 'repeat(3, 70px)', 
                gap: '8px', 
                background: '#1e293b', 
                padding: '12px', 
                borderRadius: '10px', 
                border: '2px dashed #475569',
                position: 'relative'
              }}>
                {/* Background Cell Indicators */}
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                  <div key={n} style={{ background: '#0f172a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', fontSize: '0.8rem', fontWeight: 700 }}>
                    Cell {n}
                  </div>
                ))}

                {/* Animated Target Grid Item */}
                <motion.div 
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{
                    gridColumn: `${itemColStart} / span ${Math.min(itemColSpan, 5 - itemColStart)}`,
                    gridRow: `${itemRowStart} / span ${Math.min(itemRowSpan, 4 - itemRowStart)}`,
                    justifySelf: itemJustifySelf,
                    alignSelf: itemAlignSelf,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    zIndex: 10,
                    minWidth: itemJustifySelf !== 'stretch' ? '120px' : 'auto',
                    minHeight: itemAlignSelf !== 'stretch' ? '50px' : 'auto'
                  }}
                >
                  🎯 Target Item
                  <span style={{ fontSize: '0.72rem', fontWeight: 400, marginTop: '0.2rem', opacity: 0.9 }}>
                    col: {itemColStart} / span {Math.min(itemColSpan, 5 - itemColStart)} | row: {itemRowStart} / span {Math.min(itemRowSpan, 4 - itemRowStart)}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Generated CSS Code */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Generated CSS for Target Item</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
`.target-item {
  /* Line placement: */
  grid-column: ${itemColStart} / span ${Math.min(itemColSpan, 5 - itemColStart)};
  grid-row: ${itemRowStart} / span ${Math.min(itemRowSpan, 4 - itemRowStart)};
  
  /* Individual alignment overrides: */
  justify-self: ${itemJustifySelf};
  align-self: ${itemAlignSelf};
}`, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('grid_auto_flow')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_auto_flow' && (
        <Section key="grid_auto_flow" id="grid_auto_flow" eyebrow="Implicit Grid & Packing" title="Auto Sizing & Dense Flow Algorithms">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #065f46)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #047857' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>⚡ Understanding Explicit vs Implicit Grids</h3>
              <p style={{ color: '#a7f3d0', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                When items are added beyond your defined grid or span outside defined boundaries, CSS Grid creates <strong>implicit grid tracks</strong>. You control their size using <code>grid-auto-rows</code> and their packing algorithm with <code>grid-auto-flow: dense</code>!
              </p>
            </div>

            {/* SECTION 1: CONCEPTS & PROPERTIES */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Key Auto-Sizing Properties</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>grid-auto-rows</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Sets the height of automatically created implicit rows.</p>
                <code style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>grid-auto-rows: minmax(60px, auto);</code>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #3b82f6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>grid-auto-columns</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Sets the width of automatically created implicit columns.</p>
                <code style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>grid-auto-columns: 100px;</code>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #f59e0b', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>grid-auto-flow</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.8rem' }}>Placement algorithm: <code>row</code>, <code>column</code>, or add <code>dense</code>.</p>
                <code style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>grid-auto-flow: row dense;</code>
              </div>

            </div>

            {/* SECTION 2: DENSE PACKING EXPLAINED */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. The Magic of `dense` Packing</h3>
            <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '14px', border: '1px solid #bbf7d0', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#166534', margin: '0 0 0.6rem', fontSize: '1.1rem', fontWeight: 700 }}>🧩 How `dense` Eliminates Empty Holes</h4>
              <p style={{ color: '#14532d', fontSize: '0.93rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                Without <code>dense</code>, if a large 2-column or 3-column card doesn't fit in the remaining space of a row, the browser moves it to the next line — <strong>leaving an empty gap behind</strong>.
              </p>
              <p style={{ color: '#14532d', fontSize: '0.93rem', lineHeight: 1.6, margin: 0 }}>
                When you append <code>dense</code> (e.g. <code>grid-auto-flow: row dense;</code>), the browser searches backward and packs smaller items into those empty holes automatically, creating a tight Masonry-like layout!
              </p>
            </div>

            {/* SECTION 3: INTERACTIVE DENSE FLOW SIMULATOR */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive Auto-Flow & Dense Packing Simulator</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Toggle between standard <code>row</code> (which leaves gaps) and <code>row dense</code> (which packs gaps dynamically)!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.6rem' }}>
                    grid-auto-flow: <span style={{ color: '#10b981' }}>{autoFlowMode}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['row', 'column', 'row dense', 'column dense'].map(mode => (
                      <button
                        key={mode}
                        onClick={() => setAutoFlowMode(mode)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: autoFlowMode === mode ? '2px solid #10b981' : '1px solid #cbd5e1',
                          background: autoFlowMode === mode ? '#10b981' : 'white',
                          color: autoFlowMode === mode ? 'white' : '#1e293b'
                        }}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.6rem' }}>
                    grid-auto-rows: <span style={{ color: '#3b82f6' }}>{autoRowHeight}px</span>
                  </label>
                  <input 
                    type="range" 
                    min="40" 
                    max="100" 
                    step="10" 
                    value={autoRowHeight} 
                    onChange={(e) => setAutoRowHeight(Number(e.target.value))} 
                    style={{ width: '100%' }} 
                  />
                </div>

              </div>
            </div>

            {/* Interactive Grid Canvas */}
            <div style={{ background: '#0f172a', padding: '2rem 1.5rem', borderRadius: '14px', marginBottom: '2rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                Live Grid Layout (`grid-template-columns: repeat(4, 1fr);`)
              </div>

              <motion.div 
                layout
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gridAutoRows: `${autoRowHeight}px`, 
                  gridAutoFlow: autoFlowMode, 
                  gap: '8px', 
                  background: '#1e293b', 
                  padding: '14px', 
                  borderRadius: '10px', 
                  border: '2px dashed #475569' 
                }}
              >
                <motion.div layout style={{ gridColumn: 'span 2', background: '#3b82f6', color: 'white', borderRadius: '6px', padding: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  Item 1 (Span 2)
                </motion.div>

                <motion.div layout style={{ gridColumn: 'span 3', background: '#ef4444', color: 'white', borderRadius: '6px', padding: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  Item 2 (Span 3) {autoFlowMode.includes('dense') ? '' : '(Leaves Gap!)'}
                </motion.div>

                <motion.div layout style={{ gridColumn: 'span 1', background: '#10b981', color: 'white', borderRadius: '6px', padding: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  Item 3 {autoFlowMode.includes('dense') ? '(Packed in Hole!)' : ''}
                </motion.div>

                <motion.div layout style={{ gridColumn: 'span 2', background: '#8b5cf6', color: 'white', borderRadius: '6px', padding: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  Item 4 (Span 2)
                </motion.div>

                <motion.div layout style={{ gridColumn: 'span 1', background: '#f59e0b', color: 'white', borderRadius: '6px', padding: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  Item 5
                </motion.div>
              </motion.div>
            </div>

            {/* Generated CSS Code */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Active Auto-Flow & Row Sizing CSS</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
`.gallery-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  
  /* Implicit Track Sizing: */
  grid-auto-rows: ${autoRowHeight}px;
  
  /* Packing Algorithm: */
  grid-auto-flow: ${autoFlowMode}; /* ${autoFlowMode.includes('dense') ? 'Automatically fills empty holes earlier in the grid!' : 'Standard placement, leaves gaps'} */
}`, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('grid_responsive')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_responsive' && (
        <Section key="grid_responsive" id="grid_responsive" eyebrow="Areas" title="Responsive Grid with Areas">
          <div className="panel">
            <p>The <code>grid-template-areas</code> property allows you to name grid items and lay them out visually in your CSS code. This makes building responsive layouts incredibly easy!</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(responsiveGridCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Visual Example</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Desktop View</p>
                <div style={{ display: 'grid', gridTemplateAreas: '"header header" "sidebar content" "footer footer"', gridTemplateColumns: '1fr 2fr', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '200px' }}>
                  <div style={{ gridArea: 'header', background: '#f43f5e', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Header</div>
                  <div style={{ gridArea: 'sidebar', background: '#10b981', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sidebar</div>
                  <div style={{ gridArea: 'content', background: '#3b82f6', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</div>
                  <div style={{ gridArea: 'footer', background: '#f59e0b', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Footer</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Mobile View (@media)</p>
                <div style={{ display: 'grid', gridTemplateAreas: '"header" "content" "sidebar" "footer"', gridTemplateColumns: '1fr', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '200px' }}>
                  <div style={{ gridArea: 'header', background: '#f43f5e', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Header</div>
                  <div style={{ gridArea: 'content', background: '#3b82f6', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</div>
                  <div style={{ gridArea: 'sidebar', background: '#10b981', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Sidebar</div>
                  <div style={{ gridArea: 'footer', background: '#f59e0b', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Footer</div>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="CSS Grid Playground">
          <p>Experiment with <code>display: grid</code>, <code>grid-template-columns</code>, and <code>gap</code> in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="CSS Grid Portfolio & Dashboard Project">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem', fontWeight: 800 }}>🎨 Complete Creator Portfolio Grid</h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
                    A full-scale production dashboard featuring <code>grid-template-areas</code>, auto-responsive cards with <code>minmax()</code>, and smooth mobile collapsing!
                  </p>
                </div>
                
                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button 
                    onClick={handleCopyCode}
                    style={{ 
                      background: copiedCode ? '#10b981' : '#3b82f6', 
                      color: 'white', 
                      border: 'none', 
                      padding: '0.6rem 1.2rem', 
                      borderRadius: '8px', 
                      fontWeight: 700, 
                      fontSize: '0.88rem', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {copiedCode ? '✅ Copied!' : '📋 Copy Source Code'}
                  </button>
                  <button 
                    onClick={handleDownloadFile}
                    style={{ 
                      background: '#8b5cf6', 
                      color: 'white', 
                      border: 'none', 
                      padding: '0.6rem 1.2rem', 
                      borderRadius: '8px', 
                      fontWeight: 700, 
                      fontSize: '0.88rem', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    💾 Download HTML File
                  </button>
                </div>
              </div>
            </div>

            {/* Sub Tabs Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <button
                onClick={() => setProjectSubTab('preview')}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: projectSubTab === 'preview' ? '#0f172a' : 'transparent',
                  color: projectSubTab === 'preview' ? 'white' : '#64748b'
                }}
              >
                🖥️ Live Preview
              </button>
              <button
                onClick={() => setProjectSubTab('code')}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: projectSubTab === 'code' ? '#0f172a' : 'transparent',
                  color: projectSubTab === 'code' ? 'white' : '#64748b'
                }}
              >
                📄 Full Source Code
              </button>
              <button
                onClick={() => setProjectSubTab('explanation')}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: projectSubTab === 'explanation' ? '#0f172a' : 'transparent',
                  color: projectSubTab === 'explanation' ? 'white' : '#64748b'
                }}
              >
                💡 Concepts Breakdown
              </button>
            </div>

            {/* SUB TAB 1: PREVIEW */}
            {projectSubTab === 'preview' && (
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '14px', border: '1px solid #334155' }}>
                <div style={{ background: '#1e293b', padding: '0.6rem 1rem', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '10px', fontFamily: 'monospace' }}>grid_portfolio_dashboard.html</span>
                </div>
                <iframe
                  srcDoc={projectCodeDay6}
                  title="Grid Portfolio Project Preview"
                  style={{ width: '100%', height: '650px', border: 'none', borderRadius: '0 0 8px 8px', background: '#0f172a' }}
                />
              </div>
            )}

            {/* SUB TAB 2: FULL SOURCE CODE */}
            {projectSubTab === 'code' && (
              <div className="code-example-box">
                <div className="code-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>grid_portfolio_dashboard.html</span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Complete HTML5 + CSS Grid</span>
                </div>
                <div className="code-content" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="code-pane">
                    <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCodeDay6, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '600px', overflowY: 'auto' }}></pre>
                  </div>
                </div>
              </div>
            )}

            {/* SUB TAB 3: CONCEPTS BREAKDOWN */}
            {projectSubTab === 'explanation' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #3b82f6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                  <h4 style={{ color: '#1e293b', marginBottom: '0.6rem', fontSize: '1.1rem', fontWeight: 700 }}>1. `grid-template-areas` Layout</h4>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    The entire portfolio dashboard uses visual named area mapping:
                    <br />
                    <code>"header header header"</code><br />
                    <code>"sidebar main main"</code><br />
                    <code>"footer footer footer"</code><br />
                    This makes visual layout planning human-readable!
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #10b981', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                  <h4 style={{ color: '#1e293b', marginBottom: '0.6rem', fontSize: '1.1rem', fontWeight: 700 }}>2. `repeat(auto-fill, minmax(230px, 1fr))`</h4>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    The project cards inside the main section auto-fit dynamically. As the screen expands, new columns form automatically without requiring any extra media query breakpoints!
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #8b5cf6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                  <h4 style={{ color: '#1e293b', marginBottom: '0.6rem', fontSize: '1.1rem', fontWeight: 700 }}>3. Responsive Media Query Fallback</h4>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    On mobile screens (`@media (max-width: 900px)`), `grid-template-areas` is re-mapped into a single column (`"header" "main" "sidebar" "footer"`), creating a smooth responsive mobile view.
                  </p>
                </div>
              </div>
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Continue to Quiz (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 6 Knowledge Check">
          <p>Let's see what you've learned about CSS Grid Layout!</p>
          <Quiz questions={day6QuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
