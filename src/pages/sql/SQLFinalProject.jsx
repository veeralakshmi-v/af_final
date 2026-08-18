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

export default function SQLFinalProject({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_final_project', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'overview' && (
        <Section key="overview" id="overview" eyebrow="Capstone" title="SQL Final Project">
          <div className="panel">
            <div style={{ textAlign: 'center', padding: '2rem 0', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '3rem', color: '#1e293b', marginBottom: '1rem' }}>🏆 Database Architect 🏆</h1>
              <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>It's time to build a complete, end-to-end database system from scratch. Choose your domain, design the architecture, and write the SQL to make it run!</p>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Choose Your Domain</h3>
            <p style={{ marginBottom: '1.5rem' }}>Select ONE of the following systems to build for your final project:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem', fontSize: '1.2rem' }}>1. Student Management</h4>
                <p style={{ color: '#475569', flex: 1 }}>Manage students, courses, enrollments, and grades. Perfect for practicing Many-to-Many relationships!</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#10b981', marginBottom: '0.5rem', fontSize: '1.2rem' }}>2. Hospital Management</h4>
                <p style={{ color: '#475569', flex: 1 }}>Manage doctors, patients, appointments, and billing. Great for tracking complex statuses and timestamps.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem', fontSize: '1.2rem' }}>3. E-Commerce System</h4>
                <p style={{ color: '#475569', flex: 1 }}>Manage users, products, shopping carts, and orders. Excellent for practicing Transactions and SUM() aggregates.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem', fontSize: '1.2rem' }}>4. Library Management</h4>
                <p style={{ color: '#475569', flex: 1 }}>Manage books, members, checkouts, and late fees. Ideal for working with dates and trigger automations.</p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('requirements')}>View Requirements</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'requirements' && (
        <Section key="requirements" id="requirements" eyebrow="The Checklist" title="Project Requirements">
          <div className="panel">
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Your final submission must be a single <code>.sql</code> file containing all the commands necessary to build and query your system from scratch. It must demonstrate all of the following:</p>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#3b82f6', color: 'white', width: '28px', height: '28px', borderRadius: '50%', fontSize: '0.9rem' }}>1</span>
                Architecture & DDL
              </h3>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569', marginBottom: '2rem' }}>
                <li>✅ <strong>Database Creation</strong> (`CREATE DATABASE`)</li>
                <li>✅ <strong>ER Model Implementation:</strong> At least 3 tables demonstrating a One-to-Many and a Many-to-Many relationship.</li>
                <li>✅ <strong>Constraints:</strong> Must use `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, and `UNIQUE`.</li>
              </ul>

              <h3 style={{ color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#10b981', color: 'white', width: '28px', height: '28px', borderRadius: '50%', fontSize: '0.9rem' }}>2</span>
                Data & DML
              </h3>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569', marginBottom: '2rem' }}>
                <li>✅ <strong>CRUD Operations:</strong> Populate tables using `INSERT`, update records using `UPDATE`, and write a safe `DELETE`.</li>
              </ul>

              <h3 style={{ color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#f59e0b', color: 'white', width: '28px', height: '28px', borderRadius: '50%', fontSize: '0.9rem' }}>3</span>
                Querying & DQL
              </h3>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569', marginBottom: '2rem' }}>
                <li>✅ <strong>Filtering & Sorting:</strong> Queries using `WHERE`, logical operators (`AND`/`OR`), `LIKE`, and `ORDER BY`.</li>
                <li>✅ <strong>Aggregates:</strong> A query calculating totals or averages using `GROUP BY` and `HAVING`.</li>
                <li>✅ <strong>Joins:</strong> A query using an `INNER JOIN` across at least 3 tables.</li>
                <li>✅ <strong>Subqueries:</strong> At least one nested query.</li>
              </ul>

              <h3 style={{ color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#8b5cf6', color: 'white', width: '28px', height: '28px', borderRadius: '50%', fontSize: '0.9rem' }}>4</span>
                Advanced Concepts
              </h3>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569' }}>
                <li>✅ <strong>Views:</strong> Create a View that hides sensitive columns.</li>
                <li>✅ <strong>Transactions:</strong> Write a safe transaction using `START TRANSACTION`, `COMMIT`, and `ROLLBACK` for a critical operation (like placing an order or paying a fee).</li>
                <li>✅ <strong>Stored Procedures:</strong> Create a reusable procedure that takes at least one parameter.</li>
                <li>✅ <strong>Triggers:</strong> An `AFTER INSERT` or `AFTER UPDATE` trigger (e.g., an audit log).</li>
                <li>✅ <strong>Roles & Permissions:</strong> `CREATE ROLE` and `GRANT` permissions to it.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('submission')}>Submit Project</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'submission' && (
        <Section key="submission" id="submission" eyebrow="Final Step" title="Submit Your Work">
          <div className="panel" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>Congratulations! 🎉</h2>
            <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '600px', margin: '0 auto 2rem' }}>
              You have completed the entire SQL curriculum. By finishing this project, you have proven that you can architect, build, query, and secure a complete relational database.
            </p>
            
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '2px dashed #cbd5e1', maxWidth: '500px', margin: '0 auto' }}>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Upload your <code>final_project.sql</code> file here.</p>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => alert('Project Submitted! You are officially an SQL Database Architect!')}>
                Upload Project
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
