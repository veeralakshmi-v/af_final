import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Code, Play, CheckCircle, Shield, RefreshCw, Zap, Lock, BookOpen, Layers, Terminal, AlertTriangle, Plus, Bell } from 'lucide-react';

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
  // Stored Procedure simple interactive demo state
  const [selectedDept, setSelectedDept] = useState('Engineering');

  // Trigger simple interactive demo state
  const [employeesList, setEmployeesList] = useState([
    { id: 101, name: 'Alice Smith', dept: 'Engineering', salary: '$85,000' },
    { id: 102, name: 'Bob Jones', dept: 'Marketing', salary: '$55,000' }
  ]);
  const [auditLogsList, setAuditLogsList] = useState([
    { log_id: 1, event: 'System Initialized', emp_id: 'SYSTEM', time: '10:00:00 AM' }
  ]);
  const [triggerFired, setTriggerFired] = useState(false);

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module9', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddEmployeeWithTrigger = () => {
    const newId = 100 + employeesList.length + 1;
    const newEmp = { id: newId, name: 'David Miller', dept: 'Sales', salary: '$75,000' };
    
    // Add to employees
    setEmployeesList([...employeesList, newEmp]);

    // TRIGGER AUTOMATICALLY FIRES! Adds record to audit log
    const currentTime = new Date().toLocaleTimeString();
    const newLog = {
      log_id: auditLogsList.length + 1,
      event: `AFTER INSERT TRIGGER: New Hire Logged (${newEmp.name})`,
      emp_id: `#${newId}`,
      time: currentTime
    };
    setAuditLogsList([...auditLogsList, newLog]);
    setTriggerFired(true);
  };

  const sampleStaffData = {
    Engineering: [
      { id: 101, name: 'Alice Smith', role: 'Backend Lead', salary: '$85,000' },
      { id: 103, name: 'Carol White', role: 'DevOps Eng', salary: '$92,000' }
    ],
    Marketing: [
      { id: 102, name: 'Bob Jones', role: 'SEO Manager', salary: '$55,000' },
      { id: 105, name: 'Eva Davis', role: 'Content Lead', salary: '$62,000' }
    ],
    Sales: [
      { id: 104, name: 'David Brown', role: 'Account Exec', salary: '$48,000' }
    ]
  };

  return (
    <AnimatePresence mode="wait">

      {/* ========================================================= */}
      {/* 1. DCL TAB (SECURITY & PERMISSIONS) */}
      {/* ========================================================= */}
      {activeTab === 'dcl' && (
        <Section key="dcl" id="dcl" eyebrow="Day 9 • Security" title="DCL (Grant & Revoke Permissions)">
          <div className="panel">
            
            {/* Simple Concept Box */}
            <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#1e40af', margin: '0 0 0.5rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} color="#3b82f6" /> What is DCL? (Database Security)
              </h3>
              <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <strong>DCL (Data Control Language)</strong> commands control <strong>WHO can access what data</strong> in your database! 
                Just like giving hotel keycards to guests, you grant permissions to users.
              </p>
            </div>

            {/* The 2 Main DCL Commands */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>The 2 Key Commands</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Command 1</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>GRANT (Give Permission)</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Gives a user permission to read or write data.</p>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#6ee7b7', margin: 0 }}>
                  <code>GRANT SELECT, INSERT ON Employees<br/>TO 'alex_developer';</code>
                </pre>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>Command 2</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>REVOKE (Take Back Permission)</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Removes a user's permission when they change roles.</p>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#f43f5e', margin: 0 }}>
                  <code>REVOKE INSERT ON Employees<br/>FROM 'alex_developer';</code>
                </pre>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('tcl')}>Next: Transactions (TCL) &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 2. TCL TAB (TRANSACTIONS) */}
      {/* ========================================================= */}
      {activeTab === 'tcl' && (
        <Section key="tcl" id="tcl" eyebrow="Day 9 • Safety" title="TCL (Transactions: Commit & Rollback)">
          <div className="panel">
            
            {/* Simple Concept Box */}
            <div style={{ background: '#faf5ff', borderLeft: '4px solid #8b5cf6', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#6b21a8', margin: '0 0 0.5rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={20} color="#8b5cf6" /> What is a Transaction? (Bank Transfer Analogy)
              </h3>
              <p style={{ margin: 0, color: '#581c87', fontSize: '0.95rem', lineHeight: '1.6' }}>
                A <strong>Transaction</strong> groups multiple SQL queries into an <strong>"All or Nothing"</strong> operation! 
                For example: If you transfer $100 from Alice to Bob, both accounts MUST update together. If system crashes halfway, changes are undone!
              </p>
            </div>

            {/* Simple Bank Transfer Example */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: '#0f172a' }}>🏦 Simple Real-World Example: Safe Money Transfer</h4>
              
              <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '10px', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                <code>
<span style={{ color: '#38bdf8' }}>-- 1. Start the transaction</span><br/>
<span style={{ color: '#c792ea' }}>START TRANSACTION</span>;<br/><br/>

<span style={{ color: '#38bdf8' }}>-- 2. Deduct $100 from Alice</span><br/>
<span style={{ color: '#c792ea' }}>UPDATE</span> Accounts <span style={{ color: '#89ddff' }}>SET</span> balance = balance - 100 <span style={{ color: '#c792ea' }}>WHERE</span> name = 'Alice';<br/><br/>

<span style={{ color: '#38bdf8' }}>-- 3. Add $100 to Bob</span><br/>
<span style={{ color: '#c792ea' }}>UPDATE</span> Accounts <span style={{ color: '#89ddff' }}>SET</span> balance = balance + 100 <span style={{ color: '#c792ea' }}>WHERE</span> name = 'Bob';<br/><br/>

<span style={{ color: '#38bdf8' }}>-- 4. If all succeeded, SAVE PERMANENTLY!</span><br/>
<span style={{ color: '#a6e3a1' }}>COMMIT</span>;<br/><br/>

<span style={{ color: '#38bdf8' }}>-- (If error happens, UNDO EVERYTHING!):</span><br/>
<span style={{ color: '#f43f5e' }}>-- ROLLBACK;</span>
                </code>
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('procedures')}>Next: Stored Procedures &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 3. STORED PROCEDURES TAB (SUPER SIMPLE & CLEAR FOR BEGINNERS) */}
      {/* ========================================================= */}
      {activeTab === 'procedures' && (
        <Section key="procedures" id="procedures" eyebrow="Day 9 • Automation" title="Stored Procedures (Saved Shortcuts)">
          <div className="panel">
            
            {/* Simple Concept Box */}
            <div style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={20} color="#10b981" /> What is a Stored Procedure? (Simple Analogy)
              </h3>
              <p style={{ margin: 0, color: '#14532d', fontSize: '0.95rem', lineHeight: '1.6' }}>
                A <strong>Stored Procedure</strong> is like a <strong>"Saved Recipe"</strong> or a <strong>"Shortcut Button 🔘"</strong>! 
                Instead of typing long SQL queries every day, you save your queries once with a name. Then, you simply call that name whenever you need it!
              </p>
            </div>

            {/* How It Works in 2 Simple Steps */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>How Stored Procedures Work (2 Easy Steps)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              
              {/* Step 1: Create */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' }}>Step 1: Save the Procedure</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>CREATE PROCEDURE</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Write the SQL code once and save it in database.</p>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#38bdf8', overflowX: 'auto', margin: 0 }}>
                  <code>CREATE PROCEDURE GetDeptStaff(<br/>&nbsp;&nbsp;IN dept_name VARCHAR(50)<br/>)<br/>BEGIN<br/>&nbsp;&nbsp;SELECT * FROM Employees<br/>&nbsp;&nbsp;WHERE department = dept_name;<br/>END;</code>
                </pre>
              </div>

              {/* Step 2: Call */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Step 2: Run the Procedure</span>
                <h4 style={{ margin: '4px 0 0.5rem 0', color: '#0f172a' }}>CALL PROCEDURE</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>Run the procedure anytime with 1 simple line!</p>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: '#a6e3a1', overflowX: 'auto', margin: 0 }}>
                  <code>-- Just pass department name as parameter!<br/>CALL GetDeptStaff('Engineering');<br/><br/>CALL GetDeptStaff('Marketing');</code>
                </pre>
              </div>

            </div>

            {/* Proper Interactive Beginner Demo */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={16} color="#10b981" fill="#10b981" /> Interactive Try-It: Call `GetDeptStaff` Procedure
              </h4>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>Select Parameter (dept_name):</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['Engineering', 'Marketing', 'Sales'].map(dept => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: '6px',
                        border: selectedDept === dept ? '2px solid #10b981' : '1px solid #cbd5e1',
                        background: selectedDept === dept ? '#10b98115' : '#ffffff',
                        color: selectedDept === dept ? '#059669' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.83rem',
                        cursor: 'pointer'
                      }}
                    >
                      '{dept}'
                    </button>
                  ))}
                </div>
              </div>

              {/* Procedure Call Code Display */}
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#a6e3a1', fontFamily: 'monospace', fontSize: '0.88rem', marginBottom: '1rem' }}>
                CALL GetDeptStaff('{selectedDept}');
              </div>

              {/* Output Result Table */}
              <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#15803d', display: 'block', marginBottom: '0.5rem' }}>
                  ✓ Procedure Returned {sampleStaffData[selectedDept].length} Staff Record(s) for '{selectedDept}'
                </span>
                <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '6px', textAlign: 'left' }}>ID</th>
                      <th style={{ padding: '6px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '6px', textAlign: 'left' }}>Role</th>
                      <th style={{ padding: '6px', textAlign: 'right' }}>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleStaffData[selectedDept].map(row => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px', fontFamily: 'monospace' }}>{row.id}</td>
                        <td style={{ padding: '6px', fontWeight: 600 }}>{row.name}</td>
                        <td style={{ padding: '6px', color: '#64748b' }}>{row.role}</td>
                        <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>{row.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('triggers')}>Next: SQL Triggers &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 4. TRIGGERS TAB (SUPER SIMPLE & INTERACTIVE FOR BEGINNERS) */}
      {/* ========================================================= */}
      {activeTab === 'triggers' && (
        <Section key="triggers" id="triggers" eyebrow="Day 9 • Automation" title="SQL Triggers (Automatic Event Handlers)">
          <div className="panel">
            
            {/* Simple Concept Box */}
            <div style={{ background: '#fff1f2', borderLeft: '4px solid #ef4444', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#991b1b', margin: '0 0 0.5rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} color="#ef4444" /> What is a Trigger? (Motion Sensor Analogy)
              </h3>
              <p style={{ margin: 0, color: '#9f1239', fontSize: '0.95rem', lineHeight: '1.6' }}>
                A <strong>Trigger</strong> is like an <strong>Automatic Security Alarm / Motion Sensor 🚨</strong>! 
                You attach it to a table. Whenever a row is added, changed, or deleted, the trigger <strong>automatically fires an action</strong> without you running extra code!
              </p>
            </div>

            {/* 3 Main Trigger Events */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>When Do Triggers Fire?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Event 1</span>
                <h4 style={{ margin: '4px 0 0.4rem 0', color: '#0f172a' }}>AFTER INSERT</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Fires automatically right after a new row is added (e.g. send welcome email or log new hire).</p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase' }}>Event 2</span>
                <h4 style={{ margin: '4px 0 0.4rem 0', color: '#0f172a' }}>AFTER UPDATE</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Fires automatically when data changes (e.g. track price changes or audit edits).</p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>Event 3</span>
                <h4 style={{ margin: '4px 0 0.4rem 0', color: '#0f172a' }}>BEFORE DELETE</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Fires before a row is removed (e.g. backup deleted data before it is lost).</p>
              </div>
            </div>

            {/* Simple Code Example */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Code Example: Automatically Log New Hires</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '0.75rem' }}>
                Every time someone inserts a row into <code>Employees</code>, this trigger automatically inserts a log record into <code>AuditLog</code>.
              </p>
              
              <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '10px', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                <code>
<span style={{ color: '#c792ea' }}>CREATE TRIGGER</span> log_new_hire<br/>
<span style={{ color: '#c792ea' }}>AFTER INSERT ON</span> Employees<br/>
<span style={{ color: '#c792ea' }}>FOR EACH ROW</span><br/>
<span style={{ color: '#c792ea' }}>BEGIN</span><br/>
&nbsp;&nbsp;<span style={{ color: '#64748b' }}>-- NEW refers to the employee row being inserted!</span><br/>
&nbsp;&nbsp;<span style={{ color: '#c792ea' }}>INSERT INTO</span> AuditLog (emp_id, message, log_time)<br/>
&nbsp;&nbsp;<span style={{ color: '#89ddff' }}>VALUES</span> (<span style={{ color: '#82aaff' }}>NEW</span>.emp_id, 'New Hire Added', <span style={{ color: '#82aaff' }}>NOW()</span>);<br/>
<span style={{ color: '#c792ea' }}>END</span>;
                </code>
              </pre>
            </div>

            {/* Interactive Try-It Trigger Simulator */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bell size={18} color="#ef4444" /> Interactive Trigger Simulator: Insert Employee Row
                  </h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                    Click button below to execute: <code>INSERT INTO Employees VALUES ('David Miller', '$75,000');</code>
                  </p>
                </div>

                <button
                  onClick={handleAddEmployeeWithTrigger}
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} /> Insert Row & Fire Trigger
                </button>
              </div>

              {triggerFired && (
                <div style={{ padding: '0.75rem 1rem', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', fontSize: '0.85rem', color: '#991b1b', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={16} color="#ef4444" /> ⚡ TRIGGER FIRED AUTOMATICALLY! Audit log entry created without manual INSERT command!
                </div>
              )}

              {/* Side by Side Tables */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                
                {/* Employees Table */}
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
                    1. Employees Table ({employeesList.length} rows)
                  </span>
                  <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9' }}>
                        <th style={{ padding: '5px', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '5px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '5px', textAlign: 'left' }}>Dept</th>
                        <th style={{ padding: '5px', textAlign: 'right' }}>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeesList.map(emp => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '5px', fontFamily: 'monospace' }}>#{emp.id}</td>
                          <td style={{ padding: '5px', fontWeight: 600 }}>{emp.name}</td>
                          <td style={{ padding: '5px', color: '#64748b' }}>{emp.dept}</td>
                          <td style={{ padding: '5px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>{emp.salary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* AuditLog Table */}
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', display: 'block', marginBottom: '0.5rem' }}>
                    2. AuditLog Table (Created by Trigger ⚡)
                  </span>
                  <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#fff1f2' }}>
                        <th style={{ padding: '5px', textAlign: 'left' }}>Log ID</th>
                        <th style={{ padding: '5px', textAlign: 'left' }}>Event Message</th>
                        <th style={{ padding: '5px', textAlign: 'right' }}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogsList.map(log => (
                        <tr key={log.log_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '5px', fontFamily: 'monospace' }}>L{log.log_id}</td>
                          <td style={{ padding: '5px', fontWeight: 600, color: '#991b1b' }}>{log.event}</td>
                          <td style={{ padding: '5px', textAlign: 'right', color: '#64748b' }}>{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Next: Assignment &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* ========================================================= */}
      {/* 5. ASSIGNMENT TAB */}
      {/* ========================================================= */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 9 • Homework" title="Day 9 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Simple Homework Challenge</h3>
            <p>Test your knowledge on stored procedures and security!</p>
            
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1rem', marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.4rem', color: '#1e293b' }}>Task 1: Stored Procedure</h4>
              <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>Write SQL to create a procedure called <code>GetAllProducts</code> that selects all records from the <code>Products</code> table.</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.4rem', color: '#1e293b' }}>Task 2: Call Procedure</h4>
              <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>Write the single-line SQL command to execute/call your <code>GetAllProducts</code> procedure.</p>
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
