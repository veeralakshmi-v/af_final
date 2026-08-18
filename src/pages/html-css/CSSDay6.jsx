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

export default function CSSDay6({ activeTab, onNavigate }) {
  const [hoveredBox, setHoveredBox] = useState(null);

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module8', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const transitionCode = `.box {
  width: 100px;
  height: 100px;
  background-color: blue;
  
  /* Transition Properties */
  transition-property: width, background-color;
  transition-duration: 1s;
  transition-delay: 0.5s;
  transition-timing-function: ease-in-out;
  
  /* Shorthand: */
  /* transition: background-color 2s ease 0.5s; */
}

/* Hover State */
.box:hover {
  width: 200px;
  background-color: red;
}`;

  const transformCode = `.translate-box {
  transform: translate(40px, -30px);
}

.rotate-box {
  transform: rotate(45deg);
}

.scale-box {
  transform: scale(1.5, 1.5);
}

.skew-box {
  transform: skew(20deg, 10deg);
}`;

  const animationCode = `.animated-box {
  width: 100px;
  height: 100px;
  background-color: red;
  
  /* Bind the animation */
  animation-name: colorChange;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* Define the Keyframes */
@keyframes colorChange {
  0%   { background-color: red; }
  25%  { background-color: yellow; }
  50%  { background-color: blue; }
  100% { background-color: green; }
}`;

  const mediaQueryCode = `/* Base styles for all devices */
.container {
  width: 100%;
}

/* Tablet (screens larger than 600px) */
@media screen and (min-width: 600px) and (max-width: 1200px) {
  .container {
    width: 90%;
  }
}

/* Desktop (screens larger than 1200px) */
@media screen and (min-width: 1200px) {
  .container {
    width: 1200px;
    margin: 0 auto;
  }
}

/* Print */
@media print {
  .navigation {
    display: none;
  }
}`;

  const day7QuizQuestions = [
    {
      question: "Which property specifies the name of the CSS property the transition effect is for?",
      options: [
        { id: 'a', text: 'transition-name', correct: false },
        { id: 'b', text: 'transition-effect', correct: false },
        { id: 'c', text: 'transition-property', correct: true },
        { id: 'd', text: 'transition', correct: false },
      ]
    },
    {
      question: "Which CSS property is used to move, rotate, scale, and skew elements?",
      options: [
        { id: 'a', text: 'animate', correct: false },
        { id: 'b', text: 'transform', correct: true },
        { id: 'c', text: 'transition', correct: false },
        { id: 'd', text: 'morph', correct: false },
      ]
    },
    {
      question: "What is the correct syntax for a rotation transform?",
      options: [
        { id: 'a', text: 'transform: rotate(45deg);', correct: true },
        { id: 'b', text: 'transform: rotate=45deg;', correct: false },
        { id: 'c', text: 'rotation: 45deg;', correct: false },
        { id: 'd', text: 'transform-rotate: 45deg;', correct: false },
      ]
    },
    {
      question: "Which rule is used to define an animation sequence?",
      options: [
        { id: 'a', text: '@animation', correct: false },
        { id: 'b', text: '@keyframes', correct: true },
        { id: 'c', text: '@sequence', correct: false },
        { id: 'd', text: '@timeline', correct: false },
      ]
    },
    {
      question: "How do you make an animation run infinitely?",
      options: [
        { id: 'a', text: 'animation-loop: true;', correct: false },
        { id: 'b', text: 'animation-play: infinite;', correct: false },
        { id: 'c', text: 'animation-iteration-count: infinite;', correct: true },
        { id: 'd', text: 'animation-time: forever;', correct: false },
      ]
    },
    {
      question: "Which at-rule is used to apply styles only for screens smaller than 768px?",
      options: [
        { id: 'a', text: '@media screen and (max-width: 768px)', correct: true },
        { id: 'b', text: '@mobile (width < 768px)', correct: false },
        { id: 'c', text: '@media (min-width: 768px)', correct: false },
        { id: 'd', text: '@screen max-768', correct: false },
      ]
    }
  ];

  const projectCodeDay7 = `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1e293b;
    margin: 0;
  }
  
  /* Animated Loading Spinner */
  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid #e2e8f0;
    border-top: 6px solid #3b82f6;
    border-radius: 50%;
    
    /* Apply the animation */
    animation: spin 1s linear infinite;
  }
  
  /* Define the keyframes for spinning */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Animated Pulse Button */
  .btn-pulse {
    margin-left: 40px;
    padding: 15px 30px;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background-color: #10b981;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    /* Transform + Transition on Hover */
    transition: transform 0.3s ease;
    
    /* Continuous Pulse Animation */
    animation: pulse 2s infinite alternate;
  }
  
  .btn-pulse:hover {
    transform: scale(1.1);
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    100% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
  }

</style>
</head>
<body>

  <div class="spinner"></div>
  <button class="btn-pulse">Click Me!</button>

