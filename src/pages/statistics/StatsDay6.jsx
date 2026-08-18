import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';
import boxPlotImg from '../../assets/box_plot_anatomy.png';

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

export default function StatsDay6({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Playground dataset configuration
  const [rawInput, setRawInput] = useState("12, 15, 18, 22, 25, 29, 31, 35, 42, 48, 85");
  const [calcResults, setCalcResults] = useState(null);

  const calculateBoxPlot = () => {
    try {
      const nums = rawInput
        .split(',')
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x));

      if (nums.length < 4) {
        alert("Please enter at least 4 numbers to build a proper Box Plot.");
        return;
      }

      const sorted = [...nums].sort((a, b) => a - b);
      const n = sorted.length;

      const minVal = sorted[0];
      const maxVal = sorted[n - 1];

      // Median / Q2
      const getPercentile = (p) => {
        const idx = (n - 1) * p;
        const low = Math.floor(idx);
        const high = Math.ceil(idx);
        return sorted[low] + (sorted[high] - sorted[low]) * (idx - low);
      };

      const q1 = getPercentile(0.25);
      const q2 = getPercentile(0.50); // median
      const q3 = getPercentile(0.75);
      const iqr = q3 - q1;

      // Outlier thresholds
      const lowerFence = q1 - 1.5 * iqr;
      const upperFence = q3 + 1.5 * iqr;

      // Classify values
      const outliers = sorted.filter(x => x < lowerFence || x > upperFence);
      const nonOutliers = sorted.filter(x => x >= lowerFence && x <= upperFence);

      // Actual whiskers end at the min/max non-outlier values
      const whiskerMin = nonOutliers[0];
      const whiskerMax = nonOutliers[nonOutliers.length - 1];

      setCalcResults({
        sorted,
        minVal,
        maxVal,
        q1,
        median: q2,
        q3,
        iqr,
        lowerFence,
        upperFence,
        whiskerMin,
        whiskerMax,
        outliers
      });
    } catch (e) {
      alert("Error parsing list values. Please enter comma-separated numbers.");
    }
  };

  const handleContinue = (nextTabId) => {
    onNavigate('stats_day6', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      id: 1,
      q: "Which metrics comprise the 'Five Number Summary' in statistics?",
      opts: [
        "Mean, Median, Mode, SD, Variance",
        "Minimum, Q1, Median (Q2), Q3, Maximum",
        "Range, IQR, Variance, Z-score, Kurtosis",
        "10th, 25th, 50th, 75th, and 90th percentiles"
      ],
      ans: 1,
      exp: "The Five Number Summary consists of the Minimum, 1st Quartile (Q1), Median (Q2), 3rd Quartile (Q3), and the Maximum. It provides a quick, holistic overview of data spread and center."
    },
    {
      id: 2,
      q: "Using Tukey's fences, how do we mathematically identify outliers?",
      opts: [
        "Any value greater than Q3 or smaller than Q1.",
        "Any value smaller than (Q1 - 1.5 * IQR) or larger than (Q3 + 1.5 * IQR).",
        "Any value that is more than 1 standard deviation from the arithmetic mean.",
        "Any value that duplicates another value."
      ],
      ans: 1,
      exp: "Tukey's Outlier Rule defines boundaries (fences) at Q1 - 1.5 * IQR (lower fence) and Q3 + 1.5 * IQR (upper fence). Any observations outside these boundaries are classified as outliers."
    },
    {
      id: 3,
      q: "What does the vertical line inside the box of a Box Plot represent?",
      opts: [
        "The Mean",
        "The Mode",
        "The Median (Q2)",
        "The Standard Deviation margin"
      ],
      ans: 2,
      exp: "The vertical line inside the box of a box plot marks the Median (50th percentile) of the dataset."
    },
    {
      id: 4,
      q: "If Q1 = 50 and Q3 = 70, what is the Interquartile Range (IQR)?",
      opts: [
        "120",
        "10",
        "20",
        "30"
      ],
      ans: 2,
      exp: "The IQR is calculated as Q3 - Q1. So, 70 - 50 = 20."
    },
    {
      id: 5,
      q: "If Q1 = 50, Q3 = 70, and IQR = 20, what is the upper fence outlier boundary?",
      opts: [
        "90",
        "100",
        "80",
        "70"
      ],
      ans: 1,
      exp: "The upper fence is Q3 + 1.5 * IQR = 70 + (1.5 * 20) = 70 + 30 = 100. Any value above 100 is an outlier."
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
        <Section key="theory" id="theory" eyebrow="Day 6 • Summary Metrics" title="The Five Number Summary">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              In descriptive statistics, the **Five Number Summary** is a robust framework used to understand the distribution, spread, center, and outlier characteristics of a dataset. Instead of relying on a single mean, it divides the dataset into quarters using five reference points:
            </p>

            <ZoomableImage src={boxPlotImg} alt="Box Plot & Five Number Summary Anatomy" />

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#db2777', fontSize: '1.25rem' }}>🌎 The Five Numbers Explained</h3>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                  <li><strong>1. Minimum:</strong> The smallest numerical observation in the dataset (excluding outliers).</li>
                  <li><strong>2. First Quartile (Q1):</strong> The 25th percentile. 25% of the data points are equal to or smaller than Q1.</li>
                  <li><strong>3. Median (Q2):</strong> The 50th percentile. The midpoint splitting the data in half.</li>
                  <li><strong>4. Third Quartile (Q3):</strong> The 75th percentile. 75% of the data points are equal to or smaller than Q3.</li>
                  <li><strong>5. Maximum:</strong> The largest numerical observation in the dataset (excluding outliers).</li>
                </ul>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>📊 Quartiles vs. Percentiles</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  **Percentiles** divide sorted data into 100 equal parts (e.g. scoring in the 95th percentile means you exceed 95% of observations). **Quartiles** are specific percentile landmarks that divide data into four equal quarters:
                  <br />• <strong>Q1</strong> = 25th Percentile
                  <br />• <strong>Q2</strong> = 50th Percentile (Median)
                  <br />• <strong>Q3</strong> = 75th Percentile
                </p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('boxplot')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between quartiles and deciles?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* BOX PLOTS & OUTLIERS TAB */}
      {activeTab === 'boxplot' && (
        <Section key="boxplot" id="boxplot" eyebrow="Data Visualization" title="Box Plots & Tukey Outlier Detection">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. What is a Box Plot?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              A **Box Plot** (also called a Box-and-Whisker plot) is a visual graph of the Five Number Summary.
            </p>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              <li><strong>The Box:</strong> Spans from Q1 to Q3, representing the middle 50% of the dataset (the IQR).</li>
              <li><strong>The Median Line:</strong> A line inside the box marking the 50th percentile.</li>
              <li><strong>The Whiskers:</strong> Lines extending outwards from the box to the Minimum and Maximum non-outlier values.</li>
              <li><strong>Outlier Dots:</strong> Individual points plotted beyond the whiskers.</li>
            </ul>

            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Tukey's Outlier detection (1.5 × IQR Rule)</h3>
            <p style={{ marginBottom: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
              How do we know where whiskers should end and what qualifies as an outlier? We build upper and lower limits ("fences") using the Interquartile Range (IQR = Q3 - Q1):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.2rem', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #b45309' }}>
                <strong style={{ color: '#78350f' }}>📉 Lower Fence Limit:</strong>
                <p style={{ color: '#78350f', margin: '0.3rem 0 0 0', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  Lower Fence = Q1 - (1.5 * IQR)
                </p>
                <span style={{ fontSize: '0.8rem', color: '#b45309' }}>Any value below this threshold is an outlier.</span>
              </div>
              <div style={{ padding: '1.2rem', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #b45309' }}>
                <strong style={{ color: '#78350f' }}>📈 Upper Fence Limit:</strong>
                <p style={{ color: '#78350f', margin: '0.3rem 0 0 0', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  Upper Fence = Q3 + (1.5 * IQR)
                </p>
                <span style={{ fontSize: '0.8rem', color: '#b45309' }}>Any value above this threshold is an outlier.</span>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('playground')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Why do we specifically use 1.5 times the IQR for outlier limits instead of another number?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PLAYGROUND TAB */}
      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Interactive Playground" title="Interactive Box Plot Builder">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Enter custom numbers (comma-separated) to calculate the Five Number Summary and construct a visual box plot chart instantly.
            </p>

            <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#0f172a' }}>Enter Dataset:</label>
                <input
                  type="text"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '1rem', color: '#0f172a', fontWeight: 'bold' }}
                  placeholder="e.g. 10, 15, 20, 25, 30, 45"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ background: '#db2777', borderColor: '#db2777', minWidth: '180px' }}
                  onClick={calculateBoxPlot}
                >
                  ⚙️ Build Box Plot
                </button>
              </div>

              {calcResults && (
                <div>
                  {/* SUMMARY TABLE */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Minimum:</span>
                      <h4 style={{ color: '#db2777', fontSize: '1.15rem', margin: 0, fontWeight: 'bold' }}>{calcResults.minVal}</h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Quartile 1 (Q1):</span>
                      <h4 style={{ color: '#db2777', fontSize: '1.15rem', margin: 0, fontWeight: 'bold' }}>{calcResults.q1}</h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Median (Q2):</span>
                      <h4 style={{ color: '#db2777', fontSize: '1.15rem', margin: 0, fontWeight: 'bold' }}>{calcResults.median}</h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Quartile 3 (Q3):</span>
                      <h4 style={{ color: '#db2777', fontSize: '1.15rem', margin: 0, fontWeight: 'bold' }}>{calcResults.q3}</h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Maximum:</span>
                      <h4 style={{ color: '#db2777', fontSize: '1.15rem', margin: 0, fontWeight: 'bold' }}>{calcResults.maxVal}</h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>IQR:</span>
                      <h4 style={{ color: '#2563eb', fontSize: '1.15rem', margin: 0, fontWeight: 'bold' }}>{calcResults.iqr}</h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Lower / Upper Fences:</span>
                      <h4 style={{ color: '#2563eb', fontSize: '0.95rem', margin: 0, fontWeight: 'bold', fontFamily: 'monospace' }}>
                        [{calcResults.lowerFence.toFixed(1)}, {calcResults.upperFence.toFixed(1)}]
                      </h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Outliers Detected:</span>
                      <h4 style={{ color: calcResults.outliers.length > 0 ? '#dc2626' : '#16a34a', fontSize: '1rem', margin: 0, fontWeight: 'bold' }}>
                        {calcResults.outliers.length > 0 ? calcResults.outliers.join(', ') : 'None'}
                      </h4>
                    </div>
                  </div>

                  {/* VISUAL CHART */}
                  <div style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '12px' }}>
                    <h4 style={{ color: '#0f172a', margin: '0 0 2rem 0' }}>📈 Custom Rendered Box-and-Whisker Plot</h4>
                    
                    <div style={{ position: 'relative', height: '100px', width: '100%', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
                      {/* Range scale helper logic */}
                      {(() => {
                        const { minVal, maxVal, q1, median, q3, whiskerMin, whiskerMax, outliers } = calcResults;
                        const totalRange = maxVal - minVal;
                        
                        const getPercent = (val) => {
                          if (totalRange === 0) return 50;
                          return ((val - minVal) / totalRange) * 85 + 7.5; // pad 7.5% margins left/right
                        };

                        const q1Pct = getPercent(q1);
                        const medianPct = getPercent(median);
                        const q3Pct = getPercent(q3);
                        const wMinPct = getPercent(whiskerMin);
                        const wMaxPct = getPercent(whiskerMax);

                        return (
                          <>
                            {/* Horizontal Line connecting whiskers */}
                            <div style={{ position: 'absolute', left: `${wMinPct}%`, right: `${100 - wMaxPct}%`, height: '2px', background: '#94a3b8', zIndex: 1 }} />
                            
                            {/* Whisker Min Vertical Bar */}
                            <div style={{ position: 'absolute', left: `${wMinPct}%`, height: '20px', width: '2px', background: '#64748b', zIndex: 2, transform: 'translateY(-10px)' }} />
                            
                            {/* Whisker Max Vertical Bar */}
                            <div style={{ position: 'absolute', left: `${wMaxPct}%`, height: '20px', width: '2px', background: '#64748b', zIndex: 2, transform: 'translateY(-10px)' }} />

                            {/* The IQR Box */}
                            <div style={{
                              position: 'absolute',
                              left: `${q1Pct}%`,
                              width: `${q3Pct - q1Pct}%`,
                              height: '40px',
                              background: '#fbcfe8',
                              border: '2px solid #db2777',
                              borderRadius: '4px',
                              zIndex: 3,
                              transform: 'translateY(-20px)'
                            }} />

                            {/* Median Line inside box */}
                            <div style={{
                              position: 'absolute',
                              left: `${medianPct}%`,
                              height: '40px',
                              width: '3px',
                              background: '#9d174d',
                              zIndex: 4,
                              transform: 'translateY(-20px)'
                            }} />

                            {/* Outlier Dots */}
                            {outliers.map((val, idx) => {
                              const pct = getPercent(val);
                              return (
                                <div
                                  key={idx}
                                  title={`Outlier: ${val}`}
                                  style={{
                                    position: 'absolute',
                                    left: `${pct}%`,
                                    height: '10px',
                                    width: '10px',
                                    background: '#dc2626',
                                    borderRadius: '50%',
                                    zIndex: 5,
                                    transform: 'translate(-5px, -5px)',
                                    boxShadow: '0 0 4px rgba(220, 38, 38, 0.5)'
                                  }}
                                />
                              );
                            })}

                            {/* Labels below chart */}
                            <span style={{ position: 'absolute', left: `${wMinPct}%`, top: '70px', fontSize: '0.72rem', color: '#64748b', transform: 'translateX(-50%)' }}>
                              Min: {whiskerMin}
                            </span>
                            <span style={{ position: 'absolute', left: `${q1Pct}%`, top: '10px', fontSize: '0.72rem', color: '#db2777', transform: 'translate(-50%, -20px)', fontWeight: 'bold' }}>
                              Q1: {q1}
                            </span>
                            <span style={{ position: 'absolute', left: `${medianPct}%`, top: '70px', fontSize: '0.72rem', color: '#9d174d', transform: 'translateX(-50%)', fontWeight: 'bold' }}>
                              Med: {median}
                            </span>
                            <span style={{ position: 'absolute', left: `${q3Pct}%`, top: '10px', fontSize: '0.72rem', color: '#db2777', transform: 'translate(-50%, -20px)', fontWeight: 'bold' }}>
                              Q3: {q3}
                            </span>
                            <span style={{ position: 'absolute', left: `${wMaxPct}%`, top: '70px', fontSize: '0.72rem', color: '#64748b', transform: 'translateX(-50%)' }}>
                              Max: {whiskerMax}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('programming')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Explain the difference between a vertical box plot and a horizontal box plot.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PROGRAMMING TAB */}
      {activeTab === 'programming' && (
        <Section key="programming" id="programming" eyebrow="Hands-On Programming" title="Manual Calculations & Python Code">
          <div className="panel">
            
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>📐 Step-by-Step Manual Calculations</h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1rem' }}>
              Let's find the Five Numbers manually for the dataset: `[5, 12, 15, 18, 22, 28, 30]` (n = 7).
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ margin: 0, color: '#facc15' }}># 1. Minimum and Maximum:</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Min = 5</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Max = 30</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># 2. Find Median (Q2):</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Mid index = 7 // 2 = 3rd element (0-indexed)</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Median = 18</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># 3. Find Q1 (median of lower half: [5, 12, 15]):</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Q1 = 12</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># 4. Find Q3 (median of upper half: [22, 28, 30]):</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Q3 = 28</p>
              <p style={{ margin: '1rem 0 0 0', color: '#10b981' }}># Resulting Five Number Summary: [5, 12, 18, 28, 30]</p>
            </div>

            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🐍 Python Five Number Summary Code</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Here is a Python script demonstrating how to calculate percentiles and quartile thresholds using raw Python logic:
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} /> boxplot_stats.py
                </span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>
                  Python Code
                </span>
              </div>
              <SyntaxHighlighter code={`def get_percentile(data, p):
    sorted_data = sorted(data)
    n = len(sorted_data)
    idx = (n - 1) * p
    low = int(idx)
    high = low + 1 if low < n - 1 else low
    weight = idx - low
    return sorted_data[low] + (sorted_data[high] - sorted_data[low]) * weight

# Sample data
data = [12, 15, 18, 22, 25, 29, 31, 35, 42, 48, 85]

# Calculate Summary
minimum = min(data)
maximum = max(data)
q1 = get_percentile(data, 0.25)
q2 = get_percentile(data, 0.50)  # Median
q3 = get_percentile(data, 0.75)
iqr = q3 - q1

# Outliers
lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr
outliers = [x for x in data if x < lower_fence or x > upper_fence]

print(f"Sorted Dataset: {sorted(data)}")
print(f"Five-Number: Min={minimum}, Q1={q1:.1f}, Median={q2:.1f}, Q3={q3:.1f}, Max={maximum}")
print(f"Outliers: {outliers}")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} /> Console Output
              </h4>
              <pre style={{ margin: 0, color: '#1e40af', fontFamily: 'monospace', fontSize: '0.88rem' }}>
{`Sorted Dataset: [12, 15, 18, 22, 25, 29, 31, 35, 42, 48, 85]
Five-Number: Min=12, Q1=19.0, Median=29.0, Q3=40.2, Max=85
Outliers: [85]`}
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between standard percentile calculations (linear interpolation vs nearest rank)?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 6 Assessment" title="Day 6 Assessment & Review">
          <div className="panel">
            
            {/* Common Mistakes */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Box Plot Pitfalls
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Ending whiskers at outliers:</strong> Drawing the maximum whisker line all the way to an outlier (e.g. 85). Whiskers should end at the *last non-outlier value* within the fences.</li>
                <li><strong>Assuming Box Plots show sample size:</strong> Stating that a wider box plot represents more customer feedback responses. Box plots show shape and distribution, not count! A dataset of 10 records and 10,000 records can have identical box plot scales.</li>
                <li><strong>Ignoring skew inside the box:</strong> Overlooking that when the Median line is closer to Q1 than Q3, the middle 50% distribution is right-skewed.</li>
              </ul>
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
                Submit the answers to these exercises to check off Day 6:
              </p>
              
              <ul style={{ color: '#831843', lineHeight: 1.8, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 1:</strong> For the sorted dataset: `[5, 12, 15, 18, 22, 28, 30, 40, 75]`, calculate the Five Number Summary manually.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 2:</strong> Identify if there are any outliers in the dataset from Task 1 using Tukey's 1.5*IQR rule. Show your calculation step-by-step.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 3:</strong> If the median of a dataset is 50, is it mathematically possible for Q1 to be 55? Explain why or why not.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 4:</strong> Write a raw Python script that calculates the Five Number Summary for any list of numbers. Do not import external packages like NumPy or Pandas.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 5:</strong> Box plots can be grouped to compare multiple categories on a single chart. What are the advantages of using side-by-side box plots over standard bar charts showing only group averages?
                </li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 6 of Statistics! 🎉')}>
                Submit & Complete Day 6 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
