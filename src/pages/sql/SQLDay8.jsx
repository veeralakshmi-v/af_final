import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Code, Play, CheckCircle, ArrowRight, Table, Filter, Layers, Zap } from 'lucide-react';

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

// Sample Database Datasets for Interactive Examples
const sampleEmpData = [
  { id: 101, name: 'Alice Smith', dept_id: 'D01', dept_name: 'Engineering', salary: 85000, loc: 'NY' },
  { id: 102, name: 'Bob Jones', dept_id: 'D02', dept_name: 'Marketing', salary: 55000, loc: 'SF' },
  { id: 103, name: 'Carol White', dept_id: 'D01', dept_name: 'Engineering', salary: 92000, loc: 'NY' },
  { id: 104, name: 'David Brown', dept_id: 'D03', dept_name: 'Sales', salary: 48000, loc: 'CHI' },
  { id: 105, name: 'Eva Davis', dept_id: 'D02', dept_name: 'Marketing', salary: 62000, loc: 'SF' },
  { id: 106, name: 'Frank Miller', dept_id: 'D01', dept_name: 'Engineering', salary: 71000, loc: 'NY' }
];

const subqueryInteractiveExamples = {
  single_row: {
    id: 'single_row',
    title: '1. Single-Row Subquery',
    badgeColor: '#3b82f6',
    summary: 'Returns exactly ONE single value (1 row, 1 column). Used with standard comparison operators like =, >, <, >=, <=.',
    goal: 'Find all employees earning more than the company average salary ($68,833).',
    sql: `-- Step 1: Subquery (SELECT AVG(salary) FROM Emp) returns $68,833
-- Step 2: Outer query selects employees with salary > $68,833

SELECT emp_id, name, salary, dept_name 
FROM Emp 
WHERE salary > (
    SELECT AVG(salary) 
    FROM Emp
);`,
    step1: 'Inner Subquery evaluates: SELECT AVG(salary) FROM Emp  ➜  Output = $68,833',
    step2: 'Outer Query filters: WHERE salary > 68833',
    resultRows: [
      { emp_id: 101, name: 'Alice Smith', salary: '$85,000', dept_name: 'Engineering' },
      { emp_id: 103, name: 'Carol White', salary: '$92,000', dept_name: 'Engineering' },
      { emp_id: 106, name: 'Frank Miller', salary: '$71,000', dept_name: 'Engineering' }
    ]
  },
  multi_row: {
    id: 'multi_row',
    title: '2. Multiple-Row Subquery (IN / ANY / ALL)',
    badgeColor: '#10b981',
    summary: 'Returns multiple rows (1 column, multi-rows). Must be paired with set operators like IN, NOT IN, ANY, or ALL.',
    goal: 'Find all employees working in departments located in "New York" (NY).',
    sql: `-- Step 1: Subquery retrieves department IDs located in 'NY' -> ['D01']
-- Step 2: Outer query selects employees matching dept_id IN ('D01')

SELECT emp_id, name, dept_name, loc, salary 
FROM Emp 
WHERE dept_id IN (
    SELECT dept_id 
    FROM Dept 
    WHERE loc = 'NY'
);`,
    step1: "Inner Subquery evaluates: SELECT dept_id FROM Dept WHERE loc='NY'  ➜  Output = ['D01']",
    step2: "Outer Query filters: WHERE dept_id IN ('D01')",
    resultRows: [
      { emp_id: 101, name: 'Alice Smith', dept_name: 'Engineering', loc: 'NY', salary: '$85,000' },
      { emp_id: 103, name: 'Carol White', dept_name: 'Engineering', loc: 'NY', salary: '$92,000' },
      { emp_id: 106, name: 'Frank Miller', dept_name: 'Engineering', loc: 'NY', salary: '$71,000' }
    ]
  },
  correlated: {
    id: 'correlated',
    title: '3. Correlated Subquery (Row-by-Row Evaluation)',
    badgeColor: '#8b5cf6',
    summary: 'The subquery references a column from the outer query (e1.dept_id = e2.dept_id). It re-executes for EVERY row processed.',
    goal: 'Find employees who earn higher than the average salary of THEIR specific department.',
    sql: `-- Outer query loops through each employee row (e1)
-- Inner query computes average for e1's department (e2)

SELECT e1.name, e1.dept_name, e1.salary 
FROM Emp e1 
WHERE e1.salary > (
    SELECT AVG(e2.salary) 
    FROM Emp e2 
    WHERE e2.dept_id = e1.dept_id
);`,
    step1: 'For Engineering (Avg $82,666): Carol White ($92,000) & Alice Smith ($85,000) qualify.',
    step2: 'For Marketing (Avg $58,500): Eva Davis ($62,000) qualifies.',
    resultRows: [
      { name: 'Carol White', dept_name: 'Engineering', salary: '$92,000 (Dept Avg: $82,666)' },
      { name: 'Alice Smith', dept_name: 'Engineering', salary: '$85,000 (Dept Avg: $82,666)' },
      { name: 'Eva Davis', dept_name: 'Marketing', salary: '$62,000 (Dept Avg: $58,500)' }
    ]
  },
  from_clause: {
    id: 'from_clause',
    title: '4. Subquery in FROM Clause (Derived Table / Inline View)',
    badgeColor: '#f59e0b',
    summary: 'A subquery in the FROM clause acts as a temporary virtual table. Must ALWAYS be given an alias name (e.g. AS DeptSummary).',
    goal: 'Calculate total department payrolls and list departments spending over $100,000.',
    sql: `-- Subquery aggregates department payrolls into a temporary table 'DeptSummary'
-- Outer query filters total_payroll > $100,000

SELECT dept_name, total_payroll, total_staff 
FROM (
    SELECT 
        dept_name, 
        SUM(salary) AS total_payroll, 
        COUNT(*) AS total_staff 
    FROM Emp 
    GROUP BY dept_name
) AS DeptSummary 
WHERE total_payroll > 100000;`,
    step1: 'Inner Subquery generates virtual table: Engineering ($248,000), Marketing ($117,000), Sales ($48,000)',
    step2: 'Outer Query filters: WHERE total_payroll > 100000',
    resultRows: [
      { dept_name: 'Engineering', total_payroll: '$248,000', total_staff: 3 },
      { dept_name: 'Marketing', total_payroll: '$117,000', total_staff: 2 }
    ]
  },
  select_clause: {
    id: 'select_clause',
    title: '5. Subquery in SELECT Clause (Scalar Value Projection)',
    badgeColor: '#ec4899',
    summary: 'Places a scalar subquery in the SELECT list to append calculated summary columns alongside detail rows.',
    goal: 'Display each employee along with company average salary and variance from average.',
    sql: `-- Subquery appends overall company average to each employee record

SELECT 
    name, 
    salary, 
    (SELECT ROUND(AVG(salary), 2) FROM Emp) AS company_avg,
    salary - (SELECT AVG(salary) FROM Emp) AS diff_from_avg
FROM Emp;`,
    step1: 'Subquery evaluates once: AVG(salary) = $68,833.33',
    step2: 'Outer Query projects salary comparison alongside each employee.',
    resultRows: [
      { name: 'Alice Smith', salary: '$85,000', company_avg: '$68,833.33', diff_from_avg: '+$16,166.67' },
      { name: 'Bob Jones', salary: '$55,000', company_avg: '$68,833.33', diff_from_avg: '-$13,833.33' },
      { name: 'Carol White', salary: '$92,000', company_avg: '$68,833.33', diff_from_avg: '+$23,166.67' },
      { name: 'David Brown', salary: '$48,000', company_avg: '$68,833.33', diff_from_avg: '-$20,833.33' }
    ]
  }
};

