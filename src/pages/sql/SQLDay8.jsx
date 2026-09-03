import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Code, Play, CheckCircle, ArrowRight, Table, Filter, Layers, Zap, 
  Eye, ShieldCheck, TrendingUp, Clock, Activity, Cpu, FileText, Sliders, Search, Lock,
  Plus, RefreshCw, Trash2 
} from 'lucide-react';

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

// Sample Datasets for Subqueries
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
    title: '3. Correlated Subquery (Row-by-Row)',
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
    title: '4. Subquery in FROM Clause (Derived Table)',
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
    title: '5. Subquery in SELECT Clause (Scalar Projection)',
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
  },
  exists_clause: {
    id: 'exists_clause',
    title: '6. EXISTS / NOT EXISTS Subquery (Semi-Join)',
    badgeColor: '#06b6d4',
    summary: 'Tests for the existence of rows in a subquery. Returns TRUE as soon as the first match is found, making it extremely fast.',
    goal: 'Find all customers who have placed at least one high-value order (> $500).',
    sql: `-- Checks if a matching order exists in Orders table for each customer

SELECT customer_id, name, city 
FROM Customers c 
WHERE EXISTS (
    SELECT 1 
    FROM Orders o 
    WHERE o.customer_id = c.customer_id 
      AND o.total_amount > 500
);`,
    step1: 'For Customer #101 (Alice): Matching order of $1,250 found ➜ TRUE (Retained)',
    step2: 'For Customer #102 (Bob): No order > $500 ➜ FALSE (Filtered out)',
    resultRows: [
      { customer_id: 101, name: 'Alice Morgan', city: 'San Francisco', status: 'ACTIVE BUYER' },
      { customer_id: 104, name: 'Diana Prince', city: 'Seattle', status: 'ACTIVE BUYER' },
      { customer_id: 105, name: 'Evan Wright', city: 'Boston', status: 'ACTIVE BUYER' }
    ]
  }
};

