import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function HTMLProject({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    if (nextSectionId === 'module3') {
      onNavigate('module3', 'intro');
    } else {
      onNavigate('html_project', nextSectionId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {activeTab === 'topic1' && (
        <Section key="topic1" id="topic1" eyebrow="Topic 1" title="Personal Portfolio Website">
          <div className="panel">
            <p><strong>Goal:</strong> Build a complete personal portfolio using only HTML.</p>
            <p><strong>Requirements:</strong></p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>A proper header with navigation links (anchor tags).</li>
              <li>An "About Me" section featuring your photo (image tag) and a brief biography.</li>
              <li>A "Projects" section using lists to detail your previous work.</li>
              <li>A "Contact" section containing a form (name, email, message, and submit button).</li>
              <li>Use semantic tags like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code>.</li>
            </ul>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('topic2')}>Continue to Topic 2</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'topic2' && (
        <Section key="topic2" id="topic2" eyebrow="Topic 2" title="Restaurant Menu Page">
          <div className="panel">
            <p><strong>Goal:</strong> Create an elegant online menu for a restaurant.</p>
            <p><strong>Requirements:</strong></p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Use an HTML <strong>Table</strong> to display the menu items, descriptions, and prices.</li>
              <li>Categorize the menu into sections like Starters, Main Courses, and Desserts.</li>
              <li>Include images of signature dishes.</li>
              <li>Add a form at the bottom for table reservations (date, time, number of guests).</li>
            </ul>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('topic3')}>Continue to Topic 3</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'topic3' && (
        <Section key="topic3" id="topic3" eyebrow="Topic 3" title="Event Registration Form">
          <div className="panel">
            <p><strong>Goal:</strong> Build a comprehensive, multi-step registration form for an upcoming tech conference.</p>
            <p><strong>Requirements:</strong></p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Utilize various input types: text, email, password, radio buttons (for ticket types), checkboxes (for workshops), and a dropdown select menu (for t-shirt size).</li>
              <li>Group related form fields together using the <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> tags.</li>
              <li>Include an iframe embedding a Google Map showing the venue location.</li>
            </ul>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('topic4')}>Continue to Topic 4</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'topic4' && (
        <Section key="topic4" id="topic4" eyebrow="Topic 4" title="Product Landing Page">
          <div className="panel">
            <p><strong>Goal:</strong> Create a landing page for a fictional new gadget.</p>
            <p><strong>Requirements:</strong></p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>A hero section with a large product image and a compelling headline.</li>
              <li>Embed a promotional video (using the <code>&lt;video&gt;</code> tag or an embedded YouTube <code>&lt;iframe&gt;</code>).</li>
              <li>A feature list using an unordered list.</li>
              <li>A "Buy Now" button linked to a dummy checkout form page.</li>
            </ul>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('topic5')}>Continue to Topic 5</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'topic5' && (
        <Section key="topic5" id="topic5" eyebrow="Topic 5" title="News Article Layout">
          <div className="panel">
            <p><strong>Goal:</strong> Replicate the structure of a standard blog or news website article.</p>
            <p><strong>Requirements:</strong></p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Use strong semantic HTML5: <code>&lt;article&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;figure&gt;</code>, <code>&lt;figcaption&gt;</code>, and <code>&lt;aside&gt;</code>.</li>
              <li>Include blockquotes for quotes within the article.</li>
              <li>Create a sidebar (using <code>&lt;aside&gt;</code>) containing links to "Related Articles".</li>
              <li>Add an ordered list at the bottom for the bibliography or references.</li>
            </ul>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => {
                if (typeof window.JSConfetti !== 'undefined') {
                  const confetti = new window.JSConfetti();
                  confetti.addConfetti({ emojis: ['🎉', '🚀', '🔥'], confettiNumber: 30 });
                }
                handleContinue('module3');
              }}>Finish Project & Proceed to Day 3</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
