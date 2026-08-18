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

export default function PowerBIDay3({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module3', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'intro_pq' && (
        <Section key="intro_pq" id="intro_pq" eyebrow="Introduction" title="Power Query Editor">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>Power Query Editor in Power BI is the built-in tool used for <strong>data extraction, transformation, and loading (ETL)</strong>. It helps clean and shape data before using it for analysis and visualization.</p>
            
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Accessing Power Query</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569', marginBottom: '2rem' }}>
              <li><strong>In Power BI Desktop:</strong> Click <em>Transform Data</em> on the Home ribbon.</li>
              <li><strong>In Excel:</strong> Go to <em>Data → Get & Transform → Power Query Editor</em>.</li>
            </ul>

            <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #22c55e', marginBottom: '2rem' }}>
              <h4 style={{ color: '#166534', marginBottom: '0.5rem' }}>The M Language</h4>
              <p style={{ margin: 0, color: '#15803d', fontSize: '0.95rem' }}>Behind the scenes (internally), Power Query uses a functional programming language called <strong>M</strong> (Power Query Formula Language). While you can do most transformations using the visual interface, you can access the raw M code via the <em>Advanced Editor</em>.</p>
            </div>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2.5rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Superpowers in Power Query: "Column From Examples" & AI Insights
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>
                You never have to write complex M-code by hand! 
                <br/>• **Column From Examples:** Just type 1 or 2 examples of the desired output (e.g., typing "Smith, J." from "John Smith"), and Power Query's AI pattern recognition engine automatically writes the extraction formula!
                <br/>• **AI Insights:** Click the *AI Insights* button in the ribbon to run automated **Sentiment Analysis, Key Phrase Extraction, and Language Detection** directly on your text columns!
              </p>
            </div>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>The Power Query Interface</h3>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              <img src="/images/powerbi_interface.png" alt="Power Query Interface" style={{ maxWidth: '500px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>1. Ribbon</strong><br/>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Contains transformation options like remove duplicates, split columns, etc.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>2. Queries Pane (Left)</strong><br/>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Lists all imported datasets (queries).</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>3. Data Preview (Center)</strong><br/>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Shows a live preview of the dataset as you apply changes.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>4. Applied Steps (Right)</strong><br/>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Records every transformation applied. You can click the "X" to undo a step.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>5. Formula Bar</strong><br/>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Displays the M-code generated for the currently selected step.</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('import_data')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'import_data' && (
        <Section key="import_data" id="import_data" eyebrow="Step 1" title="Importing Data">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Supported Data Sources</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>Power Query can import data from almost anywhere:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569', marginBottom: '2rem' }}>
              <li><strong>Flat Files:</strong> Excel, CSV, XML, JSON</li>
              <li><strong>Databases:</strong> SQL Server, PostgreSQL, MySQL, Oracle</li>
              <li><strong>Cloud & Web:</strong> SharePoint, Web APIs, Azure, Google Analytics</li>
            </ul>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Example: Importing an Excel File</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: 2, color: '#334155' }}>
                <li>Click <strong>Home → Get Data → Excel Workbook</strong>.</li>
                <li>Browse for your file and select the specific sheet(s) in the Navigator window.</li>
                <li>Click <strong>Transform Data</strong> (instead of Load) to open Power Query Editor.</li>
              </ol>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('transformations')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'transformations' && (
        <Section key="transformations" id="transformations" eyebrow="Step 2" title="Data Transformation Techniques">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>Once your data is in Power Query, it often needs cleaning. Here are the core transformation techniques.</p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '2.5rem' }}
            >
              <img src="/images/data_cleaning_diagram.png" alt="Data Cleaning" style={{ maxWidth: '400px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
            </motion.div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#3b82f6', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '0.9rem' }}>1</span>
                Column & Row Operations
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Remove Columns:</strong> Select column → Click Remove Columns.</li>
                <li><strong>Rename Columns:</strong> Double-click the column header and edit.</li>
                <li><strong>Filter Rows:</strong> Click the dropdown arrow on a column header (like Excel) and select values to keep.</li>
                <li><strong style={{ color: '#ef4444' }}>Remove Duplicates:</strong> Select column(s) → Right-click → Remove Duplicates.</li>
                <li><strong>Replace Values:</strong> Right-click column → Replace Values (e.g., replacing "Null" with "0").</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#10b981', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '0.9rem' }}>2</span>
                Structuring Data
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Change Data Type:</strong> Click the icon next to the column name to change between Text, Date, Number, etc.</li>
                <li><strong style={{ color: '#ef4444' }}>Split Column:</strong> Split data into multiple columns using a delimiter (e.g., splitting "John Doe" by a space).</li>
                <li><strong style={{ color: '#ef4444' }}>Pivot & Unpivot Columns:</strong> Unpivoting takes data stored across multiple columns (e.g., Year 2021, Year 2022) and flattens it into rows (Attribute/Value pairs). Essential for making data "tall" rather than "wide".</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('custom_columns')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'custom_columns' && (
        <Section key="custom_columns" id="custom_columns" eyebrow="Step 3" title="Custom & Conditional Columns">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>You often need to derive new information from existing data using calculated columns.</p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Custom Columns</h3>
            <p style={{ marginBottom: '1rem', color: '#475569' }}>Create new fields using custom M-code formulas or basic arithmetic.</p>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginBottom: '2.5rem' }}>
              <p style={{ margin: '0 0 1rem 0' }}><strong>Steps:</strong></p>
              <ol style={{ paddingLeft: '20px', margin: 0, color: '#334155' }}>
                <li>Click <em>Add Column → Custom Column</em>.</li>
                <li>Give it a name (e.g., "Total Price").</li>
                <li>Enter the formula: <code>= [Quantity] * [Unit Price]</code></li>
              </ol>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Conditional Columns</h3>
            <p style={{ marginBottom: '1rem', color: '#475569' }}>Similar to writing nested IF-ELSE statements in Excel, but with a simple UI!</p>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '2rem' }}>
              <p style={{ margin: '0 0 1rem 0' }}><strong>Steps:</strong></p>
              <ol style={{ paddingLeft: '20px', margin: 0, color: '#334155' }}>
                <li>Click <em>Add Column → Conditional Column</em>.</li>
                <li>Use the dropdowns to set conditions (e.g., If [Sales] &gt; 10000, Then "High").</li>
                <li>Add 'Else If' clauses for additional tiers (e.g., Else If [Sales] &gt; 5000, Then "Medium").</li>
                <li>Set the final 'Else' fallback value (e.g., Else "Low").</li>
              </ol>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('combine_data')}>Continue (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'combine_data' && (
        <Section key="combine_data" id="combine_data" eyebrow="Step 4" title="Combining Data from Multiple Sources">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>In the real world, your data will be spread across multiple tables or files. Power Query allows you to bring them together using Merges and Appends.</p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '2.5rem' }}
            >
              <img src="/images/merge_append_diagram.png" alt="Merge and Append" style={{ maxWidth: '400px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f1f5f9', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>1. Merge Queries</h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '1rem' }}>Like a SQL JOIN.</p>
                  <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>Used to combine columns from different tables based on a common matching column (e.g., matching a Sales table with a Customers table using CustomerID).</p>
                  <p style={{ color: '#334155', fontWeight: 600, margin: '0 0 0.5rem 0' }}>Steps:</p>
                  <ol style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <li>Click <em>Home → Merge Queries</em>.</li>
                    <li>Select the two tables.</li>
                    <li>Click on the common column in both tables to map them.</li>
                    <li>Choose Join Type (Inner, Left Outer, Full Outer, etc.).</li>
                  </ol>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f1f5f9', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>2. Append Queries</h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontWeight: 'bold', color: '#3b82f6', marginBottom: '1rem' }}>Like a SQL UNION.</p>
                  <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>Used to stack datasets vertically on top of each other. Best used when you have multiple files with the exact same structure (e.g., Sales 2021 and Sales 2022).</p>
                  <p style={{ color: '#334155', fontWeight: 600, margin: '0 0 0.5rem 0' }}>Steps:</p>
                  <ol style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <li>Click <em>Home → Append Queries</em>.</li>
                    <li>Select whether to append 2 tables, or 3+ tables.</li>
                    <li>Select the datasets.</li>
                    <li>Click OK to stack them.</li>
                  </ol>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 3 Assessment" title="Mini Project & Assignment">
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Mini Project</span>
                The Great Merge
              </h3>
              <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}><strong>Scenario:</strong> You have an Excel file of "Transactions" containing <code>TransactionID</code>, <code>ProductID</code>, and <code>Quantity</code>. You have a separate SQL Database table of "Products" containing <code>ProductID</code>, <code>ProductName</code>, and <code>UnitPrice</code>.</p>
              <p style={{ color: '#475569', marginBottom: '1rem' }}><strong>Task:</strong> Describe the steps in Power Query to combine these and calculate total revenue.</p>
              <ul style={{ color: '#475569', paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>1. Which operation should you use to bring the Product prices into the Transactions table? (Merge or Append?)</li>
                <li>2. What column will you use to join them?</li>
                <li>3. How will you calculate the <code>Total Revenue</code> using a Custom Column? Write the exact formula.</li>
              </ul>
            </div>

            <div style={{ background: '#faf5ff', padding: '2rem', borderRadius: '12px', border: '1px solid #e9d5ff' }}>
              <h3 style={{ color: '#6b21a8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#a855f7', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Assignment</span>
                Power Query Puzzle
              </h3>
              <p style={{ color: '#6b21a8', marginBottom: '1.5rem' }}>Match the messy data problem to the correct Power Query transformation technique.</p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #d8b4fe' }}>
                  <strong>1. A column contains "John Smith" and you need "First Name" and "Last Name".</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }}>
                      <option>Select Transformation...</option>
                      <option>Split Column</option>
                      <option>Change Data Type</option>
                      <option>Remove Duplicates</option>
                    </select>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #d8b4fe' }}>
                  <strong>2. Your sales table has multiple identical rows because of an export glitch.</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }}>
                      <option>Select Transformation...</option>
                      <option>Conditional Column</option>
                      <option>Remove Duplicates</option>
                      <option>Unpivot Columns</option>
                    </select>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #d8b4fe' }}>
                  <strong>3. You need a new column that says "Pass" if Score &gt; 50, otherwise "Fail".</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }}>
                      <option>Select Transformation...</option>
                      <option>Pivot Columns</option>
                      <option>Conditional Column</option>
                      <option>Merge Queries</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #94a3b8', marginTop: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#475569', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Practical Exercise</span>
                Dataset Integration
              </h3>
              <p style={{ color: '#334155', marginBottom: '0.5rem' }}><strong>Dataset:</strong> Employee Records</p>
              <p style={{ color: '#334155', marginBottom: '1.5rem' }}><strong>Task:</strong> Search for an "HR Employee Records" dataset on <strong>Kaggle.com</strong>. Download the file and import it. Use Power Query to handle any null values, split the "Full Name" column into First/Last, and merge it with a department mapping table.</p>
              
              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <textarea placeholder="Describe the challenges you faced while handling null values and merging the datasets..." style={{ width: '100%', minHeight: '100px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', resize: 'vertical' }}></textarea>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Day 3 Completed!')}>Submit & Complete Day 3 🎉</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
