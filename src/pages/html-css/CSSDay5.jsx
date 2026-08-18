import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveEditor from '../../components/LiveEditor';
import Quiz from '../../components/Quiz';
import Prism from 'prismjs';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function CSSDay5({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && nextSectionId === 'quiz') {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module7', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const absoluteUnitsCode = `.box-px { width: 100px; }
.box-cm { width: 5cm; }
.box-in { width: 2in; }
.box-pt { font-size: 24pt; }`;

  const relativeUnitsCode = `.container { font-size: 16px; }

/* em is relative to parent's font-size (2 * 16px = 32px) */
.box-em { font-size: 2em; }

/* rem is relative to root html font-size */
.box-rem { margin-bottom: 1.5rem; }

/* vh/vw are relative to the viewport dimensions */
.hero-section {
  width: 100vw;
  height: 100vh;
}

/* % is relative to the parent element's size */
.half-width { width: 50%; }`;

  const pseudoClassCode = `/* Selects the element when hovered */
button:hover {
  background-color: blue;
}

/* Selects an input when focused */
input:focus {
  border-color: green;
}

/* Selects every odd child */
li:nth-child(odd) {
  background-color: #f1f5f9;
}

/* Selects the first child */
li:first-child {
  font-weight: bold;
}`;

  const pseudoElementCode = `/* Inserts content BEFORE the element's actual content */
.quote::before {
  content: "❝ ";
  color: #3b82f6;
  font-size: 2rem;
}

/* Inserts content AFTER the element's actual content */
.quote::after {
  content: " ❞";
  color: #3b82f6;
  font-size: 2rem;
}

/* Styles the first letter of a paragraph */
p::first-letter {
  font-size: 200%;
  font-weight: bold;
}

/* Styles selected text */
::selection {
  background: yellow;
  color: black;
}`;

  const day7QuizQuestions = [
    {
      question: "Which of the following is an absolute CSS unit?",
      options: [
        { id: 'a', text: 'em', correct: false },
        { id: 'b', text: 'rem', correct: false },
        { id: 'c', text: 'px', correct: true },
        { id: 'd', text: 'vw', correct: false },
      ]
    },
    {
      question: "What is the 'rem' unit relative to?",
      options: [
        { id: 'a', text: 'The parent element', correct: false },
        { id: 'b', text: 'The root element (<html>)', correct: true },
        { id: 'c', text: 'The viewport width', correct: false },
        { id: 'd', text: 'The screen resolution', correct: false },
      ]
    },
    {
      question: "Which unit represents 1% of the viewport height?",
      options: [
        { id: 'a', text: 'vw', correct: false },
        { id: 'b', text: 'vh', correct: true },
        { id: 'c', text: 'vmin', correct: false },
        { id: 'd', text: 'vmax', correct: false },
      ]
    },
    {
      question: "Which pseudo-class selects an element when the user's mouse is over it?",
      options: [
        { id: 'a', text: ':active', correct: false },
        { id: 'b', text: ':hover', correct: true },
        { id: 'c', text: ':focus', correct: false },
        { id: 'd', text: ':visited', correct: false },
      ]
    },
    {
      question: "Which pseudo-element is used to insert content before an element's content?",
      options: [
        { id: 'a', text: '::first', correct: false },
        { id: 'b', text: ':hover', correct: false },
        { id: 'c', text: '::before', correct: true },
        { id: 'd', text: '::after', correct: false },
      ]
    },
    {
      question: "Which pseudo-element allows you to style the user-selected text?",
      options: [
        { id: 'a', text: '::highlight', correct: false },
        { id: 'b', text: '::selected', correct: false },
        { id: 'c', text: '::selection', correct: true },
        { id: 'd', text: '::active', correct: false },
      ]
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'absolute_units' && (
        <Section key="absolute_units" id="absolute_units" eyebrow="Measurement" title="Absolute Units">
          <div className="panel">
            <p>CSS provides absolute units that have fixed values. They are not affected by the screen size or parent elements. They are mostly used when the output medium is known (like print).</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>px (Pixels)</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>The smallest unit on a digital screen. 1px = 1/96th of 1in.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>cm / mm / in</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Centimeters, millimeters, and inches. Best for physical print media.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>pt (Points)</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Typography unit. 1pt = 1/72 of an inch.</p>
              </div>
            </div>

            <div className="code-example-box">
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(absoluteUnitsCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>
            
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('relative_units')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'relative_units' && (
        <Section key="relative_units" id="relative_units" eyebrow="Responsive Measurement" title="Relative Units">
          <div className="panel">
            <p>Relative units are responsive length units that change according to another length property, like the parent element's font size or the viewport size.</p>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Key Relative Units</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', color: 'white' }}>
                <strong style={{ color: '#38bdf8', fontSize: '1.2rem' }}>em</strong>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '5px' }}>Relative to the <strong style={{ color: 'white' }}>font-size of the element</strong> (or its parent). If parent font-size is 16px, 2em = 32px.</p>
              </div>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', color: 'white' }}>
                <strong style={{ color: '#38bdf8', fontSize: '1.2rem' }}>rem (Root em)</strong>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '5px' }}>Relative to the font-size of the <strong style={{ color: 'white' }}>root element (&lt;html&gt;)</strong>. Very consistent and highly recommended for font sizing!</p>
              </div>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', color: 'white' }}>
                <strong style={{ color: '#38bdf8', fontSize: '1.2rem' }}>% (Percentage)</strong>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '5px' }}>Relative to the size of the <strong style={{ color: 'white' }}>parent element</strong>. E.g., width: 50% takes up half its parent's width.</p>
              </div>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', color: 'white' }}>
                <strong style={{ color: '#38bdf8', fontSize: '1.2rem' }}>vw & vh</strong>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '5px' }}><strong style={{ color: 'white' }}>Viewport Width</strong> and <strong style={{ color: 'white' }}>Viewport Height</strong>. 1vw is 1% of the screen's width. 100vh fills the entire height of the screen!</p>
              </div>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', color: 'white' }}>
                <strong style={{ color: '#38bdf8', fontSize: '1.2rem' }}>vmin & vmax</strong>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '5px' }}>Relative to the viewport's smaller (vmin) or larger (vmax) dimension.</p>
              </div>
            </div>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(relativeUnitsCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('pseudo_classes')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'pseudo_classes' && (
        <Section key="pseudo_classes" id="pseudo_classes" eyebrow="State Selectors" title="Pseudo Classes">
          <div className="panel">
            <p>A pseudo-class is used to define a special state of an element. For example, it can be used to style an element when a user mouses over it, or style visited/unvisited links differently.</p>
            
            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '2rem', marginTop: '1.5rem' }}>
              <p style={{ margin: 0, color: '#92400e', fontWeight: 'bold' }}>Syntax: <code>selector:pseudo-class {'{'} property: value; {'}'}</code></p>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Common Pseudo Classes</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-secondary)' }}>
              <li><strong>:hover</strong> - Triggers when the mouse pointer is over the element.</li>
              <li><strong>:focus</strong> - Triggers when the element (like an input) is clicked or tabbed to.</li>
              <li><strong>:active</strong> - Triggers at the exact moment the element is being clicked down.</li>
              <li><strong>:visited</strong> - Styles links that the user has already visited.</li>
              <li><strong>:nth-child(n)</strong> - Selects elements based on their position in a group of siblings (e.g., <code>odd</code>, <code>even</code>, <code>2</code>).</li>
            </ul>

            <div className="code-example-box" style={{ marginTop: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(pseudoClassCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('pseudo_elements')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'pseudo_elements' && (
        <Section key="pseudo_elements" id="pseudo_elements" eyebrow="Virtual Selectors" title="Pseudo Elements">
          <div className="panel">
            <p>A pseudo-element is used to style specific parts of an element, or to virtually insert content before or after an element without modifying the HTML.</p>
            
            <div style={{ padding: '1.5rem', background: '#e0f2fe', borderRadius: '8px', borderLeft: '4px solid #38bdf8', marginBottom: '2rem', marginTop: '1.5rem' }}>
              <p style={{ margin: 0, color: '#0c4a6e', fontWeight: 'bold' }}>Syntax: <code>selector::pseudo-element {'{'} property: value; {'}'}</code></p>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Common Pseudo Elements</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-secondary)' }}>
              <li><strong>::before</strong> - Inserts content before the element's actual content. (Requires the <code>content</code> property).</li>
              <li><strong>::after</strong> - Inserts content after the element's actual content. (Requires the <code>content</code> property).</li>
              <li><strong>::first-letter</strong> - Styles only the first letter of a text block (great for drop caps!).</li>
              <li><strong>::first-line</strong> - Styles only the first visual line of a text block.</li>
              <li><strong>::selection</strong> - Changes the styling of text when a user highlights/selects it with their mouse.</li>
            </ul>

            <div className="code-example-box" style={{ marginTop: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(pseudoElementCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="Units & Pseudo Playground">
          <p>Experiment with `rem`, `vw`, `:hover`, and `::before` in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 7 Knowledge Check">
          <p>Let's see what you've learned about CSS Units and Pseudo Selectors!</p>
          <Quiz questions={day7QuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
