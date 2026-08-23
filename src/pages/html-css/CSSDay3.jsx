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

export default function CSSDay3({ activeTab, onNavigate }) {
  const [demoOrder, setDemoOrder] = React.useState(0);
  const [demoGrow, setDemoGrow] = React.useState(1);
  const [demoShrink, setDemoShrink] = React.useState(0);
  const [demoBasis, setDemoBasis] = React.useState('150px');
  const [demoAlignSelf, setDemoAlignSelf] = React.useState('center');

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module5', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayCode = `/* Display Properties */
.block-element {
  display: block; /* Takes up full width, starts on a new line */
  width: 250px;
}

.inline-element {
  display: inline; /* Width & height do NOT apply */
  background-color: lightgreen;
}

.inline-block-element {
  display: inline-block; /* Inline layout, but respects width & height */
  width: 250px;
  height: 80px;
}`;

  const flexIntroCode = `.container {
  display: flex; /* Makes the box flexible */
  /* Items inside can automatically adjust space, 
     align neatly, move around, and resize! */
}`;

  const flexContainerCode = `.flex-container {
  display: flex;
  
  /* Flex Direction: row | column | row-reverse | column-reverse */
  flex-direction: row; 
  
  /* Flex Wrap: nowrap | wrap | wrap-reverse */
  flex-wrap: wrap; 
  
  /* Justify Content (Main Axis): flex-start | center | flex-end | space-between | space-around | space-evenly */
  justify-content: space-around; 
  
  /* Align Items (Cross Axis): flex-start | center | flex-end | stretch | baseline */
  align-items: center; 
  
  /* Align Content (Multiple Rows): flex-start | center | flex-end | stretch | space-between | space-around */
  align-content: space-between;
  
  /* Gap between items */
  gap: 20px;
}`;

  const flexItemCode = `.flex-item {
  /* Order: change the position of an item */
  order: 2; 

  /* Flex Grow: how much an item expands */
  flex-grow: 1;

  /* Flex Shrink: how much an item shrinks */
  flex-shrink: 0;

  /* Flex Basis: initial size of an item */
  flex-basis: 300px;
  
  /* Align Self: override align-items for a specific item */
  align-self: flex-start;
}`;

  const day5QuizQuestions = [
    {
      question: "Which CSS property transforms an element into a flex container?",
      options: [
        { id: 'a', text: 'float: flex', correct: false },
        { id: 'b', text: 'display: flex', correct: true },
        { id: 'c', text: 'position: flex', correct: false },
        { id: 'd', text: 'layout: flex', correct: false },
      ]
    },
    {
      question: "What is the default value for flex-direction?",
      options: [
        { id: 'a', text: 'row', correct: true },
        { id: 'b', text: 'column', correct: false },
        { id: 'c', text: 'row-reverse', correct: false },
        { id: 'd', text: 'column-reverse', correct: false },
      ]
    },
    {
      question: "Which property aligns flex items along the main axis (horizontally for a row)?",
      options: [
        { id: 'a', text: 'align-items', correct: false },
        { id: 'b', text: 'align-content', correct: false },
        { id: 'c', text: 'justify-content', correct: true },
        { id: 'd', text: 'align-self', correct: false },
      ]
    },
    {
      question: "Which display property ignores width and height settings?",
      options: [
        { id: 'a', text: 'display: block', correct: false },
        { id: 'b', text: 'display: inline', correct: true },
        { id: 'c', text: 'display: inline-block', correct: false },
        { id: 'd', text: 'display: flex', correct: false },
      ]
    },
    {
      question: "What is the default value for flex-grow?",
      options: [
        { id: 'a', text: '1', correct: false },
        { id: 'b', text: 'auto', correct: false },
        { id: 'c', text: '0', correct: true },
        { id: 'd', text: '-1', correct: false },
      ]
    },
    {
      question: "Which shorthand property combines flex-grow, flex-shrink, and flex-basis?",
      options: [
        { id: 'a', text: 'flex-size', correct: false },
        { id: 'b', text: 'flex', correct: true },
        { id: 'c', text: 'flex-layout', correct: false },
        { id: 'd', text: 'flex-shorthand', correct: false },
      ]
    }
  ];

  const projectCodeDay5 = `<!DOCTYPE html>
<html>
<head>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    background-color: #f1f5f9;
  }
  
  /* Flex Navbar */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e293b;
    color: white;
    padding: 15px 30px;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
  }
  
  .nav-links li {
    cursor: pointer;
  }
  
  .nav-links li:hover {
    color: #3b82f6;
  }

  /* Flex Dashboard Layout */
  .dashboard {
    display: flex;
    flex-wrap: wrap; /* Allows wrapping on smaller screens */
    gap: 20px;
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Flex Items */
  .card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .main-card {
    flex-grow: 2;
    flex-basis: 60%;
    min-height: 250px;
  }
  
  .side-card {
    flex-grow: 1;
    flex-basis: 30%;
    min-height: 250px;
    background-color: #3b82f6;
    color: white;
  }
  
  /* A nested flex container inside the main card */
  .stats-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    background-color: #f8fafc;
    padding: 15px;
    border-radius: 6px;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #0f172a;
  }

