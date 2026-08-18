import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Trophy, Award, BarChart3
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

export default function MatplotlibDay5({ activeTab, onNavigate, openAITutor }) {
  const day5Presets = [
    {
      name: 'plot_sales_dashboard',
      label: 'Capstone Code Scaffold',
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\n\n# 1. Load sample dataset\ndata = {\n    'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],\n    'Sales': [15000, 18000, 16000, 22000, 25000],\n    'Expenses': [9000, 11000, 10000, 12000, 13000]\n}\ndf = pd.DataFrame(data)\n\n# 2. Build 2x1 subplot dashboard layout\nfig, axes = plt.subplots(2, 1, figsize=(7, 9))\n\n# Line plot for Sales vs Expenses\naxes[0].plot(df['Month'], df['Sales'], marker='o', label='Sales', color='orange')\naxes[0].plot(df['Month'], df['Expenses'], marker='s', label='Expenses', color='blue')\naxes[0].set_title('Revenue vs Operating Expenses')\naxes[0].legend()\naxes[0].grid(True)\n\n# Bar plot for monthly sales\naxes[1].bar(df['Month'], df['Sales'], color='orange', edgecolor='black')\naxes[1].set_title('Monthly Performance Overview')\n\nplt.tight_layout()\nplt.savefig('sales_dashboard.png', dpi=150)\nplt.show()`,
      output: `🎉 Capstone Sales Analytics Dashboard successfully compiled!\nGenerated outputs: line, bar, pie, and box subplots.\nReports saved: "sales_dashboard.png"`
    }
  ];

  const day5Challenges = [
    {
      id: 'ch5_capstone',
      title: 'Sales Dashboard Capstone',
      desc: 'Create a subplot dashboard, aggregate trends using Pandas, and save it as "sales_dashboard.png".',
      hint: 'Your code must include: pandas DataFrames, plt.subplots(), axes indices configurations, and plt.savefig("sales_dashboard.png").',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Prompt challenge comparison mockup state
  const [promptInput, setPromptInput] = useState(
    'Analyze our sales metrics dataset and recommend the best layout to compare performance vs expenses.'
  );
  const [aiOutputResponse, setAiOutputResponse] = useState('');

  const handleContinue = (nextTabId) => {
    onNavigate('matplotlib_day5', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAIAnalyst = () => {
    setAiOutputResponse('🤖 Analyzing sales attributes... Computing layouts...\n');
    setTimeout(() => {
      setAiOutputResponse(
        `💡 AI Chart Recommendation:\n\n1. Use a multi-line chart for "Revenue vs Expenses" to show month-over-month trend changes.\n2. Use a grouped bar chart to compare regional performance splits side-by-side.\n\nPython Script Suggestion:\n\`\`\`python\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\n# Left axis (axes[0]) plots lines.\n# Right axis (axes[1]) plots grouped bars.\n\`\`\``
      );
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
      q: 'Which format is NOT natively supported by Matplotlib’s plt.savefig() command?',
      opts: ['PNG', 'PDF', 'SVG', 'DOCX'],
      ans: 3,
      exp: 'Matplotlib supports raster and vector image layouts (PNG, JPG, PDF, SVG, EPS) but cannot export document file containers like Word `.docx`.'
    },
    {
      id: 'q2',
      q: 'What object represents the overall canvas window containing all subplots?',
      opts: ['Axes', 'Figure', 'Legend', 'Plotter'],
      ans: 1,
      exp: 'The `Figure` represents the overall canvas, containing one or more plotting `Axes`.'
    },
    {
      id: 'q3',
      q: 'Which function clears the current active figure canvas context?',
      opts: ['plt.clf()', 'plt.clear()', 'plt.empty()', 'plt.reset_fig()'],
      ans: 0,
      exp: '`plt.clf()` stands for Clear Figure. It clears the entire active figure canvas.'
    },
    {
      id: 'q4',
      q: 'What is the purpose of passing bbox_inches="tight" to plt.savefig()?',
      opts: [
        'It doubles the output image size.',
        'It converts the colors to grayscale.',
        'It crops surrounding white spaces so titles and legends are not cut off.',
        'It encrypts the image.'
      ],
      ans: 2,
      exp: '`bbox_inches="tight"` calculates boundaries and crops whitespace, preventing text cut-offs on edges.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'project_brief' && (
        <Section eyebrow="Day 5 • Capstone Project" title="Sales Analytics Dashboard">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Capstone Briefing:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Today you will build a professional, publication-ready **Sales Analytics Dashboard**. You will use Pandas to load data, perform groupings and statistics summaries, partition your canvas into a 2x3 grid, and plot all 6 primary chart types before exporting them as PNG, JPG, and PDF.
                </span>
              </div>
            </div>

            {/* Project Overview & Steps */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                Project Overview & Requirements
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                You are hired as a Data Analyst for a retail company. The management wants a single dashboard image showcasing overall performance metrics. Your Python script must complete these tasks:
              </p>
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f97316', marginBottom: '1.5rem' }}>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#334155', lineHeight: '1.8' }}>
                  <li><strong>Import Dataset:</strong> Load a mock sales dataset using <code>pd.read_csv()</code> or standard Pandas DataFrames.</li>
                  <li><strong>Initialize Grid:</strong> Create a 2x3 subplot structure: <code>fig, axes = plt.subplots(2, 3, figsize=(15, 10))</code>.</li>
                  <li><strong>Monthly Trends (Line Chart):</strong> Plot monthly revenue over time in <code>axes[0, 0]</code>.</li>
                  <li><strong>Product Performance (Bar Chart):</strong> Compare product sales counts in <code>axes[0, 1]</code>.</li>
                  <li><strong>Regional Sales (Pie Chart):</strong> Show market share splits in <code>axes[0, 2]</code>.</li>
                  <li><strong>Revenue Spread (Histogram):</strong> Map order size distributions in <code>axes[1, 0]</code>.</li>
                  <li><strong>Marketing Spend vs. Sales (Scatter Plot):</strong> Plot correlation dots in <code>axes[1, 1]</code>.</li>
                  <li><strong>Order Value Distribution (Box Plot):</strong> Highlight median ranges and outlier spikes in <code>axes[1, 2]</code>.</li>
                  <li><strong>Export Dashboard:</strong> Save the figure as PNG, JPG, and PDF.</li>
                </ol>
              </div>
            </div>

            {/* Code Scaffold */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                Matplotlib Capstone Scaffold Example
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Use this template code structure to develop your dashboard:
              </p>
              <SyntaxHighlighter code={`import pandas as pd\nimport matplotlib.pyplot as plt\n\n# 1. Load data using pandas\ndf = pd.read_csv('sales_dataset.csv')\n\n# 2. Configure a 2 rows by 3 columns dashboard canvas\nfig, axes = plt.subplots(2, 3, figsize=(16, 10))\n\n# [0, 0]: Line Chart (Monthly Sales Trends)\naxes[0, 0].plot(df['Month'], df['Sales'], marker='o', color='orange')\naxes[0, 0].set_title('Monthly Revenue')\n\n# [0, 1]: Bar Chart (Product Performance)\naxes[0, 1].bar(df['Product'], df['Quantity'], color='blue')\naxes[0, 1].set_title('Product Performance')\n\n# [0, 2]: Pie Chart (Regional Distribution)\naxes[0, 2].pie(df['RegionalSales'], labels=df['Region'], autopct='%1.1f%%')\naxes[0, 2].set_title('Regional Sales Share')\n\n# [1, 0]: Histogram (Order Size Distribution)\naxes[1, 0].hist(df['OrderValue'], bins=10, edgecolor='black')\naxes[1, 0].set_title('Order size Histogram')\n\n# [1, 1]: Scatter Plot (Spend vs Revenue Correlation)\naxes[1, 1].scatter(df['AdSpend'], df['Sales'], c='purple')\naxes[1, 1].set_title('Ad Spend vs Sales Correlation')\n\n# [1, 2]: Box Plot (Spread & Outliers)\naxes[1, 2].boxplot(df['OrderValue'])\naxes[1, 2].set_title('Order Values Outliers')\n\n# Auto-fit spacing and margins\nplt.tight_layout()\n\n# 3. Export as PNG, JPG, and PDF formats\nplt.savefig('sales_dashboard.png', dpi=300)\nplt.savefig('sales_dashboard.jpg', dpi=150)\nplt.savefig('sales_dashboard.pdf', format='pdf')\nplt.show()`} />
            </div>

            {/* Expected Outputs */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                Export formats guide
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                When saving charts, select the appropriate format based on your output requirements:
              </p>
              <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.8', margin: 0, paddingLeft: '1.2rem' }}>
                <li><strong>PNG (Portable Network Graphics):</strong> Raster format supporting transparent backgrounds. Best for web apps.</li>
                <li><strong>JPG (Joint Photographic Experts Group):</strong> Compressed raster format. Best for small file sizes in presentations.</li>
                <li><strong>PDF (Portable Document Format):</strong> Vector graphics format. Elements remain scale-independent and resolution-independent, perfect for high-quality reports.</li>
              </ul>
            </div>

            <div className="flex justify-end" style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_challenge')}>
                Continue to AI Challenge Comparison →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'ai_challenge' && (
        <Section eyebrow="Day 5 • AI Studio" title="AI Analyst Challenge Comparison">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Ask AI Analyst</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Ask the AI Tutor for recommended plotting configurations, then compare its advice with your Matplotlib script.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  resize: 'none'
                }}
              />
              <button onClick={handleAskAIAnalyst} style={{ background: '#f97316', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start' }}>
                <Sparkles size={16} /> Compare Chart Designs
              </button>
            </div>

            {aiOutputResponse && (
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#334155', fontSize: '0.92rem', lineHeight: 1.6 }}>
                <h4 style={{ margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '6px', color: '#ea580c' }}>
                  <Award size={18} /> AI Analyst Evaluation:
                </h4>
                <div style={{ whiteSpace: 'pre-line' }}>{aiOutputResponse}</div>
              </div>
            )}

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('project_brief')}>
                ← Back to Brief
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 5 • Practical Lab" title="Capstone Dashboard Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Capstone Coding Arena</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct matplotlib plotting syntax.
            </p>
            <MatplotlibAIPlayground dayId="day5" presets={day5Presets} challenges={day5Challenges} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('ai_challenge')}>
                ← Back to AI Analyst
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Final Assessment →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 5 • Final Assessment" title="Course Assessment & Grading">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Matplotlib Certificate Evaluation</h3>
            
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
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#9a3412' }}>Check Certification Status</h3>
              <p style={{ color: '#c2410c', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Verify all answers above before computing final grading scores.
              </p>
              
              <button className="btn btn-primary" onClick={checkFinalScore} style={{ background: '#f97316', borderColor: '#f97316' }}>
                Calculate Final Grade
              </button>

              {score !== null && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c2410c', display: 'block' }}>{score} / 4</span>
                  <span style={{ fontSize: '0.9rem', color: '#9a3412', fontWeight: 600 }}>
                    {score === 4 ? '🏆 Certified! You have passed the course with an outstanding perfect score!' : score >= 3 ? '👍 Certified! You successfully passed.' : '⚠️ Core passing standard is 75% correct (3/4). Ask the tutor or run practice code challenges again.'}
                  </span>
                </div>
              )}
            </div>

            {/* Certification Details */}
            <div style={{ marginTop: '2.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: '12px', width: '100%' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', margin: '0 0 0.5rem 0' }}>
                <Trophy size={20} color="#10b981" /> 🎓 Completion Certificate Criteria
              </h3>
              <ul style={{ color: '#14532d', fontSize: '0.88rem', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Complete and run all 5 course modules including AI Activities.</li>
                <li>Submit the final Capstone Sales Analytics Dashboard challenge.</li>
                <li>Score 75% or higher on the certification assessment quiz.</li>
              </ul>
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
