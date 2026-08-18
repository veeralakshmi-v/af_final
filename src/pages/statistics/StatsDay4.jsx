import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';
import dispersionImg from '../../assets/measures_of_dispersion.png';
import shapesImg from '../../assets/skewness_and_kurtosis.png';

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

export default function StatsDay4({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Interactive Calculator State
  const [rawInput, setRawInput] = useState("10, 15, 20, 25, 30, 45");
  const [calcResults, setCalcResults] = useState(null);

  const calculateDispersion = () => {
    try {
      const nums = rawInput
        .split(',')
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x));

      if (nums.length < 2) {
        alert("Please enter at least 2 numbers to calculate dispersion.");
        return;
      }

      // Sort
      const sorted = [...nums].sort((a, b) => a - b);
      const n = sorted.length;

      // Range
      const min = sorted[0];
      const max = sorted[n - 1];
      const range = max - min;

      // Mean
      const sum = sorted.reduce((a, b) => a + b, 0);
      const mean = sum / n;

      // Variance & SD (Sample)
      const varianceSum = sorted.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
      const sampleVariance = varianceSum / (n - 1);
      const sampleSD = Math.sqrt(sampleVariance);

      // Quartiles Q1, Q3 (Helper using linear percentile interpolation)
      const getPercentile = (p) => {
        const idx = (n - 1) * p;
        const low = Math.floor(idx);
        const high = Math.ceil(idx);
        return sorted[low] + (sorted[high] - sorted[low]) * (idx - low);
      };

      const q1 = getPercentile(0.25);
      const q3 = getPercentile(0.75);
      const iqr = q3 - q1;

      // Coefficient of Variation (%)
      const cv = (sampleSD / mean) * 100;

      // Skewness approximation (Pearson's median skewness index)
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 !== 0 
        ? sorted[mid] 
        : (sorted[mid - 1] + sorted[mid]) / 2;
      const skewness = (3 * (mean - median)) / sampleSD;

      setCalcResults({
        count: n,
        sorted: sorted.join(', '),
        range,
        variance: sampleVariance,
        sd: sampleSD,
        q1,
        q3,
        iqr,
        cv,
        skewness
      });
    } catch (e) {
      alert("Error parsing input dataset. Please enter comma-separated numbers.");
    }
  };

  const handleContinue = (nextTabId) => {
    onNavigate('stats_day4', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      id: 1,
      q: "Which metric measures the relative variability in a dataset compared to its mean, expressed as a percentage?",
      opts: [
        "Standard Deviation",
        "Interquartile Range (IQR)",
        "Coefficient of Variation (CV)",
        "Variance"
      ],
      ans: 2,
      exp: "The Coefficient of Variation (CV) is calculated as (Standard Deviation / Mean) * 100. It is a dimensionless relative measure used to compare dispersion across datasets with different units or scales."
    },
    {
      id: 2,
      q: "What does the Interquartile Range (IQR) represent?",
      opts: [
        "The difference between the maximum and minimum values in a dataset.",
        "The range of the middle 50% of sorted observations (Q3 - Q1).",
        "The standard error of the median estimate.",
        "The average deviation of values from the 50th percentile."
      ],
      ans: 1,
      exp: "The IQR is Q3 - Q1, which represents the spread of the middle 50% of the dataset, effectively screening out outlier values at the extremes."
    },
    {
      id: 3,
      q: "What is Kurtosis?",
      opts: [
        "A measure of asymmetry in a distribution.",
        "A measure of the 'peakedness' and thickness of the tails of a distribution compared to a normal distribution.",
        "The position of the 90th percentile.",
        "The difference between the sample mean and population mean."
      ],
      ans: 1,
      exp: "Kurtosis describes the shape of a distribution's tails. Highly peaked distributions with heavy tails are Leptokurtic, normal-tailed Mesokurtic, and flat-peaked thin-tailed Platykurtic."
    },
    {
      id: 4,
      q: "If a dataset has a Skewness coefficient of +1.8, what does this tell us?",
      opts: [
        "The distribution is perfectly symmetric.",
        "The distribution is negatively skewed (left-skewed tail).",
        "The distribution is positively skewed (right-skewed tail, with outliers extending to the right).",
        "The variance is greater than the mean."
      ],
      ans: 2,
      exp: "Positive skewness (greater than 0) indicates a distribution with a tail extending to the right, meaning a small number of unusually large values exist."
    },
    {
      id: 5,
      q: "Why do we divide by (n - 1) instead of n when calculating sample variance?",
      opts: [
        "It is standard coding syntax in Python loops.",
        "Bessel's correction: dividing by (n - 1) corrects for the systematic underestimation of variance in samples compared to populations.",
        "It yields a smaller number which is easier to graph.",
        "It is only used when the sample mean is a fraction."
      ],
      ans: 1,
      exp: "Using n-1 (Bessel's correction) ensures that the sample variance is an unbiased estimator of the true population variance, compensating for the fact that sample values tend to cluster closer to the sample mean than the population mean."
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
      
      {/* THEORY TAB */}
      {activeTab === 'theory' && (
        <Section key="theory" id="theory" eyebrow="Day 4 • Statistical Spread" title="Measures of Dispersion">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              In Data Analytics, central tendency (like the mean) only tells half the story. Two companies might both pay an average salary of ₹50,000, but in Company A everyone earns ₹50,000, while in Company B one person earns ₹90,000 and another earns ₹10,000. **Measures of Dispersion** quantify how spread out or scattered the data points are.
            </p>

            <ZoomableImage src={dispersionImg} alt="Measures of Dispersion Explained" />

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>1. Range</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The difference between the largest (maximum) and smallest (minimum) values in a dataset.
                  <br /><strong>Formula:</strong> Range = Max - Min
                  <br /><strong>Business Case:</strong> Analyzing extreme stock prices to assess volatility during trading hours.
                  <br /><strong>Caveat:</strong> Highly sensitive to outliers since it only uses two numbers.
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>2. Variance (σ² or s²)</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The average of the squared differences of observations from their mean. It measures the overall variability.
                  <br />• <strong>Population Variance (σ²):</strong> Σ(X_i - μ)² / N
                  <br />• <strong>Sample Variance (s²):</strong> Σ(X_i - X̄)² / (n - 1) *(Uses Bessel's correction)*
                  <br /><strong>Caveat:</strong> Expressed in squared units, making it non-intuitive to interpret directly.
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>3. Standard Deviation (σ or s)</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The square root of the variance. It returns the spread to the same unit of measure as the original data.
                  <br /><strong>Formula:</strong> s = √Variance
                  <br /><strong>Business Case:</strong> A manufacturing line measuring SD of part sizes to ensure quality control limits.
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>4. Interquartile Range (IQR)</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The range of the middle 50% of the dataset, computed as the difference between the 3rd quartile (Q3) and 1st quartile (Q1).
                  <br /><strong>Formula:</strong> IQR = Q3 - Q1
                  <br /><strong>Benefit:</strong> Immune to outliers since it discards the top and bottom 25% of extreme values.
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>5. Coefficient of Variation (CV)</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> A relative measure of dispersion calculated as the ratio of standard deviation to the mean.
                  <br /><strong>Formula:</strong> CV = (s / X̄) * 100%
                  <br /><strong>Business Case:</strong> Comparing risk (volatility) between two completely different stock indices (e.g. Nifty vs. Tesla).
                </p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('freqpos')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the practical difference between variance and standard deviation?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* FREQUENCY & POSITION TAB */}
      {activeTab === 'freqpos' && (
        <Section key="freqpos" id="freqpos" eyebrow="Data Layouts" title="Measures of Frequency & Position">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Frequency Distributions</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              A frequency distribution displays how often each value (or range of values) occurs in a dataset. Analysts construct frequency tables to summarize large amounts of transactions or customer records.
            </p>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              <li><strong>Absolute Frequency:</strong> The raw count of occurrences of a category/value.</li>
              <li><strong>Relative Frequency:</strong> The proportion of occurrences relative to the total dataset size (Absolute count / Total count).</li>
              <li><strong>Cumulative Frequency:</strong> The running total of frequencies up to a certain value category.</li>
            </ul>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Measures of Position</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              These metrics indicate where a specific observation stands relative to the rest of the dataset:
            </p>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #db2777' }}>
                <strong style={{ color: '#0f172a' }}>📊 Quartiles (Q1, Q2, Q3):</strong>
                <p style={{ color: '#475569', margin: '0.3rem 0 0 0', fontSize: '0.9rem' }}>
                  Splits data into 4 equal quarters. Q1 is the 25th percentile, Q2 is the 50th percentile (Median), and Q3 is the 75th percentile.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #db2777' }}>
                <strong style={{ color: '#0f172a' }}>📊 Percentiles:</strong>
                <p style={{ color: '#475569', margin: '0.3rem 0 0 0', fontSize: '0.9rem' }}>
                  Splits data into 100 equal parts. E.g. scoring in the 90th percentile means you scored higher than 90% of all test takers.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #db2777' }}>
                <strong style={{ color: '#0f172a' }}>📊 Deciles:</strong>
                <p style={{ color: '#475569', margin: '0.3rem 0 0 0', fontSize: '0.9rem' }}>
                  Splits data into 10 equal parts (10th, 20th... 90th percentiles).
                </p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('shapes')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Show me how percentiles are used in website speed monitoring (like p95 and p99 load times).")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* MEASURES OF SHAPES TAB */}
      {activeTab === 'shapes' && (
        <Section key="shapes" id="shapes" eyebrow="Distribution Geometry" title="Measures of Shapes: Skewness & Kurtosis">
          <div className="panel">
            <p style={{ marginBottom: '2.5rem', color: '#475569', lineHeight: 1.6 }}>
              Besides spread and centers, distributions possess geometric shapes. We measure these shapes to detect asymmetry or tail weights.
            </p>

            <ZoomableImage src={shapesImg} alt="Skewness and Kurtosis Explained" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontSize: '1.15rem' }}>🔄 Skewness (Asymmetry)</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                  Measures the lack of symmetry.
                </p>
                <ul style={{ paddingLeft: '18px', color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                  <li><strong>Symmetric:</strong> Skewness = 0 (Normal).</li>
                  <li><strong>Positive Skew (Right-skewed):</strong> Tail extends to the right (Mean &gt; Median). E.g., customer income.</li>
                  <li><strong>Negative Skew (Left-skewed):</strong> Tail extends to the left (Mean &lt; Median). E.g., age of retirement.</li>
                </ul>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontSize: '1.15rem' }}>⛰️ Kurtosis (Tail weight)</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                  Measures the presence of outliers and extreme events.
                </p>
                <ul style={{ paddingLeft: '18px', color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                  <li><strong>Leptokurtic (Kurtosis &gt; 3):</strong> Heavy tails, high peak. Many extreme outliers (e.g. stock market crashes).</li>
                  <li><strong>Mesokurtic (Kurtosis = 3):</strong> Normal tail distribution.</li>
                  <li><strong>Platykurtic (Kurtosis &lt; 3):</strong> Flat peak, thin tails. Fewer outliers.</li>
                </ul>
              </div>

            </div>

            {/* INTERACTIVE DISPERSION & SHAPE CALCULATOR */}
            <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#db2777', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} /> 🎮 Interactive Dispersion & Shape Calculator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Enter custom numbers to dynamically calculate all range, variance, standard deviation, percentiles, and skewness index in real-time.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '1rem', color: '#0f172a', fontWeight: 'bold' }}
                  placeholder="e.g. 10, 15, 20, 25, 30, 45"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ background: '#db2777', borderColor: '#db2777', minWidth: '180px' }}
                  onClick={calculateDispersion}
                >
                  ⚙️ Calculate Dispersion
                </button>
              </div>

              {calcResults && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Sorted Dataset:</span>
                    <h4 style={{ color: '#0f172a', fontSize: '0.95rem', margin: '0.2rem 0 0 0', fontFamily: 'monospace' }}>[{calcResults.sorted}]</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Range (Max - Min):</span>
                    <h4 style={{ color: '#db2777', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.range.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Sample Variance (s²):</span>
                    <h4 style={{ color: '#db2777', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.variance.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Standard Deviation (s):</span>
                    <h4 style={{ color: '#db2777', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.sd.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Quartile 1 / 3:</span>
                    <h4 style={{ color: '#2563eb', fontSize: '1.1rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>
                      Q1: {calcResults.q1.toFixed(2)} | Q3: {calcResults.q3.toFixed(2)}
                    </h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>IQR (Q3 - Q1):</span>
                    <h4 style={{ color: '#2563eb', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.iqr.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Coeff. of Variation (CV):</span>
                    <h4 style={{ color: '#2563eb', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.cv.toFixed(2)}%</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Skewness (Pearson index):</span>
                    <h4 style={{ color: '#10b981', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.skewness.toFixed(2)}</h4>
                  </div>
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('math')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between positive skewness and negative skewness?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* MATH & PYTHON TAB */}
      {activeTab === 'math' && (
        <Section key="math" id="math" eyebrow="Manual & Python" title="Calculations & Programming Examples">
          <div className="panel">
            
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>📐 Step-by-Step Manual Calculations</h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1rem' }}>
              Suppose we have 4 customer transaction amounts: `[4, 8, 12, 16]` Indian Rupees (n = 4).
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ margin: 0, color: '#facc15' }}># 1. Calculate Mean (X̄):</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Sum = 4 + 8 + 12 + 16 = 40</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Mean = 40 / 4 = 10.0</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># 2. Calculate Squared Deviations (X_i - X̄)²:</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>(4 - 10)² = 36</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>(8 - 10)² = 4</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>(12 - 10)² = 4</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>(16 - 10)² = 36</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Sum of Squared Deviations = 36 + 4 + 4 + 36 = 80</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># 3. Calculate Sample Variance (s²):</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>s² = 80 / (n - 1) = 80 / 3 = 26.67</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># 4. Calculate Standard Deviation (s):</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>s = √26.67 ≈ 5.16</p>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python Implementation</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Below is a complete script to compute the measures of dispersion and IQR in Python:
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} /> dispersion_calculator.py
                </span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>
                  Python Code
                </span>
              </div>
              <SyntaxHighlighter code={`import math

# 1. Define dataset representing order delivery times
data = [12, 18, 22, 28, 35, 45, 60]
n = len(data)

# 2. Arithmetic Mean
mean_val = sum(data) / n

# 3. Variance & Standard Deviation (Sample)
variance = sum((x - mean_val) ** 2 for x in data) / (n - 1)
sd = math.sqrt(variance)

# 4. Quartiles & IQR
sorted_data = sorted(data)
# Median (Q2)
mid = n // 2
median = sorted_data[mid] if n % 2 != 0 else (sorted_data[mid - 1] + sorted_data[mid]) / 2

# Approximate Q1 & Q3 using indexing
q1 = sorted_data[n // 4]
q3 = sorted_data[(3 * n) // 4]
iqr = q3 - q1

# 5. Coefficient of Variation
cv = (sd / mean_val) * 100

print(f"Sorted Data: {sorted_data}")
print(f"Sample Variance (s²): {variance:.2f}")
print(f"Sample SD (s): {sd:.2f}")
print(f"Q1: {q1} | Q3: {q3} | IQR: {iqr}")
print(f"Coefficient of Variation: {cv:.2f}%")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} /> Console Output
              </h4>
              <pre style={{ margin: 0, color: '#1e40af', fontFamily: 'monospace', fontSize: '0.88rem' }}>
{`Sorted Data: [12, 18, 22, 28, 35, 45, 60]
Sample Variance (s²): 258.90
Sample SD (s): 16.09
Q1: 18 | Q3: 45 | IQR: 27
Coefficient of Variation: 51.21%`}
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain Bessel's correction in standard deviation and variance formulas.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 4 Assessment" title="Day 4 Assessment & Review">
          <div className="panel">
            
            {/* Common Mistakes */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Dispersion Errors to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Confusing Sample vs. Population:</strong> Using the division of $N$ (Population) when calculating Variance on sample databases. Always use $n - 1$ for samples.</li>
                <li><strong>Comparing SD across different scales:</strong> Stating that a house price dataset with SD = $10,000 has "more variation" than a height dataset with SD = $15$ cm. Standard deviation is scale-dependent. Compare them using the **Coefficient of Variation (CV)** instead!</li>
                <li><strong>Misinterpreting Skewness:</strong> Assuming that a skewed distribution is an error. Skewness is a natural profile of business processes (e.g. customer delivery delays are almost always positive skewed).</li>
              </ul>
            </div>

            {/* Interview Prep Questions */}
            <h3 style={{ color: '#1e293b', marginBottom: '1.2rem' }}>💬 Interview Questions</h3>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q1. Why is the Interquartile Range (IQR) preferred over the Range when working with messy datasets?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  The Range only calculates the difference between the absolute Maximum and Minimum, meaning a single extreme outlier completely distorts the metric. The IQR calculates Q3 - Q1, capturing the spread of the middle 50% of data points, completely filtering out outlier distortions.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q2. What is the difference between positive skewness and negative skewness, and what causes it in business metrics?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Positive skewness occurs when the tail of the distribution extends to the right (Mean &gt; Median), caused by occasional exceptionally large numbers (like luxury orders). Negative skewness occurs when the tail extends left (Mean &lt; Median), caused by occasional small numbers.
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
                  <strong>Task 1:</strong> Calculate the Range and Interquartile Range (IQR) manually for the dataset: `[12, 18, 22, 28, 35, 45, 60]`.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 2:</strong> Compute the sample variance and sample standard deviation manually for the numbers: `[4, 8, 12, 16]`.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 3:</strong> In your own words, explain the difference between a Mesokurtic, Leptokurtic, and Platykurtic distribution. What do they tell a data analyst about outliers?
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 4:</strong> Write a raw Python script that calculates the Range, IQR, and Coefficient of Variation for the list: `[15, 20, 25, 30, 35, 40]`. Do not use external libraries.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 5:</strong> Create a frequency distribution table (Absolute and Relative frequency) for the feedback category ratings list: `['Good', 'Poor', 'Good', 'Excellent', 'Poor', 'Good', 'Good']`.
                </li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 4 of Statistics! 🎉')}>
                Submit & Complete Day 4 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
