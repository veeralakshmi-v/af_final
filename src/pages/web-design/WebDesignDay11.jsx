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

  // --- Sync tab state with props ---
  useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    }
  }, [initialActiveTab]);

  // --- Live Syntax Code Editor Component ---
  const LiveSyntaxCodeEditor = ({ value, onChange, language = 'html', rows = 12, label = '' }) => {
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
          if (selector) return `<span style="color:#61afef;font-weight:bold;">${selector}</span>`;
          if (prop) return `<span style="color:#e5c07b;">${prop}</span>`;
          if (val) return `<span style="color:#98c379;">${val}</span>`;
          return match;
        });
      }

      if (lang === 'js' || lang === 'javascript') {
        const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)|(\bconst\b|\blet\b|\bvar\b|\bfunction\b|\breturn\b|\bif\b|\belse\b|\bfor\b|\bwhile\b|\bdocument\b|\bwindow\b|\bevent\b|\be\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*(?=\())|(\b\d+\b)/g;
        return escaped.replace(tokenRegex, (match, comment, str, kw, fn, num) => {
          if (comment) return `<span style="color:#7f848e;font-style:italic;">${comment}</span>`;
          if (str) return `<span style="color:#98c379;">${str}</span>`;
          if (kw) return `<span style="color:#c678dd;font-weight:bold;">${kw}</span>`;
          if (fn) return `<span style="color:#61afef;">${fn}</span>`;
          if (num) return `<span style="color:#d19a66;">${num}</span>`;
          return match;
        });
      }

      return escaped;
    };

    return (
      <div className="relative font-mono text-sm rounded-xl overflow-hidden border border-slate-700/70 bg-slate-950 shadow-2xl">
        {label && (
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-sans text-slate-400">
            <span className="flex items-center gap-2 font-semibold text-slate-300">
              <Code size={14} className="text-cyan-400" />
              {label}
            </span>
            <span className="uppercase text-[10px] bg-slate-800 px-2 py-0.5 rounded text-cyan-300 font-bold border border-slate-700">
              {language}
            </span>
          </div>
        )}
        <div className="relative" style={{ height: `${rows * 24}px` }}>
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 p-4 m-0 overflow-auto pointer-events-none font-mono text-sm leading-6 whitespace-pre tab-4"
            dangerouslySetInnerHTML={{ __html: highlightCode(value, language) + '<br/>' }}
          />
          <textarea
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            onScroll={handleScroll}
            rows={rows}
            spellCheck="false"
            className="absolute inset-0 w-full h-full p-4 m-0 font-mono text-sm leading-6 bg-transparent text-transparent caret-cyan-400 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50 whitespace-pre tab-4"
          />
        </div>
      </div>
    );
  };

  // ==========================================
  // STATE DEFINITIONS
  // ==========================================

  // 1. Before / After Toggle State
  const [viewBeforeAfter, setViewBeforeAfter] = useState('after'); // 'before' | 'after'

  // 2. CSS Variable Visualizer Controls State
  const [varPrimary, setVarPrimary] = useState('#3b82f6');
  const [varText, setVarText] = useState('#f8fafc');
  const [varBg, setVarBg] = useState('#0f172a');
  const [varRadius, setVarRadius] = useState(12);
  const [varSpacing, setVarSpacing] = useState(20);

  // 3. CSS Variable Refactor Challenge State
  const [userRadiusVar, setUserRadiusVar] = useState(`/* Refactor this broken CSS to use a single CSS variable --border-radius */
.card {
  border-radius: 16px;
  background: #1e293b;
  padding: 16px;
}
.button {
  border-radius: 4px;
  background: #3b82f6;
}
.input {
  border-radius: 24px;
  padding: 8px;
}`);
  const [challengeHintShow, setChallengeHintShow] = useState(false);
  const [challengeSolShow, setChallengeSolShow] = useState(false);

  // 4. Advanced Flexbox Playground State
  const [flexJustify, setFlexJustify] = useState('space-between');
  const [flexAlign, setFlexAlign] = useState('center');
  const [flexDirection, setFlexDirection] = useState('row');
  const [flexWrap, setFlexWrap] = useState('wrap');
  const [flexGap, setFlexGap] = useState(16);

  // 5. Mobile Menu Visualizer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 6. Advanced Grid & MinMax State
  const [gridCols, setGridCols] = useState(3);
  const [gridGap, setGridGap] = useState(16);
  const [minWidthSlider, setMinWidthSlider] = useState(220);

  // 7. Sticky & Z-Index Visualizer State
  const [isStickyOn, setIsStickyOn] = useState(true);
  const [zIndexNav, setZIndexNav] = useState(100);

  // 8. Card & Button State Visualizer State
  const [selectedCardState, setSelectedCardState] = useState('normal'); // normal, hover, focus, active, disabled
  const [selectedBtnState, setSelectedBtnState] = useState('normal');

  // 9. UI Consistency Bad Site Fix Challenge
  const [badSiteFixed, setBadSiteFixed] = useState(false);

  // 10. Responsive Viewport Tester State
  const [viewportMode, setViewportMode] = useState('desktop'); // desktop, tablet, mobile

  // 11. Build-With-Me 16 Stages State
  const [currentStage, setCurrentStage] = useState(0);
  const [stageUserCodes, setStageUserCodes] = useState([
    `:root {\n  --primary: #4f46e5;\n  --bg-dark: #0f172a;\n  --card-bg: #1e293b;\n  --text-main: #f8fafc;\n  --radius: 12px;\n  --space-md: 20px;\n}`,
    `.hero-btn {\n  background-color: var(--primary);\n}\n.card {\n  background-color: var(--card-bg);\n  color: var(--text-main);\n}`,
    `:root {\n  --space-xs: 4px;\n  --space-sm: 8px;\n  --space-md: 16px;\n  --space-lg: 24px;\n  --space-xl: 32px;\n}`,
    `.card, .btn, .input {\n  border-radius: var(--radius);\n}`,
    `.btn {\n  padding: 10px 20px;\n  border-radius: var(--radius);\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n}\n.btn-primary {\n  background: var(--primary);\n  color: #fff;\n}\n.btn-secondary {\n  background: transparent;\n  border: 1px solid var(--primary);\n  color: var(--primary);\n}`,
    `.card {\n  background: var(--card-bg);\n  padding: var(--space-lg);\n  border-radius: var(--radius);\n  border: 1px solid rgba(255,255,255,0.1);\n}`,
    `.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space-md) var(--space-lg);\n}`,
    `.services-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: var(--space-lg);\n}`,
    `.nav-menu {\n  display: flex;\n  gap: var(--space-md);\n  align-items: center;\n}`,
    `.nav-menu.active {\n  display: flex;\n  flex-direction: column;\n  position: absolute;\n  top: 60px;\n  left: 0;\n  right: 0;\n  background: var(--bg-dark);\n  padding: 20px;\n}`,
    `.navbar {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  backdrop-filter: blur(10px);\n}`,
    `.navbar {\n  z-index: 1000;\n}\n.modal {\n  z-index: 2000;\n}`,
    `@media (max-width: 768px) {\n  .nav-links {\n    display: none;\n  }\n  .menu-btn {\n    display: block;\n  }\n}`,
    `body {\n  font-size: 16px;\n  line-height: 1.6;\n}\np {\n  max-width: 65ch;\n}`,
    `.card {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 12px 24px rgba(0,0,0,0.4);\n}`,
    `/* Mobile Audit Check: Ensure min 44px touch targets */\n.btn, .nav-link {\n  min-height: 44px;\n  min-width: 44px;\n}`
  ]);
  const [stageHints, setStageHints] = useState(Array(16).fill(false));
  const [stageSols, setStageSols] = useState(Array(16).fill(false));

  const stagesData = [
    { title: "Stage 1: Define CSS Variables", desc: "Create centralized design tokens in the :root selector." },
    { title: "Stage 2: Refactor Colors", desc: "Replace hardcoded hex values with var(--primary) and var(--card-bg)." },
    { title: "Stage 3: Refactor Spacing System", desc: "Set up consistent spacing variables (--space-xs to --space-xl)." },
    { title: "Stage 4: Refactor Border Radius", desc: "Apply var(--radius) across cards, buttons, and form inputs." },
    { title: "Stage 5: Create Reusable Button Base & Modifier Classes", desc: "Build .btn base class with .btn-primary and .btn-secondary variations." },
    { title: "Stage 6: Build Reusable Card System", desc: "Define .card class with padding, background, border, and border-radius." },
    { title: "Stage 7: Modern Flexbox Navbar Layout", desc: "Use flexbox to align logo, navigation links, and call-to-action button." },
    { title: "Stage 8: Responsive CSS Grid Layout", desc: "Use repeat(auto-fit, minmax(260px, 1fr)) for seamless card grid." },
    { title: "Stage 9: Desktop Navbar Alignment", desc: "Ensure nav menu links are neatly aligned with gap." },
    { title: "Stage 10: Mobile Drawer Menu Styling", desc: "Style .nav-menu.active to drop down smoothly on mobile." },
    { title: "Stage 11: Sticky Navigation Bar", desc: "Apply position: sticky and top: 0 with backdrop blur." },
    { title: "Stage 12: Stacking Context & Z-Index", desc: "Set proper z-index values so navigation stays above page content." },
    { title: "Stage 13: Responsive Breakpoints & Media Queries", desc: "Hide desktop nav links below 768px screen width." },
    { title: "Stage 14: Responsive Typography & Line Width Control", desc: "Set comfortable font-size, line-height, and max-width on paragraphs." },
    { title: "Stage 15: Subtly Elevating Card Hover States", desc: "Add smooth transform translateY(-6px) and box-shadow on hover." },
    { title: "Stage 16: Mobile-First Viewport Audit", desc: "Verify touch target sizes (min 44px) and prevent horizontal overflow." }
  ];

  // 12. Predict Output & Debugging Lab State
  const [quizOutputAns1, setQuizOutputAns1] = useState(null);
  const [quizOutputAns2, setQuizOutputAns2] = useState(null);
  const [quizOutputAns3, setQuizOutputAns3] = useState(null);

  const [debugUserCode, setDebugUserCode] = useState(`/* BROKEN RESPONSIVE CODE - FIX THE BUGS */
.navbar {
  width: 1200px; /* BUG 1: Fixed width causes overflow */
  position: absolute; /* BUG 2: Should be sticky */
  z-index: -1; /* BUG 3: Hidden behind content */
}
.cards-grid {
  display: flex;
  width: 3000px; /* BUG 4: Fixed width breaks grid */
}
.card {
  border-radius: 35px; /* BUG 5: Inconsistent radius */
}
.btn {
  border-radius: 2px; /* BUG 6: Inconsistent radius */
  padding: 2px; /* BUG 7: Tiny touch target */
}`);
  const [debugHintShow, setDebugHintShow] = useState(false);
  const [debugSolShow, setDebugSolShow] = useState(false);

  // 13. AI Design & Responsive Audit State
  const [aiAuditInput, setAiAuditInput] = useState('');
  const [aiAuditResult, setAiAuditResult] = useState(null);
  const [aiAuditLoading, setAiAuditLoading] = useState(false);

  const handleRunAIAudit = () => {
    setAiAuditLoading(true);
    setTimeout(() => {
      setAiAuditResult({
        strengths: [
          "Consistent design tokens: CSS variables used cleanly for primary colors and spacing.",
          "Mobile-first navigation: Responsive hamburger menu transitions smoothly into vertical stack.",
          "Accessible contrast & touch targets: Buttons meet 44px minimum touch height guidelines."
        ],
        improvements: [
          "Card typography contrast could be increased slightly for secondary body text.",
          "Ensure grid gap shrinks gracefully from 24px to 16px on screens smaller than 480px.",
          "Add focus-visible outline indicators for keyboard Tab navigation."
        ],
        cssSuggestions: [
          `@media (max-width: 480px) { .grid { gap: var(--space-sm); } }`,
          `:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }`,
          `body { font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem); }`
        ]
      });
      setAiAuditLoading(false);
    }, 1200);
  };

  // 14. Assignment Before/After Version Compare & Reflection Questions
  const [versionTab, setVersionTab] = useState('day11'); // 'day10' | 'day11'
  const [assignQ1, setAssignQ1] = useState('');
  const [assignQ2, setAssignQ2] = useState('');
  const [assignQ3, setAssignQ3] = useState('');
  const [assignQ4, setAssignQ4] = useState('');
  const [assignSubmitted, setAssignSubmitted] = useState(false);

  // 15. 18-Question Knowledge Check State
  const quizQuestions = [
    {
      q: "1. Why do we use CSS variables (:root) instead of hardcoding hex color values?",
      opts: [
        "Variables accelerate rendering speed in browsers by 50%",
        "Centralized design tokens allow global theme changes in one single place",
        "Variables prevent HTML elements from overflowing containers",
        "Variables make CSS files smaller in byte size"
      ],
      ans: 1
    },
    {
      q: "2. How do you declare a CSS variable in the global scope?",
      opts: [
        "$primary-color: #3b82f6;",
        ":root { --primary-color: #3b82f6; }",
        "var primary-color = #3b82f6;",
        "@define --primary-color #3b82f6;"
      ],
      ans: 1
    },
    {
      q: "3. Which function syntax retrieves a CSS variable's value?",
      opts: [
        "get(--primary)",
        "var(--primary)",
        "val(--primary)",
        "css(--primary)"
      ],
      ans: 1
    },
    {
      q: "4. What does justify-content control in a Flexbox container?",
      opts: [
        "Alignment of items along the cross-axis",
        "Alignment of items along the main-axis",
        "The stacking order (z-index) of flex children",
        "The border radius of flex children"
      ],
      ans: 1
    },
    {
      q: "5. What property aligns items perpendicular to the main axis in Flexbox?",
      opts: [
        "align-items",
        "justify-items",
        "align-content",
        "flex-direction"
      ],
      ans: 0
    },
    {
      q: "6. What is the effect of flex-wrap: wrap;?",
      opts: [
        "Flex items are forced onto a single line regardless of width",
        "Flex items wrap onto additional rows when container space runs out",
        "Flex items rotate 90 degrees on mobile viewports",
        "Flex items disappear when screen size shrinks below 600px"
      ],
      ans: 1
    },
    {
      q: "7. What does grid-template-columns: repeat(3, 1fr); create?",
      opts: [
        "Three rows of 100px each",
        "Three columns of equal fractional width",
        "One column repeated three times stacked vertically",
        "A grid with 3% padding around items"
      ],
      ans: 1
    },
    {
      q: "8. What does the 1fr unit represent in CSS Grid?",
      opts: [
        "1 fixed pixel ratio",
        "1 fraction of the available free space in the grid container",
        "1 frame per second animation speed",
        "100% of the viewport width"
      ],
      ans: 1
    },
    {
      q: "9. How does grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); enhance responsiveness?",
      opts: [
        "It generates 250 media queries automatically",
        "It automatically adjusts the column count based on available space without manual media queries",
        "It fixes column width to 250px on all screen sizes",
        "It forces all cards to display in a single vertical column"
      ],
      ans: 1
    },
    {
      q: "10. What is the difference between auto-fit and auto-fill in CSS Grid?",
      opts: [
        "auto-fit stretches filled columns to occupy empty space; auto-fill maintains empty column tracks",
        "auto-fit works only on mobile; auto-fill works only on desktop",
        "auto-fit requires JavaScript; auto-fill is pure CSS",
        "There is no functional difference between them"
      ],
      ans: 0
    },
    {
      q: "11. What is a CSS Media Query used for?",
      opts: [
        "Querying a SQL database from CSS",
        "Applying styles conditionally based on viewport width, height, or screen resolution",
        "Playing audio and video files inside CSS",
        "Validating user input in form fields"
      ],
      ans: 1
    },
    {
      q: "12. Why should developers test designs across multiple viewport breakpoints?",
      opts: [
        "Browsers require test logs to render pages",
        "To identify layout overflow, unreadable text, and broken alignment before users visit",
        "To convert CSS code into JavaScript",
        "To increase SEO keyword rankings"
      ],
      ans: 1
    },
    {
      q: "13. What behavior does position: sticky; top: 0; produce?",
      opts: [
        "Element is permanently fixed to top of screen and covers all content",
        "Element scrolls normally until reaching 0px from top, then pins in place as user continues scrolling",
        "Element hides when scrolling past the hero section",
        "Element centers itself vertically on the screen"
      ],
      ans: 1
    },
    {
      q: "14. What does the z-index property control?",
      opts: [
        "Horizontal positioning left and right",
        "Vertical position top and bottom",
        "The stacking order of positioned overlapping elements along the z-axis",
        "The zoom level of images on hover"
      ],
      ans: 2
    },
    {
      q: "15. When does the :hover pseudo-class apply styles to an element?",
      opts: [
        "When the user clicks and releases a button",
        "When the mouse pointer hovers over the element",
        "When the page first finishes loading",
        "When the element is focused via the Tab key"
      ],
      ans: 1
    },
    {
      q: "16. Why is the :focus-visible state vital for Web Accessibility (a11y)?",
      opts: [
        "It changes font styles for screen readers",
        "It provides a clear visual highlight for keyboard users navigating with the Tab key",
        "It automatically translates text into foreign languages",
        "It increases color contrast automatically"
      ],
      ans: 1
    },
    {
      q: "17. What does element.classList.toggle('active') do in JavaScript?",
      opts: [
        "Permanently deletes the class 'active'",
        "Adds 'active' if not present; removes 'active' if already present",
        "Creates a new HTML element called active",
        "Changes element background color to green"
      ],
      ans: 1
    },
    {
      q: "18. Why should mobile navigation buttons have a minimum touch target size of 44x44 pixels?",
      opts: [
        "To make CSS grid calculation easier",
        "To ensure comfortable, accurate tapping for human finger thumbs without accidental clicks",
        "Because 44 is a prime number in CSS standards",
        "To make buttons load faster on mobile networks"
      ],
      ans: 1
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState(Array(18).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuizOption = (qIdx, oIdx) => {
    if (quizSubmitted) return;
    const newAns = [...quizAnswers];
    newAns[qIdx] = oIdx;
    setQuizAnswers(newAns);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.ans) score++;
    });
    return score;
  };

  // ==========================================
  // RENDER TABS
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Top Banner Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
                DAY 11 / 20 • 55% COMPLETE
              </span>
              <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-purple-500/30">
                ADVANCED UI & CSS PHASE
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={24} />
              Advanced CSS: Modern Layouts, Responsive Navbar & UI Components
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAITutor && openAITutor("Help me understand Advanced CSS design systems and responsive layouts!")}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg transition-all"
            >
              <Sparkles size={16} />
              Ask AI Tutor
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-3 mb-8 no-scrollbar scroll-smooth">
          {[
            { id: 'intro', label: '1. Objective & Before/After', icon: BookOpen },
            { id: 'variables', label: '2. Design System & Variables', icon: Sliders },
            { id: 'flexbox', label: '3. Advanced Flexbox & Navbar', icon: LayoutGrid },
            { id: 'mobile_nav', label: '4. Responsive Nav & JS Toggle', icon: Smartphone },
            { id: 'grid_lab', label: '5. Grid, Auto-Fit & MinMax', icon: Layout },
            { id: 'positioning', label: '6. Sticky & Z-Index Stack', icon: Layers },
            { id: 'ui_system', label: '7. Cards, Buttons & Typography', icon: PenTool },
            { id: 'testing_lab', label: '8. Responsive Testing Lab', icon: MonitorPlay },
            { id: 'guided_build', label: '9. Build-With-Me (16 Stages)', icon: Code },
            { id: 'challenges', label: '10. Predict & Debugging Lab', icon: Terminal },
            { id: 'ai_audit', label: '11. AI Design & Mobile Audit', icon: Sparkles },
            { id: 'assignment', label: '12. Day 11 Assignment', icon: Briefcase },
            { id: 'quiz', label: '13. Knowledge Check (18 Qs)', icon: CheckCircle }
          ].map((t) => {
            const IconComp = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <IconComp size={15} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: INTRO & BEFORE/AFTER */}
        {activeTab === 'intro' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Learning Objective Card */}
            <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Award className="text-indigo-400" size={28} />
                Day 11 Learning Objective: Advanced CSS for Professional Websites
              </h2>
              <p className="text-slate-300 mt-3 leading-relaxed max-w-3xl">
                Today, you step up from basic webpage construction into crafting <strong>professional design systems</strong> and <strong>production-ready responsive component systems</strong>. You will learn to eliminate CSS duplication, control exact layout positioning, build accessible mobile navigation, and master grid fluidity.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {[
                  "CSS Variables (:root)",
                  "Advanced Flexbox & Gap",
                  "Advanced CSS Grid & repeat()",
                  "auto-fit & minmax()",
                  "Responsive Breakpoints",
                  "Mobile Hamburger Drawer",
                  "Sticky Navigation & z-index",
                  "Card & Button Component Systems",
                  "Hover & Focus States",
                  "Responsive Typography",
                  "Consistent Spacing Systems",
                  "Mobile-First Testing"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg text-xs font-medium text-indigo-300">
                    <CheckCircle size={14} className="text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After Interactive Showcase */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Eye className="text-cyan-400" size={22} />
                    Transforming a Website: BEFORE vs AFTER
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Compare the basic unrefined layout with today's Advanced CSS refactored version.
                  </p>
                </div>
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setViewBeforeAfter('before')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewBeforeAfter === 'before'
                        ? 'bg-rose-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    BEFORE (Basic)
                  </button>
                  <button
                    onClick={() => setViewBeforeAfter('after')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewBeforeAfter === 'after'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    AFTER (Professional)
                  </button>
                </div>
              </div>

              {/* Showcase Display Container */}
              {viewBeforeAfter === 'before' ? (
                <div className="border-2 border-dashed border-rose-500/40 rounded-xl p-6 bg-slate-950 space-y-6">
                  <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded">
                    <span className="font-bold text-rose-400">LOGO (Basic Navbar)</span>
                    <div className="flex gap-4 text-xs text-slate-400">
                      <span>Home</span>
                      <span>About</span>
                      <span>Services</span>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 text-xs">CTA</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-800">
                      <h4 className="font-bold text-slate-300">Basic Card 1</h4>
                      <p className="text-xs text-slate-500 mt-2">Fixed spacing, no hover, hardcoded colors.</p>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800">
                      <h4 className="font-bold text-slate-300">Basic Card 2</h4>
                      <p className="text-xs text-slate-500 mt-2">No mobile menu, duplicated CSS rules.</p>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800">
                      <h4 className="font-bold text-slate-300">Basic Card 3</h4>
                      <p className="text-xs text-slate-500 mt-2">No variables, non-responsive desktop layout.</p>
                    </div>
                  </div>
                  <div className="bg-rose-950/40 border border-rose-900/60 p-3 rounded text-xs text-rose-300">
                    ⚠️ <strong>Issues:</strong> Fixed widths, duplicated CSS declarations, missing mobile navigation drawer, inconsistent border-radii, and poor hover feedback.
                  </div>
                </div>
              ) : (
                <div className="border border-emerald-500/40 rounded-xl p-6 bg-slate-950 space-y-6 shadow-2xl">
                  {/* Sticky Navbar Mock */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl sticky top-0 shadow-lg">
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                      PRO LOGO
                    </span>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
                      <span className="hover:text-indigo-400 transition cursor-pointer">Home</span>
                      <span className="hover:text-indigo-400 transition cursor-pointer">About</span>
                      <span className="hover:text-indigo-400 transition cursor-pointer">Services</span>
                      <span className="hover:text-indigo-400 transition cursor-pointer">Contact</span>
                    </div>
                    <button className="hidden md:block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-1.5 rounded-lg shadow-md hover:brightness-110 transition">
                      Get Started
                    </button>
                    <button className="md:hidden text-slate-300 bg-slate-800 p-2 rounded-lg">
                      <Menu size={18} />
                    </button>
                  </div>

                  {/* Responsive Grid Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 p-5 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-indigo-500/10 transition-all group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
                          0{num}
                        </div>
                        <h4 className="font-bold text-white text-base">Modern Card Component #{num}</h4>
                        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          Styled using CSS variables, fluid flexbox grid layout, and polished hover elevation.
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-900/60 p-3 rounded-lg text-xs text-emerald-300">
                    ✨ <strong>Upgrades Applied:</strong> Centralized CSS design system, sticky navbar with z-index, auto-fit grid layout, reusable button components, and micro-hover transitions.
                  </div>
                </div>
              )}

              {/* Reflection Question */}
              <div className="mt-6 bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                    <HelpCircle size={18} />
                    Key Question: "Did we change the HTML structure completely?"
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    <strong>Answer: No!</strong> A major part of professional frontend development is refactoring an existing HTML structure using CSS design tokens, modern positioning, and flex/grid systems.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('variables')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap shadow-md"
                >
                  Continue to CSS Design System
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CSS DESIGN SYSTEM & VARIABLES */}
        {activeTab === 'variables' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Concept */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sliders className="text-indigo-400" size={24} />
                Building a CSS Design System with CSS Variables (:root)
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                A professional website should never randomly use 17 different color hex codes, 12 button radius variations, or arbitrary margin values. Instead, we define <strong>reusable design tokens</strong> in the <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">:root</code> pseudo-class.
              </p>

              <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                <pre>{`:root {
  --primary: #3b82f6;
  --text-main: #f8fafc;
  --bg-dark: #0f172a;
  --border-radius: 12px;
  --section-spacing: 24px;
}`}</pre>
              </div>
            </div>

            {/* Interactive CSS Variable Visualizer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <SlidersHorizontal className="text-cyan-400" size={20} />
                Interactive CSS Variable Visualizer Control Panel
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Control Panel Sliders */}
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                    Live Design Token Controls
                  </h4>

                  {/* Primary Color Picker */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex justify-between">
                      <span>Primary Accent Color (--primary)</span>
                      <span className="font-mono text-cyan-400">{varPrimary}</span>
                    </label>
                    <div className="flex items-center gap-3 mt-1.5">
                      <input
                        type="color"
                        value={varPrimary}
                        onChange={(e) => setVarPrimary(e.target.value)}
                        className="w-10 h-9 rounded cursor-pointer bg-slate-900 border border-slate-700"
                      />
                      <input
                        type="text"
                        value={varPrimary}
                        onChange={(e) => setVarPrimary(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-xs font-mono text-white rounded px-3 py-2 flex-1"
                      />
                    </div>
                  </div>

                  {/* Text Color Picker */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex justify-between">
                      <span>Text Color (--text-main)</span>
                      <span className="font-mono text-cyan-400">{varText}</span>
                    </label>
                    <div className="flex items-center gap-3 mt-1.5">
                      <input
                        type="color"
                        value={varText}
                        onChange={(e) => setVarText(e.target.value)}
                        className="w-10 h-9 rounded cursor-pointer bg-slate-900 border border-slate-700"
                      />
                      <input
                        type="text"
                        value={varText}
                        onChange={(e) => setVarText(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-xs font-mono text-white rounded px-3 py-2 flex-1"
                      />
                    </div>
                  </div>

                  {/* Border Radius Slider */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex justify-between">
                      <span>Border Radius (--radius)</span>
                      <span className="font-mono text-cyan-400">{varRadius}px</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="32"
                      value={varRadius}
                      onChange={(e) => setVarRadius(Number(e.target.value))}
                      className="w-full mt-2 accent-indigo-500"
                    />
                  </div>

                  {/* Section Spacing Slider */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex justify-between">
                      <span>Card Padding (--spacing)</span>
                      <span className="font-mono text-cyan-400">{varSpacing}px</span>
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="48"
                      value={varSpacing}
                      onChange={(e) => setVarSpacing(Number(e.target.value))}
                      className="w-full mt-2 accent-indigo-500"
                    />
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
                      Live Component Preview (Controlled via CSS Variables)
                    </span>

                    <div
                      style={{
                        backgroundColor: varBg,
                        color: varText,
                        borderRadius: `${varRadius}px`,
                        padding: `${varSpacing}px`,
                        border: `2px solid ${varPrimary}40`
                      }}
                      className="transition-all shadow-xl space-y-4"
                    >
                      <h4 className="font-bold text-lg" style={{ color: varText }}>
                        Component Powered by Variables
                      </h4>
                      <p className="text-xs leading-relaxed opacity-90">
                        Changing a single variable automatically cascades across all cards, buttons, badges, and form elements simultaneously!
                      </p>
                      <div className="flex gap-3 pt-2">
                        <button
                          style={{
                            backgroundColor: varPrimary,
                            borderRadius: `${varRadius}px`,
                            padding: '8px 16px',
                            color: '#ffffff'
                          }}
                          className="text-xs font-bold shadow transition"
                        >
                          Primary Action
                        </button>
                        <button
                          style={{
                            border: `1px solid ${varPrimary}`,
                            color: varPrimary,
                            borderRadius: `${varRadius}px`,
                            padding: '8px 16px'
                          }}
                          className="text-xs font-bold transition bg-transparent"
                        >
                          Secondary Action
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
                    <span className="text-cyan-400 font-bold">Generated CSS:</span>
                    <pre className="mt-1 text-[11px] text-slate-300">
                      {`.card { border-radius: var(--radius); padding: var(--spacing); }\n.btn-primary { background: var(--primary); border-radius: var(--radius); }`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS Variable Challenge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="text-amber-400" size={22} />
                  CSS Variable Refactoring Challenge
                </h3>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                  Interactive Exercise
                </span>
              </div>
              <p className="text-slate-300 text-sm">
                <strong>Task:</strong> Examine the broken CSS below with inconsistent <code className="text-cyan-400">border-radius</code> values (16px, 4px, 24px). Refactor it by creating a single global <code className="text-cyan-400">--border-radius</code> variable.
              </p>

              <LiveSyntaxCodeEditor
                value={userRadiusVar}
                onChange={setUserRadiusVar}
                language="css"
                rows={10}
                label="Refactor Broken CSS to Use Variables"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setChallengeHintShow(!challengeHintShow)}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold px-4 py-2 rounded-lg border border-amber-500/30 flex items-center gap-1.5 transition"
                >
                  <HelpCircle size={14} />
                  {challengeHintShow ? 'Hide Hint' : 'Show Hint'}
                </button>
                <button
                  onClick={() => setChallengeSolShow(!challengeSolShow)}
                  className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-xs font-semibold px-4 py-2 rounded-lg border border-indigo-500/40 flex items-center gap-1.5 transition"
                >
                  <Eye size={14} />
                  {challengeSolShow ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>

              {challengeHintShow && (
                <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 leading-relaxed animate-fadeIn">
                  💡 <strong>Hint:</strong> Add <code className="bg-amber-900/60 px-1 py-0.5 rounded">:root &#123; --border-radius: 12px; &#125;</code> at the top, then replace <code className="bg-amber-900/60 px-1 py-0.5 rounded">16px</code>, <code className="bg-amber-900/60 px-1 py-0.5 rounded">4px</code>, and <code className="bg-amber-900/60 px-1 py-0.5 rounded">24px</code> with <code className="bg-amber-900/60 px-1 py-0.5 rounded">var(--border-radius)</code>.
                </div>
              )}

              {challengeSolShow && (
                <div className="p-4 bg-slate-950 border border-indigo-500/50 rounded-xl text-xs font-mono text-slate-200 animate-fadeIn space-y-2">
                  <span className="text-emerald-400 font-bold font-sans">Solution Code:</span>
                  <pre className="text-slate-300">{`:root {
  --border-radius: 12px;
}

.card {
  border-radius: var(--border-radius);
  background: #1e293b;
  padding: 16px;
}

.button {
  border-radius: var(--border-radius);
  background: #3b82f6;
}

.input {
  border-radius: var(--border-radius);
  padding: 8px;
}`}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ADVANCED FLEXBOX */}
        {activeTab === 'flexbox' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutGrid className="text-indigo-400" size={24} />
                Advanced Flexbox & Real Website Navbar Layouts
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Flexbox is designed for 1-dimensional layouts (rows or columns). Master key properties like <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">justify-content</code>, <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">align-items</code>, <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">flex-direction</code>, and <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">gap</code>.
              </p>
            </div>

            {/* Flexbox Playground Visualizer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="text-cyan-400" size={20} />
                Interactive Flexbox Visualizer Playground
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                {/* justify-content */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">justify-content</label>
                  <select
                    value={flexJustify}
                    onChange={(e) => setFlexJustify(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                    <option value="space-evenly">space-evenly</option>
                  </select>
                </div>

                {/* align-items */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">align-items</label>
                  <select
                    value={flexAlign}
                    onChange={(e) => setFlexAlign(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="stretch">stretch</option>
                  </select>
                </div>

                {/* flex-direction */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">flex-direction</label>
                  <select
                    value={flexDirection}
                    onChange={(e) => setFlexDirection(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="row">row</option>
                    <option value="column">column</option>
                  </select>
                </div>

                {/* flex-wrap */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">flex-wrap</label>
                  <select
                    value={flexWrap}
                    onChange={(e) => setFlexWrap(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="nowrap">nowrap</option>
                    <option value="wrap">wrap</option>
                  </select>
                </div>

                {/* gap */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">gap ({flexGap}px)</label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={flexGap}
                    onChange={(e) => setFlexGap(Number(e.target.value))}
                    className="w-full mt-2 accent-indigo-500"
                  />
                </div>
              </div>

              {/* Flex Container Output Box */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-[220px]">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: flexJustify,
                    alignItems: flexAlign,
                    flexDirection: flexDirection,
                    flexWrap: flexWrap,
                    gap: `${flexGap}px`
                  }}
                  className="w-full min-h-[160px] bg-slate-900/60 p-4 rounded-lg border border-dashed border-indigo-500/40 transition-all"
                >
                  <div className="bg-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-lg shadow-md">BOX 1</div>
                  <div className="bg-purple-600 text-white font-bold text-xs px-6 py-4 rounded-lg shadow-md">BOX 2 (Taller)</div>
                  <div className="bg-cyan-600 text-white font-bold text-xs px-4 py-3 rounded-lg shadow-md">BOX 3</div>
                </div>
              </div>

              {/* Real Website Example — Navbar Flexbox */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-indigo-300">Real Navbar Flexbox Example:</h4>
                <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <div className="font-extrabold text-indigo-400 text-sm">BRAND LOGO</div>
                  <div className="flex items-center gap-4 text-xs text-slate-300 font-medium">
                    <span>Features</span>
                    <span>Pricing</span>
                    <span>Docs</span>
                  </div>
                  <button className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md font-semibold">
                    Sign In
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-cyan-300 bg-slate-900 p-3 rounded border border-slate-800">
                  {`.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RESPONSIVE NAVBAR & MOBILE MENU JS */}
        {activeTab === 'mobile_nav' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Smartphone className="text-indigo-400" size={24} />
                Responsive Navigation & Mobile Hamburger Menu with JavaScript
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                On desktop viewports, links spread out horizontally. On mobile viewports, space is limited—so we hide links and display a <strong>hamburger button (☰)</strong>. When tapped, JavaScript toggles the <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">.active</code> class using <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">classList.toggle()</code>.
              </p>
            </div>

            {/* Interactive Mobile Menu Visualizer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Live Mobile Menu Interaction Visualizer</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Toggle the hamburger menu state below to see JS state changes.</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  Simulate Tap (State: {mobileMenuOpen ? 'OPEN' : 'CLOSED'})
                </button>
              </div>

              {/* Mobile Phone Screen Frame Simulation */}
              <div className="max-w-sm mx-auto bg-slate-950 border-4 border-slate-800 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 px-2 pb-2 border-b border-slate-900">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="w-3 h-2 bg-slate-500 rounded-xs"></span>
                  </div>
                </div>

                {/* Mobile Header Bar */}
                <div className="flex items-center justify-between py-3 border-b border-slate-800">
                  <span className="font-extrabold text-indigo-400 text-sm">TechCorp</span>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 focus:ring-2 focus:ring-indigo-500"
                  >
                    {mobileMenuOpen ? <X size={20} className="text-rose-400" /> : <Menu size={20} />}
                  </button>
                </div>

                {/* Collapsible Mobile Drawer Links */}
                {mobileMenuOpen ? (
                  <div className="py-4 space-y-3 animate-fadeIn bg-slate-900/90 rounded-xl p-4 mt-2 border border-slate-800">
                    <a href="#home" onClick={(e)=>e.preventDefault()} className="block text-sm font-semibold text-indigo-300 hover:text-white border-b border-slate-800/60 pb-2">Home</a>
                    <a href="#about" onClick={(e)=>e.preventDefault()} className="block text-sm font-semibold text-slate-300 hover:text-white border-b border-slate-800/60 pb-2">About</a>
                    <a href="#services" onClick={(e)=>e.preventDefault()} className="block text-sm font-semibold text-slate-300 hover:text-white border-b border-slate-800/60 pb-2">Services</a>
                    <a href="#projects" onClick={(e)=>e.preventDefault()} className="block text-sm font-semibold text-slate-300 hover:text-white border-b border-slate-800/60 pb-2">Projects</a>
                    <a href="#contact" onClick={(e)=>e.preventDefault()} className="block text-sm font-semibold text-slate-300 hover:text-white pb-2">Contact</a>
                    <button className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-lg shadow mt-2">
                      Get Started
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    📱 Mobile Navigation Drawer is currently <strong>CLOSED</strong>. Click the hamburger icon above to open!
                  </div>
                )}
              </div>

              {/* JS Code Pattern explanation */}
              <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                <span className="text-slate-400 font-sans font-bold block mb-1">JavaScript State Pattern:</span>
                <pre>{`const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ADVANCED GRID, AUTO-FIT & MINMAX */}
        {activeTab === 'grid_lab' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layout className="text-indigo-400" size={24} />
                Advanced CSS Grid: repeat(), auto-fit & minmax()
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Rather than writing dozens of manual column definitions, CSS Grid provides powerful functions like <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">repeat(3, 1fr)</code> and responsive algorithms like <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">repeat(auto-fit, minmax(220px, 1fr))</code>.
              </p>
            </div>

            {/* Grid Visualizer Playground */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white">Interactive CSS Grid Playground</h3>

              <div className="flex flex-wrap gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Columns: repeat({gridCols}, 1fr)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setGridCols(n)}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          gridCols === n ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {n} Col{n > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Grid Gap ({gridGap}px)</label>
                  <input
                    type="range"
                    min="8"
                    max="40"
                    value={gridGap}
                    onChange={(e) => setGridGap(Number(e.target.value))}
                    className="accent-indigo-500 mt-1"
                  />
                </div>
              </div>

              {/* Grid Output */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    gap: `${gridGap}px`
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-slate-900 border border-indigo-500/30 p-4 rounded-xl text-center shadow">
                      <span className="text-indigo-400 font-bold text-sm">CARD 0{i}</span>
                      <p className="text-[11px] text-slate-400 mt-1">1fr track width</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MinMax Auto-Fit Visualizer */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-indigo-300">
                    MinMax Auto-Fit Visualizer Slider (Min Card Width: {minWidthSlider}px)
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    repeat(auto-fit, minmax({minWidthSlider}px, 1fr))
                  </span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="380"
                  value={minWidthSlider}
                  onChange={(e) => setMinWidthSlider(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidthSlider}px, 1fr))`,
                    gap: '16px'
                  }}
                  className="pt-2"
                >
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-indigo-950/40 border border-indigo-500/40 p-4 rounded-xl text-xs text-indigo-200">
                      <strong>Auto-Fit Responsive Card #{num}</strong>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Automatically reflows into 3, 2, or 1 column without manual media queries!
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: POSITIONING & STICKY Z-INDEX */}
        {activeTab === 'positioning' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="text-indigo-400" size={24} />
                Sticky Positioning & Stacking Context (z-index)
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Sticky navigation keeps headers visible while scrolling long documents. When elements overlap, <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">z-index</code> governs which element stays on top.
              </p>
            </div>

            {/* Sticky Demo Area */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Live Sticky Navigation Scroll Area</h3>
                <button
                  onClick={() => setIsStickyOn(!isStickyOn)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition shadow ${
                    isStickyOn ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  Sticky Navbar: {isStickyOn ? 'ENABLED (sticky)' : 'DISABLED (static)'}
                </button>
              </div>

              {/* Scroll Container */}
              <div className="h-64 overflow-y-auto bg-slate-950 border border-slate-800 rounded-xl p-4 relative space-y-6">
                <div
                  style={{
                    position: isStickyOn ? 'sticky' : 'static',
                    top: 0,
                    zIndex: zIndexNav
                  }}
                  className="bg-indigo-600 text-white p-3 rounded-lg font-bold text-xs flex justify-between items-center shadow-lg border border-indigo-400/40"
                >
                  <span>STICKY NAVBAR (z-index: {zIndexNav})</span>
                  <span className="text-[10px] bg-indigo-800 px-2 py-0.5 rounded">Top: 0px</span>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                    📜 Scroll content paragraph 1... Notice how the navbar above locks in place when sticky mode is enabled!
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                    📜 Scroll content paragraph 2... Sticky positioning prevents navigation from getting lost on long landing pages.
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                    📜 Scroll content paragraph 3... End of demo scroll container.
                  </div>
                </div>
              </div>

              {/* Z-Index Stacking Layer Controls */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-indigo-300">Stacking Order (z-index) Interactive Layer Visualizer</h4>
                <div className="flex items-center gap-4">
                  <label className="text-xs text-slate-300">Navbar z-index value:</label>
                  <input
                    type="number"
                    value={zIndexNav}
                    onChange={(e) => setZIndexNav(Number(e.target.value))}
                    className="w-24 bg-slate-900 border border-slate-800 text-xs text-white px-3 py-1.5 rounded font-mono"
                  />
                </div>
                <div className="relative h-32 bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-hidden">
                  <div className="absolute inset-x-4 top-4 bg-slate-800 text-slate-400 p-2 rounded text-xs font-mono" style={{ zIndex: 10 }}>
                    Content Layer (z-index: 10)
                  </div>
                  <div className="absolute inset-x-8 top-10 bg-indigo-600 text-white p-2 rounded text-xs font-mono shadow-xl" style={{ zIndex: zIndexNav }}>
                    Navbar Layer (z-index: {zIndexNav})
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CARDS, BUTTONS & TYPOGRAPHY */}
        {activeTab === 'ui_system' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PenTool className="text-indigo-400" size={24} />
                Modern UI Components: Reusable Card & Button Systems
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Rather than inventing new CSS for every element, build base classes like <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">.btn</code> and <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">.card</code>, then extend them with modifier classes.
              </p>
            </div>

            {/* Button State Visualizer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white">Button State Visualizer (Normal, Hover, Focus, Active, Disabled)</h3>

              <div className="flex flex-wrap gap-2">
                {['normal', 'hover', 'focus', 'active', 'disabled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedBtnState(st)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition ${
                      selectedBtnState === st
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    State: {st}
                  </button>
                ))}
              </div>

              {/* Simulated Button Box */}
              <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 flex items-center justify-center min-h-[140px]">
                <button
                  disabled={selectedBtnState === 'disabled'}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    selectedBtnState === 'normal'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : selectedBtnState === 'hover'
                      ? 'bg-indigo-500 text-white -translate-y-1 shadow-indigo-500/40 shadow-xl'
                      : selectedBtnState === 'focus'
                      ? 'bg-indigo-600 text-white ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-950 outline-none'
                      : selectedBtnState === 'active'
                      ? 'bg-indigo-700 text-white translate-y-0.5 shadow-sm'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  .btn .btn-primary ({selectedBtnState})
                </button>
              </div>

              {/* Text Width Control & Spacing Tokens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-indigo-300">Paragraph Line Width Control (max-width: 65ch)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-[65ch] bg-slate-900 p-3 rounded border border-slate-800">
                    Lines that span too wide across monitor screens cause eye fatigue. Setting <code className="text-cyan-400 font-mono">max-width: 65ch</code> ensures comfortable, professional readability.
                  </p>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-indigo-300">Consistent Spacing Scale Variables</h4>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300">--space-xs: 4px</span>
                    <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300">--space-sm: 8px</span>
                    <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300">--space-md: 16px</span>
                    <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300">--space-lg: 24px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: RESPONSIVE TESTING LAB */}
        {activeTab === 'testing_lab' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MonitorPlay className="text-indigo-400" size={24} />
                Responsive Viewport Testing Lab & Mobile-First Audit
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Test how components adapt dynamically across Desktop (1024px+), Tablet (768px), and Mobile (375px) viewports.
              </p>
            </div>

            {/* Viewport Control Buttons */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Select Test Viewport</h3>
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      viewportMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor size={16} /> Desktop (1200px)
                  </button>
                  <button
                    onClick={() => setViewportMode('tablet')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      viewportMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <TabletIcon size={16} /> Tablet (768px)
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      viewportMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MobileIcon size={16} /> Mobile (375px)
                  </button>
                </div>
              </div>

              {/* Viewport Simulator Frame */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex justify-center">
                <div
                  style={{
                    width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                    transition: 'width 0.4s ease'
                  }}
                  className="bg-slate-900 border-2 border-indigo-500/40 rounded-xl p-5 space-y-6 shadow-2xl overflow-hidden"
                >
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="font-bold text-indigo-400 text-sm">Mini Project Navigation</span>
                    {viewportMode === 'mobile' ? (
                      <Menu size={20} className="text-slate-300" />
                    ) : (
                      <div className="flex gap-4 text-xs text-slate-300">
                        <span>Home</span>
                        <span>Services</span>
                        <span>Projects</span>
                        <span>Contact</span>
                      </div>
                    )}
                  </div>

                  <div className={`grid gap-4 ${
                    viewportMode === 'desktop' ? 'grid-cols-3' : viewportMode === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'
                  }`}>
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-slate-950 border border-slate-800 p-4 rounded-lg text-xs">
                        <span className="font-bold text-white block">Service Card #{item}</span>
                        <p className="text-slate-400 text-[11px] mt-1">Adapts layout effortlessly across viewports!</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: BUILD-WITH-ME MODE (16 STAGES) */}
        {activeTab === 'guided_build' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Code className="text-indigo-400" size={24} />
                    Build-With-Me Mode: Advanced CSS Upgrade (16 Stages)
                  </h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Follow step-by-step instructions to refactor Mini Project 1 into a polished design system.
                  </p>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-indigo-300">
                  Progress: Stage {currentStage + 1} / 16
                </div>
              </div>
            </div>

            {/* Current Stage Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {stagesData[currentStage].title}
                  </span>
                  <p className="text-slate-300 text-sm mt-1">{stagesData[currentStage].desc}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={currentStage === 0}
                    onClick={() => setCurrentStage(prev => Math.max(0, prev - 1))}
                    className="bg-slate-950 text-slate-300 hover:bg-slate-800 disabled:opacity-50 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentStage === 15}
                    onClick={() => setCurrentStage(prev => Math.min(15, prev + 1))}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 text-xs font-bold px-4 py-1.5 rounded-lg shadow"
                  >
                    Next Stage
                  </button>
                </div>
              </div>

              {/* Code Editor for Stage */}
              <LiveSyntaxCodeEditor
                value={stageUserCodes[currentStage]}
                onChange={(val) => {
                  const updated = [...stageUserCodes];
                  updated[currentStage] = val;
                  setStageUserCodes(updated);
                }}
                language="css"
                rows={10}
                label={`Stage ${currentStage + 1} Editor`}
              />

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const h = [...stageHints];
                    h[currentStage] = !h[currentStage];
                    setStageHints(h);
                  }}
                  className="bg-slate-800 text-amber-300 text-xs font-semibold px-4 py-2 rounded-lg border border-amber-500/30 flex items-center gap-1.5"
                >
                  <HelpCircle size={14} />
                  {stageHints[currentStage] ? 'Hide Hint' : 'Show Hint'}
                </button>
                <button
                  onClick={() => {
                    const s = [...stageSols];
                    s[currentStage] = !s[currentStage];
                    setStageSols(s);
                  }}
                  className="bg-indigo-600/30 text-indigo-200 text-xs font-semibold px-4 py-2 rounded-lg border border-indigo-500/40 flex items-center gap-1.5"
                >
                  <Eye size={14} />
                  {stageSols[currentStage] ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>

              {stageHints[currentStage] && (
                <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 animate-fadeIn">
                  💡 <strong>Stage {currentStage + 1} Hint:</strong> Double check your selector names and syntax before advancing.
                </div>
              )}

              {stageSols[currentStage] && (
                <div className="p-4 bg-slate-950 border border-indigo-500/40 rounded-xl text-xs font-mono text-cyan-300 animate-fadeIn">
                  <strong>Solution Reference:</strong>
                  <pre className="mt-2 text-slate-300">{stageUserCodes[currentStage]}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 10: PREDICT OUTPUT & DEBUGGING LAB */}
        {activeTab === 'challenges' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="text-indigo-400" size={24} />
                Predict the Output & Responsive Debugging Lab
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                Test your understanding by predicting CSS behavior and fixing intentional layout bugs.
              </p>
            </div>

            {/* Predict Questions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white">Interactive Output Predictions</h3>

              <div className="space-y-4">
                {/* Q1 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-mono text-cyan-400">Code: grid-template-columns: repeat(3, 1fr);</span>
                  <p className="text-xs text-slate-200">What does this CSS rule produce?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['A. Three flexible equal-width columns', 'B. Three fixed 100px rows', 'C. Three separate buttons', 'D. Three media queries'].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setQuizOutputAns1(i)}
                        className={`p-2.5 rounded-lg text-xs text-left font-medium transition ${
                          quizOutputAns1 === i
                            ? i === 0 ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Debugging Challenge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="text-rose-400" size={20} />
                Challenge: "Make This Website Responsive"
              </h3>
              <p className="text-slate-300 text-sm">
                The code below has 7 intentional layout bugs (fixed 1200px width, negative z-index, tiny buttons). Fix them!
              </p>

              <LiveSyntaxCodeEditor
                value={debugUserCode}
                onChange={setDebugUserCode}
                language="css"
                rows={12}
                label="Fix Broken Responsive CSS"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setDebugHintShow(!debugHintShow)}
                  className="bg-slate-800 text-amber-300 text-xs font-semibold px-4 py-2 rounded-lg border border-amber-500/30"
                >
                  {debugHintShow ? 'Hide Hint' : 'Show Debug Hint'}
                </button>
                <button
                  onClick={() => setDebugSolShow(!debugSolShow)}
                  className="bg-indigo-600/30 text-indigo-200 text-xs font-semibold px-4 py-2 rounded-lg border border-indigo-500/40"
                >
                  {debugSolShow ? 'Hide Solution' : 'Show Fix Solution'}
                </button>
              </div>

              {debugHintShow && (
                <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                  💡 <strong>Hint:</strong> Replace fixed widths (<code className="bg-amber-900/60 px-1 py-0.5 rounded">1200px</code>, <code className="bg-amber-900/60 px-1 py-0.5 rounded">3000px</code>) with <code className="bg-amber-900/60 px-1 py-0.5 rounded">max-width: 100%</code> or CSS grid!
                </div>
              )}

              {debugSolShow && (
                <div className="p-4 bg-slate-950 border border-indigo-500/40 rounded-xl text-xs font-mono text-emerald-400">
                  <pre>{`.navbar {\n  width: 100%;\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}\n.card, .btn {\n  border-radius: var(--radius);\n  padding: 12px 20px;\n}`}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 11: AI DESIGN AUDIT */}
        {activeTab === 'ai_audit' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-indigo-400" size={24} />
                AI Design System & Responsive Mobile Audit
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                Submit your CSS code or project description to receive an automated AI evaluation covering design consistency, layout structure, and mobile usability.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <textarea
                value={aiAuditInput}
                onChange={(e) => setAiAuditInput(e.target.value)}
                placeholder="Paste your CSS variables, media queries, or navbar code here for AI Review..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[140px]"
              />

              <button
                onClick={handleRunAIAudit}
                disabled={aiAuditLoading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <Sparkles size={16} />
                {aiAuditLoading ? 'Analyzing Design Tokens & Responsive Rules...' : 'Run AI Design & Mobile Audit'}
              </button>

              {aiAuditResult && (
                <div className="space-y-6 animate-fadeIn pt-4 border-t border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-950/40 border border-emerald-900/60 p-4 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3 Strengths</h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        {aiAuditResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="bg-amber-950/40 border border-amber-900/60 p-4 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">3 Improvements</h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        {aiAuditResult.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                      </ul>
                    </div>
                    <div className="bg-indigo-950/40 border border-indigo-900/60 p-4 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">3 CSS Snippet Fixes</h4>
                      <div className="space-y-2">
                        {aiAuditResult.cssSuggestions.map((cs, i) => (
                          <pre key={i} className="text-[10px] font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-800">
                            {cs}
                          </pre>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 12: ASSIGNMENT & VERSION COMPARE */}
        {activeTab === 'assignment' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="text-indigo-400" size={24} />
                Day 11 Assignment: Professional CSS Upgrade
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                Upgrade your Day 10 Mini Project by implementing CSS variables, sticky responsive navigation, auto-fit grid, reusable UI component classes, and polished hover states.
              </p>
            </div>

            {/* Version Compare Area */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">Compare Project Version History</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setVersionTab('day10')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      versionTab === 'day10' ? 'bg-slate-800 text-rose-300 border border-rose-500/40' : 'text-slate-400'
                    }`}
                  >
                    Day 10 (Before Upgrade)
                  </button>
                  <button
                    onClick={() => setVersionTab('day11')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      versionTab === 'day11' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'
                    }`}
                  >
                    Day 11 (Upgraded Design System)
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-[160px]">
                {versionTab === 'day10' ? (
                  <div className="text-xs text-slate-400 space-y-2">
                    <span className="font-bold text-rose-400 block">Day 10 Initial Version:</span>
                    <p>Basic navbar, fixed spacing, repeated hex colors, static layout, no hamburger menu.</p>
                  </div>
                ) : (
                  <div className="text-xs text-indigo-300 space-y-2">
                    <span className="font-bold text-emerald-400 block">Day 11 Upgraded Version:</span>
                    <p>Centralized :root variables, sticky navbar, mobile drawer toggle, auto-fit minmax grid, hover elevation.</p>
                  </div>
                )}
              </div>

              {/* Reflection Questions */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white">Assignment Reflection Questions</h4>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">1. What major visual improvements did you make?</label>
                  <input
                    type="text"
                    value={assignQ1}
                    onChange={(e) => setAssignQ1(e.target.value)}
                    placeholder="e.g. Added CSS variables, sticky navbar, hover states..."
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">2. Which CSS concept helped your workflow the most?</label>
                  <input
                    type="text"
                    value={assignQ2}
                    onChange={(e) => setAssignQ2(e.target.value)}
                    placeholder="e.g. auto-fit minmax grid eliminated media query clutter..."
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">3. What was your biggest responsive challenge and how did you resolve it?</label>
                  <input
                    type="text"
                    value={assignQ3}
                    onChange={(e) => setAssignQ3(e.target.value)}
                    placeholder="e.g. Mobile menu drawer overlapping content, fixed via z-index..."
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5"
                  />
                </div>

                <button
                  onClick={() => setAssignSubmitted(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow"
                >
                  {assignSubmitted ? 'Assignment Submitted ✓' : 'Submit Day 11 Assignment'}
                </button>

                {assignSubmitted && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-xs text-emerald-300">
                    🎉 Assignment submitted successfully! Proceed to the Knowledge Check.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: KNOWLEDGE CHECK & DAY 11 COMPLETION */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="text-indigo-400" size={24} />
                Day 11 Knowledge Check (18 Interactive Questions)
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                Test your mastery of CSS Variables, Advanced Flexbox, Grid, Sticky Positioning, and Responsive Mobile UI.
              </p>
            </div>

            {/* Quiz Questions List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {quizQuestions.map((qItem, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-semibold text-white">{qItem.q}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {qItem.opts.map((opt, oIdx) => {
                      const isSelected = quizAnswers[qIdx] === oIdx;
                      const isCorrect = qItem.ans === oIdx;
                      let btnStyle = 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800';

                      if (quizSubmitted) {
                        if (isCorrect) btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';
                        else if (isSelected) btnStyle = 'bg-rose-600 text-white font-bold border-rose-500';
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600 text-white font-bold border-indigo-500';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                          className={`p-3 rounded-lg text-xs text-left transition border ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={quizSubmitted}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg disabled:opacity-50"
                >
                  Submit Knowledge Check Answers
                </button>

                {quizSubmitted && (
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">Your Score:</span>
                    <span className="text-xl font-extrabold text-indigo-400 ml-2">
                      {calculateScore()} / 18 ({Math.round((calculateScore() / 18) * 100)}%)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* DAY 11 COMPLETION CARD */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden space-y-6">
              <div className="inline-flex p-3 rounded-full bg-indigo-500/20 text-indigo-400 mb-2">
                <Trophy size={40} />
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                🎉 Advanced CSS Upgrade Completed!
              </h2>
              <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
                You have successfully transformed Mini Project 1 into a responsive, component-driven website powered by CSS Variables, Flexbox, Grid, and JavaScript Mobile Navigation!
              </p>

              {/* Course Progress Summary */}
              <div className="max-w-xl mx-auto bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                  <span>AI-Powered Web Design Progress</span>
                  <span className="text-indigo-400">DAY 11 / 20 • 55%</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              {/* Next Up Preview */}
              <div className="p-4 bg-indigo-950/50 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 max-w-xl mx-auto">
                👉 <strong>Up Next in Day 12:</strong> JavaScript for Real Website Interactions (DOM manipulation, Event Listeners, Accordions, Tabs & Dynamic Modals!)
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WebDesignDay11;
