import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';
import corrImg from '../../assets/correlation_types_diagram.png';

/* ─── helpers ─── */
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
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', overflowX: 'auto' }}>
      {lines.map((line, li) => {
        const rx = /(#[^\n]*)|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?:\b(import|from|as|return|if|else|for|while|in|def|class|and|or|not|is|None|True|False|lambda|with|pass)\b)|(?:\b(print|len|sum|range|sorted|min|max|enumerate|zip|map|round|abs|int|float|str|list|dict|math|sqrt)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
        let m; let k = 0; const toks = []; rx.lastIndex = 0; let last = 0;
        while ((m = rx.exec(line)) !== null) {
          if (m.index > last) toks.push(<span key={k++} style={{ color: '#e1e4e8' }}>{line.slice(last, m.index)}</span>);
          const [tok, cmt, str, kw, bi, num, sym] = m;
          let color = '#e1e4e8'; let fw = 'normal';
          if (cmt) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (kw) { color = '#ff7b72'; fw = 'bold'; }
          else if (bi) color = '#ffb454';
          else if (num) color = '#79c0ff';
          else if (sym) color = '#ff7b72';
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
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        />
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

/* ─── Scatter Plot Component ─── */
const ScatterPlot = ({ points, r, label, color }) => {
  const W = 220, H = 160, PAD = 20;
  // normalise 0-1 to canvas coords
  const cx = (x) => PAD + x * (W - 2 * PAD);
  const cy = (y) => H - PAD - y * (H - 2 * PAD);

  // Simple linear regression line
  const n = points.length;
  const mx = points.reduce((s, p) => s + p[0], 0) / n;
  const my = points.reduce((s, p) => s + p[1], 0) / n;
  const slope = points.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0) /
    (points.reduce((s, p) => s + (p[0] - mx) ** 2, 0) || 1);
  const intercept = my - slope * mx;
  const x0 = 0, y0 = slope * x0 + intercept;
  const x1 = 1, y1 = slope * x1 + intercept;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <svg width={W} height={H} style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        {/* Axes */}
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#cbd5e1" strokeWidth="1" />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#cbd5e1" strokeWidth="1" />
        {/* Trend line */}
        <line x1={cx(x0)} y1={cy(Math.max(0, Math.min(1, y0)))} x2={cx(x1)} y2={cy(Math.max(0, Math.min(1, y1)))} stroke={color} strokeWidth="2" strokeDasharray="5,3" opacity="0.7" />
        {/* Points */}
        {points.map((p, i) => <circle key={i} cx={cx(p[0])} cy={cy(p[1])} r="4" fill={color} fillOpacity="0.8" />)}
      </svg>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color }}>{label}</span>
      <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace' }}>r ≈ {r.toFixed(2)}</span>
    </div>
  );
};

/* ─── Heatmap Component ─── */
const HeatmapCell = ({ value, row, col }) => {
  const abs = Math.abs(value);
  const positive = value > 0;
  const bg = value === 1
    ? '#dc2626'
    : value === 0 ? '#f8fafc'
    : positive
      ? `rgba(220,38,38,${abs * 0.7})`
      : `rgba(37,99,235,${abs * 0.7})`;
  const textColor = abs > 0.5 ? '#fff' : '#334155';
  return (
    <div style={{ background: bg, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'monospace', borderRadius: '4px', transition: 'all 0.2s' }}>
      {value.toFixed(2)}
    </div>
  );
};

/* ─── Scatter Preset Datasets ─── */
const POSITIVE_PTS  = [[0.1,0.15],[0.2,0.25],[0.3,0.28],[0.4,0.42],[0.5,0.55],[0.6,0.58],[0.7,0.72],[0.8,0.78],[0.9,0.88]];
const NEGATIVE_PTS  = [[0.1,0.88],[0.2,0.78],[0.3,0.72],[0.4,0.58],[0.5,0.55],[0.6,0.42],[0.7,0.28],[0.8,0.25],[0.9,0.15]];
const NONE_PTS      = [[0.1,0.5],[0.2,0.8],[0.3,0.2],[0.4,0.7],[0.5,0.3],[0.6,0.9],[0.7,0.1],[0.8,0.6],[0.9,0.4]];
const WEAK_POS_PTS  = [[0.1,0.3],[0.2,0.5],[0.3,0.4],[0.4,0.65],[0.5,0.3],[0.6,0.7],[0.7,0.6],[0.8,0.5],[0.9,0.75]];
const PERFECT_PTS   = [[0.1,0.1],[0.2,0.2],[0.3,0.3],[0.4,0.4],[0.5,0.5],[0.6,0.6],[0.7,0.7],[0.8,0.8],[0.9,0.9]];

const CORR_MATRIX = {
  labels: ['Price', 'Revenue', 'AdSpend', 'Sales'],
  values: [
    [1.00,  0.85,  0.42, -0.31],
    [0.85,  1.00,  0.63,  0.21],
    [0.42,  0.63,  1.00,  0.78],
    [-0.31, 0.21,  0.78,  1.00],
  ]
};

/* ────────────────────────────────── */
export default function StatsDay8({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Playground
  const [playDataset, setPlayDataset] = useState('positive');
  const [customX, setCustomX] = useState('10, 20, 30, 40, 50, 60');
  const [customY, setCustomY] = useState('12, 19, 29, 38, 52, 61');
  const [customR, setCustomR] = useState(null);

  const playOptions = [
    { key: 'positive', label: '📈 Strong Positive', pts: POSITIVE_PTS, r: 0.99, color: '#16a34a' },
    { key: 'weak',     label: '📊 Weak Positive',   pts: WEAK_POS_PTS, r: 0.68, color: '#f59e0b' },
    { key: 'none',     label: '⬛ No Correlation',  pts: NONE_PTS,     r: 0.02, color: '#94a3b8' },
    { key: 'negative', label: '📉 Strong Negative', pts: NEGATIVE_PTS, r: -0.99, color: '#dc2626' },
    { key: 'perfect',  label: '✅ Perfect +1',      pts: PERFECT_PTS,  r: 1.00, color: '#7c3aed' },
  ];
  const active = playOptions.find(o => o.key === playDataset);

  const calcCustomR = () => {
    try {
      const xs = customX.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
      const ys = customY.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
      const n = Math.min(xs.length, ys.length);
      if (n < 3) { alert('Enter at least 3 paired values.'); return; }
      const xSlice = xs.slice(0, n), ySlice = ys.slice(0, n);
      const mx = xSlice.reduce((a, b) => a + b) / n;
      const my = ySlice.reduce((a, b) => a + b) / n;
      const num = xSlice.reduce((s, x, i) => s + (x - mx) * (ySlice[i] - my), 0);
      const den = Math.sqrt(
        xSlice.reduce((s, x) => s + (x - mx) ** 2, 0) *
        ySlice.reduce((s, y) => s + (y - my) ** 2, 0)
      );
      setCustomR(den === 0 ? 0 : +(num / den).toFixed(4));
    } catch { alert('Invalid input.'); }
  };

  const handleContinue = (next) => { onNavigate('stats_day8', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0;
    quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; });
    setScore(c);
  };

  const quizQuestions = [
    {
      id: 1,
      q: "What is the key difference between Covariance and the Pearson Correlation Coefficient?",
      opts: [
        "Covariance only works on categorical variables; correlation works on numerical.",
        "Covariance has no fixed scale and is unit-dependent; correlation is always bounded between -1 and +1.",
        "Correlation measures causation; covariance measures association.",
        "They are mathematically identical — just different names."
      ],
      ans: 1,
      exp: "Covariance indicates the direction of a linear relationship but its magnitude depends on the units of the variables. The Pearson correlation coefficient standardises this into a unit-free scale from -1 to +1, making it comparable across datasets."
    },
    {
      id: 2,
      q: "A Pearson r = -0.95 indicates:",
      opts: [
        "A weak negative relationship.",
        "No meaningful relationship.",
        "A very strong negative linear relationship.",
        "A strong positive relationship with measurement error."
      ],
      ans: 2,
      exp: "r = -0.95 is very close to -1, indicating an almost perfect strong negative linear relationship — as one variable increases, the other decreases almost proportionally."
    },
    {
      id: 3,
      q: "When should you use Spearman Correlation instead of Pearson Correlation?",
      opts: [
        "When both variables are normally distributed and linearly related.",
        "When data is ordinal, non-normally distributed, or the relationship is monotonic but not linear.",
        "When your dataset has more than 1,000 rows.",
        "When there are no missing values in the dataset."
      ],
      ans: 1,
      exp: "Spearman correlation is a rank-based non-parametric method. It is preferred when data violates normality assumptions, contains outliers, is ordinal-scale, or when the relationship is monotonic but not necessarily linear."
    },
    {
      id: 4,
      q: "A correlation matrix cell shows r = 0.03 between 'Customer Age' and 'Monthly Spend'. What can you conclude?",
      opts: [
        "Older customers spend exactly 3% more each month.",
        "There is virtually no linear relationship between age and spend in this dataset.",
        "The data contains errors and must be re-collected.",
        "Age strongly predicts spend with a 3% margin of error."
      ],
      ans: 1,
      exp: "r ≈ 0 means there is essentially no linear relationship between the two variables in this dataset. It does NOT mean there is no relationship at all — there could be a non-linear pattern."
    },
    {
      id: 5,
      q: "What is the most important warning when interpreting a high correlation coefficient?",
      opts: [
        "A high r always means causation — one variable directly causes the other.",
        "A high r is meaningless for datasets under 100 rows.",
        "Correlation does not imply causation — a third confounding variable may be responsible.",
        "High correlation always results from data entry errors."
      ],
      ans: 2,
      exp: "The golden rule: correlation ≠ causation. Two variables may be highly correlated due to a confounding third variable (e.g. ice cream sales and drowning rates both rise in summer — caused by the confound: hot weather)."
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── THEORY ─── */}
      {activeTab === 'theory' && (
        <Section eyebrow="Day 8 • Relationships Between Variables" title="Covariance & Correlation">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              In Data Analytics, we rarely study variables in isolation. Understanding <strong>how variables move together</strong> is one of the most powerful analytical skills. Two key metrics help us quantify these relationships: <strong>Covariance</strong> and <strong>Correlation</strong>.
            </p>

            <ZoomableImage src={corrImg} alt="Correlation Types — Positive, Negative, None, and Heatmap" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2777', margin: '0 0 0.8rem 0' }}>📦 Covariance</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                  <strong>Definition:</strong> Covariance measures the direction of the linear relationship between two variables. A positive covariance means both variables tend to increase together; a negative covariance means one tends to decrease as the other increases.
                </p>
                <div style={{ background: '#f8fafc', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.8rem' }}>
                  Cov(X,Y) = Σ[(Xᵢ - X̄)(Yᵢ - Ȳ)] / (n - 1)
                </div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                  <strong>Limitation:</strong> Covariance is in the original units of the data (e.g. "₹²" or "kg·cm"), making comparison across different datasets impossible.
                </p>
              </div>

              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2777', margin: '0 0 0.8rem 0' }}>🔗 Correlation Coefficient</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                  <strong>Definition:</strong> Correlation standardises Covariance into a dimensionless scale between <strong>-1 and +1</strong>, making it directly comparable across any dataset.
                </p>
                <div style={{ background: '#f8fafc', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.8rem' }}>
                  r = Cov(X,Y) / (σₓ × σᵧ)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.8rem', marginTop: '0.5rem' }}>
                  {[{ v: 'r = +1', l: 'Perfect Positive', c: '#16a34a', bg: '#f0fdf4' }, { v: 'r = 0', l: 'No Relationship', c: '#64748b', bg: '#f8fafc' }, { v: 'r = -1', l: 'Perfect Negative', c: '#dc2626', bg: '#fef2f2' }].map(i => (
                    <div key={i.v} style={{ background: i.bg, borderRadius: '8px', padding: '0.6rem', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: i.c, fontSize: '1.05rem' }}>{i.v}</div>
                      <div style={{ fontSize: '0.72rem', color: i.c, marginTop: '2px' }}>{i.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2777', margin: '0 0 0.5rem 0' }}>💼 Business Example — Covariance vs Correlation</h3>
                <p style={{ color: '#831843', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                  An e-commerce analyst finds that <em>advertising spend</em> and <em>monthly revenue</em> have a covariance of ₹8,400. Is this large or small? It's impossible to tell without context. But when she calculates Pearson r = +0.91, it's immediately clear: there is a very strong positive linear relationship — every ₹1 increase in ad spend is tightly coupled with a revenue increase.
                </p>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('types')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain the difference between Pearson and Spearman correlation with examples.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── TYPES ─── */}
      {activeTab === 'types' && (
        <Section eyebrow="Correlation Methods" title="Pearson, Spearman & Correlation Matrix">
          <div className="panel">

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Pearson */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#16a34a', margin: '0 0 0.8rem 0' }}>✅ Pearson Correlation (r)</h3>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: '0 0 0.8rem 0' }}>
                  <li><strong>Type:</strong> Parametric — assumes both variables are <em>continuous</em> and approximately <em>normally distributed</em>.</li>
                  <li><strong>What it measures:</strong> Strength and direction of a <em>linear</em> relationship.</li>
                  <li><strong>Sensitive to:</strong> Outliers (a single extreme data point can drastically shift r).</li>
                  <li><strong>Use when:</strong> Data is continuous, roughly normal, with no severe outliers.</li>
                </ul>
                <div style={{ background: '#f0fdf4', padding: '0.7rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.88rem', color: '#14532d' }}>
                  r = Σ[(Xᵢ-X̄)(Yᵢ-Ȳ)] / √[Σ(Xᵢ-X̄)² × Σ(Yᵢ-Ȳ)²]
                </div>
              </div>

              {/* Spearman */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#7c3aed', margin: '0 0 0.8rem 0' }}>🔢 Spearman Rank Correlation (ρ)</h3>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: '0 0 0.8rem 0' }}>
                  <li><strong>Type:</strong> Non-parametric — works on <em>ranks</em>, not raw values.</li>
                  <li><strong>What it measures:</strong> Strength and direction of a <em>monotonic</em> relationship (values consistently increase/decrease together, not necessarily linearly).</li>
                  <li><strong>Robust to:</strong> Outliers, skewed distributions, ordinal data.</li>
                  <li><strong>Use when:</strong> Data is ordinal, non-normal, has outliers, or relationship may be non-linear.</li>
                </ul>
                <div style={{ background: '#f5f3ff', padding: '0.7rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.88rem', color: '#4c1d95' }}>
                  ρ = 1 - (6 × Σd²) / (n × (n² - 1))  where d = rank difference
                </div>
              </div>

              {/* Correlation Matrix / Heatmap */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2777', margin: '0 0 0.8rem 0' }}>🗺️ Correlation Matrix & Heatmap</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  When working with multiple variables, a <strong>correlation matrix</strong> shows all pairwise correlations in a grid. A <strong>heatmap</strong> colour-codes these values (red = strong positive, blue = strong negative, white = near zero) to make patterns instantly visible.
                </p>

                {/* Mini Heatmap Demo */}
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ display: 'inline-block', minWidth: '340px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: `80px repeat(${CORR_MATRIX.labels.length}, 1fr)`, gap: '4px', alignItems: 'center' }}>
                      <div />
                      {CORR_MATRIX.labels.map(l => (
                        <div key={l} style={{ textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#475569', padding: '4px 0' }}>{l}</div>
                      ))}
                      {CORR_MATRIX.values.map((row, r) => (
                        <React.Fragment key={r}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textAlign: 'right', paddingRight: '8px' }}>{CORR_MATRIX.labels[r]}</div>
                          {row.map((val, c) => <HeatmapCell key={c} value={val} row={r} col={c} />)}
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem', fontSize: '0.72rem', justifyContent: 'center' }}>
                      <span>🔴 Strong Positive</span>
                      <span>⬜ Near Zero</span>
                      <span>🔵 Strong Negative</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('playground')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("When would I use Spearman correlation on customer satisfaction survey data?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PLAYGROUND ─── */}
      {activeTab === 'playground' && (
        <Section eyebrow="Interactive Playground" title="Scatter Plot & Correlation Explorer">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Select a correlation preset to see the scatter plot pattern, or enter your own paired data to compute the Pearson r coefficient.
            </p>

            {/* Preset selector */}
            <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 1.2rem 0' }}>📊 Preset Scatter Plot Patterns</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.5rem' }}>
                {playOptions.map(opt => (
                  <button key={opt.key} onClick={() => setPlayDataset(opt.key)}
                    style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: `2px solid ${playDataset === opt.key ? opt.color : '#cbd5e1'}`, background: playDataset === opt.key ? opt.color : '#fff', color: playDataset === opt.key ? '#fff' : '#334155', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}>
                    {opt.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div key={playDataset} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                  <ScatterPlot points={active.pts} r={active.r} label={active.label} color={active.color} />
                </motion.div>
              </div>

              {/* Interpretation card */}
              <div style={{ marginTop: '1.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Pearson r</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: active.color, fontFamily: 'monospace' }}>{active.r.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Strength</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                      {Math.abs(active.r) >= 0.9 ? 'Very Strong' : Math.abs(active.r) >= 0.7 ? 'Strong' : Math.abs(active.r) >= 0.4 ? 'Moderate' : Math.abs(active.r) >= 0.2 ? 'Weak' : 'None'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Direction</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                      {active.r > 0.05 ? '↗ Positive' : active.r < -0.05 ? '↘ Negative' : '— None'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom calculator */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 1.2rem 0' }}>🧮 Custom Pearson r Calculator</h4>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, color: '#1e3a8a', marginBottom: '4px', fontSize: '0.9rem' }}>X values (comma-separated):</label>
                  <input type="text" value={customX} onChange={e => setCustomX(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1.5px solid #bfdbfe', fontSize: '0.95rem', color: '#0f172a', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, color: '#1e3a8a', marginBottom: '4px', fontSize: '0.9rem' }}>Y values (comma-separated):</label>
                  <input type="text" value={customY} onChange={e => setCustomY(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1.5px solid #bfdbfe', fontSize: '0.95rem', color: '#0f172a', boxSizing: 'border-box' }} />
                </div>
              </div>
              <button className="btn btn-primary" style={{ background: '#2563eb', borderColor: '#2563eb' }} onClick={calcCustomR}>Calculate r</button>
              {customR !== null && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1.2rem', background: '#fff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 600 }}>Pearson r</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: customR >= 0 ? '#16a34a' : '#dc2626', fontFamily: 'monospace' }}>{customR}</div>
                  </div>
                  <div style={{ color: '#1e3a8a', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <strong>Interpretation:</strong><br />
                    {Math.abs(customR) >= 0.9 ? 'Very strong' : Math.abs(customR) >= 0.7 ? 'Strong' : Math.abs(customR) >= 0.4 ? 'Moderate' : Math.abs(customR) >= 0.2 ? 'Weak' : 'No'}{' '}
                    {customR > 0.05 ? 'positive' : customR < -0.05 ? 'negative' : 'linear'} relationship
                  </div>
                </motion.div>
              )}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('programming')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What does an r value of 0.7 mean in a business context?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PROGRAMMING ─── */}
      {activeTab === 'programming' && (
        <Section eyebrow="Hands-On Programming" title="Python Code — Correlation & Heatmap">
          <div className="panel">

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>📐 Manual Pearson r — Step by Step</h3>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ color: '#facc15', margin: 0 }}># Dataset: Advertising Spend (X) vs Revenue (Y)</p>
              <p style={{ color: '#e2e8f0', margin: '0.2rem 0' }}>X = [10, 20, 30, 40, 50]   Y = [12, 19, 29, 38, 51]</p>
              <br />
              <p style={{ color: '#facc15', margin: 0 }}># Step 1: Compute Means</p>
              <p style={{ color: '#e2e8f0', margin: '0.2rem 0' }}>X̄ = (10+20+30+40+50)/5 = 30</p>
              <p style={{ color: '#e2e8f0', margin: '0.2rem 0' }}>Ȳ = (12+19+29+38+51)/5 = 29.8</p>
              <br />
              <p style={{ color: '#facc15', margin: 0 }}># Step 2: Compute Σ(Xᵢ-X̄)(Yᵢ-Ȳ) = 1000.0</p>
              <p style={{ color: '#facc15', margin: '0.4rem 0 0 0' }}># Step 3: Compute Σ(Xᵢ-X̄)² = 1000,  Σ(Yᵢ-Ȳ)² = 1002.8</p>
              <p style={{ color: '#10b981', margin: '0.4rem 0 0 0' }}># r = 1000 / √(1000 × 1002.8) ≈ 0.9993  → Very strong positive!</p>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python Correlation Script</h3>
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> correlation.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import math

# --- Pearson Correlation (manual, no libraries) ---
def pearson_r(x, y):
    n = min(len(x), len(y))
    x, y = x[:n], y[:n]
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denom = math.sqrt(
        sum((v - mean_x) ** 2 for v in x) *
        sum((v - mean_y) ** 2 for v in y)
    )
    return numerator / denom if denom != 0 else 0

# --- Spearman Rank Correlation (manual) ---
def rank_data(data):
    sorted_vals = sorted(enumerate(data), key=lambda x: x[1])
    ranks = [0] * len(data)
    for rank, (original_idx, _) in enumerate(sorted_vals, start=1):
        ranks[original_idx] = rank
    return ranks

def spearman_rho(x, y):
    rx, ry = rank_data(x), rank_data(y)
    return pearson_r(rx, ry)  # Spearman = Pearson on ranks

# --- Example datasets ---
adspend = [10, 20, 30, 40, 50, 60]
revenue = [12, 19, 29, 38, 52, 61]
rating  = [3, 1, 4, 2, 5, 6]    # Ordinal rank data

r_pearson  = pearson_r(adspend, revenue)
rho_spear  = spearman_rho(adspend, revenue)
rho_rating = spearman_rho(adspend, rating)

print(f"Pearson r (ad spend vs revenue):     {r_pearson:.4f}")
print(f"Spearman rho (ad spend vs revenue):  {rho_spear:.4f}")
print(f"Spearman rho (ad spend vs rating):   {rho_rating:.4f}")

# --- Correlation Matrix (2 variables) ---
variables = {'AdSpend': adspend, 'Revenue': revenue}
print("\\n=== Correlation Matrix ===")
for name1, v1 in variables.items():
    for name2, v2 in variables.items():
        print(f"  {name1} vs {name2}: r = {pearson_r(v1, v2):.4f}")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Console Output</h4>
              <pre style={{ margin: 0, color: '#1e40af', fontFamily: 'monospace', fontSize: '0.88rem' }}>{`Pearson r (ad spend vs revenue):     0.9993
Spearman rho (ad spend vs revenue):  1.0000
Spearman rho (ad spend vs rating):   0.6571

=== Correlation Matrix ===
  AdSpend vs AdSpend: r = 1.0000
  AdSpend vs Revenue: r = 0.9993
  Revenue vs AdSpend: r = 0.9993
  Revenue vs Revenue: r = 1.0000`}</pre>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How do I build a full correlation heatmap with colour coding using pandas and matplotlib?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 8 Assessment" title="Day 8 Assessment & Review">
          <div className="panel">

            {/* Warning box */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Critical Pitfalls in Correlation Analysis
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Correlation ≠ Causation:</strong> Ice cream sales and drowning deaths are strongly positively correlated — both are driven by hot weather (a confounding variable), not by each other.</li>
                <li><strong>Using Pearson on non-normal data:</strong> Applying Pearson r to severely skewed or ordinal data gives misleading results. Always check normality assumptions first; use Spearman when in doubt.</li>
                <li><strong>Ignoring non-linear relationships:</strong> r measures only linear associations. Two variables with a strong U-shaped curve may show r ≈ 0, incorrectly suggesting no relationship.</li>
                <li><strong>Spurious correlations in big data:</strong> With thousands of variables, random correlations appear by chance. Always validate with domain knowledge and statistical significance testing.</li>
              </ul>
            </div>

            {/* Quiz */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <CheckCircle size={22} color="#db2777" /> Interactive Quiz
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <p style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem' }}>{idx + 1}. {q.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.opts.map((opt, oi) => {
                        const sel = selectedAnswers[q.id] === oi;
                        return (
                          <label key={oi} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: sel ? '2px solid #db2777' : '1px solid #cbd5e1', background: sel ? '#fdf2f8' : '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
                            <input type="radio" name={`q-${q.id}`} checked={sel} onChange={() => handleSelectOption(q.id, oi)} style={{ accentColor: '#db2777' }} />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                    {selectedAnswers[q.id] !== undefined && !checkedQuestions[q.id] && (
                      <button className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.82rem' }} onClick={() => handleCheckQuestion(q.id)}>Check Answer</button>
                    )}
                    {checkedQuestions[q.id] && (
                      <div style={{ marginTop: '1.2rem', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid', borderColor: selectedAnswers[q.id] === q.ans ? '#16a34a' : '#dc2626', background: selectedAnswers[q.id] === q.ans ? '#f0fdf4' : '#fef2f2' }}>
                        <strong style={{ color: selectedAnswers[q.id] === q.ans ? '#15803d' : '#b91c1c', display: 'block', marginBottom: '0.3rem' }}>{selectedAnswers[q.id] === q.ans ? 'Correct! ✓' : 'Incorrect ✗'}</strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{q.exp}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={checkFinalScore}>Verify Final Score</button>
                {score !== null && <strong style={{ color: '#db2777', fontSize: '1.2rem' }}>Score: {score} / {quizQuestions.length}</strong>}
              </div>
            </div>

            {/* Assignment */}
            <div style={{ background: '#fdf2f8', padding: '2rem', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
              <h3 style={{ color: '#db2777', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <HelpCircle size={22} /> Homework Assignment
              </h3>
              <ul style={{ color: '#831843', lineHeight: 1.9, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li><strong>Task 1:</strong> You have X = [5, 10, 15, 20, 25] and Y = [50, 45, 38, 32, 28]. Calculate the Pearson r manually step-by-step and state whether it is positive or negative correlation and how strong.</li>
                <li><strong>Task 2:</strong> Explain in your own words why a researcher studying customer satisfaction ratings (1–5 stars, ordinal data) should use Spearman rather than Pearson correlation.</li>
                <li><strong>Task 3:</strong> A data science team finds r = 0.92 between shoe size and salary in a company dataset. Does this mean having a larger shoe size causes higher salary? Explain fully.</li>
                <li><strong>Task 4:</strong> Write a raw Python function (no external libraries) that computes the Spearman rank correlation between two lists of numbers.</li>
                <li><strong>Task 5:</strong> Design a business scenario where building a 4-variable correlation matrix (e.g. Price, Units Sold, Marketing Spend, Customer Reviews) would provide actionable insights. Describe what you would look for in the heatmap.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 8 of Statistics! 🎉')}>
                Submit & Complete Day 8 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