export default function SQLDay8({ activeTab, onNavigate }) {
  const [selectedExampleKey, setSelectedExampleKey] = useState('single_row');
  const [isQueryExecuting, setIsQueryExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const activeExample = subqueryInteractiveExamples[selectedExampleKey];

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module8', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunQuery = () => {
    setIsQueryExecuting(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsQueryExecuting(false);
      setHasExecuted(true);
    }, 400);
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'subqueries' && (
        <Section key="subqueries" id="subqueries" eyebrow="Advanced Queries" title="Subqueries & Nested SQL">
          <div className="panel">
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              A <strong>Subquery</strong> (or Nested Query) is an SQL query nested inside a <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code> statement, or inside another subquery. They enable multi-step data transformations in a single query execution without temporary tables.
            </p>

            {/* 💡 SUBQUERY TYPES GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #3b82f6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code size={18} color="#3b82f6" /> Single-Row Subquery
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                  Returns only <strong>one row</strong> with 1 value. Paired with comparison operators: <code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.
                </p>
                <div style={{ background: '#1e293b', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#93c5fd', fontFamily: 'monospace' }}>
                  SELECT * FROM Emp<br/>
                  WHERE salary &gt; (SELECT AVG(salary) FROM Emp);
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #10b981', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} color="#10b981" /> Multiple-Row Subquery
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                  Returns <strong>multiple rows</strong>. Must be paired with set membership operators: <code>IN</code>, <code>NOT IN</code>, <code>ANY</code>, or <code>ALL</code>.
                </p>
                <div style={{ background: '#1e293b', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#6ee7b7', fontFamily: 'monospace' }}>
                  SELECT * FROM Emp<br/>
                  WHERE dept_id IN (SELECT id FROM Dept WHERE loc='NY');
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #8b5cf6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="#8b5cf6" /> Correlated Subquery
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                  References columns from outer query (<code>e1.dept = e2.dept</code>). Re-executes dynamically for <em>every outer row</em>.
                </p>
                <div style={{ background: '#1e293b', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#c4b5fd', fontFamily: 'monospace' }}>
                  SELECT * FROM Emp e1 WHERE salary &gt;<br/>
                  (SELECT AVG(salary) FROM Emp e2 WHERE e1.dept = e2.dept);
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #f59e0b', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Table size={18} color="#f59e0b" /> Subquery in FROM Clause
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                  Acts as a temporary <strong>Derived Table</strong> or inline view. Requires an explicit alias name (e.g. <code>AS TempTable</code>).
                </p>
                <div style={{ background: '#1e293b', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#fcd34d', fontFamily: 'monospace' }}>
                  SELECT dept, total FROM<br/>
                  (SELECT dept, SUM(salary) AS total FROM Emp GROUP BY dept) AS T;
                </div>
              </div>

            </div>

            {/* 🚀 INTERACTIVE LIVE SUBQUERY EXPLORER */}
            <div style={{ marginTop: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Interactive Subquery Studio</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>Explore Real SQL Subquery Execution</h3>
                </div>
                
                {/* Mode Selector Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {Object.keys(subqueryInteractiveExamples).map(key => {
                    const ex = subqueryInteractiveExamples[key];
                    const isSelected = selectedExampleKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => { setSelectedExampleKey(key); setHasExecuted(false); }}
                        style={{
                          padding: '0.5rem 0.85rem',
                          borderRadius: '8px',
                          border: isSelected ? `2px solid ${ex.badgeColor}` : '1px solid #cbd5e1',
                          background: isSelected ? `${ex.badgeColor}15` : '#ffffff',
                          color: isSelected ? ex.badgeColor : '#475569',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {ex.title.split('.')[1]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Example Detail Card */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: `4px solid ${activeExample.badgeColor}`, marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{activeExample.title}</h4>
                <p style={{ margin: '6px 0 0 0', color: '#475569', fontSize: '0.9rem' }}>{activeExample.summary}</p>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155' }}>
                  <span style={{ fontWeight: 800, color: activeExample.badgeColor }}>Business Goal:</span> {activeExample.goal}
                </div>
              </div>

              {/* Grid Layout: SQL Code & Step-by-Step Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                
                {/* Code Block */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>SQL Code</span>
                    <button
                      onClick={handleRunQuery}
                      disabled={isQueryExecuting}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '6px',
                        background: activeExample.badgeColor,
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}
                    >
                      <Play size={14} fill="#fff" /> {isQueryExecuting ? 'Executing...' : 'Run Query'}
                    </button>
                  </div>
                  <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '10px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, height: '220px' }}>
                    <code style={{ color: '#38bdf8' }}>{activeExample.sql}</code>
                  </pre>
                </div>

                {/* Execution Step Flow */}
                <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', display: 'block' }}>
                    Query Execution Flow
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ padding: '0.75rem 1rem', background: '#eff6ff', borderRadius: '8px', borderLeft: '3px solid #3b82f6', fontSize: '0.85rem', color: '#1e40af' }}>
                      <strong style={{ display: 'block', color: '#1d4ed8', marginBottom: '2px' }}>Step 1 (Inner Query):</strong>
                      {activeExample.step1}
                    </div>

                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>↓</div>

                    <div style={{ padding: '0.75rem 1rem', background: '#f0fdf4', borderRadius: '8px', borderLeft: '3px solid #10b981', fontSize: '0.85rem', color: '#166534' }}>
                      <strong style={{ display: 'block', color: '#15803d', marginBottom: '2px' }}>Step 2 (Outer Query):</strong>
                      {activeExample.step2}
                    </div>
                  </div>
                </div>

              </div>

              {/* Input Datasets vs Query Result Output */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                
                {/* Sample Input Table */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', background: '#ffffff' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
                    <Database size={16} /> Sample Input Table: Emp
                  </span>
                  <div style={{ overflowX: 'auto', maxHeight: '180px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                      <thead>
                        <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                          <th style={{ padding: '6px 8px', textAlign: 'left' }}>id</th>
                          <th style={{ padding: '6px 8px', textAlign: 'left' }}>name</th>
                          <th style={{ padding: '6px 8px', textAlign: 'left' }}>dept</th>
                          <th style={{ padding: '6px 8px', textAlign: 'right' }}>salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleEmpData.map(row => (
                          <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{row.id}</td>
                            <td style={{ padding: '6px 8px', fontWeight: 600 }}>{row.name}</td>
                            <td style={{ padding: '6px 8px', color: '#64748b' }}>{row.dept_name}</td>
                            <td style={{ padding: '6px 8px', textAlign: 'right', fontFamily: 'monospace' }}>${row.salary.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Live Output Result Table */}
                <div style={{ border: `1px solid ${hasExecuted ? activeExample.badgeColor : '#e2e8f0'}`, borderRadius: '10px', padding: '1rem', background: '#ffffff', transition: 'border 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Table size={16} color={activeExample.badgeColor} /> Output Result Set ({activeExample.resultRows.length} rows)
                    </span>
                    {hasExecuted && (
                      <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
                        ✓ Query Executed
                      </span>
                    )}
                  </div>

                  <div style={{ overflowX: 'auto', maxHeight: '180px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                          {Object.keys(activeExample.resultRows[0]).map(col => (
                            <th key={col} style={{ padding: '6px 8px', textAlign: 'left', textTransform: 'lowercase', color: '#475569' }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeExample.resultRows.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: hasExecuted ? '#f0fdf4' : 'transparent' }}>
                            {Object.values(row).map((val, vIdx) => (
                              <td key={vIdx} style={{ padding: '6px 8px', fontWeight: vIdx === 0 ? 700 : 400, color: '#1e293b' }}>
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('views')}>Continue to Virtual Views (+10 XP) &rarr;</button>
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