</style>
</head>
<body>

  <!-- Top Navigation (Flex Row, Space-Between) -->
  <nav class="navbar">
    <h2 style="margin:0;">FlexDash</h2>
    <ul class="nav-links">
      <li>Home</li>
      <li>Analytics</li>
      <li>Settings</li>
    </ul>
  </nav>

  <!-- Dashboard Container (Flex Row, Wrap) -->
  <div class="dashboard">
    
    <!-- Main Content Area (Grows more) -->
    <div class="card main-card">
      <h3>Overview</h3>
      <p style="color: #64748b; margin-top: 10px;">Welcome to your flexbox-powered dashboard. Notice how this card takes up more horizontal space using flex-grow and flex-basis.</p>
      
      <!-- Nested Flex Container -->
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-value">1,245</span>
          <span style="color: #64748b; font-size: 0.8rem;">Users</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">84%</span>
          <span style="color: #64748b; font-size: 0.8rem;">Engagement</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">$12k</span>
          <span style="color: #64748b; font-size: 0.8rem;">Revenue</span>
        </div>
      </div>
    </div>
    
    <!-- Sidebar Area (Grows less) -->
    <div class="card side-card">
      <h3>Quick Actions</h3>
      <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.9;">Flexbox makes it incredibly simple to align these elements dynamically without floats or complex positioning.</p>
      
      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
        <button style="padding: 10px; border: none; border-radius: 4px; background: white; color: #3b82f6; cursor: pointer; font-weight: bold;">Generate Report</button>
        <button style="padding: 10px; border: 1px solid white; border-radius: 4px; background: transparent; color: white; cursor: pointer;">View Logs</button>
      </div>
    </div>

  </div>

