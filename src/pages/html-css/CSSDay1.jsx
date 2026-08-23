import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveEditor from '../../components/LiveEditor';
import Quiz from '../../components/Quiz';
import Prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

// Reusable Section Component with Framer Motion
const Section = ({ id, eyebrow, title, children }) => {
  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="learning-card"
      style={{ marginBottom: '3rem' }}
    >
      <div style={{ color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
        {eyebrow}
      </div>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{title}</h2>
      {children}
    </motion.section>
  );
};

export default function CSSDay1({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined') {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    if (nextSectionId === 'module4') {
      onNavigate('module4', 'boxmodel');
    } else {
      onNavigate('module3', nextSectionId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const typesCode = `<!-- 1. Inline CSS -->
<h1 style="color: blue;">Hello World</h1>

<!-- 2. Internal CSS -->
<style>
  p { color: red; }
</style>

<!-- 3. External CSS (Recommended) -->
<link rel="stylesheet" href="styles.css">`;

  const basicSelectorsCode = `/* 1. Universal Selector (*) - Targets ALL elements */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 2. Element / Type Selector - Targets by HTML tag name */
h1 {
  color: #1e3a8a;
  font-family: 'Inter', sans-serif;
}

p {
  line-height: 1.6;
  color: #475569;
}

/* 3. Class Selector (.) - Targets elements with class="btn" */
.btn {
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
}

/* 4. ID Selector (#) - Targets single element with id="main-header" */
#main-header {
  background-color: #0f172a;
  padding: 2rem;
}

/* 5. Grouping Selector (,) - Applies styles to multiple selectors */
h1, h2, h3, .heading-text {
  font-weight: 800;
  letter-spacing: -0.02em;
}`;

  const combinatorsCode = `/* 1. Descendant Selector (space) - Targets B inside A at ANY level */
div p {
  color: #334155; /* Styles any <p> inside a <div> */
}

/* 2. Direct Child Selector (>) - Targets B that is an IMMEDIATE child of A */
ul > li {
  list-style-type: square; /* Styles <li> directly under <ul> */
}

/* 3. Adjacent Sibling Selector (+) - Targets B IMMEDIATELY FOLLOWING A */
h2 + p {
  font-size: 1.1rem; /* Styles <p> directly after an <h2> */
  font-weight: 600;
}

/* 4. General Sibling Selector (~) - Targets ALL B siblings FOLLOWING A */
h2 ~ p {
  color: #64748b; /* Styles all <p> siblings after an <h2> */
}`;

  const attributeSelectorsCode = `/* 1. Presence Selector [attr] - Has attribute */
input[required] {
  border-left: 4px solid #ef4444;
}

/* 2. Exact Match [attr="value"] */
input[type="text"] {
  border: 1px solid #cbd5e1;
  padding: 0.5rem;
}

/* 3. Starts With [attr^="value"] - e.g. Secure HTTPS Links */
a[href^="https://"] {
  color: #059669;
  font-weight: 600;
}

/* 4. Ends With [attr$="value"] - e.g. PDF Download links */
a[href$=".pdf"]::after {
  content: " 📄 (PDF)";
}

/* 5. Contains Substring [attr*="value"] */
a[href*="github"] {
  color: #0f172a;
}`;

  const pseudoClassesCode = `/* 1. User Interaction Pseudo-Classes */
a:hover {
  color: #2563eb;
  text-decoration: underline;
}

button:active {
  transform: scale(0.98);
}

input:focus {
  outline: 2px solid #3b82f6;
  border-color: transparent;
}

/* 2. Structural & Child Position Pseudo-Classes */
li:first-child {
  font-weight: 700;
}

li:last-child {
  border-bottom: none;
}

/* Alternate Row Coloring with :nth-child(even/odd) */
tr:nth-child(even) {
  background-color: #f8fafc;
}

/* 3. Form State Pseudo-Classes */
input:checked + label {
  color: #2563eb;
  font-weight: 700;
}

input:disabled {
  background-color: #e2e8f0;
  cursor: not-allowed;
}

/* 4. Modern Logical Pseudo-Classes */
/* Target buttons that do NOT have .btn-primary */
button:not(.btn-primary) {
  background-color: #cbd5e1;
}

/* Target card container if it HAS an error message */
.card:has(.error-message) {
  border: 2px solid #ef4444;
}`;

  const pseudoElementsCode = `/* 1. ::before - Inserts decorative content BEFORE element */
.quote::before {
  content: "“ ";
  font-size: 2rem;
  color: #3b82f6;
}

/* 2. ::after - Inserts content AFTER element */
.badge-new::after {
  content: " NEW";
  background-color: #ef4444;
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

/* 3. ::first-letter - Drop Caps for article intros */
.article-intro::first-letter {
  font-size: 3rem;
  font-weight: 900;
  float: left;
  margin-right: 0.5rem;
  color: #1e3a8a;
}

/* 4. ::selection - Custom text highlight when dragging mouse */
::selection {
  background-color: #fef08a;
  color: #0f172a;
}

/* 5. ::placeholder - Custom form input placeholder styling */
input::placeholder {
  color: #94a3b8;
  font-style: italic;
}`;

  const specificityCode = `/* Specificity Hierarchy Comparison */

/* Score: 0,0,0,1 (1 point) */
p {
  color: black;
}

/* Score: 0,0,1,0 (10 points) - OVERRIDES element selector */
.text-danger {
  color: red;
}

/* Score: 0,1,0,0 (100 points) - OVERRIDES class selector */
#main-banner {
  color: blue;
}

/* Score: 1,0,0,0 (1000 points) - Inline style attribute */
/* <p style="color: green;"> Overrides external CSS */

/* The !important rule - OVERRIDES ALL standard specificity */
.alert-box {
  color: white !important;
}`;

  const backgroundCode = `.hero-section {
  /* 1. Solid & Gradient Backgrounds */
  background-color: #1e40af;
  /* Gradients: linear, radial, conic */
  background-image: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%), url('pattern.png');

  /* 2. Image Sizing & Tiling */
  background-size: cover;          /* Options: cover, contain, auto, 100% 200px */
  background-repeat: no-repeat;    /* Options: repeat, no-repeat, repeat-x, repeat-y */
  background-position: center top; /* Options: center, top right, 50% 50% */

  /* 3. Attachment & Scrolling */
  background-attachment: fixed;    /* Options: scroll, fixed (Parallax effect), local */

  /* 4. Origin & Clipping Bounds */
  background-origin: padding-box;  /* Options: border-box, padding-box, content-box */
  background-clip: border-box;     /* Options: border-box, padding-box, content-box, text */
}

/* 5. Shorthand Syntax */
.banner {
  background: #0f172a url('hero.jpg') no-repeat center/cover fixed;
}`;

  const propertiesCode = `.article-text {
  /* 1. Font Family, Size & Weight */
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 600;       /* 100 to 900 or normal, bold */
  font-style: italic;     /* Options: normal, italic, oblique */
  font-variant: normal;   /* Options: normal, small-caps */

  /* 2. Alignment & Spacing */
  text-align: justify;    /* Options: left, center, right, justify */
  line-height: 1.6;       /* Vertical line height (Leading) */
  letter-spacing: 0.05em; /* Space between letters (Tracking) */
  word-spacing: 2px;      /* Space between words */
  text-indent: 1.5rem;    /* First-line indent */

  /* 3. Decoration & Transformation */
  text-decoration: underline wavy #3b82f6; /* line, color, style */
  text-transform: capitalize;               /* uppercase, lowercase, capitalize, none */

  /* 4. Visual Effects & Word Wrapping */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  overflow-wrap: break-word;                /* Prevents long text from clipping */
}`;

  const listsCode = `/* 1. List Bullet Customization */
ul.custom-list {
  list-style-type: square;        /* Options: disc, circle, square, decimal, alpha, none */
  list-style-position: inside;    /* Options: inside, outside */
  list-style-image: url('star.png'); /* Custom bullet image */
}

/* Shorthand List Property */
ol.step-list {
  list-style: decimal inside;
}

/* 2. Opacity vs Visibility */
.ghost-card {
  background-color: #0f172a;
  opacity: 0.85;                  /* Range: 0.0 (transparent) to 1.0 (fully opaque) */
}

.invisible-element {
  visibility: hidden;             /* Hidden but preserves space in layout */
}

/* 3. Modern CSS Filters */
.card-banner {
  filter: blur(2px) brightness(1.1) drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}`;

  const projectHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0fdf4;
    margin: 0;
    padding: 0;
  }
  
  .header {
    background-color: #166534;
    color: white;
    text-align: center;
    padding: 2rem;
  }
  
  .container {
    max-width: 800px;
    margin: 2rem auto;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .project-list {
    list-style-type: none;
    padding: 0;
  }
  
  .project-list li {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #22c55e;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 1rem;
  }
</style>
</head>
<body>

<div class="header">
  <h1>Jane Doe</h1>
  <p>Frontend Developer & Designer</p>
</div>

<div class="container">
  <h2 style="color: #166534;">About Me</h2>
  <p>Hi! I'm a passionate web developer learning HTML and CSS to build amazing websites.</p>
  
  <h2 style="color: #166534; margin-top: 2rem;">My Projects</h2>
  <ul class="project-list">
    <li><strong>Project Alpha:</strong> A responsive landing page</li>
    <li><strong>Project Beta:</strong> A dynamic React application</li>
    <li><strong>Project Gamma:</strong> An e-commerce dashboard</li>
  </ul>
  
  <a href="#" class="btn">Contact Me</a>
</div>

</body>
</html>`;

  const cssQuizQuestions = [
    {
      question: "Which CSS selector targets an element with a specific class?",
      options: [
        "#classname",
        ".classname",
        "classname",
        "*classname"
      ],
      correctAnswer: 1,
      explanation: "Class selectors start with a period (.) followed by the class name (e.g. .btn)."
    },
    {
      question: "Which combinator selector targets an element that is a direct immediate child of another?",
      options: [
        "A B (descendant)",
        "A > B (child)",
        "A + B (adjacent sibling)",
        "A ~ B (general sibling)"
      ],
      correctAnswer: 1,
      explanation: "The child combinator (>) targets elements that are direct immediate children of the specified parent."
    },
    {
      question: "Which attribute selector matches links whose href ends with '.pdf'?",
      options: [
        "a[href^='.pdf']",
        "a[href*='.pdf']",
        "a[href$='.pdf']",
        "a[href~='.pdf']"
      ],
      correctAnswer: 2,
      explanation: "The suffix attribute selector ($=) matches values that END with the specified string."
    },
    {
      question: "Which selector category has the highest specificity score?",
      options: [
        "Element selector (p)",
        "Class selector (.card)",
        "ID selector (#main-header)",
        "Universal selector (*)"
      ],
      correctAnswer: 2,
      explanation: "ID selectors carry a specificity score of 100, which overrides class selectors (10) and element selectors (1)."
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Fundamentals" title="Introduction to CSS">
          <div className="panel">
            <p><strong>CSS (Cascading Style Sheets)</strong> is the language we use to style an HTML document. It describes how HTML elements should be displayed on screen, transforming a plain webpage into a beautifully designed site.</p>
            <p>A CSS rule consists of a <strong>selector</strong> and a <strong>declaration block</strong>:</p>
            <div className="code-pane" style={{ margin: '1rem 0' }}>
              <pre><code className="language-css">h1 {'{'} color: green; font-family: sans-serif; {'}'}</code></pre>
            </div>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
              <li><strong>Selector:</strong> Points to the HTML element you want to style (e.g. <code>h1</code>).</li>
              <li><strong>Property:</strong> The specific style you want to change (e.g. <code>color</code>).</li>
              <li><strong>Value:</strong> The value applied to the property (e.g. <code>green</code>).</li>
            </ul>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('types')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'types' && (
        <Section key="types" id="types" eyebrow="Integration" title="Types of CSS">
          <div className="panel">
            <p>There are three ways to insert CSS into your HTML documents:</p>
            <div className="code-example-box">
              <div className="code-header">CSS Integration Methods</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(typesCode, Prism.languages.markup, 'markup') }}></pre>
                </div>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('selectors')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── COMPREHENSIVE CSS SELECTORS STUDY CONTENT ─── */}
      {activeTab === 'selectors' && (
        <Section key="selectors" id="selectors" eyebrow="Targeting" title="Complete Guide to CSS Selectors">
          <div className="panel">

            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🎯 What are CSS Selectors?</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                CSS Selectors are pattern rules used to <strong>find and target</strong> specific HTML elements you want to style. Mastering selectors allows you to style elements precisely based on their tag name, class, ID, position in the document tree, user state, attributes, or pseudo-elements.
              </p>
            </div>

            {/* ─── SECTION 1: BASIC SELECTORS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem', marginTop: '1rem' }}>1. Basic / Simple Selectors</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Basic selectors target elements directly by name, class, ID, or universal scope.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Selector Type</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Syntax Pattern</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Description & Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}>Universal</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>*</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Targets <strong>ALL elements</strong> on the page. Ideal for box-model resets.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}>Element / Type</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>element (e.g. h1, p)</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Targets elements by HTML tag name (all <code>&lt;p&gt;</code> or <code>&lt;h1&gt;</code>).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}>Class Selector</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>.classname</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Targets elements with <code>class="btn"</code>. Reusable for multiple elements.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}>ID Selector</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>#idname</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Targets a single unique element with <code>id="header"</code>. High specificity.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}>Grouping Selector</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>sel1, sel2, sel3</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Applies identical CSS declarations to multiple selectors separated by commas.</td>
                </tr>
              </tbody>
            </table>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Basic Selectors Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(basicSelectorsCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            {/* ─── SECTION 2: COMBINATOR SELECTORS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Combinator Selectors</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Combinators define the <strong>relationship</strong> between HTML elements in the DOM hierarchy tree.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.8rem' }}>
              <div style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <code style={{ fontSize: '1rem', color: '#0284c7', fontWeight: 700 }}>A B (Descendant)</code>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                  Selects element <code>B</code> that is nested anywhere inside element <code>A</code> (children, grandchildren, etc.).
                </p>
              </div>
              <div style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <code style={{ fontSize: '1rem', color: '#0284c7', fontWeight: 700 }}>A &gt; B (Direct Child)</code>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                  Selects element <code>B</code> that is an <strong>immediate direct child</strong> of element <code>A</code>.
                </p>
              </div>
              <div style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <code style={{ fontSize: '1rem', color: '#0284c7', fontWeight: 700 }}>A + B (Adjacent Sibling)</code>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                  Selects element <code>B</code> that is <strong>immediately next to</strong> element <code>A</code> at the same level.
                </p>
              </div>
              <div style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <code style={{ fontSize: '1rem', color: '#0284c7', fontWeight: 700 }}>A ~ B (General Sibling)</code>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                  Selects <strong>all sibling elements B</strong> that follow element <code>A</code> at the same hierarchy level.
                </p>
              </div>
            </div>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Combinator Selectors Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(combinatorsCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            {/* ─── SECTION 3: ATTRIBUTE SELECTORS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>3. Attribute Selectors</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Attribute selectors target elements based on the presence, exact value, or partial value of HTML attributes.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.8rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Selector Syntax</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Matching Condition</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Practical Real-World Example</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>[attr]</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Has attribute present</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}><code>input[required]</code> (Style required fields)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>[attr="val"]</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Exact value match</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}><code>input[type="text"]</code> (Style text inputs)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>[attr^="val"]</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Starts with string</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}><code>a[href^="https://"]</code> (Style secure links)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>[attr$="val"]</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Ends with string</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}><code>a[href$=".pdf"]</code> (Add PDF icons)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>[attr*="val"]</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Contains substring</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}><code>a[href*="github"]</code> (Style GitHub links)</td>
                </tr>
              </tbody>
            </table>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Attribute Selectors Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(attributeSelectorsCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            {/* ─── SECTION 4: PSEUDO-CLASSES ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>4. Pseudo-Class Selectors (`:pseudo-class`)</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Pseudo-classes (prefixed with a single colon <code>:</code>) style elements based on <strong>user state</strong>, <strong>position</strong>, or <strong>form validation status</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.8rem' }}>
              <div style={{ background: '#eff6ff', padding: '1.2rem', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#1e3a8a' }}>👆 User Interaction States</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  • <code>:hover</code> — Mouse hovers over element<br />
                  • <code>:active</code> — Element is clicked<br />
                  • <code>:focus</code> — Input receives keyboard focus<br />
                  • <code>:visited</code> — Link already visited
                </p>
              </div>
              <div style={{ background: '#eff6ff', padding: '1.2rem', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#1e3a8a' }}>📊 Structural Child Position</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  • <code>:first-child</code> — First child element<br />
                  • <code>:last-child</code> — Last child element<br />
                  • <code>:nth-child(even/odd)</code> — Zebra stripes<br />
                  • <code>:empty</code> — Elements with zero children
                </p>
              </div>
              <div style={{ background: '#eff6ff', padding: '1.2rem', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#1e3a8a' }}>📝 Form & Logical States</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  • <code>:checked</code> — Checkboxes & Radios<br />
                  • <code>:disabled</code> — Disabled input buttons<br />
                  • <code>:not(selector)</code> — Negation rule<br />
                  • <code>:has(selector)</code> — Parent container rule
                </p>
              </div>
            </div>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Pseudo-Classes Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(pseudoClassesCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            {/* ─── SECTION 5: PSEUDO-ELEMENTS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>5. Pseudo-Element Selectors (`::pseudo-element`)</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Pseudo-elements (prefixed with double colons <code>::</code>) style <strong>specific parts of an element</strong> or insert decorative content.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.8rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Pseudo-Element</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Behavior & Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>::before</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Inserts decorative content <strong>BEFORE</strong> an element's text content.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>::after</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Inserts content <strong>AFTER</strong> an element's text content (icons, badges, clearfixes).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>::first-letter</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Styles the <strong>very first character</strong> of a text paragraph (Drop Caps).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>::selection</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Styles background & text colors when a user highlights text with their cursor.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>::placeholder</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Styles grey placeholder hint text inside form inputs.</td>
                </tr>
              </tbody>
            </table>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Pseudo-Elements Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(pseudoElementsCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            {/* ─── SECTION 6: SPECIFICITY & CASCADE RULES ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>6. Selector Specificity & The Cascade Rule</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              When multiple CSS rules conflict on the same HTML element, the browser uses <strong>Specificity Weights</strong> to decide which style wins.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.8rem' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#0f172a', fontSize: '1.1rem' }}>📊 Specificity Score Hierarchy:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                  <strong style={{ color: '#991b1b', fontSize: '1.1rem' }}>Inline Style</strong>
                  <div style={{ color: '#7f1d1d', fontWeight: 800, fontSize: '1.2rem' }}>1000 Points</div>
                  <span style={{ fontSize: '0.8rem', color: '#991b1b' }}>style="..." attribute</span>
                </div>
                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '8px', border: '1px solid #fde68a' }}>
                  <strong style={{ color: '#92400e', fontSize: '1.1rem' }}>ID Selector</strong>
                  <div style={{ color: '#78350f', fontWeight: 800, fontSize: '1.2rem' }}>100 Points</div>
                  <span style={{ fontSize: '0.8rem', color: '#92400e' }}>#header, #main</span>
                </div>
                <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                  <strong style={{ color: '#1e40af', fontSize: '1.1rem' }}>Class / Attr / Pseudo</strong>
                  <div style={{ color: '#1e3a8a', fontWeight: 800, fontSize: '1.2rem' }}>10 Points</div>
                  <span style={{ fontSize: '0.8rem', color: '#1e40af' }}>.btn, [type], :hover</span>
                </div>
                <div style={{ background: '#d1fae5', padding: '1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <strong style={{ color: '#065f46', fontSize: '1.1rem' }}>Element / Pseudo-el</strong>
                  <div style={{ color: '#064e3b', fontWeight: 800, fontSize: '1.2rem' }}>1 Point</div>
                  <span style={{ fontSize: '0.8rem', color: '#065f46' }}>div, p, h1, ::before</span>
                </div>
              </div>
            </div>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Specificity Comparison Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(specificityCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('backgrounds')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'backgrounds' && (
        <Section key="backgrounds" id="backgrounds" eyebrow="Styling" title="Complete Guide to Background Properties">
          <div className="panel">

            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🌄 What are CSS Background Properties?</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                CSS Background properties allow you to control the element's canvas layer. You can apply solid colors, single or multiple background images, smooth CSS gradients, fine-tune sizing, positioning, scrolling behavior (parallax), and clip bounds.
              </p>
            </div>

            {/* ─── BACKGROUND PROPERTY REFERENCE TABLE ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Background Property Reference</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Below is a detailed breakdown of all CSS Background properties, their accepted values, default settings, and practical use cases:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Property Name</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Accepted Values</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Default</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Description & Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-color</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>HEX, RGB, HSL, Named colors, <code>transparent</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>transparent</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Sets a solid background color behind element content.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-image</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>url('image.jpg')</code>, <code>linear-gradient()</code>, <code>radial-gradient()</code>, <code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Sets one or multiple background images or CSS color gradients.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-size</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>cover</code>, <code>contain</code>, <code>auto</code>, <code>100% 200px</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>auto</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Controls image dimensions. <code>cover</code> fills container; <code>contain</code> fits inside without cropping.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-position</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>center</code>, <code>top left</code>, <code>bottom right</code>, <code>50% 50%</code>, <code>20px 40px</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>0% 0%</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Sets starting position of the background image inside the container.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-repeat</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>repeat</code>, <code>no-repeat</code>, <code>repeat-x</code>, <code>repeat-y</code>, <code>space</code>, <code>round</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>repeat</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Determines if and how background images repeat across X/Y axes.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-attachment</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>scroll</code>, <code>fixed</code>, <code>local</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>scroll</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Controls if image scrolls with viewport (<code>scroll</code>) or stays locked in place (<code>fixed</code> for Parallax).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-origin</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>border-box</code>, <code>padding-box</code>, <code>content-box</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>padding-box</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Specifies positioning area anchor for background images.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background-clip</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>border-box</code>, <code>padding-box</code>, <code>content-box</code>, <code>text</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>border-box</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Defines painting boundary area of background color/image. <code>text</code> enables gradient text.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>background</code> (Shorthand)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>color image repeat position/size attachment</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>N/A</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Shorthand property to set all background properties in a single declaration line.</td>
                </tr>
              </tbody>
            </table>

            {/* ─── FEATURE CARDS FOR BACKGROUND CONCEPTS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Key Background Concepts Explained</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0284c7' }}>🖼️ background-size: cover vs contain</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  • <strong>cover:</strong> Scales image to completely cover container (cuts off overflowing edges).<br />
                  • <strong>contain:</strong> Scales image to fit fully inside container without cropping (may leave empty margins).
                </p>
              </div>
              <div style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0284c7' }}>📜 background-attachment: fixed (Parallax)</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  Setting <code>background-attachment: fixed</code> locks the background image relative to the viewport window. As users scroll, text moves over a stationary background image creating a <strong>Parallax effect</strong>.
                </p>
              </div>
              <div style={{ background: '#fafafa', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0284c7' }}>🌈 CSS Gradients</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  Gradients are generated images created in CSS:<br />
                  • <code>linear-gradient(direction, color1, color2)</code><br />
                  • <code>radial-gradient(shape, startColor, endColor)</code><br />
                  • <code>conic-gradient(from angle, colors...)</code>
                </p>
              </div>
            </div>

            {/* ─── CODE EXAMPLE BOX ─── */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Background Properties Code Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(backgroundCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('text')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'text' && (
        <Section key="text" id="text" eyebrow="Typography" title="Complete Guide to Text & Typography Properties">
          <div className="panel">

            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>✍️ What are CSS Text Properties?</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                CSS Text & Typography properties control font selection, sizing, text weights, alignment, line spacing (leading), letter spacing (tracking), decorations, transformations, drop shadows, and long-word wrapping rules.
              </p>
            </div>

            {/* ─── TEXT PROPERTY REFERENCE TABLE ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Typography Property Reference Table</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Detailed guide to font, spacing, alignment, and text effect properties in CSS:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Property Name</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Accepted Values</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Default</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Description & Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>font-family</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>'Inter'</code>, <code>sans-serif</code>, <code>serif</code>, <code>monospace</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Browser dependent</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Defines font stack family list with fallback fonts.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>font-size</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>16px</code>, <code>1rem</code>, <code>1.2em</code>, <code>120%</code>, <code>clamp()</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>medium</code> (16px)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Sets text size in absolute (px) or relative (rem, em, %) units.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>font-weight</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code> (400), <code>bold</code> (700), <code>100</code> to <code>900</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Controls font boldness thickness (thin 100 to black 900).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>font-style</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code>, <code>italic</code>, <code>oblique</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Applies cursive italic slant to text typography.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>font-variant</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code>, <code>small-caps</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Renders lowercase text as small capital letters.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>text-align</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>left</code>, <code>center</code>, <code>right</code>, <code>justify</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>left</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Sets horizontal alignment of text lines inside container block.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>line-height</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code>, <code>1.5</code>, <code>24px</code>, <code>160%</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code> (~1.2)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Controls vertical distance between lines of text (leading). Recommended: <code>1.5</code> to <code>1.7</code> for readability.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>letter-spacing</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code>, <code>0.05em</code>, <code>1px</code>, <code>-0.5px</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Controls horizontal spacing between individual characters (tracking).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>word-spacing</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code>, <code>2px</code>, <code>0.2em</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Adjusts horizontal spacing gaps between words.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>text-indent</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>2rem</code>, <code>40px</code>, <code>5%</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>0</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Indents the first line of text in a block paragraph.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>text-decoration</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>none</code>, <code>underline</code>, <code>line-through</code>, <code>overline</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Adds decorative lines (e.g. underline for hyperlinks, line-through for deleted price).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>text-transform</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>uppercase</code>, <code>lowercase</code>, <code>capitalize</code>, <code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Changes character capitalization without editing original HTML text.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>text-shadow</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>x-offset y-offset blur color</code> (e.g. <code>2px 2px 4px #000</code>)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Applies shadow drop effects behind text characters.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>overflow-wrap</code> / <code style={{ color: '#2563eb' }}>word-break</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code>, <code>break-word</code>, <code>break-all</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>normal</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Forces long URLs or unbroken words to wrap into next line, preventing container overflow.</td>
                </tr>
              </tbody>
            </table>

            {/* ─── 3 CATEGORY CARDS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Typography Categories Breakdown</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#1e3a8a' }}>🔤 Font Core Properties</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  • <code>font-family</code>: Sets font stack<br />
                  • <code>font-size</code>: Text size (px, rem, em)<br />
                  • <code>font-weight</code>: Boldness (100 to 900)<br />
                  • <code>font-style</code>: Normal vs Italic<br />
                  • <code>font-variant</code>: Small Caps
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#1e3a8a' }}>📐 Alignment & Spacing</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  • <code>text-align</code>: Left, center, right, justify<br />
                  • <code>line-height</code>: Vertical spacing between lines<br />
                  • <code>letter-spacing</code>: Space between characters<br />
                  • <code>word-spacing</code>: Space between words<br />
                  • <code>text-indent</code>: First-line paragraph indent
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#1e3a8a' }}>🎨 Decorations & Wrapping</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  • <code>text-decoration</code>: Underline, line-through<br />
                  • <code>text-transform</code>: Uppercase, capitalize<br />
                  • <code>text-shadow</code>: Text drop shadows<br />
                  • <code>overflow-wrap</code>: Long URL break wrapping
                </p>
              </div>
            </div>

            {/* ─── CODE EXAMPLE BOX ─── */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Text & Typography Code Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(propertiesCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('lists')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'lists' && (
        <Section key="lists" id="lists" eyebrow="Layouts" title="Complete Guide to Lists, Opacity & Visual Properties">
          <div className="panel">

            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📋 Lists, Transparency (Opacity) & Visual Filters</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                Learn how to customize list bullet points, control element transparency with <code>opacity</code>, manage element visibility states, and apply graphical CSS <code>filter</code> effects (blur, brightness, drop-shadow).
              </p>
            </div>

            {/* ─── LISTS & VISUAL REFERENCE TABLE ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. List & Visual Property Reference</h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Property Name</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Accepted Values</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Default</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Description & Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>list-style-type</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>disc</code>, <code>circle</code>, <code>square</code>, <code>decimal</code>, <code>lower-alpha</code>, <code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>disc</code> (ul) / <code>decimal</code> (ol)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Changes bullet point marker type or removes bullets (<code>none</code> for navigation bars).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>list-style-position</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>outside</code>, <code>inside</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>outside</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Specifies whether list bullet markers sit inside or outside the content item box.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>list-style-image</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>url('icon.png')</code>, <code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Replaces standard bullets with custom image icons.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>list-style</code> (Shorthand)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>type position image</code> (e.g. <code>square inside</code>)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>N/A</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Shorthand property to set list type, position, and image together.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>opacity</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>0.0</code> (fully transparent) to <code>1.0</code> (fully opaque)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>1.0</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Adjusts transparency of an element and ALL its child elements together.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>visibility</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>visible</code>, <code>hidden</code>, <code>collapse</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>visible</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Hides element while preserving its empty layout box space in DOM layout.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>filter</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>blur()</code>, <code>brightness()</code>, <code>drop-shadow()</code>, <code>grayscale()</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Applies visual graphic adjustments to elements (blurs, contrast, shadows).</td>
                </tr>
              </tbody>
            </table>

            {/* ─── OPACITY VS VISIBILITY VS DISPLAY COMPARISON TABLE ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Comparison: Opacity vs Visibility vs Display</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Understanding the critical differences when hiding or making elements transparent:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>CSS Property</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Takes Layout Space?</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Mouse & Keyboard Clickable?</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Animatable with CSS Transitions?</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>opacity: 0</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#059669', fontWeight: 700 }}>✅ YES (Preserved)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#dc2626', fontWeight: 700 }}>⚠️ YES (Still clickable!)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#059669', fontWeight: 700 }}>✅ YES (Smooth fade transition)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>visibility: hidden</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#059669', fontWeight: 700 }}>✅ YES (Preserved)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#059669', fontWeight: 700 }}>❌ NO (Ignored)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#d97706', fontWeight: 700 }}>⚠️ Limited (Step transitions)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>display: none</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#dc2626', fontWeight: 700 }}>❌ NO (Removed from DOM flow)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#059669', fontWeight: 700 }}>❌ NO (Ignored)</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#dc2626', fontWeight: 700 }}>❌ NO (Instant removal)</td>
                </tr>
              </tbody>
            </table>

            {/* ─── CODE EXAMPLE BOX ─── */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Lists & Opacity Code Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(listsCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="CSS Playground">
          <p>Experiment with CSS Selectors, Fonts, and Backgrounds in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Personal Portfolio">
          <p>Combine all your CSS knowledge to build a fully styled Personal Portfolio page!</p>
          <div className="panel">
            <div className="code-example-box">
              <div className="code-header">portfolio.html</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="preview-pane" style={{ background: '#f9fafb', padding: '0', display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                  <div dangerouslySetInnerHTML={{ __html: projectHtml }} style={{ width: '100%', maxHeight: '600px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                </div>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectHtml, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '400px', overflowY: 'auto' }}></pre>
                </div>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Continue to Quiz (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="CSS Knowledge Check">
          <p>Let's see what you've learned about CSS rules, selectors, and properties!</p>
          <Quiz questions={cssQuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
