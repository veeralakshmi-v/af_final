import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal, RefreshCw } from 'lucide-react';
import cltImg from '../../assets/probability_clt_diagram.png';

/* ─── Shared helpers ─── */
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
  <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: '8px', padding: '0.7rem 1rem', fontFamily: 'monospace', fontSize: '0.92rem', color, margin: '0.5rem 0', fontWeight: 600 }}>
    {children}
  </div>
);

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.88rem', overflowX: 'auto' }}>
      {lines.map((line, li) => {
        const rx = /(#[^\n]*)|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?:\b(import|from|as|return|if|else|for|while|in|def|class|and|or|not|is|None|True|False)\b)|(?:\b(print|len|sum|range|sorted|min|max|round|abs|int|float|str|list|dict|random|append|math|sqrt)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
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

/* ─── SVG Mini Bell Curve ─── */
const MiniCurve = ({ std, color, label, W = 140, H = 60 }) => {
  const pts = useMemo(() => {
    const steps = 50;
    const xMin = -4 * std, xMax = 4 * std;
    const arr = [];
    let maxY = 0;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = Math.exp(-0.5 * (x / std) ** 2);
      if (y > maxY) maxY = y;
      arr.push({ x, y });
    }
    return arr.map(p => ({
      cx: ((p.x - xMin) / (xMax - xMin)) * (W - 10) + 5,
      cy: H - 5 - (p.y / maxY) * (H - 14),
    }));
  }, [std, W, H]);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(' ');
  const fill = `${d} L${pts[pts.length - 1].cx},${H - 5} L${pts[0].cx},${H - 5} Z`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg width={W} height={H}>
        <path d={fill} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      </svg>
      <span style={{ fontSize: '0.72rem', color, fontWeight: 700, textAlign: 'center' }}>{label}</span>
    </div>
  );
};

/* ─── CLT Simulator ─── */
const seededRand = (seed) => {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
};

const generateSkewedPop = (size, rng) =>
  Array.from({ length: size }, () => Math.floor(-Math.log(1 - rng()) * 8) + 1);

const CLTSimulator = () => {
  const [n, setN] = useState(30);
  const [numSamples, setNumSamples] = useState(200);
  const [popType, setPopType] = useState('skewed');
  const [seed, setSeed] = useState(42);

  const { means, popMean, popStd, se } = useMemo(() => {
    const rng = seededRand(seed * 1000 + n * 7 + numSamples * 3);
    const population = popType === 'skewed'
      ? generateSkewedPop(10000, rng)
      : Array.from({ length: 10000 }, () => Math.floor(rng() * 100) + 1);
    const pm = population.reduce((a, b) => a + b, 0) / population.length;
    const pv = population.reduce((s, x) => s + (x - pm) ** 2, 0) / population.length;
    const ps = Math.sqrt(pv);
    const calcSE = +(ps / Math.sqrt(n)).toFixed(3);

    const sampleMeans = Array.from({ length: numSamples }, () => {
      let sum = 0;
      for (let i = 0; i < n; i++) sum += population[Math.floor(rng() * population.length)];
      return +(sum / n).toFixed(2);
    });
    return { means: sampleMeans, popMean: +pm.toFixed(2), popStd: +ps.toFixed(2), se: calcSE };
  }, [n, numSamples, popType, seed]);

  // Build histogram bins
  const histogram = useMemo(() => {
    if (!means.length) return [];
    const min = Math.min(...means), max = Math.max(...means);
    const bins = 20;
    const width = (max - min) / bins || 1;
    const counts = Array(bins).fill(0);
    means.forEach(v => {
      const b = Math.min(Math.floor((v - min) / width), bins - 1);
      counts[b]++;
    });
    const maxCount = Math.max(...counts);
    return counts.map((c, i) => ({ x: min + i * width, count: c, height: c / maxCount }));
  }, [means]);

  const meanOfMeans = +(means.reduce((a, b) => a + b, 0) / means.length).toFixed(3);
  const sdOfMeans = +(Math.sqrt(means.reduce((s, x) => s + (x - meanOfMeans) ** 2, 0) / means.length)).toFixed(3);

  const BAR_W = 12, CHART_H = 120, CHART_W = histogram.length * (BAR_W + 2);

  return (
    <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '1.8rem' }}>
      <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>🔬 Central Limit Theorem Simulator</h4>
      <p style={{ color: '#64748b', fontSize: '0.83rem', margin: '0 0 1.5rem 0' }}>
        Draw many samples from a non-normal population. Watch the distribution of <em>sample means</em> become increasingly normal as n grows.
      </p>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px' }}>
            Population Type:
          </label>
          {[{ v: 'skewed', l: '📉 Right-Skewed (Exponential)' }, { v: 'uniform', l: '📊 Uniform (Flat)' }].map(opt => (
            <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.83rem', color: popType === opt.v ? '#db2777' : '#475569', fontWeight: popType === opt.v ? 700 : 400 }}>
              <input type="radio" name="popType" checked={popType === opt.v} onChange={() => setPopType(opt.v)} style={{ accentColor: '#db2777' }} />
              {opt.l}
            </label>
          ))}
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px' }}>
            Sample Size (n): <span style={{ color: '#db2777' }}>{n}</span>
          </label>
          <input type="range" min="2" max="100" value={n} onChange={e => setN(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}><span>n=2</span><span>n=30 (CLT kicks in)</span><span>n=100</span></div>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.85rem', marginBottom: '6px' }}>
            # Samples: <span style={{ color: '#db2777' }}>{numSamples}</span>
          </label>
          <input type="range" min="50" max="500" step="50" value={numSamples} onChange={e => setNumSamples(Number(e.target.value))} style={{ width: '100%', accentColor: '#db2777' }} />
          <button onClick={() => setSeed(s => s + 1)} style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: '#db2777', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
            <RefreshCw size={13} /> Resample
          </button>
        </div>
      </div>

      {/* Histogram */}
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1rem', border: '1px solid #e2e8f0', overflowX: 'auto', marginBottom: '1rem' }}>
        <p style={{ color: '#475569', fontSize: '0.78rem', margin: '0 0 8px 0', fontWeight: 600 }}>
          Distribution of {numSamples} Sample Means (n={n}) — {popType === 'skewed' ? 'from right-skewed population' : 'from uniform population'}
        </p>
        <svg width={Math.max(CHART_W, 300)} height={CHART_H + 20} style={{ overflow: 'visible' }}>
          {histogram.map((bin, i) => (
            <g key={i}>
              <rect
                x={i * (BAR_W + 2)}
                y={CHART_H - bin.height * (CHART_H - 10)}
                width={BAR_W}
                height={bin.height * (CHART_H - 10)}
                fill={n >= 30 ? '#db2777' : '#f97316'}
                fillOpacity="0.8"
                rx="2"
              />
            </g>
          ))}
          <line x1="0" y1={CHART_H} x2={Math.max(CHART_W, 300)} y2={CHART_H} stroke="#cbd5e1" strokeWidth="1" />
        </svg>
        <p style={{ color: '#94a3b8', fontSize: '0.7rem', margin: '4px 0 0 0' }}>
          {n >= 30 ? '✅ n ≥ 30: Distribution is approximately normal (CLT applies)' : `⚠️ n = ${n} < 30: May not be sufficiently normal yet`}
        </p>
      </div>

      {/* Stats output */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.8rem' }}>
        {[
          { label: 'Pop. Mean (μ)', val: popMean, color: '#1d4ed8' },
          { label: 'Mean of Means', val: meanOfMeans, color: '#db2777', note: '≈ μ ✓' },
          { label: 'Pop. Std Dev (σ)', val: popStd, color: '#7c3aed' },
          { label: 'Std Error (σ/√n)', val: se, color: '#16a34a' },
          { label: 'SD of Means', val: sdOfMeans, color: '#ea580c', note: '≈ SE ✓' },
        ].map(s => (
          <div key={s.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.66rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: s.color, fontFamily: 'monospace', marginTop: '2px' }}>{s.val}</div>
            {s.note && <div style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 700 }}>{s.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Bayes Calculator ─── */
const BayesCalc = () => {
  const [pA, setPa] = useState(0.01);
  const [pBgivenA, setPbga] = useState(0.95);
  const [pBgivenNotA, setPbgna] = useState(0.05);

  const pB = pBgivenA * pA + pBgivenNotA * (1 - pA);
  const pAgivenB = (pBgivenA * pA) / pB;

  return (
    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h4 style={{ color: '#1e40af', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>🧮 Bayes' Theorem Interactive Calculator</h4>
      <p style={{ color: '#1e3a8a', fontSize: '0.82rem', margin: '0 0 1.2rem 0' }}>
        <em>Example scenario: Medical test. A = "Has disease", B = "Tests positive"</em>
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
        {[
          { label: 'P(A) — Prior probability disease exists', val: pA, set: setPa, min: 0.001, max: 0.5, step: 0.001, fmt: v => (v * 100).toFixed(1) + '%' },
          { label: 'P(B|A) — Test sensitivity (true positive rate)', val: pBgivenA, set: setPbga, min: 0.5, max: 1, step: 0.01, fmt: v => (v * 100).toFixed(0) + '%' },
          { label: 'P(B|¬A) — False positive rate', val: pBgivenNotA, set: setPbgna, min: 0.001, max: 0.3, step: 0.001, fmt: v => (v * 100).toFixed(1) + '%' },
        ].map(ctrl => (
          <div key={ctrl.label}>
            <label style={{ display: 'block', fontWeight: 700, color: '#1e3a8a', fontSize: '0.8rem', marginBottom: '4px' }}>
              {ctrl.label}: <span style={{ color: '#db2777' }}>{ctrl.fmt(ctrl.val)}</span>
            </label>
            <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.val}
              onChange={e => ctrl.set(Number(e.target.value))} style={{ width: '100%', accentColor: '#2563eb' }} />
          </div>
        ))}
      </div>
      <motion.div key={`${pA}-${pBgivenA}-${pBgivenNotA}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        style={{ background: '#fff', border: '2px solid #bfdbfe', borderRadius: '10px', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 600 }}>P(B) — Prob. test positive</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1d4ed8', fontFamily: 'monospace' }}>{(pB * 100).toFixed(2)}%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#db2777', textTransform: 'uppercase', fontWeight: 600 }}>P(A|B) — Actually has disease given positive test</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: pAgivenB > 0.5 ? '#16a34a' : '#dc2626', fontFamily: 'monospace' }}>{(pAgivenB * 100).toFixed(2)}%</div>
        </div>
        <div style={{ gridColumn: '1 / -1', background: '#eff6ff', borderRadius: '8px', padding: '0.7rem', fontSize: '0.82rem', color: '#1e3a8a' }}>
          <strong>Interpretation:</strong> Even with a {(pBgivenA * 100).toFixed(0)}% accurate test, a positive result only means a <strong>{(pAgivenB * 100).toFixed(1)}%</strong> chance of actually having the disease — because the disease is rare ({(pA * 100).toFixed(1)}% prevalence). This is the base rate fallacy!
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────── */
export default function StatsDay11({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day11', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0; quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; }); setScore(c);
  };

  const quizQuestions = [
    { id: 1, q: "A fair die is rolled. What is the probability of getting an even number?", opts: ["1/6", "1/3", "1/2", "2/3"], ans: 2, exp: "The sample space is {1,2,3,4,5,6}. Even numbers are {2,4,6} — 3 favourable outcomes. P = 3/6 = 1/2." },
    { id: 2, q: "Two events A and B are mutually exclusive. P(A) = 0.3, P(B) = 0.4. What is P(A ∪ B)?", opts: ["0.12", "0.58", "0.70", "0.10"], ans: 2, exp: "For mutually exclusive events P(A ∩ B) = 0. So P(A ∪ B) = P(A) + P(B) = 0.3 + 0.4 = 0.7." },
    { id: 3, q: "In Bayes' Theorem: P(A|B) = P(B|A) × P(A) / P(B). What does P(A) represent?", opts: ["Likelihood — the probability of the evidence given the hypothesis", "The posterior — updated probability after seeing evidence", "The prior — initial probability of the hypothesis before seeing evidence", "The marginal probability of the evidence"], ans: 2, exp: "P(A) is the prior probability — our belief about hypothesis A before observing any evidence. Bayes' theorem updates this prior using the evidence B to compute the posterior P(A|B)." },
    { id: 4, q: "The Central Limit Theorem states that as sample size n increases, the sampling distribution of the sample mean approaches a normal distribution. What is the standard deviation of this sampling distribution called?", opts: ["Population standard deviation", "Sample variance", "Standard Error (SE = σ/√n)", "Coefficient of Variation"], ans: 2, exp: "The standard deviation of the sampling distribution of the mean is called the Standard Error (SE). SE = σ/√n. As n increases, SE decreases, making sample means cluster closer to the population mean." },
    { id: 5, q: "A manufacturing process is highly skewed (not normal). A quality analyst takes samples of n=50 parts each and records the mean weight. What does the CLT tell us?", opts: ["Nothing — CLT only applies to normally distributed populations", "The distribution of those sample means will be approximately normally distributed", "The sample means will perfectly match the population distribution", "Sample means will always equal the population mean exactly"], ans: 1, exp: "The CLT guarantees that regardless of the population's shape, the distribution of sample means (sampling distribution) will approach normality as n increases — typically n ≥ 30 is sufficient for practical applications." },
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── THEORY: Probability Basics ─── */}
      {activeTab === 'theory' && (
        <Section eyebrow="Day 11 • Probability & CLT" title="Probability Fundamentals">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Probability</strong> is the mathematical framework for quantifying uncertainty. It assigns a number between 0 and 1 to each possible outcome, where 0 means impossible and 1 means certain. In statistics, probability underlies every inference, every confidence interval, and every hypothesis test.
            </p>

            <ZoomableImage src={cltImg} alt="Probability Fundamentals and Central Limit Theorem" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Core definitions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: '🌍', term: 'Sample Space (Ω)', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', def: 'The set of ALL possible outcomes of a random experiment.', ex: 'Rolling a die: Ω = {1, 2, 3, 4, 5, 6}' },
                  { icon: '🎯', term: 'Event (E)', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', def: 'A subset of the sample space — one or more outcomes of interest.', ex: 'Event "even": E = {2, 4, 6}' },
                  { icon: '📊', term: 'Probability P(E)', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', def: 'The likelihood of an event occurring, between 0 (impossible) and 1 (certain).', ex: 'P(even) = 3/6 = 0.5' },
                  { icon: '⚖️', term: 'Complement P(Eᶜ)', color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8', def: 'The probability of the event NOT occurring.', ex: "P(not even) = 1 - P(even) = 0.5" },
                ].map(c => (
                  <div key={c.term} style={{ padding: '1.2rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '10px', borderTop: `4px solid ${c.color}` }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{c.icon}</div>
                    <div style={{ fontWeight: 800, color: c.color, fontSize: '0.92rem', marginBottom: '6px' }}>{c.term}</div>
                    <p style={{ color: '#475569', fontSize: '0.83rem', lineHeight: 1.6, margin: '0 0 6px 0' }}>{c.def}</p>
                    <code style={{ fontSize: '0.78rem', color: c.color, background: 'rgba(255,255,255,0.6)', padding: '2px 6px', borderRadius: '4px' }}>{c.ex}</code>
                  </div>
                ))}
              </div>

              {/* Key rules */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0' }}>📐 Fundamental Probability Rules</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {[
                    { name: 'Addition Rule (General)', formula: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', when: 'Any two events A and B', color: '#1d4ed8', bg: '#eff6ff' },
                    { name: 'Addition Rule (Mutually Exclusive)', formula: 'P(A ∪ B) = P(A) + P(B)', when: 'A and B cannot both happen', color: '#16a34a', bg: '#f0fdf4' },
                    { name: 'Multiplication Rule (Independent)', formula: 'P(A ∩ B) = P(A) × P(B)', when: 'A and B are independent', color: '#7c3aed', bg: '#f5f3ff' },
                    { name: 'Complement Rule', formula: 'P(Eᶜ) = 1 − P(E)', when: 'The event does not occur', color: '#db2777', bg: '#fdf2f8' },
                  ].map(r => (
                    <div key={r.name} style={{ background: r.bg, borderRadius: '8px', padding: '0.9rem' }}>
                      <div style={{ fontWeight: 700, color: r.color, fontSize: '0.85rem', marginBottom: '6px' }}>{r.name}</div>
                      <code style={{ display: 'block', color: r.color, fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>{r.formula}</code>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Use when: {r.when}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Types of Events */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 0.8rem 0' }}>🗂️ Types of Events</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { t: 'Independent', d: 'Outcome of A does not affect B', ex: 'Flipping a coin twice — each flip is independent' },
                    { t: 'Dependent', d: 'Outcome of A changes probability of B', ex: 'Drawing cards without replacement — 2nd draw depends on 1st' },
                    { t: 'Mutually Exclusive', d: 'Cannot both occur at the same time', ex: 'Rolling a 1 AND a 6 on a single die throw' },
                    { t: 'Exhaustive', d: 'At least one event must occur', ex: 'Rolling odd OR even on a die — covers all outcomes' },
                  ].map(e => (
                    <div key={e.t} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.8rem' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>{e.t}</div>
                      <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.5, margin: '4px 0' }}>{e.d}</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontStyle: 'italic', margin: 0 }}>{e.ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1.2rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px' }}>
                <h4 style={{ color: '#db2877', margin: '0 0 0.4rem 0' }}>💼 Business Example</h4>
                <p style={{ color: '#831843', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  A marketing team runs two independent ad campaigns. Campaign A has a 30% click-through rate; Campaign B has a 25% rate.
                  P(at least one clicked) = 1 − P(neither clicked) = 1 − (0.70 × 0.75) = 1 − 0.525 = <strong>47.5%</strong>
                </p>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('conditional')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain the difference between mutually exclusive and independent events with business examples.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── CONDITIONAL & BAYES ─── */}
      {activeTab === 'conditional' && (
        <Section eyebrow="Advanced Probability" title="Conditional Probability & Bayes' Theorem">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Conditional Probability</strong> asks: "Given that we already know B happened, what is the probability of A?" This updated probability is the foundation of <strong>Bayes' Theorem</strong> — one of the most powerful and widely applied formulas in all of data science.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>

              {/* Conditional Probability */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', borderLeft: '4px solid #7c3aed' }}>
                <h3 style={{ color: '#7c3aed', margin: '0 0 0.8rem 0' }}>🔍 Conditional Probability</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                  The probability of event A given that event B has already occurred. We restrict our sample space to outcomes where B is true.
                </p>
                <Formula color="#7c3aed" bg="#f5f3ff">P(A | B) = P(A ∩ B) / P(B)</Formula>
                <div style={{ background: '#f5f3ff', borderRadius: '8px', padding: '1rem', marginTop: '0.8rem' }}>
                  <p style={{ color: '#4c1d95', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                    <strong>Example:</strong> In a company, 60% of employees are in Sales (B), and 30% are Female Sales employees (A ∩ B).
                    What's the probability of being Female given the employee is in Sales?<br />
                    <code style={{ display: 'block', marginTop: '8px' }}>P(Female | Sales) = P(Female ∩ Sales) / P(Sales) = 0.30 / 0.60 = <strong>0.50</strong></code>
                  </p>
                </div>
              </div>

              {/* Bayes Theorem */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', borderLeft: '4px solid #db2877' }}>
                <h3 style={{ color: '#db2877', margin: '0 0 0.8rem 0' }}>⚖️ Bayes' Theorem</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                  Bayes' Theorem allows us to <strong>reverse a conditional probability</strong> — computing P(Hypothesis | Evidence) from P(Evidence | Hypothesis). It updates our prior belief using new observed evidence.
                </p>
                <Formula color="#db2877" bg="#fdf2f8">P(A | B) = [ P(B | A) × P(A) ] / P(B)</Formula>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.6rem', marginTop: '0.8rem' }}>
                  {[
                    { sym: 'P(A)', name: 'Prior', desc: 'Belief in A before seeing evidence' },
                    { sym: 'P(B|A)', name: 'Likelihood', desc: 'Probability of evidence if A is true' },
                    { sym: 'P(B)', name: 'Marginal', desc: 'Total probability of evidence B' },
                    { sym: 'P(A|B)', name: 'Posterior', desc: 'Updated belief in A after evidence' },
                  ].map(t => (
                    <div key={t.sym} style={{ background: '#fdf2f8', borderRadius: '6px', padding: '0.6rem' }}>
                      <code style={{ color: '#db2877', fontWeight: 700, fontSize: '0.9rem', display: 'block' }}>{t.sym} — {t.name}</code>
                      <span style={{ color: '#9d174d', fontSize: '0.75rem' }}>{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div style={{ padding: '1.2rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px' }}>
                <h4 style={{ color: '#1d4ed8', margin: '0 0 0.6rem 0' }}>🔬 Where Bayes' Theorem is Used in Industry</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
                  {[
                    '🏥 Medical diagnosis — disease probability given test result',
                    '📧 Spam filtering — email is spam given certain keywords',
                    '🤖 Naive Bayes ML classifier — text classification',
                    '💳 Fraud detection — transaction is fraud given behavioural signals',
                    '🔍 A/B testing — updated belief about conversion rates',
                    '🎯 Recommendation systems — preference probability given history',
                  ].map(a => <div key={a} style={{ background: '#fff', borderRadius: '6px', padding: '0.5rem 0.7rem', fontSize: '0.82rem', color: '#1e3a8a' }}>{a}</div>)}
                </div>
              </div>
            </div>

            {/* Interactive Bayes Calculator */}
            <BayesCalc />

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('clt')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain Bayes' Theorem with a spam email filtering example step-by-step.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── CLT ─── */}
      {activeTab === 'clt' && (
        <Section eyebrow="Sampling Theory" title="Sampling Distribution & Central Limit Theorem">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              The <strong>Central Limit Theorem (CLT)</strong> is arguably the most important theorem in all of statistics. It explains WHY the normal distribution appears everywhere in practice and is the mathematical backbone that justifies confidence intervals, hypothesis tests, and most of inferential statistics.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Sampling Distribution */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#1d4ed8', margin: '0 0 0.8rem 0' }}>📊 Sampling Distribution of the Mean</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                  If you draw many samples of size n from a population and compute the mean of each, those means form their own distribution — called the <strong>Sampling Distribution of the Mean</strong>.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { label: 'Mean of Sampling Distribution', formula: 'μx̄ = μ', note: 'Equals population mean (unbiased)', color: '#1d4ed8', bg: '#eff6ff' },
                    { label: 'Std Dev of Sampling Distribution', formula: 'σx̄ = σ / √n', note: 'Called Standard Error (SE)', color: '#7c3aed', bg: '#f5f3ff' },
                    { label: 'Effect of Sample Size', formula: 'n↑ → SE↓ → more precise', note: 'Quadruple n → halve SE', color: '#16a34a', bg: '#f0fdf4' },
                  ].map(r => (
                    <div key={r.label} style={{ background: r.bg, borderRadius: '8px', padding: '0.9rem' }}>
                      <div style={{ fontWeight: 700, color: r.color, fontSize: '0.82rem', marginBottom: '6px' }}>{r.label}</div>
                      <code style={{ display: 'block', color: r.color, fontSize: '0.9rem', fontWeight: 800, marginBottom: '4px' }}>{r.formula}</code>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{r.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CLT Statement */}
              <div style={{ padding: '1.5rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}>
                <h3 style={{ color: '#f0abfc', margin: '0 0 0.8rem 0' }}>⭐ The Central Limit Theorem — Formal Statement</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                  Given a population with <strong style={{ color: '#f0abfc' }}>any distribution</strong> with mean μ and finite standard deviation σ, the sampling distribution of the sample mean x̄ approaches a <strong style={{ color: '#86efac' }}>normal distribution</strong> as sample size n → ∞:
                </p>
                <div style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.92rem', color: '#f0abfc', fontWeight: 700 }}>
                  x̄ ~ N( μ, σ²/n )   as n → ∞
                </div>
                <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                  {[
                    { n: 'n ≥ 30', desc: 'Rule of thumb for normal populations', color: '#86efac' },
                    { n: 'n ≥ 50+', desc: 'Needed for heavily skewed populations', color: '#fde68a' },
                    { n: 'Any n', desc: 'If population is already normal', color: '#93c5fd' },
                  ].map(r => (
                    <div key={r.n} style={{ background: '#0f172a', border: `1px solid ${r.color}40`, borderRadius: '6px', padding: '0.6rem', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 800, color: r.color }}>{r.n}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '3px' }}>{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CLT Visual: shrinking curves */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#0f172a', margin: '0 0 0.8rem 0' }}>📉 How the Sampling Distribution Narrows with n</h3>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <MiniCurve std={2.5} color="#dc2626" label="n = 5 (wide)" />
                  <MiniCurve std={1.8} color="#f97316" label="n = 10" />
                  <MiniCurve std={1.1} color="#eab308" label="n = 30 ✓" />
                  <MiniCurve std={0.65} color="#16a34a" label="n = 100 (narrow)" />
                  <MiniCurve std={0.35} color="#2563eb" label="n = 500 (very precise)" />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.78rem', textAlign: 'center', marginTop: '8px' }}>Each curve represents the distribution of sample means at that n. SE = σ/√n shrinks as n grows.</p>
              </div>

              {/* Python code */}
              <div>
                <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python CLT Simulation (No Libraries)</h3>
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> clt_simulation.py</span>
                    <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
                  </div>
                  <SyntaxHighlighter code={`import random
import math

# ════════════════════════════════════════════
# Central Limit Theorem Simulation (No libs)
# ════════════════════════════════════════════

# Step 1: Create a skewed population (exponential-like)
def generate_skewed_population(size, lam=0.2):
    """Generate right-skewed population using inverse CDF method"""
    return [-math.log(1 - random.random()) / lam for _ in range(size)]

population = generate_skewed_population(100000)
pop_mean = sum(population) / len(population)
pop_std  = math.sqrt(sum((x - pop_mean)**2 for x in population) / len(population))

print(f"Population: Mean={pop_mean:.2f}, Std={pop_std:.2f}  (right-skewed)")

# Step 2: CLT - draw many samples and record means
def sample_means(population, n, num_samples):
    """Draw num_samples samples of size n, return their means"""
    return [
        sum(random.choices(population, k=n)) / n
        for _ in range(num_samples)
    ]

# Step 3: Show how the sampling distribution normalises
for n in [5, 10, 30, 100]:
    means = sample_means(population, n=n, num_samples=1000)
    m = sum(means) / len(means)
    se_theoretical = pop_std / math.sqrt(n)
    se_observed    = math.sqrt(sum((x - m)**2 for x in means) / len(means))
    print(f"n={n:3d} | Mean of means: {m:.3f} (≈{pop_mean:.2f}) | "
          f"SE theoretical: {se_theoretical:.3f} | SE observed: {se_observed:.3f}")`} />
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('playground')}>Try the CLT Simulator (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Why does the CLT work? Explain the mathematical intuition behind it.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PLAYGROUND ─── */}
      {activeTab === 'playground' && (
        <Section eyebrow="Interactive Simulation" title="CLT Live Simulator">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Experiment with different sample sizes and population shapes. Watch the histogram of sample means transform — starting irregular, gradually converging to a perfect bell curve as n increases past 30.
            </p>

            <CLTSimulator />

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginTop: '2rem', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.8rem 0' }}>💡 Key Observations to Look For</h4>
              <ul style={{ paddingLeft: '18px', color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                <li><strong>At n=2-5:</strong> The histogram is irregular and matches the population's skewed shape.</li>
                <li><strong>At n=10-20:</strong> It starts looking more symmetric but still not quite bell-shaped.</li>
                <li><strong>At n=30+:</strong> The histogram becomes clearly bell-shaped — the CLT kicks in.</li>
                <li><strong>"Mean of Means" ≈ Population Mean:</strong> This confirms the sample mean is an unbiased estimator.</li>
                <li><strong>"SD of Means" ≈ SE:</strong> The observed spread matches σ/√n — the CLT formula in action.</li>
              </ul>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain the business implications of the Central Limit Theorem for quality control in manufacturing.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 11 Assessment" title="Day 11 Assessment & Review">
          <div className="panel">

            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Critical Probability & CLT Pitfalls
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Gambler's Fallacy:</strong> Believing that past independent events affect future probabilities. Each coin flip is independent — after 10 heads, P(tail) is still 0.5.</li>
                <li><strong>Base Rate Neglect (Bayes):</strong> Ignoring P(A) — the prior probability. A 99% accurate test for a 1-in-10,000 disease still yields mostly false positives.</li>
                <li><strong>CLT Misapplication:</strong> Using normal distribution inference when n is too small (n&lt;30) for a heavily skewed population. Always check if n is sufficient.</li>
                <li><strong>Confusing SE with Std Dev:</strong> Standard Error (σ/√n) measures variability of sample means, NOT variability of individual observations. They shrink at different rates.</li>
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
              <h3 style={{ color: '#db2877', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <HelpCircle size={22} /> Homework Assignment
              </h3>
              <ul style={{ color: '#831843', lineHeight: 1.9, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li><strong>Task 1:</strong> A deck of 52 cards is shuffled. Calculate: (a) P(drawing an Ace), (b) P(drawing a red card), (c) P(drawing an Ace OR a King), (d) P(drawing an Ace AND then a King, without replacement). Show all workings.</li>
                <li><strong>Task 2:</strong> A disease affects 2% of the population. A test for it has 98% sensitivity (true positive rate) and 5% false positive rate. Using Bayes' Theorem, calculate the probability that a patient who tests positive actually has the disease. Explain why this result is surprising.</li>
                <li><strong>Task 3:</strong> A factory produces bolts with a mean weight of 100g and std dev of 15g (non-normal distribution). If you sample n=36 bolts: (a) What is the Standard Error?, (b) What is the probability the sample mean falls between 95g and 105g? (use the Empirical Rule).</li>
                <li><strong>Task 4:</strong> Write a pure Python function (no libraries) to simulate the CLT: repeatedly draw samples of size n from a provided population list and return the mean and standard deviation of all sample means.</li>
                <li><strong>Task 5:</strong> Explain in plain English to a non-technical business stakeholder why the Central Limit Theorem is important for making decisions based on sampled customer data.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 11 — Probability & CLT! 🎉')}>
                Submit & Complete Day 11 🎉
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
