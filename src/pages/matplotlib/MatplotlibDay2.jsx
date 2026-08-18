import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, BarChart2
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

export default function MatplotlibDay2({ activeTab, onNavigate, openAITutor }) {
  const day2Presets = [
    {
      name: 'plot_line_styles',
      label: 'Line Styles',
      code: `import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 15, 30]\n\n# Line markers and styles\nplt.plot(x, y, color='red', linestyle='--', marker='o', linewidth=2.5)\nplt.title('Styled Performance Line')\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Line plot rendered for student marks metrics]`
    },
    {
      name: 'plot_bar_sales',
      label: 'Vertical Bar Plot',
      code: `import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar']\nsales = [1200, 1500, 1100]\n\nplt.bar(months, sales, color='orange', edgecolor='black')\nplt.title('Monthly Sales Performance')\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Bar chart rendered for sales values]`
    },
    {
      name: 'plot_scatter_grades',
      label: 'Scatter Plot',
      code: `import matplotlib.pyplot as plt\n\nheight = [150, 160, 170, 180]\nweight = [55, 62, 70, 85]\n\nplt.scatter(height, weight, s=100, c='purple', alpha=0.8)\nplt.title('Height vs Weight scatter')\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Scatter distribution plot created matching markers/colors]`
    }
  ];

  const day2Challenges = [
    {
      id: 'ch2_bar_chart',
      title: '1. Build Vertical Bar',
      desc: 'Use plt.bar(months, sales) to visualize product sales metrics.',
      hint: 'Call plt.bar(months, sales) to render vertical bars.',
    },
    {
      id: 'ch2_scatter_plot',
      title: '2. Generate Scatter Plot',
      desc: 'Use plt.scatter(height, weight) to map body correlation measurements.',
      hint: 'Call plt.scatter(height, weight) to render coordinate dots.',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr']
sales = [12000, 15000, 18000, 22000]

# Write vertical bar plot code:
plt.figure(figsize=(6, 4))
plt.bar(months, sales, color='orange', edgecolor='black')
plt.title('Monthly Sales Revenue')
plt.xlabel('Months')
plt.ylabel('Revenue ($)')
plt.show()`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);
  const [renderedPlot, setRenderedPlot] = useState(null);

  const handleContinue = (nextTabId) => {
    onNavigate('matplotlib_day2', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Running Day 2 visualization validator...\n');
    setRenderedPlot(null);
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import matplotlib.pyplot as plt') || aiActivityCode.includes('import matplotlib');
      const hasBar = aiActivityCode.includes('plt.bar(') || aiActivityCode.includes('plt.barh(');
      const hasArgs = aiActivityCode.includes('months') && aiActivityCode.includes('sales');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: Missing pyplot imports.');
        return;
      }
      if (!hasBar) {
        setAiActivityConsole(p => p + 'DataValidationError: Bar plot function (plt.bar) not found in script.');
        return;
      }
      if (!hasArgs) {
        setAiActivityConsole(p => p + 'ValueError: Incorrect parameters passed. Make sure to chart months vs sales.');
        return;
      }

      setAiActivityConsole(
        `>>> Canvas successfully processed!\nBar Plot Generated:\n[Figure size 6x4 with 1 Axes]\nAxes bar count: 4\nColor: orange\nEdge: black\n\n✅ AI Validation: Monthly sales bar chart validated! Trends correctly mapped.`
      );
      setAiActivityPassed(true);
      setRenderedPlot('bar');
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
      q: 'Which argument in plt.plot() modifies the line outline style (e.g. dashed, dotted)?',
      opts: ['marker', 'linestyle', 'linewidth', 'ls_type'],
      ans: 1,
      exp: '`linestyle` (or short form `ls`) changes line patterns (e.g. "--" for dashed, ":" for dotted).'
    },
    {
      id: 'q2',
      q: 'Which function is used to create horizontal bar charts?',
      opts: ['plt.bar()', 'plt.barh()', 'plt.hbar()', 'plt.horizontal_bar()'],
      ans: 1,
      exp: '`plt.barh()` plots bars horizontally (X axis maps values, Y axis maps category strings).'
    },
    {
      id: 'q3',
      q: 'What parameter controls individual dot sizes in a scatter plot?',
      opts: ['size', 's', 'width', 'marker_size'],
      ans: 1,
      exp: 'The `s` parameter inside `plt.scatter()` controls dot area size in points squared.'
    },
    {
      id: 'q4',
      q: 'Which chart type is useful for displaying discrete values along baseline stems?',
      opts: ['Line Plot', 'Stem Plot', 'Bar Chart', 'Box Plot'],
      ans: 1,
      exp: 'Stem plots (`plt.stem()`) plot vertical lines from a baseline to coordinates, commonly used for digital/signal datasets.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'basic_charts' && (
        <Section eyebrow="Day 2 • Basic Charts" title="Line & Bar Chart Customizations">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Today we learn how to master custom <strong>Line Charts</strong> and <strong>Bar Charts</strong>. We will customize line patterns, choose markers, adjust line widths, and compare categorical counts side-by-side using vertical, horizontal, and grouped bar chart layouts.
                </span>
              </div>
            </div>

            {/* Section 1: Line Charts */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Line Charts (Single vs. Multiple Lines)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Line charts are best for displaying continuous sequences of numerical observations over regular intervals (like temperature trends or revenue over months).
              </p>
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <strong style={{ display: 'block', marginBottom: '4px', color: '#0f172a', fontSize: '0.9rem' }}>Syntax Parameters:</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  <li><code>color</code> / <code>c</code>: Set line colors (e.g. <code>'red'</code>, <code>'#f97316'</code>, <code>'blue'</code>).</li>
                  <li><code>linestyle</code> / <code>ls</code>: Pattern style (<code>'-'</code> solid, <code>'--'</code> dashed, <code>'-.'</code> dash-dot, <code>':'</code> dotted).</li>
                  <li><code>marker</code>: Shape marker (<code>'o'</code> circle, <code>'s'</code> square, <code>'^'</code> triangle, <code>'D'</code> diamond).</li>
                  <li><code>linewidth</code> / <code>lw</code>: Float value representing line thickness (e.g. <code>2.5</code>).</li>
                </ul>
              </div>

              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Single Line Example:</strong>
              <SyntaxHighlighter code={`plt.plot(months, sales, color='orange', linestyle='--', marker='o', linewidth=2.0)`} />

              <strong style={{ color: '#0f172a', display: 'block', marginTop: '1.2rem', marginBottom: '6px', fontSize: '0.9rem' }}>Multiple Lines Example:</strong>
              <SyntaxHighlighter code={`# Plot two lines simultaneously\nplt.plot(months, sales_A, label='Product A', color='blue', marker='s')\nplt.plot(months, sales_B, label='Product B', color='orange', marker='o')\nplt.legend()`} />
            </div>

            {/* Section 2: Bar Charts */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Bar Charts (Vertical, Horizontal, Grouped)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Bar charts display comparisons among discrete categories. The Y axis represents values, and the X axis represents categorical label strings.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>📊 Vertical: plt.bar()</strong>
                  <SyntaxHighlighter code={`plt.bar(months, sales, color='orange', edgecolor='black')`} />
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>📊 Horizontal: plt.barh()</strong>
                  <SyntaxHighlighter code={`plt.barh(months, sales, color='blue', edgecolor='black')`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>👥 Grouped Bar Charts (Multiple Categories Side-by-Side):</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                  To plot grouped bar charts, offset the X-axis coordinate positions of categories using NumPy arrays:
                </p>
                <SyntaxHighlighter code={`import numpy as np\n\nx = np.arange(len(months))\nwidth = 0.35  # width of the bars\n\nplt.bar(x - width/2, sales_A, width, label='Product A')\nplt.bar(x + width/2, sales_B, width, label='Product B')\nplt.xticks(x, months)\nplt.legend()`} />
              </div>
            </div>

            <div className="flex justify-end" style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('scatter_stem')}>
                Continue to Scatter & Stem →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'scatter_stem' && (
        <Section eyebrow="Day 2 • Scatter & Stem Plots" title="Visualizing Correlations & Digital Signals">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Let's explore correlation visualizations! <strong>Scatter Plots</strong> are perfect for highlighting relationships between two numerical variables (like height vs weight). We will also learn about <strong>Stem Plots</strong> which display discrete pulse patterns.
                </span>
              </div>
            </div>

            {/* Section 1: Scatter */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Scatter Plots (Marker Size & Colors)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                A scatter plot displays coordinate points representing pairs of continuous numerical data. You can control marker properties individually:
              </p>
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '4px', color: '#0f172a', fontSize: '0.9rem' }}>Customization Attributes:</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  <li><code>s</code>: Marker size. Can be a constant (e.g. <code>s=100</code>) or an array mapping sizes to observations.</li>
                  <li><code>c</code>: Marker color. Can be a constant color or a list of coordinates mapped to a color spectrum (colormap).</li>
                  <li><code>alpha</code>: Transparency intensity (e.g. <code>alpha=0.6</code> for overlapping points).</li>
                </ul>
              </div>

              <SyntaxHighlighter code={`plt.scatter(height, weight, s=120, c='purple', marker='o', alpha=0.7)`} />
            </div>

            {/* Section 2: Stem */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Stem Plots: plt.stem()
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Stem plots plot vertical lines extending from a baseline to coordinates, terminated by a marker. They are popular for illustrating discrete data signals:
              </p>
              <SyntaxHighlighter code={`# Plot discrete pulses\nplt.stem(x_points, y_points, linefmt='--', markerfmt='bo', basefmt='r-')`} />
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '1rem', fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                <strong>Parameter Details:</strong> <code>linefmt</code> styles the stems (vertical lines), <code>markerfmt</code> styles the endpoints, and <code>basefmt</code> configures the horizontal baseline.
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '1rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('basic_charts')}>
                ← Back to Line/Bar
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 2 • AI Studio" title="AI Activity: Visualize Monthly Sales">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Compare Sales Trends</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Write a script to visualize monthly company revenue using vertical bar components.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Group category indices <code>months</code> on the X axis, and <code>sales</code> values on the Y axis.</li>
                <li>Call <code>plt.bar()</code> to draw the vertical bar chart.</li>
                <li>Set edge colors to <code>'black'</code>, bar fills to <code>'orange'</code>, print and validate.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  plot_sales.py
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
                        <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Monthly Sales Revenue</text>
                        <line x1="40" y1="40" x2="260" y2="40" stroke="#f1f5f9" />
                        <line x1="40" y1="80" x2="260" y2="80" stroke="#f1f5f9" />
                        <line x1="40" y1="120" x2="260" y2="120" stroke="#f1f5f9" />
                        <line x1="40" y1="30" x2="40" y2="150" stroke="#475569" strokeWidth="2" />
                        <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
                        <rect x="60" y="80" width="30" height="70" fill="orange" stroke="black" rx="2" />
                        <rect x="110" y="60" width="30" height="90" fill="orange" stroke="black" rx="2" />
                        <rect x="160" y="40" width="30" height="110" fill="orange" stroke="black" rx="2" />
                        <rect x="210" y="20" width="30" height="130" fill="orange" stroke="black" rx="2" />
                        <text x="75" y="162" textAnchor="middle" fontSize="9" fill="#64748b">Jan</text>
                        <text x="125" y="162" textAnchor="middle" fontSize="9" fill="#64748b">Feb</text>
                        <text x="175" y="162" textAnchor="middle" fontSize="9" fill="#64748b">Mar</text>
                        <text x="225" y="162" textAnchor="middle" fontSize="9" fill="#64748b">Apr</text>
                        <text x="140" y="176" textAnchor="middle" fontSize="9" fill="#475569">Months</text>
                        <text x="12" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-90 12 90)">Revenue ($)</text>
                      </svg>
                    </div>
                  </div>
                )}

                {aiActivityPassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Milestone Cleared!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>Sales bar chart validated and rendered successfully.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('scatter_stem')}>
                ← Back to Scatter
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 2 • Practical Lab" title="Bar & Scatter Coding Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct matplotlib plotting syntax.
            </p>
            <MatplotlibAIPlayground dayId="day2" presets={day2Presets} challenges={day2Challenges} />

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
        <Section eyebrow="Day 2 • Evaluation" title="Day 2 Assessment Quiz">
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
                Build a grouped bar chart comparing product sales. Generate horizontal bars (plt.barh) comparing sales counts for Electronics vs Clothing categories over three regions.
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