</body>
</html>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'display_props' && (
        <Section key="display_props" id="display_props" eyebrow="Fundamentals" title="Display Properties">
          <div className="panel">
            <p>Before diving into Flexbox, it is important to understand the default <code>display</code> properties.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>1. Block Elements</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Start on a new line and take full width by default (e.g., <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>).</p>
                <div style={{ background: '#bfdbfe', padding: '10px', marginTop: '10px', textAlign: 'center', color: '#1e3a8a', border: '2px solid #2563eb' }}>Block Element 1</div>
                <div style={{ background: '#bfdbfe', padding: '10px', marginTop: '10px', textAlign: 'center', color: '#1e3a8a', border: '2px solid #2563eb' }}>Block Element 2</div>
              </div>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>2. Inline Elements</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Stay on the same line. <strong>Width and height DO NOT apply.</strong> Box shrinks around text (e.g., <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>).</p>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ background: '#a7f3d0', padding: '5px', color: '#064e3b', border: '2px solid #059669', marginRight: '5px' }}>Inline 1</span>
                  <span style={{ background: '#a7f3d0', padding: '5px', color: '#064e3b', border: '2px solid #059669' }}>Inline 2</span>
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>3. Inline-Block</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Stays on the same line like inline, <strong>but width & height APPLY.</strong> Box becomes bigger even if text is small.</p>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ display: 'inline-block', width: '100px', height: '50px', background: '#fde68a', color: '#92400e', border: '2px solid #d97706', marginRight: '5px', textAlign: 'center', lineHeight: '45px' }}>Block 1</span>
                  <span style={{ display: 'inline-block', width: '100px', height: '50px', background: '#fde68a', color: '#92400e', border: '2px solid #d97706', textAlign: 'center', lineHeight: '45px' }}>Block 2</span>
                </div>
              </div>
            </div>

            <div className="code-example-box">
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(displayCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>
            
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('flex_intro')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'flex_intro' && (
        <Section key="flex_intro" id="flex_intro" eyebrow="Layout System" title="Introduction to Flexbox">
          <div className="panel">
            <p><strong>Flexbox (Flexible Box Layout)</strong> is a one-dimensional CSS layout system that helps you arrange items easily in a row or column.</p>
            
            <div style={{ padding: '2rem', background: '#e0f2fe', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #bae6fd' }}>
              <h3 style={{ color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>✨</span> Simple Meaning
              </h3>
              <p style={{ color: '#0c4a6e', marginBottom: '1rem' }}>When you use <code>display: flex</code>, the box becomes flexible and the items inside can:</p>
              <ul style={{ color: '#0c4a6e', paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Automatically adjust space</li>
                <li>Align neatly (horizontally and vertically)</li>
                <li>Move left, right, center, top, bottom</li>
                <li>Resize based on screen size</li>
              </ul>
              <p style={{ color: '#0c4a6e', marginTop: '1rem', fontWeight: 'bold' }}>Flexbox makes layout super easy compared to normal CSS (like floats)!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ color: '#064e3b', marginBottom: '0.5rem' }}>✔ Advantages</h4>
                <ul style={{ color: '#334155', paddingLeft: '20px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li><strong>Easy alignment:</strong> Center anything vertically and horizontally easily.</li>
                  <li><strong>Responsive design:</strong> Adjusts automatically on screen sizes.</li>
                  <li><strong>Space management:</strong> Control spacing using gap, justify-content.</li>
                  <li><strong>Change direction:</strong> Switch layout easily (row to column).</li>
                  <li><strong>Auto-resizing:</strong> Items grow/shrink automatically.</li>
                </ul>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ color: '#7f1d1d', marginBottom: '0.5rem' }}>✘ Disadvantages</h4>
                <ul style={{ color: '#334155', paddingLeft: '20px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <li><strong>Not suitable for full page:</strong> Good for 1D layout. (For full 2D page, CSS Grid is better).</li>
                  <li><strong>Complex when nested:</strong> Too many flex containers inside each other can be confusing.</li>
                  <li><strong>Hard for large complex designs:</strong> Simple, but not perfect for huge dashboard grids.</li>
                </ul>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('flex_container')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'flex_container' && (
        <Section key="flex_container" id="flex_container" eyebrow="Parent" title="Flex Container Properties">
          <div className="panel">
            <p>These properties are applied to the <strong>parent element</strong> (the flex container) and control how the items behave together.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(flexContainerCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Key Concepts</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Main Axis & Cross Axis</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>Flexbox layout is based on these two axes. If <code>flex-direction</code> is row, the main axis is horizontal. If column, it is vertical.</p>
                <div style={{ position: 'relative', height: '100px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: '#3b82f6', transform: 'translateY(-50%)' }}></div>
                  <div style={{ position: 'absolute', top: '50%', right: '10px', color: '#3b82f6', fontSize: '0.8rem', fontWeight: 'bold', transform: 'translateY(-150%)' }}>Main Axis (Row)</div>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', background: '#ef4444', transform: 'translateX(-50%)' }}></div>
                  <div style={{ position: 'absolute', bottom: '10px', left: '50%', color: '#ef4444', fontSize: '0.8rem', fontWeight: 'bold', transform: 'translateX(10%)' }}>Cross Axis</div>
                </div>
              </div>
              
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Alignment Properties</h4>
                <ul style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '0.5rem' }}><strong>justify-content:</strong> Aligns items along the <em>Main Axis</em> (e.g., center, space-between, flex-end).</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>align-items:</strong> Aligns items along the <em>Cross Axis</em> (e.g., center, stretch, flex-start).</li>
                  <li><strong>align-content:</strong> Aligns multiple flex lines when <code>flex-wrap: wrap</code> is used.</li>
                </ul>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Visual Examples</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>display: flex; <span style={{opacity: 0.7, fontWeight: 'normal'}}>(row default)</span></p>
                <div style={{ display: 'flex', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ background: '#3b82f6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>1</div>
                  <div style={{ background: '#3b82f6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>2</div>
                  <div style={{ background: '#3b82f6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>3</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>flex-direction: column;</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '120px' }}>
                  <div style={{ background: '#10b981', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>1</div>
                  <div style={{ background: '#10b981', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>2</div>
                  <div style={{ background: '#10b981', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>3</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>flex-wrap: wrap;</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '10px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>1</div>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '10px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>2</div>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '10px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>3</div>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '10px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>4</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>justify-content: space-around;</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px' }}>A</div>
                  <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px' }}>B</div>
                  <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px' }}>C</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>align-items: center;</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '120px' }}>
                  <div style={{ background: '#ec4899', color: 'white', padding: '10px', borderRadius: '4px', height: '30px', display: 'flex', alignItems: 'center' }}>1</div>
                  <div style={{ background: '#ec4899', color: 'white', padding: '10px', borderRadius: '4px', height: '60px', display: 'flex', alignItems: 'center' }}>2</div>
                  <div style={{ background: '#ec4899', color: 'white', padding: '10px', borderRadius: '4px', height: '40px', display: 'flex', alignItems: 'center' }}>3</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>align-content: space-between;</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-between', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '120px' }}>
                  <div style={{ background: '#14b8a6', color: 'white', padding: '5px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>1</div>
                  <div style={{ background: '#14b8a6', color: 'white', padding: '5px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>2</div>
                  <div style={{ background: '#14b8a6', color: 'white', padding: '5px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>3</div>
                  <div style={{ background: '#14b8a6', color: 'white', padding: '5px', borderRadius: '4px', width: '40%', textAlign: 'center' }}>4</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>gap: 20px;</p>
                <div style={{ display: 'flex', gap: '20px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ background: '#f43f5e', color: 'white', padding: '10px', borderRadius: '4px', flex: 1, textAlign: 'center' }}>A</div>
                  <div style={{ background: '#f43f5e', color: 'white', padding: '10px', borderRadius: '4px', flex: 1, textAlign: 'center' }}>B</div>
                  <div style={{ background: '#f43f5e', color: 'white', padding: '10px', borderRadius: '4px', flex: 1, textAlign: 'center' }}>C</div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('flex_items')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'flex_items' && (
        <Section key="flex_items" id="flex_items" eyebrow="Children Ordering & Alignment" title="Flex Item Properties (Order & Align Self)">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📌 Ordering &amp; Self Alignment</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                These properties allow individual flex children to override container alignment or visually re-order themselves without changing the HTML structure!
              </p>
            </div>

            {/* ─── DEFINITION CARDS ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Order */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.15rem', fontWeight: 700 }}>1. CSS order</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Determines the visual sequence of an item inside its parent flex container. Default value is <code>0</code>.
                </p>
                <div style={{ background: '#eff6ff', padding: '0.8rem', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.85rem' }}>💡 Simple Rule:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#1e3a8a' }}>
                    Items are laid out in ascending order. Lower values (like <code>-1</code>) appear first; higher values (like <code>2</code>) appear last.
                  </p>
                </div>
              </div>

              {/* Align Self */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #8b5cf6', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.15rem', fontWeight: 700 }}>2. CSS align-self</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  Overrides the flex container's global <code>align-items</code> setting for just this specific flex child.
                </p>
                <div style={{ background: '#f5f3ff', padding: '0.8rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                  <strong style={{ color: '#5b21b6', fontSize: '0.85rem' }}>💡 Simple Rule:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#4c1d95' }}>
                    Values include <code>flex-start</code> (top), <code>center</code> (middle), <code>flex-end</code> (bottom), and <code>stretch</code> (full height).
                  </p>
                </div>
              </div>

            </div>

            {/* ─── INTERACTIVE PLAYGROUND ─── */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Order &amp; Align Self Sandbox</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Click buttons to adjust <strong>Box 2 (Orange Target Box)</strong> position and alignment!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                
                {/* Order control */}
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                    order: <span style={{ color: '#2563eb' }}>{demoOrder}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[-1, 0, 1, 2].map(val => (
                      <button
                        key={val}
                        onClick={() => setDemoOrder(val)}
                        style={{
                          padding: '0.45rem 0.9rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          border: demoOrder === val ? '2px solid #2563eb' : '1px solid #cbd5e1',
                          background: demoOrder === val ? '#2563eb' : 'white',
                          color: demoOrder === val ? 'white' : '#1e293b'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Align Self control */}
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                    align-self: <span style={{ color: '#8b5cf6' }}>{demoAlignSelf}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['flex-start', 'center', 'flex-end', 'stretch'].map(val => (
                      <button
                        key={val}
                        onClick={() => setDemoAlignSelf(val)}
                        style={{
                          padding: '0.45rem 0.9rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          border: demoAlignSelf === val ? '2px solid #8b5cf6' : '1px solid #cbd5e1',
                          background: demoAlignSelf === val ? '#8b5cf6' : 'white',
                          color: demoAlignSelf === val ? 'white' : '#1e293b'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Canvas */}
            <div style={{ padding: '2rem 1.5rem', background: '#0f172a', borderRadius: '14px', marginBottom: '2rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                Flex Container (`display: flex; height: 160px; align-items: flex-start;`)
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', height: '160px', background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '2px dashed #475569' }}>
                
                <div style={{ background: '#3b82f6', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: 700, width: '120px', height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  Box 1<br /><span style={{ fontSize: '0.7rem', fontWeight: 400 }}>order: 0</span>
                </div>

                <motion.div 
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{ 
                    background: '#f97316', 
                    color: 'white', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    fontWeight: 700, 
                    order: demoOrder, 
                    alignSelf: demoAlignSelf, 
                    width: '140px',
                    minHeight: demoAlignSelf === 'stretch' ? 'auto' : '75px',
                    boxShadow: '0 8px 16px rgba(249, 115, 22, 0.35)', 
                    border: '2px solid white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  🎯 Target Box 2<br />
                  <span style={{ fontSize: '0.72rem', fontWeight: 400, marginTop: '0.2rem' }}>
                    order: {demoOrder} | align-self: {demoAlignSelf}
                  </span>
                </motion.div>

                <div style={{ background: '#3b82f6', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: 700, width: '120px', height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  Box 3<br /><span style={{ fontSize: '0.7rem', fontWeight: 400 }}>order: 0</span>
                </div>

              </div>
            </div>

            {/* Code */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">CSS Rule</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
`.target-box {
  order: ${demoOrder};            /* ${demoOrder < 0 ? 'Positions item before siblings' : demoOrder > 0 ? 'Positions item after siblings' : 'Default position'} */
  align-self: ${demoAlignSelf};   /* ${demoAlignSelf === 'center' ? 'Centers vertically' : demoAlignSelf === 'flex-end' ? 'Aligns to bottom' : demoAlignSelf === 'stretch' ? 'Stretches full height' : 'Aligns to top'} */
}`, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('flex_grow_shrink')}>Continue to Grow, Shrink &amp; Basis (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'flex_grow_shrink' && (
        <Section key="flex_grow_shrink" id="flex_grow_shrink" eyebrow="Child Sizing & Expansion" title="Flex Item Sizing (Grow, Shrink & Basis)">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📐 Flex Sizing Mechanics</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                These three properties control how a flex item calculates its starting width, expands to absorb extra container space, or contracts when container space is tight!
              </p>
            </div>

            {/* ─── 3 CARDS ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              {/* Flex Grow */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>1. flex-grow</h4>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                  Defines how much the item expands relative to siblings to fill free empty container space. <code>flex-grow: 0</code> means fixed size; <code>flex-grow: 1</code> absorbs free space.
                </p>
              </div>

              {/* Flex Shrink */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #ef4444', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>2. flex-shrink</h4>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                  Determines how much the item shrinks when space is constrained. <code>flex-shrink: 0</code> prevents shrinking/distortion; <code>flex-shrink: 1</code> allows shrinking.
                </p>
              </div>

              {/* Flex Basis */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #f59e0b', border: '1px solid #cbd5e1', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>3. flex-basis</h4>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                  Sets the initial base size of the element (e.g. <code>200px</code> or <code>auto</code>) before space distribution calculations take place.
                </p>
              </div>

            </div>

            {/* Shorthand Box */}
            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', padding: '1.2rem 1.5rem', borderRadius: '12px', marginBottom: '2.5rem' }}>
              <h4 style={{ margin: '0 0 0.4rem', color: '#92400e', fontSize: '1.05rem', fontWeight: 700 }}>⚡ The `flex` Shorthand Formula</h4>
              <p style={{ color: '#78350f', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                Instead of setting grow, shrink, and basis individually, use the <code>flex</code> shorthand property:
                <br />
                <code style={{ background: '#ffffff', color: '#b45309', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.92rem', fontWeight: 700, display: 'inline-block', marginTop: '0.4rem' }}>
                  flex: &lt;flex-grow&gt; &lt;flex-shrink&gt; &lt;flex-basis&gt;; /* e.g. flex: 1 0 200px; */
                </code>
              </p>
            </div>

            {/* ─── INTERACTIVE SIZING PLAYGROUND ─── */}
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive Sizing Controls</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Test how <code>flex-grow</code> and <code>flex-basis</code> dynamically resize <strong>Box 2 (Emerald Target Box)</strong>!
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                
                {/* Flex Grow control */}
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    flex-grow: <span style={{ color: '#10b981' }}>{demoGrow}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {[0, 1, 2, 3].map(val => (
                      <button
                        key={val}
                        onClick={() => setDemoGrow(val)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: demoGrow === val ? '2px solid #10b981' : '1px solid #cbd5e1',
                          background: demoGrow === val ? '#10b981' : 'white',
                          color: demoGrow === val ? 'white' : '#1e293b'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flex Basis control */}
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                    flex-basis: <span style={{ color: '#f59e0b' }}>{demoBasis}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['auto', '100px', '180px', '250px'].map(val => (
                      <button
                        key={val}
                        onClick={() => setDemoBasis(val)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          border: demoBasis === val ? '2px solid #f59e0b' : '1px solid #cbd5e1',
                          background: demoBasis === val ? '#f59e0b' : 'white',
                          color: demoBasis === val ? 'white' : '#1e293b'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Canvas */}
            <div style={{ padding: '2rem 1.5rem', background: '#0f172a', borderRadius: '14px', marginBottom: '2rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                Flex Container (`display: flex; gap: 12px;`)
              </div>
              <div style={{ display: 'flex', gap: '12px', background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '2px dashed #475569' }}>
                
                <div style={{ background: '#3b82f6', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: 700, flexGrow: 1, height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  Box 1<br /><span style={{ fontSize: '0.7rem', fontWeight: 400 }}>flex-grow: 1</span>
                </div>

                <motion.div 
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{ 
                    background: '#10b981', 
                    color: 'white', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    fontWeight: 700, 
                    flexGrow: demoGrow, 
                    flexBasis: demoBasis, 
                    height: '70px',
                    boxShadow: '0 8px 16px rgba(16, 185, 129, 0.35)', 
                    border: '2px solid white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  🎯 Target Box 2<br />
                  <span style={{ fontSize: '0.72rem', fontWeight: 400, marginTop: '0.2rem' }}>
                    grow: {demoGrow} | basis: {demoBasis}
                  </span>
                </motion.div>

                <div style={{ background: '#3b82f6', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: 700, flexGrow: 1, height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  Box 3<br /><span style={{ fontSize: '0.7rem', fontWeight: 400 }}>flex-grow: 1</span>
                </div>

              </div>
            </div>

            {/* Code */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">CSS Rule</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
`.target-box {
  flex-grow: ${demoGrow};        /* ${demoGrow > 0 ? 'Expands to absorb extra container space' : 'Fixed size, does not grow'} */
  flex-shrink: ${demoShrink};      /* ${demoShrink === 0 ? 'Does not shrink when container space contracts' : 'Shrinks proportionally'} */
  flex-basis: ${demoBasis};     /* Starting base size before grow/shrink calculations */
  
  /* Equivalent Shorthand: */
  flex: ${demoGrow} ${demoShrink} ${demoBasis};
}`, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue to Live Coding (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="Flexbox Playground">
          <p>Experiment with <code>display: flex</code>, <code>justify-content</code>, and <code>align-items</code> in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Flexbox Dashboard Layout">
          <p>Time to test your skills by building a responsive dashboard interface using only Flexbox!</p>
          <div className="panel">
            <p><strong>Goal:</strong> Build a top navbar and a main content area with a side panel using flex containers, wrapping, and flex-grow properties.</p>
            
            <div className="code-example-box">
              <div className="code-header">flex_dashboard.html</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="preview-pane" style={{ background: '#f1f5f9', padding: '0', display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                  <div dangerouslySetInnerHTML={{ __html: projectCodeDay5 }} style={{ width: '100%', height: '500px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', position: 'relative' }} />
                </div>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCodeDay5, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '400px', overflowY: 'auto' }}></pre>
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
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 5 Knowledge Check">
          <p>Let's see what you've learned about Flexbox Layout!</p>
          <Quiz questions={day5QuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
