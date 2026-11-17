import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveEditor from '../../components/LiveEditor';
import Quiz from '../../components/Quiz';
import Introduction from '../../components/Introduction';
import FloatingAITutor from '../../components/FloatingAITutor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// Reusable Section Component with Framer Motion
const Section = ({ id, eyebrow, title, children }) => {
  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="learning-card"
      style={{ marginBottom: '3rem' }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {eyebrow}
        </span>
        <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};

export default function Day1({ activeTab, onNavigate, openAITutor }) {
  const [tutorOpen, setTutorOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState('');

  const openAITutorLocal = (question) => {
    if (openAITutor) {
      openAITutor(question);
    } else {
      setInitialQuestion(question);
      setTutorOpen(true);
    }
  };

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined') {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module1', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Syntax highlighted examples
  const structureCode = `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n  </body>\n</html>`;
  
  const formatCode = `<!-- Headings -->
<h1>Heading 1 (Main Title)</h1>
<h3>Heading 3 (Subheading)</h3>

<!-- Paragraphs & Line Break -->
<p>This is a paragraph with a<br>line break (br tag).</p>

<!-- Bold, Strong, Italic -->
<p>Make text <b>bold</b> or <strong>strong</strong>.</p>
<p>Make text <i>italic</i> or <em>emphasized</em>.</p>

<!-- Underline, Highlight, Delete -->
<p>You can <u>underline</u> or <mark>highlight</mark>.</p>
<p>You can <del>delete</del> or <s>strikethrough</s> text.</p>

<!-- Subscript, Superscript, Small -->
<p>Chemical: H<sub>2</sub>O | Math: 10<sup>2</sup> = 100</p>
<p><small>Smaller fine-print text using small tag.</small></p>

<!-- Horizontal Rule -->
<hr>

<!-- Preformatted Text -->
<pre>
Preformatted text (pre tag):
  Preserves    spaces    and
  line breaks
  exactly as written!
</pre>

<!-- Marquee Tag -->
<marquee behavior="scroll" direction="left">Scrolling announcement text using marquee tag!</marquee>`;

  const listCode = `<h2>My Favorite Fruits (Unordered List)</h2>
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
  <li>Mango</li>
</ul>

<h2>Steps to Make Tea (Ordered List)</h2>
<ol>
  <li>Boil water</li>
  <li>Add tea leaves</li>
  <li>Pour in milk</li>
  <li>Add sugar</li>
  <li>Serve hot</li>
</ol>`;

  const linksMediaCode = `<!-- Anchor Tag (External Link) -->
<h2>1. External Link</h2>
<p>Visit our website: <a href="https://www.google.com" target="_blank">Go to Google</a></p>

<!-- Image Tag -->
<h2>2. Image Tag</h2>
<img src="https://via.placeholder.com/200" alt="Sample Image">

<!-- Figure and Figcaption -->
<h2>3. Figure and Figcaption</h2>
<figure>
  <img src="https://via.placeholder.com/250" alt="Nature Image">
  <figcaption>This is a beautiful nature picture.</figcaption>
</figure>

<!-- Marquee Tag -->
<h2>4. Marquee Tag</h2>
<marquee behavior="scroll" direction="left" scrollamount="6" bgcolor="lightyellow">Welcome to my HTML Media Page!</marquee>`;

  const semanticCode = `<header>
  <h1>My Website</h1>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
  </nav>
</header>
<main>
  <article>
    <h2>Blog Post Title</h2>
    <p>This is the content of the article.</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 My Website</p>
</footer>`;

  const projectCode = `<div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px; font-family: sans-serif; text-align: center; max-width: 300px; margin: 0 auto; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%; background: #f3f4f6; margin-bottom: 10px;">
  <h2 style="margin: 0; color: #111827;">Alex Coder</h2>
  <p style="margin: 5px 0 15px 0; color: #6b7280;"><strong>Web Developer</strong> & <em>Designer</em></p>
  <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 15px;">
  <h3 style="margin: 0 0 10px 0; text-align: left; font-size: 1rem; color: #374151;">My Skills:</h3>
  <ul style="text-align: left; margin: 0 0 20px 0; padding-left: 20px; color: #4b5563;">
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
  </ul>
  <a href="mailto:alex@example.com" style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; width: 100%; box-sizing: border-box;">Contact Me</a>
</div>`;

  return (
    <>
      <AnimatePresence mode="wait">
      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Module 1" title="Welcome to Web Development">
          <Introduction onComplete={() => handleContinue('toc')} />
        </Section>
      )}

      {activeTab === 'toc' && (
        <Section key="toc" id="toc" eyebrow="Overview" title="Table of Content">
          <ul style={{ listStyleType: 'decimal', paddingLeft: '24px', lineHeight: '2.2', fontSize: '1rem', color: 'var(--text-primary)' }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'intro'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>Introduction to HTML</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'theory'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>What is HTML?</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'structure'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>HTML Page Structure</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'formatting'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>Basic Tags & Text Formatting</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'lists'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>Lists</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'linksmedia'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>Links & Anchors, Images</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'semantic'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>Semantic Tags</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'playground'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>Live Coding Lab</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('module1', 'project'); }} style={{ textDecoration: 'none', color: 'var(--accent-secondary)', fontWeight: 500 }}>Mini Project</a></li>
          </ul>
          <div className="card-actions" style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('theory')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'theory' && (
        <Section key="theory" id="theory" eyebrow="Theory" title="What is HTML?">
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            <strong>HTML</strong> stands for HyperText Markup Language. It forms the structure and skeleton of every website on the internet.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            <strong>Real-world example:</strong> If a website is a house, HTML is the bricks and walls. CSS is the paint, and JavaScript is the electricity.
          </p>
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('structure')}>Continue (+10 XP)</button>
            <button className="btn btn-outline" onClick={() => openAITutor("Can you explain what HTML really is in simpler terms?")}>Ask AI</button>
          </div>
        </Section>
      )}

      {activeTab === 'structure' && (
        <Section key="structure" id="structure" eyebrow="Tags" title="Document Structure">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Every HTML document has a standard boilerplate structure.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">index.html</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(structureCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Hello World!</h1>
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleContinue('formatting')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'formatting' && (
        <Section key="formatting" id="formatting" eyebrow="Tags" title="Formatting Tags">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>HTML offers several tags to format text appearance and meaning.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">Text Formatting</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(formatCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, padding: '1.5rem', overflowY: 'auto' }}>
                <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.6rem' }}>Heading 1 (Main Title)</h1>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.15rem', color: 'var(--text-secondary)' }}>Heading 3 (Subheading)</h3>

                <p style={{ margin: '0 0 0.75rem 0', lineHeight: '1.6' }}>
                  This is a paragraph with a<br />line break (br tag).
                </p>

                <p style={{ margin: '0 0 0.75rem 0', lineHeight: '1.6' }}>
                  Make text <b>bold</b> or <strong>strong</strong>.
                </p>
                <p style={{ margin: '0 0 0.75rem 0', lineHeight: '1.6' }}>
                  Make text <i>italic</i> or <em>emphasized</em>.
                </p>
                <p style={{ margin: '0 0 0.75rem 0', lineHeight: '1.6' }}>
                  You can <u>underline</u> or <mark>highlight</mark>.
                </p>
                <p style={{ margin: '0 0 0.75rem 0', lineHeight: '1.6' }}>
                  You can <del>delete</del> or <s>strikethrough</s> text.
                </p>
                <p style={{ margin: '0 0 0.75rem 0', lineHeight: '1.6' }}>
                  Chemical: H<sub>2</sub>O | Math: 10<sup>2</sup> = 100
                </p>
                <p style={{ margin: '0 0 0.75rem 0', lineHeight: '1.6' }}>
                  <small>Smaller fine-print text using small tag.</small>
                </p>

                <hr style={{ margin: '1rem 0', borderColor: '#e2e8f0' }} />

                <pre style={{
                  color: '#0f172a',
                  background: '#f8fafc',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre',
                  margin: '0.75rem 0',
                  fontSize: '0.85rem',
                  lineHeight: '1.4'
                }}>
{`Preformatted text (pre tag):
  Preserves    spaces    and
  line breaks
  exactly as written!`}
                </pre>

                <marquee 
                  behavior="scroll" 
                  direction="left"
                  style={{
                    display: 'block',
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #fde68a',
                    margin: '0.75rem 0',
                    fontWeight: 500
                  }}
                >
                  Scrolling announcement text using marquee tag!
                </marquee>
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleContinue('lists')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'lists' && (
        <Section key="lists" id="lists" eyebrow="Tags" title="HTML Lists">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Lists are used to group related items together.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">Ordered and Unordered Lists</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(listCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, padding: '1.5rem', overflowY: 'auto' }}>
                <h2>My Favorite Fruits (Unordered List)</h2>
                <ul>
                  <li>Apple</li>
                  <li>Banana</li>
                  <li>Orange</li>
                  <li>Mango</li>
                </ul>

                <h2>Steps to Make Tea (Ordered List)</h2>
                <ol>
                  <li>Boil water</li>
                  <li>Add tea leaves</li>
                  <li>Pour in milk</li>
                  <li>Add sugar</li>
                  <li>Serve hot</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleContinue('linksmedia')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'linksmedia' && (
        <Section key="linksmedia" id="linksmedia" eyebrow="Tags" title="Links & Media">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Embed links, images, and other media into your page.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">Links, Images, and Marquee</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(linksMediaCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, padding: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                <h2>1. External Link</h2>
                <p>Visit our website: <a href="https://www.google.com" target="_blank" rel="noreferrer">Go to Google</a></p>

                <h2>2. Image Tag</h2>
                <img src="https://via.placeholder.com/200" alt="Sample Image" style={{ maxWidth: '100%' }} />

                <h2>3. Figure and Figcaption</h2>
                <figure style={{ margin: 0 }}>
                  <img src="https://via.placeholder.com/250" alt="Nature Image" style={{ maxWidth: '100%' }} />
                  <figcaption style={{ fontStyle: 'italic', color: 'gray' }}>This is a beautiful nature picture.</figcaption>
                </figure>

                <h2>4. Marquee Tag</h2>
                <marquee behavior="scroll" direction="left" scrollamount="6" bgcolor="lightyellow" style={{ padding: '5px' }}>Welcome to my HTML Media Page!</marquee>
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleContinue('semantic')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'semantic' && (
        <Section key="semantic" id="semantic" eyebrow="Tags" title="Semantic HTML">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Semantic tags clearly describe their meaning to both the browser and the developer. They define the structure and layout of the webpage.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">Semantic Structure</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(semanticCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, padding: '1.5rem' }}>
                <header style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>
                  <h2 style={{margin:0, fontSize: '1.2rem'}}>My Website</h2>
                  <nav style={{display:'flex', gap:'10px', marginTop: '5px'}}>
                      <a href="#" style={{ color: 'var(--accent-secondary)' }}>Home</a>
                      <a href="#" style={{ color: 'var(--accent-secondary)' }}>About</a>
                  </nav>
                </header>
                <main style={{padding: '15px 0', minHeight: '100px'}}>
                  <article>
                      <h3 style={{margin:0, fontSize: '1rem'}}>Blog Post Title</h3>
                      <p style={{margin:0}}>This is the content of the article.</p>
                  </article>
                </main>
                <footer style={{borderTop: '1px solid #ccc', paddingTop: '10px', fontSize: '12px', color: 'gray'}}>
                  <p style={{margin:0}}>&copy; 2026 My Website</p>
                </footer>
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}
      
      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="Live Coding Lab">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Experiment with both HTML and CSS in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
            <button className="btn btn-outline" onClick={() => openAITutor("My code isn't working in the Live Lab, can you help me debug?")}>Fix my code</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Your First HTML Project">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Combine everything you've learned to build a simple personal profile card using pure HTML inline styling!</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">profile.html</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCode, Prism.languages.markup, 'markup') }} style={{ margin: 0 }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, background: '#f9fafb', padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div dangerouslySetInnerHTML={{ __html: projectCode }} />
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Continue (+20 XP)</button>
            <button className="btn btn-outline" onClick={() => openAITutorLocal("Can you explain how this mini project code works line by line?")}>Ask AI to explain</button>
          </div>
        </Section>
      )}

      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 1 Knowledge Check">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Let's see what you've learned about HTML syntax and tags!</p>
          <Quiz />
        </Section>
      )}

      </AnimatePresence>
      <FloatingAITutor 
        isOpen={tutorOpen} 
        onOpen={() => setTutorOpen(true)}
        onClose={() => setTutorOpen(false)} 
        initialQuestion={initialQuestion} 
      />
    </>
  );
}
