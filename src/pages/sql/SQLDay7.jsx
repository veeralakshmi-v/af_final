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

export default function SQLDay7({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module7', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'er_model' && (
        <Section key="er_model" id="er_model" eyebrow="Design" title="The ER Model">
          <div className="panel">
            <p>Before writing code, we need to design our database. The <strong>Entity-Relationship (ER) Model</strong> is a visual way to describe how data is connected.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Entity</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>A real-world object or concept that can have data stored about it. (e.g., Student, Book, Course). <em>In SQL, these become your Tables.</em></p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Attribute</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>The properties or characteristics of an Entity. (e.g., A Student has a Name, Age, and Email). <em>In SQL, these become your Columns.</em></p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Relationship</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>How two Entities interact with each other. (e.g., A Student "borrows" a Book). <em>In SQL, these are enforced using Foreign Keys.</em></p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('relationships')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'relationships' && (
        <Section key="relationships" id="relationships" eyebrow="Architecture" title="Relationship Types">
          <div className="panel">
            <p>Entities can interact in three primary ways. Understanding these is the secret to good database design.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. One-to-One (1:1)</h3>
            <p>One record in Table A is related to exactly one record in Table B.</p>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', marginBottom: '1rem' }}>
              <strong>Example:</strong> A <code>Person</code> and a <code>Passport</code>. One person has one passport, and that passport belongs to one person.
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. One-to-Many (1:N)</h3>
            <p>One record in Table A is related to many records in Table B. This is the most common relationship!</p>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ec4899', marginBottom: '1rem' }}>
              <strong>Example:</strong> A <code>Customer</code> and <code>Orders</code>. One customer can place many orders, but a single order belongs to exactly one customer.
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Many-to-Many (M:N)</h3>
            <p>Many records in Table A are related to many records in Table B.</p>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginBottom: '1rem' }}>
              <strong>Example:</strong> <code>Students</code> and <code>Courses</code>. A student takes many courses, and a course has many students.
            </div>

            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginTop: '1.5rem', fontSize: '0.9rem' }}>
              <p style={{ margin: 0, color: '#991b1b' }}><strong>🚨 Design Rule: The Junction Table 🚨</strong></p>
              <p style={{ margin: 0, marginTop: '0.5rem', color: '#b91c1c' }}>Relational databases <em>cannot</em> handle Many-to-Many relationships directly! You must break them down into two One-to-Many relationships by creating a third "Junction" table (e.g., an <code>Enrollments</code> table that links Students and Courses).</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('joins')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'joins' && (
        <Section key="joins" id="joins" eyebrow="Querying" title="SQL Joins">
          <div className="panel">
            <p>Now that our tables are related, we need a way to combine their data when running queries. We do this using <strong>JOINs</strong>.</p>

            {/* 5 Join type definition cards */}
            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>INNER JOIN</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns records that have matching values in <em>both</em> tables. (The intersection).</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#2563eb', fontSize: '0.85rem' }}>SELECT * FROM A INNER JOIN B ON A.id = B.a_id;</code>
              </div>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>LEFT JOIN</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns all records from the Left table, and the matched records from the Right table. (Unmatched Right data is NULL).</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontSize: '0.85rem' }}>SELECT * FROM A LEFT JOIN B ON A.id = B.a_id;</code>
              </div>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>RIGHT JOIN</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns all records from the Right table, and the matched records from the Left table.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#d97706', fontSize: '0.85rem' }}>SELECT * FROM A RIGHT JOIN B ON A.id = B.a_id;</code>
              </div>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>FULL OUTER JOIN</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Returns all records when there is a match in either the Left OR Right table. (Everything!)</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontSize: '0.85rem' }}>SELECT * FROM A FULL OUTER JOIN B ON A.id = B.a_id;</code>
              </div>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>SELF JOIN</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>A regular join, but the table is joined with <em>itself</em>. Useful for hierarchical data like Employee–Manager.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#db2777', fontSize: '0.85rem' }}>SELECT * FROM Employees A, Employees B WHERE A.manager_id = B.emp_id;</code>
              </div>
            </div>

            {/* ── DATA ANALYTICS EXAMPLES ── */}
            <h3 style={{ marginTop: '2.5rem', marginBottom: '0.5rem', fontSize: '1.3rem' }}>📊 Data Analytics Examples</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
              We have two tables in an <strong>e-commerce analytics</strong> database:
              <code style={{ margin: '0 4px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>Customers</code> and
              <code style={{ margin: '0 4px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>Orders</code>.
              Some customers have not ordered yet, and one order has an unknown customer (cust_id=5).
            </p>

            {/* Sample Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '0.9rem', color: '#1e293b' }}>📋 Customers</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#3b82f6', color: 'white' }}>
                      <th style={{ padding: '7px 10px', textAlign: 'left' }}>cust_id</th>
                      <th style={{ padding: '7px 10px', textAlign: 'left' }}>name</th>
                      <th style={{ padding: '7px 10px', textAlign: 'left' }}>city</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['1','Alice','Chennai'],['2','Bob','Mumbai'],['3','Carol','Delhi'],['4','David','Kolkata']].map(([id,name,city],i) => (
                      <tr key={id} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>{id}</td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>{name}</td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>{city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '0.9rem', color: '#1e293b' }}>📋 Orders</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#10b981', color: 'white' }}>
                      <th style={{ padding: '7px 10px', textAlign: 'left' }}>order_id</th>
                      <th style={{ padding: '7px 10px', textAlign: 'left' }}>cust_id</th>
                      <th style={{ padding: '7px 10px', textAlign: 'left' }}>amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['101','1','₹5,000'],['102','2','₹3,200'],['103','2','₹1,800'],['104','5 ⚠️','₹9,500']].map(([oid,cid,amt],i) => (
                      <tr key={oid} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>{oid}</td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0', color: cid.includes('⚠️')?'#ef4444':undefined }}>{cid}</td>
                        <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>{amt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* INNER JOIN */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#3b82f6', color: 'white', padding: '10px 16px', fontWeight: 700, fontSize: '0.95rem' }}>🔵 INNER JOIN — Only customers who have orders</div>
              <div style={{ padding: '1rem' }}>
                <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', overflowX: 'auto' }}>{`SELECT Customers.name, Customers.city, Orders.order_id, Orders.amount
FROM Customers
INNER JOIN Orders ON Customers.cust_id = Orders.cust_id;`}</pre>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: '#475569' }}>✅ Result — 3 rows (Carol & David excluded; order 104 excluded):</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead><tr style={{ background: '#dbeafe' }}>
                    {['name','city','order_id','amount'].map(h=><th key={h} style={{ padding: '6px 10px', textAlign: 'left' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[['Alice','Chennai','101','₹5,000'],['Bob','Mumbai','102','₹3,200'],['Bob','Mumbai','103','₹1,800']].map((r,i)=>(
                      <tr key={i} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        {r.map((c,j)=><td key={j} style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LEFT JOIN */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#10b981', color: 'white', padding: '10px 16px', fontWeight: 700, fontSize: '0.95rem' }}>🟢 LEFT JOIN — All customers, even those with no orders</div>
              <div style={{ padding: '1rem' }}>
                <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', overflowX: 'auto' }}>{`SELECT Customers.name, Orders.order_id, Orders.amount
FROM Customers
LEFT JOIN Orders ON Customers.cust_id = Orders.cust_id;`}</pre>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: '#475569' }}>✅ Result — 5 rows (Carol & David appear with NULL):</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead><tr style={{ background: '#d1fae5' }}>
                    {['name','order_id','amount'].map(h=><th key={h} style={{ padding: '6px 10px', textAlign: 'left' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[['Alice','101','₹5,000'],['Bob','102','₹3,200'],['Bob','103','₹1,800'],['Carol','NULL','NULL'],['David','NULL','NULL']].map((r,i)=>(
                      <tr key={i} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        {r.map((c,j)=><td key={j} style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0', color: c==='NULL'?'#94a3b8':undefined, fontStyle: c==='NULL'?'italic':undefined }}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: '8px', background: '#ecfdf5', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: '#065f46' }}>
                  💡 <strong>Analytics use-case:</strong> Find customers who have <em>never placed an order</em> → add <code>WHERE Orders.order_id IS NULL</code>
                </div>
              </div>
            </div>

            {/* RIGHT JOIN */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#f59e0b', color: 'white', padding: '10px 16px', fontWeight: 700, fontSize: '0.95rem' }}>🟡 RIGHT JOIN — All orders, even orphan ones with no customer</div>
              <div style={{ padding: '1rem' }}>
                <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', overflowX: 'auto' }}>{`SELECT Customers.name, Orders.order_id, Orders.amount
FROM Customers
RIGHT JOIN Orders ON Customers.cust_id = Orders.cust_id;`}</pre>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: '#475569' }}>✅ Result — 4 rows (order 104 has NULL name):</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead><tr style={{ background: '#fef3c7' }}>
                    {['name','order_id','amount'].map(h=><th key={h} style={{ padding: '6px 10px', textAlign: 'left' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[['Alice','101','₹5,000'],['Bob','102','₹3,200'],['Bob','103','₹1,800'],['NULL','104','₹9,500']].map((r,i)=>(
                      <tr key={i} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        {r.map((c,j)=><td key={j} style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0', color: c==='NULL'?'#ef4444':undefined, fontStyle: c==='NULL'?'italic':undefined }}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: '8px', background: '#fffbeb', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: '#92400e' }}>
                  💡 <strong>Analytics use-case:</strong> Detect <em>orphan orders</em> (data quality issue) → add <code>WHERE Customers.cust_id IS NULL</code>
                </div>
              </div>
            </div>

            {/* FULL OUTER JOIN */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#8b5cf6', color: 'white', padding: '10px 16px', fontWeight: 700, fontSize: '0.95rem' }}>🟣 FULL OUTER JOIN — Everything from both tables</div>
              <div style={{ padding: '1rem' }}>
                <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', overflowX: 'auto' }}>{`SELECT Customers.name, Orders.order_id, Orders.amount
FROM Customers
FULL OUTER JOIN Orders ON Customers.cust_id = Orders.cust_id;`}</pre>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: '#475569' }}>✅ Result — 6 rows (all customers + all orders, NULLs on both sides):</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead><tr style={{ background: '#ede9fe' }}>
                    {['name','order_id','amount'].map(h=><th key={h} style={{ padding: '6px 10px', textAlign: 'left' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[['Alice','101','₹5,000'],['Bob','102','₹3,200'],['Bob','103','₹1,800'],['Carol','NULL','NULL'],['David','NULL','NULL'],['NULL','104','₹9,500']].map((r,i)=>(
                      <tr key={i} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        {r.map((c,j)=><td key={j} style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0', color: c==='NULL'?'#94a3b8':undefined, fontStyle: c==='NULL'?'italic':undefined }}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SELF JOIN */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#ec4899', color: 'white', padding: '10px 16px', fontWeight: 700, fontSize: '0.95rem' }}>🩷 SELF JOIN — Employee & Manager hierarchy</div>
              <div style={{ padding: '1rem' }}>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: '#1e293b' }}>📋 Employees table (references itself via manager_id):</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <thead><tr style={{ background: '#fce7f3' }}>
                    {['emp_id','name','manager_id'].map(h=><th key={h} style={{ padding: '6px 10px', textAlign: 'left' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[['1','Priya','NULL (CEO)'],['2','Raj','1'],['3','Meena','1'],['4','Arjun','2']].map((r,i)=>(
                      <tr key={i} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        {r.map((c,j)=><td key={j} style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0', color: c.includes('NULL')?'#94a3b8':undefined }}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', overflowX: 'auto' }}>{`-- Find each employee and their manager's name
SELECT E.name AS Employee, M.name AS Manager
FROM Employees E
LEFT JOIN Employees M ON E.manager_id = M.emp_id;`}</pre>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: '#475569' }}>✅ Result:</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead><tr style={{ background: '#fce7f3' }}>
                    {['Employee','Manager'].map(h=><th key={h} style={{ padding: '6px 10px', textAlign: 'left' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[['Priya','NULL — top-level'],['Raj','Priya'],['Meena','Priya'],['Arjun','Raj']].map((r,i)=>(
                      <tr key={i} style={{ background: i%2===0?'#f8fafc':'white' }}>
                        {r.map((c,j)=><td key={j} style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0', color: c.includes('NULL')?'#94a3b8':undefined, fontStyle: c.includes('NULL')?'italic':undefined }}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical')}>Let's Code! (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}




      {activeTab === 'practical' && (
        <Section key="practical" id="practical" eyebrow="Live Examples" title="Practical: E-Commerce Analytics">
          <div className="panel">
            <p>A real analytics query combining <strong>3 tables</strong> — Products, Orders, and Customers.</p>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.87rem', lineHeight: '1.7' }}>
              <span style={{ color: '#64748b' }}>-- Monthly Revenue per City</span><br/>
              <code style={{ color: '#c792ea' }}>SELECT</code> Customers.city, SUM(Orders.amount) <code style={{ color: '#c792ea' }}>AS</code> revenue<br/>
              <code style={{ color: '#c792ea' }}>FROM</code> Orders<br/>
              <code style={{ color: '#c792ea' }}>INNER JOIN</code> Customers <code style={{ color: '#89ddff' }}>ON</code> Orders.cust_id = Customers.cust_id<br/>
              <code style={{ color: '#c792ea' }}>GROUP BY</code> Customers.city<br/>
              <code style={{ color: '#c792ea' }}>HAVING</code> revenue {'>'} 10000;
            </pre>
            <div style={{ marginTop: '12px', background: '#f0fdf4', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}>
              🧠 <strong>What this does:</strong> Joins 3 tables, aggregates sales by geography, and filters profitable segments.
            </div>
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 7 Assignment">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>Database Architect Challenge</h3>
            <p>Test your design and querying skills.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 1: ER Design</h4>
              <p style={{ color: '#475569' }}>A Hospital wants to track <strong>Doctors</strong> and <strong>Patients</strong>. A Doctor sees many Patients, and a Patient can see many Doctors.<br/>1. What type of relationship is this?<br/>2. How many SQL tables do you need to create to properly build this in a database?</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Task 2: The Left Join</h4>
              <p style={{ color: '#475569' }}>You have a <code>Users</code> table and an <code>Orders</code> table. Write a query that returns <strong>all Users</strong>, and any orders they might have placed. (If they haven't placed an order, they should still appear in the list!).</p>
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
