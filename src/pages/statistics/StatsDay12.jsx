import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal, RefreshCw } from 'lucide-react';
import htImg from '../../assets/hypothesis_testing_diagram.png';

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

/* ─── Bell curve with rejection regions (SVG) ─── */
const HypothesisCurve = ({ alpha, twoTailed }) => {
  const W = 480, H = 130, PAD = 20;
  const pts = useMemo(() => {
    const steps = 100;
    const arr = [];
    for (let i = 0; i <= steps; i++) {
      const x = -4 + (i / steps) * 8;
      const y = Math.exp(-0.5 * x * x);
      arr.push({ x, y });
    }
    return arr;
  }, []);

  const maxY = 1;
  const toSVG = (x, y) => ({
    cx: ((x + 4) / 8) * (W - 2 * PAD) + PAD,
    cy: H - PAD - (y / maxY) * (H - 2 * PAD),
  });

  const pathD = pts.map((p, i) => {
    const { cx, cy } = toSVG(p.x, p.y);
    return `${i === 0 ? 'M' : 'L'}${cx.toFixed(1)},${cy.toFixed(1)}`;
  }).join(' ');

  // Critical z-values
  const zMap = { 0.10: 1.282, 0.05: 1.645, 0.01: 2.326, 0.001: 3.09 };
  const zCrit = twoTailed ? (zMap[alpha / 2] || 1.96) : (zMap[alpha] || 1.645);

  const rejRight = pts.filter(p => p.x >= zCrit);
  const rejLeft = pts.filter(p => p.x <= -zCrit);

  const rejPathR = rejRight.map((p, i) => {
    const { cx, cy } = toSVG(p.x, p.y);
    return `${i === 0 ? 'M' : 'L'}${cx.toFixed(1)},${cy.toFixed(1)}`;
  }).join(' ') + ` L${toSVG(4, 0).cx},${H - PAD} L${toSVG(zCrit, 0).cx},${H - PAD} Z`;

  const rejPathL = twoTailed
    ? rejLeft.map((p, i) => {
        const { cx, cy } = toSVG(p.x, p.y);
        return `${i === 0 ? 'M' : 'L'}${cx.toFixed(1)},${cy.toFixed(1)}`;
      }).join(' ') + ` L${toSVG(-zCrit, 0).cx},${H - PAD} L${toSVG(-4, 0).cx},${H - PAD} Z`
    : null;

  const botY = H - PAD;
  const fullFill = pathD + ` L${toSVG(4, 0).cx},${botY} L${toSVG(-4, 0).cx},${botY} Z`;

  const { cx: critRx } = toSVG(zCrit, 0);
  const { cx: critLx } = twoTailed ? toSVG(-zCrit, 0) : { cx: 0 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <svg width={W} height={H + 28} viewBox={`0 0 ${W} ${H + 28}`} style={{ maxWidth: '100%' }}>
        {/* Full curve fill (acceptance) */}
        <path d={fullFill} fill="#dbeafe" />
        {/* Rejection right */}
        <path d={rejPathR} fill="#fecaca" />
        {/* Rejection left */}
        {rejPathL && <path d={rejPathL} fill="#fecaca" />}
        {/* Curve outline */}
        <path d={pathD} fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
        {/* Critical lines */}
        <line x1={critRx} y1={PAD} x2={critRx} y2={botY} stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" />
        {twoTailed && <line x1={critLx} y1={PAD} x2={critLx} y2={botY} stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" />}
        {/* Labels */}
        <text x={critRx + 4} y={PAD + 12} fill="#dc2626" fontSize="10" fontWeight="bold">+z*={zCrit.toFixed(2)}</text>
        {twoTailed && <text x={critLx - 56} y={PAD + 12} fill="#dc2626" fontSize="10" fontWeight="bold">-z*={zCrit.toFixed(2)}</text>}
        {/* Region labels */}
        <text x={W / 2} y={H / 2} textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">✅ Fail to Reject H₀</text>
        <text x={W - PAD - 20} y={botY - 6} textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">Reject</text>
        {twoTailed && <text x={PAD + 20} y={botY - 6} textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">Reject</text>}
        {/* x-axis */}
        <line x1={PAD} y1={botY} x2={W - PAD} y2={botY} stroke="#94a3b8" strokeWidth="1" />
        <text x={W / 2} y={H + 22} textAnchor="middle" fill="#64748b" fontSize="10">H₀: μ = μ₀</text>
      </svg>
    </div>
  );
};

/* ─── Interactive Hypothesis Test Simulator ─── */
const HTestSimulator = () => {
  const [alpha, setAlpha] = useState(0.05);
  const [twoTailed, setTwoTailed] = useState(true);
  const [zStat, setZStat] = useState(2.1);

  const zMap = { 0.10: 1.282, 0.05: 1.645, 0.01: 2.326, 0.001: 3.09 };
  const zCrit = twoTailed ? (zMap[alpha / 2] || 1.96) : (zMap[alpha] || 1.645);

  // Approximating p-value for z-stat using normal CDF approximation
  const normalCDF = (z) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const poly = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    const pdf = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
    const cdf = 1 - pdf * poly;
    return z >= 0 ? cdf : 1 - cdf;
  };
  const pValue = twoTailed
    ? 2 * (1 - normalCDF(Math.abs(zStat)))
    : (zStat > 0 ? 1 - normalCDF(zStat) : normalCDF(zStat));
  const reject = pValue < alpha;

  return (
    <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '1.8rem' }}>
      <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>🔬 Hypothesis Test Simulator</h4>
      <p style={{ color: '#64748b', fontSize: '0.83rem', margin: '0 0 1.5rem 0' }}>
        Set your significance level α, choose one-tailed or two-tailed, adjust the z-statistic, and see the decision in real-time.
      </p>

      {/* Live curve */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <motion.div key={`${alpha}-${twoTailed}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <HypothesisCurve alpha={alpha} twoTailed={twoTailed} />
        </motion.div>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', marginBottom: '6px' }}>Significance Level (α):</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {[0.10, 0.05, 0.01, 0.001].map(a => (
              <button key={a} onClick={() => setAlpha(a)}
                style={{ padding: '4px 10px', borderRadius: '16px', border: `2px solid ${alpha === a ? '#db2777' : '#cbd5e1'}`, background: alpha === a ? '#fdf2f8' : '#fff', color: alpha === a ? '#db2777' : '#334155', fontWeight: alpha === a ? 700 : 400, cursor: 'pointer', fontSize: '0.82rem' }}>
                α = {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', marginBottom: '6px' }}>Test Type:</label>
          {[{ v: true, l: '↔️ Two-Tailed (H₁: μ ≠ μ₀)' }, { v: false, l: '→ One-Tailed (H₁: μ > μ₀)' }].map(opt => (
            <label key={String(opt.v)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '3px 0', cursor: 'pointer', fontSize: '0.83rem', color: twoTailed === opt.v ? '#db2777' : '#475569', fontWeight: twoTailed === opt.v ? 700 : 400 }}>
              <input type="radio" checked={twoTailed === opt.v} onChange={() => setTwoTailed(opt.v)} style={{ accentColor: '#db2777' }} />
              {opt.l}
            </label>
          ))}
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', marginBottom: '6px' }}>
            Test Statistic (z): <span style={{ color: '#db2777', fontFamily: 'monospace' }}>{zStat.toFixed(2)}</span>
          </label>
          <input type="range" min="-4" max="4" step="0.05" value={zStat} onChange={e => setZStat(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#db2777' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
            <span>-4</span><span>0</span><span>+4</span>
          </div>
        </div>
      </div>

      {/* Decision output */}
      <motion.div key={`${reject}-${pValue.toFixed(4)}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
        {[
          { label: 'Critical Value (z*)', val: `±${zCrit.toFixed(3)}`, color: '#dc2626' },
          { label: 'Test Statistic (z)', val: zStat.toFixed(3), color: '#1d4ed8' },
          { label: 'p-value', val: pValue < 0.0001 ? '< 0.0001' : pValue.toFixed(4), color: pValue < alpha ? '#dc2626' : '#16a34a' },
          { label: 'α (alpha)', val: alpha, color: '#7c3aed' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.7rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.67rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: s.color, fontFamily: 'monospace', marginTop: '2px' }}>{s.val}</div>
          </div>
        ))}
      </motion.div>

      <motion.div key={reject} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        style={{ padding: '1rem 1.2rem', borderRadius: '10px', border: `2px solid ${reject ? '#dc2626' : '#16a34a'}`, background: reject ? '#fef2f2' : '#f0fdf4' }}>
        <div style={{ fontWeight: 800, fontSize: '1rem', color: reject ? '#dc2626' : '#16a34a', marginBottom: '4px' }}>
          {reject ? '🚫 Reject H₀ — Statistically Significant' : '✅ Fail to Reject H₀ — Not Statistically Significant'}
        </div>
        <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6 }}>
          {reject
            ? `p-value (${pValue.toFixed(4)}) < α (${alpha}). The test statistic falls in the rejection region. Evidence suggests H₀ is false.`
            : `p-value (${pValue.toFixed(4)}) ≥ α (${alpha}). The test statistic falls in the acceptance region. Insufficient evidence to reject H₀.`}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Step card ─── */
