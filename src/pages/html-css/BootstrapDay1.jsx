import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveEditor from '../../components/LiveEditor';
import Quiz from '../../components/Quiz';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
    style={{ marginBottom: '3rem' }}
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function BootstrapDay1({ activeTab, onNavigate, openAITutor }) {
  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '⚡', '⭐'], confettiNumber: 30 });
    }
    onNavigate('bootstrap_day1', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAITutorLocal = (question) => {
    if (openAITutor) {
      openAITutor(question);
    }
  };

  // Code snippets
  const cdnCode = `<!-- Copy link tag into the <head> of your index.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Copy script tag before the closing </body> tag of your index.html -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>`;

  const containerSpacingCode = `<!-- Fixed container with max-width values for breakpoints -->
<div class="container bg-light py-3 my-4 border text-center">
  <p class="m-0">Fixed Container (Centered automatically, responsive width)</p>
</div>

<!-- Fluid container that always spans 100% width -->
<div class="container-fluid bg-dark text-white p-4">
  <h4 class="mb-2">Fluid Header</h4>
  <p class="m-0 text-secondary">Always 100% width of the screen.</p>
</div>`;

  const typographyColorsCode = `<h1 class="display-4 text-primary">Display 1 Heading</h1>
<p class="h3 text-secondary">Subtitle using .h3 class</p>
<p class="text-center font-monospace">Monospaced text aligned center.</p>

<p class="p-3 mb-2 bg-success text-white">Success background with white text</p>
<p class="p-3 mb-2 bg-warning text-dark">Warning background with dark text</p>
<p class="p-3 mb-2 bg-danger text-white">Danger background with white text</p>`;

  const utilitiesCode = `<!-- Rounded border with primary color -->
<div class="border border-primary border-3 rounded p-3 mb-3 text-center">
  Border styled container
</div>

<!-- Fully rounded circle -->
<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bootstrap" alt="Avatar" class="rounded-circle bg-light border p-2" style="width: 100px; height: 100px;">

<!-- Shadow and sizing classes -->
<div class="w-75 mx-auto p-4 bg-white shadow-lg rounded-4 text-center">
  <p class="fw-bold text-dark m-0">Card container with shadows & rounded corners</p>
</div>`;

  const buttonsAlertsCode = `<!-- Various buttons -->
<div class="mb-4">
  <button class="btn btn-primary shadow-sm">Primary Button</button>
  <button class="btn btn-outline-success">Success Outline</button>
  <button class="btn btn-danger btn-sm">Small Danger Button</button>
  <button class="btn btn-dark btn-lg">Large Dark Button</button>
</div>

<!-- Alerts with badges inside -->
<div class="alert alert-info py-3 px-4 rounded-3 shadow-sm" role="alert">
  <strong>Latest Updates!</strong> We launched Bootstrap 5 modules.
  <span class="badge bg-secondary ms-2">New</span>
</div>

<div class="alert alert-danger" role="alert">
  ⚠️ Critical system alert: Please resolve issues immediately.
</div>`;

  const playgroundStarterHtml = `<div class="container my-5 text-center">
  <div class="p-5 bg-light rounded-4 shadow-sm">
    <h1 class="display-5 text-primary fw-bold">Welcome to Bootstrap!</h1>
    <p class="col-md-8 mx-auto fs-5 text-muted">
      This live editor playground has the Bootstrap stylesheet loaded. 
      Try changing colors, modifying margins, and using helper utilities!
    </p>
    <button class="btn btn-primary btn-lg px-4 rounded-pill shadow">Explore Utilities</button>
    <button class="btn btn-outline-secondary btn-lg px-4 rounded-pill">Documentation</button>
  </div>
</div>`;

  const miniProjectHtml = `<!-- Profile Card Component using Bootstrap 5 classes -->
<div class="card shadow-sm border-0 mx-auto" style="max-width: 380px; border-radius: 16px; overflow: hidden;">
  <div class="bg-primary text-center py-4" style="background: linear-gradient(135deg, #0d6efd, #0dcaf0) !important;">
    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="Jane Coder" class="rounded-circle border border-white border-3 bg-white" style="width: 90px; height: 90px;">
  </div>
  <div class="card-body text-center p-4">
    <h4 class="card-title fw-bold text-dark mb-1">Jane Coder</h4>
    <p class="text-muted small mb-3">Front-End Developer</p>
    
    <div class="d-flex justify-content-center gap-2 mb-3">
      <span class="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill">UI/UX</span>
      <span class="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill">Bootstrap 5</span>
      <span class="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill">CSS</span>
    </div>
    
    <p class="card-text text-secondary mb-4">
      "Building responsive web applications that look clean, professional, and load fast on all device screens."
    </p>
    
    <div class="d-grid gap-2">
      <a href="mailto:jane@coder.com" class="btn btn-primary py-2 fw-semibold rounded-3 shadow-sm">Send Email</a>
      <button class="btn btn-outline-secondary py-2 fw-semibold rounded-3">View Portfolio</button>
    </div>
  </div>
</div>`;

  const quizQuestions = [
    {
      question: "Which stylesheet import correctly describes the standard method to run Bootstrap 5 on a website via CDNs?",
      options: [
        { id: 'a', text: "<link href='bootstrap.min.css' rel='stylesheet'> in the <head>", correct: false },
        { id: 'b', text: "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet'> in the <head>", correct: true },
        { id: 'c', text: "<script src='bootstrap.bundle.js'></script> in the <body> only", correct: false },
        { id: 'd', text: "<import url('bootstrap.css')>", correct: false },
      ]
    },
    {
      question: "What is the difference between the classes '.container' and '.container-fluid'?",
      options: [
        { id: 'a', text: ".container is for mobile, .container-fluid is for large desktops", correct: false },
        { id: 'b', text: ".container has fixed-width breakpoints, while .container-fluid is always 100% wide", correct: true },
        { id: 'c', text: ".container has default background colors, while .container-fluid has transparent background", correct: false },
        { id: 'd', text: ".container-fluid adds custom scrolling bar scripts", correct: false },
      ]
    },
    {
      question: "Which spacing utility adds a margin-bottom of size 3 (typically 1rem)?",
      options: [
        { id: 'a', text: ".m-3", correct: false },
        { id: 'b', text: ".pad-bottom-3", correct: false },
        { id: 'c', text: ".mb-3", correct: true },
        { id: 'd', text: ".pb-3", correct: false },
      ]
    },
    {
      question: "Which text color class represents a green 'success' status state?",
      options: [
        { id: 'a', text: ".text-green", correct: false },
        { id: 'b', text: ".text-success", correct: true },
        { id: 'c', text: ".text-primary", correct: false },
        { id: 'd', text: ".text-info", correct: false },
      ]
    },
    {
      question: "How do you make an image or element circular using Bootstrap utilities?",
      options: [
        { id: 'a', text: ".border-circle", correct: false },
        { id: 'b', text: ".rounded-circle", correct: true },
        { id: 'c', text: ".circle", correct: false },
        { id: 'd', text: ".shape-oval", correct: false },
      ]
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Day 10 - Module 1" title="Introduction to Bootstrap">
          <div className="panel">
            <p><strong>Bootstrap</strong> is the world's most popular open-source front-end CSS framework. It contains pre-designed templates for typography, forms, buttons, navigation bars, grids, and other UI components.</p>
            
            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Why Use Bootstrap?</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <li>🚀 <strong>Supercharged Speed:</strong> Build responsive pages in minutes instead of hours.</li>
              <li>📱 <strong>Mobile-First Design:</strong> Built-in grid systems automatically adapt content to mobile screen widths.</li>
              <li>🎨 <strong>Customizable:</strong> Simple utility class names make overriding colors, margins, and displays trivial.</li>
              <li>🔗 <strong>Consistency:</strong> Ensures layouts render consistently across all web browsers.</li>
            </ul>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Integrating Bootstrap via CDN</h3>
            <p>To use Bootstrap in a simple project, copy the CDN delivery links into your page structure:</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">index.html</div>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(cdnCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('containers')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutorLocal("Can you explain how to load Bootstrap using standard HTML imports?")}>Ask AI</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'containers' && (
        <Section key="containers" id="containers" eyebrow="Layout" title="Containers & Spacing">
          <div className="panel">
            <p>Containers are the basic layout element in Bootstrap and are required when using the grid system. They are used to contain, pad, and align content.</p>
            
            <h3 style={{ marginBottom: '1rem' }}>Container Types</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <li><code>.container</code>: Centered container with fixed max-width settings at each responsive screen breakpoint.</li>
              <li><code>.container-fluid</code>: Always spans 100% of the viewport width.</li>
            </ul>

            <h3 style={{ marginBottom: '1rem' }}>Spacing Utilities (Margin & Padding)</h3>
            <p>Bootstrap uses shorthand names for setting margins and padding. Format: <code>{`{property}{sides}-{size}`}</code></p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              <li><strong>Properties:</strong> <code>m</code> (margin), <code>p</code> (padding)</li>
              <li><strong>Sides:</strong> <code>t</code> (top), <code>b</code> (bottom), <code>s</code> (start/left), <code>e</code> (end/right), <code>x</code> (both left and right), <code>y</code> (both top and bottom), blank (all 4 sides)</li>
              <li><strong>Sizes:</strong> <code>0</code> (none) to <code>5</code> (max spacer), <code>auto</code> (automatic centering)</li>
              <li><strong>Examples:</strong> <code>mt-3</code> (margin-top: 1rem), <code>px-5</code> (horizontal padding: 3rem), <code>mx-auto</code> (auto center margin).</li>
            </ul>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">Container & Spacing Examples</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(containerSpacingCode, Prism.languages.markup, 'markup') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('typography')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'typography' && (
        <Section key="typography" id="typography" eyebrow="Typography & Color" title="Typography & Theme Colors">
          <div className="panel">
            <p>Bootstrap styles default typography dynamically, ensuring proper line heights, fonts, and sizing. It also features a curated set of theme utility classes.</p>

            <h3 style={{ marginBottom: '1rem' }}>Font & Alignment Sizers</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <li>Headings can be styled using <code>.h1</code> through <code>.h6</code> helper classes.</li>
              <li><code>.display-1</code> to <code>.display-6</code>: Creates a much larger, thin heading style.</li>
              <li><code>.text-center</code>, <code>.text-start</code>, <code>.text-end</code>: Controls text alignment.</li>
              <li><code>.fw-bold</code>, <code>.fw-semibold</code>, <code>.fst-italic</code>: Controls weight and styles.</li>
            </ul>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Bootstrap Palette Colors</h3>
            <p>Modify colors easily with utility prefixes: <code>text-</code> (for text) and <code>bg-</code> (for backgrounds).</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              <li>🔵 <code>.text-primary</code> (Theme default blue)</li>
              <li>⚪ <code>.text-secondary</code> (Gray)</li>
              <li>🟢 <code>.text-success</code> (Green)</li>
              <li>🔴 <code>.text-danger</code> (Red)</li>
              <li>🟡 <code>.text-warning</code> (Yellow / Orange)</li>
              <li>⚫ <code>.bg-dark</code> / <code>.text-light</code> (Dark color themes)</li>
            </ul>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(typographyColorsCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('utilities')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'utilities' && (
        <Section key="utilities" id="utilities" eyebrow="Utilities" title="Borders & Layout Helpers">
          <div className="panel">
            <p>Common CSS tasks like adding shadows, setting widths, and rounding corners can be achieved in Bootstrap using quick single utility class names.</p>

            <h3 style={{ marginBottom: '1rem' }}>Common Utility Rules</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              <li><strong>Borders:</strong> <code>.border</code> (adds gray border), <code>.border-primary</code> (colors it), <code>.border-3</code> (thick border). Use <code>.border-0</code> to remove border.</li>
              <li><strong>Rounded Corners:</strong> <code>.rounded</code>, <code>.rounded-3</code> (medium round), <code>.rounded-circle</code> (oval circle), <code>.rounded-pill</code> (oval capsule shape).</li>
              <li><strong>Width/Height:</strong> <code>.w-25</code>, <code>.w-50</code>, <code>.w-75</code>, <code>.w-100</code> to set fixed widths by percentages.</li>
              <li><strong>Shadows:</strong> <code>.shadow-none</code>, <code>.shadow-sm</code>, <code>.shadow</code>, <code>.shadow-lg</code> (adds varying depths of box-shadows).</li>
            </ul>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(utilitiesCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('buttons_alerts')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'buttons_alerts' && (
        <Section key="buttons_alerts" id="buttons_alerts" eyebrow="UI Elements" title="Buttons, Alerts & Badges">
          <div className="panel">
            <p>UI components form the core building blocks of web applications. Bootstrap style libraries cover buttons, feedback alerts, and data badges natively.</p>

            <h3 style={{ marginBottom: '1rem' }}>Bootstrap Buttons</h3>
            <p>Base class is <code>.btn</code>, combined with color identifiers like <code>.btn-primary</code> or <code>.btn-outline-danger</code>.</p>
            
            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Bootstrap Alerts</h3>
            <p>Containers that provide feedback messages to the user. Base class is <code>.alert</code>, coupled with <code>.alert-info</code>, <code>.alert-success</code>, etc.</p>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Badges</h3>
            <p>Used to represent labels, tags, or counters inside other elements. Format: <code>.badge bg-secondary</code>.</p>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(buttonsAlertsCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Interactive Lab" title="Bootstrap 5.3 Live Sandbox">
          <p>Experiment with Bootstrap layout sizers, margins, and typography styling classes. Bootstrap CDNs are pre-linked!</p>
          <LiveEditor initialHtml={playgroundStarterHtml} initialCss="/* Add custom styles here if needed */" includeBootstrap={true} />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Building a Profile Card">
          <div className="panel">
            <p><strong>Goal:</strong> Construct a professional profile badge using Bootstrap 5 utility classes, cards, margins, circular borders, and action button layouts.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">profile_card.html</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="preview-pane" style={{ background: '#f8fafc', padding: '2rem', display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                  <div dangerouslySetInnerHTML={{ __html: miniProjectHtml }} style={{ width: '100%', overflowY: 'auto' }} />
                </div>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(miniProjectHtml, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '350px', overflowY: 'auto' }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Continue to Quiz (+20 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutorLocal("How can I adjust border color, shadows, and button outline classes in this profile project?")}>Ask AI Help</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Knowledge Check" title="Day 10 Knowledge Check">
          <p>Complete this quick assessment to evaluate your understanding of Bootstrap core foundations and utilities!</p>
          <Quiz questions={quizQuestions} />
        </Section>
      )}
    </AnimatePresence>
  );
}
