import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Terminal, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import capstoneImg from '../../assets/statistics_capstone_workflow.png';

/* ─── Helpers ─── */
const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#db2777', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Formula = ({ children, color = '#7c3aed', bg = '#f5f3ff' }) => (
  <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: '8px', padding: '0.65rem 1rem', fontFamily: 'monospace', fontSize: '0.88rem', color, margin: '0.4rem 0', fontWeight: 600 }}>
    {children}
  </div>
);

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.85rem', overflowX: 'auto' }}>
      {lines.map((line, li) => {
        const rx = /(#[^\n]*)|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?:\b(import|from|as|return|if|else|for|while|in|def|class|and|or|not|is|None|True|False)\b)|(?:\b(print|len|sum|range|sorted|min|max|round|abs|int|float|str|list|dict|random|append|math|sqrt|zip|enumerate)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
        let m; let k = 0; const toks = []; rx.lastIndex = 0; let last = 0;
        while ((m = rx.exec(line)) !== null) {
          if (m.index > last) toks.push(<span key={k++} style={{ color: '#e1e4e8' }}>{line.slice(last, m.index)}</span>);
          const [tok, cmt, str, kw, bi, num] = m;
          let color = '#e1e4e8'; let fw = 'normal';
          if (cmt) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (kw) { color = '#ff7b72'; fw = 'bold'; }
          else if (bi) color = '#ffb454';
          else if (num) color = '#79c0ff';
          toks.push(<span key={k++} style={{ color, fontWeight: fw }}>{tok}</span>);
          last = m.index + tok.length;
        }
        if (last < line.length) toks.push(<span key={k++} style={{ color: '#e1e4e8' }}>{line.slice(last)}</span>);
        return <div key={li} style={{ whiteSpace: 'pre' }}>{toks.length ? toks : line}</div>;
      })}
    </div>
  );
};

const ZoomableImage = ({ src, alt }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <img src={src} alt={alt} onClick={() => setOpen(true)}
          style={{ maxWidth: '280px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = '#db2777'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#cbd5e1'; }} />
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>🔍 Click to zoom</span>
      </div>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.88)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, cursor: 'zoom-out', padding: '1.5rem' }}>
          <div style={{ position: 'relative', maxWidth: '90%' }}>
            <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '2px solid #334155' }} />
            <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Click anywhere to close</span>
          </div>
        </div>
      )}
    </>
  );
};

