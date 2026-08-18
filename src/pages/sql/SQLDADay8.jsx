import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, BarChart2, ShoppingCart, Users, Table, Zap, FileText, Target, CheckCircle, AlertTriangle, HelpCircle, Eye, ArrowRight } from 'lucide-react';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem', fontWeight: 800, color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function SQLDADay8({ activeTab, onNavigate }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_da_day8', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckQuestion = (qId) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const selectOption = (qId, optionIdx) => {
    if (checkedQuestions[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  return (
    <AnimatePresence mode="wait">
      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Core Framework" title="SQL for Data Analysis">
          <div className="panel">
            <h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>🎯 Learning Objectives:</h3>
            <ul style={{ lineHeight: '1.8', color: '#475569', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
              <li>Understand the workflow differences between **Transactional (OLTP)** databases and **Analytical (OLAP)** datasets.</li>
              <li>Learn to convert unstructured business questions into functional, structured SQL query scripts.</li>
              <li>Master the standard order of execution in SQL queries (SELECT vs. FROM, WHERE, GROUP BY, HAVING).</li>
            </ul>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>1. OLTP vs. OLAP: The Two Realms of Data</h3>
            <p style={{ lineHeight: '1.7', color: '#475569' }}>
              Before looking at query metrics, you need to understand where data analytics queries are processed:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>OLTP (Online Transaction Processing)</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  **Purpose:** Running the daily business operations (inserting orders, updating profile credentials, deleting carts).<br/>
                  **Style:** Highly normalized tables, rapid single-row updates.<br/>
                  **Example:** The MySQL instance running behind a live e-commerce store website.
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>OLAP (Online Analytical Processing)</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  **Purpose:** Compiling business intelligence reports and aggregations.<br/>
                  **Style:** Denormalized star schemas, column-oriented databases optimized for scanning millions of rows.<br/>
                  **Example:** Enterprise data warehouses like Snowflake, BigQuery, or Amazon Redshift.
                </p>
              </div>
            </div>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>2. The SQL Order of Execution</h3>
            <p style={{ lineHeight: '1.7', color: '#475569' }}>
              When writing a database query, you write statements starting with `SELECT`. However, the database engine processes them in a completely different sequence:
            </p>
            <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '12px', margin: '1.5rem 0' }}>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', lineHeight: 1.8, fontSize: '0.92rem' }}>
                <li><strong>FROM:</strong> Locates and loads the tables (and joins them).</li>
                <li><strong>WHERE:</strong> Filters out rows that don't match conditions.</li>
                <li><strong>GROUP BY:</strong> Groups rows into summary buckets.</li>
                <li><strong>HAVING:</strong> Filters out summary buckets using aggregates.</li>
                <li><strong>SELECT:</strong> Computes column values and applies expressions.</li>
                <li><strong>ORDER BY:</strong> Sorts the output rows.</li>
                <li><strong>LIMIT:</strong> Truncates the final row count.</li>
              </ol>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '1.2rem', borderRadius: '8px', display: 'flex', gap: '12px', margin: '2rem 0' }}>
              <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#92400e', fontSize: '0.9rem' }}>⚠️ Common Mistake: Using SELECT aliases in WHERE</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#b45309', lineHeight: 1.5 }}>
                  Since `WHERE` is processed *before* `SELECT`, you cannot write `SELECT price * qty AS total FROM sales WHERE total &gt; 100`. The engine doesn't know what `total` is yet! Use `WHERE price * qty &gt; 100` instead.
                </p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('sales')}>Continue to Sales Analysis &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'sales' && (
        <Section key="sales" id="sales" eyebrow="Core Metrics" title="Sales Analysis">
          <div className="panel">
            <p>Sales reports focus on three major metrics: **Total Sales Revenue**, **Order Volumes**, and **Average Order Value (AOV)**.</p>
            
            <h3 style={{ marginTop: '1.5rem', color: '#0f172a' }}>1. The Analytics Query</h3>
            <p style={{ color: '#475569' }}>
              To compute aggregate summaries while ignoring invalid transactions, use filters on order status:
            </p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <span style={{ color: '#64748b' }}>-- Sum aggregate revenue, count transactions, calculate average cart spend</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>COUNT</code>(order_id) <code style={{ color: '#89ddff' }}>AS</code> total_orders,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(total_amount) <code style={{ color: '#89ddff' }}>AS</code> total_revenue,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>AVG</code>(total_amount) <code style={{ color: '#89ddff' }}>AS</code> average_order_value<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> orders<br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> order_status <code style={{ color: '#89ddff' }}>NOT IN</code> (<span style={{ color: '#c3e88d' }}>'Cancelled'</span>, <span style={{ color: '#c3e88d' }}>'Refunded'</span>);
            </pre>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>📊 Expected Output:</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>total_orders</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>total_revenue</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>average_order_value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>4,152</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$249,120.00</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$60.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.2rem', borderRadius: '8px', margin: '2rem 0' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={16} /> Pro AI Analyst Tip:
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#15803d', lineHeight: 1.5 }}>
                When joining orders and item lists, always apply aggregates to the *order_items* table instead of sum-aggregating orders directly if you need item granularity. If you sum order totals after joining with items, you will duplicate order sums for every item in that order!
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('customer')}>Continue to Customer Analysis &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'customer' && (
        <Section key="customer" id="customer" eyebrow="CRM Analytics" title="Customer Analysis">
          <div className="panel">
            <p>Data analysts query customer behaviors to discover **Customer Lifetime Value (LTV)**, frequency indices, and identify loyalty classes.</p>

            <h3 style={{ marginTop: '1.5rem', color: '#0f172a' }}>1. Querying Top VIP Spenders</h3>
            <p style={{ color: '#475569' }}>
              To find high-value clients, join the customer profiling database with order transaction metrics:
            </p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <code style={{ color: '#c792ea' }}>SELECT</code> <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;c.customer_id, c.customer_name, c.email,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(o.total_amount) <code style={{ color: '#89ddff' }}>AS</code> customer_lifetime_value,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>COUNT</code>(o.order_id) <code style={{ color: '#89ddff' }}>AS</code> purchase_count<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> customers c<br/>
              <code style={{ color: '#c792ea' }}>JOIN</code> orders o <code style={{ color: '#89ddff' }}>ON</code> c.customer_id = o.customer_id<br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> o.order_status = <span style={{ color: '#c3e88d' }}>'Completed'</span><br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> c.customer_id, c.customer_name, c.email<br/>
              <code style={{ color: '#c792ea' }}>HAVING</code> customer_lifetime_value &gt;= 1500<br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> customer_lifetime_value <code style={{ color: '#c792ea' }}>DESC</code>;
            </pre>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>📊 Expected Output:</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>customer_name</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>customer_lifetime_value</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>purchase_count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>Sarah Connor</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$3,420.00</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>12</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>John Doe</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$1,850.50</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>8</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '1.2rem', borderRadius: '8px', display: 'flex', gap: '12px', margin: '2rem 0' }}>
              <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#92400e', fontSize: '0.9rem' }}>⚠️ Common Mistake: COUNT(column) vs. COUNT(DISTINCT column)</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#b45309', lineHeight: 1.5 }}>
                  If you calculate unique days visited by a customer, `COUNT(visit_date)` counts duplicate dates (e.g. multiple visits on the same day). Always write `COUNT(DISTINCT DATE(visit_date))` to find unique visitor days.
                </p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('employee')}>Continue to Employee Analysis &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'employee' && (
        <Section key="employee" id="employee" eyebrow="HR Analytics" title="Employee Analysis">
          <div className="panel">
            <p>Employee metrics help businesses audit team size distributions, evaluate tenure length statistics, and optimize salary ranges.</p>

            <h3 style={{ marginTop: '1.5rem', color: '#0f172a' }}>1. Aggregate Salary & Count Summary</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <code style={{ color: '#c792ea' }}>SELECT</code> <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;department,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>COUNT</code>(employee_id) <code style={{ color: '#89ddff' }}>AS</code> team_count,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>MIN</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> minimum_pay,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>MAX</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> maximum_pay,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>AVG</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> average_pay<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> employees<br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> department<br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> average_pay <code style={{ color: '#c792ea' }}>DESC</code>;
            </pre>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>📊 Expected Output:</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>department</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>team_count</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>minimum_pay</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>maximum_pay</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>average_pay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>Engineering</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>12</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$70,000</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$140,000</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$102,500</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>Marketing</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>8</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$45,000</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$90,000</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$68,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('product')}>Continue to Product Analysis &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'product' && (
        <Section key="product" id="product" eyebrow="Inventory Analytics" title="Product Analysis">
          <div className="panel">
            <p>Product analytics identifies best-selling items, underperforming categories, and tracks inventory stock turns.</p>

            <h3 style={{ marginTop: '1.5rem', color: '#0f172a' }}>1. Sales Velocity Query</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <code style={{ color: '#c792ea' }}>SELECT</code> <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;p.product_id, p.product_name, p.category,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(oi.quantity) <code style={{ color: '#89ddff' }}>AS</code> units_sold,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(oi.quantity * oi.price) <code style={{ color: '#89ddff' }}>AS</code> gross_revenue<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> products p<br/>
              <code style={{ color: '#c792ea' }}>JOIN</code> order_items oi <code style={{ color: '#89ddff' }}>ON</code> p.product_id = oi.product_id<br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> p.product_id, p.product_name, p.category<br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> units_sold <code style={{ color: '#c792ea' }}>DESC</code>;
            </pre>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>📊 Expected Output:</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>product_name</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>category</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>units_sold</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>gross_revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>Super Bluetooth Speaker</td>
                    <td style={{ padding: '8px 12px' }}>Electronics</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>850</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$42,500</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>Premium Cotton Tee</td>
                    <td style={{ padding: '8px 12px' }}>Apparel</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>620</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$15,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('revenue')}>Continue to Revenue Analysis &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'revenue' && (
        <Section key="revenue" id="revenue" eyebrow="Finance Analytics" title="Revenue Analysis">
          <div className="panel">
            <p>Evaluating percentage contributions of product lines helps direct marketing budgets to highly profitable assets.</p>

            <h3 style={{ marginTop: '1.5rem', color: '#0f172a' }}>1. Revenue Contribution Query</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <code style={{ color: '#c792ea' }}>SELECT</code> <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;p.category,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(oi.quantity * oi.price) <code style={{ color: '#89ddff' }}>AS</code> category_sales,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>ROUND</code>(<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(oi.quantity * oi.price) / <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(SELECT SUM(quantity * price) FROM order_items) * 100, 2<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;) <code style={{ color: '#89ddff' }}>AS</code> percent_contribution<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> products p<br/>
              <code style={{ color: '#c792ea' }}>JOIN</code> order_items oi <code style={{ color: '#89ddff' }}>ON</code> p.product_id = oi.product_id<br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> p.category<br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> category_sales <code style={{ color: '#c792ea' }}>DESC</code>;
            </pre>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>📊 Expected Output:</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>category</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>category_sales</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>percent_contribution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>Electronics</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$150,000</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>60.00%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px' }}>Apparel</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$100,000</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>40.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('monthly')}>Continue to Monthly Report Generation &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'monthly' && (
        <Section key="monthly" id="monthly" eyebrow="Temporal Analytics" title="Monthly Report Generation">
          <div className="panel">
            <p>Monthly trends help managers identify season-related demands and growth metrics.</p>

            <h3 style={{ marginTop: '1.5rem', color: '#0f172a' }}>1. Month-over-Month Sales Summary</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1.2rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <code style={{ color: '#c792ea' }}>SELECT</code> <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>DATE_FORMAT</code>(order_date, <span style={{ color: '#c3e88d' }}>'%Y-%m'</span>) <code style={{ color: '#89ddff' }}>AS</code> sales_month,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>COUNT</code>(order_id) <code style={{ color: '#89ddff' }}>AS</code> total_orders,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code style={{ color: '#82aaff' }}>SUM</code>(total_amount) <code style={{ color: '#89ddff' }}>AS</code> monthly_revenue<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> orders<br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> sales_month<br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> sales_month;<br/>
            </pre>

            <h3 style={{ marginTop: '2rem', color: '#0f172a' }}>📊 Expected Output:</h3>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>sales_month</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>total_orders</th>
                    <th style={{ padding: '8px 12px', color: '#334155' }}>monthly_revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>2026-01</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>120</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$12,400.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>2026-02</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>145</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>$15,620.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('kpi')}>Continue to KPI Calculation &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'kpi' && (
        <Section key="kpi" id="kpi" eyebrow="Business Performance" title="KPI Calculation">
          <div className="panel">
            <p>KPI metrics evaluate high-level business goals using formulas computed inside query groups.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', margin: '1.5rem 0' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>💰 KPI: Average Revenue Per User (ARPU)</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem' }}>
                Shows the average spend of active buyers in the database:
              </p>
              <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                <code>SELECT SUM(total_amount) / COUNT(DISTINCT customer_id) AS arpu FROM orders;</code>
              </pre>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', margin: '1.5rem 0' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>📈 KPI: Basket Size / Items per Order</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem' }}>
                Calculates the average number of items purchased per checkout:
              </p>
              <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                <code>SELECT SUM(quantity) / COUNT(DISTINCT order_id) AS avg_basket_size FROM order_items;</code>
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('biz_questions')}>Continue to Case Studies &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'biz_questions' && (
        <Section key="biz_questions" id="biz_questions" eyebrow="Business Cases" title="Business Questions using SQL">
          <div className="panel">
            <p>Let's review common real-world requests and how to translate them into clean, structured SQL queries.</p>
            
            <div style={{ background: '#ecfdf5', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981', margin: '1.5rem 0' }}>
              <strong style={{ color: '#065f46', display: 'block', marginBottom: '8px' }}>Business Case 1:</strong>
              <p style={{ margin: '0 0 12px 0', color: '#047857', fontSize: '0.92rem', lineHeight: 1.5 }}>
                "We want to identify the top 3 highest revenue-producing categories, but only for orders completed in the East region."
              </p>
              <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                <code style={{ color: '#c792ea' }}>SELECT</code> p.category, <code style={{ color: '#82aaff' }}>SUM</code>(oi.quantity * oi.price) <code style={{ color: '#89ddff' }}>AS</code> sales<br/>
                <code style={{ color: '#c792ea' }}>FROM</code> orders o<br/>
                <code style={{ color: '#c792ea' }}>JOIN</code> order_items oi <code style={{ color: '#89ddff' }}>ON</code> o.order_id = oi.order_id<br/>
                <code style={{ color: '#c792ea' }}>JOIN</code> products p <code style={{ color: '#89ddff' }}>ON</code> oi.product_id = p.product_id<br/>
                <code style={{ color: '#c792ea' }}>WHERE</code> o.region = <span style={{ color: '#c3e88d' }}>'East'</span> <code style={{ color: '#89ddff' }}>AND</code> o.order_status = <span style={{ color: '#c3e88d' }}>'Completed'</span><br/>
                <code style={{ color: '#c792ea' }}>GROUP BY</code> p.category<br/>
                <code style={{ color: '#c792ea' }}>ORDER BY</code> sales <code style={{ color: '#c792ea' }}>DESC</code><br/>
                <code style={{ color: '#c792ea' }}>LIMIT</code> 3;
              </pre>
            </div>

            <div style={{ background: '#ecfdf5', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981', margin: '1.5rem 0' }}>
              <strong style={{ color: '#065f46', display: 'block', marginBottom: '8px' }}>Business Case 2:</strong>
              <p style={{ margin: '0 0 12px 0', color: '#047857', fontSize: '0.92rem', lineHeight: 1.5 }}>
                "Show all departments whose total payroll budget exceeds $500,000."
              </p>
              <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                <code style={{ color: '#c792ea' }}>SELECT</code> department, <code style={{ color: '#82aaff' }}>SUM</code>(salary) <code style={{ color: '#89ddff' }}>AS</code> payroll_budget<br/>
                <code style={{ color: '#c792ea' }}>FROM</code> employees<br/>
                <code style={{ color: '#c792ea' }}>GROUP BY</code> department<br/>
                <code style={{ color: '#c792ea' }}>HAVING</code> payroll_budget &gt; 500000;
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>Continue to Day 8 Assessment &rarr;</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Assessment" title="Day 8 Assessment">
          <div className="panel animate-fade-in">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Test your knowledge of analytical SQL query structures.
            </p>

            <div className="space-y-6" style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Question 1 */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontWeight: 700 }}>1. Which SQL clause is used to filter aggregated data groups?</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {['WHERE', 'HAVING', 'GROUP BY', 'FILTER BY'].map((opt, idx) => {
                    const isSelected = selectedAnswers['q1'] === idx;
                    const isChecked = checkedQuestions['q1'];
                    return (
                      <button
                        key={idx}
                        onClick={() => selectOption('q1', idx)}
                        style={{
                          textAlign: 'left',
                          padding: '10px 14px',
                          borderRadius: '6px',
                          border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
                          background: isSelected ? '#e0f2fe' : '#fff',
                          color: '#334155',
                          cursor: isChecked ? 'default' : 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!checkedQuestions['q1'] ? (
                  <button
                    className="btn btn-outline"
                    disabled={selectedAnswers['q1'] === undefined}
                    onClick={() => handleCheckQuestion('q1')}
                    style={{ marginTop: '1rem', padding: '6px 16px', fontSize: '0.82rem' }}
                  >
                    Check Answer
                  </button>
                ) : (
                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: selectedAnswers['q1'] === 1 ? '#059669' : '#dc2626' }}>
                    {selectedAnswers['q1'] === 1 ? 'Correct! HAVING filters grouped aggregates, while WHERE filters rows before grouping.' : 'Incorrect. Try again! (Hint: HAVING)'}
                  </p>
                )}
              </div>

              {/* Question 2 */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontWeight: 700 }}>2. In the logical order of database query execution, which step runs first?</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {['SELECT', 'WHERE', 'FROM', 'GROUP BY'].map((opt, idx) => {
                    const isSelected = selectedAnswers['q2'] === idx;
                    const isChecked = checkedQuestions['q2'];
                    return (
                      <button
                        key={idx}
                        onClick={() => selectOption('q2', idx)}
                        style={{
                          textAlign: 'left',
                          padding: '10px 14px',
                          borderRadius: '6px',
                          border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
                          background: isSelected ? '#e0f2fe' : '#fff',
                          color: '#334155',
                          cursor: isChecked ? 'default' : 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!checkedQuestions['q2'] ? (
                  <button
                    className="btn btn-outline"
                    disabled={selectedAnswers['q2'] === undefined}
                    onClick={() => handleCheckQuestion('q2')}
                    style={{ marginTop: '1rem', padding: '6px 16px', fontSize: '0.82rem' }}
                  >
                    Check Answer
                  </button>
                ) : (
                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: selectedAnswers['q2'] === 2 ? '#059669' : '#dc2626' }}>
                    {selectedAnswers['q2'] === 2 ? 'Correct! The database engine always starts by parsing the FROM clause to load tables.' : 'Incorrect. Try again! (Hint: FROM)'}
                  </p>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Day 8 Completed successfully! Make sure to proceed to the Final Project.')}>Complete Day 8 (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
