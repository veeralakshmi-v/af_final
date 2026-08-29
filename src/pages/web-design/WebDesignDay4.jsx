import React, { useState } from 'react';
import { 
  BookOpen, MonitorPlay, LayoutGrid, Layers, Code, PenTool,
  Briefcase, Sparkles, CheckCircle, Trophy, ChevronRight, 
  ArrowRight, Lightbulb, RefreshCw, Terminal, Eye, Sliders, Menu, X, Play, HelpCircle
} from 'lucide-react';

export default function WebDesignDay4({ activeTab = 'intro', onNavigate, openAITutor }) {
  const handleTabChange = (tabId) => {
    if (onNavigate) {
      onNavigate('web_design_day4', tabId);
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

  // --- Section 4: Component Explorer State ---
  const [selectedExplorerItem, setSelectedExplorerItem] = useState('statistics');

  // --- Section 5 & 6: HTML Incremental Build Step ---
  const [htmlBuildStep, setHtmlBuildStep] = useState(1);

  // --- Section 14: Statistics Interactive Live Editor State ---
  const [statLearners, setStatLearners] = useState(1200);
  const [statProjects, setStatProjects] = useState(35);
  const [statTracks, setStatTracks] = useState(8);

  // --- Section 16: Visual Hierarchy Selected Version ---
  const [selectedHierarchyVersion, setSelectedHierarchyVersion] = useState('B');

  // --- Section 19: Responsive Device Tester State ---
  const [responsiveDevice, setResponsiveDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // --- Section 20: Live Code Playground State ---
  const [playgroundHtml, setPlaygroundHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>

  <!-- Day 2 Navbar -->
  <header style="display:flex; justify-content:space-between; align-items:center; background:#1e1b4b; padding:1rem 2rem; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly Theni</div>
    <nav style="display:flex; gap:1rem; font-size:0.9rem;">
      <a href="#" style="color:#cbd5e1; text-decoration:none;">Home</a>
      <a href="#about" style="color:#60a5fa; font-weight:800; text-decoration:none;">About</a>
    </nav>
  </header>

  <!-- Day 4 About Section -->
  <section id="about" class="about-section">
    <div class="about-container">
      <div class="about-image">
        <div class="image-box">📷 Team Visual (Alpha Fly Theni)</div>
      </div>
      <div class="about-content">
        <span class="section-label">ABOUT OUR ACADEMY</span>
        <h2 class="section-title">Learning That Leads to Real Projects</h2>
        <p class="section-description">
          Alpha Fly Theni provides 100% practical, project-focused web development training. We empower students and job seekers with modern digital skills to build real-world client websites.
        </p>
        <ul class="key-points">
          <li>✓ Practical hands-on exercises</li>
          <li>✓ Real-world project guidance</li>
          <li>✓ Beginner-friendly step-by-step mentorship</li>
        </ul>
        <div class="stats-row">
          <div class="stat-item"><span class="stat-num">1200+</span><span class="stat-lbl">Learners</span></div>
          <div class="stat-item"><span class="stat-num">35+</span><span class="stat-lbl">Projects</span></div>
          <div class="stat-item"><span class="stat-num">8</span><span class="stat-lbl">Tracks</span></div>
        </div>
        <a href="#courses" class="btn-primary">Learn More</a>
      </div>
    </div>
  </section>

</body>
</html>`);

  const [playgroundCss, setPlaygroundCss] = useState(`.about-section { padding: 4rem 2rem; background: #ffffff; color: #0f172a; }
.about-container { display: flex; align-items: center; gap: 3rem; max-width: 1200px; margin: 0 auto; }
.about-image { flex: 1; min-width: 300px; }
.image-box { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; padding: 4rem 2rem; border-radius: 16px; text-align: center; font-weight: bold; }
.about-content { flex: 1; }
.section-label { font-size: 0.8rem; font-weight: 800; color: #2563eb; letter-spacing: 1px; }
.section-title { font-size: 2rem; font-weight: 900; color: #0f172a; margin: 0.5rem 0 1rem 0; line-height: 1.3; }
.section-description { font-size: 0.95rem; color: #64748b; line-height: 1.6; margin-bottom: 1.25rem; }
.key-points { list-style: none; padding: 0; margin: 0 0 1.5rem 0; }
.key-points li { font-weight: 700; color: #1e293b; margin-bottom: 6px; font-size: 0.9rem; }
.stats-row { display: flex; gap: 2rem; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 1rem 0; margin-bottom: 1.5rem; }
.stat-item { display: flex; flexDirection: column; }
.stat-num { font-size: 1.6rem; font-weight: 900; color: #2563eb; }
.stat-lbl { font-size: 0.8rem; color: #64748b; font-weight: 600; }
.btn-primary { background: #2563eb; color: white; padding: 10px 22px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block; }`);

  // --- Section 21: Guided Build Stages (10 Stages) ---
  const [guidedBuildStage, setGuidedBuildStage] = useState(1);

  // --- Section 22: Predict The Output State ---
  const [predictionAnswer, setPredictionAnswer] = useState(null);
  const [showPredictionResult, setShowPredictionResult] = useState(false);

  // --- Section 23: Debugging Challenge State ---
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugAnswer, setShowDebugAnswer] = useState(false);

  // --- Section 24 & 25: AI Challenge State ---
  const [aiBusinessInput, setAiBusinessInput] = useState('Alpha Fly Theni');
  const [aiAudienceInput, setAiAudienceInput] = useState('College Students in Theni');
  const [aiDifferentiatorInput, setAiDifferentiatorInput] = useState('100% Live Project Training');
  const [aiGeneratedAbout, setAiGeneratedAbout] = useState(null);
  const [studentReviewFeedback, setStudentReviewFeedback] = useState('');

  // --- Section 28: Quiz Answers State ---
  const [quizAnswers, setQuizAnswers] = useState({});

  // ---------------- Data Collections ----------------
  const explorerItemsData = {
    image: {
      name: 'Supporting Visual / Image',
      purpose: 'Reinforces the business story visually showing real team members, classroom, or work environment.',
      htmlRole: '<img src="about-team.png" alt="Students learning web development at Alpha Fly Theni">',
      cssRole: 'width: 100%; border-radius: 16px; object-fit: cover; box-shadow: 0 10px 25px rgba(0,0,0,0.1);'
    },
    label: {
      name: 'Section Label (.section-label)',
      purpose: 'Categorizes the content block immediately at the top of the About container.',
      htmlRole: '<span class="section-label">ABOUT OUR ACADEMY</span>',
      cssRole: 'font-size: 0.8rem; font-weight: 800; color: #2563eb; letter-spacing: 1px;'
    },
    heading: {
      name: 'Section Heading (H2)',
      purpose: 'States the core mission or experience promise clearly to the visitor.',
      htmlRole: '<h2>Learning That Leads to Real Projects</h2>',
      cssRole: 'font-size: 2rem; font-weight: 900; color: #0f172a; margin: 0.5rem 0 1rem 0;'
    },
    description: {
      name: 'Description Paragraph (P)',
      purpose: 'Provides readable business context, history, or vision without overwhelming text.',
      htmlRole: '<p class="section-description">Alpha Fly Theni provides 100% practical IT training...</p>',
      cssRole: 'font-size: 0.95rem; color: #64748b; line-height: 1.6;'
    },
    key_points: {
      name: 'Key Points List (UL / LI)',
      purpose: 'Highlights 3–4 quick scannable advantages using checkmark bullet items.',
      htmlRole: '<ul class="key-points"><li>✓ Practical exercises</li><li>✓ Guided projects</li></ul>',
      cssRole: 'list-style: none; display: flex; flex-direction: column; gap: 8px;'
    },
    statistics: {
      name: 'Statistics Row (.stats-row)',
      purpose: 'Quickly communicates proof metrics (e.g. Learners, Projects completed) to build visitor trust.',
      htmlRole: '<div class="stats-row"><div class="stat-item">1200+ Learners</div></div>',
      cssRole: 'display: flex; gap: 2rem; border-top: 1px solid #e2e8f0; padding: 1rem 0;'
    },
    cta: {
      name: 'CTA Button (.btn-primary)',
      purpose: 'Reuses the primary CTA button class from Day 3 to direct interested visitors to details.',
      htmlRole: '<a href="#courses" class="btn-primary">Learn More</a>',
      cssRole: 'background: #2563eb; color: white; padding: 10px 22px; border-radius: 8px;'
    }
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the primary business goal of an About Section on a website?',
      options: [
        'To download operating system updates.',
        'To provide background context about the business, mission, and build visitor trust.',
        'To list browser cookies.',
        'To hide navigation links.'
      ],
      correct: 1,
      explanation: 'An About section introduces the business story, values, and credibility proof to build visitor trust.'
    },
    {
      id: 'q2',
      question: 'Why do we give `<section id="about">` a specific `id="about"` attribute?',
      options: [
        'So the top navbar link `<a href="#about">` can smoothly navigate directly to this section.',
        'To change browser fonts automatically.',
        'To lock the webpage.',
        'Because HTML requires IDs on every single tag.'
      ],
      correct: 0,
      explanation: 'Section IDs allow anchor links (`href="#about"`) to scroll seamlessly to that exact section.'
    },
    {
      id: 'q3',
      question: 'Why should image `<img>` tags always include a descriptive `alt` attribute?',
      options: [
        'Because alt text makes images load 10x faster.',
        'To provide accessible screen reader descriptions and fallback text if an image fails to load.',
        'To change text alignment.',
        'Alt text is not needed in modern web design.'
      ],
      correct: 1,
      explanation: 'Meaningful alt text is essential for web accessibility and fallback descriptions.'
    },
    {
      id: 'q4',
      question: 'What is the main advantage of creating Reusable CSS Classes like `.section-label` and `.btn-primary`?',
      options: [
        'You can apply consistent styles across Hero, About, and future sections without duplicating CSS code.',
        'Reusable classes delete HTML tags.',
        'Reusable classes disable flexbox.',
        'They force all text to become red.'
      ],
      correct: 0,
      explanation: 'Reusable classes promote clean, maintainable code by sharing style rules across components.'
    },
    {
      id: 'q5',
      question: 'Which CSS property ensures an image scales proportionally inside its container without stretching or distorting?',
      options: ['object-fit: cover;', 'text-align: justify;', 'position: fixed;', 'display: inline;'],
      correct: 0,
      explanation: 'object-fit: cover preserves aspect ratio while filling the container bounds neatly.'
    },
    {
      id: 'q6',
      question: 'What happens when demo statistics (e.g., 1200+ Learners) are added to an About section?',
      options: [
        'They communicate quantitative proof metrics that reinforce business credibility.',
        'They corrupt the webpage.',
        'They force the user to pay a fee.',
        'They hide the section title.'
      ],
      correct: 0,
      explanation: 'Key statistics provide clear numerical proof supporting the business experience story.'
    },
    {
      id: 'q7',
      question: 'How should a 2-column About section (`IMAGE | CONTENT`) respond on narrow mobile phone screens?',
      options: [
        'It should stack vertically (`IMAGE` then `CONTENT`) using media queries so text remains large and readable.',
        'It should shrink text down to 2px size.',
        'It should hide the image permanently.',
        'It should cause horizontal scrollbars.'
      ],
      correct: 0,
      explanation: 'Responsive layouts stack 2-column desktop rows into vertical single-column layouts on mobile.'
    },
    {
      id: 'q8',
      question: 'Why is whitespace (padding and margin) important between the Hero and About sections?',
      options: [
        'It creates visual breathing room separating distinct webpage topics and improving readability.',
        'Because empty space uses less RAM.',
        'To make the webpage scroll infinitely.',
        'Because browsers require 100px padding.'
      ],
      correct: 0,
      explanation: 'Balanced whitespace separates sections cleanly, preventing visual clutter.'
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
  const isDay4Completed = guidedBuildStage >= 10 && quizAttempted;
  
  // Progress calculation for Day 4 (20% overall)
  const overallCourseProgress = isDay4Completed ? 20 : 15 + Math.round((guidedBuildStage / 10) * 5);

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
            Day 4 • 20 Days Progressive Practical Track
          </span>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          Day 4 — Build a Professional About Section
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#e0e7ff', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
          Master HTML <code>&lt;section id="about"&gt;</code>, section labels, headings, image presentation, key points, demo statistics counters, and reusable CSS classes for <strong>Alpha Fly Theni</strong>.
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
            AI-Powered Web Design • Day 4 / 20
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

      {/* ==================== SECTION 1 & 2: OBJECTIVE & BUSINESS QUESTION ==================== */}
      {activeTab === 'intro' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Objective Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
              Today You Will Build
            </h2>
            
            {/* Continuous Page Target Preview */}
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem', border: '2px solid #3b82f6' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '1rem' }}>
                🖥️ Continuous Project — Navbar (Day 2) + Hero (Day 3) + About Section (Day 4)
              </div>

              {/* Navbar */}
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '8px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: 'white' }}>Home</span>
                  <span style={{ color: '#60a5fa', fontWeight: 800 }}>About</span>
                  <span style={{ color: '#cbd5e1' }}>Courses</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>Login</button>
              </header>

              {/* Hero */}
              <div style={{ background: '#1e1b4b', padding: '1rem', borderRadius: '8px', marginBottom: '8px', fontSize: '0.8rem', opacity: 0.75 }}>
                [DAY 3 HERO BANNER SECTION: Build Job-Ready Digital Skills...]
              </div>

              {/* Day 4 About Section Target */}
              <div style={{ background: '#ffffff', color: '#0f172a', padding: '1.5rem', borderRadius: '10px', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 180px', background: '#1e1b4b', color: '#93c5fd', padding: '2rem 1rem', borderRadius: '10px', textAlign: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  📷 Team Visual
                </div>
                <div style={{ flex: '1 1 280px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px' }}>ABOUT OUR ACADEMY</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0 8px 0', color: '#0f172a' }}>Learning That Leads to Real Projects</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 10px 0' }}>Practical hands-on web development training designed for students in Theni...</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginBottom: '10px' }}>
                    <span>1200+ Learners</span>
                    <span>35+ Projects</span>
                    <span>8 Tracks</span>
                  </div>
                  <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>Learn More</button>
                </div>
              </div>
            </div>

            {/* Business Question Block */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', borderRadius: '0 12px 12px 0', padding: '1.5rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
                A Visitor Likes Your Hero. What Do They Want to Know Next?
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                After scrolling past the top banner, visitors naturally ask themselves:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>1. Who are you?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>2. What does the business do?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>3. Why should I trust you?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>4. How experienced are you?</div>
              </div>

              <div style={{ marginTop: '1.25rem', background: '#eff6ff', padding: '1rem', borderRadius: '10px', color: '#1e40af', fontSize: '0.9rem', fontWeight: 800 }}>
                💡 Answering these questions creates visitor trust right inside the <strong>ABOUT SECTION</strong>!
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
            Next: Target Result &amp; About Explorer <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 3 & 4: TARGET RESULT & ABOUT EXPLORER ==================== */}
      {activeTab === 'visual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Target Result Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Target Visual Result &amp; Code Breakdown
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Below is the exact About Section you will build today for <strong>Alpha Fly Theni</strong>. Click <strong>[See How It Is Built]</strong> to inspect its HTML &amp; CSS code:
            </p>

            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Live Target About Section:</span>
                <button
                  onClick={() => setShowTargetCodeBreakdown(!showTargetCodeBreakdown)}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {showTargetCodeBreakdown ? 'Hide Code Breakdown' : 'See How It Is Built'}
                </button>
              </div>

              {/* Day 4 About Section Live Output */}
              <section id="about" style={{ background: '#ffffff', color: '#0f172a', borderRadius: '12px', padding: '2rem', display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 280px', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#93c5fd', padding: '3.5rem 1.5rem', borderRadius: '14px', textAlign: 'center', fontWeight: 900 }}>
                  📷 Team Visual (Alpha Fly Theni)
                </div>

                <div style={{ flex: '1 1 350px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px' }}>ABOUT OUR ACADEMY</span>
                  <h2 style={{ fontSize: '1.7rem', fontWeight: 900, margin: '0.5rem 0 0.75rem 0', color: '#0f172a', lineHeight: 1.2 }}>Learning That Leads to Real Projects</h2>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                    Alpha Fly Theni provides 100% practical, project-focused web development training. We empower students and job seekers with modern digital skills to build real-world client websites.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                    <div>✓ Practical hands-on exercises</div>
                    <div>✓ Real-world project guidance</div>
                    <div>✓ Beginner-friendly step-by-step mentorship</div>
                  </div>

                  <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '0.85rem 0', marginBottom: '1.25rem' }}>
                    <div><div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>1200+</div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Learners</div></div>
                    <div><div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>35+</div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Projects</div></div>
                    <div><div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>8</div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Tracks</div></div>
                  </div>

                  <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem' }}>Learn More</button>
                </div>
              </section>

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
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>

  <!-- Day 2 Navbar -->
  <header style="display:flex; justify-content:space-between; align-items:center; background:#1e1b4b; padding:1rem 2rem; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly Theni</div>
    <nav style="display:flex; gap:1rem; font-size:0.9rem;">
      <a href="#" style="color:#cbd5e1; text-decoration:none;">Home</a>
      <a href="#about" style="color:#60a5fa; font-weight:800; text-decoration:none;">About</a>
    </nav>
  </header>

  <!-- Day 4 About Section -->
  <section id="about" class="about-section">
    <div class="about-container">
      <div class="about-image">
        <img src="about-team.png" alt="Students building web projects at Alpha Fly Theni">
      </div>
      <div class="about-content">
        <span class="section-label">ABOUT OUR ACADEMY</span>
        <h2 class="section-title">Learning That Leads to Real Projects</h2>
        <p class="section-description">Alpha Fly Theni provides 100% practical training...</p>
        <ul class="key-points">
          <li>✓ Practical exercises</li>
          <li>✓ Guided projects</li>
        </ul>
        <div class="stats-row">
          <div class="stat-item"><span class="stat-num">1200+</span><span class="stat-lbl">Learners</span></div>
          <div class="stat-item"><span class="stat-num">35+</span><span class="stat-lbl">Projects</span></div>
        </div>
      </div>
    </div>
  </section>

</body>
</html>`)}
                    </div>
                  ) : (
                    <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', color: '#34d399', fontSize: '0.82rem', margin: 0, overflowX: 'auto' }}>
{`.about-container { display: flex; align-items: center; gap: 3rem; max-width: 1200px; margin: 0 auto; }
.section-label { font-size: 0.8rem; font-weight: 800; color: #2563eb; letter-spacing: 1px; }
.section-title { font-size: 2rem; font-weight: 900; color: #0f172a; margin: 0.5rem 0 1rem 0; }
.section-description { font-size: 0.95rem; color: #64748b; line-height: 1.6; }
.stats-row { display: flex; gap: 2rem; border-top: 1px solid #e2e8f0; padding: 1rem 0; }
.btn-primary { background: #2563eb; color: white; padding: 10px 22px; border-radius: 8px; }`}
                    </pre>
                  )}
                </div>
              )}
            </div>

            {/* Component Explorer */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '1.5rem 0 0.75rem 0' }}>
              🔍 About Section Explorer (Click any component)
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

            {/* Explorer Details Panel */}
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

      {/* ==================== SECTION 5 & 6: STEP-BY-STEP HTML ABOUT BUILDER ==================== */}
      {activeTab === 'html_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Step-by-Step HTML About Construction (7 Steps)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Build the About section progressively in 7 steps so you can visually see how elements stack:
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { step: 1, label: 'Step 1: <section id="about">' },
                { step: 2, label: 'Step 2: Section Label' },
                { step: 3, label: 'Step 3: Heading (H2)' },
                { step: 4, label: 'Step 4: Paragraph' },
                { step: 5, label: 'Step 5: Image Visual' },
                { step: 6, label: 'Step 6: Key Points' },
                { step: 7, label: 'Step 7: Statistics & CTA' }
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
                  HTML Code (Step {htmlBuildStep} of 7):
                </label>
                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', minHeight: '200px', overflowX: 'auto' }}>
                  {htmlBuildStep === 1 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>
  <section id="about" class="about-section">
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 2 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>
  <section id="about" class="about-section">
    <span class="section-label">ABOUT OUR ACADEMY</span>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 3 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>
  <section id="about" class="about-section">
    <span class="section-label">ABOUT OUR ACADEMY</span>
    <h2 class="section-title">Learning That Leads to Real Projects</h2>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 4 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>
  <section id="about" class="about-section">
    <span class="section-label">ABOUT OUR ACADEMY</span>
    <h2 class="section-title">Learning That Leads to Real Projects</h2>
    <p class="section-description">Alpha Fly Theni provides 100% practical training...</p>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 5 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>
  <section id="about" class="about-section">
    <img src="about-team.png" alt="Students building web projects at Alpha Fly Theni">
    <span class="section-label">ABOUT OUR ACADEMY</span>
    <h2 class="section-title">Learning That Leads to Real Projects</h2>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 6 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>
  <section id="about" class="about-section">
    <img src="about-team.png" alt="Students building web projects">
    <h2>Learning That Leads to Real Projects</h2>
    <ul class="key-points">
      <li>✓ Practical exercises</li>
      <li>✓ Guided projects</li>
    </ul>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 7 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - About Section</title>
</head>
<body>
  <section id="about" class="about-section">
    <img src="about-team.png" alt="Team">
    <h2>Learning That Leads to Real Projects</h2>
    <div class="stats-row">
      <div>1200+ Learners</div>
      <div>35+ Projects</div>
    </div>
    <a href="#courses" class="btn-primary">Learn More</a>
  </section>
</body>
</html>`)}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 4 }}>
                  Unstyled Live Browser Render:
                </label>
                <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '12px', padding: '1rem', minHeight: '200px', fontFamily: 'Times New Roman, serif' }}>
                  {htmlBuildStep >= 2 && <div style={{ fontSize: '0.8rem' }}>ABOUT OUR ACADEMY</div>}
                  {htmlBuildStep >= 3 && <h2 style={{ fontSize: '1.4rem', margin: '4px 0' }}>Learning That Leads to Real Projects</h2>}
                  {htmlBuildStep >= 4 && <p style={{ margin: '4px 0' }}>Alpha Fly Theni provides 100% practical training...</p>}
                  {htmlBuildStep >= 5 && <div style={{ background: '#f1f5f9', border: '1px solid #ccc', padding: '8px', fontSize: '0.8rem' }}>[Image: Students building web projects at Alpha Fly Theni]</div>}
                  {htmlBuildStep >= 6 && <div style={{ margin: '6px 0', fontSize: '0.85rem' }}>✓ Practical exercises<br/>✓ Guided projects</div>}
                  {htmlBuildStep >= 7 && <div style={{ marginTop: '8px' }}><button>Learn More</button></div>}
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', padding: '1rem 1.25rem', borderRadius: '0 10px 10px 0', marginTop: '1.5rem', fontSize: '0.88rem', color: '#334155' }}>
              💡 <strong>Section ID Tip:</strong> Using <code>id="about"</code> enables the top navbar link (<code>&lt;a href="#about"&gt;</code>) to smoothly scroll to this exact location!
            </div>
          </div>
        </div>
      )}

      {/* ==================== SECTION 7, 8, 9, 10: CSS 2-COLUMN LAYOUT & IMAGE STYLING ==================== */}
      {activeTab === 'css_layout' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              CSS Flexbox 2-Column Layout &amp; Image Styling
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Why were the image and text appearing stacked? Because HTML block elements stack vertically by default. <code>display: flex</code> arranges them side-by-side!
            </p>

            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Flexbox 2-Column Desktop Layout:
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', background: '#ffffff', color: '#0f172a', padding: '2rem', borderRadius: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 260px', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#93c5fd', padding: '3rem 1rem', borderRadius: '12px', textAlign: 'center', fontWeight: 800 }}>
                  📷 Image Column<br/><span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#cbd5e1' }}>(object-fit: cover; border-radius: 12px;)</span>
                </div>

                <div style={{ flex: '1 1 320px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>ABOUT OUR ACADEMY</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 8px 0' }}>Learning That Leads to Real Projects</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Content Column with heading, paragraph, key points, statistics, and CTA button.</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', color: '#1e40af', fontSize: '0.88rem' }}>
              <strong>Image Styling Rule:</strong> Use <code>object-fit: cover;</code> so images scale proportionally inside their column without stretching or distorting!
            </div>
          </div>
        </div>
      )}

      {/* ==================== SECTION 11, 12, 13, 14, 15, 16: REUSABLE CLASSES & STATISTICS ==================== */}
      {activeTab === 'stats_reusable' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Reusable CSS Classes Concept */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Reusable CSS Classes Concept
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Instead of writing duplicate CSS rules for every page section, we create clean reusable utility classes:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }}>
                <strong style={{ color: '#2563eb' }}>.section-label</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>Used on Hero &amp; About top category tags.</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }}>
                <strong style={{ color: '#2563eb' }}>.section-title</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>Shared font styling for H2 section titles.</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.84rem' }}>
                <strong style={{ color: '#2563eb' }}>.btn-primary</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>Reused across Hero, About, and Services CTAs.</div>
              </div>
            </div>
          </div>

          {/* Interactive Statistics Live Editor */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Statistics Live Interactive Editor
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Modify the numbers and labels below to see how HTML holds data while CSS handles visual presentation:
            </p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Learners Stat:</label>
                  <input type="number" value={statLearners} onChange={e => setStatLearners(Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Projects Stat:</label>
                  <input type="number" value={statProjects} onChange={e => setStatProjects(Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Tracks Stat:</label>
                  <input type="number" value={statTracks} onChange={e => setStatTracks(Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>
            </div>

            {/* Live Render */}
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '14px', color: 'white' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Live Statistics Component Output (Demo Data):
              </div>
              <div style={{ display: 'flex', gap: '2.5rem', background: '#ffffff', color: '#0f172a', padding: '1.25rem', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>{statLearners}+</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Learners</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>{statProjects}+</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Projects</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>{statTracks}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Tracks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Hierarchy Activity */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              About Section Visual Hierarchy Activity
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
              {[
                { version: 'A', desc: 'Version A: Image dominates everything over text.' },
                { version: 'B', desc: 'Version B: Balanced heading → description → key points → statistics → CTA (CORRECT!).' },
                { version: 'C', desc: 'Version C: All text elements have identical size and font weight.' }
              ].map(item => (
                <button
                  key={item.version}
                  onClick={() => setSelectedHierarchyVersion(item.version)}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: selectedHierarchyVersion === item.version ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    background: selectedHierarchyVersion === item.version ? '#eff6ff' : '#f8fafc',
                    color: selectedHierarchyVersion === item.version ? '#1e40af' : '#334155',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {item.desc}
                </button>
              ))}
            </div>

            {selectedHierarchyVersion === 'B' ? (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '10px', color: '#065f46', fontSize: '0.88rem', fontWeight: 700 }}>
                ✅ <strong>Correct!</strong> Version B presents a logical reading flow helping visitors scan key benefits and proof metrics effortlessly.
              </div>
            ) : (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '10px', color: '#991b1b', fontSize: '0.88rem', fontWeight: 700 }}>
                ❌ Unbalanced visual hierarchy makes text hard to scan. Choose Version B!
              </div>
            )}
          </div>

        </div>
      )}

      {/* ==================== SECTION 17, 18, 19: RESPONSIVE ABOUT & DEVICE TESTER ==================== */}
      {activeTab === 'responsive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Responsive About Section Device Tester
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Switch device views to test how the 2-column flexbox row converts into a single-column vertical stack on mobile screens:
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

            {/* Device Container */}
            <div style={{
              background: '#0f172a',
              borderRadius: '16px',
              padding: '1.5rem',
              maxWidth: responsiveDevice === 'desktop' ? '100%' : responsiveDevice === 'tablet' ? '768px' : '375px',
              margin: '0 auto',
              transition: 'all 0.4s ease'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: responsiveDevice === 'mobile' ? 'column' : 'row',
                alignItems: 'center',
                gap: '1.5rem',
                background: '#ffffff',
                color: '#0f172a',
                padding: '1.5rem',
                borderRadius: '12px'
              }}>
                <div style={{ width: responsiveDevice === 'mobile' ? '100%' : '200px', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#93c5fd', padding: '2rem 1rem', borderRadius: '10px', textAlign: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  📷 Image Column
                </div>

                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb' }}>ABOUT OUR ACADEMY</span>
                  <h3 style={{ fontSize: responsiveDevice === 'mobile' ? '1.2rem' : '1.5rem', fontWeight: 900, margin: '4px 0 6px 0' }}>Learning That Leads to Real Projects</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 10px 0' }}>Practical hands-on web development training in Theni.</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', marginBottom: '10px' }}>
                    <span>1200+ Learners</span>
                    <span>35+ Projects</span>
                  </div>
                  <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>Learn More</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== SECTION 20 & 21: GUIDED BUILD MODE (BUILD WITH ME) ==================== */}
      {activeTab === 'guided_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Guided Mode</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>Build Your About Section — 10 Stages</h2>
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
              
              {guidedBuildStage === 1 && <h3>Stage 1: Create About Section Tag (`&lt;section id="about" class="about-section"&gt;`)</h3>}
              {guidedBuildStage === 2 && <h3>Stage 2: Add Section Label (`&lt;span class="section-label"&gt;ABOUT OUR ACADEMY&lt;/span&gt;`)</h3>}
              {guidedBuildStage === 3 && <h3>Stage 3: Add Section Heading (`&lt;h2 class="section-title"&gt;Learning That Leads to Real Projects&lt;/h2&gt;`)</h3>}
              {guidedBuildStage === 4 && <h3>Stage 4: Add Description Paragraph (`&lt;p class="section-description"&gt;`)</h3>}
              {guidedBuildStage === 5 && <h3>Stage 5: Add Team Visual Image (`&lt;img src="about-team.png" alt="Students building web projects"&gt;`)</h3>}
              {guidedBuildStage === 6 && <h3>Stage 6: Add Key Points List (`&lt;ul class="key-points"&gt;`)</h3>}
              {guidedBuildStage === 7 && <h3>Stage 7: Create 2-Column Flexbox Layout (.about-container &#123; display: flex; gap: 3rem; &#125;)</h3>}
              {guidedBuildStage === 8 && <h3>Stage 8: Add Statistics Row (`&lt;div class="stats-row"&gt;1200+ Learners&lt;/div&gt;`)</h3>}
              {guidedBuildStage === 9 && <h3>Stage 9: Add Reusable CTA Button (`&lt;a href="#courses" class="btn-primary"&gt;Learn More&lt;/a&gt;`)</h3>}
              {guidedBuildStage === 10 && <h3>Stage 10: Make Responsive with Mobile Media Queries (`@media (max-width: 768px)`)</h3>}

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

      {/* ==================== SECTION 20: LIVE CODE PLAYGROUND ==================== */}
      {activeTab === 'playground' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Live Code Playground — Edit About HTML &amp; CSS
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Edit the HTML and CSS code below and see your About section update live in real-time:
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

      {/* ==================== SECTION 22 & 23: PREDICT OUTPUT & DEBUGGING CHALLENGE ==================== */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Predict Output Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              🧠 Predict The Output Challenge
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1rem 0' }}>
              Read the CSS rule below:
            </p>
            <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: '10px', fontSize: '0.88rem', margin: '0 0 1rem 0' }}>
{`.about-image img {
  width: 100%;
  object-fit: cover;
  border-radius: 16px;
}`}
            </pre>

            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '8px' }}>What will happen to the team image inside the About section?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
              {[
                'A. The image disappears.',
                'B. The image scales proportionally without distortion and gets rounded corners.',
                'C. The image turns red.',
                'D. The image gets deleted from the server.'
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPredictionAnswer(idx);
                    setShowPredictionResult(true);
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: predictionAnswer === idx ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    background: predictionAnswer === idx ? '#eff6ff' : '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            {showPredictionResult && (
              <div style={{ background: predictionAnswer === 1 ? '#ecfdf5' : '#fef2f2', border: predictionAnswer === 1 ? '1px solid #a7f3d0' : '1px solid #fecaca', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, color: predictionAnswer === 1 ? '#065f46' : '#991b1b' }}>
                {predictionAnswer === 1 ? '✅ Correct prediction! `object-fit: cover` prevents distortion while `border-radius: 16px` creates soft rounded corners.' : '❌ Incorrect prediction. Option B is correct.'}
              </div>
            )}
          </div>

          {/* Debugging Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              🐛 Debugging Challenge — Can You Fix The About Section?
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              The about code below contains a layout bug causing text and image to overlap. Identify the bug:
            </p>

            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', color: '#f87171', fontSize: '0.84rem', margin: '0 0 1rem 0' }}>
{`<div class="about-container" style="display: flex;">
  <div style="width: 1200px;"> <!-- BUG: Fixed width 1200px breaks flex layout! -->
    <img src="team.png">
  </div>
  <div>Content...</div>
</div>`}
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
                💡 <strong>Hint:</strong> Look at <code>width: 1200px;</code> on the image column container. Hardcoded width forces text off screen!
              </div>
            )}

            {showDebugAnswer && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '10px', marginTop: '1rem', fontSize: '0.85rem', color: '#065f46' }}>
                ✅ <strong>Solution:</strong> Change <code>width: 1200px;</code> to <code>flex: 1;</code> so both image and content share space proportionally in Flexbox.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SECTION 24, 25, 26, 27: ASSIGNMENT & AI CHALLENGE ==================== */}
      {activeTab === 'assignment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* AI About Content Generator */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              AI Challenge — Plan Your About Section
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Enter your business parameters below and let AI draft 3 key points, 3 statistics, and CTA text:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Business Type:</label>
                <input type="text" value={aiBusinessInput} onChange={e => setAiBusinessInput(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Target Audience:</label>
                <input type="text" value={aiAudienceInput} onChange={e => setAiAudienceInput(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Differentiator:</label>
                <input type="text" value={aiDifferentiatorInput} onChange={e => setAiDifferentiatorInput(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
            </div>

            <button
              onClick={() => {
                setAiGeneratedAbout({
                  label: `ABOUT ${aiBusinessInput.toUpperCase()}`,
                  heading: `Empowering ${aiAudienceInput} with ${aiDifferentiatorInput}`,
                  points: [
                    '✓ 100% Practical hands-on exercises',
                    '✓ Real-world client projects',
                    '✓ Experienced industry mentors'
                  ],
                  stats: ['1200+ Learners', '35+ Projects Completed', '8 Career Tracks'],
                  cta: 'Explore Our Story →'
                });
                setCompletedSteps(prev => ({ ...prev, aiChallenge: true }));
              }}
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.88rem', cursor: 'pointer', marginBottom: '1.5rem' }}
            >
              ✨ Generate AI About Draft
            </button>

            {aiGeneratedAbout && (
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#6b21a8', fontSize: '1rem', fontWeight: 900 }}>AI Suggested Heading:</h4>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#4c1d95', marginBottom: '1rem' }}>{aiGeneratedAbout.heading}</div>

                <h4 style={{ margin: '0 0 4px 0', color: '#6b21a8', fontSize: '1rem', fontWeight: 900 }}>AI Key Points:</h4>
                <ul style={{ margin: '0 0 1rem 0', paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#4c1d95' }}>
                  {aiGeneratedAbout.points.map((p, i) => <li key={i} style={{ marginBottom: 4 }}>{p}</li>)}
                </ul>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6b21a8', display: 'block', marginBottom: 4 }}>Student Content Review &amp; Refinement:</label>
                  <textarea
                    rows={3}
                    placeholder="Refine the AI draft to ensure all stats match real claims..."
                    value={studentReviewFeedback}
                    onChange={e => setStudentReviewFeedback(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d8b4fe', fontSize: '0.84rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SECTION 28, 29, 30: KNOWLEDGE CHECK & COMPLETION ==================== */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Quiz Section */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 4 Knowledge Check (8 Questions)
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

          {/* DAY 4 FINAL CONTINUOUS WEBSITE OUTPUT */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 4 Continuous Website Output (Navbar + Hero + About)
            </h2>
            
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: 'white' }}>
              {/* Navbar */}
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '8px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: 'white' }}>Home</span>
                  <span style={{ color: '#60a5fa', fontWeight: 800 }}>About</span>
                  <span style={{ color: '#cbd5e1' }}>Courses</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>Login</button>
              </header>

              {/* Hero Banner */}
              <div style={{ background: '#1e1b4b', padding: '1.5rem', borderRadius: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#60a5fa' }}>AI-POWERED LEARNING</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '4px 0', color: 'white' }}>Build Job-Ready Digital Skills</h2>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, marginTop: '6px' }}>Explore Courses</button>
              </div>

              {/* Day 4 About Section */}
              <section id="about" style={{ background: '#ffffff', color: '#0f172a', borderRadius: '10px', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#93c5fd', padding: '2.5rem 1rem', borderRadius: '10px', textAlign: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  📷 Team Visual
                </div>

                <div style={{ flex: '1 1 280px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb' }}>ABOUT OUR ACADEMY</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0 8px 0', color: '#0f172a' }}>Learning That Leads to Real Projects</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 10px 0' }}>Practical hands-on web development training in Theni...</p>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginBottom: '10px' }}>
                    <span>1200+ Learners</span>
                    <span>35+ Projects</span>
                    <span>8 Tracks</span>
                  </div>
                  <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>Learn More</button>
                </div>
              </section>
            </div>
          </div>

          {/* DAY 4 COMPLETION SCREEN */}
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
              🎉 Day 4 Completed
            </h2>

            {/* Checklist of learned skills */}
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                YOU LEARNED:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                <div>✓ Purpose of an About section</div>
                <div>✓ Section structure &amp; ID links</div>
                <div>✓ HTML sections &amp; semantic tags</div>
                <div>✓ Images and alt text</div>
                <div>✓ Two-column flexbox layouts</div>
                <div>✓ Image alignment &amp; styling</div>
                <div>✓ Object-fit &amp; border-radius</div>
                <div>✓ Spacing, padding &amp; margin</div>
                <div>✓ Reusable CSS classes</div>
                <div>✓ Statistics component cards</div>
                <div>✓ Visual hierarchy scanning</div>
                <div>✓ Responsive mobile stacking</div>
                <div>✓ Media queries</div>
                <div>✓ AI-assisted content planning</div>
                <div>✓ Debugging layout errors</div>
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
                <div>Day 4: About Section ✓</div>
              </div>
            </div>

            {/* DAY 5 PREVIEW CARD */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                🚀 Coming Up in Day 5:
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                Day 5 — Build a Professional Services Section
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                Services → Cards → Icons → Grid → Hover Effects → Responsive Layout
              </p>
            </div>

            <button
              onClick={() => alert('Day 5 unlocked! Moving to Day 5 — Build a Professional Services Section.')}
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
              Continue to Day 5 →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