// Views Interactive Examples Data
const viewInteractiveExamples = {
  masked_payroll: {
    id: 'masked_payroll',
    title: '1. Security Masked View',
    viewName: 'vw_hr_public_payroll',
    badgeColor: '#3b82f6',
    icon: <Lock size={18} color="#3b82f6" />,
    summary: 'Hides confidential attributes (SSN, Tax ID, Performance Rating) so non-HR staff can view safe public employee info.',
    baseTable: 'Employees_Master (Contains SSN, Salary, Tax_ID, Rating)',
    sql: `CREATE VIEW vw_hr_public_payroll AS 
SELECT 
    emp_id, 
    first_name, 
    last_name, 
    department, 
    job_title,
    email
FROM Employees_Master
WHERE status = 'Active';`,
    querySql: `SELECT * FROM vw_hr_public_payroll WHERE department = 'Engineering';`,
    benefit: 'Data Security & Privacy: Eliminates unauthorized exposure of sensitive PII data without altering physical tables.',
    resultRows: [
      { emp_id: 'E101', first_name: 'Alice', last_name: 'Smith', department: 'Engineering', job_title: 'Lead Architect', email: 'alice@co.com' },
      { emp_id: 'E103', first_name: 'Carol', last_name: 'White', department: 'Engineering', job_title: 'Backend Dev', email: 'carol@co.com' },
      { emp_id: 'E106', first_name: 'Frank', last_name: 'Miller', department: 'Engineering', job_title: 'DevOps Engineer', email: 'frank@co.com' }
    ]
  },
  multi_table: {
    id: 'multi_table',
    title: '2. Multi-Table Join View',
    viewName: 'vw_customer_order_summary',
    badgeColor: '#10b981',
    icon: <Layers size={18} color="#10b981" />,
    summary: 'Pre-joins Customers, Orders, and OrderItems tables into one simple virtual entity for simplified dashboard reporting.',
    baseTable: 'Joined: Customers + Orders + OrderItems',
    sql: `CREATE VIEW vw_customer_order_summary AS 
SELECT 
    c.customer_id,
    c.customer_name,
    c.country,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_lifetime_spend,
    MAX(o.order_date) AS last_order_date
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.country;`,
    querySql: `SELECT customer_name, total_orders, total_lifetime_spend 
FROM vw_customer_order_summary 
WHERE total_lifetime_spend > 2000;`,
    benefit: 'Query Simplification: Developers query 1 clean view instead of writing complex 4-table JOINs repeatedly.',
    resultRows: [
      { customer_name: 'Acme Corp', total_orders: 14, total_lifetime_spend: '$42,500.00' },
      { customer_name: 'Stark Industries', total_orders: 28, total_lifetime_spend: '$189,200.00' },
      { customer_name: 'Cyberdyne Systems', total_orders: 8, total_lifetime_spend: '$15,800.00' }
    ]
  },
  filtered_vip: {
    id: 'filtered_vip',
    title: '3. Filtered Business View',
    viewName: 'vw_vip_active_subscribers',
    badgeColor: '#8b5cf6',
    icon: <ShieldCheck size={18} color="#8b5cf6" />,
    summary: 'Restricts query visibility strictly to active high-tier accounts spending over $5,000 per year.',
    baseTable: 'Subscriptions (Filter: status = Active AND spend > 5000)',
    sql: `CREATE VIEW vw_vip_active_subscribers AS 
SELECT 
    sub_id, 
    account_name, 
    tier_level, 
    annual_spend, 
    renewal_date
FROM Subscriptions
WHERE account_status = 'Active' 
  AND annual_spend >= 5000;`,
    querySql: `SELECT account_name, tier_level, annual_spend FROM vw_vip_active_subscribers ORDER BY annual_spend DESC;`,
    benefit: 'Consistent Business Logic: Standardizes what "VIP Customer" means across all enterprise analytical reports.',
    resultRows: [
      { account_name: 'Wayne Enterprises', tier_level: 'Enterprise Plus', annual_spend: '$120,000.00' },
      { account_name: 'Oscorp Tech', tier_level: 'Enterprise', annual_spend: '$45,000.00' },
      { account_name: 'LexCorp', tier_level: 'Enterprise', annual_spend: '$38,500.00' }
    ]
  },
  aggregated_dept: {
    id: 'aggregated_dept',
    title: '4. Aggregated Summary View',
    viewName: 'vw_dept_payroll_analytics',
    badgeColor: '#f59e0b',
    icon: <TrendingUp size={18} color="#f59e0b" />,
    summary: 'Calculates department headcount, average salary, minimum, maximum, and total budget spending.',
    baseTable: 'Employees (GROUP BY department)',
    sql: `CREATE VIEW vw_dept_payroll_analytics AS 
SELECT 
    dept_name, 
    COUNT(*) AS total_staff,
    ROUND(AVG(salary), 2) AS avg_dept_salary,
    MIN(salary) AS min_dept_salary,
    MAX(salary) AS max_dept_salary,
    SUM(salary) AS total_payroll_budget
FROM Employees
GROUP BY dept_name;`,
    querySql: `SELECT * FROM vw_dept_payroll_analytics WHERE total_payroll_budget > 100000;`,
    benefit: 'Performance & Modularity: Pre-structures aggregate logic so dashboards load metrics in milliseconds.',
    resultRows: [
      { dept_name: 'Engineering', total_staff: 24, avg_dept_salary: '$94,500.00', max_dept_salary: '$145,000.00', total_payroll_budget: '$2,268,000.00' },
      { dept_name: 'Marketing', total_staff: 12, avg_dept_salary: '$68,200.00', max_dept_salary: '$98,000.00', total_payroll_budget: '$818,400.00' },
      { dept_name: 'Product Design', total_staff: 8, avg_dept_salary: '$82,000.00', max_dept_salary: '$110,000.00', total_payroll_budget: '$656,000.00' }
    ]
  }
};

