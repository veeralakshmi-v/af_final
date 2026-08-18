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

export default function SQLDay4({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module4', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'dml_theory' && (
        <Section key="dml_theory" id="dml_theory" eyebrow="Theory" title="DML Commands">
          <div className="panel">
            <p><strong>DML (Data Manipulation Language)</strong> commands are used to modify the database. It is responsible for all form of changes in the database, inserting data, updating data, and deleting data.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>INSERT</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Adds new rows of data to a table.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>INSERT INTO table_name (col1, col2) VALUES (val1, val2);</code>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>* If you are inserting values for every column in order, you can omit the column names.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>UPDATE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Modifies existing data within a table. <strong>Always use a WHERE clause!</strong> If you omit it, ALL rows will be updated.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#d97706', fontSize: '0.9rem' }}>UPDATE table_name SET col1 = val1 WHERE condition;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>DELETE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Removes existing rows from a table. Just like UPDATE, <strong>always use a WHERE clause</strong> unless you want to delete everything!</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#dc2626', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>DELETE FROM table_name WHERE condition;</code>
                
                <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', fontSize: '0.9rem' }}>
                  <p style={{ margin: 0, color: '#991b1b' }}><strong>🚨 DANGER ZONE 🚨</strong></p>
                  <p style={{ margin: 0, marginTop: '0.5rem', color: '#b91c1c' }}>If you use the DELETE keyword without using a WHERE clause, you will delete every single record in the table. <strong>Your company will fire you!</strong> Always double-check your WHERE condition.</p>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('dql_theory')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'dql_theory' && (
        <Section key="dql_theory" id="dql_theory" eyebrow="Theory" title="DQL (Data Query Language)">
          <div className="panel">
            <p><strong>DQL</strong> is used to fetch data from the database. The most famous (and often the only) DQL command is <code>SELECT</code>.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>SELECT *</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>The asterisk (*) acts as a wildcard meaning "all columns". This fetches every column in the table.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#2563eb', fontSize: '0.9rem' }}>SELECT * FROM table_name;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>SELECT Specific Columns</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>It is best practice to only select the columns you actually need to save memory and processing time.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontSize: '0.9rem' }}>SELECT col1, col2 FROM table_name;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>DISTINCT</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns only distinct (different) values. Used to eliminate duplicate results.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#db2777', fontSize: '0.9rem' }}>SELECT DISTINCT col_name FROM table_name;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #14b8a6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>AS (Alias)</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Gives a table or a column a temporary, more readable name in the result set.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#0d9488', fontSize: '0.9rem' }}>SELECT first_name AS "First Name" FROM Employees;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #64748b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>LIMIT</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Specifies the maximum number of records to return. Great for testing queries on large databases!</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#475569', fontSize: '0.9rem' }}>SELECT * FROM table_name LIMIT 5;</code>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical')}>Let's Code! (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'practical' && (
        <Section key="practical" id="practical" eyebrow="Live Examples" title="Practical: Modifying Data">
          <div className="panel">
            <p>Let's use our DML and DQL commands on an <strong>Employees</strong> table.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Insert Employee Records</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Inserting a single record</span><br/>
              <code style={{ color: '#c792ea' }}>INSERT INTO</code> Employees (first_name, last_name, salary, department)<br/>
              <code style={{ color: '#89ddff' }}>VALUES</code> (<span style={{ color: '#c3e88d' }}>'John'</span>, <span style={{ color: '#c3e88d' }}>'Doe'</span>, <span style={{ color: '#f07178' }}>65000</span>, <span style={{ color: '#c3e88d' }}>'IT'</span>);<br/><br/>
              
              <span style={{ color: '#64748b' }}>-- Inserting multiple records at once</span><br/>
              <code style={{ color: '#c792ea' }}>INSERT INTO</code> Employees (first_name, last_name, salary, department)<br/>
              <code style={{ color: '#89ddff' }}>VALUES</code> <br/>
              &nbsp;&nbsp;(<span style={{ color: '#c3e88d' }}>'Jane'</span>, <span style={{ color: '#c3e88d' }}>'Smith'</span>, <span style={{ color: '#f07178' }}>72000</span>, <span style={{ color: '#c3e88d' }}>'HR'</span>),<br/>
              &nbsp;&nbsp;(<span style={{ color: '#c3e88d' }}>'Bob'</span>, <span style={{ color: '#c3e88d' }}>'Wilson'</span>, <span style={{ color: '#f07178' }}>58000</span>, <span style={{ color: '#c3e88d' }}>'Sales'</span>);
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Update Salary</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Giving a raise to everyone in the IT department</span><br/>
              <code style={{ color: '#c792ea' }}>UPDATE</code> Employees <br/>
              <code style={{ color: '#89ddff' }}>SET</code> salary = salary + <span style={{ color: '#f07178' }}>5000</span> <br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> department = <span style={{ color: '#c3e88d' }}>'IT'</span>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Delete Employees</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Bob just left the company, remove his record</span><br/>
              <code style={{ color: '#c792ea' }}>DELETE FROM</code> Employees <br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> first_name = <span style={{ color: '#c3e88d' }}>'Bob'</span> <code style={{ color: '#89ddff' }}>AND</code> last_name = <span style={{ color: '#c3e88d' }}>'Wilson'</span>;
            </pre>
            
            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>
              <p style={{ margin: 0, color: '#991b1b' }}><strong>🚨 DANGER ZONE 🚨</strong></p>
              <p style={{ margin: 0, marginTop: '0.5rem', color: '#b91c1c' }}>If you typed <code>DELETE FROM Employees;</code> without the WHERE clause, you would fire the entire company and permanently delete all data from the table!</p>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Display Employee Report</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Displaying a clean report using SELECT, DISTINCT, and AS</span><br/>
              <br/>
              <span style={{ color: '#64748b' }}>-- 1. Get a list of all unique departments</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT DISTINCT</code> department <code style={{ color: '#c792ea' }}>FROM</code> Employees;<br/>
              <br/>
              <span style={{ color: '#64748b' }}>-- 2. Display formatted names and salaries of the top 5 earners</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> first_name <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"First Name"</span>, last_name <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Last Name"</span>, salary <code style={{ color: '#89ddff' }}>AS</code> <span style={{ color: '#c3e88d' }}>"Annual Salary"</span><br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees <br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> salary <code style={{ color: '#89ddff' }}>DESC</code><br/>
              <code style={{ color: '#89ddff' }}>LIMIT</code> <span style={{ color: '#f07178' }}>5</span>;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 4 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Data Manipulation Challenge</h3>
            <p>Put your new DML and DQL skills to the test with this assignment!</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: The New Hire</h4>
              <p style={{ color: '#475569' }}>Write an <code>INSERT</code> statement to add a new employee named "Alice Smith" to the <code>Employees</code> table. Her salary is $85,000 and she works in the "Engineering" department.</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: The Promotion</h4>
              <p style={{ color: '#475569' }}>Write an <code>UPDATE</code> statement to increase the salary of all employees in the "Engineering" department by $5,000. Don't forget your WHERE clause!</p>
            </div>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 3: The Report</h4>
              <p style={{ color: '#475569' }}>Write a <code>SELECT</code> statement that returns only the <code>first_name</code> and <code>department</code> columns for all employees, but rename the <code>department</code> column to "Team" in the results.</p>
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
