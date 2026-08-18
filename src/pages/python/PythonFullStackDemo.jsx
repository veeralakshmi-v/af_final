import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Database, Layout, Zap, Cpu, Map, Briefcase, 
  ArrowRight, Brain, Layers, Server, Globe, Lightbulb, 
  Sparkles, Star, Terminal, ShieldCheck, Check, Smile, Rocket
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    key={id}
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit="exit"
    className="topic-content"
    style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}
  >
    <div className="section-header" style={{ marginBottom: '2.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem' }}>
      <span className="eyebrow" style={{ color: '#059669', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2.5rem', color: '#0f172a', margin: 0, fontWeight: 800 }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function PythonFullStackDemo({ activeTab, onNavigate }) {

  const handleContinue = (nextTabId) => {
    onNavigate('python_fullstack_demo', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="demo-page" style={{ paddingBottom: '5rem' }}>
      <AnimatePresence mode="wait">
        
        {/* 1. WELCOME TAB */}
        {activeTab === 'intro' && (
          <Section key="intro" id="intro" eyebrow="Beginner's Masterclass" title="Welcome to AI-Powered Python Full Stack">
            <div className="panel">
              
              {/* Hero Banner */}
              <motion.div variants={itemVariants} style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '3rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1.2rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1.5rem' }}>
                    <Sparkles size={16} color="#6ee7b7" /> 140-Day (~5 Months) Complete Job-Ready Program
                  </div>
                  <h3 style={{ fontSize: '2.4rem', margin: '0 0 1rem 0', color: 'white', lineHeight: 1.3, fontWeight: 800 }}>
                    Build Complete Web Apps with <span style={{ color: '#facc15' }}>Python & AI Copilots</span>!
                  </h3>
                  <p style={{ fontSize: '1.2rem', color: '#ecfdf5', maxWidth: '750px', margin: '0 0 1.5rem 0', lineHeight: 1.7 }}>
                    Imagine building your own websites, online stores, and AI software 10 times faster using smart AI assistants like GitHub Copilot and Cursor IDE. We teach you from zero coding knowledge to professional full stack developer!
                  </p>
                  <div style={{ display: 'inline-block', background: 'rgba(250, 204, 21, 0.2)', borderLeft: '4px solid #facc15', padding: '0.8rem 1.2rem', borderRadius: '8px', color: '#fef08a', fontWeight: 600, fontSize: '0.95rem' }}>
                    💡 Simple everyday language! You don't need to be a math genius to master modern web coding.
                  </div>
                </div>
              </motion.div>

              {/* 3 Simple Pillars */}
              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #059669' }}>
                  <div style={{ background: '#ecfdf5', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                    <Layout size={26} color="#059669" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>Frontend + Backend</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6 }}>Learn both what users see on their screen (HTML/React) and the hidden engine running behind the scenes (Python/FastAPI).</p>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #2563eb' }}>
                  <div style={{ background: '#e0f2fe', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                    <Sparkles size={26} color="#0284c7" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>AI-Powered Coding</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6 }}>Use modern AI tools (Cursor IDE, Copilot, ChatGPT) to write boilerplate code, fix bugs instantly, and build apps in days, not months.</p>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #f59e0b' }}>
                  <div style={{ background: '#fef3c7', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                    <Star size={26} color="#d97706" />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>Live Portfolio Projects</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6 }}>Build real production apps—like an AI Blog Platform, an E-Commerce store, and an AI Document Analyzer!</p>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleContinue('what_is_it')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#059669', borderColor: '#059669', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>
                  Next: What is Full Stack? <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
          </Section>
        )}

        {/* 2. WHAT IS IT TAB */}
        {activeTab === 'what_is_it' && (
          <Section key="what_is_it" id="what_is_it" eyebrow="Simple Explanation" title="What is Full Stack Development?">
            <div className="panel">
              <motion.div variants={itemVariants} style={{ background: '#ecfdf5', borderLeft: '5px solid #059669', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', color: '#065f46' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                  <Lightbulb size={22} /> Simple Analogy: Building a Restaurant
                </h4>
                <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1.05rem' }}>
                  Think of building a web app like opening a restaurant! <br/>
                  🎨 <strong>The Frontend (Dining Room)</strong>: The menu, tables, and decorations that customers see and interact with. <br/>
                  🐍 <strong>The Backend (Kitchen)</strong>: Where the chefs (Python code) cook the food, follow recipes, and handle orders. <br/>
                  🗄️ <strong>The Database (Storehouse)</strong>: Where all ingredients, customer records, and bills are safely stored.
                </p>
              </motion.div>

              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                
                {/* Frontend */}
                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2.2rem', borderRadius: '20px', borderTop: '6px solid #3b82f6', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '2rem' }}>🎨</span>
                    <div>
                      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.35rem' }}>Frontend (Client)</h3>
                      <span style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 700 }}>WHAT USERS SEE</span>
                    </div>
                  </div>
                  <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Everything the user touches, clicks, and reads on their computer or mobile phone.
                  </p>
                  <div style={{ background: '#eff6ff', padding: '0.8rem 1rem', borderRadius: '8px', color: '#1e40af', fontWeight: 600, fontSize: '0.9rem' }}>
                    Tools: HTML5, CSS3, React.js, Tailwind
                  </div>
                </motion.div>

                {/* Backend */}
                <motion.div variants={itemVariants} style={{ background: '#f0fdf4', padding: '2.2rem', borderRadius: '20px', borderTop: '6px solid #10b981', border: '1px solid #bbf7d0', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '2rem' }}>🐍</span>
                    <div>
                      <h3 style={{ margin: 0, color: '#065f46', fontSize: '1.35rem' }}>Backend (Server)</h3>
                      <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 800 }}>THE BRAIN & LOGIC</span>
                    </div>
                  </div>
                  <p style={{ color: '#166534', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    The hidden engine that processes login passwords, calculates data, and connects to AI models.
                  </p>
                  <div style={{ background: '#dcfce7', padding: '0.8rem 1rem', borderRadius: '8px', color: '#065f46', fontWeight: 600, fontSize: '0.9rem' }}>
                    Tools: Python, FastAPI, Django, REST APIs
                  </div>
                </motion.div>

                {/* Database */}
                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2.2rem', borderRadius: '20px', borderTop: '6px solid #f59e0b', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '2rem' }}>🗄️</span>
                    <div>
                      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.35rem' }}>Database (Storage)</h3>
                      <span style={{ color: '#d97706', fontSize: '0.85rem', fontWeight: 700 }}>THE MEMORY VAULT</span>
                    </div>
                  </div>
                  <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Where all user accounts, products, blog posts, and transaction histories are securely saved forever.
                  </p>
                  <div style={{ background: '#fffbeb', padding: '0.8rem 1rem', borderRadius: '8px', color: '#92400e', fontWeight: 600, fontSize: '0.9rem' }}>
                    Tools: PostgreSQL, SQLite, SQLAlchemy
                  </div>
                </motion.div>

                {/* DevOps, Git & JSON */}
                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2.2rem', borderRadius: '20px', borderTop: '6px solid #8b5cf6', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '2rem' }}>☁️</span>
                    <div>
                      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.35rem' }}>DevOps, Git & JSON</h3>
                      <span style={{ color: '#7c3aed', fontSize: '0.85rem', fontWeight: 700 }}>THE DELIVERY PIPELINE</span>
                    </div>
                  </div>
                  <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    How data travels between screens using JSON, how teams collaborate without losing code using Git, and how live apps are hosted on cloud servers!
                  </p>
                  <div style={{ background: '#f5f3ff', padding: '0.8rem 1rem', borderRadius: '8px', color: '#5b21b6', fontWeight: 600, fontSize: '0.9rem' }}>
                    Tools: Git, GitHub, JSON, DevOps Hosting, CI/CD
                  </div>
                </motion.div>

              </motion.div>

              {/* What makes it AI Powered? */}
              <motion.div variants={itemVariants} style={{ background: '#0f172a', color: 'white', padding: '2.5rem', borderRadius: '20px', marginBottom: '3rem' }}>
                <h4 style={{ color: '#facc15', fontSize: '1.5rem', marginTop: 0, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={26} color="#facc15" /> What Makes Our Course Truly "AI-Powered"?
                </h4>
                <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.8rem' }}>
                  In traditional courses, you type every line manually and spend days fixing typo errors. In our course, you master the <strong style={{ color: '#facc15' }}>complete AI developer toolstack</strong> to code 10x faster:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.07)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h5 style={{ color: '#facc15', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>🤖 AI Pair-Programmers</h5>
                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>Master <strong style={{ color: '#fff' }}>GitHub Copilot</strong> and <strong style={{ color: '#fff' }}>Cursor IDE</strong> for instant code autocompletion and boilerplate writing.</p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.07)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h5 style={{ color: '#38bdf8', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>🔍 AI Review & Refactoring</h5>
                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>Use automated <strong style={{ color: '#fff' }}>AI Code Review</strong> and <strong style={{ color: '#fff' }}>AI Code Refactoring</strong> to clean messy code and fix security flaws.</p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.07)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h5 style={{ color: '#4ade80', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>🐞 AI Debugging & ChatGPT</h5>
                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>Leverage <strong style={{ color: '#fff' }}>ChatGPT for Developers</strong> for instant <strong style={{ color: '#fff' }}>AI Debugging</strong> and root-cause error fixing.</p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.07)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h5 style={{ color: '#f472b6', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>⚡ Website Gen & Prompts</h5>
                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>Master <strong style={{ color: '#fff' }}>AI Prompt Engineering</strong>, <strong style={{ color: '#fff' }}>AI Productivity Tools</strong>, and <strong style={{ color: '#fff' }}>AI Website Generation</strong> (v0, Bolt, Lovable).</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleContinue('vs')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#059669', borderColor: '#059669', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>
                  Next: Traditional vs AI Coding <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
          </Section>
        )}

        {/* 3. VS TAB */}
        {activeTab === 'vs' && (
          <Section key="vs" id="vs" eyebrow="Side-by-Side Comparison" title="Traditional Coding vs. AI-Powered Coding">
            <div className="panel">
              
              <motion.div variants={itemVariants} style={{ background: '#eff6ff', borderLeft: '5px solid #3b82f6', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', color: '#1e40af' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                  <Lightbulb size={22} /> Simple Analogy: Walking vs. Riding a High-Speed Bullet Train
                </h4>
                <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1.05rem' }}>
                  <strong>Traditional Coding</strong> is like walking across a city on foot—it takes forever, you get tired, and a single roadblock delays your whole journey. <br/>
                  <strong>AI-Powered Coding</strong> is like riding a bullet train! You steer the destination, and AI handles the heavy lifting at 10x speed.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} style={{ overflowX: 'auto', marginBottom: '3rem', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '1.2rem 1.5rem', color: '#334155', fontWeight: 800, width: '22%', fontSize: '0.95rem' }}>FEATURE</th>
                      <th style={{ padding: '1.2rem 1.5rem', color: '#64748b', fontWeight: 800, width: '39%', fontSize: '0.95rem' }}>TRADITIONAL FULL STACK CODING</th>
                      <th style={{ padding: '1.2rem 1.5rem', color: '#059669', fontWeight: 800, width: '39%', background: '#ecfdf5', fontSize: '0.95rem' }}>AI-POWERED CODING (OUR COURSE)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}>Writing Boilerplate Code</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#475569' }}>Type hundreds of lines of repetitive setup code manually</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#065f46', fontWeight: 600, background: '#f0fdf4' }}>AI generates full setup code in 5 seconds with 1 prompt</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}>Fixing Errors & Bugs</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#475569' }}>Stuck for hours searching Google & StackOverflow for missing semicolons</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#065f46', fontWeight: 600, background: '#f0fdf4' }}>AI diagnoses bugs instantly and explains exactly how to fix them</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}>Time to Build an App</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#475569' }}>3 to 6 months for a standard web application</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#065f46', fontWeight: 600, background: '#f0fdf4' }}>2 to 4 weeks for a professional, full-featured web application</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}>Learning Difficulty</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#475569' }}>High syntax memorization required; beginners feel overwhelmed</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#065f46', fontWeight: 600, background: '#f0fdf4' }}>Focus on logic and ideas; AI handles syntax memorization</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}>Job Market Value</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#475569' }}>Standard salaries; facing competition from AI automation</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: '#065f46', fontWeight: 600, background: '#f0fdf4' }}>Top-tier salaries; companies urgently want AI-assisted developers</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>

              <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleContinue('why_important')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#059669', borderColor: '#059669', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>
                  Next: Why Learn This Now? <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
          </Section>
        )}

        {/* 4. WHY IMPORTANT TAB */}
        {activeTab === 'why_important' && (
          <Section key="why_important" id="why_important" eyebrow="Career Advantage" title="Why Learn AI Python Full Stack?">
            <div className="panel">
              <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Python combined with AI Development is currently the **most sought-after skill combination** in software engineering. Here is why this course will transform your career:
              </motion.p>

              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                
                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', borderTop: '6px solid #059669', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#059669', marginBottom: '0.5rem' }}>🐍 #1</div>
                  <h4 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>Python is King of AI</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                    Python is the #1 language for both backend development and artificial intelligence. Learning Python gives you double superpower in today's job market!
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', borderTop: '6px solid #2563eb', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.5rem' }}>⚡ 10x</div>
                  <h4 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>Build 10x Faster</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                    Employers love developers who use AI tools to deliver projects in days rather than months. You become a one-person powerhouse software team!
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', borderTop: '6px solid #f59e0b', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.5rem' }}>🛡️ Future</div>
                  <h4 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.8rem' }}>Future-Proof Career</h4>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                    Don't worry about AI replacing developers—be the engineer who steers and commands AI! This skill ensures you stay high in demand for the next decade.
                  </p>
                </motion.div>

              </motion.div>

              <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleContinue('topics')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#059669', borderColor: '#059669', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>
                  Next: Technologies You Will Learn <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
          </Section>
        )}

        {/* 5. TOPICS TAB */}
        {activeTab === 'topics' && (
          <Section key="topics" id="topics" eyebrow="Software & Tools" title="What Technologies Will You Learn?">
            <div className="panel">
              <motion.p variants={itemVariants} style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                We teach you the modern tech stack used by top Silicon Valley startups and enterprises, explained in simple terms:
              </motion.p>

              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem', marginBottom: '3rem' }}>
                
                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #3b82f6', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layout size={24} color="#3b82f6" /> 1. Modern Frontend
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem' }}>How to build beautiful, responsive web screens that look amazing on computers and phones.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: '#eff6ff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#1e40af', fontWeight: 600, fontSize: '0.95rem' }}>
                      🌐 <strong>HTML5 & CSS3</strong>: The core building blocks of every website.
                    </div>
                    <div style={{ background: '#eff6ff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#1e40af', fontWeight: 600, fontSize: '0.95rem' }}>
                      ⚡ <strong>JavaScript & React.js</strong>: Making web pages interactive and dynamic.
                    </div>
                    <div style={{ background: '#eff6ff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#1e40af', fontWeight: 600, fontSize: '0.95rem' }}>
                      🎨 <strong>Tailwind CSS</strong>: Styling web apps rapidly with clean design rules.
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #10b981', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code size={24} color="#10b981" /> 2. Python Backend Engine
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem' }}>The server logic that powers user logins, data processing, and security.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: '#ecfdf5', padding: '0.6rem 1rem', borderRadius: '8px', color: '#065f46', fontWeight: 600, fontSize: '0.95rem' }}>
                      🐍 <strong>Python 3</strong>: Easiest, most powerful programming language in the world.
                    </div>
                    <div style={{ background: '#ecfdf5', padding: '0.6rem 1rem', borderRadius: '8px', color: '#065f46', fontWeight: 600, fontSize: '0.95rem' }}>
                      ⚡ <strong>FastAPI & Django</strong>: Modern frameworks to build blazing-fast backend servers.
                    </div>
                    <div style={{ background: '#ecfdf5', padding: '0.6rem 1rem', borderRadius: '8px', color: '#065f46', fontWeight: 600, fontSize: '0.95rem' }}>
                      🔗 <strong>RESTful APIs</strong>: Connecting frontend screens to backend kitchen logic.
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #f59e0b', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Database size={24} color="#f59e0b" /> 3. Databases & Cloud Storage
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem' }}>Where all customer records, files, and app data are stored securely.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: '#fffbeb', padding: '0.6rem 1rem', borderRadius: '8px', color: '#92400e', fontWeight: 600, fontSize: '0.95rem' }}>
                      🐘 <strong>PostgreSQL & SQLite</strong>: Reliable relational databases for enterprise apps.
                    </div>
                    <div style={{ background: '#fffbeb', padding: '0.6rem 1rem', borderRadius: '8px', color: '#92400e', fontWeight: 600, fontSize: '0.95rem' }}>
                      🛠️ <strong>SQLAlchemy ORM</strong>: Talk to your database using Python instead of complex SQL queries!
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #8b5cf6', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={24} color="#8b5cf6" /> 4. JSON, Git & DevOps Hosting
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem' }}>How data travels between systems and how production apps are hosted live in the cloud.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: '#f5f3ff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#5b21b6', fontWeight: 600, fontSize: '0.95rem' }}>
                      🔄 <strong>JSON Data Format</strong>: Universal language for transferring web data cleanly.
                    </div>
                    <div style={{ background: '#f5f3ff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#5b21b6', fontWeight: 600, fontSize: '0.95rem' }}>
                      🐙 <strong>Git & GitHub</strong>: Track code changes, collaborate in teams, and build open-source portfolios.
                    </div>
                    <div style={{ background: '#f5f3ff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#5b21b6', fontWeight: 600, fontSize: '0.95rem' }}>
                      ⚙️ <strong>DevOps Basics & CI/CD</strong>: Hosting live on Docker, AWS, Render, and automated CI/CD pipelines!
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #06b6d4', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Brain size={24} color="#06b6d4" /> 5. AI Copilots & Code Review
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem' }}>Your digital assistants that autocomplete code, find bugs, and refactor architecture.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: '#ecfeff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#155e75', fontWeight: 600, fontSize: '0.95rem' }}>
                      🤖 <strong>GitHub Copilot & Cursor IDE</strong>: AI editors that write boilerplate code automatically.
                    </div>
                    <div style={{ background: '#ecfeff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#155e75', fontWeight: 600, fontSize: '0.95rem' }}>
                      🔍 <strong>AI Code Review & Refactoring</strong>: Automatically clean messy code and fix security flaws.
                    </div>
                    <div style={{ background: '#ecfeff', padding: '0.6rem 1rem', borderRadius: '8px', color: '#155e75', fontWeight: 600, fontSize: '0.95rem' }}>
                      🐞 <strong>AI Debugging & Testing</strong>: Instant root-cause error analysis and automated test writing.
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '5px solid #ec4899', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={24} color="#ec4899" /> 6. Productivity & Website Gen
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem' }}>Next-generation tools to generate UI components and automate workflow tasks.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: '#fdf2f8', padding: '0.6rem 1rem', borderRadius: '8px', color: '#9d174d', fontWeight: 600, fontSize: '0.95rem' }}>
                      💬 <strong>ChatGPT for Developers</strong>: Master AI prompt engineering to 10x your coding output.
                    </div>
                    <div style={{ background: '#fdf2f8', padding: '0.6rem 1rem', borderRadius: '8px', color: '#9d174d', fontWeight: 600, fontSize: '0.95rem' }}>
                      🎨 <strong>AI Website Generation</strong>: Using v0, Bolt, and Lovable to create web UIs from text prompts!
                    </div>
                    <div style={{ background: '#fdf2f8', padding: '0.6rem 1rem', borderRadius: '8px', color: '#9d174d', fontWeight: 600, fontSize: '0.95rem' }}>
                      ⚡ <strong>AI Productivity Tools</strong>: Automating repetitive tasks, docs, and git commits seamlessly.
                    </div>
                  </div>
                </motion.div>

              </motion.div>

              <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleContinue('syllabus')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#059669', borderColor: '#059669', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>
                  Next: Your 140-Day Roadmap <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
          </Section>
        )}

        {/* 6. SYLLABUS TAB */}
        {activeTab === 'syllabus' && (
          <Section key="syllabus" id="syllabus" eyebrow="Step-by-Step Curriculum" title="Your Comprehensive Learning Path (140 Days / ~5 Months)">
            <div className="panel">
              <motion.p variants={itemVariants} style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                We break everything down into 6 intensive, structured modules designed to take you from complete beginner to full-stack architect:
              </motion.p>

              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                
                {/* Phase 1 */}
                <motion.div variants={itemVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', borderTop: '5px solid #3b82f6' }}>
                  <div style={{ background: '#eff6ff', padding: '1.2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Phase 1 • Min 3 Months (90 Days)</span>
                    <h4 style={{ margin: '0.3rem 0 0', color: '#0f172a', fontSize: '1.2rem' }}>Frontend Development & Version Control</h4>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <ul style={{ paddingLeft: '1.2rem', margin: '0 0 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <li>Master HTML5, CSS3, Flexbox, CSS Grid, and responsive UI layouts</li>
                      <li>Learn JavaScript (ES6+), DOM manipulation, React.js & State Management</li>
                      <li>Work with <strong>JSON</strong> data formats and API consumption cleanly</li>
                      <li>Master <strong>Git & GitHub</strong> version control, branching, and team collaboration</li>
                    </ul>
                    <div style={{ background: '#eff6ff', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '3px solid #3b82f6', fontSize: '0.9rem', fontWeight: 700, color: '#1e40af' }}>
                      🏆 Project 1: Full-Featured Responsive React Portal & Git Portfolio
                    </div>
                  </div>
                </motion.div>

                {/* Phase 2 */}
                <motion.div variants={itemVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', borderTop: '5px solid #10b981' }}>
                  <div style={{ background: '#ecfdf5', padding: '1.2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Phase 2 • 15 Days</span>
                    <h4 style={{ margin: '0.3rem 0 0', color: '#0f172a', fontSize: '1.2rem' }}>Core Python Programming Engine</h4>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <ul style={{ paddingLeft: '1.2rem', margin: '0 0 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <li>Python syntax from scratch: variables, data types, loops, and functions</li>
                      <li>Deep dive into data structures: Lists, Dictionaries, Tuples, and Sets</li>
                      <li>Object-Oriented Programming (OOP), classes, inheritance, and modules</li>
                      <li>Exception handling, file operations, and building automated scripts</li>
                    </ul>
                    <div style={{ background: '#f0fdf4', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '3px solid #10b981', fontSize: '0.9rem', fontWeight: 700, color: '#065f46' }}>
                      🏆 Project 2: Automated Data Processing & Logic Engine
                    </div>
                  </div>
                </motion.div>

                {/* Phase 3 */}
                <motion.div variants={itemVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', borderTop: '5px solid #f59e0b' }}>
                  <div style={{ background: '#fffbeb', padding: '1.2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>Phase 3 • 15 Days</span>
                    <h4 style={{ margin: '0.3rem 0 0', color: '#0f172a', fontSize: '1.2rem' }}>Django Framework & REST APIs</h4>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <ul style={{ paddingLeft: '1.2rem', margin: '0 0 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <li>Build robust backend servers using <strong>Django</strong> and Django REST Framework</li>
                      <li>URL routing, view functions, class-based views, and middleware logic</li>
                      <li>Design secure user authentication (Login, Signup, JWT Token Auth)</li>
                      <li>Connect frontend React components to backend Django API endpoints</li>
                    </ul>
                    <div style={{ background: '#fffbeb', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b', fontSize: '0.9rem', fontWeight: 700, color: '#92400e' }}>
                      🏆 Project 3: Enterprise REST API Backend for E-Commerce
                    </div>
                  </div>
                </motion.div>

                {/* Phase 4 */}
                <motion.div variants={itemVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', borderTop: '5px solid #06b6d4' }}>
                  <div style={{ background: '#ecfeff', padding: '1.2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0891b2', textTransform: 'uppercase' }}>Phase 4 • 10 Days</span>
                    <h4 style={{ margin: '0.3rem 0 0', color: '#0f172a', fontSize: '1.2rem' }}>SQL Databases & Storage Architecture</h4>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <ul style={{ paddingLeft: '1.2rem', margin: '0 0 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <li>Master SQL queries: SELECT, INSERT, UPDATE, DELETE, Joins, and Aggregations</li>
                      <li>Relational database design, ER Modeling, Primary Keys, and Foreign Keys</li>
                      <li>Work with production databases: PostgreSQL and SQLite</li>
                      <li>Connect Django models using ORM (Object-Relational Mapping) without raw SQL</li>
                    </ul>
                    <div style={{ background: '#ecfeff', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '3px solid #06b6d4', fontSize: '0.9rem', fontWeight: 700, color: '#155e75' }}>
                      🏆 Project 4: Multi-Table E-Commerce Database Architecture
                    </div>
                  </div>
                </motion.div>

                {/* Phase 5 */}
                <motion.div variants={itemVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', borderTop: '5px solid #8b5cf6' }}>
                  <div style={{ background: '#f5f3ff', padding: '1.2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Phase 5 • 5 Days</span>
                    <h4 style={{ margin: '0.3rem 0 0', color: '#0f172a', fontSize: '1.2rem' }}>DevOps Basics, Cloud Hosting & CI/CD</h4>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <ul style={{ paddingLeft: '1.2rem', margin: '0 0 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <li>Introduction to DevOps culture, containerization basics with Docker & environment configs</li>
                      <li>Deploy backend servers and SQL databases live to cloud hosting (AWS, Render)</li>
                      <li>Deploy frontend React apps to Vercel and connect custom domain names</li>
                      <li><strong>CI/CD Pipelines:</strong> Automated testing and continuous deployment on git push</li>
                    </ul>
                    <div style={{ background: '#faf5ff', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '3px solid #8b5cf6', fontSize: '0.9rem', fontWeight: 700, color: '#5b21b6' }}>
                      🏆 Project 5: Live Production Deployment of Your Full Stack App
                    </div>
                  </div>
                </motion.div>

                {/* Phase 6 */}
                <motion.div variants={itemVariants} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', borderTop: '5px solid #ec4899' }}>
                  <div style={{ background: '#fdf2f8', padding: '1.2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#db2777', textTransform: 'uppercase' }}>Phase 6 • 5 Days</span>
                    <h4 style={{ margin: '0.3rem 0 0', color: '#0f172a', fontSize: '1.2rem' }}>Advanced AI Integration & Tooling Suite</h4>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <ul style={{ paddingLeft: '1.2rem', margin: '0 0 1.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <li><strong>AI Copilots:</strong> Master Cursor IDE & GitHub Copilot for rapid autocompletion</li>
                      <li><strong>AI Review & Debugging:</strong> Automated code refactoring, bug scanning & ChatGPT debugging</li>
                      <li><strong>Website Generation:</strong> Create UI components from text using v0, Bolt & Lovable</li>
                      <li><strong>Prompt Engineering:</strong> Master AI productivity tools to automate developer workflows</li>
                    </ul>
                    <div style={{ background: '#fdf2f8', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: '3px solid #ec4899', fontSize: '0.9rem', fontWeight: 700, color: '#9d174d' }}>
                      🏆 Capstone Project: AI-Powered Smart SaaS Web Application
                    </div>
                  </div>
                </motion.div>

              </motion.div>

              <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleContinue('jobs')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#059669', borderColor: '#059669', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>
                  Next: Career Paths & Jobs <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
          </Section>
        )}

        {/* 7. JOBS TAB */}
        {activeTab === 'jobs' && (
          <Section key="jobs" id="jobs" eyebrow="Exciting Careers" title="Where Can You Work After This Course?">
            <div className="panel">
              <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Graduating as an **AI-Powered Python Full Stack Developer** makes you one of the most versatile engineers in the software industry:
              </motion.p>

              <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem', marginBottom: '3rem' }}>
                
                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #059669', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>🐍 Python Full Stack Engineer</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Design and build complete web applications, managing both the user interface and the backend server logic.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #2563eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>🤖 AI Web App Developer</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Build modern software that embeds ChatGPT, Gemini, and custom AI copilots into everyday business tools and websites.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #10b981', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>⚙️ Backend Python Developer</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Specialize in building fast APIs, managing databases, and creating secure backend infrastructure using FastAPI and Django.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #f59e0b', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>💡 Software Solutions Engineer</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Work with clients and tech teams to design custom web software solutions that automate their business workflows.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #8b5cf6', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>☁️ DevOps & Cloud Engineer</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Manage live cloud hosting (Docker, AWS, Render), configure CI/CD automated deployment pipelines, and ensure servers scale reliably.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #06b6d4', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>🗄️ Database & API Architect</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Design high-performance relational SQL databases, write optimized queries, and structure RESTful JSON APIs for web and mobile apps.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #ec4899', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>🎨 Frontend React & UI Specialist</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Craft stunning, responsive user interfaces using HTML5, CSS Grid, JavaScript, React.js, and integrate AI-generated web components.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} whileHover={{ y: -6 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '6px solid #6366f1', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>🚀 AI Prompt & Automation Engineer</h3>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                    <strong>What you do:</strong> Leverage AI pair-programmers (Copilot, Cursor IDE) and prompt engineering to automate developer workflows and boost team coding speed 10x.
                  </p>
                </motion.div>

              </motion.div>

              <motion.div variants={itemVariants} style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', padding: '3rem', borderRadius: '24px', color: 'white', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
                <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', color: 'white', fontWeight: 800 }}>Ready to Master AI Python Full Stack?</h3>
                <p style={{ color: '#d1fae5', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                  Join our job-ready 140-Day (~5 Month) program, build professional full stack applications, and supercharge your coding speed with AI!
                </p>
                <button className="btn btn-primary" onClick={() => onNavigate('python_fullstack_demo', 'intro')} style={{ padding: '1.1rem 2.8rem', fontSize: '1.15rem', background: '#facc15', borderColor: '#facc15', color: '#0f172a', fontWeight: 800, borderRadius: '30px', boxShadow: '0 4px 15px rgba(250, 204, 21, 0.4)' }}>
                  Restart Induction Demo 🔄
                </button>
              </motion.div>
            </div>
          </Section>
        )}

      </AnimatePresence>
    </div>
  );
}
