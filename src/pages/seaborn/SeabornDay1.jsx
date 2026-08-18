import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle, Sparkles, Activity, Code, BookOpen, Sliders, Trophy, FileText, ArrowRight, Award } from 'lucide-react';
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

export default function SeabornDay1({ activeTab, onNavigate, openAITutor }) {
  const day1Presets = [
    {
      name: 'relational_scatterplot',
      label: 'Relational Scatter Plot',
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Load built-in tips dataset\ntips = sns.load_dataset('tips')\n\n# Configure theme and style\nsns.set_theme(style='whitegrid')\n\n# Draw relational plot mapping variables to colors and styles\nsns.relplot(\n    data=tips, \n    x='total_bill', \n    y='tip', \n    hue='smoker', \n    style='time', \n    size='size'\n)\n\nplt.title('Restaurant Tips Analysis')\nplt.show()`,
      output: `🎉 Relational scatter plot successfully created!\n[Figure: total_bill vs tip mapped by hue (smoker) and style (time)]`
    },
    {
      name: 'relational_lineplot',
      label: 'Relational Line Plot',
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Load fmri dataset\nfmri = sns.load_dataset('fmri')\n\nsns.set_theme(style='darkgrid')\n\n# Draw line plot with statistical aggregation & shading\nsns.lineplot(\n    data=fmri, \n    x='timepoint', \n    y='signal', \n    hue='event', \n    style='region'\n)\n\nplt.title('FMRI Signal Over Time')\nplt.show()`,
      output: `🎉 Relational line plot successfully created!\n[Figure: signal over timepoint with 95% confidence intervals shaded automatically]`
    }
  ];

  const day1Challenges = [
    {
      id: 'ch1_sns_relplot',
      title: 'Relational Plot Challenge',
      desc: 'Load a mock dataset and write sns.relplot() to map coordinate trends using color hues.',
      hint: 'Include: "import seaborn as sns", "sns.relplot(x=..., y=..., data=...)" inside your script.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  const handleContinue = (nextTabId) => {
    onNavigate('seaborn_day1', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      q: 'What is the primary advantage of Seaborn over vanilla Matplotlib?',
      opts: [
        'It runs faster on simple mathematical computations.',
        'It provides high-level APIs that compile statistical aggregations and complex groupings automatically.',
        'It is written in JavaScript instead of Python.',
        'It does not require importing matplotlib.pyplot.'
      ],
      ans: 1,
      exp: 'Seaborn integrates directly with Pandas DataFrames, performing statistical aggregations, confidence intervals estimations, and hue mappings with minimal lines of code.'
    },
    {
      id: 'q2',
      q: 'Which function is used to fetch built-in test datasets (like "tips" or "flights") in Seaborn?',
      opts: ['sns.get_data()', 'sns.load_dataset()', 'sns.read_csv()', 'sns.download()'],
      ans: 1,
      exp: '`sns.load_dataset()` fetches and loads online sample datasets directly as Pandas DataFrames.'
    },
    {
      id: 'q3',
      q: 'How do you apply background grids, fonts, and dark/white styles globally in Seaborn?',
      opts: ['sns.set_theme()', 'sns.grid_style()', 'sns.configure()', 'sns.style()'],
      ans: 0,
      exp: '`sns.set_theme(style=...)` configures theme parameters globally (styles: "darkgrid", "whitegrid", "dark", "white", "ticks").'
    },
    {
      id: 'q4',
      q: 'Which generic relational plotting method allows toggling between lines and scatters using the "kind" argument?',
      opts: ['sns.scatterplot()', 'sns.lineplot()', 'sns.relplot()', 'sns.plot()'],
      ans: 2,
      exp: '`sns.relplot()` is a figure-level relational plot. By changing the `kind` parameter (default "scatter" or "line"), you can switch representations.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'intro' && (
        <Section eyebrow="Day 1 • Introduction to Seaborn" title="Seaborn Fundamentals & Relational Plots">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#6366f1" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#4f46e5', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#3730a3', lineHeight: '1.5' }}>
                  Welcome to Seaborn! Think of Seaborn as an extension of Matplotlib. Today we will explore how Seaborn automatically styles charts, loads online datasets, handles Pandas DataFrames natively, and maps relational coordinates using colors and size features.
                </span>
              </div>
            </div>

            {/* Why Seaborn */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. What is Seaborn & Why use it?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Seaborn is a Python data visualization library built on top of Matplotlib. It integrates closely with Pandas data structures, automating color mapping, confidence interval shading, and statistical summaries.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Matplotlib (Low-level)</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                    <li>Requires loops to split data categories</li>
                    <li>Manual labels and legend drawing</li>
                    <li>Requires manual confidence interval calculations</li>
                  </ul>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Seaborn (High-level)</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                    <li>Automated grouping via the <code>hue</code> parameter</li>
                    <li>Natively inherits column names for labels</li>
                    <li>Built-in statistical bootsrap error bounds</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Installation & Datasets */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Setup, Styles & Built-in Datasets
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Install and import using these commands:
              </p>
              <SyntaxHighlighter code={`pip install seaborn\n\nimport seaborn as sns\nimport matplotlib.pyplot as plt`} />
              
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginTop: '1rem', marginBottom: '0.8rem' }}>
                Seaborn includes built-in datasets for testing. Load them directly using <code>sns.load_dataset()</code>:
              </p>
              <SyntaxHighlighter code={`# Load restaurant bills dataset\ntips_df = sns.load_dataset('tips')\nprint(tips_df.head())`} />
            </div>

            {/* Themes & Palettes */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                3. Themes & Color Palettes
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Apply themes globally with <code>sns.set_theme()</code>. Styles include: <code>'darkgrid'</code>, <code>'whitegrid'</code>, <code>'dark'</code>, <code>'white'</code>, and <code>'ticks'</code>.
              </p>
              <SyntaxHighlighter code={`# Set white grid theme with pastel color palette\nsns.set_theme(style='whitegrid', palette='pastel')`} />
            </div>

            {/* Line & Scatter Relational Plots */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                4. Relational Plots: sns.relplot()
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Relational plots show relationships between variables. Use <code>sns.relplot()</code> and switch between scatter or line charts using the <code>kind</code> parameter:
              </p>
              <SyntaxHighlighter code={`# Relational Scatter Plot\nsns.relplot(x='total_bill', y='tip', hue='day', style='smoker', data=tips_df)\n\n# Relational Line Plot\nsns.relplot(x='timepoint', y='signal', hue='event', kind='line', data=fmri_df)`} />
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '1rem', fontSize: '0.88rem', color: '#475569' }}>
                <strong>Hue Mapping:</strong> The <code>hue</code> parameter maps a categorical variable to colors, automatically grouping data and creating a legend.
              </div>
            </div>

            <div className="flex justify-end" style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 1 • AI Studio" title="AI Activity: Student Grade Distribution">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Analyze Relational Parameters</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Write a Seaborn script using <code>sns.relplot()</code> to visualize the correlation between student study hours and final exam marks, grouped by their gender identities.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Configure the whitegrid theme using <code>sns.set_theme()</code>.</li>
                <li>Call <code>sns.relplot()</code> with <code>x='StudyHours'</code>, <code>y='Grade'</code>, and map colors using <code>hue='Gender'</code>.</li>
                <li>Display the output using matplotlib's <code>plt.show()</code>.</li>
              </ol>
            </div>

            <SyntaxHighlighter code={`# Sample dataset df loaded automatically:\n# columns: ['StudyHours', 'Grade', 'Gender', 'Attendance']`} />

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 1 • Practical Lab" title="Relational Plotting Playground">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Relational Sandbox</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Select a preset template or test your custom scripts using the editor sandbox. Solve the challenge tasks on the left panel.
            </p>
            <SeabornAIPlayground dayId="day1" presets={day1Presets} challenges={day1Challenges} />

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Day 1 Assessment →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 1 • Evaluation" title="Day 1 Assessment Quiz">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Confirm Your Knowledge</h3>
            
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
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>🎉 Perfect score! You have mastered relational plots in Seaborn.</span>
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
              <button className="btn btn-primary" onClick={() => onNavigate('seaborn_day2', 'distributions')}>
                Continue to Day 2 →
              </button>
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
