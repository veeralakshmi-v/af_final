import React, { useState, useEffect } from 'react';
import { 
  BookOpen, MonitorPlay, Code, LayoutGrid, Layers, PenTool, Briefcase, Sparkles, 
  CheckCircle, Sliders, Terminal, Smartphone, Tablet, Monitor, RefreshCw, Star, 
  HelpCircle, Eye, EyeOff, ShieldCheck, Award, MessageSquare, AlertCircle, Play, Check, Trophy
} from 'lucide-react';

export default function WebDesignDay7({ activeTab: propActiveTab = 'intro', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'intro');

  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day7', tabId);
    }
  };

  const isTabActive = (tabName) => {
    return !activeTab || activeTab === 'intro' ? (tabName === 'intro' || activeTab === tabName) : activeTab === tabName;
  };

  // --- Interactive Code Editor Component with Synced Scroll & Syntax Highlighting ---
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

      if (lang === 'js') {
        const jsTokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(\b(?:const|let|var|function|return|if|else|for|while|switch|case|break)\b)|(\b(?:document|window|console|Math|Array|Object|String|Number|Boolean)\b)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)/gi;
        return escaped.replace(jsTokenRegex, (match, comment, kw, builtin, stringVal) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (kw) return `<span style="color:#fb923c;font-weight:bold;">${kw}</span>`;
          if (builtin) return `<span style="color:#38bdf8;font-weight:600;">${builtin}</span>`;
          if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
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
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: language === 'html' ? '#ea580c' : language === 'css' ? '#2563eb' : '#d97706', letterSpacing: '0.5px' }}>
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
    guidedBuild: 0, // 0 to 16 stages
    challenges: 0,
    assignment: false,
    aiChallenge: false,
    quiz: false
  });

  // --- Section States ---
  const [targetDevice, setTargetDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [htmlBuildStep, setHtmlBuildStep] = useState(1); // 1 to 6
  const [guidedBuildStage, setGuidedBuildStage] = useState(1); // 1 to 16
  const [explorerSelectedElement, setExplorerSelectedElement] = useState('avatar'); // avatar | rating | quote | name | role
  const [pseudoToggle, setPseudoToggle] = useState('with'); // 'without' | 'with'
  const [showMoreTestimonials, setShowMoreTestimonials] = useState(false);
  const [goodTestimonialAnswer, setGoodTestimonialAnswer] = useState(null);

  // --- Playground Live Code ---
  const [playgroundHtml, setPlaygroundHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Testimonials & Trust</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <span class="section-label">WHAT OUR LEARNERS SAY</span>
      <h2 class="section-title">Real Feedback From Our Students</h2>
      <p class="section-desc">Fictional demo content to illustrate professional testimonial card structure.</p>
      
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="rating">★★★★★</div>
          <p class="quote">"The step-by-step project exercises helped me understand how website sections connect together seamlessly!"</p>
          <div class="reviewer-info">
            <img src="avatar1.jpg" alt="Ananya R." class="avatar">
            <div>
              <h4 class="name">Ananya R.</h4>
              <span class="role">Web Development Learner</span>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="rating">★★★★★</div>
          <p class="quote">"Learning CSS Grid and Flexbox with live visual feedback made responsive layout design easy to master."</p>
          <div class="reviewer-info">
            <img src="avatar2.jpg" alt="Rahul K." class="avatar">
            <div>
              <h4 class="name">Rahul K.</h4>
              <span class="role">Data Skills Learner</span>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="rating">★★★★★</div>
          <p class="quote">"Building a complete 7-section website from navbar to trust indicators gave me confidence to take on real projects."</p>
          <div class="reviewer-info">
            <img src="avatar3.jpg" alt="Meena S." class="avatar">
            <div>
              <h4 class="name">Meena S.</h4>
              <span class="role">AI Fundamentals Learner</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Indicators & Statistics -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-num">1200+</div>
          <div class="stat-label">Learners Trained</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">35+</div>
          <div class="stat-label">Projects Built</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">4.8/5</div>
          <div class="stat-label">Demo Rating</div>
        </div>
      </div>

    </div>
  </section>
</body>
</html>`);

  const [playgroundCss, setPlaygroundCss] = useState(`.testimonials-section {
  padding: 4rem 2rem;
  background: #f8fafc;
  color: #0f172a;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.section-label {
  fontSize: 0.8rem;
  font-weight: 800;
  color: #2563eb;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.section-title {
  font-size: 2.2rem;
  font-weight: 900;
  margin: 0.5rem 0 0.75rem 0;
  color: #0f172a;
}
.section-desc {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2.5rem;
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}
.testimonial-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.12);
  border-color: #2563eb;
}
.rating {
  color: #fbbf24;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}
.quote {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
  font-style: italic;
  margin-bottom: 1.5rem;
}
.reviewer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2563eb;
}
.name {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}
.role {
  font-size: 0.8rem;
  color: #64748b;
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  text-align: center;
}
.stat-num {
  font-size: 2rem;
  font-weight: 900;
  color: #2563eb;
}
.stat-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 700;
}`);

  const [playgroundJs, setPlaygroundJs] = useState(`// Optional JS: Show More Testimonials Toggle
const showMoreBtn = document.querySelector('.show-more-btn');
const extraCards = document.querySelectorAll('.extra-card');

