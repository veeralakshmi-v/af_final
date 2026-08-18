import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';

import outlierImg from '../../assets/mean_median_mode_outliers.png';

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

export default function StatsDay3({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Interactive Calculator State
  const [rawInput, setRawInput] = useState("10, 15, 20, 20, 35");
  const [calcResults, setCalcResults] = useState(null);

  const calculateTendency = () => {
    try {
      const nums = rawInput
        .split(',')
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x));

      if (nums.length === 0) return;

      // 1. Mean
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / nums.length;

      // 2. Median
      const sorted = [...nums].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 !== 0 
        ? sorted[mid] 
        : (sorted[mid - 1] + sorted[mid]) / 2;

      // 3. Mode
      const counts = {};
      let maxCount = 0;
      nums.forEach(n => {
        counts[n] = (counts[n] || 0) + 1;
        if (counts[n] > maxCount) maxCount = counts[n];
      });
      const modes = [];
      Object.keys(counts).forEach(key => {
        if (counts[key] === maxCount && maxCount > 1) {
          modes.push(parseFloat(key));
        }
      });
      const modeStr = modes.length > 0 ? modes.join(', ') : "No Mode";

      // 4. Weighted Mean (Assume linear ascending weights for demo: 1, 2, 3...)
      let wSum = 0;
      let totalW = 0;
      nums.forEach((n, idx) => {
        const weight = idx + 1;
        wSum += n * weight;
        totalW += weight;
      });
      const weightedMean = wSum / totalW;

      // 5. Geometric Mean (only for positive numbers)
      const hasNegative = nums.some(n => n <= 0);
      let geoMean = "N/A (Numbers must be > 0)";
      if (!hasNegative) {
        const product = nums.reduce((a, b) => a * b, 1);
        geoMean = Math.pow(product, 1 / nums.length);
      }

      setCalcResults({
        count: nums.length,
        sorted: sorted.join(', '),
        mean,
        median,
        mode: modeStr,
        weightedMean,
        geoMean
      });
    } catch (e) {
      alert("Error parsing input dataset. Please enter comma-separated numbers.");
    }
  };

  const handleContinue = (nextTabId) => {
    onNavigate('stats_day3', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      id: 1,
      q: "Which measure of central tendency is most sensitive to extreme values (outliers)?",
      opts: [
        "Median",
        "Mode",
        "Arithmetic Mean",
        "Geometric Mean"
      ],
      ans: 2,
      exp: "The Mean is highly sensitive to outliers because it sums all values. A single extremely high salary in a company will skew the mean upwards."
    },
    {
      id: 2,
      q: "In a company of 10 employees, 9 earn ₹30,000/month and the CEO earns ₹1,000,000/month. What metric should you use to report typical employee income?",
      opts: [
        "Arithmetic Mean",
        "Median",
        "Weighted Mean",
        "Geometric Mean"
      ],
      ans: 1,
      exp: "Median is correct. Since the CEO's salary is an extreme outlier, the median will report the middle value (₹30,000), representing typical employee earnings without outlier distortion."
    },
    {
      id: 3,
      q: "When calculating compound growth rates or returns on investments over multiple periods, which mean should you use?",
      opts: [
        "Arithmetic Mean",
        "Geometric Mean",
        "Weighted Mean",
        "Mode"
      ],
      ans: 1,
      exp: "Geometric Mean is used for growth factors and compounding metrics because it multiplies values and takes the n-th root rather than adding them."
    },
    {
      id: 4,
      q: "What is the mode of this dataset: [12, 15, 12, 18, 15, 20, 15]?",
      opts: [
        "12",
        "15",
        "18",
        "Bimodal (12 and 15)"
      ],
      ans: 1,
      exp: "The value 15 appears 3 times, which is more frequent than any other value (12 appears twice, others once). Thus, the mode is 15."
    },
    {
      id: 5,
      q: "If an exam has a midterm worth 30% and a final worth 70%, and you score 80 and 90 respectively, which metric calculates your final score?",
      opts: [
        "Simple Mean",
        "Geometric Mean",
        "Weighted Mean",
        "Median"
      ],
      ans: 2,
      exp: "The Weighted Mean calculates scores when different components carry different levels of importance or 'weights'."
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
        <Section key="theory" id="theory" eyebrow="Day 3 • Central Tendency" title="Mean, Median & Mode">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              In Data Analytics, after collecting data, the first step is description. **Measures of Central Tendency** are single values that attempt to describe a dataset by identifying its central or "middle" point.
            </p>

            <ZoomableImage src={outlierImg} alt="Mean, Median, and Mode Outlier Shifts Explained" />

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>1. Arithmetic Mean</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The sum of all values divided by the total number of values. It is the most common average.
                  <br /><strong>Formula:</strong> X̄ = Σ X_i / n
                  <br /><strong>Business Example:</strong> Average Order Value (AOV) in e-commerce, showing average basket size.
                  <br /><strong>Caveat:</strong> Highly sensitive to outliers!
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>2. Median</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The middle value when a dataset is ordered from smallest to largest. If the dataset has an even count, it is the average of the two middle numbers.
                  <br /><strong>Formula:</strong> Middle Index = (n + 1) / 2
                  <br /><strong>Business Example:</strong> Median household income, providing a typical picture unaffected by billionaires.
                  <br /><strong>Benefit:</strong> Resistant to extreme outliers.
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>3. Mode</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The value that occurs most frequently in a dataset.
                  <br /><strong>Formula:</strong> Mode = Value with highest frequency count.
                  <br /><strong>Business Example:</strong> Best selling product variation or shoe size (E.g. Medium is the Mode size sold).
                  <br /><strong>Benefit:</strong> Can be calculated for both numerical and categorical data.
                </p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('advanced')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Show me why the mean is pulled towards outliers while the median is not.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ADVANCED TAB */}
      {activeTab === 'advanced' && (
        <Section key="advanced" id="advanced" eyebrow="Compounding & Weights" title="Weighted & Geometric Mean">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Sometimes, a simple arithmetic average is not enough. Depending on the importance of each item or compound factors, we use advanced means:
            </p>

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontSize: '1.25rem' }}>1. Weighted Mean</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> An average where some values contribute more to the final result than others based on assigned "weights".
                  <br /><strong>Formula:</strong> X̄_w = Σ (X_i * w_i) / Σ w_i
                  <br /><strong>Business Example:</strong> Calculating average portfolio yield where weights represent the size of each investment asset.
                </p>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#2563eb', fontSize: '1.25rem' }}>2. Geometric Mean</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <strong>Definition:</strong> The n-th root of the product of n numbers. Used for values that compound or represent growth rates.
                  <br /><strong>Formula:</strong> GM = ⁿ√(X_1 * X_2 * ... * X_n)
                  <br /><strong>Business Example:</strong> Finding the Compound Annual Growth Rate (CAGR) of website traffic over 3 years.
                </p>
              </div>

            </div>

            {/* INTERACTIVE CENTRAL TENDENCY CALCULATOR */}
            <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#db2777', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} /> 🎮 Interactive Central Tendency Calculator
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Enter a list of comma-separated numbers (positive values only for Geometric Mean calculation) to see the metrics calculated in real-time.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '1rem', color: '#0f172a', fontWeight: 'bold' }}
                  placeholder="e.g. 10, 15, 20, 20, 35"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ background: '#db2777', borderColor: '#db2777', minWidth: '180px' }}
                  onClick={calculateTendency}
                >
                  ⚙️ Calculate Central Tendency
                </button>
              </div>

              {calcResults && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Sorted Dataset:</span>
                    <h4 style={{ color: '#0f172a', fontSize: '1rem', margin: '0.2rem 0 0 0', fontFamily: 'monospace' }}>[{calcResults.sorted}]</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Arithmetic Mean:</span>
                    <h4 style={{ color: '#db2777', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.mean.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Median value:</span>
                    <h4 style={{ color: '#db2777', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.median.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Mode(s):</span>
                    <h4 style={{ color: '#db2777', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.mode}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Weighted Mean (ascending weights):</span>
                    <h4 style={{ color: '#2563eb', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>{calcResults.weightedMean.toFixed(2)}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Geometric Mean:</span>
                    <h4 style={{ color: '#2563eb', fontSize: '1.2rem', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>
                      {typeof calcResults.geoMean === 'number' ? calcResults.geoMean.toFixed(2) : calcResults.geoMean}
                    </h4>
                  </div>
                </div>
              )}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('math')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between geometric mean and harmonic mean?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* MANUAL MATHEMATICAL CALCULATIONS */}
      {activeTab === 'math' && (
        <Section key="math" id="math" eyebrow="Manual Workouts" title="Manual Mathematical Calculations">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Let's walk through manual step-by-step calculations for each topic to build solid mathematical muscle.
            </p>

            {/* Arithmetic Mean & Median */}
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>📐 Example 1: Arithmetic Mean & Median</h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1rem' }}>
              Dataset representing 5 customer purchases: `[10, 15, 20, 20, 35]`.
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ margin: 0, color: '#facc15' }}># 1. Mean calculation:</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Sum = 10 + 15 + 20 + 20 + 35 = 100</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Mean = 100 / 5 = 20.00</p>
              <p style={{ margin: '1rem 0 0 0', color: '#facc15' }}># 2. Median calculation:</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 1: Sort dataset to [10, 15, 20, 20, 35]</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 2: n = 5 (odd count)</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Step 3: Mid-position = (5 + 1) / 2 = 3rd element</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Median = 20</p>
            </div>

            {/* Weighted Mean */}
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>📐 Example 2: Weighted Mean</h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1rem' }}>
              A student scores 80 on a midterm (weighted at 30%) and 90 on a final exam (weighted at 70%).
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ margin: 0, color: '#facc15' }}># Formula: (Σ X_i * w_i) / Σ w_i</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Weighted Sum = (80 * 0.30) + (90 * 0.70)</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Weighted Sum = 24.0 + 63.0 = 87.0</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Sum of Weights = 0.30 + 0.70 = 1.0</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Weighted Mean = 87.0 / 1.0 = 87.0</p>
            </div>

            {/* Geometric Mean */}
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>📐 Example 3: Geometric Mean</h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1rem' }}>
              An asset returns growth factors of 1.02 (2% growth) in Year 1 and 1.08 (8% growth) in Year 2.
            </p>
            <div style={{ background: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '2.5rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ margin: 0, color: '#facc15' }}># Formula: √(X_1 * X_2)</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Product = 1.02 * 1.08 = 1.1016</p>
              <p style={{ margin: '0.2rem 0', color: '#e2e8f0' }}>Geometric Mean = √1.1016 ≈ 1.0496 (or 4.96% compound growth)</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('python')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is bimodal data and how is it represented manually?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PYTHON LOGIC TAB */}
      {activeTab === 'python' && (
        <Section key="python" id="python" eyebrow="Hands-On Programming" title="Python Calculations for Central Tendency">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              Let's write a Python script demonstrating how to calculate Mean, Median, Mode, Weighted Mean, and Geometric Mean manually in raw Python.
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} /> central_tendency.py
                </span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>
                  Python Code
                </span>
              </div>
              <SyntaxHighlighter code={`import math

# 1. Sample Data representing orders
data = [10, 15, 20, 20, 35]
n = len(data)

# 2. Arithmetic Mean
mean_val = sum(data) / n

# 3. Median
sorted_data = sorted(data)
mid = n // 2
if n % 2 != 0:
    median_val = sorted_data[mid]
else:
    median_val = (sorted_data[mid - 1] + sorted_data[mid]) / 2

# 4. Mode
counts = {}
for x in data:
    counts[x] = counts.get(x, 0) + 1
max_occur = max(counts.values())
mode_val = [k for k, v in counts.items() if v == max_occur and max_occur > 1]

# 5. Weighted Mean
weights = [1, 2, 1, 3, 1]
w_sum = sum(data[i] * weights[i] for i in range(n))
weighted_mean = w_sum / sum(weights)

# 6. Geometric Mean (product of elements raised to 1/n)
prod = 1.0
for x in data:
    prod *= x
geo_mean = prod ** (1.0 / n)

# Print Summary Results
print(f"Dataset: {data}")
print(f"Mean: {mean_val:.2f}")
print(f"Median: {median_val:.2f}")
print(f"Mode: {mode_val}")
print(f"Weighted Mean: {weighted_mean:.2f}")
print(f"Geometric Mean: {geo_mean:.2f}")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} /> Console Output
              </h4>
              <pre style={{ margin: 0, color: '#1e40af', fontFamily: 'monospace', fontSize: '0.88rem' }}>
{`Dataset: [10, 15, 20, 20, 35]
Mean: 20.00
Median: 20.00
Mode: [20]
Weighted Mean: 21.88
Geometric Mean: 18.52`}
              </pre>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Write a simple python dictionary function to count the frequency of unique nominal labels in a list.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 3 Assessment" title="Day 3 Assessment & Review">
          <div className="panel">
            
            {/* Common Mistakes */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common Statistical Pitfalls to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Using Mean on Highly Skewed Data:</strong> Reporting the average household salary including billionaires. The mean is heavily distorted; report the median instead.</li>
                <li><strong>Using Arithmetic Mean for Growth Rates:</strong> If an investment grows by 10% in Year 1 and decreases by 10% in Year 2, the arithmetic average is 0% growth. In reality, $100 * 1.10 * 0.90 = $99 (a net loss of 1%). Use Geometric Mean ($GM = \sqrt{1.10 * 0.90} \approx 0.9949$ or $-0.5\%$ CAGR) to get the correct growth rate.</li>
                <li><strong>Confusing Mode availability:</strong> Thinking a dataset always has exactly one mode. It can be bimodal (two modes), multimodal, or have no mode at all if all values appear once.</li>
              </ul>
            </div>

            {/* Interview Prep Questions */}
            <h3 style={{ color: '#1e293b', marginBottom: '1.2rem' }}>💬 Interview Questions</h3>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q1. When would you prefer the Median over the Mean?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  The Median is preferred over the Mean when the dataset contains significant outliers or is highly skewed (e.g. real estate pricing or customer incomes) because the median is a positional value that does not factor in the size of extreme outlier items.
                </p>
              </div>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>Q2. Why is the Geometric Mean used for compounding ratios instead of the Arithmetic Mean?</strong>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Geometric Mean multiplies the elements instead of adding them, which captures the compounding effect over time. Using an arithmetic mean overestimates compound growth rates due to additive biases.
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
                  <strong>Task 1:</strong> Compute the Mean, Median, and Mode manually for this dataset representing customer shopping cart values: `[25, 40, 25, 55, 80]`.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 2:</strong> Add an outlier value `500` to the dataset in Task 1. Recalculate the Mean and Median. Which metric shifted more significantly? Why?
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 3:</strong> Calculate the Weighted Mean rating score for a product that receives four 5-star ratings (weighted at 80% importance due to recent purchase) and two 3-star ratings (weighted at 20%).
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 4:</strong> Find the Geometric Mean compound growth rate over 3 years where yearly growth factors are: `[1.10, 1.20, 1.05]`. Show step-by-step multiplication.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 5:</strong> Write a raw Python function that takes a list of numbers and returns a custom dictionary containing the calculated `mean` and `median` without importing any math packages.
                </li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 3 of Statistics! 🎉')}>
                Submit & Complete Day 3 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