const StepCard = ({ num, title, desc, color, bg, border, example }) => (
  <div style={{ display: 'flex', gap: '1rem', padding: '1.2rem', background: bg, border: `1px solid ${border}`, borderRadius: '12px' }}>
    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>{num}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 800, color, fontSize: '0.95rem', marginBottom: '4px' }}>{title}</div>
      <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 6px 0' }}>{desc}</p>
      {example && <code style={{ fontSize: '0.8rem', color, background: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>{example}</code>}
    </div>
  </div>
);

/* ─────────────────────────────────── */
export default function StatsDay12({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day12', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0; quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; }); setScore(c);
  };

  const quizQuestions = [
    { id: 1, q: "A researcher tests whether a new drug reduces blood pressure. The null hypothesis H₀ states 'the drug has no effect'. A Type I Error in this context would mean:", opts: ["Concluding the drug works when it actually does work", "Concluding the drug has no effect when it actually reduces blood pressure", "Concluding the drug works when it actually has no effect", "Failing to recruit enough patients for the trial"], ans: 2, exp: "Type I Error (α) = rejecting a TRUE null hypothesis (false positive). Here H₀='no effect' is true, but we wrongly conclude the drug works. This is dangerous in medical contexts — approving an ineffective drug." },
    { id: 2, q: "A p-value of 0.032 is obtained in a hypothesis test at α = 0.05. What is the correct decision?", opts: ["Fail to reject H₀ because 0.032 is small", "Reject H₀ because p-value (0.032) < α (0.05)", "Accept H₁ with 96.8% certainty", "The test is inconclusive"], ans: 1, exp: "Decision rule: If p < α → Reject H₀. Since 0.032 < 0.05, we reject H₀. This means we have statistically significant evidence against H₀ at the 5% significance level." },
    { id: 3, q: "What does the Power of a Test (1 - β) measure?", opts: ["The probability of making a Type I Error", "The probability of correctly rejecting a FALSE null hypothesis (true positive rate)", "The width of the confidence interval", "The significance level alpha"], ans: 1, exp: "Power = 1 - β = P(Reject H₀ | H₀ is false). It measures how good the test is at detecting a real effect when one exists. Higher power means fewer missed effects (Type II Errors). Typically we aim for power ≥ 0.80." },
    { id: 4, q: "A quality manager tests: H₀: mean defect rate = 5%, H₁: mean defect rate > 5%. What type of test is this?", opts: ["Two-tailed test", "Left-tailed (one-tailed) test", "Right-tailed (one-tailed) test", "Paired t-test"], ans: 2, exp: "Since H₁ specifies a direction (> 5%), this is a right-tailed one-tailed test. The rejection region is only in the right tail of the distribution. Two-tailed tests are used when H₁: μ ≠ μ₀ (any direction)." },
    { id: 5, q: "Raising the significance level α from 0.05 to 0.10 has what effect on hypothesis testing?", opts: ["It reduces Type I Error and increases power", "It increases Type I Error risk but also increases power (reduces Type II Error)", "It has no effect on either type of error", "It eliminates Type II Errors completely"], ans: 1, exp: "Raising α makes it easier to reject H₀ — this increases power (1−β), catching more real effects. But the trade-off is a higher Type I Error rate: you'll also wrongly reject more true null hypotheses. This is the classic α vs power trade-off." },
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── THEORY ─── */}
      {activeTab === 'theory' && (
        <Section eyebrow="Day 12 • Hypothesis Testing" title="Null & Alternative Hypotheses and Error Types">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Hypothesis Testing</strong> is a formal statistical procedure for making decisions about a population parameter based on sample data. Instead of just observing data, we set up competing hypotheses and use probability to determine which one the evidence supports.
            </p>

            <ZoomableImage src={htImg} alt="Hypothesis Testing — Rejection Regions, Error Types, Decision Rule" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* H0 and H1 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.3rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', borderTop: '4px solid #2563eb' }}>
                  <h3 style={{ color: '#1d4ed8', margin: '0 0 0.6rem 0', fontSize: '1rem' }}>H₀ — Null Hypothesis</h3>
                  <p style={{ color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                    The default claim — a statement of <strong>no effect, no difference, or no change</strong>. We assume H₀ is true until the data provides strong enough evidence against it.
                  </p>
                  <ul style={{ color: '#1e3a8a', fontSize: '0.82rem', lineHeight: 1.8, paddingLeft: '16px', margin: 0 }}>
                    <li>Always contains an equality sign (=, ≤, ≥)</li>
                    <li>Represents the "status quo" or current belief</li>
                    <li>We never "prove" H₀ — only "fail to reject" it</li>
                  </ul>
                  <div style={{ background: '#dbeafe', borderRadius: '6px', padding: '0.5rem 0.7rem', marginTop: '0.7rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#1e3a8a' }}>
                    Example: H₀: μ = 50 (mean delivery time = 50 min)
                  </div>
                </div>

                <div style={{ padding: '1.3rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px', borderTop: '4px solid #db2877' }}>
                  <h3 style={{ color: '#db2877', margin: '0 0 0.6rem 0', fontSize: '1rem' }}>H₁ — Alternative Hypothesis</h3>
                  <p style={{ color: '#9d174d', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                    The research claim — what we are trying to <strong>find evidence for</strong>. It contradicts H₀ and represents the effect or difference we suspect exists.
                  </p>
                  <ul style={{ color: '#9d174d', fontSize: '0.82rem', lineHeight: 1.8, paddingLeft: '16px', margin: 0 }}>
                    <li>Never contains equality (uses ≠, &lt;, &gt;)</li>
                    <li>Represents what we believe is actually true</li>
                    <li>Two-tailed (≠) or one-tailed (&lt; or &gt;)</li>
                  </ul>
                  <div style={{ background: '#fbcfe8', borderRadius: '6px', padding: '0.5rem 0.7rem', marginTop: '0.7rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#9d174d' }}>
                    Example: H₁: μ ≠ 50 (delivery time has changed)
                  </div>
                </div>
              </div>

              {/* Error Types table */}
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>Decision Matrix — Types of Errors</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        <th style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Decision →<br />Truth ↓</th>
                        <th style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #e2e8f0', color: '#0f172a', fontWeight: 700 }}>Reject H₀</th>
                        <th style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #e2e8f0', color: '#0f172a', fontWeight: 700 }}>Fail to Reject H₀</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}>H₀ is TRUE</td>
                        <td style={{ padding: '0.9rem 1rem', background: '#fef2f2', color: '#dc2626', fontWeight: 700 }}>
                          ❌ Type I Error (α)<br />
                          <span style={{ fontWeight: 400, color: '#991b1b', fontSize: '0.8rem' }}>False Positive — wrongly reject true H₀</span>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', background: '#f0fdf4', color: '#16a34a', fontWeight: 700 }}>
                          ✅ Correct Decision<br />
                          <span style={{ fontWeight: 400, color: '#166534', fontSize: '0.8rem' }}>True Negative — P = 1 − α</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}>H₀ is FALSE</td>
                        <td style={{ padding: '0.9rem 1rem', background: '#f0fdf4', color: '#16a34a', fontWeight: 700 }}>
                          ✅ Correct Decision<br />
                          <span style={{ fontWeight: 400, color: '#166534', fontSize: '0.8rem' }}>True Positive (Power) — P = 1 − β</span>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', background: '#fef2f2', color: '#dc2626', fontWeight: 700 }}>
                          ❌ Type II Error (β)<br />
                          <span style={{ fontWeight: 400, color: '#991b1b', fontSize: '0.8rem' }}>False Negative — miss a real effect</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Business analogy */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px' }}>
                  <h4 style={{ color: '#dc2626', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>❌ Type I Error (α) — False Alarm</h4>
                  <p style={{ color: '#7f1d1d', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                    A fire alarm goes off when there is <strong>no fire</strong>. A drug is approved when it has no real effect. An ad campaign is launched for a price change that wasn't real.
                    <br /><br /><strong>Controlled by:</strong> Setting α lower (e.g. 0.01 instead of 0.05)
                  </p>
                </div>
                <div style={{ padding: '1.1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px' }}>
                  <h4 style={{ color: '#dc2626', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>❌ Type II Error (β) — Missed Detection</h4>
                  <p style={{ color: '#7f1d1d', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                    A fire alarm does NOT go off when there <strong>IS a fire</strong>. A dangerous drug passes clinical trials. A real quality problem goes undetected in manufacturing.
                    <br /><br /><strong>Reduced by:</strong> Increasing sample size n (raises power)
                  </p>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('metrics')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain Type I and Type II errors with a medical diagnostic test example.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── METRICS ─── */}
      {activeTab === 'metrics' && (
        <Section eyebrow="Core Metrics" title="Significance Level, p-value, Confidence Level & Power">
          <div className="panel">
            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {[
                { sym: 'α', name: 'Significance Level (α)', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', def: 'The maximum probability of making a Type I Error that we are willing to accept. Set BEFORE the test.', values: [{ v: 'α = 0.10', use: 'Exploratory / social research — some false positives acceptable' }, { v: 'α = 0.05', use: 'Standard in business & academic research (most common)' }, { v: 'α = 0.01', use: 'Medical / safety applications — rare false positives critical' }, { v: 'α = 0.001', use: 'Particle physics, nuclear safety — extremely conservative' }], formula: 'α = P(Reject H₀ | H₀ is true) = Type I Error Rate' },
                { sym: 'p', name: 'p-value', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', def: 'The probability of observing a test statistic as extreme as, or more extreme than, the one computed — assuming H₀ is TRUE. A measure of evidence against H₀.', values: [{ v: 'p < α', use: '→ Reject H₀ (statistically significant result)' }, { v: 'p ≥ α', use: '→ Fail to Reject H₀ (not statistically significant)' }, { v: 'p = 0.001', use: 'Very strong evidence against H₀' }, { v: 'p = 0.4', use: 'Weak / no evidence against H₀' }], formula: 'p = P(Data as extreme | H₀ true)' },
                { sym: '1−α', name: 'Confidence Level (1 − α)', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', def: 'The probability that a confidence interval constructed by this procedure will contain the true parameter value. Directly linked to α.', values: [{ v: '90% CI', use: 'α = 0.10 — wider interval, less conservative' }, { v: '95% CI', use: 'α = 0.05 — standard choice in most analyses' }, { v: '99% CI', use: 'α = 0.01 — very conservative, much wider interval' }], formula: 'Confidence Level = 1 − α' },
                { sym: '1−β', name: 'Power of Test (1 − β)', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', def: 'The probability of correctly rejecting a false null hypothesis. A high-power test rarely misses real effects. Target power ≥ 0.80 (industry standard).', values: [{ v: 'Power ↑', use: 'By increasing sample size n (most effective)' }, { v: 'Power ↑', use: 'By raising α (trade-off with Type I Error)' }, { v: 'Power ↑', use: 'By reducing population variability (σ)' }, { v: 'Power ↑', use: 'If the true effect size is larger' }], formula: 'Power = 1 − β = P(Reject H₀ | H₀ is false)' },
              ].map(m => (
                <div key={m.sym} style={{ padding: '1.4rem', background: m.bg, border: `1px solid ${m.border}`, borderRadius: '12px', borderLeft: `5px solid ${m.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.6rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: m.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{m.sym}</div>
                    <h3 style={{ color: m.color, margin: 0, fontSize: '1rem' }}>{m.name}</h3>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 0.8rem 0' }}>{m.def}</p>
                  <Formula color={m.color} bg="rgba(255,255,255,0.5)">{m.formula}</Formula>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.4rem', marginTop: '0.6rem' }}>
                    {m.values.map(v => (
                      <div key={v.v} style={{ display: 'flex', gap: '6px', fontSize: '0.8rem', alignItems: 'flex-start' }}>
                        <code style={{ color: m.color, fontWeight: 700, flexShrink: 0 }}>{v.v}:</code>
                        <span style={{ color: '#475569' }}>{v.use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Key warning */}
              <div style={{ padding: '1.2rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px' }}>
                <h4 style={{ color: '#c2410c', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>⚠️ Common Misinterpretation of p-values</h4>
                <ul style={{ color: '#9a3412', fontSize: '0.85rem', lineHeight: 1.8, margin: 0, paddingLeft: '16px' }}>
                  <li><strong>❌ WRONG:</strong> "p = 0.03 means there's a 3% chance H₀ is true."</li>
                  <li><strong>✅ CORRECT:</strong> "p = 0.03 means if H₀ were true, we'd see this extreme a result only 3% of the time by chance."</li>
                  <li><strong>❌ WRONG:</strong> "p &gt; 0.05 proves H₀ is true."</li>
                  <li><strong>✅ CORRECT:</strong> "p &gt; 0.05 means insufficient evidence to reject H₀ — not that H₀ is true."</li>
                </ul>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('steps')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What does a p-value actually mean? Give me a concrete business analytics example.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── STEPS ─── */}
      {activeTab === 'steps' && (
        <Section eyebrow="The Framework" title="5 Steps of Hypothesis Testing">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Every hypothesis test — regardless of the specific test used — follows the same rigorous 5-step workflow. Master this process and you can apply it to any statistical test.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '3rem' }}>
              {[
                { num: 1, title: 'State the Hypotheses', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', desc: 'Clearly define H₀ (null hypothesis) and H₁ (alternative hypothesis) in terms of the population parameter. Decide on one-tailed vs two-tailed test based on your research question.', example: 'H₀: μ = 50 min  vs  H₁: μ ≠ 50 min  (two-tailed)' },
                { num: 2, title: 'Set the Significance Level (α)', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', desc: 'Choose α based on your tolerance for false positives and the field standards. Common choice: α = 0.05. This determines your critical region before looking at any data.', example: 'α = 0.05  →  95% Confidence Level  →  z* = ±1.96' },
                { num: 3, title: 'Collect Data & Compute Test Statistic', color: '#d97706', bg: '#fffbeb', border: '#fde68a', desc: 'Collect a representative sample. Compute the appropriate test statistic (z-test, t-test, chi-square, F-test) that measures how far the sample result is from H₀ in standard error units.', example: 'z = (x̄ - μ₀) / (σ / √n)  =  (47.3 - 50) / (8 / √64)  =  -2.70' },
                { num: 4, title: 'Calculate the p-value & Compare', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', desc: 'Find the probability of observing a test statistic as extreme as computed, under H₀. Compare p-value with α to determine statistical significance.', example: 'p = 0.007  <  α = 0.05  →  Statistically Significant' },
                { num: 5, title: 'Make a Decision & Interpret', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', desc: 'If p < α: Reject H₀ — evidence supports H₁. If p ≥ α: Fail to Reject H₀. Always interpret in context — statistical significance ≠ practical significance.', example: 'Reject H₀: Evidence that delivery time ≠ 50 min (mean = 47.3 min)' },
              ].map(s => <StepCard key={s.num} {...s} />)}
            </div>

            {/* Python code */}
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python — Hypothesis Test (No Libraries)</h3>
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> hypothesis_test.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import math

# ══════════════════════════════════════════
# ONE-SAMPLE Z-TEST — All 5 Steps (No libs)
# ══════════════════════════════════════════

# Business Scenario:
# A logistics company claims their average delivery time = 50 min.
# A quality analyst samples 64 deliveries: x̄ = 47.3 min, σ = 8 min.
# Test at α = 0.05 (two-tailed): Has the mean delivery time changed?

# ── Step 1: State Hypotheses ──
# H₀: μ = 50    (mean delivery time is 50 min)
# H₁: μ ≠ 50    (mean delivery time has changed — two-tailed)

mu_0     = 50      # Hypothesised population mean (H₀)
x_bar    = 47.3    # Sample mean
sigma    = 8       # Known population std dev
n        = 64      # Sample size

# ── Step 2: Set Significance Level ──
alpha    = 0.05    # 5% significance
z_crit   = 1.96    # Critical value for two-tailed α=0.05

# ── Step 3: Compute Test Statistic ──
std_error = sigma / math.sqrt(n)
z_stat    = (x_bar - mu_0) / std_error

print(f"Standard Error: {std_error:.4f}")
print(f"z-statistic:    {z_stat:.4f}")

# ── Step 4: Calculate p-value (normal CDF approximation) ──
def normal_cdf(z):
    """Abramowitz & Stegun approximation"""
    t = 1 / (1 + 0.2316419 * abs(z))
    poly = t * (0.319381530 + t * (-0.356563782
           + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))))
    pdf = math.exp(-0.5 * z * z) / math.sqrt(2 * math.pi)
    cdf = 1 - pdf * poly
    return cdf if z >= 0 else 1 - cdf

# Two-tailed p-value
p_value = 2 * (1 - normal_cdf(abs(z_stat)))
print(f"p-value:        {p_value:.6f}")
print(f"α:              {alpha}")

# ── Step 5: Decision ──
if p_value < alpha:
    print(f"\\n✅ Reject H₀: p ({p_value:.4f}) < α ({alpha})")
    print("   Conclusion: Statistically significant evidence that")
    print(f"   the true mean delivery time ≠ {mu_0} min")
else:
    print(f"\\n❌ Fail to Reject H₀: p ({p_value:.4f}) ≥ α ({alpha})")
    print("   Conclusion: Insufficient evidence against H₀")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Expected Output</h4>
              <pre style={{ margin: 0, color: '#1e3a8a', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.7 }}>{`Standard Error: 1.0000
z-statistic:    -2.7000
p-value:        0.006934
α:              0.05

✅ Reject H₀: p (0.0069) < α (0.05)
   Conclusion: Statistically significant evidence that
   the true mean delivery time ≠ 50 min`}</pre>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('playground')}>Try the Simulator (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Walk me through when to use a z-test versus a t-test in hypothesis testing.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PLAYGROUND ─── */}
      {activeTab === 'playground' && (
        <Section eyebrow="Interactive Simulator" title="Hypothesis Test Decision Simulator">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Explore how α, test type, and the z-statistic interact to drive the Accept/Reject decision. Drag the z-statistic to move it into or out of the rejection region in real time.
            </p>

            <HTestSimulator />

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginTop: '2rem', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.8rem 0' }}>💡 Key Interactions to Explore</h4>
              <ul style={{ paddingLeft: '18px', color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Move z-statistic past ±z*</strong> to see it cross from acceptance to rejection region — and watch p-value drop below α.</li>
                <li><strong>Lower α (0.05 → 0.01)</strong>: Critical z* increases — harder to reject H₀ (stricter standard).</li>
                <li><strong>Switch to one-tailed test:</strong> Only one rejection region, making it easier to reject in that direction.</li>
                <li><strong>Tiny p-value (e.g. p=0.0003)</strong> means extremely strong evidence against H₀.</li>
              </ul>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain what happens to Type I and Type II error rates when I reduce my alpha from 0.05 to 0.01.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 12 Assessment" title="Day 12 Assessment & Review">
          <div className="panel">

            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Critical Hypothesis Testing Mistakes
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>p-hacking:</strong> Running multiple tests and only reporting the one with p&lt;0.05. This inflates Type I Error to unacceptable levels. Use Bonferroni correction for multiple tests.</li>
                <li><strong>HARKing (Hypothesising After Results Known):</strong> Designing the hypothesis after seeing the data, then pretending it was pre-specified. Completely invalidates the test.</li>
                <li><strong>Confusing statistical with practical significance:</strong> A test can be statistically significant (small p) but practically meaningless (tiny effect size). Always report effect size alongside p-values.</li>
                <li><strong>Accepting H₀:</strong> Saying "we proved there is no difference." Correct phrasing is "we found insufficient evidence to reject H₀." Absence of evidence ≠ evidence of absence.</li>
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
                <li><strong>Task 1:</strong> A coffee shop claims their average service time is 3 minutes. A customer survey of n=36 gives x̄ = 3.4 min with σ = 1.2 min. Test at α = 0.05 (two-tailed). Write out all 5 steps, compute the z-statistic and p-value manually, and state your decision.</li>
                <li><strong>Task 2:</strong> A pharmaceutical company tests a new pain reliever. H₀: drug has no effect. Describe a real-world consequence of (a) making a Type I Error and (b) making a Type II Error. Which is more dangerous and why?</li>
                <li><strong>Task 3:</strong> An e-commerce manager runs 20 simultaneous A/B tests at α = 0.05. Even if all null hypotheses are true, how many tests would we expect to falsely reject H₀ by chance? What can be done to control this?</li>
                <li><strong>Task 4:</strong> Write a Python function <code>one_sample_z_test(data, mu_0, sigma, alpha, two_tailed=True)</code> that performs all 5 steps and prints a formatted output report.</li>
                <li><strong>Task 5:</strong> Explain to a non-technical marketing manager why a p-value of 0.04 does NOT mean "there is a 96% chance the new landing page outperforms the old one." What does it actually mean?</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 12 — Hypothesis Testing! 🎉')}>
                Submit & Complete Day 12 🎉
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