</body>
</html>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'effects_intro' && (
        <Section key="effects_intro" id="effects_intro" eyebrow="Overview" title="Introduction to CSS Effects">
          <div className="panel">
            <p>CSS Visual Effects are styles that make a webpage look dynamic, smooth, and interactive without needing JavaScript!</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem', marginTop: '2rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Transitions</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Smooth change from one state to another (e.g., hover effects).</p>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold' }}>Hover/Click: Usually Yes</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Transforms</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Change the shape, size, or position (Moving, rotating, scaling).</p>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>Hover/Click: No (direct change)</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Animations</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Create movement with multiple steps using keyframes (loaders, loops).</p>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold' }}>Hover/Click: No (runs automatically)</div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('transitions')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'transitions' && (
        <Section key="transitions" id="transitions" eyebrow="Smooth Changes" title="CSS Transitions">
          <div className="panel">
            <p>CSS transitions allow for smooth, animated changes to an element's style properties over a specified duration, rather than immediate, abrupt changes.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(transitionCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Transition Properties</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-secondary)' }}>
              <li><strong>transition-property:</strong> What to animate (e.g., width, background-color, all).</li>
              <li><strong>transition-duration:</strong> How long the animation runs (e.g., 1s, 500ms).</li>
              <li><strong>transition-delay:</strong> Wait before starting (e.g., 0.5s).</li>
              <li><strong>transition-timing-function:</strong> Speed pattern (linear, ease, ease-in, ease-out, ease-in-out).</li>
            </ul>

            <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>Interactive Visual Example</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>Hover over the squares below to see the different timing functions in action!</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#0f172a', padding: '2rem', borderRadius: '8px' }}>
              {['linear', 'ease', 'ease-in', 'ease-out'].map((timing) => (
                <div key={timing} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: 'white', width: '80px', fontSize: '0.9rem' }}>{timing}</span>
                  <div style={{ flex: 1, background: '#1e293b', height: '40px', borderRadius: '4px', position: 'relative' }}>
                    <div 
                      onMouseEnter={() => setHoveredBox(timing)}
                      onMouseLeave={() => setHoveredBox(null)}
                      style={{ 
                        width: hoveredBox === timing ? '100%' : '40px',
                        height: '100%', 
                        background: '#3b82f6', 
                        borderRadius: '4px',
                        transition: `width 2s ${timing}`,
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('transforms')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'transforms' && (
        <Section key="transforms" id="transforms" eyebrow="Shape & Position" title="CSS Transforms">
          <div className="panel">
            <p>The CSS transform property is a powerful tool for manipulating the visual appearance of elements without affecting the document's layout.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(transformCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Visual Examples</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              
              <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ color: 'white', marginBottom: '2rem', fontWeight: 'bold' }}>translate(20px, 20px)</p>
                <div style={{ border: '2px dashed #475569', width: '80px', height: '80px', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', background: '#3b82f6', position: 'absolute', top: 0, left: 0, transform: 'translate(20px, 20px)', opacity: 0.8 }}></div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ color: 'white', marginBottom: '2rem', fontWeight: 'bold' }}>rotate(45deg)</p>
                <div style={{ border: '2px dashed #475569', width: '80px', height: '80px', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', background: '#10b981', position: 'absolute', top: 0, left: 0, transform: 'rotate(45deg)', opacity: 0.8 }}></div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ color: 'white', marginBottom: '2rem', fontWeight: 'bold' }}>scale(1.2)</p>
                <div style={{ border: '2px dashed #475569', width: '80px', height: '80px', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', background: '#f43f5e', position: 'absolute', top: 0, left: 0, transform: 'scale(1.2)', opacity: 0.8 }}></div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ color: 'white', marginBottom: '2rem', fontWeight: 'bold' }}>skew(15deg)</p>
                <div style={{ border: '2px dashed #475569', width: '80px', height: '80px', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', background: '#f59e0b', position: 'absolute', top: 0, left: 0, transform: 'skewX(15deg)', opacity: 0.8 }}></div>
                </div>
              </div>

            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('animations')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'animations' && (
        <Section key="animations" id="animations" eyebrow="Keyframes" title="CSS Animations">
          <div className="panel">
            <p>CSS animations enable the creation of animated effects without requiring JavaScript. They allow elements to gradually change from one style to another over time.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(animationCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Animation Properties</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-secondary)' }}>
              <li><strong>@keyframes:</strong> Defines the sequence of styles (using percentages 0% to 100%).</li>
              <li><strong>animation-name:</strong> Links the element to the @keyframes rule.</li>
              <li><strong>animation-duration:</strong> Time to complete one cycle.</li>
              <li><strong>animation-iteration-count:</strong> Number of times to run (e.g., <code>infinite</code>).</li>
              <li><strong>animation-direction:</strong> Play forwards, backwards, or <code>alternate</code>.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('media_queries')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'media_queries' && (
        <Section key="media_queries" id="media_queries" eyebrow="Responsiveness" title="Media Queries">
          <div className="panel">
            <p>A media query uses the <code>@media</code> rule to apply a block of CSS properties only if a certain condition is true (like screen width).</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(mediaQueryCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Common Media Features</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-secondary)' }}>
              <li><strong>max-width:</strong> Applies styles when the viewport width is <em>less than or equal to</em> the value (Mobile First).</li>
              <li><strong>min-width:</strong> Applies styles when the viewport width is <em>greater than or equal to</em> the value (Desktop First).</li>
              <li><strong>orientation:</strong> Checks if the device is in portrait or landscape mode.</li>
              <li><strong>media-type:</strong> <code>screen</code> (default), <code>print</code>, <code>all</code>.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="CSS Animations Playground">
          <p>Experiment with <code>transition</code>, <code>transform</code>, and <code>@keyframes</code> in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Animated Spinners & Buttons">
          <p>Let's combine Transforms and Animations to build a loading spinner and a pulsing button.</p>
          <div className="panel">
            <p><strong>Goal:</strong> Use <code>@keyframes</code> with <code>transform: rotate</code> to make a spinner loop infinitely. Then use a hover transition on a button to scale it up!</p>
            
            <div className="code-example-box">
              <div className="code-header">animations_project.html</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="preview-pane" style={{ background: '#f1f5f9', padding: '0', display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                  <div dangerouslySetInnerHTML={{ __html: projectCodeDay7 }} style={{ width: '100%', height: '400px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', position: 'relative' }} />
                </div>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCodeDay7, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '400px', overflowY: 'auto' }}></pre>
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
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 7 Knowledge Check">
          <p>Let's see what you've learned about CSS Effects and Media Queries!</p>
          <Quiz questions={day7QuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
