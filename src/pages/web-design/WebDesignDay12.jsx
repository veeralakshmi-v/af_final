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
      'intro', 'dom_tree', 'selecting', 'modifying', 'classlist_styling',
      'events', 'forms_validation', 'projects_interactive', 'debugging', 'assessment'
    ];
    if (tabName === 'intro') {
      return activeTab === 'intro' || !validTabs.includes(activeTab);
    }
    return activeTab === tabName;
  };

  // Section 3: Element Selector Studio
  const [selectedElement, setSelectedElement] = useState('#main-heading');
  
  // Section 4: Text & Image Attribute Switcher
  const [welcomeText, setWelcomeText] = useState('Welcome Student');
  const [currentImg, setCurrentImg] = useState('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80');

  // Section 5: ClassList Panel Toggle
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isHighlightClass, setIsHighlightClass] = useState(false);

  // Section 6: Event Listener & Event Object Log
  const [eventLogs, setEventLogs] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  // Section 7: Form Interaction & Validation
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Section 8: Mobile Drawer, Counter & Show/Hide Password
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counterVal, setCounterVal] = useState(0);
  const [showReadMore, setShowReadMore] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('SecretPass123!');

  // Section 9: Console Debugger Simulator
  const [debugLog, setDebugLog] = useState(['> Console initialized.', '> Ready for DOM debugging.']);

  // Practice Challenges & Guided Solutions Toggle
  const [showPracticeSol, setShowPracticeSol] = useState({});
  const [showChallengeSol, setShowChallengeSol] = useState({});

  // Quiz State (15 Questions)
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Self-Assessment Checklist (14 Items)
  const [checklist, setChecklist] = useState({
    dom: false,
    elements: false,
    querySelector: false,
    textContent: false,
    attributes: false,
    classList: false,
    toggle: false,
    clickEvents: false,
    addEventListener: false,
    inputValues: false,
    preventDefault: false,
    mobileMenu: false,
    debugging: false,
    makeInteractive: false
  });

  const quizQuestions = [
    {
      id: 1,
      question: "Which technology is responsible for making static HTML/CSS web pages interactive?",
      options: ["HTML", "CSS", "JavaScript", "SQL"],
      correct: 2,
      explanation: "HTML provides the structure, CSS provides design/styling, and JavaScript handles dynamic behavior and user interaction."
    },
    {
      id: 2,
      question: "What does DOM stand for in web development?",
      options: ["Data Object Model", "Document Object Model", "Digital Oriented Module", "Document Oriented Matrix"],
      correct: 1,
      explanation: "DOM stands for Document Object Model. It is the tree structure representation of HTML elements created by the browser."
    },
    {
      id: 3,
      question: "Which method selects the FIRST element matching a specified CSS selector?",
      options: ["document.getElement()", "document.querySelector()", "document.querySelectorAll()", "document.find()"],
      correct: 1,
      explanation: "document.querySelector() returns the first element inside the document that matches the specified CSS selector."
    },
    {
      id: 4,
      question: "What does document.querySelectorAll('.card') return?",
      options: ["The first card element", "An array of numbers", "A NodeList (collection) of all matching elements", "A single string"],
      correct: 2,
      explanation: "document.querySelectorAll() returns a NodeList containing all elements matching the selector."
    },
    {
      id: 5,
      question: "Which property should you use to safely change plain text inside an element without parsing HTML tags?",
      options: ["innerHTML", "textContent", "innerTextHTML", "value"],
      correct: 1,
      explanation: "textContent safely sets or gets plain text without security risks (XSS) or HTML tag execution."
    },
    {
      id: 6,
      question: "Which method is used to change an HTML element attribute value dynamically in JavaScript?",
      options: ["element.changeAttr()", "element.setAttribute(name, value)", "element.modify()", "element.prop()"],
      correct: 1,
      explanation: "element.setAttribute(name, value) sets a new attribute value for the specified element."
    },
    {
      id: 7,
      question: "Which classList method adds a CSS class if it is missing, or removes it if it is already present?",
      options: ["classList.add()", "classList.remove()", "classList.toggle()", "classList.contains()"],
      correct: 2,
      explanation: "classList.toggle('className') flips the presence of a class, returning true if added and false if removed."
    },
    {
      id: 8,
      question: "Why is modifying CSS class names preferred over setting many inline style properties directly in JavaScript?",
      options: [
        "Inline styles run faster",
        "It maintains separation of concerns: CSS handles design rules, JavaScript controls behavior/state",
        "JavaScript cannot change colors directly",
        "Browsers disable inline styles"
      ],
      correct: 1,
      explanation: "Toggling CSS classes keeps presentation in CSS and logical state control in JavaScript, making code maintainable and clean."
    },
    {
      id: 9,
      question: "What is the recommended modern method to attach an event handler to a DOM element?",
      options: ["element.onclick = fn", "element.addEventListener('click', fn)", "element.attach('click')", "element.listen('click')"],
      correct: 1,
      explanation: "element.addEventListener('event', handler) is the standard modern method. It allows multiple listeners and better event control."
    },
    {
      id: 10,
      question: "Inside an event handler function, what does event.target represent?",
      options: [
        "The browser window",
        "The DOM element that triggered the event",
        "The parent document",
        "The CSS selector string"
      ],
      correct: 1,
      explanation: "event.target references the exact element on which the event was dispatched (e.g. the specific button clicked)."
    },
    {
      id: 11,
      question: "Which method stops a form from reloading the webpage when submitted?",
      options: ["event.stopForm()", "event.preventDefault()", "event.cancelSubmit()", "event.pause()"],
      correct: 1,
      explanation: "event.preventDefault() cancels the default browser action, preventing the form from submitting and reloading the page."
    },
    {
      id: 12,
      question: "How do you read the text entered by a user into an <input id='username'> element?",
      options: [
        "document.querySelector('#username').textContent",
        "document.querySelector('#username').value",
        "document.querySelector('#username').innerHTML",
        "document.querySelector('#username').getText()"
      ],
      correct: 1,
      explanation: "Form input elements store user text in the .value property."
    },
    {
      id: 13,
      question: "What happens if document.querySelector('#missing-id') does not find any element in the HTML document?",
      options: ["It throws a fatal crash", "It returns null", "It creates a new div", "It returns undefined"],
      correct: 1,
      explanation: "If no element matches the selector, querySelector() returns null. Accessing properties on null causes a TypeError."
    },
    {
      id: 14,
      question: "What developer tool is most useful for inspecting elements and logging variable values during DOM debugging?",
      options: ["CSS Validator", "Browser DevTools (Console & Elements tab)", "Database Manager", "Photoshop"],
      correct: 1,
      explanation: "Browser DevTools Console allows you to log values with console.log() and inspect DOM nodes live."
    },
    {
      id: 15,
      question: "In a mobile drawer navigation bar, what JavaScript action is typically triggered when clicking the hamburger icon?",
      options: [
        "navMenu.classList.toggle('active')",
        "document.reload()",
        "location.href = 'mobile.html'",
        "window.close()"
      ],
      correct: 0,
      explanation: "Toggling an 'active' class on the menu drawer container opens/closes the menu via CSS transform or display rules."
    }
  ];

  const handleQuizOptionSelect = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid Email is required';
    if (!formData.message.trim()) errors.message = 'Message cannot be empty';

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
  };

  const addEventLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setEventLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem 1.5rem', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ==================== TAB 1: FROM STATIC TO INTERACTIVE ==================== */}
        {isTabActive('intro') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* HEADER METADATA BANNER (Shown on Intro Tab) */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '2.5rem', color: '#ffffff', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'inline-block', marginBottom: '12px' }}>
                    DAY 12 — JavaScript &amp; DOM Interaction
                  </span>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                    Make Static Websites Interactive with JavaScript
                  </h1>
                  <p style={{ fontSize: '1.05rem', color: '#94a3b8', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
                    <strong>Learning Goal:</strong> Connect JavaScript with HTML elements, respond to user actions (clicks, inputs, submits), dynamically modify webpage content and styles using classList, and build practical website features like mobile navigation drawers, counters, and form validation.
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

              {/* 13 Learning Outcomes Grid */}
              <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', margin: '0 0 1rem 0', fontWeight: 800 }}>
                  🎯 Day 12 Learning Outcomes (13 Core Skills)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {[
                    "1. Relationship between HTML, CSS & JavaScript",
                    "2. Understand the Document Object Model (DOM)",
                    "3. Select HTML elements using querySelector()",
                    "4. Read & modify content with textContent",
                    "5. Modify element attributes (src, href, alt)",
                    "6. Dynamic styling using classList.toggle()",
                    "7. Handle user click, input & submit events",
                    "8. Utilize event object & event.preventDefault()",
                    "9. Validate user inputs & feedback states",
                    "10. Build interactive mobile drawer navigation",
                    "11. Implement dynamic increment/decrement counters",
                    "12. Create show/hide content panels & password toggles",
                    "13. Debug DOM null errors & use DevTools console"
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
                Section 1 — From Static to Interactive Websites
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                The Core Triad: HTML, CSS &amp; JavaScript
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                A static website displays text and images, but cannot respond dynamically when a user clicks a button, submits a form, or toggles a menu. JavaScript brings web pages to life by listening to user actions and modifying the page in real-time.
              </p>

              {/* The Triad Comparison Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', marginBottom: '4px' }}>1. HTML — Structure</div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#1e3a8a', fontWeight: 800 }}>The Bones of the Site</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.5 }}>
                    Defines headings, paragraphs, buttons, forms, images, and container boxes.
                  </p>
                </div>

                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '14px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', marginBottom: '4px' }}>2. CSS — Design</div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#14532d', fontWeight: 800 }}>The Skin &amp; Clothing</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#166534', lineHeight: 1.5 }}>
                    Defines colors, typography, spacing, layouts (Grid/Flexbox), and visual states.
                  </p>
                </div>

                <div style={{ background: '#fef3c7', padding: '1.25rem', borderRadius: '14px', border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', marginBottom: '4px' }}>3. JavaScript — Behavior</div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#78350f', fontWeight: 800 }}>The Brain &amp; Muscles</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#92400e', lineHeight: 1.5 }}>
                    Listens for clicks/taps, modifies text, toggles menus, calculates prices, and validates forms.
                  </p>
                </div>
              </div>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 1: Linking JavaScript to HTML (script tag)"
                  language="html"
                  code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Interactive Business Site</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 id="greeting">Welcome Student</h1>
  <button id="actionBtn">Click to Unlock</button>

  <!-- ALWAYS place script tag right before closing </body> tag -->
  <script src="app.js"></script>
</body>
</html>`}
                />
              </div>

              {/* Real World Examples List */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>
                  🌐 Real-World JavaScript Interactions on Client Websites
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {[
                    "📱 Mobile Navigation Drawer toggle",
                    "👁️ Show / Hide Password fields",
                    "🛒 Shopping Cart Quantity Counter",
                    "📋 Real-time Form Field Validation",
                    "🖼️ Image Gallery / Portfolio Switcher",
                    "💬 Notification Alert Banners"
                  ].map((ex, i) => (
                    <div key={i} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.86rem', color: '#334155', border: '1px solid #cbd5e1', fontWeight: 600 }}>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  onClick={() => handleTabChange('dom_tree')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Understanding the DOM <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: UNDERSTANDING THE DOM ==================== */}
        {isTabActive('dom_tree') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 2 — Understanding the Document Object Model (DOM)
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                How the Browser Sees Your Webpage
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                When a web browser loads your HTML document, it converts the raw code into an in-memory tree of objects called the <strong>Document Object Model (DOM)</strong>. JavaScript uses the global <code>document</code> object to inspect, modify, and delete nodes live.
              </p>

              {/* Conceptual Pipeline Flow */}
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#38bdf8', margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 800 }}>
                  ⚡ The HTML → DOM → JavaScript Pipeline
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <div style={{ background: '#1e293b', padding: '12px 18px', borderRadius: '10px', border: '1px solid #475569', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Step 1</div>
                    <div style={{ fontWeight: 800, color: '#f43f5e' }}>Raw HTML File</div>
                  </div>
                  <ChevronRight color="#94a3b8" />
                  <div style={{ background: '#1e293b', padding: '12px 18px', borderRadius: '10px', border: '1px solid #475569', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Step 2</div>
                    <div style={{ fontWeight: 800, color: '#fbbf24' }}>Browser Parser</div>
                  </div>
                  <ChevronRight color="#94a3b8" />
                  <div style={{ background: '#1e293b', padding: '12px 18px', borderRadius: '10px', border: '1px solid #475569', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Step 3</div>
                    <div style={{ fontWeight: 800, color: '#38bdf8' }}>DOM Tree Object</div>
                  </div>
                  <ChevronRight color="#94a3b8" />
                  <div style={{ background: '#1e293b', padding: '12px 18px', borderRadius: '10px', border: '1px solid #475569', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Step 4</div>
                    <div style={{ fontWeight: 800, color: '#34d399' }}>JavaScript Action</div>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 2: DOM Tree Hierarchy Representation"
                  language="html"
                  code={`<!-- HTML Markup -->
<div class="card">
  <h1 id="title">Welcome</h1>
  <p class="description">Learn Web Design</p>
</div>

/* How JavaScript Views the DOM Tree */
document (Root)
  └── html
       └── body
            └── div.card
                 ├── h1#title ("Welcome")
                 └── p.description ("Learn Web Design")`}
                />
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('selecting')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Selecting HTML Elements <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: SELECTING HTML ELEMENTS ==================== */}
        {isTabActive('selecting') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 3 — Selecting HTML Elements
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Mastering <code>querySelector()</code> and <code>querySelectorAll()</code>
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Before JavaScript can modify an element, it must select it first. While legacy methods like <code>getElementById()</code> exist, modern developers use <strong><code>querySelector()</code></strong> because it accepts standard CSS selector syntax.
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 3: DOM Element Selection Syntax"
                  language="javascript"
                  code={`// 1. Select Heading by ID (#)
const mainHeading = document.querySelector("#main-heading");

// 2. Select PRO Badge by Class (.) - Returns FIRST matching element
const badgeTag = document.querySelector(".badge-tag");

// 3. Select Action Button by Class (.)
const btnCta = document.querySelector(".btn-cta");

// 4. Select ALL feature boxes by Class (.) - Returns a NodeList collection
const featureBoxes = document.querySelectorAll(".feature-box");

console.log(mainHeading);  // Output: <div id="main-heading">🚀 AlphaFly Digital Agency...</div>
console.log(featureBoxes.length); // Output: 2`}
                />
              </div>

              {/* Interactive Practice Studio: Live Element Selector Visualizer */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  🎯 Interactive Studio: Live DOM Selector Playground
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Click a CSS selector below to watch JavaScript target and highlight the element in real-time!
                </p>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'document.querySelector("#main-heading")', val: '#main-heading' },
                    { label: 'document.querySelector(".badge-tag")', val: '.badge-tag' },
                    { label: 'document.querySelector(".btn-cta")', val: '.btn-cta' },
                    { label: 'document.querySelectorAll(".feature-box")', val: '.feature-box' }
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedElement(btn.val)}
                      style={{
                        background: selectedElement === btn.val ? '#2563eb' : '#1e293b',
                        color: selectedElement === btn.val ? '#ffffff' : '#94a3b8',
                        border: `1px solid ${selectedElement === btn.val ? '#2563eb' : '#475569'}`,
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Simulated Target HTML Canvas */}
                <div style={{ background: '#ffffff', color: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div
                    id="main-heading"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      marginBottom: '10px',
                      padding: '8px',
                      borderRadius: '6px',
                      outline: selectedElement === '#main-heading' ? '3px solid #2563eb' : 'none',
                      background: selectedElement === '#main-heading' ? 'rgba(37,99,235,0.1)' : 'transparent'
                    }}
                  >
                    🚀 AlphaFly Digital Agency <span className="badge-tag" style={{ fontSize: '0.75rem', background: '#38bdf8', color: '#fff', padding: '3px 8px', borderRadius: '12px', verticalAlign: 'middle', outline: selectedElement === '.badge-tag' ? '3px solid #f59e0b' : 'none' }}>PRO</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    <div className="feature-box" style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: selectedElement === '.feature-box' ? '3px solid #10b981' : 'none' }}>
                      ⚡ Fast Web Design
                    </div>
                    <div className="feature-box" style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: selectedElement === '.feature-box' ? '3px solid #10b981' : 'none' }}>
                      📱 Fully Responsive
                    </div>
                  </div>

                  <button className="btn-cta" style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', outline: selectedElement === '.btn-cta' ? '3px solid #ec4899' : 'none' }}>
                    Contact Client
                  </button>
                </div>
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('modifying')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Modifying Content &amp; Attributes <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: MODIFYING CONTENT & ATTRIBUTES ==================== */}
        {isTabActive('modifying') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Sections 4 &amp; 5 — Modifying Content &amp; Element Attributes
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                <code>textContent</code> vs <code>innerHTML</code> &amp; <code>setAttribute()</code>
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Use <strong><code>textContent</code></strong> when updating plain text (safe from security vulnerabilities). Use <code>setAttribute()</code> to modify image sources (<code>src</code>), link targets (<code>href</code>), or form placeholders dynamically.
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 4: Updating Content & Image Attributes"
                  language="javascript"
                  code={`const title = document.querySelector("#title");
const heroImg = document.querySelector("#heroImg");

// 1. Safe text modification using .textContent
title.textContent = "Welcome to Web Design!";

// 2. Modifying image source attribute using .setAttribute()
heroImg.setAttribute("src", "https://images.unsplash.com/photo-1498050108023-c5249f4df085");
heroImg.setAttribute("alt", "Code Laptop Workspace");

console.log(title.textContent); // Output: Welcome to Web Design!
console.log(heroImg.getAttribute("src")); // Output: https://images.unsplash.com/...`}
                />
              </div>

              {/* Interactive Practice Studio */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  🖼️ Interactive Practice Studio: Text &amp; Image Switcher
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Click the buttons below to trigger JavaScript DOM updates on the card headline and image source!
                </p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setWelcomeText('Welcome Student');
                      setCurrentImg('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80');
                    }}
                    style={{ background: '#1e293b', color: '#fff', border: '1px solid #475569', padding: '8px 14px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Reset (Default)
                  </button>
                  <button
                    onClick={() => {
                      setWelcomeText('Welcome to Web Design!');
                      setCurrentImg('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80');
                    }}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Change to "Web Design!" + Code Image
                  </button>
                </div>

                <div style={{ background: '#ffffff', color: '#0f172a', padding: '1.5rem', borderRadius: '12px', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    id="heroImg"
                    src={currentImg}
                    alt="Dynamic Switcher"
                    style={{ width: '160px', height: '110px', objectFit: 'cover', borderRadius: '10px', border: '2px solid #e2e8f0' }}
                  />
                  <div>
                    <h3 id="title" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
                      {welcomeText}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
                      Image <code>src</code> attribute set to: <br />
                      <span style={{ fontSize: '0.78rem', color: '#2563eb', wordBreak: 'break-all', fontWeight: 700 }}>{currentImg}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('classlist_styling')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: ClassList &amp; Dynamic Styling <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: CLASSLIST & DYNAMIC STYLING ==================== */}
        {isTabActive('classlist_styling') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 6 — ClassList &amp; Dynamic Styling
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Behavior vs Presentation: <code>classList.toggle()</code>
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Avoid changing dozens of individual inline CSS properties directly in JavaScript (e.g. <code>element.style.background = 'blue'</code>). Instead, write your styles in CSS classes and use JavaScript's <strong><code>classList.toggle()</code></strong> to switch state!
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 6: Managing CSS Class State in JavaScript"
                  language="javascript"
                  code={`const infoPanel = document.querySelector("#infoPanel");

// Managing CSS classes with classList:
infoPanel.classList.add("active");        // Show panel
infoPanel.classList.remove("active");     // Hide panel
infoPanel.classList.toggle("active");     // Flips visibility on button click
infoPanel.classList.toggle("highlight");  // Toggle yellow highlight background

console.log(infoPanel.classList.contains("active")); // Returns true or false`}
                />
              </div>

              {/* Interactive Practice Studio */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  🎛️ Live Practice Studio: Toggle Information Panel
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Click the toggle button to trigger <code>classList.toggle('active')</code> on the panel!
                </p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsPanelVisible(!isPanelVisible)}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Layers size={16} /> Toggle Panel (<code>classList.toggle</code>)
                  </button>
                  <button
                    onClick={() => setIsHighlightClass(!isHighlightClass)}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Sparkles size={16} /> Toggle Highlight Class
                  </button>
                </div>

                <div
                  style={{
                    background: isHighlightClass ? '#fef3c7' : '#ffffff',
                    color: '#0f172a',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: `2px solid ${isHighlightClass ? '#f59e0b' : '#e2e8f0'}`,
                    display: isPanelVisible ? 'block' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                    ℹ️ Secret Client Information Panel
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    This panel is controlled by toggling CSS classes! JavaScript manages state while CSS controls presentation.
                  </p>
                </div>

                {!isPanelVisible && (
                  <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center' }}>
                    Panel is currently <strong>hidden</strong> (active class removed).
                  </div>
                )}
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('events')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Event Listeners &amp; Event Object <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: EVENT LISTENERS & EVENT OBJECT ==================== */}
        {isTabActive('events') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Sections 7 &amp; 8 — Event Listeners &amp; The Event Object
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Responding to User Actions: <code>addEventListener()</code>
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                An <strong>event</strong> occurs whenever a user interacts with the page (clicking a button, typing into an input field, or submitting a form). The event handler receives an <strong><code>event</code></strong> object containing details like <code>event.target</code>.
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 7: Modern Event Listener Syntax"
                  language="javascript"
                  code={`const primaryBtn = document.querySelector("#primaryBtn");
const inspectBtn = document.querySelector("#inspectBtn");

// 1. Listening to click events
primaryBtn.addEventListener("click", (event) => {
  console.log("Clicked Primary CTA!");
});

// 2. Inspecting event.target in event handler callback
inspectBtn.addEventListener("click", (event) => {
  console.log("Triggered Element Tag:", event.target.tagName); // Output: BUTTON
  console.log("Element Inner Text:", event.target.innerText);   // Output: Inspect event.target
});`}
                />
              </div>

              {/* Interactive Practice Studio */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  ⚡ Live Practice Studio: Event Listener Inspector
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Click the buttons below to trigger events and inspect live event logs!
                </p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setClickCount(c => c + 1);
                      addEventLog(`Clicked 'Primary CTA' (Count: ${clickCount + 1})`);
                    }}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Click Primary CTA (Count: {clickCount})
                  </button>

                  <button
                    onClick={(e) => {
                      addEventLog(`Target Tag: <${e.target.tagName.toLowerCase()}> with text '${e.target.innerText}'`);
                    }}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Inspect event.target
                  </button>
                </div>

                {/* Event Logs Console View */}
                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', border: '1px solid #1e293b', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '6px' }}>📟 Event Inspector Log:</div>
                  {eventLogs.length === 0 ? (
                    <div style={{ color: '#64748b' }}>No events triggered yet. Click a button above!</div>
                  ) : (
                    eventLogs.map((log, idx) => (
                      <div key={idx} style={{ color: '#34d399', margin: '3px 0' }}>{log}</div>
                    ))
                  )}
                </div>
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('forms_validation')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Form Interaction &amp; Validation <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 7: FORM INTERACTION & VALIDATION ==================== */}
        {isTabActive('forms_validation') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 9 — Form Interaction &amp; Basic Validation
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Reading <code>value</code> &amp; Preventing Page Reloads
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                Forms reload the browser by default on submission. JavaScript intercepts form submission using <strong><code>event.preventDefault()</code></strong>, reads input field <strong><code>.value</code></strong>, and performs validation before giving instant user feedback.
              </p>

              {/* Code Example */}
              <div style={{ marginBottom: '1.5rem' }}>
                <CodeBlock
                  title="Section 9: Client-Side Form Validation Pattern"
                  language="javascript"
                  code={`const contactForm = document.querySelector("#contactForm");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#emailAddress");

contactForm.addEventListener("submit", (event) => {
  // 1. Prevent form from reloading the browser page
  event.preventDefault();

  // 2. Read user input values using .value
  const name = fullNameInput.value.trim();
  const email = emailInput.value.trim();

  // 3. Client-side validation check
  if (name === "" || email === "") {
    console.log("Validation Error: Please fill in all required fields!");
  } else {
    console.log("Form Submitted Successfully:", { name, email });
  }
});`}
                />
              </div>

              {/* Interactive Form Validator Practice */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  📋 Interactive Practice: Real-Time Form Validator
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Test submitting the form with empty fields vs valid details to see dynamic validation messages!
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #475569' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Kowsalya Devi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: formErrors.name ? '1px solid #ef4444' : '1px solid #475569' }}
                    />
                    {formErrors.name && <span style={{ color: '#f87171', fontSize: '0.78rem' }}>{formErrors.name}</span>}
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="kowsalya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: formErrors.email ? '1px solid #ef4444' : '1px solid #475569' }}
                    />
                    {formErrors.email && <span style={{ color: '#f87171', fontSize: '0.78rem' }}>{formErrors.email}</span>}
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Project Requirements *</label>
                    <textarea
                      rows="3"
                      placeholder="I need a modern landing page for my business..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: formErrors.message ? '1px solid #ef4444' : '1px solid #475569' }}
                    />
                    {formErrors.message && <span style={{ color: '#f87171', fontSize: '0.78rem' }}>{formErrors.message}</span>}
                  </div>

                  <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Send size={16} /> Submit Form (event.preventDefault())
                  </button>
                </form>

                {formSubmitted && (
                  <div style={{ marginTop: '1rem', background: '#064e3b', color: '#6ee7b7', padding: '1rem', borderRadius: '8px', border: '1px solid #065f46', fontWeight: 700 }}>
                    ✅ Form validated successfully! JavaScript intercepted submission without refreshing the page.
                  </div>
                )}
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('projects_interactive')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Mobile Drawer, Counter &amp; Show/Hide <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 8: PRACTICAL INTERACTIVE FEATURES ==================== */}
        {isTabActive('projects_interactive') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Sections 10, 11 &amp; 12 — Practical Interactive Features
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Building Mobile Drawer Nav, Dynamic Counter &amp; Password Toggle
              </h2>

              {/* Feature A: Mobile Navigation Drawer */}
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  📱 Section 10: Mobile Drawer Navigation Component
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  Click the menu button to toggle the <code>.active</code> class on the mobile nav drawer!
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <CodeBlock
                    title="Section 10: Mobile Drawer Toggle Code"
                    language="javascript"
                    code={`const menuBtn = document.querySelector("#menuBtn");
const drawerNav = document.querySelector("#drawerNav");

menuBtn.addEventListener("click", () => {
  // Toggle the active class to open/close mobile drawer
  drawerNav.classList.toggle("active");
});`}
                  />
                </div>

                <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1rem', border: '1px solid #475569' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#ffffff' }}>AlphaFly Agency</div>
                    <button
                      id="menuBtn"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
                    >
                      {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />} Menu
                    </button>
                  </div>

                  {/* Mobile Navigation Drawer Dropdown */}
                  {isMobileMenuOpen && (
                    <div id="drawerNav" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Home', 'Services', 'About', 'Portfolio', 'Contact Us'].map((item, idx) => (
                        <a key={idx} href={`#${item.toLowerCase()}`} style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 700, padding: '6px', borderRadius: '4px', background: '#0f172a' }}>
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Feature B: Dynamic Counter */}
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  🔢 Section 11: Dynamic Interactive Counter
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  Modify count variables and update <code>textContent</code> live on button clicks.
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <CodeBlock
                    title="Section 11: Dynamic Counter Code"
                    language="javascript"
                    code={`let count = 0;
const counterDisplay = document.querySelector("#counterDisplay");
const incBtn = document.querySelector("#incBtn");
const decBtn = document.querySelector("#decBtn");

incBtn.addEventListener("click", () => {
  count++;
  counterDisplay.textContent = count;
});

decBtn.addEventListener("click", () => {
  count--;
  counterDisplay.textContent = count;
});`}
                  />
                </div>

                <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #475569', display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'center' }}>
                  <button id="decBtn" onClick={() => setCounterVal(c => c - 1)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 900, fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
                  <div id="counterDisplay" style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', minWidth: '60px', textAlign: 'center' }}>{counterVal}</div>
                  <button id="incBtn" onClick={() => setCounterVal(c => c + 1)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 900, fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                  <button onClick={() => setCounterVal(0)} style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Reset</button>
                </div>
              </div>

              {/* Feature C: Show/Hide Password & Read More */}
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  👁️ Section 12: Show / Hide Password &amp; Read More Panel
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  Toggle input field <code>type</code> between <code>"password"</code> and <code>"text"</code>.
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <CodeBlock
                    title="Section 12: Password Toggle Code"
                    language="javascript"
                    code={`const passInput = document.querySelector("#passwordField");
const togglePassBtn = document.querySelector("#togglePassBtn");

togglePassBtn.addEventListener("click", () => {
  // Toggle input type attribute
  if (passInput.type === "password") {
    passInput.setAttribute("type", "text");
  } else {
    passInput.setAttribute("type", "password");
  }
});`}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {/* Password Toggle */}
                  <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '12px', border: '1px solid #475569' }}>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Password Input Field</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        id="passwordField"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #475569' }}
                      />
                      <button id="togglePassBtn" onClick={() => setShowPassword(!showPassword)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Read More Toggle */}
                  <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '12px', border: '1px solid #475569' }}>
                    <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '8px' }}>
                      Freelance Web Design Contract Terms...
                      {showReadMore && <span style={{ color: '#38bdf8' }}> Full payment required upon client signoff within 14 business days.</span>}
                    </div>
                    <button onClick={() => setShowReadMore(!showReadMore)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      {showReadMore ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('debugging')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: DOM Debugging &amp; DevTools <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 9: DOM DEBUGGING ==================== */}
        {isTabActive('debugging') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Section 13 — Simple DOM Debugging &amp; DevTools
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                Fixing Common DOM &amp; Event Handling Problems
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                When your JavaScript code fails to update the page, the root cause is almost always a <strong><code>null</code> selector</strong> or a typo in your event listener name. Use <code>console.log()</code> and browser DevTools to catch errors fast!
              </p>

              {/* Common Pitfalls Table */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 800 }}>
                  ⚠️ Top 5 Common DOM Bug Scenarios
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { bug: "Uncaught TypeError: Cannot set properties of null", fix: "Selector misspelled or <script> loaded before HTML elements rendered." },
                    { bug: "Form reloads page instantly without logging", fix: "Forgot to call event.preventDefault() inside submit listener." },
                    { bug: "Click event not triggering", fix: "Typo in event name ('onclick' instead of 'click' in addEventListener)." },
                    { bug: "Input value is empty", fix: "Reading input.value on page load instead of inside event callback." },
                    { bug: "Styles not updating", fix: "Used classList.toggle without CSS definition in stylesheet." }
                  ].map((item, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.86rem' }}>
                      <strong style={{ color: '#ef4444' }}>Bug:</strong> {item.bug} <br />
                      <strong style={{ color: '#10b981' }}>Fix:</strong> {item.fix}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Debug Console */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', border: '1px solid #334155', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', margin: '0 0 0.5rem 0' }}>
                  📟 Console.log() Debugging Simulator
                </h3>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setDebugLog(prev => [...prev, `> console.log(document.querySelector('#title')) => <h1 id="title">`])}
                    style={{ background: '#1e293b', color: '#fff', border: '1px solid #475569', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Run: Log Element
                  </button>
                  <button
                    onClick={() => setDebugLog(prev => [...prev, `> console.log(document.querySelector('#missing')) => null ❌ (Check selector ID!)`])}
                    style={{ background: '#991b1b', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Simulate Null Error
                  </button>
                  <button
                    onClick={() => setDebugLog(['> Console cleared.'])}
                    style={{ background: '#475569', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Clear Console
                  </button>
                </div>

                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', fontFamily: 'monospace', fontSize: '0.82rem', color: '#38bdf8' }}>
                  {debugLog.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>

              {/* Navigation button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTabChange('assessment')}
                  style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next: Guided Practice, Quiz &amp; Mini Project <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 10: PRACTICE, QUIZ, PROJECTS & ASSESSMENT ==================== */}
        {isTabActive('assessment') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* PART A: 6 GUIDED CODING EXERCISES */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem 0' }}>
                Part A: Guided Practice (6 Hands-on Exercises)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  {
                    id: 1,
                    title: "Exercise 1: Change Heading Text on Button Click",
                    objective: "Select an h1 element and change its textContent when a button is clicked.",
                    html: `<h1 id="headline">Original Headline</h1>\n<button id="changeBtn">Update Headline</button>`,
                    js: `const headline = document.querySelector("#headline");\nconst changeBtn = document.querySelector("#changeBtn");\n\nchangeBtn.addEventListener("click", () => {\n  headline.textContent = "JavaScript is Awesome!";\n});`,
                    hint: "Use querySelector and addEventListener('click', callback)."
                  },
                  {
                    id: 2,
                    title: "Exercise 2: Create a Show/Hide Information Panel",
                    objective: "Toggle an info panel between visible and hidden using classList.toggle().",
                    html: `<button id="toggleBtn">Show Info</button>\n<div id="infoBox" className="hidden">Secret client details...</div>`,
                    js: `const toggleBtn = document.querySelector("#toggleBtn");\nconst infoBox = document.querySelector("#infoBox");\n\ntoggleBtn.addEventListener("click", () => {\n  infoBox.classList.toggle("hidden");\n});`,
                    hint: "Define .hidden { display: none; } in your CSS file."
                  },
                  {
                    id: 3,
                    title: "Exercise 3: Create an Interactive Counter",
                    objective: "Build an increment/decrement counter updating textContent.",
                    html: `<button id="dec">-</button>\n<span id="num">0</span>\n<button id="inc">+</button>`,
                    js: `let count = 0;\nconst num = document.querySelector("#num");\ndocument.querySelector("#inc").addEventListener("click", () => {\n  count++;\n  num.textContent = count;\n});`,
                    hint: "Store the number in a let count variable."
                  },
                  {
                    id: 4,
                    title: "Exercise 4: Toggle CSS Class on Card Element",
                    objective: "Add/remove a 'highlight' class to a card when clicked.",
                    html: `<div id="card" className="card">Click to Highlight</div>`,
                    js: `const card = document.querySelector("#card");\ncard.addEventListener("click", () => {\n  card.classList.toggle("highlight");\n});`,
                    hint: "Target element directly with querySelector."
                  },
                  {
                    id: 5,
                    title: "Exercise 5: Dynamic Image Switcher",
                    objective: "Change an img src attribute when clicking thumbnails.",
                    html: `<img id="mainImg" src="pic1.jpg">\n<button id="btnImg">Switch Image</button>`,
                    js: `const mainImg = document.querySelector("#mainImg");\ndocument.querySelector("#btnImg").addEventListener("click", () => {\n  mainImg.setAttribute("src", "pic2.jpg");\n});`,
                    hint: "Use setAttribute('src', newUrl)."
                  },
                  {
                    id: 6,
                    title: "Exercise 6: Mobile Navigation Drawer Toggle",
                    objective: "Toggle a mobile drawer menu when clicking a hamburger icon.",
                    html: `<button id="menuBtn">☰</button>\n<nav id="mobileNav" className="drawer">Menu Links</nav>`,
                    js: `const menuBtn = document.querySelector("#menuBtn");\nconst mobileNav = document.querySelector("#mobileNav");\nmenuBtn.addEventListener("click", () => {\n  mobileNav.classList.toggle("active");\n});`,
                    hint: "Toggle the 'active' class on mobileNav."
                  }
                ].map((ex) => (
                  <div key={ex.id} style={{ background: '#f8fafc', borderRadius: '14px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563eb', margin: '0 0 6px 0' }}>
                      {ex.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 10px 0' }}>
                      <strong>Objective:</strong> {ex.objective}
                    </p>

                    <button
                      onClick={() => setShowPracticeSol(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                      style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginBottom: '10px' }}
                    >
                      {showPracticeSol[ex.id] ? 'Hide Solution' : 'View Code Solution & Explanation'}
                    </button>

                    {showPracticeSol[ex.id] && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                        <CodeBlock title={`Exercise ${ex.id} HTML`} language="html" code={ex.html} />
                        <CodeBlock title={`Exercise ${ex.id} JavaScript`} language="javascript" code={ex.js} />
                        <div style={{ background: '#eff6ff', color: '#1e40af', padding: '10px', borderRadius: '8px', fontSize: '0.82rem' }}>
                          💡 <strong>Hint:</strong> {ex.hint}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PART B: KNOWLEDGE CHECK QUIZ (15 QUESTIONS) */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Part B: Knowledge Check Quiz (15 Questions)
                </h2>
                {quizSubmitted && (
                  <div style={{ background: '#10b981', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem' }}>
                    Score: {calculateQuizScore()} / 15
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {quizQuestions.map((q, qIndex) => (
                  <div key={q.id} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                      Q{qIndex + 1}: {q.question}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', marginBottom: '10px' }}>
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[q.id] === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let bg = '#ffffff';
                        let border = '#cbd5e1';

                        if (quizSubmitted) {
                          if (isCorrect) { bg = '#dcfce7'; border = '#22c55e'; }
                          else if (isSelected && !isCorrect) { bg = '#fee2e2'; border = '#ef4444'; }
                        } else if (isSelected) {
                          bg = '#eff6ff'; border = '#2563eb';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => !quizSubmitted && handleQuizOptionSelect(q.id, optIdx)}
                            style={{
                              background: bg,
                              border: `2px solid ${border}`,
                              padding: '10px 14px',
                              borderRadius: '8px',
                              textAlign: 'left',
                              fontSize: '0.86rem',
                              fontWeight: isSelected ? 800 : 500,
                              cursor: quizSubmitted ? 'default' : 'pointer'
                            }}
                          >
                            {String.fromCharCode(65 + optIdx)}. {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', color: '#334155' }}>
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', marginTop: '1.5rem', width: '100%' }}
                >
                  Submit 15-Question Quiz &amp; View Explanations
                </button>
              ) : (
                <button
                  onClick={() => setQuizSubmitted(false)}
                  style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem' }}
                >
                  Reset Quiz &amp; Retake
                </button>
              )}
            </div>

            {/* PART C & D: PRACTICAL TASK & ASSIGNMENT */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem 0' }}>
                Part C &amp; D: Practical Task &amp; Freelance Assignment
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* Practical Task */}
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#ffffff', border: '1px solid #334155' }}>
                  <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>
                    🛠️ Practical Task: Convert Static Site to Interactive
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '12px' }}>
                    Take an existing static HTML/CSS business template and add 10 Vanilla JavaScript features:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    <li>1. Mobile navigation drawer toggle</li>
                    <li>2. Dynamic welcome message update</li>
                    <li>3. Show/hide client information panel</li>
                    <li>4. Interactive counter for stats</li>
                    <li>5. Button hover/active class state changes</li>
                    <li>6. Contact form validation with preventDefault()</li>
                    <li>7. Image src attribute switcher</li>
                    <li>8. Event listeners attached via addEventListener</li>
                    <li>9. Clean DOM selection with querySelector</li>
                    <li>10. Zero console errors during DevTools audit</li>
                  </ul>
                </div>

                {/* Assignment */}
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', color: '#ffffff', border: '1px solid #334155' }}>
                  <h3 style={{ color: '#fbbf24', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>
                    💼 Freelance Assignment: Interactive Business Site
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '12px' }}>
                    Choose 1 client niche (IT Institute, Restaurant, Salon, Real Estate, Gym, Agency) and add 5+ interactions:
                  </p>
                  <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '10px' }}>
                    ✅ Required Submission Deliverables:<br />
                    • index.html &amp; style.css<br />
                    • app.js (Vanilla JS file)<br />
                    • Screenshots / Live demo link
                  </div>
                </div>
              </div>
            </div>

            {/* PART E: MINI PROJECT */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem 0' }}>
                Part E: Mini Project — Interactive Business Landing Page
              </h2>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb', margin: '0 0 8px 0' }}>
                  🚀 Capstone Landing Page with 9 Sections &amp; 8 Vanilla JS Features
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '12px' }}>
                  Build a complete landing page containing: Header, Navigation, Hero, Services, About, Statistics, Testimonials, Contact, and Footer.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {[
                    "1. Mobile Navigation Drawer",
                    "2. Dynamic Hero Button State",
                    "3. Service Highlight Selector",
                    "4. Statistics Counter Component",
                    "5. Read More Show/Hide Panel",
                    "6. Form Validation & Error Feedback",
                    "7. Success Alert State",
                    "8. Smooth Scroll / Focus Action"
                  ].map((feat, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>
                      ✅ {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PART F: 14-ITEM SELF-ASSESSMENT CHECKLIST */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem 0' }}>
                Part F: Student Self-Assessment Checklist (14 Skills)
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
                {[
                  { key: 'dom', label: "I understand the DOM and document object." },
                  { key: 'elements', label: "I can identify DOM elements in HTML." },
                  { key: 'querySelector', label: "I can select elements with querySelector()." },
                  { key: 'textContent', label: "I can modify plain text with textContent." },
                  { key: 'attributes', label: "I can update attributes with setAttribute()." },
                  { key: 'classList', label: "I understand classList methods." },
                  { key: 'toggle', label: "I can toggle CSS classes with classList.toggle()." },
                  { key: 'clickEvents', label: "I can handle user click events." },
                  { key: 'addEventListener', label: "I can attach events with addEventListener()." },
                  { key: 'inputValues', label: "I can read user inputs using input.value." },
                  { key: 'preventDefault', label: "I can prevent form reloads with preventDefault()." },
                  { key: 'mobileMenu', label: "I can build a mobile drawer navigation bar." },
                  { key: 'debugging', label: "I can debug null errors using console.log()." },
                  { key: 'makeInteractive', label: "I can convert static web pages to interactive UI." }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleChecklist(item.key)}
                    style={{
                      background: checklist[item.key] ? '#f0fdf4' : '#ffffff',
                      border: `2px solid ${checklist[item.key] ? '#22c55e' : '#cbd5e1'}`,
                      padding: '10px 14px',
                      borderRadius: '10px',
                      textAlign: 'left',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: checklist[item.key] ? '#166534' : '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <CheckSquare size={18} color={checklist[item.key] ? '#22c55e' : '#94a3b8'} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PART G: DAY COMPLETION & UNLOCK DAY 13 */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '20px', padding: '2rem', color: '#ffffff', border: '1px solid #334155', textAlign: 'center' }}>
              <Trophy size={48} color="#fbbf24" style={{ margin: '0 auto 12px auto', display: 'block' }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 8px 0' }}>
                Ready to Complete Day 12?
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                Once you have completed all lessons, guided exercises, quiz questions, and the self-assessment checklist, click below to mark Day 12 finished and unlock <strong>Day 13 — Advanced JavaScript UI Components</strong>!
              </p>

              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('web_design_day13');
                  } else {
                    alert('🎉 Congratulations on completing Day 12! Unlocking Day 13...');
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px 36px',
                  borderRadius: '14px',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <CheckCircle size={22} /> Mark Day 12 Completed &amp; Unlock Day 13 <ArrowRight size={22} />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