// Index Interactive Simulator Scenarios
const indexSimulatorScenarios = {
  b_tree_email: {
    id: 'b_tree_email',
    title: '1. Single-Column B-Tree Index',
    indexName: 'idx_users_email',
    badgeColor: '#3b82f6',
    query: `SELECT user_id, full_name, email, created_at 
FROM Users 
WHERE email = 'sarah.connor@cyberdyne.com';`,
    indexSql: `CREATE UNIQUE INDEX idx_users_email ON Users (email);`,
    tableName: 'Users Table (1,000,000 Rows)',
    withoutIndex: {
      scanType: 'FULL TABLE SCAN (Sequential Disk I/O)',
      scannedRows: 1000000,
      executionTimeMs: 485,
      costUnits: 14250,
      memoryUsed: '128 MB',
      verdict: '🐌 SLOW: Scans every single row from row 1 to row 1,000,000'
    },
    withIndex: {
      scanType: 'INDEX SEEK (B-Tree Logarithmic Traversal)',
      scannedRows: 1,
      executionTimeMs: 2,
      costUnits: 3,
      memoryUsed: '16 KB',
      verdict: '⚡ INSTANT: Traverses 3-level B-Tree index directly to exact memory pointer'
    },
    explanation: 'A B-Tree index on a unique column turns an O(N) linear table scan into an O(log N) tree traversal.'
  },
  composite_status_date: {
    id: 'composite_status_date',
    title: '2. Composite Multi-Column Index',
    indexName: 'idx_orders_status_date',
    badgeColor: '#10b981',
    query: `SELECT order_id, customer_id, total_amount, order_date 
FROM Orders 
WHERE order_status = 'COMPLETED' 
  AND order_date >= '2026-01-01';`,
    indexSql: `CREATE INDEX idx_orders_status_date ON Orders (order_status, order_date);`,
    tableName: 'Orders Table (2,500,000 Rows)',
    withoutIndex: {
      scanType: 'FULL TABLE SCAN (Unindexed Multi-Condition Filter)',
      scannedRows: 2500000,
      executionTimeMs: 820,
      costUnits: 28400,
      memoryUsed: '256 MB',
      verdict: '🐌 VERY SLOW: Inspects 2.5 Million records one-by-one'
    },
    withIndex: {
      scanType: 'COMPOSITE INDEX RANGE SCAN',
      scannedRows: 142,
      executionTimeMs: 4,
      costUnits: 8,
      memoryUsed: '32 KB',
      verdict: '⚡ ULTRA FAST: Jumps directly to COMPLETED bucket, then scans matching date range'
    },
    explanation: 'Column order matters in Composite Indexes! Always put high-cardinality or equality columns first, followed by range comparison columns.'
  },
  unique_constraint: {
    id: 'unique_constraint',
    title: '3. Unique Index Lookup & Constraint',
    indexName: 'idx_accounts_tax_id',
    badgeColor: '#8b5cf6',
    query: `INSERT INTO Accounts (account_id, company_name, tax_id) 
VALUES (9902, 'Apex Innovations', 'TX-998811');`,
    indexSql: `CREATE UNIQUE INDEX idx_accounts_tax_id ON Accounts (tax_id);`,
    tableName: 'Accounts Table (500,000 Rows)',
    withoutIndex: {
      scanType: 'TABLE SCAN (Duplicate Check)',
      scannedRows: 500000,
      executionTimeMs: 310,
      costUnits: 9800,
      memoryUsed: '64 MB',
      verdict: '⚠️ UNSAFE & SLOW: Must read entire table to verify tax_id is not already taken'
    },
    withIndex: {
      scanType: 'UNIQUE INDEX B-TREE CHECK',
      scannedRows: 1,
      executionTimeMs: 1,
      costUnits: 2,
      memoryUsed: '8 KB',
      verdict: '🛡️ SECURE & INSTANT: Instantly confirms uniqueness and enforces data integrity'
    },
    explanation: 'Unique indexes automatically prevent duplicate data insertions while providing lightning-fast lookups.'
  },
  write_overhead: {
    id: 'write_overhead',
    title: '4. Index Write Penalty & Overhead Demo',
    indexName: '8 Active Indexes on Single Table',
    badgeColor: '#ef4444',
    query: `UPDATE Products SET unit_price = 49.99, stock_quantity = 150 WHERE product_id = 8812;`,
    indexSql: `-- Table has 8 indexes: idx_name, idx_sku, idx_category, idx_price, idx_stock...`,
    tableName: 'Products Table (High Write Volatility)',
    withoutIndex: {
      scanType: 'DIRECT WRITE (0 Index Maintenance)',
      scannedRows: 1,
      executionTimeMs: 3,
      costUnits: 5,
      memoryUsed: '4 KB',
      verdict: '⚡ FAST WRITE: Updates table row directly with zero index maintenance'
    },
    withIndex: {
      scanType: 'WRITE + 8 B-TREE INDEX UPDATES',
      scannedRows: 1,
      executionTimeMs: 52,
      costUnits: 160,
      memoryUsed: '48 KB',
      verdict: '🐢 SLOWER WRITE: Must re-balance and update all 8 B-Tree indexes for every write'
    },
    explanation: 'Goldilocks Rule: Do not over-index! Every index speeds up SELECT queries but incurs extra write latency on INSERT, UPDATE, and DELETE.'
  }
};

