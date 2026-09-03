import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Code, Play, CheckCircle, ArrowRight, Table, Layers, Zap, Eye, Lock, BookOpen, Clock, AlertTriangle } from 'lucide-react';

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

export default function SQLDay8({ activeTab, onNavigate }) {
  // Subqueries interactive state
  const [selectedSubquery, setSelectedSubquery] = useState('simple');
  const [subqueryRan, setSubqueryRan] = useState(false);

  // Views simple interactive state
  const [showViewResult, setShowViewResult] = useState(false);

  // Indexes simple interactive state
  const [useIndex, setUseIndex] = useState(true);
  const [indexRan, setIndexRan] = useState(false);

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module8', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {/* ========================================================= */}
      {/* 1. SUBQUERIES TAB (BEGINNER FRIENDLY) */}
      {/* ========================================================= */}
      {activeTab === 'subqueries' && (
        <Section key="subqueries" id="subqueries" eyebrow="Day 8 • Topic 1" title="Subqueries (Nested Queries)">
          <div className="panel">
            
            {/* Simple Concept Card */}
            <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#1e40af', margin: '0 0 0.5rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={20} color="#3b82f6" /> What is a Subquery?
              </h3>
              <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.6' }}>
                A <strong>Subquery</strong> is simply a <strong>Query inside another Query</strong>! 
                SQL executes the inner query first, and then passes its answer to the outer query.
              </p>
            </div>

            {/* 3 Main Types for Beginners */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>The 3 Simple Subquery Types</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' }}>Type 1</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>Single Value Subquery</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Inner query returns 1 single number or text.</p>
                <pre style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#38bdf8', overflowX: 'auto', margin: 0 }}>
                  <code>SELECT * FROM Employees<br/>WHERE salary &gt; (SELECT AVG(salary) FROM Employees);</code>
                </pre>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Type 2</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>Multiple Values (IN)</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Inner query returns a list of values using <code>IN</code>.</p>
                <pre style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#6ee7b7', overflowX: 'auto', margin: 0 }}>
                  <code>SELECT * FROM Employees<br/>WHERE dept_id IN (SELECT id FROM Departments WHERE city='NY');</code>
                </pre>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase' }}>Type 3</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>Subquery in SELECT</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Adds a calculated column next to every row.</p>
                <pre style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#c4b5fd', overflowX: 'auto', margin: 0 }}>
                  <code>SELECT name, salary,<br/>(SELECT AVG(salary) FROM Employees) AS company_avg<br/>FROM Employees;</code>
                </pre>
              </div>

            </div>

            {/* Simple Try-It-Out Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Play size={16} color="#3b82f6" fill="#3b82f6" /> Beginner Demo: Find Employees Earning Above Average
                </h4>
                <button
                  onClick={() => setSubqueryRan(true)}
                  style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Run Query
                </button>
              </div>

              <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>
                <code>-- Step 1: (SELECT AVG(salary) FROM Emp) evaluates to $65,000&#10;SELECT name, dept, salary FROM Employees WHERE salary &gt; 65000;</code>
              </pre>

              {subqueryRan && (
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#15803d', display: 'block', marginBottom: '0.5rem' }}>✓ Result Output (2 Employees Found)</span>
                  <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Dept</th>
                        <th style={{ padding: '6px', textAlign: 'right' }}>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px', fontWeight: 600 }}>Alice Smith</td>
                        <td style={{ padding: '6px', color: '#64748b' }}>Engineering</td>
                        <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>$85,000</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '6px', fontWeight: 600 }}>Carol White</td>
                        <td style={{ padding: '6px', color: '#64748b' }}>Engineering</td>
                        <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>$92,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('views')}>Next: SQL Views &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 2. VIEWS TAB (SUPER SIMPLE & CLEAR FOR BEGINNERS) */}
      {/* ========================================================= */}
      {activeTab === 'views' && (
        <Section key="views" id="views" eyebrow="Day 8 • Topic 2" title="SQL Views (Virtual Tables)">
          <div className="panel">
            
            {/* Beginner Explanation */}
            <div style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={20} color="#10b981" /> What is a View? (Simple Analogy)
              </h3>
              <p style={{ margin: 0, color: '#14532d', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Think of a <strong>View</strong> as a <strong>"Saved Bookmark"</strong> or a <strong>"Virtual Window"</strong> into your data. 
                It does <strong>not</strong> duplicate data on disk—it simply saves a query so you can re-use it anytime like a table!
              </p>
            </div>

            {/* Why Use Views? 2 Easy Reasons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.4rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={16} color="#3b82f6" /> 1. Hide Sensitive Data
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                  Show employee names to staff, but hide sensitive fields like Social Security Numbers or Passwords!
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.4rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={16} color="#10b981" /> 2. Make Queries Easy
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                  Save long, complex queries once so you can just type <code>SELECT * FROM MyView;</code> later!
                </p>
              </div>
            </div>

            {/* Simple View Syntax (Only 3 Lines to Learn) */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>The 3 Commands to Know</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              
              {/* CREATE VIEW */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' }}>Command 1</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>CREATE VIEW (Save a View)</h4>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#38bdf8', overflowX: 'auto', margin: 0 }}>
                  <code>CREATE VIEW ActiveUsers AS<br/>SELECT name, email FROM Users<br/>WHERE status = 'Active';</code>
                </pre>
              </div>

              {/* SELECT FROM VIEW */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Command 2</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>SELECT FROM VIEW (Use It)</h4>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#a6e3a1', overflowX: 'auto', margin: 0 }}>
                  <code>-- Use like a normal table!<br/>SELECT * FROM ActiveUsers;</code>
                </pre>
              </div>

              {/* DROP VIEW */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>Command 3</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>DROP VIEW (Delete View)</h4>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#f43f5e', overflowX: 'auto', margin: 0 }}>
                  <code>-- Deletes only the view,<br/>-- base table stays safe!<br/>DROP VIEW ActiveUsers;</code>
                </pre>
              </div>

            </div>

            {/* Super Simple Interactive View Example */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: '#0f172a' }}>💡 Interactive Example: See How View Masks Confidential Data</h4>
              
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowViewResult(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: !showViewResult ? '#1e293b' : '#ffffff',
                    color: !showViewResult ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  1. Raw Base Table (Contains Private SSN)
                </button>
                <button
                  onClick={() => setShowViewResult(true)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid #3b82f6',
                    background: showViewResult ? '#3b82f6' : '#ffffff',
                    color: showViewResult ? '#ffffff' : '#3b82f6',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  2. Public View (Safe Public Data)
                </button>
              </div>

              {!showViewResult ? (
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', display: 'block', marginBottom: '0.5rem' }}>
                    ⚠️ Full Base Table: <code>Employees_Master</code> (Confidential fields exposed)
                  </span>
                  <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9' }}>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Emp ID</th>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '6px', textAlign: 'left' }}>SSN (Private!)</th>
                        <th style={{ padding: '6px', textAlign: 'right' }}>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '6px' }}>101</td>
                        <td style={{ padding: '6px', fontWeight: 600 }}>Alice Smith</td>
                        <td style={{ padding: '6px', color: '#ef4444', fontFamily: 'monospace' }}>***-**-8891</td>
                        <td style={{ padding: '6px', textAlign: 'right' }}>$85,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', display: 'block', marginBottom: '0.5rem' }}>
                    🛡️ Virtual View: <code>CREATE VIEW PublicStaff AS SELECT emp_id, name FROM Employees;</code>
                  </span>
                  <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#eff6ff' }}>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Emp ID</th>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '6px', textAlign: 'left', color: '#15803d' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '6px' }}>101</td>
                        <td style={{ padding: '6px', fontWeight: 600 }}>Alice Smith</td>
                        <td style={{ padding: '6px', color: '#15803d', fontWeight: 700 }}>✓ Safe Public Record</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('indexes')}>Next: SQL Indexes &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 3. INDEXES TAB (SUPER SIMPLE & CLEAR FOR BEGINNERS) */}
      {/* ========================================================= */}
      {activeTab === 'indexes' && (
        <Section key="indexes" id="indexes" eyebrow="Day 8 • Topic 3" title="SQL Indexes (Speeding Up Searches)">
          <div className="panel">
            
            {/* Beginner Book Analogy */}
            <div style={{ background: '#faf5ff', borderLeft: '4px solid #8b5cf6', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#6b21a8', margin: '0 0 0.5rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} color="#8b5cf6" /> What is an Index? (Book Analogy)
              </h3>
              <p style={{ margin: 0, color: '#581c87', fontSize: '0.95rem', lineHeight: '1.6' }}>
                An <strong>Index</strong> works just like an <strong>Index at the back of a Book</strong> 📖! 
                Instead of searching all 1,000 pages line-by-line, the database uses the index to jump straight to the exact page in 1 millisecond.
              </p>
            </div>

            {/* 2 Simple Syntax Commands */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>The 2 Index Commands</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.4rem 0' }}>1. CREATE INDEX (Add Speed)</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Add index on columns you search often (like email).</p>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#38bdf8', margin: 0 }}>
                  <code>CREATE INDEX idx_email ON Users(email);</code>
                </pre>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <h4 style={{ color: '#0f172a', margin: '0 0 0.4rem 0' }}>2. DROP INDEX (Remove Index)</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Removes index if no longer needed.</p>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#f43f5e', margin: 0 }}>
                  <code>DROP INDEX idx_email ON Users;</code>
                </pre>
              </div>

            </div>

            {/* Beginner Caution Box */}
            <div style={{ background: '#fff1f2', borderLeft: '4px solid #ef4444', padding: '1rem 1.25rem', borderRadius: '10px', marginBottom: '2.5rem' }}>
              <strong style={{ color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
                <AlertTriangle size={18} color="#ef4444" /> Quick Golden Rule for Beginners
              </strong>
              <p style={{ color: '#b91c1c', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
                Indexes speed up <code>SELECT</code> (reading data), but slightly slow down <code>INSERT</code> & <code>UPDATE</code> (writing data). Only add indexes to columns you search frequently!
              </p>
            </div>

            {/* Simple Visual Speed Comparison */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, color: '#0f172a' }}>⚡ Interactive Test: Search 1,000,000 User Records</h4>
                
                <button
                  onClick={() => setUseIndex(!useIndex)}
                  style={{
                    background: useIndex ? '#10b981' : '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {useIndex ? '⚡ Index Enabled (Fast)' : '🐌 Index Disabled (Slow)'}
                </button>
              </div>

              <div style={{ background: useIndex ? '#f0fdf4' : '#fff1f2', padding: '1.25rem', borderRadius: '10px', border: useIndex ? '1px solid #bbf7d0' : '1px solid #fecdd3' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', textAlign: 'center' }}>
                  
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>SEARCH METHOD</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: useIndex ? '#15803d' : '#991b1b' }}>
                      {useIndex ? 'Index Lookup 📖' : 'Full Table Scan 🐌'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>SEARCH TIME</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: useIndex ? '#10b981' : '#ef4444' }}>
                      {useIndex ? '2 ms (Instant!)' : '480 ms (Slow)'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>ROWS INSPECTED</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: useIndex ? '#10b981' : '#ef4444' }}>
                      {useIndex ? '1 Row' : '1,000,000 Rows'}
                    </span>
                  </div>

                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical')}>Next: Practical Examples &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 4. PRACTICAL TAB */}
      {/* ========================================================= */}
      {activeTab === 'practical' && (
        <Section key="practical" id="practical" eyebrow="Day 8 • Topic 4" title="Practical: Advanced SQL Examples">
          <div className="panel">
            <p style={{ fontSize: '1rem', color: '#475569' }}>Here are 3 real-world SQL code snippets every developer uses:</p>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>1. Payroll Security View</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem' }}>
              <code>CREATE VIEW PublicPayroll AS<br/>SELECT emp_id, first_name, department FROM Employees;<br/><br/>SELECT * FROM PublicPayroll WHERE department = 'Sales';</code>
            </pre>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>2. Top Earner Subquery</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem' }}>
              <code>SELECT name, salary FROM Employees<br/>WHERE salary &gt; (SELECT AVG(salary) FROM Employees);</code>
            </pre>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>3. Indexing Email Column</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem' }}>
              <code>CREATE INDEX idx_user_email ON Users(email);</code>
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Next: Assignment &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 5. ASSIGNMENT TAB */}
      { activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 8 • Homework" title="Day 8 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Simple Homework Challenge</h3>
            <p>Practice what you learned today!</p>
            
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1rem', marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.4rem', color: '#1e293b' }}>Task 1: Create a View</h4>
              <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>Write SQL to create a View called <code>ActiveEmp</code> that shows <code>id</code> and <code>name</code> from Employees where <code>status = 'Active'</code>.</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.4rem', color: '#1e293b' }}>Task 2: Create an Index</h4>
              <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>Write the SQL command to create an index named <code>idx_phone</code> on the <code>phone</code> column of the Customers table.</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Assignment Submitted Successfully!')}>Submit Assignment</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
