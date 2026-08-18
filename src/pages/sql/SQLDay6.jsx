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

export default function SQLDay6({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module6', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'aggregate_functions' && (
        <Section key="aggregate_functions" id="aggregate_functions" eyebrow="Math in SQL" title="Aggregate Functions">
          <div className="panel">
            <p>Instead of retrieving raw data, <strong>Aggregate Functions</strong> perform a calculation on a set of values and return a single, summarized value. They are incredibly useful for reporting and data analysis.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>COUNT()</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns the total number of rows that match a specified criterion.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#2563eb', fontSize: '0.9rem' }}>SELECT COUNT(emp_id) FROM Employees;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>SUM()</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns the total sum of a numeric column.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontSize: '0.9rem' }}>SELECT SUM(salary) FROM Employees WHERE department = 'Sales';</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>AVG()</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns the average value of a numeric column.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#d97706', fontSize: '0.9rem' }}>SELECT AVG(price) FROM Products;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>MAX() & MIN()</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns the largest (MAX) or smallest (MIN) value of the selected column.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>SELECT MAX(score) FROM Students;</code>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontSize: '0.9rem' }}>SELECT MIN(age) FROM Users;</code>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('grouping')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'grouping' && (
        <Section key="grouping" id="grouping" eyebrow="Grouping" title="GROUP BY & HAVING">
          <div className="panel">
            <p>Aggregate functions are powerful, but what if you want to find the average salary <em>per department</em>, rather than the average of the whole company? That's where <code>GROUP BY</code> comes in.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>GROUP BY</h3>
            <p>The <code>GROUP BY</code> statement groups rows that have the same values into summary rows. It is almost always used with aggregate functions.</p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- How many employees are in each department?</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> department, <code style={{ color: '#82aaff' }}>COUNT</code>(emp_id) <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Number of Employees"</span><br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees <br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> department;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>HAVING</h3>
            <p>What if you want to filter those grouped results? You <strong>cannot</strong> use the <code>WHERE</code> clause on aggregate functions. Instead, you must use the <code>HAVING</code> clause.</p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Find departments that have MORE than 5 employees</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> department, <code style={{ color: '#82aaff' }}>COUNT</code>(emp_id)<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees <br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> department <br/>
              <code style={{ color: '#c792ea' }}>HAVING</code> <code style={{ color: '#82aaff' }}>COUNT</code>(emp_id) &gt; <span style={{ color: '#f07178' }}>5</span>;
            </pre>

            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginTop: '1.5rem', fontSize: '0.9rem' }}>
              <p style={{ margin: 0, color: '#991b1b' }}><strong>The Golden Rule of Execution Order</strong></p>
              <ul style={{ margin: 0, marginTop: '0.5rem', paddingLeft: '20px', color: '#b91c1c' }}>
                <li><code>WHERE</code> filters rows <em>before</em> they are grouped.</li>
                <li><code>HAVING</code> filters groups <em>after</em> they are grouped.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical')}>Let's Code! (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'practical' && (
        <Section key="practical" id="practical" eyebrow="Live Examples" title="Practical: Aggregate Reports">
          <div className="panel">
            <p>Let's use our new math powers to generate some real-world business reports.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Department Report</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Total salary budget needed per department</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> department, <code style={{ color: '#82aaff' }}>SUM</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Total Budget"</span><br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees <br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> department<br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> <span style={{ color: '#c3e88d' }}>"Total Budget"</span> <code style={{ color: '#89ddff' }}>DESC</code>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Sales Report</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Identify our top-selling products (sold more than 100 units)</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> product_name, <code style={{ color: '#82aaff' }}>SUM</code>(quantity_sold) <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Total Sold"</span><br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Sales <br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> product_name<br/>
              <code style={{ color: '#c792ea' }}>HAVING</code> <code style={{ color: '#82aaff' }}>SUM</code>(quantity_sold) &gt; <span style={{ color: '#f07178' }}>100</span>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Attendance Report</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- How many days did each student attend this month?</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> student_name, <code style={{ color: '#82aaff' }}>COUNT</code>(attendance_date) <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Days Present"</span><br/>
              <code style={{ color: '#c792ea' }}>FROM</code> AttendanceRecords <br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> status = <span style={{ color: '#c3e88d' }}>'Present'</span> <code style={{ color: '#89ddff' }}>AND</code> month = <span style={{ color: '#c3e88d' }}>'July'</span><br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> student_name;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Salary Analysis</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Find the highest, lowest, and average salary in the company</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> <br/>
              &nbsp;&nbsp;<code style={{ color: '#82aaff' }}>MAX</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Highest Salary"</span>,<br/>
              &nbsp;&nbsp;<code style={{ color: '#82aaff' }}>MIN</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Lowest Salary"</span>,<br/>
              &nbsp;&nbsp;<code style={{ color: '#82aaff' }}>AVG</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Average Salary"</span><br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 6 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Reporting Challenge</h3>
            <p>Combine grouping and aggregate functions to generate these business reports.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: City Population</h4>
              <p style={{ color: '#475569' }}>Write a query to count how many <strong>Users</strong> live in each `city`. Output two columns: `city` and the `Total Users`.</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: Expensive Categories</h4>
              <p style={{ color: '#475569' }}>Write a query to find the average price of <strong>Products</strong> per `category`. <em>Only</em> show categories where the average price is greater than $100.</p>
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