if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    extraCards.forEach(card => {
      card.classList.toggle('hidden');
    });
    showMoreBtn.textContent = showMoreBtn.textContent === 'Show More' ? 'Show Less' : 'Show More';
  });
}`);

  // --- Predict the Output Answers ---
  const [predictAnswers, setPredictAnswers] = useState({});

  // --- Debugging Challenge State ---
  const [debugSolved, setDebugSolved] = useState(false);
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugSolution, setShowDebugSolution] = useState(false);

  // --- Practice & AI Challenge States ---
  const [practiceChoice, setPracticeChoice] = useState('training');
  const [aiFeedbackInput, setAiFeedbackInput] = useState("The practical exercises helped me understand how website sections connect together.");
  const [aiFormattedResult, setAiFormattedResult] = useState(null);
  const [aiBusinessCategory, setAiBusinessCategory] = useState('training');
  const [aiCodeSubmission, setAiCodeSubmission] = useState('');
  const [aiCodeReviewResult, setAiCodeReviewResult] = useState(null);

  // --- Quiz Knowledge Check State (12 Questions) ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "Why do professional business websites include a Testimonials section?",
      options: [
        "To fill extra blank space on the homepage",
        "To provide Social Proof and build visitor trust through real experiences",
        "To replace the website Navbar and Hero section",
        "To increase the website page loading time"
      ],
      correct: 1,
      explanation: "Testimonials present evidence of positive past customer experiences, establishing social proof and trust."
    },
    {
      id: 2,
      question: "What does the psychological concept of 'Social Proof' mean in web design?",
      options: [
        "People look for evidence that others had a good experience before making a decision",
        "Proof that a website's server speed is 100% fast",
        "Proof that a domain name is registered with a password",
        "Social media buttons on the footer"
      ],
      correct: 0,
      explanation: "Social proof describes how prospective visitors look for reviews or metrics showing that others have trusted the business."
    },
    {
      id: 3,
      question: "Which type of testimonial gives the most useful information to prospective buyers?",
      options: [
        "A vague quote like 'Good service.'",
        "A detailed quote describing specific practical outcomes and exercises",
        "A quote with 20 exclamation marks and NO reviewer name",
        "An anonymous review with zero role or avatar information"
      ],
      correct: 1,
      explanation: "Specific testimonials describing actual experiences and tangible results carry far more credibility than vague praise."
    },
    {
      id: 4,
      question: "Why is a card layout structure recommended for displaying reviews?",
      options: [
        "Cards group each reviewer's avatar, rating, quote, and name into clean encapsulated blocks",
        "Cards automatically convert text into video animations",
        "Cards prevent browsers from displaying images",
        "Cards allow reviewers to edit their feedback directly on the website"
      ],
      correct: 0,
      explanation: "Card UI components encapsulate multi-part data (avatar, quote, rating, role) into distinct, consistent visual containers."
    },
    {
      id: 5,
      question: "How does CSS Grid help when laying out multiple testimonial cards?",
      options: [
        "Grid stacks all cards directly on top of each other",
        "Grid creates clean multi-column layouts (e.g. 3 columns desktop, 1 column mobile) with uniform gap spacing",
        "Grid disables CSS hover transitions",
        "Grid hides avatars on mobile devices"
      ],
      correct: 1,
      explanation: "CSS Grid allows developers to define columns (`repeat(auto-fit, minmax(300px, 1fr))`) and gaps with zero layout hackery."
    },
    {
      id: 6,
      question: "Which CSS rule transforms a square avatar image element into a perfect circle?",
      options: [
        "border-radius: 50%;",
        "border-style: circular;",
        "shape-outside: circle();",
        "transform: rotate(360deg);"
      ],
      correct: 0,
      explanation: "`border-radius: 50%` on equal-width and height square elements rounds all corners by 50%, producing a perfect circle."
    },
    {
      id: 7,
      question: "Why is `object-fit: cover` essential when styling reviewer avatar photos?",
      options: [
        "It changes the color of the profile picture to blue",
        "It prevents images with non-square aspect ratios from stretching or squishing inside fixed avatar dimensions",
        "It hides avatar pictures on slow mobile networks",
        "It creates a shadow underneath the image"
      ],
      correct: 1,
      explanation: "`object-fit: cover` ensures that images fill fixed width and height dimensions while preserving their correct aspect ratio without distortion."
    },
    {
      id: 8,
      question: "What CSS rule produces a smooth upward lifting movement when a user hovers over a testimonial card?",
      options: [
        ":hover { transform: translateY(-6px); transition: all 0.3s; }",
        ":hover { margin-top: -50px; }",
        ":hover { float: top; }",
        ":hover { display: flex; }"
      ],
      correct: 0,
      explanation: "Combining `:hover` with `transform: translateY(-6px)` and a `transition` creates a silky 60fps smooth upward card movement."
    },
    {
      id: 9,
      question: "What is a CSS pseudo-element like `::before` used for in testimonial card design?",
      options: [
        "Adding decorative quote mark graphics without inserting extra HTML elements",
        "Connecting the webpage to an external MySQL database",
        "Rendering JavaScript console log errors",
        "Creating new HTML input forms"
      ],
      correct: 0,
      explanation: "Pseudo-elements like `::before` inject decorative visual content (like giant background quote marks) purely via CSS."
    },
    {
      id: 10,
      question: "Why is providing accessible text (e.g. `aria-label='5 out of 5 stars'`) important alongside star symbols?",
      options: [
        "Because screen readers cannot reliably read decorative star Unicode characters to visually impaired users",
        "Because Google Search penalizes websites with star symbols",
        "Because stars do not render on desktop monitors",
        "Because CSS Flexbox requires text inside every div"
      ],
      correct: 0,
      explanation: "Accessible text provides semantic context for screen readers when visual elements like rating stars are decorative."
    },
    {
      id: 11,
      question: "What is the mandatory rule regarding testimonials shown on commercial websites?",
      options: [
        "Fictional reviews can be presented as real customer feedback if names are hidden",
        "Websites must only present genuine customer feedback and clearly label demo content",
        "Reviews can be copied directly from competitor websites",
        "Ratings can be manually boosted to 5.0/5 without customer input"
      ],
      correct: 1,
      explanation: "Authenticity is essential. Real business websites must use genuine customer feedback; demo/course content must be explicitly labeled."
    },
    {
      id: 12,
      question: "How should a trust statistics bar (`1200+ Learners`, `35+ Projects`) maintain visual system consistency?",
      options: [
        "By inventing completely new fonts, colors, and borders unlike the rest of the site",
        "By reusing the statistics styling and color palette established in previous sections like About",
        "By placing statistics inside a modal pop-up window",
        "By deleting all statistics on mobile devices"
      ],
      correct: 1,
      explanation: "Design consistency requires reusing established typography, padding, and color tokens so new sections harmonize with the entire site."
    }
  ];

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    setCompletedSteps(prev => ({ ...prev, quiz: true }));
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
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif", color: '#0f172a' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #2563eb 100%)', borderRadius: '24px', padding: '2.5rem 2rem', color: '#ffffff', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '1rem', backdropFilter: 'blur(4px)' }}>
            <Sparkles size={16} /> DAY 7 — WEB DESIGN &amp; FRONTEND DEVELOPMENT
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px' }}>
            Build a Professional Testimonials &amp; Trust Section
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, margin: 0 }}>
            Learn how to establish <strong>Social Proof</strong> by designing reusable review cards, circular avatars, star ratings, CSS Grid layouts, pseudo-elements (<code style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>::before</code>), and responsive trust indicator statistics.
          </p>
        </div>
      </div>



      {/* ==================== TAB 1: INTRO & SOCIAL PROOF ==================== */}
      {activeTab === 'intro' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Question Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Real-World Question
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
              "Would You Trust a Business You Know Nothing About?"
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
              Imagine visiting two websites offering the exact same service at the exact same price. One website features clear information but no customer feedback. The other website displays detailed learner reviews, profile pictures, and verified project statistics. Which website would feel more trustworthy?
            </p>

            {/* Interactive Poll / Questionnaire */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e40af', marginBottom: '0.75rem' }}>
                What factors make a website feel trustworthy to prospective visitors? (Select all that apply):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                {[
                  '✓ Genuine Customer Reviews & Quotes',
                  '✓ Specific Learner Roles & Categories',
                  '✓ Verified Project & Learner Statistics',
                  '✓ Transparent Business Information',
                  '✓ Visual Profile Avatars & Ratings',
                  '✓ Clean, Consistent Section Layouts'
                ].map((item, idx) => (
                  <div key={idx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={16} color="#16a34a" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Concept: Social Proof */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
              <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '12px' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>The Concept of Social Proof</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Why prospective customers look for evidence before taking action</span>
              </div>
            </div>
            <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
              <strong>Social Proof</strong> is a psychological phenomenon where people look for evidence that others have had a positive experience before deciding to enrol, purchase, or contact a business. Testimonial sections package this evidence into structured, scannable review cards.
            </p>

            {/* Authenticity Mandatory Rule Banner */}
            <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1.25rem', borderRadius: '0 12px 12px 0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <AlertCircle size={24} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.92rem', marginBottom: '4px' }}>
                  MANDATORY ETHICAL RULE: Testimonial Authenticity
                </div>
                <div style={{ fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.5 }}>
                  Real websites must use <strong>genuine customer feedback</strong> with proper permission. Never fabricate customer reviews or present fake customer claims. In this course, all demonstration reviews are explicitly labeled as <strong>"Fictional Demo Content"</strong> for educational practice.
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 2: TARGET RESULT & EXPLORER ==================== */}
      {activeTab === 'visual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Target Result Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Target Webpage Output
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                  Full Website Stack (Navbar → Hero → About → Services → Projects → Testimonials)
                </h2>
              </div>
              <div style={{ background: '#fef3c7', border: '1px solid #fde047', padding: '6px 14px', borderRadius: '20px', color: '#92400e', fontSize: '0.78rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={14} /> Fictional Demo Review Content
              </div>
            </div>

            {/* Complete Website Stack Preview Window */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '2px solid #cbd5e1', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              
              {/* Mini Navbar (Day 2) */}
              <div style={{ background: '#1e1b4b', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#60a5fa', fontWeight: 900, fontSize: '0.95rem' }}>🚀 Alpha Fly Theni</div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <span>Home</span><span>About</span><span>Services</span><span>Projects</span><span style={{ color: '#38bdf8', fontWeight: 800 }}>Testimonials</span>
                </div>
              </div>

              {/* Live Testimonials & Trust Section Output */}
              <div style={{ padding: '2.5rem 1.5rem', background: '#f8fafc' }}>
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px', textTransform: 'uppercase' }}>WHAT OUR LEARNERS SAY</span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 8px 0' }}>Real Experiences That Build Confidence</h2>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Discover how practical project training helps students build real-world web skills.</p>
                </div>

                {/* 3 Testimonial Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  
                  {/* Card 1 */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ color: '#fbbf24', fontSize: '1rem', marginBottom: '0.5rem' }}>★★★★★</div>
                      <p style={{ fontSize: '0.86rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                        "The step-by-step project exercises helped me understand how different website sections connect together seamlessly."
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>AR</div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Ananya R.</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Web Development Learner</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ color: '#fbbf24', fontSize: '1rem', marginBottom: '0.5rem' }}>★★★★★</div>
                      <p style={{ fontSize: '0.86rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                        "Learning CSS Grid and Flexbox with live visual feedback made responsive layout design fast to master."
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>RK</div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Rahul K.</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Data Skills Learner</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ color: '#fbbf24', fontSize: '1rem', marginBottom: '0.5rem' }}>★★★★★</div>
                      <p style={{ fontSize: '0.86rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                        "Building a complete multi-section website from navbar to trust indicators gave me confidence to build client sites."
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#7c3aed', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>MS</div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Meena S.</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>AI Fundamentals Learner</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Trust Statistics Bar (Reusing Day 4 System) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb' }}>1200+</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Learners Trained</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb' }}>35+</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Projects Built</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb' }}>4.8 / 5</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Demo Rating</div>
                  </div>
                </div>

                {/* Trust Badges Row */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                  <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, border: '1px solid #bfdbfe' }}>[ Project Based ]</span>
                  <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, border: '1px solid #bfdbfe' }}>[ Beginner Friendly ]</span>
                  <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, border: '1px solid #bfdbfe' }}>[ Support Available ]</span>
                </div>

              </div>
            </div>
          </div>

          {/* Interactive Testimonial Explorer */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Interactive Testimonial Card Explorer
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Click on any component below to highlight it on the card and explore its specific UX purpose:
            </p>

            {/* Element Selection Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[
                { id: 'avatar', label: '1. Avatar Image' },
                { id: 'rating', label: '2. Star Rating' },
                { id: 'quote', label: '3. Testimonial Quote' },
                { id: 'name', label: '4. Reviewer Name' },
                { id: 'role', label: '5. Role / Category' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setExplorerSelectedElement(item.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: explorerSelectedElement === item.id ? '#2563eb' : '#f1f5f9',
                    color: explorerSelectedElement === item.id ? '#ffffff' : '#475569',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Card Explorer Display */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              
              {/* Highlighted Card Preview */}
              <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <div style={{ background: '#ffffff', border: '2px solid #2563eb', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 20px rgba(37,99,235,0.1)' }}>
                  
                  {/* Rating */}
                  <div style={{
                    color: '#fbbf24',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: explorerSelectedElement === 'rating' ? '#fef3c7' : 'transparent',
                    outline: explorerSelectedElement === 'rating' ? '2px solid #d97706' : 'none'
                  }}>
                    ★★★★★ <span style={{ fontSize: '0.75rem', color: '#64748b' }}>(5 out of 5 stars)</span>
                  </div>

                  {/* Quote */}
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#334155',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: explorerSelectedElement === 'quote' ? '#eff6ff' : 'transparent',
                    outline: explorerSelectedElement === 'quote' ? '2px solid #2563eb' : 'none'
                  }}>
                    "The project exercises helped me understand how the different website sections connect together."
                  </p>

                  {/* Reviewer Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Avatar */}
                    <div style={{
                      padding: '2px',
                      borderRadius: '50%',
                      background: explorerSelectedElement === 'avatar' ? '#dcfce7' : 'transparent',
                      outline: explorerSelectedElement === 'avatar' ? '2px solid #16a34a' : 'none'
                    }}>
                      <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        AR
                      </div>
                    </div>

                    <div>
                      {/* Name */}
                      <h4 style={{
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        margin: 0,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: explorerSelectedElement === 'name' ? '#f3e8ff' : 'transparent',
                        outline: explorerSelectedElement === 'name' ? '2px solid #9333ea' : 'none'
                      }}>
                        Ananya R.
                      </h4>

                      {/* Role */}
                      <span style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: explorerSelectedElement === 'role' ? '#fef2f2' : 'transparent',
                        outline: explorerSelectedElement === 'role' ? '2px solid #dc2626' : 'none'
                      }}>
                        Web Development Learner
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Explanatory Details Box */}
              <div style={{ background: '#eff6ff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  Component Breakdown
                </div>
                {explorerSelectedElement === 'avatar' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Avatar Image (<code style={{ fontSize: '0.9rem' }}>border-radius: 50%</code>)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Profile pictures humanize the review, making it visually distinct. Using <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>border-radius: 50%</code> converts a square photo into a clean circle.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'rating' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Star Rating (Visual &amp; Accessible)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Star graphics (<code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>★★★★★</code>) provide instant visual evaluation. Always include accessible text for screen readers.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'quote' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Testimonial Quote (<code style={{ fontSize: '0.9rem' }}>font-style: italic</code>)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Contains the customer's authentic experience. Specific detailed feedback carries far more trust than vague praise like "Good course."
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'name' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Reviewer Name (<code style={{ fontSize: '0.9rem' }}>font-weight: 800</code>)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Identifies who wrote the feedback. Using real names (or standard full initials for privacy) establishes accountability.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'role' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Role / Category Badge</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Provides context about the reviewer's background (e.g. "Web Development Learner") so prospective visitors relate to their position.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Activity: What Makes a Good Testimonial? */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Activity — What Makes a Useful Testimonial?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Compare two fictional feedback examples below. Which example gives more useful information to prospective learners?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              
              {/* Option A */}
              <div 
                onClick={() => setGoodTestimonialAnswer('A')}
                style={{
                  background: goodTestimonialAnswer === 'A' ? '#fef2f2' : '#f8fafc',
                  border: goodTestimonialAnswer === 'A' ? '2px solid #ef4444' : '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#991b1b', marginBottom: '6px' }}>Example A: Vague Praise</div>
                <p style={{ fontSize: '0.92rem', color: '#334155', fontStyle: 'italic', margin: '0 0 1rem 0' }}>"Good course."</p>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Click to evaluate Example A</div>
              </div>

              {/* Option B */}
              <div 
                onClick={() => setGoodTestimonialAnswer('B')}
                style={{
                  background: goodTestimonialAnswer === 'B' ? '#f0fdf4' : '#f8fafc',
                  border: goodTestimonialAnswer === 'B' ? '2px solid #22c55e' : '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#166534', marginBottom: '6px' }}>Example B: Specific Practical Outcome</div>
                <p style={{ fontSize: '0.92rem', color: '#334155', fontStyle: 'italic', margin: '0 0 1rem 0' }}>
                  "The project exercises helped me understand how the different website sections connect together."
                </p>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Click to evaluate Example B</div>
              </div>

            </div>

            {/* Answer Explanation */}
            {goodTestimonialAnswer && (
              <div style={{ background: goodTestimonialAnswer === 'B' ? '#f0fdf4' : '#fef2f2', border: `1px solid ${goodTestimonialAnswer === 'B' ? '#bbf7d0' : '#fecaca'}`, padding: '1rem 1.25rem', borderRadius: '12px', color: goodTestimonialAnswer === 'B' ? '#166534' : '#991b1b', fontSize: '0.88rem', fontWeight: 600 }}>
                {goodTestimonialAnswer === 'B' ? (
                  <div>
                    <strong>✓ Correct! Example B gives specific, meaningful information.</strong>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 400 }}>
                      Specific testimonials explain <em>what</em> was learned and <em>how</em> it helped. Prospective visitors connect with concrete details rather than generic claims.
                    </p>
                  </div>
                ) : (
                  <div>
                    <strong>✕ Example A is too vague.</strong>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 400 }}>
                      Saying "Good course" doesn't explain what made it good or what results were achieved. Example B is far more persuasive!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ==================== TAB 3: STEP-BY-STEP HTML STRUCTURE ==================== */}
      {activeTab === 'html_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Step-by-Step HTML Testimonials Builder
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Click through the 6 progressive build steps below to see how standard semantic HTML tags construct a review section:
            </p>

            {/* Step Selection Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[
                { step: 1, label: '1. <section id="testimonials">' },
                { step: 2, label: '2. Section Label' },
                { step: 3, label: '3. Section Heading' },
                { step: 4, label: '4. Description Paragraph' },
                { step: 5, label: '5. First Testimonial Card' },
                { step: 6, label: '6. Multiple Grid Cards' }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setHtmlBuildStep(s.step)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
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
                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', minHeight: '220px', overflowX: 'auto' }}>
                  {htmlBuildStep === 1 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Testimonials</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 2 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Testimonials</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <span class="section-label">LEARNER EXPERIENCES</span>
    </div>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 3 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Testimonials</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <span class="section-label">LEARNER EXPERIENCES</span>
      <h2 class="section-title">What Our Learners Say</h2>
    </div>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 4 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Testimonials</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <span class="section-label">LEARNER EXPERIENCES</span>
      <h2 class="section-title">What Our Learners Say</h2>
      <p class="section-desc">Real experiences from students building web applications.</p>
    </div>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 5 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Testimonials</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <div class="testimonial-card">
        <div class="rating">★★★★★</div>
        <p class="quote">"The project exercises helped me connect sections together."</p>
        <div class="reviewer-info">
          <img src="avatar1.jpg" alt="Ananya R." class="avatar">
          <div>
            <h4 class="name">Ananya R.</h4>
            <span class="role">Web Development Learner</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 6 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Testimonials</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
    <div class="testimonials-grid">
      <div class="testimonial-card">Card 1: Ananya R.</div>
      <div class="testimonial-card">Card 2: Rahul K.</div>
      <div class="testimonial-card">Card 3: Meena S.</div>
    </div>
  </section>
</body>
</html>`)}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 4 }}>
                  Unstyled Live Browser Render:
                </label>
                <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '12px', padding: '1rem', minHeight: '220px', fontFamily: 'Times New Roman, serif' }}>
                  {htmlBuildStep >= 2 && <div style={{ fontSize: '0.8rem' }}>LEARNER EXPERIENCES</div>}
                  {htmlBuildStep >= 3 && <h2 style={{ fontSize: '1.4rem', margin: '4px 0' }}>What Our Learners Say</h2>}
                  {htmlBuildStep >= 4 && <p style={{ margin: '4px 0' }}>Real experiences from students building web applications.</p>}
                  {htmlBuildStep >= 5 && (
                    <div style={{ border: '1px solid #ccc', padding: '8px', margin: '8px 0' }}>
                      <div style={{ color: '#d97706' }}>★★★★★</div>
                      <p style={{ fontStyle: 'italic', margin: '4px 0' }}>"The project exercises helped me connect sections together."</p>
                      <div>[Avatar: Ananya R. - Web Development Learner]</div>
                    </div>
                  )}
                  {htmlBuildStep >= 6 && (
                    <div style={{ margin: '6px 0', fontSize: '0.85rem' }}>
                      [Card 1: Ananya R.]<br/>[Card 2: Rahul K.]<br/>[Card 3: Meena S.]
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 4: CARD STYLING & PSEUDO-ELEMENTS ==================== */}
      {activeTab === 'css_card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Card Design & Rating Styling */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Card Styling, Circular Avatars &amp; Accessible Ratings
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Learn key CSS property rules for testimonial UI cards:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginBottom: '8px' }}>1. Circular Avatar</div>
                <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b', overflowX: 'auto' }}>
                  {renderSyntaxHighlightedHTML(`.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}`, 'css')}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
                  <code style={{ background: '#e2e8f0', padding: '2px 4px', borderRadius: '4px' }}>border-radius: 50%</code> rounds square images into perfect circles.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d97706', marginBottom: '8px' }}>2. Star Rating &amp; Accessibility</div>
                <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b', overflowX: 'auto' }}>
                  {renderSyntaxHighlightedHTML(`<div class="rating" aria-label="5 out of 5 stars">
  ★★★★★
</div>`, 'html')}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
                  <code style={{ background: '#e2e8f0', padding: '2px 4px', borderRadius: '4px' }}>aria-label</code> ensures screen readers speak rating values clearly.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', marginBottom: '8px' }}>3. Card Hover Lift</div>
                <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b', overflowX: 'auto' }}>
                  {renderSyntaxHighlightedHTML(`.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.15);
}`, 'css')}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
                  Lifts the card upward on cursor hover for subtle tactile feedback.
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Pseudo-Element Demo (::before) */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Decorative Quotation Mark with <code style={{ fontSize: '1.1rem', color: '#2563eb' }}>::before</code>
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Pseudo-elements inject decorative visual content without adding visible extra HTML elements.
                </span>
              </div>

              {/* Toggle Switch */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setPseudoToggle('without')}
                  style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: pseudoToggle === 'without' ? '#64748b' : '#f1f5f9', color: pseudoToggle === 'without' ? 'white' : '#475569' }}
                >
                  Without ::before
                </button>
                <button
                  onClick={() => setPseudoToggle('with')}
                  style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: pseudoToggle === 'with' ? '#2563eb' : '#f1f5f9', color: pseudoToggle === 'with' ? 'white' : '#475569' }}
                >
                  With ::before
                </button>
              </div>
            </div>

            {/* Live Interactive Card with/without ::before */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '380px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                overflow: 'hidden'
              }}>
                {pseudoToggle === 'with' && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '15px',
                    fontSize: '6rem',
                    fontFamily: 'serif',
                    color: 'rgba(37, 99, 235, 0.12)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}>
                    “
                  </div>
                )}

                <div style={{ color: '#fbbf24', fontSize: '1.1rem', marginBottom: '0.5rem' }}>★★★★★</div>
                <p style={{ fontSize: '0.95rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                  "The project exercises helped me understand how different website sections connect together."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AR</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Ananya R.</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Web Development Learner</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS Code Snippet */}
            <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', marginTop: '1.25rem', border: '1px solid #1e293b' }}>
              {renderSyntaxHighlightedHTML(
                pseudoToggle === 'with'
                  ? `/* With ::before Pseudo-Element */\n.testimonial-card {\n  position: relative;\n}\n.testimonial-card::before {\n  content: "“";\n  position: absolute;\n  top: -15px;\n  right: 15px;\n  font-size: 6rem;\n  color: rgba(37, 99, 235, 0.12);\n}`
                  : `/* Standard Card Without ::before */\n.testimonial-card {\n  position: relative;\n  /* No pseudo-element added */\n}`,
                'css'
              )}
            </div>
          </div>

          {/* Activity: Handling Uneven Card Heights */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Practical Layout Problem — Uneven Testimonial Lengths
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              When one reviewer writes 3 lines and another writes 8 lines, how do we keep cards visually aligned without truncating real content?
            </p>

            <div style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb', padding: '1rem 1.25rem', borderRadius: '0 10px 10px 0', fontSize: '0.88rem', color: '#1e3a8a' }}>
              <strong>Solution: Flexbox Column Stretch</strong>
              <p style={{ margin: '4px 0 0 0' }}>
                Use <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>display: flex; flex-direction: column; justify-content: space-between;</code> on cards so reviewer info naturally aligns at the bottom of every card!
              </p>
            </div>
          </div>

        </div>
      )}



      {/* ==================== TAB 6: RESPONSIVE GRID & DEVICE TESTER ==================== */}
      {activeTab === 'responsive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Live Responsive Device Tester
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                  Test Testimonials Grid Across Screen Widths
                </h2>
              </div>

              {/* Viewport Switcher */}
              <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
                <button
                  onClick={() => setTargetDevice('desktop')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: targetDevice === 'desktop' ? '#2563eb' : 'transparent', color: targetDevice === 'desktop' ? 'white' : '#475569' }}
                >
                  <Monitor size={14} /> Desktop (1200px)
                </button>
                <button
                  onClick={() => setTargetDevice('tablet')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: targetDevice === 'tablet' ? '#2563eb' : 'transparent', color: targetDevice === 'tablet' ? 'white' : '#475569' }}
                >
                  <Tablet size={14} /> Tablet (768px)
                </button>
                <button
                  onClick={() => setTargetDevice('mobile')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: targetDevice === 'mobile' ? '#2563eb' : 'transparent', color: targetDevice === 'mobile' ? 'white' : '#475569' }}
                >
                  <Smartphone size={14} /> Mobile (375px)
                </button>
              </div>
            </div>

            {/* Resizable Section Container */}
            <div style={{ background: '#e2e8f0', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
              <div style={{
                width: targetDevice === 'desktop' ? '100%' : targetDevice === 'tablet' ? '768px' : '375px',
                transition: 'width 0.4s ease',
                background: '#f8fafc',
                borderRadius: '14px',
                padding: targetDevice === 'mobile' ? '1rem' : '2rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>TESTIMONIALS</span>
                  <h3 style={{ fontSize: targetDevice === 'mobile' ? '1.3rem' : '1.6rem', fontWeight: 900, margin: '4px 0' }}>What Our Learners Say</h3>
                </div>

                {/* Grid Container */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: targetDevice === 'desktop' ? 'repeat(3, 1fr)' : targetDevice === 'tablet' ? 'repeat(2, 1fr)' : '1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                    <div style={{ color: '#fbbf24' }}>★★★★★</div>
                    <p style={{ fontStyle: 'italic', margin: '6px 0 10px 0' }}>"Understanding sections through project exercises."</p>
                    <div style={{ fontWeight: 800 }}>Ananya R.</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                    <div style={{ color: '#fbbf24' }}>★★★★★</div>
                    <p style={{ fontStyle: 'italic', margin: '6px 0 10px 0' }}>"CSS Grid &amp; Flexbox visual feedback."</p>
                    <div style={{ fontWeight: 800 }}>Rahul K.</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                    <div style={{ color: '#fbbf24' }}>★★★★★</div>
                    <p style={{ fontStyle: 'italic', margin: '6px 0 10px 0' }}>"Building multi-section websites."</p>
                    <div style={{ fontWeight: 800 }}>Meena S.</div>
                  </div>
                </div>

                {/* Responsive Statistics Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: targetDevice === 'mobile' ? '1fr' : 'repeat(3, 1fr)',
                  gap: '1rem',
                  background: '#ffffff',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb' }}>1200+</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Learners</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb' }}>35+</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Projects</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb' }}>4.8 / 5</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Rating</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 7: GUIDED BUILD (16 STAGES) ==================== */}
      {activeTab === 'guided_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Interactive Guided Build
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                  Build Your Testimonials Section (16 Stages)
                </h2>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: '20px', color: '#1e40af', fontSize: '0.85rem', fontWeight: 800 }}>
                Progress: Stage {guidedBuildStage} / 16
              </div>
            </div>

            {/* Stages Selector Buttons */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '1.25rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {Array.from({ length: 16 }, (_, i) => i + 1).map(st => (
                <button
                  key={st}
                  onClick={() => setGuidedBuildStage(st)}
                  style={{
                    background: guidedBuildStage === st ? '#2563eb' : guidedBuildStage > st ? '#dcfce7' : '#f1f5f9',
                    color: guidedBuildStage === st ? '#ffffff' : guidedBuildStage > st ? '#166534' : '#475569',
                    border: '1px solid #cbd5e1',
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Active Stage Box */}
            {(() => {
              const currentStage = [
                {
                  title: 'Create Testimonials section tag (<section id="testimonials">)',
                  code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly - Testimonials</title>
</head>
<body>
  <section id="testimonials" class="testimonials-section">
  </section>
</body>
</html>`,
                  lang: 'html',
                  explanation: 'Define the outer semantic <section> container with id="testimonials" for navbar navigation links.',
                  render: <div style={{ padding: '1rem', background: '#ffffff', border: '2px dashed #94a3b8', borderRadius: '8px', color: '#64748b', fontSize: '0.84rem' }}>[Empty Testimonials Section Container]</div>
                },
                {
                  title: 'Add section heading (<h2>)',
                  code: `<section id="testimonials" class="testimonials-section">
  <div class="container">
    <h2>What Our Learners Say</h2>
  </div>
</section>`,
                  lang: 'html',
                  explanation: 'Add an h2 heading element providing clear section title context.',
                  render: <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>What Our Learners Say</h2>
                },
                {
                  title: 'Add section description paragraph (<p>)',
                  code: `<section id="testimonials" class="testimonials-section">
  <div class="container">
    <h2>What Our Learners Say</h2>
    <p>Discover real experiences from students building web applications.</p>
  </div>
</section>`,
                  lang: 'html',
                  explanation: 'Add a supporting paragraph explaining what feedback is displayed.',
                  render: (
                    <div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>What Our Learners Say</h2>
                      <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>Discover real experiences from students building web applications.</p>
                    </div>
                  )
                },
                {
                  title: 'Create testimonial card wrapper (<div class="testimonial-card">)',
                  code: `<div class="testimonials-grid">
  <div class="testimonial-card">
    <!-- Review content goes here -->
  </div>
</div>`,
                  lang: 'html',
                  explanation: 'Create an encapsulated div container for an individual review card.',
                  render: (
                    <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '2px dashed #3b82f6', maxWidth: '280px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold' }}>[Testimonial Card Wrapper Created]</div>
                    </div>
                  )
                },
                {
                  title: 'Add reviewer avatar image (<img class="avatar">)',
                  code: `<div class="testimonial-card">
  <img src="avatar1.jpg" alt="Ananya R." class="avatar">
</div>`,
                  lang: 'html',
                  explanation: 'Add an img element with descriptive alt text for reviewer identification.',
                  render: (
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      AR
                    </div>
                  )
                },
                {
                  title: 'Add star rating display (<div class="rating">★★★★★</div>)',
                  code: `<div class="rating" aria-label="5 out of 5 stars">
  ★★★★★
</div>`,
                  lang: 'html',
                  explanation: 'Add rating stars with aria-label for accessibility support.',
                  render: <div style={{ color: '#fbbf24', fontSize: '1.1rem' }}>★★★★★</div>
                },
                {
                  title: 'Add testimonial quote paragraph (<p class="quote">)',
                  code: `<p class="quote">"The project exercises helped me understand how different sections connect together."</p>`,
                  lang: 'html',
                  explanation: 'Add paragraph element containing the reviewer\'s specific feedback quote.',
                  render: <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: '#334155', margin: 0 }}>"The project exercises helped me understand how different sections connect together."</p>
                },
                {
                  title: 'Add reviewer name (<h4 class="reviewer-name">)',
                  code: `<h4 class="name">Ananya R.</h4>`,
                  lang: 'html',
                  explanation: 'Add h4 heading element identifying the reviewer.',
                  render: <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Ananya R.</h4>
                },
                {
                  title: 'Add reviewer role (<span class="reviewer-role">)',
                  code: `<span class="role">Web Development Learner</span>`,
                  lang: 'html',
                  explanation: 'Add role span tag giving context to the reviewer\'s category.',
                  render: <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Web Development Learner</span>
                },
                {
                  title: 'Create multiple testimonial cards (3 cards)',
                  code: `<div class="testimonials-grid">
  <div class="testimonial-card">Card 1: Ananya R.</div>
  <div class="testimonial-card">Card 2: Rahul K.</div>
  <div class="testimonial-card">Card 3: Meena S.</div>
</div>`,
                  lang: 'html',
                  explanation: 'Repeat the card HTML structure for multiple student reviews.',
                  render: (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ padding: '6px 10px', background: '#eff6ff', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>Card 1</div>
                      <div style={{ padding: '6px 10px', background: '#eff6ff', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>Card 2</div>
                      <div style={{ padding: '6px 10px', background: '#eff6ff', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>Card 3</div>
                    </div>
                  )
                },
                {
                  title: 'Create CSS Grid container (display: grid)',
                  code: `.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}`,
                  lang: 'css',
                  explanation: 'Set display: grid with auto-fit minmax columns for responsive cards.',
                  render: (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
                      <div style={{ background: '#2563eb', color: 'white', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem' }}>Card 1</div>
                      <div style={{ background: '#2563eb', color: 'white', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem' }}>Card 2</div>
                      <div style={{ background: '#2563eb', color: 'white', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '0.75rem' }}>Card 3</div>
                    </div>
                  )
                },
                {
                  title: 'Style testimonial cards (background, border, radius, shadow)',
                  code: `.testimonial-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.03);
}`,
                  lang: 'css',
                  explanation: 'Apply background, border, border-radius, and padding for modern card aesthetics.',
                  render: (
                    <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', maxWidth: '240px' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Styled Card Container</div>
                    </div>
                  )
                },
                {
                  title: 'Add hover lift effect (:hover { transform: translateY(-6px); })',
                  code: `.testimonial-card {
  transition: all 0.3s ease;
}
.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.15);
  border-color: #2563eb;
}`,
                  lang: 'css',
                  explanation: 'Add transform translateY on hover with a smooth transition.',
                  render: (
                    <div style={{ background: '#ffffff', border: '2px solid #2563eb', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 16px 32px rgba(37, 99, 235, 0.15)', transform: 'translateY(-6px)', maxWidth: '240px' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb' }}>Hovered Lift State</div>
                    </div>
                  )
                },
                {
                  title: 'Add trust indicators & statistics bar',
                  code: `<div class="stats-row">
  <div class="stat">1200+ Learners</div>
  <div class="stat">35+ Projects</div>
  <div class="stat">4.8/5 Rating</div>
</div>`,
                  lang: 'html',
                  explanation: 'Add statistics bar reusing the Day 4 statistics system.',
                  render: (
                    <div style={{ display: 'flex', gap: '12px', background: '#ffffff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem', fontWeight: 800, color: '#2563eb' }}>
                      <span>1200+ Learners</span> | <span>35+ Projects</span> | <span>4.8/5 Rating</span>
                    </div>
                  )
                },
                {
                  title: 'Make testimonials grid responsive with media queries',
                  code: `@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}`,
                  lang: 'css',
                  explanation: 'Add responsive media query for single column view on mobile devices.',
                  render: (
                    <div style={{ maxWidth: '160px', padding: '6px', border: '2px solid #ea580c', borderRadius: '8px', background: '#fff', fontSize: '0.7rem' }}>
                      📱 Single Column Mobile Grid
                    </div>
                  )
                },
                {
                  title: 'Add optional Show More JavaScript interaction',
                  code: `showMoreBtn.addEventListener('click', () => {
  extraCards.forEach(card => card.classList.toggle('hidden'));
});`,
                  lang: 'js',
                  explanation: 'Attach click event listener to toggle hidden class on extra testimonial cards.',
                  render: (
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>
                      [Show More Testimonials]
                    </button>
                  )
                }
              ][guidedBuildStage - 1];

              return (
                <div style={{ background: '#f8fafc', border: '1px solid #3b82f6', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Stage Header */}
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e40af' }}>
                      Stage {guidedBuildStage}: {currentStage.title}
                    </div>
                    <div style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb', padding: '8px 12px', borderRadius: '0 8px 8px 0', marginTop: '8px', fontSize: '0.85rem', color: '#1e3a8a', fontWeight: 600 }}>
                      💡 Tip: {currentStage.explanation}
                    </div>
                  </div>

                  {/* Code & Live Render Split Display */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {/* Code Snippet Box */}
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: 4 }}>
                        Stage {guidedBuildStage} Code Snippet ({currentStage.lang.toUpperCase()}):
                      </div>
                      <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', maxHeight: '240px', overflowY: 'auto' }}>
                        {renderSyntaxHighlightedHTML(currentStage.code, currentStage.lang)}
                      </div>
                    </div>

                    {/* Live Output Preview Box */}
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', marginBottom: 4 }}>
                        Live Stage Browser Output Preview:
                      </div>
                      <div style={{ background: '#ffffff', border: '2px solid #22c55e', borderRadius: '12px', padding: '1.25rem', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {currentStage.render}
                      </div>
                    </div>
                  </div>

                  {/* Stage Controls */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                    {guidedBuildStage > 1 && (
                      <button
                        onClick={() => setGuidedBuildStage(guidedBuildStage - 1)}
                        style={{ background: '#ffffff', color: '#334155', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        ← Previous Stage
                      </button>
                    )}
                    {guidedBuildStage < 16 && (
                      <button
                        onClick={() => setGuidedBuildStage(guidedBuildStage + 1)}
                        style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        Next Stage →
                      </button>
                    )}
                  </div>

                </div>
              );
            })()}

          </div>

        </div>
      )}

      {/* ==================== TAB 8: LIVE CODE PLAYGROUND ==================== */}
      {activeTab === 'playground' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Day 7 Live Code Playground (HTML + CSS + Optional JS)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Edit the HTML, CSS, or JavaScript code below and see your Testimonials &amp; Trust section update live in real-time!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              <LiveSyntaxCodeEditor
                label="HTML Code:"
                language="html"
                rows={11}
                value={playgroundHtml}
                onChange={e => setPlaygroundHtml(e.target.value)}
              />

              <LiveSyntaxCodeEditor
                label="CSS Code:"
                language="css"
                rows={11}
                value={playgroundCss}
                onChange={e => setPlaygroundCss(e.target.value)}
              />
            </div>

            {/* Optional JS Editor */}
            <div style={{ marginTop: '1.25rem' }}>
              <LiveSyntaxCodeEditor
                label="Optional JavaScript Code (Show More Toggle):"
                language="js"
                rows={7}
                value={playgroundJs}
                onChange={e => setPlaygroundJs(e.target.value)}
              />
            </div>

            {/* Playground Live Output Render */}
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 6 }}>
                Live Browser Output Result:
              </label>
              <div style={{ background: '#ffffff', border: '2px solid #22c55e', borderRadius: '14px', padding: '1.5rem', minHeight: '300px' }}>
                <style>{playgroundCss}</style>
                <div dangerouslySetInnerHTML={{ __html: playgroundHtml }} />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 9: OUTPUT & AI CHALLENGES ==================== */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Predict the Output Activity */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Predict the Output Activity
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Test your CSS &amp; HTML knowledge by predicting the visual result of these code snippets:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              
              {/* Question 1 */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>Question 1</div>
                <code style={{ fontSize: '0.85rem', display: 'block', background: '#e2e8f0', padding: '6px', borderRadius: '6px', marginBottom: '10px' }}>border-radius: 50%;</code>
                <div style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '8px' }}>What will this rule do to a square image element?</div>
                <button
                  onClick={() => setPredictAnswers(prev => ({ ...prev, q1: true }))}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Reveal Answer
                </button>
                {predictAnswers.q1 && (
                  <div style={{ marginTop: '8px', color: '#166534', fontWeight: 700, fontSize: '0.82rem', background: '#dcfce7', padding: '6px 10px', borderRadius: '6px' }}>
                    ✓ Converts the square image into a perfect circle!
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>Question 2</div>
                <code style={{ fontSize: '0.85rem', display: 'block', background: '#e2e8f0', padding: '6px', borderRadius: '6px', marginBottom: '10px' }}>object-fit: cover;</code>
                <div style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '8px' }}>Why is this property paired with circular avatar dimensions?</div>
                <button
                  onClick={() => setPredictAnswers(prev => ({ ...prev, q2: true }))}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Reveal Answer
                </button>
                {predictAnswers.q2 && (
                  <div style={{ marginTop: '8px', color: '#166534', fontWeight: 700, fontSize: '0.82rem', background: '#dcfce7', padding: '6px 10px', borderRadius: '6px' }}>
                    ✓ Fits image within dimensions without stretching or distorting aspect ratio!
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Debugging Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Debugging Challenge — Fix the Broken Testimonials Section
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              The testimonials section below has 3 intentional bugs: (1) Avatar photo appears squished, (2) Cards overflow vertically, and (3) Star rating alignment is broken.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <button
                onClick={() => setShowDebugHint(!showDebugHint)}
                style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde047', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
              >
                {showDebugHint ? 'Hide Hint' : '💡 Show Hint'}
              </button>
              <button
                onClick={() => setShowDebugSolution(!showDebugSolution)}
                style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
              >
                {showDebugSolution ? 'Hide Solution' : '✓ Show Solution'}
              </button>
            </div>

            {showDebugHint && (
              <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '10px', color: '#1e40af', fontSize: '0.85rem', marginBottom: '1rem' }}>
                Hint: Check if <code style={{ background: '#dbeafe', padding: '2px 4px' }}>object-fit: cover</code> is missing on <code style={{ background: '#dbeafe', padding: '2px 4px' }}>.avatar</code>, and verify <code style={{ background: '#dbeafe', padding: '2px 4px' }}>display: flex; flex-direction: column; justify-content: space-between</code> on <code style={{ background: '#dbeafe', padding: '2px 4px' }}>.testimonial-card</code>.
              </div>
            )}

            {showDebugSolution && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '10px', color: '#166534', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <strong>Solution:</strong>
                <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b', marginTop: '8px', overflowX: 'auto' }}>
                  {renderSyntaxHighlightedHTML(`.avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
.testimonial-card { display: flex; flex-direction: column; justify-content: space-between; }`, 'css')}
                </div>
              </div>
            )}
          </div>

          {/* AI Content & Design Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <Sparkles size={20} color="#7c3aed" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                AI Challenge — Turn Raw Feedback Into Testimonial Content
              </h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Enter raw customer feedback below and see how AI organizes it into a structured, professional testimonial card layout:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '650px' }}>
              <textarea
                rows={3}
                value={aiFeedbackInput}
                onChange={e => setAiFeedbackInput(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
              />
              <button
                onClick={() => setAiFormattedResult({
                  quote: `"${aiFeedbackInput}"`,
                  name: 'Fictional Learner',
                  role: 'Web Development Student',
                  rating: '★★★★★ (5/5)',
                  placement: 'Position near section top or trust statistics bar'
                })}
                style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                ✨ AI Format Feedback
              </button>

              {aiFormattedResult && (
                <div style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', padding: '1.25rem', borderRadius: '12px', fontSize: '0.86rem', color: '#581c87' }}>
                  <div style={{ fontWeight: 800, marginBottom: '6px' }}>AI-Formatted Testimonial Card Output:</div>
                  <div><strong>Rating:</strong> {aiFormattedResult.rating}</div>
                  <div><strong>Quote:</strong> {aiFormattedResult.quote}</div>
                  <div><strong>Name &amp; Role:</strong> {aiFormattedResult.name} — {aiFormattedResult.role}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b21a8', marginTop: '6px' }}>💡 Placement Suggestion: {aiFormattedResult.placement}</div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 10: PRACTICE & ASSIGNMENT ==================== */}
      {activeTab === 'assignment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Practice Task */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Practice — Build a 4-Card Testimonials Section
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Select a business category below and practice designing 4 fictional testimonial cards with 3 trust indicators:
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {['training', 'restaurant', 'gym', 'salon', 'photography', 'freelancer'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setPracticeChoice(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: practiceChoice === cat ? '#2563eb' : '#f1f5f9',
                    color: practiceChoice === cat ? 'white' : '#475569',
                    textTransform: 'capitalize'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}>
              <strong>Practice Deliverable Requirements for {practiceChoice.toUpperCase()}:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.6 }}>
                <li>Create 4 fictional review cards with avatar images (`border-radius: 50%`)</li>
                <li>Add star rating display (`★★★★★`) with accessible `aria-label`</li>
                <li>Include 3 trust indicators (`1200+ Clients`, `99% Satisfaction`, `4.9/5 Rating`)</li>
                <li>Use CSS Grid for multi-column layout and Flexbox for inner card alignment</li>
                <li>Clearly label all reviews as Fictional Demo Content</li>
              </ul>
            </div>
          </div>

          {/* Day 7 Assignment */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <Briefcase size={20} color="#ea580c" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                Day 7 Assignment — Build a Trust Section
              </h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Build a complete Testimonials &amp; Trust section for your course website right below Projects:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>HTML Checklist</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>Semantic <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>&lt;section id="testimonials"&gt;</code></li>
                  <li>Section heading &amp; description</li>
                  <li>4–6 Testimonial cards</li>
                  <li>Avatars, ratings, quotes, reviewer names &amp; roles</li>
                  <li>Trust statistics bar</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>CSS Checklist</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>CSS Grid layout (`repeat(auto-fit, minmax)`)</li>
                  <li>Flexbox card interior alignment</li>
                  <li>Circular avatars (`border-radius: 50%`)</li>
                  <li>Card hover lift effect (`transform: translateY`)</li>
                  <li>Responsive media queries</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 11: KNOWLEDGE CHECK & PROGRESS (35%) ==================== */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 7 Knowledge Check &amp; Progress
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Answer the 12 questions below to complete Day 7 and advance your course progress to <strong>35%</strong>:
            </p>

            {/* Quiz Questions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                    Q{idx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      const isCorrect = q.correct === optIdx;
                      let btnBg = '#ffffff';
                      let btnBorder = '1px solid #cbd5e1';
                      let btnColor = '#334155';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnBg = '#dcfce7';
                          btnBorder = '2px solid #22c55e';
                          btnColor = '#166534';
                        } else if (isSelected) {
                          btnBg = '#fee2e2';
                          btnBorder = '2px solid #ef4444';
                          btnColor = '#991b1b';
                        }
                      } else if (isSelected) {
                        btnBg = '#eff6ff';
                        btnBorder = '2px solid #2563eb';
                        btnColor = '#1e40af';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                          style={{
                            textAlign: 'left',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            background: btnBg,
                            border: btnBorder,
                            color: btnColor,
                            fontSize: '0.86rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#475569', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px' }}>
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Submit Button */}
            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem 2rem',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                }}
              >
                Submit Knowledge Check
              </button>
            ) : (
              <div style={{ background: '#dcfce7', border: '2px solid #22c55e', color: '#15803d', padding: '1rem', borderRadius: '14px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', marginBottom: '2rem' }}>
                ✓ Quiz Submitted! Score: {calculateQuizScore()} / 12 | Progress: 35% (Day 7 / 20)
              </div>
            )}

            {/* STANDARDIZED GREEN TROPHY COMPLETION SCREEN — ALWAYS VISIBLE */}
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
                🎉 Day 7 Completed
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#e0e7ff', margin: '0 0 1.5rem 0' }}>
                Score: <strong>{calculateQuizScore()} / 12</strong> | Progress: <strong>35% (Day 7 / 20)</strong>
              </p>

              {/* Checklist achieved */}
              <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  YOU LEARNED:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <div>✓ Testimonial section design</div>
                  <div>✓ Testimonial card markup</div>
                  <div>✓ Blockquote &amp; cite tags</div>
                  <div>✓ Customer avatar styling</div>
                  <div>✓ Star ratings component</div>
                  <div>✓ Customer role subtitles</div>
                  <div>✓ CSS Grid 3-column cards</div>
                  <div>✓ Trust badges &amp; social proof</div>
                  <div>✓ Hover card lift animations</div>
                  <div>✓ Fictional demo disclaimer</div>
                  <div>✓ Responsive quote layout</div>
                  <div>✓ AI testimonial generator</div>
                </div>
              </div>

              {/* Progress Summary */}
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
                  <div>Day 6: Portfolio / Projects Section ✓</div>
                  <div>Day 7: Testimonials &amp; Trust Section ✓</div>
                </div>
              </div>

              {/* DAY 8 PREVIEW CARD */}
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                  🚀 COMING UP IN DAY 8:
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                  Day 8 — Build a Professional Pricing &amp; Plans Section
                </div>
                <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                  Preview: Pricing Cards → Billing Toggle → Feature Matrix → Recommended Badges
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
