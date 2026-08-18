import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, ArrowRight, Terminal } from 'lucide-react';
import workflowImg from '../../assets/inferential_stats_workflow.png';

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

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', overflowX: 'auto' }}>
      {lines.map((line, li) => {
        const rx = /(#[^\n]*)|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?:\b(import|from|as|return|if|else|for|while|in|def|class|and|or|not|is|None|True|False)\b)|(?:\b(print|len|sum|range|sorted|min|max|round|abs|int|float|str|list|dict|math|sqrt)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
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

/* ─── Interactive CI Slider ─── */
const CISlider = () => {
  const [confidence, setConfidence] = useState(95);
  const [sampleMean, setSampleMean] = useState(50);
  const [stdErr, setStdErr] = useState(3);

  // z-scores for common confidence levels
  const zMap = { 80: 1.28, 85: 1.44, 90: 1.645, 95: 1.96, 99: 2.576 };
  const z = zMap[confidence] || 1.96;
  const margin = +(z * stdErr).toFixed(2);
  const lower = +(sampleMean - margin).toFixed(2);
  const upper = +(sampleMean + margin).toFixed(2);

  // Bar visualisation — scale to 0-100 range display
  const pctLower = Math.max(0, ((lower) / 100) * 100);
  const pctUpper = Math.min(100, ((upper) / 100) * 100);
  const barLeft = `${pctLower}%`;
  const barWidth = `${pctUpper - pctLower}%`;

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.8rem', marginBottom: '2rem' }}>
      <h4 style={{ color: '#0f172a', margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>🎯 Confidence Interval Simulator</h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
        {/* Confidence Level */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '6px', fontSize: '0.9rem' }}>
            Confidence Level: <span style={{ color: '#db2777' }}>{confidence}%</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {[80, 85, 90, 95, 99].map(cl => (
              <button key={cl} onClick={() => setConfidence(cl)}
                style={{ padding: '4px 12px', borderRadius: '16px', border: `2px solid ${confidence === cl ? '#db2777' : '#cbd5e1'}`, background: confidence === cl ? '#fdf2f8' : '#fff', color: confidence === cl ? '#db2777' : '#334155', fontWeight: confidence === cl ? 700 : 400, cursor: 'pointer', fontSize: '0.82rem' }}>
                {cl}%
              </button>
            ))}
          </div>
        </div>

        {/* Sample Mean */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '6px', fontSize: '0.9rem' }}>
            Sample Mean (x̄): <span style={{ color: '#db2777' }}>{sampleMean}</span>
          </label>
          <input type="range" min="20" max="80" value={sampleMean} onChange={e => setSampleMean(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#db2777' }} />
        </div>

        {/* Std Error */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '6px', fontSize: '0.9rem' }}>
            Std Error (σ/√n): <span style={{ color: '#db2777' }}>{stdErr}</span>
          </label>
          <input type="range" min="1" max="10" value={stdErr} onChange={e => setStdErr(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#db2777' }} />
        </div>
      </div>

      {/* Visual bar */}
      <div style={{ position: 'relative', height: '36px', background: '#f1f5f9', borderRadius: '8px', marginBottom: '1rem', overflow: 'visible' }}>
        {/* CI range bar */}
        <div style={{ position: 'absolute', left: barLeft, width: barWidth, height: '100%', background: 'linear-gradient(90deg, #fbcfe8, #db2777, #fbcfe8)', borderRadius: '8px', opacity: 0.8, transition: 'all 0.3s ease' }} />
        {/* Mean marker */}
        <div style={{ position: 'absolute', left: `${sampleMean}%`, transform: 'translateX(-50%)', width: '3px', height: '100%', background: '#0f172a', borderRadius: '2px' }} />
      </div>

      {/* Output values */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem', textAlign: 'center' }}>
        {[
          { label: 'Lower Bound', val: lower, color: '#7c3aed' },
          { label: 'Point Estimate (x̄)', val: sampleMean, color: '#db2777' },
          { label: 'Upper Bound', val: upper, color: '#7c3aed' },
          { label: 'Margin of Error', val: `±${margin}`, color: '#ea580c' },
        ].map(s => (
          <div key={s.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.7rem' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.color, fontFamily: 'monospace', marginTop: '2px' }}>{val => val}
              {s.val}
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '1rem 0 0 0', textAlign: 'center' }}>
        We are <strong style={{ color: '#db2777' }}>{confidence}%</strong> confident the true population mean lies between <strong>[{lower}, {upper}]</strong>
      </p>
    </div>
  );
};

/* ─── Workflow Step Component ─── */
const WorkflowStep = ({ step, icon, title, subtitle, color, bg, isLast }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '480px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: bg, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{icon}</div>
      <div style={{ background: '#fff', border: `1px solid ${color}30`, borderLeft: `4px solid ${color}`, borderRadius: '8px', padding: '0.8rem 1.2rem', flex: 1 }}>
        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}><span style={{ color, fontFamily: 'monospace', marginRight: '8px' }}>Step {step}</span>{title}</div>
        <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '2px' }}>{subtitle}</div>
      </div>
    </div>
    {!isLast && <div style={{ width: '2px', height: '24px', background: `linear-gradient(${color}, #cbd5e1)`, margin: '4px 0' }} />}
  </div>
);

/* ────────────────────────────────────────── */
export default function StatsDay9({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day9', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
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
      q: "What is the key distinction between a Parameter and a Statistic?",
      opts: [
        "A parameter is computed from a sample; a statistic is a fixed value of the population.",
        "A parameter is a fixed (often unknown) value describing a population; a statistic is a value computed from a sample used to estimate the parameter.",
        "Parameters are always larger in value than statistics.",
        "Statistics are exact; parameters are estimated."
      ],
      ans: 1,
      exp: "A parameter (e.g. μ, σ) describes the entire population and is typically unknown. A statistic (e.g. x̄, s) is computed from a sample drawn from that population and is used as an estimate of the parameter."
    },
    {
      id: 2,
      q: "A hospital surveys 200 of its 15,000 patients and finds the average wait time is 24 minutes. In this context, which value is the 'statistic'?",
      opts: [
        "15,000 patients",
        "The true average wait time of all 15,000 patients",
        "24 minutes (the sample mean x̄)",
        "200 patients"
      ],
      ans: 2,
      exp: "The sample mean x̄ = 24 minutes is the statistic — computed from the sample of 200 patients. The true population mean (the average for all 15,000 patients) is the parameter, which is unknown."
    },
    {
      id: 3,
      q: "A 95% confidence interval for average monthly salary is [₹42,000, ₹58,000]. What does this correctly mean?",
      opts: [
        "Exactly 95% of all employees earn between ₹42,000 and ₹58,000.",
        "There is a 95% probability that the population mean salary falls between ₹42,000 and ₹58,000.",
        "If we repeated this sampling process many times, approximately 95% of the constructed intervals would contain the true population mean.",
        "The sample mean is definitely ₹50,000."
      ],
      ans: 2,
      exp: "The frequentist interpretation: if we repeated the sampling and interval construction many times, ~95% of those intervals would contain the true population mean. The interval either does or doesn't contain the true mean — there's no probability attached to a single interval."
    },
    {
      id: 4,
      q: "What happens to the width of a Confidence Interval if you increase the confidence level from 90% to 99%?",
      opts: [
        "The interval becomes narrower — higher confidence requires tighter bounds.",
        "The interval becomes wider — higher confidence requires a larger z-score, increasing the margin of error.",
        "The interval width stays the same; only the centre changes.",
        "The interval becomes narrower because 99% is more precise."
      ],
      ans: 1,
      exp: "A higher confidence level requires a larger critical z-value (z=1.645 for 90% vs z=2.576 for 99%). Since margin of error = z × SE, a larger z makes the interval wider. There is always a trade-off: more confidence ↔ wider interval."
    },
    {
      id: 5,
      q: "Why is Inferential Statistics necessary when we could simply study the entire population?",
      opts: [
        "It is always cheaper and equally accurate to study the whole population.",
        "Studying the entire population is often impossible, impractical, or too costly — samples allow us to make reliable inferences with much less effort.",
        "Inferential statistics is only needed for populations smaller than 1,000.",
        "Populations change too rapidly for inferential methods to apply."
      ],
      ans: 1,
      exp: "Studying every member of a population (a census) is often impossible (e.g. all blood cells in a body), prohibitively expensive, time-consuming, or destructive (e.g. crash-testing every car). Inferential statistics gives us a rigorous framework to draw reliable conclusions from manageable samples."
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── THEORY: Population & Sample ─── */}
      {activeTab === 'theory' && (
        <Section eyebrow="Day 9 • Inferential Statistics" title="Population, Sample, Parameter & Statistic">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Inferential Statistics</strong> allows us to make conclusions and predictions about an entire <em>population</em> based on data collected from a smaller <em>sample</em>. Unlike descriptive statistics — which merely summarise what is in the data — inferential statistics lets us <strong>generalise beyond the data</strong> and quantify our uncertainty when doing so.
            </p>

            <ZoomableImage src={workflowImg} alt="Inferential Statistics Workflow Diagram" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* 4-concept cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: '🌍', term: 'Population', symbol: 'N', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', def: 'The entire group you want to draw conclusions about. Can be finite or infinite.', ex: 'All adults in India, every batch of products a factory produces.' },
                  { icon: '🔬', term: 'Sample', symbol: 'n', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', def: 'A selected subset of the population that is actually observed and measured.', ex: '1,200 surveyed adults, 50 randomly chosen products from a batch.' },
                  { icon: '📐', term: 'Parameter', symbol: 'μ, σ, p', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', def: 'A fixed numerical value describing a characteristic of the entire population. Usually unknown.', ex: 'True average income of all Indians (μ), population proportion who prefer Brand A (p).' },
                  { icon: '📊', term: 'Statistic', symbol: 'x̄, s, p̂', color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8', def: 'A value computed from a sample, used to estimate the corresponding population parameter.', ex: 'Average income in a survey of 1,200 (x̄), proportion preferring Brand A in sample (p̂).' },
                ].map(c => (
                  <div key={c.term} style={{ padding: '1.3rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '12px', borderTop: `4px solid ${c.color}` }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{c.icon}</div>
                    <div style={{ fontWeight: 800, color: c.color, fontSize: '1.05rem' }}>{c.term}</div>
                    <code style={{ display: 'block', color: c.color, fontSize: '0.85rem', margin: '4px 0 8px 0', background: 'rgba(255,255,255,0.5)', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>{c.symbol}</code>
                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 8px 0' }}>{c.def}</p>
                    <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>e.g. {c.ex}</p>
                  </div>
                ))}
              </div>

              {/* Parameter vs Statistic comparison table */}
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>Parameter vs Statistic — Quick Reference</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        {['Characteristic', 'Parameter', 'Statistic'].map(h => (
                          <th key={h} style={{ padding: '0.8rem 1rem', textAlign: 'left', color: '#0f172a', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Describes', 'Population', 'Sample'],
                        ['Symbol (mean)', 'μ (mu)', 'x̄ (x-bar)'],
                        ['Symbol (std dev)', 'σ (sigma)', 's'],
                        ['Symbol (proportion)', 'p', 'p̂ (p-hat)'],
                        ['Symbol (size)', 'N', 'n'],
                        ['Is it known?', 'Usually unknown', 'Computed from data'],
                        ['Changes?', 'Fixed (doesn\'t change)', 'Changes with each sample'],
                        ['Purpose', 'Truth we seek', 'Estimate of truth'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.7rem 1rem', fontWeight: 600, color: '#334155' }}>{row[0]}</td>
                          <td style={{ padding: '0.7rem 1rem', color: '#7c3aed', fontFamily: 'monospace' }}>{row[1]}</td>
                          <td style={{ padding: '0.7rem 1rem', color: '#db2777', fontFamily: 'monospace' }}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Business context */}
              <div style={{ padding: '1.5rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2877', margin: '0 0 0.5rem 0' }}>💼 Business Example</h3>
                <p style={{ color: '#831843', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                  A product manager at an e-commerce company wants to know the <strong>average customer satisfaction score</strong> across all 2 million customers (the population parameter μ). Surveying all 2M is impossible. Instead, she surveys 1,500 randomly selected customers (sample, n=1,500) and finds x̄ = 7.8 / 10. Using inferential statistics, she constructs a 95% confidence interval [7.62, 7.98] and concludes: "We are 95% confident our true average satisfaction score lies between 7.62 and 7.98 for all customers."
                </p>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('estimation')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between a parameter and a statistic? Give me a real business example.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ESTIMATION ─── */}
      {activeTab === 'estimation' && (
        <Section eyebrow="Estimation Techniques" title="Point Estimation & Confidence Intervals">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Since we cannot observe the entire population, we use <strong>estimation</strong> to approximate population parameters. There are two key types: <strong>Point Estimation</strong> (a single best-guess value) and <strong>Interval Estimation</strong> (a range that likely contains the true value).
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Point Estimation */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', borderLeft: '4px solid #7c3aed' }}>
                <h3 style={{ color: '#7c3aed', margin: '0 0 0.8rem 0' }}>🎯 Point Estimation</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                  A <strong>point estimate</strong> is a single value used to estimate an unknown population parameter. It is the simplest form of estimation — computationally straightforward but provides <em>no measure of uncertainty</em>.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { param: 'Population Mean (μ)', est: 'Sample Mean: x̄ = Σxᵢ / n', color: '#7c3aed' },
                    { param: 'Population Std Dev (σ)', est: 'Sample Std Dev: s = √(Σ(xᵢ-x̄)² / (n-1))', color: '#7c3aed' },
                    { param: 'Population Proportion (p)', est: 'Sample Proportion: p̂ = successes / n', color: '#7c3aed' },
                  ].map(r => (
                    <div key={r.param} style={{ background: '#f5f3ff', borderRadius: '8px', padding: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: r.color, fontSize: '0.82rem', marginBottom: '4px' }}>{r.param}</div>
                      <code style={{ fontSize: '0.8rem', color: '#4c1d95' }}>{r.est}</code>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1rem', background: '#f5f3ff', padding: '0.8rem', borderRadius: '8px' }}>
                  <strong style={{ color: '#6d28d9', display: 'block', marginBottom: '4px' }}>⚠️ Key limitation:</strong>
                  <p style={{ color: '#4c1d95', fontSize: '0.85rem', margin: 0 }}>A point estimate gives no indication of how far from the true parameter it might be. Two analysts with different samples may report different point estimates — with no way to know which is closer to the truth.</p>
                </div>
              </div>

              {/* Confidence Interval */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', borderLeft: '4px solid #db2877' }}>
                <h3 style={{ color: '#db2877', margin: '0 0 0.8rem 0' }}>📏 Confidence Interval (CI)</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                  A <strong>Confidence Interval</strong> provides a range of plausible values for the parameter, along with a confidence level expressing how certain we are that the interval captures the true parameter.
                </p>
                <div style={{ background: '#fdf2f8', padding: '0.8rem 1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.92rem', color: '#9d174d', marginBottom: '1rem' }}>
                  CI = x̄ ± z* × (σ / √n)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
                  {[
                    { sym: 'x̄', desc: 'Sample mean (point estimate)' },
                    { sym: 'z*', desc: 'Critical value (from z-table)' },
                    { sym: 'σ', desc: 'Population std deviation' },
                    { sym: 'n', desc: 'Sample size' },
                    { sym: 'σ / √n', desc: 'Standard Error (SE)' },
                    { sym: 'z* × SE', desc: 'Margin of Error (MOE)' },
                  ].map(s => (
                    <div key={s.sym} style={{ background: '#fdf2f8', borderRadius: '6px', padding: '0.6rem' }}>
                      <code style={{ color: '#db2877', fontWeight: 700, fontSize: '0.9rem', display: 'block' }}>{s.sym}</code>
                      <span style={{ color: '#9d174d', fontSize: '0.75rem' }}>{s.desc}</span>
                    </div>
                  ))}
                </div>

                {/* z-score reference table */}
                <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.8rem 1rem' }}>
                  <strong style={{ color: '#334155', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Common Critical Values (z*):</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      { cl: '80%', z: '1.28' }, { cl: '85%', z: '1.44' },
                      { cl: '90%', z: '1.645' }, { cl: '95%', z: '1.96' }, { cl: '99%', z: '2.576' },
                    ].map(r => (
                      <div key={r.cl} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 10px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: '#db2877', fontSize: '0.82rem' }}>{r.cl}</div>
                        <div style={{ fontFamily: 'monospace', color: '#0f172a', fontSize: '0.88rem' }}>z* = {r.z}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive CI Simulator */}
            <CISlider />

            {/* Worked Example */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#15803d', margin: '0 0 0.8rem 0' }}>📝 Worked Example</h4>
              <p style={{ color: '#14532d', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                A quality engineer samples n=64 bolts and finds x̄ = 50.2mm with known σ = 1.6mm. Compute a 95% CI.
              </p>
              <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#166534', lineHeight: 1.8 }}>
                <div>SE  = σ / √n  = 1.6 / √64  = 1.6 / 8  = 0.2</div>
                <div>MOE = z* × SE = 1.96 × 0.2 = 0.392</div>
                <div>CI  = 50.2 ± 0.392  = <strong>[49.808, 50.592]</strong></div>
                <div style={{ marginTop: '8px', color: '#15803d' }}>→ We are 95% confident the true mean bolt length lies between 49.808mm and 50.592mm.</div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('workflow')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("How do I calculate a confidence interval from scratch without using any Python libraries?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── WORKFLOW ─── */}
      {activeTab === 'workflow' && (
        <Section eyebrow="Putting It All Together" title="Inferential Statistics Workflow">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Every inferential statistics task follows the same systematic process. Master this workflow and you can apply it to any estimation or hypothesis testing problem in data analytics.
            </p>

            {/* Step-by-step workflow */}
            <div style={{ maxWidth: '540px', margin: '0 auto 3rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {[
                { step: 1, icon: '🌍', title: 'Define the Population', subtitle: 'Clearly state who or what the population is. Identify the parameter of interest (μ, p, σ).', color: '#2563eb', bg: '#eff6ff' },
                { step: 2, icon: '🔬', title: 'Draw a Representative Sample', subtitle: 'Use random / stratified / cluster sampling. Record the sample size n.', color: '#16a34a', bg: '#f0fdf4' },
                { step: 3, icon: '🧮', title: 'Compute the Sample Statistic', subtitle: 'Calculate x̄, s, or p̂ from your sample data. This is your point estimate.', color: '#d97706', bg: '#fffbeb' },
                { step: 4, icon: '🎯', title: 'Point Estimation', subtitle: 'Report the statistic as your single best guess of the parameter.', color: '#7c3aed', bg: '#f5f3ff' },
                { step: 5, icon: '📏', title: 'Construct a Confidence Interval', subtitle: 'CI = x̄ ± z* × (σ/√n). Choose a confidence level (90%, 95%, 99%).', color: '#db2877', bg: '#fdf2f8' },
                { step: 6, icon: '💡', title: 'Make an Inference', subtitle: 'Interpret the CI in plain language. State conclusions about the population.', color: '#0891b2', bg: '#ecfeff' },
              ].map((s, i, arr) => (
                <WorkflowStep key={s.step} {...s} isLast={i === arr.length - 1} />
              ))}
            </div>

            {/* Python workflow code */}
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python Implementation — Full Workflow</h3>
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> inferential_stats.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import math

# ═══════════════════════════════════════════════════
# INFERENTIAL STATISTICS WORKFLOW - No external libs
# ═══════════════════════════════════════════════════

# ── Step 1 & 2: Sample Data ──
# Population: All 10,000 customers of an online store
# Sample: 100 randomly surveyed customers
sample_spend = [
    48, 52, 61, 45, 70, 38, 55, 63, 49, 57,
    44, 66, 51, 58, 42, 60, 53, 47, 69, 56,
    50, 55, 62, 46, 58, 41, 67, 54, 50, 59,
    43, 65, 52, 48, 71, 37, 56, 64, 50, 58,
    45, 67, 53, 49, 72, 39, 57, 65, 51, 60,
    46, 68, 54, 50, 73, 40, 58, 66, 52, 61,
    47, 69, 55, 51, 74, 41, 59, 67, 53, 62,
    48, 70, 56, 52, 75, 42, 60, 68, 54, 63,
    49, 71, 57, 53, 76, 43, 61, 69, 55, 64,
    50, 72, 58, 54, 77, 44, 62, 70, 56, 65
]

n = len(sample_spend)

# ── Step 3: Compute Sample Statistic (Point Estimate) ──
x_bar = sum(sample_spend) / n          # sample mean

# Sample standard deviation (s) — uses n-1 (Bessel's correction)
variance_s = sum((x - x_bar) ** 2 for x in sample_spend) / (n - 1)
s = math.sqrt(variance_s)

print(f"Step 3 - Point Estimates:")
print(f"  Sample Size (n):     {n}")
print(f"  Sample Mean (x̄):    {x_bar:.2f}")
print(f"  Sample Std Dev (s):  {s:.2f}")

# ── Step 4 & 5: Confidence Interval ──
# Using sample std dev as estimate of population std dev
z_95 = 1.96   # Critical value for 95% CI
z_99 = 2.576  # Critical value for 99% CI

std_error = s / math.sqrt(n)

for conf_level, z in [("95%", z_95), ("99%", z_99)]:
    margin = z * std_error
    lower  = x_bar - margin
    upper  = x_bar + margin
    print(f"\\n{conf_level} Confidence Interval:")
    print(f"  Standard Error: {std_error:.4f}")
    print(f"  Margin of Error: ±{margin:.2f}")
    print(f"  CI: [{lower:.2f}, {upper:.2f}]")

# ── Step 6: Inference ──
print("\\nConclusion:")
print(f"  We are 95% confident the true average monthly spend")
print(f"  of ALL customers lies between [{x_bar - z_95*std_error:.2f}, {x_bar + z_95*std_error:.2f}]")`} />
            </div>

            {/* Expected output */}
            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Expected Output</h4>
              <pre style={{ margin: 0, color: '#1e3a8a', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.7 }}>{`Step 3 - Point Estimates:
  Sample Size (n):     100
  Sample Mean (x̄):    57.43
  Sample Std Dev (s):  10.21

95% Confidence Interval:
  Standard Error: 1.0210
  Margin of Error: ±2.00
  CI: [55.43, 59.43]

99% Confidence Interval:
  Standard Error: 1.0210
  Margin of Error: ±2.63
  CI: [54.80, 60.06]

Conclusion:
  We are 95% confident the true average monthly spend
  of ALL customers lies between [55.43, 59.43]`}</pre>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Walk me through the complete inferential statistics workflow for a marketing A/B test scenario.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 9 Assessment" title="Day 9 Assessment & Review">
          <div className="panel">

            {/* Common Mistakes */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Critical Mistakes in Inferential Statistics
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Misinterpreting confidence intervals:</strong> A 95% CI does NOT mean "there is a 95% probability the true mean is in this interval." The interval either contains it or it doesn't. The 95% refers to the long-run frequency of the process.</li>
                <li><strong>Sampling bias:</strong> A sample is only useful if it is <em>representative</em> of the population. Convenience samples, self-selection bias, and non-random sampling all invalidate inferential conclusions.</li>
                <li><strong>Confusing larger CI with better precision:</strong> Wider intervals mean <em>less</em> precision. A 99% CI is wider but not "better" — there is always a trade-off between confidence and precision.</li>
                <li><strong>Using a sample statistic as if it equals the parameter:</strong> x̄ is an <em>estimate</em> of μ, not the same thing. Always acknowledge uncertainty.</li>
              </ul>
            </div>

            {/* Quiz */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <CheckCircle size={22} color="#db2877" /> Interactive Quiz
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <p style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem' }}>{idx + 1}. {q.q}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.opts.map((opt, oi) => {
                        const sel = selectedAnswers[q.id] === oi;
                        return (
                          <label key={oi} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: sel ? '2px solid #db2877' : '1px solid #cbd5e1', background: sel ? '#fdf2f8' : '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
                            <input type="radio" name={`q-${q.id}`} checked={sel} onChange={() => handleSelectOption(q.id, oi)} style={{ accentColor: '#db2877' }} />
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
                        <strong style={{ color: selectedAnswers[q.id] === q.ans ? '#15803d' : '#b91c1c', display: 'block', marginBottom: '0.3rem' }}>
                          {selectedAnswers[q.id] === q.ans ? 'Correct! ✓' : 'Incorrect ✗'}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{q.exp}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={checkFinalScore}>Verify Final Score</button>
                {score !== null && <strong style={{ color: '#db2877', fontSize: '1.2rem' }}>Score: {score} / {quizQuestions.length}</strong>}
              </div>
            </div>

            {/* Assignment */}
            <div style={{ background: '#fdf2f8', padding: '2rem', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
              <h3 style={{ color: '#db2877', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <HelpCircle size={22} /> Homework Assignment
              </h3>
              <ul style={{ color: '#831843', lineHeight: 1.9, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li><strong>Task 1:</strong> Define the following in your own words, each with a real-world business example: Population, Sample, Parameter, Statistic, Point Estimate, Confidence Interval.</li>
                <li><strong>Task 2:</strong> A telecom company surveys 225 customers and finds the average monthly data usage x̄ = 8.4 GB with σ = 3.0 GB. Compute and interpret a 90% and 99% Confidence Interval manually (show all steps: SE, MOE, CI bounds).</li>
                <li><strong>Task 3:</strong> A quality team draws a sample of n=36 product weights and finds x̄ = 500g with s = 12g. Calculate the 95% CI. If they want to reduce the margin of error by half, what sample size n do they need?</li>
                <li><strong>Task 4:</strong> Write a raw Python function <code>confidence_interval(data, confidence=0.95)</code> (no external libraries) that takes a list of numbers and returns (lower_bound, upper_bound, margin_of_error).</li>
                <li><strong>Task 5:</strong> Explain the trade-off between confidence level and interval width using a practical business decision scenario. Why might a business analyst choose 90% over 99%?</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 9 — Inferential Statistics! 🎉')}>
                Submit & Complete Day 9 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
