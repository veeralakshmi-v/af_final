import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Code,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  MonitorPlay,
  Smartphone,
  Tablet as TabletIcon,
  Monitor,
  HelpCircle,
  Award,
  ChevronRight,
  Sliders,
  Send,
  AlertCircle,
  FileCode,
  Layout,
  Terminal,
  Trophy,
  CheckSquare,
  Zap,
  Briefcase,
  Star,
  ExternalLink,
  ShieldCheck,
  Eye,
  MessageSquare,
  PenTool,
  Search,
  RefreshCw,
  User,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  Menu,
  LayoutGrid,
  ArrowRight,
  Copy,
  SlidersHorizontal,
  Smartphone as MobileIcon
} from 'lucide-react';

const WebDesignDay11 = ({ activeTab: initialActiveTab, onNavigate, openAITutor }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab || 'intro');

  // Sync tab state with props
  useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    }
  }, [initialActiveTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day11', tabId);
    }
  };

  // --- Inline Syntax-Highlighted Code Editor Component ---
  const LiveSyntaxCodeEditor = ({ value, onChange, language = 'css', rows = 9, label = '' }) => {
    const preRef = useRef(null);

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
        const tokenRegex = /(\/\*[\s\S]*?\*\/)|([a-zA-Z0-9\-\.\#\:\s,]+)(?=\{)|([a-zA-Z\-]+)(?=\s*:)|(:\s*[^;\}]+;)/gi;
        return escaped.replace(tokenRegex, (match, comment, selector, prop, val) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (selector) return `<span style="color:#38bdf8;font-weight:bold;">${selector}</span>`;
          if (prop) return `<span style="color:#fb923c;font-weight:600;">${prop}</span>`;
          if (val) return `:<span style="color:#34d399;">${val.slice(1)}</span>`;
          return match;
        });
      }

      return escaped;
    };

    return (
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', background: '#090d16', display: 'flex', flexDirection: 'column', width: '100%' }}>
        {label && (
          <div style={{ background: '#1e293b', padding: '8px 16px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code size={14} /> {label}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', background: '#0f172a', padding: '2px 8px', borderRadius: '4px', border: '1px solid #334155', fontWeight: 700 }}>
              {language}
            </span>
          </div>
        )}
        <div style={{ position: 'relative', width: '100%', minHeight: `${rows * 24}px` }}>
          <pre
            ref={preRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: '14px',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.85rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflow: 'hidden',
              pointerEvents: 'none',
              color: '#f8fafc',
              zIndex: 1
            }}
            dangerouslySetInnerHTML={{ __html: highlightCode(value, language) }}
          />
          <textarea
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            onScroll={handleScroll}
            rows={rows}
            spellCheck="false"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              padding: '14px',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.85rem',
              lineHeight: '1.6',
              background: 'transparent',
              color: 'transparent',
              caretColor: '#38bdf8',
              resize: 'none',
              outline: 'none',
              border: 'none',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              zIndex: 2
            }}
          />
        </div>
      </div>
    );
  };

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================

  // 1. Before / After Toggle
  const [viewBeforeAfter, setViewBeforeAfter] = useState('after');

  // 2. CSS Variable Visualizer
  const [varPrimary, setVarPrimary] = useState('#6366f1');
  const [varText, setVarText] = useState('#f8fafc');
  const [varBg, setVarBg] = useState('#0f172a');
  const [varRadius, setVarRadius] = useState(12);
  const [varSpacing, setVarSpacing] = useState(20);

  // Challenge State
  const [userRadiusCode, setUserRadiusCode] = useState(`:root {
  --radius: 12px;
}

.card {
  border-radius: var(--radius);
  background: #1e293b;
  padding: 16px;
}

.button {
  border-radius: var(--radius);
  background: #4f46e5;
}`);
  const [showChallengeHint, setShowChallengeHint] = useState(false);
  const [showChallengeSol, setShowChallengeSol] = useState(false);

  // 3. Flexbox & Mobile Nav
  const [flexJustify, setFlexJustify] = useState('space-between');
  const [flexAlign, setFlexAlign] = useState('center');
  const [flexDirection, setFlexDirection] = useState('row');
  const [flexGap, setFlexGap] = useState(16);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 4. Advanced Grid & Sticky Navbar
  const [gridCols, setGridCols] = useState(3);
  const [gridGap, setGridGap] = useState(16);
  const [minWidthSlider, setMinWidthSlider] = useState(240);
  const [isStickyOn, setIsStickyOn] = useState(true);
  const [zIndexNav, setZIndexNav] = useState(100);

  // 5. Component System & Viewport Lab
  const [selectedBtnState, setSelectedBtnState] = useState('normal');
  const [viewportMode, setViewportMode] = useState('desktop');

  // 6. Guided CSS Upgrade (6 Core Stages)
  const [currentStage, setCurrentStage] = useState(0);
  const [stageCodes, setStageCodes] = useState([
    `:root {\n  --primary: #6366f1;\n  --bg-dark: #0f172a;\n  --card-bg: #1e293b;\n  --text-main: #f8fafc;\n  --radius: 12px;\n  --space-md: 20px;\n}`,
    `.btn {\n  padding: 10px 20px;\n  border-radius: var(--radius);\n  font-weight: 700;\n  border: none;\n  cursor: pointer;\n}\n.btn-primary {\n  background: var(--primary);\n  color: #fff;\n}\n.card {\n  background: var(--card-bg);\n  padding: var(--space-md);\n  border-radius: var(--radius);\n  border: 1px solid #334155;\n}`,
    `.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}`,
    `.nav-menu.active {\n  display: flex;\n  flex-direction: column;\n  position: absolute;\n  top: 60px;\n  left: 0;\n  right: 0;\n  background: #0f172a;\n  padding: 20px;\n}`,
    `.services-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}`,
    `.navbar {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  backdrop-filter: blur(10px);\n}`
  ]);
  const [stageHint, setStageHint] = useState(false);
  const [stageSol, setStageSol] = useState(false);

  const stages = [
    { title: "Stage 1: Define CSS Variables", desc: "Set up centralized design tokens in the :root selector." },
    { title: "Stage 2: Reusable Button & Card Classes", desc: "Build base .btn and .card styles using var(--radius)." },
    { title: "Stage 3: Flexbox Navbar Alignment", desc: "Align logo, nav links, and CTA button horizontally." },
    { title: "Stage 4: Mobile Drawer Menu Interaction", desc: "Style .nav-menu.active for smooth mobile dropdowns." },
    { title: "Stage 5: Responsive Auto-Fit Grid Layout", desc: "Create dynamic multi-column grids using repeat(auto-fit, minmax(250px, 1fr))." },
    { title: "Stage 6: Sticky Positioning & Z-Index", desc: "Pin navbar to top with position: sticky and z-index: 1000." }
  ];

  // 7. Practice, AI Audit & 18-Question Quiz
  const [aiAuditLoading, setAiAuditLoading] = useState(false);
  const [aiAuditResult, setAiAuditResult] = useState(null);

  const handleRunAIAudit = () => {
    setAiAuditLoading(true);
    setTimeout(() => {
      setAiAuditResult({
        strengths: [
          "Consistent design system: CSS variables used for theme colors and radius.",
          "Responsive navbar: Hamburger menu toggles cleanly into vertical stack.",
          "Accessible touch targets: Buttons meet 44px minimum height guideline."
        ],
        improvements: [
          "Card typography contrast can be increased slightly for body text.",
          "Ensure grid gap scales down smoothly on mobile screens under 480px.",
          "Add focus-visible outline indicators for keyboard Tab navigation."
        ],
        snippets: [
          `@media (max-width: 480px) { .grid { gap: 12px; } }`,
          `:focus-visible { outline: 2px solid #38bdf8; outline-offset: 3px; }`,
          `.card:hover { transform: translateY(-4px); transition: transform 0.2s ease; }`
        ]
      });
      setAiAuditLoading(false);
    }, 1000);
  };

  // 18 Quiz Questions
  const quizQuestions = [
    { q: "1. Why use CSS variables (:root) instead of hardcoded hex values?", opts: ["Improves render speed by 50%", "Centralized design tokens allow global theme changes in one place", "Prevents HTML elements from overflowing", "Makes CSS files smaller"], ans: 1 },
    { q: "2. How do you declare a CSS variable in the global scope?", opts: ["$primary: #6366f1;", ":root { --primary: #6366f1; }", "var primary = #6366f1;", "@define --primary #6366f1;"], ans: 1 },
    { q: "3. Which function syntax retrieves a CSS variable's value?", opts: ["get(--primary)", "var(--primary)", "val(--primary)", "css(--primary)"], ans: 1 },
    { q: "4. What does justify-content control in a Flexbox container?", opts: ["Item alignment along cross axis", "Item alignment along main axis", "Stacking z-index order", "Border radius"], ans: 1 },
    { q: "5. What property aligns items perpendicular to main axis in Flexbox?", opts: ["align-items", "justify-items", "align-content", "flex-direction"], ans: 0 },
    { q: "6. What is the effect of flex-wrap: wrap;?", opts: ["Forces items on a single line", "Allows items to wrap to next line when space runs out", "Rotates items 90 degrees", "Hides items on mobile"], ans: 1 },
    { q: "7. What does grid-template-columns: repeat(3, 1fr); create?", opts: ["3 rows of 100px", "3 equal-width columns", "1 column repeated 3 times", "3% grid padding"], ans: 1 },
    { q: "8. What does 1fr unit represent in CSS Grid?", opts: ["1 fixed pixel ratio", "1 fraction of available free space in grid container", "1 frame per second", "100% viewport width"], ans: 1 },
    { q: "9. How does repeat(auto-fit, minmax(250px, 1fr)) enhance responsiveness?", opts: ["Generates 250 media queries", "Adjusts column count automatically without manual media queries", "Fixes width to 250px", "Forces single vertical column"], ans: 1 },
    { q: "10. What is the difference between auto-fit and auto-fill?", opts: ["auto-fit stretches columns to fill empty space; auto-fill maintains empty column tracks", "auto-fit works only on mobile", "auto-fit requires JS", "No difference"], ans: 0 },
    { q: "11. What is a CSS Media Query used for?", opts: ["SQL queries from CSS", "Applying styles conditionally based on viewport width/height", "Playing media files", "Validating forms"], ans: 1 },
    { q: "12. Why test designs across multiple viewport breakpoints?", opts: ["Browsers require test logs", "To catch layout overflow and tiny touch targets early", "To convert CSS into JS", "To increase SEO ranking"], ans: 1 },
    { q: "13. What behavior does position: sticky; top: 0; produce?", opts: ["Permanently fixed to top covering content", "Scrolls normally until top 0px, then locks in place while scrolling continues", "Hides on scroll", "Centers element vertically"], ans: 1 },
    { q: "14. What does z-index control?", opts: ["Horizontal position", "Vertical position", "Stacking order of overlapping elements along z-axis", "Image zoom level"], ans: 2 },
    { q: "15. When does :hover apply styles?", opts: ["On mouse click", "When cursor hovers over element", "When page loads", "When focused via Tab key"], ans: 1 },
    { q: "16. Why is :focus-visible vital for web accessibility?", opts: ["Changes font for screen readers", "Provides clear visual highlight for keyboard Tab navigation", "Translates text automatically", "Increases contrast"], ans: 1 },
    { q: "17. What does element.classList.toggle('active') do in JS?", opts: ["Deletes class active", "Adds active if absent; removes active if present", "Creates HTML element active", "Changes background color"], ans: 1 },
    { q: "18. Why should mobile touch targets be at least 44x44 pixels?", opts: ["Makes grid math easy", "Allows comfortable tapping with human thumbs without error", "44 is a CSS prime number", "Loads faster on mobile"], ans: 1 }
  ];

  const [quizAns, setQuizAns] = useState(Array(18).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const calculateScore = () => {
    let s = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAns[i] === q.ans) s++;
    });
    return s;
  };

  // ==========================================
  // RENDER COMPONENT
  // ==========================================

  return (
    <div style={{ background: '#090d16', minHeight: '100vh', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '0 0 3rem 0' }}>
      
      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
        
        {/* NON-STICKY CLEAN TOP HEADER CARD */}
        <header style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
                DAY 11 / 20 • 55% COMPLETE
              </span>
              <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                ADVANCED UI &amp; CSS PHASE
              </span>
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', lineHeight: '1.3' }}>
              <Sparkles size={22} style={{ color: '#818cf8', shrink: 0 }} />
              Advanced CSS: Modern Layouts, Responsive Navbar &amp; UI Components
            </h1>
          </div>

          <button
            onClick={() => openAITutor && openAITutor("Help me understand Advanced CSS layout techniques and CSS variables!")}
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)', whiteSpace: 'nowrap' }}
          >
            <Sparkles size={16} /> Ask AI Tutor
          </button>
        </header>

        {/* TAB 1: INTRO & BEFORE / AFTER */}
        {activeTab === 'intro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Objective Card */}
            <div style={{ background: '#0f172a', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award style={{ color: '#818cf8' }} size={26} />
                Day 11 Objective: Advanced CSS for Professional Websites
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                Today, you take a basic webpage structure and upgrade it using <strong>reusable CSS design tokens</strong>, <strong>fluid Flexbox &amp; Grid layouts</strong>, <strong>sticky positioning</strong>, and an accessible <strong>mobile navigation drawer</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {[
                  "CSS Variables (:root)",
                  "Advanced Flexbox & Gap",
                  "Advanced Grid & repeat()",
                  "auto-fit & minmax()",
                  "Sticky Navigation & z-index",
                  "Reusable Card & Button System",
                  "Mobile Hamburger Drawer",
                  "Mobile-First Responsive Audit"
                ].map((item, idx) => (
                  <div key={idx} style={{ background: '#1e293b', border: '1px solid #334155', padding: '8px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={14} style={{ color: '#818cf8' }} /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* BEFORE / AFTER Interactive Showcase */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Eye size={20} style={{ color: '#38bdf8' }} /> Website Transformation: BEFORE vs AFTER
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
                    Compare the basic unrefined layout against today's refactored design system.
                  </p>
                </div>
                <div style={{ display: 'flex', background: '#090d16', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                  <button
                    onClick={() => setViewBeforeAfter('before')}
                    style={{
                      background: viewBeforeAfter === 'before' ? '#f43f5e' : 'transparent',
                      color: viewBeforeAfter === 'before' ? '#ffffff' : '#94a3b8',
                      border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer'
                    }}
                  >
                    BEFORE (Basic)
                  </button>
                  <button
                    onClick={() => setViewBeforeAfter('after')}
                    style={{
                      background: viewBeforeAfter === 'after' ? '#10b981' : 'transparent',
                      color: viewBeforeAfter === 'after' ? '#ffffff' : '#94a3b8',
                      border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer'
                    }}
                  >
                    AFTER (Professional)
                  </button>
                </div>
              </div>

              {viewBeforeAfter === 'before' ? (
                <div style={{ border: '2px dashed #f43f5e', borderRadius: '12px', padding: '20px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', flexWrap: 'wrap', gap: '12px' }}>
                    <span style={{ fontWeight: 800, color: '#f43f5e', fontSize: '0.85rem' }}>Basic Logo</span>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <span>Home</span><span>About</span><span>Services</span>
                    </div>
                    <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '4px' }}>CTA</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div style={{ background: '#1e293b', padding: '12px', border: '1px solid #334155' }}>
                      <h4 style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem' }}>Basic Card 1</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0 0' }}>Fixed spacing, hardcoded colors.</p>
                    </div>
                    <div style={{ background: '#1e293b', padding: '12px', border: '1px solid #334155' }}>
                      <h4 style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem' }}>Basic Card 2</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0 0' }}>No mobile menu drawer.</p>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '10px 14px', borderRadius: '6px', color: '#fda4af', fontSize: '0.78rem' }}>
                    ⚠️ <strong>Issues:</strong> Fixed pixel widths, hardcoded repeated colors, missing sticky navigation, and inconsistent border radius values.
                  </div>
                </div>
              ) : (
                <div style={{ border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '20px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* CLEAN PRO NAVBAR MOCK WITH FIXED ALIGNMENT */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ fontWeight: 900, color: '#38bdf8', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                      🚀 PRO WEBSITE
                    </div>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ color: '#818cf8', cursor: 'pointer' }}>Home</span>
                      <span style={{ cursor: 'pointer' }}>About</span>
                      <span style={{ cursor: 'pointer' }}>Services</span>
                      <span style={{ cursor: 'pointer' }}>Contact</span>
                    </div>
                    <button style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      Get Started
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {[1, 2, 3].map((n) => (
                      <div key={n} style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>0{n}</div>
                        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem' }}>Refactored Card #{n}</h4>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>Styled via CSS variables, flex layout, and smooth hover feedback.</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '10px 14px', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.78rem' }}>
                    ✨ <strong>Upgrades:</strong> Centralized `:root` design tokens, sticky navigation bar, auto-fit grid layout, and reusable button classes.
                  </div>
                </div>
              )}

              {/* Reflection question */}
              <div style={{ marginTop: '20px', background: '#090d16', border: '1px solid #1e293b', padding: '16px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <HelpCircle size={16} /> "Did we change the HTML structure completely?"
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>
                    <strong>Answer: No!</strong> Professional frontend development focuses on elevating existing HTML structure through reusable CSS design tokens and responsive layout systems.
                  </p>
                </div>
                <button
                  onClick={() => handleTabClick('variables')}
                  style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                >
                  Next: CSS Tokens &amp; Variables <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CSS TOKENS & VARIABLES */}
        {activeTab === 'variables' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders style={{ color: '#818cf8' }} size={22} /> CSS Design Tokens &amp; Variables (:root)
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                A professional website should never randomly use 17 different colors or 12 different border radius values. Instead, define reusable design values inside the <code style={{ color: '#38bdf8', background: '#090d16', padding: '2px 6px', borderRadius: '4px' }}>:root</code> pseudo-class.
              </p>
            </div>

            {/* Interactive Visualizer Panel */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={18} style={{ color: '#38bdf8' }} /> Interactive CSS Variable Control Panel
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {/* Control Panel */}
                <div style={{ background: '#090d16', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', borderBottom: '1px solid #1e293b', paddingBottom: '8px', textTransform: 'uppercase' }}>
                    Live Design Token Controls
                  </h4>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Primary Accent (--primary)</span>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{varPrimary}</span>
                    </label>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <input type="color" value={varPrimary} onChange={(e) => setVarPrimary(e.target.value)} style={{ width: '40px', height: '34px', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }} />
                      <input type="text" value={varPrimary} onChange={(e) => setVarPrimary(e.target.value)} style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Border Radius (--radius)</span>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{varRadius}px</span>
                    </label>
                    <input type="range" min="0" max="32" value={varRadius} onChange={(e) => setVarRadius(Number(e.target.value))} style={{ width: '100%', marginTop: '6px', accentColor: '#6366f1' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Card Padding (--spacing)</span>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{varSpacing}px</span>
                    </label>
                    <input type="range" min="8" max="40" value={varSpacing} onChange={(e) => setVarSpacing(Number(e.target.value))} style={{ width: '100%', marginTop: '6px', accentColor: '#6366f1' }} />
                  </div>
                </div>

                {/* Live Preview */}
                <div style={{ background: '#090d16', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '12px', textTransform: 'uppercase' }}>
                      Component Live Preview
                    </span>
                    <div
                      style={{
                        background: varBg,
                        color: varText,
                        borderRadius: `${varRadius}px`,
                        padding: `${varSpacing}px`,
                        border: `2px solid ${varPrimary}`,
                        boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <h4 style={{ margin: 0, fontSize: '1rem', color: varText }}>Live Token Card</h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', opacity: 0.9, lineHeight: '1.4' }}>
                        Updating one CSS variable dynamically changes buttons, cards, and spacing rules across the entire website!
                      </p>
                      <button
                        style={{
                          background: varPrimary,
                          borderRadius: `${varRadius}px`,
                          padding: '8px 16px',
                          color: '#ffffff',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          alignSelf: 'flex-start'
                        }}
                      >
                        Action Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Refactoring Challenge */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} style={{ color: '#fbbf24' }} /> CSS Variable Challenge: "Create One Reusable Radius Variable"
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>
                Replace the repeated border radius values in the code below with a single <code style={{ color: '#38bdf8' }}>--radius</code> variable.
              </p>

              <LiveSyntaxCodeEditor
                value={userRadiusCode}
                onChange={setUserRadiusCode}
                language="css"
                rows={9}
                label="Refactor Broken CSS to Use Variables"
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowChallengeHint(!showChallengeHint)}
                  style={{ background: '#1e293b', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {showChallengeHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                <button
                  onClick={() => setShowChallengeSol(!showChallengeSol)}
                  style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {showChallengeSol ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>

              {showChallengeHint && (
                <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '10px', borderRadius: '8px', color: '#fde047', fontSize: '0.78rem' }}>
                  💡 <strong>Hint:</strong> Declare <code style={{ background: '#090d16', padding: '2px 4px' }}>:root &#123; --radius: 12px; &#125;</code> and replace pixel values with <code style={{ background: '#090d16', padding: '2px 4px' }}>var(--radius)</code>.
                </div>
              )}

              {showChallengeSol && (
                <div style={{ background: '#090d16', border: '1px solid #334155', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace', color: '#34d399' }}>
                  <pre style={{ margin: 0 }}>{`:root {\n  --radius: 12px;\n}\n.card, .button {\n  border-radius: var(--radius);\n}`}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: FLEXBOX & MOBILE NAV */}
        {activeTab === 'flexbox_nav' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutGrid style={{ color: '#818cf8' }} size={22} /> Advanced Flexbox &amp; Responsive Mobile Navigation
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                Flexbox is designed for 1-dimensional layouts. Desktop navbars arrange items horizontally with <code style={{ color: '#38bdf8' }}>justify-content: space-between</code>. Mobile menus use JavaScript <code style={{ color: '#38bdf8' }}>classList.toggle('active')</code> to reveal vertical drawers.
              </p>
            </div>

            {/* Flexbox Playground */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Interactive Flexbox Visualizer Playground</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', background: '#090d16', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>justify-content</label>
                  <select value={flexJustify} onChange={(e) => setFlexJustify(e.target.value)} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '0.78rem' }}>
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>align-items</label>
                  <select value={flexAlign} onChange={(e) => setFlexAlign(e.target.value)} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '0.78rem' }}>
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>gap ({flexGap}px)</label>
                  <input type="range" min="0" max="32" value={flexGap} onChange={(e) => setFlexGap(Number(e.target.value))} style={{ width: '100%', accentColor: '#6366f1' }} />
                </div>
              </div>

              {/* Flexbox Box Output */}
              <div style={{ background: '#090d16', padding: '20px', borderRadius: '12px', border: '1px dashed #6366f1', minHeight: '140px', display: 'flex', justifyContent: flexJustify, alignItems: flexAlign, gap: `${flexGap}px`, flexWrap: 'wrap' }}>
                <div style={{ background: '#4f46e5', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem' }}>LOGO</div>
                <div style={{ background: '#7c3aed', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem' }}>NAV LINKS</div>
                <div style={{ background: '#0891b2', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem' }}>CTA BUTTON</div>
              </div>

              {/* Mobile Drawer Visualizer */}
              <div style={{ background: '#090d16', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.88rem', color: '#a5b4fc' }}>Mobile Drawer Navigation Interaction (JS Toggle)</h4>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />} Toggle Menu ({mobileMenuOpen ? 'OPEN' : 'CLOSED'})
                  </button>
                </div>

                {mobileMenuOpen ? (
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>.nav-menu.active (Vertical Stack Drawer)</span>
                    <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid #334155' }}>Home</a>
                    <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid #334155' }}>About</a>
                    <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.82rem', paddingBottom: '6px', borderBottom: '1px solid #334155' }}>Services</a>
                    <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.82rem' }}>Contact</a>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center', padding: '12px' }}>
                    📱 Mobile Navigation Drawer is CLOSED. Tap button above to toggle active class!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ADVANCED GRID & STICKY NAVBAR */}
        {activeTab === 'grid_lab' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layout style={{ color: '#818cf8' }} size={22} /> Advanced Grid, auto-fit &amp; Sticky Navbar
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                CSS Grid algorithms like <code style={{ color: '#38bdf8' }}>repeat(auto-fit, minmax(240px, 1fr))</code> adapt automatically to screen sizes without cluttering your code with media queries. <code style={{ color: '#38bdf8' }}>position: sticky</code> pins the header on scroll.
              </p>
            </div>

            {/* Grid Playground & MinMax Slider */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>MinMax Auto-Fit Visualizer</h3>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', background: '#090d16', padding: '4px 10px', borderRadius: '6px', border: '1px solid #1e293b', fontFamily: 'monospace' }}>
                  repeat(auto-fit, minmax({minWidthSlider}px, 1fr))
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Card Minimum Width Threshold: {minWidthSlider}px</label>
                <input type="range" min="160" max="360" value={minWidthSlider} onChange={(e) => setMinWidthSlider(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${minWidthSlider}px, 1fr))`, gap: '16px' }}>
                {[1, 2, 3].map((num) => (
                  <div key={num} style={{ background: '#090d16', border: '1px solid #334155', padding: '16px', borderRadius: '12px' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '0.88rem', color: '#a5b4fc' }}>Fluid Grid Card #{num}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.4' }}>Reflows seamlessly between multi-column and single-column modes!</p>
                  </div>
                ))}
              </div>

              {/* Sticky Demo */}
              <div style={{ background: '#090d16', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.88rem', color: '#ffffff' }}>Sticky Navigation Bar Scroll Demo</h4>
                  <button
                    onClick={() => setIsStickyOn(!isStickyOn)}
                    style={{ background: isStickyOn ? '#10b981' : '#f43f5e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Sticky Navbar: {isStickyOn ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div style={{ height: '200px', overflowY: 'auto', border: '1px solid #334155', borderRadius: '10px', background: '#0f172a', padding: '12px', position: 'relative' }}>
                  <div style={{ position: isStickyOn ? 'sticky' : 'static', top: 0, background: '#4f46e5', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem', zIndex: zIndexNav, marginBottom: '16px' }}>
                    📌 STICKY HEADER (z-index: {zIndexNav})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1' }}>Scroll content paragraph 1... Sticky header locks to top 0px when scrolled!</p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1' }}>Scroll content paragraph 2... Keeps primary brand actions always visible.</p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1' }}>Scroll content paragraph 3... End of scroll area.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COMPONENT SYSTEM & VIEWPORT LAB */}
        {activeTab === 'ui_components' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PenTool style={{ color: '#818cf8' }} size={22} /> Reusable Component System &amp; Viewport Testing Lab
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                Define base classes like <code style={{ color: '#38bdf8' }}>.btn</code> and <code style={{ color: '#38bdf8' }}>.card</code>, test state modifiers (Hover, Focus, Active, Disabled), and test viewports.
              </p>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Button States */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0' }}>Button State Modifier Visualizer</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {['normal', 'hover', 'focus', 'active', 'disabled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedBtnState(st)}
                      style={{
                        background: selectedBtnState === st ? '#4f46e5' : '#090d16',
                        color: selectedBtnState === st ? '#fff' : '#94a3b8',
                        border: selectedBtnState === st ? '1px solid #6366f1' : '1px solid #334155',
                        padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      State: {st}
                    </button>
                  ))}
                </div>

                <div style={{ background: '#090d16', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b', textAlign: 'center' }}>
                  <button
                    disabled={selectedBtnState === 'disabled'}
                    style={{
                      background: selectedBtnState === 'hover' ? '#6366f1' : selectedBtnState === 'active' ? '#3730a3' : selectedBtnState === 'disabled' ? '#334155' : '#4f46e5',
                      color: selectedBtnState === 'disabled' ? '#94a3b8' : '#ffffff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: selectedBtnState === 'disabled' ? 'not-allowed' : 'pointer',
                      outline: selectedBtnState === 'focus' ? '3px solid #38bdf8' : 'none',
                      boxShadow: selectedBtnState === 'hover' ? '0 8px 16px rgba(99, 102, 241, 0.4)' : 'none',
                      transform: selectedBtnState === 'hover' ? 'translateY(-2px)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    .btn .btn-primary ({selectedBtnState})
                  </button>
                </div>
              </div>

              {/* Viewport Lab */}
              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Responsive Viewport Testing Frame</h3>
                  <div style={{ display: 'flex', gap: '6px', background: '#090d16', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <button onClick={() => setViewportMode('desktop')} style={{ background: viewportMode === 'desktop' ? '#4f46e5' : 'transparent', color: viewportMode === 'desktop' ? '#fff' : '#94a3b8', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Desktop (1200px)</button>
                    <button onClick={() => setViewportMode('tablet')} style={{ background: viewportMode === 'tablet' ? '#4f46e5' : 'transparent', color: viewportMode === 'tablet' ? '#fff' : '#94a3b8', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Tablet (768px)</button>
                    <button onClick={() => setViewportMode('mobile')} style={{ background: viewportMode === 'mobile' ? '#4f46e5' : 'transparent', color: viewportMode === 'mobile' ? '#fff' : '#94a3b8', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Mobile (375px)</button>
                  </div>
                </div>

                <div style={{ background: '#090d16', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                      transition: 'width 0.3s ease',
                      background: '#0f172a',
                      border: '2px solid #4f46e5',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ fontWeight: 900, color: '#38bdf8', fontSize: '0.85rem' }}>TechCorp</span>
                      {viewportMode === 'mobile' ? <Menu size={18} style={{ color: '#fff' }} /> : <div style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', gap: '12px' }}><span>Home</span><span>Services</span><span>Contact</span></div>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: viewportMode === 'desktop' ? 'repeat(3, 1fr)' : viewportMode === 'tablet' ? 'repeat(2, 1fr)' : '1fr', gap: '10px' }}>
                      {[1, 2, 3].map((i) => (
                        <div key={i} style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.75rem', color: '#cbd5e1' }}>
                          Card #{i} ({viewportMode})
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GUIDED CSS UPGRADE (6 CORE STAGES) */}
        {activeTab === 'guided_build' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code style={{ color: '#818cf8' }} size={22} /> Guided CSS Upgrade (6 Core Stages)
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>Refactor Mini Project 1 into a component-based design system step by step.</p>
              </div>
              <span style={{ background: '#090d16', border: '1px solid #334155', color: '#a5b4fc', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800 }}>
                Stage {currentStage + 1} / 6
              </span>
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#818cf8' }}>{stages[currentStage].title}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>{stages[currentStage].desc}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button disabled={currentStage === 0} onClick={() => setCurrentStage(prev => Math.max(0, prev - 1))} style={{ background: '#1e293b', color: '#cbd5e1', border: '1px solid #334155', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: currentStage === 0 ? 'not-allowed' : 'pointer', opacity: currentStage === 0 ? 0.5 : 1 }}>Previous</button>
                  <button disabled={currentStage === 5} onClick={() => setCurrentStage(prev => Math.min(5, prev + 1))} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: currentStage === 5 ? 'not-allowed' : 'pointer', opacity: currentStage === 5 ? 0.5 : 1 }}>Next Stage</button>
                </div>
              </div>

              <LiveSyntaxCodeEditor
                value={stageCodes[currentStage]}
                onChange={(val) => {
                  const updated = [...stageCodes];
                  updated[currentStage] = val;
                  setStageCodes(updated);
                }}
                language="css"
                rows={9}
                label={`Stage ${currentStage + 1} Editor`}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStageHint(!stageHint)} style={{ background: '#1e293b', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>{stageHint ? 'Hide Hint' : 'Show Hint'}</button>
                <button onClick={() => setStageSol(!stageSol)} style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>{stageSol ? 'Hide Solution' : 'Show Solution'}</button>
              </div>

              {stageHint && <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '10px', borderRadius: '8px', color: '#fde047', fontSize: '0.78rem' }}>💡 Verify selector names before moving forward.</div>}
              {stageSol && <div style={{ background: '#090d16', border: '1px solid #334155', padding: '10px', borderRadius: '8px', color: '#34d399', fontSize: '0.78rem', fontFamily: 'monospace' }}><pre style={{ margin: 0 }}>{stageCodes[currentStage]}</pre></div>}
            </div>
          </div>
        )}

        {/* TAB 7: PRACTICE, AI AUDIT & QUIZ */}
        {activeTab === 'assignment_quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle style={{ color: '#818cf8' }} size={22} /> Day 11 Practice, AI Audit &amp; Knowledge Check
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>Test your understanding of CSS Variables, Flexbox, Grid, Sticky Positioning, and Responsive Mobile UI.</p>
            </div>

            {/* AI Audit Box */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: '#818cf8' }} /> Automated AI Design System &amp; Mobile Audit
              </h3>
              <button
                onClick={handleRunAIAudit}
                disabled={aiAuditLoading}
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                {aiAuditLoading ? 'Analyzing Design Tokens...' : 'Run AI Mobile Audit'}
              </button>

              {aiAuditResult && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '12px' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#34d399' }}>3 Strengths</h4>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', color: '#cbd5e1' }}>{aiAuditResult.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </div>
                  <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '12px', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#fbbf24' }}>3 Improvements</h4>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', color: '#cbd5e1' }}>{aiAuditResult.improvements.map((imp, i) => <li key={i}>{imp}</li>)}</ul>
                  </div>
                </div>
              )}
            </div>

            {/* 18 Quiz Questions */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>18 Interactive Quiz Questions</h3>

              {quizQuestions.map((qItem, qIdx) => (
                <div key={qIdx} style={{ background: '#090d16', border: '1px solid #1e293b', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#ffffff' }}>{qItem.q}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                    {qItem.opts.map((opt, oIdx) => {
                      const isSelected = quizAns[qIdx] === oIdx;
                      const isCorrect = qItem.ans === oIdx;
                      let bg = '#1e293b';
                      let border = '#334155';
                      let color = '#cbd5e1';

                      if (quizSubmitted) {
                        if (isCorrect) { bg = 'rgba(16, 185, 129, 0.2)'; border = '#10b981'; color = '#34d399'; }
                        else if (isSelected) { bg = 'rgba(244, 63, 94, 0.2)'; border = '#f43f5e'; color = '#fda4af'; }
                      } else if (isSelected) {
                        bg = '#4f46e5'; border = '#6366f1'; color = '#ffffff';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (quizSubmitted) return;
                            const newA = [...quizAns];
                            newA[qIdx] = oIdx;
                            setQuizAns(newA);
                          }}
                          style={{ background: bg, border: `1px solid ${border}`, color: color, padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', textAlign: 'left', cursor: quizSubmitted ? 'default' : 'pointer', fontWeight: isSelected || (quizSubmitted && isCorrect) ? 700 : 500 }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px' }}>
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={quizSubmitted}
                  style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: quizSubmitted ? 'not-allowed' : 'pointer', opacity: quizSubmitted ? 0.6 : 1 }}
                >
                  Submit Knowledge Check Answers
                </button>

                {quizSubmitted && (
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#38bdf8' }}>
                    Score: {calculateScore()} / 18 ({Math.round((calculateScore() / 18) * 100)}%)
                  </div>
                )}
              </div>
            </div>

            {/* Completion Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '20px', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={32} />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>
                🎉 Advanced CSS Upgrade Completed!
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', maxWidth: '500px', lineHeight: '1.5' }}>
                You have mastered CSS Variables, Flexbox, Grid auto-fit, Sticky navigation, and Responsive Mobile UI!
              </p>
              <div style={{ background: '#090d16', border: '1px solid #334155', padding: '12px 24px', borderRadius: '12px', fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 700 }}>
                👉 Up Next in Day 12: JavaScript for Real Website Interactions (DOM, Events, Accordions &amp; Modals!)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebDesignDay11;
