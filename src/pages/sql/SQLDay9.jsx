import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Code, Play, CheckCircle, Shield, RefreshCw, Zap, Lock, BookOpen, Layers, Terminal, AlertTriangle, Plus, Bell, Sparkles } from 'lucide-react';

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
      {/* 3. STORED PROCEDURES TAB (COMPREHENSIVE & DEEP GUIDE) */}
      {/* ========================================================= */}
      {activeTab === 'procedures' && (
        <Section key="procedures" id="procedures" eyebrow="Day 9 • Database Programming" title="Stored Procedures & Functions (Database Automation)">
          <div className="panel">
            
            {/* Simple Concept Box */}
            <div style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '1.35rem', borderRadius: '14px', marginBottom: '2rem' }}>
              <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={22} color="#10b981" /> What is a Stored Procedure? (Database Subroutine)
              </h3>
              <p style={{ margin: 0, color: '#14532d', fontSize: '0.96rem', lineHeight: '1.65' }}>
                A <strong>Stored Procedure</strong> is a <strong>pre-compiled collection of one or more SQL statements</strong> saved directly on the database server.
                Think of it like a <strong>reusable function or shortcut program</strong> in the database: instead of sending complex SQL across the network multiple times, you write and compile it once, and then trigger it anytime using a simple <code>CALL procedure_name()</code> command!
              </p>
            </div>

            {/* Why Use Stored Procedures? 4 Superpowers */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#10b981" /> Why Do Professional Teams Use Stored Procedures?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.15rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <Zap size={18} color="#f59e0b" />
                  <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1rem' }}>1. Precompiled Speed</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                  The database parses, optimizes, and compiles the execution plan <strong>on first run</strong>. Subsequent executions reuse the cached plan, executing significantly faster than raw queries.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <Shield size={18} color="#3b82f6" />
                  <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1rem' }}>2. Granular Security</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                  You can grant developers or applications <code>EXECUTE</code> permissions on a procedure without giving them direct <code>SELECT</code>, <code>UPDATE</code>, or <code>DELETE</code> rights on sensitive underlying tables.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <RefreshCw size={18} color="#8b5cf6" />
                  <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1rem' }}>3. DRY & Encapsulated Logic</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                  Centralize core business rules in the database. If rules change (e.g., tax calculation), update the procedure once instead of updating 10 different web, mobile, and backend apps.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <Database size={18} color="#10b981" />
                  <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1rem' }}>4. Reduced Network Traffic</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                  A single procedure call can execute 20 complex statements internally inside the DB server, returning only the final result instead of transferring megabytes across the network.
                </p>
              </div>

            </div>

            {/* The Delimiter Concept in MySQL */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.25rem', marginBottom: '2.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.98rem' }}>
                <AlertTriangle size={18} color="#d97706" /> Why do we use `DELIMITER //` in MySQL?
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#78350f', margin: '0 0 0.5rem 0', lineHeight: '1.55' }}>
                By default, MySQL treats a semicolon (<code>;</code>) as the end of a statement. Because a Stored Procedure contains multiple SQL statements each ending with <code>;</code>, we temporarily switch the delimiter to <code>//</code> or <code>$$</code> so MySQL knows to send the entire block to the server as one unit!
              </p>
              <pre style={{ background: '#1e293b', color: '#fde68a', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.8rem', margin: 0 }}>
                <code>DELIMITER //<br/>CREATE PROCEDURE MyProc()<br/>BEGIN<br/>&nbsp;&nbsp;SELECT * FROM Employees;<br/>END // <br/>DELIMITER ;</code>
              </pre>
            </div>

            {/* The 3 Parameter Modes (IN, OUT, INOUT) */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>The 3 Stored Procedure Parameter Modes</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '1.25rem' }}>
              Procedures become super powerful when you pass data in and receive calculated values back.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              
              {/* IN Parameter */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>Mode 1 (Default)</span>
                  <h4 style={{ margin: '8px 0 0.4rem 0', color: '#0f172a' }}>IN Parameter (Input Only)</h4>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '0.75rem' }}>
                    Passes a value from the caller <strong>into</strong> the procedure. The procedure can read it, but cannot modify the original variable outside.
                  </p>
                </div>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', color: '#38bdf8', overflowX: 'auto', margin: 0 }}>
                  <code>CREATE PROCEDURE GetDeptStaff(<br/>&nbsp;&nbsp;IN dept_name VARCHAR(50)<br/>)<br/>BEGIN<br/>&nbsp;&nbsp;SELECT * FROM Employees<br/>&nbsp;&nbsp;WHERE department = dept_name;<br/>END;</code>
                </pre>
              </div>

              {/* OUT Parameter */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>Mode 2</span>
                  <h4 style={{ margin: '8px 0 0.4rem 0', color: '#0f172a' }}>OUT Parameter (Output Only)</h4>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '0.75rem' }}>
                    Calculates a value inside the procedure and <strong>returns it back</strong> to the caller in a user variable.
                  </p>
                </div>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', color: '#a6e3a1', overflowX: 'auto', margin: 0 }}>
                  <code>CREATE PROCEDURE GetDeptCount(<br/>&nbsp;&nbsp;IN dept_name VARCHAR(50),<br/>&nbsp;&nbsp;OUT total_count INT<br/>)<br/>BEGIN<br/>&nbsp;&nbsp;SELECT COUNT(*) INTO total_count<br/>&nbsp;&nbsp;FROM Employees<br/>&nbsp;&nbsp;WHERE department = dept_name;<br/>END;</code>
                </pre>
              </div>

              {/* INOUT Parameter */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', background: '#f5f3ff', padding: '2px 8px', borderRadius: '4px' }}>Mode 3</span>
                  <h4 style={{ margin: '8px 0 0.4rem 0', color: '#0f172a' }}>INOUT Parameter (Dual Purpose)</h4>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '0.75rem' }}>
                    Caller passes an initial value in, the procedure <strong>modifies it</strong>, and returns the modified result.
                  </p>
                </div>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', color: '#c4b5fd', overflowX: 'auto', margin: 0 }}>
                  <code>CREATE PROCEDURE AddBonus(<br/>&nbsp;&nbsp;INOUT current_salary DECIMAL(10,2),<br/>&nbsp;&nbsp;IN bonus_percent DECIMAL(4,2)<br/>)<br/>BEGIN<br/>&nbsp;&nbsp;SET current_salary = current_salary + <br/>&nbsp;&nbsp;&nbsp;&nbsp;(current_salary * (bonus_percent / 100));<br/>END;</code>
                </pre>
              </div>

            </div>

            {/* Control Flow & Programming inside Stored Procedures */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Variables & Control Flow (IF / ELSE / WHILE)</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '1.25rem' }}>
              Unlike simple SQL queries, Stored Procedures are true procedural programs with local variables, conditional branching, and loops!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '0.95rem' }}>1. Local Variables (DECLARE & SET)</h4>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', color: '#e2e8f0', margin: 0 }}>
                  <code>DECLARE total_tax DECIMAL(10,2) DEFAULT 0.00;<br/>DECLARE emp_count INT;<br/><br/>SET total_tax = subtotal * 0.18;</code>
                </pre>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '0.95rem' }}>2. Conditional Logic (IF / ELSEIF / ELSE)</h4>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', color: '#e2e8f0', margin: 0 }}>
                  <code>IF salary &gt;= 80000 THEN<br/>&nbsp;&nbsp;SET tier = 'Senior Grade';<br/>ELSEIF salary &gt;= 50000 THEN<br/>&nbsp;&nbsp;SET tier = 'Mid Grade';<br/>ELSE<br/>&nbsp;&nbsp;SET tier = 'Associate';<br/>END IF;</code>
                </pre>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '0.95rem' }}>3. Iteration & Loops (WHILE / REPEAT)</h4>
                <pre style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', color: '#e2e8f0', margin: 0 }}>
                  <code>DECLARE i INT DEFAULT 1;<br/>WHILE i &lt;= 5 DO<br/>&nbsp;&nbsp;INSERT INTO BatchQueue VALUES (i, NOW());<br/>&nbsp;&nbsp;SET i = i + 1;<br/>END WHILE;</code>
                </pre>
              </div>
            </div>

            {/* ========================================================= */}
            {/* CORE COMPARISON: VIEW vs STORED PROCEDURE */}
            {/* ========================================================= */}
            <div style={{ background: '#ffffff', border: '2px solid #3b82f630', borderRadius: '16px', padding: '1.5rem', marginBottom: '2.5rem', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#3b82f6', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.05em' }}>
                  ESSENTIAL INTERVIEW MATRIX
                </div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#0f172a' }}>
                  Key Differences: SQL View vs. Stored Procedure
                </h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Both Views and Stored Procedures store database logic, but they serve completely different engineering purposes. Here is the complete breakdown:
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.84rem', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '10px 12px', color: '#334155', fontWeight: 700, width: '22%' }}>Comparison Feature</th>
                      <th style={{ padding: '10px 12px', color: '#2563eb', fontWeight: 700, width: '39%', background: '#eff6ff30' }}>
                        👁️ SQL View (Virtual Table)
                      </th>
                      <th style={{ padding: '10px 12px', color: '#059669', fontWeight: 700, width: '39%', background: '#ecfdf530' }}>
                        ⚡ Stored Procedure (Database Program)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>1. Fundamental Nature</td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        A <strong>saved SELECT query</strong> that acts as a virtual table on disk.
                      </td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        A <strong>pre-compiled procedural subroutine</strong> with statements & variables.
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>2. Parameter Support</td>
                      <td style={{ padding: '10px 12px', color: '#ef4444', fontWeight: 600 }}>
                        ❌ No parameters accepted.
                      </td>
                      <td style={{ padding: '10px 12px', color: '#10b981', fontWeight: 600 }}>
                        ✓ Full support for <code>IN</code>, <code>OUT</code>, and <code>INOUT</code> parameters.
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>3. How It Is Executed</td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        Queried like a table: <br/><code>SELECT * FROM ViewName;</code>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        Invoked via execution command: <br/><code>CALL ProcedureName(args);</code>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>4. Usage inside SELECT queries</td>
                      <td style={{ padding: '10px 12px', color: '#10b981', fontWeight: 600 }}>
                        ✓ Can be used inside <code>SELECT</code>, <code>JOIN</code>, <code>WHERE</code>, <code>GROUP BY</code>.
                      </td>
                      <td style={{ padding: '10px 12px', color: '#ef4444', fontWeight: 600 }}>
                        ❌ Cannot be referenced inside a <code>SELECT</code> statement or <code>JOIN</code>.
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>5. Operations Allowed</td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        Primarily read-only <code>SELECT</code> (only simple 1-table views allow limited updates).
                      </td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        Can execute <strong>any DML & DDL</strong> (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>CREATE</code>, <code>DROP</code>).
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>6. Control Flow & Variables</td>
                      <td style={{ padding: '10px 12px', color: '#ef4444' }}>
                        ❌ No variables, no <code>IF/ELSE</code>, no loops.
                      </td>
                      <td style={{ padding: '10px 12px', color: '#10b981' }}>
                        ✓ Full control flow: <code>DECLARE</code>, <code>IF/ELSE</code>, <code>WHILE</code>, <code>CASE</code>.
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>7. Transactions (TCL)</td>
                      <td style={{ padding: '10px 12px', color: '#ef4444' }}>
                        ❌ Cannot initiate transactions or rollback.
                      </td>
                      <td style={{ padding: '10px 12px', color: '#10b981' }}>
                        ✓ Can contain <code>START TRANSACTION</code>, <code>COMMIT</code>, and <code>ROLLBACK</code>.
                      </td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>8. Compilation & Caching</td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        Parsed and executed on every query run.
                      </td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>
                        <strong>Pre-compiled & cached</strong> execution plan on DB server.
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>9. Primary Use Case</td>
                      <td style={{ padding: '10px 12px', color: '#2563eb', fontWeight: 600 }}>
                        Data masking (hiding columns), simplifying complex multi-table joins for reporting.
                      </td>
                      <td style={{ padding: '10px 12px', color: '#059669', fontWeight: 600 }}>
                        Complex business operations, batch data processing, transactional workflows (e.g. checkout, payroll).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Multi-Tab Interactive Try-It Studio */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Play size={18} color="#10b981" fill="#10b981" /> Interactive Stored Procedure Simulator
                </h4>
                <span style={{ fontSize: '0.78rem', color: '#64748b', background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  Live MySQL Engine Simulation
                </span>
              </div>

              {/* Demo Mode Selector Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedDept('Engineering')}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: selectedDept === 'Engineering' ? '#0f172a' : '#ffffff',
                    color: selectedDept === 'Engineering' ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Dept: 'Engineering'
                </button>
                <button
                  onClick={() => setSelectedDept('Marketing')}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: selectedDept === 'Marketing' ? '#0f172a' : '#ffffff',
                    color: selectedDept === 'Marketing' ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Dept: 'Marketing'
                </button>
                <button
                  onClick={() => setSelectedDept('Sales')}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: selectedDept === 'Sales' ? '#0f172a' : '#ffffff',
                    color: selectedDept === 'Sales' ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Dept: 'Sales'
                </button>
              </div>

              {/* Procedure Call Code Display */}
              <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '8px', color: '#a6e3a1', fontFamily: 'monospace', fontSize: '0.88rem', marginBottom: '1rem' }}>
                <span style={{ color: '#64748b' }}>-- 1. Execute Stored Procedure with IN parameter:</span><br/>
                <span style={{ color: '#38bdf8' }}>CALL</span> GetDeptStaff(<span style={{ color: '#fde68a' }}>'{selectedDept}'</span>);<br/><br/>
                <span style={{ color: '#64748b' }}>-- 2. Execute Procedure with IN and OUT parameters:</span><br/>
                <span style={{ color: '#38bdf8' }}>CALL</span> GetDeptBudgetSummary(<span style={{ color: '#fde68a' }}>'{selectedDept}'</span>, <span style={{ color: '#c4b5fd' }}>@total_budget</span>, <span style={{ color: '#c4b5fd' }}>@headcount</span>);<br/>
                <span style={{ color: '#38bdf8' }}>SELECT</span> <span style={{ color: '#c4b5fd' }}>@total_budget</span> AS DeptBudget, <span style={{ color: '#c4b5fd' }}>@headcount</span> AS StaffCount;
              </div>

              {/* Dual Output Results */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                
                {/* 1. Result Set from IN Procedure */}
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', display: 'block', marginBottom: '0.5rem' }}>
                    ✓ Result Set 1: Staff Rows ({sampleStaffData[selectedDept].length} record(s))
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

                {/* 2. OUT Variables Returned */}
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8b5cf6', display: 'block', marginBottom: '0.5rem' }}>
                    ✓ Result Set 2: Captured OUT Variables
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <div style={{ background: '#f5f3ff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6b21a8', display: 'block', fontWeight: 600 }}>@headcount (OUT)</span>
                      <strong style={{ fontSize: '1.25rem', color: '#581c87' }}>{sampleStaffData[selectedDept].length} members</strong>
                    </div>
                    <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                      <span style={{ fontSize: '0.75rem', color: '#047857', display: 'block', fontWeight: 600 }}>@total_budget (OUT)</span>
                      <strong style={{ fontSize: '1.25rem', color: '#065f46' }}>
                        ${sampleStaffData[selectedDept].reduce((acc, curr) => acc + parseInt(curr.salary.replace(/[^0-9]/g, '')), 0).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Management Commands */}
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Managing Stored Procedures</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', color: '#ef4444', fontSize: '0.9rem' }}>DROP PROCEDURE</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>Delete a procedure safely if it exists:</p>
                <code style={{ background: '#0f172a', color: '#f43f5e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', display: 'block' }}>
                  DROP PROCEDURE IF EXISTS GetDeptStaff;
                </code>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', color: '#3b82f6', fontSize: '0.9rem' }}>SHOW CREATE PROCEDURE</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>Inspect the underlying SQL code:</p>
                <code style={{ background: '#0f172a', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', display: 'block' }}>
                  SHOW CREATE PROCEDURE GetDeptStaff;
                </code>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', width: '100%' }}>
                
                {/* Employees Table */}
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', overflowX: 'auto', width: '100%' }}>
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
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', overflowX: 'auto', width: '100%' }}>
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
                          <td style={{ padding: '5px', fontWeight: 600, color: '#991b1b', wordBreak: 'break-word', maxWidth: '200px' }}>{log.event}</td>
                          <td style={{ padding: '5px', textAlign: 'right', color: '#64748b', whiteSpace: 'nowrap' }}>{log.time}</td>
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
