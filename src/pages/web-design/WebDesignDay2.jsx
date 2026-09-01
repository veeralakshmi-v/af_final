import React, { useState, useEffect } from 'react';
import { 
  BookOpen, MonitorPlay, LayoutGrid, Layers, Code, PenTool,
  Briefcase, Sparkles, CheckCircle, Trophy, ChevronRight, 
  ArrowRight, Lightbulb, RefreshCw, Terminal, Eye, Sliders, Menu, X, Play
} from 'lucide-react';

export default function WebDesignDay2({ activeTab: propActiveTab = 'intro', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'intro');

  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day2', tabId);
    }
  };

  const isTabActive = (tabName) => {
    const validTabs = ['intro', 'visual', 'html_build', 'css_flexbox', 'hover_responsive', 'guided_build', 'playground', 'challenges', 'assignment', 'quiz'];
    if (tabName === 'intro') {
      return activeTab === 'intro' || !validTabs.includes(activeTab);
    }
    return activeTab === tabName;
  };

  // Interactive Syntax-Highlighted Code Editor component for live HTML and CSS editing
  const LiveSyntaxCodeEditor = ({ value, onChange, language = 'html', rows = 10, label = '' }) => {
    const escapeHTML = (str) =>
      str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

    const highlightCode = (codeStr, lang) => {
      if (!codeStr) return '';
      const escaped = escapeHTML(codeStr);

      if (lang === 'html') {
        const tokenRegex = /(&lt;!--[\s\S]*?--&gt;)|(&lt;!DOCTYPE html&gt;)|(&lt;\/?[a-zA-Z0-9\-]+)|([a-zA-Z\-]+)(?=\s*=)|("[\s\S]*?"|'[\s\S]*?')/gi;
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

      return escaped;
    };

    const highlightedHTML = highlightCode(value, language);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {label && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: language === 'html' ? '#ea580c' : '#2563eb', letterSpacing: '0.5px' }}>
              {label}
            </label>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Interactive Editor</span>
          </div>
        )}

        <div style={{ position: 'relative', width: '100%', minHeight: `${rows * 1.6}rem`, borderRadius: '12px', overflow: 'hidden', background: '#090d16', border: '1px solid #1e293b' }}>
          <pre
            aria-hidden="true"
            style={{
              margin: 0,
              padding: '1rem',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.82rem',
              lineHeight: '1.6',
              color: '#f8fafc',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              minHeight: `${rows * 1.6}rem`,
              pointerEvents: 'none',
              boxSizing: 'border-box'
            }}
            dangerouslySetInnerHTML={{ __html: highlightedHTML + '\n' }}
          />

          <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            spellCheck={false}
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
              color: 'transparent',
              caretColor: '#38bdf8',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
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

  // --- Meaningful Completion & Progress Tracking State ---
  const [completedSteps, setCompletedSteps] = useState({
    intro: true,
    guidedBuild: 0, // 0 to 10 stages
    challenges: 0, // 0 to 6 challenges
    assignment: false,
    aiChallenge: false,
    quiz: false
  });

  // --- Section 2: Visual Result Toggle ---
  const [showTargetCodeBreakdown, setShowTargetCodeBreakdown] = useState(false);
  const [targetCodeTab, setTargetCodeTab] = useState('html');

  // --- Section 4: Component Explorer State ---
  const [selectedExplorerItem, setSelectedExplorerItem] = useState('logo');

  // --- Section 5: HTML Incremental Build Step ---
  const [htmlBuildStep, setHtmlBuildStep] = useState(1);

  // --- Section 9 & 10: CSS Flexbox & Box Model Interactive State ---
  const [flexDisplay, setFlexDisplay] = useState('flex'); // 'block' | 'flex'
  const [justifyContent, setJustifyContent] = useState('space-between');
  const [alignItems, setAlignItems] = useState('center');
  const [gapSize, setGapSize] = useState(20);
  const [paddingSize, setPaddingSize] = useState(16);

  // --- Section 12 & 13: Hover & Transition Demo State ---
  const [isHoveredInstant, setIsHoveredInstant] = useState(false);
  const [isHoveredSmooth, setIsHoveredSmooth] = useState(false);
  const [useTransition, setUseTransition] = useState(true);

  // --- Section 14: Logo Option State ---
  const [logoOption, setLogoOption] = useState('text'); // 'text' | 'image'

  // --- Section 17 & 18: Responsive Mobile State ---
  const [responsiveDevice, setResponsiveDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Section 19: Live Playground State ---
  const [playgroundHtml, setPlaygroundHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alpha Fly Theni - Navbar</title>
</head>
<body>

  <header class="navbar">
    <div class="logo">Alpha Fly Theni</div>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#courses">Courses</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-login">Login</button>
  </header>

</body>
</html>`);

  const [playgroundCss, setPlaygroundCss] = useState(`.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1b4b;
  padding: 1rem 2rem;
  color: white;
  border-radius: 12px;
}
.logo { font-size: 1.2rem; font-weight: 900; color: #60a5fa; }
nav { display: flex; gap: 1.5rem; }
nav a { color: #cbd5e1; text-decoration: none; font-weight: 600; transition: color 0.3s; }
nav a:hover { color: #ffffff; }
.btn-login { background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; }`);

  const [explainedSnippet, setExplainedSnippet] = useState(null);

  // --- Section 20: Guided Build Stages (10 Stages) ---
  const [guidedBuildStage, setGuidedBuildStage] = useState(1);

  // --- Section 21: Challenges Hints/Solutions State ---
  const [activeChallengeState, setActiveChallengeState] = useState({});

  // --- Section 22: Assignment Business Selection ---
  const [selectedBusiness, setSelectedBusiness] = useState('tuition');

  // --- Section 23: AI Challenge Input State ---
  const [aiInputBusiness, setAiInputBusiness] = useState('Fitness Studio');
  const [aiOutputResult, setAiOutputResult] = useState(null);

  // --- Section 24: Debugging Challenge State ---
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugAnswer, setShowDebugAnswer] = useState(false);
  const [debugSolved, setDebugSolved] = useState(false);

  // --- Section 25: Quiz Answers State ---
  const [quizAnswers, setQuizAnswers] = useState({});

  // ---------------- Data Collections ----------------
  const explorerItemsData = {
    logo: {
      name: 'Logo / Brand Name',
      purpose: 'Identifies the business identity immediately at the top left of the navbar.',
      htmlRole: '<div class="logo">Alpha Fly Theni</div> or <img src="logo.png" alt="Brand Logo">',
      cssRole: 'font-weight: 900; font-size: 1.2rem; color: #60a5fa;'
    },
    home: {
      name: 'Home Link',
      purpose: 'Routes the visitor to the top introductory banner of the webpage.',
      htmlRole: '<a href="#home">Home</a>',
      cssRole: 'text-decoration: none; color: #cbd5e1;'
    },
    about: {
      name: 'About Link',
      purpose: 'Navigates the visitor to the company mission, team, and experience section.',
      htmlRole: '<a href="#about">About</a>',
      cssRole: 'hover effect changes color to bright white.'
    },
    courses: {
      name: 'Courses Link',
      purpose: 'Directs students to the training program cards grid.',
      htmlRole: '<a href="#courses">Courses</a>',
      cssRole: 'margin/gap handles spacing between menu links.'
    },
    services: {
      name: 'Services Link',
      purpose: 'Directs clients to available services and offerings.',
      htmlRole: '<a href="#services">Services</a>',
      cssRole: 'styled with clean typography and hover cursor.'
    },
    contact: {
      name: 'Contact Link',
      purpose: 'Routes visitors to lead inquiry forms and office map.',
      htmlRole: '<a href="#contact">Contact</a>',
      cssRole: 'navigated seamlessly with smooth anchor scrolling.'
    },
    login: {
      name: 'Login Button',
      purpose: 'Provides direct access to student portal login accounts.',
      htmlRole: '<button class="btn-login">Login</button>',
      cssRole: 'background: #2563eb; border-radius: 8px; font-weight: bold;'
    }
  };

  const assignmentBusinesses = {
    tuition: {
      name: 'BrightSpark Learning Hub',
      type: 'Tuition Centre',
      links: ['Home', 'Subjects', 'Tutors', 'Batches', 'Contact'],
      cta: 'Free Demo',
      color: '#2563eb',
      bg: '#1e3a8a'
    },
    restaurant: {
      name: 'Flavors Gourmet Bistro',
      type: 'Restaurant',
      links: ['Home', 'Menu', 'Specials', 'Chef Story', 'Reservation'],
      cta: 'Book Table',
      color: '#d97706',
      bg: '#451a03'
    },
    gym: {
      name: 'PulseFit Club',
      type: 'Gym & Fitness',
      links: ['Home', 'Workouts', 'Trainers', 'Classes', 'Pricing'],
      cta: 'Free Trial',
      color: '#ef4444',
      bg: '#111827'
    },
    photography: {
      name: 'FocusArt Studio',
      type: 'Photography Studio',
      links: ['Home', 'Portfolio', 'Films', 'Packages', 'Contact'],
      cta: 'Book Shoot',
      color: '#10b981',
      bg: '#042f2e'
    },
    travel: {
      name: 'Wanderlust Tours',
      type: 'Travel Service',
      links: ['Home', 'Destinations', 'Packages', 'Reviews', 'Contact'],
      cta: 'Explore Packages',
      color: '#0284c7',
      bg: '#0f172a'
    },
    it_training: {
      name: 'Alpha Fly Theni IT Academy',
      type: 'IT Training Centre',
      links: ['Home', 'Courses', 'Placements', 'About', 'Contact'],
      cta: 'Enroll Now',
      color: '#3b82f6',
      bg: '#1e1b4b'
    },
    interior: {
      name: 'Aesthetic Living Interiors',
      type: 'Interior Design',
      links: ['Home', 'Projects', 'Services', 'Process', 'Contact'],
      cta: 'Get Quote',
      color: '#8b5cf6',
      bg: '#2e1065'
    },
    auto: {
      name: 'Apex Motor Care',
      type: 'Automobile Service',
      links: ['Home', 'Services', 'Repairs', 'Offers', 'Contact'],
      cta: 'Book Service',
      color: '#ea580c',
      bg: '#18181b'
    }
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the main structural purpose of a website Navigation Bar (Navbar)?',
      options: [
        'To store client database rows.',
        'To help visitors navigate between key pages and sections of a website.',
        'To download offline PDF manuals.',
        'To format hard drive partitions.'
      ],
      correct: 1,
      explanation: 'A navbar serves as the primary menu bar helping visitors navigate across website sections.'
    },
    {
      id: 'q2',
      question: 'Which HTML element is specifically designed to contain navigation link menus?',
      options: ['<article>', '<nav>', '<footer>', '<section>'],
      correct: 1,
      explanation: 'The semantic <nav> tag is specifically dedicated to enclosing navigation links.'
    },
    {
      id: 'q3',
      question: 'Which CSS Flexbox property places the Logo on the far left and the Login button on the far right?',
      options: [
        'justify-content: space-between;',
        'flex-direction: column;',
        'align-items: flex-start;',
        'display: inline;'
      ],
      correct: 0,
      explanation: 'justify-content: space-between distributes items evenly across the row with max space between edges.'
    },
    {
      id: 'q4',
      question: 'How do you create space specifically between menu links in CSS Flexbox?',
      options: ['text-align: center;', 'gap: 20px;', 'border-width: 5px;', 'color: blue;'],
      correct: 1,
      explanation: 'The gap property in flexbox specifies exact spacing between child elements.'
    },
    {
      id: 'q5',
      question: 'Which CSS pseudoclass changes the appearance of a navigation link when the user points their mouse cursor over it?',
      options: [':focus', ':hover', ':active', ':visited'],
      correct: 1,
      explanation: 'The :hover pseudoclass activates styles when the user hovers over an element.'
    },
    {
      id: 'q6',
      question: 'What does CSS property "position: sticky; top: 0;" accomplish for a navbar?',
      options: [
        'Hides the navbar completely.',
        'Keeps the navbar pinned to the top of the browser screen while the page scrolls.',
        'Changes text to uppercase.',
        'Deletes all navigation links.'
      ],
      correct: 1,
      explanation: 'position: sticky; top: 0; ensures the navbar remains visible during scrolling.'
    },
    {
      id: 'q7',
      question: 'Why do desktop navbars convert into a hamburger menu (☰) on mobile devices?',
      options: [
        'Because desktop navbars cannot fit horizontally on narrow mobile screens.',
        'Because mobile devices do not support HTML links.',
        'Because CSS Flexbox is disabled on phones.',
        'Because web browsers block buttons on mobile.'
      ],
      correct: 0,
      explanation: 'Mobile screens are narrow, requiring links to collapse into a hamburger menu for responsive UX.'
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

  const quizAttempted = Object.keys(quizAnswers).length === 7;
  const isDay2Completed = guidedBuildStage >= 10 && quizAttempted;
  
  // Progress calculations
  const overallCourseProgress = isDay2Completed ? 10 : 5 + Math.round((guidedBuildStage / 10) * 4);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      
      {/* 🌟 COURSE HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#ffffff',
        boxShadow: '0 20px 30px rgba(49, 46, 129, 0.25)',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '30px', width: 'fit-content', marginBottom: '1.25rem' }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Day 2 • 20 Days Progressive Practical Track
          </span>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          Day 2 — Build Your First Professional Navbar
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#e0e7ff', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
          Master HTML <code>&lt;header&gt;</code> &amp; <code>&lt;nav&gt;</code> elements, CSS Flexbox row alignment, gap spacing, smooth <code>:hover</code> state transitions, sticky positioning, and responsive mobile hamburger menus.
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
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            AI-Powered Web Design • Day 2 / 20
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', marginTop: 2 }}>
            Overall Course Progress: {overallCourseProgress}%
          </div>
        </div>

        {/* Progress Bar & Indicators */}
        <div style={{ flex: 1, maxWidth: '440px', minWidth: '240px' }}>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ height: '100%', width: `${(overallCourseProgress / 20) * 100}%`, background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
            <span>Build Stage: {guidedBuildStage}/10</span>
            <span>Quiz: {quizAttempted ? `${calculateQuizScore()}/7` : '○'}</span>
            <span>Project: Alpha Fly Theni</span>
          </div>
        </div>
      </div>

      {/* 🚀 PEDAGOGY LEARNING FLOW BAR */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Our Practical Learning Philosophy:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.84rem', fontWeight: 800 }}>
          <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '8px' }}>LEARN</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#faf5ff', color: '#7e22ce', padding: '4px 12px', borderRadius: '8px' }}>SEE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '8px' }}>CODE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fff7ed', color: '#ea580c', padding: '4px 12px', borderRadius: '8px' }}>LIVE OUTPUT</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fdf2f8', color: '#db2777', padding: '4px 12px', borderRadius: '8px' }}>MODIFY</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#f0f9ff', color: '#0284c7', padding: '4px 12px', borderRadius: '8px' }}>PRACTICE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#ffffff', padding: '4px 12px', borderRadius: '8px' }}>AI CHALLENGE</span>
        </div>
      </div>

      {/* ==================== TOPIC 1: NAVBAR ANATOMY & BUSINESS ROLE ==================== */}
      {isTabActive('intro') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
              Today You Will Build
            </h2>
            
            {/* Target Navbar Objective Card */}
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem', border: '2px solid #3b82f6' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '1rem' }}>
                🖥️ Target Output Component — Alpha Fly Theni Navbar
              </div>

              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #312e81' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>Home</span>
                  <span style={{ color: '#cbd5e1' }}>About</span>
                  <span style={{ color: '#cbd5e1' }}>Courses</span>
                  <span style={{ color: '#cbd5e1' }}>Services</span>
                  <span style={{ color: '#cbd5e1' }}>Contact</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.82rem' }}>
                  Login
                </button>
              </header>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem 0' }}>
              🎯 Core Skills You Will Master Today:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: 'Navbar Purpose', desc: 'Why websites need structured navigation menus at the top.' },
                { title: 'HTML Structure', desc: 'Using <header>, <nav>, <a>, <ul>, and <button> elements.' },
                { title: 'CSS Flexbox Alignment', desc: 'Using display: flex; and justify-content: space-between;' },
                { title: 'Spacing & Gap', desc: 'Controlling gap between menu links and padding inside header.' },
                { title: 'Hover Animations', desc: 'Adding interactive :hover state transitions to links.' },
                { title: 'Button Styling', desc: 'Designing high-converting CTA login buttons.' },
                { title: 'Sticky Navigation', desc: 'Keeping navbar pinned at the top while scrolling.' },
                { title: 'Responsive Mobile Layout', desc: 'Converting horizontal desktop menus to mobile hamburger bars.' }
              ].map((item, idx) => (
                <div key={idx} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e293b', marginBottom: '4px' }}>✓ {item.title}</div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem 1.25rem', borderRadius: '12px', color: '#065f46', fontSize: '0.9rem', fontWeight: 600 }}>
              ✅ <strong>Pedagogy Rule:</strong> No unnecessary CSS property lists! Every CSS rule is taught only when needed to solve a visible layout problem on our website navbar.
            </div>
          </div>

          <button
            onClick={() => handleTabChange('visual')}
            style={{
              alignSelf: 'flex-end',
              background: '#312e81',
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
            Next: Target Result &amp; Explorer <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== TOPIC 2: VISUAL NAVBAR EXPLORER ==================== */}
      {isTabActive('visual') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Target Result Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Target Visual Result &amp; Interactive Explorer
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Below is the exact modern navbar you will build today for <strong>Alpha Fly Theni</strong>. Click <strong>[See How It Is Built]</strong> to inspect the HTML structure &amp; CSS rules:
            </p>

            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Live Target Component:</span>
                <button
                  onClick={() => setShowTargetCodeBreakdown(!showTargetCodeBreakdown)}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {showTargetCodeBreakdown ? 'Hide Code Breakdown' : 'See How It Is Built'}
                </button>
              </div>

              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #312e81' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>Home</span>
                  <span style={{ color: '#cbd5e1' }}>About</span>
                  <span style={{ color: '#cbd5e1' }}>Courses</span>
                  <span style={{ color: '#cbd5e1' }}>Services</span>
                  <span style={{ color: '#cbd5e1' }}>Contact</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.82rem' }}>
                  Login
                </button>
              </header>

              {/* Reveal Code Breakdown */}
              {showTargetCodeBreakdown && (
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #334155', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                    <button
                      onClick={() => setTargetCodeTab('html')}
                      style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: targetCodeTab === 'html' ? '#ea580c' : '#334155', color: '#ffffff' }}
                    >
                      HTML Structure
                    </button>
                    <button
                      onClick={() => setTargetCodeTab('css')}
                      style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: targetCodeTab === 'css' ? '#2563eb' : '#334155', color: '#ffffff' }}
                    >
                      CSS Styling
                    </button>
                  </div>

                  {targetCodeTab === 'html' ? (
                    <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b', overflowX: 'auto' }}>
                      {renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alpha Fly Theni - Navbar</title>
</head>
<body>

  <header class="navbar">
    <div class="logo">Alpha Fly Theni</div>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#courses">Courses</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="btn-login">Login</button>
  </header>

</body>
</html>`)}
                    </div>
                  ) : (
                    <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', color: '#34d399', fontSize: '0.82rem', margin: 0, overflowX: 'auto' }}>
{`.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1b4b;
  padding: 1rem 2rem;
}
.logo { font-size: 1.25rem; font-weight: 900; color: #60a5fa; }
nav { display: flex; gap: 1.5rem; }
nav a { color: #cbd5e1; text-decoration: none; }
nav a:hover { color: #ffffff; }
.btn-login { background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 8px; }`}
                    </pre>
                  )}
                </div>
              )}
            </div>

            {/* Interactive Component Explorer */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '1.5rem 0 0.75rem 0' }}>
              🔍 Navbar Component Explorer (Click any item)
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
              Click an element below to inspect its practical purpose, HTML tag, and CSS role:
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {Object.keys(explorerItemsData).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedExplorerItem(key)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedExplorerItem === key ? '#312e81' : '#f1f5f9',
                    color: selectedExplorerItem === key ? '#ffffff' : '#475569'
                  }}
                >
                  [{key.toUpperCase()}]
                </button>
              ))}
            </div>

            {/* Explorer Item Details Panel */}
            {explorerItemsData[selectedExplorerItem] && (
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e1b4b', fontSize: '1.1rem', fontWeight: 900 }}>
                  Component: {explorerItemsData[selectedExplorerItem].name}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#334155', margin: '0 0 0.75rem 0' }}>
                  🎯 <strong>Purpose:</strong> {explorerItemsData[selectedExplorerItem].purpose}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                  <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '8px', borderRadius: '6px', color: '#c2410c' }}>
                    <strong>HTML Tag:</strong> {explorerItemsData[selectedExplorerItem].htmlRole}
                  </div>
                  <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', padding: '8px', borderRadius: '6px', color: '#1e40af' }}>
                    <strong>CSS Role:</strong> {explorerItemsData[selectedExplorerItem].cssRole}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== TOPIC 3: HTML STRUCTURE FOR NAVBAR ==================== */}
      {isTabActive('html_build') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Step-by-Step HTML Navbar Construction
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              We build the navbar incrementally in 5 steps so you can visually see how elements grow:
            </p>

            {/* Step Selection Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { step: 1, label: 'Step 1: Main Header' },
                { step: 2, label: 'Step 2: Nav Container' },
                { step: 3, label: 'Step 3: Add Logo' },
                { step: 4, label: 'Step 4: Add Links' },
                { step: 5, label: 'Step 5: Add Login Button' }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setHtmlBuildStep(s.step)}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: htmlBuildStep === s.step ? '#ea580c' : '#f1f5f9',
                    color: htmlBuildStep === s.step ? '#ffffff' : '#475569'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Code Output Display */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', display: 'block', marginBottom: 4 }}>
                  HTML Code (Step {htmlBuildStep} of 5):
                </label>
                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', minHeight: '180px', overflowX: 'auto' }}>
                  {htmlBuildStep === 1 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Navbar</title>
</head>
<body>
  <header class="navbar">
  </header>
</body>
</html>`)}
                  {htmlBuildStep === 2 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Navbar</title>
</head>
<body>
  <header class="navbar">
    <nav>
    </nav>
  </header>
</body>
</html>`)}
                  {htmlBuildStep === 3 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Navbar</title>
</head>
<body>
  <header class="navbar">
    <div class="logo">Alpha Fly Theni</div>
    <nav>
    </nav>
  </header>
</body>
</html>`)}
                  {htmlBuildStep === 4 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Navbar</title>
</head>
<body>
  <header class="navbar">
    <div class="logo">Alpha Fly Theni</div>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#courses">Courses</a>
    </nav>
  </header>
</body>
</html>`)}
                  {htmlBuildStep === 5 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Navbar</title>
</head>
<body>
  <header class="navbar">
    <div class="logo">Alpha Fly Theni</div>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#courses">Courses</a>
    </nav>
    <button class="btn-login">Login</button>
  </header>
</body>
</html>`)}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 4 }}>
                  Unstyled Live Browser Render:
                </label>
                <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '12px', padding: '1rem', minHeight: '180px', fontFamily: 'Times New Roman, serif' }}>
                  {htmlBuildStep >= 3 && <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Alpha Fly Theni</div>}
                  {htmlBuildStep >= 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '8px 0' }}>
                      <a href="#" style={{ color: 'blue' }}>Home</a>
                      <a href="#" style={{ color: 'blue' }}>About</a>
                      <a href="#" style={{ color: 'blue' }}>Courses</a>
                    </div>
                  )}
                  {htmlBuildStep >= 5 && <button style={{ padding: '2px 6px' }}>Login</button>}
                </div>
              </div>
            </div>

            {/* Key Concept Explanation */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', padding: '1rem 1.25rem', borderRadius: '0 10px 10px 0', marginTop: '1.5rem', fontSize: '0.88rem', color: '#334155' }}>
              💡 <strong>Why Unstyled First?</strong> Notice how raw HTML elements stack vertically in Times New Roman font. HTML gives the <strong>structure</strong>, while CSS will transform this into a horizontal navbar!
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 4: FLEXBOX LAYOUT FOR NAVBAR ==================== */}
      {isTabActive('css_flexbox') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              CSS Flexbox &amp; Box Model Visualizer
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Learn Flexbox and Spacing visually by tweaking live layout controls:
            </p>

            {/* Interactive Control Controls */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>display:</label>
                  <button
                    onClick={() => setFlexDisplay(flexDisplay === 'flex' ? 'block' : 'flex')}
                    style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: flexDisplay === 'flex' ? '#2563eb' : '#dc2626', color: 'white' }}
                  >
                    {flexDisplay === 'flex' ? 'display: flex (Row)' : 'display: block (Stacked Vertical)'}
                  </button>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>justify-content:</label>
                  <select
                    value={justifyContent}
                    onChange={e => setJustifyContent(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem', fontWeight: 700, width: '100%' }}
                  >
                    <option value="space-between">space-between (Edges)</option>
                    <option value="center">center (Middle)</option>
                    <option value="flex-start">flex-start (Left)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>gap: {gapSize}px</label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={gapSize}
                    onChange={e => setGapSize(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>padding: {paddingSize}px</label>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    value={paddingSize}
                    onChange={e => setPaddingSize(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* Live Visual Render */}
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: 'white' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Live Flexbox Rendered Output:
              </div>

              <header style={{
                display: flexDisplay,
                justifyContent: justifyContent,
                alignItems: alignItems,
                background: '#1e1b4b',
                padding: `${paddingSize}px 2rem`,
                borderRadius: '12px',
                border: '1px solid #312e81',
                transition: 'all 0.3s'
              }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: `${gapSize}px`, fontSize: '0.85rem' }}>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>Home</span>
                  <span style={{ color: '#cbd5e1' }}>About</span>
                  <span style={{ color: '#cbd5e1' }}>Courses</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>
                  Login
                </button>
              </header>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TOPIC 5: HOVER EFFECTS & RESPONSIVE TOGGLE ==================== */}
      {isTabActive('hover_responsive') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Hover State Demo */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Link Hover Effects &amp; Transitions
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Hover over the buttons below to compare link hover effects with and without CSS `transition`:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.75rem 1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#dc2626', marginBottom: '1rem' }}>
                  Without Transition (Instant Jump):
                </div>
                <button
                  onMouseEnter={() => setIsHoveredInstant(true)}
                  onMouseLeave={() => setIsHoveredInstant(false)}
                  style={{
                    background: isHoveredInstant ? '#dc2626' : '#2563eb',
                    transform: isHoveredInstant ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 26px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'none'
                  }}
                >
                  {isHoveredInstant ? '⚡ Instant Color Jump!' : 'Hover Me (Instant)'}
                </button>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.75rem 1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#16a34a', marginBottom: '1rem' }}>
                  With Transition (`transition: all 0.4s ease;`):
                </div>
                <button
                  onMouseEnter={() => setIsHoveredSmooth(true)}
                  onMouseLeave={() => setIsHoveredSmooth(false)}
                  style={{
                    background: isHoveredSmooth ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    transform: isHoveredSmooth ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    boxShadow: isHoveredSmooth ? '0 10px 25px rgba(16, 185, 129, 0.4)' : '0 4px 14px rgba(37,99,235,0.3)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 26px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {isHoveredSmooth ? '✨ Smooth Glide Transition!' : 'Hover Me (Smooth)'}
                </button>
              </div>
            </div>
          </div>

          {/* Responsive Mobile Layout Demo */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Responsive Mobile Navbar Preview
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Switch device views to test Desktop vs Mobile Hamburger Menu behavior:
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setResponsiveDevice('desktop')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: responsiveDevice === 'desktop' ? '#2563eb' : '#f1f5f9', color: responsiveDevice === 'desktop' ? 'white' : '#475569' }}
              >
                🖥️ Desktop View
              </button>
              <button
                onClick={() => setResponsiveDevice('mobile')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: responsiveDevice === 'mobile' ? '#7c3aed' : '#f1f5f9', color: responsiveDevice === 'mobile' ? 'white' : '#475569' }}
              >
                📱 Mobile View (375px)
              </button>
            </div>

            {/* Mobile View Simulated Container */}
            <div style={{
              background: '#0f172a',
              borderRadius: '16px',
              padding: '1.5rem',
              maxWidth: responsiveDevice === 'mobile' ? '375px' : '100%',
              margin: '0 auto',
              transition: 'all 0.4s ease'
            }}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '0.85rem 1.25rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>

                {responsiveDevice === 'desktop' ? (
                  <>
                    <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
                      <span style={{ color: 'white' }}>Home</span>
                      <span style={{ color: '#cbd5e1' }}>About</span>
                      <span style={{ color: '#cbd5e1' }}>Courses</span>
                    </nav>
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>Login</button>
                  </>
                ) : (
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                  >
                    {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                  </button>
                )}
              </header>

              {/* Mobile Dropdown */}
              {responsiveDevice === 'mobile' && mobileMenuOpen && (
                <div style={{ background: '#1e293b', borderRadius: '0 0 10px 10px', padding: '1rem', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                  <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
                  <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>About</a>
                  <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Courses</a>
                  <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 800, marginTop: '6px' }}>Login</button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ==================== TOPIC 6: GUIDED BUILD (10 STEPS) ==================== */}
      {isTabActive('guided_build') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Guided Mode</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>Build With Me — 10 Stages</h2>
              </div>
              <div style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '6px 16px', borderRadius: '20px', fontWeight: 900, fontSize: '0.9rem' }}>
                Stage Progress: {guidedBuildStage}/10
              </div>
            </div>

            {/* Stages Tracker Bar */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(stage => (
                <div
                  key={stage}
                  onClick={() => setGuidedBuildStage(stage)}
                  style={{
                    flex: 1,
                    height: '8px',
                    borderRadius: '4px',
                    background: stage <= guidedBuildStage ? '#2563eb' : '#e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            {/* Stage Description & Task */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>
                Active Stage {guidedBuildStage}:
              </div>
              
              {guidedBuildStage === 1 && <h3>Stage 1: Create Main Header Tag (`&lt;header class="navbar"&gt;`)</h3>}
              {guidedBuildStage === 2 && <h3>Stage 2: Create Navigation Container (`&lt;nav&gt;`)</h3>}
              {guidedBuildStage === 3 && <h3>Stage 3: Add Business Logo (`&lt;div class="logo"&gt;Alpha Fly Theni&lt;/div&gt;`)</h3>}
              {guidedBuildStage === 4 && <h3>Stage 4: Add Navigation Links (`&lt;a href="#home"&gt;Home&lt;/a&gt;`)</h3>}
              {guidedBuildStage === 5 && <h3>Stage 5: Add Login Button (`&lt;button class="btn-login"&gt;Login&lt;/button&gt;`)</h3>}
              {guidedBuildStage === 6 && <h3>Stage 6: Apply CSS Flexbox (`display: flex; justify-content: space-between;`)</h3>}
              {guidedBuildStage === 7 && <h3>Stage 7: Add Spacing (`gap: 1.5rem; padding: 1rem 2rem;`)</h3>}
              {guidedBuildStage === 8 && <h3>Stage 8: Style Links (`color: #cbd5e1; text-decoration: none;`)</h3>}
              {guidedBuildStage === 9 && <h3>Stage 9: Add Link Hover Effects (nav a:hover &#123; color: #ffffff; &#125;)</h3>}
              {guidedBuildStage === 10 && <h3>Stage 10: Make Navbar Responsive with Mobile Hamburger Menu</h3>}

              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                {guidedBuildStage > 1 && (
                  <button
                    onClick={() => setGuidedBuildStage(guidedBuildStage - 1)}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    ← Previous Stage
                  </button>
                )}
                {guidedBuildStage < 10 && (
                  <button
                    onClick={() => {
                      setGuidedBuildStage(guidedBuildStage + 1);
                      setCompletedSteps(prev => ({ ...prev, guidedBuild: Math.max(prev.guidedBuild, guidedBuildStage + 1) }));
                    }}
                    style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Complete Stage &amp; Unlock Next →
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TOPIC 7: LIVE CODE PLAYGROUND ==================== */}
      {isTabActive('playground') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Live Code Playground — Edit HTML &amp; CSS
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Edit the HTML and CSS code below and see your navbar update live in real-time:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <LiveSyntaxCodeEditor
                label="HTML:"
                language="html"
                rows={11}
                value={playgroundHtml}
                onChange={e => setPlaygroundHtml(e.target.value)}
              />

              <LiveSyntaxCodeEditor
                label="CSS:"
                language="css"
                rows={11}
                value={playgroundCss}
                onChange={e => setPlaygroundCss(e.target.value)}
              />
            </div>

            {/* Playground Live Render */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 4 }}>Live Output Result:</label>
              <div style={{ background: '#ffffff', border: '2px solid #22c55e', borderRadius: '12px', padding: '1.25rem' }}>
                <style>{playgroundCss}</style>
                <div dangerouslySetInnerHTML={{ __html: playgroundHtml }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 8: CODE CHALLENGES & DEBUGGING ==================== */}
      {isTabActive('challenges') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Debugging Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              🐛 Debugging Challenge — Can You Fix It?
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              The navbar code below contains beginner errors (missing closing tag, broken Flexbox property). Can you identify the issue?
            </p>

            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', color: '#f87171', fontSize: '0.84rem', margin: '0 0 1rem 0' }}>
{`<header class="navbar">
  <div class="logo">Alpha Fly Theni</div>
  <nav
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
  <button class="btn-login">Login</button>`}
            </pre>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowDebugHint(!showDebugHint)}
                style={{ background: '#fef3c7', color: '#92400e', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                {showDebugHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              <button
                onClick={() => setShowDebugAnswer(!showDebugAnswer)}
                style={{ background: '#dcfce7', color: '#14532d', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                {showDebugAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>
            </div>

            {showDebugHint && (
              <div style={{ background: '#fffbe8', borderLeft: '4px solid #f59e0b', padding: '0.85rem', borderRadius: '0 8px 8px 0', marginTop: '1rem', fontSize: '0.85rem', color: '#78350f' }}>
                💡 <strong>Hint:</strong> Look closely at line 3: <code>&lt;nav</code> is missing the closing <code>&gt;</code> bracket before child links!
              </div>
            )}

            {showDebugAnswer && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '10px', marginTop: '1rem', fontSize: '0.85rem', color: '#065f46' }}>
                ✅ <strong>Solution:</strong> Change <code>&lt;nav</code> to <code>&lt;nav&gt;</code>. In HTML, missing bracket symbols prevent child tags from parsing correctly.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TOPIC 10: KNOWLEDGE CHECK & PROGRESS ==================== */}
      {isTabActive('quiz') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Quiz Section */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 2 Knowledge Check (7 Questions)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Test your understanding of today's lesson. Click an option for each question to view instant feedback:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map(q => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correct;

                return (
                  <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '1rem' }}>
                      {q.question}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizSelect(q.id, optIdx)}
                          style={{
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: selected === optIdx ? (optIdx === q.correct ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
                            background: selected === optIdx ? (optIdx === q.correct ? '#f0fdf4' : '#fef2f2') : '#ffffff',
                            color: selected === optIdx ? (optIdx === q.correct ? '#14532d' : '#991b1b') : '#334155',
                            transition: 'all 0.2s'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {selected !== undefined && (
                      <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', fontWeight: 700, color: isCorrect ? '#15803d' : '#b91c1c' }}>
                        {isCorrect ? '✅ Correct! ' : '❌ Incorrect. '}{q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {quizAttempted && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.25rem', borderRadius: '12px', marginTop: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 4px 0', color: '#065f46', fontSize: '1.1rem', fontWeight: 900 }}>
                  Quiz Score: {calculateQuizScore()} / 7 Correct!
                </h3>
              </div>
            )}
          </div>

          {/* DAY 2 COMPLETION SCREEN */}
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
              🎉 Day 2 Completed
            </h2>

            {/* Checklist of learned skills */}
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '540px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                YOU LEARNED:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
                <div>✓ Website navigation</div>
                <div>✓ HTML structure</div>
                <div>✓ Header and nav tags</div>
                <div>✓ Anchor links &amp; href</div>
                <div>✓ CSS class selectors</div>
                <div>✓ Flexbox row layout</div>
                <div>✓ Gap &amp; padding spacing</div>
                <div>✓ Box model concepts</div>
                <div>✓ Hover state animations</div>
                <div>✓ Smooth transitions</div>
                <div>✓ Sticky navigation</div>
                <div>✓ Mobile responsive menus</div>
              </div>
            </div>

            {/* Project Progress Tracker */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '540px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                Your Continuous Website So Far:
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                <div>Day 1: Website layout ✓</div>
                <div>Day 2: Professional Navbar ✓</div>
              </div>
            </div>

            {/* DAY 3 PREVIEW CARD */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '540px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                🚀 Coming Up in Day 3:
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                Day 3 — Build a Powerful Hero Section
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                Headline → Description → Primary CTA → Hero Image → Responsive Grid
              </p>
            </div>

            <button
              onClick={() => alert('Day 3 unlocked! Moving to Day 3 — Build a Powerful Hero Section.')}
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
              Continue to Day 3 →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
