import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, PieChart
} from 'lucide-react';
import MatplotlibAIPlayground from '../../components/MatplotlibAIPlayground';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#f97316', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code }) => (
  <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#e1e4e8', overflowX: 'auto' }}>
    <pre style={{ margin: 0 }}>{code}</pre>
  </div>
);

export default function MatplotlibDay3({ activeTab, onNavigate, openAITutor }) {
  const day3Presets = [
    {
      name: 'plot_hist_distribution',
      label: 'Histogram Bins',
      code: `import matplotlib.pyplot as plt\n\nscores = [55, 62, 75, 88, 92, 79, 81, 68, 90, 85, 77]\n\n# Configure histogram with 5 bins\nplt.hist(scores, bins=5, color='skyblue', edgecolor='black')\nplt.title('Exam Scores Distribution')\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Frequency distribution histogram rendered with custom bins]`
    },
    {
      name: 'plot_pie_explode',
      label: 'Pie Explode Slice',
      code: `import matplotlib.pyplot as plt\n\nshares = [45, 30, 25]\nlabels = ['Apple', 'Samsung', 'Google']\n\n# Explode the Apple slice\nplt.pie(shares, labels=labels, explode=[0.1, 0, 0], autopct='%1.1f%%', shadow=True)\nplt.title('Smartphones Market Share')\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Pie chart rendered with explode offsets and shadow depth]`
    },
    {
      name: 'plot_box_outliers',
      label: 'Box Plot Outliers',
      code: `import matplotlib.pyplot as plt\n\nsalaries = [50, 52, 55, 58, 62, 120] # 120 is an outlier\nplt.boxplot(salaries)\nplt.title('Salary Distribution Spread')\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Statistical box-and-whisker plot created with outliers identified]`
    }
  ];

  const day3Challenges = [
    {
      id: 'ch3_histogram',
      title: '1. Plot Score Histogram',
      desc: 'Use plt.hist(scores, bins=10) to map the continuous exam metrics.',
      hint: 'Call plt.hist(scores, bins=10) with the target dataset and bins.',
    },
    {
      id: 'ch3_boxplot',
      title: '2. Render Salary Box Plot',
      desc: 'Use plt.boxplot(salaries) to check for distribution outliers.',
      hint: 'Call plt.boxplot(salaries) to plot distribution spreads.',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import matplotlib.pyplot as plt

exam_scores = [55, 62, 70, 78, 85, 88, 92, 95, 68, 73, 81, 90]

# Write scores histogram code:
plt.figure(figsize=(6, 4))
plt.hist(exam_scores, bins=10, color='orange', edgecolor='black')
plt.title('Student Score Distribution')
plt.xlabel('Score Range')
plt.ylabel('Frequency')
plt.grid(True)
plt.show()`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);
  const [renderedPlot, setRenderedPlot] = useState(null);

  const handleContinue = (nextTabId) => {
    onNavigate('matplotlib_day3', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Running Day 3 distribution compiler...\n');
    setRenderedPlot(null);
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import matplotlib.pyplot as plt') || aiActivityCode.includes('import matplotlib');
      const hasHist = aiActivityCode.includes('plt.hist(') || aiActivityCode.includes('.hist(');
      const hasBins = aiActivityCode.includes('bins=10') || aiActivityCode.includes('bins = 10');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: Pyplot import missing.');
        return;
      }
      if (!hasHist) {
        setAiActivityConsole(p => p + 'DataValidationError: Histogram function (plt.hist) missing.');
        return;
      }
      if (!hasBins) {
        setAiActivityConsole(p => p + 'ValueError: Assignment specifies bins=10 to group the scores.');
        return;
      }

      setAiActivityConsole(
        `>>> Canvas successfully compiled!\nHistogram Generated:\n[Figure size 6x4 with 1 Axes]\nAxes bin count: 10\nDistribution range: [55, 95]\n\n✅ AI Validation: Exam scores frequency distribution mapped successfully!`
      );
      setAiActivityPassed(true);
      setRenderedPlot('histogram');
    }, 600);
  };

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

  const quizQuestions = [
    {
      id: 'q1',
      q: 'When is a histogram preferred over a bar chart?',
      opts: [
        'To compare categories.',
        'To visualize frequency distributions of a continuous numerical variable.',
        'To show cumulative timelines.',
        'To map part-to-whole relationships.'
      ],
      ans: 1,
      exp: 'Bar charts compare categorical indicators. Histograms show frequencies of continuous values grouped in bins.'
    },
    {
      id: 'q2',
      q: 'Which argument in plt.pie() offsets a specific slice outwards from the center?',
      opts: ['offset', 'explode', 'pull', 'detach'],
      ans: 1,
      exp: '`explode` accepts a list of offset distances (e.g. `[0.1, 0, 0]`) to emphasize slices.'
    },
    {
      id: 'q3',
      q: 'Which metrics does a Box Plot display to describe a distribution spread?',
      opts: [
        'Only mean and standard deviation.',
        'Only minimum and maximum values.',
        'The 5-number summary (min, Q1, median, Q3, max) and outliers.',
        'Cumulative area slices.'
      ],
      ans: 2,
      exp: 'Box plots display medians, interquartile ranges (Q1/Q3), whiskers boundaries (min/max), and isolated outliers.'
    },
    {
      id: 'q4',
      q: 'Which function is used to create cumulative area stack plots?',
      opts: ['plt.area()', 'plt.stackplot()', 'plt.area_stack()', 'plt.plot_area()'],
      ans: 1,
      exp: '`plt.stackplot()` stacks multiple area segments on top of each other to show cumulative totals.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'distributions' && (
        <Section eyebrow="Day 3 • Distribution Charts" title="Histograms & Pie Charts">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Today we focus on mapping distribution spreads! Use <strong>Histograms</strong> to identify continuous intervals density, and <strong>Pie/Donut Charts</strong> to present category proportions. Let's analyze when to select each visual.
                </span>
              </div>
            </div>

            {/* Section 1: Histogram */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Histograms (Bins & Frequency Distributions)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                A histogram groups continuous numerical data points into intervals called <strong>bins</strong> and plots the frequency count of values falling into each bin.
              </p>

              <SyntaxHighlighter code={`# Plot student scores using 10 equal bins\nplt.hist(exam_scores, bins=10, color='skyblue', edgecolor='black')`} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>👍 Advantages:</strong> Shows data skewness, spread, modes, and outliers across continuous data ranges.
                </div>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>⚠️ Limitations:</strong> Hard to compare multiple distributions; sensitive to chosen bins count.
                </div>
              </div>
              <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                <strong>Real-World Application:</strong> Mapping employee age distribution ranges, sensor readings spread, or academic score populations.
              </p>
            </div>

            {/* Section 2: Pie & Donut Charts */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Pie Charts & Donut Charts (Explode, Shadow)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Pie charts show static percentage shares of categorical segments. Use parameters like <code>explode</code> to offset slices, and <code>shadow=True</code> for depth.
              </p>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
                <strong>How to create a Donut Chart:</strong> Donut charts are created by plotting a pie chart and adding a centered circle patch matching the background color:
                <SyntaxHighlighter code={`plt.pie(sizes, labels=labels)\n\n# Create a center circle patch\ncentre_circle = plt.Circle((0,0), 0.70, fc='white')\nfig = plt.gcf()\nfig.gca().add_artist(centre_circle)`} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>👍 Advantages:</strong> Highly intuitive; excellent for illustrating part-to-whole market ratios.
                </div>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>⚠️ Limitations:</strong> Confusing if categories exceed 5; hard to compare slices of similar area sizes.
                </div>
              </div>
              <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                <strong>Real-World Application:</strong> Plotting market share percentages, budget category distributions, or survey voting ratios.
              </p>
            </div>

            <div className="flex justify-end" style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('statistical')}>
                Continue to Box & Area Plots →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'statistical' && (
        <Section eyebrow="Day 3 • Statistical Analysis" title="Box Plots, Area Plots & Error Bars">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Let's learn how to plot statistical spreads. <strong>Box Plots</strong> show distribution summary boundaries, <strong>Error Bars</strong> map confidence uncertainties, and <strong>Area/Stack Plots</strong> track category totals.
                </span>
              </div>
            </div>

            {/* Section 1: Box Plots */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Box Plots (Spread & Outliers)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Box plots represent the 5-number summary (minimum, first quartile Q1, median, third quartile Q3, and maximum). Outliers are shown as individual points.
              </p>
              <SyntaxHighlighter code={`plt.boxplot(salaries)`} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>👍 Advantages:</strong> Highlights statistical medians and outliers clearly across categories.
                </div>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>⚠️ Limitations:</strong> Hides underlying distribution shapes (e.g. bimodal ranges).
                </div>
              </div>
              <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                <strong>Real-World Application:</strong> Auditing employee salary distributions, identifying network latency outliers, or testing manufacturing tolerances.
              </p>
            </div>

            {/* Section 2: Error Bar Plots */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Error Bar Plots
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Error bars visualize measurement uncertainties and standard deviations associated with coordinates.
              </p>
              <SyntaxHighlighter code={`# yerr maps uncertainty range values\nplt.errorbar(x, y, yerr=measurement_errors, fmt='-o')`} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>👍 Advantages:</strong> Shows data reliability and confidence margins visually.
                </div>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>⚠️ Limitations:</strong> Crowds charts if coordinate values are dense.
                </div>
              </div>
              <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                <strong>Real-World Application:</strong> Displaying scientific experiment deviations, survey confidence limits, or weather forecast spreads.
              </p>
            </div>

            {/* Section 3: Stack Plots */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                3. Area Charts (Stack Plots)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Stack plots stack multiple area charts on top of each other, allowing us to visualize how category proportions contribute to a cumulative total over time.
              </p>
              <SyntaxHighlighter code={`plt.stackplot(years, category_A, category_B, labels=['Department A', 'Department B'])`} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>👍 Advantages:</strong> Shows how cumulative totals are split among categories.
                </div>
                <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  <strong style={{ color: '#1e293b' }}>⚠️ Limitations:</strong> Hard to read values for middle categories because their baselines stack.
                </div>
              </div>
              <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                <strong>Real-World Application:</strong> Tracking total website traffic source proportions, cumulative energy production splits, or category budget expenditures.
              </p>
            </div>

            <div className="flex justify-between" style={{ marginTop: '1rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('distributions')}>
                ← Back to Histograms
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 3 • AI Studio" title="AI Activity: Analyze Student Score Distribution">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Sift Exam Statistics</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Write a histogram script to analyze the frequency distribution of exam scores using 10 bins.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Group the continuous <code>exam_scores</code> data.</li>
                <li>Call <code>plt.hist()</code> with <code>bins=10</code>.</li>
                <li>Set edge outlines to <code>'black'</code> and background colors to <code>'orange'</code>, print and validate.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  plot_scores_distribution.py
                </div>
                <textarea
                  value={aiActivityCode}
                  onChange={(e) => setAiActivityCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0f172a',
                    color: '#fdba74',
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.88rem',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    lineHeight: 1.6
                  }}
                />
                <div style={{ padding: '8px 12px', background: '#1e293b', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleRunAIActivity} style={{ background: '#f97316', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                    Validate Code
                  </button>
                </div>
              </div>

              {/* Console output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', border: '1px solid #334155' }}>
                  {aiActivityConsole || 'Console compiler idle... Click Validate Code to execute.'}
                </div>

                {renderedPlot && (
                  <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Eye size={12} color="#6366f1" />
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>GRAPH PREVIEW (plt.show()):</span>
                    </div>
                    <div style={{ padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
                      <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                        <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Student Score Distribution</text>
                        <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
                        <rect x="50" y="130" width="20" height="20" fill="orange" stroke="black" />
                        <rect x="72" y="110" width="20" height="40" fill="orange" stroke="black" />
                        <rect x="94" y="80" width="20" height="70" fill="orange" stroke="black" />
                        <rect x="116" y="50" width="20" height="100" fill="orange" stroke="black" />
                        <rect x="138" y="40" width="20" height="110" fill="orange" stroke="black" />
                        <rect x="160" y="60" width="20" height="90" fill="orange" stroke="black" />
                        <rect x="182" y="90" width="20" height="60" fill="orange" stroke="black" />
                        <rect x="204" y="120" width="20" height="30" fill="orange" stroke="black" />
                        <rect x="226" y="135" width="20" height="15" fill="orange" stroke="black" />
                        <text x="140" y="168" textAnchor="middle" fontSize="9" fill="#475569">Score Range</text>
                        <text x="12" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-90 12 90)">Frequency</text>
                      </svg>
                    </div>
                  </div>
                )}

                {aiActivityPassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Milestone Cleared!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>Exam score histogram validated and compiled successfully.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('statistical')}>
                ← Back to Statistical
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 3 • Practical Lab" title="Distribution & Box Plotting Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct matplotlib plotting syntax.
            </p>
            <MatplotlibAIPlayground dayId="day3" presets={day3Presets} challenges={day3Challenges} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('activity')}>
                ← Back to AI Activity
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Quiz →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 3 • Evaluation" title="Day 3 Assessment Quiz">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Test Your Understanding</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#f97316', fontWeight: 'bold' }}>Q{idx + 1}.</span> {q.q}
                  </h4>
                  <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {q.opts.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[q.id] === oIdx;
                      const isChecked = checkedQuestions[q.id];
                      const isCorrect = q.ans === oIdx;

                      let btnStyle = {
                        width: '100%',
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'all 0.2s'
                      };

                      if (isSelected) {
                        btnStyle.background = '#fff7ed';
                        btnStyle.borderColor = '#fdba74';
                        btnStyle.color = '#c2410c';
                      }

                      if (isChecked) {
                        if (isCorrect) {
                          btnStyle.background = '#dcfce7';
                          btnStyle.borderColor = '#86efac';
                          btnStyle.color = '#15803d';
                        } else if (isSelected) {
                          btnStyle.background = '#fee2e2';
                          btnStyle.borderColor = '#fca5a5';
                          btnStyle.color = '#b91c1c';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => !isChecked && handleSelectOption(q.id, oIdx)}
                          style={btnStyle}
                          disabled={isChecked}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!checkedQuestions[q.id] && selectedAnswers[q.id] !== undefined && (
                    <button
                      onClick={() => handleCheckQuestion(q.id)}
                      style={{
                        marginTop: '1rem',
                        background: '#1e293b',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 16px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Verify Answer
                    </button>
                  )}

                  {checkedQuestions[q.id] && (
                    <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem', color: '#475569', display: 'flex', gap: '6px' }}>
                      <Sparkles size={16} color="#f97316" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Tutor Explanation:</strong> {q.exp}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff7ed', border: '1px solid #ffedd5', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#9a3412' }}>Submit Your Assessment</h3>
              <p style={{ color: '#c2410c', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Verify all answers above before computing final grading scores.
              </p>
              
              <button className="btn btn-primary" onClick={checkFinalScore} style={{ background: '#f97316', borderColor: '#f97316' }}>
                Calculate Grading Score
              </button>

              {score !== null && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c2410c', display: 'block' }}>{score} / 4</span>
                  <span style={{ fontSize: '0.9rem', color: '#9a3412', fontWeight: 600 }}>
                    {score === 4 ? '🏆 Outstanding! Perfect score!' : score >= 2 ? '👍 Good job! Review the explanations to refine your knowledge.' : '⚠️ Keep practicing! Ask the AI Tutor for assistance.'}
                  </span>
                </div>
              )}
            </div>

            {/* Homework Assignment */}
            <div style={{ marginTop: '2.5rem', background: '#f8fafc', border: '1px dashed #64748b', padding: '1.5rem', borderRadius: '12px', width: '100%' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                <FileText size={20} color="#f97316" /> 📝 Homework Assignment
              </h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Analyze monthly weather datasets. Build a pie chart showing market shares of top tech companies using explode slice effects and soft gradient colors.
              </p>
            </div>

            {/* Lesson Rating */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%' }}>
              <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>⭐ Rate this Lesson:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setLessonRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.8rem',
                      cursor: 'pointer',
                      color: star <= lessonRating ? '#f59e0b' : '#cbd5e1',
                      transition: 'color 0.2s'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              {lessonRating > 0 && (
                <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                  Thank you! You rated this lesson {lessonRating}/5 stars.
                </span>
              )}
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
