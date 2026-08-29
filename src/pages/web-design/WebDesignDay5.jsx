import React, { useState } from 'react';
import { 
  BookOpen, MonitorPlay, LayoutGrid, Layers, Code, PenTool,
  Briefcase, Sparkles, CheckCircle, Trophy, ChevronRight, 
  ArrowRight, Lightbulb, RefreshCw, Terminal, Eye, Sliders, Menu, X, Play, HelpCircle
} from 'lucide-react';

export default function WebDesignDay5({ activeTab = 'intro', onNavigate, openAITutor }) {
  const handleTabChange = (tabId) => {
    if (onNavigate) {
      onNavigate('web_design_day5', tabId);
    }
  };

  // --- Meaningful Completion & Progress Tracking State ---
  const [completedSteps, setCompletedSteps] = useState({
    intro: true,
    guidedBuild: 0, // 0 to 12 stages
    challenges: 0,
    assignment: false,
    aiChallenge: false,
    quiz: false
  });

  // --- Section 3: Visual Result Code Breakdown Toggle ---
  const [showTargetCodeBreakdown, setShowTargetCodeBreakdown] = useState(false);
  const [targetCodeTab, setTargetCodeTab] = useState('html');

  // --- Section 4: Component Explorer State ---
  const [selectedExplorerItem, setSelectedExplorerItem] = useState('grid');

  // --- Section 6: HTML Incremental Build Step ---
  const [htmlBuildStep, setHtmlBuildStep] = useState(1);

  // --- Section 10: Grid Interactive Visualizer State ---
  const [gridCols, setGridCols] = useState(3); // 1, 2, 3, 4
  const [gridGap, setGridGap] = useState(30); // 10, 20, 30, 40 px

  // --- Section 17: Interactive Hover State & Mouse Listeners ---
  const [hoverMode, setHoverMode] = useState('advanced'); // 'none' | 'simple' | 'advanced'
  const [demoCardIsHovered, setDemoCardIsHovered] = useState(false);
  const [hoveredTargetIndex, setHoveredTargetIndex] = useState(null);
  const [hoveredBusinessIndex, setHoveredBusinessIndex] = useState(null);

  // --- Section 19: Content Activity Business Selection ---
  const [activeBusinessTab, setActiveBusinessTab] = useState('training'); // 'training' | 'restaurant' | 'gym'

  // --- Section 20: Responsive Device Tester State ---
  const [responsiveDevice, setResponsiveDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // --- Section 23: Live Code Playground State ---
  const [playgroundHtml, setPlaygroundHtml] = useState(`<section id="services" class="services-section">
  <div class="services-container">
    <span class="section-label">WHAT WE OFFER</span>
    <h2 class="section-title">Practical Training Tracks Built for Job Growth</h2>
    <p class="section-description">
      Choose a career-oriented learning track designed with hands-on client projects and 1-on-1 guidance.
    </p>

    <div class="services-grid">
      <div class="service-card">
        <div class="service-icon">💻</div>
        <h3 class="service-name">Web Development</h3>
        <p class="service-desc">Master HTML5, CSS3, JavaScript, and Flexbox layout building real websites.</p>
        <a href="#courses" class="btn-service">Explore Track →</a>
      </div>

      <div class="service-card">
        <div class="service-icon">📊</div>
        <h3 class="service-name">Data & Analytics</h3>
        <p class="service-desc">Learn SQL, Python, data visualization, and reporting for business insights.</p>
        <a href="#courses" class="btn-service">Explore Track →</a>
      </div>

      <div class="service-card">
        <div class="service-icon">🤖</div>
        <h3 class="service-name">AI Solutions</h3>
        <p class="service-desc">Harness AI prompts, workflows, and tools for modern web applications.</p>
        <a href="#courses" class="btn-service">Explore Track →</a>
      </div>
    </div>
  </div>
</section>`);

  const [playgroundCss, setPlaygroundCss] = useState(`.services-section { padding: 4rem 2rem; background: #f8fafc; color: #0f172a; text-align: center; }
.services-container { max-width: 1200px; margin: 0 auto; }
.section-label { font-size: 0.8rem; font-weight: 800; color: #2563eb; letter-spacing: 1px; }
.section-title { font-size: 2rem; font-weight: 900; color: #0f172a; margin: 0.5rem 0 1rem 0; }
.section-description { font-size: 0.95rem; color: #64748b; margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }

.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: left; }

.service-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.18);
  border-color: #2563eb;
}

.service-icon { font-size: 2.2rem; margin-bottom: 1rem; }
.service-name { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
.service-desc { font-size: 0.88rem; color: #64748b; line-height: 1.6; margin-bottom: 1.25rem; }
.btn-service { color: #2563eb; font-weight: 800; font-size: 0.88rem; text-decoration: none; display: inline-block; }`);

  // --- Section 24: Guided Build Stages (12 Stages) ---
  const [guidedBuildStage, setGuidedBuildStage] = useState(1);

  // --- Section 25: Predict Output State ---
  const [predictionAnswer, setPredictionAnswer] = useState(null);
  const [showPredictionResult, setShowPredictionResult] = useState(false);

  // --- Section 26: Debugging Challenge State ---
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugAnswer, setShowDebugAnswer] = useState(false);

  // --- Section 27: AI Challenge State ---
  const [aiBusinessTypeInput, setAiBusinessTypeInput] = useState('Alpha Fly Theni');
  const [aiAudienceInput, setAiAudienceInput] = useState('College Students in Theni');
  const [aiGeneratedServices, setAiGeneratedServices] = useState(null);

  // --- Section 31: Quiz Answers State ---
  const [quizAnswers, setQuizAnswers] = useState({});

  // ---------------- Data Collections ----------------
  const explorerItemsData = {
    icon: {
      name: 'Service Icon / Visual Symbol',
      purpose: 'Provides an immediate visual clue to help visitors identify the service category at a glance.',
      htmlRole: '<div class="service-icon">💻</div>',
      cssRole: 'font-size: 2.2rem; margin-bottom: 1rem;'
    },
    title: {
      name: 'Service Title (H3)',
      purpose: 'Clearly names the specific service offering using concise, professional terminology.',
      htmlRole: '<h3 class="service-name">Web Development</h3>',
      cssRole: 'font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;'
    },
    description: {
      name: 'Service Description (P)',
      purpose: 'Gives visitors a quick 2-sentence summary of what the service includes and its core benefit.',
      htmlRole: '<p class="service-desc">Master HTML5, CSS3, JavaScript...</p>',
      cssRole: 'font-size: 0.88rem; color: #64748b; line-height: 1.6; margin-bottom: 1.25rem;'
    },
    cta: {
      name: 'Service CTA Link / Action',
      purpose: 'Directs the interested visitor to take action (e.g., View Details, Register, Contact).',
      htmlRole: '<a href="#courses" class="btn-service">Explore Track →</a>',
      cssRole: 'color: #2563eb; font-weight: 800; text-decoration: none;'
    },
    grid: {
      name: 'CSS Grid Container (.services-grid)',
      purpose: 'Arranges repeated card components into neat columns and rows with balanced spacing.',
      htmlRole: '<div class="services-grid"><!-- Service Cards --></div>',
      cssRole: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;'
    }
  };

  const businessCardsData = {
    training: [
      { icon: '💻', name: 'Web Development', desc: 'Build practical web applications using HTML, CSS, JavaScript, and React.' },
      { icon: '📊', name: 'Data & Analytics', desc: 'Master SQL databases, Python analysis, and business dashboards.' },
      { icon: '🤖', name: 'AI Solutions', desc: 'Explore practical AI tools, prompt engineering, and workflow automation.' },
      { icon: '⚡', name: 'Digital Skills', desc: 'Essential computer literacy, internet navigation, and office software tools.' }
    ],
    restaurant: [
      { icon: '🍽️', name: 'Dine-In Menu', desc: 'Authentic South Indian & multi-cuisine dishes served in a comfortable environment.' },
      { icon: '📦', name: 'Online Takeaway', desc: 'Fast packaging and quick home delivery across Theni city.' },
      { icon: '🎉', name: 'Event Catering', desc: 'Custom party menus for weddings, birthdays, and corporate celebrations.' },
      { icon: '☕', name: 'Bakery & Beverages', desc: 'Freshly brewed coffees, artisan teas, and house-made pastries.' }
    ],
    gym: [
      { icon: '🏋️‍♂️', name: 'Personal Training', desc: '1-on-1 fitness coaching tailored specifically to your body transformation goals.' },
      { icon: '🧘‍♀️', name: 'Group Yoga & Cardio', desc: 'Energizing daily group fitness sessions led by certified trainers.' },
      { icon: '🥗', name: 'Nutrition Counseling', desc: 'Custom meal planning and dietary tracking for healthy weight management.' },
      { icon: '💪', name: 'Strength Conditioning', desc: 'Advanced weightlifting equipment and recovery amenities.' }
    ]
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the primary business purpose of a Services Section on a website?',
      options: [
        'To list browser updates.',
        'To present the core services, solutions, or categories a business offers so visitors can explore options.',
        'To hide navigation links.',
        'To display random background colors.'
      ],
      correct: 1,
      explanation: 'A Services section categorizes the major offerings of a business, helping visitors find solutions.'
    },
    {
      id: 'q2',
      question: 'What is a "Card" in modern web design?',
      options: [
        'A physical credit card stored in the browser.',
        'A self-contained UI container that groups related content (icon, title, description, CTA) for repeated items.',
        'A JavaScript variable function.',
        'A table row tag.'
      ],
      correct: 1,
      explanation: 'Cards group related visual and text information into a neat, reusable component box.'
    },
    {
      id: 'q3',
      question: 'What is the key practical difference between CSS Grid and Flexbox?',
      options: [
        'Grid is 2-dimensional (arranging items across rows and columns), while Flexbox is mainly 1-dimensional (arranging items along a single row or column).',
        'Grid only works with text while Flexbox only works with images.',
        'Flexbox is obsolete and cannot be used.',
        'Grid does not support gap spacing.'
      ],
      correct: 0,
      explanation: 'CSS Grid excels at 2D row/column grids (like service cards), whereas Flexbox excels at 1D layouts (like navbars).'
    },
    {
      id: 'q4',
      question: 'Which CSS declaration creates 3 equal-width columns in a CSS Grid container?',
      options: [
        'grid-template-columns: repeat(3, 1fr);',
        'flex-direction: column;',
        'columns: 3px;',
        'display: block;'
      ],
      correct: 0,
      explanation: 'repeat(3, 1fr) splits available container width into 3 equal fractional units.'
    },
    {
      id: 'q5',
      question: 'What does the CSS `gap` property do inside a CSS Grid container?',
      options: [
        'It sets the spacing between adjacent grid items without adding extra margins to outer container edges.',
        'It deletes background colors.',
        'It forces all cards to float left.',
        'It shrinks font size.'
      ],
      correct: 0,
      explanation: '`gap` specifies clean, consistent spacing between grid rows and columns.'
    },
    {
      id: 'q6',
      question: 'Why do we create a reusable CSS class like `.service-card` instead of inline styling every card?',
      options: [
        'Changing one property on `.service-card` instantly updates all service cards across the entire website.',
        'Reusable classes force images to hide.',
        'It prevents JavaScript from running.',
        'Inline styling is required by HTML standards.'
      ],
      correct: 0,
      explanation: 'Reusable component classes make codebase maintenance clean, consistent, and effortless.'
    },
    {
      id: 'q7',
      question: 'What happens when a student applies `:hover` with `transform: translateY(-6px);` and `transition: all 0.3s ease;` to a card?',
      options: [
        'The card smoothly lifts upward by 6px when the user hovers over it, giving interactive feedback.',
        'The card flips upside down.',
        'The card gets permanently deleted.',
        'The card shrinks to zero width.'
      ],
      correct: 0,
      explanation: 'Combining translateY with smooth transition creates subtle, interactive micro-animations.'
    },
    {
      id: 'q8',
      question: 'How should a 3-column service card grid respond on narrow mobile phone screens?',
      options: [
        'It should collapse into a single-column vertical stack (1 card per row) so text remains readable.',
        'It should keep 3 columns and force horizontal scrollbars.',
        'It should delete all card text.',
        'It should freeze the user screen.'
      ],
      correct: 0,
      explanation: 'Responsive media queries change `grid-template-columns: 1fr;` on mobile screens for optimal readability.'
    },
    {
      id: 'q9',
      question: 'Why is visual hierarchy inside a card (Icon → Title → Description → CTA) important?',
      options: [
        'It guides the visitor\'s eye naturally so they scan key information effortlessly.',
        'Because browsers require H3 tags to follow icons.',
        'It makes the website load slower.',
        'It disables hover effects.'
      ],
      correct: 0,
      explanation: 'Clear visual hierarchy prioritizes information scanning order for website visitors.'
    },
    {
      id: 'q10',
      question: 'Why do we connect `<section id="services">` to the navbar link `<a href="#services">`?',
      options: [
        'So clicking "Services" in the top navbar smoothly scrolls the browser down to this section.',
        'To reload the page on every click.',
        'To open an external email app.',
        'To change the URL domain name.'
      ],
      correct: 0,
      explanation: 'Anchor IDs connect navigation menu items directly to their corresponding page sections.'
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

  const quizAttempted = Object.keys(quizAnswers).length === 10;
  const isDay5Completed = guidedBuildStage >= 12 && quizAttempted;
  
  // Progress calculation for Day 5 (25% overall)
  const overallCourseProgress = isDay5Completed ? 25 : 20 + Math.round((guidedBuildStage / 12) * 5);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      
      {/* 💅 GLOBAL CSS STYLES FOR HOVER ANIMATION */}
      <style>{`
        .service-card-hoverable {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer;
        }
        .service-card-hoverable:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 14px 28px rgba(37, 99, 235, 0.18) !important;
          border-color: #2563eb !important;
        }
      `}</style>

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
            Day 5 • 20 Days Progressive Practical Track
          </span>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          Day 5 — Build a Professional Services Section
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#e0e7ff', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
          Master HTML <code>&lt;section id="services"&gt;</code>, service cards, CSS Grid layout, <code>grid-template-columns</code>, <code>gap</code>, hover animations, and responsive card grids for <strong>Alpha Fly Theni</strong>.
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
            AI-Powered Web Design • Day 5 / 20
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
            <span>Build Stage: {guidedBuildStage}/12</span>
            <span>Quiz: {quizAttempted ? `${calculateQuizScore()}/10` : '○'}</span>
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

      {/* ==================== SECTION 1 & 2: OBJECTIVE & REAL BUSINESS QUESTION ==================== */}
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
                🖥️ Continuous Project — Navbar (Day 2) + Hero (Day 3) + About (Day 4) + Services Section (Day 5)
              </div>

              {/* Navbar */}
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '6px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#cbd5e1' }}>Home</span>
                  <span style={{ color: '#cbd5e1' }}>About</span>
                  <span style={{ color: '#60a5fa', fontWeight: 800 }}>Services</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>Login</button>
              </header>

              {/* Day 5 Services Section Target Preview */}
              <div style={{ background: '#f8fafc', color: '#0f172a', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px' }}>WHAT WE OFFER</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '4px 0 6px 0', color: '#0f172a' }}>Practical Learning Tracks Built for Job Growth</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 1.25rem 0', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Choose a career-oriented learning track designed around hands-on client projects...
                </p>

                {/* Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', textAlign: 'left' }}>
                  <div className="service-card-hoverable" style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>💻</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Web Development</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 8px 0' }}>Build responsive websites with HTML, CSS &amp; JavaScript.</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>Explore Track →</span>
                  </div>

                  <div className="service-card-hoverable" style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>📊</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Data &amp; Analytics</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 8px 0' }}>Master SQL, Python &amp; business dashboards.</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>Explore Track →</span>
                  </div>

                  <div className="service-card-hoverable" style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🤖</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>AI Solutions</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 8px 0' }}>Harness modern AI tools &amp; web workflows.</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>Explore Track →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Question Block */}
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', borderRadius: '0 12px 12px 0', padding: '1.5rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
                "A visitor understands your business. What do they want to know next?"
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                For a training institute like <strong>Alpha Fly Theni</strong>, interested visitors ask:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>1. What courses/services do you offer?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>2. Which track fits my skill level?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>3. What is included in each option?</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>4. How do I get started?</div>
              </div>

              <div style={{ marginTop: '1.25rem', background: '#eff6ff', padding: '1rem', borderRadius: '10px', color: '#1e40af', fontSize: '0.9rem', fontWeight: 800 }}>
                💡 Answering these questions organized in neat cards is the exact job of a <strong>SERVICES SECTION</strong>!
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
            Next: Target Result &amp; Card Explorer <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== SECTION 3 & 4: TARGET RESULT & CARD EXPLORER ==================== */}
      {activeTab === 'visual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Target Result Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Target Visual Result &amp; Code Breakdown
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Below is the exact Services Section you will build today for <strong>Alpha Fly Theni</strong>. Click <strong>[See How It Is Built]</strong> to inspect its HTML &amp; CSS code:
            </p>

            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Live Target Services Section:</span>
                <button
                  onClick={() => setShowTargetCodeBreakdown(!showTargetCodeBreakdown)}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {showTargetCodeBreakdown ? 'Hide Code Breakdown' : 'See How It Is Built'}
                </button>
              </div>

              {/* Day 5 Services Section Live Output */}
              <section id="services" style={{ background: '#ffffff', color: '#0f172a', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px' }}>WHAT WE OFFER</span>
                <h2 style={{ fontSize: '1.7rem', fontWeight: 900, margin: '0.5rem 0 0.75rem 0', color: '#0f172a' }}>Practical Learning Tracks Built for Job Growth</h2>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 2rem 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Choose a career-oriented learning track designed with hands-on client projects and 1-on-1 guidance.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
                  {businessCardsData.training.map((card, i) => (
                    <div 
                      key={i} 
                      className="service-card-hoverable"
                      onMouseEnter={() => setHoveredTargetIndex(i)}
                      onMouseLeave={() => setHoveredTargetIndex(null)}
                      style={{ 
                        background: '#ffffff', 
                        border: hoveredTargetIndex === i ? '2px solid #2563eb' : '1px solid #e2e8f0', 
                        borderRadius: '14px', 
                        padding: '1.5rem', 
                        boxShadow: hoveredTargetIndex === i ? '0 14px 28px rgba(37, 99, 235, 0.18)' : '0 4px 12px rgba(0,0,0,0.03)',
                        transform: hoveredTargetIndex === i ? 'translateY(-8px)' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>{card.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 1rem 0' }}>{card.desc}</p>
                      <a href="#courses" style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.84rem', textDecoration: 'none' }}>Explore Track →</a>
                    </div>
                  ))}
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
                      CSS Grid Styling
                    </button>
                  </div>

                  {targetCodeTab === 'html' ? (
                    <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', color: '#38bdf8', fontSize: '0.82rem', margin: 0, overflowX: 'auto' }}>
{`<section id="services" class="services-section">
  <span class="section-label">WHAT WE OFFER</span>
  <h2 class="section-title">Practical Learning Tracks Built for Job Growth</h2>
  <div class="services-grid">
    <div class="service-card">
      <div class="service-icon">💻</div>
      <h3 class="service-name">Web Development</h3>
      <p class="service-desc">Build practical web applications...</p>
      <a href="#courses" class="btn-service">Explore Track →</a>
    </div>
  </div>
</section>`}
                    </pre>
                  ) : (
                    <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', color: '#34d399', fontSize: '0.82rem', margin: 0, overflowX: 'auto' }}>
{`.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.service-card { background: #ffffff; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; transition: all 0.3s ease; }
.service-card:hover { transform: translateY(-8px); box-shadow: 0 14px 28px rgba(37, 99, 235, 0.18); border-color: #2563eb; }`}
                    </pre>
                  )}
                </div>
              )}
            </div>

            {/* Component Explorer */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '1.5rem 0 0.75rem 0' }}>
              🔍 Service Card Inspector (Click any component)
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
              Click an element below to inspect its practical role, HTML tag, and CSS styling:
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

      {/* ==================== SECTION 5, 6, 7: PHYSICAL ANALOGY & STEP-BY-STEP HTML BUILDER ==================== */}
      {activeTab === 'html_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Card Concept Analogy */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              What is a Card? (Physical Menu Board Analogy)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Imagine a physical restaurant menu board with distinct framed boxes for each meal package. Each box has a food icon, title, description, and price. That is a web <strong>Card</strong>!
            </p>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem', color: '#1e40af', fontSize: '0.88rem' }}>
              💡 Cards are the standard UI component whenever displaying <strong>repeated structured content</strong> (Services, Courses, Products, Pricing Plans, Blog posts).
            </div>
          </div>

          {/* Incremental HTML Builder */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Step-by-Step HTML Card Construction (6 Steps)
            </h2>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { step: 1, label: 'Step 1: <section id="services">' },
                { step: 2, label: 'Step 2: Section Label' },
                { step: 3, label: 'Step 3: Heading (H2)' },
                { step: 4, label: 'Step 4: Paragraph' },
                { step: 5, label: 'Step 5: Single Card' },
                { step: 6, label: 'Step 6: Repeated Cards Grid' }
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
                  HTML Code (Step {htmlBuildStep} of 6):
                </label>
                <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', color: '#38bdf8', fontSize: '0.84rem', margin: 0, minHeight: '200px' }}>
{htmlBuildStep === 1 && `<section id="services" class="services-section">\n</section>`}
{htmlBuildStep === 2 && `<section id="services" class="services-section">\n  <span class="section-label">WHAT WE OFFER</span>\n</section>`}
{htmlBuildStep === 3 && `<section id="services" class="services-section">\n  <span class="section-label">WHAT WE OFFER</span>\n  <h2 class="section-title">Practical Learning Tracks</h2>\n</section>`}
{htmlBuildStep === 4 && `<section id="services" class="services-section">\n  <span class="section-label">WHAT WE OFFER</span>\n  <h2>Practical Learning Tracks</h2>\n  <p>Choose a career-oriented learning track...</p>\n</section>`}
{htmlBuildStep === 5 && `<section id="services" class="services-section">\n  <div class="service-card">\n    <div class="service-icon">💻</div>\n    <h3>Web Development</h3>\n    <p>Build practical web apps...</p>\n    <a href="#courses">Explore →</a>\n  </div>\n</section>`}
{htmlBuildStep === 6 && `<section id="services" class="services-section">\n  <div class="services-grid">\n    <div class="service-card">💻 Web Dev</div>\n    <div class="service-card">📊 Data</div>\n    <div class="service-card">🤖 AI</div>\n  </div>\n</section>`}
                </pre>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 4 }}>
                  Unstyled Live Browser Render:
                </label>
                <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '12px', padding: '1rem', minHeight: '200px', fontFamily: 'Times New Roman, serif' }}>
                  {htmlBuildStep >= 2 && <div style={{ fontSize: '0.8rem' }}>WHAT WE OFFER</div>}
                  {htmlBuildStep >= 3 && <h2 style={{ fontSize: '1.4rem', margin: '4px 0' }}>Practical Learning Tracks</h2>}
                  {htmlBuildStep >= 4 && <p style={{ margin: '4px 0' }}>Choose a career-oriented learning track...</p>}
                  {htmlBuildStep >= 5 && <div style={{ border: '1px solid #ccc', padding: '8px', margin: '6px 0' }}>[Card 1: 💻 Web Development]</div>}
                  {htmlBuildStep >= 6 && <div style={{ margin: '6px 0', fontSize: '0.85rem' }}>[Card 1: 💻 Web Dev]<br/>[Card 2: 📊 Data]<br/>[Card 3: 🤖 AI]</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SECTION 8, 9, 10, 11: CSS GRID LAYOUT & VISUALIZER ==================== */}
      {activeTab === 'css_grid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* CSS Grid Problem & Solution */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              How Do We Arrange Service Cards into Neat Columns?
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Without CSS Grid, HTML block cards stack in one long vertical line. <code>display: grid</code> arranges them across rows and columns!
            </p>

            {/* Interactive Grid Visualizer */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem 0' }}>
                🎛️ Interactive CSS Grid Visualizer
              </h3>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Columns (`grid-template-columns`):
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4].map(c => (
                      <button
                        key={c}
                        onClick={() => setGridCols(c)}
                        style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', fontWeight: 800, cursor: 'pointer', background: gridCols === c ? '#2563eb' : '#e2e8f0', color: gridCols === c ? 'white' : '#475569' }}
                      >
                        {c} Col{c > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Gap (`gap`):
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[10, 20, 30, 40].map(g => (
                      <button
                        key={g}
                        onClick={() => setGridGap(g)}
                        style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', fontWeight: 800, cursor: 'pointer', background: gridGap === g ? '#16a34a' : '#e2e8f0', color: gridGap === g ? 'white' : '#475569' }}
                      >
                        {g}px
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Grid Output */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                gap: `${gridGap}px`,
                background: '#0f172a',
                padding: '1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                {['💻 Web Dev', '📊 Data', '🤖 AI', '⚡ Digital', '🎨 Design', '📱 Mobile'].map((title, idx) => (
                  <div key={idx} className="service-card-hoverable" style={{ background: '#ffffff', color: '#0f172a', padding: '1rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem' }}>
                    {title}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid vs Flexbox Comparison */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '1.5rem 0 0.75rem 0' }}>
              Grid vs Flexbox Practical Comparison
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', color: '#1e40af' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 900 }}>⚡ Flexbox (1-Dimensional)</h4>
                <p style={{ fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>Best when arranging items mainly along one direction (horizontal or vertical).</p>
                <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>Examples: Navbar menu links, button groups, icon + text rows.</div>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem', color: '#166534' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 900 }}>📐 CSS Grid (2-Dimensional)</h4>
                <p style={{ fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>Best when arranging repeated content across rows and columns simultaneously.</p>
                <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>Examples: Service cards, course catalogues, product galleries.</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== SECTION 12, 13, 14, 15, 16, 17: CARDS, REUSABLE CSS & HOVER ==================== */}
      {activeTab === 'cards_hover' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Hover Effects & 3-Way Comparison */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Card Hover Animation Comparison
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Compare how `:hover` improves user feedback when hovering your cursor over a service card:
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setHoverMode('none')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: hoverMode === 'none' ? '#64748b' : '#f1f5f9', color: hoverMode === 'none' ? 'white' : '#475569' }}
              >
                1. [No Hover]
              </button>
              <button
                onClick={() => setHoverMode('simple')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: hoverMode === 'simple' ? '#0284c7' : '#f1f5f9', color: hoverMode === 'simple' ? 'white' : '#475569' }}
              >
                2. [Simple Border Change]
              </button>
              <button
                onClick={() => setHoverMode('advanced')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: hoverMode === 'advanced' ? '#2563eb' : '#f1f5f9', color: hoverMode === 'advanced' ? 'white' : '#475569' }}
              >
                3. [Advanced Lift + Shadow]
              </button>
            </div>

            {/* Interactive Card Output */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '14px', display: 'flex', justifyContent: 'center' }}>
              <div
                onMouseEnter={() => setDemoCardIsHovered(true)}
                onMouseLeave={() => setDemoCardIsHovered(false)}
                style={{
                  background: '#ffffff',
                  border: (hoverMode === 'simple' || demoCardIsHovered) ? '2px solid #2563eb' : '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  maxWidth: '300px',
                  boxShadow: (hoverMode === 'advanced' || demoCardIsHovered) ? '0 14px 28px rgba(37, 99, 235, 0.18)' : '0 4px 12px rgba(0,0,0,0.03)',
                  transform: (hoverMode === 'advanced' || demoCardIsHovered) ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💻</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#0f172a' }}>Web Development</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem 0' }}>Hover your cursor over this card to observe the lift &amp; shadow animation!</p>
                <span style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.84rem' }}>Explore Track →</span>
              </div>
            </div>

            <pre style={{ background: '#0f172a', color: '#34d399', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', marginTop: '1.25rem' }}>
{`.service-card {
  transition: all 0.3s ease;
}
.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.12);
}`}
            </pre>
          </div>

        </div>
      )}

      {/* ==================== SECTION 18 & 19: CARD CONTENT ACTIVITY ==================== */}
      {activeTab === 'responsive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Card Content Activity across Business Types */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Choose the Right Service (Multi-Business Reusability)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Select a business type below to see how the exact same <code>.service-card</code> component adapts:
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setActiveBusinessTab('training')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: activeBusinessTab === 'training' ? '#2563eb' : '#f1f5f9', color: activeBusinessTab === 'training' ? 'white' : '#475569' }}
              >
                🏫 IT Training Centre
              </button>
              <button
                onClick={() => setActiveBusinessTab('restaurant')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: activeBusinessTab === 'restaurant' ? '#ea580c' : '#f1f5f9', color: activeBusinessTab === 'restaurant' ? 'white' : '#475569' }}
              >
                🍽️ Restaurant
              </button>
              <button
                onClick={() => setActiveBusinessTab('gym')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: activeBusinessTab === 'gym' ? '#16a34a' : '#f1f5f9', color: activeBusinessTab === 'gym' ? 'white' : '#475569' }}
              >
                🏋️ Gym &amp; Fitness
              </button>
            </div>

            {/* Business Cards Grid Output */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {businessCardsData[activeBusinessTab].map((card, i) => (
                <div 
                  key={i} 
                  className="service-card-hoverable"
                  onMouseEnter={() => setHoveredBusinessIndex(i)}
                  onMouseLeave={() => setHoveredBusinessIndex(null)}
                  style={{ 
                    background: '#ffffff', 
                    border: hoveredBusinessIndex === i ? '2px solid #2563eb' : '1px solid #e2e8f0', 
                    borderRadius: '14px', 
                    padding: '1.25rem', 
                    boxShadow: hoveredBusinessIndex === i ? '0 14px 28px rgba(37, 99, 235, 0.18)' : '0 4px 12px rgba(0,0,0,0.03)',
                    transform: hoveredBusinessIndex === i ? 'translateY(-8px)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{card.icon}</div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>{card.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 10px 0' }}>{card.desc}</p>
                  <span style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.78rem' }}>Learn More →</span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Device Tester */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Responsive Services Grid Device Tester
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Switch device views to test how the 3-column CSS Grid converts into a single-column stack on mobile screens:
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
                display: 'grid',
                gridTemplateColumns: responsiveDevice === 'mobile' ? '1fr' : responsiveDevice === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '1rem',
                background: '#ffffff',
                color: '#0f172a',
                padding: '1.25rem',
                borderRadius: '12px'
              }}>
                <div className="service-card-hoverable" style={{ border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.3rem' }}>💻</div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Web Dev</div>
                </div>
                <div className="service-card-hoverable" style={{ border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.3rem' }}>📊</div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Data &amp; Analytics</div>
                </div>
                <div className="service-card-hoverable" style={{ border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.3rem' }}>🤖</div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SECTION 24: BUILD-WITH-ME MODE (12 STAGES) ==================== */}
      {activeTab === 'guided_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Guided Mode</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>Build Your Services Section — 12 Stages</h2>
              </div>
              <div style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '6px 16px', borderRadius: '20px', fontWeight: 900, fontSize: '0.9rem' }}>
                Stage Progress: {guidedBuildStage}/12
              </div>
            </div>

            {/* Stages Tracker Bar */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(stage => (
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

            {/* Stage Task Description */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>
                Active Stage {guidedBuildStage}:
              </div>
              
              {guidedBuildStage === 1 && <h3>Stage 1: Create Services Section Tag (`&lt;section id="services" class="services-section"&gt;`)</h3>}
              {guidedBuildStage === 2 && <h3>Stage 2: Add Section Heading (`&lt;h2 class="section-title"&gt;Practical Learning Tracks&lt;/h2&gt;`)</h3>}
              {guidedBuildStage === 3 && <h3>Stage 3: Add Section Description (`&lt;p class="section-description"&gt;`)</h3>}
              {guidedBuildStage === 4 && <h3>Stage 4: Create First Service Card (`&lt;div class="service-card"&gt;`)</h3>}
              {guidedBuildStage === 5 && <h3>Stage 5: Add Card Icon (`&lt;div class="service-icon"&gt;💻&lt;/div&gt;`)</h3>}
              {guidedBuildStage === 6 && <h3>Stage 6: Add Service Title (`&lt;h3 class="service-name"&gt;Web Development&lt;/h3&gt;`)</h3>}
              {guidedBuildStage === 7 && <h3>Stage 7: Add Service Description (`&lt;p class="service-desc"&gt;`)</h3>}
              {guidedBuildStage === 8 && <h3>Stage 8: Add CTA Action Link (`&lt;a href="#courses" class="btn-service"&gt;Explore Track →&lt;/a&gt;`)</h3>}
              {guidedBuildStage === 9 && <h3>Stage 9: Create Multiple Service Cards (6 Cards)</h3>}
              {guidedBuildStage === 10 && <h3>Stage 10: Convert Cards to CSS Grid (.services-grid &#123; display: grid; grid-template-columns: repeat(3, 1fr); &#125;)</h3>}
              {guidedBuildStage === 11 && <h3>Stage 11: Add CSS Hover Effect (.service-card:hover &#123; transform: translateY(-6px); &#125;)</h3>}
              {guidedBuildStage === 12 && <h3>Stage 12: Make Grid Responsive with Media Queries (@media (max-width: 768px))</h3>}

              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                {guidedBuildStage > 1 && (
                  <button
                    onClick={() => setGuidedBuildStage(guidedBuildStage - 1)}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    ← Previous Stage
                  </button>
                )}
                {guidedBuildStage < 12 && (
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

      {/* ==================== SECTION 23: LIVE CODE PLAYGROUND ==================== */}
      {activeTab === 'playground' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Live Code Playground — Edit Services HTML &amp; CSS Grid
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Edit the HTML and CSS code below and see your Service Section update live in real-time:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', display: 'block', marginBottom: 4 }}>HTML:</label>
                <textarea
                  rows={10}
                  value={playgroundHtml}
                  onChange={e => setPlaygroundHtml(e.target.value)}
                  style={{ width: '100%', background: '#0f172a', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.82rem', padding: '1rem', borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', display: 'block', marginBottom: 4 }}>CSS:</label>
                <textarea
                  rows={10}
                  value={playgroundCss}
                  onChange={e => setPlaygroundCss(e.target.value)}
                  style={{ width: '100%', background: '#0f172a', color: '#34d399', fontFamily: 'monospace', fontSize: '0.82rem', padding: '1rem', borderRadius: '10px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
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

      {/* ==================== SECTION 25 & 26: PREDICT OUTPUT & DEBUGGING CHALLENGE ==================== */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Predict Output Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              🧠 Predict The Output Challenge
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1rem 0' }}>
              Read the CSS declaration below:
            </p>
            <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: '10px', fontSize: '0.88rem', margin: '0 0 1rem 0' }}>
{`.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}`}
            </pre>

            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '8px' }}>What will happen to the service cards inside `.services-grid`?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
              {[
                'A. The cards disappear.',
                'B. The cards arrange into 3 equal-width columns with 2rem space between them.',
                'C. The cards turn into audio links.',
                'D. The font size doubles automatically.'
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
                {predictionAnswer === 1 ? '✅ Correct prediction! `display: grid; grid-template-columns: repeat(3, 1fr);` creates 3 equal columns with clean gap spacing.' : '❌ Incorrect prediction. Option B is correct.'}
              </div>
            )}
          </div>

          {/* Debugging Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              🐛 Debugging Challenge — Fix The Service Cards
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              The service cards below are appearing in one long single column instead of 3 columns. Identify the bug:
            </p>

            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', color: '#f87171', fontSize: '0.84rem', margin: '0 0 1rem 0' }}>
{`<style>
.services-grid {
  /* BUG: Missing display: grid; declaration! */
  grid-template-columns: repeat(3, 1fr);
}
</style>`}
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
                💡 <strong>Hint:</strong> `grid-template-columns` has no effect unless the container explicitly declares `display: grid;` first!
              </div>
            )}

            {showDebugAnswer && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '10px', marginTop: '1rem', fontSize: '0.85rem', color: '#065f46' }}>
                ✅ <strong>Solution:</strong> Add <code>display: grid;</code> inside `.services-grid` before `grid-template-columns: repeat(3, 1fr);`.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SECTION 27, 28, 29, 30: AI CHALLENGE & ASSIGNMENT ==================== */}
      {activeTab === 'assignment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* AI Services Generator */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              AI Challenge — Plan Your Services
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Enter your business type below to generate 4 service card drafts:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Business Type:</label>
                <input type="text" value={aiBusinessTypeInput} onChange={e => setAiBusinessTypeInput(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>Target Customers:</label>
                <input type="text" value={aiAudienceInput} onChange={e => setAiAudienceInput(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
            </div>

            <button
              onClick={() => {
                setAiGeneratedServices([
                  { icon: '💻', name: 'Web Development', desc: `Practical web coding for ${aiAudienceInput}.` },
                  { icon: '📊', name: 'Data Analysis', desc: `SQL and data reporting courses for ${aiBusinessTypeInput}.` },
                  { icon: '🤖', name: 'AI Engineering', desc: 'Modern AI tools, prompts, and application development.' },
                  { icon: '⚡', name: 'Digital Literacy', desc: 'Computer fundamentals and office software mastery.' }
                ]);
                setCompletedSteps(prev => ({ ...prev, aiChallenge: true }));
              }}
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.88rem', cursor: 'pointer', marginBottom: '1.5rem' }}
            >
              ✨ Generate AI Service Cards
            </button>

            {aiGeneratedServices && (
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '1.25rem', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#6b21a8', fontSize: '1rem', fontWeight: 900 }}>AI Suggested Service Cards:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  {aiGeneratedServices.map((s, idx) => (
                    <div key={idx} className="service-card-hoverable" style={{ background: '#ffffff', border: '1px solid #d8b4fe', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4c1d95' }}>{s.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#6b21a8', marginTop: 4 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SECTION 31, 32, 33, 34, 35: KNOWLEDGE CHECK & COMPLETION ==================== */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Quiz Section */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 5 Knowledge Check (10 Questions)
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
                  Quiz Score: {calculateQuizScore()} / 10 Correct!
                </h3>
              </div>
            )}
          </div>

          {/* DAY 5 FINAL CONTINUOUS WEBSITE OUTPUT */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 5 Continuous Website Output (Navbar + Hero + About + Services)
            </h2>
            
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: 'white' }}>
              {/* Navbar */}
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1b4b', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '6px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#60a5fa' }}>Alpha Fly Theni</div>
                <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#cbd5e1' }}>Home</span>
                  <span style={{ color: '#cbd5e1' }}>About</span>
                  <span style={{ color: '#60a5fa', fontWeight: 800 }}>Services</span>
                </nav>
                <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>Login</button>
              </header>

              {/* Hero Banner */}
              <div style={{ background: '#1e1b4b', padding: '1rem', borderRadius: '8px', marginBottom: '6px', fontSize: '0.8rem', opacity: 0.75 }}>
                [DAY 3 HERO BANNER SECTION: Build Job-Ready Digital Skills...]
              </div>

              {/* Day 4 About Section */}
              <div style={{ background: '#1e1b4b', padding: '1rem', borderRadius: '8px', marginBottom: '6px', fontSize: '0.8rem', opacity: 0.75 }}>
                [DAY 4 ABOUT SECTION: Learning That Leads to Real Projects...]
              </div>

              {/* Day 5 Services Section */}
              <section id="services" style={{ background: '#ffffff', color: '#0f172a', borderRadius: '10px', padding: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb' }}>WHAT WE OFFER</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '4px 0 6px 0', color: '#0f172a' }}>Practical Learning Tracks</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', textAlign: 'left', marginTop: '1rem' }}>
                  <div className="service-card-hoverable" style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontSize: '1.4rem' }}>💻</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Web Development</div>
                    <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 800 }}>Explore →</span>
                  </div>
                  <div className="service-card-hoverable" style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontSize: '1.4rem' }}>📊</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Data &amp; Analytics</div>
                    <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 800 }}>Explore →</span>
                  </div>
                  <div className="service-card-hoverable" style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontSize: '1.4rem' }}>🤖</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>AI Solutions</div>
                    <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 800 }}>Explore →</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* DAY 5 COMPLETION SCREEN */}
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
              🎉 Services Section Completed!
            </h2>

            {/* Learned skills checklist */}
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Today you learned:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                <div>✓ Service section purpose</div>
                <div>✓ Card components &amp; menu analogy</div>
                <div>✓ Reusable card markup</div>
                <div>✓ CSS Grid 2D layout</div>
                <div>✓ grid-template-columns: repeat()</div>
                <div>✓ gap property spacing</div>
                <div>✓ Flexbox vs Grid differences</div>
                <div>✓ Card borders &amp; border-radius</div>
                <div>✓ Box shadow styling</div>
                <div>✓ :hover pseudo-class</div>
                <div>✓ transition timing</div>
                <div>✓ transform: translateY()</div>
                <div>✓ Reusable .service-card classes</div>
                <div>✓ Responsive card grids</div>
                <div>✓ AI-assisted content planning</div>
                <div>✓ Debugging CSS Grid bugs</div>
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
                <div>Day 5: Services Section ✓</div>
              </div>
            </div>

            {/* DAY 6 PREVIEW CARD */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                🚀 Coming Up in Day 6:
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                Day 6 — Build a Portfolio / Projects Section
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                Project Cards → Images → Categories → Grid → Hover Overlay → Filtering Preview
              </p>
            </div>

            <button
              onClick={() => alert('Day 6 unlocked! Moving to Day 6 — Build a Portfolio / Projects Section.')}
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
              Continue to Day 6 →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
