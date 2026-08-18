import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, FileText, ArrowRight, Award, Layers } from 'lucide-react';
import SeabornAIPlayground from '../../components/SeabornAIPlayground';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
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

export default function SeabornDay4({ activeTab, onNavigate, openAITutor }) {
  const day4Presets = [
    {
      name: 'seaborn_capstone',
      label: 'Capstone Dashboard Scaffold',
      code: `import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# 1. Load customer sales dataset\ndata = {\n    'Age': [23, 45, 31, 35, 54, 28, 36, 42],\n    'Income': [48000, 72000, 55000, 61000, 89000, 42000, 68000, 78000],\n    'Spent': [1200, 3400, 1800, 2200, 4100, 980, 2500, 3100],\n    'Category': ['Tech', 'Fashion', 'Tech', 'Home', 'Fashion', 'Tech', 'Home', 'Fashion']\n}\ndf = pd.DataFrame(data)\n\n# 2. Set theme\nsns.set_theme(style='whitegrid')\n\n# 3. Create a multi-plot layout dashboard\nfig, axes = plt.subplots(1, 2, figsize=(12, 5))\n\n# Plot correlation matrix annotated heatmap\ncorr = df[['Age', 'Income', 'Spent']].corr()\nsns.heatmap(corr, annot=True, cmap='coolwarm', ax=axes[0])\naxes[0].set_title('Financial metrics correlations')\n\n# Plot categorical spent distribution by Product Category\nsns.boxplot(data=df, x='Category', y='Spent', palette='pastel', ax=axes[1])\naxes[1].set_title('Spent Distribution by Category')\n\nplt.tight_layout()\nplt.savefig('customer_dashboard.png', dpi=200)\nplt.show()`,
      output: `🎉 Capstone Customer Insights Dashboard successfully compiled!\nGenerated outputs: correlation heatmaps, distributions, and demographic pair plots.\nReports saved: "customer_dashboard.png"`
    }
  ];

  const day4Challenges = [
    {
      id: 'ch4_sns_capstone',
      title: 'Customer Dashboard Capstone',
      desc: 'Build a multi-plot customer analytics dashboard containing heatmaps and pair plots, then save the figure.',
      hint: 'Include: "sns.heatmap()", "plt.savefig(\'customer_dashboard.png\')" in your script.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Prompt challenge comparison mockup state
  const [promptInput, setPromptInput] = useState(
    'Show me how to code a pairplot and an annotated heatmap for our customer sales datasets.'
  );
  const [aiOutputResponse, setAiOutputResponse] = useState('');

  const handleContinue = (nextTabId) => {
    onNavigate('seaborn_day4', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAIAnalyst = () => {
    setAiOutputResponse('🤖 Analyzing customer demographic segments... Formatting charts...\n');
    setTimeout(() => {
      setAiOutputResponse(
        `💡 AI Chart Recommendation:\n\n1. Plot a pairplot with "Category" hue to identify demographic clusters.\n2. Plot an annotated correlation heatmap with the "coolwarm" palette.\n\nPython Script:\n\`\`\`python\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Pairplot\nsns.pairplot(df, hue='Category', palette='Set2')\nplt.savefig('demographics_pairplot.png')\n\n# Heatmap\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')\nplt.savefig('correlations_heatmap.png')\n\`\`\``
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
      q: 'Which code snippet correctly plots an annotated correlation heatmap between numerical variables?',
      opts: [
        "sns.heatmap(df.corr(), annot=True)",
        "sns.relplot(df.corr())",
        "sns.pairplot(df.corr(), annot=True)",
        "sns.heatmap(df)"
      ],
      ans: 0,
      exp: '`sns.heatmap(df.corr(), annot=True)` computes the correlation matrix from your numerical columns first and displays annotated numeric coefficients inside grid boxes.'
    },
    {
      id: 'q2',
      q: 'Which Seaborn function fits and displays a linear regression trend line over scatter markers?',
      opts: ['sns.lineplot()', 'sns.regplot()', 'sns.jointplot()', 'sns.boxplot()'],
      ans: 1,
      exp: '`sns.regplot()` automatically fits a linear regression line with 95% bootstrap confidence intervals overlaid on a scatter plot.'
    },
    {
      id: 'q3',
      q: 'How does Seaborn determine label headers and legend text automatically?',
      opts: [
        'By prompting the user in the command console.',
        'It translates the variables using AI translation APIs.',
        'It inherits column header labels directly from Pandas DataFrame structures.',
        'It picks default index coordinates.'
      ],
      ans: 2,
      exp: 'Seaborn integrates with Pandas, automatically pulling column name strings to use as axis labels and legend header keys.'
    },
    {
      id: 'q4',
      q: 'Which Seaborn function is best for a quick scanning overview of bivariate relationships across all numerical columns?',
      opts: ['sns.relplot()', 'sns.pairplot()', 'sns.jointplot()', 'sns.heatmap()'],
      ans: 1,
      exp: '`sns.pairplot()` renders a grid of pairwise relationships, scanning the entire dataset automatically.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'project_brief' && (
        <Section eyebrow="Day 4 • Capstone Project" title="Customer Sales Insights Dashboard">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#6366f1" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#4f46e5', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Capstone Briefing:</strong>
                <span style={{ fontSize: '0.9rem', color: '#3730a3', lineHeight: '1.5' }}>
                  Today you will build a **Customer Sales Insights Dashboard**! You will import mock datasets using Pandas, customize styling, analyze customer correlation clusters using annotated heatmaps, build demographic pair plots, and export the output figure.
                </span>
              </div>
            </div>

            {/* Capstone Requirements */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                Capstone Dashboard Requirements
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Your capstone script must satisfy these deliverables:
              </p>
              
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #6366f1', marginBottom: '1.5rem' }}>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#334155', lineHeight: '1.8' }}>
                  <li><strong>Import Dataset:</strong> Build or load customer records containing columns: <code>Age</code>, <code>Income</code>, <code>Spent</code>, and <code>Category</code>.</li>
                  <li><strong>Correlation Analysis:</strong> Compute the Pearson correlation matrix using <code>df.corr()</code>.</li>
                  <li><strong>Heatmap Visualization:</strong> Create a Seaborn heatmap setting <code>annot=True</code> to print coefficients.</li>
                  <li><strong>Demographics Distributions (Pair Plot):</strong> Render pair plots using <code>sns.pairplot()</code> with <code>hue='Category'</code>.</li>
                  <li><strong>Category comparisons (Box/Violin Plot):</strong> Compare purchase totals (Spent) by product category.</li>
                  <li><strong>Export Graphic:</strong> Save the final dashboard as <code>"customer_dashboard.png"</code> using <code>plt.savefig()</code>.</li>
                </ol>
              </div>
            </div>

            {/* Code Scaffold */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                Seaborn Capstone Scaffold
              </h3>
              <SyntaxHighlighter code={`import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# 1. Load data\ndf = pd.read_csv('customer_insights.csv')\n\n# 2. Set theme\nsns.set_theme(style='whitegrid')\n\n# 3. Create Pair Plot scans\nsns.pairplot(df, hue='Category', palette='Set2')\nplt.savefig('insights_pairplot.png')\nplt.close()\n\n# 4. Create annotated Correlation heatmap\ncorr = df[['Age', 'Income', 'Spent']].corr()\nsns.heatmap(corr, annot=True, cmap='coolwarm')\nplt.savefig('insights_heatmap.png')\nplt.close()`} />
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
        <Section eyebrow="Day 4 • AI Studio" title="AI Analyst Challenge Comparison">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Compare dashboard layouts</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Ask the AI Tutor for advice on structuring your demographics dashboard, then compare its code suggestions with your Seaborn script.
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
              <button onClick={handleAskAIAnalyst} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start' }}>
                <Sparkles size={16} /> Get Dashboard Layout Recommendations
              </button>
            </div>

            {aiOutputResponse && (
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#334155', fontSize: '0.92rem', lineHeight: 1.6 }}>
                <h4 style={{ margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '6px', color: '#4f46e5' }}>
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
        <Section eyebrow="Day 4 • Practical Lab" title="Capstone Dashboard Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Capstone Coding Arena</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Write your final project scripts on the editor panel on the right. Resolve the challenges requirements to complete the course evaluation.
            </p>
            <SeabornAIPlayground dayId="day4" presets={day4Presets} challenges={day4Challenges} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('ai_challenge')}>
                ← Back to AI Challenge
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Final Assessment →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 4 • Final Assessment" title="Seaborn Certificate Evaluation">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Seaborn Final Evaluation</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#6366f1', fontWeight: 'bold' }}>Q{idx + 1}.</span> {q.q}
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
                        btnStyle.background = '#e0e7ff';
                        btnStyle.borderColor = '#c7d2fe';
                        btnStyle.color = '#3730a3';
                      }

                      if (isChecked) {
                        if (isCorrect) {
                          btnStyle.background = '#dcfce7';
                          btnStyle.borderColor = '#86efac';
                          btnStyle.color = '#166534';
                        } else if (isSelected) {
                          btnStyle.background = '#fee2e2';
                          btnStyle.borderColor = '#fca5a5';
                          btnStyle.color = '#991b1b';
                        }
                        btnStyle.cursor = 'default';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isChecked}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          style={btnStyle}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                      disabled={selectedAnswers[q.id] === undefined || checkedQuestions[q.id]}
                      onClick={() => handleCheckQuestion(q.id)}
                    >
                      Verify Answer
                    </button>

                    {checkedQuestions[q.id] && (
                      <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
                        {selectedAnswers[q.id] === q.ans ? '🎉 Correct!' : '❌ Incorrect.'}
                      </span>
                    )}
                  </div>

                  {checkedQuestions[q.id] && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                      <strong>Explanation:</strong> {q.exp}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', borderTop: '1px solid #cbd5e1', paddingTop: '2rem' }}>
              <button className="btn btn-primary" onClick={checkFinalScore} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                Grade Assessment
              </button>

              {score !== null && (
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>
                    Your Score: {score} / {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
                  </span>
                  {score === quizQuestions.length ? (
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>🎉 Congratulations! You have successfully passed the Seaborn Certification Evaluation!</span>
                  ) : (
                    <span style={{ color: '#ca8a04', fontWeight: 'bold' }}>Review the wrong answers and try again to get a perfect score!</span>
                  )}
                </div>
              )}
            </div>

            {/* Lesson Rating Widget */}
            <div style={{ marginTop: '3rem', borderTop: '1px solid #cbd5e1', paddingTop: '2rem', textAlign: 'center' }}>
              <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Rate this Lesson</h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1rem' }}>Your feedback helps us improve our courses!</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setLessonRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '2rem',
                      cursor: 'pointer',
                      color: star <= lessonRating ? '#fbbf24' : '#cbd5e1',
                      transition: 'color 0.1s'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              {lessonRating > 0 && (
                <span style={{ display: 'block', marginTop: '0.5rem', color: '#16a34a', fontWeight: 600 }}>
                  Thank you for rating this lesson {lessonRating}/5 stars!
                </span>
              )}
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('playground')}>
                ← Back to Playground
              </button>
              <button className="btn btn-primary" onClick={() => onNavigate('dashboard')}>
                Back to Dashboard
              </button>
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
