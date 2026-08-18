import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, Columns
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

export default function MatplotlibDay4({ activeTab, onNavigate, openAITutor }) {
  const day4Presets = [
    {
      name: 'plot_subplots_grid',
      label: 'Subplots Grid',
      code: `import matplotlib.pyplot as plt\n\nfig, axes = plt.subplots(1, 2, figsize=(8, 4))\n\n# First plot\naxes[0].plot([1, 2, 3], [10, 20, 15], color='orange')\naxes[0].set_title('Subplot A')\n\n# Second plot\naxes[1].bar(['A', 'B', 'C'], [5, 10, 8], color='blue')\naxes[1].set_title('Subplot B')\n\nplt.tight_layout()\nplt.show()`,
      output: `🎉 Dashboard generated successfully!\n[Figure: Subplot grid instantiated containing multiple ax elements]`
    },
    {
      name: 'plot_annotations_text',
      label: 'Text Annotations',
      code: `import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 30, 20, 15]\n\nplt.plot(x, y, marker='o')\n\n# Point annotation\nplt.annotate('Peak Value', xy=(2, 30), xytext=(2.5, 28), arrowprops=dict(facecolor='black', shrink=0.05))\nplt.title('Performance Trend')\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Custom text annotations placed at specific coordinate landmarks]`
    }
  ];

  const day4Challenges = [
    {
      id: 'ch4_subplots',
      title: '1. Initialize Subplot Grid',
      desc: 'Use plt.subplots(1, 2) to prepare side-by-side axes plotting cells.',
      hint: 'Call fig, axes = plt.subplots(1, 2) to build layout cells.',
    },
    {
      id: 'ch4_annotate',
      title: '2. Add Custom Annotations',
      desc: 'Use plt.annotate() to highlight target data coordinates.',
      hint: 'Call plt.annotate("Peak", xy=(x_coordinate, y_coordinate)) to highlight points.',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import matplotlib.pyplot as plt

# Write custom subplots and annotation code:
fig, axes = plt.subplots(2, 1, figsize=(6, 8))

# Subplot 1
axes[0].plot([1, 2, 3], [10, 30, 20], color='orange')
axes[0].set_title('Revenue Trend')
axes[0].annotate('Max Peak', xy=(2, 30), xytext=(2.2, 28), arrowprops=dict(facecolor='black'))

# Subplot 2
axes[1].bar(['A', 'B', 'C'], [50, 80, 60], color='blue')
axes[1].set_title('Product Analysis')

plt.tight_layout()
plt.show()`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);
  const [renderedPlot, setRenderedPlot] = useState(null);

  const handleContinue = (nextTabId) => {
    onNavigate('matplotlib_day4', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Compiling dashboard grid layouts...\n');
    setRenderedPlot(null);
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import matplotlib.pyplot as plt') || aiActivityCode.includes('import matplotlib');
      const hasSubplots = aiActivityCode.includes('plt.subplots(') || aiActivityCode.includes('subplots(');
      const hasAnnotate = aiActivityCode.includes('annotate(');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: Pyplot imports missing.');
        return;
      }
      if (!hasSubplots) {
        setAiActivityConsole(p => p + 'LayoutError: Figure subplots grid configuration (plt.subplots) missing.');
        return;
      }
      if (!hasAnnotate) {
        setAiActivityConsole(p => p + 'Warning: Highlight annotation peak markers not found in script.');
        return;
      }

      setAiActivityConsole(
        `>>> Canvas successfully compiled!\nSubplots Configured:\n[Figure size 6x8 with 2 Axes Grid (2 rows, 1 col)]\nAxes[0]: Line Plot (annotated "Max Peak" at xy=(2,30))\nAxes[1]: Bar Chart\nLayout Optimization: tight_layout() invoked.\n\n✅ AI Validation: Custom subplot dashboard successfully compiled!`
      );
      setAiActivityPassed(true);
      setRenderedPlot('subplots');
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
      q: 'Which function automatically adjusts subplots layout sizes to avoid titles/labels overlaps?',
      opts: ['plt.adjust_layout()', 'plt.tight_layout()', 'plt.fit_axes()', 'plt.clean_layout()'],
      ans: 1,
      exp: '`plt.tight_layout()` adjusts margins and spacings so labels, ticks, and titles fit neatly without overlap.'
    },
    {
      id: 'q2',
      q: 'Which argument inside plt.savefig() defines the output image resolution (dots per inch)?',
      opts: ['dpi', 'resolution', 'quality', 'scale'],
      ans: 0,
      exp: '`dpi` (Dots Per Inch) controls the output file pixel density. High-res printing typically uses `dpi=300`.'
    },
    {
      id: 'q3',
      q: 'How do you rotate tick labels (e.g. month names) by 45 degrees to prevent crowding?',
      opts: ['plt.ticks(rotate=45)', 'plt.xticks(rotation=45)', 'plt.rotate_labels(45)', 'plt.labels(angle=45)'],
      ans: 1,
      exp: '`plt.xticks(rotation=45)` changes label angles to improve reading space.'
    },
    {
      id: 'q4',
      q: 'How many subplot coordinate areas are initialized by fig, axes = plt.subplots(2, 3)?',
      opts: ['2', '3', '5', '6'],
      ans: 3,
      exp: '`plt.subplots(2, 3)` initializes a grid layout of 2 rows and 3 columns, creating a total of 6 plotting cells.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'customization' && (
        <Section eyebrow="Day 4 • Chart Customization" title="Colors, Fonts & Coordinate Annotations">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Today we learn how to style charts so they are boardroom-ready! We will customize coordinate fonts, label weights, add arrow annotations to point out key milestones, customize tick alignments, and configure background gridlines.
                </span>
              </div>
            </div>

            {/* Section 1: Colors, Markers, Lines */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Styling Elements (Colors, Markers, Lines)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                You can style plot boundaries using colors, markers, and line thickness configurations:
              </p>
              <SyntaxHighlighter code={`plt.plot(x, y, color='#2563eb', marker='o', markersize=8, markerfacecolor='white', markeredgecolor='blue', linestyle='--', linewidth=3)`} />
            </div>

            {/* Section 2: Fonts, Text, Annotations */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Typography, Labels & Annotations
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Adding context makes charts informative. Use <code>plt.text()</code> to place coordinate labels, and <code>plt.annotate()</code> to draw pointing arrows at milestones:
              </p>
              <SyntaxHighlighter code={`# Add static coordinate text labels\nplt.text(2, 50, 'Baseline Threshold', fontsize=12, fontweight='bold', color='red')\n\n# Annotate key peaks with arrow pointers\nplt.annotate('Target Met!', xy=(3, 90), xytext=(4, 80), arrowprops=dict(facecolor='black', shrink=0.05, width=1))`} />
            </div>

            {/* Section 3: Limits, Grid, and Ticks */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                3. Axis Limits, Tick Rotation & Grid Styles
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Set exact coordinate viewing crops with <code>plt.xlim()</code>/<code>plt.ylim()</code>. Tilt horizontal category ticks to prevent overlapping, and customize gridlines:
              </p>
              <SyntaxHighlighter code={`# Crop viewport margins\nplt.xlim(0, 10)\nplt.ylim(0, 100)\n\n# Rotate long month names to prevent crowd\nplt.xticks(rotation=45, fontsize=10)\n\n# Custom grid formatting (color, style, transparency)\nplt.grid(True, color='gray', linestyle=':', linewidth=0.5, alpha=0.7)`} />
            </div>

            <div className="flex justify-end" style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('subplots')}>
                Continue to Subplots Grid →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'subplots' && (
        <Section eyebrow="Day 4 • Dashboards Layout" title="Subplots Grid & Output Resolutions">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Let's learn how to structure dashboards! Using <strong>plt.subplots()</strong> divides your canvas into multi-chart rows and columns. We will also master <strong>high-resolution exports</strong> to save crisp dashboard figures.
                </span>
              </div>
            </div>

            {/* Section 1: Subplots */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. Subplots Layout (Figure Size & Tight Layout)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Use <code>plt.subplots(rows, cols)</code> to declare a grid structure. You can reference specific cells using coordinates indexing:
              </p>
              <SyntaxHighlighter code={`# Initialize a 2x2 grid (4 axes cells total)\nfig, axes = plt.subplots(2, 2, figsize=(10, 8))\n\n# Plot into top-left coordinate axis\naxes[0, 0].plot(x, y, color='blue')\naxes[0, 0].set_title('Trends overview')\n\n# Plot into bottom-right coordinate axis\naxes[1, 1].bar(categories, values, color='orange')\naxes[1, 1].set_title('Category comparison')\n\n# Call tight_layout to auto-crop spacing and margins\nplt.tight_layout()`} />
            </div>

            {/* Section 2: Multiple Figures */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Working with Multiple Figures
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                You can instantiate and switch between multiple separate window figures using <code>plt.figure(id)</code>:
              </p>
              <SyntaxHighlighter code={`# Open the first figure canvas window\nplt.figure(1, figsize=(6, 4))\nplt.plot(x, y, color='blue')\n\n# Open a second separate figure canvas window\nplt.figure(2, figsize=(6, 4))\nplt.bar(categories, values, color='orange')`} />
            </div>

            {/* Section 3: Save High Resolution */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                3. Save Figures (High Resolution Output DPI)
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                To save plots for documents or presentations, set the resolution density using the <code>dpi</code> parameter inside <code>plt.savefig()</code>:
              </p>
              <SyntaxHighlighter code={`# Save a crisp dashboard image at 300 DPI\nplt.savefig('dashboard_final.png', dpi=300, bbox_inches='tight')`} />
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginTop: '1rem', fontSize: '0.88rem', color: '#475569' }}>
                <strong>Tip:</strong> Always include <code>bbox_inches='tight'</code> to ensure outer elements like titles, labels, or legends do not get cropped on the edges.
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '1rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('customization')}>
                ← Back to Customization
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 4 • AI Studio" title="AI Activity: Custom Dashboards Layout">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Configure Dashboard Grids</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Configure a 2x1 vertical subplot grid showing lines on top and bar charts below.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Instantiate a 2x1 grid layout using <code>plt.subplots(2, 1)</code>.</li>
                <li>Add a line plot to <code>axes[0]</code> with a <code>"Max Peak"</code> text annotation.</li>
                <li>Draw bars in <code>axes[1]</code>, configure <code>tight_layout()</code>, and run.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  plot_dashboard.py
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
                      <svg width="240" height="170" viewBox="0 0 280 200" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                        <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Subplots Dashboard Layout</text>
                        {/* Subplot 1 */}
                        <rect x="25" y="35" width="100" height="130" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                        <line x1="25" y1="135" x2="125" y2="55" stroke="#3b82f6" strokeWidth="2.5" />
                        <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#64748b">ax[0]</text>
                        {/* Subplot 2 */}
                        <rect x="155" y="35" width="100" height="130" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                        <rect x="170" y="95" width="20" height="70" fill="#f97316" />
                        <rect x="210" y="65" width="20" height="100" fill="#f97316" />
                        <text x="205" y="50" textAnchor="middle" fontSize="9" fill="#64748b">ax[1]</text>
                      </svg>
                    </div>
                  </div>
                )}

                {aiActivityPassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Milestone Cleared!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>Subplot dashboard structure correctly compiled.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('subplots')}>
                ← Back to Subplots
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 4 • Practical Lab" title="Dashboard Customization Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct matplotlib plotting syntax.
            </p>
            <MatplotlibAIPlayground dayId="day4" presets={day4Presets} challenges={day4Challenges} />

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
        <Section eyebrow="Day 4 • Evaluation" title="Day 4 Assessment Quiz">
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
                Assemble a comprehensive layout containing 2 rows and 2 columns. Plot different charts representing IPL Cricket Statistics in each coordinate axes box and save it at 300 DPI resolution.
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
