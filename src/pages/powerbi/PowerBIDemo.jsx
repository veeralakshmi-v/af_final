import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Target, Layers, Briefcase, Map, BarChart, Code, FileText, CheckCircle, Zap, Eye, Brain, Rocket, TrendingUp, Building2, UserCircle2, PieChart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: -20 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="show"
    exit="exit"
    className="learning-card"
  >
    <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--accent-primary)', fontWeight: 800 }}>{title}</h2>
    </motion.div>
    {children}
  </motion.div>
);

export default function PowerBIDemo({ activeTab, onNavigate }) {

  const handleContinue = (nextTabId) => {
    onNavigate('powerbi_demo', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCourse = () => {
    onNavigate('powerbi_module1', 'intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Introduction" title="Welcome to AI-Powered Data Analytics">
          <div className="panel">
            <motion.div variants={itemVariants} style={{ position: 'relative', height: '350px', borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <img src="/images/data_revolution.png" alt="Data Revolution" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>Your first step into the world of Data.</h3>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8 }}>
              Welcome to the Demo Session! In the next 60 minutes, we are going to explore exactly what Data Analytics is, why it is one of the highest-paying careers in the world today, and how you can master it.
            </motion.p>

            <motion.div variants={itemVariants} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '16px', marginBottom: '2.5rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>What we will cover today:</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}><CheckCircle size={18} color="#3b82f6" /> What is Data Analytics?</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}><CheckCircle size={18} color="#3b82f6" /> The difference between Analysis and Analytics</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}><CheckCircle size={18} color="#3b82f6" /> The tools you will learn (Coding vs Non-Coding)</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}><CheckCircle size={18} color="#3b82f6" /> Job opportunities and salaries</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('what_is_it')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Let's Begin</button>
            </motion.div>
          </div>
        </Section>
      )}

      {activeTab === 'what_is_it' && (
        <Section key="what_is_it" id="what_is_it" eyebrow="Definition" title="What is Data Analytics?">
          <div className="panel">
            <motion.p variants={itemVariants} style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              At its core, Data Analytics is the process of taking raw, messy data and turning it into clear, useful information that helps companies make smart decisions.
            </motion.p>

            <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <Database size={40} color="#64748b" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>1. Collect</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Gathering raw numbers from sales, websites, or apps.</p>
              </motion.div>
              <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <Zap size={40} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>2. Clean & Find Patterns</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Fixing errors and using math to find hidden trends.</p>
              </motion.div>
              <motion.div variants={itemVariants} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <BarChart size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>3. Solve Problems</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Creating beautiful charts to tell the company what to do next.</p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('vs')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Next: Analysis vs Analytics</button>
            </motion.div>
          </div>
        </Section>
      )}

      {activeTab === 'vs' && (
        <Section key="vs" id="vs" eyebrow="Concept" title="Data Analysis vs. Data Analytics">
          <div className="panel">
            <motion.p variants={itemVariants} style={{ marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              These two words sound the same, but they mean very different things in the industry. It is important to know the difference.
            </motion.p>
            
            <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              
              <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', background: '#f8fafc', padding: '2rem', borderRadius: '16px', borderTop: '6px solid #64748b' }}>
                <Eye size={40} color="#475569" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Data Analysis (The Past)</h3>
                  <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>Looking backwards. This is the process of reviewing data from the past to understand <strong>what happened</strong> and <strong>why it happened</strong>. <br/><br/><em>Example: "Our sales went down by 10% last month because our website was broken for two days."</em></p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', background: '#eff6ff', padding: '2rem', borderRadius: '16px', borderTop: '6px solid #2563eb' }}>
                <Brain size={40} color="#2563eb" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Data Analytics (The Future)</h3>
                  <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>Looking forwards. This involves using math, statistics, and programming to predict <strong>what will happen</strong> and <strong>what we should do about it</strong>. <br/><br/><em>Example: "Based on our past data, we predict a 20% increase in sales next month, so we should order more inventory now."</em></p>
                </div>
              </motion.div>

            </motion.div>

            <motion.div variants={itemVariants} className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('why_important')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Next: Why is it important?</button>
            </motion.div>
          </div>
        </Section>
      )}

      {activeTab === 'why_important' && (
        <Section key="why_important" id="why_important" eyebrow="The Market" title="Why is it important nowadays?">
          <div className="panel">
            <motion.p variants={itemVariants} style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              We generate more data today in a single hour than we did in an entire year just a decade ago. Companies are drowning in data, but starving for insights.
            </motion.p>

            <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <TrendingUp size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Better Decisions</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Companies no longer guess what customers want. They know exactly what they want based on the data.</p>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <Target size={40} color="#3b82f6" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Cost Reduction</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Analytics helps businesses identify where they are wasting money and how to become more efficient.</p>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <Briefcase size={40} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Massive Job Growth</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Because every industry needs data, Analytics is one of the fastest-growing and highest-paying jobs globally.</p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('topics')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>See the Course Topics</button>
            </motion.div>
          </div>
        </Section>
      )}

      {activeTab === 'topics' && (
        <Section key="topics" id="topics" eyebrow="Curriculum" title="What topics will you cover?">
          <div className="panel">
            <motion.p variants={itemVariants} style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              To become a professional Data Analyst or Engineer, you need a complete toolkit. <strong>Both our Coding and Non-Coding layers cover essential languages like Python and SQL</strong> alongside visual industry leaders!
            </motion.p>

            <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              
              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <FileText size={36} color="#2563eb" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Advanced Excel</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>The universal starting point. Learn Pivot Tables, VLOOKUPs, and data structure.</p>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <Database size={36} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>SQL Databases</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>The language used to talk directly to large company databases to extract information.</p>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <Code size={36} color="#7c3aed" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Python Programming</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Writing code to automate boring tasks and analyze massive datasets much faster.</p>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <BarChart size={36} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Power BI</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Microsoft's tool for cleaning data and creating interactive business dashboards.</p>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <PieChart size={36} color="#e11d48" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tableau</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>The industry leader for drag-and-drop, highly beautiful visual analytics.</p>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <Brain size={36} color="#06b6d4" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Statistics & Packages</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Using Pandas and NumPy to perform advanced statistical math and predictive analysis.</p>
              </motion.div>

            </motion.div>

            {/* Why makes it AI Powered? */}
            <motion.div variants={itemVariants} style={{ background: '#0f172a', color: 'white', padding: '2.5rem', borderRadius: '20px', marginBottom: '3rem', marginTop: '1rem' }}>
              <h4 style={{ color: '#facc15', fontSize: '1.4rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={24} color="#facc15" /> Why is this Course "AI-Powered"?
              </h4>
              <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
                In modern data teams, analysts don't spend hours writing complex DAX formulas or Excel macros from scratch. We teach you how to use <strong style={{ color: '#facc15' }}>AI Copilots in Power BI & Excel (Microsoft Copilot, ChatGPT for DAX, and AI Visuals)</strong>! You will learn how to ask questions in plain English (e.g., "Show me top 5 products by profit margin") and let AI generate formulas, clean data, and create dashboards instantly!
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="card-actions">
              <button className="btn btn-primary" onClick={() => handleContinue('paths')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>See Your Learning Paths</button>
            </motion.div>
          </div>
        </Section>
      )}

      {activeTab === 'paths' && (
        <Section key="paths" id="paths" eyebrow="Roadmap" title="Your Learning Path">
          <div className="panel">
            <motion.p variants={itemVariants} style={{ marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              Because everyone's career goals are different, we offer two distinct learning paths. You can choose to focus purely on visual tools, or dive deep into the coding side.
            </motion.p>
            
            <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              
              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                <div style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)', padding: '1.5rem', color: 'white', textAlign: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>Non-Coding Track</h3>
                  <p style={{ margin: '0.5rem 0 0', color: '#bfdbfe', fontSize: '0.95rem' }}>For aspiring Data & Business Analysts</p>
                </div>
                <div style={{ padding: '2rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Advanced Excel</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>SQL</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Python (Basics)</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Power BI</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Tableau</span></li>
                  </ul>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5 }} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                <div style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', padding: '1.5rem', color: 'white', textAlign: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>Coding Track</h3>
                  <p style={{ margin: '0.5rem 0 0', color: '#ddd6fe', fontSize: '0.95rem' }}>For aspiring Data Scientists & Engineers</p>
                </div>
                <div style={{ padding: '2rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Advanced Excel</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>SQL</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Python (Advanced)</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Power BI</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Statistics</span></li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="#10b981" /> <span style={{ color: '#334155', fontWeight: 500 }}>Python Packages</span></li>
                  </ul>
                </div>
              </motion.div>

            </motion.div>

            <motion.div variants={itemVariants} className="card-actions" style={{ marginTop: '2rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('jobs')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Next: Jobs & Industries</button>
            </motion.div>
          </div>
        </Section>
      )}

      {activeTab === 'jobs' && (
        <Section key="jobs" id="jobs" eyebrow="Careers" title="Jobs & Industries">
          <div className="panel">
            <motion.div variants={itemVariants} style={{ position: 'relative', height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <img src="/images/analytics_journey.png" alt="Analytics Journey" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15, 23, 42, 0.9), transparent, rgba(15,23,42,0.9))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: 700, textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}>Where will you work?</h3>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} style={{ marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              The beauty of Data Analytics is that every single industry in the world needs you. Here is where you can work and what your job title might be.
            </motion.p>
            
            <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              
              <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                  <UserCircle2 size={24} color="#8b5cf6" /> Job Titles
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#475569' }}>
                  <li>• Data Analyst</li>
                  <li>• Business Analyst</li>
                  <li>• BI Developer</li>
                  <li>• Data Scientist</li>
                  <li>• Financial Analyst</li>
                  <li>• Marketing Analyst</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                  <Building2 size={24} color="#f59e0b" /> Industries
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#475569' }}>
                  <li>• Finance & Banking</li>
                  <li>• Healthcare & Hospitals</li>
                  <li>• E-commerce & Retail</li>
                  <li>• Tech & Software</li>
                  <li>• Sports & Entertainment</li>
                  <li>• Supply Chain & Logistics</li>
                </ul>
              </motion.div>

            </motion.div>

            <motion.div variants={itemVariants} className="card-actions" style={{ marginTop: '2rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={handleStartCourse} style={{ padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 600, background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                Start Your Career Now →
              </button>
            </motion.div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
