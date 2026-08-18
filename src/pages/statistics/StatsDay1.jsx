import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';

import popSampleImg from '../../assets/population_vs_sample.png';

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

export default function StatsDay1({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Interactive Sampling Simulator State
  const [popData] = useState([120, 340, 210, 890, 450, 670, 310, 520, 280, 940]);
  const [samplingMethod, setSamplingMethod] = useState('random');
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [sampleValues, setSampleValues] = useState([]);
  const [sampleMean, setSampleMean] = useState(null);
  const popMean = popData.reduce((a, b) => a + b, 0) / popData.length;

  const runSamplingSim = () => {
    if (samplingMethod === 'random') {
      const indices = [];
      while (indices.length < 4) {
        const r = Math.floor(Math.random() * popData.length);
        if (!indices.includes(r)) indices.push(r);
      }
      setSelectedIndices(indices);
      const values = indices.map(idx => popData[idx]);
      setSampleValues(values);
      setSampleMean(values.reduce((a, b) => a + b, 0) / values.length);
    } else {
      const start = Math.floor(Math.random() * 2);
      const indices = [];
      for (let i = start; i < popData.length; i += 2) {
        if (indices.length < 4) {
          indices.push(i);
        }
      }
      setSelectedIndices(indices);
      const values = indices.map(idx => popData[idx]);
      setSampleValues(values);
      setSampleMean(values.reduce((a, b) => a + b, 0) / values.length);
    }
  };

  const handleContinue = (nextTabId) => {
    onNavigate('stats_day1', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      id: 1,
      q: "Why is statistics considered critical for Data Analytics?",
      opts: [
        "It provides standard tools to summarize data, calculate probabilities, handle sample variability, and test if business claims are valid.",
        "It is only useful for writing CSS styles.",
        "It replaces the need to write Python code entirely.",
        "It guarantees that sample statistics will always equal population parameters."
      ],
      ans: 0,
      exp: "Statistics gives data analysts the theoretical framework to handle sample variation, summarize datasets logically, and make reliable decisions under uncertainty."
    },
    {
      id: 2,
      q: "What is the difference between a Parameter and a Statistic?",
      opts: [
        "A parameter describes a sample, while a statistic describes a population.",
        "A parameter is a fixed numerical value describing the population, while a statistic is calculated from a sample and varies from sample to sample.",
        "A parameter is always qualitative, while a statistic is quantitative.",
        "They are identical terms and can be used interchangeably."
      ],
      ans: 1,
      exp: "A parameter describes the entire population (usually unknown and represented by Greek letters like μ), whereas a statistic is computed from a sample and changes depending on which sample is drawn."
    },
    {
      id: 3,
      q: "If an analyst divides a customer database by region and then randomly selects 50 customers from each region, what sampling method is being used?",
      opts: [
        "Simple Random Sampling",
        "Stratified Sampling",
        "Systematic Sampling",
        "Convenience Sampling"
      ],
      ans: 1,
      exp: "This is Stratified Sampling. The population is divided into subgroups (strata: regions), and random samples are drawn independently from each subgroup."
    },
    {
      id: 4,
      q: "What is Selection Bias (or Sampling Bias)?",
      opts: [
        "Making a calculation mistake in the mean calculation.",
        "Selecting a sample that is not representative of the population, leaving out certain groups.",
        "A statistical error caused by using Python instead of SQL.",
        "When the population parameters are known but sample statistics are missing."
      ],
      ans: 1,
      exp: "Selection bias occurs when the method used to select the sample favors some members of the population over others, resulting in a non-representative sample."
    },
    {
      id: 5,
      q: "Suppose you want to estimate the average spending of all Indian app users, but you only survey active paid premium users. What type of bias does this introduce?",
      opts: [
        "No bias; this is a perfect representative sample.",
        "Selection Bias (your sample excludes free tier users who have different spending habits).",
        "Measurement Bias.",
        "Response Bias."
      ],
      ans: 1,
      exp: "This introduces Selection Bias because your sample is drawn from a subset of the population (premium users) that is structurally different from the general population (which includes free tier users)."
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
      
      {/* POPULATION VS SAMPLE TAB */}
      {activeTab === 'theory' && (
        <Section key="theory" id="theory" eyebrow="Day 1 • Intro & Foundations" title="Introduction to Statistics">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. What is Statistics?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              At its core, <strong>Statistics</strong> is the science of collecting, organizing, analyzing, interpreting, and presenting data. Rather than just viewing raw rows of figures, statistics provides us with mathematical frameworks to extract insights, test hypotheses, and make logical predictions in the face of uncertainty.
            </p>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Why is Statistics Important for Data Analytics?</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              In Data Analytics, statistics is the bridge between raw, noisy logs and actionable business intelligence. Without statistics, analytics would be limited to reporting past events. With statistics, you can:
            </p>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              <li><strong>Handle Variability:</strong> Understand that metrics (like daily sales) naturally fluctuate, and determine if a shift is a real trend or just random noise.</li>
              <li><strong>Validate Decisions:</strong> Run experiments (like A/B testing new landing page designs) to prove mathematically if changes increase conversion rates.</li>
              <li><strong>Make Predictions:</strong> Estimate future sales, calculate risk factors, or predict customer churn based on representative sample trends.</li>
            </ul>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0' }}>💡 Business Application Example</h4>
              <p style={{ color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Suppose a streaming platform wants to launch a new recommendation layout. They cannot risk releasing it to all 10 million users at once. Instead, they release it to a sample of 10,000 users. By calculating sample statistics and comparing them to baseline parameters, they determine if the new layout actually increases average watch times.
              </p>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>3. Population vs. Sample</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Two of the most foundational terms in statistics relate to the scope of the group you are studying:
            </p>

            <ZoomableImage src={popSampleImg} alt="Population vs. Sample Explained" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>🌎 Population</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  The **entire collection** of all elements, items, or individuals that you want to study.
                  <br /><strong>Examples:</strong> All registered users on your platform, all transactions processed this year, or every smartphone manufactured in a factory.
                </p>
              </div>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontSize: '1.25rem' }}>🔍 Sample</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  A **subset** or representative slice selected from the population. We study the sample to understand the population.
                  <br /><strong>Examples:</strong> A random selection of 500 registered users, 1,000 transactions checked for fraud, or 50 smartphones tested for defects.
                </p>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>4. Parameter vs. Statistic</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              Depending on whether you measure the entire population or just your sample, the resulting numerical description has a different name:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', borderLeft: '4px solid #db2777' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>📈 Parameter (Population-level)</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                  A numerical characteristic of the **population**. It is a fixed value but usually **unknown** (because we cannot measure the entire population).
                  <br /><strong>Symbols:</strong> Mean = μ (mu), Standard Deviation = σ (sigma).
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.3rem' }}>📊 Statistic (Sample-level)</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>
                  A numerical characteristic calculated from the **sample**. It **varies** depending on which sample you select.
                  <br /><strong>Symbols:</strong> Mean = X̄ (X-bar), Standard Deviation = s.
                </p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('methods')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain why statistics are variables while parameters are fixed values using a simple example.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* SAMPLING METHODS & BIAS TAB */}
      {activeTab === 'methods' && (
        <Section key="methods" id="methods" eyebrow="Data Collection" title="Sampling Methods & Bias">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. How We Sample: Sampling Methods</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              To ensure our sample statistics accurately represent the population parameters, we must use rigorous selection methods:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              
              {/* Probability Sampling */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#db2777', fontSize: '1.2rem', borderBottom: '1px solid #fbcfe8', paddingBottom: '0.5rem' }}>
                  🎲 1. Probability Sampling (Random)
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Every member has a known, non-zero chance of selection. Best for reducing bias and enabling inferential statistics.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Simple Random Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Every member has an equal chance. (E.g. choosing 100 transaction IDs using a random generator).</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Systematic Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Selecting every k-th member from a list. (E.g. surveying every 15th registered customer).</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Stratified Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Divide population into strata (e.g. age groups) and sample randomly from each group. Ensures balanced representation.</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Cluster Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Divide population into clusters (e.g. city branch offices), randomly select whole clusters, and sample all members inside those chosen clusters.</p>
                  </div>
                </div>
              </div>

              {/* Non-Probability Sampling */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#2563eb', fontSize: '1.2rem', borderBottom: '1px solid #bfdbfe', paddingBottom: '0.5rem' }}>
                  👥 2. Non-Probability Sampling (Non-Random)
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Selection is based on ease, convenience, or research judgment. Faster but introduces significant bias risks.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Convenience Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Selecting members who are easiest to reach. (E.g. surveying visitors walking by the bakery entrance).</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Quota Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Selecting a pre-set number of subjects from categories (e.g. 50 men and 50 women) but using non-random selection.</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Judgemental (Purposive) Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Selecting specific members based on the researcher's expert opinion. (E.g. only surveying power users for software tests).</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>• Snowball Sampling:</strong>
                    <p style={{ color: '#475569', fontSize: '0.85rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>Participants recruit others from their network. Used for hard-to-reach populations (e.g. specialized domain executives).</p>
                  </div>
                </div>
              </div>

            </div>

            {/* INTERACTIVE SAMPLING SIMULATOR WIDGET */}
            <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#db2777', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} /> 🎮 Interactive Sampling Simulator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Simulate how sample averages vary based on the sampling method used. We have a population database of 10 transaction values:
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {popData.map((val, idx) => {
                  const isSelected = selectedIndices.includes(idx);
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: '8px',
                        border: isSelected ? '3px solid #db2777' : '1px solid #cbd5e1',
                        background: isSelected ? '#fbcfe8' : '#fff',
                        fontWeight: 'bold',
                        color: isSelected ? '#9d174d' : '#0f172a',
                        boxShadow: isSelected ? '0 0 10px rgba(219, 39, 119, 0.4)' : 'none',
                        transition: 'all 0.2s ease',
                        textAlign: 'center',
                        minWidth: '60px'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', display: 'block', color: '#64748b', fontWeight: 'normal' }}>#{idx}</span>
                      ₹{val}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#334155', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name="method"
                    value="random"
                    checked={samplingMethod === 'random'}
                    onChange={() => setSamplingMethod('random')}
                    style={{ accentColor: '#db2777' }}
                  />
                  Simple Random
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#334155', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name="method"
                    value="systematic"
                    checked={samplingMethod === 'systematic'}
                    onChange={() => setSamplingMethod('systematic')}
                    style={{ accentColor: '#db2777' }}
                  />
                  Systematic (Every 2nd)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ background: '#db2777', borderColor: '#db2777', minWidth: '180px' }}
                  onClick={runSamplingSim}
                >
                  🎲 Draw Sample (n=4)
                </button>
              </div>

              {sampleMean !== null && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Population Parameter (Mean μ):</span>
                    <h4 style={{ color: '#0f172a', fontSize: '1.3rem', margin: '0.2rem 0 0 0' }}>₹{popMean.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Sample Statistic (Mean X̄):</span>
                    <h4 style={{ color: '#db2777', fontSize: '1.3rem', margin: '0.2rem 0 0 0' }}>₹{sampleMean.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Sampling Error (|μ - X̄|):</span>
                    <h4 style={{ color: '#ef4444', fontSize: '1.3rem', margin: '0.2rem 0 0 0' }}>₹{Math.abs(popMean - sampleMean).toFixed(2)}</h4>
                  </div>
                </div>
              )}
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. The Enemy of Sampling: Bias</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              **Bias** occurs when your sample does not accurately represent the population. If your sample is biased, your analysis will lead to incorrect business decisions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #fed7d7', borderRadius: '12px', padding: '1.5rem', background: '#fff5f5' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#c53030', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} /> Selection Bias
                </h4>
                <p style={{ color: '#742a2a', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  Occurs when some members of the population are systematically excluded from selection. E.g. surveying website feedback only from users logged in at midnight.
                </p>
              </div>
              <div style={{ border: '1px solid #fed7d7', borderRadius: '12px', padding: '1.5rem', background: '#fff5f5' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#c53030', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} /> Response Bias
                </h4>
                <p style={{ color: '#742a2a', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  Occurs when participants give inaccurate or untruthful answers, either due to poor question design or social pressure.
                </p>
              </div>
            </div>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2.5rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                <Sparkles size={20} /> Statistics vs. Machine Learning
              </h4>
              <p style={{ color: '#cbd5e1', marginBottom: '1.2rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                While both fields focus on learning from data, their core objective, scale, and background are slightly different:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '8px' }}>
                  <strong style={{ color: '#facc15' }}>Statistics (Inference Focused)</strong>
                  <ul style={{ paddingLeft: '18px', color: '#e2e8f0', fontSize: '0.88rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    <li>Focuses on understanding relationships between variables.</li>
                    <li>Relies on strict mathematical proofs and assumptions.</li>
                    <li>Designed to work well even on smaller datasets.</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '8px' }}>
                  <strong style={{ color: '#facc15' }}>Machine Learning (Prediction Focused)</strong>
                  <ul style={{ paddingLeft: '18px', color: '#e2e8f0', fontSize: '0.88rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    <li>Focuses on making highly accurate future predictions.</li>
                    <li>Relies on algorithms that learn patterns empirically.</li>
                    <li>Requires large datasets to generalize effectively.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('math')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Give me a real-world example of how systematic sampling works in production database logs.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* MATHEMATICAL STEP-BY-STEP TAB */}
      {activeTab === 'math' && (
        <Section key="math" id="math" eyebrow="Mathematics Application" title="Parameter vs. Statistic Math">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Let's demonstrate how sample statistics vary from the population parameter using a simple mathematics example.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>📋 Scenario: The Downtime of 4 Database Servers</h4>
              <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>
                A company has exactly <strong>4 database servers</strong> (this is our entire **Population**, N = 4).
                Their server downtime hours in a month are:
              </p>
              <div style={{ display: 'flex', gap: '10px', margin: '1rem 0', justifyContent: 'center' }}>
                {[2, 6, 8, 12].map((val, idx) => (
                  <span key={idx} style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', color: '#0f172a' }}>
                    Server {idx + 1}: {val} hrs
                  </span>
                ))}
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Step 1: Calculate the Population Parameter (μ)</h3>
            <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              The population mean downtime (μ) is the parameter:
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.2rem', borderRadius: '8px', marginBottom: '2.5rem', fontFamily: 'monospace' }}>
              μ = (2 + 6 + 8 + 12) / 4 = 28 / 4 = 7.0 hours
            </div>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Step 2: Draw Samples and Calculate Sample Statistics (X̄)</h3>
            <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              Now suppose we can only afford to monitor a **sample of 2 servers** (n = 2). Depending on which servers we pick, see how our statistic varies:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '8px', background: '#fff' }}>
                <strong style={{ color: '#db2777' }}>Sample A: Server 2 & Server 3</strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0.5rem 0' }}>Values: [6, 8]</p>
                <code style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: '4px', display: 'block', fontSize: '0.85rem' }}>
                  Sample Mean (X̄) = (6 + 8) / 2 = 7.0 hrs
                </code>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.82rem', color: '#16a34a' }}>🎯 Perfectly matches the parameter!</p>
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '8px', background: '#fff' }}>
                <strong style={{ color: '#2563eb' }}>Sample B: Server 1 & Server 2</strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0.5rem 0' }}>Values: [2, 6]</p>
                <code style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: '4px', display: 'block', fontSize: '0.85rem' }}>
                  Sample Mean (X̄) = (2 + 6) / 2 = 4.0 hrs
                </code>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.82rem', color: '#dc2626' }}>⚠️ Off by 3 hours (Sampling Error)</p>
              </div>
            </div>

            <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>
              <strong>Insight:</strong> The Population Parameter is **fixed** (always 7.0 hours), but the Sample Statistic is **variable** (ranges from 4.0 to 10.0 hours depending on who gets selected).
            </p>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('python')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Show me how to calculate variance on this dataset of 4 servers.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PYTHON LOGIC TAB */}
      {activeTab === 'python' && (
        <Section key="python" id="python" eyebrow="Hands-On Programming" title="Python Random Sampling Demonstration">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Let's write a simple Python script to simulate random sampling. We will draw a sample of $n = 3$ items from a population of server logs and calculate the sample mean.
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} /> simple_sampling.py
                </span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>
                  Python Code
                </span>
              </div>
              <SyntaxHighlighter code={`import random

# 1. Define our population database (response times of 8 servers)
population = [12, 18, 15, 22, 13, 29, 31, 20]

# 2. Calculate the true Population Parameter (Mean)
pop_mean = sum(population) / len(population)

# 3. Draw a random sample of size n=3
sample = random.sample(population, 3)

# 4. Calculate the Sample Statistic (Mean)
sample_mean = sum(sample) / len(sample)

# 5. Output both results to compare
print(f"Population database: {population}")
print(f"True Population Parameter (Mean μ): {pop_mean:.2f} minutes")
print(f"--- Drawn Sample: {sample} ---")
print(f"Sample Statistic (Mean X̄): {sample_mean:.2f} minutes`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} /> Expected Console Output (Outputs vary slightly per run)
              </h4>
              <pre style={{ margin: 0, color: '#1e40af', fontFamily: 'monospace', fontSize: '0.88rem' }}>
{`Population database: [12, 18, 15, 22, 13, 29, 31, 20]
True Population Parameter (Mean μ): 20.00 minutes
--- Drawn Sample: [18, 22, 20] ---
Sample Statistic (Mean X̄): 20.00 minutes`}
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is random.sample() doing under the hood in Python?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 1 Assessment" title="Day 1 Assessment & Review">
          <div className="panel">
            
            {/* Common Mistakes */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Statistical Mistakes to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Assuming Samples are Parameters:</strong> Believing that a calculated sample average is the absolute truth for the entire population. Remember: sample statistics vary, population parameters are fixed.</li>
                <li><strong>Ignoring Selection Bias:</strong> Constructing surveys in places where certain subgroups are excluded (e.g. asking only active office employees if they prefer working from home).</li>
                <li><strong>Sample Size Misconception:</strong> Thinking a very large sample automatically eliminates selection bias. If your method is biased, having a larger sample size only gathers biased data faster.</li>
              </ul>
            </div>

            {/* Interview Prep Questions */}
            <h3 style={{ color: '#1e293b', marginBottom: '1.2rem' }}>💬 Interview Questions</h3>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q1. What is the difference between a population parameter and a sample statistic?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  A population parameter is a fixed, usually unknown characteristic describing the entire group (e.g., population mean μ). A sample statistic is a variable value calculated from a subset of data (e.g., sample mean X̄) used to estimate the parameter.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q2. Can you explain stratified sampling and why we use it?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Stratified sampling involves dividing a population into subgroups called strata (e.g., gender, income levels) and then drawing random samples from each stratum. We use it to ensure that small subgroups are proportionately represented in our sample.
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
                  <strong>Task 1:</strong> Identify the target Population and Sample in this scenario: *"A marketing team checks the clicks of 200 random newsletter emails to estimate the click-through-rate (CTR) of their 15,000 subscribers."*
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 2:</strong> Calculate the Population Mean downtime (parameter μ) for this population of N = 5 web nodes: `[3, 5, 2, 8, 2]` hours.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 3:</strong> Draw a sample of size n = 2 consisting of the first and last numbers in Task 2. Calculate the Sample Mean downtime (statistic X̄). What is the sampling error?
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 4:</strong> Write a raw Python script that imports `random`, defines a list `scores = [85, 90, 78, 92, 88]`, draws a sample of 2 items, and computes the sample mean.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 5:</strong> Give a real-world example of **Selection Bias** that could happen in a restaurant customer feedback collection process. How would you correct it?
                </li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 1 of Statistics! 🎉')}>
                Submit & Complete Day 1 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
