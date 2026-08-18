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

export default function BootstrapDay2({ activeTab, onNavigate, openAITutor }) {
  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined' && (nextSectionId === 'quiz' || nextSectionId === 'project')) {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '🚀', '⭐'], confettiNumber: 30 });
    }
    onNavigate('bootstrap_day2', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAITutorLocal = (question) => {
    if (openAITutor) {
      openAITutor(question);
    }
  };

  // Code snippets
  const gridCode = `<div class="container text-center">
  <!-- 3 Equal Width Columns on medium/large screens, stack on small mobile screens -->
  <div class="row mb-3">
    <div class="col-md-4 p-3 bg-primary text-white border">Column 1 (1/3 width)</div>
    <div class="col-md-4 p-3 bg-secondary text-white border">Column 2 (1/3 width)</div>
    <div class="col-md-4 p-3 bg-info text-white border">Column 3 (1/3 width)</div>
  </div>

  <!-- Custom Width Columns (Totaling 12) -->
  <div class="row">
    <div class="col-md-8 p-3 bg-light text-dark border">Main Content Area (.col-md-8)</div>
    <div class="col-md-4 p-3 bg-dark text-white border">Sidebar Layout (.col-md-4)</div>
  </div>
</div>`;

  const navbarCode = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2 rounded-3 shadow">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">SmartApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="myNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search...">
        <button class="btn btn-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>`;

  const cardsTablesCode = `<!-- Card layouts -->
<div class="card mb-4 shadow-sm" style="max-width: 320px;">
  <img src="https://via.placeholder.com/320x150" class="card-img-top" alt="Card Header">
  <div class="card-body">
    <h5 class="card-title fw-semibold">Card Title</h5>
    <p class="card-text text-muted">Some quick example text to build on the card layout.</p>
    <a href="#" class="btn btn-primary btn-sm">Read More</a>
  </div>
</div>

<!-- Styled Tables -->
<div class="table-responsive">
  <table class="table table-striped table-hover align-middle">
    <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>Product Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Wireless Mouse</td>
        <td>$25.00</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Mechanical Keyboard</td>
        <td>$85.00</td>
      </tr>
    </tbody>
  </table>
</div>`;

  const jsComponentsCode = `<!-- Trigger Button for Modal -->
<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch Modal Demo
</button>

<!-- Modal Template -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold" id="exampleModalLabel">Bootstrap Interactive Modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-secondary">
        This overlays dynamically. All animation routines are handled by the Bootstrap Javascript bundle automatically.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;

  const playgroundStarterHtml = `<div class="container my-5">
  <h2 class="text-center mb-4 fw-bold">Test the Bootstrap Grid System!</h2>
  
  <div class="row g-4 text-center">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0 bg-light p-3">
        <h5 class="fw-bold">Step 1</h5>
        <p class="text-muted">Create a row wrapper container.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0 bg-light p-3">
        <h5 class="fw-bold">Step 2</h5>
        <p class="text-muted">Insert column layout nodes inside row.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0 bg-light p-3">
        <h5 class="fw-bold">Step 3</h5>
        <p class="text-muted">Set responsive columns width (col-md-*).</p>
      </div>
    </div>
  </div>
</div>`;

  const miniProjectHtml = `<!-- Fully Responsive Landing Page Layout component using Bootstrap 5 -->
<div class="bg-light min-vh-100 font-sans">
  
  <!-- Navigation Header Bar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm" style="background: linear-gradient(135deg, #4f46e5, #3b82f6) !important;">
    <div class="container">
      <a class="navbar-brand fw-bold fs-4" href="#">LaunchPad</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLanding">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navLanding">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="py-5 text-center text-white bg-dark" style="background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80') no-repeat center center/cover !important; min-height: 380px; display: flex; align-items: center;">
    <div class="container py-3">
      <h1 class="display-4 fw-extrabold mb-3">Scale Your Projects with AI</h1>
      <p class="lead text-light col-md-8 mx-auto mb-4">
        Our new automation pipelines connect workflows seamlessly. Start constructing modern dashboards today.
      </p>
      <button class="btn btn-primary btn-lg px-4 rounded-pill shadow" data-bs-toggle="modal" data-bs-target="#newsletterModal">Join Newsletter</button>
    </div>
  </header>

  <!-- Product Features Grid -->
  <main class="container py-5">
    <h2 class="text-center fw-bold mb-5 text-dark">Why Choose Us?</h2>
    
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 text-center rounded-4">
          <div class="bg-primary text-white mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3" style="width: 55px; height: 55px;">
            <i class="fs-4">⚡</i>
          </div>
          <h4 class="fw-bold">Lightning Fast</h4>
          <p class="text-muted m-0">Zero layout lag. Code compiles directly inside sandboxes on the fly.</p>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 text-center rounded-4">
          <div class="bg-success text-white mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3" style="width: 55px; height: 55px;">
            <i class="fs-4">🛡️</i>
          </div>
          <h4 class="fw-bold">Secure Backups</h4>
          <p class="text-muted m-0">All files are backed up locally and deployed with absolute safety.</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 text-center rounded-4">
          <div class="bg-info text-white mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3" style="width: 55px; height: 55px;">
            <i class="fs-4">💡</i>
          </div>
          <h4 class="fw-bold">AI Support</h4>
          <p class="text-muted m-0">Our AI tutors are ready to resolve any coding questions 24/7.</p>
        </div>
      </div>
    </div>
  </main>

  <!-- Newsletter Modal -->
  <div class="modal fade text-dark" id="newsletterModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4">
        <div class="modal-header border-0 pb-0">
          <h4 class="modal-title fw-bold">Sign Up</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-4">
          <p class="text-muted">Enter your email and stay updated with the latest AI trends.</p>
          <div class="mb-3">
            <input type="email" class="form-control form-control-lg" placeholder="name@example.com">
          </div>
          <button type="button" class="btn btn-primary btn-lg w-100 rounded-3" data-bs-dismiss="modal">Subscribe</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="py-4 bg-dark text-white text-center border-top">
    <div class="container">
      <p class="m-0 text-muted small">&copy; 2026 LaunchPad Inc. Built with Bootstrap 5.</p>
    </div>
  </footer>
</div>`;

  const quizQuestions = [
    {
      question: "What is the maximum default number of grid columns in a single Bootstrap Row?",
      options: [
        { id: 'a', text: "8 Columns", correct: false },
        { id: 'b', text: "12 Columns", correct: true },
        { id: 'c', text: "10 Columns", correct: false },
        { id: 'd', text: "16 Columns", correct: false },
      ]
    },
    {
      question: "Which class acts as the immediate wrapper parent for Bootstrap column (.col-) classes?",
      options: [
        { id: 'a', text: ".container", correct: false },
        { id: 'b', text: ".row", correct: true },
        { id: 'c', text: ".grid-container", correct: false },
        { id: 'd', text: ".d-flex", correct: false },
      ]
    },
    {
      question: "Which of the following column layout rules correctly specifies a width of half size (6 columns) on medium screens and larger, but full width (12 columns) on mobile?",
      options: [
        { id: 'a', text: "class='col-6 col-sm-12'", correct: false },
        { id: 'b', text: "class='col-12 col-md-6'", correct: true },
        { id: 'c', text: "class='col-medium-6'", correct: false },
        { id: 'd', text: "class='col-6'", correct: false },
      ]
    },
    {
      question: "Which HTML5 tag is most commonly decorated with the .navbar classes?",
      options: [
        { id: 'a', text: "<nav>", correct: true },
        { id: 'b', text: "<header>", correct: false },
        { id: 'c', text: "<div>", correct: false },
        { id: 'd', text: "<section>", correct: false },
      ]
    },
    {
      question: "Which Bootstrap attribute links a button click to trigger/toggle a Modal open state?",
      options: [
        { id: 'a', text: "data-bs-modal='#myModal'", correct: false },
        { id: 'b', text: "data-bs-toggle='modal' combined with data-bs-target='#myModal'", correct: true },
        { id: 'c', text: "href='#myModal' and role='dialog'", correct: false },
        { id: 'd', text: "onclick='openModal(myModal)'", correct: false },
      ]
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {activeTab === 'grid_system' && (
        <Section key="grid_system" id="grid_system" eyebrow="Advanced Layout" title="The Responsive Grid System">
          <div className="panel">
            <p>Bootstrap's grid system uses a series of containers, rows, and columns to layout and align content. It’s built with Flexbox and is fully responsive.</p>
            
            <h3 style={{ marginBottom: '1rem' }}>Grid System Rules</h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <li><strong>Containers:</strong> Wraps all rows (e.g. <code>.container</code>).</li>
              <li><strong>Rows:</strong> Direct parents of columns, created with <code>.row</code>. Rows clean overflow issues with negative margins.</li>
              <li><strong>Columns:</strong> Must be immediate children of rows. The grid totals <strong>12 columns</strong> across. Sums of column width sizes in a row should equal 12, or columns will stack automatically.</li>
            </ol>

            <h3 style={{ marginBottom: '1rem' }}>Breakpoints Shorthands</h3>
            <p>Customize grid widths depending on screen sizes using breakpoint infixes:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              <li><code>.col-</code> (Extra small screens: &lt;576px)</li>
              <li><code>.col-sm-</code> (Small tablet screens: &ge;576px)</li>
              <li><code>.col-md-</code> (Medium screens: &ge;768px)</li>
              <li><code>.col-lg-</code> (Large screen desktops: &ge;992px)</li>
              <li><code>.col-xl-</code> (Extra large desktops: &ge;1200px)</li>
              <li><strong>Example:</strong> <code>class="col-12 col-md-6 col-lg-4"</code> translates to full width on mobile, half width on tablets, and 1/3 width on desktops.</li>
            </ul>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">Grid Column Examples</div>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(gridCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('navbar')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutorLocal("Can you explain how columns wrapping and grid offsets work in Bootstrap?")}>Ask AI</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'navbar' && (
        <Section key="navbar" id="navbar" eyebrow="Components" title="Responsive Navigation Bar (Navbar)">
          <div className="panel">
            <p>Bootstrap includes a responsive, versatile header component called the Navbar. Navbars can fold and collapse automatically on mobile viewports using built-in scripts.</p>
            
            <h3 style={{ marginBottom: '1.2rem' }}>Navbar Structure Elements</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <li><code>.navbar</code>: Base wrapper parent container.</li>
              <li><code>.navbar-expand-lg</code>: Sets the breakpoint where the navigation expands from mobile drawer list layout to horizontal view.</li>
              <li><code>.navbar-brand</code>: Used for company, logo, or project naming.</li>
              <li><code>.navbar-toggler</code>: Hamburger toggle button used on mobile headers.</li>
              <li><code>.collapse.navbar-collapse</code>: Groups matching nav links together to slide up or down dynamically on click events.</li>
            </ul>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">Responsive Navbar Template</div>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(navbarCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('cards_tables')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'cards_tables' && (
        <Section key="cards_tables" id="cards_tables" eyebrow="Containers" title="Cards & Responsive Tables">
          <div className="panel">
            <p>Structuring structured content feeds is simplified in Bootstrap using dedicated Cards and Table helper utility designs.</p>

            <h3 style={{ marginBottom: '1rem' }}>Cards Layout</h3>
            <p>Cards are flexible containers that allow borders, headings, margins, action links, and cap header images seamlessly. Base class name: <code>.card</code>, containing sub-elements <code>.card-header</code>, <code>.card-body</code>, and <code>.card-footer</code>.</p>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Responsive Tables</h3>
            <p>Use <code>.table</code> to set clean paddings and grid borders. Add <code>.table-striped</code> (zebra striping), <code>.table-hover</code> (hover interactions), and wrap tables in <code>.table-responsive</code> to enable horizontal scrolling on small screen sizes.</p>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">Cards & Tables Demo Code</div>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(cardsTablesCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('js_components')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'js_components' && (
        <Section key="js_components" id="js_components" eyebrow="Interactive" title="Dynamic Components (Modals)">
          <div className="panel">
            <p>Bootstrap includes custom JavaScript scripts to launch complex popup overlays (Modals) and slide decks (Carousels) without writing manual JS scripts.</p>

            <h3 style={{ marginBottom: '1rem' }}>Data Attributes Toggle triggers</h3>
            <p>Bootstrap uses HTML5 data attributes to link triggers. For instance, adding <code>data-bs-toggle="modal"</code> and <code>data-bs-target="#myModal"</code> binds modal triggers instantly.</p>

            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">Interactive Modal Boilerplate</div>
              <div className="code-pane">
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(jsComponentsCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Interactive Lab" title="Bootstrap 5 Grid Sandbox">
          <p>Experiment with nested column grids, grid alignments, and breakpoint utilities live inside this workspace!</p>
          <LiveEditor initialHtml={playgroundStarterHtml} initialCss="/* Modify responsive behaviors */" includeBootstrap={true} />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Building a Responsive Landing Page">
          <div className="panel">
            <p><strong>Goal:</strong> Assemble a responsive marketing landing page that features a header navigation navbar, a hero header introducing features, a 3-column details grid, and an interactive email subscription Modal layout.</p>
            
            <div className="code-example-box" style={{ marginBottom: '2rem' }}>
              <div className="code-header">landing_page.html</div>
              <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
                <div className="preview-pane" style={{ background: '#f8fafc', padding: 0, display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                  <div dangerouslySetInnerHTML={{ __html: miniProjectHtml }} style={{ width: '100%', height: '450px', overflowY: 'auto' }} />
                </div>
                <div className="code-pane">
                  <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(miniProjectHtml, Prism.languages.markup, 'markup') }} style={{ margin: 0, maxHeight: '350px', overflowY: 'auto' }}></pre>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Continue to Quiz (+20 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutorLocal("Can you help me understand how columns auto-wrap on tablet screen breakpoints?")}>Ask AI Help</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Knowledge Check" title="Day 11 Knowledge Check">
          <p>Complete this quick assessment to evaluate your understanding of Bootstrap responsive columns, navbars, and modal elements!</p>
          <Quiz questions={quizQuestions} />
        </Section>
      )}
    </AnimatePresence>
  );
}
