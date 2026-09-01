import os

content = '''import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen, MonitorPlay, Code, LayoutGrid, Layers, PenTool, Briefcase, Sparkles,
  CheckCircle, Sliders, Smartphone, Tablet, Monitor, RefreshCw, Star,
  HelpCircle, Eye, EyeOff, ShieldCheck, Award, MessageSquare, AlertCircle, Play, Check,
  Send, MessageCircle, FileText, CheckSquare, ChevronRight, Trophy, Zap, Layout, Copy,
  ArrowRight, RotateCcw, X, Info, ExternalLink, SlidersHorizontal, MousePointerClick
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

export default function WebDesignDay11({ activeTab: propActiveTab = 'intro', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab);

  useEffect(() => {
    if (propActiveTab) {
      // Map legacy tab IDs to new tab IDs if necessary
      const legacyMap = {
        'colors': 'variables',
        'cards_hero': 'grids',
        'flexbox_nav': 'buttons',
        'responsive': 'grids',
        'guided_build': 'refactoring',
        'quiz': 'assessment'
      };
      setActiveTab(legacyMap[propActiveTab] || propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day11', tabId);
    }
  };

  const isTabActive = (tabId) => {
    if (activeTab === tabId) return true;
    if (tabId === 'variables' && activeTab === 'colors') return true;
    if (tabId === 'grids' && (activeTab === 'cards_hero' || activeTab === 'responsive')) return true;
    if (tabId === 'buttons' && activeTab === 'flexbox_nav') return true;
    if (tabId === 'refactoring' && activeTab === 'guided_build') return true;
    if (tabId === 'assessment' && activeTab === 'quiz') return true;
    return false;
  };

  // --- State Variables for Interactive Exercises ---
  // Section 2: CSS Variables Customizer
  const [varPrimary, setVarPrimary] = useState('#2563eb');
  const [varSecondary, setVarSecondary] = useState('#0f172a');
  const [varText, setVarText] = useState('#334155');
  const [varBg, setVarBg] = useState('#f8fafc');
  const [varRadius, setVarRadius] = useState('10px');

  // Section 3: Typography Visualizer
  const [fontFamily, setFontFamily] = useState('Inter');
  const [h1Size, setH1Size] = useState('36');
  const [bodySize, setBodySize] = useState('16');
  const [lineHeight, setLineHeight] = useState('1.6');
  const [fontWeight, setFontWeight] = useState('700');

  // Section 4: Spacing & Box Model Toggle
  const [boxSizingBorder, setBoxSizingBorder] = useState(true);
  const [boxPaddingVal, setBoxPaddingVal] = useState(20);
  const [boxBorderVal, setBoxBorderVal] = useState(6);
  const [cardPadding, setCardPadding] = useState('16px');
  const [cardMargin, setCardMargin] = useState('16px');

  // Section 6: Grid Columns Customizer
  const [gridCols, setGridCols] = useState('repeat(auto-fit, minmax(220px, 1fr))');

  // Section 7: Button System Variant Selector
  const [activeBtnVariant, setActiveBtnVariant] = useState('primary');

  // Section 8 & 9: Micro Interaction Hover Toggle
  const [enableMicroHover, setEnableMicroHover] = useState(true);

  // Section 10: Refactoring Editor
  const [refactoredCodeInput, setRefactoredCodeInput] = useState(`.btn {
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}
.btn-primary { background: var(--primary); color: #fff; border: none; }
.btn-secondary { background: var(--secondary); color: #fff; border: none; }`);

  // Section 11: Before & After Toggle
  const [showAfterVersion, setShowAfterVersion] = useState(true);

  // Practice Challenges Solutions Toggle
  const [showPracticeSol, setShowPracticeSol] = useState({});
  const togglePracticeSol = (id) => {
    setShowPracticeSol(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Assignment Submission State
  const [assignmentCode, setAssignmentCode] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Mini Project Niche Choice
  const [miniProjectNiche, setMiniProjectNiche] = useState('IT Training Institute');
  const [miniProjectSubmitted, setMiniProjectSubmitted] = useState(false);

  // Self-Assessment Checklist (11 Items)
  const [selfAssessment, setSelfAssessment] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    item9: false,
    item10: false,
    item11: false
  });

  const toggleSelfAssessment = (key) => {
    setSelfAssessment(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Day Completion State
  const [isDayCompleted, setIsDayCompleted] = useState(false);

  // --- Quiz Questions Data (12 Comprehensive Questions) ---
  const quizQuestions = [
    {
      id: 1,
      question: "Which CSS syntax correctly declares a custom property (CSS variable)?",
      options: [
        { label: "A", text: "$primary-color: #2563eb;" },
        { label: "B", text: "--primary-color: #2563eb;" },
        { label: "C", text: "@primary-color: #2563eb;" },
        { label: "D", text: "#primary-color: #2563eb;" }
      ],
      correct: "B",
      explanation: "CSS custom properties must begin with two dashes (--), such as --primary-color: #2563eb;. Sass uses $, Less uses @."
    },
    {
      id: 2,
      question: "How do you access and use a CSS variable in a rule?",
      options: [
        { label: "A", text: "color: get(--primary-color);" },
        { label: "B", text: "color: var(--primary-color);" },
        { label: "C", text: "color: use($primary-color);" },
        { label: "D", text: "color: --primary-color;" }
      ],
      correct: "B",
      explanation: "The var() function is used to insert the value of a CSS variable, e.g. color: var(--primary-color);."
    },
    {
      id: 3,
      question: "Where should global CSS variables be declared to be available across the entire document?",
      options: [
        { label: "A", text: "Inside body { ... }" },
        { label: "B", text: "Inside :root { ... }" },
        { label: "C", text: "Inside html.main { ... }" },
        { label: "D", text: "Inside @global { ... }" }
      ],
      correct: "B",
      explanation: ":root represents the highest-level element in the document tree (the <html> tag), making variables available everywhere."
    },
    {
      id: 4,
      question: "Why is box-sizing: border-box recommended as a universal CSS reset?",
      options: [
        { label: "A", text: "It adds 10px padding to every element automatically." },
        { label: "B", text: "It includes padding and border within an element's specified width and height." },
        { label: "C", text: "It removes all borders from buttons and cards." },
        { label: "D", text: "It converts inline elements to block elements." }
      ],
      correct: "B",
      explanation: "border-box ensures that padding and border do not add extra width/height to elements, preventing layout breakage and overflows."
    },
    {
      id: 5,
      question: "What is the benefit of defining a standardized spacing scale (e.g. 4px, 8px, 16px, 24px, 32px)?",
      options: [
        { label: "A", text: "It forces the browser to render text faster." },
        { label: "B", text: "It ensures visual rhythm, consistency, and eliminates arbitrary random pixel margins." },
        { label: "C", text: "It replaces the need for CSS Flexbox." },
        { label: "D", text: "It prevents images from loading slowly." }
      ],
      correct: "B",
      explanation: "A consistent spacing scale creates structured visual rhythm across cards, margins, padding, and section dividers."
    },
    {
      id: 6,
      question: "Which CSS Grid formula creates an auto-responsive card grid without needing media queries?",
      options: [
        { label: "A", text: "grid-template-columns: 1fr 1fr 1fr;" },
        { label: "B", text: "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));" },
        { label: "C", text: "grid-template-columns: flex(250px);" },
        { label: "D", text: "grid-columns: auto-responsive(250px);" }
      ],
      correct: "B",
      explanation: "repeat(auto-fit, minmax(250px, 1fr)) dynamically wraps grid items based on available container width."
    },
    {
      id: 7,
      question: "What is the primary goal of CSS Refactoring?",
      options: [
        { label: "A", text: "Adding as many inline styles as possible." },
        { label: "B", text: "Removing duplicate code, improving maintainability, and creating reusable utility classes." },
        { label: "C", text: "Replacing all CSS files with JavaScript functions." },
        { label: "D", text: "Making font sizes larger on desktop screens." }
      ],
      correct: "B",
      explanation: "Refactoring cleans up redundant/messy CSS into maintainable, reusable component classes (.btn, .card)."
    },
    {
      id: 8,
      question: "True or False: Using reusable classes like .btn and .btn-primary is better than creating separate CSS rules for every single button.",
      options: [
        { label: "A", text: "True — Reusable base classes enforce consistent design and drastically reduce CSS file size." },
        { label: "B", text: "False — Every button should have custom standalone CSS code." }
      ],
      correct: "A",
      explanation: "True! A base .btn class handles common padding, radius, and transition, while modifier classes (.btn-primary) set unique colors."
    },
    {
      id: 9,
      question: "Which transition property syntax provides smooth feedback when hovering over a card or button?",
      options: [
        { label: "A", text: "transition: all 0.2s ease;" },
        { label: "B", text: "animation: hover-smooth 5s infinite;" },
        { label: "C", text: "hover-effect: instant 0s;" },
        { label: "D", text: "transform-speed: fast;" }
      ],
      correct: "A",
      explanation: "transition: all 0.2s ease; smoothly animates property changes (like background, shadow, or transform) over 0.2 seconds."
    },
    {
      id: 10,
      question: "What happens if you update a CSS variable value inside :root { --primary: #2563eb; }?",
      options: [
        { label: "A", text: "Only the main header changes color." },
        { label: "B", text: "Every element on the website using var(--primary) updates to the new color automatically." },
        { label: "C", text: "The browser reloads the entire HTML page." },
        { label: "D", text: "You must manually edit every CSS class." }
      ],
      correct: "B",
      explanation: "Changing a CSS variable in :root propagates instantly to every component consuming var(--primary)."
    },
    {
      id: 11,
      question: "What is the recommended approach for visual typography hierarchy?",
      options: [
        { label: "A", text: "Make all text the exact same size (16px)." },
        { label: "B", text: "Use clear font-size, weight, and line-height distinctions for H1, H2, H3, body, and small text." },
        { label: "C", text: "Use 5 different font families on a single page." },
        { label: "D", text: "Make paragraph text larger than H1 headings." }
      ],
      correct: "B",
      explanation: "Visual typography hierarchy uses distinct font sizes (e.g. H1=36px, H2=28px, Body=16px) and weights so users can scan content effortlessly."
    },
    {
      id: 12,
      question: "When should you use Flexbox vs CSS Grid?",
      options: [
        { label: "A", text: "Use Flexbox for 1D layouts (navbars, button rows) and Grid for 2D layouts (card grids, page layouts)." },
        { label: "B", text: "Grid should only be used for tables, Flexbox for everything else." },
        { label: "C", text: "Never combine Flexbox and Grid on the same page." },
        { label: "D", text: "Flexbox is deprecated in modern CSS." }
      ],
      correct: "A",
      explanation: "Flexbox excels at 1-dimensional alignment (along a row or column), while CSS Grid excels at 2-dimensional grid layouts."
    }
  ];

  const handleQuizSelect = (questionId, optionLabel) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem 1.5rem', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ==================== TAB 1: INTRO TO MODERN CSS ==================== */}
        {isTabActive('intro') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* HEADER METADATA BANNER (Shown on Intro Tab) */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '2.5rem', color: '#ffffff', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'inline-block', marginBottom: '12px' }}>
                    DAY 11 — Modern CSS Styling &amp; Refactoring
                  </span>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                    Transform Basic Websites into Professional, Modern &amp; Consistent Designs
                  </h1>
                  <p style={{ fontSize: '1.05rem', color: '#94a3b8', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
                    <strong>Learning Goal:</strong> Refactor basic HTML/CSS code into clean, modern, responsive, and professional client-ready websites using reusable design tokens, typography scales, box model spacing, component systems, and CSS refactoring.
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Duration</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>⏱️ 60–90 Mins</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Difficulty Level</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24', marginTop: '2px' }}>⚡ Intermediate</div>
                  </div>
                </div>
              </div>

              {/* 12 Learning Outcomes Grid */}
              <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', margin: '0 0 1rem 0', fontWeight: 800 }}>
                  🎯 Day 11 Learning Outcomes (12 Core Skills)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {[
                    "1. Understand consistent design systems",
                    "2. Create & use CSS variables (:root, var())",
                    "3. Build color & typography systems",
                    "4. Enforce 8-point spacing consistency",
                    "5. Apply box-sizing: border-box correctly",
                    "6. Create reusable button component classes",
                    "7. Build consistent card & UI components",
                    "8. Use modern CSS Grid & Flexbox layouts",
                    "9. Improve visual hierarchy & contrast",
                    "10. Refactor redundant/duplicate CSS code",
                    "11. Convert basic sites to modern UI",
                    "12. Make real-world client design decisions"
                  ].map((outcome, idx) => (
                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={14} color="#34d399" />
                      {outcome}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 1 — Introduction to Modern CSS &amp; Design Systems
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Why Professional Websites Need Consistent Design Systems
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                <strong>What is Modern CSS?</strong> Modern CSS goes beyond giving elements random colors or inline inline styles. It is about constructing structured, maintainable, scalable, and reusable style systems.
              </p>

              {/* Basic vs Professional Comparison Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '14px', border: '1px solid #fca5a5' }}>
                  <h4 style={{ color: '#dc2626', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 800 }}>❌ Basic CSS (Amateur Approach)</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#991b1b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <li>Every button has different custom colors, padding, and font sizes.</li>
                    <li>Hardcoded hex codes like <code>#2563eb</code> duplicated 50 times across stylesheets.</li>
                    <li>Random inline styles like <code>style="margin-top: 17px;"</code> everywhere.</li>
                    <li>Changing a brand color requires manually editing dozens of CSS lines.</li>
                  </ul>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '14px', border: '1px solid #86efac' }}>
                  <h4 style={{ color: '#16a34a', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 800 }}>✅ Professional Modern CSS (Design System)</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#166534', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <li>Centralized CSS variables (<code>:root &#123; --primary: #2563eb; &#125;</code>).</li>
                    <li>Reusable component classes (<code>.btn</code>, <code>.btn-primary</code>, <code>.card</code>).</li>
                    <li>Standardized spacing scales (8px, 16px, 24px, 32px).</li>
                    <li>Changing one variable updates the entire website instantly!</li>
                  </ul>
                </div>
              </div>

              {/* Real World Example Card */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  💡 Real-World Example: Before &amp; After Button System
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #475569' }}>
                    <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 700, marginBottom: '8px' }}>BEFORE: Inconsistent Standalone Buttons</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button style={{ background: 'blue', color: 'white', padding: '5px 8px', fontSize: '12px', borderRadius: '3px' }}>Click Here</button>
                      <button style={{ background: '#1d4ed8', color: 'yellow', padding: '12px 25px', fontSize: '18px', borderRadius: '20px' }}>Submit</button>
                      <button style={{ background: 'navy', color: '#fff', padding: '2px 15px', fontSize: '10px' }}>Learn More</button>
                    </div>
                  </div>

                  <div style={{ background: '#1e293b', padding: '1.0rem', borderRadius: '10px', border: '1px solid #475569' }}>
                    <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginBottom: '8px' }}>AFTER: Consistent Design Token System</div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Click Here</button>
                      <button style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Submit</button>
                      <button style={{ background: 'transparent', color: '#38bdf8', border: '2px solid #38bdf8', padding: '8px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Learn More</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Code Example */}
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  📄 Section 1 Source Code: Unstyled vs Structured CSS Architecture
                </h3>
                <CodeBlock
                  title="Section 1: Modern CSS Architecture Principles"
                  language="css"
                  code={`/* BAD: Duplicate, inconsistent styles */
.hero-btn { background: blue; padding: 10px; font-size: 14px; }
.contact-btn { background: #1d4ed8; padding: 14px; font-size: 18px; }
.footer-btn { background: navy; padding: 6px; font-size: 12px; }

/* GOOD: Reusable Base Component + Modifier Classes */
.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary { background: #2563eb; color: #ffffff; border: none; }
.btn-secondary { background: #0f172a; color: #ffffff; border: none; }`}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('variables')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: CSS Variables &amp; Tokens <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: CSS VARIABLES & DESIGN TOKENS ==================== */}
        {isTabActive('variables') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 2 — CSS Custom Properties &amp; Design Tokens
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Mastering <code>:root</code> and <code>var()</code>
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                CSS custom properties (variables) let you store color palettes, font sizes, spacing values, border radii, and box shadows in a central location (<code>:root</code>) and reuse them throughout your stylesheet.
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 2: CSS Variables / Design Tokens Schema"
                  language="css"
                  code={`/* Declaring CSS Custom Properties in :root */
:root {
  --primary-color: #2563eb;
  --secondary-color: #0f172a;
  --text-color: #334155;
  --background-color: #ffffff;
  --border-color: #e2e8f0;
  --radius-md: 10px;
  --spacing-md: 16px;
}

/* Using CSS Variables anywhere in your project */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.card {
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  padding: var(--spacing-md);
}

.btn-primary {
  background-color: var(--primary-color);
  color: #ffffff;
}`}
                />
              </div>

              {/* Interactive Task: Live CSS Variable Studio */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  🎨 Live Practice Studio: Create Your Own Business CSS Variable System
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Adjust the color tokens and border radius below to watch the live business card preview update instantly!
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>--primary-color</label>
                    <input type="color" value={varPrimary} onChange={(e) => setVarPrimary(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>--secondary-color</label>
                    <input type="color" value={varSecondary} onChange={(e) => setVarSecondary(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>--text-color</label>
                    <input type="color" value={varText} onChange={(e) => setVarText(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>--background-color</label>
                    <input type="color" value={varBg} onChange={(e) => setVarBg(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>--radius-md</label>
                    <select value={varRadius} onChange={(e) => setVarRadius(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }}>
                      <option value="4px">4px (Sharp)</option>
                      <option value="10px">10px (Standard)</option>
                      <option value="20px">20px (Rounded)</option>
                      <option value="999px">999px (Pill)</option>
                    </select>
                  </div>
                </div>

                {/* Live Output Card Preview */}
                <div style={{ background: varBg, color: varText, padding: '1.5rem', borderRadius: varRadius, border: '1px solid #e2e8f0', transition: 'all 0.2s ease' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: varPrimary, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Live Component Preview
                  </span>
                  <h3 style={{ color: varSecondary, margin: '4px 0 8px 0', fontSize: '1.25rem' }}>Alpha Fly Digital Agency</h3>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    This card dynamically updates using <code>var(--primary-color)</code> and <code>var(--radius-md)</code>.
                  </p>
                  <button style={{ backgroundColor: varPrimary, color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: varRadius, fontWeight: 700, cursor: 'pointer' }}>
                    Get Started
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('typography')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Typography Hierarchy <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: TYPOGRAPHY HIERARCHY ==================== */}
        {isTabActive('typography') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 3 — Typography Hierarchy System
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Font Sizes, Line-Height &amp; Readability Scale
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Visual hierarchy makes web content effortless to scan. A professional typography scale establishes distinct rules for <strong>H1</strong>, <strong>H2</strong>, <strong>H3</strong>, <strong>Body</strong>, <strong>Small Text</strong>, and <strong>Buttons</strong>.
              </p>

              {/* Typography Scale Table */}
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '12px', color: '#0f172a' }}>Element</th>
                      <th style={{ padding: '12px', color: '#0f172a' }}>Font Size</th>
                      <th style={{ padding: '12px', color: '#0f172a' }}>Font Weight</th>
                      <th style={{ padding: '12px', color: '#0f172a' }}>Line Height</th>
                      <th style={{ padding: '12px', color: '#0f172a' }}>Typical Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#2563eb' }}>H1 Heading</td>
                      <td style={{ padding: '10px 12px' }}>36px - 48px (2.25rem)</td>
                      <td style={{ padding: '10px 12px' }}>800 - 900 (Bold)</td>
                      <td style={{ padding: '10px 12px' }}>1.1 - 1.2</td>
                      <td style={{ padding: '10px 12px' }}>Main Page Title / Hero Headline</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#2563eb' }}>H2 Heading</td>
                      <td style={{ padding: '10px 12px' }}>24px - 32px (1.5rem)</td>
                      <td style={{ padding: '10px 12px' }}>700 - 800</td>
                      <td style={{ padding: '10px 12px' }}>1.25</td>
                      <td style={{ padding: '10px 12px' }}>Section Titles (About, Services)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#2563eb' }}>H3 Heading</td>
                      <td style={{ padding: '10px 12px' }}>18px - 20px (1.2rem)</td>
                      <td style={{ padding: '10px 12px' }}>600 - 700</td>
                      <td style={{ padding: '10px 12px' }}>1.3</td>
                      <td style={{ padding: '10px 12px' }}>Card Titles / Sub-features</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#2563eb' }}>Body Paragraph</td>
                      <td style={{ padding: '10px 12px' }}>16px (1rem)</td>
                      <td style={{ padding: '10px 12px' }}>400 (Regular)</td>
                      <td style={{ padding: '10px 12px' }}>1.5 - 1.6</td>
                      <td style={{ padding: '10px 12px' }}>Main Content &amp; Descriptions</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#2563eb' }}>Small / Meta Text</td>
                      <td style={{ padding: '10px 12px' }}>12px - 14px (0.8rem)</td>
                      <td style={{ padding: '10px 12px' }}>500 (Medium)</td>
                      <td style={{ padding: '10px 12px' }}>1.4</td>
                      <td style={{ padding: '10px 12px' }}>Captions, Dates, Footnotes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 3: Typography CSS Hierarchy System"
                  language="css"
                  code={`/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
}

h1 {
  font-size: 2.25rem; /* 36px */
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

h2 {
  font-size: 1.75rem; /* 28px */
  font-weight: 800;
  line-height: 1.25;
}

p {
  font-size: 1rem;    /* 16px */
  line-height: 1.6;
  color: #475569;
}`}
                />
              </div>

              {/* Interactive Typography Customizer */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  🔤 Interactive Practice: Landing Page Typography Hierarchy Visualizer
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Font Family</label>
                    <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }}>
                      <option value="Inter">Inter (Sans-Serif)</option>
                      <option value="Arial">Arial (Clean)</option>
                      <option value="Georgia">Georgia (Serif)</option>
                      <option value="Courier New">Courier New (Monospace)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>H1 Font Size: {h1Size}px</label>
                    <input type="range" min="24" max="48" value={h1Size} onChange={(e) => setH1Size(e.target.value)} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Body Size: {bodySize}px</label>
                    <input type="range" min="12" max="22" value={bodySize} onChange={(e) => setBodySize(e.target.value)} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Line Height: {lineHeight}</label>
                    <input type="range" min="1.1" max="2.2" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Typography Live Output */}
                <div style={{ background: '#ffffff', color: '#0f172a', padding: '1.5rem', borderRadius: '12px', fontFamily: fontFamily }}>
                  <h1 style={{ fontSize: `${h1Size}px`, fontWeight: fontWeight, lineHeight: 1.2, margin: '0 0 10px 0' }}>
                    Build High-Converting Business Websites
                  </h1>
                  <p style={{ fontSize: `${bodySize}px`, lineHeight: lineHeight, color: '#475569', margin: 0 }}>
                    Mastering font sizes and line-heights ensures your users can read headlines and body copy seamlessly without visual strain.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('spacing')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Spacing &amp; Box Model <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: SPACING SYSTEM & BOX MODEL ==================== */}
        {isTabActive('spacing') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Sections 4 &amp; 5 — Spacing System &amp; CSS Box Model
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Standardized Spacing Scale &amp; <code>box-sizing: border-box</code>
              </h2>

              {/* 8-Point Spacing Scale Banner */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 800 }}>📐 Standard 8-Point Spacing Scale</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.88rem', color: '#475569' }}>
                  Professional web designers never guess random pixel padding. They use a standard 8pt spacing scale:
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['4px (xs)', '8px (sm)', '12px (md)', '16px (lg)', '24px (xl)', '32px (2xl)', '48px (3xl)', '64px (4xl)'].map((sp, i) => (
                    <span key={i} style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', border: '1px solid #bfdbfe' }}>
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box Model Principles & Common Layout Bugs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '14px', border: '1px solid #fca5a5' }}>
                  <h4 style={{ color: '#dc2626', margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800 }}>⚠️ Common Box Model Layout Bugs</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#991b1b', lineHeight: 1.5 }}>
                    <li><strong>Unexpected Overflow:</strong> Adding padding increases an element's total width beyond 100%.</li>
                    <li><strong>Cards Pushing Down:</strong> Cards breaking into multi-lines because padding expands total width.</li>
                    <li><strong>Button Over-Sizing:</strong> Buttons blowing up layout boundaries on smaller viewports.</li>
                  </ul>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '14px', border: '1px solid #86efac' }}>
                  <h4 style={{ color: '#16a34a', margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800 }}>🛡️ The Universal Fix: <code>border-box</code></h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#166534', lineHeight: 1.5 }}>
                    <li><code>content-box</code> (Default): Total Width = Width + Padding + Border.</li>
                    <li><code>border-box</code> (Recommended): Total Width = Specified Width (Padding &amp; Border included inside).</li>
                    <li>Always include universal reset: <code>*, *::before, *::after &#123; box-sizing: border-box; &#125;</code></li>
                  </ul>
                </div>
              </div>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 4 & 5: Universal Spacing & Box-Sizing Reset"
                  language="css"
                  code={`/* Universal CSS Reset for Box-Sizing */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Container Spacing Rules */
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px; /* Consistent side padding */
}

/* Card Component Spacing */
.card {
  padding: 24px;      /* Inside breathing room */
  margin-bottom: 32px;/* Outside section separation */
}`}
                />
              </div>

              {/* Interactive Box Model Demonstration */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    📐 Live Box Model Inspector
                  </h3>
                  <button
                    onClick={() => setBoxSizingBorder(!boxSizingBorder)}
                    style={{ background: boxSizingBorder ? '#10b981' : '#ef4444', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Toggle box-sizing: {boxSizingBorder ? 'border-box (SAFE)' : 'content-box (OVERFLOW)'}
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>Container Boundary (300px max)</div>
                    <div style={{ width: '100%', maxWidth: '300px', background: '#334155', padding: cardPadding, border: '4px solid #38bdf8', boxSizing: boxSizingBorder ? 'border-box' : 'content-box', transition: 'all 0.2s ease' }}>
                      <div style={{ background: '#2563eb', padding: '10px', color: '#fff', fontSize: '0.85rem', textAlign: 'center', fontWeight: 700 }}>
                        Card Content Box
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    <div><strong>Current Mode:</strong> <code>{boxSizingBorder ? 'border-box' : 'content-box'}</code></div>
                    <div><strong>Padding:</strong> {cardPadding}</div>
                    <div><strong>Border:</strong> 4px</div>
                    <div style={{ color: boxSizingBorder ? '#34d399' : '#f87171', fontWeight: 800, marginTop: '8px' }}>
                      {boxSizingBorder ? '✅ Fits perfectly inside container width!' : '❌ Overflows container boundary due to added padding & border!'}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('grids')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Grids &amp; Component Layouts <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: MODERN GRIDS & COMPONENT LAYOUTS ==================== */}
        {isTabActive('grids') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 6 — Modern Grids &amp; Component Layouts
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Flexbox vs CSS Grid Decision Guide
              </h2>

              {/* Flexbox vs Grid Guide */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: '#2563eb', margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800 }}>⚡ Use Flexbox For (1D Layouts)</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    <li>Navigation bar links (`justify-content: space-between`).</li>
                    <li>Hero section text vs image alignment.</li>
                    <li>Button groups &amp; badge rows (`gap: 12px`).</li>
                  </ul>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ color: '#2563eb', margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800 }}>📐 Use CSS Grid For (2D Component Grids)</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    <li>Services feature cards (`repeat(auto-fit, minmax(250px, 1fr))`).</li>
                    <li>Product catalog grids &amp; image galleries.</li>
                    <li>Multi-tier pricing comparison tables.</li>
                  </ul>
                </div>
              </div>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 6: Auto-Responsive Card Grid Formula"
                  language="css"
                  code={`/* Auto-Responsive Card Grid Formula (No Media Queries Required!) */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.service-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
}`}
                />
              </div>

              {/* Live Interactive Grid Demo */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  🃏 Live Service Cards Grid Demo
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {[
                    { title: 'Web Design', desc: 'Modern responsive websites built with clean HTML/CSS.' },
                    { title: 'UI/UX Design', desc: 'Figma wireframes & responsive user experience design.' },
                    { title: 'SEO Optimization', desc: 'Page speed & search engine ranking improvements.' }
                  ].map((card, i) => (
                    <div key={i} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem' }}>
                      <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>🚀</span>
                      <h4 style={{ color: '#ffffff', margin: '0 0 6px 0', fontSize: '1.05rem' }}>{card.title}</h4>
                      <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('buttons')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Button System <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: PROFESSIONAL BUTTON SYSTEM ==================== */}
        {isTabActive('buttons') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 7 — Professional Button System
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Reusable Button Classes: Primary, Secondary, Outline &amp; Danger
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Never write standalone CSS styles for individual buttons. Create a base <code>.btn</code> class for structural properties (padding, border-radius, font-weight, cursor, transition) and modifier classes for color variants.
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 7: Reusable Professional Button System"
                  language="css"
                  code={`/* Base Button Component Class */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: var(--radius-md, 10px);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

/* Variant Modifier Classes */
.btn-primary {
  background-color: var(--primary-color, #2563eb);
  color: #ffffff;
}

.btn-secondary {
  background-color: var(--secondary-color, #0f172a);
  color: #ffffff;
}

.btn-outline {
  background-color: transparent;
  border-color: #cbd5e1;
  color: #0f172a;
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
}`}
                />
              </div>

              {/* Live Button Component Viewer */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  🔘 Live Button System Showcase
                </h3>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    .btn-primary
                  </button>
                  <button style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '12px 22px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    .btn-secondary
                  </button>
                  <button style={{ background: 'transparent', color: '#38bdf8', border: '2px solid #38bdf8', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    .btn-outline
                  </button>
                  <button style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    .btn-danger
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('cards')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Cards &amp; Micro-Hover <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 7: CARDS & MICRO VISUAL FEEDBACK ==================== */}
        {isTabActive('cards') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Sections 8 &amp; 9 — Cards UI Consistency &amp; Micro Hover States
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Subtle Micro-Interactions: <code>:hover</code>, <code>transition</code>, and <code>transform</code>
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Hover feedback tells users an element is interactive. Professional websites use subtle transforms (e.g. <code>transform: translateY(-4px)</code>) and box shadows rather than jarring layout shifts.
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 8 & 9: Consistent Card Component & Hover State"
                  language="css"
                  code={`/* Card Component with Subtle Hover Lift */
.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Subtle Micro Visual Feedback on Hover */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}`}
                />
              </div>

              {/* Interactive Card Hover Demo */}
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                  🃏 Interactive Card Component Showcase (Hover over the card below)
                </h3>

                <div style={{ maxWidth: '360px' }}>
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                      transition: 'all 0.25s ease-in-out',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 16px 32px rgba(37, 99, 235, 0.12)';
                      e.currentTarget.style.borderColor = '#93c5fd';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>Feature Card</span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '10px 0 6px 0' }}>Client Service Card</h4>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                      Notice how smooth <code>translateY(-6px)</code> elevation gives immediate visual confirmation to the user!
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('refactoring')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: CSS Refactoring <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 8: CSS REFACTORING PRINCIPLES ==================== */}
        {isTabActive('refactoring') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 10 — CSS Refactoring Principles
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Write CSS Once, Reuse It Everywhere
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                <strong>CSS Refactoring</strong> is the process of restructuring existing CSS to make it cleaner, more maintainable, and free of redundant code without changing the visual layout.
              </p>

              {/* Refactoring Rules List */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 800 }}>🧹 Key Things to Identify During CSS Audit:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '0.88rem', color: '#334155' }}>
                  <div>• Duplicate CSS rules</div>
                  <div>• Unnecessary standalone selectors</div>
                  <div>• Conflicting CSS properties</div>
                  <div>• Overly specific CSS selectors</div>
                  <div>• Inline HTML style attributes</div>
                  <div>• Hardcoded inconsistent colors</div>
                </div>
              </div>

              {/* Code Example: BAD vs GOOD */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 10: BAD CSS vs REFACTORED CLEAN CSS"
                  language="css"
                  code={`/* BAD MESSY CSS (Redundant & Hard to Maintain) */
.good-button { background: #2563eb; color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 600; }
.blue-button { background: #2563eb; color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 600; }
.primary-button { background: #2563eb; color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 600; }

/* REFACTORED CLEAN CSS (Reusable Design Tokens + Modifiers) */
:root {
  --primary: #2563eb;
  --radius-md: 8px;
}

.btn {
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: #ffffff;
  border: none;
}`}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('before_after')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Before &amp; After Project <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 9: BEFORE & AFTER PROJECT ==================== */}
        {isTabActive('before_after') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 11 — Practical Transformation Exercise
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Before &amp; After Full Website Refactoring Showcase
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                See how applying Day 11 concepts (CSS variables, typography scales, box model spacing, reusable buttons, and card grid layouts) transforms a basic website into a modern client project.
              </p>

              {/* Version Toggle Controls */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setShowAfterVersion(false)}
                  style={{ background: !showAfterVersion ? '#ef4444' : '#f1f5f9', color: !showAfterVersion ? '#ffffff' : '#64748b', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
                >
                  ❌ BEFORE (Basic Website)
                </button>
                <button
                  onClick={() => setShowAfterVersion(true)}
                  style={{ background: showAfterVersion ? '#10b981' : '#f1f5f9', color: showAfterVersion ? '#ffffff' : '#64748b', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
                >
                  ✅ AFTER (Refactored Modern Website)
                </button>
              </div>

              {/* Dynamic Live Preview Window */}
              <div style={{ background: showAfterVersion ? '#f8fafc' : '#ffffff', border: `2px solid ${showAfterVersion ? '#10b981' : '#fca5a5'}`, borderRadius: '16px', padding: '1.5rem', transition: 'all 0.3s ease' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: showAfterVersion ? '#166534' : '#991b1b', marginBottom: '12px' }}>
                  {showAfterVersion ? '✨ REFACTORED VERSION: Using CSS variables, grid, rounded cards, and typography hierarchy' : '⚠️ INITIAL UNREFACTORED VERSION: Plain text, default colors, inconsistent spacing'}
                </div>

                {!showAfterVersion ? (
                  /* BEFORE VERSION */
                  <div style={{ fontFamily: 'serif', color: '#000000' }}>
                    <div style={{ background: '#cccccc', padding: '5px' }}>
                      <span style={{ fontWeight: 'bold' }}>Alpha Fly Website</span> | Home | Services | Contact
                    </div>
                    <div style={{ padding: '20px 0' }}>
                      <h1>Welcome to our business</h1>
                      <p>We build websites for local clients and businesses in Theni.</p>
                      <button style={{ background: 'blue', color: 'white' }}>Get Started</button>
                    </div>
                    <hr />
                    <div>
                      <h3>Our Services</h3>
                      <div>Web Design - Rs 10,000</div>
                      <div>App Development - Rs 25,000</div>
                    </div>
                  </div>
                ) : (
                  /* AFTER VERSION */
                  <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '1.5rem' }}>
                      <div style={{ fontWeight: 900, color: '#2563eb', fontSize: '1.1rem' }}>Alpha Fly Theni</div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
                        <span>Home</span>
                        <span>Services</span>
                        <span>Contact</span>
                      </div>
                    </div>

                    {/* Hero Section */}
                    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '2rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 8px 0', color: '#38bdf8' }}>Build Job-Ready Digital Websites</h1>
                      <p style={{ color: '#94a3b8', margin: '0 0 1.25rem 0', fontSize: '0.95rem' }}>Transforming ideas into responsive, high-converting digital experiences.</p>
                      <button style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                        Get Started Now
                      </button>
                    </div>

                    {/* Service Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>Web Design</h4>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Custom business landing pages &amp; portfolios.</div>
                      </div>
                      <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>SEO Optimization</h4>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Search ranking &amp; page speed improvements.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('assessment')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Practice, Quiz &amp; Assessment <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 10: PRACTICE, QUIZ & ASSESSMENT ==================== */}
        {isTabActive('assessment') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* PART A: CODING PRACTICE (6 CHALLENGES) */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Part A — Interactive Coding Practice (6 Hands-On Challenges)
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1.25rem 0' }}>
                Practice Exercises with Starter Code &amp; Solutions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  {
                    id: 'chal1',
                    title: '1. Create CSS Variables for a Business Brand',
                    problem: 'Define CSS custom properties in :root for primary color (#2563eb), secondary color (#0f172a), and border radius (10px).',
                    code: `:root {
  /* Write your CSS variables here */
}`,
                    solution: `:root {
  --primary: #2563eb;
  --secondary: #0f172a;
  --radius-md: 10px;
}`
                  },
                  {
                    id: 'chal2',
                    title: '2. Create Reusable Button Base & Modifier Classes',
                    problem: 'Create a base .btn class with padding 12px 20px and border-radius var(--radius-md). Add a .btn-primary modifier.',
                    code: `.btn {
  /* Base button styles */
}
.btn-primary {
  /* Primary variant */
}`,
                    solution: `.btn {
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}
.btn-primary {
  background-color: var(--primary);
  color: #ffffff;
  border: none;
}`
                  },
                  {
                    id: 'chal3',
                    title: '3. Create an Auto-Responsive Service Cards Grid',
                    problem: 'Write a CSS rule for .card-grid using repeat(auto-fit, minmax(250px, 1fr)) and 24px gap.',
                    code: `.card-grid {
  /* Grid formula here */
}`,
                    solution: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}`
                  },
                  {
                    id: 'chal4',
                    title: '4. Define a Typography Hierarchy Scale',
                    problem: 'Define font-size and font-weight hierarchy rules for body (16px, 400) and h1 (36px, 900).',
                    code: `body {
  /* Body styles */
}
h1 {
  /* H1 styles */
}`,
                    solution: `body {
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
}
h1 {
  font-size: 2.25rem; /* 36px */
  font-weight: 900;
  line-height: 1.2;
}`
                  },
                  {
                    id: 'chal5',
                    title: '5. Refactor Messy Inconsistent CSS',
                    problem: 'Refactor three separate standalone button classes (.btn1, .btn2, .btn3) into a reusable component.',
                    code: `/* Standalone Messy Code */
.btn1 { background: blue; padding: 10px; }
.btn2 { background: blue; padding: 10px; font-size: 14px; }
.btn3 { background: blue; padding: 10px; border-radius: 8px; }`,
                    solution: `/* Clean Refactored Code */
.btn {
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
}
.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
}`
                  },
                  {
                    id: 'chal6',
                    title: '6. Build a Modern Hero Component CSS',
                    problem: 'Create a hero container with dark gradient background, white text, 4rem padding, and centered text alignment.',
                    code: `.hero {
  /* Hero styling */
}`,
                    solution: `.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 20px;
}`
                  }
                ].map(chal => (
                  <div key={chal.id} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1rem', fontWeight: 800 }}>{chal.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 10px 0' }}>{chal.problem}</p>
                    
                    <CodeBlock title={chal.title} language="css" code={chal.code} />

                    <div style={{ marginTop: '10px' }}>
                      <button
                        onClick={() => togglePracticeSol(chal.id)}
                        style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {showPracticeSol[chal.id] ? 'Hide Solution' : 'View Solution'}
                      </button>

                      {showPracticeSol[chal.id] && (
                        <div style={{ marginTop: '10px' }}>
                          <CodeBlock title="Solution Code" language="css" code={chal.solution} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PART B: KNOWLEDGE CHECK QUIZ (12 QUESTIONS) */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Part B — Knowledge Check Quiz
                  </span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                    Interactive Knowledge Assessment (12 Questions)
                  </h2>
                </div>

                {quizSubmitted && (
                  <div style={{ background: calculateQuizScore() >= 9 ? '#dcfce7' : '#fef3c7', color: calculateQuizScore() >= 9 ? '#166534' : '#92400e', padding: '8px 16px', borderRadius: '20px', fontWeight: 900, fontSize: '0.95rem' }}>
                    Score: {calculateQuizScore()} / 12 ({Math.round((calculateQuizScore() / 12) * 100)}%)
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem', marginBottom: '10px' }}>
                      Question {idx + 1}: {q.question}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                      {q.options.map(opt => {
                        const isSelected = quizAnswers[q.id] === opt.label;
                        const isCorrect = q.correct === opt.label;

                        let btnBg = '#ffffff';
                        let btnBorder = '#cbd5e1';
                        let btnColor = '#0f172a';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnBg = '#dcfce7';
                            btnBorder = '#86efac';
                            btnColor = '#166534';
                          } else if (isSelected && !isCorrect) {
                            btnBg = '#fee2e2';
                            btnBorder = '#fca5a5';
                            btnColor = '#991b1b';
                          }
                        } else if (isSelected) {
                          btnBg = '#eff6ff';
                          btnBorder = '#2563eb';
                          btnColor = '#1e40af';
                        }

                        return (
                          <button
                            key={opt.label}
                            onClick={() => handleQuizSelect(q.id, opt.label)}
                            style={{
                              background: btnBg,
                              border: `2px solid ${btnBorder}`,
                              color: btnColor,
                              padding: '10px 14px',
                              borderRadius: '8px',
                              textAlign: 'left',
                              fontSize: '0.88rem',
                              fontWeight: isSelected ? 700 : 500,
                              cursor: quizSubmitted ? 'default' : 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <strong>{opt.label}.</strong> {opt.text}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#475569', background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', width: '100%', marginTop: '1rem' }}
                  >
                    Submit Answers &amp; View Results
                  </button>
                ) : (
                  <button
                    onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                    style={{ background: '#475569', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', width: 'fit-content', margin: '1rem auto 0 auto' }}
                  >
                    🔄 Retake Quiz
                  </button>
                )}
              </div>
            </div>

            {/* PART C: DAY 11 PRACTICAL TASK */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Part C — Day 11 Practical Task
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0.75rem 0' }}>
                Task Title: "Modernize a Basic Business Website"
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                <strong>Instructions:</strong> Students must take a basic HTML/CSS business website and redesign its layout into a clean, responsive client interface using Day 11 design tokens and component classes.
              </p>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '0.95rem', fontWeight: 800 }}>Mandatory Required 8 Sections Checklist:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '0.88rem', color: '#334155' }}>
                  {[
                    "1. Header (Logo & Nav)",
                    "2. Hero (Headline & CTA)",
                    "3. Services (Grid Cards)",
                    "4. About (Company Story)",
                    "5. Features (Grid List)",
                    "6. Call-To-Action Banner",
                    "7. Contact Form Section",
                    "8. Footer (Links & Copyright)"
                  ].map((sec, i) => (
                    <div key={i} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600 }}>
                      ✅ {sec}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PART D: DAY 11 ASSIGNMENT */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Part D — Day 11 Assignment
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0.75rem 0' }}>
                Assignment: "Professional CSS Refactoring Challenge"
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                <strong>Scenario:</strong> You inherited an intentionally messy CSS file containing duplicate styles, hardcoded colors, and inconsistent button sizes. Refactor it into a clean CSS variable design system!
              </p>

              <textarea
                rows={6}
                value={assignmentCode}
                onChange={(e) => setAssignmentCode(e.target.value)}
                placeholder="Paste your clean refactored CSS code here (including :root variables, .btn classes, .card grid rules)..."
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box', marginBottom: '1rem' }}
              />

              <button
                onClick={() => setAssignmentSubmitted(true)}
                style={{ background: assignmentSubmitted ? '#10b981' : '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
              >
                {assignmentSubmitted ? '✓ Assignment Submitted for Review' : 'Submit Refactoring Assignment'}
              </button>
            </div>

            {/* PART E: DAY 11 MINI PROJECT */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Part E — Day 11 Mini Project
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0.75rem 0' }}>
                Mini Project: "Modern Business Landing Page"
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                Select one business niche below to build a clean landing page incorporating CSS variables, typography hierarchy, auto-responsive grids, and micro hover states:
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {['IT Training Institute', 'Restaurant', 'Salon', 'Real Estate Agency', 'Digital Marketing Agency'].map(niche => (
                  <button
                    key={niche}
                    onClick={() => setMiniProjectNiche(niche)}
                    style={{
                      background: miniProjectNiche === niche ? '#0f172a' : '#f1f5f9',
                      color: miniProjectNiche === niche ? '#38bdf8' : '#475569',
                      border: `1px solid ${miniProjectNiche === niche ? '#38bdf8' : '#cbd5e1'}`,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {niche}
                  </button>
                ))}
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155' }}>
                📌 <strong>Chosen Niche:</strong> {miniProjectNiche} Landing Page Target Project.
              </div>
            </div>

            {/* PART F: SELF-ASSESSMENT CHECKLIST (11 ITEMS) */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Part F — Student Self-Assessment Checklist
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 1rem 0' }}>
                Verify Your Day 11 Skill Competencies
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                {[
                  { key: 'item1', text: 'I can create CSS variables using :root and var()' },
                  { key: 'item2', text: 'I can create a structured typography hierarchy' },
                  { key: 'item3', text: 'I understand the CSS box model and border-box' },
                  { key: 'item4', text: 'I can create consistent 8-point spacing' },
                  { key: 'item5', text: 'I can use CSS Grid and Flexbox appropriately' },
                  { key: 'item6', text: 'I can create reusable button component classes' },
                  { key: 'item7', text: 'I can create reusable card UI components' },
                  { key: 'item8', text: 'I can add professional micro hover states' },
                  { key: 'item9', text: 'I can identify duplicate/redundant CSS rules' },
                  { key: 'item10', text: 'I can refactor messy CSS stylesheets' },
                  { key: 'item11', text: 'I can convert a basic website into a professional design' }
                ].map(chk => (
                  <label key={chk.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: selfAssessment[chk.key] ? '#f0fdf4' : '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${selfAssessment[chk.key] ? '#86efac' : '#cbd5e1'}`, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>
                    <input
                      type="checkbox"
                      checked={selfAssessment[chk.key]}
                      onChange={() => toggleSelfAssessment(chk.key)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    {chk.text}
                  </label>
                ))}
              </div>
            </div>

            {/* PART G: DAY COMPLETION SYSTEM */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '20px', padding: '2rem', color: '#ffffff', border: '1px solid #334155', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8', margin: '0 0 8px 0' }}>
                🎉 Day 11 Graduation &amp; Completion Status
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#94a3b8', margin: '0 0 1.5rem 0' }}>
                Complete lessons, coding practice, knowledge quiz, assignment, and self-assessment checklist to finish Day 11!
              </p>

              <button
                onClick={() => {
                  setIsDayCompleted(true);
                  if (onNavigate) {
                    onNavigate('web_design_day12', 'intro');
                  }
                }}
                style={{
                  background: isDayCompleted ? '#10b981' : '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {isDayCompleted ? '✓ DAY 11 COMPLETED — Proceed to Day 12' : 'Mark Day 11 Completed & Unlock Day 12 →'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
'''

with open(r'c:\Users\Kowsalya\Desktop\My_projects\af_course_lms\src\pages\web-design\WebDesignDay11.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully written WebDesignDay11.jsx!")
