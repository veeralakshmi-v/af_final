import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';
import distImg from '../../assets/distribution_shapes_diagram.png';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
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
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        const rx = /(#[^\n]*)|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?:\b(import|from|as|return|if|else|for|while|in|def|class|and|or|not|is|None|True|False|lambda|with|pass|break|continue|raise|try|except|finally)\b)|(?:\b(print|len|sum|range|sorted|min|max|enumerate|zip|map|filter|round|abs|int|float|str|list|dict|set|tuple)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        let lastIdx = 0;
        while ((m = rx.exec(line)) !== null) {
          if (m.index > lastIdx) tokens.push(<span key={k++} style={{ color: '#e1e4e8' }}>{line.slice(lastIdx, m.index)}</span>);
          const [tok, comment, str, kw, builtin, num, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment)       color = '#8b949e';
          else if (str)      color = '#a5d6ff';
          else if (kw)     { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (builtin)  color = '#ffb454';
          else if (num)      color = '#79c0ff';
          else if (sym)      color = '#ff7b72';
          tokens.push(<span key={k++} style={{ color, fontWeight }}>{tok}</span>);
          lastIdx = m.index + tok.length;
        }
        if (lastIdx < line.length) tokens.push(<span key={k++} style={{ color: '#e1e4e8' }}>{line.slice(lastIdx)}</span>);
        return <div key={lineIdx} style={{ whiteSpace: 'pre' }}>{tokens.length > 0 ? tokens : line}</div>;
      })}
    </div>
  );
};

const ZoomableImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <img src={src} alt={alt} onClick={() => setIsOpen(true)}
          style={{ maxWidth: '280px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1', cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = '#db2777'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        />
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>🔍 Click image to zoom / view full size</span>
      </div>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, cursor: 'zoom-out', padding: '1.5rem' }}>
          <div style={{ position: 'relative', maxWidth: '90%' }}>
            <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '2px solid #334155' }} />
            <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Click anywhere to close</span>
          </div>
        </div>
      )}
    </>
  );
};

// Pure CSS Bell Curve Component
const BellCurve = ({ mean, std, color, label, width = 400, height = 120 }) => {
  const points = useMemo(() => {
    const pts = [];
    const steps = 80;
    const xMin = mean - 4 * std;
    const xMax = mean + 4 * std;
    let maxY = 0;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
      if (y > maxY) maxY = y;
      pts.push({ x, y });
    }
    // Normalise to canvas coords
    return pts.map(p => ({
      cx: ((p.x - xMin) / (xMax - xMin)) * (width - 20) + 10,
      cy: height - 10 - (p.y / maxY) * (height - 20)
    }));
  }, [mean, std, width, height]);

  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(' ');
  const fill = `${d} L${points[points.length - 1].cx},${height - 10} L${points[0].cx},${height - 10} Z`;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <path d={fill} fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2.5" />
      <text x={width / 2} y={height + 18} textAnchor="middle" fontSize="11" fill={color} fontWeight="bold">{label}</text>
    </svg>
  );
};

// Skewness Illustration
const SkewDiagram = ({ type }) => {
  const isRight = type === 'right';
  const pts = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let y;
    if (isRight) {
      // right-skewed: peak near left
      y = Math.exp(-Math.pow((t - 0.25) * 6, 2)) + 0.2 * Math.exp(-Math.pow((t - 0.7) * 2.5, 2));
    } else {
      // left-skewed: peak near right
      y = Math.exp(-Math.pow((t - 0.75) * 6, 2)) + 0.2 * Math.exp(-Math.pow((t - 0.3) * 2.5, 2));
    }
    pts.push({ cx: t * 260 + 10, cy: 80 - y * 65 });
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(' ');
  const fill = `${d} L${pts[pts.length - 1].cx},80 L${pts[0].cx},80 Z`;
  const color = isRight ? '#f97316' : '#8b5cf6';

  // Approximate positions for mean/median/mode
  const modeX = isRight ? 80 : 200;
  const medX = isRight ? 120 : 160;
  const meanX = isRight ? 160 : 120;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <svg width="280" height="100" style={{ overflow: 'visible' }}>
        <path d={fill} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" />
        {/* Mode */}
        <line x1={modeX} y1="0" x2={modeX} y2="80" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,3" />
        {/* Median */}
        <line x1={medX} y1="0" x2={medX} y2="80" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4,3" />
        {/* Mean */}
        <line x1={meanX} y1="0" x2={meanX} y2="80" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={modeX} y={-5} textAnchor="middle" fontSize="9" fill="#16a34a" fontWeight="bold">Mode</text>
        <text x={medX} y={isRight ? 90 : -5} textAnchor="middle" fontSize="9" fill="#2563eb" fontWeight="bold">Median</text>
        <text x={meanX} y={isRight ? -5 : 90} textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">Mean</text>
      </svg>
      <span style={{ fontSize: '0.82rem', fontWeight: 700, color }}>
        {isRight ? '➡️ Positive (Right) Skew' : '⬅️ Negative (Left) Skew'}
      </span>
      <span style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', maxWidth: '240px' }}>
        {isRight ? 'Long tail on the right. Mean > Median > Mode' : 'Long tail on the left. Mean < Median < Mode'}
      </span>
    </div>
  );
};

