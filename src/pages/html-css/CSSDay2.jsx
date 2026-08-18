import React from 'react';
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

export default function CSSDay2({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module4', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const boxModelCode = `.box {
  width: 300px;
  height: 200px;
  padding: 15px;
  border: 5px solid grey;
  margin: 30px;
  
  /* Modern CSS prefers border-box */
  box-sizing: border-box; 
}`;

  const staticCode = `.static-box {
  position: static; /* default position */
  background-color: lightgreen;
  
  /* These won't work on static elements: */
  top: 50px;
  left: 100px;
}`;

  const relativeAbsoluteCode = `.parent {
  position: relative; /* Becomes the reference point */
  width: 500px;
  height: 200px;
  border: 3px solid red;
}

.child {
  position: absolute;
  top: 20px;
  right: 20px; /* Positioned relative to .parent */
  border: 3px solid blue;
}`;

  const floatCode = `.box1 {
  float: left;
  width: 150px;
}

.box2 {
  float: right;
  width: 150px;
}

.clearfix {
  clear: both; /* Clears floating elements */
}`;

  const overflowCode = `.container {
  width: 200px;
  height: 100px;
  overflow: auto; /* scroll, hidden, visible, auto */
}`;

  const day4QuizQuestions = [
    {
      question: "Which of the following is NOT part of the CSS Box Model?",
      options: [
        { id: 'a', text: 'Margin', correct: false },
        { id: 'b', text: 'Padding', correct: false },
        { id: 'c', text: 'Spacing', correct: true },
        { id: 'd', text: 'Border', correct: false },
      ]
    },
    {
      question: "Which box-sizing property includes padding and border in the element's total width?",
      options: [
        { id: 'a', text: 'content-box', correct: false },
        { id: 'b', text: 'border-box', correct: true },
        { id: 'c', text: 'padding-box', correct: false },
        { id: 'd', text: 'margin-box', correct: false },
      ]
    },
    {
      question: "Which position property value is the default for all HTML elements?",
      options: [
        { id: 'a', text: 'relative', correct: false },
        { id: 'b', text: 'fixed', correct: false },
        { id: 'c', text: 'absolute', correct: false },
        { id: 'd', text: 'static', correct: true },
      ]
    },
    {
      question: "An element with position: absolute; is positioned relative to what?",
      options: [
        { id: 'a', text: 'The viewport', correct: false },
        { id: 'b', text: 'The nearest positioned ancestor', correct: true },
        { id: 'c', text: 'The previous sibling', correct: false },
        { id: 'd', text: 'Its normal position', correct: false },
      ]
    },
    {
      question: "Which property is used to clear floated elements?",
      options: [
        { id: 'a', text: 'clear', correct: true },
        { id: 'b', text: 'display', correct: false },
        { id: 'c', text: 'float-clear', correct: false },
        { id: 'd', text: 'clearfix', correct: false },
      ]
    },
    {
      question: "Which overflow value adds scrollbars only when necessary?",
      options: [
        { id: 'a', text: 'scroll', correct: false },
        { id: 'b', text: 'hidden', correct: false },
        { id: 'c', text: 'visible', correct: false },
        { id: 'd', text: 'auto', correct: true },
      ]
    }
  ];

  const projectCodeDay4 = `<!DOCTYPE html>
<html>
<head>
<style>
  /* Base Reset & Box Sizing */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f1f5f9;
  }
  
  /* 1. Sticky Navigation (Position Property) */
  .navbar {
    position: sticky;
    top: 0;
    background-color: #1e293b;
    color: white;
    padding: 15px 20px;
    z-index: 100; /* Stays above other elements */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  /* 2. Container (Box Model) */
  .container {
    width: 80%;
    max-width: 800px;
    margin: 40px auto; /* Centering with margin */
    padding: 20px;
    background-color: white;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    
    /* 3. Overflow Property */
    height: 400px;
    overflow-y: scroll; /* Adds a scrollbar if content is too long */
  }
  
  /* 4. Relative/Absolute Positioning */
  .image-card {
    position: relative; /* Parent is relative */
    width: 100%;
    height: 250px;
    background-color: #94a3b8;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden; /* Clips the absolute child if it goes outside */
  }
  
  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .caption {
    position: absolute; /* Child is absolute */
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 15px;
    text-align: center;
    font-weight: bold;
  }
  
  /* 5. Float Property */
  .float-box {
    float: left;
    width: 150px;
    height: 150px;
    background-color: #3b82f6;
    color: white;
    padding: 20px;
    margin-right: 20px;
    border-radius: 8px;
  }
  
  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }
  
  /* Responsive Design */
  @media (max-width: 600px) {
    .container {
      width: 95%;
      margin: 20px auto;
      padding: 15px;
    }
    
    .float-box {
      float: none;
      width: 100%;
      height: auto;
      margin-right: 0;
      margin-bottom: 15px;
    }
    
    .image-card {
      height: 180px;
    }
  }
  
