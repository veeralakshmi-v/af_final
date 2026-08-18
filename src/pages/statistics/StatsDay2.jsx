import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';

import ciImg from '../../assets/confidence_interval_explained.png';

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
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt|print|sum|len|math|random)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment)         color = '#8b949e';
          else if (str)        color = '#a5d6ff';
          else if (htmlTag)    color = '#7ee787';
          else if (kw)       { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal)    color = '#d2a8ff';
          else if (builtin)    color = '#ffb454';
          else if (num)        color = '#79c0ff';
          else if (ident)      color = '#e1e4e8';
          else if (sym)        color = '#ff7b72';
          tokens.push(<span key={k++} style={{ color, fontWeight }}>{tok}</span>);
        }
        return (
          <div key={lineIdx} style={{ whiteSpace: 'pre' }}>
            {tokens.length > 0 ? tokens : line}
          </div>
        );
      })}
    </div>
  );
};

const ZoomableImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <img
          src={src}
          alt={alt}
          onClick={() => setIsOpen(true)}
          style={{
            maxWidth: '280px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            border: '1px solid #cbd5e1',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.borderColor = '#db2777';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
        />
        <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
          🔍 Click image to zoom / view full size
        </span>
      </div>
      
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
            padding: '1.5rem',
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                border: '2px solid #334155',
              }}
            />
            <span style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.65)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'sans-serif'
            }}>
              Click anywhere to close
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default function StatsDay2({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Interactive CLT Simulator State
  const [sampleSize, setSampleSize] = useState(10);
  const [popType, setPopType] = useState('skewed'); // 'skewed' or 'uniform'
  const [simMeans, setSimMeans] = useState([]);
  const [runningSim, setRunningSim] = useState(false);

  const runCltSim = () => {
    setRunningSim(true);
    setTimeout(() => {
      const means = [];
      const iterations = 300;
      
      for (let s = 0; s < iterations; s++) {
        let sum = 0;
        for (let i = 0; i < sampleSize; i++) {
          if (popType === 'skewed') {
            // Highly right-skewed distribution
            sum += Math.pow(Math.random(), 4) * 100;
          } else {
            // Uniform distribution: dice rolling (1 to 6)
            sum += Math.floor(Math.random() * 6) + 1;
          }
        }
        means.push(sum / sampleSize);
      }
      setSimMeans(means);
      setRunningSim(false);
    }, 450);
  };

  // Helper to compute bins for histogram visualization
  const getHistogramData = () => {
    if (simMeans.length === 0) return [];
    const min = Math.min(...simMeans);
    const max = Math.max(...simMeans);
    const binCount = 8;
    const step = (max - min) / binCount || 1;
    const bins = Array(binCount).fill(0).map((_, idx) => ({
      label: `${(min + idx * step).toFixed(1)} - ${(min + (idx + 1) * step).toFixed(1)}`,
      count: 0
    }));

    simMeans.forEach(val => {
      let binIdx = Math.floor((val - min) / step);
      if (binIdx >= binCount) binIdx = binCount - 1;
      if (binIdx >= 0) {
        bins[binIdx].count += 1;
      }
    });

    const maxCount = Math.max(...bins.map(b => b.count)) || 1;
    return bins.map(b => ({
      ...b,
      pct: (b.count / maxCount) * 100
    }));
  };

  const histogramBins = getHistogramData();

  const handleContinue = (nextTabId) => {
    onNavigate('stats_day2', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      id: 1,
      q: "What does the Central Limit Theorem (CLT) tell us about sample means?",
      opts: [
        "The population itself will become normally distributed as sample size increases.",
        "The distribution of sample means will approach a normal distribution (bell curve) as sample size increases, regardless of the population shape.",
        "The standard error will increase when sample sizes grow.",
        "Sample statistics will always perfectly match population parameters when n > 10."
      ],
      ans: 1,
      exp: "The CLT states that if you take sufficiently large samples (usually n >= 30), the distribution of the sample means will be approximately normal, even if the underlying population distribution is skewed."
    },
    {
      id: 2,
      q: "How does Standard Error (SE) differ from Standard Deviation (SD)?",
      opts: [
        "SD measures the spread of sample means, while SE measures individual data points.",
        "SD measures the spread of individual observations in a dataset, while SE measures the variability/spread of the sample means from sample to sample.",
        "SD is only used in descriptive statistics, while SE is only used in SQL database scripts.",
        "There is no difference; they are different names for the same formula."
      ],
      ans: 1,
      exp: "Standard Deviation (SD) measures the dispersion of individual values in the population/sample. Standard Error (SE) measures the precision of the sample mean estimate (spread of means of multiple samples)."
    },
    {
      id: 3,
      q: "If you double the sample size (n), what happens to the Standard Error (SE)?",
      opts: [
        "It doubles in value.",
        "It remains completely unchanged.",
        "It decreases, because n is in the denominator of the standard error formula (SE = σ / √n).",
        "It fluctuates randomly."
      ],
      ans: 2,
      exp: "Since Standard Error is calculated as SE = σ / √n, as sample size n increases, the denominator grows, which mathematically decreases the standard error, making the estimate more precise."
    },
    {
      id: 4,
      q: "In hypothesis testing, what is the Null Hypothesis (H0)?",
      opts: [
        "The statement that there is a significant change, difference, or effect.",
        "A baseline assumption that there is no difference, change, or effect between variables.",
        "An error returned when the sample contains null or missing values.",
        "The final conclusion of a forecasting model."
      ],
      ans: 1,
      exp: "The Null Hypothesis (H0) is the default assumption that nothing changed, no effect occurred, or there is no difference (e.g., 'the new landing page does not change sales compared to the old page')."
    },
    {
      id: 5,
      q: "What does a 95% Confidence Interval mean in simple terms?",
      opts: [
        "There is a 95% chance that the calculated sample mean is correct.",
        "95% of individual data points in the sample lie within this interval.",
        "If we draw multiple samples and construct intervals the same way, 95% of those intervals will contain the true population parameter.",
        "The hypothesis is proven true with a 5% margin of error."
      ],
      ans: 2,
      exp: "A 95% Confidence Interval indicates that if we repeat the sampling process many times, 95% of the calculated intervals will capture the true population parameter (such as the population mean μ)."
    }
  ];

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCheckQuestion = (qId) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const checkFinalScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.ans) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* CLT & SAMPLING DISTRIBUTIONS */}
      {activeTab === 'theory' && (
        <Section key="theory" id="theory" eyebrow="Day 2 • Inferential Stats Bridge" title="Central Limit Theorem (CLT)">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. What is Inferential Statistics?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              In Day 1, we learned that a sample is just a small slice of a population. <strong>Inferential Statistics</strong> is the process of using that sample slice to make logical deductions, estimations, or predictions about the entire population.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. The Sampling Distribution</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Imagine you take a random sample of 30 customer transactions and calculate the mean spending. Now, suppose you repeat this process 1,000 times. You will get 1,000 slightly different sample means.
            </p>
            <p style={{ marginBottom: '2.5rem', color: '#475569', lineHeight: 1.6 }}>
              If you plot these 1,000 sample means on a chart, that chart is called the <strong>Sampling Distribution of the Mean</strong>. It shows how the sample statistic varies from sample to sample.
            </p>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2.5rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                <Sparkles size={20} /> The Central Limit Theorem (CLT)
              </h4>
              <p style={{ color: '#cbd5e1', marginBottom: '0.8rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                The CLT is the most powerful theorem in all of statistics. It states:
              </p>
              <p style={{ color: '#e2e8f0', fontStyle: 'italic', background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '8px', lineHeight: 1.6, fontSize: '0.95rem' }}>
                "As your sample size (n) increases, the sampling distribution of the sample mean will look more and more like a symmetric bell curve (Normal Distribution)—even if the original population distribution was completely skewed or non-normal!"
              </p>
              <strong style={{ color: '#facc15', display: 'block', marginTop: '1rem', marginBottom: '0.4rem', fontSize: '0.92rem' }}>Why this is a superpower:</strong>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.92rem', lineHeight: 1.5 }}>
                It means that as long as our sample size is large enough (typically **n ≥ 30**), we can use normal distribution formulas to make estimations, regardless of how messy or weird the original population data looks.
              </p>
            </div>

            {/* INTERACTIVE CLT SIMULATOR WIDGET */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#2563eb', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} /> 📊 Interactive CLT Simulator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Simulate pulling 300 samples dynamically. Watch how the histogram of sample averages changes shape as you increase the sample size ($n$).
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    1. Select Population Distribution shape:
                  </label>
                  <select
                    value={popType}
                    onChange={(e) => setPopType(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#0f172a' }}
                  >
                    <option value="skewed">Highly Right-Skewed (Bakery Incomes)</option>
                    <option value="uniform">Uniform (Rolling 6-sided Dice)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#334155', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    2. Adjust Sample Size (n = {sampleSize}):
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={sampleSize}
                    onChange={(e) => setSampleSize(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#2563eb' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    <span>Small (n=2)</span>
                    <span>Large (n=50)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ background: '#2563eb', borderColor: '#2563eb', minWidth: '180px' }}
                  onClick={runCltSim}
                  disabled={runningSim}
                >
                  {runningSim ? 'Simulating...' : '📊 Run 300 Samplings'}
                </button>
              </div>

              {histogramBins.length > 0 && (
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '1rem', fontWeight: 600, textAlign: 'center' }}>
                    Sampling Distribution (Distribution of 300 Sample Means)
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {histogramBins.map((bin, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '90px', fontSize: '0.8rem', color: '#475569', textAlign: 'right', fontFamily: 'monospace' }}>
                          {bin.label}
                        </span>
                        <div style={{ flex: 1, background: '#f1f5f9', height: '16px', borderRadius: '4px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${bin.pct}%`,
                              background: sampleSize >= 30 ? '#10b981' : '#f59e0b',
                              height: '100%',
                              borderRadius: '4px',
                              transition: 'width 0.3s ease'
                            }}
                          />
                        </div>
                        <span style={{ width: '35px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>
                          {bin.count}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span style={{ display: 'block', marginTop: '1rem', fontSize: '0.75rem', color: sampleSize >= 30 ? '#16a34a' : '#d97706', textAlign: 'center', fontWeight: 'bold' }}>
                    {sampleSize >= 30 
                      ? '🎯 n >= 30: The distribution looks symmetric and bell-shaped (CLT holds!)' 
                      : '⚠️ n < 30: The distribution still inherits skewness from the population.'}
                  </span>
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('inference')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain the Central Limit Theorem using a simple visual analogy of rolling dice.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* SE, CI & HYPOTHESIS TESTING */}
      {activeTab === 'inference' && (
        <Section key="inference" id="inference" eyebrow="Core Inference Metrics" title="Standard Error, Confidence Intervals & Hypothesis Testing">
          <div className="panel">
            
            <ZoomableImage src={ciImg} alt="Confidence Interval Explained" />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.15rem' }}>1. Standard Error (SE)</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Standard Error measures the **variability or dispersion of the sample means** from sample to sample. It tells us how far our sample mean is likely to be from the true population mean.
                  <br /><strong>Formula:</strong> SE = σ / √n (where σ is the population standard deviation, and n is the sample size).
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.15rem' }}>2. Confidence Intervals (CI)</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Instead of giving a single point estimate (e.g. *"Our average delivery time is 30 minutes"*), we construct a **range of values** that is likely to contain the population parameter.
                  <br /><strong>Example:</strong> "We are 95% confident that the true population average delivery time is between 28 and 32 minutes."
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontSize: '1.15rem' }}>3. Hypothesis Testing Concept</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  A formal statistical decision process to check if sample evidence supports a claim.
                  <br />• <strong>Null Hypothesis (H0):</strong> Default assumption (no effect, no difference). E.g. *"The new button design has no impact on checkout rates."*
                  <br />• <strong>Alternative Hypothesis (Ha):</strong> The claim we want to support. E.g. *"The new button design increases checkout rates."*
                  <br />• <strong>p-value:</strong> The probability that our sample results happened by pure chance under the assumption that H0 is true. If p-value &lt; 0.05, we reject the null hypothesis!
                </p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('math')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain standard error vs. standard deviation using examples.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* MATHEMATICAL STEP-BY-STEP TAB */}
      {activeTab === 'math' && (
        <Section key="math" id="math" eyebrow="Mathematics Application" title="Standard Error & Confidence Interval Math">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Let's walk through standard error and confidence interval calculations step-by-step.
            </p>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>📋 Scenario: Package Weights</h4>
              <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>
                A delivery hub knows that the standard deviation (σ) of all package weights is <strong>12 kilograms</strong>.
                We pull a sample of <strong>n = 36 packages</strong>. The sample average weight is calculated to be <strong>X̄ = 45 kilograms</strong>.
              </p>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Step 1: Calculate the Standard Error (SE)</h3>
            <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              The Standard Error of the mean describes how much our sample average is expected to fluctuate:
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace' }}>
              <p style={{ margin: 0, color: '#facc15' }}># Formula:</p>
              <p style={{ margin: '0.5rem 0', color: '#e2e8f0' }}>SE = σ / √n</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># Calculation:</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 1: σ = 12, n = 36</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 2: √n = √36 = 6</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 3: SE = 12 / 6 = 2.0 kg</p>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Step 2: Construct a Basic 95% Confidence Interval</h3>
            <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              According to statistical theory, about 95% of sample means lie within **2 standard errors** of the population mean (the empirical rule).
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace' }}>
              <p style={{ margin: 0, color: '#facc15' }}># Formula for Approximate 95% CI:</p>
              <p style={{ margin: '0.5rem 0', color: '#e2e8f0' }}>CI = X̄ ± (2 * SE)</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># Calculation:</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 1: X̄ = 45, SE = 2.0</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 2: Margin of Error = 2 * 2.0 = 4.0 kg</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 3: Lower Limit = 45 - 4 = 41 kg</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 4: Upper Limit = 45 + 4 = 49 kg</p>
              <p style={{ margin: '1rem 0 0 0', color: '#10b981' }}># Result: [41 kg, 49 kg]</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('python')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the z-score used for a 95% confidence interval instead of the rounded value 2?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PYTHON LOGIC TAB */}
      {activeTab === 'python' && (
        <Section key="python" id="python" eyebrow="Hands-On Programming" title="Python Standard Error Calculation">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Let's write a Python script to compute the sample Standard Deviation and Standard Error of the mean using raw Python code.
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} /> error_calculation.py
                </span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>
                  Python Code
                </span>
              </div>
              <SyntaxHighlighter code={`import math

# 1. Define sample data
sample_data = [12, 18, 15, 22, 13]
n = len(sample_data)

# 2. Calculate the sample mean (X̄)
mean = sum(sample_data) / n

# 3. Calculate Variance: sum of squared differences divided by (n - 1)
variance_sum = sum((x - mean) ** 2 for x in sample_data)
sample_variance = variance_sum / (n - 1)

# 4. Calculate Standard Deviation (SD): square root of variance
sample_sd = math.sqrt(sample_variance)

# 5. Calculate Standard Error (SE) of the Mean: SD / √n
standard_error = sample_sd / math.sqrt(n)

# 6. Print the details
print(f"Sample data: {sample_data}")
print(f"Sample Mean (X̄): {mean:.2f}")
print(f"Sample SD (s): {sample_sd:.2f}")
print(f"Standard Error (SE): {standard_error:.2f}`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} /> Console Output
              </h4>
              <pre style={{ margin: 0, color: '#1e40af', fontFamily: 'monospace', fontSize: '0.88rem' }}>
{`Sample data: [12, 18, 15, 22, 13]
Sample Mean (X̄): 16.00
Sample SD (s): 4.06
Standard Error (SE): 1.82`}
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Why does standard error divide by n-1 instead of n for sample standard deviation calculations?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 2 Assessment" title="Day 2 Assessment & Review">
          <div className="panel">
            
            {/* Common Mistakes */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Inference Errors to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Confusing Standard Deviation & Standard Error:</strong> Remember: SD is the spread of individual observations. SE is the spread of sample means from multiple samplings.</li>
                <li><strong>Misinterpreting p-values:</strong> Thinking a high p-value proves the Null Hypothesis is true. A high p-value only means we do not have enough evidence to reject H0.</li>
                <li><strong>Confidence Interval Misconception:</strong> Believing that a 95% confidence interval means there is a 95% probability that the population mean lies within the specific interval you calculated. In frequentist statistics, it means 95% of intervals built from sample distributions will contain μ.</li>
              </ul>
            </div>

            {/* Interview Prep Questions */}
            <h3 style={{ color: '#1e293b', marginBottom: '1.2rem' }}>💬 Interview Questions</h3>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q1. What is the Central Limit Theorem (CLT) and why is it important in data analytics?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  The CLT states that as the sample size increases, the sampling distribution of the sample mean approaches a normal distribution, regardless of the population distribution's shape. This allows us to use parametric hypothesis tests and construct confidence intervals even on skewed data.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q2. What is a p-value and what threshold do we usually use to define significance?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  A p-value is the probability of obtaining sample results at least as extreme as the ones observed, assuming the Null Hypothesis (no effect) is true. We typically use a significance level (alpha) of 0.05. If the p-value is less than 0.05, we reject the Null Hypothesis.
                </p>
              </div>
            </div>

            {/* Interactive Quiz */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <CheckCircle size={22} color="#db2777" /> Interactive Lesson Quiz
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '-1rem', marginBottom: '2rem' }}>
                Select the correct options and check your understanding.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <p style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '1rem', marginBottom: '1rem' }}>
                      {idx + 1}. {q.q}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.opts.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        return (
                          <label
                            key={optIdx}
                            style={{
                              padding: '0.8rem 1rem',
                              borderRadius: '8px',
                              border: isSelected ? '2px solid #db2777' : '1px solid #cbd5e1',
                              background: isSelected ? '#fdf2f8' : '#f8fafc',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '0.9rem',
                              color: '#334155'
                            }}
                          >
                            <input
                              type="radio"
                              name={`quiz-${q.id}`}
                              checked={isSelected}
                              onChange={() => handleSelectOption(q.id, optIdx)}
                              style={{ accentColor: '#db2777' }}
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                    {selectedAnswers[q.id] !== undefined && !checkedQuestions[q.id] && (
                      <button
                        className="btn btn-outline"
                        style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.82rem' }}
                        onClick={() => handleCheckQuestion(q.id)}
                      >
                        Check Answer
                      </button>
                    )}
                    {checkedQuestions[q.id] && (
                      <div style={{ marginTop: '1.2rem', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid', borderColor: selectedAnswers[q.id] === q.ans ? '#16a34a' : '#dc2626', background: selectedAnswers[q.id] === q.ans ? '#f0fdf4' : '#fef2f2' }}>
                        <strong style={{ color: selectedAnswers[q.id] === q.ans ? '#15803d' : '#b91c1c', display: 'block', marginBottom: '0.3rem' }}>
                          {selectedAnswers[q.id] === q.ans ? 'Correct!' : 'Incorrect'}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                          {q.exp}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  className="btn btn-primary"
                  style={{ background: '#db2777', borderColor: '#db2777' }}
                  onClick={checkFinalScore}
                >
                  Verify Final Score
                </button>
                {score !== null && (
                  <strong style={{ color: '#db2777', fontSize: '1.2rem' }}>
                    Your Score: {score} / {quizQuestions.length}
                  </strong>
                )}
              </div>
            </div>

            {/* Practical Assignment */}
            <div style={{ background: '#fdf2f8', padding: '2rem', borderRadius: '16px', border: '1px solid #fbcfe8', marginTop: '2rem' }}>
              <h3 style={{ color: '#db2777', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem' }}>
                <HelpCircle size={22} /> Practical Homework Assignment
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '-1rem', marginBottom: '1.5rem' }}>
                Complete the following tasks to test your analytical capabilities:
              </p>
              
              <ul style={{ color: '#831843', lineHeight: 1.8, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 1:</strong> In your own words, explain the Central Limit Theorem. Why does it matter that sample means end up normally distributed when we analyze large customer transaction logs?
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 2:</strong> Calculate the Standard Error (SE) of the mean for a population standard deviation (σ) of <strong>10</strong> and sample size of <strong>n = 25</strong>. Show your step-by-step division.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 3:</strong> Calculate standard error if the sample size is increased to <strong>n = 100</strong> (keeping σ = 10). Did standard error increase or decrease? How does this impact our estimation precision?
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 4:</strong> Write a raw Python script that calculates sample Standard Deviation and Standard Error of the mean for the list: `[10, 15, 20, 25, 30]`. Do not use external libraries.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 5:</strong> Establish the Null Hypothesis (H0) and Alternative Hypothesis (Ha) for this scenario: *"A product owner wants to test if adding an AI recommendation chatbot increases user engagement times compared to the original chatbot."*
                </li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 2 of Statistics! 🎉')}>
                Submit & Complete Day 2 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
