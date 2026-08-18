import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Terminal, Sparkles, ShoppingCart, BarChart2 } from 'lucide-react';
import miniProjsImg from '../../assets/stats_mini_projects_overview.png';

const Section = ({ eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#db2777', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
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
    <div style={{ background: '#0f172a', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e293b', marginBottom: '1.5rem' }}>
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

export default function StatsMiniProjects({ activeTab, onNavigate, openAITutor }) {
  // Mini Project 1 State
  const [gradesInput, setGradesInput] = useState('78, 85, 92, 65, 88, 74, 95, 81, 70, 90');
  const grades = useMemo(() => gradesInput.split(',').map(x => Number(x.trim())).filter(x => !isNaN(x)), [gradesInput]);
  const gradesStats = useMemo(() => {
    if (!grades.length) return null;
    const n = grades.length;
    const mean = grades.reduce((s, x) => s + x, 0) / n;
    const sd = Math.sqrt(grades.reduce((s, x) => s + (x - mean)**2, 0) / Math.max(1, n - 1));
    const sorted = [...grades].sort((a, b) => a - b);
    const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    return { mean, sd, median, min: sorted[0], max: sorted[n-1], n };
  }, [grades]);

  // Mini Project 2 State
  const [imputeMethod, setImputeMethod] = useState('mean');
  const rawSales = [450, null, 500, 380, null, 610, 480];
  const cleanedSales = useMemo(() => {
    const valid = rawSales.filter(x => x !== null);
    const fill = imputeMethod === 'mean' 
      ? valid.reduce((s, x) => s + x, 0) / valid.length
      : [...valid].sort((a, b) => a - b)[Math.floor(valid.length/2)];
    return rawSales.map(x => x === null ? fill : x);
  }, [imputeMethod]);

  // Mini Project 3 State
  const [corStrength, setCorStrength] = useState(0.7);

  // Mini Project 4 State
  const [convA, setConvA] = useState(45);
  const [convB, setConvB] = useState(62);
  const size = 500;
  const pResult = useMemo(() => {
    const p1 = convA / size;
    const p2 = convB / size;
    const pPooled = (convA + convB) / (size * 2);
    const se = Math.sqrt(pPooled * (1 - pPooled) * (2 / size));
    const z = (p2 - p1) / se;
    const pVal = 2 * (1 - (1 / (1 + Math.exp(-0.717 * z - 0.416 * z * z)))); // Approx two-tail p
    return { p1, p2, z, pVal: Math.max(0.0001, Math.min(0.9999, pVal)), reject: pVal < 0.05 };
  }, [convA, convB]);

  const [submitted, setSubmitted] = useState({});

  return (
    <Section eyebrow="Statistics Portfolio" title="Statistics Mini Projects">
      {/* ─── 1. STUDENT MARKS ─── */}
      {activeTab === 'student_marks' && (
        <div className="panel">
          <h3 style={{ color: '#db2777', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText /> Project 1: Student Marks Analysis
          </h3>
          <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
            <strong>Goal:</strong> Formulate descriptive summaries and distribution models on class grades. Understand average performance, variance, and standard landmarks.
          </p>

          <ZoomableImage src={miniProjsImg} alt="Mini Projects Overview infographic" />

          {/* Interactive Calculator */}
          <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '1.5rem 0' }}>
            <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.95rem', color: '#0f172a' }}>⚡ Live Summary Stats Calculator</h4>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>Input Student Marks (comma separated):</label>
            <input type="text" value={gradesInput} onChange={e => setGradesInput(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '0.8rem' }} />

            {gradesStats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', fontSize: '0.8rem', color: '#334155' }}>
                <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>Mean: <strong>{gradesStats.mean.toFixed(2)}</strong></div>
                <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>Median: <strong>{gradesStats.median}</strong></div>
                <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>Std Dev (s): <strong>{gradesStats.sd.toFixed(2)}</strong></div>
                <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>Min/Max: <strong>{gradesStats.min} / {gradesStats.max}</strong></div>
              </div>
            )}
          </div>

          <PythonCodeAccordion title="student_marks_analysis.py" code={`import numpy as np
import scipy.stats as stats

# Final list of student grades
marks = [78, 85, 92, 65, 88, 74, 95, 81, 70, 90]

# Descriptive stats
mean_val = np.mean(marks)
median_val = np.median(marks)
std_dev = np.std(marks, ddof=1) # sample standard deviation
variance = np.var(marks, ddof=1)

# Five-number summary
minimum = np.min(marks)
q1 = np.percentile(marks, 25)
q3 = np.percentile(marks, 75)
maximum = np.max(marks)
iqr = q3 - q1

# Outlier fences (Tukey's fences)
lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr
outliers = [x for x in marks if x < lower_fence or x > upper_fence]

# Skewness Analysis
skewness_coeff = stats.skew(marks)

print("--- Descriptives Summary ---")
print(f"Mean: {mean_val:.2f}, Median: {median_val}, Variance: {variance:.2f}")
print(f"Standard Deviation (s): {std_dev:.2f}")
print("\\n--- Five-Number Summary ---")
print(f"Min: {minimum}, Q1: {q1}, Median (Q2): {median_val}, Q3: {q3}, Max: {maximum}")
print(f"IQR: {iqr}, Lower Fence: {lower_fence}, Upper Fence: {upper_fence}")
print(f"Detected Outliers: {outliers}")
print(f"Skewness Coefficient: {skewness_coeff:.4f}")`} />

          <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <strong style={{ color: '#c53030', fontSize: '0.83rem', display: 'block', marginBottom: '4px' }}>Submission Deliverables:</strong>
            <p style={{ color: '#742a2a', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
              1. Compute mean, median, mode, variance, and standard deviation for the given class marks list.<br />
              2. Compute the 5-number summary and determine if any outliers exist using the IQR method.<br />
              3. Provide a written analysis explaining if the class distribution is positively or negatively skewed.
            </p>
          </div>

          {!submitted[1] ? (
            <button className="btn btn-primary" onClick={() => setSubmitted(p => ({ ...p, 1: true }))} style={{ background: '#db2777', borderColor: '#db2777' }}>Complete Project 1</button>
          ) : (
            <div style={{ padding: '0.8rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '8px', fontWeight: 700, textAlign: 'center' }}>✓ Project 1 Submitted!</div>
          )}
        </div>
      )}

      {/* ─── 2. SALES DATA EDA ─── */}
      {activeTab === 'sales_eda' && (
        <div className="panel">
          <h3 style={{ color: '#db2777', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 /> Project 2: Sales Data EDA & Imputation
          </h3>
          <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
            <strong>Goal:</strong> Perform data cleaning and Exploratory Data Analysis on a retail sales dataset. Handle missing entries and inspect distribution parameters.
          </p>

          {/* Interactive Imputation Simulator */}
          <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '1.5rem 0' }}>
            <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.95rem', color: '#0f172a' }}>🧼 Missing Value Imputation Simulator</h4>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Raw Sales Array: [450, null, 500, 380, null, 610, 480]</p>
            
            <div style={{ display: 'flex', gap: '10px', margin: '8px 0' }}>
              <button className="btn btn-outline" onClick={() => setImputeMethod('mean')} style={{ borderColor: imputeMethod === 'mean' ? '#db2777' : '#cbd5e1', background: imputeMethod === 'mean' ? '#fdf2f8' : '#fff' }}>Mean Imputation</button>
              <button className="btn btn-outline" onClick={() => setImputeMethod('median')} style={{ borderColor: imputeMethod === 'median' ? '#db2777' : '#cbd5e1', background: imputeMethod === 'median' ? '#fdf2f8' : '#fff' }}>Median Imputation</button>
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', color: '#334155' }}>
              Imputed Array: [{cleanedSales.map(x => x.toFixed(1)).join(', ')}]<br />
              Cleaned Mean: { (cleanedSales.reduce((s,x)=>s+x,0)/cleanedSales.length).toFixed(2) }
            </div>
          </div>

          <PythonCodeAccordion title="sales_data_eda.py" code={`import pandas as pd
import numpy as np

# Dataset with missing sales entries
data = {
    'Store_ID': [1, 2, 3, 4, 5, 6, 7],
    'Category': ['Electronics', 'Electronics', 'Fashion', 'Fashion', 'Home', 'Electronics', 'Fashion'],
    'Sales': [450, np.nan, 500, 380, np.nan, 610, 480]
}
df = pd.DataFrame(data)

print("--- Original Dataset ---")
print(df)

# Mean Imputation
df_mean = df.copy()
df_mean['Sales'] = df_mean['Sales'].fillna(df_mean['Sales'].mean())
print("\\n--- Mean Imputation Result ---")
print(df_mean)

# Median Imputation
df_median = df.copy()
df_median['Sales'] = df_median['Sales'].fillna(df_median['Sales'].median())
print("\\n--- Median Imputation Result ---")
print(df_median)

# Group Sales by Category
category_sales = df_median.groupby('Category')['Sales'].sum()
print("\\n--- Total Sales by Category (Median Imputed) ---")
print(category_sales)`} />

          <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <strong style={{ color: '#c53030', fontSize: '0.83rem', display: 'block', marginBottom: '4px' }}>Submission Deliverables:</strong>
            <p style={{ color: '#742a2a', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
              1. Handle the nulls in the Sales dataset using both Mean and Median imputation. Compare results.<br />
              2. Produce a bar chart showing sales breakdown by category.<br />
              3. Identify the highest selling store and write a short summary detailing performance.
            </p>
          </div>

          {!submitted[2] ? (
            <button className="btn btn-primary" onClick={() => setSubmitted(p => ({ ...p, 2: true }))} style={{ background: '#db2777', borderColor: '#db2777' }}>Complete Project 2</button>
          ) : (
            <div style={{ padding: '0.8rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '8px', fontWeight: 700, textAlign: 'center' }}>✓ Project 2 Submitted!</div>
          )}
        </div>
      )}

      {/* ─── 3. CUSTOMER PURCHASE ─── */}
      {activeTab === 'customer_purchase' && (
        <div className="panel">
          <h3 style={{ color: '#db2777', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart /> Project 3: Customer Purchase Correlation
          </h3>
          <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
            <strong>Goal:</strong> Inspect the strength of relationship between Customer Income and purchase value. Learn covariance and correlation concepts.
          </p>

          {/* Correlation Simulator */}
          <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '1.5rem 0' }}>
            <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.95rem', color: '#0f172a' }}>📈 Live Correlation Scatter Visualiser</h4>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>
              Set Correlation Coefficient (r): <strong style={{ color: '#db2777' }}>{corStrength}</strong>
            </label>
            <input type="range" min="-1" max="1" step="0.1" value={corStrength} onChange={e => setCorStrength(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777', marginBottom: '0.8rem' }} />

            {/* Simple representation */}
            <div style={{ textAlign: 'center', fontSize: '0.8rem', padding: '10px', background: '#fff', borderRadius: '6px', border: '1px solid #cbd5e1', color: '#475569' }}>
              Relationship Profile: <strong>{Math.abs(corStrength) > 0.7 ? 'Strong' : Math.abs(corStrength) > 0.4 ? 'Moderate' : 'Weak'} {corStrength > 0 ? 'Positive Correlation' : corStrength < 0 ? 'Negative Correlation' : 'No Correlation'}</strong>
            </div>
          </div>

          <PythonCodeAccordion title="customer_correlation.py" code={`import pandas as pd
import numpy as np

# Customer profiles dataset
data = {
    'Age': [25, 34, 45, 22, 55, 30, 48, 38],
    'Income': [45000, 62000, 85000, 38000, 110000, 52000, 95000, 72000],
    'Spent': [300, 800, 1200, 150, 2500, 400, 1800, 950]
}
df = pd.DataFrame(data)

# Compute Covariance Matrix
cov_matrix = df.cov()
print("--- Covariance Matrix ---")
print(cov_matrix)

# Compute Pearson Correlation Matrix
pearson_corr = df.corr(method='pearson')
print("\\n--- Pearson Correlation Matrix ---")
print(pearson_corr)

# Compute Spearman Rank Correlation Matrix
spearman_corr = df.corr(method='spearman')
print("\\n--- Spearman Rank Correlation Matrix ---")
print(spearman_corr)`} />

          <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <strong style={{ color: '#c53030', fontSize: '0.83rem', display: 'block', marginBottom: '4px' }}>Submission Deliverables:</strong>
            <p style={{ color: '#742a2a', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
              1. Compute the Pearson Correlation coefficient manually between customer age and total spent.<br />
              2. Build a correlation heatmap matrix for variables: Age, Income, Spent, and Satisfaction.<br />
              3. Provide a written analysis explaining whether high-income customers spend significantly more.
            </p>
          </div>

          {!submitted[3] ? (
            <button className="btn btn-primary" onClick={() => setSubmitted(p => ({ ...p, 3: true }))} style={{ background: '#db2777', borderColor: '#db2877' }}>Complete Project 3</button>
          ) : (
            <div style={{ padding: '0.8rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '8px', fontWeight: 700, textAlign: 'center' }}>✓ Project 3 Submitted!</div>
          )}
        </div>
      )}

      {/* ─── 4. HYPOTHESIS TESTING ─── */}
      {activeTab === 'hypothesis_biz' && (
        <div className="panel">
          <h3 style={{ color: '#db2777', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target /> Project 4: Business Hypothesis Testing
          </h3>
          <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
            <strong>Goal:</strong> Formulate and execute hypothesis tests on real business outcomes. Evaluate A/B testing conversions.
          </p>

          {/* Interactive Hypothesis Calculator */}
          <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '1.5rem 0' }}>
            <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.95rem', color: '#0f172a' }}>🧪 Live Checkout A/B Test (Conversion rate out of 500 users)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '8px 0' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b' }}>Version A Conversions:</label>
                <input type="number" min="0" max="200" value={convA} onChange={e => setConvA(Number(e.target.value))} style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b' }}>Version B Conversions:</label>
                <input type="number" min="0" max="200" value={convB} onChange={e => setConvB(Number(e.target.value))} style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div style={{ marginTop: '10px', fontSize: '0.78rem', color: '#475569', background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <div>Version A Rate: <strong>{(pResult.p1 * 100).toFixed(1)}%</strong> | Version B Rate: <strong>{(pResult.p2 * 100).toFixed(1)}%</strong></div>
              <div>Z-statistic: <strong>{pResult.z.toFixed(3)}</strong> | p-value: <strong>{pResult.pVal.toFixed(4)}</strong></div>
              <div style={{ color: pResult.reject ? '#16a34a' : '#dc2626', fontWeight: 700, marginTop: '4px' }}>
                Decision: {pResult.reject ? '✅ Reject Null (Statistically Significant Winner)' : '❌ Fail to Reject Null (No significant difference)'}
              </div>
            </div>
          </div>

          <PythonCodeAccordion title="business_ab_test.py" code={`import numpy as np
import scipy.stats as stats

# A/B Test conversion numbers (500 users per group)
n_A, conv_A = 500, 45
n_B, conv_B = 500, 62

# Conversion Proportions
p_A = conv_A / n_A
p_B = conv_B / n_B

# Pooled Proportion
p_pooled = (conv_A + conv_B) / (n_A + n_B)

# Standard Error
se = np.sqrt(p_pooled * (1 - p_pooled) * (1/n_A + 1/n_B))

# Z-score calculation
z_score = (p_B - p_A) / se

# P-value (two-tailed)
p_value = 2 * (1 - stats.norm.cdf(abs(z_score)))

print("--- Two-Proportion Z-Test Results ---")
print(f"Group A Conversion Rate: {p_A*100:.2f}%")
print(f"Group B Conversion Rate: {p_B*100:.2f}%")
print(f"Computed Z-statistic: {z_score:.4f}")
print(f"Calculated p-value: {p_value:.4f}")

alpha = 0.05
if p_value < alpha:
    print(f"Decision: Reject the Null Hypothesis at alpha={alpha}. The difference is statistically significant!")
else:
    print(f"Decision: Fail to Reject Null. No statistically significant difference.")`} />

          <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <strong style={{ color: '#c53030', fontSize: '0.83rem', display: 'block', marginBottom: '4px' }}>Submission Deliverables:</strong>
            <p style={{ color: '#742a2a', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
              1. Formulate Null (H₀) and Alternative (H₁) hypotheses for the conversion rates test.<br />
              2. Compute standard error and critical values manually at alpha = 0.05.<br />
              3. Write a recommendation explaining if Version B should be rolled out company-wide.
            </p>
          </div>

          {!submitted[4] ? (
            <button className="btn btn-primary" onClick={() => setSubmitted(p => ({ ...p, 4: true }))} style={{ background: '#db2777', borderColor: '#db2877' }}>Complete Project 4</button>
          ) : (
            <div style={{ padding: '0.8rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '8px', fontWeight: 700, textAlign: 'center' }}>✓ Project 4 Submitted!</div>
          )}
        </div>
      )}
    </Section>
  );
}
