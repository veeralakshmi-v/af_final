import React, { useState } from 'react';
import { 
  BookOpen, MonitorPlay, Code, LayoutGrid, Layers, PenTool, Briefcase, Sparkles, 
  CheckCircle, Sliders, Terminal, Smartphone, Tablet, Monitor, RefreshCw, Star, 
  HelpCircle, Eye, EyeOff, ShieldCheck, Award, MessageSquare, AlertCircle, Play, Check, Tag, DollarSign, Trophy
} from 'lucide-react';

export default function WebDesignDay8({ activeTab = 'intro', onNavigate, openAITutor }) {
  const handleTabChange = (tabId) => {
    if (onNavigate) {
      onNavigate(tabId);
    }
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

    if (lang === 'js') {
      const jsTokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)|(\b(?:const|let|var|function|return|if|else|for|while|switch|case|break)\b)|(\b(?:document|window|console|Math|Array|Object|String|Number|Boolean)\b)|(\b[a-zA-Z0-9_$]+\b(?=\s*\()|=>)|(\b[0-9]+\b)/gi;
      const highlighted = escaped.replace(jsTokenRegex, (match, comment, stringVal, kw, builtin, func, num) => {
        if (comment) return `<span style="color:#7f848e;font-style:italic;">${comment}</span>`;
        if (stringVal) return `<span style="color:#98c379;">${stringVal}</span>`;
        if (kw) return `<span style="color:#c678dd;font-weight:bold;">${kw}</span>`;
        if (builtin) return `<span style="color:#e06c75;font-weight:600;">${builtin}</span>`;
        if (func) return `<span style="color:#61afef;font-weight:bold;">${func}</span>`;
        if (num) return `<span style="color:#d19a66;">${num}</span>`;
        return match;
      });
      return (
        <pre
          style={{
            margin: 0,
            fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
            fontSize: '0.83rem',
            lineHeight: '1.6',
            color: '#abb2bf',
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
    guidedBuild: 0, // 0 to 18 stages
    challenges: 0,
    assignment: false,
    aiChallenge: false,
    quiz: false
  });

  // --- Section States ---
  const [targetDevice, setTargetDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [htmlBuildStep, setHtmlBuildStep] = useState(1); // 1 to 4
  const [guidedBuildStage, setGuidedBuildStage] = useState(1); // 1 to 18
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [explorerSelectedElement, setExplorerSelectedElement] = useState('name'); // name | price | desc | features | cta
  const [positioningMode, setPositioningMode] = useState('relative'); // 'static' | 'relative' | 'absolute'
  const [servicesVsPricingAnswer, setServicesVsPricingAnswer] = useState(null);

  // --- Playground Live Code ---
  const [playgroundHtml, setPlaygroundHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Pricing & Plans</title>
</head>
<body>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <span class="section-label">OUR PLANS</span>
      <h2 class="section-title">Flexible Packages for Your Business</h2>
      <p class="section-desc">Choose a package based on your project requirements. Fictional demo pricing.</p>
      
      <!-- Billing Toggle -->
      <div class="billing-toggle">
        <button class="toggle-btn active" data-cycle="monthly">Monthly Billing</button>
        <button class="toggle-btn" data-cycle="yearly">Yearly Billing (Save 15%)</button>
      </div>

      <!-- Pricing Cards Grid -->
      <div class="pricing-grid">
        
        <!-- Starter Plan -->
        <div class="pricing-card">
          <h3 class="plan-name">STARTER</h3>
          <div class="price-box">
            <span class="currency">₹</span>
            <span class="price-val" data-monthly="2,999" data-yearly="2,499">2,999</span>
            <span class="period">/ month</span>
          </div>
          <p class="plan-desc">For simple website requirements and small startups.</p>
          <ul class="feature-list">
            <li><span class="check">✓</span> 3 Custom Pages</li>
            <li><span class="check">✓</span> Responsive Mobile Layout</li>
            <li><span class="check">✓</span> Basic Contact Form</li>
            <li><span class="check">✓</span> Standard Support</li>
          </ul>
          <a href="#choose" class="btn-pricing">Choose Starter</a>
        </div>

        <!-- Professional Plan (Highlighted Recommended) -->
        <div class="pricing-card popular">
          <div class="badge">MOST POPULAR</div>
          <h3 class="plan-name">PROFESSIONAL</h3>
          <div class="price-box">
            <span class="currency">₹</span>
            <span class="price-val" data-monthly="6,999" data-yearly="5,999">6,999</span>
            <span class="period">/ month</span>
          </div>
          <p class="plan-desc">For growing businesses needing a complete web presence.</p>
          <ul class="feature-list">
            <li><span class="check">✓</span> 6 Custom Pages</li>
            <li><span class="check">✓</span> Responsive Mobile Layout</li>
            <li><span class="check">✓</span> Contact Form &amp; Lead Validation</li>
            <li><span class="check">✓</span> Basic SEO Setup</li>
            <li><span class="check">✓</span> Project Gallery</li>
            <li><span class="check">✓</span> Priority Support</li>
          </ul>
          <a href="#choose" class="btn-pricing btn-popular">Choose Professional</a>
        </div>

        <!-- Business Plan -->
        <div class="pricing-card">
          <h3 class="plan-name">BUSINESS</h3>
          <div class="price-box">
            <span class="currency">₹</span>
            <span class="price-val" data-monthly="12,999" data-yearly="10,999">12,999</span>
            <span class="period">/ month</span>
          </div>
          <p class="plan-desc">For businesses needing an advanced multi-feature platform.</p>
          <ul class="feature-list">
            <li><span class="check">✓</span> 10 Custom Pages</li>
            <li><span class="check">✓</span> Responsive Mobile Layout</li>
            <li><span class="check">✓</span> Advanced Interactive Forms</li>
            <li><span class="check">✓</span> Complete Portfolio Showcase</li>
            <li><span class="check">✓</span> Analytics Setup</li>
            <li><span class="check">✓</span> 24/7 Priority Support</li>
          </ul>
          <a href="#choose" class="btn-pricing">Choose Business</a>
        </div>

      </div>
    </div>
  </section>
</body>
</html>`);

  const [playgroundCss, setPlaygroundCss] = useState(`.pricing-section {
  padding: 4rem 2rem;
  background: #ffffff;
  color: #0f172a;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.section-label {
  font-size: 0.8rem;
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
  margin-bottom: 2rem;
}
.billing-toggle {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2.5rem;
}
.toggle-btn {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.toggle-btn.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: stretch;
}
.pricing-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.12);
}
.pricing-card.popular {
  border: 2px solid #2563eb;
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.15);
}
.badge {
  position: absolute;
  top: -14px;
  right: 20px;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 900;
  padding: 4px 12px;
  border-radius: 12px;
  letter-spacing: 0.5px;
}
.plan-name {
  font-size: 1.1rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}
.price-box {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 0.75rem;
}
.currency {
  font-size: 1.4rem;
  font-weight: 900;
  color: #2563eb;
}
.price-val {
  font-size: 2.5rem;
  font-weight: 900;
  color: #0f172a;
}
.period {
  font-size: 0.85rem;
  color: #64748b;
}
.plan-desc {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}
.feature-list li {
  font-size: 0.9rem;
  color: #334155;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 8px;
}
.check {
  color: #16a34a;
  font-weight: 900;
}
.btn-pricing {
  display: block;
  text-align: center;
  padding: 12px 20px;
  border-radius: 12px;
  background: #f1f5f9;
  color: #0f172a;
  font-weight: 800;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s ease;
}
.btn-popular {
  background: #2563eb;
  color: #ffffff;
}`);

  const [playgroundJs, setPlaygroundJs] = useState(`// Billing Toggle Interaction
const toggleBtns = document.querySelectorAll('.toggle-btn');
const priceVals = document.querySelectorAll('.price-val');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cycle = btn.getAttribute('data-cycle');
    priceVals.forEach(price => {
      const newPrice = price.getAttribute('data-' + cycle);
      if (newPrice) {
        price.textContent = newPrice;
      }
    });
  });
});`);

  // --- Predict the Output Answers ---
  const [predictAnswers, setPredictAnswers] = useState({});

  // --- Debugging Challenge State ---
  const [debugSolved, setDebugSolved] = useState(false);
  const [showDebugHint, setShowDebugHint] = useState(false);
  const [showDebugSolution, setShowDebugSolution] = useState(false);

  // --- Practice & AI Challenge States ---
  const [practiceChoice, setPracticeChoice] = useState('training');
  const [aiPricingInput, setAiPricingInput] = useState("We provide web development courses, 1-on-1 mentorship, and job placement assistance.");
  const [aiFormattedResult, setAiFormattedResult] = useState(null);
  const [aiBusinessCategory, setAiBusinessCategory] = useState('training');
  const [aiCodeSubmission, setAiCodeSubmission] = useState('');
  const [aiCodeReviewResult, setAiCodeReviewResult] = useState(null);

  // --- Quiz Knowledge Check State (15 Questions) ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary business objective of a Pricing / Plans section on a commercial website?",
      options: [
        "To hide product details from search engines",
        "To help prospective buyers compare available packages and choose an option suitable for their needs",
        "To replace the website Navbar and Footer",
        "To automatically charge the user's credit card upon page scroll"
      ],
      correct: 1,
      explanation: "A pricing section presents available options, features, and costs clearly so visitors can evaluate and select a suitable plan."
    },
    {
      id: 2,
      question: "How does a Pricing Section differ functionally from a Services Section?",
      options: [
        "Services explain WHAT capabilities are offered; Pricing presents WHICH packages or plans can be selected",
        "Services section uses text only; Pricing section uses video only",
        "Pricing sections cannot use CTA buttons",
        "Services sections are only visible on desktop computers"
      ],
      correct: 0,
      explanation: "Services describe capabilities ('What we do'), while Pricing structures those capabilities into selectable packages ('Which option to buy')."
    },
    {
      id: 3,
      question: "Why should price typography (e.g. ₹6,999) have a prominent font-size and weight hierarchy?",
      options: [
        "Because price is a primary decision factor that visitors scan for immediately",
        "Because CSS Flexbox breaks if font sizes are equal",
        "Because browsers penalize small price numbers",
        "Because price numbers cannot be read by mobile screens"
      ],
      correct: 0,
      explanation: "Visitors scan pricing cards to find the cost first; strong typographic hierarchy ensures the price stands out clearly."
    },
    {
      id: 4,
      question: "Why are package features formatted using semantic HTML lists (<ul> and <li>)?",
      options: [
        "Because pricing features represent a structured collection of included items",
        "Because lists prevent CSS grid from rendering",
        "Because HTML div tags cannot contain text",
        "Because screen readers ignore paragraph tags"
      ],
      correct: 0,
      explanation: "Semantic <ul> and <li> elements structure feature items into a readable, accessible collection."
    },
    {
      id: 5,
      question: "How does CSS Grid assist when laying out multiple pricing cards?",
      options: [
        "Grid stacks all cards on top of each other",
        "Grid creates clean multi-column layouts (3 columns desktop, 1 column mobile) with uniform gap spacing",
        "Grid disables CSS hover transitions",
        "Grid hides buttons on mobile devices"
      ],
      correct: 1,
      explanation: "CSS Grid defines responsive columns and gap spacing without requiring manual margin math or floating elements."
    },
    {
      id: 6,
      question: "Why do business websites visually highlight one 'Recommended' or 'Most Popular' plan?",
      options: [
        "To visually guide users toward the package that offers the best balance of value for most buyers",
        "To trick users into clicking broken links",
        "To make all other plans invisible",
        "To disable JavaScript events"
      ],
      correct: 0,
      explanation: "Highlighting a recommended plan reduces decision fatigue by guiding visitors toward the most popular option."
    },
    {
      id: 7,
      question: "What CSS property on the parent pricing card container allows a child badge to be positioned absolutely relative to it?",
      options: [
        "position: relative;",
        "position: static;",
        "display: inline;",
        "float: left;"
      ],
      correct: 0,
      explanation: "`position: relative` on the parent container establishes a positioning context for any child element with `position: absolute`."
    },
    {
      id: 8,
      question: "What CSS rule positions a 'MOST POPULAR' badge tag at the top right corner of a pricing card?",
      options: [
        ".badge { position: absolute; top: -14px; right: 20px; }",
        ".badge { float: right; margin-top: -100px; }",
        ".badge { display: flex; align-items: top; }",
        ".badge { position: static; left: 50%; }"
      ],
      correct: 0,
      explanation: "Combining `position: absolute` with `top: -14px; right: 20px;` anchors the badge relative to the parent card's top-right border."
    },
    {
      id: 9,
      question: "What CSS property combination produces a smooth upward lift when hovering over a pricing card?",
      options: [
        ":hover { transform: translateY(-6px); transition: all 0.3s ease; }",
        ":hover { margin-top: -50px; }",
        ":hover { z-index: -1; }",
        ":hover { display: block; }"
      ],
      correct: 0,
      explanation: "Combining `:hover` with `transform: translateY(-6px)` and `transition` creates a silky 60fps smooth upward movement."
    },
    {
      id: 10,
      question: "Why should Call-To-Action (CTA) button text be clear and descriptive (e.g. 'Choose Professional')?",
      options: [
        "It communicates exactly what package the user is selecting before taking action",
        "It hides the button from screen readers",
        "It prevents JavaScript click events from firing",
        "It reduces the size of the CSS file"
      ],
      correct: 0,
      explanation: "Clear CTA text sets user expectations so visitors know precisely which plan they are requesting or choosing."
    },
    {
      id: 11,
      question: "What does `document.querySelectorAll('.price-val')` return in JavaScript?",
      options: [
        "A single HTML element",
        "A NodeList array-like collection of all elements matching the class '.price-val'",
        "A string containing the price number",
        "A CSS style rule"
      ],
      correct: 1,
      explanation: "`querySelectorAll` returns a NodeList containing every DOM element matching the specified CSS selector."
    },
    {
      id: 12,
      question: "What JavaScript property is used to update the visible text content of a price element?",
      options: [
        "element.textContent = newPrice;",
        "element.style.color = newPrice;",
        "element.setAttribute('hidden', true);",
        "element.classList.add('price');"
      ],
      correct: 0,
      explanation: "Setting `element.textContent` modifies the text node inside an HTML element dynamically."
    },
    {
      id: 13,
      question: "Why are custom HTML data attributes (e.g. `data-monthly='2,999'`) useful in a billing toggle?",
      options: [
        "They store custom data values directly in HTML tags for easy reading by JavaScript",
        "They automatically connect the page to a bank account",
        "They change font sizes automatically",
        "They replace CSS style sheets"
      ],
      correct: 0,
      explanation: "Data attributes (`data-*`) store custom values in HTML elements that JavaScript can retrieve via `getAttribute`."
    },
    {
      id: 14,
      question: "How should a feature comparison table behave on mobile viewports?",
      options: [
        "It should be placed inside a container with `overflow-x: auto` to allow horizontal scrolling without breaking page width",
        "It should shrink text size to 1px",
        "It should stretch the entire website screen to 3000px wide",
        "It should be deleted completely on mobile devices"
      ],
      correct: 0,
      explanation: "Wrapping wide comparison tables inside `overflow-x: auto` containers allows clean mobile horizontal scrolling without page overflow."
    },
    {
      id: 15,
      question: "What is the mandatory rule regarding demonstration prices shown on educational course websites?",
      options: [
        "Demonstration prices and plans are fictional demo content and must be clearly identified as such",
        "Demo prices must be presented as real contractual offers",
        "Prices can be copied directly from competitor SaaS websites",
        "Discounts can be fabricated without notice"
      ],
      correct: 0,
      explanation: "Commercial clarity requires that all educational demonstration prices be explicitly labeled as fictional demo content."
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
            <Sparkles size={16} /> DAY 8 — WEB DESIGN &amp; FRONTEND DEVELOPMENT
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px' }}>
            Build a Professional Pricing / Plans Section
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, margin: 0 }}>
            Learn how to structure reusable pricing cards, design feature lists (<code style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>&lt;ul&gt;</code> &amp; <code style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>&lt;li&gt;</code>), highlight recommended plans with CSS positioning (<code style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>position: absolute</code>), build responsive grids, and trigger dynamic billing toggles with JavaScript.
          </p>
        </div>
      </div>

      {/* ==================== TAB 1: INTRO & BUSINESS CONTEXT ==================== */}
      {activeTab === 'intro' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Question Banner */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Real-World Business Question
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
              "If a customer wants to buy, what information do they need before clicking?"
            </h2>
            <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
              When visitors are interested in your service, they ask specific evaluation questions: <em>What is included? How much does it cost? Which option is suitable for me? What is the difference between plans?</em> A professional pricing section answers these questions immediately.
            </p>

            {/* Buyer Needs Breakdown Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
              {[
                { title: 'What is included?', desc: 'Feature lists showing exact deliverables' },
                { title: 'How much does it cost?', desc: 'Clear price typography & currency' },
                { title: 'Which option is suitable?', desc: 'Plan names & target audience descriptions' },
                { title: 'What is the difference?', desc: 'Comparison layout between packages' }
              ].map((item, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#2563eb', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Services vs Pricing Comparison Activity */}
            <div style={{ background: '#eff6ff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #bfdbfe' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 0.75rem 0' }}>
                Services vs Pricing Comparison — Real-World Breakdown
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>SERVICES SECTION</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>"What do we provide?"</div>
                  <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                    Lists overall skills &amp; capabilities (Web Design, SEO Optimization, Website Maintenance).
                  </div>
                </div>

                <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '2px solid #2563eb' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>PRICING SECTION</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>"Which package can I choose?"</div>
                  <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                    Structures capabilities into selectable plans with price tags (Starter ₹2,999, Professional ₹6,999, Business ₹12,999).
                  </div>
                </div>
              </div>

              {/* Real Life Analogy Box */}
              <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e3a8a', marginBottom: '0.75rem' }}>
                  🍕 Real-Life Analogy — A Restaurant Menu
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '0.84rem' }}>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0284c7' }}>Services:</strong> "We serve Pizza, Pasta, Salads, and Drinks." <em>(Tells what food is made)</em>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#2563eb' }}>Pricing:</strong> "Combo A = ₹299 (1 Pizza + Drink)" vs "Family Feast = ₹999 (3 Pizzas + 2 Pastas)" <em>(Selectable deal)</em>
                  </div>
                </div>
              </div>

              {/* 2-Step Buyer Journey */}
              <div style={{ fontSize: '0.86rem', color: '#1e40af', background: '#dbeafe', padding: '10px 14px', borderRadius: '10px', fontWeight: 600 }}>
                💡 <strong>Why Visitors Need Both:</strong>
                <ol style={{ margin: '6px 0 0 0', paddingLeft: '1.25rem', fontWeight: 500 }}>
                  <li>First, visitors check <strong>Services</strong> to confirm you have the skills they need (*"Do you build websites?"*).</li>
                  <li>Next, visitors check <strong>Pricing</strong> to select a package that fits their budget (*"Can I afford the ₹6,999 Professional Plan?"*).</li>
                </ol>
              </div>

            </div>
          </div>

          {/* Authenticity Warning Banner */}
          <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1.25rem', borderRadius: '0 12px 12px 0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <AlertCircle size={24} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.92rem', marginBottom: '4px' }}>
                MANDATORY BUSINESS RULE: Fictional Demo Pricing
              </div>
              <div style={{ fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.5 }}>
                All prices and plans used in this course demonstration are <strong>fictional demo content</strong> for educational practice. Never present demo pricing as real contractual offers. Real business websites must display accurate pricing and terms.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 2: TARGET RESULT & PRICING EXPLORER ==================== */}
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
                  Full Website Stack (Navbar → Hero → About → Services → Projects → Testimonials → Pricing)
                </h2>
              </div>
              <div style={{ background: '#fef3c7', border: '1px solid #fde047', padding: '6px 14px', borderRadius: '20px', color: '#92400e', fontSize: '0.78rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={14} /> Fictional Demo Pricing Content
              </div>
            </div>

            {/* Complete Website Stack Preview Window */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '2px solid #cbd5e1', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              
              {/* Mini Navbar */}
              <div style={{ background: '#1e1b4b', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#60a5fa', fontWeight: 900, fontSize: '0.95rem' }}>🚀 Alpha Fly Theni</div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <span>Home</span><span>About</span><span>Services</span><span>Projects</span><span>Testimonials</span><span style={{ color: '#38bdf8', fontWeight: 800 }}>Pricing</span>
                </div>
              </div>

              {/* Live Pricing Section Output */}
              <div style={{ padding: '2.5rem 1.5rem', background: '#f8fafc' }}>
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', letterSpacing: '1px', textTransform: 'uppercase' }}>OUR PLANS</span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 8px 0' }}>Choose a Package Based on Your Requirements</h2>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Fictional demo content to illustrate professional pricing card structure.</p>
                </div>

                {/* Billing Toggle */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2rem' }}>
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #cbd5e1', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', background: billingCycle === 'monthly' ? '#2563eb' : '#ffffff', color: billingCycle === 'monthly' ? 'white' : '#475569' }}
                  >
                    Monthly Billing
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #cbd5e1', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', background: billingCycle === 'yearly' ? '#2563eb' : '#ffffff', color: billingCycle === 'yearly' ? 'white' : '#475569' }}
                  >
                    Yearly Billing (Save 15%)
                  </button>
                </div>

                {/* 3 Pricing Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
                  
                  {/* Starter */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>STARTER</h3>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                        ₹{billingCycle === 'monthly' ? '2,999' : '2,499'} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>/ mo</span>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>For simple website requirements and small startups.</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '0.84rem', color: '#334155', lineHeight: 1.8 }}>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> 3 Custom Pages</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Responsive Mobile Layout</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Basic Contact Form</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Standard Support</li>
                      </ul>
                    </div>
                    <button style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem' }}>Choose Starter</button>
                  </div>

                  {/* Professional (Highlighted) */}
                  <div style={{ position: 'relative', background: '#ffffff', border: '2px solid #2563eb', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 12px 28px rgba(37,99,235,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ position: 'absolute', top: '-12px', right: '16px', background: '#2563eb', color: 'white', fontSize: '0.7rem', fontWeight: 900, padding: '3px 10px', borderRadius: '10px' }}>MOST POPULAR</div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>PROFESSIONAL</h3>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2563eb', marginBottom: '0.5rem' }}>
                        ₹{billingCycle === 'monthly' ? '6,999' : '5,999'} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>/ mo</span>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>For growing businesses needing a complete web presence.</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '0.84rem', color: '#334155', lineHeight: 1.8 }}>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> 6 Custom Pages</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Responsive Mobile Layout</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Contact Form &amp; Validation</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Basic SEO Setup</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Project Gallery</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Priority Support</li>
                      </ul>
                    </div>
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem' }}>Choose Professional</button>
                  </div>

                  {/* Business */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>BUSINESS</h3>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                        ₹{billingCycle === 'monthly' ? '12,999' : '10,999'} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>/ mo</span>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>For businesses needing an advanced multi-feature platform.</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '0.84rem', color: '#334155', lineHeight: 1.8 }}>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> 10 Custom Pages</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Responsive Mobile Layout</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Advanced Interactive Forms</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Complete Portfolio Showcase</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> Analytics Setup</li>
                        <li><strong style={{ color: '#16a34a' }}>✓</strong> 24/7 Priority Support</li>
                      </ul>
                    </div>
                    <button style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem' }}>Choose Business</button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Interactive Pricing Card Explorer */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Interactive Pricing Card Explorer
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Click on any component below to highlight it on the card and explore its specific UX purpose:
            </p>

            {/* Element Selection Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[
                { id: 'name', label: '1. Plan Name' },
                { id: 'price', label: '2. Price Typography' },
                { id: 'desc', label: '3. Target Description' },
                { id: 'features', label: '4. Feature List (ul/li)' },
                { id: 'cta', label: '5. Call-To-Action Button' }
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
                <div style={{ background: '#ffffff', border: '2px solid #2563eb', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 20px rgba(37,99,235,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-12px', right: '16px', background: '#2563eb', color: 'white', fontSize: '0.7rem', fontWeight: 900, padding: '3px 10px', borderRadius: '10px' }}>POPULAR</div>
                  
                  {/* Name */}
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    color: '#0f172a',
                    margin: '0 0 0.5rem 0',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: explorerSelectedElement === 'name' ? '#eff6ff' : 'transparent',
                    outline: explorerSelectedElement === 'name' ? '2px solid #2563eb' : 'none'
                  }}>
                    PROFESSIONAL
                  </h3>

                  {/* Price */}
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#2563eb',
                    marginBottom: '0.5rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: explorerSelectedElement === 'price' ? '#fef3c7' : 'transparent',
                    outline: explorerSelectedElement === 'price' ? '2px solid #d97706' : 'none'
                  }}>
                    ₹6,999 <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>/ month</span>
                  </div>

                  {/* Desc */}
                  <p style={{
                    fontSize: '0.84rem',
                    color: '#64748b',
                    margin: '0 0 1rem 0',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: explorerSelectedElement === 'desc' ? '#f3e8ff' : 'transparent',
                    outline: explorerSelectedElement === 'desc' ? '2px solid #9333ea' : 'none'
                  }}>
                    For growing businesses needing a complete web presence.
                  </p>

                  {/* Features */}
                  <ul style={{
                    listStyle: 'none',
                    padding: '4px 8px',
                    margin: '0 0 1.25rem 0',
                    fontSize: '0.84rem',
                    color: '#334155',
                    lineHeight: 1.7,
                    borderRadius: '6px',
                    background: explorerSelectedElement === 'features' ? '#dcfce7' : 'transparent',
                    outline: explorerSelectedElement === 'features' ? '2px solid #16a34a' : 'none'
                  }}>
                    <li>✓ 6 Custom Pages</li>
                    <li>✓ Responsive Design</li>
                    <li>✓ Contact Form</li>
                  </ul>

                  {/* CTA */}
                  <button style={{
                    width: '100%',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    outline: explorerSelectedElement === 'cta' ? '3px solid #ea580c' : 'none'
                  }}>
                    Choose Professional
                  </button>

                </div>
              </div>

              {/* Explanatory Details Box */}
              <div style={{ background: '#eff6ff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  Component Breakdown
                </div>
                {explorerSelectedElement === 'name' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Plan Name (H3)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Identifies the package cleanly (STARTER, PROFESSIONAL, BUSINESS) so visitors understand the scope tier.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'price' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Price Typography &amp; Interval</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Makes the cost immediately scannable using large bold font numbers, currency symbol (<code style={{ background: '#dbeafe', padding: '2px 4px' }}>₹</code>), and clear billing interval (<code style={{ background: '#dbeafe', padding: '2px 4px' }}>/ month</code>).
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'desc' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Target Description (P)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Explains who the package is designed for (e.g. "For growing businesses") so visitors quickly self-identify.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'features' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Feature List (<code style={{ fontSize: '0.9rem' }}>&lt;ul&gt;</code> &amp; <code style={{ fontSize: '0.9rem' }}>&lt;li&gt;</code>)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Semantic collection of included items with visual checkmarks (<code style={{ background: '#dbeafe', padding: '2px 4px' }}>✓</code>) detailing exact deliverables.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'cta' && (
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 8px 0' }}>Call-To-Action (CTA Button)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1e40af', lineHeight: 1.6, margin: 0 }}>
                      Encourages the next action with clear wording (e.g. "Choose Professional") indicating which plan is selected.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 3: STEP-BY-STEP HTML STRUCTURE ==================== */}
      {activeTab === 'html_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Step-by-Step HTML Pricing Builder
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Click through the 4 progressive build steps below to construct a semantic pricing section:
            </p>

            {/* Step Selection Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[
                { step: 1, label: '1. <section id="pricing">' },
                { step: 2, label: '2. Section Label & Heading' },
                { step: 3, label: '3. One Pricing Card with ul/li' },
                { step: 4, label: '4. Complete 3-Card Grid' }
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
                  HTML Code (Step {htmlBuildStep} of 4):
                </label>
                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', minHeight: '220px', overflowX: 'auto' }}>
                  {htmlBuildStep === 1 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Pricing</title>
</head>
<body>
  <section id="pricing" class="pricing-section">
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 2 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Pricing</title>
</head>
<body>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <span class="section-label">OUR PLANS</span>
      <h2 class="section-title">Flexible Packages</h2>
      <p class="section-desc">Choose a package based on your project requirements.</p>
    </div>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 3 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Pricing</title>
</head>
<body>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <div class="pricing-card">
        <h3 class="plan-name">STARTER</h3>
        <div class="price-box">₹2,999 / month</div>
        <p class="plan-desc">For simple website requirements.</p>
        <ul class="feature-list">
          <li>✓ 3 Custom Pages</li>
          <li>✓ Responsive Design</li>
        </ul>
        <a href="#choose" class="btn-pricing">Choose Starter</a>
      </div>
    </div>
  </section>
</body>
</html>`)}
                  {htmlBuildStep === 4 && renderSyntaxHighlightedHTML(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly Theni - Pricing</title>
</head>
<body>
  <section id="pricing" class="pricing-section">
    <div class="pricing-grid">
      <div class="pricing-card">STARTER (₹2,999)</div>
      <div class="pricing-card popular">PROFESSIONAL (₹6,999)</div>
      <div class="pricing-card">BUSINESS (₹12,999)</div>
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
                  {htmlBuildStep >= 2 && <div style={{ fontSize: '0.8rem' }}>OUR PLANS</div>}
                  {htmlBuildStep >= 2 && <h2 style={{ fontSize: '1.4rem', margin: '4px 0' }}>Flexible Packages</h2>}
                  {htmlBuildStep >= 2 && <p style={{ margin: '4px 0' }}>Choose a package based on your project requirements.</p>}
                  {htmlBuildStep >= 3 && (
                    <div style={{ border: '1px solid #ccc', padding: '8px', margin: '8px 0' }}>
                      <h3 style={{ margin: 0 }}>STARTER</h3>
                      <div>₹2,999 / month</div>
                      <ul>
                        <li>✓ 3 Custom Pages</li>
                        <li>✓ Responsive Design</li>
                      </ul>
                      <button>[Choose Starter]</button>
                    </div>
                  )}
                  {htmlBuildStep >= 4 && (
                    <div style={{ margin: '6px 0', fontSize: '0.85rem' }}>
                      [Card 1: Starter] [Card 2: Professional] [Card 3: Business]
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 4: CSS POSITIONING & BADGES ==================== */}
      {activeTab === 'css_positioning' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Positioning Mini Lesson */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              CSS Positioning Mini-Lesson (<code style={{ color: '#2563eb' }}>position: relative</code> &amp; <code style={{ color: '#2563eb' }}>position: absolute</code>)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              How do we position a "MOST POPULAR" badge exactly over the top corner of a pricing card?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginBottom: '4px' }}>1. position: static (Default)</div>
                <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                  Normal document layout flow. Top/right offsets do NOT work.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>2. position: relative (Parent Card)</div>
                <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                  Keeps normal flow, but <strong>establishes a boundary context</strong> for child absolute elements.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>3. position: absolute (Badge Tag)</div>
                <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                  Lifts element out of normal flow and anchors it using <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>top</code> / <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>right</code> coordinates relative to parent!
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Positioning Visualizer */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Interactive Positioning Visualizer
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Toggle card position property to see how badge placement changes in real-time:
                </span>
              </div>

              {/* Mode Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['static', 'relative', 'absolute'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setPositioningMode(mode)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      background: positioningMode === mode ? '#2563eb' : '#f1f5f9',
                      color: positioningMode === mode ? 'white' : '#475569',
                      textTransform: 'capitalize'
                    }}
                  >
                    Card: {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Box */}
            <div style={{
              background: '#f8fafc',
              padding: '2.5rem 1.5rem',
              borderRadius: '16px',
              border: '2px dashed #94a3b8',
              position: 'relative',
              minHeight: '240px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#64748b',
                position: 'absolute',
                top: '10px',
                left: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Dashed Border = Outer Container (position: relative)
              </div>

              <div style={{
                position: positioningMode,
                ...(positioningMode === 'absolute' ? { top: '50px', left: '50%', transform: 'translateX(-50%)' } : {}),
                background: '#ffffff',
                border: '2px solid #2563eb',
                borderRadius: '16px',
                padding: '1.5rem',
                width: '280px',
                boxShadow: '0 8px 20px rgba(37,99,235,0.12)',
                zIndex: 2
              }}>
                {/* Badge Tag */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '16px',
                  background: '#ea580c',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  padding: '4px 12px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(234,88,12,0.3)',
                  zIndex: 3
                }}>
                  ★ MOST POPULAR BADGE
                </div>

                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>PROFESSIONAL PLAN</h4>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb' }}>₹6,999 / mo</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
                  Parent Card: <code style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>position: {positioningMode}</code>
                </div>
              </div>
            </div>

            {/* Explanation Note for current mode */}
            <div style={{ marginTop: '0.75rem', padding: '10px 14px', borderRadius: '10px', fontSize: '0.84rem', fontWeight: 600, background: positioningMode === 'relative' ? '#dcfce7' : positioningMode === 'static' ? '#fee2e2' : '#fef3c7', color: positioningMode === 'relative' ? '#15803d' : positioningMode === 'static' ? '#b91c1c' : '#b45309' }}>
              {positioningMode === 'relative' && '✅ PERFECT: Because the parent card has position: relative, the badge anchors precisely to the top corner of the card!'}
              {positioningMode === 'static' && '❌ INCORRECT: Because static parent creates NO boundary, the badge escapes the card and flies up to the outer dashed box!'}
              {positioningMode === 'absolute' && '⚠️ ABSOLUTE: The card is lifted out of flow and positioned relative to the outer container.'}
            </div>

            {/* Code Snippet Output */}
            <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', marginTop: '1.25rem', border: '1px solid #1e293b' }}>
              {renderSyntaxHighlightedHTML(`.pricing-card {
  position: ${positioningMode}; /* Parent positioning context */
}
.badge {
  position: absolute; /* Placed relative to parent card boundaries */
  top: -12px;
  right: 16px;
}`, 'css')}
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 5: BILLING TOGGLE & JAVASCRIPT ==================== */}
      {activeTab === 'billing_toggle' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Interactive Monthly / Yearly Billing Toggle &amp; JavaScript
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Learn how JavaScript listens for click events and updates prices dynamically using HTML data attributes:
            </p>

            {/* Live Interactive Billing Switcher */}
            <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '1.5rem', textAlign: 'center' }}>
              
              <div style={{ display: 'inline-flex', gap: '6px', background: '#ffffff', padding: '4px', borderRadius: '20px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  style={{ padding: '8px 18px', borderRadius: '16px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: billingCycle === 'monthly' ? '#2563eb' : 'transparent', color: billingCycle === 'monthly' ? 'white' : '#475569' }}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  style={{ padding: '8px 18px', borderRadius: '16px', fontSize: '0.82rem', fontWeight: 800, border: 'none', cursor: 'pointer', background: billingCycle === 'yearly' ? '#2563eb' : 'transparent', color: billingCycle === 'yearly' ? 'white' : '#475569' }}
                >
                  Yearly Billing (Save 15%)
                </button>
              </div>

              {/* Price Displays */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b' }}>STARTER</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>
                    ₹{billingCycle === 'monthly' ? '2,999' : '2,499'} / mo
                  </div>
                </div>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '2px solid #2563eb' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb' }}>PROFESSIONAL</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>
                    ₹{billingCycle === 'monthly' ? '6,999' : '5,999'} / mo
                  </div>
                </div>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b' }}>BUSINESS</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>
                    ₹{billingCycle === 'monthly' ? '12,999' : '10,999'} / mo
                  </div>
                </div>
              </div>

            </div>

            {/* JS Steps Explanation */}
            <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
              {renderSyntaxHighlightedHTML(`// Step 1: Select toggle buttons & price values
const toggleBtns = document.querySelectorAll('.toggle-btn');
const priceVals = document.querySelectorAll('.price-val');

// Step 2: Add click event listener to buttons
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Step 3: Get selected cycle attribute ('monthly' or 'yearly')
    const cycle = btn.getAttribute('data-cycle');
    
    // Step 4: Update price text content dynamically
    priceVals.forEach(price => {
      price.textContent = price.getAttribute('data-' + cycle);
    });
  });
});`, 'js')}
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 6: FEATURE COMPARISON TABLE ==================== */}
      {activeTab === 'comparison' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Feature Comparison Matrix Table
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              A comparison table helps visitors quickly compare plan deliverables side-by-side:
            </p>

            <div style={{ overflowX: 'auto', background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#ffffff', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                    <th style={{ padding: '12px', color: '#0f172a' }}>Deliverable / Feature</th>
                    <th style={{ padding: '12px', color: '#2563eb', textAlign: 'center' }}>Starter (₹2,999)</th>
                    <th style={{ padding: '12px', color: '#2563eb', textAlign: 'center' }}>Professional (₹6,999)</th>
                    <th style={{ padding: '12px', color: '#2563eb', textAlign: 'center' }}>Business (₹12,999)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Number of Pages', starter: '3 Pages', pro: '6 Pages', business: '10 Pages' },
                    { feature: 'Responsive Mobile Layout', starter: '✓', pro: '✓', business: '✓' },
                    { feature: 'Contact Form & Validation', starter: '✓ (Basic)', pro: '✓ (Advanced)', business: '✓ (Custom)' },
                    { feature: 'Basic SEO Setup', starter: '—', pro: '✓', business: '✓' },
                    { feature: 'Project Gallery / Portfolio', starter: '—', pro: '✓', business: '✓' },
                    { feature: 'Analytics Setup', starter: '—', pro: '—', business: '✓' },
                    { feature: 'Support Level', starter: 'Standard', pro: 'Priority', business: '24/7 Dedicated' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a' }}>{row.feature}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: row.starter === '—' ? '#94a3b8' : '#166534', fontWeight: 700 }}>{row.starter}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: row.pro === '—' ? '#94a3b8' : '#166534', fontWeight: 700, background: 'rgba(37,99,235,0.04)' }}>{row.pro}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: row.business === '—' ? '#94a3b8' : '#166534', fontWeight: 700 }}>{row.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#64748b', background: '#eff6ff', padding: '10px 14px', borderRadius: '10px' }}>
              📱 <strong>Mobile Note:</strong> Wrapped in an <code style={{ background: '#dbeafe', padding: '2px 4px' }}>overflow-x: auto</code> container to allow smooth horizontal swipe scrolling without causing full-page layout overflow on small screens.
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 7: RESPONSIVE GRID & DEVICE TESTER ==================== */}
      {activeTab === 'responsive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Live Responsive Device Tester
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                  Test Pricing Grid Across Screen Widths
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
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>OUR PLANS</span>
                  <h3 style={{ fontSize: targetDevice === 'mobile' ? '1.3rem' : '1.6rem', fontWeight: 900, margin: '4px 0' }}>Flexible Packages</h3>
                </div>

                {/* Grid Container */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: targetDevice === 'desktop' ? 'repeat(3, 1fr)' : targetDevice === 'tablet' ? 'repeat(2, 1fr)' : '1fr',
                  gap: '1rem'
                }}>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 800 }}>STARTER</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>₹2,999/mo</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>3 Pages • Basic Form</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '2px solid #2563eb', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 800, color: '#2563eb' }}>PROFESSIONAL (POPULAR)</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>₹6,999/mo</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>6 Pages • SEO • Gallery</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 800 }}>BUSINESS</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>₹12,999/mo</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>10 Pages • Analytics</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 8: GUIDED BUILD (18 STAGES) ==================== */}
      {activeTab === 'guided_build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Interactive Guided Build
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
                  Build Your Pricing Section (18 Stages)
                </h2>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: '20px', color: '#1e40af', fontSize: '0.85rem', fontWeight: 800 }}>
                Progress: Stage {guidedBuildStage} / 18
              </div>
            </div>

            {/* Stages Selector Buttons */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '1.25rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {Array.from({ length: 18 }, (_, i) => i + 1).map(st => (
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
                  title: 'Create pricing section tag (<section id="pricing">)',
                  code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alpha Fly - Pricing</title>
</head>
<body>
  <section id="pricing" class="pricing-section">
  </section>
</body>
</html>`,
                  lang: 'html',
                  explanation: 'Define outer semantic <section> container with id="pricing" connected to Navbar link.',
                  render: <div style={{ padding: '1rem', background: '#ffffff', border: '2px dashed #94a3b8', borderRadius: '8px', color: '#64748b', fontSize: '0.84rem' }}>[Empty Pricing Section Container]</div>
                },
                {
                  title: 'Add section heading (<h2>)',
                  code: `<section id="pricing" class="pricing-section">
  <div class="container">
    <h2>Flexible Packages</h2>
  </div>
</section>`,
                  lang: 'html',
                  explanation: 'Add h2 heading element establishing section topic.',
                  render: <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Flexible Packages</h2>
                },
                {
                  title: 'Add section description paragraph (<p>)',
                  code: `<p class="section-desc">Choose a package based on your project requirements.</p>`,
                  lang: 'html',
                  explanation: 'Add paragraph element providing contextual description.',
                  render: <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>Choose a package based on your project requirements.</p>
                },
                {
                  title: 'Create first pricing card container (<div class="pricing-card">)',
                  code: `<div class="pricing-grid">
  <div class="pricing-card">
    <!-- Plan content goes here -->
  </div>
</div>`,
                  lang: 'html',
                  explanation: 'Create an encapsulated div container for an individual plan card.',
                  render: (
                    <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '2px dashed #3b82f6', maxWidth: '240px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold' }}>[Pricing Card Container]</div>
                    </div>
                  )
                },
                {
                  title: 'Add plan name (<h3 class="plan-name">)',
                  code: `<h3 class="plan-name">STARTER</h3>`,
                  lang: 'html',
                  explanation: 'Add h3 heading element identifying package title.',
                  render: <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>STARTER</h3>
                },
                {
                  title: 'Add price display (<div class="price-box">)',
                  code: `<div class="price-box">
  <span class="currency">₹</span>
  <span class="price-val">2,999</span>
  <span class="period">/ month</span>
</div>`,
                  lang: 'html',
                  explanation: 'Add price container with currency symbol and billing period span.',
                  render: <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb' }}>₹2,999 <span style={{ fontSize: '0.75rem', color: '#64748b' }}>/ month</span></div>
                },
                {
                  title: 'Add plan description paragraph (<p class="plan-desc">)',
                  code: `<p class="plan-desc">For simple website requirements.</p>`,
                  lang: 'html',
                  explanation: 'Add target audience description explaining who the plan is for.',
                  render: <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>For simple website requirements.</p>
                },
                {
                  title: 'Add feature list (<ul class="feature-list">)',
                  code: `<ul class="feature-list">
  <li>✓ 3 Custom Pages</li>
  <li>✓ Responsive Design</li>
</ul>`,
                  lang: 'html',
                  explanation: 'Add semantic unordered list structuring included features.',
                  render: (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.82rem', color: '#334155' }}>
                      <li>✓ 3 Custom Pages</li>
                      <li>✓ Responsive Design</li>
                    </ul>
                  )
                },
                {
                  title: 'Add CTA button (<a class="btn-pricing">)',
                  code: `<a href="#choose" class="btn-pricing">Choose Starter</a>`,
                  lang: 'html',
                  explanation: 'Add call-to-action button encouraging user plan selection.',
                  render: <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>Choose Starter</button>
                },
                {
                  title: 'Create additional pricing cards (3 cards)',
                  code: `<div class="pricing-grid">
  <div class="pricing-card">Starter</div>
  <div class="pricing-card popular">Professional</div>
  <div class="pricing-card">Business</div>
</div>`,
                  lang: 'html',
                  explanation: 'Repeat card structure for 3 distinct pricing tiers.',
                  render: (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ padding: '6px 10px', background: '#eff6ff', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>Starter</div>
                      <div style={{ padding: '6px 10px', background: '#2563eb', color: 'white', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>Professional</div>
                      <div style={{ padding: '6px 10px', background: '#eff6ff', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>Business</div>
                    </div>
                  )
                },
                {
                  title: 'Create CSS Grid container (display: grid)',
                  code: `.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}`,
                  lang: 'css',
                  explanation: 'Set display: grid with auto-fit minmax columns for responsive layout.',
                  render: (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', background: '#f1f5f9', padding: '6px', borderRadius: '8px' }}>
                      <div style={{ background: '#2563eb', color: 'white', padding: '6px', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem' }}>Col 1</div>
                      <div style={{ background: '#2563eb', color: 'white', padding: '6px', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem' }}>Col 2</div>
                      <div style={{ background: '#2563eb', color: 'white', padding: '6px', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem' }}>Col 3</div>
                    </div>
                  )
                },
                {
                  title: 'Highlight recommended plan (.pricing-card.popular)',
                  code: `.pricing-card.popular {
  border: 2px solid #2563eb;
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.15);
}`,
                  lang: 'css',
                  explanation: 'Apply border highlight and drop shadow to visually emphasize recommended plan.',
                  render: (
                    <div style={{ background: '#ffffff', border: '2px solid #2563eb', borderRadius: '12px', padding: '1rem', boxShadow: '0 8px 20px rgba(37,99,235,0.15)', maxWidth: '200px' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb' }}>Highlighted Card</div>
                    </div>
                  )
                },
                {
                  title: 'Add popular badge tag (<span class="badge">)',
                  code: `<div class="badge">MOST POPULAR</div>`,
                  lang: 'html',
                  explanation: 'Add badge tag element to convey recommendation.',
                  render: <span style={{ background: '#2563eb', color: 'white', padding: '3px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900 }}>MOST POPULAR</span>
                },
                {
                  title: 'Add CSS positioning (position: relative & position: absolute)',
                  code: `.pricing-card { position: relative; }
