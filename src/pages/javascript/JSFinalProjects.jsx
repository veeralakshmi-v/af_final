import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, PenTool, Layers, Zap, BookOpen, Target } from 'lucide-react';

const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function JSFinalProjects({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_final_projects', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <AnimatePresence mode="wait">

      {/* ════════════════ TOPIC 1: WEATHER APP ════════════════ */}
      {activeTab === 'project_weather' && (
        <Section eyebrow="Capstone Topic 01" title="Interactive Weather Forecast Dashboard">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Build a weather application that dynamically updates metrics and graphics based on searched location keywords using a weather forecast lookup engine model.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>📋 Technical Requirements</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>HTML Structure</strong>: Input search field, search trigger button, weather detail cards, and a toggle button for units. Use Bootstrap grid alignment.</li>
              <li><strong>Styling (CSS & Bootstrap)</strong>: Apply color gradients that change according to weather states (e.g. warm orange for sunny, cold blue for rainy). Use Bootstrap <code>.card</code> components and responsive columns.</li>
              <li><strong>JavaScript Core</strong>:
                <br />• Select elements and configure click event handlers on buttons.
                <br />• Mock or call a weather fetch API retrieving object values (temperature, description, wind speed, humidity).
                <br />• Implement a Celsius/Fahrenheit conversion formula returning updated numbers.
                <br />• Use <code>localStorage</code> to store searched cities and render a "Recently Searched" history sidebar list.
              </li>
            </ul>
          </div>
        </Section>
      )}

      {/* ════════════════ TOPIC 2: SHOPPING CART ════════════════ */}
      {activeTab === 'project_cart' && (
        <Section eyebrow="Capstone Topic 02" title="E-Commerce Shopping Portal with Dynamic Cart">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Develop a customer product ordering screen that manages product quantities, updates bill receipts, and handles coupon deductions dynamically.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>📋 Technical Requirements</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>HTML Structure</strong>: Product listing grid with add buttons, sidebar cart container list, subtotal nodes, promo input form, and check out trigger button.</li>
              <li><strong>Styling (CSS & Bootstrap)</strong>: Use Bootstrap cards for product listings and list-groups for cart summaries. Add hover transition effects on product items.</li>
              <li><strong>JavaScript Core</strong>:
                <br />• Maintain a global cart array of objects.
                <br />• Write functions to append items, increment/decrement quantities, and delete items from cart list.
                <br />• Compute subtotal using helper methods (like <code>reduce()</code>).
                <br />• Apply discounts when promotional codes are inputted (`SAVE10` = 10% off).
                <br />• Display final grand totals including 18% GST tax nodes.
              </li>
            </ul>
          </div>
        </Section>
      )}

      {/* ════════════════ TOPIC 3: KANBAN BOARD ════════════════ */}
      {activeTab === 'project_kanban' && (
        <Section eyebrow="Capstone Topic 03" title="Task Management Kanban Board">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Construct a project tracking board containing task columns representing progress phases (e.g. To Do, In Progress, Done) and manage dynamic columns state transitions.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>📋 Technical Requirements</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>HTML Structure</strong>: Three columns aligned horizontally on desktop (using Bootstrap row/col structures), inputs to create tasks, and category headers.</li>
              <li><strong>Styling (CSS & Bootstrap)</strong>: Custom column styles with scroll containers. Card-based tasks with colored markers designating priority levels (high, medium, low).</li>
              <li><strong>JavaScript Core</strong>:
                <br />• Use functions to append new task card items dynamically.
                <br />• Provide movement buttons (arrows) to change task category column states (move to In Progress or Done).
                <br />• Save board status configurations in <code>localStorage</code> to preserve state across page reloads.
              </li>
            </ul>
          </div>
        </Section>
      )}

      {/* ════════════════ TOPIC 4: QUIZ APP ════════════════ */}
      {activeTab === 'project_quiz' && (
        <Section eyebrow="Capstone Topic 04" title="Interactive Quiz Portal with Scorecards">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Design a quiz application that steps through multiple-choice questions, counts scores, and records completion performance details.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>📋 Technical Requirements</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>HTML Structure</strong>: Question display container card, multiple choice options container, next button, timer node, and result scoreboard element.</li>
              <li><strong>Styling (CSS & Bootstrap)</strong>: Use Bootstrap progress-bars to indicate quiz progress. Apply color indicators (green/red) when choice button is clicked.</li>
              <li><strong>JavaScript Core</strong>:
                <br />• Store questions list as array of objects containing choices and correct answers.
                <br />• Build step indicators to transition slides forward when clicked.
                <br />• Set <code>setInterval</code> counters to enforce time limits per question.
                <br />• Calculate final score metrics and render a summary card indicating grade performance.
              </li>
            </ul>
          </div>
        </Section>
      )}

      {/* ════════════════ TOPIC 5: CONTACT PORTAL ════════════════ */}
      {activeTab === 'project_contacts' && (
        <Section eyebrow="Capstone Topic 05" title="Contact Management Hub with Search Filters">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Build a contact repository dashboard that creates, updates, deletes, and filters user details based on contact category tags.</p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>📋 Technical Requirements</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><strong>HTML Structure</strong>: Form inputs (name, email, phone, tag select), search field filter, contact directory tables, and modal overlays for full contact details.</li>
              <li><strong>Styling (CSS & Bootstrap)</strong>: Bootstrap table layout configurations with colored category badges (e.g. green for Work, blue for Family). Responsive grid forms.</li>
              <li><strong>JavaScript Core</strong>:
                <br />• Maintain lists inside an object array.
                <br />• Add event listeners to input search fields filtering tables using string matching methods (e.g. <code>includes()</code>) in real-time.
                <br />• Implement add, delete, and detail modal viewing logic using event bindings.
                <br />• Store contacts inside <code>localStorage</code> to maintain data persistence.
              </li>
            </ul>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
