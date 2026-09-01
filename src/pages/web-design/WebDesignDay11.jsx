import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen, MonitorPlay, Code, LayoutGrid, Layers, PenTool, Briefcase, Sparkles,
  CheckCircle, Sliders, Smartphone, Tablet, Monitor, RefreshCw, Star,
  HelpCircle, Eye, EyeOff, ShieldCheck, Award, MessageSquare, AlertCircle, Play, Check,
  Send, MessageCircle, FileText, CheckSquare, ChevronRight, Trophy, Zap, Layout, Copy,
  ArrowRight, RotateCcw, X, Info, ExternalLink, SlidersHorizontal, MousePointerClick
} from 'lucide-react';

export default function WebDesignDay11({ activeTab: propActiveTab = 'intro', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab);

  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day11', tabId);
    }
  };

  // --- Interactive Syntax-Highlighted Code Editor component ---
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
        const cssTokenRegex = /(\/\*[\s\S]*?\*\/)|([.#:][a-zA-Z0-9_\-]+|[a-zA-Z0-9_\-]+(?=\s*\{))|([a-zA-Z\-]+)(?=\s*:)|(:\s*[^;\}]+;)/gi;
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
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Interactive Live Code Editor ({language.toUpperCase()})</span>
          </div>
        )}

        <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#090d16', border: '1px solid #1e293b', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
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
              fontSize: '0.84rem',
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
              fontSize: '0.84rem',
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

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================

  // 1. Review Section State
  const [unfinishedAreas, setUnfinishedAreas] = useState({
    colors: false,
    typography: false,
    spacing: false,
    buttons: false,
    cards: false,
    hero: false,
    mobile: false
  });
  const [studentReviewNote, setStudentReviewNote] = useState('');

  // 2. Before / After Preview Toggle State
  const [previewMode, setPreviewMode] = useState('after');

  // 3. Color Studio State
  const [pageBgColor, setPageBgColor] = useState('#f8fafc');
  const [textColor, setTextColor] = useState('#334155');
  const [headingColor, setHeadingColor] = useState('#0f172a');
  const [buttonColor, setButtonColor] = useState('#2563eb');
  const [cardBgColor, setCardBgColor] = useState('#ffffff');
  const [showColorHint, setShowColorHint] = useState(false);
  const [showColorSol, setShowColorSol] = useState(false);

  // 4. Typography Visualizer State
  const [headingSize, setHeadingSize] = useState(42);
  const [paragraphSize, setParagraphSize] = useState(16);
  const [headingWeight, setHeadingWeight] = useState('700');
  const [textAlign, setTextAlign] = useState('left');
  const [lineHeight, setLineHeight] = useState(1.6);
  const [fontFamilySelect, setFontFamilySelect] = useState('system-ui');

  // 5. Spacing Demonstrator State
  const [spacingViewMode, setSpacingViewMode] = useState('after');
  const [demoPadding, setDemoPadding] = useState(24);
  const [demoMargin, setDemoMargin] = useState(20);
  const [demoGap, setDemoGap] = useState(20);

  // 6. Button Practice Editor State
  const [btnBgColor, setBtnBgColor] = useState('#2563eb');
  const [btnTextColor, setBtnTextColor] = useState('#ffffff');
  const [btnPaddingY, setBtnPaddingY] = useState(12);
  const [btnPaddingX, setBtnPaddingX] = useState(20);
  const [btnBorderRadius, setBtnBorderRadius] = useState(8);
  const [btnHoverBgColor, setBtnHoverBgColor] = useState('#1d4ed8');
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [showBtnHint, setShowBtnHint] = useState(false);
  const [showBtnSol, setShowBtnSol] = useState(false);

  // 7. Section Review Checklist State
  const [sectionChecklist, setSectionChecklist] = useState({
    about: true,
    services: true,
    projects: true,
    testimonials: true,
    pricing: true,
    contact: true
  });

  // 8. Mobile Viewport Simulator State
  const [viewportWidth, setViewportWidth] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [studentMobileIssues, setStudentMobileIssues] = useState('');

  // 9. Guided Build (11 Steps) State
  const [guidedStep, setGuidedStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(Array(11).fill(false));
  const [guidedCodes, setGuidedCodes] = useState([
    `/* Step 1: Choose a simple color palette */\nbody {\n  background-color: #f8fafc;\n  color: #334155;\n}\nh1, h2, h3 {\n  color: #0f172a;\n}`,
    `/* Step 2: Update the page background */\nbody {\n  background-color: #f7f7f7;\n  color: #222222;\n}`,
    `/* Step 3: Improve heading styles */\nh1 {\n  font-size: 42px;\n  font-weight: 700;\n  line-height: 1.1;\n  color: #0f172a;\n}`,
    `/* Step 4: Improve paragraph readability */\np {\n  font-size: 16px;\n  line-height: 1.6;\n  color: #475569;\n}`,
    `/* Step 5: Add section spacing */\nsection {\n  padding: 60px 20px;\n}\n.container {\n  max-width: 1100px;\n  margin: 0 auto;\n}`,
    `/* Step 6: Style all buttons */\n.btn {\n  display: inline-block;\n  padding: 12px 20px;\n  border: none;\n  border-radius: 8px;\n  background-color: #2563eb;\n  color: white;\n  cursor: pointer;\n  font-size: 16px;\n}`,
    `/* Step 7: Style all cards */\n.card {\n  background-color: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);\n}`,
    `/* Step 8: Add simple hover effects */\n.btn:hover {\n  background-color: #1d4ed8;\n}\n.card {\n  transition: transform 0.2s ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n}`,
    `/* Step 9: Improve the hero section */\n.hero {\n  padding: 80px 20px;\n}\n.hero-content {\n  max-width: 650px;\n  margin: 0 auto;\n  text-align: center;\n}\n.hero-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  flex-wrap: wrap;\n}`,
    `/* Step 10: Add one basic mobile media query */\n@media (max-width: 700px) {\n  .card-list {\n    flex-direction: column;\n  }\n  h1 {\n    font-size: 32px;\n  }\n  section {\n    padding: 40px 16px;\n  }\n  .hero-actions {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}`,
    `/* Step 11: Test website on small screens */\n/* Mobile responsive layout verified! */`
  ]);

  const guidedStepsList = [
    { title: "1. Choose Color Palette", desc: "Select 1 main color, 1 text color, 1 background color, and 1 accent color." },
    { title: "2. Page Background", desc: "Apply background-color and primary text color to body selector." },
    { title: "3. Heading Styles", desc: "Set font-size (42px), font-weight (700), line-height (1.1), and heading color." },
    { title: "4. Paragraph Readability", desc: "Set paragraph font-size (16px) and line-height (1.6) for optimal reading comfort." },
    { title: "5. Section Spacing", desc: "Add padding to sections (60px 20px) to give content proper breathing room." },
    { title: "6. Button Styling", desc: "Apply consistent padding, border-radius (8px), background color, and cursor pointer." },
    { title: "7. Card Styling", desc: "Style cards with white background, border, 12px border-radius, padding, and drop shadow." },
    { title: "8. Subtle Hover Effects", desc: "Add :hover state for buttons and subtle translateY(-4px) with CSS transition for cards." },
    { title: "9. Hero Section Layout", desc: "Center hero content with max-width: 650px, margin: 0 auto, and flex button actions." },
    { title: "10. Basic Mobile Media Query", desc: "Add @media (max-width: 700px) to stack cards vertically and adjust padding." },
    { title: "11. Screen Testing", desc: "Verify layout responsiveness across desktop, tablet, and mobile viewports." }
  ];

  // 10. CSS Matching Activity State
  const propertyMatchingItems = [
    { prop: 'padding', purpose: 'Space inside an element' },
    { prop: 'margin', purpose: 'Space outside an element' },
    { prop: 'gap', purpose: 'Space between flex items' },
    { prop: 'border-radius', purpose: 'Rounded corners' },
    { prop: 'box-shadow', purpose: 'Shadow around an element' },
    { prop: 'font-size', purpose: 'Text size' },
    { prop: 'line-height', purpose: 'Space between lines' },
    { prop: ':hover', purpose: 'Style when the pointer is over an element' },
    { prop: '@media', purpose: 'Apply styles based on screen size' }
  ];
  const [matchingSelections, setMatchingSelections] = useState({});
  const [matchingSubmitted, setMatchingSubmitted] = useState(false);

  // 11. Practice Task & AI Audit State
  const [selectedPracticeSection, setSelectedPracticeSection] = useState('hero');
  const [practiceReflectionNote, setPracticeReflectionNote] = useState('');
  const [aiReviewLoading, setAiReviewLoading] = useState(false);
  const [aiReviewResult, setAiReviewResult] = useState(null);

  const handleRunAiAudit = () => {
    setAiReviewLoading(true);
    setTimeout(() => {
      setAiReviewResult({
        strengths: [
          "Color contrast: Dark headings (#0f172a) on light slate background provide clean legibility.",
          "Consistent Spacing: Card padding (24px) creates an inviting, readable layout."
        ],
        improvements: [
          "Hero Button Contrast: Consider darkening secondary button borders for stronger visual hierarchy.",
          "Mobile Stack Spacing: Ensure flex gaps stay at 12px or 16px when stacked vertically on small screens."
        ],
        cssRecommendation: `/* Recommended CSS tweak for cleaner button stacking on mobile */\n@media (max-width: 700px) {\n  .hero-actions .btn {\n    width: 100%;\n    text-align: center;\n  }\n}`
      });
      setAiReviewLoading(false);
    }, 800);
  };

  // 12. Assignment State
  const [assignmentNotes, setAssignmentNotes] = useState({
    originalNote: 'Original Day 10 version had default un-styled buttons and zero card padding.',
    improvedNote: 'Updated background to #f7f7f7, added 24px card padding, box-shadow, and subtle translateY hover.',
    changesList: '1. Applied clear 4-role color palette\n2. Styled reusable .btn class with 8px border-radius\n3. Added 60px section padding\n4. Created basic @media (max-width: 700px) mobile layout',
    mobileNote: 'Tested on 375px mobile viewport. Cards stack cleanly into a single vertical column.',
    biggestImprovement: 'The website transformed from an raw prototype into a polished, professional business landing page.'
  });
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // 13. Quiz State (10 Questions matching syllabus)
  const quizQuestions = [
    { q: "1. What does the CSS padding property do?", opts: ["Creates space outside an element", "Creates space inside an element's border", "Changes line height of text", "Applies shadow around an element"], ans: 1 },
    { q: "2. What does the CSS margin property control?", opts: ["Space inside an element", "Space outside an element", "Space between flex items", "Font boldness"], ans: 1 },
    { q: "3. What does the gap property do in a Flexbox container?", opts: ["Sets margin around the page", "Creates space between flex items", "Reduces padding inside buttons", "Sets image borders"], ans: 1 },
    { q: "4. What visual effect does border-radius create?", opts: ["Adds a drop shadow", "Creates rounded corners on an element", "Sets font size", "Centers text"], ans: 1 },
    { q: "5. What does box-shadow add to a card element?", opts: ["A border color", "A shadow around the element for depth", "Line spacing", "Background gradient"], ans: 1 },
    { q: "6. When is the :hover pseudo-class triggered?", opts: ["When the page finishes loading", "When the mouse pointer hovers over an element", "When an input form is submitted", "When the user scrolls down"], ans: 1 },
    { q: "7. What does the font-size property change?", opts: ["The weight/boldness of text", "The physical size of text", "The line height between paragraphs", "The alignment of text"], ans: 1 },
    { q: "8. What does line-height control in paragraph styling?", opts: ["Space between text characters", "Vertical space between lines of text", "Height of the entire section", "Margin below headings"], ans: 1 },
    { q: "9. Why do web designers use a CSS @media query?", opts: ["To fetch data from a server", "To apply different CSS styles based on screen size", "To embed audio and video", "To create CSS variables"], ans: 1 },
    { q: "10. Why is it important to test a website on mobile screen sizes?", opts: ["To verify text readability, touch button sizing, and prevent horizontal scrolling", "Browsers automatically delete un-tested CSS", "Mobile testing makes HTML load faster", "It converts CSS into JavaScript"], ans: 0 }
  ];

  const [quizAns, setQuizAns] = useState(Array(10).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((qObj, idx) => {
      if (quizAns[idx] === qObj.ans) score++;
    });
    return score;
  };

  // Helper for checking active tab mapping
  const isTabActive = (tabName) => {
    if (tabName === 'intro') {
      return activeTab === 'intro' || !['intro', 'before_after', 'visual', 'colors', 'variables', 'typography', 'spacing', 'flexbox_nav', 'buttons', 'ui_components', 'cards_hero', 'grid_lab', 'responsive', 'guided_build', 'matching', 'comparison', 'practice_ai', 'playground', 'challenges', 'assignment', 'quiz'].includes(activeTab);
    }
    if (tabName === 'before_after') return activeTab === 'before_after' || activeTab === 'visual';
    if (tabName === 'colors') return activeTab === 'colors' || activeTab === 'variables';
    if (tabName === 'typography') return activeTab === 'typography';
    if (tabName === 'spacing') return activeTab === 'spacing' || activeTab === 'flexbox_nav';
    if (tabName === 'buttons') return activeTab === 'buttons' || activeTab === 'ui_components';
    if (tabName === 'cards_hero') return activeTab === 'cards_hero' || activeTab === 'grid_lab';
    if (tabName === 'responsive') return activeTab === 'responsive';
    if (tabName === 'guided_build') return activeTab === 'guided_build';
    if (tabName === 'matching') return activeTab === 'matching';
    if (tabName === 'comparison') return activeTab === 'comparison';
    if (tabName === 'practice_ai') return activeTab === 'practice_ai' || activeTab === 'playground' || activeTab === 'challenges';
    if (tabName === 'assignment') return activeTab === 'assignment';
    if (tabName === 'quiz') return activeTab === 'quiz';
    return false;
  };

  // ==========================================
  // RENDER MAIN COMPONENT
  // ==========================================

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', padding: '1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* TOP HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderRadius: '20px',
        padding: '2rem',
        color: '#ffffff',
        marginBottom: '1.5rem',
        boxShadow: '0 10px 25px -5px rgba(49, 46, 129, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
            <Sparkles size={14} color="#fbbf24" />
            DAY 11 • INTERMEDIATE LESSON
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
            Day 11 — Improve Your Existing Website with Simple CSS
          </h1>
          <p style={{ fontSize: '1rem', color: '#c7d2fe', margin: 0, lineHeight: 1.6 }}>
            Refine your Mini Project website's visual quality using practical CSS! Enhance color palettes, typography, section spacing, styled buttons, card shadows, hover effects, hero section, and basic responsive layouts.
          </p>
        </div>

        <button
          onClick={() => openAITutor && openAITutor("Help me improve my website CSS with colors, spacing, typography, button hover effects, and basic mobile media queries!")}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)',
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={18} /> Ask AI Tutor
        </button>
      </div>

      {/* PRACTICAL LEARNING FLOW BANNER */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Lesson Flow:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.84rem', fontWeight: 800 }}>
          <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '8px' }}>LEARN</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#faf5ff', color: '#7e22ce', padding: '4px 12px', borderRadius: '8px' }}>SEE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '8px' }}>MODIFY</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fff7ed', color: '#ea580c', padding: '4px 12px', borderRadius: '8px' }}>BUILD</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fdf2f8', color: '#db2777', padding: '4px 12px', borderRadius: '8px' }}>TEST</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#ffffff', padding: '4px 12px', borderRadius: '8px' }}>REVIEW</span>
        </div>
      </div>

      {/* MAIN CONTENT TAB ROUTER */}
      <div>

        {/* ==================== TAB 1: REVIEW EXISTING WEBSITE ==================== */}
        {isTabActive('intro') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                1. Review the Existing Website
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                "Today we are not building a new website. We are improving the website we already created."
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
                Open the Mini Project website created during previous days. Before writing new styles, inspect the visual presentation of your existing page:
              </p>

              {/* 7 Areas Review Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'colors', name: '🎨 Main Colors', desc: 'Are colors plain default or harmonious?' },
                  { id: 'typography', name: '🔤 Heading & Paragraph Styles', desc: 'Is typography readable with strong contrast?' },
                  { id: 'spacing', name: '📐 Section Spacing', desc: 'Does content feel crowded or properly padded?' },
                  { id: 'buttons', name: '🔘 Button Styles', desc: 'Are buttons styled consistently with hover states?' },
                  { id: 'cards', name: '🃏 Card Styles', desc: 'Do cards have borders, padding, and subtle shadows?' },
                  { id: 'hero', name: '🚀 Hero Section', desc: 'Is the hero balanced with clear button spacing?' },
                  { id: 'mobile', name: '📱 Mobile Layout', desc: 'Does content stack nicely on smaller screens?' }
                ].map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setUnfinishedAreas(prev => ({ ...prev, [area.id]: !prev[area.id] }))}
                    style={{
                      background: unfinishedAreas[area.id] ? '#eff6ff' : '#f8fafc',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: unfinishedAreas[area.id] ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e1b4b' }}>{area.name}</div>
                      <input type="checkbox" checked={unfinishedAreas[area.id]} onChange={() => {}} style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>{area.desc}</div>
                  </div>
                ))}
              </div>

              {/* Core Question Box */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  # “What makes this website look unfinished?”
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                  Select at least 3 areas above that need improvement, then note your observations below:
                </p>
                <textarea
                  rows={3}
                  value={studentReviewNote}
                  onChange={(e) => setStudentReviewNote(e.target.value)}
                  placeholder="e.g. Buttons lack hover states, cards touch the edges without padding, and text is too close on mobile screen sizes..."
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #475569', background: '#1e293b', color: '#ffffff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
                {Object.values(unfinishedAreas).filter(Boolean).length >= 3 && (
                  <div style={{ marginTop: '10px', color: '#34d399', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={16} /> Great job! You identified 3+ areas needing improvement.
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('before_after')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Before &amp; After Preview <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: BEFORE & AFTER PREVIEW ==================== */}
        {isTabActive('before_after') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    2. Before and After Preview
                  </span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                    Visual Quality Transformation
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                  <button
                    onClick={() => setPreviewMode('before')}
                    style={{
                      background: previewMode === 'before' ? '#ef4444' : 'transparent',
                      color: previewMode === 'before' ? '#ffffff' : '#64748b',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Before (Raw Website)
                  </button>
                  <button
                    onClick={() => setPreviewMode('after')}
                    style={{
                      background: previewMode === 'after' ? '#10b981' : 'transparent',
                      color: previewMode === 'after' ? '#ffffff' : '#64748b',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    After (Improved CSS)
                  </button>
                </div>
              </div>

              {/* Comparison Matrix Table */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '14px', border: '1px solid #fca5a5' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#991b1b', margin: '0 0 0.75rem 0' }}>❌ BEFORE (Unfinished)</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#7f1d1d', lineHeight: 1.7 }}>
                    <li>Plain default colors (#ffffff bg, black text)</li>
                    <li>Uneven spacing &amp; crowded content</li>
                    <li>Basic default buttons (no border-radius)</li>
                    <li>Simple unbordered cards touching edges</li>
                    <li>Weak typography without line-height</li>
                    <li>No hover visual feedback on elements</li>
                    <li>Poor mobile spacing &amp; squeezed layouts</li>
                  </ul>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '14px', border: '1px solid #86efac' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#166534', margin: '0 0 0.75rem 0' }}>✨ AFTER (Polished CSS)</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#14532d', lineHeight: 1.7 }}>
                    <li>Clear 4-color palette (#f7f7f7, #111827, #2563eb)</li>
                    <li>Consistent 60px section padding &amp; 20px gap</li>
                    <li>Styled buttons with 8px radius &amp; subtle hover</li>
                    <li>Improved cards with border &amp; box-shadow</li>
                    <li>Better typography (16px base, 1.6 line-height)</li>
                    <li>Subtle hover effects (translateY -4px)</li>
                    <li>Clean mobile layout with column stacking</li>
                  </ul>
                </div>
              </div>

              {/* Interactive Frame Rendering */}
              <div style={{ background: previewMode === 'before' ? '#ffffff' : '#f7f7f7', border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '2rem', transition: 'all 0.3s ease' }}>
                {previewMode === 'before' ? (
                  <div>
                    <h1 style={{ color: '#000', fontSize: '28px', fontFamily: 'serif', margin: '0 0 10px 0' }}>My Business Webpage</h1>
                    <p style={{ color: '#000', fontSize: '14px', margin: '0 0 15px 0' }}>Welcome to our website. We provide quality services for all customers.</p>
                    <button style={{ background: 'blue', color: 'white', border: 'none', padding: '4px 8px' }}>Click Here</button>
                    <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
                      <h3 style={{ margin: '0 0 5px 0' }}>Service 1</h3>
                      <p style={{ margin: 0, fontSize: '12px' }}>This card has text touching edges with no padding or rounded corners.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
                      <h1 style={{ color: '#111827', fontSize: '42px', fontWeight: 700, lineHeight: 1.1, margin: '0 0 16px 0', fontFamily: 'system-ui, sans-serif' }}>
                        Modern Digital Agency
                      </h1>
                      <p style={{ color: '#4b5563', fontSize: '18px', lineHeight: 1.6, margin: '0 0 24px 0', fontFamily: 'system-ui, sans-serif' }}>
                        We design high-converting web applications with clean typography, consistent spacing, and vibrant visual hierarchy.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}>
                          Explore Services
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
                      {['Web Design', 'SEO Strategy', 'Brand System'].map((title, i) => (
                        <div key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                          <h3 style={{ margin: '0 0 8px 0', color: '#111827', fontSize: '18px' }}>{title}</h3>
                          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', lineHeight: 1.5 }}>
                            Content now has ample breathing room, elegant rounded borders, and subtle drop shadows.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('colors')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Improve Colors &amp; Practice <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: IMPROVE COLORS ==================== */}
        {isTabActive('colors') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                3. Improve Colors &amp; Color Practice
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Mastering the 4-Role Color Palette
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Choose a simple color palette consisting of four distinct roles (do not introduce CSS variables yet):
              </p>

              {/* 4 Palette Pillars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.85rem' }}>1. Page Background</span>
                  <code style={{ display: 'block', margin: '4px 0', fontSize: '0.8rem', color: '#0f172a' }}>background-color: #f7f7f7;</code>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.85rem' }}>2. Text Color</span>
                  <code style={{ display: 'block', margin: '4px 0', fontSize: '0.8rem', color: '#0f172a' }}>color: #222222;</code>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.85rem' }}>3. Heading Color</span>
                  <code style={{ display: 'block', margin: '4px 0', fontSize: '0.8rem', color: '#0f172a' }}>color: #111827;</code>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.85rem' }}>4. Button / Accent</span>
                  <code style={{ display: 'block', margin: '4px 0', fontSize: '0.8rem', color: '#0f172a' }}>background-color: #2563eb;</code>
                </div>
              </div>

              {/* Color Practice Editor */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    🎨 Live Color Practice Studio
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => { setPageBgColor('#f7f7f7'); setTextColor('#222222'); setHeadingColor('#111827'); setButtonColor('#2563eb'); setCardBgColor('#ffffff'); }}
                      style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <RotateCcw size={14} /> Reset
                    </button>
                    <button
                      onClick={() => setShowColorHint(!showColorHint)}
                      style={{ background: '#334155', color: '#fbbf24', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Hint
                    </button>
                    <button
                      onClick={() => setShowColorSol(!showColorSol)}
                      style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Show Solution
                    </button>
                  </div>
                </div>

                {showColorHint && (
                  <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: '8px', color: '#fbbf24', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid #f59e0b' }}>
                    💡 Hint: Choose a soft off-white background (#f7f7f7 or #f8fafc) and a strong dark heading color (#111827) for optimal visual hierarchy.
                  </div>
                )}

                {showColorSol && (
                  <div style={{ background: '#064e3b', padding: '10px 14px', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid #10b981' }}>
                    ✅ Solution Palette: Body BG: <code>#f7f7f7</code> | Text: <code>#222222</code> | Heading: <code>#111827</code> | Button: <code>#2563eb</code> | Card: <code>#ffffff</code>
                  </div>
                )}

                {/* Color Pickers Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Page Background</label>
                    <input type="color" value={pageBgColor} onChange={(e) => setPageBgColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Text Color</label>
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Heading Color</label>
                    <input type="color" value={headingColor} onChange={(e) => setHeadingColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Button Color</label>
                    <input type="color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Card Background</label>
                    <input type="color" value={cardBgColor} onChange={(e) => setCardBgColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                  </div>
                </div>

                {/* Live Result Frame */}
                <div style={{ background: pageBgColor, color: textColor, padding: '1.5rem', borderRadius: '12px', transition: 'all 0.2s ease' }}>
                  <h3 style={{ color: headingColor, marginTop: 0, fontSize: '1.4rem' }}>Live Color Palette Preview</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                    This text updates instantly based on your chosen colors. High contrast ensures readability!
                  </p>
                  <div style={{ background: cardBgColor, padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <h4 style={{ color: headingColor, margin: '0 0 4px 0' }}>Card Title Sample</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Card background and border colors working together.</p>
                  </div>
                  <button style={{ backgroundColor: buttonColor, color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                    Sample Button
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('typography')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Typography Visualizer <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: IMPROVE TYPOGRAPHY ==================== */}
        {isTabActive('typography') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                4. Improve Typography
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Typography Visualizer &amp; Properties
              </h2>

              {/* 5 Core Typography Properties */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.9rem' }}>font-family</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Changes the typeface (e.g. Arial, sans-serif)</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.9rem' }}>font-size</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Changes the size of text (e.g. 42px)</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.9rem' }}>font-weight</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Changes how bold text appears (e.g. 700)</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.9rem' }}>line-height</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Changes vertical space between lines (e.g. 1.6)</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.9rem' }}>text-align</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Controls alignment (left, center, right)</div>
                </div>
              </div>

              {/* Typography Visualizer Controls */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  🔤 Interactive Typography Visualizer
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Heading Size: {headingSize}px</label>
                    <input type="range" min="24" max="64" value={headingSize} onChange={(e) => setHeadingSize(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Paragraph Size: {paragraphSize}px</label>
                    <input type="range" min="12" max="24" value={paragraphSize} onChange={(e) => setParagraphSize(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Heading Weight</label>
                    <select value={headingWeight} onChange={(e) => setHeadingWeight(e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }}>
                      <option value="400">400 (Normal)</option>
                      <option value="600">600 (Semi-Bold)</option>
                      <option value="700">700 (Bold)</option>
                      <option value="900">900 (Extra Bold)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Text Align</label>
                    <select value={textAlign} onChange={(e) => setTextAlign(e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Line Height: {lineHeight}</label>
                    <input type="range" min="1.0" max="2.2" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Typography Live Result Box */}
                <div style={{ background: '#ffffff', color: '#111827', padding: '1.5rem', borderRadius: '12px' }}>
                  <h1 style={{ fontSize: `${headingSize}px`, fontWeight: headingWeight, textAlign: textAlign, lineHeight: 1.1, margin: '0 0 12px 0', fontFamily: 'Arial, sans-serif' }}>
                    Beautiful Typography Title
                  </h1>
                  <p style={{ fontSize: `${paragraphSize}px`, lineHeight: lineHeight, textAlign: textAlign, margin: 0, color: '#374151', fontFamily: 'Arial, sans-serif' }}>
                    Good typography makes your content easy to scan and pleasant to read. Adjusting font-size, line-height, and weight gives your text structure and hierarchy.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('spacing')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Spacing Demonstration <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: IMPROVE SPACING ==================== */}
        {isTabActive('spacing') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                5. Improve Spacing
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Margin, Padding &amp; Gap
              </h2>

              {/* 3 Core Spacing Rules */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#2563eb', fontSize: '1rem' }}>padding</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>Creates space <strong>inside</strong> an element (e.g. text breathing room inside a card).</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#2563eb', fontSize: '1rem' }}>margin</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>Creates space <strong>outside</strong> an element (e.g. pushing sections apart).</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#2563eb', fontSize: '1rem' }}>gap</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569' }}>Creates space <strong>between</strong> items in a Flexbox container.</p>
                </div>
              </div>

              {/* Spacing Interactive Demonstration */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    📐 Spacing Demonstration: Card Before &amp; After
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', background: '#1e293b', padding: '4px', borderRadius: '8px' }}>
                    <button
                      onClick={() => setSpacingViewMode('before')}
                      style={{ background: spacingViewMode === 'before' ? '#ef4444' : 'transparent', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Before Spacing
                    </button>
                    <button
                      onClick={() => setSpacingViewMode('after')}
                      style={{ background: spacingViewMode === 'after' ? '#10b981' : 'transparent', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      After Spacing
                    </button>
                  </div>
                </div>

                <div style={{ background: '#ffffff', color: '#0f172a', borderRadius: '8px', padding: '1.5rem' }}>
                  {spacingViewMode === 'before' ? (
                    <div>
                      <div style={{ background: '#e2e8f0', border: '1px solid #94a3b8', padding: '0px', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0 }}>Card 1 (No Padding)</h4>
                        <p style={{ margin: 0 }}>Text touches the edges directly. Cards are squeezed together.</p>
                      </div>
                      <div style={{ background: '#e2e8f0', border: '1px solid #94a3b8', padding: '0px' }}>
                        <h4 style={{ margin: 0 }}>Card 2 (No Margin/Gap)</h4>
                        <p style={{ margin: 0 }}>Sections feel crowded and difficult to read.</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#111827' }}>Card 1 (24px Padding)</h4>
                        <p style={{ margin: 0, color: '#4b5563', fontSize: '0.88rem', lineHeight: 1.6 }}>Content has breathing room inside the card.</p>
                      </div>
                      <div style={{ flex: 1, minWidth: '200px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#111827' }}>Card 2 (20px Gap)</h4>
                        <p style={{ margin: 0, color: '#4b5563', fontSize: '0.88rem', lineHeight: 1.6 }}>Consistent spacing makes cards easy to scan.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('buttons')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Style Buttons &amp; Practice Editor <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: STYLE BUTTONS ==================== */}
        {isTabActive('buttons') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                6. Style Buttons
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Consistent Button Styling &amp; Subtle Hover Effects
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Buttons should look consistent, be easy to identify, and respond when users hover over them:
              </p>

              {/* Button Practice Editor */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    🔘 Live Button Style Editor
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => { setBtnBgColor('#2563eb'); setBtnTextColor('#ffffff'); setBtnPaddingY(12); setBtnPaddingX(20); setBtnBorderRadius(8); setBtnHoverBgColor('#1d4ed8'); }}
                      style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Reset
                    </button>
                    <button onClick={() => setShowBtnHint(!showBtnHint)} style={{ background: '#334155', color: '#fbbf24', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Hint</button>
                    <button onClick={() => setShowBtnSol(!showBtnSol)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Show Solution</button>
                  </div>
                </div>

                {showBtnHint && <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', color: '#fbbf24', fontSize: '0.85rem', marginBottom: '1rem' }}>💡 Hint: Use 12px 20px padding with an 8px border-radius and a slightly darker hover shade.</div>}
                {showBtnSol && <div style={{ background: '#064e3b', padding: '10px', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.85rem', marginBottom: '1rem' }}>✅ Solution: <code>padding: 12px 20px; border-radius: 8px; background-color: #2563eb; color: white;</code></div>}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Background Color</label>
                    <input type="color" value={btnBgColor} onChange={(e) => setBtnBgColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Text Color</label>
                    <input type="color" value={btnTextColor} onChange={(e) => setBtnTextColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Padding Y: {btnPaddingY}px</label>
                    <input type="range" min="6" max="24" value={btnPaddingY} onChange={(e) => setBtnPaddingY(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Border Radius: {btnBorderRadius}px</label>
                    <input type="range" min="0" max="30" value={btnBorderRadius} onChange={(e) => setBtnBorderRadius(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Hover Background</label>
                    <input type="color" value={btnHoverBgColor} onChange={(e) => setBtnHoverBgColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', border: 'none', cursor: 'pointer' }} />
                  </div>
                </div>

                {/* Live Button Test Box */}
                <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
                  <button
                    onMouseEnter={() => setIsBtnHovered(true)}
                    onMouseLeave={() => setIsBtnHovered(false)}
                    style={{
                      display: 'inline-block',
                      padding: `${btnPaddingY}px ${btnPaddingX}px`,
                      border: 'none',
                      borderRadius: `${btnBorderRadius}px`,
                      backgroundColor: isBtnHovered ? btnHoverBgColor : btnBgColor,
                      color: btnTextColor,
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 600,
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    {isBtnHovered ? 'Hovered State! ✨' : 'Hover Over Me'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('cards_hero')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Cards, Hero &amp; Sections <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 7: CARDS, HERO & SECTIONS ==================== */}
        {isTabActive('cards_hero') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                7 - 9. Cards, Hero Section &amp; Existing Sections
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Styling Core Content Components
              </h2>

              {/* 7. Style Cards */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1e1b4b', fontSize: '1.1rem' }}>7. Style Cards</h3>
                <LiveSyntaxCodeEditor
                  language="css"
                  rows={9}
                  value={`.card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}`}
                />
              </div>

              {/* 8. Hero Section */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1e1b4b', fontSize: '1.1rem' }}>8. Improve the Hero Section</h3>
                <LiveSyntaxCodeEditor
                  language="css"
                  rows={11}
                  value={`.hero {
  padding: 80px 20px;
}

.hero-content {
  max-width: 650px;
  margin: 0 auto;
  text-align: center;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}`}
                />
              </div>

              {/* 9. Section Review Checklist */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  9. Quality Review Checklist for All Sections
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {['About', 'Services', 'Projects', 'Testimonials', 'Pricing', 'Contact'].map((secKey) => (
                    <div key={secKey} style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
                      <div style={{ fontWeight: 800, color: '#fbbf24', marginBottom: '6px' }}>{secKey} Section</div>
                      <div style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label><input type="checkbox" defaultChecked /> Clear Heading</label>
                        <label><input type="checkbox" defaultChecked /> Consistent Spacing</label>
                        <label><input type="checkbox" defaultChecked /> Aligned Cards</label>
                        <label><input type="checkbox" defaultChecked /> Styled Buttons</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('responsive')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Responsive Mobile Layout &amp; Testing <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 8: RESPONSIVE & MOBILE TESTING ==================== */}
        {isTabActive('responsive') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                10 - 11. Simple Responsive Layout &amp; Mobile Testing
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Basic Mobile Media Query &amp; Breakpoint Viewport Tester
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Do not introduce advanced responsive CSS or complex JavaScript yet. Teach one basic media query for mobile screens:
              </p>

              <LiveSyntaxCodeEditor
                language="css"
                rows={12}
                value={`@media (max-width: 700px) {
  .card-list {
    flex-direction: column;
  }

  h1 {
    font-size: 32px;
  }

  section {
    padding: 40px 16px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
}`}
              />

              {/* Viewport Preview Tool */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    📱 Viewport Testing Simulator
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setViewportWidth('desktop')} style={{ background: viewportWidth === 'desktop' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Monitor size={14} /> Desktop (1200px)
                    </button>
                    <button onClick={() => setViewportWidth('tablet')} style={{ background: viewportWidth === 'tablet' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Tablet size={14} /> Tablet (768px)
                    </button>
                    <button onClick={() => setViewportWidth('mobile')} style={{ background: viewportWidth === 'mobile' ? '#2563eb' : '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Smartphone size={14} /> Mobile (375px)
                    </button>
                  </div>
                </div>

                {/* Resizable Preview Container */}
                <div style={{ background: '#f8fafc', color: '#0f172a', borderRadius: '12px', padding: '1.5rem', margin: '0 auto', width: viewportWidth === 'mobile' ? '375px' : viewportWidth === 'tablet' ? '768px' : '100%', transition: 'all 0.3s ease', boxSizing: 'border-box', overflowX: 'auto' }}>
                  <h1 style={{ fontSize: viewportWidth === 'mobile' ? '28px' : '42px', margin: '0 0 10px 0', color: '#111827' }}>Responsive Heading</h1>
                  <div style={{ display: 'flex', flexDirection: viewportWidth === 'mobile' ? 'column' : 'row', gap: '16px' }}>
                    <div style={{ flex: 1, background: '#fff', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '8px' }}>Card Item 1</div>
                    <div style={{ flex: 1, background: '#fff', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '8px' }}>Card Item 2</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('guided_build')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Guided Build (11 Steps) <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 9: GUIDED BUILD (11 STEPS) ==================== */}
        {isTabActive('guided_build') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    12. Guided Build Activity
                  </span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                    Make Your Website Look Better
                  </h2>
                </div>
                <div style={{ background: '#eff6ff', color: '#2563eb', padding: '8px 16px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem', border: '1px solid #bfdbfe' }}>
                  Progress: {completedSteps.filter(Boolean).length}/11 Steps Completed
                </div>
              </div>

              {/* Steps Progress Bar */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
                {guidedStepsList.map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGuidedStep(idx)}
                    style={{
                      background: guidedStep === idx ? '#2563eb' : completedSteps[idx] ? '#10b981' : '#f1f5f9',
                      color: guidedStep === idx || completedSteps[idx] ? '#ffffff' : '#64748b',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    Step {idx + 1}
                  </button>
                ))}
              </div>

              {/* Step Detail Card */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', margin: '0 0 0.5rem 0', fontWeight: 800 }}>
                  {guidedStepsList[guidedStep].title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  {guidedStepsList[guidedStep].desc}
                </p>

                <LiveSyntaxCodeEditor
                  language="css"
                  rows={8}
                  value={guidedCodes[guidedStep]}
                  onChange={(e) => {
                    const newArr = [...guidedCodes];
                    newArr[guidedStep] = e.target.value;
                    setGuidedCodes(newArr);
                  }}
                  label={`Step ${guidedStep + 1} CSS Implementation`}
                />

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    onClick={() => {
                      const newComp = [...completedSteps];
                      newComp[guidedStep] = true;
                      setCompletedSteps(newComp);
                      if (guidedStep < 10) setGuidedStep(guidedStep + 1);
                    }}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <CheckCircle size={16} /> Mark Step Complete &amp; Continue
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {guidedStep > 0 && (
                      <button onClick={() => setGuidedStep(guidedStep - 1)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                        Previous Step
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('matching')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: CSS Property Matching Activity <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 10: CSS MATCHING ACTIVITY ==================== */}
        {isTabActive('matching') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                13. CSS Property Matching Activity
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Match Each Property with Its Correct Purpose
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {propertyMatchingItems.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <code style={{ fontSize: '1rem', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>{item.prop}</code>
                    <select
                      value={matchingSelections[item.prop] || ''}
                      onChange={(e) => setMatchingSelections({ ...matchingSelections, [item.prop]: e.target.value })}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #94a3b8', background: '#fff', fontSize: '0.88rem', cursor: 'pointer', flex: 1, maxWidth: '350px' }}
                    >
                      <option value="">-- Select Purpose --</option>
                      {propertyMatchingItems.map((p, i) => (
                        <option key={i} value={p.purpose}>{p.purpose}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => setMatchingSubmitted(true)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Check Answers
                </button>
                {matchingSubmitted && (
                  <span style={{ fontWeight: 800, color: '#10b981', fontSize: '0.95rem' }}>
                    🎉 Great job matching CSS properties to their purposes!
                  </span>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('comparison')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Before &amp; After Comparison <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 11: BEFORE & AFTER COMPARISON ==================== */}
        {isTabActive('comparison') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                14 &amp; 21. Before &amp; After Comparison &amp; Project Continuity
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Side-by-Side Version Comparison
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
                Compare Day 10 original version with Day 11 improved version. Both versions are preserved without deleting the original!
              </p>

              {/* Side-by-Side Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#ef4444' }}>Day 10 Original Version</h3>
                  <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 4px 0', fontFamily: 'serif' }}>Raw Header</h4>
                    <button style={{ background: 'blue', color: 'white', padding: '4px' }}>Submit</button>
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '14px', border: '1px solid #86efac' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#10b981' }}>Day 11 Improved Version</h3>
                  <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#111827' }}>Polished Hero Header</h4>
                    <button style={{ background: '#2563eb', color: 'white', padding: '10px 18px', borderRadius: '8px', border: 'none' }}>Get Started</button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('practice_ai')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Practice Task &amp; AI Review <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 12: PRACTICE & AI REVIEW ==================== */}
        {isTabActive('practice_ai') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                15 &amp; 16. Practice Task &amp; AI Review Activity
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Improve One Section &amp; Get Instant AI Feedback
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  Select Section to Improve:
                </label>
                <select
                  value={selectedPracticeSection}
                  onChange={(e) => setSelectedPracticeSection(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', background: '#fff', width: '240px' }}
                >
                  <option value="hero">Hero Section</option>
                  <option value="about">About Section</option>
                  <option value="services">Services Section</option>
                  <option value="projects">Projects Section</option>
                  <option value="testimonials">Testimonials Section</option>
                  <option value="pricing">Pricing Section</option>
                  <option value="contact">Contact Section</option>
                </select>
              </div>

              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', margin: '0 0 1rem 0', fontWeight: 800 }}>
                  🤖 Request AI Code &amp; Visual Review
                </h3>
                <button
                  onClick={handleRunAiAudit}
                  disabled={aiReviewLoading}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Sparkles size={16} /> {aiReviewLoading ? 'Analyzing Code...' : 'Submit Section for AI Review'}
                </button>

                {aiReviewResult && (
                  <div style={{ marginTop: '1.25rem', background: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                    <h4 style={{ color: '#34d399', margin: '0 0 8px 0' }}>Strengths</h4>
                    <ul style={{ margin: '0 0 12px 0', paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                      {aiReviewResult.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>

                    <h4 style={{ color: '#fbbf24', margin: '0 0 8px 0' }}>Improvement Suggestions</h4>
                    <ul style={{ margin: '0 0 12px 0', paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                      {aiReviewResult.improvements.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>

                    <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>Specific CSS Recommendation</h4>
                    <pre style={{ background: '#090d16', padding: '12px', borderRadius: '8px', color: '#f8fafc', fontSize: '0.82rem', margin: 0 }}>
                      {aiReviewResult.cssRecommendation}
                    </pre>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('assignment')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Day 11 Assignment <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 13: DAY 11 ASSIGNMENT ==================== */}
        {isTabActive('assignment') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                17. Day 11 Assignment
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Assignment — Website Style Improvement
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
                Submit your updated Mini Project documentation containing before/after notes and mobile responsiveness checks:
              </p>

              {/* Assignment Form */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e1b4b', display: 'block', marginBottom: '4px' }}>
                      1. Original Version Note / Screenshot Reference:
                    </label>
                    <input type="text" value={assignmentNotes.originalNote} onChange={(e) => setAssignmentNotes({ ...assignmentNotes, originalNote: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #94a3b8', fontSize: '0.88rem' }} />
                  </div>

                  <div>
                    <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e1b4b', display: 'block', marginBottom: '4px' }}>
                      2. Improved Version Note / Screenshot Reference:
                    </label>
                    <input type="text" value={assignmentNotes.improvedNote} onChange={(e) => setAssignmentNotes({ ...assignmentNotes, improvedNote: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #94a3b8', fontSize: '0.88rem' }} />
                  </div>

                  <div>
                    <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e1b4b', display: 'block', marginBottom: '4px' }}>
                      3. Short List of Changes Made:
                    </label>
                    <textarea rows={3} value={assignmentNotes.changesList} onChange={(e) => setAssignmentNotes({ ...assignmentNotes, changesList: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #94a3b8', fontSize: '0.88rem' }} />
                  </div>

                  <div>
                    <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e1b4b', display: 'block', marginBottom: '4px' }}>
                      4. Mobile Viewport Screenshot Note:
                    </label>
                    <input type="text" value={assignmentNotes.mobileNote} onChange={(e) => setAssignmentNotes({ ...assignmentNotes, mobileNote: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #94a3b8', fontSize: '0.88rem' }} />
                  </div>

                  <div>
                    <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e1b4b', display: 'block', marginBottom: '4px' }}>
                      5. One Sentence Describing Biggest Improvement:
                    </label>
                    <input type="text" value={assignmentNotes.biggestImprovement} onChange={(e) => setAssignmentNotes({ ...assignmentNotes, biggestImprovement: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #94a3b8', fontSize: '0.88rem' }} />
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <button
                    onClick={() => setAssignmentSubmitted(true)}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Send size={16} /> Submit Day 11 Assignment
                  </button>
                  {assignmentSubmitted && (
                    <div style={{ marginTop: '10px', color: '#10b981', fontWeight: 800, fontSize: '0.9rem' }}>
                      🎉 Day 11 Assignment submitted successfully! Staff review recorded.
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('quiz')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Knowledge Check &amp; Progress <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 14: QUIZ, COMPLETION & PROGRESS ==================== */}
        {isTabActive('quiz') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* 18. Knowledge Check */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                18. Knowledge Check
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1.25rem 0' }}>
                Day 11 Quiz (10 Questions)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {quizQuestions.map((qObj, qIdx) => (
                  <div key={qIdx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e1b4b', marginBottom: '10px' }}>
                      {qObj.q}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                      {qObj.opts.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            const newAns = [...quizAns];
                            newAns[qIdx] = oIdx;
                            setQuizAns(newAns);
                          }}
                          style={{
                            textAlign: 'left',
                            background: quizAns[qIdx] === oIdx ? (quizSubmitted ? (oIdx === qObj.ans ? '#dcfce7' : '#fee2e2') : '#dbeafe') : '#ffffff',
                            color: quizAns[qIdx] === oIdx ? (quizSubmitted ? (oIdx === qObj.ans ? '#166534' : '#991b1b') : '#1e40af') : '#334155',
                            border: quizAns[qIdx] === oIdx ? '2px solid #2563eb' : '1px solid #cbd5e1',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => setQuizSubmitted(true)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Submit Quiz
                </button>
                {quizSubmitted && (
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>
                    Score: {calculateScore()} / 10 ({Math.round((calculateScore() / 10) * 100)}%)
                  </div>
                )}
              </div>
            </div>

            {/* 19. Completion Screen */}
            <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', borderRadius: '20px', padding: '2rem', color: '#ffffff', boxShadow: '0 10px 25px rgba(4, 120, 87, 0.3)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.75rem 0' }}>
                🎉 Website Style Improvement Completed!
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#a7f3d0', marginBottom: '1rem' }}>
                Today you learned:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.88rem' }}>
                {['Colors', 'Typography', 'Spacing', 'Buttons', 'Cards', 'Hover effects', 'Hero improvements', 'Basic responsive CSS', 'Mobile testing', 'Visual review'].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={16} color="#6ee7b7" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 20. Course Progress Screen */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Course Progress: DAY 11 / 20
                </h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2563eb' }}>55% Completed</span>
              </div>

              {/* Progress Bar */}
              <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '12px', width: '100%', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #2563eb, #10b981)', height: '100%', width: '55%', borderRadius: '10px' }} />
              </div>

              {/* Completed Days Checklist */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
                {[
                  "Day 1 ✓ Website & Layout",
                  "Day 2 ✓ Navbar",
                  "Day 3 ✓ Hero",
                  "Day 4 ✓ About",
                  "Day 5 ✓ Services",
                  "Day 6 ✓ Projects",
                  "Day 7 ✓ Testimonials",
                  "Day 8 ✓ Pricing",
                  "Day 9 ✓ Contact & Forms",
                  "Day 10 ✓ Mini Project 1",
                  "Day 11 ✓ Website Style Improvement"
                ].map((d, i) => (
                  <div key={i} style={{ background: '#f0fdf4', color: '#166534', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid #bbf7d0' }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Day 12 Next Preview */}
              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Next Up:</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e40af', margin: '4px 0 6px 0' }}>
                  DAY 12 — INTRODUCTION TO JAVASCRIPT
                </h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#1e3a8a' }}>
                  Learn Variables, Buttons, Click events, Simple interactions, and Changing text on a page!
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
