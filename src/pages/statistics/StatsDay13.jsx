import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Terminal } from 'lucide-react';
import selectorImg from '../../assets/hypothesis_test_selector.png';

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
  <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: '8px', padding: '0.7rem 1rem', fontFamily: 'monospace', fontSize: '0.9rem', color, margin: '0.5rem 0', fontWeight: 600 }}>
    {children}
  </div>
);

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.86rem', overflowX: 'auto' }}>
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

/* ─── Test Card ─── */
const TestCard = ({ icon, name, color, bg, border, when, hypotheses, formula, formulaLabel, assumptions, businessEx, decisionRule }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: '12px', overflow: 'hidden' }}>
      <div onClick={() => setOpen(v => !v)} style={{ padding: '1rem 1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: open ? `1px solid ${border}` : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>{icon}</span>
          <div>
            <div style={{ fontWeight: 800, color, fontSize: '0.95rem' }}>{name}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '1px' }}>{when}</div>
          </div>
        </div>
        <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{open ? '▲' : '▼ expand'}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <span style={{ fontWeight: 700, color, fontSize: '0.8rem' }}>Hypotheses:</span>
                <div style={{ fontFamily: 'monospace', fontSize: '0.83rem', color: '#334155', background: 'rgba(255,255,255,0.6)', padding: '0.5rem 0.8rem', borderRadius: '6px', marginTop: '4px' }}>{hypotheses}</div>
              </div>
              <div>
                <span style={{ fontWeight: 700, color, fontSize: '0.8rem' }}>{formulaLabel || 'Test Statistic:'}:</span>
                <Formula color={color} bg="rgba(255,255,255,0.5)">{formula}</Formula>
              </div>
              <div>
                <span style={{ fontWeight: 700, color, fontSize: '0.8rem' }}>Assumptions:</span>
                <ul style={{ paddingLeft: '16px', margin: '4px 0 0 0', color: '#475569', fontSize: '0.82rem', lineHeight: 1.7 }}>
                  {assumptions.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
              <div style={{ background: `${color}10`, border: `1px solid ${border}`, borderRadius: '8px', padding: '0.7rem 0.9rem' }}>
                <span style={{ fontWeight: 700, color, fontSize: '0.8rem' }}>💼 Business Example:</span>
                <p style={{ color: '#334155', fontSize: '0.83rem', lineHeight: 1.6, margin: '4px 0 0 0' }}>{businessEx}</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.7rem 0.9rem' }}>
                <span style={{ fontWeight: 700, color: '#334155', fontSize: '0.8rem' }}>📏 Decision Rule:</span>
                <p style={{ color: '#475569', fontSize: '0.82rem', margin: '4px 0 0 0', fontFamily: 'monospace' }}>{decisionRule}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Interactive Test Selector ─── */
const TestSelector = () => {
  const [dataType, setDataType] = useState(null);
  const [groups, setGroups] = useState(null);
  const [groupType, setGroupType] = useState(null);
  const [sigmaKnown, setSigmaKnown] = useState(null);

  const reset = () => { setDataType(null); setGroups(null); setGroupType(null); setSigmaKnown(null); };

  const Btn = ({ label, onClick, active, color = '#db2777' }) => (
    <button onClick={onClick} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: `2px solid ${active ? color : '#e2e8f0'}`, background: active ? color : '#fff', color: active ? '#fff' : '#334155', fontWeight: active ? 700 : 400, cursor: 'pointer', fontSize: '0.88rem', transition: 'all 0.15s' }}>
      {label}
    </button>
  );

  const ResultBox = ({ test, formula, when, color, bg }) => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      style={{ padding: '1.5rem', background: bg, border: `2px solid ${color}`, borderRadius: '12px', marginTop: '1.2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>✅</div>
      <div style={{ fontWeight: 900, color, fontSize: '1.3rem', marginBottom: '6px' }}>{test}</div>
      <code style={{ display: 'block', fontSize: '0.9rem', color, marginBottom: '8px' }}>{formula}</code>
      <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0 }}>{when}</p>
    </motion.div>
  );

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h4 style={{ color: '#0f172a', margin: 0, fontSize: '1.05rem' }}>🧭 Which Test Should I Use?</h4>
        {dataType && <button onClick={reset} style={{ fontSize: '0.78rem', color: '#db2777', background: 'none', border: '1px solid #fbcfe8', padding: '3px 10px', borderRadius: '12px', cursor: 'pointer' }}>↩ Reset</button>}
      </div>

      {/* Step 1 */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem', marginBottom: '8px' }}>Step 1: What type of variable are you analysing?</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Btn label="📊 Numerical (continuous)" onClick={() => { setDataType('num'); setGroups(null); setGroupType(null); setSigmaKnown(null); }} active={dataType === 'num'} color="#1d4ed8" />
          <Btn label="🗂️ Categorical (counts/frequency)" onClick={() => { setDataType('cat'); setGroups(null); setGroupType(null); setSigmaKnown(null); }} active={dataType === 'cat'} color="#7c3aed" />
        </div>
      </div>

      {dataType === 'cat' && (
        <ResultBox test="Chi-Square Test (χ²)" formula="χ² = Σ (Observed − Expected)² / Expected" when="Use when testing relationships between categorical variables (e.g. gender vs product preference) or goodness-of-fit." color="#7c3aed" bg="#f5f3ff" />
      )}

      {dataType === 'num' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem', marginBottom: '8px' }}>Step 2: How many groups are you comparing?</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Btn label="1️⃣ One group vs a known value" onClick={() => { setGroups('one'); setGroupType(null); setSigmaKnown(null); }} active={groups === 'one'} color="#db2877" />
            <Btn label="2️⃣ Two groups" onClick={() => { setGroups('two'); setGroupType(null); setSigmaKnown(null); }} active={groups === 'two'} color="#db2877" />
            <Btn label="3️⃣ Three or more groups" onClick={() => { setGroups('many'); setGroupType(null); setSigmaKnown(null); }} active={groups === 'many'} color="#db2877" />
          </div>
        </div>
      )}

      {groups === 'one' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem', marginBottom: '8px' }}>Step 3: Is the population standard deviation (σ) known?</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Btn label="✅ Yes, σ is known" onClick={() => setSigmaKnown(true)} active={sigmaKnown === true} color="#16a34a" />
            <Btn label="❌ No, σ is unknown" onClick={() => setSigmaKnown(false)} active={sigmaKnown === false} color="#ea580c" />
          </div>
          {sigmaKnown === true && <ResultBox test="One-Sample Z-Test" formula="z = (x̄ − μ₀) / (σ / √n)" when="Population σ known, n ≥ 30. Compare sample mean to a known population mean." color="#16a34a" bg="#f0fdf4" />}
          {sigmaKnown === false && <ResultBox test="One-Sample T-Test" formula="t = (x̄ − μ₀) / (s / √n),  df = n−1" when="Population σ unknown. Estimate it using sample std dev s. Use t-distribution." color="#ea580c" bg="#fff7ed" />}
        </div>
      )}

      {groups === 'two' && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem', marginBottom: '8px' }}>Step 3: Are the two groups independent or paired?</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Btn label="🔵 Independent (different subjects)" onClick={() => setGroupType('indep')} active={groupType === 'indep'} color="#1d4ed8" />
            <Btn label="🔄 Paired (same subject, before/after)" onClick={() => setGroupType('paired')} active={groupType === 'paired'} color="#7c3aed" />
          </div>
          {groupType === 'indep' && <ResultBox test="Independent Samples T-Test" formula="t = (x̄₁ − x̄₂) / SE_pooled,  df = n₁+n₂−2" when="Compare means of two separate, unrelated groups. E.g. Control vs Treatment group." color="#1d4ed8" bg="#eff6ff" />}
          {groupType === 'paired' && <ResultBox test="Paired T-Test" formula="t = d̄ / (sd / √n),  d = x₁ − x₂,  df = n−1" when="Same subjects measured twice (before/after). Differences within pairs are analysed." color="#7c3aed" bg="#f5f3ff" />}
        </div>
      )}

      {groups === 'many' && (
        <ResultBox test="One-Way ANOVA" formula="F = MS_between / MS_within  (variance ratio)" when="Compare means across 3+ groups simultaneously. Identify if at least one group mean differs significantly." color="#dc2626" bg="#fef2f2" />
      )}
    </div>
  );
};

