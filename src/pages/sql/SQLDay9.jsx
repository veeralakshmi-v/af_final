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

export default function SQLDay9({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module9', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'dcl' && (
        <Section key="dcl" id="dcl" eyebrow="Security" title="DCL (Data Control Language)">
          <div className="panel">
            <p><strong>DCL</strong> commands are used to manage permissions and access to the database. They ensure that only authorized users can perform specific operations.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>GRANT</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Gives a user specific privileges (like SELECT, INSERT, UPDATE, or all privileges) on a database object.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontSize: '0.85rem' }}>GRANT SELECT, INSERT ON Employees TO 'john_doe'@'localhost';</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>REVOKE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Takes back privileges previously granted to a user.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#dc2626', fontSize: '0.85rem' }}>REVOKE INSERT ON Employees FROM 'john_doe'@'localhost';</code>
              </div>

            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>User Roles</h3>
            <p>Instead of assigning permissions to every individual user one by view, you can create a <strong>Role</strong>, grant permissions to the Role, and then assign the Role to users. This makes security management much easier!</p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- 1. Create a Role</span><br/>
              <code style={{ color: '#c792ea' }}>CREATE ROLE</code> 'app_developer';<br/><br/>
              <span style={{ color: '#64748b' }}>-- 2. Grant permissions to the Role</span><br/>
              <code style={{ color: '#c792ea' }}>GRANT SELECT, INSERT, UPDATE, DELETE ON</code> company_db.* <code style={{ color: '#c792ea' }}>TO</code> 'app_developer';<br/><br/>
              <span style={{ color: '#64748b' }}>-- 3. Assign the Role to a user</span><br/>
              <code style={{ color: '#c792ea' }}>GRANT</code> 'app_developer' <code style={{ color: '#c792ea' }}>TO</code> 'alice'@'localhost';
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('tcl')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'tcl' && (
        <Section key="tcl" id="tcl" eyebrow="Safety" title="TCL (Transaction Control Language)">
          <div className="panel">
            <p><strong>Transactions</strong> are sequences of database operations (like multiple UPDATEs) that are treated as a single, logical unit of work. If any operation in the transaction fails, the entire transaction is cancelled.</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>The ACID Properties</h4>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.6, color: '#475569', margin: 0 }}>
                <li><strong>Atomicity:</strong> "All or nothing". Either the entire transaction succeeds, or it fails completely.</li>
                <li><strong>Consistency:</strong> The transaction brings the database from one valid state to another valid state.</li>
                <li><strong>Isolation:</strong> Concurrent transactions do not interfere with each other.</li>
                <li><strong>Durability:</strong> Once a transaction is committed, it is saved permanently, even in the event of a power loss.</li>
              </ul>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>TCL Commands</h3>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>COMMIT</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Permanently saves all changes made during the current transaction.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontSize: '0.85rem' }}>COMMIT;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>ROLLBACK</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Undoes all changes made in the current transaction, reverting to the last COMMIT.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#dc2626', fontSize: '0.85rem' }}>ROLLBACK;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>SAVEPOINT</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Creates a "bookmark" within a transaction, allowing you to rollback to that specific point instead of rolling back the entire transaction.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#d97706', fontSize: '0.85rem' }}>SAVEPOINT sp1; ... ROLLBACK TO sp1;</code>
              </div>
            </div>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Example: A Bank Transfer</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>START TRANSACTION</code>;<br/><br/>
              <span style={{ color: '#64748b' }}>-- Deduct $100 from Alice</span><br/>
              <code style={{ color: '#c792ea' }}>UPDATE</code> Accounts <code style={{ color: '#89ddff' }}>SET</code> balance = balance - <span style={{ color: '#f07178' }}>100</span> <code style={{ color: '#c792ea' }}>WHERE</code> name = <span style={{ color: '#c3e88d' }}>'Alice'</span>;<br/><br/>
              <span style={{ color: '#64748b' }}>-- Add $100 to Bob</span><br/>
              <code style={{ color: '#c792ea' }}>UPDATE</code> Accounts <code style={{ color: '#89ddff' }}>SET</code> balance = balance + <span style={{ color: '#f07178' }}>100</span> <code style={{ color: '#c792ea' }}>WHERE</code> name = <span style={{ color: '#c3e88d' }}>'Bob'</span>;<br/><br/>
              <span style={{ color: '#64748b' }}>-- If everything succeeded, save it forever!</span><br/>
              <code style={{ color: '#c792ea' }}>COMMIT</code>;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('procedures')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'procedures' && (
        <Section key="procedures" id="procedures" eyebrow="Automation" title="Stored Procedures">
          <div className="panel">
            <p>A <strong>Stored Procedure</strong> is prepared SQL code that you can save and reuse. Think of it like writing a function in a programming language, but it lives directly inside the database server!</p>
            <p>Procedures can accept parameters, execute complex multi-step logic (like loops and IF statements), and return results.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>CREATE & CALL PROCEDURE</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- DELIMITER is used so MySQL doesn't get confused by the internal semicolons</span><br/>
              <code style={{ color: '#89ddff' }}>DELIMITER //</code><br/><br/>
              <code style={{ color: '#c792ea' }}>CREATE PROCEDURE</code> GetEmployeesByDept(<code style={{ color: '#89ddff' }}>IN</code> deptName <span style={{ color: '#f78c6c' }}>VARCHAR(50)</span>)<br/>
              <code style={{ color: '#c792ea' }}>BEGIN</code><br/>
              &nbsp;&nbsp;<code style={{ color: '#c792ea' }}>SELECT</code> * <code style={{ color: '#c792ea' }}>FROM</code> Employees <code style={{ color: '#c792ea' }}>WHERE</code> department = deptName;<br/>
              <code style={{ color: '#c792ea' }}>END //</code><br/><br/>
              <code style={{ color: '#89ddff' }}>DELIMITER ;</code>
            </pre>

            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Executing the Procedure</h4>
              <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Once saved, you or your application can run this complex logic with a single, simple command!</p>
              <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#2563eb', fontSize: '0.85rem' }}>CALL GetEmployeesByDept('Engineering');</code>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('triggers')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'triggers' && (
        <Section key="triggers" id="triggers" eyebrow="Events" title="Triggers">
          <div className="panel">
            <p>A <strong>Trigger</strong> is a special type of stored procedure that automatically runs (fires) when an event occurs in the database server. They are perfect for maintaining audit logs or validating data automatically.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Trigger Events</h3>
            <p>You can set a trigger to fire <code>BEFORE</code> or <code>AFTER</code> a specific DML command is executed on a table:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              <li><code>BEFORE INSERT</code> / <code>AFTER INSERT</code></li>
              <li><code>BEFORE UPDATE</code> / <code>AFTER UPDATE</code></li>
              <li><code>BEFORE DELETE</code> / <code>AFTER DELETE</code></li>
            </ul>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Example: An Audit Log</h3>
            <p>Let's automatically log a record into an <code>EmployeeAudits</code> table every time a new employee is hired (inserted).</p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#89ddff' }}>DELIMITER //</code><br/><br/>
              <code style={{ color: '#c792ea' }}>CREATE TRIGGER</code> after_employee_insert<br/>
              <code style={{ color: '#c792ea' }}>AFTER INSERT ON</code> Employees<br/>
              <code style={{ color: '#c792ea' }}>FOR EACH ROW</code><br/>
              <code style={{ color: '#c792ea' }}>BEGIN</code><br/>
              &nbsp;&nbsp;<span style={{ color: '#64748b' }}>-- 'NEW' keyword refers to the row that was just inserted!</span><br/>
              &nbsp;&nbsp;<code style={{ color: '#c792ea' }}>INSERT INTO</code> EmployeeAudits (emp_id, action_date, action_type)<br/>
              &nbsp;&nbsp;<code style={{ color: '#89ddff' }}>VALUES</code> (<code style={{ color: '#82aaff' }}>NEW</code>.emp_id, <code style={{ color: '#82aaff' }}>NOW()</code>, <span style={{ color: '#c3e88d' }}>'New Hire'</span>);<br/>
              <code style={{ color: '#c792ea' }}>END //</code><br/><br/>
              <code style={{ color: '#89ddff' }}>DELIMITER ;</code>
            </pre>

            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginTop: '1.5rem', fontSize: '0.9rem' }}>
              <p style={{ margin: 0, color: '#991b1b' }}><strong>🚨 NEW vs OLD 🚨</strong></p>
              <p style={{ margin: 0, marginTop: '0.5rem', color: '#b91c1c' }}>Inside a Trigger, the <code>NEW</code> keyword accesses the data being inserted/updated. The <code>OLD</code> keyword accesses the data as it was <em>before</em> the update/delete happened!</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 9 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Professional Developer Challenge</h3>
            <p>Put your enterprise-level SQL skills to the test!</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: Transaction Safety</h4>
              <p style={{ color: '#475569' }}>You are writing a script that updates user balances. You run `START TRANSACTION`, update Alice's balance, but then your system crashes before executing the next line. Because of the ACID properties, what happens to Alice's balance?</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: The Salary Trigger</h4>
              <p style={{ color: '#475569' }}>You want to prevent HR from accidentally entering negative salaries. Would you use a <code>BEFORE UPDATE</code> or an <code>AFTER UPDATE</code> trigger to validate the salary amount, and why?</p>
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
