import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Type as TypeIcon, ShieldAlert, Table } from 'lucide-react';

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

export default function SQLDay2({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module2', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'db_commands' && (
        <Section key="db_commands" id="db_commands" eyebrow="Database Management" title="Database Commands">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Core Commands</h3>
            <p>Before working with tables, you need to manage the databases themselves.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#2563eb', fontWeight: 'bold' }}>CREATE DATABASE db_name;</code>
                <p style={{ marginTop: '0.5rem', color: '#475569' }}>Creates a new, empty database on the server.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#dc2626', fontWeight: 'bold' }}>DROP DATABASE db_name;</code>
                <p style={{ marginTop: '0.5rem', color: '#475569' }}>Permanently deletes a database and all its tables/data. <strong>Use with extreme caution!</strong></p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontWeight: 'bold' }}>SHOW DATABASES;</code>
                <p style={{ marginTop: '0.5rem', color: '#475569' }}>Lists all databases available on the current server.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontWeight: 'bold' }}>USE db_name;</code>
                <p style={{ marginTop: '0.5rem', color: '#475569' }}>Selects the active database you want to run your queries against.</p>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Safety Checks: IF EXISTS / IF NOT EXISTS</h3>
            <p>If you try to create a database that already exists, or drop one that doesn't, SQL will throw an error. You can prevent this using safety clauses:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.8, marginTop: '1rem', color: 'var(--text-secondary)' }}>
              <li><code>CREATE DATABASE <strong>IF NOT EXISTS</strong> company_db;</code> (Only creates if it isn't there)</li>
              <li><code>DROP DATABASE <strong>IF EXISTS</strong> test_db;</code> (Only drops if it exists)</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('data_types')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'data_types' && (
        <Section key="data_types" id="data_types" eyebrow="Structure" title="Data Types">
          <div className="panel">
            <p>When you create a table, you must specify what <em>kind</em> of data each column will hold. This is called the Data Type.</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>Category</th>
                  <th style={{ padding: '1rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>Data Type</th>
                  <th style={{ padding: '1rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {/* Numeric */}
                <tr>
                  <td rowSpan="3" style={{ padding: '1rem', border: '1px solid #cbd5e1', fontWeight: 'bold', backgroundColor: '#f8fafc' }}>Numeric</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>INT</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Whole numbers (e.g., 25, -100).</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>FLOAT</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Approximate decimal numbers. Good for scientific calculations.</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>DECIMAL(M,D)</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Exact decimal numbers. <code>M</code> is total digits, <code>D</code> is digits after decimal. Great for currency.</td>
                </tr>
                
                {/* String */}
                <tr>
                  <td rowSpan="3" style={{ padding: '1rem', border: '1px solid #cbd5e1', fontWeight: 'bold', backgroundColor: '#f8fafc' }}>String (Text)</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>VARCHAR(N)</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Variable-length string up to <code>N</code> characters. Best for names, emails.</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>CHAR(N)</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Fixed-length string. Always takes up exactly <code>N</code> characters (pads with spaces). Good for state abbreviations (e.g., 'NY').</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>TEXT</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Long text strings. Good for comments or blog posts.</td>
                </tr>

                {/* Date/Time */}
                <tr>
                  <td rowSpan="3" style={{ padding: '1rem', border: '1px solid #cbd5e1', fontWeight: 'bold', backgroundColor: '#f8fafc' }}>Date & Time</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>DATE</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Format: YYYY-MM-DD. Example: '2026-07-24'.</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>TIME</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Format: HH:MI:SS. Example: '13:45:00'.</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>DATETIME</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Combination of Date and Time.</td>
                </tr>

                {/* Logic */}
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1', fontWeight: 'bold', backgroundColor: '#f8fafc' }}>Logic</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}><code>BOOLEAN</code></td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>True/False (In MySQL, this is actually stored as TINYINT, where 0 is false and 1 is true).</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}



      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 2 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Review & Practice</h3>
            <p>To reinforce what you've learned today, complete the following assignments before moving on to Day 3.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: Data Types</h4>
              <p style={{ color: '#475569' }}>For each of the following pieces of data, state which SQL Data Type you would use and why:</p>
              <ol style={{ marginLeft: '20px', marginTop: '10px', color: '#475569' }}>
                <li>A user's first name</li>
                <li>The price of a book (e.g., $19.99)</li>
                <li>Whether a user is subscribed to a newsletter (Yes/No)</li>
                <li>The exact date and time a purchase was made</li>
              </ol>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: Create a Database</h4>
              <p style={{ color: '#475569' }}>Write the SQL code to create a brand new database for a library system. Ensure it only creates the database if it doesn't already exist!</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px', color: '#475569' }}>
                <li>Database name should be: <code>library_management_db</code></li>
              </ul>
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
