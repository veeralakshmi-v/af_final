import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Target, Code, FileText, CheckCircle, HelpCircle, Bot, AlertTriangle, Sparkles, Terminal } from 'lucide-react';
import edaImg from '../../assets/eda_process_flow.png';

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

export default function StatsDay5({ activeTab, onNavigate, openAITutor }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);

  // Playground Dataset States
  const rawDataset = [
    { id: 1, name: "Alice", age: 25, purchase: 1500, state: "MH" },
    { id: 2, name: "Bob", age: null, purchase: 3200, state: "DL" },
    { id: 3, name: "Charlie", age: 31, purchase: 25000, state: "MH" }, // outlier purchase
    { id: 4, name: "Alice", age: 25, purchase: 1500, state: "MH" },    // duplicate
    { id: 5, name: "Diana", age: 28, purchase: null, state: "DL" },
    { id: 6, name: "Ethan", age: 45, purchase: 4200, state: "KA" }
  ];

  const [edaStep, setEdaStep] = useState(0); // 0=raw, 1=cleaned, 2=univariate, 3=bivariate
  const [cleanedData, setCleanedData] = useState([]);
  const [stats, setStats] = useState(null);

  const runCleaning = () => {
    // 1. Drop duplicates (Row 4 is duplicate of Row 1)
    const unique = [
      { id: 1, name: "Alice", age: 25, purchase: 1500, state: "MH" },
      { id: 2, name: "Bob", age: 32, purchase: 3200, state: "DL" },     // Age filled with mean (25+31+28+45)/4 = 32
      { id: 3, name: "Charlie", age: 31, purchase: 25000, state: "MH" },
      { id: 5, name: "Diana", age: 28, purchase: 7000, state: "DL" },    // Purchase filled with median (1500, 3200, 4200, 25000) -> 3700 or mean = 7000
      { id: 6, name: "Ethan", age: 45, purchase: 4200, state: "KA" }
    ];
    setCleanedData(unique);

    // Calculate basic summary statistics for univariate tab
    const purchaseValues = unique.map(d => d.purchase);
    const sum = purchaseValues.reduce((a, b) => a + b, 0);
    const mean = sum / purchaseValues.length;
    const sorted = [...purchaseValues].sort((a,b) => a-b);
    const median = sorted[Math.floor(sorted.length/2)];

    setStats({
      mean,
      median,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      duplicatesDropped: 1,
      nullsFilled: 2
    });

    setEdaStep(1);
  };

  const handleContinue = (nextTabId) => {
    onNavigate('stats_day5', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      id: 1,
      q: "What is the primary goal of Exploratory Data Analysis (EDA)?",
      opts: [
        "To write production database schemas.",
        "To understand the data, identify patterns, detect anomalies, and test assumptions before building models.",
        "To perform deep learning training epochs.",
        "To format CSV files into JSON files."
      ],
      ans: 1,
      exp: "EDA is the critical initial step of analyzing datasets to summarize their main characteristics, often using visual methods, to guide all subsequent modeling decisions."
    },
    {
      id: 2,
      q: "Which analysis level involves investigating the relationship between exactly two variables?",
      opts: [
        "Univariate Analysis",
        "Bivariate Analysis",
        "Multivariate Analysis",
        "Null Value Imputation"
      ],
      ans: 1,
      exp: "Bivariate Analysis (such as scatter plots or correlation tables) studies the statistical relationship between exactly two attributes (e.g. advertising spend vs. monthly sales)."
    },
    {
      id: 3,
      q: "What is the danger of blindly dropping all rows that contain missing (null) values?",
      opts: [
        "Vite will throw a syntax compilation error.",
        "It can introduce significant bias and severely reduce the sample size, leading to inaccurate conclusions.",
        "It converts all integers to floating-point numbers.",
        "It removes database index headers."
      ],
      ans: 1,
      exp: "Dropping all null rows (listwise deletion) risks losing valuable statistical power and introduces bias if the missing data is not completely random."
    },
    {
      id: 4,
      q: "Which chart is best suited for Univariate Analysis of a continuous numerical variable?",
      opts: [
        "Scatter Plot",
        "Heatmap",
        "Histogram",
        "Stacked Bar Chart"
      ],
      ans: 2,
      exp: "A histogram is ideal for univariate numerical analysis because it displays the distribution shape, center, and spread of a single continuous variable."
    },
    {
      id: 5,
      q: "What is an Outlier in a dataset?",
      opts: [
        "A column that sits outside the main SQL table join.",
        "A data point that diverges significantly from the rest of the observations.",
        "A duplicate row of database records.",
        "A text file that failed to import into Python."
      ],
      ans: 1,
      exp: "An outlier is an extreme observation that lies an abnormal distance from other values. Outliers require careful investigation during EDA to determine if they represent data errors or legitimate extreme phenomena."
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
        <Section key="theory" id="theory" eyebrow="Day 5 • Data Discovery" title="Exploratory Data Analysis (EDA)">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              In Data Analytics, after importing a dataset, you do not immediately run machine learning models. First, you must conduct **Exploratory Data Analysis (EDA)**. Coined by John Tukey, EDA is the practice of investigating datasets to detect distributions, spot anomalies (outliers), clean records, and test hypothesis assumptions.
            </p>

            <ZoomableImage src={edaImg} alt="EDA Process Flow Diagram" />

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>🧹 Data Cleaning Foundations</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Real-world data is messy. Before analyzing patterns, you must perform data scrubbing:
                </p>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, marginTop: '0.5rem' }}>
                  <li><strong>Missing Values (Nulls):</strong> Empty values in cells. You can handle them by dropping rows (if minimal) or imputing them (replacing with Mean, Median, or Mode).</li>
                  <li><strong>Duplicate Records:</strong> Redundant identical observations that artificially skew statistical weights. Always identify and drop duplicate entries.</li>
                  <li><strong>Outliers:</strong> Extreme data points caused by instrumentation error or real-world variance. Standard detection techniques include standard scores (Z-score &gt; 3) or the IQR rule (1.5 × IQR).</li>
                </ul>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#db2777', fontSize: '1.25rem' }}>💡 Why is EDA Essential?</h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  EDA serves as the sanity check of data science. Without EDA, you run the risk of **Garbage In, Garbage Out**. Running algorithms on uncleaned datasets containing duplicates, skewed outlier features, and missing code profiles produces inaccurate and misleading business predictions.
                </p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('analysis')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is the difference between data cleaning and data preprocessing?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ANALYSIS TAB */}
      {activeTab === 'analysis' && (
        <Section key="analysis" id="analysis" eyebrow="Levels of EDA" title="Univariate, Bivariate & Multivariate Analysis">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              During EDA, we analyze columns at different levels of complexity depending on how many variables we inspect simultaneously:
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
              
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #db2777' }}>
                <strong style={{ color: '#0f172a', fontSize: '1.1rem' }}>📈 1. Univariate Analysis (Single Variable)</strong>
                <p style={{ color: '#475569', margin: '0.3rem 0 0 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Investigating one column at a time to check its summary statistics (mean, variance) and profile distributions.
                  <br /><strong>Tools:</strong> Histograms (numerical), bar charts (categorical), box plots.
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <strong style={{ color: '#0f172a', fontSize: '1.1rem' }}>📊 2. Bivariate Analysis (Two Variables)</strong>
                <p style={{ color: '#475569', margin: '0.3rem 0 0 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Analyzing the relationship between two variables to detect correlation or patterns.
                  <br /><strong>Tools:</strong> Scatter plots (numerical vs. numerical), box plots grouped by categories (numerical vs. categorical), cross-tabulation tables.
                </p>
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <strong style={{ color: '#0f172a', fontSize: '1.1rem' }}>🕸️ 3. Multivariate Analysis (Multiple Variables)</strong>
                <p style={{ color: '#475569', margin: '0.3rem 0 0 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Checking interactions among three or more columns simultaneously.
                  <br /><strong>Tools:</strong> Correlation matrix heatmaps, pairplots, 3D scatter plots.
                </p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('playground')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("Show me how to construct a correlation heatmap matrix using Python.")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PLAYGROUND TAB */}
      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Interactive Simulator" title="EDA & Data Cleaning Playground">
          <div className="panel">
            <p style={{ marginBottom: '2rem', color: '#475569', lineHeight: 1.6 }}>
              See how EDA and data cleaning works in real-time. Below is a raw customer transaction dataset containing missing ages (`null`), missing sales, duplicate entries, and outliers. Follow the steps below to clean and inspect the data.
            </p>

            {/* RAW DATASET TAB PANEL */}
            <div style={{ background: '#fff', border: '1.5px dashed #cbd5e1', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0' }}>📋 Raw Input Table (Messy Data)</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '8px' }}>ID</th>
                    <th style={{ padding: '8px' }}>Name</th>
                    <th style={{ padding: '8px' }}>Age</th>
                    <th style={{ padding: '8px' }}>Purchase (₹)</th>
                    <th style={{ padding: '8px' }}>State</th>
                    <th style={{ padding: '8px' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {rawDataset.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: row.id === 4 ? '#fffbeb' : row.purchase > 10000 ? '#fef2f2' : '#fff' }}>
                      <td style={{ padding: '8px' }}>{row.id}</td>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>{row.name}</td>
                      <td style={{ padding: '8px', color: row.age === null ? '#dc2626' : '#0f172a' }}>{row.age === null ? 'NaN' : row.age}</td>
                      <td style={{ padding: '8px', color: row.purchase === null ? '#dc2626' : '#0f172a', fontWeight: row.purchase > 10000 ? 'bold' : 'normal' }}>
                        {row.purchase === null ? 'NaN' : `₹${row.purchase.toLocaleString()}`}
                      </td>
                      <td style={{ padding: '8px' }}>{row.state}</td>
                      <td style={{ padding: '8px', fontSize: '0.78rem', color: '#64748b' }}>
                        {row.id === 4 ? '⚠️ Duplicate of row 1' : row.age === null ? '⚠️ Missing Age' : row.purchase === null ? '⚠️ Missing Purchase' : row.purchase > 10000 ? '⚠️ Outlier (High)' : 'Clean'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ACTION TRIGGERS */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={runCleaning}>
                🧹 Step 1: Clean & Impute Data
              </button>
              {edaStep >= 1 && (
                <button className="btn btn-outline" onClick={() => setEdaStep(2)}>
                  📊 Step 2: Univariate Stats
                </button>
              )}
              {edaStep >= 2 && (
                <button className="btn btn-outline" onClick={() => setEdaStep(3)}>
                  🕸️ Step 3: Bivariate Insights
                </button>
              )}
            </div>

            {/* DISPLAY CLEANED DATA */}
            {edaStep >= 1 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <h4 style={{ color: '#166534', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} /> Cleaned Table (After Imputation & Deduplication)
                </h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left', marginBottom: '1.5rem', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '8px' }}>ID</th>
                      <th style={{ padding: '8px' }}>Name</th>
                      <th style={{ padding: '8px' }}>Age</th>
                      <th style={{ padding: '8px' }}>Purchase (₹)</th>
                      <th style={{ padding: '8px' }}>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cleanedData.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px' }}>{row.id}</td>
                        <td style={{ padding: '8px', fontWeight: 'bold' }}>{row.name}</td>
                        <td style={{ padding: '8px' }}>{row.age}</td>
                        <td style={{ padding: '8px' }}>₹{row.purchase.toLocaleString()}</td>
                        <td style={{ padding: '8px' }}>{row.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem', color: '#166534' }}>
                  <p style={{ margin: 0 }}><strong>Deduplication:</strong> Dropped 1 duplicate row.</p>
                  <p style={{ margin: 0 }}><strong>Age Imputation:</strong> Replaced Bob's age with mean (32).</p>
                  <p style={{ margin: 0 }}><strong>Purchase Imputation:</strong> Filled Diana's empty purchase value.</p>
                </div>
              </motion.div>
            )}

            {/* UNIVARIATE STATS */}
            {edaStep >= 2 && stats && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <h4 style={{ color: '#1e40af', margin: '0 0 1rem 0' }}>📈 Univariate Descriptive Summary Statistics (Purchases)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Mean Purchase:</span>
                    <h5 style={{ margin: 0, fontSize: '1.1rem', color: '#1e40af', fontWeight: 'bold' }}>₹{stats.mean.toLocaleString()}</h5>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Median Purchase:</span>
                    <h5 style={{ margin: 0, fontSize: '1.1rem', color: '#1e40af', fontWeight: 'bold' }}>₹{stats.median.toLocaleString()}</h5>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Min Purchase:</span>
                    <h5 style={{ margin: 0, fontSize: '1.1rem', color: '#1e40af', fontWeight: 'bold' }}>₹{stats.min.toLocaleString()}</h5>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Max Purchase:</span>
                    <h5 style={{ margin: 0, fontSize: '1.1rem', color: '#1e40af', fontWeight: 'bold' }}>₹{stats.max.toLocaleString()}</h5>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#1e40af', margin: 0 }}>
                  <strong>Insight:</strong> Note how the Mean (₹7,620) is much higher than the Median (₹4,200). This indicates a positive skew caused by the outlier purchase of ₹25,000 (Charlie).
                </p>
              </motion.div>
            )}

            {/* BIVARIATE INSIGHTS */}
            {edaStep >= 3 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <h4 style={{ color: '#6b21a8', margin: '0 0 1rem 0' }}>📊 Bivariate Analysis: Purchases by State</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#fff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold' }}>Maharashtra (MH): Average Purchase ₹13,250 (2 Customers)</span>
                      <span>100% Share</span>
                    </div>
                    <div style={{ height: '10px', background: '#e9d5ff', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', background: '#8b5cf6' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold' }}>Delhi (DL): Average Purchase ₹5,100 (2 Customers)</span>
                      <span>38.5% Share</span>
                    </div>
                    <div style={{ height: '10px', background: '#e9d5ff', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '38.5%', height: '100%', background: '#8b5cf6' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold' }}>Karnataka (KA): Average Purchase ₹4,200 (1 Customer)</span>
                      <span>31.7% Share</span>
                    </div>
                    <div style={{ height: '10px', background: '#e9d5ff', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: '31.7%', height: '100%', background: '#8b5cf6' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('programming')}>Continue (+15 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What are duplicate rows, and how do we resolve them in e-commerce database logs?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* PROGRAMMING & WALKTHROUGH TAB */}
      {activeTab === 'programming' && (
        <Section key="programming" id="programming" eyebrow="Hands-On Programming" title="Python Code & Real Dataset Walkthrough">
          <div className="panel">
            
            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🧹 Python Data Cleaning & EDA Script</h3>
            <p style={{ marginBottom: '1.2rem', color: '#475569', lineHeight: 1.6 }}>
              Here is a Python script demonstrating how to check for duplicate records, handle missing entries, and calculate summary statistics:
            </p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} /> customer_eda.py
                </span>
                <span style={{ color: '#10b981', fontSize: '0.75rem', border: '1px solid #065f46', padding: '2px 8px', borderRadius: '12px' }}>
                  Python Code
                </span>
              </div>
              <SyntaxHighlighter code={`# 1. Define customer dataset with missing values (None) and duplicates
dataset = [
    {"id": 1, "name": "Alice", "age": 25, "purchase": 1500},
    {"id": 2, "name": "Bob", "age": None, "purchase": 3200},
    {"id": 3, "name": "Charlie", "age": 31, "purchase": 25000},
    {"id": 1, "name": "Alice", "age": 25, "purchase": 1500},  # Duplicate Row
    {"id": 5, "name": "Diana", "age": 28, "purchase": None}
]

# 2. Step 1: Remove Duplicate Rows
unique_dataset = []
seen_ids = set()
for row in dataset:
    if row["id"] not in seen_ids:
        unique_dataset.append(row)
        seen_ids.add(row["id"])

print(f"Dataset count after deduplication: {len(unique_dataset)}")

# 3. Step 2: Handle Missing (Null) Values
# Impute Age with mean of known values (25 + 31 + 28 = 84 / 3 = 28)
known_ages = [r["age"] for r in unique_dataset if r["age"] is not None]
mean_age = sum(known_ages) / len(known_ages)

# Impute Purchase with median of known values (1500, 3200, 25000 -> median is 3200)
known_purchases = sorted([r["purchase"] for r in unique_dataset if r["purchase"] is not None])
median_purchase = known_purchases[len(known_purchases) // 2]

for r in unique_dataset:
    if r["age"] is None:
        r["age"] = mean_age
    if r["purchase"] is None:
        r["purchase"] = median_purchase

# 4. Summary Output
print(f"Cleaned Records: {unique_dataset}")`} />
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} /> Console Output
              </h4>
              <pre style={{ margin: 0, color: '#1e40af', fontFamily: 'monospace', fontSize: '0.88rem' }}>
{`Dataset count after deduplication: 4
Cleaned Records: [
  {'id': 1, 'name': 'Alice', 'age': 25, 'purchase': 1500}, 
  {'id': 2, 'name': 'Bob', 'age': 28.0, 'purchase': 3200}, 
  {'id': 3, 'name': 'Charlie', 'age': 31, 'purchase': 25000}, 
  {'id': 5, 'name': 'Diana', 'age': 28, 'purchase': 3200}
]`}
              </pre>
            </div>

            {/* Mini Project Instructions */}
            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#b45309', margin: '0 0 0.5rem 0', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} /> Stats Course Mini Project: Churn EDA
              </h3>
              <p style={{ color: '#78350f', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                <strong>Objective:</strong> Download a churn tracking file containing logs of 1,000 customers. Conduct data scrubbing (impute missing subscription lengths with the median) and perform bivariate analysis to determine if customers with shorter contract lengths churn more frequently. Draft a 1-page insights deck.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777' }} onClick={() => handleContinue('assessment')}>Continue (+10 XP)</button>
              <button className="btn btn-outline" onClick={() => openAITutor("What is mean vs. median imputation and when should we use which?")}>
                <Bot size={16} style={{ marginRight: '8px' }} /> Ask AI Tutor
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <Section key="assessment" id="assessment" eyebrow="Day 5 Assessment" title="Day 5 Assessment & Review">
          <div className="panel">
            
            {/* Common Mistakes */}
            <div style={{ background: '#fff5f5', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fed7d7', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#c53030', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
                <AlertTriangle size={20} /> Common EDA Traps to Avoid
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#742a2a', lineHeight: 1.8, margin: 0 }}>
                <li><strong>Imputing Outlier Fields with Mean:</strong> If a column contains severe outliers (like house prices), filling null cells with the Mean pulls the values artificially high. Fill using the **Median** instead!</li>
                <li><strong>Skipping Duplicate Checks:</strong> Overlooking redundant records, which inflates total sample size ($n$) and biases calculation parameters.</li>
                <li><strong>Mistaking Correlation for Causation:</strong> Assuming that because Bivariate Analysis shows a high positive correlation between two variables, one causes the other. (E.g. ice cream sales and sunburns correlate, but both are caused by a confounding third variable: sunny weather).</li>
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
                Complete the following tasks to submit your Day 5 stats portfolio:
              </p>
              
              <ul style={{ color: '#831843', lineHeight: 1.8, margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 1:</strong> You have a product weights dataset: `[12.1, NaN, 12.5, 12.1, 14.8, NaN]`. Write down the steps to clean duplicates and impute NaNs using Mean.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 2:</strong> In Univariate Analysis, explain which plot is best suited for categorical data vs. continuous numerical data, and why.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 3:</strong> Explain how outliers affect Univariate statistics (Mean vs. Median). Outline one business case where keeping the outlier is more valuable than removing it.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 4:</strong> Write a Python script to find correlation between two lists representing advertising cost and revenue. Do not use external libraries.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Task 5:</strong> Write a short report explaining the difference between correlation and causation. Give a real-world analytics example of a confounding variable causing fake correlation.
                </li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" style={{ background: '#db2777', borderColor: '#db2777', width: '100%', fontWeight: 800 }} onClick={() => alert('Congratulations on completing Day 5 of Statistics! 🎉')}>
                Submit & Complete Day 5 🎉
              </button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
