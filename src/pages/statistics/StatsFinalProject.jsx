import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Terminal, Sparkles, RefreshCw, BarChart2, Briefcase } from 'lucide-react';
import finalProjImg from '../../assets/stats_final_project_overview.png';

const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#db2777', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

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

// Raw Final Project Dataset: 20 regions
const finalRawDataset = [
  { id: 1,  region: 'North', revenue: 120, customers: 3100, adSpent: 12, satisfaction: 8.5, outlier: false },
  { id: 2,  region: 'North', revenue: 135, customers: 3300, adSpent: 15, satisfaction: 8.9, outlier: false },
  { id: 3,  region: 'South', revenue: 85,  customers: 2100, adSpent: 8,  satisfaction: 7.6, outlier: false },
  { id: 4,  region: 'South', revenue: 90,  customers: 2300, adSpent: 10, satisfaction: 7.9, outlier: false },
  { id: 5,  region: 'East',  revenue: 110, customers: 2800, adSpent: 11, satisfaction: 8.2, outlier: false },
  { id: 6,  region: 'East',  revenue: 95,  customers: 2400, adSpent: 9,  satisfaction: 7.7, outlier: false },
  { id: 7,  region: 'West',  revenue: 145, customers: 3600, adSpent: 18, satisfaction: 9.0, outlier: false },
  { id: 8,  region: 'West',  revenue: 150, customers: 3700, adSpent: 19, satisfaction: 9.1, outlier: false },
  { id: 9,  region: 'North', revenue: 310, customers: 7800, adSpent: 45, satisfaction: 9.5, outlier: true  }, // Super region outlier
  { id: 10, region: 'South', revenue: 78,  customers: 1900, adSpent: 7,  satisfaction: 7.2, outlier: false },
  { id: 11, region: 'East',  revenue: 105, customers: 2600, adSpent: 10, satisfaction: 8.0, outlier: false },
  { id: 12, region: 'West',  revenue: 130, customers: 3200, adSpent: 16, satisfaction: 8.6, outlier: false },
  { id: 13, region: 'North', revenue: 115, customers: 2900, adSpent: 11, satisfaction: 8.3, outlier: false },
  { id: 14, region: 'South', revenue: 80,  customers: 2000, adSpent: 8,  satisfaction: 7.5, outlier: false },
  { id: 15, region: 'East',  revenue: 100, customers: 2500, adSpent: 9,  satisfaction: 7.8, outlier: false },
  { id: 16, region: 'West',  revenue: 140, customers: 3500, adSpent: 17, satisfaction: 8.8, outlier: false },
  { id: 17, region: 'North', revenue: 125, customers: 3200, adSpent: 13, satisfaction: 8.4, outlier: false },
  { id: 18, region: 'South', revenue: 12,  customers: 200,  adSpent: 2,  satisfaction: 4.5, outlier: true  }, // Failed region outlier
  { id: 19, region: 'East',  revenue: 102, customers: 2550, adSpent: 10, satisfaction: 7.9, outlier: false },
  { id: 20, region: 'West',  revenue: 138, customers: 3400, adSpent: 16, satisfaction: 8.7, outlier: false },
];

