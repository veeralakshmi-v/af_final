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

  const selectorsCode = `/* 1. Element Selector */
p {
  color: #333;
}

/* 2. Class Selector (Starts with .) */
.highlight {
  background-color: yellow;
}

/* 3. ID Selector (Starts with #) */
#main-header {
  font-size: 2em;
}`;

  const backgroundCode = `.hero-section {
  /* Solid Color */
  background-color: #1e40af;
  
  /* Background Image */
  background-image: url('pattern.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`;

  const propertiesCode = `.article-text {
  /* Font Family & Size */
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400; /* Normal */
  
  /* Text Alignment */
  text-align: justify;
  
  /* Text Decoration */
  text-decoration: underline;
  text-transform: uppercase;
}`;

  const listsCode = `/* Styling Lists */
ul.custom-list {
  list-style-type: square; /* Change bullet */
  /* OR list-style-type: none; to remove */
}

/* Opacity */
.ghost-box {
  background-color: black;
  opacity: 0.5; /* 50% transparent */
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

            {activeTab === 'selectors' && (
              <Section key="selectors" id="selectors" eyebrow="Targeting" title="CSS Selectors">
                <div className="panel">
                  <p>Selectors are used to "find" (or select) the HTML elements you want to style.</p>
                  <p><strong>Classes vs IDs:</strong> Use a <code>.class</code> to style a <i>group</i> of multiple elements. Use an <code>#id</code> to uniquely identify and style a <i>single</i> element on the page.</p>
                  <div className="code-example-box">
                    <div className="code-header">Common Selectors</div>
                    <div className="code-content">
                      <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                        <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(selectorsCode, Prism.languages.css, 'css') }}></pre>
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
              <Section key="backgrounds" id="backgrounds" eyebrow="Styling" title="Background Properties">
                <div className="panel">
                  <p>You can set solid background colors or complex background images on any element.</p>
                  <div className="code-example-box">
                    <div className="code-header">Background CSS</div>
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
              <Section key="text" id="text" eyebrow="Typography" title="Text Properties">
                <div className="panel">
                  <p>Beyond fonts, you can control the alignment, decoration, and spacing of text blocks.</p>
                  <div className="code-example-box">
                    <div className="code-header">Text & Font Styling Example</div>
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
              <Section key="lists" id="lists" eyebrow="Layouts" title="Lists & Opacity">
                <div className="panel">
                  <p><strong>Lists:</strong> You can completely customize bullet points, change them to images, or remove them entirely (often used for navigation menus).</p>
                  <p><strong>Opacity:</strong> Controls the transparency of an element. A value of <code>0.0</code> is completely transparent, while <code>1.0</code> is completely opaque.</p>
                  <div className="code-example-box">
                    <div className="code-header">Lists & Opacity CSS</div>
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