const PythonCodeAccordion = ({ title, code }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: '#0f172a', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e293b', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
      <div onClick={() => setOpen(v => !v)} style={{ padding: '0.8rem 1.2rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b' }}>
        <span style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> {title}</span>
        <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{open ? '▲ Hide Code' : '▼ View Python Starter Code'}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1.2rem', background: '#0f172a' }}>
              <SyntaxHighlighter code={code} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Raw Capstone Dataset ─── */
const rawStoreData = [
  { id: 1,  location: 'Urban',    revenue: 45, footfall: 1200, category: 'Electronics', csat: 8.2, outlier: false },
  { id: 2,  location: 'Urban',    revenue: 52, footfall: 1400, category: 'Electronics', csat: 8.8, outlier: false },
  { id: 3,  location: 'Suburban', revenue: 28, footfall: 800,  category: 'Fashion',     csat: 7.5, outlier: false },
  { id: 4,  location: 'Suburban', revenue: 32, footfall: 950,  category: 'Fashion',     csat: 7.9, outlier: false },
  { id: 5,  location: 'Urban',    revenue: 48, footfall: 1300, category: 'Home',        csat: 8.1, outlier: false },
  { id: 6,  location: 'Suburban', revenue: 30, footfall: 850,  category: 'Electronics', csat: 7.6, outlier: false },
  { id: 7,  location: 'Urban',    revenue: 95, footfall: 2800, category: 'Electronics', csat: 9.1, outlier: true  }, // outlier store
  { id: 8,  location: 'Urban',    revenue: 42, footfall: 1100, category: 'Fashion',     csat: 8.0, outlier: false },
  { id: 9,  location: 'Suburban', revenue: 25, footfall: 750,  category: 'Home',        csat: 7.2, outlier: false },
  { id: 10, location: 'Urban',    revenue: 50, footfall: 1350, category: 'Fashion',     csat: 8.5, outlier: false },
  { id: 11, location: 'Suburban', revenue: 35, footfall: 1000, category: 'Electronics', csat: 8.0, outlier: false },
  { id: 12, location: 'Urban',    revenue: 47, footfall: 1250, category: 'Home',        csat: 8.3, outlier: false },
  { id: 13, location: 'Suburban', revenue: 29, footfall: 820,  category: 'Fashion',     csat: 7.4, outlier: false },
  { id: 14, location: 'Suburban', revenue: 5,  footfall: 150,  category: 'Home',        csat: 5.0, outlier: true  }, // outlier store
  { id: 15, location: 'Urban',    revenue: 44, footfall: 1180, category: 'Electronics', csat: 8.1, outlier: false },
];

/* ─── Interactive Capstone Dashboard ─── */
const CapstoneDashboard = () => {
  const [cleanOutliers, setCleanOutliers] = useState(false);
  const [alpha, setAlpha] = useState(0.05);

  const dataset = useMemo(() => {
    return cleanOutliers ? rawStoreData.filter(d => !d.outlier) : rawStoreData;
  }, [cleanOutliers]);

  // Calculations
  const stats = useMemo(() => {
    const revs = dataset.map(d => d.revenue);
    const sorted = [...revs].sort((a, b) => a - b);
    const n = sorted.length;

    const mean = revs.reduce((s, x) => s + x, 0) / n;
    const variance = revs.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
    const sd = Math.sqrt(variance);

    const min = sorted[0];
    const max = sorted[n - 1];
    const q1 = sorted[Math.floor(n * 0.25)];
    const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    const q3 = sorted[Math.floor(n * 0.75)];

    // Correlation between footfall & revenue
    const footfalls = dataset.map(d => d.footfall);
    const meanFoot = footfalls.reduce((s, x) => s + x, 0) / n;
    let cov = 0;
    let varFoot = 0;
    for (let i = 0; i < n; i++) {
      cov += (revs[i] - mean) * (footfalls[i] - meanFoot);
      varFoot += (footfalls[i] - meanFoot) ** 2;
    }
    const r = cov / Math.sqrt(variance * (n - 1) * varFoot);

    return { mean, sd, min, q1, median, q3, max, r, n };
  }, [dataset]);

  // Hypothesis Test: Urban vs Suburban mean revenue
  const testResults = useMemo(() => {
    const urbanRevs = dataset.filter(d => d.location === 'Urban').map(d => d.revenue);
    const subRevs = dataset.filter(d => d.location === 'Suburban').map(d => d.revenue);

    const n1 = urbanRevs.length;
    const n2 = subRevs.length;

    const m1 = urbanRevs.reduce((s, x) => s + x, 0) / n1;
    const m2 = subRevs.reduce((s, x) => s + x, 0) / n2;

    const v1 = urbanRevs.reduce((s, x) => s + (x - m1) ** 2, 0) / (n1 - 1);
    const v2 = subRevs.reduce((s, x) => s + (x - m2) ** 2, 0) / (n2 - 1);

    const se = Math.sqrt(v1 / n1 + v2 / n2);
    const t = (m1 - m2) / se;
    const df = n1 + n2 - 2;

    // Approximate p-value
    const x = df / (df + t * t);
    const pVal = 2 * (0.5 * (x ** (df / 2))); // Rough approximation for 2-tail
    
    return { m1, m2, n1, n2, t, df, pVal, reject: pVal < alpha };
  }, [dataset, alpha]);

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.8rem', marginTop: '1.5rem' }}>
      <h4 style={{ color: '#0f172a', margin: '0 0 0.4rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BarChart2 color="#db2777" /> Capstone Interactive Data Portal
      </h4>
      <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '0 0 1.5rem 0' }}>Explore the Retail Store performance dataset. Toggle outliers to watch distribution statistics update instantly.</p>

      {/* Toggles */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: '#fff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
          <input type="checkbox" checked={cleanOutliers} onChange={e => setCleanOutliers(e.target.checked)} style={{ accentColor: '#db2777', width: '16px', height: '16px' }} />
          🧼 Clean Dataset (Remove Outliers using IQR fences)
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Significance Level (α):</span>
          <select value={alpha} onChange={e => setAlpha(Number(e.target.value))}
            style={{ padding: '3px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', outline: 'none' }}>
            <option value="0.10">0.10 (90%)</option>
            <option value="0.05">0.05 (95%)</option>
            <option value="0.01">0.01 (99%)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
        {/* Descriptive Stats & 5 Number Summary */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem' }}>
          <h5 style={{ color: '#db2777', margin: '0 0 0.8rem 0', fontWeight: 800 }}>📊 Summary Statistics</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.83rem', color: '#475569' }}>
            <div>Mean Revenue: <strong>₹{stats.mean.toFixed(2)} Lakhs</strong></div>
            <div>Std Deviation: <strong>₹{stats.sd.toFixed(2)} Lakhs</strong></div>
            <div>Correlation (r): <strong style={{ color: '#16a34a' }}>{stats.r.toFixed(3)}</strong></div>
            <div>Sample Size (n): <strong>{stats.n} Stores</strong></div>
          </div>

          <h5 style={{ color: '#7c3aed', margin: '1rem 0 0.6rem 0', fontWeight: 800 }}>📏 Five Number Summary</h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', textAlign: 'center' }}>
            {[['Min', stats.min], ['Q1', stats.q1], ['Median', stats.median], ['Q3', stats.q3], ['Max', stats.max]].map(([lbl, val]) => (
              <div key={lbl} style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '6px 2px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.65rem', color: '#6d28d9', fontWeight: 700 }}>{lbl}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4c1d95', fontFamily: 'monospace' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hypothesis Testing Results */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem' }}>
          <h5 style={{ color: '#1d4ed8', margin: '0 0 0.8rem 0', fontWeight: 800 }}>🧪 Live Hypothesis Test (Urban vs Suburban)</h5>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0 0 0.8rem 0' }}>H₀: Urban Mean Rev = Suburban Mean Rev<br />H₁: Urban Mean Rev ≠ Suburban Mean Rev</p>
          <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Urban Mean Rev: <strong>₹{testResults.m1.toFixed(2)} Lakhs</strong> (n={testResults.n1})</div>
            <div>Suburban Mean Rev: <strong>₹{testResults.m2.toFixed(2)} Lakhs</strong> (n={testResults.n2})</div>
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px dashed #cbd5e1', paddingTop: '6px', marginTop: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              <div>t-stat: <strong>{testResults.t.toFixed(3)}</strong></div>
              <div>p-value: <strong>{testResults.pVal.toFixed(4)}</strong></div>
            </div>
            <div style={{ marginTop: '0.5rem', padding: '8px', borderRadius: '8px', background: testResults.reject ? '#f0fdf4' : '#fef2f2', border: `1px solid ${testResults.reject ? '#bbf7d0' : '#fecaca'}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.1rem' }}>{testResults.reject ? '✅' : '❌'}</span>
              <div>
                <div style={{ fontWeight: 800, color: testResults.reject ? '#15803d' : '#b91c1c', fontSize: '0.8rem' }}>
                  {testResults.reject ? 'Reject Null Hypothesis' : 'Fail to Reject Null'}
                </div>
                <div style={{ fontSize: '0.73rem', color: '#64748b' }}>
                  {testResults.reject ? `Difference is statistically significant (p < ${alpha})` : `Difference is not statistically significant (p ≥ ${alpha})`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Preview */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: '#0f172a', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>Dataset Table</span>
          <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Showing {dataset.length} Stores</span>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: '180px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['ID', 'Location', 'Category', 'Revenue (Lakhs)', 'Footfall', 'CSAT', 'Status'].map(h => <th key={h} style={{ padding: '6px 12px', fontWeight: 700, color: '#334155' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {dataset.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9', background: d.outlier ? '#fff1f2' : 'none' }}>
                  <td style={{ padding: '5px 12px', fontWeight: 600 }}>{d.id}</td>
                  <td style={{ padding: '5px 12px' }}>{d.location}</td>
                  <td style={{ padding: '5px 12px' }}>{d.category}</td>
                  <td style={{ padding: '5px 12px', fontFamily: 'monospace', fontWeight: 700 }}>₹{d.revenue}L</td>
                  <td style={{ padding: '5px 12px', fontFamily: 'monospace' }}>{d.footfall}</td>
                  <td style={{ padding: '5px 12px', fontFamily: 'monospace' }}>{d.csat}</td>
                  <td style={{ padding: '5px 12px' }}>
                    {d.outlier ? <span style={{ color: '#e11d48', fontWeight: 700, fontSize: '0.7rem' }}>⚠️ Outlier</span> : <span style={{ color: '#16a34a', fontSize: '0.7rem' }}>✓ Normal</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
export default function StatsDay17({ activeTab, onNavigate, openAITutor }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence mode="wait">

      {/* ─── OVERVIEW ─── */}
      {activeTab === 'overview' && (
        <Section eyebrow="Day 17 • Capstone Project" title="Statistics Capstone Project Overview">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Welcome to the final phase of your Statistics course! The Capstone Project is designed to test your ability to apply all the techniques you have learned — from data cleaning and EDA to advanced hypothesis testing and drawing actionable business insights — on a real-world dataset.
            </p>

            <ZoomableImage src={capstoneImg} alt="Statistics Capstone Project Workflow Roadmap" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px' }}>
                <h4 style={{ color: '#1d4ed8', margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800 }}>🎯 Primary Objective</h4>
                <p style={{ color: '#3b82f6', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                  Analyse the performance of 15 retail stores to determine the factors driving monthly revenue. Formulate statistical hypotheses, run clean tests, build descriptive models, and draw robust conclusions.
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px' }}>
                <h4 style={{ color: '#7c3aed', margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800 }}>📈 Key Deliverables</h4>
                <ul style={{ paddingLeft: '14px', margin: 0, color: '#6d28d9', fontSize: '0.8rem', lineHeight: 1.7 }}>
                  <li>Interactive Dashboard (Online exploration)</li>
                  <li>Formatted Jupyter Notebook / Python Script</li>
                  <li>Written Executive Summary (Business Report)</li>
                  <li>Hypothesis Testing Decisions & Proofs</li>
                </ul>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => onNavigate('stats_day17', 'requirements')}>View Requirements</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the best way to structure an executive summary for a data analytics capstone project?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── REQUIREMENTS ─── */}
      {activeTab === 'requirements' && (
        <Section eyebrow="Capstone Requirements" title="Project Step-by-Step Instructions">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Your capstone project report must document and verify the following 7 analysis segments.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {[
                { step: '1. Data Cleaning', detail: 'Identify and handle the two outlier stores in the retail dataset. Document why store 7 (high revenue, extreme footfall) and store 14 (abnormally low revenue, low CSAT) should be treated separately, and show the before/after descriptive statistics.' },
                { step: '2. Descriptive Statistics & Five-Number Summary', detail: 'Compute the mean, median, variance, standard deviation, and full 5-number summary (Min, Q1, Median, Q3, Max) for store revenue and footfall. Build a box plot illustrating the spread.' },
                { step: '3. Distribution Analysis', detail: 'Check the shape of the revenue distribution. Calculate the skewness and kurtosis coefficients. Is the distribution normal, positive-skewed, or negative-skewed? Does removing outliers alter the shape?' },
                { step: '4. Correlation Analysis', detail: 'Calculate the Pearson Correlation Coefficient (r) between Footfall and Store Revenue. Interpret the strength (weak/moderate/strong) and direction (positive/negative) of this relationship.' },
                { step: '5. Hypothesis Testing', detail: 'Formulate hypotheses to test whether Urban stores outperform Suburban stores in average monthly revenue. Run a two-sample independent T-test. Calculate the t-statistic, specify degrees of freedom, specify p-value, and make a decision at alpha = 0.05.' },
                { step: '6. Dashboard Construction', detail: 'Build a dashboard (or utilize the interactive portal in tab 3) showing the live metrics and test results. Document how different alpha levels change the decision.' },
                { step: '7. Business Insights & Final Report', detail: 'Translate your statistical results into 3 core strategic recommendations for management. E.g. Does footfall justify high urban rents? Should suburban stores receive CSAT training?' },
              ].map((r, i) => (
                <div key={i} style={{ padding: '1rem 1.2rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '10px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>{r.step}</strong>
                  <p style={{ color: '#475569', fontSize: '0.82rem', margin: 0, lineHeight: 1.6 }}>{r.detail}</p>
                </div>
              ))}
            </div>

            <PythonCodeAccordion title="statistics_capstone_project.py" code={`import numpy as np
import pandas as pd
import scipy.stats as stats

# Raw stores dataset
data = {
    'ID': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    'Location': ['Urban', 'Urban', 'Suburban', 'Suburban', 'Urban', 'Suburban', 'Urban', 'Urban', 'Suburban', 'Urban', 'Suburban', 'Urban', 'Suburban', 'Suburban', 'Urban'],
    'Revenue': [45, 52, 28, 32, 48, 30, 95, 42, 25, 50, 35, 47, 29, 5, 44],
    'Footfall': [1200, 1400, 800, 950, 1300, 850, 2800, 1100, 750, 1350, 1000, 1250, 820, 150, 1180],
    'CSAT': [8.2, 8.8, 7.5, 7.9, 8.1, 7.6, 9.1, 8.0, 7.2, 8.5, 8.0, 8.3, 7.4, 5.0, 8.1]
}
df = pd.DataFrame(data)

# 1. Data Cleaning: Outlier Detection using IQR method
Q1 = df['Revenue'].quantile(0.25)
Q3 = df['Revenue'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# Filter outliers
clean_df = df[(df['Revenue'] >= lower_bound) & (df['Revenue'] <= upper_bound)]
outliers = df[(df['Revenue'] < lower_bound) | (df['Revenue'] > upper_bound)]

print("--- Outliers Found ---")
print(outliers)

# 2. Descriptive Stats & Five Number Summary
print("\\n--- Descriptive Statistics (Cleaned) ---")
print(clean_df[['Revenue', 'Footfall']].describe())

# 3. Distribution Shapes: Skewness & Kurtosis
print("\\n--- Skewness (Cleaned) ---")
print(clean_df[['Revenue', 'Footfall']].skew())
print("\\n--- Kurtosis (Cleaned) ---")
print(clean_df[['Revenue', 'Footfall']].kurt())

# 4. Correlation Analysis
r_coeff, p_val = stats.pearsonr(clean_df['Footfall'], clean_df['Revenue'])
print(f"\\nPearson Correlation (Footfall vs Revenue): r = {r_coeff:.4f} (p = {p_val:.4g})")

# 5. Hypothesis Testing: Urban vs Suburban Mean Revenue
urban_revs = clean_df[clean_df['Location'] == 'Urban']['Revenue']
suburban_revs = clean_df[clean_df['Location'] == 'Suburban']['Revenue']

# Independent samples t-test
t_stat, p_test = stats.ttest_ind(urban_revs, suburban_revs, equal_var=False)
print("\\n--- Hypothesis Test: Urban vs Suburban Revenue ---")
print(f"Urban Mean Rev: {urban_revs.mean():.2f} (n={len(urban_revs)})")
print(f"Suburban Mean Rev: {suburban_revs.mean():.2f} (n={len(suburban_revs)})")
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_test:.4f}")`} />

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => onNavigate('stats_day17', 'dashboard')}>Explore Interactive Dashboard</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How do I formulate the null and alternative hypothesis for urban vs suburban store revenue?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── DASHBOARD ─── */}
      {activeTab === 'dashboard' && (
        <Section eyebrow="Live Analytics Portal" title="Capstone Dashboard Portal">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Use the live tool below to preview the statistical metrics required for your report. Use this interactive dashboard to double-check your manual calculations.
            </p>

            <CapstoneDashboard />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => onNavigate('stats_day17', 'submission')}>Go to Submission Guide</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the formula for the independent samples t-test pooled variance?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── SUBMISSION ─── */}
      {activeTab === 'submission' && (
        <Section eyebrow="Project Submission" title="Submit Final Statistics Report">
          <div className="panel">
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.2rem', borderLeft: '5px solid #d97706', marginBottom: '2rem' }}>
              <h3 style={{ color: '#b45309', margin: '0 0 0.5rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} /> Submission Instructions
              </h3>
              <p style={{ color: '#92400e', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>
                Please paste your project's GitHub repository link or share your analytical conclusions below. Ensure your code contains the data cleaning, correlation calculations, and the independent samples T-test.
              </p>
            </div>

            {/* Submission input block */}
            {!submitted ? (
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', fontWeight: 700, color: '#334155', fontSize: '0.85rem', marginBottom: '6px' }}>Project Repository / Submission Text:</label>
                <textarea placeholder="e.g. GitHub link: github.com/username/stats-capstone-retail"
                  style={{ width: '100%', minHeight: '100px', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', fontFamily: 'monospace', marginBottom: '1rem' }} />
                <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => setSubmitted(true)}>
                  Submit Capstone Project 🚀
                </button>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ padding: '2rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', textAlign: 'center', marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '3rem' }}>🎉</span>
                <h3 style={{ color: '#16a34a', margin: '0.6rem 0 0.3rem 0', fontWeight: 900 }}>Capstone Submitted Successfully!</h3>
                <p style={{ color: '#15803d', fontSize: '0.85rem', margin: 0 }}>Your report has been submitted for peer grading. Congratulations on completing the statistics curriculum!</p>
              </motion.div>
            )}

            {/* Curriculum checklist */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.4rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 0.8rem 0', fontSize: '0.92rem' }}>🎓 Course Recap — Concepts Mastered:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {[
                  'Descriptive Statistics (Mean, SD, Shapes)',
                  'EDA process & Data Cleaning',
                  'Probability & Non-Probability Sampling',
                  'Central Limit Theorem & Standard Error',
                  'Hypothesis Testing (Alpha, Beta, p-values)',
                  'Z-tests, T-tests, ANOVA, Chi-Square',
                  'Linear Algebra (Vectors, Matrices, Tensors)',
                  'Eigenvalues & Eigenvectors',
                  'Differentiation, Chain Rule & Gradients',
                  'Gradient Descent Optimization concept',
                ].map(c => (
                  <div key={c} style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={14} color="#16a34a" /> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