export default function SQLDay8({ activeTab, onNavigate }) {
  // Subqueries state
  const [selectedSubqueryKey, setSelectedSubqueryKey] = useState('single_row');
  const [isSubqueryExecuting, setIsSubqueryExecuting] = useState(false);
  const [hasSubqueryExecuted, setHasSubqueryExecuted] = useState(false);

  // Views state
  const [selectedViewKey, setSelectedViewKey] = useState('masked_payroll');
  const [isViewExecuting, setIsViewExecuting] = useState(false);
  const [hasViewExecuted, setHasViewExecuted] = useState(false);

  // Indexes state
  const [selectedIndexKey, setSelectedIndexKey] = useState('b_tree_email');
  const [isIndexEnabled, setIsIndexEnabled] = useState(true);
  const [isSimulatingQuery, setIsSimulatingQuery] = useState(false);

  const activeSubquery = subqueryInteractiveExamples[selectedSubqueryKey];
  const activeView = viewInteractiveExamples[selectedViewKey];
  const activeIndexScenario = indexSimulatorScenarios[selectedIndexKey];

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module8', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunSubquery = () => {
    setIsSubqueryExecuting(true);
    setHasSubqueryExecuted(false);
    setTimeout(() => {
      setIsSubqueryExecuting(false);
      setHasSubqueryExecuted(true);
    }, 400);
  };

  const handleRunView = () => {
    setIsViewExecuting(true);
    setHasViewExecuted(false);
    setTimeout(() => {
      setIsViewExecuting(false);
      setHasViewExecuted(true);
    }, 400);
  };

  const handleSimulateIndexQuery = () => {
    setIsSimulatingQuery(true);
    setTimeout(() => {
      setIsSimulatingQuery(false);
    }, 350);
  };

  return (
    <AnimatePresence mode="wait">

      {/* 1. SUBQUERIES TAB */}
      {activeTab === 'subqueries' && (
        <Section key="subqueries" id="subqueries" eyebrow="Advanced Queries" title="Subqueries & Nested SQL">
          <div className="panel">
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              A <strong>Subquery</strong> (or Nested Query) is an SQL query nested inside a <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code> statement, or inside another subquery. They enable multi-step data transformations in a single query execution without temporary tables.
            </p>

            {/* SUBQUERY TYPES CARDS GRID */}
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

            {/* INTERACTIVE LIVE SUBQUERY EXPLORER */}
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
                    const isSelected = selectedSubqueryKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => { setSelectedSubqueryKey(key); setHasSubqueryExecuted(false); }}
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
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: `4px solid ${activeSubquery.badgeColor}`, marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{activeSubquery.title}</h4>
                <p style={{ margin: '6px 0 0 0', color: '#475569', fontSize: '0.9rem' }}>{activeSubquery.summary}</p>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155' }}>
                  <span style={{ fontWeight: 800, color: activeSubquery.badgeColor }}>Business Goal:</span> {activeSubquery.goal}
                </div>
              </div>

              {/* Grid Layout: SQL Code & Step-by-Step Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                
                {/* Code Block */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>SQL Code</span>
                    <button
                      onClick={handleRunSubquery}
                      disabled={isSubqueryExecuting}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '6px',
                        background: activeSubquery.badgeColor,
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}
                    >
                      <Play size={14} fill="#fff" /> {isSubqueryExecuting ? 'Executing...' : 'Run Query'}
                    </button>
                  </div>
                  <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '10px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, height: '220px' }}>
                    <code style={{ color: '#38bdf8' }}>{activeSubquery.sql}</code>
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
                      {activeSubquery.step1}
                    </div>

                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>↓</div>

                    <div style={{ padding: '0.75rem 1rem', background: '#f0fdf4', borderRadius: '8px', borderLeft: '3px solid #10b981', fontSize: '0.85rem', color: '#166534' }}>
                      <strong style={{ display: 'block', color: '#15803d', marginBottom: '2px' }}>Step 2 (Outer Query):</strong>
                      {activeSubquery.step2}
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
                <div style={{ border: `1px solid ${hasSubqueryExecuted ? activeSubquery.badgeColor : '#e2e8f0'}`, borderRadius: '10px', padding: '1rem', background: '#ffffff', transition: 'border 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Table size={16} color={activeSubquery.badgeColor} /> Output Result Set ({activeSubquery.resultRows.length} rows)
                    </span>
                    {hasSubqueryExecuted && (
                      <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
                        ✓ Query Executed
                      </span>
                    )}
                  </div>

                  <div style={{ overflowX: 'auto', maxHeight: '180px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                          {Object.keys(activeSubquery.resultRows[0]).map(col => (
                            <th key={col} style={{ padding: '6px 8px', textAlign: 'left', textTransform: 'lowercase', color: '#475569' }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeSubquery.resultRows.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: hasSubqueryExecuted ? '#f0fdf4' : 'transparent' }}>
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

      {/* 2. VIEWS TAB */}
      {activeTab === 'views' && (
        <Section key="views" id="views" eyebrow="Virtual Tables" title="SQL Views & Virtual Abstraction">
          <div className="panel">
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              A <strong>View</strong> is a virtual table defined by an underlying SQL <code>SELECT</code> statement. It does not store data physically on disk (except for Materialized Views); instead, it acts as a dynamic window into base tables.
            </p>

            {/* KEY BENEFITS HIGHLIGHT */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem 1.25rem', background: '#eff6ff', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
                <strong style={{ color: '#1e40af', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={16} /> Security & Column Masking
                </strong>
                <p style={{ color: '#1e3a8a', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Restricts direct access to sensitive columns (like SSN, passwords, or salary tier).</p>
              </div>

              <div style={{ padding: '1rem 1.25rem', background: '#f0fdf4', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                <strong style={{ color: '#166534', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={16} /> Complex JOIN Simplification
                </strong>
                <p style={{ color: '#14532d', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Encapsulates 5-table JOINs so analysts query 1 clean virtual table.</p>
              </div>

              <div style={{ padding: '1rem 1.25rem', background: '#faf5ff', borderRadius: '10px', borderLeft: '4px solid #8b5cf6' }}>
                <strong style={{ color: '#6b21a8', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} /> Business Logic Standardization
                </strong>
                <p style={{ color: '#581c87', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Ensures every reporting query uses identical rules for KPIs like "Active Customers".</p>
              </div>
            </div>

            {/* 📖 COMPLETE SQL VIEWS SYNTAX GUIDE */}
            <div style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={22} color="#3b82f6" /> SQL Views Syntax Guide
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                
                {/* 1. CREATE VIEW SYNTAX */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h4 style={{ color: '#1d4ed8', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={16} /> 1. CREATE VIEW Syntax
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.75rem 0', lineHeight: '1.5' }}>
                    Creates a new virtual table view based on the result of an SQL <code>SELECT</code> statement.
                  </p>
                  <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.83rem', color: '#f8fafc', margin: 0, lineHeight: '1.6' }}>
                    <code>
<span style={{ color: '#c792ea' }}>CREATE VIEW</span> view_name <span style={{ color: '#89ddff' }}>AS</span><br/>
<span style={{ color: '#c792ea' }}>SELECT</span> column1, column2, ...<br/>
<span style={{ color: '#c792ea' }}>FROM</span> table_name<br/>
<span style={{ color: '#c792ea' }}>WHERE</span> condition;
                    </code>
                  </pre>
                  <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: '#eff6ff', borderRadius: '6px', fontSize: '0.8rem', color: '#1e40af' }}>
                    <strong>Example:</strong><br/>
                    <code>CREATE VIEW ActiveCustomers AS SELECT id, name, email FROM Customers WHERE status = 'Active';</code>
                  </div>
                </div>

                {/* 2. ALTER / REPLACE VIEW SYNTAX */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h4 style={{ color: '#047857', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <RefreshCw size={16} /> 2. ALTER / REPLACE VIEW Syntax
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.75rem 0', lineHeight: '1.5' }}>
                    Modifies or updates the structure of an existing view without dropping database permissions.
                  </p>
                  <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.83rem', color: '#f8fafc', margin: 0, lineHeight: '1.6' }}>
                    <code>
<span style={{ color: '#c792ea' }}>CREATE OR REPLACE VIEW</span> view_name <span style={{ color: '#89ddff' }}>AS</span><br/>
<span style={{ color: '#c792ea' }}>SELECT</span> column1, column2, column3<br/>
<span style={{ color: '#c792ea' }}>FROM</span> table_name<br/>
<span style={{ color: '#c792ea' }}>WHERE</span> new_condition;
                    </code>
                  </pre>
                  <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: '#ecfdf5', borderRadius: '6px', fontSize: '0.8rem', color: '#065f46' }}>
                    <strong>Example:</strong><br/>
                    <code>CREATE OR REPLACE VIEW ActiveCustomers AS SELECT id, name, email, phone FROM Customers WHERE status = 'Active';</code>
                  </div>
                </div>

                {/* 3. DROP VIEW SYNTAX */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h4 style={{ color: '#b91c1c', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trash2 size={16} /> 3. DROP VIEW Syntax
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.75rem 0', lineHeight: '1.5' }}>
                    Permanently deletes a virtual view definition (underlying table data remains untouched).
                  </p>
                  <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.83rem', color: '#f8fafc', margin: 0, lineHeight: '1.6' }}>
                    <code>
<span style={{ color: '#f43f5e' }}>DROP VIEW</span> <span style={{ color: '#89ddff' }}>IF EXISTS</span> view_name;
                    </code>
                  </pre>
                  <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: '#fef2f2', borderRadius: '6px', fontSize: '0.8rem', color: '#991b1b' }}>
                    <strong>Example:</strong><br/>
                    <code>DROP VIEW IF EXISTS ActiveCustomers;</code>
                  </div>
                </div>

                {/* 4. QUERYING A VIEW SYNTAX */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h4 style={{ color: '#6d28d9', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Search size={16} /> 4. Querying a View Syntax
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.75rem 0', lineHeight: '1.5' }}>
                    Select data from a virtual view just like querying any normal physical table.
                  </p>
                  <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.83rem', color: '#f8fafc', margin: 0, lineHeight: '1.6' }}>
                    <code>
<span style={{ color: '#c792ea' }}>SELECT</span> * <span style={{ color: '#c792ea' }}>FROM</span> view_name<br/>
<span style={{ color: '#c792ea' }}>WHERE</span> additional_filter = 'value';
                    </code>
                  </pre>
                  <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: '#f5f3ff', borderRadius: '6px', fontSize: '0.8rem', color: '#5b21b6' }}>
                    <strong>Example:</strong><br/>
                    <code>SELECT * FROM ActiveCustomers WHERE email LIKE '%@gmail.com';</code>
                  </div>
                </div>

              </div>
            </div>

            {/* INTERACTIVE VIEW EXPLORER STUDIO */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Interactive View Studio</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>Explore Real SQL View Abstraction</h3>
                </div>

                {/* View Selection Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {Object.keys(viewInteractiveExamples).map(key => {
                    const ex = viewInteractiveExamples[key];
                    const isSelected = selectedViewKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => { setSelectedViewKey(key); setHasViewExecuted(false); }}
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

              {/* Selected View Info Box */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: `4px solid ${activeView.badgeColor}`, marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {activeView.icon} {activeView.title} (<code>{activeView.viewName}</code>)
                  </h4>
                  <span style={{ fontSize: '0.75rem', background: '#e2e8f0', color: '#334155', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                    Source: {activeView.baseTable}
                  </span>
                </div>
                <p style={{ margin: '8px 0 0 0', color: '#475569', fontSize: '0.9rem' }}>{activeView.summary}</p>
                <div style={{ marginTop: '10px', background: '#ffffff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#15803d', fontWeight: 600 }}>
                  💡 <strong>Engineering Benefit:</strong> {activeView.benefit}
                </div>
              </div>

              {/* View Creation SQL & View Query Test */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                
                {/* DDL SQL View Definition */}
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>
                    1. View Definition (DDL)
                  </span>
                  <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '10px', overflowX: 'auto', fontSize: '0.83rem', lineHeight: '1.5', margin: 0, height: '210px' }}>
                    <code style={{ color: '#38bdf8' }}>{activeView.sql}</code>
                  </pre>
                </div>

                {/* DQL Querying the View */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>
                      2. Querying the Virtual View (DQL)
                    </span>
                    <button
                      onClick={handleRunView}
                      disabled={isViewExecuting}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '6px',
                        background: activeView.badgeColor,
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Play size={14} fill="#fff" /> {isViewExecuting ? 'Querying...' : 'Query View'}
                    </button>
                  </div>
                  <pre style={{ background: '#1e1e2e', color: '#f8fafc', padding: '1.25rem', borderRadius: '10px', overflowX: 'auto', fontSize: '0.83rem', lineHeight: '1.5', margin: 0, height: '210px' }}>
                    <code style={{ color: '#a6e3a1' }}>{activeView.querySql}</code>
                  </pre>
                </div>

              </div>

              {/* View Output Result Table */}
              <div style={{ border: `1px solid ${hasViewExecuted ? activeView.badgeColor : '#e2e8f0'}`, borderRadius: '12px', padding: '1.25rem', background: '#ffffff', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Table size={18} color={activeView.badgeColor} /> Virtual View Result Set ({activeView.resultRows.length} rows projected)
                  </span>
                  {hasViewExecuted && (
                    <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '12px', fontWeight: 800 }}>
                      ✓ Virtual View Evaluated
                    </span>
                  )}
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                        {Object.keys(activeView.resultRows[0]).map(col => (
                          <th key={col} style={{ padding: '8px 12px', textAlign: 'left', color: '#475569', textTransform: 'lowercase' }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeView.resultRows.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: hasViewExecuted ? '#f0fdf4' : 'transparent' }}>
                          {Object.values(row).map((val, vIdx) => (
                            <td key={vIdx} style={{ padding: '8px 12px', color: '#1e293b', fontWeight: vIdx === 0 ? 700 : 400 }}>
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

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('indexes')}>Continue to Indexes & Benchmarks (+10 XP) &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* 3. INDEXES TAB */}
      {activeTab === 'indexes' && (
        <Section key="indexes" id="indexes" eyebrow="Performance Optimization" title="Database Indexes & B-Tree Execution">
          <div className="panel">
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              An <strong>Index</strong> is a specialized data structure (typically a B-Tree or Hash index) created on database table columns to accelerate search queries from linear scanning \(O(N)\) down to logarithmic tree lookup \(O(\log N)\).
            </p>

            {/* TRADE-OFF WARNING CARD */}
            <div style={{ background: '#fff1f2', borderLeft: '4px solid #f43f5e', borderRadius: '12px', padding: '1.25rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#9f1239', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="#f43f5e" /> The Indexing Trade-Off (Goldilocks Rule)
              </h4>
              <p style={{ color: '#881337', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                While Indexes vastly speed up <code>SELECT</code> search queries, they <strong>add overhead to <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> operations</strong> because every index B-Tree must be re-balanced upon data mutation. Only index columns frequently used in <code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>, or <code>GROUP BY</code> clauses.
              </p>
            </div>

            {/* INTERACTIVE INDEX PERFORMANCE SIMULATOR & BENCHMARK STUDIO */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Index Benchmark Simulator</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>B-Tree Index vs Full Table Scan Explorer</h3>
                </div>

                {/* Scenario Selector */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {Object.keys(indexSimulatorScenarios).map(key => {
                    const sc = indexSimulatorScenarios[key];
                    const isSelected = selectedIndexKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedIndexKey(key)}
                        style={{
                          padding: '0.5rem 0.85rem',
                          borderRadius: '8px',
                          border: isSelected ? `2px solid ${sc.badgeColor}` : '1px solid #cbd5e1',
                          background: isSelected ? `${sc.badgeColor}15` : '#ffffff',
                          color: isSelected ? sc.badgeColor : '#475569',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {sc.title.split('.')[1]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scenario Details & Index Toggle */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: `4px solid ${activeIndexScenario.badgeColor}`, marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{activeIndexScenario.title}</h4>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>Table Context: <strong>{activeIndexScenario.tableName}</strong></p>
                  </div>

                  {/* Index ON/OFF Toggle Switch */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '8px 16px', borderRadius: '30px', border: '1px solid #cbd5e1' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isIndexEnabled ? '#10b981' : '#64748b' }}>
                      {isIndexEnabled ? '⚡ INDEX ENABLED' : '🐌 INDEX DISABLED'}
                    </span>
                    <button
                      onClick={() => setIsIndexEnabled(!isIndexEnabled)}
                      style={{
                        width: '48px',
                        height: '24px',
                        borderRadius: '12px',
                        background: isIndexEnabled ? '#10b981' : '#cbd5e1',
                        border: 'none',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background 0.3s'
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          position: 'absolute',
                          top: '3px',
                          left: isIndexEnabled ? '26px' : '4px',
                          transition: 'left 0.3s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                        }}
                      />
                    </button>
                  </div>
                </div>

                <p style={{ margin: '10px 0 0 0', color: '#334155', fontSize: '0.88rem' }}>{activeIndexScenario.explanation}</p>
              </div>

              {/* Target Query Code & Simulator Action */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>SQL Query Under Execution</span>
                  <button
                    onClick={handleSimulateIndexQuery}
                    disabled={isSimulatingQuery}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.4rem 1rem',
                      borderRadius: '6px',
                      background: activeIndexScenario.badgeColor,
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Play size={14} fill="#fff" /> {isSimulatingQuery ? 'Benchmarking...' : 'Run Benchmark'}
                  </button>
                </div>
                <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', overflowX: 'auto', fontSize: '0.85rem', margin: 0 }}>
                  <code style={{ color: '#38bdf8' }}>{activeIndexScenario.query}</code>
                </pre>
              </div>

              {/* Performance Comparison Metrics Cards */}
              {(() => {
                const metrics = isIndexEnabled ? activeIndexScenario.withIndex : activeIndexScenario.withoutIndex;
                const speedupFactor = Math.round(activeIndexScenario.withoutIndex.executionTimeMs / activeIndexScenario.withIndex.executionTimeMs);
                return (
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', background: isIndexEnabled ? '#f0fdf4' : '#fff1f2', transition: 'all 0.3s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isIndexEnabled ? '#166534' : '#991b1b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isIndexEnabled ? <Zap size={18} color="#10b981" /> : <Clock size={18} color="#ef4444" />}
                        Execution Strategy: {metrics.scanType}
                      </span>
                      {isIndexEnabled && (
                        <span style={{ background: '#10b981', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
                          🚀 {speedupFactor}x FASTER EXECUTION
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      
                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>EXECUTION TIME</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: isIndexEnabled ? '#10b981' : '#ef4444' }}>
                          {metrics.executionTimeMs} ms
                        </span>
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>SCANNED ROWS</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: isIndexEnabled ? '#10b981' : '#ef4444' }}>
                          {metrics.scannedRows.toLocaleString()}
                        </span>
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>ESTIMATED COST</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3b82f6' }}>
                          {metrics.costUnits}
                        </span>
                      </div>

                      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>MEMORY BUFFER</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#8b5cf6' }}>
                          {metrics.memoryUsed}
                        </span>
                      </div>

                    </div>

                    <div style={{ padding: '0.85rem 1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', fontWeight: 700, color: isIndexEnabled ? '#15803d' : '#b91c1c' }}>
                      {metrics.verdict}
                    </div>

                  </div>
                );
              })()}

            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical')}>Let's Code Hands-On! (+15 XP) &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* 4. PRACTICAL TAB */}
      {activeTab === 'practical' && (
        <Section key="practical" id="practical" eyebrow="Live Examples" title="Practical: Advanced SQL Scenarios">
          <div className="panel">
            <p>Master complex production query patterns combining Subqueries, Views, and Indexing.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Payroll Security View</h3>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginBottom: '1rem' }}>
              <strong>Goal:</strong> HR requires a reporting view hiding sensitive fields like SSN while providing payroll summaries.
            </div>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE VIEW</code> HR_Payroll <code style={{ color: '#89ddff' }}>AS</code><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> emp_id, first_name, last_name, department, salary<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees;<br/><br/>
              <span style={{ color: '#64748b' }}>-- HR staff can now query securely:</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> * <code style={{ color: '#c792ea' }}>FROM</code> HR_Payroll <code style={{ color: '#c792ea' }}>WHERE</code> department = <span style={{ color: '#c3e88d' }}>'Engineering'</span>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Single-Row Subquery Report</h3>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '1rem' }}>
              <strong>Goal:</strong> Find all employees earning higher than the company-wide average salary.
            </div>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>SELECT</code> first_name, last_name, salary<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees<br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> salary &gt; (<br/>
              &nbsp;&nbsp;<code style={{ color: '#c792ea' }}>SELECT</code> <code style={{ color: '#82aaff' }}>AVG</code>(salary) <code style={{ color: '#c792ea' }}>FROM</code> Employees<br/>
              );
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Indexing High-Traffic Lookup Columns</h3>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', marginBottom: '1rem' }}>
              <strong>Goal:</strong> Optimize frequent user login lookups by email address.
            </div>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE UNIQUE INDEX</code> idx_emp_email <br/>
              <code style={{ color: '#89ddff' }}>ON</code> Employees (email);
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue to Assignment (+10 XP) &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {/* 5. ASSIGNMENT TAB */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 8 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Advanced Developer Challenge</h3>
            <p>Prove you have mastered advanced SQL subqueries, virtual views, and index performance optimization.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: The Correlated View</h4>
              <p style={{ color: '#475569' }}>Create a View called <code>HighEarners</code> that uses a Correlated Subquery to find employees who make more than the average salary of <em>their specific department</em>.</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: Index Optimizer Challenge</h4>
              <p style={{ color: '#475569' }}>You have a massive <code>Transactions</code> table with 5 million rows. Your application runs this query 100 times a second:<br/><code>SELECT * FROM Transactions WHERE status = 'Failed' AND date &gt; '2026-01-01';</code><br/>Write the SQL command to create an index that will optimize this specific query.</p>
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
