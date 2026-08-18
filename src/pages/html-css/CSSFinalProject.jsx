import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import { CheckCircle } from 'lucide-react';

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

export default function CSSFinalProject({ activeTab, onNavigate }) {
  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && nextSectionId === 'project_demo') {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🚀', '🌟', '🏆'], confettiNumber: 40 });
    }
    onNavigate('module9', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalProjectHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus - Modern Single Page Website</title>
  <style>
    /* CSS Variables */
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg: #f8fafc;
      --text: #0f172a;
      --text-light: #64748b;
      --surface: #ffffff;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }

    /* Navbar (Flexbox) */
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 5%;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary);
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--text);
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    /* Hero Section (Flexbox, vh units) */
    .hero {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 80vh;
      background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%);
      padding: 2rem;
    }

    .hero h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      color: var(--text);
    }

    .hero p {
      font-size: 1.2rem;
      color: var(--text-light);
      max-width: 600px;
      margin-bottom: 2rem;
    }

    .btn {
      padding: 1rem 2rem;
      background: var(--primary);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: bold;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
      background: var(--primary-hover);
    }

    /* Features Section (CSS Grid) */
    .features {
      padding: 5rem 5%;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: var(--surface);
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      text-align: center;
      transition: transform 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-10px);
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--primary);
    }

    /* Footer */
    footer {
      background: var(--text);
      color: white;
      text-align: center;
      padding: 2rem;
      margin-top: 2rem;
    }

    /* Media Queries for Responsiveness */
    @media (max-width: 768px) {
      .nav-links {
        display: none; /* Hide on mobile for simplicity */
      }
      .hero h1 {
        font-size: 2.5rem;
      }
      .grid-container {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Navigation -->
  <nav>
    <div class="logo">Nexus.</div>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <h1>Build the Web Faster.</h1>
    <p>Nexus is the ultimate toolkit for building stunning, responsive, and blazing fast single page websites without breaking a sweat.</p>
    <a href="#" class="btn">Get Started</a>
  </section>

  <!-- Features Section -->
  <section class="features">
    <h2 class="section-title">Why Choose Us?</h2>
    <div class="grid-container">
      <div class="feature-card">
        <h3>Lightning Fast</h3>
        <p>Optimized for speed. Nexus ensures your websites load instantly on any device.</p>
      </div>
      <div class="feature-card">
        <h3>Fully Responsive</h3>
        <p>Built with mobile-first CSS Grid and Flexbox to look perfect on all screen sizes.</p>
      </div>
      <div class="feature-card">
        <h3>Modern Design</h3>
        <p>Sleek aesthetics with beautiful gradients, hover states, and glassmorphism.</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p>&copy; 2026 Nexus Inc. Built with HTML & CSS.</p>
  </footer>

</body>
</html>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'project_brief' && (
        <Section key="project_brief" id="project_brief" eyebrow="The Challenge" title="HTML & CSS Final Project">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Welcome to the culmination of your HTML & CSS journey! In this final project, we are going to combine <strong>everything</strong> you've learned to build a modern, responsive Product Card.
            </p>
            
            <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>What you will use:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontWeight: 600 }}>Semantic HTML5</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontWeight: 600 }}>CSS Variables</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontWeight: 600 }}>Flexbox & Grid</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontWeight: 600 }}>Transitions & Transforms</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontWeight: 600 }}>@keyframes Animations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle size={20} color="#10b981" />
                <span style={{ fontWeight: 600 }}>Media Queries</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('project_demo')}>See the Live Demo</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'project_demo' && (
        <Section key="project_demo" id="project_demo" eyebrow="The Result" title="Live Product Card Demo">
          <div className="panel">
            <p>Hover over the card to see the transition effect, and watch the "New" badge pulse using animations!</p>
            
            <div style={{ width: '100%', height: '550px', background: '#e2e8f0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--surface-border)', position: 'relative' }}>
              <iframe 
                srcDoc={finalProjectHTML} 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                title="Final Project Output"
              />
            </div>
            <div style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Congratulations! 🎉</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>You've successfully completed the HTML & CSS module of your Web Development journey. You now have the skills to build beautiful, responsive, and interactive websites from scratch!</p>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
