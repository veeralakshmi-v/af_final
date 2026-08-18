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

export default function CSSDay4({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module6', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gridIntroCode = `.container {
  display: grid; /* Starts Grid formatting context */
  /* Or use inline-grid to only take needed width */
}`;

  const gridStructureCode = `.container {
  display: grid;
  
  /* Creates 2 rows of 100px each */
  grid-template-rows: 100px 100px;
  
  /* Creates 3 columns: 400px, 200px, and 100px */
  grid-template-columns: 400px 200px 100px;
}

/* Using the 'fr' (fraction) unit to divide available space */
.flexible-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* Middle column is twice as big as the outer ones */
}`;

  const gridSpacingCode = `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  /* Gaps between rows and columns */
  row-gap: 20px;
  column-gap: 10px;
  
  /* Shorthand for both: */
  gap: 20px 10px;
}`;

  const gridItemCode = `.item1 {
  /* Start at row line 2, end at row line 5 */
  grid-row: 2 / 5;
  
  /* Start at col line 3, span across 2 columns */
  grid-column: 3 / span 2;
}`;

  const responsiveGridCode = `.container {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }

/* Responsive Layout */
@media (max-width: 600px) {
  .container {
    grid-template-areas: 
      "header"
      "content"
      "sidebar"
      "footer";
  }
}`;

  const day6QuizQuestions = [
    {
      question: "Which property is used to create a grid container?",
      options: [
        { id: 'a', text: 'display: block', correct: false },
        { id: 'b', text: 'display: flex', correct: false },
        { id: 'c', text: 'display: grid', correct: true },
        { id: 'd', text: 'display: grid-container', correct: false },
      ]
    },
    {
      question: "What does the 'fr' unit stand for in CSS Grid?",
      options: [
        { id: 'a', text: 'Frame', correct: false },
        { id: 'b', text: 'Fraction', correct: true },
        { id: 'c', text: 'Free Space', correct: false },
        { id: 'd', text: 'Fragment', correct: false },
      ]
    },
    {
      question: "How do you define a grid with 3 equal columns?",
      options: [
        { id: 'a', text: 'grid-columns: 1fr 1fr 1fr;', correct: false },
        { id: 'b', text: 'grid-template-columns: repeat(3, 1fr);', correct: true },
        { id: 'c', text: 'columns: 3;', correct: false },
        { id: 'd', text: 'grid-template-columns: 33% 33% 33%;', correct: false },
      ]
    },
    {
      question: "Which property controls the space between grid columns?",
      options: [
        { id: 'a', text: 'column-gap', correct: true },
        { id: 'b', text: 'grid-space', correct: false },
        { id: 'c', text: 'margin-column', correct: false },
        { id: 'd', text: 'col-spacing', correct: false },
      ]
    },
    {
      question: "What shorthand property allows you to define a layout using named areas?",
      options: [
        { id: 'a', text: 'grid-layout', correct: false },
        { id: 'b', text: 'grid-template-areas', correct: true },
        { id: 'c', text: 'grid-areas', correct: false },
        { id: 'd', text: 'grid-names', correct: false },
      ]
    },
    {
      question: "Which property places a grid item starting at row line 1 and ending at row line 3?",
      options: [
        { id: 'a', text: 'grid-row: 1 / 3;', correct: true },
        { id: 'b', text: 'row: 1 to 3;', correct: false },
        { id: 'c', text: 'grid-span: 1 3;', correct: false },
        { id: 'd', text: 'grid-row-start: 1 / 3;', correct: false },
      ]
    }
  ];

  const projectCodeDay6 = `<!DOCTYPE html>
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
    padding: 20px;
  }
  
  .grid-container {
    display: grid;
    /* Define grid structure using areas */
    grid-template-areas: 
      "header header header"
      "sidebar main main"
      "sidebar footer footer";
      
    grid-template-columns: 250px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 15px;
    height: 90vh;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Assign elements to grid areas */
  .header {
    grid-area: header;
    background-color: #f43f5e;
    color: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .sidebar {
    grid-area: sidebar;
    background-color: #3b82f6;
    color: white;
    padding: 20px;
    border-radius: 8px;
  }
  
  .main {
    grid-area: main;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    
    /* Using a nested grid for products! */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .footer {
    grid-area: footer;
    background-color: #10b981;
    color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
  }
  
  /* Nested Grid Items */
  .product-card {
    background-color: #e2e8f0;
    height: 150px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #475569;
    font-weight: bold;
  }
  
  /* Responsive Layout Magic */
  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 1fr auto;
      grid-template-areas: 
        "header"
        "sidebar"
        "main"
        "footer";
      height: auto;
    }
  }

</style>
</head>
<body>

  <div class="grid-container">
    <header class="header">Dashboard Header</header>
    
    <aside class="sidebar">
      <h3>Navigation</h3>
      <ul style="list-style: none; margin-top: 15px; line-height: 2;">
        <li>Dashboard</li>
        <li>Users</li>
        <li>Settings</li>
      </ul>
    </aside>
    
    <main class="main">
      <div class="product-card">Product 1</div>
      <div class="product-card">Product 2</div>
      <div class="product-card">Product 3</div>
      <div class="product-card">Product 4</div>
    </main>
    
    <footer class="footer">Dashboard Footer © 2024</footer>
  </div>

</body>
</html>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'grid_intro' && (
        <Section key="grid_intro" id="grid_intro" eyebrow="Fundamentals" title="Introduction to Grid">
          <div className="panel">
            <p><strong>CSS Grid</strong> is a 2D layout system used to arrange items in rows and columns simultaneously. Unlike Flexbox (which is 1D), Grid is perfect for complex full-page layouts.</p>
            
            <div style={{ padding: '2rem', background: '#e0f2fe', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #bae6fd' }}>
              <h3 style={{ color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📐</span> Imagine a 2D Chart
              </h3>
              <p style={{ color: '#0c4a6e', marginBottom: '1rem' }}>Grid helps you place boxes exactly where you want.</p>
              <ul style={{ color: '#0c4a6e', paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>✅ Helps you create neat layouts.</li>
                <li>✅ Controls both rows AND columns at the same time.</li>
                <li>✅ Allows precise spacing, alignment, and responsiveness.</li>
                <li>✅ Better and easier than using complicated positioning or floats.</li>
              </ul>
            </div>

            <div className="code-example-box">
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridIntroCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>
            
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('grid_structure')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_structure' && (
        <Section key="grid_structure" id="grid_structure" eyebrow="Definition" title="Defining Grid Structure">
          <div className="panel">
            <p>You can define the exact dimensions of your grid's rows and columns.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridStructureCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Grid Terminology</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Grid Lines</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>The lines that divide the grid. They are numbered starting at 1 (both horizontally and vertically).</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Grid Track</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>The space between two adjacent grid lines (a row or a column).</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Grid Cell / Area</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>A cell is a single unit. An area is one or more adjacent cells forming a rectangle.</p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <h4 style={{ color: '#d97706', marginBottom: '0.5rem' }}>The `fr` Unit (Fraction)</h4>
              <p style={{ color: '#92400e', fontSize: '0.95rem' }}>It divides the available space into parts. For example, <code>1fr 2fr</code> means the second column is twice as big as the first column!</p>
            </div>

            <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>Visual Example</h3>
            <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>grid-template-columns: 1fr 2fr 1fr;</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>1fr</div>
                <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>2fr (Twice as big)</div>
                <div style={{ background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>1fr</div>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('grid_spacing_align')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_spacing_align' && (
        <Section key="grid_spacing_align" id="grid_spacing_align" eyebrow="Layout" title="Spacing & Alignment">
          <div className="panel">
            <p>You can control the gaps between grid tracks and align items precisely within their cells.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridSpacingCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Alignment Properties</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>justify-items</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Aligns horizontally inside each cell.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ background: '#3b82f6', color: 'white', padding: '5px 15px', borderRadius: '4px' }}>1</div>
                  <div style={{ background: '#3b82f6', color: 'white', padding: '5px 15px', borderRadius: '4px' }}>2</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>align-items</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Aligns vertically inside each cell.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '100px' }}>
                  <div style={{ background: '#10b981', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>1</div>
                  <div style={{ background: '#10b981', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>2</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>place-items</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Shortcut for align + justify (e.g. <code>center</code>).</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', placeItems: 'center', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '100px' }}>
                  <div style={{ background: '#f43f5e', color: 'white', padding: '10px 15px', borderRadius: '4px', textAlign: 'center' }}>1</div>
                  <div style={{ background: '#f43f5e', color: 'white', padding: '10px 15px', borderRadius: '4px', textAlign: 'center' }}>2</div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('grid_items')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_items' && (
        <Section key="grid_items" id="grid_items" eyebrow="Placement" title="Grid Item Properties">
          <div className="panel">
            <p>You can precisely place grid items across multiple rows and columns using grid lines.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridItemCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Visual Example: Spanning</h3>
            <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>grid-column: 1 / span 3; grid-row: 1 / 3;</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 50px)', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                <div style={{ gridColumn: '1 / span 3', gridRow: '1 / 3', background: '#8b5cf6', color: 'white', padding: '10px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Spans 3 Cols, 2 Rows!</div>
                <div style={{ background: '#3b82f6', borderRadius: '4px' }}></div>
                <div style={{ background: '#3b82f6', borderRadius: '4px' }}></div>
                <div style={{ background: '#3b82f6', borderRadius: '4px' }}></div>
                <div style={{ background: '#3b82f6', borderRadius: '4px' }}></div>
                <div style={{ background: '#3b82f6', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('grid_auto_flow')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_auto_flow' && (
        <Section key="grid_auto_flow" id="grid_auto_flow" eyebrow="Flow" title="Auto Sizing & Dense Flow">
          <div className="panel">
            <p>You can control how auto-generated grid tracks are sized and how items flow into the grid.</p>
            
            <h3 style={{ marginBottom: '1rem' }}>Auto Rows & Columns</h3>
            <p style={{ marginBottom: '1rem' }}>If you place items outside the defined grid, it implicitly creates new tracks. You can size them with <code>grid-auto-rows</code> and <code>grid-auto-columns</code>.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>grid-auto-rows: 60px;</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Only 1 row defined. The 2nd and 3rd items fall into implicit rows sized at 60px.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '40px', gridAutoRows: '60px', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ background: '#3b82f6', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Defined Row (40px)</div>
                  <div style={{ background: '#10b981', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Auto Row (60px)</div>
                  <div style={{ background: '#10b981', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Auto Row (60px)</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>grid-auto-columns: 80px;</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Item is forced to column 3, creating implicit columns sized at 80px.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '40px', gridAutoColumns: '80px', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
                  <div style={{ background: '#3b82f6', gridColumn: '1', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>Def Col (40px)</div>
                  <div style={{ background: '#10b981', gridColumn: '3', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>Col 3 (80px)</div>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>grid-auto-flow: dense</h3>
            <p style={{ marginBottom: '1rem' }}>By default, grid items are placed in order. If an item doesn't fit, it leaves a gap. <code>dense</code> tells the grid to pack smaller items into those empty gaps earlier in the grid!</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Default (row)</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '40px', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ gridColumn: 'span 2', background: '#3b82f6', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                  <div style={{ gridColumn: 'span 3', background: '#f43f5e', borderRadius: '2px', color: 'white', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2 (Leaves gap)</div>
                  <div style={{ gridColumn: 'span 1', background: '#10b981', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                </div>
              </div>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>dense</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '40px', gridAutoFlow: 'dense', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ gridColumn: 'span 2', background: '#3b82f6', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                  <div style={{ gridColumn: 'span 3', background: '#f43f5e', borderRadius: '2px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                  <div style={{ gridColumn: 'span 1', background: '#10b981', borderRadius: '2px', color: 'white', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3 (Packed!)</div>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('grid_responsive')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grid_responsive' && (
        <Section key="grid_responsive" id="grid_responsive" eyebrow="Areas" title="Responsive Grid with Areas">
          <div className="panel">
            <p>The <code>grid-template-areas</code> property allows you to name grid items and lay them out visually in your CSS code. This makes building responsive layouts incredibly easy!</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(responsiveGridCode, Prism.languages.css, 'css') }}></pre>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Visual Example</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Desktop View</p>
                <div style={{ display: 'grid', gridTemplateAreas: '"header header" "sidebar content" "footer footer"', gridTemplateColumns: '1fr 2fr', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '200px' }}>
                  <div style={{ gridArea: 'header', background: '#f43f5e', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Header</div>
                  <div style={{ gridArea: 'sidebar', background: '#10b981', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sidebar</div>
                  <div style={{ gridArea: 'content', background: '#3b82f6', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</div>
                  <div style={{ gridArea: 'footer', background: '#f59e0b', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Footer</div>
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Mobile View (@media)</p>
                <div style={{ display: 'grid', gridTemplateAreas: '"header" "content" "sidebar" "footer"', gridTemplateColumns: '1fr', gap: '5px', background: '#0f172a', padding: '10px', borderRadius: '4px', height: '200px' }}>
                  <div style={{ gridArea: 'header', background: '#f43f5e', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Header</div>
                  <div style={{ gridArea: 'content', background: '#3b82f6', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Content</div>
                  <div style={{ gridArea: 'sidebar', background: '#10b981', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Sidebar</div>
                  <div style={{ gridArea: 'footer', background: '#f59e0b', color: 'white', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>Footer</div>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="CSS Grid Playground">
          <p>Experiment with <code>display: grid</code>, <code>grid-template-columns</code>, and <code>gap</code> in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Dashboard with CSS Grid">
          <p>Time to test your skills by building a responsive dashboard using CSS Grid Areas!</p>
          <div className="panel">
            <p><strong>Goal:</strong> Build a complete dashboard layout featuring a header, sidebar, main content area, and footer using <code>grid-template-areas</code>. Make it collapse to a single column on mobile!</p>
            
            <div className="code-example-box">
              <div className="code-header">grid_dashboard.html</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="preview-pane" style={{ background: '#f1f5f9', padding: '0', display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                  <div dangerouslySetInnerHTML={{ __html: projectCodeDay6 }} style={{ width: '100%', height: '500px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', position: 'relative' }} />
                </div>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCodeDay6, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '400px', overflowY: 'auto' }}></pre>
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
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 6 Knowledge Check">
          <p>Let's see what you've learned about CSS Grid Layout!</p>
          <Quiz questions={day6QuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
