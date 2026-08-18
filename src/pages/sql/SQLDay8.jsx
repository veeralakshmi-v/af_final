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

export default function SQLDay8({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module8', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'subqueries' && (
        <Section key="subqueries" id="subqueries" eyebrow="Advanced Queries" title="Subqueries">
          <div className="panel">
            <p>A <strong>Subquery</strong> (or Nested Query) is a query within another query. They are used to perform operations in multiple steps without needing to save intermediate results to a temporary table.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Single-Row Subquery</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns only one row. Usually used with <code>=</code>, <code>&gt;</code>, or <code>&lt;</code>.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#2563eb', fontSize: '0.85rem' }}>SELECT * FROM Emp WHERE salary &gt; (SELECT AVG(salary) FROM Emp);</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Multiple-Row Subquery</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns one or more rows. Must be used with <code>IN</code>, <code>ANY</code>, or <code>ALL</code>.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontSize: '0.85rem' }}>SELECT * FROM Emp WHERE dept_id IN (SELECT id FROM Dept WHERE loc='NY');</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Nested Query</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>A subquery inside another subquery! You can nest them deeply, though it can impact performance.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Correlated Subquery</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>A subquery that depends on values from the outer query. It executes once for <em>each row</em> processed by the outer query.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontSize: '0.85rem', display: 'block' }}>SELECT * FROM Emp e1 WHERE salary &gt; (SELECT AVG(salary) FROM Emp e2 WHERE e1.dept = e2.dept);</code>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('views')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'views' && (
        <Section key="views" id="views" eyebrow="Virtual Tables" title="Views">
          <div className="panel">
            <p>A <strong>View</strong> is a virtual table based on the result-set of an SQL statement. It contains rows and columns, just like a real table, but the fields are from one or more real tables.</p>
            <p>Views are great for hiding complex queries or restricting access to sensitive data (like hiding the Salary column in an Employee view).</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>CREATE VIEW</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE VIEW</code> ActiveCustomers <code style={{ color: '#89ddff' }}>AS</code><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> id, name, email <br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Customers <br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> status = <span style={{ color: '#c3e88d' }}>'Active'</span>;
            </pre>
            <p style={{ marginTop: '0.5rem', color: '#475569', fontStyle: 'italic' }}>* Now you can simply query: <code>SELECT * FROM ActiveCustomers;</code></p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>ALTER VIEW</h3>
            <p>To change the structure of a View in MySQL, you can recreate it using <code>CREATE OR REPLACE VIEW</code>, or use <code>ALTER VIEW</code> (depending on the database system).</p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>ALTER VIEW</code> ActiveCustomers <code style={{ color: '#89ddff' }}>AS</code><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> id, name, email, join_date <br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Customers <code style={{ color: '#c792ea' }}>WHERE</code> status = <span style={{ color: '#c3e88d' }}>'Active'</span>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>DROP VIEW</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>DROP VIEW</code> ActiveCustomers;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('indexes')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'indexes' && (
        <Section key="indexes" id="indexes" eyebrow="Performance" title="Indexes">
          <div className="panel">
            <p>An <strong>Index</strong> is used to speed up data retrieval operations on a table. It acts like an index in a book—instead of reading every single page to find a topic, you look at the index to find the exact page number!</p>

            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginBottom: '2rem', fontSize: '0.9rem' }}>
              <p style={{ margin: 0, color: '#991b1b' }}><strong>Trade-offs</strong></p>
              <p style={{ margin: 0, marginTop: '0.5rem', color: '#b91c1c' }}>While Indexes vastly speed up `SELECT` queries, they <strong>slow down</strong> `UPDATE`, `INSERT`, and `DELETE` operations because the index must be updated every time the data changes. Only index columns that are frequently searched!</p>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>CREATE INDEX</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Create a basic index</span><br/>
              <code style={{ color: '#c792ea' }}>CREATE INDEX</code> idx_lastname <br/>
              <code style={{ color: '#89ddff' }}>ON</code> Employees (last_name);<br/><br/>
              
              <span style={{ color: '#64748b' }}>-- Create a unique index (also enforces that values must be unique!)</span><br/>
              <code style={{ color: '#c792ea' }}>CREATE UNIQUE INDEX</code> idx_email <br/>
              <code style={{ color: '#89ddff' }}>ON</code> Users (email);
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>DROP INDEX</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- MySQL Syntax</span><br/>
              <code style={{ color: '#c792ea' }}>DROP INDEX</code> idx_lastname <code style={{ color: '#89ddff' }}>ON</code> Employees;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical')}>Let's Code! (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'practical' && (
        <Section key="practical" id="practical" eyebrow="Live Examples" title="Practical: Advanced SQL">
          <div className="panel">
            <p>Let's use our new advanced tools in a real-world scenario.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Payroll View</h3>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #64748b', marginBottom: '1rem' }}>
              <strong>Goal:</strong> HR needs a report of employees and their salaries, but they shouldn't see personal info like social security numbers.
            </div>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE VIEW</code> HR_Payroll <code style={{ color: '#89ddff' }}>AS</code><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> emp_id, first_name, last_name, department, salary<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees;<br/><br/>
              <span style={{ color: '#64748b' }}>-- HR can now run:</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> * <code style={{ color: '#c792ea' }}>FROM</code> HR_Payroll;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Top Salary Report</h3>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #64748b', marginBottom: '1rem' }}>
              <strong>Goal:</strong> Find the employees who make more than the average salary of the entire company using a <strong>Single-Row Subquery</strong>.
            </div>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>SELECT</code> first_name, last_name, salary<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees<br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> salary &gt; (<br/>
              &nbsp;&nbsp;<code style={{ color: '#c792ea' }}>SELECT</code> <code style={{ color: '#82aaff' }}>AVG</code>(salary) <code style={{ color: '#c792ea' }}>FROM</code> Employees<br/>
              );
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Fast Employee Search</h3>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #64748b', marginBottom: '1rem' }}>
              <strong>Goal:</strong> The company application frequently searches for employees by their email address. We need to speed this up with an <strong>Index</strong>.
            </div>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE UNIQUE INDEX</code> idx_emp_email <br/>
              <code style={{ color: '#89ddff' }}>ON</code> Employees (email);
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 8 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Advanced Developer Challenge</h3>
            <p>Prove you have what it takes to be an advanced SQL developer.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: The Correlated View</h4>
              <p style={{ color: '#475569' }}>Create a View called <code>HighEarners</code> that uses a Correlated Subquery to find employees who make more than the average salary of <em>their specific department</em>.</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: Index Optimizer</h4>
              <p style={{ color: '#475569' }}>You have a massive <code>Transactions</code> table with 5 million rows. Your application runs this query 100 times a second:<br/><code>SELECT * FROM Transactions WHERE status = 'Failed' AND date &gt; '2026-01-01';</code><br/>Write the SQL command to create an index that will optimize this specific query.</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Assignment Submitted!')}>Submit Assignment</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
