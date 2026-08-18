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

export default function PowerBIDay4({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module4', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'intro_norm' && (
        <Section key="intro_norm" id="intro_norm" eyebrow="Introduction" title="Intro to Data Modeling & Normalization">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Why is Data Modeling Important?</h3>
            <p style={{ marginBottom: '1rem', color: '#475569' }}>Data modeling is the process of creating relationships between different data tables to analyze and visualize the data effectively in Power BI.</p>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              <li>✅ Reduces data redundancy</li>
              <li>✅ Improves performance and efficiency</li>
              <li>✅ Enables advanced analytics</li>
              <li>✅ Ensures accuracy in calculations</li>
            </ul>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2.5rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Superpower: Automated Relationship Detection & Schema Diagnostics
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                You don't have to manually link foreign keys! Power BI's **AI Autodetect Engine** automatically scans imported tables, matches column names and data types, and generates your 1-to-Many relationships instantly. You can also use **ChatGPT/Copilot** to debug circular relationship loops or many-to-many cardinality warnings!
              </p>
            </div>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Normalization</h3>
            <p style={{ marginBottom: '1rem', color: '#475569' }}>Normalization is the process of organizing data to reduce redundancy and improve data integrity. It involves breaking down large tables into smaller tables and establishing relationships between them.</p>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '1rem' }}>Levels of Normalization (Simplified)</h4>
              <ul style={{ color: '#475569', paddingLeft: '20px', lineHeight: 1.8 }}>
                <li><strong>1NF (First Normal Form):</strong> No repeating groups. Each column contains atomic values.</li>
                <li><strong>2NF (Second Normal Form):</strong> 1NF + Every non-key column depends on the whole primary key.</li>
                <li><strong>3NF (Third Normal Form):</strong> 2NF + No transitive dependency (non-key columns do not depend on other non-key columns).</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('relationships')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'relationships' && (
        <Section key="relationships" id="relationships" eyebrow="Connections" title="Relationships & Cardinality">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>What is a Relationship?</h3>
            <p style={{ marginBottom: '2rem', color: '#475569' }}>A relationship is a link between two tables based on a common field (primary and foreign keys).</p>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Cardinality</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>Cardinality defines the relationship between tables in a data model, specifically how many related records exist between two tables.</p>
            
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>1:*</span>
                  One-to-Many (Most Common)
                </span>
                <p style={{ margin: '0.5rem 0 0 0', color: '#475569', fontSize: '0.95rem' }}>A single record in one table relates to multiple records in another. <em>Example: One Customer → Many Sales</em>.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>1:1</span>
                  One-to-One (Rare)
                </span>
                <p style={{ margin: '0.5rem 0 0 0', color: '#475569', fontSize: '0.95rem' }}>One row in Table A corresponds to exactly one row in Table B. Used when two tables hold different details about the same entity. <em>Example: A student has exactly one ID card.</em></p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>*:*</span>
                  Many-to-Many (Avoid if possible)
                </span>
                <p style={{ margin: '0.5rem 0 0 0', color: '#475569', fontSize: '0.95rem' }}>Many rows in Table A relate to many rows in Table B. This requires a bridge/intermediate table to resolve properly. <em>Example: A product has multiple suppliers, and a supplier provides multiple products.</em></p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('create_rel')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'create_rel' && (
        <Section key="create_rel" id="create_rel" eyebrow="Model View" title="Ways to Create Relationships">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>In Power BI, you can create relationships between tables to connect data from multiple sources. Here are 5 ways to establish them:</p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>1. Automatic Detection</h4>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>Power BI attempts to auto-create relationships based on identical column names (e.g., "CustomerID") and compatible data types.</p>
              </div>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>2. Drag & Drop (Model View)</h4>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>Visually create relationships by dragging the foreign key column from one table and dropping it onto the matching primary key column in another table.</p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>3. Manage Relationships Panel</h4>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>Go to <strong>Modeling {'>'} Manage Relationships {'>'} New</strong> to explicitly define the tables, matching columns, cardinality, and filter direction. Gives you the most control.</p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>4. Using DAX Functions</h4>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>Use DAX like <code>RELATED()</code> or <code>LOOKUPVALUE()</code> to fetch data across tables when direct physical relationships aren't possible.</p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>5. Power Query Merge</h4>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>When relationships require transformation before linking, you can permanently merge tables using JOIN operations in the Power Query Editor before loading the data into the model.</p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('active_filter')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'active_filter' && (
        <Section key="active_filter" id="active_filter" eyebrow="Data Flow" title="Active Relationships & Filtering">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Active vs Inactive Relationships</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>There can only be <strong>one active relationship</strong> between any two tables at a time. However, you can create multiple inactive relationships.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc' }}>
                <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem', marginBottom: '1rem' }}>Active Relationship (Solid Line)</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>The default relationship used for filtering and calculations. For example, connecting Sales[OrderDate] to Date[Date].</p>
              </div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc' }}>
                <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem', marginBottom: '1rem' }}>Inactive Relationship (Dashed Line)</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>An alternative relationship (e.g. Sales[ShipDate] to Date[Date]). It is NOT used by default, but can be activated manually inside a measure using the DAX function <code>USERELATIONSHIP()</code>.</p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '2.5rem' }}
            >
              <img src="/images/active_vs_inactive.png" alt="USERELATIONSHIP DAX Function" style={{ maxWidth: '800px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
            </motion.div>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Cross-Filter Direction</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>Filter direction determines how filters propagate between connected tables. Look at the arrows on the relationship lines.</p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem 1.5rem', borderLeft: '4px solid #3b82f6', background: 'white', borderRadius: '8px' }}>
                <strong>Single Direction (→)</strong>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>The default and recommended setting. Filters flow from the "One" side (Dimension) to the "Many" side (Fact). E.g., Filtering by Year filters Sales.</p>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderLeft: '4px solid #ef4444', background: 'white', borderRadius: '8px' }}>
                <strong style={{ color: '#ef4444' }}>Both Directions (↔)</strong>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>Bi-directional filtering. Filters flow in both directions. Use with caution! It can create circular dependencies and slow down performance.</p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('schemas')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'schemas' && (
        <Section key="schemas" id="schemas" eyebrow="Data Modeling" title="Star & Snowflake Schema">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Star vs Snowflake Schema</h3>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '2.5rem' }}
            >
              <img src="/images/star_vs_snowflake.png" alt="Star vs Snowflake Schema Comparison" style={{ maxWidth: '500px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
            </motion.div>

            <p style={{ marginBottom: '2rem', color: '#475569' }}>When to use which? Use a <strong>Star Schema</strong> when performance matters (Power BI). Use a <strong>Snowflake Schema</strong> when storage efficiency is more important.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#fcf8e3', padding: '1.5rem', borderBottom: '1px solid #fae3a6' }}>
                  <h3 style={{ margin: 0, color: '#8a6d3b', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#eab308' }}>★</span> Star Schema (Recommended)
                  </h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>A single <strong>Fact table</strong> containing metrics (e.g. Sales) is directly surrounded by <strong>Dimension tables</strong>.</li>
                    <li>Dimension tables are <em>not normalized</em> (meaning they contain repeated data, like City and Country in the same table, to avoid extra joins).</li>
                    <li>Queries run much faster because fewer joins are needed.</li>
                    <li>Easier to maintain.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#eff6ff', padding: '1.5rem', borderBottom: '1px solid #bfdbfe' }}>
                  <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#3b82f6' }}>❄</span> Snowflake Schema
                  </h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>An extension of the Star Schema where Dimension tables are <strong>normalized</strong> (split into smaller sub-dimension tables).</li>
                    <li>Example: Fact_Sales → Dim_Product → Dim_Category.</li>
                    <li>Reduces data redundancy (saves storage).</li>
                    <li>Results in complex queries due to multiple joins and slower performance in Power BI.</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 4 Assessment" title="Mini Project & Assignment">
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Mini Project</span>
                Schema Design
              </h3>
              <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}><strong>Scenario:</strong> A client provides you with one massive Excel sheet containing all their sales, product info, customer addresses, and dates mashed together.</p>
              <p style={{ color: '#475569', marginBottom: '1rem' }}><strong>Task:</strong> Explain why loading this directly into Power BI is a bad idea (think Normalization), and how you would split it into a Star Schema.</p>
              <ul style={{ color: '#475569', paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>1. What would the Fact table contain?</li>
                <li>2. Name at least 3 Dimension tables you would create.</li>
              </ul>
            </div>

            <div style={{ background: '#eff6ff', padding: '2rem', borderRadius: '12px', border: '1px solid #e0e7ff', marginTop: '2rem' }}>
              <h3 style={{ color: '#4338ca', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#8b5cf6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Practical Exercise</span>
                Data Modeling & Relationships
              </h3>
              <p style={{ color: '#4338ca', marginBottom: '0.5rem' }}><strong>Scenario:</strong> You are a Data Analyst at an E-commerce company. Your manager provides you with raw sales data (Orders, Customers, Products, Date) and asks you to build a data model.</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: '#312e81', marginBottom: '0.5rem' }}>Task 1: Import and Create Relationships</h4>
                <ul style={{ color: '#4f46e5', paddingLeft: '20px', marginBottom: '1.5rem' }}>
                  <li>Load the four tables into Power BI.</li>
                  <li>In Model View, create <strong>One-to-Many</strong> relationships from Customers, Products, and Date tables to the Orders fact table.</li>
                  <li>Set the cross-filter direction to <strong>Single</strong>.</li>
                </ul>

                <h4 style={{ color: '#312e81', marginBottom: '0.5rem' }}>Task 2: Understand Cardinality & Filtering</h4>
                <ul style={{ color: '#4f46e5', paddingLeft: '20px', marginBottom: '1.5rem' }}>
                  <li>Filter data based on <strong>Customer Region</strong> and verify it filters the Orders table correctly.</li>
                </ul>

                <h4 style={{ color: '#312e81', marginBottom: '0.5rem' }}>Task 3: Star vs. Snowflake Schema Comparison</h4>
                <ul style={{ color: '#4f46e5', paddingLeft: '20px', marginBottom: '1.5rem' }}>
                  <li>Modify the Customers table by splitting "Region" into a new <strong>Regions Table</strong> (making it a Snowflake Schema).</li>
                  <li>Check how the new model affects performance, then revert back to the Star Schema.</li>
                </ul>

                <h4 style={{ color: '#312e81', marginBottom: '0.5rem' }}>Task 4: Optimize & Use DAX</h4>
                <ul style={{ color: '#4f46e5', paddingLeft: '20px', marginBottom: '1.5rem' }}>
                  <li>Remove unnecessary columns and convert text-based keys to Integers.</li>
                  <li>Create an inactive relationship between <code>DateTable[DateID]</code> and <code>Orders[ShipDate]</code>.</li>
                  <li>Use the <code>USERELATIONSHIP()</code> DAX function to calculate Total Sales based on Ship Date.</li>
                </ul>
              </div>
              
              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #c4b5fd' }}>
                <textarea placeholder="Describe your experience creating the relationships and using the USERELATIONSHIP function..." style={{ width: '100%', minHeight: '100px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', resize: 'vertical' }}></textarea>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Day 4 Completed!')}>Submit & Complete Day 4 🎉</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
