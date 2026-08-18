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

export default function PowerBIDay6({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module6', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'calculate_magic' && (
        <Section key="calculate_magic" id="calculate_magic" eyebrow="The Magic Function" title="The CALCULATE Function">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>If there is one function you MUST learn in DAX, it is <code>CALCULATE</code>. It allows you to change the filter context of a calculation on the fly.</p>

            <div style={{ background: '#fffbeb', border: '1px solid #fde047', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#854d0e', margin: '0 0 1rem 0' }}>How it works</h4>
              <p style={{ color: '#713f12', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Normally, a measure like <code>SUM(Sales)</code> is filtered by whatever the user clicks on the dashboard (e.g., clicking the "East" region). <code>CALCULATE</code> lets you override those rules and force your own filters directly in the code!
              </p>
            </div>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2.5rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Superpower: Debugging Filter Context & Performance with AI
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                Filter context can get tricky! If a `CALCULATE` or `ALL` measure gives unexpected numbers, paste your formula and table schema into **ChatGPT or DAX Studio AI**. The AI will trace the exact filter evaluation step-by-step and show you why a filter was ignored or overwritten!
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: 0, color: '#0f172a' }}>Example: Force a filter</h4>
                  <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Calculate sales, but ONLY for the East region, no matter what other region the user clicks.</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#1e293b' }}>
                  <code style={{ color: '#38bdf8', fontSize: '1rem' }}>East Sales = CALCULATE(SUM(Sales[Amount]), Sales[Region] = "East")</code>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: 0, color: '#0f172a' }}>Example: Remove a filter</h4>
                  <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Calculate total sales across ALL regions, ignoring any slicers the user clicks (great for finding percentages).</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#1e293b' }}>
                  <code style={{ color: '#38bdf8', fontSize: '1rem' }}>Grand Total Sales = CALCULATE(SUM(Sales[Amount]), ALL(Sales))</code>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('time_intel')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'time_intel' && (
        <Section key="time_intel" id="time_intel" eyebrow="Dates & Periods" title="Basic Time Intelligence">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>Time Intelligence functions are always used <em>inside</em> a CALCULATE statement. They make comparing dates incredibly easy.</p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>SAMEPERIODLASTYEAR</h4>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                  <code>Sales Last Year = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date]))</code>
                </div>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>✓ <strong>Use Case:</strong> Compare today's sales with exactly one year ago to find Year-over-Year growth.</p>
              </div>

              <div style={{ padding: '1.5rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>TOTALYTD (Year-to-Date)</h4>
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                  <code style={{ display: 'block' }}>YTD Sales = TOTALYTD(SUM(Sales[Amount]), DateTable[Date])</code>
                </div>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>✓ <strong>Use Case:</strong> Track cumulative sales performance from January 1st to the current date.</p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('related')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'related' && (
        <Section key="related" id="related" eyebrow="Data Modeling" title="Working Across Tables (RELATED)">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>Sometimes, you are writing a Calculated Column in your Sales table, but you need a value (like the Product Category) that lives in the Product table.</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>The RELATED Function</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>As long as you have a relationship set up in your Data Model (Day 4), you can fetch data instantly without doing any VLOOKUPs!</p>
              
              <div style={{ background: '#e2e8f0', padding: '1rem', borderRadius: '6px' }}>
                <code style={{ color: '#166534', fontWeight: 'bold' }}>Category Name = RELATED(Products[Category])</code>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('variables')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'variables' && (
        <Section key="variables" id="variables" eyebrow="Best Practices" title="Using Variables (VAR)">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569' }}>When your formulas start getting long, you can use <code>VAR</code> and <code>RETURN</code> to break them down step-by-step. This makes them easier to read and faster to calculate!</p>

            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', overflowX: 'auto', marginBottom: '2rem' }}>
              <pre style={{ color: '#f8fafc', margin: 0, fontFamily: 'monospace', lineHeight: 1.6 }}>
<span style={{ color: '#cba6f7' }}>Year Over Year Growth %</span> = <br/>
<span style={{ color: '#f59e0b' }}>VAR</span> CurrentSales = SUM(Sales[Amount])<br/>
<span style={{ color: '#f59e0b' }}>VAR</span> PreviousSales = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(DateTable[Date]))<br/>
<br/>
<span style={{ color: '#10b981' }}>RETURN</span><br/>
&nbsp;&nbsp;DIVIDE(CurrentSales - PreviousSales, PreviousSales, <span style={{ color: '#94a3b8' }}>0</span>)
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 6 Assessment" title="Intermediate DAX Mastery">
          <div className="panel">
            <div style={{ background: '#eff6ff', padding: '2rem', borderRadius: '12px', border: '1px solid #e0e7ff', marginBottom: '2rem' }}>
              <h3 style={{ color: '#4338ca', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#8b5cf6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Practical Exercise</span>
                Business Scenarios
              </h3>
              <p style={{ color: '#4338ca', marginBottom: '1.5rem' }}>Using your dataset, write DAX measures for these common business requests:</p>
              
              <ul style={{ color: '#312e81', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
                <li>Create a <code>CALCULATE</code> measure to find Total Sales strictly for the "Technology" category.</li>
                <li>Create a measure to find Total Sales for <strong>Last Year</strong> using <code>SAMEPERIODLASTYEAR</code>.</li>
                <li>Write a measure using <code>VAR</code> to find the Growth Difference (Current Year Sales minus Last Year Sales).</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Day 6 Completed!')}>Submit & Complete Day 6 🎉</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
