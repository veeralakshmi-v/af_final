import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Columns, Target } from 'lucide-react';

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

export default function PowerBIDay5({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module5', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'intro_syntax' && (
        <Section key="intro_syntax" id="intro_syntax" eyebrow="Introduction" title="DAX Basics & Syntax">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>What is DAX?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569' }}><strong>DAX (Data Analysis Expressions)</strong> is the formula language used in Power BI. Think of it like Excel formulas, but designed specifically to work with large data tables instead of individual cells.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
              <p style={{ color: '#475569', margin: 0, lineHeight: 1.6 }}>While you can drag and drop fields to make basic charts, DAX is what gives you the power to create custom calculations, calculate profit margins, and build dynamic dashboards that update based on what the user clicks.</p>
            </div>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2.5rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Superpower: Generating & Explaining DAX with ChatGPT & Copilot
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                Never get stuck on syntax! You can ask ChatGPT or Microsoft Copilot: *"Write a DAX measure to calculate Month-over-Month sales growth percentage"*. The AI generates clean DAX code instantly, complete with comments explaining how each function works!
              </p>
            </div>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Syntax & Basic Rules</h3>
            
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem 1.5rem', background: '#eff6ff', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <code style={{ fontSize: '1.1rem', color: '#1d4ed8', fontWeight: 'bold' }}>=</code>
                <p style={{ margin: '0.5rem 0 0 0', color: '#334155' }}>Just like Excel, every DAX formula starts with an equal sign.</p>
              </div>
              <div style={{ padding: '1rem 1.5rem', background: '#eff6ff', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <code style={{ fontSize: '1.1rem', color: '#1d4ed8', fontWeight: 'bold' }}>'Table Name'[Column Name]</code>
                <p style={{ margin: '0.5rem 0 0 0', color: '#334155' }}>Tables are wrapped in single quotes (if they have spaces). Columns are ALWAYS wrapped in <strong>square brackets</strong>.</p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('calc_vs_measures')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'calc_vs_measures' && (
        <Section key="calc_vs_measures" id="calc_vs_measures" eyebrow="Core Concepts" title="Calculated Columns vs Measures">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>This is the most important concept in all of Power BI. You can write DAX in two different places: as a Column, or as a Measure.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Columns size={20} color="#3b82f6" /> Calculated Columns
                  </h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ color: '#475569', marginBottom: '1rem' }}><strong>Row-by-Row Calculation</strong></p>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0, marginBottom: '1rem' }}>
                    <li>Evaluated for every single row in your dataset.</li>
                    <li>Increases your file size.</li>
                    <li><strong>Best use:</strong> When you need to slice, filter, or group by the result (e.g. creating a "High/Low" sales category).</li>
                  </ul>
                  <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                    <code style={{ color: '#a78bfa' }}>Profit = Sales[Price] - Sales[Cost]</code>
                  </div>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target size={20} color="#10b981" /> Measures
                  </h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ color: '#475569', marginBottom: '1rem' }}><strong>Aggregated Calculation</strong></p>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0, marginBottom: '1rem' }}>
                    <li>Calculated dynamically on the fly based on filters.</li>
                    <li>Does NOT consume memory. Highly optimized.</li>
                    <li><strong>Best use:</strong> For all values you want to display in a chart (Total Sales, Averages, Counts).</li>
                  </ul>
                  <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                    <code style={{ color: '#34d399' }}>Total Sales = SUM(Sales[Amount])</code>
                  </div>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('aggregations')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'aggregations' && (
        <Section key="aggregations" id="aggregations" eyebrow="Math" title="Basic Aggregations">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>These are the bread and butter of Power BI. You will use these functions in almost every dashboard you build.</p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>SUM()</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Adds up all the values in a column.</p>
                <code style={{ background: '#eff6ff', padding: '8px', borderRadius: '4px', color: '#1d4ed8', display: 'block' }}>Total Revenue = SUM(Sales[Revenue])</code>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>AVERAGE()</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Finds the arithmetic mean of a column.</p>
                <code style={{ background: '#eff6ff', padding: '8px', borderRadius: '4px', color: '#1d4ed8', display: 'block' }}>Avg Order Value = AVERAGE(Sales[OrderAmount])</code>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>COUNT() vs DISTINCTCOUNT()</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem', fontSize: '0.95rem' }}><code>COUNT</code> counts every row. <code>DISTINCTCOUNT</code> only counts unique values.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <code style={{ background: '#eff6ff', padding: '8px', borderRadius: '4px', color: '#1d4ed8' }}>Total Transactions = COUNT(Sales[TransactionID])</code>
                  <code style={{ background: '#f5f3ff', padding: '8px', borderRadius: '4px', color: '#6d28d9' }}>Unique Customers = DISTINCTCOUNT(Sales[CustomerID])</code>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('logical_functions')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'logical_functions' && (
        <Section key="logical_functions" id="logical_functions" eyebrow="Logic" title="Logical Functions">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>Logical functions help you categorize data or create conditions.</p>

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '2.5rem' }}>
              
              <div>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>IF Statement</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>Returns one value if a condition is true, and another if false.</p>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '6px' }}>
                  <code style={{ color: '#cbd5e1' }}>Sales Bucket = IF(Sales[Amount] &gt; 1000, "High Value", "Low Value")</code>
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>SWITCH Statement</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>When you have more than two conditions, an IF statement gets messy. SWITCH is much cleaner!</p>
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '6px' }}>
                  <pre style={{ color: '#cbd5e1', margin: 0, fontFamily: 'monospace' }}>
Region Name = SWITCH(Sales[RegionID], <br/>
&nbsp;&nbsp;1, "North",<br/>
&nbsp;&nbsp;2, "South",<br/>
&nbsp;&nbsp;3, "East",<br/>
&nbsp;&nbsp;"West" <span style={{ color: '#64748b' }}>// Default value</span><br/>
)
                  </pre>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 5 Assessment" title="DAX Basics Exercise">
          <div className="panel">
            
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Quiz</span>
                Column or Measure?
              </h3>
              <p style={{ color: '#475569', marginBottom: '1.5rem' }}>For each scenario, decide whether you should write a Calculated Column or a Measure.</p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong>1. You want to extract the "Year" from an Order Date column so you can use it in a slicer.</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '200px' }}>
                      <option>Select...</option>
                      <option>Calculated Column</option>
                      <option>Measure</option>
                    </select>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong>2. You want to calculate "Total Profit" to display on a bar chart.</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '200px' }}>
                      <option>Select...</option>
                      <option>Calculated Column</option>
                      <option>Measure</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#eff6ff', padding: '2rem', borderRadius: '12px', border: '1px solid #e0e7ff', marginTop: '2rem' }}>
              <h3 style={{ color: '#4338ca', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#8b5cf6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Practical Exercise</span>
                Write Your First DAX
              </h3>
              <p style={{ color: '#4338ca', marginBottom: '1.5rem' }}>Open Power BI and use your sample dataset to create the following:</p>
              
              <ul style={{ color: '#312e81', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
                <li>Create a <strong>Measure</strong> using <code>SUM()</code> to find Total Sales Amount.</li>
                <li>Create a <strong>Measure</strong> using <code>DISTINCTCOUNT()</code> to find the number of Unique Customers.</li>
                <li>Create a <strong>Calculated Column</strong> using <code>IF()</code> that labels orders above $1000 as "High Value" and the rest as "Standard".</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Day 5 Completed!')}>Submit & Complete Day 5 🎉</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