export default function StatsDay7({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Interactive Bell Curve state
  const [skewType, setSkewType] = useState('normal'); // 'normal', 'right', 'left'
  const [kurtType, setKurtType] = useState('meso');   // 'meso', 'lepto', 'platy'

  const handleContinue = (next) => {
    onNavigate('stats_day7', next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurveParams = () => {
    // std controls kurtosis shape visually
    const stdMap = { meso: 1, lepto: 0.6, platy: 1.7 };
    const std = stdMap[kurtType];
    // mean offset controls skew illusion
    const meanMap = { normal: 0, right: 0.8, left: -0.8 };
    const meanOffset = meanMap[skewType];
    return { mean: meanOffset, std };
  };

  const quizQuestions = [
    {
      id: 1,
      q: "What are the three defining properties of a Normal Distribution?",
      opts: [
        "Asymmetric, bimodal, heavy-tailed",
        "Symmetric, bell-shaped, mean = median = mode",
        "Right-skewed, zero variance, uniform",
        "Discrete, bounded, and always positive"
      ],
      ans: 1,
      exp: "A Normal Distribution is perfectly symmetric around its mean. Because of this symmetry, the mean, median, and mode are all equal and lie at the centre of the bell curve."
    },
    {
      id: 2,
      q: "In a positively (right) skewed distribution, which relationship between measures of central tendency is correct?",
      opts: [
        "Mean < Median < Mode",
        "Mean = Median = Mode",
        "Mean > Median > Mode",
        "Mode > Mean > Median"
      ],
      ans: 2,
      exp: "A right-skewed (positive) distribution has a long tail pulling to the right. The outlier-sensitive Mean is dragged rightmost, so Mean > Median > Mode."
    },
    {
      id: 3,
      q: "Which Kurtosis type has heavier tails and a sharper, taller peak than the normal distribution?",
      opts: [
        "Platykurtic",
        "Mesokurtic",
        "Leptokurtic",
        "Bimodal"
      ],
      ans: 2,
      exp: "Leptokurtic distributions (excess kurtosis > 0) have fatter tails and a higher, sharper central peak compared to a normal distribution, indicating more extreme outlier events."
    },
    {
      id: 4,
      q: "For a standard normal distribution, approximately what percentage of data falls within one standard deviation of the mean (between μ-σ and μ+σ)?",
      opts: [
        "50%",
        "68%",
        "95%",
        "99.7%"
      ],
      ans: 1,
      exp: "The 68-95-99.7 Empirical Rule states that ~68% of data falls within ±1σ, ~95% within ±2σ, and ~99.7% within ±3σ of the mean in a normal distribution."
    },
    {
      id: 5,
      q: "A dataset of exam scores has skewness = -1.8. What does this tell us?",
      opts: [
        "Most students scored very low, with a long tail of high scores.",
        "The distribution is perfectly symmetric.",
        "Most students scored very high, with a few very low outlier scores pulling the tail left.",
        "There are no outliers in the dataset."
      ],
      ans: 2,
      exp: "Negative skewness means the tail extends to the left. Most observations cluster on the right (high values) while a few extreme low values drag the mean downward."
    }
  ];

  const handleSelectOption = (qId, optionIdx) => setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  const checkFinalScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) correct++; });
    setScore(correct);
  };

  const { mean, std } = getCurveParams();

  return (
    <AnimatePresence mode="wait">

      {/* ─── THEORY: Normal Distribution ─── */}
      {activeTab === 'theory' && (
        <Section key="theory" eyebrow="Day 7 • Distribution Analysis" title="Normal Distribution & the Bell Curve">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              The <strong>Normal Distribution</strong> (also called the Gaussian Distribution) is the most fundamental and widely used probability distribution in statistics. Its signature symmetric bell-shaped curve naturally emerges whenever many independent random factors add up — from human heights and exam scores to stock return fluctuations and machine part tolerances.
            </p>

            <ZoomableImage src={distImg} alt="Distribution Shapes — Skewness and Kurtosis" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2777', margin: '0 0 0.8rem 0' }}>📐 Key Properties of the Normal Distribution</h3>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.9, margin: 0 }}>
                  <li><strong>Symmetry:</strong> The left and right halves are perfect mirror images around the mean.</li>
                  <li><strong>Mean = Median = Mode:</strong> All three central tendency measures coincide at the peak.</li>
                  <li><strong>Asymptotic Tails:</strong> The curve approaches — but never touches — the x-axis at extremes.</li>
                  <li><strong>Defined by only 2 parameters:</strong> Mean (μ) and Standard Deviation (σ).</li>
                  <li><strong>Total area under curve = 1:</strong> (i.e. 100% of probability is accounted for).</li>
                </ul>
              </div>

              <div style={{ padding: '1.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px' }}>
                <h3 style={{ color: '#1d4ed8', margin: '0 0 0.8rem 0' }}>📊 The 68–95–99.7 Empirical Rule</h3>
                <p style={{ color: '#1e3a8a', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  For any normally distributed dataset:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                  {[
                    { range: 'μ ± 1σ', pct: '~68%', bg: '#dbeafe' },
                    { range: 'μ ± 2σ', pct: '~95%', bg: '#bfdbfe' },
                    { range: 'μ ± 3σ', pct: '~99.7%', bg: '#93c5fd' },
                  ].map(r => (
                    <div key={r.range} style={{ background: r.bg, borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1e40af', fontSize: '1rem' }}>{r.range}</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1d4ed8', marginTop: '4px' }}>{r.pct}</div>
                      <div style={{ fontSize: '0.75rem', color: '#3b82f6' }}>of data</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2777', margin: '0 0 0.5rem 0' }}>💼 Business Example</h3>
                <p style={{ color: '#831843', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  A call centre measures agent handle times. If handle times are normally distributed with μ = 8 min and σ = 2 min, then approximately 95% of all calls take between 4 and 12 minutes. This allows managers to confidently staff teams knowing only 5% of calls will be extreme outliers.
                </p>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('skewness')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between a standard normal distribution and a general normal distribution?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── SKEWNESS ─── */}
      {activeTab === 'skewness' && (
        <Section key="skewness" eyebrow="Distribution Geometry" title="Skewness — Measuring Asymmetry">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Skewness</strong> measures the degree of asymmetry of a distribution relative to its mean. A perfectly symmetric distribution has skewness = 0. Real-world datasets are often skewed, which profoundly influences which average (mean vs. median) better represents the data.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem', justifyItems: 'center' }}>
              <SkewDiagram type="right" />
              <SkewDiagram type="left" />
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', borderLeft: '4px solid #f97316' }}>
                <strong style={{ color: '#c2410c', fontSize: '1rem' }}>➡️ Positive (Right) Skewness — Skewness &gt; 0</strong>
                <p style={{ color: '#9a3412', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.4rem 0 0 0' }}>
                  Long tail extends <em>right</em>. A few unusually high values drag the mean above the median.<br />
                  <strong>Formula:</strong> Skewness = (Mean − Mode) / Standard Deviation<br />
                  <strong>Business Example:</strong> Income distributions — most people earn a moderate salary, but a handful of billionaires create a long right tail, pulling the national average income far above the median.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', borderLeft: '4px solid #8b5cf6' }}>
                <strong style={{ color: '#6d28d9', fontSize: '1rem' }}>⬅️ Negative (Left) Skewness — Skewness &lt; 0</strong>
                <p style={{ color: '#5b21b6', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.4rem 0 0 0' }}>
                  Long tail extends <em>left</em>. A few extremely low values drag the mean below the median.<br />
                  <strong>Business Example:</strong> Age at retirement in early retirement programmes — most people retire in their late 60s, but a few early-retirees at age 45 pull the mean lower.
                </p>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('kurtosis')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How do I detect skewness in a dataset using Python without importing scipy?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── KURTOSIS ─── */}
      {activeTab === 'kurtosis' && (
        <Section key="kurtosis" eyebrow="Distribution Geometry" title="Kurtosis — Measuring Tail Weight">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Kurtosis</strong> measures the "tailedness" of a distribution — how extreme the outliers are relative to a normal distribution. High kurtosis means heavier tails with more frequent extreme values; low kurtosis means lighter tails with rare extremes.
            </p>

            {/* Visual comparison */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ color: '#0f172a', margin: 0 }}>Visual Kurtosis Comparison</h4>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0', position: 'relative' }}>
                <BellCurve mean={0} std={0.6} color="#3b82f6" label="Leptokurtic (narrow, tall)" width={300} height={130} />
                <BellCurve mean={0} std={1.0} color="#16a34a" label="Mesokurtic (normal)" width={300} height={130} />
                <BellCurve mean={0} std={1.7} color="#f97316" label="Platykurtic (wide, flat)" width={300} height={130} />
              </div>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.78rem' }}>
                <span style={{ color: '#3b82f6' }}>● Leptokurtic: Excess Kurtosis &gt; 0</span>
                <span style={{ color: '#16a34a' }}>● Mesokurtic: Excess Kurtosis = 0</span>
                <span style={{ color: '#f97316' }}>● Platykurtic: Excess Kurtosis &lt; 0</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { title: '🔵 Mesokurtic', sub: 'Excess Kurtosis = 0', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', body: 'The standard normal distribution. Benchmark for comparison. Tails and peak are "just right". Example: standardized IQ scores.' },
                { title: '🔷 Leptokurtic', sub: 'Excess Kurtosis > 0', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', body: 'Sharper peak, heavier tails. More extreme events than normal. Financial returns (stock markets) are famously leptokurtic — "fat tails" cause market crashes more often than a normal distribution predicts.' },
                { title: '🟠 Platykurtic', sub: 'Excess Kurtosis < 0', color: '#c2410c', bg: '#fff7ed', border: '#fed7aa', body: 'Flatter peak, lighter tails. Fewer extreme values. Example: uniform dice rolls — each value between 1–6 has equal probability with no central clustering.' },
              ].map(k => (
                <div key={k.title} style={{ padding: '1.2rem', background: k.bg, border: `1px solid ${k.border}`, borderRadius: '10px' }}>
                  <strong style={{ color: k.color, display: 'block', marginBottom: '4px' }}>{k.title}</strong>
                  <code style={{ fontSize: '0.8rem', color: k.color, display: 'block', marginBottom: '8px' }}>{k.sub}</code>
                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>{k.body}</p>
                </div>
              ))}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('playground')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Why do financial asset returns exhibit leptokurtosis (fat tails)?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PLAYGROUND: Interactive Bell Curve ─── */}
      {activeTab === 'playground' && (
        <Section key="playground" eyebrow="Interactive Simulator" title="Interactive Distribution Visualiser">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Choose a <strong>skewness</strong> and <strong>kurtosis</strong> profile to see how the bell curve shape changes in real-time.
            </p>

            <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>

              {/* Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '0.8rem' }}>Skewness Type:</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { val: 'left',   label: '⬅️ Negative (Left) Skew',  color: '#8b5cf6' },
                      { val: 'normal', label: '⬆️ Symmetric (Normal)',     color: '#16a34a' },
                      { val: 'right',  label: '➡️ Positive (Right) Skew', color: '#f97316' },
                    ].map(opt => (
                      <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '0.6rem 1rem', borderRadius: '8px', border: skewType === opt.val ? `2px solid ${opt.color}` : '1px solid #cbd5e1', background: skewType === opt.val ? '#fdf2f8' : '#fff', fontWeight: skewType === opt.val ? 700 : 400, color: skewType === opt.val ? opt.color : '#334155' }}>
                        <input type="radio" name="skew" value={opt.val} checked={skewType === opt.val} onChange={() => setSkewType(opt.val)} style={{ accentColor: opt.color }} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '0.8rem' }}>Kurtosis Type:</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { val: 'lepto', label: '🔷 Leptokurtic (tall & narrow)', color: '#3b82f6' },
                      { val: 'meso',  label: '✅ Mesokurtic (normal)',          color: '#16a34a' },
                      { val: 'platy', label: '🟠 Platykurtic (flat & wide)',    color: '#f97316' },
                    ].map(opt => (
                      <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '0.6rem 1rem', borderRadius: '8px', border: kurtType === opt.val ? `2px solid ${opt.color}` : '1px solid #cbd5e1', background: kurtType === opt.val ? '#eff6ff' : '#fff', fontWeight: kurtType === opt.val ? 700 : 400, color: kurtType === opt.val ? opt.color : '#334155' }}>
                        <input type="radio" name="kurt" value={opt.val} checked={kurtType === opt.val} onChange={() => setKurtType(opt.val)} style={{ accentColor: opt.color }} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Curve */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                <motion.div key={`${skewType}-${kurtType}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
                  <BellCurve
                    mean={mean}
                    std={std}
                    color="#db2777"
                    label={`${skewType === 'normal' ? 'Symmetric' : skewType === 'right' ? 'Right-Skewed' : 'Left-Skewed'} + ${kurtType === 'meso' ? 'Mesokurtic' : kurtType === 'lepto' ? 'Leptokurtic' : 'Platykurtic'}`}
                    width={480}
                    height={150}
                  />
                </motion.div>
              </div>

              {/* Live stats panel */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {[
                  { label: 'Skewness', val: skewType === 'normal' ? '0 (Symmetric)' : skewType === 'right' ? '> 0 (Positive)' : '< 0 (Negative)' },
                  { label: 'Excess Kurtosis', val: kurtType === 'meso' ? '= 0' : kurtType === 'lepto' ? '> 0 (Fat tails)' : '< 0 (Light tails)' },
                  { label: 'Mean vs Median', val: skewType === 'normal' ? 'Equal' : skewType === 'right' ? 'Mean > Median' : 'Mean < Median' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '8px', padding: '0.8rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9d174d', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
                    <div style={{ fontSize: '0.9rem', color: '#db2777', fontWeight: 700, marginTop: '4px' }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How do I produce a bell curve visualisation using matplotlib in Python?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section key="assessment" eyebrow="Day 7 Assessment" title="Day 7 Assessment & Review">
          <div className="panel">

            {/* Python Example */}
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python Visualisation Example</h3>
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> distributions.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import math

# --- Normal Distribution PDF ---
def normal_pdf(x, mean, std):
    coefficient = 1 / (std * math.sqrt(2 * math.pi))
    exponent = -0.5 * ((x - mean) / std) ** 2
    return coefficient * math.exp(exponent)

# --- Skewness (Pearson's 1st coefficient) ---
def calc_skewness(data):
    n = len(data)
    mean = sum(data) / n
    std = math.sqrt(sum((x - mean) ** 2 for x in data) / n)
    if std == 0:
        return 0
    return (3 * (mean - sorted(data)[n // 2])) / std  # Median approx

# --- Example usage ---
data = [12, 15, 18, 22, 25, 29, 31, 35, 42, 48, 85]

mean = sum(data) / len(data)
std  = math.sqrt(sum((x - mean) ** 2 for x in data) / len(data))

print(f"Mean: {mean:.2f}")
print(f"Std Dev: {std:.2f}")
print(f"Skewness (approx): {calc_skewness(data):.3f}")

# PDF values at key points
for x in [mean - std, mean, mean + std]:
    print(f"PDF at x={x:.1f}: {normal_pdf(x, mean, std):.5f}")`} />
            </div>

            {/* Common Pitfalls */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Distribution Mistakes
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Assuming Normality blindly:</strong> Just because data is continuous does not mean it is normally distributed. Always check with visualisations (histogram, Q-Q plot) before applying normal distribution formulas.</li>
                <li><strong>Confusing Skewness direction:</strong> Right-skewed does NOT mean the peak is on the right — it means the tail extends to the right.</li>
                <li><strong>Ignoring Kurtosis in risk modeling:</strong> Using a normal distribution assumption in financial risk models while ignoring leptokurtosis leads to severe under-estimation of tail risks (as seen in the 2008 financial crisis).</li>
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
                      {q.opts.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        return (
                          <label key={optIdx} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: isSelected ? '2px solid #db2777' : '1px solid #cbd5e1', background: isSelected ? '#fdf2f8' : '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
                            <input type="radio" name={`q-${q.id}`} checked={isSelected} onChange={() => handleSelectOption(q.id, optIdx)} style={{ accentColor: '#db2777' }} />
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
                <li><strong>Task 1:</strong> Draw a rough sketch of (a) a positively skewed distribution and (b) a negatively skewed distribution. Label where Mean, Median, and Mode fall on each.</li>
                <li><strong>Task 2:</strong> A dataset has skewness = +2.3. What does this value tell you about the shape of the data and the likely relationship between Mean, Median, and Mode?</li>
                <li><strong>Task 3:</strong> Write a Python function <code>normal_pdf(x, mean, std)</code> that computes the probability density of the normal distribution at a given x value without using any external library.</li>
                <li><strong>Task 4:</strong> Research the term "68-95-99.7 Rule". Write three real-world business scenarios where this rule is directly applied.</li>
                <li><strong>Task 5:</strong> Explain with an example why a financial risk analyst should prefer using a Leptokurtic model over a Normal distribution model when forecasting rare extreme market events.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 7! 🎉')}>
                Submit & Complete Day 7 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