.badge { position: absolute; top: -14px; right: 20px; }`,
                  lang: 'css',
                  explanation: 'Position badge absolutely relative to top corner of parent card.',
                  render: (
                    <div style={{ position: 'relative', border: '2px solid #2563eb', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
                      <span style={{ position: 'absolute', top: '-10px', right: '10px', background: '#2563eb', color: 'white', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '6px' }}>BADGE</span>
                      <div style={{ fontSize: '0.75rem' }}>Positioned Relative Parent</div>
                    </div>
                  )
                },
                {
                  title: 'Add hover lift transition (:hover { transform: translateY(-6px); })',
                  code: `.pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.15);
}`,
                  lang: 'css',
                  explanation: 'Add transform translateY on hover with transition.',
                  render: (
                    <div style={{ background: '#ffffff', border: '2px solid #2563eb', borderRadius: '12px', padding: '1rem', transform: 'translateY(-6px)', maxWidth: '200px' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb' }}>Hovered Lift State</div>
                    </div>
                  )
                },
                {
                  title: 'Create feature comparison table (<table>)',
                  code: `<table>
  <tr><th>Feature</th><th>Starter</th><th>Pro</th></tr>
  <tr><td>Pages</td><td>3</td><td>6</td></tr>
</table>`,
                  lang: 'html',
                  explanation: 'Add comparison table structure comparing plan deliverables side-by-side.',
                  render: (
                    <div style={{ border: '1px solid #cbd5e1', padding: '6px', borderRadius: '6px', fontSize: '0.75rem' }}>
                      <strong>Table:</strong> Feature | Starter | Pro
                    </div>
                  )
                },
                {
                  title: 'Make pricing section responsive with media queries',
                  code: `@media (max-width: 768px) {
  .pricing-grid {
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
                  title: 'Add optional monthly/yearly billing toggle JavaScript',
                  code: `btn.addEventListener('click', () => {
  price.textContent = price.getAttribute('data-' + cycle);
});`,
                  lang: 'js',
                  explanation: 'Attach click event listener to update dynamic price values.',
                  render: (
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>
                      [Switch Billing Cycle]
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
                    {guidedBuildStage < 18 && (
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

      {/* ==================== TAB 9: LIVE CODE PLAYGROUND ==================== */}
      {activeTab === 'playground' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Day 8 Live Code Playground (HTML + CSS + Optional JS)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Edit the HTML, CSS, or JavaScript code below and see your Pricing &amp; Plans section update live in real-time!
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
                label="Optional JavaScript Code (Billing Toggle):"
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

      {/* ==================== TAB 10: OUTPUT & AI CHALLENGES ==================== */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Predict the Output Activity */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Predict the Output Activity
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Test your CSS positioning &amp; JS knowledge by predicting the visual result of these code snippets:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              
              {/* Question 1 */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>Question 1</div>
                <code style={{ fontSize: '0.85rem', display: 'block', background: '#e2e8f0', padding: '6px', borderRadius: '6px', marginBottom: '10px' }}>position: relative;</code>
                <div style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '8px' }}>What is this property useful for on a parent pricing card?</div>
                <button
                  onClick={() => setPredictAnswers(prev => ({ ...prev, q1: true }))}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Reveal Answer
                </button>
                {predictAnswers.q1 && (
                  <div style={{ marginTop: '8px', color: '#166534', fontWeight: 700, fontSize: '0.82rem', background: '#dcfce7', padding: '6px 10px', borderRadius: '6px' }}>
                    ✓ Establishes positioning context for child absolute badges!
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>Question 2</div>
                <code style={{ fontSize: '0.85rem', display: 'block', background: '#e2e8f0', padding: '6px', borderRadius: '6px', marginBottom: '10px' }}>element.textContent = newPrice;</code>
                <div style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '8px' }}>What does this JavaScript code do when a billing toggle is clicked?</div>
                <button
                  onClick={() => setPredictAnswers(prev => ({ ...prev, q2: true }))}
                  style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Reveal Answer
                </button>
                {predictAnswers.q2 && (
                  <div style={{ marginTop: '8px', color: '#166534', fontWeight: 700, fontSize: '0.82rem', background: '#dcfce7', padding: '6px 10px', borderRadius: '6px' }}>
                    ✓ Dynamically updates the visible price string inside the price box!
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Debugging Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Debugging Challenge — Fix the Broken Pricing Section
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              The pricing section below has 3 intentional bugs: (1) POPULAR badge appears outside the card at the bottom of the screen, (2) Pricing cards overflow horizontally, and (3) Billing toggle updates only 1 card.
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
                Hint: Ensure <code style={{ background: '#dbeafe', padding: '2px 4px' }}>position: relative</code> is set on <code style={{ background: '#dbeafe', padding: '2px 4px' }}>.pricing-card</code>, and use <code style={{ background: '#dbeafe', padding: '2px 4px' }}>querySelectorAll</code> instead of <code style={{ background: '#dbeafe', padding: '2px 4px' }}>querySelector</code> for price elements!
              </div>
            )}

            {showDebugSolution && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '10px', color: '#166534', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <strong>Solution:</strong>
                <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: '10px', border: '1px solid #1e293b', marginTop: '8px', overflowX: 'auto' }}>
                  {renderSyntaxHighlightedHTML(`.pricing-card { position: relative; } /* Fixes badge position */
const priceVals = document.querySelectorAll('.price-val'); /* Fixes toggle loop */`, 'css')}
                </div>
              </div>
            )}
          </div>

          {/* AI Content & Design Challenge */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <Sparkles size={20} color="#7c3aed" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                AI Challenge — Generate Pricing Structure
              </h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Select your business category and let AI suggest structured plan names, prices, and feature deliverables:
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {['training', 'restaurant', 'gym', 'photography', 'freelancer'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setAiBusinessCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: aiBusinessCategory === cat ? '#7c3aed' : '#f1f5f9',
                    color: aiBusinessCategory === cat ? 'white' : '#475569',
                    textTransform: 'capitalize'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', padding: '1.25rem', borderRadius: '12px', fontSize: '0.86rem', color: '#581c87' }}>
              <div style={{ fontWeight: 800, marginBottom: '6px' }}>AI Suggested Pricing Structure for {aiBusinessCategory.toUpperCase()}:</div>
              <div>• <strong>Starter:</strong> Basic package for entry-level requirements (3 features)</div>
              <div>• <strong>Professional (Recommended):</strong> Core package for 80% of buyers (6 features)</div>
              <div>• <strong>Business:</strong> Advanced multi-feature package (10 features)</div>
              <div style={{ fontSize: '0.78rem', color: '#6b21a8', marginTop: '6px' }}>💡 Highlight Recommendation: Professional tier offers best value balance for target customer base.</div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 11: PRACTICE & ASSIGNMENT ==================== */}
      {activeTab === 'assignment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Practice Task */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Practice — Build 3 Pricing Cards
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Select a business category below and practice designing 3 pricing cards with 5+ features and 1 highlighted plan:
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {['training', 'restaurant', 'gym', 'photography', 'freelancer'].map(cat => (
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
                <li>Create 3 pricing cards (Starter, Professional, Business)</li>
                <li>Clear price typography with currency symbol and billing interval</li>
                <li>Feature list using semantic <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>&lt;ul&gt;</code> and <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>&lt;li&gt;</code></li>
                <li>Highlight 1 plan with a POPULAR badge using <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>position: absolute</code></li>
                <li>Use CSS Grid for multi-column layout and hover lift effects</li>
                <li>Clearly label all prices as Fictional Demo Content</li>
              </ul>
            </div>
          </div>

          {/* Day 8 Assignment */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <Briefcase size={20} color="#ea580c" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                Day 8 Assignment — Build a Complete Pricing Section
              </h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
              Build a complete Pricing / Plans section for your course website right below Testimonials:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>HTML Checklist</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>Semantic <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>&lt;section id="pricing"&gt;</code></li>
                  <li>Section heading &amp; description</li>
                  <li>3 Pricing cards</li>
                  <li>Feature lists (<code style={{ background: '#e2e8f0', padding: '2px 4px' }}>ul/li</code>)</li>
                  <li>Clear CTA buttons</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>CSS Checklist</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>CSS Grid layout (`repeat(auto-fit, minmax)`)</li>
                  <li>Price typography hierarchy</li>
                  <li>Badge positioning (`position: relative` &amp; `absolute`)</li>
                  <li>Card hover lift effect (`transform: translateY`)</li>
                  <li>Responsive media queries</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 12: KNOWLEDGE CHECK & PROGRESS (40%) ==================== */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 8 Knowledge Check &amp; Progress
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Answer the 15 questions below to complete Day 8 and advance your course progress to <strong>40%</strong>:
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

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                style={{
                  width: '100%',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem 2rem',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                  marginBottom: '2rem'
                }}
              >
                Submit Knowledge Check
              </button>
            ) : (
              <div style={{ background: '#dcfce7', border: '2px solid #22c55e', color: '#15803d', padding: '1rem', borderRadius: '14px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', marginBottom: '2rem' }}>
                ✓ Quiz Submitted! Score: {calculateQuizScore()} / 15 | Progress: 40% (Day 8 / 20)
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
                  🎉 Day 8 Completed
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#e0e7ff', margin: '0 0 1.5rem 0' }}>
                  Score: <strong>{calculateQuizScore()} / 15</strong> | Progress: <strong>40% (Day 8 / 20)</strong>
                </p>

                {/* Checklist achieved */}
                <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    YOU LEARNED:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                    <div>✓ Pricing section structure</div>
                    <div>✓ Pricing card components</div>
                    <div>✓ Plan name &amp; description typography</div>
                    <div>✓ Large price numbers &amp; currency</div>
                    <div>✓ Feature list checkmarks (ul/li)</div>
                    <div>✓ Call-to-action buttons</div>
                    <div>✓ CSS Grid 3-column pricing</div>
                    <div>✓ Highlighted popular plan styling</div>
                    <div>✓ Badge positioning (relative/absolute)</div>
                    <div>✓ Feature comparison matrix table</div>
                    <div>✓ Table mobile overflow-x: auto</div>
                    <div>✓ Fictional demo pricing rules</div>
                    <div>✓ Billing frequency toggle (Monthly/Yearly)</div>
                    <div>✓ AI pricing table generator</div>
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
                    <div>Day 8: Pricing &amp; Plans Section ✓</div>
                  </div>
                </div>

                {/* DAY 9 PREVIEW CARD */}
                <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                    🚀 COMING UP IN DAY 9:
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                    Day 9 — Build a Professional Contact &amp; Lead Generation Section
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                    Preview: Contact Form → Input Fields → Form Validation → Interactive Map → Lead Handler
                  </p>
                </div>
              </div>
          </div>

        </div>
      )}

    </div>
  );
}