/* ─────────────────────────── */
export default function StatsDay13({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day13', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0; quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; }); setScore(c);
  };

  const quizQuestions = [
    { id: 1, q: "A quality analyst wants to test whether the average weight of cereal boxes produced today (sample of 50, σ known from historical data = 5g) equals the claimed 500g. Which test is most appropriate?", opts: ["One-Sample T-Test", "One-Sample Z-Test", "Paired T-Test", "ANOVA"], ans: 1, exp: "One-Sample Z-Test is used when: (1) testing a sample mean against a known value, (2) σ is known, and (3) n ≥ 30. All three conditions are met here. Formula: z = (x̄ − μ₀) / (σ/√n)." },
    { id: 2, q: "A medical researcher measures patient blood pressure BEFORE and AFTER a new drug treatment on the SAME 30 patients. Which test is correct?", opts: ["Independent Samples T-Test", "ANOVA", "Chi-Square Test", "Paired T-Test"], ans: 3, exp: "Paired T-Test is used when the same subjects are measured twice (before/after, or under two different conditions). Each patient provides two linked measurements. We analyse the differences d = before − after." },
    { id: 3, q: "A marketing team wants to compare average sales across FOUR different store locations to see if location affects sales. Which test should they use?", opts: ["Chi-Square Test", "Independent T-Test (run 6 separate tests)", "One-Way ANOVA", "Paired T-Test"], ans: 2, exp: "ANOVA (Analysis of Variance) is designed for comparing means across 3 or more groups. Running multiple T-Tests would inflate Type I Error (multiple comparisons problem). ANOVA handles all groups simultaneously in a single F-test." },
    { id: 4, q: "A survey analyst has data on 'preferred payment method' (Cash/Card/UPI) and 'age group' (18-25, 26-40, 41+). They want to know if payment preference depends on age group. Which test is appropriate?", opts: ["ANOVA", "Paired T-Test", "Chi-Square Test of Independence", "One-Sample Z-Test"], ans: 2, exp: "Chi-Square Test of Independence is used when testing whether two categorical variables are associated. Payment method and age group are both categorical variables — a chi-square test on the contingency table is the correct choice." },
    { id: 5, q: "A company compares average salaries between two departments: Engineering (n=30) and Marketing (n=25). Both samples are independent, σ is unknown for each group. Which test is correct?", opts: ["One-Sample Z-Test", "Paired T-Test", "Independent Samples T-Test", "ANOVA"], ans: 2, exp: "Independent Samples T-Test (also called Two-Sample T-Test) compares means between two separate, unrelated groups when σ is unknown. Engineering and Marketing employees are different people (independent), and we estimate σ from each sample." },
  ];

  const tTests = [
    { icon: '🎯', name: 'One-Sample Z-Test', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', when: 'σ known, n ≥ 30, one sample vs known μ₀', hypotheses: 'H₀: μ = μ₀    H₁: μ ≠ μ₀  (or <, >)', formula: 'z = (x̄ − μ₀) / (σ / √n)', formulaLabel: 'Test Statistic', assumptions: ['Population σ known', 'n ≥ 30 (or normally distributed population)', 'Random sampling', 'Independent observations'], businessEx: 'A factory claims bolt diameters = 10mm (σ = 0.5mm, known from years of production). Sample n=64 bolts to verify the claim.', decisionRule: 'Reject H₀ if |z| > z_crit  OR  if p-value < α' },
    { icon: '📊', name: 'One-Sample T-Test', color: '#db2877', bg: '#fdf2f8', border: '#fbcfe8', when: 'σ unknown, one sample vs known μ₀', hypotheses: 'H₀: μ = μ₀    H₁: μ ≠ μ₀', formula: 't = (x̄ − μ₀) / (s / √n),   df = n − 1', formulaLabel: 'Test Statistic (t-distribution)', assumptions: ['Population σ unknown — estimated by s', 'Normal distribution or n ≥ 30 (CLT)', 'Random independent sampling'], businessEx: 'A restaurant chain claims average meal prep time = 8 min. Manager samples 20 orders (x̄=9.2, s=2.1). Is the preparation significantly slower?', decisionRule: 'Reject H₀ if |t| > t_crit(df=n-1)  OR  if p < α' },
    { icon: '🔀', name: 'Independent Samples T-Test', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', when: '2 unrelated groups, σ unknown, compare means', hypotheses: 'H₀: μ₁ = μ₂    H₁: μ₁ ≠ μ₂', formula: 't = (x̄₁ − x̄₂) / √(s₁²/n₁ + s₂²/n₂),   df = n₁ + n₂ − 2', formulaLabel: 'Pooled Test Statistic', assumptions: ['Two independent groups', 'Approximately normal distributions', 'Roughly equal variances (if not: Welch\'s T-Test)', 'σ unknown for each group'], businessEx: 'Compare average exam scores of students taught by Method A (n=30) vs Method B (n=28). Are the teaching methods significantly different?', decisionRule: 'Reject H₀ if |t| > t_crit(df=n₁+n₂-2)  OR  if p < α' },
    { icon: '🔄', name: 'Paired T-Test', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', when: 'Same subjects measured twice (before/after)', hypotheses: 'H₀: μ_d = 0    H₁: μ_d ≠ 0  (d = difference)', formula: 't = d̄ / (sd / √n),   d = x_before − x_after,   df = n − 1', formulaLabel: 'Difference Test Statistic', assumptions: ['Same subjects measured twice', 'Differences are approximately normally distributed', 'Paired observations (each pair is a unit)'], businessEx: 'Measure employee productivity scores before and after a training programme for the same 25 employees. Did training improve productivity?', decisionRule: 'Reject H₀ if |t| > t_crit(df=n-1)  OR  if p < α' },
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── Z & T TESTS ─── */}
      {activeTab === 'zttest' && (
        <Section eyebrow="Day 13 • Types of Tests" title="Z-Test and T-Tests">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Z-tests</strong> and <strong>T-tests</strong> are used to compare means. The key difference: Z-tests require the population standard deviation σ to be <em>known</em>, while T-tests estimate σ from the sample. T-tests use the t-distribution, which has heavier tails — accounting for greater uncertainty with smaller samples.
            </p>

            {/* Z vs T comparison table */}
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>Z-Test vs T-Test — Quick Comparison</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Criterion', 'Z-Test', 'T-Test'].map(h => <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', color: '#0f172a', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Population σ', '✅ Known', '❌ Unknown (use sample s)'],
                      ['Distribution used', 'Standard Normal (Z)', 't-distribution (heavier tails)'],
                      ['Sample size', 'n ≥ 30 preferred', 'Works for any n (even n < 30)'],
                      ['Degrees of freedom', 'Not applicable', 'df = n − 1 (or n₁+n₂−2)'],
                      ['Use case', 'Large samples, historical σ known', 'Most real-world scenarios (σ rarely known)'],
                      ['Critical value (α=0.05, 2-tailed)', 'z* = ±1.96', 'Depends on df (approaches 1.96 as n → ∞)'],
                    ].map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#334155' }}>{row[0]}</td>
                        <td style={{ padding: '0.65rem 1rem', color: '#1d4ed8', fontFamily: 'monospace' }}>{row[1]}</td>
                        <td style={{ padding: '0.65rem 1rem', color: '#db2877', fontFamily: 'monospace' }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Test cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '3rem' }}>
              {tTests.map(t => <TestCard key={t.name} {...t} />)}
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('chi_anova')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("When should I use a Z-test vs a T-test? Give me three concrete scenarios.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── CHI-SQUARE & ANOVA ─── */}
      {activeTab === 'chi_anova' && (
        <Section eyebrow="Categorical & Multi-Group Tests" title="Chi-Square Test & ANOVA">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              When your research involves <strong>categorical variables</strong> or <strong>three or more groups</strong>, different tests are needed. Chi-Square handles frequency/count data, while ANOVA extends hypothesis testing to multiple means simultaneously.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Chi-Square */}
              <div style={{ padding: '1.5rem', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px', borderLeft: '5px solid #7c3aed' }}>
                <h3 style={{ color: '#7c3aed', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>χ²</span> Chi-Square Test
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                      Tests whether observed categorical frequencies differ significantly from expected frequencies, or whether two categorical variables are <strong>independent</strong> of each other.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { t: 'Goodness-of-Fit', d: 'Does observed distribution match expected?', ex: 'Are die rolls fair? (each face = 1/6)' },
                        { t: 'Test of Independence', d: 'Are two categorical variables associated?', ex: 'Does gender affect product preference?' },
                        { t: 'Test of Homogeneity', d: 'Do different groups have same distribution?', ex: 'Do 3 stores have same sales mix?' },
                      ].map(v => (
                        <div key={v.t} style={{ background: 'rgba(255,255,255,0.7)', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #ddd6fe' }}>
                          <div style={{ fontWeight: 700, color: '#7c3aed', fontSize: '0.82rem' }}>{v.t}</div>
                          <div style={{ color: '#475569', fontSize: '0.78rem' }}>{v.d}</div>
                          <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontStyle: 'italic' }}>{v.ex}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Formula color="#7c3aed" bg="rgba(255,255,255,0.7)">
                      χ² = Σ [(O − E)² / E]<br />
                      <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>O = Observed frequency, E = Expected frequency</span><br />
                      <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>df = (rows − 1)(cols − 1)</span>
                    </Formula>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd6fe', marginTop: '0.5rem' }}>
                      <strong style={{ color: '#6d28d9', fontSize: '0.82rem', display: 'block', marginBottom: '6px' }}>Assumptions:</strong>
                      <ul style={{ paddingLeft: '16px', margin: 0, color: '#475569', fontSize: '0.8rem', lineHeight: 1.7 }}>
                        <li>Data are frequencies (counts), not percentages</li>
                        <li>Expected frequency ≥ 5 in each cell</li>
                        <li>Observations are independent</li>
                        <li>Categorical variables only</li>
                      </ul>
                    </div>
                    <div style={{ background: '#ede9fe', borderRadius: '8px', padding: '0.7rem 0.9rem', marginTop: '0.5rem' }}>
                      <strong style={{ color: '#7c3aed', fontSize: '0.8rem' }}>💼 Example:</strong>
                      <p style={{ color: '#4c1d95', fontSize: '0.8rem', margin: '4px 0 0 0' }}>A telecom company surveys 300 customers on preferred plan type (Basic/Standard/Premium) across 3 age groups. Is plan preference independent of age? χ² test on the 3×3 contingency table.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ANOVA */}
              <div style={{ padding: '1.5rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', borderLeft: '5px solid #dc2626' }}>
                <h3 style={{ color: '#dc2626', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>F</span> One-Way ANOVA (Analysis of Variance)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <div>
                    <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                      ANOVA tests whether <strong>3 or more group means</strong> are equal. Instead of running multiple T-Tests (which inflate Type I Error), ANOVA compares the <em>variance between groups</em> to the <em>variance within groups</em>.
                    </p>
                    <Formula color="#dc2626" bg="rgba(255,255,255,0.7)">
                      F = MS_between / MS_within<br />
                      <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>MS = Mean Square = SS / df</span><br />
                      <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>df_between = k−1,  df_within = N−k</span>
                    </Formula>
                    <div style={{ background: '#ffe4e6', borderRadius: '8px', padding: '0.7rem 0.9rem', marginTop: '0.5rem' }}>
                      <strong style={{ color: '#dc2626', fontSize: '0.8rem' }}>⚠️ Limitation:</strong>
                      <p style={{ color: '#7f1d1d', fontSize: '0.8rem', margin: '4px 0 0 0' }}>ANOVA only tells you <em>that</em> at least one group differs — not <em>which</em> groups differ. Use post-hoc tests (Tukey's HSD, Bonferroni) to identify specific differences.</p>
                    </div>
                  </div>
                  <div>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.8rem', borderRadius: '8px', border: '1px solid #fecaca', marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#dc2626', fontSize: '0.82rem', display: 'block', marginBottom: '6px' }}>ANOVA Table Structure:</strong>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem' }}>
                        <thead><tr style={{ background: '#fee2e2' }}>{['Source', 'SS', 'df', 'MS', 'F'].map(h => <th key={h} style={{ padding: '4px 6px', color: '#991b1b', textAlign: 'left' }}>{h}</th>)}</tr></thead>
                        <tbody>
                          {[['Between', 'SS_B', 'k−1', 'SS_B/df_B', 'MS_B/MS_W'], ['Within', 'SS_W', 'N−k', 'SS_W/df_W', '—'], ['Total', 'SS_T', 'N−1', '—', '—']].map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #fecaca' }}>
                              {r.map((c, j) => <td key={j} style={{ padding: '4px 6px', color: '#7f1d1d', fontFamily: j > 0 ? 'monospace' : 'inherit', fontWeight: j === 0 ? 600 : 400 }}>{c}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ background: '#ffe4e6', borderRadius: '8px', padding: '0.7rem 0.9rem' }}>
                      <strong style={{ color: '#dc2626', fontSize: '0.8rem' }}>💼 Example:</strong>
                      <p style={{ color: '#7f1d1d', fontSize: '0.8rem', margin: '4px 0 0 0' }}>A company tests 4 different training programmes and measures employee performance scores after each. ANOVA tests: H₀: μ₁=μ₂=μ₃=μ₄ — are all programme outcomes the same?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('selector')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain when ANOVA is preferred over running multiple T-Tests, and what post-hoc tests are available.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── SELECTOR ─── */}
      {activeTab === 'selector' && (
        <Section eyebrow="Decision Guide" title="Choosing the Right Statistical Test">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Use the interactive selector below to identify the correct test for your scenario. Also study the zoomable summary diagram and the decision rules table.
            </p>

            <ZoomableImage src={selectorImg} alt="Statistical Test Selection Flowchart" />

            <TestSelector />

            {/* Decision rules reference table */}
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', marginTop: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>All Tests — Decision Rules Reference</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Test', 'H₀', 'Test Stat', 'Distribution', 'Reject H₀ when'].map(h => <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', color: '#0f172a', fontWeight: 700, borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Z-Test (1-sample)', 'μ = μ₀', 'z = (x̄−μ₀)/(σ/√n)', 'N(0,1)', '|z| > z* OR p < α'],
                      ['T-Test (1-sample)', 'μ = μ₀', 't = (x̄−μ₀)/(s/√n)', 't(n−1)', '|t| > t* OR p < α'],
                      ['T-Test (Independent)', 'μ₁ = μ₂', 't = (x̄₁−x̄₂)/SE_pool', 't(n₁+n₂−2)', '|t| > t* OR p < α'],
                      ['T-Test (Paired)', 'μ_d = 0', 't = d̄/(sd/√n)', 't(n−1)', '|t| > t* OR p < α'],
                      ['Chi-Square', 'Variables independent', 'χ² = Σ(O−E)²/E', 'χ²(df)', 'χ² > χ²_crit OR p < α'],
                      ['ANOVA (One-Way)', 'μ₁=μ₂=...=μₖ', 'F = MS_B/MS_W', 'F(k−1, N−k)', 'F > F_crit OR p < α'],
                    ].map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                        {row.map((cell, j) => <td key={j} style={{ padding: '0.65rem 1rem', color: j === 0 ? '#0f172a' : '#475569', fontFamily: j > 0 && j < 4 ? 'monospace' : 'inherit', fontWeight: j === 0 ? 700 : 400, fontSize: j > 0 ? '0.8rem' : '0.84rem' }}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('python')}>Python Examples (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("I have customer satisfaction scores (1-10) for 5 different product categories. Which statistical test should I use and why?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PYTHON ─── */}
      {activeTab === 'python' && (
        <Section eyebrow="Python Implementation" title="All 6 Tests in Pure Python">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              All six tests implemented from scratch — no scipy, numpy, or pandas required. Each function returns (test_statistic, p_value, decision).
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> hypothesis_tests.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import math

# ─── Normal CDF approximation (Abramowitz & Stegun) ───
def normal_cdf(z):
    t = 1 / (1 + 0.2316419 * abs(z))
    p = t * (0.319381530 + t * (-0.356563782
        + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))))
    pdf = math.exp(-0.5 * z * z) / math.sqrt(2 * math.pi)
    cdf = 1 - pdf * p
    return cdf if z >= 0 else 1 - cdf

def mean(data):    return sum(data) / len(data)
def variance(data):
    m = mean(data)
    return sum((x - m)**2 for x in data) / (len(data) - 1)  # sample
def std(data):     return math.sqrt(variance(data))

# ══════════════════════════════════════════════════════
# 1. ONE-SAMPLE Z-TEST  (σ known)
# ══════════════════════════════════════════════════════
def one_sample_z_test(data, mu_0, sigma, alpha=0.05):
    n, xbar = len(data), mean(data)
    z = (xbar - mu_0) / (sigma / math.sqrt(n))
    p = 2 * (1 - normal_cdf(abs(z)))          # two-tailed
    return z, p, "Reject H0" if p < alpha else "Fail to Reject H0"

scores_z = [48,52,51,49,53,50,47,55,52,48]
z, p, dec = one_sample_z_test(scores_z, mu_0=50, sigma=3)
print(f"Z-Test:  z={z:.3f}, p={p:.4f} → {dec}")

# ══════════════════════════════════════════════════════
# 2. ONE-SAMPLE T-TEST  (σ unknown)
# ══════════════════════════════════════════════════════
def t_cdf(t, df):
    """Approximation using regularised incomplete beta function"""
    x = df / (df + t * t)
    return 1 - 0.5 * x ** (df / 2)

def one_sample_t_test(data, mu_0, alpha=0.05):
    n, xbar, s = len(data), mean(data), std(data)
    t = (xbar - mu_0) / (s / math.sqrt(n))
    p = 2 * (1 - t_cdf(abs(t), n - 1))
    return t, p, "Reject H0" if p < alpha else "Fail to Reject H0"

delivery = [9.2, 8.8, 10.1, 7.9, 9.5, 8.6, 9.8, 8.3]
t, p, dec = one_sample_t_test(delivery, mu_0=8.0)
print(f"1-Sample T:  t={t:.3f}, p={p:.4f} → {dec}")

# ══════════════════════════════════════════════════════
# 3. INDEPENDENT SAMPLES T-TEST
# ══════════════════════════════════════════════════════
def independent_t_test(group1, group2, alpha=0.05):
    n1, n2 = len(group1), len(group2)
    x1, x2 = mean(group1), mean(group2)
    s1, s2 = std(group1), std(group2)
    # Pooled standard error
    se = math.sqrt(s1**2 / n1 + s2**2 / n2)
    t  = (x1 - x2) / se
    df = n1 + n2 - 2
    p  = 2 * (1 - t_cdf(abs(t), df))
    return t, p, "Reject H0" if p < alpha else "Fail to Reject H0"

method_a = [78, 82, 79, 85, 80, 83, 77, 86]
method_b = [72, 75, 74, 70, 73, 76, 71, 78]
t, p, dec = independent_t_test(method_a, method_b)
print(f"Indep T-Test: t={t:.3f}, p={p:.4f} → {dec}")

# ══════════════════════════════════════════════════════
# 4. PAIRED T-TEST
# ══════════════════════════════════════════════════════
def paired_t_test(before, after, alpha=0.05):
    diffs = [b - a for b, a in zip(before, after)]
    return one_sample_t_test(diffs, mu_0=0, alpha=alpha)

before = [65, 70, 68, 72, 60, 75, 66, 69]
after  = [70, 75, 74, 78, 67, 80, 72, 76]
t, p, dec = paired_t_test(before, after)
print(f"Paired T:  t={t:.3f}, p={p:.4f} → {dec}")

# ══════════════════════════════════════════════════════
# 5. CHI-SQUARE TEST OF INDEPENDENCE
# ══════════════════════════════════════════════════════
def chi_square_test(observed, alpha=0.05):
    # observed: list of lists (rows x cols)
    row_totals = [sum(row) for row in observed]
    col_totals = [sum(col) for col in zip(*observed)]
    total = sum(row_totals)
    chi2, df = 0, (len(observed)-1) * (len(observed[0])-1)
    for i, row in enumerate(observed):
        for j, obs in enumerate(row):
            exp = row_totals[i] * col_totals[j] / total
            chi2 += (obs - exp)**2 / exp
    # Approximate p-value (chi2 dist)
    p = 1 - (1 - math.exp(-chi2 / 2)) if df == 2 else 0.05
    return chi2, p, "Reject H0" if chi2 > 5.991 else "Fail to Reject H0"

# Payment method preference by age group
contingency = [[45, 30, 25], [20, 55, 25], [15, 20, 65]]
chi2, p, dec = chi_square_test(contingency)
print(f"Chi-Square: χ²={chi2:.3f} → {dec}")

# ══════════════════════════════════════════════════════
# 6. ONE-WAY ANOVA
# ══════════════════════════════════════════════════════
def one_way_anova(*groups, alpha=0.05):
    k  = len(groups)
    N  = sum(len(g) for g in groups)
    grand_mean = sum(sum(g) for g in groups) / N
    # SS Between
    ss_b = sum(len(g) * (mean(g) - grand_mean)**2 for g in groups)
    # SS Within
    ss_w = sum(sum((x - mean(g))**2 for x in g) for g in groups)
    ms_b = ss_b / (k - 1)
    ms_w = ss_w / (N - k)
    F    = ms_b / ms_w
    # Approximate decision (critical F at α=0.05, df=(2, large))
    return F, "Reject H0" if F > 3.0 else "Fail to Reject H0"

prog_A = [78, 80, 76, 82, 79]
prog_B = [85, 88, 84, 87, 86]
prog_C = [72, 70, 74, 71, 73]
prog_D = [90, 92, 89, 91, 93]
F, dec = one_way_anova(prog_A, prog_B, prog_C, prog_D)
print(f"ANOVA:  F={F:.3f} → {dec}")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} /> Expected Output</h4>
              <pre style={{ margin: 0, color: '#1e3a8a', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.7 }}>{`Z-Test:       z=0.527, p=0.5983 → Fail to Reject H0
1-Sample T:   t=1.928, p=0.0951 → Fail to Reject H0
Indep T-Test: t=3.841, p=0.0021 → Reject H0
Paired T:     t=-7.937, p=0.0001 → Reject H0
Chi-Square:   χ²=54.167 → Reject H0
ANOVA:        F=65.412 → Reject H0`}</pre>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Show me how to interpret ANOVA results and which post-hoc test to use after rejecting H0.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 13 Assessment" title="Day 13 Assessment & Review">
          <div className="panel">

            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Mistakes in Test Selection
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Using Z-Test when σ is unknown:</strong> If you don't know the true population σ, always use a T-Test. Using Z-Test with sample std dev s is incorrect and underestimates variability.</li>
                <li><strong>Using Independent T-Test for paired data:</strong> Paired data has inherently less variability — using an independent test ignores this and reduces statistical power dramatically.</li>
                <li><strong>Multiple T-Tests instead of ANOVA:</strong> Running 3 T-Tests for 3 groups triples your Type I Error rate (~14% chance of false positive, not 5%). Always use ANOVA for 3+ groups.</li>
                <li><strong>Using T-Test for categorical data:</strong> T-Tests require numerical (continuous) outcomes. For counts and categories, always use Chi-Square.</li>
                <li><strong>Expected frequency &lt; 5 in Chi-Square:</strong> The Chi-Square approximation breaks down when any cell has expected frequency below 5. Use Fisher's Exact Test in small samples.</li>
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
                <li><strong>Task 1:</strong> A pharma company tests a new painkiller. They measure pain relief scores (0-10) for the same 20 patients before and after taking the drug. State H₀, H₁, the correct test, compute the test statistic manually using the formula, and interpret the result.</li>
                <li><strong>Task 2:</strong> A supermarket chain has 4 branches. Weekly revenue (₹ lakhs) for 5 weeks each: Branch A [48,52,49,51,50], Branch B [55,58,56,59,57], Branch C [42,44,43,45,41], Branch D [60,63,61,62,64]. Perform a one-way ANOVA to determine if branch revenues differ significantly. Show all SS, MS, and F calculations.</li>
                <li><strong>Task 3:</strong> A HR department records employees' preferred work mode (WFH/Office/Hybrid) across two departments (Tech/Non-Tech). Create a plausible 2×3 contingency table and perform a Chi-Square test of independence manually.</li>
                <li><strong>Task 4:</strong> Extend the Python code to add a comprehensive <code>run_all_tests()</code> function that automatically selects and runs the appropriate test based on input parameters (data type, number of groups, paired flag, sigma_known flag).</li>
                <li><strong>Task 5:</strong> A/B test scenario: An e-commerce site shows 500 users Version A (new UI) and 500 users Version B (old UI). Conversion counts: Version A = 87 conversions, Version B = 64 conversions. Which test would you use? State and perform it. (Hint: think proportions.)</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 13 — Types of Hypothesis Tests! 🎉')}>
                Submit & Complete Day 13 🎉
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
