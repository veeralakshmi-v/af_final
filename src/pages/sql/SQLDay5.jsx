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

export default function SQLDay5({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module5', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'where_clause' && (
        <Section key="where_clause" id="where_clause" eyebrow="Filtering" title="The WHERE Clause & Operators">
          <div className="panel">
            <p>Now that you know how to query data using <code>SELECT</code> (from Day 4), let's learn how to filter that data! We use the <code>WHERE</code> clause combined with <strong>Operators</strong> to specify exact conditions.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Logical Operators</h3>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <strong>AND:</strong> Returns true if <em>all</em> conditions separated by AND are true.
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <strong>OR:</strong> Returns true if <em>any</em> condition separated by OR is true.
              </div>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <strong>NOT:</strong> Reverses the value of a condition.
              </div>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Special Operators</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              <li><strong>IN:</strong> Used to specify multiple exact values in a WHERE clause. <br/><code style={{ fontSize: '0.85em', color: '#64748b' }}>WHERE country IN ('USA', 'UK', 'Canada')</code></li>
              <li><strong>BETWEEN:</strong> Selects values within a given range (inclusive). <br/><code style={{ fontSize: '0.85em', color: '#64748b' }}>WHERE price BETWEEN 10 AND 50</code></li>
              <li><strong>LIKE:</strong> Used to search for a specified pattern in a column using wildcards (`%` for any string, `_` for single char). <br/><code style={{ fontSize: '0.85em', color: '#64748b' }}>WHERE name LIKE 'A%'</code> (Starts with A)</li>
              <li><strong>IS NULL / IS NOT NULL:</strong> Tests for empty (NULL) values. You cannot use `=` to check for NULL! <br/><code style={{ fontSize: '0.85em', color: '#64748b' }}>WHERE phone_number IS NULL</code></li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('sorting')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'sorting' && (
        <Section key="sorting" id="sorting" eyebrow="Sorting" title="ORDER BY">
          <div className="panel">
            <p>By default, SQL returns results in the order they were inserted into the database. To sort them meaningfully, we use the <code>ORDER BY</code> keyword.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>ASC (Ascending)</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Sorts from lowest to highest, or A to Z. This is the <strong>default</strong> behavior if you just write `ORDER BY column_name`.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontSize: '0.9rem' }}>SELECT * FROM Users ORDER BY age ASC;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>DESC (Descending)</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Sorts from highest to lowest, or Z to A. You must explicitly write `DESC`.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#db2777', fontSize: '0.9rem' }}>SELECT * FROM Users ORDER BY score DESC;</code>
              </div>
            </div>

            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>
              <p style={{ margin: 0, color: '#991b1b' }}><strong>Syntax Rule!</strong></p>
              <p style={{ margin: 0, marginTop: '0.5rem', color: '#b91c1c' }}>If you are using both a <code>WHERE</code> clause and an <code>ORDER BY</code> clause, the <code>WHERE</code> clause <strong>must</strong> come first!</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical_filtering')}>Let's Code! (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'practical_filtering' && (
        <Section key="practical_filtering" id="practical_filtering" eyebrow="Live Examples" title="Practical Searches">
          <div className="panel">
            
            <h3 style={{ marginBottom: '1rem' }}>1. Employee Search System</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Find all IT employees making over $80,000, sorted by highest paid</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> first_name, last_name, salary <br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Employees <br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> department = <span style={{ color: '#c3e88d' }}>'IT'</span> <code style={{ color: '#89ddff' }}>AND</code> salary &gt; <span style={{ color: '#f07178' }}>80000</span> <br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> salary <code style={{ color: '#89ddff' }}>DESC</code>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Customer Search</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Find customers from specific states whose email is NOT null</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> * <br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Customers <br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> state <code style={{ color: '#89ddff' }}>IN</code> (<span style={{ color: '#c3e88d' }}>'NY'</span>, <span style={{ color: '#c3e88d' }}>'CA'</span>, <span style={{ color: '#c3e88d' }}>'TX'</span>) <code style={{ color: '#89ddff' }}>AND</code> email <code style={{ color: '#89ddff' }}>IS NOT NULL</code><br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> last_name <code style={{ color: '#89ddff' }}>ASC</code>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Product Search</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Find products between $10 and $50 with "Pro" in the name</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> product_name, price <br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Products <br/>
              <code style={{ color: '#c792ea' }}>WHERE</code> price <code style={{ color: '#89ddff' }}>BETWEEN</code> <span style={{ color: '#f07178' }}>10</span> <code style={{ color: '#89ddff' }}>AND</code> <span style={{ color: '#f07178' }}>50</span> <br/>
              <code style={{ color: '#89ddff' }}>AND</code> product_name <code style={{ color: '#89ddff' }}>LIKE</code> <span style={{ color: '#c3e88d' }}>'%Pro%'</span> <br/>
              <code style={{ color: '#c792ea' }}>ORDER BY</code> price <code style={{ color: '#89ddff' }}>ASC</code>;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 5 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Data Filtering Challenge</h3>
            <p>Combine your knowledge of the <code>WHERE</code> clause, logical operators, and <code>ORDER BY</code> to solve these challenges!</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: The VIP Search</h4>
              <p style={{ color: '#475569' }}>Write a <code>SELECT</code> query to find all <strong>Customers</strong> who live in either 'NY' or 'CA' and have a loyalty points score greater than 1000. Sort the results so the customer with the highest points appears first.</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: Inventory Check</h4>
              <p style={{ color: '#475569' }}>Write a <code>SELECT</code> query to find all <strong>Products</strong> where the price is between $50 and $150, but the `description` column is completely empty (NULL).</p>
            </div>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 3: Pattern Matching</h4>
              <p style={{ color: '#475569' }}>Write a query to find all <strong>Employees</strong> whose last name ends with the letter 'son' (e.g., Johnson, Wilson, Anderson) and who work in the 'Sales' department.</p>
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
