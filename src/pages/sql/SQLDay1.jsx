import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layers, List, Table, Terminal, ShieldAlert, Cpu } from 'lucide-react';


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

export default function SQLDay1({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module1', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'data_db' && (
        <Section key="data_db" id="data_db" eyebrow="Foundations" title="Data & Databases">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>
              What is Data?
            </h3>
            <p><strong>Data</strong> is a collection of facts, figures, and statistics related to an object in consideration. For example, your name, age, height, and weight are all pieces of data about you.</p>

            <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>
              What is a Database?
            </h3>
            <p>A <strong>Database</strong> is an organized collection of structured data, typically stored electronically in a computer system. It makes data management easy.</p>
            <p style={{ marginTop: '1rem' }}>Imagine a database as a digital filing cabinet. Instead of tossing papers (data) randomly into a pile, you place them into specific folders so you can easily find, update, or remove them later.</p>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('dbms_rdbms')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'dbms_rdbms' && (
        <Section key="dbms_rdbms" id="dbms_rdbms" eyebrow="Management Systems" title="DBMS & RDBMS">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>
              DBMS (Database Management System)
            </h3>
            <p>A DBMS is simply the software you use to manage your database. Think of it like a librarian. Just as a librarian helps you add, find, and organize books in a library, a DBMS helps you add, find, and organize data in your database.</p>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}><em>Examples: Microsoft Access, dBase, or the file system on your computer.</em></p>

            <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>
              RDBMS (Relational Database Management System)
            </h3>
            <p>An RDBMS is an advanced version of a DBMS. It stores data in a structured format, using <strong>rows and columns</strong> to form tables. "Relational" means that these tables can be linked (or related) to each other based on common data.</p>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}><em>Examples: MySQL, PostgreSQL, Oracle, SQL Server.</em></p>

            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Key Difference</h4>
              <p style={{ margin: 0 }}>While a DBMS manages data, an RDBMS specifically manages data organized into tables and enforces relationships between them.</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('table_structure')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'table_structure' && (
        <Section key="table_structure" id="table_structure" eyebrow="Structure" title="Tables, Rows & Columns">
          <div className="panel">
            <p>In a relational database, data is stored in tables. Let's break down the anatomy of a table.</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>ID (Column/Field)</th>
                  <th style={{ padding: '1rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>Name (Column/Field)</th>
                  <th style={{ padding: '1rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>Age (Column/Field)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>1</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Alice</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>24</td>
                  <td style={{ border: 'none', color: '#3b82f6', fontStyle: 'italic', paddingLeft: '1rem' }}>&larr; This is a Row / Record</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>2</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>Bob</td>
                  <td style={{ padding: '1rem', border: '1px solid #cbd5e1' }}>28</td>
                  <td style={{ border: 'none' }}></td>
                </tr>
              </tbody>
            </table>

            <ul style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <li><strong>Table:</strong> A collection of related data held in a structured format (the whole grid above).</li>
              <li><strong>Columns (Fields):</strong> Vertical entities that contain all information associated with a specific field (e.g., all Ages).</li>
              <li><strong>Rows (Records):</strong> Horizontal entities that represent a single, implicitly structured data item (e.g., all info about Alice).</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('install_sql')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'install_sql' && (
        <Section key="install_sql" id="install_sql" eyebrow="Setup" title="Install MySQL">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>How to Download and Install SQL</h3>
            <p>To run a real database on your own computer, you need to install MySQL Server and a GUI (Graphical User Interface) to interact with it.</p>
            
            <ol style={{ paddingLeft: '20px', lineHeight: 1.8, marginTop: '1.5rem', marginBottom: '2rem' }}>
              <li><strong>Download:</strong> Go to the official MySQL website and download the <em>MySQL Installer for Windows</em>.</li>
              <li><strong>Install:</strong> Run the installer and choose the <strong>Developer Default</strong> setup type.</li>
              <li><strong>Configuration:</strong> During setup, you will be asked to create a <strong>Root Password</strong>. Memorize this! It is the master password for your database.</li>
              <li><strong>Workbench:</strong> The installer will also install <strong>MySQL Workbench</strong>. This is the visual tool you will use to write queries and manage your data.</li>
              <li><strong>Connect:</strong> Open MySQL Workbench, click on the "Local instance MySQL" connection, and enter your Root password to connect.</li>
            </ol>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_workbench')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'ai_workbench' && (
        <Section key="ai_workbench" id="ai_workbench" eyebrow="AI Integration" title="AI in SQL Workbench">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Supercharging MySQL Workbench with AI</h3>
            <p>While MySQL Workbench is a powerful client, it doesn't ship with a native AI chat panel. However, modern database administrators and software developers supercharge their SQL editing workflows using AI integrations:</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '6px' }}><Cpu size={16} /> Side-by-Side Prompting</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                  Keep ChatGPT or Gemini open alongside MySQL Workbench. Paste your table schemas (DDL statements) into the prompt and ask the AI to write complex queries, explain optimization plans, or draft dummy record inserts.
                </p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={16} /> IDE Extensions (VS Code)</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                  Connect VS Code or Cursor editor to your local MySQL database using SQL extensions (like SQLTools). Use inline **GitHub Copilot** or Gemini code assistants to auto-complete SQL statements directly in your queries.
                </p>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Mastering SQL Prompt Engineering</h3>
            <p>To get accurate SQL outputs from AI assistants, follow these prompt patterns:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem', marginBottom: '2rem', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.75rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1', width: '30%' }}>Workflow</th>
                  <th style={{ padding: '0.75rem', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>Example Prompt Template</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', fontWeight: 600 }}>Schema Drafting</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', color: '#334155' }}>
                    <em>"Write a MySQL DDL script to create a database for an e-commerce platform. Include tables for users, orders, and order_items with proper foreign keys and cascade deletions."</em>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', fontWeight: 600 }}>Query Construction</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', color: '#334155' }}>
                    <em>"Here is my schema: [paste DDL]. Write a MySQL query to find the top 5 customers who spent the most money in the last 30 days."</em>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', fontWeight: 600 }}>Error Troubleshooting</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', color: '#334155' }}>
                    <em>"MySQL Workbench returns Error 1064 (Syntax Error) on this query: [paste query]. Explain the error and write the corrected code."</em>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', fontWeight: 600 }}>Query Optimization</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #cbd5e1', color: '#334155' }}>
                    <em>"This SELECT query is taking 4 seconds to execute on a table with 1M rows: [paste query]. How should I index my tables to speed this up?"</em>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ padding: '1.5rem', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              <h4 style={{ margin: 0, color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>💡 Pro-Tip for SQL Workbench Scripting</h4>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#78350f', lineHeight: 1.5 }}>
                You can write custom Python scripts inside MySQL Workbench (under <strong>Scripting {"->"} New Script</strong>) that make requests to AI API endpoints to automatically format, comment, or review SQL code selected in your active query editor tab.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 1 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Review & Practice</h3>
            <p>To reinforce what you've learned today, complete the following assignments before moving on to Day 2.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task: Environment Setup</h4>
              <p style={{ color: '#475569' }}>Follow the steps in the "Install MySQL" section to download and install MySQL Server and MySQL Workbench on your computer. Make sure you can connect to your local server successfully.</p>
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
