import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Database, Terminal, Table, Layers, BarChart2, FileSpreadsheet } from 'lucide-react';

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

export default function SQLDAFinalProject({ activeTab, onNavigate }) {
  const handleContinue = (nextSectionId) => {
    onNavigate('sql_da_final_project', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {activeTab === 'overview' && (
        <Section key="overview" id="overview" eyebrow="Capstone Project" title="Retail Sales Analytics Overview">
          <div className="panel">
            <p>Welcome to the SQL Data Analytics Capstone Project: <strong>Retail Sales Analytics</strong>!</p>
            <p>In this final project, you will act as a Lead Data Analyst for a retail corporate brand. You are provided with a SQL transactional database and tasked with translating raw tables into a clean business insights suite.</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', margin: '2rem 0' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>🏆 Project Objectives:</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.92rem', color: '#475569', lineHeight: 1.6 }}>
                <li>Set up and import the relational transaction database.</li>
                <li>Formulate and test 40–50 business analytics SQL queries.</li>
                <li>Utilize Joins, Grouping, Aggregates, CASE WHEN, and advanced Window Functions.</li>
                <li>Analyze monthly revenue trends, customer segments, and regional performances.</li>
                <li>Export your consolidated reports into Power BI or Microsoft Excel.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('import_db')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'import_db' && (
        <Section key="import_db" id="import_db" eyebrow="Stage 1" title="Import SQL Database">
          <div className="panel">
            <p>First, download the database dump file containing the schemas for <code>Customers</code>, <code>Orders</code>, <code>Order_Items</code>, and <code>Products</code>.</p>

            <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>⚙️ Import Instructions:</h4>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                <li>Open your database manager tool (e.g., MySQL Workbench or pgAdmin).</li>
                <li>Create a new database named <code>retail_sales_db</code>.</li>
                <li>Run the import command or load the provided <code>.sql</code> script to populate the transaction records.</li>
              </ol>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('queries')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'queries' && (
        <Section key="queries" id="queries" eyebrow="Stage 2" title="Write 10–20 SQL Queries">
          <div className="panel">
            <p>To construct a robust overview of retail operations, write a suite of 10-20 SQL scripts addressing questions requested by stakeholders, including:</p>
            <ul>
              <li>Identify transaction frequencies by hour of the day to optimize checkout staffing.</li>
              <li>Filter out transactions that occurred during holiday sales events.</li>
              <li>Locate missing entries (e.g. transactions without delivery addresses).</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('joins_groups')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'joins_groups' && (
        <Section key="joins_groups" id="joins_groups" eyebrow="Stage 3" title="Joins, Group By & Aggregates">
          <div className="panel">
            <p>Leverage table relations, group categories, aggregate sum and count metrics, and utilize conditional structures like <code>CASE WHEN</code>.</p>

            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: 1.5, margin: '1.5rem 0' }}>
              <span style={{ color: '#64748b' }}>-- Case expression example: customer lifetime value ranking</span><br />
              <code style={{ color: '#c792ea' }}>SELECT</code> customer_name,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(total_amount) <code style={{ color: '#89ddff' }}>AS</code> ltv,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#c792ea' }}>CASE</code><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#c792ea' }}>WHEN</code> <code style={{ color: '#82aaff' }}>SUM</code>(total_amount) &gt;= 5000 <code style={{ color: '#c792ea' }}>THEN</code> <span style={{ color: '#c3e88d' }}>'VIP'</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#c792ea' }}>WHEN</code> <code style={{ color: '#82aaff' }}>SUM</code>(total_amount) &gt;= 1500 <code style={{ color: '#c792ea' }}>THEN</code> <span style={{ color: '#c3e88d' }}>'Regular'</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#c792ea' }}>ELSE</code> <span style={{ color: '#c3e88d' }}>'New'</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#c792ea' }}>END</code> <code style={{ color: '#89ddff' }}>AS</code> customer_tier<br />
              <code style={{ color: '#c792ea' }}>FROM</code> orders<br />
              <code style={{ color: '#c792ea' }}>GROUP BY</code> customer_name;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('advanced_analytics')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'advanced_analytics' && (
        <Section key="advanced_analytics" id="advanced_analytics" eyebrow="Stage 4" title="Window Functions & Ranking">
          <div className="panel">
            <p>Utilize analytical window functions such as <code>ROW_NUMBER()</code>, <code>RANK()</code>, and <code>LAG() / LEAD()</code> to execute temporal comparisons.</p>

            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: 1.5, margin: '1.5rem 0' }}>
              <span style={{ color: '#64748b' }}>-- Rank products by sales velocity within each category</span><br />
              <code style={{ color: '#c792ea' }}>SELECT</code> product_name, category, sales_qty,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>RANK</code>() <code style={{ color: '#89ddff' }}>OVER</code> (<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#c792ea' }}>PARTITION BY</code> category <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#c792ea' }}>ORDER BY</code> sales_qty <code style={{ color: '#c792ea' }}>DESC</code><br />
              &nbsp;&nbsp;&nbsp;&nbsp;) <code style={{ color: '#89ddff' }}>AS</code> sales_rank<br />
              <code style={{ color: '#c792ea' }}>FROM</code> product_sales;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('reports')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'reports' && (
        <Section key="reports" id="reports" eyebrow="Stage 5" title="Monthly Sales & Insights">
          <div className="panel">
            <p>Assemble the aggregated output sets of your query suite into structural insights reports covering:</p>
            <ul>
              <li><strong>Monthly Sales Report:</strong> Total revenue and percentage growth month-over-month.</li>
              <li><strong>Customer Insights:</strong> Identification of highest-volume shoppers and regional buyers.</li>
              <li><strong>Product Performance:</strong> Highest-margin goods vs. lowest stock turn counts.</li>
              <li><strong>Regional Sales Analysis:</strong> Market share distribution of store locations.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('export_bi')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'export_bi' && (
        <Section key="export_bi" id="export_bi" eyebrow="Submission" title="Export to Power BI & Excel">
          <div className="panel">
            <p>To finalize the project, export your query results as CSV or Excel sheets, and load them into Power BI or Microsoft Excel to create interactive charts and executive dashboards.</p>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.2rem', borderRadius: '8px', margin: '2rem 0' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#065f46' }}>📋 Submission Requirements:</h4>
              <p style={{ margin: 0, color: '#047857', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Submit a compressed zip archive containing:<br />
                1. A <code>queries.sql</code> file containing the 40–50 SQL scripts.<br />
                2. A brief <code>report.pdf</code> or Power BI dashboard file (<code>.pbix</code>) demonstrating your analytical summaries and charts.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Final Project Submission Registered! Congratulations on completing the course!')}>Submit Capstone Project</button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
