import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen, MonitorPlay, Code, LayoutGrid, Layers, PenTool, Briefcase, Sparkles,
  CheckCircle, Sliders, Smartphone, Tablet, Monitor, RefreshCw, Star,
  HelpCircle, Eye, EyeOff, ShieldCheck, Award, MessageSquare, AlertCircle, Play, Check,
  Send, MessageCircle, FileText, CheckSquare, ChevronRight, Trophy, Zap, Layout, Copy,
  ArrowRight, RotateCcw, X, Info, Terminal, MousePointerClick, ToggleLeft, ToggleRight,
  SlidersHorizontal, CheckSquare2, FileCode2, Menu, Clock
} from 'lucide-react';
import { CodeBlock } from '../../utils/codeHighlight';

export default function WebDesignDay12({ activeTab: propActiveTab = 'intro', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab);

  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day12', tabId);
    }
  };

  // Helper for checking active tab mapping with robust fallback across 10 topics
  const isTabActive = (tabName) => {
    const validTabs = [
      'intro', 'connecting_js', 'data_types', 'operators', 'dom_intro',
      'dom_text_events', 'events', 'functions_classlist', 'classlist', 'mobile_menu'
    ];
    if (tabName === 'intro') {
      return activeTab === 'intro' || !validTabs.includes(activeTab);
    }
    if (tabName === 'connecting_js') return activeTab === 'connecting_js';
    if (tabName === 'data_types') return activeTab === 'data_types';
    if (tabName === 'operators') return activeTab === 'operators';
    if (tabName === 'dom_intro') return activeTab === 'dom_intro';
    if (tabName === 'dom_text_events') return activeTab === 'dom_text_events';
    if (tabName === 'events') return activeTab === 'events';
    if (tabName === 'functions_classlist') return activeTab === 'functions_classlist';
    if (tabName === 'classlist') return activeTab === 'classlist';
    if (tabName === 'mobile_menu') return activeTab === 'mobile_menu' || activeTab === 'conditions' || activeTab === 'guided_build' || activeTab === 'interactive_activities' || activeTab === 'ai_tools' || activeTab === 'practice_assignment' || activeTab === 'quiz';
    return activeTab === tabName;
  };

  // --- Interactive Syntax-Highlighted Code Editor component ---
  const LiveSyntaxCodeEditor = ({ value, onChange, language = 'javascript', rows = 8, label = '' }) => {
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

      if (lang === 'javascript' || lang === 'js') {
        const jsTokenRegex = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(\b(?:let|const|var|function|if|else|return|true|false|console|document)\b)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)|(\b\d+\b)/gi;
        return escaped.replace(jsTokenRegex, (match, comment, keyword, stringVal, num) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (keyword) return `<span style="color:#c084fc;font-weight:bold;">${keyword}</span>`;
          if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
          if (num) return `<span style="color:#fb923c;font-weight:bold;">${num}</span>`;
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
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.5px' }}>
              {label}
            </label>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Interactive Code Editor ({language.toUpperCase()})</span>
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
              caretColor: '#f59e0b',
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
  // STATE MANAGEMENT FOR DAY 12 LESSONS
  // ==========================================

  // 1. Script & Console Sandbox State
  const [consoleLogOutput, setConsoleLogOutput] = useState([]);
  const [consoleCode, setConsoleCode] = useState(`console.log("Hello from my website");\nconst businessName = "Alpha Fly Theni";\nconsole.log(\`Welcome to \${businessName}\`);`);

  // 2. Variables & Math Playground State
  const [varBusinessName, setVarBusinessName] = useState('Alpha Fly Theni');
  const [varServiceName, setVarServiceName] = useState('Website Design');
  const [varPrice, setVarPrice] = useState(5000);
  const [varQuantity, setVarQuantity] = useState(2);
  const [varIsAvailable, setVarIsAvailable] = useState(true);

  // 3. Selector Practice State
  const [selectorAnswers, setSelectorAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [selectorFeedback, setSelectorFeedback] = useState({});
  const [showSelectorHint, setShowSelectorHint] = useState(false);
  const [showSelectorSol, setShowSelectorSol] = useState(false);

  // 4. Live Text & Event Flow State
  const [headingText, setHeadingText] = useState('Welcome to Our Website');
  const [eventStageIndex, setEventStageIndex] = useState(0);

  // 5. Function Practice State
  const [fnPlaygroundCode, setFnPlaygroundCode] = useState(`function showWelcome() {\n  title.textContent = "Welcome to Alpha Fly Theni!";\n}`);
  const [fnOutputMessage, setFnOutputMessage] = useState('');

  // 6. classList Highlight Card State
  const [cardIsHighlighted, setCardIsHighlighted] = useState(false);

  // 7. Mobile Menu Interactive Demo State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 8. Conditions & Availability State
  const [serviceAvailability, setServiceAvailability] = useState(true);

  // 9. 10-Min Mini Interaction Challenge State
  const [offerVisible, setOfferVisible] = useState(false);

  // 10. Guided Build (9 Steps) State
  const [guidedStep, setGuidedStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(Array(9).fill(false));
  const [guidedCodes, setGuidedCodes] = useState([
    `<!-- Step 1: Create a button ID in HTML -->\n<button id="menuBtn" class="menu-toggle">\u2630</button>`,
    `// Step 2: Create a JavaScript reference\nconst menuBtn = document.querySelector("#menuBtn");\nconst mobileMenu = document.querySelector(".mobile-menu");`,
    `// Step 3: Add a click event listener\nmenuBtn.addEventListener("click", () => {\n  mobileMenu.classList.toggle("active");\n});`,
    `// Step 4: Create a function\nfunction toggleNavigation() {\n  mobileMenu.classList.toggle("active");\n}`,
    `// Step 5: Change text content dynamically\nconst statusMsg = document.querySelector("#statusMsg");\nstatusMsg.textContent = "Menu toggled!";`,
    `// Step 6: Test interaction live\nconsole.log("Mobile menu click event triggered!");`,
    `// Step 7: Add CSS active class\nmobileMenu.classList.add("active");`,
    `// Step 8: Toggle the active class\nmobileMenu.classList.toggle("active");`,
    `// Step 9: Test complete mobile menu interaction verified!`
  ]);

  const guidedStepsList = [
    { title: "1. Create Button ID", desc: "Add id='menuBtn' to your mobile menu button in index.html." },
    { title: "2. Create JS References", desc: "Use document.querySelector('#menuBtn') and document.querySelector('.mobile-menu')." },
    { title: "3. Add Click Event Listener", desc: "Attach addEventListener('click', ...) to listen for user clicks." },
    { title: "4. Create a Function", desc: "Group menu toggling into a reusable function toggleNavigation()." },
    { title: "5. Change Element Text", desc: "Update statusMsg.textContent when menu opens or closes." },
    { title: "6. Test Interaction", desc: "Click the menu button in the preview to test live behavior." },
    { title: "7. Add CSS Class", desc: "Use mobileMenu.classList.add('active') to apply CSS styles." },
    { title: "8. Toggle Active Class", desc: "Use mobileMenu.classList.toggle('active') to switch state on click." },
    { title: "9. Test Complete Menu", desc: "Test mobile drawer toggle behavior from ☰ to ✕!" }
  ];

  // 11. Predict Output State
  const [predictAns, setPredictAns] = useState({});

  // 12. Debugging Challenge State
  const [debugCode, setDebugCode] = useState(`// BROKEN CODE EXAMPLE:\nconst contactBtn = document.querySelector("contactBtn"); // Bug 1: Missing # for ID\n\ncontactBtn.addEventlistener("click", function() { // Bug 2: Lowercase 'l' in addEventListener\n  const title = document.querySelector("#mainTitle");\n  title.textcontent = "Welcome!"; // Bug 3: Lowercase 'c' in textContent\n});`);
  const [debugSolved, setDebugSolved] = useState(false);
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugSol, setShowDebugSol] = useState(false);

  // 13. AI Tools State
  const [aiExplainCode, setAiExplainCode] = useState(`button.addEventListener("click", function () {\n  title.textContent = "Welcome!";\n});`);
  const [aiExplainResult, setAiExplainResult] = useState('');
  const [aiErrorCode, setAiErrorCode] = useState(`Uncaught ReferenceError: title is not defined at script.js:4`);
  const [aiErrorResult, setAiErrorResult] = useState(null);
  const [aiBusinessType, setAiBusinessType] = useState('Restaurant');
  const [aiIdeasResult, setAiIdeasResult] = useState(null);

  // 14. Assignment & Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState({
    q1_elem: '#menuBtn, #mainTitle',
    q2_event: 'click',
    q3_fn: 'toggleNavigation(), showMessage()',
    q4_class: '.active, .highlight',
    q5_ifelse: 'Checked isAvailable boolean to show/hide booking message',
    q6_error: 'Uncaught TypeError: Cannot read properties of null',
    q7_fix: 'Added missing # in querySelector("#menuBtn") selector'
  });
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // 15. Quiz State (15 Questions matching prompt specs)
  const quizQuestions = [
    { q: "1. What is JavaScript?", opts: ["A markup language for page structure", "A styling language for colors", "A programming language used to add interaction and behavior to websites", "A database engine"], ans: 2 },
    { q: "2. What is the role of JavaScript in a website?", opts: ["HTML = Structure, CSS = Design, JavaScript = Behaviour", "JS replaces HTML completely", "JS creates image files", "JS sets font sizes only"], ans: 0 },
    { q: "3. What is a variable in JavaScript?", opts: ["A CSS class name", "A named place to store information so we can use it later", "An HTML tag", "A browser window"], ans: 1 },
    { q: "4. What is the practical difference between const and let?", opts: ["const is used when value shouldn't be reassigned; let is used when value may change", "let is for CSS; const is for HTML", "const can only store numbers", "There is no difference"], ans: 0 },
    { q: "5. What is the DOM (Document Object Model)?", opts: ["A backend database", "The browser's converted structure of HTML that JavaScript can interact with", "A CSS framework", "A text editor"], ans: 1 },
    { q: "6. What does document.querySelector('#title') select?", opts: ["All paragraph tags", "The element with id='title'", "The element with class='title'", "The head section"], ans: 1 },
    { q: "7. How do you select an element by class name using querySelector?", opts: ["querySelector('#classname')", "querySelector('.classname')", "querySelector('classname')", "querySelector('class:classname')"], ans: 1 },
    { q: "8. What does addEventListener('click', ...) do?", opts: ["Waits for a user to click an element and executes a function", "Automatically clicks buttons on page load", "Changes page URL", "Closes the window"], ans: 0 },
    { q: "9. What is an event in web development?", opts: ["Something that happens on a webpage (e.g. click, mouseover, submit)", "A scheduled calendar item", "A server crash", "A CSS rule"], ans: 0 },
    { q: "10. What is a function in JavaScript?", opts: ["A reusable block of instructions executed when called", "A CSS property", "An HTML image element", "A font style"], ans: 0 },
    { q: "11. What does element.textContent do?", opts: ["Changes background color", "Gets or sets the text content inside an HTML element", "Applies drop shadow", "Deletes element"], ans: 1 },
    { q: "12. What does classList.add('active') do?", opts: ["Adds the 'active' CSS class to an element", "Removes all classes", "Toggles font size", "Deletes the class"], ans: 0 },
    { q: "13. What does classList.toggle('active') do?", opts: ["Adds the class if missing, or removes it if present", "Deletes CSS files", "Changes background to black", "Hides body tag"], ans: 0 },
    { q: "14. What does a simple if / else condition allow JavaScript to do?", opts: ["Make decisions based on boolean true/false states", "Loop 100 times", "Create forms", "Calculate padding"], ans: 0 },
    { q: "15. Where can developers inspect JavaScript errors and console.log() output?", opts: ["Browser Developer Tools -> Console", "HTML file source code", "CSS stylesheet", "Desktop taskbar"], ans: 0 }
  ];

  const [quizAns, setQuizAns] = useState(Array(15).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((qObj, idx) => {
      if (quizAns[idx] === qObj.ans) score++;
    });
    return score;
  };

  // Run console simulation
  const handleRunConsole = () => {
    const logs = [];
    const customConsole = {
      log: (...args) => {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      },
      warn: (...args) => {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      },
      error: (...args) => {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      }
    };

    try {
      const runFn = new Function('console', consoleCode);
      runFn(customConsole);
    } catch (err) {
      logs.push(`Error: ${err.message}`);
    }

    setConsoleLogOutput(logs.length > 0 ? logs : ["Code executed cleanly with no output."]);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', padding: '1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* TOP HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        borderRadius: '20px',
        padding: '2rem',
        color: '#ffffff',
        marginBottom: '1.5rem',
        boxShadow: '0 10px 25px -5px rgba(30, 27, 75, 0.4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
            <Zap size={14} color="#f59e0b" />
            DAY 12 • JAVASCRIPT FUNDAMENTALS &amp; DOM INTERACTION
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
            Day 12 — JavaScript Fundamentals &amp; DOM Interaction
          </h1>
          <p style={{ fontSize: '1rem', color: '#c7d2fe', margin: 0, lineHeight: 1.6 }}>
            Understand how JavaScript works with HTML and CSS to build your first real website interactions: DOM selection (`querySelector`), Click Events (`addEventListener`), Functions, `classList` toggling, Mobile Menus, and `if / else` decision making!
          </p>
        </div>

        <button
          onClick={() => openAITutor && openAITutor("Help me understand DOM selection, click events, addEventListener, classList toggle, and mobile menu build for Day 12!")}
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

      {/* CORE FORMULA BANNER */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
            Today's Core Formula:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '0.95rem', fontWeight: 900 }}>
            <span style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 14px', borderRadius: '8px' }}>HTML → Structure</span>
            <span style={{ background: '#faf5ff', color: '#7e22ce', padding: '6px 14px', borderRadius: '8px' }}>CSS → Design</span>
            <span style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #f59e0b', padding: '6px 14px', borderRadius: '8px' }}>JavaScript → Behaviour ✨</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>
          <Clock size={16} color="#2563eb" /> Daily Duration: <strong>1 Hour</strong>
        </div>
      </div>

      {/* MAIN CONTENT TAB ROUTER */}
      <div>

        {/* ==================== TAB 1: WHY JS & FORMULA ==================== */}
        {isTabActive('intro') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Topic 1: Introduction to JavaScript &amp; Role in Web Development
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Making Your Website Respond to Visitors
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                HTML provides structure, CSS provides design, and JavaScript provides dynamic behavior and user interaction!
              </p>

              {/* Real Website Interactive Questions Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { q: "What happens when I click the mobile menu?", ans: "Mobile menu drawer opens/closes (JavaScript toggles class)." },
                  { q: "What happens when I click 'View Details'?", ans: "Service modal or card highlight appears dynamically." },
                  { q: "What happens when I open an FAQ?", ans: "Accordion expands to reveal answer text." },
                  { q: "What happens when I submit a form?", ans: "JavaScript validates input fields and displays confirmation message." }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.9rem', marginBottom: '6px' }}>{item.q}</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{item.ans}</div>
                  </div>
                ))}
              </div>

              {/* Real Website Feature vs JS Role Table */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  Real Website Features &amp; JavaScript Roles
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {[
                    { feat: "Mobile menu", role: "Open / close" },
                    { feat: "FAQ accordion", role: "Expand / collapse" },
                    { feat: "Modal dialog", role: "Open / close" },
                    { feat: "Tabbed content", role: "Switch content" },
                    { feat: "Contact form", role: "Validate input" },
                    { feat: "CTA Button", role: "Trigger action" },
                    { feat: "Price Calculator", role: "Calculate values" },
                    { feat: "Theme switcher", role: "Change theme" }
                  ].map((row, i) => (
                    <div key={i} style={{ background: '#1e293b', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 700 }}>{row.feat}</span>
                      <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 800, background: '#064e3b', padding: '2px 8px', borderRadius: '6px' }}>{row.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic 1 Source Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  📄 Topic 1 Source Code: Linking JavaScript in HTML
                </h3>
                <CodeBlock
                  title="index.html"
                  language="html"
                  code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to Alpha Fly Theni</h1>

  <!-- Place script tag at the bottom of <body> so HTML loads first -->
  <script src="script.js"></script>
</body>
</html>`}
                />
              </div>

              {/* Visual Flow diagram */}
              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e40af', fontSize: '1rem', fontWeight: 900 }}>How JavaScript Operates in a Webpage:</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontWeight: 800, fontSize: '0.85rem' }}>
                  <span style={{ background: '#fff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '6px', border: '1px solid #93c5fd' }}>USER INTERACTION</span>
                  <ChevronRight size={14} color="#2563eb" />
                  <span style={{ background: '#fff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '6px', border: '1px solid #93c5fd' }}>JAVASCRIPT DETECTS</span>
                  <ChevronRight size={14} color="#2563eb" />
                  <span style={{ background: '#fff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '6px', border: '1px solid #93c5fd' }}>HTML / CSS CHANGE</span>
                  <ChevronRight size={14} color="#2563eb" />
                  <span style={{ background: '#10b981', color: '#fff', padding: '6px 12px', borderRadius: '6px' }}>UPDATED WEBSITE ✨</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('connecting_js')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Topic 2 - Console &amp; File Structure <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: CONNECTING JS & CONSOLE ==================== */}
        {isTabActive('connecting_js') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Topic 2: Project Structure &amp; Browser Console (console.log)
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Adding JavaScript &amp; Outputting Console Logs
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Keep HTML, CSS, and JavaScript cleanly organized in separate files throughout your project:
              </p>

              {/* Recommended File Structure */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '14px', color: '#fff', fontFamily: 'monospace' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 800, marginBottom: '6px' }}>📁 project/</div>
                  <div style={{ color: '#cbd5e1', marginLeft: '1rem' }}>├── index.html</div>
                  <div style={{ color: '#cbd5e1', marginLeft: '1rem' }}>├── style.css</div>
                  <div style={{ color: '#f59e0b', fontWeight: 800, marginLeft: '1rem' }}>└── script.js ✨</div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '14px', border: '2px solid #10b981' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#166534', fontWeight: 900 }}>External Script Link:</h4>
                  <code style={{ background: '#fff', padding: '8px', borderRadius: '6px', display: 'block', fontSize: '0.85rem', color: '#15803d', border: '1px solid #86efac' }}>
                    &lt;script src="script.js"&gt;&lt;/script&gt;
                  </code>
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.82rem', color: '#14532d' }}>
                    Place at the bottom of <code>&lt;body&gt;</code> to ensure HTML loads before JS executes!
                  </p>
                </div>
              </div>

              {/* Topic 2 Source Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  📄 Topic 2 Source Code: console.log() Output
                </h3>
                <CodeBlock
                  title="script.js"
                  language="javascript"
                  code={`// Log messages to the browser Developer Tools console
console.log("Hello from script.js!");
console.log("JavaScript is working smoothly!");
const businessName = "Alpha Fly Theni";
console.log("Welcome to " + businessName);`}
                />
              </div>

              {/* Console.log Simulator */}
              <div style={{ background: '#090d16', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#38bdf8', margin: 0, fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={18} /> Interactive Browser Console Sandbox
                  </h3>
                  <button
                    onClick={handleRunConsole}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Play size={14} /> Run console.log()
                  </button>
                </div>

                <LiveSyntaxCodeEditor
                  language="js"
                  rows={4}
                  value={consoleCode}
                  onChange={(e) => setConsoleCode(e.target.value)}
                  label="JavaScript Input Code"
                />

                <div style={{ marginTop: '1rem', background: '#000000', borderRadius: '8px', padding: '1rem', border: '1px solid #334155', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '6px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
                    🖥️ Simulated Browser DevTools Console Output:
                  </div>
                  {consoleLogOutput.length > 0 ? (
                    consoleLogOutput.map((log, i) => (
                      <div key={i} style={{ color: '#34d399', margin: '4px 0' }}>
                        &gt; {log}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#64748b' }}>Click "Run console.log()" above to test execution!</div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('data_types')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Variables, const/let &amp; Operators <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: VARIABLES, CONST/LET & OPERATORS ==================== */}
        {isTabActive('data_types') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Topic 3: Variables (const vs let) &amp; Topic 4: Data Types, Operators &amp; Template Literals
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Storing Values &amp; Dynamic Template Literals
              </h2>

              {/* const vs let Box */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#2563eb', fontWeight: 800 }}>let (Value May Change)</h4>
                  <code style={{ fontSize: '0.85rem', color: '#0f172a' }}>let menuOpen = false;</code>
                  <p style={{ margin: '6px 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>Used when UI state or counts change on user interaction.</p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#2563eb', fontWeight: 800 }}>const (Value Remains Constant)</h4>
                  <code style={{ fontSize: '0.85rem', color: '#0f172a' }}>const businessName = "Alpha Fly Theni";</code>
                  <p style={{ margin: '6px 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>Used when reference or value should not be reassigned.</p>
                </div>
              </div>

              {/* Topic 3 & Topic 4 Source Code Examples */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    📄 Topic 3 Source Code: Variables &amp; Types
                  </h3>
                  <CodeBlock
                    title="Topic 3: Variables"
                    language="javascript"
                    code={`// const: fixed value
const businessName = "Alpha Fly Theni";
const serviceName = "Web Design";

// let: reassignable value
let quantity = 2;
quantity = 3; // Allowed

// Primitive Data Types
const price = 5000;         // Number
const isAvailable = true;   // Boolean`}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    📄 Topic 4 Source Code: Operators &amp; Templates
                  </h3>
                  <CodeBlock
                    title="Topic 4: Template Literals"
                    language="javascript"
                    code={`const price = 5000;
const qty = 2;

// Arithmetic calculation operator (*)
const total = price * qty;

// Template string with backticks \`...\`
const msg = \`Welcome to \${businessName}! Total for \${qty} packages is ₹\${total}.\`;
console.log(msg);`}
                  />
                </div>
              </div>

              {/* Variables & Math Playground */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  🎛️ Live Interactive Variables &amp; Math Playground
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Business Name</label>
                    <input type="text" value={varBusinessName} onChange={(e) => setVarBusinessName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Service Name</label>
                    <input type="text" value={varServiceName} onChange={(e) => setVarServiceName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Price: ₹{varPrice}</label>
                    <input type="range" min="1000" max="25000" step="500" value={varPrice} onChange={(e) => setVarPrice(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Quantity: {varQuantity}</label>
                    <input type="range" min="1" max="5" value={varQuantity} onChange={(e) => setVarQuantity(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Template Literal Output */}
                <div style={{ background: '#ffffff', color: '#0f172a', padding: '1.25rem', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Template String Evaluation Output:
                  </div>
                  <h3 style={{ margin: '0 0 6px 0', color: '#111827', fontSize: '1.3rem' }}>Welcome to {varBusinessName}</h3>
                  <div style={{ fontSize: '0.95rem', color: '#374151', marginBottom: '4px' }}>
                    Service: <strong>{varServiceName}</strong> | Price: <strong>₹{varPrice.toLocaleString()}</strong> x <strong>{varQuantity}</strong>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#2563eb', margin: '6px 0' }}>
                    Operator Calculation (price * quantity): ₹{(varPrice * varQuantity).toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('dom_intro')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: DOM Concept &amp; Selector Practice <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: DOM INTRO & SELECTOR PRACTICE ==================== */}
        {isTabActive('dom_intro') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Topic 5: The DOM (Document Object Model) &amp; Selecting Elements (querySelector)
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Connecting JavaScript to HTML Elements
              </h2>

              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #bfdbfe', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#1e40af', fontSize: '1rem', fontWeight: 900 }}>What is the DOM?</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#1e3a8a', lineHeight: 1.5, fontWeight: 700 }}>
                  "The browser converts your HTML code into a tree structure called the Document Object Model (DOM) that JavaScript can query and modify!"
                </p>
                <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#2563eb', fontWeight: 800 }}>
                  HTML Code → Browser Parser → DOM Tree → JavaScript Manipulation
                </div>
              </div>

              {/* Topic 5 Source Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  📄 Topic 5 Source Code: Selecting Elements with querySelector()
                </h3>
                <CodeBlock
                  title="script.js"
                  language="javascript"
                  code={`// 1. Select by Element ID (#)
const heading = document.querySelector("#mainTitle");

// 2. Select by CSS Class Name (.)
const serviceCard = document.querySelector(".service-card");

// 3. Select by HTML Tag Name
const primaryBtn = document.querySelector("button");`}
                />
              </div>

              {/* Selector Matching Rules */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#2563eb', fontWeight: 800 }}>14. Select by ID (#)</h4>
                  <code style={{ fontSize: '0.85rem', color: '#0f172a' }}>const title = document.querySelector("#mainTitle");</code>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#2563eb', fontWeight: 800 }}>15. Select by Class (.)</h4>
                  <code style={{ fontSize: '0.85rem', color: '#0f172a' }}>const card = document.querySelector(".service-card");</code>
                </div>
              </div>

              {/* 16. Selector Practice Widget */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    🎯 16. Selector Practice Challenge
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setShowSelectorHint(!showSelectorHint)} style={{ background: '#334155', color: '#fbbf24', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Hint</button>
                    <button onClick={() => setShowSelectorSol(!showSelectorSol)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Show Solution</button>
                  </div>
                </div>

                {showSelectorHint && <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', color: '#fbbf24', fontSize: '0.85rem', marginBottom: '1rem' }}>💡 Hint: Use '#' for IDs (#mainTitle, #contactBtn) and '.' for classes (.description).</div>}
                {showSelectorSol && <div style={{ background: '#064e3b', padding: '10px', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.85rem', marginBottom: '1rem' }}>✅ Solution: Q1: <code>document.querySelector("#mainTitle")</code> | Q2: <code>document.querySelector(".description")</code> | Q3: <code>document.querySelector("#contactBtn")</code></div>}

                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.82rem', marginBottom: '1.25rem', color: '#cbd5e1' }}>
                  &lt;h1 id="mainTitle"&gt;Welcome&lt;/h1&gt;<br />
                  &lt;p class="description"&gt;Build your website&lt;/p&gt;<br />
                  &lt;button id="contactBtn"&gt;Contact Us&lt;/button&gt;
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Question 1: Select the heading</label>
                    <input type="text" value={selectorAnswers.q1} onChange={(e) => setSelectorAnswers({ ...selectorAnswers, q1: e.target.value })} placeholder="document.querySelector(...)" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Question 2: Select the paragraph</label>
                    <input type="text" value={selectorAnswers.q2} onChange={(e) => setSelectorAnswers({ ...selectorAnswers, q2: e.target.value })} placeholder="document.querySelector(...)" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('dom_text_events')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: textContent &amp; Event Flow <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: TEXTCONTENT & EVENT FLOW ==================== */}
        {isTabActive('dom_text_events') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Topic 6: Modifying Text Content (textContent) &amp; Topic 7: Event Listeners (addEventListener)
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Changing Page Text Dynamically on User Interaction
              </h2>

              {/* Topic 6 & Topic 7 Source Code Examples */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    📄 Topic 6 Source Code: textContent
                  </h3>
                  <CodeBlock
                    title="Topic 6: Changing Text"
                    language="javascript"
                    code={`// 1. Select the title element
const title = document.querySelector("#mainTitle");

// 2. Change text dynamically
title.textContent = "Welcome to Alpha Fly Theni!";`}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    📄 Topic 7 Source Code: addEventListener
                  </h3>
                  <CodeBlock
                    title="Topic 7: Click Event"
                    language="javascript"
                    code={`const btn = document.querySelector("#changeBtn");
const title = document.querySelector("#mainTitle");

// Listen for click event
btn.addEventListener("click", function() {
  title.textContent = "Button Clicked! Text Updated!";
});`}
                  />
                </div>
              </div>

              {/* Live Heading Text Change Widget */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <h1 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px 0' }}>
                  {headingText}
                </h1>
                <button
                  onClick={() => setHeadingText(headingText === 'Welcome to Our Website' ? 'Build Something Amazing! ✨' : 'Welcome to Our Website')}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
                >
                  [ Change Heading ] (title.textContent)
                </button>
              </div>

              {/* Event Flow Visualizer */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  ⚡ Interactive Event Flow Visualizer
                </h3>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {[
                    "1. BUTTON",
                    "2. USER CLICKS",
                    "3. EVENT DETECTED",
                    "4. FUNCTION RUNS",
                    "5. PAGE CHANGES"
                  ].map((stage, idx) => (
                    <div
                      key={idx}
                      onClick={() => setEventStageIndex(idx)}
                      style={{
                        background: eventStageIndex === idx ? '#10b981' : '#1e293b',
                        color: eventStageIndex === idx ? '#ffffff' : '#94a3b8',
                        border: eventStageIndex === idx ? '2px solid #34d399' : '1px solid #334155',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {stage}
                    </div>
                  ))}
                </div>

                <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #475569' }}>
                  <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.95rem', marginBottom: '4px' }}>
                    Active Stage Explanation:
                  </div>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {[
                      "1. Button element is defined in HTML with a unique ID.",
                      "2. Visitor clicks the button on the webpage.",
                      "3. addEventListener('click', ...) detects the interaction event.",
                      "4. JavaScript executes the assigned event handler function.",
                      "5. Document text or CSS class updates, refreshing the visible website!"
                    ][eventStageIndex]}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('functions_classlist')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Functions &amp; classList Toggle <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: FUNCTIONS & CLASSLIST ==================== */}
        {isTabActive('functions_classlist') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Topic 8: Functions &amp; Reusable Logic &amp; Topic 9: Manipulating CSS Classes (classList)
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Functions &amp; Dynamic CSS Class Toggling
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Functions group code into reusable blocks. JavaScript toggles CSS class names (`classList.add`, `remove`, `toggle`) to change styling dynamically!
              </p>

              {/* Topic 8 & Topic 9 Source Code Examples */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    📄 Topic 8 Source Code: Functions
                  </h3>
                  <CodeBlock
                    title="Topic 8: Reusable Function"
                    language="javascript"
                    code={`// Define function
function showWelcomeMessage(name) {
  const heading = document.querySelector("#mainTitle");
  heading.textContent = \`Welcome to Alpha Fly Theni, \${name}!\`;
}

// Call function
showWelcomeMessage("Student");`}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                    📄 Topic 9 Source Code: classList
                  </h3>
                  <CodeBlock
                    title="Topic 9: classList Methods"
                    language="javascript"
                    code={`const card = document.querySelector(".card");
const btn = document.querySelector("#highlightBtn");

// classList.add("highlight")
// classList.remove("highlight")
// classList.toggle("highlight") -> Add if missing, remove if present!
btn.addEventListener("click", () => {
  card.classList.toggle("highlight");
});`}
                  />
                </div>
              </div>

              {/* Highlight Card Toggle Demo */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                  Real Website Example — Highlight Service Card
                </h3>

                <div
                  style={{
                    background: cardIsHighlighted ? '#eff6ff' : '#ffffff',
                    border: cardIsHighlighted ? '2px solid #2563eb' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: cardIsHighlighted ? '0 12px 24px rgba(37,99,235,0.2)' : '0 4px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem'
                  }}
                >
                  <h4 style={{ margin: '0 0 6px 0', color: cardIsHighlighted ? '#1e40af' : '#111827' }}>
                    Website Design Service {cardIsHighlighted ? '(Highlighted State ✨)' : '(Normal State)'}
                  </h4>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.88rem' }}>
                    Click the button below to see JavaScript trigger <code>card.classList.toggle("highlight")</code>!
                  </p>
                </div>

                <button
                  onClick={() => setCardIsHighlighted(!cardIsHighlighted)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  [ Highlight Card ] (classList.toggle("highlight"))
                </button>
              </div>

              {/* 23. Function Practice */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                    ⚡ 23. Function Practice
                  </h3>
                  <button
                    onClick={() => setFnOutputMessage("Function Executed! Welcome to Alpha Fly Theni! ✨")}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Play size={14} /> [ Run Function ]
                  </button>
                </div>

                <LiveSyntaxCodeEditor
                  language="js"
                  rows={4}
                  value={fnPlaygroundCode}
                  onChange={(e) => setFnPlaygroundCode(e.target.value)}
                  label="JavaScript Function Code"
                />

                {fnOutputMessage && (
                  <div style={{ marginTop: '1rem', background: '#064e3b', color: '#6ee7b7', padding: '10px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '0.88rem', border: '1px solid #10b981' }}>
                    {fnOutputMessage}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('mobile_menu')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Build Mobile Menu (☰ / ✕) <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 7: MOBILE MENU BUILD ==================== */}
        {isTabActive('mobile_menu') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Topic 10: Interactive Mobile Navigation Drawer Toggle Project
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Putting It All Together: Complete Mobile Drawer Toggle
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Combine querySelector, click addEventListener, and classList.toggle('active') to build a real mobile drawer menu!
              </p>

              {/* Topic 10 Full Source Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                  📄 Topic 10 Complete Source Code (HTML + CSS + JS)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <CodeBlock
                    title="index.html"
                    language="html"
                    code={`<!-- Mobile Navbar Header -->
<header class="navbar">
  <div class="logo">Alpha Fly Theni</div>
  <button id="menuBtn">☰</button>
</header>

<!-- Mobile Navigation Drawer -->
<nav class="mobile-drawer">
  <a href="#home">Home</a>
  <a href="#services">Services</a>
  <a href="#contact">Contact</a>
</nav>`}
                  />

                  <CodeBlock
                    title="script.js"
                    language="javascript"
                    code={`// 1. Select menu elements
const menuBtn = document.querySelector("#menuBtn");
const drawer = document.querySelector(".mobile-drawer");

// 2. Attach click event listener
menuBtn.addEventListener("click", () => {
  // 3. Toggle 'active' class on menu drawer
  drawer.classList.toggle("active");
  
  // 4. Update button text (☰ or ✕)
  if (drawer.classList.contains("active")) {
    menuBtn.textContent = "✕";
  } else {
    menuBtn.textContent = "☰";
  }
});`}
                  />
                </div>
              </div>

              {/* Mobile Menu Interactive Simulation Box */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  📱 Live Interactive Mobile Menu Tester
                </h3>

                {/* Simulated Phone Frame */}
                <div style={{ maxWidth: '360px', margin: '0 auto', background: '#1e293b', borderRadius: '16px', border: '2px solid #334155', overflow: 'hidden' }}>
                  <div style={{ background: '#090d16', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 900, color: '#fff', fontSize: '1rem' }}>LOGO</div>
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      style={{ background: 'transparent', color: '#fff', border: '1px solid #475569', padding: '4px 10px', borderRadius: '6px', fontSize: '1.2rem', cursor: 'pointer' }}
                    >
                      {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                  </div>

                  {mobileMenuOpen && (
                    <div style={{ background: '#1e1b4b', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #312e81' }}>
                      {['HOME', 'ABOUT', 'SERVICES', 'CONTACT'].map((link, i) => (
                        <div key={i} style={{ color: '#c7d2fe', fontWeight: 800, fontSize: '0.9rem', padding: '6px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          {link}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 27. Implementation Code Snippets */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                  27. Mobile Menu JavaScript Code:
                </h4>
                <LiveSyntaxCodeEditor
                  language="js"
                  rows={6}
                  value={`const menuButton = document.querySelector("#menuBtn");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});`}
                />
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('conditions')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: if/else &amp; Availability <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 8: CONDITIONS & LOGIC ==================== */}
        {isTabActive('conditions') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Conditional Logic (if / else) &amp; Business Logic
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Making Decisions in JavaScript
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                `if / else` statements evaluate boolean conditions (`true` or `false`) to run different blocks of code!
              </p>

              <CodeBlock
                title="Topic: Conditional Logic (if / else)"
                language="javascript"
                code={`const isAvailable = true;
const statusMsg = document.querySelector("#status");

if (isAvailable) {
  statusMsg.textContent = "Bookings are currently open!";
  statusMsg.style.color = "green";
} else {
  statusMsg.textContent = "Bookings are closed for today.";
  statusMsg.style.color = "red";
}`}
              />

              {/* Service Availability Interactive Demo */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 1rem 0' }}>
                  🏢 Service Status Decision Box
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                    Select Service Status:
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setServiceAvailability(true)}
                      style={{ background: serviceAvailability ? '#10b981' : '#1e293b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      [ Available (true) ]
                    </button>
                    <button
                      onClick={() => setServiceAvailability(false)}
                      style={{ background: !serviceAvailability ? '#ef4444' : '#1e293b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                    >
                      [ Not Available (false) ]
                    </button>
                  </div>
                </div>

                <div style={{ background: serviceAvailability ? '#dcfce7' : '#fee2e2', color: serviceAvailability ? '#166534' : '#991b1b', padding: '1.25rem', borderRadius: '12px', fontWeight: 800, fontSize: '1.05rem' }}>
                  {serviceAvailability ? "Bookings are open. Book your consultation today!" : "Please check again later. Bookings currently closed."}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('guided_build')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Mini Challenge &amp; Guided Build <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 9: GUIDED BUILD (9 STEPS) ==================== */}
        {isTabActive('guided_build') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              {/* 10-Minute Mini Interaction Challenge */}
              <div style={{ background: '#fff7ed', padding: '1.5rem', borderRadius: '16px', border: '2px solid #f59e0b', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#9a3412', fontWeight: 900 }}>
                  ⏱️ 10-Minute Mini Interaction Challenge
                </h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.88rem', color: '#7c2d12' }}>
                  Task: Create a button <code>[ View Offer ]</code> that toggles a message on click:
                </p>
                <button
                  onClick={() => setOfferVisible(!offerVisible)}
                  style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  [ View Offer ] (classList.toggle)
                </button>
                {offerVisible && (
                  <div style={{ marginTop: '10px', background: '#fff', color: '#ea580c', padding: '10px', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem', border: '1px solid #f97316' }}>
                    🎉 Special offer available today! 20% discount on web packages.
                  </div>
                )}
              </div>

              {/* Guided Build Steps Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Guided Build Activity
                  </span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                    Add Mobile Menu &amp; Interactions to Mini Project 1
                  </h2>
                </div>
                <div style={{ background: '#eff6ff', color: '#2563eb', padding: '8px 16px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem', border: '1px solid #bfdbfe' }}>
                  Progress: {completedSteps.filter(Boolean).length}/9 Steps Completed
                </div>
              </div>

              {/* Steps Navigation */}
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

              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', margin: '0 0 0.5rem 0', fontWeight: 800 }}>
                  {guidedStepsList[guidedStep].title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  {guidedStepsList[guidedStep].desc}
                </p>

                <LiveSyntaxCodeEditor
                  language={guidedStep === 0 ? "html" : "js"}
                  rows={6}
                  value={guidedCodes[guidedStep]}
                  onChange={(e) => {
                    const newArr = [...guidedCodes];
                    newArr[guidedStep] = e.target.value;
                    setGuidedCodes(newArr);
                  }}
                  label={`Step ${guidedStep + 1} Implementation Code`}
                />

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    onClick={() => {
                      const newComp = [...completedSteps];
                      newComp[guidedStep] = true;
                      setCompletedSteps(newComp);
                      if (guidedStep < 8) setGuidedStep(guidedStep + 1);
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
                  onClick={() => handleTabChange('interactive_activities')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Debugging Challenge &amp; Console <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 10: INTERACTIVE ACTIVITIES ==================== */}
        {isTabActive('interactive_activities') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Interactive Practice: Debugging &amp; Console Inspection
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Find and Fix the JavaScript Bugs
              </h2>

              {/* Debugging Challenge */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b', margin: 0 }}>
                    🐛 Buggy Code Challenge
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setShowDebugHint(!showDebugHint)} style={{ background: '#334155', color: '#fbbf24', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Hint</button>
                    <button onClick={() => setShowDebugSol(!showDebugSol)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Show Solution</button>
                  </div>
                </div>

                {showDebugHint && <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', color: '#fbbf24', fontSize: '0.85rem', marginBottom: '1rem' }}>💡 Hint: Check 1) missing '#' in querySelector("#contactBtn"), 2) capital 'L' in addEventListener, 3) capital 'C' in textContent.</div>}
                {showDebugSol && <div style={{ background: '#064e3b', padding: '10px', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.85rem', marginBottom: '1rem' }}>✅ Solution: <code>querySelector("#contactBtn")</code>, <code>addEventListener</code> (capital L), and <code>textContent</code> (capital C)!</div>}

                <LiveSyntaxCodeEditor
                  language="js"
                  rows={8}
                  value={debugCode}
                  onChange={(e) => setDebugCode(e.target.value)}
                  label="Fix the 3 Syntax Bugs Below"
                />

                <div style={{ marginTop: '1rem' }}>
                  <button
                    onClick={() => setDebugSolved(true)}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Check Fixes
                  </button>
                  {debugSolved && (
                    <div style={{ marginTop: '10px', color: '#34d399', fontWeight: 800, fontSize: '0.9rem' }}>
                      🎉 Excellent debugging! All 3 syntax errors fixed!
                    </div>
                  )}
                </div>
              </div>

              {/* Console Debugging Guide */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                  Browser Console Error Debugging Guide
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                  Always inspect browser Developer Tools $\rightarrow$ Console when JS fails to run. Look for: <strong>Error Type</strong> (e.g. <code>Uncaught ReferenceError</code>), <strong>File Name</strong> (e.g. <code>script.js</code>), and <strong>Line Number</strong>!
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('ai_tools')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: AI Explainer &amp; Debugger <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 11: AI TOOLS ==================== */}
        {isTabActive('ai_tools') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                AI Studio: JavaScript Explainer, Debugger &amp; Idea Generator
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                AI-Powered Code Assistance Studio
              </h2>

              {/* AI JS Explainer */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', margin: '0 0 1rem 0', fontWeight: 800 }}>
                  🤖 AI JavaScript Explainer (Line-by-Line)
                </h3>
                <textarea
                  rows={3}
                  value={aiExplainCode}
                  onChange={(e) => setAiExplainCode(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1e293b', color: '#fff', border: '1px solid #475569', fontSize: '0.85rem', marginBottom: '10px' }}
                />
                <button
                  onClick={() => setAiExplainResult("Line 1: Find the button element on the webpage.\nLine 2: Wait for a click event from the visitor.\nLine 3: Run the inner function and change title.textContent to 'Welcome!'.")}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Explain Code Line-by-Line
                </button>
                {aiExplainResult && (
                  <pre style={{ marginTop: '10px', background: '#1e293b', padding: '12px', borderRadius: '8px', color: '#34d399', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                    {aiExplainResult}
                  </pre>
                )}
              </div>

              {/* AI Debugging Assistant */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#f59e0b', margin: '0 0 1rem 0', fontWeight: 800 }}>
                  🛠️ AI Debugging Assistant
                </h3>
                <textarea
                  rows={2}
                  value={aiErrorCode}
                  onChange={(e) => setAiErrorCode(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1e293b', color: '#fff', border: '1px solid #475569', fontSize: '0.85rem', marginBottom: '10px' }}
                />
                <button
                  onClick={() => setAiErrorResult({
                    what: "ReferenceError: title is not defined",
                    why: "You tried to use variable 'title' before creating it with const title = document.querySelector('#mainTitle');",
                    hint: "Verify querySelector reference exists before calling title.textContent",
                    fix: "const title = document.querySelector('#mainTitle'); title.textContent = 'Welcome!';"
                  })}
                  style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Analyze Error
                </button>
                {aiErrorResult && (
                  <div style={{ marginTop: '10px', background: '#1e293b', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <div style={{ color: '#ef4444', fontWeight: 800 }}>Problem: {aiErrorResult.what}</div>
                    <div style={{ color: '#fbbf24' }}>Reason: {aiErrorResult.why}</div>
                    <div style={{ color: '#34d399' }}>Fix Section: {aiErrorResult.fix}</div>
                  </div>
                )}
              </div>

              {/* AI Interaction Idea Generator */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#a855f7', margin: '0 0 1rem 0', fontWeight: 800 }}>
                  💡 AI Business Interaction Idea Generator
                </h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={aiBusinessType}
                    onChange={(e) => setAiBusinessType(e.target.value)}
                    placeholder="e.g. Restaurant, Law Firm, Clinic"
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #475569', background: '#1e293b', color: '#fff', width: '240px' }}
                  />
                  <button
                    onClick={() => setAiIdeasResult([
                      "1. Mobile navigation menu drawer (☰ / ✕)",
                      "2. Special offer banner toggle",
                      "3. Service card highlight on click",
                      "4. Consultation availability status switcher",
                      "5. Callback reservation alert message"
                    ])}
                    style={{ background: '#a855f7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Generate 5 JS Ideas
                  </button>
                </div>
                {aiIdeasResult && (
                  <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', color: '#c084fc', fontSize: '0.88rem' }}>
                    {aiIdeasResult.map((idea, i) => <div key={i} style={{ margin: '4px 0' }}>{idea}</div>)}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('practice_assignment')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Practice, Assignment &amp; Reflection <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 12: PRACTICE & ASSIGNMENT ==================== */}
        {isTabActive('practice_assignment') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Practice Task &amp; Student Assignment Reflection
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Day 12 Assignment — JavaScript Interaction
              </h2>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                  Practice Task Requirements:
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>✓ External JS file linked in HTML</li>
                  <li>✓ Build Mobile Menu (☰ / ✕)</li>
                  <li>✓ Plus ONE additional interaction (Card highlight, Offer message, Theme toggle, or Text change)</li>
                  <li>✓ Add ONE simple <code>if / else</code> condition (e.g. Service availability)</li>
                </ul>
              </div>

              {/* Assignment Reflection Form */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', margin: '0 0 1rem 0', fontWeight: 800 }}>
                  Student Assignment Reflection Form
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>1. What HTML element did JavaScript control?</label>
                    <input type="text" value={reflectionAnswers.q1_elem} onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q1_elem: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>2. What event did you use?</label>
                    <input type="text" value={reflectionAnswers.q2_event} onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q2_event: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>3. What function did you create?</label>
                    <input type="text" value={reflectionAnswers.q3_fn} onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q3_fn: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>4. Which CSS class did JavaScript change?</label>
                    <input type="text" value={reflectionAnswers.q4_class} onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q4_class: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>5. Where did you use if / else?</label>
                    <input type="text" value={reflectionAnswers.q5_ifelse} onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q5_ifelse: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569' }} />
                  </div>
                </div>

                <button
                  onClick={() => setAssignmentSubmitted(true)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={16} /> Submit Day 12 Assignment &amp; Reflection
                </button>

                {assignmentSubmitted && (
                  <div style={{ marginTop: '10px', color: '#34d399', fontWeight: 800, fontSize: '0.9rem' }}>
                    🎉 Day 12 Assignment &amp; Reflection submitted successfully! Instructor evaluation recorded.
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('quiz')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Knowledge Check &amp; Course Progress <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 13: QUIZ & PROGRESS ==================== */}
        {isTabActive('quiz') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* 39. Quiz Section (15 Questions) */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Knowledge Check
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1.25rem 0' }}>
                Day 12 Quiz (15 Questions)
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
                    Score: {calculateScore()} / 15 ({Math.round((calculateScore() / 15) * 100)}%)
                  </div>
                )}
              </div>
            </div>

            {/* 42. Completion Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)', borderRadius: '20px', padding: '2rem', color: '#ffffff', boxShadow: '0 10px 25px rgba(30, 27, 75, 0.4)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.75rem 0' }}>
                🎉 Day 12 Complete!
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#c7d2fe', marginBottom: '1rem' }}>
                Today you learned:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.88rem' }}>
                {[
                  'What JavaScript is',
                  'HTML + CSS + JavaScript Formula',
                  'Variables & let / const',
                  'Strings, Numbers, Booleans',
                  'Basic Operators & Template Literals',
                  'DOM & querySelector()',
                  'element.textContent',
                  'addEventListener("click")',
                  'Functions & Event Flow',
                  'classList.add / remove / toggle',
                  'Mobile Menu Build (☰ / ✕)',
                  'if / else Conditions',
                  'console.log() & DevTools',
                  'AI Explainer & Debugging'
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.12)', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={16} color="#34d399" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Course Progress & Project Continuity Screen */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Course Progress: DAY 12 / 20
                </h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2563eb' }}>60% COMPLETE</span>
              </div>

              {/* Progress Bar */}
              <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '12px', width: '100%', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #2563eb, #10b981)', height: '100%', width: '60%', borderRadius: '10px' }} />
              </div>

              {/* Completed Days Checklist */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
                {[
                  "Day 1 ✓ Website & HTML Foundation",
                  "Day 2 ✓ Advanced HTML & Forms",
                  "Day 3 ✓ CSS Fundamentals",
                  "Day 4 ✓ Box Model & Positioning",
                  "Day 5 ✓ Flexbox",
                  "Day 6 ✓ CSS Grid",
                  "Day 7 ✓ CSS Units & UI Styling",
                  "Day 8 ✓ Animation & Responsive Design",
                  "Day 9 ✓ Complete Website Assembly",
                  "Day 10 ✓ Mini Project 1",
                  "Day 11 ✓ Advanced CSS Upgrade",
                  "Day 12 ✓ JavaScript Fundamentals"
                ].map((d, i) => (
                  <div key={i} style={{ background: '#f0fdf4', color: '#166534', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid #bbf7d0' }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* 44. Next Day Preview */}
              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Next Up:</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e40af', margin: '4px 0 6px 0' }}>
                  DAY 13 — DOM &amp; INTERACTIVE WEBSITE COMPONENTS
                </h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#1e3a8a' }}>
                  Learn Show / Hide content, FAQ Accordion, Tabs, Modals, Dynamic content, and Multiple event handling!
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