</style>
</head>
<body>

  <!-- Sticky Navbar -->
  <div class="navbar">
    <h2>My Photography Portfolio</h2>
  </div>

  <!-- Main Container with Scroll -->
  <div class="container">
    
    <h2>Latest Shot</h2>
    <p style="margin-bottom: 20px; color: #64748b;">Scroll down to see the float layout below!</p>
    
    <!-- Image Card with Absolute Caption -->
    <div class="image-card">
      <img src="https://images.unsplash.com/photo-1506744626753-eba7bc3613bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Beautiful landscape">
      <div class="caption">Majestic Mountains - Captured 2023</div>
    </div>
    
    <div style="height: 50px;"></div>
    
    <!-- Float Layout -->
    <div class="clearfix" style="margin-top: 30px;">
      <div class="float-box">
        <h3>About Me</h3>
        <p style="font-size: 0.8rem; margin-top: 10px;">I am a nature photographer.</p>
      </div>
      <p>This text flows around the blue floating box! Notice how the <strong>float</strong> property pushes the blue box to the left, allowing the rest of the text content to naturally wrap around its right side.</p>
      <p style="margin-top: 10px;">We also use a <strong>clearfix</strong> hack on the parent container to ensure it doesn't collapse!</p>
    </div>
    
    <div style="height: 100px;"></div>
    <p style="text-align: center; color: #94a3b8;">End of scrollable content.</p>
    
  </div>