/* ─── Interactive Final Project Portal ─── */
const FinalProjectPortal = () => {
  const [cleanData, setCleanData] = useState(false);
  const [sampleSize, setSampleSize] = useState(5);
  const [drawSample, setDrawSample] = useState(null);

  const dataset = useMemo(() => {
    return cleanData ? finalRawDataset.filter(d => !d.outlier) : finalRawDataset;
  }, [cleanData]);

  // Descriptive stats calculations
  const stats = useMemo(() => {
    const revs = dataset.map(d => d.revenue);
    const sorted = [...revs].sort((a, b) => a - b);
    const n = sorted.length;

    const mean = revs.reduce((s, x) => s + x, 0) / n;
    const variance = revs.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
    const sd = Math.sqrt(variance);

    // Skewness
    const m3 = revs.reduce((s, x) => s + (x - mean) ** 3, 0) / n;
    const skewness = m3 / (sd ** 3);

    // Kurtosis
    const m4 = revs.reduce((s, x) => s + (x - mean) ** 4, 0) / n;
    const kurtosis = (m4 / (sd ** 4)) - 3; // excess kurtosis

    const min = sorted[0];
    const max = sorted[n - 1];
    const q1 = sorted[Math.floor(n * 0.25)];
    const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    const q3 = sorted[Math.floor(n * 0.75)];

    return { mean, sd, variance, min, q1, median, q3, max, skewness, kurtosis, n };
  }, [dataset]);

  // Corelation Matrix
  const correlationMatrix = useMemo(() => {
    const cols = ['revenue', 'customers', 'adSpent', 'satisfaction'];
    const matrix = {};
    cols.forEach(c1 => {
      matrix[c1] = {};
      cols.forEach(c2 => {
        const x = dataset.map(d => d[c1]);
        const y = dataset.map(d => d[c2]);
        const mx = x.reduce((s,v)=>s+v,0)/x.length;
        const my = y.reduce((s,v)=>s+v,0)/y.length;
        let cov = 0;
        let vx = 0;
        let vy = 0;
        for(let i=0; i<x.length; i++){
          cov += (x[i]-mx)*(y[i]-my);
          vx += (x[i]-mx)**2;
          vy += (y[i]-my)**2;
        }
        matrix[c1][c2] = cov / Math.sqrt(vx * vy);
      });
    });
    return matrix;
  }, [dataset]);

  // Live sampling drawer
  const handleDrawSample = () => {
    const shuffled = [...dataset].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, sampleSize);
    const mean = selected.reduce((s, x) => s + x.revenue, 0) / sampleSize;
    setDrawSample({ items: selected, mean });
  };

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem', marginTop: '1.5rem' }}>
      <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles color="#db2777" /> Interactive Business Intelligence Dashboard
      </h4>
      <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 1.2rem 0' }}>Conduct dynamic statistical validation on the Region sales performance dataset.</p>

      {/* Cleaning toggle */}
      <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '0.8rem 1.2rem', marginBottom: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#334155', cursor: 'pointer' }}>
          <input type="checkbox" checked={cleanData} onChange={e => { setCleanData(e.target.checked); setDrawSample(null); }} style={{ width: '16px', height: '16px', accentColor: '#db2777' }} />
          🧼 Apply Outlier Cleaning (Filters super region 9 & failed region 18)
        </label>
        <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: 'auto' }}>Current Dataset Size: <strong>{dataset.length} regions</strong></span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
        {/* Descriptive Summary & Shape Analysis */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem' }}>
          <h5 style={{ color: '#db2777', margin: '0 0 0.8rem 0', fontWeight: 800 }}> Descriptors & Shape</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.8rem', color: '#475569', marginBottom: '0.8rem' }}>
            <div>Mean Rev: <strong>₹{stats.mean.toFixed(2)}Cr</strong></div>
            <div>Std Dev: <strong>₹{stats.sd.toFixed(2)}Cr</strong></div>
            <div>Variance: <strong>{stats.variance.toFixed(2)}</strong></div>
            <div>Kurtosis (ex): <strong style={{ color: stats.kurtosis > 0 ? '#ea580c' : '#1d4ed8' }}>{stats.kurtosis.toFixed(3)}</strong></div>
            <div style={{ gridColumn: 'span 2', paddingTop: '4px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Skewness: <strong style={{ color: stats.skewness > 0 ? '#ea580c' : '#1d4ed8' }}>{stats.skewness.toFixed(3)}</strong></span>
              <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b' }}>
                Profile: {stats.skewness > 0.5 ? 'Right Skewed' : stats.skewness < -0.5 ? 'Left Skewed' : 'Symmetric'}
              </span>
            </div>
          </div>

          <h5 style={{ color: '#7c3aed', margin: '1rem 0 0.6rem 0', fontWeight: 800 }}>📏 Five Number Summary</h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', textAlign: 'center' }}>
            {[['Min', stats.min], ['Q1', stats.q1], ['Med', stats.median], ['Q3', stats.q3], ['Max', stats.max]].map(([lbl, val]) => (
              <div key={lbl} style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '6px 2px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.65rem', color: '#6d28d9', fontWeight: 700 }}>{lbl}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4c1d95', fontFamily: 'monospace' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Correlation Matrix Heatmap */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem' }}>
          <h5 style={{ color: '#16a34a', margin: '0 0 0.8rem 0', fontWeight: 800 }}>🔥 Correlation Heatmap Matrix</h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', textAlign: 'center', fontSize: '0.73rem' }}>
            <div style={{ fontWeight: 700, color: '#64748b' }}>Var</div>
            {['Rev', 'Cust', 'Ad', 'CSAT'].map(v => <div key={v} style={{ fontWeight: 700, color: '#0f172a' }}>{v}</div>)}
            {['revenue', 'customers', 'adSpent', 'satisfaction'].map((c1, ri) => (
              <React.Fragment key={c1}>
                <div style={{ fontWeight: 700, color: '#0f172a', textAlign: 'left', display: 'flex', alignItems: 'center' }}>{['Rev', 'Cust', 'Ad', 'CSAT'][ri]}</div>
                {['revenue', 'customers', 'adSpent', 'satisfaction'].map(c2 => {
                  const val = correlationMatrix[c1][c2];
                  const absVal = Math.abs(val);
                  const bg = val > 0.8 ? 'rgba(22, 163, 74, 0.25)' : val > 0.4 ? 'rgba(22, 163, 74, 0.15)' : val < 0 ? 'rgba(220, 38, 38, 0.15)' : 'rgba(0,0,0,0.03)';
                  const color = val > 0.8 ? '#15803d' : val > 0.4 ? '#16a34a' : val < 0 ? '#b91c1c' : '#64748b';
                  return (
                    <div key={c2} style={{ background: bg, color, padding: '8px 2px', borderRadius: '4px', fontWeight: 800, fontFamily: 'monospace' }}>
                      {val.toFixed(2)}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        {/* Sampling & CLT simulator */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem' }}>
          <h5 style={{ color: '#1d4ed8', margin: '0 0 0.8rem 0', fontWeight: 800 }}>🎲 Live Random Sampling & CLT</h5>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Sample size (n):</span>
            <input type="number" min="2" max="8" value={sampleSize} onChange={e => setSampleSize(Number(e.target.value))} style={{ width: '50px', padding: '3px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }} />
            <button className="btn btn-primary" onClick={handleDrawSample} style={{ background: '#1d4ed8', borderColor: '#1d4ed8', padding: '3px 8px', fontSize: '0.75rem' }}>Draw Sample</button>
          </div>

          {drawSample ? (
            <div style={{ fontSize: '0.78rem', color: '#475569' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {drawSample.items.map((it, idx) => (
                  <span key={idx} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>
                    S{it.id}: ₹{it.revenue}Cr
                  </span>
                ))}
              </div>
              <div style={{ background: '#eff6ff', padding: '6px 8px', borderRadius: '6px', border: '1px dashed #bfdbfe', fontFamily: 'monospace' }}>
                Sample Mean (X̄): <strong>₹{drawSample.mean.toFixed(2)}Cr</strong><br />
                Population Mean (μ): <strong>₹{stats.mean.toFixed(2)}Cr</strong>
              </div>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>Click "Draw Sample" to run random sampling simulation.</p>
          )}
        </div>

        {/* Business Recommendation Generator */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem' }}>
          <h5 style={{ color: '#ea580c', margin: '0 0 0.8rem 0', fontWeight: 800 }}>💼 Business recommendations generator</h5>
          <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.6 }}>
            {cleanData ? (
              <ul style={{ paddingLeft: '16px', margin: 0 }}>
                <li><strong>Increase Ad Spend:</strong> High correlation (r = {correlationMatrix.revenue.adSpent.toFixed(2)}) suggests ad spend directly drives sales growth.</li>
                <li><strong>Maintain CSAT score:</strong> User rating is positively correlated with revenue (r = {correlationMatrix.revenue.satisfaction.toFixed(2)}).</li>
              </ul>
            ) : (
              <div style={{ color: '#dc2626', background: '#fef2f2', padding: '8px', borderRadius: '6px', border: '1px dashed #fecaca' }}>
                ⚠️ <strong>Outliers detected!</strong> Clean dataset (remove extreme regions) to get reliable recommendations.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StatsFinalProject({ activeTab, onNavigate, openAITutor }) {
  const [projectText, setProjectText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence mode="wait">

      {/* ─── BRIEF ─── */}
      {activeTab === 'final_overview' && (
        <Section eyebrow="Final Project" title="Business Analytics using Statistics">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              The Final Capstone Project evaluates your proficiency in drawing business conclusions using statistical models. You will clean data, run distribution shapes, correlation matrices, and complete a final report detailing strategic recommendations.
            </p>

            <ZoomableImage src={finalProjImg} alt="Business Analytics Final Project Roadmap infographic" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { title: 'Data Cleaning & Summary', desc: 'Find the outliers in the 20-region dataset. Document summary stats with and without outliers.' },
                { title: 'Distribution & Correlation', desc: 'Compute skewness, excess kurtosis, and correlation coefficients. Generate correlation matrices.' },
                { title: 'Hypothesis Testing & Recommendations', desc: 'Run T-tests, interpret parameters, and build business action plans.' },
              ].map(s => (
                <div key={s.title} style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.88rem', display: 'block', marginBottom: '4px' }}>{s.title}</strong>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <PythonCodeAccordion title="business_analytics_final_project.py" code={`import numpy as np
import pandas as pd
import scipy.stats as stats

# Raw 20-region business performance dataset
data = {
    'ID': list(range(1, 21)),
    'Region': ['North','North','South','South','East','East','West','West','North','South',
               'East','West','North','South','East','West','North','South','East','West'],
    'Revenue': [120, 135, 85, 90, 110, 95, 145, 150, 310, 78, 105, 130, 115, 80, 100, 140, 125, 12, 102, 138],
    'Customers': [3100, 3300, 2100, 2300, 2800, 2400, 3600, 3700, 7800, 1900,
                  2600, 3200, 2900, 2000, 2500, 3500, 3200, 200, 2550, 3400],
    'AdSpent': [12, 15, 8, 10, 11, 9, 18, 19, 45, 7, 10, 16, 11, 8, 9, 17, 13, 2, 10, 16],
    'Satisfaction': [8.5, 8.9, 7.6, 7.9, 8.2, 7.7, 9.0, 9.1, 9.5, 7.2, 8.0, 8.6, 8.3, 7.5, 7.8, 8.8, 8.4, 4.5, 7.9, 8.7]
}
df = pd.DataFrame(data)

# 1. Data Cleaning: Outlier Detection using IQR on Revenue
Q1 = df['Revenue'].quantile(0.25)
Q3 = df['Revenue'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

clean_df = df[(df['Revenue'] >= lower_bound) & (df['Revenue'] <= upper_bound)]
outliers = df[(df['Revenue'] < lower_bound) | (df['Revenue'] > upper_bound)]

print("--- Outlier Regions Found ---")
print(outliers)

# 2. Descriptive Stats & Five Number Summary
print("\\n--- Descriptive Statistics (Cleaned Data) ---")
print(clean_df[['Revenue', 'Customers', 'AdSpent', 'Satisfaction']].describe())

# 3. Distribution Shapes: Skewness & Kurtosis
print("\\n--- Distribution Shape Analysis ---")
print("Skewness:\\n", clean_df[['Revenue', 'Customers', 'AdSpent']].skew())
print("\\nKurtosis (Excess):\\n", clean_df[['Revenue', 'Customers', 'AdSpent']].kurt())

# 4. Correlation Matrix
corr_matrix = clean_df[['Revenue', 'Customers', 'AdSpent', 'Satisfaction']].corr()
print("\\n--- Correlation Matrix Heatmap Values ---")
print(corr_matrix)

# 5. Sampling & Central Limit Theorem Simulation (n=5, 100 trials)
np.random.seed(42)
sample_means = []
for _ in range(100):
    sample = clean_df['Revenue'].sample(n=5, replace=True)
    sample_means.append(sample.mean())

print(f"\\n--- Central Limit Theorem Verification ---")
print(f"Population Mean (μ): {clean_df['Revenue'].mean():.2f}")
print(f"Mean of Sample Means: {np.mean(sample_means):.2f}")
print(f"Standard Error (Theoretical): {clean_df['Revenue'].std() / np.sqrt(5):.2f}")
print(f"Standard Error (Empirical): {np.std(sample_means, ddof=1):.2f}")

# 6. Hypothesis Testing: North vs South Region Revenue
north_rev = clean_df[clean_df['Region'] == 'North']['Revenue']
south_rev = clean_df[clean_df['Region'] == 'South']['Revenue']
t_stat, p_val = stats.ttest_ind(north_rev, south_rev, equal_var=False)

print("\\n--- Hypothesis Test: North vs South Regions ---")
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_val:.4g}")`} />

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => onNavigate('stats_final_project', 'final_dashboard')}>Go to Dashboard</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What elements must be included in a final business statistics report?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── DASHBOARD ─── */}
      {activeTab === 'final_dashboard' && (
        <Section eyebrow="Interactive Laboratory" title="Final Project Analytics Dashboard">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7 }}>
              Use the live tool below to inspect values and perform tests. Ensure you copy the metrics generated by the dashboard into your final report document.
            </p>

            <FinalProjectPortal />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => onNavigate('stats_final_project', 'final_submission')}>Go to Submission Page</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Show me how to interpret excess kurtosis values of a business dataset.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── SUBMISSION ─── */}
      {activeTab === 'final_submission' && (
        <Section eyebrow="Final Submission" title="Submit Final Project Report">
          <div className="panel">
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.2rem', borderLeft: '5px solid #d97706', marginBottom: '2rem' }}>
              <h3 style={{ color: '#b45309', margin: '0 0 0.5rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} /> Deliverables Checklist
              </h3>
              <p style={{ color: '#92400e', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>
                Paste the URL of your GitHub repository containing the complete analysis notebook. Include: Data cleaning logic, summary stats, kurtosis, skewness, random sampling comparisons, correlation matrices, A/B test results, and marketing recommendations.
              </p>
            </div>

            {!submitted ? (
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: 700, color: '#334155', fontSize: '0.85rem', marginBottom: '6px' }}>Final Project Submission text / GitHub Repo:</label>
                <textarea value={projectText} onChange={e => setProjectText(e.target.value)} placeholder="github.com/username/business-analytics-statistics"
                  style={{ width: '100%', minHeight: '120px', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', fontFamily: 'monospace', marginBottom: '1.2rem' }} />
                <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => setSubmitted(true)}>
                  Submit Final Project Report 🚀
                </button>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ padding: '2.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem' }}>🏆</span>
                <h3 style={{ color: '#16a34a', margin: '0.8rem 0 0.3rem 0', fontWeight: 900 }}>Final Project Submitted!</h3>
                <p style={{ color: '#15803d', fontSize: '0.86rem', margin: 0 }}>Congratulations! You have completed the final project. Your grade will be updated on the student portal soon.</p>
              </motion.div>
            )}
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
