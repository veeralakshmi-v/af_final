import React, { useState, useEffect } from 'react';
import { 
  BookOpen, MonitorPlay, LayoutGrid, Layers, Code, PenTool,
  Briefcase, Sparkles, CheckCircle, Trophy, ChevronRight, 
  ArrowRight, Lightbulb, RefreshCw, Terminal, Eye, Sliders, Menu, X, Play, HelpCircle
} from 'lucide-react';

export default function WebDesignDay3({ activeTab: propActiveTab = 'intro', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'intro');

  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day3', tabId);
    }
  };

  const isTabActive = (tabName) => {
    const validTabs = ['intro', 'visual', 'html_build', 'css_layout', 'typography_cta', 'responsive', 'guided_build', 'playground', 'challenges', 'assignment', 'quiz'];
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
    challenges: 0,
    assignment: false,
    aiChallenge: false,
    quiz: false
  });

  // --- Section 3: Visual Result Toggle ---
  const [showTargetCodeBreakdown, setShowTargetCodeBreakdown] = useState(false);
  const [targetCodeTab, setTargetCodeTab] = useState('html');

  // --- Section 4: Hero Section Explorer State ---
  const [selectedExplorerItem, setSelectedExplorerItem] = useState('headline');

  // --- Section 5: Business Goal & CTA Selection ---
  const [selectedBusinessGoal, setSelectedBusinessGoal] = useState('training');

  // --- Section 6: HTML Hero Incremental Build Step ---
  const [htmlBuildStep, setHtmlBuildStep] = useState(1);

  // --- Section 10 & 11: Typography Heading Editor State ---
  const [headingFontSize, setHeadingFontSize] = useState(2.5); // rem
  const [headingFontWeight, setHeadingFontWeight] = useState(900);
  const [headingLineHeight, setHeadingLineHeight] = useState(1.2);
  const [headingMaxWidth, setHeadingMaxWidth] = useState(650); // px

  // --- Section 12: CTA Button Interactive Hover States ---
  const [isHoveredBasic, setIsHoveredBasic] = useState(false);
  const [isHoveredPro, setIsHoveredPro] = useState(false);

  // --- Section 13: Visual Hierarchy Selected Version ---
  const [selectedHierarchyVersion, setSelectedHierarchyVersion] = useState('B');

  // --- Section 15: Background Design Options ---
  const [bgStyleOption, setBgStyleOption] = useState('gradient'); // 'plain' | 'gradient' | 'soft'

  // --- Section 19: Hero Responsive Tester State ---
  const [responsiveDevice, setResponsiveDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // --- Section 20: Live Code Playground State ---
  const [playgroundHtml, setPlaygroundHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alpha Fly Theni - Hero Section</title>
</head>
<body>

  <!-- Day 2 Navbar -->
  <header style="display:flex; justify-content:space-between; align-items:center; background:#1e1b4b; padding:1rem 2rem; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly Theni</div>
    <nav style="display:flex; gap:1rem; font-size:0.9rem;">
      <a href="#" style="color:#cbd5e1; text-decoration:none;">Home</a>
      <a href="#" style="color:#cbd5e1; text-decoration:none;">About</a>
    </nav>
  </header>

  <!-- Day 3 Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <span class="eyebrow">AI-POWERED LEARNING</span>
      <h1>Build Job-Ready Digital Skills</h1>
      <p>Practical hands-on web development training designed for students in Theni to build real responsive business projects.</p>
      <div class="hero-ctas">
        <a href="#courses" class="btn-primary">Explore Courses</a>
        <a href="#contact" class="btn-secondary">Contact Us</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="visual-card">🚀 100% Practical IT Training</div>
    </div>
  </section>

</body>
</html>`);

  const [playgroundCss, setPlaygroundCss] = useState(`.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  color: white;
  border-radius: 20px;
}
.eyebrow { font-size: 0.8rem; font-weight: 800; color: #60a5fa; letter-spacing: 1px; }
h1 { font-size: 2.5rem; font-weight: 900; line-height: 1.2; margin: 0.5rem 0 1rem 0; color: #ffffff; }
p { font-size: 1.05rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.8rem; }
.hero-ctas { display: flex; gap: 1rem; }
.btn-primary { background: #2563eb; color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-decoration: none; transition: all 0.3s; }
.btn-primary:hover { background: #1d4ed8; transform: translateY(-2px); }
.btn-secondary { background: rgba(255,255,255,0.1); color: white; padding: 12px 24px; border-radius: 10px; font-weight: bold; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); }
.visual-card { background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); text-align: center; font-weight: bold; }`);

  // --- Section 21: Guided Build Stages (10 Stages) ---
  const [guidedBuildStage, setGuidedBuildStage] = useState(1);

  // --- Section 22: Predict The Output State ---
  const [predictionAnswer, setPredictionAnswer] = useState(null);
  const [showPredictionResult, setShowPredictionResult] = useState(false);

  // --- Section 23: Debugging Challenge State ---
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugAnswer, setShowDebugAnswer] = useState(false);

  // --- Section 24: Day 3 Practice Business Selection ---
  const [selectedPracticeBusiness, setSelectedPracticeBusiness] = useState('it_training');

  // --- Section 25 & 26: AI Challenge Input State ---
  const [aiBusinessInput, setAiBusinessInput] = useState('Alpha Fly Theni');
  const [aiAudienceInput, setAiAudienceInput] = useState('College Students & Job Seekers');
  const [aiActionInput, setAiActionInput] = useState('Enroll in Web Development');
  const [aiGeneratedHero, setAiGeneratedHero] = useState(null);
  const [studentReflection, setStudentReflection] = useState('');

  // --- Section 28: Quiz Answers State ---
  const [quizAnswers, setQuizAnswers] = useState({});

  // ---------------- Data Collections ----------------
  const explorerItemsData = {
    eyebrow: {
      name: 'Eyebrow / Small Label',
      purpose: 'Adds instant context above the headline to specify the category, offer, or technology stack.',
      htmlRole: '<span class="eyebrow">AI-POWERED LEARNING</span>',
      cssRole: 'font-size: 0.8rem; font-weight: 800; color: #60a5fa; letter-spacing: 1px;'
    },
    headline: {
      name: 'Main Headline (H1)',
      purpose: 'The primary message the visitor notices in 3 seconds. Clearly states what the business provides.',
      htmlRole: '<h1>Build Job-Ready Digital Skills</h1>',
      cssRole: 'font-size: 2.5rem; font-weight: 900; line-height: 1.2;'
    },
    description: {
      name: 'Supporting Description (P)',
      purpose: 'Provides short value context without competing with the main headline.',
      htmlRole: '<p>Practical hands-on training for students in Theni...</p>',
      cssRole: 'font-size: 1.05rem; color: #94a3b8; max-width: 550px;'
    },
    primary_cta: {
      name: 'Primary CTA Button',
      purpose: 'Gives the visitor a high-contrast, clear next action (e.g. Explore Courses).',
      htmlRole: '<a href="#courses" class="btn-primary">Explore Courses</a>',
      cssRole: 'background: #2563eb; padding: 12px 24px; border-radius: 10px;'
    },
    secondary_cta: {
      name: 'Secondary CTA Link',
      purpose: 'Offers an alternative, lower-commitment path for visitors not ready to buy immediately.',
      htmlRole: '<a href="#contact" class="btn-secondary">Contact Us</a>',
      cssRole: 'background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);'
    },
    image: {
      name: 'Supporting Visual / Image',
      purpose: 'Reinforces the product, service, or brand message visually on the right column.',
      htmlRole: '<div class="hero-visual"><img src="hero-banner.png" alt="Hero Illustration"></div>',
      cssRole: 'width: 100%; border-radius: 16px; object-fit: cover;'
    }
  };

  const businessGoalsData = {
    training: { name: 'Alpha Fly Theni IT Academy', cta: 'Explore Courses', altCta: 'Contact Us', heading: 'Master Modern Web Development in Theni' },
    restaurant: { name: 'Flavors Bistro', cta: 'View Menu', altCta: 'Book Table', heading: 'Authentic Gourmet Dining Experience' },
    gym: { name: 'PulseFit Club', cta: 'Book a Visit', altCta: 'View Workout Plans', heading: 'Transform Your Health & Fitness Today' },
    photography: { name: 'FocusArt Studio', cta: 'View Portfolio', altCta: 'Enquire Rates', heading: 'Capturing Timeless Moments Beautifully' },
    tuition: { name: 'BrightSpark Learning', cta: 'Enquire Now', altCta: 'View Timetable', heading: 'Top Academics & Exam Excellence' }
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the primary purpose of a website Hero Section?',
      options: [
        'To store client databases.',
        'To immediately communicate the business offer and guide visitors toward an action within 5 seconds.',
        'To display copyright terms at the bottom.',
        'To list privacy settings.'
      ],
      correct: 1,
      explanation: 'The hero section is the main banner introducing the offer and driving primary visitor action.'
    },
    {
      id: 'q2',
      question: 'Which HTML element should be used for the single primary main heading in a Hero section?',
      options: ['<h6>', '<h1>', '<div>', '<span>'],
      correct: 1,
      explanation: '<h1> is the top-level semantic HTML heading element for a page main headline.'
    },
    {
      id: 'q3',
      question: 'What does CTA stand for in website design?',
      options: [
        'Call To Action',
        'Central Text Alignment',
        'Computer Technology Asset',
        'Css Tab Anchor'
      ],
      correct: 0,
      explanation: 'CTA stands for Call To Action (the main button prompting user action).'
    },
    {
      id: 'q4',
      question: 'Which CSS property creates a two-column layout placing Text on the left and Image on the right?',
      options: ['display: block;', 'display: flex;', 'position: absolute;', 'text-align: center;'],
      correct: 1,
      explanation: 'display: flex arranges child elements side-by-side in horizontal rows.'
    },
    {
      id: 'q5',
      question: 'Why do we set `max-width: 1200px; margin: 0 auto;` on a hero section container?',
      options: [
        'To hide text on mobile phones.',
        'To restrict content width on ultra-wide screens and center it neatly.',
        'To change background colors.',
        'To disable button clicks.'
      ],
      correct: 1,
      explanation: 'max-width prevents text stretching too wide, while margin: 0 auto centers the content container.'
    },
    {
      id: 'q6',
      question: 'What is Visual Hierarchy in website typography?',
      options: [
        'Making all text font sizes identical.',
        'Arranging text sizes and weights so the main headline stands out first, followed by description and buttons.',
        'Using 10 different colors on one paragraph.',
        'Deleting images from the layout.'
      ],
      correct: 1,
      explanation: 'Visual hierarchy guides the reader eye from most important element (heading) to supporting details.'
    },
    {
      id: 'q7',
      question: 'How does CSS `@media (max-width: 768px)` adapt a hero layout for mobile screens?',
      options: [
        'It converts the 2-column flexbox row (`flex-direction: row`) into a stacked vertical column (`flex-direction: column`).',
        'It deletes the headline.',
        'It disables CSS flexbox.',
        'It reboots the phone.'
      ],
      correct: 0,
      explanation: 'Media queries switch flexbox direction to stacked column on small mobile displays.'
    },
    {
      id: 'q8',
      question: 'Why should a CTA button have a distinct background color and padding compared to secondary links?',
      options: [
        'To confuse the visitor.',
        'To draw highest visual priority so visitors know exactly what primary action to take.',
        'Because buttons require extra bytes.',
        'To hide the link URL.'
      ],
      correct: 1,
      explanation: 'Distinct high-contrast buttons attract user focus to complete primary business goals.'
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

  const quizAttempted = Object.keys(quizAnswers).length === 8;
  const isDay3Completed = guidedBuildStage >= 10 && quizAttempted;
  
  // Progress calculation for Day 3 (15% overall)
  const overallCourseProgress = isDay3Completed ? 15 : 10 + Math.round((guidedBuildStage / 10) * 5);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      
      {/* 🌟 COURSE HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#ffffff',
        boxShadow: '0 20px 30px rgba(15, 23, 42, 0.3)',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '30px', width: 'fit-content', marginBottom: '1.25rem' }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Day 3 • 20 Days Progressive Practical Track
          </span>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          Day 3 — Build a Powerful Hero Section
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#e0e7ff', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
          Master HTML <code>&lt;section class="hero"&gt;</code>, <code>&lt;h1&gt;</code> headlines, CTA buttons, CSS Flexbox 2-column layouts, typography visual hierarchy, and responsive mobile stacking for <strong>Alpha Fly Theni</strong>.
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
            AI-Powered Web Design • Day 3 / 20
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
            <span>Quiz: {quizAttempted ? `${calculateQuizScore()}/8` : '○'}</span>
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
          <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '8px' }}>BUILD</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fff7ed', color: '#ea580c', padding: '4px 12px', borderRadius: '8px' }}>CODE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fdf2f8', color: '#db2777', padding: '4px 12px', borderRadius: '8px' }}>LIVE OUTPUT</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#f0f9ff', color: '#0284c7', padding: '4px 12px', borderRadius: '8px' }}>PRACTICE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#ffffff', padding: '4px 12px', borderRadius: '8px' }}>AI CHALLENGE</span>
        </div>
      </div>

      {/* ==================== TOPIC 1: HERO SECTION ANATOMY ==================== */}
      {isTabActive('intro') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Objective Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
              Today You Will Build
            </h2>
            
            {/* Target Hero Objective Card */}
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem', border: '2px solid #3b82f6' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '1rem' }}>
                🖥️ Continuous Project — Alpha Fly Theni Navbar + Hero Section
              </div>

              {/* Day 2 Navbar */}
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '0.85rem 1.25rem', borderRadius: '10px', marginBottom: '1rem', border: '1px solid #312e81' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>Home</span>
                  <span style={{ color: '#cbd5e1' }}>About</span>
                  <span style={{ color: '#cbd5e1' }}>Courses</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>Login</button>
              </header>

              {/* Day 3 Hero Section Target */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '2rem 1.5rem', borderRadius: '12px', border: '1px solid #4338ca', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#60a5fa', letterSpacing: '1px', textTransform: 'uppercase' }}>AI-POWERED LEARNING</span>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0.5rem 0 0.75rem 0', color: '#ffffff', lineHeight: 1.2 }}>Build Job-Ready Digital Skills</h1>
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>Practical hands-on training for students in Theni to build real responsive business projects.</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.82rem' }}>Explore Courses</button>
                    <button style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.82rem' }}>Contact Us</button>
                  </div>
                </div>

                <div style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.08)', padding: '2rem 1rem', borderRadius: '12px', border: '1px border-dashed rgba(255,255,255,0.2)', textAlign: 'center', color: '#93c5fd', fontWeight: 800, fontSize: '0.9rem' }}>
                  🚀 100% Practical IT Training
                </div>
              </div>
            </div>

            {/* Real World Question Block */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', borderRadius: '0 12px 12px 0', padding: '1.5rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
                Imagine You Open a Website...
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                A visitor arrives on your business website. Within <strong>3 to 5 seconds</strong>, they must instantly understand:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>1. What is this business?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>2. What does it offer?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>3. Why should I care?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>4. What should I do next?</div>
              </div>

              <div style={{ marginTop: '1.25rem', background: '#eff6ff', padding: '1rem', borderRadius: '10px', color: '#1e40af', fontSize: '0.9rem', fontWeight: 800 }}>
                💡 Where does this critical information appear? Right at the top in the <strong>HERO SECTION</strong>!
              </div>
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
            Next: Target Result &amp; Hero Explorer <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== TOPIC 2: VISUAL HERO EXPLORER ==================== */}
      {isTabActive('visual') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Target Result Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Target Visual Result &amp; Code Breakdown
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Below is the exact Hero Section you will build today for <strong>Alpha Fly Theni</strong>. Click <strong>[See How It Is Built]</strong> to inspect its HTML &amp; CSS code:
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

              {/* Day 3 Hero Section Live Output */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '2rem 1.5rem', borderRadius: '12px', border: '1px solid #4338ca', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#60a5fa', letterSpacing: '1px' }}>AI-POWERED LEARNING</span>
                  <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.5rem 0 0.75rem 0', color: '#ffffff', lineHeight: 1.2 }}>Build Job-Ready Digital Skills</h1>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>Practical hands-on training for students in Theni to build real responsive business projects.</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.84rem' }}>Explore Courses</button>
                    <button style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.84rem' }}>Contact Us</button>
                  </div>
                </div>

                <div style={{ flex: '1 1 220px', background: 'rgba(255,255,255,0.08)', padding: '2.5rem 1rem', borderRadius: '12px', border: '1px border-dashed rgba(255,255,255,0.2)', textAlign: 'center', color: '#93c5fd', fontWeight: 800 }}>
                  🚀 100% Practical IT Training
                </div>
              </div>

              {/* Code Breakdown Reveal */}
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
  <title>Alpha Fly Theni - Hero Section</title>
</head>
<body>

  <!-- Day 2 Navbar -->
  <header style="display:flex; justify-content:space-between; align-items:center; background:#1e1b4b; padding:1rem 2rem; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly Theni</div>
    <nav style="display:flex; gap:1rem; font-size:0.9rem;">
      <a href="#" style="color:#cbd5e1; text-decoration:none;">Home</a>
      <a href="#" style="color:#cbd5e1; text-decoration:none;">About</a>
    </nav>
  </header>

  <!-- Day 3 Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <span class="eyebrow">AI-POWERED LEARNING</span>
      <h1>Build Job-Ready Digital Skills</h1>
      <p>Practical hands-on training for students in Theni to build real responsive business projects.</p>
      <div class="hero-ctas">
        <a href="#courses" class="btn-primary">Explore Courses</a>
        <a href="#contact" class="btn-secondary">Contact Us</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="visual-card">🚀 100% Practical IT Training</div>
    </div>
  </section>

</body>
</html>`)}
                    </div>
                  ) : (
                    <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', color: '#34d399', fontSize: '0.82rem', margin: 0, overflowX: 'auto' }}>
{`.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  color: white;
}
.eyebrow { font-size: 0.8rem; font-weight: 800; color: #60a5fa; }
h1 { font-size: 2.5rem; font-weight: 900; line-height: 1.2; }
p { font-size: 1.05rem; color: #94a3b8; line-height: 1.6; }
.hero-ctas { display: flex; gap: 1rem; }
.btn-primary { background: #2563eb; color: white; padding: 12px 24px; border-radius: 10px; }
.btn-secondary { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); }`}
                    </pre>
                  )}
                </div>
              )}
            </div>

            {/* Interactive Hero Section Explorer */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '1.5rem 0 0.75rem 0' }}>
              🔍 Hero Section Explorer (Click any component)
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

      {/* ==================== TOPIC 5: TYPOGRAPHY & CTA BUTTONS ==================== */}
      {isTabActive('typography_cta') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Interactive Heading Typography Visualizer */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Interactive Heading Typography Visualizer
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Tweak font size, line height, and max-width to observe how typography hierarchy affects readability:
            </p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>font-size: {headingFontSize}rem</label>
                  <input type="range" min="1.5" max="3.5" step="0.1" value={headingFontSize} onChange={e => setHeadingFontSize(Number(e.target.value))} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>line-height: {headingLineHeight}</label>
                  <input type="range" min="1.0" max="1.8" step="0.1" value={headingLineHeight} onChange={e => setHeadingLineHeight(Number(e.target.value))} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>max-width: {headingMaxWidth}px</label>
                  <input type="range" min="350" max="850" step="50" value={headingMaxWidth} onChange={e => setHeadingMaxWidth(Number(e.target.value))} style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            {/* Live Render */}
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '14px', color: 'white' }}>
              <h1 style={{
                fontSize: `${headingFontSize}rem`,
                fontWeight: headingFontWeight,
                lineHeight: headingLineHeight,
                maxWidth: `${headingMaxWidth}px`,
                margin: 0,
                color: '#ffffff',
                transition: 'all 0.2s'
              }}>
                Build Job-Ready Digital Skills with Alpha Fly Theni
              </h1>
            </div>
          </div>

          {/* CTA Button Comparison */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              CTA Button Design — Basic vs Professional
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Compare an unstyled HTML button versus a high-converting styled CTA button:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#dc2626', marginBottom: '1rem' }}>Basic Raw HTML Button:</div>
                <button style={{ padding: '2px 6px' }}>Explore Courses</button>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#16a34a', marginBottom: '1rem' }}>Professional Styled CTA:</div>
                <button
                  onMouseEnter={() => setIsHoveredPro(true)}
                  onMouseLeave={() => setIsHoveredPro(false)}
                  style={{
                    background: isHoveredPro ? 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    transform: isHoveredPro ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
                    boxShadow: isHoveredPro ? '0 10px 25px rgba(37,99,235,0.4)' : '0 4px 14px rgba(37,99,235,0.3)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Explore Courses →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 6: RESPONSIVE HERO DESIGN ==================== */}
      {isTabActive('responsive') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Background Design Options */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Hero Background Styling Options
            </h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
              {['plain', 'gradient', 'soft'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setBgStyleOption(opt)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: bgStyleOption === opt ? '#2563eb' : '#f1f5f9',
                    color: bgStyleOption === opt ? 'white' : '#475569'
                  }}
                >
                  {opt.toUpperCase()} BACKGROUND
                </button>
              ))}
            </div>

            <div style={{
              padding: '2rem',
              borderRadius: '16px',
              color: 'white',
              background: bgStyleOption === 'plain' ? '#0f172a' : bgStyleOption === 'gradient' ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' : '#1e1b4b',
              border: '1px solid #334155'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#60a5fa' }}>BACKGROUND OPTION: {bgStyleOption.toUpperCase()}</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '6px 0' }}>Build Job-Ready Digital Skills</h2>
            </div>
          </div>

          {/* Hero Responsive Device Tester */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Responsive Hero Device Tester
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Switch preview device widths to see the 2-column flexbox row automatically collapse into a stacked vertical column on mobile screens:
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setResponsiveDevice('desktop')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: responsiveDevice === 'desktop' ? '#2563eb' : '#f1f5f9', color: responsiveDevice === 'desktop' ? 'white' : '#475569' }}
              >
                🖥️ Desktop (1200px)
              </button>
              <button
                onClick={() => setResponsiveDevice('tablet')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: responsiveDevice === 'tablet' ? '#0284c7' : '#f1f5f9', color: responsiveDevice === 'tablet' ? 'white' : '#475569' }}
              >
                💻 Tablet (768px)
              </button>
              <button
                onClick={() => setResponsiveDevice('mobile')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: responsiveDevice === 'mobile' ? '#7c3aed' : '#f1f5f9', color: responsiveDevice === 'mobile' ? 'white' : '#475569' }}
              >
                📱 Mobile (375px)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 7: GUIDED BUILD (10 STEPS) ==================== */}
      {isTabActive('guided_build') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Guided Mode</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>Build Your Hero — 10 Stages</h2>
              </div>
              <div style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '6px 16px', borderRadius: '20px', fontWeight: 900, fontSize: '0.9rem' }}>
                Stage Progress: {guidedBuildStage}/10
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 3: HTML HERO STRUCTURE ==================== */}
      {isTabActive('html_build') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Live Code Playground — Edit Hero HTML &amp; CSS
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Edit the HTML and CSS code below to customize your hero section live in real-time:
            </p>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 9: CODE CHALLENGES & DEBUGGING ==================== */}
      {isTabActive('challenges') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Predict Output Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              🧠 Predict The Output Challenge
            </h2>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 11: KNOWLEDGE CHECK & PROGRESS ==================== */}
      {isTabActive('quiz') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Quiz Section */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 3 Knowledge Check (8 Questions)
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
                  Quiz Score: {calculateQuizScore()} / 8 Correct!
                </h3>
              </div>
            )}
          </div>

          {/* DAY 3 FINAL WEBSITE OUTPUT */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 3 Continuous Website Output (Navbar + Hero)
            </h2>
            
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: 'white' }}>
              {/* Navbar */}
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '0.85rem 1.25rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
                  <span style={{ color: 'white' }}>Home</span>
                  <span style={{ color: '#cbd5e1' }}>About</span>
                  <span style={{ color: '#cbd5e1' }}>Courses</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>Login</button>
              </header>

              {/* Hero Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '2.5rem 2rem', borderRadius: '12px', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: '1 1 320px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#60a5fa', letterSpacing: '1px' }}>AI-POWERED LEARNING</span>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '6px 0 12px 0', lineHeight: 1.2 }}>Build Job-Ready Digital Skills</h1>
                  <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>Practical hands-on training for students in Theni to build real responsive business projects.</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold' }}>Explore Courses</button>
                    <button style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold' }}>Contact Us</button>
                  </div>
                </div>

                <div style={{ flex: '1 1 240px', background: 'rgba(255,255,255,0.08)', padding: '3rem 1.5rem', borderRadius: '14px', border: '1px border-dashed rgba(255,255,255,0.2)', textAlign: 'center', color: '#93c5fd', fontWeight: 900 }}>
                  🚀 100% Practical IT Training
                </div>
              </div>
            </div>
          </div>

          {/* DAY 3 COMPLETION SCREEN */}
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
              🎉 Day 3 Completed
            </h2>

            {/* Checklist of learned skills */}
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                YOU LEARNED:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                <div>✓ What a Hero section is</div>
                <div>✓ Website visual hierarchy</div>
                <div>✓ HTML section structure</div>
                <div>✓ Headings (h1)</div>
                <div>✓ Paragraphs (p)</div>
                <div>✓ CTA buttons</div>
                <div>✓ Hero images &amp; visuals</div>
                <div>✓ Flexbox 2-column layout</div>
                <div>✓ Containers &amp; max-width</div>
                <div>✓ Spacing &amp; margins</div>
                <div>✓ Typography styling</div>
                <div>✓ Button styling &amp; hover</div>
                <div>✓ Responsive Hero design</div>
                <div>✓ Media queries</div>
                <div>✓ AI-assisted content creation</div>
                <div>✓ Hero code debugging</div>
              </div>
            </div>

            {/* Project Progress Tracker */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                Your Continuous Website So Far:
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                <div>Day 1: Website layout ✓</div>
                <div>Day 2: Professional Navbar ✓</div>
                <div>Day 3: Hero Section ✓</div>
              </div>
            </div>

            {/* DAY 4 PREVIEW CARD */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                🚀 Coming Up in Day 4:
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                Day 4 — Build the About Section
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                About Content → Image → Statistics → Trust Elements → Responsive Layout
              </p>
            </div>

            <button
              onClick={() => alert('Day 4 unlocked! Moving to Day 4 — Build the About Section.')}
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
              Continue to Day 4 →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
