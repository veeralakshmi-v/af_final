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
  const [simulatedWidth, setSimulatedWidth] = useState(1024);

  // Keyframes State
  const [selectedKeyframe, setSelectedKeyframe] = useState('bounce');
  const [animDuration, setAnimDuration] = useState(2);
  const [animIteration, setAnimIteration] = useState('infinite');

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

      {(activeTab === 'keyframes' || activeTab === 'animations') && (
        <Section key="keyframes" id="keyframes" eyebrow="Keyframes" title="CSS @keyframes Animations">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #312e81)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #4338ca' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🎬 Multi-Step CSS Animation with `@keyframes`</h3>
              <p style={{ color: '#c7d2fe', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                While transitions only animate between 2 states (Start and End), <strong><code>@keyframes</code> animations</strong> allow you to control intermediate steps (0%, 25%, 50%, 75%, 100%) for complex loading spinners, pulse effects, and loops!
              </p>
            </div>

            {/* SECTION 1: KEYFRAME PROPERTIES */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Key Animation Sub-Properties</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #6366f1', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>@keyframes</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Defines style changes at specific timeline percentages (0% to 100%).</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #8b5cf6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>animation-name</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Links an HTML element to your custom `@keyframes` rule identifier.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #ec4899', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>animation-iteration-count</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Defines repetition cycles (e.g. <code>1</code>, <code>5</code>, or <code>infinite</code>).</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>animation-direction</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Sets loop direction: <code>normal</code>, <code>reverse</code>, or <code>alternate</code>.</p>
              </div>
            </div>

            {/* SECTION 2: SYNTAX */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Syntax Example</h3>
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(animationCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            {/* SECTION 3: INTERACTIVE KEYFRAME SIMULATOR */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive `@keyframes` Animation Playground</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Select an animation preset, adjust duration, and toggle iteration count to watch Framer Motion render keyframe effects live!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.6rem' }}>
                    Keyframe Preset: <span style={{ color: '#6366f1' }}>{selectedKeyframe}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['bounce', 'spin', 'pulse', 'glow', 'flip'].map(preset => (
                      <button
                        key={preset}
                        onClick={() => setSelectedKeyframe(preset)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: selectedKeyframe === preset ? '2px solid #6366f1' : '1px solid #cbd5e1',
                          background: selectedKeyframe === preset ? '#6366f1' : 'white',
                          color: selectedKeyframe === preset ? 'white' : '#1e293b'
                        }}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.6rem' }}>
                    animation-duration: <span style={{ color: '#8b5cf6' }}>{animDuration}s</span>
                  </label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="5" 
                    step="0.5" 
                    value={animDuration} 
                    onChange={(e) => setAnimDuration(Number(e.target.value))} 
                    style={{ width: '100%' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.6rem' }}>
                    iteration-count: <span style={{ color: '#ec4899' }}>{animIteration}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {['1', '3', 'infinite'].map(count => (
                      <button
                        key={count}
                        onClick={() => setAnimIteration(count)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: animIteration === count ? '2px solid #ec4899' : '1px solid #cbd5e1',
                          background: animIteration === count ? '#ec4899' : 'white',
                          color: animIteration === count ? 'white' : '#1e293b'
                        }}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Animation Live Canvas */}
            <div style={{ background: '#0f172a', padding: '3rem 2rem', borderRadius: '14px', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.div
                key={`${selectedKeyframe}-${animDuration}-${animIteration}`}
                animate={
                  selectedKeyframe === 'bounce' 
                    ? { y: [0, -40, 0] }
                    : selectedKeyframe === 'spin'
                    ? { rotate: [0, 360] }
                    : selectedKeyframe === 'pulse'
                    ? { scale: [1, 1.25, 1] }
                    : selectedKeyframe === 'glow'
                    ? { boxShadow: ['0 0 0px #6366f1', '0 0 35px #6366f1', '0 0 0px #6366f1'] }
                    : { rotateY: [0, 180, 0] }
                }
                transition={{
                  duration: animDuration,
                  repeat: animIteration === 'infinite' ? Infinity : Number(animIteration) - 1,
                  ease: 'easeInOut'
                }}
                style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)'
                }}
              >
                ✨ {selectedKeyframe.toUpperCase()}
                <span style={{ fontSize: '0.7rem', fontWeight: 400, marginTop: '4px', opacity: 0.8 }}>{animDuration}s {animIteration}</span>
              </motion.div>
            </div>

            {/* Generated CSS Code */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Active Keyframe CSS Rule</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
`.animated-box {
  animation-name: ${selectedKeyframe}Anim;
  animation-duration: ${animDuration}s;
  animation-iteration-count: ${animIteration};
  animation-timing-function: ease-in-out;
}

@keyframes ${selectedKeyframe}Anim {
${selectedKeyframe === 'bounce' 
  ? '  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-40px); }'
  : selectedKeyframe === 'spin'
  ? '  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }'
  : selectedKeyframe === 'pulse'
  ? '  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.25); }'
  : selectedKeyframe === 'glow'
  ? '  0%, 100% { box-shadow: 0 0 0px #6366f1; }\n  50% { box-shadow: 0 0 35px #6366f1; }'
  : '  0%, 100% { transform: rotateY(0deg); }\n  50% { transform: rotateY(180deg); }'}
}`, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('media_queries')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'media_queries' && (
        <Section key="media_queries" id="media_queries" eyebrow="Responsive Design" title="CSS Media Queries & Breakpoints">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #1e40af' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📱 Responsive Web Design with `@media`</h3>
              <p style={{ color: '#bfdbfe', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                Media queries allow your website to automatically adapt its styles depending on the user's device screen width, orientation, resolution, or system theme settings!
              </p>
            </div>

            {/* SECTION 1: BREAKPOINT CHEAT SHEET */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>1. Standard Industry Breakpoints</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #ef4444', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>📱 Mobile Devices</h4>
                <code style={{ background: '#fee2e2', color: '#991b1b', padding: '3px 8px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>max-width: 480px</code>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.6rem' }}>Single column layouts, larger tap targets, hidden sidebars.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #f59e0b', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>📱 Tablets & iPads</h4>
                <code style={{ background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>min-width: 481px to 768px</code>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.6rem' }}>2-column grids, collapsible navigation menus.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>💻 Laptops & Notebooks</h4>
                <code style={{ background: '#d1fae5', color: '#065f46', padding: '3px 8px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>min-width: 769px to 1024px</code>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.6rem' }}>3-column layouts, expanded sidebars, hover animations.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #3b82f6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>🖥️ Desktops & Monitors</h4>
                <code style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 8px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>min-width: 1025px+</code>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.6rem' }}>4-column container grids, fixed headers, max-width centering.</p>
              </div>

            </div>

            {/* SECTION 2: SYNTAX EXAMPLES */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. `@media` Syntax & Features</h3>
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(mediaQueryCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            {/* SECTION 3: INTERACTIVE SCREEN RESIZER SIMULATOR */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive Screen Resizer Simulator</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Drag the viewport width slider or click a preset below to see how the layout box changes state live based on `@media` rules!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                    Simulated Screen Width: <span style={{ color: '#2563eb', fontSize: '1.1rem' }}>{simulatedWidth}px</span>
                    <span style={{ marginLeft: '10px', fontSize: '0.82rem', color: '#64748b', fontWeight: 400 }}>
                      ({simulatedWidth <= 480 ? '📱 Mobile View' : simulatedWidth <= 768 ? '📱 Tablet View' : simulatedWidth <= 1024 ? '💻 Laptop View' : '🖥️ Desktop View'})
                    </span>
                  </label>

                  {/* Preset Buttons */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {[
                      { label: '📱 Mobile (375px)', val: 375 },
                      { label: '📱 Tablet (768px)', val: 768 },
                      { label: '💻 Laptop (992px)', val: 992 },
                      { label: '🖥️ Desktop (1280px)', val: 1280 }
                    ].map(btn => (
                      <button
                        key={btn.val}
                        onClick={() => setSimulatedWidth(btn.val)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: simulatedWidth === btn.val ? '2px solid #2563eb' : '1px solid #cbd5e1',
                          background: simulatedWidth === btn.val ? '#2563eb' : 'white',
                          color: simulatedWidth === btn.val ? 'white' : '#1e293b'
                        }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <input 
                  type="range" 
                  min="320" 
                  max="1400" 
                  value={simulatedWidth} 
                  onChange={(e) => setSimulatedWidth(Number(e.target.value))} 
                  style={{ width: '100%' }} 
                />

              </div>
            </div>

            {/* Dynamic Viewport Canvas */}
            <div style={{ background: '#0f172a', padding: '2rem 1.5rem', borderRadius: '14px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem', width: '100%', textAlign: 'left' }}>
                Interactive Simulated Container Boundary ({simulatedWidth}px width container)
              </div>

              <motion.div
                layout
                style={{
                  width: `${Math.min(100, (simulatedWidth / 1400) * 100)}%`,
                  maxWidth: '100%',
                  background: simulatedWidth <= 480 ? '#ef4444' : simulatedWidth <= 768 ? '#f59e0b' : simulatedWidth <= 1024 ? '#10b981' : '#3b82f6',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                    {simulatedWidth <= 480 ? '📱 Mobile Layout' : simulatedWidth <= 768 ? '📱 Tablet Layout' : simulatedWidth <= 1024 ? '💻 Laptop Layout' : '🖥️ Desktop Layout'}
                  </h4>
                  <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                    {simulatedWidth}px
                  </span>
                </div>

                {/* Simulated Grid Cards inside */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: simulatedWidth <= 480 ? '1fr' : simulatedWidth <= 768 ? '1fr 1fr' : simulatedWidth <= 1024 ? '1fr 1fr 1fr' : 'repeat(4, 1fr)', 
                  gap: '10px' 
                }}>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem' }}>Card 1</div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem' }}>Card 2</div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem' }}>Card 3</div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem' }}>Card 4</div>
                </div>
              </motion.div>
            </div>

            {/* Code */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Active Media Query Rule Applied</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
simulatedWidth <= 480 ? `/* 📱 Mobile Rule (<= 480px) */
@media screen and (max-width: 480px) {
  .app-grid {
    grid-template-columns: 1fr; /* Single Column */
    background-color: #ef4444;
  }
}` : simulatedWidth <= 768 ? `/* 📱 Tablet Rule (481px to 768px) */
@media screen and (min-width: 481px) and (max-width: 768px) {
  .app-grid {
    grid-template-columns: 1fr 1fr; /* 2 Columns */
    background-color: #f59e0b;
  }
}` : simulatedWidth <= 1024 ? `/* 💻 Laptop Rule (769px to 1024px) */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .app-grid {
    grid-template-columns: 1fr 1fr 1fr; /* 3 Columns */
    background-color: #10b981;
  }
}` : `/* 🖥️ Desktop Rule (> 1025px) */
@media screen and (min-width: 1025px) {
  .app-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 Columns */
    background-color: #3b82f6;
  }
}`, Prism.languages.css, 'css') }}></pre>
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
