import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal, RefreshCw } from 'lucide-react';
import samplingImg from '../../assets/sampling_methods_diagram.png';

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

const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.88rem', overflowX: 'auto' }}>
      {lines.map((line, li) => {
        const rx = /(#[^\n]*)|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?:\b(import|from|as|return|if|else|for|while|in|def|class|and|or|not|is|None|True|False)\b)|(?:\b(print|len|sum|range|sorted|min|max|round|abs|int|float|str|list|dict|random|sample|choice|shuffle)\b)|(\b\d+\.?\d*\b)|([^\s\w])/g;
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

/* ─── Sampling Simulator (pure React + SVG) ─── */
const GRID_ROWS = 6, GRID_COLS = 10;
const TOTAL = GRID_ROWS * GRID_COLS;

const buildGrid = () => Array.from({ length: TOTAL }, (_, i) => ({
  id: i, row: Math.floor(i / GRID_COLS), col: i % GRID_COLS,
  strata: Math.floor(i / GRID_COLS / 2),  // 3 strata (rows 0-1, 2-3, 4-5)
  cluster: Math.floor((i % GRID_COLS) / 3), // 4 clusters by col
}));

const STRATA_COLORS = ['#3b82f6', '#16a34a', '#f59e0b'];
const CLUSTER_COLORS = ['#7c3aed', '#db2777', '#0891b2', '#dc2626'];

function runSampling(method, sampleSize) {
  const grid = buildGrid();
  const n = Math.min(sampleSize, TOTAL);

  if (method === 'srs') {
    // Shuffle and pick first n
    const shuffled = [...grid].sort(() => Math.random() - 0.5);
    return new Set(shuffled.slice(0, n).map(p => p.id));
  }
  if (method === 'systematic') {
    const k = Math.floor(TOTAL / n);
    const start = Math.floor(Math.random() * k);
    const ids = new Set();
    for (let i = start; i < TOTAL && ids.size < n; i += k) ids.add(i);
    return ids;
  }
  if (method === 'stratified') {
    const perStratum = Math.floor(n / 3);
    const ids = new Set();
    for (let s = 0; s < 3; s++) {
      const strataItems = grid.filter(p => p.strata === s).sort(() => Math.random() - 0.5);
      strataItems.slice(0, perStratum).forEach(p => ids.add(p.id));
    }
    return ids;
  }
  if (method === 'cluster') {
    // Pick 2 random clusters
    const allClusters = [0, 1, 2, 3].sort(() => Math.random() - 0.5).slice(0, 2);
    return new Set(grid.filter(p => allClusters.includes(p.cluster)).map(p => p.id));
  }
  if (method === 'convenience') {
    // First n items (top-left corner)
    return new Set(grid.slice(0, n).map(p => p.id));
  }
  return new Set();
}

const SamplingSimulator = () => {
  const [method, setMethod] = useState('srs');
  const [sampleSize, setSampleSize] = useState(15);
  const [selected, setSelected] = useState(() => runSampling('srs', 15));
  const grid = useMemo(() => buildGrid(), []);

  const resample = () => setSelected(runSampling(method, sampleSize));

  const methodMeta = {
    srs:         { label: 'Simple Random',  color: '#3b82f6', colorFn: () => '#3b82f6' },
    systematic:  { label: 'Systematic',     color: '#16a34a', colorFn: () => '#16a34a' },
    stratified:  { label: 'Stratified',     color: '#f59e0b', colorFn: (p) => STRATA_COLORS[p.strata] },
    cluster:     { label: 'Cluster',        color: '#7c3aed', colorFn: (p) => CLUSTER_COLORS[p.cluster] },
    convenience: { label: 'Convenience',    color: '#dc2626', colorFn: () => '#dc2626' },
  };
  const meta = methodMeta[method];

  return (
    <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '1.8rem' }}>
      <h4 style={{ color: '#0f172a', margin: '0 0 1.2rem 0', fontSize: '1.1rem' }}>🎮 Sampling Method Simulator</h4>
      <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 1.2rem 0' }}>Select a method, adjust the sample size, and click <strong>Resample</strong> to see a new draw from the 60-person population grid.</p>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '0.88rem' }}>Sampling Method:</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {Object.entries(methodMeta).map(([key, m]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.4rem 0.8rem', borderRadius: '8px', border: `1.5px solid ${method === key ? m.color : '#e2e8f0'}`, background: method === key ? '#fff' : 'transparent', cursor: 'pointer', fontSize: '0.85rem', fontWeight: method === key ? 700 : 400, color: method === key ? m.color : '#475569' }}>
                <input type="radio" name="sampling-method" value={key} checked={method === key} onChange={() => setMethod(key)} style={{ accentColor: m.color }} />
                {m.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '0.88rem' }}>
            Sample Size: <span style={{ color: meta.color }}>{method === 'cluster' ? 'auto (2 clusters)' : sampleSize}</span>
          </label>
          {method !== 'cluster' && (
            <input type="range" min="5" max="30" value={sampleSize}
              onChange={e => setSampleSize(Number(e.target.value))}
              style={{ width: '100%', accentColor: meta.color }} />
          )}
          <div style={{ marginTop: '1rem' }}>
            <button onClick={resample}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1.2rem', background: meta.color, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
              <RefreshCw size={14} /> Resample
            </button>
          </div>

          {/* Legend */}
          {method === 'stratified' && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['Stratum A (rows 1-2)', 'Stratum B (rows 3-4)', 'Stratum C (rows 5-6)'].map((l, i) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#475569' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: STRATA_COLORS[i] }} />{l}
                </div>
              ))}
            </div>
          )}
          {method === 'cluster' && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4'].map((l, i) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#475569' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: CLUSTER_COLORS[i] }} />{l}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Population Grid */}
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1rem', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`, gap: '4px' }}>
          {grid.map(p => {
            const isSel = selected.has(p.id);
            const dotColor = isSel ? meta.colorFn(p) : method === 'stratified' ? STRATA_COLORS[p.strata] + '30' : method === 'cluster' ? CLUSTER_COLORS[p.cluster] + '30' : '#e2e8f0';
            return (
              <div key={p.id} title={`Person ${p.id + 1}`}
                style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: dotColor, border: isSel ? `2px solid ${meta.colorFn(p)}` : '1px solid transparent', transition: 'all 0.25s ease', transform: isSel ? 'scale(1.15)' : 'scale(1)', boxShadow: isSel ? `0 0 6px ${meta.colorFn(p)}60` : 'none' }}
              />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', fontSize: '0.78rem', color: '#64748b' }}>
          <span>👥 Population: {TOTAL} people</span>
          <span style={{ color: meta.color, fontWeight: 700 }}>✅ Sampled: {selected.size}</span>
          <span>📊 Rate: {((selected.size / TOTAL) * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Method Card ─── */
const MethodCard = ({ icon, name, type, color, bg, border, formula, when, when_not, business, pros, cons }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: '12px', overflow: 'hidden' }}>
      <div onClick={() => setExpanded(e => !e)} style={{ padding: '1rem 1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: expanded ? `1px solid ${border}` : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>{icon}</span>
          <div>
            <div style={{ fontWeight: 800, color, fontSize: '0.95rem' }}>{name}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '1px' }}>{type}</div>
          </div>
        </div>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{expanded ? '▲ collapse' : '▼ expand'}</span>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {formula && <div style={{ background: 'rgba(255,255,255,0.7)', padding: '0.6rem 0.8rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.85rem', color }}>{formula}</div>}
              <div><strong style={{ color, fontSize: '0.82rem' }}>✅ Use when:</strong> <span style={{ color: '#475569', fontSize: '0.85rem' }}>{when}</span></div>
              {when_not && <div><strong style={{ color: '#dc2626', fontSize: '0.82rem' }}>❌ Avoid when:</strong> <span style={{ color: '#475569', fontSize: '0.85rem' }}>{when_not}</span></div>}
              <div><strong style={{ color, fontSize: '0.82rem' }}>💼 Business example:</strong> <span style={{ color: '#475569', fontSize: '0.85rem' }}>{business}</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '0.6rem' }}>
                  <strong style={{ color: '#15803d', fontSize: '0.78rem', display: 'block' }}>Advantages:</strong>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', color: '#166534', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    {pros.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.6rem' }}>
                  <strong style={{ color: '#b91c1c', fontSize: '0.78rem', display: 'block' }}>Disadvantages:</strong>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', color: '#991b1b', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    {cons.map(c => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────── */
export default function StatsDay10({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  const handleContinue = (next) => { onNavigate('stats_day10', next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectOption = (qId, idx) => setSelectedAnswers(p => ({ ...p, [qId]: idx }));
  const handleCheckQuestion = (qId) => setCheckedQuestions(p => ({ ...p, [qId]: true }));
  const checkFinalScore = () => {
    let c = 0; quizQuestions.forEach(q => { if (selectedAnswers[q.id] === q.ans) c++; }); setScore(c);
  };

  const probMethods = [
    { icon: '🎲', name: 'Simple Random Sampling (SRS)', type: 'Probability Sampling', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', formula: 'Every element has equal probability p = n / N of being selected', when: 'Population is small, homogeneous, and a complete sampling frame is available.', when_not: 'Population has distinct sub-groups that must be represented — stratified would be better.', business: 'A bank randomly selects 500 transaction records from 50,000 to audit for fraud.', pros: ['No bias if truly random', 'Simple to implement', 'Statistically sound'], cons: ['Requires a full sampling frame', 'Can miss rare subgroups', 'Not practical for large spread-out populations'] },
    { icon: '📏', name: 'Systematic Sampling', type: 'Probability Sampling', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', formula: 'Sampling interval k = N / n  → Select every k-th element after a random start', when: 'Population is large, ordered (e.g. a list), and homogeneous within order.', when_not: 'Population has hidden periodicity that matches interval k (periodic bias risk).', business: 'A factory inspects every 50th product off the assembly line (k=50) for quality control.', pros: ['Easy to execute', 'Spread across population', 'No need for random number generation after start'], cons: ['Periodic pattern in population can cause bias', 'Less random than SRS'] },
    { icon: '📊', name: 'Stratified Sampling', type: 'Probability Sampling', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', formula: 'nₛ = n × (Nₛ / N)  → proportional allocation per stratum', when: 'Population has distinct, non-overlapping subgroups (strata) that must each be represented.', when_not: 'Stratum boundaries are unknown or cannot be defined.', business: 'A telecom company stratifies customers by plan tier (Basic/Standard/Premium) then samples proportionally from each tier to study churn.', pros: ['Ensures all subgroups represented', 'More precise estimates', 'Reduced sampling error vs SRS'], cons: ['Must know strata boundaries', 'More complex to administer', 'Proportions must be known in advance'] },
    { icon: '🔵', name: 'Cluster Sampling', type: 'Probability Sampling', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', formula: 'Randomly select entire clusters; survey all or sample within selected clusters', when: 'Population is geographically dispersed and naturally divided into clusters.', when_not: 'Clusters are not similar to each other internally (defeats purpose).', business: 'A government survey selects 50 districts at random, then surveys all households within those districts.', pros: ['Very cost-effective', 'Practical for geographically spread populations', 'No need for complete sampling frame'], cons: ['Higher sampling error than SRS', 'Assumes clusters are internally homogeneous', 'Rarely optimal statistically'] },
  ];

  const nonProbMethods = [
    { icon: '🛒', name: 'Convenience Sampling', type: 'Non-Probability Sampling', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', when: 'Exploratory research, pilot tests, or when quick preliminary feedback is needed.', when_not: 'Making generalisable conclusions about a population.', business: 'A product manager asks colleagues to test a new app feature before a formal study.', pros: ['Fast and cheap', 'Easy to implement', 'Good for early-stage testing'], cons: ['High selection bias', 'Not representative', 'Results cannot be generalised'] },
    { icon: '🧑‍⚖️', name: 'Judgement Sampling', type: 'Non-Probability Sampling', color: '#d97706', bg: '#fffbeb', border: '#fde68a', when: 'Expert knowledge is essential to select relevant participants (e.g. industry specialists).', when_not: 'Objective, unbiased estimates of population parameters are needed.', business: 'A pharma company selects top cardiologists to evaluate a new drug — general patients are not relevant subjects.', pros: ['Expert-guided selection', 'Efficient for niche populations', 'Can be highly relevant'], cons: ['Subjective bias', 'Not generalisable', 'Dependent on researcher expertise'] },
    { icon: '❄️', name: 'Snowball Sampling', type: 'Non-Probability Sampling', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', when: 'Hidden, rare, or hard-to-reach populations (e.g. underground communities, rare disease patients).', when_not: 'Representative, unbiased population estimates.', business: 'A researcher studying underground freelance workers asks each participant to refer 2-3 others they know.', pros: ['Reaches hidden populations', 'Low cost', 'Self-propagating'], cons: ['Strong network bias', 'Non-representative', 'Sample grows unpredictably'] },
    { icon: '📋', name: 'Quota Sampling', type: 'Non-Probability Sampling', color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8', when: 'Must represent specific demographics/quotas without full randomisation; market research.', when_not: 'Statistical inference with quantified uncertainty.', business: 'A market research firm interviews exactly 100 men and 100 women aged 18-35 in each of 5 cities.', pros: ['Controls subgroup proportions', 'No sampling frame needed', 'Fast and structured'], cons: ['Selection within quotas is non-random', 'Interviewer bias', 'Cannot calculate sampling error'] },
  ];

  const quizQuestions = [
    { id: 1, q: "A researcher selects every 20th customer from a sorted database of 10,000. What sampling method is this?", opts: ["Simple Random Sampling", "Stratified Sampling", "Systematic Sampling", "Cluster Sampling"], ans: 2, exp: "Systematic sampling selects elements at fixed intervals (every k-th unit) from an ordered list. Here k = 10,000 / 500 = 20." },
    { id: 2, q: "An e-commerce company divides its 500,000 customers into Silver, Gold, and Platinum tiers, then randomly samples 200 from each tier. Which method is this?", opts: ["Cluster Sampling", "Stratified Sampling", "Simple Random Sampling", "Quota Sampling"], ans: 1, exp: "Stratified sampling divides the population into non-overlapping strata (Silver, Gold, Platinum) and randomly samples from each stratum. This ensures each tier is represented." },
    { id: 3, q: "Which sampling method requires NO sampling frame (complete list of population members)?", opts: ["Simple Random Sampling", "Systematic Sampling", "Stratified Sampling", "Snowball Sampling"], ans: 3, exp: "Snowball sampling starts with a few known participants who then refer others. It requires no pre-existing list of the population — making it ideal for hidden or hard-to-reach populations." },
    { id: 4, q: "What is the main advantage of Cluster Sampling over Simple Random Sampling?", opts: ["It produces less sampling error", "It is computationally more precise", "It is significantly more cost-effective for geographically dispersed populations", "It guarantees equal representation of all subgroups"], ans: 2, exp: "Cluster sampling's primary advantage is cost and logistical efficiency. Instead of travelling to individually sampled units spread across a region, you survey all units within selected clusters — drastically reducing travel costs." },
    { id: 5, q: "A journalist interviews the first 30 people who agree to be interviewed outside a shopping mall. What is the most serious problem with this approach?", opts: ["The sample size is too large", "It uses systematic sampling incorrectly", "It is convenience sampling — highly biased and not representative of the broader population", "It violates stratified sampling rules"], ans: 2, exp: "This is convenience sampling — selecting whoever is available and willing. The resulting sample is unlikely to represent the broader population (shoppers at one mall at one time are not typical of all consumers), making generalisations invalid." },
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ─── THEORY ─── */}
      {activeTab === 'theory' && (
        <Section eyebrow="Day 10 • Sampling" title="What is Sampling?">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              <strong>Sampling</strong> is the process of selecting a subset (sample) from a larger group (population) to study. Since it is almost always impractical or impossible to measure every element of a population, sampling allows us to make valid statistical inferences about the whole from a manageable part.
            </p>

            <ZoomableImage src={samplingImg} alt="Sampling Methods — Probability and Non-Probability" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>

              {/* Why Sample? */}
              <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
                <h3 style={{ color: '#db2777', margin: '0 0 0.8rem 0' }}>❓ Why Do We Sample Instead of Studying the Entire Population?</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                  {[
                    { icon: '💰', reason: 'Cost', desc: 'Surveying millions is prohibitively expensive. A representative sample achieves the same insight at a fraction of the cost.' },
                    { icon: '⏱️', reason: 'Time', desc: 'A census takes years. A well-designed sample can yield results in days or weeks.' },
                    { icon: '🔬', reason: 'Practicality', desc: 'Some populations are infinite (all future customers) or physically inaccessible (all fish in an ocean).' },
                    { icon: '💥', reason: 'Destructive Testing', desc: 'Testing every light bulb until it fails, or every airbag, would leave none to sell.' },
                    { icon: '✅', reason: 'Accuracy', desc: 'Focused sampling with careful methodology can be MORE accurate than a poorly executed census.' },
                  ].map(r => (
                    <div key={r.reason} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.8rem' }}>
                      <div style={{ fontSize: '1.3rem' }}>{r.icon}</div>
                      <div style={{ fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>{r.reason}</div>
                      <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sampling Distribution */}
              <div style={{ padding: '1.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px' }}>
                <h3 style={{ color: '#1d4ed8', margin: '0 0 0.8rem 0' }}>📈 Sampling Distribution</h3>
                <p style={{ color: '#1e3a8a', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 0.8rem 0' }}>
                  A <strong>Sampling Distribution</strong> is the probability distribution of a statistic (e.g. the sample mean x̄) across all possible samples of the same size drawn from the same population.
                </p>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', border: '1px solid #bfdbfe' }}>
                  <p style={{ color: '#1e40af', fontWeight: 700, fontSize: '0.88rem', margin: '0 0 6px 0' }}>Key Properties of Sampling Distributions:</p>
                  <ul style={{ paddingLeft: '18px', color: '#1e3a8a', fontSize: '0.85rem', lineHeight: 1.8, margin: 0 }}>
                    <li><strong>Mean of sampling distribution:</strong> equals the population mean μ (unbiased estimator)</li>
                    <li><strong>Standard Error (SE):</strong> SE = σ / √n — measures how much sample means vary</li>
                    <li><strong>Larger n → smaller SE → more precise estimates</strong> (Central Limit Theorem)</li>
                    <li><strong>Central Limit Theorem (CLT):</strong> Regardless of population shape, sample means approach a normal distribution as n → ∞ (typically n ≥ 30)</li>
                  </ul>
                </div>
              </div>

              {/* Two types overview */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1.2rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', borderTop: '4px solid #2563eb' }}>
                  <h4 style={{ color: '#1d4ed8', margin: '0 0 0.5rem 0' }}>🎲 Probability Sampling</h4>
                  <p style={{ color: '#1e3a8a', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>Every member of the population has a <strong>known, non-zero probability</strong> of being selected. Allows statistical inference and calculation of sampling error.</p>
                </div>
                <div style={{ padding: '1.2rem', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', borderTop: '4px solid #f97316' }}>
                  <h4 style={{ color: '#c2410c', margin: '0 0 0.5rem 0' }}>🎯 Non-Probability Sampling</h4>
                  <p style={{ color: '#9a3412', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>Selection is based on convenience or judgement. Probability of selection is <strong>unknown</strong>. Cannot quantify sampling error — not suitable for statistical inference.</p>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('probability')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is sampling distribution and how does the Central Limit Theorem relate to it?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PROBABILITY SAMPLING ─── */}
      {activeTab === 'probability' && (
        <Section eyebrow="Sampling Methods" title="Probability Sampling Techniques">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              In <strong>probability sampling</strong>, every element in the population has a known and non-zero chance of being selected. This property makes it possible to calculate sampling error and draw statistically valid conclusions. Click each method to expand its full details.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '3rem' }}>
              {probMethods.map(m => <MethodCard key={m.name} {...m} />)}
            </div>

            {/* Comparison table */}
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ background: '#0f172a', padding: '0.8rem 1.2rem' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>Probability Sampling — At a Glance</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Method', 'Selection Process', 'Sampling Frame Needed?', 'Best For'].map(h => (
                        <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', color: '#0f172a', fontWeight: 700, borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Simple Random', 'Random draw — each element equally likely', '✅ Yes', 'Small, homogeneous populations'],
                      ['Systematic', 'Every k-th element from ordered list', '✅ Yes', 'Large ordered populations (lists, records)'],
                      ['Stratified', 'Random sampling within predefined strata', '✅ Yes (per stratum)', 'Populations with distinct subgroups'],
                      ['Cluster', 'Entire randomly selected clusters surveyed', '✅ For clusters only', 'Geographically dispersed populations'],
                    ].map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                        {row.map((cell, j) => <td key={j} style={{ padding: '0.65rem 1rem', color: '#334155' }}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('nonprob')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("When would stratified sampling give better estimates than simple random sampling?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── NON-PROBABILITY SAMPLING ─── */}
      {activeTab === 'nonprob' && (
        <Section eyebrow="Sampling Methods" title="Non-Probability Sampling Techniques">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              In <strong>non-probability sampling</strong>, not every member has a known or equal chance of selection. These methods are faster and cheaper but introduce bias and cannot support statistical inference. They are best for exploratory research and qualitative studies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '3rem' }}>
              {nonProbMethods.map(m => <MethodCard key={m.name} {...m} />)}
            </div>

            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={20} /> When to Use Non-Probability Sampling
              </h3>
              <p style={{ color: '#742a2a', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                Use non-probability methods when: (1) a sampling frame is unavailable or cost-prohibitive, (2) the research is exploratory/qualitative, (3) time constraints are severe, (4) the population is hidden or hard-to-reach. <strong>Never use them to make precise statistical inferences about a population.</strong>
              </p>
            </div>

            {/* Python code */}
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python — All Four Probability Sampling Methods</h3>
            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Terminal size={14} /> sampling_methods.py</span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>Python</span>
              </div>
              <SyntaxHighlighter code={`import random

# Population: 100 employees (IDs 1 to 100)
population = list(range(1, 101))
N = len(population)
n = 10  # desired sample size

# ─── 1. Simple Random Sampling ───
srs_sample = random.sample(population, n)
print(f"SRS Sample:           {sorted(srs_sample)}")

# ─── 2. Systematic Sampling ───
k = N // n  # interval = 10
start = random.randint(0, k - 1)
systematic_sample = [population[start + i * k] for i in range(n) if start + i * k < N]
print(f"Systematic Sample:    {systematic_sample}")

# ─── 3. Stratified Sampling (3 strata: junior/mid/senior) ───
strata = {
    'junior': population[0:40],    # 40 junior employees
    'mid':    population[40:70],   # 30 mid-level employees
    'senior': population[70:100],  # 30 senior employees
}
# Proportional allocation: n_s = n * (N_s / N)
stratified_sample = []
for name, stratum in strata.items():
    n_s = round(n * len(stratum) / N)
    sampled = random.sample(stratum, n_s)
    stratified_sample.extend(sampled)
    print(f"  Stratum '{name}': n_s = {n_s}, sample = {sorted(sampled)}")
print(f"Stratified Sample:    {sorted(stratified_sample)}")

# ─── 4. Cluster Sampling ───
# Divide population into 5 clusters of 20, select 2 clusters
clusters = [population[i*20:(i+1)*20] for i in range(5)]
selected_clusters = random.sample(clusters, 2)
cluster_sample = [item for cluster in selected_clusters for item in cluster]
print(f"Cluster Sample:       {sorted(cluster_sample)} (n = {len(cluster_sample)})")`} />
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('playground')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain the difference between quota sampling and stratified sampling in market research.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── PLAYGROUND ─── */}
      {activeTab === 'playground' && (
        <Section eyebrow="Interactive Playground" title="Sampling Method Simulator">
          <div className="panel">
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Visualise how different sampling methods select from a population of 60 people (6 rows × 10 columns). Each dot is a person. Highlighted dots = selected sample. Adjust method and sample size, then hit <strong>Resample</strong> to see a new draw.
            </p>

            <SamplingSimulator />

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginTop: '2rem', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.8rem 0' }}>💡 What to Observe</h4>
              <ul style={{ paddingLeft: '18px', color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Simple Random:</strong> Dots are scattered throughout — truly random, no pattern.</li>
                <li><strong>Systematic:</strong> Notice the regular spacing — every k-th dot is selected.</li>
                <li><strong>Stratified:</strong> Each colour band (stratum) always contributes some selected dots — guaranteed representation.</li>
                <li><strong>Cluster:</strong> Whole columns of the same colour are picked — efficient but less spread.</li>
                <li><strong>Convenience:</strong> Only the first rows/items are selected — visible bias toward the top of the grid.</li>
              </ul>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877' }} onClick={() => handleContinue('assessment')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("If I wanted to ensure all age groups are represented in a customer survey, which sampling method should I use and why?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── ASSESSMENT ─── */}
      {activeTab === 'assessment' && (
        <Section eyebrow="Day 10 Assessment" title="Day 10 Assessment & Review">
          <div className="panel">

            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Critical Sampling Mistakes to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.9, margin: 0 }}>
                <li><strong>Sampling Bias:</strong> Using a non-representative sample (e.g. convenience sampling) and then drawing population-level conclusions. Classic example: 1936 Literary Digest poll used telephone directories — but only wealthy Americans had phones — wrongly predicting Roosevelt would lose.</li>
                <li><strong>Undercoverage:</strong> Some parts of the population have zero chance of selection. Online surveys exclude people without internet access.</li>
                <li><strong>Voluntary Response Bias:</strong> When only strongly opinionated individuals respond (e.g. online polls), the sample skews toward extreme views.</li>
                <li><strong>Confusing Cluster with Stratified:</strong> In stratified, you sample from EVERY stratum. In cluster, you sample ENTIRE clusters and skip others.</li>
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
                <li><strong>Task 1:</strong> A retail chain has 20,000 customers across 4 cities: Chennai (8,000), Bangalore (5,000), Hyderabad (4,000), Coimbatore (3,000). Design a stratified sample of 400 customers with proportional allocation. Show the calculation for each stratum's sample size.</li>
                <li><strong>Task 2:</strong> A health NGO wants to survey drug addiction rates in a city. Existing users are hard to find. Which sampling method should they use and why? What are the limitations?</li>
                <li><strong>Task 3:</strong> Implement a Python function <code>systematic_sample(population, n)</code> that returns a systematic sample of size n from a list. Include a random starting point.</li>
                <li><strong>Task 4:</strong> Explain with concrete examples how convenience sampling led to famous historical failures in survey research. What could have been done differently?</li>
                <li><strong>Task 5:</strong> A data analyst wants to understand the shopping behaviour of customers across all income brackets. Compare Simple Random Sampling vs Stratified Sampling for this scenario. Which would you recommend and why?</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2877', borderColor: '#db2877', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 10 — Sampling Methods! 🎉')}>
                Submit & Complete Day 10 🎉
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