</body>
</html>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'boxmodel' && (
        <Section key="boxmodel" id="boxmodel" eyebrow="Fundamentals" title="Introduction to Box Model">
          <div className="panel">
            <p>Every HTML element is essentially a box. The <strong>CSS Box Model</strong> wraps around every HTML element and consists of: Margins, Borders, Padding, and the actual Content.</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Content:</strong> The content of the box, where text and images appear.</li>
              <li><strong>Padding:</strong> Clears an area around the content. It is transparent.</li>
              <li><strong>Border:</strong> A border that goes around the padding and content.</li>
              <li><strong>Margin:</strong> Clears an area outside the border. It is transparent.</li>
            </ul>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Content-Box vs Border-Box</h3>
            <p>By default (<code>box-sizing: content-box</code>), adding padding or borders increases the total size of the element. In modern CSS, we prefer <code>box-sizing: border-box</code> which includes the padding and borders inside the defined width.</p>
            
            {/* Animated Box Model Diagram */}
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', background: '#f8fafc', borderRadius: '8px', margin: '2rem 0' }}>
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 4, repeat: Infinity }}
                style={{ background: '#fef08a', border: '2px dashed #ca8a04', padding: '30px', position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.8rem', color: '#ca8a04', fontWeight: 'bold' }}>Margin</div>
                
                <div style={{ background: '#fef9c3', border: '5px solid #000', padding: '30px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.8rem', color: '#000', fontWeight: 'bold' }}>Border</div>
                  
                  <div style={{ background: '#bbf7d0', border: '2px dashed #16a34a', padding: '30px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.8rem', color: '#16a34a', fontWeight: 'bold' }}>Padding</div>
                    
                    <div style={{ background: '#bfdbfe', border: '1px solid #2563eb', padding: '30px', minWidth: '150px', textAlign: 'center', fontWeight: 'bold', color: '#1e3a8a' }}>
                      Content
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="code-example-box">
              <div className="code-header">Box Model Example</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(boxModelCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('position')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'position' && (
        <Section key="position" id="position" eyebrow="Layout" title="Position Property">
          <div className="panel">
            <p>The <code>position</code> property specifies the type of positioning method used for an element.</p>
            
            {/* Animated Position Diagram */}
            <div style={{ padding: '2rem', display: 'flex', gap: '4rem', justifyContent: 'center', flexWrap: 'wrap', background: '#f8fafc', borderRadius: '8px', margin: '2rem 0' }}>
              
              {/* Relative vs Absolute Box */}
              <div style={{ position: 'relative', width: '250px', height: '250px', border: '2px dashed #ef4444', borderRadius: '8px', background: 'white' }}>
                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold' }}>Relative Parent</div>
                <motion.div 
                  animate={{ x: [0, 150, 150, 0, 0], y: [0, 0, 150, 150, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: 'absolute', top: '10px', left: '10px', width: '60px', height: '60px', background: '#3b82f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                >
                  Absolute Child
                </motion.div>
              </div>

            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Static</h3>
            <p>HTML elements are positioned static by default. They are not affected by top, bottom, left, and right properties.</p>
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane"><pre dangerouslySetInnerHTML={{ __html: Prism.highlight(staticCode, Prism.languages.css, 'css') }}></pre></div>
            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Relative & Absolute</h3>
            <p><strong>Relative</strong> elements are positioned relative to their normal position. <strong>Absolute</strong> elements are removed from normal flow and positioned relative to their nearest positioned ancestor (usually a relative parent).</p>
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane"><pre dangerouslySetInnerHTML={{ __html: Prism.highlight(relativeAbsoluteCode, Prism.languages.css, 'css') }}></pre></div>
            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Fixed & Sticky</h3>
            <p><strong>Fixed</strong> elements stay in the exact same place even when the page is scrolled (relative to viewport). <strong>Sticky</strong> toggles between relative and fixed based on scroll position (like a sticky header).</p>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('zindex')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'zindex' && (
        <Section key="zindex" id="zindex" eyebrow="Depth" title="Z-index Property">
          <div className="panel">
            <p>When elements are positioned, they can overlap other elements. The <code>z-index</code> property specifies the stack order of an element (which element should be placed in front of, or behind, the others).</p>
            <p>An element with a greater stack order is always in front of an element with a lower stack order.</p>
            
            {/* Z-Index Illustration */}
            <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center', background: '#f8fafc', borderRadius: '8px', margin: '2rem 0', perspective: '1000px' }}>
              <div style={{ position: 'relative', width: '200px', height: '200px', transformStyle: 'preserve-3d', transform: 'rotateX(50deg) rotateZ(-45deg)' }}>
                
                <motion.div 
                  animate={{ translateZ: [0, 40, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(59, 130, 246, 0.9)', border: '3px solid #2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', zIndex: 1, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}
                >
                  z-index: 1
                </motion.div>

                <motion.div 
                  animate={{ translateZ: [0, 80, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(16, 185, 129, 0.9)', border: '3px solid #059669', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', zIndex: 2, top: '-30px', left: '-30px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}
                >
                  z-index: 2
                </motion.div>

                <motion.div 
                  animate={{ translateZ: [0, 120, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(239, 68, 68, 0.9)', border: '3px solid #dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', zIndex: 3, top: '-60px', left: '-60px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}
                >
                  z-index: 3
                </motion.div>

              </div>
            </div>

            <p style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Note: z-index only works on positioned elements (relative, absolute, fixed, or sticky).</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('float')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'float' && (
        <Section key="float" id="float" eyebrow="Layout" title="Float & Clear">
          <div className="panel">
            <p>The <code>float</code> property is used for positioning and formatting content, e.g. let an image float left to the text in a container.</p>
            <p>The <code>clear</code> property specifies what elements can float beside the cleared element and on which side.</p>
            
            <div className="code-example-box">
              <div className="code-header">Floating Elements</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(floatCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('overflow')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'overflow' && (
        <Section key="overflow" id="overflow" eyebrow="Layout" title="Overflow Property">
          <div className="panel">
            <p>The <code>overflow</code> property controls what happens to content that is too big to fit into an area.</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>visible:</strong> Default. The overflow is not clipped.</li>
              <li><strong>hidden:</strong> The overflow is clipped, and the rest of the content will be invisible.</li>
              <li><strong>scroll:</strong> The overflow is clipped, and a scrollbar is added to see the rest of the content.</li>
              <li><strong>auto:</strong> Similar to scroll, but it adds scrollbars only when necessary.</li>
            </ul>

            {/* Overflow "GIF-like" Animation */}
            <div style={{ padding: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', background: '#f8fafc', borderRadius: '8px', margin: '2rem 0' }}>
              
              {/* Visible */}
              <div style={{ width: '120px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', color: '#64748b' }}>visible</div>
                <div style={{ width: '120px', height: '120px', border: '2px solid #ef4444', overflow: 'visible', position: 'relative', background: 'white' }}>
                  <motion.div 
                    animate={{ y: [0, -100, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', background: '#fecaca', color: '#7f1d1d' }}
                  >
                    This is some long content that will overflow its container. Because it is visible, it breaks out of the red box!
                  </motion.div>
                </div>
              </div>

              {/* Hidden */}
              <div style={{ width: '120px', marginLeft: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', color: '#64748b' }}>hidden</div>
                <div style={{ width: '120px', height: '120px', border: '2px solid #3b82f6', overflow: 'hidden', position: 'relative', background: 'white' }}>
                  <motion.div 
                    animate={{ y: [0, -100, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', background: '#bfdbfe', color: '#1e3a8a' }}
                  >
                    This is some long content that will overflow its container. Because it is hidden, it simply disappears!
                  </motion.div>
                </div>
              </div>

              {/* Scroll */}
              <div style={{ width: '120px', marginLeft: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', color: '#64748b' }}>scroll</div>
                <div style={{ width: '120px', height: '120px', border: '2px solid #10b981', overflow: 'scroll', position: 'relative', background: 'white' }}>
                  <motion.div 
                    animate={{ y: [0, -100, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', background: '#a7f3d0', color: '#064e3b' }}
                  >
                    This is some long content that will overflow its container. Scrollbars are added to let you see the rest!
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="code-example-box">
              <div className="code-header">Overflow CSS</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(overflowCode, Prism.languages.css, 'css') }}></pre>
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
          <p>Experiment with Box Model, Positioning, and Overflows in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Photography Portfolio">
          <p>Time to test your skills by combining Position, Overflows, Floats, and the Box Model!</p>
          <div className="panel">
            <p><strong>Goal:</strong> Build a sticky navigation header that stays at the top of the page when scrolling, use absolute positioning to create an image overlay caption, and use a float layout for an author bio block!</p>
            
            <div className="code-example-box">
              <div className="code-header">portfolio_layout.html</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="preview-pane" style={{ background: '#f9fafb', padding: '0', display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                  <div dangerouslySetInnerHTML={{ __html: projectCodeDay4 }} style={{ width: '100%', height: '500px', overflowY: 'hidden', border: '1px solid #e5e7eb', borderRadius: '8px', position: 'relative' }} />
                </div>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCodeDay4, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '400px', overflowY: 'auto' }}></pre>
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
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 4 Knowledge Check">
          <p>Let's see what you've learned about the Box Model and CSS positioning properties!</p>
          <Quiz questions={day4QuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
