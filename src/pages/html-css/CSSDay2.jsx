import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveEditor from '../../components/LiveEditor';
import Quiz from '../../components/Quiz';
import Prism from 'prismjs';
import cssOffsetDiagram from '../../assets/css_position_offsets_diagram.jpg';
import cssPositioningTypesDiagram from '../../assets/css_positioning_types_diagram.jpg';
import portfolioLandscape from '../../assets/portfolio_landscape.jpg';


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
  const [demoZIndex, setDemoZIndex] = React.useState(2);
  const [projectSubTab, setProjectSubTab] = React.useState('preview');
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(projectCodeDay4);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([projectCodeDay4], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = "portfolio_layout.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module4', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const boxModelCode = `/* 1. Global Reset to Border-Box */
* {
  box-sizing: border-box; /* Includes padding & border inside total width */
  margin: 0;
  padding: 0;
}

/* 2. Display Properties */
.block-element {
  display: block;        /* Starts on new line, 100% width */
}

.inline-element {
  display: inline;       /* Same line, width/height DO NOT apply */
}

.inline-block-element {
  display: inline-block; /* Same line, BUT width/height DO apply */
  width: 150px;
  height: 60px;
}

/* 3. The 4 Layers of Box Model */
.box {
  width: 300px;
  height: 200px;
  
  /* Padding (Inside space around content) */
  padding: 20px;         /* Shorthand: top right bottom left */
  /* padding: 10px 20px; (top/bottom right/left) */

  /* Border (Frame surrounding padding) */
  border: 4px solid #2563eb;
  border-radius: 12px;   /* Rounded corners */

  /* Margin (Outside space separating elements) */
  margin: 30px auto;     /* Auto centers block elements horizontally */
}`;

  const staticCode = `/* Default Normal Document Flow */
.static-box {
  position: static;      /* Default value for all elements */
  background-color: #e2e8f0;

  /* Top, Right, Bottom, Left & Z-Index DO NOT work on static elements */
  top: 50px;             /* Ignored */
  left: 100px;           /* Ignored */
}`;

  const relativeAbsoluteCode = `/* 1. Position Relative (Anchor Parent) */
.parent-card {
  position: relative;    /* Keeps original spot + acts as reference anchor */
  width: 400px;
  height: 250px;
  border: 2px solid #3b82f6;
}

/* 2. Position Absolute (Positioned Child) */
.badge-tag {
  position: absolute;    /* Removed from normal flow */
  top: 15px;
  right: 15px;           /* Anchored 15px from top-right of .parent-card */
  background-color: #ef4444;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

/* 3. Position Fixed (Viewport Locked) */
.floating-support-btn {
  position: fixed;       /* Locked to screen window during scrolling */
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* 4. Position Sticky (Scroll Toggle) */
.sticky-header {
  position: sticky;      /* Behaves as relative until top boundary is reached */
  top: 0;
  z-index: 100;
}`;

  const floatCode = `/* 1. Floating Elements */
.sidebar-box {
  float: left;           /* Floats to left margin, text wraps around right */
  width: 200px;
  margin-right: 20px;
}

.promo-badge {
  float: right;          /* Floats to right margin */
  width: 150px;
}

/* 2. Clearing Floats */
.footer-section {
  clear: both;           /* Prevents floating elements from overlapping footer */
}

/* 3. Modern Micro Clearfix Hack */
.clearfix::after {
  content: "";
  display: table;
  clear: both;           /* Automatically prevents parent height collapse */
}`;

  const zIndexCode = `/* 1. Normal Stacking Order */
.background-card {
  position: relative;
  z-index: 1;            /* Lowest layer */
}

.middle-card {
  position: relative;
  z-index: 2;            /* Overlaps z-index: 1 */
}

/* 2. Modal Overlay / Top Header */
.top-nav-modal {
  position: fixed;
  top: 0;
  z-index: 1000;         /* Highest priority front layer */
}

/* 3. Stacking Context Rule */
.parent-a {
  position: relative;
  z-index: 1;
}

.child-a {
  position: absolute;
  z-index: 9999;         /* Scoped inside parent-a (cannot overlap parent-b with z-index: 2) */
}`;

  const offsetCode = `/* CSS Offset Properties Example */

/* 1. Relative Offset (Shifted from normal spot) */
.relative-box {
  position: relative;
  top: 20px;            /* Nudges box 20px DOWN from its top edge */
  left: 30px;           /* Nudges box 30px RIGHT from its left edge */
}

/* 2. Absolute Offset (Placed inside relative parent) */
.parent-container {
  position: relative;   /* Boundary for absolute child elements */
  width: 300px;
  height: 200px;
}

.badge-top-right {
  position: absolute;
  top: 10px;            /* 10px from top of parent */
  right: 10px;          /* 10px from right of parent */
}

/* 3. Fixed Offset (Pinned to screen window) */
.chat-widget {
  position: fixed;
  bottom: 20px;         /* 20px from bottom of viewport screen */
  right: 20px;          /* 20px from right of viewport screen */
}

/* 4. Sticky Offset (Pins at threshold) */
.sticky-header {
  position: sticky;
  top: 0;               /* Locks at 0px from top when scrolling */
}`;


  const overflowCode = `/* Controlling Content Overflow */
.card-container {
  width: 300px;
  height: 150px;
  
  overflow: auto;         /* scrollbars added only when content overflows */
  /* Options: */
  /* overflow: visible;   (Content bleeds outside container - default) */
  /* overflow: hidden;    (Clips overflowing content) */
  /* overflow: scroll;    (Always shows scrollbars on X and Y) */
  
  overflow-x: hidden;     /* Disable horizontal scrollbar */
  overflow-y: auto;       /* Enable vertical scrollbar */
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    background-color: #f1f5f9;
    color: #1e293b;
  }
  
  /* 1. Sticky Navigation (Position Property) */
  .navbar {
    position: sticky;
    top: 0;
    background: #0f172a;
    color: white;
    padding: 14px 24px;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #f8fafc;
  }

  .navbar nav a {
    color: #94a3b8;
    text-decoration: none;
    margin-left: 16px;
    font-size: 0.88rem;
    font-weight: 500;
  }
  
  /* 2. Container (Box Model) */
  .container {
    width: 90%;
    max-width: 720px;
    margin: 24px auto;
    padding: 24px;
    background-color: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  .section-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
  }
  
  /* 3. Relative/Absolute Positioning Image Overlay */
  .image-card {
    position: relative;
    width: 100%;
    height: 240px;
    background: #0f172a url('${portfolioLandscape}') center/cover no-repeat;
    border-radius: 10px;
    margin: 16px 0 24px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(15, 23, 42, 0.9));
    color: #ffffff;
    padding: 20px 16px 12px;
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }
  
  /* 4. Float Property & Clearfix */
  .author-section {
    margin-top: 24px;
  }

  .float-box {
    float: left;
    width: 140px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    padding: 16px;
    margin-right: 20px;
    margin-bottom: 12px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
  }

  .float-box h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .float-box p {
    font-size: 0.78rem;
    line-height: 1.4;
    opacity: 0.9;
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
      margin: 16px auto;
      padding: 16px;
    }
    
    .float-box {
      float: none;
      width: 100%;
      margin-right: 0;
      margin-bottom: 16px;
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
    <h2>📸 Photography Portfolio</h2>
    <nav>
      <a href="#gallery">Gallery</a>
      <a href="#about">About</a>
    </nav>
  </div>

  <!-- Main Container -->
  <div class="container">
    
    <h2 class="section-title">Latest Shot</h2>
    <p style="margin-bottom: 16px; color: #64748b; font-size: 0.9rem;">Scroll down to see the floating author bio block below!</p>
    
    <!-- Image Card with Absolute Caption -->
    <div class="image-card">
      <img src="${portfolioLandscape}" alt="Beautiful landscape">
      <div class="caption">🏔️ Majestic Mountain Sunset — Captured 2023</div>
    </div>
    
    <!-- Float Layout Section -->
    <div class="author-section clearfix">
      <div class="float-box">
        <h3>About Me</h3>
        <p>Nature & Landscape Photographer.</p>
      </div>
      <p style="color: #334155; font-size: 0.92rem; line-height: 1.7;">
        This text flows dynamically around the blue floating box! Notice how the <code>float: left</code> property pushes the author bio card to the left boundary, allowing the surrounding paragraph content to naturally wrap around its right side.
      </p>
      <p style="margin-top: 12px; color: #475569; font-size: 0.88rem;">
        We also apply a <code>clearfix</code> utility on the parent wrapper to prevent layout collapse when floating elements!
      </p>
    </div>
    
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 0.82rem;">
      © 2023 Nature Lens Portfolio • Built with CSS Positioning & Box Model
    </div>
    
  </div>

</body>
</html>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'boxmodel' && (
        <Section key="boxmodel" id="boxmodel" eyebrow="Fundamentals" title="Complete Guide to Box Model & Display Properties">
          <div className="panel">

            {/* Intro Banner */}
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📦 What is the CSS Box Model?</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                In CSS, every HTML element is treated as a rectangular box. The <strong>CSS Box Model</strong> calculates the total dimensions of an element by layering <strong>Content</strong>, inner <strong>Padding</strong>, surrounding <strong>Border</strong>, and outer <strong>Margin</strong>.
              </p>
            </div>

            {/* ─── ELEMENT TYPES SECTION ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.5rem' }}>1. Element Types & Default Box Behaviors</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Before styling box dimensions, it is essential to understand default HTML element layout classifications (Block vs Inline vs Inline-Block):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>1. Block Elements</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  Start on a <strong>new line</strong> and take <strong>full width (100%)</strong> by default (e.g., <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>). Both width and height apply.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ background: '#bfdbfe', border: '1px solid #2563eb', color: '#1e3a8a', padding: '0.5rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>Block Element 1</div>
                  <div style={{ background: '#bfdbfe', border: '1px solid #2563eb', color: '#1e3a8a', padding: '0.5rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>Block Element 2</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>2. Inline Elements</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  Stay on the <strong>same line</strong>. Width and height <strong>DO NOT apply</strong>. Box shrinks around text content (e.g., <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>).
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: '#a7f3d0', border: '1px solid #059669', color: '#064e3b', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Inline 1</span>
                  <span style={{ background: '#a7f3d0', border: '1px solid #059669', color: '#064e3b', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Inline 2</span>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #f59e0b', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>3. Inline-Block</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  Stays on the same line like inline, <strong>but width & height APPLY</strong>. Box becomes bigger even if text content is small (buttons, cards).
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ background: '#fde68a', border: '1px solid #d97706', color: '#78350f', width: '80px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Block 1</div>
                  <div style={{ background: '#fde68a', border: '1px solid #d97706', color: '#78350f', width: '80px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Block 2</div>
                </div>
              </div>
            </div>

            {/* ─── THE CSS DISPLAY PROPERTY REFERENCE TABLE ─── */}
            <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.6rem' }}>The CSS <code>display</code> Property</h4>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              The CSS <code>display</code> property allows developers to change or override an element's default type:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2.5rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>display Property Value</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Layout Behavior & Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>display: block;</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Forces element to behave as a Block element (starts new line, takes 100% width).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>display: inline;</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Forces element to sit inline with text. Width & height properties are ignored.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>display: inline-block;</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Flows inline with text while allowing custom width, height, margins & padding.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>display: none;</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Hides element completely and removes it from the document layout flow.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>display: flex;</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Turns container into a 1D Flexible Box layout model.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code style={{ color: '#2563eb', fontWeight: 700 }}>display: grid;</code></td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Turns container into a 2D Grid layout model.</td>
                </tr>
              </tbody>
            </table>

            {/* ─── BOX MODEL LAYERS & PROPERTY REFERENCE TABLE ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. The 4 Layers of Box Model</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Every CSS box is constructed from 4 concentric layers from inside to outside:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2.5rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Layer Name</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Property Syntax</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Background Affected?</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Description & Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700, color: '#1e40af' }}>1. Content</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>width</code>, <code>height</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>✅ Yes</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>The innermost core area where text, images, or child elements appear.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700, color: '#065f46' }}>2. Padding</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>padding</code> (top, right, bottom, left)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>✅ Yes</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Inner space between the content core and the surrounding border. Shows element background color.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700, color: '#991b1b' }}>3. Border</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>border</code>, <code>border-radius</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>⚠️ Border color</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>A decorative frame line wrapping around padding and content.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700, color: '#92400e' }}>4. Margin</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}><code>margin</code>, <code>margin: auto</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>❌ Transparent</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Outer space outside the border that pushes away adjacent elements. Always transparent.</td>
                </tr>
              </tbody>
            </table>

            {/* ─── CONTENT-BOX VS BORDER-BOX ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>3. Sizing Sizing Rule: content-box vs border-box</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              The <code>box-sizing</code> property determines how element total width and height are calculated:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fff1f2', padding: '1.2rem', borderRadius: '10px', border: '1px solid #fecdd3' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#9f1239' }}>⚠️ content-box (Default CSS)</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  <strong>Formula:</strong> Total Width = <code>width</code> + <code>padding</code> + <code>border</code>.<br />
                  If <code>width: 300px</code>, <code>padding: 20px</code>, <code>border: 5px</code>, rendered box width is <strong>350px</strong>!
                </p>
              </div>
              <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 0.4rem', color: '#166534' }}>✅ border-box (Modern Recommended)</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  <strong>Formula:</strong> Total Width = <code>width</code> (Padding and Border are subtracted inside).<br />
                  If <code>width: 300px</code>, rendered box width is <strong>exactly 300px</strong>.
                </p>
              </div>
            </div>

            {/* Animated Box Model Diagram */}
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', background: '#f8fafc', borderRadius: '12px', margin: '2rem 0', border: '1px solid #e2e8f0' }}>
              <motion.div 
                animate={{ scale: [1, 1.03, 1] }} 
                transition={{ duration: 4, repeat: Infinity }}
                style={{ background: '#fef08a', border: '2px dashed #ca8a04', padding: '30px', position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.8rem', color: '#ca8a04', fontWeight: 700 }}>Margin (Outer Clearance)</div>
                
                <div style={{ background: '#fef9c3', border: '5px solid #000', padding: '30px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.8rem', color: '#000', fontWeight: 700 }}>Border (Frame Line)</div>
                  
                  <div style={{ background: '#bbf7d0', border: '2px dashed #16a34a', padding: '30px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.8rem', color: '#16a34a', fontWeight: 700 }}>Padding (Inner Breathing Room)</div>
                    
                    <div style={{ background: '#bfdbfe', border: '1px solid #2563eb', padding: '30px', minWidth: '160px', textAlign: 'center', fontWeight: 700, color: '#1e3a8a' }}>
                      Content Core (Text / Image)
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Code Example Box */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Box Model & Display Code Example</div>
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
        <Section key="position" id="position" eyebrow="Layout" title="Complete Guide to CSS Positioning">
          <div className="panel">

            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📍 What is CSS Position?</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                The <code>position</code> property sets how an element is placed in the document. Combined with offset properties (<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>), positioning allows you to break elements out of normal page flow.
              </p>
            </div>

            {/* ─── INFOGRAPHIC IMAGE 1: POSITION TYPES ─── */}
            <div style={{ marginBottom: '2.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <img 
                src={cssPositioningTypesDiagram} 
                alt="CSS Position Types Overview Diagram" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              <div style={{ background: '#f8fafc', padding: '0.6rem 1rem', fontSize: '0.82rem', color: '#64748b', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
                📸 <strong>Infographic:</strong> Visual breakdown of <code>static</code>, <code>relative</code>, <code>absolute</code>, <code>fixed</code>, and <code>sticky</code> positioning rules.
              </div>
            </div>

            {/* ─── POSITION VALUE DEFINITION & SIMPLE EXPLANATION CARDS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>1. Position Property Definitions & Explanations</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              {/* static */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #64748b', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS position: static</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #64748b' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>position: static</code> is the default positioning for all HTML elements on a webpage.
                  </p>
                </div>
                <div style={{ background: '#eff6ff', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #2563eb' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.4 }}>
                    The element stays in its normal place in webpage flow. Offset rules like <code>top</code>, <code>left</code>, or <code>z-index</code> DO NOT work on it.
                  </p>
                </div>
              </div>

              {/* relative */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS position: relative</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #2563eb' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>position: relative</code> allows an element to be moved from its normal position.
                  </p>
                </div>
                <div style={{ background: '#eff6ff', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #2563eb' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.4 }}>
                    The element stays in its original place in the webpage (reserving its space), but we can nudge it using <code>top</code>, <code>bottom</code>, <code>left</code>, or <code>right</code>.
                  </p>
                </div>
              </div>

              {/* absolute */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #dc2626', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS position: absolute</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #dc2626' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>position: absolute</code> allows an element to be positioned exactly where we want inside its nearest positioned parent.
                  </p>
                </div>
                <div style={{ background: '#fef2f2', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #dc2626' }}>
                  <strong style={{ color: '#991b1b', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#7f1d1d', lineHeight: 1.4 }}>
                    The element is removed from the normal page layout and can be placed using <code>top</code>, <code>bottom</code>, <code>left</code>, or <code>right</code>.
                  </p>
                </div>
              </div>

              {/* fixed */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #7c3aed', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS position: fixed</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #7c3aed' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>position: fixed</code> locks an element to a specific location on the browser window screen.
                  </p>
                </div>
                <div style={{ background: '#f3e8ff', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #7c3aed' }}>
                  <strong style={{ color: '#6b21a8', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#581c87', lineHeight: 1.4 }}>
                    The element is removed from normal flow and pinned to the screen so it stays in the exact same place even when you scroll.
                  </p>
                </div>
              </div>

              {/* sticky */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #059669', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS position: sticky</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #059669' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>position: sticky</code> is a hybrid between relative and fixed positioning.
                  </p>
                </div>
                <div style={{ background: '#ecfdf5', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #059669' }}>
                  <strong style={{ color: '#065f46', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#047857', lineHeight: 1.4 }}>
                    The element scrolls like regular text, but freezes at top of screen when you scroll past it (like a sticky header).
                  </p>
                </div>
              </div>

            </div>

            {/* ─── KEY POSITION RELATIONSHIP CONCEPT CARD ─── */}
            <div style={{ background: 'linear-gradient(135deg, #eff6ff, #f0fdf4)', border: '2px solid #bfdbfe', padding: '1.4rem 1.6rem', borderRadius: '14px', marginBottom: '2.5rem', boxShadow: '0 4px 12px rgba(37,99,235,0.06)' }}>
              <h4 style={{ margin: '0 0 0.8rem', color: '#1e3a8a', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                💡 Key Positioning Concept: Reference Points & Ancestors
              </h4>
              <p style={{ color: '#1e40af', fontSize: '0.96rem', lineHeight: 1.6, margin: '0 0 1rem', fontWeight: 500 }}>
                <code>absolute</code> can be used alone, but <code>relative</code> is commonly given to the parent so that the absolute child uses that parent as its reference.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'white', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '4px solid #2563eb', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                  <strong style={{ color: '#2563eb', fontSize: '0.9rem' }}>relative = Creates a reference point 📍</strong>
                  <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: '#334155' }}>
                    Establishes an anchor boundary for inner elements.
                  </p>
                </div>
                <div style={{ background: 'white', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '4px solid #dc2626', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                  <strong style={{ color: '#dc2626', fontSize: '0.9rem' }}>absolute = Positions using that reference point 🎯</strong>
                  <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: '#334155' }}>
                    Positions an element precisely relative to that reference anchor.
                  </p>
                </div>
              </div>

              <div style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', color: '#475569' }}>
                <strong style={{ color: '#0f172a' }}>Positioned Ancestor:</strong> A parent or higher-level element that has <code>position: relative</code>, <code>absolute</code>, <code>fixed</code>, or <code>sticky</code>.
              </div>
            </div>

            {/* ─── 2. DEDICATED CSS OFFSET PROPERTIES SECTION ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>2. CSS Offset Properties (top, bottom, left, right)</h3>

            <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <img 
                src={cssOffsetDiagram} 
                alt="CSS Offset Properties Diagram" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              <div style={{ background: '#f8fafc', padding: '0.6rem 1rem', fontSize: '0.82rem', color: '#64748b', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
                📸 <strong>Infographic:</strong> How offset properties (<code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>) push positioned elements from container boundaries.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              
              {/* top offset */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS top</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #2563eb' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>top</code> specifies the distance an element is pushed down from the top edge of its parent or original spot.
                  </p>
                </div>
                <div style={{ background: '#eff6ff', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #2563eb' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.4 }}>
                    Pushes the box <strong>downward</strong> away from the top edge (e.g. <code>top: 20px</code>).
                  </p>
                </div>
              </div>

              {/* bottom offset */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #059669', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS bottom</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #059669' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>bottom</code> specifies the distance an element is pushed up from the bottom edge of its parent or original spot.
                  </p>
                </div>
                <div style={{ background: '#ecfdf5', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #059669' }}>
                  <strong style={{ color: '#065f46', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#047857', lineHeight: 1.4 }}>
                    Pushes the box <strong>upward</strong> away from the bottom edge (e.g. <code>bottom: 10px</code>).
                  </p>
                </div>
              </div>

              {/* left offset */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #d97706', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS left</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #d97706' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>left</code> specifies the distance an element is pushed right from the left edge of its parent or original spot.
                  </p>
                </div>
                <div style={{ background: '#fffbeb', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #d97706' }}>
                  <strong style={{ color: '#92400e', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#78350f', lineHeight: 1.4 }}>
                    Pushes the box <strong>rightward</strong> away from the left side (e.g. <code>left: 30px</code>).
                  </p>
                </div>
              </div>

              {/* right offset */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #dc2626', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS right</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #dc2626' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>right</code> specifies the distance an element is pushed left from the right edge of its parent or original spot.
                  </p>
                </div>
                <div style={{ background: '#fef2f2', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #dc2626' }}>
                  <strong style={{ color: '#991b1b', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#7f1d1d', lineHeight: 1.4 }}>
                    Pushes the box <strong>leftward</strong> away from the right side (e.g. <code>right: 15px</code>).
                  </p>
                </div>
              </div>

            </div>

            {/* Offset Rule Alert Box */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', borderLeft: '5px solid #f97316', padding: '1rem 1.2rem', borderRadius: '10px', marginBottom: '2.5rem', fontSize: '0.92rem', color: '#9a3412' }}>
              <strong>⚠️ Important Offset Rule:</strong> Offset properties (<code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>) work <strong>ONLY</strong> when <code>position</code> is set to <code>relative</code>, <code>absolute</code>, <code>fixed</code>, or <code>sticky</code>. They have <strong>no effect</strong> on <code>position: static</code>!
            </div>

            {/* ─── 3. SIDE-BY-SIDE VISUAL CARDS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>3. Visual Positioning Behavior Comparison</h3>
            
            <div style={{ padding: '2rem', display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', background: '#f8fafc', borderRadius: '12px', margin: '1.5rem 0 2.5rem', border: '1px solid #e2e8f0' }}>
              
              {/* Card 1: Static */}
              <div style={{ width: '170px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#64748b' }}>static</div>
                <div style={{ width: '170px', height: '140px', border: '2px solid #cbd5e1', position: 'relative', background: 'white', borderRadius: '8px', padding: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ background: '#e2e8f0', color: '#334155', padding: '0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, textAlign: 'center' }}>Element 1</div>
                  <div style={{ background: '#e2e8f0', color: '#334155', padding: '0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, textAlign: 'center' }}>Element 2</div>
                  <span style={{ fontSize: '0.65rem', color: '#64748b', textAlign: 'center', marginTop: 'auto' }}>Standard Page Order</span>
                </div>
              </div>

              {/* Card 2: Relative */}
              <div style={{ width: '170px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#2563eb' }}>relative</div>
                <div style={{ width: '170px', height: '140px', border: '2px solid #cbd5e1', position: 'relative', background: 'white', borderRadius: '8px', padding: '0.6rem' }}>
                  <div style={{ border: '1.5px dashed #93c5fd', background: '#eff6ff', color: '#3b82f6', padding: '0.35rem', borderRadius: '4px', fontSize: '0.65rem', textAlign: 'center' }}>
                    Original Spot (Kept)
                  </div>
                  <div style={{ background: '#2563eb', color: 'white', padding: '0.35rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, textAlign: 'center', marginTop: '0.4rem', marginLeft: '18px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    Shifted (top/left)
                  </div>
                </div>
              </div>

              {/* Card 3: Absolute */}
              <div style={{ width: '170px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#dc2626' }}>absolute</div>
                <div style={{ width: '170px', height: '140px', border: '2px dashed #ef4444', position: 'relative', background: '#fff5f5', borderRadius: '8px', padding: '0.5rem' }}>
                  <div style={{ fontSize: '0.62rem', color: '#991b1b', fontWeight: 700 }}>Parent (relative)</div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#ef4444', color: 'white', padding: '0.35rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700, boxShadow: '0 4px 6px rgba(0,0,0,0.15)' }}>
                    Child (absolute)
                  </div>
                </div>
              </div>

              {/* Card 4: Fixed */}
              <div style={{ width: '170px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#7c3aed' }}>fixed</div>
                <div style={{ width: '170px', height: '140px', border: '2px solid #ddd6fe', position: 'relative', background: 'white', borderRadius: '8px', padding: '0.5rem', overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Screen Window</div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#8b5cf6', color: 'white', padding: '0.35rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700, boxShadow: '0 4px 6px rgba(0,0,0,0.15)' }}>
                    Pinned to Screen
                  </div>
                </div>
              </div>

              {/* Card 5: Sticky */}
              <div style={{ width: '170px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#059669' }}>sticky</div>
                <div style={{ width: '170px', height: '140px', border: '2px solid #a7f3d0', position: 'relative', background: 'white', borderRadius: '8px', padding: '0', overflow: 'hidden' }}>
                  <div style={{ position: 'sticky', top: 0, background: '#10b981', color: 'white', padding: '0.35rem', fontSize: '0.68rem', fontWeight: 700, textAlign: 'center' }}>
                    Sticky Header (top: 0)
                  </div>
                  <div style={{ padding: '0.4rem', fontSize: '0.62rem', color: '#64748b' }}>
                    Scrolls normally until header reaches top edge.
                  </div>
                </div>
              </div>

            </div>

            {/* ─── 4. CODE EXAMPLES ─── */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Positioning & Offset Code Examples</div>
              <div className="code-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '0.95rem' }}>CSS Position Values Syntax</h4>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(relativeAbsoluteCode, Prism.languages.css, 'css') }}></pre>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '0.95rem' }}>CSS Offset Properties (top, bottom, left, right) Syntax</h4>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(offsetCode, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('zindex')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'zindex' && (
        <Section key="zindex" id="zindex" eyebrow="Depth" title="Interactive Guide to Z-Index Layering">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🥞 Positive vs Negative Z-Index</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                <code>z-index</code> controls which element appears on top when boxes overlap along the Z-axis.
                Positive numbers (<code>1, 2</code>) bring elements <strong>forward</strong>, while negative numbers (<code>-1, -2</code>) push elements <strong>behind</strong>.
              </p>
            </div>

            {/* ─── DEFINITION & SIMPLE EXPLANATION CARDS ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              {/* Positive Z-Index */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>Positive Z-Index (+1, +2)</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #10b981' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    Positive <code>z-index</code> values pull an element forward along the Z-axis toward the viewer.
                  </p>
                </div>
                <div style={{ background: '#ecfdf5', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
                  <strong style={{ color: '#065f46', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#047857', lineHeight: 1.4 }}>
                    Sits on top of regular page content. <code>z-index: 2</code> overlaps <code>z-index: 1</code>.
                  </p>
                </div>
              </div>

              {/* Negative Z-Index */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #dc2626', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>Negative Z-Index (-1, -2)</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #dc2626' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    Negative <code>z-index</code> values push an element backward away from the viewer.
                  </p>
                </div>
                <div style={{ background: '#fef2f2', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #dc2626' }}>
                  <strong style={{ color: '#991b1b', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#7f1d1d', lineHeight: 1.4 }}>
                    Pushes the box behind default page text. <code>z-index: -2</code> sits behind <code>z-index: -1</code>.
                  </p>
                </div>
              </div>

            </div>

            {/* ─── INTERACTIVE Z-INDEX PLAYGROUND ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.6rem' }}>🎮 Interactive Z-Index Layer Playground</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
              Click a value below to dynamically change the orange box's <code>z-index</code> and see how it stacks relative to fixed reference layers!
            </p>

            {/* Interactive Control Buttons */}
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[-2, -1, 1, 2].map((val) => (
                <button
                  key={val}
                  onClick={() => setDemoZIndex(val)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    border: demoZIndex === val ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    background: demoZIndex === val ? '#2563eb' : 'white',
                    color: demoZIndex === val ? 'white' : '#1e293b',
                    boxShadow: demoZIndex === val ? '0 4px 6px rgba(37,99,235,0.2)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  z-index: {val > 0 ? `+${val}` : val}
                </button>
              ))}
            </div>

            {/* Interactive Stacking Canvas */}
            <div style={{ padding: '2.5rem 1.5rem', display: 'flex', justifyContent: 'center', background: '#f8fafc', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
              <div style={{ position: 'relative', width: '360px', height: '220px', background: '#f1f5f9', borderRadius: '12px', border: '2px dashed #cbd5e1', padding: '1rem' }}>
                
                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, position: 'relative', zIndex: 10 }}>Stacking Context Canvas</div>
                
                {/* Fixed Reference Layer (position: absolute, z-index: 0) */}
                <div style={{ position: 'absolute', top: '50px', left: '30px', width: '200px', height: '110px', background: '#ffffff', color: '#1e293b', borderRadius: '8px', padding: '0.6rem', fontSize: '0.78rem', fontWeight: 700, position: 'absolute', zIndex: 0, border: '2px solid #64748b', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  📄 Default Text Content<br />
                  <span style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 500 }}>(position: absolute; z-index: 0)</span>
                </div>

                {/* Interactive Dynamic Box (position: absolute, z-index: demoZIndex) */}
                <motion.div 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    position: 'absolute', 
                    top: '80px', 
                    left: '110px', 
                    width: '200px', 
                    height: '110px', 
                    background: demoZIndex > 0 ? '#f97316' : '#8b5cf6', 
                    color: 'white', 
                    borderRadius: '8px', 
                    padding: '0.6rem', 
                    fontSize: '0.82rem', 
                    fontWeight: 700, 
                    zIndex: demoZIndex, 
                    boxShadow: '0 8px 16px rgba(0,0,0,0.18)', 
                    border: '2px solid white',
                    transition: 'z-index 0.2s ease, background 0.3s ease'
                  }}
                >
                  🎯 Interactive Box<br />
                  <span style={{ fontSize: '0.75rem' }}>z-index: {demoZIndex > 0 ? `+${demoZIndex}` : demoZIndex}</span>
                  <div style={{ marginTop: '0.3rem', fontSize: '0.68rem', fontWeight: 400, opacity: 0.9 }}>
                    {demoZIndex > 0 ? '✨ Sits FRONT / ON TOP of content!' : '🔻 Pushed BEHIND default content!'}
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Generated Code Preview */}
            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Active CSS Rules</div>
              <div className="code-content">
                <div className="code-pane" style={{ gridColumn: 'span 2' }}>
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(
`/* Selected Z-Index Rule */
.interactive-element {
  position: relative;     /* Required for z-index to work */
  z-index: ${demoZIndex};           /* ${demoZIndex > 0 ? 'Positive: brings forward' : 'Negative: pushes behind'} */
}`, Prism.languages.css, 'css') }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('float')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'float' && (
        <Section key="float" id="float" eyebrow="Layout" title="Complete Guide to Float, Clear & Micro Clearfix">
          <div className="panel">
            
            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🏊 What are Float & Clear Properties?</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                The <code>float</code> property places an element on the left or right side of its container, allowing text and inline elements to wrap around it. The <code>clear</code> property controls which sides floating elements are not permitted.
              </p>
            </div>

            {/* ─── FLOAT & CLEAR DEFINITION & SIMPLE EXPLANATION CARDS ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>1. Float & Clear Property Definitions & Explanations</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              
              {/* float: left */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS float: left</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #2563eb' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>float: left</code> pushes an element to the left edge of its container.
                  </p>
                </div>
                <div style={{ background: '#eff6ff', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #2563eb' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.4 }}>
                    Floating a box left allows surrounding text and inline elements to wrap around its right side.
                  </p>
                </div>
              </div>

              {/* float: right */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #059669', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS float: right</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #059669' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>float: right</code> pushes an element to the right edge of its container.
                  </p>
                </div>
                <div style={{ background: '#ecfdf5', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #059669' }}>
                  <strong style={{ color: '#065f46', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#047857', lineHeight: 1.4 }}>
                    Floating a box right allows surrounding text and inline elements to wrap around its left side.
                  </p>
                </div>
              </div>

              {/* clear: both */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #d97706', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS clear: both</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #d97706' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>clear: both</code> prevents an element from floating next to left or right floated elements.
                  </p>
                </div>
                <div style={{ background: '#fffbeb', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #d97706' }}>
                  <strong style={{ color: '#92400e', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#78350f', lineHeight: 1.4 }}>
                    Forces the element to start on a new line below any previously floated boxes.
                  </p>
                </div>
              </div>

              {/* clearfix */}
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #7c3aed', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.6rem', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>CSS clearfix hack</h4>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '6px', marginBottom: '0.8rem', borderLeft: '3px solid #7c3aed' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.85rem' }}>Definition:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                    <code>.clearfix</code> is a helper CSS rule applied to parent containers holding floated elements.
                  </p>
                </div>
                <div style={{ background: '#f3e8ff', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #7c3aed' }}>
                  <strong style={{ color: '#6b21a8', fontSize: '0.85rem' }}>Simple Explanation:</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#581c87', lineHeight: 1.4 }}>
                    Prevents the parent container height from collapsing to 0 when all its child elements are floated.
                  </p>
                </div>
              </div>

            </div>

            {/* ─── SIDE-BY-SIDE VISUAL ANIMATED CARDS (MATCHING OVERFLOW PATTERN) ─── */}
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>2. Float & Clear Visual Comparison</h3>

            <div style={{ padding: '2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', background: '#f8fafc', borderRadius: '12px', margin: '1.5rem 0 2.5rem', border: '1px solid #e2e8f0' }}>
              
              {/* Card 1: float: left */}
              <div style={{ width: '160px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#2563eb' }}>float: left</div>
                <div style={{ width: '160px', height: '130px', border: '2px solid #bfdbfe', position: 'relative', background: 'white', borderRadius: '8px', padding: '0.4rem', overflow: 'hidden' }}>
                  <div style={{ float: 'left', width: '50px', height: '45px', background: '#3b82f6', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem', marginRight: '0.3rem', marginBottom: '0.2rem', borderRadius: '3px' }}>
                    Box Left
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#475569', lineHeight: 1.3 }}>
                    Text wraps around right side of blue box!
                  </div>
                </div>
              </div>

              {/* Card 2: float: right */}
              <div style={{ width: '160px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#059669' }}>float: right</div>
                <div style={{ width: '160px', height: '130px', border: '2px solid #a7f3d0', position: 'relative', background: 'white', borderRadius: '8px', padding: '0.4rem', overflow: 'hidden' }}>
                  <div style={{ float: 'right', width: '50px', height: '45px', background: '#10b981', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem', marginLeft: '0.3rem', marginBottom: '0.2rem', borderRadius: '3px' }}>
                    Box Right
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#475569', lineHeight: 1.3 }}>
                    Text wraps around left side of green box!
                  </div>
                </div>
              </div>

              {/* Card 3: clear: both */}
              <div style={{ width: '160px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#d97706' }}>clear: both</div>
                <div style={{ width: '160px', height: '130px', border: '2px solid #fde68a', position: 'relative', background: 'white', borderRadius: '8px', padding: '0.4rem', overflow: 'hidden' }}>
                  <div style={{ float: 'left', width: '40px', height: '30px', background: '#3b82f6', color: 'white', fontSize: '0.6rem', padding: '0.1rem', borderRadius: '2px' }}>Float</div>
                  <div style={{ clear: 'both', marginTop: '10px', background: '#f59e0b', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '0.3rem', borderRadius: '3px', textAlign: 'center' }}>
                    Cleared Below
                  </div>
                </div>
              </div>

              {/* Card 4: clearfix */}
              <div style={{ width: '160px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#7c3aed' }}>clearfix</div>
                <div style={{ width: '160px', height: '130px', border: '2px solid #ddd6fe', position: 'relative', background: '#f3e8ff', borderRadius: '8px', padding: '0.4rem' }}>
                  <div style={{ float: 'left', width: '50px', height: '40px', background: '#8b5cf6', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem', borderRadius: '3px' }}>Floated</div>
                  <div style={{ fontSize: '0.65rem', color: '#6b21a8', marginTop: '45px', fontWeight: 700 }}>
                    Parent keeps full height!
                  </div>
                </div>
              </div>

            </div>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Float & Clear Code Examples</div>
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
        <Section key="overflow" id="overflow" eyebrow="Layout" title="Complete Guide to Overflow Property">
          <div className="panel">

            <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>🌊 What is CSS Overflow?</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                The <code>overflow</code> property controls what happens when content exceeds the boundaries of its fixed width or height container box.
              </p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Value</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Scrollbar Display</th>
                  <th style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Visual Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>visible</code> (Default)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>No scrollbar</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Overflowing text bleeds outside box container bounds.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>hidden</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>No scrollbar</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Overflowing content is clipped and permanently hidden.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>scroll</code></td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Always visible</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Scrollbars are added on both horizontal and vertical axes regardless of content size.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem 0.8rem', fontWeight: 700 }}><code style={{ color: '#2563eb' }}>auto</code> (Recommended)</td>
                  <td style={{ padding: '0.75rem 0.8rem' }}>Only when needed</td>
                  <td style={{ padding: '0.75rem 0.8rem', color: '#475569' }}>Adds scrollbar dynamically only if content actually overflows box bounds.</td>
                </tr>
              </tbody>
            </table>

            {/* Overflow "GIF-like" Animation */}
            <div style={{ padding: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', background: '#f8fafc', borderRadius: '12px', margin: '2rem 0', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '130px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#64748b' }}>visible</div>
                <div style={{ width: '130px', height: '120px', border: '2px solid #ef4444', overflow: 'visible', position: 'relative', background: 'white', borderRadius: '6px' }}>
                  <motion.div 
                    animate={{ y: [0, -80, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', background: '#fecaca', color: '#7f1d1d' }}
                  >
                    Long content that bleeds outside red box bounds!
                  </motion.div>
                </div>
              </div>

              <div style={{ width: '130px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#64748b' }}>hidden</div>
                <div style={{ width: '130px', height: '120px', border: '2px solid #3b82f6', overflow: 'hidden', position: 'relative', background: 'white', borderRadius: '6px' }}>
                  <motion.div 
                    animate={{ y: [0, -80, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', background: '#bfdbfe', color: '#1e3a8a' }}
                  >
                    Long content that gets clipped by blue box bounds!
                  </motion.div>
                </div>
              </div>

              <div style={{ width: '130px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#64748b' }}>scroll / auto</div>
                <div style={{ width: '130px', height: '120px', border: '2px solid #10b981', overflow: 'scroll', position: 'relative', background: 'white', borderRadius: '6px' }}>
                  <motion.div 
                    animate={{ y: [0, -80, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ padding: '0.5rem', fontSize: '0.8rem', background: '#a7f3d0', color: '#064e3b' }}
                  >
                    Scrollbar added to let user scroll hidden text!
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
              <div className="code-header">Overflow CSS Code Example</div>
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
        <Section key="project" id="project" eyebrow="Mini Project" title="Photography Portfolio Mini Project">
          <div className="panel">
            
            {/* Project Overview Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.8rem', fontWeight: 800 }}>📸 Comprehensive CSS Mini Project</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: '1.02rem' }}>
                This mini project combines all core concepts from CSS Day 2: <strong>Box Model (`border-box`)</strong>, <strong>Sticky Navigation (`position: sticky`)</strong>, <strong>Absolute Overlay Captions (`position: absolute`)</strong>, <strong>Float Layouts (`float: left` &amp; `clearfix`)</strong>, and <strong>Overflow Containers (`overflow-y: auto`)</strong>.
              </p>
            </div>

            {/* Action Bar & Sub-Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.3rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                {[
                  { id: 'preview', label: '🖥️ Live Preview' },
                  { id: 'source', label: '📄 Full Source Code' },
                  { id: 'concepts', label: '💡 Concepts Breakdown' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setProjectSubTab(tab.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      border: 'none',
                      background: projectSubTab === tab.id ? '#ffffff' : 'transparent',
                      color: projectSubTab === tab.id ? '#0f172a' : '#64748b',
                      boxShadow: projectSubTab === tab.id ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button
                  onClick={handleCopyCode}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    background: copiedCode ? '#10b981' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {copiedCode ? '✓ Copied!' : '📋 Copy Source Code'}
                </button>

                <button
                  onClick={handleDownloadCode}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    background: '#0f172a',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  📥 Download HTML File
                </button>
              </div>
            </div>

            {/* Sub-Tab 1: Live Interactive Preview */}
            {projectSubTab === 'preview' && (
              <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
                <div className="code-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>portfolio_layout.html — Live Workspace Output</span>
                  <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>Scroll inside to test sticky navbar &amp; floats</span>
                </div>
                <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                  <div className="preview-pane" style={{ background: '#f8fafc', padding: '0', display: 'flex', justifyContent: 'center', borderLeft: 'none' }}>
                    <div dangerouslySetInnerHTML={{ __html: projectCodeDay4 }} style={{ width: '100%', height: '540px', overflowY: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px', position: 'relative' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Full Source Code */}
            {projectSubTab === 'source' && (
              <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
                <div className="code-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>portfolio_layout.html — Standalone HTML &amp; CSS Source Code</span>
                  <button onClick={handleCopyCode} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                  <div className="code-pane">
                    <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCodeDay4, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '520px', overflowY: 'auto', fontSize: '0.85rem' }}></pre>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Concepts Breakdown */}
            {projectSubTab === 'concepts' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
                
                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #2563eb', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>1. Sticky Navbar (`position: sticky`)</h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    <code>position: sticky; top: 0; z-index: 100;</code> keeps the header locked at the top of the scroll container while rest of the page scrolls beneath it.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #10b981', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>2. Absolute Caption (`position: absolute`)</h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    The parent image card has <code>position: relative</code>, allowing the caption overlay to position with <code>position: absolute; bottom: 0; left: 0; right: 0;</code>.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #8b5cf6', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>3. Float &amp; Clearfix (`float: left`)</h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    The bio card uses <code>float: left; margin-right: 20px;</code> so paragraph text wraps naturally around it. The <code>.clearfix::after</code> pseudo-element prevents parent container collapse.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', borderLeft: '5px solid #f97316', borderTop: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>4. Global Reset (`box-sizing: border-box`)</h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    <code>* {`{ box-sizing: border-box; }`}</code> ensures padding and borders are included inside total element widths, preventing layout distortion.
                  </p>
                </div>

              </div>
            )}

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
